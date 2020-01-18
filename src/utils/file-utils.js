'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview File Utility.
 */

import {readFile} from 'fs';

/**
 * RMP
 */
const FileUtils = (() => {

    /**
     * @public
     * Reads a raw JSON file and returns it as JSON
     * @param {string} path absolute path to the JSON file
     * @return {object} JSON
     */
    const readJsonRawFile = (path) => {
        return new Promise((resolve, reject) => {
          readFile(path, 'utf8', (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(JSON.parse(data));
          });
        });
      }

    return {
        readJsonRawFile: readJsonRawFile,
    }

})();

export {FileUtils};
