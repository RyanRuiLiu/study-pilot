EDU(
  'f7a7f0a146b7050b707d24d8149041a6',
  function (e) {
    var t = Regular.extend({
      name: 'ux-validation-container',
      template: '{#inc this.$body}',
      config: function (t) {
        this.controls = [];
        e.extend(this.data, { disabled: !1, scroll: !0 });
        this.supr(t);
      },
      validate: function () {
        if (this.data.disabled) return { success: !0, message: 'Validation is disabled.' };
        var e = { results: [], success: !0, message: '' };
        var t = this.data.onlyFirst,
          n;
        for (var i = 0, o = this.controls.length; i < o; i++) {
          n = this.controls[i];
          if (t && !e.success) break;
          var a = n.validate();
          if (a) {
            e.results.push(a);
            if (!a.success) {
              if (e.success && this.data.scroll) n.scrollToCurrent();
              e.success = !1;
              e.message = e.message || a.message;
            }
          } else;
        }
        return e;
      },
    });
    return t;
  },
  '217dcfc103efb36d2f192eecc4548797',
);
