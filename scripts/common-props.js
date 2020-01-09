'use strict';

const commonProps = (function() {
  const appProps = {
    MESSAGE_USER_NOT_FOUND: 'Not found!',
    MESSAGE_OPERATION_CANT_COMPLETE:
      'Operation could not be completed at this time!',
    MESSAGE_USERNAME_CANNOT_BE_EMPTY: 'Github username cannot be empty!',
    MESSAGE_ERROR_FAILED: 'Operation failed!',
    MESSAGE_ERROR_NO_NETWORK: 'No network!',
    MESSAGE_TIME_OUT: 'Timeout!',
    URL_GITHUB_USER_API: 'https://api.github.com/users/',
    ID_PARENT_WRAPPER: 'github-user-wrapper',
    ID_NODE_ERROR_NODE: 'error-node',
    ID_HEADING_USERNAME: 'h1-username',
    ID_IMAGE_USER: 'img-user',
    ID_UL_USER_DEETS: 'ul-user-deets',
    ID_DIV_INPUT_USERNAME_CONTROLS: 'input-username-controls',
    ID_DIV_RESET_USERNAME_CONTROLS: 'reset-username-controls',
    STATUS_LOCAL_STORAGE_OBJECT_FOUND: 2000,
    STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND: -1000,
    STATUS_NETWORK_NOT_AVAILABLE: -3000,
    STATUS_USERNAME_IS_EMPTY: -4000,
    STATUS_START_NEW_REQUEST: 7000,
    STATUS_GITHUB_USER_NOT_FOUND: -5000,
    STATUS_GITHUB_USER_FOUND: 8000,
    STATUS_CANT_COMPLETE_OPERATION: -7000,
    STATUS_TIMEOUT: -9000,
    SUCCESS: 200,
    NOT_FOUND: 404,
    NETWORK_ERROR: -8000,
    ERROR_NAME_NO_NETWORK: 'NetworkError',
    TIME_OUT_ERROR: 'TimeoutError'
  };

  return {
    appProps: appProps
  };
})();

export { commonProps };
