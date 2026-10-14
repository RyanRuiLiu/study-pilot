EDU(
  'c05b94d8b8af4a92dbf100784275e06c',
  function (e, t, n, i, o, a, s, r, c) {
    var d = 'cache-im-webrtc',
      l = null;
    var _ = e._$klass();
    c = _._$extend(i.Cache);
    c.__init = function () {
      this._doFlushSetting(d, s);
      this.__super();
    };
    c._doLoadList = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-list', e);
    };
    c._doLoadItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-get', e);
    };
    c._doAddItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-create', e);
    };
    c._doDeleteItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-delete', e);
    };
    c._doUpdateItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-update', e);
    };
    c._doUpdateSort = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-sort', e);
    };
    r.getInstance = function (e) {
      var t = window.SDK.NIM;
      var n = window.WebRTC;
      if (!t || !n) return null;
      t.use(n);
      if (!l) l = n.getInstance(e);
      return l;
    };
    c.joinChannel = function (e) {
      n._$dispatchEvent(this.constructor, 'joinChannel', e);
    };
    c.leaveChannel = function (e) {
      n._$dispatchEvent(this.constructor, 'leaveChannel', e);
    };
    t._$$CustomEvent._$allocate({
      element: _,
      event: ['listchange', 'joinChannel', 'leaveChannel'],
    });
    r.$do = i.$do._$bind(null, _);
    r.Webrtc = _;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '53341ee840b3b128f705d2b577117815',
  '1217725aa1f7c67daf8018ca27120adc',
);
