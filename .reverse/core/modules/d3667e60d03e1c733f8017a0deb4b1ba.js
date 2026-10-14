EDU(
  'd3667e60d03e1c733f8017a0deb4b1ba',
  function (e, t, n, i, o, a, r) {
    var s = 'cache-live-user-answer-sheet';
    var c = null;
    var d = e._$klass();
    r = d._$extend(n.Cache);
    r.__init = function () {
      this._doFlushSetting(s, o);
      this.__super();
    };
    r.submitAnswerSheet = function (e) {
      this.__doSendRequest('user-answer-sheet-submit-answer-sheet', e);
    };
    r.submitAnswerSheetByQuiz = function (e) {
      this.__doSendRequest('user-answer-sheet-submit-answer-sheet-by-quiz', e);
    };
    r.getAnswerSheet = function (e) {
      this.__doSendRequest('user-answer-sheet-get-answer-sheet', e);
    };
    r.getAnswerResult = function (e) {
      this.__doSendRequest('user-answer-sheet-get-answer-result', e);
    };
    r._doLoadList = function (e) {
      this.__super(e);
      this.__doSendRequest('user-answer-sheet-list', e);
    };
    r._doLoadItem = function (e) {
      this.__super(e);
      this.__doSendRequest('user-answer-sheet-get', e);
    };
    r._doAddItem = function (e) {
      this.__super(e);
      this.__doSendRequest('user-answer-sheet-create', e);
    };
    r._doDeleteItem = function (e) {
      this.__super(e);
      this.__doSendRequest('user-answer-sheet-delete', e);
    };
    r._doUpdateItem = function (e) {
      this.__super(e);
      this.__doSendRequest('user-answer-sheet-update', e);
    };
    r._doUpdateSort = function (e) {
      this.__super(e);
      this.__doSendRequest('user-answer-sheet-sort', e);
    };
    t._$$CustomEvent._$allocate({ element: d, event: 'listchange' });
    a.$do = n.$do._$bind(null, d);
    a.UserAnswerSheet = d;
    a.setAnswerSheetInCache = function (e) {
      c = e;
    };
    a.getAnswerSheetInCache = function () {
      return c;
    };
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '7c8815458b04a869151e2d4bd9012394',
);
