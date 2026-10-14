EDU(
  'c0dd21910ad7af74349ee30bc87e5ed9',
  function (e, t, n) {
    var i = e.$extends({
      name: 'ux-mobile-modal',
      css: n,
      template: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
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
    i.alert = function (e, t, n) {
      var o = new i({
        data: { content: e, title: t, okButton: n || '确定', cancelButton: !1, type: 'warning' },
      });
      return o;
    };
    i.CONST = e.CONST;
    return i;
  },
  'd02f606099112f5cede2764ed0c329fb',
  '3776e06a0984c2f84c0ab9e3df7d246e',
  'ee09a723d8437ec130a232e749cf49db',
  '193da21a400c23795b31f450aa34123b',
);
