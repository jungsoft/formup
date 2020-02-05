import React from 'react';
import { useFormik, FormikConfig } from 'formik';

import FormContainer from '../../contexts/FormContext/FormContainer';
import mapFieldsToObject from '../../utils/mapFieldsToObject';
import validateForm from '../../yup/validateForm';
import { YupSchema } from '../../yup/types';

export interface FormProps extends FormikConfig<any> {
  schema: YupSchema,
  onSubmit: (values: object) => void,
  onError?: (errors: string[]) => void,
  children?: React.ReactChild,
}

/**
 * Form component that will make use of Formik to validate all inputs
 * declared as its children. The inputs should be enclosed by the
 * component ValidatedFormInput.
 */
const Form = ({
  children,
  onSubmit,
  onError,
  schema,
  ...props
}: FormProps) => {
  if (!schema) {
    throw new Error('You need to provide the "schema" prop.');
  }

  if (!onSubmit) {
    throw new Error('You need to provide the "onSubmit" prop.');
  }

  const form = useFormik({
    ...props,
    onSubmit: () => {},
    validationSchema: schema,
    initialValues: mapFieldsToObject(schema.fields),
  });

  const handleOnSubmit = () => {
    const {
      isValid,
      errors,
    } = validateForm(schema, form);

    if (!isValid) {
      if (onError) {
        onError(errors);
      }

      return;
    }

    onSubmit(form.values);
  };

  return (
    <FormContainer form={form}>
      <form onSubmit={handleOnSubmit}>
        {children}
      </form>
    </FormContainer>
  );
};

export default Form;
