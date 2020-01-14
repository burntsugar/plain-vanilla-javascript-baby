'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { fetchJsonResource } from './client.js';
import { checkNetwork } from './check-network.js';
import { commonProps } from '../common-props.js';

const networkControl = (() => {
  let responseData;

  /**
   *
   * @param {*} url
   */
  const startRequest = async url => {
    let [data, ferror] = await fetchJsonResource(url)
      .then(data => [data, undefined])
      .catch(error => Promise.resolve([undefined, error]));

    if (ferror) {
      responseData = { status: ferror.message, body: ferror.name };
    } else {
      responseData = data;
    }
  };

  /**
   * @public
   * @param {*} url
   */
  const requestAPI = async url => {
    if (checkNetwork.hasNoConnection()) {
      return buildResponse({
        status: commonProps.domExceptionIds.NETWORK_EXC_ID,
        body: commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK
      });
    }
    if (responseData === undefined) {
      await startRequest(url);
    }
    return buildResponse(responseData);
  };

  /**
   * constructor function
   * */
  function Response(status, body) {
    this.status = status;
    this.body = body;
  }

  /**
   *
   * @param {*} data
   */
  const buildResponse = data => {
    switch (data.status) {
      case commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS:
        return new Response(
          commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS,
          data.body
        );
      case commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND:
        return new Response(
          commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND,
          data.body
        );
      case commonProps.domExceptionIds.NETWORK_EXC_ID:
        return new Response(
          commonProps.domExceptionIds.NETWORK_EXC_ID,
          data.body
        );
      case commonProps.domExceptionIds.TIMEOUT_EXC_ID:
        return new Response(
          commonProps.domExceptionIds.TIMEOUT_EXC_ID,
          data.body
        );
      default:
        return new Response(
          commonProps.domExceptionIds.CANT_COMPLETE_EXC_ID,
          data.body
        );
    }
  };

  return {
    requestAPI: requestAPI
  };
})();

export { networkControl };

// 'use strict';
// /**
//  * @author Rachael Colley <rcolley@rcolley>
//  * @fileoverview does stuff.
//  */

// import { fetchJsonResource } from './client.js';
// import { checkNetwork } from './check-network.js';
// import { commonProps } from '../common-props.js';

// let responseData;

// async function startRequest(url) {
//   let [data, ferror] = await fetchJsonResource(url)
//     .then(data => [data, undefined])
//     .catch(error => Promise.resolve([undefined, error]));

//   if (ferror) {
//     responseData = { status: ferror.message, body: ferror.name };
//   } else {
//     responseData = data;
//   }
// }

// export async function requestAPI(url) {
//   if (checkNetwork.hasNoConnection()) {
//     return buildResponse({
//       status: commonProps.domExceptionIds.NETWORK_EXC_ID,
//       body: commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK
//     });
//   }
//   if (responseData === undefined) {
//     await startRequest(url);
//   }
//   return buildResponse(responseData);
// }

// function Response(status, body) {
//   this.status = status;
//   this.body = body;
// }

// // HTTP_STATUS_SUCCESS
// // HTTP_STATUS_NOT_FOUND
// // NETWORK_ERROR
// // STATUS_TIMEOUT
// // STATUS_CANT_COMPLETE_OPERATION

// function buildResponse(data) {
//   switch (data.status) {
//     case commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS:
//       return new Response(commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS, data.body);
//     case commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND:
//       return new Response(commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND, data.body);
//     case commonProps.domExceptionIds.NETWORK_EXC_ID:
//       return new Response(commonProps.domExceptionIds.NETWORK_EXC_ID, data.body);
//     case commonProps.domExceptionIds.TIMEOUT_EXC_ID:
//       return new Response(commonProps.domExceptionIds.TIMEOUT_EXC_ID, data.body);
//     default:
//       return new Response(
//         commonProps.domExceptionIds.CANT_COMPLETE_EXC_ID,
//         data.body
//       );
//   }
// }
