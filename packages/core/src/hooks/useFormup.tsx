import * as React from 'react';

import { useFormik, FormikConfig } from 'formik';
import classNames from 'classnames';

import { FORMUP_FORM_CLASS_NAME, FORM_KEY_PREFIX } from '../constants/identifiers';
import FormContainer from '../contexts/FormContext/FormContainer';
import Form, { FormPublicProps } from '../components/Form/Form';
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
  const [formKey] = React.useState(() => {
    const { length: formupFormsCount } = document.getElementsByClassName(FORMUP_FORM_CLASS_NAME);
    return `${FORM_KEY_PREFIX}${formupFormsCount + 1}`;
  });

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

  const FormComponent = React.useCallback(({
    className,
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

    const formClassName = classNames(FORMUP_FORM_CLASS_NAME, className);

    return (
      <FormContainer form={formikForm} key={formKey}>
        <Form
          handleOnSubmit={handleOnSubmit}
          className={formClassName}
        >
          {children}
        </Form>
      </FormContainer>
    );
  }, [
    formikForm,
  ]);

  return {
    Form: FormComponent,
    FormInput,
  };
};

export default useFormup;
