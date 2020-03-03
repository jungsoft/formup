import * as React from 'react';
import { useFormik, FormikConfig } from 'formik';

import FormInput, { FormInputProps } from '../components/FormInput/FormInput';
import { FORMUP_FORM_CLASS_NAME } from '../constants/identifiers';
import Form, { FormPublicProps } from '../components/Form/Form';
import mapFieldsToObject from '../utils/mapFieldsToObject';
import validateForm from '../yup/validateForm';
import { YupSchema } from '../yup/types';

export interface UseFormupOptions extends FormikConfig<any> {
  onError?: (errors: string[]) => void,
  onSubmit: (values: object) => void,
}

export interface UseFormupResult {
  FormInput: React.FunctionComponent<FormInputProps>,
  Form: React.FunctionComponent<FormPublicProps>,
  submitForm: () => void,
}

/**
 * Hook to use formup.
 * Returns <Form /> & <FormInput /> components, so that you can make your form easily.
 * @param schema Yup validation schema
 * @param options Formup options
 */
const useFormup = (
  schema: YupSchema,
  options: UseFormupOptions,
): UseFormupResult => {
  if (!schema) {
    throw new Error('You need to provide the "schema" prop.');
  }

  if (!options?.onSubmit) {
    throw new Error('You need to provide the "onSubmit" option.');
  }

  const {
    onError,
  } = options || {};

  const formikForm = useFormik({
    ...options,
    validationSchema: schema,
    initialValues: mapFieldsToObject(schema.fields),
  });

  const handleOnSubmit = React.useCallback((e: any) => {
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
  }, [
    formikForm,
    onError,
    schema,
  ]);

  const FormComponent = (formProps: FormPublicProps) => (
    <Form
      handleOnSubmit={handleOnSubmit}
      key={FORMUP_FORM_CLASS_NAME}
      formikForm={formikForm}
      {...formProps}
    />
  );

  return {
    submitForm: () => handleOnSubmit,
    Form: FormComponent,
    FormInput,
  };
};

export default useFormup;
