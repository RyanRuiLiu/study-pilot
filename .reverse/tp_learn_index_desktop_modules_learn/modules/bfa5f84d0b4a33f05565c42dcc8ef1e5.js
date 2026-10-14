EDU(
  'bfa5f84d0b4a33f05565c42dcc8ef1e5',
  function () {
    var e = NEJ.O,
      t = window,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.u'),
      o = NEJ.P('nej.ut'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('nej.ui'),
      d = NEJ.P('edu.d'),
      _ = NEJ.P('edu.m'),
      l,
      h;
    var f = n._$pushCSSText(
      '    \t.#<uispace> {margin-top:20px;}        .#<uispace> .ctinfo{height:65px;line-height:30px;}        .#<uispace> .title{font-size:14px;}        .#<uispace> .cnt{width:650px}        .#<uispace> .cnt .zarea{height:450px;}        .#<uispace> .opts{margin-bottom:10px;padding:0 0 0 50px;}        .#<uispace> .messc{width: 20px;height: 20px;vertical-align: middle;}        .#<uispace> .mess{vertical-align: middle;}        .#<uispace> .publish{height:28px;}        .#<uispace> .mail{font-size:12px;margin:6px 0 10px;}        .#<uispace> .draft,.publish{margin-right:10px;}        .#<uispace> .draft{height:28px;}        .#<uispace> .tipinfo{width:660px;}        .#<uispace> .opts .u-btn{min-width:60px;height:30px;line-height:30px;padding:0 5px;font-size:12px;}        ',
    );
    var u = n._$addNodeTemplate(
      '\t \t<div class="cNotice f-cb"> \t\t\t<div class="ctinfo f-cb f-pr"> \t\t\t\t<div class="title f-fl f-f0"><em class="f-sign">*</em>标题：</div> \t\t\t\t<div class="f-fl j-ctitle"></div> \t\t\t\t<div class="f-fl j-feed feed"></div> \t\t\t</div> \t\t\t<div class="f-cb f-pr"> \t\t\t\t<div class="title f-fl f-f0"><em class="f-sign">*</em>内容：</div>\t\t\t\t<div class="f-fl j-cnt cnt"></div> \t\t\t\t<div class="f-fl j-feed feed"></div> \t\t\t</div> \t\t\t<div class="opts f-cb"> \t\t\t\t<div class="mail" id="j-mailtipInfo"> \t\t\t\t\t<div class="mtop"><input type="checkbox" class="messc j-sendmail" id="aefdsv123"/><label class="mess f-f0" for="aefdsv123">邮件通知</label></div> \t\t\t\t\t<p class="tipinfo f-fc9">发布后学习者将在学习页面上看到该公告，勾选“邮件通知”后，能同时收到相同内容的邮件。</p> \t\t\t\t</div>                <a class="f-fl j-draft draft u-btn u-btn-default f-f1">保存为草稿</a> \t\t\t\t<a class="f-fl j-pubslih publish u-btn u-btn-primary f-f1">发布</a> \t\t\t\t<a class="f-fl j-cancel cancel u-btn f-f1">取消</a> \t\t\t</div>\t \t</div>',
    );
    s._$$CreateNotice = NEJ.C();
    l = s._$$CreateNotice._$extend(s._$$UIBase, !0);
    h = s._$$CreateNotice._$supro;
    l.__initXGui = function () {
      this.__seed_html = u;
      this.__seed_css = f;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__title = n._$getByClassName(this.__body, 'j-ctitle')[0];
      this.__cnt = n._$getByClassName(this.__body, 'j-cnt')[0];
      this.__pubslih = n._$getByClassName(this.__body, 'j-pubslih')[0];
      this.__draft = n._$getByClassName(this.__body, 'j-draft')[0];
      this.__cancel = n._$getByClassName(this.__body, 'j-cancel')[0];
      this.__feed = n._$getByClassName(this.__body, 'j-feed');
      this.__sendMail = n._$getByClassName(this.__body, 'j-sendmail')[0];
      r._$addEvent(this.__pubslih, 'click', this.__publishHandler._$bind(this));
      r._$addEvent(this.__draft, 'click', this.__draftHandler._$bind(this));
      r._$addEvent(this.__cancel, 'click', this.__cancelHandler._$bind(this));
      this.__noticeCache = new d._$$COM_Cache_TermNoticeCache();
      this.__noticeCache._$addEvent(
        'onSaveOrPublishAnnouncement',
        this.__saveOrPublishCb._$bind(this),
      );
      this.__noticeCache._$addEvent(
        'onCheckAnnouncementDuplicate',
        this.__checkAnnouncementDuplicateCb._$bind(this),
      );
    };
    l.__saveOrPublishCb = function (e) {
      if (e.data) {
        if (this.__noticeType == s.CONST.NOTICE_TYPE_FORUMADMIN)
          if (e.isDraft) alert(window.moocConfig.lang.KEY_LEARN_SAVED_SUCCESSFULLY);
          else alert(window.moocConfig.lang.KEY_LEARN_PUBLISHED_SUCCESSFULLY);
        else if (e.isDraft)
          s.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_SAVED_SUCCESSFULLY });
        else s.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_PUBLISHED_SUCCESSFULLY });
        this._$dispatchEvent('saveOrPublish', e.data);
      }
    };
    l.__genBaseUI = function () {
      this.__titleInputUI = s._$$TipInputUI._$allocate({
        parent: this.__title,
        height: 34,
        width: 647,
        labelText: ' ',
        critical: 30,
        onInputFocus: function () {
          if (this.__titfd) this.__titfd._$hideFeedback();
        }._$bind(this),
      });
      var e = '';
      if (this.__noticeDto) {
        this.__titleInputUI._$setInitContent(this.__noticeDto.title || '');
        e = this.__noticeDto.content;
      }
      this.__cntCustomUI = c._$$EduEditor._$allocate({
        parent: this.__cnt,
        height: 435,
        content: e,
      });
      this.__titfd = s._$$FeedBackUI._$allocate({ parent: this.__feed[0] });
      this.__titfd._$hideFeedback();
      this.__cntfd = s._$$FeedBackUI._$allocate({ parent: this.__feed[1] });
      this.__cntfd._$hideFeedback();
      if (1 == this.__noticeDto.status) s._$hiddenNode(this.__draft);
      else s._$showNode(this.__draft);
    };
    l.__getNoticeDto = function () {
      this.__noticeDto.title = this.__titleInputUI._$getContent();
      this.__noticeDto.content = this.__cntCustomUI._$getContent();
      if (this.__noticeType == s.CONST.NOTICE_TYPE_FORUMADMIN) this.__noticeDto.termId = -1;
      else this.__noticeDto.termId = t.termDto.id;
      this.__noticeDto.type = this.__noticeType;
      if (this.__sendMail.checked || 1 == this.__sendMail.checked) this.__sendEmail = 1;
      else this.__sendEmail = 0;
    };
    l.__verifyDto = function (e) {
      var t = this.__charUtil._$getCharsL(this.__noticeDto.title);
      if (!this.__noticeDto.title || '' == this.__noticeDto.title) {
        this.__titfd._$showWarnTips(window.moocConfig.lang.KEY_LEARN_PLEASE_INPUT_NOTICE_TITLE);
        return !1;
      } else if (t > 60) {
        this.__titfd._$showWarnTips(window.moocConfig.lang.KEY_LEARN_ANNOUNCEMENT_LONG);
        return !1;
      } else {
        this.__cntfd._$hideFeedback();
        return !0;
      }
    };
    l.__draftHandler = function () {
      this.__getNoticeDto();
      if (this.__verifyDto(!0))
        this.__noticeCache._$saveOrPublishAnnouncement(this.__noticeDto, 0, 1);
    };
    l.__publishHandler = function () {
      this.__getNoticeDto();
      if (this.__verifyDto(!1))
        this.__noticeCache._$checkAnnouncementDuplicate(this.__noticeDto, this.__sendEmail, 0);
    };
    l.__checkAnnouncementDuplicateCb = function (e) {
      if (1 == e)
        s._$$CommonDialog._$showDialog({
          message: '邮件内容重复，确定要重新发送吗',
          okFunc: function () {
            this.__noticeCache._$saveOrPublishAnnouncement(this.__noticeDto, this.__sendEmail, 0);
          }._$bind(this),
          cancelFunc: i,
        });
      else this.__noticeCache._$saveOrPublishAnnouncement(this.__noticeDto, this.__sendEmail, 0);
    };
    l.__cancelHandler = function () {
      this._$dispatchEvent('onCancel');
    };
    l.__reset = function (e) {
      this.__supReset(e);
      this.__termId = 100;
      this.__noticeDto = e.noticeDto || {};
      this.__genBaseUI();
      this.__charUtil = new _._$$CharasetUtil();
      if (e.isAdmin) {
        n._$addClassName(this.__draft, 'button green');
        n._$addClassName(this.__pubslih, 'button green');
        n._$addClassName(this.__cancel, 'button green');
        s._$hiddenNode(n._$get('j-mailtipInfo'));
        this.__sendMail.checked = !1;
        n._$setStyle(n._$get('j-mailtipInfo').parentNode, 'paddingTop', '20px');
      }
      this.__noticeType = e.noticeType || s.CONST.NOTICE_TYPE_TERM;
    };
    l.__destroy = function () {
      if (this.__titleInputUI) this.__titleInputUI = s._$$TipInputUI._$recycle(this.__titleInputUI);
      if (this.__cntCustomUI) this.__cntCustomUI = c._$$EduEditor._$recycle(this.__cntCustomUI);
      if (this.__titfd) this.__titfd = s._$$FeedBackUI._$recycle(this.__titfd);
      if (this.__cntfd) this.__cntfd = s._$$FeedBackUI._$recycle(this.__cntfd);
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7ae1049f52447f73129209d74071c691',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '5f6786e7896f2a86bf128de299871305',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '4680ef5be2c55c96de681d2752e800c2',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '9d279df4af180d366f079ab901224cbc',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
