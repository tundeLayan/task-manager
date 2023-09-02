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

/**
 *
 * @param date
 * @returns string of date in this format: 2023-09-09T22:02
 */
export const generateDate = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDate;
};
