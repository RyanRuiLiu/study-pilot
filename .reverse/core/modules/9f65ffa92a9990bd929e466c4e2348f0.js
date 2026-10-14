EDU(
  '9f65ffa92a9990bd929e466c4e2348f0',
  function (e, t, n) {
    var i = n
      .extend({
        name: 'applySuccessModal',
        data: {
          contentTemplate: e,
          class: 'u-apply-success-modal',
          title: '',
          okButton: '知道了',
          cancelButton: '',
        },
        config: function () {
          this.supr();
          t.extend(this.data, {});
        },
        init: function () {
          this.supr();
          this.$on('ok', function () {}._$bind(this));
        },
      })
      .filter({})
      .directive({});
    i.show = function (e) {
      var t = new i({ data: e });
      return t;
    };
    return i;
  },
  '147f7e8cad6b1edebed91d1d9759a805',
  'ca38b7e137b28e4006cbadb343315267',
  '147dc5970e28e453eca3d302eb318dbe',
);
