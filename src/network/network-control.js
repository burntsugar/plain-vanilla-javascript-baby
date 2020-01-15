'use strict';
/**
 * @file
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides access to network.
 */

import {fetchJsonResource} from './client.js';
import {checkNetwork} from './check-network.js';
import {commonProps} from '../common-props.js';

/**
 * @module networkControl
 * @description Provides access to network.
 */
const networkControl = (() => {
  /**
   * @type {Response} instance of Response
   */
  let responseData;

  /**
   * @async
   * Starts a network request
   * If the request is successful, data is made available to the block.
   * If the request throws an error, the error is made available to the block.
   * @param {string} url to request
   */
  const startRequest = async (url) => {
    await fetchJsonResource(url)
      .then((data) => {
        responseData = new Response(data.status, data.body);
      })
      .catch((error) => {
        responseData = new Response(error.message, error.name);
      });
  };

  /**
   * @async
   * Starts a network request.
   * Initially checks for a network connection which if not available then
   * propogates an error message.
   * @public
   * @param {string} apiUrl to request
   * @return {object} instance of Response
   */
  const requestAPI = async (apiUrl) => {
    if (checkNetwork.hasNoConnection()) {
      responseData = new Response(commonProps.domExceptionIds.NETWORK_EXC_ID,
        commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK);
      return responseData;
    }
    await startRequest(apiUrl);
    return responseData;
  };


  /**
   * @class Response
   * @description Defines an object which contains the response
   * of the network operation.
   */
  class Response {
    /**
     * @constructor
     * @param {*} status
     * @param {*} body
     */
    constructor(status, body) {
      this._status = status;
      this._body = body;
    }

    /**
     *
     */
    get status() {
      return this._status;
    }

    /**
     *
     */
    get body() {
      return this._body;
    }
  }

  return {
    requestAPI: requestAPI,
  };
})();

export {networkControl};


// 'use strict';
// /**
//  * @author Rachael Colley <rcolley@rcolley>
//  * @fileoverview does stuff.
//  */

// import {fetchJsonResource} from './client.js';
// import {checkNetwork} from './check-network.js';
// import {commonProps} from '../common-props.js';

// const networkControl = (() => {
//   /**
//    * @type {object} instance of Response
//    */
//   let responseData;

//   /**
//    * Starts a network request
//    * If the request is successful, data is passed to the callback, which is
//    * then made available to the block.
//    * If the request throws an error, the error is passed to the callback,
//    * which is then made available to the block.
//    * @param {string} url to request
//    */
//   const startRequest = async (url) => {
//     const [data, ferror] = await fetchJsonResource(url)
//       .then((data) => [data, undefined])
//       .catch((error) => Promise.resolve([undefined, error]));

//     if (ferror) {
//       responseData = {status: ferror.message, body: ferror.name};
//     } else {
//       responseData = data;
//     }
//   };

//   /**
//    * Starts a network request.
//    * Initially checks for a network connection which then if not available,
//    * propogates an error message.
//    * @public
//    * @param {string} apiUrl to request
//    * @return {object} instance of Response
//    */
//   const requestAPI = async (apiUrl) => {
//     if (checkNetwork.hasNoConnection()) {
//       return buildResponse({
//         status: commonProps.domExceptionIds.NETWORK_EXC_ID,
//         body: commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK,
//       });
//     }
//     if (responseData === undefined) {
//       await startRequest(apiUrl);
//     }
//     return buildResponse(responseData);
//   };


//   /**
//    *
//    * @param {string} status
//    * @param {object} body
//    */
//   function Response(status, body) {
//     this.status = status;
//     this.body = body;
//   }

//   /**
//    *
//    * @param {object} data instance of Response
//    * @return {object} Response instance
//    */
//   const buildResponse = (data) => {
//     switch (data.status) {
//     case commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS:
//       return new Response(
//         commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS,
//         data.body,
//       );
//     case commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND:
//       return new Response(
//         commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND,
//         data.body,
//       );
//     case commonProps.domExceptionIds.NETWORK_EXC_ID:
//       return new Response(
//         commonProps.domExceptionIds.NETWORK_EXC_ID,
//         data.body,
//       );
//     case commonProps.domExceptionIds.TIMEOUT_EXC_ID:
//       return new Response(
//         commonProps.domExceptionIds.TIMEOUT_EXC_ID,
//         data.body,
//       );
//     default:
//       return new Response(
//         commonProps.domExceptionIds.CANT_COMPLETE_EXC_ID,
//         data.body,
//       );
//     }
//   };

//   return {
//     requestAPI: requestAPI,
//   };
// })();

// export {networkControl};
