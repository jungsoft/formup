import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';
import getSchemaField from './getSchemaField';

/**
 * If defined, extracts the field label from the schema.
 * @param name The field name
 * @param schema The schema
 * @param options The options
 */
const getFieldLabel = (
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

  return schemaField?.[yupSchemaFieldProperties.label];
};

export default getFieldLabel;
