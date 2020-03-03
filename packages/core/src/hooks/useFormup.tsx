import * as React from 'react';
import { useFormik, FormikConfig } from 'formik';

import Form from '../components/Form/Form';
import mapFieldsToObject from '../utils/mapFieldsToObject';
import FormInput from '../components/FormInput/FormInput';
import validateForm from '../yup/validateForm';
import { YupSchema } from '../yup/types';

export interface UseFormupOptions extends FormikConfig<any> {
  onError?: (errors: string[]) => void,
  onSubmit: (values: object) => void,
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
) => {
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

  const FormComponent = React.useCallback(() => (
    <Form
      handleOnSubmit={handleOnSubmit}
      formikForm={formikForm}
    />
  ), [
    handleOnSubmit,
    formikForm,
  ]);

  return {
    Form: FormComponent,
    FormInput,
  };
};

export default useFormup;
