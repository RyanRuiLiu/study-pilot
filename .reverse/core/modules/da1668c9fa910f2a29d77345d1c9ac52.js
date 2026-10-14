EDU('da1668c9fa910f2a29d77345d1c9ac52', function () {
  var e = window;
  e.bridge = e.bridge || {};
  e.bridge._eventListeners = {};
  var t = {
    ON_DOM_READY: 'onDomReady',
    ON_BRIDGE_READY: 'onBridgeReady',
    SEND_CUSTOM_MSG: 'sendCustomMsg',
    NOTIFY_CHECK_UPDATE_RESULT: 'notifyCheckUpdateResult',
    NOTIFY_LIVE_STATUS_RESPONSE: 'notifyLiveStatusResponse',
    SHOW_MSG_BOX: 'showMsgBox',
    ON_WND_CLOSE: 'onWndClose',
    ON_USER_INFO: 'onUserInfo',
    SHOW_BACK_BTN: 'showBackBtn',
    SHOW_NOTICE_WND: 'showNoticeWnd',
    VIEW_CHATROOM_IMAGE: 'viewChatroomImage',
  };
  var n = {
    CLIENT_INIT: 'loginChatroom',
    QUEUE_CHANGE: 'notifyQueueChange',
    VOLUME: 'notifyVolume',
    CUSTOM_MSG: 'notifyCustomMsg',
    CHECK_UPDATE: 'checkUpdate',
    LIVE_STATUS: 'notifyLiveStatus',
    CRASH_REPORT: 'notifyCrashReport',
  };
  var i = function (t, n) {
    e.bridge._eventListeners[t] && e.bridge._eventListeners[t](n);
  };
  e.bridge.loginChatroom = function (e) {
    i(n.CLIENT_INIT, JSON.parse(e));
  };
  e.bridge.notifyQueueChange = function (e) {
    i(n.QUEUE_CHANGE, JSON.parse(e));
  };
  e.bridge.notifyVolume = function (e) {
    i(n.VOLUME, JSON.parse(e));
  };
  e.bridge.notifyCustomMsg = function (e) {
    i(n.CUSTOM_MSG, JSON.parse(e));
  };
  e.bridge.checkUpdate = function (e) {
    i(n.CHECK_UPDATE, JSON.parse(e));
  };
  e.bridge.notifyLiveStatus = function (e) {
    i(n.LIVE_STATUS, JSON.parse(e));
  };
  e.bridge.notifyCrashReport = function (e) {
    i(n.CRASH_REPORT, JSON.parse(e));
  };
  return {
    isInEudLive: function () {
      var e = !1;
      var t = navigator.userAgent.toLowerCase();
      if (t.indexOf('edulive') != -1) e = !0;
      return e;
    },
    sendMsg: function (e, n) {
      if (window.NimCefWebFunction)
        window.NimCefWebFunction(
          JSON.stringify({ functionName: n || t.SEND_CUSTOM_MSG, param: e }),
        );
      else console.error('客户端尚未注入，无法执行');
    },
    sendMsgs: function (e) {
      e.forEach(function (e) {
        this.sendMsg(e);
      });
    },
    DOMReady: function () {
      this.sendMsg('', t.ON_DOM_READY);
    },
    bridgeReady: function (e) {
      this.sendMsg({ status: e }, t.ON_BRIDGE_READY);
    },
    closeWnd: function () {
      this.sendMsg('', t.ON_WND_CLOSE);
    },
    showBackBtn: function (e) {
      this.sendMsg({ visible: e }, t.SHOW_BACK_BTN);
    },
    showNoticeWnd: function (e, n) {
      this.sendMsg(
        { title: '', width: 420, height: n, query: e ? 'mode=' + e : '' },
        t.SHOW_NOTICE_WND,
      );
    },
    viewChatroomImage: function (e) {
      this.sendMsg({ url: e }, t.VIEW_CHATROOM_IMAGE);
    },
    sendCustomMsg: function (e) {
      this.sendMsg(e, t.SEND_CUSTOM_MSG);
    },
    notifyCheckUpdateResult: function (e) {
      this.sendMsg(e, t.NOTIFY_CHECK_UPDATE_RESULT);
    },
    notifyLiveStatusResponse: function (e) {
      this.sendMsg(e, t.NOTIFY_LIVE_STATUS_RESPONSE);
    },
    showMsgBox: function (e) {
      this.sendMsg(e, t.SHOW_MSG_BOX);
    },
    onUserInfo: function (e) {
      this.sendMsg(e, t.ON_USER_INFO);
    },
    CEF_EVENT_DICT: n,
    on: function (t, n) {
      e.bridge._eventListeners[t] = n;
    },
    off: function (t) {
      delete e.bridge._eventListeners[t];
    },
  };
});
