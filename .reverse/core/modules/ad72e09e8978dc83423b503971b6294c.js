EDU(
  'ad72e09e8978dc83423b503971b6294c',
  function (e, t) {
    var n = NEJ.O,
      i = NEJ.P('nej.j'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.d'),
      r = o._$randNumberString(),
      s,
      c = 'ck-CourseCtCache';
    var d = [];
    var l = !1;
    var u = 3e4;
    var _ = function () {
      if (!l && d.length) {
        l = !0;
        var e = d.shift();
        var n = !1;
        var i;
        var o = function () {
          if (!n) {
            n = !0;
            clearTimeout(i);
            l = !1;
            e.resolve();
            _();
          }
        };
        i = setTimeout(o, u);
        try {
          t._$request({
            url: '/web/j/courseRpcBean.saveMocContentLearn.rpc',
            method: 'POST',
            data: JSON.stringify({ dto: e.learnInfo }),
            onload: o,
            onerror: o,
            notShowLoading: !0,
            hideError: !0,
            isNeedAuth: !0,
          });
        } catch (a) {
          o();
        }
      }
    };
    var f;
    a._$$COM_Cache_CourseCtCache = NEJ.C();
    s = a._$$COM_Cache_CourseCtCache._$extend(a._$$COM_Cache);
    s._$addLearnLog = function (e) {
      t._$request({
        url: '//log.study.163.com/__utm.gif',
        method: 'get',
        data: e,
        notShowLoading: !0,
        hideError: !0,
      });
    };
    s._$getChapterListWithLearned = function (e) {
      f = e;
      var t = 'MOOC_LEARN_CHAPTER_LIST_' + e;
      var n = sessionStorage.getItem(t);
      if (!1);
      else
        this._$postDWR({
          key: c + r,
          url: 'CourseBean.getLastLearnedMocTermDto',
          param: [e],
          onload: this.__onGetChapterListWithLearned._$bind(this),
        });
    };
    s.__onGetChapterListWithLearned = function (e) {
      if (e) {
        var t = 'MOOC_LEARN_CHAPTER_LIST_' + f;
        sessionStorage.setItem(t, JSON.stringify(e));
        this._$dispatchEvent('onGetChapterList', e);
      }
    };
    s._$getChapterList = function (e, t, n) {
      this._$postDWR({
        key: c + r,
        url: 'CourseBean.getMocTermDto',
        param: [e, t, n],
        onload: this.__onGetChapterList._$bind(this),
      });
    };
    s.getMocTermDto = function (e, n, i) {
      console.log(4444);
      t._$request({
        url: '/web/j/courseBean.getMocTermDto.rpc',
        method: 'POST',
        data: { termId: e, isDraft: n, excludeUnrelease: i },
        onload: function (e) {
          console.log('getMocTermDto _data', e);
          this._$dispatchEvent('onGetChapterList', { mocTermDto: e, lastLearnUnitId: null });
        }._$bind(this),
      });
    };
    s.__onGetChapterList = function (e) {
      this._$dispatchEvent('onGetChapterList', {
        mocTermDto: e,
        lastLearnUnitId: null,
      });
    };
    s.getLastLearnedMocTermDto = function (e, n) {
      f = e;
      t._$request({
        url: '/web/j/courseBean.getLastLearnedMocTermDto.rpc',
        method: 'POST',
        data: { termId: e },
        onload: function (e) {
          if (e) {
            console.log('getLastLearnedMocTermDto data', e);
            var t = 'MOOC_LEARN_CHAPTER_LIST_' + f;
            sessionStorage.setItem(t, JSON.stringify(e));
            if (n) n(e);
            else this._$dispatchEvent('onGetChapterList', e);
          }
        }._$bind(this),
      });
    };
    s.getNewMocTermDto = function (e, n, i, o) {
      t._$request({
        url: '/web/j/courseBean.getMocTermDto.rpc',
        method: 'POST',
        data: { termId: e, isDraft: n, excludeUnrelease: i },
        onload: o,
      });
    };
    s.getMocTermContentDraft = function (e, n) {
      t._$request({
        url: '//www.icourse163.org/mm-course/web/j/termDraftBean.getMocTermContentDraft.rpc',
        method: 'POST',
        data: { termId: e },
        onload: n,
        cookie: !0,
      });
    };
    s.getMocTermContentDraftSync = function (e, n) {
      t._$request({
        url: '/mm-course/web/j/termDraftBean.getMocTermContentDraftSync.rpc',
        method: 'POST',
        data: { termId: e },
        onload: n,
      });
    };
    s._$getLessonUnitVo = function (e, t, n, i) {
      this._$postDWR({
        key: c + r,
        url: 'CourseBean.getLessonUnitLearnVo',
        param: [e, t, n, i],
        onload: this.__onGetLessonUnitVo._$bind(this, i),
      });
    };
    s.__onGetLessonUnitVo = function (t, n) {
      n.unitId = t;
      console.log('unit数据', n);
      try {
        if (n.paper && n.paper.objectiveQList)
          n.paper.objectiveQList.forEach(function (t) {
            t.plainTextTitle = e._$formateImagePrefix(t.plainTextTitle);
            t.title = e._$formateImagePrefix(t.title);
            if (t.optionDtos)
              t.optionDtos.forEach(function (t) {
                t.content = e._$formateImagePrefix(t.content);
              });
          });
        if (n.htmlContent) n.htmlContent = e._$formateImagePrefix(n.htmlContent);
        if (n.post) n.post.content = e._$formateImagePrefix(n.post.content);
      } catch (i) {}
      this._$dispatchEvent('onGetLessonUnitVo', n);
    };
    s._$saveLearnInfo = function (e) {
      return new Promise(function (t) {
        d.push({ learnInfo: e, resolve: t });
        _();
      });
    };
    s._$getMenuItem = function (e, t, n, i) {
      this._$postDWR({
        key: c + r,
        url: 'MocMenuItemBean.getMenuItem',
        param: [e, t, n, i],
        onload: this.__onGetMenuItem._$bind(this),
      });
    };
    s.__onGetMenuItem = function (e) {
      this._$dispatchEvent('onGetMenuItem', e);
    };
    s._$getNewestItems = function (e) {
      this._$postDWR({
        key: c + r,
        url: 'TermBean.getNewestItems',
        param: [e],
        onload: this.__onGetNewestItems._$bind(this),
      });
    };
    s.__onGetNewestItems = function (e) {
      this._$dispatchEvent('onGetNewestItems', e);
    };
    s._$fetchQuestions = function (e) {
      if (e.videoSegmentInfoDtos) delete e.videoSegmentInfoDtos;
      this._$postDWR({
        key: c + r,
        url: 'MocQuizBean.fetchQuestions',
        param: [e],
        onload: this.__onFetchQuestions._$bind(this),
      });
    };
    s.__onFetchQuestions = function (e) {
      this._$dispatchEvent('onFetchQuestions', e);
    };
    s._$getTermScoreRule = function (e, t) {
      this._$postDWR({
        key: c + r,
        url: 'CourseBean.getEvaluationDescription',
        param: [e, t],
        onload: this.__onGetEvaluationDescription._$bind(this),
      });
    };
    s.__onGetEvaluationDescription = function (e) {
      this._$dispatchEvent('onGetEvaluationDescription', e);
    };
    s._$getNextVideo = function (e) {
      this._$postDWR({
        key: c + r,
        url: 'CourseBean.getNextVideo',
        param: [e],
        onload: this.__onGetNextVideo._$bind(this),
      });
    };
    s.__onGetNextVideo = function (e) {
      this._$dispatchEvent('onGetNextVideo', e);
    };
    return s;
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
