import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';
import getSchemaField from './getSchemaField';

/**
 * Extracts the field type from the schema.
 * @param name The field name
 * @param schema The schema
 * @param options The options
 */
const getFieldType = (
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

  return schemaField?.[yupSchemaFieldProperties.type];
};

export default getFieldType;
