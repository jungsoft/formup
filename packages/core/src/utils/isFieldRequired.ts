import { FormupYupSchema } from '../interfaces';
import getSchemaField from './getSchemaField';

/**
 * Checks if one field is required in the schema.
 * @param schema Yup schema
 */
const isFieldRequired = (
  name: string,
  schema: FormupYupSchema,
) => {
  const schemaField = getSchemaField(name, schema);

  return schemaField?._exclusive?.required || false;
};

export default isFieldRequired;
