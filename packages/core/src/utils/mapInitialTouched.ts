/**
 * Recursively maps touched fields in an object.
 * @param obj The object
 */
const recursiveMapTouched = (obj: object): object => {
  const result = {
    ...(obj || {}),
  };

  Object
    .keys(result)
    .forEach((key) => {
      const value = result[key];

      if (typeof value === 'object') {
        result[key] = recursiveMapTouched(value);
        return;
      }

      result[key] = true;
    });

  return result;
};

/**
 * Recursively maps initial touched fields according to custom initial values.
 * Any value initialized with initialValues will be marked as touched.
 *
 * You can override the touched values by passing an object as the second parameter,
 * which is optional.
 *
 * @param initialValues Value of initialValues
 * @param initialTouched Value of initialTouched
 */
const mapInitialTouched = (
  initialValues?: object,
  initialTouched?: object,
) => {
  if (initialTouched) {
    return initialTouched;
  }

  if (!initialValues) {
    return undefined;
  }

  return recursiveMapTouched(initialValues);
};

export default mapInitialTouched;
