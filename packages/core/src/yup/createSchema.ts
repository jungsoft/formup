import * as yup from 'yup';

/**
 * Creates a new yup schema.
 * @param payload Schema payload
 * @param locale Schema locale
 */
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
