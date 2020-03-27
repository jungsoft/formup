import * as React from 'react';
import { useFormik } from 'formik';

import { FormupYupSchema, UseFormupResult, UseFormupOptions } from '../interfaces';
import mapFieldsToObject from '../utils/mapFieldsToObject';
import FormInput from '../components/FormInput/FormInput';
import validateForm from '../yup/validateForm';
import Form from '../components/Form/Form';

/**
 * Hook to use formup.
 * Returns <Form /> & <FormInput /> components, so that you can make your form easily.
 * @param schema Yup validation schema
 * @param options Formup options
 */
const useFormup = (
  schema: FormupYupSchema,
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

  const submitForm = React.useCallback((event: any) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    const {
      isValid,
      error,
    } = validateForm(schema, formikForm);

    if (!isValid) {
      if (onError) {
        onError(error);
      }

      return;
    }

    formikForm.handleSubmit();
  }, [
    formikForm,
    onError,
    schema,
  ]);

  return {
    submitForm,
    formikForm,
    FormInput,
    Form,
  };
};

export default useFormup;
