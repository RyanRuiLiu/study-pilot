EDU(
  '4b2a52ea911cc1cabd5156fdc88e88a2',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p, m, g, b, v, E) {
    var x = 1;
    var w = 3;
    var C = 'component-video-player';
    var y = n.$extends({
      name: 'ux-video-player',
      css: t,
      template: e,
      bem: '&',
      config: function () {
        var e = {
          host: location.protocol + '//' + location.host,
          useH5: !0,
          useNative: !1,
          isLocal: !1,
          mode: 'playback',
          preload: !0,
          showPauseAd: !1,
          innerSite: !0,
          autoStart: !1,
          volume: 0.8,
          mute: !1,
          showCdnSwitch: !0,
          notAllowFullScreen: !1,
          openAutoPlayNextTip: void 0,
          videoPlayerSwfRemoteUrl: null,
          videoPlayerUISwfRemotePath: null,
          x5Fullscreen: !1,
          waterMark: !1,
          waterMarkContent: '',
          videoData: null,
          isWap: h._$isMobileAll(),
          showTip: !1,
          tipMsg: '',
        };
        this._fetchVideoErrorCount = 0;
        e = this._mergeLocalConfig(e);
        i.extend(e, o.get(C) || {}, !0);
        i.extend(this.data, e);
        console.log('video-player_ui', this.data.forbidViewSegment);
        this.supr();
      },
      _mergeLocalConfig: function (e) {
        var t = this._readLocalConfig();
        if (void 0 !== t.volume) e.volume = t.volume;
        if (void 0 !== t.mute) e.mute = t.mute;
        if (void 0 !== t.cdnSwitch) e.cdnSwitch = t.cdnSwitch;
        if (void 0 !== t.defaultQuality) e.defaultQuality = t.defaultQuality;
        if (void 0 !== t.rate) e.rate = t.rate;
        if (!e.volume || e.mute) {
          e.volume = 0;
          e.mute = !0;
        }
        return e;
      },
      init: function () {
        this.supr();
        if ('playback' != this.data.mode) this.data.mode = 'playback';
        this._initLog();
        this.data.volume = this._formatNumberParam(this.data.volume);
        this._dealOldPros();
        this._fetchVideoData();
      },
      destroy: function () {
        this.__playerUI && this.__playerUI._$recycle();
        this._logReport && this._logReport._$recycle();
        this.supr();
      },
      _regitsterToggleMini: function () {
        document.addEventListener(
          'scroll',
          E._$throttle(
            function () {
              const e = r._$get('j-video-player');
              lastKnownScrollPosition = window.scrollY;
              console.log('lastKnownScrollPosition', lastKnownScrollPosition);
              if (lastKnownScrollPosition >= 900) {
                if (!r._$hasClassName(e, 'mini')) r._$addClassName(e, 'mini');
              } else if (r._$hasClassName(e, 'mini')) r._$delClassName(e, 'mini');
            }._$bind(this),
            !0,
            500,
          ),
        );
      },
      _fetchVideoData: function () {
        var e = location.href.indexOf('icourse163') > -1;
        if (this.data.videoData.videoId && this.data.videoData.signature) {
          var t = {
            onload: function (e) {
              var t, n;
              if (0 == e.code) {
                var i = e.result && e.result.srtCaptions && e.result.srtCaptions.length;
                if (100 == window.learnMode && !i && !this.data.forbidAiSubtitle) {
                  var o = null;
                  if (window.isCertifiedPreview)
                    o = '//www.icourse163.org/web/j/adminTermCertifiedBean.getVideoSubtitle.rpc';
                  else
                    o = '//www.icourse163.org/mm-course/web/j/mocCourseBean.getVideoSubtitle.rpc';
                  g._$request(o, {
                    data: {
                      lessonUnitId: this.data.videoData.unitId,
                      videoId: this.data.videoData.videoId,
                    },
                    method: 'post',
                    cookie: !0,
                    type: 'json',
                    onload: function (t) {
                      if (0 == t.code && t.result && t.result.srtUrl) {
                        var n = t.result.srtUrl.replace('http://', 'https://');
                        var i = { name: '字幕', url: n };
                        e.result.srtCaptions = [i];
                      }
                      this.data.videoData = a._$merge({}, e.result, this.data.videoData || {});
                      this._genPlayer();
                    }._$bind(this),
                    onError: function () {
                      this._genPlayer();
                    }._$bind(this),
                  });
                } else {
                  this.data.videoData = a._$merge({}, e.result, this.data.videoData || {});
                  this._genPlayer();
                }
              } else {
                this._onError(e.message || 'vod接口请求出错', e.code);
                if (e.code == -2) {
                  tips =
                    b.KEY_VIDEO_PAGE_EXPIRED +
                    '<a class="j-reload">' +
                    b.KEY_VIDEO_RELOAD +
                    ' [code:-1]';
                  this._showTip(tips);
                } else {
                  n = b.KEY_VIDEO_VIDEO_FAILD + ' [code:-2]';
                  this._showTip(n);
                }
              }
            }._$bind(this),
            onerror: function (e) {
              this._retryFetchVideo();
            }._$bind(this),
            method: 'get',
            type: 'json',
            sync: this.data.isWap,
            cookie: !0,
            data: {
              videoId: this.data.videoData.videoId,
              signature: this.data.videoData.signature,
              clientType: this.data.isWap ? w : x,
            },
          };
          g._$request(
            e
              ? '//vod.study.163.com/eds/api/v1/vod/video'
              : '//vod.study.163.com/eds/api/v1/vod/video',
            t,
          );
        } else this._genPlayer();
      },
      _retryFetchVideo: function () {
        if (this._fetchVideoErrorCount >= 3) {
          this._onError('get_video_net_work_error', -3);
          this._showTip(b.KEY_VIDEO_VIDEO_FAILD + ' [code:-3]');
        } else {
          this._fetchVideoErrorCount++;
          this._fetchVideoData();
        }
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
      _reload: function () {
        window.location.reload(!0);
      },
      _readLocalConfig: function () {
        if (this.data.cookieDomain) this._clearOldCookie();
        var e = c._$cookie('videoVolume');
        var t = c._$cookie('hasVolume');
        var n = c._$cookie('cdnName');
        var i = 1 * (c._$cookie('videoResolutionType') || 1);
        var o = 1 * (c._$cookie('videoRate') || 1);
        e = '' == e ? void 0 : Number(e);
        t = '' == t ? void 0 : t;
        n = '' == n ? void 0 : n;
        i = isNaN(i) ? void 0 : i;
        o = isNaN(o) ? void 0 : o;
        var a = void 0 !== t ? 'false' == t : !1;
        try {
          if (i < f.VIDEO_QUALITY.HD) {
            var r = this.data.videos && this.data.videos[0] && this.data.videos[0].secondaryEncrypt;
            if (r && this.data.videos && this.data.videos[1]) i = this.data.videos[1].quality;
          }
        } catch (s) {}
        return { volume: e, mute: a, cdnSwitch: n, defaultQuality: i, rate: o };
      },
      _clearOldCookie: function () {
        c._$cookie('videoVolume', { domain: location.host, expires: -1 });
        c._$cookie('hasVolume', { domain: location.host, expires: -1 });
        c._$cookie('videoResolutionType', { domain: location.host, expires: -1 });
        c._$cookie('videoRate', { domain: location.host, expires: -1 });
      },
      _shouldGenH5Player: function () {
        if (!this.data.videoData) {
          this._showTip(b.KEY_VIDEO_VIDEO_FAILD + ' [code:-4]');
          this._onError('no_videodata', -4);
          throw new Error('no_videodata');
        }
        if (!this.data.videoData.videos) {
          this._showTip(b.KEY_VIDEO_VIDEO_FAILD + ' [code:-5]');
          this._onError('no_videos', -5);
          throw new Error('no_videos');
        }
        var e = this.data.videoData.videos;
        if (!e.length) {
          this._showTip(b.KEY_VIDEO_VIDEO_FAILD + ' [code:-6]');
          this._onError('no_videos', -6);
          throw new Error('no_videos');
        }
        var t = {};
        var n;
        var i = _.supportVideo() && this.data.useH5;
        var o = _.supportHLS();
        var a = _.supportFlv();
        n = ['mp4', 'hls', 'flv'];
        for (var r = 0; r < n.length; r++)
          for (var s = 0; s < e.length; s++) {
            var c = e[s];
            if (e[s].format == n[r]) {
              t[n[r]] = t[n[r]] || [];
              t[n[r]].push(e[s]);
            }
            var d = /video\/(\d+)\/hls\/m3u8/;
            var l = c.videoUrl.match(d);
            if (l) c.videoUrl = c.videoUrl.replace(d, 'video/c/' + l[1] + '/hls/m3u8');
          }
        var u;
        if (t.mp4 && t.mp4.length) {
          this.data.videoData.videos = t.mp4;
          u = i;
        } else if (t.hls && t.hls.length) {
          this.data.videoData.videos = t.hls;
          u = i && o;
        } else if (t.flv && t.flv.length) {
          this.data.videoData.videos = t.flv;
          u = i && a && 'live' == this.data.mode;
        }
        if (!this.data.videoData.videos) {
          this._showTip(b.KEY_VIDEO_NOT_SUPPORT + ' [code:-7]');
          this._onError('no_player_can_use', 7);
          throw new Error('no_player_can_use');
        } else {
          this.data.videoData.videos.sort(function (e, t) {
            return t.quality - e.quality;
          });
          return u;
        }
      },
      _dealOldPros: function (e) {
        function t(e, t, n, i) {
          if (t) {
            e.videos = e.videos || [];
            e.videos.push({
              quality: n,
              videoUrl: t,
              format: i,
              encrypt: e.isEncrypt,
              e: e.isEncrypt,
              videoDecryptData: e.videoDecryptData,
              clientEncryptKeyVersion: e.clientEncryptKeyVersion,
              k: e.videoDecryptData,
              v: e.clientEncryptKeyVersion,
            });
          }
        }
        this.data.videoData = this.data.videoData || {};
        var n = this.data.videoData.flvCaption || this.data.videoData.mp4Caption;
        if (n) {
          this.data.videoData.srtCaptions = n;
          delete this.data.videoData.flvCaption;
          delete this.data.videoData.mp4Caption;
        }
        if (!this.data.videoData.videos) {
          t(this.data.videoData, this.data.videoData.flvSdUrl, f.VIDEO_QUALITY.SD, 'flv');
          t(this.data.videoData, this.data.videoData.flvHdUrl, f.VIDEO_QUALITY.HD, 'flv');
          t(this.data.videoData, this.data.videoData.flvShdUrl, f.VIDEO_QUALITY.SHD, 'flv');
          t(this.data.videoData, this.data.videoData.mp4SdUrl, f.VIDEO_QUALITY.SD, 'mp4');
          t(this.data.videoData, this.data.videoData.mp4HdUrl, f.VIDEO_QUALITY.HD, 'mp4');
          t(this.data.videoData, this.data.videoData.mp4ShdUrl, f.VIDEO_QUALITY.SHD, 'mp4');
          t(this.data.videoData, this.data.videoData.m3u8SdUrl, f.VIDEO_QUALITY.HD, 'hls');
          t(this.data.videoData, this.data.videoData.m3u8HdUrl, f.VIDEO_QUALITY.SD, 'hls');
          t(this.data.videoData, this.data.videoData.m3u8ShdUrl, f.VIDEO_QUALITY.SHD, 'hls');
        }
      },
      _genPlayer: function () {
        try {
          var e = this._shouldGenH5Player();
        } catch (t) {
          return;
        }
        var n = e ? 'h5' : 'flash';
        this.data.videoData.start = this._formatNumberParam(this.data.videoData.start);
        if (!this.__playerUI || !this.__curPlayerType || this.__curPlayerType != n) {
          this.__curPlayerType = n;
          setTimeout(
            function () {
              this.$emit('onPlayerType', n);
              this.$emit('get_video_data', this.data.videoData);
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
              data: this._changeUrlProtocolForFlash(this.data),
            });
          }
          this._initPlayerEvent();
          this._logReport.setPlayer(this.data, this.__playerUI);
        } else this.__playerUI._$load(this.data.videoData);
      },
      _changeUrlProtocolForFlash: function (e) {
        if (!this.data.showCdnSwitch) {
          if (e.videoData.videos)
            for (var t = 0; t < e.videoData.videos.length; t++)
              e.videoData.videos[t].videoUrl = e.videoData.videos[t].videoUrl.replace(
                /^(http:|https:)/,
                window.location.protocol,
              );
        } else if (e.videoData.videos)
          for (var t = 0; t < e.videoData.videos.length; t++)
            e.videoData.videos[t].videoUrl = e.videoData.videos[t].videoUrl.replace(
              /^https/,
              'http',
            );
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
        this.__playerUI._$addEvent('onSeek', this._onSeek._$bind(this));
        this.__playerUI._$addEvent('onSelectResolution', this._onSelectResolution._$bind(this));
        this.__playerUI._$addEvent('onAnchorPoint', this._onAnchorHandle._$bind(this));
        this.__playerUI._$addEvent('onLectureNoteChange', this._onLectureNoterHandle._$bind(this));
        this.__playerUI._$addEvent('onShowSegmentList', this._onShowSegmentHandle._$bind(this));
        this.__playerUI._$addEvent('onChangeCDN', this._onSelectCDN._$bind(this));
        this.__playerUI._$addEvent('onSelectCaption', this._onSelectCaption._$bind(this));
        this.__playerUI._$addEvent('onChangeVolume', this._onChangeVolume._$bind(this));
        this.__playerUI._$addEvent('onChangeRate', this._onChangeRate._$bind(this));
        this.__playerUI._$addEvent('onMute', this._onChangeMute._$bind(this));
        this.__playerUI._$addEvent('onLiveStreamClosed', this._onLiveStreamClosed._$bind(this));
        this.__playerUI._$addEvent('onFullscreenChange', this._onFullscreenChange._$bind(this));
        this.__playerUI._$addEvent('onTimeupdate', this._onTimeupdate._$bind(this));
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
          this._dealOldPros();
          this._fetchVideoData();
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
      getPosition: function (e) {
        this.__playerUI._$getPosition(e);
      },
      seek: function (e) {
        this.__playerUI._$seek(this._formatNumberParam(e));
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
            n.push('player type:' + (this._shouldGenH5Player() ? 'h5' : 'flash'));
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
        e.videoId = this.data.videoData.videoId;
        e.signature = this.data.videoData.signature;
        e.caption = this.data.videoData.srtCaptions;
        this.$emit('onStartLoad', e);
      },
      _onMeta: function (e) {
        this.$emit('onMeta', e);
      },
      _onPlayerError: function (e) {
        this.$emit('onError', e);
      },
      _onError: function (e, t) {
        this.$emit('onError', e);
        this._logReport.postErrToVod({ errorCode: t, errMsg: e, videoData: this.data.videoData });
      },
      _onPlayEndHandle: function () {
        this.$emit('onPlayEnd');
      },
      _onAnchorHandle: function (e) {
        this.$emit('onAnchorPoint', e);
      },
      _onLectureNoterHandle: function (e) {
        this.$emit('onLectureNoteChange', e);
      },
      _onShowSegmentHandle: function (e) {
        this.$emit('onShowSegmentList', e);
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
      _onChangeRate: function (e) {
        c._$cookie('videoRate', {
          path: '/',
          domain: this.data.cookieDomain || document.domain,
          value: e + '',
          expires: 365,
        });
        this.$emit('onChangeRate', { rate: e });
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
      _onSeek: function (e) {
        this.$emit('onSeek', e);
      },
      _onSelectResolution: function (e) {
        c._$cookie('videoResolutionType', {
          path: '/',
          domain: this.data.cookieDomain || document.domain,
          value: e.newData.quailty || e.newData.quality,
          expires: 365,
        });
        this.$emit('onSelectResolution', e);
      },
      _onSelectCaption: function (e) {
        this.$emit('onSelectCaption', e);
      },
      _onSelectCDN: function (e) {
        c._$cookie('cdnName', {
          path: '/',
          domain: this.data.cookieDomain || document.domain,
          value: e.newData.isp,
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
      _onTimeupdate: function (e) {
        this.$emit('onTimeupdate', e);
      },
    });
    return y;
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
  'fb061c769bfc74628a81f422f590544c',
  '8a864b627c302d7d1c56bd928b515d1b',
  'ff1c5e9840f717fea21797b5071706db',
  '06a1fe998ca2ede601d4740c114f6c3c',
  'b29334ef462711ace068eb3dce67d8f8',
);
