import isFunction from 'lodash.isfunction';

import yupSchemaFieldProperties from '../constants/yupSchemaFieldProperties';
import { FormupYupSchema, getSchemaFieldOptions } from '../interfaces';
import getSchemaField from './getSchemaField';

/**
 * If defined, extracts the default value on the field definition from the schema.
 * @param name The field name
 * @param schema The schema
 * @param options The options
 */
const getFieldDefaultValue = (
  name: string,
  schema: FormupYupSchema,
  options?: getSchemaFieldOptions,
) => {
  const schemaField = getSchemaField(name, schema, options);

  const defaultFn = schemaField?.[yupSchemaFieldProperties.default];

  if (!isFunction(defaultFn)) {
    return undefined;
  }

  return defaultFn();
};

export default getFieldDefaultValue;
