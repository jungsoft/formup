import * as React from 'react';
import { useFormik } from 'formik';

import {
  FormupYupSchema,
  UseFormupResult,
  UseFormupOptions,
  FormupFormikForm,
  SubmitFormOptions,
  ValidateFormOptions,
} from '../interfaces';
import mapFieldsToObject from '../utils/mapFieldsToObject';
import FormInputGroupItem from '../components/FormInputGroupItem/FormInputGroupItem';
import FormInputGroup from '../components/FormInputGroup/FormInputGroup';
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
  const [initialValues] = React.useState(() => {
    if (schema) {
      return mapFieldsToObject(schema.fields);
    }

    return null;
  });

  if (!schema) {
    throw new Error('You need to provide the "schema" prop.');
  }

  if (!options?.onSubmit) {
    throw new Error('You need to provide the "onSubmit" option.');
  }

  const { onError } = options || {};

  const useFormikResult = useFormik({
    ...options,
    validationSchema: schema,
    initialValues,
  });

  const formikForm: FormupFormikForm = {
    ...useFormikResult,
    schema,
  };

  const handleValidateForm = React.useCallback((validationOptions?: ValidateFormOptions) => (
    validateForm(schema, formikForm, validationOptions)
  ), [
    formikForm,
    schema,
  ]);

  const submitForm = React.useCallback((submitFormOptions?: SubmitFormOptions) => {
    const {
      isValid,
      error,
    } = handleValidateForm(submitFormOptions?.validationOptions);

    if (!isValid) {
      if (onError) {
        onError(error);
      }

      return;
    }

    options.onSubmit(formikForm.values);
  }, [
    handleValidateForm,
    formikForm,
    onError,
    options,
  ]);

  return {
    validateForm: handleValidateForm,
    FormInputGroupItem,
    FormInputGroup,
    submitForm,
    formikForm,
    FormInput,
    Form,
  };
};

export default useFormup;
