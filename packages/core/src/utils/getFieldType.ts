import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';
import getSchemaField from './getSchemaField';
import defaultSchemaFieldOptions from '../constants/defaultSchemaFieldOptions';

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
  const schemaField = getSchemaField(name, schema, {
    ...defaultSchemaFieldOptions,
    ...(options || {}),
  });

  return schemaField?.[yupSchemaFieldProperties.type];
};

export default getFieldType;
