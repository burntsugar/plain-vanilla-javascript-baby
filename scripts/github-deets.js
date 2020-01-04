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
    LOCAL_STORAGE_CACHE_TIME: 60000
}

export function getGithubDeets(githubUsername) {
    if (!stringIsEmpty(githubUsername)) {
        var cleanUsername = cleanString(githubUsername);
        var rez = checkLocalStorageFirst(cleanUsername)
        if (rez.status == -2) {
            console.log('loading from local storage!')
            prepareSuccessNodes(rez.body)
        } else {
            start(githubUsername)
        }
    } else {
        prepareErrorNode(appVars.MESSAGE_USERNAME_CANNOT_BE_EMPTY)
    }
}

function start(githubUsername) {

    if (!hasConnection()) {
        processNetworkResult(new Rezponse(-1, null), githubUsername);
    } else {
        var queryURL = appVars.URL_GITHUB_USER_API + githubUsername;
        fetchJsonResource(queryURL).then(function (response) {
            var obj = response
            processNetworkResult(obj, githubUsername)
        }, function (error) {
            console.error(appVars.ERROR_FAILED, error);
        })
    }
}

function processNetworkResult(rezObject, username) {
    console.log(rezObject.status)
    if (rezObject.status == 200) {
        prepareSuccessNodes(rezObject.body)
        saveToLocalStorage(rezObject.body)
    } else if (rezObject.status == 404) {
        prepareErrorNode(`"${username}" ${appVars.MESSAGE_USER_NOT_FOUND}`)
    } else if (rezObject.status == -1) {
        prepareErrorNode(appVars.ERROR_NO_NETWORK)
    } else {
        prepareErrorNode(appVars.MESSAGE_OPERATION_CANT_COMPLETE)
    }
}

function prepareDocumentNodes(obj) {

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
    imgImage(appVars.PARENT_WRAPPER_ID, { 'id': appVars.IMAGE_USER_ID }, userJson.avatar_url)
}

export function removeUserDeetsNodes() {
    removeChildNodes(appVars.PARENT_WRAPPER_ID, [appVars.HEADING_USERNAME_ID, appVars.UL_USER_DEETS_ID, appVars.IMAGE_USER_ID])
}

export function toggleControlViz() {
    toggleDisplayControls([appVars.DIV_INPUT_USERNAME_CONTROLS_ID, appVars.DIV_RESET_USERNAME_CONTROLS_ID])
}

function checkLocalStorageFirst(username) {
    console.log(username)
    var val = JSON.parse(window.localStorage.getItem(username));
    if (val != null) {
        var tsDate = new Date(val.timestamp);
        var nDate = new Date();
        if (nDate - tsDate <= appVars.LOCAL_STORAGE_CACHE_TIME) {
            val.value.local_storage_time = tsDate;
            return new Rezponse(-2, val.value)
        } else {
            return new Rezponse(-1, null)
        }
    } else {
        return new Rezponse(-1, null)
    }
}

function saveToLocalStorage(userData) {
    var object = { value: userData, timestamp: new Date().getTime() }
    window.localStorage.setItem(userData.login, JSON.stringify(object));
}

// TODO: captureEnterPress
function captureEnterPress() {
    console.log('TODO')
}

// TODO: makeItPretty
function makeItPretty() {
    console.log('TODO')
}

// TODO: Cache image

// TODO: offline but stored locally edge cases.