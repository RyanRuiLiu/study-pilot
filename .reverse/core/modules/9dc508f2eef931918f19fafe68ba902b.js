EDU(
  '9dc508f2eef931918f19fafe68ba902b',
  function (e, t, n, i, o, a, r) {
    var s = e._$klass();
    r = s._$extend(n.Cache);
    var c = 'cache-live';
    r.__init = function () {
      this._doFlushSetting(c, o);
      this.__super();
    };
    r._doLoadList = function (e) {
      this.__doSendRequest('live-list', e);
    };
    r._doLoadItem = function (e) {
      this.__doSendRequest('live-get', e);
    };
    r._doAddItem = function (e) {
      this.__doSendRequest('live-create', e);
    };
    r._doDeleteItem = function (e) {
      this.__doSendRequest('live-delete', e);
    };
    r._doUpdateItem = function (e) {
      this.__doSendRequest('live-update', e);
    };
    r._$getLiveInitInfo = function (e) {
      this.__doSendRequest('live-getInitInfo', e);
    };
    r._$enter = function (e) {
      this.__doSendRequest('live-enter', e);
    };
    r._$getLiveInfo = function (e) {
      this.__doSendRequest('live-getInfo', e);
    };
    r._$getStraamUrl = function (e) {
      this.__doSendRequest('live-getStraamUrl', e);
    };
    r._$getChatCurrentMemberNum = function (e) {
      this.__doSendRequest('chat-getCurrentMemberNum', e);
    };
    r._$getChannelStatus = function (e) {
      var t = this;
      this.__doSendRequest('live-getChannelStatus', {
        data: { liveChannelId: e },
        onload: function (e) {
          t._$dispatchEvent('ongetChannelStatus', e);
        },
      });
    };
    r._$getChatroomNotice = function (e) {
      var t = this;
      this.__doSendRequest('live-chatroom-getnotice', {
        param: { liveId: e },
        onload: function (e) {
          t._$dispatchEvent('ongetChatroomNotice', e);
        },
      });
    };
    r._$deleteChatroomMessage = function (e) {
      this.__doSendRequest('live-chatroom-delete-message', {
        param: { liveId: e.liveId },
        data: { fromAccId: e.fromAccId, msgTimetag: e.msgTimetag },
        onload: e.onload._$bind(this),
      });
    };
    r._$updateChatroomNotice = function (e, t, n, i) {
      var o = this,
        n = void 0 == n ? !0 : n;
      this.__doSendRequest('live-chatroom-updatenotice', {
        param: { liveId: e },
        data: { content: t, broadcast: n, fromAccid: i },
        onload: function (e) {
          o._$dispatchEvent('onupdateChatroomNotice', e, null);
        },
        onerror: function (e) {
          o._$dispatchEvent('onupdateChatroomNotice', null, e);
        },
      });
    };
    r._$clearChatroomNotice = function (e, t, n) {
      var i = this,
        t = void 0 == t ? !0 : t;
      this.__doSendRequest('live-chatroom-updatenotice', {
        param: { liveId: e },
        data: { content: '', broadcast: t, fromAccid: n },
        onload: function (e) {
          i._$dispatchEvent('onclearChatroomNotice', e, null);
        },
        onerror: function (e) {
          i._$dispatchEvent('onclearChatroomNotice', null, e);
        },
      });
    };
    r._$roomMute = function (e, t, n) {
      this.__doSendRequest('live-chatroom-room-mute', {
        param: { liveId: e },
        data: { mute: t },
        onload: function (e) {
          n && n(e);
        },
      });
    };
    r._$getRoomMuteStatus = function (e, t) {
      this.__doSendRequest('live-chatroom-get-room-mute-status', {
        param: { liveId: e },
        data: { syn: !0 },
        onload: function (e) {
          t && t(e);
        },
      });
    };
    t._$$CustomEvent._$allocate({ element: s, event: 'listchange' });
    a.$do = n.$do._$bind(null, s);
    a.Live = s;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  'd8a791c8df530c3b5233baa074670ed6',
);
