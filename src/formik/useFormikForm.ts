import { useFormik, FormikConfig } from 'formik';

import mapFieldsToObject from '../utils/mapFieldsToObject';
import { YupSchema } from '../yup/types';

/**
 * Creates a formik form with useFormik hook.
 * @param schema Yup schema.
 * @param payload Payload of options to create the formik form.
 */
const useFormikForm = (
  schema: YupSchema,
  payload?: FormikConfig<any>,
) => useFormik<any>({
  ...payload,
  validationSchema: schema,
  initialValues: mapFieldsToObject(schema.fields),
  onSubmit: payload && payload.onSubmit ? payload.onSubmit : () => {},
});

export default useFormikForm;
