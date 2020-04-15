import * as React from 'react';
import classNames from 'classnames';

import { FORMUP_INPUT_GROUP_CONTAINER_CLASS_NAME } from '../../constants/identifiers';
import FormGroupContainer from '../../contexts/FormGroupContext/FormGroupContainer';
import { useFormContext } from '../../contexts/FormContext/FormContext';

export interface FormInputGroupProps extends React.Props<any> {
  children?: React.ReactChild;
  initialValue?: any;
  multi?: boolean;
  className?: any,
  name: string;
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
const FormInputGroup = ({
  multi = false,
  initialValue,
  className,
  children,
  name,
}: FormInputGroupProps) => {
  const form = useFormContext();

  if (!name) {
    throw new Error('You need to provide the "name" prop.');
  }

  if (!form) {
    throw new Error('You need to provide a <Form /> component enclosing FormInputGroup.');
  }

  return (
    <div className={classNames(FORMUP_INPUT_GROUP_CONTAINER_CLASS_NAME, className)}>
      <FormGroupContainer initialValue={initialValue} name={name} multi={multi}>
        {children}
      </FormGroupContainer>
    </div>
  );
};

export default FormInputGroup;
