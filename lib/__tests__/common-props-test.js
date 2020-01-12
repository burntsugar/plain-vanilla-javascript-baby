import { commonProps } from '../common-props.js';

// Regular test syntax
test('calls common-props.appProps', () => {
  expect(commonProps.appProps.URL_GITHUB_USER_API).toEqual(
    'https://api.github.com/users/'
  );
});

// BDD Syntax
describe('commonProps#appProps.URL_GITHUB_USER_API', () => {
  it('returns the URL of the Github public api', () => {
    expect(commonProps.appProps.URL_GITHUB_USER_API).toEqual(
      'https://api.github.com/users/'
    );
  });
});

  // Jest cheat sheet https://devhints.io/jest
