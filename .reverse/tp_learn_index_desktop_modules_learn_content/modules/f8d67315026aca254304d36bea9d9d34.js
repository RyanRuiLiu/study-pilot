EDU(
  'f8d67315026aca254304d36bea9d9d34',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f) {
    var h = window,
      p = NEJ.P('nej.e'),
      m = NEJ.P('nej.v'),
      b = NEJ.P('edu.d'),
      g = NEJ.P('edu.u'),
      v = NEJ.P('nej.u'),
      E;
    var w =
      '<span class="f-icon" style="display:inline-flex;vertical-align:middle"><svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.333 2.667H21.333L26.667 8V27.333C26.667 28.438 25.771 29.333 24.667 29.333H7.333C6.229 29.333 5.333 28.438 5.333 27.333V4.667C5.333 3.562 6.229 2.667 7.333 2.667Z" fill="white" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><path d="M16 10L18.06 14.173L22.667 14.843L19.333 18.092L20.12 23.333L16 20.833L11.88 23.333L12.667 18.092L9.333 14.843L13.94 14.173L16 10Z" fill="white" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></span>';
    l.batch(_);
    var y = s._$parseUrlParams(window.location.search);
    var x = !!y.appId;
    g._$$LessonDetailUI = NEJ.C();
    E = g._$$LessonDetailUI._$extend(g._$$UIBase, !0);
    var T = p._$pushCSSText(
      '        .previewAIBox { display:flex; flex-direction:column; align-items:flex-end; margin-top:12px; }        .previewAIContentSwitch .j-switch{ margin-left:12px }        .previewAIContentSwitch .j-switch .ux-check-switcher{ width:40px; height:20px;}        .previewAIContentSwitch .j-switch .ux-check-switcher-round { width:20px; height:20px; border-radius:50%; }        .previewAIContentSwitch {display:flex;align-items:center;margin-bottom: 12px;}        .previewAIContentSwitch .switchText{font-size:14px}        .j-askt{ margin-left: 32px; }    ',
    );
    E.__initXGui = function () {
      this.__seed_html = p._$addNodeTemplate(
        p._$getHtmlTemplate('jst-lessonDetail', {
          lang: (window.moocConfig || {}).lang || {},
          isCertifiedPreview: window.isCertifiedPreview,
        }),
      );
      this.__seed_css = T;
    };
    E.__initNode = function () {
      this.__supInitNode();
      this.__lsemptyNode = p._$getByClassName(this.__body, 'j-empty')[0];
      this.__lscontentNode = p._$getByClassName(this.__body, 'j-lscontent')[0];
      this.__askTeacherNode = p._$getByClassName(this.__body, 'j-askt')[0];
      this.__breadCrumbNode = p._$getByClassName(this.__body, 'j-breadcb')[0];
      this.__unithelplinkNode = p._$getByClassName(this.__body, 'j-unithelplink')[0];
      this.__unitJoinQa = p._$getByClassName(this.__body, 'j-unitQanything')[0];
      this.__unitctNode = p._$getByClassName(this.__body, 'j-unitct')[0];
      this.__pageLeftNode = p._$getByClassName(this.__body, 'page-icon-left')[0];
      this.__pageRightNode = p._$getByClassName(this.__body, 'page-icon-right')[0];
      this.__learningPlanNode = p._$getByClassName(this.__body, 'j-learning-plan')[0];
      this.__unitsListNode = p._$getByClassName(this.__body, 'j-unitslist')[0];
      if (window.isCertifiedPreview) {
        this.__previewAIContentSwitchNode = p._$getByClassName(this.__body, 'j-switch')[0];
        this.__previewAIBox = p._$getByClassName(this.__body, 'previewAIBox')[0];
      }
      this.__contentCache = new b._$$COM_Cache_CourseCtCache();
      this.__contentCache._$addEvent('onGetLessonUnitVo', this.__onGetLessonUnitCb._$bind(this));
      this.__courseCache = new b._$$COM_Cache_CourseCache();
      this.__courseCache._$addEvent('onCheckTermLearn', this.__onCheckTermLearnCb._$bind(this));
    };
    E.__genUnitsNav = function () {
      var e = '';
      this.__navUnitsMap = {};
      this.__navUnitsIdArr = [];
      var t = this.__lessonVo.units.length;
      var n = 100 / t;
      v._$forEach(
        this.__lessonVo.units,
        function (t, n) {
          this.__navUnitsMap[t.id] = { vo: t };
          this.__navUnitsIdArr.push(t.id);
          var i,
            o = '',
            a = 'f-icon ',
            s = '',
            r = '';
          switch (t.contentType) {
            case g.CONST.LESSONUNIT_VIDEO:
              i = window.moocConfig.lang.KEY_LEARN_VIDEO;
              a += 'u-icon-video2';
              break;
            case g.CONST.LESSONUNIT_PDF:
              i = window.moocConfig.lang.KEY_LEARN_DOCUMENT;
              a += 'u-icon-doc';
              break;
            case g.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
              i = '互动课件';
              s = w;
              break;
            case g.CONST.LESSONUNIT_TEXT:
              i = window.moocConfig.lang.KEY_LEARN_RICH_TEXT;
              a += 'u-icon-text';
              break;
            case g.CONST.LESSONUNIT_QUESTION:
              i = window.moocConfig.lang.KEY_LEARN_QUIZ_QUESTIONS;
              a += 'u-icon-test3';
              break;
            case g.CONST.LESSONUNIT_DISCUSS:
              i = window.moocConfig.lang.KEY_LEARN_DISCUSS;
              a += 'u-icon-discuss2';
              break;
            case g.CONST.LESSONUNIT_LIVE:
              i = window.moocConfig.lang.KEY_LEARN_LIVE;
              a += 'u-icon-icon-live2';
              r = '<span class="live-replay-text live-replay-text-' + t.id + '" >' + o + '</span>';
              break;
            case 10:
              i = window.moocConfig.lang.KEY_LEARN_MUSIC_VIDEO;
              a += 'u-icon-music-video';
              break;
            case 11:
            case 12:
              i = window.moocConfig.lang.KEY_LEARN_MUSIC_EXERCISE;
              a += 'u-icon-music-exercise';
          }
          e +=
            '<li class="f-fl" title="' +
            i +
            '：' +
            v._$escape(t.name) +
            '" data-id=' +
            t.id +
            '" data-contentid=' +
            t.contentId +
            '>' +
            (s || '<span class="' + a + '"></span>') +
            (r || '<span class="unit-name">' + v._$escape(t.name)) +
            '</li>';
        }._$bind(this),
      );
      this.__unitsListNode.innerHTML = e;
      if (!this.hasEntry) {
        this.hasEntry = !0;
        m._$addEvent(this.__pageLeftNode, 'click', this.__onChangePage._$bind(this, -1));
        m._$addEvent(this.__pageRightNode, 'click', this.__onChangePage._$bind(this, 1));
      }
      this.screenPage = this.screenPage || 1;
      var i = this.__unitsListNode.scrollWidth;
      this.onePageWidth = this.__unitsListNode.clientWidth;
      this.screenPageTotal = Math.ceil(i / this.onePageWidth);
      this.__resetPage();
      var o = p._$getChildren(this.__unitsListNode);
      v._$forEach(
        o,
        function (e, t) {
          var n = parseInt(p._$dataset(e, 'id'));
          this.__navUnitsMap[n]['navNode'] = e;
          this.__doInitDomEvent([
            [e, 'click', this.__onRedirectUnit._$bind(this, n, this.__lessonVo.units[t])],
          ]);
          if (this.__curNavId == n) p._$addClassName(e, 'current');
        }._$bind(this),
      );
    };
    E.__resetPage = function () {
      if (1 === this.screenPage) this.__unitsListNode.style.transform = 'translateX(0)';
      if (this.screenPage > 1) this.__pageLeftNode.style.display = 'block';
      else this.__pageLeftNode.style.display = 'none';
      if (this.screenPage === this.screenPageTotal) this.__pageRightNode.style.display = 'none';
      else this.__pageRightNode.style.display = 'block';
    };
    E.__onChangePage = function (e) {
      this.screenPage = this.screenPage + e;
      this.__resetPage();
      this.__unitsListNode.style.transform =
        'translateX(' + -this.onePageWidth * (this.screenPage - 1) + 'px)';
    };
    E.__onRedirectNextVideo = function (e) {
      console.log('__proLessonDetailUI.__onRedirectNextVideo');
      if (e && e.id && e.lessonId)
        h.dispatcher._$redirect(
          g.umi('learnContent') + '?type=detail&id=' + e.lessonId + '&cid=' + e.id + '&replay=true',
        );
      else;
    };
    E.__onRedirectReplay = function () {
      h.dispatcher._$redirect(
        g.umi('learnContent') +
          '?type=detail&id=' +
          this.__lessonVo.id +
          '&cid=' +
          this.__curNavId +
          '&replay=true',
        { force: !0 },
      );
    };
    E.__onRedirectUnit = function (e, t) {
      g._$trackEvent('selectUnit', 'click', '点击课时内部Tab, unitId:' + e);
      if (!this.__curNavId || this.__curNavId != e)
        if (!t.live || t.live.cdnMode != i.OUT_LIVE)
          h.dispatcher._$redirect(
            g.umi('learnContent') +
              '?type=detail&id=' +
              this.__lessonVo.id +
              '&cid=' +
              e +
              '&contentid=' +
              t.contentId,
          );
        else if (window.isPreview)
          window.open(
            '/learn/preview/outsideLive.htm?termId=' +
              this.__lessonVo.termId +
              '&roomId=' +
              t.live.relatedLiveId,
          );
        else window.open('/learn/outsideLive.htm?id=' + t.live.id);
    };
    E.__onNavUnitContent = function (e) {
      var t = this.__navUnitsMap[e];
      if (t) {
        var n = t['navNode'];
        var i = t['vo'];
        p._$delClassName(this.__navUnitsMap[this.__curNavId]['navNode'], 'current');
        p._$addClassName(n, 'current');
        if ((!g._$isUserLogin() || 0 == h.isEnroll) && 5 == i.contentType)
          this.__onGetLessonUnitCb();
        else {
          this.__renderPreviewAIContentSwitchUI(null);
          this.__contentCache._$getLessonUnitVo(i.contentId, i.contentType, h.isPreview, i.id);
        }
      } else
        g._$$CommonDialog._$showDialog({
          type: 1,
          message: window.moocConfig.lang.KEY_LEARN_COURSE_WARES_NOT_EXISTS,
          modal: !0,
        });
    };
    E.__initVideoUnitUI = function (e) {
      e = e || {};
      var t = e.resourceVo || {};
      var n = e.unitVo || {};
      DATracker.track('视频播放页展示', {
        pagename: 'videolearn',
        course_id: window.courseCardDto ? window.courseCardDto.id : '',
        user_id: window.webUser ? window.webUser.id : '',
        video_id: t.videoVo ? t.videoVo.videoId : '',
        unitId: n ? n.id : '',
        version: 'old',
        learnmode: window.courseCardDto ? window.courseCardDto.studyMode : '',
      });
      if (this.__videoUnitUI) this.__videoUnitUI = g._$$VideoUnit._$recycle(this.__videoUnitUI);
      if (this.__playFromStart) t.videoLearnTime = 0;
      this.__videoUnitUI = g._$$VideoUnit._$allocate({
        parent: e.parent || this.__unitctNode,
        unitVo: e.unitVo,
        isLiveVideo: e.isLiveVideo,
        resourceVo: t,
        onSwitchPlayer: (
          e.onSwitchPlayer ||
          function () {
            this.__contentCache._$getLessonUnitVo(n.contentId, n.contentType, h.isPreview, n.id);
          }
        )._$bind(this),
        autoNext: this.__onRedirectNextVideo._$bind(this),
        replay: this.__onRedirectReplay._$bind(this),
        onGetResourceTokenError: this.__onGetResourceTokenError._$bind(this),
        onFullscreenChange: function () {
          r._$renderGLobalAIButton(
            {
              pageType: n.contentType,
              sceneType: r.SCENE_TYPE.NORMAL,
              termId: n.termId,
              courseId: window.courseDto && window.courseDto.id,
              courseName: window.courseDto && window.courseDto.name,
              chapterId: n.chapterId,
              lessonId: n.lessonId,
              unitId: n.id,
            },
            document.querySelector('#j-global-ai-robot'),
          );
        }._$bind(this),
        getPreviewAIStatusCb: function (e) {
          this.__aiStatusObj = NEJ.X({}, this.__aiStatusObj, e);
          this.__renderPreviewVideoAIGCStatusText();
        }._$bind(this),
        showAIGC: this.__showAIGC,
      });
    };
    E.__onGetResourceTokenError = function (e) {
      this._liveUnitUI && this._liveUnitUI.onGetResourceTokenError(e);
    };
    E.__renderPreviewVideoAIGCStatusText = function () {
      var e = '',
        t,
        n;
      var i = Object.keys(this.__aiStatusObj);
      var o = { aiSegmentStatus: '分段', aiSummaryStatus: '概要', aiSubtitleStatus: '字幕' };
      var a = function (e, a) {
        var s = '';
        for (t = 0, n = 0; t < i.length; t++)
          for (var r = 0; r < e.length; r++)
            if (this.__aiStatusObj[i[t]] == e[r]) {
              n++;
              if (1 != n) s += '、';
              s += o[i[t]];
              break;
            }
        if (n) return s + a;
        else return '';
      }._$bind(this);
      var s = [
        a([g.CONST.AI_STATUS.GENERATE_COMPLETE], '生成成功'),
        a(
          [
            g.CONST.AI_STATUS.NOT_COMMIT,
            g.CONST.AI_STATUS.NO_GENERATE,
            g.CONST.AI_STATUS.GENERATING,
          ],
          '生成中',
        ),
        a([g.CONST.AI_STATUS.GENERATE_ALL_FAIL, g.CONST.AI_STATUS.UNABLE_TO_HANDLE], '生成失败'),
      ];
      for (t = 0, n = 0; t < s.length; t++)
        if ('' != s[t]) {
          n++;
          if (1 != n) e += ',';
          e += s[t];
        }
    };
    E.__renderPreviewAIContentSwitchUI = function (e) {
      if (this.__previewAIContentSwitchUI) this.__previewAIContentSwitchUI.destroy();
      if (this.__previewAIBox) this.__previewAIBox.style.display = 'none';
      if (e && window.isCertifiedPreview && e.contentType == g.CONST.LESSONUNIT_VIDEO) {
        this.__previewAIBox.style.display = 'block';
        this.__previewAIContentSwitchUI = new n({
          data: {
            status: this.__showAIGC > 0 ? !0 : !1,
            openText: '',
            closeText: '',
            disable: !window.canModifyCertifiedPreview || this.__showAIGC == -1 ? !0 : !1,
          },
        })
          .$inject(this.__previewAIContentSwitchNode)
          .$on(
            'toggle',
            function (t) {
              if (window.canModifyCertifiedPreview) {
                var n = this.__previewAIContentSwitchUI.data.status;
                this.__courseCache._$switchTermAI(
                  {
                    termId: this.__lessonVo.termId,
                    switchType: 2,
                    targetId: e.id,
                    status: t ? 1 : 0,
                  },
                  function (e) {
                    console.log(e);
                  },
                  function () {
                    this.__previewAIContentSwitchUI.data.status = n;
                    this.__previewAIContentSwitchUI.$update();
                  }._$bind(this),
                );
              }
            }._$bind(this),
          );
      }
    };
    E.__onGetLessonUnitCb = function (n) {
      var i = this;
      var a = this.__navUnitsMap[this.__curNavId]['vo'];
      this.__clearUIs();
      r._$renderGLobalAIButton(
        {
          pageType: a.contentType,
          sceneType: r.SCENE_TYPE.NORMAL,
          termId: a.termId,
          courseId: window.courseDto && window.courseDto.id,
          courseName: window.courseDto && window.courseDto.name,
          chapterId: a.chapterId,
          lessonId: a.lessonId,
          unitId: a.id,
        },
        document.querySelector('#j-global-ai-robot'),
      );
      this.__breadCbUI = g._$$LessonBreadCrumb._$allocate({
        parent: this.__breadCrumbNode,
        lessonVo: this.__lessonVo,
        chapterVo: this.__chapterVo,
        mocTermDto: this.__mocTermDto,
      });
      this.__createHelpLink(a);
      if (a.contentType !== g.CONST.LESSONUNIT_LIVE || !g._$isMobile()) {
        if (this.__LessonJoinQa) this.__LessonJoinQa.destroy();
        if (1 == window.termDto.studyVipFlag || 1 == window.termDto.supportAiCapabilityFlag) {
          var s = document.getElementById('AITool');
          var l = 'LearnAITool';
          var _ = document.querySelector('.m-lessonDetail');
          if (a.contentType === g.CONST.LESSONUNIT_VIDEO) {
            String.prototype.replace = window.moocTempReplace;
            String.prototype.match = window.moocTempMatch;
            window.reactComponentLoadBootstrap.setFtlData({
              lessonUnitId: a.id,
              termId: a.termId,
              isPreview: !!window.isPreview,
            });
            if (window.renderReactComponent && window.renderReactComponent[l]) {
              var u = window.renderReactComponent[l];
              u.render(u.component, u.initialState, s);
            } else
              window.reactComponentLoadBootstrap.init(
                { name: l, container: s },
                { lessonUnitId: a.id },
              );
          } else {
            window.renderReactComponent &&
              window.renderReactComponent.ReactDOM.unmountComponentAtNode(s);
            _.style.width = '100%';
          }
        }
        switch (a.contentType) {
          case g.CONST.LESSONUNIT_VIDEO:
            p._$addClassName(p._$getByClassName(document, 'm-lessonDetail')[0], 'videoDetail');
            if (window.isCertifiedPreview || window.isCertifiedNotPreview)
              t._$getTermAiSwitchStatus(
                { termId: window.termDto.id, switchType: 2, targetId: a.id },
                function (e) {
                  this.__showAIGC = e;
                  this.__renderPreviewAIContentSwitchUI(a);
                  this.__initVideoUnitUI({ unitVo: a, resourceVo: n });
                }._$bind(this),
              );
            else this.__initVideoUnitUI({ unitVo: a, resourceVo: n });
            break;
          case g.CONST.LESSONUNIT_PDF:
            p._$delClassName(this.__unitJoinQa, 'f-dn');
            this.__LessonJoinQa = new e({ data: { unitId: a.id } }).$inject(this.__unitJoinQa);
            this.__pdfUnitUI = g._$$PdfUnit._$allocate({
              parent: this.__unitctNode,
              outNode: this.__unithelplinkNode,
              qaNode: this.__unitJoinQa,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case g.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
            this.__initInteractiveCoursewareUnitUI(n, a);
            break;
          case g.CONST.LESSONUNIT_TEXT:
            this.__richUnitUI = g._$$RichTextUnit._$allocate({
              parent: this.__unitctNode,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case g.CONST.LESSONUNIT_QUESTION:
            this.__testUnitUI = g._$$TestUnit._$allocate({
              parent: this.__unitctNode,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case g.CONST.LESSONUNIT_DISCUSS:
            this.__forumUnitUI = g._$$ForumUnit._$allocate({
              parent: this.__unitctNode,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case 10:
          case 11:
          case 12:
            this.__musicUnitUI = new o().$inject(this.__unitctNode);
            break;
          case g.CONST.LESSONUNIT_LIVE:
            this.__recordCount = 1;
            console.log('_unitVo', a);
            var f = document.body.getAttribute('style');
            document.body.setAttribute('style', 'overflow: auto !important;' + f || '');
            this._liveUnitUI = new c({ data: { liveId: a.contentId } })
              .$on(c.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO, function (e) {
                window.liveInfo = a.live ? a.live : {};
                d._$getLiveInfo({ liveContentId: a.contentId, isNeedDetail: 1 }, e);
              })
              .$on(c.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA, function (e) {
                var t = p._$getByClassName(i.__body, 'live-replay-text-' + a.id);
                if (t && t[0]) g._$showNode(t[0]);
                e && e();
              })
              .$on(c.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA, function (e) {
                i._liveUnitUI.$refs.liveWrapBox.innerHTML = '';
                i._liveUnitUI.$refs.liveWrap.destroy();
                i._liveUnitUI.data.maxWidth = c.CONST.WIDTH.PLAYBACK_MAX_WIDTH;
                i.__initVideoUnitUI({
                  parent: i._liveUnitUI.$refs.liveWrapBox,
                  isLiveVideo: !0,
                  unitVo: a,
                });
                this.$update();
              })
              .$on(c.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO, function (e) {
                d._$getImRoomInfo({ liveContentId: a.contentId }, e);
              })
              .$on(c.CONST.EVENTS.SHOULD_SAVE_LEARN_PROGRESS, function (e) {
                var t = {
                  unitId: a.id,
                  finished: !!e.isFinished,
                  index: i.__recordCount++,
                  duration: c.CONST.TIME.MS_OF_10_SEC,
                  courseId: window.courseDto.id,
                  lessonId: a.lessonId,
                  videoId: a.contentId,
                  termId: a.termId,
                  userId: window.webUser && window.webUser.id,
                  contentType: 7,
                };
                i.__contentCache._$saveLearnInfo(t);
                t['action'] = 'LEARN_TIME_COUNT';
                i.__contentCache._$addLearnLog({
                  dt: g._$strToHexCharCode(JSON.stringify(t)).substr(2),
                  p: 'mooc',
                });
              })
              .$inject(this.__unitctNode);
        }
      } else window.location = '/live/' + a.contentId + '.htm';
    };
    E.__initInteractiveCoursewareUnitUI = function (e, t) {
      p._$addClassName(this.__unitJoinQa, 'f-dn');
      if (t && t.contentId && t.termId && t.id) {
        var n = 'LearnInteractiveCoursewarePreview';
        var i = document.createElement('div');
        i.style.width = '100%';
        i.style.height = '680px';
        this.__unitctNode.appendChild(i);
        this.__interactiveCoursewareContainer = i;
        window.reactComponentLoadBootstrap.setFtlData(
          {
            contentId: t.contentId,
            termId: t.termId,
            unitId: t.id,
            saveMocContentLearn: function (e) {
              return this.__contentCache._$saveLearnInfo(e);
            }._$bind(this),
          },
          n,
        );
        var o = function () {
          if (
            this.__interactiveCoursewareContainer === i &&
            window.renderReactComponent &&
            window.renderReactComponent[n]
          ) {
            var e = window.renderReactComponent[n];
            e.render(e.component, e.initialState, i);
          }
        }._$bind(this);
        if (window.renderReactComponent && window.renderReactComponent[n]) o();
        else
          window.reactComponentLoadBootstrap.init(
            { name: n, container: i },
            {},
            { loadSuccessCb: o },
          );
      } else
        g._$$CommonDialog._$showDialog({
          type: 1,
          message: '互动课件参数不完整，暂无法预览',
          modal: !0,
        });
    };
    E.__createHelpLink = function (e) {
      var t = JSON.parse(e.jsonContent || '{}');
      this.__unithelplinkNode.innerHTML = '';
      switch (e.contentType) {
        case g.CONST.LESSONUNIT_VIDEO:
          break;
        case g.CONST.LESSONUNIT_PDF:
          this.__unithelplinkNode.innerHTML =
            '<div class="pdf-helplink"><p class="u-helplink u-helplinkpdf">' +
            window.moocConfig.lang.KEY_LEARN_THE_CAN +
            ' <a class="f-fcgreen" href="/help/help.htm#/hf?t=2&i=2" target="_blank">' +
            window.moocConfig.lang.KEY_LEARN_VIEW_HELP +
            '</a></p><a class="j-downpdf downpdf u-btn u-btn-sm " target="_blank">' +
            window.moocConfig.lang.KEY_LEARN_DOCUMENT_DOWNLOAD +
            '</a></div>';
          break;
        case g.CONST.LESSONUNIT_TEXT:
          if (t.fileName && t.nosKey)
            this.__unithelplinkNode.innerHTML =
              '<a class="j-downtxt downpdf u-btn u-btn-sm f-fr" href="/course/attachment.htm?fileName=' +
              encodeURIComponent(t.fileName) +
              '&nosKey=' +
              encodeURIComponent(t.nosKey) +
              '" target="_blank">' +
              window.moocConfig.lang.KEY_LEARN_DOWNLOAD_ATTACHMENTS +
              '</a>';
      }
    };
    E.__reset = function (e) {
      console.log('reset', p._$get('courseLearn-inner-box'));
      this.__supReset(e);
      if (this.__lessonVo && this.__lessonVo.id !== e.lessonVo.id) this.screenPage = null;
      this.__lessonVo = e.lessonVo;
      this.__chapterVo = e.chapterVo;
      this.__mocTermDto = e.mocTermDto;
      this.__aiStatusObj = {};
      this.__curNavId = parseInt(e.curNavId);
      this.__playFromStart = e.playFromStart;
      var t = courseDto && courseDto.schoolPanel && 6 == courseDto.schoolPanel.schoolType;
      var n = h.termDto.mode == g.CONST.MODE_SPOC_SYNC && this.__lessonVo.termId == h.termDto.id,
        i = 1 * h.canAskTeacher && !t;
      var o = h.qaForumId,
        a = h.moocQAForumId;
      if (a) this.__forumId = n ? o : a;
      else this.__forumId = o;
      m._$addEvent(
        this.__askTeacherNode,
        'click',
        function () {
          if (g._$isUserLogin()) this.__courseCache._$CheckTermLearn(h.termDto.id);
          else g._$$LoginDialog._$showLogin({ from: 'learn' });
        }._$bind(this),
      );
      if (i)
        this.__askTeacherNode.innerHTML =
          '<a class="u-btn u-btn-default f-fr">' +
          window.moocConfig.lang.KEY_LEARN_ASK_TEACHER +
          '</a>';
      if (this.__lessonVo.units && this.__lessonVo.units.length) {
        g._$hiddenNode(this.__lsemptyNode);
        g._$showNode(this.__lscontentNode);
        this.__genUnitsNav();
        this.__onNavUnitContent(this.__curNavId);
        this.resizeObserver = new ResizeObserver(this.__genUnitsNav._$bind(this));
        this.resizeObserver.observe(this.__unitsListNode, { box: 'border-box' });
      } else {
        g._$showNode(this.__lsemptyNode);
        g._$hiddenNode(this.__lscontentNode);
      }
    };
    E.__onCheckTermLearnCb = function (e) {
      if (e >= 0)
        h.location.hash =
          '#' + g.umi('learnForumTopic') + '?fid=' + this.__forumId + '&lid=' + this.__curNavId;
      else {
        if (this.__attendCourseModal) this.__attendCourseModal.destroy();
        this.__attendCourseModal = new u();
      }
    };
    E.__clearUIs = function () {
      p._$delClassName(p._$getByClassName(document, 'm-lessonDetail')[0], 'videoDetail');
      p._$delClassName(p._$getByClassName(document, 'learnPageContentRight')[0], 'hide');
      console.log('lessonDetail __clearUIs');
      if (this.videoDataTimer) clearImmediate(this.videoDataTimer);
      if (this.__videoUnitUI) this.__videoUnitUI = g._$$VideoUnit._$recycle(this.__videoUnitUI);
      if (this.__pdfUnitUI) this.__pdfUnitUI = g._$$PdfUnit._$recycle(this.__pdfUnitUI);
      if (this.__interactiveCoursewareContainer) {
        if (window.renderReactComponent && window.renderReactComponent.ReactDOM)
          window.renderReactComponent.ReactDOM.unmountComponentAtNode(
            this.__interactiveCoursewareContainer,
          );
        if (this.__interactiveCoursewareContainer.parentNode)
          this.__interactiveCoursewareContainer.parentNode.removeChild(
            this.__interactiveCoursewareContainer,
          );
        this.__interactiveCoursewareContainer = null;
      }
      if (this.__richUnitUI) this.__richUnitUI = g._$$RichTextUnit._$recycle(this.__richUnitUI);
      if (this.__testUnitUI) this.__testUnitUI = g._$$TestUnit._$recycle(this.__testUnitUI);
      if (this.__forumUnitUI) this.__forumUnitUI = g._$$ForumUnit._$recycle(this.__forumUnitUI);
      if (this.__musicUnitUI) this.__musicUnitUI.destroy();
      if (this.__breadCbUI) this.__breadCbUI = g._$$ForumUnit._$recycle(this.__breadCbUI);
      if (this._liveUnitUI) this._liveUnitUI.destroy();
      if (this.__outsideLiveUi) this.__outsideLiveUi.destroy();
    };
    E.__destroy = function () {
      console.log('__proLessonDetailUI.__destroy');
      this.__clearUIs();
      this.__supDestroy();
    };
  },
  'd1b339d8b948d535e1ceb88c9586d7da',
  'a936afb5ecab0e9286c3c9d05341571d',
  '1ee4132d3e572b8c83dffd6ef72c5208',
  'ef64b877c64ed4138d4b703989241671',
  '72d45d4792047bd62a782346c4fcadc1',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'fb061c769bfc74628a81f422f590544c',
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '6a55482e5dbb028d0889d49da80296ae',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '8f34a99b20d362b3542aebd517390fc1',
  '088051b8c61eef3a38d043e6c637cbb0',
  '1c23b43dfd9c054559909485b4169fa4',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '23df9936459ce00fd8c2c782b7cf7c8d',
  '78c5fa6a9e6887b200fd30c7e7e4ff5d',
  '84117c1b0fcf34c8802d9f0946d1869e',
  'be679cde8e87d7a4d28f9f32f4ee35ac',
  'e7089a68b20be110ce888f1374a52bfb',
  '7872629f0fb778433629a1d520d03d44',
  'ad72e09e8978dc83423b503971b6294c',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
