'use strict';

import { commonProps } from '../common-props.js';

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for working with local storage.
 * Cache expiration policy is configured in commonProps.localStorageConfig.CACHE_EXPIRY_SECONDS.
 */

/**
 * RMP
 */
const localStorageUtils = (function() {
  /**
   * Object in use for local storage.
   */
  let appLocalStorage = window.localStorage;

  /**
   * @public
   * Use to change the default local storage object.
   * Mocking is a possible use case.
   * window.localStorage is used by default.
   * @param {object} storageObject
   */
  const setStorageObject = storageObject => (appLocalStorage = storageObject);

  /**
   * @public
   * @param {string} key
   * @param {string} appendKey
   * @param {object} appendValue
   */
  const appendToEntry = (key, appendKey, appendValue) => {
    var entry = retrieveEntry(key);
    if (entry != null) {
      entry[appendKey] = appendValue;
      setLocalStorageItem(key, entry);
    }
  };

  /**
   * @public
   * Retrieve the value of a given key if the key exists.
   * @param {string} key belonging to the value
   * @return {object} true if found or null if not found.
   */
  const retrieveEntry = key => {
    return getValidStorageItem(key);
  };

  /**
   * @public
   * Adds an entry to LocalStorage. A timestamp is appended to the entry.
   * @param {string} keyString key for the new entry
   * @param {object} valueObject value for the new entry
   */
  const persistEntry = (keyString, valueObject) => {
    if (!localStorageIsAvailable()) return;
    if (getValidStorageItem(keyString) == null) {
      valueObject.timestamp = new Date().getTime();
      setLocalStorageItem(keyString, valueObject);
    }
  };

  /**
   * Returns a storage entry if it meets cache policy.
   * @param {string} key
   * @return the storage entry if valid or null if not found.
   */
  const getValidStorageItem = key => {
    let entry = JSON.parse(getLocalStorageItem(key));
    if (entry != null) {
      return cacheExpired(entry.timestamp) ? null : entry;
    }
    return null;
  };

  /**
   * Checks local storage entry for cache expiration. Compares a given date with the current data. If more than CACHE_EXPIRY_SECONDS has passed since the given date, true is returned.
   * @param {string} timestamp date of stored object
   * @return {boolean} true if more than CACHE_EXPIRY_SECONDS has passed since the given date, or else false
   */
  const cacheExpired = timestamp => {
    var timestampDate = new Date(timestamp);
    var nowDate = new Date();
    timestampDate.setMinutes(
      timestampDate.getMinutes() +
        commonProps.localStorageConfig.CACHE_EXPIRY_SECONDS
    );
    return nowDate > timestampDate ? true : false;
  };

  /**
   * @return true if storage is available.
   */
  const localStorageIsAvailable = () => {
    return storageAvailable() ? true : false;
  };

  /**
   * Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
   * @return true if storage is available or false if not.
   */
  const storageAvailable = () => {
    var storage;
    try {
      storage = appLocalStorage;
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
        storage &&
        storage.length !== 0
      );
    }
  };

  /**
   *
   * @param {*} key
   * @return {DOMString} storage entry or {null} if not found.
   */
  const getLocalStorageItem = key => {
    return appLocalStorage.getItem(key);
  };

  /**
   *
   * @param {string} key
   * @param {object} valueObject
   * @return {undefined}
   */
  const setLocalStorageItem = (key, valueObject) =>
    appLocalStorage.setItem(key, JSON.stringify(valueObject));

  /**
   *
   * @param {string} key
   * @return {undefined}
   */
  const removeLocalStorageItem = key => appLocalStorage.removeItem(key);

  /**
   * @return {undefined}
   */
  const clearLocalStorage = () => appLocalStorage.clear();

  return {
    retrieveEntry: retrieveEntry,
    persistEntry: persistEntry,
    appendToEntry: appendToEntry,
    setStorageObject: setStorageObject
  };
})();

export { localStorageUtils };
