EDU(
  'c30079064832c51159d1cf37ab222277',
  function (e, t) {
    t._$saveCommonData = function (t, n) {
      e._$request({ url: '/web/j/commonBean.addOrUpdate.rpc', method: 'post', data: t, onload: n });
    };
    t._$getCommonData = function (t, n, i) {
      e._$request({
        url: '/web/j/commonBean.obtain.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
      });
    };
    t._$getUrlImageByUrl = function (t, n) {
      e._$request({
        url: '/web/j/mocActivityRpcBean.getUrlImageByUrl.rpc',
        method: 'post',
        data: t,
        notShowLoading: !0,
        onload: n,
      });
    };
    t._$getCategByType = function (t, n) {
      e._$request({
        url: '/web/j/mocCourseCategoryBean.getCategByType.rpc',
        method: 'post',
        data: t,
        notShowLoading: !0,
        onload: n,
      });
    };
    t._$getCategTypeAndFirstGradeCateg = function (t, n) {
      e._$request({
        url: '/web/j/mocCourseCategoryAdminBean.getCategTypeAndFirstGradeCateg.rpc',
        method: 'post',
        data: t,
        notShowLoading: !0,
        onload: n,
      });
    };
    t._$getNewUserSubsidiesCoupon = function (t, n) {
      e._$request({
        url: '/web/j/mocCouponBean.getNewUserSubsidiesCoupon.rpc',
        method: 'post',
        data: t,
        notShowLoading: !0,
        onload: n,
      });
    };
    t._$getVideoToken = function (t, n) {
      var i =
        void 0 != t.isNewVideoToken
          ? '/web/j/resourceRpcBean.getResourceToken.rpc'
          : '/web/j/resourceRpcBean.getVideoToken.rpc';
      delete t.isNewVideoToken;
      e._$request({ url: i, method: 'post', data: t, onload: n, notShowLoading: !0 });
    };
    t._$getUserIdAlreadyBindedStatus = function (t, n) {
      e._$request({
        url: '/web/j/weChatMessageRpcBean.getUserIdAlreadyBindedStatus.rpc ',
        method: 'post',
        data: t,
        notShowLoading: !0,
        onload: n,
      });
    };
    t._$getMocMember = function (t, n) {
      e._$request({
        url: '/web/j/memberBean.getMocMember.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$updateMemberEmailAndRealName = function (t, n) {
      e._$request({
        url: '/web/j/memberBean.updateMemberEmailAndRealName.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$getDgSchoolList = function (t) {
      e._$request({
        url: '//www.icourse163.org/web/j/commonBean.obtain.rpc',
        data: { key: 'web_config_key_dongguan_school' },
        onload: t,
      });
    };
    t._$getMocCertifiedPopDto = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/mm-course/web/j/mocTermCertifiedBean.getMocCertifiedPopDto.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$getPhoneBindPopupStatus = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/web/j/memberAccountBean.getPhoneBindPopupStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$getMobToken = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/passport/reg/getMobToken.do',
        method: 'get',
        onload: n,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
