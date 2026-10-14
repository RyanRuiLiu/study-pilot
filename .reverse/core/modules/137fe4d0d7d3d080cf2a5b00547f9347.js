EDU(
  '137fe4d0d7d3d080cf2a5b00547f9347',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.m'),
      r = NEJ.P('nej.ut'),
      s = NEJ.P('edu.u'),
      c;
    a._$$Module = NEJ.C();
    c = a._$$Module._$extend(r._$$Module, !0);
    c.__doBuild = function (e) {
      this.__parent = this.__getParent();
      this.__body = i._$html2node(this.__getXhtml());
      this.__buildFuncPoints();
    };
    c.__getXhtml = n;
    c.__buildFuncPoints = n;
    c.__getParent = n;
    c.__onShow = function (t) {
      this.__onMarshal(t);
      this.__onModuleShow();
      if (s._$isIE()) e.docTitle = document.title;
    };
    c.__onRefresh = function (t) {
      this.__onMarshal(t);
      if (s._$isIE()) e.docTitle = document.title;
    };
    c.__onMarshal = n;
    c.__onModuleShow = function () {
      if (this.__parent && this.__body.parentNode != this.__parent)
        this.__parent.appendChild(this.__body);
    };
    c.__onHide = function () {
      o._$forIn(e.modelList, function (e, t, n) {
        if (e && e._$recycle) {
          delete n[t];
          e._$recycle();
        }
      });
      i._$removeByEC(this.__body);
    };
  },
  'd6c071332c7308ee7aac884791446059',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
