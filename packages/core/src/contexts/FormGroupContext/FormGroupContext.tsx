import * as React from 'react';

import { FormGroupContextValue } from '../../interfaces';

const FormGroupContextInitialValue: FormGroupContextValue = [
  null,
  (_) => {},
  {
    error: false,
    name: '',
  },
];

const FormGroupContext = React.createContext<FormGroupContextValue>(FormGroupContextInitialValue);

export const FormGroupProvider = FormGroupContext.Provider;

export const useFormGroupContext = () => React.useContext(FormGroupContext);
