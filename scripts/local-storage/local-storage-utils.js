'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for working with local storage.
 */

/**
 * RMP
 */
const localStorageUtils = (function() {
  const _CACHE_DURATION = 1000;

  /**
   * @public
   * Retrieve the value of a given key if the key exists.
   * @param {string} key belonging to the value
   * @return {object} if found or null if not found.
   */
  function retrieveFromLocalStorage(key) {
    var entry = JSON.parse(window.localStorage.getItem(key));
    if (entry == null) {
      return null;
    } else {
      return cacheExpired(entry.timestamp) ? null : entry;
    }
  }

  /** TODO: Implement timestamp for image */
  /**
   * @public
   * Adds an entry to LocalStorage. A timestamp is appended to the entry.
   * @param {string} keyString key for the new entry
   * @param {object} valueObject value for the new entry
   */
  function persistToLocalStorage(keyString, valueObject) {
    console.log('localStorageUtils.persistToLocalStorage: ' + valueObject.login)
    if (getFromLocalStorage(keyString) == null) {
      console.log('localStorageUtils.persistToLocalStorage SAVING: ' + valueObject.status)
      valueObject.timestamp = new Date().getTime();
      window.localStorage.setItem(keyString, JSON.stringify(valueObject));
    }
  }

  /**
   * Returns a value for a given key, if it exists.
   * @param {string} key value key
   * @return {object} if found or null if not found.
   */
  function getFromLocalStorage(key) {
    return window.localStorage.getItem(key);
  }

  /**
   * TODO: Implement
   */
  function localStorageIsAvailable() {
    return storageAvailable('localStorage') ? true : false;
  }

  /**
   * TODO: Implement
   */
  function storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage && storage.length !== 0
      );
    }
  }

  /**
   * @public
   * Persist a relative url or dataUri for an image.
   * @param {string} keyString key for the new entry
   * @param {*} dataURL image url or uri
   * @return {undefined}
   */
  function persistImageToLocalStorage(keyString, dataURL) {
    window.localStorage.setItem(keyString, dataURL);
  }

  /**
   * Compares a given date with the current data. If more that 1 minute has passed since the given date, true is returned.
   * @param {string} timestamp date of stored object
   * @return {boolean} true is returned if more that 1 minute has passed since the given date, or else false
   */
  function cacheExpired(timestamp) {
    var timestampDate = new Date(timestamp);
    var nowDate = new Date();
    timestampDate.setMinutes(
      timestampDate.getMinutes() + _CACHE_DURATION / 1000
    );
    return nowDate > timestampDate ? true : false;
  }

  function retrieveImageFromLocalStorage(key) {
    return window.localStorage.getItem(key)
}

  return {
    retrieveFromLocalStorage: retrieveFromLocalStorage,
    persistToLocalStorage: persistToLocalStorage,
    persistImageToLocalStorage: persistImageToLocalStorage,
    retrieveImageFromLocalStorage: retrieveImageFromLocalStorage,
  };
})();

export { localStorageUtils };
