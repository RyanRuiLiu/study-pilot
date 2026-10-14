EDU(
  '00e65dc54a873da784a2739b9020d5cd',
  function (e, t, n) {
    n.getEventType = function (e) {
      var n = {};
      if (t._$isString(e)) e = JSON.parse(e);
      n = t._$isString(e.content) ? JSON.parse(e.content) : e.content;
      return n.eventType;
    };
    n.getEventName = function (t) {
      var n = this.getEventType(t);
      return e.EVENT_TYPE_NAME_DICT[n];
    };
    n.getEventParam = function (e) {
      var n;
      if (t._$isString(e)) e = JSON.parse(e);
      n = t._$isString(e.content) ? JSON.parse(e.content) : e.content;
      return n;
    };
    n.isJoinChannelEvt = function (t) {
      var n = e.EVENT_TYPE_DICT,
        i = this.getEventType(t),
        o = [n.PRESENTER_AGREE_REQUEST_MICROPHONE, n.PRESENTER_CALL_REQUEST_MICROPHONE];
      return o.indexOf(i) !== -1;
    };
    n.isLeaveChannelEvt = function (t) {
      var n = e.EVENT_TYPE_DICT,
        i = this.getEventType(t),
        o = [n.USER_OFFLINE_MICROPHONE, n.PRESENTER_CALL_OFFLINE_MICROPHONE];
      return o.indexOf(i) !== -1;
    };
  },
  'bcf071761289ae1019dcc5e22b391493',
  'fe86216ed59e3103a56c42c850d389f0',
);
