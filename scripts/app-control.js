'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { requestAPI } from './network/network-control.js';
import { stringUtils } from './utils/string-utils.js';
import { userProfile } from './user/user-profile.js';
import { imgUtils } from './image-utils/image-utils.js';
import { localStorageUtils } from './local-storage/local-storage-utils.js';
import { commonProps } from './common-props.js';
import { appUiHelper } from './ui-helper/app-ui-helper.js';

/**
 * @public
 * Retrieves the Github user profile for the given username.
 * The username is initial cleansed and then if the profile does not exist in the cache, a network request is initiated.
 * @param {string} username Github username of the profile to retrieve.
 * @return {undefined}
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
 * The given username has all illegal characters removed. The username is returned, or false if it is empty,
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
      prepareErrorNode(
        commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK
      );
      break;
    case commonProps.domExceptionIds.TIMEOUT_EXC_ID:
      prepareErrorNode(commonProps.domExceptionMessages.MESSAGE_ERROR_TIME_OUT);
      break;
    case commonProps.domExceptionIds.CANT_COMPLETE_EXC_ID:
      prepareErrorNode(
        commonProps.domExceptionMessages.MESSAGE_OPERATION_CANT_COMPLETE
      );
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
      prepareErrorNode(
        commonProps.domExceptionMessages.MESSAGE_OPERATION_CANT_COMPLETE
      );
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
  console.log('prepareErrorNode: ' + errorMessage);
  appUiHelper.prepareErrorNode(
    commonProps.elementIds.ID_PARENT_WRAPPER,
    commonProps.elementIds.ID_NODE_ERROR_NODE,
    errorMessage
  );
}

/**
 *
 * @param {object} userProfile
 */
function prepareSuccessNodes(userProfile) {
  toggleControlsVisibility();
  appUiHelper.prepareSuccessNodes(userProfile);
  saveToLocalStorage(userProfile);
}

export function removeUserDeetsNodes() {
  appUiHelper.removeUserDeetsNodes(commonProps.elementIds.ID_PARENT_WRAPPER, [
    commonProps.elementIds.ID_HEADING_USERNAME,
    commonProps.elementIds.ID_UL_USER_DEETS,
    commonProps.elementIds.ID_IMAGE_USER
  ]);
}

/**
 *
 */
export function toggleControlsVisibility() {
  appUiHelper.toggleControlsVisibility([
    commonProps.elementIds.ID_DIV_INPUT_USERNAME_CONTROLS,
    commonProps.elementIds.ID_DIV_RESET_USERNAME_CONTROLS
  ]);
}

/**
 *
 * @param {string} elementId
 */
export function toggleControlVisibility(elementId) {
  appUiHelper.toggleControlVisibility(elementId);
}

/**
 *
 * @param {string} uname
 * @return {object}
 */
function checkLocalStorage(uname) {
  const val = localStorageUtils.retrieveFromLocalStorage(uname);
  if (val != null) {
    val.avatar_url = localStorageUtils.retrieveImageFromLocalStorage(
      `${val.login}_imageData`
    );
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
  localStorageUtils.persistToLocalStorage(
    userProfile.body.login,
    userProfile.body
  );
  const userImageNode = document.getElementById(
    commonProps.elementIds.ID_IMAGE_USER
  );
  userImageNode.addEventListener('load', function() {
    localStorageUtils.persistImageToLocalStorage(
      `${userProfile.body.login}_imageData`,
      imgUtils.imageToDataURL(userImageNode)
    );
  });
}

/** TODO: Would you like to see a cached result? */
