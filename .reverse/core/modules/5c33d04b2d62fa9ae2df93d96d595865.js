EDU(
  '5c33d04b2d62fa9ae2df93d96d595865',
  function (e) {
    var t = window,
      n = NEJ.P('nej.u'),
      i = NEJ.P('nej.j'),
      o = NEJ.P('edu.u');
    o._$getWebUser = e._$getWebUser;
    o._$isUserOwner = e._$isUserOwner;
    o._$isUserLogin = function () {
      return !!(i._$cookie('STUDY_INFO') || i._$cookie('STUDY_SESS') || i._$cookie('NTES_SESS'));
    };
    o._$hasMemberRole = function (e) {
      return o._$arrContains(o._$getWebUser().roles, e || '');
    };
    o._$hasOneMemberRole = function (e) {
      var t = !1;
      if (!n._$isArray(e)) return o._$hasMemberRole(e);
      n._$forEach(
        e,
        function (e) {
          if (o._$hasMemberRole(e)) t = !0;
        }._$bind(this),
      );
      return t;
    };
    o._$getMyCenterURL = function () {
      var e = '';
      if (t.webUser) e = t.webUser.personalUrlPrefix + t.webUser.personalUrlSuffix;
      return e;
    };
    o._$getLoginType = function () {
      var e = { name: '', pwdUrl: '' };
      if (t.webUser && t.webUser.loginType) {
        var n = parseInt(t.webUser.loginType);
        switch (n) {
          case o.CONST.LOGIN_TYPE_URS:
            e.name = '网易邮箱';
            e.pwdUrl = '//reg.163.com/setinfo/ChangePasswd_1.jsp?username=' + t.webUser.loginId;
            break;
          case o.CONST.LOGIN_TYPE_PHONE:
            e.name = '手机';
            e.pwdUrl = '//mob.163.com/web/passwdfind';
            break;
          case o.CONST.LOGIN_TYPE_ICOURSE:
            e.name = '爱课程网';
            e.pwdUrl = 'http://www.icourses.cn/web/sword/portal/toFindPwd';
            break;
          case o.CONST.LOGIN_TYPE_WEIBO:
            e.name = '新浪微博';
            e.pwdUrl = '//account.weibo.com/settings/password';
            break;
          case o.CONST.LOGIN_TYPE_RENREN:
            e.name = '人人网';
            e.pwdUrl = '//safe.renren.com/security/account#nogo';
            break;
          case o.CONST.LOGIN_TYPE_QQ:
            e.name = 'QQ';
            e.pwdUrl = '//aq.qq.com/cn2/change_psw/pc/pc_change_pwd_way';
            break;
          case o.CONST.GOOGLE:
            e.name = '谷歌账号';
            e.pwdUrl = '';
        }
      }
      return e;
    };
    o._$getUserMail = function () {
      var e = '';
      var t = o._$getWebUser();
      if (t)
        switch (Number(t.loginType)) {
          case o.CONST.LOGIN_TYPE_URS:
            e = t.loginId || '';
            break;
          case o.CONST.LOGIN_TYPE_ICOURSE:
          case o.CONST.LOGIN_TYPE_WEIBO:
          case o.CONST.LOGIN_TYPE_RENREN:
          case o.CONST.LOGIN_TYPE_QQ:
            e = t.email || '';
        }
      return e;
    };
    o._$isUserBanned = function () {
      return !!t.bannedState && (t.bannedState.site > 0 || t.bannedState.term > 0);
    };
    o._$getUserShowInfo = function (e) {
      var t = '';
      if (e) {
        var i = e.member || {};
        var o = e.mocSchool || {};
        var a = e.verifiedStudent || {};
        t =
          n._$escape(i.nickName || '') +
          (o.shortName ? '_' + (o.shortName || '') : '') +
          (i.realName ? '_' + (i.realName || '') : '') +
          (a.number ? '_' + (a.number || '') : '');
      }
      return t;
    };
    o._$isForumManager = function () {
      return !!o._$hasMemberRole(o.CONST.ROLE_FORUM_MANAGER);
    };
    return o;
  },
  'ecc0bbe3c8ad6be8c2cd6f2cc1afe656',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '93828627ddb358ed890cb65967a0c1de',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
