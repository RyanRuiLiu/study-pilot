/*! For license information please see reactBase-0bc0478e.b862c5ce.js.LICENSE.txt */
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [75365],
  {
    552648: function (e, t, n) {
      !(function (e) {
        'use strict';
        e.defineLocale('zh-cn', {
          months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
          monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
          weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
          weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
          weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
          longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY年M月D日',
            LLL: 'YYYY年M月D日Ah点mm分',
            LLLL: 'YYYY年M月D日ddddAh点mm分',
            l: 'YYYY/M/D',
            ll: 'YYYY年M月D日',
            lll: 'YYYY年M月D日 HH:mm',
            llll: 'YYYY年M月D日dddd HH:mm',
          },
          meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
          meridiemHour: function (e, t) {
            return (
              12 === e && (e = 0),
              '凌晨' === t || '早上' === t || '上午' === t
                ? e
                : '下午' === t || '晚上' === t
                  ? e + 12
                  : e >= 11
                    ? e
                    : e + 12
            );
          },
          meridiem: function (e, t, n) {
            var r = 100 * e + t;
            return r < 600
              ? '凌晨'
              : r < 900
                ? '早上'
                : r < 1130
                  ? '上午'
                  : r < 1230
                    ? '中午'
                    : r < 1800
                      ? '下午'
                      : '晚上';
          },
          calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: function (e) {
              return e.week() !== this.week() ? '[下]dddLT' : '[本]dddLT';
            },
            lastDay: '[昨天]LT',
            lastWeek: function (e) {
              return this.week() !== e.week() ? '[上]dddLT' : '[本]dddLT';
            },
            sameElse: 'L',
          },
          dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
          ordinal: function (e, t) {
            switch (t) {
              case 'd':
              case 'D':
              case 'DDD':
                return e + '日';
              case 'M':
                return e + '月';
              case 'w':
              case 'W':
                return e + '周';
              default:
                return e;
            }
          },
          relativeTime: {
            future: '%s后',
            past: '%s前',
            s: '几秒',
            ss: '%d 秒',
            m: '1 分钟',
            mm: '%d 分钟',
            h: '1 小时',
            hh: '%d 小时',
            d: '1 天',
            dd: '%d 天',
            w: '1 周',
            ww: '%d 周',
            M: '1 个月',
            MM: '%d 个月',
            y: '1 年',
            yy: '%d 年',
          },
          week: { dow: 1, doy: 4 },
        });
      })(n(795093));
    },
    661240: (e, t, n) => {
      var r = {
        './zh-cn': 552648,
        './zh-cn.js': 552648,
        'moment/locale/zh-cn': 552648,
        'moment/locale/zh-cn.js': 552648,
      };
      function o(e) {
        var t = i(e);
        return n(t);
      }
      function i(e) {
        if (!n.o(r, e)) {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = 'MODULE_NOT_FOUND'), t);
        }
        return r[e];
      }
      ((o.keys = function () {
        return Object.keys(r);
      }),
        (o.resolve = i),
        (e.exports = o),
        (o.id = 661240));
    },
    795093: function (e, t, n) {
      (e = n.nmd(e)).exports = (function () {
        'use strict';
        var t, r;
        function o() {
          return t.apply(null, arguments);
        }
        function i(e) {
          return e instanceof Array || '[object Array]' === Object.prototype.toString.call(e);
        }
        function a(e) {
          return null != e && '[object Object]' === Object.prototype.toString.call(e);
        }
        function s(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        function _(e) {
          if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
          var t;
          for (t in e) if (s(e, t)) return !1;
          return !0;
        }
        function u(e) {
          return void 0 === e;
        }
        function c(e) {
          return 'number' == typeof e || '[object Number]' === Object.prototype.toString.call(e);
        }
        function E(e) {
          return e instanceof Date || '[object Date]' === Object.prototype.toString.call(e);
        }
        function l(e, t) {
          var n,
            r = [],
            o = e.length;
          for (n = 0; n < o; ++n) r.push(t(e[n], n));
          return r;
        }
        function d(e, t) {
          for (var n in t) s(t, n) && (e[n] = t[n]);
          return (
            s(t, 'toString') && (e.toString = t.toString),
            s(t, 'valueOf') && (e.valueOf = t.valueOf),
            e
          );
        }
        function f(e, t, n, r) {
          return xt(e, t, n, r, !0).utc();
        }
        function h(e) {
          return (
            null == e._pf &&
              (e._pf = {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidEra: null,
                invalidMonth: null,
                invalidOffset: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                era: null,
                meridiem: null,
                rfc2822: !1,
                weekdayMismatch: !1,
              }),
            e._pf
          );
        }
        function T(e) {
          var t = null,
            n = !1,
            o = e._d && !isNaN(e._d.getTime());
          return (
            o &&
              ((t = h(e)),
              (n = r.call(t.parsedDateParts, function (e) {
                return null != e;
              })),
              (o =
                t.overflow < 0 &&
                !t.empty &&
                !t.invalidEra &&
                !t.invalidMonth &&
                !t.invalidOffset &&
                !t.invalidWeekday &&
                !t.weekdayMismatch &&
                !t.nullInput &&
                !t.invalidFormat &&
                !t.userInvalidated &&
                (!t.meridiem || (t.meridiem && n))),
              e._strict &&
                (o =
                  o &&
                  0 === t.charsLeftOver &&
                  0 === t.unusedTokens.length &&
                  void 0 === t.bigHour)),
            null != Object.isFrozen && Object.isFrozen(e) ? o : ((e._isValid = o), e._isValid)
          );
        }
        function O(e) {
          var t = f(NaN);
          return (null != e ? d(h(t), e) : (h(t).userInvalidated = !0), t);
        }
        r = Array.prototype.some
          ? Array.prototype.some
          : function (e) {
              var t,
                n = Object(this),
                r = n.length >>> 0;
              for (t = 0; t < r; t++) if (t in n && e.call(this, n[t], t, n)) return !0;
              return !1;
            };
        var m = (o.momentProperties = []),
          S = !1;
        function p(e, t) {
          var n,
            r,
            o,
            i = m.length;
          if (
            (u(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
            u(t._i) || (e._i = t._i),
            u(t._f) || (e._f = t._f),
            u(t._l) || (e._l = t._l),
            u(t._strict) || (e._strict = t._strict),
            u(t._tzm) || (e._tzm = t._tzm),
            u(t._isUTC) || (e._isUTC = t._isUTC),
            u(t._offset) || (e._offset = t._offset),
            u(t._pf) || (e._pf = h(t)),
            u(t._locale) || (e._locale = t._locale),
            i > 0)
          )
            for (n = 0; n < i; n++) u((o = t[(r = m[n])])) || (e[r] = o);
          return e;
        }
        function A(e) {
          (p(this, e),
            (this._d = new Date(null != e._d ? e._d.getTime() : NaN)),
            this.isValid() || (this._d = new Date(NaN)),
            !1 === S && ((S = !0), o.updateOffset(this), (S = !1)));
        }
        function N(e) {
          return e instanceof A || (null != e && null != e._isAMomentObject);
        }
        function Y(e) {
          !1 === o.suppressDeprecationWarnings &&
            'undefined' != typeof console &&
            console.warn &&
            console.warn('Deprecation warning: ' + e);
        }
        function y(e, t) {
          var n = !0;
          return d(function () {
            if ((null != o.deprecationHandler && o.deprecationHandler(null, e), n)) {
              var r,
                i,
                a,
                _ = [],
                u = arguments.length;
              for (i = 0; i < u; i++) {
                if (((r = ''), 'object' == typeof arguments[i])) {
                  for (a in ((r += '\n[' + i + '] '), arguments[0]))
                    s(arguments[0], a) && (r += a + ': ' + arguments[0][a] + ', ');
                  r = r.slice(0, -2);
                } else r = arguments[i];
                _.push(r);
              }
              (Y(
                e +
                  '\nArguments: ' +
                  Array.prototype.slice.call(_).join('') +
                  '\n' +
                  new Error().stack,
              ),
                (n = !1));
            }
            return t.apply(this, arguments);
          }, t);
        }
        var C = {};
        function I(e, t) {
          (null != o.deprecationHandler && o.deprecationHandler(e, t),
            C[e] || (Y(t + '\n' + new Error().stack), (C[e] = !0)));
        }
        function g(e) {
          return (
            ('undefined' != typeof Function && e instanceof Function) ||
            '[object Function]' === Object.prototype.toString.call(e)
          );
        }
        ((o.suppressDeprecationWarnings = !1), (o.deprecationHandler = null));
        var R = {
          D: 'date',
          dates: 'date',
          date: 'date',
          d: 'day',
          days: 'day',
          day: 'day',
          e: 'weekday',
          weekdays: 'weekday',
          weekday: 'weekday',
          E: 'isoWeekday',
          isoweekdays: 'isoWeekday',
          isoweekday: 'isoWeekday',
          DDD: 'dayOfYear',
          dayofyears: 'dayOfYear',
          dayofyear: 'dayOfYear',
          h: 'hour',
          hours: 'hour',
          hour: 'hour',
          ms: 'millisecond',
          milliseconds: 'millisecond',
          millisecond: 'millisecond',
          m: 'minute',
          minutes: 'minute',
          minute: 'minute',
          M: 'month',
          months: 'month',
          month: 'month',
          Q: 'quarter',
          quarters: 'quarter',
          quarter: 'quarter',
          s: 'second',
          seconds: 'second',
          second: 'second',
          gg: 'weekYear',
          weekyears: 'weekYear',
          weekyear: 'weekYear',
          GG: 'isoWeekYear',
          isoweekyears: 'isoWeekYear',
          isoweekyear: 'isoWeekYear',
          w: 'week',
          weeks: 'week',
          week: 'week',
          W: 'isoWeek',
          isoweeks: 'isoWeek',
          isoweek: 'isoWeek',
          y: 'year',
          years: 'year',
          year: 'year',
        };
        function M(e) {
          return 'string' == typeof e ? R[e] || R[e.toLowerCase()] : void 0;
        }
        function v(e) {
          var t,
            n,
            r = {};
          for (n in e) s(e, n) && (t = M(n)) && (r[t] = e[n]);
          return r;
        }
        var U = {
          date: 9,
          day: 11,
          weekday: 11,
          isoWeekday: 11,
          dayOfYear: 4,
          hour: 13,
          millisecond: 16,
          minute: 14,
          month: 8,
          quarter: 7,
          second: 15,
          weekYear: 1,
          isoWeekYear: 1,
          week: 5,
          isoWeek: 5,
          year: 1,
        };
        function P(e, t, n) {
          var r = '' + Math.abs(e),
            o = t - r.length;
          return (
            (e >= 0 ? (n ? '+' : '') : '-') + Math.pow(10, Math.max(0, o)).toString().substr(1) + r
          );
        }
        var K =
            /(\[[^\[]*\])|(\\e)|(\\)?(eHHmm|[Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
          L = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
          b = {},
          D = {};
        function w(e, t, n, r) {
          var o = r;
          ('string' == typeof r &&
            (o = function () {
              return this[r]();
            }),
            e && (D[e] = o),
            t &&
              (D[t[0]] = function () {
                return P(o.apply(this, arguments), t[1], t[2]);
              }),
            n &&
              (D[n] = function () {
                return this.localeData().ordinal(o.apply(this, arguments), e);
              }));
        }
        function k(e) {
          return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, '') : e.replace(/\\/g, '');
        }
        function G(e, t) {
          if (!e.isValid()) return e.localeData().invalidDate();
          var n = '$' + (t = H(t, e.localeData()));
          return (
            s(b, n) ||
              (b[n] = (function (e) {
                var t,
                  n,
                  r = e.match(K);
                for (t = 0, n = r.length; t < n; t++) D[r[t]] ? (r[t] = D[r[t]]) : (r[t] = k(r[t]));
                return function (t) {
                  var o,
                    i = '';
                  for (o = 0; o < n; o++) i += g(r[o]) ? r[o].call(t, e) : r[o];
                  return i;
                };
              })(t)),
            b[n](e)
          );
        }
        function H(e, t) {
          var n = 5;
          function r(e) {
            return t.longDateFormat(e) || e;
          }
          for (L.lastIndex = 0; n >= 0 && L.test(e);)
            ((e = e.replace(L, r)), (L.lastIndex = 0), (n -= 1));
          return e;
        }
        var V,
          x = /\d/,
          W = /\d\d/,
          j = /\d{3}/,
          F = /\d{4}/,
          B = /[+-]?\d{6}/,
          X = /\d\d?/,
          Q = /\d\d\d\d?/,
          z = /\d\d\d\d\d\d?/,
          Z = /\d{1,3}/,
          q = /\d{1,4}/,
          J = /[+-]?\d{1,6}/,
          $ = /\d+/,
          ee = /[+-]?\d+/,
          te = /Z|[+-]\d\d:?\d\d/gi,
          ne = /Z|[+-]\d\d(?::?\d\d)?/gi,
          re =
            /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
          oe = /^[1-9]\d?/,
          ie = /^([1-9]\d|\d)/;
        function ae(e, t, n) {
          V[e] = g(t)
            ? t
            : function (e, r) {
                return e && n ? n : t;
              };
        }
        function se(e, t) {
          return s(V, e)
            ? V[e](t._strict, t._locale)
            : new RegExp(
                _e(
                  e
                    .replace('\\', '')
                    .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, r, o) {
                      return t || n || r || o;
                    }),
                ),
              );
        }
        function _e(e) {
          return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        function ue(e) {
          return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
        }
        function ce(e) {
          var t = +e,
            n = 0;
          return (0 !== t && isFinite(t) && (n = ue(t)), n);
        }
        V = {};
        var Ee = {};
        function le(e, t) {
          var n,
            r,
            o = t;
          for (
            'string' == typeof e && (e = [e]),
              c(t) &&
                (o = function (e, n) {
                  n[t] = ce(e);
                }),
              r = e.length,
              n = 0;
            n < r;
            n++
          )
            Ee[e[n]] = o;
        }
        function de(e, t) {
          le(e, function (e, n, r, o) {
            ((r._w = r._w || {}), t(e, r._w, r, o));
          });
        }
        function fe(e, t, n) {
          null != t && s(Ee, e) && Ee[e](t, n._a, n, e);
        }
        function he(e) {
          return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
        }
        var Te = 0,
          Oe = 1,
          me = 2,
          Se = 3,
          pe = 4,
          Ae = 5,
          Ne = 6,
          Ye = 7,
          ye = 8;
        function Ce(e) {
          return he(e) ? 366 : 365;
        }
        (w('Y', 0, 0, function () {
          var e = this.year();
          return e <= 9999 ? P(e, 4) : '+' + e;
        }),
          w(0, ['YY', 2], 0, function () {
            return this.year() % 100;
          }),
          w(0, ['YYYY', 4], 0, 'year'),
          w(0, ['YYYYY', 5], 0, 'year'),
          w(0, ['YYYYYY', 6, !0], 0, 'year'),
          ae('Y', ee),
          ae('YY', X, W),
          ae('YYYY', q, F),
          ae('YYYYY', J, B),
          ae('YYYYYY', J, B),
          le(['YYYYY', 'YYYYYY'], Te),
          le('YYYY', function (e, t) {
            t[Te] = 2 === e.length ? o.parseTwoDigitYear(e) : ce(e);
          }),
          le('YY', function (e, t) {
            t[Te] = o.parseTwoDigitYear(e);
          }),
          le('Y', function (e, t) {
            t[Te] = parseInt(e, 10);
          }),
          (o.parseTwoDigitYear = function (e) {
            return ce(e) + (ce(e) > 68 ? 1900 : 2e3);
          }));
        var Ie,
          ge = Re('FullYear', !0);
        function Re(e, t) {
          return function (n) {
            return null != n ? (ve(this, e, n), o.updateOffset(this, t), this) : Me(this, e);
          };
        }
        function Me(e, t) {
          if (!e.isValid()) return NaN;
          var n = e._d,
            r = e._isUTC;
          switch (t) {
            case 'Milliseconds':
              return r ? n.getUTCMilliseconds() : n.getMilliseconds();
            case 'Seconds':
              return r ? n.getUTCSeconds() : n.getSeconds();
            case 'Minutes':
              return r ? n.getUTCMinutes() : n.getMinutes();
            case 'Hours':
              return r ? n.getUTCHours() : n.getHours();
            case 'Date':
              return r ? n.getUTCDate() : n.getDate();
            case 'Day':
              return r ? n.getUTCDay() : n.getDay();
            case 'Month':
              return r ? n.getUTCMonth() : n.getMonth();
            case 'FullYear':
              return r ? n.getUTCFullYear() : n.getFullYear();
            default:
              return NaN;
          }
        }
        function ve(e, t, n) {
          var r, o, i, a, s;
          if (e.isValid() && !isNaN(n)) {
            switch (((r = e._d), (o = e._isUTC), t)) {
              case 'Milliseconds':
                return void (o ? r.setUTCMilliseconds(n) : r.setMilliseconds(n));
              case 'Seconds':
                return void (o ? r.setUTCSeconds(n) : r.setSeconds(n));
              case 'Minutes':
                return void (o ? r.setUTCMinutes(n) : r.setMinutes(n));
              case 'Hours':
                return void (o ? r.setUTCHours(n) : r.setHours(n));
              case 'Date':
                return void (o ? r.setUTCDate(n) : r.setDate(n));
              case 'FullYear':
                break;
              default:
                return;
            }
            ((i = n),
              (a = e.month()),
              (s = 29 !== (s = e.date()) || 1 !== a || he(i) ? s : 28),
              o ? r.setUTCFullYear(i, a, s) : r.setFullYear(i, a, s));
          }
        }
        function Ue(e, t) {
          if (isNaN(e) || isNaN(t)) return NaN;
          var n,
            r = ((t % (n = 12)) + n) % n;
          return ((e += (t - r) / 12), 1 === r ? (he(e) ? 29 : 28) : 31 - ((r % 7) % 2));
        }
        ((Ie = Array.prototype.indexOf
          ? Array.prototype.indexOf
          : function (e) {
              var t;
              for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
              return -1;
            }),
          w('M', ['MM', 2], 'Mo', function () {
            return this.month() + 1;
          }),
          w('MMM', 0, 0, function (e) {
            return this.localeData().monthsShort(this, e);
          }),
          w('MMMM', 0, 0, function (e) {
            return this.localeData().months(this, e);
          }),
          ae('M', X, oe),
          ae('MM', X, W),
          ae('MMM', function (e, t) {
            return t.monthsShortRegex(e);
          }),
          ae('MMMM', function (e, t) {
            return t.monthsRegex(e);
          }),
          le(['M', 'MM'], function (e, t) {
            t[Oe] = ce(e) - 1;
          }),
          le(['MMM', 'MMMM'], function (e, t, n, r) {
            var o = n._locale.monthsParse(e, r, n._strict);
            null != o ? (t[Oe] = o) : (h(n).invalidMonth = e);
          }));
        var Pe =
            'January_February_March_April_May_June_July_August_September_October_November_December'.split(
              '_',
            ),
          Ke = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
          Le = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
          be = re,
          De = re,
          we = [
            'monthsParse',
            'longMonthsParse',
            'shortMonthsParse',
            'monthsRegex',
            'monthsShortRegex',
            'monthsStrictRegex',
            'monthsShortStrictRegex',
          ];
        function ke(e, t, n) {
          var r,
            o,
            i,
            a = e.toLocaleLowerCase();
          if (!this._monthsParse)
            for (
              this._monthsParse = [],
                this._longMonthsParse = [],
                this._shortMonthsParse = [],
                r = 0;
              r < 12;
              ++r
            )
              ((i = f([2e3, r])),
                (this._shortMonthsParse[r] = this.monthsShort(i, '').toLocaleLowerCase()),
                (this._longMonthsParse[r] = this.months(i, '').toLocaleLowerCase()));
          return n
            ? 'MMM' === t
              ? -1 !== (o = Ie.call(this._shortMonthsParse, a))
                ? o
                : null
              : -1 !== (o = Ie.call(this._longMonthsParse, a))
                ? o
                : null
            : 'MMM' === t
              ? -1 !== (o = Ie.call(this._shortMonthsParse, a)) ||
                -1 !== (o = Ie.call(this._longMonthsParse, a))
                ? o
                : null
              : -1 !== (o = Ie.call(this._longMonthsParse, a)) ||
                  -1 !== (o = Ie.call(this._shortMonthsParse, a))
                ? o
                : null;
        }
        function Ge(e, t) {
          if (!e.isValid()) return e;
          if ('string' == typeof t)
            if (/^\d+$/.test(t)) t = ce(t);
            else if (!c((t = e.localeData().monthsParse(t)))) return e;
          var n = t,
            r = e.date();
          return (
            (r = r < 29 ? r : Math.min(r, Ue(e.year(), n))),
            e._isUTC ? e._d.setUTCMonth(n, r) : e._d.setMonth(n, r),
            e
          );
        }
        function He(e) {
          return null != e ? (Ge(this, e), o.updateOffset(this, !0), this) : Me(this, 'Month');
        }
        function Ve() {
          function e(e, t) {
            return t.length - e.length;
          }
          var t,
            n,
            r,
            o,
            i = [],
            a = [],
            s = [];
          for (t = 0; t < 12; t++)
            ((n = f([2e3, t])),
              (r = _e(this.monthsShort(n, ''))),
              (o = _e(this.months(n, ''))),
              i.push(r),
              a.push(o),
              s.push(o),
              s.push(r));
          (i.sort(e),
            a.sort(e),
            s.sort(e),
            (this._monthsRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
            (this._monthsShortRegex = this._monthsRegex),
            (this._monthsStrictRegex = new RegExp('^(' + a.join('|') + ')', 'i')),
            (this._monthsShortStrictRegex = new RegExp('^(' + i.join('|') + ')', 'i')));
        }
        function xe(e, t) {
          return e.slice(t, 7).concat(e.slice(0, t));
        }
        (w('d', 0, 'do', 'day'),
          w('dd', 0, 0, function (e) {
            return this.localeData().weekdaysMin(this, e);
          }),
          w('ddd', 0, 0, function (e) {
            return this.localeData().weekdaysShort(this, e);
          }),
          w('dddd', 0, 0, function (e) {
            return this.localeData().weekdays(this, e);
          }),
          w('e', 0, 0, 'weekday'),
          w('E', 0, 0, 'isoWeekday'),
          w('eHHmm', 0, 0, function () {
            return '' + this.weekday() + P(this.hours(), 2) + P(this.minutes(), 2);
          }),
          ae('d', X),
          ae('e', X),
          ae('E', X),
          ae('eHHmm', z),
          ae('dd', function (e, t) {
            return t.weekdaysMinRegex(e);
          }),
          ae('ddd', function (e, t) {
            return t.weekdaysShortRegex(e);
          }),
          ae('dddd', function (e, t) {
            return t.weekdaysRegex(e);
          }),
          de(['dd', 'ddd', 'dddd'], function (e, t, n, r) {
            var o = n._locale.weekdaysParse(e, r, n._strict);
            null != o ? (t.d = o) : (h(n).invalidWeekday = e);
          }),
          de(['d', 'e', 'E'], function (e, t, n, r) {
            t[r] = ce(e);
          }),
          de('eHHmm', function (e, t, n) {
            var r = e.length - 4;
            ((t.e = ce(e.substr(0, r))),
              (n._a[Se] = ce(e.substr(r, 2))),
              (n._a[pe] = ce(e.substr(r + 2))));
          }));
        var We,
          je = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
          Fe = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
          Be = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
          Xe = re,
          Qe = re,
          ze = re,
          Ze = [
            'weekdaysParse',
            'fullWeekdaysParse',
            'shortWeekdaysParse',
            'minWeekdaysParse',
            'weekdaysRegex',
            'weekdaysShortRegex',
            'weekdaysMinRegex',
            'weekdaysStrictRegex',
            'weekdaysShortStrictRegex',
            'weekdaysMinStrictRegex',
          ];
        function qe(e, t, n) {
          var r,
            o,
            i,
            a = e.toLocaleLowerCase();
          if (!this._weekdaysParse)
            for (
              this._weekdaysParse = [],
                this._shortWeekdaysParse = [],
                this._minWeekdaysParse = [],
                r = 0;
              r < 7;
              ++r
            )
              ((i = f([2e3, 1]).day(r)),
                (this._minWeekdaysParse[r] = this.weekdaysMin(i, '').toLocaleLowerCase()),
                (this._shortWeekdaysParse[r] = this.weekdaysShort(i, '').toLocaleLowerCase()),
                (this._weekdaysParse[r] = this.weekdays(i, '').toLocaleLowerCase()));
          return n
            ? 'dddd' === t
              ? -1 !== (o = Ie.call(this._weekdaysParse, a))
                ? o
                : null
              : 'ddd' === t
                ? -1 !== (o = Ie.call(this._shortWeekdaysParse, a))
                  ? o
                  : null
                : -1 !== (o = Ie.call(this._minWeekdaysParse, a))
                  ? o
                  : null
            : 'dddd' === t
              ? -1 !== (o = Ie.call(this._weekdaysParse, a)) ||
                -1 !== (o = Ie.call(this._shortWeekdaysParse, a)) ||
                -1 !== (o = Ie.call(this._minWeekdaysParse, a))
                ? o
                : null
              : 'ddd' === t
                ? -1 !== (o = Ie.call(this._shortWeekdaysParse, a)) ||
                  -1 !== (o = Ie.call(this._weekdaysParse, a)) ||
                  -1 !== (o = Ie.call(this._minWeekdaysParse, a))
                  ? o
                  : null
                : -1 !== (o = Ie.call(this._minWeekdaysParse, a)) ||
                    -1 !== (o = Ie.call(this._weekdaysParse, a)) ||
                    -1 !== (o = Ie.call(this._shortWeekdaysParse, a))
                  ? o
                  : null;
        }
        function Je() {
          function e(e, t) {
            return t.length - e.length;
          }
          var t,
            n,
            r,
            o,
            i,
            a = [],
            s = [],
            _ = [],
            u = [];
          for (t = 0; t < 7; t++)
            ((n = f([2e3, 1]).day(t)),
              (r = _e(this.weekdaysMin(n, ''))),
              (o = _e(this.weekdaysShort(n, ''))),
              (i = _e(this.weekdays(n, ''))),
              a.push(r),
              s.push(o),
              _.push(i),
              u.push(r),
              u.push(o),
              u.push(i));
          (a.sort(e),
            s.sort(e),
            _.sort(e),
            u.sort(e),
            (this._weekdaysRegex = new RegExp('^(' + u.join('|') + ')', 'i')),
            (this._weekdaysShortRegex = this._weekdaysRegex),
            (this._weekdaysMinRegex = this._weekdaysRegex),
            (this._weekdaysStrictRegex = new RegExp('^(' + _.join('|') + ')', 'i')),
            (this._weekdaysShortStrictRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
            (this._weekdaysMinStrictRegex = new RegExp('^(' + a.join('|') + ')', 'i')));
        }
        function $e(e, t) {
          var n,
            r = d({}, e);
          for (n in t)
            s(t, n) &&
              (a(e[n]) && a(t[n])
                ? ((r[n] = {}), d(r[n], e[n]), d(r[n], t[n]))
                : null != t[n]
                  ? (r[n] = t[n])
                  : delete r[n]);
          for (n in e) s(e, n) && !s(t, n) && a(e[n]) && (r[n] = d({}, r[n]));
          return r;
        }
        function et(e) {
          null != e && this.set(e);
        }
        We = Object.keys
          ? Object.keys
          : function (e) {
              var t,
                n = [];
              for (t in e) s(e, t) && n.push(t);
              return n;
            };
        function tt(e, t, n, r) {
          var o = this._relativeTime[n];
          return g(o) ? o(e, t, n, r) : o.replace(/%d/i, e);
        }
        function nt(e, t) {
          var n = this._relativeTime[e > 0 ? 'future' : 'past'];
          return g(n) ? n(t) : n.replace(/%s/i, t);
        }
        function rt(e, t, n, r, o, i, a) {
          var s;
          return (
            e < 100 && e >= 0
              ? ((s = new Date(e + 400, t, n, r, o, i, a)),
                isFinite(s.getFullYear()) && s.setFullYear(e))
              : (s = new Date(e, t, n, r, o, i, a)),
            s
          );
        }
        function ot(e) {
          var t, n;
          return (
            e < 100 && e >= 0
              ? (((n = Array.prototype.slice.call(arguments))[0] = e + 400),
                (t = new Date(Date.UTC.apply(null, n))),
                isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
              : (t = new Date(Date.UTC.apply(null, arguments))),
            t
          );
        }
        function it(e, t, n) {
          var r = 7 + t - n;
          return (-(7 + ot(e, 0, r).getUTCDay() - t) % 7) + r - 1;
        }
        function at(e, t, n, r, o) {
          var i,
            a,
            s = 1 + 7 * (t - 1) + ((7 + n - r) % 7) + it(e, r, o);
          return (
            s <= 0
              ? (a = Ce((i = e - 1)) + s)
              : s > Ce(e)
                ? ((i = e + 1), (a = s - Ce(e)))
                : ((i = e), (a = s)),
            { year: i, dayOfYear: a }
          );
        }
        function st(e, t, n, r) {
          var o,
            i,
            a = it(e, n, r),
            s = Math.floor((t - a - 1) / 7) + 1;
          return (
            s < 1
              ? (o = s + ct((i = e - 1), n, r))
              : s > ct(e, n, r)
                ? ((o = s - ct(e, n, r)), (i = e + 1))
                : ((i = e), (o = s)),
            { week: o, year: i }
          );
        }
        function _t(e, t, n) {
          return st(e.year(), e.dayOfYear(), t, n);
        }
        function ut(e, t, n, r, o) {
          return st(e, Math.round((ot(e, t, n) - ot(e, 0, 1)) / 864e5) + 1, r, o);
        }
        function ct(e, t, n) {
          var r = it(e, t, n),
            o = it(e + 1, t, n);
          return (Ce(e) - r + o) / 7;
        }
        (w('w', ['ww', 2], 'wo', 'week'),
          w('W', ['WW', 2], 'Wo', 'isoWeek'),
          ae('w', X, oe),
          ae('ww', X, W),
          ae('W', X, oe),
          ae('WW', X, W),
          de(['w', 'ww', 'W', 'WW'], function (e, t, n, r) {
            t[r.substr(0, 1)] = ce(e);
          }));
        function Et() {
          return this.hours() % 12 || 12;
        }
        function lt(e, t) {
          w(e, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), t);
          });
        }
        function dt(e, t) {
          return t._meridiemParse;
        }
        (w('H', ['HH', 2], 0, 'hour'),
          w('h', ['hh', 2], 0, Et),
          w('k', ['kk', 2], 0, function () {
            return this.hours() || 24;
          }),
          w('hmm', 0, 0, function () {
            return '' + Et.apply(this) + P(this.minutes(), 2);
          }),
          w('hmmss', 0, 0, function () {
            return '' + Et.apply(this) + P(this.minutes(), 2) + P(this.seconds(), 2);
          }),
          w('Hmm', 0, 0, function () {
            return '' + this.hours() + P(this.minutes(), 2);
          }),
          w('Hmmss', 0, 0, function () {
            return '' + this.hours() + P(this.minutes(), 2) + P(this.seconds(), 2);
          }),
          lt('a', !0),
          lt('A', !1),
          ae('a', dt),
          ae('A', dt),
          ae('H', X, ie),
          ae('h', X, oe),
          ae('k', X, oe),
          ae('HH', X, W),
          ae('hh', X, W),
          ae('kk', X, W),
          ae('hmm', Q),
          ae('hmmss', z),
          ae('Hmm', Q),
          ae('Hmmss', z),
          le(['H', 'HH'], Se),
          le(['k', 'kk'], function (e, t, n) {
            var r = ce(e);
            t[Se] = 24 === r ? 0 : r;
          }),
          le(['a', 'A'], function (e, t, n) {
            ((n._isPm = n._locale.isPM(e)), (n._meridiem = e));
          }),
          le(['h', 'hh'], function (e, t, n) {
            ((t[Se] = ce(e)), (h(n).bigHour = !0));
          }),
          le('hmm', function (e, t, n) {
            var r = e.length - 2;
            ((t[Se] = ce(e.substr(0, r))), (t[pe] = ce(e.substr(r))), (h(n).bigHour = !0));
          }),
          le('hmmss', function (e, t, n) {
            var r = e.length - 4,
              o = e.length - 2;
            ((t[Se] = ce(e.substr(0, r))),
              (t[pe] = ce(e.substr(r, 2))),
              (t[Ae] = ce(e.substr(o))),
              (h(n).bigHour = !0));
          }),
          le('Hmm', function (e, t, n) {
            var r = e.length - 2;
            ((t[Se] = ce(e.substr(0, r))), (t[pe] = ce(e.substr(r))));
          }),
          le('Hmmss', function (e, t, n) {
            var r = e.length - 4,
              o = e.length - 2;
            ((t[Se] = ce(e.substr(0, r))), (t[pe] = ce(e.substr(r, 2))), (t[Ae] = ce(e.substr(o))));
          }));
        var ft = Re('Hours', !0);
        var ht,
          Tt = {
            calendar: {
              sameDay: '[Today at] LT',
              nextDay: '[Tomorrow at] LT',
              nextWeek: 'dddd [at] LT',
              lastDay: '[Yesterday at] LT',
              lastWeek: '[Last] dddd [at] LT',
              sameElse: 'L',
            },
            longDateFormat: {
              LTS: 'h:mm:ss A',
              LT: 'h:mm A',
              L: 'MM/DD/YYYY',
              LL: 'MMMM D, YYYY',
              LLL: 'MMMM D, YYYY h:mm A',
              LLLL: 'dddd, MMMM D, YYYY h:mm A',
            },
            invalidDate: 'Invalid date',
            ordinal: '%d',
            dayOfMonthOrdinalParse: /\d{1,2}/,
            relativeTime: {
              future: 'in %s',
              past: '%s ago',
              s: 'a few seconds',
              ss: '%d seconds',
              m: 'a minute',
              mm: '%d minutes',
              h: 'an hour',
              hh: '%d hours',
              d: 'a day',
              dd: '%d days',
              w: 'a week',
              ww: '%d weeks',
              M: 'a month',
              MM: '%d months',
              y: 'a year',
              yy: '%d years',
            },
            months: Pe,
            monthsShort: Ke,
            week: { dow: 0, doy: 6 },
            weekdays: je,
            weekdaysMin: Be,
            weekdaysShort: Fe,
            meridiemParse: /[ap]\.?m?\.?/i,
          },
          Ot = {},
          mt = {};
        function St(e, t) {
          var n,
            r = Math.min(e.length, t.length);
          for (n = 0; n < r; n += 1) if (e[n] !== t[n]) return n;
          return r;
        }
        function pt(e) {
          return e ? e.toLowerCase().replace('_', '-') : e;
        }
        function At(t) {
          var r,
            o = null;
          if (s(Ot, t)) return Ot[t];
          if (((r = pt(t)), s(Ot, r))) return Ot[r];
          if (
            e &&
            e.exports &&
            (function (e) {
              return 'string' == typeof e && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e);
            })(r)
          )
            try {
              ((o = ht._abbr), n(661240)('./' + r), Nt(o));
            } catch (e) {
              Ot[r] = null;
            }
          return s(Ot, r) ? Ot[r] : void 0;
        }
        function Nt(e, t) {
          var n;
          return (
            e &&
              ((n = u(t) ? yt(e) : Yt(e, t))
                ? (ht = n)
                : 'undefined' != typeof console &&
                  console.warn &&
                  console.warn('Locale ' + e + ' not found. Did you forget to load it?')),
            ht._abbr
          );
        }
        function Yt(e, t) {
          if (null !== t) {
            var n,
              r = Tt;
            if (((t.abbr = e), null != Ot[e]))
              (I(
                'defineLocaleOverride',
                'use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.',
              ),
                (r = Ot[e]._config));
            else if (null != t.parentLocale)
              if (null != Ot[t.parentLocale]) r = Ot[t.parentLocale]._config;
              else {
                if (null == (n = At(t.parentLocale)))
                  return (
                    mt[t.parentLocale] || (mt[t.parentLocale] = []),
                    mt[t.parentLocale].push({ name: e, config: t }),
                    null
                  );
                r = n._config;
              }
            return (
              (Ot[e] = new et($e(r, t))),
              mt[e] &&
                mt[e].forEach(function (e) {
                  Yt(e.name, e.config);
                }),
              Nt(e),
              Ot[e]
            );
          }
          return (delete Ot[e], null);
        }
        function yt(e) {
          var t;
          if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)) return ht;
          if (!i(e)) {
            if ((t = At(e))) return t;
            e = [e];
          }
          return (function (e) {
            for (var t, n, r, o, i = 0; i < e.length;) {
              for (
                t = (o = pt(e[i]).split('-')).length, n = (n = pt(e[i + 1])) ? n.split('-') : null;
                t > 0;
              ) {
                if ((r = At(o.slice(0, t).join('-')))) return r;
                if (n && n.length >= t && St(o, n) >= t - 1) break;
                t--;
              }
              i++;
            }
            return ht;
          })(e);
        }
        function Ct(e) {
          var t,
            n = e._a;
          return (
            n &&
              -2 === h(e).overflow &&
              ((t =
                n[Oe] < 0 || n[Oe] > 11
                  ? Oe
                  : n[me] < 1 || n[me] > Ue(n[Te], n[Oe])
                    ? me
                    : n[Se] < 0 ||
                        n[Se] > 24 ||
                        (24 === n[Se] && (0 !== n[pe] || 0 !== n[Ae] || 0 !== n[Ne]))
                      ? Se
                      : n[pe] < 0 || n[pe] > 59
                        ? pe
                        : n[Ae] < 0 || n[Ae] > 59
                          ? Ae
                          : n[Ne] < 0 || n[Ne] > 999
                            ? Ne
                            : -1),
              h(e)._overflowDayOfYear && (t < Te || t > me) && (t = me),
              h(e)._overflowWeeks && -1 === t && (t = Ye),
              h(e)._overflowWeekday && -1 === t && (t = ye),
              (h(e).overflow = t)),
            e
          );
        }
        var It =
            /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          gt =
            /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          Rt = /Z|[+-]\d\d(?::?\d\d)?/,
          Mt = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, !1],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, !1],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, !1],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, !1],
            ['YYYY', /\d{4}/, !1],
          ],
          vt = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
          ],
          Ut = /^\/?Date\((-?\d+)/i,
          Pt =
            /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
          Kt = {
            UT: 0,
            GMT: 0,
            EDT: -240,
            EST: -300,
            CDT: -300,
            CST: -360,
            MDT: -360,
            MST: -420,
            PDT: -420,
            PST: -480,
          };
        function Lt(e) {
          var t,
            n,
            r,
            o,
            i,
            a,
            s = e._i,
            _ = It.exec(s) || gt.exec(s),
            u = Mt.length,
            c = vt.length;
          if (_) {
            for (h(e).iso = !0, t = 0, n = u; t < n; t++)
              if (Mt[t][1].exec(_[1])) {
                ((o = Mt[t][0]), (r = !1 !== Mt[t][2]));
                break;
              }
            if (null == o) return void (e._isValid = !1);
            if (_[3]) {
              for (t = 0, n = c; t < n; t++)
                if (vt[t][1].exec(_[3])) {
                  i = (_[2] || ' ') + vt[t][0];
                  break;
                }
              if (null == i) return void (e._isValid = !1);
            }
            if (!r && null != i) return void (e._isValid = !1);
            if (_[4]) {
              if (!Rt.exec(_[4])) return void (e._isValid = !1);
              a = 'Z';
            }
            ((e._f = o + (i || '') + (a || '')), Ht(e));
          } else e._isValid = !1;
        }
        function bt(e) {
          var t = parseInt(e, 10);
          return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
        }
        function Dt(e) {
          var t,
            n,
            r,
            o,
            i,
            a,
            s,
            _,
            u = Pt.exec(
              e._i
                .replace(/\([^()]*\)|[\n\t]/g, ' ')
                .replace(/(\s\s+)/g, ' ')
                .replace(/^\s\s*/, '')
                .replace(/\s\s*$/, ''),
            );
          if (u) {
            if (
              ((n = u[4]),
              (r = u[3]),
              (o = u[2]),
              (i = u[5]),
              (a = u[6]),
              (s = u[7]),
              (_ = [bt(n), Ke.indexOf(r), parseInt(o, 10), parseInt(i, 10), parseInt(a, 10)]),
              s && _.push(parseInt(s, 10)),
              (t = _),
              !(function (e, t, n) {
                return (
                  !e ||
                  Fe.indexOf(e) === new Date(t[0], t[1], t[2]).getDay() ||
                  ((h(n).weekdayMismatch = !0), (n._isValid = !1), !1)
                );
              })(u[1], t, e))
            )
              return;
            ((e._a = t),
              (e._tzm = (function (e, t, n) {
                if (e) return Kt[e];
                if (t) return 0;
                var r = parseInt(n, 10),
                  o = r % 100;
                return ((r - o) / 100) * 60 + o;
              })(u[8], u[9], u[10])),
              (e._d = ot.apply(null, e._a)),
              e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
              (h(e).rfc2822 = !0));
          } else e._isValid = !1;
        }
        function wt(e, t, n) {
          return null != e ? e : null != t ? t : n;
        }
        function kt(e, t, n) {
          var r = Object.prototype.hasOwnProperty.call(e, '_isDefaultDatePartsForWeek'),
            i = e._isDefaultDatePartsForWeek;
          e._isDefaultDatePartsForWeek = !!n;
          try {
            return o._getDefaultDateParts(e, t, n);
          } finally {
            r ? (e._isDefaultDatePartsForWeek = i) : delete e._isDefaultDatePartsForWeek;
          }
        }
        function Gt(e) {
          var t,
            n,
            r,
            i,
            a,
            s,
            _,
            u = [];
          if (!e._d) {
            for (
              (null != e._a[Te] && null != e._a[Oe] && null != e._a[me]) ||
                (i = kt(
                  e,
                  (r = (function (e) {
                    var t = e._defaultDatePartsNow;
                    return t
                      ? (t.hasValue || ((t.value = o.now()), (t.hasValue = !0)), t.value)
                      : o.now();
                  })(e)),
                )),
                e._w &&
                  null == e._a[me] &&
                  null == e._a[Oe] &&
                  (function (e, t) {
                    var n, r, o, i, a, s, _, u, c;
                    (null != (n = e._w).GG || null != n.W || null != n.E
                      ? ((a = 1),
                        (s = 4),
                        (r = wt(n.GG, e._a[Te], ut(t[Te], t[Oe], t[me], 1, 4).year)),
                        (o = wt(n.W, 1)),
                        ((i = wt(n.E, 1)) < 1 || i > 7) && (u = !0))
                      : ((a = e._locale._week.dow),
                        (s = e._locale._week.doy),
                        (c = ut(t[Te], t[Oe], t[me], a, s)),
                        (r = wt(n.gg, e._a[Te], c.year)),
                        (o = wt(n.w, c.week)),
                        null != n.d
                          ? ((i = n.d) < 0 || i > 6) && (u = !0)
                          : null != n.e
                            ? ((i = n.e + a), (n.e < 0 || n.e > 6) && (u = !0))
                            : (i = a)),
                      o < 1 || o > ct(r, a, s)
                        ? (h(e)._overflowWeeks = !0)
                        : null != u
                          ? (h(e)._overflowWeekday = !0)
                          : ((_ = at(r, o, i, a, s)),
                            (e._a[Te] = _.year),
                            (e._dayOfYear = _.dayOfYear)));
                  })(e, kt(e, r, !0)),
                null != e._dayOfYear &&
                  ((s = null != e._a[Te] ? e._a[Te] : i[Te]),
                  (e._dayOfYear > Ce(s) || 0 === e._dayOfYear) && (h(e)._overflowDayOfYear = !0),
                  (n = ot(s, 0, e._dayOfYear)),
                  (e._a[Oe] = n.getUTCMonth()),
                  (e._a[me] = n.getUTCDate())),
                _ = null == e._a[Te] || null == e._a[Oe] || null == e._a[me],
                t = 0;
              t < 3 && null == e._a[t];
              ++t
            )
              e._a[t] = u[t] = i[t];
            for (; t < 7; t++) e._a[t] = u[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
            (24 === e._a[Se] &&
              0 === e._a[pe] &&
              0 === e._a[Ae] &&
              0 === e._a[Ne] &&
              ((e._nextDay = !0), (e._a[Se] = 0)),
              (e._d = (e._useUTC ? ot : rt).apply(null, u)),
              (a = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
              null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
              e._nextDay && (e._a[Se] = 24),
              e._w && void 0 !== e._w.d && !_ && e._w.d !== a && (h(e).weekdayMismatch = !0));
          }
        }
        function Ht(e) {
          if (e._f !== o.ISO_8601)
            if (e._f !== o.RFC_2822) {
              ((e._a = []), (h(e).empty = !0));
              var t,
                n,
                r,
                i,
                a,
                s,
                _,
                u = '' + e._i,
                c = u.length,
                E = 0;
              for (_ = (r = H(e._f, e._locale).match(K) || []).length, t = 0; t < _; t++)
                ((i = r[t]),
                  (n = (u.match(se(i, e)) || [])[0]) &&
                    ((a = u.substr(0, u.indexOf(n))).length > 0 && h(e).unusedInput.push(a),
                    (u = u.slice(u.indexOf(n) + n.length)),
                    (E += n.length)),
                  D[i]
                    ? (n ? (h(e).empty = !1) : h(e).unusedTokens.push(i), fe(i, n, e))
                    : e._strict && !n && h(e).unusedTokens.push(i));
              ((h(e).charsLeftOver = c - E),
                u.length > 0 && h(e).unusedInput.push(u),
                e._a[Se] <= 12 && !0 === h(e).bigHour && e._a[Se] > 0 && (h(e).bigHour = void 0),
                (h(e).parsedDateParts = e._a.slice(0)),
                (h(e).meridiem = e._meridiem),
                (e._a[Se] = (function (e, t, n) {
                  var r;
                  return null == n
                    ? t
                    : null != e.meridiemHour
                      ? e.meridiemHour(t, n)
                      : null != e.isPM
                        ? ((r = e.isPM(n)) && t < 12 && (t += 12), r || 12 !== t || (t = 0), t)
                        : t;
                })(e._locale, e._a[Se], e._meridiem)),
                null !== (s = h(e).era) && (e._a[Te] = e._locale.erasConvertYear(s, e._a[Te])),
                Gt(e),
                Ct(e));
            } else Dt(e);
          else Lt(e);
        }
        function Vt(e) {
          var t = e._i,
            n = e._f;
          return (
            (e._locale = e._locale || yt(e._l)),
            null === t || (void 0 === n && '' === t)
              ? O({ nullInput: !0 })
              : ('string' == typeof t && (e._i = t = e._locale.preparse(t)),
                N(t)
                  ? new A(Ct(t))
                  : (E(t)
                      ? (e._d = t)
                      : i(n)
                        ? (function (e) {
                            var t,
                              n,
                              r,
                              o,
                              i,
                              a,
                              s = !1,
                              _ = {},
                              u = e._f.length;
                            if (0 === u)
                              return ((h(e).invalidFormat = !0), void (e._d = new Date(NaN)));
                            for (o = 0; o < u; o++)
                              ((i = 0),
                                (a = !1),
                                (t = p({}, e)),
                                null != e._useUTC && (t._useUTC = e._useUTC),
                                (t._defaultDatePartsNow = _),
                                (t._f = e._f[o]),
                                Ht(t),
                                T(t) && (a = !0),
                                (i += h(t).charsLeftOver),
                                (i += 10 * h(t).unusedTokens.length),
                                (h(t).score = i),
                                s
                                  ? i < r && ((r = i), (n = t))
                                  : (null == r || i < r || a) && ((r = i), (n = t), a && (s = !0)));
                            d(e, n || t);
                          })(e)
                        : n
                          ? Ht(e)
                          : (function (e) {
                              var t = e._i;
                              u(t)
                                ? (e._d = new Date(o.now()))
                                : E(t)
                                  ? (e._d = new Date(t.valueOf()))
                                  : 'string' == typeof t
                                    ? (function (e) {
                                        var t = Ut.exec(e._i);
                                        null === t
                                          ? (Lt(e),
                                            !1 === e._isValid &&
                                              (delete e._isValid,
                                              Dt(e),
                                              !1 === e._isValid &&
                                                (delete e._isValid,
                                                e._strict
                                                  ? (e._isValid = !1)
                                                  : o.createFromInputFallback(e))))
                                          : (e._d = new Date(+t[1]));
                                      })(e)
                                    : i(t)
                                      ? ((e._a = l(t.slice(0), function (e) {
                                          return parseInt(e, 10);
                                        })),
                                        Gt(e))
                                      : a(t)
                                        ? (function (e) {
                                            if (!e._d) {
                                              var t = v(e._i),
                                                n = void 0 === t.day ? t.date : t.day;
                                              ((e._a = l(
                                                [
                                                  t.year,
                                                  t.month,
                                                  n,
                                                  t.hour,
                                                  t.minute,
                                                  t.second,
                                                  t.millisecond,
                                                ],
                                                function (e) {
                                                  return e && parseInt(e, 10);
                                                },
                                              )),
                                                Gt(e));
                                            }
                                          })(e)
                                        : c(t)
                                          ? (e._d = new Date(t))
                                          : o.createFromInputFallback(e);
                            })(e),
                    T(e) || (e._d = null),
                    e))
          );
        }
        function xt(e, t, n, r, o) {
          var s,
            u = {};
          return (
            (!0 !== t && !1 !== t) || ((r = t), (t = void 0)),
            (!0 !== n && !1 !== n) || ((r = n), (n = void 0)),
            ((a(e) && _(e)) || (i(e) && 0 === e.length)) && (e = void 0),
            (u._isAMomentObject = !0),
            (u._useUTC = u._isUTC = o),
            (u._l = n),
            (u._i = e),
            (u._f = t),
            (u._strict = r),
            (s = new A(Ct(Vt(u))))._nextDay && (s.add(1, 'd'), (s._nextDay = void 0)),
            s
          );
        }
        function Wt(e, t, n, r) {
          return xt(e, t, n, r, !1);
        }
        ((o.createFromInputFallback = y(
          'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
          function (e) {
            e._d = new Date(e._i + (e._useUTC ? ' UTC' : ''));
          },
        )),
          (o._getDefaultDateParts = function (e, t, n) {
            var r = n || e._isDefaultDatePartsForWeek,
              o = r ? Wt(t) : new Date(t);
            return r
              ? [o.year(), o.month(), o.date()]
              : e._useUTC
                ? [o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()]
                : [o.getFullYear(), o.getMonth(), o.getDate()];
          }),
          (o.ISO_8601 = function () {}),
          (o.RFC_2822 = function () {}));
        var jt = y(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
              var e = Wt.apply(null, arguments);
              return this.isValid() && e.isValid() ? (e < this ? this : e) : O();
            },
          ),
          Ft = y(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
              var e = Wt.apply(null, arguments);
              return this.isValid() && e.isValid() ? (e > this ? this : e) : O();
            },
          );
        function Bt(e, t) {
          var n, r;
          if ((1 === t.length && i(t[0]) && (t = t[0]), !t.length)) return Wt();
          for (r = 0; r < t.length; ++r)
            if (N(t[r])) {
              n = t[r];
              break;
            }
          if (!n) return O();
          for (++r; r < t.length; ++r) !N(t[r]) || (t[r].isValid() && !t[r][e](n)) || (n = t[r]);
          return n;
        }
        var Xt = [
          'year',
          'quarter',
          'month',
          'week',
          'day',
          'hour',
          'minute',
          'second',
          'millisecond',
        ];
        function Qt(e) {
          var t = v(e),
            n = t.year || 0,
            r = t.quarter || 0,
            o = t.month || 0,
            i = t.week || t.isoWeek || 0,
            a = t.day || 0,
            _ = t.hour || 0,
            u = t.minute || 0,
            c = t.second || 0,
            E = t.millisecond || 0;
          ((this._isValid = (function (e) {
            var t,
              n,
              r = !1,
              o = Xt.length;
            for (t in e)
              if (s(e, t) && (-1 === Ie.call(Xt, t) || (null != e[t] && isNaN(e[t])))) return !1;
            for (n = 0; n < o; ++n)
              if (e[Xt[n]]) {
                if (r) return !1;
                parseFloat(e[Xt[n]]) !== ce(e[Xt[n]]) && (r = !0);
              }
            return !0;
          })(t)),
            (this._milliseconds = +E + 1e3 * c + 6e4 * u + 1e3 * _ * 60 * 60),
            (this._days = +a + 7 * i),
            (this._months = +o + 3 * r + 12 * n),
            (this._data = {}),
            (this._locale = yt()),
            this._bubble());
        }
        function zt(e) {
          return e instanceof Qt;
        }
        function Zt(e) {
          return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
        }
        function qt(e, t) {
          w(e, 0, 0, function () {
            var e = this.utcOffset(),
              n = '+';
            return (e < 0 && ((e = -e), (n = '-')), n + P(~~(e / 60), 2) + t + P(~~e % 60, 2));
          });
        }
        (qt('Z', ':'),
          qt('ZZ', ''),
          ae('Z', ne),
          ae('ZZ', ne),
          le(['Z', 'ZZ'], function (e, t, n) {
            var r = $t(ne, e);
            ((n._useUTC = !0), (n._tzm = r), null === r && (h(n).invalidOffset = e));
          }));
        var Jt = /([\+\-]|\d\d)/gi;
        function $t(e, t) {
          var n,
            r,
            o = (t || '').match(e);
          return null === o
            ? null
            : ((r =
                60 * (n = ((o[o.length - 1] || []) + '').match(Jt) || ['-', 0, 0])[1] + ce(n[2])),
              ce(n[2]) > 59 || ('+' === n[0] ? r > 840 : r > 720)
                ? null
                : 0 === r
                  ? 0
                  : '+' === n[0]
                    ? r
                    : -r);
        }
        function en(e, t) {
          var n, r;
          return t._isUTC
            ? ((n = t.clone()),
              (r = (N(e) || E(e) ? e.valueOf() : Wt(e).valueOf()) - n.valueOf()),
              n._d.setTime(n._d.valueOf() + r),
              o.updateOffset(n, !1),
              n)
            : Wt(e).local();
        }
        function tn(e) {
          return -Math.round(e._d.getTimezoneOffset());
        }
        function nn() {
          return !!this.isValid() && this._isUTC && 0 === this._offset;
        }
        o.updateOffset = function () {};
        var rn = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
          on =
            /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        function an(e, t) {
          var n,
            r,
            o,
            i,
            a,
            _,
            u = e,
            E = null;
          return (
            zt(e)
              ? (u = { ms: e._milliseconds, d: e._days, M: e._months })
              : c(e) || !isNaN(+e)
                ? ((u = {}), t ? (u[t] = +e) : (u.milliseconds = +e))
                : (E = rn.exec(e))
                  ? ((n = '-' === E[1] ? -1 : 1),
                    (u = {
                      y: 0,
                      d: ce(E[me]) * n,
                      h: ce(E[Se]) * n,
                      m: ce(E[pe]) * n,
                      s: ce(E[Ae]) * n,
                      ms: ce(Zt(1e3 * E[Ne])) * n,
                    }))
                  : (E = on.exec(e))
                    ? ((n = '-' === E[1] ? -1 : 1),
                      (u = {
                        y: sn(E[2], n),
                        M: sn(E[3], n),
                        w: sn(E[4], n),
                        d: sn(E[5], n),
                        h: sn(E[6], n),
                        m: sn(E[7], n),
                        s: sn(E[8], n),
                      }))
                    : null == u
                      ? (u = {})
                      : 'object' == typeof u &&
                        ('from' in u || 'to' in u) &&
                        ((i = Wt(u.from)),
                        (a = Wt(u.to)),
                        (o =
                          i.isValid() && a.isValid()
                            ? ((a = en(a, i)),
                              i.isBefore(a)
                                ? (_ = _n(i, a))
                                : (((_ = _n(a, i)).milliseconds = -_.milliseconds),
                                  (_.months = -_.months)),
                              _)
                            : { milliseconds: 0, months: 0 }),
                        ((u = {}).ms = o.milliseconds),
                        (u.M = o.months)),
            (r = new Qt(u)),
            zt(e) && s(e, '_locale') && (r._locale = e._locale),
            zt(e) && s(e, '_isValid') && (r._isValid = e._isValid),
            r
          );
        }
        function sn(e, t) {
          var n = e && parseFloat(e.replace(',', '.'));
          return (isNaN(n) ? 0 : n) * t;
        }
        function _n(e, t) {
          var n = {};
          return (
            (n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
            e.clone().add(n.months, 'M').isAfter(t) && --n.months,
            (n.milliseconds = +t - +e.clone().add(n.months, 'M')),
            n
          );
        }
        function un(e, t) {
          return function (n, r) {
            var o;
            return (
              null === r ||
                isNaN(+r) ||
                (I(
                  t,
                  'moment().' +
                    t +
                    '(period, number) is deprecated. Please use moment().' +
                    t +
                    '(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.',
                ),
                (o = n),
                (n = r),
                (r = o)),
              cn(this, an(n, r), e),
              this
            );
          };
        }
        function cn(e, t, n, r) {
          var i = t._milliseconds,
            a = Zt(t._days),
            s = Zt(t._months);
          e.isValid() &&
            ((r = r ?? !0),
            s && Ge(e, Me(e, 'Month') + s * n),
            a && ve(e, 'Date', Me(e, 'Date') + a * n),
            i && e._d.setTime(e._d.valueOf() + i * n),
            r && o.updateOffset(e, a || s));
        }
        ((an.fn = Qt.prototype),
          (an.invalid = function () {
            return an(NaN);
          }));
        var En = un(1, 'add'),
          ln = un(-1, 'subtract');
        function dn(e) {
          return 'string' == typeof e || e instanceof String;
        }
        function fn(e) {
          return (
            N(e) ||
            E(e) ||
            dn(e) ||
            c(e) ||
            (function (e) {
              var t = i(e),
                n = !1;
              return (
                t &&
                  (n =
                    0 ===
                    e.filter(function (t) {
                      return !c(t) && dn(e);
                    }).length),
                t && n
              );
            })(e) ||
            (function (e) {
              var t,
                n,
                r = a(e) && !_(e),
                o = !1,
                i = [
                  'years',
                  'year',
                  'y',
                  'months',
                  'month',
                  'M',
                  'days',
                  'day',
                  'd',
                  'dates',
                  'date',
                  'D',
                  'hours',
                  'hour',
                  'h',
                  'minutes',
                  'minute',
                  'm',
                  'seconds',
                  'second',
                  's',
                  'milliseconds',
                  'millisecond',
                  'ms',
                ],
                u = i.length;
              for (t = 0; t < u; t += 1) ((n = i[t]), (o = o || s(e, n)));
              return r && o;
            })(e) ||
            null == e
          );
        }
        function hn(e, t) {
          if (e.date() < t.date()) return -hn(t, e);
          var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
            r = e.clone().add(n, 'months');
          return (
            -(
              n +
              (t - r < 0
                ? (t - r) / (r - e.clone().add(n - 1, 'months'))
                : (t - r) / (e.clone().add(n + 1, 'months') - r))
            ) || 0
          );
        }
        function Tn(e) {
          var t;
          return void 0 === e
            ? this._locale._abbr
            : (null != (t = yt(e)) && (this._locale = t), this);
        }
        ((o.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ'),
          (o.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]'));
        var On = y(
          'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
          function (e) {
            return void 0 === e ? this.localeData() : this.locale(e);
          },
        );
        function mn() {
          return this._locale;
        }
        var Sn = 1e3,
          pn = 6e4,
          An = 36e5,
          Nn = 126227808e5;
        function Yn(e, t) {
          return ((e % t) + t) % t;
        }
        function yn(e, t, n) {
          return e < 100 && e >= 0 ? new Date(e + 400, t, n) - Nn : new Date(e, t, n).valueOf();
        }
        function Cn(e, t, n) {
          return e < 100 && e >= 0 ? Date.UTC(e + 400, t, n) - Nn : Date.UTC(e, t, n);
        }
        function In(e, t) {
          return t.erasAbbrRegex(e);
        }
        function gn() {
          var e,
            t,
            n,
            r,
            o,
            i = [],
            a = [],
            s = [],
            _ = [],
            u = this.eras();
          for (e = 0, t = u.length; e < t; ++e)
            ((n = _e(u[e].name)),
              (r = _e(u[e].abbr)),
              (o = _e(u[e].narrow)),
              a.push(n),
              i.push(r),
              s.push(o),
              _.push(n),
              _.push(r),
              _.push(o));
          ((this._erasRegex = new RegExp('^(' + _.join('|') + ')', 'i')),
            (this._erasNameRegex = new RegExp('^(' + a.join('|') + ')', 'i')),
            (this._erasAbbrRegex = new RegExp('^(' + i.join('|') + ')', 'i')),
            (this._erasNarrowRegex = new RegExp('^(' + s.join('|') + ')', 'i')));
        }
        function Rn(e, t) {
          w(0, [e, e.length], 0, t);
        }
        function Mn(e, t, n, r, o) {
          var i;
          return null == e
            ? _t(this, r, o).year
            : (t > (i = ct(e, r, o)) && (t = i), vn.call(this, e, t, n, r, o));
        }
        function vn(e, t, n, r, o) {
          var i = at(e, t, n, r, o),
            a = ot(i.year, 0, i.dayOfYear);
          return (
            this.year(a.getUTCFullYear()),
            this.month(a.getUTCMonth()),
            this.date(a.getUTCDate()),
            this
          );
        }
        (w('N', 0, 0, 'eraAbbr'),
          w('NN', 0, 0, 'eraAbbr'),
          w('NNN', 0, 0, 'eraAbbr'),
          w('NNNN', 0, 0, 'eraName'),
          w('NNNNN', 0, 0, 'eraNarrow'),
          w('y', ['y', 1], 'yo', 'eraYear'),
          w('y', ['yy', 2], 0, 'eraYear'),
          w('y', ['yyy', 3], 0, 'eraYear'),
          w('y', ['yyyy', 4], 0, 'eraYear'),
          ae('N', In),
          ae('NN', In),
          ae('NNN', In),
          ae('NNNN', function (e, t) {
            return t.erasNameRegex(e);
          }),
          ae('NNNNN', function (e, t) {
            return t.erasNarrowRegex(e);
          }),
          le(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (e, t, n, r) {
            var o = n._locale.erasParse(e, r, n._strict);
            o ? (h(n).era = o) : (h(n).invalidEra = e);
          }),
          ae('y', $),
          ae('yy', $),
          ae('yyy', $),
          ae('yyyy', $),
          ae('yo', function (e, t) {
            return t._eraYearOrdinalRegex || $;
          }),
          le(['y', 'yy', 'yyy', 'yyyy'], Te),
          le(['yo'], function (e, t, n, r) {
            var o;
            (n._locale._eraYearOrdinalRegex && (o = e.match(n._locale._eraYearOrdinalRegex)),
              n._locale.eraYearOrdinalParse
                ? (t[Te] = n._locale.eraYearOrdinalParse(e, o))
                : (t[Te] = parseInt(e, 10)));
          }),
          w(0, ['gg', 2], 0, function () {
            return this.weekYear() % 100;
          }),
          w(0, ['GG', 2], 0, function () {
            return this.isoWeekYear() % 100;
          }),
          Rn('gggg', 'weekYear'),
          Rn('ggggg', 'weekYear'),
          Rn('GGGG', 'isoWeekYear'),
          Rn('GGGGG', 'isoWeekYear'),
          ae('G', ee),
          ae('g', ee),
          ae('GG', X, W),
          ae('gg', X, W),
          ae('GGGG', q, F),
          ae('gggg', q, F),
          ae('GGGGG', J, B),
          ae('ggggg', J, B),
          de(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (e, t, n, r) {
            t[r.substr(0, 2)] = ce(e);
          }),
          de(['gg', 'GG'], function (e, t, n, r) {
            t[r] = o.parseTwoDigitYear(e);
          }),
          w('Q', 0, 'Qo', 'quarter'),
          ae('Q', x),
          le('Q', function (e, t) {
            t[Oe] = 3 * (ce(e) - 1);
          }),
          w('D', ['DD', 2], 'Do', 'date'),
          ae('D', X, oe),
          ae('DD', X, W),
          ae('Do', function (e, t) {
            return e
              ? t._dayOfMonthOrdinalParse || t._ordinalParse
              : t._dayOfMonthOrdinalParseLenient;
          }),
          le(['D', 'DD'], me),
          le('Do', function (e, t) {
            t[me] = ce(e.match(X)[0]);
          }));
        var Un = Re('Date', !0);
        (w('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'),
          ae('DDD', Z),
          ae('DDDD', j),
          le(['DDD', 'DDDD'], function (e, t, n) {
            n._dayOfYear = ce(e);
          }),
          w('m', ['mm', 2], 0, 'minute'),
          ae('m', X, ie),
          ae('mm', X, W),
          le(['m', 'mm'], pe));
        var Pn = Re('Minutes', !1);
        (w('s', ['ss', 2], 0, 'second'), ae('s', X, ie), ae('ss', X, W), le(['s', 'ss'], Ae));
        var Kn,
          Ln,
          bn = Re('Seconds', !1);
        for (
          w('S', 0, 0, function () {
            return ~~(this.millisecond() / 100);
          }),
            w(0, ['SS', 2], 0, function () {
              return ~~(this.millisecond() / 10);
            }),
            w(0, ['SSS', 3], 0, 'millisecond'),
            w(0, ['SSSS', 4], 0, function () {
              return 10 * this.millisecond();
            }),
            w(0, ['SSSSS', 5], 0, function () {
              return 100 * this.millisecond();
            }),
            w(0, ['SSSSSS', 6], 0, function () {
              return 1e3 * this.millisecond();
            }),
            w(0, ['SSSSSSS', 7], 0, function () {
              return 1e4 * this.millisecond();
            }),
            w(0, ['SSSSSSSS', 8], 0, function () {
              return 1e5 * this.millisecond();
            }),
            w(0, ['SSSSSSSSS', 9], 0, function () {
              return 1e6 * this.millisecond();
            }),
            ae('S', Z, x),
            ae('SS', Z, W),
            ae('SSS', Z, j),
            Kn = 'SSSS';
          Kn.length <= 9;
          Kn += 'S'
        )
          ae(Kn, $);
        function Dn(e, t) {
          t[Ne] = ce(1e3 * ('0.' + e));
        }
        for (Kn = 'S'; Kn.length <= 9; Kn += 'S') le(Kn, Dn);
        ((Ln = Re('Milliseconds', !1)), w('z', 0, 0, 'zoneAbbr'), w('zz', 0, 0, 'zoneName'));
        var wn = A.prototype;
        function kn(e) {
          return e;
        }
        ((wn.add = En),
          (wn.calendar = function (e, t) {
            1 === arguments.length &&
              (arguments[0]
                ? fn(arguments[0])
                  ? ((e = arguments[0]), (t = void 0))
                  : (function (e) {
                      var t,
                        n = a(e) && !_(e),
                        r = !1,
                        o = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'];
                      for (t = 0; t < o.length; t += 1) r = r || s(e, o[t]);
                      return n && r;
                    })(arguments[0]) && ((t = arguments[0]), (e = void 0))
                : ((e = void 0), (t = void 0)));
            var n = e || Wt(),
              r = en(n, this).startOf('day'),
              i = o.calendarFormat(this, r) || 'sameElse',
              u = t && (g(t[i]) ? t[i].call(this, n) : t[i]);
            return this.format(u || this.localeData().calendar(i, this, Wt(n)));
          }),
          (wn.clone = function () {
            return new A(this);
          }),
          (wn.diff = function (e, t, n) {
            var r, o, i;
            if (!this.isValid()) return NaN;
            if (!(r = en(e, this)).isValid()) return NaN;
            switch (((o = 6e4 * (r.utcOffset() - this.utcOffset())), (t = M(t)))) {
              case 'year':
                i = hn(this, r) / 12;
                break;
              case 'month':
                i = hn(this, r);
                break;
              case 'quarter':
                i = hn(this, r) / 3;
                break;
              case 'second':
                i = (this - r) / 1e3;
                break;
              case 'minute':
                i = (this - r) / 6e4;
                break;
              case 'hour':
                i = (this - r) / 36e5;
                break;
              case 'day':
                i = (this - r - o) / 864e5;
                break;
              case 'week':
                i = (this - r - o) / 6048e5;
                break;
              default:
                i = this - r;
            }
            return n ? i : ue(i);
          }),
          (wn.endOf = function (e) {
            var t, n;
            if (void 0 === (e = M(e)) || 'millisecond' === e || !this.isValid()) return this;
            switch (((n = this._isUTC ? Cn : yn), e)) {
              case 'year':
                t = n(this.year() + 1, 0, 1) - 1;
                break;
              case 'quarter':
                t = n(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
                break;
              case 'month':
                t = n(this.year(), this.month() + 1, 1) - 1;
                break;
              case 'week':
                t = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
              case 'isoWeek':
                t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
              case 'day':
              case 'date':
                t = n(this.year(), this.month(), this.date() + 1) - 1;
                break;
              case 'hour':
                ((t = this._d.valueOf()),
                  (t += An - Yn(t + (this._isUTC ? 0 : this.utcOffset() * pn), An) - 1));
                break;
              case 'minute':
                ((t = this._d.valueOf()), (t += pn - Yn(t, pn) - 1));
                break;
              case 'second':
                ((t = this._d.valueOf()), (t += Sn - Yn(t, Sn) - 1));
            }
            return (this._d.setTime(t), o.updateOffset(this, !0), this);
          }),
          (wn.format = function (e) {
            e || (e = this.isUtc() ? o.defaultFormatUtc : o.defaultFormat);
            var t = G(this, e);
            return this.localeData().postformat(t);
          }),
          (wn.from = function (e, t) {
            return this.isValid() && ((N(e) && e.isValid()) || Wt(e).isValid())
              ? an({ to: this, from: e }).locale(this.locale()).humanize(!t)
              : this.localeData().invalidDate();
          }),
          (wn.fromNow = function (e) {
            return this.from(Wt(), e);
          }),
          (wn.to = function (e, t) {
            return this.isValid() && ((N(e) && e.isValid()) || Wt(e).isValid())
              ? an({ from: this, to: e }).locale(this.locale()).humanize(!t)
              : this.localeData().invalidDate();
          }),
          (wn.toNow = function (e) {
            return this.to(Wt(), e);
          }),
          (wn.get = function (e) {
            return g(this[(e = M(e))]) ? this[e]() : this;
          }),
          (wn.invalidAt = function () {
            return h(this).overflow;
          }),
          (wn.isAfter = function (e, t) {
            var n = N(e) ? e : Wt(e);
            return (
              !(!this.isValid() || !n.isValid()) &&
              ('millisecond' === (t = M(t) || 'millisecond')
                ? this.valueOf() > n.valueOf()
                : n.valueOf() < this.clone().startOf(t).valueOf())
            );
          }),
          (wn.isBefore = function (e, t) {
            var n = N(e) ? e : Wt(e);
            return (
              !(!this.isValid() || !n.isValid()) &&
              ('millisecond' === (t = M(t) || 'millisecond')
                ? this.valueOf() < n.valueOf()
                : this.clone().endOf(t).valueOf() < n.valueOf())
            );
          }),
          (wn.isBetween = function (e, t, n, r) {
            var o = N(e) ? e : Wt(e),
              i = N(t) ? t : Wt(t);
            return (
              !!(this.isValid() && o.isValid() && i.isValid()) &&
              ('(' === (r = r || '()')[0] ? this.isAfter(o, n) : !this.isBefore(o, n)) &&
              (')' === r[1] ? this.isBefore(i, n) : !this.isAfter(i, n))
            );
          }),
          (wn.isSame = function (e, t) {
            var n,
              r = N(e) ? e : Wt(e);
            return (
              !(!this.isValid() || !r.isValid()) &&
              ('millisecond' === (t = M(t) || 'millisecond')
                ? this.valueOf() === r.valueOf()
                : ((n = r.valueOf()),
                  this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()))
            );
          }),
          (wn.isSameOrAfter = function (e, t) {
            return this.isSame(e, t) || this.isAfter(e, t);
          }),
          (wn.isSameOrBefore = function (e, t) {
            return this.isSame(e, t) || this.isBefore(e, t);
          }),
          (wn.isValid = function () {
            return T(this);
          }),
          (wn.lang = On),
          (wn.locale = Tn),
          (wn.localeData = mn),
          (wn.max = Ft),
          (wn.min = jt),
          (wn.parsingFlags = function () {
            return d({}, h(this));
          }),
          (wn.set = function (e, t) {
            if ('object' == typeof e) {
              var n,
                r = (function (e) {
                  var t,
                    n = [];
                  for (t in e) s(e, t) && n.push({ unit: t, priority: U[t] });
                  return (
                    n.sort(function (e, t) {
                      return e.priority - t.priority;
                    }),
                    n
                  );
                })((e = v(e))),
                o = r.length;
              for (n = 0; n < o; n++) this[r[n].unit](e[r[n].unit]);
            } else if (g(this[(e = M(e))])) return this[e](t);
            return this;
          }),
          (wn.startOf = function (e) {
            var t, n;
            if (void 0 === (e = M(e)) || 'millisecond' === e || !this.isValid()) return this;
            switch (((n = this._isUTC ? Cn : yn), e)) {
              case 'year':
                t = n(this.year(), 0, 1);
                break;
              case 'quarter':
                t = n(this.year(), this.month() - (this.month() % 3), 1);
                break;
              case 'month':
                t = n(this.year(), this.month(), 1);
                break;
              case 'week':
                t = n(this.year(), this.month(), this.date() - this.weekday());
                break;
              case 'isoWeek':
                t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
              case 'day':
              case 'date':
                t = n(this.year(), this.month(), this.date());
                break;
              case 'hour':
                ((t = this._d.valueOf()),
                  (t -= Yn(t + (this._isUTC ? 0 : this.utcOffset() * pn), An)));
                break;
              case 'minute':
                ((t = this._d.valueOf()), (t -= Yn(t, pn)));
                break;
              case 'second':
                ((t = this._d.valueOf()), (t -= Yn(t, Sn)));
            }
            return (this._d.setTime(t), o.updateOffset(this, !0), this);
          }),
          (wn.subtract = ln),
          (wn.toArray = function () {
            var e = this;
            return [
              e.year(),
              e.month(),
              e.date(),
              e.hour(),
              e.minute(),
              e.second(),
              e.millisecond(),
            ];
          }),
          (wn.toObject = function () {
            var e = this;
            return {
              years: e.year(),
              months: e.month(),
              date: e.date(),
              hours: e.hours(),
              minutes: e.minutes(),
              seconds: e.seconds(),
              milliseconds: e.milliseconds(),
            };
          }),
          (wn.toDate = function () {
            return new Date(this.valueOf());
          }),
          (wn.toISOString = function (e) {
            if (!this.isValid()) return null;
            var t = !0 !== e,
              n = t ? this.clone().utc() : this;
            return n.year() < 0 || n.year() > 9999
              ? G(n, t ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ')
              : g(Date.prototype.toISOString)
                ? t
                  ? this.toDate().toISOString()
                  : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
                      .toISOString()
                      .replace('Z', G(n, 'Z'))
                : G(n, t ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
          }),
          (wn.inspect = function () {
            if (!this.isValid()) return 'moment.invalid(/* ' + this._i + ' */)';
            var e,
              t,
              n,
              r = 'moment',
              o = '';
            return (
              this.isLocal() ||
                ((r = 0 === this.utcOffset() ? 'moment.utc' : 'moment.parseZone'), (o = 'Z')),
              (e = '[' + r + '("]'),
              (t = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY'),
              (n = o + '[")]'),
              this.format(e + t + '-MM-DD[T]HH:mm:ss.SSS' + n)
            );
          }),
          'undefined' != typeof Symbol &&
            null != Symbol.for &&
            (wn[Symbol.for('nodejs.util.inspect.custom')] = function () {
              return 'Moment<' + this.format() + '>';
            }),
          (wn.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (wn.toString = function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
          }),
          (wn.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (wn.valueOf = function () {
            return this._d.valueOf() - 6e4 * (this._offset || 0);
          }),
          (wn.creationData = function () {
            return {
              input: this._i,
              format: this._f,
              locale: this._locale,
              isUTC: this._isUTC,
              strict: this._strict,
            };
          }),
          (wn.eraName = function () {
            var e,
              t,
              n,
              r = this.localeData().eras();
            for (e = 0, t = r.length; e < t; ++e) {
              if (((n = this.clone().startOf('day').valueOf()), r[e].since <= n && n <= r[e].until))
                return r[e].name;
              if (r[e].until <= n && n <= r[e].since) return r[e].name;
            }
            return '';
          }),
          (wn.eraNarrow = function () {
            var e,
              t,
              n,
              r = this.localeData().eras();
            for (e = 0, t = r.length; e < t; ++e) {
              if (((n = this.clone().startOf('day').valueOf()), r[e].since <= n && n <= r[e].until))
                return r[e].narrow;
              if (r[e].until <= n && n <= r[e].since) return r[e].narrow;
            }
            return '';
          }),
          (wn.eraAbbr = function () {
            var e,
              t,
              n,
              r = this.localeData().eras();
            for (e = 0, t = r.length; e < t; ++e) {
              if (((n = this.clone().startOf('day').valueOf()), r[e].since <= n && n <= r[e].until))
                return r[e].abbr;
              if (r[e].until <= n && n <= r[e].since) return r[e].abbr;
            }
            return '';
          }),
          (wn.eraYear = function () {
            var e,
              t,
              n,
              r,
              i = this.localeData().eras();
            for (e = 0, t = i.length; e < t; ++e)
              if (
                ((n = i[e].since <= i[e].until ? 1 : -1),
                (r = this.clone().startOf('day').valueOf()),
                (i[e].since <= r && r <= i[e].until) || (i[e].until <= r && r <= i[e].since))
              )
                return (this.year() - o(i[e].since).year()) * n + i[e].offset;
            return this.year();
          }),
          (wn.year = ge),
          (wn.isLeapYear = function () {
            return he(this.year());
          }),
          (wn.weekYear = function (e) {
            return Mn.call(
              this,
              e,
              this.week(),
              this.weekday() + this.localeData()._week.dow,
              this.localeData()._week.dow,
              this.localeData()._week.doy,
            );
          }),
          (wn.isoWeekYear = function (e) {
            return Mn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
          }),
          (wn.quarter = wn.quarters =
            function (e) {
              return null == e
                ? Math.ceil((this.month() + 1) / 3)
                : this.month(3 * (e - 1) + (this.month() % 3));
            }),
          (wn.month = He),
          (wn.daysInMonth = function () {
            return Ue(this.year(), this.month());
          }),
          (wn.week = wn.weeks =
            function (e) {
              var t = this.localeData().week(this);
              return null == e ? t : this.add(7 * (e - t), 'd');
            }),
          (wn.isoWeek = wn.isoWeeks =
            function (e) {
              var t = _t(this, 1, 4).week;
              return null == e ? t : this.add(7 * (e - t), 'd');
            }),
          (wn.weeksInYear = function () {
            var e = this.localeData()._week;
            return ct(this.year(), e.dow, e.doy);
          }),
          (wn.weeksInWeekYear = function () {
            var e = this.localeData()._week;
            return ct(this.weekYear(), e.dow, e.doy);
          }),
          (wn.isoWeeksInYear = function () {
            return ct(this.year(), 1, 4);
          }),
          (wn.isoWeeksInISOWeekYear = function () {
            return ct(this.isoWeekYear(), 1, 4);
          }),
          (wn.date = Un),
          (wn.day = wn.days =
            function (e) {
              if (!this.isValid()) return null != e ? this : NaN;
              var t = Me(this, 'Day');
              return null != e
                ? ((e = (function (e, t) {
                    return 'string' != typeof e
                      ? e
                      : isNaN(e)
                        ? 'number' == typeof (e = t.weekdaysParse(e))
                          ? e
                          : null
                        : parseInt(e, 10);
                  })(e, this.localeData())),
                  this.add(e - t, 'd'))
                : t;
            }),
          (wn.weekday = function (e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, 'd');
          }),
          (wn.isoWeekday = function (e) {
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
              var t = (function (e, t) {
                return 'string' == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
              })(e, this.localeData());
              return this.day(this.day() % 7 ? t : t - 7);
            }
            return this.day() || 7;
          }),
          (wn.dayOfYear = function (e) {
            var t =
              Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
            return null == e ? t : this.add(e - t, 'd');
          }),
          (wn.hour = wn.hours = ft),
          (wn.minute = wn.minutes = Pn),
          (wn.second = wn.seconds = bn),
          (wn.millisecond = wn.milliseconds = Ln),
          (wn.utcOffset = function (e, t, n) {
            var r,
              i = this._offset || 0;
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
              if ('string' == typeof e) {
                if (null === (e = $t(ne, e))) return this;
              } else Math.abs(e) < 16 && !n && (e *= 60);
              return (
                !this._isUTC && t && (r = tn(this)),
                (this._offset = e),
                (this._isUTC = !0),
                null != r && this.add(r, 'm'),
                i !== e &&
                  (!t || this._changeInProgress
                    ? cn(this, an(e - i, 'm'), 1, !1)
                    : this._changeInProgress ||
                      ((this._changeInProgress = !0),
                      o.updateOffset(this, !0),
                      (this._changeInProgress = null))),
                this
              );
            }
            return this._isUTC ? i : tn(this);
          }),
          (wn.utc = function (e) {
            return this.utcOffset(0, e);
          }),
          (wn.local = function (e) {
            return (
              this._isUTC &&
                (this.utcOffset(0, e), (this._isUTC = !1), e && this.subtract(tn(this), 'm')),
              this
            );
          }),
          (wn.parseZone = function () {
            if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
            else if ('string' == typeof this._i) {
              var e = $t(te, this._i);
              null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
            }
            return this;
          }),
          (wn.hasAlignedHourOffset = function (e) {
            return (
              !!this.isValid() &&
              ((e = e ? Wt(e).utcOffset() : 0), (this.utcOffset() - e) % 60 == 0)
            );
          }),
          (wn.isDST = function () {
            return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
            );
          }),
          (wn.isLocal = function () {
            return !!this.isValid() && !this._isUTC;
          }),
          (wn.isUtcOffset = function () {
            return !!this.isValid() && this._isUTC;
          }),
          (wn.isUtc = nn),
          (wn.isUTC = nn),
          (wn.zoneAbbr = function () {
            return this._isUTC ? 'UTC' : '';
          }),
          (wn.zoneName = function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
          }),
          (wn.dates = y('dates accessor is deprecated. Use date instead.', Un)),
          (wn.months = y('months accessor is deprecated. Use month instead', He)),
          (wn.years = y('years accessor is deprecated. Use year instead', ge)),
          (wn.zone = y(
            'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
            function (e, t) {
              return null != e
                ? ('string' != typeof e && (e = -e), this.utcOffset(e, t), this)
                : -this.utcOffset();
            },
          )),
          (wn.isDSTShifted = y(
            'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
            function () {
              if (!u(this._isDSTShifted)) return this._isDSTShifted;
              var e,
                t = {};
              return (
                p(t, this),
                (t = Vt(t))._a
                  ? ((e = t._isUTC ? f(t._a) : Wt(t._a)),
                    (this._isDSTShifted =
                      this.isValid() &&
                      (function (e, t) {
                        var n,
                          r = Math.min(e.length, t.length),
                          o = Math.abs(e.length - t.length),
                          i = 0;
                        for (n = 0; n < r; n++) ce(e[n]) !== ce(t[n]) && i++;
                        return i + o;
                      })(t._a, e.toArray()) > 0))
                  : (this._isDSTShifted = !1),
                this._isDSTShifted
              );
            },
          )));
        var Gn = et.prototype;
        function Hn(e, t, n, r) {
          var o = yt(),
            i = f().set(r, t);
          return o[n](i, e);
        }
        function Vn(e, t, n) {
          if ((c(e) && ((t = e), (e = void 0)), (e = e || ''), null != t))
            return Hn(e, t, n, 'month');
          var r,
            o = [];
          for (r = 0; r < 12; r++) o[r] = Hn(e, r, n, 'month');
          return o;
        }
        function xn(e, t, n, r) {
          'boolean' == typeof e
            ? (c(t) && ((n = t), (t = void 0)), (t = t || ''))
            : ((n = t = e), (e = !1), c(t) && ((n = t), (t = void 0)), (t = t || ''));
          var o,
            i = yt(),
            a = e ? i._week.dow : 0,
            s = [];
          if (null != n) return Hn(t, (n + a) % 7, r, 'day');
          for (o = 0; o < 7; o++) s[o] = Hn(t, (o + a) % 7, r, 'day');
          return s;
        }
        ((Gn.calendar = function (e, t, n) {
          var r = this._calendar[e] || this._calendar.sameElse;
          return g(r) ? r.call(t, n) : r;
        }),
          (Gn.longDateFormat = function (e) {
            var t = this._longDateFormat[e],
              n = this._longDateFormat[e.toUpperCase()],
              r = this._longDateFormatCache;
            return t || !n
              ? t
              : r && r[e] && r[e].formatUpper === n
                ? r[e].format
                : ((t = n
                    .match(K)
                    .map(function (e) {
                      return 'MMMM' === e || 'MM' === e || 'DD' === e || 'dddd' === e
                        ? e.slice(1)
                        : e;
                    })
                    .join('')),
                  r || (r = this._longDateFormatCache = {}),
                  (r[e] = { formatUpper: n, format: t }),
                  t);
          }),
          (Gn.invalidDate = function () {
            return this._invalidDate;
          }),
          (Gn.ordinal = function (e) {
            return this._ordinal.replace('%d', e);
          }),
          (Gn.preparse = kn),
          (Gn.postformat = kn),
          (Gn.relativeTime = function (e, t, n, r) {
            return this.postformat(tt.call(this, e, t, n, r));
          }),
          (Gn.pastFuture = function (e, t) {
            return this.postformat(nt.call(this, e, t));
          }),
          (Gn.set = function (e) {
            var t, n;
            for (n in ((function (e, t) {
              var n, r;
              for (n = 0; n < we.length; n++) s(t, (r = we[n])) || delete e['_' + r];
            })(this, e),
            (function (e, t) {
              var n, r;
              for (n = 0; n < Ze.length; n++) s(t, (r = Ze[n])) || delete e['_' + r];
            })(this, e),
            e))
              s(e, n) && (g((t = e[n])) ? (this[n] = t) : (this['_' + n] = t));
            ((this._config = e),
              (this._dayOfMonthOrdinalParseLenient = new RegExp(
                (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                  '|' +
                  /\d{1,2}/.source,
              )));
          }),
          (Gn.eras = function (e, t) {
            var n,
              r,
              i,
              a = this._eras || yt('en')._eras;
            for (n = 0, r = a.length; n < r; ++n)
              switch (
                ('string' == typeof a[n].since &&
                  ((i = o(a[n].since).startOf('day')), (a[n].since = i.valueOf())),
                typeof a[n].until)
              ) {
                case 'undefined':
                  a[n].until = 1 / 0;
                  break;
                case 'string':
                  ((i = o(a[n].until).startOf('day').valueOf()), (a[n].until = i.valueOf()));
              }
            return a;
          }),
          (Gn.erasParse = function (e, t, n) {
            var r,
              o,
              i,
              a,
              s,
              _ = this.eras();
            for (e = e.toUpperCase(), r = 0, o = _.length; r < o; ++r)
              if (
                ((i = _[r].name.toUpperCase()),
                (a = _[r].abbr.toUpperCase()),
                (s = _[r].narrow.toUpperCase()),
                n)
              )
                switch (t) {
                  case 'N':
                  case 'NN':
                  case 'NNN':
                    if (a === e) return _[r];
                    break;
                  case 'NNNN':
                    if (i === e) return _[r];
                    break;
                  case 'NNNNN':
                    if (s === e) return _[r];
                }
              else if ([i, a, s].indexOf(e) >= 0) return _[r];
          }),
          (Gn.erasConvertYear = function (e, t) {
            var n = e.since <= e.until ? 1 : -1;
            return void 0 === t ? o(e.since).year() : o(e.since).year() + (t - e.offset) * n;
          }),
          (Gn.erasAbbrRegex = function (e) {
            return (
              s(this, '_erasAbbrRegex') || gn.call(this),
              e ? this._erasAbbrRegex : this._erasRegex
            );
          }),
          (Gn.erasNameRegex = function (e) {
            return (
              s(this, '_erasNameRegex') || gn.call(this),
              e ? this._erasNameRegex : this._erasRegex
            );
          }),
          (Gn.erasNarrowRegex = function (e) {
            return (
              s(this, '_erasNarrowRegex') || gn.call(this),
              e ? this._erasNarrowRegex : this._erasRegex
            );
          }),
          (Gn.months = function (e, t) {
            return e
              ? i(this._months)
                ? this._months[e.month()]
                : this._months[(this._months.isFormat || Le).test(t) ? 'format' : 'standalone'][
                    e.month()
                  ]
              : i(this._months)
                ? this._months
                : this._months.standalone;
          }),
          (Gn.monthsShort = function (e, t) {
            return e
              ? i(this._monthsShort)
                ? this._monthsShort[e.month()]
                : this._monthsShort[Le.test(t) ? 'format' : 'standalone'][e.month()]
              : i(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort.standalone;
          }),
          (Gn.monthsParse = function (e, t, n) {
            var r, o, i;
            if (this._monthsParseExact) return ke.call(this, e, t, n);
            for (
              this._monthsParse ||
                ((this._monthsParse = []),
                (this._longMonthsParse = []),
                (this._shortMonthsParse = [])),
                r = 0;
              r < 12;
              r++
            ) {
              if (
                ((o = f([2e3, r])),
                n &&
                  !this._longMonthsParse[r] &&
                  ((this._longMonthsParse[r] = new RegExp(
                    '^' + this.months(o, '').replace('.', '') + '$',
                    'i',
                  )),
                  (this._shortMonthsParse[r] = new RegExp(
                    '^' + this.monthsShort(o, '').replace('.', '') + '$',
                    'i',
                  ))),
                n ||
                  this._monthsParse[r] ||
                  ((i = '^' + this.months(o, '') + '|^' + this.monthsShort(o, '')),
                  (this._monthsParse[r] = new RegExp(i.replace('.', ''), 'i'))),
                n && 'MMMM' === t && this._longMonthsParse[r].test(e))
              )
                return r;
              if (n && 'MMM' === t && this._shortMonthsParse[r].test(e)) return r;
              if (!n && this._monthsParse[r].test(e)) return r;
            }
          }),
          (Gn.monthsRegex = function (e) {
            return this._monthsParseExact
              ? (s(this, '_monthsRegex') || Ve.call(this),
                e ? this._monthsStrictRegex : this._monthsRegex)
              : (s(this, '_monthsRegex') || (this._monthsRegex = De),
                this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
          }),
          (Gn.monthsShortRegex = function (e) {
            return this._monthsParseExact
              ? (s(this, '_monthsRegex') || Ve.call(this),
                e ? this._monthsShortStrictRegex : this._monthsShortRegex)
              : (s(this, '_monthsShortRegex') || (this._monthsShortRegex = be),
                this._monthsShortStrictRegex && e
                  ? this._monthsShortStrictRegex
                  : this._monthsShortRegex);
          }),
          (Gn.week = function (e) {
            return _t(e, this._week.dow, this._week.doy).week;
          }),
          (Gn.firstDayOfYear = function () {
            return this._week.doy;
          }),
          (Gn.firstDayOfWeek = function () {
            return this._week.dow;
          }),
          (Gn.weekdays = function (e, t) {
            var n = i(this._weekdays)
              ? this._weekdays
              : this._weekdays[
                  e && !0 !== e && this._weekdays.isFormat.test(t) ? 'format' : 'standalone'
                ];
            return !0 === e ? xe(n, this._week.dow) : e ? n[e.day()] : n;
          }),
          (Gn.weekdaysMin = function (e) {
            return !0 === e
              ? xe(this._weekdaysMin, this._week.dow)
              : e
                ? this._weekdaysMin[e.day()]
                : this._weekdaysMin;
          }),
          (Gn.weekdaysShort = function (e) {
            return !0 === e
              ? xe(this._weekdaysShort, this._week.dow)
              : e
                ? this._weekdaysShort[e.day()]
                : this._weekdaysShort;
          }),
          (Gn.weekdaysParse = function (e, t, n) {
            var r, o, i;
            if (this._weekdaysParseExact) return qe.call(this, e, t, n);
            for (
              this._weekdaysParse ||
                ((this._weekdaysParse = []),
                (this._minWeekdaysParse = []),
                (this._shortWeekdaysParse = []),
                (this._fullWeekdaysParse = [])),
                r = 0;
              r < 7;
              r++
            ) {
              if (
                ((o = f([2e3, 1]).day(r)),
                n &&
                  !this._fullWeekdaysParse[r] &&
                  ((this._fullWeekdaysParse[r] = new RegExp(
                    '^' + this.weekdays(o, '').replace('.', '\\.?') + '$',
                    'i',
                  )),
                  (this._shortWeekdaysParse[r] = new RegExp(
                    '^' + this.weekdaysShort(o, '').replace('.', '\\.?') + '$',
                    'i',
                  )),
                  (this._minWeekdaysParse[r] = new RegExp(
                    '^' + this.weekdaysMin(o, '').replace('.', '\\.?') + '$',
                    'i',
                  ))),
                this._weekdaysParse[r] ||
                  ((i =
                    '^' +
                    this.weekdays(o, '') +
                    '|^' +
                    this.weekdaysShort(o, '') +
                    '|^' +
                    this.weekdaysMin(o, '')),
                  (this._weekdaysParse[r] = new RegExp(i.replace('.', ''), 'i'))),
                n && 'dddd' === t && this._fullWeekdaysParse[r].test(e))
              )
                return r;
              if (n && 'ddd' === t && this._shortWeekdaysParse[r].test(e)) return r;
              if (n && 'dd' === t && this._minWeekdaysParse[r].test(e)) return r;
              if (!n && this._weekdaysParse[r].test(e)) return r;
            }
          }),
          (Gn.weekdaysRegex = function (e) {
            return this._weekdaysParseExact
              ? (s(this, '_weekdaysRegex') || Je.call(this),
                e ? this._weekdaysStrictRegex : this._weekdaysRegex)
              : (s(this, '_weekdaysRegex') || (this._weekdaysRegex = Xe),
                this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
          }),
          (Gn.weekdaysShortRegex = function (e) {
            return this._weekdaysParseExact
              ? (s(this, '_weekdaysRegex') || Je.call(this),
                e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
              : (s(this, '_weekdaysShortRegex') || (this._weekdaysShortRegex = Qe),
                this._weekdaysShortStrictRegex && e
                  ? this._weekdaysShortStrictRegex
                  : this._weekdaysShortRegex);
          }),
          (Gn.weekdaysMinRegex = function (e) {
            return this._weekdaysParseExact
              ? (s(this, '_weekdaysRegex') || Je.call(this),
                e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
              : (s(this, '_weekdaysMinRegex') || (this._weekdaysMinRegex = ze),
                this._weekdaysMinStrictRegex && e
                  ? this._weekdaysMinStrictRegex
                  : this._weekdaysMinRegex);
          }),
          (Gn.isPM = function (e) {
            return 'p' === (e + '').toLowerCase().charAt(0);
          }),
          (Gn.meridiem = function (e, t, n) {
            return e > 11 ? (n ? 'pm' : 'PM') : n ? 'am' : 'AM';
          }),
          Nt('en', {
            eras: [
              {
                since: '0001-01-01',
                until: 1 / 0,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
              },
              {
                since: '0000-12-31',
                until: -1 / 0,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
              },
            ],
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 === ce((e % 100) / 10)
                  ? 'th'
                  : 1 === t
                    ? 'st'
                    : 2 === t
                      ? 'nd'
                      : 3 === t
                        ? 'rd'
                        : 'th')
              );
            },
          }),
          (o.lang = y('moment.lang is deprecated. Use moment.locale instead.', Nt)),
          (o.langData = y('moment.langData is deprecated. Use moment.localeData instead.', yt)));
        var Wn = Math.abs;
        function jn(e, t, n, r) {
          var o = an(t, n);
          return (
            (e._milliseconds += r * o._milliseconds),
            (e._days += r * o._days),
            (e._months += r * o._months),
            e._bubble()
          );
        }
        function Fn(e) {
          return e < 0 ? Math.floor(e) : Math.ceil(e);
        }
        function Bn(e) {
          return (4800 * e) / 146097;
        }
        function Xn(e) {
          return (146097 * e) / 4800;
        }
        function Qn(e) {
          return function () {
            return this.as(e);
          };
        }
        var zn = Qn('ms'),
          Zn = Qn('s'),
          qn = Qn('m'),
          Jn = Qn('h'),
          $n = Qn('d'),
          er = Qn('w'),
          tr = Qn('M'),
          nr = Qn('Q'),
          rr = Qn('y'),
          or = zn;
        function ir(e) {
          return function () {
            return this.isValid() ? this._data[e] : NaN;
          };
        }
        var ar = ir('milliseconds'),
          sr = ir('seconds'),
          _r = ir('minutes'),
          ur = ir('hours'),
          cr = ir('days'),
          Er = ir('months'),
          lr = ir('years');
        var dr = Math.round,
          fr = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
        function hr(e, t, n, r, o) {
          return tt.call(o, t || 1, !!n, e, r);
        }
        function Tr(e, t, n, r) {
          var o = an(e).abs(),
            i = dr(o.as('s')),
            a = dr(o.as('m')),
            s = dr(o.as('h')),
            _ = dr(o.as('d')),
            u = dr(o.as('M')),
            c = dr(o.as('w')),
            E = dr(o.as('y')),
            l =
              (i <= n.ss && ['s', i]) ||
              (i < n.s && ['ss', i]) ||
              (a <= 1 && ['m']) ||
              (a < n.m && ['mm', a]) ||
              (s <= 1 && ['h']) ||
              (s < n.h && ['hh', s]) ||
              (_ <= 1 && ['d']) ||
              (_ < n.d && ['dd', _]);
          return (
            null != n.w && (l = l || (c <= 1 && ['w']) || (c < n.w && ['ww', c])),
            ((l = l ||
              (u <= 1 && ['M']) ||
              (u < n.M && ['MM', u]) ||
              (E <= 1 && ['y']) || ['yy', E])[2] = t),
            (l[3] = +e > 0),
            (l[4] = r),
            hr.apply(null, l)
          );
        }
        var Or = Math.abs;
        function mr(e) {
          return (e > 0) - (e < 0) || +e;
        }
        function Sr() {
          if (!this.isValid()) return this.localeData().invalidDate();
          var e,
            t,
            n,
            r,
            o,
            i,
            a,
            s,
            _ = Or(this._milliseconds) / 1e3,
            u = Or(this._days),
            c = Or(this._months),
            E = this.asSeconds();
          return E
            ? ((e = ue(_ / 60)),
              (t = ue(e / 60)),
              (_ %= 60),
              (e %= 60),
              (n = ue(c / 12)),
              (c %= 12),
              (r = _ ? _.toFixed(3).replace(/\.?0+$/, '') : ''),
              (o = E < 0 ? '-' : ''),
              (i = mr(this._months) !== mr(E) ? '-' : ''),
              (a = mr(this._days) !== mr(E) ? '-' : ''),
              (s = mr(this._milliseconds) !== mr(E) ? '-' : ''),
              o +
                'P' +
                (n ? i + n + 'Y' : '') +
                (c ? i + c + 'M' : '') +
                (u ? a + u + 'D' : '') +
                (t || e || _ ? 'T' : '') +
                (t ? s + t + 'H' : '') +
                (e ? s + e + 'M' : '') +
                (_ ? s + r + 'S' : ''))
            : 'P0D';
        }
        var pr = Qt.prototype;
        return (
          (pr.isValid = function () {
            return this._isValid;
          }),
          (pr.abs = function () {
            var e = this._data;
            return (
              (this._milliseconds = Wn(this._milliseconds)),
              (this._days = Wn(this._days)),
              (this._months = Wn(this._months)),
              (e.milliseconds = Wn(e.milliseconds)),
              (e.seconds = Wn(e.seconds)),
              (e.minutes = Wn(e.minutes)),
              (e.hours = Wn(e.hours)),
              (e.months = Wn(e.months)),
              (e.years = Wn(e.years)),
              this
            );
          }),
          (pr.add = function (e, t) {
            return jn(this, e, t, 1);
          }),
          (pr.subtract = function (e, t) {
            return jn(this, e, t, -1);
          }),
          (pr.as = function (e) {
            if (!this.isValid()) return NaN;
            var t,
              n,
              r = this._milliseconds;
            if ('month' === (e = M(e)) || 'quarter' === e || 'year' === e)
              switch (((t = this._days + r / 864e5), (n = this._months + Bn(t)), e)) {
                case 'month':
                  return n;
                case 'quarter':
                  return n / 3;
                case 'year':
                  return n / 12;
              }
            else
              switch (((t = this._days + Math.round(Xn(this._months))), e)) {
                case 'week':
                  return t / 7 + r / 6048e5;
                case 'day':
                  return t + r / 864e5;
                case 'hour':
                  return 24 * t + r / 36e5;
                case 'minute':
                  return 1440 * t + r / 6e4;
                case 'second':
                  return 86400 * t + r / 1e3;
                case 'millisecond':
                  return Math.floor(864e5 * t) + r;
                default:
                  throw new Error('Unknown unit ' + e);
              }
          }),
          (pr.asMilliseconds = zn),
          (pr.asSeconds = Zn),
          (pr.asMinutes = qn),
          (pr.asHours = Jn),
          (pr.asDays = $n),
          (pr.asWeeks = er),
          (pr.asMonths = tr),
          (pr.asQuarters = nr),
          (pr.asYears = rr),
          (pr.valueOf = or),
          (pr._bubble = function () {
            var e,
              t,
              n,
              r,
              o,
              i = this._milliseconds,
              a = this._days,
              s = this._months,
              _ = this._data;
            return (
              (i >= 0 && a >= 0 && s >= 0) ||
                (i <= 0 && a <= 0 && s <= 0) ||
                ((i += 864e5 * Fn(Xn(s) + a)), (a = 0), (s = 0)),
              (_.milliseconds = i % 1e3),
              (e = ue(i / 1e3)),
              (_.seconds = e % 60),
              (t = ue(e / 60)),
              (_.minutes = t % 60),
              (n = ue(t / 60)),
              (_.hours = n % 24),
              (a += ue(n / 24)),
              (s += o = ue(Bn(a))),
              (a -= Fn(Xn(o))),
              (r = ue(s / 12)),
              (s %= 12),
              (_.days = a),
              (_.months = s),
              (_.years = r),
              this
            );
          }),
          (pr.clone = function () {
            return an(this);
          }),
          (pr.get = function (e) {
            return ((e = M(e)), this.isValid() ? this[e + 's']() : NaN);
          }),
          (pr.milliseconds = ar),
          (pr.seconds = sr),
          (pr.minutes = _r),
          (pr.hours = ur),
          (pr.days = cr),
          (pr.weeks = function () {
            return ue(this.days() / 7);
          }),
          (pr.months = Er),
          (pr.years = lr),
          (pr.humanize = function (e, t) {
            if (!this.isValid()) return this.localeData().invalidDate();
            var n,
              r,
              o = !1,
              i = fr;
            return (
              'object' == typeof e && ((t = e), (e = !1)),
              'boolean' == typeof e && (o = e),
              'object' == typeof t &&
                ((i = d(d({}, fr), t || {})), null != t.s && null == t.ss && (i.ss = t.s - 1)),
              (r = Tr(this, !o, i, (n = this.localeData()))),
              o && (r = nt.call(n, +this, r)),
              n.postformat(r)
            );
          }),
          (pr.toISOString = Sr),
          (pr.toString = Sr),
          (pr.toJSON = Sr),
          (pr.locale = Tn),
          (pr.localeData = mn),
          (pr.toIsoString = y(
            'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
            Sr,
          )),
          (pr.lang = On),
          w('X', 0, 0, 'unix'),
          w('x', 0, 0, 'valueOf'),
          ae('x', ee),
          ae('X', /[+-]?\d+(\.\d{1,3})?/),
          le('X', function (e, t, n) {
            n._d = new Date(1e3 * parseFloat(e));
          }),
          le('x', function (e, t, n) {
            n._d = new Date(ce(e));
          }),
          (o.version = '2.31.0'),
          (t = Wt),
          (o.fn = wn),
          (o.min = function () {
            return Bt('isBefore', [].slice.call(arguments, 0));
          }),
          (o.max = function () {
            return Bt('isAfter', [].slice.call(arguments, 0));
          }),
          (o.now = function () {
            return Date.now ? Date.now() : +new Date();
          }),
          (o.utc = f),
          (o.unix = function (e) {
            return Wt(1e3 * e);
          }),
          (o.months = function (e, t) {
            return Vn(e, t, 'months');
          }),
          (o.isDate = E),
          (o.locale = Nt),
          (o.invalid = O),
          (o.duration = an),
          (o.isMoment = N),
          (o.weekdays = function (e, t, n) {
            return xn(e, t, n, 'weekdays');
          }),
          (o.parseZone = function () {
            return Wt.apply(null, arguments).parseZone();
          }),
          (o.localeData = yt),
          (o.isDuration = zt),
          (o.monthsShort = function (e, t) {
            return Vn(e, t, 'monthsShort');
          }),
          (o.weekdaysMin = function (e, t, n) {
            return xn(e, t, n, 'weekdaysMin');
          }),
          (o.defineLocale = Yt),
          (o.updateLocale = function (e, t) {
            var n,
              r = At(e),
              o = Tt;
            return (
              null != r && (e = r._abbr),
              null != t
                ? (null != Ot[e] && null != Ot[e].parentLocale
                    ? Ot[e].set($e(Ot[e]._config, t))
                    : (null != r && (o = r._config),
                      (t = $e(o, t)),
                      null == r && (t.abbr = e),
                      ((n = new et(t)).parentLocale = Ot[e]),
                      (Ot[e] = n)),
                  Nt(e))
                : null != Ot[e] &&
                  (null != Ot[e].parentLocale
                    ? ((Ot[e] = Ot[e].parentLocale), e === Nt() && Nt(e))
                    : null != Ot[e] && delete Ot[e]),
              Ot[e]
            );
          }),
          (o.locales = function () {
            return We(Ot);
          }),
          (o.weekdaysShort = function (e, t, n) {
            return xn(e, t, n, 'weekdaysShort');
          }),
          (o.normalizeUnits = M),
          (o.relativeTimeRounding = function (e) {
            return void 0 === e ? dr : 'function' == typeof e && ((dr = e), !0);
          }),
          (o.relativeTimeThreshold = function (e, t) {
            return (
              void 0 !== fr[e] &&
              (void 0 === t ? fr[e] : ((fr[e] = t), 's' === e && (fr.ss = t - 1), !0))
            );
          }),
          (o.calendarFormat = function (e, t) {
            var n = e.diff(t, 'days', !0);
            return n < -6
              ? 'sameElse'
              : n < -1
                ? 'lastWeek'
                : n < 0
                  ? 'lastDay'
                  : n < 1
                    ? 'sameDay'
                    : n < 2
                      ? 'nextDay'
                      : n < 7
                        ? 'nextWeek'
                        : 'sameElse';
          }),
          (o.prototype = wn),
          (o.HTML5_FMT = {
            DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
            DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
            DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
            DATE: 'YYYY-MM-DD',
            TIME: 'HH:mm',
            TIME_SECONDS: 'HH:mm:ss',
            TIME_MS: 'HH:mm:ss.SSS',
            WEEK: 'GGGG-[W]WW',
            MONTH: 'YYYY-MM',
          }),
          o
        );
      })();
    },
    783134: (e, t, n) => {
      'use strict';
      function r(e, t) {
        return (void 0 === t && (t = 15), +parseFloat(Number(e).toPrecision(t)));
      }
      function o(e) {
        var t = e.toString().split(/[eE]/),
          n = (t[0].split('.')[1] || '').length - +(t[1] || 0);
        return n > 0 ? n : 0;
      }
      function i(e) {
        if (-1 === e.toString().indexOf('e')) return Number(e.toString().replace('.', ''));
        var t = o(e);
        return t > 0 ? r(Number(e) * Math.pow(10, t)) : Number(e);
      }
      function a(e) {
        d &&
          (e > Number.MAX_SAFE_INTEGER || e < Number.MIN_SAFE_INTEGER) &&
          console.warn(
            e + ' is beyond boundary when transfer to integer, the results may not be accurate',
          );
      }
      function s(e) {
        return function () {
          for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
          var r = t[0];
          return t.slice(1).reduce(function (t, n) {
            return e(t, n);
          }, r);
        };
      }
      (n.r(t),
        n.d(t, {
          default: () => h,
          digitLength: () => o,
          divide: () => E,
          enableBoundaryChecking: () => f,
          float2Fixed: () => i,
          minus: () => c,
          plus: () => u,
          round: () => l,
          strip: () => r,
          times: () => _,
        }));
      var _ = s(function (e, t) {
          var n = i(e),
            r = i(t),
            s = o(e) + o(t),
            _ = n * r;
          return (a(_), _ / Math.pow(10, s));
        }),
        u = s(function (e, t) {
          var n = Math.pow(10, Math.max(o(e), o(t)));
          return (_(e, n) + _(t, n)) / n;
        }),
        c = s(function (e, t) {
          var n = Math.pow(10, Math.max(o(e), o(t)));
          return (_(e, n) - _(t, n)) / n;
        }),
        E = s(function (e, t) {
          var n = i(e),
            s = i(t);
          return (a(n), a(s), _(n / s, r(Math.pow(10, o(t) - o(e)))));
        });
      function l(e, t) {
        var n = Math.pow(10, t),
          r = E(Math.round(Math.abs(_(e, n))), n);
        return (e < 0 && 0 !== r && (r = _(r, -1)), r);
      }
      var d = !0;
      function f(e) {
        (void 0 === e && (e = !0), (d = e));
      }
      const h = {
        strip: r,
        plus: u,
        minus: c,
        times: _,
        divide: E,
        round: l,
        digitLength: o,
        float2Fixed: i,
        enableBoundaryChecking: f,
      };
    },
    45228: (e) => {
      'use strict';
      var t = Object.getOwnPropertySymbols,
        n = Object.prototype.hasOwnProperty,
        r = Object.prototype.propertyIsEnumerable;
      e.exports = (function () {
        try {
          if (!Object.assign) return !1;
          var e = new String('abc');
          if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0])) return !1;
          for (var t = {}, n = 0; n < 10; n++) t['_' + String.fromCharCode(n)] = n;
          if (
            '0123456789' !==
            Object.getOwnPropertyNames(t)
              .map(function (e) {
                return t[e];
              })
              .join('')
          )
            return !1;
          var r = {};
          return (
            'abcdefghijklmnopqrst'.split('').forEach(function (e) {
              r[e] = e;
            }),
            'abcdefghijklmnopqrst' === Object.keys(Object.assign({}, r)).join('')
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function (e, o) {
            for (
              var i,
                a,
                s = (function (e) {
                  if (null == e)
                    throw new TypeError('Object.assign cannot be called with null or undefined');
                  return Object(e);
                })(e),
                _ = 1;
              _ < arguments.length;
              _++
            ) {
              for (var u in (i = Object(arguments[_]))) n.call(i, u) && (s[u] = i[u]);
              if (t) {
                a = t(i);
                for (var c = 0; c < a.length; c++) r.call(i, a[c]) && (s[a[c]] = i[a[c]]);
              }
            }
            return s;
          };
    },
    358859: (e, t, n) => {
      var r = 'function' == typeof Map && Map.prototype,
        o =
          Object.getOwnPropertyDescriptor && r
            ? Object.getOwnPropertyDescriptor(Map.prototype, 'size')
            : null,
        i = r && o && 'function' == typeof o.get ? o.get : null,
        a = r && Map.prototype.forEach,
        s = 'function' == typeof Set && Set.prototype,
        _ =
          Object.getOwnPropertyDescriptor && s
            ? Object.getOwnPropertyDescriptor(Set.prototype, 'size')
            : null,
        u = s && _ && 'function' == typeof _.get ? _.get : null,
        c = s && Set.prototype.forEach,
        E = 'function' == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null,
        l = 'function' == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null,
        d = 'function' == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null,
        f = Boolean.prototype.valueOf,
        h = Object.prototype.toString,
        T = Function.prototype.toString,
        O = String.prototype.match,
        m = String.prototype.slice,
        S = String.prototype.replace,
        p = String.prototype.toUpperCase,
        A = String.prototype.toLowerCase,
        N = RegExp.prototype.test,
        Y = Array.prototype.concat,
        y = Array.prototype.join,
        C = Array.prototype.slice,
        I = Math.floor,
        g = 'function' == typeof BigInt ? BigInt.prototype.valueOf : null,
        R = Object.getOwnPropertySymbols,
        M =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? Symbol.prototype.toString
            : null,
        v = 'function' == typeof Symbol && 'object' == typeof Symbol.iterator,
        U =
          'function' == typeof Symbol && Symbol.toStringTag && (Symbol.toStringTag, 1)
            ? Symbol.toStringTag
            : null,
        P = Object.prototype.propertyIsEnumerable,
        K =
          ('function' == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) ||
          ([].__proto__ === Array.prototype
            ? function (e) {
                return e.__proto__;
              }
            : null);
      function L(e, t) {
        if (e === 1 / 0 || e === -1 / 0 || e != e || (e && e > -1e3 && e < 1e3) || N.call(/e/, t))
          return t;
        var n = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if ('number' == typeof e) {
          var r = e < 0 ? -I(-e) : I(e);
          if (r !== e) {
            var o = String(r),
              i = m.call(t, o.length + 1);
            return S.call(o, n, '$&_') + '.' + S.call(S.call(i, /([0-9]{3})/g, '$&_'), /_$/, '');
          }
        }
        return S.call(t, n, '$&_');
      }
      var b = n(242634),
        D = b.custom,
        w = F(D) ? D : null,
        k = { __proto__: null, double: '"', single: "'" },
        G = { __proto__: null, double: /(["\\])/g, single: /(['\\])/g };
      function H(e, t, n) {
        var r = n.quoteStyle || t,
          o = k[r];
        return o + e + o;
      }
      function V(e) {
        return S.call(String(e), /"/g, '&quot;');
      }
      function x(e) {
        return !U || !('object' == typeof e && (U in e || void 0 !== e[U]));
      }
      function W(e) {
        return '[object Array]' === Q(e) && x(e);
      }
      function j(e) {
        return '[object RegExp]' === Q(e) && x(e);
      }
      function F(e) {
        if (v) return e && 'object' == typeof e && e instanceof Symbol;
        if ('symbol' == typeof e) return !0;
        if (!e || 'object' != typeof e || !M) return !1;
        try {
          return (M.call(e), !0);
        } catch (e) {}
        return !1;
      }
      e.exports = function e(t, r, o, s) {
        var _ = r || {};
        if (X(_, 'quoteStyle') && !X(k, _.quoteStyle))
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        if (
          X(_, 'maxStringLength') &&
          ('number' == typeof _.maxStringLength
            ? _.maxStringLength < 0 && _.maxStringLength !== 1 / 0
            : null !== _.maxStringLength)
        )
          throw new TypeError(
            'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
          );
        var h = !X(_, 'customInspect') || _.customInspect;
        if ('boolean' != typeof h && 'symbol' !== h)
          throw new TypeError(
            'option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`',
          );
        if (
          X(_, 'indent') &&
          null !== _.indent &&
          '\t' !== _.indent &&
          !(parseInt(_.indent, 10) === _.indent && _.indent > 0)
        )
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        if (X(_, 'numericSeparator') && 'boolean' != typeof _.numericSeparator)
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        var p = _.numericSeparator;
        if (void 0 === t) return 'undefined';
        if (null === t) return 'null';
        if ('boolean' == typeof t) return t ? 'true' : 'false';
        if ('string' == typeof t) return Z(t, _);
        if ('number' == typeof t) {
          if (0 === t) return 1 / 0 / t > 0 ? '0' : '-0';
          var N = String(t);
          return p ? L(t, N) : N;
        }
        if ('bigint' == typeof t) {
          var I = String(t) + 'n';
          return p ? L(t, I) : I;
        }
        var R = void 0 === _.depth ? 5 : _.depth;
        if ((void 0 === o && (o = 0), o >= R && R > 0 && 'object' == typeof t))
          return W(t) ? '[Array]' : '[Object]';
        var D,
          G = (function (e, t) {
            var n;
            if ('\t' === e.indent) n = '\t';
            else {
              if (!('number' == typeof e.indent && e.indent > 0)) return null;
              n = y.call(Array(e.indent + 1), ' ');
            }
            return { base: n, prev: y.call(Array(t + 1), n) };
          })(_, o);
        if (void 0 === s) s = [];
        else if (z(s, t) >= 0) return '[Circular]';
        function B(t, n, r) {
          if ((n && (s = C.call(s)).push(n), r)) {
            var i = { depth: _.depth };
            return (X(_, 'quoteStyle') && (i.quoteStyle = _.quoteStyle), e(t, i, o + 1, s));
          }
          return e(t, _, o + 1, s);
        }
        if ('function' == typeof t && !j(t)) {
          var q = (function (e) {
              if (e.name) return e.name;
              var t = O.call(T.call(e), /^function\s*([\w$]+)/);
              return t ? t[1] : null;
            })(t),
            re = ne(t, B);
          return (
            '[Function' +
            (q ? ': ' + q : ' (anonymous)') +
            ']' +
            (re.length > 0 ? ' { ' + y.call(re, ', ') + ' }' : '')
          );
        }
        if (F(t)) {
          var oe = v ? S.call(String(t), /^(Symbol\(.*\))_[^)]*$/, '$1') : M.call(t);
          return 'object' != typeof t || v ? oe : J(oe);
        }
        if (
          (D = t) &&
          'object' == typeof D &&
          (('undefined' != typeof HTMLElement && D instanceof HTMLElement) ||
            ('string' == typeof D.nodeName && 'function' == typeof D.getAttribute))
        ) {
          for (
            var ie = '<' + A.call(String(t.nodeName)), ae = t.attributes || [], se = 0;
            se < ae.length;
            se++
          )
            ie += ' ' + ae[se].name + '=' + H(V(ae[se].value), 'double', _);
          return (
            (ie += '>'),
            t.childNodes && t.childNodes.length && (ie += '...'),
            ie + '</' + A.call(String(t.nodeName)) + '>'
          );
        }
        if (W(t)) {
          if (0 === t.length) return '[]';
          var _e = ne(t, B);
          return G &&
            !(function (e) {
              for (var t = 0; t < e.length; t++) if (z(e[t], '\n') >= 0) return !1;
              return !0;
            })(_e)
            ? '[' + te(_e, G) + ']'
            : '[ ' + y.call(_e, ', ') + ' ]';
        }
        if (
          (function (e) {
            return '[object Error]' === Q(e) && x(e);
          })(t)
        ) {
          var ue = ne(t, B);
          return 'cause' in Error.prototype || !('cause' in t) || P.call(t, 'cause')
            ? 0 === ue.length
              ? '[' + String(t) + ']'
              : '{ [' + String(t) + '] ' + y.call(ue, ', ') + ' }'
            : '{ [' + String(t) + '] ' + y.call(Y.call('[cause]: ' + B(t.cause), ue), ', ') + ' }';
        }
        if ('object' == typeof t && h) {
          if (w && 'function' == typeof t[w] && b) return b(t, { depth: R - o });
          if ('symbol' !== h && 'function' == typeof t.inspect) return t.inspect();
        }
        if (
          (function (e) {
            if (!i || !e || 'object' != typeof e) return !1;
            try {
              i.call(e);
              try {
                u.call(e);
              } catch (e) {
                return !0;
              }
              return e instanceof Map;
            } catch (e) {}
            return !1;
          })(t)
        ) {
          var ce = [];
          return (
            a &&
              a.call(t, function (e, n) {
                ce.push(B(n, t, !0) + ' => ' + B(e, t));
              }),
            ee('Map', i.call(t), ce, G)
          );
        }
        if (
          (function (e) {
            if (!u || !e || 'object' != typeof e) return !1;
            try {
              u.call(e);
              try {
                i.call(e);
              } catch (e) {
                return !0;
              }
              return e instanceof Set;
            } catch (e) {}
            return !1;
          })(t)
        ) {
          var Ee = [];
          return (
            c &&
              c.call(t, function (e) {
                Ee.push(B(e, t));
              }),
            ee('Set', u.call(t), Ee, G)
          );
        }
        if (
          (function (e) {
            if (!E || !e || 'object' != typeof e) return !1;
            try {
              E.call(e, E);
              try {
                l.call(e, l);
              } catch (e) {
                return !0;
              }
              return e instanceof WeakMap;
            } catch (e) {}
            return !1;
          })(t)
        )
          return $('WeakMap');
        if (
          (function (e) {
            if (!l || !e || 'object' != typeof e) return !1;
            try {
              l.call(e, l);
              try {
                E.call(e, E);
              } catch (e) {
                return !0;
              }
              return e instanceof WeakSet;
            } catch (e) {}
            return !1;
          })(t)
        )
          return $('WeakSet');
        if (
          (function (e) {
            if (!d || !e || 'object' != typeof e) return !1;
            try {
              return (d.call(e), !0);
            } catch (e) {}
            return !1;
          })(t)
        )
          return $('WeakRef');
        if (
          (function (e) {
            return '[object Number]' === Q(e) && x(e);
          })(t)
        )
          return J(B(Number(t)));
        if (
          (function (e) {
            if (!e || 'object' != typeof e || !g) return !1;
            try {
              return (g.call(e), !0);
            } catch (e) {}
            return !1;
          })(t)
        )
          return J(B(g.call(t)));
        if (
          (function (e) {
            return '[object Boolean]' === Q(e) && x(e);
          })(t)
        )
          return J(f.call(t));
        if (
          (function (e) {
            return '[object String]' === Q(e) && x(e);
          })(t)
        )
          return J(B(String(t)));
        if ('undefined' != typeof window && t === window) return '{ [object Window] }';
        if (('undefined' != typeof globalThis && t === globalThis) || (void 0 !== n.g && t === n.g))
          return '{ [object globalThis] }';
        if (
          !(function (e) {
            return '[object Date]' === Q(e) && x(e);
          })(t) &&
          !j(t)
        ) {
          var le = ne(t, B),
            de = K ? K(t) === Object.prototype : t instanceof Object || t.constructor === Object,
            fe = t instanceof Object ? '' : 'null prototype',
            he = !de && U && Object(t) === t && U in t ? m.call(Q(t), 8, -1) : fe ? 'Object' : '',
            Te =
              (de || 'function' != typeof t.constructor
                ? ''
                : t.constructor.name
                  ? t.constructor.name + ' '
                  : '') +
              (he || fe ? '[' + y.call(Y.call([], he || [], fe || []), ': ') + '] ' : '');
          return 0 === le.length
            ? Te + '{}'
            : G
              ? Te + '{' + te(le, G) + '}'
              : Te + '{ ' + y.call(le, ', ') + ' }';
        }
        return String(t);
      };
      var B =
        Object.prototype.hasOwnProperty ||
        function (e) {
          return e in this;
        };
      function X(e, t) {
        return B.call(e, t);
      }
      function Q(e) {
        return h.call(e);
      }
      function z(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
        return -1;
      }
      function Z(e, t) {
        if (e.length > t.maxStringLength) {
          var n = e.length - t.maxStringLength,
            r = '... ' + n + ' more character' + (n > 1 ? 's' : '');
          return Z(m.call(e, 0, t.maxStringLength), t) + r;
        }
        var o = G[t.quoteStyle || 'single'];
        return ((o.lastIndex = 0), H(S.call(S.call(e, o, '\\$1'), /[\x00-\x1f]/g, q), 'single', t));
      }
      function q(e) {
        var t = e.charCodeAt(0),
          n = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[t];
        return n ? '\\' + n : '\\x' + (t < 16 ? '0' : '') + p.call(t.toString(16));
      }
      function J(e) {
        return 'Object(' + e + ')';
      }
      function $(e) {
        return e + ' { ? }';
      }
      function ee(e, t, n, r) {
        return e + ' (' + t + ') {' + (r ? te(n, r) : y.call(n, ', ')) + '}';
      }
      function te(e, t) {
        if (0 === e.length) return '';
        var n = '\n' + t.prev + t.base;
        return n + y.call(e, ',' + n) + '\n' + t.prev;
      }
      function ne(e, t) {
        var n = W(e),
          r = [];
        if (n) {
          r.length = e.length;
          for (var o = 0; o < e.length; o++) r[o] = X(e, o) ? t(e[o], e) : '';
        }
        var i,
          a = 'function' == typeof R ? R(e) : [];
        if (v) {
          i = {};
          for (var s = 0; s < a.length; s++) i['$' + a[s]] = a[s];
        }
        for (var _ in e)
          X(e, _) &&
            ((n && String(Number(_)) === _ && _ < e.length) ||
              (v && i['$' + _] instanceof Symbol) ||
              (N.call(/[^\w$]/, _)
                ? r.push(t(_, e) + ': ' + t(e[_], e))
                : r.push(_ + ': ' + t(e[_], e))));
        if ('function' == typeof R)
          for (var u = 0; u < a.length; u++)
            P.call(e, a[u]) && r.push('[' + t(a[u]) + ']: ' + t(e[a[u]], e));
        return r;
      }
    },
    302694: (e, t, n) => {
      'use strict';
      var r = n(6925);
      function o() {}
      function i() {}
      ((i.resetWarningCache = o),
        (e.exports = function () {
          function e(e, t, n, o, i, a) {
            if (a !== r) {
              var s = new Error(
                'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
              );
              throw ((s.name = 'Invariant Violation'), s);
            }
          }
          function t() {
            return e;
          }
          e.isRequired = e;
          var n = {
            array: e,
            bigint: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: i,
            resetWarningCache: o,
          };
          return ((n.PropTypes = n), n);
        }));
    },
    605556: (e, t, n) => {
      e.exports = n(302694)();
    },
    6925: (e) => {
      'use strict';
      e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    },
    932628: (e, t) => {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      function r(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != n(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != n(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == n(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.OLD_EXAM_TYPE = t.EXAM_TYPE = void 0));
      var o = (t.EXAM_TYPE = {
          OLD: 0,
          NEW: 1,
          NEW_TEST: 2,
          NEW_CLASSROOM: 3,
          NEW_HOMEWORK: 4,
          NEW_UNIT_TEST: 5,
          RETAKE_EXAM: 6,
        }),
        i = (t.OLD_EXAM_TYPE = {
          QUIZ: 1,
          HOMEWORK: 2,
          EXAM_OBJECTIVE: 3,
          EXAM_SUBJECTIVE: 4,
          POP_QUIZ: 5,
        }),
        a = {
          KEY_EXAM_TYPE: r(
            r(
              r(
                r(
                  r(r(r({}, o.NEW, '考试'), o.NEW_CLASSROOM, '练习'), o.NEW_HOMEWORK, '作业'),
                  o.NEW_UNIT_TEST,
                  '随堂测验',
                ),
                o.RETAKE_EXAM,
                '补考',
              ),
              void 0,
              '考试',
            ),
            null,
            '考试',
          ),
          KEY_HOMEWORK_SUBMIT_TITLE: '是否提交作业？',
          KEY_HOMEWORK_SUBMIT_DESC: '确认提交后，将无法修改作答；如仍需修改，请选择“保存草稿”。',
          KEY_BTN_SAVE_DRAFT: '保存草稿',
          KEY_BTN_CONFIRM_SUBMIT: '确认提交',
          KEY_OLD_EXAM_TYPE: r(
            r(
              r(r(r({}, i.QUIZ, '测验'), i.HOMEWORK, '作业'), i.EXAM_OBJECTIVE, '考试'),
              i.EXAM_SUBJECTIVE,
              '考试',
            ),
            i.POP_QUIZ,
            '随堂测验',
          ),
          KEY_COURSE_GRAPH: '课程图谱',
          KEY_COURSE_KNOWLEDGE_GRAPH: '知识图谱',
          KEY_COURSE_IDEOLOGY_GRAPH: '思政图谱',
          KEY_COURSE_QUESTION_GRAPH: '问题图谱',
          KEY_COURSE_SKILL_GRAPH: '能力图谱',
          KEY_COURSE_AI_ASSISTANT: '课程AI助教',
          KEY_CONTENT: '内容',
          COURSE_KEY_CONTENT: '课程教学内容',
          KEY_MENU_COURSE_INFO: '课程介绍页',
          KEY_TOOL: '工具',
          KEY_COURSE_DATA_MANAGEMENT: '课程数据管理',
          KEY_COURSE_STATISTICS: '课程数据统计',
          KEY_LEARN_ANALYSIS: '智课数据座舱',
          KEY_INTELLIGENT_LEARNING_CENTER: '智能学情中心',
          KEY_CHARGE_MANAGE: '交易管理',
          KEY_MOOC: '慕课堂',
          KEY_ONLINE_CLASS: '关联课堂',
          KEY_MOOC_MANAGE: '课堂管理',
          KEY_APPLICATION_STATISTICS: '应用统计',
          KEY_GUIDE: '引导',
          COURSE_PUBLISH_KEY_GUIDE: '建课引导',
          KEY_NOTICE: '公告',
          KEY_TEACH_UNIT_CONTENT_PUBLISH: '教学单元内容发布',
          KEY_TEACH_UNIT_CONTENT_PUBLISH_NEW: '教学内容单元',
          KEY_TEACH_AI_PPT: 'AI生成PPT',
          KEY_GENERATE_TEACH_OUTLINE: '课程目录',
          KEY_CUSTOM_COLUMN: '自定义栏目',
          KEY_SETTING: '设置',
          COURSE_KEY_SETTING: '课程教学设置',
          KEY_COURSE_TEAM_SETTING: '课程团队设置',
          KEY_SCORE_RULE: '评分规则',
          KEY_DISCUSS_FORUM_SETTING: '讨论区设置',
          KEY_SHARE_FORUM_SETTING: '知识共享区设置',
          KEY_SET_COMMENT_PRACTICE_QUESTION: '设置互评训练题',
          KEY_END_COURSE_SETTING: '结课设置',
          KEY_END_COURSE_ADN_COPYRIGHT_SETTING: '结课及版权设置',
          KEY_GROUP_MANAGE: '分组管理',
          KEY_CHECK_COURSE_DATA: '查看课程数据',
          KEY_STUDENT_PERFORMANCE_MANAGE: '学生成绩管理',
          KEY_COURSE_DATA_STATISTICS: '课程数据统计',
          KEY_STUDY_DATA_STATISTICS: '学习数据统计',
          KEY_STUDENT_MANAGE: '学生管理',
          KEY_IDENTIFICATION_CREDENTIALS_MANAGE: '认证证书管理',
          KEY_ROOC_IDENTIFICATION_CREDENTIALS_MANAGE: '区域认证证书管理',
          KEY_CHECK_SOURCE_COURSE_PERFORMANCE: '查看源课程成绩',
          KEY_COMMUNITY_SETTING: '社群配置',
          KEY_EXCHANGE_CLASSIC_COURSE_SETTING: '兑换精品课设置',
          KEY_CLASSIC_COURSE_RELATIVE_SETTING: '精品课课程关联设置',
          KEY_WECHAT_OFFICIAL_ACCOUNT_RELATIVE: '关联微信公众号',
          KEY_MOB_LEARN_PAGE_GUIDE: '学习页引导跳转',
          KEY_RESOURCE_DEPOSITORY: '资源库',
          COURSE_KEY_RESOURCE_DEPOSITORY: '课程资源库',
          KEY_VIDEO_DEPOSITORY: '视频库',
          KEY_DOCUMENT_DEPOSITORY: '文档库',
          KEY_COURSEWARE_DEPOSITORY: '互动课件库',
          KEY_QUESTION_DEPOSITORY: '题库',
          KEY_HELP_CENTER: '帮助中心',
          KEY_COURSE_TAG: '学校专有课程',
          KEY_START_TIME_UNKOWN: '开课时间待定',
          KEY_OPEN_COURSE: '开课',
          KEY_PREVIEW: '预览',
          KEY_COURSE_MANAGE: '课程管理',
          KEY_NAV_USING: '正在使用',
          KEY_NAV_ACCOUNT_SIGNIN: '账号登录',
          KEY_NAV_MENU_MY_LIVE_STREAM: '我的直播',
          KEY_NAV_MENU_MY_CERT: '我的认证证书',
          KEY_NAV_MENU_MY_COUPON: '我的优惠券',
          KEY_NAV_MENU_GJS_MANAGE: '高教社管理员',
          KEY_NAV_MENU_GJS_MARKET_EDITOR: '高教社运营编辑',
          KEY_NAV_MENU_GJS_COURSE_EDITOR: '高教社课程编辑',
          KEY_NAV_MENU_GJS_COURSE_CHECK: '高教社课程审核',
          KEY_NAV_MENU_SCHOOL_ADMIN_MANAGE: '高校管理后台',
          KEY_NAV_MENU_ROOC_ADMIN_MANAGE: '区域管理后台',
          KEY_NAV_MENU_WEBSITE_MANAGE: '站点管理',
          KEY_NAV_MENU_KY_SCHOOL_MANAGE: '考研高校管理后台',
          KEY_NAV_MENU_AI_MKT_MANAGE: 'AI慕课堂管理',
          KEY_NAV_MENU_MKT_MANAGE: '课堂管理',
          KEY_NAV_MENU_CLASSROOM_MANAGE: '课堂管理',
          KEY_NAV_MENU_COURSE_MANAGE: '课程管理后台',
          KEY_NAV_MENU_MAJOR_MANAGE: '智慧专业管理',
          KEY_NAV_MENU_ORDER_MANAGE: '订单管理',
          KEY_NAV_MY_ORDER: '我的订单',
          KEY_NAV_MENU_TEACHER_INDEX: '老师主页',
          KEY_NAV_MENU_SETTING: '设置',
          KEY_NAV_MENU_LOGOUT: '退出',
          KEY_PROMPT: '提示',
          KEY_COURSE_DELETE_PROMPT: '你确定删除该课时吗？',
          KEY_DELETE_SUCCESS: '删除成功',
          KEY_DELETE_FAIL: '删除失败',
          KEY_CHAPTER_PULL_GUIDE: '拖动此处，可调整章节/考试的位置了！',
          KEY_LESSON_PULL_GUIDE: '拖动此处，可调整小节/测验/作业的位置了！',
          KEY_BEGIN_BTN_GUIDE: '点击这里，可将教学单元内容顺序更新到学生学习页',
          KEY_GOT_IT: '知道了',
          KEY_EDIT_TEACHING_CONTENT: '编辑教学内容',
          KEY_FAILED: '失败',
          KEY_ADD_SUCCESS: '添加成功',
          KEY_UPDATE_SUCCESS: '更新成功',
          KEY_NAME: '名称',
          KEY_PLEASE_ENTER: '请输入',
          字: '还可以输入',
          KEY_WORDS: '字',
          KEY_SAVE: '保存',
          KEY_CANCEL: '取消',
          KEY_RELEASE_TIME: '发布时间',
          KEY_RELEASE_GUIDE: '单元测验、作业的发布时间需晚于章节内容的发布时间',
          KEY_SPREAD_OUT: '展开',
          KEY_PUT_AWAY: '收起',
          KEY_QUIZ_THIS: '该',
          KEY_QUIZ_MODIFY_GUIDE: '已发布，对其进行的修改将无法保存和发布',
          KEY_QUIZ_DELETE_GUIDE: '已发布，不能被删除',
          KEY_CONFIRM_DELETE_PROMPT: '你确定删除该',
          KEY_QUIZ_QUESTION_MARK: '吗？',
          KEY_PUBLISH_SUCCESS: '发布成功',
          KEY_PUBLISH_FAIL: '发布失败',
          KEY_ADD_SECTION: '添加小节',
          KEY_ADD_QUIZ: '添加测验',
          KEY_ADD_ASSIGNMENT: '添加作业',
          KEY_TECH_UNIT_ORDER_UPDATE_CONFIRM: '你确定将教学单元内容顺序更新到学生学习页吗？',
          KEY_TEACH_UNIT_CONTENT: '教学单元内容',
          KEY_COURSE_TEACH_CONTENT: '课程教学内容',
          KEY_COMMON_PROBLEM: '常见问题',
          KEY_TEACH_UNIT_NOTE:
            '注意：学生的课程学习页的章节顺序和此处的章节顺序保持一致，请在此调整好章节顺序！',
          KEY_UPDATE_ORDER: '更新顺序',
          KEY_CHAPTER_PREVIEW: '章节预览',
          KEY_CHAPTER_PREVIEW_CERTIFICATE: '章节预览(可预览AIGC内容)',
          KEY_ADD_CHAPTER: '添加章节',
          KEY_CHAPTER_NAME: '章节名称',
          KEY_INPUT_CHAPTER_NAME_PLACEHOLDER: '请输入章节名称',
          KEY_INPUT_TEST_NAME_PLACEHOLDER: '请输入考试名称',
          KEY_TEST_NAME: '考试名称',
          KEY_ADD_TEST: '添加考试',
          KEY_TEACH_CALENDAR: '教学日历',
          KEY_NAV_MENU_SCHOOL_HOMEPAGE: '学校主页',
          KEY_NAV_MENU_SCHOOL_CLOUD_INNER_HOMEPAGE: '学校云校内主页',
          KEY_NAV_MENU_TERM_MANAGE: '学期管理',
          KEY_NAV_MENU_KY_TERM_MANAGE: '考研学期管理',
          KEY_NAV_MENU_SCHOOL_DEPARTMENT_MANAGE: '院系管理',
          KEY_NAV_MENU_TEACHER_MANAGE: '老师管理',
          KEY_NAV_MENU_STUDENT_MANAGE: '学生管理',
          KEY_NAV_MENU_ACADEMIC_IMPORT: '导入教务数据',
          KEY_NAV_MENU_DATA_CENTER: '数据统计',
          KEY_NAV_MENU_SCHOOL_INFO: '学校信息',
          KEY_NAV_MENU_TEACHING_MANAGE: '教学管理',
          KEY_NAV_MENU_ORG_STRUCTURE: '组织架构',
          KEY_NAV_MENU_COURSE_REFER: '课程引用',
          KEY_NAV_MENU_RESOUCE_STATISTICAL: '资源包统计',
          KEY_NAV_MENU_SCHOOL_RESOURCE: '校级资源库',
          KEY_NAV_MENU_USEABLE_ONLINE_COURSE: '可用线上课程',
          KEY_NAV_MENE_COLUMN_MANAGE: '专栏管理',
          KEY_NAV_MENE_OUR_SCHOOL_RESOURCE: '本校教学资源库',
          KEY_NAV_MENE_HELP_CENTER: '帮助中心',
          KEY_NAV_MENU_CONFIRM_EDU_INFO: '教务信息确认',
          KEY_NAV_MENU_BIFROST: '职业技能课程管理',
          KEY_NAV_MENU_TEXTBOOK_MANAGE: '教材管理',
          KEY_NAV_MENU_TUTORIAL_MANAGE: '教程管理',
          KEY_NAV_MENU_ASSISTANT: 'AI助教管理',
          KEY_UPLOAD_IMG_MAXSIZE_TIP: '图片过大，不能超过',
          KEY_UPLOAD_IMG_TITLE: '编辑图片',
          KEY_UPLOAD_IMG_BUTTON_SUBMIT: '确定',
          KEY_UPLOAD_IMG_BUTTON_CANCEL: '取消',
          KEY_COLLEGE_COLLUM_SET: '列设置',
          KEY_COLLEGE_INPUT: '请输入',
          KEY_TEACHER_EXPORT_DATA: '导出数据',
          KEY_EXAM_EDIT_SUCCESS: '编辑成功',
          KEY_EXAM_PUBLISH_SUCCESS: '发布成功',
          KEY_EXAM_HAS_PUBLISH_ERR_TIP: '该考试已为发布状态，对其进行的修改将无法保存和发布',
          KEY_EXAM_PUSHLISH_NOT_DEL: '考试已经发布，不能被删除',
          KEY_EXAM_CONFIRM_DELETE_EXAM: '你确定删除该考试吗？',
          KEY_EXAM_EDIT_EAXM_CONTENT: '编辑考试内容',
          KEY_EXAM_A_PAPER: 'A卷',
          KEY_EXAM_B_PAPER: 'B卷',
          KEY_EXAM_B_PAPER_RELATION: '关联：{name}（A卷）',
          KEY_PUBLISH: '发布',
          KEY_PUBLISH_STATUS_UNPUBLISH: '未发布',
          KEY_PUBLISH_STATUS_MODIFY: '有修改',
          KEY_PUBLISH_STATUS_DELETED: '已删除',
          KEY_PUBLISH_TIME_SET: '请设置发布时间',
          KEY_PUBLISH_RELEASE_AT: '已于',
          KEY_PUBLISH_STATUS_PUBLISHED: '发布',
          KEY_VALID_INDEFINITELY: '长期有效',
          KEY_PUBLISH_TIME: '发布时间',
          KEY_PUBLISH_WEEKDAYS: '周日_周一_周二_周三_周四_周五_周六',
          KEY_DELETE_TIPS: '删除章节会同时删除其所包含的课时，你确定删除该章节吗？',
          KEY_CONTENT_IS_ADD: '内容为空，请先添加内容',
          KEY_NOT_ALLOW_DRAG_TO_DELETE: '不允许拖入到已删除的章节',
          KEY_EXAM_CAN_NOT_DRAG_SON: '考试不能拖入子节点呦~请在同级进行移动',
          KEY_CHAPTER_NOT_DRAG_SON: '章节不能拖入子节点呦~请在同级进行移动',
          KEY_ONLY_CHAPTER_NOT_ATHOR:
            '小节只能拖入到章节中呦~不允许拖入到考试、测验、作业和其他小节内',
          KEY_ONLY_CHAPTER_NOT_EXAM:
            '测验只能拖入到章节中呦~不允许拖入到考试、小节、作业和其他测验内',
          KEY_ONLY_HOMEWORK_DRAG_CHAPTER:
            '作业只能拖入到章节中呦~不允许拖入到考试、测验、小节和其他作业内',
          KEY_TYPE_VIDEO: '视频',
          KEY_TYPE_SUBTITLE: '字幕',
          KEY_TYPE_DOCUMENT: '文档',
          KEY_TYPE_RICH_TEXT: '富文本',
          KEY_TYPE_QUIZ: '测验',
          KEY_TYPE_DISCUSSION: '讨论',
          KEY_TYPE_LIVE_STREAM: '直播',
          KEY_TYPE_IMG_TEXT: '图文',
          KEY_TYPE_LINK_LIVE_STREAM: '关联直播',
          KEY_TYPE_MUSIC_VIDEO: '音乐视频',
          KEY_TYPE_MUSIC_EXECISE: '音乐练习',
          KEY_TYPE_SECTION: '小节',
          KEY_TYPE_HOMEWORK: '作业',
          KEY_TEACHUNIT_EDIT_PRE: '编辑',
          KEY_TEACHUNITEDIT_CONTENT_AFTER: '内容',
          KEY_TEACHUNIT_ADD_PRE: '添加',
          KEY_TOUXINAG: '头像',
          KEY_PLEASE_UPLOAD_TOUXIANG: '请上传头像',
          KEY_UPLOAD_TOUXIANG: '上传头像',
          KEY_NICKNAME: '昵称',
          KEY_PLEASE_INPUT_NIKENAME: '请输入昵称',
          KEY_ONLY_INCLUDE_ALL: '只能包含汉字，字母，数字，下划线或连接号“-”',
          KEY_NICKNAME_NOT_MORE_THAN: '昵称不能超过36个字符',
          KEY_NICKNAME_NOT_ALLOWED: '此昵称非法',
          KEY_NICKNAME_TOO_MOTE_CHANGE: '这个昵称太抢手了，换一个吧',
          KEY_NICKNAME_NOT_EMPTY: '昵称不能为空',
          KEY_USER_ACCOUNT: '用户账号',
          KEY_REAL_NAME: '真实姓名',
          KEY_PLEASE_INPUT_REAL_NAME: '请输入真实姓名',
          KEY_GONGHAO: '工号',
          KEY_INPUT_GONGHAO: '请输入工号',
          KEY_FROM_PART: '所属院系',
          KEY_PLEASE_CHOOSE_FROM_PART: '请选择所属院系',
          KEY_PLEASE_CHOOSE_PART: '请选择院系',
          KEY_SEX: '性别',
          KEY_BOY: '男',
          KEY_GIRL: '女',
          KEY_ATHOR: '其他',
          KEY_BIRTHDAY: '生日',
          KEY_ID_CARD: '身份证',
          KEY_PLEASE_INPUT_ID_CARD: '请输入身份证号',
          KEY_ID_CARD_LENGTH_NOT_RIGHT: '身份证号长度不正确',
          KEY_TEL: '手机号码',
          KEY_PLEASE_INPUT_RIGHT_TEL: '请输入正确的手机号',
          KEY_SCHOOL: '学校',
          KEY_ZHIHCHENG: '职称',
          KEY_PLEASE_INPUT_ZHICHENG: '请输入职称',
          KEY_GEREN_QIANMING: '个人签名',
          KEY_UPLOAD_QIANMING: '上传签名',
          KEY_PERSONAL_INTRO: '个人简介',
          KEY_PLEASE_INPUT_PERSONAL_INTRO: '请输入个人简介',
          KEY_TOTAL_SCORE_UNIT_TEST: '单元测验',
          KEY_TOTAL_SCORE_UNIT_TEST_HOMEWORK: '单元作业',
          KEY_TOTAL_SCORE_EXAM: '考试',
          KEY_TOTAL_SCORE_NEW_EXAM: '新版考试',
          KEY_TOTAL_SCORE_COURSE_DISCUSSION: '课程讨论',
          KEY_TOTAL_SCORE_OUT_DISTRICT_SCORE: '域外成绩',
          KEY_TOTAL_SCORE_VIDEO_COMPLETE_PERCENT: '视频学习完成度',
          KEY_TOTAL_SCORE_GRADE_MANAGE_FREEZE:
            '与学生成绩相关的评分规则、学生成绩管理、查看课程数据、学期计分等设置已被冻结！',
          KEY_CONFIRM: '确认',
          KEY_TOTAL_SCORE_SCORE: '成绩',
          KEY_TOTAL_SCORE_CERT: '证书',
          KEY_TOTAL_SCORE_SELECT_PART_PERCENT_TIP: '勾选模块的百分比总和必须是100%',
          KEY_TOTAL_SCORE_CERT_SCORE_SET_ERROR: '优秀证书分值设置错误',
          KEY_SAVE_ERROR: '保存失败！',
          KEY_SAVE_SUCCESS: '保存成功！',
          KEY_TOTAL_SCORE_JOIN_SCORE_TYPE: '参与计分类型',
          KEY_TOTAL_SCORE_SET_JFWD: '设置积分维度',
          KEY_TOTAL_SCORE_ACTIVE_TIP: '活跃度：请输入获取满分用户需要在“课堂讨论”中回复的数量',
          KEY_TOTAL_SCORE_VIDEO_LEARN_TIME_TIP: '视频学习时长： 学习时长占总视频时长的百分比',
          KEY_TOTAL_SCORE_CONTENT_QUALITY_TIP:
            '内容质量：请输入获取满分用户需要在“课堂讨论”中回复内容被赞的数量',
          KEY_TOTAL_SCORE_LEAR_COUSE_NUM_TIP: '学习课件个数： 学习视频个数占视频总个数的百分比',
          KEY_TOTAL_SCORE_TOTAL_SCORE_PERCENT: '总分占比(%)',
          KEY_TOTAL_SCORE_TOTAL_SCORE_SET: '总分设置',
          KEY_TOTAL_SCORE_SET: '设置',
          KEY_TOTAL_SCORE_SET_AFTER: '设置',
          KEY_TOTAL_SCORE_ONLY_COUSE_MANAGE_CAN: '仅课程负责人可以进行',
          KEY_TOTAL_SCORE_CERT_TIP:
            '为了保障证书权威性，平台不再支持免费电子证书，只提供证书认证。如有必要，老师可以通过公告或其他方式告知需要证书的同学，申请认证证书。',
          KEY_TOTAL_SCORE_ONLY_HG: '仅有合格',
          KEY_TOTAL_SCORE_HG: '合格',
          KEY_TOTAL_SCORE_REQURE: '要求',
          KEY_TOTAL_SCORE_GET_SCORE: '得分',
          KEY_TOTAL_SCORE_INPUT_NUMBER: '请输入阿拉伯数字',
          KEY_TOTAL_SCORE_HAVE_HG: '有合格',
          KEY_TOTAL_SCORE_HAVE_EXCELLENT: '还有优秀',
          KEY_TOTAL_SCORE_EXCELLENT: '优秀',
          KEY_TOTAL_SCORE_SAVE_AND_PUBLISH: '保存并发布',
          KEY_MOBILE_MG_TITLE: '搜索&导出数据即将下线',
          KEY_MOBILE_MG_TITLE_TIP:
            '根据国家法律有关个人信息保护和数据安全的规定，从2021年秋季学期开始，平台将对学生信息进行脱敏处理，请知悉。',
          KEY_LOGIN_WELCOME: '欢迎',
          KEY_LOGIN_BTN_TXT: '使用Google登录',
          KEY_FOOTER_DESC:
            '我们为所有学习者提供参加知名高等教育机构提供的课程的机会，并在成功完成后获得证书。',
          KEY_SEARCH_NO_RESULT: '暂无搜索或筛选结果',
          KEY_TEACHER_EVALUATE: '老师评分',
          KEY_SUBMIT_SUCCESS: '提交成功',
          KEY_SUBJECTIVE_QUESTION: '主观题',
          KEY_SINGLE_SCORE: '分',
          KEY_STUDENT_ANSWER: '学生回答',
          KEY_DOWNLOAD_ATTACHMENTS: '下载附件',
          KEY_SCORE_POINTS: '得分点',
          KEY_FULL_SCORE: '满分',
          KEY_TARGET_SCORE: '该题目得分',
          KEY_INPUT_TIP_FRONT: '请输入0到',
          KEY_INPUT_TIP_TAIL: '的阿拉伯数字，最多保留1位小数',
          KEY_TEACHER_COMMENTS: '老师评价',
          KEY_TEACHER_COMMENTS_TIP: '请对该学生的答案以及得分做出整体评价',
          KEY_TEACHER_COMMENTS_PLACEHOLDER: '请输入评价',
          KEY_TOTAL_SCORE: '总得分',
          KEY_TOTAL_SCORE_AUTO_TIP: '该分数无需填写由系统自动生成',
          KEY_SUBMIT_BUTTON_TEXT: '提交',
          KEY_CANCEL_BUTTON_TEXT: '返回',
          KEY_ANSWER_USER: '答题用户',
          KEY_PRE_PAPER_TEXT: '上一份',
          KEY_NEXT_PAPER_TEXT: '下一份',
          KEY_PAPER_CONFIRM_LEAVE: '存在未提交的修改内容，切换答卷后将丢失，是否直接切换？  ',
          KEY_LEARN_SYNC_SOURCE: '同步于源课程：',
          KEY_LEARN_LEARNING_PAGE:
            '该学习页将完全采用同步课程的栏目结构和内容，同时开课老师会在这些栏目下增加更多内容。',
          KEY_SCHOOL_CLOUD: '学校云',
          KEY_BUILD_ONLINE: '建设你的专属在线教育平台',
        };
      t.default = a;
    },
    248372: (e, t) => {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      function r(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != n(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != n(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == n(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.OLD_EXAM_TYPE = t.EXAM_TYPE = void 0));
      var o = (t.EXAM_TYPE = { OLD: 0, NEW: 1, NEW_TEST: 2, NEW_CLASSROOM: 3, NEW_HOMEWORK: 4 }),
        i = (t.OLD_EXAM_TYPE = {
          QUIZ: 1,
          HOMEWORK: 2,
          EXAM_OBJECTIVE: 3,
          EXAM_SUBJECTIVE: 4,
          POP_QUIZ: 5,
        }),
        a = {
          KEY_EXAM_TYPE: r(
            r(
              r(
                r(r(r({}, o.NEW, '考试'), o.NEW_CLASSROOM, '练习'), o.NEW_HOMEWORK, 'Assignment'),
                o.NEW_UNIT_TEST,
                'Quiz',
              ),
              void 0,
              '考试',
            ),
            null,
            '考试',
          ),
          KEY_HOMEWORK_SUBMIT_TITLE: 'Submit assignment?',
          KEY_HOMEWORK_SUBMIT_DESC:
            'Your answers cannot be modified once submitted. If you need to modify them, please choose "Save Draft".',
          KEY_BTN_SAVE_DRAFT: 'Save Draft',
          KEY_BTN_CONFIRM_SUBMIT: 'Confirm Submit',
          KEY_OLD_EXAM_TYPE: r(
            r(
              r(r(r({}, i.QUIZ, '测验'), i.HOMEWORK, '作业'), i.EXAM_OBJECTIVE, '考试'),
              i.EXAM_SUBJECTIVE,
              '考试',
            ),
            i.POP_QUIZ,
            '随堂测验',
          ),
          KEY_COURSE_KNOWLEDGE_GRAPH: 'Course knowledge graph',
          KEY_COURSE_IDEOLOGY_GRAPH: 'Ideological and political education graph',
          KEY_COURSE_AI_ASSISTANT: 'Course AI Assistant',
          KEY_CONTENT: 'Content',
          COURSE_KEY_CONTENT: 'Course Content',
          KEY_MENU_COURSE_INFO: 'Course introduction page',
          KEY_TOOL: 'Tool',
          KEY_COURSE_STATISTICS: 'Course data statistics',
          KEY_LEARN_ANALYSIS: 'Learn analysis',
          KEY_INTELLIGENT_LEARNING_CENTER: 'AI learning analysis',
          KEY_CHARGE_MANAGE: 'Transaction Management',
          KEY_MOOC: 'MOOC',
          KEY_ONLINE_CLASS: 'Online Class',
          KEY_MOOC_MANAGE: 'MOOC Management',
          KEY_APPLICATION_STATISTICS: 'Applied Statistics',
          KEY_GUIDE: 'Guide',
          COURSE_PUBLISH_KEY_GUIDE: 'Course publish guide',
          KEY_NOTICE: 'Announcement',
          KEY_TEACH_UNIT_CONTENT_PUBLISH: 'Teaching unit content release',
          KEY_TEACH_UNIT_CONTENT_PUBLISH_NEW: 'Teaching unit content release',
          KEY_TEACH_AI_PPT: 'Intelligent generation PPT',
          KEY_GENERATE_TEACH_OUTLINE: 'Intelligently generated syllabus',
          KEY_CUSTOM_COLUMN: 'Custom column',
          KEY_SETTING: 'Settings',
          COURSE_KEY_SETTING: 'Course settings',
          KEY_COURSE_TEAM_SETTING: 'Course team setting',
          KEY_SCORE_RULE: 'Rating Rules',
          KEY_DISCUSS_FORUM_SETTING: 'Discussion forum settings',
          KEY_SHARE_FORUM_SETTING: 'Share forum settings',
          KEY_SET_COMMENT_PRACTICE_QUESTION: 'Set up mutual evaluation training questions',
          KEY_END_COURSE_SETTING: 'End of class setting',
          KEY_END_COURSE_ADN_COPYRIGHT_SETTING: 'End class and copyright setting',
          KEY_GROUP_MANAGE: 'Group management',
          KEY_CHECK_COURSE_DATA: 'View course data',
          KEY_STUDENT_PERFORMANCE_MANAGE: 'Student performance management',
          KEY_COURSE_DATA_STATISTICS: 'Course data statistics',
          KEY_STUDY_DATA_STATISTICS: 'Learning data statistics',
          KEY_STUDENT_MANAGE: 'Student Management',
          KEY_IDENTIFICATION_CREDENTIALS_MANAGE: 'Certificate Management',
          KEY_ROOC_IDENTIFICATION_CREDENTIALS_MANAGE: 'Rooc Certificate Management',
          KEY_CHECK_SOURCE_COURSE_PERFORMANCE: 'View source course grades',
          KEY_COMMUNITY_SETTING: 'Community Configuration',
          KEY_NAV_MENU_ROOC_ADMIN_MANAGE: 'Regional Management',
          KEY_EXCHANGE_CLASSIC_COURSE_SETTING: 'Redeem icourse setting',
          KEY_CLASSIC_COURSE_RELATIVE_SETTING: 'icourse related settings',
          KEY_WECHAT_OFFICIAL_ACCOUNT_RELATIVE: 'Add WeChat Official Account',
          KEY_MOB_LEARN_PAGE_GUIDE: 'Learn Page Guide',
          KEY_RESOURCE_DEPOSITORY: 'Resource Library',
          COURSE_KEY_RESOURCE_DEPOSITORY: 'Course Resource Library',
          KEY_VIDEO_DEPOSITORY: 'Video Library',
          KEY_DOCUMENT_DEPOSITORY: 'Document Library',
          KEY_COURSEWARE_DEPOSITORY: 'Courseware Library',
          KEY_QUESTION_DEPOSITORY: 'Question Bank',
          KEY_HELP_CENTER: 'Help center',
          KEY_COURSE_TAG: 'school-specific courses',
          KEY_START_TIME_UNKOWN: 'UNKNOW TIME',
          KEY_OPEN_COURSE: 'START',
          KEY_PREVIEW: 'Preview',
          KEY_COURSE_MANAGE: 'Course management',
          KEY_NAV_USING: 'Signed in using',
          KEY_NAV_ACCOUNT_SIGNIN: 'account',
          KEY_NAV_MENU_MY_LIVE_STREAM: 'My live stream',
          KEY_NAV_MENU_MY_CERT: 'My certificate',
          KEY_NAV_MENU_MY_COUPON: 'My coupon',
          KEY_NAV_MENU_GJS_MANAGE: 'Higher Education Press Administrator',
          KEY_NAV_MENU_GJS_MARKET_EDITOR: 'Higher Education Press operation editor',
          KEY_NAV_MENU_GJS_COURSE_EDITOR: 'Higher Education Press course editor',
          KEY_NAV_MENU_GJS_COURSE_CHECK: 'Higher Education Press course audit',
          KEY_NAV_MENU_SCHOOL_ADMIN_MANAGE: 'School Management',
          KEY_NAV_MENU_WEBSITE_MANAGE: 'Site management',
          KEY_NAV_MENU_KY_SCHOOL_MANAGE: 'Postgraduate college management background',
          KEY_NAV_MENU_MKT_MANAGE: 'MOOC classroom management',
          KEY_NAV_MENU_CLASSROOM_MANAGE: 'classroom management',
          KEY_NAV_MENU_AI_MKT_MANAGE: 'AI MOOC Manage',
          KEY_NAV_MENU_COURSE_MANAGE: 'Course management',
          KEY_NAV_MENU_ORDER_MANAGE: 'Order management',
          KEY_NAV_MY_ORDER: 'MY order',
          KEY_NAV_MENU_TEACHER_INDEX: 'Teacher homepage',
          KEY_NAV_MENU_SETTING: 'Settings',
          KEY_NAV_MENU_LOGOUT: 'Quit',
          KEY_PROMPT: 'prompt',
          KEY_COURSE_DELETE_PROMPT: 'Are you sure you want to delete this course?',
          KEY_DELETE_SUCCESS: 'Deleted successfully',
          KEY_DELETE_FAIL: 'failed to delete',
          KEY_CHAPTER_PULL_GUIDE: 'Drag here to adjust the position of the chapter/exam now!',
          KEY_LESSON_PULL_GUIDE:
            'Drag here to adjust the position of the vignette/quiz/assignment now!',
          KEY_BEGIN_BTN_GUIDE:
            'Click here to update the content sequence of the teaching units to the student learning page',
          KEY_GOT_IT: 'Got it',
          KEY_EDIT_TEACHING_CONTENT: 'Edit teaching content',
          KEY_FAILED: 'Failed',
          KEY_ADD_SUCCESS: 'Added successfully',
          KEY_UPDATE_SUCCESS: 'Updated success',
          KEY_NAME: ' name',
          KEY_PLEASE_ENTER: 'Please enter ',
          KEY_STILL_CAN_ENTER: 'You can still enter ',
          KEY_WORDS: ' words',
          KEY_SAVE: 'save',
          KEY_CANCEL: 'cancel',
          KEY_RELEASE_TIME: 'release time',
          KEY_RELEASE_GUIDE:
            'Module quizzes and assignments need to be posted later than the chapter content',
          KEY_SPREAD_OUT: 'Expand',
          KEY_PUT_AWAY: 'Put away',
          KEY_QUIZ_THIS: 'This',
          KEY_QUIZ_MODIFY_GUIDE: 'Published, changes made to it will not be saved and published',
          KEY_QUIZ_DELETE_GUIDE: 'Posted, cannot be deleted',
          KEY_CONFIRM_DELETE_PROMPT: 'Are you sure you want to delete this ',
          KEY_QUIZ_QUESTION_MARK: '？',
          KEY_PUBLISH_SUCCESS: 'Released successfully',
          KEY_PUBLISH_FAIL: 'Released failed',
          KEY_ADD_SECTION: 'Add section',
          KEY_ADD_QUIZ: 'Add quiz',
          KEY_ADD_ASSIGNMENT: 'Add assignment',
          KEY_TECH_UNIT_ORDER_UPDATE_CONFIRM:
            'Are you sure about updating the content sequence of the teaching units to the student learning pages?',
          KEY_TEACH_UNIT_CONTENT: 'Teaching unit content',
          KEY_COURSE_TEACH_CONTENT: 'Course teaching content',
          KEY_COMMON_PROBLEM: 'common problem',
          KEY_TEACH_UNIT_NOTE:
            "Note: The order of chapters on the study page of the student's course is consistent with the order of chapters here. Please adjust the order of chapters here!",
          KEY_UPDATE_ORDER: 'Update order',
          KEY_CHAPTER_PREVIEW: 'Chapter preview',
          KEY_CHAPTER_PREVIEW_CERTIFICATE: 'Chapter preview',
          KEY_ADD_CHAPTER: 'Add chapter',
          KEY_CHAPTER_NAME: 'chapter name',
          KEY_INPUT_CHAPTER_NAME_PLACEHOLDER: 'Please enter chapter name',
          KEY_INPUT_TEST_NAME_PLACEHOLDER: 'Please enter test name',
          KEY_TEST_NAME: 'test name',
          KEY_ADD_TEST: 'Add test',
          KEY_NAV_MENU_SCHOOL_HOMEPAGE: 'School homepage',
          KEY_NAV_MENU_SCHOOL_CLOUD_INNER_HOMEPAGE: 'School cloud intranet homepage',
          KEY_NAV_MENU_TERM_MANAGE: 'Semester management',
          KEY_NAV_MENU_KY_TERM_MANAGE: 'Postgraduate semester management',
          KEY_NAV_MENU_SCHOOL_DEPARTMENT_MANAGE: 'Department management',
          KEY_NAV_MENU_TEACHER_MANAGE: 'Teacher management',
          KEY_NAV_MENU_STUDENT_MANAGE: 'Student management',
          KEY_NAV_MENU_ACADEMIC_IMPORT: 'Academic Import',
          KEY_NAV_MENU_DATA_CENTER: 'Data analysis',
          KEY_NAV_MENU_SCHOOL_INFO: 'School information',
          KEY_NAV_MENU_TEACHING_MANAGE: 'Teaching management',
          KEY_NAV_MENU_ORG_STRUCTURE: 'Organizational structure',
          KEY_NAV_MENU_COURSE_REFER: 'Course reference',
          KEY_NAV_MENU_RESOUCE_STATISTICAL: 'Resource pack statistics',
          KEY_NAV_MENU_SCHOOL_RESOURCE: 'School-level resource library',
          KEY_NAV_MENU_USEABLE_ONLINE_COURSE: 'Available online courses',
          KEY_NAV_MENE_COLUMN_MANAGE: 'Column management',
          KEY_NAV_MENE_OUR_SCHOOL_RESOURCE: "The school's teaching resource library",
          KEY_NAV_MENE_HELP_CENTER: 'Help center',
          KEY_NAV_MENU_BIFROST: 'Vocational skills course management',
          KEY_NAV_MENU_TEXTBOOK_MANAGE: 'Textbook Management',
          KEY_NAV_MENU_ASSISTANT: 'AI teaching assistant management',
          KEY_UPLOAD_IMG_MAXSIZE_TIP: 'Picture is too large, no more than',
          KEY_UPLOAD_IMG_TITLE: 'Edit image',
          KEY_UPLOAD_IMG_BUTTON_SUBMIT: 'ok',
          KEY_UPLOAD_IMG_BUTTON_CANCEL: 'cancel',
          KEY_COLLEGE_COLLUM_SET: 'Customize columns',
          KEY_COLLEGE_INPUT: 'Please enter',
          KEY_TEACHER_EXPORT_DATA: 'Export data',
          KEY_EXAM_EDIT_SUCCESS: 'Editorial success',
          KEY_EXAM_PUBLISH_SUCCESS: 'Released successfully.',
          KEY_EXAM_HAS_PUBLISH_ERR_TIP:
            'The exam is already published and any changes made to it will not be saved and published',
          KEY_EXAM_PUSHLISH_NOT_DEL: 'Exam has been posted and cannot be removed',
          KEY_EXAM_CONFIRM_DELETE_EXAM: 'Are you sure you want to delete the test?',
          KEY_EXAM_EDIT_EAXM_CONTENT: 'Editing exam content',
          KEY_EXAM_A_PAPER: 'Paper A',
          KEY_EXAM_B_PAPER: 'Paper B',
          KEY_EXAM_B_PAPER_RELATION: 'Linked to: {name} (Paper A)',
          KEY_PUBLISH: 'released',
          KEY_PUBLISH_STATUS_UNPUBLISH: 'Not yet released',
          KEY_PUBLISH_STATUS_MODIFY: 'With modifications',
          KEY_PUBLISH_STATUS_DELETED: 'deleted',
          KEY_PUBLISH_TIME_SET: 'Please set a release time',
          KEY_PUBLISH_RELEASE_AT: 'released at',
          KEY_PUBLISH_STATUS_PUBLISHED: '',
          KEY_VALID_INDEFINITELY: 'Valid indefinitely',
          KEY_PUBLISH_TIME: 'Release Date',
          KEY_PUBLISH_WEEKDAYS: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday',
          KEY_DELETE_TIPS:
            'Deleting a section will also delete the hours it contains, are you sure you want to delete the section?',
          KEY_CONTENT_IS_ADD: 'Content is empty,please add content first',
          KEY_NOT_ALLOW_DRAG_TO_DELETE: 'Do not allow dragging in deleted sections',
          KEY_EXAM_CAN_NOT_DRAG_SON:
            'Exam cannot be dragged into a child node~ please move at the same level',
          KEY_CHAPTER_NOT_DRAG_SON:
            'Chapters cannot be dragged into child nodes~ please move at the same level',
          KEY_ONLY_CHAPTER_NOT_ATHOR:
            'Sections can only be dragged into chapters~ not into exams, quizzes, assignments or other sections',
          KEY_ONLY_CHAPTER_NOT_EXAM:
            'Quizzes can only be dragged into chapters~ not into exams, sections, assignments or other quizzes',
          KEY_ONLY_HOMEWORK_DRAG_CHAPTER:
            'Assignments can only be dragged into chapters~ not into exams, quizzes, sections or other assignments',
          KEY_TYPE_VIDEO: 'Video',
          KEY_TYPE_SUBTITLE: 'Subtitle',
          KEY_TYPE_DOCUMENT: 'Document',
          KEY_TYPE_RICH_TEXT: 'Rich text',
          KEY_TYPE_QUIZ: 'Quiz',
          KEY_TYPE_DISCUSSION: 'Discussion',
          KEY_TYPE_LIVE_STREAM: 'Live stream',
          KEY_TYPE_IMG_TEXT: 'Graphic',
          KEY_TYPE_LINK_LIVE_STREAM: 'Link live',
          KEY_TYPE_MUSIC_VIDEO: 'Music video',
          KEY_TYPE_MUSIC_EXECISE: 'Music practice',
          KEY_TYPE_SECTION: 'Subsection',
          KEY_TYPE_HOMEWORK: 'Homework',
          KEY_TEACHUNIT_EDIT_PRE: 'Edit ',
          KEY_TEACHUNITEDIT_CONTENT_AFTER: ' Content',
          KEY_TEACHUNIT_ADD_PRE: 'Add ',
          KEY_TOUXINAG: 'Avatar',
          KEY_PLEASE_UPLOAD_TOUXIANG: 'Please upload an avatar',
          KEY_UPLOAD_TOUXIANG: 'Upload avatar',
          KEY_NICKNAME: 'Nickname',
          KEY_PLEASE_INPUT_NIKENAME: 'Please enter a nickname',
          KEY_ONLY_INCLUDE_ALL:
            'Can only contain Chinese characters, letters, numbers, underscores or the hyphen "-"',
          KEY_NICKNAME_NOT_MORE_THAN: 'Nickname cannot exceed 36 characters',
          KEY_NICKNAME_NOT_ALLOWED: 'This nickname is illegal',
          KEY_NICKNAME_TOO_MOTE_CHANGE: 'This nickname is too sought after, change it',
          KEY_NICKNAME_NOT_EMPTY: 'Nickname cannot be empty',
          KEY_USER_ACCOUNT: 'User Account',
          KEY_REAL_NAME: 'Actual Name',
          KEY_PLEASE_INPUT_REAL_NAME: 'Please enter your real name,',
          KEY_GONGHAO: 'Work ID',
          KEY_INPUT_GONGHAO: 'Please enter the work ID',
          KEY_FROM_PART: 'Affiliated Department',
          KEY_PLEASE_CHOOSE_FROM_PART: 'Please select the department',
          KEY_PLEASE_CHOOSE_PART: 'Please select a department',
          KEY_SEX: 'Gender',
          KEY_BOY: 'Male',
          KEY_GIRL: 'Female',
          KEY_ATHOR: 'Other',
          KEY_BIRTHDAY: 'Birthday',
          KEY_ID_CARD: 'ID Number',
          KEY_PLEASE_INPUT_ID_CARD: 'Please enter your ID number',
          KEY_ID_CARD_LENGTH_NOT_RIGHT: 'Incorrect length of ID number',
          KEY_TEL: 'Mobile Number',
          KEY_PLEASE_INPUT_RIGHT_TEL: 'Please enter the correct mobile phone number',
          KEY_SCHOOL: 'School',
          KEY_ZHIHCHENG: 'Title',
          KEY_PLEASE_INPUT_ZHICHENG: 'Please enter a title',
          KEY_GEREN_QIANMING: 'Personal Signature',
          KEY_UPLOAD_QIANMING: 'Upload signature',
          KEY_PERSONAL_INTRO: 'Personal Profile',
          KEY_PLEASE_INPUT_PERSONAL_INTRO: 'Please enter a personal profile',
          KEY_TOTAL_SCORE_UNIT_TEST: 'Unit test',
          KEY_TOTAL_SCORE_UNIT_TEST_HOMEWORK: 'Unit job',
          KEY_TOTAL_SCORE_EXAM: 'Exam',
          KEY_TOTAL_SCORE_NEW_EXAM: 'New exam',
          KEY_TOTAL_SCORE_COURSE_DISCUSSION: 'Course discussion',
          KEY_TOTAL_SCORE_OUT_DISTRICT_SCORE: 'Out-of-territories',
          KEY_TOTAL_SCORE_VIDEO_COMPLETE_PERCENT: 'Video learning completion',
          KEY_TOTAL_SCORE_GRADE_MANAGE_FREEZE:
            'The grading rules related to student performance, student performance management, viewing course data, semester scoring and other settings have been frozen!',
          KEY_CONFIRM: 'Confirm',
          KEY_TOTAL_SCORE_SCORE: 'Grade',
          KEY_TOTAL_SCORE_CERT: 'Certification',
          KEY_TOTAL_SCORE_SELECT_PART_PERCENT_TIP:
            'The sum of the percentages of checked modules must be 100%',
          KEY_TOTAL_SCORE_CERT_SCORE_SET_ERROR:
            'The score of the excellent certificate is set incorrectly',
          KEY_SAVE_ERROR: 'Saved successfully!',
          KEY_SAVE_SUCCESS: 'Save failed!',
          KEY_TOTAL_SCORE_JOIN_SCORE_TYPE: 'Participation in scoring type',
          KEY_TOTAL_SCORE_SET_JFWD: 'Set the integral dimension',
          KEY_TOTAL_SCORE_ACTIVE_TIP:
            "Activity: Please enter the required number of replies in the 'class discussion' to obtain full marks.",
          KEY_TOTAL_SCORE_VIDEO_LEARN_TIME_TIP:
            'Video learning time: the percentage of learning time to the total video time.',
          KEY_TOTAL_SCORE_CONTENT_QUALITY_TIP:
            "Content quality: Please enter the required number of likes for replies in the 'class discussion' to obtain full marks.",
          KEY_TOTAL_SCORE_LEAR_COUSE_NUM_TIP:
            '学习课件个数： Number of learning courseware: the percentage of the number of learning videos to the total number of videos.',
          KEY_TOTAL_SCORE_TOTAL_SCORE_PERCENT: 'Percentage of total score(%)',
          KEY_TOTAL_SCORE_TOTAL_SCORE_SET: 'Total score setting',
          KEY_TOTAL_SCORE_SET: ' settings',
          KEY_TOTAL_SCORE_SET_AFTER: '',
          KEY_TOTAL_SCORE_ONLY_COUSE_MANAGE_CAN:
            'Only the person in charge of the course can set the ',
          KEY_TOTAL_SCORE_CERT_TIP:
            'In order to ensure the authority of the certificate, the platform no longer supports free e-certificates. Currently, your course does not have a certification certificate, so there is no need to fill in the certificate requirements.',
          KEY_TOTAL_SCORE_ONLY_HG: 'Only qualified ',
          KEY_TOTAL_SCORE_HG: 'Qualification ',
          KEY_TOTAL_SCORE_REQURE: ' requirements',
          KEY_TOTAL_SCORE_GET_SCORE: 'score',
          KEY_TOTAL_SCORE_INPUT_NUMBER: 'Please enter Arabic numerals',
          KEY_TOTAL_SCORE_HAVE_HG: 'Have qualified ',
          KEY_TOTAL_SCORE_HAVE_EXCELLENT: 'and excellent ',
          KEY_TOTAL_SCORE_EXCELLENT: 'Excellent ',
          KEY_TOTAL_SCORE_SAVE_AND_PUBLISH: 'Save and Publish',
          KEY_MOBILE_MG_TITLE: 'Search & export data will be offline soon',
          KEY_MOBILE_MG_TITLE_TIP:
            'According to national laws on personal information protection and data security, starting from the fall semester of 2021, the platform will desensitize student information, please be aware.',
          KEY_LOGIN_WELCOME: 'Welcome',
          KEY_LOGIN_BTN_TXT: 'Sign In with Google',
          KEY_FOOTER_DESC:
            'We provide the opportunity for all learners to take courses offered by renowned higher education institutions , with certificate upon successful completion.',
          KEY_SEARCH_NO_RESULT: 'No search or filter results yet',
          KEY_TEACHER_EVALUATE: 'Teacher Rating',
          KEY_SUBMIT_SUCCESS: 'Submitted successfully',
          KEY_SUBJECTIVE_QUESTION: 'Subjective question',
          KEY_SINGLE_SCORE: 'cent',
          KEY_STUDENT_ANSWER: 'Student answer',
          KEY_DOWNLOAD_ATTACHMENTS: 'Download attachments',
          KEY_SCORE_POINTS: 'Score points',
          KEY_FULL_SCORE: 'Full marks',
          KEY_TARGET_SCORE: 'Score for this question',
          KEY_INPUT_TIP_FRONT: 'Please enter Arabic numerals from 0 to',
          KEY_INPUT_TIP_TAIL: ', with a maximum of 1 decimal place',
          KEY_TEACHER_COMMENTS: 'Teacher comment',
          KEY_TEACHER_COMMENTS_TIP:
            "Please give an overall evaluation of the student's answer and score",
          KEY_TEACHER_COMMENTS_PLACEHOLDER: 'Please enter a review',
          KEY_TOTAL_SCORE: 'Total Score',
          KEY_TOTAL_SCORE_AUTO_TIP:
            'The score does not need to be filled in and is automatically generated by the system',
          KEY_SUBMIT_BUTTON_TEXT: 'Submit',
          KEY_CANCEL_BUTTON_TEXT: 'Return',
          KEY_ANSWER_USER: 'Student Info',
          KEY_PRE_PAPER_TEXT: 'Previous',
          KEY_NEXT_PAPER_TEXT: 'Next',
          KEY_PAPER_CONFIRM_LEAVE:
            'There are unsubmitted changes that will be lost after switching the answer sheet. Do you want to switch directly?  ',
          KEY_LEARN_SYNC_SOURCE: 'Sync with source course: ',
          KEY_LEARN_LEARNING_PAGE:
            'The learning page will fully follow the structure and content of the synchronized course',
          KEY_SCHOOL_CLOUD: 'Cloud School',
          KEY_BUILD_ONLINE: 'Build your own online education platform',
        };
      t.default = a;
    },
    430826: (e, t) => {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      function r(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != n(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != n(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == n(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.OLD_EXAM_TYPE = t.EXAM_TYPE = void 0));
      var o = (t.EXAM_TYPE = { OLD: 0, NEW: 1, NEW_TEST: 2, NEW_CLASSROOM: 3, NEW_HOMEWORK: 4 }),
        i = (t.OLD_EXAM_TYPE = {
          QUIZ: 1,
          HOMEWORK: 2,
          EXAM_OBJECTIVE: 3,
          EXAM_SUBJECTIVE: 4,
          POP_QUIZ: 5,
        }),
        a = {
          KEY_EXAM_TYPE: r(
            r(
              r(
                r(r(r({}, o.NEW, '考试'), o.NEW_CLASSROOM, '练习'), o.NEW_HOMEWORK, '作业'),
                o.NEW_UNIT_TEST,
                '小テスト',
              ),
              void 0,
              '考试',
            ),
            null,
            '考试',
          ),
          KEY_HOMEWORK_SUBMIT_TITLE: '課題を提出しますか？',
          KEY_HOMEWORK_SUBMIT_DESC:
            '提出を確定すると、回答を変更できなくなります。変更が必要な場合は「下書き保存」を選択してください。',
          KEY_BTN_SAVE_DRAFT: '下書き保存',
          KEY_BTN_CONFIRM_SUBMIT: '提出する',
          KEY_OLD_EXAM_TYPE: r(
            r(
              r(r(r({}, i.QUIZ, '测验'), i.HOMEWORK, '作业'), i.EXAM_OBJECTIVE, '考试'),
              i.EXAM_SUBJECTIVE,
              '考试',
            ),
            i.POP_QUIZ,
            '随堂测验',
          ),
          KEY_COURSE_KNOWLEDGE_GRAPH: 'コースナレッジマップ',
          KEY_COURSE_IDEOLOGY_GRAPH: '思想政治教育ナレッジマップ',
          KEY_COURSE_AI_ASSISTANT: 'コースAI助手',
          KEY_CONTENT: 'コンテンツ',
          COURSE_KEY_CONTENT: 'コース指導内容',
          KEY_MENU_COURSE_INFO: 'コース概要ページ',
          KEY_TOOL: 'ツール',
          KEY_COURSE_STATISTICS: 'コースデータ統計',
          KEY_LEARN_ANALYSIS: '智能学情分析',
          KEY_INTELLIGENT_LEARNING_CENTER: 'AI学情分析',
          KEY_CHARGE_MANAGE: '取引管理',
          KEY_MOOC: 'MOOC',
          KEY_ONLINE_CLASS: 'オンラインクラス',
          KEY_MOOC_MANAGE: 'MOOC管理',
          KEY_APPLICATION_STATISTICS: 'アプリ統計',
          KEY_GUIDE: 'ガイド',
          COURSE_PUBLISH_KEY_GUIDE: 'コース公開ガイド',
          KEY_NOTICE: '通知',
          KEY_TEACH_UNIT_CONTENT_PUBLISH: 'コースユニットコンテンツ発表',
          KEY_CUSTOM_COLUMN: 'カスタマコラム',
          KEY_SETTING: '設定',
          COURSE_KEY_SETTING: 'コース指導設定',
          KEY_COURSE_TEAM_SETTING: 'コースチーム設定',
          KEY_SCORE_RULE: 'スコア評価ルール',
          KEY_DISCUSS_FORUM_SETTING: 'フォーラム設定',
          KEY_SET_COMMENT_PRACTICE_QUESTION: '相互評価トレーニング題設定',
          KEY_END_COURSE_SETTING: 'コース終了設定',
          KEY_END_COURSE_ADN_COPYRIGHT_SETTING: 'コース終了及びライセンス設定',
          KEY_GROUP_MANAGE: 'グループ管理',
          KEY_CHECK_COURSE_DATA: 'コースデータを確認',
          KEY_STUDENT_PERFORMANCE_MANAGE: '成績管理',
          KEY_COURSE_DATA_STATISTICS: 'コースデータ統計',
          KEY_STUDY_DATA_STATISTICS: '学習データ統計',
          KEY_STUDENT_MANAGE: '受講生管理',
          KEY_NAV_MENU_ROOC_ADMIN_MANAGE: '地方区の管理',
          KEY_IDENTIFICATION_CREDENTIALS_MANAGE: '認定証書管理',
          KEY_ROOC_IDENTIFICATION_CREDENTIALS_MANAGE: '認定 Rooc 証書管理',
          KEY_CHECK_SOURCE_COURSE_PERFORMANCE: '源コース成績を確認',
          KEY_COMMUNITY_SETTING: 'コミュニティ設定',
          KEY_EXCHANGE_CLASSIC_COURSE_SETTING: 'クラシックコース設定',
          KEY_CLASSIC_COURSE_RELATIVE_SETTING: 'クラシックコース関連設定',
          KEY_WECHAT_OFFICIAL_ACCOUNT_RELATIVE: 'Wechat公式アカウントへペアリンク',
          KEY_MOB_LEARN_PAGE_GUIDE: 'Learn Page Guide',
          KEY_RESOURCE_DEPOSITORY: 'リソース集',
          COURSE_KEY_RESOURCE_DEPOSITORY: 'コースリソース',
          KEY_VIDEO_DEPOSITORY: '動画集',
          KEY_DOCUMENT_DEPOSITORY: '書類集',
          KEY_COURSEWARE_DEPOSITORY: 'コースウェアライブラリ',
          KEY_QUESTION_DEPOSITORY: '問題集',
          KEY_HELP_CENTER: 'ヘルプ',
          KEY_TEACH_AI_PPT: 'PPTのインテリジェントな生成',
          KEY_COURSE_TAG: '学校オリジナルコース',
          KEY_START_TIME_UNKOWN: '管理時間未定',
          KEY_OPEN_COURSE: '開始',
          KEY_PREVIEW: 'プレビュー',
          KEY_COURSE_MANAGE: 'コース管理',
          KEY_NAV_USING: '使用中',
          KEY_NAV_ACCOUNT_SIGNIN: 'ログイン',
          KEY_NAV_MENU_MY_LIVE_STREAM: 'Myライブ',
          KEY_NAV_MENU_MY_CERT: 'My認定証書',
          KEY_NAV_MENU_MY_COUPON: 'Myグーボン',
          KEY_NAV_MENU_GJS_MANAGE: '中国高等教育印刷社管理',
          KEY_NAV_MENU_GJS_MARKET_EDITOR: '中国高等教育印刷社運営管理',
          KEY_NAV_MENU_GJS_COURSE_EDITOR: '中国高等教育印刷社コース編集',
          KEY_NAV_MENU_GJS_COURSE_CHECK: '中国高等教育印刷社コース審査',
          KEY_NAV_MENU_SCHOOL_ADMIN_MANAGE: '大学管理画面',
          KEY_NAV_MENU_WEBSITE_MANAGE: 'サイト管理',
          KEY_NAV_MENU_KY_SCHOOL_MANAGE: '大学院進学試験大学管理画面',
          KEY_NAV_MENU_MKT_MANAGE: 'MOOC管理画面',
          KEY_NAV_MENU_CLASSROOM_MANAGE: '教室 の運営です',
          KEY_NAV_MENU_AI_MKT_MANAGE: 'AI MOOC管理画面',
          KEY_NAV_MENU_COURSE_MANAGE: 'コース管理画面',
          KEY_NAV_MENU_ORDER_MANAGE: '注文管理',
          KEY_NAV_MY_ORDER: 'MY order',
          KEY_NAV_MENU_TEACHER_INDEX: '講師ページ',
          KEY_NAV_MENU_SETTING: '設定',
          KEY_NAV_MENU_LOGOUT: 'ログラウト',
          KEY_PROMPT: '注意事項',
          KEY_COURSE_DELETE_PROMPT: '該当コースを削除しますか？',
          KEY_DELETE_SUCCESS: '削除しました',
          KEY_DELETE_FAIL: '削除できませんでした',
          KEY_CHAPTER_PULL_GUIDE: 'スライトバーで章節/試験の表示位置を調整できます！',
          KEY_LESSON_PULL_GUIDE: 'スライトバーでセクション/テスト/宿題の表示位置を調整できます！',
          KEY_BEGIN_BTN_GUIDE:
            'ここをクリックすると，コースユニット内容順次を受講生学習ページへ同期できます',
          KEY_GOT_IT: 'わかりました',
          KEY_EDIT_TEACHING_CONTENT: 'コース内容を編集',
          KEY_FAILED: '失敗',
          KEY_ADD_SUCCESS: '追加しました',
          KEY_UPDATE_SUCCESS: '更新しました',
          KEY_NAME: '名前',
          KEY_PLEASE_ENTER: 'ご入力ください',
          字: '入力可能フォント数は',
          KEY_WORDS: '個です',
          KEY_SAVE: '保存',
          KEY_CANCEL: 'キャンセル',
          KEY_RELEASE_TIME: '発表時間',
          KEY_RELEASE_GUIDE:
            'ユニットテスト、宿題の発表時間は章節内容の発表時間より遅く設定してください',
          KEY_SPREAD_OUT: '展開',
          KEY_PUT_AWAY: 'クローズ',
          KEY_QUIZ_THIS: 'ここは',
          KEY_QUIZ_MODIFY_GUIDE: '発表済みの為，これらの修正は保存や発表はされません',
          KEY_QUIZ_DELETE_GUIDE: '発表済みのため，削除できません',
          KEY_CONFIRM_DELETE_PROMPT: '該当問題を削除しますか',
          KEY_QUIZ_QUESTION_MARK: '削除？',
          KEY_PUBLISH_SUCCESS: '発表しました',
          KEY_PUBLISH_FAIL: '発表失敗しました',
          KEY_ADD_SECTION: 'セクションを追加',
          KEY_ADD_QUIZ: 'テストを追加',
          KEY_ADD_ASSIGNMENT: '宿題を追加',
          KEY_TECH_UNIT_ORDER_UPDATE_CONFIRM:
            'コースユニット内容順次を受講生学習ページへ同期しますか？',
          KEY_TEACH_UNIT_CONTENT: 'コースユニット内容',
          KEY_COURSE_TEACH_CONTENT: 'カリキュラムの授業内容です',
          KEY_COMMON_PROBLEM: 'よくある質問',
          KEY_TEACH_UNIT_NOTE:
            '注意：受講生のコース学習ページでの章節順次はここの順次と一致しているため、章節順次は慎重に調整してください！',
          KEY_UPDATE_ORDER: '更新順序',
          KEY_CHAPTER_PREVIEW: '章節プレビュー',
          KEY_CHAPTER_PREVIEW_CERTIFICATE: '章節プレビュー',
          KEY_ADD_CHAPTER: '章節を追加',
          KEY_CHAPTER_NAME: '章節名',
          KEY_INPUT_CHAPTER_NAME_PLACEHOLDER: '章節名をご入力ください',
          KEY_INPUT_TEST_NAME_PLACEHOLDER: '試験名をご入力ください',
          KEY_TEST_NAME: '試験名',
          KEY_ADD_TEST: '試験を追加',
          KEY_NAV_MENU_SCHOOL_HOMEPAGE: '学校ホーム',
          KEY_NAV_MENU_SCHOOL_CLOUD_INNER_HOMEPAGE: '学校クラウド内部ページ',
          KEY_NAV_MENU_TERM_MANAGE: '学期管理',
          KEY_NAV_MENU_KY_TERM_MANAGE: '大学院受験学期管理',
          KEY_NAV_MENU_SCHOOL_DEPARTMENT_MANAGE: '大学管理',
          KEY_NAV_MENU_TEACHER_MANAGE: '講師管理',
          KEY_NAV_MENU_STUDENT_MANAGE: '受講生管理',
          KEY_NAV_MENU_DATA_CENTER: 'データ統計',
          KEY_NAV_MENU_SCHOOL_INFO: '学校情報',
          KEY_NAV_MENU_TEACHING_MANAGE: '授業管理',
          KEY_NAV_MENU_ORG_STRUCTURE: '組織構造',
          KEY_NAV_MENU_COURSE_REFER: '引用コース',
          KEY_NAV_MENU_RESOUCE_STATISTICAL: 'リソース集統計',
          KEY_NAV_MENU_SCHOOL_RESOURCE: '学校級リソース集',
          KEY_NAV_MENU_USEABLE_ONLINE_COURSE: '使用可能オンラインコース',
          KEY_NAV_MENE_COLUMN_MANAGE: 'コラム管理',
          KEY_NAV_MENE_OUR_SCHOOL_RESOURCE: '本校教育リソース集',
          KEY_NAV_MENE_HELP_CENTER: 'ヘルプセンター',
          KEY_NAV_MENU_BIFROST: '職業技能コースの管理',
          KEY_NAV_MENU_TEXTBOOK_MANAGE: '教科書管理',
          KEY_NAV_MENU_ASSISTANT: 'AIティーチングアシスタント管理',
          KEY_UPLOAD_IMG_MAXSIZE_TIP: '対応可能画像サイズは',
          KEY_UPLOAD_IMG_TITLE: '画像を編集',
          KEY_UPLOAD_IMG_BUTTON_SUBMIT: '确定',
          KEY_UPLOAD_IMG_BUTTON_CANCEL: 'キャンセル',
          KEY_COLLEGE_COLLUM_SET: '列設定',
          KEY_COLLEGE_INPUT: 'インプットしてください',
          KEY_TEACHER_EXPORT_DATA: 'データをエクスポートしてください',
          KEY_EXAM_EDIT_SUCCESS: '編集しました',
          KEY_EXAM_PUBLISH_SUCCESS: '発表しました',
          KEY_EXAM_HAS_PUBLISH_ERR_TIP:
            '該当試験は既に発表済みの為，対象修正は保存または発表されません',
          KEY_EXAM_PUSHLISH_NOT_DEL: '該当試験は既に発表済みの為，削除できません',
          KEY_EXAM_CONFIRM_DELETE_EXAM: 'テストを削除しますか？',
          KEY_EXAM_EDIT_EAXM_CONTENT: '試験内容を編集する',
          KEY_EXAM_A_PAPER: 'A巻',
          KEY_EXAM_B_PAPER: 'B巻',
          KEY_EXAM_B_PAPER_RELATION: '関連：{name}（A巻）',
          KEY_PUBLISH: '発表',
          KEY_PUBLISH_STATUS_UNPUBLISH: '未発表',
          KEY_PUBLISH_STATUS_MODIFY: '修正あり',
          KEY_PUBLISH_STATUS_DELETED: '削除済み',
          KEY_PUBLISH_TIME_SET: '発表時間を設定',
          KEY_PUBLISH_RELEASE_AT: 'こちらは',
          KEY_PUBLISH_STATUS_PUBLISHED: 'にて発表済みです',
          KEY_VALID_INDEFINITELY: '長期有効',
          KEY_PUBLISH_TIME: '発表時間',
          KEY_PUBLISH_WEEKDAYS: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日',
          KEY_DELETE_TIPS:
            '該当章節を削除すると含まれているその他のレッスンも削除されます、該当章節を削除します？',
          KEY_CONTENT_IS_ADD: 'コンテンツを入力してください',
          KEY_NOT_ALLOW_DRAG_TO_DELETE: '削除済み章節は使用できません',
          KEY_EXAM_CAN_NOT_DRAG_SON: '試験を子章節に入れられません、同級操作のみ移動できます',
          KEY_CHAPTER_NOT_DRAG_SON: '章節を子章節に入れられません、同級操作のみ移動できます',
          KEY_ONLY_CHAPTER_NOT_ATHOR:
            'セクションは章節にのみ入れられます~試験、テスト、宿題及びその他セクションへは移行できません',
          KEY_ONLY_CHAPTER_NOT_EXAM:
            'テストは章節にのみ入れられます~試験、セクション、宿題及びその他テストへは移行できません',
          KEY_ONLY_HOMEWORK_DRAG_CHAPTER:
            'クシュ題は章節にのみ入れられます~試験、テスト、セクション及びその他宿題へは移行できません',
          KEY_TYPE_VIDEO: '動画',
          KEY_TYPE_SUBTITLE: '字幕',
          KEY_TYPE_DOCUMENT: 'ドキュメント',
          KEY_TYPE_RICH_TEXT: 'リッチテキスト',
          KEY_TYPE_QUIZ: 'テスト',
          KEY_TYPE_DISCUSSION: 'ディスカション',
          KEY_TYPE_LIVE_STREAM: 'ライブ',
          KEY_TYPE_IMG_TEXT: 'イメージテキスト',
          KEY_TYPE_LINK_LIVE_STREAM: '関連ライブ',
          KEY_TYPE_MUSIC_VIDEO: '音楽動画',
          KEY_TYPE_MUSIC_EXECISE: '音楽練習',
          KEY_TYPE_SECTION: 'セクション',
          KEY_TYPE_HOMEWORK: '宿題',
          KEY_TEACHUNIT_EDIT_PRE: '編集',
          KEY_TEACHUNITEDIT_CONTENT_AFTER: '内容',
          KEY_TEACHUNIT_ADD_PRE: '追加',
          KEY_TOUXINAG: 'アイコン',
          KEY_PLEASE_UPLOAD_TOUXIANG: 'アイコンをアップロードしてください',
          KEY_UPLOAD_TOUXIANG: 'アイコンをアップロードする',
          KEY_NICKNAME: 'ニックネーム',
          KEY_PLEASE_INPUT_NIKENAME: 'ニックネームをご入力ください',
          KEY_ONLY_INCLUDE_ALL:
            '漢字、アルファベット、数字、アンダーライン或いは連接記号“-”のみ利用可能です',
          KEY_NICKNAME_NOT_MORE_THAN: 'ニックネームは36フォント以内に設定してください',
          KEY_NICKNAME_NOT_ALLOWED: 'このニックネームは合法的ではありません',
          KEY_NICKNAME_TOO_MOTE_CHANGE:
            'このニックネーム既に多くのユーザ使われています，その他での設定をお勧めします',
          KEY_NICKNAME_NOT_EMPTY: 'ニックネームは必ずご入力ください',
          KEY_USER_ACCOUNT: 'アカウント',
          KEY_REAL_NAME: '本名',
          KEY_PLEASE_INPUT_REAL_NAME: '本名をご入力ください',
          KEY_GONGHAO: '作業番号',
          KEY_INPUT_GONGHAO: '作業番号をご入力ください',
          KEY_FROM_PART: '所属大学',
          KEY_PLEASE_CHOOSE_FROM_PART: '所属大学をご選択ください',
          KEY_PLEASE_CHOOSE_PART: '専門をご選択ください',
          KEY_SEX: '性別',
          KEY_BOY: '男',
          KEY_GIRL: '女',
          KEY_ATHOR: 'その他',
          KEY_BIRTHDAY: '生年月日',
          KEY_ID_CARD: '身分ID番号',
          KEY_PLEASE_INPUT_ID_CARD: '身分ID番号をご入力くだdさい',
          KEY_ID_CARD_LENGTH_NOT_RIGHT: '身分ID番号桁数が正しくありません',
          KEY_TEL: '携帯番号',
          KEY_PLEASE_INPUT_RIGHT_TEL: '携帯番号形式を正しくご入力ください',
          KEY_SCHOOL: '学校',
          KEY_ZHIHCHENG: '職務',
          KEY_PLEASE_INPUT_ZHICHENG: '職務をご入力ください',
          KEY_GEREN_QIANMING: 'オリジナル署名',
          KEY_UPLOAD_QIANMING: 'オリジナル署名をアップロード',
          KEY_PERSONAL_INTRO: '個人概要',
          KEY_PLEASE_INPUT_PERSONAL_INTRO: '個人概要をご入力ください。',
          KEY_TOTAL_SCORE_UNIT_TEST: 'ユニットテスト',
          KEY_TOTAL_SCORE_UNIT_TEST_HOMEWORK: 'ユニット課題',
          KEY_TOTAL_SCORE_EXAM: '試験',
          KEY_TOTAL_SCORE_NEW_EXAM: '最新版試験',
          KEY_TOTAL_SCORE_COURSE_DISCUSSION: 'カリキュラム討論',
          KEY_TOTAL_SCORE_OUT_DISTRICT_SCORE: '範囲外成績',
          KEY_TOTAL_SCORE_VIDEO_COMPLETE_PERCENT: 'ビデオ学習完成度',
          KEY_TOTAL_SCORE_GRADE_MANAGE_FREEZE:
            '受講生の成績に関する採点ルール、受講生の成績管理、授業データの閲覧、学期の得点などの設定は凍結されました。',
          KEY_CONFIRM: '確認する',
          KEY_TOTAL_SCORE_SCORE: '成績',
          KEY_TOTAL_SCORE_CERT: '証書',
          KEY_TOTAL_SCORE_SELECT_PART_PERCENT_TIP:
            'チェックボックスの合計は100%でなければなりません',
          KEY_TOTAL_SCORE_CERT_SCORE_SET_ERROR: '優秀証明書スコア設定ミス',
          KEY_SAVE_ERROR: '保存に失敗する!',
          KEY_SAVE_SUCCESS: '保存に成功する！',
          KEY_TOTAL_SCORE_JOIN_SCORE_TYPE: '得点参加タイプ',
          KEY_TOTAL_SCORE_SET_JFWD: '積分の次元を設定する',
          KEY_TOTAL_SCORE_ACTIVE_TIP:
            '活発度:満点を取ったユーザーが「カリキュラムの討論」に返信することのできる回数を入力してください',
          KEY_TOTAL_SCORE_VIDEO_LEARN_TIME_TIP:
            'ビデオ学習時間:ビデオ全体の時間に対する学習時間の割合',
          KEY_TOTAL_SCORE_CONTENT_QUALITY_TIP:
            'コンテンツの質:満点を取得したユーザーが「カリキュラムの討論」に「いいね」と回答した件数を入力してください。',
          KEY_TOTAL_SCORE_LEAR_COUSE_NUM_TIP:
            '学習用テキストの数:学習動画の数が動画全体の数に占める割合',
          KEY_TOTAL_SCORE_TOTAL_SCORE_PERCENT: '総合点比率(%)',
          KEY_TOTAL_SCORE_TOTAL_SCORE_SET: '総合点設定',
          KEY_TOTAL_SCORE_SET: '設定する',
          KEY_TOTAL_SCORE_SET_AFTER: '設定する',
          KEY_TOTAL_SCORE_ONLY_COUSE_MANAGE_CAN: 'カリキュラム責任者のみ行うことが可能',
          KEY_TOTAL_SCORE_CERT_TIP:
            '証明書の権威を保障するため、プラットフォームは無料の電子証明書をサポートせず、証明書による認証のみを提供する。必要があれば、先生は公告または他の方式を通じて証明書を必要とする受講生に伝えて、認証証明書を申請することができる。',
          KEY_TOTAL_SCORE_ONLY_HG: '合格のみ',
          KEY_TOTAL_SCORE_HG: '合格',
          KEY_TOTAL_SCORE_REQURE: '要求',
          KEY_TOTAL_SCORE_GET_SCORE: '得点',
          KEY_TOTAL_SCORE_INPUT_NUMBER: 'アラビア数字を入力してください',
          KEY_TOTAL_SCORE_HAVE_HG: '合格している',
          KEY_TOTAL_SCORE_HAVE_EXCELLENT: '優秀である',
          KEY_TOTAL_SCORE_EXCELLENT: '優秀',
          KEY_TOTAL_SCORE_SAVE_AND_PUBLISH: '保存して発表する',
          KEY_MOBILE_MG_TITLE: '検索&導出データがオフラインになる',
          KEY_MOBILE_MG_TITLE_TIP:
            '個人情報保護とデータセキュリティに関する国法の規定に基づき、2021年の秋学期から学生の情報を脱知覚化することになりましたのでご承知ください。',
          KEY_LOGIN_WELCOME: 'ようこそ',
          KEY_LOGIN_BTN_TXT: 'Googleでサインイン',
          KEY_FOOTER_DESC:
            '私たちは、すべての学習者が有名な高等教育機関が提供するコースを受講する機会を提供し、正常に完了すると証明書を取得します。',
          KEY_SEARCH_NO_RESULT: '検索結果やフィルターリング結果はありません',
          KEY_TEACHER_EVALUATE: '教師の評価',
          KEY_SUBMIT_SUCCESS: '正常に送信されました',
          KEY_SUBJECTIVE_QUESTION: '主観的な質問',
          KEY_SINGLE_SCORE: '分',
          KEY_STUDENT_ANSWER: '学生の回答',
          KEY_DOWNLOAD_ATTACHMENTS: '添付ファイルをダウンロードする',
          KEY_SCORE_POINTS: '得点',
          KEY_FULL_SCORE: '満点',
          KEY_TARGET_SCORE: 'この質問のスコア',
          KEY_INPUT_TIP_FRONT: '0〜',
          KEY_INPUT_TIP_TAIL: 'のアラビア数字を入力してください，小数点以下1桁までです',
          KEY_TEACHER_COMMENTS: '先生のコメント',
          KEY_TEACHER_COMMENTS_TIP: '生徒の回答とスコアの全体的な評価を教えてください',
          KEY_TEACHER_COMMENTS_PLACEHOLDER: 'レビューを入力してください',
          KEY_TOTAL_SCORE: '合計スコア',
          KEY_TOTAL_SCORE_AUTO_TIP:
            'スコアを入力する必要はなく、システムによって自動的に生成されます',
          KEY_SUBMIT_BUTTON_TEXT: '参加する',
          KEY_CANCEL_BUTTON_TEXT: '戻る',
          KEY_ANSWER_USER: '学生情報',
          KEY_PRE_PAPER_TEXT: '前へ',
          KEY_NEXT_PAPER_TEXT: '次へ',
          KEY_PAPER_CONFIRM_LEAVE:
            '解答用紙を切り替えた後に失われる未提出の変更があります。直接切り替えますか？',
          KEY_LEARN_SYNC_SOURCE: '源カリキュラムに同期します：',
          KEY_LEARN_LEARNING_PAGE:
            '当学習ページには、同期型コースのコラム構成と内容が完全に採用され、教師はさらにコンテンツを追加可能になります。',
          KEY_SCHOOL_CLOUD: '学校クラウド',
          KEY_BUILD_ONLINE: 'オリジナルオンライン教育プラットフォームを構築しましょう',
        };
      t.default = a;
    },
    434639: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getBaseUrl = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s;
          return e && e !== _ ? ''.concat(e, '/imooc') : '';
        }),
        (t.getLang = function (e) {
          return e ? u[e] : s ? u[s] : o.default;
        }),
        (t.getLocal = function () {
          return s;
        }),
        (t.isIntel = function () {
          return s && s !== _;
        }),
        (t.setLocal = function (e) {
          s = e;
        }));
      var r = a(n(248372)),
        o = a(n(932628)),
        i = a(n(430826));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s,
        _ = a(n(815726)).default.DEFAULT_CONST.DEFAULT_CH,
        u = { en: r.default, ch: o.default, ja: i.default };
    },
    369808: (e, t) => {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      function r(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != n(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != n(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == n(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o = {
          NOT_COMMIT: -1,
          NO_GENERATE: 0,
          GENERATING: 1,
          GENERATE_COMPLETE: 2,
          GENERATE_ALL_FAIL: 3,
          UNABLE_TO_HANDLE: 4,
          PART_OF_GENERATE_FAIL: 5,
        },
        i = {
          AI_STATUS: o,
          AI_NOTE_STATUS_DESC: r(
            r(
              r(
                r(
                  r(
                    r(
                      r({}, o.NOT_COMMIT, '当前学期AIGC的课程笔记任务未提交'),
                      o.NO_GENERATE,
                      '当前学期AIGC的课程笔记正在生成中',
                    ),
                    o.GENERATING,
                    '当前学期AIGC的课程笔记正在生成中',
                  ),
                  o.GENERATE_COMPLETE,
                  '当前学期AIGC的课程笔记生成完成',
                ),
                o.GENERATE_ALL_FAIL,
                '当前学期AIGC的课程笔记生成失败',
              ),
              o.UNABLE_TO_HANDLE,
              '当前学期AIGC的课程笔记生成失败',
            ),
            o.PART_OF_GENERATE_FAIL,
            '当前学期AIGC的课程笔记部分生成失败',
          ),
        };
      t.default = i;
    },
    236361: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isLinkOnline = t.CLASSROOM_TYPE = void 0));
      var n = (t.CLASSROOM_TYPE = {
        ONLINE: 2,
        OFFLINE_LINK_ONLINE: 1,
        OWN_ONLINE: 11,
        OTHER_ONLINE: 12,
        OPEN_RESOURCE: 13,
        OFFLINE: 0,
      });
      t.isLinkOnline = function (e) {
        return e !== n.ONLINE && e !== n.OFFLINE;
      };
    },
    935837: (e, t) => {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      function r(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != n(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != n(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == n(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o = { MOOC: 0, SPOC_SYNC: 10, SPOC_ASYNC: 15, SPOC_ONLY: 20, ROOC: 30 },
        i = {
          COURSE_LEARNING_PROGRESS: { ALL: 30, FINISH: 0, GOING: 10, NOT_START: 20 },
          PRODUCT_TYPE: { MOOC: 1, KAOYAN: 2, COLUMN: 3 },
          COURSE_CARD_TYPE: {
            KAOYAN: 301,
            PACKAGES: 302,
            COLUMN: 304,
            MOOC: 306,
            ADULT: 401,
            TEXTBOOK: 308,
          },
          COURSE_TYPE: { COURSE: 301, COURSE_PACKAGE: 302, PROMOTION: 303, COLUMN: 304, MOOC: 306 },
          MODE_TYPE: o,
          MODE_TYPE_TEXT: r(
            r(r(r({}, o.MOOC, 'MOOC'), o.SPOC_SYNC, '同步SPOC'), o.SPOC_ASYNC, '异步SPOC'),
            o.SPOC_ONLY,
            '独立SPOC',
          ),
          DEFAULT_COURSE_COVER:
            '//edu-image.nosdn.127.net/65d6907b-b4ff-4409-bbcc-e4dcc285e00b.jpg?imageView&quality=100',
          UNDETERMINDED_STARTTIME: 32503651201e3,
          UNDETERMINDED_ENDTIME: 32535187201e3,
          LONG_TERM_OPEN_END_TIME: 95617584e6,
          TERM_LEARNING_PROGRESS_STATUS: {
            FINISH: 0,
            FINISH_VISIBLE_CONTENT: 5,
            GOING: 10,
            NOT_START: 20,
            UNDETERMINDED_START: 21,
          },
          ORDER_TYPE: { SUM_UP: 0, NEW: 10, HOT: 20 },
          RESOURSE_TYPE: {
            SIGN: 0,
            EXERCISE: 1,
            QUESTIONIARE: 2,
            ANNOUNCEMENT: 3,
            ROLLCALL: 4,
            DISCUSSION: 5,
            HOMEWORK: 7,
            UNIT: 8,
            EXAM: 9,
            DOCTEACH: 10,
          },
          RESOURSE_TYPE_CLASS: {
            1: { class: 'exercise', name: '练习' },
            2: { class: 'questioniare', name: '问卷' },
            3: { class: 'announcement', name: '公告' },
            5: { class: 'discussion', name: '讨论' },
          },
          DOC_TYPE: { PPT: 0, DOC: 1, XLS: 2, PDF: 3 },
          DOC_TYPE_CLASS: { 0: 'ppt', 1: 'doc', 2: 'xls', 3: 'pdf' },
          LESSONUNIT_VIDEO: 1,
          LESSONUNIT_VIDEO_SRT: 2,
          LESSONUNIT_PDF: 3,
          LESSONUNIT_TEXT: 4,
          LESSONUNIT_QUESTION: 5,
          LESSONUNIT_DISCUSS: 6,
          LESSONUNIT_LIVE: 7,
          LESSONUNIT_COLUMN_CONTENT: 8,
          LESSONUNIT_RELATED_LIVE: 9,
          LESSONUNIT_MUSIC_VIDEO: 10,
          LESSONUNIT_MUSIC_EXERCISE: 11,
          LESSONUNIT_MUSIC_HOMEWORK: 12,
        };
      t.default = i;
    },
    473344: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          DEFAULT_AVATAR:
            'https://edu-image.nosdn.127.net/3ed8e010aa45475cbaf3c4f4e7c37513.png?imageView&quality=100&thumbnail=128y128',
          DEFAULT_LOGO:
            'https://edu-image.nosdn.127.net/3d8ed4ceebc6471eb24fec24a89731bc.png?imageView&quality=100&thumbnail=230y68',
          DEFAULT_LOGO_WHITE:
            'https://edu-image.nosdn.127.net/212870759d5d4cbe9fdbafe198ac8f1a.png?imageView&quality=100&thumbnail=230y68',
          DEFAULT_CH: 'ch',
        }));
    },
    815726: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'ROLES', {
          enumerable: !0,
          get: function () {
            return c.ROLES;
          },
        }),
        (t.default = void 0));
      var r = E(n(935837)),
        o = E(n(409113)),
        i = E(n(185691)),
        a = E(n(136715)),
        s = E(n(473344)),
        _ = E(n(951643)),
        u = E(n(369808)),
        c = n(129515);
      function E(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = {
        COURSE: r.default,
        TIME: o.default,
        URL_PREFIX: i.default,
        PROMOTION: a.default,
        DEFAULT_CONST: s.default,
        LOGIN: _.default,
        AIGC: u.default,
      };
    },
    538524: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.EN_REACT = t.EN = void 0));
      var n = (t.EN = 1002),
        r = (t.EN_REACT = 10021);
      t.default = { EN: n, EN_REACT: r };
    },
    951643: (e, t) => {
      'use strict';
      var n;
      function r(e) {
        return (
          (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          r(e)
        );
      }
      function o(e, t, n) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != r(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var n = t.call(e, 'string');
                if ('object' != r(n)) return n;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == r(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var i = {
          ICOURSE: 11,
          YOUDAO: 1,
          WEIBO: 2,
          RENREN: 3,
          QQ: 4,
          QIYE163: 5,
          QIYE: 20,
          JIAOWU: 7,
          PHONE: 8,
          WECHAT: 6,
          URS: -1,
          GOOGLE: 90,
        },
        a =
          (o(
            o(
              o(
                o(
                  o(
                    o(
                      o(
                        o(o(o((n = {}), i.URS, '网易邮箱'), i.YOUDAO, '有道'), i.WEIBO, '微博'),
                        i.RENREN,
                        '人人',
                      ),
                      i.QQ,
                      'QQ',
                    ),
                    i.QIYE163,
                    '企业邮箱',
                  ),
                  i.WECHAT,
                  '微信',
                ),
                i.JIAOWU,
                '教务系统',
              ),
              i.PHONE,
              '手机',
            ),
            i.ICOURSE,
            '爱课程',
          ),
          o(n, i.GOOGLE, '谷歌'));
      t.default = { LOGIN_TYPE: i, LOGIN_TYPE_TEXT: a };
    },
    136715: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          PURCHASE_STATUS: {
            NOT_HAVE_PROMOTION: 0,
            PROMOTION_NOT_START: 1,
            PROMOTING: 2,
            PROMOTION_END: 3,
          },
          PURCHASE_TARGET_TYPE: { LIMIT: 0, PROMOTION: 2 },
          PROMOTION_TYPE: { NORMAL: 0, GROUP_BUY: 1, LIMIT: 2, PROMOTION: 3, BARGAIN: 4 },
          PURCHASE_OPEN: 2,
        }));
    },
    409113: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = { DAY: 864e5, WEEK: 6048e5 }));
    },
    185691: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default =
          t.OFFLINE_STUDENT_MANAGE =
          t.OFFLINE_CLASS_TASK =
          t.OFFLINE_CLASS_ADD_ACTIVITY =
            void 0));
      var r = n(236361),
        o = function (e, t) {
          return r.CLASSROOM_TYPE.ONLINE !== t
            ? (function (e) {
                return '/collegeAdmin/offlineClassManage/'.concat(e, '.htm');
              })(e)
            : (function (e) {
                return '/collegeAdmin/moocTermManage/'.concat(e, '.htm');
              })(e);
        };
      ((t.OFFLINE_STUDENT_MANAGE = function (e) {
        var t = e.termId,
          n = e.type,
          r = e.classroomId;
        return ''
          .concat(o(t, n), '?classId=')
          .concat(r, '#/tp/crumbs/offlineClassStuManage?classId=')
          .concat(r);
      }),
        (t.OFFLINE_CLASS_TASK = function (e) {
          var t = e.termId,
            n = e.type,
            r = e.classroomId,
            i = e.taskId,
            a = ''
              .concat(o(t, n), '?classId=')
              .concat(r, '#/tp/crumbs/offlineClassTask?classId=')
              .concat(r);
          return i ? ''.concat(a, '&taskId=').concat(i) : a;
        }),
        (t.OFFLINE_CLASS_ADD_ACTIVITY = function (e) {
          var t = e.termId,
            n = e.type,
            r = e.classroomId,
            i = e.planId,
            a = e.from,
            s = void 0 === a ? 'plan' : a;
          return ''
            .concat(o(t, n), '?classId=')
            .concat(r, '#/tp/crumbs/offlineClassPlan?classId=')
            .concat(r, '&planId=')
            .concat(i, '&from=')
            .concat(s);
        }),
        (t.default = {
          COURSE_INFO_PREFIX: '/course/',
          COURSE_LEARN_PREFIX: '/learn/',
          SPOC_COURSE_INFO_PREFIX: '/spoc/course/',
          SPOC_COURSE_LEARN_PREFIX: '/spoc/learn/',
          INTL_INDEX: '/',
          INTL_INDEX_OLD: '/mooc/en/',
          INTL_LOGIN_PREFIX: '/login',
          INTL_DOMAIN_PREFIX: '//www.icourse163.com/',
          INTL_TRANSLATE_PREFIX: '/en/mooc',
          INTL_TRANSLATE_PREFIX_WITH_DOMAIN: '//www.icourse163.org/en/mooc',
        }));
    },
    129515: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isSuperAuth = t.hasRole = t.SUPER_OPT_USER_NAME = t.SUPER_OPT = t.ROLES = void 0));
      var n = (t.ROLES = {
          ROLE_LEARNER: 'learner',
          ROLE_PLATFORM_ADMIN: 'platformAdmin',
          ROLE_SCHOOLSUPER_ADMIN: 'schoolSuperAdmin',
          ROLE_ASSISTANT: 'assistant',
          ROLE_LECTOR: 'lector',
          ROLE_OUT_SUPER_ADMIN: 'outSuperAdmin',
          ROLE_OUT_BUSINESS_EDITOR: 'outBusinessEditor',
          ROLE_OUT_COURSE_EDITOR: 'outCourseEditor',
          ROLE_OUT_ORDINARY_EDITOR: 'ordinaryEditor',
          ROLE_OUT_COURSE_REVIEWER: 'outCourseReviewer',
          ROLE_SCHOOLNORMAL_ADMIN: 'schoolNormalAdmin',
          ROLE_FORUM_MANAGER: 'forumManager',
          ROLE_SCHOOLPOSTGRADEXAM_ADMIN: 'schoolPostgradexamAdmin',
          ROLE_SCHOOLPOSTGRADEXAM_LECTOR: 'schoolPostgradexamLector',
          ROLE_SCHOOLNORMAL_ADMIN_SELF: 'schoolNormalAdminSelf',
          ROLE_BSITE_ADMIN: 'bSiteAdmin',
          ROLE_COLUMNIST: 'columnist',
          ROLE_COLUMN_ASSISTANT: 'columnistAssistant',
          ROLE_OFFLINE_LECTOR: 'offlineLector',
          ROLE_REGION_ADMIN: 'regionAdmin',
          ROLE_AICLASSROOM_TEACHER: 'aiClassroomTeacher',
        }),
        r = (t.hasRole = function (e, t) {
          return !(!e || !e.length) && -1 !== e.indexOf(t);
        }),
        o = (t.SUPER_OPT_USER_NAME = 'yzlfh'),
        i = (t.SUPER_OPT = 'optname');
      t.isSuperAuth = function () {
        var e,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.webUser;
        return !(
          new URLSearchParams(null === (e = location) || void 0 === e ? void 0 : e.search).get(
            i,
          ) !== o || !r((null == t ? void 0 : t.roles) || [], n.ROLE_PLATFORM_ADMIN)
        );
      };
    },
    33463: (e, t, n) => {
      'use strict';
      function r(e) {
        return (
          (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          r(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o,
        i = _(n(272505)),
        a = _(n(755373)),
        s = _(n(200891));
      function _(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function u() {
        var e,
          t,
          n = 'function' == typeof Symbol ? Symbol : {},
          r = n.iterator || '@@iterator',
          o = n.toStringTag || '@@toStringTag';
        function i(n, r, o, i) {
          var _ = r && r.prototype instanceof s ? r : s,
            u = Object.create(_.prototype);
          return (
            c(
              u,
              '_invoke',
              (function (n, r, o) {
                var i,
                  s,
                  _,
                  u = 0,
                  c = o || [],
                  E = !1,
                  l = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, n) {
                      return ((i = t), (s = 0), (_ = e), (l.n = n), a);
                    },
                  };
                function d(n, r) {
                  for (s = n, _ = r, t = 0; !E && u && !o && t < c.length; t++) {
                    var o,
                      i = c[t],
                      d = l.p,
                      f = i[2];
                    n > 3
                      ? (o = f === r) && ((_ = i[(s = i[4]) ? 5 : ((s = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= d &&
                        ((o = n < 2 && d < i[1])
                          ? ((s = 0), (l.v = r), (l.n = i[1]))
                          : d < f &&
                            (o = n < 3 || i[0] > r || r > f) &&
                            ((i[4] = n), (i[5] = r), (l.n = f), (s = 0)));
                  }
                  if (o || n > 1) return a;
                  throw ((E = !0), r);
                }
                return function (o, c, f) {
                  if (u > 1) throw TypeError('Generator is already running');
                  for (E && 1 === c && d(c, f), s = c, _ = f; (t = s < 2 ? e : _) || !E;) {
                    i || (s ? (s < 3 ? (s > 1 && (l.n = -1), d(s, _)) : (l.n = _)) : (l.v = _));
                    try {
                      if (((u = 2), i)) {
                        if ((s || (o = 'next'), (t = i[o]))) {
                          if (!(t = t.call(i, _)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((_ = t.value), s < 2 && (s = 0));
                        } else
                          (1 === s && (t = i.return) && t.call(i),
                            s < 2 &&
                              ((_ = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (s = 1)));
                        i = e;
                      } else if ((t = (E = l.n < 0) ? _ : n.call(r, l)) !== a) break;
                    } catch (t) {
                      ((i = e), (s = 1), (_ = t));
                    } finally {
                      u = 1;
                    }
                  }
                  return { value: t, done: E };
                };
              })(n, o, i),
              !0,
            ),
            u
          );
        }
        var a = {};
        function s() {}
        function _() {}
        function E() {}
        t = Object.getPrototypeOf;
        var l = [][r]
            ? t(t([][r]()))
            : (c((t = {}), r, function () {
                return this;
              }),
              t),
          d = (E.prototype = s.prototype = Object.create(l));
        function f(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, E)
              : ((e.__proto__ = E), c(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(d)),
            e
          );
        }
        return (
          (_.prototype = E),
          c(d, 'constructor', E),
          c(E, 'constructor', _),
          (_.displayName = 'GeneratorFunction'),
          c(E, o, 'GeneratorFunction'),
          c(d),
          c(d, o, 'Generator'),
          c(d, r, function () {
            return this;
          }),
          c(d, 'toString', function () {
            return '[object Generator]';
          }),
          (u = function () {
            return { w: i, m: f };
          })()
        );
      }
      function c(e, t, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((c = function (e, t, n, r) {
          function i(t, n) {
            c(e, t, function (e) {
              return this._invoke(t, n, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: n, enumerable: !r, configurable: !r, writable: !r })
              : (e[t] = n)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          c(e, t, n, r));
      }
      function E(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          (t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r));
        }
        return n;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? E(Object(n), !0).forEach(function (t) {
                d(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : E(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      function d(e, t, n) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != r(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var n = t.call(e, 'string');
                if ('object' != r(n)) return n;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == r(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function f(e, t, n, r, o, i, a) {
        try {
          var s = e[i](a),
            _ = s.value;
        } catch (e) {
          return void n(e);
        }
        s.done ? t(_) : Promise.resolve(_).then(r, o);
      }
      var h =
          'undefined' == typeof window
            ? null
            : null === (o = window) || void 0 === o
              ? void 0
              : o.document,
        T = 'application/x-www-form-urlencoded;charset=utf-8',
        O = function (e) {
          return e.data;
        };
      function m(e) {
        this.opts = e;
      }
      var S = function () {
          var e = s.default.cookie.getValueByKey('NTESSTUDYSI', h);
          return { 'content-type': T, 'edu-script-token': e };
        },
        p = function () {
          return { csrfKey: s.default.cookie.getValueByKey('NTESSTUDYSI', h) };
        };
      ((m.of = function (e) {
        return new m(e);
      }),
        (m.setWinDoc = function (e) {
          h || (h = e);
        }),
        (m.prototype = {
          setUrl: function (e) {
            return ((this.opts.url = e), m.of(this.opts));
          },
          setMethod: function (e) {
            return ((this.opts.method = e.toLowerCase()), m.of(this.opts));
          },
          setHeads: function (e) {
            this.opts.headers || (this.opts.headers = S());
            var t = Object.assign({}, this.opts.headers, e);
            return ((this.opts.headers = t), m.of(this.opts));
          },
          setParams: function (e) {
            var t = s.default.cookie.getValueByKey('NTESSTUDYSI', h);
            this.opts.params || (this.opts.params = { csrfKey: t });
            var n = Object.assign({}, this.opts.params, e);
            return ((this.opts.params = n), m.of(this.opts));
          },
          setData: function (e) {
            this.opts.data || (this.opts.data = {});
            var t = Object.assign({}, this.opts.data, e);
            return ((this.opts.data = t), m.of(this.opts));
          },
          launch: function () {
            var e,
              t = this;
            return ((e = u().m(function e() {
              var n, r, o, s, _, c, E, d, f, h, m, A, N, Y;
              return u().w(function (e) {
                for (;;)
                  switch (e.n) {
                    case 0:
                      return (
                        (n = t.opts),
                        (r = n.url),
                        (o = n.method),
                        (s = void 0 === o ? 'post' : o),
                        (_ = n.headers),
                        (c = void 0 === _ ? S() : _),
                        (E = n.params),
                        (d = void 0 === E ? p() : E),
                        (f = n.paramsSerializer),
                        (h =
                          void 0 === f
                            ? function (e) {
                                return a.default.stringify(e);
                              }
                            : f),
                        (m = n.data),
                        (A = void 0 === m ? {} : m),
                        (N = l(
                          l({}, t.opts),
                          {},
                          {
                            url: r,
                            method: s,
                            params: d,
                            paramsSerializer: h,
                            headers: c,
                            withCredentials: !0,
                            data: c['content-type'] === T ? a.default.stringify(A) : A,
                          },
                        )),
                        (e.n = 1),
                        (0, i.default)(N)
                      );
                    case 1:
                      return ((Y = e.v), e.a(2, O(Y)));
                  }
              }, e);
            })),
            function () {
              var t = this,
                n = arguments;
              return new Promise(function (r, o) {
                var i = e.apply(t, n);
                function a(e) {
                  f(i, r, o, a, s, 'next', e);
                }
                function s(e) {
                  f(i, r, o, a, s, 'throw', e);
                }
                a(void 0);
              });
            })();
          },
        }),
        (t.default = m));
    },
    88748: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          hexToRgb: function (e) {
            var t = e.startsWith('#') ? e.slice(1) : e;
            if (
              (3 === t.length &&
                (t = t
                  .split('')
                  .map(function (e) {
                    return e + e;
                  })
                  .join('')),
              6 === t.length)
            )
              return {
                r: parseInt(t.slice(0, 2), 16),
                g: parseInt(t.slice(2, 4), 16),
                b: parseInt(t.slice(4, 6), 16),
              };
          },
        }));
    },
    872065: (e, t) => {
      'use strict';
      function n(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          getValueByKey: function (e, t) {
            var r = {};
            return (
              t &&
                (r = t.cookie.split('; ').reduce(function (e, t) {
                  var r,
                    o,
                    i =
                      ((r = t.split('=')),
                      (o = 2),
                      (function (e) {
                        if (Array.isArray(e)) return e;
                      })(r) ||
                        (function (e, t) {
                          var n =
                            null == e
                              ? null
                              : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                                e['@@iterator'];
                          if (null != n) {
                            var r,
                              o,
                              i,
                              a,
                              s = [],
                              _ = !0,
                              u = !1;
                            try {
                              if (((i = (n = n.call(e)).next), 0 === t)) {
                                if (Object(n) !== n) return;
                                _ = !1;
                              } else
                                for (
                                  ;
                                  !(_ = (r = i.call(n)).done) && (s.push(r.value), s.length !== t);
                                  _ = !0
                                );
                            } catch (e) {
                              ((u = !0), (o = e));
                            } finally {
                              try {
                                if (!_ && null != n.return && ((a = n.return()), Object(a) !== a))
                                  return;
                              } finally {
                                if (u) throw o;
                              }
                            }
                            return s;
                          }
                        })(r, o) ||
                        (function (e, t) {
                          if (e) {
                            if ('string' == typeof e) return n(e, t);
                            var r = {}.toString.call(e).slice(8, -1);
                            return (
                              'Object' === r && e.constructor && (r = e.constructor.name),
                              'Map' === r || 'Set' === r
                                ? Array.from(e)
                                : 'Arguments' === r ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                                  ? n(e, t)
                                  : void 0
                            );
                          }
                        })(r, o) ||
                        (function () {
                          throw new TypeError(
                            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                          );
                        })()),
                    a = i[0],
                    s = i[1];
                  return ((e[a] = s), e);
                }, {})),
              r[e]
            );
          },
        }));
    },
    883270: (e, t, n) => {
      'use strict';
      function r(e) {
        return (
          (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          r(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getClassroomTypeText = t.formatTermTime = t.default = void 0));
      var o = n(808127),
        i = l(n(795093)),
        a = l(n(815726)),
        s = l(n(935837)),
        _ = l(n(603190)),
        u = l(n(820658)),
        c = l(n(478302)),
        E = l(n(959306));
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function d(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          (t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r));
        }
        return n;
      }
      function f(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? d(Object(n), !0).forEach(function (t) {
                h(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : d(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      function h(e, t, n) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != r(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var n = t.call(e, 'string');
                if ('object' != r(n)) return n;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == r(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function T(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var O = { ua: c.default.ua(), app: c.default.app },
        m = function (e) {
          var t = document.createElement('a');
          (t.setAttribute('href', e), t.setAttribute('target', '_blank'), t.click());
        },
        S = function (e) {
          var t,
            n = e.introUrl,
            r = a.default.COURSE.COURSE_CARD_TYPE.KAOYAN;
          (e.type === r && (n = E.default.urlAddParam(e.introUrl, 'courseId', e.courseId)),
            (n = n.startsWith('http') ? n : 'https:'.concat(n)),
            e.type !== r
              ? m(n)
              : null === (t = O.app) ||
                void 0 === t ||
                t.openKaoyanCourseDetailApp(
                  null == e ? void 0 : e.courseId,
                  null == e ? void 0 : e.termId,
                ));
        },
        p = function (e, t, n) {
          var r = e || a.default.COURSE.DEFAULT_COURSE_COVER;
          return _.default.scaleImage(r, t, n);
        },
        A = function (e, t, n) {
          var r,
            o,
            s = a.default.COURSE.TERM_LEARNING_PROGRESS_STATUS,
            _ = s.FINISH,
            c = s.FINISH_VISIBLE_CONTENT,
            E = s.GOING,
            l = s.NOT_START,
            d = s.UNDETERMINDED_START,
            f = a.default.COURSE,
            h = f.UNDETERMINDED_STARTTIME,
            T = f.LONG_TERM_OPEN_END_TIME,
            O = u.default.getCurServerTime();
          return t >= T
            ? {
                status: E,
                text: '长期开放',
                enText: 'Open indefinitely',
                class: 'going',
                icon: '//mooc-image.nosdn.127.net/4c57ef948158425c88a6babbada62f79.png?imageView&quality=100&thumbnail=48y48',
              }
            : [
                {
                  status: _,
                  text: '已结束',
                  enText: 'Archived',
                  class: 'end',
                  icon: '//mooc-image.nosdn.127.net/7543ca2c1cf349ff982b0ce8096601be.png?imageView&quality=100&thumbnail=48y48',
                  visible: function (e, t, n) {
                    return n && O - t > 0;
                  },
                },
                {
                  status: c,
                  text: '已结束，可查看内容',
                  enText: 'Archived',
                  class: 'end visibleCnt',
                  icon: '//mooc-image.nosdn.127.net/7543ca2c1cf349ff982b0ce8096601be.png?imageView&quality=100&thumbnail=48y48',
                  visible: function (e, t, n) {
                    return 0 === n && O - t > 0;
                  },
                },
                {
                  status: d,
                  text: '开课时间待定',
                  enText: 'Undecided',
                  class: 'not-start unknown',
                  icon: '//mooc-image.nosdn.127.net/78b00271ca1445dc9372bdebc2ba134f.png?imageView&quality=100&thumbnail=48y48',
                  visible: function (e) {
                    return e === h;
                  },
                },
                {
                  status: l,
                  text: ''.concat((0, i.default)(e).format('YYYY-MM-DD'), ' 开课'),
                  enText: 'Starts:'.concat((0, i.default)(e).format('YYYY-MM-DD')),
                  class: 'not-start',
                  icon: '//mooc-image.nosdn.127.net/78b00271ca1445dc9372bdebc2ba134f.png?imageView&quality=100&thumbnail=48y48',
                  visible: function (e) {
                    return e - O > 0;
                  },
                },
                {
                  status: E,
                  text: '进行至第'.concat(
                    ((r = e),
                    (o = u.default.getCurServerTime() - r),
                    Math.ceil(o / a.default.TIME.WEEK)),
                    '周',
                  ),
                  enText: 'Current',
                  class: 'going',
                  icon: '//mooc-image.nosdn.127.net/4c57ef948158425c88a6babbada62f79.png?imageView&quality=100&thumbnail=48y48',
                  visible: function (e, t) {
                    return O > e && O < t;
                  },
                },
              ].find(function (r) {
                return r.visible(e, t, n);
              });
        },
        N = function (e) {
          var t = e.mode,
            n = e.courseId,
            r = e.shortName,
            o = e.schoolSN,
            i = a.default.COURSE.MODE_TYPE.MOOC,
            s = a.default.URL_PREFIX,
            _ = s.COURSE_INFO_PREFIX,
            u = s.SPOC_COURSE_INFO_PREFIX,
            c = t && t > i ? u : _;
          return ''
            .concat('https://www.icourse163.org')
            .concat(c)
            .concat(r || o, '-')
            .concat(n);
        },
        Y = function (e, t) {
          var n,
            r = a.default.COURSE.COURSE_CARD_TYPE,
            o = r.KAOYAN,
            i = r.PACKAGES,
            s = r.COLUMN;
          return (
            (null ===
              (n = [
                { type: o, link: '//kaoyan.icourse163.org/course/terms/'.concat(t, '.htm') },
                { type: i, link: '//kaoyan.icourse163.org/course/packages/'.concat(t, '.htm') },
                { type: s, link: '//www.icourse163.org/columns/'.concat(t, '.htm') },
              ].find(function (t) {
                return t.type === e;
              })) || void 0 === n
              ? void 0
              : n.link) || ''
          );
        },
        y = function (e) {
          var t = e.targetType;
          return f(f({}, e), {}, { restrictedPromotionType: t });
        },
        C = function (e, t) {
          var n = e || [],
            r = t || '、';
          return null != n && n.length
            ? n
                .map(function (e) {
                  return e.name;
                })
                .join(r)
            : '';
        },
        I = function (e) {
          return e
            ? e.replace(/{##([^{}]+)##}/g, function () {
                return '<span style="color:#00CC7E">'.concat(
                  arguments.length <= 1 ? void 0 : arguments[1],
                  '</span>',
                );
              })
            : '';
        };
      ((t.getClassroomTypeText = function (e, t) {
        return 0 === e ? '线下课程' : s.default.MODE_TYPE_TEXT[t];
      }),
        (t.formatTermTime = function (e, t) {
          return e === s.default.UNDETERMINDED_STARTTIME || t === s.default.UNDETERMINDED_ENDTIME
            ? '待定'
            : e
              ? ''
                  .concat((0, i.default)(e).format('YYYY-MM-DD'), ' 至 ')
                  .concat((0, i.default)(t).format('YYYY-MM-DD'))
              : '待定';
        }),
        (t.default = {
          formatCourseData: function (e) {
            var t,
              n = a.default.COURSE.COURSE_CARD_TYPE,
              r = n.KAOYAN,
              i = n.PACKAGES,
              s = n.COLUMN,
              u = n.MOOC,
              c = n.ADULT;
            if (!e || !e.type) return (console.warn('请传入卡片类型'), !1);
            var E = '';
            e.highlightContent &&
              ((E = e.highlightContent.startsWith('spContent')
                ? e.highlightContent.slice(10)
                : e.highlightContent),
              (E = I(E)));
            var l = h(
              h(
                h(
                  h(
                    h({}, r, function (e) {
                      var t,
                        n = e.mocCourseKyCardBulkPurchaseVo,
                        i = [{ id: n.staffId, name: n.teacherName }],
                        a = null !== (t = n.tags) && void 0 !== t && t.length ? n.tags : [];
                      return f(
                        f({ type: e.type }, n),
                        {},
                        {
                          name: n.courseName,
                          teachers: i,
                          teacherStr: C(i),
                          cover: p(n.bigPhoto, 230, 130),
                          originalSizeCover: _.default.formatImage(n.bigPhoto),
                          coverWap: p(n.bigPhoto, 260, 180),
                          introUrl: Y(r, n.termId),
                          orderedCount: n.orderedCount || n.enrollNum || 0,
                          enrollNum: n.orderedCount || n.enrollNum || 0,
                          tags: a,
                          tagStr: C(a, '/'),
                          toDetail: function (e, t) {
                            !(function (e, t) {
                              if (
                                e.isHasCourseRecommendTarget &&
                                1 === e.courseRecommendTargetType &&
                                O.ua.isWebView()
                              ) {
                                var n = O.ua.isWap() ? 'Moc.Wap' : 'Moc.Web',
                                  r = O.ua.isWap() ? 'MocWappd' : 'MocWebpd',
                                  i = 'https://ke.study.163.com/course/detail/'
                                    .concat(e.courseRecommendTargetId, '?inLoc=')
                                    .concat(r, '&Pdt=')
                                    .concat(n, '&outVendor=')
                                    .concat(t);
                                m(i);
                              } else {
                                if (t) {
                                  var a = e.introUrl.indexOf('?') > -1 ? '&' : '?';
                                  e.introUrl = ''
                                    .concat(e.introUrl)
                                    .concat(a, 'outVendor=')
                                    .concat(t);
                                }
                                if (!O.ua.isWebView())
                                  return O.ua.isWap()
                                    ? (e.introUrl &&
                                        e.introUrl.includes('study.163.com/') &&
                                        (e.introUrl =
                                          'https://www.icourse163.org/passport/adult/changeEduCookies.htm?single=false&returnUrl='.concat(
                                            o.Base64.encode(e.introUrl),
                                          )),
                                      void (window.location.href = e.introUrl))
                                    : void window.open(e.introUrl, '_blank');
                                S(e);
                              }
                            })(e, t);
                          },
                        },
                      );
                    }),
                    i,
                    function (e) {
                      var t,
                        n,
                        r = e.mocCPkgKyCardBulkPurchInfoVo,
                        o = null !== (t = r.teachers) && void 0 !== t && t.length ? r.teachers : [],
                        a = null !== (n = r.tags) && void 0 !== n && n.length ? r.tags : [];
                      return f(
                        f({ type: e.type }, r),
                        {},
                        {
                          topTags: [{ name: ''.concat(r.termNum, '门课') }],
                          cover: p(r.coverPhoto, 230, 130),
                          originalSizeCover: _.default.formatImage(r.coverPhoto),
                          coverWap: p(r.coverPhoto, 260, 180),
                          introUrl: Y(i, r.packageId),
                          orderedCount: r.orderedCount || r.enrollNum || 0,
                          enrollNum: r.orderedCount || r.enrollNum || 0,
                          teachers: o,
                          teacherStr: C(o),
                          tags: a,
                          tagStr: C(a, '/'),
                          toDetail: function (e, t) {
                            if (O.ua.isWebView()) S(e);
                            else {
                              if (t) {
                                var n = e.introUrl.indexOf('?') > -1 ? '&' : '?';
                                e.introUrl = ''
                                  .concat(e.introUrl)
                                  .concat(n, 'outVendor=')
                                  .concat(t);
                              }
                              O.ua.isWap()
                                ? (location.href = e.introUrl)
                                : window.open(e.introUrl, '_blank');
                            }
                          },
                        },
                      );
                    },
                  ),
                  s,
                  function (e) {
                    var t = e.columnVo,
                      n =
                        null != t && t.mocRestrictedPurchaseCardDto
                          ? y(t.mocRestrictedPurchaseCardDto)
                          : null,
                      r = [{ id: t.columnistId, name: t.columnist }];
                    return f(
                      f(f({ type: e.type }, t), n),
                      {},
                      {
                        id: t.columnId,
                        name: t.columnName,
                        teachers: r,
                        teacherStr: C(r),
                        orderedCount: t.orderedCount || 0,
                        enrollNum: t.orderedCount || 0,
                        tags: t.mocTagDtos,
                        tagStr: '',
                        cover: p(t.columnCoverPictureUrl, 230, 130),
                        originalSizeCover: _.default.formatImage(t.columnCoverPictureUrl),
                        coverWap: p(t.columnCoverPictureUrl, 260, 180),
                        introUrl: Y(s, t.columnId),
                        toDetail: function (e, t) {
                          if (O.ua.isWebView()) {
                            var n = { columnId: e.id, enrolled: !!e.isEnroll };
                            O.app.invokeDetailPage(a.default.COURSE.COURSE_TYPE.COLUMN, n);
                          }
                          if (t) {
                            var r = e.introUrl.indexOf('?') > -1 ? '&' : '?';
                            e.introUrl = ''.concat(e.introUrl).concat(r, 'outVendor=').concat(t);
                          }
                          O.ua.isWap()
                            ? (location.href = e.introUrl)
                            : window.open(e.introUrl, '_blank');
                        },
                      },
                    );
                  },
                ),
                u,
                function (e) {
                  var t = e.mocCourseBaseCardVo,
                    n = A(t.startTime, t.endTime, t.closeVisableStatus),
                    r = [{ id: t.teacherId, name: t.teacherName }],
                    o = (function (e, t) {
                      var n,
                        r = a.default.COURSE.MODE_TYPE.MOOC,
                        o = e || [];
                      return t && t > r
                        ? [{ name: 'SPOC' }].concat(
                            (function (e) {
                              if (Array.isArray(e)) return T(e);
                            })((n = o)) ||
                              (function (e) {
                                if (
                                  ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
                                  null != e['@@iterator']
                                )
                                  return Array.from(e);
                              })(n) ||
                              (function (e, t) {
                                if (e) {
                                  if ('string' == typeof e) return T(e, t);
                                  var n = {}.toString.call(e).slice(8, -1);
                                  return (
                                    'Object' === n && e.constructor && (n = e.constructor.name),
                                    'Map' === n || 'Set' === n
                                      ? Array.from(e)
                                      : 'Arguments' === n ||
                                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                                        ? T(e, t)
                                        : void 0
                                  );
                                }
                              })(n) ||
                              (function () {
                                throw new TypeError(
                                  'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                                );
                              })(),
                          )
                        : o;
                    })(t.tags, t.mode);
                  return f(
                    f({ type: e.type }, t),
                    {},
                    {
                      cover: p(t.bigPhoto, 230, 130),
                      originalSizeCover: _.default.formatImage(t.bigPhoto),
                      coverWap: p(t.bigPhoto, 260, 180),
                      introUrl: N({
                        mode: t.mode,
                        courseId: t.id,
                        shortName: t.shortName,
                        schoolSN: t.schoolSN,
                      }),
                      teachers: r,
                      teacherStr: C(r),
                      orderedCount: t.enrollCount || 0,
                      enrollNum: t.enrollCount || 0,
                      tags: o,
                      topTags: o.slice(0, 1),
                      termProgress: null != n ? n : {},
                      toDetail: function (e, t) {
                        if (O.ua.isWebView()) {
                          var n = { courseId: e.id, termId: e.currentTermId };
                          O.app.invokeDetailPage(a.default.COURSE.COURSE_TYPE.MOOC, n);
                        } else {
                          if (t) {
                            var r = e.introUrl.indexOf('?') > -1 ? '&' : '?';
                            e.introUrl = ''.concat(e.introUrl).concat(r, 'outVendor=').concat(t);
                          }
                          if (O.ua.isWap()) return void (location.href = e.introUrl);
                          window.open(e.introUrl, '_blank');
                        }
                      },
                    },
                  );
                },
              ),
              c,
              function (e) {
                var t,
                  n,
                  r = (null == e ? void 0 : e.adultCourseCardDto) || {},
                  o = null !== (t = r.teacherList) && void 0 !== t && t.length ? r.teacherList : [],
                  i = null !== (n = r.tags) && void 0 !== n && n.length ? r.tags : [];
                return f(
                  f({ type: e.type }, r),
                  {},
                  {
                    name: r.courseTitle,
                    cover: p(r.showImage, 230, 130),
                    originalSizeCover: _.default.formatImage(r.showImage),
                    coverWap: p(r.showImage, 260, 180),
                    introUrl: '',
                    teachers: o,
                    teacherStr: C(o),
                    orderedCount: r.courseSaleNum || 0,
                    enrollNum: r.courseSaleNum || 0,
                    tags: i,
                    tagStr: C(i, '/'),
                    toDetail: function (e, t, n) {
                      var o = n ? 'Moc.Wap' : 'Moc.Web',
                        i = n ? 'MocWappd' : 'MocWebpd',
                        a = n
                          ? 'https://ke.study.163.com/wap/course/detail/'
                              .concat(r.id, '?inLoc=')
                              .concat(i, '&Pdt=')
                              .concat(o, '&outVendor=')
                              .concat(t)
                          : 'https://ke.study.163.com/course/detail/'
                              .concat(r.id, '?inLoc=')
                              .concat(i, '&Pdt=')
                              .concat(o, '&outVendor=')
                              .concat(t);
                      n ? m(a) : window.open(a, '_blank');
                    },
                  },
                );
              },
            );
            return null === (t = l[e.type]) || void 0 === t ? void 0 : t.call(l, e);
          },
          formatMoocTermProgress: A,
          formatSearchedCourseData: function (e) {
            var t = a.default.COURSE.COURSE_CARD_TYPE,
              n = t.KAOYAN,
              r = t.PACKAGES,
              o = t.COLUMN,
              i = t.MOOC;
            if (!e || !e.type) return (console.warn('请传入卡片类型'), !1);
            var s = '';
            return (
              e.highlightContent &&
                ((s = e.highlightContent.startsWith('spContent')
                  ? e.highlightContent.slice(10)
                  : e.highlightContent),
                (s = I(s))),
              h(
                h(
                  h(
                    h({}, n, function (e) {
                      var t = e.mocCourseKyCardBaseInfoDto || {};
                      return f(
                        f({ type: e.type }, t),
                        {},
                        {
                          cover: p(t.bigPhoto, 230, 130),
                          coverWap: p(t.bigPhoto, 130, 90),
                          introUrl: Y(n, null == t ? void 0 : t.termId),
                        },
                      );
                    }),
                    r,
                    function (e) {
                      var t,
                        n = e.mocCoursePackageKyCardBaseInfoDto;
                      return f(
                        f({ type: e.type }, n),
                        {},
                        {
                          courseId: n.packageId,
                          courseName: n.name,
                          topTags: [{ name: ''.concat(n.termNum, '门课'), colour: '#4C8EFF' }],
                          cover: p(n.coverPhoto, 230, 130),
                          coverWap: p(n.coverPhoto, 130, 90),
                          introUrl: Y(r, n.packageId),
                          teacherName:
                            ((t = n.teachers),
                            t
                              ? (t || [])
                                  .map(function (e) {
                                    return e.name;
                                  })
                                  .join(';')
                              : ''),
                          orderedCount: n.orderedCount || n.enrollNum || 0,
                        },
                      );
                    },
                  ),
                  o,
                  function (e) {
                    var t = e.columnVo,
                      n =
                        null != t && t.mocRestrictedPurchaseCardDto
                          ? y(t.mocRestrictedPurchaseCardDto)
                          : null;
                    return f(
                      f(f({ type: e.type }, t), n),
                      {},
                      {
                        columnId: t.columnId,
                        columnName: t.columnName,
                        courseId: t.courseId,
                        courseName: t.columnName,
                        teachers: [{ id: t.columnistId, name: t.columnist }],
                        orderedCount: t.orderedCount || 0,
                        teacherName: t.columnist,
                        tags: t.mocTagDtos,
                        cover: p(t.columnCoverPictureUrl, 230, 130),
                        coverWap: p(t.columnCoverPictureUrl, 130, 90),
                        introUrl: Y(o, t.columnId),
                      },
                    );
                  },
                ),
                i,
                function (e) {
                  var t,
                    n,
                    r = e.mocCourseCard || {},
                    o = (null == r ? void 0 : r.mocCourseCardDto) || {};
                  return o
                    ? f(
                        f({ type: e.type }, o),
                        {},
                        {
                          courseId: o.id,
                          courseName: o.name,
                          cover: p(o.imgUrl, 230, 130),
                          coverWap: p(o.imgUrl, 130, 90),
                          introUrl: N({
                            mode: o.mode,
                            courseId: o.id,
                            schoolSN:
                              null == o || null === (t = o.schoolPanel) || void 0 === t
                                ? void 0
                                : t.shortName,
                          }),
                          schoolName:
                            null == o || null === (n = o.schoolPanel) || void 0 === n
                              ? void 0
                              : n.name,
                          teacherName: r.highlightTeacherNames.slice(
                            0,
                            r.highlightTeacherNames.length - 1,
                          ),
                        },
                      )
                    : null;
                },
              )[e.type](e)
            );
          },
          getKaoYanIntroLink: Y,
          getMoocIntroLink: N,
          getCourseIntroLink: function (e, t, n, r) {
            var o,
              i = a.default.COURSE.COURSE_CARD_TYPE,
              s = i.KAOYAN,
              _ = i.PACKAGES,
              u = i.COLUMN,
              c = i.MOOC;
            return (
              (null ===
                (o = [
                  { type: s, link: '//kaoyan.icourse163.org/course/terms/'.concat(t, '.htm') },
                  { type: _, link: '//kaoyan.icourse163.org/course/packages/'.concat(t, '.htm') },
                  { type: u, link: '//www.icourse163.org/columns/'.concat(t, '.htm') },
                  {
                    type: c,
                    link: r
                      ? '//www.icourse163.org/course/'.concat(r, '-').concat(t)
                      : '//www.icourse163.org/course/'.concat(n, '.htm?tid=').concat(t),
                  },
                ].find(function (t) {
                  return t.type === e;
                })) || void 0 === o
                ? void 0
                : o.link) || ''
            );
          },
          formatHighlightContent: I,
          getMoocLearnLink: function (e) {
            var t = e.mode,
              n = e.courseId,
              r = e.shortName,
              o = e.schoolSN,
              i = a.default.COURSE.MODE_TYPE.MOOC,
              s = a.default.URL_PREFIX,
              _ = s.COURSE_LEARN_PREFIX,
              u = s.SPOC_COURSE_LEARN_PREFIX;
            return ''
              .concat(t && t > i ? u : _)
              .concat(r || o, '-')
              .concat(n);
          },
          getMoocCourseIntroLink: function (e, t, n) {
            return n
              ? '//www.icourse163.org/course/'.concat(n, '-').concat(e)
              : '//www.icourse163.org/course/'.concat(e, '.htm?tid=').concat(t);
          },
        }));
    },
    903617: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.downloadFile = t.default = t.dataURLtoFile = void 0));
      var n = (t.dataURLtoFile = function (e, t) {
          for (
            var n = e.split(','),
              r = n[0].match(/:(.*?);/)[1],
              o = atob(n[1]),
              i = o.length,
              a = new Uint8Array(i);
            i--;
          )
            a[i] = o.charCodeAt(i);
          return new File([a], t, { type: r });
        }),
        r = (t.downloadFile = function (e) {
          var t = e.startsWith('http') ? e.replace(/https?:/, '') : e,
            n = document.createElement('a');
          (n.setAttribute('href', t), n.setAttribute('target', '_blank'), n.click());
        });
      t.default = {
        dataURLtoFile: n,
        downloadFile: r,
        getFileSize: function (e) {
          if (0 === e) return '0 B';
          if (e) {
            var t = Math.floor(Math.log(e) / Math.log(1024));
            return ''
              .concat((e / Math.pow(1024, t)).toFixed(2), ' ')
              .concat(['B', 'KB', 'MB', 'GB', 'TB'][t]);
          }
        },
      };
    },
    534168: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = function () {
          var e = document.documentElement;
          function t() {
            var t = e.clientWidth / 10;
            e.style.fontSize = ''.concat(t, 'px');
          }
          if (
            (window.addEventListener(
              'resize',
              function () {
                t();
              },
              !1,
            ),
            window.addEventListener(
              'pageshow',
              function (e) {
                e.persisted && t();
              },
              !1,
            ),
            t(),
            window.devicePixelRatio && window.devicePixelRatio >= 2)
          ) {
            var n = document.createElement('div'),
              r = document.createElement('body');
            ((n.style.border = '0.5px solid transparent'),
              r.appendChild(n),
              e.appendChild(r),
              1 === n.offsetHeight && e.classList.add('hairlines'),
              e.removeChild(r));
          }
        }));
    },
    740720: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.tryDecodeURI = t.transformLatexToImg = t.transformLatex = t.escape2Html = void 0));
      var r,
        o = (r = n(589890)) && r.__esModule ? r : { default: r },
        i = n(808127);
      function a() {
        var e,
          t,
          n = 'function' == typeof Symbol ? Symbol : {},
          r = n.iterator || '@@iterator',
          o = n.toStringTag || '@@toStringTag';
        function i(n, r, o, i) {
          var a = r && r.prototype instanceof u ? r : u,
            c = Object.create(a.prototype);
          return (
            s(
              c,
              '_invoke',
              (function (n, r, o) {
                var i,
                  a,
                  s,
                  u = 0,
                  c = o || [],
                  E = !1,
                  l = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, n) {
                      return ((i = t), (a = 0), (s = e), (l.n = n), _);
                    },
                  };
                function d(n, r) {
                  for (a = n, s = r, t = 0; !E && u && !o && t < c.length; t++) {
                    var o,
                      i = c[t],
                      d = l.p,
                      f = i[2];
                    n > 3
                      ? (o = f === r) && ((s = i[(a = i[4]) ? 5 : ((a = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= d &&
                        ((o = n < 2 && d < i[1])
                          ? ((a = 0), (l.v = r), (l.n = i[1]))
                          : d < f &&
                            (o = n < 3 || i[0] > r || r > f) &&
                            ((i[4] = n), (i[5] = r), (l.n = f), (a = 0)));
                  }
                  if (o || n > 1) return _;
                  throw ((E = !0), r);
                }
                return function (o, c, f) {
                  if (u > 1) throw TypeError('Generator is already running');
                  for (E && 1 === c && d(c, f), a = c, s = f; (t = a < 2 ? e : s) || !E;) {
                    i || (a ? (a < 3 ? (a > 1 && (l.n = -1), d(a, s)) : (l.n = s)) : (l.v = s));
                    try {
                      if (((u = 2), i)) {
                        if ((a || (o = 'next'), (t = i[o]))) {
                          if (!(t = t.call(i, s)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((s = t.value), a < 2 && (a = 0));
                        } else
                          (1 === a && (t = i.return) && t.call(i),
                            a < 2 &&
                              ((s = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (a = 1)));
                        i = e;
                      } else if ((t = (E = l.n < 0) ? s : n.call(r, l)) !== _) break;
                    } catch (t) {
                      ((i = e), (a = 1), (s = t));
                    } finally {
                      u = 1;
                    }
                  }
                  return { value: t, done: E };
                };
              })(n, o, i),
              !0,
            ),
            c
          );
        }
        var _ = {};
        function u() {}
        function c() {}
        function E() {}
        t = Object.getPrototypeOf;
        var l = [][r]
            ? t(t([][r]()))
            : (s((t = {}), r, function () {
                return this;
              }),
              t),
          d = (E.prototype = u.prototype = Object.create(l));
        function f(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, E)
              : ((e.__proto__ = E), s(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(d)),
            e
          );
        }
        return (
          (c.prototype = E),
          s(d, 'constructor', E),
          s(E, 'constructor', c),
          (c.displayName = 'GeneratorFunction'),
          s(E, o, 'GeneratorFunction'),
          s(d),
          s(d, o, 'Generator'),
          s(d, r, function () {
            return this;
          }),
          s(d, 'toString', function () {
            return '[object Generator]';
          }),
          (a = function () {
            return { w: i, m: f };
          })()
        );
      }
      function s(e, t, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((s = function (e, t, n, r) {
          function i(t, n) {
            s(e, t, function (e) {
              return this._invoke(t, n, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: n, enumerable: !r, configurable: !r, writable: !r })
              : (e[t] = n)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          s(e, t, n, r));
      }
      function _(e, t, n, r, o, i, a) {
        try {
          var s = e[i](a),
            _ = s.value;
        } catch (e) {
          return void n(e);
        }
        s.done ? t(_) : Promise.resolve(_).then(r, o);
      }
      var u = (t.tryDecodeURI = function (e) {
          try {
            return decodeURI(e);
          } catch (t) {
            return (console.log('decode出错，原封返回'), e);
          }
        }),
        c = (t.escape2Html = function (e) {
          return null != e && e.length
            ? e
                .trim()
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&nbsp;/g, ' ')
                .replace(/&#39;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/\$+/g, '$')
                .replace(/\\overparen/g, '\\overgroup')
                .replace(/@{[^{}]*}/g, '')
                .replace(/\\rm\b/g, '')
                .replace(/\\symnormal\b/g, '')
                .replace(/\\symup\b/g, '')
                .replace(/\\symit\b/g, '')
                .replace(/\\symsf\b/g, '')
                .replace(/\\symtt\b/g, '')
                .replace(/\\symbb\b/g, '')
                .replace(/\\symcal\b/g, '')
                .replace(/\\symscr\b/g, '')
                .replace(/\\symfrak\b/g, '')
                .replace(/\\symsfup\b/g, '')
                .replace(/\\symsfit\b/g, '')
                .replace(/\\symbfup\b/g, '')
                .replace(/\\symbfit\b/g, '')
                .replace(/\\symbf\b/g, '')
                .replace(new RegExp(''.concat('\b', 'oldsymbol(?=\\s*\\{)'), 'g'), '\\boldsymbol')
                .replace(new RegExp(''.concat('\b', 'egin(?=\\s*\\{)'), 'g'), '\\begin')
            : '';
        }),
        E =
          ((t.transformLatex = function (e) {
            var t = c(e);
            return (t = (t = t.replace(/\\\[([\S\s]*?)\\]/g, function (e, t) {
              return o.default.renderToString(u(t), {
                throwOnError: !1,
                displayMode: !0,
                output: 'html',
              });
            })).replace(/\\\(([\S\s]*?)\\\)/g, function (e, t) {
              return o.default.renderToString(u(t), {
                throwOnError: !1,
                displayMode: !1,
                output: 'html',
              });
            })).replace(/\$([\S\s]*?)\$/g, function (e, t) {
              return o.default.renderToString(u(t), {
                throwOnError: !1,
                displayMode: !1,
                output: 'html',
              });
            });
          }),
          0);
      t.transformLatexToImg = (function () {
        var e,
          t =
            ((e = a().m(function e(t) {
              var n, r, o, s, _, u, c, l, d, f, h;
              return a().w(
                function (e) {
                  for (;;)
                    switch ((e.p = e.n)) {
                      case 0:
                        return (
                          (e.p = 0),
                          (n = []),
                          [/\\\[([\S\s]*?)\\]/g, /\\\(([\S\s]*?)\\\)/g, /\$([\S\s]*?)\$/g].forEach(
                            function (e) {
                              for (var r; null !== (r = e.exec(t));)
                                n.push({ fullMatch: r[0], content: r[1], index: r.index });
                            },
                          ),
                          n.sort(function (e, t) {
                            return e.index - t.index;
                          }),
                          (r = n.map(function (e) {
                            return ((t = e.content),
                            new Promise(function (e, n) {
                              var r,
                                o = 'latexResultShow'.concat(E),
                                a = encodeURIComponent(t),
                                s = '//capture-srv.icourse163.org/image/latex.do?latex='
                                  .concat(a, '&size=18&callback=')
                                  .concat(o);
                              ((window[o] = function (r) {
                                var a = i.Base64.encode(t);
                                if (null != r && r.url) {
                                  var s = r.width,
                                    _ = r.height,
                                    u = r.url;
                                  e({ encodeEditVal: a, url: u, width: s, height: _ });
                                } else n(new Error('获取图片URL失败'));
                                delete window[o];
                              }),
                                ((r = s),
                                new Promise(function (e, t) {
                                  var n = document.createElement('script');
                                  (n.setAttribute('type', 'text/javascript'),
                                    (n.src = r),
                                    (n.onload = function () {
                                      return e();
                                    }),
                                    (n.onerror = t),
                                    document.body.appendChild(n));
                                })).catch(n),
                                E++);
                            })).catch(function (t) {
                              return (console.warn('LaTeX转图片失败:', e.content, t), null);
                            });
                            var t;
                          })),
                          (e.n = 1),
                          Promise.all(r)
                        );
                      case 1:
                        for (o = e.v, s = t, _ = n.length - 1; _ >= 0; _--)
                          ((u = n[_]),
                            (c = u.fullMatch),
                            (l = u.index),
                            null != (d = o[_]) &&
                              d.url &&
                              ((f = '<img src="'
                                .concat(d.url, '" class="kaTex-img-node" id="kaTexImg-')
                                .concat(d.url, '" alt="')
                                .concat(
                                  d.encodeEditVal,
                                  '" style="background-color: #fff;cursor: pointer;" width=',
                                )
                                .concat(d.width, ' height=')
                                .concat(d.height, ' />')),
                              (s = s.substring(0, l) + f + s.substring(l + c.length))));
                        return e.a(2, s);
                      case 2:
                        return (
                          (e.p = 2),
                          (h = e.v),
                          console.error('transformLatexToImg 执行出错:', h),
                          e.a(2, t)
                        );
                    }
                },
                e,
                null,
                [[0, 2]],
              );
            })),
            function () {
              var t = this,
                n = arguments;
              return new Promise(function (r, o) {
                var i = e.apply(t, n);
                function a(e) {
                  _(i, r, o, a, s, 'next', e);
                }
                function s(e) {
                  _(i, r, o, a, s, 'throw', e);
                }
                a(void 0);
              });
            });
        return function (e) {
          return t.apply(this, arguments);
        };
      })();
    },
    196574: (e, t, n) => {
      'use strict';
      function r(e) {
        return (
          (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          r(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.initTrackPV = t.handleGlobalClick = void 0));
      var o,
        i = (o = n(872065)) && o.__esModule ? o : { default: o },
        a = n(295673);
      function s(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          (t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r));
        }
        return n;
      }
      function _(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? s(Object(n), !0).forEach(function (t) {
                u(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : s(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      function u(e, t, n) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != r(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var n = t.call(e, 'string');
                if ('object' != r(n)) return n;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == r(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function c() {
        var e,
          t,
          n = 'function' == typeof Symbol ? Symbol : {},
          r = n.iterator || '@@iterator',
          o = n.toStringTag || '@@toStringTag';
        function i(n, r, o, i) {
          var _ = r && r.prototype instanceof s ? r : s,
            u = Object.create(_.prototype);
          return (
            E(
              u,
              '_invoke',
              (function (n, r, o) {
                var i,
                  s,
                  _,
                  u = 0,
                  c = o || [],
                  E = !1,
                  l = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, n) {
                      return ((i = t), (s = 0), (_ = e), (l.n = n), a);
                    },
                  };
                function d(n, r) {
                  for (s = n, _ = r, t = 0; !E && u && !o && t < c.length; t++) {
                    var o,
                      i = c[t],
                      d = l.p,
                      f = i[2];
                    n > 3
                      ? (o = f === r) && ((_ = i[(s = i[4]) ? 5 : ((s = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= d &&
                        ((o = n < 2 && d < i[1])
                          ? ((s = 0), (l.v = r), (l.n = i[1]))
                          : d < f &&
                            (o = n < 3 || i[0] > r || r > f) &&
                            ((i[4] = n), (i[5] = r), (l.n = f), (s = 0)));
                  }
                  if (o || n > 1) return a;
                  throw ((E = !0), r);
                }
                return function (o, c, f) {
                  if (u > 1) throw TypeError('Generator is already running');
                  for (E && 1 === c && d(c, f), s = c, _ = f; (t = s < 2 ? e : _) || !E;) {
                    i || (s ? (s < 3 ? (s > 1 && (l.n = -1), d(s, _)) : (l.n = _)) : (l.v = _));
                    try {
                      if (((u = 2), i)) {
                        if ((s || (o = 'next'), (t = i[o]))) {
                          if (!(t = t.call(i, _)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((_ = t.value), s < 2 && (s = 0));
                        } else
                          (1 === s && (t = i.return) && t.call(i),
                            s < 2 &&
                              ((_ = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (s = 1)));
                        i = e;
                      } else if ((t = (E = l.n < 0) ? _ : n.call(r, l)) !== a) break;
                    } catch (t) {
                      ((i = e), (s = 1), (_ = t));
                    } finally {
                      u = 1;
                    }
                  }
                  return { value: t, done: E };
                };
              })(n, o, i),
              !0,
            ),
            u
          );
        }
        var a = {};
        function s() {}
        function _() {}
        function u() {}
        t = Object.getPrototypeOf;
        var l = [][r]
            ? t(t([][r]()))
            : (E((t = {}), r, function () {
                return this;
              }),
              t),
          d = (u.prototype = s.prototype = Object.create(l));
        function f(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, u)
              : ((e.__proto__ = u), E(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(d)),
            e
          );
        }
        return (
          (_.prototype = u),
          E(d, 'constructor', u),
          E(u, 'constructor', _),
          (_.displayName = 'GeneratorFunction'),
          E(u, o, 'GeneratorFunction'),
          E(d),
          E(d, o, 'Generator'),
          E(d, r, function () {
            return this;
          }),
          E(d, 'toString', function () {
            return '[object Generator]';
          }),
          (c = function () {
            return { w: i, m: f };
          })()
        );
      }
      function E(e, t, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((E = function (e, t, n, r) {
          function i(t, n) {
            E(e, t, function (e) {
              return this._invoke(t, n, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: n, enumerable: !r, configurable: !r, writable: !r })
              : (e[t] = n)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          E(e, t, n, r));
      }
      function l(e, t, n, r, o, i, a) {
        try {
          var s = e[i](a),
            _ = s.value;
        } catch (e) {
          return void n(e);
        }
        s.done ? t(_) : Promise.resolve(_).then(r, o);
      }
      var d = !1,
        f = 0,
        h = null,
        T = (function () {
          var e,
            t =
              ((e = c().m(function e(t) {
                return c().w(function (e) {
                  for (;;)
                    switch (e.n) {
                      case 0:
                        return (
                          (e.n = 1),
                          (0, a.loadScript)(
                            '//edu-cms.nosdn.127.net/topics/js/hubble_mooc_DATracker.sync.1.6.11_74e3f0b40aa94f8006a013c7db9ac1b1.js',
                          )
                        );
                      case 1:
                        (window.DATracker.init('MA-A976-948FFA05E931', {
                          truncateLength: 255,
                          persistence: 'localStorage',
                          cross_subdomain_cookie: !1,
                          use_app_track: !0,
                        }),
                          O(t));
                      case 2:
                        return e.a(2);
                    }
                }, e);
              })),
              function () {
                var t = this,
                  n = arguments;
                return new Promise(function (r, o) {
                  var i = e.apply(t, n);
                  function a(e) {
                    l(i, r, o, a, s, 'next', e);
                  }
                  function s(e) {
                    l(i, r, o, a, s, 'throw', e);
                  }
                  a(void 0);
                });
              });
          return function (e) {
            return t.apply(this, arguments);
          };
        })(),
        O = function (e) {
          var t;
          if ((h && clearTimeout(h), null !== (t = window) && void 0 !== t && t.DATracker)) {
            var n, r, o;
            if (!e.eventId) return void console.error('hubble打点失败，eventId不能为空', e);
            window.DATracker.track(
              e.eventId,
              _(
                {
                  pagename:
                    (null == e ? void 0 : e.pagename) ||
                    (null === (n = window) || void 0 === n ? void 0 : n.pageName),
                  user_id:
                    (null == e ? void 0 : e.user_id) ||
                    (null === (r = window) ||
                    void 0 === r ||
                    null === (o = r.webUser) ||
                    void 0 === o
                      ? void 0
                      : o.id) ||
                    '',
                  web_device_id: i.default.getValueByKey('EDUWEBDEVICE', document) || '-1',
                },
                e,
              ),
            );
          } else
            f
              ? T(e)
              : (h = setTimeout(function () {
                  (f++, O(e));
                }, 2e3));
        },
        m =
          ((t.handleGlobalClick = function (e) {
            var t,
              n,
              r = e.target instanceof Element ? e.target.closest('[data-track-click]') : null;
            if (r && !1 !== e.isTrusted) {
              var o = null === (t = r.dataset) || void 0 === t ? void 0 : t.trackClick;
              if (o) {
                var i = JSON.parse(
                  (null === (n = r.dataset) || void 0 === n ? void 0 : n.trackParams) || '{}',
                );
                O(_(_({}, i), {}, { eventId: o }));
              } else console.error('hubble打点失败，eventId不能为空', o);
            }
          }),
          'undefined' != typeof window && 'IntersectionObserver' in window
            ? new IntersectionObserver(
                function (e, t) {
                  e.forEach(function (e) {
                    if (e.isIntersecting) {
                      var n = e.target,
                        r = n.dataset.trackPv,
                        o = n.dataset.trackParams;
                      if ('[object Object]' === o)
                        console.error(
                          'hubble打点失败，trackParams格式错误，需要用JSON.stringify包裹,eventId:',
                          r,
                        );
                      else {
                        if (!r) return void console.error('hubble打点失败，eventId不能为空', r);
                        var i = JSON.parse(o || '{}');
                        O(_(_({}, i), {}, { eventId: r }));
                      }
                      t.unobserve(n);
                    }
                  });
                },
                { threshold: 0.5 },
              )
            : null);
      t.initTrackPV = function () {
        if (!d && m)
          try {
            var e = document.querySelectorAll('[data-track-pv]');
            ((d = !0),
              e.forEach(function (e) {
                m.observe(e);
              }));
            var t = new MutationObserver(function (e) {
                e.forEach(function (e) {
                  e.addedNodes.forEach(function (e) {
                    try {
                      e.nodeType === Node.ELEMENT_NODE &&
                        (e.querySelectorAll('[data-track-pv]').forEach(function (e) {
                          m.observe(e);
                        }),
                        e.hasAttribute && e.hasAttribute('data-track-pv') && m.observe(e));
                    } catch (e) {
                      console.warn('处理新增节点时出错:', e);
                    }
                  });
                });
              }),
              n = document.querySelectorAll('.ant-tabs, .ant-modal-content');
            return (
              n.length > 0 &&
                n.forEach(function (e) {
                  t.observe(e, { childList: !0, attributes: !0, subtree: !0 });
                }),
              function () {
                t.disconnect();
              }
            );
          } catch (e) {
            console.warn('初始化 TrackPV 失败:', e);
          }
      };
    },
    603190: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var r,
        o = (r = n(959306)) && r.__esModule ? r : { default: r };
      function i() {
        var e,
          t,
          n = 'function' == typeof Symbol ? Symbol : {},
          r = n.iterator || '@@iterator',
          o = n.toStringTag || '@@toStringTag';
        function s(n, r, o, i) {
          var s = r && r.prototype instanceof u ? r : u,
            c = Object.create(s.prototype);
          return (
            a(
              c,
              '_invoke',
              (function (n, r, o) {
                var i,
                  a,
                  s,
                  u = 0,
                  c = o || [],
                  E = !1,
                  l = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, n) {
                      return ((i = t), (a = 0), (s = e), (l.n = n), _);
                    },
                  };
                function d(n, r) {
                  for (a = n, s = r, t = 0; !E && u && !o && t < c.length; t++) {
                    var o,
                      i = c[t],
                      d = l.p,
                      f = i[2];
                    n > 3
                      ? (o = f === r) && ((s = i[(a = i[4]) ? 5 : ((a = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= d &&
                        ((o = n < 2 && d < i[1])
                          ? ((a = 0), (l.v = r), (l.n = i[1]))
                          : d < f &&
                            (o = n < 3 || i[0] > r || r > f) &&
                            ((i[4] = n), (i[5] = r), (l.n = f), (a = 0)));
                  }
                  if (o || n > 1) return _;
                  throw ((E = !0), r);
                }
                return function (o, c, f) {
                  if (u > 1) throw TypeError('Generator is already running');
                  for (E && 1 === c && d(c, f), a = c, s = f; (t = a < 2 ? e : s) || !E;) {
                    i || (a ? (a < 3 ? (a > 1 && (l.n = -1), d(a, s)) : (l.n = s)) : (l.v = s));
                    try {
                      if (((u = 2), i)) {
                        if ((a || (o = 'next'), (t = i[o]))) {
                          if (!(t = t.call(i, s)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((s = t.value), a < 2 && (a = 0));
                        } else
                          (1 === a && (t = i.return) && t.call(i),
                            a < 2 &&
                              ((s = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (a = 1)));
                        i = e;
                      } else if ((t = (E = l.n < 0) ? s : n.call(r, l)) !== _) break;
                    } catch (t) {
                      ((i = e), (a = 1), (s = t));
                    } finally {
                      u = 1;
                    }
                  }
                  return { value: t, done: E };
                };
              })(n, o, i),
              !0,
            ),
            c
          );
        }
        var _ = {};
        function u() {}
        function c() {}
        function E() {}
        t = Object.getPrototypeOf;
        var l = [][r]
            ? t(t([][r]()))
            : (a((t = {}), r, function () {
                return this;
              }),
              t),
          d = (E.prototype = u.prototype = Object.create(l));
        function f(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, E)
              : ((e.__proto__ = E), a(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(d)),
            e
          );
        }
        return (
          (c.prototype = E),
          a(d, 'constructor', E),
          a(E, 'constructor', c),
          (c.displayName = 'GeneratorFunction'),
          a(E, o, 'GeneratorFunction'),
          a(d),
          a(d, o, 'Generator'),
          a(d, r, function () {
            return this;
          }),
          a(d, 'toString', function () {
            return '[object Generator]';
          }),
          (i = function () {
            return { w: s, m: f };
          })()
        );
      }
      function a(e, t, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((a = function (e, t, n, r) {
          function i(t, n) {
            a(e, t, function (e) {
              return this._invoke(t, n, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: n, enumerable: !r, configurable: !r, writable: !r })
              : (e[t] = n)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          a(e, t, n, r));
      }
      function s(e, t, n, r, o, i, a) {
        try {
          var s = e[i](a),
            _ = s.value;
        } catch (e) {
          return void n(e);
        }
        s.done ? t(_) : Promise.resolve(_).then(r, o);
      }
      var _ = new RegExp('^(http://|https://|//)nos.netease.com/'),
        u = new RegExp('^(http://|https://|//)edu-image.nosdn.127.net'),
        c = new RegExp('^(http://|https://|//)mooc-image.nosdn.127.net'),
        E = new RegExp('^(http://|https://|//)img[0-9]*.ph.126.net'),
        l = new RegExp('^(http://|https://|//)img-ph-mirror.nosdn.127.net'),
        d = new RegExp('^(http://|https://|//)imgsize.ph.126.net'),
        f = new RegExp('^data:image/'),
        h = (function () {
          var e;
          try {
            e =
              0 ==
              document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp');
          } catch (t) {
            e = !1;
          }
          return function () {
            return e;
          };
        })(),
        T = function (e) {
          var t, n, r, i;
          return u.test(e) || l.test(e) || _.test(e)
            ? ((i = e.substring(e.lastIndexOf('.'))),
              (r = new RegExp(/^\.gif/)),
              !h() || r.test(i)
                ? e
                : ((n = e.split('?') || [])[0],
                  (t = n[1] || ''),
                  null != o.default.query2object(t).imageView
                    ? ''.concat(e, '&type=webp')
                    : ''.concat(e + (t ? '&' : '?'), 'imageView&type=webp')))
            : e;
        },
        O = (function () {
          var e,
            t =
              ((e = i().m(function e(t, n) {
                var r,
                  o,
                  a,
                  s,
                  _,
                  u,
                  c,
                  E,
                  l,
                  d,
                  f,
                  h = arguments;
                return i().w(
                  function (e) {
                    for (;;)
                      switch ((e.p = e.n)) {
                        case 0:
                          return (
                            (r = h.length > 2 && void 0 !== h[2] && h[2]),
                            (o = 1920),
                            (e.p = 1),
                            (a = document.createElement('canvas')),
                            (s = a.getContext('2d')),
                            (_ = URL.createObjectURL(t)),
                            ((u = new Image()).src = _),
                            (e.n = 2),
                            new Promise(function (e) {
                              u.onload = e;
                            })
                          );
                        case 2:
                          return (
                            (c = u.width),
                            (E = u.height),
                            (a.width = c),
                            (a.height = E),
                            r &&
                              ((c = u.width * n),
                              (E = u.height * n),
                              Math.max(c, E) > o &&
                                (c > E
                                  ? ((E = (E * o) / c), (c = o))
                                  : ((c = (c * o) / E), (E = o))),
                              (a.width = c),
                              (a.height = E)),
                            s.drawImage(u, 0, 0, c, E),
                            (e.n = 3),
                            new Promise(function (e, t) {
                              a.toBlob(
                                function (t) {
                                  e(t);
                                },
                                'image/jpeg',
                                n,
                              );
                            })
                          );
                        case 3:
                          return (
                            (l = e.v),
                            (d = new File([l], t.name, { type: t.type })),
                            URL.revokeObjectURL(_),
                            e.a(2, d)
                          );
                        case 4:
                          return ((e.p = 4), (f = e.v), console.error(f), e.a(2));
                      }
                  },
                  e,
                  null,
                  [[1, 4]],
                );
              })),
              function () {
                var t = this,
                  n = arguments;
                return new Promise(function (r, o) {
                  var i = e.apply(t, n);
                  function a(e) {
                    s(i, r, o, a, _, 'next', e);
                  }
                  function _(e) {
                    s(i, r, o, a, _, 'throw', e);
                  }
                  a(void 0);
                });
              });
          return function (e, n) {
            return t.apply(this, arguments);
          };
        })();
      t.default = {
        scaleImage: function (e, t, n, r, o, i, a) {
          var s, h;
          if (
            !e ||
            f.test(e) ||
            !(function (e) {
              return !!(u.test(e) || _.test(e) || l.test(e) || E.test(e) || d.test(e) || c.test(e));
            })(e)
          )
            return e;
          var O = (e.match(/(\S*)\/\//) || [])[1];
          ((e = e.replace(/^(http:|https:)/, '')),
            d.test(e) && ((h = e.match(/imgurl=(\S*)_/)), (e = h[1])),
            (s = (function (e) {
              if (_.test(e))
                'edu-image' == (t = e.split('/'))[3] &&
                  ((t[2] = 'edu-image.nosdn.127.net'), t.splice(3, 1), (e = t.join('/')));
              else if (E.test(e)) {
                var t;
                ((t = e.split('/')).splice(0, 3),
                  t.unshift('//img-ph-mirror.nosdn.127.net'),
                  (e = t.join('/')));
              }
              return e;
            })(e)));
          var m = s.substring(s.lastIndexOf('.'));
          return (
            (new RegExp(/(^\.gif|^\.svg)/).test(m) && !r) ||
              ((t || n || o) &&
                (s =
                  u.test(s) || l.test(s) || _.test(s) || c.test(s)
                    ? (function (e, t, n, r) {
                        var o,
                          a,
                          s,
                          _ = '';
                        if (
                          (t &&
                            n &&
                            (_ = '&thumbnail='
                              .concat(t)
                              .concat(i || 'y')
                              .concat(n)),
                          (a = (e.split('?') || [])[0]),
                          (o = e.split('?')[1] || '') && -1 == o.indexOf('imageView'))
                        )
                          a = ''.concat(e + (o ? '&' : '?'), 'imageView').concat(_, '&quality=100');
                        else {
                          s = o ? o.split('&') : [];
                          for (var u = 0; u < s.length; u++)
                            (-1 == s[u].indexOf('thumbnail') &&
                              -1 == s[u].indexOf('imageView') &&
                              -1 == s[u].indexOf('quality')) ||
                              (s.splice(u, 1), (u -= 1));
                          a = ''
                            .concat(a, '?imageView&quality=100')
                            .concat(s.length > 0 ? '&'.concat(s.join('&')) : '')
                            .concat(_);
                        }
                        return (r && (a += '&'.concat(r)), a);
                      })(s, t, n, o)
                    : (function (e, t, n) {
                        var r;
                        return (
                          (r = e.substring(e.lastIndexOf('.'))),
                          t &&
                            n &&
                            (e = ''
                              .concat('//imgsize.ph.126.net/?enlarge=true&imgurl=' + O + e, '_')
                              .concat(t, 'x')
                              .concat(n, 'x')
                              .concat('1x95')
                              .concat(r)),
                          e
                        );
                      })(s, t, n)),
              a && (s = T(s))),
            s
          );
        },
        formatImage: function (e) {
          var t,
            n,
            r,
            o,
            i = {};
          return u.test(e) || l.test(e) || _.test(e)
            ? ((o = e.substring(e.lastIndexOf('.'))),
              (r = new RegExp(/^\.gif/)),
              !h() || r.test(o)
                ? e
                : ((n = e.split('?') || [])[0],
                  (t = n[1] || '').split('&').forEach(function (e) {
                    var t = e.split('=');
                    i[t[0]] = t[1] || '';
                  }),
                  null != i.imageView
                    ? ''.concat(e, '&type=webp')
                    : ''.concat(e + (t ? '&' : '?'), 'imageView&type=webp')))
            : e;
        },
        convertToWebP: T,
        formateImagePrefix: function (e) {
          if (e)
            return e
              .replace(/img[0-9].ph.126.net/g, 'img-ph-mirror.nosdn.127.net')
              .replace('nos.netease.com/edu-image', 'edu-image.nosdn.127.net');
        },
        compressImgQuality: O,
        formatImageUrl: function (e, t) {
          return 'https://'.concat(e, '.nosdn.127.net/').concat(t, '?imageView&quality=100');
        },
      };
    },
    200891: (e, t, n) => {
      'use strict';
      function r(e) {
        return (
          (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          r(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o = A(n(872065)),
        i = A(n(883270)),
        a = A(n(534168)),
        s = A(n(603190)),
        _ = A(n(179885)),
        u = A(n(693946)),
        c = A(n(276786)),
        E = A(n(2339)),
        l = A(n(820658)),
        d = A(n(959306)),
        f = A(n(903617)),
        h = A(n(204194)),
        T = A(n(88748)),
        O = A(n(495709)),
        m = p(n(196574)),
        S = p(n(740720));
      function p(e, t) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            o = new WeakMap();
        return (p = function (e, t) {
          if (!t && e && e.__esModule) return e;
          var i,
            a,
            s = { __proto__: null, default: e };
          if (null === e || ('object' != r(e) && 'function' != typeof e)) return s;
          if ((i = t ? o : n)) {
            if (i.has(e)) return i.get(e);
            i.set(e, s);
          }
          for (var _ in e)
            'default' !== _ &&
              {}.hasOwnProperty.call(e, _) &&
              ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _)) &&
              (a.get || a.set)
                ? i(s, _, a)
                : (s[_] = e[_]));
          return s;
        })(e, t);
      }
      function A(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = {
        cookie: o.default,
        log: _.default,
        image: s.default,
        flexible: a.default,
        time: l.default,
        course: i.default,
        throttleUtil: E.default,
        scroll: u.default,
        url: d.default,
        string: c.default,
        file: f.default,
        number: h.default,
        color: T.default,
        hubbleDATracker: m,
        mathUtil: O.default,
        formatLatexUtil: S,
      };
    },
    295673: (e, t) => {
      'use strict';
      function n(e) {
        return !!Array.from(document.scripts).find(function (t) {
          return t.src === e;
        });
      }
      function r(e) {
        return !e || n(e)
          ? Promise.resolve()
          : new Promise(function (t, n) {
              var r = document.createElement('script');
              ((r.src = e),
                (r.onload = function () {
                  return t(r);
                }),
                (r.onerror = function (e) {
                  return n(e);
                }),
                document.body.appendChild(r));
            });
      }
      function o(e) {
        return !!Array.from(document.styleSheets).find(function (t) {
          return t.href === e;
        });
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isCSSLoaded = o),
        (t.isScriptLoaded = n),
        (t.loadCSS = function (e) {
          return !e || o(e)
            ? Promise.resolve()
            : new Promise(function (t, n) {
                var r = document.createElement('link');
                ((r.rel = 'stylesheet'),
                  (r.href = e),
                  (r.onload = function () {
                    return t(r);
                  }),
                  (r.onerror = function (e) {
                    return n(e);
                  }),
                  document.head.appendChild(r));
              });
        }),
        (t.loadScript = r),
        (t.loadScripts = function (e) {
          return Promise.all(
            e.map(function (e) {
              return r(e);
            }),
          );
        }));
    },
    179885: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          p: function () {
            var e;
            localStorage.getItem('__DEV__') && (e = console).log.apply(e, arguments);
          },
        }));
    },
    495709: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          accMul: function (e, t) {
            var n = 0,
              r = e ? e.toString() : 0,
              o = t ? t.toString() : 0;
            if (!r || !o) return 0;
            try {
              var i, a;
              n +=
                null !== (i = null === (a = r.split('.')[1]) || void 0 === a ? void 0 : a.length) &&
                void 0 !== i
                  ? i
                  : 0;
            } catch (e) {
              console.error(e);
            }
            try {
              var s, _;
              n +=
                null !== (s = null === (_ = o.split('.')[1]) || void 0 === _ ? void 0 : _.length) &&
                void 0 !== s
                  ? s
                  : 0;
            } catch (e) {
              console.log(e);
            }
            return (Number(r.replace('.', '')) * Number(o.replace('.', ''))) / Math.pow(10, n);
          },
          getRandomString: function (e, t) {
            for (
              var n = '',
                r = t
                  ? 'abcdef0123456789'
                  : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                o = 0;
              o < e;
              o++
            ) {
              var i = Math.round(Math.random() * (r.length - 1));
              n += r.substring(i, i + 1);
            }
            return n;
          },
        }));
    },
    127437: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var r = n(808127),
        o = a(n(341374)),
        i = a(n(935837));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function s(e) {
        return (
          (s =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          s(e)
        );
      }
      function _(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          (t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r));
        }
        return n;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? _(Object(n), !0).forEach(function (t) {
                c(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : _(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                });
        }
        return e;
      }
      function c(e, t, n) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != s(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var n = t.call(e, 'string');
                if ('object' != s(n)) return n;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == s(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var E = (0, o.default)(),
        l = function (e, t, n) {
          var r = n && n.lexicographical,
            o = n && n.zeroExtend,
            i = e.split('.'),
            a = t.split('.'),
            s = function (e) {
              return (r ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(e);
            };
          if (!i.every(s) || !a.every(s)) return NaN;
          if (o) {
            for (; i.length < a.length;) i.push('0');
            for (; a.length < i.length;) a.push('0');
          }
          r || ((i = i.map(Number)), (a = a.map(Number)));
          for (var _ = 0; _ < i.length; ++_) {
            if (a.length === _) return 1;
            if (i[_] !== a[_]) return i[_] > a[_] ? 1 : -1;
          }
          return i.length !== a.length ? -1 : 0;
        },
        d = function (e, t, n) {
          var r = setInterval(function () {
            window.YixinJSBridge &&
              (clearInterval(r),
              window.YixinJSBridge.invoke(e, t, function (e) {
                'function' == typeof n && n(e);
              }));
          }, 200);
        },
        f = function (e, t) {
          var n = '';
          if (E.isWeixin()) _WechatInvokeAppOverlay.show(eu._$isIos() ? safariNote : void 0);
          else if (
            ((n = E.is('android')
              ? t.termId && t.courseId && t.unitId
                ? 'emaphone://open.unit.video?courseId='
                    .concat(t.courseId, '&termId=')
                    .concat(t.termId, '&lessonId=')
                    .concat(t.lessonId, '&unitId=')
                    .concat(t.unitId, '&contentId=')
                    .concat(t.contentId)
                : t.courseId && t.postId
                  ? 'emaphone://open.post?id='.concat(t.postId)
                  : t.termId && t.courseId
                    ? 'emaphone://open.course.moc/'.concat(t.courseId, '_').concat(t.termId)
                    : t.liveId
                      ? 'emaphone://open.live?id='.concat(t.liveId)
                      : 'emaphone://launch.app'
              : t.termId && t.courseId && t.unitId
                ? '//developer.icourse163.org/videoUnit/unitId/'
                    .concat(t.unitId, '/termId/')
                    .concat(t.termId, '/contentId/')
                    .concat(t.contentId, '/lessonId/')
                    .concat(t.lessonId, '/courseId/')
                    .concat(t.courseId)
                : t.courseId && t.postId
                  ? '//developer.icourse163.org/postDetail/postId/'
                      .concat(t.postId, '/courseId/')
                      .concat(t.courseId)
                  : t.termId && t.courseId
                    ? '//developer.icourse163.org/courseInfo/courseId/'
                        .concat(t.courseId, '/termId/')
                        .concat(t.termId)
                    : t.courseId
                      ? '//developer.icourse163.org/courseInfo/courseId/'.concat(
                          t.courseId,
                          '/termId/',
                          0,
                        )
                      : t.liveId
                        ? '//developer.icourse163.org/live/'.concat(t.liveId)
                        : '//developer.icourse163.org/'),
            E.is('iphone'))
          ) {
            if (E.getIosVersion() > 8) window.location.href = n;
            else {
              var r = document.createElement('iframe');
              (r.setAttribute('style', 'width:0;height:0;display:none'),
                (r.src = n),
                document.body.appendChild(r),
                r.parentNode.removeChild(r));
            }
            'fromCallApp' === e &&
              setTimeout(function () {
                window.location.href = ''
                  .concat(window.callAppDownloadHref, '?source=fromCallApp&courseId=')
                  .concat(t.courseId || '', '&termId=')
                  .concat(t.termId || '', '&from=')
                  .concat(t.from || '');
              }, 2e3);
          } else if (E.is('android'))
            if (E.isWeibo())
              window.location.href = ''
                .concat(window.callAppDownloadHref, '?source=fromWeibo&courseId=')
                .concat(t.courseId || '', '&termId=')
                .concat(t.termId || '');
            else {
              var o = document.createElement('iframe');
              (o.setAttribute('style', 'width:0;height:0;display:none'), (o.src = n));
              var i = new Date();
              (document.body.appendChild(o),
                o.parentNode.removeChild(o),
                setTimeout(function () {
                  new Date() - i < 815 &&
                    (window.location.href = '//www.icourse163.org/appDownload.htm?from='.concat(
                      t.from,
                    ));
                }, 800));
            }
        },
        h = function (e, t) {
          var n;
          if ((E.isWeixin(), (n = E.is('android') ? e : t), E.getIosVersion() > 8))
            window.location.href = n;
          else {
            var r = document.createElement('iframe');
            (r.setAttribute(
              'style',
              'display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;height:0;width:0;',
            ),
              (r.src = n),
              document.body.appendChild(r));
          }
        },
        T = function (e, t) {
          E.isIos()
            ? E.isIosWebView()
              ? d('openCourseDetail', { courseId: e, termId: t })
              : E.isWeixin()
                ? f('fromCallApp')
                : (window.location.href = '//developer.icourse163.org/link/kYCourseDetail/courseId/'
                    .concat(e, '/termId/')
                    .concat(t))
            : E.is('android')
              ? E.isWebView()
                ? h(
                    'emaphone://open.course.moc.postgraduate/?courseId='
                      .concat(e, '&termId=')
                      .concat(t),
                    'emiphone://type=5-&-content='.concat(e, '_').concat(t),
                  )
                : E.isWeixin()
                  ? f('fromCallApp')
                  : (window.location.href = 'emaphone://open.course.moc.postgraduate/?courseId='
                      .concat(e, '&termId=')
                      .concat(t))
              : f('fromCallApp');
        };
      t.default = {
        versionCompare: l,
        isWebViewSupportJB: function () {
          var e = E.isAndroidWebView(),
            t = E.isIosWebView();
          if (e || t) {
            if (null != e) return l(e[1], '1.2.2') >= 0;
            if (null != t) return l(t[1], '1.1.3') >= 0;
          }
          return !1;
        },
        isSupportScoreVersion: function () {
          var e = E.isAndroidWebView(),
            t = E.isIosWebView();
          if (e || t) {
            if (null != e) return l(e[1], '4.26.10') >= 0;
            if (null != t) return l(t[1], '4.28.5') >= 0;
          }
          return !1;
        },
        openMobilePageByJsBridge: d,
        invokeLearnPage: function (e, t, n) {
          switch (e) {
            case i.default.COURSE_TYPE.COURSE:
              d('openCourseStudy', { termId: t.termId, courseId: t.courseId }, n);
              break;
            case i.default.COURSE_TYPE.COURSE_PACKAGE:
              d('openMyStudyTab', {}, n);
              break;
            case i.default.COURSE_TYPE.COLUMN:
              d('openColumnInfo', { columnId: t.columnId, enrolled: t.enrolled }, n);
          }
        },
        invokeDetailPage: function (e, t) {
          switch (e) {
            case i.default.COURSE_TYPE.COURSE:
              T(t.courseId, t.termId);
              break;
            case i.default.COURSE_TYPE.COURSE_PACKAGE:
              ((o = t.subjectId),
                (a = t.coursePackageId),
                E.isIos()
                  ? E.isIosWebView()
                    ? d('openCoursePlan', { subjectId: o, coursePackageId: a })
                    : (window.location.href =
                        '//developer.icourse163.org/link/coursePlan/subjectId/'
                          .concat(o, '/coursePackageId/')
                          .concat(a))
                  : E.isWebView()
                    ? h(
                        'emaphone://open.subject?subjectId='
                          .concat(o, '&coursePackageId=')
                          .concat(a),
                        'emiphone://type=5-&-content='.concat(o),
                      )
                    : E.isWeixin()
                      ? f('fromCallApp')
                      : (window.location.href = 'emaphone://open.subject?subjectId='
                          .concat(o, '&coursePackageId=')
                          .concat(a)));
              break;
            case i.default.COURSE_TYPE.COLUMN:
              ((n = t.columnId),
                (r = t.enrolled),
                E.isWebView()
                  ? d('openColumnInfo', { columnId: n, enrolled: r })
                  : h(
                      'emaphone://open.columnintro?columnId='.concat(n, '&isExcludeMobDesc=false'),
                      '//developer.icourse163.org/link/column/columnId/'.concat(n),
                    ));
              break;
            case i.default.COURSE_TYPE.MOOC:
              !(function (e) {
                E.isIos()
                  ? E.isIosWebView()
                    ? d('openCourseStudy', u({}, e))
                    : E.isWeixin()
                      ? f('fromCallApp')
                      : (window.location.href =
                          '//developer.icourse163.org/link/kYCourseDetail/courseId/'
                            .concat(null == e ? void 0 : e.courseId, '/termId/')
                            .concat(null == e ? void 0 : e.termId))
                  : E.is('android')
                    ? E.isWebView()
                      ? d('openCourseDetail', u(u({}, e), {}, { type: i.default.COURSE_TYPE.MOOC }))
                      : E.isWeixin()
                        ? f('fromCallApp')
                        : (window.location.href =
                            'emaphone://open.course.moc.postgraduate/?courseId='
                              .concat(null == e ? void 0 : e.courseId, '&termId=')
                              .concat(null == e ? void 0 : e.termId))
                    : f('fromCallApp');
              })(t);
          }
          var n, r, o, a;
        },
        invokeShare: function (e) {
          if (E.isWebView()) {
            if (!e) return;
            var t = 'share',
              n = {};
            (Object.assign(n, e, {
              data: { url: e.url, weiboDesc: e.weiboDesc },
              description: e.description || e.title,
              weiboDesc: e.weiboDesc || e.description,
            }),
              e.isShareImg &&
                ((t = 'shareImage'), Object.assign(n, { imageUrl: e.imageUrl || '' })),
              d(t, n));
          }
        },
        invokeStudentSkipClassroom: function (e) {
          d('studentSkipClassroom', e);
        },
        invokeTeacherSkipClassroom: function (e) {
          d('teacherSkipClassroom', e);
        },
        callAppLogin: function (e) {
          var t;
          ((e = r.Base64.encode(e || location.href)),
            null !== (t = window) &&
              void 0 !== t &&
              t.YixinJSBridge &&
              window.YixinJSBridge.call('openLoginView', { returnUrl: e }, function () {}));
        },
        isSupportVersion: function (e, t) {
          var n = E.isAndroidWebView(),
            r = E.isIosWebView();
          if (n || r) {
            if (null != n) return l(n[1], e) >= 0;
            if (null != r) return l(r[1], t) >= 0;
          }
          return !1;
        },
        openKaoyanCourseDetailApp: T,
        closeWebView: function () {
          var e;
          null !== (e = window) &&
            void 0 !== e &&
            e.YixinJSBridge &&
            window.YixinJSBridge.call('closeWebView', {}, function () {});
        },
        openBrowserDownload: function (e) {
          var t;
          null !== (t = window) &&
            void 0 !== t &&
            t.YixinJSBridge &&
            window.YixinJSBridge.call('openBrowserDownload', { downloadUrl: e }, function () {
              console.info('openBrowserDownload - successful');
            });
        },
        hideAppShare: function () {
          var e;
          null !== (e = window) &&
            void 0 !== e &&
            e.YixinJSBridge &&
            window.YixinJSBridge.call('hideShare', {}, function () {
              console.info('hideShare - successful');
            });
        },
        openMobileCoursePage: function (e, t) {
          var n,
            r = e,
            o = Object.keys(r)
              .filter(function (e) {
                return 'courseId' !== e && 'termId' !== e && void 0 !== r[e] && null !== r[e];
              })
              .map(function (e) {
                return ''.concat(encodeURIComponent(e), '=').concat(encodeURIComponent(r[e]));
              })
              .join('&');
          ((n = E.is('android')
            ? 'emaphone://open.course.moc/'
                .concat(r.courseId, '_')
                .concat(r.termId)
                .concat(o ? '?'.concat(o) : '')
            : 'emiphone://open.course.moc/'
                .concat(r.courseId, '_')
                .concat(r.termId)
                .concat(o ? '?'.concat(o) : '')),
            (window.location.href = n));
        },
        openTextbookApp: function (e) {
          var t = e.textbookId,
            n = e.onFail,
            r = void 0 === n ? null : n,
            o = e.downloadUrl,
            i = void 0 === o ? 'https://www.icourse163.org/appDownload.htm?from=textbook' : o;
          if (E.isWeixin() || E.is('qq') || E.is('weibo'))
            !(function () {
              if (!document.getElementById('app-guide-overlay')) {
                var e = document.createElement('div');
                ((e.id = 'app-guide-overlay'),
                  (e.style.cssText =
                    '\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.85);\n    z-index: 9999;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    color: #fff;\n  '),
                  (e.innerHTML =
                    '\n    <div style="text-align: center; padding: 20px;">\n      <div style="font-size: 18px; margin-bottom: 20px;">\n        请在浏览器中打开\n      </div>\n      <div style="font-size: 14px; color: #ccc; margin-bottom: 30px;">\n        点击右上角菜单<br>选择"在浏览器中打开"\n      </div>\n      <button id="close-app-guide" style="\n        padding: 10px 30px;\n        background: #fff;\n        border: none;\n        border-radius: 4px;\n        font-size: 16px;\n        color: #333;\n      ">知道了</button>\n    </div>\n  '),
                  document.body.appendChild(e),
                  document.getElementById('close-app-guide').addEventListener('click', function () {
                    document.body.removeChild(e);
                  }));
              }
            })();
          else if (E.isMobileAll()) {
            if (E.isIos()) {
              var a = 'emiphone://open.textbook?textbookId='.concat(t);
              ((window.location.href = a),
                setTimeout(function () {
                  'visible' === document.visibilityState && (window.location.href = i);
                }, 2e3));
            } else if (E.is('android')) {
              var s =
                'intent://open.textbook?textbookId='.concat(t, '#Intent;') +
                'scheme=emaphone;package=com.netease.edu.ucmooc;' +
                'S.browser_fallback_url='.concat(encodeURIComponent(i), ';') +
                'end';
              window.location.href = s;
            }
          } else 'function' == typeof r && r();
        },
      };
    },
    478302: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var r = i(n(341374)),
        o = i(n(127437));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = { ua: r.default, app: o.default };
    },
    341374: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = function (e) {
          var t,
            n =
              e ||
              ('undefined' == typeof window
                ? ''
                : null === (t = window.navigator) || void 0 === t
                  ? void 0
                  : t.userAgent),
            r = new RegExp('NetEaseEdu.*EDUMOOC; (.*); channel=(.*)', 'i'),
            o = new RegExp('.*EDUMOOC/([\\.\\d]*)/?([\\.\\d]*)?', 'i'),
            i = function (e) {
              return new RegExp('('.concat(e, ')'), 'ig').test(n);
            },
            a = function () {
              return i('micromessenger') && !i('windowswechat');
            },
            s = function () {
              return n.match(r);
            },
            _ = function () {
              return n.match(o);
            };
          return {
            is: i,
            isWeixin: a,
            isMobileAll: function () {
              return new RegExp(
                '(iPhone|iPod|Android|BlackBerry|mobile|Windows Phone|miuibrowser)',
                'ig',
              ).test(n);
            },
            isWeixinAndroid: function () {
              return n.match(/android/i) && a();
            },
            isWeixinIos: function () {
              return n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && a();
            },
            isIpad: function () {
              return i('iPad');
            },
            isWap: function () {
              return (
                'false' !== window.isMobilePhone &&
                ('true' === window.isMobilePhone || window.isMobilePhone)
              );
            },
            isAndroidWebView: s,
            isIosWebView: _,
            isWebView: function () {
              return s() || _();
            },
            isIos: function () {
              return !!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            },
            getAndroidAppVersion: function () {
              var e = n.toLowerCase().match(r) || [];
              return e.length >= 2 ? e[1] : null;
            },
            getIosAppVersion: function () {
              var e = n.toLowerCase().match(o) || [];
              return e.length >= 2 ? e[1] : null;
            },
            getIosVersion: function () {
              var e = n.toLowerCase(),
                t = 0,
                r = e.match(/os [\d._]*/gi);
              return (
                e.indexOf('like mac os x') > 0 &&
                  (t = ''
                    .concat(r)
                    .replace(/[^0-9|_.]/gi, '')
                    .replace(/_/gi, '.')),
                parseInt(t, 10)
              );
            },
          };
        }));
    },
    204194: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.indexToC = t.default = void 0));
      var n = (t.indexToC = function (e) {
        var t = {
            0: '零',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
            7: '七',
            8: '八',
            9: '九',
            10: '十',
          },
          n = { 0: '', 1: '十', 2: '百', 3: '千', 4: '万' };
        return (
          (e = +e || 0),
          (e += '') <= 10
            ? t[e]
            : e
                .split('')
                .reverse()
                .map(function (e, r) {
                  return 0 === e ? (0 === r ? '' : t[e]) : t[e] + n[r];
                })
                .reverse()
                .join('')
                .replace(/零+/g, t[0])
                .replace(/零$/, '')
                .replace(/^一十/, t[10])
        );
      });
      t.default = { indexToC: n };
    },
    693946: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.windowScrollController = t.default = void 0));
      var n = (t.windowScrollController = function (e) {
        var t = { 37: 1, 38: 1, 39: 1, 40: 1 };
        function n(e) {
          e.preventDefault();
        }
        function r(e) {
          if (t[e.keyCode]) return (n(e), !1);
        }
        var o = !1;
        try {
          e.addEventListener(
            'test',
            null,
            Object.defineProperty({}, 'passive', {
              get: function () {
                o = !0;
              },
            }),
          );
        } catch (e) {
          console.log(e);
        }
        var i = !!o && { passive: !1 },
          a = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
        return {
          disableScroll: function () {
            (e.addEventListener('DOMMouseScroll', n, !1),
              e.addEventListener(a, n, i),
              e.addEventListener('touchmove', n, i),
              e.addEventListener('keydown', r, !1));
          },
          enableScroll: function () {
            (e.removeEventListener('DOMMouseScroll', n, !1),
              e.removeEventListener(a, n, i),
              e.removeEventListener('touchmove', n, i),
              e.removeEventListener('keydown', r, !1));
          },
        };
      });
      t.default = { windowScrollController: n };
    },
    276786: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLetters = t.default = void 0));
      var n = (t.getLetters = function () {
        for (var e = [], t = 65; t < 91; t++) e.push(String.fromCharCode(t));
        return e;
      });
      t.default = { getLetters: n };
    },
    2339: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          throttle: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 300,
              n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              r = null,
              o = !0;
            return function () {
              for (var i = this, a = arguments.length, s = new Array(a), _ = 0; _ < a; _++)
                s[_] = arguments[_];
              var u = function () {
                (e.apply(i, s), (r = null));
              };
              (n && o && ((o = !1), u()), r || (r = setTimeout(u, t)));
            };
          },
        }));
    },
    820658: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = function () {
        var e,
          t = new Date().getTime(),
          n = null === (e = window) || void 0 === e ? void 0 : e.serverTimeDiff;
        return n ? t - n : t;
      };
      t.default = {
        getCurServerTime: n,
        tiktok: function (e, t) {
          var r = e - (t || n());
          if (r < 1e3) return null;
          var o = ~~(~~(r / 1e3) / 86400),
            i = ~~((~~(r / 1e3) - 86400 * o) / 3600),
            a = ~~((~~(r / 1e3) - 86400 * o - 3600 * i) / 60),
            s = ~~(r / 1e3) - 86400 * o - 3600 * i - 60 * a;
          return {
            d: o || 0,
            h: i || 0,
            m: a || 0,
            s: s || 0,
            ms: r - 1e3 * (86400 * o + 3600 * i + 60 * a + s) || 0,
          };
        },
        convertTimeToSeconds: function (e) {
          var t = e.split(/[,:]/);
          return (
            3600 * parseInt(t[0], 10) +
            60 * parseInt(t[1], 10) +
            parseInt(t[2], 10) +
            parseInt(t[3], 10) / 1e3
          );
        },
        getDiffDays: function (e, t, n) {
          e = new Date(e);
          var r = ((t = new Date(t)) - e) / 864e5;
          return n ? Math.floor(r) : Math.ceil(r);
        },
        formatTime: function (e, t) {
          var n = new Date(e),
            r = function (e) {
              return e.toString().padStart(2, '0');
            };
          return t
            .replace(/yyyy/g, n.getFullYear().toString())
            .replace(/MM/g, r(n.getMonth() + 1))
            .replace(/dd/g, r(n.getDate()))
            .replace(/HH/g, r(n.getHours()))
            .replace(/mm/g, r(n.getMinutes()))
            .replace(/ss/g, r(n.getSeconds()));
        },
        formatWeek: function (e) {
          return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(e).getDay()];
        },
        isSameDay: function (e, t) {
          if (!e || !t) return !1;
          var n = new Date(e),
            r = new Date(t);
          return (
            n.getFullYear() === r.getFullYear() &&
            n.getMonth() === r.getMonth() &&
            n.getDate() === r.getDate()
          );
        },
        formatSecondsToReadable: function (e) {
          var t,
            n,
            r,
            o,
            i,
            a = {
              d: (n = ~~(~~((t = 1e3 * e) / 1e3) / 86400)) || 0,
              h: (r = ~~((~~(t / 1e3) - 86400 * n) / 3600)) || 0,
              m: (o = ~~((~~(t / 1e3) - 86400 * n - 3600 * r) / 60)) || 0,
              s: (i = ~~(t / 1e3) - 86400 * n - 3600 * r - 60 * o) || 0,
              ms: t - 1e3 * (86400 * n + 3600 * r + 60 * o + i) || 0,
            },
            s = '';
          return (
            a.day && (s += ''.concat(a.day, '天 ')),
            s + [a.h ? a.h : '00', a.m ? a.m : '00', a.s ? a.s : '00'].join(':')
          );
        },
      };
    },
    959306: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.urlAddParams =
          t.urlAddParam =
          t.getIntlUrlByLang =
          t.getChangeEduCookiesUrl =
          t.formateImagePrefix =
          t.default =
          t.convertUrlProtocol =
            void 0));
      var r = n(538524);
      function o(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var i = (t.getIntlUrlByLang = function (e, t) {
          if (t === r.EN) {
            if (e.startsWith('/') && !e.startsWith('//'))
              return '//www.icourse163.org/en/mooc'.concat(e);
            var n = e.match(/((?:https:\/\/|http:\/\/|\/\/){0,1}.+?\/)((?:en\/mooc){0,1})/),
              o = n[1];
            return n[2] || o.includes('kaoyan.icourse163.org')
              ? e
              : e.replace(o, ''.concat(o, 'en/mooc/'));
          }
          if (t === r.EN_REACT) {
            var i = location.origin.endsWith('.com') ? '' : '/mooc/en';
            if (e.startsWith('/')) return ''.concat(i).concat(e);
          }
          return e;
        }),
        a = (t.formateImagePrefix = function (e) {
          if (e) return e.replace(/img[0-9].ph.126.net/g, 'img-ph-mirror.nosdn.127.net');
        }),
        s = (t.urlAddParam = function (e, t, n) {
          if (!e || e.indexOf(t) > -1) return e;
          var r = e.indexOf('?') > -1 ? '&' : '?';
          return ''.concat(e).concat(r).concat(t, '=').concat(n);
        }),
        _ = (t.urlAddParams = function (e, t) {
          if (!e || 0 === e.length || 0 === e.trim().indexOf('javascript')) return '';
          var n,
            r,
            o = e.split('#'),
            i = o[0].split('?'),
            a = {};
          return (
            i[1] &&
              i[1].split('&').forEach(function (e) {
                var t = e.split('=');
                a[t[0]] = t.slice(1).join('=');
              }),
            Object.keys(t).forEach(function (e) {
              a[e.trim()] = encodeURIComponent(t[e]);
            }),
            (e =
              i[0] +
              ((n = a),
              (r = ''),
              Object.keys(n).forEach(function (e) {
                '' !== n[e] && (r += ''.concat(e.trim(), '=').concat(n[e], '&'));
              }),
              r ? '?'.concat(r.slice(0, r.length - 1)) : '')),
            o[1] ? (e += '#'.concat(o[1])) : e
          );
        }),
        u =
          ((t.getChangeEduCookiesUrl = function (e) {
            var t, n;
            if (null === (t = window) || void 0 === t || !t.webUser) return e;
            var r = null === (n = window) || void 0 === n ? void 0 : n.btoa(e);
            return 'https://www.icourse163.org/passport/adult/changeEduCookies.htm?single=false&returnUrl='.concat(
              r,
            );
          }),
          (t.convertUrlProtocol = function (e) {
            var t = window.location.protocol;
            try {
              var n = new URL(e, window.location.href);
              return (
                ('http:' !== n.protocol && 'https:' !== n.protocol) || (n.protocol = t),
                n.href
              );
            } catch (t) {
              return e;
            }
          }));
      t.default = {
        query2object: function (e) {
          var t = {};
          return e
            ? (e.split('&').forEach(function (e) {
                var n,
                  r,
                  i =
                    ((n = e.split('=')),
                    (r = 2),
                    (function (e) {
                      if (Array.isArray(e)) return e;
                    })(n) ||
                      (function (e, t) {
                        var n =
                          null == e
                            ? null
                            : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                              e['@@iterator'];
                        if (null != n) {
                          var r,
                            o,
                            i,
                            a,
                            s = [],
                            _ = !0,
                            u = !1;
                          try {
                            if (((i = (n = n.call(e)).next), 0 === t)) {
                              if (Object(n) !== n) return;
                              _ = !1;
                            } else
                              for (
                                ;
                                !(_ = (r = i.call(n)).done) && (s.push(r.value), s.length !== t);
                                _ = !0
                              );
                          } catch (e) {
                            ((u = !0), (o = e));
                          } finally {
                            try {
                              if (!_ && null != n.return && ((a = n.return()), Object(a) !== a))
                                return;
                            } finally {
                              if (u) throw o;
                            }
                          }
                          return s;
                        }
                      })(n, r) ||
                      (function (e, t) {
                        if (e) {
                          if ('string' == typeof e) return o(e, t);
                          var n = {}.toString.call(e).slice(8, -1);
                          return (
                            'Object' === n && e.constructor && (n = e.constructor.name),
                            'Map' === n || 'Set' === n
                              ? Array.from(e)
                              : 'Arguments' === n ||
                                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                                ? o(e, t)
                                : void 0
                          );
                        }
                      })(n, r) ||
                      (function () {
                        throw new TypeError(
                          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                        );
                      })()),
                  a = i[0],
                  s = i[1];
                t[a] = decodeURIComponent((null != s ? s : '').replace(/\+/g, '%20'));
              }),
              t)
            : {};
        },
        getIntlUrlByLang: i,
        formateImagePrefix: a,
        urlAddParam: s,
        urlAddParams: _,
        convertUrlProtocol: u,
      };
    },
    159610: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.openInCurrentTab =
          t.open =
          t.getKeCookieCert =
          t.getKeCookie =
          t.getCookieCertVar =
          t.getBindStatusByLoginType =
          t.default =
            void 0));
      var r,
        o = n(397338),
        i = s(n(272505)),
        a = s(n(33463));
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var _ = (t.getKeCookieCert = function (e, t) {
          a.default
            .of({
              url: '//www.icourse163.org/web/j/memberBean.getKeCookieCert.rpc',
              method: 'post',
              body: {},
              raw: !0,
            })
            .launch()
            .then(function (n) {
              0 === n.code && n.result
                ? ((r = n.result), null == e || e(n.result))
                : ((r = null), null == t || t());
            })
            .catch(function () {
              return null == t ? void 0 : t();
            });
        }),
        u = (t.getBindStatusByLoginType = function (e, t) {
          return a.default
            .of({
              url: '//www.icourse163.org/web/j/memberBean.getBindStatusByLoginType.rpc',
              method: 'post',
              body: { loginType: 8 },
            })
            .launch()
            .then(function (n) {
              0 === n.code && n.result ? _(e, t) : ((r = null), null == t || t());
            })
            .catch(function () {
              return null == t ? void 0 : t();
            });
        }),
        c = (t.getKeCookie = function (e, t) {
          return i.default
            .get('//dict.youdao.com/login/acc/login/inner/phone', {
              withCredentials: !0,
              data: { param: e, isWeb: !0 },
            })
            .then(function () {
              return null == t ? void 0 : t();
            });
        }),
        E = (t.getCookieCertVar = function () {
          return r;
        }),
        l = !1,
        d = function () {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = arguments.length > 1 ? arguments[1] : void 0,
            n = window.windowOpen || window.open;
          e ? n.apply(window, t) : (location.href = t[0]);
        },
        f = function () {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = arguments.length > 1 ? arguments[1] : void 0,
            n = Array.prototype.slice.call(arguments, 1),
            r = E();
          if (
            (a.default.setWinDoc(window.document),
            window.webUser && t.indexOf('ke.youdao.com') >= 0)
          ) {
            if (void 0 === r) {
              var i = o.message.loading();
              return void u(
                function (t) {
                  c(t, function () {
                    (i(), d(e, n), (l = !1));
                  });
                },
                function () {
                  (i(), d(e, n), (l = !1));
                },
              );
            }
            if (null != r) {
              var s = o.message.loading();
              return void c(r, function () {
                (s(), d(e, n), (l = !1));
              });
            }
          }
          d(e, n);
        },
        h = (t.open = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
          return !l && f.apply(void 0, [!0].concat(t));
        }),
        T = (t.openInCurrentTab = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
          return !l && f.apply(void 0, [!1].concat(t));
        });
      t.default = {
        getKeCookie: c,
        getKeCookieCert: _,
        getBindStatusByLoginType: u,
        getCookieCertVar: E,
        open: h,
        openInCurrentTab: T,
      };
    },
  },
]);
