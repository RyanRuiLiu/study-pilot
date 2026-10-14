EDU(
  'e84f4ffbabe7f66126ac41b88810c962',
  function (e) {
    var t = NEJ.O,
      n = window,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('edu.m'),
      s = NEJ.P('edu.d'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.j'),
      l = NEJ.P('edu.cms');
    var u, _, f;
    i._$parseTemplate(i._$html2node(e));
    var h = function () {
      u = i._$html2node(i._$getHtmlTemplate('jst-edu-ui-loading'));
      document.body.appendChild(u);
      _ = i._$get('loadingMask');
      f = i._$get('loadingPb');
    };
    c.showLoading = function (e) {
      if (!u) h();
      e = e || !1;
      if (!e) c._$showNode(_);
      c._$showNode(f);
    };
    c.hideLoading = function () {
      _ = _ || i._$get('loadingMask');
      f = f || i._$get('loadingPb');
      _ && c._$hiddenNode(_);
      f && c._$hiddenNode(f);
    };
  },
  '3eab45af1879a2eb052b9a8878c9705c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
);
