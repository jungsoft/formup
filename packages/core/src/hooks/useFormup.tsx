import * as React from 'react';

import { useFormik, FormikConfig } from 'formik';

import FormContainer from '../contexts/FormContext/FormContainer';
import Form, { FormPublicProps } from '../components/Form/Form';
import mapFieldsToObject from '../utils/mapFieldsToObject';
import FormInput from '../components/FormInput/FormInput';
import validateForm from '../yup/validateForm';
import { YupSchema } from '../yup/types';

interface UseFormupOptions extends FormikConfig<any> {
  onError?: (errors: string[]) => void,
  onSubmit: (values: object) => void,
  formClassName?: any,
}

const useFormup = (
  schema: YupSchema,
  options: UseFormupOptions,
) => {
  if (!schema) {
    throw new Error('You need to provide the "schema" prop.');
  }

  if (!options?.onSubmit) {
    throw new Error('You need to provide the "onSubmit" option.');
  }

  const {
    formClassName,
    onError,
  } = options || {};

  const formikForm = useFormik({
    ...options,
    validationSchema: schema,
    initialValues: mapFieldsToObject(schema.fields),
  });

  const FormComponent = React.useCallback(({
    children,
  }: FormPublicProps) => {
    const handleOnSubmit = (e: any) => {
      e.preventDefault();

      const {
        isValid,
        errors,
      } = validateForm(schema, formikForm);

      if (!isValid) {
        if (onError) {
          onError(errors);
        }

        return;
      }

      formikForm.handleSubmit();
    };

    return (
      <FormContainer form={formikForm}>
        <Form
          handleOnSubmit={handleOnSubmit}
          className={formClassName}
        >
          {children}
        </Form>
      </FormContainer>
    );
  }, [
    formClassName,
    formikForm,
  ]);

  return {
    Form: FormComponent,
    FormInput,
  };
};

export default useFormup;
