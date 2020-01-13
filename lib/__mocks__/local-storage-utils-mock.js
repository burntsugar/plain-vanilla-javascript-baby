const MockStorage = (function() {
  let storage = new Map();

  function setItem(key, value) {
    storage.set(key, value);
  }
  function getItem(key) {
    if (storage.get(key) == undefined) {
      return null;
    }
    return storage.get(key);
  }
  function removeItem(key) {
    storage.delete(key);
  }
  function clear() {
    storage = new Map();
  }
  function getSize() {
    return storage.size;
  }
  return {
    setItem: setItem,
    getItem: getItem,
    removeItem: removeItem,
    clear: clear,
    getSize: getSize
  };
})();

export { MockStorage };
