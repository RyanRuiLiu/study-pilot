EDU(
  'abe9a6b99742882e8efaadd2518b0cb2',
  function (e, t, n, i) {
    var o = t.$extends({ name: 'ux-modal', css: i, template: n });
    o.alert = function (t, n, i, a, r) {
      var s = new o({
        data: { class: r, content: t, title: n, okButton: i, type: a || 'warning', lang: e },
      });
      return s;
    };
    o.confirm = function (t, n, i, a, r, s, c) {
      var d = new o({
        data: {
          class: c,
          content: t,
          title: n,
          okButton: i,
          cancelButton: null == a ? !0 : a,
          lang: e,
          type: r || 'warning',
        },
        nodePointer: s,
      });
      return d;
    };
    return o;
  },
  '3aece1cedbc356fb763a16c12e377694',
  '26f449f90f63799f69a9bf96670cc396',
  '36facdacded725d928dfe5c28e874d10',
  '27fef48fbe184f2f9820e05ea0c2f60c',
);
