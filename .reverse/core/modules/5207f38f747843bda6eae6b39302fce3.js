EDU(
  '5207f38f747843bda6eae6b39302fce3',
  function (e, t) {
    var n = 1,
      i = 1,
      o = 1,
      a = 1,
      r = 5,
      s = -1,
      c = -2,
      d = 0,
      l = 1,
      u = 2;
    return e.$extends({
      computed: {
        hasNext: {
          get: function (e) {
            return e.index < e.total;
          },
        },
        hasPrev: {
          get: function (e) {
            return e.index > n;
          },
        },
        hasLeftSep: {
          get: function (e) {
            return e.from > d && e.from > n + l;
          },
        },
        hasRightSep: {
          get: function (e) {
            return e.to > d && e.to < e.total - l;
          },
        },
        hasLastPage: {
          get: function (e) {
            return e.total > l && !(e.disableLast && this.$get('hasRightSep'));
          },
        },
      },
      config: function () {
        t.extend(this, { count: r });
        t.extend(this.data, { index: o, total: a, from: s, to: c, disableLast: !1 });
        this.supr();
        this.$watch('index', this._onIndexUpdate._$bind(this));
        this.$watch('total', this._onTotalUpdate._$bind(this));
      },
      _onIndexUpdate: function (e, t) {
        var i = this.count,
          o = Math.floor(i / u);
        this.data.from = Math.max(n + l, Math.min(e - o, this.data.total - i));
        this.data.to = Math.min(this.data.total - l, this.data.from + i - l);
        if (this.data.to < d || this.data.from < d || this.data.from > this.data.to) {
          this.data.from = s;
          this.data.to = c;
        }
        if (t != e) this.$emit('change', { last: t, index: e, total: this.data.total });
      },
      _onTotalUpdate: function (e, t) {
        if (void 0 != t) {
          var n = this.data.index;
          this.data.total = e;
          this.data.index = Math.min(this.data.index, this.data.total);
          this._onIndexUpdate(this.data.index, n);
        }
      },
      go: function (e) {
        if (!(!e || e < n || e > this.data.total)) this.$update('index', e);
      },
      prev: function () {
        this.go(this.data.index - i);
      },
      next: function () {
        this.go(this.data.index + i);
      },
    });
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
