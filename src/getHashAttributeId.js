import { camelize, pluralize, singularize } from 'inflection';

export default (entityName, schemas = []) => {
    for (let i = 0; i < schemas.length; i++) {
        const attribute = camelize(singularize(schemas[i].name));
        if (attribute == entityName)
            return schemas[i].hash_attribute;
    }
    return "id";
}
