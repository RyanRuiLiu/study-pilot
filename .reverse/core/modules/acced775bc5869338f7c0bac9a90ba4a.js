EDU(
  'acced775bc5869338f7c0bac9a90ba4a',
  function (e) {
    var t = NEJ.O,
      n = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      o = NEJ.P('edu.d'),
      a = i._$randNumberString(),
      r,
      s = 'ck-testBaseCache';
    o._$$COM_Cache_TestBaseCache = NEJ.C();
    r = o._$$COM_Cache_TestBaseCache._$extend(o._$$COM_Cache);
    r._$saveDraftAnswers = function (t, n, i) {
      e._$request({
        url: '/web/j/mocQuizRpcBean.saveDraftAnswers.rpc',
        method: 'post',
        data: JSON.stringify({ paperDto: t, preview: n }),
        isNeedAuth: !0,
        notShowLoading: !i,
        onload: this.__onSaveDraftAnswers._$bind(this, i),
      });
    };
    r.__onSaveDraftAnswers = function (e, t) {
      this._$dispatchEvent('onSaveDraftAnswers', t, e);
    };
    r._$submitAnswers = function (t, n) {
      try {
        t.answers.forEach(function (e) {
          e.content.content = e.content.content.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
        });
      } catch (i) {}
      e._$request({
        url: '/web/j/mocQuizRpcBean.submitAnswers.rpc',
        method: 'post',
        data: JSON.stringify({ paperDto: t, preview: n }),
        isNeedAuth: !0,
        onload: this.__onSubmitAnswers._$bind(this),
      });
    };
    r.__onSubmitAnswers = function (e) {
      this._$dispatchEvent('onSubmitAnswers', e);
    };
    r._$getTutorialinfo = function () {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.getMocMemberTutorialInfo',
        param: [],
        onload: this.__onGetMocMemberTutorialInfo._$bind(this),
      });
    };
    r.__onGetMocMemberTutorialInfo = function (e) {
      this._$dispatchEvent('onGetMocMemberTutorialInfo', e);
    };
    r._$setTutorialinfo = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.setMocMemberTutorialInfo',
        param: [e, t],
        onload: this.__onSetMocMemberTutorialInfo._$bind(this),
      });
    };
    r.__onSetMocMemberTutorialInfo = function (e) {
      this._$dispatchEvent('onSetMocMemberTutorialInfo', e);
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  'fe86216ed59e3103a56c42c850d389f0',
);
