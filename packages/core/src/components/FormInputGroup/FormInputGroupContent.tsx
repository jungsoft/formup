import * as React from 'react';
import classNames from 'classnames';

import { FORMUP_INPUT_GROUP_CONTAINER_CLASS_NAME, FORMUP_INPUT_DANGER_CLASS_NAME } from '../../constants/identifiers';
import { useFormGroupContext } from '../../contexts/FormGroupContext/FormGroupContext';
import checkFormInputGroupError from '../../utils/checkFormInputGroupError';
import { useFormContext } from '../../contexts/FormContext/FormContext';

export interface FormInputGroupContentProps extends React.Props<any> {
  children?: React.ReactChild;
  className?: any,
}

/**
 * Input group that supports multiple FormInputGroupItem children.
 * Each children should have a value and FormInputGroup will validate
 * all the options automatically.
 *
 * You need to pass in "name" (name of the field on the form)
 * in order to correctly render and use this component.
 *
 * You can pass "multi" prop if you want to be able to select multiple options.
 * Note that when selecting multi, the value in the form will be an array.
 * @param param0 Options.
 */
const FormInputGroupContent = ({
  className,
  children,
}: FormInputGroupContentProps) => {
  const form = useFormContext();

  const [formGroupValue,, {
    multi,
    name,
  }] = useFormGroupContext();

  if (!form) {
    throw new Error('You need to provide a <Form /> component enclosing FormInputGroup.');
  }

  const hasError = checkFormInputGroupError({
    formGroupValue,
    multi,
    name,
    form,
  });

  const containerClasses = classNames(FORMUP_INPUT_GROUP_CONTAINER_CLASS_NAME, className, {
    [FORMUP_INPUT_DANGER_CLASS_NAME]: hasError,
  });

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default FormInputGroupContent;
