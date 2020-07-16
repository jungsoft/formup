import { CheckFormInputGroupErrorProps } from '../interfaces';
import isFieldRequired from './isFieldRequired';

/**
 * Checks if FormInputGroup is invalid.
 *
 * @param param0 Options.
 */
const checkFormInputGroupError = ({
  formGroupValue,
  error,
  multi,
  name,
  form,
}: CheckFormInputGroupErrorProps) => {
  const required = isFieldRequired(name, form?.schema);

  const formInputMeta = form?.getFieldMeta(name);

  return error || (
    required
    && formInputMeta?.touched
    && (
      (
        !multi
        && !formGroupValue
      ) || (
        multi
        && Array.isArray(formGroupValue)
        && !formGroupValue.length
      )
    )
  );
};

export default checkFormInputGroupError;
