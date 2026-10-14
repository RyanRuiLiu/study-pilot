EDU(
  '14dae8b0d366dfef90ca61aa51bc80cb',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p) {
    var m = Math.max(document.body.scrollHeight, screen.height);
    var g = i.$extends({
      config: function () {
        o.extend(this, {
          inputValue: '',
          isWriteModel: !1,
          isEmojiModel: !1,
          isSendBtnDisable: !1,
          isRoomMute: !1,
        });
        o.extend(this.data, {
          liveId: null,
          openRoomMute: !1,
          wordsNum: 120,
          emojiFilePath: '',
          emojiHide: !0,
          type: '',
          isUserLogin: !0,
          anonymousConf: null,
          genPicUpload: !0,
          roomMuteStatus: !1,
          lang: e,
        });
        this.supr();
      },
      computed: {
        anonymousLoginTipText: function (t) {
          return (
            (t.anonymousConf && t.anonymousConf.loginTipText) ||
            e.KEY_LIB_CHATROOM_LOGIN_CAN_JOIN_INTERACTIVE
          );
        },
        anonymousLoginBtnText: function (t) {
          return (t.anonymousConf && t.anonymousConf.loginBtnText) || e.KEY_LIB_CHATROOM_GO_LOGIN;
        },
        sendplaceholder: function (t) {
          if (this.isSendBtnDisable)
            if (this.isRoomMute) return e.KEY_LIB_CHATROOM_ASSISTANT_DISABLE_CHAT_NO_SEND_MSG;
            else return e.KEY_LIB_CHATROOM_YOU_DISABLE_CHAT;
          return e.KEY_LIB_CHATROOM_I_WANT_CHAT;
        },
      },
      init: function () {
        this.supr();
        this.chatroom = d.getInstance();
        this.cacheLive = u.Live._$allocate();
        this.$watch('this.isWriteModel', function (e, t) {
          if (!e) this.onEmojiHide();
        });
        this.$watch('this.isSendBtnDisable', function (e, t) {
          if (e) this.$refs.writeInput.disabled = !0;
          else {
            this.$refs.writeInput.disabled = !1;
            setTimeout(
              function () {
                var e = this.$refs.writeInput;
                e.Element &&
                  e.Element.scrollIntoViewIfNeeded instanceof Function &&
                  e.scrollIntoViewIfNeeded();
              }._$bind(this),
              100,
            );
          }
        });
        if (this.data.openRoomMute)
          this.cacheLive._$getRoomMuteStatus(
            this.data.liveId,
            function (e) {
              this.data.roomMuteStatus = e;
              this.$update();
            }._$bind(this),
          );
      },
      toggleWriteModel: function () {
        this.isWriteModel = !this.isWriteModel;
        if (this.isWriteModel) this.$refs.writeInput.focus();
        else this.$refs.writeInput.blur();
      },
      onEmojiTap: function () {
        if (!this.liveChatEmoji) {
          this.$refs.writeInput.blur();
          this.isWriteModel = !0;
          this.isEmojiModel = !1;
          this.liveChatEmoji = new _({ data: { type: 'mobile' } }).$inject(this.$refs.contentNode);
          this.liveChatEmoji.$on(
            'emojiSelect',
            function (e) {
              this.onEmojiSelect(e.emoji);
            }._$bind(this),
          );
          this.liveChatEmoji.$on(
            'emojiDelete',
            function (e) {
              this.onEmojiDelete(e.emoji);
            }._$bind(this),
          );
          l.setIsInput(!0);
        } else {
          this.isWriteModel = !this.isWriteModel;
          this.isEmojiModel = !this.isEmojiModel;
        }
      },
      onEmojiClick: function () {
        if (!this.liveChatEmoji) {
          this.isWriteModel = !0;
          this.liveChatEmoji = new _({ data: { type: this.data.type } }).$inject(
            this.$refs.contentNode,
          );
          this.data.emojiHide = !1;
          this.liveChatEmoji.$on(
            'emojiSelect',
            function (e) {
              this.onEmojiSelect(e.emoji);
            }._$bind(this),
          );
        }
      },
      onEmojiHide: function () {
        this.data.emojiHide = !0;
        this.isEmojiModel = !0;
        if (this.liveChatEmoji) {
          this.liveChatEmoji.destroy();
          this.liveChatEmoji = null;
        }
        l.setIsInput(!1);
      },
      onEmojiSelect: function (e) {
        this.inputValue += e.key;
        this.$update();
      },
      onEmojiDelete: function () {
        var e = /.*\[[\u4e00-\u9fa5]*\]$/g;
        if (this.inputValue.match(e))
          this.inputValue = this.inputValue.replace(/\[[\u4e00-\u9fa5]*\]$/g, '');
        this.$update();
      },
      _verifyWordNum: function () {
        var t = this.inputValue.length;
        if (t > this.data.wordsNum) {
          c.warning(
            e.KEY_LIB_CHATROOM_MAX_INPUT + this.data.wordsNum + e.KEY_LIB_CHATROOM_WORDS,
            5e3,
          );
          return !1;
        }
        return !0;
      },
      onMuteRoomClick: function (t) {
        if (this.data.roomMuteStatus)
          s.confirm(
            '',
            e.KEY_LIB_CHATROOM_SURE_CANCEL_DISABLE_CHAT,
            e.KEY_LIB_CHATROOM_SURE_JIECHU,
          ).$on(
            'ok',
            function () {
              this.cacheLive._$roomMute(
                this.data.liveId,
                !1,
                function (e) {
                  this.data.roomMuteStatus = !1;
                  this.$update();
                }._$bind(this),
              );
            }._$bind(this),
          );
        else
          s.confirm(
            e.KEY_LIB_CHATROOM_TIP_DISABLE_CHAT_NOONE_CAN_CHAT,
            e.KEY_LIB_CHATROOM_ARE_YOU_SURE_DISABLE_CHAT,
            e.KEY_LIB_CHATROOM_SURE_DISABLE_CHAT,
          ).$on(
            'ok',
            function () {
              this.cacheLive._$roomMute(
                this.data.liveId,
                !0,
                function (e) {
                  this.data.roomMuteStatus = !0;
                  this.$update();
                }._$bind(this),
              );
            }._$bind(this),
          );
      },
      onSendMessageClick: function (t) {
        if (!this.isSendBtnDisable)
          if (t && t.replace(/^\s*|\s*$/g, ''))
            if (!(this.lastSendMsgTime && +new Date() - this.lastSendMsgTime <= 3e3)) {
              this.lastSendMsgTime = +new Date();
              if (this._verifyWordNum()) {
                this.lastSendMsgTime = +new Date();
                try {
                  this.chatroom.getChatroomMembersInfo(
                    [this.data.member.account],
                    function (n, i) {
                      var o = i.members && i.members[0];
                      if (o)
                        this.chatroom.sendText(
                          o.type.toUpperCase(),
                          t,
                          this.onSendText._$bind(this),
                        );
                      else c.warning(e.KEY_LIB_CHATROOM_SEND_FAIL_RETRY, 3e3);
                    }._$bind(this),
                  );
                } catch (n) {
                  this.isSendBtnDisable = !1;
                  c.warning(e.KEY_LIB_CHATROOM_CON_ERROR, 3e3);
                } finally {
                }
              }
            } else c.warning(e.KEY_LIB_CHATROOM_TOO_FREQ_RETRY_LATER, 3e3);
          else {
            c.warning(e.KEY_LIB_CHATROOM_CANNOT_SEND_EMPTY_MSG, 3e3);
            this.isSendBtnDisable = !1;
          }
        else if (this.isRoomMute)
          c.warning(e.KEY_LIB_CHATROOM_ASSISTANT_DISABLE_CHAT_NO_SEND_MSG, 3e3);
        else c.warning(e.KEY_LIB_CHATROOM_YOU_DISABLED_CHAT_CANNOT_SEND_MSG, 3e3);
      },
      onInput: function (e) {
        if (this._verifyWordNum());
        else {
          this.inputValue = e.substr(0, this.data.wordsNum);
          this.$update();
        }
      },
      onFocus: function (e) {
        this.onEmojiHide();
        if (f._$isWeixin())
          setTimeout(function () {
            window.scroll(0, m);
          }, 300);
      },
      onBlur: function (e) {
        if (f._$isWeixin())
          setTimeout(function () {
            window.scroll(0, 0);
          }, 300);
      },
      onKeypress: function (e, t) {
        if (13 == e.event.keyCode) this.onSendMessageClick(t);
      },
      onSendText: function (t, n) {
        this.isSendBtnDisable = !1;
        if (!t) {
          this.inputValue = '';
          this.isWriteModel = !1;
          this.onEmojiHide();
          this.$emit('sendTextSucess', n);
          this.$update();
        } else {
          if (t && t.code)
            if (13004 == t.code) {
              c.warning(e.KEY_LIB_CHATROOM_YOU_DISABLED_CHAT_CANNOT_SEND_MSG, 3e3);
              return;
            } else if (13006 == t.code) {
              c.warning(e.KEY_LIB_CHATROOM_ASSISTANT_DISABLE_CHAT_NO_SEND_MSG, 3e3);
              return;
            }
          c.warning(e.KEY_LIB_CHATROOM_SEND_FAIL_RETRY, 3e3);
        }
        this.$emit('sendTextError', t);
      },
      uploadFile: function () {
        var t = this.$refs.uploadFile,
          n = t.value,
          i = n.substring(n.lastIndexOf('.') + 1, n.length),
          o = /bmp|png|jpg|bmp|jpeg|gif/i.test(i) ? 'image' : 'file';
        if ('file' != o)
          if (0 != t.files[0].size)
            if (!(t.files[0].size / 1048576 > 15))
              try {
                this.chatroom.previewFile(t, this.sendPicDone._$bind(this));
              } catch (a) {
                this.isSendBtnDisable = !1;
                c.warning(e.KEY_LIB_CHATROOM_CON_ERROR, 3e3);
              } finally {
              }
            else c.warning(e.KEY_LIB_CHATROOM_IMG_LT_15M);
          else c.warning(e.KEY_LIB_CHATROOM_CANNOT_UPLOAD_EMPTY_FILE);
        else c.warning(e.KEY_LIB_CHATROOM_IMG_SUPPORT_EXT);
      },
      goToLogin: function () {
        h._$dispatchEvent(p.EVT_CLICK_LOGIN, {});
      },
      sendPicDone: function (t, n) {
        if (t)
          if ('bigPic' == t) {
            c.warning(e.KEY_LIB_CHATROOM_IMG_LT_15M);
            this.$refs.uploadFile.value = null;
            this.$update();
            return;
          } else {
            c.warning(e.KEY_LIB_CHATROOM_SEND_IMG_FAIL);
            this.$update();
            return;
          }
        this.$emit('sendTextSucess', n);
        this.data.genPicUpload = !1;
        this.$update();
        this.data.genPicUpload = !0;
        this.$update();
      },
      destroy: function () {
        this.supr();
      },
    });
    return g;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  'fe86216ed59e3103a56c42c850d389f0',
  '8f34a99b20d362b3542aebd517390fc1',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '6463f371a6962bf5bd93146f4b45826f',
  '57d0e394bea4b75c21a4479f11fff93f',
  'abe9a6b99742882e8efaadd2518b0cb2',
  '268c3257e756ea058b7f5849ce71559d',
  'fe18af44da13577b1b82ec10bb4cee27',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '9dc508f2eef931918f19fafe68ba902b',
  '73f4bae8d07cb2f47cea146b9e229e7f',
  'beec6201069596ecb83a09e5fc3eb415',
  '665b4e36772193beffe50de855029c13',
  '97edda62b43e7a7a70e398500c91441e',
);
