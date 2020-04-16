import tryGetSchemaValue from './tryGetSchemaValue';
import { FormupFormikForm } from '../interfaces';

/**
 * Updates a Formik form to set fields as touched.
 * @param form Formik form.
 * @param fields Fields.
 * @param parentPath Relative path.
 */
const setFieldsTouched = (
  form: FormupFormikForm,
  fields: object,
  parentPath: string = '',
) => Object.keys(fields).forEach((key) => {
  const description = tryGetSchemaValue(fields[key], 'describe', {});

  if (description) {
    const path = `${parentPath && `${parentPath}.`}${key}`;

    if (description.type === 'object') {
      setFieldsTouched(form, fields[key].fields, path);
      return;
    }

    form.setFieldTouched(path, true);
  }
});

export default setFieldsTouched;
