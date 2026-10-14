EDU(
  '131bbfaab790fa87ad05ca269143c91b',
  function (e, t) {
    var n = 40;
    if (!Array.prototype.find)
      Array.prototype.find = function (e) {
        'use strict';
        if (null == this) throw new TypeError('Array.prototype.find called on null or undefined');
        if ('function' != typeof e) throw new TypeError('predicate must be a function');
        var t = Object(this);
        var n = t.length >>> 0;
        var i = arguments[1];
        var o;
        for (var a = 0; a < n; a++) {
          o = t[a];
          if (e.call(i, o, a, t)) return o;
        }
      };
    var i = e.$extends({
      config: function () {
        t.extend(this.data, {
          itemTemplate: null,
          open: !1,
          visible: !0,
          hoverToggle: !1,
          placeholder: '请选择',
          key: 'id',
          readonly: !1,
          selected: void 0,
          disabled: !1,
          rules: [],
          value: void 0,
          alwaysChange: !1,
          alwaysOpen: !1,
          hoverSelect: !1,
        });
        this.supr();
        this.$watch('selected', function (e, t) {
          this.data.value = e ? e[this.data.key] : e;
          if (t || this.data.alwaysChange)
            this.$emit('change', {
              sender: this,
              selected: e,
              key: this.data.key,
              value: this.data.value,
            });
        });
        this.$watch('value', function (e) {
          if (void 0 === e || null === e) return (this.data.selected = e);
          else if (this.data.source && this.data.source instanceof Array)
            if (!this.data.selected || this.data.selected[this.data.key] !== e)
              this.data.selected = this.data.source.find(function (t) {
                return t[this.data.key] == e;
              }, this);
        });
        this.$watch('source', function (e) {
          if (void 0 === e) return (this.data.selected = void 0);
          if (!(e instanceof Array)) throw new TypeError('`source` is not an Array!');
          if (e.length && ('string' == typeof e[0] || 'number' == typeof e[0]))
            return (this.data.source = e.map(
              function (e, t) {
                var n = { name: e };
                n[this.data.key] = t;
                return n;
              }._$bind(this),
            ));
          if (void 0 !== this.data.value) {
            this.data.selected = e.find(
              function (e) {
                return e[this.data.key] == this.data.value;
              }._$bind(this),
            );
            this.data.value = this.data.selected ? this.data.selected[this.data.key] : null;
          }
          if (!this.data.placeholder && !this.data.selected) this.data.selected = e[0];
        });
        this.$watch('open', function (e) {
          if (e) this.$emit('open', {});
        });
      },
      destroy: function () {
        var e = i.opens.indexOf(this);
        e >= 0 && i.opens.splice(e, 1);
        this.supr();
      },
      toggle: function (e) {
        if (!this.data.disabled) {
          if (void 0 === e) e = !this.data.open;
          this._actureToggle(e);
        }
      },
      hoverToggle: function (e) {
        var t = 100;
        if (this.data.hoverToggle && !this.data.disabled) {
          if (void 0 === e) e = !this.data.open;
          if (!e)
            this.__onSetTimeHide = window.setTimeout(
              function () {
                this._actureToggle(e);
              }._$bind(this),
              t,
            );
          else {
            this.__onSetTimeHide = window.clearTimeout(this.__onSetTimeHide);
            this._actureToggle(e);
          }
        }
      },
      _actureToggle: function (e) {
        var t;
        this.data.open = e;
        this._updateOpensArray(e);
        this.$update();
        this.$emit('toggle', { sender: this, open: e });
      },
      _updateOpensArray: function (e) {
        index = i.opens.indexOf(this);
        if (e && index < 0) i.opens.push(this);
        else if (!e && index >= 0) i.opens.splice(index, 1);
      },
      upOrDown: function (e, t, i) {
        var o,
          a,
          r,
          s = !1;
        i = i || n;
        if (e && this.$refs.element && this.$refs.element.getBoundingClientRect && this.$refs.bd) {
          if (void 0 == t) {
            o = this.$refs.bd.style.display;
            this.$refs.bd.style.display = 'block';
            t = this.$refs.bd.offsetHeight;
            this.$refs.bd.style.display = o;
          }
          a = this.$refs.element.getBoundingClientRect();
          r = document.documentElement.clientHeight - i - a.bottom;
          s = this.data.up = r < t && a.top > r;
        }
        return s;
      },
      select: function (e, t, n, i) {
        if (!(this.data.readonly || this.data.disabled || (e && (e.disabled || e.divider)))) {
          this.data.selected = e;
          this.$emit('select', {
            sender: this,
            selected: e,
            parent: t,
            originalEvent: n,
            index: i,
          });
          this.toggle(!1);
          this.validate();
        }
      },
      onHoverSelect: function (e, t, n) {
        if (this.data.hoverSelect) this.select(e, void 0, t, n);
      },
      validate: function () {
        return this.$refs.validation.validate(this.data.selected ? this.data.selected : null);
      },
      getSelectedItem: function () {
        return this.data.selected;
      },
    });
    i.opens = [];
    Regular.dom.on(document, 'click', function (e) {
      var t, n;
      i.opens.forEach(function (i) {
        t = i.$refs.element;
        n = e.target;
        for (; n;) {
          if (t == n) return;
          n = n.parentElement;
        }
        i.toggle(!1);
        i.$update();
      });
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '76b358c87f41ecd47da41ee2ba42776f',
);
