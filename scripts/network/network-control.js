'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { fetchJsonResource } from './client.js';
import { checkNetwork } from './check-network.js';
import { commonProps } from '../common-props.js';

let responseData;

async function startRequest(url) {
  let [data, ferror] = await fetchJsonResource(url)
    .then(data => [data, undefined])
    .catch(error => Promise.resolve([undefined, error]));

  if (ferror) {
    responseData = { status: ferror.message, body: ferror.name };
  } else {
    responseData = data;
  }
}

export async function requestAPI(url) {
  if (checkNetwork.hasNoConnection()) {
    return buildResponse({
      status: commonProps.appProps.NETWORK_ERROR,
      body: commonProps.appProps.MESSAGE_ERROR_NO_NETWORK
    });
  }
  if (responseData === undefined) {
    await startRequest(url);
  }
  return buildResponse(responseData);
}

function Response(status, body) {
  this.status = status;
  this.body = body;
}

function buildResponse(data) {
  switch (data.status) {
    case commonProps.appProps.SUCCESS:
      return new Response(commonProps.appProps.SUCCESS, data.body);
    case commonProps.appProps.NOT_FOUND:
      return new Response(commonProps.appProps.NOT_FOUND, data.body);
    case commonProps.appProps.NETWORK_ERROR:
      return new Response(commonProps.appProps.NETWORK_ERROR, data.body);
    default:
      return new Response(
        commonProps.appProps.STATUS_CANT_COMPLETE_OPERATION,
        data.body
      );
  }
}
