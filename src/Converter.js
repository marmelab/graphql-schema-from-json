export default (table = [], tuple = []) => {
    let objectData = {};
    if(table.length == tuple.length && table.length > 0 && tuple.length > 0) {
        for (let i = 0 ; i < table.length; i++) {
           const attribute = table[i].name;
           objectData[attribute] = tuple[i];
        }
        return (objectData);
    } else {
        return {};
    }
};

