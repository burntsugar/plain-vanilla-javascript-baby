'use strict';

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Produces a Data object, containing given user data.
 */

/** RMP */
const userProfile = (function() {
  /**
   * Constructor function.
   * Returns a Data object which contains given data for a user.
   * @param {number} status the status code representing the state of this user's data after a network request or other retrieval operation, or validation activity
   * @param {string} body data for this user. In the case of a successful retrieval, this will be a JSON string. Or else error information
   * @returns {Data} object
   */
  function Data(status, body) {
    this.status = status;
    this.body = body;
  }
  return {
    Data: Data
  };
})();

export { userProfile };