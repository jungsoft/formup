import React from 'react';

import { FormupFormikForm } from '../../interfaces';
import { FormProvider } from './FormContext';

export interface FormContainerProps extends React.Props<any> {
  children?: React.ReactChild,
  form: FormupFormikForm,
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
