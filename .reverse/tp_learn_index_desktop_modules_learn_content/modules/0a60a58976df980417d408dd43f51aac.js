EDU(
  '0a60a58976df980417d408dd43f51aac',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      s;
    var r = i._$pushCSSText(
      '\t        .#<uispace> {line-height:20px;color:#666;}\t        .#<uispace> .divider{display:inline-block;border-left:1px solid #ddd;margin:0px 10px 0px 5px;}\t        .#<uispace> a{color:#666;cursor:pointer;}\t        .#<uispace> a:hover{color:#61A500;text-decoration:none;}\t        .#<uispace> a span{background:url(' +
        e.imageUrlMap.forum_icon_sprite +
        ') no-repeat -4999px -4999px;margin-left:4px;display:inline-block;width:12px;height:20px;vertical-align:top;}\t        .#<uispace> .upsort,.#<uispace> .downsort{color:#61A500;}\t        .#<uispace> .double.nosort span{background-position:0 2px;}\t        .#<uispace> .double.downsort span{background-position:-20px 2px;}\t        .#<uispace> .double.upsort span{background-position:-38px 2px;}\t        ',
    );
    var c = i._$addHtmlTemplate(
      '<div>                ${lang.KEY_LEARN_SORT_BY}<a class="j-time double">${lang.KEY_LEARN_RESPONSE_TIME}<span></span></a                ><span class="divider"></span><a class="j-vote single">${lang.KEY_LEARN_NUMBER_VOTES}</a             </div>',
    );
    a._$$TalkSortItem = NEJ.C();
    s = a._$$TalkSortItem._$extend(a._$$UIBase, !0);
    s.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate(c, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = r;
    };
    s.__initNode = function () {
      this.__supInitNode();
      this.__timebtn = i._$getByClassName(this.__body, 'j-time')[0];
      this.__votebtn = i._$getByClassName(this.__body, 'j-vote')[0];
      this.__btnsMap = { gmt_create: this.__timebtn, vote_count: this.__votebtn };
      for (var e in this.__btnsMap)
        o._$addEvent(this.__btnsMap[e], 'click', this.__selectSortBtnHandle._$bind(this, e, !0));
    };
    s.__selectSortBtnHandle = function (e, t) {
      var n = this.__setSortBtn(this.__btnsMap[e]);
      if (t) {
        this.__sortType = e;
        this.__sortAsc = n;
        this._$dispatchEvent('onSortChange', { sortType: e, sortAsc: n });
      }
    };
    s.__setSortBtn = function (e) {
      if (e) {
        var t;
        if (i._$hasClassName(e, 'nosort')) {
          if (this.__curSortNode) this.__setBtnInitState(this.__curSortNode);
          this.__curSortNode = e;
          t = this.__sortAsc || 'asc';
          i._$replaceClassName(e, 'nosort', 'asc' == t ? 'upsort' : 'downsort');
        } else if (i._$hasClassName(e, 'downsort')) {
          i._$replaceClassName(e, 'downsort', 'upsort');
          t = 'asc';
        } else if (i._$hasClassName(e, 'upsort')) {
          i._$replaceClassName(e, 'upsort', 'downsort');
          t = 'desc';
        }
        return t;
      }
    };
    s.__setBtnInitState = function (e) {
      if (e) {
        i._$delClassName(e, 'downsort');
        i._$delClassName(e, 'upsort');
        i._$addClassName(e, 'nosort');
      }
    };
    s.__setShowBtns = function (e) {
      e = e || [];
      for (var t in this.__btnsMap) a._$hiddenNode(this.__btnsMap[t]);
      for (var n = 0; n < e.length; n++)
        if (this.__btnsMap[e[n]]) {
          var i = this.__btnsMap[e[n]];
          a._$showNode(i);
        }
    };
    s.__reset = function (e) {
      this.__supReset(e);
      this.__curSortNode = null;
      this.__setShowBtns(e.showTypes);
      if (void 0 != e.sortType) this._$setInitSort(e.sortType, e.sortAsc);
    };
    s._$getSort = function () {
      return { sortType: this.__sortType, sortAsc: this.__sortAsc };
    };
    s._$setInitSort = function (e, t) {
      this.__sortType = e;
      this.__sortAsc = t;
      for (var n in this.__btnsMap) this.__setBtnInitState(this.__btnsMap[n]);
      this.__selectSortBtnHandle(e, !1);
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
