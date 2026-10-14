EDU(
  'f89bf7955a392302db95e1359fe83de6',
  function (e, t, n, i) {
    var o = (window.moocConfig || {}).lang || {};
    var a = !i.isCh();
    var s = window,
      r = NEJ.F,
      c = NEJ.P('nej.e'),
      d = NEJ.P('nej.v'),
      l = NEJ.P('nej.u'),
      _ = NEJ.P('edu.d'),
      u = NEJ.P('edu.u'),
      f = s.isSpoc,
      h;
    var p = c._$pushCSSText(
      '\t\t.#<uispace>{background-color:#f8f8f8;padding:10px 20px;}            .#<uispace> .title{max-width:68%;word-break:break-word;}            .#<uispace> .content{padding-top:10px;}\t.#<uispace> .infobar{padding:10px 0;border-bottom:1px solid #eee;}            .#<uispace> .infobar .time{padding:0 10px;}            .#<uispace> .optbar{padding-top:10px;}            .#<uispace> .optBox,.#<uispace> .votebox{margin-top:5px;}            .#<uispace> .optBox .divider{color:#ddd;margin:0 5px;}            .#<uispace> .optbar a.u-btn-sm{line-height:18px;}            .#<uispace> .optbar a i{vertical-align:-3px;display:inline-block;width:20px;height:16px;background:url(' +
        s.imageUrlMap.forum_icon_sprite +
        ') no-repeat -4999px -4999px;}            .#<uispace> .optbar .replyBtn i{background-position: -54px 1px;}            .#<uispace> .followBtn{margin-right:10px;}            .#<uispace> .optbar .followBtn.unfollowed i{background-position: -78px 0;}            .#<uispace> .optbar .followBtn.unfollowed .second,.#<uispace> .optbar .followBtn.unfollowed .secHvr{display:none;}            .#<uispace> .optbar .followBtn.followed i{background-position: -53px -24px;}            .#<uispace> .optbar .followBtn.followed .first,.#<uispace> .optbar .followBtn.followed .secHvr{display:none;}            .#<uispace> .optbar .followBtn.followed:hover .second{display:none;}            .#<uispace> .optbar .followBtn.followed:hover .secHvr{display:inline-block;padding-left:8px;}            ',
    );
    var m = c._$addHtmlTemplate(
      '<div>\t\t\t<div class="f-cb"> <h3 class="j-title title f-fl"></h3>\t<a class="f-fr u-btn u-btn-sm u-btn-default j-transBtn" style="display:none">迁移至“过往学期精华贴”</a>\t<div class="f-cb f-fr j-tagBox">\t<div class="u-forumtag u-forumtag1 j-tagTopNode">${lang.KEY_LEARN_TOP}</div>\t<div class="u-forumtag j-tagAgreeNode">${lang.KEY_LEARN_AGREE_AGREE}</div>                <div class="u-forumtag j-tagSolveNode">${lang.KEY_LEARN_SOLVED}</div>                <div class="u-forumtag j-tagTeacherNode">${lang.KEY_LEARN_LECTURER_PARTICIPATION}</div></div></div>\t\t\t<div class="content f-richEditorText j-content"></div><div class="infobar f-cb"><div class="j-infoBox"><div class="f-fl name j-name"></div><div class="f-fl f-fc9 time j-time"></div></div><div class="f-fl f-fc9 j-fromUnitBox">${lang.KEY_LEARN_FROM_DOCUMENTS}“<a class="j-fromUnit f-fcgreen"></a>”</div>\t\t\t</div>\t\t\t<div class="optbar f-cb">            <div class="j-share f-fl"></div><div class="f-cb f-fr optBox j-optBox"><div class="f-fl j-editDivider divider">|</div><a hidefocus="true" class="f-fl f-fc9 editBtn j-editBtn">${lang.KEY_LEARN_EDIT}</a>' +
        (a
          ? ''
          : '<div class="f-fl divider">|</div><a hidefocus="true" class="f-fl f-fc9 editBtn j-reportBtn">${lang.KEY_LEARN_REPORT_REPORT}</a>') +
        '<div class="f-fl j-manBox"></div></div><div class="f-fr votebox j-vote"></div>              <a hidefocus="true" class="replyBtn u-btn u-btn-sm j-replyBtn f-fr"><span><i></i>${lang.KEY_LEARN_REPLY2}</span></a>              <a hidefocus="true" class="followBtn u-btn u-btn-sm j-followBtn f-fr">                <span class="first j-followInner"><i></i>${lang.KEY_LEARN_ATTENTION}</span>                <span class="second j-followInner"><i></i>${lang.KEY_LEARN_FOLLOWED}</span>                <span class="secHvr j-followInner">${lang.KEY_LEARN_UNFOLLOW}</span>             </a>\t\t\t</div>\t\t</div>',
    );
    u._$$PostItem = NEJ.C();
    h = u._$$PostItem._$extend(u._$$UIBase, !0);
    h.__initXGui = function () {
      this.__seed_html = c._$addNodeTemplate(
        c._$getHtmlTemplate(m, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = p;
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = c._$getByClassName(this.__body, 'j-title')[0];
      this.__contentNode = c._$getByClassName(this.__body, 'j-content')[0];
      this.__timeLabel = c._$getByClassName(this.__body, 'j-time')[0];
      this.__nameNode = c._$getByClassName(this.__body, 'j-name')[0];
      this.__voteNode = c._$getByClassName(this.__body, 'j-vote')[0];
      this.__optBox = c._$getByClassName(this.__body, 'j-optBox')[0];
      this.__editBtn = c._$getByClassName(this.__body, 'j-editBtn')[0];
      this.__editDivider = c._$getByClassName(this.__body, 'j-editDivider')[0];
      this.__reportBtn = c._$getByClassName(this.__body, 'j-reportBtn')[0];
      this.__followBtn = c._$getByClassName(this.__body, 'j-followBtn')[0];
      this.__followInners = c._$getByClassName(this.__body, 'j-followInner');
      this.__replyBtn = c._$getByClassName(this.__body, 'j-replyBtn')[0];
      this.__manNode = c._$getByClassName(this.__body, 'j-manBox')[0];
      this.__tranferBtn = c._$getByClassName(this.__body, 'j-transBtn')[0];
      this.__tagBox = c._$getByClassName(this.__body, 'j-tagBox')[0];
      this.__tagTopNode = c._$getByClassName(this.__body, 'j-tagTopNode')[0];
      this.__tagAgreeNode = c._$getByClassName(this.__body, 'j-tagAgreeNode')[0];
      this.__tagSolveNode = c._$getByClassName(this.__body, 'j-tagSolveNode')[0];
      this.__tagTeacherNode = c._$getByClassName(this.__body, 'j-tagTeacherNode')[0];
      this.__infoBox = c._$getByClassName(this.__body, 'j-infoBox')[0];
      this.__fromUnitBox = c._$getByClassName(this.__body, 'j-fromUnitBox')[0];
      this.__fromUnitNode = c._$getByClassName(this.__body, 'j-fromUnit')[0];
      d._$addEvent(this.__editBtn, 'click', this.__onEditHandle._$bind(this));
      d._$addEvent(this.__reportBtn, 'click', this.__onReportHandle._$bind(this));
      d._$addEvent(this.__followBtn, 'click', this.__onFollowHandle._$bind(this));
      d._$addEvent(this.__replyBtn, 'click', this.__onReplyHandle._$bind(this));
      this.__banUserUtil = new e.BanUserUtil();
      this.__shareNode = c._$getByClassName(this.__body, 'j-share')[0];
      this.__newTermId = s.newTermId;
      d._$addEvent(
        this.__tranferBtn,
        'click',
        function () {
          if (!this.__onTransfer) {
            this.__forumDetailCache._$copyGoodPost(
              this.__postVo.termId,
              this.__postVo.id,
              this.__newTermId,
            );
            this.__onTransfer = !0;
          }
        }._$bind(this),
      );
      this.__forumDetailCache = new _._$$COM_Cache_ForumDetailCache();
      this.__commonCache = new _._$$COM_Cache_commonCache();
      this.__forumDetailCache._$addEvent('onDelPost', this.__onDelPostCb._$bind(this));
      this.__forumDetailCache._$addEvent(
        'onFollowPost',
        this._$followStatusHandle._$bind(this, !0),
      );
      this.__forumDetailCache._$addEvent(
        'onCancelFollowPost',
        this._$followStatusHandle._$bind(this, !1),
      );
      this.__forumDetailCache._$addEvent(
        'onCheckPosterInfo',
        this.__onManCb._$bind(this, 'onCheck'),
      );
      this.__forumDetailCache._$addEvent('onMarkAgree', this.__onManCb._$bind(this, 'onAgree'));
      this.__forumDetailCache._$addEvent('onMarkTop', this.__onManCb._$bind(this, 'onTop'));
      this.__forumDetailCache._$addEvent('onMarkSolve', this.__onManCb._$bind(this, 'onResolve'));
      this.__forumDetailCache._$addEvent('onCopyGoodPost', this.__onCopyGoodPost._$bind(this));
      d._$addEvent(
        this.__shareNode,
        'click',
        function () {
          var e = {
            url: s.location.href,
            uid: s.webUser ? s.webUser.id : -1,
            stat_id: this.__postVo.id,
            stat_type: 18,
          };
          e['action'] = 'MOC_ACTIVITY_SHARE';
          this.__commonCache._$addGaLog({
            dt: this.__strToHexCharCode(JSON.stringify(e)).substr(2),
            p: 'mooc',
          });
        }._$bind(this),
      );
      this.hideByLanguage();
    };
    h.hideByLanguage = function () {
      if (!i.isCh()) this.__shareNode.style.display = 'none';
    };
    h.__strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    };
    h.__genShareUI = function () {
      if (this.__shareUI) this.__shareUI.destroy();
      var e = s.courseDto,
        t = [
          'MOOC是全新完整的教学模式--定期开课、简短视频，提交作业，学完还能考取认证证书，更可以结交到新朋友！',
          window.moocConfig.lang.KEY_LEARN_RECOMMEND_EVERYONE,
          '我在#中国大学MOOC#平台上学习，',
        ];
      var i = f
          ? t[2]
          : this.__postVo.title +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        o = f
          ? t[2]
          : this.__postVo.title +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        a = f ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，';
      var r = '';
      if (s.activityNotEnd && s.webUser)
        r =
          '//www.icourse163.org' +
          s.location.pathname +
          '/wapForumDetail/?pid=' +
          this.__postVo.id +
          '&inviterId=' +
          s.webUser.id +
          '&activityId=' +
          s.activityId +
          '&isWebShare=1';
      else
        r =
          '//www.icourse163.org' + s.location.pathname + '/wapForumDetail/?pid=' + this.__postVo.id;
      if (!s.hideTermShare)
        this.__shareUI = new n({
          data: {
            title: i,
            topic: o + t[1],
            description: a + t[0],
            pic: s.termDto.bigPhoto,
            url: window.location.protocol + (f ? '//www.icourse163.org' : r),
            weixinQR: '',
            model: 0,
          },
        }).$inject(this.__shareNode);
    };
    h.__onCopyGoodPost = function (e) {
      var t = window.moocConfig.lang.KEY_LEARN_HAS_POSTS,
        n = 1;
      this.__onTransfer = !1;
      if (!e) {
        t = window.moocConfig.lang.KEY_LEARN_MIGRATION_FAILED;
        n = 2;
      }
      u.showToastTips({ type: n, content: t });
    };
    h.__onReportHandle = function () {
      if (u._$isUserLogin()) {
        if (0 == s.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        u._$$ReportDialog._$showDialog({ vo: this.__postVo, type: u.CONST.TALK_VOTE_POST });
      } else u._$$LoginDialog._$showLogin({ from: 'forum' });
    };
    h.__onDelPostCb = function (e) {
      if (e) s.dispatcher._$redirect(u.umi('learnForumIndex'));
    };
    h.__onDelHandle = function () {
      u._$$CommonDialog._$showDialog({
        type: 1,
        message: '<b>' + o.KEY_LEARN_ARE_POST + '</b><p>' + o.KEY_LEARN_ALL_CONFIRMING + '</p>',
        okFunc: function () {
          this.__forumDetailCache._$delPost(this.__postVo.id);
        }._$bind(this),
        cancelFunc: r._$bind(this),
        focusNum: 1,
      });
    };
    h._$followStatusHandle = function (e) {
      u._$showNode(this.__followBtn);
      this.__postVo.hasFollowed = !!e;
      c._$delClassName(this.__followBtn, 'followed unfollowed');
      if (e) c._$addClassName(this.__followBtn, 'followed');
      else c._$addClassName(this.__followBtn, 'unfollowed');
    };
    h.__onFollowHandle = function () {
      if (u._$isUserLogin()) {
        if (0 == s.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        if (!(u._$isForumJustShow() > 0))
          if (this.__postVo.hasFollowed)
            this.__forumDetailCache._$cancelFollowPost(this.__postVo.id);
          else this.__forumDetailCache._$followPost(this.__postVo.id);
        else this._$dispatchEvent('onBanned');
      } else u._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    h.__onManCb = function (e, t) {
      if (t) {
        switch (e) {
          case 'onCheck':
            if (this.__userUI) this.__userUI._$showUserMailInfo(t, this.__postVo.termId);
            break;
          case 'onAgree':
            this.__postVo.tagAgree = !this.__postVo.tagAgree;
            break;
          case 'onTop':
            this.__postVo.tagTop = !this.__postVo.tagTop;
            break;
          case 'onResolve':
            this.__postVo.tagSolve = !this.__postVo.tagSolve;
        }
        this.__onUpdateItemMes();
      }
    };
    h.__onManHandle = function (e) {
      switch (e) {
        case 'onCheck':
          if (this.__postVo.type == u.CONST.TYPE_LESSONUNIT)
            u.showToastTips({
              content:
                window.moocConfig.lang.KEY_LEARN_THIS_DOCUMENTS +
                ',' +
                window.moocConfig.lang.KEY_LEARN_CANT_INFORMATION,
              type: 2,
            });
          else
            this.__forumDetailCache._$checkPosterInfo(
              this.__postVo.id,
              this.__postVo.id,
              u.CONST.TALK_VOTE_POST,
            );
          break;
        case 'onAgree':
          this.__forumDetailCache._$markAgree(
            this.__postVo.id,
            this.__postVo.id,
            u.CONST.TALK_VOTE_POST,
            !this.__postVo.tagAgree,
          );
          break;
        case 'onTop':
          this.__forumDetailCache._$markTop(
            this.__postVo.id,
            this.__postVo.id,
            u.CONST.TALK_VOTE_POST,
            !this.__postVo.tagTop,
          );
          break;
        case 'onResolve':
          this.__forumDetailCache._$markSolve(this.__postVo.id, !this.__postVo.tagSolve);
      }
    };
    h.__onUpdateItemMes = function () {
      u._$showNode(this.__tagBox);
      if (
        this.__postVo.tagTop ||
        this.__postVo.tagAgree ||
        this.__postVo.tagSolve ||
        this.__postVo.tagLector
      ) {
        u._$hiddenNode(this.__tagTopNode);
        u._$hiddenNode(this.__tagAgreeNode);
        u._$hiddenNode(this.__tagSolveNode);
        u._$hiddenNode(this.__tagTeacherNode);
        if (this.__postVo.tagTop) u._$showNode(this.__tagTopNode);
        if (this.__postVo.tagAgree) u._$showNode(this.__tagAgreeNode);
        if (this.__postVo.tagSolve) u._$showNode(this.__tagSolveNode);
        if (this.__postVo.tagLector) u._$showNode(this.__tagTeacherNode);
      } else u._$hiddenNode(this.__tagBox);
      if (this.__newTermId) {
        u._$hiddenNode(this.__tagBox);
        u._$showNode(this.__tranferBtn);
      }
      if (this.__manUI) {
        this.__manUI._$setItemMes(
          'onTop',
          this.__postVo.tagTop
            ? window.moocConfig.lang.KEY_LEARN_UNPIN
            : window.moocConfig.lang.KEY_LEARN_TOP,
        );
        this.__manUI._$setItemMes(
          'onAgree',
          this.__postVo.tagAgree
            ? window.moocConfig.lang.KEY_LEARN_CANCEL_APPROVE
            : window.moocConfig.lang.KEY_LEARN_AGREE_AGREE,
        );
        this.__manUI._$setItemMes(
          'onResolve',
          this.__postVo.tagSolve
            ? window.moocConfig.lang.KEY_LEARN_CANCEL_RESOLUTION
            : window.moocConfig.lang.KEY_LEARN_SOLVED,
        );
      }
    };
    h.__onReplyHandle = function () {
      if (!u._$isUserLogin()) u._$$LoginDialog._$showLogin({ from: 'learn' });
      else if (0 == s.isEnroll) this.__attendCourseModal = new t();
      else
        this.__banUserUtil.checkIsBanned(
          function () {
            this._$dispatchEvent('onReply');
          }._$bind(this),
          window.termDto && window.termDto.id,
        );
    };
    h.__onEditHandle = function () {
      if (u._$isUserLogin()) {
        if (0 == s.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        s.dispatcher._$redirect(
          u.umi('learnForumTopic') + '?fid=' + this.__postVo.forumId + '&pid=' + this.__postVo.id,
        );
      } else u._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    h.__handleInfoBar = function () {
      if (this.__postVo.relateUnit) {
        u._$showNode(this.__fromUnitBox);
        this.__fromUnitNode.innerText = this.__postVo.relateUnit.name;
        this.__fromUnitNode.href =
          '#' +
          u.umi('learnContent') +
          '?type=detail&id=' +
          this.__postVo.relateUnit.lessonId +
          '&cid=' +
          this.__postVo.relateUnit.id;
      } else u._$hiddenNode(this.__fromUnitBox);
      if (this.__postVo.type == u.CONST.TYPE_LESSONUNIT) u._$hiddenNode(this.__infoBox);
      else {
        u._$showNode(this.__infoBox);
        this.__timeLabel.innerText = u._$formatForumTime(this.__postVo.postTime);
        this.__userUI = u._$$UserItem._$allocate({
          parent: this.__nameNode,
          anonymous: this.__postVo.anonymous,
          userDto: this.__userDto,
        });
      }
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__postVo = e.postVo;
      this.__userDto = this.__postVo.poster || {};
      this.__titleNode.innerText = u._$removeNRNBSP(this.__postVo.title || '');
      if (u._$trim(this.__postVo.content)) {
        u._$showNode(this.__contentNode);
        l._$renderRich(this.__contentNode, this.__postVo.content);
        var t = this.__contentNode.getElementsByTagName('img');
        l._$forEach(
          t,
          function (e) {
            var t = e.getAttribute('src');
            if (t.indexOf('nos.netease.com') > -1 && t.indexOf('?imageView') < 0)
              e.src += '?imageView';
          }._$bind(this),
        );
      } else u._$hiddenNode(this.__contentNode);
      this.__handleInfoBar();
      this.__voteUI = u._$$VoteItem._$allocate({
        parent: this.__voteNode,
        postId: this.__postVo.id,
        id: this.__postVo.id,
        type: u.CONST.TALK_VOTE_POST,
        dataVo: {
          voteCount: this.__postVo.countVote,
          voteOpinion: this.__postVo.hasVoteUp
            ? u.CONST.TALK_VOTE_DIGG
            : this.__postVo.hasVoteDown
              ? u.CONST.TALK_VOTE_CAI
              : -1,
        },
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      this._$followStatusHandle(this.__postVo.hasFollowed);
      if (u._$isUserOwner(this.__userDto.id)) {
        u._$showNode(this.__editBtn);
        u._$showNode(this.__editDivider);
      } else {
        u._$hiddenNode(this.__editBtn);
        u._$hiddenNode(this.__editDivider);
      }
      if (
        u._$getCourseLecOrAssists(s.courseDto.lectorPanels, u._$getWebUser().id) ||
        u._$isOrdinaryEditorForCourse(s.courseDto.ordinaryEditors) ||
        u._$hasMemberRole(u.CONST.ROLE_OUT_COURSE_EDITOR) ||
        u._$hasMemberRole(u.CONST.ROLE_PLATFORM_ADMIN) ||
        u._$hasMemberRole(u.CONST.ROLE_FORUM_MANAGER)
      ) {
        u._$showNode(this.__manNode);
        var n = ['onCheck', 'onResolve', 'onTop', 'onAgree'];
        if (this.__postVo.type != u.CONST.TYPE_LESSONUNIT) n.push('onDel');
        this.__manUI = u._$$ManageItem._$allocate({
          parent: this.__manNode,
          showItems: n,
          onTop: this.__onManHandle._$bind(this, 'onTop'),
          onAgree: this.__onManHandle._$bind(this, 'onAgree'),
          onResolve: this.__onManHandle._$bind(this, 'onResolve'),
          onCheck: this.__onManHandle._$bind(this, 'onCheck'),
          onDel: this.__onDelHandle._$bind(this),
        });
      } else u._$hiddenNode(this.__manNode);
      this.__onUpdateItemMes();
      this.__genShareUI();
    };
    h.__destroy = function () {
      if (this.__userUI) this.__userUI = u._$$UserItem._$recycle(this.__userUI);
      if (this.__voteUI) this.__voteUI = u._$$VoteItem._$recycle(this.__voteUI);
      if (this.__manUI) this.__manUI = u._$$ManageItem._$recycle(this.__manUI);
      if (this.__shareUI) this.__shareUI.destroy();
      this.__supDestroy();
    };
  },
  '8eb6c5c05557c81b78bf50f441e3f28c',
  '1c23b43dfd9c054559909485b4169fa4',
  '8419259be84b2292fe5117e5d132029e',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7ae1049f52447f73129209d74071c691',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '391bade1f824c8724e734dc7a3557f36',
  '7c0f38757da06c54ce1062cbacb9b5c1',
  'bbd38ff49a9c39da32c8f35626316f21',
  'c30834300a1390e7ec4f8432fef9123b',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  'fb80274a93905bc7807baceaedc07c15',
  'cc26d5920093e9742f0feca3855e8e68',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
