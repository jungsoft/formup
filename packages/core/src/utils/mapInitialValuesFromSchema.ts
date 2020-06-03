import merge from 'merge';

import mapFieldsToObject from './mapFieldsToObject';
import { FormupYupSchema } from '../interfaces';

/**
 * Recursively creates an object of initial values based on the fields of one schema.
 * This will consider default values from yup.
 *
 * You can override the initial values by passing an object as the second parameter,
 * which is optional. This will inject your custom values merged with the actual
 * initial values object generated from the schema.
 *
 * @param schema The schema
 * @param override Override object
 */
const mapInitialValuesFromSchema = (
  schema: FormupYupSchema,
  override?: object,
) => {
  const initialValuesFromSchema = (
    schema?.fields
      ? mapFieldsToObject(schema?.fields)
      : {}
  );

  return merge.recursive(
    (initialValuesFromSchema || {}),
    (override || {}),
  );
};

export default mapInitialValuesFromSchema;
