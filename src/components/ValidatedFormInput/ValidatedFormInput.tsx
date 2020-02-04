import React from 'react';

export interface ValidatedFormInputProps {
  component: React.ElementType;
  form: any;
  name: string;
  type?: string;
  value?: any;
  defaultValue?: any;
  children?: React.ReactChild;
  onChange?: (arg0: React.FormEvent<HTMLInputElement>) => void;
}

/**
 * Input that auto-validates itself within the form.
 * @param param0 Options.
 */
const ValidatedFormInput = ({
  component: Component,
  type = 'text',
  children,
  onChange,
  form,
  name,
  ...props
}: ValidatedFormInputProps) => {
  const { value, defaultValue } = props;

  const [
    formInputProps,
    inputMetadata,
  ] = form.getFieldProps(name, type);

  formInputProps.type = type;

  const isUntouched = (
    (value || defaultValue)
    && !inputMetadata.touch
    && !inputMetadata.initialValue
  );

  const inputProps = {
    ...props,
    ...formInputProps,
    danger: inputMetadata.touch && inputMetadata.error,
    onChange: ({
      target: {
        value: newValue,
      },
    }: any) => {
      form.setFieldValue(name, newValue);
      form.setFieldTouched(name, true);

      if (onChange) {
        onChange(newValue);
      }
    },
  };

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
