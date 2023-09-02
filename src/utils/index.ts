/**
 *
 * @param {*} values - an object
 * @returns true if any value of the object's (key:value) pair does not have a value
 * and false otherwise
 */
export const isAnyFieldEmpty = (values: object, keyToExclude?: string) => {
  return Object.entries(values)
    .filter(value => value[0] !== keyToExclude)
    .some(value => !value[1]);
};
