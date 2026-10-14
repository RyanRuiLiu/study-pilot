EDU(
  'aa787b31fae1d6b4be87937316849923',
  function (e, t, n, i, o, a) {
    var s = window,
      r = NEJ.O,
      c = NEJ.F,
      d = NEJ.P('nej.e'),
      l = NEJ.P('nej.v'),
      _ = NEJ.P('nej.u'),
      u = NEJ.P('edu.m'),
      f = NEJ.P('edu.d'),
      h = NEJ.P('edu.u'),
      p,
      m;
    var b = a._$parseUrlParams(window.location.search);
    var g = !!b.appId;
    u._$$LearnContent = NEJ.C();
    p = u._$$LearnContent._$extend(u._$$Module, !0);
    m = u._$$LearnContent._$supro;
    p.__getXhtml = function () {
      return d._$getHtmlTemplate('jst-edu-learnContent', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    p.__getParent = function () {
      return d._$get('courseLearn-inner-box');
    };
    p._getRecommendWrap = function () {
      return d._$get('j-recommend-content');
    };
    p.__buildFuncPoints = function () {
      m.__buildFuncPoints.apply(this, arguments);
      this.__contentCache = new f._$$COM_Cache_CourseCtCache();
      this.__contentCache._$addEvent('onGetChapterList', this.__onGetChapterList._$bind(this));
      this.__chapterListUIs = [];
      this._recommendNode = d._$get('j-recommend-content');
      this._recommendSideNode = d._$get('j-recommend-side');
      this._scrollHandler();
    };
    p.__getChapterListData = function () {
      if (this.__type == h.CONST.LEARN_TAB.CONTENT_TYPE.LIST) this.__getChapterList(s.termDto.id);
      else if (!this.__termInfoData) {
        this.__sentry = 2;
        this.__getChapterList(s.termDto.id);
      } else this.__genTypeUI();
    };
    p.__getChapterList = function (e, t) {
      var n = void 0 === s.isReview || !s.isReview ? 0 : 1;
      if (s.isPreview)
        if (t) o.getMocTermContentDraftSync(e, this.__onGetChapterList.bind(this));
        else o.getMocTermContentDraft(e, this.__onGetChapterList.bind(this));
      else if (s.webUser && 1 == s.isEnroll)
        o.getLastLearnedMocTermDto(e, this.__onGetChapterList.bind(this));
      else this.__contentCache._$getChapterList(e, n, !s.isPreview);
    };
    p.__onGetChapterList = function (e) {
      console.log('__onGetChapterList', e);
      if (!e.mocTermDto) e = { lastLearnUnitId: null, mocTermDto: e };
      this.__termInfoData = this.__termInfoData || {};
      this.__termMode =
        this.__type == h.CONST.LEARN_TAB.CONTENT_TYPE.DETAIL && this.__termMode
          ? this.__termMode
          : e.mocTermDto.mode;
      this.__termInfoData[e.mocTermDto.mode] = e;
      this.__chapterVoMap = {};
      this.__lessonVoMap = h._$isEmpty(this.__lessonVoMap) ? {} : this.__lessonVoMap;
      if (e && e.mocTermDto)
        _._$forEach(
          e.mocTermDto.chapters,
          function (e, t) {
            this.__chapterVoMap[e.id] = e;
            _._$forEach(
              e.lessons,
              function (t, n) {
                this.__lessonVoMap[t.id] = { lesson: t, chapter: e };
              }._$bind(this),
            );
          }._$bind(this),
        );
      this.__genTypeUI();
    };
    p.__genTypeUI = function () {
      switch (this.__type) {
        case h.CONST.LEARN_TAB.CONTENT_TYPE.LIST:
          this.__genChapterListUIs();
          this._updateRecommendPosition();
          break;
        case h.CONST.LEARN_TAB.CONTENT_TYPE.DETAIL:
          this.__genChapterDetailUI();
      }
    };
    p._updateRecommendPosition = function () {
      var e = function () {
        var e = [];
        for (var t in this.__chapterVoMap) e.push(t);
        return e.length;
      }._$bind(this);
      var t = this._getRecommendWrap();
      if (!e()) d._$addClassName(t, 'z-recommend-fixed');
    };
    p._isInViewPort = function (e) {
      var t =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var n = e.getBoundingClientRect() && e.getBoundingClientRect().top;
      return n <= t + 100;
    };
    p._scrollHandler = function () {
      setTimeout(
        function () {
          if (d._$hasClassName(this._recommendNode, 'z-recommend-fixed'))
            DATracker.track(window.moocConfig.lang.KEY_LEARN_RECOMMENDED_PAGE, {
              user_id: !!s.webUser && s.webUser.id,
              data_cate: window.moocConfig.lang.KEY_LEARN_RECOMMENDED_PAGE,
              data_action: 'web_course_learn_recommend_page_view',
              data_label: window.moocConfig.lang.KEY_LEARN_LEARNING_PAGE1,
              data_pagename: s.location.href,
            });
        }._$bind(this),
        50,
      );
    };
    p.__genChapterListUIs = function () {
      var e = h._$$ChapterList._$allocate({
        parent: this.__body,
        termVo: this.__termInfoData[this.__termMode].mocTermDto,
        lastLearnUnitId: this.__termInfoData[this.__termMode].lastLearnUnitId,
        moduleName: this.__moduleName,
        syncMooc: !!this.__splitUI && !this.__termMode,
      });
      this.__chapterListUIs.push(e);
      if (h._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = h._$$SpocMoocSplit._$allocate({ parent: this.__body });
        if (s.isPreview) this.__getChapterList(s.termDto.id, !0);
        else this.__getChapterList(s.moocTermDto.id);
      }
    };
    p.__genChapterDetailUI = function () {
      this.__sentry--;
      if (!(this.__sentry > 0 && h._$isSpocSync())) {
        var e = this.__lessonVoMap[this.__lessonId];
        if (e) {
          var t = this.__curNavId || e.lesson.units[0].id;
          console.log('__genChapterDetailUI _lessonInfo', e, t);
          this.__lessonDetailUI = h._$$LessonDetailUI._$allocate({
            parent: this.__body,
            lessonVo: e.lesson,
            chapterVo: e.chapter,
            mocTermDto: this.__termInfoData[this.__termMode].mocTermDto,
            curNavId: t,
            playFromStart: this.__playFromStart,
          });
        } else {
          console.log('__genChapterDetailUI fail');
          h._$$CommonDialog._$showDialog({
            type: 1,
            message: window.moocConfig.lang.KEY_LEARN_THE_EXIST,
          });
        }
      }
    };
    p.__onRedirectUnit = function (t, n, i) {
      h._$trackEvent('selectUnit', 'click', '点击课时内部Tab, unitId:' + t);
      if (!this.__curNavId || this.__curNavId != t)
        if (!n.live || n.live.cdnMode != e.OUT_LIVE)
          s.dispatcher._$redirect(h.umi('learnContent') + '?type=detail&id=' + i.id + '&cid=' + t);
        else if (window.isPreview)
          window.open(
            '/learn/preview/outsideLive.htm?termId=' + i.termId + '&roomId=' + n.live.relatedLiveId,
          );
        else window.open('/learn/outsideLive.htm?id=' + n.live.id);
    };
    p.__onShow = function (e) {
      console.log('__proLearnContent.__onShow');
      m.__onShow.apply(this, arguments);
      this.__moduleName = s.learnBigTabNames[e.target];
      this.__clearUI();
      this.__onRefresh(e);
    };
    p.__onRefresh = function (e) {
      console.log('content __onRefresh');
      m.__onRefresh.apply(this, arguments);
      this.__type = e.param.type || h.CONST.LEARN_TAB.CONTENT_TYPE.LIST;
      if (this.__type == h.CONST.LEARN_TAB.CONTENT_TYPE.DETAIL) {
        this.__lessonId = e.param.id;
        this.__curNavId = e.param.cid;
        this.__playFromStart = e.param.replay || !1;
      }
      this.__clearUI();
      if (h._$isSpocSync())
        if (1 == e.param.sm) this.__termMode = h.CONST.MODE_MOOC;
        else this.__termMode = h.CONST.MODE_SPOC_SYNC;
      if (courseCardDto && courseCardDto.mode == h.CONST.MODE_SPOC_ASYNC)
        this.__termMode = h.CONST.MODE_SPOC_ASYNC;
      if (
        courseCardDto &&
        courseCardDto.mode == h.CONST.MODE_SPOC_SYNC &&
        courseCardDto.fromCourseMode == h.CONST.MODE_SPOC_ONLY
      )
        this.__termMode = h.CONST.MODE_SPOC_ONLY;
      this.__getChapterListData();
    };
    p.__clearUI = function () {
      console.log('content clearUI', window.renderReactComponent);
      _._$forEach(
        this.__chapterListUIs,
        function (e) {
          e = h._$$ChapterList._$recycle(e);
        }._$bind(this),
      );
      this.__chapterListUIs = [];
      if (this.__splitUI) this.__splitUI = h._$$SpocMoocSplit._$recycle(this.__splitUI);
      if (this.__lessonDetailUI)
        this.__lessonDetailUI = h._$$LessonDetailUI._$recycle(this.__lessonDetailUI);
    };
    p.__onHide = function () {
      console.log('__proLearnContent.__onHide');
      this.__clearUI();
      this.__termInfoData = null;
      this.__lessonVoMap = null;
      m.__onHide.apply(this, arguments);
      d._$removeByEC(this.__body);
    };
    s.dispatcher._$loaded(h.umi('learnContent'), u._$$LearnContent);
  },
  'ef64b877c64ed4138d4b703989241671',
  '3b4b0bfe96b6f18b5667d392a02a8f9d',
  '4506823daf61ad0e7db0db8ecc157b4c',
  '93828627ddb358ed890cb65967a0c1de',
  'ad72e09e8978dc83423b503971b6294c',
  'fb061c769bfc74628a81f422f590544c',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'c1ba0a8ce6586f97db89350042a33ef5',
  'f8d67315026aca254304d36bea9d9d34',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
