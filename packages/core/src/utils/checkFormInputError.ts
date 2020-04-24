/**
 * Checks if one FormInput has error according to Formik meta properties.
 *
 * Returns an object containing a boolean indicating if there are any errors,
 * and if there are, a string containing the error message.
 *
 * @param formInputMeta Result of form.getFieldMeta(name).
 */
const checkFormInputError = (formInputMeta: any) => {
  const hasErrors = !!(formInputMeta?.touched && formInputMeta?.error);

  return {
    hasErrors,
    errorMessage: (
      hasErrors
        ? formInputMeta?.error
        : undefined
    ),
  };
};

export default checkFormInputError;
