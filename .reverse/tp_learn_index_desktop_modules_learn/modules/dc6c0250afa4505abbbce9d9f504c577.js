EDU(
  'dc6c0250afa4505abbbce9d9f504c577',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$OjInfoItem = NEJ.C();
    r = o._$$OjInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-OjInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__publishTimeNode = n._$getByClassName(this.__body, 'j-publishTime')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__ojInfoVo = e.ojInfoVo || {};
      this.__submitTimeNode.innerText = o._$formatCommonTime(this.__ojInfoVo.deadline);
      this.__publishTimeNode.innerText = o._$formatCommonTime(
        this.__ojInfoVo.evaluateScoreReleaseTime,
      );
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
