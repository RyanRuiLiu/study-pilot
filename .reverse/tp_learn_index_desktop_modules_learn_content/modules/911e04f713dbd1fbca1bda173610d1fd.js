EDU(
  '911e04f713dbd1fbca1bda173610d1fd',
  function (e, t, n, i, o, a, s, r, c, d, l, _) {
    var u = 100;
    var f = t.$extends({
      config: function () {
        n.extend(this, { accountList: [] });
        n.extend(this.data, {
          liveId: null,
          account: '',
          lectorAccount: '',
          screenLocations: null,
          isShow: !1,
          screenSharingChromeExtensionId: '',
          supportBrowserWindShare: 0,
          isScreenSharingChromeExtensionInstalled: !1,
          amISharingScreen: !1,
          waterMark: !1,
          waterMarkContent: '',
        });
        this.supr();
        a._$addEvent(
          s.EVENT_NAME_DICT.EVT_INTERACTIVE_LEAVE_CHANNEL,
          this._cbLeaveChannel._$bind(this),
        );
        a._$addEvent(
          s.EVENT_NAME_DICT.EVT_INTERACTIVE_JOIN_CHANNEL,
          this._cbJoinChannel._$bind(this),
        );
        a._$addEvent(
          s.EVENT_NAME_DICT.EVT_PRESENTER_UPDATE_MAIN_SCREEN,
          this._onScreenLocationsChange._$bind(this),
        );
        if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage)
          chrome.runtime.sendMessage(
            this.data.screenSharingChromeExtensionId,
            'detect',
            null,
            function (e) {
              if ('installed' === e) {
                this.data.isScreenSharingChromeExtensionInstalled = !0;
                this.$update();
              }
            }._$bind(this),
          );
      },
      init: function () {
        this.supr();
        d.checkSupportInteractive(
          function (e) {
            if (e) {
              l.log('互动兼容性检查：' + e);
              this.Nim = r.getInstance().getNim();
              this.netcall = i.getInstance({
                nim: this.Nim,
                debug: !1,
                chromeId: this.data.screenSharingChromeExtensionId,
              });
              this._watchResize(this.$refs.root, this._resize._$bind(this));
              this._interactiveCache = o.Interactive._$allocate();
            }
          }._$bind(this),
        );
      },
      startScreenSharing: function () {
        return this.netcall
          .startDevice({ type: WebRTC.DEVICE_TYPE_DESKTOP_CHROME_SCREEN })
          .then(
            function (e) {
              console.log('screen sharing success', e);
              var t = this._getScreenByCurrentAccount();
              this.netcall.startLocalStream(t.node);
              t.node.getElementsByTagName('video')[0].srcObject.getVideoTracks()[0].onended =
                function () {
                  this.stopScreenSharing();
                }._$bind(this);
              this.data.amISharingScreen = !0;
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console.log('screen sharing cancelled or error', e);
              return this.stopScreenSharing();
            }._$bind(this),
          )
          .then(
            function (e) {
              this.$update();
            }._$bind(this),
          );
      },
      stopScreenSharing: function () {
        return new Promise(
          function (e) {
            this.netcall.stopLocalStream();
            this.data.amISharingScreen = !1;
            this.$update();
            e();
          }._$bind(this),
        )
          .then(
            function () {
              return this.netcall.startDevice({ type: WebRTC.DEVICE_TYPE_VIDEO });
            }._$bind(this),
          )
          .then(
            function (e) {
              var t = this._getScreenByCurrentAccount();
              this.netcall.startLocalStream(t.node);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              c.warning('启动摄像头失败');
              l.log('启动摄像头失败', e);
              console.error('启动摄像头失败:' + e);
            }._$bind(this),
          );
      },
      _getScreenByCurrentAccount: function (e) {
        var e = e || this.data.account;
        var t = this.data.screenLocations;
        for (var n = 0; n < t.length; n++) if (t[n].user === e && t[n].node) return t[n];
        return null;
      },
      _watchResize: function (e, t) {
        var n = e.offsetWidth,
          i = e.offsetHeight,
          o;
        var a = setInterval(function () {
          if (!o) {
            var a = e.offsetWidth;
            var s = e.offsetHeight;
            if (a !== n || s !== i)
              o = setTimeout(function () {
                if (e.offsetWidth == a && e.offsetHeight == s) {
                  n = a;
                  i = s;
                  t(a, s);
                }
                o = null;
              }, 200);
          }
        }, 100);
        return a;
      },
      destroy: function () {
        this.supr();
      },
      _cbJoinChannel: function (e) {
        l.log('加入房间申请成功回调，开始进入房间', e);
        var t = e.liveId;
        this.microType =
          e.msgBody.microType == s.MICRO_TYPE_DICT.AUDIO
            ? Netcall.NETCALL_TYPE_AUDIO
            : Netcall.NETCALL_TYPE_VIDEO;
        this.data.isVideo = this.microType === Netcall.NETCALL_TYPE_VIDEO;
        this._initWebRTCEvent();
        var n = {
          videoQuality: Netcall.CHAT_VIDEO_QUALITY_540P,
          videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_15,
          rtmpRecord: !0,
          splitMode: Netcall.LAYOUT_SPLITCUSTOM,
          layout: Netcall.LAYOUT_SPLITCUSTOM,
          highAudio: !0,
          liveEnable: !0,
        };
        this.netcall
          .joinChannel({ channelName: t, type: this.microType, liveEnable: !0, sessionConfig: n })
          .then(this._cbJoinChannelSucc._$bind(this))
          ['catch'](function (e) {
            console.error('进入房间失败：' + e);
            l.log('进入房间失败：', e);
            c.warning('请麦失败');
          });
      },
      _cbLeaveChannel: function (e) {
        l.log('有人离开了房间', e);
        var t = this.netcall,
          n = this;
        this.netcall
          .leaveChannel()
          .then(function (t) {
            a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS, {
              account: e.toAccid,
              microType: (e.msgBody || {}).microType,
            });
            n._clearScreenLocations();
            n.accountList = [];
          })
          ['catch'](function (t) {
            l.log('有人离开了房间，但是发生了错误', t);
            if ('noConnection' === t.code)
              a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS, {
                account: e.toAccid,
                microType: (e.msgBody || {}).microType,
              });
          });
      },
      _cbJoinChannelSucc: function (e) {
        l.log('进入房间成功');
        this._waterMarkUI && this._waterMarkUI.destroy();
        this._waterMarkUI = new _({
          data: { waterMark: this.data.waterMark, waterMarkContent: this.data.waterMarkContent },
        }).$inject(this.$refs.root);
        if (this.data.screenLocations) {
          var t = this.netcall,
            n = this,
            i = this.data.account,
            o = !(this.microType != Netcall.NETCALL_TYPE_VIDEO);
          t.startRtc()
            .then(function () {
              return t.startDevice({ type: Netcall.DEVICE_TYPE_AUDIO_IN })['catch'](function (e) {
                console.log('启动麦克风失败');
                l.log('启动麦克风失败', e);
                console.error(e);
              });
            })
            .then(function () {
              t.setCaptureVolume(255);
              n._addToAccountList(i);
              if (o)
                return new Promise(function (e, o) {
                  setTimeout(function () {
                    t.startDevice({ type: Netcall.DEVICE_TYPE_VIDEO, width: 221, height: 125 })
                      ['catch'](function (e) {
                        c.warning('启动摄像头失败');
                        l.log('启动摄像头失败', e);
                        console.error('启动摄像头失败:' + e);
                        o('启动摄像头失败:' + e);
                      })
                      .then(function () {
                        try {
                          l.log('当前为视频请麦，创建屏幕');
                          var a = n._addScreenLocation({ account: i });
                          l.log('当前视频请麦开始拉取本地流');
                          t.startLocalStream(a.node);
                          e();
                        } catch (s) {
                          o('startLocalStream error:' + s);
                        }
                      });
                  }, 2e3);
                });
            })
            .then(function () {
              t.changeRoleToPlayer();
              console.log('webrtc连接成功');
              l.log('webrtc连接成功');
            })
            ['catch'](function (e) {
              l.log('webrtc连接失败', e);
              a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_FAILURE, {});
              console.error('发生错误, 上麦失败：' + e);
              t.stopLocalStream();
              t.stopRemoteStream();
              t.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN);
              t.stopDevice(Netcall.DEVICE_TYPE_VIDEO);
              t.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL);
              t.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT);
              n._clearScreenLocations();
              n.accountList = [];
            });
        } else {
          l.log('先获取屏幕布局信息');
          this._getScreenLocations(this._cbJoinChannelSucc._$bind(this));
        }
      },
      _initWebRTCEvent: function () {
        var e = this.netcall,
          t = this;
        this._audioVolumeLastUpdateTime = new Date().getTime();
        e.on('remoteTrack', function (n) {
          console.log('收到远程轨道信息', n);
          l.log('新用户进入房间', n);
          a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS, {});
          t._addToAccountList(n.account);
          if ('audio' === n.track.kind) {
            l.log('新用户为音频请麦，播放声音');
            e.startDevice({ type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT })['catch'](function (e) {
              console.error('播放对方的声音失败:' + e);
            });
          }
          if ('video' === n.track.kind) {
            l.log('新用户为视频请麦，创建屏幕');
            var i = t._addScreenLocation(n);
            e.startRemoteStream({ account: n.account, uid: n.uid, node: i.node }).then(function () {
              t._checkVideoCanplay(i);
            });
          }
        });
        e.on('leaveChannel', function (e) {
          t._removeScreenLocation(e.account);
          t._deleteAccountList(e.account);
        });
        e.on('audioVolume', function (e) {
          if (new Date().getTime() - t._audioVolumeLastUpdateTime > u) {
            a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_INTERACTIVE_VOLUME_CHANGE, e);
            t._audioVolumeLastUpdateTime = new Date().getTime();
          }
        });
        l.log('webrtc初始化完成');
      },
      _addToAccountList: function (e) {
        this.Nim.getUser({
          account: e,
          done: function (e, t) {
            var n = this.accountList;
            for (var i = n.length - 1; i >= 0; i--) if (n[i].account == t.account) n.splice(i, 1);
            if (t.account !== this.data.lectorAccount) this.accountList.unshift(t);
            a._$dispatchEvent(
              s.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU,
              this.accountList,
            );
          }._$bind(this),
        });
      },
      _deleteAccountList: function (e) {
        var t = this.accountList;
        for (var n = t.length - 1; n >= 0; n--) if (t[n].account == e) t.splice(n, 1);
        a._$dispatchEvent(
          s.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU,
          this.accountList,
        );
      },
      _getScreenLocations: function (e) {
        this._interactiveCache.getScreenLocation({
          data: { liveId: this.data.liveId },
          onload: function (t) {
            l.log('获取屏幕布局信息成功', t);
            this._cbGetScreenLocations(t);
            e && e();
          }._$bind(this),
          onerror: function (t) {
            l.log('获取屏幕布局信息失败', t);
            this._cbGetScreenLocations(null);
            e && e();
          }._$bind(this),
        });
      },
      _cbGetScreenLocations: function (e) {
        if (e && e.length)
          for (var t = 0; t < e.length; t++)
            if ('layout' == e[t].infoKey && e[t].infoValue) {
              var n = e[t].infoValue.locationIndexs && e[t].infoValue.locationIndexs[0];
              if (n) this.data.screenLocations = [n];
              break;
            }
        if (!this.data.screenLocations)
          this.data.screenLocations = [{ user: this.data.lectorAccount, index: 0 }];
      },
      _onScreenLocationsChange: function (e) {
        var t,
          e = e.msgBody;
        if (e.locationIndexs && e.locationIndexs[0]) {
          t = e.locationIndexs[0].user;
          if (this.data.screenLocations) {
            var n = -1,
              i = !1,
              o = -1;
            for (var a = 0; a < this.data.screenLocations.length; a++) {
              if (this.data.screenLocations[a].user == t) {
                n = a;
                i = this.data.screenLocations[a].isLector;
              }
              if (this.data.screenLocations[a].isLector) o = a;
            }
            if (!(n < 0 || 0 == n)) {
              if (i) {
                this.data.screenLocations[0].index = this.data.screenLocations[n].index;
                this.data.screenLocations[n].index = 0;
              } else {
                this.data.screenLocations[0].index = this.data.screenLocations[o].index;
                this.data.screenLocations[o].index = 0;
                this.data.screenLocations[o].index = this.data.screenLocations[n].index;
                this.data.screenLocations[n].index = 0;
              }
              this._restScreenLocation();
            }
          }
        } else;
      },
      _addScreenLocation: function (e) {
        var t = this._getScreenByCurrentAccount(e.account);
        if (t) return t;
        var n;
        if (
          this.data.screenLocations &&
          this.data.screenLocations[0] &&
          e.account == this.data.screenLocations[0].user
        ) {
          n = this.data.screenLocations[0];
          n.canPlay = !0;
          if (this.data.screenLocations[0].node)
            this.$refs.root.removeChild(this.data.screenLocations[0].node);
        } else {
          for (var i = 0; i < this.data.screenLocations.length; i++)
            if (this.data.screenLocations[i].user == e.account) {
              this.$refs.root.removeChild(this.data.screenLocations[i].node);
              this.data.screenLocations.splice(i, 1);
              break;
            }
          var o = !1;
          if (e.account == this.data.account && this.microType == Netcall.NETCALL_TYPE_VIDEO)
            o = !0;
          n = { user: e.account, canPlay: o };
          this.data.screenLocations.push(n);
        }
        var a = document.createElement('div');
        a.className = 'um-live-live-interactive-player_screen';
        var s = document.createElement('span');
        s.className = 'um-live-live-interactive-player_screen_nick';
        a.appendChild(s);
        this.$refs.root.appendChild(a);
        if (e.account == this.data.lectorAccount) s.innerText = '讲师';
        else
          this.Nim.getUser({
            account: e.account,
            done: function (e, t) {
              s.innerText = (t || {}).nick;
            },
          });
        n.node = a;
        this._restScreenLocation();
        return n;
      },
      _checkVideoCanplay: function (e) {
        var t = e.node;
        var n = t.getElementsByTagName('video')[0];
        if (n)
          n.addEventListener(
            'canplay',
            function () {
              l.log('视频流开始播放', e);
              e.canPlay = !0;
              this._resize();
            }._$bind(this),
          );
      },
      _removeScreenLocation: function (e) {
        for (var t = 0; t < this.data.screenLocations.length; t++)
          if (e == this.data.screenLocations[t].user) {
            this.$refs.root.removeChild(this.data.screenLocations[t].node);
            this.data.screenLocations.splice(t, 1);
            break;
          }
        this._restScreenLocation();
      },
      _restScreenLocation: function () {
        if (this.data.screenLocations.length) {
          if (this.data.screenLocations && this.data.screenLocations.length) {
            if (this.data.screenLocations.length > 4)
              this.data.screenLocations.splice(4, this.data.screenLocations.length - 4);
            var e,
              t = -1;
            for (var n = 0; n < this.data.screenLocations.length; n++) {
              if (this.data.screenLocations[n].user == this.data.lectorAccount) {
                this.data.screenLocations[n].isLector = !0;
                e = n;
              }
              if (0 == this.data.screenLocations[n].index) t = n;
            }
            if (t == -1) this.data.screenLocations[e].index = 0;
            this.data.screenLocations.sort(function (e, t) {
              return e.index - t.index;
            });
            for (var n = 0; n < this.data.screenLocations.length; n++)
              this.data.screenLocations[n].index = n;
          }
          l.log('当前屏幕数据', this.data.screenLocations);
          this._resize();
        }
      },
      _clearScreenLocations: function () {
        var t = e._$getChildren(this.$refs.root);
        if (t) for (var n = 0; n < t.length; n++) this.$refs.root.removeChild(t[n]);
        this.data.screenLocations = null;
        this.$update();
      },
      _resize: function () {
        if (this.data.screenLocations) {
          var e = [];
          for (var t = 0; t < this.data.screenLocations.length; t++)
            if (this.data.screenLocations[t].node && this.data.screenLocations[t].canPlay) {
              var n = {
                user: this.data.screenLocations[t].user,
                node: this.data.screenLocations[t].node,
                index: t,
              };
              e.push(n);
            }
          if (e.length) {
            var i = this.$refs.root.offsetWidth;
            var o = this.$refs.root.offsetHeight;
            var a, s, r, c, d, l;
            if (1 == e.length) {
              a = i;
              s = 0.57 * i;
              l = (o - s) / 2;
            } else {
              a = 0.775 * i;
              s = 0.775 * i * 0.57;
              r = 0.225 * i;
              c = 0.225 * i * 0.57;
              d = (s - 3 * c) / 2;
              l = (o - s) / 2;
            }
            var _;
            for (var t = 0; t < e.length; t++) {
              _ = e[t].node;
              if (0 == t) {
                _.style.width = a + 'px';
                _.style.height = s + 'px';
                _.style.top = l + 'px';
                _.style.left = '0px';
                _.style.right = 'auto';
              } else {
                _.style.width = r + 'px';
                _.style.height = c + 'px';
                _.style.top = l + (t - 1) * (d + c) + 'px';
                _.style.right = '0px';
                _.style.left = 'auto';
              }
            }
          }
        }
      },
      show: function () {
        this.data.isShow = !0;
        this.$update();
      },
      hide: function () {
        this._clearScreenLocations();
        this.data.isShow = !1;
        this.data.amISharingScreen = !1;
        this.$update();
      },
    });
    return f;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'c05b94d8b8af4a92dbf100784275e06c',
  'ca643d30a76212dcbe62390e2a0e3054',
  '9a447a3b597e896dca4aac83e1c86427',
  'bcf071761289ae1019dcc5e22b391493',
  '24fc459b087ee4ceba5d8a9ad4a32482',
  '268c3257e756ea058b7f5849ce71559d',
  'f657f10b7466ef69e5081338d923dc35',
  '0b37bd19208cbac1c1ef61490b546431',
  '91163032df3d891ca0bf8ef59449cd10',
);
