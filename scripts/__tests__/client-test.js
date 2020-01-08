jest.mock('../client');

import * as controller from '../app-control';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  return user.getGithubProfile('burntsugar').then(data => expect(data.status).toEqual(200));
});