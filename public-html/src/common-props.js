'use strict';

const commonProps = (() => {
  const elementIds = {
    ID_PARENT_WRAPPER: 'github-user-wrapper',
    ID_NODE_ERROR_NODE: 'error-node',
    ID_HEADING_USERNAME: 'h1-username',
    ID_IMAGE_USER: 'img-user',
    ID_USER_HEADER: 'user-deets-header',
    ID_USER_IMAGE: 'uimg',
    ID_USER_NAME: 'uname',
    ID_DIV_INPUT_USERNAME_CONTROLS: 'input-username-controls',
    ID_DIV_RESET_USERNAME_CONTROLS: 'reset-username-controls',
    ID_PROFILE_FEATURE_SECTION: 'profile-feature',
    ID_PROFILE_DISPLAY_SECTION: 'profile-display',
    ID_PROFILE_WRAPPER: 'profile-wrapper',
    ID_PROFILE_DISPLAY_IMAGE: 'profile-image',
    ID_PROFILE_DISPLAY_IMAGE_IMG: 'pimage',
    ID_PROFILE_DISPLAY_USERNAME_H2: 'pusername',
    ID_PROFILE_DATA: 'profile-data',
    ID_UL_USER_DEETS: 'ul-user-deets',
  };

  const httpStatusCodes = {
    HTTP_STATUS_SUCCESS: 200,
    HTTP_STATUS_NOT_FOUND: 404,
  };

  const domExceptionNames = {
    ERROR_NAME_NO_NETWORK_ERROR: 'NetworkError',
    ERROR_NAME_TIME_OUT_ERROR: 'TimeoutError',
  };

  const domExceptionIds = {
    NETWORK_EXC_ID: 1007,
    TIMEOUT_EXC_ID: 1006,
    CANT_COMPLETE_EXC_ID: 1005,
  };

  const domExceptionMessages = {
    MESSAGE_ERROR_NO_NETWORK: 'No network!',
    MESSAGE_ERROR_TIME_OUT: 'Timeout!',
    MESSAGE_OPERATION_CANT_COMPLETE:
      'Operation could not be completed at this time!',
  };

  const localStorageStatus = {
    STATUS_LOCAL_STORAGE_OBJECT_FOUND: 1004,
    STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND: 1003,
  };

  const localStorageConfig = {
    CACHE_EXPIRY_SECONDS: 1,
  };

  const appProps = {
    MESSAGE_USERNAME_CANNOT_BE_EMPTY: 'Github username cannot be empty!',
    MESSAGE_USER_NOT_FOUND: 'User not found!',
    URL_GITHUB_USER_API: 'https://api.github.com/users/',
    STATUS_USERNAME_IS_EMPTY: 1002,
    STATUS_START_NEW_REQUEST: 1001,
  };

  return {
    appProps: appProps,
    elementIds: elementIds,
    httpStatusCodes: httpStatusCodes,
    domExceptionNames: domExceptionNames,
    domExceptionIds: domExceptionIds,
    localStorageStatus: localStorageStatus,
    domExceptionMessages: domExceptionMessages,
    localStorageConfig: localStorageConfig,
  };
})();

export {commonProps};
