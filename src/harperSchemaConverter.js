/**
 * 
 * @param {[]} fieldName 'tables []'
 * @ {[]} 'table schemas []'
 */
export default (schemas = [], tables = []) => {
    let objectData = {};
    if (
        schemas.length == tables.length &&
        schemas.length > 0 &&
        tables.length > 0
    ) {
        for (let i = 0; i < schemas.length; i++) {
            const attribute = schemas[i].name;
            objectData[attribute] = tables[i];
        }
        return objectData;
    } else {
        return {};
    }
};
