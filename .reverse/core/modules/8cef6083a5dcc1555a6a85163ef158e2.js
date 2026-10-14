EDU(
  '8cef6083a5dcc1555a6a85163ef158e2',
  function (e, t, n) {
    'use strict';
    function i(e, t) {
      e = e || {};
      for (var n in t) if ('undefined' == typeof e[n]) e[n] = t[n];
      return e;
    }
    function o(e) {
      var t = '(\\' + e.symbol.replace(/\./g, '\\.') + ')' + (e.require_symbol ? '' : '?'),
        n = '-?',
        i = '[1-9]\\d*',
        o = '[1-9]\\d{0,2}(\\' + e.thousands_separator + '\\d{3})*',
        a = ['0', i, o],
        r = '(' + a.join('|') + ')?',
        s = '(\\' + e.decimal_separator + '\\d{2})?';
      var c = r + s;
      if (e.allow_negatives && !e.parens_for_negatives)
        if (e.negative_sign_after_digits) c += n;
        else if (e.negative_sign_before_digits) c = n + c;
      if (e.allow_negative_sign_placeholder) c = '( (?!\\-))?' + c;
      else if (e.allow_space_after_symbol) c = ' ?' + c;
      else if (e.allow_space_after_digits) c += '( (?!$))?';
      if (e.symbol_after_digits) c += t;
      else c = t + c;
      if (e.allow_negatives)
        if (e.parens_for_negatives) c = '(\\(' + c + '\\)|' + c + ')';
        else if (!e.negative_sign_before_digits && !e.negative_sign_after_digits) c = n + c;
      return new RegExp('^(?!-? )(?=.*\\d)' + c + '$');
    }
    function a(e) {
      var t = e.match(k),
        n,
        i,
        o,
        a;
      if (!t) {
        e = e.toLowerCase();
        n = e.match(/(?:\s|gmt\s*)(-|\+)(\d{1,4})(\s|$)/);
        if (!n) return e.indexOf('gmt') !== -1 ? 0 : null;
        i = n[1];
        var r = n[2];
        if (3 === r.length) r = '0' + r;
        if (r.length <= 2) {
          o = 0;
          a = parseInt(r);
        } else {
          o = parseInt(r.slice(0, 2));
          a = parseInt(r.slice(2, 4));
        }
      } else {
        n = t[21];
        if (!n) return !t[12] ? 0 : null;
        if ('z' === n || 'Z' === n) return 0;
        i = t[22];
        if (n.indexOf(':') !== -1) {
          o = parseInt(t[23]);
          a = parseInt(t[24]);
        } else {
          o = 0;
          a = parseInt(t[23]);
        }
      }
      return (60 * o + a) * ('-' === i ? 1 : -1);
    }
    n = { version: '4.5.2' };
    var r = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var s =
      /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var c = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var d =
      /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    var l =
      /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
    var u =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    var _ = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
    var f = /^(?:[0-9]{9}X|[0-9]{10})$/,
      h = /^(?:[0-9]{13})$/;
    var p = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
    var m = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,
      g = /^[0-9A-F]{1,4}$/i;
    var b = {
      3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    };
    var v = /^[A-Z]+$/i,
      E = /^[0-9A-Z]+$/i,
      x = /^[-+]?[0-9]+$/,
      w = /^(?:[-+]?(?:0|[1-9][0-9]*))$/,
      C = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,
      y = /^[0-9A-F]+$/i,
      $ = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,
      I = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,
      T = /^[0-9]+$/;
    var S = /^[\x00-\x7F]+$/,
      A = /[^\x00-\x7F]/,
      N = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,
      O = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
    var L = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    var D = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
    var R = {
      'zh-CN':
        /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4[579]\d{2})\d{6}$/,
      'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
      'en-ZA': /^(\+?27|0)\d{9}$/,
      'en-AU': /^(\+?61|0)4\d{8}$/,
      'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
      'fr-FR': /^(\+?33|0)[67]\d{8}$/,
      'pt-PT': /^(\+351)?9[1236]\d{7}$/,
      'el-GR': /^(\+?30)?(69\d{8})$/,
      'en-GB': /^(\+?44|0)7\d{9}$/,
      'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
      'en-ZM': /^(\+26)?09[567]\d{7}$/,
      'ru-RU': /^(\+?7|8)?9\d{9}$/,
      'nb-NO': /^(\+?47)?[49]\d{7}$/,
      'nn-NO': /^(\+?47)?[49]\d{7}$/,
      'vi-VN': /^(0|\+?84)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
      'en-NZ': /^(\+?64|0)2\d{7,9}$/,
      'en-IN': /^(\+?91|0)?[789]\d{9}$/,
    };
    var k =
      /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    var U = /^\+?(\d*(\.\d{1,2})?)$/;
    n.isSoftDecimal2 = function (e, t, n) {
      t = 0 | t;
      return U.test(e) && parseFloat(e) > t && (n ? parseFloat(e) <= n : !0);
    };
    n.extend = function (e, t) {
      n[e] = function () {
        var e = Array.prototype.slice.call(arguments);
        e[0] = n.toString(e[0]);
        return t.apply(n, e);
      };
    };
    n.init = function () {
      for (var e in n)
        if (
          'function' == typeof n[e] &&
          'toString' !== e &&
          'toDate' !== e &&
          'extend' !== e &&
          'init' !== e
        )
          n.extend(e, n[e]);
        else;
    };
    n.toString = function (e) {
      if ('object' == typeof e && null !== e && e.toString) e = e.toString();
      else if (null === e || 'undefined' == typeof e || (isNaN(e) && !e.length)) e = '';
      return '' + e;
    };
    n.toDate = function (e) {
      if ('[object Date]' === Object.prototype.toString.call(e)) return e;
      e = Date.parse(e);
      return !isNaN(e) ? new Date(e) : null;
    };
    n.toFloat = function (e) {
      return parseFloat(e);
    };
    n.inputTips = function (t, n, i, o, a) {
      n = n || 0;
      a = a || '个字';
      var r = Math.ceil(e._$getStringLength(t.trim()) / 2),
        s = { message: '', success: !0 };
      if (r < n) return { message: '至少输入' + n + a, success: !1 };
      else if (r > i) return { message: '超出' + (r - i) + a, success: !1 };
      else if (o && i) return { message: '还可以输入' + (i - r) + a, success: !0 };
      return s;
    };
    n.toInt = function (e, t) {
      return parseInt(e, t || 10);
    };
    n.toBoolean = function (e, t) {
      if (t) return '1' === e || 'true' === e;
      else return '0' !== e && 'false' !== e && '' !== e;
    };
    n.equals = function (e, t) {
      return e === n.toString(t);
    };
    n.contains = function (e, t) {
      return e.indexOf(n.toString(t)) >= 0;
    };
    n.matches = function (e, t, n) {
      if ('[object RegExp]' !== Object.prototype.toString.call(t)) t = new RegExp(t, n);
      return t.test(e);
    };
    var P = { allow_display_name: !1, allow_utf8_local_part: !0, require_tld: !0 };
    n.isEmail = function (e, t) {
      t = i(t, P);
      if (t.allow_display_name) {
        var o = e.match(l);
        if (o) e = o[1];
      }
      var a = e.split('@'),
        u = a.pop(),
        _ = a.join('@');
      var f = u.toLowerCase();
      if ('gmail.com' === f || 'googlemail.com' === f) _ = _.replace(/\./g, '').toLowerCase();
      if (!n.isByteLength(_, { max: 64 }) || !n.isByteLength(u, { max: 256 })) return !1;
      if (!n.isFQDN(u, { require_tld: t.require_tld })) return !1;
      if ('"' === _[0]) {
        _ = _.slice(1, _.length - 1);
        return t.allow_utf8_local_part ? d.test(_) : s.test(_);
      }
      var h = t.allow_utf8_local_part ? c : r;
      var p = _.split('.');
      for (var m = 0; m < p.length; m++) if (!h.test(p[m])) return !1;
      return !0;
    };
    var M = {
      protocols: ['http', 'https', 'ftp'],
      require_tld: !0,
      require_protocol: !1,
      require_valid_protocol: !0,
      allow_underscores: !1,
      allow_trailing_dot: !1,
      allow_protocol_relative_urls: !1,
    };
    n.isURL = function (e, t) {
      if (!e || e.length >= 2083 || /\s/.test(e)) return !1;
      if (0 === e.indexOf('mailto:')) return !1;
      t = i(t, M);
      var o, a, r, s, c, d, l;
      l = e.split('://');
      if (l.length > 1) {
        o = l.shift();
        if (t.require_valid_protocol && t.protocols.indexOf(o) === -1) return !1;
      } else if (t.require_protocol) return !1;
      else if (t.allow_protocol_relative_urls && '//' === e.substr(0, 2)) l[0] = e.substr(2);
      e = l.join('://');
      l = e.split('#');
      e = l.shift();
      l = e.split('?');
      e = l.shift();
      l = e.split('/');
      e = l.shift();
      l = e.split('@');
      if (l.length > 1) {
        a = l.shift();
        if (a.indexOf(':') >= 0 && a.split(':').length > 2) return !1;
      }
      s = l.join('@');
      l = s.split(':');
      r = l.shift();
      if (l.length) {
        d = l.join(':');
        c = parseInt(d, 10);
        if (!/^[0-9]+$/.test(d) || c <= 0 || c > 65535) return !1;
      }
      if (!n.isIP(r) && !n.isFQDN(r, t) && 'localhost' !== r) return !1;
      if (t.host_whitelist && t.host_whitelist.indexOf(r) === -1) return !1;
      if (t.host_blacklist && t.host_blacklist.indexOf(r) !== -1) return !1;
      else return !0;
    };
    n.isMACAddress = function (e) {
      return p.test(e);
    };
    n.isIP = function (e, t) {
      t = n.toString(t);
      if (!t) return n.isIP(e, 4) || n.isIP(e, 6);
      else if ('4' === t) {
        if (!m.test(e)) return !1;
        var i = e.split('.').sort(function (e, t) {
          return e - t;
        });
        return i[3] <= 255;
      } else if ('6' === t) {
        var o = e.split(':');
        var a = !1;
        var r = n.isIP(o[o.length - 1], 4);
        var s = r ? 7 : 8;
        if (o.length > s) return !1;
        if ('::' === e) return !0;
        else if ('::' === e.substr(0, 2)) {
          o.shift();
          o.shift();
          a = !0;
        } else if ('::' === e.substr(e.length - 2)) {
          o.pop();
          o.pop();
          a = !0;
        }
        for (var c = 0; c < o.length; ++c)
          if ('' === o[c] && c > 0 && c < o.length - 1) {
            if (a) return !1;
            a = !0;
          } else if (r && c == o.length - 1);
          else if (!g.test(o[c])) return !1;
        if (a) return o.length >= 1;
        else return o.length === s;
      }
      return !1;
    };
    var B = { require_tld: !0, allow_underscores: !1, allow_trailing_dot: !1 };
    n.isFQDN = function (e, t) {
      t = i(t, B);
      if (t.allow_trailing_dot && '.' === e[e.length - 1]) e = e.substring(0, e.length - 1);
      var n = e.split('.');
      if (t.require_tld) {
        var o = n.pop();
        if (!n.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(o)) return !1;
      }
      for (var a, r = 0; r < n.length; r++) {
        a = n[r];
        if (t.allow_underscores) {
          if (a.indexOf('__') >= 0) return !1;
          a = a.replace(/_/g, '');
        }
        if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(a)) return !1;
        if (/[\uff01-\uff5e]/.test(a)) return !1;
        if ('-' === a[0] || '-' === a[a.length - 1]) return !1;
        if (a.indexOf('---') >= 0 && 'xn--' !== a.slice(0, 4)) return !1;
      }
      return !0;
    };
    n.isBoolean = function (e) {
      return ['true', 'false', '1', '0'].indexOf(e) >= 0;
    };
    n.isAlpha = function (e) {
      return v.test(e);
    };
    n.isAlphanumeric = function (e) {
      return E.test(e);
    };
    n.isNumeric = function (e) {
      return x.test(e);
    };
    n.isDecimal = function (e) {
      return '' !== e && $.test(e);
    };
    n.isHexadecimal = function (e) {
      return y.test(e);
    };
    n.isHexColor = function (e) {
      return I.test(e);
    };
    n.isLowercase = function (e) {
      return e === e.toLowerCase();
    };
    n.isUppercase = function (e) {
      return e === e.toUpperCase();
    };
    n.isInt = function (e, t) {
      t = t || {};
      return (
        w.test(e) &&
        (!t.hasOwnProperty('min') || +e >= t.min) &&
        (!t.hasOwnProperty('max') || +e <= t.max)
      );
    };
    n.isId = function (e) {
      return T.test(e);
    };
    n.isFloat = function (e, t) {
      t = t || {};
      if ('' === e || '.' === e) return !1;
      else
        return (
          C.test(e) &&
          (!t.hasOwnProperty('min') || e >= t.min) &&
          (!t.hasOwnProperty('max') || e <= t.max)
        );
    };
    n.isDivisibleBy = function (e, t) {
      return n.toFloat(e) % n.toInt(t) === 0;
    };
    n.isNull = function (e) {
      return 0 === e.length;
    };
    n.isLength = function (e, t) {
      var n, i;
      if ('object' == typeof t) {
        n = t.min || 0;
        i = t.max;
      } else {
        n = arguments[1] || 0;
        i = arguments[2];
      }
      var o = e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
      var a = e.length - o.length;
      return a >= n && ('undefined' == typeof i || a <= i);
    };
    n.isByteLength = function (e, t) {
      var n, i;
      if ('object' == typeof t) {
        n = t.min || 0;
        i = t.max;
      } else {
        n = arguments[1] || 0;
        i = arguments[2];
      }
      var o = encodeURI(e).split(/%..|./).length - 1;
      return o >= n && ('undefined' == typeof i || o <= i);
    };
    n.isUUID = function (e, t) {
      var n = b[t ? t : 'all'];
      return n && n.test(e);
    };
    n.isDate = function (e) {
      var t = new Date(Date.parse(e));
      if (isNaN(t)) return !1;
      var n = a(e);
      if (null !== n) {
        var i = t.getTimezoneOffset() - n;
        t = new Date(t.getTime() + 6e4 * i);
      }
      var o = String(t.getDate());
      var r, s, c;
      s = e.match(/(^|[^:\d])[23]\d([^:\d]|$)/g);
      if (!s) return !0;
      r = s
        .map(function (e) {
          return e.match(/\d+/g)[0];
        })
        .join('/');
      c = String(t.getFullYear()).slice(-2);
      if (r === o || r === c) return !0;
      else if (r === o + '/' + c || r === c + '/' + o) return !0;
      return !1;
    };
    n.isAfter = function (e, t) {
      var i = n.toDate(t || new Date()),
        o = n.toDate(e);
      return !!(o && i && o > i);
    };
    n.isBefore = function (e, t) {
      var i = n.toDate(t || new Date()),
        o = n.toDate(e);
      return !!(o && i && o < i);
    };
    n.isIn = function (e, t) {
      var i;
      if ('[object Array]' === Object.prototype.toString.call(t)) {
        var o = [];
        for (i in t) o[i] = n.toString(t[i]);
        return o.indexOf(e) >= 0;
      } else if ('object' == typeof t) return t.hasOwnProperty(e);
      else if (t && 'function' == typeof t.indexOf) return t.indexOf(e) >= 0;
      return !1;
    };
    n.isWhitelisted = function (e, t) {
      for (var n = e.length - 1; n >= 0; n--) if (t.indexOf(e[n]) === -1) return !1;
      return !0;
    };
    n.isCreditCard = function (e) {
      var t = e.replace(/[^0-9]+/g, '');
      if (!u.test(t)) return !1;
      var n = 0,
        i,
        o,
        a;
      for (var r = t.length - 1; r >= 0; r--) {
        i = t.substring(r, r + 1);
        o = parseInt(i, 10);
        if (a) {
          o *= 2;
          if (o >= 10) n += (o % 10) + 1;
          else n += o;
        } else n += o;
        a = !a;
      }
      return !!(n % 10 === 0 ? t : !1);
    };
    n.isISIN = function (e) {
      if (!_.test(e)) return !1;
      var t = e.replace(/[A-Z]/g, function (e) {
        return parseInt(e, 36);
      });
      var n = 0,
        i,
        o,
        a = !0;
      for (var r = t.length - 2; r >= 0; r--) {
        i = t.substring(r, r + 1);
        o = parseInt(i, 10);
        if (a) {
          o *= 2;
          if (o >= 10) n += o + 1;
          else n += o;
        } else n += o;
        a = !a;
      }
      return parseInt(e.substr(e.length - 1), 10) === (1e4 - n) % 10;
    };
    n.isISBN = function (e, t) {
      t = n.toString(t);
      if (!t) return n.isISBN(e, 10) || n.isISBN(e, 13);
      var i = e.replace(/[\s-]+/g, ''),
        o = 0,
        a;
      if ('10' === t) {
        if (!f.test(i)) return !1;
        for (a = 0; a < 9; a++) o += (a + 1) * i.charAt(a);
        if ('X' === i.charAt(9)) o += 100;
        else o += 10 * i.charAt(9);
        if (o % 11 === 0) return !!i;
      } else if ('13' === t) {
        if (!h.test(i)) return !1;
        var r = [1, 3];
        for (a = 0; a < 12; a++) o += r[a % 2] * i.charAt(a);
        if (i.charAt(12) - ((10 - (o % 10)) % 10) === 0) return !!i;
      }
      return !1;
    };
    n.isMobilePhone = function (e, t) {
      if (t in R) return R[t].test(e);
      else return !1;
    };
    var F = {
      symbol: '$',
      require_symbol: !1,
      allow_space_after_symbol: !1,
      symbol_after_digits: !1,
      allow_negatives: !0,
      parens_for_negatives: !1,
      negative_sign_before_digits: !1,
      negative_sign_after_digits: !1,
      allow_negative_sign_placeholder: !1,
      thousands_separator: ',',
      decimal_separator: '.',
      allow_space_after_digits: !1,
    };
    n.isCurrency = function (e, t) {
      t = i(t, F);
      return o(t).test(e);
    };
    n.isJSON = function (e) {
      try {
        var t = JSON.parse(e);
        return !!t && 'object' == typeof t;
      } catch (n) {}
      return !1;
    };
    n.isMultibyte = function (e) {
      return A.test(e);
    };
    n.isAscii = function (e) {
      return S.test(e);
    };
    n.isFullWidth = function (e) {
      return N.test(e);
    };
    n.isHalfWidth = function (e) {
      return O.test(e);
    };
    n.isVariableWidth = function (e) {
      return N.test(e) && O.test(e);
    };
    n.isSurrogatePair = function (e) {
      return L.test(e);
    };
    n.isBase64 = function (e) {
      return D.test(e);
    };
    n.isMongoId = function (e) {
      return n.isHexadecimal(e) && 24 === e.length;
    };
    n.isISO8601 = function (e) {
      return k.test(e);
    };
    n.ltrim = function (e, t) {
      var n = t ? new RegExp('^[' + t + ']+', 'g') : /^\s+/g;
      return e.replace(n, '');
    };
    n.rtrim = function (e, t) {
      var n = t ? new RegExp('[' + t + ']+$', 'g') : /\s+$/g;
      return e.replace(n, '');
    };
    n.trim = function (e, t) {
      var n = t ? new RegExp('^[' + t + ']+|[' + t + ']+$', 'g') : /^\s+|\s+$/g;
      return e.replace(n, '');
    };
    n.escape = function (e) {
      return e
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\//g, '&#x2F;')
        .replace(/\`/g, '&#96;');
    };
    n.stripLow = function (e, t) {
      var i = t ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
      return n.blacklist(e, i);
    };
    n.whitelist = function (e, t) {
      return e.replace(new RegExp('[^' + t + ']+', 'g'), '');
    };
    n.blacklist = function (e, t) {
      return e.replace(new RegExp('[' + t + ']+', 'g'), '');
    };
    var H = { lowercase: !0, remove_dots: !0, remove_extension: !0 };
    n.normalizeEmail = function (e, t) {
      t = i(t, H);
      if (!n.isEmail(e)) return !1;
      var o = e.split('@', 2);
      o[1] = o[1].toLowerCase();
      if ('gmail.com' === o[1] || 'googlemail.com' === o[1]) {
        if (t.remove_extension) o[0] = o[0].split('+')[0];
        if (t.remove_dots) o[0] = o[0].replace(/\./g, '');
        if (!o[0].length) return !1;
        o[0] = o[0].toLowerCase();
        o[1] = 'gmail.com';
      } else if (t.lowercase) o[0] = o[0].toLowerCase();
      return o.join('@');
    };
    n.init();
    return n;
  },
  '7af1d8adfbbd073e9119142538a22e8e',
  'fe86216ed59e3103a56c42c850d389f0',
);
