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
      console.log('fetchJsonResource: ' + this.response);
      resolve({ status: this.status, body: this.response });
    };
    xhr.ontimeout = e => {
      console.error('Timeout!!');
      reject(
        new DOMException(
          commonProps.domExceptionNames.ERROR_NAME_TIME_OUT_ERROR,
          commonProps.domExceptionIds.TIMEOUT_EXC_ID
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
          commonProps.domExceptionNames.ERROR_NAME_NO_NETWORK_ERROR,
          commonProps.domExceptionIds.NETWORK_EXC_ID
        )
      );
    };
    xhr.send();
  });
}
