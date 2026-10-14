EDU('311f176d442c0c7039f8cd12e8c96387', function (e, t, n, i) {
  e.__getXMLHttpRequest = function () {
    return new XMLHttpRequest();
  };
  e.__hasAbortEvent = function () {
    return !0;
  };
  return e;
});
