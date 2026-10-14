EDU('b7c6eb662291122d15e63335217dbb6e', function () {
  function e(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1;
      i.configurable = !0;
      if ('value' in i) i.writable = !0;
      Object.defineProperty(e, i.key, i);
    }
  }
  function n(e, n, i) {
    if (n) t(e.prototype, n);
    if (i) t(e, i);
    return e;
  }
  var i = {
    REQUIRED: 'required',
    MAX: 'max',
    MIN: 'min',
    MAX_LENGTH: 'maxLength',
    MIN_LENGTH: 'minLength',
    BETWEEN: 'between',
    FIX_LENGTH: 'fixLength',
    INPUT_LIMIT: 'inputLimit',
    TEL: 'tel',
    EMAIL: 'email',
  };
  var o = (function () {
    function t(n) {
      e(this, t);
      n = n || {};
      n.value = n.value || '';
      n.rules = n.rules || [];
      this.opts = n;
    }
    n(t, [
      {
        key: 'required',
        value: function o() {
          var e = this;
          var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '该项不能为空';
          var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.REQUIRED;
            })
          )
            this.opts.rules.push({
              type: i.REQUIRED,
              validate: function a(t) {
                var a = e.opts.rules.find(function (e) {
                  return e.type === i.REQUIRED;
                });
                if (o) {
                  t = t.replace(/(^\s*)|(\s*$)/g, '');
                  if ('' === t) {
                    a.hasErr = !0;
                    a.errMsg = n;
                    return !1;
                  }
                } else if ('' === t) {
                  a.hasErr = !0;
                  a.errMsg = n;
                  return !1;
                }
                return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'max',
        value: function a(e) {
          var n = this;
          var o =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '最大值不能超过{max}';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.MAX;
            })
          )
            this.opts.rules.push({
              type: i.MAX,
              validate: function a(t) {
                var a = n.opts.rules.find(function (e) {
                  return e.type === i.MAX;
                });
                if (t > e) {
                  a.hasErr = !0;
                  a.errMsg = o.replace('{max}', e);
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'min',
        value: function r(e) {
          var n = this;
          var o =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '最小值不能小于{min}';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.MIN;
            })
          )
            this.opts.rules.push({
              type: i.MIN,
              validate: function a(t) {
                var a = n.opts.rules.find(function (e) {
                  return e.type === i.MIN;
                });
                if (t < e) {
                  a.hasErr = !0;
                  a.errMsg = o.replace('{min}', e);
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'maxLength',
        value: function s(e) {
          var n = this;
          var o =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : '不能超过{maxLength}字';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.MAX_LENGTH;
            })
          )
            this.opts.rules.push({
              type: i.MAX_LENGTH,
              validate: function a(t) {
                var a = n.opts.rules.find(function (e) {
                  return e.type === i.MAX_LENGTH;
                });
                if (t.length > e) {
                  a.hasErr = !0;
                  a.errMsg = o.replace('{maxLength}', e);
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'minLength',
        value: function c(e) {
          var n = this;
          var o =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : '不能小于{minLength}字';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.MIN_LENGTH;
            })
          )
            this.opts.rules.push({
              type: i.MIN_LENGTH,
              validate: function a(t) {
                var a = n.opts.rules.find(function (e) {
                  return e.type === i.MIN_LENGTH;
                });
                if (t.length < e) {
                  a.hasErr = !0;
                  a.errMsg = o.replace('{minLength}', e);
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'between',
        value: function d(e, n) {
          var o = this;
          var a =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : '取值应在{min}和{max}之间';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.BETWEEN;
            })
          )
            this.opts.rules.push({
              type: i.BETWEEN,
              validate: function r(t) {
                var r = o.opts.rules.find(function (e) {
                  return e.type === i.BETWEEN;
                });
                if (t < e || t > n) {
                  r.hasErr = !0;
                  r.errMsg = a.replace('{min}', e).replace('{max}', n);
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'fixLength',
        value: function l(e) {
          var n = this;
          var o =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : '应输入{fixLength}位字符';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.FIX_LENGTH;
            })
          )
            this.opts.rules.push({
              type: i.FIX_LENGTH,
              validate: function a(t) {
                var a = n.opts.rules.find(function (e) {
                  return e.type === i.FIX_LENGTH;
                });
                if (e !== t.length) {
                  a.hasErr = !0;
                  a.errMsg = o.replace('{fixLength}', e);
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'inputLimit',
        value: function u() {
          var e = this;
          var n =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : /[^a-zA-Z0-9\\\/\&\(\)\（\）\u4e00-\u9fa5]/;
          var o =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : '暂不支持除中英文、数字及/&()以外的特殊字符';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.INPUT_LIMIT;
            })
          )
            this.opts.rules.push({
              type: i.INPUT_LIMIT,
              validate: function a(t) {
                var a = e.opts.rules.find(function (e) {
                  return e.type === i.INPUT_LIMIT;
                });
                var r = new RegExp(n);
                if (r.test(t)) {
                  a.hasErr = !0;
                  a.errMsg = o;
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'email',
        value: function _() {
          var e = this;
          var n =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
          var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '邮箱格式不正确';
          if (
            void 0 ===
            this.opts.rules.find(function (e) {
              return e.type === i.EMAIL;
            })
          )
            this.opts.rules.push({
              type: i.EMAIL,
              validate: function a(t) {
                var a = e.opts.rules.find(function (e) {
                  return e.type === i.EMAIL;
                });
                var r = new RegExp(n);
                if (r.test(t)) {
                  a.hasErr = !0;
                  a.errMsg = o;
                  return !1;
                } else return !0;
              },
            });
          return t.of(this.opts);
        },
      },
      {
        key: 'validate',
        value: function f() {
          var e = this;
          this.opts.rules.forEach(function (t) {
            return t.validate(e.opts.value);
          });
          return t.of(this.opts);
        },
      },
      {
        key: 'fetchFirstErrObj',
        value: function h() {
          return this.opts.rules.find(function (e) {
            return e.hasErr;
          });
        },
      },
      {
        key: 'fetchFirstErr',
        value: function p() {
          var e = this.opts.rules.find(function (e) {
            return e.hasErr;
          });
          return e && e[0] && e[0].errMsg;
        },
      },
      {
        key: 'collectErrObjs',
        value: function m() {
          return this.opts.rules
            .filter(function (e) {
              return e.hasErr;
            })
            .map(function (e) {
              var t = e.type,
                n = e.errMsg;
              return { type: t, errMsg: n };
            });
        },
      },
    ]);
    return t;
  })();
  o.of = function (e) {
    return new o(e);
  };
  return o;
});
