EDU(
  '928e07b32b76825f2af5cb2ecdc4cada',
  function (e, t) {
    'use strict';
    function n(e) {
      var t = e.match(R),
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
    t = { version: '4.5.2' };
    var a = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var r =
      /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var s = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var c =
      /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    var d =
      /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
    var l =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    var u = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
    var _ = /^(?:[0-9]{9}X|[0-9]{10})$/,
      f = /^(?:[0-9]{13})$/;
    var h = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
    var p = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,
      m = /^[0-9A-F]{1,4}$/i;
    var g = {
      3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    };
    var b = /^[A-Z]+$/i,
      v = /^[0-9A-Z]+$/i,
      E = /^[-+]?[0-9]+$/,
      x = /^(?:[-+]?(?:0|[1-9][0-9]*))$/,
      w = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,
      C = /^[0-9A-F]+$/i,
      y = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,
      $ = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,
      I = /^[0-9]+$/;
    var T = /^[\x00-\x7F]+$/,
      S = /[^\x00-\x7F]/,
      A = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,
      N = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
    var O = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    var L = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
    var D = {
      'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
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
    var R =
      /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    var k = /^\+?(\d*(\.\d{1,2})?)$/;
    t.isSoftDecimal2 = function (e, t, n, i) {
      t = 0 | t;
      return k.test(e) && parseFloat(e) > t && (n ? parseFloat(e) <= n : !0);
    };
    t.extend = function (e, n) {
      t[e] = function () {
        var e = Array.prototype.slice.call(arguments);
        e[0] = t.toString(e[0]);
        return n.apply(t, e);
      };
    };
    t.init = function () {
      for (var e in t)
        if (
          'function' == typeof t[e] &&
          'toString' !== e &&
          'toDate' !== e &&
          'extend' !== e &&
          'init' !== e
        )
          t.extend(e, t[e]);
        else;
    };
    t.toString = function (e) {
      if ('object' == typeof e && null !== e && e.toString) e = e.toString();
      else if (null === e || 'undefined' == typeof e || (isNaN(e) && !e.length)) e = '';
      return '' + e;
    };
    t.toDate = function (e) {
      if ('[object Date]' === Object.prototype.toString.call(e)) return e;
      e = Date.parse(e);
      return !isNaN(e) ? new Date(e) : null;
    };
    t.toFloat = function (e) {
      return parseFloat(e);
    };
    t.inputTips = function (t, n, i, o, a) {
      n = n || 0;
      var r = Math.ceil(e._$getStringLength(t) / 2);
      a = a || '个字';
      if (r < n) return { message: '至少输入' + n + a, success: !1 };
      else if (r > i) return { message: '超出' + (r - i) + a, success: !1 };
      else if (o && i) return { message: '还可以输入' + (i - r) + a, success: !0 };
      else return { message: '', success: !0 };
    };
    t.toInt = function (e, t) {
      return parseInt(e, t || 10);
    };
    t.toBoolean = function (e, t) {
      if (t) return '1' === e || 'true' === e;
      else return '0' !== e && 'false' !== e && '' !== e;
    };
    t.equals = function (e, n) {
      return e === t.toString(n);
    };
    t.contains = function (e, n) {
      return e.indexOf(t.toString(n)) >= 0;
    };
    t.matches = function (e, t, n) {
      if ('[object RegExp]' !== Object.prototype.toString.call(t)) t = new RegExp(t, n);
      return t.test(e);
    };
    var U = { allow_display_name: !1, allow_utf8_local_part: !0, require_tld: !0 };
    t.isEmail = function (e, n) {
      n = i(n, U);
      if (n.allow_display_name) {
        var o = e.match(d);
        if (o) e = o[1];
      }
      var l = e.split('@'),
        u = l.pop(),
        _ = l.join('@');
      var f = u.toLowerCase();
      if ('gmail.com' === f || 'googlemail.com' === f) _ = _.replace(/\./g, '').toLowerCase();
      if (!t.isByteLength(_, { max: 64 }) || !t.isByteLength(u, { max: 256 })) return !1;
      if (!t.isFQDN(u, { require_tld: n.require_tld })) return !1;
      if ('"' === _[0]) {
        _ = _.slice(1, _.length - 1);
        return n.allow_utf8_local_part ? c.test(_) : r.test(_);
      }
      var h = n.allow_utf8_local_part ? s : a;
      var p = _.split('.');
      for (var m = 0; m < p.length; m++) if (!h.test(p[m])) return !1;
      return !0;
    };
    var P = {
      protocols: ['http', 'https', 'ftp'],
      require_tld: !0,
      require_protocol: !1,
      require_valid_protocol: !0,
      allow_underscores: !1,
      allow_trailing_dot: !1,
      allow_protocol_relative_urls: !1,
    };
    t.isURL = function (e, n) {
      if (!e || e.length >= 2083 || /\s/.test(e)) return !1;
      if (0 === e.indexOf('mailto:')) return !1;
      n = i(n, P);
      var o, a, r, s, c, d, l;
      l = e.split('://');
      if (l.length > 1) {
        o = l.shift();
        if (n.require_valid_protocol && n.protocols.indexOf(o) === -1) return !1;
      } else if (n.require_protocol) return !1;
      else if (n.allow_protocol_relative_urls && '//' === e.substr(0, 2)) l[0] = e.substr(2);
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
      if (!t.isIP(r) && !t.isFQDN(r, n) && 'localhost' !== r) return !1;
      if (n.host_whitelist && n.host_whitelist.indexOf(r) === -1) return !1;
      if (n.host_blacklist && n.host_blacklist.indexOf(r) !== -1) return !1;
      else return !0;
    };
    t.isMACAddress = function (e) {
      return h.test(e);
    };
    t.isIP = function (e, n) {
      n = t.toString(n);
      if (!n) return t.isIP(e, 4) || t.isIP(e, 6);
      else if ('4' === n) {
        if (!p.test(e)) return !1;
        var i = e.split('.').sort(function (e, t) {
          return e - t;
        });
        return i[3] <= 255;
      } else if ('6' === n) {
        var o = e.split(':');
        var a = !1;
        var r = t.isIP(o[o.length - 1], 4);
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
          else if (!m.test(o[c])) return !1;
        if (a) return o.length >= 1;
        else return o.length === s;
      }
      return !1;
    };
    var M = { require_tld: !0, allow_underscores: !1, allow_trailing_dot: !1 };
    t.isFQDN = function (e, t) {
      t = i(t, M);
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
    t.isBoolean = function (e) {
      return ['true', 'false', '1', '0'].indexOf(e) >= 0;
    };
    t.isAlpha = function (e) {
      return b.test(e);
    };
    t.isAlphanumeric = function (e) {
      return v.test(e);
    };
    t.isNumeric = function (e) {
      return E.test(e);
    };
    t.isDecimal = function (e) {
      return '' !== e && y.test(e);
    };
    t.isHexadecimal = function (e) {
      return C.test(e);
    };
    t.isHexColor = function (e) {
      return $.test(e);
    };
    t.isLowercase = function (e) {
      return e === e.toLowerCase();
    };
    t.isUppercase = function (e) {
      return e === e.toUpperCase();
    };
    t.isInt = function (e, t) {
      t = t || {};
      return (
        x.test(e) &&
        (!t.hasOwnProperty('min') || +e >= t.min) &&
        (!t.hasOwnProperty('max') || +e <= t.max)
      );
    };
    t.isId = function (e, t) {
      t = t || {};
      return I.test(e);
    };
    t.isFloat = function (e, t) {
      t = t || {};
      if ('' === e || '.' === e) return !1;
      else
        return (
          w.test(e) &&
          (!t.hasOwnProperty('min') || e >= t.min) &&
          (!t.hasOwnProperty('max') || e <= t.max)
        );
    };
    t.isDivisibleBy = function (e, n) {
      return t.toFloat(e) % t.toInt(n) === 0;
    };
    t.isNull = function (e) {
      return 0 === e.length;
    };
    t.isLength = function (e, t) {
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
    t.isByteLength = function (e, t) {
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
    t.isUUID = function (e, t) {
      var n = g[t ? t : 'all'];
      return n && n.test(e);
    };
    t.isDate = function (e) {
      var t = new Date(Date.parse(e));
      if (isNaN(t)) return !1;
      var i = n(e);
      if (null !== i) {
        var o = t.getTimezoneOffset() - i;
        t = new Date(t.getTime() + 6e4 * o);
      }
      var a = String(t.getDate());
      var r, s, c;
      s = e.match(/(^|[^:\d])[23]\d([^:\d]|$)/g);
      if (!s) return !0;
      r = s
        .map(function (e) {
          return e.match(/\d+/g)[0];
        })
        .join('/');
      c = String(t.getFullYear()).slice(-2);
      if (r === a || r === c) return !0;
      else if (r === a + '/' + c || r === c + '/' + a) return !0;
      return !1;
    };
    t.isAfter = function (e, n) {
      var i = t.toDate(n || new Date()),
        o = t.toDate(e);
      return !!(o && i && o > i);
    };
    t.isBefore = function (e, n) {
      var i = t.toDate(n || new Date()),
        o = t.toDate(e);
      return !!(o && i && o < i);
    };
    t.isIn = function (e, n) {
      var i;
      if ('[object Array]' === Object.prototype.toString.call(n)) {
        var o = [];
        for (i in n) o[i] = t.toString(n[i]);
        return o.indexOf(e) >= 0;
      } else if ('object' == typeof n) return n.hasOwnProperty(e);
      else if (n && 'function' == typeof n.indexOf) return n.indexOf(e) >= 0;
      return !1;
    };
    t.isWhitelisted = function (e, t) {
      for (var n = e.length - 1; n >= 0; n--) if (t.indexOf(e[n]) === -1) return !1;
      return !0;
    };
    t.isCreditCard = function (e) {
      var t = e.replace(/[^0-9]+/g, '');
      if (!l.test(t)) return !1;
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
    t.isISIN = function (e) {
      if (!u.test(e)) return !1;
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
    t.isISBN = function (e, n) {
      n = t.toString(n);
      if (!n) return t.isISBN(e, 10) || t.isISBN(e, 13);
      var i = e.replace(/[\s-]+/g, ''),
        o = 0,
        a;
      if ('10' === n) {
        if (!_.test(i)) return !1;
        for (a = 0; a < 9; a++) o += (a + 1) * i.charAt(a);
        if ('X' === i.charAt(9)) o += 100;
        else o += 10 * i.charAt(9);
        if (o % 11 === 0) return !!i;
      } else if ('13' === n) {
        if (!f.test(i)) return !1;
        var r = [1, 3];
        for (a = 0; a < 12; a++) o += r[a % 2] * i.charAt(a);
        if (i.charAt(12) - ((10 - (o % 10)) % 10) === 0) return !!i;
      }
      return !1;
    };
    t.isMobilePhone = function (e, t) {
      if (t in D) return D[t].test(e);
      else return !1;
    };
    var B = {
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
    t.isCurrency = function (e, t) {
      t = i(t, B);
      return o(t).test(e);
    };
    t.isJSON = function (e) {
      try {
        var t = JSON.parse(e);
        return !!t && 'object' == typeof t;
      } catch (n) {}
      return !1;
    };
    t.isMultibyte = function (e) {
      return S.test(e);
    };
    t.isAscii = function (e) {
      return T.test(e);
    };
    t.isFullWidth = function (e) {
      return A.test(e);
    };
    t.isHalfWidth = function (e) {
      return N.test(e);
    };
    t.isVariableWidth = function (e) {
      return A.test(e) && N.test(e);
    };
    t.isSurrogatePair = function (e) {
      return O.test(e);
    };
    t.isBase64 = function (e) {
      return L.test(e);
    };
    t.isMongoId = function (e) {
      return t.isHexadecimal(e) && 24 === e.length;
    };
    t.isISO8601 = function (e) {
      return R.test(e);
    };
    t.ltrim = function (e, t) {
      var n = t ? new RegExp('^[' + t + ']+', 'g') : /^\s+/g;
      return e.replace(n, '');
    };
    t.rtrim = function (e, t) {
      var n = t ? new RegExp('[' + t + ']+$', 'g') : /\s+$/g;
      return e.replace(n, '');
    };
    t.trim = function (e, t) {
      var n = t ? new RegExp('^[' + t + ']+|[' + t + ']+$', 'g') : /^\s+|\s+$/g;
      return e.replace(n, '');
    };
    t.escape = function (e) {
      return e
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\//g, '&#x2F;')
        .replace(/\`/g, '&#96;');
    };
    t.stripLow = function (e, n) {
      var i = n ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
      return t.blacklist(e, i);
    };
    t.whitelist = function (e, t) {
      return e.replace(new RegExp('[^' + t + ']+', 'g'), '');
    };
    t.blacklist = function (e, t) {
      return e.replace(new RegExp('[' + t + ']+', 'g'), '');
    };
    var F = { lowercase: !0, remove_dots: !0, remove_extension: !0 };
    t.normalizeEmail = function (e, n) {
      n = i(n, F);
      if (!t.isEmail(e)) return !1;
      var o = e.split('@', 2);
      o[1] = o[1].toLowerCase();
      if ('gmail.com' === o[1] || 'googlemail.com' === o[1]) {
        if (n.remove_extension) o[0] = o[0].split('+')[0];
        if (n.remove_dots) o[0] = o[0].replace(/\./g, '');
        if (!o[0].length) return !1;
        o[0] = o[0].toLowerCase();
        o[1] = 'gmail.com';
      } else if (n.lowercase) o[0] = o[0].toLowerCase();
      return o.join('@');
    };
    t.init();
    return t;
  },
  '50ff622f043441ddf14df6a87321feda',
);
