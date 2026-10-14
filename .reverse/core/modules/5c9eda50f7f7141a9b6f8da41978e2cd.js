EDU(
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      s;
    var c = i._$addNodeTemplate('<div class="u-moocbl"><span class="j-tips"></span></div>');
    a._$$SpocMoocSplit = NEJ.C();
    s = a._$$SpocMoocSplit._$extend(a._$$UIBase, !0);
    s.__initXGui = function () {
      this.__seed_html = c;
    };
    s.__initNode = function () {
      this.__supInitNode();
      this.__tipsNode = i._$getByClassName(this.__body, 'j-tips')[0];
    };
    s.__reset = function (e) {
      this.__supReset(e);
      this.__tipsNode.innerText = e.tips || window.moocConfig.lang.KEY_LEARN_SOURCE_CONTENT;
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
