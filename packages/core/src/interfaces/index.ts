import * as yup from 'yup';
import {
  FormikConfig,
  FormikValues,
  FieldInputProps,
  FieldMetaProps,
  FieldHelperProps,
} from 'formik';

import { FormInputGroupItemProps } from '../components/FormInputGroupItem/FormInputGroupItem';
import { FormInputGroupProps } from '../components/FormInputGroup/FormInputGroup';
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
  formElements: object;
}

/**
 * Options for validateForm.
 */
export interface ValidateFormOptions extends yup.ValidateOptions {
  paths?: string | string[];
}

/**
 * Result returned by validateForm.
 */
export interface ValidateFormResult extends yup.ValidateOptions {
  isValid: boolean;
  error?: FormupValidationError | undefined;
}

/**
 * Options for useFormup.
 */
export interface UseFormupOptions extends FormikConfig<any> {
  onError?: (error: FormupValidationError | undefined) => void;
  onSubmit: (values: object) => void;
}

/**
 * Result returned by useFormup.
 */
export interface UseFormupResult {
  FormInputGroupItem: React.FunctionComponent<FormInputGroupItemProps>;
  FormInputGroup: React.FunctionComponent<FormInputGroupProps>;
  FormInput: React.FunctionComponent<FormInputProps>;
  Form: React.FunctionComponent<FormProps>;
  validateForm: () => ValidateFormResult;
  submitForm: (event?: any) => void;
  formikForm: FormupFormikForm;
}

/**
 * Value returned by FormGroup Context API.
 */
export type FormGroupContextValue = [
  any,
  (event: any) => void,
  {
    multi?: boolean;
    name: string;
  },
]

/**
 * Formik Form object customized by Formup.
 */
export interface FormupFormikForm extends Omit<FormikConfig<FormikValues>, 'onSubmit'> {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  onSubmit?: (values: object) => void;
  values: object;

  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => any;

  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => any;

  setFieldError: (
    field: string,
    value: string | undefined,
  ) => void;

  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  getFieldHelpers: (name: string) => FieldHelperProps<any>;
  getFieldMeta: (name: string) => FieldMetaProps<any>;

  schema: FormupYupSchema;
}

/**
 * Form Context API result.
 */
export type FormContextResult = FormupFormikForm;
