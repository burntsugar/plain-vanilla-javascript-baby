'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

import { MockStorage } from '../__mocks__/local-storage-utils-mock.js';
import { localStorageUtils } from '../local-storage/local-storage-utils.js';

describe('local-storage-utils#appendToEntry', () => {
  beforeAll(() => {
    localStorageUtils.setStorageObject(MockStorage);
  });

  beforeEach(() => {
    MockStorage.clear();
  });

  it('should replace a value on the entry', () => {
    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });
    localStorageUtils.appendToEntry('testkey1', 'login', 'jest');

    let result = JSON.parse(MockStorage.getItem('testkey1'));
    expect(result.login).toBe('jest');
  });
});

describe('local-storage-utils#retrieveEntry', () => {
  beforeAll(() => {
    localStorageUtils.setStorageObject(MockStorage);
  });
  beforeEach(() => {
    MockStorage.clear();
  });

  it('should return an entry because the existing entry has not expired', () => {
    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });

    let result = localStorageUtils.retrieveEntry('testkey1');
    expect(result).not.toBe(null);
  });

  it('should return null because the existing entry has expired', () => {
    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });
    localStorageUtils.appendToEntry('testkey1', 'timestamp', 1578877204000);

    let result = localStorageUtils.retrieveEntry('testkey1');
    expect(result).toBe(null);
  });
});

describe('local-storage-utils#persistEntry', () => {
  beforeAll(() => {
    localStorageUtils.setStorageObject(MockStorage);
  });
  beforeEach(() => {
    MockStorage.clear();
  });
  afterEach(() => {
    MockStorage.setProvokeQuotasExceedEdxception(false);
  });

  it('should set new entry', () => {
    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });

    let result = JSON.parse(MockStorage.getItem('testkey1'));
    expect(result.testvalue).toEqual('test value 1');
  });

  it('should not set a subsequent entry because the previous entry with the same key has not yet expired.', () => {
    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });
    let entry1 = JSON.parse(MockStorage.getItem('testkey1'));

    localStorageUtils.persistEntry('testkey1', {
      testvalue: 'test value 1'
    });

    let result = JSON.parse(MockStorage.getItem('testkey1'));
    expect(result.timestamp).toEqual(entry1.timestamp);
  });

  it('should persist the first entry and then overwrite it with the second', () => {
    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });
    localStorageUtils.appendToEntry('testkey1', 'timestamp', 1578877204000);

    let modifiedEntry = JSON.parse(MockStorage.getItem('testkey1'));

    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });

    let result = JSON.parse(MockStorage.getItem('testkey1'));
    expect(result.timestamp).not.toBe(modifiedEntry.timestamp);
  });

  it('should not attempt to persist the entry when storage is not available', () => {
    MockStorage.setProvokeQuotasExceedEdxception(true);

    localStorageUtils.persistEntry('testkey1', { testvalue: 'test value 1' });
    
    let result = JSON.parse(MockStorage.getItem('testkey1'));
    expect(result).toBe(null);
  });
});

describe('local-storage-utils#setStorageObject', () => {
  beforeAll(() => {
    localStorageUtils.setStorageObject(MockStorage);
  });
  beforeEach(() => {
    MockStorage.clear();
  });
  it('it is implicit in these tests', () => {});
});
