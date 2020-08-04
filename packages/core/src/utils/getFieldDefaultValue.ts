import isFunction from 'lodash.isfunction';

import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';
import fieldDefaultValues from '../constants/fieldDefaultValues';
import mapFieldsToObject from './mapFieldsToObject';
import fieldTypes from '../constants/fieldTypes';
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
  const defaultOptions = {
    returnSubtype: true,
  };

  const schemaField = getSchemaField(name, schema, {
    ...defaultOptions,
    ...options,
  });

  const defaultFn = schemaField?.[yupSchemaFieldProperties.default];

  let result;

  // Get default value from schema default function
  if (isFunction(defaultFn)) {
    try {
      result = defaultFn();
    } catch {
      result = undefined;
    }
  }

  // Coalesce to type default value or object initialized value
  if (result === undefined) {
    const fieldType = getFieldType(name, schema, options);

    if (fieldType === fieldTypes.object && schemaField?.fields) {
      result = mapFieldsToObject(schemaField?.fields);
    } else if (fieldType) {
      result = fieldDefaultValues[fieldType];
    }
  }

  return result;
};

export default getFieldDefaultValue;
