import * as React from 'react';

import { FormGroupContextValue } from '../../interfaces';

const FormGroupContext = React.createContext({});

export const FormGroupProvider = FormGroupContext.Provider;

export const useFormGroupContext: () => FormGroupContextValue = (
  // @ts-ignore
  () => React.useContext(FormGroupContext)
);
