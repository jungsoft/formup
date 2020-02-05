import React from 'react';
import { FormProvider } from './FormContext';

export interface FormContainerProps {
  children?: React.ReactChild,
  form: any,
}

/**
 * Container for Form context API.
 * @param param0 Formik form.
 */
const FormContainer = ({
  children,
  form,
}: FormContainerProps) => (
  <FormProvider value={form}>
    {children}
  </FormProvider>
);

export default FormContainer;
