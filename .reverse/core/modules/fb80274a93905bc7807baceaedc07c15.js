EDU(
  'fb80274a93905bc7807baceaedc07c15',
  function (e) {
    var t = NEJ.O,
      n = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      o = NEJ.P('edu.d'),
      a = i._$randNumberString(),
      r,
      s = 'ck-commonCache';
    o._$$COM_Cache_commonCache = NEJ.C();
    r = o._$$COM_Cache_commonCache._$extend(o._$$COM_Cache);
    r._$checkCaptcha = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CaptchaBean.checkCaptchaCode',
        notShowLoading: !0,
        sync: !0,
        param: [e, t],
        onload: this.__onCheckCaptcha._$bind(this),
      });
    };
    r.__onCheckCaptcha = function (e) {
      this._$dispatchEvent('onCheckCaptcha', e);
    };
    r._$checkMoocLogo = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.obtain',
        notShowLoading: !0,
        param: [e],
        onload: this.__onCheckMoocLogo._$bind(this),
      });
    };
    r.__onCheckMoocLogo = function (e) {
      this._$dispatchEvent('onCheckMoocLogo', e);
    };
    r._$setCommonBean = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.save',
        notShowLoading: !0,
        param: [e, t],
        onload: this.__onSetCommonBean._$bind(this),
      });
    };
    r.__onSetCommonBean = function (e) {
      this._$dispatchEvent('onSetCommonBean', e);
    };
    r._$getCommonBean = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.obtain',
        notShowLoading: !0,
        param: [e],
        onload: this.__onGetCommonBean._$bind(this),
      });
    };
    r.__onGetCommonBean = function (e) {
      this._$dispatchEvent('onGetCommonBean', e);
    };
    r._$checkActivitySetting = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.obtain',
        notShowLoading: !0,
        param: [e],
        onload: this.__onCheckActivitySetting._$bind(this),
      });
    };
    r.__onCheckActivitySetting = function (e) {
      this._$dispatchEvent('onCheckActivitySetting', e);
    };
    r._$checkSSOError = function () {
      n._$request('/passport/checkSSOError.do', { onload: this.__onCheckSSOError._$bind(this) });
    };
    r.__onCheckSSOError = function (e) {
      this._$dispatchEvent('onCheckSSOError', e);
    };
    r._$wxGetTicket = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocWeixinBean.getWeixinConfig',
        param: [e],
        onload: this.__onWxGetTicket._$bind(this),
        notShowLoading: !0,
      });
    };
    r.__onWxGetTicket = function (e) {
      this._$dispatchEvent('onWxGetTicket', e);
    };
    r._$getActivitySignAndEnrollStatus = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.getActivitySignAndEnrollStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$signActivity = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.signActivity.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$getTopAndLowerRightCornerBar = function (t, n) {
      e._$request({
        url: '/web/j/indexBeanV3.getTopAndLowerRightCornerBar.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$getActivityTime = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityShareRpcBean.getActivityTime.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$addGaLog = function (t) {
      e._$request({
        url: '//log.study.163.com/__utm.gif',
        method: 'get',
        data: t,
        notShowLoading: !0,
        hideError: !0,
      });
    };
    r._$hasOfflineClassroom = function (t) {
      e._$request({
        url: '//www.icourse163.org/mm-classroom/web/j/mocTermClassroomRpcBean.hasOfflineClassroom.rpc',
        method: 'post',
        onload: t,
        cookie: !0,
      });
    };
    r._$memberVerify = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/web/j/MocSchoolBean.memberVerify.rpc',
        method: 'post',
        data: t,
        notShowLoading: !0,
        onload: n,
        cookie: !0,
      });
    };
    r._$getWeixinConfig = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/web/j/mocWeixinBean.getWeixinConfig.rpc',
        method: 'post',
        data: t,
        onload: n,
        cookie: !0,
        notShowLoading: !0,
      });
    };
    r._$refreshStudyCookie = function (e) {
      cache._$request({
        url: 'https://study.163.com/passport/member/refresh.do',
        method: 'GET',
        onload: e,
      });
    };
    r._$GetCertificationRightsDto = function (t, n) {
      e._$request({
        url: '/web/j/memberRightsBean.getLearnModeRightsDto.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$selectLearnMode = function (t, n) {
      e._$request({
        url: '/web/j/courseBean.selectLearnMode.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '8a864b627c302d7d1c56bd928b515d1b',
  'fe86216ed59e3103a56c42c850d389f0',
);
