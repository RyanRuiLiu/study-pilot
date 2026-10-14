EDU(
  'e2ac31d5cc62575a67ff9909ff48be55',
  function (e, t, n, i, a, o, s, r) {
    function c(e) {
      if (void 0 != e) {
        var t = e.substr(1).split('&'),
          n = {},
          i = [];
        t.map(function (e) {
          i = e.split('=');
          if (void 0 != i[0]) n[i[0]] = encodeURIComponent(i[1]);
        });
        return n;
      }
    }
    var d = window,
      l = NEJ.P('nej.e'),
      _ = NEJ.P('nej.v'),
      u = NEJ.P('nej.ut'),
      f = NEJ.P('edu.u');
    var h = localStorage.getItem('hasLearnWeixinWarn');
    var p = document.querySelector('#wxItemTab'),
      m = document.querySelector('#appTab');
    var b = r._$parseUrlParams(window.location.search);
    var g = !!b.appId;
    if (!h) {
      p && p.classList.remove('hidden');
      localStorage.setItem('hasLearnWeixinWarn', '1');
      document.body.addEventListener('click', function () {
        p && p.classList.add('hidden');
      });
    }
    var v = !1;
    var E =
      window.courseDto &&
      courseDto.schoolPanel &&
      (5 == courseDto.schoolPanel.schoolType || 6 == courseDto.schoolPanel.schoolType);
    String.prototype.replace = window.moocTempReplace
      ? window.moocTempReplace
      : String.prototype.replace;
    String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
    var w = c(location.search);
    var x = w.form && 'certifiedGuid' === w.form;
    if (window.webUser.rightsTime && window.webUser.rightsTime < 0 && !x)
      i._$getMocCertifiedPopDto({ termId: window.termDto.id }, function (e) {
        if (e) {
          v = !0;
          window.reactComponentLoadBootstrap.init(
            {
              name: 'LearnCertifiedGuidModal',
              container: document.getElementById('j-learnCertified'),
            },
            { defaultCourse: e },
          );
        }
      });
    document.getElementById('j-learnMenu') &&
      window.reactComponentLoadBootstrap.init(
        { name: 'LearnLearnMenu', container: document.getElementById('j-learnMenu') },
        {
          termId: window.termDto && window.termDto.id,
          menuItemDtos: window.menuItemDtos,
          moocCourseDto: window.moocCourseDto,
          isSpoc: window.isSpoc,
          isKidSchool: E,
          supportAiLessonPlan: window.termDto && window.termDto.supportAiLessonPlan,
          studyVipFlag: window.termDto && window.termDto.studyVipFlag,
          courseCardDto: window.courseCardDto,
          guideVisiblePosition: window.termDto && termDto.guideVisiblePosition,
          isPreview: window.isPreview,
          graphId: window.termDto && window.termDto.graphId,
          onCollapsed: function (e) {
            if (e) document.querySelector('#j-menuBottomBlock').style.display = 'none';
            else document.querySelector('#j-menuBottomBlock').style.display = 'block';
          },
        },
      );
    var y =
      window.courseCardDto &&
      window.courseCardDto.productType &&
      window.courseCardDto.productType === f.CONST.PRODUCTTYPE.KAOYAN;
    var C = window.termDto && window.termDto.id;
    if (!y && !g && !v) {
      var $ = document.createElement('div');
      document.body.append($);
      window.reactComponentLoadBootstrap.setFtlData({ type: 'FollowMoocModal' });
      window.reactComponentLoadBootstrap.init({ name: 'LearnPageInvokeModal', container: $ });
    }
    if (!e._$isMobile()) {
      var T = function () {
        var e = document.querySelector('#communityTab');
        if (void 0 !== C && e && y && window.termDto && 1 != window.termDto.studyVipFlag) {
          var t = 'icourse163.main.learn.community.modal.opened';
          var n = function () {
            var e = 0 === location.pathname.indexOf('/learn/preview');
            if (e) return !1;
            var n = !0;
            var i = [];
            var a = window.localStorage.getItem(t);
            try {
              i = JSON.parse(a);
            } catch (o) {
              console.error('storage list parse error');
            }
            if (!a || '[object Array]' !== Object.prototype.toString.call(i))
              window.localStorage.setItem(t, JSON.stringify([C]));
            else {
              n = !(i || []).filter(function (e) {
                return C === parseInt(e, 10);
              })[0];
              if (n) {
                i.push(C);
                window.localStorage.setItem(t, JSON.stringify(i));
              }
            }
            return n;
          };
          window.__communityTabSetting = {
            isWap: !1,
            isTerm: !0,
            isLive: !1,
            id: window.termDto.id,
            isVisible: n(),
            onClose: function () {
              window.__communityTabSetting.isVisible = !1;
              window.__setCommunityTabSetting(window.__communityTabSetting);
            },
          };
          String.prototype.replace = window.moocTempReplace
            ? window.moocTempReplace
            : String.prototype.replace;
          String.prototype.match = window.moocTempMatch
            ? window.moocTempMatch
            : String.prototype.match;
          window.reactComponentLoadBootstrap.init({ name: 'LearnCommunityTab', container: e });
        } else e && e.parentNode.removeChild(e);
      }._$bind(this);
      var S = document.querySelector('#ydjpk-convert-modal');
      var I = y && 1 !== window.isSpoc && S && void 0 !== C;
      if (I) {
        String.prototype.replace = window.moocTempReplace
          ? window.moocTempReplace
          : String.prototype.replace;
        String.prototype.match = window.moocTempMatch
          ? window.moocTempMatch
          : String.prototype.match;
        window.reactComponentLoadBootstrap.init(
          { name: 'LearnYoudaoJPKConvertModal', container: S },
          {
            termId: C,
            callbackAfterPass: function () {
              T();
            },
          },
        );
      } else T();
      p &&
        p.addEventListener('hover', function (e) {
          e.target.classList.remove('hidden');
        });
      m &&
        m.addEventListener('hover', function (e) {
          e.target.classList.remove('hidden');
        });
      var N = setInterval(function () {
        var e = document.querySelector('.xcConfirm');
        var t = document.querySelector('#domoocbox');
        if (e || t) {
          e && e.remove();
          t && t.remove();
          clearInterval(N);
        }
      }, 500);
      i._$getCommonData({ key: 'mobile_config_web_server_config' }, function (e) {
        try {
          var t = JSON.parse(e) || {};
          for (var n in t) n && localStorage.setItem(n, t[n]);
        } catch (i) {}
      });
      if ('serviceWorker' in navigator)
        navigator.serviceWorker.getRegistrations().then(function (e) {
          for (var t in e) e[t].unregister();
        });
      if (window.isSpoc && 1 == window.isSpoc)
        try {
          var O = d.courseDto.schoolPanel.name;
          var D = d.courseDto.schoolPanel.shortName;
          document.querySelector('.new-nav-spoc-logo').innerHTML =
            '<a target="_blank" href="//www.icourse163.org/spoc/university/' +
            D +
            '">' +
            O +
            '</a>';
          document.querySelector('.u-navLogin-kaoyan').style.display = 'none';
          if (document.querySelector('.navLeft-func-f_div18')) {
            document.querySelector('.navLeft-func-f_div18_div22').style.display = 'none';
            document.querySelector('.navLeft-func-f_div18_div29').style.display = 'none';
            document.querySelector('.navLeft-func-f_div18_div32').style.display = 'none';
            document.querySelector('.navLeft-func-f_div18_div35').style.display = 'none';
          } else {
            document.querySelector('.navLeft-func-t_div1_div5').style.display = 'none';
            document.querySelector('.navLeft-func-t_div1_div12').style.display = 'none';
            document.querySelector('.navLeft-func-t_div1_div15').style.display = 'none';
          }
          var A = document.querySelector('.u-helplink');
          if (A) A.style.display = 'none';
        } catch (l) {}
      if (f._$browserSupportedOrGo()) {
        d.dispatcher = u._$$Dispatcher._$getInstance();
        d.dispatcher._$rule('config', location.config);
        d.dispatcher._$regist(
          f.umi('commonutil'),
          'shared/desktop/modules/commonutil/commonutil.html',
        );
        d.dispatcher._$regist(f.umi('courseLearn'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(f.umi('learnAnnounce'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(f.umi('learnScore'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(
          f.umi('certificationScore'),
          'learn/index/desktop/modules/learn.html',
        );
        d.dispatcher._$regist(
          f.umi('learnAIKnowledgeTermGraph'),
          'learn/index/desktop/modules/learn.html',
        );
        d.dispatcher._$regist(f.umi('aiNote'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(f.umi('myNote'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(f.umi('learnCustom'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(
          f.umi('learnContent'),
          'learn/index/desktop/modules/learn/content.html',
        );
        d.dispatcher._$regist(f.umi('learnTestList'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(f.umi('learnQuiz'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(f.umi('learnQuizScore'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(
          f.umi('learnHomework'),
          'learn/index/desktop/modules/learn/homework.html',
        );
        d.dispatcher._$regist(
          f.umi('learnOJHomework'),
          'learn/index/desktop/modules/learn/oj.html',
        );
        d.dispatcher._$regist(f.umi('learnExamList'), 'learn/index/desktop/modules/learn.html');
        d.dispatcher._$regist(
          f.umi('learnExamObjective'),
          'learn/index/desktop/modules/learn.html',
        );
        d.dispatcher._$regist(
          f.umi('learnExamObjectScore'),
          'learn/index/desktop/modules/learn.html',
        );
        d.dispatcher._$regist(
          f.umi('learnExamSubjective'),
          'learn/index/desktop/modules/learn/homework.html',
        );
        d.dispatcher._$regist(f.umi('learnExamOJ'), 'learn/index/desktop/modules/learn/oj.html');
        d.dispatcher._$regist(
          f.umi('learnNewExamAgreement'),
          'learn/index/desktop/modules/learn/newExamAgreement.html',
        );
        d.dispatcher._$regist(
          f.umi('notEnroll'),
          'learn/index/desktop/modules/learn/notEnroll.html',
        );
        d.dispatcher._$regist(
          f.umi('learnForumIndex'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('learnKnowledgeShare'),
          'learn/index/desktop/modules/learn.html',
        );
        d.dispatcher._$regist(
          f.umi('learnForumPanel'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('learnForumSearch'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('learnForumPersonal'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('learnForumDetail'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('learnForumTopic'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('learnForumEasyTopic'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('forumNoticeDetail'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('forumUserRanking'),
          'learn/index/desktop/modules/learn/forum.html',
        );
        d.dispatcher._$regist(
          f.umi('efficientExamine'),
          'learn/index/desktop/modules/learn/efficientExamine.html',
        );
        d.dispatcher._$regist(
          f.umi('knowledge'),
          'learn/index/desktop/modules/learn/knowledge.html',
        );
        d.dispatcher._$active();
        var U = d.decodeURIComponent(location.hash);
        if (
          U &&
          f._$isRightUMI(U, [
            f.umi('learnAnnounce'),
            f.umi('learnScore'),
            f.umi('certificationScore'),
            f.umi('learnAIKnowledgeTermGraph'),
            f.umi('aiNote'),
            f.umi('myNote'),
            f.umi('learnCustom'),
            f.umi('learnContent'),
            f.umi('learnTestList'),
            f.umi('learnQuiz'),
            f.umi('learnQuizScore'),
            f.umi('learnHomework'),
            f.umi('learnOJHomework'),
            f.umi('learnExamObjective'),
            f.umi('learnExamList'),
            f.umi('learnKnowledgeShare'),
            f.umi('learnExamObjectScore'),
            f.umi('learnExamSubjective'),
            f.umi('learnExamOJ'),
            f.umi('learnForumIndex'),
            f.umi('learnForumPanel'),
            f.umi('learnForumPersonal'),
            f.umi('learnForumSearch'),
            f.umi('learnForumDetail'),
            f.umi('learnForumTopic'),
            f.umi('learnForumEasyTopic'),
            f.umi('forumNoticeDetail'),
            f.umi('forumUserRanking'),
            f.umi('learnNewExamAgreement'),
            f.umi('efficientExamine'),
            f.umi('knowledge'),
          ])
        )
          d.dispatcher._$redirect(U, !0);
        else if (location.hash.indexOf('/knowledgeshare/') > -1)
          d.dispatcher._$redirect('#/learn/knowledgeshare', !0);
        else {
          var L = E ? 'learnContent' : 'learnAnnounce';
          d.dispatcher._$redirect(f.umi(L), !0);
        }
        var P =
          location.href.indexOf('appId=1fe22d51cfc678903b998c16daba2d5c') > -1 ||
          location.href.indexOf('appId=4fdf970bee996fe82cd83da1f00987d4') > -1 ||
          location.href.indexOf('appId=9f2453dcae965e4a51e58cf7bf8c8a96') > -1 ||
          location.href.indexOf('appId=0c93c953a819af4ae5c57a40364e418e') > -1;
        if (P) {
          document.body.classList.add('hide-modules-in-third-party-app');
          try {
            var k = document.querySelectorAll('#j-courseTabList .j-tabitem');
            k.forEach(function (e) {
              if ('考试' == e.dataset.name)
                e.querySelector('a').innerText = this.data.lang.KEY_LEARN_ASSESSMENT;
            });
          } catch (R) {}
        }
      }
    } else t.alert('该页面部分功能在手机浏览器不可用', '', '知道了');
  },
  'beec6201069596ecb83a09e5fc3eb415',
  'd414623f7407e577cd6c05efff08e96f',
  'd602194b441d13c28e8ce3a2972cc807',
  'c30079064832c51159d1cf37ab222277',
  '05914c6f767170cf483bb9df9a899f1e',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '93828627ddb358ed890cb65967a0c1de',
  'fb061c769bfc74628a81f422f590544c',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '08d2f36062baca2c8eb8327afd74d88c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '2b0ffed5486d600563959948fa2ea3e2',
);
