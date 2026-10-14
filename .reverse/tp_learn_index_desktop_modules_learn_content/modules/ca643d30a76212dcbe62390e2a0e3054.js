EDU(
  'ca643d30a76212dcbe62390e2a0e3054',
  function (e, t, n, i, o, a, s) {
    var r = 'cache-live-interactive';
    var c = e._$klass();
    s = c._$extend(n.Cache);
    s.__init = function () {
      this._doFlushSetting(r, o);
      this.__super();
    };
    s._doLoadList = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-list', e);
    };
    s._doLoadItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-get', e);
    };
    s._doAddItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-create', e);
    };
    s._doDeleteItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-delete', e);
    };
    s._doUpdateItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-update', e);
    };
    s._doUpdateSort = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-sort', e);
    };
    s.getLiveInteractiveInfo = function (e) {
      this.__doSendRequest('live-interactive-info-get', e);
    };
    s.requestLiveInteractive = function (e) {
      this.__doSendRequest('live-interactive-microphone-request', e);
    };
    s.cancelLiveInteractive = function (e) {
      this.__doSendRequest('live-interactive-microphone-cancel', e);
    };
    s.informServer = function (e) {
      this.__doSendRequest('live-interactive-presenter-inform', e);
    };
    s.vcloudNoticeLive = function (e) {
      this.__doSendRequest('live-interactive-vcloudNoticeLive', e);
    };
    s.isUpdateVersion = function (e) {
      this.__doSendRequest('live-interactive-isUpdateVersion', e);
    };
    s.logLiveClientCrash = function (e) {
      this.__doSendRequest('live-interactive-liveClientCrash-log', e);
    };
    s.getScreenLocation = function (e) {
      e.data = e.data || {};
      e.data.queryKeys = ['layout'];
      this.__doSendRequest('live-interactive-getscreenlocation', e);
    };
    t._$$CustomEvent._$allocate({ element: c, event: 'listchange' });
    a.$do = n.$do._$bind(null, c);
    a.Interactive = c;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '7466ca8f1087578f6a02a7ef42f6a280',
);
