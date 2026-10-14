EDU(
  'c79129330f9f62d7d9cba5762dbf350a',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('nej.j'),
      _ = NEJ.P('nej.v'),
      l,
      h;
    o._$$LearnAnnounce = NEJ.C();
    l = o._$$LearnAnnounce._$extend(o._$$Module, !0);
    h = o._$$LearnAnnounce._$supro;
    l.__getXhtml = function () {
      return a._$getHtmlTemplate(
        'jst-edu-learnAnnounce',
        r._$merge({ user: s._$getWebUser() }, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    l.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    l.__buildFuncPoints = function () {
      h.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = a._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__announceNode = a._$getByClassName(this.__body, 'j-announce')[0];
      this.__dynamicInfoNode = a._$getByClassName(this.__body, 'j-dynamicInfo')[0];
      this.__progressNode = a._$getByClassName(this.__body, 'j-progressbar')[0];
      this.__nextlinkNode = a._$getByClassName(this.__body, 'j-nextlink');
      this.__mailNoticeNode = a._$getByClassName(this.__body, 'j-mailNotice')[0];
      this.__noticeCache = new c._$$COM_Cache_TermNoticeCache();
      this.__noticeCache._$addEvent(
        'onGetAllAnnouncementByTerm',
        this.__getTermNoticesCb._$bind(this),
      );
      this.__settingsCache = new c._$$COM_Cache_MemberCache();
      if (e.isCh())
        this.__settingsCache._$addEvent(
          'onCheckEmailStatus',
          this.__onCheckEmailStatus._$bind(this),
        );
      this.__upCommingCache = new c._$$COM_Cache_CourseCtCache();
      this.__upCommingCache._$addEvent('onGetNewestItems', this.__getNewestItemsCb._$bind(this));
      if (t.donate && 1 == t.donate)
        s._$showNode(a._$getByClassName(this.__body, 'j-donatelink')[0]);
      else s._$hiddenNode(a._$getByClassName(this.__body, 'j-donatelink')[0]);
      this.__noticeCache._$addEvent(
        'onGetMocTermScoreRank',
        this.__onGetMocTermScoreRank._$bind(this),
      );
      this.__noticeCache._$addEvent(
        'onGetScholarshipRecord',
        this.__cbGetScholarshipRecord._$bind(this),
      );
      this.__mcache = new c._$$COM_Cache_ManageStudentCache();
      this.__mcache._$addEvent('onGetMocAchivementDto', this.__cbGetMocAchivementDto._$bind(this));
    };
    l.__cbGetScholarshipRecord = function (e) {
      this.__type = 2;
      this.__data = e;
      this.__checkGradeClickBind();
      if (!this.__showWelcome)
        if (1 == e.code)
          if (e.scholarshipInfoValid) {
            if (
              !d._$cookie(
                'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoValid',
              )
            ) {
              d._$cookie(
                'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoValid',
                { path: '/', domain: '.' + t.moocHost, value: !0, expires: 365 },
              );
              s._$$GradeDialog._$showDialog({ type: 2, data: e });
            }
          } else if (
            !d._$cookie(
              'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoInvalid',
            )
          ) {
            d._$cookie(
              'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoInvalid',
              { path: '/', domain: '.' + t.moocHost, value: !0, expires: 1 },
            );
            s._$$GradeDialog._$showDialog({ type: 2, data: e });
          }
    };
    l.__onGetMocTermScoreRank = function (e) {
      this.__type = 1;
      this.__data = e;
      this.__checkGradeClickBind();
      if (!this.__showWelcome)
        if (
          !d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_rankChange') &&
          (e.code == -1 ||
            (1 == e.code &&
              e.resultDto.rankNew &&
              e.resultDto.rankLast &&
              Math.abs(e.resultDto.rankNew - e.resultDto.rankLast) >= 15))
        ) {
          d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_rankChange', {
            path: '/',
            domain: '.' + t.moocHost,
            value: !0,
            expires: 1,
          });
          s._$$GradeDialog._$showDialog({ type: 1, data: e });
        }
    };
    l.__cbGetMocAchivementDto = function (e) {
      var i = e.status;
      if (i == s.CONST.ACHIEVEMENT_STATUS_CONFIRMED)
        this.__noticeCache._$getScholarshipRecord(t.termDto.id);
      else this.__noticeCache._$getMocTermScoreRank(t.termDto.id);
    };
    l.__checkGradeClickBind = function () {
      _._$addEvent(
        this.__checkGradeNode,
        'click',
        function () {
          s._$$GradeDialog._$showDialog({ type: this.__type, data: this.__data });
        }._$bind(this),
      );
    };
    l.__getTermNoticesCb = function (e) {
      var i = s._$$AnnounceListUI._$allocate({
        parent: this.__announceNode,
        emptyTips: window.moocConfig.lang.KEY_LEARN_WAIT_TEACHER,
        showNum: s._$isSpocSync() ? 5 : 10,
        lists: e,
      });
      this.__announceUIs.push(i);
      if (s._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = s._$$SpocMoocSplit._$allocate({ parent: this.__announceNode });
        this.__noticeCache._$getAllAnnouncementByTermFront(
          t.moocTermDto.id,
          s.CONST.NOTICE_TYPE_TERM,
          t.isPreview,
        );
      }
    };
    l.__getNewestItemsCb = function (e) {
      if (e) {
        e.urlhref = '#' + s.umi('learnContent') + '?type=detail&id=';
        this.__dynamicNode = a._$html2node('<div class="m-dynamic"></div>');
        var i, n, o;
        if (e.latestChapter && e.latestLesson && e.latestUnit) {
          i = e.latestChapter.name + '/' + e.latestLesson.name;
          n =
            '#' +
            s.umi('learnContent') +
            '?type=detail&id=' +
            e.latestLesson.id +
            '&cid=' +
            e.latestUnit.id;
        } else {
          o = !0;
          i = t.courseDto.name;
          n = '#' + s.umi('learnContent');
        }
        this.__progressNode.innerHTML = a._$getHtmlTemplate(
          'jst-edu-learnAnnouncePGB',
          r._$merge(
            { user: s._$getWebUser(), link: n, name: i, first: o },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        );
        if (e.lessons)
          for (var c = 0; c < e.lessons.length; c++) {
            var d = this.__charUtil._$getCharsL(e.lessons[c].name);
            if (d > 24)
              e.lessons[c].shortName =
                this.__charUtil._$sliceCnAndEns(e.lessons[c].name, 20) + '...';
            else e.lessons[c].shortName = e.lessons[c].name;
          }
        e.infos = [];
        if (e.upcoming)
          for (var _ in e.upcoming)
            if (e.upcoming.hasOwnProperty(_) && e.upcoming[_]) {
              var l = e.upcoming[_];
              var h = { name: l.name || l.examName };
              var d = this.__charUtil._$getCharsL(l.name);
              if ('needEvaluateHomework' == _ || 'needSubmitHomework' == _)
                h.urlhref = '#' + s.umi('learnHomework') + '?id=' + l.testId;
              else if ('needSubmitQuiz' == _)
                h.urlhref = '#' + s.umi('learnQuiz') + '?id=' + l.testId;
              else if ('needSubmitExam' == _) h.urlhref = '#' + s.umi('learnExamList');
              else if ('needEvaluateExam' == _)
                h.urlhref =
                  '#' + s.umi('learnExamSubjective') + '?id=' + l.testId + '&eid=' + l.examId;
              h.submitDeadline = s._$formatCommonTime(l.submitDeadline);
              if (l.evaluateDeadline) h.evaluateDeadline = s._$formatCommonTime(l.evaluateDeadline);
              e.infos.push(h);
            }
        this.__dynamicNode.innerHTML = a._$getHtmlTemplate(
          'jst-edu-learnDynamicInfo',
          r._$merge({ upcoming: e }, { lang: (window.moocConfig || {}).lang || {} }),
        );
        this.__dynamicInfoNode.appendChild(this.__dynamicNode);
        this.__showScholarTips();
      }
    };
    l.__onCheckEmailStatus = function (e) {
      if (e) {
        var t = e.emailStatus,
          i = e.email;
        if (3 == t) s._$hiddenNode(this.__mailNoticeNode);
        else {
          s._$showNode(this.__mailNoticeNode);
          this.__mailNoticeNode.innerHTML = a._$getHtmlTemplate(
            'jst-edu-learnAnnounceMailStatus',
            r._$merge({ emailStatus: t, email: i }, { lang: (window.moocConfig || {}).lang || {} }),
          );
          this.__sendAgain = a._$get('j-sendAgain');
          if (this.__sendAgain)
            _._$addEvent(this.__sendAgain, 'click', this.__sendVerifyEmail._$bind(this, !0));
        }
      }
    };
    l.__sendVerifyEmail = function (e) {
      this.__settingsCache._$sendActiveEmail(e);
    };
    l.__onShow = function (e) {
      h.__onShow.apply(this, arguments);
      this.__moduleNameNode.innerText = (t.learnBigTabNames && t.learnBigTabNames[e.target]) || '';
      this.__onRefresh(e);
    };
    l.__onRefresh = function (e) {
      h.__onRefresh.apply(this, arguments);
      this.__clearUIs();
      this.__termId = t.termDto.id;
      this.__scholarshipFlag = this.__isScholarshiped();
      this.__noticeCache._$getAllAnnouncementByTermFront(
        this.__termId,
        s.CONST.NOTICE_TYPE_TERM,
        t.isPreview,
      );
      if (s._$isUserLogin()) this.__settingsCache._$checkEmailStatus();
      this.__upCommingCache._$getNewestItems(this.__termId);
      this.__charUtil = new o._$$CharasetUtil();
    };
    l.__showScholarTips = function () {
      this.__checkGradeNode = a._$getByClassName(this.__progressNode, 'j-checkGrade')[0];
      if (this.__scholarshipFlag) {
        s._$showNode(this.__checkGradeNode);
        if (!d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_ISWELCOMED')) {
          this.__welcomeUI = s._$$CommonDialog._$allocate({
            title: '',
            closeBtnHidden: !0,
            message:
              '<img src="//edu-image.nosdn.127.net/D754C9AA461C01B1DD840DB1746B61B2.png?imageView&thumbnail=160y160&quality=100" alt="welcome" class="f-db"><div class="title f-f0">欢迎加入“十万元奖学金悬赏令”活动！</div><hr class="line"><div class="desc f-f0">' +
              window.moocConfig.lang.KEY_LEARN_CLICK_GRADE_STATUS_YOU_CAN_VIEW_YOUR_SCORES +
              '</div>',
            okTip: window.moocConfig.lang.KEY_LEARN_UNDERSTOOD,
            okFunc: function () {
              d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_ISWELCOMED', {
                path: '/',
                domain: '.' + t.moocHost,
                value: !0,
                expires: 365,
              });
            }._$bind(this),
            customStyle: 'u-welcome',
          });
          this.__welcomeUI._$show();
          this.__welcomeUINode = a._$getByClassName(document.body, 'u-welcome')[0];
          this.__welcomeUINode.style.top = this.__checkGradeNode.offsetTop + 'px';
          this.__welcomeUINode.style.left = this.__checkGradeNode.offsetLeft - 400 + 'px';
          this.__showWelcome = !0;
          if (this.__welcomeUINode)
            _._$addEvent(
              window,
              'resize',
              function () {
                this.__welcomeUINode.style.top = this.__checkGradeNode.offsetTop + 'px';
                this.__welcomeUINode.style.left = this.__checkGradeNode.offsetLeft - 400 + 'px';
              }._$bind(this),
            );
        }
        this.__mcache._$getMocAchivementDto(t.termDto.id);
      }
    };
    l.__isScholarshiped = function () {
      var e = [
        1001605004, 566001, 1001582005, 1001613003, 1001581002, 1001602008, 1001579001, 1001581011,
        1001656003, 1001657002,
      ];
      var i = !1;
      r._$forEach(
        e,
        function (e) {
          if (e == t.termDto.id) i = !0;
        }._$bind(this),
      );
      return i;
    };
    l.__clearUIs = function () {
      r._$forEach(
        this.__announceUIs,
        function (e, t) {
          e = s._$$AnnounceListUI._$recycle(e);
        }._$bind(this),
      );
      this.__announceUIs = [];
      if (this.__splitUI) this.__splitUI = s._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    l.__onHide = function () {
      this.__clearUIs();
      a._$delClassName(this.__body.parentNode, 'm-notice f-pr');
      this.__dynamicInfoNode.innerHTML = '';
      h.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
    t.dispatcher._$loaded(s.umi('learnAnnounce'), o._$$LearnAnnounce);
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '9d279df4af180d366f079ab901224cbc',
  'ad72e09e8978dc83423b503971b6294c',
  '891a76809ded82c88f5536f4458ae1ad',
  '09d18bbcabfd2b0ead3cd46dd29ee54b',
  '7ae1049f52447f73129209d74071c691',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '7f3f549154c6d7ef555fee3c9fa50df8',
  '5c4d74bc0e709956e1cf2155560a30ff',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  'bf8d09e46d2369efd6e41b29fe211330',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
