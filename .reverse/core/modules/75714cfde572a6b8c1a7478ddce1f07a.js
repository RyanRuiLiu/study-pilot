EDU(
  '75714cfde572a6b8c1a7478ddce1f07a',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _;
    c._$$ProxyAbstract = e._$klass();
    _ = c._$$ProxyAbstract._$extend(a._$$EventTarget);
    _.__reset = function (e) {
      this.__super(e);
      this.__request = t._$fetch(
        { url: '', sync: !1, cookie: !1, type: 'text', method: 'GET', timeout: 6e4 },
        e,
      );
      var n = i._$get('csrf');
      if (n.cookie && n.param) {
        var a = encodeURIComponent(n.param) + '=' + encodeURIComponent(r._$cookie(n.cookie) || ''),
          s = this.__request.url.indexOf('?') < 0 ? '?' : '&';
        this.__request.url += s + a;
      }
      this.__headers = e.headers || {};
      var c = this.__headers[o._$HEAD_CT];
      if (null == c) this.__headers[o._$HEAD_CT] = o._$HEAD_CT_FORM;
    };
    _.__destroy = function () {
      this.__super();
      delete this.__rkey;
      delete this.__request;
      delete this.__headers;
    };
    _.__onLoadRequest = function (e) {
      var t = e.status;
      if (t != -1)
        if (0 == ('' + t).indexOf('2'))
          this._$dispatchEvent('onload', n._$text2type(e.result, this.__request.type));
        else
          this._$dispatchEvent('onerror', {
            data: t,
            result: e.result,
            code: o._$CODE_ERRSERV,
            message: '服务器返回异常状态[' + t + ']!',
          });
      else
        this._$dispatchEvent('onerror', {
          code: o._$CODE_TIMEOUT,
          message: '请求[' + this.__request.url + ']超时！',
        });
    };
    _.__doSendRequest = l;
    _.__getResponseHeader = l;
    _.__onAbort = function () {
      this._$dispatchEvent('onerror', { code: o._$CODE_ERRABRT, message: '客户端终止请求' });
    };
    _._$send = function (e) {
      var t = this.__request.url;
      if (t)
        try {
          this.__request.data = null == e ? null : e;
          var n = { request: this.__request, headers: this.__headers };
          try {
            this._$dispatchEvent('onbeforerequest', n);
          } catch (i) {
            console.error(i.message);
            console.error(i.stack);
          }
          this.__doSendRequest(n);
        } catch (a) {
          this._$dispatchEvent('onerror', {
            code: o._$CODE_ERRSERV,
            message: '请求[' + t + ']失败:' + a.message + '！',
          });
        }
      else
        this._$dispatchEvent('onerror', { code: o._$CODE_NOTASGN, message: '没有输入请求地址！' });
    };
    _._$abort = l;
    _._$header = function (e) {
      if (!t._$isArray(e)) return this.__getResponseHeader(e) || '';
      var n = {};
      t._$forEach(
        e,
        function (e) {
          n[e] = this._$header(e);
        },
        this,
      );
      return n;
    };
    return c;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '238c7c1492c17e4d4bc463420d450c00',
  '8b5c7ec5f50504fcb779ea6190a77347',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '4a1eebd4a6f73a95ccf8ecf0a547fa18',
);
