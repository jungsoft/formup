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
export interface ValidateFormOptions {
  /**
   * If provided, will validate only a section of the form.
   * You can pass a field, an array of fields, an object, an array of objects.
   */
  paths?: string | string[];
}

/**
 * Default yup options for validateForm.
 */
export interface YupValidateOptions extends yup.ValidateOptions {
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
  validateForm: (validationOptions?: ValidateFormOptions) => ValidateFormResult;
  FormInputGroupItem: React.FunctionComponent<FormInputGroupItemProps>;
  FormInputGroup: React.FunctionComponent<FormInputGroupProps>;
  submitForm: (submitFormOptions?: SubmitFormOptions) => void;
  FormInput: React.FunctionComponent<FormInputProps>;
  Form: React.FunctionComponent<FormProps>;
  formikForm: FormupFormikForm;
}

/**
 * Value returned by FormGroup Context API.
 */
export type FormGroupContextValue = [
  any,
  (event: any) => void,
  {
    hasError?: boolean;
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
  isValid: boolean;
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

/**
 * Extended form input data that will be injected into <FormInput />
 * rendered component in case injectFormupData is true.
 */
export interface ExtendedFormupFormInputData {
  errorMessage?: string;
}

/**
 * Options provided when submitting the form with useFormup.
 */
export interface SubmitFormOptions {
  validationOptions?: ValidateFormOptions;
}
