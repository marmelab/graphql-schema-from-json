import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    printSchema,
} from 'graphql';
import getSchemaFromData from './getSchemaFromData';
import Converter from './Converter';

const newdata = {
    attributes: [
        {
            attribute: 'color',
        },
        {
            attribute: 'last_name',
        },
        {
            attribute: 'name',
        },
        {
            attribute: 'id',
        },
    ],
};

const harperSQL = {
    asian: [
        {
            color: 'green',
            rank: 1,
            last_name: 12,
            name: 'robin',
        },
        {
            color: 'black',
            rank: 2,
            last_name: 13,
            name: 'sparrow',
        },
    ],
};

const harperData = {
    hash_attribute: 'id',
    name: 'asian',
    schema: 'birds',
    id: '11a457de-b5f5-4c17-9d7b-5d257dfec158',
    attributes: [
        {
            attribute: 'color',
        },
        {
            attribute: 'last_name',
        },
        {
            attribute: 'name',
        },
        {
            attribute: 'id',
        },
    ],
};

const harperData2 = {
    hash_attribute: 'id',
    name: 'people',
    schema: 'people',
    id: '11a457de-b5f5-4c17-9d7b-5d257dfec158',
    attributes: [
        {
            attribute: 'asian_id',
        },
        {
            attribute: 'age',
        },
        {
            attribute: 'name',
        },
        {
            attribute: 'id',
        },
    ],
};

const fromSql = [
    {
        color: "green",
        id: 1,
        last_name: 12,
        name: "robin"
    },
    {
        color: "black",
        id: 2,
        last_name: 13,
        name: "sparrow"
    }
];

const fromSql2 = [
    {
        asian_id: 1,
        age: 15,
        name: "Oscar",
        id: 101
    },
    {
        asian_id: 2,
        age: 28,
        name: "Robert",
        id: 102
    },
    {
        asian_id: null,
        age: 34,
        name: "Will",
        id: 103
    }
];


test('first look at HarperDB Schema', () => {

    let queries = getSchemaFromData(harperSQL);

    ////console.log(typeMap);
    ////console.log(queries);
    //console.log(printSchema(queries));
    // //console.log(typeMap['Attribute'].getFields());
    // const queries = getSchemaFromData(newdata)
    // .getQueryType()
    // .getFields();
    const testTable = [harperData, harperData2];
    const testTuple = [fromSql, fromSql2];
    let q = Converter(testTable, testTuple);
    // q = {"asian":[{"color":"green","id":1,"last_name":12,"name":"robin"},{"color":"black","id":2,"last_name":13,"name":"sparrow"}]};
    console.log(q);
    queries = getSchemaFromData(q);
    console.log(printSchema(queries));
});
