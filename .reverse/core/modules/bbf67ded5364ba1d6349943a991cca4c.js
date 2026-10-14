EDU(
  'bbf67ded5364ba1d6349943a991cca4c',
  function (e, t, n, i, o, a) {
    n.__getElementById = function (e, t) {
      if (e.getElementById) return e.getElementById('' + t);
      try {
        return e.querySelector('#' + t);
      } catch (n) {
        return null;
      }
    };
    n.__getChildren = function (t) {
      return e._$object2array(t.children || t.childNodes);
    };
    n.__getElementsByClassName = function (t, n) {
      return e._$object2array(t.getElementsByClassName(n));
    };
    n.__nextSibling = function (e) {
      return e.nextElementSibling;
    };
    n.__previousSibling = function (e) {
      return e.previousElementSibling;
    };
    n.__dataset = function (e, t, n) {
      e.dataset = e.dataset || {};
      if (void 0 !== n) e.dataset[t] = n;
      return e.dataset[t];
    };
    n.__getAttribute = function (e, t) {
      if ('getAttribute' in e) return e.getAttribute(t);
    };
    n.__serializeDOM2XML = function (e) {
      return new XMLSerializer().serializeToString(e) || '';
    };
    n.__parseDOMFromXML = function (e) {
      var t = new DOMParser().parseFromString(e, 'text/xml').documentElement;
      return 'parsererror' == t.nodeName ? null : t;
    };
    n.__fullScreen = function () {};
    n.__mask = function () {};
    n.__unmask = function () {};
    var r = t._$SUPPORT,
      s = t._$KERNEL.prefix;
    n.__isMatchedName = (function () {
      var e = /^([a-z]+?)[A-Z]/;
      return function (t, n) {
        return !!(n[t] || (e.test(t) && n[RegExp.$1]));
      };
    })();
    n.__isNeedPrefixed = (function () {
      var t = e._$array2object([
        'animation',
        'transform',
        'transition',
        'appearance',
        'userSelect',
        'box',
        'flex',
        'column',
      ]);
      return function (e) {
        return n.__isMatchedName(e, t);
      };
    })();
    n.__fmtStyleName = (function () {
      var e = /-([a-z])/g;
      return function (t) {
        t = t || '';
        return t.replace(e, function (e, t) {
          return t.toUpperCase();
        });
      };
    })();
    n.__getStyleName = (function () {
      var e = /^[a-z]/,
        t = s.css || '';
      return function (i) {
        i = n.__fmtStyleName(i);
        if (!n.__isNeedPrefixed(i)) return i;
        else
          return (
            t +
            i.replace(e, function (e) {
              return e.toUpperCase();
            })
          );
      };
    })();
    n.__getStyleValue = function (e, t) {
      var i = window.getComputedStyle(e, null);
      return i[n.__getStyleName(t)] || '';
    };
    n.__setStyleValue = function (e, t, i) {
      e.style[n.__getStyleName(t)] = i;
    };
    n.__getCSSMatrix = (function () {
      var t = /\((.*?)\)/,
        n = /\s*,\s*/,
        i = ['CSSMatrix', s.clz + 'CSSMatrix'],
        o = ['m11', 'm12', 'm21', 'm22', 'm41', 'm42'];
      var a = function (i) {
        var a = {};
        if (t.test(i || ''))
          e._$forEach(RegExp.$1.split(n), function (e, t) {
            a[o[t]] = e;
          });
        return a;
      };
      return function (t) {
        var n;
        e._$forIn(i, function (e) {
          if (this[e]) {
            n = new this[e](t || '');
            return !0;
          }
        });
        return !n ? a(t) : n;
      };
    })();
    n.__injectCSSText = function (e, t) {
      e.textContent = t;
    };
    n.__processCSSText = (function () {
      var t = /\$<(.*?)>/gi,
        o = /\{(.*?)\}/g,
        a = '-' + s.css.toLowerCase() + '-',
        c = {
          scale: 'scale({x|1},{y|1})',
          rotate: 'rotate({a})',
          translate: 'translate({x},{y})',
          matrix: 'matrix({m11},{m12},{m21},{m22},{m41},{m42})',
        },
        d = {
          scale: 'scale3d({x|1},{y|1},{z|1})',
          rotate: 'rotate3d({x},{y},{z},{a})',
          translate: 'translate3d({x},{y},{z})',
          matrix:
            'matrix3d({m11},{m12},{m13},{m14},{m21},{m22},{m23},{m24},{m31},{m32},{m33|1},{m34},{m41},{m42},{m43},{m44|1})',
        };
      var l = function (e, t) {
        t = t || i;
        return e.replace(o, function (e, n) {
          var i = n.split('|');
          return t[i[0]] || i[1] || '0';
        });
      };
      n.__processTransformValue = function (e, t) {
        var n = (!r.css3d ? c : d)[e.trim()];
        if (n) return l(n, t);
        else return '';
      };
      return function (i) {
        if (!i.replace) return i;
        else
          return i.replace(t, function (t, i) {
            if ('vendor' === i) return a;
            var o = (i || '').split('|');
            return n.__processTransformValue(o[0], e._$query2object(o[1])) || t;
          });
      };
    })();
    n.__appendCSSText = function (e, t) {
      var n = e.sheet,
        i = n.cssRules.length;
      n.insertRule(t, i);
      return n.cssRules[i];
    };
    n.__getClassList = (function () {
      var e = /\s+/;
      return function (t) {
        t = (t || '').trim();
        return t ? t.split(e) : null;
      };
    })();
    n.__processClassName = function (t, i, o) {
      if ('replace' != i)
        e._$forEach(n.__getClassList(o), function (e) {
          t.classList[i]((e || '').trim());
        });
      else {
        n.__processClassName(t, 'remove', o);
        n.__processClassName(t, 'add', arguments[3]);
      }
    };
    n.__hasClassName = function (t, i) {
      var o = t.classList;
      if (!o || !o.length) return !1;
      else
        return (
          e._$indexOf(n.__getClassList(i), function (e) {
            return o.contains(e);
          }) >= 0
        );
    };
    !(function () {
      if (!r.css3d) {
        var e = n.__getCSSMatrix();
        r.css3d = !!e && null != e.m41;
      }
    })();
    return n;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f051aeae7bb889518ead30ef6e491df3',
);
