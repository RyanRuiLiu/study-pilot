EDU(
  '838594f8af8a76858b8ceed990333912',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p, m) {
    var g = 'component-live-player';
    var b = n.$extends({
      name: 'ux-live-player',
      css: t,
      template: e,
      bem: '&',
      config: function () {
        var e = {
          host: location.protocol + '//' + location.host,
          useH5: !0,
          useNative: !1,
          isLocal: !1,
          autoStart: !1,
          volume: 0.8,
          mute: !1,
          notAllowFullScreen: !1,
          videoPlayerSwfRemoteUrl: null,
          videoPlayerUISwfRemotePath: null,
          x5Fullscreen: !1,
          waterMark: !1,
          waterMarkContent: '',
          videoData: null,
          mode: 'live',
          isWap: h._$isMobileAll(),
          showTip: !1,
          tipMsg: '',
        };
        this._fetchVideoErrorCount = 0;
        e = this._mergeLocalConfig(e);
        i.extend(e, o.get(g) || {}, !0);
        i.extend(this.data, e);
        this.supr();
      },
      _mergeLocalConfig: function (e) {
        var t = this._readLocalConfig();
        if (void 0 !== t.volume) e.volume = t.volume;
        if (void 0 !== t.mute) e.mute = t.mute;
        if (void 0 !== t.lineSwitch) e.lineSwitch = t.lineSwitch;
        if (void 0 !== t.defaultQuality) e.defaultQuality = t.defaultQuality;
        if (!e.volume || e.mute) {
          e.volume = 0;
          e.mute = !0;
        }
        return e;
      },
      init: function () {
        this.supr();
        if ('live' != this.data.mode) this.data.mode = 'live';
        this._initLog();
        this._opsPros();
        this._fetchStreamData();
      },
      _fetchStreamData: function () {
        if (this.data.videoData.liveId && this.data.videoData.streamUrlReqAdr) {
          var e = {
            onload: function (e) {
              if ('1' == e.issucc) {
                this.data.videoData.lines = (e.lines || []).concat(this.data.videoData.lines || []);
                var t = this.data.videoData.lines.length;
                if (t >= 3) {
                  this.data.videoData.lines[t - 1].lineName = '线路' + t;
                  this.data.videoData.lines[t - 1].lineType = t;
                }
                this._genPlayer();
              } else {
                this._onError('get_streamurl_issucc_error');
                this._showTip('直播获取失败[code:-2]');
              }
            }._$bind(this),
            onerror: function (e) {
              this._retryFetchStreamData();
            }._$bind(this),
            method: 'get',
            type: 'json',
            sync: this.data.isWap,
            data: {
              uid: window.webUser && window.webUser.id,
              nickName: window.webUser && (window.webUser.realName || window.webUser.nickName),
              flashVersion: '',
              app: this.data.videoData.liveApp || 'kada',
            },
          };
          m._$request(
            this.data.videoData.streamUrlReqAdr.replace('{$liveId}', this.data.videoData.liveId),
            e,
          );
        } else this._genPlayer();
      },
      _genLinesFromUrl: function (e) {
        var t = [
          {
            lineType: 2,
            lineName: '线路2',
            ratios: [
              {
                ratioName: '原画',
                ratioType: 3,
                rtmpUrl: e.defaultRtmpStreamUrl,
                flvUrl: e.defaultFlvStreamUrl,
                m3u8Url: e.defaultHlsStreamUrl,
              },
            ],
          },
        ];
        return t;
      },
      _retryFetchStreamData: function () {
        if (this._fetchVideoErrorCount >= 3) {
          this._onError('get_streamdata_net_work_error');
          this._showTip('直播获取失败[code:-3]');
        } else {
          this._fetchVideoErrorCount++;
          this._fetchStreamData();
        }
      },
      destroy: function () {
        this.__playerUI && this.__playerUI._$recycle();
        this._logReport && this._logReport._$recycle();
        this.supr();
      },
      _showTip: function (e) {
        this.data.showTip = !0;
        this.data.tipMsg = e;
        this.$update();
        var t = r._$getByClassName(this.$refs.playerNode, 'j-reload')[0];
        if (t)
          s._$addEvent(t, 'click', function () {
            window.location.reload();
          });
      },
      _readLocalConfig: function () {
        if (this.data.cookieDomain) this._clearOldCookie();
        var e = c._$cookie('videoVolume');
        var t = c._$cookie('hasVolume');
        var n = c._$cookie('liveLineSwitch');
        var i = 1 * (c._$cookie('liveQuality') || 1);
        e = '' == e ? void 0 : Number(e);
        t = '' == t ? void 0 : t;
        n = '' == n ? void 0 : n;
        i = isNaN(i) ? void 0 : i;
        var o = void 0 !== t ? 'false' == t : !1;
        return { volume: e, mute: o, lineSwitch: n, defaultQuality: i };
      },
      _clearOldCookie: function () {
        c._$cookie('videoVolume', { domain: location.host, expires: -1 });
        c._$cookie('hasVolume', { domain: location.host, expires: -1 });
        c._$cookie('videoResolutionType', { domain: location.host, expires: -1 });
      },
      _shouldGenH5Player: function () {
        var e = this.data.videoData.lines;
        var t = [],
          n = [],
          i = [];
        var o = _.supportVideo() && this.data.useH5;
        var a = _.supportHLS();
        var r = _.supportFlv();
        var s = !1;
        var c = !1;
        var d = !1;
        for (var l = 0; l < e.length; l++) {
          var u = e[l];
          t[l] = { type: u.lineType, name: u.lineName, ratios: [] };
          n[l] = { type: u.lineType, name: u.lineName, ratios: [] };
          i[l] = { type: u.lineType, name: u.lineName, ratios: [] };
          if (u.ratios) {
            u.ratios.sort(function (e, t) {
              return t.ratioType - e.ratioType;
            });
            for (var f = 0; f < u.ratios.length; f++) {
              var h = u.ratios[f];
              if (h.rtmpUrl) {
                i[l].ratios.push({
                  qualityName: h.ratioName,
                  quality: h.ratioType,
                  url: h.rtmpUrl,
                  format: 'rtmp',
                });
                d = !0;
              }
              if (h.flvUrl || h.flvsUrl) {
                n[l].ratios.push({
                  qualityName: h.ratioName,
                  quality: h.ratioType,
                  url: /^https:/.test(window.location.protocol) && h.flvsUrl ? h.flvsUrl : h.flvUrl,
                  format: 'flv',
                });
                c = !0;
              }
              if (h.m3u8Url) {
                t[l].ratios.push({
                  qualityName: h.ratioName,
                  quality: h.ratioType,
                  url: h.m3u8Url,
                  format: 'hls',
                });
                s = !0;
              }
            }
          }
        }
        var p;
        this.data.videoData.lines = null;
        if (o) {
          if (c && r) {
            this.data.videoData.lines = n;
            p = !0;
          } else if (s && a) {
            this.data.videoData.lines = t;
            p = !0;
            if (this.data.isWap) delete this.data.videoData.defaultFlvStreamUrl;
          }
        } else {
          if (d && i) this.data.videoData.lines = i;
          else if (c && n) this.data.videoData.lines = n;
          p = !1;
        }
        if (!this.data.videoData.lines) {
          this._showTip('直播获取失败[code:-7]');
          this._onError('no_lines_or_player_can_use');
          throw new Error('no_lines_or_player_can_use');
        }
        return p;
      },
      _opsPros: function () {
        if (!this.data.videoData) {
          this._showTip('直播获取失败[code:-4]');
          this._onError('no_videodata');
          throw new Error('no_videodata');
        }
        var e =
          this.data.videoData.flvSdUrl ||
          this.data.videoData.mp4SdUrl ||
          this.data.videoData.m3u8SdUrl;
        if (e)
          if (/^rtmp/i.test(e)) this.data.videoData.defaultRtmpStreamUrl = e;
          else if (/\.m3u8/i.test(e)) this.data.videoData.defaultHlsStreamUrl = e;
          else this.data.videoData.defaultFlvStreamUrl = e;
        this.data.volume = this._formatNumberParam(this.data.volume);
        if (!this.data.videoData.lines)
          this.data.videoData.lines = this._genLinesFromUrl(this.data.videoData);
      },
      _genPlayer: function () {
        var e;
        try {
          e = this._shouldGenH5Player();
        } catch (t) {
          return;
        }
        var n = e ? 'h5' : 'flash';
        if (!this.__playerUI || !this.__curPlayerType || this.__curPlayerType != n) {
          this.__curPlayerType = n;
          setTimeout(
            function () {
              this.$emit('onPlayerType', n);
            }._$bind(this),
            0,
          );
          this.__playerUI && this.__playerUI._$recycle();
          if (e)
            this.__playerUI = l._$$Html5VideoPlayer._$allocate({
              parent: this.$refs.playerNode,
              data: this.data,
            });
          else {
            if (!p._$checkFlash()) {
              this._showNotSupportFlash();
              return;
            }
            this.__playerUI = d._$$FlashVideoPlayer._$allocate({
              parent: this.$refs.playerNode,
              data: this._changeFormatForFlash(this.data),
            });
          }
          this._initPlayerEvent();
          this._logReport.setPlayer(this.data, this.__playerUI);
        } else this.__playerUI._$load(this.data.videoData);
      },
      _changeFormatForFlash: function (e) {
        e.videoData.videos = [];
        var t = e.videoData.lines[0];
        var n = t.ratios[0];
        e.videoData.videos.push({
          quality: n.quality,
          videoUrl: n.url,
          format: n.format,
          qualityName: n.qualityName,
        });
        return e;
      },
      _formatNumberParam: function (e) {
        if (!e) return 0;
        var t = Number(e);
        if (isNaN(t)) return 0;
        else return t < 0 ? 0 : t;
      },
      _showNotSupportFlash: function () {
        this._showTip(
          '未安装flash，点击<a target="_blank" href="https://get.adobe.com/flashplayer/">这里</a>安装。如果已经安装，请检查flash是否被浏览器拦截',
        );
      },
      _initPlayerEvent: function () {
        this.__playerUI._$addEvent('onStartLoad', this._onStartLoad._$bind(this));
        this.__playerUI._$addEvent('onMeta', this._onMeta._$bind(this));
        this.__playerUI._$addEvent('onError', this._onPlayerError._$bind(this));
        this.__playerUI._$addEvent('onPlayEnd', this._onPlayEndHandle._$bind(this));
        this.__playerUI._$addEvent('onPlay', this._onPlay._$bind(this));
        this.__playerUI._$addEvent('onPause', this._onPause._$bind(this));
        this.__playerUI._$addEvent('onBuffering', this._onBuffering._$bind(this));
        this.__playerUI._$addEvent('onPlayClick', this._onPlayClick._$bind(this));
        this.__playerUI._$addEvent('onPauseClick', this._onPauseClick._$bind(this));
        this.__playerUI._$addEvent('onSelectResolution', this._onSelectResolution._$bind(this));
        this.__playerUI._$addEvent('onChangeCDN', this._onSelectCDN._$bind(this));
        this.__playerUI._$addEvent('onChangeVolume', this._onChangeVolume._$bind(this));
        this.__playerUI._$addEvent('onMute', this._onChangeMute._$bind(this));
        this.__playerUI._$addEvent('onLiveStreamClosed', this._onLiveStreamClosed._$bind(this));
        this.__playerUI._$addEvent('onFullscreenChange', this._onFullscreenChange._$bind(this));
      },
      _initLog: function () {
        this._logReport = u._$$LogReport._$allocate();
      },
      getPlayerType: function () {
        return this.__curPlayerType;
      },
      load: function (e) {
        if (e) {
          this.data.videoData = e;
          this._opsPros();
          this._fetchStreamData();
        }
      },
      stop: function () {
        this.__playerUI._$stop();
      },
      pause: function () {
        this.__playerUI._$pause();
      },
      resume: function () {
        this.__playerUI._$resume();
      },
      getState: function (e) {
        this.__playerUI._$getState(e);
      },
      getStateInfo: function (e) {
        this.__playerUI._$getStateInfo(e);
      },
      getLog: function (e) {
        this.__playerUI._$getLog(
          function (t) {
            var n = [];
            n.push('player type:' + this.__curPlayerType);
            n.push('platform:' + (this.data.isWap ? 'wap' : 'web'));
            n.push('userAgent:' + navigator.userAgent);
            n.push('createTime:' + new Date().getTime().toString());
            t = n.join('\n') + '\n' + t;
            e && e(t);
          }._$bind(this),
        );
      },
      exitFullScreen: function () {
        return this.__playerUI._$exitFullScreen();
      },
      checkLiveReload: function () {
        this.__playerUI._$checkLiveReload();
      },
      _onStartLoad: function (e) {
        e = e || {};
        this.$emit('onStartLoad', e);
      },
      _onMeta: function (e) {
        this.$emit('onMeta', e);
      },
      _onPlayerError: function (e) {
        this.$emit('onError', e);
      },
      _onError: function (e) {
        this.$emit('onError', e);
      },
      _onPlayEndHandle: function () {
        this.$emit('onPlayEnd');
      },
      _onChangeVolume: function (e) {
        c._$cookie('videoVolume', {
          path: '/',
          value: e + '',
          domain: this.data.cookieDomain || document.domain,
          expires: 365,
        });
        this.$emit('onChangeVolume', { volume: e });
        var t = 0 == Number(e);
        this._onChangeMute(t);
      },
      _onChangeMute: function (e) {
        c._$cookie('hasVolume', {
          path: '/',
          value: !e + '',
          domain: this.data.cookieDomain || document.domain,
          expires: 365,
        });
        this.$emit('onMute', { mute: e });
      },
      _onSelectResolution: function (e) {
        c._$cookie('liveQuality', {
          path: '/',
          domain: this.data.cookieDomain || document.domain,
          value: e.newData.quality || e.newData.quality,
          expires: 365,
        });
        this.$emit('onSelectResolution', e);
      },
      _onSelectCDN: function (e) {
        c._$cookie('liveLineSwitch', {
          path: '/',
          domain: this.data.cookieDomain || document.domain,
          value: e.newData.type,
        });
        this.$emit('onChangeCDN', e);
      },
      _onPlay: function () {
        this.$emit('onPlay');
      },
      _onPause: function () {
        this.$emit('onPause');
      },
      _onBuffering: function () {
        this.$emit('onBuffering');
      },
      _onPlayClick: function () {
        this.$emit('onPlayClick');
      },
      _onPauseClick: function (e) {
        this.$emit('onPauseClick', e);
      },
      _onLiveStreamClosed: function () {
        this.$emit('onLiveStreamClosed');
      },
      _onFullscreenChange: function (e) {
        this.$emit('onFullscreenChange', e);
      },
    });
    return b;
  },
  '8816e8759eb698f2ab784f0458989984',
  'f1bdfaebbca6c3d7e27bc30692178157',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '7f5341df6d7145a8db30455bb9aa6be6',
  '8105b977423b6de68ab733aba64a5495',
  '58dcf219dfa61e308ba13f6e1924573b',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'beec6201069596ecb83a09e5fc3eb415',
  'f2277e0b522a8d6029276ad9719038dc',
  '8a864b627c302d7d1c56bd928b515d1b',
);
