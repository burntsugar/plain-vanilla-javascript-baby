'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { fetchJsonResource } from './client.js';
import { checkNetwork } from './check-network.js';

let theData;

async function readTheData(url) {
  let [data, ferror] = await fetchJsonResource(url)
    .then(data => [data, undefined])
    .catch(error => Promise.resolve([undefined, error]));

  if (ferror) {
    theData = { status: ferror.message, body: ferror.name };
  } else {
    theData = data;
  }
}

export async function apiRequest(url) {
  if (checkNetwork.hasNoConnection()) {
    return buildResponse({
      status: requestStatusId.NETWORK_ERROR,
      body: requestStatusId.MESSAGE_ERROR_NO_NETWORK
    });
  }
  if (theData === undefined) {
    await readTheData(url);
  }
  return buildResponse(theData);
}

const requestStatusId = {
  MESSAGE_ERROR_FAILED: 'Operation failed!',
  MESSAGE_ERROR_NO_NETWORK: 'No network!',
  STATUS_CANT_COMPLETE_OPERATION: -7000,
  MESSAGE_OPERATION_CANT_COMPLETE:
    'Operation could not be completed at this time!',
  SUCCESS: 200,
  NOT_FOUND: 404,
  NETWORK_ERROR: -8000,
  ERROR_NAME_NO_NETWORK: 'NetworkError',
  TIME_OUT_ERROR: 'TimeoutError',
  MESSAGE_TIME_OUT: 'Timeout!',
  STATUS_TIMEOUT: -9000
};

function Response(status, body) {
  this.status = status;
  this.body = body;
}

function buildResponse(data) {
  switch (data.status) {
    case requestStatusId.SUCCESS:
      console.log(
        'requestStatusId.SUCCESS: ' +
          requestStatusId.SUCCESS +
          '  ' +
          data.status +
          ' ' +
          data.body.node_id
      );
      return new Response(requestStatusId.SUCCESS, data.body);
    case requestStatusId.NOT_FOUND:
      return new Response(requestStatusId.NOT_FOUND, data.body);
    case requestStatusId.NETWORK_ERROR:
      return new Response(requestStatusId.NETWORK_ERROR, data.body);
    default:
      return new Response(
        requestStatusId.STATUS_CANT_COMPLETE_OPERATION,
        data.body
      );
  }
}
