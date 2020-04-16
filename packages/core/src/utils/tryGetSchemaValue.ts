/**
 * Tries to return the result of a yup property or function, or a default value instead.
 * @param object Object containing the function.
 * @param key Property or Function name.
 * @param defaultValue Default value.
 */
const tryGetSchemaValue = (
  object: any,
  key: string,
  defaultValue?: any,
) => {
  const yupProperty = object && object[`_${key}`];

  if (yupProperty !== undefined) {
    return yupProperty;
  }

  return (
    object
    && object[key]
    && object[key]()
  ) || defaultValue;
};

export default tryGetSchemaValue;
