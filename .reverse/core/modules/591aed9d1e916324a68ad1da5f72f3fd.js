EDU(
  '591aed9d1e916324a68ad1da5f72f3fd',
  function (e, t, n, i, o, a, r, s) {
    var c = window,
      d = NEJ.P('nej.v'),
      l = NEJ.P('edu.u');
    var u = i.extend({
      name: 'schoolUI',
      template: t,
      data: {
        value: '',
        maxlength: void 0,
        startLength: 0,
        delay: 300,
        matchType: 'all',
        strict: !1,
        visible: !0,
        cacheCurrent: 0,
        current: 0,
        letterList: '',
        eltIE9: a.msie && a.version <= 9,
        selected: {},
        open: !1,
        showAZBoard: !1,
        lang: e.exports,
        isEn: e.isEn,
      },
      config: function () {
        this.supr();
        var t = this;
        n.extend(this.data, {
          schoolNameRules: [
            {
              type: 'isNotSupported',
              message: e.KEY_CLOUD_SCHOOL_NOT_SUPPORT1,
              method: function (e) {
                return (
                  '' == e ||
                  void 0 == e ||
                  void 0 == t.data.validateSchool ||
                  t.data.validateSchool != -1
                );
              },
            },
          ],
        });
      },
      init: function () {
        this.supr();
        this.list = this.$refs.list;
        this.$on('$destroy', function () {
          var e = o.opens.indexOf(this);
          if (e >= 0) o.opens.splice(e, 1);
        });
        this.$watch('value', function () {
          this.$emit('stateChange', { sender: this, value: this.data.selected });
        });
      },
      select: function (e, t) {
        if ('undefined' == typeof t) t = this.data.current;
        if (!(this.data.readonly || this.data.disabled || !e || e.disabled || e.divider)) {
          this.data.selected = e;
          this.data.current = t;
          this.data.value = e.name;
          this.data.cacheValue = this.data.value;
          this.$emit('select', { sender: this, selected: e });
          this.toggle(!1);
        }
      },
      toggle: function (e, t) {
        if (!this.data.readonly && !this.data.disabled) {
          if (void 0 === e) e = !this.data.open;
          this.data.open = e;
          if (!e && 'function' == typeof this.$refs.input.blur) this.$refs.input.blur();
          var n = o.opens.indexOf(this);
          if (e && n < 0) o.opens.push(this);
          else if (!e && n >= 0) {
            o.opens.splice(n, 1);
            if (!t && this.data.strict)
              this.data.value = this.data.selected ? this.data.selected.name : '';
          }
        }
      },
      onInput: function (e) {
        var t = this.data.value || '';
        if (t && t.length >= this.data.startLength) {
          this.toggle(!0);
          if (this.service) this.$updateSource();
        }
      },
      click: function (e, t) {
        this.select(e, t);
        this.$emit('over', { sender: this, value: this.data.selected });
      },
      debounce: function (e) {
        this.data.showAZBoard = !1;
        this.data.value = this.$refs.input.data.value;
        this.onInput(e);
        if (38 == e.which) this.selectUpDown(!0);
        else if (40 == e.which) this.selectUpDown(!1);
        else if (13 == e.which) {
          if (this.data.source) this.select(this.data.source[this.data.current || 0]);
        } else {
          this.data.current = 0;
          var t = this.data.value;
          var n = this;
          if (!t || !t.length) {
            this.data.showAZBoard = !0;
            this.data.open = !1;
            this.data.showEmptyText = !1;
            this.$update();
            return;
          }
          s._$getSchoolSugList({ name: this.data.value }, function (e) {
            if (e.length > 0) {
              if (e.length > 6) e = e.slice(0, 6);
              n.data.source = e;
              n.data.open = !0;
              n.data.showEmptyText = !1;
            } else {
              n.data.open = !1;
              n.data.showEmptyText = !0;
            }
            n.$update();
          });
        }
      },
      keyup: function (e) {
        l._$debounce(this.debounce._$bind(this, e), 400, !0)(e);
      },
      enter: function (e, t) {
        this.data.current = t;
      },
      leave: function () {},
      focus: function () {
        if ('function' == typeof this.$refs.input.focus) this.$refs.input.focus();
      },
      selectUpDown: function (e) {
        if ('undefined' == typeof this.data.current) this.data.current = -1;
        this.data.current += e ? -1 : 1;
        if (this.data.current < 0) this.data.current = this.data.source.length - 1;
        if (this.data.current >= this.data.source.length) this.data.current = 0;
        this.data.value = this.data.source[this.data.current].name;
        this.$update();
      },
      getParams: function () {
        return this.data.value;
      },
      onFocus: function () {
        this.data.showAZBoard = !0;
        this.data.open = !1;
        this.data.showEmptyText = !1;
        this.$update();
        s._$getAzSchoolList(
          {},
          function (e) {
            this.data.letterList = e;
            this.$update();
          }._$bind(this),
        );
      },
      onselectSchool: function (e) {
        this.data.showAZBoard = !1;
        this.data.value = e.value.name;
        this.$update();
        this.$emit('over', { sender: this, value: { name: this.data.value } });
        d._$stopBubble(e.e.event);
      },
      hideBoard: function () {
        this.data.showAZBoard = !1;
        this.$update();
      },
      hideList: function () {
        this.data.open = !1;
        this.data.showEmptyText = !1;
        this.$update();
      },
      validate: function (e) {
        this.data.validateSchool = e;
        this.$update();
        this.$refs.input.validate();
      },
    });
    return u;
  },
  '2f5fec6cee701d8671f51622fe5e3f0c',
  '936cd6656efed964da9c8273504a4882',
  'ca38b7e137b28e4006cbadb343315267',
  '6f1453d31194f86271694dd0542354fe',
  'c1e87ef44060d70dabbce4090d7a065c',
  '70dc37c0ea9dd2b3688f2eac79178cd8',
  'f2c77013a89cb6839d3fa3f83ec671c2',
  'a7249557d447d6dcda85dbcdf80899c7',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
