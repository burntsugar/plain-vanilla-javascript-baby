'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */


const CACHE_DURATION = 1000;

export function retrieveFromLocalStorage(key) {
    var entry = JSON.parse(window.localStorage.getItem(key));
    if (entry == null) {
        return null;
    } else {
        return cacheExpired(entry.timestamp) ? null : entry
    }
}

export function persistToLocalStorage(keyString, valueObject) {
    if (retrieveFromLocalStorage(keyString) == null) {
        valueObject.timestamp = new Date().getTime()
        window.localStorage.setItem(keyString, JSON.stringify(valueObject))
    }
}

export function retrieveImageFromLocalStorage(key) {
    return window.localStorage.getItem(key)
}

export function persistImageToLocalStorage(keyString, dataURL) {
    window.localStorage.setItem(keyString, dataURL)
}

function cacheExpired(timestamp) {
    var timestampDate = new Date(timestamp);
    var nowDate = new Date();
    timestampDate.setMinutes(timestampDate.getMinutes() + (CACHE_DURATION / 1000))
    return nowDate > timestampDate ? true : false
}
