import * as yup from 'yup';

export interface YupSchema extends yup.Schema<any> {
  fields: object;
}

export interface ValidateFormOptions extends yup.ValidateOptions {
  paths?: string | string[],
}
