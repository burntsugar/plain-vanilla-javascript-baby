'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

const MockStorage = (function() {
  let storage = new Map();
  let provokequotasexceededxception = false;

  function setProvokeQuotasExceedEdxception(value) {
    provokequotasexceededxception = value;
  }

  function setItem(key, value) {
    if (provokequotasexceededxception) {
      return provokeQuotaExceededError();
    } else {
      storage.set(key, value);
    }
  }

  function provokeQuotaExceededError() {
    const e = new DOMException();
    e.code = 22;
    return e;
  }

  function getItem(key) {
    if (storage.get(key) == undefined) {
      return null;
    }
    return storage.get(key);
  }
  function removeItem(key) {
    storage.delete(key);
  }
  function clear() {
    storage = new Map();
  }
  function getSize() {
    return storage.size;
  }
  return {
    setItem: setItem,
    getItem: getItem,
    removeItem: removeItem,
    clear: clear,
    getSize: getSize,
    setProvokeQuotasExceedEdxception: setProvokeQuotasExceedEdxception
  };
})();

export { MockStorage };
