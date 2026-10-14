EDU(
  '6f0a6ac3e9d58d508c4c3c236cb7172d',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    var u,
      _ = {};
    s._$$ProxyFrame = n._$klass();
    u = s._$$ProxyFrame._$extend(e._$$ProxyAbstract);
    u.__init = (function () {
      var e = 'NEJ-AJAX-DATA:',
        t = !1;
      var n = function (t) {
        var n = t.data;
        if (0 == n.indexOf(e)) {
          n = JSON.parse(n.replace(e, ''));
          var i = _[n.key];
          if (i) {
            delete _[n.key];
            n.result = decodeURIComponent(n.result || '');
            i.__onLoadRequest(n);
          }
        }
      };
      var o = function () {
        if (!t) {
          t = !0;
          i._$addEvent(window, 'message', n);
        }
      };
      return function () {
        this.__super();
        o();
      };
    })();
    u.__doSendRequest = function (e) {
      var n = e.request,
        s = o._$getFrameProxy(n.url),
        c = _[s];
      if (!t._$isArray(c))
        if (c) {
          this.__rkey = t._$uniqueID();
          _[this.__rkey] = this;
          var d = t._$fetch({ url: '', data: null, timeout: 0, method: 'GET' }, n);
          d.key = this.__rkey;
          d.headers = e.headers;
          r._$postMessage(_[s], { data: d });
        } else {
          _[s] = [this.__doSendRequest._$bind(this, e)];
          a._$createXFrame({
            src: s,
            visible: !1,
            onload: function (e) {
              var n = _[s];
              _[s] = i._$getElement(e).contentWindow;
              t._$reverseEach(n, function (e) {
                try {
                  e();
                } catch (t) {}
              });
            },
          });
        }
      else c.push(this.__doSendRequest._$bind(this, e));
    };
    u._$abort = function () {
      delete _[this.__rkey];
      this.__onAbort();
    };
    return s;
  },
  '75714cfde572a6b8c1a7478ddce1f07a',
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '238c7c1492c17e4d4bc463420d450c00',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '50ec630b3d3ea9776ebad295bb5cca7c',
);
