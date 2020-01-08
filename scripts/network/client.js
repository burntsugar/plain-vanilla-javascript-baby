'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

const requestStatusId = {
  MESSAGE_ERROR_FAILED: 'Operation failed!',
  STATUS_CANT_COMPLETE_OPERATION: -7000,
  MESSAGE_OPERATION_CANT_COMPLETE:
    'Operation could not be completed at this time!',
  SUCCESS: 200,
  NOT_FOUND: 404,
  NETWORK_ERROR: -8000,
  ERROR_NAME_NO_NETWORK: 'NetworkError',
  MESSAGE_ERROR_NO_NETWORK: 'No network!',
  TIME_OUT_ERROR: 'TimeoutError',
  MESSAGE_TIME_OUT: 'Timeout!',
  STATUS_TIMEOUT: -9000
};

export async function fetchJsonResource(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 15000;
    xhr.responseType = 'json';
    // callback
    xhr.onload = function() {
      resolve({ status: this.status, body: this.response });
    };
    xhr.ontimeout = e => {
      console.error('Timeout!!');
      reject(
        new DOMException(
          requestStatusId.TIME_OUT_ERROR,
          requestStatusId.STATUS_TIMEOUT
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
          requestStatusId.ERROR_NAME_NO_NETWORK,
          requestStatusId.NETWORK_ERROR
        )
      );
    };
    xhr.send();
  });
}
