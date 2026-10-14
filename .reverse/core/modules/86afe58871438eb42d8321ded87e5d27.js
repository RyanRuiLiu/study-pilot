EDU(
  '86afe58871438eb42d8321ded87e5d27',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$LoaderText = t._$klass();
    c = o._$$LoaderText._$extend(e._$$LoaderAbstract);
    c.__getRequest = function () {
      this.__doRequest();
      return null;
    };
    c.__doClear = function () {
      this.__super();
      this.__getLoadData('loaded')[this.__url] = !1;
    };
    c.__doRequest = function () {
      i._$request(this.__url, {
        method: 'GET',
        type: 'text',
        onload: this.__onLoaded._$bind(this),
        onerror: this.__onError._$bind(this),
      });
    };
    c.__onLoaded = function (e) {
      this.__doCallback('onload', { url: this.__url, content: e });
    };
    return o;
  },
  '00768735dae08fd44cc2c539159c406e',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '8a864b627c302d7d1c56bd928b515d1b',
);
