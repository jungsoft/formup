import * as React from 'react';
import classNames from 'classnames';

import DefaultInputGroupItemComponent from '../DefaultInputComponents/DefaultInputGroupItemComponent';
import { useFormGroupContext } from '../../contexts/FormGroupContext/FormGroupContext';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import {
  FORMUP_INPUT_GROUP_ITEM_CLASS_NAME,
  FORMUP_INPUT_DANGER_CLASS_NAME,
  FORMUP_INPUT_CLASS_NAME,
} from '../../constants/identifiers';

export interface FormInputGroupComponentProps extends React.Props<any> {
  type: string;
}

export interface FormInputGroupItemProps extends React.Props<any> {
  component: React.ElementType<FormInputGroupComponentProps>;
  containerClassName?: any;
  className?: any;
  value: any;
}

/**
 * Input group item that holds a distinct value and should be inside FormInputGroup component.
 *
 * The FormInputGroup component will automatically validate the value of this component
 * according to the settings passed to it.
 *
 * You need to pass in "value" (value of this distinct input)
 * in order to correctly render and use this component.
 *
 * Can be ovewritten with the "component" prop,
 * allowing you to render any type of component
 * while still maintaining all validation functionality.
 * @param param0 Options.
 */
const FormInputGroupItem = ({
  component: Component = DefaultInputGroupItemComponent,
  containerClassName,
  className,
  value,
  ...props
}: FormInputGroupItemProps) => {
  const [, setFormGroupValue, {
    name,
    error,
    multi,
  }] = useFormGroupContext();

  const form = useFormContext();

  const { value: formGroupValue } = form.getFieldProps(name);

  if (value === undefined) {
    throw new Error('You need to provide the "value" prop.');
  }

  const inputContainerClassName = classNames(
    FORMUP_INPUT_GROUP_ITEM_CLASS_NAME,
    containerClassName,
  );

  const inputClassName = classNames(FORMUP_INPUT_CLASS_NAME, className, {
    [FORMUP_INPUT_DANGER_CLASS_NAME]: error,
  });

  const handleSetFormGroupValue = React.useCallback(() => {
    setFormGroupValue(value);
  }, [
    setFormGroupValue,
    value,
  ]);

  const inputType = multi ? 'checkbox' : 'radio';

  const isChecked = (
    multi
      ? Array.isArray(formGroupValue) && formGroupValue.includes(value)
      : formGroupValue === value
  );

  const inputProps = {
    ...props,
    onClick: handleSetFormGroupValue,
    className: inputClassName,
    checked: isChecked,
    type: inputType,
  };

  return (
    <div className={inputContainerClassName}>
      <Component {...inputProps} />
    </div>
  );
};

export default FormInputGroupItem;
