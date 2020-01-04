
import { hasConnection } from './check-network.js'

export async function fetchJsonResource(url) {

    if (!hasConnection()) return new Rezponse(-1, {'network' : 'none'});

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', url, true)
        xhr.timeout = 2000;
        xhr.responseType = 'json';
        // callback
        xhr.onload = function() {
            var rez = null;
            if (this.status === 200) {
                rez = new Rezponse(this.status, this.response);
            } else {
                rez = new Rezponse(this.status, null);
            }
            resolve(rez)
        };
        xhr.ontimeout = () => {
            console.error('Timeout!!')
            var rez = new Rezponse(xhr.status, null);
            resolve(rez)
        };
        xhr.onloadend = () => {
            console.log(`xhr.status: ${xhr.status}`)
        };
        xhr.onerror = (e) => {
            console.error(`Request failed - Network unavailable ${e.type}`)
            var rez = new Rezponse(xhr.status, null);
            resolve(rez)
        };
        xhr.send()
    })

}

class Rezponse {
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
}

