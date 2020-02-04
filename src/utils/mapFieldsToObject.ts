import tryGetFunctionValue from './tryGetFunctionValue';

/**
 * Recursively create an object mapping the fields of one schema.
 * @param fields Schema fields.
 */
const mapFieldsToObject = (fields: object) => {
  if (!fields) {
    return {};
  }

  return fields && Object.keys(fields).reduce((acc, key) => {
    const description = tryGetFunctionValue(fields[key], 'describe', {});
    const defaultValue = tryGetFunctionValue(fields[key], 'default');

    const addKeyValue = (value: any) => ({
      ...acc,
      [key]: value,
    });

    const descriptionTypeMapper = (type: string): object => ({
      string: addKeyValue(defaultValue || ''),
      boolean: addKeyValue(defaultValue || true),
      number: addKeyValue(defaultValue || 0),
      date: addKeyValue(defaultValue || new Date()),
      object: addKeyValue(mapFieldsToObject(fields[key].fields)),
    })[type] || acc;

    return descriptionTypeMapper(description.type);
  }, {});
};

export default mapFieldsToObject;
