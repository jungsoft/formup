import { FormupYupSchema } from '../interfaces';

/**
 * Checks if one field is required in the schema.
 * @param schema Yup schema
 */
const isFieldRequired = (name: string, schema: FormupYupSchema) => {
  const schemaField = schema?.fields?.[name];

  return schemaField?._exclusive?.required || false;
};

export default isFieldRequired;
