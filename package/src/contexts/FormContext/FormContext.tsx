import * as React from 'react';

const FormContext = React.createContext({});

export const FormProvider = FormContext.Provider;

export const useFormContext: any = () => React.useContext(FormContext);
