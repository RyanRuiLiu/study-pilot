EDU(
  'c1a44a564863a56b7daf00b04a3f7c26',
  function (e, t, n, i, o, a, r, s) {
    var c = window,
      r = NEJ.P('nej.u'),
      d = NEJ.P('edu.m'),
      l = NEJ.P('edu.u'),
      u = NEJ.P('nej.ut'),
      _,
      f = c.urlPrefix.icourseAuthorPrefix,
      h = c.urlPrefix.snsOAuthPrefix,
      p = c.urlPrefix.ursAuthorPrefix;
    var m = window.isMobilePhone === !0 || 'true' === window.isMobilePhone ? !0 : !1;
    var g = m ? i : n;
    d._$$ThirdBindUtil = NEJ.C();
    _ = d._$$ThirdBindUtil._$extend(u._$$Event, !0);
    _.__init = function (e) {
      this.__supInit(e);
      this.__loginOrAuthType = e.loginOrAuthType;
    };
    _._$open = function (e, n, i, o, a) {
      var c;
      this.__aftParams = i || [];
      this.__autoChecked = n || !0;
      var d = o || null;
      var u = (window.screen.height - 660 - 200) / 2,
        _ = (window.screen.width - 620) / 2;
      if (u < 0) u = 0;
      if (_ < 0) _ = 0;
      var b = l._$getDecodeCurUrl();
      if (!a) {
        if (!/\?/.test(b)) b += '?';
        else b += '&';
        b += 'edusave=1';
      }
      var v = a ? b : r._$str2b64(b);
      var E = !1;
      if (e === l.CONST.LOGINTYPE.WECHAT && t._$isWeixin() && t._$isMobile()) {
        h = '/passport/sns/doOAuth.htm';
        E = !0;
      }
      if (e === l.CONST.LOGINTYPE.ICOURSE) c = f + '?oauthType={{oauthType}}&returnUrl=' + v;
      else if (e === l.CONST.LOGINTYPE.URS) c = p + '?oauthType={{oauthType}}';
      else if (e === l.CONST.LOGINTYPE.PHONE) c = null;
      else
        c =
          h +
          (E ? '?isWebview=true&snsType=' : '?snsType=') +
          e +
          '&oauthType={{oauthType}}&returnUrl=' +
          v +
          (this.__autoChecked ? '&edusave=1' : '') +
          '&token=' +
          s._$cookie('NTESSTUDYSI');
      var x =
        window.webUser &&
        l &&
        l.CONST &&
        l.CONST.LOGINTYPE &&
        Number(webUser.loginType) === l.CONST.LOGINTYPE.SMARTEDU;
      if (c) {
        if (0 == this.__loginOrAuthType) {
          var w = this._formatUrl(c.replace('{{oauthType}}', 'login'), d);
          if (m) location.href = w;
          else window.open(w, '_self');
        } else if (1 == this.__loginOrAuthType) {
          var w = this._formatUrl(c.replace('{{oauthType}}', 'bind_authorization'), d);
          if (m) location.href = w;
          else
            window.open(
              w,
              '绑定',
              'height=660,width=620,top=' +
                u +
                ',left=' +
                _ +
                ',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no',
            );
        }
      } else if (!x) return new g({ data: d });
      return !1;
    };
    _._formatUrl = function (e, t) {
      var n = r._$object2query(t || {});
      if (!n) return e;
      if (e.indexOf('?') > -1) return e + '&' + n;
      else return e + '?' + n;
    };
    d.thirdBindUtil = function (e) {
      e = e || { loginOrAuthType: 1, autoChecked: !0 };
      return new d._$$ThirdBindUtil(e);
    };
    d.refreshStudyCookie = function (e) {
      o._$request({
        url: 'https://study.163.com/passport/member/refresh.do',
        method: 'GET',
        onload: e,
      });
    };
    return d;
  },
  'c23a9d4e237326dadfa12366ae1b6e48',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'e7a072d449e55a5cef9a11b8bbd65d1b',
  '7e6d0314211a98b9262503c8ad03c7ec',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '29f555f70e6e64cf8315ed720772ced1',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '73940963cbde37a0177f383a34a3cf2a',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '93828627ddb358ed890cb65967a0c1de',
  '493607ab361630ca82fc5bf094051616',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
