import merge from 'merge';

/**
 * Returns true if one value is possibly touched.
 *
 * This includes the cases:
 * Is truthy
 * Is `false` (falsy, but represents checkboxes & radio buttons)
 * Is `0` (falsy, but represents number inputs already pre-filled)
 *
 * @param value The value
 */
const evalIsTouched = (value: any) => !!(
  value
  || value === false
  || value === 0
);

/**
 * Recursively maps touched fields in an object.
 * @param obj The object
 */
const recursiveMapTouched = (obj?: object): object => {
  if (!obj) {
    return {};
  }

  const result = {
    ...(obj || {}),
  };

  Object
    .keys(result)
    .forEach((key) => {
      const value = result[key];

      if (value && typeof value === 'object') {
        result[key] = recursiveMapTouched(value);
        return;
      }

      result[key] = evalIsTouched(value);
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
 * @param override Value of initialTouched
 */
const mapInitialTouched = (
  initialValues?: object,
  override?: object,
) => {
  const touchedFromInitialValues = recursiveMapTouched(initialValues);

  return merge.recursive(
    (touchedFromInitialValues || {}),
    (override || {}),
  );
};

export default mapInitialTouched;
