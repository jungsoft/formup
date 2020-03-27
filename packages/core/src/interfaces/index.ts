import * as yup from 'yup';
import { FormikConfig } from 'formik';

import { FormInputProps } from '../components/FormInput/FormInput';
import { FormProps } from '../components/Form/Form';

/**
 * Yup schema as used by Formup.
 */
export interface YupSchema extends yup.Schema<any> {
  fields: object;
}

/**
 * Options for validateForm.
 */
export interface ValidateFormOptions extends yup.ValidateOptions {
  paths?: string | string[],
}

/**
 * Options for useFormup.
 */
export interface UseFormupOptions extends FormikConfig<any> {
  onError?: (errors: string[]) => void,
  onSubmit: (values: object) => void,
}

/**
 * Result returned by useFormup.
 */
export interface UseFormupResult {
  FormInput: React.FunctionComponent<FormInputProps>,
  Form: React.FunctionComponent<FormProps>,
  submitForm: () => void,
  formikForm: any,
}
