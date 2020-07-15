import { FormupYupSchema } from '../interfaces';

/**
 * If defined, extracts the field label from the schema.
 * @param name The field name
 * @param schema The schema
 */
const getInputLabel = (
  name: string,
  schema: FormupYupSchema,
) => {
  const schemaField = schema?.fields?.[name];

  return schemaField?.['_label'];
};

export default getInputLabel;
