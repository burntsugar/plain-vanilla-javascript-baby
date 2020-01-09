'use strict';

const commonProps = (function() {

  const elementIds = {
    ID_PARENT_WRAPPER: 'github-user-wrapper',
    ID_NODE_ERROR_NODE: 'error-node',
    ID_HEADING_USERNAME: 'h1-username',
    ID_IMAGE_USER: 'img-user',
    ID_UL_USER_DEETS: 'ul-user-deets',
    ID_DIV_INPUT_USERNAME_CONTROLS: 'input-username-controls',
    ID_DIV_RESET_USERNAME_CONTROLS: 'reset-username-controls',
  }

  const httpStatusCodes = {
    HTTP_STATUS_SUCCESS: 200,
    HTTP_STATUS_NOT_FOUND: 404,
  }

  const domExceptionNames = {
    ERROR_NAME_NO_NETWORK_ERROR: 'NetworkError',
    ERROR_NAME_TIME_OUT_ERROR: 'TimeoutError',
  }

  const domExceptionIds = {
    NETWORK_ERROR: -8000,
    STATUS_TIMEOUT: -9000,
    STATUS_CANT_COMPLETE_OPERATION: -7000,
  }

  const domExceptionMessages = {
    MESSAGE_ERROR_NO_NETWORK: 'No network!',
    MESSAGE_ERROR_TIME_OUT: 'Timeout!',
    MESSAGE_OPERATION_CANT_COMPLETE:
      'Operation could not be completed at this time!',
  }

  const localStorageStatus = {
    STATUS_LOCAL_STORAGE_OBJECT_FOUND: 2000,
    STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND: -1000,
  }

  const appProps = {
    MESSAGE_USERNAME_CANNOT_BE_EMPTY: 'Github username cannot be empty!',
    URL_GITHUB_USER_API: 'https://api.github.com/users/',
    STATUS_USERNAME_IS_EMPTY: -4000,
    STATUS_START_NEW_REQUEST: 7000,
  };

  return {
    appProps: appProps,
    elementIds: elementIds,
    httpStatusCodes: httpStatusCodes,
    domExceptionNames: domExceptionNames,
    domExceptionIds: domExceptionIds,
    localStorageStatus: localStorageStatus,
    domExceptionMessages: domExceptionMessages,
  };
})();

export { commonProps };
