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
      status: commonProps.domExceptionIds.NETWORK_ERROR,
      body: commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK
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
    case commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS:
      return new Response(commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS, data.body);
    case commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND:
      return new Response(commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND, data.body);
    case commonProps.domExceptionIds.NETWORK_ERROR:
      return new Response(commonProps.domExceptionIds.NETWORK_ERROR, data.body);
    case commonProps.domExceptionIds.STATUS_TIMEOUT:
      return new Response(commonProps.domExceptionIds.STATUS_TIMEOUT, data.body);
    default:
      return new Response(
        commonProps.domExceptionIds.STATUS_CANT_COMPLETE_OPERATION,
        data.body
      );
  }
}
