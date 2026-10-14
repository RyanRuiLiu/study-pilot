EDU(
  '52cbe4ed9048c5bebf9d1b8750646854',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l;
    r._$$PageAbstract = t._$klass();
    l = r._$$PageAbstract._$extend(a._$$EventTarget);
    l.__reset = function (e) {
      this.__super(e);
      this.__pbtn = e.pbtn;
      this.__nbtn = e.nbtn;
      this.__sbtn = e.sbtn;
      this.__ebtn = e.ebtn;
      this.__name = e.event || 'click';
      this.__parented = !!e.parented;
      this.__selected = e.selected || 'js-selected';
      this.__disabled = e.disabled || 'js-disabled';
      this.__doPageListCheck(e.list);
      this.__limit = e.limit || 1 / 0;
      this._$updatePage(e.index || 1, e.total || 1);
    };
    l.__destroy = function () {
      this.__super();
      delete this.__list;
      delete this.__name;
      delete this.__pbtn;
      delete this.__nbtn;
      delete this.__sbtn;
      delete this.__ebtn;
      delete this.__last;
      delete this.__total;
      delete this.__index;
      delete this.__extdata;
      delete this.__selected;
      delete this.__disabled;
    };
    l.__getSelectNode = function (e) {
      return !this.__parented ? e : e.parentNode;
    };
    l.__doPageListCheck = (function () {
      var e = function (e) {
        this.__list.push(e);
        this.__doInitDomEvent([[e, this.__name, this.__onClick._$bind2(this, 0)]]);
      };
      return function (t) {
        this.__list = [];
        this.__doInitDomEvent([
          [this.__pbtn, 'click', this.__onClick._$bind2(this, -1)],
          [this.__nbtn, 'click', this.__onClick._$bind2(this, 1)],
          [this.__sbtn, 'click', this.__onClick._$bind2(this, -2)],
          [this.__ebtn, 'click', this.__onClick._$bind2(this, 2)],
        ]);
        n._$forEach(t, e, this);
      };
    })();
    l.__doSetNodeIndex = function (e, t) {
      var n = this.__getSelectNode(e);
      if (null == t) {
        e.innerText = '';
        i._$setStyle(e, 'display', 'none');
        i._$delClassName(n, this.__selected);
      } else {
        e.innerText = t;
        i._$setStyle(e, 'display', '');
        t == this.__index
          ? i._$addClassName(n, this.__selected)
          : i._$delClassName(n, this.__selected);
      }
    };
    l.__doSyncBtnState = function () {
      if (this.__index <= 1) {
        i._$addClassName(this.__pbtn, this.__disabled);
        i._$addClassName(this.__sbtn, this.__disabled);
      } else {
        i._$delClassName(this.__pbtn, this.__disabled);
        i._$delClassName(this.__sbtn, this.__disabled);
      }
      if (this.__index >= this.__total) {
        i._$addClassName(this.__nbtn, this.__disabled);
        i._$addClassName(this.__ebtn, this.__disabled);
      } else {
        i._$delClassName(this.__nbtn, this.__disabled);
        i._$delClassName(this.__ebtn, this.__disabled);
      }
    };
    l.__doRefreshPage = c;
    l.__doChangeIndex = function () {
      this.__doRefreshPage();
      this.__doSyncBtnState();
      this._$dispatchEvent('onchange', {
        last: this.__last,
        total: this.__total,
        index: this.__index,
        ext: this.__extdata,
      });
    };
    l.__doSaveIndex = function (e) {
      e = parseInt(e);
      if (isNaN(e) || null == this.__total) return !1;
      e = Math.max(1, Math.min(e, this.__total));
      this.__last = this.__index;
      this.__index = e;
      return !0;
    };
    l.__doSaveTotal = function (e) {
      e = parseInt(e);
      if (isNaN(e) || e < 1) return !1;
      this.__total = Math.min(e, this.__limit);
      return !0;
    };
    l.__onClick = function (e, t) {
      o._$stopDefault(e);
      var n = o._$getElement(e),
        a = i._$hasClassName(this.__getSelectNode(n), this.__selected),
        r = i._$hasClassName(n, this.__disabled);
      if (n && !a && !r) {
        var s = n.innerText;
        switch (t) {
          case 1:
          case -1:
            s = this.__index + t;
            break;
          case 2:
            s = this.__total;
            break;
          case -2:
            s = 1;
        }
        this._$setIndex(s);
      }
    };
    l._$getIndex = function () {
      return this.__index;
    };
    l._$setIndex = function (e) {
      var t = this.__index;
      this.__doSaveIndex(e);
      if (t != this.__index) this.__doChangeIndex();
    };
    l._$getTotal = function () {
      return this.__total;
    };
    l._$setTotal = function (e) {
      if (this.__doSaveTotal(e) && null != this.__index) {
        this.__index = 1;
        this.__doChangeIndex();
      }
    };
    l._$updateTotal = function (e) {
      if (this.__doSaveTotal(e)) {
        this.__doRefreshPage();
        this.__doSyncBtnState();
      }
    };
    l._$updatePage = function (e, t) {
      if (this.__doSaveTotal(t) && this.__doSaveIndex(e)) this.__doChangeIndex();
    };
    if (!0) e.P('nej.ut')._$$AbstractPage = r._$$PageAbstract;
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
