EDU(
  '76b358c87f41ecd47da41ee2ba42776f',
  function (e, t, n, i, o, a, r, s) {
    var c = window.Regular;
    return e.$extends({
      name: 'ux-validation',
      template: t,
      css: n,
      config: function () {
        this._setting = i.get('component-validation');
        this.supr();
        this.$watch('rules', function (e) {
          if ('' == e || void 0 == e) {
            this.data.message = '';
            this.$update();
          }
        });
      },
      init: function () {
        var e = this;
        this.addToControl();
        this.supr();
      },
      addToControl: function () {
        var e = this;
        var t = this.$outer;
        do {
          var n;
          for (; t;)
            if (t instanceof r) {
              t.controls.push(this);
              this.$on('destroy', function () {
                var e = this.parentContainer.controls.indexOf(this);
                this.parentContainer.controls.splice(e, 1);
              });
              this.parentContainer = t;
              n = !0;
              break;
            } else t = t.$outer;
          if (n) break;
          e = e.$parent;
          t = (e || {}).$outer;
        } while (e);
      },
      scrollToCurrent: function () {
        var e = s._$offset(c.dom.element(this));
        window.scrollTo(e.x, e.y - ((this._setting.offset || {}).y || 0));
      },
      validate: function (e, t) {
        var n = { success: !0, message: '' },
          i = !0,
          o;
        if (void 0 === e) e = this.data.value;
        if (!this.data.rules || 0 == this.data.rules.length) return n;
        for (var r = 0, s = this.data.rules.length; r < s; r++) {
          o = this.data.rules[r];
          switch (o.type) {
            case 'is':
              i = o.reg.test(e);
              break;
            case 'isRequired':
              i = !!a.toString(e);
              break;
            case 'isFilled':
              i = !!a.toString(e).trim();
              break;
            case 'isEmail':
              i = a.isEmail(e);
              break;
            case 'isMobilePhone':
              i = a.isMobilePhone(e, 'zh-CN');
              break;
            case 'isURL':
              i = a.isURL(e);
              break;
            case 'isNumber':
              i = a.isInt(e, o);
              break;
            case 'isId':
              i = a.isId(e);
              break;
            case 'isInt':
              i = a.isInt(e, o);
              break;
            case 'isFloat':
              i = a.isFloat(e, o);
              break;
            case 'isSoftDecimal2':
              i = a.isSoftDecimal2(e, o.min, o.max);
              break;
            case 'isLength':
              i = a.isLength(e, o.min, o.max);
              break;
            case 'inputTips':
              n = a.inputTips(e, o.min, o.max, t || this.data.isRealTime, o.afterText);
              break;
            default:
              if (!o.method) n = { success: !1, message: '找不到此规则的校验方法' };
              else i = o.method(e);
          }
          if (!i || !n.success) {
            n.message = o.message || n.message;
            n.success = !1;
            break;
          } else this.data.message = '';
        }
        this.data.message = n.message;
        this.data.success = n.success;
        this.data.state = n.success ? 'success' : 'error';
        this.$update();
        return n;
      },
      destroy: function () {
        this.supr();
      },
    });
  },
  '235c21779ec98ac90606962a862dadc9',
  '73bcf397e9d4d9dfddf98fa4b66cb79e',
  '85037d9f95a85de5419b6fcb0673c772',
  '8f34a99b20d362b3542aebd517390fc1',
  '217dcfc103efb36d2f192eecc4548797',
  '8cef6083a5dcc1555a6a85163ef158e2',
  'f7a7f0a146b7050b707d24d8149041a6',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
