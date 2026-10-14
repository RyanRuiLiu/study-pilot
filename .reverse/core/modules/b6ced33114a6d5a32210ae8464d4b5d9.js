EDU(
  'b6ced33114a6d5a32210ae8464d4b5d9',
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
