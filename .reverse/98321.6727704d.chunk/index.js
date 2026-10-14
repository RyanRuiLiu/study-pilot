(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [98321],
  {
    877569: () => {},
    349072: () => {},
    998321: (t, e, n) => {
      'use strict';
      (n.r(e), n.d(e, { a: () => x, animated: () => x }));
      var s = n(405343),
        i = {};
      for (const t in s) ['default', 'a', 'animated'].indexOf(t) < 0 && (i[t] = () => s[t]);
      n.d(e, i);
      var r = n(440961),
        o = n(191448),
        a = n(731939);
      function u(t, e) {
        if (null == t) return {};
        var n,
          s,
          i = {},
          r = Object.keys(t);
        for (s = 0; s < r.length; s++) ((n = r[s]), e.indexOf(n) >= 0 || (i[n] = t[n]));
        return i;
      }
      const l = ['style', 'children', 'scrollTop', 'scrollLeft'],
        c = /^--/;
      function d(t, e) {
        return null == e || 'boolean' == typeof e || '' === e
          ? ''
          : 'number' != typeof e || 0 === e || c.test(t) || (p.hasOwnProperty(t) && p[t])
            ? ('' + e).trim()
            : e + 'px';
      }
      const h = {};
      let p = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      };
      const f = ['Webkit', 'Ms', 'Moz', 'O'];
      p = Object.keys(p).reduce(
        (t, e) => (
          f.forEach(
            (n) => (t[((t, e) => t + e.charAt(0).toUpperCase() + e.substring(1))(n, e)] = t[e]),
          ),
          t
        ),
        p,
      );
      const m = ['x', 'y', 'z'],
        g = /^(matrix|translate|scale|rotate|skew)/,
        y = /^(translate)/,
        _ = /^(rotate|skew)/,
        v = (t, e) => (o.is.num(t) && 0 !== t ? t + e : t),
        b = (t, e) =>
          o.is.arr(t) ? t.every((t) => b(t, e)) : o.is.num(t) ? t === e : parseFloat(t) === e;
      class w extends a.$s {
        constructor(t) {
          let { x: e, y: n, z: s } = t,
            i = u(t, m);
          const r = [],
            a = [];
          ((e || n || s) &&
            (r.push([e || 0, n || 0, s || 0]),
            a.push((t) => [`translate3d(${t.map((t) => v(t, 'px')).join(',')})`, b(t, 0)])),
            (0, o.FI)(i, (t, e) => {
              if ('transform' === e) (r.push([t || '']), a.push((t) => [t, '' === t]));
              else if (g.test(e)) {
                if ((delete i[e], o.is.und(t))) return;
                const n = y.test(e) ? 'px' : _.test(e) ? 'deg' : '';
                (r.push((0, o.$r)(t)),
                  a.push(
                    'rotate3d' === e
                      ? ([t, e, s, i]) => [`rotate3d(${t},${e},${s},${v(i, n)})`, b(i, 0)]
                      : (t) => [
                          `${e}(${t.map((t) => v(t, n)).join(',')})`,
                          b(t, e.startsWith('scale') ? 1 : 0),
                        ],
                  ));
              }
            }),
            r.length && (i.transform = new k(r, a)),
            super(i));
        }
      }
      class k extends o.aq {
        constructor(t, e) {
          (super(), (this._value = null), (this.inputs = t), (this.transforms = e));
        }
        get() {
          return this._value || (this._value = this._get());
        }
        _get() {
          let t = '',
            e = !0;
          return (
            (0, o.__)(this.inputs, (n, s) => {
              const i = (0, o.oq)(n[0]),
                [r, a] = this.transforms[s](o.is.arr(i) ? i : n.map(o.oq));
              ((t += ' ' + r), (e = e && a));
            }),
            e ? 'none' : t
          );
        }
        observerAdded(t) {
          1 == t &&
            (0, o.__)(this.inputs, (t) => (0, o.__)(t, (t) => (0, o.at)(t) && (0, o.Ec)(t, this)));
        }
        observerRemoved(t) {
          0 == t &&
            (0, o.__)(this.inputs, (t) => (0, o.__)(t, (t) => (0, o.at)(t) && (0, o.DV)(t, this)));
        }
        eventObserved(t) {
          ('change' == t.type && (this._value = null), (0, o.MI)(this, t));
        }
      }
      const S = ['scrollTop', 'scrollLeft'];
      s.Globals.assign({
        batchedUpdates: r.unstable_batchedUpdates,
        createStringInterpolator: o.Rs,
        colors: o.Tj,
      });
      const x = (0, a.De)(
        [
          'a',
          'abbr',
          'address',
          'area',
          'article',
          'aside',
          'audio',
          'b',
          'base',
          'bdi',
          'bdo',
          'big',
          'blockquote',
          'body',
          'br',
          'button',
          'canvas',
          'caption',
          'cite',
          'code',
          'col',
          'colgroup',
          'data',
          'datalist',
          'dd',
          'del',
          'details',
          'dfn',
          'dialog',
          'div',
          'dl',
          'dt',
          'em',
          'embed',
          'fieldset',
          'figcaption',
          'figure',
          'footer',
          'form',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'head',
          'header',
          'hgroup',
          'hr',
          'html',
          'i',
          'iframe',
          'img',
          'input',
          'ins',
          'kbd',
          'keygen',
          'label',
          'legend',
          'li',
          'link',
          'main',
          'map',
          'mark',
          'menu',
          'menuitem',
          'meta',
          'meter',
          'nav',
          'noscript',
          'object',
          'ol',
          'optgroup',
          'option',
          'output',
          'p',
          'param',
          'picture',
          'pre',
          'progress',
          'q',
          'rp',
          'rt',
          'ruby',
          's',
          'samp',
          'script',
          'section',
          'select',
          'small',
          'source',
          'span',
          'strong',
          'style',
          'sub',
          'summary',
          'sup',
          'table',
          'tbody',
          'td',
          'textarea',
          'tfoot',
          'th',
          'thead',
          'time',
          'title',
          'tr',
          'track',
          'u',
          'ul',
          'var',
          'video',
          'wbr',
          'circle',
          'clipPath',
          'defs',
          'ellipse',
          'foreignObject',
          'g',
          'image',
          'line',
          'linearGradient',
          'mask',
          'path',
          'pattern',
          'polygon',
          'polyline',
          'radialGradient',
          'rect',
          'stop',
          'svg',
          'text',
          'tspan',
        ],
        {
          applyAnimatedValues: function (t, e) {
            if (!t.nodeType || !t.setAttribute) return !1;
            const n =
                'filter' === t.nodeName || (t.parentNode && 'filter' === t.parentNode.nodeName),
              s = e,
              { style: i, children: r, scrollTop: o, scrollLeft: a } = s,
              p = u(s, l),
              f = Object.values(p),
              m = Object.keys(p).map((e) =>
                n || t.hasAttribute(e)
                  ? e
                  : h[e] || (h[e] = e.replace(/([A-Z])/g, (t) => '-' + t.toLowerCase())),
              );
            void 0 !== r && (t.textContent = r);
            for (let e in i)
              if (i.hasOwnProperty(e)) {
                const n = d(e, i[e]);
                c.test(e) ? t.style.setProperty(e, n) : (t.style[e] = n);
              }
            (m.forEach((e, n) => {
              t.setAttribute(e, f[n]);
            }),
              void 0 !== o && (t.scrollTop = o),
              void 0 !== a && (t.scrollLeft = a));
          },
          createAnimatedStyle: (t) => new w(t),
          getComponentProps: (t) => u(t, S),
        },
      ).animated;
    },
    731939: (t, e, n) => {
      'use strict';
      n.d(e, {
        $s: () => p,
        Ao: () => o,
        De: () => w,
        SJ: () => g,
        nm: () => u,
        pS: () => d,
        rf: () => c,
        uX: () => a,
      });
      var s = n(191448),
        i = n(296540);
      const r = Symbol.for('Animated:node'),
        o = (t) => t && t[r],
        a = (t, e) => (0, s.OX)(t, r, e),
        u = (t) => t && t[r] && t[r].getPayload();
      class l {
        constructor() {
          ((this.payload = void 0), a(this, this));
        }
        getPayload() {
          return this.payload || [];
        }
      }
      class c extends l {
        constructor(t) {
          (super(),
            (this.done = !0),
            (this.elapsedTime = void 0),
            (this.lastPosition = void 0),
            (this.lastVelocity = void 0),
            (this.v0 = void 0),
            (this.durationProgress = 0),
            (this._value = t),
            s.is.num(this._value) && (this.lastPosition = this._value));
        }
        static create(t) {
          return new c(t);
        }
        getPayload() {
          return [this];
        }
        getValue() {
          return this._value;
        }
        setValue(t, e) {
          return (
            s.is.num(t) &&
              ((this.lastPosition = t),
              e && ((t = Math.round(t / e) * e), this.done && (this.lastPosition = t))),
            this._value !== t && ((this._value = t), !0)
          );
        }
        reset() {
          const { done: t } = this;
          ((this.done = !1),
            s.is.num(this._value) &&
              ((this.elapsedTime = 0),
              (this.durationProgress = 0),
              (this.lastPosition = this._value),
              t && (this.lastVelocity = null),
              (this.v0 = null)));
        }
      }
      class d extends c {
        constructor(t) {
          (super(0),
            (this._string = null),
            (this._toString = void 0),
            (this._toString = (0, s.kx)({ output: [t, t] })));
        }
        static create(t) {
          return new d(t);
        }
        getValue() {
          return this._string ?? (this._string = this._toString(this._value));
        }
        setValue(t) {
          if (s.is.str(t)) {
            if (t == this._string) return !1;
            ((this._string = t), (this._value = 1));
          } else {
            if (!super.setValue(t)) return !1;
            this._string = null;
          }
          return !0;
        }
        reset(t) {
          (t && (this._toString = (0, s.kx)({ output: [this.getValue(), t] })),
            (this._value = 0),
            super.reset());
        }
      }
      const h = { dependencies: null };
      class p extends l {
        constructor(t) {
          (super(), (this.source = t), this.setValue(t));
        }
        getValue(t) {
          const e = {};
          return (
            (0, s.FI)(this.source, (n, i) => {
              var o;
              (o = n) && o[r] === o
                ? (e[i] = n.getValue(t))
                : (0, s.at)(n)
                  ? (e[i] = (0, s.oq)(n))
                  : t || (e[i] = n);
            }),
            e
          );
        }
        setValue(t) {
          ((this.source = t), (this.payload = this._makePayload(t)));
        }
        reset() {
          this.payload && (0, s.__)(this.payload, (t) => t.reset());
        }
        _makePayload(t) {
          if (t) {
            const e = new Set();
            return ((0, s.FI)(t, this._addToPayload, e), Array.from(e));
          }
        }
        _addToPayload(t) {
          h.dependencies && (0, s.at)(t) && h.dependencies.add(t);
          const e = u(t);
          e && (0, s.__)(e, (t) => this.add(t));
        }
      }
      class f extends p {
        constructor(t) {
          super(t);
        }
        static create(t) {
          return new f(t);
        }
        getValue() {
          return this.source.map((t) => t.getValue());
        }
        setValue(t) {
          const e = this.getPayload();
          return t.length == e.length
            ? e.map((e, n) => e.setValue(t[n])).some(Boolean)
            : (super.setValue(t.map(m)), !0);
        }
      }
      function m(t) {
        return ((0, s.$7)(t) ? d : c).create(t);
      }
      function g(t) {
        const e = o(t);
        return e ? e.constructor : s.is.arr(t) ? f : (0, s.$7)(t) ? d : c;
      }
      function y() {
        return (
          (y =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
              }
              return t;
            }),
          y.apply(this, arguments)
        );
      }
      const _ = (t, e) => {
        const n = !s.is.fun(t) || (t.prototype && t.prototype.isReactComponent);
        return (0, i.forwardRef)((r, o) => {
          const a = (0, i.useRef)(null),
            u =
              n &&
              (0, i.useCallback)(
                (t) => {
                  a.current = (function (t, e) {
                    return (t && (s.is.fun(t) ? t(e) : (t.current = e)), e);
                  })(o, t);
                },
                [o],
              ),
            [l, c] = (function (t, e) {
              const n = new Set();
              return (
                (h.dependencies = n),
                t.style && (t = y({}, t, { style: e.createAnimatedStyle(t.style) })),
                (t = new p(t)),
                (h.dependencies = null),
                [t, n]
              );
            })(r, e),
            d = (0, s.CH)(),
            f = () => {
              const t = a.current;
              (n && !t) || (!1 === (!!t && e.applyAnimatedValues(t, l.getValue(!0))) && d());
            },
            m = new v(f, c),
            g = (0, i.useRef)();
          ((0, s.Nf)(() => {
            const t = g.current;
            ((g.current = m),
              (0, s.__)(c, (t) => (0, s.Ec)(t, m)),
              t && ((0, s.__)(t.deps, (e) => (0, s.DV)(e, t)), s.er.cancel(t.update)));
          }),
            (0, i.useEffect)(f, []),
            (0, s.H5)(() => () => {
              const t = g.current;
              (0, s.__)(t.deps, (e) => (0, s.DV)(e, t));
            }));
          const _ = e.getComponentProps(l.getValue());
          return i.createElement(t, y({}, _, { ref: u }));
        });
      };
      class v {
        constructor(t, e) {
          ((this.update = t), (this.deps = e));
        }
        eventObserved(t) {
          'change' == t.type && s.er.write(this.update);
        }
      }
      const b = Symbol.for('AnimatedComponent'),
        w = (
          t,
          {
            applyAnimatedValues: e = () => !1,
            createAnimatedStyle: n = (t) => new p(t),
            getComponentProps: i = (t) => t,
          } = {},
        ) => {
          const r = { applyAnimatedValues: e, createAnimatedStyle: n, getComponentProps: i },
            o = (t) => {
              const e = k(t) || 'Anonymous';
              return (
                ((t = s.is.str(t)
                  ? o[t] || (o[t] = _(t, r))
                  : t[b] || (t[b] = _(t, r))).displayName = `Animated(${e})`),
                t
              );
            };
          return (
            (0, s.FI)(t, (e, n) => {
              (s.is.arr(t) && (n = k(e)), (o[n] = o(e)));
            }),
            { animated: o }
          );
        },
        k = (t) =>
          s.is.str(t)
            ? t
            : t && s.is.str(t.displayName)
              ? t.displayName
              : (s.is.fun(t) && t.name) || null;
    },
    405343: (t, e, n) => {
      'use strict';
      (n.r(e),
        n.d(e, {
          BailSignal: () => F,
          Controller: () => ot,
          FrameValue: () => Q,
          Globals: () => s.RV,
          Interpolation: () => $t,
          Spring: () => Ct,
          SpringContext: () => gt,
          SpringRef: () => bt,
          SpringValue: () => J,
          Trail: () => Ot,
          Transition: () => qt,
          config: () => P,
          createInterpolator: () => s.kx,
          inferTo: () => _,
          interpolate: () => zt,
          to: () => Nt,
          update: () => Ut,
          useChain: () => x,
          useSpring: () => kt,
          useSpringRef: () => xt,
          useSprings: () => wt,
          useTrail: () => Pt,
          useTransition: () => Vt,
        }));
      var s = n(191448),
        i = n(296540),
        r = n(731939),
        o = n(877569),
        a = {};
      for (const t in o)
        [
          'default',
          'Globals',
          'createInterpolator',
          'BailSignal',
          'Controller',
          'FrameValue',
          'Interpolation',
          'Spring',
          'SpringContext',
          'SpringRef',
          'SpringValue',
          'Trail',
          'Transition',
          'config',
          'inferTo',
          'interpolate',
          'to',
          'update',
          'useChain',
          'useSpring',
          'useSpringRef',
          'useSprings',
          'useTrail',
          'useTransition',
        ].indexOf(t) < 0 && (a[t] = () => o[t]);
      n.d(e, a);
      var u = n(349072);
      a = {};
      for (const t in u)
        [
          'default',
          'Globals',
          'createInterpolator',
          'BailSignal',
          'Controller',
          'FrameValue',
          'Interpolation',
          'Spring',
          'SpringContext',
          'SpringRef',
          'SpringValue',
          'Trail',
          'Transition',
          'config',
          'inferTo',
          'interpolate',
          'to',
          'update',
          'useChain',
          'useSpring',
          'useSpringRef',
          'useSprings',
          'useTrail',
          'useTransition',
        ].indexOf(t) < 0 && (a[t] = () => u[t]);
      function l() {
        return (
          (l =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
              }
              return t;
            }),
          l.apply(this, arguments)
        );
      }
      function c(t, ...e) {
        return s.is.fun(t) ? t(...e) : t;
      }
      n.d(e, a);
      const d = (t, e) => !0 === t || !!(e && t && (s.is.fun(t) ? t(e) : (0, s.$r)(t).includes(e))),
        h = (t, e) => (s.is.obj(t) ? e && t[e] : t),
        p = (t, e) => (!0 === t.default ? t[e] : t.default ? t.default[e] : void 0),
        f = (t) => t,
        m = (t, e = f) => {
          let n = g;
          t.default && !0 !== t.default && ((t = t.default), (n = Object.keys(t)));
          const i = {};
          for (const r of n) {
            const n = e(t[r], r);
            s.is.und(n) || (i[r] = n);
          }
          return i;
        },
        g = ['config', 'onProps', 'onStart', 'onChange', 'onPause', 'onResume', 'onRest'],
        y = {
          config: 1,
          from: 1,
          to: 1,
          ref: 1,
          loop: 1,
          reset: 1,
          pause: 1,
          cancel: 1,
          reverse: 1,
          immediate: 1,
          default: 1,
          delay: 1,
          onProps: 1,
          onStart: 1,
          onChange: 1,
          onPause: 1,
          onResume: 1,
          onRest: 1,
          onResolve: 1,
          items: 1,
          trail: 1,
          sort: 1,
          expires: 1,
          initial: 1,
          enter: 1,
          update: 1,
          leave: 1,
          children: 1,
          onDestroyed: 1,
          keys: 1,
          callId: 1,
          parentId: 1,
        };
      function _(t) {
        const e = (function (t) {
          const e = {};
          let n = 0;
          if (
            ((0, s.FI)(t, (t, s) => {
              y[s] || ((e[s] = t), n++);
            }),
            n)
          )
            return e;
        })(t);
        if (e) {
          const n = { to: e };
          return ((0, s.FI)(t, (t, s) => s in e || (n[s] = t)), n);
        }
        return l({}, t);
      }
      function v(t) {
        return (
          (t = (0, s.oq)(t)),
          s.is.arr(t)
            ? t.map(v)
            : (0, s.$7)(t)
              ? s.RV.createStringInterpolator({ range: [0, 1], output: [t, t] })(1)
              : t
        );
      }
      function b(t) {
        for (const e in t) return !0;
        return !1;
      }
      function w(t) {
        return s.is.fun(t) || (s.is.arr(t) && s.is.obj(t[0]));
      }
      function k(t, e) {
        var n;
        (null == (n = t.ref) || n.delete(t), null == e || e.delete(t));
      }
      function S(t, e) {
        var n;
        e && t.ref !== e && (null == (n = t.ref) || n.delete(t), e.add(t), (t.ref = e));
      }
      function x(t, e, n = 1e3) {
        (0, s.Nf)(() => {
          if (e) {
            let i = 0;
            (0, s.__)(t, (t, r) => {
              const o = t.current;
              if (o.length) {
                let t = n * e[r];
                (isNaN(t) ? (t = i) : (i = t),
                  (0, s.__)(o, (e) => {
                    ((0, s.__)(e.queue, (e) => {
                      const n = e.delay;
                      e.delay = (e) => t + c(n || 0, e);
                    }),
                      e.start());
                  }));
              }
            });
          } else {
            let e = Promise.resolve();
            (0, s.__)(t, (t) => {
              const n = t.current;
              if (n.length) {
                const i = n.map((t) => {
                  const e = t.queue;
                  return ((t.queue = []), e);
                });
                e = e.then(
                  () => (
                    (0, s.__)(n, (t, e) => (0, s.__)(i[e] || [], (e) => t.queue.push(e))),
                    Promise.all(t.start())
                  ),
                );
              }
            });
          }
        });
      }
      const P = {
          default: { tension: 170, friction: 26 },
          gentle: { tension: 120, friction: 14 },
          wobbly: { tension: 180, friction: 12 },
          stiff: { tension: 210, friction: 20 },
          slow: { tension: 280, friction: 60 },
          molasses: { tension: 280, friction: 120 },
        },
        A = l({}, P.default, { mass: 1, damping: 1, easing: (t) => t, clamp: !1 });
      class V {
        constructor() {
          ((this.tension = void 0),
            (this.friction = void 0),
            (this.frequency = void 0),
            (this.damping = void 0),
            (this.mass = void 0),
            (this.velocity = 0),
            (this.restVelocity = void 0),
            (this.precision = void 0),
            (this.progress = void 0),
            (this.duration = void 0),
            (this.easing = void 0),
            (this.clamp = void 0),
            (this.bounce = void 0),
            (this.decay = void 0),
            (this.round = void 0),
            Object.assign(this, A));
        }
      }
      function I(t, e) {
        if (s.is.und(e.decay)) {
          const n = !s.is.und(e.tension) || !s.is.und(e.friction);
          ((!n && s.is.und(e.frequency) && s.is.und(e.damping) && s.is.und(e.mass)) ||
            ((t.duration = void 0), (t.decay = void 0)),
            n && (t.frequency = void 0));
        } else t.duration = void 0;
      }
      const R = [];
      class C {
        constructor() {
          ((this.changed = !1),
            (this.values = R),
            (this.toValues = null),
            (this.fromValues = R),
            (this.to = void 0),
            (this.from = void 0),
            (this.config = new V()),
            (this.immediate = !1));
        }
      }
      function E(t, { key: e, props: n, defaultProps: i, state: r, actions: o }) {
        return new Promise((a, u) => {
          var h;
          let p,
            f,
            m = d(null != (h = n.cancel) ? h : null == i ? void 0 : i.cancel, e);
          if (m) _();
          else {
            s.is.und(n.pause) || (r.paused = d(n.pause, e));
            let t = null == i ? void 0 : i.pause;
            (!0 !== t && (t = r.paused || d(t, e)),
              (p = c(n.delay || 0, e)),
              t ? (r.resumeQueue.add(y), o.pause()) : (o.resume(), y()));
          }
          function g() {
            (r.resumeQueue.add(y), r.timeouts.delete(f), f.cancel(), (p = f.time - s.er.now()));
          }
          function y() {
            p > 0 && !s.RV.skipAnimation
              ? ((f = s.er.setTimeout(_, p)), r.pauseQueue.add(g), r.timeouts.add(f))
              : _();
          }
          function _() {
            (r.pauseQueue.delete(g), r.timeouts.delete(f), t <= (r.cancelId || 0) && (m = !0));
            try {
              o.start(l({}, n, { callId: t, cancel: m }), a);
            } catch (t) {
              u(t);
            }
          }
        });
      }
      const O = (t, e) =>
          1 == e.length
            ? e[0]
            : e.some((t) => t.cancelled)
              ? $(t.get())
              : e.every((t) => t.noop)
                ? T(t.get())
                : q(
                    t.get(),
                    e.every((t) => t.finished),
                  ),
        T = (t) => ({ value: t, noop: !0, finished: !0, cancelled: !1 }),
        q = (t, e, n = !1) => ({ value: t, finished: e, cancelled: n }),
        $ = (t) => ({ value: t, cancelled: !0, finished: !1 });
      function j(t, e, n, i) {
        const { callId: r, parentId: o, onRest: a } = e,
          { asyncTo: u, promise: c } = n;
        return o || t !== u || e.reset
          ? (n.promise = (async () => {
              ((n.asyncId = r), (n.asyncTo = t));
              const d = m(e, (t, e) => ('onRest' === e ? void 0 : t));
              let h, p;
              const f = new Promise((t, e) => ((h = t), (p = e))),
                g = (t) => {
                  const e = (r <= (n.cancelId || 0) && $(i)) || (r !== n.asyncId && q(i, !1));
                  if (e) throw ((t.result = e), p(t), t);
                },
                y = (t, e) => {
                  const o = new F(),
                    a = new N();
                  return (async () => {
                    if (s.RV.skipAnimation) throw (M(n), (a.result = q(i, !1)), p(a), a);
                    g(o);
                    const u = s.is.obj(t) ? l({}, t) : l({}, e, { to: t });
                    ((u.parentId = r),
                      (0, s.FI)(d, (t, e) => {
                        s.is.und(u[e]) && (u[e] = t);
                      }));
                    const c = await i.start(u);
                    return (
                      g(o),
                      n.paused &&
                        (await new Promise((t) => {
                          n.resumeQueue.add(t);
                        })),
                      c
                    );
                  })();
                };
              let _;
              if (s.RV.skipAnimation) return (M(n), q(i, !1));
              try {
                let e;
                ((e = s.is.arr(t)
                  ? (async (t) => {
                      for (const e of t) await y(e);
                    })(t)
                  : Promise.resolve(t(y, i.stop.bind(i)))),
                  await Promise.all([e.then(h), f]),
                  (_ = q(i.get(), !0, !1)));
              } catch (t) {
                if (t instanceof F) _ = t.result;
                else {
                  if (!(t instanceof N)) throw t;
                  _ = t.result;
                }
              } finally {
                r == n.asyncId &&
                  ((n.asyncId = o), (n.asyncTo = o ? u : void 0), (n.promise = o ? c : void 0));
              }
              return (
                s.is.fun(a) &&
                  s.er.batchedUpdates(() => {
                    a(_, i, i.item);
                  }),
                _
              );
            })())
          : c;
      }
      function M(t, e) {
        ((0, s.bX)(t.timeouts, (t) => t.cancel()),
          t.pauseQueue.clear(),
          t.resumeQueue.clear(),
          (t.asyncId = t.asyncTo = t.promise = void 0),
          e && (t.cancelId = e));
      }
      class F extends Error {
        constructor() {
          (super(
            'An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.',
          ),
            (this.result = void 0));
        }
      }
      class N extends Error {
        constructor() {
          (super('SkipAnimationSignal'), (this.result = void 0));
        }
      }
      const z = (t) => t instanceof Q;
      let U = 1;
      class Q extends s.aq {
        constructor(...t) {
          (super(...t), (this.id = U++), (this.key = void 0), (this._priority = 0));
        }
        get priority() {
          return this._priority;
        }
        set priority(t) {
          this._priority != t && ((this._priority = t), this._onPriorityChange(t));
        }
        get() {
          const t = (0, r.Ao)(this);
          return t && t.getValue();
        }
        to(...t) {
          return s.RV.to(this, t);
        }
        interpolate(...t) {
          return ((0, s.ZJ)(), s.RV.to(this, t));
        }
        toJSON() {
          return this.get();
        }
        observerAdded(t) {
          1 == t && this._attach();
        }
        observerRemoved(t) {
          0 == t && this._detach();
        }
        _attach() {}
        _detach() {}
        _onChange(t, e = !1) {
          (0, s.MI)(this, { type: 'change', parent: this, value: t, idle: e });
        }
        _onPriorityChange(t) {
          (this.idle || s.WU.sort(this),
            (0, s.MI)(this, { type: 'priority', parent: this, priority: t }));
        }
      }
      const D = Symbol.for('SpringPhase'),
        L = (t) => (1 & t[D]) > 0,
        W = (t) => (2 & t[D]) > 0,
        X = (t) => (4 & t[D]) > 0,
        H = (t, e) => (e ? (t[D] |= 3) : (t[D] &= -3)),
        G = (t, e) => (e ? (t[D] |= 4) : (t[D] &= -5));
      class J extends Q {
        constructor(t, e) {
          if (
            (super(),
            (this.key = void 0),
            (this.animation = new C()),
            (this.queue = void 0),
            (this.defaultProps = {}),
            (this._state = {
              paused: !1,
              pauseQueue: new Set(),
              resumeQueue: new Set(),
              timeouts: new Set(),
            }),
            (this._pendingCalls = new Set()),
            (this._lastCallId = 0),
            (this._lastToId = 0),
            (this._memoizedDuration = 0),
            !s.is.und(t) || !s.is.und(e))
          ) {
            const n = s.is.obj(t) ? l({}, t) : l({}, e, { from: t });
            (s.is.und(n.default) && (n.default = !0), this.start(n));
          }
        }
        get idle() {
          return !(W(this) || this._state.asyncTo) || X(this);
        }
        get goal() {
          return (0, s.oq)(this.animation.to);
        }
        get velocity() {
          const t = (0, r.Ao)(this);
          return t instanceof r.rf
            ? t.lastVelocity || 0
            : t.getPayload().map((t) => t.lastVelocity || 0);
        }
        get hasAnimated() {
          return L(this);
        }
        get isAnimating() {
          return W(this);
        }
        get isPaused() {
          return X(this);
        }
        advance(t) {
          let e = !0,
            n = !1;
          const i = this.animation;
          let { config: o, toValues: a } = i;
          const u = (0, r.nm)(i.to);
          (!u && (0, s.at)(i.to) && (a = (0, s.$r)((0, s.oq)(i.to))),
            i.values.forEach((l, c) => {
              if (l.done) return;
              const d = l.constructor == r.pS ? 1 : u ? u[c].lastPosition : a[c];
              let h = i.immediate,
                p = d;
              if (!h) {
                if (((p = l.lastPosition), o.tension <= 0)) return void (l.done = !0);
                let e = (l.elapsedTime += t);
                const n = i.fromValues[c],
                  r =
                    null != l.v0
                      ? l.v0
                      : (l.v0 = s.is.arr(o.velocity) ? o.velocity[c] : o.velocity);
                let a;
                if (s.is.und(o.duration))
                  if (o.decay) {
                    const t = !0 === o.decay ? 0.998 : o.decay,
                      s = Math.exp(-(1 - t) * e);
                    ((p = n + (r / (1 - t)) * (1 - s)),
                      (h = Math.abs(l.lastPosition - p) < 0.1),
                      (a = r * s));
                  } else {
                    a = null == l.lastVelocity ? r : l.lastVelocity;
                    const e =
                        o.precision || (n == d ? 0.005 : Math.min(1, 0.001 * Math.abs(d - n))),
                      i = o.restVelocity || e / 10,
                      u = o.clamp ? 0 : o.bounce,
                      c = !s.is.und(u),
                      f = n == d ? l.v0 > 0 : n < d;
                    let m,
                      g = !1;
                    const y = 1,
                      _ = Math.ceil(t / y);
                    for (
                      let t = 0;
                      t < _ && ((m = Math.abs(a) > i), m || ((h = Math.abs(d - p) <= e), !h));
                      ++t
                    )
                      (c && ((g = p == d || p > d == f), g && ((a = -a * u), (p = d))),
                        (a +=
                          ((1e-6 * -o.tension * (p - d) + 0.001 * -o.friction * a) / o.mass) * y),
                        (p += a * y));
                  }
                else {
                  let s = 1;
                  (o.duration > 0 &&
                    (this._memoizedDuration !== o.duration &&
                      ((this._memoizedDuration = o.duration),
                      l.durationProgress > 0 &&
                        ((l.elapsedTime = o.duration * l.durationProgress),
                        (e = l.elapsedTime += t))),
                    (s = (o.progress || 0) + e / this._memoizedDuration),
                    (s = s > 1 ? 1 : s < 0 ? 0 : s),
                    (l.durationProgress = s)),
                    (p = n + o.easing(s) * (d - n)),
                    (a = (p - l.lastPosition) / t),
                    (h = 1 == s));
                }
                ((l.lastVelocity = a),
                  Number.isNaN(p) && (console.warn('Got NaN while animating:', this), (h = !0)));
              }
              (u && !u[c].done && (h = !1),
                h ? (l.done = !0) : (e = !1),
                l.setValue(p, o.round) && (n = !0));
            }));
          const l = (0, r.Ao)(this),
            c = l.getValue();
          if (e) {
            const t = (0, s.oq)(i.to);
            ((c === t && !n) || o.decay
              ? n && o.decay && this._onChange(c)
              : (l.setValue(t), this._onChange(t)),
              this._stop());
          } else n && this._onChange(c);
        }
        set(t) {
          return (
            s.er.batchedUpdates(() => {
              (this._stop(), this._focus(t), this._set(t));
            }),
            this
          );
        }
        pause() {
          this._update({ pause: !0 });
        }
        resume() {
          this._update({ pause: !1 });
        }
        finish() {
          if (W(this)) {
            const { to: t, config: e } = this.animation;
            s.er.batchedUpdates(() => {
              (this._onStart(), e.decay || this._set(t, !1), this._stop());
            });
          }
          return this;
        }
        update(t) {
          return ((this.queue || (this.queue = [])).push(t), this);
        }
        start(t, e) {
          let n;
          return (
            s.is.und(t)
              ? ((n = this.queue || []), (this.queue = []))
              : (n = [s.is.obj(t) ? t : l({}, e, { to: t })]),
            Promise.all(n.map((t) => this._update(t))).then((t) => O(this, t))
          );
        }
        stop(t) {
          const { to: e } = this.animation;
          return (
            this._focus(this.get()),
            M(this._state, t && this._lastCallId),
            s.er.batchedUpdates(() => this._stop(e, t)),
            this
          );
        }
        reset() {
          this._update({ reset: !0 });
        }
        eventObserved(t) {
          'change' == t.type
            ? this._start()
            : 'priority' == t.type && (this.priority = t.priority + 1);
        }
        _prepareNode(t) {
          const e = this.key || '';
          let { to: n, from: i } = t;
          ((n = s.is.obj(n) ? n[e] : n),
            (null == n || w(n)) && (n = void 0),
            (i = s.is.obj(i) ? i[e] : i),
            null == i && (i = void 0));
          const o = { to: n, from: i };
          return (
            L(this) ||
              (t.reverse && ([n, i] = [i, n]),
              (i = (0, s.oq)(i)),
              s.is.und(i) ? (0, r.Ao)(this) || this._set(n) : this._set(i)),
            o
          );
        }
        _update(t, e) {
          let n = l({}, t);
          const { key: i, defaultProps: r } = this;
          (n.default &&
            Object.assign(
              r,
              m(n, (t, e) => (/^on/.test(e) ? h(t, i) : t)),
            ),
            nt(this, n, 'onProps'),
            st(this, 'onProps', n, this));
          const o = this._prepareNode(n);
          if (Object.isFrozen(this))
            throw Error(
              'Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?',
            );
          const a = this._state;
          return E(++this._lastCallId, {
            key: i,
            props: n,
            defaultProps: r,
            state: a,
            actions: {
              pause: () => {
                X(this) ||
                  (G(this, !0),
                  (0, s.Wd)(a.pauseQueue),
                  st(this, 'onPause', q(this, B(this, this.animation.to)), this));
              },
              resume: () => {
                X(this) &&
                  (G(this, !1),
                  W(this) && this._resume(),
                  (0, s.Wd)(a.resumeQueue),
                  st(this, 'onResume', q(this, B(this, this.animation.to)), this));
              },
              start: this._merge.bind(this, o),
            },
          }).then((t) => {
            if (n.loop && t.finished && (!e || !t.noop)) {
              const t = Z(n);
              if (t) return this._update(t, !0);
            }
            return t;
          });
        }
        _merge(t, e, n) {
          if (e.cancel) return (this.stop(!0), n($(this)));
          const i = !s.is.und(t.to),
            o = !s.is.und(t.from);
          if (i || o) {
            if (!(e.callId > this._lastToId)) return n($(this));
            this._lastToId = e.callId;
          }
          const { key: a, defaultProps: u, animation: h } = this,
            { to: p, from: f } = h;
          let { to: m = p, from: g = f } = t;
          (!o || i || (e.default && !s.is.und(m)) || (m = g), e.reverse && ([m, g] = [g, m]));
          const y = !(0, s.n4)(g, f);
          (y && (h.from = g), (g = (0, s.oq)(g)));
          const _ = !(0, s.n4)(m, p);
          _ && this._focus(m);
          const b = w(e.to),
            { config: k } = h,
            { decay: S, velocity: x } = k;
          ((i || o) && (k.velocity = 0),
            e.config &&
              !b &&
              (function (t, e, n) {
                (n && (I((n = l({}, n)), e), (e = l({}, n, e))), I(t, e), Object.assign(t, e));
                for (const e in A) null == t[e] && (t[e] = A[e]);
                let { mass: i, frequency: r, damping: o } = t;
                s.is.und(r) ||
                  (r < 0.01 && (r = 0.01),
                  o < 0 && (o = 0),
                  (t.tension = Math.pow((2 * Math.PI) / r, 2) * i),
                  (t.friction = (4 * Math.PI * o * i) / r));
              })(k, c(e.config, a), e.config !== u.config ? c(u.config, a) : void 0));
          let P = (0, r.Ao)(this);
          if (!P || s.is.und(m)) return n(q(this, !0));
          const V = s.is.und(e.reset) ? o && !e.default : !s.is.und(g) && d(e.reset, a),
            R = V ? g : this.get(),
            C = v(m),
            E = s.is.num(C) || s.is.arr(C) || (0, s.$7)(C),
            O = !b && (!E || d(u.immediate || e.immediate, a));
          if (_) {
            const t = (0, r.SJ)(m);
            if (t !== P.constructor) {
              if (!O)
                throw Error(
                  `Cannot animate between ${P.constructor.name} and ${t.name}, as the "to" prop suggests`,
                );
              P = this._set(C);
            }
          }
          const M = P.constructor;
          let F = (0, s.at)(m),
            N = !1;
          if (!F) {
            const t = V || (!L(this) && y);
            ((_ || t) && ((N = (0, s.n4)(v(R), C)), (F = !N)),
              (((0, s.n4)(h.immediate, O) || O) &&
                (0, s.n4)(k.decay, S) &&
                (0, s.n4)(k.velocity, x)) ||
                (F = !0));
          }
          if (
            (N && W(this) && (h.changed && !V ? (F = !0) : F || this._stop(p)),
            !b &&
              ((F || (0, s.at)(p)) &&
                ((h.values = P.getPayload()),
                (h.toValues = (0, s.at)(m) ? null : M == r.pS ? [1] : (0, s.$r)(C))),
              h.immediate != O && ((h.immediate = O), O || V || this._set(p)),
              F))
          ) {
            const { onRest: t } = h;
            (0, s.__)(et, (t) => nt(this, e, t));
            const i = q(this, B(this, p));
            ((0, s.Wd)(this._pendingCalls, i),
              this._pendingCalls.add(n),
              h.changed &&
                s.er.batchedUpdates(() => {
                  ((h.changed = !V),
                    null == t || t(i, this),
                    V ? c(u.onRest, i) : null == h.onStart || h.onStart(i, this));
                }));
          }
          (V && this._set(R),
            b
              ? n(j(e.to, e, this._state, this))
              : F
                ? this._start()
                : W(this) && !_
                  ? this._pendingCalls.add(n)
                  : n(T(R)));
        }
        _focus(t) {
          const e = this.animation;
          t !== e.to &&
            ((0, s.Wg)(this) && this._detach(), (e.to = t), (0, s.Wg)(this) && this._attach());
        }
        _attach() {
          let t = 0;
          const { to: e } = this.animation;
          ((0, s.at)(e) && ((0, s.Ec)(e, this), z(e) && (t = e.priority + 1)), (this.priority = t));
        }
        _detach() {
          const { to: t } = this.animation;
          (0, s.at)(t) && (0, s.DV)(t, this);
        }
        _set(t, e = !0) {
          const n = (0, s.oq)(t);
          if (!s.is.und(n)) {
            const t = (0, r.Ao)(this);
            if (!t || !(0, s.n4)(n, t.getValue())) {
              const i = (0, r.SJ)(n);
              (t && t.constructor == i ? t.setValue(n) : (0, r.uX)(this, i.create(n)),
                t &&
                  s.er.batchedUpdates(() => {
                    this._onChange(n, e);
                  }));
            }
          }
          return (0, r.Ao)(this);
        }
        _onStart() {
          const t = this.animation;
          t.changed || ((t.changed = !0), st(this, 'onStart', q(this, B(this, t.to)), this));
        }
        _onChange(t, e) {
          (e || (this._onStart(), c(this.animation.onChange, t, this)),
            c(this.defaultProps.onChange, t, this),
            super._onChange(t, e));
        }
        _start() {
          const t = this.animation;
          ((0, r.Ao)(this).reset((0, s.oq)(t.to)),
            t.immediate || (t.fromValues = t.values.map((t) => t.lastPosition)),
            W(this) || (H(this, !0), X(this) || this._resume()));
        }
        _resume() {
          s.RV.skipAnimation ? this.finish() : s.WU.start(this);
        }
        _stop(t, e) {
          if (W(this)) {
            H(this, !1);
            const n = this.animation;
            ((0, s.__)(n.values, (t) => {
              t.done = !0;
            }),
              n.toValues && (n.onChange = n.onPause = n.onResume = void 0),
              (0, s.MI)(this, { type: 'idle', parent: this }));
            const i = e ? $(this.get()) : q(this.get(), B(this, null != t ? t : n.to));
            ((0, s.Wd)(this._pendingCalls, i),
              n.changed && ((n.changed = !1), st(this, 'onRest', i, this)));
          }
        }
      }
      function B(t, e) {
        const n = v(e),
          i = v(t.get());
        return (0, s.n4)(i, n);
      }
      function Z(t, e = t.loop, n = t.to) {
        let s = c(e);
        if (s) {
          const i = !0 !== s && _(s),
            r = (i || t).reverse,
            o = !i || i.reset;
          return Y(
            l(
              {},
              t,
              {
                loop: e,
                default: !1,
                pause: void 0,
                to: !r || w(n) ? n : void 0,
                from: o ? t.from : void 0,
                reset: o,
              },
              i,
            ),
          );
        }
      }
      function Y(t) {
        const { to: e, from: n } = (t = _(t)),
          i = new Set();
        return (
          s.is.obj(e) && tt(e, i),
          s.is.obj(n) && tt(n, i),
          (t.keys = i.size ? Array.from(i) : null),
          t
        );
      }
      function K(t) {
        const e = Y(t);
        return (s.is.und(e.default) && (e.default = m(e)), e);
      }
      function tt(t, e) {
        (0, s.FI)(t, (t, n) => null != t && e.add(n));
      }
      const et = ['onStart', 'onRest', 'onChange', 'onPause', 'onResume'];
      function nt(t, e, n) {
        t.animation[n] = e[n] !== p(e, n) ? h(e[n], t.key) : void 0;
      }
      function st(t, e, ...n) {
        var s, i, r, o;
        (null == (s = (i = t.animation)[e]) || s.call(i, ...n),
          null == (r = (o = t.defaultProps)[e]) || r.call(o, ...n));
      }
      const it = ['onStart', 'onChange', 'onRest'];
      let rt = 1;
      class ot {
        constructor(t, e) {
          ((this.id = rt++),
            (this.springs = {}),
            (this.queue = []),
            (this.ref = void 0),
            (this._flush = void 0),
            (this._initialProps = void 0),
            (this._lastAsyncId = 0),
            (this._active = new Set()),
            (this._changed = new Set()),
            (this._started = !1),
            (this._item = void 0),
            (this._state = {
              paused: !1,
              pauseQueue: new Set(),
              resumeQueue: new Set(),
              timeouts: new Set(),
            }),
            (this._events = { onStart: new Map(), onChange: new Map(), onRest: new Map() }),
            (this._onFrame = this._onFrame.bind(this)),
            e && (this._flush = e),
            t && this.start(l({ default: !0 }, t)));
        }
        get idle() {
          return !this._state.asyncTo && Object.values(this.springs).every((t) => t.idle);
        }
        get item() {
          return this._item;
        }
        set item(t) {
          this._item = t;
        }
        get() {
          const t = {};
          return (this.each((e, n) => (t[n] = e.get())), t);
        }
        set(t) {
          for (const e in t) {
            const n = t[e];
            s.is.und(n) || this.springs[e].set(n);
          }
        }
        update(t) {
          return (t && this.queue.push(Y(t)), this);
        }
        start(t) {
          let { queue: e } = this;
          return (
            t ? (e = (0, s.$r)(t).map(Y)) : (this.queue = []),
            this._flush ? this._flush(this, e) : (pt(this, e), at(this, e))
          );
        }
        stop(t, e) {
          if ((t !== !!t && (e = t), e)) {
            const n = this.springs;
            (0, s.__)((0, s.$r)(e), (e) => n[e].stop(!!t));
          } else (M(this._state, this._lastAsyncId), this.each((e) => e.stop(!!t)));
          return this;
        }
        pause(t) {
          if (s.is.und(t)) this.start({ pause: !0 });
          else {
            const e = this.springs;
            (0, s.__)((0, s.$r)(t), (t) => e[t].pause());
          }
          return this;
        }
        resume(t) {
          if (s.is.und(t)) this.start({ pause: !1 });
          else {
            const e = this.springs;
            (0, s.__)((0, s.$r)(t), (t) => e[t].resume());
          }
          return this;
        }
        each(t) {
          (0, s.FI)(this.springs, t);
        }
        _onFrame() {
          const { onStart: t, onChange: e, onRest: n } = this._events,
            i = this._active.size > 0,
            r = this._changed.size > 0;
          ((i && !this._started) || (r && !this._started)) &&
            ((this._started = !0),
            (0, s.bX)(t, ([t, e]) => {
              ((e.value = this.get()), t(e, this, this._item));
            }));
          const o = !i && this._started,
            a = r || (o && n.size) ? this.get() : null;
          (r &&
            e.size &&
            (0, s.bX)(e, ([t, e]) => {
              ((e.value = a), t(e, this, this._item));
            }),
            o &&
              ((this._started = !1),
              (0, s.bX)(n, ([t, e]) => {
                ((e.value = a), t(e, this, this._item));
              })));
        }
        eventObserved(t) {
          if ('change' == t.type)
            (this._changed.add(t.parent), t.idle || this._active.add(t.parent));
          else {
            if ('idle' != t.type) return;
            this._active.delete(t.parent);
          }
          s.er.onFrame(this._onFrame);
        }
      }
      function at(t, e) {
        return Promise.all(e.map((e) => ut(t, e))).then((e) => O(t, e));
      }
      async function ut(t, e, n) {
        const { keys: i, to: r, from: o, loop: a, onRest: u, onResolve: l } = e,
          c = s.is.obj(e.default) && e.default;
        (a && (e.loop = !1), !1 === r && (e.to = null), !1 === o && (e.from = null));
        const d = s.is.arr(r) || s.is.fun(r) ? r : void 0;
        d
          ? ((e.to = void 0), (e.onRest = void 0), c && (c.onRest = void 0))
          : (0, s.__)(it, (n) => {
              const i = e[n];
              if (s.is.fun(i)) {
                const s = t._events[n];
                ((e[n] = ({ finished: t, cancelled: e }) => {
                  const n = s.get(i);
                  n
                    ? (t || (n.finished = !1), e && (n.cancelled = !0))
                    : s.set(i, { value: null, finished: t || !1, cancelled: e || !1 });
                }),
                  c && (c[n] = e[n]));
              }
            });
        const h = t._state;
        e.pause === !h.paused
          ? ((h.paused = e.pause), (0, s.Wd)(e.pause ? h.pauseQueue : h.resumeQueue))
          : h.paused && (e.pause = !0);
        const f = (i || Object.keys(t.springs)).map((n) => t.springs[n].start(e)),
          m = !0 === e.cancel || !0 === p(e, 'cancel');
        ((d || (m && h.asyncId)) &&
          f.push(
            E(++t._lastAsyncId, {
              props: e,
              state: h,
              actions: {
                pause: s.lQ,
                resume: s.lQ,
                start(e, n) {
                  m ? (M(h, t._lastAsyncId), n($(t))) : ((e.onRest = u), n(j(d, e, h, t)));
                },
              },
            }),
          ),
          h.paused &&
            (await new Promise((t) => {
              h.resumeQueue.add(t);
            })));
        const g = O(t, await Promise.all(f));
        if (a && g.finished && (!n || !g.noop)) {
          const n = Z(e, a, r);
          if (n) return (pt(t, [n]), ut(t, n, !0));
        }
        return (l && s.er.batchedUpdates(() => l(g, t, t.item)), g);
      }
      function lt(t, e) {
        const n = l({}, t.springs);
        return (
          e &&
            (0, s.__)((0, s.$r)(e), (t) => {
              (s.is.und(t.keys) && (t = Y(t)),
                s.is.obj(t.to) || (t = l({}, t, { to: void 0 })),
                ht(n, t, (t) => dt(t)));
            }),
          ct(t, n),
          n
        );
      }
      function ct(t, e) {
        (0, s.FI)(e, (e, n) => {
          t.springs[n] || ((t.springs[n] = e), (0, s.Ec)(e, t));
        });
      }
      function dt(t, e) {
        const n = new J();
        return ((n.key = t), e && (0, s.Ec)(n, e), n);
      }
      function ht(t, e, n) {
        e.keys &&
          (0, s.__)(e.keys, (s) => {
            (t[s] || (t[s] = n(s)))._prepareNode(e);
          });
      }
      function pt(t, e) {
        (0, s.__)(e, (e) => {
          ht(t.springs, e, (e) => dt(e, t));
        });
      }
      function ft(t, e) {
        if (null == t) return {};
        var n,
          s,
          i = {},
          r = Object.keys(t);
        for (s = 0; s < r.length; s++) ((n = r[s]), e.indexOf(n) >= 0 || (i[n] = t[n]));
        return i;
      }
      const mt = ['children'],
        gt = (t) => {
          let { children: e } = t,
            n = ft(t, mt);
          const r = (0, i.useContext)(yt),
            o = n.pause || !!r.pause,
            a = n.immediate || !!r.immediate;
          n = (0, s.MA)(() => ({ pause: o, immediate: a }), [o, a]);
          const { Provider: u } = yt;
          return i.createElement(u, { value: n }, e);
        },
        yt =
          ((_t = gt),
          (vt = {}),
          Object.assign(_t, i.createContext(vt)),
          (_t.Provider._context = _t),
          (_t.Consumer._context = _t),
          _t);
      var _t, vt;
      ((gt.Provider = yt.Provider), (gt.Consumer = yt.Consumer));
      const bt = () => {
        const t = [],
          e = function (e) {
            (0, s.HX)();
            const i = [];
            return (
              (0, s.__)(t, (t, r) => {
                if (s.is.und(e)) i.push(t.start());
                else {
                  const s = n(e, t, r);
                  s && i.push(t.start(s));
                }
              }),
              i
            );
          };
        ((e.current = t),
          (e.add = function (e) {
            t.includes(e) || t.push(e);
          }),
          (e.delete = function (e) {
            const n = t.indexOf(e);
            ~n && t.splice(n, 1);
          }),
          (e.pause = function () {
            return ((0, s.__)(t, (t) => t.pause(...arguments)), this);
          }),
          (e.resume = function () {
            return ((0, s.__)(t, (t) => t.resume(...arguments)), this);
          }),
          (e.set = function (e) {
            (0, s.__)(t, (t) => t.set(e));
          }),
          (e.start = function (e) {
            const n = [];
            return (
              (0, s.__)(t, (t, i) => {
                if (s.is.und(e)) n.push(t.start());
                else {
                  const s = this._getProps(e, t, i);
                  s && n.push(t.start(s));
                }
              }),
              n
            );
          }),
          (e.stop = function () {
            return ((0, s.__)(t, (t) => t.stop(...arguments)), this);
          }),
          (e.update = function (e) {
            return ((0, s.__)(t, (t, n) => t.update(this._getProps(e, t, n))), this);
          }));
        const n = function (t, e, n) {
          return s.is.fun(t) ? t(n, e) : t;
        };
        return ((e._getProps = n), e);
      };
      function wt(t, e, n) {
        const r = s.is.fun(e) && e;
        r && !n && (n = []);
        const o = (0, i.useMemo)(() => (r || 3 == arguments.length ? bt() : void 0), []),
          a = (0, i.useRef)(0),
          u = (0, s.CH)(),
          c = (0, i.useMemo)(
            () => ({
              ctrls: [],
              queue: [],
              flush(t, e) {
                const n = lt(t, e);
                return a.current > 0 &&
                  !c.queue.length &&
                  !Object.keys(n).some((e) => !t.springs[e])
                  ? at(t, e)
                  : new Promise((s) => {
                      (ct(t, n),
                        c.queue.push(() => {
                          s(at(t, e));
                        }),
                        u());
                    });
              },
            }),
            [],
          ),
          d = (0, i.useRef)([...c.ctrls]),
          h = [],
          p = (0, s.NQ)(t) || 0;
        function f(t, n) {
          for (let s = t; s < n; s++) {
            const t = d.current[s] || (d.current[s] = new ot(null, c.flush)),
              n = r ? r(s, t) : e[s];
            n && (h[s] = K(n));
          }
        }
        ((0, i.useMemo)(() => {
          ((0, s.__)(d.current.slice(t, p), (t) => {
            (k(t, o), t.stop(!0));
          }),
            (d.current.length = t),
            f(p, t));
        }, [t]),
          (0, i.useMemo)(() => {
            f(0, Math.min(p, t));
          }, n));
        const m = d.current.map((t, e) => lt(t, h[e])),
          g = (0, i.useContext)(gt),
          y = (0, s.NQ)(g),
          _ = g !== y && b(g);
        ((0, s.Nf)(() => {
          (a.current++, (c.ctrls = d.current));
          const { queue: t } = c;
          (t.length && ((c.queue = []), (0, s.__)(t, (t) => t())),
            (0, s.__)(d.current, (t, e) => {
              (null == o || o.add(t), _ && t.start({ default: g }));
              const n = h[e];
              n && (S(t, n.ref), t.ref ? t.queue.push(n) : t.start(n));
            }));
        }),
          (0, s.H5)(() => () => {
            (0, s.__)(c.ctrls, (t) => t.stop(!0));
          }));
        const v = m.map((t) => l({}, t));
        return o ? [v, o] : v;
      }
      function kt(t, e) {
        const n = s.is.fun(t),
          [[i], r] = wt(1, n ? t : [t], n ? e || [] : e);
        return n || 2 == arguments.length ? [i, r] : i;
      }
      const St = () => bt(),
        xt = () => (0, i.useState)(St)[0];
      function Pt(t, e, n) {
        const i = s.is.fun(e) && e;
        i && !n && (n = []);
        let r = !0;
        const o = wt(
            t,
            (t, n) => {
              const s = i ? i(t, n) : e;
              return ((r = r && s.reverse), s);
            },
            n || [{}],
          ),
          a = o[1];
        return (
          (0, s.Nf)(() => {
            (0, s.__)(a.current, (t, e) => {
              const n = a.current[e + (r ? 1 : -1)];
              n && t.start({ to: n.springs });
            });
          }, n),
          i || 3 == arguments.length
            ? ((a._getProps = (t, e, n) => {
                const i = s.is.fun(t) ? t(n, e) : t;
                if (i) {
                  const t = a.current[n + (i.reverse ? 1 : -1)];
                  return (t && (i.to = t.springs), i);
                }
              }),
              o)
            : o[0]
        );
      }
      let At;
      function Vt(t, e, n) {
        const r = s.is.fun(e) && e,
          {
            reset: o,
            sort: a,
            trail: u = 0,
            expires: d = !0,
            onDestroyed: h,
            ref: p,
            config: f,
          } = r ? r() : e,
          g = (0, i.useMemo)(() => (r || 3 == arguments.length ? bt() : void 0), []),
          y = (0, s.$r)(t),
          v = [],
          w = (0, i.useRef)(null),
          x = o ? null : w.current;
        ((0, s.Nf)(() => {
          w.current = v;
        }),
          (0, s.H5)(
            () => () =>
              (0, s.__)(w.current, (t) => {
                (t.expired && clearTimeout(t.expirationId), k(t.ctrl, g), t.ctrl.stop(!0));
              }),
          ));
        const P = (function (t, { key: e, keys: n = e }, i) {
            if (null === n) {
              const e = new Set();
              return t.map((t) => {
                const n = i && i.find((n) => n.item === t && n.phase !== At.LEAVE && !e.has(n));
                return n ? (e.add(n), n.key) : It++;
              });
            }
            return s.is.und(n) ? t : s.is.fun(n) ? t.map(n) : (0, s.$r)(n);
          })(y, r ? r() : e, x),
          A = (o && w.current) || [];
        (0, s.Nf)(() =>
          (0, s.__)(A, ({ ctrl: t, item: e, key: n }) => {
            (k(t, g), c(h, e, n));
          }),
        );
        const V = [];
        if (
          (x &&
            (0, s.__)(x, (t, e) => {
              t.expired
                ? (clearTimeout(t.expirationId), A.push(t))
                : ~(e = V[e] = P.indexOf(t.key)) && (v[e] = t);
            }),
          (0, s.__)(y, (t, e) => {
            v[e] ||
              ((v[e] = { key: P[e], item: t, phase: At.MOUNT, ctrl: new ot() }),
              (v[e].ctrl.item = t));
          }),
          V.length)
        ) {
          let t = -1;
          const { leave: n } = r ? r() : e;
          (0, s.__)(V, (e, s) => {
            const i = x[s];
            ~e ? ((t = v.indexOf(i)), (v[t] = l({}, i, { item: y[e] }))) : n && v.splice(++t, 0, i);
          });
        }
        s.is.fun(a) && v.sort((t, e) => a(t.item, e.item));
        let I = -u;
        const R = (0, s.CH)(),
          C = m(e),
          E = new Map();
        (0, s.__)(v, (t, n) => {
          const i = t.key,
            o = t.phase,
            a = r ? r() : e;
          let h,
            m,
            g = c(a.delay || 0, i);
          if (o == At.MOUNT) ((h = a.enter), (m = At.ENTER));
          else {
            const t = P.indexOf(i) < 0;
            if (o != At.LEAVE)
              if (t) ((h = a.leave), (m = At.LEAVE));
              else {
                if (!(h = a.update)) return;
                m = At.UPDATE;
              }
            else {
              if (t) return;
              ((h = a.enter), (m = At.ENTER));
            }
          }
          if (((h = c(h, t.item, n)), (h = s.is.obj(h) ? _(h) : { to: h }), !h.config)) {
            const e = f || C.config;
            h.config = c(e, t.item, n, m);
          }
          I += u;
          const y = l({}, C, { delay: g + I, ref: p, immediate: a.immediate, reset: !1 }, h);
          if (m == At.ENTER && s.is.und(y.from)) {
            const i = r ? r() : e,
              o = s.is.und(i.initial) || x ? i.from : i.initial;
            y.from = c(o, t.item, n);
          }
          const { onResolve: v } = y;
          y.onResolve = (t) => {
            c(v, t);
            const e = w.current,
              n = e.find((t) => t.key === i);
            if (n && (!t.cancelled || n.phase == At.UPDATE) && n.ctrl.idle) {
              const t = e.every((t) => t.ctrl.idle);
              if (n.phase == At.LEAVE) {
                const e = c(d, n.item);
                if (!1 !== e) {
                  const s = !0 === e ? 0 : e;
                  if (((n.expired = !0), !t && s > 0))
                    return void (s <= 2147483647 && (n.expirationId = setTimeout(R, s)));
                }
              }
              t && e.some((t) => t.expired) && R();
            }
          };
          const b = lt(t.ctrl, y);
          E.set(t, { phase: m, springs: b, payload: y });
        });
        const O = (0, i.useContext)(gt),
          T = (0, s.NQ)(O),
          q = O !== T && b(O);
        ((0, s.Nf)(() => {
          q &&
            (0, s.__)(v, (t) => {
              t.ctrl.start({ default: O });
            });
        }, [O]),
          (0, s.Nf)(
            () => {
              (0, s.__)(E, ({ phase: t, payload: e }, n) => {
                const { ctrl: s } = n;
                ((n.phase = t),
                  null == g || g.add(s),
                  q && t == At.ENTER && s.start({ default: O }),
                  e && (S(s, e.ref), s.ref ? s.update(e) : s.start(e)));
              });
            },
            o ? void 0 : n,
          ));
        const $ = (t) =>
          i.createElement(
            i.Fragment,
            null,
            v.map((e, n) => {
              const { springs: r } = E.get(e) || e.ctrl,
                o = t(l({}, r), e.item, e, n);
              return o && o.type
                ? i.createElement(
                    o.type,
                    l({}, o.props, {
                      key: s.is.str(e.key) || s.is.num(e.key) ? e.key : e.ctrl.id,
                      ref: o.ref,
                    }),
                  )
                : o;
            }),
          );
        return g ? [$, g] : $;
      }
      !(function (t) {
        ((t.MOUNT = 'mount'), (t.ENTER = 'enter'), (t.UPDATE = 'update'), (t.LEAVE = 'leave'));
      })(At || (At = {}));
      let It = 1;
      const Rt = ['children'];
      function Ct(t) {
        let { children: e } = t;
        return e(kt(ft(t, Rt)));
      }
      const Et = ['items', 'children'];
      function Ot(t) {
        let { items: e, children: n } = t,
          i = ft(t, Et);
        const r = Pt(e.length, i);
        return e.map((t, e) => {
          const i = n(t, e);
          return s.is.fun(i) ? i(r[e]) : i;
        });
      }
      const Tt = ['items', 'children'];
      function qt(t) {
        let { items: e, children: n } = t;
        return Vt(e, ft(t, Tt))(n);
      }
      class $t extends Q {
        constructor(t, e) {
          (super(),
            (this.key = void 0),
            (this.idle = !0),
            (this.calc = void 0),
            (this._active = new Set()),
            (this.source = t),
            (this.calc = (0, s.kx)(...e)));
          const n = this._get(),
            i = (0, r.SJ)(n);
          (0, r.uX)(this, i.create(n));
        }
        advance(t) {
          const e = this._get(),
            n = this.get();
          ((0, s.n4)(e, n) || ((0, r.Ao)(this).setValue(e), this._onChange(e, this.idle)),
            !this.idle && Mt(this._active) && Ft(this));
        }
        _get() {
          const t = s.is.arr(this.source)
            ? this.source.map(s.oq)
            : (0, s.$r)((0, s.oq)(this.source));
          return this.calc(...t);
        }
        _start() {
          this.idle &&
            !Mt(this._active) &&
            ((this.idle = !1),
            (0, s.__)((0, r.nm)(this), (t) => {
              t.done = !1;
            }),
            s.RV.skipAnimation
              ? (s.er.batchedUpdates(() => this.advance()), Ft(this))
              : s.WU.start(this));
        }
        _attach() {
          let t = 1;
          ((0, s.__)((0, s.$r)(this.source), (e) => {
            ((0, s.at)(e) && (0, s.Ec)(e, this),
              z(e) && (e.idle || this._active.add(e), (t = Math.max(t, e.priority + 1))));
          }),
            (this.priority = t),
            this._start());
        }
        _detach() {
          ((0, s.__)((0, s.$r)(this.source), (t) => {
            (0, s.at)(t) && (0, s.DV)(t, this);
          }),
            this._active.clear(),
            Ft(this));
        }
        eventObserved(t) {
          'change' == t.type
            ? t.idle
              ? this.advance()
              : (this._active.add(t.parent), this._start())
            : 'idle' == t.type
              ? this._active.delete(t.parent)
              : 'priority' == t.type &&
                (this.priority = (0, s.$r)(this.source).reduce(
                  (t, e) => Math.max(t, (z(e) ? e.priority : 0) + 1),
                  0,
                ));
        }
      }
      function jt(t) {
        return !1 !== t.idle;
      }
      function Mt(t) {
        return !t.size || Array.from(t).every(jt);
      }
      function Ft(t) {
        t.idle ||
          ((t.idle = !0),
          (0, s.__)((0, r.nm)(t), (t) => {
            t.done = !0;
          }),
          (0, s.MI)(t, { type: 'idle', parent: t }));
      }
      const Nt = (t, ...e) => new $t(t, e),
        zt = (t, ...e) => ((0, s.ZJ)(), new $t(t, e));
      s.RV.assign({ createStringInterpolator: s.Rs, to: (t, e) => new $t(t, e) });
      const Ut = s.WU.advance;
    },
    191448: (t, e, n) => {
      'use strict';
      n.d(e, {
        aq: () => vt,
        RV: () => j,
        Ec: () => wt,
        MI: () => _t,
        Tj: () => X,
        kx: () => dt,
        Rs: () => Ct,
        OX: () => S,
        HX: () => jt,
        ZJ: () => qt,
        __: () => A,
        FI: () => V,
        bX: () => R,
        Wd: () => C,
        WU: () => U,
        Wg: () => yt,
        oq: () => gt,
        at: () => mt,
        is: () => x,
        $7: () => Mt,
        n4: () => P,
        lQ: () => k,
        er: () => i,
        DV: () => kt,
        $r: () => I,
        CH: () => zt,
        Nf: () => Lt,
        MA: () => Qt,
        H5: () => Ft,
        NQ: () => Dt,
      });
      let s = _();
      const i = (t) => f(t, s);
      let r = _();
      i.write = (t) => f(t, r);
      let o = _();
      i.onStart = (t) => f(t, o);
      let a = _();
      i.onFrame = (t) => f(t, a);
      let u = _();
      i.onFinish = (t) => f(t, u);
      let l = [];
      i.setTimeout = (t, e) => {
        let n = i.now() + e,
          s = () => {
            let t = l.findIndex((t) => t.cancel == s);
            (~t && l.splice(t, 1), (b.count -= ~t ? 1 : 0));
          },
          r = { time: n, handler: t, cancel: s };
        return (l.splice(c(n), 0, r), (b.count += 1), m(), r);
      };
      let c = (t) => ~(~l.findIndex((e) => e.time > t) || ~l.length);
      ((i.cancel = (t) => {
        (s.delete(t), r.delete(t));
      }),
        (i.sync = (t) => {
          ((p = !0), i.batchedUpdates(t), (p = !1));
        }),
        (i.throttle = (t) => {
          let e;
          function n() {
            try {
              t(...e);
            } finally {
              e = null;
            }
          }
          function s(...t) {
            ((e = t), i.onStart(n));
          }
          return (
            (s.handler = t),
            (s.cancel = () => {
              (o.delete(n), (e = null));
            }),
            s
          );
        }));
      let d = 'undefined' != typeof window ? window.requestAnimationFrame : () => {};
      ((i.use = (t) => (d = t)),
        (i.now = 'undefined' != typeof performance ? () => performance.now() : Date.now),
        (i.batchedUpdates = (t) => t()),
        (i.catch = console.error),
        (i.frameLoop = 'always'),
        (i.advance = () => {
          'demand' !== i.frameLoop
            ? console.warn(
                'Cannot call the manual advancement of rafz whilst frameLoop is not set as demand',
              )
            : y();
        }));
      let h = -1,
        p = !1;
      function f(t, e) {
        p ? (e.delete(t), t(0)) : (e.add(t), m());
      }
      function m() {
        h < 0 && ((h = 0), 'demand' !== i.frameLoop && d(g));
      }
      function g() {
        ~h && (d(g), i.batchedUpdates(y));
      }
      function y() {
        let t = h;
        h = i.now();
        let e = c(h);
        (e && (v(l.splice(0, e), (t) => t.handler()), (b.count -= e)),
          o.flush(),
          s.flush(t ? Math.min(64, h - t) : 16.667),
          a.flush(),
          r.flush(),
          u.flush());
      }
      function _() {
        let t = new Set(),
          e = t;
        return {
          add(n) {
            ((b.count += e != t || t.has(n) ? 0 : 1), t.add(n));
          },
          delete: (n) => ((b.count -= e == t && t.has(n) ? 1 : 0), t.delete(n)),
          flush(n) {
            e.size &&
              ((t = new Set()),
              (b.count -= e.size),
              v(e, (e) => e(n) && t.add(e)),
              (b.count += t.size),
              (e = t));
          },
        };
      }
      function v(t, e) {
        t.forEach((t) => {
          try {
            e(t);
          } catch (t) {
            i.catch(t);
          }
        });
      }
      const b = {
        count: 0,
        clear() {
          ((h = -1),
            (l = []),
            (o = _()),
            (s = _()),
            (a = _()),
            (r = _()),
            (u = _()),
            (b.count = 0));
        },
      };
      var w = n(296540);
      function k() {}
      const S = (t, e, n) =>
          Object.defineProperty(t, e, { value: n, writable: !0, configurable: !0 }),
        x = {
          arr: Array.isArray,
          obj: (t) => !!t && 'Object' === t.constructor.name,
          fun: (t) => 'function' == typeof t,
          str: (t) => 'string' == typeof t,
          num: (t) => 'number' == typeof t,
          und: (t) => void 0 === t,
        };
      function P(t, e) {
        if (x.arr(t)) {
          if (!x.arr(e) || t.length !== e.length) return !1;
          for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return !1;
          return !0;
        }
        return t === e;
      }
      const A = (t, e) => t.forEach(e);
      function V(t, e, n) {
        if (x.arr(t)) for (let s = 0; s < t.length; s++) e.call(n, t[s], `${s}`);
        else for (const s in t) t.hasOwnProperty(s) && e.call(n, t[s], s);
      }
      const I = (t) => (x.und(t) ? [] : x.arr(t) ? t : [t]);
      function R(t, e) {
        if (t.size) {
          const n = Array.from(t);
          (t.clear(), A(n, e));
        }
      }
      const C = (t, ...e) => R(t, (t) => t(...e));
      let E,
        O,
        T = null,
        q = !1,
        $ = k;
      var j = Object.freeze({
        __proto__: null,
        get createStringInterpolator() {
          return E;
        },
        get to() {
          return O;
        },
        get colors() {
          return T;
        },
        get skipAnimation() {
          return q;
        },
        get willAdvance() {
          return $;
        },
        assign: (t) => {
          (t.to && (O = t.to),
            t.now && (i.now = t.now),
            void 0 !== t.colors && (T = t.colors),
            null != t.skipAnimation && (q = t.skipAnimation),
            t.createStringInterpolator && (E = t.createStringInterpolator),
            t.requestAnimationFrame && i.use(t.requestAnimationFrame),
            t.batchedUpdates && (i.batchedUpdates = t.batchedUpdates),
            t.willAdvance && ($ = t.willAdvance),
            t.frameLoop && (i.frameLoop = t.frameLoop));
        },
      });
      const M = new Set();
      let F = [],
        N = [],
        z = 0;
      const U = {
        get idle() {
          return !M.size && !F.length;
        },
        start(t) {
          z > t.priority ? (M.add(t), i.onStart(Q)) : (D(t), i(W));
        },
        advance: W,
        sort(t) {
          if (z) i.onFrame(() => U.sort(t));
          else {
            const e = F.indexOf(t);
            ~e && (F.splice(e, 1), L(t));
          }
        },
        clear() {
          ((F = []), M.clear());
        },
      };
      function Q() {
        (M.forEach(D), M.clear(), i(W));
      }
      function D(t) {
        F.includes(t) || L(t);
      }
      function L(t) {
        F.splice(
          (function (e) {
            const n = e.findIndex((e) => e.priority > t.priority);
            return n < 0 ? e.length : n;
          })(F),
          0,
          t,
        );
      }
      function W(t) {
        const e = N;
        for (let n = 0; n < F.length; n++) {
          const s = F[n];
          ((z = s.priority), s.idle || ($(s), s.advance(t), s.idle || e.push(s)));
        }
        return ((z = 0), (N = F), (N.length = 0), (F = e), F.length > 0);
      }
      const X = {
          transparent: 0,
          aliceblue: 4042850303,
          antiquewhite: 4209760255,
          aqua: 16777215,
          aquamarine: 2147472639,
          azure: 4043309055,
          beige: 4126530815,
          bisque: 4293182719,
          black: 255,
          blanchedalmond: 4293643775,
          blue: 65535,
          blueviolet: 2318131967,
          brown: 2771004159,
          burlywood: 3736635391,
          burntsienna: 3934150143,
          cadetblue: 1604231423,
          chartreuse: 2147418367,
          chocolate: 3530104575,
          coral: 4286533887,
          cornflowerblue: 1687547391,
          cornsilk: 4294499583,
          crimson: 3692313855,
          cyan: 16777215,
          darkblue: 35839,
          darkcyan: 9145343,
          darkgoldenrod: 3095792639,
          darkgray: 2846468607,
          darkgreen: 6553855,
          darkgrey: 2846468607,
          darkkhaki: 3182914559,
          darkmagenta: 2332068863,
          darkolivegreen: 1433087999,
          darkorange: 4287365375,
          darkorchid: 2570243327,
          darkred: 2332033279,
          darksalmon: 3918953215,
          darkseagreen: 2411499519,
          darkslateblue: 1211993087,
          darkslategray: 793726975,
          darkslategrey: 793726975,
          darkturquoise: 13554175,
          darkviolet: 2483082239,
          deeppink: 4279538687,
          deepskyblue: 12582911,
          dimgray: 1768516095,
          dimgrey: 1768516095,
          dodgerblue: 512819199,
          firebrick: 2988581631,
          floralwhite: 4294635775,
          forestgreen: 579543807,
          fuchsia: 4278255615,
          gainsboro: 3705462015,
          ghostwhite: 4177068031,
          gold: 4292280575,
          goldenrod: 3668254975,
          gray: 2155905279,
          green: 8388863,
          greenyellow: 2919182335,
          grey: 2155905279,
          honeydew: 4043305215,
          hotpink: 4285117695,
          indianred: 3445382399,
          indigo: 1258324735,
          ivory: 4294963455,
          khaki: 4041641215,
          lavender: 3873897215,
          lavenderblush: 4293981695,
          lawngreen: 2096890111,
          lemonchiffon: 4294626815,
          lightblue: 2916673279,
          lightcoral: 4034953471,
          lightcyan: 3774873599,
          lightgoldenrodyellow: 4210742015,
          lightgray: 3553874943,
          lightgreen: 2431553791,
          lightgrey: 3553874943,
          lightpink: 4290167295,
          lightsalmon: 4288707327,
          lightseagreen: 548580095,
          lightskyblue: 2278488831,
          lightslategray: 2005441023,
          lightslategrey: 2005441023,
          lightsteelblue: 2965692159,
          lightyellow: 4294959359,
          lime: 16711935,
          limegreen: 852308735,
          linen: 4210091775,
          magenta: 4278255615,
          maroon: 2147483903,
          mediumaquamarine: 1724754687,
          mediumblue: 52735,
          mediumorchid: 3126187007,
          mediumpurple: 2473647103,
          mediumseagreen: 1018393087,
          mediumslateblue: 2070474495,
          mediumspringgreen: 16423679,
          mediumturquoise: 1221709055,
          mediumvioletred: 3340076543,
          midnightblue: 421097727,
          mintcream: 4127193855,
          mistyrose: 4293190143,
          moccasin: 4293178879,
          navajowhite: 4292783615,
          navy: 33023,
          oldlace: 4260751103,
          olive: 2155872511,
          olivedrab: 1804477439,
          orange: 4289003775,
          orangered: 4282712319,
          orchid: 3664828159,
          palegoldenrod: 4008225535,
          palegreen: 2566625535,
          paleturquoise: 2951671551,
          palevioletred: 3681588223,
          papayawhip: 4293907967,
          peachpuff: 4292524543,
          peru: 3448061951,
          pink: 4290825215,
          plum: 3718307327,
          powderblue: 2967529215,
          purple: 2147516671,
          rebeccapurple: 1714657791,
          red: 4278190335,
          rosybrown: 3163525119,
          royalblue: 1097458175,
          saddlebrown: 2336560127,
          salmon: 4202722047,
          sandybrown: 4104413439,
          seagreen: 780883967,
          seashell: 4294307583,
          sienna: 2689740287,
          silver: 3233857791,
          skyblue: 2278484991,
          slateblue: 1784335871,
          slategray: 1887473919,
          slategrey: 1887473919,
          snow: 4294638335,
          springgreen: 16744447,
          steelblue: 1182971135,
          tan: 3535047935,
          teal: 8421631,
          thistle: 3636451583,
          tomato: 4284696575,
          turquoise: 1088475391,
          violet: 4001558271,
          wheat: 4125012991,
          white: 4294967295,
          whitesmoke: 4126537215,
          yellow: 4294902015,
          yellowgreen: 2597139199,
        },
        H = '[-+]?\\d*\\.?\\d+',
        G = H + '%';
      function J(...t) {
        return '\\(\\s*(' + t.join(')\\s*,\\s*(') + ')\\s*\\)';
      }
      const B = new RegExp('rgb' + J(H, H, H)),
        Z = new RegExp('rgba' + J(H, H, H, H)),
        Y = new RegExp('hsl' + J(H, G, G)),
        K = new RegExp('hsla' + J(H, G, G, H)),
        tt = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        et = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        nt = /^#([0-9a-fA-F]{6})$/,
        st = /^#([0-9a-fA-F]{8})$/;
      function it(t, e, n) {
        return (
          n < 0 && (n += 1),
          n > 1 && (n -= 1),
          n < 1 / 6
            ? t + 6 * (e - t) * n
            : n < 0.5
              ? e
              : n < 2 / 3
                ? t + (e - t) * (2 / 3 - n) * 6
                : t
        );
      }
      function rt(t, e, n) {
        const s = n < 0.5 ? n * (1 + e) : n + e - n * e,
          i = 2 * n - s,
          r = it(i, s, t + 1 / 3),
          o = it(i, s, t),
          a = it(i, s, t - 1 / 3);
        return (
          (Math.round(255 * r) << 24) | (Math.round(255 * o) << 16) | (Math.round(255 * a) << 8)
        );
      }
      function ot(t) {
        const e = parseInt(t, 10);
        return e < 0 ? 0 : e > 255 ? 255 : e;
      }
      function at(t) {
        return (((parseFloat(t) % 360) + 360) % 360) / 360;
      }
      function ut(t) {
        const e = parseFloat(t);
        return e < 0 ? 0 : e > 1 ? 255 : Math.round(255 * e);
      }
      function lt(t) {
        const e = parseFloat(t);
        return e < 0 ? 0 : e > 100 ? 1 : e / 100;
      }
      function ct(t) {
        let e = (function (t) {
          let e;
          return 'number' == typeof t
            ? t >>> 0 === t && t >= 0 && t <= 4294967295
              ? t
              : null
            : (e = nt.exec(t))
              ? parseInt(e[1] + 'ff', 16) >>> 0
              : T && void 0 !== T[t]
                ? T[t]
                : (e = B.exec(t))
                  ? ((ot(e[1]) << 24) | (ot(e[2]) << 16) | (ot(e[3]) << 8) | 255) >>> 0
                  : (e = Z.exec(t))
                    ? ((ot(e[1]) << 24) | (ot(e[2]) << 16) | (ot(e[3]) << 8) | ut(e[4])) >>> 0
                    : (e = tt.exec(t))
                      ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + 'ff', 16) >>> 0
                      : (e = st.exec(t))
                        ? parseInt(e[1], 16) >>> 0
                        : (e = et.exec(t))
                          ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>>
                            0
                          : (e = Y.exec(t))
                            ? (255 | rt(at(e[1]), lt(e[2]), lt(e[3]))) >>> 0
                            : (e = K.exec(t))
                              ? (rt(at(e[1]), lt(e[2]), lt(e[3])) | ut(e[4])) >>> 0
                              : null;
        })(t);
        return null === e
          ? t
          : ((e = e || 0),
            `rgba(${(4278190080 & e) >>> 24}, ${(16711680 & e) >>> 16}, ${(65280 & e) >>> 8}, ${(255 & e) / 255})`);
      }
      const dt = (t, e, n) => {
        if (x.fun(t)) return t;
        if (x.arr(t)) return dt({ range: t, output: e, extrapolate: n });
        if (x.str(t.output[0])) return E(t);
        const s = t,
          i = s.output,
          r = s.range || [0, 1],
          o = s.extrapolateLeft || s.extrapolate || 'extend',
          a = s.extrapolateRight || s.extrapolate || 'extend',
          u = s.easing || ((t) => t);
        return (t) => {
          const e = (function (t, e) {
            for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n);
            return n - 1;
          })(t, r);
          return (function (t, e, n, s, i, r, o, a, u) {
            let l = u ? u(t) : t;
            if (l < e) {
              if ('identity' === o) return l;
              'clamp' === o && (l = e);
            }
            if (l > n) {
              if ('identity' === a) return l;
              'clamp' === a && (l = n);
            }
            return s === i
              ? s
              : e === n
                ? t <= e
                  ? s
                  : i
                : (e === -1 / 0 ? (l = -l) : n === 1 / 0 ? (l -= e) : (l = (l - e) / (n - e)),
                  (l = r(l)),
                  s === -1 / 0 ? (l = -l) : i === 1 / 0 ? (l += s) : (l = l * (i - s) + s),
                  l);
          })(t, r[e], r[e + 1], i[e], i[e + 1], u, o, a, s.map);
        };
      };
      function ht() {
        return (
          (ht =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
              }
              return t;
            }),
          ht.apply(this, arguments)
        );
      }
      const pt = Symbol.for('FluidValue.get'),
        ft = Symbol.for('FluidValue.observers'),
        mt = (t) => Boolean(t && t[pt]),
        gt = (t) => (t && t[pt] ? t[pt]() : t),
        yt = (t) => t[ft] || null;
      function _t(t, e) {
        let n = t[ft];
        n &&
          n.forEach((t) => {
            !(function (t, e) {
              t.eventObserved ? t.eventObserved(e) : t(e);
            })(t, e);
          });
      }
      class vt {
        constructor(t) {
          if (((this[pt] = void 0), (this[ft] = void 0), !t && !(t = this.get)))
            throw Error('Unknown getter');
          bt(this, t);
        }
      }
      const bt = (t, e) => St(t, pt, e);
      function wt(t, e) {
        if (t[pt]) {
          let n = t[ft];
          (n || St(t, ft, (n = new Set())),
            n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e)));
        }
        return e;
      }
      function kt(t, e) {
        let n = t[ft];
        if (n && n.has(e)) {
          const s = n.size - 1;
          (s ? n.delete(e) : (t[ft] = null), t.observerRemoved && t.observerRemoved(s, e));
        }
      }
      const St = (t, e, n) =>
          Object.defineProperty(t, e, { value: n, writable: !0, configurable: !0 }),
        xt = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        Pt =
          /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
        At = new RegExp(`(${xt.source})(%|[a-z]+)`, 'i');
      let Vt;
      const It = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
        Rt = (t, e, n, s, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(s)}, ${i})`,
        Ct = (t) => {
          Vt || (Vt = T ? new RegExp(`(${Object.keys(T).join('|')})(?!\\w)`, 'g') : /^\b$/);
          const e = t.output.map((t) => gt(t).replace(Pt, ct).replace(Vt, ct)),
            n = e.map((t) => t.match(xt).map(Number)),
            s = n[0]
              .map((t, e) =>
                n.map((t) => {
                  if (!(e in t)) throw Error('The arity of each "output" value must be equal');
                  return t[e];
                }),
              )
              .map((e) => dt(ht({}, t, { output: e })));
          return (t) => {
            var n;
            const i =
              !At.test(e[0]) &&
              (null == (n = e.find((t) => At.test(t))) ? void 0 : n.replace(xt, ''));
            let r = 0;
            return e[0].replace(xt, () => `${s[r++](t)}${i || ''}`).replace(It, Rt);
          };
        },
        Et = 'react-spring: ',
        Ot = (t) => {
          const e = t;
          let n = !1;
          if ('function' != typeof e)
            throw new TypeError(`${Et}once requires a function parameter`);
          return (...t) => {
            n || (e(...t), (n = !0));
          };
        },
        Tt = Ot(console.warn);
      function qt() {
        Tt(`${Et}The "interpolate" function is deprecated in v9 (use "to" instead)`);
      }
      const $t = Ot(console.warn);
      function jt() {
        $t(
          `${Et}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`,
        );
      }
      function Mt(t) {
        return x.str(t) && ('#' == t[0] || /\d/.test(t) || t in (T || {}));
      }
      const Ft = (t) => (0, w.useEffect)(t, Nt),
        Nt = [];
      function zt() {
        const t = (0, w.useState)()[1],
          e = (0, w.useState)(Ut)[0];
        return (
          Ft(e.unmount),
          () => {
            e.current && t({});
          }
        );
      }
      function Ut() {
        const t = {
          current: !0,
          unmount: () => () => {
            t.current = !1;
          },
        };
        return t;
      }
      function Qt(t, e) {
        const [n] = (0, w.useState)(() => ({ inputs: e, result: t() })),
          s = (0, w.useRef)(),
          i = s.current;
        let r = i;
        return (
          r
            ? Boolean(
                e &&
                r.inputs &&
                (function (t, e) {
                  if (t.length !== e.length) return !1;
                  for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return !1;
                  return !0;
                })(e, r.inputs),
              ) || (r = { inputs: e, result: t() })
            : (r = n),
          (0, w.useEffect)(() => {
            ((s.current = r), i == n && (n.inputs = n.result = void 0));
          }, [r]),
          r.result
        );
      }
      function Dt(t) {
        const e = (0, w.useRef)();
        return (
          (0, w.useEffect)(() => {
            e.current = t;
          }),
          e.current
        );
      }
      const Lt =
        'undefined' != typeof window && window.document && window.document.createElement
          ? w.useLayoutEffect
          : w.useEffect;
    },
  },
]);
