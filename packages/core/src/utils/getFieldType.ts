import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema } from '../interfaces';
import getSchemaField from './getSchemaField';

/**
 * Extracts the field type from the schema.
 * @param name The field name
 * @param schema The schema
 */
const getFieldType = (
  name: string,
  schema: FormupYupSchema,
) => {
  const schemaField = getSchemaField(name, schema);

  return schemaField?.[yupSchemaFieldProperties.type];
};

export default getFieldType;
