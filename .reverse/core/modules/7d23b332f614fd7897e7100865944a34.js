EDU(
  '7d23b332f614fd7897e7100865944a34',
  function (e) {
    var t = {};
    t['r-rhtml'] = function (t, n) {
      t.className = t.className + ' f-richEditorText';
      this.$watch(n, function (n) {
        e._$renderRich(t, n);
      });
    };
    if (Regular) Regular.directive(t);
    return t;
  },
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
);
