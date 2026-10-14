EDU(
  '9a447a3b597e896dca4aac83e1c86427',
  function (e, t, n, i, o, a) {
    var r = e._$klass();
    a = r._$extend(t._$$EventTarget);
    a.__init = function (e) {
      this.__super(e);
    };
    a.__reset = function (e) {
      this.__super(e);
    };
    a.__destroy = function () {
      this._doClearRet();
      this.__super();
    };
    a.dispatchByMsg = function (e) {
      var t = i.getEventName(e),
        o = i.isJoinChannelEvt(e),
        a = i.isLeaveChannelEvt(e),
        r = i.getEventParam(e);
      if (o) {
        console.log('加入房间');
        this._$dispatchEvent(n.EVENT_NAME_DICT.EVT_INTERACTIVE_JOIN_CHANNEL, r);
      } else if (a) {
        console.log('离开房间');
        this._$dispatchEvent(n.EVENT_NAME_DICT.EVT_INTERACTIVE_LEAVE_CHANNEL, r);
      } else this._$dispatchEvent(t, r);
    };
    return r._$allocate({});
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'bcf071761289ae1019dcc5e22b391493',
  '00e65dc54a873da784a2739b9020d5cd',
);
