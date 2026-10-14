EDU(
  '1159ecd0d791cfc03337b9f9188abac0',
  function (e, t) {
    var i = NEJ.O,
      n = NEJ.P('nej.j'),
      a = NEJ.P('nej.u'),
      o = NEJ.P('edu.d'),
      s = a._$randNumberString(),
      r,
      c = 'ck-OJCacheCache';
    o._$$COM_Cache_OJCache = NEJ.C();
    r = o._$$COM_Cache_OJCache._$extend(o._$$COM_Cache);
    r._$getOJPaperInfo = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.getOJPaperInfo',
        param: [e, t, i],
        onload: this.__ongetOJPaperInfo._$bind(this),
      });
    };
    r.__ongetOJPaperInfo = function (e) {
      this._$dispatchEvent('ongetOJPaperInfo', e);
    };
    r._$getOJPaperDto = function (e, t, i) {
      var n = i ? 'MocAdminQuizBean.previewTestDraft' : 'YocOJQuizBean.getOJPaperDto';
      var a = i ? [e] : [e, t];
      this._$postDWR({ key: c + s, url: n, param: a, onload: this.__ongetOJPaperDto._$bind(this) });
    };
    r.__ongetOJPaperDto = function (i) {
      try {
        if (i.subjectiveQList)
          i.subjectiveQList.forEach(function (e) {
            e.description = t._$formateImagePrefix(e.description);
            e.plainTextTitle = t._$formateImagePrefix(e.plainTextTitle);
            e.title = t._$formateImagePrefix(e.title);
          });
      } catch (n) {}
      this._$dispatchEvent('ongetOJPaperDto', i);
      if (
        i.submitStatus == eu.CONST.HW_STATUS_SUBMITTED ||
        (i.deadline && eu._$getCurServerTime() > i.deadline)
      ) {
        window.learnUtilQuestionList = e._$getQuestionList(i);
        e._$renderGLobalAIButton(
          {
            pageType: e._$getPageType(),
            sceneType: e.SCENE_TYPE.QUIZ,
            termId: window.termDto && window.termDto.id,
            courseId: window.courseDto && window.courseDto.id,
            courseName: window.courseDto && window.courseDto.name,
            qid: i.tid,
            questions: learnUtilQuestionList,
          },
          document.querySelector('#j-global-ai-robot'),
        );
      } else {
        var a = document.querySelector('#j-global-ai-robot');
        a && a.classList.add('f-dn');
      }
    };
    r._$submitSingleAnswer = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.submitSingleAnswer',
        param: [e, t, i],
        onload: this.__onsubmitSingleAnswer._$bind(this),
      });
    };
    r.__onsubmitSingleAnswer = function (e) {
      this._$dispatchEvent('onsubmitSingleAnswer', e);
    };
    r._$getThreadStatusByThreadId = function (e, t) {
      this._$postDWR({
        key: c + s,
        notShowLoading: !0,
        url: 'YocOJQuizBean.getThreadStatusByThreadId',
        param: [e, t],
        onload: this.__ongetThreadStatusByThreadId._$bind(this),
      });
    };
    r.__ongetThreadStatusByThreadId = function (e) {
      this._$dispatchEvent('ongetThreadStatusByThreadId', e);
    };
    r._$getOJPaperInfo = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.getOJPaperInfo',
        param: [e, t, i],
        onload: this.__ongetOJPaperInfo._$bind(this),
      });
    };
    r.__ongetOJPaperInfo = function (e) {
      this._$dispatchEvent('ongetOJPaperInfo', e);
    };
    r._$getOjSubmitRecords = function (e, t) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.getOjQuestionSubmitRecords',
        param: [e, t],
        onload: this.__ongetOjSubmitRecords._$bind(this),
      });
    };
    r.__ongetOjSubmitRecords = function (e) {
      this._$dispatchEvent('ongetOjSubmitRecords', e);
    };
    r._$adminGetOjSubmitRecords = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.adminGetOjQuestionSubmitRecords',
        param: [e, t, i],
        onload: this.__ongetOjSubmitRecords._$bind(this),
      });
    };
    r.__onadminGetOjSubmitRecords = function (e) {
      this._$dispatchEvent('onadminGetOjSubmitRecords', e);
    };
    r._$submitOjPaper = function (e) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.submitOjPaper',
        param: [e],
        onload: this.__onsubmitOjPaper._$bind(this),
      });
    };
    r.__onsubmitOjPaper = function (e) {
      this._$dispatchEvent('onsubmitOjPaper', e);
    };
    r._$submitPreviewSingleAnswer = function (e, t) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.submitPreviewSingleAnswer',
        param: [e, t],
        onload: this.__onsubmitPreviewSingleAnswer._$bind(this),
      });
    };
    r.__onsubmitPreviewSingleAnswer = function (e) {
      this._$dispatchEvent('onsubmitPreviewSingleAnswer', e);
    };
    r._$viewOJData = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.viewOJData',
        param: [e, t, !i],
        onload: this.__onviewOJData._$bind(this, i),
      });
    };
    r.__onviewOJData = function (e, t) {
      this._$dispatchEvent('onviewOJData', t, e);
    };
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fe86216ed59e3103a56c42c850d389f0',
);
