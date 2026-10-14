EDU(
  '95505edb0cbde6bef675ad0664625223',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h, p, m, b) {
    var g = o
      .$extends({
        name: 'ux-live-pc-player',
        config: function () {
          a.extend(this, {
            liveConstant: f,
            liveUnstartCustomUI: p.get('live-pc').liveUnstartCustomUI,
            clockUIs: {},
          });
          a.extend(this.data, {
            liveMethodType: null,
            liveContentId: '',
            liveCover: '',
            liveTitle: '',
            liveStartTime: 0,
            accurateStartTime: 0,
            liveEndTime: 0,
            accurateFinishedTime: 0,
            liveStatus: null,
            playBackVideoData: null,
            showLiveInIdleFlag: !1,
            showLiveStreamErrorFlag: !1,
            waterMark: !1,
            waterMarkContent: '',
            notAllowFullScreen: !1,
            lang: e,
          });
          this.supr();
        },
        init: function () {
          this.supr();
          this._cacheIns = u.Live._$allocate({});
          this._getLiveInfo();
        },
        _getLiveInfo: function (e) {
          if (e) this._updateLiveInfo();
          else
            setTimeout(
              function () {
                this._updateLiveInfo();
              }._$bind(this),
              0,
            );
        },
        _updateLiveInfo: function () {
          this._cacheIns._$getLiveInfo({
            data: { liveContentId: this.data.liveContentId },
            onload: function (e) {
              if (void 0 !== e.result) e = e.result;
              this.updateLiveInfo(e);
              m._$dispatchEvent(b.EVT_LIVE_STATUS, e);
              this.$emit('updateLiveInfo', e);
            }._$bind(this),
          });
        },
        updateLiveInfo: function (e) {
          if (e) {
            this.data.liveTitle = e.name;
            this.data.liveStatus = e.liveStatus;
            this.data.liveStartTime = e.liveStartTime;
            this.data.accurateStartTime = e.accurateStartTime;
            this.data.liveEndTime = e.liveFinishedTime;
            this.data.accurateFinishedTime = e.accurateFinishedTime;
            this.data.liveCover = e.liveCoverUrl;
            this.data.liveMethodType = e.liveMethodType;
            if (e.supportYD && e.lines && e.lines.length) this.data.lines = e.lines;
            this.$update();
            this._setCheckStatusHeartbeat(e.liveStatus);
            this._checkLiveStatus();
          } else {
            this._destroyLivePlayer();
            this._destroyPlayBackPlayer();
            this._clearClock();
          }
        },
        _setCheckStatusHeartbeat: function (e) {
          if (!this.__checkLiveStatusId) {
            var t = 30;
            this.__checkLiveStatusId = setInterval(this._getLiveInfo._$bind(this, !0), 1e3 * t);
          }
        },
        _clearStatusHeartbeat: function () {
          if (this.__checkLiveStatusId) {
            clearInterval(this.__checkLiveStatusId);
            this.__checkLiveStatusId = null;
          }
        },
        _checkLiveStatus: function () {
          if (this.data.liveStatus == f.LIVE_STATUS_NOTSTART) {
            var e = this.data.liveStartTime - h._$getCurServerTime() - 18e5;
            this._setClock('notstart', e / 1e3);
          } else if (this.data.liveStatus == f.LIVE_STATUS_COMING)
            this._setClock('coming', (this.data.liveStartTime - h._$getCurServerTime()) / 1e3);
          else if (this.data.liveStatus == f.LIVE_STATUS_DELAY_START);
          else if (this.data.liveStatus == f.LIVE_STATUS_PLAYING) {
            this._genLivePlayer();
            if (!this.__checkLiveProgressId)
              this.__checkLiveProgressId = setInterval(
                this._checkLiveProgress._$bind(this, !0),
                1e3,
              );
            this._setClock('playing', (this.data.liveEndTime - h._$getCurServerTime()) / 1e3);
          } else if (this.data.liveStatus == f.LIVE_STATUS_INVALID) this._clearStatusHeartbeat();
          else if (this.data.liveStatus == f.LIVE_STATUS_END) {
            this._destroyLivePlayer();
            this._clearStatusHeartbeat();
            if (this.__checkLiveProgressId) {
              clearTimeout(this.__checkLiveProgressId);
              this.__checkLiveProgressId = null;
            }
          } else if (this.data.liveStatus == f.LIVE_STATUS_TRANSFORM_COMPLETE) {
            this._genPlayBackPlayer();
            this._clearStatusHeartbeat();
          }
        },
        _setClock: function (e, t, n) {
          if (!this.clockUIs[e]) {
            if (t < 0) t = 0;
            var i = new d({ data: { class: 'f-ib' } });
            this.clockUIs[e] = i;
            if (n) i.$inject(n);
            i.$on(
              'finish',
              function () {
                this._clearStatusHeartbeat();
                this._getLiveInfo();
              }._$bind(this),
            );
            i.setTime(parseInt(t));
            i.start();
          }
        },
        _clearClock: function () {
          t._$forEach(this.clockUIs, function (e, t) {
            e && e.destroy();
          });
        },
        _checkLiveProgress: function () {
          if (f.LIVE_METHOD_TYPE_OBS != this.data.liveMethodType)
            if (this.data.accurateFinishedTime - h._$getCurServerTime() <= 15e3)
              if (!this._hasSetTimeoutNotif) {
                this._hasSetTimeoutNotif = !0;
                l.warning(e.KYE_LIB_PCPLAYER_TIMEOUT_LIVE_FINISH, 15e3);
              }
        },
        _genLivePlayer: function () {
          var e, t, n;
          if (this.data.lines && this.data.lines.length) {
            e = this.data.lines[0].ratios[0].rtmpUrl;
            t = this.data.lines[0].ratios[0].flvUrl;
          }
          if (!this._hasGenLivePlayer) {
            this._hasGenLivePlayer = !0;
            if (!this.data.lines || !this.data.lines.length) this._getStreamUrl();
            else {
              n = {
                liveId: this.data.liveContentId,
                liveTitle: this.data.liveTitle,
                liveStartTime: this.data.liveStartTime,
                liveEndTime: this.data.liveEndTime,
                defaultRtmpStreamUrl: e,
                defaultFlvStreamUrl: t,
                lines: this.data.lines,
              };
              this._genVideoPlayer(n);
            }
          }
        },
        _getStreamUrl: function () {
          this._cacheIns._$getStraamUrl({
            data: { liveContentId: this.data.liveContentId, isWeb: this.isIPad ? '0' : '1' },
            onload: function (e) {
              this._onGetStramUrl(e);
            }._$bind(this),
          });
        },
        _genVideoPlayer: function (e) {
          this._livePlayerUI = new r({
            data: {
              useH5: this.data.useH5,
              autoStart: c._$isMobileAll() ? !1 : !0,
              notAllowFullScreen: this.data.notAllowFullScreen,
              waterMark: this.data.waterMark,
              waterMarkContent: this.data.waterMarkContent,
              videoData: e,
            },
          }).$inject(this.$refs.livePlayerNode);
          this._livePlayerUI.$on('onLiveStreamClosed', this._onLiveStreamClosed._$bind(this));
          m._$dispatchEvent(b.EVT_LIVE_PLAYER_INS_INITED, this._livePlayerUI);
        },
        _onGetStramUrl: function (e) {
          if (e) {
            var t = {
              liveId: this.data.liveContentId,
              liveTitle: this.data.liveTitle,
              liveStartTime: this.data.liveStartTime,
              liveEndTime: this.data.liveEndTime,
              defaultRtmpStreamUrl: e.liveRtmpStreamUrl || e.liveStreamUrl,
              defaultFlvStreamUrl: e.liveFlvStreamUrl,
              defaultHlsStreamUrl: e.liveHlsStreamUrl,
              streamUrlReqAdr: e.liveChannelYoudaoDetail
                ? e.liveChannelYoudaoDetail.pullUrlGet
                : null,
            };
            this._genVideoPlayer(t);
          }
        },
        _onLiveStreamClosed: function () {},
        showLiveInIdle: function () {
          this.data.showLiveInIdleFlag = !0;
          this.$update();
        },
        showLiveStreamError: function () {
          this.data.showLiveStreamErrorFlag = !0;
          this.$update();
        },
        checkReload: function () {
          if (this._livePlayerUI) {
            this.data.showLiveStreamErrorFlag = !1;
            this.$update();
            try {
              this._livePlayerUI.checkLiveReload();
            } catch (e) {}
          }
        },
        _destroyLivePlayer: function () {
          if (this._livePlayerUI)
            try {
              this._livePlayerUI.destroy();
              this._livePlayerUI = null;
            } catch (e) {
              console.warn(e);
            }
          if (this.$refs && this.$refs.livePlayerNode) {
            var t = n._$getChildren(this.$refs.livePlayerNode);
            if (t) for (var i = 0; i < t.length; i++) this.$refs.livePlayerNode.removeChild(t[i]);
          }
        },
        _genPlayBackPlayer: function () {
          if (!this._playBackPlayerUI) {
            this._playBackPlayerUI = new s({
              data: {
                waterMark: this.data.waterMark,
                waterMarkContent: this.data.waterMarkContent,
                notAllowFullScreen: this.data.notAllowFullScreen,
                videoData: this.data.playBackVideoData,
              },
            }).$inject(this.$refs.playBackPlayerNode);
            this._playBackPlayerUI.$on(
              'onPlay',
              function (e) {
                this.$emit('PlayBackPlay', e);
              }._$bind(this),
            );
            this._playBackPlayerUI.$on(
              'onPauseClick',
              function (e) {
                this.$emit('PlayBackPauseClick', e);
              }._$bind(this),
            );
            this._playBackPlayerUI.$on(
              'onSeek',
              function (e) {
                this.$emit('PlayBackSeek', e);
              }._$bind(this),
            );
            this._playBackPlayerUI.$on(
              'onPlayEnd',
              function (e) {
                this.$emit('PlayBackEnd', e);
              }._$bind(this),
            );
          }
        },
        getPlayBackStateInfo: function (e) {
          this._playBackPlayerUI && this._playBackPlayerUI.getStateInfo(e);
        },
        _destroyPlayBackPlayer: function () {
          if (this._playBackPlayerUI) {
            this._playBackPlayerUI.destroy();
            this._playBackPlayerUI = null;
          }
          if (this.$refs && this.$refs.playBackPlayerNode) {
            var e = n._$getChildren(this.$refs.playBackPlayerNode);
            if (e)
              for (var t = 0; t < e.length; t++) this.$refs.playBackPlayerNode.removeChild(e[t]);
          }
        },
        destroy: function () {
          this._destroyLivePlayer();
          this._destroyPlayBackPlayer();
          this._clearClock();
          this._clearStatusHeartbeat();
          this.supr();
        },
      })
      .filter({});
    return g;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '4b2a52ea911cc1cabd5156fdc88e88a2',
  '838594f8af8a76858b8ceed990333912',
  'beec6201069596ecb83a09e5fc3eb415',
  'f16163ac846a07f5993da5026e5efada',
  '29f555f70e6e64cf8315ed720772ced1',
  'abe9a6b99742882e8efaadd2518b0cb2',
  '9dc508f2eef931918f19fafe68ba902b',
  'e3c72a3eb3b9f2c3bb2bb123118a374f',
  '89a466f05573f560c156411121b8daae',
  '8f34a99b20d362b3542aebd517390fc1',
  '665b4e36772193beffe50de855029c13',
  '97edda62b43e7a7a70e398500c91441e',
);
