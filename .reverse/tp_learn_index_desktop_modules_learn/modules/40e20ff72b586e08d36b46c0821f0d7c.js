EDU(
  '40e20ff72b586e08d36b46c0821f0d7c',
  function (e, t) {
    var i = NEJ.O,
      n = window,
      a = NEJ.P('nej.e'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('nej.ut'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.v'),
      d = NEJ.P('nej.ui'),
      _ = NEJ.P('edu.d'),
      l = NEJ.P('edu.m'),
      h,
      f;
    var u = a._$addNodeTemplate(
      '\t   <div class="noitce f-cb">\t\t <div class="noticeitem f-f0 f-pr f-cb">\t\t\t<div class="f-cb item j-item">\t\t\t\t<span class="j-name name f-fl f-thide">' +
        e.KEY_NOTICE_FIRST_ANNOUNCE +
        '</span>\t\t\t\t<span class="j-type type f-fc9 f-fl">' +
        e.KEY_NOTICE_DRAFT +
        '</span>\t\t\t\t<a class="j-show show f-f1 f-icon f-fr" title=window.moocConfig.lang.KEY_LEARN_CHECK_DETAILS></a>\t\t\t\t<a class="j-delete delete f-f1 f-icon f-fr u-icon-trash" title=window.moocConfig.lang.KEY_LEARN_DELETE_DELETE></a>\t\t\t\t<a class="j-edit edit f-f1 f-icon f-fr u-icon-pencil" title=window.moocConfig.lang.KEY_LEARN_EDIT></a>\t\t\t\t<span class="j-time time f-f1 f-fr">2014年01月08日</span>\t\t\t</div>\t\t\t<div class="f-cb detailtitlpage">\t\t\t\t<span class="j-detailtit detailtit f-fl f-f0">' +
        e.KEY_NOTICE_FIRST_ANNOUNCE +
        '</span>\t\t\t\t<span class="j-lpagetype type f-fc9 f-fl">' +
        e.KEY_NOTICE_DRAFT +
        '</span>\t\t\t\t<span class="f-fc9 f-fr f-f1 nopublish j-nopublish">' +
        e.KEY_NOTICE_NOT_PUBLISH_CANTNOT_SEE +
        '</span>\t\t\t</div>\t\t\t<div class="j-detailcnt detailcnt f-fc6 f-richEditorText"></div>\t\t\t<div class="icons j-icons f-pa"><div class="icon"></div></div>\t\t\t<div class="j-detailcntout detailcntout f-fc6 f-richEditorText"></div>\t\t\t<div class="f-cb opt j-opt"></div>\t\t\t<div class="f-cb lptimeout"><div class="f-fr j-lpagetime lptime"></div></div>\t\t</div>\t\t<a class="j-showmore showmore f-f0">' +
        e.KEY_CLICK_LOAD_MORE +
        '</a>\t\t</div>',
    );
    r._$$NoticeItem = NEJ.C();
    h = r._$$NoticeItem._$extend(r._$$UIBase, !0);
    f = r._$$NoticeItem._$supro;
    h.__initXGui = function () {
      this.__seed_html = u;
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__item = a._$getByClassName(this.__body, 'j-item')[0];
      this.__name = a._$getByClassName(this.__body, 'j-name')[0];
      this.__type = a._$getByClassName(this.__body, 'j-type')[0];
      this.__lpagetype = a._$getByClassName(this.__body, 'j-lpagetype')[0];
      this.__time = a._$getByClassName(this.__body, 'j-time')[0];
      this.__delete = a._$getByClassName(this.__body, 'j-delete')[0];
      this.__edit = a._$getByClassName(this.__body, 'j-edit')[0];
      this.__show = a._$getByClassName(this.__body, 'j-show')[0];
      this.__opt = a._$getByClassName(this.__body, 'j-opt')[0];
      this.__icons = a._$getByClassName(this.__body, 'j-icons')[0];
      this.__detailcnt = a._$getByClassName(this.__body, 'j-detailcnt')[0];
      this.__detailcntout = a._$getByClassName(this.__body, 'j-detailcntout')[0];
      this.__detailtit = a._$getByClassName(this.__body, 'j-detailtit')[0];
      this.__showMore = a._$getByClassName(this.__body, 'j-showmore')[0];
      this.__lpagetime = a._$getByClassName(this.__body, 'j-lpagetime')[0];
      this.__noPublish = a._$getByClassName(this.__body, 'j-nopublish')[0];
      c._$addEvent(this.__edit, 'click', this.__editHandler._$bind(this));
      c._$addEvent(this.__show, 'click', this.__showHandler._$bind(this));
      c._$addEvent(this.__delete, 'click', this.__deleteHandler._$bind(this));
      c._$addEvent(this.__showMore, 'click', this._$showMoreHandler._$bind(this));
      this.__noticeCache = new _._$$COM_Cache_TermNoticeCache();
      this.__noticeCache._$addEvent('onDeleteAnnouncementById', this.__deleteNoticeCb._$bind(this));
    };
    h.__editHandler = function () {
      this.__editOpt(this.__isInEdit);
      if (this.__isInShow) this.__showOpt(this.__isInShow);
    };
    h._$showMoreHandler = function () {
      this._$dispatchEvent('showMoreItems');
    };
    h.__editOpt = function (e) {
      if (e) {
        this.__isInEdit = !1;
        if (this.__createNoticeUI)
          this.__createNoticeUI = r._$$CreateNotice._$recycle(this.__createNoticeUI);
        r._$showNode(this.__item);
        r._$hiddenNode(this.__opt);
      } else {
        this.__isInEdit = !0;
        r._$hiddenNode(this.__item);
        r._$showNode(this.__opt);
        this.__createNoticeUI = r._$$CreateNotice._$allocate({
          parent: this.__opt,
          saveOrPublish: this.__onSaveOrPublish._$bind(this),
          noticeDto: this.__noticeDto,
          onCancel: function () {
            if (this.__createNoticeUI) {
              r._$showNode(this.__item);
              r._$hiddenNode(this.__opt);
              this.__createNoticeUI = r._$$CreateNotice._$recycle(this.__createNoticeUI);
              this.__isInEdit = !1;
            }
          }._$bind(this),
          isAdmin: this.__isAdmin,
          noticeType: this.__noticeType,
        });
      }
    };
    h.__showOpt = function (e) {
      if (e) {
        a._$addClassName(this.__show, 'u-icon-down-circle');
        a._$delClassName(this.__show, 'u-icon-up-circle');
        this.__show.title = window.moocConfig.lang.KEY_LEARN_CHECK_DETAILS;
        this.__isInShow = !1;
        this.__detailcnt.style.display = 'none';
        this.__icons.style.display = 'none';
      } else {
        this.__isInShow = !0;
        a._$addClassName(this.__show, 'u-icon-up-circle');
        a._$delClassName(this.__show, 'u-icon-down-circle');
        this.__show.title = window.moocConfig.lang.KEY_LEARN_HIDE_DETAILS;
        r._$showNode(this.__detailcnt);
        this.__detailcnt.style.display = 'block';
        this.__icons.style.display = 'block';
      }
    };
    h.__showHandler = function () {
      this.__showOpt(this.__isInShow);
    };
    h.__deleteHandler = function () {
      if (this.__isAdmin) {
        if (window.confirm(window.moocConfig.lang.KEY_LEARN_ARE_THIS_ANNOUNCEMENT))
          this.__noticeCache._$deleteAnnouncementById(this.__noticeDto.id);
      } else
        r._$$CommonDialog._$showDialog({
          message: window.moocConfig.lang.KEY_LEARN_ARE_THE_ANNOUNCEMENT,
          cancelFunc: function () {},
          okFunc: function () {
            this.__noticeCache._$deleteAnnouncementById(this.__noticeDto.id);
          }._$bind(this),
        });
    };
    h.__deleteNoticeCb = function (e) {
      if (e) this._$dispatchEvent('deleteNotice');
    };
    h.__onSaveOrPublish = function (e) {
      r._$showNode(this.__item);
      r._$hiddenNode(this.__opt);
      if (e) {
        this.__noticeDto = NEJ.X(this.__noticeDto, e);
        this.__genBaseInfo();
        this.__isInEdit = !1;
        if (this.__createNoticeUI)
          this.__createNoticeUI = r._$$CreateNotice._$recycle(this.__createNoticeUI);
      }
    };
    h.__genBaseInfo = function () {
      var e = this.__charUtil._$getCharsL(this.__noticeDto.title);
      if (e > 60)
        this.__name.innerText = this.__charUtil._$sliceCnAndEns(this.__noticeDto.title, 50) + '...';
      else this.__name.innerText = this.__noticeDto.title;
      if (0 == this.__noticeDto.status) {
        r._$showNode(this.__type);
        r._$showNode(this.__lpagetype);
        r._$showNode(this.__noPublish);
      } else {
        r._$hiddenNode(this.__type);
        r._$hiddenNode(this.__lpagetype);
        r._$hiddenNode(this.__noPublish);
      }
      this.__detailtit.innerText = this.__noticeDto.title;
      this.__detailcnt.innerHTML = t._$formateImagePrefix(this.__noticeDto.content);
      this.__detailcntout.innerHTML = t._$formateImagePrefix(this.__noticeDto.content);
      o._$renderRich2(this.__detailcnt);
      o._$renderRich2(this.__detailcntout);
      if (this.__noticeDto.gmtModified) {
        this.__lpagetime.innerText = r._$formatCommonTime(this.__noticeDto.gmtModified);
        this.__time.innerText = r._$formatCommonTime(this.__noticeDto.gmtModified);
      }
    };
    h._$showMoreHide = function (e) {
      if (e) this.__showMore.style.display = 'block';
      else this.__showMore.style.display = 'none';
    };
    h._$isShowMoreInShow = function () {
      return 'none' != this.__showMore.style.display;
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__isInEdit = !1;
      this.__isInShow = !1;
      a._$addClassName(this.__show, 'u-icon-down-circle');
      a._$delClassName(this.__show, 'u-icon-up-circle');
      r._$hiddenNode(this.__detailcnt);
      r._$hiddenNode(this.__opt);
      if (e.showMore) {
        this.__isShowMore = !0;
        this.__showMore.style.display = 'block';
      } else {
        this.__isShowMore = !1;
        this.__showMore.style.display = 'none';
      }
      this.__noticeDto = e.noticeDto || null;
      this.__charUtil = new l._$$CharasetUtil();
      this.__genBaseInfo();
      if (e.islearnPage) {
        this.__item.innerHTML = '';
        this.__detailtit.parentNode.style.display = 'block';
        this.__detailcntout.style.display = 'block';
        this.__lpagetime.style.display = 'block';
      } else {
        this.__time.style.display = 'block';
        this.__detailtit.parentNode.style.display = 'none';
        this.__lpagetime.style.display = 'none';
      }
      this.__isAdmin = e.isAdmin || !1;
      this.__noticeType = e.noticeType || r.CONST.NOTICE_TYPE_TERM;
    };
    h.__destroy = function () {
      this.__supDestroy();
    };
  },
  '05914c6f767170cf483bb9df9a899f1e',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'bfa5f84d0b4a33f05565c42dcc8ef1e5',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  'fdf017bfe56cd47d46b5fcd5c0dd1c91',
  '9d279df4af180d366f079ab901224cbc',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
