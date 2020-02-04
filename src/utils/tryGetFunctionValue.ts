/**
 * Tries to return the result of a function, or a default value instead.
 * @param object Object containing the function.
 * @param functionName Function name.
 * @param defaultValue Default value.
 */
const tryGetFunctionValue = (
  object: any,
  functionName: string,
  defaultValue?: any,
) => (
  object
  && object[functionName]
  && object[functionName]()
) || defaultValue;

export default tryGetFunctionValue;
