'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { requestAPI } from './network/network-control.js';
import { stringUtils } from './utils/string-utils.js';
import { ulList } from './element-utils/ul-node-utils.js';
import { h1Heading } from './element-utils/heading-node-utils.js';
import { imgImage } from './element-utils/image-node-utils.js';
import { removeNode, removeChildNodes } from './element-utils/remove-node-utils.js';
import { pText } from './element-utils/p-node-utils.js';
import { toggleViz } from './element-utils/toggle-viz.js';
import { userProfile } from './user/user-profile.js';
import { imgUtils } from './image-utils/image-utils.js';
import {
  retrieveFromLocalStorage,
  persistToLocalStorage,
  retrieveImageFromLocalStorage,
  persistImageToLocalStorage
} from './local-storage/local-storage-utils.js';
import { commonProps } from './common-props.js';

/**
 *
 * @param {*} username desc
 */
export function getGithubProfile(username) {
  let uname = prepareUsername(username);
  if (!uname) {
    respond(
      new userProfile.Data(commonProps.appProps.STATUS_USERNAME_IS_EMPTY, null)
    );
  } else if (
    checkLocalStorage(uname).status ==
    commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND
  ) {
    respond(
      new userProfile.Data(
        commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND,
        checkLocalStorage(uname).body
      )
    );
  } else {
    respond(
      new userProfile.Data(commonProps.appProps.STATUS_START_NEW_REQUEST, {
        login: uname
      })
    );
  }
}

/**
 *
 * @param {string} username desc.
 * @return {boolean} Cleansed username or else false if the string length is 0.
 */
function prepareUsername(username) {
  const uname = stringUtils.removeIllegalCharacters(username);
  return stringUtils.stringIsEmpty(uname) ? false : uname;
}

/**
 *
 * @param {object} userProfile desc
 */
function respond(userProfile) {
  console.log('respond: ' + userProfile.status);

  switch (userProfile.status) {
    case commonProps.appProps.STATUS_START_NEW_REQUEST:
      startNetworkRequest(userProfile.body.login);
      break;
    case commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS:
      prepareSuccessNodes(userProfile);
      break;
    case commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND:
      prepareErrorNode(commonProps.appProps.MESSAGE_USER_NOT_FOUND);
      break;
    case commonProps.domExceptionIds.NETWORK_EXC_ID:
      prepareErrorNode(commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK);
      break;
      case commonProps.domExceptionIds.TIMEOUT_EXC_ID:
      prepareErrorNode(commonProps.domExceptionMessages.MESSAGE_ERROR_TIME_OUT);
      break;
    case commonProps.domExceptionIds.CANT_COMPLETE_EXC_ID:
      prepareErrorNode(commonProps.domExceptionMessages.MESSAGE_OPERATION_CANT_COMPLETE);
      break;
    case commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND:
      prepareSuccessNodes(userProfile);
      break;
    case commonProps.appProps.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND:
      prepareSuccessNodes(userProfile);
      break;
    case commonProps.appProps.STATUS_USERNAME_IS_EMPTY:
      prepareErrorNode(commonProps.appProps.MESSAGE_USERNAME_CANNOT_BE_EMPTY);
      break;
    default:
      prepareErrorNode(commonProps.domExceptionMessages.MESSAGE_OPERATION_CANT_COMPLETE);
      break;
  }
}

/**
 *
 * @param {string} uname desc
 */
async function startNetworkRequest(uname) {
  const queryURL = commonProps.appProps.URL_GITHUB_USER_API + uname;
  const result = await requestAPI(queryURL);
  console.log('startNetworkRequest: ' + result.status);
  processNetworkResult(result, uname);
}

/**
 *
 * @param {object} userProfile desc
 * @param {string} uname desc
 */
function processNetworkResult(userProfile, uname) {
  console.log('processNetworkResult: ' + userProfile.status);
  respond(userProfile);
}

/**
 *
 * @param {string} errorMessage desc
 */
function prepareErrorNode(errorMessage) {
  removeNode(
    commonProps.elementIds.ID_PARENT_WRAPPER,
    commonProps.elementIds.ID_NODE_ERROR_NODE
  );
  pText(
    commonProps.elementIds.ID_PARENT_WRAPPER,
    { id: commonProps.elementIds.ID_NODE_ERROR_NODE },
    errorMessage
  );
}

/**
 *
 * @param {object} userProfile
 */
function prepareSuccessNodes(userProfile) {
  toggleControlsVisibility();
  removeNode(
    commonProps.elementIds.ID_PARENT_WRAPPER,
    commonProps.elementIds.ID_NODE_ERROR_NODE
  );
  h1Heading(
    commonProps.elementIds.ID_PARENT_WRAPPER,
    { id: commonProps.elementIds.ID_HEADING_USERNAME },
    userProfile.body.login
  );
  ulList(
    userProfile.body,
    { id: commonProps.elementIds.ID_UL_USER_DEETS },
    commonProps.elementIds.ID_PARENT_WRAPPER
  );
  imgImage(
    commonProps.elementIds.ID_PARENT_WRAPPER,
    { id: commonProps.elementIds.ID_IMAGE_USER, crossorigin: 'anonymous' },
    userProfile.body.avatar_url
  );
  saveToLocalStorage(userProfile);
}

/** TODO: Smelly. */
export function removeUserDeetsNodes() {
  removeChildNodes(commonProps.elementIds.ID_PARENT_WRAPPER, [
    commonProps.elementIds.ID_HEADING_USERNAME,
    commonProps.elementIds.ID_UL_USER_DEETS,
    commonProps.elementIds.ID_IMAGE_USER
  ]);
}

/**
 *
 */
export function toggleControlsVisibility() {
  toggleViz.toggleDisplayControls([
    commonProps.elementIds.ID_DIV_INPUT_USERNAME_CONTROLS,
    commonProps.elementIds.ID_DIV_RESET_USERNAME_CONTROLS
  ]);
}

/**
 *
 * @param {string} elementId
 */
export function toggleControlVisibility(elementId) {
  toggleViz.toggleDisplay(elementId);
}

/**
 *
 * @param {string} uname
 * @return {object}
 */
function checkLocalStorage(uname) {
  const val = retrieveFromLocalStorage(uname);
  if (val != null) {
    val.avatar_url = retrieveImageFromLocalStorage(`${val.login}_imageData`);
    return new userProfile.Data(
      commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND,
      val
    );
  } else {
    return new userProfile.Data(
      commonProps.appProps.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND,
      null
    );
  }
}

/**
 *
 * @param {object} userProfile
 */
function saveToLocalStorage(userProfile) {
  persistToLocalStorage(userProfile.body.login, userProfile.body);
  const userImageNode = document.getElementById(
    commonProps.elementIds.ID_IMAGE_USER
  );
  userImageNode.addEventListener('load', function() {
    persistImageToLocalStorage(
      `${userProfile.body.login}_imageData`,
      imgUtils.imageToDataURL(userImageNode)
    );
  });
}

/** TODO: Would you like to see a cached result? */
