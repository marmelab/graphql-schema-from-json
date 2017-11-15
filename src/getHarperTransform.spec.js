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
import Converter from './harperSchemaConverter';
import GetHashAttributeId from './getHashAttributeId';
let productSchema = {
    id: 'd5b33b482-156d-4b21-b9dc-dbe3ec391277',
    hash_attribute: 'product_id',
    name: 'products',
    schema: 'northwnd',
    attributes: [
        {
            attribute: 'product_id',
        },
        {
            attribute: 'productname',
        },
    ],
};

let productSqlResult = [
    {
        product_id: 1234,
        productname: 'Chai',
        customer_id: 1,
    },
    {
        product_id: 4321,
        productname: 'Chang',
        customer_id: 2,
    },
    {
        product_id: 4444,
        productname: 'Cha',
        customer_id: 3,
    },
    {
        product_id: 4333,
        productname: 'Chu',
        customer_id: 3,
    },
];

let customerSchema = {
    id: 'd5b33b482-156d-4b21-b9dc-dbe3ec391277',
    hash_attribute: 'customer_id',
    name: 'customers',
    schema: 'northwnd',
    attributes: [
        {
            attribute: 'customer_id',
        },
        {
            attribute: 'customername',
        },
    ],
};

let customerSqlResult = [
    {
        customer_id: 1,
        customername: 'Robert',
    },
    {
        customer_id: 2,
        customername: 'Robin',
    },
    {
        customer_id: 3,
        customername: 'Ronan',
    },
];

const productSqlResultType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        product_id: { type: new GraphQLNonNull(GraphQLID) },
        productname: { type: new GraphQLNonNull(GraphQLString) },
        customer_id: { type: new GraphQLInt() },
    }),
});

let schema = {
    id: 'd5b5b482-156d-4b21-b9dc-dbe3ec391277',
    hash_attribute: 'productid',
    name: 'products',
    schema: 'northwnd',
    attributes: [
        {
            attribute: 'unitsnnorder',
        },
        {
            attribute: 'productname',
        },
        {
            attribute: 'unitsinstock',
        },
        {
            attribute: 'categoryid',
        },
        {
            attribute: 'reorderlevel',
        },
        {
            attribute: 'productid',
        },
        {
            attribute: 'discontinued',
        },
        {
            attribute: 'supplierid',
        },
        {
            attribute: 'quantityperunit',
        },
        {
            attribute: 'unitprice',
        },
    ],
};

let sqlresult = [
    {
        unitsnnorder: 0,
        productname: 'Chai',
        categoryid: 1,
        reorderlevel: 10,
        unitsinstock: 39,
        productid: 1,
        discontinued: 'False',
        supplierid: 1,
        quantityperunit: '10 boxes x 20 bags',
        unitprice: 18,
    },
    {
        unitsnnorder: 40,
        productname: 'Chang',
        categoryid: 1,
        reorderlevel: 25,
        unitsinstock: 17,
        productid: 2,
        discontinued: 'False',
        supplierid: 1,
        quantityperunit: '24 - 12 oz bottles',
        unitprice: 19,
    },
    {
        unitsnnorder: 70,
        productname: 'Aniseed Syrup',
        categoryid: 2,
        reorderlevel: 25,
        unitsinstock: 13,
        productid: 3,
        discontinued: 'False',
        supplierid: 1,
        quantityperunit: '12 - 550 ml bottles',
        unitprice: 10,
    },
    {
        unitsnnorder: 0,
        productname: "Chef Anton's Cajun Seasoning",
        categoryid: 2,
        reorderlevel: 0,
        unitsinstock: 53,
        productid: 4,
        discontinued: 'False',
        supplierid: 2,
        quantityperunit: '48 - 6 oz jars',
        unitprice: 22,
    },
    {
        unitsnnorder: 0,
        productname: "Chef Anton's Gumbo Mix",
        categoryid: 2,
        reorderlevel: 0,
        unitsinstock: 0,
        productid: 5,
        discontinued: 'True',
        supplierid: 2,
        quantityperunit: '36 boxes',
        unitprice: 21.35,
    },
    {
        unitsnnorder: 0,
        productname: "Grandma's Boysenberry Spread",
        categoryid: 2,
        reorderlevel: 25,
        unitsinstock: 120,
        productid: 6,
        discontinued: 'False',
        supplierid: 3,
        quantityperunit: '12 - 8 oz jars',
        unitprice: 25,
    },
    {
        unitsnnorder: 0,
        productname: "Uncle Bob's Organic Dried Pears",
        categoryid: 7,
        reorderlevel: 10,
        unitsinstock: 15,
        productid: 7,
        discontinued: 'False',
        supplierid: 3,
        quantityperunit: '12 - 1 lb pkgs.',
        unitprice: 30,
    },
    {
        unitsnnorder: 0,
        productname: 'Northwoods Cranberry Sauce',
        categoryid: 2,
        reorderlevel: 0,
        unitsinstock: 6,
        productid: 8,
        discontinued: 'False',
        supplierid: 3,
        quantityperunit: '12 - 12 oz jars',
        unitprice: 40,
    },
    {
        unitsnnorder: 0,
        productname: 'Mishi Kobe Niku',
        categoryid: 6,
        reorderlevel: 0,
        unitsinstock: 29,
        productid: 9,
        discontinued: 'True',
        supplierid: 4,
        quantityperunit: '18 - 500 g pkgs.',
        unitprice: 97,
    },
    {
        unitsnnorder: 0,
        productname: 'Ikura',
        categoryid: 8,
        reorderlevel: 0,
        unitsinstock: 31,
        productid: 10,
        discontinued: 'False',
        supplierid: 4,
        quantityperunit: '12 - 200 ml jars',
        unitprice: 31,
    },
    {
        unitsnnorder: 30,
        productname: 'Queso Cabrales',
        categoryid: 4,
        reorderlevel: 30,
        unitsinstock: 22,
        productid: 11,
        discontinued: 'False',
        supplierid: 5,
        quantityperunit: '1 kg pkg.',
        unitprice: 21,
    },
    {
        unitsnnorder: 0,
        productname: 'Queso Manchego La Pastora',
        categoryid: 4,
        reorderlevel: 0,
        unitsinstock: 86,
        productid: 12,
        discontinued: 'False',
        supplierid: 5,
        quantityperunit: '10 - 500 g pkgs.',
        unitprice: 38,
    },
    {
        unitsnnorder: 0,
        productname: 'Konbu',
        categoryid: 8,
        reorderlevel: 5,
        unitsinstock: 24,
        productid: 13,
        discontinued: 'False',
        supplierid: 6,
        quantityperunit: '2 kg box',
        unitprice: 6,
    },
    {
        unitsnnorder: 0,
        productname: 'Tofu',
        categoryid: 7,
        reorderlevel: 0,
        unitsinstock: 35,
        productid: 14,
        discontinued: 'False',
        supplierid: 6,
        quantityperunit: '40 - 100 g pkgs.',
        unitprice: 23.25,
    },
    {
        unitsnnorder: 0,
        productname: 'Genen Shouyu',
        categoryid: 2,
        reorderlevel: 5,
        unitsinstock: 39,
        productid: 15,
        discontinued: 'False',
        supplierid: 6,
        quantityperunit: '24 - 250 ml bottles',
        unitprice: 15.5,
    },
    {
        unitsnnorder: 0,
        productname: 'Pavlova',
        categoryid: 3,
        reorderlevel: 10,
        unitsinstock: 29,
        productid: 16,
        discontinued: 'False',
        supplierid: 7,
        quantityperunit: '32 - 500 g boxes',
        unitprice: 17.45,
    },
    {
        unitsnnorder: 0,
        productname: 'Alice Mutton',
        categoryid: 6,
        reorderlevel: 0,
        unitsinstock: 0,
        productid: 17,
        discontinued: 'True',
        supplierid: 7,
        quantityperunit: '20 - 1 kg tins',
        unitprice: 39,
    },
    {
        unitsnnorder: 0,
        productname: 'Carnarvon Tigers',
        categoryid: 8,
        reorderlevel: 0,
        unitsinstock: 42,
        productid: 18,
        discontinued: 'False',
        supplierid: 7,
        quantityperunit: '16 kg pkg.',
        unitprice: 62.5,
    },
    {
        unitsnnorder: 0,
        productname: 'Teatime Chocolate Biscuits',
        categoryid: 3,
        reorderlevel: 5,
        unitsinstock: 25,
        productid: 19,
        discontinued: 'False',
        supplierid: 8,
        quantityperunit: '10 boxes x 12 pieces',
        unitprice: 9.2,
    },
    {
        unitsnnorder: 0,
        productname: "Sir Rodney's Marmalade",
        categoryid: 3,
        reorderlevel: 0,
        unitsinstock: 40,
        productid: 20,
        discontinued: 'False',
        supplierid: 8,
        quantityperunit: '30 gift boxes',
        unitprice: 81,
    },
    {
        unitsnnorder: 40,
        productname: "Sir Rodney's Scones",
        categoryid: 3,
        reorderlevel: 5,
        unitsinstock: 3,
        productid: 21,
        discontinued: 'False',
        supplierid: 8,
        quantityperunit: '24 pkgs. x 4 pieces',
        unitprice: 10,
    },
    {
        unitsnnorder: 0,
        productname: "Gustaf's Kn\ufffdckebr\ufffdd",
        categoryid: 5,
        reorderlevel: 25,
        unitsinstock: 104,
        productid: 22,
        discontinued: 'False',
        supplierid: 9,
        quantityperunit: '24 - 500 g pkgs.',
        unitprice: 21,
    },
    {
        unitsnnorder: 0,
        productname: 'Tunnbr\ufffdd',
        categoryid: 5,
        reorderlevel: 25,
        unitsinstock: 61,
        productid: 23,
        discontinued: 'False',
        supplierid: 9,
        quantityperunit: '12 - 250 g pkgs.',
        unitprice: 9,
    },
    {
        unitsnnorder: 0,
        productname: 'Guaran\ufffd Fant\ufffdstica',
        categoryid: 1,
        reorderlevel: 0,
        unitsinstock: 20,
        productid: 24,
        discontinued: 'True',
        supplierid: 10,
        quantityperunit: '12 - 355 ml cans',
        unitprice: 4.5,
    },
    {
        unitsnnorder: 0,
        productname: 'NuNuCa Nu\ufffd-Nougat-Creme',
        categoryid: 3,
        reorderlevel: 30,
        unitsinstock: 76,
        productid: 25,
        discontinued: 'False',
        supplierid: 11,
        quantityperunit: '20 - 450 g glasses',
        unitprice: 14,
    },
    {
        unitsnnorder: 0,
        productname: 'Gumb\ufffdr Gummib\ufffdrchen',
        categoryid: 3,
        reorderlevel: 0,
        unitsinstock: 15,
        productid: 26,
        discontinued: 'False',
        supplierid: 11,
        quantityperunit: '100 - 250 g bags',
        unitprice: 31.23,
    },
    {
        unitsnnorder: 0,
        productname: 'Schoggi Schokolade',
        categoryid: 3,
        reorderlevel: 30,
        unitsinstock: 49,
        productid: 27,
        discontinued: 'False',
        supplierid: 11,
        quantityperunit: '100 - 100 g pieces',
        unitprice: 43.9,
    },
    {
        unitsnnorder: 0,
        productname: 'R\ufffdssle Sauerkraut',
        categoryid: 7,
        reorderlevel: 0,
        unitsinstock: 26,
        productid: 28,
        discontinued: 'True',
        supplierid: 12,
        quantityperunit: '25 - 825 g cans',
        unitprice: 45.6,
    },
    {
        unitsnnorder: 0,
        productname: 'Th\ufffdringer Rostbratwurst',
        categoryid: 6,
        reorderlevel: 0,
        unitsinstock: 0,
        productid: 29,
        discontinued: 'True',
        supplierid: 12,
        quantityperunit: '50 bags x 30 sausgs.',
        unitprice: 123.79,
    },
    {
        unitsnnorder: 0,
        productname: 'Nord-Ost Matjeshering',
        categoryid: 8,
        reorderlevel: 15,
        unitsinstock: 10,
        productid: 30,
        discontinued: 'False',
        supplierid: 13,
        quantityperunit: '10 - 200 g glasses',
        unitprice: 25.89,
    },
    {
        unitsnnorder: 70,
        productname: 'Gorgonzola Telino',
        categoryid: 4,
        reorderlevel: 20,
        unitsinstock: 0,
        productid: 31,
        discontinued: 'False',
        supplierid: 14,
        quantityperunit: '12 - 100 g pkgs',
        unitprice: 12.5,
    },
    {
        unitsnnorder: 40,
        productname: 'Mascarpone Fabioli',
        categoryid: 4,
        reorderlevel: 25,
        unitsinstock: 9,
        productid: 32,
        discontinued: 'False',
        supplierid: 14,
        quantityperunit: '24 - 200 g pkgs.',
        unitprice: 32,
    },
    {
        unitsnnorder: 0,
        productname: 'Geitost',
        categoryid: 4,
        reorderlevel: 20,
        unitsinstock: 112,
        productid: 33,
        discontinued: 'False',
        supplierid: 15,
        quantityperunit: '500 g',
        unitprice: 2.5,
    },
    {
        unitsnnorder: 0,
        productname: 'Sasquatch Ale',
        categoryid: 1,
        reorderlevel: 15,
        unitsinstock: 111,
        productid: 34,
        discontinued: 'False',
        supplierid: 16,
        quantityperunit: '24 - 12 oz bottles',
        unitprice: 14,
    },
    {
        unitsnnorder: 0,
        productname: 'Steeleye Stout',
        categoryid: 1,
        reorderlevel: 15,
        unitsinstock: 20,
        productid: 35,
        discontinued: 'False',
        supplierid: 16,
        quantityperunit: '24 - 12 oz bottles',
        unitprice: 18,
    },
];

// test('generate graphQL schema based on simple schema and data with field_id syntax', () => {
//     const testSchema = [productSchema];
//     const testSQL = [productSqlResult];
//     let q = Converter(testSchema, testSQL);

//     // console.log(q);
//     const schema = getSchemaFromData(q, {
//         getPrimaryKey: entityName => {
//             return GetHashAttributeId(entityName, testSchema); // this function maked hash_attribute to id
//             console.log(entityName);
//         },
//     });
//     // let queries = getSchemaFromData(q);
//     console.log(printSchema(schema));
// });

// test('generate graphQL schema based on more complex schema and data using the hash_attribute as the id', () => {
//     const testSchema = [schema];
//     const testSQL = [sqlresult];
//     let q = Converter(testSchema, testSQL);
//     // console.log(q);
//     const schemasQl = getSchemaFromData(q, {
//                 getPrimaryKey: entityName => {
//                     return GetHashAttributeId(entityName, testSchema); // this function maked hash_attribute to id
//                     console.log(entityName);
//                 },
//     });
//     console.log(printSchema(schemasQl));
// });

test('creates three query fields per data type', () => {
    const testSchema = [productSchema, customerSchema];
    const testSQL = [productSqlResult, customerSqlResult];
    let q = Converter(testSchema, testSQL);

    // console.log(q);
    let schema = getSchemaFromData(q, {
        getPrimaryKey: entityName => {
            return GetHashAttributeId(entityName, testSchema); // this function maked hash_attribute to id
        },
    });
    console.log(printSchema(schema));
    let queries = schema.getQueryType().getFields();
    // console.log(queries);
    expect(queries['Product'].type.name).toEqual(productSqlResultType.name);

    expect(queries['allProducts'].args[0].name).toEqual('page');
    expect(queries['allProducts'].args[0].type).toEqual(GraphQLInt);
    expect(queries['allProducts'].args[1].name).toEqual('perPage');
    expect(queries['allProducts'].args[1].type).toEqual(GraphQLInt);
    expect(queries['allProducts'].args[2].name).toEqual('sortField');
    expect(queries['allProducts'].args[2].type).toEqual(GraphQLString);
    expect(queries['allProducts'].args[3].name).toEqual('sortOrder');
    expect(queries['allProducts'].args[3].type).toEqual(GraphQLString);
    expect(queries['allProducts'].args[4].name).toEqual('filter');
    expect(queries['allProducts'].args[4].type.toString()).toEqual(
        'ProductFilter'
    );
    expect(queries['_allProductsMeta'].type.toString()).toEqual('ListMetadata');
});

test('creates one field per relationship', () => {
    const testSchema = [productSchema, customerSchema];
    const testSQL = [productSqlResult, customerSqlResult];
    let q = Converter(testSchema, testSQL);

    const typeMap = getSchemaFromData(q, {
        getPrimaryKey: entityName => {
            return GetHashAttributeId(entityName, testSchema); // this function maked hash_attribute to id
        },
    }).getTypeMap();

    // one Customer has many products
    expect(Object.keys(typeMap['Customer'].getFields())).toContain('Products');

    // one Product has one Customer
    expect(Object.keys(typeMap['Product'].getFields())).toContain('Customer');
});

test('creates three mutation fields per data type', () => {
    const testSchema = [productSchema, customerSchema];
    const testSQL = [productSqlResult, customerSqlResult];
    let q = Converter(testSchema, testSQL);

    const mutations = getSchemaFromData(q, {
        getPrimaryKey: entityName => {
            return GetHashAttributeId(entityName, testSchema); // this function maked hash_attribute to id
        },
    })
        .getMutationType()
        .getFields();

    expect(mutations['createProduct'].type.name).toEqual(
        productSqlResultType.name
    );
    expect(mutations['createProduct'].args).toEqual([
        {
            name: 'product_id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'productname',
            type: new GraphQLNonNull(GraphQLString),
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'customer_id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
    ]);

    expect(mutations['updateProduct'].type.name).toEqual(
        productSqlResultType.name
    );
    expect(mutations['updateProduct'].args).toEqual([
        {
            name: 'product_id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'productname',
            type: GraphQLString,
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'customer_id',
            type: GraphQLID,
            defaultValue: undefined,
            description: null,
        },
    ]);

    expect(mutations['removeProduct'].type.name).toEqual(GraphQLBoolean.name);
    expect(mutations['removeProduct'].args).toEqual([
        {
            name: 'product_id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
    ]);
});
