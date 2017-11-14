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
            tables[i].forEach(element => {
                for (var j in element) {
                    if (j == schemas[i].hash_attribute) {
                        element['id'] = element[j];
                        delete element[j];
                        break;
                    }
                }
            });
            objectData[attribute] = tables[i];
        }
        return objectData;
    } else {
        return {};
    }
};
