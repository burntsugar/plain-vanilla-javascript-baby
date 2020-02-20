'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import {stringUtils} from '../utils/string-utils.js';

describe('stringUtils#stringIsEmpty', () => {
  it('returns true when passed an empty string', () => {
    expect(stringUtils.stringIsEmpty('')).toBe(true);
  });

  it('returns false when passed a string', () => {
    expect(stringUtils.stringIsEmpty('burntsugar')).toBe(false);
  });

  it('returns false when passed null', () => {
    expect(stringUtils.stringIsEmpty(null)).toBe(true);
  });

  it('returns false when passed undefined', () => {
    expect(stringUtils.stringIsEmpty(undefined)).toBe(true);
  });

  it('returns false when passed other than string type', () => {
    expect(stringUtils.stringIsEmpty(1)).toBe(true);
  });
});

describe('stringUtils#removeIllegalCharacters', () => {
  it('returns a copy of the string which contains only legal characters, when passed a string containing illegal characters', () => {
    expect(
      stringUtils.removeIllegalCharacters('burnt|&;$%@"<>()+,sugar'),
    ).toMatch('burntsugar');
  });

  it('returns a copy of the string, when passed a string containing no illegal characters', () => {
    expect(stringUtils.removeIllegalCharacters('burntsugar')).toMatch(
      'burntsugar',
    );
  });

  it('returns undefined, when passed null', () => {
    expect(stringUtils.removeIllegalCharacters(null)).toBe(undefined);
  });

  it('returns undefined, when passed other than string type', () => {
    expect(stringUtils.removeIllegalCharacters(1)).toBe(undefined);
  });
});
