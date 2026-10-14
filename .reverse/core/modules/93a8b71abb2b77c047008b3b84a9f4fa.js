EDU(
  '93a8b71abb2b77c047008b3b84a9f4fa',
  function (e, t, n, i, o) {
    var a;
    var r = function (t, n) {
      e._$request({
        url: '/web/j/memberBean.getBindStatusByLoginType.rpc',
        method: 'post',
        data: { loginType: 8 },
        onload: function (e) {
          if (e) s(t, n);
          else {
            a = null;
            n && n(e);
          }
        },
        onerror: n,
      });
    };
    var s = function (t, n) {
      e._$request({
        url: '/web/j/memberBean.getKeCookieCert.rpc',
        method: 'post',
        data: {},
        onload: function (e) {
          if (e) {
            a = e;
            t && t(e);
          } else {
            a = null;
            n && n(e);
          }
        },
        onerror: n,
      });
    };
    var c = function (e, t) {
      var n = new XMLHttpRequest(),
        i = 'GET',
        o = '//dict.youdao.com/login/acc/login/inner/phone?param=' + e + '&isWeb=true';
      n.open(i, o, !0);
      n.withCredentials = !0;
      n.onreadystatechange = function () {
        if (n.readyState === XMLHttpRequest.DONE && 200 === n.status) t && t();
      };
      n.send(null);
    };
    var d = function () {
      return a;
    };
    var l = window.windowOpen || window.open;
    var u = 'ke.youdao.com';
    var _ = 'study.163.com';
    var f = n._$isMobile();
    var h = function (e, t, n) {
      if (e) return l.apply(window, n);
      else location.href = t;
    };
    var p = function (e, n) {
      var o = Array.prototype.slice.call(arguments, 1);
      var a = d();
      e = void 0 === e ? !0 : e;
      if (!(n.indexOf(_) >= 0)) {
        if (window.webUser && n && n.indexOf(u) >= 0) {
          if (void 0 === a) {
            t.show();
            r(
              function (i) {
                c(i, function () {
                  t.hide();
                  h(e, n, o);
                });
              },
              function () {
                t.hide();
                h(e, n, o);
              },
            );
            return;
          }
          if (void 0 !== a && null !== a) {
            t.show();
            c(a, function () {
              t.hide();
              h(e, n, o);
            });
            return;
          }
        }
        return h(e, n, o);
      } else {
        var s = i._$str2b64(n);
        var l = window.webUser
          ? '//www.icourse163.org/passport/adult/changeEduCookies.htm?single=false&returnUrl=' + s
          : n;
        h(e, l, [l]);
      }
    };
    var m = function () {
      var e = !f;
      var t = Array.prototype.slice.call(arguments);
      return p.apply(window, [e].concat(t));
    };
    var g = function () {
      var e = Array.prototype.slice.call(arguments);
      return p.apply(window, [!1].concat(e));
    };
    o.getBindStatusByLoginType = r;
    o.getKeCookieCert = s;
    o.getKeCookie = c;
    o.getCookieCertVar = d;
    o.proxyOpen = p;
    o.open = m;
    o.openInCurrentTab = g;
    return o;
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '52548c039158799c7a8c592df50f84b5',
  'beec6201069596ecb83a09e5fc3eb415',
  'c23a9d4e237326dadfa12366ae1b6e48',
);
