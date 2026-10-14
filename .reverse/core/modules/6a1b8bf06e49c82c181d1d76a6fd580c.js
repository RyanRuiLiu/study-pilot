EDU(
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l = {},
      u,
      _ = {},
      f = {},
      h = document.createDocumentFragment();
    if (!document.head) document.head = document.getElementsByTagName('head')[0] || document.body;
    r.dump = function () {
      return { pool: _, dirty: f, fragment: h };
    };
    r._$id = l._$id = function (e) {
      e = r._$get(e);
      if (e) {
        var t = e.id ? e.id : 'auto-id-' + n._$uniqueID();
        if (!('id' in e)) _[t] = e;
        e.id = t;
        if (!r._$get(t)) f[t] = e;
        return t;
      }
    };
    r._$get = function (e) {
      try {
        var t = _['' + e];
      } catch (i) {}
      if (t) return t;
      if (!n._$isString(e) && !n._$isNumber(e)) return e;
      var t = document.getElementById(e);
      if (!t) t = a.__getElementById(h, e);
      if (t) delete f[e];
      return t || f[e];
    };
    r._$getChildren = l._$getChildren = function (e, t) {
      e = r._$get(e);
      if (!e) return null;
      var i = a.__getChildren(e);
      if (t)
        n._$reverseEach(i, function (e, n, i) {
          if (!r._$hasClassName(e, t)) i.splice(n, 1);
        });
      return i;
    };
    r._$getParent = (function () {
      var e;
      var t = function (t, n) {
        var i = t.split(':');
        if (i.length > 1) {
          if (!e)
            e = {
              a: r._$attr,
              d: r._$dataset,
              c: r._$hasClassName,
              t: function (e, t) {
                return (e.tagName || '').toLowerCase() === t;
              },
            };
          var o = e[i[0]];
          if (o) return !!o(n, i[1]);
          t = i[1];
        }
        return !!r._$attr(n, t) || !!r._$dataset(n, t) || r._$hasClassName(n, t);
      };
      return function (e, i) {
        e = r._$get(e);
        if (e) {
          if (!i) return e;
          if (n._$isString(i)) i = t._$bind(null, i);
          if (n._$isFunction(i)) {
            for (; e;) {
              if (i(e)) return e;
              e = e.parentNode;
            }
            return null;
          }
          return e;
        }
      };
    })();
    r._$getByClassName = l._$getByClassName = function (e, t) {
      e = r._$get(e);
      return !e ? null : a.__getElementsByClassName(e, t.trim());
    };
    r._$getSibling = l._$getSibling = (function () {
      var e = function () {
        return !0;
      };
      return function (t, i) {
        t = r._$get(t);
        if (!t) return null;
        var o = { backward: !1, filter: e };
        if (n._$isFunction(i)) o.filter = i;
        else o = n._$fetch(o, i);
        var s = o.backward ? a.__previousSibling : a.__nextSibling;
        for (; (t = s(t)) && !o.filter(t););
        return t;
      };
    })();
    r._$getScrollViewPort = function (e) {
      e = r._$get(e);
      if (e) {
        e = e.parentNode;
        for (; e && !(e.scrollHeight > e.clientHeight);) e = e.parentNode;
        if (e) return e;
      }
      var t = document.body.scrollHeight,
        n = document.documentElement.scrollHeight;
      return n >= t ? document.documentElement : document.body;
    };
    r._$getPageBox = (function () {
      var e = function (e) {
        var t = 0;
        n._$forEach(e, function (e) {
          if (e)
            if (!t) t = e;
            else t = Math.min(t, e);
        });
        return t;
      };
      var t = [
        {
          main: 'scroll',
          sub: ['Top', 'Left'],
          func: function (e, t, n) {
            return Math.max(t['scroll' + e], n['scroll' + e]);
          },
        },
        {
          main: 'client',
          sub: ['Width', 'Height'],
          func: function (t, n, i) {
            return e([n['client' + t], n['offset' + t], i['client' + t], i['offset' + t]]);
          },
        },
        {
          main: 'scroll',
          sub: ['Width', 'Height'],
          func: function (e, t, n, i) {
            return Math.max(i['client' + e], t['scroll' + e], n['scroll' + e]);
          },
        },
      ];
      return function (e) {
        var i = {},
          o = e || document,
          a = o.body,
          r = o.documentElement;
        n._$forEach(t, function (e) {
          var t = e.main;
          n._$forEach(e.sub, function (n) {
            i[t + n] = e.func(n, a, r, i);
          });
        });
        return i;
      };
    })();
    r._$getMaxBox = function (e, t) {
      var i = n._$merge({}, e),
        o = t.width / t.height,
        a = e.width / e.height;
      if (o > a && e.height > t.height) {
        i.height = t.height;
        i.width = i.height * a;
      }
      if (o < a && e.width > t.width) {
        i.width = t.width;
        i.height = i.width / a;
      }
      return i;
    };
    r._$scrollTo = l._$scrollTo = function (e) {
      var t = r._$offset(e);
      window.scrollTo(t.x, t.y);
    };
    r._$align = (function () {
      var e = /\s+/;
      var t = {
        left: function () {
          return 0;
        },
        center: function (e, t) {
          return (e.width - t.width) / 2;
        },
        right: function (e, t) {
          return e.width - t.width;
        },
        top: function () {
          return 0;
        },
        middle: function (e, t) {
          return (e.height - t.height) / 2;
        },
        bottom: function (e, t) {
          return e.height - t.height;
        },
      };
      return function (n, i, o) {
        var a = {},
          r = (o || '').split(e),
          s = t[r[1]] || t.middle,
          c = t[r[0]] || t.center;
        a.top = s(n, i);
        a.left = c(n, i);
        return a;
      };
    })();
    r._$offset = l._$offset = (function () {
      var e = function (e) {
        return e == document.body || e == document.documentElement;
      };
      return function (t, n) {
        t = r._$get(t);
        if (!t) return null;
        n = r._$get(n) || null;
        var i = t,
          o = { x: 0, y: 0 },
          a,
          s,
          c;
        for (; i && i != n;) {
          a = e(i) || i == t;
          s = a ? 0 : i.scrollLeft;
          c = parseInt(r._$getStyle(i, 'borderLeftWidth')) || 0;
          o.x += i.offsetLeft + c - s;
          s = a ? 0 : i.scrollTop;
          c = parseInt(r._$getStyle(i, 'borderTopWidth')) || 0;
          o.y += i.offsetTop + c - s;
          i = i.offsetParent;
        }
        return o;
      };
    })();
    r._$fullScreen = l._$fullScreen = function (e) {
      e = r._$get(e);
      if (e) a.__fullScreen(e, r._$getPageBox());
    };
    r._$mask = l._$mask = function (e) {
      e = r._$get(e);
      if (e) {
        r._$id(e);
        return a.__mask(e);
      }
      return null;
    };
    r._$unmask = l._$unmask = function (e) {
      e = r._$get(e);
      if (e) {
        r._$id(e);
        return a.__unmask(e);
      }
      return null;
    };
    r._$create = (function () {
      var e = {
        a: { href: '#', hideFocus: !0 },
        style: { type: 'text/css' },
        link: { type: 'text/css', rel: 'stylesheet' },
        iframe: { frameBorder: 0 },
        script: { defer: !0, type: 'text/javascript' },
      };
      return function (t, i, o) {
        var a = document.createElement(t),
          s = e[t.toLowerCase()];
        n._$merge(a, s);
        if (i) a.className = i;
        o = r._$get(o);
        if (o) o.appendChild(a);
        else if (!s) h.appendChild(a);
        return a;
      };
    })();
    r._$createXFrame = (function () {
      var e = function () {
        if (location.hostname == document.domain) return 'about:blank';
        else
          return (
            'javascript:(function(){document.open();document.domain="' +
            document.domain +
            '";document.close();})();'
          );
      };
      var t = function (e) {
        e = e.trim();
        if (!e) return r._$create('iframe');
        var t;
        try {
          t = document.createElement('<iframe name="' + e + '"></iframe>');
          t.frameBorder = 0;
        } catch (n) {
          t = r._$create('iframe');
          t.name = e;
        }
        return t;
      };
      return function (o) {
        o = o || s;
        var a = t(o.name || '');
        if (!o.visible) a.style.display = 'none';
        if (n._$isFunction(o.onload))
          i._$addEvent(a, 'load', function (e) {
            if (a.src) {
              i._$clearEvent(a, 'load');
              o.onload(e);
            }
          });
        var c = o.parent;
        if (n._$isFunction(c))
          try {
            c(a);
          } catch (d) {}
        else (r._$get(c) || document.body).appendChild(a);
        var l = o.src || e();
        window.setTimeout(function () {
          a.src = l;
        }, 0);
        return a;
      };
    })();
    r._$remove = l._$remove = (function () {
      var e = {
        img: function (e) {
          e.src = t._$BLANK_IMAGE;
        },
        iframe: function (e) {
          e.src = 'about:blank';
        },
      };
      var o = function (t, i) {
        if (i) {
          if (t.getElementsByTagName) n._$forEach(t.getElementsByTagName(i), o);
        } else {
          var a = (t.tagName || '').toLowerCase(),
            r = e[a];
          if (r) r(t);
        }
      };
      return function (e) {
        e = r._$get(e);
        if (e) {
          if (!arguments[1]) i._$clearEvent(e);
          o(e);
          o(e, 'img');
          o(e, 'iframe');
          if (e.parentNode) e.parentNode.removeChild(e);
        }
      };
    })();
    r._$removeByEC = l._$removeByEC = function (e) {
      e = r._$get(e);
      if (e)
        try {
          h.appendChild(e);
        } catch (t) {
          console.error(t);
        }
    };
    r._$clearChildren = l._$clearChildren = function (e) {
      e = r._$get(e);
      if (e)
        n._$reverseEach(e.childNodes, function (e) {
          r._$remove(e);
        });
    };
    r._$wrapInline = l._$wrapInline = (function () {
      var e,
        t = /\s+/;
      var n = function () {
        if (!e) {
          e = r._$pushCSSText(
            '.#<uispace>{position:relative;zoom:1;}.#<uispace>-show{position:absolute;top:0;left:100%;cursor:text;white-space:nowrap;overflow:hidden;}',
          );
          r._$dumpCSSText();
        }
      };
      return function (i, o) {
        i = r._$get(i);
        if (!i) return null;
        n();
        o = o || s;
        var a = i.parentNode;
        if (!r._$hasClassName(a, e)) {
          a = r._$create('span', e);
          i.insertAdjacentElement('beforeBegin', a);
          a.appendChild(i);
        }
        var c = o.nid || '',
          d = r._$getByClassName(a, c || e + '-show')[0];
        if (!d) {
          var l = ((o.clazz || '') + ' ' + c).trim();
          l = e + '-show' + (!l ? '' : ' ') + l;
          d = r._$create(o.tag || 'span', l);
          a.appendChild(d);
        }
        var l = o.clazz;
        if (l) {
          l = (l || '').trim().split(t)[0] + '-parent';
          r._$addClassName(a, l);
        }
        return d;
      };
    })();
    r._$dataset = l._$dataset = function (e, t, i) {
      var o = r._$id(e);
      if (!o) return null;
      if (n._$isString(t)) return a.__dataset(r._$get(e), t, i);
      if (n._$isObject(t)) {
        var s = {};
        n._$forIn(t, function (e, t) {
          s[t] = r._$dataset(o, t, e);
        });
        return s;
      }
      if (n._$isArray(t)) {
        var s = {};
        n._$forEach(t, function (e) {
          s[e] = r._$dataset(o, e);
        });
        return s;
      }
      return null;
    };
    r._$attr = l._$attr = function (e, t, n) {
      e = r._$get(e);
      if (!e) return '';
      if (void 0 !== n && e.setAttribute) e.setAttribute(t, n);
      return a.__getAttribute(e, t);
    };
    r._$html2node = (function () {
      var e = /<(.*?)(?=\s|>)/i,
        t = { li: 'ul', tr: 'tbody', td: 'tr', th: 'tr', option: 'select' };
      return function (n) {
        var i;
        if (e.test(n)) i = t[(RegExp.$1 || '').toLowerCase()] || '';
        var o = r._$create(i || 'div');
        o.innerHTML = n;
        var a = r._$getChildren(o);
        return a.length > 1 ? o : a[0];
      };
    })();
    r._$dom2xml = l._$dom2xml = function (e) {
      e = r._$get(e);
      return !e ? '' : a.__serializeDOM2XML(e);
    };
    r._$xml2dom = function (e) {
      e = (e || '').trim();
      return !e ? null : a.__parseDOMFromXML(e);
    };
    r._$dom2object = l._$dom2object = function (e, t) {
      t = t || {};
      e = r._$get(e);
      if (!e) return t;
      var i = e.tagName.toLowerCase(),
        o = r._$getChildren(e);
      if (!o || !o.length) {
        t[i] = e.textContent || e.text || '';
        return t;
      }
      var a = {};
      t[i] = a;
      n._$forEach(o, function (e) {
        r._$dom2object(e, a);
      });
      return t;
    };
    r._$xml2object = function (e) {
      try {
        return r._$dom2object(r._$xml2dom(e));
      } catch (t) {
        return null;
      }
    };
    r._$text2type = (function () {
      var e = {
        xml: function (e) {
          return r._$xml2dom(e);
        },
        json: function (e) {
          try {
            return JSON.parse(e);
          } catch (t) {
            return null;
          }
        },
        dft: function (e) {
          return e;
        },
      };
      return function (t, n) {
        n = (n || '').toLowerCase();
        return (e[n] || e.dft)(t || '');
      };
    })();
    r._$style = l._$style = function (e, t) {
      e = r._$get(e);
      if (e)
        n._$loop(t, function (t, n) {
          r._$setStyle(e, n, t);
        });
    };
    r._$setStyle = l._$setStyle = function (e, t, n) {
      e = r._$get(e);
      if (e) a.__setStyleValue(e, t, a.__processCSSText(n));
    };
    r._$getStyle = l._$getStyle = function (e, t) {
      e = r._$get(e);
      return !e ? '' : a.__getStyleValue(e, t);
    };
    r._$addScript = function (e) {
      try {
        e = e.trim();
        if (e) return new Function(e)();
      } catch (t) {
        console.error(t.message);
        console.error(t.stack);
      }
    };
    r._$addStyle = (function () {
      var e = /[\s\r\n]+/gi;
      return function (t) {
        t = (t || '').replace(e, ' ').trim();
        var n = null;
        if (t) {
          n = r._$create('style');
          document.head.appendChild(n);
          a.__injectCSSText(n, a.__processCSSText(t));
        }
        return n;
      };
    })();
    r._$pushCSSText = (function () {
      var e = /#<(.*?)>/g,
        t = +new Date();
      return function (t, i) {
        if (!u) u = [];
        var o = 'auto-' + n._$uniqueID(),
          a = n._$merge({ uispace: o }, i);
        u.push(
          t.replace(e, function (e, t) {
            return a[t] || e;
          }),
        );
        return o;
      };
    })();
    r._$dumpCSSText = function () {
      if (u) {
        r._$addStyle(u.join(' '));
        u = null;
      }
    };
    r._$appendCSSText = l._$appendCSSText = function (e, t) {
      e = r._$get(e);
      return !e ? null : a.__appendCSSText(e, a.__processCSSText(t));
    };
    r._$addClassName = l._$addClassName = function (e, t) {
      if (t) {
        e = r._$get(e);
        if (e) a.__processClassName(e, 'add', t);
      }
    };
    r._$delClassName = l._$delClassName = function (e, t) {
      e = r._$get(e);
      if (e) a.__processClassName(e, 'remove', t);
    };
    r._$replaceClassName = l._$replaceClassName = function (e, t, n) {
      e = r._$get(e);
      if (e) a.__processClassName(e, 'replace', t, n);
    };
    r._$hasClassName = l._$hasClassName = function (e, t) {
      e = r._$get(e);
      if (e) return a.__hasClassName(e, t);
      else return !1;
    };
    r._$matrix = function (e) {
      e = (e || '').trim();
      return a.__getCSSMatrix(e);
    };
    r._$css3d = l._$css3d = function (e, t, n) {
      e = r._$get(e);
      if (e) {
        var i = a.__processTransformValue(t, n);
        if (i) r._$setStyle(e, 'transform', i);
      }
    };
    o._$merge(l);
    if (!0) e.copy(e.P('nej.e'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '8b5c7ec5f50504fcb779ea6190a77347',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'd37bb207915efdc94c2f2a74d479b6f5',
  '6d39e324797cb82838cea3c6a550723f',
);
