EDU('27686b3c560af71bed80223c857240ee', function () {
  function e() {
    if (!window.moocTempReplace)
      Object.defineProperty(window, 'moocTempReplace', {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: String.prototype.replace,
      });
    if (!window.moocTempMatch)
      Object.defineProperty(window, 'moocTempMatch', {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: String.prototype.match,
      });
  }
  var t;
  if (t) throw Error("can't load XRegExp twice in the same frame");
  e();
  !(function (n) {
    function i(e, n) {
      if (!t.isRegExp(e)) throw TypeError('type RegExp expected');
      var i = e._xregexp;
      e = t(e.source, o(e) + (n || ''));
      if (i)
        e._xregexp = {
          source: i.source,
          captureNames: i.captureNames ? i.captureNames.slice(0) : null,
        };
      return e;
    }
    function o(e) {
      return (
        (e.global ? 'g' : '') +
        (e.ignoreCase ? 'i' : '') +
        (e.multiline ? 'm' : '') +
        (e.extended ? 'x' : '') +
        (e.sticky ? 'y' : '')
      );
    }
    function a(e, t, n, i) {
      var o = u.length,
        a,
        r,
        s;
      l = !0;
      try {
        for (; o--;) {
          s = u[o];
          if (n & s.scope && (!s.trigger || s.trigger.call(i))) {
            s.pattern.lastIndex = t;
            r = s.pattern.exec(e);
            if (r && r.index === t) {
              a = { output: s.handler.call(i, r, n), match: r };
              break;
            }
          }
        }
      } catch (c) {
        throw c;
      } finally {
        l = !1;
      }
      return a;
    }
    function r(e, t, n) {
      if (Array.prototype.indexOf) return e.indexOf(t, n);
      for (var i = n || 0; i < e.length; i++) if (e[i] === t) return i;
      return -1;
    }
    t = function (e, o) {
      var r = [],
        s = t.OUTSIDE_CLASS,
        d = 0,
        u,
        f,
        h,
        p,
        g;
      if (t.isRegExp(e)) {
        if (o !== n)
          throw TypeError("can't supply flags when constructing one RegExp from another");
        return i(e);
      }
      if (l) throw Error("can't call the XRegExp constructor within token definition functions");
      o = o || '';
      u = {
        hasNamedCapture: !1,
        captureNames: [],
        hasFlag: function (e) {
          return o.indexOf(e) > -1;
        },
        setFlag: function (e) {
          o += e;
        },
      };
      for (; d < e.length;) {
        f = a(e, d, s, u);
        if (f) {
          r.push(f.output);
          d += f.match[0].length || 1;
        } else if ((h = _.exec.call(m[s], e.slice(d)))) {
          r.push(h[0]);
          d += h[0].length;
        } else {
          p = e.charAt(d);
          if ('[' === p) s = t.INSIDE_CLASS;
          else if (']' === p) s = t.OUTSIDE_CLASS;
          r.push(p);
          d++;
        }
      }
      g = RegExp(r.join(''), _.replace.call(o, c, ''));
      g._xregexp = { source: e, captureNames: u.hasNamedCapture ? u.captureNames : null };
      return g;
    };
    t.version = '1.5.1';
    t.INSIDE_CLASS = 1;
    t.OUTSIDE_CLASS = 2;
    var s = /\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,
      c = /[^gimy]+|([\s\S])(?=[\s\S]*\1)/g,
      d = /^(?:[?*+]|{\d+(?:,\d*)?})\??/,
      l = !1,
      u = [],
      _ = {
        exec: RegExp.prototype.exec,
        test: RegExp.prototype.test,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split,
      },
      f = _.exec.call(/()??/, '')[1] === n,
      h = (function () {
        var e = /^/g;
        _.test.call(e, '');
        return !e.lastIndex;
      })(),
      p = RegExp.prototype.sticky !== n,
      m = {};
    m[t.INSIDE_CLASS] =
      /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/;
    m[t.OUTSIDE_CLASS] =
      /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/;
    t.addToken = function (e, n, o, a) {
      u.push({
        pattern: i(e, 'g' + (p ? 'y' : '')),
        handler: n,
        scope: o || t.OUTSIDE_CLASS,
        trigger: a || null,
      });
    };
    t.cache = function (e, n) {
      var i = e + '/' + (n || '');
      return t.cache[i] || (t.cache[i] = t(e, n));
    };
    t.copyAsGlobal = function (e) {
      return i(e, 'g');
    };
    t.escape = function (e) {
      return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    t.execAt = function (e, t, n, o) {
      var a = i(t, 'g' + (o && p ? 'y' : '')),
        r;
      a.lastIndex = n = n || 0;
      r = a.exec(e);
      if (o && r && r.index !== n) r = null;
      if (t.global) t.lastIndex = r ? a.lastIndex : 0;
      return r;
    };
    t.freezeTokens = function () {
      t.addToken = function () {
        throw Error("can't run addToken after freezeTokens");
      };
    };
    t.isRegExp = function (e) {
      return '[object RegExp]' === Object.prototype.toString.call(e);
    };
    t.iterate = function (e, t, n, o) {
      var a = i(t, 'g'),
        r = -1,
        s;
      for (; (s = a.exec(e));) {
        if (t.global) t.lastIndex = a.lastIndex;
        n.call(o, s, ++r, e, t);
        if (a.lastIndex === s.index) a.lastIndex++;
      }
      if (t.global) t.lastIndex = 0;
    };
    t.matchChain = function (e, n) {
      return (function o(e, a) {
        var r = n[a].regex ? n[a] : { regex: n[a] },
          s = i(r.regex, 'g'),
          c = [],
          d;
        for (d = 0; d < e.length; d++)
          t.iterate(e[d], s, function (e) {
            c.push(r.backref ? e[r.backref] || '' : e[0]);
          });
        return a === n.length - 1 || !c.length ? c : o(c, a + 1);
      })([e], 0);
    };
    RegExp.prototype.apply = function (e, t) {
      return this.exec(t[0]);
    };
    RegExp.prototype.call = function (e, t) {
      return this.exec(t);
    };
    RegExp.prototype.exec = function (e) {
      var t, i, a, s;
      if (!this.global) s = this.lastIndex;
      t = _.exec.apply(this, arguments);
      if (t) {
        if (!f && t.length > 1 && r(t, '') > -1) {
          a = RegExp(this.source, _.replace.call(o(this), 'g', ''));
          _.replace.call((e + '').slice(t.index), a, function () {
            for (var e = 1; e < arguments.length - 2; e++) if (arguments[e] === n) t[e] = n;
          });
        }
        if (this._xregexp && this._xregexp.captureNames)
          for (var c = 1; c < t.length; c++) {
            i = this._xregexp.captureNames[c - 1];
            if (i) t[i] = t[c];
          }
        if (!h && this.global && !t[0].length && this.lastIndex > t.index) this.lastIndex--;
      }
      if (!this.global) this.lastIndex = s;
      return t;
    };
    RegExp.prototype.test = function (e) {
      var t, n;
      if (!this.global) n = this.lastIndex;
      t = _.exec.call(this, e);
      if (t && !h && this.global && !t[0].length && this.lastIndex > t.index) this.lastIndex--;
      if (!this.global) this.lastIndex = n;
      return !!t;
    };
    String.prototype.match = function (n) {
      e();
      if (!t.isRegExp(n)) n = RegExp(n);
      if (n.global) {
        var i = _.match.apply(this, arguments);
        n.lastIndex = 0;
        return i;
      }
      return n.exec(this);
    };
    String.prototype.replace = function (n, i) {
      e();
      var o = t.isRegExp(n),
        a,
        c,
        d,
        l;
      if (o) {
        if (n._xregexp) a = n._xregexp.captureNames;
        if (!n.global) l = n.lastIndex;
      } else n += '';
      if ('[object Function]' === Object.prototype.toString.call(i))
        c = _.replace.call(this + '', n, function () {
          if (a) {
            arguments[0] = new String(arguments[0]);
            for (var e = 0; e < a.length; e++) if (a[e]) arguments[0][a[e]] = arguments[e + 1];
          }
          if (o && n.global) n.lastIndex = arguments[arguments.length - 2] + arguments[0].length;
          return i.apply(null, arguments);
        });
      else {
        d = this + '';
        c = _.replace.call(d, n, function () {
          var e = arguments;
          return _.replace.call(i + '', s, function (t, n, i) {
            if (n)
              switch (n) {
                case '$':
                  return '$';
                case '&':
                  return e[0];
                case '`':
                  return e[e.length - 1].slice(0, e[e.length - 2]);
                case "'":
                  return e[e.length - 1].slice(e[e.length - 2] + e[0].length);
                default:
                  var o = '';
                  n = +n;
                  if (!n) return t;
                  for (; n > e.length - 3;) {
                    o = String.prototype.slice.call(n, -1) + o;
                    n = Math.floor(n / 10);
                  }
                  return (n ? e[n] || '' : '$') + o;
              }
            else {
              var s = +i;
              if (s <= e.length - 3) return e[s];
              s = a ? r(a, i) : -1;
              return s > -1 ? e[s + 1] : t;
            }
          });
        });
      }
      if (o)
        if (n.global) n.lastIndex = 0;
        else n.lastIndex = l;
      return c;
    };
    String.prototype.split = function (e, i) {
      if (!t.isRegExp(e)) return _.split.apply(this, arguments);
      var o = this + '',
        a = [],
        r = 0,
        s,
        c;
      if (i === n || +i < 0) i = 1 / 0;
      else {
        i = Math.floor(+i);
        if (!i) return [];
      }
      e = t.copyAsGlobal(e);
      for (; (s = e.exec(o));) {
        if (e.lastIndex > r) {
          a.push(o.slice(r, s.index));
          if (s.length > 1 && s.index < o.length) Array.prototype.push.apply(a, s.slice(1));
          c = s[0].length;
          r = e.lastIndex;
          if (a.length >= i) break;
        }
        if (e.lastIndex === s.index) e.lastIndex++;
      }
      if (r === o.length) {
        if (!_.test.call(e, '') || c) a.push('');
      } else a.push(o.slice(r));
      return a.length > i ? a.slice(0, i) : a;
    };
    t.addToken(/\(\?#[^)]*\)/, function (e) {
      return _.test.call(d, e.input.slice(e.index + e[0].length)) ? '' : '(?:)';
    });
    t.addToken(/\((?!\?)/, function () {
      this.captureNames.push(null);
      return '(';
    });
    t.addToken(/\(\?<([$\w]+)>/, function (e) {
      this.captureNames.push(e[1]);
      this.hasNamedCapture = !0;
      return '(';
    });
    t.addToken(/\\k<([\w$]+)>/, function (e) {
      var t = r(this.captureNames, e[1]);
      return t > -1
        ? '\\' + (t + 1) + (isNaN(e.input.charAt(e.index + e[0].length)) ? '' : '(?:)')
        : e[0];
    });
    t.addToken(/\[\^?]/, function (e) {
      return '[]' === e[0] ? '\\b\\B' : '[\\s\\S]';
    });
    t.addToken(/^\(\?([imsx]+)\)/, function (e) {
      this.setFlag(e[1]);
      return '';
    });
    t.addToken(
      /(?:\s+|#.*)+/,
      function (e) {
        return _.test.call(d, e.input.slice(e.index + e[0].length)) ? '' : '(?:)';
      },
      t.OUTSIDE_CLASS,
      function () {
        return this.hasFlag('x');
      },
    );
    t.addToken(
      /\./,
      function () {
        return '[\\s\\S]';
      },
      t.OUTSIDE_CLASS,
      function () {
        return this.hasFlag('s');
      },
    );
  })();
  if ('undefined' == typeof n)
    var n = (function () {
      function e(e, t) {
        return e.className.indexOf(t) != -1;
      }
      function n(t, n) {
        if (!e(t, n)) t.className += ' ' + n;
      }
      function i(e, t) {
        e.className = e.className.replace(t, '');
      }
      function o(e) {
        var t = [];
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t;
      }
      function a(e) {
        function t() {
          if (
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.match(/MSIE/)
          )
            return '-1' == navigator.userAgent.split(';')[1].toLowerCase().indexOf('msie 7.0') &&
              '-1' == navigator.userAgent.split(';')[1].toLowerCase().indexOf('msie 8.0')
              ? !1
              : !0;
          else return !1;
        }
        var n = e.match('^(&nbsp;)*<span(.*)>([wW]*)');
        if (t() && !n) return e.split(/\r?\n?\s/);
        else return e.split(/\r?\n/);
      }
      function r(e) {
        var t = 'highlighter_';
        return 0 == e.indexOf(t) ? e : t + e;
      }
      function s(e) {
        return U.vars.highlighters[r(e)];
      }
      function c(e) {
        return document.getElementById(r(e));
      }
      function d(e) {
        U.vars.highlighters[r(e.id)] = e;
      }
      function l(e, t, n) {
        if (null == e) return null;
        var i = 1 != n ? e.childNodes : [e.parentNode],
          o = { '#': 'id', '.': 'className' }[t.substr(0, 1)] || 'nodeName',
          a,
          r;
        a = 'nodeName' != o ? t.substr(1) : t.toUpperCase();
        if ((e[o] || '').indexOf(a) != -1) return e;
        for (var s = 0; i && s < i.length && null == r; s++) r = l(i[s], t, n);
        return r;
      }
      function u(e, t) {
        return l(e, t, !0);
      }
      function _(e, t, n) {
        n = Math.max(n || 0, 0);
        for (var i = n; i < e.length; i++) if (e[i] == t) return i;
        return -1;
      }
      function f(e) {
        return (e || '') + Math.round(1e6 * Math.random()).toString();
      }
      function h(e, t) {
        var n = {},
          i;
        for (i in e) n[i] = e[i];
        for (i in t) n[i] = t[i];
        return n;
      }
      function p(e) {
        var t = { true: !0, false: !1 }[e];
        return null == t ? e : t;
      }
      function m(e, t, n, i, o) {
        var a = (screen.width - n) / 2,
          r = (screen.height - i) / 2;
        o += ', left=' + a + ', top=' + r + ', width=' + n + ', height=' + i;
        o = o.replace(/^,/, '');
        var s = window.open(e, t, o);
        s.focus();
        return s;
      }
      function g(e, t, n, i) {
        function o(e) {
          e = e || window.event;
          if (!e.target) {
            e.target = e.srcElement;
            e.preventDefault = function () {
              this.returnValue = !1;
            };
          }
          n.call(i || window, e);
        }
        if (e.attachEvent) e.attachEvent('on' + t, o);
        else e.addEventListener(t, o, !1);
      }
      function b(e) {
        window.alert(U.config.strings.alert + e);
      }
      function v(e, t) {
        var n = U.vars.discoveredBrushes,
          i = null;
        if (null == n) {
          n = {};
          for (var o in U.brushes) {
            var a = U.brushes[o],
              r = a.aliases;
            if (null != r) {
              a.brushName = o.toLowerCase();
              for (var s = 0; s < r.length; s++) n[r[s]] = o;
            } else;
          }
          U.vars.discoveredBrushes = n;
        }
        i = U.brushes[n[e]];
        if (null == i && t) b(U.config.strings.noBrush + e);
        return i;
      }
      function E(e, t) {
        var n = a(e);
        for (var i = 0; i < n.length; i++) n[i] = t(n[i], i);
        return n.join('\r\n');
      }
      function x(e) {
        return e.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g, '');
      }
      function w(e) {
        var n,
          i = {},
          o = new t('^\\[(?<values>(.*?))\\]$'),
          a = new t(
            '(?<name>[\\w-]+)\\s*:\\s*(?<value>[\\w-%#]+|\\[.*?\\]|".*?"|\'.*?\')\\s*;?',
            'g',
          );
        for (; null != (n = a.exec(e));) {
          var r = n.value.replace(/^['"]|['"]$/g, '');
          if (null != r && o.test(r)) {
            var s = o.exec(r);
            r = s.values.length > 0 ? s.values.split(/\s*,\s*/) : [];
          }
          i[n.name] = r;
        }
        return i;
      }
      function C(e, t) {
        if (null == e || 0 == e.length || '\n' == e) return e;
        e = e.replace(/</g, '&lt;');
        e = e.replace(/ {2,}/g, function (e) {
          var t = '';
          for (var n = 0; n < e.length - 1; n++) t += U.config.space;
          return t + ' ';
        });
        if (null != t)
          e = E(e, function (e) {
            if (0 == e.length) return '';
            var n = '';
            e = e.replace(/^(&nbsp;| )+/, function (e) {
              n = e;
              return '';
            });
            if (0 == e.length) return n;
            else return n + '<span class="' + t + '">' + e + '</span>';
          });
        return e;
      }
      function y(e, t) {
        var n = e.toString();
        for (; n.length < t;) n = '0' + n;
        return n;
      }
      function $(e, t) {
        var n = '';
        for (var i = 0; i < t; i++) n += ' ';
        return e.replace(/\t/g, n);
      }
      function I(e, t) {
        function n(e, t, n) {
          return e.substr(0, t) + r.substr(0, n) + e.substr(t + 1, e.length);
        }
        var i = a(e),
          o = '\t',
          r = '';
        for (var s = 0; s < 50; s++) r += '                    ';
        e = E(e, function (e) {
          if (e.indexOf(o) == -1) return e;
          var i = 0;
          for (; (i = e.indexOf(o)) != -1;) {
            var a = t - (i % t);
            e = n(e, i, a);
          }
          return e;
        });
        return e;
      }
      function T(e) {
        var t = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi;
        if (1 == U.config.bloggerMode) e = e.replace(t, '\n');
        if (1 == U.config.stripBrs) e = e.replace(t, '');
        return e;
      }
      function S(e) {
        return e.replace(/^\s+|\s+$/g, '');
      }
      function A(e) {
        var t = a(T(e)),
          n = new Array(),
          i = /^\s*/,
          o = 1e3;
        for (var r = 0; r < t.length && o > 0; r++) {
          var s = t[r];
          if (0 != S(s).length) {
            var c = i.exec(s);
            if (null == c) return e;
            o = Math.min(c[0].length, o);
          } else;
        }
        if (o > 0) for (var r = 0; r < t.length; r++) t[r] = t[r].substr(o);
        return t.join('\n');
      }
      function N(e, t) {
        if (e.index < t.index) return -1;
        else if (e.index > t.index) return 1;
        else if (e.length < t.length) return -1;
        else if (e.length > t.length) return 1;
        return 0;
      }
      function O(e, t) {
        function n(e, t) {
          return e[0];
        }
        var i = 0,
          o = null,
          a = [],
          r = t.func ? t.func : n;
        for (; null != (o = t.regex.exec(e));) {
          var s = r(o, t);
          if ('string' == typeof s) s = [new U.Match(s, o.index, t.css)];
          a = a.concat(s);
        }
        return a;
      }
      function L(e) {
        var t = /(.*)((&gt;|&lt;).*)/;
        return e.replace(U.regexLib.url, function (e) {
          var n = '',
            i = null;
          if ((i = t.exec(e))) {
            e = i[1];
            n = i[2];
          }
          return '<a href="' + e + '">' + e + '</a>' + n;
        });
      }
      function D() {
        var e = document.getElementsByTagName('script'),
          t = [];
        for (var n = 0; n < e.length; n++) if ('syntaxhighlighter' == e[n].type) t.push(e[n]);
        return t;
      }
      function R(e) {
        var t = '<![CDATA[',
          n = ']]>',
          i = S(e),
          o = !1,
          a = t.length,
          r = n.length;
        if (0 == i.indexOf(t)) {
          i = i.substring(a);
          o = !0;
        }
        var s = i.length;
        if (i.indexOf(n) != -1 && i.indexOf(n) == s - r) {
          i = i.substring(0, s - r);
          o = !0;
        }
        return o ? i : e;
      }
      function k(e) {
        var t = e.target,
          o = u(t, '.syntaxhighlighter'),
          a = u(t, '.container'),
          r = document.createElement('textarea'),
          c;
        if (a && o && !l(a, 'textarea')) {
          c = s(o.id);
          n(o, 'source');
          var d = a.childNodes,
            _ = [];
          for (var f = 0; f < d.length; f++) _.push(d[f].innerText || d[f].textContent);
          _ = _.join('\r');
          _ = _.replace(/\u00a0/g, ' ');
          r.appendChild(document.createTextNode(_));
          a.appendChild(r);
          r.focus();
          r.select();
          g(r, 'blur', function (e) {
            r.parentNode.removeChild(r);
            i(o, 'source');
          });
        }
      }
      if ('undefined' != typeof require && 'undefined' == typeof t) t = require('XRegExp').XRegExp;
      var U = {
        defaults: {
          'class-name': '',
          'first-line': 1,
          'pad-line-numbers': !1,
          highlight: !1,
          title: null,
          'smart-tabs': !0,
          'tab-size': 4,
          gutter: !0,
          toolbar: !0,
          'quick-code': !1,
          collapse: !1,
          'auto-links': !1,
          light: !1,
          unindent: !0,
          'html-script': !1,
        },
        config: {
          space: '&nbsp;',
          useScriptTags: !0,
          bloggerMode: !1,
          stripBrs: !1,
          tagName: 'code',
          strings: {
            expandSource: 'expand source',
            help: '?',
            alert: 'SyntaxHighlighter\n\n',
            noBrush: "Can't find brush for: ",
            brushNotHtmlScript: "Brush wasn't configured for html-script option: ",
            aboutDialog: '@ABOUT@',
          },
        },
        vars: { discoveredBrushes: null, highlighters: {} },
        brushes: {},
        regexLib: {
          multiLineCComments: /\/\*[\s\S]*?\*\//gm,
          singleLineCComments: /\/\/.*$/gm,
          singleLinePerlComments: /#.*$/gm,
          doubleQuotedString: /"([^\\"\n]|\\.)*"/g,
          singleQuotedString: /'([^\\'\n]|\\.)*'/g,
          multiLineDoubleQuotedString: new t('"([^\\\\"]|\\\\.)*"', 'gs'),
          multiLineSingleQuotedString: new t("'([^\\\\']|\\\\.)*'", 'gs'),
          xmlComments: /(&lt;|<)!--[\s\S]*?--(&gt;|>)/gm,
          url: /\w+:\/\/[\w-.\/?%&=:@;#]*/g,
          phpScriptTags: { left: /(&lt;|<)\?(?:=|php)?/g, right: /\?(&gt;|>)/g, eof: !0 },
          aspScriptTags: { left: /(&lt;|<)%=?/g, right: /%(&gt;|>)/g },
          scriptScriptTags: {
            left: /(&lt;|<)\s*script.*?(&gt;|>)/gi,
            right: /(&lt;|<)\/\s*script\s*(&gt;|>)/gi,
          },
        },
        toolbar: {
          getHtml: function (e) {
            function t(e, t) {
              return U.toolbar.getButtonHtml(e, t, U.config.strings[t]);
            }
            var n = '<div class="toolbar">',
              i = U.toolbar.items,
              o = i.list;
            for (var a = 0; a < o.length; a++) n += (i[o[a]].getHtml || t)(e, o[a]);
            n += '</div>';
            return n;
          },
          getButtonHtml: function (e, t, n) {
            return (
              '<span><a href="#" class="toolbar_item command_' +
              t +
              ' ' +
              t +
              '">' +
              n +
              '</a></span>'
            );
          },
          handler: function (e) {
            function t(e) {
              var t = new RegExp(e + '_(\\w+)'),
                n = t.exec(i);
              return n ? n[1] : null;
            }
            var n = e.target,
              i = n.className || '';
            var o = s(u(n, '.syntaxhighlighter').id),
              a = t('command');
            if (o && a) U.toolbar.items[a].execute(o);
            e.preventDefault();
          },
          items: {
            list: ['expandSource', 'help'],
            expandSource: {
              getHtml: function (e) {
                if (1 != e.getParam('collapse')) return '';
                var t = e.getParam('title');
                return U.toolbar.getButtonHtml(
                  e,
                  'expandSource',
                  t ? t : U.config.strings.expandSource,
                );
              },
              execute: function (e) {
                var t = c(e.id);
                i(t, 'collapsed');
              },
            },
            help: {
              execute: function (e) {
                var t = m('', '_blank', 500, 250, 'scrollbars=0'),
                  n = t.document;
                n.write(U.config.strings.aboutDialog);
                n.close();
                t.focus();
              },
            },
          },
        },
        findElements: function (e, t) {
          var n = t ? [t] : o(document.getElementsByTagName(U.config.tagName)),
            i = U.config,
            a = [];
          if (i.useScriptTags) n = n.concat(D());
          if (0 === n.length) return a;
          for (var r = 0; r < n.length; r++) {
            var s = { target: n[r], params: e ? h(e, w(n[r].className)) : w(n[r].className) };
            if (null != s.params['brush']) a.push(s);
            else;
          }
          return a;
        },
        highlight: function (e, t) {
          var n = this.findElements(e, t),
            i = 'innerHTML',
            o = null,
            a = U.config;
          if (0 !== n.length)
            for (var r = 0; r < n.length; r++) {
              var t = n[r],
                s = t.target,
                c = t.params,
                d = c.brush,
                l;
              if (null != d) {
                if ('true' == c['html-script'] || 1 == U.defaults['html-script']) {
                  o = new U.HtmlScript(d);
                  d = 'htmlscript';
                } else {
                  var u = v(d);
                  if (u) o = new u();
                  else continue;
                }
                l = s[i];
                if (a.useScriptTags) l = R(l);
                if ('' != (s.title || '')) c.title = s.title;
                c['brush'] = d;
                o.init(c);
                t = o.getDiv(l);
                if ('' != (s.id || '')) t.id = s.id;
                var _ = t.firstChild.firstChild;
                _.className = t.firstChild.className;
                s.parentNode.replaceChild(_, s);
              } else;
            }
        },
        all: function (e) {
          g(window, 'load', function () {
            U.highlight(e);
          });
        },
      };
      U.Match = function (e, t, n) {
        this.value = e;
        this.index = t;
        this.length = e.length;
        this.css = n;
        this.brushName = null;
      };
      U.Match.prototype.toString = function () {
        return this.value;
      };
      U.HtmlScript = function (e) {
        function t(e, t) {
          for (var n = 0; n < e.length; n++) e[n].index += t;
        }
        function n(e, n) {
          var a = e.code,
            r = [],
            s = o.regexList,
            c = e.index + e.left.length,
            d = o.htmlScript,
            l;
          for (var u = 0; u < s.length; u++) {
            l = O(a, s[u]);
            t(l, c);
            r = r.concat(l);
          }
          if (null != d.left && null != e.left) {
            l = O(e.left, d.left);
            t(l, e.index);
            r = r.concat(l);
          }
          if (null != d.right && null != e.right) {
            l = O(e.right, d.right);
            t(l, e.index + e[0].lastIndexOf(e.right));
            r = r.concat(l);
          }
          for (var _ = 0; _ < r.length; _++) r[_].brushName = i.brushName;
          return r;
        }
        var i = v(e),
          o,
          a = new U.brushes.Xml(),
          r = null,
          s = this,
          c = 'getDiv getHtml init'.split(' ');
        if (null != i) {
          o = new i();
          for (var d = 0; d < c.length; d++)
            (function () {
              var e = c[d];
              s[e] = function () {
                return a[e].apply(a, arguments);
              };
            })();
          if (null != o.htmlScript) a.regexList.push({ regex: o.htmlScript.code, func: n });
          else b(U.config.strings.brushNotHtmlScript + e);
        }
      };
      U.Highlighter = function () {};
      U.Highlighter.prototype = {
        getParam: function (e, t) {
          var n = this.params[e];
          return p(null == n ? t : n);
        },
        create: function (e) {
          return document.createElement(e);
        },
        findMatches: function (e, t) {
          var n = [];
          if (null != e)
            for (var i = 0; i < e.length; i++)
              if ('object' == typeof e[i]) n = n.concat(O(t, e[i]));
          return this.removeNestedMatches(n.sort(N));
        },
        removeNestedMatches: function (e) {
          for (var t = 0; t < e.length; t++)
            if (null !== e[t]) {
              var n = e[t],
                i = n.index + n.length;
              for (var o = t + 1; o < e.length && null !== e[t]; o++) {
                var a = e[o];
                if (null !== a) {
                  if (a.index > i) break;
                  else if (a.index == n.index && a.length > n.length) e[t] = null;
                  else if (a.index >= n.index && a.index < i) e[o] = null;
                } else;
              }
            } else;
          return e;
        },
        figureOutLineNumbers: function (e) {
          var t = [],
            n = parseInt(this.getParam('first-line'));
          E(e, function (e, i) {
            t.push(i + n);
          });
          return t;
        },
        isLineHighlighted: function (e) {
          var t = this.getParam('highlight', []);
          if ('object' != typeof t && null == t.push) t = [t];
          return _(t, e.toString()) != -1;
        },
        getLineHtml: function (e, t, n) {
          var i = ['line', 'number' + t, 'index' + e, 'alt' + (t % 2 == 0 ? 1 : 2).toString()];
          if (this.isLineHighlighted(t)) i.push('highlighted');
          if (0 == t) i.push('break');
          return '<li class="' + i.join(' ') + '">' + n + '</li>';
        },
        getLineNumbersHtml: function (e, t) {
          var n = '',
            i = a(e).length,
            o = parseInt(this.getParam('first-line')),
            r = this.getParam('pad-line-numbers');
          if (1 == r) r = (o + i - 1).toString().length;
          else if (1 == isNaN(r)) r = 0;
          for (var s = 0; s < i; s++) {
            var c = t ? t[s] : o + s,
              e = 0 == c ? U.config.space : y(c, r);
            n += this.getLineHtml(s, c, e);
          }
          return n;
        },
        getCodeLinesHtml: function (e, t) {
          e = S(e);
          var n = a(e),
            i = this.getParam('pad-line-numbers'),
            o = parseInt(this.getParam('first-line')),
            e = '',
            r = this.getParam('brush');
          for (var s = 0; s < n.length; s++) {
            var c = n[s],
              d = /^(&nbsp;|\s)+/.exec(c),
              l = null,
              u = t ? t[s] : o + s;
            if (null != d) {
              l = d[0].toString();
              c = c.substr(l.length);
              l = l.replace(' ', U.config.space);
            }
            c = S(c);
            if (0 == c.length) c = U.config.space;
            e += this.getLineHtml(
              s,
              u,
              (null != l ? '<span class="' + r + ' spaces">' + l + '</span>' : '') + c,
            );
          }
          return e;
        },
        getTitleHtml: function (e) {
          return e ? '<caption>' + e + '</caption>' : '';
        },
        getMatchesHtml: function (e, t) {
          function n(e) {
            var t = e ? e.brushName || a : a;
            return t ? t + ' ' : '';
          }
          var i = 0,
            o = '',
            a = this.getParam('brush', '');
          for (var r = 0; r < t.length; r++) {
            var s = t[r],
              c;
            if (null !== s && 0 !== s.length) {
              c = n(s);
              o += C(e.substr(i, s.index - i), c + 'plain') + C(s.value, c + s.css);
              i = s.index + s.length + (s.offset || 0);
            } else;
          }
          o += C(e.substr(i), n() + 'plain');
          return o;
        },
        getHtml: function (e) {
          var t = '',
            n = ['syntaxhighlighter'],
            i,
            o,
            a;
          if (1 == this.getParam('light')) this.params.toolbar = this.params.gutter = !1;
          className = 'syntaxhighlighter';
          if (1 == this.getParam('collapse')) n.push('collapsed');
          if (0 == (gutter = this.getParam('gutter'))) n.push('nogutter');
          n.push(this.getParam('class-name'));
          n.push(this.getParam('brush'));
          e = x(e).replace(/\r/g, ' ');
          i = this.getParam('tab-size');
          e = 1 == this.getParam('smart-tabs') ? I(e, i) : $(e, i);
          if (this.getParam('unindent')) e = A(e);
          if (gutter) a = this.figureOutLineNumbers(e);
          o = this.findMatches(this.regexList, e);
          t = this.getMatchesHtml(e, o);
          t = this.getCodeLinesHtml(t, a);
          if (this.getParam('auto-links')) t = L(t);
          if (
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.match(/MSIE/)
          )
            n.push('ie');
          t =
            '<div id="' +
            r(this.id) +
            '" class="' +
            n.join(' ') +
            '">' +
            (this.getParam('toolbar') ? U.toolbar.getHtml(this) : '') +
            '<div>' +
            this.getTitleHtml(this.getParam('title')) +
            '<ol>' +
            t +
            '</ol></div></div>';
          return t;
        },
        getDiv: function (e) {
          if (null === e) e = '';
          this.code = e;
          var t = this.create('div');
          t.innerHTML = this.getHtml(e);
          if (this.getParam('toolbar')) g(l(t, '.toolbar'), 'click', U.toolbar.handler);
          if (this.getParam('quick-code')) g(l(t, '.code'), 'dblclick', k);
          return t;
        },
        init: function (e) {
          this.id = f();
          d(this);
          this.params = h(U.defaults, e || {});
          if (1 == this.getParam('light')) this.params.toolbar = this.params.gutter = !1;
        },
        getKeywords: function (e) {
          e = e.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '|');
          return '\\b(?:' + e + ')\\b';
        },
        forHtmlScript: function (e) {
          var n = { end: e.right.source };
          if (e.eof) n.end = '(?:(?:' + n.end + ')|$)';
          this.htmlScript = {
            left: { regex: e.left, css: 'script' },
            right: { regex: e.right, css: 'script' },
            code: new t('(?<left>' + e.left.source + ')(?<code>.*?)(?<right>' + n.end + ')', 'sgi'),
          };
        },
      };
      return U;
    })();
  'undefined' != typeof exports ? (exports.SyntaxHighlighter = n) : null;
  !(function () {
    function e() {
      var e = 'class interface function package';
      var t =
        '-Infinity ...rest Array as AS3 Boolean break case catch const continue Date decodeURI decodeURIComponent default delete do dynamic each else encodeURI encodeURIComponent escape extends false final finally flash_proxy for get if implements import in include Infinity instanceof int internal is isFinite isNaN isXMLName label namespace NaN native new null Null Number Object object_proxy override parseFloat parseInt private protected public return set static String super switch this throw true try typeof uint undefined unescape use void while with';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi, css: 'value' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'color3' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'keyword' },
        { regex: new RegExp('var', 'gm'), css: 'variable' },
        { regex: new RegExp('trace', 'gm'), css: 'color1' },
      ];
      this.forHtmlScript(n.regexLib.scriptScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['actionscript3', 'as3'];
    n.brushes.AS3 = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'after before beginning continue copy each end every from return get global in local named of set some that the then times to where whose with without';
      var t =
        'first second third fourth fifth sixth seventh eighth ninth tenth last front back middle';
      var n =
        'activate add alias AppleScript ask attachment boolean class constant delete duplicate empty exists false id integer list make message modal modified new no paragraph pi properties quit real record remove rest result reveal reverse run running save string true word yes';
      this.regexList = [
        { regex: /(--|#).*$/gm, css: 'comments' },
        { regex: /\(\*(?:[\s\S]*?\(\*[\s\S]*?\*\))*[\s\S]*?\*\)/gm, css: 'comments' },
        { regex: /"[\s\S]*?"/gm, css: 'string' },
        { regex: /(?:,|:|¬|'s\b|\(|\)|\{|\}|«|\b\w*»)/g, css: 'color1' },
        { regex: /(-)?(\d)+(\.(\d)?)?(E\+(\d)+)?/g, css: 'color1' },
        { regex: /(?:&(amp;|gt;|lt;)?|=|� |>|<|≥|>=|≤|<=|\*|\+|-|\/|÷|\^)/g, css: 'color2' },
        {
          regex:
            /\b(?:and|as|div|mod|not|or|return(?!\s&)(ing)?|equals|(is(n't| not)? )?equal( to)?|does(n't| not) equal|(is(n't| not)? )?(greater|less) than( or equal( to)?)?|(comes|does(n't| not) come) (after|before)|is(n't| not)?( in)? (back|front) of|is(n't| not)? behind|is(n't| not)?( (in|contained by))?|does(n't| not) contain|contain(s)?|(start|begin|end)(s)? with|((but|end) )?(consider|ignor)ing|prop(erty)?|(a )?ref(erence)?( to)?|repeat (until|while|with)|((end|exit) )?repeat|((else|end) )?if|else|(end )?(script|tell|try)|(on )?error|(put )?into|(of )?(it|me)|its|my|with (timeout( of)?|transaction)|end (timeout|transaction))\b/g,
          css: 'keyword',
        },
        { regex: /\b\d+(st|nd|rd|th)\b/g, css: 'keyword' },
        {
          regex:
            /\b(?:about|above|against|around|at|below|beneath|beside|between|by|(apart|aside) from|(instead|out) of|into|on(to)?|over|since|thr(ough|u)|under)\b/g,
          css: 'color3',
        },
        {
          regex:
            /\b(?:adding folder items to|after receiving|choose( ((remote )?application|color|folder|from list|URL))?|clipboard info|set the clipboard to|(the )?clipboard|entire contents|display(ing| (alert|dialog|mode))?|document( (edited|file|nib name))?|file( (name|type))?|(info )?for|giving up after|(name )?extension|quoted form|return(ed)?|second(?! item)(s)?|list (disks|folder)|text item(s| delimiters)?|(Unicode )?text|(disk )?item(s)?|((current|list) )?view|((container|key) )?window|with (data|icon( (caution|note|stop))?|parameter(s)?|prompt|properties|seed|title)|case|diacriticals|hyphens|numeric strings|punctuation|white space|folder creation|application(s( folder)?| (processes|scripts position|support))?|((desktop )?(pictures )?|(documents|downloads|favorites|home|keychain|library|movies|music|public|scripts|sites|system|users|utilities|workflows) )folder|desktop|Folder Action scripts|font(s| panel)?|help|internet plugins|modem scripts|(system )?preferences|printer descriptions|scripting (additions|components)|shared (documents|libraries)|startup (disk|items)|temporary items|trash|on server|in AppleTalk zone|((as|long|short) )?user name|user (ID|locale)|(with )?password|in (bundle( with identifier)?|directory)|(close|open for) access|read|write( permission)?|(g|s)et eof|using( delimiters)?|starting at|default (answer|button|color|country code|entr(y|ies)|identifiers|items|name|location|script editor)|hidden( answer)?|open(ed| (location|untitled))?|error (handling|reporting)|(do( shell)?|load|run|store) script|administrator privileges|altering line endings|get volume settings|(alert|boot|input|mount|output|set) volume|output muted|(fax|random )?number|round(ing)?|up|down|toward zero|to nearest|as taught in school|system (attribute|info)|((AppleScript( Studio)?|system) )?version|(home )?directory|(IPv4|primary Ethernet) address|CPU (type|speed)|physical memory|time (stamp|to GMT)|replacing|ASCII (character|number)|localized string|from table|offset|summarize|beep|delay|say|(empty|multiple) selections allowed|(of|preferred) type|invisibles|showing( package contents)?|editable URL|(File|FTP|News|Media|Web) [Ss]ervers|Telnet hosts|Directory services|Remote applications|waiting until completion|saving( (in|to))?|path (for|to( (((current|frontmost) )?application|resource))?)|POSIX (file|path)|(background|RGB) color|(OK|cancel) button name|cancel button|button(s)?|cubic ((centi)?met(re|er)s|yards|feet|inches)|square ((kilo)?met(re|er)s|miles|yards|feet)|(centi|kilo)?met(re|er)s|miles|yards|feet|inches|lit(re|er)s|gallons|quarts|(kilo)?grams|ounces|pounds|degrees (Celsius|Fahrenheit|Kelvin)|print( (dialog|settings))?|clos(e(able)?|ing)|(de)?miniaturized|miniaturizable|zoom(ed|able)|attribute run|action (method|property|title)|phone|email|((start|end)ing|home) page|((birth|creation|current|custom|modification) )?date|((((phonetic )?(first|last|middle))|computer|host|maiden|related) |nick)?name|aim|icq|jabber|msn|yahoo|address(es)?|save addressbook|should enable action|city|country( code)?|formatte(r|d address)|(palette )?label|state|street|zip|AIM [Hh]andle(s)?|my card|select(ion| all)?|unsaved|(alpha )?value|entr(y|ies)|group|(ICQ|Jabber|MSN) handle|person|people|company|department|icon image|job title|note|organization|suffix|vcard|url|copies|collating|pages (across|down)|request print time|target( printer)?|((GUI Scripting|Script menu) )?enabled|show Computer scripts|(de)?activated|awake from nib|became (key|main)|call method|of (class|object)|center|clicked toolbar item|closed|for document|exposed|(can )?hide|idle|keyboard (down|up)|event( (number|type))?|launch(ed)?|load (image|movie|nib|sound)|owner|log|mouse (down|dragged|entered|exited|moved|up)|move|column|localization|resource|script|register|drag (info|types)|resigned (active|key|main)|resiz(e(d)?|able)|right mouse (down|dragged|up)|scroll wheel|(at )?index|should (close|open( untitled)?|quit( after last window closed)?|zoom)|((proposed|screen) )?bounds|show(n)?|behind|in front of|size (mode|to fit)|update(d| toolbar item)?|was (hidden|miniaturized)|will (become active|close|finish launching|hide|miniaturize|move|open|quit|(resign )?active|((maximum|minimum|proposed) )?size|show|zoom)|bundle|data source|movie|pasteboard|sound|tool(bar| tip)|(color|open|save) panel|coordinate system|frontmost|main( (bundle|menu|window))?|((services|(excluded from )?windows) )?menu|((executable|frameworks|resource|scripts|shared (frameworks|support)) )?path|(selected item )?identifier|data|content(s| view)?|character(s)?|click count|(command|control|option|shift) key down|context|delta (x|y|z)|key( code)?|location|pressure|unmodified characters|types|(first )?responder|playing|(allowed|selectable) identifiers|allows customization|(auto saves )?configuration|visible|image( name)?|menu form representation|tag|user(-| )defaults|associated file name|(auto|needs) display|current field editor|floating|has (resize indicator|shadow)|hides when deactivated|level|minimized (image|title)|opaque|position|release when closed|sheet|title(d)?)\b/g,
          css: 'color3',
        },
        { regex: new RegExp(this.getKeywords(n), 'gm'), css: 'color3' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'keyword' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['applescript'];
    n.brushes.AppleScript = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'if fi then elif else for do done until while break continue case esac function return in eq ne ge le';
      var t =
        'alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chrootcksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig import install join kill less let ln local locate logname logout look lpc lpr lprint lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir vi watch wc whereis which who whoami Wget xargs yes';
      this.regexList = [
        { regex: /^#!.*$/gm, css: 'preprocessor bold' },
        { regex: /\/[\w-\/]+/gm, css: 'plain' },
        { regex: n.regexLib.singleLinePerlComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'functions' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['bash', 'shell', 'sh'];
    n.brushes.Bash = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'Abs ACos AddSOAPRequestHeader AddSOAPResponseHeader AjaxLink AjaxOnLoad ArrayAppend ArrayAvg ArrayClear ArrayDeleteAt ArrayInsertAt ArrayIsDefined ArrayIsEmpty ArrayLen ArrayMax ArrayMin ArraySet ArraySort ArraySum ArraySwap ArrayToList Asc ASin Atn BinaryDecode BinaryEncode BitAnd BitMaskClear BitMaskRead BitMaskSet BitNot BitOr BitSHLN BitSHRN BitXor Ceiling CharsetDecode CharsetEncode Chr CJustify Compare CompareNoCase Cos CreateDate CreateDateTime CreateObject CreateODBCDate CreateODBCDateTime CreateODBCTime CreateTime CreateTimeSpan CreateUUID DateAdd DateCompare DateConvert DateDiff DateFormat DatePart Day DayOfWeek DayOfWeekAsString DayOfYear DaysInMonth DaysInYear DE DecimalFormat DecrementValue Decrypt DecryptBinary DeleteClientVariable DeserializeJSON DirectoryExists DollarFormat DotNetToCFType Duplicate Encrypt EncryptBinary Evaluate Exp ExpandPath FileClose FileCopy FileDelete FileExists FileIsEOF FileMove FileOpen FileRead FileReadBinary FileReadLine FileSetAccessMode FileSetAttribute FileSetLastModified FileWrite Find FindNoCase FindOneOf FirstDayOfMonth Fix FormatBaseN GenerateSecretKey GetAuthUser GetBaseTagData GetBaseTagList GetBaseTemplatePath GetClientVariablesList GetComponentMetaData GetContextRoot GetCurrentTemplatePath GetDirectoryFromPath GetEncoding GetException GetFileFromPath GetFileInfo GetFunctionList GetGatewayHelper GetHttpRequestData GetHttpTimeString GetK2ServerDocCount GetK2ServerDocCountLimit GetLocale GetLocaleDisplayName GetLocalHostIP GetMetaData GetMetricData GetPageContext GetPrinterInfo GetProfileSections GetProfileString GetReadableImageFormats GetSOAPRequest GetSOAPRequestHeader GetSOAPResponse GetSOAPResponseHeader GetTempDirectory GetTempFile GetTemplatePath GetTickCount GetTimeZoneInfo GetToken GetUserRoles GetWriteableImageFormats Hash Hour HTMLCodeFormat HTMLEditFormat IIf ImageAddBorder ImageBlur ImageClearRect ImageCopy ImageCrop ImageDrawArc ImageDrawBeveledRect ImageDrawCubicCurve ImageDrawLine ImageDrawLines ImageDrawOval ImageDrawPoint ImageDrawQuadraticCurve ImageDrawRect ImageDrawRoundRect ImageDrawText ImageFlip ImageGetBlob ImageGetBufferedImage ImageGetEXIFTag ImageGetHeight ImageGetIPTCTag ImageGetWidth ImageGrayscale ImageInfo ImageNegative ImageNew ImageOverlay ImagePaste ImageRead ImageReadBase64 ImageResize ImageRotate ImageRotateDrawingAxis ImageScaleToFit ImageSetAntialiasing ImageSetBackgroundColor ImageSetDrawingColor ImageSetDrawingStroke ImageSetDrawingTransparency ImageSharpen ImageShear ImageShearDrawingAxis ImageTranslate ImageTranslateDrawingAxis ImageWrite ImageWriteBase64 ImageXORDrawingMode IncrementValue InputBaseN Insert Int IsArray IsBinary IsBoolean IsCustomFunction IsDate IsDDX IsDebugMode IsDefined IsImage IsImageFile IsInstanceOf IsJSON IsLeapYear IsLocalHost IsNumeric IsNumericDate IsObject IsPDFFile IsPDFObject IsQuery IsSimpleValue IsSOAPRequest IsStruct IsUserInAnyRole IsUserInRole IsUserLoggedIn IsValid IsWDDX IsXML IsXmlAttribute IsXmlDoc IsXmlElem IsXmlNode IsXmlRoot JavaCast JSStringFormat LCase Left Len ListAppend ListChangeDelims ListContains ListContainsNoCase ListDeleteAt ListFind ListFindNoCase ListFirst ListGetAt ListInsertAt ListLast ListLen ListPrepend ListQualify ListRest ListSetAt ListSort ListToArray ListValueCount ListValueCountNoCase LJustify Log Log10 LSCurrencyFormat LSDateFormat LSEuroCurrencyFormat LSIsCurrency LSIsDate LSIsNumeric LSNumberFormat LSParseCurrency LSParseDateTime LSParseEuroCurrency LSParseNumber LSTimeFormat LTrim Max Mid Min Minute Month MonthAsString Now NumberFormat ParagraphFormat ParseDateTime Pi PrecisionEvaluate PreserveSingleQuotes Quarter QueryAddColumn QueryAddRow QueryConvertForGrid QueryNew QuerySetCell QuotedValueList Rand Randomize RandRange REFind REFindNoCase ReleaseComObject REMatch REMatchNoCase RemoveChars RepeatString Replace ReplaceList ReplaceNoCase REReplace REReplaceNoCase Reverse Right RJustify Round RTrim Second SendGatewayMessage SerializeJSON SetEncoding SetLocale SetProfileString SetVariable Sgn Sin Sleep SpanExcluding SpanIncluding Sqr StripCR StructAppend StructClear StructCopy StructCount StructDelete StructFind StructFindKey StructFindValue StructGet StructInsert StructIsEmpty StructKeyArray StructKeyExists StructKeyList StructKeyList StructNew StructSort StructUpdate Tan TimeFormat ToBase64 ToBinary ToScript ToString Trim UCase URLDecode URLEncodedFormat URLSessionFormat Val ValueList VerifyClient Week Wrap Wrap WriteOutput XmlChildPos XmlElemNew XmlFormat XmlGetNodeType XmlNew XmlParse XmlSearch XmlTransform XmlValidate Year YesNoFormat';
      var t =
        'cfabort cfajaximport cfajaxproxy cfapplet cfapplication cfargument cfassociate cfbreak cfcache cfcalendar cfcase cfcatch cfchart cfchartdata cfchartseries cfcol cfcollection cfcomponent cfcontent cfcookie cfdbinfo cfdefaultcase cfdirectory cfdiv cfdocument cfdocumentitem cfdocumentsection cfdump cfelse cfelseif cferror cfexchangecalendar cfexchangeconnection cfexchangecontact cfexchangefilter cfexchangemail cfexchangetask cfexecute cfexit cffeed cffile cfflush cfform cfformgroup cfformitem cfftp cffunction cfgrid cfgridcolumn cfgridrow cfgridupdate cfheader cfhtmlhead cfhttp cfhttpparam cfif cfimage cfimport cfinclude cfindex cfinput cfinsert cfinterface cfinvoke cfinvokeargument cflayout cflayoutarea cfldap cflocation cflock cflog cflogin cfloginuser cflogout cfloop cfmail cfmailparam cfmailpart cfmenu cfmenuitem cfmodule cfNTauthenticate cfobject cfobjectcache cfoutput cfparam cfpdf cfpdfform cfpdfformparam cfpdfparam cfpdfsubform cfpod cfpop cfpresentation cfpresentationslide cfpresenter cfprint cfprocessingdirective cfprocparam cfprocresult cfproperty cfquery cfqueryparam cfregistry cfreport cfreportparam cfrethrow cfreturn cfsavecontent cfschedule cfscript cfsearch cfselect cfset cfsetting cfsilent cfslider cfsprydataset cfstoredproc cfswitch cftable cftextarea cfthread cfthrow cftimer cftooltip cftrace cftransaction cftree cftreeitem cftry cfupdate cfwddx cfwindow cfxml cfzip cfzipparam';
      var i = 'all and any between cross in join like not null or outer some';
      this.regexList = [
        { regex: new RegExp('--(.*)$', 'gm'), css: 'comments' },
        { regex: n.regexLib.xmlComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: new RegExp(this.getKeywords(e), 'gmi'), css: 'functions' },
        { regex: new RegExp(this.getKeywords(i), 'gmi'), css: 'color1' },
        { regex: new RegExp(this.getKeywords(t), 'gmi'), css: 'keyword' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['coldfusion', 'cf'];
    n.brushes.ColdFusion = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t __wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler sig_atomic_t size_t _stat __stat64 _stati64 terminate_function time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf va_list wchar_t wctrans_t wctype_t wint_t signed';
      var t =
        'auto break case catch class const decltype __finally __exception __try const_cast continue private public protected __declspec default delete deprecated dllexport dllimport do dynamic_cast else enum explicit extern if for friend goto inline mutable naked namespace new noinline noreturn nothrow register reinterpret_cast return selectany sizeof static static_cast struct switch template this thread throw true false try typedef typeid typename union using uuid virtual void volatile whcar_t while';
      var i =
        'assert isalnum isalpha iscntrl isdigit isgraph islower isprintispunct isspace isupper isxdigit tolower toupper errno localeconv setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell fwrite getc getchar gets perror printf putc putchar puts remove rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs mbtowc qsort rand realloc srand strtod strtol strtoul system wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr strcmp strcoll strcpy strcspn strerror strlen strncat strncmp strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime clock ctime difftime gmtime localtime mktime strftime time';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /^ *#.*/gm, css: 'preprocessor' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'color1 bold' },
        { regex: new RegExp(this.getKeywords(i), 'gm'), css: 'functions bold' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'keyword bold' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['cpp', 'c'];
    n.brushes.Cpp = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      function e(e, t) {
        var i = 0 == e[0].indexOf('///') ? 'color1' : 'comments';
        return [new n.Match(e[0], e.index, i)];
      }
      var t =
        'abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit volatile extern false finally fixed float for foreach get goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void while var from group by into select let where orderby join on equals ascending descending';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, func: e },
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: /@"(?:[^"]|"")*"/g, css: 'string' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /^\s*#.*/gm, css: 'preprocessor' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'keyword' },
        { regex: /\bpartial(?=\s+(?:class|interface|struct)\b)/g, css: 'keyword' },
        { regex: /\byield(?=\s+(?:return|break)\b)/g, css: 'keyword' },
      ];
      this.forHtmlScript(n.regexLib.aspScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['c#', 'c-sharp', 'csharp'];
    n.brushes.CSharp = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      function e(e) {
        return '\\b([a-z_]|)' + e.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b';
      }
      function t(e) {
        return '\\b' + e.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + ':\\b';
      }
      var i =
        'ascent azimuth background-attachment background-color background-image background-position background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index';
      var o =
        'above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow';
      var a =
        '[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif';
      this.regexList = [
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /\#[a-fA-F0-9]{3,6}/g, css: 'value' },
        { regex: /(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g, css: 'value' },
        { regex: /!important/g, css: 'color3' },
        { regex: new RegExp(e(i), 'gm'), css: 'keyword' },
        { regex: new RegExp(t(o), 'g'), css: 'value' },
        { regex: new RegExp(this.getKeywords(a), 'g'), css: 'color1' },
      ];
      this.forHtmlScript({
        left: /(&lt;|<)\s*style.*?(&gt;|>)/gi,
        right: /(&lt;|<)\/\s*style\s*(&gt;|>)/gi,
      });
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['css'];
    n.brushes.CSS = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'abs addr and ansichar ansistring array as asm begin boolean byte cardinal case char class comp const constructor currency destructor div do double downto else end except exports extended false file finalization finally for function goto if implementation in inherited int64 initialization integer interface is label library longint longword mod nil not object of on or packed pansichar pansistring pchar pcurrency pdatetime pextended pint64 pointer private procedure program property pshortstring pstring pvariant pwidechar pwidestring protected public published raise real real48 record repeat set shl shortint shortstring shr single smallint string then threadvar to true try type unit until uses val var varirnt while widechar widestring with word write writeln xor';
      this.regexList = [
        { regex: /\(\*[\s\S]*?\*\)/gm, css: 'comments' },
        { regex: /{(?!\$)[\s\S]*?}/gm, css: 'comments' },
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /\{\$[a-zA-Z]+ .+\}/g, css: 'color1' },
        { regex: /\b[\d\.]+\b/g, css: 'value' },
        { regex: /\$[a-zA-Z0-9]+\b/g, css: 'value' },
        { regex: new RegExp(this.getKeywords(e), 'gmi'), css: 'keyword' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['delphi', 'pascal', 'pas'];
    n.brushes.Delphi = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      this.regexList = [
        { regex: /^\+\+\+ .*$/gm, css: 'color2' },
        { regex: /^\-\-\- .*$/gm, css: 'color2' },
        { regex: /^\s.*$/gm, css: 'color1' },
        { regex: /^@@.*@@.*$/gm, css: 'variable' },
        { regex: /^\+.*$/gm, css: 'string' },
        { regex: /^\-.*$/gm, css: 'color3' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['diff', 'patch'];
    n.brushes.Diff = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'after and andalso band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse query receive rem try when xor module export import define';
      this.regexList = [
        { regex: new RegExp('[A-Z][A-Za-z0-9_]+', 'g'), css: 'constants' },
        { regex: new RegExp('\\%.+', 'gm'), css: 'comments' },
        { regex: new RegExp('\\?[A-Za-z0-9_]+', 'g'), css: 'preprocessor' },
        { regex: new RegExp('[a-z0-9_]+:[a-z0-9_]+', 'g'), css: 'functions' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['erl', 'erlang'];
    n.brushes.Erland = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'as assert break case catch class continue def default do else extends finally if in implements import instanceof interface new package property return switch throw throws try while public protected private static';
      var t = 'void boolean byte char short int long float double';
      var i = 'null';
      var o =
        'allProperties count get size collect each eachProperty eachPropertyName eachWithIndex find findAll findIndexOf grep inject max min reverseEach sort asImmutable asSynchronized flatten intersect join pop reverse subMap toList padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText splitEachLine withReader append encodeBase64 decodeBase64 filterLine transformChar transformLine withOutputStream withPrintWriter withStream withStreams withWriter withWriterAppend write writeLine dump inspect invokeMethod print println step times upto use waitForOrKill getText';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /""".*"""/g, css: 'string' },
        { regex: new RegExp('\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b', 'gi'), css: 'value' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'color1' },
        { regex: new RegExp(this.getKeywords(i), 'gm'), css: 'constants' },
        { regex: new RegExp(this.getKeywords(o), 'gm'), css: 'functions' },
      ];
      this.forHtmlScript(n.regexLib.aspScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['groovy'];
    n.brushes.Groovy = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'abstract assert boolean break byte case catch char class const continue default do double else enum extends false final finally float for goto if implements import instanceof int interface long native new null package private protected public return short static strictfp super switch synchronized this throw throws true transient try void volatile while';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: /\/\*([^\*][\s\S]*)?\*\//gm, css: 'comments' },
        { regex: /\/\*(?!\*\/)\*[\s\S]*?\*\//gm, css: 'preprocessor' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi, css: 'value' },
        { regex: /(?!\@interface\b)\@[\$\w]+\b/g, css: 'color1' },
        { regex: /\@interface\b/g, css: 'color2' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
      ];
      this.forHtmlScript({ left: /(&lt;|<)%[@!=]?/g, right: /%(&gt;|>)/g });
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['java'];
    n.brushes.Java = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e = 'Boolean Byte Character Double Duration Float Integer Long Number Short String Void';
      var t =
        'abstract after and as assert at before bind bound break catch class continue def delete else exclusive extends false finally first for from function if import in indexof init insert instanceof into inverse last lazy mixin mod nativearray new not null on or override package postinit protected public public-init public-read replace return reverse sizeof step super then this throw true try tween typeof var where while with attribute let private readonly static trigger';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: /(-?\.?)(\b(\d*\.?\d+|\d+\.?\d*)(e[+-]?\d+)?|0x[a-f\d]+)\b\.?/gi, css: 'color2' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'variable' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'keyword' },
      ];
      this.forHtmlScript(n.regexLib.aspScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['jfx', 'javafx'];
    n.brushes.JavaFX = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'break case catch continue default delete do else false  for function if in instanceof new null return super switch this throw true try typeof var while with';
      var t = n.regexLib;
      this.regexList = [
        { regex: t.multiLineDoubleQuotedString, css: 'string' },
        { regex: t.multiLineSingleQuotedString, css: 'string' },
        { regex: t.singleLineCComments, css: 'comments' },
        { regex: t.multiLineCComments, css: 'comments' },
        { regex: /\s*#.*/gm, css: 'preprocessor' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
      ];
      this.forHtmlScript(t.scriptScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['js', 'jscript', 'javascript'];
    n.brushes.JScript = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr chroot close closedir connect cos crypt defined delete each endgrent endhostent endnetent endprotoent endpwent endservent eof exec exists exp fcntl fileno flock fork format formline getc getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr getnetbyname getnetent getpeername getpgrp getppid getpriority getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid getservbyname getservbyport getservent getsockname getsockopt glob gmtime grep hex index int ioctl join keys kill lc lcfirst length link listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd oct open opendir ord pack pipe pop pos print printf prototype push quotemeta rand read readdir readline readlink readpipe recv rename reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl semget semop send setgrent sethostent setnetent setpgrp setpriority setprotoent setpwent setservent setsockopt shift shmctl shmget shmread shmwrite shutdown sin sleep socket socketpair sort splice split sprintf sqrt srand stat study substr symlink syscall sysopen sysread sysseek system syswrite tell telldir time times tr truncate uc ucfirst umask undef unlink unpack unshift utime values vec wait waitpid warn write say';
      var t =
        'bless caller continue dbmclose dbmopen die do dump else elsif eval exit for foreach goto if import last local my next no our package redo ref require return sub tie tied unless untie until use wantarray while given when default try catch finally has extends with before after around override augment';
      this.regexList = [
        { regex: /(<<|&lt;&lt;)((\w+)|(['"])(.+?)\4)[\s\S]+?\n\3\5\n/g, css: 'string' },
        { regex: /#.*$/gm, css: 'comments' },
        { regex: /^#!.*\n/g, css: 'preprocessor' },
        { regex: /-?\w+(?=\s*=(>|&gt;))/g, css: 'string' },
        { regex: /\bq[qwxr]?\([\s\S]*?\)/g, css: 'string' },
        { regex: /\bq[qwxr]?\{[\s\S]*?\}/g, css: 'string' },
        { regex: /\bq[qwxr]?\[[\s\S]*?\]/g, css: 'string' },
        { regex: /\bq[qwxr]?(<|&lt;)[\s\S]*?(>|&gt;)/g, css: 'string' },
        { regex: /\bq[qwxr]?([^\w({<[])[\s\S]*?\1/g, css: 'string' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /(?:&amp;|[$@%*]|\$#)[a-zA-Z_](\w+|::)*/g, css: 'variable' },
        { regex: /\b__(?:END|DATA)__\b[\s\S]*$/g, css: 'comments' },
        { regex: /(^|\n)=\w[\s\S]*?(\n=cut\s*\n|$)/g, css: 'comments' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'functions' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'keyword' },
      ];
      this.forHtmlScript(n.regexLib.phpScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['perl', 'Perl', 'pl'];
    n.brushes.Perl = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'abs acos acosh addcslashes addslashes array_change_key_case array_chunk array_combine array_count_values array_diff array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill array_filter array_flip array_intersect array_intersect_assoc array_intersect_key array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map array_merge array_merge_recursive array_multisort array_pad array_pop array_product array_push array_rand array_reduce array_reverse array_search array_shift array_slice array_splice array_sum array_udiff array_udiff_assoc array_udiff_uassoc array_uintersect array_uintersect_assoc array_uintersect_uassoc array_unique array_unshift array_values array_walk array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists closedir closelog copy cos cosh count count_chars date decbin dechex decoct deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime strtoupper strtr strval substr substr_compare';
      var t =
        'abstract and array as break case catch cfunction class clone const continue declare default die do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements include include_once interface instanceof insteadof namespace new old_function or private protected public return require require_once static switch trait throw try use var while xor ';
      var i = '__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /\$\w+/g, css: 'variable' },
        { regex: new RegExp(this.getKeywords(e), 'gmi'), css: 'functions' },
        { regex: new RegExp(this.getKeywords(i), 'gmi'), css: 'constants' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'keyword' },
      ];
      this.forHtmlScript(n.regexLib.phpScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['php'];
    n.brushes.Php = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {}
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['text', 'plain'];
    n.brushes.Plain = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'while validateset validaterange validatepattern validatelength validatecount until trap switch return ref process param parameter in if global: function foreach for finally filter end elseif else dynamicparam do default continue cmdletbinding break begin alias \\? % #script #private #local #global mandatory parametersetname position valuefrompipeline valuefrompipelinebypropertyname valuefromremainingarguments helpmessage ';
      var t =
        ' and as band bnot bor bxor casesensitive ccontains ceq cge cgt cle clike clt cmatch cne cnotcontains cnotlike cnotmatch contains creplace eq exact f file ge gt icontains ieq ige igt ile ilike ilt imatch ine inotcontains inotlike inotmatch ireplace is isnot le like lt match ne not notcontains notlike notmatch or regex replace wildcard';
      var i =
        'write where wait use update unregister undo trace test tee take suspend stop start split sort skip show set send select scroll resume restore restart resolve resize reset rename remove register receive read push pop ping out new move measure limit join invoke import group get format foreach export expand exit enter enable disconnect disable debug cxnew copy convertto convertfrom convert connect complete compare clear checkpoint aggregate add';
      var o =
        ' component description example externalhelp forwardhelpcategory forwardhelptargetname forwardhelptargetname functionality inputs link notes outputs parameter remotehelprunspace role synopsis';
      this.regexList = [
        {
          regex: new RegExp('^\\s*#[#\\s]*\\.(' + this.getKeywords(o) + ').*$', 'gim'),
          css: 'preprocessor help bold',
        },
        { regex: n.regexLib.singleLinePerlComments, css: 'comments' },
        { regex: /(&lt;|<)#[\s\S]*?#(&gt;|>)/gm, css: 'comments here' },
        { regex: new RegExp('@"\\n[\\s\\S]*?\\n"@', 'gm'), css: 'script string here' },
        { regex: new RegExp("@'\\n[\\s\\S]*?\\n'@", 'gm'), css: 'script string single here' },
        { regex: new RegExp('"(?:\\$\\([^\\)]*\\)|[^"]|`"|"")*[^`]"', 'g'), css: 'string' },
        { regex: new RegExp("'(?:[^']|'')*'", 'g'), css: 'string single' },
        {
          regex: new RegExp('[\\$|@|@@](?:(?:global|script|private|env):)?[A-Z0-9_]+', 'gi'),
          css: 'variable',
        },
        {
          regex: new RegExp(
            '(?:\\b' + i.replace(/ /g, '\\b|\\b') + ')-[a-zA-Z_][a-zA-Z0-9_]*',
            'gmi',
          ),
          css: 'functions',
        },
        { regex: new RegExp(this.getKeywords(e), 'gmi'), css: 'keyword' },
        { regex: new RegExp('-' + this.getKeywords(t), 'gmi'), css: 'operator value' },
        { regex: new RegExp('\\[[A-Z_\\[][A-Z0-9_. `,\\[\\]]*\\]', 'gi'), css: 'constants' },
        {
          regex: new RegExp('\\s+-(?!' + this.getKeywords(t) + ')[a-zA-Z_][a-zA-Z0-9_]*', 'gmi'),
          css: 'color1',
        },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['powershell', 'ps', 'posh'];
    n.brushes.PowerShell = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'and assert break class continue def del elif else except exec finally for from global if import in is lambda not or pass print raise return try yield while';
      var t =
        '__import__ abs all any apply basestring bin bool buffer callable chr classmethod cmp coerce compile complex delattr dict dir divmod enumerate eval execfile file filter float format frozenset getattr globals hasattr hash help hex id input int intern isinstance issubclass iter len list locals long map max min next object oct open ord pow print property range raw_input reduce reload repr reversed round set setattr slice sorted staticmethod str sum super tuple type type unichr unicode vars xrange zip';
      var i = 'None True False self cls class_';
      this.regexList = [
        { regex: n.regexLib.singleLinePerlComments, css: 'comments' },
        { regex: /^\s*@\w+/gm, css: 'decorator' },
        { regex: /(['\"]{3})([^\1])*?\1/gm, css: 'comments' },
        { regex: /"(?!")(?:\.|\\\"|[^\""\n])*"/gm, css: 'string' },
        { regex: /'(?!')(?:\.|(\\\')|[^\''\n])*'/gm, css: 'string' },
        { regex: /\+|\-|\*|\/|\%|=|==/gm, css: 'keyword' },
        { regex: /\b\d+\.?\w*/g, css: 'value' },
        { regex: new RegExp(this.getKeywords(t), 'gmi'), css: 'functions' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
        { regex: new RegExp(this.getKeywords(i), 'gm'), css: 'color1' },
      ];
      this.forHtmlScript(n.regexLib.aspScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['py', 'python'];
    n.brushes.Python = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'alias and BEGIN begin break case class def define_method defined do each else elsif END end ensure false for if in module new next nil not or raise redo rescue retry return self super then throw true undef unless until when while yield';
      var t =
        'Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol ThreadGroup Thread Time TrueClass';
      this.regexList = [
        { regex: n.regexLib.singleLinePerlComments, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /\b[A-Z0-9_]+\b/g, css: 'constants' },
        { regex: /:[a-z][A-Za-z0-9_]*/g, css: 'color2' },
        { regex: /(\$|@@|@)\w+/g, css: 'variable bold' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
        { regex: new RegExp(this.getKeywords(t), 'gm'), css: 'color1' },
      ];
      this.forHtmlScript(n.regexLib.aspScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['ruby', 'rails', 'ror', 'rb'];
    n.brushes.Ruby = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      function e(e) {
        return '\\b([a-z_]|)' + e.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b';
      }
      function t(e) {
        return '\\b' + e.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + ':\\b';
      }
      var i =
        'ascent azimuth background-attachment background-color background-image background-position background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index';
      var o =
        'above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero digits disc dotted double embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow';
      var a =
        '[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif';
      var r = '!important !default';
      var s = '@import @extend @debug @warn @if @for @while @mixin @include';
      var c = n.regexLib;
      this.regexList = [
        { regex: c.multiLineCComments, css: 'comments' },
        { regex: c.singleLineCComments, css: 'comments' },
        { regex: c.doubleQuotedString, css: 'string' },
        { regex: c.singleQuotedString, css: 'string' },
        { regex: /\#[a-fA-F0-9]{3,6}/g, css: 'value' },
        { regex: /\b(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)\b/g, css: 'value' },
        { regex: /\$\w+/g, css: 'variable' },
        { regex: new RegExp(this.getKeywords(r), 'g'), css: 'color3' },
        { regex: new RegExp(this.getKeywords(s), 'g'), css: 'preprocessor' },
        { regex: new RegExp(e(i), 'gm'), css: 'keyword' },
        { regex: new RegExp(t(o), 'g'), css: 'value' },
        { regex: new RegExp(this.getKeywords(a), 'g'), css: 'color1' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['sass', 'scss'];
    n.brushes.Sass = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'val sealed case def true trait implicit forSome import match object null finally super override try lazy for var catch throw type extends class while with new final yield abstract else do if return protected private this package false';
      var t = '[_:=>%<#@]+';
      this.regexList = [
        { regex: n.regexLib.singleLineCComments, css: 'comments' },
        { regex: n.regexLib.multiLineCComments, css: 'comments' },
        { regex: n.regexLib.multiLineSingleQuotedString, css: 'string' },
        { regex: n.regexLib.multiLineDoubleQuotedString, css: 'string' },
        { regex: n.regexLib.singleQuotedString, css: 'string' },
        { regex: /0x[a-f0-9]+|\d+(\.\d+)?/gi, css: 'value' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
        { regex: new RegExp(t, 'gm'), css: 'keyword' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['scala'];
    n.brushes.Scala = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'abs avg case cast coalesce convert count current_timestamp current_user day isnull left lower month nullif replace right session_user space substring sum system_user upper user year';
      var t =
        'absolute action add after alter as asc at authorization begin bigint binary bit by cascade char character check checkpoint close collate column commit committed connect connection constraint contains continue create cube current current_date current_time cursor database date deallocate dec decimal declare default delete desc distinct double drop dynamic else end end-exec escape except exec execute false fetch first float for force foreign forward free from full function global goto grant group grouping having hour ignore index inner insensitive insert instead int integer intersect into is isolation key last level load local max min minute modify move name national nchar next no numeric of off on only open option order out output partial password precision prepare primary prior privileges procedure public read real references relative repeatable restrict return returns revoke rollback rollup rows rule schema scroll second section select sequence serializable set size smallint static statistics table temp temporary then time timestamp to top transaction translation trigger true truncate uncommitted union unique update values varchar varying view when where with work';
      var i = 'all and any between cross in join like not null or outer some';
      this.regexList = [
        { regex: /--(.*)$/gm, css: 'comments' },
        { regex: n.regexLib.multiLineDoubleQuotedString, css: 'string' },
        { regex: n.regexLib.multiLineSingleQuotedString, css: 'string' },
        { regex: new RegExp(this.getKeywords(e), 'gmi'), css: 'color2' },
        { regex: new RegExp(this.getKeywords(i), 'gmi'), css: 'color1' },
        { regex: new RegExp(this.getKeywords(t), 'gmi'), css: 'keyword' },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['sql'];
    n.brushes.Sql = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      var e =
        'AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType Date Decimal Declare Default Delegate Dim DirectCast Do Double Each Else ElseIf End Enum Erase Error Event Exit False Finally For Friend Function Get GetType GoSub GoTo Handles If Implements Imports In Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing NotInheritable NotOverridable Object On Option Optional Or OrElse Overloads Overridable Overrides ParamArray Preserve Private Property Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume Return Select Set Shadows Shared Short Single Static Step Stop String Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until Variant When While With WithEvents WriteOnly Xor';
      this.regexList = [
        { regex: /'.*$/gm, css: 'comments' },
        { regex: n.regexLib.doubleQuotedString, css: 'string' },
        { regex: /^\s*#.*$/gm, css: 'preprocessor' },
        { regex: new RegExp(this.getKeywords(e), 'gm'), css: 'keyword' },
      ];
      this.forHtmlScript(n.regexLib.aspScriptTags);
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['vb', 'vbnet'];
    n.brushes.Vb = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  !(function () {
    function e() {
      function e(e, i) {
        var o = n.Match,
          a = e[0],
          r = new t('(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)', 'xg').exec(a),
          s = [];
        if (null != e.attributes) {
          var c,
            d = new t('(?<name> [\\w:\\-\\.]+)\\s*=\\s*(?<value> ".*?"|\'.*?\'|\\w+)', 'xg');
          for (; null != (c = d.exec(a));) {
            s.push(new o(c.name, e.index + c.index, 'color1'));
            s.push(new o(c.value, e.index + c.index + c[0].indexOf(c.value), 'string'));
          }
        }
        if (null != r) s.push(new o(r.name, e.index + r[0].indexOf(r.name), 'keyword'));
        return s;
      }
      this.regexList = [
        {
          regex: new t('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)', 'gm'),
          css: 'color2',
        },
        { regex: n.regexLib.xmlComments, css: 'comments' },
        {
          regex: new t('(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)', 'sg'),
          func: e,
        },
      ];
    }
    n = n || ('undefined' != typeof require ? require('shCore').SyntaxHighlighter : null);
    e.prototype = new n.Highlighter();
    e.aliases = ['xml', 'xhtml', 'xslt', 'html'];
    n.brushes.Xml = e;
    'undefined' != typeof exports ? (exports.Brush = e) : null;
  })();
  window.SyntaxHighlighter = n;
});
