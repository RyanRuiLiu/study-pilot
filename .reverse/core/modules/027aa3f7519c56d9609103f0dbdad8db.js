EDU(
  '027aa3f7519c56d9609103f0dbdad8db',
  function (e, t, n) {
    var i = 0;
    var o = 14;
    var a = e.$extends({
      config: function () {
        t.extend(this, { settingKey: 'component-hover', mouseLeaveHide: !0 });
        t.extend(this.data, {
          ptop: 0,
          pleft: 0,
          pwidth: 0,
          pheight: 0,
          contentTemplate: '',
          top: 0,
          left: 0,
          arrClass: 'up',
          arrLeft: 0,
          topDiff: 0,
          leftDiff: 0,
        });
        this.supr();
        this.mouseenter = this.mouseenter._$bind(this);
        this.mouseleave = this.mouseleave._$bind(this);
        this.keepShow = this.keepShow._$bind(this);
        this.toHide = this.toHide._$bind(this);
        this.checkMouseenter = this.checkMouseenter._$bind(this);
      },
      init: function () {
        this.supr();
        this.btn = this.$refs.btn || this.btn;
        if (!this.$refs.btn && this.btn) {
          Regular.dom.on(this.btn, 'mouseenter', this.mouseenter.bind(this));
          Regular.dom.on(this.btn, 'mouseleave', this.mouseleave.bind(this));
        }
        this.$on('mouseenter', this.checkMouseenter);
      },
      checkMouseenter: function (e) {
        if (this.id !== e) this.hide();
      },
      mouseenter: function () {
        var e = this;
        if (!this.list) {
          this.list = new n({
            data: { showArrow: this.data.showArrow, listClass: this.data.listClass },
            $body: this.$body,
            mouseenter: this.keepShow,
            mouseleave: this.toHide,
          }).$inject(document.body);
          this.list.$on('$destroy', function () {
            e.$emit('hide');
          });
        }
        this.keepShow();
        this.updateListPosition();
      },
      mouseleave: function () {
        this.toHide();
      },
      keepShow: function () {
        this.$emit('mouseenter', this.id);
        if (this.timer) clearTimeout(this.timer);
      },
      toHide: function () {
        var e = this;
        this.timer = setTimeout(function () {
          e.hide();
        }, +this.data.timeout || 500);
      },
      hide: function () {
        if (this.list && this.mouseLeaveHide) {
          this.list.destroy();
          this.list = null;
        }
        clearTimeout(this.timer);
      },
      updateListPosition: function () {
        var e = this.btn.style.display;
        var t = this.btn.offsetHeight;
        var n = this.btn.offsetWidth;
        var i = this.list.$refs.tip;
        var a = i.offsetWidth;
        this.data.leftDiff = +this.data.leftDiff;
        this.data.topDiff = +this.data.topDiff;
        var r = this.getBoundingClientRect(this.btn);
        this.btn.style.display = e;
        var s;
        var c;
        if (this.data.onLeft) c = r.left;
        else if (this.data.onRight) c = r.right - a + this.data.leftDiff;
        else c = r.left + this.scrollLeft() - (a - n) / 2;
        if (c < 0) c = 0;
        else if (c + a > document.documentElement.clientWidth)
          c = document.documentElement.clientWidth - a;
        c += this.scrollLeft();
        var d = r.left + n / 2 - c - o / 2;
        if (d + o > a) d = a - o;
        else if (d < 0) d = 0;
        var l = document.documentElement.clientHeight - r.bottom;
        var u = r.top;
        var _;
        if (l > u) {
          s = r.top + t + this.scrollTop() + o + this.data.topDiff;
          _ = 'up';
        } else {
          s = r.top + this.scrollTop() - o - i.offsetHeight - this.data.topDiff;
          _ = 'down';
        }
        this.list.$update({ top: s, left: c, arrLeft: d, direction: _ });
      },
      getBoundingClientRect: function (e) {
        var t = document.documentElement.scrollTop;
        if (e.getBoundingClientRect) return e.getBoundingClientRect();
      },
      scrollTop: function () {
        return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      },
      scrollLeft: function () {
        return (
          document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
        );
      },
      destroy: function () {
        this.supr();
      },
      api: function () {},
      _api: function () {},
    });
    return a;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'ace913a9f3997ab521683a9d5bf5c1f0',
);
