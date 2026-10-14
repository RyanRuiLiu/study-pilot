EDU(
  '054e11477ebcfe742d44b029e7994471',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      r,
      s = 'ck-examCreateCache';
    i._$$COM_Cache_ExamCreateCache = NEJ.C();
    r = i._$$COM_Cache_ExamCreateCache._$extend(i._$$COM_Cache);
    r._$manageExamDraft = function (e, t) {
      var n = t;
      if (400 == t) n = 200;
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.manageExamDraft',
        param: [e, n],
        onload: this.__onManageExamDraft._$bind(this, t),
      });
    };
    r.__onManageExamDraft = function (e, t) {
      this._$dispatchEvent('onManageExamDraft', e, t);
    };
    r._$publishExamDraft = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.publishExamDraft',
        param: [e, t, n],
        onload: this.__onPublishExamDraft._$bind(this),
      });
    };
    r.__onPublishExamDraft = function (e) {
      this._$dispatchEvent('onPublishExamDraft', e);
    };
    r._$manageExamTestDraft = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'MocAdminQuizBean.manageExamTestDraft',
        param: [e, t, n],
        onload: this.__onManageExamTestDraft._$bind(this, t),
      });
    };
    r.__onManageExamTestDraft = function (e, t) {
      this._$dispatchEvent('onManageExamTestDraft', e, t);
    };
    r._$getExamDraft = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MocAdminQuizBean.getExamDraft',
        param: [e, t],
        onload: this.__onGetExamDraft._$bind(this),
      });
    };
    r.__onGetExamDraft = function (e) {
      this._$dispatchEvent('onGetExamDraft', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
