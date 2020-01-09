'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { commonProps } from '../common-props.js';

/**
 *
 * @param {string} url api url.
 */
export async function fetchJsonResource(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 15000;
    xhr.responseType = 'json';
    // callback
    xhr.onload = function() {
      console.log(commonProps.appProps.FOUND);
      resolve({ status: this.status, body: this.response });
    };
    xhr.ontimeout = e => {
      console.error('Timeout!!');
      reject(
        new DOMException(
          commonProps.appProps.TIME_OUT_ERROR,
          commonProps.appProps.STATUS_TIMEOUT
        )
      );
    };
    xhr.onloadend = () => {
      console.log(`xhr.status: ${xhr.status}`);
    };
    xhr.onerror = e => {
      console.error('Request failed: Network error');
      reject(
        new DOMException(
          commonProps.appProps.ERROR_NAME_NO_NETWORK,
          commonProps.appProps.NETWORK_ERROR
        )
      );
    };
    xhr.send();
  });
}
