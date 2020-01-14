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

const appControl = (function() {
  /**
   * @public
   * @param {*} username
   */
  function getProfileUiEvent(username) {
    let uname = prepareUsername(username);
    getGithubProfile(uname);
  }

  /**
   * @public
   */
  function removeProfileUiEvent() {
    removeProfile();
    toggleControlsVisibility([
      commonProps.elementIds.ID_DIV_INPUT_USERNAME_CONTROLS,
      commonProps.elementIds.ID_DIV_RESET_USERNAME_CONTROLS
    ]);
  }

  /**
   * @public
   */
  function initUiEvent() {
    toggleControlsVisibility([
      commonProps.elementIds.ID_DIV_INPUT_USERNAME_CONTROLS
    ]);
  }
  /**
   * Retrieves the Github user profile for the given username.
   * If the profile does not exist in the cache, a network request is initiated.
   * @param {string} username Github username of the profile to retrieve.
   * @return {undefined}
   */
  function getGithubProfile(uname) {
    if (!uname) {
      respond(
        new userProfile.Data(
          commonProps.appProps.STATUS_USERNAME_IS_EMPTY,
          null
        )
      );
    } else {
      respond(cachedInLocalStorage(uname));
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
    switch (userProfile.status) {
      case commonProps.appProps.STATUS_START_NEW_REQUEST:
        startNetworkRequest(userProfile.body.login);
        break;
      case commonProps.httpStatusCodes.HTTP_STATUS_SUCCESS:
        displayProfile(userProfile);
        break;
      case commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND:
        displayError(commonProps.appProps.MESSAGE_USER_NOT_FOUND);
        break;
      case commonProps.domExceptionIds.NETWORK_EXC_ID:
        displayError(commonProps.domExceptionMessages.MESSAGE_ERROR_NO_NETWORK);
        break;
      case commonProps.domExceptionIds.TIMEOUT_EXC_ID:
        displayError(commonProps.domExceptionMessages.MESSAGE_ERROR_TIME_OUT);
        break;
      case commonProps.domExceptionIds.CANT_COMPLETE_EXC_ID:
        displayError(
          commonProps.domExceptionMessages.MESSAGE_OPERATION_CANT_COMPLETE
        );
        break;
      case commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND:
        displayProfile(userProfile);
        break;
      case commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND:
        startNetworkRequest(userProfile.body.login);
        break;
      case commonProps.appProps.STATUS_USERNAME_IS_EMPTY:
        displayError(commonProps.appProps.MESSAGE_USERNAME_CANNOT_BE_EMPTY);
        break;
      default:
        displayError(
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
    processNetworkResult(result, uname);
  }

  /**
   *
   * @param {object} userProfile desc
   * @param {string} uname desc
   */
  function processNetworkResult(userProfile, uname) {
    respond(userProfile);
  }

  /**
   *
   * @param {string} errorMessage desc
   */
  function displayError(errorMessage) {
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
  function displayProfile(userProfile) {
    toggleControlsVisibility([
      commonProps.elementIds.ID_DIV_INPUT_USERNAME_CONTROLS,
      commonProps.elementIds.ID_DIV_RESET_USERNAME_CONTROLS
    ]);
    appUiHelper.prepareSuccessNodes(userProfile);
    saveToLocalStorage(userProfile);
  }

  /**
   *
   */
  function removeProfile() {
    appUiHelper.removeUserDeetsNodes(commonProps.elementIds.ID_USER_IMAGE, [
      commonProps.elementIds.ID_IMAGE_USER
    ]);

    appUiHelper.removeUserDeetsNodes(commonProps.elementIds.ID_USER_NAME, [
      commonProps.elementIds.ID_HEADING_USERNAME
    ]);

    appUiHelper.removeUserDeetsNodes(commonProps.elementIds.ID_PARENT_WRAPPER, [
      commonProps.elementIds.ID_UL_USER_DEETS
    ]);
  }

  /**
   *
   * @param {*} controls
   */
  function toggleControlsVisibility(controls) {
    appUiHelper.toggleControlsVisibility(controls);
  }

  /**
   *
   * @param {*} uname
   * @return {object}
   */
  function cachedInLocalStorage(uname) {
    let cached = retrieveFromLocalStorage(uname);
    if (
      cached.status ==
      commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND
    ) {
      return new userProfile.Data(
        commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND,
        cached.body
      );
    } else {
      return new userProfile.Data(
        commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND,
        {
          login: uname
        }
      );
    }
  }

  /**
   *
   * @param {string} uname
   * @return {object}
   */
  function retrieveFromLocalStorage(uname) {
    const val = localStorageUtils.retrieveEntry(uname);
    if (val != null) {
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
    localStorageUtils.persistEntry(userProfile.body.login, userProfile.body);
    const userImageNode = document.getElementById(
      commonProps.elementIds.ID_IMAGE_USER
    );
    userImageNode.addEventListener('load', function() {
      localStorageUtils.appendToEntry(
        userProfile.body.login,
        'avatar_url',
        imgUtils.imageToDataURL(userImageNode)
      );
    });
  }

  return {
    initUiEvent: initUiEvent,
    getProfileUiEvent: getProfileUiEvent,
    removeProfileUiEvent: removeProfileUiEvent
  };
})();

export { appControl };
