EDU('44f2661ffdf490d3c91ca1f98646a165', function (e, t, n, i) {
  e.__getItemInStorage = function (e) {
    return localStorage.getItem(e);
  };
  e.__setItemToStorage = function (e, t) {
    localStorage.setItem(e, t);
  };
  e.__removeItemFromStorage = function (e) {
    localStorage.removeItem(e);
  };
  e.__clearStorage = function () {
    localStorage.clear();
  };
  e.__initStorage = function () {
    (document.onstorageready || n)();
  };
  e.__isStorageReady = function () {
    return !0;
  };
  return e;
});
