EDU(
  '6b668295c862ca39b16b7e62b0355197',
  function (e, t, n, i) {
    var o = e.$extends({ name: 'ux-login-set-login-set-panel', css: n, template: t });
    o.showLoginDialog = function (e) {
      var t = new i({
        data: {
          class: 'ux-login-set-login-set-dialog ' + e,
          contentTemplate: '<ux-login-set-login-set-panel />',
          okButton: !1,
        },
      });
      return t;
    };
    return o;
  },
  'f50b2a7d02c882d847f4967bb184dd8e',
  '4512b6e249f1613d72019acc45ae57a4',
  '74570af209363f4536377af6f42f26c0',
  'abe9a6b99742882e8efaadd2518b0cb2',
);
