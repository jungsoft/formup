import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';
import getSchemaField from './getSchemaField';

/**
 * Checks if one field is required in the schema.
 * @param schema Yup schema
 * @param options The options
 */
const isFieldRequired = (
  name: string,
  schema: FormupYupSchema,
  options?: getSchemaFieldOptions,
) => {
  const schemaField = getSchemaField(name, schema, options);

  return (
    schemaField?.[yupSchemaFieldProperties.exclusive]?.required
    || false
  );
};

export default isFieldRequired;
