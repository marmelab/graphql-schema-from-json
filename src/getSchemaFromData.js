import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    parse,
    extendSchema,
} from 'graphql';
import { pluralize, camelize } from 'inflection';

import getTypesFromData from './getTypesFromData';
import getFilterTypesFromData from './getFilterTypesFromData';
import { getRelatedType } from './nameConverter';
import isRelationshipField from './isRelationshipField';
import defaultGetPrimaryKey from './getPrimaryKey';

/**
 * Get a GraphQL schema from data
 * 
 * @example
 * const data = {
 *    "posts": [
 *        {
 *            "id": 1,
 *            "title": "Lorem Ipsum",
 *            "views": 254,
 *            "user_id": 123,
 *        },
 *        {
 *            "id": 2,
 *            "title": "Sic Dolor amet",
 *            "views": 65,
 *            "user_id": 456,
 *        },
 *    ],
 *    "users": [
 *        {
 *            "id": 123,
 *            "name": "John Doe"
 *        },
 *        {
 *            "id": 456,
 *            "name": "Jane Doe"
 *        }
 *    ],
 * };
 * const types = getTypesFromData(data);
 * // type Post {
 * //     id: ID
 * //     title: String
 * //     views: Int
 * //     user_id: ID
 * // }
 * //
 * // type User {
 * //     id: ID
 * //     name: String
 * // }
 * //
 * // type Query {
 * //     Post(id: ID!): Post
 * //     allPosts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): [Post]
 * //     User(id: ID!): User
 * //     allUsers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): [User]
 * // }
 * //
 * // type Mutation {
 * //     createPost(data: String): Post
 * //     updatePost(data: String): Post
 * //     removePost(id: ID!): Boolean
 * //     createUser(data: String): User
 * //     updateUser(data: String): User
 * //     removeUser(id: ID!): Boolean
 * // }
 */
export default (data, userOptions = {}) => {
    const options = {
        ...{ getPrimaryKey: defaultGetPrimaryKey },
        ...userOptions,
    };

    const types = getTypesFromData(data, options);
    const typesByName = types.reduce((types, type) => {
        types[type.name] = type;
        return types;
    }, {});

    const filterTypesByName = getFilterTypesFromData(data, options);

    const listMetadataType = new GraphQLObjectType({
        name: 'ListMetadata',
        fields: {
            count: { type: GraphQLInt },
        },
    });

    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: types.reduce((fields, type) => {
            const primaryKey = options.getPrimaryKey(type.name);

            fields[type.name] = {
                type: typesByName[type.name],
                args: {
                    [primaryKey]: { type: new GraphQLNonNull(GraphQLID) },
                },
            };
            fields[`all${camelize(pluralize(type.name))}`] = {
                type: new GraphQLList(typesByName[type.name]),
                args: {
                    page: { type: GraphQLInt },
                    perPage: { type: GraphQLInt },
                    sortField: { type: GraphQLString },
                    sortOrder: { type: GraphQLString },
                    filter: { type: filterTypesByName[type.name] },
                },
            };
            fields[`_all${camelize(pluralize(type.name))}Meta`] = {
                type: listMetadataType,
                args: {
                    page: { type: GraphQLInt },
                    perPage: { type: GraphQLInt },
                    filter: { type: GraphQLString },
                },
            };
            return fields;
        }, {}),
    });

    const mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: types.reduce((fields, type) => {
            const primaryKey = options.getPrimaryKey(type.name);
            const typeFields = typesByName[type.name].getFields();
            const nullableTypeFields = Object.keys(
                typeFields
            ).reduce((f, fieldName) => {
                f[fieldName] = Object.assign({}, typeFields[fieldName], {
                    type:
                        fieldName !== primaryKey &&
                        typeFields[fieldName].type instanceof GraphQLNonNull
                            ? typeFields[fieldName].type.ofType
                            : typeFields[fieldName].type,
                });
                return f;
            }, {});
            fields[`create${type.name}`] = {
                type: typesByName[type.name],
                args: typeFields,
            };
            fields[`update${type.name}`] = {
                type: typesByName[type.name],
                args: nullableTypeFields,
            };
            fields[`remove${type.name}`] = {
                type: GraphQLBoolean,
                args: {
                    [primaryKey]: { type: new GraphQLNonNull(GraphQLID) },
                },
            };
            return fields;
        }, {}),
    });

    const schema = new GraphQLSchema({
        query: queryType,
        mutation: mutationType,
    });

    /**
     * extend schema to add relationship fields
     * 
     * @example
     * If the `post` key contains a 'user_id' field, then
     * add one-to-many and many-to-one type extensions:
     *     extend type Post { User: User }
     *     extend type User { Posts: [Post] }
     */
    const schemaExtension = Object.values(typesByName).reduce((ext, type) => {
        Object.keys(type.getFields())
            .filter(isRelationshipField)
            .map(fieldName => {
                const relType = getRelatedType(fieldName);
                const rel = pluralize(type.toString());
                ext += `
extend type ${type} { ${relType}: ${relType} }
extend type ${relType} { ${rel}: [${type}] }`;
            });
        return ext;
    }, '');

    return schemaExtension
        ? extendSchema(schema, parse(schemaExtension))
        : schema;
};
