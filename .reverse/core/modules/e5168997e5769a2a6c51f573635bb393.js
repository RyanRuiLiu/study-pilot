EDU(
  'e5168997e5769a2a6c51f573635bb393',
  function (e, t, n, i, o) {
    var a = window;
    Component = e.$extends({
      name: 'mooc-video-player',
      data: {},
      config: function () {
        this.supr();
      },
      computed: {},
      init: function () {
        this.__videoInfo = this.data.videoInfo;
        this.__parentNode = this.data.parent;
        this._fetchToken();
      },
      _fetchToken: function () {
        var e = +this.data.videoType;
        var t = window.serverTimeDiff || 0;
        var n = new Date().getTime() - t;
        switch (e) {
          case o.VIDEO_TYPE.WITH_AUTO_UNIT:
            i._$getLiveVideoResourceTokenWithAuthForUnit(
              { unitId: this.data.unitId },
              this._getResourceTokenCb._$bind(this),
            );
            break;
          case o.VIDEO_TYPE.WITH_AUTH:
            i._$getResourceVideoTokenWithAuth(
              { videoId: this.data.videoId, termId: this.data.termId },
              this._getResourceTokenCb._$bind(this),
            );
            break;
          case o.VIDEO_TYPE.BACKEND_PERSONAL:
            i._$getResourceVideoTokenWithPersonal(
              { videoId: this.data.videoId },
              this._getResourceTokenCb._$bind(this),
            );
            break;
          default:
            i._$getResourceToken(
              {
                bizId: this.data.bizId,
                bizType: this.data.bizType,
                contentType: this.data.contentType,
                sign: window.tokenEncrypt(
                  this.data.bizId,
                  this.data.bizType,
                  this.data.contentType,
                  n,
                ),
                timestamp: n,
              },
              this._getResourceTokenCb._$bind(this),
            );
            a.bizId = this.data.bizId;
        }
      },
      _errorInvokeModal: function (e) {
        console.log(e);
        if (window.reactComponentLoadBootstrap) {
          String.prototype.replace = window.moocTempReplace;
          String.prototype.match = window.moocTempMatch || window.moocTempReplace1;
          var t = 'CommonRegularComponent';
          var n = document.createElement('div');
          document.body.append(n);
          window.reactComponentLoadBootstrap.setFtlData({
            renderType: 'antd_modal',
            error: {
              content: e,
              onOk: function () {
                document.body.removeChild(n);
              }._$bind(this),
            },
          });
          if (window.renderReactComponent && window.renderReactComponent[t]) {
            var i = window.renderReactComponent[t];
            i.render(i.component, i.initialState, n);
          } else
            window.reactComponentLoadBootstrap.init(
              { name: t, container: n },
              {},
              {
                loadSuccessCb: function () {
                  this._errorInvokeModal(e);
                }._$bind(this),
              },
            );
        }
      },
      _getResourceTokenCb: function (e) {
        if (0 == e.code) {
          var t = e.result;
          var n = t.signature || (t.videoSignDto && t.videoSignDto.signature);
          var i = t.videoId || (t.videoSignDto && t.videoSignDto.videoId);
          if (0 == t.videoSignDto.status) {
            this.__videoInfo.start =
              this.__videoInfo && this.__videoInfo.start
                ? this.__videoInfo.start
                : e.learnVideoTime;
            if (n) {
              this.__videoInfo.signature = n;
              this.__videoInfo.videoId = i;
              this.data._onGetTokenSuccess && this.data._onGetTokenSuccess(this.__videoInfo);
              this._genPlayer();
              this._initEvents();
            }
            this.$emit('onGetResourceToken', t);
          } else {
            this.data._onError && this.data._onError(e);
            if (this.data.showErrorMessage) {
              var o = '视频正在转码中';
              if (e.message) o = e.message;
              this._errorInvokeModal(o);
            }
          }
        } else {
          this.$emit('onGetResourceTokenError', e);
          this.data._onError && this.data._onError(e);
          if (this.data.showErrorMessage) {
            var o = '视频正在转码中';
            if (e.message) o = e.message;
            this._errorInvokeModal(o);
          }
        }
      },
      _initEvents: function () {
        this.__player.$on(
          'onAnchorPoint',
          function (e) {
            this.$emit('onAnchorPoint', e);
          }._$bind(this),
        );
        this.__player.$on(
          'onLectureNoteChange',
          function (e) {
            this.$emit('onLectureNoteChange', e);
          }._$bind(this),
        );
        this.__player.$on(
          'onShowSegmentList',
          function (e) {
            this.$emit('onShowSegmentList', e);
          }._$bind(this),
        );
        this.__player.$on(
          'onPlayEnd',
          function () {
            this.$emit('onPlayEnd');
          }._$bind(this),
        );
        this.__player.$on(
          'onSeek',
          function (e) {
            this.$emit('onSeek', e);
          }._$bind(this),
        );
        this.__player.$on(
          'onPlay',
          function () {
            this._$getCurVideoTime(
              function (e) {
                this.$emit('onPlay', e);
              }._$bind(this),
            );
          }._$bind(this),
        );
        this.__player.$on(
          'onPauseClick',
          function () {
            this.$emit('onPauseClick');
          }._$bind(this),
        );
        this.__player.$on(
          'onPlayerType',
          function (e) {
            this.$emit('onPlayerType', e);
          }._$bind(this),
        );
        this.__player.$on(
          'get_video_data',
          function (e) {
            this.$emit('get_video_data', e);
          }._$bind(this),
        );
        this.__player.$on(
          'onFullscreenChange',
          function (e) {
            this.$emit('onFullscreenChange', e);
          }._$bind(this),
        );
        this.__player.$on(
          'onMeta',
          function (e) {
            this.$emit('onMeta', e);
          }._$bind(this),
        );
      },
      _genPlayer: function () {
        var e = !1;
        if (this.__videoInfo.signature) {
          var t = {
            start: this.__videoInfo.start,
            videoImgUrl: this.__videoInfo.image,
            isEncrypt: this.__isEncrypted,
            clientEncryptKeyVersion: this.__videoInfo.clientEncryptKeyVersion,
            flvCaption: this.__videoInfo.html5caption,
            cluPointData: this.__videoInfo.cluPointData,
            segmentListData: this.__videoInfo.segmentListData,
            videoId: this.__videoInfo.videoId,
            signature: this.__videoInfo.signature,
            videoDecryptData: this.__videoInfo.videoDecryptData,
            unitId: this.__videoInfo.unitId,
          };
          try {
            e = window.termDto && +window.termDto.price > 0;
          } catch (i) {}
          this.__player = new n({
            data: {
              autoStart: !!this.__videoInfo.autoStart,
              useH5: this.__useHtm5Player,
              showCdnSwitch: !1,
              waterMark: !0,
              waterMarkContent: window.webUser ? window.webUser.id : '',
              videoPlayerSwfRemoteUrl: window.swfUrlMap.CloudPlayer,
              videoPlayerUISwfRemotePath: window.swfUrlMap.cloudPlayerUI,
              beforePlay: !1,
              openFlashHls: !0,
              videoData: t,
              notNeedFullscreen: this.data.notNeedFullscreen || !1,
              forbidViewSegment: this.data.forbidViewSegment,
              useFullscreenSegmentComponent: this.data.useFullscreenSegmentComponent,
              useFullscreenAIAssistant: this.data.useFullscreenAIAssistant,
              AIAssistantParam: this.data.AIAssistantParam,
              forbidAiSubtitle: this.data.forbidAiSubtitle,
            },
          }).$inject(this.$refs.moocVideoPlayer);
        }
      },
      _$getResolutionType: function () {
        return this.__resolutionType;
      },
      _$stopVideo: function () {
        this.__player.stop();
      },
      _$pauseVideo: function () {
        console.log('暂停促发！！');
        this.__player.pause();
      },
      _$resumeVideo: function () {
        this.__player.resume();
      },
      _$getCurVideoTime: function (e) {
        return this.__player && this.__player.__playerUI && this.__player.getPosition(e);
      },
      _$seekAnchorTime: function (e) {
        this.__player.seek(e);
      },
      _$getState: function (e) {
        this.__player.getState(e);
      },
      __destroy: function () {
        this.destroy();
        this.__player && this.__player.destroy();
      },
    });
    return Component;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '4b2a52ea911cc1cabd5156fdc88e88a2',
  'b29e66487713e38d93cc72b43cf8fc09',
  'f2ddbbb127b496a19d690f05e2c0f5fe',
);
