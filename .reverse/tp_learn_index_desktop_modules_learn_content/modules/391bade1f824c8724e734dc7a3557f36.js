EDU(
  '391bade1f824c8724e734dc7a3557f36',
  function (e, t, n) {
    var i = window,
      o = NEJ.O,
      a = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('edu.d'),
      l = NEJ.P('nej.v'),
      _;
    var u = (window.moocConfig || {}).lang || {};
    var f = e.isEn();
    var h = s._$pushCSSText(
      '        .#<uispace> .anonyInfo{color:#999;}        .#<uispace> .userInfo .type{margin:0 5px;padding:0 5px;display:inline-block;line-height:18px;color:#fff;text-align:center;}        .#<uispace> .userInfo .type.lector{background-color:#6CB4FB;}        .#<uispace> .userInfo .type.manager{background-color:#9BCE00;}        .#<uispace> .userInfo .type.assist{background-color:#6CB4FB;}        ',
    );
    var p = s._$addNodeTemplate(
      '<span>    \t\t<span class="anonyInfo j-anonyInfo">' +
        u.KEY_LEARN_ANONYMOUS +
        '</span>    \t\t<span class="userInfo j-userInfo"></span>       </span>',
    );
    c._$$UserItem = NEJ.C();
    _ = c._$$UserItem._$extend(c._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = p;
      this.__seed_css = h;
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__anonyInfoNode = s._$getByClassName(this.__body, 'j-anonyInfo')[0];
      this.__userInfoNode = s._$getByClassName(this.__body, 'j-userInfo')[0];
      this.__banUserUtil = new t.BanUserUtil();
    };
    _._$showUserMailInfo = function (e, t) {
      this.__handleUserInfo(!1);
      var i = e[1],
        o = !!parseInt(e[2], 10),
        a = !!parseInt(e[3], 10);
      this.__termId = t;
      new n({
        data: {
          username: this.__userDto.nickName,
          email: i,
          isFullSiteBanned: o,
          isCourseDiscussBanned: a,
        },
      }).$on(
        n.CONST.EVENTS.CHANGE_BAN_STATUS,
        function (e) {
          this.__banUserUtil.changeUserBanStatus(this.__userDto.id, e.isFullSite, e.ban, t);
        }._$bind(this),
      );
    };
    _.__handleUserInfo = function (e) {
      if (e) {
        c._$showNode(this.__anonyInfoNode);
        c._$hiddenNode(this.__userInfoNode);
      } else {
        c._$hiddenNode(this.__anonyInfoNode);
        c._$showNode(this.__userInfoNode);
        var t = f
          ? 'javascript:;'
          : '#' + c.umi('learnForumPersonal') + '?uid=' + this.__userDto.id;
        var n,
          o = this.__userDto.nickName || '',
          a = c._$getWebUser(),
          s = [];
        r._$forEach(i.courseDto.lectorPanels, function (e, t) {
          s[t] = e.memberId;
        });
        if (
          this.__userDto.mocAuthenticatedMemberDto &&
          (c._$hasOneMemberRole([c.CONST.ROLE_SCHOOLSUPER_ADMIN, c.CONST.ROLE_OUT_COURSE_EDITOR]) ||
            c._$arrContains(s, a.id) ||
            c._$isOrdinaryEditorForCourse(i.courseDto.ordinaryEditors))
        )
          o = c._$getUserShowInfo(this.__userDto.mocAuthenticatedMemberDto);
        if (this.__locked)
          n = '<span class="f-fc6" title="' + o + '">' + c._$genNewStrByLength(o, 12) + '</span>';
        else
          n =
            '<a class="f-fcgreen" href="' +
            t +
            '" title="' +
            o +
            '">' +
            c._$genNewStrByLength(o, 12) +
            '</a>';
        if (c._$arrContains(this.__userDto.roles, c.CONST.ROLE_FORUM_MANAGER))
          n += "<span class='type manager'>" + u.KEY_LEARN_ADMINISTRATOR + '</span>';
        else {
          var d = c._$getCourseLecOrAssists(i.courseDto.lectorPanels, this.__userDto.id);
          if (null != d)
            switch (d.lectorType) {
              case c.CONST.REL_TYPE_TERM_CHIEF_LECTOR:
              case c.CONST.REL_TYPE_TERM_LECTOR:
                n =
                  '<a class="f-fcgreen" href="' +
                  t +
                  '"title="' +
                  (this.__userDto.realName || this.__userDto.nickName) +
                  '">' +
                  c._$genNewStrByLength(this.__userDto.realName || this.__userDto.nickName, 12) +
                  "</a><span class='type lector'>" +
                  u.KEY_LEARN_TEACHER +
                  '</span>';
                break;
              case c.CONST.REL_TYPE_TERM_ASSIST:
                n += "<span class='type assist'>" + u.KEY_LEARN_TEACHING_ASSISTANT + '</span>';
            }
        }
        this.__userInfoNode.innerHTML = n;
      }
    };
    _.__destroy = function () {
      this.__userInfoNode.title = '';
      this.__supDestroy();
    };
    _.__reset = function (e) {
      this.__supReset(e);
      this.__userDto = e.userDto;
      this.__locker = e.locked || c._$isForumJustShow() == c.CONST.FORUM_FORBID_ELITE || !1;
      this.__handleUserInfo(!!e.anonymous);
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '8eb6c5c05557c81b78bf50f441e3f28c',
  '57e9f440d9661b56030650b673056e36',
  '342ad7ae4eea50c3cad860686650a915',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  'bf8d09e46d2369efd6e41b29fe211330',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
