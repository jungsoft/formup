import { FormupFormikForm } from '../interfaces';
import isFieldRequired from './isFieldRequired';

export interface CheckFormInputGroupErrorParams {
  name: string;
  error?: boolean;
  multi?: boolean;
  formGroupValue: any;
  form: FormupFormikForm;
}

/**
 * Checks if FormInputGroup is invalid.
 * @param param0 Params
 */
const checkFormInputGroupError = ({
  formGroupValue,
  error,
  multi,
  name,
  form,
}: CheckFormInputGroupErrorParams) => {
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
