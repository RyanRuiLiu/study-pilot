EDU(
  'ea3f5e83db4dc94c1e618ff6219e35d5',
  function (e) {
    var t = !e.isCh();
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('edu.u'),
      l;
    var _ = a._$pushCSSText(
      '    \t\t.#<uispace>{width:100%;padding-top:15px;}    \t\t.#<uispace> .tagCt{margin-bottom:6px;}    \t\t.#<uispace> .bar{padding:10px 0;}            .#<uispace> .time{padding-left:10px;}            .#<uispace> .opt{cursor:pointer;}            .#<uispace> .divider{color:#ddd;margin:0 5px;}            ',
    );
    var u = a._$addHtmlTemplate(
      '<div class="m-detailInfoItem f-pr">\t\t\t <div class="tagCt f-cb j-tagBox">             \t<div class="u-forumtag u-forumtag1 j-tagTopNode">${lang.KEY_LEARN_TOP}</div>             \t<div class="u-forumtag j-tagAgreeNode">${lang.KEY_LEARN_AGREE_AGREE}</div>             </div>\t\t\t<div class="f-richEditorText j-content"></div>\t\t\t<div class="bar f-cb">\t\t\t  <div class="f-fl name j-name"></div>\t\t\t  <div class="f-fl f-fc9 time j-time"></div>\t\t\t  <div class="f-fr j-manBox"></div>' +
        (t
          ? ''
          : '<a hidefocus="true" class="f-fr f-fc9 opt delBtn j-reportBtn">${lang.KEY_LEARN_REPORT_REPORT}</a><div class="f-fr divider">|</div>') +
        '<a hidefocus="true" class="f-fr f-fc9 opt delBtn j-delBtn">${lang.KEY_LEARN_DELETE_DELETE}</a>\t\t\t  <div class="j-delDivider f-fr divider">|</div>\t\t\t  <a hidefocus="true" class="f-fr f-fc9 opt cmtBtn j-cmtBtn">${lang.KEY_LEARN_COMMENT}(0)</a>\t\t\t  <div class="j-cmtDivider f-fr divider">|</div>\t\t\t  <div class="f-fr votebox j-vote"></div>\t\t\t</div>\t\t</div>',
    );
    d._$$DetailInfoItem = NEJ.C();
    l = d._$$DetailInfoItem._$extend(d._$$UIBase, !0);
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(u, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = _;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__timeLabel = a._$getByClassName(this.__body, 'j-time')[0];
      this.__delBtn = a._$getByClassName(this.__body, 'j-delBtn')[0];
      this.__cmtBtn = a._$getByClassName(this.__body, 'j-cmtBtn')[0];
      this.__reportBtn = a._$getByClassName(this.__body, 'j-reportBtn')[0];
      this.__delDivider = a._$getByClassName(this.__body, 'j-delDivider')[0];
      this.__cmtDivider = a._$getByClassName(this.__body, 'j-cmtDivider')[0];
      this.__contentNode = a._$getByClassName(this.__body, 'j-content')[0];
      this.__nameNode = a._$getByClassName(this.__body, 'j-name')[0];
      this.__voteNode = a._$getByClassName(this.__body, 'j-vote')[0];
      this.__manNode = a._$getByClassName(this.__body, 'j-manBox')[0];
      this.__tagBox = a._$getByClassName(this.__body, 'j-tagBox')[0];
      this.__tagTopNode = a._$getByClassName(this.__body, 'j-tagTopNode')[0];
      this.__tagAgreeNode = a._$getByClassName(this.__body, 'j-tagAgreeNode')[0];
      s._$addEvent(this.__reportBtn, 'click', this.__onReportHandle._$bind(this));
      s._$addEvent(this.__delBtn, 'click', this.__onDelHandle._$bind(this));
      s._$addEvent(this.__cmtBtn, 'click', this.__onCmtHandle._$bind(this));
      this.__forumDetailCache = new c._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onMarkAgree', this.__onManCb._$bind(this, 'onAgree'));
      this.__forumDetailCache._$addEvent('onMarkTop', this.__onManCb._$bind(this, 'onTop'));
      this.__forumDetailCache._$addEvent(
        'onCheckPosterInfo',
        this.__onManCb._$bind(this, 'onCheck'),
      );
    };
    l.__onReportHandle = function (e) {
      d._$$ReportDialog._$showDialog({ vo: this.__infoVo, type: this.__targetType });
    };
    l.__onManCb = function (e, t) {
      if (t) {
        switch (e) {
          case 'onCheck':
            if (this.__userUI) this.__userUI._$showUserMailInfo(t, n.termDto.id);
            break;
          case 'onAgree':
            this.__infoVo.tagAgree = !this.__infoVo.tagAgree;
            break;
          case 'onTop':
            this.__infoVo.tagTop = !this.__infoVo.tagTop;
        }
        this.__onUpdateItemMes();
      }
    };
    l.__onManHandle = function (e) {
      switch (e) {
        case 'onCheck':
          this.__forumDetailCache._$checkPosterInfo(
            this.__infoVo.postId,
            this.__infoVo.id,
            this.__targetType,
          );
          break;
        case 'onAgree':
          this.__forumDetailCache._$markAgree(
            this.__infoVo.postId,
            this.__infoVo.id,
            this.__targetType,
            !this.__infoVo.tagAgree,
          );
          break;
        case 'onTop':
          this.__forumDetailCache._$markTop(
            this.__infoVo.postId,
            this.__infoVo.id,
            this.__targetType,
            !this.__infoVo.tagTop,
          );
      }
    };
    l.__onUpdateItemMes = function () {
      if (this.__infoVo.tagTop || this.__infoVo.tagAgree) {
        d._$showNode(this.__tagBox);
        d._$hiddenNode(this.__tagTopNode);
        d._$hiddenNode(this.__tagAgreeNode);
        if (this.__infoVo.tagTop) d._$showNode(this.__tagTopNode);
        if (this.__infoVo.tagAgree) d._$showNode(this.__tagAgreeNode);
      } else d._$hiddenNode(this.__tagBox);
      if (this.__manUI) {
        this.__manUI._$setItemMes(
          'onTop',
          this.__infoVo.tagTop
            ? window.moocConfig.lang.KEY_LEARN_UNPIN
            : window.moocConfig.lang.KEY_LEARN_TOP,
        );
        this.__manUI._$setItemMes(
          'onAgree',
          this.__infoVo.tagAgree
            ? window.moocConfig.lang.KEY_LEARN_CANCEL_APPROVE
            : window.moocConfig.lang.KEY_LEARN_AGREE_AGREE,
        );
      }
    };
    l.__reset = function (e) {
      this.__supReset(e);
      this.__infoVo = e.infoVo;
      this.__targetType = e.type;
      this.__userDto = e.userDto || {};
      this.__timeLabel.innerText = d._$formatForumTime(this.__infoVo.gmtCreate);
      r._$renderRich(this.__contentNode, this.__infoVo.content || '');
      var t = this.__contentNode.getElementsByTagName('img');
      r._$forEach(
        t,
        function (e) {
          var t = e.getAttribute('src');
          if (t && t.indexOf('nos.netease.com') > -1 && t.indexOf('?imageView') < 0)
            e.src += '?imageView';
        }._$bind(this),
      );
      if (
        d._$isUserOwner(this.__userDto.id) &&
        d._$isForumJustShow() == d.CONST.FORUM_FORBID_NORMAL
      ) {
        d._$showNode(this.__delBtn);
        d._$showNode(this.__delDivider);
      } else {
        d._$hiddenNode(this.__delBtn);
        d._$hiddenNode(this.__delDivider);
      }
      if (
        d._$getCourseLecOrAssists(n.courseDto.lectorPanels, d._$getWebUser().id) ||
        d._$isOrdinaryEditorForCourse(n.courseDto.ordinaryEditors) ||
        d._$hasMemberRole(d.CONST.ROLE_OUT_COURSE_EDITOR) ||
        d._$hasMemberRole(d.CONST.ROLE_PLATFORM_ADMIN) ||
        d._$hasMemberRole(d.CONST.ROLE_FORUM_MANAGER)
      ) {
        d._$showNode(this.__manNode);
        this.__manUI = d._$$ManageItem._$allocate({
          parent: this.__manNode,
          showItems: ['onCheck', 'onTop', 'onAgree', 'onDel'],
          onTop: this.__onManHandle._$bind(this, 'onTop'),
          onAgree: this.__onManHandle._$bind(this, 'onAgree'),
          onCheck: this.__onManHandle._$bind(this, 'onCheck'),
          onDel: this.__onDelHandle._$bind(this),
        });
      } else d._$hiddenNode(this.__manNode);
      this.__onUpdateItemMes();
      if (e.showCmtBtn) {
        d._$showNode(this.__cmtBtn);
        d._$showNode(this.__cmtDivider);
      } else {
        d._$hiddenNode(this.__cmtBtn);
        d._$hiddenNode(this.__cmtDivider);
      }
      this.__userUI = d._$$UserItem._$allocate({
        parent: this.__nameNode,
        anonymous: this.__infoVo.anonymous,
        userDto: this.__userDto,
      });
      this.__voteUI = d._$$VoteItem._$allocate({
        parent: this.__voteNode,
        postId: this.__infoVo.postId,
        id: this.__infoVo.id,
        type: this.__targetType,
        dataVo: {
          voteCount: this.__infoVo.countVote,
          voteOpinion: this.__infoVo.hasVoteUp
            ? d.CONST.TALK_VOTE_DIGG
            : this.__infoVo.hasVoteDown
              ? d.CONST.TALK_VOTE_CAI
              : -1,
        },
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
    };
    l._$getOptBtnCnt = function () {
      var e = 1;
      if (d._$isNodeShown(this.__delBtn)) e++;
      if (d._$isNodeShown(this.__manNode)) e++;
      return e;
    };
    l._$updateCmtCount = function (e) {
      this.__cmtBtn.innerText = window.moocConfig.lang.KEY_LEARN_COMMENT + '(' + (e || 0) + ')';
    };
    l.__onCmtHandle = function () {
      this._$dispatchEvent('onCmt');
    };
    l.__onDelHandle = function () {
      this._$dispatchEvent('onDel');
    };
    l.__destroy = function () {
      if (this.__userUI) this.__userUI = d._$$UserItem._$recycle(this.__userUI);
      if (this.__voteUI) this.__voteUI = d._$$VoteItem._$recycle(this.__voteUI);
      if (this.__manUI) this.__manUI = d._$$ManageItem._$recycle(this.__manUI);
      this.__supDestroy();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7ae1049f52447f73129209d74071c691',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'c30834300a1390e7ec4f8432fef9123b',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '391bade1f824c8724e734dc7a3557f36',
  '7c0f38757da06c54ce1062cbacb9b5c1',
  'bbd38ff49a9c39da32c8f35626316f21',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
