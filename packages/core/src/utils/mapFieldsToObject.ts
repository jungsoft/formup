import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import tryGetSchemaValue from './tryGetSchemaValue';

/**
 * Default values for mapping object types.
 */
const MAP_DEFAULTS = {
  string: '',
  boolean: false,
  number: 0,
  date: new Date(),
  object: {},
};

/**
 * Recursively create an object mapping the fields of one schema.
 * @param fields Schema fields.
 */
const mapFieldsToObject = (fields: object) => {
  if (!fields) {
    return {};
  }

  return fields && Object.keys(fields).reduce((acc, key) => {
    const description = tryGetSchemaValue(
      fields[key],
      yupSchemaFieldProperties.describe,
      {},
    );

    const defaultValue = tryGetSchemaValue(
      fields[key],
      yupSchemaFieldProperties.default,
    );

    const addKeyValue = (value: any, fallbackValue: any) => ({
      ...acc,
      [key]: value !== undefined ? value : fallbackValue,
    });

    const descriptionTypeMapper = (type: string): object => ({
      object: addKeyValue(mapFieldsToObject(fields[key].fields), MAP_DEFAULTS.object),
      boolean: addKeyValue(defaultValue, MAP_DEFAULTS.boolean),
      string: addKeyValue(defaultValue, MAP_DEFAULTS.string),
      number: addKeyValue(defaultValue, MAP_DEFAULTS.number),
      date: addKeyValue(defaultValue, MAP_DEFAULTS.date),
    })[type] || acc;

    return descriptionTypeMapper(description.type);
  }, {});
};

export default mapFieldsToObject;
