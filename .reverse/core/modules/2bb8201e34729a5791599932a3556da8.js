EDU(
  '2bb8201e34729a5791599932a3556da8',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('nej.j'),
      r = NEJ.P('edu.u');
    r._$getWebUser = e._$getWebUser;
    r._$isUserOwner = e._$isUserOwner;
    r._$isUserLogin = function () {
      return a._$cookie('STUDY_INFO') || a._$cookie('STUDY_SESS') || a._$cookie('NTES_SESS');
    };
    r._$hasMemberRole = function (e) {
      return r._$arrContains(r._$getWebUser().roles, e || '');
    };
    r._$hasMemberRoleInCurrentSchool = function (e) {
      return e === t.memberInSchoolRole;
    };
    r._$hasOneMemberRole = function (e) {
      var t = !1;
      if (!o._$isArray(e)) return r._$hasMemberRole(e);
      o._$forEach(
        e,
        function (e) {
          if (r._$hasMemberRole(e)) t = !0;
        }._$bind(this),
      );
      return t;
    };
    r._$getMyCenterURL = function () {
      var e = '';
      if (t.webUser) e = t.webUser.personalUrlPrefix + t.webUser.personalUrlSuffix;
      return e;
    };
    r._$getLoginType = function () {
      var e = { name: '', pwdUrl: '' };
      if (t.webUser && t.webUser.loginType) {
        var n = parseInt(t.webUser.loginType);
        switch (n) {
          case r.CONST.LOGIN_TYPE_URS:
            e.name = '网易邮箱';
            e.pwdUrl = '//reg.163.com/setinfo/ChangePasswd_1.jsp?username=' + t.webUser.loginId;
            break;
          case r.CONST.LOGIN_TYPE_PHONE:
            e.name = '手机';
            e.pwdUrl = '//mob.163.com/web/passwdfind';
            break;
          case r.CONST.LOGIN_TYPE_ICOURSE:
            e.name = '爱课程网';
            e.pwdUrl = 'http://www.icourses.cn/web/sword/portal/toFindPwd';
            break;
          case r.CONST.LOGIN_TYPE_WEIBO:
            e.name = '新浪微博';
            e.pwdUrl = '//account.weibo.com/settings/password';
            break;
          case r.CONST.LOGIN_TYPE_RENREN:
            e.name = '人人网';
            e.pwdUrl = '//safe.renren.com/security/account#nogo';
            break;
          case r.CONST.LOGIN_TYPE_QQ:
            e.name = 'QQ';
            e.pwdUrl = '//aq.qq.com/cn2/change_psw/pc/pc_change_pwd_way';
        }
      }
      return e;
    };
    r._$getUserMail = function () {
      var e = '';
      var t = r._$getWebUser();
      if (t)
        switch (Number(t.loginType)) {
          case r.CONST.LOGIN_TYPE_URS:
            e = t.loginId || '';
            break;
          case r.CONST.LOGIN_TYPE_ICOURSE:
          case r.CONST.LOGIN_TYPE_WEIBO:
          case r.CONST.LOGIN_TYPE_RENREN:
          case r.CONST.LOGIN_TYPE_QQ:
            e = t.email || '';
        }
      return e;
    };
    r._$isUserBanned = function () {
      return !!t.bannedState && (t.bannedState.site > 0 || t.bannedState.term > 0);
    };
    r._$getUserShowInfo = function (e) {
      var t = '';
      if (e) {
        var n = e.member || {};
        var i = e.mocSchool || {};
        var a = e.verifiedStudent || {};
        t =
          o._$escape(n.nickName || '') +
          (i.shortName ? '_' + (i.shortName || '') : '') +
          (n.realName ? '_' + (n.realName || '') : '') +
          (a.number ? '_' + (a.number || '') : '');
      }
      return t;
    };
    r._$isForumManager = function () {
      return !!r._$hasMemberRole(r.CONST.ROLE_FORUM_MANAGER);
    };
    return r;
  },
  'ecc0bbe3c8ad6be8c2cd6f2cc1afe656',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'e165f785e63c4ac5e3c5e01d85b415f7',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'f0b73688b257e4ee4d3a3fafef7aafc1',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
