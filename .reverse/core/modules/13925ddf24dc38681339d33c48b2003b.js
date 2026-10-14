EDU(
  '13925ddf24dc38681339d33c48b2003b',
  function (e, t) {
    if ('undefined' != typeof module && module.exports) {
      t = require('./component');
      e = require('./_');
    }
    var n = t.extend({
      service: null,
      config: function () {
        e.extend(this.data, { source: [], updateAuto: !0 });
        if (this.data.service) this.service = this.data.service;
        if (this.service && this.data.updateAuto) this.$updateSource();
        this.supr();
      },
      getParams: function () {
        return {};
      },
      $updateSource: function () {
        this.service.getList(
          this.getParams(),
          function (e) {
            this.$update('source', e);
          }.bind(this),
        );
        return this;
      },
    });
    return n;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
);
