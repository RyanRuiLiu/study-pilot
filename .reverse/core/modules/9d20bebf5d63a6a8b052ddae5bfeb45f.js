EDU(
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  function (e, t, n) {
    if ('undefined' != typeof module && module.exports) {
      Regular = require('regularjs');
      polyfill = require('./polyfill.js');
      e = require('./_.js');
      t = require('./filter.js');
      n = require('./directive.js');
    }
    var i = Regular.extend({
      config: function () {
        e.extend(this.data, {
          readonly: !1,
          disabled: !1,
          visible: !0,
          class: '',
          console: 'undefined' == typeof console ? void 0 : console,
        });
        this.supr();
      },
      reset: function () {
        this.data = {};
        this.config();
      },
      setState: function (e, t) {
        this.data.state = e ? 'success' : 'error';
        this.data.tip = t;
        this.$update();
      },
    })
      .filter(t)
      .directive(n);
    return i;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '1b142913848c09df226ad8fac907e872',
  '1d5bee1c4160790a17ca50faaceead81',
);
