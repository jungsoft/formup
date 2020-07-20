/**
 * Builds the path to one item in the array.
 * @param name The field name
 * @param index The field index
 */
export const getArrayItemPath = (
  name: string,
  index: number,
) => (
  `${name}[${index}]`
);

/**
 * Builds the path to one property inside the array item.
 * @param path The path built by formup
 * @param subpath The field subpath to the object property
 */
export const getArrayObjectPath = (
  path: string,
  subpath: string,
) => (
  `${path}.${subpath}`
);
