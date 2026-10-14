EDU(
  '23df9936459ce00fd8c2c782b7cf7c8d',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h) {
    function p() {
      var e = parent.document;
      var t =
        e.cancelFullScreen || e.webkitCancelFullScreen || e.mozCancelFullScreen || e.exitFullScreen;
      if (t) t.call(e);
      else if ('undefined' != typeof window.ActiveXObject) {
        var n = new ActiveXObject('WScript.Shell');
        if (null != n) n.SendKeys('{F11}');
      } else alert('切换失败,可尝试Esc退出');
    }
    function m(e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    }
    var b = window,
      g = NEJ.P('nej.e'),
      v = NEJ.P('nej.v'),
      E = NEJ.P('nej.u'),
      w = NEJ.P('edu.d'),
      y = NEJ.P('edu.u'),
      x = NEJ.P('nej.j'),
      T = b.isSpoc,
      S;
    var C = h._$parseUrlParams(window.location.search);
    var I = !!C.appId;
    var O = courseDto && courseDto.schoolPanel && 6 == courseDto.schoolPanel.schoolType;
    y._$$VideoUnit = NEJ.C();
    S = y._$$VideoUnit._$extend(y._$$UIBase, !0);
    S.__initXGui = function () {
      var e = this;
      this.__seed_html = g._$addNodeTemplate(this.__initHtmlTemplate());
    };
    S.__initHtmlTemplate = function () {
      var e = this;
      return g._$getHtmlTemplate(
        'jst-lessonVideoUI',
        E._$merge(
          { urlPrefix: b.urlPrefix, url: E._$str2b64(window.location.href) },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    S.__initNode = function () {
      this.__supInitNode();
      this.__AILectureNoteSidebarNode = g._$getByClassName(
        this.__body,
        'j-AIlectureNoteSidebar',
      )[0];
      this.__AILectureNoteViewerNode = g._$getByClassName(this.__body, 'j-AIlectureNoteViewer')[0];
      this.__unitctBoxNode = g._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__unitlgBarNode = g._$getByClassName(this.__body, 'j-loginBar')[0];
      this.__unitUI = g._$getByClassName(this.__body, 'm-learnunitUI')[0];
      this.__unitLoginNode = g._$getByClassName(this.__body, 'j-login')[0];
      this.__unitctBarNode = g._$getByClassName(this.__body, 'j-unitctBar')[0];
      this.__unitReportBug = g._$getByClassName(this.__body, 'j-report-bug')[0];
      this.__downSrtNode = g._$getByClassName(this.__body, 'j-downsrt')[0];
      this.__switchPlayer = g._$getByClassName(this.__body, 'j-switchPlayer')[0];
      this.__autoNext = g._$getByClassName(this.__body, 'j-autoNext')[0];
      this.__shareNode = g._$getByClassName(this.__body, 'j-share')[0];
      this.__AILectureNoteNode = g._$getByClassName(this.__body, 'j-AILectureNote')[0];
      v._$addEvent(
        this.__unitLoginNode,
        'click',
        function () {
          y._$$LoginDialog._$showLogin({ from: 'videoUnit' });
        }._$bind(this),
      );
      v._$addEvent(
        this.__shareNode,
        'click',
        function () {
          var e = {
            url: b.location.href,
            uid: b.webUser ? b.webUser.id : -1,
            stat_id: this.__unitVo.id,
            stat_type: 16,
          };
          e['action'] = 'MOC_ACTIVITY_SHARE';
          this.__commonCache._$addGaLog({
            dt: this.__strToHexCharCode(JSON.stringify(e)).substr(2),
            p: 'mooc',
          });
        }._$bind(this),
      );
      v._$addEvent(
        this.__downSrtNode,
        'click',
        function () {
          y._$trackEvent(
            'captionDownload',
            'click',
            '字幕下载, 地址：' + this.__resourceVo.parsedSrtUrl,
          );
        }._$bind(this),
      );
      this.__contentCache = new w._$$COM_Cache_CourseCtCache();
      this.__commonCache = new w._$$COM_Cache_commonCache();
      this.__contentCache._$addEvent(
        'onFetchQuestions',
        this.__genPlayerWithMergeAISegments._$bind(this),
      );
      this.__contentCache._$addEvent('onGetNextVideo', this.__genNextVideo._$bind(this));
      this.__contentCache._$addEvent(
        'onGetZhixuanAdsShowStatus',
        this.getZhixuanAdsShowStatus._$bind(this),
      );
      this.hideByLanguage();
    };
    S.__AILectureExpand = function (e, t, n) {
      var i = sessionStorage.getItem('AINote_lessonUnitId');
      var o = sessionStorage.getItem('AINote_contentId');
      var a = sessionStorage.getItem('AINote_keyKnowledgeId');
      if (e != i || t != o || n != a) {
        sessionStorage.setItem('AINote_lessonUnitId', e);
        sessionStorage.setItem('AINote_contentId', t);
        sessionStorage.setItem('AINote_keyKnowledgeId', n);
        String.prototype.replace = window.moocTempReplace
          ? window.moocTempReplace
          : String.prototype.replace;
        String.prototype.match = window.moocTempMatch
          ? window.moocTempMatch
          : String.prototype.match;
        window.reactComponentLoadBootstrap.setFtlData({
          keyKnowledgeId: n,
          lessonUnitId: e,
          contentId: t,
          contentType: 1,
          videoWrapperDom: this.__body,
          getPreviewAIStatusCb: function (e) {
            this._$dispatchEvent('getPreviewAIStatusCb', NEJ.X({}, e || {}));
          }._$bind(this),
        });
        if (window.renderReactComponent && window.renderReactComponent['LearnAILectureExpand']) {
          window.renderReactComponent.ReactDOM.unmountComponentAtNode(
            document.getElementById('AILectureNote'),
          );
          var s = window.renderReactComponent['LearnAILectureExpand'];
          window.renderReactComponent.render(
            s.component,
            s.initialState,
            document.getElementById('AILectureNote'),
          );
        } else
          window.reactComponentLoadBootstrap.init({
            name: 'LearnAILectureExpand',
            container: document.getElementById('AILectureNote'),
          });
      }
    };
    S.__AILectureNoteViewer = function (e, t) {
      window.reactComponentLoadBootstrap.setFtlData({
        lessonUnitId: e,
        contentId: t,
        contentType: 1,
      });
      if (window.renderReactComponent && window.renderReactComponent['LearnAINoteViewer']) {
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(
          document.getElementById('AILectureNoteViewer'),
        );
        var n = window.renderReactComponent['LearnAINoteViewer'];
        window.renderReactComponent.render(
          n.component,
          n.initialState,
          document.getElementById('AILectureNoteViewer'),
        );
      } else
        window.reactComponentLoadBootstrap.init({
          name: 'LearnAINoteViewer',
          container: document.getElementById('AILectureNoteViewer'),
        });
    };
    S.hideByLanguage = function () {
      if (f.isEn()) {
        this.__unitReportBug.style.display = 'none';
        this.__shareNode.style.display = 'none';
      }
    };
    S.__strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    };
    S.__genShareUI = function () {
      if (this.__shareUI) this.__shareUI.destroy();
      var e = b.courseDto,
        t = [
          'MOOC是全新完整的教学模式--定期开课、简短视频，提交作业，学完还能考取认证证书，更可以结交到新朋友！',
          window.moocConfig.lang.KEY_LEARN_RECOMMEND_EVERYONE,
          '我在#中国大学MOOC#平台上学习，',
        ];
      var n = T
          ? t[2]
          : '我在学习' +
            this.__unitVo.name +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        i = T
          ? t[2]
          : '我在学习' +
            this.__unitVo.name +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        o = T ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，';
      var a = '';
      if (b.activityNotEnd && b.webUser)
        a =
          '//www.icourse163.org' +
          b.location.pathname +
          '/wapLearnVideoDetail/?id=' +
          this.__unitVo.lessonId +
          '&cid=' +
          this.__unitVo.id +
          '&inviterId=' +
          b.webUser.id +
          '&activityId=' +
          b.activityId +
          '&isWebShare=1';
      else
        a =
          '//www.icourse163.org' +
          b.location.pathname +
          '/wapLearnVideoDetail/?id=' +
          this.__unitVo.lessonId +
          '&cid=' +
          this.__unitVo.id;
      if (!b.hideTermShare)
        this.__shareUI = new c({
          data: {
            title: n,
            topic: i + t[1],
            description: o + t[0],
            pic: b.termDto.bigPhoto,
            url: window.location.protocol + (T ? '//www.icourse163.org' : a),
            weixinQR: '',
            model: 0,
          },
        }).$inject(this.__shareNode);
    };
    S.__genNextVideo = function (e) {
      if (e) {
        g._$addClassName(this.__unitctBoxNode, 'hide-replay-icon');
        this.__unitctBoxNode.appendChild(
          g._$html2node(
            g._$getHtmlTemplate(
              'jst-lessonVideoPlayEnd',
              E._$merge({ type: 2 }, { lang: (window.moocConfig || {}).lang || {} }),
            ),
          ),
        );
        this.__counter = g._$getByClassName(this.__body, 'j-counter')[0];
        var t = 5;
        var n;
        var i = this.__videoId;
        var o = function () {
          this.__counter.innerText = t;
          t--;
          n = setTimeout(o, 1e3);
          if (t <= 0) {
            clearTimeout(n);
            if (this.__video && this.__videoId == i) {
              this.__video.__player.destroy();
              this.__video.__destroy();
              this.__video = null;
            }
          }
        }._$bind(this);
        o();
        this.__replay = g._$getByClassName(this.__body, 'j-replay');
        g._$style(this.__replay[0], { display: 'none' });
        this.__replay = g._$getByClassName(this.__body, 'j-replay');
        v._$addEvent(
          this.__replay[1],
          'click',
          function () {
            clearTimeout(n);
            this._$dispatchEvent('replay', null);
          }._$bind(this),
        );
        setTimeout(
          function () {
            if (t <= 0 && this.__videoId == i) this._$dispatchEvent('autoNext', e);
          }._$bind(this),
          5e3,
        );
      } else {
        g._$addClassName(this.__unitctBoxNode, 'hide-replay-icon');
        this.__unitctBoxNode.appendChild(
          g._$html2node(
            g._$getHtmlTemplate(
              'jst-lessonVideoPlayEnd',
              E._$merge({ type: 1 }, { lang: (window.moocConfig || {}).lang || {} }),
            ),
          ),
        );
        this.__replay = g._$getByClassName(this.__body, 'j-replay');
        g._$style(this.__replay[0], { display: 'none' });
        v._$addEvent(
          this.__replay[1],
          'click',
          function () {
            this._$dispatchEvent('replay', null);
          }._$bind(this),
        );
      }
    };
    S.__injectYadkAdvertising = function () {
      var e = !1,
        t = l.moocIndex.webVideoLearning.config,
        n = document.createElement('div'),
        i = l.getScriptTagByScriptConfig(t, e);
      n.setAttribute('class', 'close-yadk-btn');
      window.webVideoLearningCallback = function () {
        var e = this.__yadkAdWrapper.children && this.__yadkAdWrapper.children[0];
        var t = e && (e.contentDocument || (e.contentWindow && e.contentWindow.document));
        if (e && 'IFRAME' === e.tagName && t) {
          e.style.width = '200px';
          e.style.minHeight = '113px';
          e.style.borderRadius = '8px';
          var i = document.createElement('style');
          i.type = 'text/css';
          i.innerHTML = '#ad_logo { font-size: 12px; background-color: rgba(0, 0, 0, .3); }';
          t.body.appendChild(i);
          this.__yadkAdWrapper.appendChild(n);
        }
        this.__yadkAdWrapper.style.display = 'block';
      }._$bind(this);
      if (this.__yadkAdWrapper.innerHTML) this.__yadkAdWrapper.innerHTML = '';
      this.__yadkAdWrapper.appendChild(i);
      n.addEventListener(
        'click',
        function () {
          this.__contentCache._$setIgnoreZhixuanAds();
          this.__yadkAdWrapper.style.display = 'none';
        }._$bind(this),
      );
    };
    S.getZhixuanAdsShowStatus = function (e) {
      if (e) this.__injectYadkAdvertising();
    };
    S.__genPlayerWithAnchors = function (i, a) {
      var s = this;
      this.__anchorQuesMap = {};
      if (i) {
        this.__questionsData = i;
        this.__anchorQuesMap = y._$convertListToMaps(i.questions);
      }
      this.__unitVo.aiLectureNoteSegmentList = a;
      this.__unitctBoxNode.style.height = '540px';
      g._$setStyle(this.__unitctBoxNode, 'overflow-y', 'visible');
      this.__unitctBoxNode.style.minHeight = this.__showAILectureNote ? '235px' : '570px';
      this.__unitctBoxNode.style.minWidth = this.__showAILectureNote ? '300px' : '500px';
      this.__cluPointData = y._$convertUnitAnchors(
        this.__unitVo.anchorQuestions,
        this.__anchorQuesMap,
      );
      var c =
        this.__resourceVo.videoId ||
        (this.__resourceVo.videoVo ? this.__resourceVo.videoVo.videoId : null);
      var d = [];
      if (window.isCertifiedPreview)
        if (this.__aiSegmentStatus == y.CONST.AI_STATUS.GENERATE_COMPLETE)
          d = this.__unitVo.aiLectureNoteSegmentList || [];
        else d = this.__unitVo.videoSegmentInfoDtos || [];
      else if (
        this.__unitVo.aiLectureNoteSegmentList &&
        this.__unitVo.aiLectureNoteSegmentList.length
      )
        d = this.__unitVo.aiLectureNoteSegmentList || [];
      else d = this.__unitVo.videoSegmentInfoDtos || [];
      var l = h._$parseUrlParams(window.location.hash);
      var _ = l.startTime;
      var u = r._$merge(
        NEJ.X(this.__resourceVo.videoVo, {
          autoStart: !0,
          file: this.__resourceVo.videoUrl,
          start: _ || this.__resourceVo.videoLearnTime,
          image: this.__resourceVo.videoImgUrl,
          unitId: this.__resourceVo.unitId,
          videoId: this.__videoId,
          cluPointData: this.__cluPointData,
          segmentListData: d,
          targetId: this.__unitVo.termId,
          targetType: 0,
        }),
        function (e) {
          return !e;
        },
      );
      if (this.__video) this.__video.__destroy();
      if (this.__isLiveVideo || O) g._$addClassName(this.__unitctBarNode, 'f-dn');
      var m = this.__isLiveVideo ? n.CONTENT_TYPE.LIVE : n.CONTENT_TYPE.VIDEO;
      var v;
      if (1 == b.isPreview) {
        v = n.VIDEO_TYPE.WITH_AUTH;
        if (this.__isLiveVideo) v = n.VIDEO_TYPE.WITH_AUTO_UNIT;
      } else v = n.VIDEO_TYPE.COMMON;
      this.__unitctBoxNode.innerHTML = '';
      this.__yadkAdWrapper = document.createElement('div');
      this.__yadkAdWrapper.setAttribute('id', 'j-vidio-learning-yadk');
      this.__unitctBoxNode.appendChild(this.__yadkAdWrapper);
      this.__videoNotNeedFullscreen = !0;
      var E = {
        bizId: this.__unitVo.id,
        bizType: n.BIZ_TYPE.UNIT,
        contentType: m,
        videoInfo: u,
        termId: this.__unitVo.termId,
        videoId: this.__unitVo.contentId,
        unitId: this.__unitVo.id,
        videoType: v,
        notNeedFullscreen: this.__videoNotNeedFullscreen,
        forbidViewSegment: !1,
        useFullscreenSegmentComponent: !0,
        useFullscreenAIAssistant: location.hash.includes('/learn/content'),
        AIAssistantParam: {
          pageType: this.__unitVo.contentType,
          termId: this.__unitVo.termId,
          courseId: window.courseDto && window.courseDto.id,
          courseName: window.courseDto && window.courseDto.name,
          sceneType: e.SCENE_TYPE.NORMAL,
          chapterId: this.__unitVo.chapterId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
        },
        forbidAiSubtitle: !this.__showAILectureNote,
      };
      this.__video = new t({ data: E })
        .$inject(this.__unitctBoxNode)
        .$on('onGetResourceToken', this.__onGetResourceToken._$bind(this))
        .$on('onGetResourceTokenError', this.__onGetResourceTokenError._$bind(this))
        .$on(
          'onMeta',
          function () {
            var e = this.__unitctBoxNode.querySelector('video');
            if (!b.isPreview)
              if (this.__autoNext.checked) {
                if (this.__unitctBoxNode.classList.contains('mask-disabled')) return;
                var t = setInterval(function () {
                  if (e.paused)
                    e.play()['catch'](function () {
                      clearInterval(t);
                    });
                  else clearInterval(t);
                }, 100);
              } else e.pause();
          }._$bind(this),
        );
      setTimeout(function () {
        s.__AILectureExpand(s.__unitVo.id, s.__unitVo.contentId);
      }, 1e3);
      if (this.__showAILectureNote) {
        this.__initVideoSegmentAILectureNote();
        this.__AILectureNoteViewer(this.__unitVo.id, this.__unitVo.contentId);
      }
      DATracker.track('视频播放页-分段展示-iaw', {
        user_id: !!window.webUser && window.webUser.id,
        pagename: 'videolearn',
        term_id: s.__unitVo.termId,
        video_id: c,
        slice_name: d.map(function (e) {
          return e.title;
        }),
      });
      if (this.__cluPointData && this.__cluPointData.length)
        this.__cluPointData.forEach(function (e) {
          if (5 == e.type) s.__hasTypeFiveAnchor = !0;
        });
      if (
        !localStorage.getItem('MOOC_SEGMENGT_VIEW_CLOSE') &&
        (d.length || this.__hasTypeFiveAnchor)
      ) {
        localStorage.setItem('MOOC_SEGMENGT_VIEW_CLOSE', 1);
        this.segmentMaskGuide = new o({
          data: { hasSegment: d.length, hasAnchor: this.__hasTypeFiveAnchor },
        }).$inject(s.__unitctBoxNode);
      }
      if (!b.isPreview) {
        this.__recordCount = 1;
        this.__recordDuration = localStorage.getItem('learnTimeUploadPeriod') || 180;
        this.__learnedVideoTimeCount = this.__recordDuration;
        this.__video.$on('onPlayEnd', this.__videoPlayEndHandle._$bind(this));
        this.__video.$on(
          'onPlay',
          function () {
            if (!this.__recordTimer) {
              this.__timeFlag = +new Date();
              this.__recordTimer = b.setInterval(
                this.__recordVideoTime._$bind(this, !1),
                1e3 * this.__recordDuration,
              );
            }
            this.__yadkAdWrapper.style.display = 'none';
          }._$bind(this),
        );
        this.__video.$on(
          'onPauseClick',
          function () {
            var e = parseInt((+new Date() - this.__timeFlag) / 1e3);
            this.__recordTimer = b.clearInterval(this.__recordTimer);
            this.__recordVideoTime(!1, !1, e);
            if (!f.isEn() && !b.isSpoc && !I)
              this.__contentCache._$getZhixuanAdsShowStatus(this.__unitVo.termId);
          }._$bind(this),
        );
      }
      if (this.__videoNotNeedFullscreen) {
        this._isFullscreen = !1;
        var w = this.__unitctBoxNode;
        this.__video.$on(
          'onFullscreenChange',
          function (e) {
            if (e !== this._isFullscreen) {
              this._isFullscreen = e;
              this._$dispatchEvent('onFullscreenChange', e);
              if (e) {
                var t = [
                  'requestFullscreen',
                  'mozRequestFullScreen',
                  'msRequestFullscreen',
                  'webkitRequestFullscreen',
                ];
                for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  if (w[i]) {
                    w[i]();
                    break;
                  }
                }
              } else p();
            }
          }._$bind(this),
        );
      }
      this.__trackGAData('view');
      this.__video.$on(
        'onSeek',
        function (e) {
          this.__trackGAData('drag', 1e3 * parseInt(e || 0));
          var t = e.newData;
          if (this.__cluPointData && this.__cluPointData.length) {
            this.__cluPointData.sort(function (e, t) {
              return e.anchor - t.anchor;
            });
            for (var n = 0; n < this.__cluPointData.length; n++) {
              var i = this.__cluPointData[n];
              if (5 === i.type && t >= i.anchor)
                if (t <= i.anchor + i.duration) {
                  var o = this.__anchorQuesMap[i.questionId];
                  if (this.testItemRichText) this.testItemRichText.destroy();
                  this.__initTypeFiveAnchor(o);
                  break;
                }
            }
          }
        }._$bind(this),
      );
      this.__video.$on('onAnchorPoint', this.__videoAnchorHandle._$bind(this));
      this.__video.$on('onLectureNoteChange', this.__videoSegmentAILectureNoteHandle._$bind(this));
    };
    S.__genPlayerWithMergeAISegments = function (e) {
      var t = this;
      if (this.__showAILectureNote) {
        DATracker.track('认证MOOC课程学期模式视频课时页-展示-iaw', {
          pagename: 'video',
          user_id: !!window.webUser && window.webUser.id,
          course_id: !!window.courseDto && window.courseDto.id,
          term_id: !!window.termDto && window.termDto.id,
        });
        var n = function (n) {
          var i = n;
          for (var o = 0; o < i.length; o++) i[o].type = 'AILectureNote';
          if (window.isCertifiedPreview) t.__unitUI.classList.add('learn-show-note');
          else if (n && n.length) t.__unitUI.classList.add('learn-show-note');
          else {
            t.__showAILectureNote = !1;
            t.__unitUI.classList.remove('learn-show-note');
            t.__showOrHideAINode(!1);
          }
          t.__genPlayerWithAnchors(e, i);
        }._$bind(this);
        var i = function () {
          if (!window.isCertifiedPreview) {
            t.__showAILectureNote = !1;
            t.__unitUI.classList.remove('learn-show-note');
            t.__showOrHideAINode(!1);
          }
          t.__genPlayerWithAnchors(e, []);
        }._$bind(this);
        if (window.isCertifiedPreview)
          this.__contentCache.getMocPreviewVideoSegmentInfoDto(
            {
              lessonUnitId: this.__unitVo.id,
              contentId: this.__unitVo.contentId,
              contentType: this.__unitVo.contentType,
            },
            function (e) {
              this.__aiSegmentStatus = e.aiStatus;
              this._$dispatchEvent('getPreviewAIStatusCb', {
                aiSegmentStatus: this.__aiSegmentStatus,
              });
              e = e.mocVideoSegmentInfoExtDtoList || [];
              n(e);
            }._$bind(this),
            i,
          );
        else
          this.__contentCache.getLessonUnitAILectureNoteSegmentList(
            {
              lessonUnitId: this.__unitVo.id,
              contentId: this.__unitVo.contentId,
              contentType: this.__unitVo.contentType,
            },
            n,
            i,
          );
      } else {
        t.__unitUI.classList.remove('learn-show-note');
        this.__genPlayerWithAnchors(e, []);
      }
    };
    S.__onGetResourceTokenError = function (e) {
      this._$dispatchEvent('onGetResourceTokenError', e);
    };
    S.__onGetResourceToken = function (e) {
      if (null == e.learnVideoTime) this.__recordVideoTime(!1, !0);
    };
    S.__trackGAData = function (e, t) {
      if (!b.isPreview) {
        var n = {
          userId: y._$getWebUser().id,
          courseId: b.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          videoId: this.__unitVo.contentId,
          resolutionType: this.__video._$getResolutionType(),
        };
        if (void 0 != t) n.value = t;
        y._$trackEvent('videoUnit', e, y._$convertToJSONHex(n));
        y._$log2Study('videoUnit', e, n);
      }
    };
    S._initRecommendUI = function () {
      if (this._recommendModal) {
        this._recommendModal.destroy();
        this._recommendModal = null;
      }
      if (!u._$isLogin() || !this._getRecommendInStorage()) {
        this._recommendModal = new d({
          $root: this.__unitctBoxNode,
          data: {
            recommendOpt: {
              targetId: this.__unitVo.termId,
              targetTypes: [
                _.RECOMMEND_POSITION.VIDEO_PLAY_COURSE_WEB,
                _.RECOMMEND_POSITION.VIDEO_PLAY_CATEGORY_WEB,
              ],
              number: 2,
            },
            logOpt: {
              eventId: '视频播放页内容推荐点击',
              data_cate: '视频播放页内容推荐点击',
              data_action: 'web_course_learn_video_recommend_click',
              data_label: window.moocConfig.lang.KEY_LEARN_VIDEO_PAGE,
            },
            outVendor: 'zw_mooc_pckcxxywntj',
          },
        })
          .$on(
            'close',
            function () {
              if (this._recommendModal) {
                this._recommendModal.destroy();
                this._recommendModal = null;
              }
              this._saveRecommendInStorage();
            }._$bind(this),
          )
          .$on(
            'cancel',
            function () {
              if (this._recommendModal) {
                this._recommendModal.destroy();
                this._recommendModal = null;
              }
              this.__video._$resumeVideo();
            }._$bind(this),
          );
        DATracker.track('视频播放页内容推荐展现', {
          user_id: !!window.webUser && window.webUser.id,
          data_cate: '视频播放页内容推荐展现',
          data_action: 'web_course_learn_video_recommend_page_view',
          data_label: window.moocConfig.lang.KEY_LEARN_VIDEO_PAGE,
          data_pagename: b.location.href,
        });
      }
    };
    S._saveRecommendInStorage = function () {
      if (u._$isLogin())
        try {
          b.localStorage.setItem(this._getRecommendKey(), !0);
        } catch (e) {
          console.log('浏览器不支持localStorage');
        }
    };
    S._getRecommendInStorage = function () {
      if (u._$isLogin())
        try {
          return 'true' == b.localStorage.getItem(this._getRecommendKey()) ? !0 : !1;
        } catch (e) {
          return !1;
        }
    };
    S._getRecommendKey = function () {
      var e = b.webUser && b.webUser.id;
      return 'HIDE_RECOMMEND_COURSE_' + b.courseDto.id + '_USER_' + e;
    };
    S.__getCookiePlayerChoose = function () {
      if (void 0 !== this.__useHtm5Player) return this.__useHtm5Player;
      else {
        var e = x._$cookie('playerChoose');
        if ('' == e || '1' == e) e = !0;
        else e = !1;
        return e;
      }
    };
    S.__switchPlayerHandler = function () {
      if (this.__video) {
        this.__video._$getCurVideoTime(
          function (e) {
            this.__resourceVo.videoLearnTime = e;
          }._$bind(this),
        );
        this.__video.__destroy();
        this.__video = null;
      }
      this.__useHtm5Player = !this.__useHtm5Player;
      x._$cookie('playerChoose', {
        path: '/learn/',
        domain: '.' + b.moocHost,
        value: this.__useHtm5Player ? '1' : '0',
        expires: 365,
      });
      this._$dispatchEvent('onSwitchPlayer');
    };
    S.__handlerH5Switch = function (e) {
      this.__switchPlayer.style.display = 'block';
      this.__supportHtml5 = !0;
      if (this.__useHtm5Player && 'flash' == e) {
        this.__supportHtml5 = !1;
        this.__switchPlayer.style.display = 'none';
      } else if ('h5' == e) this.__isHtml5Player = !0;
      else this.__isHtml5Player = !1;
    };
    S.__showOrHideAINode = function (e) {
      if (e) {
        y._$showNode(this.__AILectureNoteSidebarNode);
        y._$showNode(this.__AILectureNoteNode);
        y._$showNode(this.__AILectureNoteViewerNode);
      } else {
        y._$hiddenNode(this.__AILectureNoteSidebarNode);
        y._$hiddenNode(this.__AILectureNoteNode);
        y._$hiddenNode(this.__AILectureNoteViewerNode);
      }
    };
    S.__reset = function (e) {
      if (
        window.isCertifiedPreview ||
        (1 == window.termDto.certified && null !== window.learnMode && 100 == window.learnMode)
      )
        this.__showAILectureNote = !0;
      if (
        (window.isCertifiedNotPreview || window.isCertifiedPreview) &&
        !Object.is(e.showAIGC, null) &&
        !Object.is(e.showAIGC, void 0)
      )
        if (window.isCertifiedPreview)
          this.__showAILectureNote =
            e.showAIGC == y.CONST.AI_STATUS.NOT_COMMIT ||
            e.showAIGC == y.CONST.AI_STATUS.GENERATE_ALL_FAIL ||
            e.showAIGC == y.CONST.AI_STATUS.UNABLE_TO_HANDLE
              ? !1
              : !0;
        else this.__showAILectureNote = e.showAIGC > 0 ? !0 : !1;
      this.__showOrHideAINode(this.__showAILectureNote);
      this.__supReset(e);
      this.__unitVo = e.unitVo;
      window.videoId = e.unitVo && e.unitVo.contentId;
      this.__isLiveVideo = !!e.isLiveVideo;
      this.__resourceVo = e.resourceVo;
      this.__useHtm5Player = this.__getCookiePlayerChoose();
      if (this.__resourceVo.parsedSrtUrl) {
        y._$showNode(this.__downSrtNode);
        this.__downSrtNode.href = this.__resourceVo.parsedSrtUrl;
      } else y._$hiddenNode(this.__downSrtNode);
      if (this.__unitVo.anchorQuestions && this.__unitVo.anchorQuestions.length)
        this.__contentCache._$fetchQuestions(this.__unitVo);
      else this.__genPlayerWithMergeAISegments(null);
      this.__genShareUI();
    };
    S.__judgePlayingTime = function () {
      this.__video._$getCurVideoTime(
        function (e) {
          if (e > 180) {
            this.__video._$pauseVideo();
            g._$addClassName(this.__unitctBoxNode, 'hide-replay-icon');
            this.__unitctBoxNode.appendChild(
              g._$html2node(
                g._$getHtmlTemplate('jst-lessonVideoPause', {
                  lang: (window.moocConfig || {}).lang || {},
                }),
              ),
            );
            this.__loginNode = g._$getByClassName(this.__body, 'j-login')[0];
            v._$addEvent(
              this.__loginNode,
              'click',
              function () {
                y._$$LoginDialog._$showLogin({ from: 'videoUnit' });
              }._$bind(this),
            );
            b.clearInterval(this.__3minsTimer);
          }
        }._$bind(this),
      );
    };
    S.__recordVideoTime = function (e, t, n) {
      var i = this.__contentCache && this.__contentCache._$addLearnLog;
      this.__timeFlag = +new Date();
      if (this.__video) {
        var o = {
          unitId: this.__unitVo.id,
          finished: e,
          index: this.__recordCount++,
          duration: 1e3 * this.__recordDuration,
          courseId: b.courseDto.id,
          lessonId: this.__unitVo.lessonId,
          videoId: this.__unitVo.contentId,
          termId: this.__unitVo.termId,
          resolutionType: this.__video._$getResolutionType(),
          userId: window.webUser && window.webUser.id,
          contentType: 1,
          action: 'LEARN_TIME_COUNT',
        };
        if (t) {
          var a = -1;
          var s = NEJ.X(o, { videoTime: a, learnedVideoTimeCount: 0 });
          this.__contentCache._$saveLearnInfo(s);
        } else
          this.__video._$getCurVideoTime(
            function (e) {
              var a = t ? -1 : e || this.__resourceVo.videoLearnTime;
              a = b.parseInt(a);
              if (0 != a || this.__lastRecordTime)
                if (this.__lastRecordTime != a) {
                  var s =
                    n && n <= this.__learnedVideoTimeCount
                      ? n
                      : parseInt(this.__learnedVideoTimeCount);
                  if (s < 0) s = this.__recordDuration;
                  var r = NEJ.X(o, { videoTime: a, learnedVideoTimeCount: s });
                  this.__contentCache._$saveLearnInfo(r);
                  if (i) i({ dt: m(JSON.stringify(o)).substr(2), p: 'mooc' });
                  this.__lastRecordTime = a;
                }
            }._$bind(this),
          );
      }
    };
    S.__videoPlayEndHandle = function () {
      this.__recordTimer = b.clearInterval(this.__recordTimer);
      var e = parseInt((+new Date() - this.__timeFlag) / 1e3);
      this.__recordVideoTime(!0, !1, e);
      this.__clearAnchorUI();
      if (this.__autoNext.checked) this.__contentCache._$getNextVideo(this.__unitVo.id);
      else if (g._$hasClassName(this.__unitctBoxNode, 'hide-replay-icon'))
        g._$delClassName(this.__unitctBoxNode, 'hide-replay-icon');
    };
    ((S.__initTypeFiveAnchor = function (e) {
      var t = this.__resourceVo.videoId || this.__resourceVo.videoVo.videoId;
      NEJ.X(e, { slideOut: !1, termId: this.__unitVo.termId, videoId: t });
      this.testItemRichText = new s({ data: e })
        .$inject(this.__unitctBoxNode)
        .$on(
          'onViewInfo',
          function () {
            if (this.__video) {
              this.__video._$pauseVideo();
              g._$addClassName(this.__unitctBoxNode, 'mask-disabled');
            }
          }._$bind(this),
        )
        .$on(
          'onClose',
          function () {
            if (this.__video) {
              this.__video._$resumeVideo();
              g._$delClassName(this.__unitctBoxNode, 'mask-disabled');
            }
          }._$bind(this),
        );
    }),
      (S.__videoAnchorHandle = function (e) {
        this.__clearAnchorUI();
        this.__video._$getState(
          function (t) {
            if ('PLAYING' == t) {
              var n = this.__anchorQuesMap[e.questionId];
              if (n) {
                var i = this.__resourceVo.videoId || this.__resourceVo.videoVo.videoId;
                if (5 !== n.type) this.__video._$pauseVideo();
                if (5 === n.type) {
                  console.log('_questionVos', n);
                  this.__initTypeFiveAnchor(n);
                } else
                  this.__insetVideoAnchorUI = y._$$InsetVideoAnchorUI._$allocate({
                    parent: this.__unitctBoxNode,
                    questionVo: n,
                    onReturnLearn: function () {
                      this.__clearAnchorUI();
                      if (this.__video) this.__video._$resumeVideo();
                    }._$bind(this),
                    onReturnRichInfo: function () {
                      if (this.__video) this.__video._$pauseVideo();
                    }._$bind(this),
                  });
                DATracker.track('视频播放页-驻点浮窗展示-iaw', {
                  user_id: !!window.webUser && window.webUser.id,
                  pagename: 'videolearn',
                  term_id: this.__unitVo.termId,
                  video_id: i,
                  point_id: n.id,
                  point_name: n.title,
                  type: n.type,
                });
              }
            }
          }._$bind(this),
        );
        y._$trackEvent('video', 'anchor', this.__resourceVo.unitId + '：' + e.time + 's');
      }));
    S.__videoSegmentAILectureNoteHandle = function (e) {
      var t = this;
      if (this.__currentKnowledgeId !== e.knowledgeId && this.__showAILectureNote) {
        console.log('__videoSegmentAILectureNoteHandle :>> 变化', e);
        DATracker.track('认证MOOC课程学期模式视频课时页-视频分段-点击-iaw', {
          pagename: 'video',
          user_id: !!window.webUser && window.webUser.id,
          course_id: !!window.courseDto && window.courseDto.id,
          term_id: !!window.termDto && window.termDto.id,
        });
        this.__currentKnowledgeId = e.knowledgeId;
        if (this.__segmentAILectureNote)
          this.__segmentAILectureNote.$update({ currentKnowledgeId: e.knowledgeId });
      }
    };
    S.__initVideoSegmentAILectureNote = function () {
      if (this.__segmentAILectureNote) this.__segmentAILectureNote.destroy();
      var e = this;
      var t = '';
      if (
        e.__showAILectureNote &&
        e.__unitVo.aiLectureNoteSegmentList &&
        e.__unitVo.aiLectureNoteSegmentList.length &&
        e.__unitVo.aiLectureNoteSegmentList[0].knowledgeId
      )
        t = e.__unitVo.aiLectureNoteSegmentList[0].knowledgeId;
      e.__currentKnowledgeId = t;
      e.__segmentAILectureNote = new a({
        data: {
          segmentList: e.__unitVo.aiLectureNoteSegmentList || [],
          currentKnowledgeId: t,
          aiSegmentStatus: this.__aiSegmentStatus,
        },
      })
        .$inject(e.__AILectureNoteSidebarNode)
        .$on('setVideoTime', function (t) {
          console.log('setVideoTime :>> ', t);
          e.__video._$seekAnchorTime(t.time);
        });
    };
    S.__initAILectureViewer = function () {
      if (this.__AILectureViewer) this.__AILectureViewer.destroy();
      var e = this;
      var t = '';
      if (
        e.__showAILectureNote &&
        e.__unitVo.videoSegmentInfoDtos &&
        e.__unitVo.videoSegmentInfoDtos.length &&
        e.__unitVo.videoSegmentInfoDtos[0].knowledgeId
      )
        t = e.__unitVo.videoSegmentInfoDtos[0].knowledgeId;
      e.__AILectureViewer = new a({
        data: { segmentList: e.__unitVo.videoSegmentInfoDtos || [], currentKnowledgeId: t },
      }).$inject(e.__AILectureViewer);
    };
    S.__clearAnchorUI = function () {
      if (this.__insetVideoAnchorUI)
        this.__insetVideoAnchorUI = y._$$InsetVideoAnchorUI._$recycle(this.__insetVideoAnchorUI);
    };
    S.__destroy = function () {
      this.__clearAnchorUI();
      this.__recordTimer = b.clearInterval(this.__recordTimer);
      this.__3minsTimer = b.clearInterval(this.__3minsTimer);
      if (this.__video) {
        this.__video.__destroy();
        this.__video = null;
      }
      if (this._recommendModal) {
        this._recommendModal.destroy();
        this._recommendModal = null;
      }
      if (this.__segmentAILectureNote) this.__segmentAILectureNote.destroy();
      this.__supDestroy();
    };
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '8950f51727c5f2d563d0f32d23cb63d5',
  'f2ddbbb127b496a19d690f05e2c0f5fe',
  'd7bf69989e546759b84529160c7674fa',
  '35f84d81ad6ae92f28bbb591b632b6c0',
  '1eef47bbdf1fed4fada13b5ae7d0d174',
  '6822705a15f3a92045e363766de57848',
  'fe86216ed59e3103a56c42c850d389f0',
  '8419259be84b2292fe5117e5d132029e',
  'ecd59ff8d09a183ad64d245b3081fdb9',
  '45aeb51a857b8c0e0cbd727ee1df0c1a',
  '93828627ddb358ed890cb65967a0c1de',
  '493607ab361630ca82fc5bf094051616',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'fb061c769bfc74628a81f422f590544c',
  '726a7dcda1df09970835f707b7b82c44',
  'ad72e09e8978dc83423b503971b6294c',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '9f1797f8fce69be4524346a82910b5e7',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  'fb80274a93905bc7807baceaedc07c15',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
