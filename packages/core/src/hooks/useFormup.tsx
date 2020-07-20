import * as React from 'react';
import { useFormik } from 'formik';
import invariant from 'invariant';

import {
  FormupYupSchema,
  UseFormupResult,
  UseFormupOptions,
  FormupFormikForm,
  SubmitFormOptions,
  ValidateFormOptions,
} from '../interfaces';
import FormInputGroupItem from '../components/FormInputGroupItem/FormInputGroupItem';
import mapInitialValuesFromSchema from '../utils/mapInitialValuesFromSchema';
import FormInputGroup from '../components/FormInputGroup/FormInputGroup';
import FormArrayField from '../components/FormArrayField/FormArrayField';
import mapInitialTouched from '../utils/mapInitialTouched';
import FormInput from '../components/FormInput/FormInput';
import validateForm from '../yup/validateForm';
import useHasMounted from './useHasMounted';
import Form from '../components/Form/Form';
import noop from '../utils/noop';

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
  invariant(!!schema, 'You need to provide the "schema" prop.');

  const hasMounted = useHasMounted();

  const initialValues = React.useMemo(() => (
    mapInitialValuesFromSchema(schema, options?.initialValues)
  ), [
    options,
    schema,
  ]);

  const initialTouched = React.useMemo(() => (
    mapInitialTouched(initialValues, options?.initialTouched)
  ), [
    initialValues,
    options,
  ]);

  const useFormikResult = useFormik({
    ...options,
    validateOnMount: !hasMounted && options.validateOnMount,
    onSubmit: options?.onSubmit || noop,
    validationSchema: schema,
    initialTouched,
    initialValues,
  });

  const formikForm: FormupFormikForm = React.useMemo(() => ({
    ...useFormikResult,
    schema,
  }), [
    useFormikResult,
    schema,
  ]);

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
      if (options?.onError) {
        options.onError(error);
      }

      return;
    }

    if (options?.onSubmit) {
      options.onSubmit(formikForm.values);
    }
  }, [
    handleValidateForm,
    formikForm,
    options,
  ]);

  return {
    validateForm: handleValidateForm,
    FormInputGroupItem,
    FormArrayField,
    FormInputGroup,
    submitForm,
    formikForm,
    FormInput,
    Form,
  };
};

export default useFormup;
