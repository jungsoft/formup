/**
 * Checks if one FormInput has error according to Formik meta properties.
 *
 * @param formInputMeta Result of form.getFieldMeta(name).
 */
const checkFormInputError = (formInputMeta: any) => (
  !!(formInputMeta?.touched && formInputMeta?.error)
);

export default checkFormInputError;
