'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides controller functionality for index.html.
 * - retrieve and display Github profile
 * - append and remove DOM elements
 */

import {networkControl} from './network/network-control.js';
import {stringUtils} from './utils/string-utils.js';
import {userProfile} from './user/user-profile.js';
import {imgUtils} from './image-utils/image-utils.js';
import {localStorageUtils} from './local-storage/local-storage-utils.js';
import {commonProps} from './common-props.js';
import {appUiHelper} from './ui-helper/app-ui-helper.js';

const appControl = (() => {
  /**
   * Retrieve the Github profile of the given username and
   * append nodes to the document which contain the profile.
   * The profile is then persisted to local storage if
   * it meets (localStorageUtils} caching policy.
   * Local storage is always queried initially for a matching
   * profile which meets (localStorageUtils} caching policy.
   * An error message node is appended to the document if the
   * profile cannot be displayed when either:
   * - username is empty,
   * - given username cannot be found at Github,
   * - network errors.
   * @public
   * @param {string} username for which to retrieve a Github profile.
   */
  const getProfileUiEvent = (username) => {
    const uname = prepareUsername(username);
    getGithubProfile(uname);
  };

  /**
   * Hide profile display nodes in the document, and show controls.
   * @public
   */
  const removeProfileUiEvent = () => {
    toggleControlsVisibility([
      commonProps.elementIds.ID_PROFILE_DISPLAY_SECTION,
      commonProps.elementIds.ID_PROFILE_FEATURE_SECTION,
    ]);
  };

  /**
   * Initialise the visibility of the UI.
   * @public
   * @return {undefined}
   */
  const initUiEvent = () =>
    void toggleControlsVisibility([
      commonProps.elementIds.ID_PROFILE_FEATURE_SECTION,
    ]);

  /**
   * Retrieves the Github user profile for the given username.
   * If the profile does not exist in the cache, a network request is initiated.
   * @param {string} uname Github username of the profile to retrieve.
   * @return {undefined}
   */
  const getGithubProfile = (uname) => {
    if (!uname) {
      respond(
        new userProfile.Data(
          commonProps.appProps.STATUS_USERNAME_IS_EMPTY,
          null,
        ),
      );
    } else {
      respond(cachedInLocalStorage(uname));
    }
  };

  /**
   * The given username has all illegal characters removed.
   * The username is returned, or false if it is empty,
   * @param {string} username to prepare.
   * @return {boolean} Cleansed username or else false,
   * if the string length is 0.
   */
  const prepareUsername = (username) => {
    const uname = stringUtils.removeIllegalCharacters(username);
    return stringUtils.stringIsEmpty(uname) ? false : uname;
  };

  /**
   * Occurs either after a query to local storage, or after a network request.
   * Examines the object's status property to determine whether to:
   * - start a network request,
   * - display the contents of the body property,
   * - display an error.
   * @param {object} userProfile instance of userProfile.Data
   */
  const respond = (userProfile) => {
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
        commonProps.domExceptionMessages.MESSAGE_OPERATION_CANT_COMPLETE);
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
        commonProps.domExceptionMessages.MESSAGE_OPERATION_CANT_COMPLETE);
      break;
    }
  };

  /**
   * Starts async network request for the profile belonging to the given
   * username at Github. The result is processed.
   * @param {string} uname the given username.
   */
  const startNetworkRequest = async (uname) => {
    const queryURL = commonProps.appProps.URL_GITHUB_USER_API + uname;
    const result = await networkControl.requestAPI(queryURL);
    processNetworkResult(result, uname);
  };

  /**
   * Occurs upon completion of async network request.
   * @param {object} userProfile the resulting instance of userProfile.Data
   * @param {string} uname the username in the request
   * @return {undefined}
   */
  const processNetworkResult = (userProfile, uname) =>
    void respond(userProfile);

  /**
   * Appends error message nodes to the document.
   * @param {string} errorMessage the error message to be displayed.
   * @return {undefined}
   */
  const displayError = (errorMessage) => {
    // TODO: Refactor
    document.getElementById('app-error-message').innerHTML = errorMessage;
    document.getElementById('successfulSave').classList.remove('hidden');
  };

  /**
   * Appends profile nodes to the document.
   * @param {object} userProfile the instance of userProfile.Data
   * to be displayed
   */
  const displayProfile = (userProfile) => {
    toggleControlsVisibility([
      commonProps.elementIds.ID_PROFILE_FEATURE_SECTION,
      commonProps.elementIds.ID_PROFILE_DISPLAY_SECTION,
    ]);
    appUiHelper.prepareSuccessNodes(userProfile);
    saveToLocalStorage(userProfile);
  };

  // /**
  //  * Remove profile nodes from the document.
  //  */
  // const removeProfile = () => {
  //   appUiHelper.removeUserDeetsNodes(commonProps.elementIds.ID_USER_IMAGE, [
  //     commonProps.elementIds.ID_IMAGE_USER,
  //   ]);

  //   appUiHelper.removeUserDeetsNodes(commonProps.elementIds.ID_USER_NAME, [
  //     commonProps.elementIds.ID_HEADING_USERNAME,
  //   ]);

  //   appUiHelper.removeUserDeetsNodes(commonProps.elementIds.ID_PARENT_WRAPPER, [
  //     commonProps.elementIds.ID_UL_USER_DEETS,
  //   ]);
  // };

  /**
   * Toggle the visibility of document elements.
   * @param {string[]} controlIds of the document elements to be hidden or shown
   * in the toggle.
   * @return {undefined}
   */
  const toggleControlsVisibility = (controlIds) =>
    void appUiHelper.toggleControlsVisibility(controlIds);

  /**
   * Query the local storage for a given username key.
   * @param {string} unameKey
   * @return {object} instance of userProfile.Data
   */
  const cachedInLocalStorage = (unameKey) => {
    const cached = retrieveFromLocalStorage(unameKey);
    if (
      cached.status ==
      commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND
    ) {
      return new userProfile.Data(
        commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND,
        cached.body,
      );
    } else {
      return new userProfile.Data(
        commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND,
        {
          login: unameKey,
        },
      );
    }
  };

  /**
   * Query the local storage for a valid entry matching the given username key.
   * @param {string} unameKey the key to find
   * @return {object} instance of userProfile.Data
   */
  const retrieveFromLocalStorage = (unameKey) => {
    const val = localStorageUtils.retrieveEntry(unameKey);
    if (val != null) {
      return new userProfile.Data(
        commonProps.localStorageStatus.STATUS_LOCAL_STORAGE_OBJECT_FOUND,
        val,
      );
    } else {
      return new userProfile.Data(
        commonProps.appProps.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND,
        null,
      );
    }
  };

  /**
   * Save profile data to local storage.
   * @param {object} userProfile
   */
  const saveToLocalStorage = (userProfile) => {
    localStorageUtils.persistEntry(userProfile.body.login, userProfile.body);
    const userImageNode = document.getElementById(
      commonProps.elementIds.ID_PROFILE_DISPLAY_IMAGE_IMG,
    );
    userImageNode.addEventListener('load', function() {
      localStorageUtils.appendToEntry(
        userProfile.body.login,
        'avatar_url',
        imgUtils.imageToDataURL(userImageNode),
      );
    });
  };

  return {
    initUiEvent: initUiEvent,
    getProfileUiEvent: getProfileUiEvent,
    removeProfileUiEvent: removeProfileUiEvent,
  };
})();

export {appControl};
