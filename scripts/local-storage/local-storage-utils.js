'use strict';

import { commonProps } from "../common-props.js";

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for working with local storage.
 */

/**
 * RMP
 */
const localStorageUtils = (function() {

  /**
   * @public
   * Retrieve the value of a given key if the key exists.
   * @param {string} key belonging to the value
   * @return {object} if found or null if not found.
   */
  function retrieveFromLocalStorage(key) {
    console.log('#LS localStorageUtils.retrieveFromLocalStorage: ' + key);

    var entry = JSON.parse(window.localStorage.getItem(key));

    if (getValidItemFromStorage(key) == null) {
      console.log('#LS localStorageUtils.retrieveFromLocalStorage: NULL');

      return null;
    } else {
      console.log('#LS localStorageUtils.retrieveFromLocalStorage: NOT NULL');

      return entry;
    }
  }

  function retrieveImageFromLocalStorage(key) {
    return window.localStorage.getItem(key);
  }

  /** TODO: Implement timestamp for image */
  /**
   * @public
   * Adds an entry to LocalStorage. A timestamp is appended to the entry.
   * @param {string} keyString key for the new entry
   * @param {object} valueObject value for the new entry
   */
  function persistToLocalStorage(keyString, valueObject) {
    console.log(
      '#LS localStorageUtils.persistToLocalStorage: ' + valueObject.login
    );

    if (getValidItemFromStorage(keyString) == null) {
      valueObject.timestamp = new Date().getTime();
      saveToLocalStorageNow(keyString, JSON.stringify(valueObject));
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
    console.log(
      '#LS localStorageUtils.persistImageToLocalStorage: ' + keyString
    );
    saveToLocalStorageNow(keyString, dataURL);
  }

  /**
   *
   * @param {*} keyString
   * @param {*} valueString
   */
  function saveToLocalStorageNow(keyString, valueString) {
    console.log('#LS localStorageUtils.saveToLocalStorageNow: ' + keyString);
    window.localStorage.setItem(keyString, valueString);
  }

  /**
   * Returns a value for a given key, if it exists.
   * @param {string} key value key
   * @return {object} if found or null if not found.
   */
  function getFromLocalStorage(key) {
    console.log(
      '#LS localStorageUtils.getFromLocalStorage: ' +
        window.localStorage.getItem(
          'localStorageUtils.getFromLocalStorage: ' + key
        )
    );
    return window.localStorage.getItem(key);
  }

  function getValidItemFromStorage(key) {
    console.log('#LS localStorageUtils.getValidItemFromStorage');
    let entry = window.localStorage.getItem(key);
    if (entry != null) {
      let e = JSON.parse(entry);
      console.log(
        '#LS localStorageUtils.getValidItemFromStorage: entry NOT NULL ' +
          e.login +
          ' ' +
          e.timestamp +
          ' ' +
          typeof e
      );
      return cacheExpired(e.timestamp) ? null : e;
    }
    return null;
  }

  /**
   * Compares a given date with the current data. If more that 1 minute has passed since the given date, true is returned.
   * @param {string} timestamp date of stored object
   * @return {boolean} true is returned if more that 1 minute has passed since the given date, or else false
   */
  function cacheExpired(timestamp) {
    console.log('#LS localStorageUtils.cacheExpired: ' + timestamp);
    var timestampDate = new Date(timestamp);
    var nowDate = new Date();
    timestampDate.setMinutes(
      timestampDate.getMinutes() + commonProps.localStorageConfig.CACHE_EXPIRY_SECONDS
    );
    return nowDate > timestampDate ? true : false;
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
        storage &&
        storage.length !== 0
      );
    }
  }

  return {
    retrieveFromLocalStorage: retrieveFromLocalStorage,
    retrieveImageFromLocalStorage: retrieveImageFromLocalStorage,
    persistToLocalStorage: persistToLocalStorage,
    persistImageToLocalStorage: persistImageToLocalStorage
  };
})();

export { localStorageUtils };
