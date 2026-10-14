EDU(
  '8edd74ef84d39001d4b7e816e13492d3',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      s = NEJ.P('edu.d'),
      c = NEJ.P('nej.ui'),
      d =
        '<div class="m-allwrap">            <div class="cnt f-cb"></div>            <a class="u-loadmore f-bg f-f0" style="display:none">载入更多</a>            <div class="nocnt f-fc9" style="display:none">暂无内容</div>        </div>',
      l;
    a._$$CourseWrapper = NEJ.C();
    l = a._$$CourseWrapper._$extend(a._$$UIBase, !0);
    l.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(d);
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__index = 1;
      var e = i._$getChildren(this.__body);
      this.__contentWrapper = e[0];
      this.__loadBtn = e[1];
      this.__noContentNode = e[2];
      o._$addEvent(window, 'scroll', this.__onScroll._$bind(this));
    };
    l.__onScroll = function () {
      var e = i._$getPageBox().scrollTop + i._$getPageBox().clientHeight;
      var t = this.__loadBtn.offsetTop;
      if (e > t && a._$isNodeShown(this.__loadBtn)) o._$dispatchEvent(this.__loadBtn, 'click');
    };
    l._$setContent = function (e, t) {
      this.__tpl = t || this.__tpl;
      if (e) {
        var n = e.pagination;
        if (n) this.__totalCount = n.totlePageCount;
        if (n && n.totlePageCount > 1) {
          a._$showNode(this.__loadBtn);
          if (1 === n.pageIndex)
            this.__doInitDomEvent([[this.__loadBtn, 'click', this.__onload._$bind(this)]]);
          if (n.pageIndex === n.totlePageCount) {
            a._$hiddenNode(this.__loadBtn);
            o._$delEvent(this.__loadBtn, 'click', this.__onload._$bind(this));
          }
        } else a._$hiddenNode(this.__loadBtn);
        var i = !1;
        if (e.lectorResult && e.lectorResult.length > 0) {
          this.__courseList._$setContent(e.lectorResult, this.__tpl, a.CONST.ROLE_LECTOR);
          i = !0;
        }
        if (e.assistResult && e.assistResult.length > 0) {
          this.__courseList._$setContent(e.assistResult, this.__tpl, a.CONST.ROLE_ASSISTANT);
          i = !0;
        }
        if (e.result && e.result.length > 0) {
          this.__courseList._$setContent(e.result, this.__tpl);
          i = !0;
        }
        if (i) {
          if (this.__hasCntCb) this.__hasCntCb();
          a._$hiddenNode(this.__noContentNode);
        } else this.__onNocntAction();
      } else this.__onNocntAction();
    };
    l.__onNocntAction = function () {
      if (this.__noCntCb) this.__noCntCb();
      else a._$showNode(this.__noContentNode);
    };
    l.__onload = function () {
      if (this.__index >= this.__totalCount) {
        this.__index = this.__totalCount;
        a._$hiddenNode(this.__loadBtn);
      } else {
        ++this.__index;
        this._$dispatchEvent('onLoad', this.__index);
      }
    };
    l.__reset = function (e) {
      this.__supReset(e);
      this.__tpl = e.tpl || '';
      this.__noCnt = e.noCnt || '暂无内容';
      this.__clickActions = e.clickActions || [];
      this.__hasCntCb = e.hasCntCb || null;
      this.__noCntCb = e.noCntCb || null;
      this.__noContentNode.innerHTML = this.__noCnt;
      this.__courseList = a._$$CourseList._$allocate({
        parent: this.__contentWrapper,
        tpl: this.__tpl,
        clickActions: this.__clickActions,
      });
      this._$dispatchEvent('onLoad', this.__index);
    };
    l.__destroy = function () {
      this.__supDestroy();
      if (this.__courseList) this.__courseList = a._$$CourseList._$recycle(this.__courseList);
      this.__index = 1;
      a._$hiddenNode(this.__noContentNode);
      a._$hiddenNode(this.__loadBtn);
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'd8d34d3fc0824a68b999f1e5e3390467',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
