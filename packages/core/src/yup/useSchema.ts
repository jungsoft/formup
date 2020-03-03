import * as yup from 'yup';

const useSchema = (
  payload: yup.ObjectSchemaDefinition<any>,
  locale?: yup.LocaleObject,
) => {
  if (locale) {
    yup.setLocale(locale);
  }

  return yup.object().shape(payload);
};

export default useSchema;
