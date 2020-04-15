import * as yup from 'yup';
import { FormikConfig } from 'formik';

import { FormInputProps } from '../components/FormInput/FormInput';
import { FormProps } from '../components/Form/Form';

/**
 * Yup schema as used by Formup.
 */
export interface FormupYupSchema extends yup.Schema<any> {
  fields: object;
}

/**
 * Validation error returned by validateForm.
 */
export interface FormupValidationError extends yup.ValidationError {
  /**
   * Describes errors for each form input, in a dictionary pattern.
   * Array of inputName: [errors].
   */
  formElements: object,
}

/**
 * Options for validateForm.
 */
export interface ValidateFormOptions extends yup.ValidateOptions {
  paths?: string | string[],
}

/**
 * Result returned by validateForm.
 */
export interface ValidateFormResult extends yup.ValidateOptions {
  isValid: boolean,
  error?: FormupValidationError | undefined,
}

/**
 * Options for useFormup.
 */
export interface UseFormupOptions extends FormikConfig<any> {
  onError?: (error: FormupValidationError | undefined) => void,
  onSubmit: (values: object) => void,
}

/**
 * Result returned by useFormup.
 */
export interface UseFormupResult {
  FormInput: React.FunctionComponent<FormInputProps>,
  Form: React.FunctionComponent<FormProps>,
  validateForm: () => ValidateFormResult,
  submitForm: (event?: any) => void,
  formikForm: any,
}

/**
 * Value returned by FormGroup Context API.
 */
export type FormGroupContextValue = [
  any,
  (event: any) => void,
  {
    multi?: boolean;
    error: boolean;
    name: string;
  },
]
