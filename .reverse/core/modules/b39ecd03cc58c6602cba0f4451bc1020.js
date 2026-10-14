EDU(
  'b39ecd03cc58c6602cba0f4451bc1020',
  function (e, t, n, i, o, a, r, s, c) {
    var d,
      l = {},
      u = i._$uniqueID();
    this['ld' + u] = function (e, t) {
      var n = l[e];
      if (n) {
        delete l[e];
        n.__onLoadRequest({ status: 200, result: t });
      }
    };
    this['er' + u] = function (e, t) {
      var n = l[e];
      if (n) {
        delete l[e];
        n.__onLoadRequest({ status: t || 0 });
      }
    };
    a._$$ProxyFlash = t._$klass();
    d = a._$$ProxyFlash._$extend(e._$$ProxyAbstract);
    d.__doSendRequest = function (e) {
      var t = l.flash;
      if (!i._$isArray(t))
        if (t) {
          this.__rkey = i._$uniqueID();
          l[this.__rkey] = this;
          var a = i._$fetch({ url: '', data: null, method: 'GET' }, e.request);
          a.key = this.__rkey;
          a.headers = e.headers;
          a.onerror = 'cb.er' + u;
          a.onloaded = 'cb.ld' + u;
          var r = n._$getFlashProxy(a.url);
          if (r) a.policyURL = r;
          t.request(a);
        } else {
          l.flash = [this.__doSendRequest._$bind(this, e)];
          o._$flash({
            hidden: !0,
            src: n._$get('ajax.swf'),
            onready: function (e) {
              if (e) {
                var t = l.flash;
                l.flash = e;
                i._$reverseEach(t, function (e, t, n) {
                  try {
                    e();
                  } catch (i) {}
                });
              }
            },
          });
        }
      else t.push(this.__doSendRequest._$bind(this, e));
    };
    d._$abort = function () {
      delete l[this.__rkey];
      this.__onAbort();
    };
    return a;
  },
  '75714cfde572a6b8c1a7478ddce1f07a',
  'f1c1923e72a7bf464958899fa52f322f',
  '238c7c1492c17e4d4bc463420d450c00',
  'fe86216ed59e3103a56c42c850d389f0',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
);
