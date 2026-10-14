EDU(
  '9404c0406a53242cb88cc30ecf858b38',
  function (e, t, n) {
    var i = NEJ.O,
      o = NEJ.P('nej.j'),
      a = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      c = a._$randNumberString(),
      d,
      l = 'ck-HomeworkCacheCache';
    r._$$COM_Cache_HomeworkCache = NEJ.C();
    d = r._$$COM_Cache_HomeworkCache._$extend(r._$$COM_Cache_TestBaseCache);
    d._$getHomeworkInfo = function (e, n, i) {
      t._$request({
        url: '/web/j/mocQuizRpcBean.getHomeworkInfo.rpc',
        method: 'POST',
        data: JSON.stringify({ tid: e, aid: n, isDraft: i }),
        isNeedAuth: !0,
        onload: this.__onGetHomeworkInfo._$bind(this),
      });
    };
    d.__onGetHomeworkInfo = function (e) {
      console.log('getHomeworkInfo data', e);
      this._$dispatchEvent('onGetHomeworkInfo', e);
    };
    d._$getOpenHomeworkInfo = function (e, n, i, o) {
      console.log('appid', o);
      t._$request({
        url: '/web/j/mocQuizRpcBean.getOpenHomeworkInfo.rpc',
        method: 'POST',
        data: JSON.stringify({ tid: e, aid: n, isDraft: i, appId: o }),
        isNeedAuth: !0,
        onload: this.__onGetOpenHomeworkInfo._$bind(this),
      });
    };
    d.__onGetOpenHomeworkInfo = function (e) {
      this._$dispatchEvent('onGetOpenHomeworkInfo', e);
    };
    d._$getHomeworkPaper = function (e, t, n, i, o, a) {
      var r = a ? 'MocAdminQuizBean.previewTestDraft' : 'MocQuizBean.getHomeworkPaperDto';
      var s = a ? [e] : [e, t, n, i, o];
      this._$postDWR({
        key: l + c,
        url: r,
        param: s,
        onload: this.__onGetHomeworkPaper._$bind(this),
      });
    };
    d._$getOpenHomeworkPaper = function (e, n, i, o, a, r, s) {
      console.log('appid', s);
      var d = 'MocAdminQuizBean.previewTestDraft';
      var u = [e];
      if (r)
        this._$postDWR({
          key: l + c,
          url: d,
          param: u,
          onload: this.__onGetHomeworkPaper._$bind(this),
        });
      else
        t._$request({
          url: '/web/j/mocQuizRpcBean.getOpenHomeworkPaperDto.rpc',
          method: 'POST',
          data: JSON.stringify({
            tid: e,
            evaluateId: n,
            withStdAnswerAndAnalyse: i,
            phase: o,
            aid: a,
            appId: s,
          }),
          isNeedAuth: !0,
          onload: this.__onGetHomeworkPaper._$bind(this),
        });
    };
    d.__onGetHomeworkPaper = function (t) {
      try {
        if (t.subjectiveQList)
          t.subjectiveQList.forEach(function (e) {
            e.description = n._$formateImagePrefix(e.description);
            e.plainTextTitle = n._$formateImagePrefix(e.plainTextTitle);
            e.title = n._$formateImagePrefix(e.title);
            if (e.judgeDtos)
              e.judgeDtos.forEach(function (e) {
                e.msg = n._$formateImagePrefix(e.msg);
              });
          });
        if (t.answers)
          t.answers.forEach(function (e) {
            if (e.content.content) e.content.content = n._$formateImagePrefix(e.content.content);
          });
      } catch (i) {}
      console.log('_gethomeworkdto', t);
      this._$dispatchEvent('onGetHomeworkPaper', t);
      if (
        t.submitStatus == s.CONST.HW_STATUS_SUBMITTED ||
        (t.deadline && s._$getCurServerTime() > t.deadline)
      ) {
        window.learnUtilQuestionList = e._$getQuestionList(t);
        e._$renderGLobalAIButton(
          {
            pageType: e._$getPageType(),
            sceneType: e.SCENE_TYPE.QUIZ,
            termId: window.termDto && window.termDto.id,
            courseId: window.courseDto && window.courseDto.id,
            courseName: window.courseDto && window.courseDto.name,
            qid: t.tid,
            questions: learnUtilQuestionList,
          },
          document.querySelector('#j-global-ai-robot'),
        );
      } else {
        var o = document.querySelector('#j-global-ai-robot');
        o && o.classList.add('f-dn');
      }
    };
    d._$getEvaluateStatus = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocEvaluateBean.getEvaluateStatus',
        param: [e, t],
        onload: this.__onGetEvaluateStatus._$bind(this),
      });
    };
    d.__onGetEvaluateStatus = function (e) {
      this._$dispatchEvent('onGetEvaluateStatus', e);
    };
    d._$getEvaluateStatusByAid = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocEvaluateBean.getEvaluateStatusByAid',
        param: [e, t],
        onload: this.__onGetEvaluateStatusByAid._$bind(this),
      });
    };
    d.__onGetEvaluateStatusByAid = function (e) {
      this._$dispatchEvent('onGetEvaluateStatusByAid', e);
    };
    d._$getEvaluateDetail = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocEvaluateBean.getEvaluateDetail',
        param: [e, t],
        onload: this.__onGetEvaluateDetail._$bind(this),
      });
    };
    d.__onGetEvaluateDetail = function (e) {
      this._$dispatchEvent('onGetEvaluateDetail', e);
    };
    d._$getNextEvaluate = function (e, t, n) {
      this._$postDWR({
        key: l + c,
        url: 'MocEvaluateBean.startOneSubmissionEvaluate',
        param: [e, t],
        onload: this.__onGetNextEvaluate._$bind(this, n),
      });
    };
    d.__onGetNextEvaluate = function (e, t) {
      this._$dispatchEvent('onGetNextEvaluate', t, e);
    };
    d._$getSelfEvaluate = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocEvaluateBean.startSelfSubmissionEvaluate',
        param: [e, t],
        onload: this.__onGetSelfEvaluate._$bind(this),
      });
    };
    d.__onGetSelfEvaluate = function (e) {
      this._$dispatchEvent('onGetSelfEvaluate', e);
    };
    d._$submitEvaluate = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocEvaluateBean.submitSubmissionEvaluate',
        param: [e, t],
        onload: this.__onSubmitEvaluate._$bind(this, t),
      });
    };
    d.__onSubmitEvaluate = function (e, t) {
      if (e) this._$dispatchEvent('onSaveEvaluate', t);
      else this._$dispatchEvent('onSubmitEvaluate', t);
    };
    d._$getTrainPaper = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocAdminQuizBean.getEvaluateTrain',
        param: [e, t || !1],
        onload: this.__onGetTrainPaper._$bind(this),
      });
    };
    d.__onGetTrainPaper = function (e) {
      this._$dispatchEvent('onGetTrainPaper', e);
    };
    d._$saveTrainedRecord = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocEvaluateBean.saveTrainedRecord',
        param: [e, t],
        onload: this.__onSaveTrainedRecord._$bind(this),
      });
    };
    d.__onSaveTrainedRecord = function (e) {
      this._$dispatchEvent('onSaveTrainedRecord', e);
    };
    d._$getHomeworkEvalInfo = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocQuizBean.getHomeworkEvalInfo',
        param: [e, t],
        onload: this.__onGetHomeworkEvalInfo._$bind(this),
      });
    };
    d.__onGetHomeworkEvalInfo = function (e) {
      this._$dispatchEvent('onGetHomeworkEvalInfo', e);
    };
    d._$deleteAttachment = function (e, t) {
      this._$postDWR({
        key: l + c,
        url: 'MocQuizBean.deleteAttachment',
        param: [e, t],
        onload: this.__onDeleteAttachment._$bind(this),
      });
    };
    d.__onDeleteAttachment = function (e) {
      this._$dispatchEvent('onDeleteAttachment', e);
    };
    d._$assistantHeart = function (e) {
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
