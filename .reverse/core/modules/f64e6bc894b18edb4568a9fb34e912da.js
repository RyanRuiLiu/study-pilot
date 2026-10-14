EDU(
  'f64e6bc894b18edb4568a9fb34e912da',
  function (e, t, n, i, o, a, r, s, c) {
    var d;
    a._$$ProxyXHR = n._$klass();
    d = a._$$ProxyXHR._$extend(e._$$ProxyAbstract);
    d.__destroy = function () {
      this.__super();
      window.clearTimeout(this.__timer);
      delete this.__timer;
      try {
        this.__xhr.onreadystatechange = s;
        this.__xhr.abort();
      } catch (e) {}
      delete this.__xhr;
    };
    d.__doSendRequest = (function () {
      var e = function (e, t) {
        this.__xhr.setRequestHeader(t, e);
      };
      var n = function (e) {
        var n = [];
        t._$reverseEach(e.getElementsByTagName('input'), function (e) {
          if ('file' == e.type)
            if (e.name) {
              if (e.files.length > 1) {
                t._$forEach(e.files, function (t) {
                  n.push({ name: e.name, file: t });
                });
                e.parentNode.removeChild(e);
              }
            } else e.parentNode.removeChild(e);
        });
        return n.length > 0 ? n : null;
      };
      return function (a) {
        var r = a.request,
          s = a.headers;
        this.__xhr = o.__getXMLHttpRequest();
        if (s[i._$HEAD_CT] === i._$HEAD_CT_FILE) {
          delete s[i._$HEAD_CT];
          this.__xhr.upload.onprogress = this.__onStateChange._$bind(this, 1);
          if ('FORM' === r.data.tagName) {
            var c = n(r.data);
            r.data = new FormData(r.data);
            t._$forEach(c, function (e) {
              var n = e.file;
              r.data.append(e.name || n.name || 'file-' + t._$uniqueID(), n);
            });
          }
        }
        this.__xhr.onreadystatechange = this.__onStateChange._$bind(this, 2);
        this.__xhr.onabort = this.__onAbort._$bind(this);
        if (0 !== r.timeout)
          this.__timer = window.setTimeout(this.__onStateChange._$bind(this, 3), r.timeout);
        this.__xhr.open(r.method, r.url, !r.sync);
        t._$loop(s, e, this);
        if (this.__request.cookie && 'withCredentials' in this.__xhr)
          this.__xhr.withCredentials = !0;
        if (!(
          s[i._$HEAD_CT] !== i._$HEAD_CT_FORM ||
          (window.FormData && r.data instanceof window.FormData)
        ))
          if (t._$isObject(r.data)) r.data = t._$object2string(r.data, '&', !1);
        this.__xhr.send(r.data);
      };
    })();
    d.__onStateChange = function (e) {
      switch (e) {
        case 1:
          this._$dispatchEvent('onuploading', arguments[1]);
          break;
        case 2:
          if (4 == this.__xhr.readyState)
            this.__onLoadRequest({
              status: this.__xhr.status,
              result: this.__xhr.responseText || '',
            });
          break;
        case 3:
          this.__onLoadRequest({ status: -1 });
      }
    };
    d.__getResponseHeader = function (e) {
      return !this.__xhr ? '' : this.__xhr.getResponseHeader(e);
    };
    d._$abort = function () {
      if (!o.__hasAbortEvent()) this.__onAbort();
      else {
        this.__xhr.onreadystatechange = s;
        this.__xhr.abort();
      }
    };
    return a;
  },
  '75714cfde572a6b8c1a7478ddce1f07a',
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '8b5c7ec5f50504fcb779ea6190a77347',
  'f31ca1a51b9d12820c0875e5eb65c608',
);
