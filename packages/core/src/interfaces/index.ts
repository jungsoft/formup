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
 * Interface to define component properties inherited by FormInput's component.
 */
export interface FormInputComponentProps extends React.Props<any> {
  /**
   * Boolean indicating if the component has validation errors.
   *
   * This is injected by default to maintain compatibility with the
   * major React libraries such as Material UI, React Bootstrap, etc.
   *
   * Thanks to this formup will be compatible out-of-the box with those
   * dependencies, making the invalid inputs automatically styled, with
   * red borders around it and such.
   */
  error: boolean;

  /**
   * Input's label, inherited from the schema definition, or from
   * FormInput's "label" property.
   */
  label: string;

  /**
   * This is an object that contains Formup extended information, such
   * as the validation error message for this input (if any).
   *
   * Due to compatibility issues, this will only be injected if the prop
   * "injectFormupData" is defined as true in <FormInput /> component.
   *
   * Remember that this shouldn't be injected into the final <input />
   * component, in order to avoid React errors.
   */
  formupData?: ExtendedFormupFormInputData;
}

/**
 * Interface to define FormInput component properties.
 */
export interface FormInputProps extends React.Props<any> {
  component: React.ElementType<FormInputComponentProps>;
  name: string;
  id?: string;
  type?: string;
  value?: any;
  defaultValue?: any;
  children?: React.ReactChild;
  onBlur?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  onKeyPress?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  className?: any;

  /**
   * Component label.
   *
   * Will be automatically inherited from the schema (if defined on the field),
   * but you can still override it by passing this property to FormInput.
   */
  label?: string;

  /**
   * Defines if the "formupData" prop will be injected into the
   * <input /> component that is being rendered (default by formup),
   * or the component passed into "component" prop on FormInput.
   *
   * This is false by default in order to avoid compatibility issues,
   * since when true the component will have to deal with "formupData"
   * in order to avoid injecting it into the final <input /> component.
   *
   * If "formupData" is injected into the final <input /> component,
   * React will throw an error in the console saying that "formupData"
   * is not a valid property for <input />. Refer to the docs for more information.
   */
  injectFormupData: boolean;
}

/**
 * Options for useFormup.
 */
export interface UseFormupOptions extends
  Omit<
    Omit<
      FormikConfig<any>,
      'validationSchema'
    >,
    'onSubmit'
  >
{
  onError?: (error: FormupValidationError | undefined) => void;
  onSubmit?: (values: object) => void;
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
