'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Tests client module.
 */

import {networkControl} from '../network/network-control.js';
import {MockClient} from '../__mocks__/client-mock.js';
import {commonProps} from '../common-props.js';


describe('client#get', () => {
  beforeAll(() => {});

  beforeEach(() => {
    networkControl.setFetchClient(MockClient);
  });

  it('should return user profile data for user burntsugar', () => {
    const testURL = 'http://www.rrr.com/user/burntsugar';
    return networkControl.requestAPI(testURL).then((data) => expect(data.body.login).toEqual('burntsugar'));
  });

  it('should return 404', () => {
    const testURL = 'http://www.rrr.com/user/rachhh';
    return networkControl.requestAPI(testURL).then((data) => expect(data.status).toEqual(commonProps.httpStatusCodes.HTTP_STATUS_NOT_FOUND));
  });

  it('should return 1007', () => {
    const testURL = 'networkexception';
    return networkControl.requestAPI(testURL).then((data) => expect(data.status).toEqual(commonProps.domExceptionNames.ERROR_NAME_NO_NETWORK_ERROR));
  });

  it('should return 1006', () => {
    const testURL = 'timeoutexception';
    return networkControl.requestAPI(testURL).then((data) => expect(data.status).toEqual(commonProps.domExceptionNames.ERROR_NAME_TIME_OUT_ERROR));
  });

});