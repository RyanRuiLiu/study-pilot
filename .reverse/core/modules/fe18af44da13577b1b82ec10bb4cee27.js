EDU(
  'fe18af44da13577b1b82ec10bb4cee27',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = 'cache-im-im',
      p = null;
    var m = e._$klass();
    f = m._$extend(i.Cache);
    f.__init = function (e) {
      this._doFlushSetting(h, s);
      e = a.extend(e, {
        onconnect: this._onConnect._$bind(this),
        onmsgs: this._onMsgs._$bind(this),
        onerror: this._onError._$bind(this),
        onwillreconnect: this._onWillReconnect._$bind(this),
        ondisconnect: this._onDisconnect._$bind(this),
      });
      this.chatroom = window.Chatroom && window.Chatroom.getInstance(e);
      this.processors = this.getProcessorInstances();
      this.__super();
    };
    f._doLoadList = function (e) {
      this.__super(e);
      this.__doSendRequest('im-im-list', e);
    };
    f._doLoadItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-im-get', e);
    };
    f._doAddItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-im-create', e);
    };
    f._doDeleteItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-im-delete', e);
    };
    f._doUpdateItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-im-update', e);
    };
    f._doUpdateSort = function (e) {
      this.__super(e);
      this.__doSendRequest('im-im-sort', e);
    };
    f.getProcessorInstances = function () {
      var e = [];
      n._$forEach(c, function (t) {
        e.push(new t.Processor());
      });
      return e;
    };
    f.dispatchEvents = function (e) {
      for (var t in e) this._$dispatchEvent(e[t].eventName, e[t].data);
    };
    f.getYXEvent = function (e) {
      var t = l.YXTYPES;
      for (var n = 0; n < t.length; n++)
        if (e.type == t[n]) return new u.MsgEvent({ type: 'msgs:' + e.type });
      return null;
    };
    f.getDefEvent = function (e) {
      for (var t = 0, n; t < this.processors.length; t++)
        if ((n = this.processors[t].exec(e))) return n;
      return null;
    };
    f.filterMsgs = function (e) {
      for (var t = 0; t < e.length; t++) e[t].content && (e[t].content = JSON.parse(e[t].content));
    };
    f._onConnect = function (e) {
      console.log('连接成功:', e);
      this._$dispatchEvent._$bind(this, 'connect').apply(this, arguments);
    };
    f._onMsgs = function (e) {
      this.filterMsgs(e);
      this._$dispatchEvent('msgs', e);
      var t = d.buildEvents(e, this.getYXEvent);
      this.dispatchEvents(t);
      t = d.buildEvents(e, this.getDefEvent._$bind(this));
      this.dispatchEvents(t);
    };
    f._onError = function (e, t) {
      console.log('连接已断开:', e, t);
      this._$dispatchEvent._$bind(this, 'error').apply(this, arguments);
    };
    f._onWillReconnect = function (e) {
      console.log('即将重连:', e);
      this._$dispatchEvent._$bind(this, 'willReconnect').apply(this, arguments);
    };
    f._onDisconnect = function (e) {
      console.log('连接已断开', e);
      this._$dispatchEvent._$bind(this, 'disconnect').apply(this, arguments);
    };
    f.disconnect = function () {
      console.log('断开连接');
      this.chatroom.disconnect();
    };
    f.getHistoryMsgs = function (e, t) {
      this.chatroom.getHistoryMsgs({ limit: e || 20, done: t });
    };
    f.markChatroomGaglist = function (e, t, n) {
      this.chatroom.markChatroomGaglist({ account: e, isAdd: t, done: n });
    };
    f.queuePoll = function (e, t) {
      this.chatroom.queuePoll({ elementKey: e, done: t });
    };
    f.markChatroomManager = function (e, t, n) {
      this.chatroom.markChatroomManager({ account: e, isAdd: t, done: n });
    };
    f.addTeamManagers = function (e, t) {
      this.chatroom.addTeamManagers({ teamId: 123, accounts: ['a2', 'a3'], done: t });
    };
    f.getChatroomMembersInfo = function (e, t) {
      this.chatroom.getChatroomMembersInfo({ accounts: e, done: t });
    };
    f.getChatroomMembers = function (e) {
      this.chatroom.getChatroomMembers({ guest: !1, limit: 100, done: e });
    };
    f.sendText = function (e, t, n) {
      var i = l.LIVE_MEMBER_TYPE_DICT[e.toUpperCase()];
      this.chatroom.sendText({ custom: JSON.stringify({ type: i || -2 }), text: t, done: n });
    };
    f.sendCustomMsg = function (e, t) {
      this.chatroom.sendCustomMsg({ content: JSON.stringify(e), skipHistory: !0, done: t });
    };
    f.sendTipMsg = function (e, t) {
      this.chatroom.sendTipMsg({ tip: e, done: t });
    };
    f.getChatroom = function (e) {
      this.chatroom.getChatroom({ done: e });
    };
    f.previewFile = function (e, t) {
      var n = this;
      this.chatroom.previewFile({
        type: 'image',
        fileInput: e,
        uploadprogress: function (e) {},
        done: function (e, i) {
          if (!(i && i.size && i.size / 1048576 > 15))
            if (!e)
              var o = this.chatroom.sendFile({
                scene: 'team',
                to: n.chatroomId,
                type: 'image',
                file: i,
                uploaderror: function () {},
                uploaddone: function (e, t) {},
                done: t,
              });
            else t(e);
          else t('bigPic');
        }._$bind(this),
      });
    };
    f.sendFile = function (e, t, n, i) {
      this.chatroom.sendFile({
        scene: 'p2p',
        to: 'account',
        file: n,
        uploaderror: function () {
          console && console.log('上传失败');
        },
        uploaddone: function (e, t) {
          console.log(e);
          console.log(t);
          console.log('上传' + (!e ? '成功' : '失败'));
        },
        beforesend: function (e) {
          console && console.log('正在发送消息, id=' + e);
        },
        done: i,
      });
    };
    f.destroyInstance = function () {
      p = null;
    };
    m.getInstance = function () {
      return this._$getInstance.apply(this, arguments);
    };
    t._$$CustomEvent._$allocate({ element: m, event: 'listchange' });
    _.getInstance = function (e) {
      if (!p) p = _.Im._$allocate(e);
      return p;
    };
    _.$do = i.$do._$bind(null, m);
    _.Im = m;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  'fe86216ed59e3103a56c42c850d389f0',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '268c3257e756ea058b7f5849ce71559d',
  '156c038faab14ce9028ea6a967a3e6c0',
  'fc967f3dfecf3e35cde59184a8b42b74',
  '455721c4796cc9bc7e22b59924dbe89d',
  'aa4573f12aff14ef5eb071010a13bcd5',
  '6182651a6f54d23eace06c6446bb3dcb',
);
