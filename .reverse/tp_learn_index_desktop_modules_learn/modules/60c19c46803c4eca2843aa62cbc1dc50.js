EDU(
  '60c19c46803c4eca2843aa62cbc1dc50',
  function (e, t, i, n, a, o, s, r) {
    var c = window,
      d = NEJ.P('nej.e'),
      _ = NEJ.P('nej.v'),
      l = NEJ.P('edu.d'),
      h = NEJ.P('edu.m'),
      f = NEJ.P('edu.u'),
      u = NEJ.P('nej.j'),
      p = NEJ.P('nej.u'),
      m = { LEARN_HALF_COOKIE_TYPE: 'lhct' },
      b,
      g,
      E = c.isSpoc;
    var v = s._$parseUrlParams(window.location.search);
    var w = !!v.appId;
    if (f.CONST.LEARN_TAB) {
      f.CONST.LEARN_TAB.KNOWLEDGE_SHARE = 30;
      f.CONST.LEARN_TAB.CERTIFICATION_SCORE = 40;
      f.CONST.LEARN_TAB.AI_NOTE = 41;
      f.CONST.LEARN_TAB.MY_NOTE = 42;
    }
    h._$$CourseLearn = NEJ.C();
    b = h._$$CourseLearn._$extend(h._$$Module, !0);
    g = h._$$CourseLearn._$supro;
    b.__buildFuncPoints = function () {
      g.__buildFuncPoints.apply(this, arguments);
      this.__learnUmis = {};
      this.__learnUmis[f.CONST.LEARN_TAB.ANNOUNCE] = f.umi('learnAnnounce');
      this.__learnUmis[f.CONST.LEARN_TAB.SCORE] = f.umi('learnScore');
      this.__learnUmis[f.CONST.LEARN_TAB.CERTIFICATION_SCORE] = f.umi('certificationScore');
      this.__learnUmis[f.CONST.LEARN_TAB.AI_NOTE] = f.umi('aiNote');
      this.__learnUmis[f.CONST.LEARN_TAB.MY_NOTE] = f.umi('myNote');
      this.__learnUmis[f.CONST.LEARN_TAB.CONTENT] = f.umi('learnContent');
      this.__learnUmis[f.CONST.LEARN_TAB.QUIZ_HOMEWORK] = f.umi('learnTestList');
      this.__learnUmis[f.CONST.LEARN_TAB.EXAM] = f.umi('learnExamList');
      this.__learnUmis[f.CONST.LEARN_TAB.FORUM] = f.umi('learnForumIndex');
      this.__learnUmis[f.CONST.LEARN_TAB.KNOWLEDGE_SHARE] = f.umi('learnKnowledgeShare');
      this.__learnUmis[f.CONST.LEARN_TAB.EFFICIENT] = f.umi('efficientExamine');
      this.__learnUmis[f.CONST.LEARN_TAB.KNOWLEDGE] = f.umi('knowledge');
      this.__learnUmis[f.CONST.LEARN_TAB.CUSTOM] = f.umi('learnCustom');
      this.cache = new l._$$COM_Cache_CourseCache();
      this.__commonCache = new l._$$COM_Cache_commonCache();
      this.memberCache = new l._$$COM_Cache_MemberCache();
      this.cache._$addEvent('onStartTermLearn', this.__onStartLearnCourseCb._$bind(this));
      this.memberCache._$addEvent('onCheckEmailStatus', this.__onCheckEmailStatus._$bind(this));
      this.__commonCache._$addEvent(
        'onCheckActivitySetting',
        function (e) {
          _._$addEvent(
            d._$get('j-activityDetail'),
            'click',
            function () {
              var t = JSON.parse(e);
              window.open(t.activityPostLink);
            }._$bind(this),
          );
        }._$bind(this),
      );
      this.__umisNodes = {};
      this.__courseTabList = d._$getByClassName(d._$get('j-courseTabList'), 'j-tabitem');
      this.__certifiedTabList = d._$getByClassName(d._$get('j-certifiedTabList'), 'j-tabitem');
      _._$addEvent(
        d._$get('j-closeNotice'),
        'click',
        function () {
          f._$hiddenNode(this.__shareNotice);
        }._$bind(this),
      );
      _._$addEvent(
        d._$get('j-ignoreActivityNotice'),
        'click',
        function () {
          f._$hiddenNode(this.__shareNotice);
        }._$bind(this),
      );
      _._$addEvent(
        d._$get('j-courseshare'),
        'click',
        function () {
          var e = {
            url: c.location.href,
            uid: c.webUser ? c.webUser.id : -1,
            stat_id: c.courseDto.id,
            stat_type: 15,
          };
          e['action'] = 'MOC_ACTIVITY_SHARE';
          this.__commonCache._$addGaLog({
            dt: this.__strToHexCharCode(JSON.stringify(e)).substr(2),
            p: 'mooc',
          });
        }._$bind(this),
      );
      this.__courseId = (c.courseDto || {}).id;
      this.__termId = (c.termDto || {}).id;
      if (r._$isUserLogin()) {
        this.__commentLinkNode = d._$get('j-comment-link');
        this.__commentRatingNode = d._$get('j-comment-rating');
        this.__comment = {};
        this.__commentLoaded = !1;
        this.cache._$getMemberLearningRate(
          { termId: this.__termId },
          function (e) {
            if (e && e.lessonLearned / (e.lessonsCount || 1) > 0.5) {
              this.__hasLearnedHalf = !0;
              this.__tryShowingCommentModalAfterLearningHalf();
            }
          }._$bind(this),
        );
        _._$addEvent(
          this.__commentLinkNode,
          'click',
          function () {
            if (this.__comment && this.__comment.id && c.courseDto.schoolPanel) {
              var e = c.termDto && 0 == termDto.mode;
              var t = e ? '' : '/spoc';
              window.open(
                t +
                  window.urlPrefix.courseInfoPrefix +
                  c.courseDto.schoolPanel.shortName +
                  '-' +
                  this.__courseId +
                  '?tab=comment&scrollToTab=1',
              );
            } else {
              f._$trackEvent(
                '课程学习页',
                window.moocConfig.lang.KEY_LEARN_CLICK_COURSE,
                this.__termId,
              );
              this.__showCommentModal(!1);
            }
          }._$bind(this),
        );
        this.__updateMyComment();
      }
      var e = window.menuItemDtos;
      c.learnBigTabNames = {};
      p._$forEach(
        e,
        function (e) {
          if (e.type == f.CONST.LEARN_TAB.CUSTOM) {
            var t = this.__learnUmis[e.type] + '?id=' + e.id;
            c.learnBigTabNames[t] = e.name;
          } else c.learnBigTabNames[this.__learnUmis[e.type]] = e.name;
        },
        this,
      );
      this.__noticeNode = d._$get('j-notice');
      this.__initNotice();
    };
    b.__getLearnHalfCookieType = function () {
      return m.LEARN_HALF_COOKIE_TYPE + '_' + (c.webUser && c.webUser).id + '_' + this.__termId;
    };
    b.__showCommentModal = function (e) {
      var t = c.courseDto && c.courseDto.shortName;
      var i = c.termDto && 0 == termDto.mode;
      var a = i ? '' : 'spoc/';
      var o = 'https://icourse163.org/' + a + 'course/' + t + '-' + this.__courseId;
      return n
        .showCommentModal(
          this.__getLearnHalfCookieType(),
          e,
          this.__courseId,
          this.__termId,
          c.courseDto && c.courseDto.name,
          c.termDto && c.termDto.bigPhoto,
          t,
          this.__comment.mark,
          this.__comment.content,
          this.__comment.id,
          void 0,
          '课程学习页',
          o,
        )
        .$on(
          'submit',
          function (e) {
            if (e && e.result) this.__updateMyComment();
          }._$bind(this),
        )
        .$on('ga', function (e) {
          f._$trackEvent(e.category, e.action, e.label);
        });
    };
    b.__tryShowingCommentModalAfterLearningHalf = function () {
      var e = !!(this.__commentLoaded && this.__comment && this.__comment.id);
      if (
        !E &&
        this.__commentLoaded &&
        !e &&
        this.__hasLearnedHalf &&
        !n.hasUserCanceledModal(this.__getLearnHalfCookieType())
      )
        this.__showCommentModal(!0);
    };
    b.__updateMyComment = function () {
      var e = window.courseDto && courseDto.schoolPanel && 5 == courseDto.schoolPanel.schoolType;
      var t = window.courseDto && courseDto.schoolPanel && 6 == courseDto.schoolPanel.schoolType;
      if (window.webUser && !e && !t)
        n.getMyComment(
          this.__courseId,
          function (e) {
            this.__comment = e || {};
            this.__commentLoaded = !0;
            d._$delClassName(this.__commentLinkNode, 'f-dn');
            if (this.__comment.id) {
              if (this.__ratingComp) {
                this.__ratingComp.destroy();
                delete this.__ratingComp;
              }
              if (this.__commentLinkNode) {
                d._$addClassName(this.__commentLinkNode, 'commented');
                this.__commentLinkNode.innerHTML =
                  '<i></i>' + window.moocConfig.lang.KEY_LEARN_VIEW_COMMENTS;
              }
            } else this.__tryShowingCommentModalAfterLearningHalf();
          }._$bind(this),
        );
      else this.__commentLinkNode.style.display = 'none';
    };
    b.__strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var i = 0; i < e.length; i++) t.push(e.charCodeAt(i).toString(16));
      return t.join('');
    };
    b.__initNotice = function () {
      if ((!f._$isUserLogin() || 0 == c.isEnroll) && this.__noticeNode) {
        this.__noticeUI = new o({
          data: { content: window.moocConfig.lang.KEY_LEARN_YOU_NOT_JOIN_COURSE },
        }).$inject(this.__noticeNode);
        this.__noticeUI.$on('attend', this.__attendCourse._$bind(this));
      }
    };
    b.__attendCourse = function () {
      if (!f._$isUserLogin()) f._$$LoginDialog._$showLogin({ from: 'learn' });
      else this.memberCache._$checkEmailStatus();
    };
    b.__onCheckEmailStatus = function (e) {
      if (e && e.emailStatus == f.CONST.EMAIL_ACTIVE_INIT)
        f._$$CommonMailDialog._$showDialog({
          start: -1,
          onGotoLearn: function () {
            this.__gotoLearn();
          }._$bind(this),
          enrollnotGotoLearn: function () {
            this.__enrollnotGotoLearn = !0;
            this.__gotoLearn();
          }._$bind(this),
        });
      else this.cache._$StartTermLearn(c.termDto.id, null);
    };
    b.__onStartLearnCourseCb = function () {
      c.isEnroll = !0;
      var e = { userId: f._$getWebUser().id, courseId: this.__courseId, termId: this.__termId };
      f._$log2Study('course', 'enroll', e);
      if (this.__enrollnotGotoLearn) window.location.reload();
      else {
        f.showToastTips({
          content:
            window.moocConfig.lang.KEY_LEARN_HAVE_COURSE +
            c.courseDto.name +
            window.moocConfig.lang.KEY_LEARN_SYMBOL3,
          type: 1,
          myStyle: 'attendCourse',
        });
        if (this.__noticeNode) f._$hiddenNode(this.__noticeNode);
        setTimeout(function () {
          window.location.reload();
        }, 1e3);
      }
    };
    b.__gotoLearn = function () {
      this.cache._$StartTermLearn(c.termDto.id, null);
    };
    b.__initTab = function () {
      var e = this.__certifiedTabList
        ? this.__courseTabList.concat(this.__certifiedTabList)
        : this.__courseTabList;
      if (e) c.learnBigTabNames = {};
      p._$forEach(
        e,
        function (e, t) {
          var i = parseInt(d._$dataset(e, 'type'));
          var n = this.__learnUmis[i];
          switch (i) {
            case f.CONST.LEARN_TAB.CUSTOM:
              n += '?id=' + d._$dataset(e, 'id');
              break;
            case f.CONST.LEARN_TAB.QUIZ_HOMEWORK:
              this.__umisNodes[f.umi('learnQuiz')] = e;
              this.__umisNodes[f.umi('learnQuizScore')] = e;
              this.__umisNodes[f.umi('learnHomework')] = e;
              this.__umisNodes[f.umi('learnOJHomework')] = e;
              break;
            case f.CONST.LEARN_TAB.EXAM:
              this.__umisNodes[f.umi('learnExamObjective')] = e;
              this.__umisNodes[f.umi('learnExamObjectScore')] = e;
              this.__umisNodes[f.umi('learnExamSubjective')] = e;
              this.__umisNodes[f.umi('learnExamOJ')] = e;
              break;
            case f.CONST.LEARN_TAB.FORUM:
              this.__umisNodes[f.umi('learnForumIndex')] = e;
              this.__umisNodes[f.umi('learnForumPanel')] = e;
              this.__umisNodes[f.umi('learnForumPersonal')] = e;
              this.__umisNodes[f.umi('learnForumDetail')] = e;
              this.__umisNodes[f.umi('learnForumTopic')] = e;
              this.__umisNodes[f.umi('learnForumEasyTopic')] = e;
              this.__umisNodes[f.umi('forumNoticeDetail')] = e;
              this.__umisNodes[f.umi('forumUserRanking')] = e;
              break;
            case f.CONST.LEARN_TAB.KNOWLEDGE_SHARE:
              this.__umisNodes[f.umi('learnKnowledgeShare')] = e;
              break;
            case f.CONST.LEARN_TAB.EFFICIENT:
              this.__umisNodes[f.umi('efficientExamine')] = e;
              break;
            case f.CONST.KNOWLEDGE:
              this.__umisNodes[f.umi('knowledge')] = e;
          }
          c.learnBigTabNames[n] = e.innerText;
          this.__umisNodes[n] = e;
          var a = e.getElementsByTagName('a');
          if (a && a.length && n) a[0].href = '#' + n;
          _._$addEvent(e, 'click', this.__tabClickHandle._$bind(this, e, n));
        },
        this,
      );
    };
    b.__tabClickHandle = function (e, t) {
      if ('/learn/knowledgeshare' === t) {
        window.DATracker &&
          window.DATracker.track('学习页-知识共享tab点击-iaw', {
            pagename: 'learn',
            user_id: f._$getWebUser().id,
            course_id: this.__courseId,
            term_id: this.__termId,
          });
        var i = location.search.match(/&editId=\d+/);
        if (i) {
          var n = location.search;
          n = n.replace(i[0], '');
          location.href = location.origin + location.pathname + n + '#/learn/knowledgeshare';
        }
      }
      f._$trackEvent('learnPageTab', 'click', '学习页面tab点击：' + c.learnBigTabNames[t]);
    };
    b.__handleTabs = function (e) {
      var t = d._$getByClassName(document, 'tabitem-more')[0];
      if (t) d._$delClassName(t, 'u-curtab');
      if (this.__curTabNode) d._$delClassName(this.__curTabNode, 'u-curtab');
      this.__curTabNode = this.__umisNodes[e];
      if (this.__curTabNode)
        if (window.trackData)
          window.trackData.tabName = this.__curTabNode.getAttribute('data-name');
        else window.trackData = { tabName: this.__curTabNode.getAttribute('data-name') };
      if (this.__curTabNode) {
        var i = !1;
        if (i) {
          if (t) d._$addClassName(t, 'u-curtab');
        } else d._$addClassName(this.__curTabNode, 'u-curtab');
      }
    };
    b.__onShow = function (t) {
      DATracker.track('课程学习页展示', {
        pagename: 'courselearn',
        user_id: window.webUser ? window.webUser.id : '',
        course_id: window.courseCardDto ? window.courseCardDto.id : '',
        learnmode: window.learnMode,
        version: window.courseCardDto
          ? window.courseCardDto.efficientCourse
            ? 'efficient'
            : 'old'
          : '',
      });
      g.__onShow.apply(this, arguments);
      f._$openMobilePageOld({ courseId: this.__courseId, termId: this.__termId });
      this.__onRefresh(t);
      setTimeout(this.__genWeiXinQR._$bind(this), 0);
      setTimeout(this.__hideShareArea._$bind(this), 10);
      window.addEventListener('hashchange', function (e) {
        try {
          var t = ['#/learn/testlist', '#/learn/content', '#/learn/examlist'];
          if (t.indexOf(e.target.location.hash) > -1) {
            var i = document.querySelector('#j-global-ai-robot');
            i && i.classList.remove('f-dn');
          }
          if (location.hash.indexOf('/learn/content') > -1) {
            document.oncontextmenu = function () {
              alert('禁止使用右键');
              window.event.returnValue = !1;
            };
            document.onkeydown = function (e) {
              var t = window.event || e;
              if ((t.ctrlKey && 67 == t.keyCode) || (t.metaKey && 67 == t.keyCode)) {
                t.returnValue = !1;
                alert('禁止复制');
              }
            };
          }
        } catch (n) {}
      });
      window.addEventListener('click', function (t) {
        try {
          var i = d._$hasClassName(t.target, 'j-global-ai-question-entry');
          var n = t.target.dataset.id;
          var a;
          if (i) {
            window.DATracker &&
              window.DATracker.track('认证MOOC课程认证模式答题解析页-提问按钮-点击-iaw', {
                pagename: 'learn',
                user_id: window.webUser ? window.webUser.id : '',
                course_id: window.courseDto && window.courseDto.id,
                term_id: window.termDto && window.termDto.id,
              });
            var o = window.learnUtilQuestionList || [];
            for (var s = 0; s < o.length; s++) {
              var r = o[s];
              if (r.id == n) a = r;
            }
            e._$renderGLobalAIButton(
              {
                pageType:
                  location.hash.indexOf('/learn/exam') > -1 ? e.PAGE_TYPE.EXAM : e.PAGE_TYPE.QUIZ,
                sceneType: e.SCENE_TYPE.FAST_QUIZ,
                termId: window.termDto && window.termDto.id,
                courseId: window.courseDto && window.courseDto.id,
                courseName: window.courseDto && window.courseDto.name,
                questions: window.learnUtilQuestionList || [],
                question: a,
                timestamp: new Date().getTime(),
              },
              document.querySelector('#j-global-ai-robot'),
            );
          }
        } catch (c) {}
      });
    };
    b.__hideShareArea = function () {
      var e = d._$get('j-courseshare');
      var t = d._$get('wxItemTab');
      var i = d._$get('appTab');
      if (w) {
        d._$addClassName(e, 'f-dn');
        d._$addClassName(t, 'f-dn');
        d._$addClassName(i, 'f-dn');
      }
    };
    b.__genWeiXinQR = function () {
      if (c.activityNotEnd && c.webUser)
        e =
          c.moocHref +
          c.urlPrefix.courseInfoPrefix +
          c.courseDto.schoolPanel.shortName +
          '-' +
          c.courseDto.id +
          '?inviterId=' +
          c.webUser.id +
          '&activityId=' +
          c.activityId +
          '&isWebShare=1';
      else
        e =
          c.moocHref +
          c.urlPrefix.courseInfoPrefix +
          c.courseDto.schoolPanel.shortName +
          '-' +
          c.courseDto.id;
      var e = E ? window.location.protocol + '//www.icourse163.org' : e;
      this.__weixinQRParams = e;
      this.__genShareUI();
    };
    b.__genShareUI = function () {
      var e = c.courseDto,
        t = [
          'MOOC是全新完整的教学模式--定期开课、简短视频，提交作业，学完还能考取认证证书，更可以结交到新朋友！',
          window.moocConfig.lang.KEY_LEARN_RECOMMEND_EVERYONE,
          '我在#中国大学MOOC#平台上学习，',
        ];
      var i = E ? t[2] : '我在#中国大学MOOC# 学《' + e.name + '》课程，',
        n = E ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，',
        a = E ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，';
      var o =
          '中国大学MOOC联合高教社考试中心和任汝芬、杨净、陈剑等众多考研名师，为考生提供权威的考研辅导服务，快来学习吧！',
        s =
          window.moocConfig.lang.KEY_LEARN_I_STUDYING +
          c.courseDto.name +
          '》，@中国大学MOOC 联合高教社考试中心和任汝芬、杨净、陈剑等众多考研名师，为考生提供权威的考研辅导服务，快来学习吧！#考研#';
      var r = '';
      if (c.activityNotEnd && c.webUser) {
        if (location.href.indexOf('?') >= 0)
          r =
            location.href +
            '&inviterId=' +
            c.webUser.id +
            '&activityId=' +
            c.activityId +
            '&isWebShare=1';
        else
          r =
            location.href +
            '?inviterId=' +
            c.webUser.id +
            '&activityId=' +
            c.activityId +
            '&isWebShare=1';
        this.__firstActivityLearnCookiekey = 'first_activity_learn' + c.webUser.id;
        if (!u._$cookie(this.__firstActivityLearnCookiekey)) {
          f._$showNode(this.__shareNotice);
          u._$cookie(this.__firstActivityLearnCookiekey, '1');
        }
        this.__commonCache._$checkActivitySetting('moocShareActivityResult');
      } else r = location.href;
      if (c.courseDto.productType == f.CONST.PRODUCTTYPE.KAOYAN)
        f._$$ShareUI._$allocate({
          parent: d._$get('j-coushare'),
          title: s,
          topic: s,
          description: o,
          pic: c.termDto.bigPhoto,
          weixinQRParams: this.__weixinQRParams,
          url: E ? '//www.icourse163.org' : r,
          from: window.moocConfig.lang.KEY_LEARN_COURSE_PAGE1,
        });
      else
        f._$$ShareUI._$getInstance({
          parent: d._$get('j-coushare'),
          title: i + t[0],
          topic: n + t[1],
          description: a + t[0],
          pic: c.termDto.bigPhoto,
          weixinQRParams: this.__weixinQRParams,
          url: E ? '//www.icourse163.org' : r,
          from: window.moocConfig.lang.KEY_LEARN_COURSE_PAGE1,
        });
    };
    b.__addScriptTag = function (e) {
      var t = document.createElement('script');
      t.setAttribute('type', 'text/javascript');
      t.src = e;
      document.body.appendChild(t);
    };
    b.__resultShow = function () {
      var e = this;
      return function (t) {
        e.__weixinQR = t.url;
        e.__genShareUI();
      };
    };
    b.__onRefresh = function (e) {
      g.__onRefresh.apply(this, arguments);
      var t = e.target;
      if (t == f.umi('learnCustom')) t += '?id=' + e.param.id;
      this.__handleTabs(t);
      if (!c.isSpoc && !w && !this._recommendSideUI) this._initRecommendUI();
      f._$trackPageView(!0);
    };
    b._initRecommendUI = function () {
      if (this._recommendSideUI) {
        this._recommendSideUI.destroy();
        this._recommendSideUI = null;
      }
      if (document.querySelector('#j-recommend-side'))
        this._recommendSideUI = new i({
          data: {
            title: window.moocConfig.lang.INTRO_BOTTOM_COURSE_WEB,
            recommendOpt: {
              targetId: c.termDto.id,
              targetTypes: [
                t.RECOMMEND_POSITION.INTRO_BOTTOM_COURSE_WEB,
                t.RECOMMEND_POSITION.INTRO_BOTTOM_FRONT_CATEGORY_WEB,
              ],
              number: 4,
            },
            logOpt: {
              eventId: window.moocConfig.lang.KEY_LEARN_CLICK_PAGE,
              data_cate: window.moocConfig.lang.KEY_LEARN_CLICK_PAGE,
              data_action: 'web_course_learn_recommend_click',
              data_label: window.moocConfig.lang.KEY_LEARN_STUDY_PAGE,
            },
            title: window.moocConfig.lang.KEY_LEARN_RECOMMENDED_YOU,
            showToggle: !0,
            key: c.termDto.id,
            adultOutVendor: 'zw_mooc_pcmkxxytj',
            outVendor: 'zw_mooc_pckcxxywntj',
          },
        }).$inject('#j-recommend-side');
    };
    b.__onHide = function () {
      g.__onHide.apply(this, arguments);
      d._$removeByEC(this.__body);
    };
    c.dispatcher._$loaded(f.umi('courseLearn'), h._$$CourseLearn);
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '93828627ddb358ed890cb65967a0c1de',
  '4506823daf61ad0e7db0db8ecc157b4c',
  '4357e0744757d18da9905f552230abb4',
  '25fbb912c004f2caca2d7f90579d7371',
  'abd6349a635a491f15e90e242d981f47',
  'fb061c769bfc74628a81f422f590544c',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'fb80274a93905bc7807baceaedc07c15',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  'be836b3e4eb69c3616f9cc097e503955',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '126d23b5ac6aef1dd83e84a4a70524a3',
  'a936afb5ecab0e9286c3c9d05341571d',
  'beec6201069596ecb83a09e5fc3eb415',
  '891a76809ded82c88f5536f4458ae1ad',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'fe86216ed59e3103a56c42c850d389f0',
);
