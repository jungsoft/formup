import * as React from 'react';
import classNames from 'classnames';
import invariant from 'invariant';

import DefaultInputGroupItemComponent from '../DefaultInputComponents/DefaultInputGroupItemComponent';
import { useFormGroupContext } from '../../contexts/FormGroupContext/FormGroupContext';
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
  invariant(value !== undefined, 'You need to provide the "value" prop.');

  const [formGroupValue, setFormGroupValue, {
    hasError,
    multi,
  }] = useFormGroupContext();

  const inputContainerClassName = classNames(
    FORMUP_INPUT_GROUP_ITEM_CLASS_NAME,
    containerClassName,
    {
      [FORMUP_INPUT_DANGER_CLASS_NAME]: hasError,
    },
  );

  const inputClassName = classNames(FORMUP_INPUT_CLASS_NAME, className, {
    [FORMUP_INPUT_DANGER_CLASS_NAME]: hasError,
  });

  const handleSetFormGroupValue = React.useCallback(() => {
    setFormGroupValue(value);
  }, [
    setFormGroupValue,
    value,
  ]);

  const inputType = React.useMemo(() => (
    multi
      ? 'checkbox'
      : 'radio'
  ), [
    multi,
  ]);

  const isChecked = React.useMemo(() => (
    multi
      ? Array.isArray(formGroupValue) && formGroupValue.includes(value)
      : formGroupValue === value
  ), [
    formGroupValue,
    multi,
    value,
  ]);

  const inputProps = {
    ...props,
    onChange: () => {}, // no-op to suppress React error, since onChange is not needed here
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
