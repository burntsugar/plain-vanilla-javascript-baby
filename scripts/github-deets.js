import { fetchJsonResource } from './client.js'
import { stringIsEmpty, cleanString } from './string-utils.js'
import { ulList } from './node-ul-list.js'
import { h1Heading } from './node-h1.js'
import { imgImage } from './node-img.js'
import { removeNode, removeChildNodes } from './remove-node.js'
import { pText } from './p-node.js'
import { toggleDisplayControls } from './toggle-viz.js'

const PARENT_WRAPPER_ID = 'github-user-wrapper';
const MESSAGE_USER_NOT_FOUND = 'not found!';
const MESSAGE_OPERATION_CANT_COMPLETE = 'Operation could not be completed at this time!';
const MESSAGE_USERNAME_CANNOT_BE_EMPTY = 'Github username cannot be empty!';
const ERROR_FAILED = 'Operation failed!';
const ERROR_NO_NETWORK = 'No network!';
const URL_GITHUB_USER_API = 'https://api.github.com/users/';
const NODE_ERROR_NODE_ID = 'error-node';
const HEADING_USERNAME_ID = 'h1-username';
const IMAGE_USER_ID = 'img-user';
const UL_USER_DEETS_ID = 'ul-user-deets';
const DIV_INPUT_USERNAME_CONTROLS_ID = 'input-username-controls';
const DIV_RESET_USERNAME_CONTROLS_ID = 'reset-username-controls';
const LOCAL_STORAGE_CACHE_TIME = 60000;

export function getGithubDeets(githubUsername) {
    if (!stringIsEmpty(githubUsername)) {
        var cleanUsername = cleanString(githubUsername);
        var rez = checkLocalStorageFirst(cleanUsername)
        if (rez.status == -2){
            console.log('loading from local storage!')
            prepareSuccessNodes(rez.body)
        } else {
            start(githubUsername)
        }
    } else {
        prepareErrorNode(MESSAGE_USERNAME_CANNOT_BE_EMPTY)
    }
}

function start(githubUsername) {
    var queryURL = URL_GITHUB_USER_API + githubUsername;
    fetchJsonResource(queryURL).then(function (response) {
        var obj = response
        processResult(obj, githubUsername)
    }, function (error) {
        console.error(ERROR_FAILED, error);
    })
}

function processResult(rezObject, username) {
    if (rezObject.status == 200) {
        prepareSuccessNodes(rezObject.body)
        saveToLocalStorage(rezObject.body)
    } else if (rezObject.status == 404) {
        prepareErrorNode(`"${username}" ${MESSAGE_USER_NOT_FOUND}`)

    } else if (rezObject.status == -1) {
        prepareErrorNode(ERROR_NO_NETWORK)
    } else {
        prepareErrorNode(MESSAGE_OPERATION_CANT_COMPLETE)
    }
}

function prepareErrorNode(errorMessage) {
    removeNode(PARENT_WRAPPER_ID, NODE_ERROR_NODE_ID)
    pText(PARENT_WRAPPER_ID, {'id': NODE_ERROR_NODE_ID}, errorMessage)
}

function prepareSuccessNodes(userJson) {
    toggleControlViz()
    removeNode(PARENT_WRAPPER_ID, NODE_ERROR_NODE_ID)
    h1Heading(PARENT_WRAPPER_ID, {'id': HEADING_USERNAME_ID}, userJson.login)
    ulList(userJson, {'id': UL_USER_DEETS_ID}, PARENT_WRAPPER_ID)
    imgImage(PARENT_WRAPPER_ID, {'id': IMAGE_USER_ID}, userJson.avatar_url)
}

export function removeUserDeetsNodes() {
    removeChildNodes(PARENT_WRAPPER_ID, [HEADING_USERNAME_ID, UL_USER_DEETS_ID, IMAGE_USER_ID])
}

export function toggleControlViz() {
    toggleDisplayControls([DIV_INPUT_USERNAME_CONTROLS_ID, DIV_RESET_USERNAME_CONTROLS_ID])
}

function checkLocalStorageFirst(username) {
    console.log(username)
    var val = JSON.parse(window.localStorage.getItem(username));
    if (val != null) {
        var tsDate = new Date(val.timestamp);
        var nDate = new Date();
        if (nDate - tsDate <= LOCAL_STORAGE_CACHE_TIME) {
            val.value.local_storage_time = tsDate;
            return {'status': -2, 'body': val.value}
        } else {
            return {'status': -1, 'body': null}
        }
    } else {
        return {'status': -1, 'body': null}
    }
}

function saveToLocalStorage(userData) {
    var object = {value: userData, timestamp: new Date().getTime()}
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
