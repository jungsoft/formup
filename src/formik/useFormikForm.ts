import { useFormik, FormikConfig } from 'formik';
import * as yup from 'yup';

import mapFieldsToObject from '../utils/mapFieldsToObject';

/**
 * Creates a formik form with useFormik hook.
 * @param schema Yup schema.
 * @param payload Payload of options to create the formik form.
 */
const useFormikForm = (
  schema: yup.SchemaDescription,
  payload?: FormikConfig<any>,
) => useFormik<any>({
  ...payload,
  validationSchema: schema,
  initialValues: mapFieldsToObject(schema.fields),
  onSubmit: payload && payload.onSubmit ? payload.onSubmit : () => {},
});

export default useFormikForm;
