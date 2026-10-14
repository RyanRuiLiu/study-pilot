EDU(
  'd702c6c0bcd70f9b4114ae0d7c2ea1b8',
  function (e, t, i, n, a) {
    function o(e, t) {
      this.length = 0;
      this._signs = {};
      this._context = t || c;
      if (e)
        if ('string' == typeof e) {
          if (t && t instanceof o) t = t[0];
          if ('string' == typeof t) t = E(t)[0];
          this._$add(a._$all(e, t));
        } else if (e instanceof o || m(e) || e.length) this._$add(e);
    }
    var s = /^\s*<(\w+|!)[^>]*>/,
      r = [].slice,
      c = document,
      d = 'documentElement',
      _ = c[d],
      l = c.createElement('div'),
      h = null == l.textContent ? 'innerText' : 'textContent',
      f = function (e, t, i) {
        i = i || {};
        if (null == this[e] || i.override) this[e] = t;
        return this;
      },
      u = function (e, t, i) {
        for (; t && t !== i;) {
          if (nes.matches(t, e)) return t;
          t = t.parentNode;
        }
      },
      p = function (i, n, a) {
        return i === a || 'undefined' === i || i === this || i === t || i === e;
      },
      m = function (e) {
        if (!e) return !1;
        var t = e.nodeType;
        return 1 === t || 9 === t || 11 === t || e.window === e;
      },
      b = function (e) {
        var t = e.prototype,
          i = {};
        return {
          extend: function (e, n) {
            i[e] = t[e];
            t[e] = n;
            return this;
          },
          reset: function () {
            for (var e in i)
              if (i.hasOwnProperty(e))
                if (void 0 === i[e]) delete t[e];
                else t[e] = i[e];
          },
        };
      },
      g = b(Function);
    g.extend('autoSet', function () {
      var e = this;
      return function (t, n) {
        if (i._$isObject(t)) {
          var a = r.call(arguments, 1);
          for (var o in t) e.apply(this, [o, t[o]].concat(a));
          return this;
        } else return e.apply(this, arguments);
      };
    }).extend('splitProcess', function (e) {
      var t = this;
      return function (n) {
        if (i._$isArray(n)) {
          var a = r.call(arguments, 1),
            o = n.length,
            s;
          if (e) s = {};
          for (var c = 0; c < o; c++) {
            var d = n[c],
              _ = t.apply(this, [d].concat(a));
            if (e && 'string' == typeof d) s[d] = _;
          }
          return e ? s : this;
        } else return t.apply(this, arguments);
      };
    });
    f = f.autoSet();
    var E = function (e, t) {
      E._$implement(n._$dump(), { statics: !0 });
      n._$clear();
      if ('string' == typeof e && 0 == e.trim().indexOf('<')) {
        var i = document.createElement('div');
        i.innerHTML = e;
        var a = E(i.childNodes);
        return a;
      }
      return new o(e, t);
    };
    E._$extend = f._$bind(E);
    E._$extend({
      _$signal: '_uid',
      _$instances: {},
      _$handlers: [],
      _$fragment: function () {},
      _$implement: function (e, t, i) {
        i = i || {};
        f.call(o.prototype, e, i.statics ? this._transport(t) : t);
      }.autoSet(),
      _transport: function (e) {
        return function () {
          var t = r.call(arguments);
          t.unshift(this[0]);
          var i = e.apply(this, t);
          if (!p.call(this, i)) return i;
          this._$forEach(function (i, n) {
            if (0 !== n) {
              t[0] = i;
              e.apply(this, t);
            }
          });
          return this;
        };
      },
      _merge: function (e, t, i) {
        var n = e.length || 0,
          a = 0;
        for (; void 0 !== t[a];) {
          var o = t[a++];
          if (!i || i.call(e, o)) e[n++] = o;
        }
        e.length = n;
        return e;
      },
      _toArray: function (e) {
        return E._merge([], e);
      },
      _contains: _.contains
        ? function (e, t) {
            return e === t || (9 == e.nodeType ? e[d] : e).contains(t);
          }
        : _.compareDocumentPosition
          ? function (e, t) {
              return t && !!(16 & e.compareDocumentPosition(t));
            }
          : function (e, t) {
              for (; (t = t.parentNode);) if (t === e) return !0;
              return !1;
            },
      _$cloneNode: function (e, t) {
        t = !!t;
        var i = e.cloneNode(t),
          n,
          a;
        if (t) {
          a = nes.all('*', e);
          a.push(e);
          n = nes.all('*', i);
          n.push(i);
        } else {
          a = [e];
          n = [i];
        }
        for (_i = n.length; _i--;) $.fixture.clone(n[_i], a[_i]);
        return i;
      },
      _delegateHandlers: {},
      _cleanSelector: nes._cleanSelector,
      _$uniqueSort: nes._uniqueSort,
      _$matches: nes.matches,
      _$fn: o.prototype,
      _$uid: nes._getUid,
    });
    var v = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/,
      w = /^key(?:)/,
      $ = {
        insertor: {
          top: function (e, t) {
            e.insertBefore(t, e.firstChild);
          },
          bottom: function (e, t) {
            e.appendChild(t);
          },
          before: function (e, t) {
            var i = e.parentNode;
            if (i) i.insertBefore(t, e);
          },
          after: function (e, t) {
            var i = e.parentNode;
            if (i) i.insertBefore(t, e.nextSibling);
          },
        },
        fixProps: { input: 'checked', option: 'selected', textarea: 'value', script: 'text' },
        fixture: {
          clone: function (e, t) {
            var i, n;
            if (1 === e.nodeType) {
              if (e.clearAttributes) {
                e.clearAttributes();
                e.mergeAttributes(t);
              }
              i = e.nodeName.toLowerCase();
              if ((_prop = $.fixProps[i])) e[_prop] = t[_prop];
              e.removeAttribute(E._$signal);
              e.removeAttribute('id');
            }
          },
          event: function (t) {
            var i = t.type;
            var n = t.button;
            t.__fixed = !0;
            t.target = t.target || t.srcElement || document;
            t.metaKey = !!t.metaKey;
            if (3 === t.target.nodeType) t.target = t.target.parentNode;
            if (v.test(i)) {
              t.pageX = e._$pageX(t);
              t.pageY = e._$pageY(t);
              if ('mouseover' === i || 'mouseout' === i) {
                var a = t.relatedTarget || t[('mouseover' == i ? 'from' : 'to') + 'Element'];
                for (; a && 3 == a.nodeType;) a = a.parentNode;
                t.relatedTarget = a;
              }
            }
            t.which = null != t.charCode ? t.charCode : t.keyCode;
            if (!t.which && void 0 !== n) t.which = 1 & n ? 1 : 2 & n ? 3 : 4 & n ? 2 : 0;
            if (!t.preventDefault)
              t.preventDefault = function () {
                this.returnValue = !1;
                return this;
              };
            if (!t.stopPropagation)
              t.stopPropagation = function () {
                this.cancelBubble = !0;
                return this;
              };
          },
        },
      },
      C = function (e) {
        var t = E._$matches;
        return function (i, n) {
          var a = E([]);
          if ('boolean' == typeof i) {
            n = i;
            i = null;
          }
          this._$forEach(function (o) {
            var s = o[e];
            for (; s;) {
              if (1 === s.nodeType && (!i || t(s, i))) {
                a._$add(s);
                if (!n) break;
              }
              s = s[e];
            }
          });
          return a;
        };
      };
    E._$implement({
      _$style: function (e, i) {
        if (!e) throw Error('缺少css样式名');
        if (void 0 === i) return t._$getStyle(this[0], e);
        else
          return this._$forEach(function (n) {
            t._$setStyle(n, e, i);
          });
      }
        .splitProcess(!0)
        .autoSet(),
      _$attr: function (e, i) {
        if (!e) throw Error('缺少属性名');
        if (void 0 === i) return t._$attr(this[0], e);
        else
          return this._$forEach(function (n) {
            t._$attr(n, e, i);
          });
      }
        .splitProcess(!0)
        .autoSet(),
      _$forEach: function (e) {
        i._$forEach(this, e);
        return this;
      },
      _$filter: function (e) {
        var t = [],
          i = 'string' == typeof e;
        this._$forEach(function (n, a) {
          var o = i ? E._$matches(n, e) : e.call(this, n, a);
          if (o) t.push(n);
        });
        return E(t);
      },
      _$map: function (e) {
        var t = [],
          i = !1;
        this._$forEach(function (n, a) {
          var o = e.call(this, n, a);
          if (!m(o)) i = !0;
          t.push(o);
        });
        return i ? t : E([])._$add(t);
      },
      _$sort: function () {
        var e = this._$get();
        E._$uniqueSort(e);
        return E(e);
      },
      _$add: function (e) {
        if (e) {
          if (e.tagName || 'number' != typeof e.length || e === window) e = [e];
          E._merge(this, e, function (e) {
            if (!m(e)) return !1;
            var t = E._$uid(e);
            if (this._signs[t]) return !1;
            else {
              this._signs[t] = 1;
              return !0;
            }
          });
          return this;
        }
      },
      _$get: function (e, t) {
        if ('number' != typeof e) return E._toArray(this);
        else return t ? E(this[e]) : this[e];
      },
      _$last: function (e) {
        return e ? E(this[this.length - 1]) : this[this.length - 1];
      },
      _$first: function (e) {
        return e ? E(this[0]) : this[0];
      },
      _$matches: function (e) {
        return E._$matches(this[0], e);
      },
      _$parent: C('parentNode'),
      _$prev: C('previousSibling'),
      _$next: C('nextSibling'),
      _$children: function (e, t) {
        var i = E([]);
        if ('boolean' == typeof e) {
          t = e;
          e = null;
        }
        this._$forEach(function (n) {
          var o = t ? a._$all(e || '*', n) : e ? E(n.childNodes)._$filter(e) : E(n.childNodes);
          i._$add(o);
        });
        return i;
      },
      _$siblings: function (e) {
        return this._$prev(e, !0)._$add(this._$next(e, !0));
      },
      _$insert: function (e, t) {
        t = (t && t.toLowerCase()) || 'bottom';
        if (!$.insertor[t]) t = 'bottom';
        var i = E(e)[0],
          n = $.insertor[t];
        if (!i) throw Error('The Element to be inserted is not exist');
        return this._$forEach(function (e, t) {
          n(e, 0 === t ? i : E._$cloneNode(i, !0));
        });
      },
      _$insert2: function (e, t) {
        E(e)._$insert(this, t);
        return this;
      },
      _$clone: function (e) {
        return this._$map(function (t) {
          return E._$cloneNode(t, e);
        });
      },
      _$text: function (e) {
        if (void 0 === e) {
          if (!this[0]) throw Error('内部节点为空，无法完成get操作');
          return this[0][h];
        }
        return this._$forEach(function (t) {
          t[h] = e;
        });
      },
      _$html: function (e) {
        if (void 0 === e) {
          if (!this[0]) throw Error('内部节点为空，无法完成get操作');
          return this[0].innerHTML;
        }
        return this._$forEach(function (t) {
          t.innerHTML = e;
        });
      },
      _$val: function (e) {
        if (void 0 === e) {
          if (!this[0]) throw Error('内部节点为空，无法完成get操作');
          return this[0].value;
        }
        return this._$forEach(function (t) {
          t.value = e;
        });
      },
      _delegate: function (t, i, n) {
        i = E._cleanSelector(i);
        return this._$forEach(function (a) {
          var o = E._$uid(a),
            s = E._delegateHandlers[o] || (E._delegateHandlers[o] = {}),
            r = s[t] || (s[t] = {}),
            c = r[i] || (r[i] = []);
          var d = function (e) {
            var t;
            if ((t = u(i, e.target || e.srcElement, a))) n.apply(t, arguments);
          };
          d._raw = n;
          c.push(d);
          e._$addEvent(a, t, d);
        });
      },
      _undelegate: function (t, i, n) {
        i = E._cleanSelector(i);
        return this._$forEach(function (a) {
          var o = E._$uid(a);
          var s, r, c;
          if ((s = E._delegateHandlers[o]) && (r = s[t]) && (c = r[i])) {
            for (var d = c.length; d--;) {
              var _ = c[d];
              if (!n || _._raw === n) {
                e._$delEvent(a, t, _);
                c.splice(d, 1);
              }
            }
            if (!c.length) delete r[i];
          }
        });
      },
      _$on: function (t, i, n) {
        if (void 0 === t) throw Error('缺少事件名参数');
        if ('function' == typeof i) {
          n = i;
          i = null;
        }
        var a = t.indexOf(' ');
        if (~a) {
          i = t.slice(a + 1);
          t = t.slice(0, a);
        }
        if (!n) throw Error('缺少回调函数');
        else {
          var o = n;
          var n = function (e) {
            $.fixture.event(e);
            o.apply(this, arguments);
          };
          o.real = n;
        }
        if (i) return this._delegate(t, i, n);
        else
          return this._$forEach(function (i) {
            e._$addEvent(i, t, n);
          });
      }
        .splitProcess()
        .autoSet(),
      _$off: function (t, i, n) {
        if ('function' == typeof i) {
          n = i;
          i = null;
        }
        var a;
        if (t && ~(a = t.indexOf(' '))) {
          i = t.slice(a + 1);
          t = t.slice(0, a);
        }
        if (n) n = n.real || n;
        if (i) return this._undelegate(t, i, n);
        else
          return this._$forEach(function (i) {
            var a = E._$uid(i),
              o = E._delegateHandlers[a],
              s;
            if (!t) {
              if (o) delete E._delegateHandlers[a];
              e._$clearEvent(i, t);
            } else {
              if (o) s = o[t];
              if (!n) {
                if (s) delete o[t];
                e._$clearEvent(i, t);
              } else e._$delEvent(i, t, n);
            }
          });
      }
        .splitProcess()
        .autoSet(),
      _$trigger: function (t, i) {
        if ('string' != typeof t) throw Error('事件类型参数错误');
        this._$forEach(function (n) {
          e._$dispatchEvent(n, t, i);
        });
        return this;
      }
        .splitProcess()
        .autoSet(),
      splice: function () {
        throw Error("don't use the NodeList#splice");
      },
    });
    g.reset();
    if (!0) nej.$ = E;
    return E;
  },
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  'd37bb207915efdc94c2f2a74d479b6f5',
  'a69495f924ee77d68e73892ffff2437c',
);
