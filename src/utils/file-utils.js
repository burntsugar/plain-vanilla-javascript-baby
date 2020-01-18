import {readFile} from 'fs';


const FileUtils = (() => {

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
