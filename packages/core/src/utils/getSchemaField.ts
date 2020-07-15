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
  const schemaField = schema?.fields?.[name];

  return schemaField;
};

export default getSchemaField;
