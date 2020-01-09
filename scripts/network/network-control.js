'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { fetchJsonResource } from './client.js';
import { checkNetwork } from './check-network.js';
import { commonProps } from '../common-props.js';

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
      status: commonProps.appProps.NETWORK_ERROR,
      body: commonProps.appProps.MESSAGE_ERROR_NO_NETWORK
    });
  }
  if (theData === undefined) {
    await readTheData(url);
  }
  return buildResponse(theData);
}

function Response(status, body) {
  this.status = status;
  this.body = body;
}

function buildResponse(data) {
  switch (data.status) {
    case commonProps.appProps.SUCCESS:
      console.log(
        'requestStatusId.SUCCESS: ' +
          commonProps.appProps.SUCCESS +
          '  ' +
          data.status +
          ' ' +
          data.body.node_id
      );
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
