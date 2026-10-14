EDU(
  '6964b7ed18f05bd5ff4c3d6e5db23007',
  function (e, t) {
    var n = {},
      i = (function () {
        return this;
      })();
    n._$hiddenNode = function (e) {
      if (e) e.style.display = 'none';
    };
    n._$isNodeShown = function (e) {
      if (e) return 'none' != e.style.display;
      else return !1;
    };
    n._$showNode = function (e) {
      if (e) e.style.display = '';
    };
    n._$toggleNodeDisplay = function (e, t) {
      if (t) n._$showNode(e);
      else n._$hiddenNode(e);
    };
    n._$toggleClassName = function (e, n, i) {
      if (e) t._$addClassName(n, i);
      else t._$delClassName(n, i);
    };
    return n;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
