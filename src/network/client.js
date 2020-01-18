'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview XHR client.
 */

import {commonProps} from '../common-props.js';

const Client = (() => {
/**
 * @async
 * @param {string} url api url.
 */
  const fetchJsonResource = async (url) => {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.timeout = 15000;
      xhr.responseType = 'json';
      // callback
      xhr.onload = function() {
        resolve({status: this.status, body: this.response});
      };
      xhr.ontimeout = (e) => {
        console.error('Timeout!!');
        reject(
          new DOMException(
            commonProps.domExceptionNames.ERROR_NAME_TIME_OUT_ERROR,
            commonProps.domExceptionIds.TIMEOUT_EXC_ID,
          ),
        );
      };
      xhr.onloadend = () => {
        console.log(`xhr.status: ${xhr.status}`);
      };
      xhr.onerror = (e) => {
        console.error('Request failed: Network error');
        reject(
          new DOMException(
            commonProps.domExceptionNames.ERROR_NAME_NO_NETWORK_ERROR,
            commonProps.domExceptionIds.NETWORK_EXC_ID,
          ),
        );
      };
      xhr.send();
    });
  };

  return {
    fetchJsonResource: fetchJsonResource,
  };
})();

export {Client};
