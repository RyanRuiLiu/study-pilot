EDU(
  '8eb6c5c05557c81b78bf50f441e3f28c',
  function (e, t, n, i, o, a, s) {
    var r = a.isEn();
    var c = (window.moocConfig || {}).lang || {};
    var d = NEJ.P('edu.u');
    var l = 'true' === window.isMobilePhone ? o : i;
    s.BanUserUtil = e._$klass();
    var _ = s.BanUserUtil.prototype;
    _.__init = function (e) {
      e = e || {};
      this.__forumCache = new t._$$COM_Cache_ForumDetailCache();
    };
    _.__onBan = function (e, t, n, i) {
      if (i) {
        d.showToastTips({
          type: 1,
          content:
            (n ? '' : c.KEY_LEARN_DELETE) +
            c.KEY_LEARN_NO +
            (i ? c.KEY_LEARN_SUCCESS : c.KEY_LEARN_FAILED),
        });
        if (t) t(e, !!n);
      }
    };
    _.__onGetBanStatus = function (e, t, n, i) {
      var o = i[0];
      var a = i[1];
      if (e)
        if (1 == o) n();
        else t();
      else if (1 == a) n();
      else t();
    };
    _.changeUserBanStatus = function (e, t, n, i, o) {
      var a = this.__onBan._$bind(this, t, o, n);
      var s = function () {
        if (t) this.__forumCache._$setUserBannedForSite(e, c, a);
        else this.__forumCache._$setUserBannedForTerm(e, i, c, a);
      }._$bind(this);
      var c = n ? 1 : 0;
      if (n)
        if (r) s();
        else
          new l({
            data: {
              title: '你确认' + (n ? '将' : '解除') + '该用户禁言吗？',
              content:
                '确认后该用户将' +
                (n ? '无法' : '可以') +
                '在' +
                (t ? '所有' : '课程') +
                '讨论区发表主题、回复、评论',
              cancelButton: !0,
            },
          }).$on(
            'ok',
            function () {
              s();
            }._$bind(this),
          );
      else s();
    };
    _.checkIsBanned = function (e, t, n) {
      var i = !t;
      if (d._$isUserLogin()) {
        t = t || -1;
        e = e || function () {};
        n =
          n ||
          function () {
            var e = r
              ? 'You are forbidden to post any content in the Discussion Forum.'
              : '您已被讨论区管理员禁言，无法发表任何主题、回复、评论、关注或者对帖子进行投票。如有疑问请<a href="//www.icourse163.org/about/contactus.htm#/contactus?type=2">联系我们</a>。';
            l.alert(e, c.KEY_LEARN_PROMPT || '提示');
          };
        this.__forumCache._$checkUserBannedList(
          -1,
          this.__onGetBanStatus._$bind(
            this,
            !0,
            function () {
              if (!i)
                this.__forumCache._$checkUserBannedList(
                  t,
                  this.__onGetBanStatus._$bind(this, !1, e, n),
                );
              else e();
            }._$bind(this),
            n,
          ),
        );
      } else d._$$LoginDialog._$showLogin({ from: 'forum' });
    };
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'cc26d5920093e9742f0feca3855e8e68',
  'd414623f7407e577cd6c05efff08e96f',
  'd02f606099112f5cede2764ed0c329fb',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
);
