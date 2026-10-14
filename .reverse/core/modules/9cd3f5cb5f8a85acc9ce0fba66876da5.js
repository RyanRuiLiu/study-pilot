EDU(
  '9cd3f5cb5f8a85acc9ce0fba66876da5',
  function (e, t, n, i, o, a, r, s, c) {
    var d = e._$klass();
    c = d._$extend(n.Cache);
    c.__init = function () {
      this._doFlushSetting(a.SETTING_KEY, r);
      var e = {};
      e[a.SETTING_KEY] = r;
      i.batch(e);
      this.__super();
    };
    c.__formatCommentItemAfterVote = function (e, t, n) {
      if (e) {
        n.upvote = t ? null : a.VOTE_TYPE.UPVOTE;
        if (t) n.agreeCount--;
        else n.agreeCount++;
      }
      return n;
    };
    s.$do = n.$do._$bind(null, d);
    c.getCommentList = function (e, t, n, i, r, s) {
      this.__doSendRequest(a.REQUEST_KEYS.LIST, {
        data: o._$deepCleanObj({
          courseId: e,
          termId: t,
          pageIndex: n,
          pageSize: r || a.DEFAULT_PAGE_SIZE,
          orderBy: s || a.ORDER_RULES.MULTI_RULES,
        }),
        onload: i,
      });
    };
    c.deleteComment = function (e, t, n) {
      this.__doSendRequest(a.REQUEST_KEYS.DELETE, {
        data: o._$deepCleanObj({ evaluateId: e, commentorId: t }),
        onload: n,
      });
    };
    c.changeCommentVoteStatus = function (e, t, n, i, r) {
      this.__doSendRequest(a.REQUEST_KEYS.VOTE, {
        data: o._$deepCleanObj({ evaluateId: e, agree: t, isCancel: n }),
        onload: function (e) {
          r(e, this.__formatCommentItemAfterVote(e, n === a.CANCEL_TYPE.CANCEL_UPVOTE, i));
        }._$bind(this),
      });
    };
    c.getCanPostComment = function (e, t, n) {
      this.__doSendRequest(a.REQUEST_KEYS.CAN_POST, {
        data: o._$deepCleanObj({ termId: t, courseId: e }),
        onload: n,
      });
    };
    c.postComment = function (e, t, n, i, r, s) {
      this.__doSendRequest(a.REQUEST_KEYS.POST_COMMENT, {
        data: o._$deepCleanObj({ mark: e, content: t, evaluateId: n, termId: r, courseId: i }),
        onload: s,
      });
    };
    c.getAverageRatingAndCount = function (e, t) {
      this.__doSendRequest(a.REQUEST_KEYS.GET_AVERAGE_RATING_AND_COUNT, {
        data: o._$deepCleanObj({ courseId: e }),
        onload: t,
      });
    };
    s.CourseComment = d;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '2c94f4a525e970341087318fd0b94823',
  '5147903096318e5db3d048c483fc6b12',
  'c88089dfaf13686b510f6763b0beacfb',
);
