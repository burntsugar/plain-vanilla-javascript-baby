'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Tests FileUtils module.
 */

import {FileUtils} from '../utils/file-utils';

describe('client#get', () => {
  beforeAll(() => {});

  beforeEach(() => {});

  it('should return the data in the file...', () => {
    return FileUtils.readJsonRawFile(process.cwd() + '/src/raw/users.json').then((data) => expect(data.login).toEqual('burntsugar'));
  });
});
