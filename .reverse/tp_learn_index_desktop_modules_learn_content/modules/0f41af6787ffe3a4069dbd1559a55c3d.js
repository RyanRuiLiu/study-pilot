EDU(
  '0f41af6787ffe3a4069dbd1559a55c3d',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u) {
    function f(e) {
      var t = document.createElement('div');
      t.setAttribute('id', e);
      t.classList.add('user-player');
      return t;
    }
    var h;
    var p = window;
    var m = 3e4;
    var b = parseInt(1e5 * Math.random());
    var g = p.webUser ? p.webUser.id : b;
    var v = p.webUser ? p.webUser.nickName : '游客' + b;
    var E =
      p.webUser && p.webUser.largeFaceUrl
        ? p.webUser.largeFaceUrl
        : 'https://edu-image.nosdn.127.net/11652E8DC02A06857E392EB2A3C8E2FD.png';
    var w = 'true' == window.isMobilePhone ? s : a;
    h = e.$extends({
      name: 'ux-mooc-polyv-live',
      data: {
        watchStartTime: null,
        hasLogin: window.webUser && window.webUser.id,
        liveId: window.liveInfo && window.liveInfo.id,
        liveTokenInfo: {},
        dircetAuthParm: {},
        liveInfo: {},
        userId: g,
        userName: v,
        base64UserName: encodeURIComponent(_._$str2b64(v)),
        userFaceUrl: E.split('?')[0],
        isPlaying: !1,
      },
      computed: {
        isPolyvLive: function () {
          return (
            this.data.liveInfo.cdnMode === o.LIVE_MODE_POLYV_PART ||
            this.data.liveInfo.cdnMode === o.LIVE_MODE_POLYV_FULL
          );
        },
        isYKT: function () {
          if (!this.data.liveInfo) return !1;
          else return this.data.liveInfo.cdnMode == o.LIVE_MODE_POLYV_PART;
        },
        isPlayingAndYKT: function () {
          if (!this.data.liveInfo) return !1;
          else
            return (
              this.computed.isYKT.get(this) &&
              this.data.liveInfo.liveStatus == o.LIVE_STATUS_PLAYING
            );
        },
        isNotStart: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_NOTSTART;
        },
        isComing: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_COMING;
        },
        isPlaying: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_PLAYING;
        },
        isEnd: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_END || e.liveStatus == o.LIVE_STATUS_INVALID;
        },
        isHasChat: function () {
          if (this.data.originMenus)
            for (var e = 0; e < this.data.originMenus.length; e++) {
              var t = this.data.originMenus[e];
              if ('chat' == t.menuType) {
                if ('Y' == t.displayEnabled) return !0;
                break;
              }
            }
          return !1;
        },
      },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.initTrackEvent();
        this.data.$$isNarrowScreen =
          this.data.isLiveLearn && window.screen && window.screen.width < 1500;
        this.$update();
        if (this.data.isLiveLearn && !this.data.isColumnLive && !this.computed.isEnd.get(this))
          r.handleLiveSubscriptionComp(
            this.data.liveInfo,
            '#polyvPlayerBg',
            w,
            this.computed.isPolyvLive.get(this),
          );
        this.getPolyvDircetAuthParm();
      },
      getPolyvDircetAuthParm: function () {
        n._$getPolyvDircetAuthParm(
          { viewId: g },
          function (e) {
            this.data.dircetAuthParm = e;
            var t = i._$isMiniProgram()
              ? 'https://fde86a4bc0.live.polyv.cn'
              : 'https://live.polyv.cn';
            this.data.iframeUrl =
              t +
              '/watch/' +
              this.data.liveInfo.liveChannelId +
              (this.data.isMobile ? '?' : '?hasFrame=1&') +
              'userid=' +
              this.data.userId +
              '&ts=' +
              e.ts +
              '&sign=' +
              e.sign;
            this.$update();
            this.fetchToken();
          }._$bind(this),
        );
      },
      pollingLiveInfo: function (e) {
        n._$getLiveRoomInfo(
          { liveContentId: this.data.liveId || this.data.liveInfo.id, isNeedDetail: e },
          function (e) {
            if (e) {
              this.data.liveInfo = e;
              this.pollingLiveInfoCb(e);
              this.$update();
            }
          }._$bind(this),
        );
      },
      pollingLiveInfoCb: function (e) {
        this.data.liveInfo = e;
        if (
          e.liveStatus == o.LIVE_STATUS_END ||
          e.liveStatus == o.LIVE_STATUS_INVALID ||
          e.liveStatus == o.LIVE_STATUS_DELAY_START
        ) {
          if (e.liveStatus != o.LIVE_STATUS_DELAY_START)
            this.setIntervalLiveInfo && clearInterval(this.setIntervalLiveInfo);
          if (this.liveMobilePlayerStatus) this.liveMobilePlayerStatus.destroy();
          if (this.data.isMobile)
            this.liveMobilePlayerStatus = new d({ data: { liveStatus: e.liveStatus } }).$inject(
              this.$refs.polyvPlayerBg,
            );
          else
            this.liveMobilePlayerStatus = new c({ data: { liveStatus: e.liveStatus } }).$inject(
              this.$refs.polyvPlayerBg,
            );
        } else if (this.liveMobilePlayerStatus) this.liveMobilePlayerStatus.destroy();
        var t = e.liveStatus === o.LIVE_STATUS_PLAYING;
        var n = e.liveStatus === o.LIVE_STATUS_END;
        if (t && !window.__trackWatchTime) {
          var i = this.trackWatchTime;
          this.data.watchStartTime = new Date();
          window.__trackWatchTime = function () {
            i();
          };
        }
        if (n && window.__trackWatchTime) window.__trackWatchTime();
        this.$update();
      },
      fetchToken: function () {
        n._$getPolyvChannelToken(
          { channelId: this.data.liveInfo.liveChannelId },
          function (e) {
            this.data.liveTokenInfo = e || {};
            this.$update();
            this.getMenu();
          }._$bind(this),
        );
      },
      getMenu: function () {
        var e = this;
        var t = this.data.liveInfo;
        var n = t.liveChannelId;
        var i = this.data.liveTokenInfo.appId;
        var a = this.data.liveTokenInfo.sign;
        var s = this.data.liveTokenInfo.timestamp;
        PolyvLiveSdk.getChannelInfo(n, i, a, s).then(function (n) {
          if (!e.data.isMobile && n.channelMenus) {
            var i = [];
            n.channelMenus.forEach(function (e) {
              if ('desc' == e.menuType || 'text' == e.menuType || 'iframe' == e.menuType) {
                if (e.content)
                  e.content = e.content
                    .replace(/nos\.netease\.com\/edu-image/g, 'edu-image.nosdn.127.net')
                    .replace(/nos\.netease\.com\/mooc-image/g, 'mooc-image.nosdn.127.net');
                i.push(e);
              }
            });
            e.data.channelMenus = i;
            e.data.activeMenuId = i[0].menuId;
            e.data.originMenus = n.channelMenus;
          }
          if (
            t.liveStatus == o.LIVE_STATUS_PLAYING ||
            t.liveStatus == o.LIVE_STATUS_COMING ||
            t.liveStatus == o.LIVE_STATUS_DELAY_START
          ) {
            e.pollingLiveInfo(0);
            e.setIntervalLiveInfo = setInterval(function () {
              e.pollingLiveInfo(0);
            }, m);
          } else e.pollingLiveInfoCb(t);
          e.$update();
        });
      },
      clickMenu: function (e) {
        this.$update({ activeMenuId: e });
      },
      toLogin: function () {
        u._$showLogin({}, location.href);
      },
      trackWatchTime: function () {
        var e = this.data.watchStartTime;
        if (null !== e) {
          var t = new Date();
          var n = (t - e) / 1e3;
          if (!(n < 1)) {
            var i = {
              pagename: '直播间页面',
              user_id: null,
              live_id: this.data.liveId || p.liveInfo.id,
              remain_time: null,
            };
            if (!window.webUser)
              window.Fingerprint2 &&
                window.Fingerprint2.getV18({}, function (e, t) {
                  i.user_id = 'anonymous-' + e;
                  i.remain_time = n;
                  DATracker && DATracker.track('观看直播', i);
                  console.info('live watch log', i);
                });
            else {
              i.user_id = window.webUser.id;
              i.remain_time = n;
              DATracker && DATracker.track('观看直播', i);
              console.info('live watch log', i);
            }
            this.data.watchStartTime = new Date();
          }
        }
      },
      initTrackEvent: function () {
        DATracker &&
          DATracker.init('MA-A976-948FFA05E931', {
            img: !0,
            truncateLength: 255,
            persistence: 'localStorage',
            cross_subdomain_cookie: !1,
            use_app_track: !0,
          });
        var e = !('onpagehide' in window);
        window.addEventListener(
          'visibilitychange',
          function (e) {
            if ('hidden' === document.visibilityState) this.trackWatchTime();
            if ('visible' === document.visibilityState && null !== this.data.watchStartTime)
              this.data.watchStartTime = new Date();
          }._$bind(this),
        );
        window.addEventListener(
          'beforeunload',
          function (e) {
            this.trackWatchTime();
            e.preventDefault();
            e.returnValue = '';
          }._$bind(this),
        );
        window.addEventListener(
          'popstate',
          function (e) {
            this.trackWatchTime();
          }._$bind(this),
        );
        window.addEventListener(
          'unload',
          function (e) {
            this.trackWatchTime();
          }._$bind(this),
        );
        if (!e)
          window.addEventListener(
            'pagehide',
            function (e) {
              this.trackWatchTime();
            }._$bind(this),
          );
      },
    });
    return h;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '6f662c68416d97c376fb7e135752a301',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  '2d049fbc26f142d58c4f7b43ab6d59d0',
  '7d54152970cd710e0efa53a37a1e2c95',
  '051638d0f2bc4e591e7a6a850e191ac4',
  'f2389227e456e3ea56d0bf34ceb8fad4',
  '9da0c5f9c3384f5bf831188567dfa7e9',
  'f788ea0e4c9e44230ca4931f90b407e4',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
);
