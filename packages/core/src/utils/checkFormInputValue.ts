/**
 * Checks if the value passed to FormInput is different than
 * null, undefined or empty strings.
 *
 * @return {boolean} whether the field is empty or not
 *
 * @param value Value prop passed to FormInput
 */
const checkFormInputValue = (value: any): boolean => {
  return value !== undefined && value !== null && value !== '';
};

export default checkFormInputValue;
