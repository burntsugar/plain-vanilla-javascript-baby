'use strict';

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview A collection of string utilities.
 */

/** RMP  */
const stringUtils = (() => {
  /**
   * Operates on a given string and returns whether it is empty.
   * @public
   * @param {string} str the string to examine
   * @returns {boolean} whether the string is empty such that str.length is equal to 0, or false if the argument is invalid.
   */
  const stringIsEmpty = str => {
    if (typeof str != 'string' || str == null) return true;
    return str.length == 0 ? true : false;
  };

  /**
   * Operates on a given string, returning a copy with illegal characters removed.
   * Illegal characters are: | & ; $ % @ " < > ( ) + ,
   * @public
   * @param {string} str the string to cleans
   * @returns {string} the cleansed copy of str, or undefined if the argument is invalid.
   */
  const removeIllegalCharacters = str => {
    if (typeof str != 'string' || str == null) return undefined;
    return str.replace(/[|&;$%@"<>()+,]/g, '');
  };

  return {
    stringIsEmpty: stringIsEmpty,
    removeIllegalCharacters: removeIllegalCharacters
  };
})();

export { stringUtils };
