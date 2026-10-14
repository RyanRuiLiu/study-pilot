EDU(
  '493607ab361630ca82fc5bf094051616',
  function (e, t) {
    var n = window,
      i = NEJ.P('nej.u'),
      o = NEJ.P('edu.u'),
      a = NEJ.P('edu.u');
    a._$isLogin = function () {
      return n.webUser && n.webUser.loginId;
    };
    a._$getDecodeCurUrl = function (e, t) {
      var o = t || n.returnUrl || location.href;
      if (o && o.indexOf(n.urlPrefix.indexPrefix) > 0) o = o.split('#')[0];
      o = n.encodeURI(n.decodeURI(o || ''));
      if (o)
        if (e)
          i._$forEach(
            e,
            function (e) {
              if (e.key) o = a._$addUrlParamStr(e.key + (e.value ? '=' + e.value : ''), o, !0);
            },
            this,
          );
      return o;
    };
    a._$getRegUrl = function () {
      return (
        '//reg.163.com/reg/reg.jsp?product=imooc&domains=icourse163.org&url=' +
        n.encodeURIComponent(a._$getDecodeCurUrl([{ key: 'forcelogin', value: 'true' }]))
      );
    };
    a._$changeAccountForceRedirect = function (t) {
      t = t || window.location.href;
      window.location.href = '/member/changeAccountForceRedirect.htm?returnUrl=' + e._$str2b64(t);
    };
    a._$login = function () {
      if (!n.webUser || !n.webUser.id) {
        if (o._$isWap() && t.isEn()) {
          var i = document.querySelector('#wap-course-intro-nav');
          var a = i && i.querySelector('span');
          a && a.click();
          return;
        }
        var r = e._$str2b64(location.href);
        var s = '/member/login.htm?returnUrl=' + r;
        n.location.href = s;
      }
    };
    a._$getLoginTypeText = function (e) {
      if (11 == e) return '爱课程网';
      else if (1 == e) return '有道笔记';
      else if (2 == e) return '新浪微博';
      else if (3 == e) return '人人网';
      else if (4 == e) return '腾讯QQ';
      else if (20 == e) return '企业';
      else if (7 == e) return '教务系统';
      else if (8 == e) return '手机';
      else if (6 == e) return '微信';
      else if (90 == e) return 'Google';
      else return '网易邮箱';
    };
    return a;
  },
  'c23a9d4e237326dadfa12366ae1b6e48',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fe86216ed59e3103a56c42c850d389f0',
  '93828627ddb358ed890cb65967a0c1de',
);
