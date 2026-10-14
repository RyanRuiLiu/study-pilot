EDU(
  '6a55482e5dbb028d0889d49da80296ae',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u) {
    var f = NEJ.P('edu.u');
    var h = {
      TIME: { MS_OF_1_MIN: 6e4, MS_OF_20_SEC: 2e4, MS_OF_10_SEC: 1e4 },
      EVENTS: {
        SHOULD_SAVE_LEARN_PROGRESS: 'shouldSaveLearnProgress',
        SHOULD_SET_UNIT_FINISHED: 'shouldSetUnitFinished',
      },
      WIDTH: { LIVE_MAX_WIDTH: 1267, PLAYBACK_MAX_WIDTH: 960 },
    };
    var p = o.$extends({
      name: 'lesson-live-wrapper',
      template: n,
      css: i,
      data: {
        liveId: 0,
        maxWidth: h.WIDTH.LIVE_MAX_WIDTH,
        $$isLiveExist: !0,
        $$memberNum: 0,
        _updateMemberNumInterval: void 0,
        _liveInfo: {},
        _startWatchingLiveTime: null,
        _initialLiveStatus: null,
        _isLiveEnd: !1,
        _isInitEventsForwardingDone: !1,
      },
      config: function () {
        this.supr();
      },
      computed: {
        $$liveName: function () {
          return this.data._liveInfo.name;
        },
        $$liveDateTime: function () {
          return (
            d._$formatTime(
              this.data._liveInfo.liveStartTime,
              e.isImoocUrl() ? 'MM-dd HH:mm' : 'MM月dd日 HH:mm',
            ) +
            ' - ' +
            d._$formatTime(this.data._liveInfo.liveFinishedTime, 'HH:mm')
          );
        },
        $$presenterUrl: function () {
          return '//' + this.data._liveInfo.teacherUrl || '';
        },
        $$presenterProfileImageUrl: function () {
          return this.data._liveInfo.presenterFaceUrl || '';
        },
        $$presenterName: function () {
          return this.data._liveInfo.presenterName || '';
        },
        $$schoolUrl: function () {
          return this.data._liveInfo.schoolUrl || '';
        },
        $$schoolName: function () {
          return this.data._liveInfo.schoolName || '';
        },
        $$liveDesc: function () {
          return this.data._liveInfo.description || '';
        },
        $$shareTitle: function () {
          return (
            this.data._liveInfo.name +
            '_来自' +
            (this.data._liveInfo.schoolName || '') +
            (this.data._liveInfo.presenterName || '') +
            '的直播_中国大学MOOC出品'
          );
        },
        $$shareTopic: function () {
          return this.computed.$$shareTitle.get(this);
        },
        $$shareDesc: function () {
          return this.data._liveInfo.description || '更多精彩直播前往中国大学MOOC';
        },
        $$sharePic: function () {
          return this.data._liveInfo.liveCoverUrl || '';
        },
        $$shareUrl: function () {
          return window.location.href;
        },
        $$liveStatus: function () {
          return this.data._liveInfo.liveStatus || '';
        },
        $$shouldHideShare: function () {
          return window.hideTermShare;
        },
        $$isCloudLive: function () {
          var e = this.data._liveInfo.cdnMode;
          return 10 === e || 11 === e;
        },
      },
      _getMaxWidthOfLiveWrapper: function () {
        var e = this.computed.$$isCloudLive.get(this);
        return e ? '1303' : this.data.maxWidth;
      },
      _initMemberNum: function (e) {
        if (e.liveStatus == _.LIVE_STATUS_END || e.liveStatus == _.LIVE_STATUS_TRANSFORM_COMPLETE)
          this.data.$$memberNum = e.maxMemberNum || 0;
        else this.$update({ $$memberNum: 0 });
      },
      _initMaxMemberNum: function () {
        a._$getChatRoomMaxMemberNum(
          { liveContentId: this.data.liveId },
          function (e) {
            if (
              (this.data._liveInfo || {}).liveStatus == _.LIVE_STATUS_END ||
              (this.data._liveInfo || {}).liveStatus == _.LIVE_STATUS_TRANSFORM_COMPLETE
            )
              this.$update({ $$memberNum: e });
            else this.$update({ $$memberNum: 0 });
          }._$bind(this),
        );
      },
      _initLiveInfo: function (e) {
        this.data.$$isLiveExist = !!e;
        if (
          e &&
          'undefined' != typeof e.liveStatus &&
          e.liveStatus === _.LIVE_STATUS_TRANSFORM_COMPLETE
        )
          this.data.maxWidth = h.WIDTH.PLAYBACK_MAX_WIDTH;
        this.data._liveInfo = e || {};
        this.$update();
        this._initEventsForwarding();
      },
      _initInitialLiveStatus: (function () {
        var e = !1;
        return function (t) {
          if (!e && t) {
            this.data._initialLiveStatus = t.liveStatus;
            e = !0;
          }
        };
      })(),
      _updateLearnProgress: function (e, t) {
        var n = Date.now(),
          i = this.data._startWatchingLiveTime,
          t = t || h.TIME.MS_OF_10_SEC,
          o = this.data._initialLiveStatus,
          a = (e || {}).liveStatus,
          s = this.data._isLiveEnd,
          r = {};
        if (!s && e && null != a && o == _.LIVE_STATUS_PLAYING) {
          if (a == _.LIVE_STATUS_END || a == _.LIVE_STATUS_TRANSFORM_COMPLETE) {
            r.isFinished = !0;
            this.data._isLiveEnd = !0;
          } else if (n - i >= t) r.isFinished = !1;
          else return;
          this.$emit(h.EVENTS.SHOULD_SAVE_LEARN_PROGRESS, r);
        }
      },
      _initEvents: function () {
        this._on = {};
        this._on[r.CONST.EVENTS.AFTER_UPDATE_LIVE_INFO] = function (e) {
          this._initMemberNum(e);
          this._initLiveInfo(e);
          this._initInitialLiveStatus(e);
          this._updateLearnProgress(e);
          if (!this._isFirst) {
            this._isFirst = !0;
            this._initMaxMemberNum();
          }
          this.$update();
        }.bind(this);
        this._on[r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA] = function (e, t) {
          this.data._liveInfo = t;
          this.data.$$memberNum = t.maxMemberNum || 0;
          this.$update();
          this.$emit(r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA, e);
        }.bind(this);
        this._on[r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO] = function (e) {
          this.$emit(r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO, e);
        }.bind(this);
        this._on[r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA] = function (e) {
          this.$emit(r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA, e);
        }.bind(this);
        this._on[r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO] = function (e) {
          this.$emit(r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO, e);
        }.bind(this);
      },
      _initEventsForwarding: function () {
        if (this.$refs.liveWrap && !this.data._isInitEventsForwardingDone) {
          this.$refs.liveWrap
            .$on(
              r.CONST.EVENTS.AFTER_UPDATE_LIVE_INFO,
              this._on[r.CONST.EVENTS.AFTER_UPDATE_LIVE_INFO],
            )
            .$on(
              r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA,
              this._on[r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA],
            )
            .$on(
              r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO,
              this._on[r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO],
            )
            .$on(
              r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA,
              this._on[r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA],
            )
            .$on(
              r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO,
              this._on[r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO],
            );
          this.data._isInitEventsForwardingDone = !0;
        }
      },
      init: function () {
        this.supr();
        this._initEvents();
        this.data._startWatchingLiveTime = Date.now();
        this._initEventsForwarding();
      },
      onGetResourceTokenError: function (e) {
        this.data.getResourceTokenError = !0;
        this.$update();
      },
    });
    p.CONST = u(!0, h, r.CONST);
    return p;
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'ca38b7e137b28e4006cbadb343315267',
  '12b528595f4682da0afb7aaeb9b572e0',
  '395bdf4ab3827a145e12c5bb9dcbb9ec',
  '235c21779ec98ac90606962a862dadc9',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '052bb5990dd9f04804c028e7faa9809d',
  '2bd79248584c9681e369d4f4c0395fcb',
  '14ccab79839aac2dd9b426816a7215bb',
  '89a466f05573f560c156411121b8daae',
  '8419259be84b2292fe5117e5d132029e',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  'f6224c30f6817fcd2b8c45779bf407f2',
);
