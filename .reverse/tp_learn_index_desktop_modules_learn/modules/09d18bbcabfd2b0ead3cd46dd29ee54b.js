EDU(
  '09d18bbcabfd2b0ead3cd46dd29ee54b',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    var c = n._$addNodeTemplate(
      '<div>\t\t\t\t\t\t\t\t            <div class="empty f-f0 j-empty">\t\t\t\t\t\t\t\t                <span class="f-ib j-emptyTips"></span>\t\t\t\t\t\t\t\t            </div>\t\t\t\t\t\t\t\t            <div class="j-list"></div>\t\t\t\t\t\t\t\t\t\t</div>',
    );
    var d = n._$pushCSSText('.#<uispace>{}');
    o._$$AnnounceListUI = NEJ.C();
    r = o._$$AnnounceListUI._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_css = d;
      this.__seed_html = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__listNode = n._$getByClassName(this.__body, 'j-list')[0];
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
      this.__emptyTipsNode = n._$getByClassName(this.__body, 'j-emptyTips')[0];
    };
    r.__handleListShow = function () {
      var t = !1;
      var i = [];
      this.__listUIs = [];
      for (var n = 0; n < this.__lists.length; n++)
        if (1 == this.__lists[n].status || e.isPreview) i.push(this.__lists[n]);
      s._$forEach(
        i,
        function (e, i) {
          if ((i + 1) % this.__oneShowNum == 0 && i < this.__lists.length - 1) t = !0;
          else t = !1;
          var n = o._$$NoticeItem._$allocate({
            parent: this.__listNode,
            noticeDto: e,
            showMoreItems: this.__showMoreHandler._$bind(this, i + 1),
            showMore: t,
            islearnPage: !0,
          });
          if (i + 1 > this.__oneShowNum) o._$hiddenNode(n.__body);
          this.__listUIs.push(n);
        }._$bind(this),
      );
    };
    r.__showMoreHandler = function (e) {
      this.__listUIs[e - 1]._$showMoreHide(!1);
      var t = e + this.__oneShowNum;
      t = t > this.__lists.length ? this.__lists.length : t;
      for (var i = e; i < t; i++) if (this.__listUIs[i]) o._$showNode(this.__listUIs[i].__body);
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__oneShowNum = e.showNum || 10;
      this.__lists = e.lists || [];
      if (this.__lists.length > 0) {
        o._$showNode(this.__listNode);
        o._$hiddenNode(this.__emptyNode);
        this.__handleListShow();
      } else {
        o._$hiddenNode(this.__listNode);
        o._$showNode(this.__emptyNode);
        this.__emptyTipsNode.innerText = e.emptyTips || '';
      }
    };
    r.__clearUIs = function () {
      s._$forEach(
        this.__listUIs,
        function (e, t) {
          e = o._$$NoticeItem._$recycle(e);
        }._$bind(this),
      );
      this.__listUIs = [];
    };
    r.__destroy = function () {
      this.__clearUIs();
      this.__supDestroy();
    };
  },
  '40e20ff72b586e08d36b46c0821f0d7c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
