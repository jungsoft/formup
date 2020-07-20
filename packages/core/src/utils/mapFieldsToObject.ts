import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import fieldDefaultValues from '../constants/fieldDefaultValues';
import tryGetSchemaValue from './tryGetSchemaValue';
import fieldTypes from '../constants/fieldTypes';

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
      [fieldTypes.object]: addKeyValue(
        mapFieldsToObject(fields[key].fields),
        fieldDefaultValues.object,
      ),

      [fieldTypes.boolean]: addKeyValue(
        defaultValue,
        fieldDefaultValues.boolean,
      ),

      [fieldTypes.string]: addKeyValue(
        defaultValue,
        fieldDefaultValues.string,
      ),

      [fieldTypes.number]: addKeyValue(
        defaultValue,
        fieldDefaultValues.number,
      ),

      [fieldTypes.date]: addKeyValue(
        defaultValue,
        fieldDefaultValues.date,
      ),
    })[type] || acc;

    return descriptionTypeMapper(description.type);
  }, {});
};

export default mapFieldsToObject;
