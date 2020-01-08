import { fetchJsonResource } from './client.js'
import { stringUtils } from './string-utils.js'
import { ulList } from './node-ul-list.js'
import { h1Heading } from './node-h1.js'
import { imgImage } from './node-img.js'
import { removeNode, removeChildNodes } from './remove-node.js'
import { pText } from './p-node.js'
import { toggleViz } from './toggle-viz.js';
import { checkNetwork } from './check-network.js'
import { userProfile } from './user-profile.js'
import { imgUtils } from './img-utils.js'
import { retrieveFromLocalStorage, persistToLocalStorage, retrieveImageFromLocalStorage, persistImageToLocalStorage } from './local-storage-utils.js'

const appProps = {
    MESSAGE_USER_NOT_FOUND: 'Not found!',
    MESSAGE_OPERATION_CANT_COMPLETE: 'Operation could not be completed at this time!',
    MESSAGE_USERNAME_CANNOT_BE_EMPTY: 'Github username cannot be empty!',
    MESSAGE_ERROR_FAILED: 'Operation failed!',
    MESSAGE_ERROR_NO_NETWORK: 'No network!',
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
    STATUS_CANT_COMPLETE_OPERATION: -7000
}

const appConf = {
    LOCAL_STORAGE_CACHE_TIME: 60000
}

export function getGithubProfile(username) {
    var uname = stringUtils.removeIllegalCharacters(username);
    if (usernameIsEmpty(uname)) respond(new userProfile.Data(appProps.STATUS_USERNAME_IS_EMPTY, null))
    var cachedRezponse = cachedInLocalStorage(uname);
    if (cachedRezponse.status == appProps.STATUS_LOCAL_STORAGE_OBJECT_FOUND) { 
        respond(new userProfile.Data(appProps.STATUS_LOCAL_STORAGE_OBJECT_FOUND, cachedRezponse.body))
    } else {
        respond(new userProfile.Data(appProps.STATUS_START_NEW_REQUEST, {login: uname}))
    }
}

function cachedInLocalStorage(uname) {
    return checkLocalStorage(uname);
}

function usernameIsEmpty(uname) {
    return (stringUtils.stringIsEmpty(uname))
}

function respond(rezponseObj) {
    switch(rezponseObj.status) {
        case appProps.STATUS_USERNAME_IS_EMPTY:
            prepareErrorNode(appProps.MESSAGE_USERNAME_CANNOT_BE_EMPTY)
        break
        case appProps.STATUS_LOCAL_STORAGE_OBJECT_FOUND:
            prepareSuccessNodes(rezponseObj)
        break
        case appProps.STATUS_START_NEW_REQUEST:
            startNetworkRequest(rezponseObj.body.login)
        break
        case appProps.STATUS_GITHUB_USER_FOUND:
            prepareSuccessNodes(rezponseObj)
        break
        case appProps.STATUS_GITHUB_USER_NOT_FOUND:
            prepareErrorNode(appProps.MESSAGE_USER_NOT_FOUND)
        break
        case appProps.STATUS_NETWORK_NOT_AVAILABLE:
            prepareErrorNode(appProps.MESSAGE_ERROR_NO_NETWORK)
        break
        case appProps.STATUS_CANT_COMPLETE_OPERATION:
            prepareErrorNode(appProps.MESSAGE_OPERATION_CANT_COMPLETE)
        break
    }
}

function startNetworkRequest(uname) {
    // if (!checkNetwork.hasConnection()) {
    //     processNetworkResult(new Rezponse(appProps.STATUS_NETWORK_NOT_AVAILABLE, null), uname);
    // } else {
       if (checkNetwork.hasNoConnection()) {
           processNetworkResult(new userProfile.Data(appProps.STATUS_NETWORK_NOT_AVAILABLE, null), uname);
       } else {
        var queryURL = appProps.URL_GITHUB_USER_API + uname;
        fetchJsonResource(queryURL).then(function (response) {
            var obj = response
           return processNetworkResult(obj, uname)
        }, function (error) {
            console.error(appProps.MESSAGE_ERROR_FAILED, error);
            if (error.name == 'NetworkError') {
                return processNetworkResult(new userProfile.Data(appProps.STATUS_NETWORK_NOT_AVAILABLE), null)
            } else {
                return processNetworkResult(new userProfile.Data(appProps.STATUS_CANT_COMPLETE_OPERATION), null)
            }
        })
    }
}

function processNetworkResult(rezponseObj, uname) {
    if (rezponseObj.status == 200) {
        respond(new userProfile.Data(appProps.STATUS_GITHUB_USER_FOUND, rezponseObj.body))
    } else if (rezponseObj.status == 404) {
        respond(new userProfile.Data(appProps.STATUS_GITHUB_USER_NOT_FOUND, null))
    } else if (rezponseObj.status == appProps.STATUS_NETWORK_NOT_AVAILABLE) {
        respond(new userProfile.Data(appProps.STATUS_NETWORK_NOT_AVAILABLE, null))
    } else {
        respond(new userProfile.Data(appProps.STATUS_CANT_COMPLETE_OPERATION, null))
    }
}

function prepareErrorNode(errorMessage) {
    removeNode(appProps.ID_PARENT_WRAPPER, appProps.ID_NODE_ERROR_NODE)
    pText(appProps.ID_PARENT_WRAPPER, { 'id': appProps.ID_NODE_ERROR_NODE }, errorMessage)
}

function prepareSuccessNodes(rezponseObj) {
    toggleControlsVisibility()
    removeNode(appProps.ID_PARENT_WRAPPER, appProps.ID_NODE_ERROR_NODE)
    h1Heading(appProps.ID_PARENT_WRAPPER, { 'id': appProps.ID_HEADING_USERNAME }, rezponseObj.body.login)
    ulList(rezponseObj.body, { 'id': appProps.ID_UL_USER_DEETS }, appProps.ID_PARENT_WRAPPER)
    imgImage(appProps.ID_PARENT_WRAPPER, { 'id': appProps.ID_IMAGE_USER, 'crossorigin': 'anonymous' }, rezponseObj.body.avatar_url)
    saveToLocalStorage(rezponseObj)
}

// TODO: Smelly.
export function removeUserDeetsNodes() {
    removeChildNodes(appProps.ID_PARENT_WRAPPER, [appProps.ID_HEADING_USERNAME, appProps.ID_UL_USER_DEETS, appProps.ID_IMAGE_USER])
}

export function toggleControlsVisibility() {
    toggleViz.toggleDisplayControls([appProps.ID_DIV_INPUT_USERNAME_CONTROLS, appProps.ID_DIV_RESET_USERNAME_CONTROLS])
}

export function toggleControlVisibility(elementId) {
    toggleViz.toggleDisplay(elementId);
}

function checkLocalStorage(uname) {
    var val = retrieveFromLocalStorage(uname);
    if (val != null) {
        val.avatar_url = retrieveImageFromLocalStorage(`${val.login}_imageData`)
        return new userProfile.Data(appProps.STATUS_LOCAL_STORAGE_OBJECT_FOUND, val);
    } else {
        return new userProfile.Data(appProps.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND, null)
    }
}

function saveToLocalStorage(rezponseObj) {
    persistToLocalStorage(rezponseObj.body.login, rezponseObj.body)
    var userImageNode = document.getElementById(appProps.ID_IMAGE_USER);
    userImageNode.addEventListener('load', function () {
        persistImageToLocalStorage(`${rezponseObj.body.login}_imageData`, imgUtils.imageToDataURL(userImageNode))
    })
}

/** TODO: Would you like to see a cached result? */



