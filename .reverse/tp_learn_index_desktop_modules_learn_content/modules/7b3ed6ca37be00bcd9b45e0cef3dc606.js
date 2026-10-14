EDU(
  '7b3ed6ca37be00bcd9b45e0cef3dc606',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f) {
    var h = t.$extends({
      config: function () {
        n.extend(this, {});
        n.extend(this.data, {
          liveId: 0,
          userId: 0,
          appType: 0,
          isUserLogin: !0,
          anonymousConf: null,
          interactiveConf: null,
        });
        this._interactiveCacheIns = c.Interactive._$allocate();
        this._microType = r.MICRO_TYPE_DICT.AUDIO;
        this.data.microIconObj = this.getMicroIconObj();
        this.hideMicroIcon();
        this.data.btnObj = this.getBtnObj('DISABLE');
        this._toastDuration = 2e3;
        this._toastSingle = !0;
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS,
          this._onUserOnlineMicrophoneSuc._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_FAILURE,
          this._onUserOnlineMicrophoneFail._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS,
          this._onUserOfflineMicrophoneSuc._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_REJECT_REQUEST_MICROPHONE,
          this._onUserMicrophoneReject._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_DETECT_TIME_OUT_REQUEST_MICROPHONE,
          this._onRequestMicroTimeout._$bind(this),
        );
        this.supr();
      },
      init: function () {
        this._getLiveInteractiveInfo();
        e._$addEvent(window, 'beforeunload', this.onBeforeunload._$bind(this));
        e._$addEvent(window, 'unload', this.onUnload._$bind(this));
        this.supr();
      },
      onBeforeunload: function (e) {
        var t;
        if ('unfold' !== this.data.btnObj.status) {
          t = 'xx';
          (e || window.event).returnValue = t;
          return t;
        }
      },
      onUnload: function () {
        if ('cancel' === this.data.btnObj.status) this._cancelLiveInteractive();
        else if ('end' === this.data.btnObj.status) this._endLiveInteractive();
      },
      mouseleave: function () {
        if ('fold' === this.data.btnObj.status) this.resetAppearance();
      },
      resetAppearance: function () {
        this.hideMicroIcon();
        this.data.btnObj = this.getBtnObj('UNFOLD');
        this.$update();
      },
      getMicroIconObj: function () {
        return l.microIconObjDict[this._microType];
      },
      showMicroIcon: function () {
        this.data.isShowMicroIcon = !0;
        this.$update();
      },
      hideMicroIcon: function () {
        this.data.isShowMicroIcon = !1;
        this.$update();
      },
      getBtnObj: function (e) {
        var t = 0;
        this._btnStatusDict = l.btnStatusDict;
        this._btnObjDict = l.btnObjDict;
        t = this._btnStatusDict[e] || this._btnStatusDict.UNFOLD;
        return this._btnObjDict[t];
      },
      clickUnfoldBtn: function () {
        if (this.data.isUserLogin)
          d.checkSupportInteractive(
            function (e) {
              _.log('互动兼容性检查:' + e);
              if (!this._accid || this._accid !== this._lectorAccid)
                if (e) {
                  this.data.btnObj = this.getBtnObj('FOLD');
                  this.$update();
                } else a.alert(l.tipsTexts.NOT_SUPPORTED);
              else o.warning(l.tipsTexts.PRESENTER_REQUEST, this._toastDuration, this._toastSingle);
            }._$bind(this),
          );
        else {
          var e =
            (this.data.anonymousConf && this.data.anonymousConf.loginTipText) ||
            '登录后才能参与直播间互动';
          var t = (this.data.anonymousConf && this.data.anonymousConf.loginBtnText) || '去登录';
          a.confirm('', e, t, '取消').$on('ok', function () {
            u._$dispatchEvent(f.EVT_CLICK_LOGIN, {});
          });
        }
      },
      clickFoldBtn: function () {
        this.resetAppearance();
        this.$update();
      },
      clickDisableBtn: function () {},
      clickCancelBtn: function () {
        this._cancelLiveInteractive();
      },
      clickEndBtn: function () {
        var e = l.tipsTexts[this._microType].ASK_REQUEST_END;
        a.confirm(e, '', '结束', '取消').$on(
          'ok',
          function () {
            this._endLiveInteractive();
          }._$bind(this),
        );
      },
      _endLiveInteractive: function () {
        this._contentObj.eventType = r.EVENT_TYPE_DICT.USER_OFFLINE_MICROPHONE;
        this._sendCustomSysMsg(this._contentObj);
      },
      clickVideoBtn: function () {
        d.checkMicrophone(
          function (e) {
            if (e)
              d.checkCamera(
                function (e) {
                  if (e) this._handleRequestMicro(r.MICRO_TYPE_DICT.VIDEO);
                  else {
                    o.warning(l.tipsTexts.NO_CAMERA, this._toastDuration, this._toastSingle);
                    this.resetAppearance();
                  }
                }._$bind(this),
              );
            else {
              o.warning(l.tipsTexts.NO_MICROPHONE, this._toastDuration, this._toastSingle);
              this.resetAppearance();
            }
          }._$bind(this),
        );
      },
      clickAudioBtn: function () {
        d.checkMicrophone(
          function (e) {
            if (e) this._handleRequestMicro(r.MICRO_TYPE_DICT.AUDIO);
            else {
              o.warning(l.tipsTexts.NO_MICROPHONE, this._toastDuration, this._toastSingle);
              this.resetAppearance();
              this.$update();
            }
          }._$bind(this),
        );
      },
      _handleRequestMicro: function (e) {
        if (this._checkFrequency()) {
          this._requestTime = +new Date();
          this._microType = e;
          this._requestLiveInteractive(this._microType, this._requestTime);
          o.success(
            l.tipsTexts[this._microType].REQUESTING,
            this._toastDuration,
            this._toastSingle,
          );
          this.data.btnObj = this.getBtnObj('DISABLE');
          this.data.microIconObj = this.getMicroIconObj();
          this.showMicroIcon();
          this.setTimeout();
          this.$update();
        } else o.warning(l.tipsTexts.FREQUENCY_LIMIT, this._toastDuration, this._toastSingle);
      },
      _onUserOnlineMicrophoneSuc: function () {
        this.clearTimeout();
        this.data.btnObj = this.getBtnObj('END');
        this.$update();
      },
      _onUserOfflineMicrophoneSuc: function () {
        o.success(l.tipsTexts[this._microType].REQUEST_END, this._toastDuration, this._toastSingle);
        this.resetAppearance();
        this.$update();
      },
      _onUserOnlineMicrophoneFail: function () {
        this.clearTimeout();
        o.warning(l.tipsTexts.EXCEPTION, this._toastDuration, this._toastSingle);
        this.resetAppearance();
        this._contentObj.eventType = r.EVENT_TYPE_DICT.USER_ONLINE_MICROPHONE_FAILURE;
        this._sendCustomSysMsg(this._contentObj);
      },
      _onUserMicrophoneReject: function () {
        this.clearTimeout();
        o.warning(l.tipsTexts.REJECT, this._toastDuration, this._toastSingle);
        this.resetAppearance();
      },
      _onRequestMicroTimeout: function () {
        this._cancelLiveInteractive(
          function () {
            this._onCancelLiveInteractive();
            o.warning(l.tipsTexts.REJECT, this._toastDuration, this._toastSingle);
          }._$bind(this),
        );
      },
      setTimeout: function () {
        this._st = window.setTimeout(
          function () {
            this._cancelLiveInteractive();
          }._$bind(this),
          l.TIMEOUT,
        );
      },
      clearTimeout: function () {
        window.clearTimeout(this._st);
      },
      _checkFrequency: function () {
        var e = +new Date();
        if (this._requestTime && e - this._requestTime < l.REQUEST_FREQUENCY) {
          o.warning(l.tipsTexts.FREQUENCY_LIMIT, this._toastDuration, this._toastSingle);
          return !1;
        }
        return !0;
      },
      _getLiveInteractiveInfo: function () {
        this._interactiveCacheIns.getLiveInteractiveInfo({
          data: { liveId: this.data.liveId, userId: this.data.userId, appType: this.data.appType },
          onload: this._onGetLiveInteractiveInfo._$bind(this),
        });
      },
      _onGetLiveInteractiveInfo: function (e) {
        var t = 0;
        this._connectedSayerList = e.connectedSayerList;
        this._accid = e.liveYunxinAccount.accid;
        this._token = e.liveYunxinAccount.token;
        this._lectorAccid = e.chatroomInfo.lectorAccount;
        this._imRoomId = e.chatroomInfo.imRoomId || e.chatroomInfo._imRoomId;
        this._appKey = e.chatroomInfo.appKey;
        this._packagedNim = i.getInstance({
          debug: !0,
          appKey: this._appKey,
          account: this._accid,
          token: this._token,
          oncustomsysmsg: this._oncustomsysmsg._$bind(this),
          onmyinfo: this._onmyinfo._$bind(this),
        });
        this.nimIns = this._packagedNim.getNim();
        this._contentObj = {
          eventType: -1,
          code: 0,
          fromAccid: this._accid,
          toAccid: this._lectorAccid,
          interactionRoomId: this.data.liveId,
          liveId: this.data.liveId,
          imroomId: this._imroomId,
          msgBody: { microType: this._microType || r.MICRO_TYPE_DICT.AUDIO },
        };
        for (; t < this._connectedSayerList.length; t++)
          if (this._connectedSayerList[t].accid === this._accid) {
            this._microType = this._contentObj.microType = this._connectedSayerList[t].microType;
            s._$dispatchEvent(r.EVENT_NAME_DICT.EVT_INTERACTIVE_JOIN_CHANNEL, this._contentObj);
          }
        this.resetAppearance();
        this.$emit('ready', {
          connectedList: this._connectedSayerList,
          nim: this.nimIns,
          lectorAccount: this._lectorAccid,
        });
      },
      _oncustomsysmsg: function (e) {
        var t = e.content;
        if ('string' == typeof t) t = JSON.parse(t);
        if (t.liveId == this.data.liveId) s.dispatchByMsg(e);
      },
      _onmyinfo: function (e) {
        this._yxNickName = e.nick;
      },
      _requestLiveInteractive: function (e, t) {
        _.log('请求能否互动', {
          microType: e,
          liveId: this.data.liveId,
          userId: this.data.userId,
          appType: this.data.appType,
          accid: this._accid,
          yxNickName: this._yxNickName,
        });
        this._interactiveCacheIns.requestLiveInteractive({
          headers: { 'Content-Type': 'application/json' },
          data: {
            liveId: this.data.liveId,
            userId: this.data.userId,
            appType: this.data.appType,
            accid: this._accid,
            yxNickName: this._yxNickName,
            microType: e,
            requestId: t,
          },
          onload: this._onRequestLiveInteractive._$bind(this),
          onerror: function () {
            _.log('请求能否互动失败');
            o.warning(l.tipsTexts.EXCEPTION, this._toastDuration, this._toastSingle);
            this.resetAppearance();
          }._$bind(this),
        });
      },
      _cancelLiveInteractive: function (e) {
        var t = {
          data: {
            liveId: this.data.liveId,
            appType: this.data.appType,
            userId: this.data.userId,
            accid: this._accid,
          },
        };
        t.onload =
          'function' == typeof e ? e._$bind(this) : this._onCancelLiveInteractive._$bind(this);
        this._interactiveCacheIns.cancelLiveInteractive(t);
      },
      _onRequestLiveInteractive: function (e) {
        _.log('请求能否互动回调成功', { code: e });
        if (e == l.serverCodeDict.SUC || e == l.serverCodeDict.REPEATED) {
          this.data.btnObj = this.getBtnObj('CANCEL');
          this.$update();
        } else if (e == l.serverCodeDict.AUDIO_ALREADY || e == l.serverCodeDict.VIDEO_ALREADY) {
          if (e == l.serverCodeDict.AUDIO_ALREADY) this._microType = r.MICRO_TYPE_DICT.AUDIO;
          else this._microType = r.MICRO_TYPE_DICT.VIDEO;
          this.data.microIconObj = this.getMicroIconObj();
          this.data.btnObj = this.getBtnObj('END');
          this.$update();
        } else {
          this.resetAppearance();
          if (l.serverCodeTipsDict[e])
            o.warning(l.serverCodeTipsDict[e], this._toastDuration, this._toastSingle);
        }
      },
      _onCancelLiveInteractive: function () {
        this.resetAppearance();
      },
      _sendCustomSysMsg: function (e) {
        if ('string' != typeof e) e = JSON.stringify(e);
        this.nimIns.sendCustomSysMsg({
          scene: 'p2p',
          to: this._lectorAccid,
          content: e,
          sendToOnlineUsersOnly: !0,
          done: this._onSendCustomSysMsg._$bind(this),
        });
      },
      _onSendCustomSysMsg: function (e, t) {
        if (e) this.nimIns.sendCustomSysMsg(t);
        else s.dispatchByMsg(t);
      },
      destroy: function () {
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS,
          this._onUserOnlineMicrophoneSuc._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_FAILURE,
          this._onUserOnlineMicrophoneFail._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS,
          this._onUserOfflineMicrophoneSuc._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_REJECT_REQUEST_MICROPHONE,
          this._onUserMicrophoneReject._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_DETECT_TIME_OUT_REQUEST_MICROPHONE,
          this._onRequestMicroTimeout._$bind(this),
        );
        e._$delEvent(window, 'beforeunload', this.onBeforeunload);
        this.supr();
      },
    });
    return h;
  },
  '3f8f347c9171583dc1295dc796e8a1bf',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '24fc459b087ee4ceba5d8a9ad4a32482',
  '268c3257e756ea058b7f5849ce71559d',
  'abe9a6b99742882e8efaadd2518b0cb2',
  '9a447a3b597e896dca4aac83e1c86427',
  'bcf071761289ae1019dcc5e22b391493',
  'ca643d30a76212dcbe62390e2a0e3054',
  'f657f10b7466ef69e5081338d923dc35',
  '61de5e0e5129c3d919aa4e0086972fa5',
  '0b37bd19208cbac1c1ef61490b546431',
  '665b4e36772193beffe50de855029c13',
  '97edda62b43e7a7a70e398500c91441e',
);
