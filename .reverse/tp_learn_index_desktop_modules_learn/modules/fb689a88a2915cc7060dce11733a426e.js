EDU(
  'fb689a88a2915cc7060dce11733a426e',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.ui'),
      d,
      _ =
        '<div class="m-basepool f-cb">\t\t\t\t\t<div class="j-list">\t\t\t\t\t\t<div class="m-data-lists f-cb f-pr j-data-list"></div>\t\t\t\t\t\t<div class="u-pager f-pr j-data-pager"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="j-none empty" style="display:none"><span class="f-f0 f-fc9 j-none-txt f-ib"></span></div>\t\t\t    </div>';
    var l = n._$pushCSSText(
      '.#<uispace> .item-highlight{background:#E0F2E2;}\t\t\t.#<uispace> .m-data-lists{position:relative;z-index:100;}\t\t\t.#<uispace> .u-pager{position:relative;z-index:99;}',
    );
    s._$$BasePool = NEJ.C();
    d = s._$$BasePool._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_css = l;
      this.__seed_html = n._$addNodeTemplate(_);
    };
    d.__destroy = function () {
      this.__destroyUIPools();
      this.__supDestroy();
    };
    d.__destroyUIPools = function () {
      if (this.__uiPools) {
        for (var e in this.__uiPools)
          if (this.__uiPools.hasOwnProperty(e)) {
            var t = this.__uiPools[e];
            this.__handleFirstLast(e, 0);
            t = this.__itemDestroy(t);
          }
        this.__uiPools = {};
      }
    };
    d.__genUIPools = function () {
      this.__uiPools = {};
      if (this.__dataMaps && this.__dataMaps.list) {
        var e = this.__dataMaps.list;
        for (var t = 0; t < e.length; t++) this._$genUIItem(e[t]);
      } else this.__innerFirstLast();
    };
    d._$getCurList = function () {
      if (this.__dataMaps && this.__dataMaps.list) return this.__dataMaps.list;
      else return null;
    };
    d._$genUIItem = function (e, t) {
      var i = this.__data_list_box;
      if (!this.__uiPools[e.id]) {
        if (t) this.__itemZIndex = (this.__idArr || []).length + 101;
        var n = this.__itemGen(e);
        n._$addEvent('onDelSubItem', this.__itemDelCb._$bind(this));
        if (n) {
          this.__uiPools[e.id] = n;
          var a = i.firstChild;
          if (a && t) {
            n.__parent = i;
            i.insertBefore(n._$getBody(), a);
            this.__handleFirstLast(e.id, 1);
          } else {
            n._$appendTo(i);
            this.__handleFirstLast(e.id, 2);
          }
        }
        return n;
      } else this.__itemUpdated(this.__uiPools[e.id], e);
    };
    d.__itemUpdated = function (e, t) {
      if (this.__dataMaps && this.__dataMaps.list && t) {
        var i = this.__dataMaps.list;
        for (var n = 0; n < i.length; n++) {
          var a = i[n];
          if (t.id == a.id) {
            i.splice(n, 1);
            i.splice(n, 0, t);
            break;
          }
        }
      }
    };
    d.__itemDestroy = i;
    d.__itemGen = i;
    d.__itemDelCb = function (e) {
      var t = e.id;
      this.__handleFirstLast(t, 0);
      this.__uiPools[t] = null;
      delete this.__uiPools[t];
      this._$dispatchEvent('onDelItem');
      if (!this._$hasData()) this.__poolToggle(!0);
    };
    d.__itemEditCb = function (e) {
      this._$dispatchEvent('onEditItem', e);
    };
    d.__handleFirstLast = function (e, t) {
      this.__idArr = this.__idArr || [];
      e = '' + e;
      switch (t) {
        case 0:
          var i = o._$indexOf(this.__idArr, e);
          if (i >= 0) this.__idArr.splice(i, 1);
          break;
        case 1:
          this.__idArr.splice(0, 0, e);
          break;
        case 2:
          this.__idArr.push(e);
      }
      this.__innerFirstLast();
    };
    d._$hasData = function () {
      this.__idArr = this.__idArr || [];
      return this.__idArr.length >= 1;
    };
    d.__innerFirstLast = function () {
      if (this.__firstItem) {
        n._$delClassName(this.__firstItem._$getBody(), 'first');
        this.__firstItem = null;
      }
      if (this.__lastItem) {
        n._$delClassName(this.__lastItem._$getBody(), 'last');
        this.__lastItem = null;
      }
      if (this._$hasData()) {
        var e = this.__uiPools[this.__idArr[0]];
        var t = this.__uiPools[this.__idArr[this.__idArr.length - 1]];
        n._$addClassName(e._$getBody(), 'first');
        n._$addClassName(t._$getBody(), 'last');
        this.__firstItem = e;
        this.__lastItem = t;
        this.__poolToggle(!1);
      } else r._$hiddenNode(this.__listNode);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__data_list_box = n._$getByClassName(this.__body, 'j-data-list')[0];
      this.__data_pager_box = n._$getByClassName(this.__body, 'j-data-pager')[0];
      this.__listNode = n._$getByClassName(this.__body, 'j-list')[0];
      this.__noneNode = n._$getByClassName(this.__body, 'j-none')[0];
      this.__noneTxt = n._$getByClassName(this.__body, 'j-none-txt')[0];
      if (this.__showPager) {
        r._$showNode(this.__data_pager_box);
        this.__curIndex = 1;
        var e = (window.moocConfig || {}).lang;
        this.__pager = c._$$Pager._$allocate({
          parent: this.__data_pager_box,
          onchange: this.__onPageChange._$bind(this),
          index: 1,
          total: 1,
          label: {
            prev: e.KEY_NEJ_COMPONENT_PAGE_PREV || '上一页',
            next: e.KEY_NEJ_COMPONENT_PAGE_NEXT || '下一页',
          },
        });
      } else r._$hiddenNode(this.__data_pager_box);
    };
    d.__onPageChange = i;
    d.__cbOnRead = function (e) {
      if (e && e.list && e.list.length > 0) {
        this.__poolToggle(!1);
        this.__itemZIndex = (e && e.list ? e.list.length : 0) + 100;
        this.__dataMaps = e;
        this.__updatePageInfo(this.__dataMaps);
        this.__destroyUIPools();
        this.__genUIPools();
      } else this.__poolToggle(!0);
    };
    d.__poolToggle = function (e) {
      if (e) {
        r._$hiddenNode(this.__listNode);
        r._$showNode(this.__noneNode);
        if (!this.__noneTxt.innerText) r._$hiddenNode(this.__noneNode);
      } else {
        r._$hiddenNode(this.__noneNode);
        r._$showNode(this.__listNode);
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__uiPools = {};
      if (e.noneTxt) this.__noneTxt.innerText = e.noneTxt;
      if (this.__data_pager_box) r._$hiddenNode(this.__data_pager_box);
      if (e.dataMaps) this.__cbOnRead(e.dataMaps);
      else if (!e.notGetData) this._$getPageData(1);
    };
    d._$getItemUI = function (e) {
      if (!e || !this.__uiPools[e]) return null;
      else return this.__uiPools[e];
    };
    d._$getPageData = function (e) {
      if (this.__showPager) {
        this.__curIndex = -1;
        this.__pager._$updatePage(e, e);
      }
    };
    d.__updatePageInfo = function (e) {
      if (e) {
        var t = 1;
        var i = 1;
        if (e.totlePageCount && e.totlePageCount > 0) t = e.totlePageCount;
        if (e.currentPageNo && e.currentPageNo > 0) i = e.currentPageNo;
        this.__curIndex = i;
        if (this.__data_pager_box)
          if (t > 1 && this.__showPager) {
            r._$showNode(this.__data_pager_box);
            this.__pager._$updatePage(i, t);
          } else r._$hiddenNode(this.__data_pager_box);
      }
    };
    d._$scrollToItemById = function (t, i) {
      if (t && this.__uiPools[t]) {
        var a = this.__uiPools[t]._$getBody();
        var o = n._$offset(a);
        i = i ? i : 0;
        window.scrollTo(o.x, o.y - i);
        var s = 0;
        var r = e.setInterval(function () {
          if (n._$hasClassName(a, 'item-highlight')) n._$delClassName(a, 'item-highlight');
          else n._$addClassName(a, 'item-highlight');
          s += 300;
          if (s > 1e3) {
            e.clearInterval(r);
            n._$delClassName(a, 'item-highlight');
          }
        }, 300);
      }
    };
  },
  '966ab075c73a2b79f28794a2ff87c1bc',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
  '966ab075c73a2b79f28794a2ff87c1bc',
);
