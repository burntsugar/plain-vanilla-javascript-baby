'use strict';

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Produces a Data instance, containing given user data.
 */

/** RMP */
const userProfile = ( () => {
  /**
     * Returns a Data instance which contains given data for a user.
     * @param {number} status the status code representing the state of
     * this user's data after a network request or other retrieval
     * operation, or validation activity
     * @param {string} body data for this user. In the case of a
     * successful retrieval, this will be a JSON string. Or else
     * error information
     */
  class Data {
    /**
     *
     * @param {string} status
     * @param {object} body
     */
    constructor(status, body) {
      this._status = status;
      this._body = body;
    }

    /**
     * get status.
     * @return {string} status
     */
    get status() {
      return this._status;
    }

    /**
     * get body
     * @return {object} body
     */
    get body() {
      return this._body;
    }
  }
  return {
    Data: Data,
  };
})();

export {userProfile};
