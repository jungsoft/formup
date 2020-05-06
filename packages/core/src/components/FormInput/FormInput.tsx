import * as React from 'react';
import classNames from 'classnames';

import { FORMUP_INPUT_CLASS_NAME, FORMUP_INPUT_DANGER_CLASS_NAME } from '../../constants/identifiers';
import DefaultInputComponent from '../DefaultInputComponents/DefaultInputComponent';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import checkFormInputError from '../../utils/checkFormInputError';
import { ExtendedFormupFormInputData } from '../../interfaces';
import composeInputEvent from '../../utils/composeInputEvent';
import extractEventValue from '../../utils/extractEventValue';

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

export interface FormInputProps extends React.Props<any> {
  component: React.ElementType<FormInputComponentProps>;
  name: string;
  type?: string;
  value?: any;
  defaultValue?: any;
  children?: React.ReactChild;
  onBlur?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  onKeyPress?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  className?: any,

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
 * Input that auto-validates itself within the form.
 *
 * Can be ovewritten with the "component" prop,
 * allowing you to render any type of component
 * while still maintaining all validation functionality.
 *
 * You need to pass in "name" (name of the field on the form)
 * in order to correctly render and use this component.
 * @param param0 Options.
 */
const FormInput = ({
  component: Component = DefaultInputComponent,
  injectFormupData = false,
  type = 'text',
  onKeyPress,
  className,
  children,
  onChange,
  onBlur,
  name,
  ...props
}: FormInputProps) => {
  const isInitializedRef = React.useRef(false);
  const form = useFormContext();

  if (!name) {
    throw new Error('You need to provide the "name" prop.');
  }

  if (!form) {
    throw new Error('You need to provide a <Form /> component enclosing FormInput.');
  }

  const { value, defaultValue } = props;

  const formInputProps = form.getFieldProps(name);
  const formInputMeta = form.getFieldMeta(name);

  formInputProps['type'] = type;

  const formInputError = checkFormInputError(formInputMeta);

  const inputProps = {
    ...props,
    ...formInputProps,
    onChange: (event: any) => {
      const newValue = extractEventValue(event);

      form.setFieldValue(name, newValue);

      if (onChange) {
        onChange(event);
      }
    },
    onKeyPress: (event: any) => composeInputEvent(
      event,
      formInputProps['onKeyPress'],
      onKeyPress,
    ),
    onBlur: (event: any) => composeInputEvent(
      event,
      formInputProps?.onBlur,
      onBlur,
    ),
    error: formInputError.hasErrors,
  };

  const isUntouched = (
    (value || defaultValue || formInputMeta.initialValue)
    && !formInputMeta.touched
    && !isInitializedRef.current
  );

  if (isUntouched) {
    form.setFieldValue(name, value || defaultValue || formInputMeta.initialValue);

    inputProps.defaultValue = undefined;
    isInitializedRef.current = true;
  }

  inputProps['className'] = classNames(FORMUP_INPUT_CLASS_NAME, className, {
    [FORMUP_INPUT_DANGER_CLASS_NAME]: formInputError.hasErrors,
  });

  const formupData: ExtendedFormupFormInputData = React.useMemo(() => ({
    errorMessage: formInputError.errorMessage,
  }), [
    formInputError.errorMessage,
  ]);

  if (injectFormupData) {
    return (
      <Component
        formupData={formupData}
        {...inputProps}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      {...inputProps}
    >
      {children}
    </Component>
  );
};

export default FormInput;
