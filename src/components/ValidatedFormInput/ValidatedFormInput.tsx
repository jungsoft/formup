import React from 'react';

import DefaultInputComponent from '../DefaultInputComponent/DefaultInputComponent';
import { useFormContext } from '../../contexts/FormContext/FormContext';

export interface ValidatedFormInputProps extends React.Props<any> {
  component: React.ElementType;
  name: string;
  type?: string;
  value?: any;
  defaultValue?: any;
  children?: React.ReactChild;
  onBlur?: (arg0: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (arg0: React.FormEvent<HTMLInputElement>) => void;
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
const ValidatedFormInput = ({
  component: Component = DefaultInputComponent,
  type = 'text',
  children,
  onChange,
  onBlur,
  name,
  ...props
}: ValidatedFormInputProps) => {
  if (!name) {
    throw new Error('You need to provide the "name" prop.');
  }

  const form = useFormContext();

  if (!form) {
    throw new Error('You need to provide a <Form /> component enclosing ValidatedFormInput.');
  }

  const { value, defaultValue } = props;

  const formInputProps = form.getFieldProps(name);
  const formInputMeta = form.getFieldMeta(name);

  formInputProps.type = type;

  const inputProps = {
    ...props,
    ...formInputProps,
    danger: formInputMeta.touch && formInputMeta.error,
    onChange: (event: any) => {
      const {
        target: {
          value: newValue,
        },
      } = event;

      form.setFieldValue(name, newValue);
      form.setFieldTouched(name, true);

      if (onChange) {
        onChange(event);
      }
    },
    onBlur: (event: any) => {
      if (formInputProps.onBlur) {
        formInputProps.onBlur(event);
      }

      if (onBlur) {
        onBlur(event);
      }
    },
  };

  const isUntouched = (
    (value || defaultValue)
    && !formInputMeta.touch
    && !formInputMeta.initialValue
  );

  if (isUntouched) {
    form.setFieldValue(name, value || defaultValue);
    form.setFieldTouched(name, true);

    inputProps.defaultValue = undefined;
  }

  return (
    <Component {...inputProps}>
      {children}
    </Component>
  );
};

export default ValidatedFormInput;
