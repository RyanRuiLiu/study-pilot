EDU(
  '01fdd3674541c450b53a219f1186e35b',
  function (e, t) {
    if ('undefined' != typeof module && module.exports) {
      var e = require('../base/_');
      var t = require('./validator.js');
    }
    var n = Regular.extend({
      name: 'validation',
      template: '{#inc this.$body}',
      config: function () {
        this.controls = [];
        e.extend(this.data, {});
        this.supr();
      },
      validate: function () {
        if (this.data.disabled) return { success: !0, message: 'Validation is disabled.' };
        var e = { results: [], success: !0, message: '' };
        var t;
        this.controls.forEach(function (n) {
          var i = n.validate(!1);
          if ((!i || !i.success) && n.blurRules && n.blurRules.length > 0) i = n.validateBlur(!1);
          if (i) {
            e.results.push(i);
            if (!i.success) {
              e.success = !1;
              e.message = e.message || i.message;
              if (!t && n.$refs.tip) t = n.$refs.tip;
            }
          }
        });
        if (t && t.scrollIntoViewIfNeeded) t.scrollIntoViewIfNeeded(!0);
        return e;
      },
    });
    n.validate = function (e, n, i) {
      var o = { success: !0, message: '' },
        a,
        r = '',
        s;
      for (var c = 0, d, l = n.length; c < l; c++) {
        d = n[c];
        r = d.message;
        if (!d.canEmpty || 'string' != typeof e || 0 != e.length) {
          switch (d.type) {
            case 'is':
              a = d.reg.test(e);
              break;
            case 'isRequired':
              a = !!t.toString(e);
              break;
            case 'isFilled':
              a = !!t.toString(e).trim();
              break;
            case 'isEmail':
              a = t.isEmail(e);
              break;
            case 'isMobilePhone':
              a = t.isMobilePhone(e, 'zh-CN');
              break;
            case 'isURL':
              a = t.isURL(e);
              break;
            case 'isNumber':
              a = t.isInt(e);
              break;
            case 'isId':
              a = t.isId(e);
              break;
            case 'isInt':
              a = t.isInt(e, d);
              break;
            case 'isFloat':
              a = t.isFloat(e);
              break;
            case 'isSoftDecimal2':
              a = t.isSoftDecimal2(e, d.min, d.max);
              break;
            case 'isLength':
              a = t.isLength(e, d.min, d.max);
              break;
            case 'inputTips':
              s = t.inputTips(e, d.min, d.max, i, d.afterText);
              a = s.success;
              r = s.message;
              break;
            default:
              if (!d.method) {
                a = !1;
                r = '找不到此规则的校验方法';
              } else a = d.method(e);
          }
          if (!a) {
            o.message = r;
            o.success = !1;
            break;
          }
        } else;
      }
      return o;
    };
    return n;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '928e07b32b76825f2af5cb2ecdc4cada',
);
