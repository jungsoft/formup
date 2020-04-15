import * as React from 'react';
import classNames from 'classnames';

import { FORMUP_INPUT_CLASS_NAME, FORMUP_INPUT_DANGER_CLASS_NAME } from '../../constants/identifiers';
import DefaultInputComponent from '../DefaultInputComponent/DefaultInputComponent';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import composeInputEvent from '../../utils/composeInputEvent';

export interface FormInputComponentProps extends React.Props<any> {
  error: boolean,
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

  formInputProps.type = type;

  const inputProps = {
    ...props,
    ...formInputProps,
    onChange: (event: any) => {
      const newValue = (
        event?.target
          ? event.target.value
          : event
      );

      form.setFieldValue(name, newValue);
      form.setFieldTouched(name, true);

      if (onChange) {
        onChange(event);
      }
    },
    onKeyPress: (event: any) => composeInputEvent(
      event,
      formInputProps?.onKeyPress,
      onKeyPress,
    ),
    onBlur: (event: any) => composeInputEvent(
      event,
      formInputProps?.onBlur,
      onBlur,
    ),
    error: !!(formInputMeta?.touched && formInputMeta?.error),
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

  inputProps.className = classNames(FORMUP_INPUT_CLASS_NAME, className, {
    [FORMUP_INPUT_DANGER_CLASS_NAME]: !!(formInputMeta.touched && formInputMeta.error),
  });

  return (
    <Component {...inputProps}>
      {children}
    </Component>
  );
};

export default FormInput;
