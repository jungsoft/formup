import { FormupYupSchema } from '../interfaces';

/**
 * Checks if one field is required in the schema.
 * @param schema Yup schema
 */
const isFieldRequired = (name: string, schema: FormupYupSchema) => {
  const field = schema && schema?.fields[name];

  return field?._exclusive?.required || false;
};

export default isFieldRequired;
