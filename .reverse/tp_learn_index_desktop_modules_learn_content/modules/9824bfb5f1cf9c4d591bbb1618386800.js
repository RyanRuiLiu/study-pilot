EDU(
  '9824bfb5f1cf9c4d591bbb1618386800',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h, p, m, b, g) {
    var v = i.$extends({
      name: 'um-live-live-pc',
      config: function () {
        o.extend(this, { __options: null });
        o.extend(this.data, {
          edsAuthorization: null,
          scope: null,
          liveContentId: null,
          liveId: null,
          userId: null,
          anonymousUserName: null,
          playBackVideoData: null,
          waterMarkContent: null,
          lang: e,
        });
        if (this.data.edsAuthorization) a.setAuth(this.data.edsAuthorization);
        if (this.data.scope) a.setScope(this.data.scope);
        if (!this.data.liveId) this.data.liveId = this.data.liveContentId;
        if (!this.data.liveContentId) this.data.liveContentId = this.data.liveId;
        this.__livePcSetting = a.get('live-pc');
        this.__chatSetting = this.__livePcSetting.chatroomConf || this.__livePcSetting;
        this.__options = t._$merge({}, this.data);
        this.__options = t._$merge(this.__options, this.__livePcSetting);
        this.supr();
      },
      init: function () {
        this.supr();
        this.__body = this.$refs.root;
        this.__dom = {
          player: this.$refs['j-liveplayer-wrap'],
          right: this.$refs['j-liveright'],
          chat: this.$refs['j-livechat-wrap'],
          notice: this.$refs['j-livenotice-wrap'],
        };
        if (this.__options.liveContentId || this.__options.liveId)
          if (this.__options.userId) {
            this._cacheIns = d.Live._$allocate({});
            this._cacheIns._$getLiveInitInfo({
              param: { liveId: this.__options.liveContentId },
              data: { userId: this.__options.userId },
              onload: this._initLive._$bind(this),
            });
          } else console.error('no userId');
        else console.error('no liveId');
      },
      _initLive: function (e) {
        if (e && (!e || e.liveId)) {
          this.__liveInitData = e;
          if (this.__liveInitData.anonymousUser) {
            if (!this.__options.anonymousUserName) this.__options.anonymousUserName = '匿名用户';
            this.data.bodyClass = 'um-live-live-pc-notlogin';
          }
          this._useH5 = 2 === this.__liveInitData.liveType ? !1 : !0;
          this._genLivePcPlayer();
          if (this.__options.playBackVideoData)
            this.data.playerClass = 'um-live-live-pc_player-noim';
          else {
            this.data.playerClass = '';
            this._genLivePcChat();
          }
          this.$update();
          m.live(
            this.__options.liveId,
            this.__options.userId,
            this.__liveInitData.anonymousUser ? this.__options.anonymousUserName : null,
            this.__livePcPlayer,
            this.__livePcChat,
          );
        } else this._showDeleted();
      },
      _geneInteractive: function () {
        this._liveInteractiveProcess = new _({
          data: {
            liveId: this.__options.liveContentId,
            userId: this.__options.userId,
            appType: this.__liveInitData.appType,
            isUserLogin: !this.__liveInitData.anonymousUser,
            anonymousConf: this.__livePcSetting.anonymousConf,
            interactiveConf: this.__livePcSetting.interactiveConf,
          },
        }).$inject(this.$refs['j-live-mircophone']);
        this._liveInteractiveProcess.$on(
          'ready',
          function (e) {
            this.__liveInteractivePlayer = this._geneLiveInteractivePlayer();
            this._interactiveList = this._geneInteractiveList(
              e.connectedList,
              this.__livePcChat.getChatroomMemberNum(),
              function () {
                this.__livePcChat.data.showChatroomNum = !1;
                this.__livePcChat.$update();
              }._$bind(this),
            );
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_INTERACTIVE_VOLUME_CHANGE,
          function (e) {
            var t = Object.getOwnPropertyNames(e),
              n,
              i,
              o;
            for (n = 0; n < t.length; n++) {
              i = e[t[n]];
              if ('self' == t[n]) o = this.__liveInitData.chatroomInfo.account;
              else o = t[n];
              if (this._interactiveList && this._interactiveList.$refs[o])
                this._interactiveList.$refs[o].change(255 * i.status);
            }
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED,
          function (e) {
            var t = [];
            this._connectListByPre = e.connectedList;
            if (this._interactiveList)
              if (!this._connectListByStu)
                this._interactiveList.updateInteractiveList(this._connectListByPre);
              else {
                t = this._formatConnectListByStu(
                  this._connectListByStu || [],
                  this._connectListByPre || [],
                );
                this._interactiveList.updateInteractiveList(t);
              }
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU,
          function (e) {
            var t = [];
            this._connectListByStu = e;
            if (this._interactiveList) {
              t = this._formatConnectListByStu(
                this._connectListByStu || [],
                this._connectListByPre || [],
              );
              this._interactiveList.updateInteractiveList(t);
            }
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS,
          function () {
            if (this.__livePcPlayer) this.__livePcPlayer.destroy();
            if (this.__liveInteractivePlayer) this.__liveInteractivePlayer.show();
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS,
          function (e) {
            this._genLivePcPlayer();
            if (this.__liveInteractivePlayer) this.__liveInteractivePlayer.hide();
            h._$delEvent(p.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU);
            this._connectListByStu = null;
            t._$forEach(
              this._connectListByPre,
              function (t, n) {
                if (t.accid === e.account) this._connectListByPre.splice(n, 1);
              }._$bind(this),
            );
            this._interactiveList.updateInteractiveList(this._connectListByPre);
          }._$bind(this),
        );
      },
      _formatConnectListByStu: function (e, n) {
        var i = [];
        t._$forEach(e, function (e, o) {
          t._$forEach(n, function (t, n) {
            if (e.account !== t.accid);
            else e.microType = t.microType;
          });
          i.push({
            accid: e.account,
            nickName: e.nick,
            avatar: e.avatar,
            microType: e.microType || 0,
          });
        });
        i.sort(function (e, t) {
          return t.microType - e.microType;
        });
        return i;
      },
      _genLivePcPlayer: function () {
        if (location.search.match('testflash=true')) this._useH5 = !1;
        else if (location.search.match('testH5=true')) this._useH5 = !0;
        this.__livePcPlayer = new s({
          data: {
            useH5: this._useH5,
            liveContentId: this.__options.liveContentId,
            playBackVideoData: this.__options.playBackVideoData,
            waterMark: this.__livePcSetting.waterMark,
            waterMarkContent: this.__options.waterMarkContent,
            notAllowFullScreen: this.__livePcSetting.notAllowFullScreen,
          },
        }).$inject(this.__dom.player);
        this.__livePcPlayer.$on('updateLiveInfo', this._onUpdateLiveInfo._$bind(this));
        this.__livePcPlayer.$on('PlayBackPlay', this.onPlayBackPlay._$bind(this));
        this.__livePcPlayer.$on('PlayBackPauseClick', this.onPlayBackPauseClick._$bind(this));
        this.__livePcPlayer.$on('PlayBackSeek', this.onPlayBackSeek._$bind(this));
        this.__livePcPlayer.$on('PlayBackEnd', this.onPlayBackEnd._$bind(this));
      },
      _genLivePcNotice: function () {
        if (this.__livePcNotice) this.__livePcNotice.destroy();
        this.__livePcNotice = new r({
          data: {
            content: '',
            isNew: !1,
            isTeacher: !1,
            liveId: this.__options.liveContentId,
            account: this.__liveInitData.chatroomInfo.account,
          },
        }).$inject(this.__dom.notice);
        this.__livePcChat.$on(
          'chatroomNotice',
          function (e) {
            this.__livePcNotice.data.content = this.__livePcChat.data.notice.content;
            this.__livePcNotice.data.isNew = this.__livePcChat.data.notice.isNew;
            this.__livePcNotice.data.isTeacher = this.__livePcChat.data.notice.isTeacher;
            if (this.__livePcNotice.noticeView)
              this.__livePcNotice.noticeView.data.isTeacher =
                this.__livePcChat.data.notice.isTeacher;
            this.__livePcNotice.$update();
          }._$bind(this),
        );
      },
      _geneLiveInteractivePlayer: function (e) {
        return new u({
          data: {
            liveId: this.__options.liveContentId,
            account: this.__liveInitData.chatroomInfo.account,
            lectorAccount: this.__liveInitData.chatroomInfo.lectorAccount,
            supportBrowserWindShare: this.__liveInitData.settingInfo.supportBrowserWindShare,
            screenSharingChromeExtensionId: a.get('live-pc')['screenSharingChromeExtensionId'],
            waterMark: this.__livePcSetting.waterMark,
            waterMarkContent: this.__options.waterMarkContent,
          },
        }).$inject(this.__dom.player);
      },
      _genLivePcChat: function () {
        if (this.__livePcChat) this.__livePcChat.destroy();
        var e = this.__liveInitData.chatroomInfo || {};
        var t = this.__liveInitData.settingInfo || {};
        this.__livePcChat = new c({
          data: {
            liveId: this.__options.liveId,
            appKey: e.appKey,
            account: e.account,
            chatroomId: e.imRoomId,
            token: e.token,
            lectorAccount: e.lectorAccount,
            addr: e.addr,
            showChatroomNum: this.__chatSetting.showChatroomNum,
            isSendMsgCreate: this.__chatSetting.isSendMsgCreate,
            isUserLogin: !this.__liveInitData.anonymousUser,
            chatroomNick: this.__options.anonymousUserName,
            anonymousConf: this.__livePcSetting.anonymousConf,
            isMemberNumFromRequest: this.__chatSetting.isMemberNumFromRequest,
            openMuteOpt: this.__chatSetting.openMuteOpt,
            openRoomMute: this.__chatSetting.openRoomMute,
            openTeammanagerOpt: this.__chatSetting.openTeammanagerOpt,
            openNoticeOpt: t.supportAnnouncement,
          },
        }).$inject(this.__dom.chat);
        if (this.__livePcChat.isBrowserSupport) {
          this.__livePcChat.$on(
            'onlineMemberNumChange',
            function (e) {
              if (this._interactiveList) this._interactiveList.updateInteractiveNum(e);
            }._$bind(this),
          );
          if (e.addr && e.addr.length > 0) {
            if (t.supportAnnouncement) {
              this._genLivePcNotice();
              this.data.rightClass = 'open_notice';
            }
            if (t.supportWebRequestMicro) this._geneInteractive();
            if (t.supportAnswer && !this.__liveInitData.anonymousUser) this._genAnswerSheet();
          }
        }
      },
      _onUpdateLiveInfo: function (e) {
        if (e) {
          if (this.liveInfoUpdate) {
            e.onlineMemberNum = this.__livePcChat ? this.__livePcChat.data.onlineMemberNum : 0;
            this.liveInfoUpdate(e);
          }
        } else this._showDeleted();
      },
      _geneInteractiveList: function (e, n, i) {
        var o = !1,
          a;
        if (e && e.length > 0) o = !0;
        a = new f({ data: { isShowOverview: o, connectedList: e, chatroomNum: n } }).$inject(
          this.$refs['j-live-interactiveList'],
        );
        a.$watch('connectedList.length', function (e) {
          if (e > 0) this.data.isShowOverview = !0;
          else this.data.isShowOverview = !1;
          this.$update();
        });
        if (i && t._$isFunction(i)) i.call(this);
        return a;
      },
      _genAnswerSheet: function () {
        var e = this.__dom.player;
        this._userAnswerSheetUI = new l({
          data: {
            lectorAccount: this.__liveInitData.chatroomInfo.lectorAccount,
            liveId: this.__options.liveContentId,
            account: this.__liveInitData.chatroomInfo.account,
            mountDom: e,
          },
        }).$inject(e);
      },
      liveInfoUpdate: function (e) {
        this.$emit('liveInfoUpdate', e);
      },
      onPlayBackPlay: function (e) {
        this.$emit('playBackPlay', e);
      },
      onPlayBackPauseClick: function (e) {
        this.$emit('playBackPauseClick', e);
      },
      onPlayBackEnd: function (e) {
        this.$emit('playBackEnd', e);
      },
      onPlayBackSeek: function (e) {
        this.$emit('playBackSeek', e);
      },
      _showDeleted: function (e) {
        this.__livePcNotice && this.__livePcNotice.destroy();
        this.__liveInteractivePlayer && this.__liveInteractivePlayer.destroy();
        this._interactiveList && this._interactiveList.destroy();
        this._liveInteractiveProcess && this._liveInteractiveProcess.destroy();
        this._userAnswerSheetUI && this._userAnswerSheetUI.destroy();
        this.__livePcChat && this.__livePcChat.destroy();
        this.__livePcPlayer && this.__livePcPlayer.destroy();
        this.$refs['j-deleted'].style.display = 'block';
      },
      destroy: function () {
        this.supr();
        if (this._cacheIns) this._cacheIns._$recycle();
        this.__livePcNotice && this.__livePcNotice.destroy();
        this.__liveInteractivePlayer && this.__liveInteractivePlayer.destroy();
        this._interactiveList && this._interactiveList.destroy();
        this._liveInteractiveProcess && this._liveInteractiveProcess.destroy();
        this._userAnswerSheetUI && this._userAnswerSheetUI.destroy();
        this.__livePcChat && this.__livePcChat.destroy();
        this.__livePcPlayer && this.__livePcPlayer.destroy();
      },
    });
    return v;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  'e71dc3be9cd207b262db571dc93abf68',
  'cf80be04d65f6ed45ce71bbb99957213',
  '83edf396d43c6caaaa5d83ffac3e1edc',
  '9dc508f2eef931918f19fafe68ba902b',
  '864d370e2f6d40783480b6bc6ebae0d7',
  '2cd31b69273f8eaef051521582664008',
  'b49f06ed95dcc6350bf21af46520e05f',
  'dac7471872ff9a642deb82db1438960a',
  '9a447a3b597e896dca4aac83e1c86427',
  'bcf071761289ae1019dcc5e22b391493',
  '0e44ded955eba38916ea8a8f0bb1ba19',
);
