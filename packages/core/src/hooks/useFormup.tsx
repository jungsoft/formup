import * as React from 'react';
import { useFormik, FormikConfig } from 'formik';

import FormInput, { FormInputProps } from '../components/FormInput/FormInput';
import mapFieldsToObject from '../utils/mapFieldsToObject';
import Form, { FormProps } from '../components/Form/Form';
import validateForm from '../yup/validateForm';
import { YupSchema } from '../yup/types';

export interface UseFormupOptions extends FormikConfig<any> {
  onError?: (errors: string[]) => void,
  onSubmit: (values: object) => void,
}

export interface UseFormupResult {
  FormInput: React.FunctionComponent<FormInputProps>,
  Form: React.FunctionComponent<FormProps>,
  submitForm: () => void,
  formikForm: any,
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

  const handleOnSubmit = React.useCallback((event: any) => {
    if (event) {
      event.preventDefault();
    }

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

  return {
    submitForm: () => handleOnSubmit(null),
    formikForm,
    FormInput,
    Form,
  };
};

export default useFormup;
