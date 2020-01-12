import {stringUtils} from '../utils/string-utils.js';

describe('stringUtils#stringIsEmpty', () => {
    it('returns true when a given string empty', () => {
      expect(stringUtils.stringIsEmpty('')).toBe(true);
    });
  });

  describe('stringUtils#removeIllegalCharacters', () => {
    it('remove illegal characters |&;$%@"<>()+,', () => {
      expect(stringUtils.removeIllegalCharacters('burnt|&;$%@"<>()+,sugar')).toMatch('burntsugar');
    });
  });

  // Jest cheat sheet https://devhints.io/jest