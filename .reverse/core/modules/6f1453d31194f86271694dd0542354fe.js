EDU(
  '6f1453d31194f86271694dd0542354fe',
  function (e, t, n) {
    var i = Regular.extend({
      $urlPrefix: window.urlPrefix,
      $webUser: window.webUser,
      $defaultConfig: window.defaultConfig,
      $validate: n.validate,
      validate: function (e) {
        if (0 != e) e = this.data.isRealTime;
        var t = this.data.value;
        var i = this.data.rules;
        if (i && i.length) {
          var o = n.validate(t, i, e);
          this.data.state = o.success ? 'success' : 'error';
          this.data.tip = o.message;
          this.$update();
          return o;
        }
      },
      reset: function () {
        this.supr();
      },
    })
      .filter(e)
      .directive(t);
    return i;
  },
  '844ff2e539e8fc059b464a090ac95511',
  '60c45968817fc916ed2b8cf06ee6aa79',
  '01fdd3674541c450b53a219f1186e35b',
);
