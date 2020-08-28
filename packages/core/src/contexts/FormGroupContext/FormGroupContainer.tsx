import * as React from 'react';
import update from 'immutability-helper';
import isEqual from 'lodash.isequal';

import { FormGroupContextValue, FormGroupContainerProps } from '../../interfaces';
import checkFormInputGroupError from '../../utils/checkFormInputGroupError';
import checkFormInputValue from '../../utils/checkFormInputValue';
import extractEventValue from '../../utils/extractEventValue';
import { useFormContext } from '../FormContext/FormContext';
import { FormGroupProvider } from './FormGroupContext';
import useDidMount from '../../hooks/useDidMount';

/**
 * Container for FormGroup context API.
 */
const FormGroupContainer = ({
  initialValue,
  children,
  multi,
  name,
}: FormGroupContainerProps) => {
  const form = useFormContext();

  const { value: formGroupValue } = form.getFieldProps(name);

  const setFormGroupValue = React.useCallback((newValue) => {
    if (form) {
      form.setFieldTouched(name, true, false);
      form.setFieldValue(name, newValue);
    }
  }, [
    form,
    name,
  ]);

  useDidMount(() => {
    const isValidValue = checkFormInputValue(initialValue);

    if (isValidValue) {
      setFormGroupValue(initialValue);
    }
  });

  const handleSetFormGroupValue = React.useCallback((event: any) => {
    const newValue = extractEventValue(event);

    if (!multi) {
      setFormGroupValue(isEqual(formGroupValue, newValue) ? initialValue : newValue);
      return;
    }

    if (!Array.isArray(formGroupValue)) {
      setFormGroupValue([
        newValue,
      ]);

      return;
    }

    const valueIndex = formGroupValue.findIndex((item) => isEqual(item, newValue));

    if (valueIndex !== -1) {
      setFormGroupValue(update(formGroupValue, {
        $splice: [[valueIndex, 1]],
      }));
    } else {
      setFormGroupValue(update(formGroupValue, {
        $push: [newValue],
      }));
    }
  }, [
    setFormGroupValue,
    formGroupValue,
    initialValue,
    multi,
  ]);

  const hasError = checkFormInputGroupError({
    formGroupValue,
    multi,
    name,
    form,
  });

  const value: FormGroupContextValue = React.useMemo(() => [
    formGroupValue,
    handleSetFormGroupValue,
    {
      hasError,
      multi,
      name,
    },
  ], [
    handleSetFormGroupValue,
    formGroupValue,
    hasError,
    multi,
    name,
  ]);

  return (
    <FormGroupProvider value={value}>
      {children}
    </FormGroupProvider>
  );
};

export default FormGroupContainer;
