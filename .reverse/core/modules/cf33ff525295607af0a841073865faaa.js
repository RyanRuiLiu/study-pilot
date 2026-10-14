EDU(
  'cf33ff525295607af0a841073865faaa',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _,
      f = {},
      h = 'NEJ-UPLOAD-RESULT:';
    c._$$ProxyUpload = t._$klass();
    _ = c._$$ProxyUpload._$extend(e._$$ProxyAbstract);
    _.__init = (function () {
      var e = !1;
      var t = function (e) {
        var t = e.data;
        if (0 == t.indexOf(h)) {
          t = JSON.parse(t.replace(h, ''));
          var n = f[t.key];
          if (n) {
            delete f[t.key];
            n.__onLoadRequest(decodeURIComponent(t.result));
          }
        }
      };
      var n = function () {
        if (!e) {
          e = !0;
          i._$addEvent(window, 'message', t);
        }
      };
      return function () {
        this.__super();
        n();
      };
    })();
    _.__destroy = function () {
      this.__super();
      o._$remove(this.__frame);
      delete this.__frame;
      window.clearTimeout(this.__timer);
      delete this.__timer;
    };
    _.__onLoadRequest = function (e) {
      try {
        var t = o._$text2type(e, this.__request.type);
        this._$dispatchEvent('onload', t);
      } catch (n) {
        this._$dispatchEvent('onerror', { code: a._$CODE_ERREVAL, message: e });
      }
    };
    _.__doSendRequest = (function () {
      var e = function () {
        var e, t;
        try {
          var e = this.__frame.contentWindow.document.body,
            t = (e.innerText || e.textContent || '').trim();
          if (t.indexOf(h) >= 0 || e.innerHTML.indexOf(h) >= 0) return;
        } catch (n) {
          return;
        }
        this.__onLoadRequest(t);
      };
      var t = function (e, n, i) {
        r._$request(e, {
          type: 'json',
          method: 'POST',
          cookie: i,
          mode: parseInt(n) || 0,
          onload: function (o) {
            if (this.__timer) {
              this._$dispatchEvent('onuploading', o);
              this.__timer = window.setTimeout(t._$bind(this, e, n, i), 1e3);
            }
          }._$bind(this),
          onerror: function (o) {
            if (this.__timer) this.__timer = window.setTimeout(t._$bind(this, e, n, i), 1e3);
          }._$bind(this),
        });
      };
      return function (r) {
        var s = r.request,
          c = r.headers,
          l = s.data,
          u = n._$uniqueID();
        f[u] = this;
        l.target = u;
        l.method = 'POST';
        l.enctype = a._$HEAD_CT_FILE;
        l.encoding = a._$HEAD_CT_FILE;
        var _ = l.action || '',
          h = _.indexOf('?') <= 0 ? '?' : '&';
        l.action = _ + h + '_proxy_=form';
        this.__frame = o._$createXFrame({
          name: u,
          onload: function (n) {
            var o = i._$getElement(n);
            i._$addEvent(o, 'load', e._$bind(this));
            l.submit();
            var a = (l.nej_query || d).value;
            if (a) {
              var r = (l.nej_mode || d).value,
                s = 'true' === (l.nej_cookie || d).value;
              this.__timer = window.setTimeout(t._$bind(this, a, r, s), 100);
            }
          }._$bind(this),
        });
      };
    })();
    _._$abort = function () {
      this.__onAbort();
    };
    return c;
  },
  '75714cfde572a6b8c1a7478ddce1f07a',
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '8b5c7ec5f50504fcb779ea6190a77347',
  '8a864b627c302d7d1c56bd928b515d1b',
  '50ec630b3d3ea9776ebad295bb5cca7c',
);
