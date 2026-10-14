EDU(
  '0dff13bcebb1adf851ed310030e4ed46',
  function (
    e,
    t,
    n,
    i,
    o,
    a,
    r,
    s,
    c,
    d,
    l,
    u,
    _,
    f,
    h,
    p,
    m,
    g,
    b,
    v,
    E,
    x,
    w,
    C,
    y,
    $,
    I,
    T,
    S,
    A,
  ) {
    var N = { msgMaxLen: 200, historyMessageCount: 100 };
    var O = window;
    O.bridge = O.bridge || {};
    var L = t
      .$extends({
        name: 'ux-live-chat',
        config: function () {
          a.extend(this, {
            isBrowserSupport: this.isSupport(),
            items: [],
            inputValue: '',
            isChatAvaliable: !0,
            chatroomCb: {},
          });
          a.extend(this.data, {
            liveId: null,
            appKey: '',
            account: '',
            lectorAccount: '',
            presenterAccount: '',
            chatroomId: null,
            token: '',
            addr: null,
            onlineMemberNum: 1,
            isMemberNumFromRequest: !1,
            wordsNum: 120,
            avatarScale: { width: 30, height: 30 },
            isSendMsgCreate: !0,
            chatWrapHeight: '1000px',
            liveStatus: d.LIVE_STATUS_PLAYING,
            isUserLogin: !0,
            chatroomNick: '',
            addMuteHelper: { account: '', isAdd: !1 },
            setManagerHelper: { account: '', isAdd: !1 },
            moreMessageCount: 0,
            moreMessage: !1,
            assistantAccount: [],
            showChatroomNum: !0,
            moreMessageSwitch: !0,
            openMuteOpt: !0,
            openRoomMute: !1,
            openTeammanagerOpt: !0,
            anonymousConf: null,
            notice: { content: '', isNew: !1, isViewing: !1, isTeacher: !1 },
          });
          if (!this.data.presenterAccount) this.data.presenterAccount = this.data.account;
          this.liveMemberType = m.LIVE_MEMBER_TYPE_DICT;
          this.sendClientTipType = m.SEND_CLIENT_TIP_TYPE;
          $._$addEvent(
            m.EVENT_NAME_DICT.EVT_USER_MESSAGE_REOMVED,
            this._onUserMessageRemoved._$bind(this),
          );
          this.supr();
        },
        computed: {
          noticeContentWithLink: function (e) {
            return this._findLink(e.notice.content);
          },
        },
        init: function () {
          T.log('chatroom check support:' + this.isBrowserSupport);
          if (this.isBrowserSupport) {
            O.bridge.cbToggleMuteMsgBox = this.clientToggleMuteMsgBox._$bind(this);
            O.bridge.cbToggleSetManagerBox = this.clientToggleSetManagerBox._$bind(this);
            if (this.data.chatroomId) {
              var e = this;
              this._cacheIns = p.Live._$allocate({});
              this.msgRefreshTimer = new g({
                interval: 1e3,
                autoStart: !1,
                cb: this._onMsgRefreshTimeout._$bind(this),
              });
              this.msgCacheQueue = new b({ items: [], length: 200 });
              this.msgCurrentQueue = new b({ items: [], length: 200 });
              this.msgAlreadyQueue = new b({ items: this.items, length: 200 });
              this.getLastMsgTime = +new Date();
              this._getChatroomAddress();
              this.AdaptEmojiList = this.emojiAdapt(C.emoji);
              this.supr();
            } else this._showChatUnavalibale();
          }
        },
        _getNumTimer: function () {
          this.getChatroomCurrentNum();
          setTimeout(this._getNumTimer._$bind(this), 3e4);
        },
        _findLink: function (e) {
          var t =
            /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/g;
          return e.replace(/\n|\r|\r\n/g, '<br>').replace(t, function (e) {
            return "<a href='" + e.toLowerCase() + "' target='_blank'>" + e.toLowerCase() + '</a>';
          });
        },
        _onUserMessageRemoved: function (e) {
          T.log('remove user message success', e);
          var t = (e || {}).msgBody || {};
          this.items.forEach(function (e) {
            if (
              t &&
              e.from == t.fromAccId &&
              (e.time == t.msgTimetag || e.userUpdateTime == t.msgTimetag)
            )
              e.isHidden = !0;
          });
          this.$update();
        },
        cbUserMessageRemoved: function (e) {},
        isSupport: function () {
          if ('ie' == s._$KERNEL.browser && s._$KERNEL.version <= 9) return !1;
          else return !0;
        },
        _showChatUnavalibale: function () {
          this.isChatAvaliable = !1;
          this.$update();
        },
        _getChatroomCurrentNum: function () {
          this._cacheIns._$getChatCurrentMemberNum({
            data: { liveContentId: this.data.liveId },
            onload: function (e) {
              this.onGetChatroomCurrentNum(e);
            }._$bind(this),
          });
        },
        getChatroomCurrentNum: function (e) {
          if (e) this._getChatroomCurrentNum();
          else
            setTimeout(
              function () {
                this._getChatroomCurrentNum();
              }._$bind(this),
              0,
            );
        },
        _getChatroomAddress: function () {
          if (this.data.addr && this.data.addr.length > 0) {
            this._initChatroom();
            this._initScrollMessage();
            if (this.data.isMemberNumFromRequest) this._getNumTimer();
          } else this._showChatUnavalibale();
        },
        onGetChatroomCurrentNum: function (e) {
          if (e && e > 0) {
            this.data.onlineMemberNum = e;
            this.$emit('onlineMemberNumChange', this.data.onlineMemberNum);
            this.$update();
          }
        },
        _initChatroom: function () {
          this.chatroom = v.getInstance({
            isAnonymous: !this.data.isUserLogin,
            appKey: this.data.appKey,
            chatroomId: this.data.chatroomId,
            account: this.data.isUserLogin ? this.data.account : void 0,
            token: this.data.isUserLogin ? this.data.token : void 0,
            chatroomAddresses: this.data.addr,
            chatroomNick: this.data.chatroomNick,
            privateConf: { nos_accelerate_host: '  ' },
          });
          this.chatroomCb = this.getChatroomCb();
          this.chatroom._$addEvent('connect', this.chatroomCb.onChatroomConnect._$bind(this));
          this.chatroom._$addEvent('msgs', this.chatroomCb.onChatroomMsgs._$bind(this));
          this.chatroom._$addEvent('error', this.chatroomCb.onChatroomError._$bind(this));
          this.chatroom._$addEvent(
            'willreconnect',
            this.chatroomCb.onChatroomWillReconnect._$bind(this),
          );
          this.chatroom._$addEvent('disconnect', this.chatroomCb.onChatroomDisconnect._$bind(this));
          S._$dispatchEvent(A.EVT_CHATROOM_INS_INITED, this.chatroom);
          this.liveSend = new x({
            chatroomId: this.data.chatroomId,
            data: {
              liveId: this.data.liveId,
              openRoomMute: this.data.openRoomMute,
              openNoticeOpt: this.data.openNoticeOpt,
              isUserLogin: this.data.isUserLogin,
              openpic: this.data.account == this.data.lectorAccount,
              anonymousConf: this.data.anonymousConf,
            },
          }).$inject(this.$refs.liveSend);
          this.liveSend.$on(
            'sendTextSucess',
            function (e) {
              this.onSendTextSucess(e);
            }._$bind(this),
          );
        },
        onSendTextSucess: function (e) {
          this.updateMsgCurrent([e]);
          this.data.moreMessage = !1;
          this.data.moreMessageCount = 0;
          this.refreshMsgList();
        },
        _onMsgRefreshTimeout: function () {
          this.updateMsgCurrent(this.msgCacheQueue.items);
          this.msgCacheQueue.empty();
          this.refreshMsgList();
        },
        updateMsgCurrent: function (e) {
          if (0 !== e.length) this.msgCurrentQueue.concat(e);
        },
        updateMsgCache: function (e) {
          if (0 !== e.length) this.msgCacheQueue.concat(e);
        },
        refreshMsgList: function () {
          if (0 !== this.msgCurrentQueue.size()) {
            this.msgAlreadyQueue.item = this.items;
            this.items = this.msgAlreadyQueue.concat(this.msgCurrentQueue.items).items;
            this.$update();
            this.msgCurrentQueue.empty();
            if (this._isToBottom()) this._scrollToBottom();
          }
        },
        getChatroomCb: function () {
          var t = this;
          return {
            onChatroomConnect: function (e) {
              if (!t._hasReconnect) {
                this.data.onlineMemberNum = e.chatroom.onlineMemberNum;
                this.$emit('onlineMemberNumChange', this.data.onlineMemberNum);
                this.$emit('chatroomConnect', e);
                this.data.member = e.member;
                this.liveSend.data.member = e.member;
                var n = new h(function (e) {
                  t.chatroom.getChatroomMembers(function (n, i) {
                    if (i.members && i.members.length)
                      for (var o = 0, a = i.members.length; o < a; o++)
                        if ('manager' == i.members[o].type)
                          t.addToTeamManagerList(i.members[o].account);
                    e();
                  });
                });
                var i = new h(function (e) {
                  t.chatroom.getHistoryMsgs(N.historyMessageCount, function (t, n) {
                    e({ error: t, data: n });
                  });
                });
                h.all([n, i]).then(function (e) {
                  t.chatroomCb.onGetHistoryMsgs._$bind(t)(e[1].error, e[1].data);
                });
                if (this.data.openNoticeOpt) {
                  var o = new h(function (e) {
                    t.chatroom.getChatroom(
                      function (t, n) {
                        e({ error: t, data: n });
                      }._$bind(t),
                    );
                  });
                  h.all([n, o]).then(
                    function (e) {
                      var t = e[1].error;
                      var n = e[1].data;
                      if (!t) {
                        var n = e[1].data;
                        if (this.data.notice.isViewing) {
                          var i = function () {
                            this.data.notice.isNew =
                              n.chatroom.announcement &&
                              n.chatroom.announcement !== this.data.notice.content
                                ? !0
                                : !1;
                            this.data.notice.content = n.chatroom.announcement;
                            this.$update();
                            this.$off('noticeClose', i);
                          }._$bind(this);
                          this.$on('noticeClose', i);
                        } else this.data.notice.content = n.chatroom.announcement;
                        this.data.notice.isTeacher =
                          this.data.account === this.data.lectorAccount ||
                          this.data.assistantAccount.indexOf(this.data.account) !== -1;
                        this.$update();
                        this.$emit('chatroomNotice', { type: 'init' });
                      }
                    }._$bind(t),
                  );
                }
              } else t._hasReconnect = !1;
            },
            onChatroomMsgs: function (e) {
              var n = [];
              for (var i = 0, o = {}; i < e.length; i++) {
                o = e[i];
                if (o.attach && !t.data.isMemberNumFromRequest) {
                  switch (o.attach.type) {
                    case 'memberEnter':
                      if (o.from != this.data.account) {
                        this.data.onlineMemberNum++;
                        this.$emit('onlineMemberNumChange', this.data.onlineMemberNum);
                      }
                      break;
                    case 'memberExit':
                      if (this.data.onlineMemberNum > 0) this.data.onlineMemberNum--;
                      this.$emit('onlineMemberNumChange', this.data.onlineMemberNum);
                  }
                  this.$update();
                }
                if (o.text || 'image' == o.type.toLowerCase()) {
                  n.push(o);
                  if (o.from === this.data.lectorAccount) {
                    t.updateMsgCurrent(t.msgCacheQueue.items);
                    t.updateMsgCurrent(n);
                    t.msgCacheQueue.empty();
                    n = [];
                    t.refreshMsgList();
                  }
                  if (t.data.moreMessage && e.length > 0) {
                    t.data.moreMessageCount += e.length;
                    t.$update();
                  }
                }
                if ('custom' == o.type) $.dispatchByMsg(o);
                if ('notification' == o.type) {
                  t.gagMemberHandler(o);
                  t.muteRoomHandler(o);
                  t.addManagerHandler(o);
                  if (this.data.openNoticeOpt) t.noticeChangeHander(o);
                }
              }
              t.updateMsgCache(n);
              n = [];
              if (!t.msgRefreshTimer.active && +new Date() - t.getLastMsgTime < 1e3)
                t.msgRefreshTimer.startTimer();
              else if (+new Date() - t.getLastMsgTime >= 3e3) {
                if (t.msgRefreshTimer.active) t.msgRefreshTimer.stopTimer();
                t.updateMsgCurrent(t.msgCacheQueue.items);
                t.msgCacheQueue.empty();
                t.refreshMsgList();
              }
              t.getLastMsgTime = +new Date();
            },
            onChatroomError: function (e, t) {
              this.$emit('chatroomError', e);
            },
            onChatroomWillReconnect: function (e) {
              t._hasReconnect = !0;
            },
            onChatroomDisconnect: function (t) {
              if (!this.isChatroomWillSwitch) {
                l.warning(e.KYE_LIB_COMMON_CHAT_ROOM_DISCONNECT, 3e3);
                if (t)
                  switch (t.code) {
                    case 302:
                      l.warning(e.KYE_LIB_COMMON_CHAT_ACCOUNT_OR_PSW_ERR, 3e3);
                      break;
                    case 13003:
                      l.warning(e.KYE_LIB_COMMON_CHAT_BLOKCED, 3e3);
                      break;
                    case 'kicked':
                      if ('managerKick' === t.reason)
                        l.warning(e.KYE_LIB_COMMON_CHAT_REMOVED_BY_MG, 3e3);
                      else if ('blacked' === t.reason)
                        l.warning(e.KYE_LIB_COMMON_CHAT_MOVED_BLOCK_BY_MG, 3e3);
                      break;
                    default:
                      l.warning(t.message, 3e3);
                  }
                this.$emit('chatroomDisconnect', t);
              } else this.$emit('chatroomSwitch', t);
            },
            onGetHistoryMsgs: function (e, n) {
              var i = [];
              if (!e && n) {
                n.msgs.sort(function (e, t) {
                  return e.time - t.time;
                });
                for (var o = 0; o < n.msgs.length; o++) i.push(n.msgs[o]);
                t.updateMsgCurrent(i);
                i = [];
                t.refreshMsgList();
                t._scrollToBottom();
              } else l.warning(e.message, 5e3);
              t.$emit('getHistoryMsgsError', e);
            },
          };
        },
        gagMemberHandler: function (e) {
          if (e.attach) {
            var t = e.attach.type;
            if ('gagMember' == t || 'ungagMember' == t) {
              if ('gagMember' == t) {
                if (e.attach.to == this.data.account) {
                  this.isPersonMute = !0;
                  if (this.isPersonMute || this.isRoomMute) this.liveSend.isSendBtnDisable = !0;
                }
                this.delFromTeamMagagerList(e.attach.to[0]);
              } else if ('ungagMember' == t)
                if (e.attach.to == this.data.account) {
                  this.isPersonMute = !1;
                  if (!this.isPersonMute && !this.isRoomMute) this.liveSend.isSendBtnDisable = !1;
                }
              this.liveSend.$update();
              this.updateMsgCurrent(e);
              this.refreshMsgList();
              this.$update();
            }
          }
        },
        muteRoomHandler: function (e) {
          if (e.attach) {
            var t = e.attach.type;
            if ('muteRoom' == t || 'unmuteRoom' == t)
              if (
                this.data.account !== this.data.lectorAccount &&
                this.data.assistantAccount.indexOf(this.data.account) === -1
              ) {
                if ('muteRoom' == t) {
                  this.liveSend.isRoomMute = !0;
                  this.isRoomMute = !0;
                  if (this.isPersonMute || this.isRoomMute) this.liveSend.isSendBtnDisable = !0;
                } else if ('unmuteRoom' == t) {
                  this.liveSend.isRoomMute = !1;
                  this.isRoomMute = !1;
                  if (!this.isPersonMute && !this.isRoomMute) this.liveSend.isSendBtnDisable = !1;
                }
                this.liveSend.$update();
                this.updateMsgCurrent(e);
                this.refreshMsgList();
                this.$update();
              } else {
                this.updateMsgCurrent(e);
                this.refreshMsgList();
                this.$update();
              }
          }
        },
        addManagerHandler: function (e) {
          if (e.attach) {
            var t = e.attach.type;
            if ('addManager' == t || 'removeManager' == t) {
              if ('addManager' == t) this.addToTeamManagerList(e.attach.to[0]);
              else if ('removeManager' == t) this.delFromTeamMagagerList(e.attach.to[0]);
              this.updateMsgCurrent(e);
              this.refreshMsgList();
              this.data.notice.isTeacher =
                this.data.account === this.data.lectorAccount ||
                this.data.assistantAccount.indexOf(this.data.account) !== -1;
              this.$emit('chatroomNotice', { type: 'change' });
            }
          }
        },
        noticeChangeHander: function (e) {
          if (e.attach) {
            var t = e.attach;
            if ('updateChatroom' === t.type) {
              var n;
              try {
                n = JSON.parse(t.custom);
              } catch (i) {}
              if (void 0 !== n.announcement) {
                if (this.data.notice.isViewing) {
                  var o = function () {
                    this.data.notice.content = n.announcement;
                    this.$update();
                    this.$off('noticeClose', o);
                  }._$bind(this);
                  this.$on('noticeClose', o);
                } else this.data.notice.content = n.announcement;
                this.data.notice.isNew =
                  n.announcement && n.from !== this.data.presenterAccount ? !0 : !1;
                this.$update();
                this.$emit('chatroomNotice', { type: 'change' });
              }
            }
          }
        },
        addToTeamManagerList: function (e) {
          this.data.assistantAccount.push(e);
        },
        delFromTeamMagagerList: function (e) {
          var t = this.data.assistantAccount.indexOf(e);
          if (t > -1) this.data.assistantAccount.splice(t, 1);
        },
        onUserInfoClick: function (t, n, i) {
          var o = t.from;
          if (this.data.openMuteOpt || this.data.openTeammanagerOpt) {
            var a = '';
            if (
              this.data.account == this.data.lectorAccount ||
              this.data.assistantAccount.indexOf(this.data.account) > -1
            ) {
              if (this.data.assistantAccount.indexOf(this.data.account) > -1) a = 'u-assistant-opt';
              this.chatroom.getChatroomMembersInfo(
                [o],
                function (i, o) {
                  var r = o.members && o.members[0];
                  if (!r) r = {};
                  if ('owner' != r.type)
                    if ('manager' != r.type || this.data.account == this.data.lectorAccount) {
                      var s = r.gaged;
                      var c = r.type;
                      var d = s ? e.KYE_LIB_COMMON_CHAT_UNMUTE : e.KYE_LIB_COMMON_CHAT_MUTE;
                      var l = 'manager' == r.type ? !0 : !1;
                      var _ = l
                        ? e.KYE_LIB_COMMON_CHAT_REMOVE_TEACHER_ASSISTANT
                        : e.KYE_LIB_COMMON_CHAT_BE_TEACHER_ASSISTANT;
                      var f = { account: r.account, gaged: r.gaged, type: r.type, nick: r.nick };
                      var h = JSON.stringify(f);
                      var p = JSON.stringify({ fromAccId: t.from, msgTimetag: t.time });
                      var m =
                        '<div class="ux-live-pc-chat_item-opt  ' +
                        a +
                        '"> ' +
                        (this.data.openMuteOpt
                          ? '<a class="ux-live-pc-chat_item-opt1" on-click={this.$emit(\'toggleMuteClick\',' +
                            h +
                            ')}>' +
                            d +
                            '</a>'
                          : '') +
                        (this.data.openTeammanagerOpt
                          ? '<a class="ux-live-pc-chat_item-opt2" on-click={this.$emit(\'toggleTeamManager\', ' +
                            h +
                            ')}>' +
                            _ +
                            '</a>'
                          : '') +
                        (this.data.openMuteOpt
                          ? '<a class="ux-live-pc-chat_item-opt1" on-click={this.$emit(\'toggleDeleteClick\',' +
                            p +
                            ')}>' +
                            e.KYE_LIB_COMMON_CHAT_REMOVE_THIS_COMMENT +
                            '</a>'
                          : '') +
                        ' </div>';
                      var g = new u({
                        data: {
                          maskClickHide: !0,
                          contentTemplate: m,
                          class: 'ux-live-pc-chat_item-modal',
                        },
                      });
                      this.chatItemModal = g;
                      g.$on(
                        'toggleDeleteClick',
                        function (e) {
                          this.toggleDeleteClick(e);
                        }._$bind(this),
                      );
                      g.$on(
                        'toggleMuteClick',
                        function (e) {
                          this.onToggleMuteClick(e);
                        }._$bind(this),
                      );
                      g.$on(
                        'toggleTeamManager',
                        function (e) {
                          this.onToggleTeamManager(e);
                        }._$bind(this),
                      );
                      g.$on(
                        'cancel',
                        function (e) {
                          document.body.classList.remove('f-ohidden');
                        }._$bind(this),
                      );
                      this.showOperatePanel(n);
                    }
                }._$bind(this),
              );
            }
          }
        },
        showOperatePanel: function (e) {
          var t = i._$getPageBox().clientWidth,
            n = o._$clientX(e),
            a = o._$clientY(e);
          if (t - n < 120) n = t - 120;
          var r = i._$getByClassName(
            i._$getByClassName(document.body, 'ux-live-pc-chat_item-modal')[0],
            'ux-modal_dialog',
          )[0];
          r.style.top = a + 'px';
          r.style.left = n + 'px';
          document.body.classList.add('f-ohidden');
        },
        onChatItemModalClose: function () {
          this.chatItemModal.cancel();
          document.body.classList.remove('f-ohidden');
        },
        onToggleMuteClick: function (t) {
          if (t.account)
            if ('manager' != t.type) {
              this.data.addMuteHelper = { account: t.account, isAdd: !t.gaged };
              var n = t.gaged
                ? e.KYE_LIB_COMMON_CHAT_SURE_TO_JIECHU +
                  t.nick +
                  e.KYE_LIB_COMMON_CHAT_MUTE_IN_LIVEROOM
                : e.KYE_LIB_COMMON_CHAT_SUER_TO_DISABLE +
                  t.nick +
                  e.KYE_LIB_COMMON_CHAT_COMMENT_IN_LIVEROOM;
              if (I.isInEudLive()) {
                var i = {
                  title: '',
                  icon: 0,
                  content: n,
                  buttonYes: e.KEY_BUTTON_CONFIRM,
                  buttonNo: e.KEY_BUTTON_CANCEL,
                  yesCallback: 'cbToggleMuteMsgBox',
                  noCallback: '',
                };
                i = JSON.stringify(i);
                O.NimCefWebFunction('{ "functionName" : "showMsgBox", "param" :' + i + '}');
              } else {
                var o = u.confirm(n, '', e.KEY_BUTTON_CONFIRM, e.KEY_BUTTON_CANCEL);
                o.$on(
                  'ok',
                  function () {
                    this.chatroom.markChatroomGaglist(
                      this.data.addMuteHelper.account,
                      this.data.addMuteHelper.isAdd,
                      this.cbToggleMuteClickDone._$bind(this),
                    );
                  }._$bind(this),
                );
              }
              this.onChatItemModalClose();
            } else l.warning(e.KYE_LIB_COMMON_CHAT_TEACHER_ASSISTANT_NO_BE_MUTE, 3e3);
          else l.warning(e.KYE_LIB_COMMON_CHAT_HE_LEAVE_NO_SET, 3e3);
        },
        toggleDeleteClick: function (t) {
          this._cacheIns._$deleteChatroomMessage({
            liveId: this.data.liveId,
            fromAccId: t.fromAccId,
            msgTimetag: t.msgTimetag,
            onload: function () {
              l.success(e.KYE_LIB_COMMON_CHAT_DEL_COMMENT_SUCCESS);
              this.onChatItemModalClose();
            }._$bind(this),
          });
        },
        onToggleTeamManager: function (t) {
          if (t.account)
            if (!t.gaged) {
              var n = 'manager' == t.type ? !0 : !1;
              var i =
                'manager' == t.type
                  ? e.KYE_LIB_COMMON_CHAT_SURE_TO_JIECHU +
                    t.nick +
                    e.KYE_LIB_COMMON_CHAT_TEACHER_ASSISTANT_ZG
                  : e.KYE_LIB_COMMON_CHAT_SURE_BA +
                    t.nick +
                    e.KYE_LIB_COMMON_CHAT_SURE_TO_BE_TEACHER_ASSISTANT;
              this.data.setManagerHelper = { account: t.account, isAdd: n };
              if (I.isInEudLive()) {
                var o = {
                  title: '',
                  icon: 0,
                  content: i,
                  buttonYes: e.KEY_BUTTON_CONFIRM,
                  buttonNo: e.KEY_BUTTON_CANCEL,
                  yesCallback: 'cbToggleSetManagerBox',
                  noCallback: '',
                };
                o = JSON.stringify(o);
                O.NimCefWebFunction('{ "functionName" : "showMsgBox", "param" :' + o + '}');
              } else {
                var a = u.confirm(i, '', e.KEY_BUTTON_CONFIRM, e.KEY_BUTTON_CANCEL);
                a.$on(
                  'ok',
                  function () {
                    this.chatroom.markChatroomManager(
                      this.data.setManagerHelper.account,
                      !this.data.setManagerHelper.isAdd,
                      this.cbToggleTeamManagerDone._$bind(this),
                    );
                  }._$bind(this),
                );
              }
              this.onChatItemModalClose();
            } else l.warning(e.KYE_LIB_COMMON_CHAT_USER_MUTED_NO_TOBE_TEACHER_ASSISTANT, 3e3);
          else l.warning(e.KYE_LIB_COMMON_CHAT_HE_LEAVE_NO_SET, 3e3);
        },
        clientToggleMuteMsgBox: function () {
          this.chatroom.markChatroomGaglist(
            this.data.addMuteHelper.account,
            this.data.addMuteHelper.isAdd,
            this.cbToggleMuteClickDone._$bind(this),
          );
        },
        clientToggleSetManagerBox: function () {
          this.chatroom.markChatroomManager(
            this.data.setManagerHelper.account,
            !this.data.setManagerHelper.isAdd,
            this.cbToggleTeamManagerDone._$bind(this),
          );
        },
        cbToggleMuteClickDone: function (e, t) {
          if (t.isAdd) this.$emit('setMemberMute', { accid: t.account });
          this.sendClientTip(this.sendClientTipType.MUTE, t);
        },
        cbToggleTeamManagerDone: function (e, t) {
          this.sendClientTip(this.sendClientTipType.SETMANAGER, t);
        },
        sendClientTip: function (t, n) {
          this.chatroom.getChatroomMembersInfo(
            [n.account],
            function (i, o) {
              var a = o.members && o.members[0];
              if (a)
                if (t == this.sendClientTipType.SETMANAGER) {
                  var r = n.isAdd
                    ? a.nick + e.KYE_LIB_COMMON_CHAT_HAS_TOBE_TEACHER_ASSISTANT_BY_JS
                    : a.nick + e.KYE_LIB_COMMON_CHAT_REMOVE_TEACHER_ASSISTANT_BY_JS;
                  this.chatroom.sendTipMsg(r);
                } else if (t == this.sendClientTipType.MUTE) {
                  var r = n.isAdd
                    ? a.nick + e.KYE_LIB_COMMON_CHAT_NOT_COMMENT_BY_MG
                    : a.nick + e.KYE_LIB_COMMON_CHAT_DISABLE_NOT_COMMENT_BY_MG;
                  this.chatroom.sendTipMsg(r);
                }
            }._$bind(this),
          );
        },
        onImageClick: function (e) {
          if (!I.isInEudLive()) new w({ data: { photoUrl: e } });
          else I.viewChatroomImage(e);
        },
        updateTouchmoveTime: function () {
          this.touchmoveTime = new Date().getTime();
        },
        _isToBottom: function () {
          var e = new Date().getTime();
          if (
            (this.touchmoveTime && e - this.touchmoveTime <= 5e3) ||
            (this.data.moreMessage && this.data.moreMessage)
          )
            return !1;
          else return !0;
        },
        _scrollToBottom: function () {
          this.$refs.chatScroll.scrollTop = this._getBottomScroll();
        },
        _getBottomScroll: function () {
          return this.$refs.chatScrollList.offsetHeight - this.$refs.chatScroll.offsetHeight;
        },
        emojiAdapt: function (e) {
          var t = [];
          for (var n in e) {
            var i = {};
            i.key = n;
            i.file = e[n].file;
            t.push(i);
          }
          return t;
        },
        disconnectChatroom: function () {
          if (this.chatroom && 'function' == typeof this.chatroom.disconnect)
            try {
              this.isChatroomWillSwitch = !0;
              this.chatroom.disconnect();
            } catch (e) {
              console.log(e);
            }
        },
        _initScrollMessage: function () {
          var e = this;
          if (this.data.moreMessageSwitch)
            O.setTimeout(function () {
              e.$refs.chatScroll.onscroll = function () {
                var t = e.$refs.chatScroll.scrollTop;
                var n = e.$refs.chatScroll.offsetHeight;
                var i = e.$refs.chatScrollList.offsetHeight;
                if (i - t - n >= 0.1 * n) e.data.moreMessage = !0;
                else {
                  e.data.moreMessageCount = 0;
                  e.data.moreMessage = !1;
                }
                e.$update();
              };
            }, 1e3);
        },
        toBottomWithAnimate: function () {
          this.data.moreMessage = !1;
          this.data.moreMessageCount = 0;
          this.$update();
          var e = this._getBottomScroll();
          this.$refs.chatScroll.scrollTop = e;
        },
        getChatroomMemberNum: function () {
          return this.data.onlineMemberNum;
        },
        viewNotice: function () {
          this.data.notice.isViewing = !0;
          this.data.notice.isNew = !1;
        },
        closeNotice: function () {
          this.data.notice.isViewing = !1;
          this.$emit('noticeClose');
        },
        destroy: function () {
          this.disconnectChatroom();
          if (this.chatroom) {
            this.chatroom.destroyInstance();
            this.chatroom = null;
          }
          this.supr();
        },
      })
      .filter({
        formatTime: function (e) {
          return c._$formatTime(e, 'HH:mm');
        },
        formatLectorTitle: function (t) {
          if (t === this.data.lectorAccount) return e.KYE_LIB_COMMON_CHAT_ROLE_TEACHER;
          else if (this.data.assistantAccount.indexOf(t) > -1)
            return e.KYE_LIB_COMMON_CHAT_ROLE_TEACHER_ASSISTANT;
          else return '';
        },
        highlight: function (e) {
          if (e === this.data.account) return 'highlight-reverse';
          else if (this.data.lectorAccount && e === this.data.lectorAccount) return 'highlight';
          else if (this.data.assistantAccount && this.data.assistantAccount.indexOf(e) > -1)
            return 'highlight';
          return '';
        },
        escapeString: function (e) {
          return n._$escape(e);
        },
        formatEmoji: function (e) {
          var t = /\[([^\]\[]*)\]/g;
          var n = e.match(t) || [];
          var i = C.emoji;
          for (var o = 0, a = n.length; o < a; ++o)
            if (i[n[o]])
              e = e.replace(n[o], '<img class="emoji" src="' + C.getEmojiPicUrl(i[n[o]]) + '" />');
          return e;
        },
        formatUrl: function (e) {
          var t =
            /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/g;
          e = e.replace(t, function (e) {
            return "<a href='" + e + "' target='_blank'>" + e + '</a>';
          });
          return e;
        },
        scalePicDynamic: function (e, t, n) {
          if (/stu\.126\.net\//.test(e)) return e;
          else return f._$scaleImage(e, t, n);
        },
      });
    return L;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  '235c21779ec98ac90606962a862dadc9',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  'f051aeae7bb889518ead30ef6e491df3',
  '89a466f05573f560c156411121b8daae',
  'e3c72a3eb3b9f2c3bb2bb123118a374f',
  '268c3257e756ea058b7f5849ce71559d',
  'abe9a6b99742882e8efaadd2518b0cb2',
  '8cef6083a5dcc1555a6a85163ef158e2',
  'ea321df1a66d5a1d11c5df37a56589c4',
  'acaf016265ee9e46872cbbb2398ea4b7',
  '9dc508f2eef931918f19fafe68ba902b',
  'bcf071761289ae1019dcc5e22b391493',
  '2a3363306c3b5897063a0cac42f320ca',
  'f1712257727846167b812918a0eee121',
  'fe18af44da13577b1b82ec10bb4cee27',
  'dac7471872ff9a642deb82db1438960a',
  '76667a7cd8dc7f91324e0379a25551a8',
  'c9c6de6357f718d5982e2ade68c118b8',
  'f92fcb9468157ecb2a2e74ddb6c7af44',
  'b8157c8e66c25b7e96415cbd6307e8a5',
  '9a447a3b597e896dca4aac83e1c86427',
  'da1668c9fa910f2a29d77345d1c9ac52',
  '0b37bd19208cbac1c1ef61490b546431',
  '665b4e36772193beffe50de855029c13',
  '97edda62b43e7a7a70e398500c91441e',
);
