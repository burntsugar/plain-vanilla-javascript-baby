import { fetchJsonResource } from './client.js'
import { stringIsEmpty, cleanString } from './string-utils.js'
import { ulList } from './node-ul-list.js'
import { h1Heading } from './node-h1.js'
import { imgImage } from './node-img.js'
import { removeNode, removeChildNodes } from './remove-node.js'
import { pText } from './p-node.js'
import { toggleDisplayControls } from './toggle-viz.js'
import { hasConnection } from './check-network.js'
import { Rezponse } from './rezponse.js'


const appVars = {
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
    LOCAL_STORAGE_CACHE_TIME: 60000,
    STATUS_LOCAL_STORAGE_OBJECT_FOUND: 2000,
    STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND: -1000,
    STATUS_LOCAL_STORAGE_OBJECT_EXPIRED: -2000,
    STATUS_NETWORK_NOT_AVAILABLE: -3000,
    STATUS_USERNAME_IS_EMPTY: -4000,
    STATUS_START_NEW_REQUEST: 7000,
    STATUS_GITHUB_USER_NOT_FOUND: -5000,
    STATUS_GITHUB_USER_FOUND: 8000,
    STATUS_CANT_COMPLETE_OPERATION: -7000
}

export function getGithubProfile(username) {
    var uname = cleanString(username);
    if (usernameIsEmpty(uname)) respond(new Rezponse(appVars.STATUS_USERNAME_IS_EMPTY, null))
    var cachedRezponse = cachedInLocalStorage(uname);
    if (cachedRezponse.status == appVars.STATUS_LOCAL_STORAGE_OBJECT_FOUND) { 
        respond(new Rezponse(appVars.STATUS_LOCAL_STORAGE_OBJECT_FOUND, cachedRezponse.body))
    } else {
        respond(new Rezponse(appVars.STATUS_START_NEW_REQUEST, {login: uname}))
    }
}

function cachedInLocalStorage(uname) {
    return checkLocalStorage(uname);
}

function usernameIsEmpty(uname) {
    return (stringIsEmpty(uname))
}

function respond(rezponseObj) {
    switch(rezponseObj.status) {
        case appVars.STATUS_USERNAME_IS_EMPTY:
            prepareErrorNode(appVars.MESSAGE_USERNAME_CANNOT_BE_EMPTY)
        break
        case appVars.STATUS_LOCAL_STORAGE_OBJECT_FOUND:
            prepareSuccessNodes(rezponseObj)
        break
        case appVars.STATUS_START_NEW_REQUEST:
            startNetworkRequest(rezponseObj.body.login)
        break
        case appVars.STATUS_GITHUB_USER_FOUND:
            prepareSuccessNodes(rezponseObj)
        break
        case appVars.STATUS_GITHUB_USER_NOT_FOUND:
            prepareErrorNode(appVars.MESSAGE_USER_NOT_FOUND)
        break
        case appVars.STATUS_NETWORK_NOT_AVAILABLE:
            prepareErrorNode(appVars.MESSAGE_ERROR_NO_NETWORK)
        break
        case appVars.STATUS_CANT_COMPLETE_OPERATION:
            prepareErrorNode(appVars.MESSAGE_OPERATION_CANT_COMPLETE)
        break
    }
}

function startNetworkRequest(uname) {
    if (!hasConnection()) {
        processNetworkResult(new Rezponse(appVars.STATUS_NETWORK_NOT_AVAILABLE, null), uname);
    } else {
        var queryURL = appVars.URL_GITHUB_USER_API + uname;
        fetchJsonResource(queryURL).then(function (response) {
            var obj = response
           return processNetworkResult(obj, uname)
        }, function (error) {
            console.error(appVars.MESSAGE_ERROR_FAILED, error);
            if (error.name == 'NetworkError') {
                return processNetworkResult(new Rezponse(appVars.STATUS_NETWORK_NOT_AVAILABLE), null)
            } else {
                return processNetworkResult(new Rezponse(appVars.STATUS_CANT_COMPLETE_OPERATION), null)
            }
        })
    }
}

function processNetworkResult(rezponseObj, uname) {
    if (rezponseObj.status == 200) {
        respond(new Rezponse(appVars.STATUS_GITHUB_USER_FOUND, rezponseObj.body))
    } else if (rezponseObj.status == 404) {
        respond(new Rezponse(appVars.STATUS_GITHUB_USER_NOT_FOUND, null))
    } else if (rezponseObj.status == appVars.STATUS_NETWORK_NOT_AVAILABLE) {
        respond(new Rezponse(appVars.STATUS_NETWORK_NOT_AVAILABLE, null))
    } else {
        respond(new Rezponse(appVars.STATUS_CANT_COMPLETE_OPERATION, null))
    }
}

function prepareErrorNode(errorMessage) {
    removeNode(appVars.ID_PARENT_WRAPPER, appVars.ID_NODE_ERROR_NODE)
    pText(appVars.ID_PARENT_WRAPPER, { 'id': appVars.ID_NODE_ERROR_NODE }, errorMessage)
}

function prepareSuccessNodes(rezponseObj) {
    toggleControlVisibility()
    removeNode(appVars.ID_PARENT_WRAPPER, appVars.ID_NODE_ERROR_NODE)
    h1Heading(appVars.ID_PARENT_WRAPPER, { 'id': appVars.ID_HEADING_USERNAME }, rezponseObj.body.login)
    ulList(rezponseObj.body, { 'id': appVars.ID_UL_USER_DEETS }, appVars.ID_PARENT_WRAPPER)
    imgImage(appVars.ID_PARENT_WRAPPER, { 'id': appVars.ID_IMAGE_USER, 'crossorigin': 'anonymous' }, rezponseObj.body.avatar_url)
    saveToLocalStorage(rezponseObj)
}

// TODO: Smelly.
export function removeUserDeetsNodes() {
    removeChildNodes(appVars.ID_PARENT_WRAPPER, [appVars.ID_HEADING_USERNAME, appVars.ID_UL_USER_DEETS, appVars.ID_IMAGE_USER])
}

export function toggleControlVisibility() {
    toggleDisplayControls([appVars.ID_DIV_INPUT_USERNAME_CONTROLS, appVars.ID_DIV_RESET_USERNAME_CONTROLS])
}

function checkLocalStorage(uname) {
    var val = JSON.parse(window.localStorage.getItem(uname));
    if (val != null) {
        var tsDate = new Date(val.timestamp);
        var nDate = new Date();
        if (nDate - tsDate <= appVars.LOCAL_STORAGE_CACHE_TIME) {
            val.value.local_storage_time = tsDate;
            val.value.avatar_url = window.localStorage.getItem(`${val.value.login}_imageData`)
            return new Rezponse(appVars.STATUS_LOCAL_STORAGE_OBJECT_FOUND, val.value)
        } else {
            return new Rezponse(appVars.STATUS_LOCAL_STORAGE_OBJECT_EXPIRED, null)
        }
    } else {
        return new Rezponse(appVars.STATUS_LOCAL_STORAGE_OBJECT_NOT_FOUND, null)
    }
}

function shouldCache(uname){
    var val = JSON.parse(window.localStorage.getItem(uname));
    if (val != null) {
        var tsDate = new Date(val.timestamp);
        var nDate = new Date();
        tsDate.setMinutes(tsDate.getMinutes() + 1)
        return nDate > tsDate ? true : false
    } 
    return true;
}

function saveToLocalStorage(rezponseObj) {
    if (!shouldCache(rezponseObj.body.login)) return
 
    var object = { value: rezponseObj.body, timestamp: new Date().getTime() }
    window.localStorage.setItem(rezponseObj.body.login, JSON.stringify(object));
    cacheImage(rezponseObj.body.login)
}

function cacheImage(uname) {
    var userImageNode = document.getElementById(appVars.ID_IMAGE_USER);
    userImageNode.addEventListener('load', function () {
        var imgData = getBase64Image(userImageNode);
        window.localStorage.setItem(`${uname}_imageData`, imgData)
    })
}

// TODO: Place in own file.
function getBase64Image(imgNode) {
    var canvas = document.createElement('canvas');
    canvas.width = imgNode.width;
    canvas.height = imgNode.height;
    var context = canvas.getContext('2d');
    context.drawImage(imgNode, 0, 0, imgNode.width, imgNode.height)
    var dataURL = canvas.toDataURL('image/png');
    return dataURL
}

// TODO: makeItPretty
function makeItPretty() {
    console.log('TODO')
}



