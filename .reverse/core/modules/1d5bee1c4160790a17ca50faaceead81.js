EDU(
  '1d5bee1c4160790a17ca50faaceead81',
  function (e, t) {
    if ('undefined' != typeof module && module.exports) {
      e = require('./_.js');
      t = require('../util/validation.js');
    }
    var n = {};
    var i = function (t) {
      n[t] = function (n, i) {
        if ('object' == typeof i && 'expression' == i.type)
          this.$watch(i, function (i, o) {
            e.dom[i ? 'addClass' : 'delClass'](n, t);
          });
        else if (i || '' === i) e.dom.addClass(n, t);
      };
    };
    i('z-crt');
    i('z-sel');
    i('z-chk');
    i('z-dis');
    i('z-divider');
    n['r-show'] = function (e, t) {
      if ('object' == typeof t && 'expression' == t.type)
        this.$watch(t, function (t, n) {
          if (!t != !n)
            if ('string' == typeof t) e.style.display = t;
            else e.style.display = t ? 'block' : '';
        });
      else if (t || '' === t)
        if ('string' == typeof t && '' !== t) e.style.display = t;
        else e.style.display = t ? 'block' : '';
    };
    n['r-autofocus'] = function (e, t) {
      setTimeout(function () {
        e.focus();
      }, 30);
    };
    n['r-attr'] = function (t, n) {
      var i = {
        INPUT: [
          'autocomplete',
          'autofocus',
          'checked',
          'disabled',
          'max',
          'maxlength',
          'min',
          'multiple',
          'name',
          'pattern',
          'placeholder',
          'readonly',
          'required',
          'step',
          'type',
        ],
        TEXTAREA: [
          'autofocus',
          'disabled',
          'maxlength',
          'name',
          'placeholder',
          'readonly',
          'required',
          'wrap',
        ],
        SELECT: ['autofocus', 'disabled', 'multiple', 'name', 'required'],
      };
      this.$watch(
        n,
        function (n, o) {
          i[t.tagName].forEach(function (i) {
            if (n[i]) e.dom.attr(t, i, n[i]);
          });
        },
        !0,
      );
    };
    n['r-validate'] = function (e, n) {
      var i = this.$outer;
      var o = this.$parent;
      if (i && i instanceof t) {
        i.controls.push(this);
        this.$on('destroy', function () {
          var e = i.controls.indexOf(this);
          i.controls.splice(e, 1);
        });
      } else {
        for (; o && !(o.$outer instanceof t);) o = o.$parent;
        if (o && o.$outer) {
          i = o.$outer;
          i.controls.push(this);
          this.$on('destroy', function () {
            var e = i.controls.indexOf(this);
            i.controls.splice(e, 1);
          });
        }
      }
      this.$refs.tip = e;
      this.$watch('rules', function (e) {
        if (!e) {
          this.data.state = 'success';
          this.data.tip = '';
        }
      });
    };
    return n;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '01fdd3674541c450b53a219f1186e35b',
);
