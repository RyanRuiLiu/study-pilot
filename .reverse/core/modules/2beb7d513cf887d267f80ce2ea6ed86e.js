EDU(
  '2beb7d513cf887d267f80ce2ea6ed86e',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      n = NEJ.F,
      i = e('nej.c'),
      o = e('nej.e'),
      a = e('nej.u'),
      r = e('nej.ut'),
      s = e('nej.ui'),
      c = e('nej.v'),
      d,
      l;
    var u =
      '<div class="zdlitm zbg">                        <div class="up j-up f-thide"></div>                        <div class="down f-bg j-list"></div>                      </div>';
    s._$$DropListSelect = NEJ.C();
    d = s._$$DropListSelect._$extend(s._$$Popup);
    l = s._$$DropListSelect._$supro;
    d.__initNode = function () {
      this.__supInitNode();
      this.__up = o._$getByClassName(this.__body, 'j-up')[0];
      this.__listP = o._$getByClassName(this.__body, 'j-list')[0];
    };
    d.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(u);
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__editor = e.editor;
      this.__disabled = !1;
      this._$setValue(this.__defalutName);
      this.__dataList = e.data;
      this._$hideList();
      this.__genItem(this.__dataList);
      c._$addEvent(this.__listP, 'mousedown', function (e) {
        c._$stop(e);
      });
      this.__doInitDomEvent([
        [
          this.__body,
          'mouseup',
          function (e) {
            if (!this.__disabled) this.__showDown(e);
          }._$bind(this),
        ],
      ]);
      this._$setDisabled(!1);
      this.__editor.addListener(
        'selectionchange',
        function (e, t, n) {
          var i = this.__editor.queryCommandState(this.__cmd);
          if (i == -1) this._$setDisabled(!0);
          else {
            this._$setDisabled(!1);
            this._$getSelected();
          }
        }._$bind(this),
      );
      this.__editor.addListener(
        'focus',
        function () {
          this._$hideList();
        }._$bind(this),
      );
    };
    d.__genItem = function (e) {
      this.__listP.innerHTML = '';
      if (e)
        for (var t in e)
          if (e[t]) {
            var n = e[t];
            var i = this.__genItmTpl(t, e[t]);
            var a = o._$html2node(i);
            this.__doInitDomEvent([[a, 'mouseup', this.__itemClick._$bind(this, t)]]);
            this.__listP.appendChild(a);
          }
    };
    d.__genItmTpl = function (e, t) {
      return (
        '<div class="f-thide list" title="' +
        a._$escape(e.toString()) +
        '">' +
        a._$escape(t.toString()) +
        '</div>'
      );
    };
    d.__itemClick = function (e, t) {
      if (t) c._$stop(t);
      this.__selectedData = e;
      this._$setValue(this.__dataList[this.__selectedData]);
      this._$hideList();
    };
    d._$setDisabled = function (e) {
      if (e) o._$addClassName(this.__body, 'js-disabled');
      else o._$delClassName(this.__body, 'js-disabled');
      this.__disabled = !!e;
    };
    d._$getSelected = function () {
      var e = this.__editor.queryCommandValue(this.__cmd);
      if (e) this._$setValue(e);
      else this._$setValue(this.__defalutName);
    };
    d._$setValue = function (e) {
      this.__up.innerText = e;
    };
    d.__showDown = function (e) {
      if (e) c._$stop(e);
      if ('block' != this.__listP.style.display) this.__listP.style.display = 'block';
      else this._$hideList();
    };
    d._$hideList = function () {
      this.__listP.style.display = 'none';
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    d.__hidePop = d._$hideList;
    return s._$$DropListSelect;
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '28723c1c15c373c632e2f6d3d88dd9dc',
);
