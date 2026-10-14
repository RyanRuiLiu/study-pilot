EDU(
  '990e639cf7571f6869e1aea7132ab47d',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$LoaderHtml = t._$klass();
    c = o._$$LoaderHtml._$extend(e._$$LoaderAbstract);
    c.__getRequest = function () {
      var e = n._$create('iframe');
      e.width = 0;
      e.height = 0;
      e.style.display = 'none';
      return e;
    };
    c.__doRequest = function (e) {
      try {
        document.body.appendChild(e);
        e.src = this.__url;
      } catch (t) {
        console.log(e);
        console.error(t);
      }
    };
    c.__onError = function (e) {
      var t = (this.__getLoadData(this.__url) || a).request;
      this.__doCallback('onerror', e);
      i.__removeIFrameKeepHistory(t);
    };
    c.__onLoaded = function () {
      var e = null,
        t = (this.__getLoadData(this.__url) || a).request;
      try {
        if (t.src != this.__url) return;
        e = t.contentWindow.document.body;
      } catch (n) {}
      this.__doCallback('onload', e);
      i.__removeIFrameKeepHistory(t);
    };
    return o;
  },
  '00768735dae08fd44cc2c539159c406e',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'e5ea2f7718ff2ba77b80424dc1b94692',
);
