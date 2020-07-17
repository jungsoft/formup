import isFunction from 'lodash.isfunction';

import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';
import fieldDefaultValues from '../constants/fieldDefaultValues';
import getSchemaField from './getSchemaField';
import getFieldType from './getFieldType';

/**
 * Extracts the default value on the field definition from the schema, if it exists.
 * Coalesces to the default value for the field type, if it exists.
 *
 * @param name The field name
 * @param schema The schema
 * @param options The options
 */
const getFieldDefaultValue = (
  name: string,
  schema: FormupYupSchema,
  options?: getSchemaFieldOptions,
) => {
  const schemaField = getSchemaField(name, schema, options);

  const defaultFn = schemaField?.[yupSchemaFieldProperties.default];

  let result;

  if (isFunction(defaultFn)) {
    try {
      result = defaultFn();
    } catch {
      result = undefined;
    }
  }

  if (result === undefined) {
    const fieldType = getFieldType(name, schema, options);

    if (fieldType && fieldDefaultValues[fieldType] !== undefined) {
      result = fieldDefaultValues[fieldType];
    }
  }

  return result;
};

export default getFieldDefaultValue;
