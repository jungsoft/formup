import * as React from 'react';
import invariant from 'invariant';

import FormGroupContainer from '../../contexts/FormGroupContext/FormGroupContainer';
import FormInputGroupContent from './FormInputGroupContent';

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
  invariant(!!name, 'You need to provide the "name" prop.');

  return (
    <FormGroupContainer initialValue={initialValue} name={name} multi={multi}>
      <FormInputGroupContent className={className}>
        {children}
      </FormInputGroupContent>
    </FormGroupContainer>
  );
};

export default FormInputGroup;
