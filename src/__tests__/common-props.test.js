'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { commonProps } from '../common-props.js';

// Regular
test('calls common-props.appProps', () => {
  expect(commonProps.appProps.URL_GITHUB_USER_API).toEqual(
    'https://api.github.com/users/'
  );
});

// BDD
describe('commonProps#appProps.URL_GITHUB_USER_API', () => {
  it('returns the URL of the Github public api', () => {
    expect(commonProps.appProps.URL_GITHUB_USER_API).toEqual(
      'https://api.github.com/users/'
    );
  });
});
