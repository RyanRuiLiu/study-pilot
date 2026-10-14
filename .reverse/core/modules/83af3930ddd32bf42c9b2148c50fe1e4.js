EDU(
  '83af3930ddd32bf42c9b2148c50fe1e4',
  function () {
    var e = NEJ.P,
      t = e('nej.e'),
      n = NEJ.P('nej.v'),
      i = NEJ.P('nej.u'),
      o = NEJ.P('edu.u'),
      a = window,
      r,
      s;
    var c = t._$addNodeTemplate(
      '<div class="u-select">    \t\t\t\t\t\t\t\t\t\t\t<div class="up j-up f-thide"></div>    \t\t\t\t\t\t\t\t\t\t\t<div class="down f-bg j-list"></div>    \t\t\t\t\t\t\t\t\t      </div>',
    );
    o._$$DropListSelect = NEJ.C();
    r = o._$$DropListSelect._$extend(o._$$UIBase, !0);
    s = o._$$DropListSelect.prototype;
    r.__initXGui = function () {
      this.__seed_html = c;
    };
    r.__reset = function (e) {
      this.__supReset(e);
      if (e.selectIndex && e.list) this.__itemClick(e.list[e.selectIndex - 1]);
      else this.__up.innerText = e.defaultName || '请选择下拉列表';
      this.__selectId = e.selectId || '';
      this.__dataList = e.list;
      o._$hiddenNode(this.__listP);
      this.__genItem(e.list);
      this.__doInitDomEvent([
        [
          this.__up,
          'click',
          function (e) {
            if (!this.__disabled) this.__showDown(e);
          }._$bind(this),
        ],
        [
          document,
          'click',
          function (e) {
            o._$hiddenNode(this.__listP);
          }._$bind(this),
        ],
      ]);
      this._$setDisabled(!1);
    };
    r.__genItem = function (e) {
      this.__listP.innerHTML = '';
      if (e) {
        var n = e.length;
        for (var o = 0; o < n; o++) {
          var a = e[o];
          var r =
            '<div class="f-thide list" title="' +
            i._$escape(a.name) +
            '">' +
            i._$escape(a.name) +
            '</div>';
          var s = t._$html2node(r);
          this.__doInitDomEvent([[s, 'click', this.__itemClick._$bind(this, a)]]);
          this.__listP.appendChild(s);
          if (a.id == this.__selectId) {
            this.__up.innerText = a.name;
            this.__selectedData = a;
          }
        }
      }
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__up = t._$getByClassName(this.__body, 'j-up')[0];
      this.__listP = t._$getByClassName(this.__body, 'j-list')[0];
    };
    r._$setDisabled = function (e) {
      if (e) t._$addClassName(this.__body, 'disabled');
      else t._$delClassName(this.__body, 'disabled');
      this.__disabled = !!e;
    };
    r._$getSelectedData = function () {
      return this.__selectedData;
    };
    r._$setSelectedDataById = function (e) {
      i._$forEach(
        this.__dataList,
        function (t, n) {
          if (t.id == e) {
            this.__up.innerText = t.name;
            this.__selectedData = t;
          }
        }._$bind(this),
      );
    };
    r.__showDown = function (e) {
      n._$stop(e);
      if (!o._$isNodeShown(this.__listP)) o._$showNode(this.__listP);
      else o._$hiddenNode(this.__listP);
    };
    r.__itemClick = function (e, t) {
      if (t) n._$stop(t);
      this.__selectedData = e;
      this.__up.innerText = e.name;
      o._$hiddenNode(this.__listP);
      this._$dispatchEvent('itemSelect', e);
    };
    r._$setDisabledTxt = function (e) {
      this.__up.innerText = e;
      this._$setDisabled(!0);
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
