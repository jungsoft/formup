import fieldTypes from './fieldTypes';

/**
 * Default values for mapping object types.
 */
const fieldDefaultValues = {
  /**
   * Default value for string types.
   */
  [fieldTypes.string]: '',

  /**
   * Default value for boolean types.
   */
  [fieldTypes.boolean]: false,

  /**
   * Default value for number types.
   */
  [fieldTypes.number]: 0,

  /**
   * Default value for date types.
   */
  [fieldTypes.date]: new Date(),

  /**
   * Default value for object types.
   */
  [fieldTypes.object]: {},

  /**
   * Default value for array types.
   */
  [fieldTypes.array]: [],
};

export default fieldDefaultValues;
