'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

const MockStorage = (() => {
  let storage = new Map();
  let provokequotasexceededxception = false;

  const setProvokeQuotasExceedEdxception = (value) =>
    (provokequotasexceededxception = value);

  const setItem = (key, value) => {
    if (provokequotasexceededxception) {
      return provokeQuotaExceededError();
    } else {
      storage.set(key, value);
    }
  };

  const provokeQuotaExceededError = () => {
    const e = new DOMException();
    e.code = 22;
    return e;
  };

  const getItem = (key) => {
    if (storage.get(key) == undefined) {
      return null;
    }
    return storage.get(key);
  };

  /**
   *
   * @param {string} key
   * @return {undefined}
   */
  const removeItem = (key) => void storage.delete(key);

  /**
   * @return {undefined}
   */
  const clear = () => (storage = new Map());

  /**
   * @return {undefined} implicit return
   */
  const getSize = () => storage.size;

  return {
    setItem: setItem,
    getItem: getItem,
    removeItem: removeItem,
    clear: clear,
    getSize: getSize,
    setProvokeQuotasExceedEdxception: setProvokeQuotasExceedEdxception,
  };
})();

export {MockStorage};
