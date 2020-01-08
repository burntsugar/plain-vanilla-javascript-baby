'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { userProfile } from './user-profile.js'

export async function fetchJsonResource(url) {

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', url, true)
        xhr.timeout = 15000;
        xhr.responseType = 'json';
        // callback
        xhr.onload = function() {
            var rez = null;
            if (this.status === 200) {
                rez = new userProfile.Data(this.status, this.response);
            } else {
                rez = new userProfile.Data(this.status, null);
            }
            resolve(rez)
        };
        xhr.ontimeout = (e) => {
            console.error('Timeout!!')
            reject(new DOMException(`Request failed: Request for ${url} timed-out`, 'TimeoutError'))
        };
        xhr.onloadend = () => {
            console.log(`xhr.status: ${xhr.status}`)
        };
        xhr.onerror = (e) => {
            console.error('Request failed: Network error')
            reject(new DOMException('Request failed: Network error', 'NetworkError'))
        };
        xhr.send()
    })

}
