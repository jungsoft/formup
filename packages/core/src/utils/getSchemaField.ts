import get from 'lodash.get';

import { FormupYupSchema } from '../interfaces';

/**
 * Recursively gets one schema field according to its name.
 * @param name The field name
 * @param schema The schema
 */
const getSchemaField = (
  name: string,
  schema: FormupYupSchema,
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

  return schemaField;
};

export default getSchemaField;
