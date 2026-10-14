EDU(
  '8e2e477f7b9e6e134cfe14f830c66a52',
  function (e, t) {
    var n = NEJ.O,
      i = NEJ.P('nej.j'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.d'),
      s = o._$randNumberString(),
      r,
      c = 'ck-CourseCtCache';
    var d;
    a._$$COM_Cache_CourseCtCache = NEJ.C();
    r = a._$$COM_Cache_CourseCtCache._$extend(a._$$COM_Cache);
    r._$getChapterListWithLearned = function (e) {
      d = e;
      var t = 'MOOC_LEARN_CHAPTER_LIST_' + e;
      var n = sessionStorage.getItem(t);
      if (!1);
      else
        this._$postDWR({
          key: c + s,
          url: 'CourseBean.getLastLearnedMocTermDto',
          param: [e],
          onload: this.__onGetChapterListWithLearned._$bind(this),
        });
    };
    r.getLastLearnedMocTermDto = function (e, n) {
      d = e;
      t._$request({
        url: '/web/j/courseBean.getLastLearnedMocTermDto.rpc',
        method: 'POST',
        data: { termId: e },
        onload: function (e) {
          if (e) {
            var t = 'MOOC_LEARN_CHAPTER_LIST_' + d;
            sessionStorage.setItem(t, JSON.stringify(e));
            if (n) n(e);
            else this._$dispatchEvent('onGetChapterList', e);
          }
        }._$bind(this),
      });
    };
    r.__onGetChapterListWithLearned = function (e) {
      if (e) {
        var t = 'MOOC_LEARN_CHAPTER_LIST_' + d;
        sessionStorage.setItem(t, JSON.stringify(e));
        this._$dispatchEvent('onGetChapterList', e);
      }
    };
    r._$getChapterList = function (e, t, n) {
      console.log('33333');
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getMocTermDto',
        param: [e, t, n],
        onload: this.__onGetChapterList._$bind(this),
      });
    };
    r.getMocTermDto = function (e, n, i) {
      t._$request({
        url: '/web/j/courseBean.getMocTermDto.rpc',
        method: 'POST',
        data: { termId: e, isDraft: n, excludeUnrelease: i },
        notShowLoading: !0,
        hideError: !0,
        onload: function (e) {
          this._$dispatchEvent('onGetChapterList', { mocTermDto: e, lastLearnUnitId: null });
        }._$bind(this),
      });
    };
    r.__onGetChapterList = function (e) {
      this._$dispatchEvent('onGetChapterList', { mocTermDto: e, lastLearnUnitId: null });
    };
    r._$getLessonUnitVo = function (e, t, n, i) {
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getLessonUnitLearnVo',
        param: [e, t, n, i],
        onload: this.__onGetLessonUnitVo._$bind(this, i),
      });
    };
    r.__onGetLessonUnitVo = function (t, n) {
      n.unitId = t;
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
    r._$saveLearnInfo = function (e) {
      t._$request({
        url: '/web/j/courseRpcBean.saveMocContentLearn.rpc',
        method: 'POST',
        data: JSON.stringify({ dto: e }),
        notShowLoading: !0,
        hideError: !0,
        isNeedAuth: !0,
      });
    };
    r._$saveMocContentLearn = function (e) {
      t._$request({
        url: '/web/j/courseBean.saveMocContentLearn.rpc',
        method: 'POST',
        data: JSON.stringify({ dto: e }),
        notShowLoading: !0,
        hideError: !0,
        isNeedAuth: !0,
      });
    };
    r._$getMenuItem = function (e, t, n, i) {
      this._$postDWR({
        key: c + s,
        url: 'MocMenuItemBean.getMenuItem',
        param: [e, t, n, i],
        onload: this.__onGetMenuItem._$bind(this),
      });
    };
    r.__onGetMenuItem = function (e) {
      this._$dispatchEvent('onGetMenuItem', e);
    };
    r._$getNewestItems = function (e) {
      this._$postDWR({
        key: c + s,
        url: 'TermBean.getNewestItems',
        param: [e],
        onload: this.__onGetNewestItems._$bind(this),
      });
    };
    r.__onGetNewestItems = function (e) {
      this._$dispatchEvent('onGetNewestItems', e);
    };
    r._$fetchQuestions = function (e) {
      var t = JSON.parse(JSON.stringify(e));
      if (t.videoSegmentInfoDtos) delete t.videoSegmentInfoDtos;
      this._$postDWR({
        key: c + s,
        url: 'MocQuizBean.fetchQuestions',
        param: [t],
        onload: this.__onFetchQuestions._$bind(this),
      });
    };
    r.__onFetchQuestions = function (e) {
      this._$dispatchEvent('onFetchQuestions', e);
    };
    r._$getTermScoreRule = function (e, t) {
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getEvaluationDescription',
        param: [e, t],
        onload: this.__onGetEvaluationDescription._$bind(this),
      });
    };
    r.__onGetEvaluationDescription = function (e) {
      this._$dispatchEvent('onGetEvaluationDescription', e);
    };
    r._$getNextVideo = function (e) {
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getNextVideo',
        param: [e],
        onload: this.__onGetNextVideo._$bind(this),
      });
    };
    r.__onGetNextVideo = function (e) {
      this._$dispatchEvent('onGetNextVideo', e);
    };
    r._$getZhixuanAdsShowStatus = function (e) {
      t._$request({
        url: '/web/j/zhiXuanAdsBean.judgeZhiXuanAdsShowStatusByTermId.rpc',
        method: 'POST',
        data: { termId: e, positionId: 1, positionType: 1 },
        onload: this.__onGetZhixuanAdsShowStatus._$bind(this),
      });
    };
    r.__onGetZhixuanAdsShowStatus = function (e) {
      this._$dispatchEvent('onGetZhixuanAdsShowStatus', e);
    };
    r._$setIgnoreZhixuanAds = function () {
      t._$request({
        url: '/web/j/zhiXuanAdsBean.showClose.rpc',
        method: 'POST',
        data: { positionId: 1, positionType: 1 },
      });
    };
    r.getLessonUnitAILectureNoteSegmentList = function (e, n, i) {
      t._$request({
        url: '//www.icourse163.org/mm-course/web/j/mocLessonUnitBean.listMocVideoAiSegmentInfoDto.rpc',
        method: 'POST',
        data: e,
        cookie: !0,
        onload: n,
        onerror: i,
      });
    };
    r.getMocPreviewVideoSegmentInfoDto = function (e, n, i) {
      t._$request({
        url: '//www.icourse163.org/web/j/adminTermCertifiedBean.getMocPreviewVideoSegmentInfoDto.rpc',
        method: 'POST',
        data: e,
        cookie: !0,
        onload: n,
        onerror: i,
      });
    };
    r._$listUnitAIStatus = function (e, n, i) {
      t._$request({
        url: '//www.icourse163.org/mm-course/web/j/mocAdminTermCertifiedBean.listUnitAIStatus.rpc',
        method: 'POST',
        data: e,
        cookie: !0,
        onload: n,
        onerror: i,
      });
    };
    return r;
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
