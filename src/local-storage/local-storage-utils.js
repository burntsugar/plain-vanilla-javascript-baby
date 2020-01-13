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

  let appLocalStorage = window.localStorage;

  /**
   * Use to change the default local storage object.
   * Mocking is a possible use case. 
   * window.localStorage is used by default.
   * @param {*} storageObject 
   */
  function setStorageObject(storageObject){
      appLocalStorage = storageObject;
  }

  /**
   * @public
   * @param {*} key
   * @param {*} appendKey
   * @param {*} appendValue
   */
  function appendToEntry(key, appendKey, appendValue) {
    var entry = retrieveEntry(key);
    if (entry != null) {
      entry[appendKey] = appendValue;
      setLocalStorageItem(key, entry);
    }
  }

  /**
   * @public
   * Retrieve the value of a given key if the key exists.
   * @param {string} key belonging to the value
   * @return {object} if found or null if not found.
   */
  function retrieveEntry(key) {
    return getValidStorageItem(key);
  }

  /**
   * @public
   * Adds an entry to LocalStorage. A timestamp is appended to the entry.
   * @param {string} keyString key for the new entry
   * @param {object} valueObject value for the new entry
   */
  function persistEntry(keyString, valueObject) {
    if (!localStorageIsAvailable()) return 
    if (getValidStorageItem(keyString) == null) {
      valueObject.timestamp = new Date().getTime();
      setLocalStorageItem(keyString, valueObject);
    }
  }

  /**
   *
   * @param {*} key
   */
  function getValidStorageItem(key) {
    let entry = JSON.parse(getLocalStorageItem(key));
    if (entry != null) {
      return cacheExpired(entry.timestamp) ? null : entry;
    }
    return null;
  }

  /**
   * Checks local storage entry for cache expiration. Compares a given date with the current data. If more than CACHE_EXPIRY_SECONDS has passed since the given date, true is returned.
   * @param {string} timestamp date of stored object
   * @return {boolean} true is returned if more than CACHE_EXPIRY_SECONDS has passed since the given date, or else false
   */
  function cacheExpired(timestamp) {
    var timestampDate = new Date(timestamp);
    var nowDate = new Date();
    timestampDate.setMinutes(
      timestampDate.getMinutes() +
        commonProps.localStorageConfig.CACHE_EXPIRY_SECONDS
    );
    return nowDate > timestampDate ? true : false;
  }

  /**
   * TODO: Implement
   */
  function localStorageIsAvailable() {
    // return storageAvailable('localStorage') ? true : false;
    return storageAvailable() ? true : false;
  }

  /**
   * TODO: Implement
   */
  // function storageAvailable(type) {
  //   var storage;
  function storageAvailable() {
    var storage;
    try {
      // storage = window[type];
      storage  = appLocalStorage;
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
  }

  /**
   *
   * @param {*} key
   * @return {DOMString}
   */
  function getLocalStorageItem(key) {
    return appLocalStorage.getItem(key);
  }

  /**
   *
   * @param {*} key
   * @param {*} valueObject
   * @return {undefined}
   */
  function setLocalStorageItem(key, valueObject) {
    appLocalStorage.setItem(key, JSON.stringify(valueObject));
  }

  /**
   *
   * @param {*} key
   * @return {undefined}
   */
  function removeLocalStorageItem(key) {
    appLocalStorage.removeItem(key);
  }

  /**
   * @return {undefined}
   */
  function clearLocalStorage() {
    appLocalStorage.clear();
  }

  return {
    retrieveEntry: retrieveEntry,
    persistEntry: persistEntry,
    appendToEntry: appendToEntry,
    setStorageObject: setStorageObject,
  };
})();

export { localStorageUtils };
