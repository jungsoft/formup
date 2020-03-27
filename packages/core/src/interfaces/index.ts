import * as yup from 'yup';
import { FormikConfig } from 'formik';

import { FormInputProps } from '../components/FormInput/FormInput';
import { FormProps } from '../components/Form/Form';

export interface YupSchema extends yup.Schema<any> {
  fields: object;
}

export interface ValidateFormOptions extends yup.ValidateOptions {
  paths?: string | string[],
}

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
