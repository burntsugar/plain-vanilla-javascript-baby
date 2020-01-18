'use strict';
/**
 * @file
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides access to network.
 */

import {Client} from './client.js';
import {checkNetwork} from './check-network.js';
import {commonProps} from '../common-props.js';

/**
 * @module networkControl
 * @description Provides access to network.
 */
const networkControl = (() => {
  /**
   * Object in use for fetch.
   */
  let fetchClient = Client;

  /**
   * Use to change the default fetch client object.
   * Mocking is a possible use case.
   * client.js is used by default.
   * @param {*} client
   * @return {undefined}
   */
  const setFetchClient = (client) => (fetchClient = client);

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
    await fetchClient.fetchJsonResource(url)
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
    setFetchClient: setFetchClient,
  };
})();

export {networkControl};
