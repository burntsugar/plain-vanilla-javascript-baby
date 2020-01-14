'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Checks the state of the user agent to determine whether a network connection is available.
 * Can be used to gain an indication of whether the agent has a network connection, however, the agent state may report a false positive. For this reason, checking for the agent to be in a false online state is a reliable way to establish a non-existant network connection. See Navigator.onLine docs at
 * https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 */

/** RMP */
const checkNetwork = (() => {
  /**
   * Returns online state of the user agent
   * @public
   * @returns {boolean} implicit return, the online state of the user agent
   */
  const hasConnection = () => window.navigator.onLine;

  /**
   * Returns whether the user agent has no network connection.
   * @public
   * @returns {boolean} implicit return, whether the user agent has no internet connection
   */
  const hasNoConnection = () =>
    window.navigator.onLine == false ? true : false;

  return {
    hasConnection: hasConnection,
    hasNoConnection: hasNoConnection
  };
})();

export { checkNetwork };
