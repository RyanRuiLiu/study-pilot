EDU(
  '1787c38a11a8e8184385e7783942c142',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    r._$$LessonHomework = NEJ.C();
    d = r._$$LessonHomework._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate('jst-learnLessonHw', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = a._$getByClassName(this.__body, 'j-name')[0];
      this.__infoNode = a._$getByClassName(this.__body, 'j-info')[0];
      this.__phaseNode = a._$getByClassName(this.__body, 'j-phase')[0];
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
            var a = window.moocConfig.lang.KEY_LEARN_ASSIGNMENT;
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
        if (this.__lessonVo.test.type == r.CONST.TYPE_SUBJECTIVE_OJ) {
          r._$trackEvent(
            'OJLesson',
            'click',
            '点击进入Online Judge单元作业课时：' + this.__lessonVo.test.id,
          );
          n.dispatcher._$redirect(r.umi('learnOJHomework') + '?id=' + this.__lessonVo.test.id);
        } else {
          r._$trackEvent(
            'homeworkLesson',
            'click',
            '点击进入单元作业课时：' + this.__lessonVo.test.id,
          );
          n.dispatcher._$redirect(r.umi('learnHomework') + '?id=' + this.__lessonVo.test.id);
        }
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
          type: r.CONST.LESSON_TYPE_HOMEWORK,
          hidePublish: t || !!e.syncMooc || i.includes(r.CONST.ROLE_REGION_ADMIN),
        });
      }
      if (this.__lessonVo.test.id) {
        this.__nameNode.innerText = this.__lessonVo.test.name;
        var o = r._$currentEvaluatePhase(this.__lessonVo.test);
        var s = '';
        switch (o) {
          case r.CONST.HW_PHASE_SUBMIT:
            s =
              window.moocConfig.lang.KEY_LEARN_SUBMISSION_DEADLINE +
              r._$formatCommonTime(this.__lessonVo.test.deadline || 0);
            break;
          case r.CONST.HW_PHASE_EVALUATION:
            s =
              window.moocConfig.lang.KEY_LEARN_CHECKOUT_DEADLINE +
              r._$formatCommonTime(
                this.__lessonVo.test.evaluateEnd || this.__lessonVo.test.evaluateScoreReleaseTime,
              );
            break;
          case r.CONST.HW_PHASE_SCORE:
            s =
              window.moocConfig.lang.KEY_LEARN_RESULTS_TIME +
              r._$formatCommonTime(this.__lessonVo.test.evaluateScoreReleaseTime || 0);
        }
        this.__infoNode.innerText =
          s + ' / ' + r._$getEvJudgeStr(this.__lessonVo.test.evaluateJudgeType);
        this.__phaseNode.innerText = r._$getHwPhaseStrByTest(this.__lessonVo.test);
        a._$delClassName(this.__phaseNode, 'phrase1 phrase2 phrase3 phrase4');
        a._$addClassName(this.__phaseNode, 'phrase' + o);
        r._$toggleNodeDisplay(this.__phaseNode, !!this.__lessonVo.test.deadline);
        r._$toggleNodeDisplay(this.__infoNode, !!this.__lessonVo.test.deadline);
        if (this.__previewStatusUI);
        else this.__phaseNode.style.marginRight = '0px';
      } else {
        this.__nameNode.innerText = this.__lessonVo.name;
        this.__infoNode.innerText = '';
        this.__phaseNode.innerText = '';
        r._$hiddenNode(this.__phaseNode);
      }
      this.__handleViewRecord();
    };
    d.__handleViewRecord = function () {
      console.log('this.__lessonVo', this.__lessonVo, !this.__lessonVo.viewStatus, !n.isEnrolled);
      if (!n.isPreview) {
        if (r._$isWap())
          if (!this.__lessonVo.viewStatus || !n.isEnrolled) console.log(1);
          else {
            console.log(3);
            a._$addClassName(this.__body, 'learned');
          }
        else if (this.__iconCircle) {
          this.__iconCircle.style.display = 'block';
          a._$delClassName(this.__iconCircle, 'checked semichecked');
          if (0 == this.__lessonVo.viewStatus || !n.isEnroll)
            a._$addClassName(this.__iconCircle, '');
          else if (3 == this.__lessonVo.viewStatus)
            a._$addClassName(this.__iconCircle, 'semichecked');
          else a._$addClassName(this.__iconCircle, 'checked');
        }
      } else {
        this.__icon && r._$hiddenNode(this.__icon);
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
  'cfc7f00905592e4a9dc5b4ce816a266c',
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
  '08d2f36062baca2c8eb8327afd74d88c',
);
