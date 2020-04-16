import * as React from 'react';

import { FormContextResult } from '../../interfaces';

const FormContext = React.createContext({});

export const FormProvider = FormContext.Provider;

// @ts-ignore
export const useFormContext: () => FormContextResult = () => React.useContext(FormContext);
