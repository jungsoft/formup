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
  const originalPath = String(name || '').split('.');

  // Support nested fields
  let fieldPath = originalPath.reduce((prev, curr) => `${prev}.fields.${curr}`);

  // Get array schema
  if (fieldPath.includes('[')) {
    fieldPath = fieldPath.substring(0, fieldPath.indexOf('['));
  }

  // Remove .fields added previously since is recursive (will be added in the next iteration)
  const nestedPath = fieldPath.replace(/\.fields/g, '');

  // Regex to remove current level path
  const nestedPathRegex = new RegExp(`${nestedPath}\\[(\\d*)\\].`);

  const schemaField = get(schema?.fields || {}, fieldPath);

  if (options?.returnSubtype) {
    if (schemaField?.[yupSchemaFieldProperties.type] === fieldTypes.array) {
      const subType = schemaField?.[yupSchemaFieldProperties.subType];
      const isObjectType = subType?.[yupSchemaFieldProperties.type] === fieldTypes.object;

      if (!isObjectType || originalPath.length <= 1) {
        return subType;
      }

      // Get schema field for nested objects
      return getSchemaField(
        name.replace(nestedPathRegex, ''),
        subType,
        options,
      );
    }
  }

  return schemaField;
};

export default getSchemaField;
