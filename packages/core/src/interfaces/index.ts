import * as yup from 'yup';
import {
  FormikConfig,
  FormikValues,
  FieldInputProps,
  FieldMetaProps,
  FieldHelperProps,
} from 'formik';

/**
 * Yup schema as used by Formup.
 */
export interface FormupYupSchema extends yup.Schema<any> {
  /**
   * Schema fields.
   */
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
 * Interface to define component properties inherited by FormInputGroup's component.
 */
export interface FormInputGroupComponentProps extends React.Props<any> {
  type: string;
}

/**
 * Interface to define FormInputGroupItem properties.
 */
export interface FormInputGroupItemProps extends React.Props<any> {
  /**
   * The component to render.
   */
  component: React.ElementType<FormInputGroupComponentProps>;

  /**
   * Classnames to inject into the container.
   */
  containerClassName?: any;

  /**
   * Classnames to inject.
   */
  className?: any;

  /**
   * The option value.
   */
  value: any;
}

/**
 * Interface to define DefaultInputGroupItemComponent properties.
 */
export interface DefaultInputGroupItemComponentProps extends FormInputGroupComponentProps {
  /**
   * The input label.
   */
  label?: string,
}

/**
 * Interface to define FormContainer properties.
 */
export interface FormContainerProps extends React.Props<any> {
  /**
   * Children to be rendered.
   */
  children?: React.ReactChild,

  /**
   * The formik form component, returned by useFormup.
   */
  form: FormupFormikForm,
}

/**
 * Interface to define FormGroupContainer properties.
 */
export interface FormGroupContainerProps extends React.Props<any> {
  /**
   * Children to be rendered.
   */
  children?: React.ReactChild;

  /**
   * The initial value, if any.
   */
  initialValue: any;

  /**
   * Defines if multiple values can be selected on this component.
   */
  multi?: boolean;

  /**
   * Schema field name.
   */
  name: string;
}

/**
 * Interface to define CheckFormInputGroupError properties.
 */
export interface CheckFormInputGroupErrorProps {
  /**
   * The schema field name.
   */
  name: string;

  /**
   * Defines if the input contains errors.
   */
  error?: boolean;

  /**
   * Defines if multiple values can be selected on this component.
   */
  multi?: boolean;

  /**
   * Defines the value for this form group.
   */
  formGroupValue: any;

  /**
   * The formik form component, returned by useFormup.
   */
  form: FormupFormikForm;
}

/**
 * Interface to define FormInputGroupContent properties.
 */
export interface FormInputGroupContentProps extends React.Props<any> {
  /**
   * Children to be rendered.
   */
  children?: React.ReactChild;

  /**
   * Classnames to inject.
   */
  className?: any,
}

/**
 * Defines the properties of each array item rendered by FormArrayField.
 */
export interface FormArrayFieldItem {
  /**
   * The interpolated path to be used as the "name" prop of your <FormInput />.
   *
   * This is calculated automatically to interpolate the whole path up to this
   * point in the schema. For example, if your schema array field is named
   * "nicknames", and the item to be rendered is at index 3:
   *
   * This will result to "nicknames[3]".
   */
  path: string;

  /**
   * Builds a path to access object properties, so that you don't need to interpolate
   * strings manually. It uses the "path" property of this object and the "subpath"
   * provided as an argument.
   *
   * For example, if you want to reach the property "name" from your schema array field
   * that is named "people", on the object of index 3:
   *
   * Running getPath("name") would result into "people[3].name".
   */
  getPath: (subpath: string) => string;

  /**
   * The present value of this item in the current index of the array of your schema field.
   */
  value: any;
}

/**
 * Helpers to manage adding, removing and updating the array items.
 */
export interface FormArrayFieldHelpers {
  /**
   * Pushes a new item to the array.
   *
   * Defaults to the default value of the array type on the schema,
   * but you can override this value by passing the "value" argument.
   */
  push: (value?: any) => void;

  /**
   * Removes one item from the array at one index, if it exists.
   *
   * @param index The index of the item.
   */
  remove: (index: number) => void;
}

/**
 * Properties that will be injected into the component returned by FormArrayField.
 */
export interface FormArrayFieldInjectedProps {
  /**
   * The array of current values on the form.
   */
  items: FormArrayFieldItem[];

  /**
   * Helpers to manage adding, removing and updating the array items.
   */
  arrayHelpers: FormArrayFieldHelpers;
}

/**
 * Interface to define FormArrayField component properties.
 */
export interface FormArrayFieldProps extends React.Props<any> {
  /**
   * Field name in schema.
   * Note that this field must be an array type.
   */
  name: string;

  /**
   * Children to be rendered. Can either be a function or component.
   *
   * Both will receive FormInputComponentProps as properties, in order to
   * help rendering & building your array-type field.
   */
  children?: (
    (
      /**
       * The array of current values on the form.
       */
      items: FormArrayFieldItem[],

      /**
       * Helpers to manage adding, removing and updating the array items.
       */
      arrayHelpers: FormArrayFieldHelpers,
    ) => React.ReactChild
    | React.ElementType<FormInputComponentProps>
  );
}

/**
 * Interface to define FormInputGroup properties.
 */
export interface FormInputGroupProps extends React.Props<any> {
  /**
   * Children to be rendered.
   */
  children?: React.ReactChild;

  /**
   * The initial value.
   */
  initialValue?: any;

  /**
   * Defines if multiple values can be selected on this component.
   */
  multi?: boolean;

  /**
   * Classnames to inject.
   */
  className?: any;

  /**
   * Schema field name.
   */
  name: string;
}

/**
 * Interface to define Form properties.
 */
export interface FormProps {
  /**
   * Children to be rendered.
   */
  children?: React.ReactChild,

  /**
   * The formik form returned by useFormup.
   */
  formikForm: FormupFormikForm,

  /**
   * Classnames to inject.
   */
  className?: any,

  /**
   * The event for onSubmit, in case renderAsForm is true.
   */
  onSubmit?: (payload: any) => void,

  /**
   * Defines if the DOM element is going to be rendered as <form />.
   *
   * False by default.
   */
  renderAsForm?: boolean,
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
  formupData?: InputFormupData;
}

/**
 * Interface to define FormInput component properties.
 */
export interface FormInputProps extends React.Props<any> {
  /**
   * The component to render.
   */
  component: React.ElementType<FormInputComponentProps>;

  /**
   * Schema field name.
   */
  name: string;

  /**
   * Input id.
   * Defaults to field name.
   */
  id?: string;

  /**
   * Input type.
   */
  type?: string;

  /**
   * Input value.
   */
  value?: any;

  /**
   * Input default value.
   */
  defaultValue?: any;

  /**
   * Children to render.
   */
  children?: React.ReactChild;

  /**
   * The onBlur event.
   * Executes before formik's onBlur.
   */
  onBlur?: (arg0: React.FormEvent<HTMLInputElement>) => void;

  /**
   * The onChange event.
   * Executes before formik's onChange.
   */
  onChange?: (arg0: React.FormEvent<HTMLInputElement>) => void;

  /**
   * The onKeyPress event.
   * Executes before formik's onKeyPress.
   */
  onKeyPress?: (arg0: React.FormEvent<HTMLInputElement>) => void;

  /**
   * Classnames to inject.
   */
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

  /**
   * If true, it will cast schema on Submit which
   * will apply `transform` functions defined in schema.
   */
  transformOnSubmit?: boolean;
}

/**
 * Result returned by useFormup.
 */
export interface UseFormupResult {
  validateForm: (validationOptions?: ValidateFormOptions) => ValidateFormResult;
  FormInputGroupItem: React.FunctionComponent<FormInputGroupItemProps>;
  FormInputGroup: React.FunctionComponent<FormInputGroupProps>;
  FormArrayField: React.FunctionComponent<FormArrayFieldProps>;
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
  /**
   * Defines the handleSubmit event for the form.
   */
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;

  /**
   * Defines the onSubmit event for the form.
   */
  onSubmit?: (values: object) => void;

  /**
   * Defines if the form is valid.
   */
  isValid: boolean;

  /**
   * Form values.
   */
  values: object;

  /**
   * Form touched fields.
   */
  touched: object;

  /**
   * Form errors.
   */
  errors: object;

  /**
   * Sets one field as touched.
   */
  setFieldTouched: (
    field: string,
    touched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => any;

  /**
   * Sets the value to one field directly.
   */
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => any;

  /**
   * Sets the error to one field directly.
   */
  setFieldError: (
    field: string,
    value: string | undefined,
  ) => void;

  /**
   * Returns the properties of one field.
   */
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;

  /**
   * Returns the helpers of one field.
   */
  getFieldHelpers: (name: string) => FieldHelperProps<any>;

  /**
   * Returns the metadata of one field.
   */
  getFieldMeta: (name: string) => FieldMetaProps<any>;

  /**
   * The validation schema of the form.
   */
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
export interface InputFormupData {
  errorMessage?: string;
}

/**
 * Options provided when submitting the form with useFormup.
 */
export interface SubmitFormOptions {
  validationOptions?: ValidateFormOptions;
}

/**
 * Options for getSchemaField.
 */
export interface getSchemaFieldOptions {
  /**
   * If true, will return the subtype instead of the type.
   *
   * For example, on an array type field, instead of returning
   * ArraySchema, it will return the type of the array items.
   */
  returnSubtype?: boolean;
}
