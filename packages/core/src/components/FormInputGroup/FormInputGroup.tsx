import * as React from 'react';
import invariant from 'invariant';

import FormGroupContainer from '../../contexts/FormGroupContext/FormGroupContainer';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import FormInputGroupContent from './FormInputGroupContent';
import getSchemaField from '../../utils/getSchemaField';
import { FormInputGroupProps } from '../../interfaces';

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

  invariant(!!name, 'You need to provide the "name" prop.');
  invariant(!!form, 'You need to provide a <Form /> component enclosing FormInputGroup.');

  const schemaField = getSchemaField(name, form?.schema);

  invariant(!!schemaField, `The field "${name}" was not found in the schema.`);

  return (
    <FormGroupContainer initialValue={initialValue} name={name} multi={multi}>
      <FormInputGroupContent className={className}>
        {children}
      </FormInputGroupContent>
    </FormGroupContainer>
  );
};

export default FormInputGroup;
