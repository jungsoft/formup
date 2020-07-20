import get from 'lodash.get';

import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';

/**
 * Recursively gets one schema field according to its name.
 * @param name The field name
 * @param schema The schema
 * @param options The options
 */
const getSchemaField = (
  name: string,
  schema: FormupYupSchema,
  options?: getSchemaFieldOptions,
) => {
  // Support nested fields
  let fieldPath = String(name || '')
    .split('.')
    .reduce((prev, curr) => `${prev}.fields.${curr}`);

  // Remove array indexes
  if (fieldPath.includes('[')) {
    fieldPath = fieldPath.substring(0, fieldPath.indexOf('['));
  }

  const schemaField = get(schema?.fields || {}, fieldPath);

  if (options?.returnSubtype) {
    return schemaField?.[yupSchemaFieldProperties.subType];
  }

  return schemaField;
};

export default getSchemaField;
