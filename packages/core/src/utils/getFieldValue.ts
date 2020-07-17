import get from 'lodash.get';

import { FormupFormikForm } from '../interfaces';

/**
 * If defined, extracts the field label from the schema.
 * @param name The field name
 * @param form The form
 */
const getFieldValue = (
  name: string,
  form: FormupFormikForm,
) => {
  const fieldValue = get(form?.values || {}, name);

  return fieldValue;
};

export default getFieldValue;
