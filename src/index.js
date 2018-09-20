import isRelationshipFieldImport from './isRelationshipField';
import getSchemaFromDataImport from './getSchemaFromData';
import * as graphql from 'graphql';

export * from './nameConverter';
export const isRelationshipField = isRelationshipFieldImport;
export default getSchemaFromDataImport;
export const getSchemaFromData = getSchemaFromDataImport;
export const printSchema = graphql.printSchema;
