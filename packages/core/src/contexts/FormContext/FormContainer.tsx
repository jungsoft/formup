import React from 'react';

import { FormContainerProps } from '../../interfaces';
import { FormProvider } from './FormContext';

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
