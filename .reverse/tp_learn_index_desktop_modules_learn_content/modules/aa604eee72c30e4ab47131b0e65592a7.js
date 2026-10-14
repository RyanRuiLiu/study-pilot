EDU(
  'aa604eee72c30e4ab47131b0e65592a7',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    r._$$LessonQuiz = NEJ.C();
    d = r._$$LessonQuiz._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate('jst-learnLessonQuiz', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = a._$getByClassName(this.__body, 'j-name')[0];
      this.__infoNode = a._$getByClassName(this.__body, 'j-info')[0];
      this.__retryNode = a._$getByClassName(this.__body, 'j-retry')[0];
      this.__icon = a._$getByClassName(this.__body, 'j-icon')[0];
      this.__iconCircle = a._$getByClassName(this.__body, 'j-circle')[0];
      this.__previewStatusNode = a._$getByClassName(this.__body, 'j-previewStatus')[0];
      s._$addEvent(this.__body, 'click', this.__lessonClickHandle._$bind(this));
    };
    d.__lessonClickHandle = function (i) {
      if (r._$isWap()) e.interceptUnitClick();
      else {
        var o = !!n.isPreview && this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_DELETED;
        if (o || !this.__lessonVo.test.id) {
          if (i) {
            var a = '测验';
            var s = o
              ? a + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
              : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
                a +
                window.moocConfig.lang.KEY_LEARN_CONTENT;
            r._$$CommonDialog._$showDialog({ type: 1, message: s, modal: !0 });
          }
          return;
        }
        t._$userActionLog('learn', n.courseDto.id);
        r._$trackEvent(
          'quizLesson',
          'click',
          window.moocConfig.lang.KEY_LEARN_CLICK_TIME + this.__lessonVo.test.id,
        );
        n.dispatcher._$redirect(r.umi('learnQuiz') + '?id=' + this.__lessonVo.test.id);
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__lessonVo = e.lessonVo;
      this.__lessonVo.test = this.__lessonVo.test || {};
      if (n.isPreview && !n.isReview) {
        var t =
          this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_MODIFIED;
        var i = window.webUser.roles || [];
        this.__previewStatusUI = r._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__lessonVo,
          type: r.CONST.LESSON_TYPE_QUIZ,
          hidePublish: t || !!e.syncMooc || i.includes(r.CONST.ROLE_REGION_ADMIN),
        });
      }
      if (this.__lessonVo.test.id) {
        this.__nameNode.innerText = this.__lessonVo.test.name;
        if (this.__lessonVo.test.deadline)
          this.__infoNode.innerText =
            window.moocConfig.lang.KEY_LEARN_SUBMISSION_DEADLINE +
            r._$formatCommonTime(this.__lessonVo.test.deadline || 0) +
            ' / ' +
            window.moocConfig.lang.KEY_LEARN_TRY +
            ' ' +
            (this.__lessonVo.test.trytime || 0) +
            ' ' +
            window.moocConfig.lang.KEY_LEARN_TIMES;
        if (this.__lessonVo.test.deadline - r._$getCurServerTime() > 0) {
          a._$delClassName(this.__retryNode, 'phrase3');
          this.__retryNode.innerText = window.moocConfig.lang.KEY_LEARN_SUBMISSION_STAGE;
        } else {
          this.__retryNode.innerText = window.moocConfig.lang.KEY_LEARN_RESULTS_ANNOUNCED;
          a._$addClassName(this.__retryNode, 'phrase3');
        }
        r._$toggleNodeDisplay(this.__retryNode, !!this.__lessonVo.test.deadline);
        if (this.__previewStatusUI);
        else this.__retryNode.style.marginRight = '0px';
      } else {
        this.__nameNode.innerText = this.__lessonVo.name;
        this.__infoNode.innerText = '';
        this.__retryNode.innerText = '';
        r._$hiddenNode(this.__retryNode);
      }
      this.__handleViewRecord();
    };
    d.__handleViewRecord = function () {
      console.log('this.__lessonVo', this.__lessonVo);
      if (!n.isPreview) {
        if (r._$isWap())
          if (!this.__lessonVo.viewStatus || !n.isEnrolled) console.log(1);
          else {
            console.log(3);
            a._$addClassName(this.__body, 'learned');
          }
        else if (this.__iconCircle) {
          a._$delClassName(this.__iconCircle, 'checked semichecked');
          this.__iconCircle.style.display = 'block';
          if (0 == this.__lessonVo.viewStatus || !n.isEnroll)
            a._$addClassName(this.__iconCircle, '');
          else if (3 == this.__lessonVo.viewStatus)
            a._$addClassName(this.__iconCircle, 'semichecked');
          else a._$addClassName(this.__iconCircle, 'checked');
        }
      } else {
        r._$hiddenNode(this.__icon);
        this.__iconCircle && (this.__iconCircle.style.display = 'none');
      }
    };
    d.__destroy = function () {
      if (this.__previewStatusUI)
        this.__previewStatusUI = r._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '72082ce7fa131d8e62eb43521a683cd9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  '94ec8a8dfa596967c090fc2c92487692',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
