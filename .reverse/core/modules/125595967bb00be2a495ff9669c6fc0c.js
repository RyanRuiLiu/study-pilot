EDU(
  '125595967bb00be2a495ff9669c6fc0c',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _ = n.$extends({
      config: function () {
        i.extend(this, {});
        i.extend(this.data, {
          disabled: !1,
          getFromServer: !1,
          mode: 'display',
          liveId: null,
          content: '',
          hasDoInput: !1,
          isInClient: d.isInEudLive(),
          publishState: 'disabled',
          account: null,
          isTeacher: !0,
          clientVersion: null,
        });
        this.supr();
        this.$watch('content', function (e, t) {
          this._checkText();
        });
      },
      computed: {
        contentWithLink: function (e) {
          return this._findLink(e.content);
        },
        deleteState: function (e) {
          return !e.content ? 'disabled' : 'gh';
        },
        showTitleInClient: function (e) {
          return e.clientVersion ? !1 : !0;
        },
      },
      init: function () {
        this.supr();
        this._cacheIns = l.Live._$allocate({
          ongetChatroomNotice: this._ongetChatroomNotice._$bind(this),
          onupdateChatroomNotice: this._onupdateChatroomNotice._$bind(this),
          onclearChatroomNotice: this._onclearChatroomNotice._$bind(this),
        });
        if (this.data.liveId && this.data.getFromServer)
          this._cacheIns._$getChatroomNotice(this.data.liveId);
      },
      destroy: function () {
        this.supr();
      },
      _checkText: function () {
        var e = this.data.content || '';
        e = e.trim();
        if (e) {
          var t = this._getStringLength(e);
          if (!(t > 300)) {
            this._hideTextError();
            if (this.data.hasDoInput && e) this.data.publishState = 'primary';
            else this.data.publishState = 'disabled';
            this.$update();
          } else {
            this.data.publishState = 'disabled';
            this._showTextError('超出' + Math.ceil(t - 300) + '字');
          }
        } else {
          this.data.publishState = 'disabled';
          this._showTextError('不能发布空内容');
        }
      },
      _getStringLength: function (e) {
        e = e || '';
        e = e.replace(/^\n+|\n+$/g, '');
        return e.length;
      },
      onkeyup: function () {
        this.data.hasDoInput = !0;
        this._checkText();
      },
      _showTextError: function (e) {
        if (this.$refs.text)
          if (this.data.hasDoInput) {
            this.$refs.text.$refs.validation.data.message = e;
            this.$refs.text.$refs.validation.data.state = 'error';
            this.$refs.text.$refs.validation.$update();
          }
      },
      _hideTextError: function (e) {
        if (this.$refs.text) {
          this.$refs.text.$refs.validation.data.message = e;
          this.$refs.text.$refs.validation.data.state = '';
          this.$refs.text.$refs.validation.$update();
        }
      },
      _ongetChatroomNotice: function (e) {
        if (e) {
          if (void 0 !== e.result) e = e.result;
          this.data.content = e || '';
          if (!this.data.content) {
            this.data.mode = 'edit';
            this.$emit('modeChange', { mode: this.data.mode });
          }
        } else {
          this.data.content = '';
          this.data.mode = 'edit';
          this.$emit('modeChange', { mode: this.data.mode });
        }
        this.$update();
      },
      publish: function () {
        if ('disabled' != this.data.publishState)
          if (this.data.isTeacher) this._publish();
          else s.error('你已被撤销助教身份，无法发布公告');
      },
      _publish: function (e) {
        var t;
        if ('delete' == e) t = '';
        else t = this.data.content || '';
        this._cacheIns._$updateChatroomNotice(this.data.liveId, t, !0, this.data.account);
      },
      _clear: function () {
        this._cacheIns._$clearChatroomNotice(this.data.liveId, !0, this.data.account);
      },
      _onclearChatroomNotice: function (e) {
        if (e) {
          this.data.disabled = !0;
          s.success('公告清空成功');
          this.data.content = '';
          this.$update();
          setTimeout(
            function () {
              this._closeWnd();
            }._$bind(this),
            2e3,
          );
        } else s.error('公告清空失败');
      },
      _onupdateChatroomNotice: function (e) {
        if (e) {
          this.data.disabled = !0;
          s.success('新公告发布成功');
          this.$update();
          setTimeout(
            function () {
              this._closeWnd();
            }._$bind(this),
            2e3,
          );
        } else s.error('公告发布失败');
      },
      edit: function () {
        this.data.mode = 'edit';
        this.$emit('modeChange', { mode: this.data.mode });
      },
      cancel: function () {
        this._closeWnd();
      },
      delete: function (e) {
        t._$stop(e);
        if (this.data.isTeacher)
          o.confirm('确定要清空公告么？', null, '清空', '取消').$on(
            'ok',
            function () {
              this.confirmDelete();
            }._$bind(this),
          );
        else s.error('你已被撤销助教身份，无法清空公告');
      },
      confirmDelete: function () {
        if (this.data.isTeacher) this._clear();
        else s.error('你已被撤销助教身份，无法清空公告');
      },
      clickConfirm: function (e) {
        t._$stop(e);
      },
      closeWnd: function () {
        this._closeWnd();
      },
      _closeWnd: function () {
        if (this.data.isInClient) d.closeWnd();
        this.$emit('close');
      },
      _findLink: function (e) {
        var t = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/g;
        e = e.replace(/\n/g, '<br>');
        return e.replace(t, function (e) {
          return "<a href='" + e.toLowerCase() + "' target='_blank'>" + e.toLowerCase() + '</a>';
        });
      },
    });
    return _;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'abe9a6b99742882e8efaadd2518b0cb2',
  '6463f371a6962bf5bd93146f4b45826f',
  '57d0e394bea4b75c21a4479f11fff93f',
  '29f555f70e6e64cf8315ed720772ced1',
  '9f961e1b122ca368cb434ac017d3b23d',
  'da1668c9fa910f2a29d77345d1c9ac52',
  '9dc508f2eef931918f19fafe68ba902b',
  '523b00ec7cac452165425c44dde82923',
);
