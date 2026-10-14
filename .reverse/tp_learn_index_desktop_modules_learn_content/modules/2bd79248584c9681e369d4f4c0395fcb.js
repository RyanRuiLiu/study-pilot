EDU(
  '2bd79248584c9681e369d4f4c0395fcb',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h, p, m, b) {
    var g = NEJ.P('edu.u');
    var v = {
      TIME: { MS_OF_1_MIN: 6e4 },
      EVENTS: {
        SHOULD_UPDATE_LIVE_INFO: 'shouldUpdateLiveInfo',
        SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA: 'shouldUpdatePlayBackVideoData',
        SHOULD_UPDATE_ROOM_INFO: 'shouldUpdateRoomInfo',
        AFTER_UPDATE_LIVE_INFO: 'afterUpdateLiveInfo',
        AFTER_UPDATE_PLAY_BACK_VIDEO_DATA: 'afterUpdatePlayBackVideoData',
      },
    };
    var E = i.$extends({
      name: 'live-wrap',
      template: t,
      css: n,
      data: {
        liveId: null,
        isLiveLearn: !1,
        _liveInfo: null,
        _roomInfo: null,
        _playBackVideoData: null,
        _liveModule: null,
        $$joinStatus: 0,
      },
      config: function () {
        this.supr();
      },
      computed: {
        isYKT: function () {
          var e = this.data._liveInfo;
          return e.cdnMode == a.LIVE_MODE_POLYV_PART;
        },
        isPlayingAndYKT: function () {
          var e = this.data._liveInfo;
          if (!e) return !1;
          else return e.cdnMode == a.LIVE_MODE_POLYV_PART && e.liveStatus == a.LIVE_STATUS_PLAYING;
        },
      },
      _hasOngoingLive: function (e, t) {
        return !!(e && t && e.id && e.meetId && t.appKey && t.token);
      },
      _onLiveInfoUpdate: function (e) {
        this.$emit(v.EVENTS.AFTER_UPDATE_LIVE_INFO, e);
      },
      tryInitLiveModule: function () {
        var e = this.data._liveInfo || {},
          t = this.data._roomInfo || {};
        var n = this._hasOngoingLive(e, t);
        if ((n || this.data._playBackVideoData) && !this.data._liveModule) {
          this._initLive();
          this.$update();
        }
      },
      _initPlayBackData: function () {
        if (this.data._playBackVideoData) {
          this.data._playBackVideoData.autoStart = !0;
          this.data._playBackVideoData.preload = !1;
          this.data._playBackVideoData.start = 0;
        }
      },
      _normalizeLiveInfo: function () {
        var e = this.data._liveInfo;
        if (e)
          e.presenterFaceUrl =
            e.presenterFaceUrl ||
            '//edu-image.nosdn.127.net/D893FA72CDBD42A24B8E0F8A537DA1F4.jpg?imageView&thumbnail=80y80&quality=100';
      },
      _initLiveInfo: function () {
        if (this.data.liveId)
          this.$emit(v.EVENTS.SHOULD_UPDATE_LIVE_INFO, this._on[v.EVENTS.SHOULD_UPDATE_LIVE_INFO]);
        else this.data.isLiveExist = !1;
      },
      _initRoomInfo: function () {
        var e = this;
        var t = this.data._liveInfo.cdnMode;
        if (this.data.liveId)
          if (
            (t == a.LIVE_MODE_POLYV_PART || t == a.LIVE_MODE_POLYV_FULL) &&
            this.data._liveInfo.liveStatus != a.LIVE_STATUS_TRANSFORM_COMPLETE
          ) {
            if (!this.polyvLive)
              this.polyvLive = new f({
                data: {
                  liveInfo: this.data._liveInfo,
                  isLiveLearn: this.data.isLiveLearn,
                  isColumnLive: this.data.isColumnLive,
                },
              }).$inject(this.$refs.liveWrap);
          } else
            this.$emit(
              v.EVENTS.SHOULD_UPDATE_ROOM_INFO,
              this._on[v.EVENTS.SHOULD_UPDATE_ROOM_INFO],
            );
        else this.data.isLiveExist = !1;
      },
      openDeviceSetting: function () {
        this.polyvLive.rtc.openDeviceSetting();
      },
      joinChannel: function () {
        if (this.polyvLive.rtc)
          if (1 == this.data.$$joinStatus) {
            this.polyvLive.rtc.cancelJoinChannel();
            this.data.$$joinStatus = 0;
            this.polyvLive.showOnlineTab();
          } else {
            this.polyvLive.rtc.joinChannel();
            this.data.$$joinStatus = 1;
          }
      },
      init: function () {
        this.supr();
        this._initEventHandlers();
        setTimeout(
          function () {
            this._initLiveInfo();
            this.$update();
          }.bind(this),
          200,
        );
        this.$update();
      },
      _initLive: function () {
        c._$getLiveAuthInfo(
          { liveId: this.data.liveId },
          function (e) {
            if (e.authToken) {
              var t = window;
              s.setAuth(e.authToken);
              s.setScope({
                applicationId: e.applicationId,
                sceneType: e.sceneType,
                sceneId: e.sceneId,
              });
              _._$addEvent(l.EVT_CLICK_LOGIN, function (e) {
                u._$showLogin({});
                _._$stop(e);
              });
              s.batch({});
              r.build({
                parent: this.$refs.liveWrap,
                liveId: this.data.liveId || t.liveInfo.id,
                userId: (t.webUser && t.webUser.id) || -1,
                playBackVideoData: null,
              });
              if (
                this.data._liveInfo.liveStatus == a.LIVE_STATUS_END ||
                this.data._liveInfo.liveStatus == a.LIVE_STATUS_INVALID
              )
                new b({ data: { liveStatus: this.data._liveInfo.liveStatus } }).$inject(
                  '.um-live-live-pc_player',
                );
              _._$addEvent('onLiveInfoUpdate', this._onLiveInfoUpdate.bind(this));
            } else alert('获取签名失败');
          }._$bind(this),
        );
      },
      _initEventHandlers: function () {
        this._on = {};
        this._on[v.EVENTS.SHOULD_UPDATE_LIVE_INFO] = function (e) {
          if (e) {
            this.data._liveInfo = e;
            this.data.$$showTripleScreen =
              e.cdnMode == a.LIVE_MODE_POLYV_PART && e.liveStatus != a.LIVE_STATUS_END;
            this._normalizeLiveInfo();
            if (e.liveStatus == a.LIVE_STATUS_TRANSFORM_COMPLETE)
              this.$emit(
                v.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA,
                this._on[v.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA],
              );
            else this._initRoomInfo();
          } else this.data.isLiveExist = !1;
          this.$emit(v.EVENTS.AFTER_UPDATE_LIVE_INFO, e);
          this.$update();
        }.bind(this);
        this._on[v.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA] = function (e) {
          console.log(e);
          this.data._playBackVideoData = (e && e.Video && e.Video.videoVo) || null;
          this._initPlayBackData();
          this._initVideo();
          this.$emit(v.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA, e, this.data._liveInfo);
          this.$update();
        }.bind(this);
        this._on[v.EVENTS.SHOULD_UPDATE_ROOM_INFO] = function (e) {
          this.data._roomInfo = e || {};
          this.tryInitLiveModule();
          this.$update();
        }.bind(this);
      },
      _initVideo: function () {
        if (this.__video) this.__video.__destroy();
        var e = { contentType: p.CONTENT_TYPE.LIVE, videoInfo: { autoStart: !0 } };
        if (this.data.isColumnLive) {
          e.bizId = this.data.lessonUnitId;
          e.bizType = p.BIZ_TYPE.UNIT;
        } else {
          e.bizId = this.data._liveInfo.id;
          e.bizType = p.BIZ_TYPE.LIVE;
        }
        if (!this.data.isLiveLearn || this.data.isColumnLive)
          this.__video = new h({ data: e })
            .$inject(this.$refs.liveWrap)
            .$on('onGetResourceTokenError', this._onGetResourceTokenError._$bind(this));
      },
      _onGetResourceTokenError: function (e) {},
    });
    E.CONST = v;
    return E;
  },
  'ca38b7e137b28e4006cbadb343315267',
  'afe426fdcae7b771cb970d9ab5a70a3f',
  '52a5c99cd736ff9eb728dcd2051013b3',
  '235c21779ec98ac90606962a862dadc9',
  'fed2a7787616f1c847df896918b515b5',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  '8f34a99b20d362b3542aebd517390fc1',
  'fed2a7787616f1c847df896918b515b5',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '731fee98f4051ac4516e6be41b9e3430',
  '7cc3fd8fe229634761a8f9221fda22d8',
  '665b4e36772193beffe50de855029c13',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  'aae6e059722698fd6c1e787c74837e08',
  '8950f51727c5f2d563d0f32d23cb63d5',
  'f2ddbbb127b496a19d690f05e2c0f5fe',
  '93828627ddb358ed890cb65967a0c1de',
  'f2389227e456e3ea56d0bf34ceb8fad4',
);
