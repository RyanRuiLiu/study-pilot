EDU(
  '89b93e863cc28cb6585df6be96082031',
  function (e) {
    var t = NEJ.P('edu.d'),
      i = NEJ.P('nej.u'),
      n = i._$randNumberString();
    t._$$COM_Cache_ScoreAppealCache = NEJ.C();
    var a = t._$$COM_Cache_ScoreAppealCache._$extend(t._$$COM_Cache);
    a._$getAppealStatus = function (t, i, n, a) {
      e._$request({
        url: '/mm-tiku/web/j/mocCertScoreAppealBean.getAppealStatus.rpc',
        method: 'POST',
        data: JSON.stringify({ bizType: t, bizId: i }),
        isNeedAuth: !0,
        notShowLoading: !0,
        onload: n || this.__onGetAppealStatus._$bind(this),
        onerror: a || this.__onGetAppealStatusError._$bind(this),
      });
    };
    a.__onGetAppealStatus = function (e) {
      this._$dispatchEvent('onGetAppealStatus', e);
    };
    a.__onGetAppealStatusError = function (e) {
      this._$dispatchEvent('onGetAppealStatusError', e);
    };
    a._$submitAppeal = function (t, i, n, a, o) {
      e._$request({
        url: '/mm-tiku/web/j/mocCertScoreAppealBean.submitAppeal.rpc',
        method: 'POST',
        data: JSON.stringify({ bizType: t, bizId: i, appealReason: n }),
        isNeedAuth: !0,
        onload: a || this.__onSubmitAppeal._$bind(this),
        onerror: o || this.__onSubmitAppealError._$bind(this),
      });
    };
    a.__onSubmitAppeal = function (e) {
      this._$dispatchEvent('onSubmitAppeal', e);
    };
    a.__onSubmitAppealError = function (e) {
      this._$dispatchEvent('onSubmitAppealError', e);
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
