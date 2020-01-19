'use strict';
/**
 * @file
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides access to network via Fetch API.
 */

const FetchClient = (() => {
  const fetchJsonResource = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return {status: response.status, body: data};
  };

  return {
    fetchJsonResource: fetchJsonResource,
  };
})();

export {FetchClient};
