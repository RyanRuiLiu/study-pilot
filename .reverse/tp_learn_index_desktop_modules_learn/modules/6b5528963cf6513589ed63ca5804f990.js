EDU(
  '6b5528963cf6513589ed63ca5804f990',
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
      '<div><div class="j-content content f-richEditorText f-f0 ql-editor"></div><div class="j-empty empty"><span class="f-ib f-f0 j-emptyTips"></span></div></div>',
    );
    var d = n._$pushCSSText('.#<uispace> .content{ font-size:14px;}');
    o._$$CommonContentUI = NEJ.C();
    r = o._$$CommonContentUI._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_css = d;
      this.__seed_html = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__contentNode = n._$getByClassName(this.__body, 'j-content')[0];
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
      this.__emptyTipsNode = n._$getByClassName(this.__body, 'j-emptyTips')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      if (e.content) {
        o._$showNode(this.__contentNode);
        o._$hiddenNode(this.__emptyNode);
        this.__contentNode.innerHTML = e.content;
        s._$renderRich2(this.__contentNode);
      } else {
        o._$hiddenNode(this.__contentNode);
        o._$showNode(this.__emptyNode);
        this.__emptyTipsNode.innerText = e.emptyTips || '';
      }
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
