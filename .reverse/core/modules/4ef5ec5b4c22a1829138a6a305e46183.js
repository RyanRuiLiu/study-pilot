EDU(
  '4ef5ec5b4c22a1829138a6a305e46183',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l = /^[#?]+/,
      u = /#(.*?)$/,
      _ = this;
    var f = function () {
      return !history.pushState || n._$IS.android || !history.auto;
    };
    var h = function (e, t) {
      var n = !t ? 'pushState' : 'replaceState';
      _.history[n](null, document.title, e);
    };
    var p = function () {
      return location.parse(_.location.href);
    };
    h = h._$aop(function (e) {
      if (f()) {
        e.stopped = !0;
        var t = e.args;
        _url = t[0].replace(l, '');
        !t[1] ? (_.location.hash = _url) : _.location.replace('#' + _url);
      }
    });
    p = p._$aop(function (e) {
      if (f()) {
        e.stopped = !0;
        var t = u.test(_.location.href) ? RegExp.$1 : '';
        e.value = location.parse(t.replace(l, ''));
      }
    });
    location.redirect = function (e, t) {
      h(e, t);
    };
    location.active = (function () {
      var e, i, r, s, c;
      var d = function (e) {
        if (!s) {
          var n = { oldValue: r, newValue: p() };
          if (location.ignored) location.ignored = !1;
          else {
            t._$dispatchEvent(location, 'beforeurlchange', n);
            if (n.stopped) {
              if (r) {
                s = !0;
                h(r.href, !0);
              }
              return;
            }
          }
          i = _.location.href;
          r = n.newValue;
          t._$dispatchEvent(location, 'urlchange', r);
          a.__pushHistory(r.href);
        } else s = !1;
      };
      var l = function () {
        if (i != _.location.href) d();
        e = o.requestAnimationFrame(l);
      };
      var u = function () {
        var e = n._$KERNEL;
        _ie7 = 'trident' == e.engine && e.release <= '3.0';
        return f() && 'onhashchange' in window && !_ie7;
      };
      return function (n) {
        if (!c) {
          c = !0;
          _ = n || window;
          if (u()) {
            t._$addEvent(_, 'hashchange', d);
            d();
          } else if (!e) {
            e = o.requestAnimationFrame(l);
            l();
          }
        }
      };
    })();
    location.parse = (function () {
      var t = /^https?:\/\/.*?\//i,
        n = /[?#]/;
      return function (i) {
        var o = { href: i };
        i = (i || '').replace(t, '/').split(n);
        var a = 1;
        if ('/' == i[0] && 0 == (i[1] || '').indexOf('/')) a = 2;
        o.path = i.splice(0, a).join('?');
        o.query = e._$query2object(i.join('&'));
        return o;
      };
    })();
    location.same = function (e) {
      return p().href == e;
    };
    i._$$CustomEvent._$allocate({ element: location, event: ['beforeurlchange', 'urlchange'] });
    return r;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'f051aeae7bb889518ead30ef6e491df3',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '77d2226943bd145280d6a32ebbedeb9d',
  '4b6a2b0b658e965f53b78ad4c8f409ea',
);
