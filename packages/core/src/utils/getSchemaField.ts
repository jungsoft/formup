import get from 'lodash.get';

import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import fieldTypes from '../constants/fieldTypes';
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
): FormupYupSchema => {
  // Support nested fields
  const originalPath = String(name || '')
    .split('.')
    .reduce((prev, curr) => `${prev}.fields.${curr}`);

  let fieldPath = originalPath;

  // Get array schema
  if (originalPath.includes('[')) {
    fieldPath = fieldPath.substring(0, fieldPath.indexOf('['));
  }

  const schemaField = get(schema?.fields || {}, fieldPath);

  if (options?.returnSubtype) {
    if (schemaField?.[yupSchemaFieldProperties.type] === fieldTypes.array) {
      const nestedPath = originalPath.replace(/\.fields/g, '').split('.');
      const subType = schemaField?.[yupSchemaFieldProperties.subType];
      const isObjectType = subType?.[yupSchemaFieldProperties.type] === fieldTypes.object;

      if (!isObjectType || nestedPath.length <= 1) {
        return subType;
      }

      // Get schema field for nested objects
      return getSchemaField(
        nestedPath.filter((_, index) => index >= 1).join('.'),
        subType,
        options,
      );
    }
  }

  return schemaField;
};

export default getSchemaField;
