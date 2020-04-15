import * as React from 'react';
import update from 'immutability-helper';

import checkFormInputError from '../../utils/checkFormInputError';
import extractEventValue from '../../utils/extractEventValue';
import { useFormContext } from '../FormContext/FormContext';
import { FormGroupContextValue } from '../../interfaces';

import { FormGroupProvider } from './FormGroupContext';

export interface FormGroupContainerProps extends React.Props<any> {
  children?: React.ReactChild;
  initialValue: any;
  multi?: boolean;
  name: string;
}

/**
 * Container for FormGroup context API.
 */
const FormGroupContainer = ({
  initialValue,
  children,
  multi,
  name,
}: FormGroupContainerProps) => {
  const [formGroupValue, setFormGroupValue] = React.useState(initialValue);
  const form = useFormContext();

  const formInputMeta = form.getFieldMeta(name);

  const handleSetFormGroupValue = React.useCallback((event: any) => {
    const newValue = extractEventValue(event);

    if (!multi) {
      setFormGroupValue(newValue);
      return;
    }

    if (!Array.isArray(formGroupValue)) {
      setFormGroupValue([
        newValue,
      ]);

      return;
    }

    const valueIndex = formGroupValue.findIndex((item) => item === newValue);

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
    formGroupValue,
    multi,
  ]);

  const value: FormGroupContextValue = React.useMemo(() => [
    formGroupValue,
    handleSetFormGroupValue,
    {
      error: checkFormInputError(formInputMeta),
      multi,
      name,
    },
  ], [
    handleSetFormGroupValue,
    formGroupValue,
    formInputMeta,
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
