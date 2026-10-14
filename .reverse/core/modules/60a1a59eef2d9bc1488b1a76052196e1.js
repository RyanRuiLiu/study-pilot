EDU(
  '60a1a59eef2d9bc1488b1a76052196e1',
  function (e, t, n, i, o) {
    var a = e
      .$extends({
        config: function () {
          t.extend(this.data, { tabs: [], selected: void 0, titleTemplate: null });
          this.supr();
          this.$watch('selected', function (e, t) {
            this.$emit('change', { sender: this, selected: e, lastSelected: t });
          });
        },
        init: function () {
          this.supr();
        },
        refresh: function (e) {
          var t = e.target,
            n = e.param;
          this.data.selected = { param: n, id: t };
          this.$update();
        },
        select: function (e) {
          if (!(this.data.readonly || this.data.disabled || e.disabled)) {
            this.data.selected = o({}, this.data.selected, e);
            this.onSelect({ selected: this.data.selected, item: e });
          }
        },
        onSelect: function (e) {
          var t = e.selected.param || '';
          if ('object' == typeof e.selected.param) t = n._$object2string(e.selected.param, '&');
          if (t.length > 0) t = '?' + t;
          this.$emit('select', { sender: this, url: e.selected.id + t, selected: e.item });
        },
        destroy: function () {
          this.supr();
        },
      })
      .filter({
        judgeSelect: function (e) {
          if (this.data.selected && null != this.data.selected.id)
            if (this.data.selected.id.indexOf && this.data.selected.id.indexOf('/') != -1)
              return this.data.selected.id.indexOf(e) != -1;
            else return e == this.data.selected.id;
        },
      });
    return a;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '193da21a400c23795b31f450aa34123b',
);
