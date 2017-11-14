/**
 * 
 * @param {[]} fieldName 'tables []'
 * @ {[]} 'table schemas []'
 */
export default (tables = [], schemas = []) => {
    let objectData = {};
    if (
        tables.length == schemas.length &&
        tables.length > 0 &&
        schemas.length > 0
    ) {
        for (let i = 0; i < tables.length; i++) {
            const attribute = tables[i].name;
            objectData[attribute] = schemas[i];
        }
        return objectData;
    } else {
        return {};
    }
};
