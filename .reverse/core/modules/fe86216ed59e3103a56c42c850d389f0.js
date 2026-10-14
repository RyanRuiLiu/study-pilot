EDU(
  'fe86216ed59e3103a56c42c850d389f0',
  function (e, t, n, i, o, a) {
    var r = function (e, t) {
      try {
        t = t.toLowerCase();
        if (null === e) return 'null' == t;
        if (void 0 === e) return 'undefined' == t;
        else return i.toString.call(e).toLowerCase() == '[object ' + t + ']';
      } catch (n) {
        return !1;
      }
    };
    n._$isFunction = function (e) {
      return r(e, 'function');
    };
    n._$isString = function (e) {
      return r(e, 'string');
    };
    n._$isNumber = function (e) {
      return r(e, 'number');
    };
    n._$isBoolean = function (e) {
      return r(e, 'boolean');
    };
    n._$isDate = function (e) {
      return r(e, 'date');
    };
    n._$isArray = function (e) {
      return r(e, 'array');
    };
    n._$isObject = function (e) {
      return r(e, 'object');
    };
    n._$length = (function () {
      var e = /[^\x00-\xff]/g;
      return function (t) {
        return ('' + (t || '')).replace(e, '**').length;
      };
    })();
    n._$loop = function (e, i, o) {
      if (n._$isObject(e) && n._$isFunction(i)) return t.__forIn.apply(t, arguments);
      else return null;
    };
    n._$indexOf = function (e, t) {
      var i = n._$isFunction(t)
          ? t
          : function (e) {
              return e === t;
            },
        o = n._$forIn(e, i);
      return null != o ? o : -1;
    };
    n._$binSearch = (function () {
      var e;
      var t = function (n, i, o) {
        if (i > o) return -1;
        var a = Math.ceil((i + o) / 2),
          r = e(n[a], a, n);
        if (0 == r) return a;
        if (r < 0) return t(n, i, a - 1);
        else return t(n, a + 1, o);
      };
      return function (n, i) {
        e = i || o;
        return t(n, 0, n.length - 1);
      };
    })();
    n._$reverseEach = function (e, t, i) {
      if (e && e.length && n._$isFunction(t))
        for (var o = e.length - 1; o >= 0; o--) if (t.call(i, e[o], o, e)) return o;
      return null;
    };
    n._$forEach = function (e, i, o) {
      if (e && e.length && n._$isFunction(i))
        if (!e.forEach) n._$forIn.apply(n, arguments);
        else t.__forEach(e, i, o);
    };
    n._$forIn = function (e, t, i) {
      if (!e || !n._$isFunction(t)) return null;
      if (n._$isNumber(e.length)) {
        for (var o = 0, a = e.length; o < a; o++) if (t.call(i, e[o], o, e)) return o;
      } else if (n._$isObject(e)) return n._$loop(e, t, i);
      return null;
    };
    n._$encode = function (e, t) {
      t = '' + t;
      if (!e || !t) return t || '';
      else
        return t.replace(e.r, function (t) {
          var n = e[!e.i ? t.toLowerCase() : t];
          return null != n ? n : t;
        });
    };
    n._$escape = (function () {
      var e = /<br\/?>$/,
        t = {
          r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          ' ': '&nbsp;',
          '"': '&quot;',
          "'": '&#39;',
          '\n': '<br/>',
          '\r': '',
        };
      return function (i) {
        i = n._$encode(t, i);
        return i.replace(e, '<br/><br/>');
      };
    })();
    n._$unescape = (function () {
      var e = {
        r: /\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&nbsp;': ' ',
        '&#39;': "'",
        '&quot;': '"',
        '<br/>': '\n',
      };
      return function (t) {
        return n._$encode(e, t);
      };
    })();
    n._$format = (function () {
      var e = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g },
        t = ['上午', '下午'],
        i = ['A.M.', 'P.M.'],
        o = ['日', '一', '二', '三', '四', '五', '六'],
        a = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        r = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var s = function (e) {
        e = parseInt(e) || 0;
        return (e < 10 ? '0' : '') + e;
      };
      var c = function (e) {
        return e < 12 ? 0 : 1;
      };
      return function (d, l, u) {
        if (!d || !l) return '';
        d = n._$var2date(d);
        e.yyyy = d.getFullYear();
        e.yy = ('' + e.yyyy).substr(2);
        e.M = d.getMonth() + 1;
        e.MM = s(e.M);
        e.eM = r[e.M - 1];
        e.cM = a[e.M - 1];
        e.d = d.getDate();
        e.dd = s(e.d);
        e.H = d.getHours();
        e.HH = s(e.H);
        e.m = d.getMinutes();
        e.mm = s(e.m);
        e.s = d.getSeconds();
        e.ss = s(e.s);
        e.ms = d.getMilliseconds();
        e.w = o[d.getDay()];
        var _ = c(e.H);
        e.ct = t[_];
        e.et = i[_];
        if (u) e.H = e.H % 12;
        return n._$encode(e, l);
      };
    })();
    n._$var2date = function (e) {
      var i = e;
      if (n._$isString(e)) i = new Date(t.__str2time(e));
      if (!n._$isDate(i)) i = new Date(e);
      return i;
    };
    n._$fixed = function (e, t) {
      return parseFloat(new Number(e).toFixed(t));
    };
    n._$absolute = (function () {
      var e = /([^\/:])\/.*$/,
        t = /\/[^\/]+$/,
        n = /[#\?]/,
        i = location.href.split(/[?#]/)[0],
        o = document.createElement('a');
      var a = function (e) {
        e = e || '';
        return e.indexOf('://') > 0 || 0 === e.indexOf('//');
      };
      var r = function (e) {
        return (e || '').split(n)[0].replace(t, '/');
      };
      var s = function (t, n) {
        if (0 == t.indexOf('/')) return n.replace(e, '$1') + t;
        else return r(n) + t;
      };
      i = r(i);
      return function (e, t) {
        e = (e || '').trim();
        if (!a(t)) t = i;
        if (!e) return t;
        if (0 === e.indexOf('//')) {
          var n = t.split(':');
          e = n[0] + ':' + e;
        }
        if (a(e)) return e;
        e = s(e, t);
        o.href = e;
        e = o.href;
        return a(e) ? e : o.getAttribute('href', 4);
      };
    })();
    n._$url2origin = (function () {
      var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
      return function (t) {
        t = t || '';
        if (0 === t.indexOf('//')) t = location.protocol + t;
        if (e.test(t)) return RegExp.$1.toLowerCase();
        else return '';
      };
    })();
    n._$string2object = function (e, t, i) {
      var o = {};
      var a = i;
      if (!n._$isFunction(a))
        a = function (e) {
          return !i ? e : decodeURIComponent(e);
        };
      n._$forEach((e || '').split(t), function (e) {
        var t = e.split('=');
        if (t && t.length) {
          var n = t.shift();
          if (n) o[a(n)] = a(t.join('='));
        }
      });
      return o;
    };
    n._$object2string = function (e, t, i) {
      if (!e) return '';
      var o = [];
      var a = i;
      if (!n._$isFunction(a))
        a = function (e) {
          return !i ? e : encodeURIComponent(e);
        };
      n._$loop(e, function (e, t) {
        if (!n._$isFunction(e)) {
          if (n._$isDate(e)) e = e.getTime();
          else if (n._$isArray(e)) e = e.join(',');
          else if (n._$isObject(e)) e = JSON.stringify(e);
          o.push(a(t) + '=' + a(e));
        }
      });
      return o.join(t || ',');
    };
    n._$objectEncodeValue = function (e) {
      var t = {};
      if (n._$isObject(e)) {
        n._$loop(e, function (e, i) {
          if (n._$isObject(e)) t[i] = n._$objectEncodeValue(e);
          else if (n._$isString(e)) t[i] = encodeURIComponent(n._$unescape(e));
          else if (n._$isArray(e)) t[i] = n._$objectEncodeValue(e);
          else t[i] = e;
        });
        return t;
      } else if (n._$isArray(e)) {
        t = [];
        t.length = e.length;
        n._$forEach(e, function (e, i) {
          if (n._$isObject(e)) t[i] = n._$objectEncodeValue(e);
          else if (n._$isString(e)) t[i] = encodeURIComponent(n._$unescape(e));
          else if (n._$isArray(e)) t[i] = n._$objectEncodeValue(e);
          else t[i] = e;
        });
        return t;
      }
      return e;
    };
    n._$query2object = function (e) {
      return n._$string2object(e, '&', !0);
    };
    n._$object2query = function (e) {
      return n._$object2string(e, '&', !0);
    };
    n._$object2array = function (e) {
      return t.__col2array(e);
    };
    n._$array2object = function (e, t) {
      var i = {};
      n._$forEach(e, function (e) {
        var n = e;
        if (t) n = t(e);
        if (null != n) i[n] = e;
      });
      return i;
    };
    n._$number2string = function (e, t) {
      var n = ('' + e).length,
        i = Math.max(1, parseInt(t) || 0),
        o = i - n;
      if (o > 0) e = new Array(o + 1).join('0') + e;
      return '' + e;
    };
    n._$safeDelete = function (e, t) {
      if (!n._$isArray(t))
        try {
          delete e[t];
        } catch (i) {
          e[t] = void 0;
        }
      else
        n._$forEach(t, function (t) {
          n._$safeDelete(e, t);
        });
    };
    n._$randString = (function () {
      var e = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      return function (t) {
        t = t || 10;
        var n = [];
        for (var i = 0, o; i < t; ++i) {
          o = Math.floor(Math.random() * e.length);
          n.push(e.charAt(o));
        }
        return n.join('');
      };
    })();
    n._$randNumber = function (e, t) {
      return Math.floor(Math.random() * (t - e) + e);
    };
    n._$randNumberString = function (e) {
      e = Math.max(0, Math.min(e || 8, 30));
      var t = Math.pow(10, e - 1),
        i = 10 * t;
      return n._$randNumber(t, i).toString();
    };
    n._$uniqueID = (function () {
      var e = +new Date();
      return function () {
        return '' + e++;
      };
    })();
    n._$query = function (e, t) {
      e = e || i;
      var n = (t || '').split('.');
      for (var o = 0, a = n.length; o < a; o++) {
        e = e[n[o]];
        if (!e) break;
      }
      return e;
    };
    n._$merge = function () {
      var e = arguments.length - 1,
        t = arguments[e];
      if (n._$isFunction(t)) e -= 1;
      else t = o;
      var i = arguments[0] || {};
      for (var a = 1; a <= e; a++)
        n._$loop(arguments[a], function (e, n) {
          if (!t(e, n)) i[n] = e;
        });
      return i;
    };
    n._$fetch = function (e, t) {
      if (t)
        n._$loop(e, function (e, n, i) {
          var o = t[n];
          if (null != o) i[n] = o;
        });
      return e;
    };
    n._$hasProperty = function (e) {
      if (!e) return !1;
      if (null != e.length) return e.length > 0;
      var t = 0;
      n._$loop(e, function () {
        t++;
        return t > 0;
      });
      return t > 0;
    };
    if (!0) {
      e.Q = n._$query;
      e.X = n._$merge;
      e.EX = n._$fetch;
      e.copy(this.NEJ, e);
      e.copy(e.P('nej.u'), n);
    }
    return n;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '8b3c26ee8c8ddcec4232744980b019f4',
);
