import * as React from 'react';
import classNames from 'classnames';
import invariant from 'invariant';

import { FORMUP_INPUT_CLASS_NAME, FORMUP_INPUT_DANGER_CLASS_NAME } from '../../constants/identifiers';
import DefaultInputComponent from '../DefaultInputComponents/DefaultInputComponent';
import { ExtendedFormupFormInputData, FormInputProps } from '../../interfaces';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import checkFormInputError from '../../utils/checkFormInputError';
import composeInputEvent from '../../utils/composeInputEvent';
import extractEventValue from '../../utils/extractEventValue';
import getSchemaField from '../../utils/getSchemaField';
import getFieldLabel from '../../utils/getFieldLabel';

/**
 * Input that auto-validates itself within the form.
 *
 * Can be overwritten with the "component" prop,
 * allowing you to render any type of component
 * while still maintaining all validation functionality.
 *
 * You need to pass in "name" (name of the field on the form)
 * in order to correctly render and use this component.
 *
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
  label,
  name,
  ...props
}: FormInputProps) => {
  const isInitializedRef = React.useRef(false);
  const form = useFormContext();

  invariant(!!name, 'You need to provide the "name" prop.');
  invariant(!!form, 'You need to provide a <Form /> component enclosing FormInput.');

  const schemaField = getSchemaField(name, form?.schema);

  invariant(!!schemaField, `The field ${name} was not found in the schema.`);

  const { value, defaultValue } = props;

  const formInputProps = form.getFieldProps(name);
  const formInputMeta = form.getFieldMeta(name);

  formInputProps['type'] = type;

  const formInputError = checkFormInputError(formInputMeta);

  const inputLabel = label ?? getFieldLabel(name, form?.schema);

  const inputProps = {
    ...props,
    ...formInputProps,
    label: inputLabel,
    'aria-label': inputLabel,
    id: props?.id || name,
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

  const inputValue = value ?? defaultValue ?? formInputMeta.initialValue;

  const isUntouched = (
    !!inputValue
    && !formInputMeta.touched
    && !isInitializedRef.current
  );

  if (isUntouched) {
    form.setFieldValue(name, inputValue);

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
