EDU(
  'b0b9bd51e4e784fd239aaa6452d198e5',
  function (e, t) {
    var n = 0,
      i = 0,
      o = 0,
      a = 1;
    var r = e.$extends({
      config: function () {
        t.extend(this.data, {
          messages: [],
          position: 'topcenter',
          duration: 2e3,
          single: !1,
          class: '',
        });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.$root === this) this.$inject(document.body);
      },
      destroy: function () {
        this.supr();
      },
      show: function (e, a, r) {
        var s = {
          text: e,
          state: a || 'success',
          duration: r >= n ? +r : +this.data.duration,
          counter: 0,
        };
        var c = this.data.messages;
        if (this.data.single && c[o]) {
          s = t.extend(c[o], s, !0);
          s.counter++;
        } else {
          c.unshift(s);
          s.counter = i;
        }
        this.$update();
        if (s.duration)
          window.setTimeout(
            function () {
              if (!s.counter) this.close(s);
              else s.counter--;
            }.bind(this),
            s.duration,
          );
        this.$emit('show', { sender: this, message: s });
      },
      close: function (e) {
        var t = this.data.messages.indexOf(e);
        if (!(t < o)) {
          this.data.messages.splice(t, a);
          this.$update();
          this.$emit('close', { sender: this, message: e });
        }
      },
      closeAll: function () {
        this.data.messages = [];
        this.$update();
      },
      setPosition: function (e) {
        this.data.position = e || 'topcenter';
      },
      setSingle: function (e) {
        this.data.single = e || !1;
      },
    });
    var s = ['success', 'warning', 'info', 'error'];
    s.forEach(function (e) {
      r.prototype[e] = function (t, n, i) {
        if ('boolean' == typeof i) this.data.single = i;
        this.show(t, e, n);
      };
    });
    r.filter({
      theme: function (e) {
        switch (e) {
          case 'info':
            return 'th-bg11';
          default:
            return 'th-bg3';
        }
      },
    });
    return r;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
