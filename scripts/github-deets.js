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
    PARENT_WRAPPER_ID: 'github-user-wrapper',
    MESSAGE_USER_NOT_FOUND: 'not found!',
    MESSAGE_OPERATION_CANT_COMPLETE: 'Operation could not be completed at this time!',
    MESSAGE_USERNAME_CANNOT_BE_EMPTY: 'Github username cannot be empty!',
    ERROR_FAILED: 'Operation failed!',
    ERROR_NO_NETWORK: 'No network!',
    URL_GITHUB_USER_API: 'https://api.github.com/users/',
    NODE_ERROR_NODE_ID: 'error-node',
    HEADING_USERNAME_ID: 'h1-username',
    IMAGE_USER_ID: 'img-user',
    UL_USER_DEETS_ID: 'ul-user-deets',
    DIV_INPUT_USERNAME_CONTROLS_ID: 'input-username-controls',
    DIV_RESET_USERNAME_CONTROLS_ID: 'reset-username-controls',
    LOCAL_STORAGE_CACHE_TIME: 60000,
    LOCAL_STORAGE_OBJECT_FOUND_STATUS: 2000,
    LOCAL_STORAGE_OBJECT_NOT_FOUND_STATUS: -1000,
    LOCAL_STORAGE_OBJECT_EXPIRED_STATUS: -2000,
    NETWORK_NOT_AVAILABLE_STATUS: -3000,
    USERNAME_IS_EMPTY_STATUS: -4000,
    START_NEW_REQUEST: 7000,
    GITHUB_USER_NOT_FOUND_STATUS: -5000,
    GITHUB_USER_FOUND_STATUS: 8000,
    CANT_COMPLETE_OPERATION_STATUS: -7000
}

export function getGithubProfile(username) {
    var uname = cleanString(username);
    if (usernameIsEmpty(uname)) respond(new Rezponse(appVars.USERNAME_IS_EMPTY_STATUS, null))
    var cachedRezponse = cachedInLocalStorage(uname);
    if (cachedRezponse.status == appVars.LOCAL_STORAGE_OBJECT_FOUND_STATUS) { 
        respond(new Rezponse(appVars.LOCAL_STORAGE_OBJECT_FOUND_STATUS, cachedRezponse.body))
    } else {
        respond(new Rezponse(appVars.START_NEW_REQUEST, {login: uname}))
    }
}

function cachedInLocalStorage(username) {
    return checkLocalStorage(username);
}

function usernameIsEmpty(username) {
    return (stringIsEmpty(username))
}

function respond(obj) {
    console.log('obj.status: ' + obj.status)
    switch(obj.status) {
        case appVars.USERNAME_IS_EMPTY_STATUS:
            prepareErrorNode(appVars.MESSAGE_USERNAME_CANNOT_BE_EMPTY)
        break
        case appVars.LOCAL_STORAGE_OBJECT_FOUND_STATUS:
            prepareSuccessNodes(obj.body)
        break
        case appVars.START_NEW_REQUEST:
            startNetworkRequest(obj.body.login)
        break
        case appVars.GITHUB_USER_FOUND_STATUS:
            prepareSuccessNodes(obj.body)
        break
        case appVars.GITHUB_USER_NOT_FOUND_STATUS:
            prepareErrorNode(appVars.MESSAGE_USER_NOT_FOUND)
        break
        case appVars.NETWORK_NOT_AVAILABLE_STATUS:
            prepareErrorNode(appVars.ERROR_NO_NETWORK)
        break
        case appVars.CANT_COMPLETE_OPERATION_STATUS:
            prepareErrorNode(appVars.MESSAGE_OPERATION_CANT_COMPLETE)
        break
    }
}

function startNetworkRequest(githubUsername) {
    if (!hasConnection()) {
        processNetworkResult(new Rezponse(appVars.NETWORK_NOT_AVAILABLE_STATUS, null), githubUsername);
    } else {
        var queryURL = appVars.URL_GITHUB_USER_API + githubUsername;
        fetchJsonResource(queryURL).then(function (response) {
            var obj = response
           return processNetworkResult(obj, githubUsername)
        }, function (error) {
            console.error(appVars.ERROR_FAILED, error);
            // TODO: Prepare...
        })
    }
}

function processNetworkResult(rezObject, username) {
    console.log(rezObject.status)
    if (rezObject.status == 200) {
        respond(new Rezponse(appVars.GITHUB_USER_FOUND_STATUS, rezObject.body))
    } else if (rezObject.status == 404) {
        respond(new Rezponse(appVars.GITHUB_USER_NOT_FOUND_STATUS, null))
    } else if (rezObject.status == appVars.NETWORK_NOT_AVAILABLE_STATUS) {
        respond(new Rezponse(appVars.NETWORK_NOT_AVAILABLE_STATUS, null))
    } else {
        respond(new Rezponse(appVars.CANT_COMPLETE_OPERATION_STATUS, null))
    }
}

function prepareErrorNode(errorMessage) {
    removeNode(appVars.PARENT_WRAPPER_ID, appVars.NODE_ERROR_NODE_ID)
    pText(appVars.PARENT_WRAPPER_ID, { 'id': appVars.NODE_ERROR_NODE_ID }, errorMessage)
}

function prepareSuccessNodes(userJson) {
    toggleControlViz()
    removeNode(appVars.PARENT_WRAPPER_ID, appVars.NODE_ERROR_NODE_ID)
    h1Heading(appVars.PARENT_WRAPPER_ID, { 'id': appVars.HEADING_USERNAME_ID }, userJson.login)
    ulList(userJson, { 'id': appVars.UL_USER_DEETS_ID }, appVars.PARENT_WRAPPER_ID)
    imgImage(appVars.PARENT_WRAPPER_ID, { 'id': appVars.IMAGE_USER_ID, 'crossorigin': 'anonymous' }, userJson.avatar_url)
    saveToLocalStorage(userJson)
}

export function removeUserDeetsNodes() {
    removeChildNodes(appVars.PARENT_WRAPPER_ID, [appVars.HEADING_USERNAME_ID, appVars.UL_USER_DEETS_ID, appVars.IMAGE_USER_ID])
}

export function toggleControlViz() {
    toggleDisplayControls([appVars.DIV_INPUT_USERNAME_CONTROLS_ID, appVars.DIV_RESET_USERNAME_CONTROLS_ID])
}

function checkLocalStorage(username) {
    console.log(username)
    var val = JSON.parse(window.localStorage.getItem(username));
    if (val != null) {
        var tsDate = new Date(val.timestamp);
        var nDate = new Date();
        if (nDate - tsDate <= appVars.LOCAL_STORAGE_CACHE_TIME) {
            val.value.local_storage_time = tsDate;
            val.value.avatar_url = window.localStorage.getItem(`${val.value.login}_imageData`)
            return new Rezponse(appVars.LOCAL_STORAGE_OBJECT_FOUND_STATUS, val.value)
        } else {
            return new Rezponse(appVars.LOCAL_STORAGE_OBJECT_EXPIRED_STATUS, null)
        }
    } else {
        return new Rezponse(appVars.LOCAL_STORAGE_OBJECT_NOT_FOUND_STATUS, null)
    }
}

function saveToLocalStorage(userData) {
    var object = { value: userData, timestamp: new Date().getTime() }
    window.localStorage.setItem(userData.login, JSON.stringify(object));
    cacheImage(userData.login)
}

function cacheImage(username) {
    var userImage = document.getElementById(appVars.IMAGE_USER_ID);
    userImage.addEventListener('load', function () {
        var imgData = getBase64Image(userImage);
        window.localStorage.setItem(`${username}_imageData`, imgData)
    })
}

function getBase64Image(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height)
    var dataURL = canvas.toDataURL('image/png');
    return dataURL
}

// TODO: captureEnterPress
function captureEnterPress() {
    console.log('TODO')
}

// TODO: makeItPretty
function makeItPretty() {
    console.log('TODO')
}



