'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Mocks Client module.
 */

import {commonProps} from '../common-props.js';
import {FileUtils} from '../utils/file-utils.js';

const MockClient = (() => {

  const fetchJsonResource = async (url) => {
    switch (url) {
      case 'networkexception':
        return returnNoNetworkException();
      case 'timeoutexception':
        return returnTimeoutException();
      default: 
      const pr = await start(url);
      return pr;
    }
  };

  const start = async (url) => {
    const fileData = await FileUtils.readJsonRawFile(process.cwd() + '/src/raw/users.json');
    const pr = await returnPromise(url, fileData);
    return pr;
  };

  const returnPromise = async (url, fileData) => {
    return new Promise((resolve, reject) => {
      const username = url.substring(url.lastIndexOf('/') + 1);
      let response;
      if (fileData.login == username) {
        response = {status: 200, body: fileData};
      } else {
        response = {status: 404, body: null};
      }
      process.nextTick(() => {
        resolve(response);
      });
    });
  };

  const returnNoNetworkException = () => {
    return new Promise((resolve, reject) => {
      reject(
        new DOMException(
          commonProps.domExceptionNames.ERROR_NAME_NO_NETWORK_ERROR,
          commonProps.domExceptionIds.NETWORK_EXC_ID
        ),
      );
  });
};

  const returnTimeoutException = () => {
    return new Promise((resolve, reject) => {
      reject(
        new DOMException(
          commonProps.domExceptionNames.ERROR_NAME_TIME_OUT_ERROR,
          commonProps.domExceptionIds.TIMEOUT_EXC_ID
        ),
      );
  });
};

  return {
    fetchJsonResource: fetchJsonResource,
  };
})();

export {MockClient};
