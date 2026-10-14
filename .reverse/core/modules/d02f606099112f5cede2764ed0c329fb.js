EDU(
  'd02f606099112f5cede2764ed0c329fb',
  function (e, t, n) {
    var i = e.$extends({ name: 'um-modal', css: n, template: t });
    i.alert = function (e, t, n, o) {
      var a = new i({ data: { content: e, title: t, okButton: n, type: o || 'warning' } });
      return a;
    };
    i.confirm = function (e, t, n, o, a) {
      var r = new i({
        data: {
          content: e,
          title: t,
          okButton: n,
          cancelButton: null == o ? !0 : o,
          type: a || 'warning',
        },
      });
      return r;
    };
    return i;
  },
  '26f449f90f63799f69a9bf96670cc396',
  '2d88212ea8f60a21c773937f7b70c6b7',
  '216794b3b36ee801d2e53f10d172ad44',
);
