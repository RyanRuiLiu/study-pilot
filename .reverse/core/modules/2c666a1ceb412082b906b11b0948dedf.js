EDU(
  '2c666a1ceb412082b906b11b0948dedf',
  function (e, t, n) {
    var i = NEJ.O,
      o = NEJ.P('nej.j'),
      a = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      s = a._$randNumberString(),
      c,
      d = 'ck-quizCache';
    r._$$COM_Cache_QuizCache = NEJ.C();
    c = r._$$COM_Cache_QuizCache._$extend(r._$$COM_Cache_TestBaseCache);
    c._$getPreviewQuizList = function (e) {
      this._$postDWR({
        key: d + s,
        url: 'MocAdminQuizBean.previewTestDraft',
        param: [e],
        onload: this.__onGetPreviewQuizList._$bind(this),
      });
    };
    c.__onGetPreviewQuizList = function (e) {
      try {
        if (e.subjectiveQList)
          e.subjectiveQList.forEach(function (e) {
            e.description = n._$formateImagePrefix(e.description);
            e.plainTextTitle = n._$formateImagePrefix(e.plainTextTitle);
            e.title = n._$formateImagePrefix(e.title);
          });
      } catch (t) {}
      this._$dispatchEvent('onGetPreviewQuizList', e);
    };
    c._$getQuizPaperList = function (e, t, n) {
      this._$postDWR({
        key: d + s,
        url: 'MocQuizBean.getQuizPaperDto',
        param: [e, t, n],
        onload: this.__onGetQuizPaperList._$bind(this),
      });
    };
    c._$getOpenQuizPaperList = function (e, n, i, o) {
      console.log('appid', o);
      t._$request({
        url: '/web/j/mocQuizRpcBean.getOpenQuizPaperDto.rpc',
        method: 'POST',
        data: JSON.stringify({ tid: e, aid: n, withStdAnswerAndAnalyse: i, appId: o }),
        isNeedAuth: !0,
        onload: this.__onGetQuizPaperList._$bind(this),
      });
    };
    c.__onGetQuizPaperList = function (e) {
      try {
        if (e.subjectiveQList)
          e.subjectiveQList.forEach(function (e) {
            e.judgerules = n._$formateImagePrefix(e.judgerules);
            e.title = n._$formateImagePrefix(e.title);
            if (e.judgeDtos)
              e.judgeDtos.forEach(function (e) {
                e.msg = n._$formateImagePrefix(e.msg);
              });
          });
        if (e.objectiveQList)
          e.objectiveQList.forEach(function (e) {
            e.optionsDetail = n._$formateImagePrefix(e.optionsDetail);
            e.title = n._$formateImagePrefix(e.title);
            if (e.optionDtos)
              e.optionDtos.forEach(function (e) {
                e.content = n._$formateImagePrefix(e.content);
              });
          });
      } catch (t) {}
      this._$dispatchEvent('onGetQuizPaperList', e);
    };
    c._$getQuizInfo = function (e, n, i) {
      t._$request({
        url: '/web/j/mocQuizRpcBean.getQuizInfo.rpc',
        method: 'POST',
        data: JSON.stringify({ tid: e, targetAid: n, isDraft: i }),
        isNeedAuth: !0,
        onload: this.__onGetQuizInfo._$bind(this),
      });
    };
    c.__onGetQuizInfo = function (e) {
      this._$dispatchEvent('onGetQuizInfo', e);
    };
    c._$getOpenQuizInfo = function (e, n, i, o) {
      console.log('appid', o);
      t._$request({
        url: '/web/j/mocQuizRpcBean.getOpenQuizInfo.rpc',
        method: 'POST',
        data: JSON.stringify({ tid: e, targetAid: n, isDraft: i, appId: o }),
        isNeedAuth: !0,
        onload: this.__onGetOpenQuizInfo._$bind(this),
      });
    };
    c.__onGetOpenQuizInfo = function (e) {
      this._$dispatchEvent('onGetOpenQuizInfo', e);
    };
    c._$getSwitchCount = function (e, n) {
      console.log('每次弹窗获取切换次数');
      t._$request({
        url: '//www.icourse163.org/mm-tiku/web/j/mocTestTraceBean.getSwitchPageTrace.rpc',
        method: 'post',
        data: e,
        onload: n,
      });
    };
    c._$saveTrace = function (e, n) {
      t._$request({
        url: '//www.icourse163.org/mm-tiku/web/j/mocTestTraceBean.saveTrace.rpc',
        method: 'post',
        data: e,
      });
    };
    c._$getCurServerTimeByFetch = function (e) {
      t._$request({
        url: '/web/j/timeRpcBean.currentTime.rpc',
        method: 'post',
        onload: e,
        notShowLoading: !0,
      });
    };
    c._$getMocPaperDtoForAI = function (e, n) {
      t._$request({
        url: '/web/j/mocAdminQuizBean.getMocPaperDtoForAI.rpc ',
        method: 'post',
        data: { tid: e },
        onload: n,
        notShowLoading: !0,
      });
    };
    c._$assistantHeart = function (e) {
      t._$request({
        url: '/mm-course/web/j/mocAiAssistantBean.heartBeat.rpc',
        method: 'post',
        data: { pageType: e },
      });
    };
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'acced775bc5869338f7c0bac9a90ba4a',
  'fe86216ed59e3103a56c42c850d389f0',
);
