import * as yup from 'yup';

const createSchema = (
  payload: yup.ObjectSchemaDefinition<any>,
  locale?: yup.LocaleObject,
) => {
  if (locale) {
    yup.setLocale(locale);
  }

  return yup.object().shape(payload);
};

export default createSchema;
