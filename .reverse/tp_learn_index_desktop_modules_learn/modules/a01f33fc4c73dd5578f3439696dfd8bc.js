EDU(
  'a01f33fc4c73dd5578f3439696dfd8bc',
  function (e, t, i) {
    var n = window,
      a = NEJ.O,
      o = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      _ = NEJ.P('edu.d'),
      l = NEJ.P('nej.ut'),
      h;
    var f = s._$addHtmlTemplate(
      '<div class="m-quizDoing">              <div class="j-warnTip warnTip f-dn"></div>              <div class="j-description"></div>              <div class="timeBox f-pf u-btn u-btn-orange j-timeNode">                  <span class="f-icon u-icon-clock"></span>                  ${lang.KEY_LEARN_COUNTDOWN}                  <span class="j-timeTxt"></span>              </div>              <div class="j-quizPool quizPool"></div>              <a class="u-btn u-btn-default j-submitBtn">${lang.KEY_LEARN_SUBMIT_ANSWER}</a>          </div>',
    );
    var u = { NORMAL: 1, AUTO: 2, CHEAT: 3 };
    c._$$QuizDoingUI = NEJ.C();
    h = c._$$QuizDoingUI._$extend(c._$$UIBase, !0);
    h.__initXGui = function () {
      this.__seed_html = s._$addNodeTemplate(
        s._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    h.__getSwitchCount = function (e) {
      this.__quizCache._$getSwitchCount(
        { aid: this.__originQuizDto.aid },
        function (t) {
          console.log('发请求获取次数', t);
          this.__hasSwitchCount = t.switchPageCount || 0;
          e();
        }._$bind(this),
      );
    };
    h.__onExitFullScreen = function (t) {
      var i = window.moocConfig.lang;
      console.log('__onExitFullScreen', this.__baseInfo);
      var a = '';
      var o = this.__baseInfo.allowSwitchPageCount || 0;
      var s = t ? this.__hasSwitchCount : this.__hasSwitchCount + 1;
      var r = o - s;
      console.log('已切换', s, '剩余', r);
      if (r > 3) a = i.KEY_EXAM_SWITCH_PAGE_TIP_PRE + o + i.KEY_EXAM_SWITCH_TIME_SUBMIT_AFTER;
      else if (r <= 0) {
        a = i.KEY_EXAM_YOU_SWITCH + o + i.KEY_EXAM_YOU_SWITCH_TIME_SUBMIT;
        this._$stopTimer();
        this.__originQuizDto.submitType = u.CHEAT;
        this.__originQuizDto.autoSubmit = !0;
        console.log('强制交卷', this.__originQuizDto);
        if (!this.__hasSubmited)
          this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
        this.__hasSubmited = !0;
      } else if (1 === o) {
        a = i.KEY_EXAM_YOU_SWITCH + o + i.KEY_EXAM_YOU_SWITCH_TIME_SUBMIT;
        this._$stopTimer();
        this.__originQuizDto.submitType = u.CHEAT;
        this.__originQuizDto.autoSubmit = !0;
        console.log('强制交卷', this.__originQuizDto);
        if (!this.__hasSubmited)
          this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
        this.__hasSubmited = !0;
      } else
        a =
          i.KEY_EXAM_YOU_RESWITCH_TIP +
          r +
          i.KEY_EXAM_YOU_RESWITCH_TIME_SUBMIT_TIP +
          s +
          i.KEY_EXAM_YOU_RESWITCH_TIMES;
      this.modal = new e({
        data: {
          title: r ? i.KEY_EXAM_CHECK_SWITCH_PAGE_TIP : i.KEY_EXAM_FORCE_SUBMIT_TIP,
          content: a,
          okButton: i.KEY_LEARN_CONFIRM,
          cancelButton: null,
        },
      });
      this.modal.$on(
        'close',
        !r || document.fullscreenElement
          ? function () {
              console.log('location.hash', location);
              if (
                ~location.hash.indexOf('learn/examObject') ||
                ~location.hash.indexOf('learn/examSubjective')
              )
                this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 4 });
              if (this.modal) {
                this.modal.destroy();
                this.modal = null;
              }
            }._$bind(this)
          : this.__onEnterFullScreen._$bind(this),
      );
    };
    h.__exitHandler = function (e) {
      console.log('__exitHandler', e, location);
      if (this.__isPreventCheating && !this.modal)
        this.__getSwitchCount(
          function () {
            this.__onExitFullScreen(document.fullscreenElement && e && 'blur' === e.type ? !0 : !1);
            this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 3 });
          }._$bind(this),
        );
    };
    h.__onFullScreenChange = function (e, t) {
      console.log('__onFullScreenChange', e, t, this.__isPreventCheating);
      console.log('是否已有弹窗', this.modal);
      if (this.__isPreventCheating && !this.modal)
        if (null !== document.fullscreenElement) {
          console.log('进入全屏');
          this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 4 });
        } else if (!this.__onRefreshing) {
          this.__getSwitchCount(
            function () {
              console.log('退出全屏');
              this.__onExitFullScreen();
              this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 3 });
            }._$bind(this),
          );
          this.__onRefreshing = !1;
        }
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__warnTip = s._$getByClassName(this.__body, 'j-warnTip')[0];
      this.__timeNode = s._$getByClassName(this.__body, 'j-timeNode')[0];
      this.__timeTxt = s._$getByClassName(this.__body, 'j-timeTxt')[0];
      this.__quizPoolNode = s._$getByClassName(this.__body, 'j-quizPool')[0];
      this.__submitBtn = s._$getByClassName(this.__body, 'j-submitBtn')[0];
      this.__description = s._$getByClassName(this.__body, 'j-description')[0];
      r._$addEvent(this.__submitBtn, 'click', this.__onSubmitHandle._$bind(this));
      this.__quizCache = new _._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onSubmitAnswers', this.__onSubmitAnswersCB._$bind(this));
    };
    h.__onEnterFullScreen = function () {
      if (this.modal) {
        this.modal.destroy();
        this.modal = null;
      }
      var e = [
        'requestFullscreen',
        'mozRequestFullScreen',
        'msRequestFullscreen',
        'webkitRequestFullscreen',
      ];
      for (var t = 0; t < e.length; t++) {
        var i = e[t];
        if (document.body && document.body[i]) {
          document.body[i]();
          break;
        }
      }
    };
    h.__useExitFullScreen = function () {
      console.log('__useExitFullScreen');
      var e = ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'];
      for (var t = 0; t < e.length; t++) {
        var i = e[t];
        if (document[i]) {
          document[i]();
          break;
        }
      }
    };
    h.__removeListern = function () {
      clearInterval(this.__sId);
      clearInterval(this.assistantTimer);
      this.__onRefreshing = !1;
      if (this.__hasEventListener) {
        console.log('清除定时器');
        window.removeEventListener('blur', this.__bindExitHandler);
        document.body.removeEventListener('fullscreenchange', this.__bindOnFullScreenChange);
      }
    };
    h.__reset = function (e) {
      var i = this;
      console.log('__initNode');
      this.__supReset(e);
      this.__type = e.type;
      this.__examId = e.examId;
      this.__examType = e.examType;
      this.__testId = e.testId;
      var n;
      switch (this.__type) {
        case 'quiz':
          n = 11;
          this.__typeTxt = window.moocConfig.lang.KEY_LEARN_TEST;
          break;
        case 'exam':
          n = 12;
          this.__typeTxt = window.moocConfig.lang.KEY_LEARN_EXAMINATION;
          this.__addBeforeUnloadEvent();
          this.__doInitDomEvent([
            [location, 'beforeurlchange', this.__hashChangeHandle._$bind(this)],
          ]);
      }
      this.__baseInfo = e.baseInfo || {};
      var a = /img[0-9].ph.126.net/g;
      var o;
      try {
        o = JSON.parse(JSON.stringify(e.quizDto).replace(a, 'img-ph-mirror.nosdn.127.net'));
      } catch (s) {
        o = e.quizDto;
      }
      this.__originQuizDto = o;
      this.__recordDtos = c._$convertPaperQustionObj(
        this.__originQuizDto.objectiveQList,
        this.__originQuizDto.answers,
      );
      this.__buildBaseData();
      if (this.__canSubmitOrSave()) {
        this.__removeListern();
        this.__assistantHeart(n);
        this.__hasEventListener = !0;
        this.__bindExitHandler = this.__exitHandler._$bind(this);
        this.__bindOnFullScreenChange = this.__onFullScreenChange._$bind(this);
        if (this.__baseInfo.duration != -1) {
          console.log('开始倒计时', this.__baseInfo.duration);
          this.__serverTime = null;
          this.__countdownTime(this.__showTime._$bind(this));
          c._$showNode(this.__timeNode);
        } else c._$hiddenNode(this.__timeNode);
        window.addEventListener('blur', this.__bindExitHandler);
        document.body.addEventListener('fullscreenchange', this.__bindOnFullScreenChange);
        this.__hasSubmited = !1;
        this.__isPreventCheating =
          this.__baseInfo.allowSwitchPageCount && this.__baseInfo.allowSwitchPageCount > 0
            ? !0
            : !1;
        this.__hasSwitchCount = 0;
        console.log('是否设置__isPreventCheating', this.__isPreventCheating);
        if (this.__baseInfo.startTime && this.__isPreventCheating)
          this.__getSwitchCount(
            function () {
              this.__onExitFullScreen(!0);
            }._$bind(this),
          );
        if (this.__baseInfo.duration != -1) {
          var r = document.querySelector('#j-global-ai-robot');
          r && r.classList.add('f-dn');
        }
        console.log(this.__baseInfo);
        document.addEventListener('visibilitychange', function () {
          if (!document.hidden) {
            var e = __clientEndTime - new Date();
            i.__showTime(e);
          } else;
        });
      } else c._$hiddenNode(this.__timeNode);
      window.learnUtilQuestionList = t._$getQuestionList(e.quizDto);
      var d = e.quizDto || {};
      var r = document.querySelector('#j-global-ai-robot');
      r && r.classList.add('f-dn');
    };
    h.__buildBaseData = function (e) {
      this.__buildQuizPool();
      if (!n.isPreview) {
        if (
          'quiz' == this.__type &&
          this.__baseInfo.usedTryCount >= this.__baseInfo.totalTryCount
        ) {
          this.__warnTip.innerHTML =
            window.moocConfig.lang.KEY_LEARN_YOU_USED_UP_ALL +
            this.__typeTxt +
            window.moocConfig.lang.KEY_LEARN_YOU_USED_UP_ALL1;
          s._$delClassName(this.__warnTip, 'f-dn');
        }
        if (c._$getCurServerTime() >= this.__baseInfo.deadline) {
          if (i.isCh())
            this.__warnTip.innerHTML =
              this.__typeTxt + window.moocConfig.lang.KEY_LEARN_DEADLINE_IS_OVER;
          else
            this.__warnTip.innerHTML =
              'The submission deadline for the ' +
              this.__typeTxt +
              ' has passed. You can take the quiz as a self-learning means, but you will not get credit.';
          s._$delClassName(this.__warnTip, 'f-dn');
        } else s._$addClassName(this.__warnTip, 'f-dn');
      }
      if ('exam' == this.__type)
        this.__description.innerHTML = d._$escape(this.__baseInfo.description || '');
      if (window.location.href.includes('quizScreenshot')) {
        var t = document.querySelector('.j-data-list');
        var a = this.__originQuizDto.objectiveQList;
        var o, r;
        for (var _ = 0; _ < a.length; _++) {
          o = t.children[_];
          o.setAttribute('data-id', a[_].id);
          r = o.querySelector('img');
          o.setAttribute('data-hasimg', r ? 1 : 0);
        }
      }
    };
    h.__getServerTime = function (e) {
      console.log('通过接口获取服务器时间');
      this.__quizCache._$getCurServerTimeByFetch(
        function (t) {
          this.__serverTime = t;
          this.__clientCostTime = 0;
          e();
        }._$bind(this),
      );
    };
    h.__countdownTime = function (e) {
      console.log('倒计时');
      var t = this;
      if (!this.__serverTime) {
        console.log('第一次倒计时');
        this.__getServerTime(function () {
          t.orgTime = t.__serverTime;
          t.__calStartTime();
          t.__genTimeDragger();
          e();
        });
      }
    };
    h.__calStartTime = function () {
      var e = (this.__baseInfo.deadline - this.__serverTime) / 1e3;
      console.log('__calStartTime', this.__baseInfo.startTime, this.__baseInfo.deadline);
      if (e > 0 && e < this.__baseInfo.duration + 60) this.__clientStartTime = e;
      else if (this.__baseInfo.startTime)
        this.__clientStartTime =
          this.__baseInfo.duration - (this.__serverTime - this.__baseInfo.startTime) / 1e3;
      else this.__clientStartTime = this.__baseInfo.duration;
      this.__clientEndTime = new Date(this.__serverTime + this.__clientStartTime);
    };
    h.__buildQuizPool = function () {
      this.__examPool = c._$$Quiz_Question_Pool._$allocate({
        parent: this.__quizPoolNode,
        mode: 0,
        data: this.__originQuizDto,
        recordDtos: this.__recordDtos,
        onSelect: this.__storeAnswerDtos._$bind(this),
      });
    };
    h._$startTimer = function () {
      this.__timer && clearInterval(this.__timer);
      this.__timer = n.setInterval(
        function () {
          var e = this.__showTime();
          if (e <= 0) {
            this._$stopTimer();
            this.__originQuizDto.autoSubmit = !0;
            this.__originQuizDto.submitType = u.AUTO;
            console.log('自动提交');
            if (!this.__hasSubmited)
              this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
            this.__hasSubmited = !0;
            c._$trackEvent(
              'quizAutoSave',
              'click',
              '强制提交' +
                this.__typeTxt +
                '，id:' +
                this.__baseInfo.tid +
                ',answeror:' +
                n.webUser.id,
            );
          }
        }._$bind(this),
        1e3,
      );
    };
    h._$stopTimer = function () {
      this.__timer = n.clearInterval(this.__timer);
    };
    h.__onSubmitAnswersCB = function (e) {
      c._$hiddenNode(this.__timeNode);
      this.__removeListern();
      switch (this.__type) {
        case 'quiz':
          if (100 === e)
            c._$$CommonDialog._$showDialog({
              type: 1,
              message: window.moocConfig.lang.KEY_LEARN_THE_QUI_ELSEWHERE,
              okFunc: function () {
                n.dispatcher._$redirect(
                  c.umi('learnQuizScore') +
                    '?id=' +
                    this.__baseInfo.tid +
                    '&aid=' +
                    this.__originQuizDto.aid,
                );
              }._$bind(this),
              okTip: window.moocConfig.lang.KEY_LEARN_CONFIRM,
            });
          else
            n.dispatcher._$redirect(
              c.umi('learnQuizScore') +
                '?id=' +
                this.__baseInfo.tid +
                '&aid=' +
                this.__originQuizDto.aid +
                '&eid=' +
                this.__examId +
                '&examType=' +
                this.__examType,
            );
          break;
        case 'exam':
          this.__clearUnload();
          if (c._$getCurServerTime() >= this.__baseInfo.deadline)
            n.dispatcher._$redirect(
              c.umi('learnExamObjectScore') +
                '?id=' +
                this.__baseInfo.tid +
                '&aid=' +
                this.__originQuizDto.aid,
            );
          else if (100 === e)
            c._$$CommonDialog._$showDialog({
              type: 1,
              message: window.moocConfig.lang.KEY_LEARN_THE_EXAM_ELSEWHERE,
              okFunc: function () {
                this._$dispatchEvent('onSubmit');
              }._$bind(this),
              okTip: window.moocConfig.lang.KEY_LEARN_CONFIRM,
            });
          else this._$dispatchEvent('onSubmit');
      }
    };
    h.__onSubmitHandle = function (e) {
      switch (this.__type) {
        case 'quiz':
          var t = window.moocConfig.lang.KEY_LEARN_THE_SUBMIT;
          break;
        case 'exam':
          var t = window.moocConfig.lang.KEY_LEARN_YOU_SUBMIT;
      }
      if (e != -1) {
        c._$$CommonDialog._$showDialog({
          modal: !1,
          type: 1,
          message: t,
          okFunc: function () {
            this.__originQuizDto.autoSubmit = !1;
            this.__originQuizDto.answers &&
              this.__originQuizDto.answers.forEach(function (e) {
                if (!e.optIds) e.optIds = [];
              });
            this._$stopTimer();
            this.__originQuizDto.submitType = u.NORMAL;
            console.log('手动提交');
            this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
          }._$bind(this),
          cancelFunc: o,
        });
        c._$trackEvent(
          this.__typeTxt + '提交',
          'click',
          '提交' + this.__typeTxt + '，id:' + this.__baseInfo.tid,
        );
        if (!n.isPreview) {
          var i = {
            userId: c._$getWebUser().id,
            courseId: n.courseDto.id,
            termId: n.termDto.id,
            quizId: this.__baseInfo.tid,
          };
          if (this.__examId) i.examId = this.__examId;
          c._$trackEvent(this.__type, 'submit', c._$convertToJSONHex(i));
          c._$log2Study(this.__type, 'submit', i);
        }
      } else window.location.reload();
    };
    h.__canSubmitOrSave = function () {
      return !n.isPreview && c._$getCurServerTime() <= this.__baseInfo.deadline;
    };
    h.__storeAnswerDtos = function (e) {
      if (e) {
        var t = !1;
        d._$forEach(
          this.__originQuizDto.answers,
          function (i, n) {
            if (i.qid == e.qid) {
              t = !0;
              this.__originQuizDto.answers[n] = e;
            }
          }._$bind(this),
        );
        if (!t) {
          if (!this.__originQuizDto.answers) this.__originQuizDto.answers = [];
          this.__originQuizDto.answers.push(e);
        }
        console.log('save', this.__originQuizDto);
        this.__quizCache._$saveDraftAnswers(this.__originQuizDto, !!n.isPreview);
      }
    };
    h.__genTimeDragger = function () {
      if (!this.__dragger)
        this.__dragger = l._$$Dragger._$allocate({
          body: this.__timeNode,
          overflow: !0,
          direction: 0,
          onchange: function (e) {
            s._$setStyle(this.__timeNode, 'top', e.top + 'px');
            s._$setStyle(this.__timeNode, 'left', e.left + 'px');
          }._$bind(this),
        });
    };
    h.__showTime = function (e) {
      if (this.__sId) clearInterval(this.__sId);
      var t = e || this.__clientStartTime - this.__clientCostTime;
      if (!n.isPreview && t <= 0) {
        this._$stopTimer();
        this.__originQuizDto.autoSubmit = !0;
        this.__originQuizDto.submitType = u.AUTO;
        console.log('自动提交');
        if (!this.__hasSubmited)
          this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
        this.__hasSubmited = !0;
        c._$trackEvent(
          'quizAutoSave',
          'click',
          '强制提交' + this.__typeTxt + '，id:' + this.__baseInfo.tid + ',answeror:' + n.webUser.id,
        );
      }
      if (t > 0) this.__timeTxt.innerHTML = c._$formatVideoTime(t);
      this.__sId = setInterval(
        function () {
          this.__clientCostTime++;
          this.__showTime();
        }._$bind(this),
        1e3,
      );
      return t;
    };
    h.__addBeforeUnloadEvent = function () {
      window.onbeforeunload = function (e) {
        this.__onRefreshing = !0;
        e = e || window.event;
        var t = window.moocConfig.lang.KEY_LEARN_EXAM_ONE_CHANCE;
        e.returnValue = t;
        return t;
      }._$bind(this);
    };
    h.__hashChangeHandle = function (e) {
      console.log('__hashChangeHandle');
      if (this.__canSubmitOrSave()) {
        e.stopped = !0;
        c._$$CommonDialog._$showDialog({
          title: window.moocConfig.lang.KEY_LEARN_ARE_PAGE,
          message: window.moocConfig.lang.KEY_LEARN_EXAM_ONE_CHANCE,
          modal: !0,
          okTip: window.moocConfig.lang.KEY_LEARN_LEAVE_PAGE,
          okFunc: function () {
            this.__exitHandler();
            n.dispatcher._$redirect(e.newValue.href, { ignored: !0 });
          }._$bind(this),
          cancelTip: window.moocConfig.lang.KEY_LEARN_STAY_PAGE,
          cancelFunc: o._$bind(this),
        });
      }
    };
    h.__assistantHeart = function (e) {
      console.log('pageType=', e);
      this.assistantTimer = n.setInterval(
        function () {
          this.__quizCache._$assistantHeart(e);
        }._$bind(this),
        1e4,
      );
    };
    h.__clearUnload = function () {
      r._$clearEvent(location, 'beforeurlchange');
      window.onbeforeunload = null;
    };
    h.__destroy = function () {
      if (this.__examPool) this.__examPool = c._$$Quiz_Question_Pool._$recycle(this.__examPool);
      if (this.__dragger) this.__dragger = l._$$Dragger._$recycle(this.__dragger);
      if (this.__timer) this.__timer = n.clearInterval(this.__timer);
      this.__removeListern();
      this.__clearUnload();
      this.__supDestroy();
    };
  },
  'd414623f7407e577cd6c05efff08e96f',
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'c4bf52eb0c59916cecfa7899e5d4791a',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'c4bf52eb0c59916cecfa7899e5d4791a',
  'a328147ec582fd1a85c9f0beb695bb31',
);
