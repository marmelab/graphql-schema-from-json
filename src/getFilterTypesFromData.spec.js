import getFilterTypesFromData from './getFilterTypesFromData';

const data = {
    posts: [
        {
            id: 1,
            title: 'Lorem Ipsum',
            views: 254,
            user_id: 123,
        },
        {
            id: 2,
            title: 'Sic Dolor amet',
            views: 65,
            user_id: 456,
        },
    ],
    users: [
        {
            id: 123,
            name: 'John Doe',
        },
        {
            id: 456,
            name: 'Jane Doe',
        },
    ],
};

const dataCustomIds = {
    posts: [
        {
            postId: 1,
            title: 'Lorem Ipsum',
            views: 254,
            user_id: 123,
        },
        {
            postId: 2,
            title: 'Sic Dolor amet',
            views: 65,
            user_id: 456,
        },
    ],
    users: [
        {
            userId: 123,
            name: 'John Doe',
        },
        {
            userId: 456,
            name: 'Jane Doe',
        },
    ],
};

/*
const PostType = new GraphQLObjectType({
    name: 'PostFilter',
    fields: {
        q: { type: GraphQLString },
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        views: { type: GraphQLInt },
        user_id: { type: GraphQLID },
    },
});
const UsersType = new GraphQLObjectType({
    name: 'UserFilter',
    fields: {
        q: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    },
});
*/

test('creates one filter type per entity', () => {
    const filterTypes = getFilterTypesFromData(data);
    expect(Object.values(filterTypes).map(type => type.toString())).toEqual([
        'PostFilter',
        'UserFilter',
    ]);
});

test('creates one filter field per entity field', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.id.type.toString()).toEqual('ID');
    expect(PostFilterFields.title.type.toString()).toEqual('String');
    expect(PostFilterFields.views.type.toString()).toEqual('Int');
    expect(PostFilterFields.user_id.type.toString()).toEqual('ID');
    const UserFilterFields = filterTypes.User.getFields();
    expect(UserFilterFields.id.type.toString()).toEqual('ID');
    expect(UserFilterFields.name.type.toString()).toEqual('String');
});

test('allows to override each entity primary key', () => {
    const filterTypes = getFilterTypesFromData(dataCustomIds, {
        getPrimaryKey: typeName => (typeName === 'posts' ? 'postId' : 'userId'),
    });
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.postId.type.toString()).toEqual('ID');
    expect(PostFilterFields.title.type.toString()).toEqual('String');
    expect(PostFilterFields.views.type.toString()).toEqual('Int');
    expect(PostFilterFields.user_id.type.toString()).toEqual('ID');
    const UserFilterFields = filterTypes.User.getFields();
    expect(UserFilterFields.userId.type.toString()).toEqual('ID');
    expect(UserFilterFields.name.type.toString()).toEqual('String');
});

test('creates one q field per entity field', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.q.type.toString()).toEqual('String');
    const UserFilterFields = filterTypes.User.getFields();
    expect(UserFilterFields.q.type.toString()).toEqual('String');
});

test('creates 4 fields for number field for range filters', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.views_lt.type.toString()).toEqual('Int');
    expect(PostFilterFields.views_lte.type.toString()).toEqual('Int');
    expect(PostFilterFields.views_gt.type.toString()).toEqual('Int');
    expect(PostFilterFields.views_gte.type.toString()).toEqual('Int');
});

test('does not create comparison fiels for non-number fields', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.title_lte).toBeUndefined();
});
