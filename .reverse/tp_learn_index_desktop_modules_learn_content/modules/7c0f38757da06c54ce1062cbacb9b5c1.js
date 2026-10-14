EDU(
  '7c0f38757da06c54ce1062cbacb9b5c1',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.u'),
      d;
    var l = a._$pushCSSText(
      '        .#<uispace> div{cursor:pointer;width:15px;height:15px;background: url(' +
        n.imageUrlMap.forum_icon_sprite +
        ') no-repeat -4999px -4999px;}        .#<uispace> .num{color:#666;line-height:15px;max-width:45px;margin:0 3px;}        .#<uispace> .up{ background-position:2px -22px;}        .#<uispace> .up.hvr:hover{ background-position:-15px -22px;}        .#<uispace> .up.voted{ background-position:-33px -22px;}        .#<uispace> .down{ background-position:2px -44px;}        .#<uispace> .down.hvr:hover{ background-position:-15px -44px;}        .#<uispace> .down.voted{ background-position:-33px -44px;}        ',
    );
    var _ = a._$addNodeTemplate(
      '<div class="f-cb">    \t\t<div class="up f-fl j-up"></div>    \t\t<p class="num f-fl f-thide j-num"></p>    \t\t<div class="down f-fl j-down"></div>       </div>',
    );
    c._$$VoteItem = NEJ.C();
    d = c._$$VoteItem._$extend(c._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = _;
      this.__seed_css = l;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__upbtn = a._$getByClassName(this.__body, 'j-up')[0];
      this.__numLabel = a._$getByClassName(this.__body, 'j-num')[0];
      this.__downbtn = a._$getByClassName(this.__body, 'j-down')[0];
      s._$addEvent(this.__upbtn, 'click', this.__voteHandle._$bind(this, c.CONST.TALK_VOTE_DIGG));
      s._$addEvent(this.__downbtn, 'click', this.__voteHandle._$bind(this, c.CONST.TALK_VOTE_CAI));
      this.__forumDetailCache = new r._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onVote', this.__onVoteCb._$bind(this));
    };
    d.__voteHandle = function (e, i) {
      if (c._$isUserLogin()) {
        if (0 == n.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        s._$stop(i);
        this.__clickOpinion = e;
        this.__forumDetailCache._$talkVote(
          this.__postId,
          this.__id,
          this.__type,
          this.__clickOpinion,
          this.__dataVo.voteOpinion === this.__clickOpinion ? 1 : 0,
        );
      } else c._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__onVoteCb = function (e) {
      if (null != e) {
        var t = 0;
        var n = this.__clickOpinion;
        if (this.__dataVo.voteOpinion < 0) t = 1;
        else if (this.__clickOpinion != this.__dataVo.voteOpinion) t = 2;
        else {
          n = -1;
          t = -1;
        }
        this.__dataVo.voteOpinion = n;
        if (this.__clickOpinion == c.CONST.TALK_VOTE_DIGG) this.__dataVo.voteCount += t;
        else if (this.__clickOpinion == c.CONST.TALK_VOTE_CAI) this.__dataVo.voteCount -= t;
        this.__onSetState();
        this._$dispatchEvent('onVote', {
          voteOpinion: this.__dataVo.voteOpinion,
          targetId: this.__id,
          targetType: this.__type,
        });
      } else c.showToastTips({ type: 2, content: window.moocConfig.lang.KEY_LEARN_VOTE_FAILED });
    };
    d.__onSetState = function () {
      this.__dataVo.voteCount = this.__dataVo.voteCount || 0;
      this.__numLabel.innerText = c._$formatNum(this.__dataVo.voteCount);
      this.__numLabel.title = this.__dataVo.voteCount;
      a._$delClassName(this.__upbtn, 'voted');
      a._$delClassName(this.__downbtn, 'voted');
      a._$addClassName(this.__upbtn, 'hvr');
      a._$addClassName(this.__downbtn, 'hvr');
      this.__upbtn.title = window.moocConfig.lang.KEY_LEARN_UPVOTE;
      this.__downbtn.title = window.moocConfig.lang.KEY_LEARN_DISLIKE;
      if (this.__dataVo.voteOpinion == c.CONST.TALK_VOTE_DIGG) {
        a._$delClassName(this.__upbtn, 'hvr');
        a._$addClassName(this.__upbtn, 'voted');
        this.__upbtn.title = window.moocConfig.lang.KEY_LEARN_CANCEL_LIKE;
      } else if (this.__dataVo.voteOpinion == c.CONST.TALK_VOTE_CAI) {
        a._$delClassName(this.__downbtn, 'hvr');
        a._$addClassName(this.__downbtn, 'voted');
        this.__downbtn.title = window.moocConfig.lang.KEY_LEARN_CANCEL_DISLIKE;
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__postId = e.postId;
      this.__id = e.id;
      this.__type = e.type;
      this.__dataVo = e.dataVo;
      this.__onSetState();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '1c23b43dfd9c054559909485b4169fa4',
  '342ad7ae4eea50c3cad860686650a915',
  '865336bdee3def2e90e635383cc1e284',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '93828627ddb358ed890cb65967a0c1de',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
