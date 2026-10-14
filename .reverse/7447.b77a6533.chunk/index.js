'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [7447],
  {
    962454: (t, e, r) => {
      r.d(e, { A: () => b });
      var i = r(692836),
        n = r(321756),
        o = r(529308),
        a = r(757861),
        s = r(945558),
        h = r(498026),
        l = r(73098),
        u = r(747698),
        c = r(756448),
        f = '__zr_normal__',
        p = i.Wx.concat(['ignore']),
        d = (0, h.reduce)(
          i.Wx,
          function (t, e) {
            return ((t[e] = !0), t);
          },
          { ignore: !1 },
        ),
        y = {},
        v = new o.A(0, 0, 0, 0),
        g = (function () {
          function t(t) {
            ((this.id = (0, h.guid)()),
              (this.animators = []),
              (this.currentStates = []),
              (this.states = {}),
              this._init(t));
          }
          return (
            (t.prototype._init = function (t) {
              this.attr(t);
            }),
            (t.prototype.drift = function (t, e, r) {
              switch (this.draggable) {
                case 'horizontal':
                  e = 0;
                  break;
                case 'vertical':
                  t = 0;
              }
              var i = this.transform;
              (i || (i = this.transform = [1, 0, 0, 1, 0, 0]),
                (i[4] += t),
                (i[5] += e),
                this.decomposeTransform(),
                this.markRedraw());
            }),
            (t.prototype.beforeUpdate = function () {}),
            (t.prototype.afterUpdate = function () {}),
            (t.prototype.update = function () {
              (this.updateTransform(), this.__dirty && this.updateInnerText());
            }),
            (t.prototype.updateInnerText = function (t) {
              var e = this._textContent;
              if (e && (!e.ignore || t)) {
                this.textConfig || (this.textConfig = {});
                var r = this.textConfig,
                  i = r.local,
                  n = e.innerTransformable,
                  o = void 0,
                  a = void 0,
                  h = !1;
                n.parent = i ? this : null;
                var l = !1;
                if ((n.copyTransform(e), null != r.position)) {
                  var u = v;
                  (r.layoutRect ? u.copy(r.layoutRect) : u.copy(this.getBoundingRect()),
                    i || u.applyTransform(this.transform),
                    this.calculateTextPosition
                      ? this.calculateTextPosition(y, r, u)
                      : (0, s.X4)(y, r, u),
                    (n.x = y.x),
                    (n.y = y.y),
                    (o = y.align),
                    (a = y.verticalAlign));
                  var f = r.origin;
                  if (f && null != r.rotation) {
                    var p = void 0,
                      d = void 0;
                    ('center' === f
                      ? ((p = 0.5 * u.width), (d = 0.5 * u.height))
                      : ((p = (0, s.lo)(f[0], u.width)), (d = (0, s.lo)(f[1], u.height))),
                      (l = !0),
                      (n.originX = -n.x + p + (i ? 0 : u.x)),
                      (n.originY = -n.y + d + (i ? 0 : u.y)));
                  }
                }
                null != r.rotation && (n.rotation = r.rotation);
                var g = r.offset;
                g &&
                  ((n.x += g[0]), (n.y += g[1]), l || ((n.originX = -g[0]), (n.originY = -g[1])));
                var _ =
                    null == r.inside
                      ? 'string' == typeof r.position && r.position.indexOf('inside') >= 0
                      : r.inside,
                  m = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}),
                  x = void 0,
                  w = void 0,
                  b = void 0;
                (_ && this.canBeInsideText()
                  ? ((x = r.insideFill),
                    (w = r.insideStroke),
                    (null != x && 'auto' !== x) || (x = this.getInsideTextFill()),
                    (null != w && 'auto' !== w) || ((w = this.getInsideTextStroke(x)), (b = !0)))
                  : ((x = r.outsideFill),
                    (w = r.outsideStroke),
                    (null != x && 'auto' !== x) || (x = this.getOutsideFill()),
                    (null != w && 'auto' !== w) || ((w = this.getOutsideStroke(x)), (b = !0))),
                  ((x = x || '#000') === m.fill &&
                    w === m.stroke &&
                    b === m.autoStroke &&
                    o === m.align &&
                    a === m.verticalAlign) ||
                    ((h = !0),
                    (m.fill = x),
                    (m.stroke = w),
                    (m.autoStroke = b),
                    (m.align = o),
                    (m.verticalAlign = a),
                    e.setDefaultTextStyle(m)),
                  (e.__dirty |= c.M),
                  h && e.dirtyStyle(!0));
              }
            }),
            (t.prototype.canBeInsideText = function () {
              return !0;
            }),
            (t.prototype.getInsideTextFill = function () {
              return '#fff';
            }),
            (t.prototype.getInsideTextStroke = function (t) {
              return '#000';
            }),
            (t.prototype.getOutsideFill = function () {
              return this.__zr && this.__zr.isDarkMode() ? l.el : l._S;
            }),
            (t.prototype.getOutsideStroke = function (t) {
              var e = this.__zr && this.__zr.getBackgroundColor(),
                r = 'string' == typeof e && (0, u.parse)(e);
              r || (r = [255, 255, 255, 1]);
              for (var i = r[3], n = this.__zr.isDarkMode(), o = 0; o < 3; o++)
                r[o] = r[o] * i + (n ? 0 : 255) * (1 - i);
              return ((r[3] = 1), (0, u.stringify)(r, 'rgba'));
            }),
            (t.prototype.traverse = function (t, e) {}),
            (t.prototype.attrKV = function (t, e) {
              'textConfig' === t
                ? this.setTextConfig(e)
                : 'textContent' === t
                  ? this.setTextContent(e)
                  : 'clipPath' === t
                    ? this.setClipPath(e)
                    : 'extra' === t
                      ? ((this.extra = this.extra || {}), (0, h.extend)(this.extra, e))
                      : (this[t] = e);
            }),
            (t.prototype.hide = function () {
              ((this.ignore = !0), this.markRedraw());
            }),
            (t.prototype.show = function () {
              ((this.ignore = !1), this.markRedraw());
            }),
            (t.prototype.attr = function (t, e) {
              if ('string' == typeof t) this.attrKV(t, e);
              else if ((0, h.isObject)(t))
                for (var r = t, i = (0, h.keys)(r), n = 0; n < i.length; n++) {
                  var o = i[n];
                  this.attrKV(o, t[o]);
                }
              return (this.markRedraw(), this);
            }),
            (t.prototype.saveCurrentToNormalState = function (t) {
              this._innerSaveToNormal(t);
              for (var e = this._normalState, r = 0; r < this.animators.length; r++) {
                var i = this.animators[r],
                  n = i.__fromStateTransition;
                if (!(i.getLoop() || (n && n !== f))) {
                  var o = i.targetName,
                    a = o ? e[o] : e;
                  i.saveTo(a);
                }
              }
            }),
            (t.prototype._innerSaveToNormal = function (t) {
              var e = this._normalState;
              (e || (e = this._normalState = {}),
                t.textConfig && !e.textConfig && (e.textConfig = this.textConfig),
                this._savePrimaryToNormal(t, e, p));
            }),
            (t.prototype._savePrimaryToNormal = function (t, e, r) {
              for (var i = 0; i < r.length; i++) {
                var n = r[i];
                null == t[n] || n in e || (e[n] = this[n]);
              }
            }),
            (t.prototype.hasState = function () {
              return this.currentStates.length > 0;
            }),
            (t.prototype.getState = function (t) {
              return this.states[t];
            }),
            (t.prototype.ensureState = function (t) {
              var e = this.states;
              return (e[t] || (e[t] = {}), e[t]);
            }),
            (t.prototype.clearStates = function (t) {
              this.useState(f, !1, t);
            }),
            (t.prototype.useState = function (t, e, r, i) {
              var n = t === f;
              if (this.hasState() || !n) {
                var o = this.currentStates,
                  a = this.stateTransition;
                if (!((0, h.indexOf)(o, t) >= 0) || (!e && 1 !== o.length)) {
                  var s;
                  if (
                    (this.stateProxy && !n && (s = this.stateProxy(t)),
                    s || (s = this.states && this.states[t]),
                    s || n)
                  ) {
                    n || this.saveCurrentToNormalState(s);
                    var l = !!((s && s.hoverLayer) || i);
                    (l && this._toggleHoverLayerFlag(!0),
                      this._applyStateObj(
                        t,
                        s,
                        this._normalState,
                        e,
                        !r && !this.__inHover && a && a.duration > 0,
                        a,
                      ));
                    var u = this._textContent,
                      p = this._textGuide;
                    return (
                      u && u.useState(t, e, r, l),
                      p && p.useState(t, e, r, l),
                      n
                        ? ((this.currentStates = []), (this._normalState = {}))
                        : e
                          ? this.currentStates.push(t)
                          : (this.currentStates = [t]),
                      this._updateAnimationTargets(),
                      this.markRedraw(),
                      !l &&
                        this.__inHover &&
                        (this._toggleHoverLayerFlag(!1), (this.__dirty &= ~c.M)),
                      s
                    );
                  }
                  (0, h.logError)('State ' + t + ' not exists.');
                }
              }
            }),
            (t.prototype.useStates = function (t, e, r) {
              if (t.length) {
                var i = [],
                  n = this.currentStates,
                  o = t.length,
                  a = o === n.length;
                if (a)
                  for (var s = 0; s < o; s++)
                    if (t[s] !== n[s]) {
                      a = !1;
                      break;
                    }
                if (a) return;
                for (s = 0; s < o; s++) {
                  var h = t[s],
                    l = void 0;
                  (this.stateProxy && (l = this.stateProxy(h, t)),
                    l || (l = this.states[h]),
                    l && i.push(l));
                }
                var u = i[o - 1],
                  f = !!((u && u.hoverLayer) || r);
                f && this._toggleHoverLayerFlag(!0);
                var p = this._mergeStates(i),
                  d = this.stateTransition;
                (this.saveCurrentToNormalState(p),
                  this._applyStateObj(
                    t.join(','),
                    p,
                    this._normalState,
                    !1,
                    !e && !this.__inHover && d && d.duration > 0,
                    d,
                  ));
                var y = this._textContent,
                  v = this._textGuide;
                (y && y.useStates(t, e, f),
                  v && v.useStates(t, e, f),
                  this._updateAnimationTargets(),
                  (this.currentStates = t.slice()),
                  this.markRedraw(),
                  !f && this.__inHover && (this._toggleHoverLayerFlag(!1), (this.__dirty &= ~c.M)));
              } else this.clearStates();
            }),
            (t.prototype.isSilent = function () {
              for (var t = this.silent, e = this.parent; !t && e;) {
                if (e.silent) {
                  t = !0;
                  break;
                }
                e = e.parent;
              }
              return t;
            }),
            (t.prototype._updateAnimationTargets = function () {
              for (var t = 0; t < this.animators.length; t++) {
                var e = this.animators[t];
                e.targetName && e.changeTarget(this[e.targetName]);
              }
            }),
            (t.prototype.removeState = function (t) {
              var e = (0, h.indexOf)(this.currentStates, t);
              if (e >= 0) {
                var r = this.currentStates.slice();
                (r.splice(e, 1), this.useStates(r));
              }
            }),
            (t.prototype.replaceState = function (t, e, r) {
              var i = this.currentStates.slice(),
                n = (0, h.indexOf)(i, t),
                o = (0, h.indexOf)(i, e) >= 0;
              (n >= 0 ? (o ? i.splice(n, 1) : (i[n] = e)) : r && !o && i.push(e),
                this.useStates(i));
            }),
            (t.prototype.toggleState = function (t, e) {
              e ? this.useState(t, !0) : this.removeState(t);
            }),
            (t.prototype._mergeStates = function (t) {
              for (var e, r = {}, i = 0; i < t.length; i++) {
                var n = t[i];
                ((0, h.extend)(r, n),
                  n.textConfig && ((e = e || {}), (0, h.extend)(e, n.textConfig)));
              }
              return (e && (r.textConfig = e), r);
            }),
            (t.prototype._applyStateObj = function (t, e, r, i, n, o) {
              var a = !(e && i);
              e && e.textConfig
                ? ((this.textConfig = (0, h.extend)({}, i ? this.textConfig : r.textConfig)),
                  (0, h.extend)(this.textConfig, e.textConfig))
                : a && r.textConfig && (this.textConfig = r.textConfig);
              for (var s = {}, l = !1, u = 0; u < p.length; u++) {
                var c = p[u],
                  f = n && d[c];
                e && null != e[c]
                  ? f
                    ? ((l = !0), (s[c] = e[c]))
                    : (this[c] = e[c])
                  : a && null != r[c] && (f ? ((l = !0), (s[c] = r[c])) : (this[c] = r[c]));
              }
              if (!n)
                for (u = 0; u < this.animators.length; u++) {
                  var y = this.animators[u],
                    v = y.targetName;
                  y.getLoop() || y.__changeFinalValue(v ? (e || r)[v] : e || r);
                }
              l && this._transitionState(t, s, o);
            }),
            (t.prototype._attachComponent = function (t) {
              if ((!t.__zr || t.__hostTarget) && t !== this) {
                var e = this.__zr;
                (e && t.addSelfToZr(e), (t.__zr = e), (t.__hostTarget = this));
              }
            }),
            (t.prototype._detachComponent = function (t) {
              (t.__zr && t.removeSelfFromZr(t.__zr), (t.__zr = null), (t.__hostTarget = null));
            }),
            (t.prototype.getClipPath = function () {
              return this._clipPath;
            }),
            (t.prototype.setClipPath = function (t) {
              (this._clipPath && this._clipPath !== t && this.removeClipPath(),
                this._attachComponent(t),
                (this._clipPath = t),
                this.markRedraw());
            }),
            (t.prototype.removeClipPath = function () {
              var t = this._clipPath;
              t && (this._detachComponent(t), (this._clipPath = null), this.markRedraw());
            }),
            (t.prototype.getTextContent = function () {
              return this._textContent;
            }),
            (t.prototype.setTextContent = function (t) {
              var e = this._textContent;
              e !== t &&
                (e && e !== t && this.removeTextContent(),
                (t.innerTransformable = new i.Ay()),
                this._attachComponent(t),
                (this._textContent = t),
                this.markRedraw());
            }),
            (t.prototype.setTextConfig = function (t) {
              (this.textConfig || (this.textConfig = {}),
                (0, h.extend)(this.textConfig, t),
                this.markRedraw());
            }),
            (t.prototype.removeTextConfig = function () {
              ((this.textConfig = null), this.markRedraw());
            }),
            (t.prototype.removeTextContent = function () {
              var t = this._textContent;
              t &&
                ((t.innerTransformable = null),
                this._detachComponent(t),
                (this._textContent = null),
                (this._innerTextDefaultStyle = null),
                this.markRedraw());
            }),
            (t.prototype.getTextGuideLine = function () {
              return this._textGuide;
            }),
            (t.prototype.setTextGuideLine = function (t) {
              (this._textGuide && this._textGuide !== t && this.removeTextGuideLine(),
                this._attachComponent(t),
                (this._textGuide = t),
                this.markRedraw());
            }),
            (t.prototype.removeTextGuideLine = function () {
              var t = this._textGuide;
              t && (this._detachComponent(t), (this._textGuide = null), this.markRedraw());
            }),
            (t.prototype.markRedraw = function () {
              this.__dirty |= c.M;
              var t = this.__zr;
              (t && (this.__inHover ? t.refreshHover() : t.refresh()),
                this.__hostTarget && this.__hostTarget.markRedraw());
            }),
            (t.prototype.dirty = function () {
              this.markRedraw();
            }),
            (t.prototype._toggleHoverLayerFlag = function (t) {
              this.__inHover = t;
              var e = this._textContent,
                r = this._textGuide;
              (e && (e.__inHover = t), r && (r.__inHover = t));
            }),
            (t.prototype.addSelfToZr = function (t) {
              if (this.__zr !== t) {
                this.__zr = t;
                var e = this.animators;
                if (e) for (var r = 0; r < e.length; r++) t.animation.addAnimator(e[r]);
                (this._clipPath && this._clipPath.addSelfToZr(t),
                  this._textContent && this._textContent.addSelfToZr(t),
                  this._textGuide && this._textGuide.addSelfToZr(t));
              }
            }),
            (t.prototype.removeSelfFromZr = function (t) {
              if (this.__zr) {
                this.__zr = null;
                var e = this.animators;
                if (e) for (var r = 0; r < e.length; r++) t.animation.removeAnimator(e[r]);
                (this._clipPath && this._clipPath.removeSelfFromZr(t),
                  this._textContent && this._textContent.removeSelfFromZr(t),
                  this._textGuide && this._textGuide.removeSelfFromZr(t));
              }
            }),
            (t.prototype.animate = function (t, e, r) {
              var i = t ? this[t] : this,
                o = new n.A(i, e, r);
              return (t && (o.targetName = t), this.addAnimator(o, t), o);
            }),
            (t.prototype.addAnimator = function (t, e) {
              var r = this.__zr,
                i = this;
              (t
                .during(function () {
                  i.updateDuringAnimation(e);
                })
                .done(function () {
                  var e = i.animators,
                    r = (0, h.indexOf)(e, t);
                  r >= 0 && e.splice(r, 1);
                }),
                this.animators.push(t),
                r && r.animation.addAnimator(t),
                r && r.wakeUp());
            }),
            (t.prototype.updateDuringAnimation = function (t) {
              this.markRedraw();
            }),
            (t.prototype.stopAnimation = function (t, e) {
              for (var r = this.animators, i = r.length, n = [], o = 0; o < i; o++) {
                var a = r[o];
                t && t !== a.scope ? n.push(a) : a.stop(e);
              }
              return ((this.animators = n), this);
            }),
            (t.prototype.animateTo = function (t, e, r) {
              _(this, t, e, r);
            }),
            (t.prototype.animateFrom = function (t, e, r) {
              _(this, t, e, r, !0);
            }),
            (t.prototype._transitionState = function (t, e, r, i) {
              for (var n = _(this, e, r, i), o = 0; o < n.length; o++)
                n[o].__fromStateTransition = t;
            }),
            (t.prototype.getBoundingRect = function () {
              return null;
            }),
            (t.prototype.getPaintRect = function () {
              return null;
            }),
            (t.initDefaultProps = (function () {
              var e = t.prototype;
              function r(t, r, i, n) {
                function o(t, e) {
                  (Object.defineProperty(e, 0, {
                    get: function () {
                      return t[i];
                    },
                    set: function (e) {
                      t[i] = e;
                    },
                  }),
                    Object.defineProperty(e, 1, {
                      get: function () {
                        return t[n];
                      },
                      set: function (e) {
                        t[n] = e;
                      },
                    }));
                }
                Object.defineProperty(e, t, {
                  get: function () {
                    return (this[r] || o(this, (this[r] = [])), this[r]);
                  },
                  set: function (t) {
                    ((this[i] = t[0]), (this[n] = t[1]), (this[r] = t), o(this, t));
                  },
                });
              }
              ((e.type = 'element'),
                (e.name = ''),
                (e.ignore =
                  e.silent =
                  e.isGroup =
                  e.draggable =
                  e.dragging =
                  e.ignoreClip =
                  e.__inHover =
                    !1),
                (e.__dirty = c.M),
                Object.defineProperty &&
                  (r('position', '_legacyPos', 'x', 'y'),
                  r('scale', '_legacyScale', 'scaleX', 'scaleY'),
                  r('origin', '_legacyOrigin', 'originX', 'originY')));
            })()),
            t
          );
        })();
      function _(t, e, r, i, n) {
        var o = [];
        w(t, '', t, e, (r = r || {}), i, o, n);
        var a = o.length,
          s = !1,
          h = r.done,
          l = r.aborted,
          u = function () {
            ((s = !0), --a <= 0 && (s ? h && h() : l && l()));
          },
          c = function () {
            --a <= 0 && (s ? h && h() : l && l());
          };
        (a || (h && h()),
          o.length > 0 &&
            r.during &&
            o[0].during(function (t, e) {
              r.during(e);
            }));
        for (var f = 0; f < o.length; f++) {
          var p = o[f];
          (u && p.done(u), c && p.aborted(c), r.force && p.duration(r.duration), p.start(r.easing));
        }
        return o;
      }
      function m(t, e, r) {
        for (var i = 0; i < r; i++) t[i] = e[i];
      }
      function x(t, e, r) {
        if ((0, h.isArrayLike)(e[r]))
          if (((0, h.isArrayLike)(t[r]) || (t[r] = []), (0, h.isTypedArray)(e[r]))) {
            var i = e[r].length;
            t[r].length !== i && ((t[r] = new e[r].constructor(i)), m(t[r], e[r], i));
          } else {
            var n = e[r],
              o = t[r],
              a = n.length;
            if (((u = n), (0, h.isArrayLike)(u[0])))
              for (var s = n[0].length, l = 0; l < a; l++)
                o[l] ? m(o[l], n[l], s) : (o[l] = Array.prototype.slice.call(n[l]));
            else m(o, n, a);
            o.length = n.length;
          }
        else t[r] = e[r];
        var u;
      }
      function w(t, e, r, i, o, a, s, l) {
        for (
          var u = (0, h.keys)(i),
            c = o.duration,
            f = o.delay,
            p = o.additive,
            d = o.setToFinal,
            y = !(0, h.isObject)(a),
            v = t.animators,
            g = [],
            _ = 0;
          _ < u.length;
          _++
        ) {
          var m = u[_],
            b = i[m];
          if (null != b && null != r[m] && (y || a[m]))
            if (!(0, h.isObject)(b) || (0, h.isArrayLike)(b) || (0, h.isGradientObject)(b))
              g.push(m);
            else {
              if (e) {
                l || ((r[m] = b), t.updateDuringAnimation(e));
                continue;
              }
              w(t, m, r[m], b, o, a && a[m], s, l);
            }
          else l || ((r[m] = b), t.updateDuringAnimation(e), g.push(m));
        }
        var k = g.length;
        if (!p && k)
          for (var S = 0; S < v.length; S++)
            if ((A = v[S]).targetName === e && A.stopTracks(g)) {
              var T = (0, h.indexOf)(v, A);
              v.splice(T, 1);
            }
        if (
          (o.force ||
            ((g = (0, h.filter)(g, function (t) {
              return !(
                (e = i[t]) === (n = r[t]) ||
                ((0, h.isArrayLike)(e) &&
                  (0, h.isArrayLike)(n) &&
                  (function (t, e) {
                    var r = t.length;
                    if (r !== e.length) return !1;
                    for (var i = 0; i < r; i++) if (t[i] !== e[i]) return !1;
                    return !0;
                  })(e, n))
              );
              var e, n;
            })),
            (k = g.length)),
          k > 0 || (o.force && !s.length))
        ) {
          var A,
            C = void 0,
            P = void 0,
            M = void 0;
          if (l)
            for (P = {}, d && (C = {}), S = 0; S < k; S++)
              ((P[(m = g[S])] = r[m]), d ? (C[m] = i[m]) : (r[m] = i[m]));
          else if (d)
            for (M = {}, S = 0; S < k; S++) ((M[(m = g[S])] = (0, n.F)(r[m])), x(r, i, m));
          (((A = new n.A(
            r,
            !1,
            !1,
            p
              ? (0, h.filter)(v, function (t) {
                  return t.targetName === e;
                })
              : null,
          )).targetName = e),
            o.scope && (A.scope = o.scope),
            d && C && A.whenWithKeys(0, C, g),
            M && A.whenWithKeys(0, M, g),
            A.whenWithKeys(c ?? 500, l ? P : i, g).delay(f || 0),
            t.addAnimator(A, e),
            s.push(A));
        }
      }
      ((0, h.mixin)(g, a.A), (0, h.mixin)(g, i.Ay));
      const b = g;
    },
    169974: (t, e, r) => {
      r.d(e, { A: () => S });
      var i = r(15215),
        n = r(498026),
        o = r(983509),
        a = function (t, e) {
          ((this.target = t), (this.topTarget = e && e.topTarget));
        };
      const s = (function () {
        function t(t) {
          ((this.handler = t),
            t.on('mousedown', this._dragStart, this),
            t.on('mousemove', this._drag, this),
            t.on('mouseup', this._dragEnd, this));
        }
        return (
          (t.prototype._dragStart = function (t) {
            for (var e = t.target; e && !e.draggable;) e = e.parent || e.__hostTarget;
            e &&
              ((this._draggingTarget = e),
              (e.dragging = !0),
              (this._x = t.offsetX),
              (this._y = t.offsetY),
              this.handler.dispatchToElement(new a(e, t), 'dragstart', t.event));
          }),
          (t.prototype._drag = function (t) {
            var e = this._draggingTarget;
            if (e) {
              var r = t.offsetX,
                i = t.offsetY,
                n = r - this._x,
                o = i - this._y;
              ((this._x = r),
                (this._y = i),
                e.drift(n, o, t),
                this.handler.dispatchToElement(new a(e, t), 'drag', t.event));
              var s = this.handler.findHover(r, i, e).target,
                h = this._dropTarget;
              ((this._dropTarget = s),
                e !== s &&
                  (h &&
                    s !== h &&
                    this.handler.dispatchToElement(new a(h, t), 'dragleave', t.event),
                  s &&
                    s !== h &&
                    this.handler.dispatchToElement(new a(s, t), 'dragenter', t.event)));
            }
          }),
          (t.prototype._dragEnd = function (t) {
            var e = this._draggingTarget;
            (e && (e.dragging = !1),
              this.handler.dispatchToElement(new a(e, t), 'dragend', t.event),
              this._dropTarget &&
                this.handler.dispatchToElement(new a(this._dropTarget, t), 'drop', t.event),
              (this._draggingTarget = null),
              (this._dropTarget = null));
          }),
          t
        );
      })();
      var h = r(757861),
        l = r(435452),
        u = (function () {
          function t() {
            this._track = [];
          }
          return (
            (t.prototype.recognize = function (t, e, r) {
              return (this._doTrack(t, e, r), this._recognize(t));
            }),
            (t.prototype.clear = function () {
              return ((this._track.length = 0), this);
            }),
            (t.prototype._doTrack = function (t, e, r) {
              var i = t.touches;
              if (i) {
                for (
                  var n = { points: [], touches: [], target: e, event: t }, o = 0, a = i.length;
                  o < a;
                  o++
                ) {
                  var s = i[o],
                    h = l.Yo(r, s, {});
                  (n.points.push([h.zrX, h.zrY]), n.touches.push(s));
                }
                this._track.push(n);
              }
            }),
            (t.prototype._recognize = function (t) {
              for (var e in f)
                if (f.hasOwnProperty(e)) {
                  var r = f[e](this._track, t);
                  if (r) return r;
                }
            }),
            t
          );
        })();
      function c(t) {
        var e = t[1][0] - t[0][0],
          r = t[1][1] - t[0][1];
        return Math.sqrt(e * e + r * r);
      }
      var f = {
          pinch: function (t, e) {
            var r = t.length;
            if (r) {
              var i,
                n = (t[r - 1] || {}).points,
                o = (t[r - 2] || {}).points || n;
              if (o && o.length > 1 && n && n.length > 1) {
                var a = c(n) / c(o);
                (!isFinite(a) && (a = 1), (e.pinchScale = a));
                var s = [((i = n)[0][0] + i[1][0]) / 2, (i[0][1] + i[1][1]) / 2];
                return (
                  (e.pinchX = s[0]),
                  (e.pinchY = s[1]),
                  { type: 'pinch', target: t[0].target, event: e }
                );
              }
            }
          },
        },
        p = r(529308),
        d = 'silent';
      function y() {
        l.ds(this.event);
      }
      var v = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return ((e.handler = null), e);
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.dispose = function () {}),
            (e.prototype.setCursor = function () {}),
            e
          );
        })(h.A),
        g = function (t, e) {
          ((this.x = t), (this.y = e));
        },
        _ = [
          'click',
          'dblclick',
          'mousewheel',
          'mouseout',
          'mouseup',
          'mousedown',
          'mousemove',
          'contextmenu',
        ],
        m = new p.A(0, 0, 0, 0),
        x = (function (t) {
          function e(e, r, i, n, o) {
            var a = t.call(this) || this;
            return (
              (a._hovered = new g(0, 0)),
              (a.storage = e),
              (a.painter = r),
              (a.painterRoot = n),
              (a._pointerSize = o),
              (i = i || new v()),
              (a.proxy = null),
              a.setHandlerProxy(i),
              (a._draggingMgr = new s(a)),
              a
            );
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.setHandlerProxy = function (t) {
              (this.proxy && this.proxy.dispose(),
                t &&
                  (n.each(
                    _,
                    function (e) {
                      t.on && t.on(e, this[e], this);
                    },
                    this,
                  ),
                  (t.handler = this)),
                (this.proxy = t));
            }),
            (e.prototype.mousemove = function (t) {
              var e = t.zrX,
                r = t.zrY,
                i = k(this, e, r),
                n = this._hovered,
                o = n.target;
              o && !o.__zr && (o = (n = this.findHover(n.x, n.y)).target);
              var a = (this._hovered = i ? new g(e, r) : this.findHover(e, r)),
                s = a.target,
                h = this.proxy;
              (h.setCursor && h.setCursor(s ? s.cursor : 'default'),
                o && s !== o && this.dispatchToElement(n, 'mouseout', t),
                this.dispatchToElement(a, 'mousemove', t),
                s && s !== o && this.dispatchToElement(a, 'mouseover', t));
            }),
            (e.prototype.mouseout = function (t) {
              var e = t.zrEventControl;
              ('only_globalout' !== e && this.dispatchToElement(this._hovered, 'mouseout', t),
                'no_globalout' !== e && this.trigger('globalout', { type: 'globalout', event: t }));
            }),
            (e.prototype.resize = function () {
              this._hovered = new g(0, 0);
            }),
            (e.prototype.dispatch = function (t, e) {
              var r = this[t];
              r && r.call(this, e);
            }),
            (e.prototype.dispose = function () {
              (this.proxy.dispose(),
                (this.storage = null),
                (this.proxy = null),
                (this.painter = null));
            }),
            (e.prototype.setCursorStyle = function (t) {
              var e = this.proxy;
              e.setCursor && e.setCursor(t);
            }),
            (e.prototype.dispatchToElement = function (t, e, r) {
              var i = (t = t || {}).target;
              if (!i || !i.silent) {
                for (
                  var n = 'on' + e,
                    o = (function (t, e, r) {
                      return {
                        type: t,
                        event: r,
                        target: e.target,
                        topTarget: e.topTarget,
                        cancelBubble: !1,
                        offsetX: r.zrX,
                        offsetY: r.zrY,
                        gestureEvent: r.gestureEvent,
                        pinchX: r.pinchX,
                        pinchY: r.pinchY,
                        pinchScale: r.pinchScale,
                        wheelDelta: r.zrDelta,
                        zrByTouch: r.zrByTouch,
                        which: r.which,
                        stop: y,
                      };
                    })(e, t, r);
                  i &&
                  (i[n] && (o.cancelBubble = !!i[n].call(i, o)),
                  i.trigger(e, o),
                  (i = i.__hostTarget ? i.__hostTarget : i.parent),
                  !o.cancelBubble);
                );
                o.cancelBubble ||
                  (this.trigger(e, o),
                  this.painter &&
                    this.painter.eachOtherLayer &&
                    this.painter.eachOtherLayer(function (t) {
                      ('function' == typeof t[n] && t[n].call(t, o), t.trigger && t.trigger(e, o));
                    }));
              }
            }),
            (e.prototype.findHover = function (t, e, r) {
              var i = this.storage.getDisplayList(),
                n = new g(t, e);
              if ((b(i, n, t, e, r), this._pointerSize && !n.target)) {
                for (
                  var o = [],
                    a = this._pointerSize,
                    s = a / 2,
                    h = new p.A(t - s, e - s, a, a),
                    l = i.length - 1;
                  l >= 0;
                  l--
                ) {
                  var u = i[l];
                  u === r ||
                    u.ignore ||
                    u.ignoreCoarsePointer ||
                    (u.parent && u.parent.ignoreCoarsePointer) ||
                    (m.copy(u.getBoundingRect()),
                    u.transform && m.applyTransform(u.transform),
                    m.intersect(h) && o.push(u));
                }
                if (o.length)
                  for (var c = Math.PI / 12, f = 2 * Math.PI, d = 0; d < s; d += 4)
                    for (var y = 0; y < f; y += c)
                      if ((b(o, n, t + d * Math.cos(y), e + d * Math.sin(y), r), n.target))
                        return n;
              }
              return n;
            }),
            (e.prototype.processGesture = function (t, e) {
              this._gestureMgr || (this._gestureMgr = new u());
              var r = this._gestureMgr;
              'start' === e && r.clear();
              var i = r.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
              if (('end' === e && r.clear(), i)) {
                var n = i.type;
                t.gestureEvent = n;
                var o = new g();
                ((o.target = i.target), this.dispatchToElement(o, n, i.event));
              }
            }),
            e
          );
        })(h.A);
      function w(t, e, r) {
        if (t[t.rectHover ? 'rectContain' : 'contain'](e, r)) {
          for (var i = t, n = void 0, o = !1; i;) {
            if ((i.ignoreClip && (o = !0), !o)) {
              var a = i.getClipPath();
              if (a && !a.contain(e, r)) return !1;
            }
            (i.silent && (n = !0), (i = i.__hostTarget || i.parent));
          }
          return !n || d;
        }
        return !1;
      }
      function b(t, e, r, i, n) {
        for (var o = t.length - 1; o >= 0; o--) {
          var a = t[o],
            s = void 0;
          if (
            a !== n &&
            !a.ignore &&
            (s = w(a, r, i)) &&
            (!e.topTarget && (e.topTarget = a), s !== d)
          ) {
            e.target = a;
            break;
          }
        }
      }
      function k(t, e, r) {
        var i = t.painter;
        return e < 0 || e > i.getWidth() || r < 0 || r > i.getHeight();
      }
      n.each(
        ['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'],
        function (t) {
          x.prototype[t] = function (e) {
            var r,
              i,
              n = e.zrX,
              a = e.zrY,
              s = k(this, n, a);
            if (
              (('mouseup' === t && s) || (i = (r = this.findHover(n, a)).target), 'mousedown' === t)
            )
              ((this._downEl = i), (this._downPoint = [e.zrX, e.zrY]), (this._upEl = i));
            else if ('mouseup' === t) this._upEl = i;
            else if ('click' === t) {
              if (
                this._downEl !== this._upEl ||
                !this._downPoint ||
                o.dist(this._downPoint, [e.zrX, e.zrY]) > 4
              )
                return;
              this._downPoint = null;
            }
            this.dispatchToElement(r, t, e);
          };
        },
      );
      const S = x;
    },
    614647: (t, e, r) => {
      r.d(e, { A: () => l });
      var i = r(498026),
        n = r(383470),
        o = r(756448),
        a = !1;
      function s() {
        a ||
          ((a = !0),
          console.warn(
            'z / z2 / zlevel of displayable is invalid, which may cause unexpected errors',
          ));
      }
      function h(t, e) {
        return t.zlevel === e.zlevel
          ? t.z === e.z
            ? t.z2 - e.z2
            : t.z - e.z
          : t.zlevel - e.zlevel;
      }
      const l = (function () {
        function t() {
          ((this._roots = []),
            (this._displayList = []),
            (this._displayListLen = 0),
            (this.displayableSortFunc = h));
        }
        return (
          (t.prototype.traverse = function (t, e) {
            for (var r = 0; r < this._roots.length; r++) this._roots[r].traverse(t, e);
          }),
          (t.prototype.getDisplayList = function (t, e) {
            e = e || !1;
            var r = this._displayList;
            return ((!t && r.length) || this.updateDisplayList(e), r);
          }),
          (t.prototype.updateDisplayList = function (t) {
            this._displayListLen = 0;
            for (var e = this._roots, r = this._displayList, i = 0, o = e.length; i < o; i++)
              this._updateAndAddDisplayable(e[i], null, t);
            ((r.length = this._displayListLen), (0, n.A)(r, h));
          }),
          (t.prototype._updateAndAddDisplayable = function (t, e, r) {
            if (!t.ignore || r) {
              (t.beforeUpdate(), t.update(), t.afterUpdate());
              var i = t.getClipPath();
              if (t.ignoreClip) e = null;
              else if (i) {
                e = e ? e.slice() : [];
                for (var n = i, a = t; n;)
                  ((n.parent = a), n.updateTransform(), e.push(n), (a = n), (n = n.getClipPath()));
              }
              if (t.childrenRef) {
                for (var h = t.childrenRef(), l = 0; l < h.length; l++) {
                  var u = h[l];
                  (t.__dirty && (u.__dirty |= o.M), this._updateAndAddDisplayable(u, e, r));
                }
                t.__dirty = 0;
              } else {
                var c = t;
                (e && e.length
                  ? (c.__clipPaths = e)
                  : c.__clipPaths && c.__clipPaths.length > 0 && (c.__clipPaths = []),
                  isNaN(c.z) && (s(), (c.z = 0)),
                  isNaN(c.z2) && (s(), (c.z2 = 0)),
                  isNaN(c.zlevel) && (s(), (c.zlevel = 0)),
                  (this._displayList[this._displayListLen++] = c));
              }
              var f = t.getDecalElement && t.getDecalElement();
              f && this._updateAndAddDisplayable(f, e, r);
              var p = t.getTextGuideLine();
              p && this._updateAndAddDisplayable(p, e, r);
              var d = t.getTextContent();
              d && this._updateAndAddDisplayable(d, e, r);
            }
          }),
          (t.prototype.addRoot = function (t) {
            (t.__zr && t.__zr.storage === this) || this._roots.push(t);
          }),
          (t.prototype.delRoot = function (t) {
            if (t instanceof Array) for (var e = 0, r = t.length; e < r; e++) this.delRoot(t[e]);
            else {
              var n = i.indexOf(this._roots, t);
              n >= 0 && this._roots.splice(n, 1);
            }
          }),
          (t.prototype.delAllRoots = function () {
            ((this._roots = []), (this._displayList = []), (this._displayListLen = 0));
          }),
          (t.prototype.getRoots = function () {
            return this._roots;
          }),
          (t.prototype.dispose = function () {
            ((this._displayList = null), (this._roots = null));
          }),
          t
        );
      })();
    },
    979021: (t, e, r) => {
      r.d(e, { A: () => h, W: () => s });
      var i = r(15215),
        n = r(757861),
        o = r(445825),
        a = r(321756);
      function s() {
        return new Date().getTime();
      }
      const h = (function (t) {
        function e(e) {
          var r = t.call(this) || this;
          return (
            (r._running = !1),
            (r._time = 0),
            (r._pausedTime = 0),
            (r._pauseStart = 0),
            (r._paused = !1),
            (e = e || {}),
            (r.stage = e.stage || {}),
            r
          );
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.addClip = function (t) {
            (t.animation && this.removeClip(t),
              this._head
                ? ((this._tail.next = t), (t.prev = this._tail), (t.next = null), (this._tail = t))
                : (this._head = this._tail = t),
              (t.animation = this));
          }),
          (e.prototype.addAnimator = function (t) {
            t.animation = this;
            var e = t.getClip();
            e && this.addClip(e);
          }),
          (e.prototype.removeClip = function (t) {
            if (t.animation) {
              var e = t.prev,
                r = t.next;
              (e ? (e.next = r) : (this._head = r),
                r ? (r.prev = e) : (this._tail = e),
                (t.next = t.prev = t.animation = null));
            }
          }),
          (e.prototype.removeAnimator = function (t) {
            var e = t.getClip();
            (e && this.removeClip(e), (t.animation = null));
          }),
          (e.prototype.update = function (t) {
            for (var e = s() - this._pausedTime, r = e - this._time, i = this._head; i;) {
              var n = i.next;
              i.step(e, r) ? (i.ondestroy(), this.removeClip(i), (i = n)) : (i = n);
            }
            ((this._time = e),
              t || (this.trigger('frame', r), this.stage.update && this.stage.update()));
          }),
          (e.prototype._startLoop = function () {
            var t = this;
            ((this._running = !0),
              (0, o.A)(function e() {
                t._running && ((0, o.A)(e), !t._paused && t.update());
              }));
          }),
          (e.prototype.start = function () {
            this._running || ((this._time = s()), (this._pausedTime = 0), this._startLoop());
          }),
          (e.prototype.stop = function () {
            this._running = !1;
          }),
          (e.prototype.pause = function () {
            this._paused || ((this._pauseStart = s()), (this._paused = !0));
          }),
          (e.prototype.resume = function () {
            this._paused && ((this._pausedTime += s() - this._pauseStart), (this._paused = !1));
          }),
          (e.prototype.clear = function () {
            for (var t = this._head; t;) {
              var e = t.next;
              ((t.prev = t.next = t.animation = null), (t = e));
            }
            this._head = this._tail = null;
          }),
          (e.prototype.isFinished = function () {
            return null == this._head;
          }),
          (e.prototype.animate = function (t, e) {
            ((e = e || {}), this.start());
            var r = new a.A(t, e.loop);
            return (this.addAnimator(r), r);
          }),
          e
        );
      })(n.A);
    },
    321756: (t, e, r) => {
      r.d(e, { F: () => g, A: () => k });
      var i = {
        linear: function (t) {
          return t;
        },
        quadraticIn: function (t) {
          return t * t;
        },
        quadraticOut: function (t) {
          return t * (2 - t);
        },
        quadraticInOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
        },
        cubicIn: function (t) {
          return t * t * t;
        },
        cubicOut: function (t) {
          return --t * t * t + 1;
        },
        cubicInOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
        },
        quarticIn: function (t) {
          return t * t * t * t;
        },
        quarticOut: function (t) {
          return 1 - --t * t * t * t;
        },
        quarticInOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
        },
        quinticIn: function (t) {
          return t * t * t * t * t;
        },
        quinticOut: function (t) {
          return --t * t * t * t * t + 1;
        },
        quinticInOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        sinusoidalIn: function (t) {
          return 1 - Math.cos((t * Math.PI) / 2);
        },
        sinusoidalOut: function (t) {
          return Math.sin((t * Math.PI) / 2);
        },
        sinusoidalInOut: function (t) {
          return 0.5 * (1 - Math.cos(Math.PI * t));
        },
        exponentialIn: function (t) {
          return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        exponentialOut: function (t) {
          return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        exponentialInOut: function (t) {
          return 0 === t
            ? 0
            : 1 === t
              ? 1
              : (t *= 2) < 1
                ? 0.5 * Math.pow(1024, t - 1)
                : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
        },
        circularIn: function (t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        circularOut: function (t) {
          return Math.sqrt(1 - --t * t);
        },
        circularInOut: function (t) {
          return (t *= 2) < 1
            ? -0.5 * (Math.sqrt(1 - t * t) - 1)
            : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        elasticIn: function (t) {
          var e,
            r = 0.1;
          return 0 === t
            ? 0
            : 1 === t
              ? 1
              : (!r || r < 1
                  ? ((r = 1), (e = 0.1))
                  : (e = (0.4 * Math.asin(1 / r)) / (2 * Math.PI)),
                -r * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - e) * (2 * Math.PI)) / 0.4));
        },
        elasticOut: function (t) {
          var e,
            r = 0.1;
          return 0 === t
            ? 0
            : 1 === t
              ? 1
              : (!r || r < 1
                  ? ((r = 1), (e = 0.1))
                  : (e = (0.4 * Math.asin(1 / r)) / (2 * Math.PI)),
                r * Math.pow(2, -10 * t) * Math.sin(((t - e) * (2 * Math.PI)) / 0.4) + 1);
        },
        elasticInOut: function (t) {
          var e,
            r = 0.1;
          return 0 === t
            ? 0
            : 1 === t
              ? 1
              : (!r || r < 1
                  ? ((r = 1), (e = 0.1))
                  : (e = (0.4 * Math.asin(1 / r)) / (2 * Math.PI)),
                (t *= 2) < 1
                  ? r *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t - e) * (2 * Math.PI)) / 0.4) *
                    -0.5
                  : r *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin(((t - e) * (2 * Math.PI)) / 0.4) *
                      0.5 +
                    1);
        },
        backIn: function (t) {
          var e = 1.70158;
          return t * t * ((e + 1) * t - e);
        },
        backOut: function (t) {
          var e = 1.70158;
          return --t * t * ((e + 1) * t + e) + 1;
        },
        backInOut: function (t) {
          var e = 2.5949095;
          return (t *= 2) < 1
            ? t * t * ((e + 1) * t - e) * 0.5
            : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        },
        bounceIn: function (t) {
          return 1 - i.bounceOut(1 - t);
        },
        bounceOut: function (t) {
          return t < 1 / 2.75
            ? 7.5625 * t * t
            : t < 2 / 2.75
              ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
              : t < 2.5 / 2.75
                ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        bounceInOut: function (t) {
          return t < 0.5 ? 0.5 * i.bounceIn(2 * t) : 0.5 * i.bounceOut(2 * t - 1) + 0.5;
        },
      };
      const n = i;
      var o = r(498026),
        a = r(496320);
      const s = (function () {
        function t(t) {
          ((this._inited = !1),
            (this._startTime = 0),
            (this._pausedTime = 0),
            (this._paused = !1),
            (this._life = t.life || 1e3),
            (this._delay = t.delay || 0),
            (this.loop = t.loop || !1),
            (this.onframe = t.onframe || o.noop),
            (this.ondestroy = t.ondestroy || o.noop),
            (this.onrestart = t.onrestart || o.noop),
            t.easing && this.setEasing(t.easing));
        }
        return (
          (t.prototype.step = function (t, e) {
            if (
              (this._inited || ((this._startTime = t + this._delay), (this._inited = !0)),
              !this._paused)
            ) {
              var r = this._life,
                i = t - this._startTime - this._pausedTime,
                n = i / r;
              (n < 0 && (n = 0), (n = Math.min(n, 1)));
              var o = this.easingFunc,
                a = o ? o(n) : n;
              if ((this.onframe(a), 1 === n)) {
                if (!this.loop) return !0;
                var s = i % r;
                ((this._startTime = t - s), (this._pausedTime = 0), this.onrestart());
              }
              return !1;
            }
            this._pausedTime += e;
          }),
          (t.prototype.pause = function () {
            this._paused = !0;
          }),
          (t.prototype.resume = function () {
            this._paused = !1;
          }),
          (t.prototype.setEasing = function (t) {
            ((this.easing = t), (this.easingFunc = (0, o.isFunction)(t) ? t : n[t] || (0, a.w)(t)));
          }),
          t
        );
      })();
      var h = r(747698),
        l = r(3455),
        u = Array.prototype.slice;
      function c(t, e, r) {
        return (e - t) * r + t;
      }
      function f(t, e, r, i) {
        for (var n = e.length, o = 0; o < n; o++) t[o] = c(e[o], r[o], i);
        return t;
      }
      function p(t, e, r, i) {
        for (var n = e.length, o = 0; o < n; o++) t[o] = e[o] + r[o] * i;
        return t;
      }
      function d(t, e, r, i) {
        for (var n = e.length, o = n && e[0].length, a = 0; a < n; a++) {
          t[a] || (t[a] = []);
          for (var s = 0; s < o; s++) t[a][s] = e[a][s] + r[a][s] * i;
        }
        return t;
      }
      function y(t, e) {
        for (
          var r = t.length,
            i = e.length,
            n = r > i ? e : t,
            o = Math.min(r, i),
            a = n[o - 1] || { color: [0, 0, 0, 0], offset: 0 },
            s = o;
          s < Math.max(r, i);
          s++
        )
          n.push({ offset: a.offset, color: a.color.slice() });
      }
      function v(t, e, r) {
        var i = t,
          n = e;
        if (i.push && n.push) {
          var o = i.length,
            a = n.length;
          if (o !== a)
            if (o > a) i.length = a;
            else for (var s = o; s < a; s++) i.push(1 === r ? n[s] : u.call(n[s]));
          var h = i[0] && i[0].length;
          for (s = 0; s < i.length; s++)
            if (1 === r) isNaN(i[s]) && (i[s] = n[s]);
            else for (var l = 0; l < h; l++) isNaN(i[s][l]) && (i[s][l] = n[s][l]);
        }
      }
      function g(t) {
        if ((0, o.isArrayLike)(t)) {
          var e = t.length;
          if ((0, o.isArrayLike)(t[0])) {
            for (var r = [], i = 0; i < e; i++) r.push(u.call(t[i]));
            return r;
          }
          return u.call(t);
        }
        return t;
      }
      function _(t) {
        return (
          (t[0] = Math.floor(t[0]) || 0),
          (t[1] = Math.floor(t[1]) || 0),
          (t[2] = Math.floor(t[2]) || 0),
          (t[3] = null == t[3] ? 1 : t[3]),
          'rgba(' + t.join(',') + ')'
        );
      }
      function m(t) {
        return 4 === t || 5 === t;
      }
      function x(t) {
        return 1 === t || 2 === t;
      }
      var w = [0, 0, 0, 0],
        b = (function () {
          function t(t) {
            ((this.keyframes = []),
              (this.discrete = !1),
              (this._invalid = !1),
              (this._needsSort = !1),
              (this._lastFr = 0),
              (this._lastFrP = 0),
              (this.propName = t));
          }
          return (
            (t.prototype.isFinished = function () {
              return this._finished;
            }),
            (t.prototype.setFinished = function () {
              ((this._finished = !0), this._additiveTrack && this._additiveTrack.setFinished());
            }),
            (t.prototype.needsAnimate = function () {
              return this.keyframes.length >= 1;
            }),
            (t.prototype.getAdditiveTrack = function () {
              return this._additiveTrack;
            }),
            (t.prototype.addKeyframe = function (t, e, r) {
              this._needsSort = !0;
              var i = this.keyframes,
                s = i.length,
                u = !1,
                c = 6,
                f = e;
              if ((0, o.isArrayLike)(e)) {
                var p = (function (t) {
                  return (0, o.isArrayLike)(t && t[0]) ? 2 : 1;
                })(e);
                ((c = p),
                  ((1 === p && !(0, o.isNumber)(e[0])) || (2 === p && !(0, o.isNumber)(e[0][0]))) &&
                    (u = !0));
              } else if ((0, o.isNumber)(e) && !(0, o.eqNaN)(e)) c = 0;
              else if ((0, o.isString)(e))
                if (isNaN(+e)) {
                  var d = h.parse(e);
                  d && ((f = d), (c = 3));
                } else c = 0;
              else if ((0, o.isGradientObject)(e)) {
                var y = (0, o.extend)({}, f);
                ((y.colorStops = (0, o.map)(e.colorStops, function (t) {
                  return { offset: t.offset, color: h.parse(t.color) };
                })),
                  (0, l.OS)(e) ? (c = 4) : (0, l.OH)(e) && (c = 5),
                  (f = y));
              }
              (0 === s ? (this.valType = c) : (c === this.valType && 6 !== c) || (u = !0),
                (this.discrete = this.discrete || u));
              var v = { time: t, value: f, rawValue: e, percent: 0 };
              return (
                r &&
                  ((v.easing = r), (v.easingFunc = (0, o.isFunction)(r) ? r : n[r] || (0, a.w)(r))),
                i.push(v),
                v
              );
            }),
            (t.prototype.prepare = function (t, e) {
              var r = this.keyframes;
              this._needsSort &&
                r.sort(function (t, e) {
                  return t.time - e.time;
                });
              for (
                var i = this.valType,
                  n = r.length,
                  o = r[n - 1],
                  a = this.discrete,
                  s = x(i),
                  h = m(i),
                  l = 0;
                l < n;
                l++
              ) {
                var u = r[l],
                  c = u.value,
                  f = o.value;
                ((u.percent = u.time / t),
                  a || (s && l !== n - 1 ? v(c, f, i) : h && y(c.colorStops, f.colorStops)));
              }
              if (
                !a &&
                5 !== i &&
                e &&
                this.needsAnimate() &&
                e.needsAnimate() &&
                i === e.valType &&
                !e._finished
              ) {
                this._additiveTrack = e;
                var g = r[0].value;
                for (l = 0; l < n; l++)
                  0 === i
                    ? (r[l].additiveValue = r[l].value - g)
                    : 3 === i
                      ? (r[l].additiveValue = p([], r[l].value, g, -1))
                      : x(i) &&
                        (r[l].additiveValue =
                          1 === i ? p([], r[l].value, g, -1) : d([], r[l].value, g, -1));
              }
            }),
            (t.prototype.step = function (t, e) {
              if (!this._finished) {
                this._additiveTrack &&
                  this._additiveTrack._finished &&
                  (this._additiveTrack = null);
                var r,
                  i,
                  n,
                  a = null != this._additiveTrack,
                  s = a ? 'additiveValue' : 'value',
                  h = this.valType,
                  l = this.keyframes,
                  u = l.length,
                  p = this.propName,
                  d = 3 === h,
                  y = this._lastFr,
                  v = Math.min;
                if (1 === u) i = n = l[0];
                else {
                  if (e < 0) r = 0;
                  else if (e < this._lastFrP) {
                    for (r = v(y + 1, u - 1); r >= 0 && !(l[r].percent <= e); r--);
                    r = v(r, u - 2);
                  } else {
                    for (r = y; r < u && !(l[r].percent > e); r++);
                    r = v(r - 1, u - 2);
                  }
                  ((n = l[r + 1]), (i = l[r]));
                }
                if (i && n) {
                  ((this._lastFr = r), (this._lastFrP = e));
                  var g = n.percent - i.percent,
                    b = 0 === g ? 1 : v((e - i.percent) / g, 1);
                  n.easingFunc && (b = n.easingFunc(b));
                  var k = a ? this._additiveValue : d ? w : t[p];
                  if (((!x(h) && !d) || k || (k = this._additiveValue = []), this.discrete))
                    t[p] = b < 1 ? i.rawValue : n.rawValue;
                  else if (x(h))
                    1 === h
                      ? f(k, i[s], n[s], b)
                      : (function (t, e, r, i) {
                          for (var n = e.length, o = n && e[0].length, a = 0; a < n; a++) {
                            t[a] || (t[a] = []);
                            for (var s = 0; s < o; s++) t[a][s] = c(e[a][s], r[a][s], i);
                          }
                        })(k, i[s], n[s], b);
                  else if (m(h)) {
                    var S = i[s],
                      T = n[s],
                      A = 4 === h;
                    ((t[p] = {
                      type: A ? 'linear' : 'radial',
                      x: c(S.x, T.x, b),
                      y: c(S.y, T.y, b),
                      colorStops: (0, o.map)(S.colorStops, function (t, e) {
                        var r = T.colorStops[e];
                        return {
                          offset: c(t.offset, r.offset, b),
                          color: _(f([], t.color, r.color, b)),
                        };
                      }),
                      global: T.global,
                    }),
                      A
                        ? ((t[p].x2 = c(S.x2, T.x2, b)), (t[p].y2 = c(S.y2, T.y2, b)))
                        : (t[p].r = c(S.r, T.r, b)));
                  } else if (d) (f(k, i[s], n[s], b), a || (t[p] = _(k)));
                  else {
                    var C = c(i[s], n[s], b);
                    a ? (this._additiveValue = C) : (t[p] = C);
                  }
                  a && this._addToTarget(t);
                }
              }
            }),
            (t.prototype._addToTarget = function (t) {
              var e = this.valType,
                r = this.propName,
                i = this._additiveValue;
              0 === e
                ? (t[r] = t[r] + i)
                : 3 === e
                  ? (h.parse(t[r], w), p(w, w, i, 1), (t[r] = _(w)))
                  : 1 === e
                    ? p(t[r], t[r], i, 1)
                    : 2 === e && d(t[r], t[r], i, 1);
            }),
            t
          );
        })();
      const k = (function () {
        function t(t, e, r, i) {
          ((this._tracks = {}),
            (this._trackKeys = []),
            (this._maxTime = 0),
            (this._started = 0),
            (this._clip = null),
            (this._target = t),
            (this._loop = e),
            e && i
              ? (0, o.logError)("Can' use additive animation on looped animation.")
              : ((this._additiveAnimators = i), (this._allowDiscrete = r)));
        }
        return (
          (t.prototype.getMaxTime = function () {
            return this._maxTime;
          }),
          (t.prototype.getDelay = function () {
            return this._delay;
          }),
          (t.prototype.getLoop = function () {
            return this._loop;
          }),
          (t.prototype.getTarget = function () {
            return this._target;
          }),
          (t.prototype.changeTarget = function (t) {
            this._target = t;
          }),
          (t.prototype.when = function (t, e, r) {
            return this.whenWithKeys(t, e, (0, o.keys)(e), r);
          }),
          (t.prototype.whenWithKeys = function (t, e, r, i) {
            for (var n = this._tracks, o = 0; o < r.length; o++) {
              var a = r[o],
                s = n[a];
              if (!s) {
                s = n[a] = new b(a);
                var h = void 0,
                  l = this._getAdditiveTrack(a);
                if (l) {
                  var u = l.keyframes,
                    c = u[u.length - 1];
                  ((h = c && c.value), 3 === l.valType && h && (h = _(h)));
                } else h = this._target[a];
                if (null == h) continue;
                (t > 0 && s.addKeyframe(0, g(h), i), this._trackKeys.push(a));
              }
              s.addKeyframe(t, g(e[a]), i);
            }
            return ((this._maxTime = Math.max(this._maxTime, t)), this);
          }),
          (t.prototype.pause = function () {
            (this._clip.pause(), (this._paused = !0));
          }),
          (t.prototype.resume = function () {
            (this._clip.resume(), (this._paused = !1));
          }),
          (t.prototype.isPaused = function () {
            return !!this._paused;
          }),
          (t.prototype.duration = function (t) {
            return ((this._maxTime = t), (this._force = !0), this);
          }),
          (t.prototype._doneCallback = function () {
            (this._setTracksFinished(), (this._clip = null));
            var t = this._doneCbs;
            if (t) for (var e = t.length, r = 0; r < e; r++) t[r].call(this);
          }),
          (t.prototype._abortedCallback = function () {
            this._setTracksFinished();
            var t = this.animation,
              e = this._abortedCbs;
            if ((t && t.removeClip(this._clip), (this._clip = null), e))
              for (var r = 0; r < e.length; r++) e[r].call(this);
          }),
          (t.prototype._setTracksFinished = function () {
            for (var t = this._tracks, e = this._trackKeys, r = 0; r < e.length; r++)
              t[e[r]].setFinished();
          }),
          (t.prototype._getAdditiveTrack = function (t) {
            var e,
              r = this._additiveAnimators;
            if (r)
              for (var i = 0; i < r.length; i++) {
                var n = r[i].getTrack(t);
                n && (e = n);
              }
            return e;
          }),
          (t.prototype.start = function (t) {
            if (!(this._started > 0)) {
              this._started = 1;
              for (
                var e = this, r = [], i = this._maxTime || 0, n = 0;
                n < this._trackKeys.length;
                n++
              ) {
                var o = this._trackKeys[n],
                  a = this._tracks[o],
                  h = this._getAdditiveTrack(o),
                  l = a.keyframes,
                  u = l.length;
                if ((a.prepare(i, h), a.needsAnimate()))
                  if (!this._allowDiscrete && a.discrete) {
                    var c = l[u - 1];
                    (c && (e._target[a.propName] = c.rawValue), a.setFinished());
                  } else r.push(a);
              }
              if (r.length || this._force) {
                var f = new s({
                  life: i,
                  loop: this._loop,
                  delay: this._delay || 0,
                  onframe: function (t) {
                    e._started = 2;
                    var i = e._additiveAnimators;
                    if (i) {
                      for (var n = !1, o = 0; o < i.length; o++)
                        if (i[o]._clip) {
                          n = !0;
                          break;
                        }
                      n || (e._additiveAnimators = null);
                    }
                    for (o = 0; o < r.length; o++) r[o].step(e._target, t);
                    var a = e._onframeCbs;
                    if (a) for (o = 0; o < a.length; o++) a[o](e._target, t);
                  },
                  ondestroy: function () {
                    e._doneCallback();
                  },
                });
                ((this._clip = f),
                  this.animation && this.animation.addClip(f),
                  t && f.setEasing(t));
              } else this._doneCallback();
              return this;
            }
          }),
          (t.prototype.stop = function (t) {
            if (this._clip) {
              var e = this._clip;
              (t && e.onframe(1), this._abortedCallback());
            }
          }),
          (t.prototype.delay = function (t) {
            return ((this._delay = t), this);
          }),
          (t.prototype.during = function (t) {
            return (
              t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)),
              this
            );
          }),
          (t.prototype.done = function (t) {
            return (t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this);
          }),
          (t.prototype.aborted = function (t) {
            return (
              t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)),
              this
            );
          }),
          (t.prototype.getClip = function () {
            return this._clip;
          }),
          (t.prototype.getTrack = function (t) {
            return this._tracks[t];
          }),
          (t.prototype.getTracks = function () {
            var t = this;
            return (0, o.map)(this._trackKeys, function (e) {
              return t._tracks[e];
            });
          }),
          (t.prototype.stopTracks = function (t, e) {
            if (!t.length || !this._clip) return !0;
            for (var r = this._tracks, i = this._trackKeys, n = 0; n < t.length; n++) {
              var o = r[t[n]];
              o &&
                !o.isFinished() &&
                (e ? o.step(this._target, 1) : 1 === this._started && o.step(this._target, 0),
                o.setFinished());
            }
            var a = !0;
            for (n = 0; n < i.length; n++)
              if (!r[i[n]].isFinished()) {
                a = !1;
                break;
              }
            return (a && this._abortedCallback(), a);
          }),
          (t.prototype.saveTo = function (t, e, r) {
            if (t) {
              e = e || this._trackKeys;
              for (var i = 0; i < e.length; i++) {
                var n = e[i],
                  o = this._tracks[n];
                if (o && !o.isFinished()) {
                  var a = o.keyframes,
                    s = a[r ? 0 : a.length - 1];
                  s && (t[n] = g(s.rawValue));
                }
              }
            }
          }),
          (t.prototype.__changeFinalValue = function (t, e) {
            e = e || (0, o.keys)(t);
            for (var r = 0; r < e.length; r++) {
              var i = e[r],
                n = this._tracks[i];
              if (n) {
                var a = n.keyframes;
                if (a.length > 1) {
                  var s = a.pop();
                  (n.addKeyframe(s.time, t[i]), n.prepare(this._maxTime, n.getAdditiveTrack()));
                }
              }
            }
          }),
          t
        );
      })();
    },
    496320: (t, e, r) => {
      r.d(e, { w: () => a });
      var i = r(989259),
        n = r(498026),
        o = /cubic-bezier\(([0-9,\.e ]+)\)/;
      function a(t) {
        var e = t && o.exec(t);
        if (e) {
          var r = e[1].split(','),
            a = +(0, n.trim)(r[0]),
            s = +(0, n.trim)(r[1]),
            h = +(0, n.trim)(r[2]),
            l = +(0, n.trim)(r[3]);
          if (isNaN(a + s + h + l)) return;
          var u = [];
          return function (t) {
            return t <= 0
              ? 0
              : t >= 1
                ? 1
                : (0, i._E)(0, a, h, 1, t, u) && (0, i.Yb)(0, s, l, 1, u[0]);
          };
        }
      }
    },
    445825: (t, e, r) => {
      r.d(e, { A: () => i });
      const i =
        (r(738123).A.hasGlobalWindow &&
          ((window.requestAnimationFrame && window.requestAnimationFrame.bind(window)) ||
            (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window)) ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame)) ||
        function (t) {
          return setTimeout(t, 16);
        };
    },
    130536: (t, e, r) => {
      r.d(e, { A: () => x });
      var i = r(73098),
        n = r(498026),
        o = r(15215),
        a = r(757861),
        s = r(153479),
        h = r(329571),
        l = r(529308),
        u = r(756448),
        c = r(259741);
      function f(t, e, r) {
        var i = c.yh.createCanvas(),
          n = e.getWidth(),
          o = e.getHeight(),
          a = i.style;
        return (
          a &&
            ((a.position = 'absolute'),
            (a.left = '0'),
            (a.top = '0'),
            (a.width = n + 'px'),
            (a.height = o + 'px'),
            i.setAttribute('data-zr-dom-id', t)),
          (i.width = n * r),
          (i.height = o * r),
          i
        );
      }
      const p = (function (t) {
        function e(e, r, o) {
          var a,
            s = t.call(this) || this;
          ((s.motionBlur = !1),
            (s.lastFrameAlpha = 0.7),
            (s.dpr = 1),
            (s.virtual = !1),
            (s.config = {}),
            (s.incremental = !1),
            (s.zlevel = 0),
            (s.maxRepaintRectCount = 5),
            (s.__dirty = !0),
            (s.__firstTimePaint = !0),
            (s.__used = !1),
            (s.__drawIndex = 0),
            (s.__startIndex = 0),
            (s.__endIndex = 0),
            (s.__prevStartIndex = null),
            (s.__prevEndIndex = null),
            (o = o || i.Y5),
            'string' == typeof e ? (a = f(e, r, o)) : n.isObject(e) && (e = (a = e).id),
            (s.id = e),
            (s.dom = a));
          var h = a.style;
          return (
            h &&
              (n.disableUserSelect(a),
              (a.onselectstart = function () {
                return !1;
              }),
              (h.padding = '0'),
              (h.margin = '0'),
              (h.borderWidth = '0')),
            (s.painter = r),
            (s.dpr = o),
            s
          );
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.getElementCount = function () {
            return this.__endIndex - this.__startIndex;
          }),
          (e.prototype.afterBrush = function () {
            ((this.__prevStartIndex = this.__startIndex), (this.__prevEndIndex = this.__endIndex));
          }),
          (e.prototype.initContext = function () {
            ((this.ctx = this.dom.getContext('2d')), (this.ctx.dpr = this.dpr));
          }),
          (e.prototype.setUnpainted = function () {
            this.__firstTimePaint = !0;
          }),
          (e.prototype.createBackBuffer = function () {
            var t = this.dpr;
            ((this.domBack = f('back-' + this.id, this.painter, t)),
              (this.ctxBack = this.domBack.getContext('2d')),
              1 !== t && this.ctxBack.scale(t, t));
          }),
          (e.prototype.createRepaintRects = function (t, e, r, i) {
            if (this.__firstTimePaint) return ((this.__firstTimePaint = !1), null);
            var n,
              o = [],
              a = this.maxRepaintRectCount,
              s = !1,
              h = new l.A(0, 0, 0, 0);
            function c(t) {
              if (t.isFinite() && !t.isZero())
                if (0 === o.length) ((e = new l.A(0, 0, 0, 0)).copy(t), o.push(e));
                else {
                  for (var e, r = !1, i = 1 / 0, n = 0, u = 0; u < o.length; ++u) {
                    var c = o[u];
                    if (c.intersect(t)) {
                      var f = new l.A(0, 0, 0, 0);
                      (f.copy(c), f.union(t), (o[u] = f), (r = !0));
                      break;
                    }
                    if (s) {
                      (h.copy(t), h.union(c));
                      var p = t.width * t.height,
                        d = c.width * c.height,
                        y = h.width * h.height - p - d;
                      y < i && ((i = y), (n = u));
                    }
                  }
                  (s && (o[n].union(t), (r = !0)),
                    r || ((e = new l.A(0, 0, 0, 0)).copy(t), o.push(e)),
                    s || (s = o.length >= a));
                }
            }
            for (var f = this.__startIndex; f < this.__endIndex; ++f)
              if ((y = t[f])) {
                var p = y.shouldBePainted(r, i, !0, !0);
                (v = y.__isRendered && (y.__dirty & u.M || !p) ? y.getPrevPaintRect() : null) &&
                  c(v);
                var d = p && (y.__dirty & u.M || !y.__isRendered) ? y.getPaintRect() : null;
                d && c(d);
              }
            for (f = this.__prevStartIndex; f < this.__prevEndIndex; ++f) {
              var y, v;
              ((p = (y = e[f]) && y.shouldBePainted(r, i, !0, !0)),
                !y || (p && y.__zr) || !y.__isRendered || ((v = y.getPrevPaintRect()) && c(v)));
            }
            do {
              for (n = !1, f = 0; f < o.length;)
                if (o[f].isZero()) o.splice(f, 1);
                else {
                  for (var g = f + 1; g < o.length;)
                    o[f].intersect(o[g]) ? ((n = !0), o[f].union(o[g]), o.splice(g, 1)) : g++;
                  f++;
                }
            } while (n);
            return ((this._paintRects = o), o);
          }),
          (e.prototype.debugGetPaintRects = function () {
            return (this._paintRects || []).slice();
          }),
          (e.prototype.resize = function (t, e) {
            var r = this.dpr,
              i = this.dom,
              n = i.style,
              o = this.domBack;
            (n && ((n.width = t + 'px'), (n.height = e + 'px')),
              (i.width = t * r),
              (i.height = e * r),
              o && ((o.width = t * r), (o.height = e * r), 1 !== r && this.ctxBack.scale(r, r)));
          }),
          (e.prototype.clear = function (t, e, r) {
            var i = this.dom,
              o = this.ctx,
              a = i.width,
              l = i.height;
            e = e || this.clearColor;
            var u = this.motionBlur && !t,
              c = this.lastFrameAlpha,
              f = this.dpr,
              p = this;
            u &&
              (this.domBack || this.createBackBuffer(),
              (this.ctxBack.globalCompositeOperation = 'copy'),
              this.ctxBack.drawImage(i, 0, 0, a / f, l / f));
            var d = this.domBack;
            function y(t, r, i, a) {
              if ((o.clearRect(t, r, i, a), e && 'transparent' !== e)) {
                var l = void 0;
                (n.isGradientObject(e)
                  ? ((l =
                      ((e.global || (e.__width === i && e.__height === a)) && e.__canvasGradient) ||
                      (0, s.Ff)(o, e, { x: 0, y: 0, width: i, height: a })),
                    (e.__canvasGradient = l),
                    (e.__width = i),
                    (e.__height = a))
                  : n.isImagePatternObject(e) &&
                    ((e.scaleX = e.scaleX || f),
                    (e.scaleY = e.scaleY || f),
                    (l = (0, h.ZQ)(o, e, {
                      dirty: function () {
                        (p.setUnpainted(), p.painter.refresh());
                      },
                    }))),
                  o.save(),
                  (o.fillStyle = l || e),
                  o.fillRect(t, r, i, a),
                  o.restore());
              }
              u && (o.save(), (o.globalAlpha = c), o.drawImage(d, t, r, i, a), o.restore());
            }
            !r || u
              ? y(0, 0, a, l)
              : r.length &&
                n.each(r, function (t) {
                  y(t.x * f, t.y * f, t.width * f, t.height * f);
                });
          }),
          e
        );
      })(a.A);
      var d = r(445825),
        y = r(738123),
        v = 1e5,
        g = 314159,
        _ = 0.01,
        m = (function () {
          function t(t, e, r, o) {
            ((this.type = 'canvas'),
              (this._zlevelList = []),
              (this._prevDisplayList = []),
              (this._layers = {}),
              (this._layerConfig = {}),
              (this._needsManuallyCompositing = !1),
              (this.type = 'canvas'));
            var a = !t.nodeName || 'CANVAS' === t.nodeName.toUpperCase();
            ((this._opts = r = n.extend({}, r || {})),
              (this.dpr = r.devicePixelRatio || i.Y5),
              (this._singleCanvas = a),
              (this.root = t),
              t.style && (n.disableUserSelect(t), (t.innerHTML = '')),
              (this.storage = e));
            var h = this._zlevelList;
            this._prevDisplayList = [];
            var l = this._layers;
            if (a) {
              var u = t,
                c = u.width,
                f = u.height;
              (null != r.width && (c = r.width),
                null != r.height && (f = r.height),
                (this.dpr = r.devicePixelRatio || 1),
                (u.width = c * this.dpr),
                (u.height = f * this.dpr),
                (this._width = c),
                (this._height = f));
              var d = new p(u, this, this.dpr);
              ((d.__builtin__ = !0),
                d.initContext(),
                (l[314159] = d),
                (d.zlevel = g),
                h.push(g),
                (this._domRoot = t));
            } else {
              ((this._width = (0, s.YC)(t, 0, r)), (this._height = (0, s.YC)(t, 1, r)));
              var y = (this._domRoot = (function (t, e) {
                var r = document.createElement('div');
                return (
                  (r.style.cssText =
                    [
                      'position:relative',
                      'width:' + t + 'px',
                      'height:' + e + 'px',
                      'padding:0',
                      'margin:0',
                      'border-width:0',
                    ].join(';') + ';'),
                  r
                );
              })(this._width, this._height));
              t.appendChild(y);
            }
          }
          return (
            (t.prototype.getType = function () {
              return 'canvas';
            }),
            (t.prototype.isSingleCanvas = function () {
              return this._singleCanvas;
            }),
            (t.prototype.getViewportRoot = function () {
              return this._domRoot;
            }),
            (t.prototype.getViewportRootOffset = function () {
              var t = this.getViewportRoot();
              if (t) return { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 };
            }),
            (t.prototype.refresh = function (t) {
              var e = this.storage.getDisplayList(!0),
                r = this._prevDisplayList,
                i = this._zlevelList;
              ((this._redrawId = Math.random()), this._paintList(e, r, t, this._redrawId));
              for (var n = 0; n < i.length; n++) {
                var o = i[n],
                  a = this._layers[o];
                if (!a.__builtin__ && a.refresh) {
                  var s = 0 === n ? this._backgroundColor : null;
                  a.refresh(s);
                }
              }
              return (this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this);
            }),
            (t.prototype.refreshHover = function () {
              this._paintHoverList(this.storage.getDisplayList(!1));
            }),
            (t.prototype._paintHoverList = function (t) {
              var e = t.length,
                r = this._hoverlayer;
              if ((r && r.clear(), e)) {
                for (
                  var i,
                    n = { inHover: !0, viewWidth: this._width, viewHeight: this._height },
                    o = 0;
                  o < e;
                  o++
                ) {
                  var a = t[o];
                  a.__inHover &&
                    (r || (r = this._hoverlayer = this.getLayer(v)),
                    i || (i = r.ctx).save(),
                    (0, h.V$)(i, a, n, o === e - 1));
                }
                i && i.restore();
              }
            }),
            (t.prototype.getHoverLayer = function () {
              return this.getLayer(v);
            }),
            (t.prototype.paintOne = function (t, e) {
              (0, h.Xi)(t, e);
            }),
            (t.prototype._paintList = function (t, e, r, i) {
              if (this._redrawId === i) {
                ((r = r || !1), this._updateLayerStatus(t));
                var n = this._doPaintList(t, e, r),
                  o = n.finished,
                  a = n.needsRefreshHover;
                if (
                  (this._needsManuallyCompositing && this._compositeManually(),
                  a && this._paintHoverList(t),
                  o)
                )
                  this.eachLayer(function (t) {
                    t.afterBrush && t.afterBrush();
                  });
                else {
                  var s = this;
                  (0, d.A)(function () {
                    s._paintList(t, e, r, i);
                  });
                }
              }
            }),
            (t.prototype._compositeManually = function () {
              var t = this.getLayer(g).ctx,
                e = this._domRoot.width,
                r = this._domRoot.height;
              (t.clearRect(0, 0, e, r),
                this.eachBuiltinLayer(function (i) {
                  i.virtual && t.drawImage(i.dom, 0, 0, e, r);
                }));
            }),
            (t.prototype._doPaintList = function (t, e, r) {
              for (
                var i = this, o = [], a = this._opts.useDirtyRect, s = 0;
                s < this._zlevelList.length;
                s++
              ) {
                var h = this._zlevelList[s],
                  l = this._layers[h];
                l.__builtin__ && l !== this._hoverlayer && (l.__dirty || r) && o.push(l);
              }
              for (
                var u = !0,
                  c = !1,
                  f = function (n) {
                    var s,
                      h = o[n],
                      l = h.ctx,
                      f = a && h.createRepaintRects(t, e, p._width, p._height),
                      d = r ? h.__startIndex : h.__drawIndex,
                      y = !r && h.incremental && Date.now,
                      v = y && Date.now(),
                      g = h.zlevel === p._zlevelList[0] ? p._backgroundColor : null;
                    if (h.__startIndex === h.__endIndex) h.clear(!1, g, f);
                    else if (d === h.__startIndex) {
                      var _ = t[d];
                      (_.incremental && _.notClear && !r) || h.clear(!1, g, f);
                    }
                    -1 === d &&
                      (console.error('For some unknown reason. drawIndex is -1'),
                      (d = h.__startIndex));
                    var m = function (e) {
                      var r = {
                        inHover: !1,
                        allClipped: !1,
                        prevEl: null,
                        viewWidth: i._width,
                        viewHeight: i._height,
                      };
                      for (s = d; s < h.__endIndex; s++) {
                        var n = t[s];
                        if (
                          (n.__inHover && (c = !0),
                          i._doPaintEl(n, h, a, e, r, s === h.__endIndex - 1),
                          y && Date.now() - v > 15)
                        )
                          break;
                      }
                      r.prevElClipPaths && l.restore();
                    };
                    if (f)
                      if (0 === f.length) s = h.__endIndex;
                      else
                        for (var x = p.dpr, w = 0; w < f.length; ++w) {
                          var b = f[w];
                          (l.save(),
                            l.beginPath(),
                            l.rect(b.x * x, b.y * x, b.width * x, b.height * x),
                            l.clip(),
                            m(b),
                            l.restore());
                        }
                    else (l.save(), m(), l.restore());
                    ((h.__drawIndex = s), h.__drawIndex < h.__endIndex && (u = !1));
                  },
                  p = this,
                  d = 0;
                d < o.length;
                d++
              )
                f(d);
              return (
                y.A.wxa &&
                  n.each(this._layers, function (t) {
                    t && t.ctx && t.ctx.draw && t.ctx.draw();
                  }),
                { finished: u, needsRefreshHover: c }
              );
            }),
            (t.prototype._doPaintEl = function (t, e, r, i, n, o) {
              var a = e.ctx;
              if (r) {
                var s = t.getPaintRect();
                (!i || (s && s.intersect(i))) && ((0, h.V$)(a, t, n, o), t.setPrevPaintRect(s));
              } else (0, h.V$)(a, t, n, o);
            }),
            (t.prototype.getLayer = function (t, e) {
              this._singleCanvas && !this._needsManuallyCompositing && (t = g);
              var r = this._layers[t];
              return (
                r ||
                  (((r = new p('zr_' + t, this, this.dpr)).zlevel = t),
                  (r.__builtin__ = !0),
                  this._layerConfig[t]
                    ? n.merge(r, this._layerConfig[t], !0)
                    : this._layerConfig[t - _] && n.merge(r, this._layerConfig[t - _], !0),
                  e && (r.virtual = e),
                  this.insertLayer(t, r),
                  r.initContext()),
                r
              );
            }),
            (t.prototype.insertLayer = function (t, e) {
              var r = this._layers,
                i = this._zlevelList,
                n = i.length,
                o = this._domRoot,
                a = null,
                s = -1;
              if (
                !r[t] &&
                (function (t) {
                  return (
                    !!t &&
                    (!!t.__builtin__ ||
                      ('function' == typeof t.resize && 'function' == typeof t.refresh))
                  );
                })(e)
              ) {
                if (n > 0 && t > i[0]) {
                  for (s = 0; s < n - 1 && !(i[s] < t && i[s + 1] > t); s++);
                  a = r[i[s]];
                }
                if ((i.splice(s + 1, 0, t), (r[t] = e), !e.virtual))
                  if (a) {
                    var h = a.dom;
                    h.nextSibling ? o.insertBefore(e.dom, h.nextSibling) : o.appendChild(e.dom);
                  } else o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
                e.painter || (e.painter = this);
              }
            }),
            (t.prototype.eachLayer = function (t, e) {
              for (var r = this._zlevelList, i = 0; i < r.length; i++) {
                var n = r[i];
                t.call(e, this._layers[n], n);
              }
            }),
            (t.prototype.eachBuiltinLayer = function (t, e) {
              for (var r = this._zlevelList, i = 0; i < r.length; i++) {
                var n = r[i],
                  o = this._layers[n];
                o.__builtin__ && t.call(e, o, n);
              }
            }),
            (t.prototype.eachOtherLayer = function (t, e) {
              for (var r = this._zlevelList, i = 0; i < r.length; i++) {
                var n = r[i],
                  o = this._layers[n];
                o.__builtin__ || t.call(e, o, n);
              }
            }),
            (t.prototype.getLayers = function () {
              return this._layers;
            }),
            (t.prototype._updateLayerStatus = function (t) {
              function e(t) {
                a && (a.__endIndex !== t && (a.__dirty = !0), (a.__endIndex = t));
              }
              if (
                (this.eachBuiltinLayer(function (t, e) {
                  t.__dirty = t.__used = !1;
                }),
                this._singleCanvas)
              )
                for (var r = 1; r < t.length; r++)
                  if ((h = t[r]).zlevel !== t[r - 1].zlevel || h.incremental) {
                    this._needsManuallyCompositing = !0;
                    break;
                  }
              var i,
                o,
                a = null,
                s = 0;
              for (o = 0; o < t.length; o++) {
                var h,
                  l = (h = t[o]).zlevel,
                  c = void 0;
                (i !== l && ((i = l), (s = 0)),
                  h.incremental
                    ? (((c = this.getLayer(l + 0.001, this._needsManuallyCompositing)).incremental =
                        !0),
                      (s = 1))
                    : (c = this.getLayer(l + (s > 0 ? _ : 0), this._needsManuallyCompositing)),
                  c.__builtin__ ||
                    n.logError('ZLevel ' + l + ' has been used by unkown layer ' + c.id),
                  c !== a &&
                    ((c.__used = !0),
                    c.__startIndex !== o && (c.__dirty = !0),
                    (c.__startIndex = o),
                    c.incremental ? (c.__drawIndex = -1) : (c.__drawIndex = o),
                    e(o),
                    (a = c)),
                  h.__dirty & u.M &&
                    !h.__inHover &&
                    ((c.__dirty = !0), c.incremental && c.__drawIndex < 0 && (c.__drawIndex = o)));
              }
              (e(o),
                this.eachBuiltinLayer(function (t, e) {
                  (!t.__used &&
                    t.getElementCount() > 0 &&
                    ((t.__dirty = !0), (t.__startIndex = t.__endIndex = t.__drawIndex = 0)),
                    t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex));
                }));
            }),
            (t.prototype.clear = function () {
              return (this.eachBuiltinLayer(this._clearLayer), this);
            }),
            (t.prototype._clearLayer = function (t) {
              t.clear();
            }),
            (t.prototype.setBackgroundColor = function (t) {
              ((this._backgroundColor = t),
                n.each(this._layers, function (t) {
                  t.setUnpainted();
                }));
            }),
            (t.prototype.configLayer = function (t, e) {
              if (e) {
                var r = this._layerConfig;
                r[t] ? n.merge(r[t], e, !0) : (r[t] = e);
                for (var i = 0; i < this._zlevelList.length; i++) {
                  var o = this._zlevelList[i];
                  if (o === t || o === t + _) {
                    var a = this._layers[o];
                    n.merge(a, r[t], !0);
                  }
                }
              }
            }),
            (t.prototype.delLayer = function (t) {
              var e = this._layers,
                r = this._zlevelList,
                i = e[t];
              i && (i.dom.parentNode.removeChild(i.dom), delete e[t], r.splice(n.indexOf(r, t), 1));
            }),
            (t.prototype.resize = function (t, e) {
              if (this._domRoot.style) {
                var r = this._domRoot;
                r.style.display = 'none';
                var i = this._opts,
                  n = this.root;
                if (
                  (null != t && (i.width = t),
                  null != e && (i.height = e),
                  (t = (0, s.YC)(n, 0, i)),
                  (e = (0, s.YC)(n, 1, i)),
                  (r.style.display = ''),
                  this._width !== t || e !== this._height)
                ) {
                  for (var o in ((r.style.width = t + 'px'),
                  (r.style.height = e + 'px'),
                  this._layers))
                    this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
                  this.refresh(!0);
                }
                ((this._width = t), (this._height = e));
              } else {
                if (null == t || null == e) return;
                ((this._width = t), (this._height = e), this.getLayer(g).resize(t, e));
              }
              return this;
            }),
            (t.prototype.clearLayer = function (t) {
              var e = this._layers[t];
              e && e.clear();
            }),
            (t.prototype.dispose = function () {
              ((this.root.innerHTML = ''),
                (this.root = this.storage = this._domRoot = this._layers = null));
            }),
            (t.prototype.getRenderedCanvas = function (t) {
              if (((t = t || {}), this._singleCanvas && !this._compositeManually))
                return this._layers[314159].dom;
              var e = new p('image', this, t.pixelRatio || this.dpr);
              (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor));
              var r = e.ctx;
              if (t.pixelRatio <= this.dpr) {
                this.refresh();
                var i = e.dom.width,
                  n = e.dom.height;
                this.eachLayer(function (t) {
                  t.__builtin__
                    ? r.drawImage(t.dom, 0, 0, i, n)
                    : t.renderToCanvas && (r.save(), t.renderToCanvas(r), r.restore());
                });
              } else
                for (
                  var o = { inHover: !1, viewWidth: this._width, viewHeight: this._height },
                    a = this.storage.getDisplayList(!0),
                    s = 0,
                    l = a.length;
                  s < l;
                  s++
                ) {
                  var u = a[s];
                  (0, h.V$)(r, u, o, s === l - 1);
                }
              return e.dom;
            }),
            (t.prototype.getWidth = function () {
              return this._width;
            }),
            (t.prototype.getHeight = function () {
              return this._height;
            }),
            t
          );
        })();
      const x = m;
    },
    576050: (t, e, r) => {
      r.d(e, { V: () => n });
      var i = r(498026);
      function n(t) {
        var e,
          r,
          n = t.style,
          o =
            n.lineDash &&
            n.lineWidth > 0 &&
            ((e = n.lineDash),
            (r = n.lineWidth),
            e && 'solid' !== e && r > 0
              ? 'dashed' === e
                ? [4 * r, 2 * r]
                : 'dotted' === e
                  ? [r]
                  : (0, i.isNumber)(e)
                    ? [e]
                    : (0, i.isArray)(e)
                      ? e
                      : null
              : null),
          a = n.lineDashOffset;
        if (o) {
          var s = n.strokeNoScale && t.getLineScale ? t.getLineScale() : 1;
          s &&
            1 !== s &&
            ((o = (0, i.map)(o, function (t) {
              return t / s;
            })),
            (a /= s));
        }
        return [o, a];
      }
    },
    329571: (t, e, r) => {
      r.d(e, { V$: () => R, Xi: () => D, ZQ: () => x });
      var i = r(171519),
        n = r(368717),
        o = r(212191),
        a = r(153479),
        s = r(467065),
        h = r(390540),
        l = r(619845),
        u = r(498026),
        c = r(576050),
        f = r(756448),
        p = r(259741),
        d = new n.A(!0);
      function y(t) {
        var e = t.stroke;
        return !(null == e || 'none' === e || !(t.lineWidth > 0));
      }
      function v(t) {
        return 'string' == typeof t && 'none' !== t;
      }
      function g(t) {
        var e = t.fill;
        return null != e && 'none' !== e;
      }
      function _(t, e) {
        if (null != e.fillOpacity && 1 !== e.fillOpacity) {
          var r = t.globalAlpha;
          ((t.globalAlpha = e.fillOpacity * e.opacity), t.fill(), (t.globalAlpha = r));
        } else t.fill();
      }
      function m(t, e) {
        if (null != e.strokeOpacity && 1 !== e.strokeOpacity) {
          var r = t.globalAlpha;
          ((t.globalAlpha = e.strokeOpacity * e.opacity), t.stroke(), (t.globalAlpha = r));
        } else t.stroke();
      }
      function x(t, e, r) {
        var i = (0, o.OD)(e.image, e.__image, r);
        if ((0, o.xA)(i)) {
          var n = t.createPattern(i, e.repeat || 'repeat');
          if ('function' == typeof DOMMatrix && n && n.setTransform) {
            var a = new DOMMatrix();
            (a.translateSelf(e.x || 0, e.y || 0),
              a.rotateSelf(0, 0, (e.rotation || 0) * u.RADIAN_TO_DEGREE),
              a.scaleSelf(e.scaleX || 1, e.scaleY || 1),
              n.setTransform(a));
          }
          return n;
        }
      }
      var w = ['shadowBlur', 'shadowOffsetX', 'shadowOffsetY'],
        b = [
          ['lineCap', 'butt'],
          ['lineJoin', 'miter'],
          ['miterLimit', 10],
        ];
      function k(t, e, r, n, o) {
        var a = !1;
        if (!n && e === (r = r || {})) return !1;
        if (n || e.opacity !== r.opacity) {
          (O(t, o), (a = !0));
          var s = Math.max(Math.min(e.opacity, 1), 0);
          t.globalAlpha = isNaN(s) ? i.oN.opacity : s;
        }
        (n || e.blend !== r.blend) &&
          (a || (O(t, o), (a = !0)), (t.globalCompositeOperation = e.blend || i.oN.blend));
        for (var h = 0; h < w.length; h++) {
          var l = w[h];
          (n || e[l] !== r[l]) && (a || (O(t, o), (a = !0)), (t[l] = t.dpr * (e[l] || 0)));
        }
        return (
          (n || e.shadowColor !== r.shadowColor) &&
            (a || (O(t, o), (a = !0)), (t.shadowColor = e.shadowColor || i.oN.shadowColor)),
          a
        );
      }
      function S(t, e, r, i, n) {
        var o = L(e, n.inHover),
          a = i ? null : (r && L(r, n.inHover)) || {};
        if (o === a) return !1;
        var s = k(t, o, a, i, n);
        if (
          ((i || o.fill !== a.fill) &&
            (s || (O(t, n), (s = !0)), v(o.fill) && (t.fillStyle = o.fill)),
          (i || o.stroke !== a.stroke) &&
            (s || (O(t, n), (s = !0)), v(o.stroke) && (t.strokeStyle = o.stroke)),
          (i || o.opacity !== a.opacity) &&
            (s || (O(t, n), (s = !0)), (t.globalAlpha = null == o.opacity ? 1 : o.opacity)),
          e.hasStroke())
        ) {
          var h = o.lineWidth / (o.strokeNoScale && e.getLineScale ? e.getLineScale() : 1);
          t.lineWidth !== h && (s || (O(t, n), (s = !0)), (t.lineWidth = h));
        }
        for (var l = 0; l < b.length; l++) {
          var u = b[l],
            c = u[0];
          (i || o[c] !== a[c]) && (s || (O(t, n), (s = !0)), (t[c] = o[c] || u[1]));
        }
        return s;
      }
      function T(t, e) {
        var r = e.transform,
          i = t.dpr || 1;
        r
          ? t.setTransform(i * r[0], i * r[1], i * r[2], i * r[3], i * r[4], i * r[5])
          : t.setTransform(i, 0, 0, i, 0, 0);
      }
      var A = 1,
        C = 2,
        P = 3,
        M = 4;
      function O(t, e) {
        (e.batchFill && t.fill(),
          e.batchStroke && t.stroke(),
          (e.batchFill = ''),
          (e.batchStroke = ''));
      }
      function L(t, e) {
        return (e && t.__hoverStyle) || t.style;
      }
      function D(t, e) {
        R(t, e, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
      }
      function R(t, e, r, i) {
        var n = e.transform;
        if (!e.shouldBePainted(r.viewWidth, r.viewHeight, !1, !1))
          return ((e.__dirty &= ~f.M), void (e.__isRendered = !1));
        var u = e.__clipPaths,
          v = r.prevElClipPaths,
          w = !1,
          b = !1;
        if (
          ((v && !(0, a.KU)(u, v)) ||
            (v &&
              v.length &&
              (O(t, r),
              t.restore(),
              (b = w = !0),
              (r.prevElClipPaths = null),
              (r.allClipped = !1),
              (r.prevEl = null)),
            u &&
              u.length &&
              (O(t, r),
              t.save(),
              (function (t, e, r) {
                for (var i = !1, n = 0; n < t.length; n++) {
                  var o = t[n];
                  ((i = i || o.isZeroArea()),
                    T(e, o),
                    e.beginPath(),
                    o.buildPath(e, o.shape),
                    e.clip());
                }
                r.allClipped = i;
              })(u, t, r),
              (w = !0)),
            (r.prevElClipPaths = u)),
          r.allClipped)
        )
          e.__isRendered = !1;
        else {
          (e.beforeBrush && e.beforeBrush(), e.innerBeforeBrush());
          var D = r.prevEl;
          D || (b = w = !0);
          var z,
            I,
            B =
              e instanceof s.Ay &&
              e.autoBatch &&
              (function (t) {
                var e = g(t),
                  r = y(t);
                return !(
                  t.lineDash ||
                  !(+e ^ +r) ||
                  (e && 'string' != typeof t.fill) ||
                  (r && 'string' != typeof t.stroke) ||
                  t.strokePercent < 1 ||
                  t.strokeOpacity < 1 ||
                  t.fillOpacity < 1
                );
              })(e.style);
          w ||
          ((z = n),
          (I = D.transform),
          z && I
            ? z[0] !== I[0] ||
              z[1] !== I[1] ||
              z[2] !== I[2] ||
              z[3] !== I[3] ||
              z[4] !== I[4] ||
              z[5] !== I[5]
            : z || I)
            ? (O(t, r), T(t, e))
            : B || O(t, r);
          var F = L(e, r.inHover);
          (e instanceof s.Ay
            ? (r.lastDrawType !== A && ((b = !0), (r.lastDrawType = A)),
              S(t, e, D, b, r),
              (B && (r.batchFill || r.batchStroke)) || t.beginPath(),
              (function (t, e, r, i) {
                var n,
                  o = y(r),
                  s = g(r),
                  h = r.strokePercent,
                  l = h < 1,
                  u = !e.path;
                (e.silent && !l) || !u || e.createPathProxy();
                var p = e.path || d,
                  v = e.__dirty;
                if (!i) {
                  var w = r.fill,
                    b = r.stroke,
                    k = s && !!w.colorStops,
                    S = o && !!b.colorStops,
                    T = s && !!w.image,
                    A = o && !!b.image,
                    C = void 0,
                    P = void 0,
                    M = void 0,
                    O = void 0,
                    L = void 0;
                  ((k || S) && (L = e.getBoundingRect()),
                    k &&
                      ((C = v ? (0, a.Ff)(t, w, L) : e.__canvasFillGradient),
                      (e.__canvasFillGradient = C)),
                    S &&
                      ((P = v ? (0, a.Ff)(t, b, L) : e.__canvasStrokeGradient),
                      (e.__canvasStrokeGradient = P)),
                    T &&
                      ((M = v || !e.__canvasFillPattern ? x(t, w, e) : e.__canvasFillPattern),
                      (e.__canvasFillPattern = M)),
                    A &&
                      ((O = v || !e.__canvasStrokePattern ? x(t, b, e) : e.__canvasStrokePattern),
                      (e.__canvasStrokePattern = M)),
                    k ? (t.fillStyle = C) : T && (M ? (t.fillStyle = M) : (s = !1)),
                    S ? (t.strokeStyle = P) : A && (O ? (t.strokeStyle = O) : (o = !1)));
                }
                var D,
                  R,
                  z = e.getGlobalScale();
                (p.setScale(z[0], z[1], e.segmentIgnoreThreshold),
                  t.setLineDash && r.lineDash && ((D = (n = (0, c.V)(e))[0]), (R = n[1])));
                var I = !0;
                ((u || v & f.Dl) &&
                  (p.setDPR(t.dpr),
                  l ? p.setContext(null) : (p.setContext(t), (I = !1)),
                  p.reset(),
                  e.buildPath(p, e.shape, i),
                  p.toStatic(),
                  e.pathUpdated()),
                  I && p.rebuildPath(t, l ? h : 1),
                  D && (t.setLineDash(D), (t.lineDashOffset = R)),
                  i ||
                    (r.strokeFirst ? (o && m(t, r), s && _(t, r)) : (s && _(t, r), o && m(t, r))),
                  D && t.setLineDash([]));
              })(t, e, F, B),
              B && ((r.batchFill = F.fill || ''), (r.batchStroke = F.stroke || '')))
            : e instanceof l.A
              ? (r.lastDrawType !== P && ((b = !0), (r.lastDrawType = P)),
                S(t, e, D, b, r),
                (function (t, e, r) {
                  var i,
                    n = r.text;
                  if ((null != n && (n += ''), n)) {
                    ((t.font = r.font || p.OH),
                      (t.textAlign = r.textAlign),
                      (t.textBaseline = r.textBaseline));
                    var o = void 0,
                      a = void 0;
                    (t.setLineDash && r.lineDash && ((o = (i = (0, c.V)(e))[0]), (a = i[1])),
                      o && (t.setLineDash(o), (t.lineDashOffset = a)),
                      r.strokeFirst
                        ? (y(r) && t.strokeText(n, r.x, r.y), g(r) && t.fillText(n, r.x, r.y))
                        : (g(r) && t.fillText(n, r.x, r.y), y(r) && t.strokeText(n, r.x, r.y)),
                      o && t.setLineDash([]));
                  }
                })(t, e, F))
              : e instanceof h.Ay
                ? (r.lastDrawType !== C && ((b = !0), (r.lastDrawType = C)),
                  (function (t, e, r, i, n) {
                    k(t, L(e, n.inHover), r && L(r, n.inHover), i, n);
                  })(t, e, D, b, r),
                  (function (t, e, r) {
                    var i = (e.__image = (0, o.OD)(r.image, e.__image, e, e.onload));
                    if (i && (0, o.xA)(i)) {
                      var n = r.x || 0,
                        a = r.y || 0,
                        s = e.getWidth(),
                        h = e.getHeight(),
                        l = i.width / i.height;
                      if (
                        (null == s && null != h
                          ? (s = h * l)
                          : null == h && null != s
                            ? (h = s / l)
                            : null == s && null == h && ((s = i.width), (h = i.height)),
                        r.sWidth && r.sHeight)
                      ) {
                        var u = r.sx || 0,
                          c = r.sy || 0;
                        t.drawImage(i, u, c, r.sWidth, r.sHeight, n, a, s, h);
                      } else if (r.sx && r.sy) {
                        var f = s - (u = r.sx),
                          p = h - (c = r.sy);
                        t.drawImage(i, u, c, f, p, n, a, s, h);
                      } else t.drawImage(i, n, a, s, h);
                    }
                  })(t, e, F))
                : e.getTemporalDisplayables &&
                  (r.lastDrawType !== M && ((b = !0), (r.lastDrawType = M)),
                  (function (t, e, r) {
                    var i = e.getDisplayables(),
                      n = e.getTemporalDisplayables();
                    t.save();
                    var o,
                      a,
                      s = {
                        prevElClipPaths: null,
                        prevEl: null,
                        allClipped: !1,
                        viewWidth: r.viewWidth,
                        viewHeight: r.viewHeight,
                        inHover: r.inHover,
                      };
                    for (o = e.getCursor(), a = i.length; o < a; o++)
                      ((u = i[o]).beforeBrush && u.beforeBrush(),
                        u.innerBeforeBrush(),
                        R(t, u, s, o === a - 1),
                        u.innerAfterBrush(),
                        u.afterBrush && u.afterBrush(),
                        (s.prevEl = u));
                    for (var h = 0, l = n.length; h < l; h++) {
                      var u;
                      ((u = n[h]).beforeBrush && u.beforeBrush(),
                        u.innerBeforeBrush(),
                        R(t, u, s, h === l - 1),
                        u.innerAfterBrush(),
                        u.afterBrush && u.afterBrush(),
                        (s.prevEl = u));
                    }
                    (e.clearTemporalDisplayables(), (e.notClear = !0), t.restore());
                  })(t, e, r)),
            B && i && O(t, r),
            e.innerAfterBrush(),
            e.afterBrush && e.afterBrush(),
            (r.prevEl = e),
            (e.__dirty = 0),
            (e.__isRendered = !0));
        }
      }
    },
    153479: (t, e, r) => {
      function i(t) {
        return isFinite(t);
      }
      function n(t, e, r) {
        for (
          var n =
              'radial' === e.type
                ? (function (t, e, r) {
                    var n = r.width,
                      o = r.height,
                      a = Math.min(n, o),
                      s = null == e.x ? 0.5 : e.x,
                      h = null == e.y ? 0.5 : e.y,
                      l = null == e.r ? 0.5 : e.r;
                    return (
                      e.global || ((s = s * n + r.x), (h = h * o + r.y), (l *= a)),
                      (s = i(s) ? s : 0.5),
                      (h = i(h) ? h : 0.5),
                      (l = l >= 0 && i(l) ? l : 0.5),
                      t.createRadialGradient(s, h, 0, s, h, l)
                    );
                  })(t, e, r)
                : (function (t, e, r) {
                    var n = null == e.x ? 0 : e.x,
                      o = null == e.x2 ? 1 : e.x2,
                      a = null == e.y ? 0 : e.y,
                      s = null == e.y2 ? 0 : e.y2;
                    return (
                      e.global ||
                        ((n = n * r.width + r.x),
                        (o = o * r.width + r.x),
                        (a = a * r.height + r.y),
                        (s = s * r.height + r.y)),
                      (n = i(n) ? n : 0),
                      (o = i(o) ? o : 1),
                      (a = i(a) ? a : 0),
                      (s = i(s) ? s : 0),
                      t.createLinearGradient(n, a, o, s)
                    );
                  })(t, e, r),
            o = e.colorStops,
            a = 0;
          a < o.length;
          a++
        )
          n.addColorStop(o[a].offset, o[a].color);
        return n;
      }
      function o(t, e) {
        if (t === e || (!t && !e)) return !1;
        if (!t || !e || t.length !== e.length) return !0;
        for (var r = 0; r < t.length; r++) if (t[r] !== e[r]) return !0;
        return !1;
      }
      function a(t) {
        return parseInt(t, 10);
      }
      function s(t, e, r) {
        var i = ['width', 'height'][e],
          n = ['clientWidth', 'clientHeight'][e],
          o = ['paddingLeft', 'paddingTop'][e],
          s = ['paddingRight', 'paddingBottom'][e];
        if (null != r[i] && 'auto' !== r[i]) return parseFloat(r[i]);
        var h = document.defaultView.getComputedStyle(t);
        return ((t[n] || a(h[i]) || a(t.style[i])) - (a(h[o]) || 0) - (a(h[s]) || 0)) | 0;
      }
      r.d(e, { Ff: () => n, KU: () => o, YC: () => s });
    },
    73098: (t, e, r) => {
      r.d(e, { Y5: () => n, _S: () => a, el: () => s, ps: () => o, tY: () => h });
      var i = 1;
      r(738123).A.hasGlobalWindow &&
        (i = Math.max(
          window.devicePixelRatio ||
            (window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI) ||
            1,
          1,
        ));
      var n = i,
        o = 0.4,
        a = '#333',
        s = '#ccc',
        h = '#eee';
    },
    957043: (t, e, r) => {
      function i(t, e, r, i, n, o, a) {
        if (0 === n) return !1;
        var s,
          h = n;
        if (
          (a > e + h && a > i + h) ||
          (a < e - h && a < i - h) ||
          (o > t + h && o > r + h) ||
          (o < t - h && o < r - h)
        )
          return !1;
        if (t === r) return Math.abs(o - t) <= h / 2;
        var l = (s = (e - i) / (t - r)) * o - a + (t * i - r * e) / (t - r);
        return (l * l) / (s * s + 1) <= ((h / 2) * h) / 2;
      }
      r.d(e, { l: () => i });
    },
    651183: (t, e, r) => {
      r.d(e, { l: () => a });
      var i = r(776873),
        n = 1e-8;
      function o(t, e) {
        return Math.abs(t - e) < n;
      }
      function a(t, e, r) {
        var n = 0,
          a = t[0];
        if (!a) return !1;
        for (var s = 1; s < t.length; s++) {
          var h = t[s];
          ((n += (0, i.A)(a[0], a[1], h[0], h[1], e, r)), (a = h));
        }
        var l = t[0];
        return (
          (o(a[0], l[0]) && o(a[1], l[1])) || (n += (0, i.A)(a[0], a[1], l[0], l[1], e, r)),
          0 !== n
        );
      }
    },
    714423: (t, e, r) => {
      r.d(e, { l: () => n });
      var i = r(989259);
      function n(t, e, r, n, o, a, s, h, l) {
        if (0 === s) return !1;
        var u = s;
        return (
          !(
            (l > e + u && l > n + u && l > a + u) ||
            (l < e - u && l < n - u && l < a - u) ||
            (h > t + u && h > r + u && h > o + u) ||
            (h < t - u && h < r - u && h < o - u)
          ) && (0, i.kh)(t, e, r, n, o, a, h, l, null) <= u / 2
        );
      }
    },
    945558: (t, e, r) => {
      r.d(e, {
        NO: () => l,
        RG: () => s,
        X4: () => d,
        ks: () => f,
        ll: () => u,
        lo: () => p,
        sZ: () => c,
      });
      var i = r(529308),
        n = r(160501),
        o = r(259741),
        a = {};
      function s(t, e) {
        e = e || o.OH;
        var r = a[e];
        r || (r = a[e] = new n.Ay(500));
        var i = r.get(t);
        return (null == i && ((i = o.yh.measureText(t, e).width), r.put(t, i)), i);
      }
      function h(t, e, r, n) {
        var o = s(t, e),
          a = f(e),
          h = u(0, o, r),
          l = c(0, a, n);
        return new i.A(h, l, o, a);
      }
      function l(t, e, r, n) {
        var o = ((t || '') + '').split('\n');
        if (1 === o.length) return h(o[0], e, r, n);
        for (var a = new i.A(0, 0, 0, 0), s = 0; s < o.length; s++) {
          var l = h(o[s], e, r, n);
          0 === s ? a.copy(l) : a.union(l);
        }
        return a;
      }
      function u(t, e, r) {
        return ('right' === r ? (t -= e) : 'center' === r && (t -= e / 2), t);
      }
      function c(t, e, r) {
        return ('middle' === r ? (t -= e / 2) : 'bottom' === r && (t -= e), t);
      }
      function f(t) {
        return s('国', t);
      }
      function p(t, e) {
        return 'string' == typeof t
          ? t.lastIndexOf('%') >= 0
            ? (parseFloat(t) / 100) * e
            : parseFloat(t)
          : t;
      }
      function d(t, e, r) {
        var i = e.position || 'inside',
          n = null != e.distance ? e.distance : 5,
          o = r.height,
          a = r.width,
          s = o / 2,
          h = r.x,
          l = r.y,
          u = 'left',
          c = 'top';
        if (i instanceof Array)
          ((h += p(i[0], r.width)), (l += p(i[1], r.height)), (u = null), (c = null));
        else
          switch (i) {
            case 'left':
              ((h -= n), (l += s), (u = 'right'), (c = 'middle'));
              break;
            case 'right':
              ((h += n + a), (l += s), (c = 'middle'));
              break;
            case 'top':
              ((h += a / 2), (l -= n), (u = 'center'), (c = 'bottom'));
              break;
            case 'bottom':
              ((h += a / 2), (l += o + n), (u = 'center'));
              break;
            case 'inside':
              ((h += a / 2), (l += s), (u = 'center'), (c = 'middle'));
              break;
            case 'insideLeft':
              ((h += n), (l += s), (c = 'middle'));
              break;
            case 'insideRight':
              ((h += a - n), (l += s), (u = 'right'), (c = 'middle'));
              break;
            case 'insideTop':
              ((h += a / 2), (l += n), (u = 'center'));
              break;
            case 'insideBottom':
              ((h += a / 2), (l += o - n), (u = 'center'), (c = 'bottom'));
              break;
            case 'insideTopLeft':
              ((h += n), (l += n));
              break;
            case 'insideTopRight':
              ((h += a - n), (l += n), (u = 'right'));
              break;
            case 'insideBottomLeft':
              ((h += n), (l += o - n), (c = 'bottom'));
              break;
            case 'insideBottomRight':
              ((h += a - n), (l += o - n), (u = 'right'), (c = 'bottom'));
          }
        return (((t = t || {}).x = h), (t.y = l), (t.align = u), (t.verticalAlign = c), t);
      }
    },
    941589: (t, e, r) => {
      r.d(e, { n: () => n });
      var i = 2 * Math.PI;
      function n(t) {
        return ((t %= i) < 0 && (t += i), t);
      }
    },
    776873: (t, e, r) => {
      function i(t, e, r, i, n, o) {
        if ((o > e && o > i) || (o < e && o < i)) return 0;
        if (i === e) return 0;
        var a = (o - e) / (i - e),
          s = i < e ? 1 : -1;
        (1 !== a && 0 !== a) || (s = i < e ? 0.5 : -0.5);
        var h = a * (r - t) + t;
        return h === n ? 1 / 0 : h > n ? s : 0;
      }
      r.d(e, { A: () => i });
    },
    529308: (t, e, r) => {
      r.d(e, { A: () => p });
      var i = r(345587),
        n = r(726346),
        o = Math.min,
        a = Math.max,
        s = new n.A(),
        h = new n.A(),
        l = new n.A(),
        u = new n.A(),
        c = new n.A(),
        f = new n.A();
      const p = (function () {
        function t(t, e, r, i) {
          (r < 0 && ((t += r), (r = -r)),
            i < 0 && ((e += i), (i = -i)),
            (this.x = t),
            (this.y = e),
            (this.width = r),
            (this.height = i));
        }
        return (
          (t.prototype.union = function (t) {
            var e = o(t.x, this.x),
              r = o(t.y, this.y);
            (isFinite(this.x) && isFinite(this.width)
              ? (this.width = a(t.x + t.width, this.x + this.width) - e)
              : (this.width = t.width),
              isFinite(this.y) && isFinite(this.height)
                ? (this.height = a(t.y + t.height, this.y + this.height) - r)
                : (this.height = t.height),
              (this.x = e),
              (this.y = r));
          }),
          (t.prototype.applyTransform = function (e) {
            t.applyTransform(this, this, e);
          }),
          (t.prototype.calculateTransform = function (t) {
            var e = this,
              r = t.width / e.width,
              n = t.height / e.height,
              o = i.create();
            return (
              i.translate(o, o, [-e.x, -e.y]),
              i.scale(o, o, [r, n]),
              i.translate(o, o, [t.x, t.y]),
              o
            );
          }),
          (t.prototype.intersect = function (e, r) {
            if (!e) return !1;
            e instanceof t || (e = t.create(e));
            var i = this,
              o = i.x,
              a = i.x + i.width,
              s = i.y,
              h = i.y + i.height,
              l = e.x,
              u = e.x + e.width,
              p = e.y,
              d = e.y + e.height,
              y = !(a < l || u < o || h < p || d < s);
            if (r) {
              var v = 1 / 0,
                g = 0,
                _ = Math.abs(a - l),
                m = Math.abs(u - o),
                x = Math.abs(h - p),
                w = Math.abs(d - s),
                b = Math.min(_, m),
                k = Math.min(x, w);
              (a < l || u < o
                ? b > g && ((g = b), _ < m ? n.A.set(f, -_, 0) : n.A.set(f, m, 0))
                : b < v && ((v = b), _ < m ? n.A.set(c, _, 0) : n.A.set(c, -m, 0)),
                h < p || d < s
                  ? k > g && ((g = k), x < w ? n.A.set(f, 0, -x) : n.A.set(f, 0, w))
                  : b < v && ((v = b), x < w ? n.A.set(c, 0, x) : n.A.set(c, 0, -w)));
            }
            return (r && n.A.copy(r, y ? c : f), y);
          }),
          (t.prototype.contain = function (t, e) {
            var r = this;
            return t >= r.x && t <= r.x + r.width && e >= r.y && e <= r.y + r.height;
          }),
          (t.prototype.clone = function () {
            return new t(this.x, this.y, this.width, this.height);
          }),
          (t.prototype.copy = function (e) {
            t.copy(this, e);
          }),
          (t.prototype.plain = function () {
            return { x: this.x, y: this.y, width: this.width, height: this.height };
          }),
          (t.prototype.isFinite = function () {
            return (
              isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height)
            );
          }),
          (t.prototype.isZero = function () {
            return 0 === this.width || 0 === this.height;
          }),
          (t.create = function (e) {
            return new t(e.x, e.y, e.width, e.height);
          }),
          (t.copy = function (t, e) {
            ((t.x = e.x), (t.y = e.y), (t.width = e.width), (t.height = e.height));
          }),
          (t.applyTransform = function (e, r, i) {
            if (i) {
              if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
                var n = i[0],
                  c = i[3],
                  f = i[4],
                  p = i[5];
                return (
                  (e.x = r.x * n + f),
                  (e.y = r.y * c + p),
                  (e.width = r.width * n),
                  (e.height = r.height * c),
                  e.width < 0 && ((e.x += e.width), (e.width = -e.width)),
                  void (e.height < 0 && ((e.y += e.height), (e.height = -e.height)))
                );
              }
              ((s.x = l.x = r.x),
                (s.y = u.y = r.y),
                (h.x = u.x = r.x + r.width),
                (h.y = l.y = r.y + r.height),
                s.transform(i),
                u.transform(i),
                h.transform(i),
                l.transform(i),
                (e.x = o(s.x, h.x, l.x, u.x)),
                (e.y = o(s.y, h.y, l.y, u.y)));
              var d = a(s.x, h.x, l.x, u.x),
                y = a(s.y, h.y, l.y, u.y);
              ((e.width = d - e.x), (e.height = y - e.y));
            } else e !== r && t.copy(e, r);
          }),
          t
        );
      })();
    },
    757861: (t, e, r) => {
      r.d(e, { A: () => i });
      const i = (function () {
        function t(t) {
          t && (this._$eventProcessor = t);
        }
        return (
          (t.prototype.on = function (t, e, r, i) {
            this._$handlers || (this._$handlers = {});
            var n = this._$handlers;
            if (('function' == typeof e && ((i = r), (r = e), (e = null)), !r || !t)) return this;
            var o = this._$eventProcessor;
            (null != e && o && o.normalizeQuery && (e = o.normalizeQuery(e)), n[t] || (n[t] = []));
            for (var a = 0; a < n[t].length; a++) if (n[t][a].h === r) return this;
            var s = { h: r, query: e, ctx: i || this, callAtLast: r.zrEventfulCallAtLast },
              h = n[t].length - 1,
              l = n[t][h];
            return (l && l.callAtLast ? n[t].splice(h, 0, s) : n[t].push(s), this);
          }),
          (t.prototype.isSilent = function (t) {
            var e = this._$handlers;
            return !e || !e[t] || !e[t].length;
          }),
          (t.prototype.off = function (t, e) {
            var r = this._$handlers;
            if (!r) return this;
            if (!t) return ((this._$handlers = {}), this);
            if (e) {
              if (r[t]) {
                for (var i = [], n = 0, o = r[t].length; n < o; n++)
                  r[t][n].h !== e && i.push(r[t][n]);
                r[t] = i;
              }
              r[t] && 0 === r[t].length && delete r[t];
            } else delete r[t];
            return this;
          }),
          (t.prototype.trigger = function (t) {
            for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
            if (!this._$handlers) return this;
            var i = this._$handlers[t],
              n = this._$eventProcessor;
            if (i)
              for (var o = e.length, a = i.length, s = 0; s < a; s++) {
                var h = i[s];
                if (!n || !n.filter || null == h.query || n.filter(t, h.query))
                  switch (o) {
                    case 0:
                      h.h.call(h.ctx);
                      break;
                    case 1:
                      h.h.call(h.ctx, e[0]);
                      break;
                    case 2:
                      h.h.call(h.ctx, e[0], e[1]);
                      break;
                    default:
                      h.h.apply(h.ctx, e);
                  }
              }
            return (n && n.afterTrigger && n.afterTrigger(t), this);
          }),
          (t.prototype.triggerWithContext = function (t) {
            for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
            if (!this._$handlers) return this;
            var i = this._$handlers[t],
              n = this._$eventProcessor;
            if (i)
              for (var o = e.length, a = e[o - 1], s = i.length, h = 0; h < s; h++) {
                var l = i[h];
                if (!n || !n.filter || null == l.query || n.filter(t, l.query))
                  switch (o) {
                    case 0:
                      l.h.call(a);
                      break;
                    case 1:
                      l.h.call(a, e[0]);
                      break;
                    case 2:
                      l.h.call(a, e[0], e[1]);
                      break;
                    default:
                      l.h.apply(a, e.slice(1, o - 1));
                  }
              }
            return (n && n.afterTrigger && n.afterTrigger(t), this);
          }),
          t
        );
      })();
    },
    160501: (t, e, r) => {
      r.d(e, { Ay: () => o });
      var i = function (t) {
          this.value = t;
        },
        n = (function () {
          function t() {
            this._len = 0;
          }
          return (
            (t.prototype.insert = function (t) {
              var e = new i(t);
              return (this.insertEntry(e), e);
            }),
            (t.prototype.insertEntry = function (t) {
              (this.head
                ? ((this.tail.next = t), (t.prev = this.tail), (t.next = null), (this.tail = t))
                : (this.head = this.tail = t),
                this._len++);
            }),
            (t.prototype.remove = function (t) {
              var e = t.prev,
                r = t.next;
              (e ? (e.next = r) : (this.head = r),
                r ? (r.prev = e) : (this.tail = e),
                (t.next = t.prev = null),
                this._len--);
            }),
            (t.prototype.len = function () {
              return this._len;
            }),
            (t.prototype.clear = function () {
              ((this.head = this.tail = null), (this._len = 0));
            }),
            t
          );
        })();
      const o = (function () {
        function t(t) {
          ((this._list = new n()), (this._maxSize = 10), (this._map = {}), (this._maxSize = t));
        }
        return (
          (t.prototype.put = function (t, e) {
            var r = this._list,
              n = this._map,
              o = null;
            if (null == n[t]) {
              var a = r.len(),
                s = this._lastRemovedEntry;
              if (a >= this._maxSize && a > 0) {
                var h = r.head;
                (r.remove(h), delete n[h.key], (o = h.value), (this._lastRemovedEntry = h));
              }
              (s ? (s.value = e) : (s = new i(e)), (s.key = t), r.insertEntry(s), (n[t] = s));
            }
            return o;
          }),
          (t.prototype.get = function (t) {
            var e = this._map[t],
              r = this._list;
            if (null != e) return (e !== r.tail && (r.remove(e), r.insertEntry(e)), e.value);
          }),
          (t.prototype.clear = function () {
            (this._list.clear(), (this._map = {}));
          }),
          (t.prototype.len = function () {
            return this._list.len();
          }),
          t
        );
      })();
    },
    584716: (t, e, r) => {
      r.d(e, { A: () => h });
      var i = r(726346),
        n = [0, 0],
        o = [0, 0],
        a = new i.A(),
        s = new i.A();
      const h = (function () {
        function t(t, e) {
          ((this._corners = []), (this._axes = []), (this._origin = [0, 0]));
          for (var r = 0; r < 4; r++) this._corners[r] = new i.A();
          for (r = 0; r < 2; r++) this._axes[r] = new i.A();
          t && this.fromBoundingRect(t, e);
        }
        return (
          (t.prototype.fromBoundingRect = function (t, e) {
            var r = this._corners,
              n = this._axes,
              o = t.x,
              a = t.y,
              s = o + t.width,
              h = a + t.height;
            if ((r[0].set(o, a), r[1].set(s, a), r[2].set(s, h), r[3].set(o, h), e))
              for (var l = 0; l < 4; l++) r[l].transform(e);
            for (
              i.A.sub(n[0], r[1], r[0]),
                i.A.sub(n[1], r[3], r[0]),
                n[0].normalize(),
                n[1].normalize(),
                l = 0;
              l < 2;
              l++
            )
              this._origin[l] = n[l].dot(r[0]);
          }),
          (t.prototype.intersect = function (t, e) {
            var r = !0,
              n = !e;
            return (
              a.set(1 / 0, 1 / 0),
              s.set(0, 0),
              (!this._intersectCheckOneSide(this, t, a, s, n, 1) && ((r = !1), n)) ||
                (!this._intersectCheckOneSide(t, this, a, s, n, -1) && ((r = !1), n)) ||
                n ||
                i.A.copy(e, r ? a : s),
              r
            );
          }),
          (t.prototype._intersectCheckOneSide = function (t, e, r, a, s, h) {
            for (var l = !0, u = 0; u < 2; u++) {
              var c = this._axes[u];
              if (
                (this._getProjMinMaxOnAxis(u, t._corners, n),
                this._getProjMinMaxOnAxis(u, e._corners, o),
                n[1] < o[0] || n[0] > o[1])
              ) {
                if (((l = !1), s)) return l;
                var f = Math.abs(o[0] - n[1]),
                  p = Math.abs(n[0] - o[1]);
                Math.min(f, p) > a.len() &&
                  (f < p ? i.A.scale(a, c, -f * h) : i.A.scale(a, c, p * h));
              } else
                r &&
                  ((f = Math.abs(o[0] - n[1])),
                  (p = Math.abs(n[0] - o[1])),
                  Math.min(f, p) < r.len() &&
                    (f < p ? i.A.scale(r, c, f * h) : i.A.scale(r, c, -p * h)));
            }
            return l;
          }),
          (t.prototype._getProjMinMaxOnAxis = function (t, e, r) {
            for (
              var i = this._axes[t], n = this._origin, o = e[0].dot(i) + n[t], a = o, s = o, h = 1;
              h < e.length;
              h++
            ) {
              var l = e[h].dot(i) + n[t];
              ((a = Math.min(l, a)), (s = Math.max(l, s)));
            }
            ((r[0] = a), (r[1] = s));
          }),
          t
        );
      })();
    },
    368717: (t, e, r) => {
      r.d(e, { A: () => A, q: () => T });
      var i = r(983509),
        n = r(529308),
        o = r(73098),
        a = r(248813),
        s = r(989259),
        h = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },
        l = [],
        u = [],
        c = [],
        f = [],
        p = [],
        d = [],
        y = Math.min,
        v = Math.max,
        g = Math.cos,
        _ = Math.sin,
        m = Math.abs,
        x = Math.PI,
        w = 2 * x,
        b = 'undefined' != typeof Float32Array,
        k = [];
      function S(t) {
        return ((Math.round((t / x) * 1e8) / 1e8) % 2) * x;
      }
      function T(t, e) {
        var r = S(t[0]);
        r < 0 && (r += w);
        var i = r - t[0],
          n = t[1];
        ((n += i),
          !e && n - r >= w
            ? (n = r + w)
            : e && r - n >= w
              ? (n = r - w)
              : !e && r > n
                ? (n = r + (w - S(r - n)))
                : e && r < n && (n = r - (w - S(n - r))),
          (t[0] = r),
          (t[1] = n));
      }
      const A = (function () {
        function t(t) {
          ((this.dpr = 1),
            (this._xi = 0),
            (this._yi = 0),
            (this._x0 = 0),
            (this._y0 = 0),
            (this._len = 0),
            t && (this._saveData = !1),
            this._saveData && (this.data = []));
        }
        var e;
        return (
          (t.prototype.increaseVersion = function () {
            this._version++;
          }),
          (t.prototype.getVersion = function () {
            return this._version;
          }),
          (t.prototype.setScale = function (t, e, r) {
            (r = r || 0) > 0 &&
              ((this._ux = m(r / o.Y5 / t) || 0), (this._uy = m(r / o.Y5 / e) || 0));
          }),
          (t.prototype.setDPR = function (t) {
            this.dpr = t;
          }),
          (t.prototype.setContext = function (t) {
            this._ctx = t;
          }),
          (t.prototype.getContext = function () {
            return this._ctx;
          }),
          (t.prototype.beginPath = function () {
            return (this._ctx && this._ctx.beginPath(), this.reset(), this);
          }),
          (t.prototype.reset = function () {
            (this._saveData && (this._len = 0),
              this._pathSegLen && ((this._pathSegLen = null), (this._pathLen = 0)),
              this._version++);
          }),
          (t.prototype.moveTo = function (t, e) {
            return (
              this._drawPendingPt(),
              this.addData(h.M, t, e),
              this._ctx && this._ctx.moveTo(t, e),
              (this._x0 = t),
              (this._y0 = e),
              (this._xi = t),
              (this._yi = e),
              this
            );
          }),
          (t.prototype.lineTo = function (t, e) {
            var r = m(t - this._xi),
              i = m(e - this._yi),
              n = r > this._ux || i > this._uy;
            if ((this.addData(h.L, t, e), this._ctx && n && this._ctx.lineTo(t, e), n))
              ((this._xi = t), (this._yi = e), (this._pendingPtDist = 0));
            else {
              var o = r * r + i * i;
              o > this._pendingPtDist &&
                ((this._pendingPtX = t), (this._pendingPtY = e), (this._pendingPtDist = o));
            }
            return this;
          }),
          (t.prototype.bezierCurveTo = function (t, e, r, i, n, o) {
            return (
              this._drawPendingPt(),
              this.addData(h.C, t, e, r, i, n, o),
              this._ctx && this._ctx.bezierCurveTo(t, e, r, i, n, o),
              (this._xi = n),
              (this._yi = o),
              this
            );
          }),
          (t.prototype.quadraticCurveTo = function (t, e, r, i) {
            return (
              this._drawPendingPt(),
              this.addData(h.Q, t, e, r, i),
              this._ctx && this._ctx.quadraticCurveTo(t, e, r, i),
              (this._xi = r),
              (this._yi = i),
              this
            );
          }),
          (t.prototype.arc = function (t, e, r, i, n, o) {
            (this._drawPendingPt(), (k[0] = i), (k[1] = n), T(k, o), (i = k[0]));
            var a = (n = k[1]) - i;
            return (
              this.addData(h.A, t, e, r, r, i, a, 0, o ? 0 : 1),
              this._ctx && this._ctx.arc(t, e, r, i, n, o),
              (this._xi = g(n) * r + t),
              (this._yi = _(n) * r + e),
              this
            );
          }),
          (t.prototype.arcTo = function (t, e, r, i, n) {
            return (this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, r, i, n), this);
          }),
          (t.prototype.rect = function (t, e, r, i) {
            return (
              this._drawPendingPt(),
              this._ctx && this._ctx.rect(t, e, r, i),
              this.addData(h.R, t, e, r, i),
              this
            );
          }),
          (t.prototype.closePath = function () {
            (this._drawPendingPt(), this.addData(h.Z));
            var t = this._ctx,
              e = this._x0,
              r = this._y0;
            return (t && t.closePath(), (this._xi = e), (this._yi = r), this);
          }),
          (t.prototype.fill = function (t) {
            (t && t.fill(), this.toStatic());
          }),
          (t.prototype.stroke = function (t) {
            (t && t.stroke(), this.toStatic());
          }),
          (t.prototype.len = function () {
            return this._len;
          }),
          (t.prototype.setData = function (t) {
            var e = t.length;
            (this.data && this.data.length === e) || !b || (this.data = new Float32Array(e));
            for (var r = 0; r < e; r++) this.data[r] = t[r];
            this._len = e;
          }),
          (t.prototype.appendPath = function (t) {
            t instanceof Array || (t = [t]);
            for (var e = t.length, r = 0, i = this._len, n = 0; n < e; n++) r += t[n].len();
            for (
              b && this.data instanceof Float32Array && (this.data = new Float32Array(i + r)),
                n = 0;
              n < e;
              n++
            )
              for (var o = t[n].data, a = 0; a < o.length; a++) this.data[i++] = o[a];
            this._len = i;
          }),
          (t.prototype.addData = function (t, e, r, i, n, o, a, s, h) {
            if (this._saveData) {
              var l = this.data;
              this._len + arguments.length > l.length && (this._expandData(), (l = this.data));
              for (var u = 0; u < arguments.length; u++) l[this._len++] = arguments[u];
            }
          }),
          (t.prototype._drawPendingPt = function () {
            this._pendingPtDist > 0 &&
              (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY),
              (this._pendingPtDist = 0));
          }),
          (t.prototype._expandData = function () {
            if (!(this.data instanceof Array)) {
              for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
              this.data = t;
            }
          }),
          (t.prototype.toStatic = function () {
            if (this._saveData) {
              this._drawPendingPt();
              var t = this.data;
              t instanceof Array &&
                ((t.length = this._len), b && this._len > 11 && (this.data = new Float32Array(t)));
            }
          }),
          (t.prototype.getBoundingRect = function () {
            ((c[0] = c[1] = p[0] = p[1] = Number.MAX_VALUE),
              (f[0] = f[1] = d[0] = d[1] = -Number.MAX_VALUE));
            var t,
              e = this.data,
              r = 0,
              o = 0,
              s = 0,
              l = 0;
            for (t = 0; t < this._len;) {
              var u = e[t++],
                y = 1 === t;
              switch ((y && ((s = r = e[t]), (l = o = e[t + 1])), u)) {
                case h.M:
                  ((r = s = e[t++]),
                    (o = l = e[t++]),
                    (p[0] = s),
                    (p[1] = l),
                    (d[0] = s),
                    (d[1] = l));
                  break;
                case h.L:
                  ((0, a.j6)(r, o, e[t], e[t + 1], p, d), (r = e[t++]), (o = e[t++]));
                  break;
                case h.C:
                  ((0, a.BM)(r, o, e[t++], e[t++], e[t++], e[t++], e[t], e[t + 1], p, d),
                    (r = e[t++]),
                    (o = e[t++]));
                  break;
                case h.Q:
                  ((0, a.tW)(r, o, e[t++], e[t++], e[t], e[t + 1], p, d),
                    (r = e[t++]),
                    (o = e[t++]));
                  break;
                case h.A:
                  var v = e[t++],
                    m = e[t++],
                    x = e[t++],
                    w = e[t++],
                    b = e[t++],
                    k = e[t++] + b;
                  t += 1;
                  var S = !e[t++];
                  (y && ((s = g(b) * x + v), (l = _(b) * w + m)),
                    (0, a.$s)(v, m, x, w, b, k, S, p, d),
                    (r = g(k) * x + v),
                    (o = _(k) * w + m));
                  break;
                case h.R:
                  ((s = r = e[t++]), (l = o = e[t++]));
                  var T = e[t++],
                    A = e[t++];
                  (0, a.j6)(s, l, s + T, l + A, p, d);
                  break;
                case h.Z:
                  ((r = s), (o = l));
              }
              (i.min(c, c, p), i.max(f, f, d));
            }
            return (
              0 === t && (c[0] = c[1] = f[0] = f[1] = 0),
              new n.A(c[0], c[1], f[0] - c[0], f[1] - c[1])
            );
          }),
          (t.prototype._calculateLength = function () {
            var t = this.data,
              e = this._len,
              r = this._ux,
              i = this._uy,
              n = 0,
              o = 0,
              a = 0,
              l = 0;
            this._pathSegLen || (this._pathSegLen = []);
            for (var u = this._pathSegLen, c = 0, f = 0, p = 0; p < e;) {
              var d = t[p++],
                x = 1 === p;
              x && ((a = n = t[p]), (l = o = t[p + 1]));
              var b = -1;
              switch (d) {
                case h.M:
                  ((n = a = t[p++]), (o = l = t[p++]));
                  break;
                case h.L:
                  var k = t[p++],
                    S = (C = t[p++]) - o;
                  (m((F = k - n)) > r || m(S) > i || p === e - 1) &&
                    ((b = Math.sqrt(F * F + S * S)), (n = k), (o = C));
                  break;
                case h.C:
                  var T = t[p++],
                    A = t[p++],
                    C = ((k = t[p++]), t[p++]),
                    P = t[p++],
                    M = t[p++];
                  ((b = (0, s.h0)(n, o, T, A, k, C, P, M, 10)), (n = P), (o = M));
                  break;
                case h.Q:
                  ((T = t[p++]),
                    (A = t[p++]),
                    (k = t[p++]),
                    (C = t[p++]),
                    (b = (0, s.d8)(n, o, T, A, k, C, 10)),
                    (n = k),
                    (o = C));
                  break;
                case h.A:
                  var O = t[p++],
                    L = t[p++],
                    D = t[p++],
                    R = t[p++],
                    z = t[p++],
                    I = t[p++],
                    B = I + z;
                  ((p += 1),
                    x && ((a = g(z) * D + O), (l = _(z) * R + L)),
                    (b = v(D, R) * y(w, Math.abs(I))),
                    (n = g(B) * D + O),
                    (o = _(B) * R + L));
                  break;
                case h.R:
                  ((a = n = t[p++]), (l = o = t[p++]), (b = 2 * t[p++] + 2 * t[p++]));
                  break;
                case h.Z:
                  var F = a - n;
                  ((S = l - o), (b = Math.sqrt(F * F + S * S)), (n = a), (o = l));
              }
              b >= 0 && ((u[f++] = b), (c += b));
            }
            return ((this._pathLen = c), c);
          }),
          (t.prototype.rebuildPath = function (t, e) {
            var r,
              i,
              n,
              o,
              a,
              c,
              f,
              p,
              d,
              x,
              w = this.data,
              b = this._ux,
              k = this._uy,
              S = this._len,
              T = e < 1,
              A = 0,
              C = 0,
              P = 0;
            if (
              !T ||
              (this._pathSegLen || this._calculateLength(),
              (f = this._pathSegLen),
              (p = e * this._pathLen))
            )
              t: for (var M = 0; M < S;) {
                var O = w[M++],
                  L = 1 === M;
                switch (
                  (L && ((r = n = w[M]), (i = o = w[M + 1])),
                  O !== h.L && P > 0 && (t.lineTo(d, x), (P = 0)),
                  O)
                ) {
                  case h.M:
                    ((r = n = w[M++]), (i = o = w[M++]), t.moveTo(n, o));
                    break;
                  case h.L:
                    ((a = w[M++]), (c = w[M++]));
                    var D = m(a - n),
                      R = m(c - o);
                    if (D > b || R > k) {
                      if (T) {
                        if (A + (it = f[C++]) > p) {
                          var z = (p - A) / it;
                          t.lineTo(n * (1 - z) + a * z, o * (1 - z) + c * z);
                          break t;
                        }
                        A += it;
                      }
                      (t.lineTo(a, c), (n = a), (o = c), (P = 0));
                    } else {
                      var I = D * D + R * R;
                      I > P && ((d = a), (x = c), (P = I));
                    }
                    break;
                  case h.C:
                    var B = w[M++],
                      F = w[M++],
                      N = w[M++],
                      E = w[M++],
                      W = w[M++],
                      H = w[M++];
                    if (T) {
                      if (A + (it = f[C++]) > p) {
                        ((z = (p - A) / it),
                          (0, s.YT)(n, B, N, W, z, l),
                          (0, s.YT)(o, F, E, H, z, u),
                          t.bezierCurveTo(l[1], u[1], l[2], u[2], l[3], u[3]));
                        break t;
                      }
                      A += it;
                    }
                    (t.bezierCurveTo(B, F, N, E, W, H), (n = W), (o = H));
                    break;
                  case h.Q:
                    if (((B = w[M++]), (F = w[M++]), (N = w[M++]), (E = w[M++]), T)) {
                      if (A + (it = f[C++]) > p) {
                        ((z = (p - A) / it),
                          (0, s.kx)(n, B, N, z, l),
                          (0, s.kx)(o, F, E, z, u),
                          t.quadraticCurveTo(l[1], u[1], l[2], u[2]));
                        break t;
                      }
                      A += it;
                    }
                    (t.quadraticCurveTo(B, F, N, E), (n = N), (o = E));
                    break;
                  case h.A:
                    var Y = w[M++],
                      X = w[M++],
                      j = w[M++],
                      q = w[M++],
                      V = w[M++],
                      G = w[M++],
                      Z = w[M++],
                      U = !w[M++],
                      K = j > q ? j : q,
                      $ = m(j - q) > 0.001,
                      Q = V + G,
                      J = !1;
                    if (
                      (T &&
                        (A + (it = f[C++]) > p && ((Q = V + (G * (p - A)) / it), (J = !0)),
                        (A += it)),
                      $ && t.ellipse ? t.ellipse(Y, X, j, q, Z, V, Q, U) : t.arc(Y, X, K, V, Q, U),
                      J)
                    )
                      break t;
                    (L && ((r = g(V) * j + Y), (i = _(V) * q + X)),
                      (n = g(Q) * j + Y),
                      (o = _(Q) * q + X));
                    break;
                  case h.R:
                    ((r = n = w[M]), (i = o = w[M + 1]), (a = w[M++]), (c = w[M++]));
                    var tt = w[M++],
                      et = w[M++];
                    if (T) {
                      if (A + (it = f[C++]) > p) {
                        var rt = p - A;
                        (t.moveTo(a, c),
                          t.lineTo(a + y(rt, tt), c),
                          (rt -= tt) > 0 && t.lineTo(a + tt, c + y(rt, et)),
                          (rt -= et) > 0 && t.lineTo(a + v(tt - rt, 0), c + et),
                          (rt -= tt) > 0 && t.lineTo(a, c + v(et - rt, 0)));
                        break t;
                      }
                      A += it;
                    }
                    t.rect(a, c, tt, et);
                    break;
                  case h.Z:
                    if (T) {
                      var it;
                      if (A + (it = f[C++]) > p) {
                        ((z = (p - A) / it), t.lineTo(n * (1 - z) + r * z, o * (1 - z) + i * z));
                        break t;
                      }
                      A += it;
                    }
                    (t.closePath(), (n = r), (o = i));
                }
              }
          }),
          (t.prototype.clone = function () {
            var e = new t(),
              r = this.data;
            return (
              (e.data = r.slice ? r.slice() : Array.prototype.slice.call(r)),
              (e._len = this._len),
              e
            );
          }),
          (t.CMD = h),
          (t.initDefaultProps =
            (((e = t.prototype)._saveData = !0),
            (e._ux = 0),
            (e._uy = 0),
            (e._pendingPtDist = 0),
            void (e._version = 0))),
          t
        );
      })();
    },
    726346: (t, e, r) => {
      r.d(e, { A: () => i });
      const i = (function () {
        function t(t, e) {
          ((this.x = t || 0), (this.y = e || 0));
        }
        return (
          (t.prototype.copy = function (t) {
            return ((this.x = t.x), (this.y = t.y), this);
          }),
          (t.prototype.clone = function () {
            return new t(this.x, this.y);
          }),
          (t.prototype.set = function (t, e) {
            return ((this.x = t), (this.y = e), this);
          }),
          (t.prototype.equal = function (t) {
            return t.x === this.x && t.y === this.y;
          }),
          (t.prototype.add = function (t) {
            return ((this.x += t.x), (this.y += t.y), this);
          }),
          (t.prototype.scale = function (t) {
            ((this.x *= t), (this.y *= t));
          }),
          (t.prototype.scaleAndAdd = function (t, e) {
            ((this.x += t.x * e), (this.y += t.y * e));
          }),
          (t.prototype.sub = function (t) {
            return ((this.x -= t.x), (this.y -= t.y), this);
          }),
          (t.prototype.dot = function (t) {
            return this.x * t.x + this.y * t.y;
          }),
          (t.prototype.len = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
          }),
          (t.prototype.lenSquare = function () {
            return this.x * this.x + this.y * this.y;
          }),
          (t.prototype.normalize = function () {
            var t = this.len();
            return ((this.x /= t), (this.y /= t), this);
          }),
          (t.prototype.distance = function (t) {
            var e = this.x - t.x,
              r = this.y - t.y;
            return Math.sqrt(e * e + r * r);
          }),
          (t.prototype.distanceSquare = function (t) {
            var e = this.x - t.x,
              r = this.y - t.y;
            return e * e + r * r;
          }),
          (t.prototype.negate = function () {
            return ((this.x = -this.x), (this.y = -this.y), this);
          }),
          (t.prototype.transform = function (t) {
            if (t) {
              var e = this.x,
                r = this.y;
              return (
                (this.x = t[0] * e + t[2] * r + t[4]),
                (this.y = t[1] * e + t[3] * r + t[5]),
                this
              );
            }
          }),
          (t.prototype.toArray = function (t) {
            return ((t[0] = this.x), (t[1] = this.y), t);
          }),
          (t.prototype.fromArray = function (t) {
            ((this.x = t[0]), (this.y = t[1]));
          }),
          (t.set = function (t, e, r) {
            ((t.x = e), (t.y = r));
          }),
          (t.copy = function (t, e) {
            ((t.x = e.x), (t.y = e.y));
          }),
          (t.len = function (t) {
            return Math.sqrt(t.x * t.x + t.y * t.y);
          }),
          (t.lenSquare = function (t) {
            return t.x * t.x + t.y * t.y;
          }),
          (t.dot = function (t, e) {
            return t.x * e.x + t.y * e.y;
          }),
          (t.add = function (t, e, r) {
            ((t.x = e.x + r.x), (t.y = e.y + r.y));
          }),
          (t.sub = function (t, e, r) {
            ((t.x = e.x - r.x), (t.y = e.y - r.y));
          }),
          (t.scale = function (t, e, r) {
            ((t.x = e.x * r), (t.y = e.y * r));
          }),
          (t.scaleAndAdd = function (t, e, r, i) {
            ((t.x = e.x + r.x * i), (t.y = e.y + r.y * i));
          }),
          (t.lerp = function (t, e, r, i) {
            var n = 1 - i;
            ((t.x = n * e.x + i * r.x), (t.y = n * e.y + i * r.y));
          }),
          t
        );
      })();
    },
    692836: (t, e, r) => {
      r.d(e, { Ay: () => d, IT: () => p, Wx: () => f });
      var i = r(345587),
        n = r(983509),
        o = i.identity;
      function a(t) {
        return t > 5e-5 || t < -5e-5;
      }
      var s = [],
        h = [],
        l = i.create(),
        u = Math.abs,
        c = (function () {
          function t() {}
          var e;
          return (
            (t.prototype.getLocalTransform = function (e) {
              return t.getLocalTransform(this, e);
            }),
            (t.prototype.setPosition = function (t) {
              ((this.x = t[0]), (this.y = t[1]));
            }),
            (t.prototype.setScale = function (t) {
              ((this.scaleX = t[0]), (this.scaleY = t[1]));
            }),
            (t.prototype.setSkew = function (t) {
              ((this.skewX = t[0]), (this.skewY = t[1]));
            }),
            (t.prototype.setOrigin = function (t) {
              ((this.originX = t[0]), (this.originY = t[1]));
            }),
            (t.prototype.needLocalTransform = function () {
              return (
                a(this.rotation) ||
                a(this.x) ||
                a(this.y) ||
                a(this.scaleX - 1) ||
                a(this.scaleY - 1) ||
                a(this.skewX) ||
                a(this.skewY)
              );
            }),
            (t.prototype.updateTransform = function () {
              var t = this.parent && this.parent.transform,
                e = this.needLocalTransform(),
                r = this.transform;
              e || t
                ? ((r = r || i.create()),
                  e ? this.getLocalTransform(r) : o(r),
                  t && (e ? i.mul(r, t, r) : i.copy(r, t)),
                  (this.transform = r),
                  this._resolveGlobalScaleRatio(r))
                : r && (o(r), (this.invTransform = null));
            }),
            (t.prototype._resolveGlobalScaleRatio = function (t) {
              var e = this.globalScaleRatio;
              if (null != e && 1 !== e) {
                this.getGlobalScale(s);
                var r = s[0] < 0 ? -1 : 1,
                  n = s[1] < 0 ? -1 : 1,
                  o = ((s[0] - r) * e + r) / s[0] || 0,
                  a = ((s[1] - n) * e + n) / s[1] || 0;
                ((t[0] *= o), (t[1] *= o), (t[2] *= a), (t[3] *= a));
              }
              ((this.invTransform = this.invTransform || i.create()),
                i.invert(this.invTransform, t));
            }),
            (t.prototype.getComputedTransform = function () {
              for (var t = this, e = []; t;) (e.push(t), (t = t.parent));
              for (; (t = e.pop());) t.updateTransform();
              return this.transform;
            }),
            (t.prototype.setLocalTransform = function (t) {
              if (t) {
                var e = t[0] * t[0] + t[1] * t[1],
                  r = t[2] * t[2] + t[3] * t[3],
                  i = Math.atan2(t[1], t[0]),
                  n = Math.PI / 2 + i - Math.atan2(t[3], t[2]);
                ((r = Math.sqrt(r) * Math.cos(n)),
                  (e = Math.sqrt(e)),
                  (this.skewX = n),
                  (this.skewY = 0),
                  (this.rotation = -i),
                  (this.x = +t[4]),
                  (this.y = +t[5]),
                  (this.scaleX = e),
                  (this.scaleY = r),
                  (this.originX = 0),
                  (this.originY = 0));
              }
            }),
            (t.prototype.decomposeTransform = function () {
              if (this.transform) {
                var t = this.parent,
                  e = this.transform;
                t &&
                  t.transform &&
                  ((t.invTransform = t.invTransform || i.create()),
                  i.mul(h, t.invTransform, e),
                  (e = h));
                var r = this.originX,
                  n = this.originY;
                ((r || n) &&
                  ((l[4] = r), (l[5] = n), i.mul(h, e, l), (h[4] -= r), (h[5] -= n), (e = h)),
                  this.setLocalTransform(e));
              }
            }),
            (t.prototype.getGlobalScale = function (t) {
              var e = this.transform;
              return (
                (t = t || []),
                e
                  ? ((t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1])),
                    (t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3])),
                    e[0] < 0 && (t[0] = -t[0]),
                    e[3] < 0 && (t[1] = -t[1]),
                    t)
                  : ((t[0] = 1), (t[1] = 1), t)
              );
            }),
            (t.prototype.transformCoordToLocal = function (t, e) {
              var r = [t, e],
                i = this.invTransform;
              return (i && n.applyTransform(r, r, i), r);
            }),
            (t.prototype.transformCoordToGlobal = function (t, e) {
              var r = [t, e],
                i = this.transform;
              return (i && n.applyTransform(r, r, i), r);
            }),
            (t.prototype.getLineScale = function () {
              var t = this.transform;
              return t && u(t[0] - 1) > 1e-10 && u(t[3] - 1) > 1e-10
                ? Math.sqrt(u(t[0] * t[3] - t[2] * t[1]))
                : 1;
            }),
            (t.prototype.copyTransform = function (t) {
              p(this, t);
            }),
            (t.getLocalTransform = function (t, e) {
              e = e || [];
              var r = t.originX || 0,
                n = t.originY || 0,
                o = t.scaleX,
                a = t.scaleY,
                s = t.anchorX,
                h = t.anchorY,
                l = t.rotation || 0,
                u = t.x,
                c = t.y,
                f = t.skewX ? Math.tan(t.skewX) : 0,
                p = t.skewY ? Math.tan(-t.skewY) : 0;
              if (r || n || s || h) {
                var d = r + s,
                  y = n + h;
                ((e[4] = -d * o - f * y * a), (e[5] = -y * a - p * d * o));
              } else e[4] = e[5] = 0;
              return (
                (e[0] = o),
                (e[3] = a),
                (e[1] = p * o),
                (e[2] = f * a),
                l && i.rotate(e, e, l),
                (e[4] += r + u),
                (e[5] += n + c),
                e
              );
            }),
            (t.initDefaultProps =
              (((e = t.prototype).scaleX = e.scaleY = e.globalScaleRatio = 1),
              void (e.x =
                e.y =
                e.originX =
                e.originY =
                e.skewX =
                e.skewY =
                e.rotation =
                e.anchorX =
                e.anchorY =
                  0))),
            t
          );
        })(),
        f = [
          'x',
          'y',
          'originX',
          'originY',
          'anchorX',
          'anchorY',
          'rotation',
          'scaleX',
          'scaleY',
          'skewX',
          'skewY',
        ];
      function p(t, e) {
        for (var r = 0; r < f.length; r++) {
          var i = f[r];
          t[i] = e[i];
        }
      }
      const d = c;
    },
    273430: (t, e, r) => {
      r.d(e, { A: () => o });
      var i = Math.round(9 * Math.random()),
        n = 'function' == typeof Object.defineProperty;
      const o = (function () {
        function t() {
          this._id = '__ec_inner_' + i++;
        }
        return (
          (t.prototype.get = function (t) {
            return this._guard(t)[this._id];
          }),
          (t.prototype.set = function (t, e) {
            var r = this._guard(t);
            return (
              n
                ? Object.defineProperty(r, this._id, { value: e, enumerable: !1, configurable: !0 })
                : (r[this._id] = e),
              this
            );
          }),
          (t.prototype.delete = function (t) {
            return !!this.has(t) && (delete this._guard(t)[this._id], !0);
          }),
          (t.prototype.has = function (t) {
            return !!this._guard(t)[this._id];
          }),
          (t.prototype._guard = function (t) {
            if (t !== Object(t)) throw TypeError('Value of WeakMap is not a non-null object.');
            return t;
          }),
          t
        );
      })();
    },
    248813: (t, e, r) => {
      r.d(e, { $s: () => m, BM: () => g, Cr: () => p, j6: () => d, tW: () => _ });
      var i = r(983509),
        n = r(989259),
        o = Math.min,
        a = Math.max,
        s = Math.sin,
        h = Math.cos,
        l = 2 * Math.PI,
        u = i.create(),
        c = i.create(),
        f = i.create();
      function p(t, e, r) {
        if (0 !== t.length) {
          for (var i = t[0], n = i[0], s = i[0], h = i[1], l = i[1], u = 1; u < t.length; u++)
            ((i = t[u]), (n = o(n, i[0])), (s = a(s, i[0])), (h = o(h, i[1])), (l = a(l, i[1])));
          ((e[0] = n), (e[1] = h), (r[0] = s), (r[1] = l));
        }
      }
      function d(t, e, r, i, n, s) {
        ((n[0] = o(t, r)), (n[1] = o(e, i)), (s[0] = a(t, r)), (s[1] = a(e, i)));
      }
      var y = [],
        v = [];
      function g(t, e, r, i, s, h, l, u, c, f) {
        var p = n.lX,
          d = n.Yb,
          g = p(t, r, s, l, y);
        ((c[0] = 1 / 0), (c[1] = 1 / 0), (f[0] = -1 / 0), (f[1] = -1 / 0));
        for (var _ = 0; _ < g; _++) {
          var m = d(t, r, s, l, y[_]);
          ((c[0] = o(m, c[0])), (f[0] = a(m, f[0])));
        }
        for (g = p(e, i, h, u, v), _ = 0; _ < g; _++) {
          var x = d(e, i, h, u, v[_]);
          ((c[1] = o(x, c[1])), (f[1] = a(x, f[1])));
        }
        ((c[0] = o(t, c[0])),
          (f[0] = a(t, f[0])),
          (c[0] = o(l, c[0])),
          (f[0] = a(l, f[0])),
          (c[1] = o(e, c[1])),
          (f[1] = a(e, f[1])),
          (c[1] = o(u, c[1])),
          (f[1] = a(u, f[1])));
      }
      function _(t, e, r, i, s, h, l, u) {
        var c = n.gC,
          f = n.k3,
          p = a(o(c(t, r, s), 1), 0),
          d = a(o(c(e, i, h), 1), 0),
          y = f(t, r, s, p),
          v = f(e, i, h, d);
        ((l[0] = o(t, s, y)), (l[1] = o(e, h, v)), (u[0] = a(t, s, y)), (u[1] = a(e, h, v)));
      }
      function m(t, e, r, n, o, a, p, d, y) {
        var v = i.min,
          g = i.max,
          _ = Math.abs(o - a);
        if (_ % l < 1e-4 && _ > 1e-4)
          return ((d[0] = t - r), (d[1] = e - n), (y[0] = t + r), void (y[1] = e + n));
        if (
          ((u[0] = h(o) * r + t),
          (u[1] = s(o) * n + e),
          (c[0] = h(a) * r + t),
          (c[1] = s(a) * n + e),
          v(d, u, c),
          g(y, u, c),
          (o %= l) < 0 && (o += l),
          (a %= l) < 0 && (a += l),
          o > a && !p ? (a += l) : o < a && p && (o += l),
          p)
        ) {
          var m = a;
          ((a = o), (o = m));
        }
        for (var x = 0; x < a; x += Math.PI / 2)
          x > o && ((f[0] = h(x) * r + t), (f[1] = s(x) * n + e), v(d, f, d), g(y, f, y));
      }
    },
    989259: (t, e, r) => {
      r.d(e, {
        Et: () => x,
        YT: () => m,
        Yb: () => y,
        _E: () => g,
        d8: () => P,
        gC: () => T,
        h0: () => w,
        k3: () => b,
        kh: () => C,
        kx: () => A,
        lX: () => _,
        qY: () => S,
        rD: () => v,
        z7: () => k,
      });
      var i = r(983509),
        n = Math.pow,
        o = Math.sqrt,
        a = 1e-8,
        s = 1e-4,
        h = o(3),
        l = 1 / 3,
        u = (0, i.create)(),
        c = (0, i.create)(),
        f = (0, i.create)();
      function p(t) {
        return t > -a && t < a;
      }
      function d(t) {
        return t > a || t < -a;
      }
      function y(t, e, r, i, n) {
        var o = 1 - n;
        return o * o * (o * t + 3 * n * e) + n * n * (n * i + 3 * o * r);
      }
      function v(t, e, r, i, n) {
        var o = 1 - n;
        return 3 * (((e - t) * o + 2 * (r - e) * n) * o + (i - r) * n * n);
      }
      function g(t, e, r, i, a, s) {
        var u = i + 3 * (e - r) - t,
          c = 3 * (r - 2 * e + t),
          f = 3 * (e - t),
          d = t - a,
          y = c * c - 3 * u * f,
          v = c * f - 9 * u * d,
          g = f * f - 3 * c * d,
          _ = 0;
        if (p(y) && p(v)) p(c) ? (s[0] = 0) : (M = -f / c) >= 0 && M <= 1 && (s[_++] = M);
        else {
          var m = v * v - 4 * y * g;
          if (p(m)) {
            var x = v / y,
              w = -x / 2;
            ((M = -c / u + x) >= 0 && M <= 1 && (s[_++] = M), w >= 0 && w <= 1 && (s[_++] = w));
          } else if (m > 0) {
            var b = o(m),
              k = y * c + 1.5 * u * (-v + b),
              S = y * c + 1.5 * u * (-v - b);
            (M =
              (-c - ((k = k < 0 ? -n(-k, l) : n(k, l)) + (S = S < 0 ? -n(-S, l) : n(S, l)))) /
              (3 * u)) >= 0 &&
              M <= 1 &&
              (s[_++] = M);
          } else {
            var T = (2 * y * c - 3 * u * v) / (2 * o(y * y * y)),
              A = Math.acos(T) / 3,
              C = o(y),
              P = Math.cos(A),
              M = (-c - 2 * C * P) / (3 * u),
              O =
                ((w = (-c + C * (P + h * Math.sin(A))) / (3 * u)),
                (-c + C * (P - h * Math.sin(A))) / (3 * u));
            (M >= 0 && M <= 1 && (s[_++] = M),
              w >= 0 && w <= 1 && (s[_++] = w),
              O >= 0 && O <= 1 && (s[_++] = O));
          }
        }
        return _;
      }
      function _(t, e, r, i, n) {
        var a = 6 * r - 12 * e + 6 * t,
          s = 9 * e + 3 * i - 3 * t - 9 * r,
          h = 3 * e - 3 * t,
          l = 0;
        if (p(s)) d(a) && (c = -h / a) >= 0 && c <= 1 && (n[l++] = c);
        else {
          var u = a * a - 4 * s * h;
          if (p(u)) n[0] = -a / (2 * s);
          else if (u > 0) {
            var c,
              f = o(u),
              y = (-a - f) / (2 * s);
            ((c = (-a + f) / (2 * s)) >= 0 && c <= 1 && (n[l++] = c),
              y >= 0 && y <= 1 && (n[l++] = y));
          }
        }
        return l;
      }
      function m(t, e, r, i, n, o) {
        var a = (e - t) * n + t,
          s = (r - e) * n + e,
          h = (i - r) * n + r,
          l = (s - a) * n + a,
          u = (h - s) * n + s,
          c = (u - l) * n + l;
        ((o[0] = t),
          (o[1] = a),
          (o[2] = l),
          (o[3] = c),
          (o[4] = c),
          (o[5] = u),
          (o[6] = h),
          (o[7] = i));
      }
      function x(t, e, r, n, a, h, l, p, d, v, g) {
        var _,
          m,
          x,
          w,
          b,
          k = 0.005,
          S = 1 / 0;
        ((u[0] = d), (u[1] = v));
        for (var T = 0; T < 1; T += 0.05)
          ((c[0] = y(t, r, a, l, T)),
            (c[1] = y(e, n, h, p, T)),
            (w = (0, i.distSquare)(u, c)) < S && ((_ = T), (S = w)));
        S = 1 / 0;
        for (var A = 0; A < 32 && !(k < s); A++)
          ((m = _ - k),
            (x = _ + k),
            (c[0] = y(t, r, a, l, m)),
            (c[1] = y(e, n, h, p, m)),
            (w = (0, i.distSquare)(c, u)),
            m >= 0 && w < S
              ? ((_ = m), (S = w))
              : ((f[0] = y(t, r, a, l, x)),
                (f[1] = y(e, n, h, p, x)),
                (b = (0, i.distSquare)(f, u)),
                x <= 1 && b < S ? ((_ = x), (S = b)) : (k *= 0.5)));
        return (g && ((g[0] = y(t, r, a, l, _)), (g[1] = y(e, n, h, p, _))), o(S));
      }
      function w(t, e, r, i, n, o, a, s, h) {
        for (var l = t, u = e, c = 0, f = 1 / h, p = 1; p <= h; p++) {
          var d = p * f,
            v = y(t, r, n, a, d),
            g = y(e, i, o, s, d),
            _ = v - l,
            m = g - u;
          ((c += Math.sqrt(_ * _ + m * m)), (l = v), (u = g));
        }
        return c;
      }
      function b(t, e, r, i) {
        var n = 1 - i;
        return n * (n * t + 2 * i * e) + i * i * r;
      }
      function k(t, e, r, i) {
        return 2 * ((1 - i) * (e - t) + i * (r - e));
      }
      function S(t, e, r, i, n) {
        var a = t - 2 * e + r,
          s = 2 * (e - t),
          h = t - i,
          l = 0;
        if (p(a)) d(s) && (c = -h / s) >= 0 && c <= 1 && (n[l++] = c);
        else {
          var u = s * s - 4 * a * h;
          if (p(u)) (c = -s / (2 * a)) >= 0 && c <= 1 && (n[l++] = c);
          else if (u > 0) {
            var c,
              f = o(u),
              y = (-s - f) / (2 * a);
            ((c = (-s + f) / (2 * a)) >= 0 && c <= 1 && (n[l++] = c),
              y >= 0 && y <= 1 && (n[l++] = y));
          }
        }
        return l;
      }
      function T(t, e, r) {
        var i = t + r - 2 * e;
        return 0 === i ? 0.5 : (t - e) / i;
      }
      function A(t, e, r, i, n) {
        var o = (e - t) * i + t,
          a = (r - e) * i + e,
          s = (a - o) * i + o;
        ((n[0] = t), (n[1] = o), (n[2] = s), (n[3] = s), (n[4] = a), (n[5] = r));
      }
      function C(t, e, r, n, a, h, l, p, d) {
        var y,
          v = 0.005,
          g = 1 / 0;
        ((u[0] = l), (u[1] = p));
        for (var _ = 0; _ < 1; _ += 0.05)
          ((c[0] = b(t, r, a, _)),
            (c[1] = b(e, n, h, _)),
            (k = (0, i.distSquare)(u, c)) < g && ((y = _), (g = k)));
        g = 1 / 0;
        for (var m = 0; m < 32 && !(v < s); m++) {
          var x = y - v,
            w = y + v;
          ((c[0] = b(t, r, a, x)), (c[1] = b(e, n, h, x)));
          var k = (0, i.distSquare)(c, u);
          if (x >= 0 && k < g) ((y = x), (g = k));
          else {
            ((f[0] = b(t, r, a, w)), (f[1] = b(e, n, h, w)));
            var S = (0, i.distSquare)(f, u);
            w <= 1 && S < g ? ((y = w), (g = S)) : (v *= 0.5);
          }
        }
        return (d && ((d[0] = b(t, r, a, y)), (d[1] = b(e, n, h, y))), o(g));
      }
      function P(t, e, r, i, n, o, a) {
        for (var s = t, h = e, l = 0, u = 1 / a, c = 1; c <= a; c++) {
          var f = c * u,
            p = b(t, r, n, f),
            d = b(e, i, o, f),
            y = p - s,
            v = d - h;
          ((l += Math.sqrt(y * y + v * v)), (s = p), (h = d));
        }
        return l;
      }
    },
    429687: (t, e, r) => {
      r.d(e, { Me: () => d, ot: () => c, oq: () => u, lJ: () => l });
      var i = r(738123),
        n = Math.log(2);
      function o(t, e, r, i, a, s) {
        var h = i + '-' + a,
          l = t.length;
        if (s.hasOwnProperty(h)) return s[h];
        if (1 === e) {
          var u = Math.round(Math.log(((1 << l) - 1) & ~a) / n);
          return t[r][u];
        }
        for (var c = i | (1 << r), f = r + 1; i & (1 << f);) f++;
        for (var p = 0, d = 0, y = 0; d < l; d++) {
          var v = 1 << d;
          v & a || ((p += (y % 2 ? -1 : 1) * t[r][d] * o(t, e - 1, f, c, a | v, s)), y++);
        }
        return ((s[h] = p), p);
      }
      function a(t, e) {
        var r = [
            [t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
            [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
            [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
            [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
            [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
            [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
            [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
            [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]],
          ],
          i = {},
          n = o(r, 8, 0, 0, 0, i);
        if (0 !== n) {
          for (var a = [], s = 0; s < 8; s++)
            for (var h = 0; h < 8; h++)
              (null == a[h] && (a[h] = 0),
                (a[h] +=
                  ((((s + h) % 2 ? -1 : 1) * o(r, 7, 0 === s ? 1 : 0, 1 << s, 1 << h, i)) / n) *
                  e[s]));
          return function (t, e, r) {
            var i = e * a[6] + r * a[7] + 1;
            ((t[0] = (e * a[0] + r * a[1] + a[2]) / i), (t[1] = (e * a[3] + r * a[4] + a[5]) / i));
          };
        }
      }
      var s = '___zrEVENTSAVED',
        h = [];
      function l(t, e, r, i, n) {
        return u(h, e, i, n, !0) && u(t, r, h[0], h[1]);
      }
      function u(t, e, r, n, o) {
        if (e.getBoundingClientRect && i.A.domSupported && !c(e)) {
          var h = e[s] || (e[s] = {}),
            l = (function (t, e) {
              var r = e.markers;
              if (r) return r;
              r = e.markers = [];
              for (var i = ['left', 'right'], n = ['top', 'bottom'], o = 0; o < 4; o++) {
                var a = document.createElement('div'),
                  s = o % 2,
                  h = (o >> 1) % 2;
                ((a.style.cssText = [
                  'position: absolute',
                  'visibility: hidden',
                  'padding: 0',
                  'margin: 0',
                  'border-width: 0',
                  'user-select: none',
                  'width:0',
                  'height:0',
                  i[s] + ':0',
                  n[h] + ':0',
                  i[1 - s] + ':auto',
                  n[1 - h] + ':auto',
                  '',
                ].join('!important;')),
                  t.appendChild(a),
                  r.push(a));
              }
              return r;
            })(e, h),
            u = (function (t, e, r) {
              for (
                var i = r ? 'invTrans' : 'trans',
                  n = e[i],
                  o = e.srcCoords,
                  s = [],
                  h = [],
                  l = !0,
                  u = 0;
                u < 4;
                u++
              ) {
                var c = t[u].getBoundingClientRect(),
                  f = 2 * u,
                  p = c.left,
                  d = c.top;
                (s.push(p, d),
                  (l = l && o && p === o[f] && d === o[f + 1]),
                  h.push(t[u].offsetLeft, t[u].offsetTop));
              }
              return l && n ? n : ((e.srcCoords = s), (e[i] = r ? a(h, s) : a(s, h)));
            })(l, h, o);
          if (u) return (u(t, r, n), !0);
        }
        return !1;
      }
      function c(t) {
        return 'CANVAS' === t.nodeName.toUpperCase();
      }
      var f = /([&<>"'])/g,
        p = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      function d(t) {
        return null == t
          ? ''
          : (t + '').replace(f, function (t, e) {
              return p[e];
            });
      }
    },
    738123: (t, e, r) => {
      r.d(e, { A: () => o });
      var i = function () {
          ((this.firefox = !1),
            (this.ie = !1),
            (this.edge = !1),
            (this.newEdge = !1),
            (this.weChat = !1));
        },
        n = new (function () {
          ((this.browser = new i()),
            (this.node = !1),
            (this.wxa = !1),
            (this.worker = !1),
            (this.svgSupported = !1),
            (this.touchEventsSupported = !1),
            (this.pointerEventsSupported = !1),
            (this.domSupported = !1),
            (this.transformSupported = !1),
            (this.transform3dSupported = !1),
            (this.hasGlobalWindow = 'undefined' != typeof window));
        })();
      'object' == typeof wx && 'function' == typeof wx.getSystemInfoSync
        ? ((n.wxa = !0), (n.touchEventsSupported = !0))
        : 'undefined' == typeof document && 'undefined' != typeof self
          ? (n.worker = !0)
          : !n.hasGlobalWindow || 'Deno' in window
            ? ((n.node = !0), (n.svgSupported = !0))
            : (function (t, e) {
                var r = e.browser,
                  i = t.match(/Firefox\/([\d.]+)/),
                  n = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
                  o = t.match(/Edge?\/([\d.]+)/),
                  a = /micromessenger/i.test(t);
                (i && ((r.firefox = !0), (r.version = i[1])),
                  n && ((r.ie = !0), (r.version = n[1])),
                  o && ((r.edge = !0), (r.version = o[1]), (r.newEdge = +o[1].split('.')[0] > 18)),
                  a && (r.weChat = !0),
                  (e.svgSupported = 'undefined' != typeof SVGRect),
                  (e.touchEventsSupported = 'ontouchstart' in window && !r.ie && !r.edge),
                  (e.pointerEventsSupported =
                    'onpointerdown' in window && (r.edge || (r.ie && +r.version >= 11))),
                  (e.domSupported = 'undefined' != typeof document));
                var s = document.documentElement.style;
                ((e.transform3dSupported =
                  ((r.ie && 'transition' in s) ||
                    r.edge ||
                    ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()) ||
                    'MozPerspective' in s) &&
                  !('OTransition' in s)),
                  (e.transformSupported = e.transform3dSupported || (r.ie && +r.version >= 9)));
              })(navigator.userAgent, n);
      const o = n;
    },
    435452: (t, e, r) => {
      r.d(e, {
        W5: () => y,
        Yo: () => h,
        ds: () => d,
        e0: () => c,
        f: () => p,
        mK: () => u,
        q2: () => f,
      });
      var i = r(738123),
        n = r(429687),
        o = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        a = [],
        s = i.A.browser.firefox && +i.A.browser.version.split('.')[0] < 39;
      function h(t, e, r, i) {
        return (
          (r = r || {}),
          i
            ? l(t, e, r)
            : s && null != e.layerX && e.layerX !== e.offsetX
              ? ((r.zrX = e.layerX), (r.zrY = e.layerY))
              : null != e.offsetX
                ? ((r.zrX = e.offsetX), (r.zrY = e.offsetY))
                : l(t, e, r),
          r
        );
      }
      function l(t, e, r) {
        if (i.A.domSupported && t.getBoundingClientRect) {
          var o = e.clientX,
            s = e.clientY;
          if ((0, n.ot)(t)) {
            var h = t.getBoundingClientRect();
            return ((r.zrX = o - h.left), void (r.zrY = s - h.top));
          }
          if ((0, n.oq)(a, t, o, s)) return ((r.zrX = a[0]), void (r.zrY = a[1]));
        }
        r.zrX = r.zrY = 0;
      }
      function u(t) {
        return t || window.event;
      }
      function c(t, e, r) {
        if (null != (e = u(e)).zrX) return e;
        var i = e.type;
        if (i && i.indexOf('touch') >= 0) {
          var n = 'touchend' !== i ? e.targetTouches[0] : e.changedTouches[0];
          n && h(t, n, e, r);
        } else {
          h(t, e, e, r);
          var a = (function (t) {
            var e = t.wheelDelta;
            if (e) return e;
            var r = t.deltaX,
              i = t.deltaY;
            return null == r || null == i
              ? e
              : 3 *
                  (0 !== i ? Math.abs(i) : Math.abs(r)) *
                  (i > 0 ? -1 : i < 0 ? 1 : r > 0 ? -1 : 1);
          })(e);
          e.zrDelta = a ? a / 120 : -(e.detail || 0) / 3;
        }
        var s = e.button;
        return (
          null == e.which &&
            void 0 !== s &&
            o.test(e.type) &&
            (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
          e
        );
      }
      function f(t, e, r, i) {
        t.addEventListener(e, r, i);
      }
      function p(t, e, r, i) {
        t.removeEventListener(e, r, i);
      }
      var d = function (t) {
        (t.preventDefault(), t.stopPropagation(), (t.cancelBubble = !0));
      };
      function y(t) {
        return 2 === t.which || 3 === t.which;
      }
    },
    345587: (t, e, r) => {
      function i() {
        return [1, 0, 0, 1, 0, 0];
      }
      function n(t) {
        return ((t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 1), (t[4] = 0), (t[5] = 0), t);
      }
      function o(t, e) {
        return (
          (t[0] = e[0]),
          (t[1] = e[1]),
          (t[2] = e[2]),
          (t[3] = e[3]),
          (t[4] = e[4]),
          (t[5] = e[5]),
          t
        );
      }
      function a(t, e, r) {
        var i = e[0] * r[0] + e[2] * r[1],
          n = e[1] * r[0] + e[3] * r[1],
          o = e[0] * r[2] + e[2] * r[3],
          a = e[1] * r[2] + e[3] * r[3],
          s = e[0] * r[4] + e[2] * r[5] + e[4],
          h = e[1] * r[4] + e[3] * r[5] + e[5];
        return ((t[0] = i), (t[1] = n), (t[2] = o), (t[3] = a), (t[4] = s), (t[5] = h), t);
      }
      function s(t, e, r) {
        return (
          (t[0] = e[0]),
          (t[1] = e[1]),
          (t[2] = e[2]),
          (t[3] = e[3]),
          (t[4] = e[4] + r[0]),
          (t[5] = e[5] + r[1]),
          t
        );
      }
      function h(t, e, r, i) {
        void 0 === i && (i = [0, 0]);
        var n = e[0],
          o = e[2],
          a = e[4],
          s = e[1],
          h = e[3],
          l = e[5],
          u = Math.sin(r),
          c = Math.cos(r);
        return (
          (t[0] = n * c + s * u),
          (t[1] = -n * u + s * c),
          (t[2] = o * c + h * u),
          (t[3] = -o * u + c * h),
          (t[4] = c * (a - i[0]) + u * (l - i[1]) + i[0]),
          (t[5] = c * (l - i[1]) - u * (a - i[0]) + i[1]),
          t
        );
      }
      function l(t, e, r) {
        var i = r[0],
          n = r[1];
        return (
          (t[0] = e[0] * i),
          (t[1] = e[1] * n),
          (t[2] = e[2] * i),
          (t[3] = e[3] * n),
          (t[4] = e[4] * i),
          (t[5] = e[5] * n),
          t
        );
      }
      function u(t, e) {
        var r = e[0],
          i = e[2],
          n = e[4],
          o = e[1],
          a = e[3],
          s = e[5],
          h = r * a - o * i;
        return h
          ? ((h = 1 / h),
            (t[0] = a * h),
            (t[1] = -o * h),
            (t[2] = -i * h),
            (t[3] = r * h),
            (t[4] = (i * s - a * n) * h),
            (t[5] = (o * n - r * s) * h),
            t)
          : null;
      }
      function c(t) {
        var e = [1, 0, 0, 1, 0, 0];
        return (o(e, t), e);
      }
      (r.r(e),
        r.d(e, {
          clone: () => c,
          copy: () => o,
          create: () => i,
          identity: () => n,
          invert: () => u,
          mul: () => a,
          rotate: () => h,
          scale: () => l,
          translate: () => s,
        }));
    },
    259741: (t, e, r) => {
      r.d(e, { Gs: () => u, OH: () => s, gI: () => o, yh: () => l, zs: () => a });
      var i,
        n,
        o = 12,
        a = 'sans-serif',
        s = o + 'px ' + a,
        h = (function (t) {
          var e = {};
          if ('undefined' == typeof JSON) return e;
          for (var r = 0; r < 95; r++) {
            var i = String.fromCharCode(r + 32),
              n = (t.charCodeAt(r) - 20) / 100;
            e[i] = n;
          }
          return e;
        })(
          "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N",
        ),
        l = {
          createCanvas: function () {
            return 'undefined' != typeof document && document.createElement('canvas');
          },
          measureText: function (t, e) {
            if (!i) {
              var r = l.createCanvas();
              i = r && r.getContext('2d');
            }
            if (i) return (n !== e && (n = i.font = e || s), i.measureText(t));
            t = t || '';
            var a = /((?:\d+)?\.?\d*)px/.exec((e = e || s)),
              u = (a && +a[1]) || o,
              c = 0;
            if (e.indexOf('mono') >= 0) c = u * t.length;
            else
              for (var f = 0; f < t.length; f++) {
                var p = h[t[f]];
                c += null == p ? u : p * u;
              }
            return { width: c };
          },
          loadImage: function (t, e, r) {
            var i = new Image();
            return ((i.onload = e), (i.onerror = r), (i.src = t), i);
          },
        };
      function u(t) {
        for (var e in l) t[e] && (l[e] = t[e]);
      }
    },
    383470: (t, e, r) => {
      r.d(e, { A: () => l });
      var i = 32,
        n = 7;
      function o(t, e, r, i) {
        var n = e + 1;
        if (n === r) return 1;
        if (i(t[n++], t[e]) < 0) {
          for (; n < r && i(t[n], t[n - 1]) < 0;) n++;
          !(function (t, e, r) {
            for (r--; e < r;) {
              var i = t[e];
              ((t[e++] = t[r]), (t[r--] = i));
            }
          })(t, e, n);
        } else for (; n < r && i(t[n], t[n - 1]) >= 0;) n++;
        return n - e;
      }
      function a(t, e, r, i, n) {
        for (i === e && i++; i < r; i++) {
          for (var o, a = t[i], s = e, h = i; s < h;)
            n(a, t[(o = (s + h) >>> 1)]) < 0 ? (h = o) : (s = o + 1);
          var l = i - s;
          switch (l) {
            case 3:
              t[s + 3] = t[s + 2];
            case 2:
              t[s + 2] = t[s + 1];
            case 1:
              t[s + 1] = t[s];
              break;
            default:
              for (; l > 0;) ((t[s + l] = t[s + l - 1]), l--);
          }
          t[s] = a;
        }
      }
      function s(t, e, r, i, n, o) {
        var a = 0,
          s = 0,
          h = 1;
        if (o(t, e[r + n]) > 0) {
          for (s = i - n; h < s && o(t, e[r + n + h]) > 0;)
            ((a = h), (h = 1 + (h << 1)) <= 0 && (h = s));
          (h > s && (h = s), (a += n), (h += n));
        } else {
          for (s = n + 1; h < s && o(t, e[r + n - h]) <= 0;)
            ((a = h), (h = 1 + (h << 1)) <= 0 && (h = s));
          h > s && (h = s);
          var l = a;
          ((a = n - h), (h = n - l));
        }
        for (a++; a < h;) {
          var u = a + ((h - a) >>> 1);
          o(t, e[r + u]) > 0 ? (a = u + 1) : (h = u);
        }
        return h;
      }
      function h(t, e, r, i, n, o) {
        var a = 0,
          s = 0,
          h = 1;
        if (o(t, e[r + n]) < 0) {
          for (s = n + 1; h < s && o(t, e[r + n - h]) < 0;)
            ((a = h), (h = 1 + (h << 1)) <= 0 && (h = s));
          h > s && (h = s);
          var l = a;
          ((a = n - h), (h = n - l));
        } else {
          for (s = i - n; h < s && o(t, e[r + n + h]) >= 0;)
            ((a = h), (h = 1 + (h << 1)) <= 0 && (h = s));
          (h > s && (h = s), (a += n), (h += n));
        }
        for (a++; a < h;) {
          var u = a + ((h - a) >>> 1);
          o(t, e[r + u]) < 0 ? (h = u) : (a = u + 1);
        }
        return h;
      }
      function l(t, e, r, l) {
        (r || (r = 0), l || (l = t.length));
        var u = l - r;
        if (!(u < 2)) {
          var c = 0;
          if (u < i) a(t, r, l, r + (c = o(t, r, l, e)), e);
          else {
            var f = (function (t, e) {
                var r,
                  i,
                  o = n,
                  a = 0,
                  l = [];
                function u(u) {
                  var c = r[u],
                    f = i[u],
                    p = r[u + 1],
                    d = i[u + 1];
                  ((i[u] = f + d),
                    u === a - 3 && ((r[u + 1] = r[u + 2]), (i[u + 1] = i[u + 2])),
                    a--);
                  var y = h(t[p], t, c, f, 0, e);
                  ((c += y),
                    0 !== (f -= y) &&
                      0 !== (d = s(t[c + f - 1], t, p, d, d - 1, e)) &&
                      (f <= d
                        ? (function (r, i, a, u) {
                            var c = 0;
                            for (c = 0; c < i; c++) l[c] = t[r + c];
                            var f = 0,
                              p = a,
                              d = r;
                            if (((t[d++] = t[p++]), 0 !== --u))
                              if (1 !== i) {
                                for (var y, v, g, _ = o; ;) {
                                  ((y = 0), (v = 0), (g = !1));
                                  do {
                                    if (e(t[p], l[f]) < 0) {
                                      if (((t[d++] = t[p++]), v++, (y = 0), 0 === --u)) {
                                        g = !0;
                                        break;
                                      }
                                    } else if (((t[d++] = l[f++]), y++, (v = 0), 1 === --i)) {
                                      g = !0;
                                      break;
                                    }
                                  } while ((y | v) < _);
                                  if (g) break;
                                  do {
                                    if (0 !== (y = h(t[p], l, f, i, 0, e))) {
                                      for (c = 0; c < y; c++) t[d + c] = l[f + c];
                                      if (((d += y), (f += y), (i -= y) <= 1)) {
                                        g = !0;
                                        break;
                                      }
                                    }
                                    if (((t[d++] = t[p++]), 0 === --u)) {
                                      g = !0;
                                      break;
                                    }
                                    if (0 !== (v = s(l[f], t, p, u, 0, e))) {
                                      for (c = 0; c < v; c++) t[d + c] = t[p + c];
                                      if (((d += v), (p += v), 0 === (u -= v))) {
                                        g = !0;
                                        break;
                                      }
                                    }
                                    if (((t[d++] = l[f++]), 1 === --i)) {
                                      g = !0;
                                      break;
                                    }
                                    _--;
                                  } while (y >= n || v >= n);
                                  if (g) break;
                                  (_ < 0 && (_ = 0), (_ += 2));
                                }
                                if (((o = _) < 1 && (o = 1), 1 === i)) {
                                  for (c = 0; c < u; c++) t[d + c] = t[p + c];
                                  t[d + u] = l[f];
                                } else {
                                  if (0 === i) throw new Error();
                                  for (c = 0; c < i; c++) t[d + c] = l[f + c];
                                }
                              } else {
                                for (c = 0; c < u; c++) t[d + c] = t[p + c];
                                t[d + u] = l[f];
                              }
                            else for (c = 0; c < i; c++) t[d + c] = l[f + c];
                          })(c, f, p, d)
                        : (function (r, i, a, u) {
                            var c = 0;
                            for (c = 0; c < u; c++) l[c] = t[a + c];
                            var f = r + i - 1,
                              p = u - 1,
                              d = a + u - 1,
                              y = 0,
                              v = 0;
                            if (((t[d--] = t[f--]), 0 !== --i))
                              if (1 !== u) {
                                for (var g = o; ;) {
                                  var _ = 0,
                                    m = 0,
                                    x = !1;
                                  do {
                                    if (e(l[p], t[f]) < 0) {
                                      if (((t[d--] = t[f--]), _++, (m = 0), 0 === --i)) {
                                        x = !0;
                                        break;
                                      }
                                    } else if (((t[d--] = l[p--]), m++, (_ = 0), 1 === --u)) {
                                      x = !0;
                                      break;
                                    }
                                  } while ((_ | m) < g);
                                  if (x) break;
                                  do {
                                    if (0 !== (_ = i - h(l[p], t, r, i, i - 1, e))) {
                                      for (
                                        i -= _, v = 1 + (d -= _), y = 1 + (f -= _), c = _ - 1;
                                        c >= 0;
                                        c--
                                      )
                                        t[v + c] = t[y + c];
                                      if (0 === i) {
                                        x = !0;
                                        break;
                                      }
                                    }
                                    if (((t[d--] = l[p--]), 1 === --u)) {
                                      x = !0;
                                      break;
                                    }
                                    if (0 !== (m = u - s(t[f], l, 0, u, u - 1, e))) {
                                      for (
                                        u -= m, v = 1 + (d -= m), y = 1 + (p -= m), c = 0;
                                        c < m;
                                        c++
                                      )
                                        t[v + c] = l[y + c];
                                      if (u <= 1) {
                                        x = !0;
                                        break;
                                      }
                                    }
                                    if (((t[d--] = t[f--]), 0 === --i)) {
                                      x = !0;
                                      break;
                                    }
                                    g--;
                                  } while (_ >= n || m >= n);
                                  if (x) break;
                                  (g < 0 && (g = 0), (g += 2));
                                }
                                if (((o = g) < 1 && (o = 1), 1 === u)) {
                                  for (v = 1 + (d -= i), y = 1 + (f -= i), c = i - 1; c >= 0; c--)
                                    t[v + c] = t[y + c];
                                  t[d] = l[p];
                                } else {
                                  if (0 === u) throw new Error();
                                  for (y = d - (u - 1), c = 0; c < u; c++) t[y + c] = l[c];
                                }
                              } else {
                                for (v = 1 + (d -= i), y = 1 + (f -= i), c = i - 1; c >= 0; c--)
                                  t[v + c] = t[y + c];
                                t[d] = l[p];
                              }
                            else for (y = d - (u - 1), c = 0; c < u; c++) t[y + c] = l[c];
                          })(c, f, p, d)));
                }
                return (
                  (r = []),
                  (i = []),
                  {
                    mergeRuns: function () {
                      for (; a > 1;) {
                        var t = a - 2;
                        if (
                          (t >= 1 && i[t - 1] <= i[t] + i[t + 1]) ||
                          (t >= 2 && i[t - 2] <= i[t] + i[t - 1])
                        )
                          i[t - 1] < i[t + 1] && t--;
                        else if (i[t] > i[t + 1]) break;
                        u(t);
                      }
                    },
                    forceMergeRuns: function () {
                      for (; a > 1;) {
                        var t = a - 2;
                        (t > 0 && i[t - 1] < i[t + 1] && t--, u(t));
                      }
                    },
                    pushRun: function (t, e) {
                      ((r[a] = t), (i[a] = e), (a += 1));
                    },
                  }
                );
              })(t, e),
              p = (function (t) {
                for (var e = 0; t >= i;) ((e |= 1 & t), (t >>= 1));
                return t + e;
              })(u);
            do {
              if ((c = o(t, r, l, e)) < p) {
                var d = u;
                (d > p && (d = p), a(t, r, r + d, r + c, e), (c = d));
              }
              (f.pushRun(r, c), f.mergeRuns(), (u -= c), (r += c));
            } while (0 !== u);
            f.forceMergeRuns();
          }
        }
      }
    },
    498026: (t, e, r) => {
      (r.r(e),
        r.d(e, {
          HashMap: () => st,
          RADIAN_TO_DEGREE: () => dt,
          assert: () => tt,
          bind: () => z,
          clone: () => _,
          concatArray: () => lt,
          createCanvas: () => k,
          createHashMap: () => ht,
          createObject: () => ut,
          curry: () => I,
          defaults: () => b,
          disableUserSelect: () => ct,
          each: () => P,
          eqNaN: () => Z,
          extend: () => w,
          filter: () => L,
          find: () => D,
          guid: () => v,
          hasOwn: () => ft,
          indexOf: () => S,
          inherits: () => T,
          isArray: () => B,
          isArrayLike: () => C,
          isBuiltInObject: () => Y,
          isDom: () => j,
          isFunction: () => F,
          isGradientObject: () => q,
          isImagePatternObject: () => V,
          isNumber: () => W,
          isObject: () => H,
          isPrimitive: () => nt,
          isRegExp: () => G,
          isString: () => N,
          isStringSafe: () => E,
          isTypedArray: () => X,
          keys: () => R,
          logError: () => g,
          map: () => M,
          merge: () => m,
          mergeAll: () => x,
          mixin: () => A,
          noop: () => pt,
          normalizeCssArray: () => J,
          reduce: () => O,
          retrieve: () => U,
          retrieve2: () => K,
          retrieve3: () => $,
          setAsPrimitive: () => it,
          slice: () => Q,
          trim: () => et,
        }));
      var i = r(259741),
        n = O(
          [
            'Function',
            'RegExp',
            'Date',
            'Error',
            'CanvasGradient',
            'CanvasPattern',
            'Image',
            'Canvas',
          ],
          function (t, e) {
            return ((t['[object ' + e + ']'] = !0), t);
          },
          {},
        ),
        o = O(
          [
            'Int8',
            'Uint8',
            'Uint8Clamped',
            'Int16',
            'Uint16',
            'Int32',
            'Uint32',
            'Float32',
            'Float64',
          ],
          function (t, e) {
            return ((t['[object ' + e + 'Array]'] = !0), t);
          },
          {},
        ),
        a = Object.prototype.toString,
        s = Array.prototype,
        h = s.forEach,
        l = s.filter,
        u = s.slice,
        c = s.map,
        f = function () {}.constructor,
        p = f ? f.prototype : null,
        d = '__proto__',
        y = 2311;
      function v() {
        return y++;
      }
      function g() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        'undefined' != typeof console && console.error.apply(console, t);
      }
      function _(t) {
        if (null == t || 'object' != typeof t) return t;
        var e = t,
          r = a.call(t);
        if ('[object Array]' === r) {
          if (!nt(t)) {
            e = [];
            for (var i = 0, s = t.length; i < s; i++) e[i] = _(t[i]);
          }
        } else if (o[r]) {
          if (!nt(t)) {
            var h = t.constructor;
            if (h.from) e = h.from(t);
            else for (e = new h(t.length), i = 0, s = t.length; i < s; i++) e[i] = t[i];
          }
        } else if (!n[r] && !nt(t) && !j(t))
          for (var l in ((e = {}), t)) t.hasOwnProperty(l) && l !== d && (e[l] = _(t[l]));
        return e;
      }
      function m(t, e, r) {
        if (!H(e) || !H(t)) return r ? _(e) : t;
        for (var i in e)
          if (e.hasOwnProperty(i) && i !== d) {
            var n = t[i],
              o = e[i];
            !H(o) || !H(n) || B(o) || B(n) || j(o) || j(n) || Y(o) || Y(n) || nt(o) || nt(n)
              ? (!r && i in t) || (t[i] = _(e[i]))
              : m(n, o, r);
          }
        return t;
      }
      function x(t, e) {
        for (var r = t[0], i = 1, n = t.length; i < n; i++) r = m(r, t[i], e);
        return r;
      }
      function w(t, e) {
        if (Object.assign) Object.assign(t, e);
        else for (var r in e) e.hasOwnProperty(r) && r !== d && (t[r] = e[r]);
        return t;
      }
      function b(t, e, r) {
        for (var i = R(e), n = 0, o = i.length; n < o; n++) {
          var a = i[n];
          (r ? null != e[a] : null == t[a]) && (t[a] = e[a]);
        }
        return t;
      }
      var k = i.yh.createCanvas;
      function S(t, e) {
        if (t) {
          if (t.indexOf) return t.indexOf(e);
          for (var r = 0, i = t.length; r < i; r++) if (t[r] === e) return r;
        }
        return -1;
      }
      function T(t, e) {
        var r = t.prototype;
        function i() {}
        for (var n in ((i.prototype = e.prototype), (t.prototype = new i()), r))
          r.hasOwnProperty(n) && (t.prototype[n] = r[n]);
        ((t.prototype.constructor = t), (t.superClass = e));
      }
      function A(t, e, r) {
        if (
          ((t = 'prototype' in t ? t.prototype : t),
          (e = 'prototype' in e ? e.prototype : e),
          Object.getOwnPropertyNames)
        )
          for (var i = Object.getOwnPropertyNames(e), n = 0; n < i.length; n++) {
            var o = i[n];
            'constructor' !== o && (r ? null != e[o] : null == t[o]) && (t[o] = e[o]);
          }
        else b(t, e, r);
      }
      function C(t) {
        return !!t && 'string' != typeof t && 'number' == typeof t.length;
      }
      function P(t, e, r) {
        if (t && e)
          if (t.forEach && t.forEach === h) t.forEach(e, r);
          else if (t.length === +t.length)
            for (var i = 0, n = t.length; i < n; i++) e.call(r, t[i], i, t);
          else for (var o in t) t.hasOwnProperty(o) && e.call(r, t[o], o, t);
      }
      function M(t, e, r) {
        if (!t) return [];
        if (!e) return Q(t);
        if (t.map && t.map === c) return t.map(e, r);
        for (var i = [], n = 0, o = t.length; n < o; n++) i.push(e.call(r, t[n], n, t));
        return i;
      }
      function O(t, e, r, i) {
        if (t && e) {
          for (var n = 0, o = t.length; n < o; n++) r = e.call(i, r, t[n], n, t);
          return r;
        }
      }
      function L(t, e, r) {
        if (!t) return [];
        if (!e) return Q(t);
        if (t.filter && t.filter === l) return t.filter(e, r);
        for (var i = [], n = 0, o = t.length; n < o; n++) e.call(r, t[n], n, t) && i.push(t[n]);
        return i;
      }
      function D(t, e, r) {
        if (t && e)
          for (var i = 0, n = t.length; i < n; i++) if (e.call(r, t[i], i, t)) return t[i];
      }
      function R(t) {
        if (!t) return [];
        if (Object.keys) return Object.keys(t);
        var e = [];
        for (var r in t) t.hasOwnProperty(r) && e.push(r);
        return e;
      }
      var z =
        p && F(p.bind)
          ? p.call.bind(p.bind)
          : function (t, e) {
              for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
              return function () {
                return t.apply(e, r.concat(u.call(arguments)));
              };
            };
      function I(t) {
        for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        return function () {
          return t.apply(this, e.concat(u.call(arguments)));
        };
      }
      function B(t) {
        return Array.isArray ? Array.isArray(t) : '[object Array]' === a.call(t);
      }
      function F(t) {
        return 'function' == typeof t;
      }
      function N(t) {
        return 'string' == typeof t;
      }
      function E(t) {
        return '[object String]' === a.call(t);
      }
      function W(t) {
        return 'number' == typeof t;
      }
      function H(t) {
        var e = typeof t;
        return 'function' === e || (!!t && 'object' === e);
      }
      function Y(t) {
        return !!n[a.call(t)];
      }
      function X(t) {
        return !!o[a.call(t)];
      }
      function j(t) {
        return (
          'object' == typeof t &&
          'number' == typeof t.nodeType &&
          'object' == typeof t.ownerDocument
        );
      }
      function q(t) {
        return null != t.colorStops;
      }
      function V(t) {
        return null != t.image;
      }
      function G(t) {
        return '[object RegExp]' === a.call(t);
      }
      function Z(t) {
        return t != t;
      }
      function U() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var r = 0, i = t.length; r < i; r++) if (null != t[r]) return t[r];
      }
      function K(t, e) {
        return null != t ? t : e;
      }
      function $(t, e, r) {
        return null != t ? t : null != e ? e : r;
      }
      function Q(t) {
        for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        return u.apply(t, e);
      }
      function J(t) {
        if ('number' == typeof t) return [t, t, t, t];
        var e = t.length;
        return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t;
      }
      function tt(t, e) {
        if (!t) throw new Error(e);
      }
      function et(t) {
        return null == t
          ? null
          : 'function' == typeof t.trim
            ? t.trim()
            : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      }
      var rt = '__ec_primitive__';
      function it(t) {
        t[rt] = !0;
      }
      function nt(t) {
        return t[rt];
      }
      var ot = (function () {
          function t() {
            this.data = {};
          }
          return (
            (t.prototype.delete = function (t) {
              var e = this.has(t);
              return (e && delete this.data[t], e);
            }),
            (t.prototype.has = function (t) {
              return this.data.hasOwnProperty(t);
            }),
            (t.prototype.get = function (t) {
              return this.data[t];
            }),
            (t.prototype.set = function (t, e) {
              return ((this.data[t] = e), this);
            }),
            (t.prototype.keys = function () {
              return R(this.data);
            }),
            (t.prototype.forEach = function (t) {
              var e = this.data;
              for (var r in e) e.hasOwnProperty(r) && t(e[r], r);
            }),
            t
          );
        })(),
        at = 'function' == typeof Map,
        st = (function () {
          function t(e) {
            var r = B(e);
            this.data = at ? new Map() : new ot();
            var i = this;
            function n(t, e) {
              r ? i.set(t, e) : i.set(e, t);
            }
            e instanceof t ? e.each(n) : e && P(e, n);
          }
          return (
            (t.prototype.hasKey = function (t) {
              return this.data.has(t);
            }),
            (t.prototype.get = function (t) {
              return this.data.get(t);
            }),
            (t.prototype.set = function (t, e) {
              return (this.data.set(t, e), e);
            }),
            (t.prototype.each = function (t, e) {
              this.data.forEach(function (r, i) {
                t.call(e, r, i);
              });
            }),
            (t.prototype.keys = function () {
              var t = this.data.keys();
              return at ? Array.from(t) : t;
            }),
            (t.prototype.removeKey = function (t) {
              this.data.delete(t);
            }),
            t
          );
        })();
      function ht(t) {
        return new st(t);
      }
      function lt(t, e) {
        for (var r = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) r[i] = t[i];
        var n = t.length;
        for (i = 0; i < e.length; i++) r[i + n] = e[i];
        return r;
      }
      function ut(t, e) {
        var r;
        if (Object.create) r = Object.create(t);
        else {
          var i = function () {};
          ((i.prototype = t), (r = new i()));
        }
        return (e && w(r, e), r);
      }
      function ct(t) {
        var e = t.style;
        ((e.webkitUserSelect = 'none'),
          (e.userSelect = 'none'),
          (e.webkitTapHighlightColor = 'rgba(0,0,0,0)'),
          (e['-webkit-touch-callout'] = 'none'));
      }
      function ft(t, e) {
        return t.hasOwnProperty(e);
      }
      function pt() {}
      var dt = 180 / Math.PI;
    },
    983509: (t, e, r) => {
      function i(t, e) {
        return (null == t && (t = 0), null == e && (e = 0), [t, e]);
      }
      function n(t, e) {
        return ((t[0] = e[0]), (t[1] = e[1]), t);
      }
      function o(t) {
        return [t[0], t[1]];
      }
      function a(t, e, r) {
        return ((t[0] = e), (t[1] = r), t);
      }
      function s(t, e, r) {
        return ((t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), t);
      }
      function h(t, e, r, i) {
        return ((t[0] = e[0] + r[0] * i), (t[1] = e[1] + r[1] * i), t);
      }
      function l(t, e, r) {
        return ((t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), t);
      }
      function u(t) {
        return Math.sqrt(f(t));
      }
      (r.r(e),
        r.d(e, {
          add: () => s,
          applyTransform: () => T,
          clone: () => o,
          copy: () => n,
          create: () => i,
          dist: () => x,
          distSquare: () => b,
          distance: () => m,
          distanceSquare: () => w,
          div: () => y,
          dot: () => v,
          len: () => u,
          lenSquare: () => f,
          length: () => c,
          lengthSquare: () => p,
          lerp: () => S,
          max: () => C,
          min: () => A,
          mul: () => d,
          negate: () => k,
          normalize: () => _,
          scale: () => g,
          scaleAndAdd: () => h,
          set: () => a,
          sub: () => l,
        }));
      var c = u;
      function f(t) {
        return t[0] * t[0] + t[1] * t[1];
      }
      var p = f;
      function d(t, e, r) {
        return ((t[0] = e[0] * r[0]), (t[1] = e[1] * r[1]), t);
      }
      function y(t, e, r) {
        return ((t[0] = e[0] / r[0]), (t[1] = e[1] / r[1]), t);
      }
      function v(t, e) {
        return t[0] * e[0] + t[1] * e[1];
      }
      function g(t, e, r) {
        return ((t[0] = e[0] * r), (t[1] = e[1] * r), t);
      }
      function _(t, e) {
        var r = u(e);
        return (0 === r ? ((t[0] = 0), (t[1] = 0)) : ((t[0] = e[0] / r), (t[1] = e[1] / r)), t);
      }
      function m(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
      }
      var x = m;
      function w(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
      }
      var b = w;
      function k(t, e) {
        return ((t[0] = -e[0]), (t[1] = -e[1]), t);
      }
      function S(t, e, r, i) {
        return ((t[0] = e[0] + i * (r[0] - e[0])), (t[1] = e[1] + i * (r[1] - e[1])), t);
      }
      function T(t, e, r) {
        var i = e[0],
          n = e[1];
        return ((t[0] = r[0] * i + r[2] * n + r[4]), (t[1] = r[1] * i + r[3] * n + r[5]), t);
      }
      function A(t, e, r) {
        return ((t[0] = Math.min(e[0], r[0])), (t[1] = Math.min(e[1], r[1])), t);
      }
      function C(t, e, r) {
        return ((t[0] = Math.max(e[0], r[0])), (t[1] = Math.max(e[1], r[1])), t);
      }
    },
    222889: (t, e, r) => {
      r.d(e, { A: () => S });
      var i,
        n,
        o = r(15215),
        a = r(435452),
        s = r(498026),
        h = r(757861),
        l = r(738123),
        u = l.A.domSupported,
        c =
          ((n = { pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1 }),
          {
            mouse: (i = [
              'click',
              'dblclick',
              'mousewheel',
              'wheel',
              'mouseout',
              'mouseup',
              'mousedown',
              'mousemove',
              'contextmenu',
            ]),
            touch: ['touchstart', 'touchend', 'touchmove'],
            pointer: s.map(i, function (t) {
              var e = t.replace('mouse', 'pointer');
              return n.hasOwnProperty(e) ? e : t;
            }),
          }),
        f = ['mousemove', 'mouseup'],
        p = ['pointermove', 'pointerup'],
        d = !1;
      function y(t) {
        var e = t.pointerType;
        return 'pen' === e || 'touch' === e;
      }
      function v(t) {
        t && (t.zrByTouch = !0);
      }
      function g(t, e) {
        for (
          var r = e, i = !1;
          r && 9 !== r.nodeType && !(i = r.domBelongToZr || (r !== e && r === t.painterRoot));
        )
          r = r.parentNode;
        return i;
      }
      var _ = function (t, e) {
          ((this.stopPropagation = s.noop),
            (this.stopImmediatePropagation = s.noop),
            (this.preventDefault = s.noop),
            (this.type = e.type),
            (this.target = this.currentTarget = t.dom),
            (this.pointerType = e.pointerType),
            (this.clientX = e.clientX),
            (this.clientY = e.clientY));
        },
        m = {
          mousedown: function (t) {
            ((t = (0, a.e0)(this.dom, t)),
              (this.__mayPointerCapture = [t.zrX, t.zrY]),
              this.trigger('mousedown', t));
          },
          mousemove: function (t) {
            t = (0, a.e0)(this.dom, t);
            var e = this.__mayPointerCapture;
            (!e || (t.zrX === e[0] && t.zrY === e[1]) || this.__togglePointerCapture(!0),
              this.trigger('mousemove', t));
          },
          mouseup: function (t) {
            ((t = (0, a.e0)(this.dom, t)),
              this.__togglePointerCapture(!1),
              this.trigger('mouseup', t));
          },
          mouseout: function (t) {
            g(this, (t = (0, a.e0)(this.dom, t)).toElement || t.relatedTarget) ||
              (this.__pointerCapturing && (t.zrEventControl = 'no_globalout'),
              this.trigger('mouseout', t));
          },
          wheel: function (t) {
            ((d = !0), (t = (0, a.e0)(this.dom, t)), this.trigger('mousewheel', t));
          },
          mousewheel: function (t) {
            d || ((t = (0, a.e0)(this.dom, t)), this.trigger('mousewheel', t));
          },
          touchstart: function (t) {
            (v((t = (0, a.e0)(this.dom, t))),
              (this.__lastTouchMoment = new Date()),
              this.handler.processGesture(t, 'start'),
              m.mousemove.call(this, t),
              m.mousedown.call(this, t));
          },
          touchmove: function (t) {
            (v((t = (0, a.e0)(this.dom, t))),
              this.handler.processGesture(t, 'change'),
              m.mousemove.call(this, t));
          },
          touchend: function (t) {
            (v((t = (0, a.e0)(this.dom, t))),
              this.handler.processGesture(t, 'end'),
              m.mouseup.call(this, t),
              +new Date() - +this.__lastTouchMoment < 300 && m.click.call(this, t));
          },
          pointerdown: function (t) {
            m.mousedown.call(this, t);
          },
          pointermove: function (t) {
            y(t) || m.mousemove.call(this, t);
          },
          pointerup: function (t) {
            m.mouseup.call(this, t);
          },
          pointerout: function (t) {
            y(t) || m.mouseout.call(this, t);
          },
        };
      s.each(['click', 'dblclick', 'contextmenu'], function (t) {
        m[t] = function (e) {
          ((e = (0, a.e0)(this.dom, e)), this.trigger(t, e));
        };
      });
      var x = {
        pointermove: function (t) {
          y(t) || x.mousemove.call(this, t);
        },
        pointerup: function (t) {
          x.mouseup.call(this, t);
        },
        mousemove: function (t) {
          this.trigger('mousemove', t);
        },
        mouseup: function (t) {
          var e = this.__pointerCapturing;
          (this.__togglePointerCapture(!1),
            this.trigger('mouseup', t),
            e && ((t.zrEventControl = 'only_globalout'), this.trigger('mouseout', t)));
        },
      };
      function w(t, e, r, i) {
        ((t.mounted[e] = r), (t.listenerOpts[e] = i), (0, a.q2)(t.domTarget, e, r, i));
      }
      function b(t) {
        var e = t.mounted;
        for (var r in e) e.hasOwnProperty(r) && (0, a.f)(t.domTarget, r, e[r], t.listenerOpts[r]);
        t.mounted = {};
      }
      var k = function (t, e) {
        ((this.mounted = {}),
          (this.listenerOpts = {}),
          (this.touching = !1),
          (this.domTarget = t),
          (this.domHandlers = e));
      };
      const S = (function (t) {
        function e(e, r) {
          var i,
            n,
            o,
            h = t.call(this) || this;
          return (
            (h.__pointerCapturing = !1),
            (h.dom = e),
            (h.painterRoot = r),
            (h._localHandlerScope = new k(e, m)),
            u && (h._globalHandlerScope = new k(document, x)),
            (i = h),
            (n = h._localHandlerScope),
            (o = n.domHandlers),
            l.A.pointerEventsSupported
              ? s.each(c.pointer, function (t) {
                  w(n, t, function (e) {
                    o[t].call(i, e);
                  });
                })
              : (l.A.touchEventsSupported &&
                  s.each(c.touch, function (t) {
                    w(n, t, function (e) {
                      (o[t].call(i, e),
                        (function (t) {
                          ((t.touching = !0),
                            null != t.touchTimer &&
                              (clearTimeout(t.touchTimer), (t.touchTimer = null)),
                            (t.touchTimer = setTimeout(function () {
                              ((t.touching = !1), (t.touchTimer = null));
                            }, 700)));
                        })(n));
                    });
                  }),
                s.each(c.mouse, function (t) {
                  w(n, t, function (e) {
                    ((e = (0, a.mK)(e)), n.touching || o[t].call(i, e));
                  });
                })),
            h
          );
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.dispose = function () {
            (b(this._localHandlerScope), u && b(this._globalHandlerScope));
          }),
          (e.prototype.setCursor = function (t) {
            this.dom.style && (this.dom.style.cursor = t || 'default');
          }),
          (e.prototype.__togglePointerCapture = function (t) {
            if (((this.__mayPointerCapture = null), u && +this.__pointerCapturing ^ +t)) {
              this.__pointerCapturing = t;
              var e = this._globalHandlerScope;
              t
                ? (function (t, e) {
                    function r(r) {
                      w(
                        e,
                        r,
                        function (i) {
                          ((i = (0, a.mK)(i)),
                            g(t, i.target) ||
                              ((i = (function (t, e) {
                                return (0, a.e0)(t.dom, new _(t, e), !0);
                              })(t, i)),
                              e.domHandlers[r].call(t, i)));
                        },
                        { capture: !0 },
                      );
                    }
                    l.A.pointerEventsSupported
                      ? s.each(p, r)
                      : l.A.touchEventsSupported || s.each(f, r);
                  })(this, e)
                : b(e);
            }
          }),
          e
        );
      })(h.A);
    },
    482591: (t, e, r) => {
      r.d(e, { A: () => o });
      var i = r(15215),
        n = r(467065);
      const o = (function (t) {
        function e() {
          var e = (null !== t && t.apply(this, arguments)) || this;
          return ((e.type = 'compound'), e);
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype._updatePathDirty = function () {
            for (var t = this.shape.paths, e = this.shapeChanged(), r = 0; r < t.length; r++)
              e = e || t[r].shapeChanged();
            e && this.dirtyShape();
          }),
          (e.prototype.beforeBrush = function () {
            this._updatePathDirty();
            for (
              var t = this.shape.paths || [], e = this.getGlobalScale(), r = 0;
              r < t.length;
              r++
            )
              (t[r].path || t[r].createPathProxy(),
                t[r].path.setScale(e[0], e[1], t[r].segmentIgnoreThreshold));
          }),
          (e.prototype.buildPath = function (t, e) {
            for (var r = e.paths || [], i = 0; i < r.length; i++) r[i].buildPath(t, r[i].shape, !0);
          }),
          (e.prototype.afterBrush = function () {
            for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].pathUpdated();
          }),
          (e.prototype.getBoundingRect = function () {
            return (this._updatePathDirty.call(this), n.Ay.prototype.getBoundingRect.call(this));
          }),
          e
        );
      })(n.Ay);
    },
    171519: (t, e, r) => {
      r.d(e, { Ay: () => v, oN: () => l, sW: () => u });
      var i = r(15215),
        n = r(962454),
        o = r(529308),
        a = r(498026),
        s = r(756448),
        h = '__zr_style_' + Math.round(10 * Math.random()),
        l = {
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: '#000',
          opacity: 1,
          blend: 'source-over',
        },
        u = {
          style: {
            shadowBlur: !0,
            shadowOffsetX: !0,
            shadowOffsetY: !0,
            shadowColor: !0,
            opacity: !0,
          },
        };
      l[h] = !0;
      var c = ['z', 'z2', 'invisible'],
        f = ['invisible'],
        p = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          var r;
          return (
            (0, i.__extends)(e, t),
            (e.prototype._init = function (e) {
              for (var r = (0, a.keys)(e), i = 0; i < r.length; i++) {
                var n = r[i];
                'style' === n ? this.useStyle(e[n]) : t.prototype.attrKV.call(this, n, e[n]);
              }
              this.style || this.useStyle({});
            }),
            (e.prototype.beforeBrush = function () {}),
            (e.prototype.afterBrush = function () {}),
            (e.prototype.innerBeforeBrush = function () {}),
            (e.prototype.innerAfterBrush = function () {}),
            (e.prototype.shouldBePainted = function (t, e, r, i) {
              var n,
                o,
                a,
                s = this.transform;
              if (
                this.ignore ||
                this.invisible ||
                0 === this.style.opacity ||
                (this.culling &&
                  ((n = this),
                  (o = t),
                  (a = e),
                  d.copy(n.getBoundingRect()),
                  n.transform && d.applyTransform(n.transform),
                  (y.width = o),
                  (y.height = a),
                  !d.intersect(y))) ||
                (s && !s[0] && !s[3])
              )
                return !1;
              if (r && this.__clipPaths)
                for (var h = 0; h < this.__clipPaths.length; ++h)
                  if (this.__clipPaths[h].isZeroArea()) return !1;
              if (i && this.parent)
                for (var l = this.parent; l;) {
                  if (l.ignore) return !1;
                  l = l.parent;
                }
              return !0;
            }),
            (e.prototype.contain = function (t, e) {
              return this.rectContain(t, e);
            }),
            (e.prototype.traverse = function (t, e) {
              t.call(e, this);
            }),
            (e.prototype.rectContain = function (t, e) {
              var r = this.transformCoordToLocal(t, e);
              return this.getBoundingRect().contain(r[0], r[1]);
            }),
            (e.prototype.getPaintRect = function () {
              var t = this._paintRect;
              if (!this._paintRect || this.__dirty) {
                var e = this.transform,
                  r = this.getBoundingRect(),
                  i = this.style,
                  n = i.shadowBlur || 0,
                  a = i.shadowOffsetX || 0,
                  s = i.shadowOffsetY || 0;
                ((t = this._paintRect || (this._paintRect = new o.A(0, 0, 0, 0))),
                  e ? o.A.applyTransform(t, r, e) : t.copy(r),
                  (n || a || s) &&
                    ((t.width += 2 * n + Math.abs(a)),
                    (t.height += 2 * n + Math.abs(s)),
                    (t.x = Math.min(t.x, t.x + a - n)),
                    (t.y = Math.min(t.y, t.y + s - n))));
                var h = this.dirtyRectTolerance;
                t.isZero() ||
                  ((t.x = Math.floor(t.x - h)),
                  (t.y = Math.floor(t.y - h)),
                  (t.width = Math.ceil(t.width + 1 + 2 * h)),
                  (t.height = Math.ceil(t.height + 1 + 2 * h)));
              }
              return t;
            }),
            (e.prototype.setPrevPaintRect = function (t) {
              t
                ? ((this._prevPaintRect = this._prevPaintRect || new o.A(0, 0, 0, 0)),
                  this._prevPaintRect.copy(t))
                : (this._prevPaintRect = null);
            }),
            (e.prototype.getPrevPaintRect = function () {
              return this._prevPaintRect;
            }),
            (e.prototype.animateStyle = function (t) {
              return this.animate('style', t);
            }),
            (e.prototype.updateDuringAnimation = function (t) {
              'style' === t ? this.dirtyStyle() : this.markRedraw();
            }),
            (e.prototype.attrKV = function (e, r) {
              'style' !== e
                ? t.prototype.attrKV.call(this, e, r)
                : this.style
                  ? this.setStyle(r)
                  : this.useStyle(r);
            }),
            (e.prototype.setStyle = function (t, e) {
              return (
                'string' == typeof t ? (this.style[t] = e) : (0, a.extend)(this.style, t),
                this.dirtyStyle(),
                this
              );
            }),
            (e.prototype.dirtyStyle = function (t) {
              (t || this.markRedraw(), (this.__dirty |= s.pO), this._rect && (this._rect = null));
            }),
            (e.prototype.dirty = function () {
              this.dirtyStyle();
            }),
            (e.prototype.styleChanged = function () {
              return !!(this.__dirty & s.pO);
            }),
            (e.prototype.styleUpdated = function () {
              this.__dirty &= ~s.pO;
            }),
            (e.prototype.createStyle = function (t) {
              return (0, a.createObject)(l, t);
            }),
            (e.prototype.useStyle = function (t) {
              (t[h] || (t = this.createStyle(t)),
                this.__inHover ? (this.__hoverStyle = t) : (this.style = t),
                this.dirtyStyle());
            }),
            (e.prototype.isStyleObject = function (t) {
              return t[h];
            }),
            (e.prototype._innerSaveToNormal = function (e) {
              t.prototype._innerSaveToNormal.call(this, e);
              var r = this._normalState;
              (e.style && !r.style && (r.style = this._mergeStyle(this.createStyle(), this.style)),
                this._savePrimaryToNormal(e, r, c));
            }),
            (e.prototype._applyStateObj = function (e, r, i, n, o, s) {
              t.prototype._applyStateObj.call(this, e, r, i, n, o, s);
              var h,
                l = !(r && n);
              if (
                (r && r.style
                  ? o
                    ? n
                      ? (h = r.style)
                      : ((h = this._mergeStyle(this.createStyle(), i.style)),
                        this._mergeStyle(h, r.style))
                    : ((h = this._mergeStyle(this.createStyle(), n ? this.style : i.style)),
                      this._mergeStyle(h, r.style))
                  : l && (h = i.style),
                h)
              )
                if (o) {
                  var u = this.style;
                  if (((this.style = this.createStyle(l ? {} : u)), l))
                    for (var p = (0, a.keys)(u), d = 0; d < p.length; d++)
                      (v = p[d]) in h && ((h[v] = h[v]), (this.style[v] = u[v]));
                  var y = (0, a.keys)(h);
                  for (d = 0; d < y.length; d++) {
                    var v = y[d];
                    this.style[v] = this.style[v];
                  }
                  this._transitionState(e, { style: h }, s, this.getAnimationStyleProps());
                } else this.useStyle(h);
              var g = this.__inHover ? f : c;
              for (d = 0; d < g.length; d++)
                ((v = g[d]),
                  r && null != r[v] ? (this[v] = r[v]) : l && null != i[v] && (this[v] = i[v]));
            }),
            (e.prototype._mergeStates = function (e) {
              for (var r, i = t.prototype._mergeStates.call(this, e), n = 0; n < e.length; n++) {
                var o = e[n];
                o.style && ((r = r || {}), this._mergeStyle(r, o.style));
              }
              return (r && (i.style = r), i);
            }),
            (e.prototype._mergeStyle = function (t, e) {
              return ((0, a.extend)(t, e), t);
            }),
            (e.prototype.getAnimationStyleProps = function () {
              return u;
            }),
            (e.initDefaultProps =
              (((r = e.prototype).type = 'displayable'),
              (r.invisible = !1),
              (r.z = 0),
              (r.z2 = 0),
              (r.zlevel = 0),
              (r.culling = !1),
              (r.cursor = 'pointer'),
              (r.rectHover = !1),
              (r.incremental = !1),
              (r._rect = null),
              (r.dirtyRectTolerance = 0),
              void (r.__dirty = s.M | s.pO))),
            e
          );
        })(n.A),
        d = new o.A(0, 0, 0, 0),
        y = new o.A(0, 0, 0, 0);
      const v = p;
    },
    211793: (t, e, r) => {
      r.d(e, { A: () => i });
      const i = (function () {
        function t(t) {
          this.colorStops = t || [];
        }
        return (
          (t.prototype.addColorStop = function (t, e) {
            this.colorStops.push({ offset: t, color: e });
          }),
          t
        );
      })();
    },
    843870: (t, e, r) => {
      r.d(e, { A: () => h });
      var i = r(15215),
        n = r(498026),
        o = r(962454),
        a = r(529308),
        s = (function (t) {
          function e(e) {
            var r = t.call(this) || this;
            return ((r.isGroup = !0), (r._children = []), r.attr(e), r);
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.childrenRef = function () {
              return this._children;
            }),
            (e.prototype.children = function () {
              return this._children.slice();
            }),
            (e.prototype.childAt = function (t) {
              return this._children[t];
            }),
            (e.prototype.childOfName = function (t) {
              for (var e = this._children, r = 0; r < e.length; r++)
                if (e[r].name === t) return e[r];
            }),
            (e.prototype.childCount = function () {
              return this._children.length;
            }),
            (e.prototype.add = function (t) {
              return (
                t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)),
                this
              );
            }),
            (e.prototype.addBefore = function (t, e) {
              if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var r = this._children,
                  i = r.indexOf(e);
                i >= 0 && (r.splice(i, 0, t), this._doAdd(t));
              }
              return this;
            }),
            (e.prototype.replace = function (t, e) {
              var r = n.indexOf(this._children, t);
              return (r >= 0 && this.replaceAt(e, r), this);
            }),
            (e.prototype.replaceAt = function (t, e) {
              var r = this._children,
                i = r[e];
              if (t && t !== this && t.parent !== this && t !== i) {
                ((r[e] = t), (i.parent = null));
                var n = this.__zr;
                (n && i.removeSelfFromZr(n), this._doAdd(t));
              }
              return this;
            }),
            (e.prototype._doAdd = function (t) {
              (t.parent && t.parent.remove(t), (t.parent = this));
              var e = this.__zr;
              (e && e !== t.__zr && t.addSelfToZr(e), e && e.refresh());
            }),
            (e.prototype.remove = function (t) {
              var e = this.__zr,
                r = this._children,
                i = n.indexOf(r, t);
              return (
                i < 0 ||
                  (r.splice(i, 1), (t.parent = null), e && t.removeSelfFromZr(e), e && e.refresh()),
                this
              );
            }),
            (e.prototype.removeAll = function () {
              for (var t = this._children, e = this.__zr, r = 0; r < t.length; r++) {
                var i = t[r];
                (e && i.removeSelfFromZr(e), (i.parent = null));
              }
              return ((t.length = 0), this);
            }),
            (e.prototype.eachChild = function (t, e) {
              for (var r = this._children, i = 0; i < r.length; i++) {
                var n = r[i];
                t.call(e, n, i);
              }
              return this;
            }),
            (e.prototype.traverse = function (t, e) {
              for (var r = 0; r < this._children.length; r++) {
                var i = this._children[r],
                  n = t.call(e, i);
                i.isGroup && !n && i.traverse(t, e);
              }
              return this;
            }),
            (e.prototype.addSelfToZr = function (e) {
              t.prototype.addSelfToZr.call(this, e);
              for (var r = 0; r < this._children.length; r++) this._children[r].addSelfToZr(e);
            }),
            (e.prototype.removeSelfFromZr = function (e) {
              t.prototype.removeSelfFromZr.call(this, e);
              for (var r = 0; r < this._children.length; r++) this._children[r].removeSelfFromZr(e);
            }),
            (e.prototype.getBoundingRect = function (t) {
              for (
                var e = new a.A(0, 0, 0, 0), r = t || this._children, i = [], n = null, o = 0;
                o < r.length;
                o++
              ) {
                var s = r[o];
                if (!s.ignore && !s.invisible) {
                  var h = s.getBoundingRect(),
                    l = s.getLocalTransform(i);
                  l
                    ? (a.A.applyTransform(e, h, l), (n = n || e.clone()).union(e))
                    : (n = n || h.clone()).union(h);
                }
              }
              return n || e;
            }),
            e
          );
        })(o.A);
      s.prototype.type = 'group';
      const h = s;
    },
    390540: (t, e, r) => {
      r.d(e, { Ay: () => u });
      var i = r(15215),
        n = r(171519),
        o = r(529308),
        a = r(498026),
        s = (0, a.defaults)({ x: 0, y: 0 }, n.oN),
        h = {
          style: (0, a.defaults)(
            { x: !0, y: !0, width: !0, height: !0, sx: !0, sy: !0, sWidth: !0, sHeight: !0 },
            n.sW.style,
          ),
        },
        l = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.createStyle = function (t) {
              return (0, a.createObject)(s, t);
            }),
            (e.prototype._getSize = function (t) {
              var e = this.style,
                r = e[t];
              if (null != r) return r;
              var i,
                n =
                  (i = e.image) && 'string' != typeof i && i.width && i.height
                    ? e.image
                    : this.__image;
              if (!n) return 0;
              var o = 'width' === t ? 'height' : 'width',
                a = e[o];
              return null == a ? n[t] : (n[t] / n[o]) * a;
            }),
            (e.prototype.getWidth = function () {
              return this._getSize('width');
            }),
            (e.prototype.getHeight = function () {
              return this._getSize('height');
            }),
            (e.prototype.getAnimationStyleProps = function () {
              return h;
            }),
            (e.prototype.getBoundingRect = function () {
              var t = this.style;
              return (
                this._rect ||
                  (this._rect = new o.A(t.x || 0, t.y || 0, this.getWidth(), this.getHeight())),
                this._rect
              );
            }),
            e
          );
        })(n.Ay);
      l.prototype.type = 'image';
      const u = l;
    },
    602995: (t, e, r) => {
      r.d(e, { A: () => s });
      var i = r(15215),
        n = r(171519),
        o = r(529308),
        a = [];
      const s = (function (t) {
        function e() {
          var e = (null !== t && t.apply(this, arguments)) || this;
          return (
            (e.notClear = !0),
            (e.incremental = !0),
            (e._displayables = []),
            (e._temporaryDisplayables = []),
            (e._cursor = 0),
            e
          );
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.traverse = function (t, e) {
            t.call(e, this);
          }),
          (e.prototype.useStyle = function () {
            this.style = {};
          }),
          (e.prototype.getCursor = function () {
            return this._cursor;
          }),
          (e.prototype.innerAfterBrush = function () {
            this._cursor = this._displayables.length;
          }),
          (e.prototype.clearDisplaybles = function () {
            ((this._displayables = []),
              (this._temporaryDisplayables = []),
              (this._cursor = 0),
              this.markRedraw(),
              (this.notClear = !1));
          }),
          (e.prototype.clearTemporalDisplayables = function () {
            this._temporaryDisplayables = [];
          }),
          (e.prototype.addDisplayable = function (t, e) {
            (e ? this._temporaryDisplayables.push(t) : this._displayables.push(t),
              this.markRedraw());
          }),
          (e.prototype.addDisplayables = function (t, e) {
            e = e || !1;
            for (var r = 0; r < t.length; r++) this.addDisplayable(t[r], e);
          }),
          (e.prototype.getDisplayables = function () {
            return this._displayables;
          }),
          (e.prototype.getTemporalDisplayables = function () {
            return this._temporaryDisplayables;
          }),
          (e.prototype.eachPendingDisplayable = function (t) {
            for (var e = this._cursor; e < this._displayables.length; e++)
              t && t(this._displayables[e]);
            for (e = 0; e < this._temporaryDisplayables.length; e++)
              t && t(this._temporaryDisplayables[e]);
          }),
          (e.prototype.update = function () {
            this.updateTransform();
            for (var t = this._cursor; t < this._displayables.length; t++)
              (((e = this._displayables[t]).parent = this), e.update(), (e.parent = null));
            for (t = 0; t < this._temporaryDisplayables.length; t++) {
              var e;
              (((e = this._temporaryDisplayables[t]).parent = this), e.update(), (e.parent = null));
            }
          }),
          (e.prototype.getBoundingRect = function () {
            if (!this._rect) {
              for (
                var t = new o.A(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0;
                e < this._displayables.length;
                e++
              ) {
                var r = this._displayables[e],
                  i = r.getBoundingRect().clone();
                (r.needLocalTransform() && i.applyTransform(r.getLocalTransform(a)), t.union(i));
              }
              this._rect = t;
            }
            return this._rect;
          }),
          (e.prototype.contain = function (t, e) {
            var r = this.transformCoordToLocal(t, e);
            if (this.getBoundingRect().contain(r[0], r[1]))
              for (var i = 0; i < this._displayables.length; i++)
                if (this._displayables[i].contain(t, e)) return !0;
            return !1;
          }),
          e
        );
      })(n.Ay);
    },
    229668: (t, e, r) => {
      r.d(e, { A: () => n });
      var i = r(15215);
      const n = (function (t) {
        function e(e, r, i, n, o, a) {
          var s = t.call(this, o) || this;
          return (
            (s.x = e ?? 0),
            (s.y = r ?? 0),
            (s.x2 = i ?? 1),
            (s.y2 = n ?? 0),
            (s.type = 'linear'),
            (s.global = a || !1),
            s
          );
        }
        return ((0, i.__extends)(e, t), e);
      })(r(211793).A);
    },
    467065: (t, e, r) => {
      r.d(e, { MW: () => P, Ay: () => L });
      var i = r(15215),
        n = r(171519),
        o = r(368717),
        a = r(957043),
        s = r(989259);
      function h(t, e, r, i, n, o, a, h, l, u, c) {
        if (0 === l) return !1;
        var f = l;
        return (
          !(
            (c > e + f && c > i + f && c > o + f && c > h + f) ||
            (c < e - f && c < i - f && c < o - f && c < h - f) ||
            (u > t + f && u > r + f && u > n + f && u > a + f) ||
            (u < t - f && u < r - f && u < n - f && u < a - f)
          ) && s.Et(t, e, r, i, n, o, a, h, u, c, null) <= f / 2
        );
      }
      var l = r(714423),
        u = r(941589),
        c = 2 * Math.PI;
      function f(t, e, r, i, n, o, a, s, h) {
        if (0 === a) return !1;
        var l = a;
        ((s -= t), (h -= e));
        var f = Math.sqrt(s * s + h * h);
        if (f - l > r || f + l < r) return !1;
        if (Math.abs(i - n) % c < 1e-4) return !0;
        if (o) {
          var p = i;
          ((i = (0, u.n)(n)), (n = (0, u.n)(p)));
        } else ((i = (0, u.n)(i)), (n = (0, u.n)(n)));
        i > n && (n += c);
        var d = Math.atan2(h, s);
        return (d < 0 && (d += c), (d >= i && d <= n) || (d + c >= i && d + c <= n));
      }
      var p = r(776873),
        d = o.A.CMD,
        y = 2 * Math.PI,
        v = [-1, -1, -1],
        g = [-1, -1];
      function _() {
        var t = g[0];
        ((g[0] = g[1]), (g[1] = t));
      }
      function m(t, e, r, i, n, o, a, h, l, u) {
        if ((u > e && u > i && u > o && u > h) || (u < e && u < i && u < o && u < h)) return 0;
        var c = s._E(e, i, o, h, u, v);
        if (0 === c) return 0;
        for (var f = 0, p = -1, d = void 0, y = void 0, m = 0; m < c; m++) {
          var x = v[m],
            w = 0 === x || 1 === x ? 0.5 : 1;
          s.Yb(t, r, n, a, x) < l ||
            (p < 0 &&
              ((p = s.lX(e, i, o, h, g)),
              g[1] < g[0] && p > 1 && _(),
              (d = s.Yb(e, i, o, h, g[0])),
              p > 1 && (y = s.Yb(e, i, o, h, g[1]))),
            2 === p
              ? x < g[0]
                ? (f += d < e ? w : -w)
                : x < g[1]
                  ? (f += y < d ? w : -w)
                  : (f += h < y ? w : -w)
              : x < g[0]
                ? (f += d < e ? w : -w)
                : (f += h < d ? w : -w));
        }
        return f;
      }
      function x(t, e, r, i, n, o, a, h) {
        if ((h > e && h > i && h > o) || (h < e && h < i && h < o)) return 0;
        var l = s.qY(e, i, o, h, v);
        if (0 === l) return 0;
        var u = s.gC(e, i, o);
        if (u >= 0 && u <= 1) {
          for (var c = 0, f = s.k3(e, i, o, u), p = 0; p < l; p++) {
            var d = 0 === v[p] || 1 === v[p] ? 0.5 : 1;
            s.k3(t, r, n, v[p]) < a || (v[p] < u ? (c += f < e ? d : -d) : (c += o < f ? d : -d));
          }
          return c;
        }
        return (
          (d = 0 === v[0] || 1 === v[0] ? 0.5 : 1),
          s.k3(t, r, n, v[0]) < a ? 0 : o < e ? d : -d
        );
      }
      function w(t, e, r, i, n, o, a, s) {
        if ((s -= e) > r || s < -r) return 0;
        var h = Math.sqrt(r * r - s * s);
        ((v[0] = -h), (v[1] = h));
        var l = Math.abs(i - n);
        if (l < 1e-4) return 0;
        if (l >= y - 1e-4) {
          ((i = 0), (n = y));
          var u = o ? 1 : -1;
          return a >= v[0] + t && a <= v[1] + t ? u : 0;
        }
        if (i > n) {
          var c = i;
          ((i = n), (n = c));
        }
        i < 0 && ((i += y), (n += y));
        for (var f = 0, p = 0; p < 2; p++) {
          var d = v[p];
          if (d + t > a) {
            var g = Math.atan2(s, d);
            ((u = o ? 1 : -1),
              g < 0 && (g = y + g),
              ((g >= i && g <= n) || (g + y >= i && g + y <= n)) &&
                (g > Math.PI / 2 && g < 1.5 * Math.PI && (u = -u), (f += u)));
          }
        }
        return f;
      }
      function b(t, e, r, i, n) {
        for (
          var o, s, u, c, y = t.data, v = t.len(), g = 0, _ = 0, b = 0, k = 0, S = 0, T = 0;
          T < v;
        ) {
          var A = y[T++],
            C = 1 === T;
          switch (
            (A === d.M && T > 1 && (r || (g += (0, p.A)(_, b, k, S, i, n))),
            C && ((k = _ = y[T]), (S = b = y[T + 1])),
            A)
          ) {
            case d.M:
              ((_ = k = y[T++]), (b = S = y[T++]));
              break;
            case d.L:
              if (r) {
                if (a.l(_, b, y[T], y[T + 1], e, i, n)) return !0;
              } else g += (0, p.A)(_, b, y[T], y[T + 1], i, n) || 0;
              ((_ = y[T++]), (b = y[T++]));
              break;
            case d.C:
              if (r) {
                if (h(_, b, y[T++], y[T++], y[T++], y[T++], y[T], y[T + 1], e, i, n)) return !0;
              } else g += m(_, b, y[T++], y[T++], y[T++], y[T++], y[T], y[T + 1], i, n) || 0;
              ((_ = y[T++]), (b = y[T++]));
              break;
            case d.Q:
              if (r) {
                if (l.l(_, b, y[T++], y[T++], y[T], y[T + 1], e, i, n)) return !0;
              } else g += x(_, b, y[T++], y[T++], y[T], y[T + 1], i, n) || 0;
              ((_ = y[T++]), (b = y[T++]));
              break;
            case d.A:
              var P = y[T++],
                M = y[T++],
                O = y[T++],
                L = y[T++],
                D = y[T++],
                R = y[T++];
              T += 1;
              var z = !!(1 - y[T++]);
              ((o = Math.cos(D) * O + P),
                (s = Math.sin(D) * L + M),
                C ? ((k = o), (S = s)) : (g += (0, p.A)(_, b, o, s, i, n)));
              var I = ((i - P) * L) / O + P;
              if (r) {
                if (f(P, M, L, D, D + R, z, e, I, n)) return !0;
              } else g += w(P, M, L, D, D + R, z, I, n);
              ((_ = Math.cos(D + R) * O + P), (b = Math.sin(D + R) * L + M));
              break;
            case d.R:
              if (((k = _ = y[T++]), (S = b = y[T++]), (o = k + y[T++]), (s = S + y[T++]), r)) {
                if (
                  a.l(k, S, o, S, e, i, n) ||
                  a.l(o, S, o, s, e, i, n) ||
                  a.l(o, s, k, s, e, i, n) ||
                  a.l(k, s, k, S, e, i, n)
                )
                  return !0;
              } else ((g += (0, p.A)(o, S, o, s, i, n)), (g += (0, p.A)(k, s, k, S, i, n)));
              break;
            case d.Z:
              if (r) {
                if (a.l(_, b, k, S, e, i, n)) return !0;
              } else g += (0, p.A)(_, b, k, S, i, n);
              ((_ = k), (b = S));
          }
        }
        return (
          r || ((u = b), (c = S), Math.abs(u - c) < 1e-4) || (g += (0, p.A)(_, b, k, S, i, n) || 0),
          0 !== g
        );
      }
      var k = r(498026),
        S = r(747698),
        T = r(73098),
        A = r(756448),
        C = r(692836),
        P = (0, k.defaults)(
          {
            fill: '#000',
            stroke: null,
            strokePercent: 1,
            fillOpacity: 1,
            strokeOpacity: 1,
            lineDashOffset: 0,
            lineWidth: 1,
            lineCap: 'butt',
            miterLimit: 10,
            strokeNoScale: !1,
            strokeFirst: !1,
          },
          n.oN,
        ),
        M = {
          style: (0, k.defaults)(
            {
              fill: !0,
              stroke: !0,
              strokePercent: !0,
              fillOpacity: !0,
              strokeOpacity: !0,
              lineDashOffset: !0,
              lineWidth: !0,
              miterLimit: !0,
            },
            n.sW.style,
          ),
        },
        O = C.Wx.concat(['invisible', 'culling', 'z', 'z2', 'zlevel', 'parent']);
      const L = (function (t) {
        function e(e) {
          return t.call(this, e) || this;
        }
        var r;
        return (
          (0, i.__extends)(e, t),
          (e.prototype.update = function () {
            var r = this;
            t.prototype.update.call(this);
            var i = this.style;
            if (i.decal) {
              var n = (this._decalEl = this._decalEl || new e());
              (n.buildPath === e.prototype.buildPath &&
                (n.buildPath = function (t) {
                  r.buildPath(t, r.shape);
                }),
                (n.silent = !0));
              var o = n.style;
              for (var a in i) o[a] !== i[a] && (o[a] = i[a]);
              ((o.fill = i.fill ? i.decal : null),
                (o.decal = null),
                (o.shadowColor = null),
                i.strokeFirst && (o.stroke = null));
              for (var s = 0; s < O.length; ++s) n[O[s]] = this[O[s]];
              n.__dirty |= A.M;
            } else this._decalEl && (this._decalEl = null);
          }),
          (e.prototype.getDecalElement = function () {
            return this._decalEl;
          }),
          (e.prototype._init = function (e) {
            var r = (0, k.keys)(e);
            this.shape = this.getDefaultShape();
            var i = this.getDefaultStyle();
            i && this.useStyle(i);
            for (var n = 0; n < r.length; n++) {
              var o = r[n],
                a = e[o];
              'style' === o
                ? this.style
                  ? (0, k.extend)(this.style, a)
                  : this.useStyle(a)
                : 'shape' === o
                  ? (0, k.extend)(this.shape, a)
                  : t.prototype.attrKV.call(this, o, a);
            }
            this.style || this.useStyle({});
          }),
          (e.prototype.getDefaultStyle = function () {
            return null;
          }),
          (e.prototype.getDefaultShape = function () {
            return {};
          }),
          (e.prototype.canBeInsideText = function () {
            return this.hasFill();
          }),
          (e.prototype.getInsideTextFill = function () {
            var t = this.style.fill;
            if ('none' !== t) {
              if ((0, k.isString)(t)) {
                var e = (0, S.lum)(t, 0);
                return e > 0.5 ? T._S : e > 0.2 ? T.tY : T.el;
              }
              if (t) return T.el;
            }
            return T._S;
          }),
          (e.prototype.getInsideTextStroke = function (t) {
            var e = this.style.fill;
            if ((0, k.isString)(e)) {
              var r = this.__zr;
              if (!(!r || !r.isDarkMode()) == (0, S.lum)(t, 0) < T.ps) return e;
            }
          }),
          (e.prototype.buildPath = function (t, e, r) {}),
          (e.prototype.pathUpdated = function () {
            this.__dirty &= ~A.Dl;
          }),
          (e.prototype.getUpdatedPathProxy = function (t) {
            return (
              !this.path && this.createPathProxy(),
              this.path.beginPath(),
              this.buildPath(this.path, this.shape, t),
              this.path
            );
          }),
          (e.prototype.createPathProxy = function () {
            this.path = new o.A(!1);
          }),
          (e.prototype.hasStroke = function () {
            var t = this.style,
              e = t.stroke;
            return !(null == e || 'none' === e || !(t.lineWidth > 0));
          }),
          (e.prototype.hasFill = function () {
            var t = this.style.fill;
            return null != t && 'none' !== t;
          }),
          (e.prototype.getBoundingRect = function () {
            var t = this._rect,
              e = this.style,
              r = !t;
            if (r) {
              var i = !1;
              this.path || ((i = !0), this.createPathProxy());
              var n = this.path;
              ((i || this.__dirty & A.Dl) &&
                (n.beginPath(), this.buildPath(n, this.shape, !1), this.pathUpdated()),
                (t = n.getBoundingRect()));
            }
            if (((this._rect = t), this.hasStroke() && this.path && this.path.len() > 0)) {
              var o = this._rectStroke || (this._rectStroke = t.clone());
              if (this.__dirty || r) {
                o.copy(t);
                var a = e.strokeNoScale ? this.getLineScale() : 1,
                  s = e.lineWidth;
                if (!this.hasFill()) {
                  var h = this.strokeContainThreshold;
                  s = Math.max(s, h ?? 4);
                }
                a > 1e-10 &&
                  ((o.width += s / a), (o.height += s / a), (o.x -= s / a / 2), (o.y -= s / a / 2));
              }
              return o;
            }
            return t;
          }),
          (e.prototype.contain = function (t, e) {
            var r = this.transformCoordToLocal(t, e),
              i = this.getBoundingRect(),
              n = this.style;
            if (((t = r[0]), (e = r[1]), i.contain(t, e))) {
              var o = this.path;
              if (this.hasStroke()) {
                var a = n.lineWidth,
                  s = n.strokeNoScale ? this.getLineScale() : 1;
                if (
                  s > 1e-10 &&
                  (this.hasFill() || (a = Math.max(a, this.strokeContainThreshold)),
                  (function (t, e, r, i) {
                    return b(t, e, !0, r, i);
                  })(o, a / s, t, e))
                )
                  return !0;
              }
              if (this.hasFill())
                return (function (t, e, r) {
                  return b(t, 0, !1, e, r);
                })(o, t, e);
            }
            return !1;
          }),
          (e.prototype.dirtyShape = function () {
            ((this.__dirty |= A.Dl),
              this._rect && (this._rect = null),
              this._decalEl && this._decalEl.dirtyShape(),
              this.markRedraw());
          }),
          (e.prototype.dirty = function () {
            (this.dirtyStyle(), this.dirtyShape());
          }),
          (e.prototype.animateShape = function (t) {
            return this.animate('shape', t);
          }),
          (e.prototype.updateDuringAnimation = function (t) {
            'style' === t
              ? this.dirtyStyle()
              : 'shape' === t
                ? this.dirtyShape()
                : this.markRedraw();
          }),
          (e.prototype.attrKV = function (e, r) {
            'shape' === e ? this.setShape(r) : t.prototype.attrKV.call(this, e, r);
          }),
          (e.prototype.setShape = function (t, e) {
            var r = this.shape;
            return (
              r || (r = this.shape = {}),
              'string' == typeof t ? (r[t] = e) : (0, k.extend)(r, t),
              this.dirtyShape(),
              this
            );
          }),
          (e.prototype.shapeChanged = function () {
            return !!(this.__dirty & A.Dl);
          }),
          (e.prototype.createStyle = function (t) {
            return (0, k.createObject)(P, t);
          }),
          (e.prototype._innerSaveToNormal = function (e) {
            t.prototype._innerSaveToNormal.call(this, e);
            var r = this._normalState;
            e.shape && !r.shape && (r.shape = (0, k.extend)({}, this.shape));
          }),
          (e.prototype._applyStateObj = function (e, r, i, n, o, a) {
            t.prototype._applyStateObj.call(this, e, r, i, n, o, a);
            var s,
              h = !(r && n);
            if (
              (r && r.shape
                ? o
                  ? n
                    ? (s = r.shape)
                    : ((s = (0, k.extend)({}, i.shape)), (0, k.extend)(s, r.shape))
                  : ((s = (0, k.extend)({}, n ? this.shape : i.shape)), (0, k.extend)(s, r.shape))
                : h && (s = i.shape),
              s)
            )
              if (o) {
                this.shape = (0, k.extend)({}, this.shape);
                for (var l = {}, u = (0, k.keys)(s), c = 0; c < u.length; c++) {
                  var f = u[c];
                  'object' == typeof s[f] ? (this.shape[f] = s[f]) : (l[f] = s[f]);
                }
                this._transitionState(e, { shape: l }, a);
              } else ((this.shape = s), this.dirtyShape());
          }),
          (e.prototype._mergeStates = function (e) {
            for (var r, i = t.prototype._mergeStates.call(this, e), n = 0; n < e.length; n++) {
              var o = e[n];
              o.shape && ((r = r || {}), this._mergeStyle(r, o.shape));
            }
            return (r && (i.shape = r), i);
          }),
          (e.prototype.getAnimationStyleProps = function () {
            return M;
          }),
          (e.prototype.isZeroArea = function () {
            return !1;
          }),
          (e.extend = function (t) {
            var r = (function (e) {
              function r(r) {
                var i = e.call(this, r) || this;
                return (t.init && t.init.call(i, r), i);
              }
              return (
                (0, i.__extends)(r, e),
                (r.prototype.getDefaultStyle = function () {
                  return (0, k.clone)(t.style);
                }),
                (r.prototype.getDefaultShape = function () {
                  return (0, k.clone)(t.shape);
                }),
                r
              );
            })(e);
            for (var n in t) 'function' == typeof t[n] && (r.prototype[n] = t[n]);
            return r;
          }),
          (e.initDefaultProps =
            (((r = e.prototype).type = 'path'),
            (r.strokeContainThreshold = 5),
            (r.segmentIgnoreThreshold = 0),
            (r.subPixelOptimize = !1),
            (r.autoBatch = !1),
            void (r.__dirty = A.M | A.pO | A.Dl))),
          e
        );
      })(n.Ay);
    },
    782250: (t, e, r) => {
      r.d(e, { A: () => n });
      var i = r(15215);
      const n = (function (t) {
        function e(e, r, i, n, o) {
          var a = t.call(this, n) || this;
          return (
            (a.x = e ?? 0.5),
            (a.y = r ?? 0.5),
            (a.r = i ?? 0.5),
            (a.type = 'radial'),
            (a.global = o || !1),
            a
          );
        }
        return ((0, i.__extends)(e, t), e);
      })(r(211793).A);
    },
    619845: (t, e, r) => {
      r.d(e, { A: () => c });
      var i = r(15215),
        n = r(171519),
        o = r(945558),
        a = r(467065),
        s = r(498026),
        h = r(259741),
        l = (0, s.defaults)(
          {
            strokeFirst: !0,
            font: h.OH,
            x: 0,
            y: 0,
            textAlign: 'left',
            textBaseline: 'top',
            miterLimit: 2,
          },
          a.MW,
        ),
        u = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.hasStroke = function () {
              var t = this.style,
                e = t.stroke;
              return null != e && 'none' !== e && t.lineWidth > 0;
            }),
            (e.prototype.hasFill = function () {
              var t = this.style.fill;
              return null != t && 'none' !== t;
            }),
            (e.prototype.createStyle = function (t) {
              return (0, s.createObject)(l, t);
            }),
            (e.prototype.setBoundingRect = function (t) {
              this._rect = t;
            }),
            (e.prototype.getBoundingRect = function () {
              var t = this.style;
              if (!this._rect) {
                var e = t.text;
                null != e ? (e += '') : (e = '');
                var r = (0, o.NO)(e, t.font, t.textAlign, t.textBaseline);
                if (((r.x += t.x || 0), (r.y += t.y || 0), this.hasStroke())) {
                  var i = t.lineWidth;
                  ((r.x -= i / 2), (r.y -= i / 2), (r.width += i), (r.height += i));
                }
                this._rect = r;
              }
              return this._rect;
            }),
            (e.initDefaultProps = void (e.prototype.dirtyRectTolerance = 10)),
            e
          );
        })(n.Ay);
      u.prototype.type = 'tspan';
      const c = u;
    },
    132322: (t, e, r) => {
      r.d(e, { Ay: () => P, I5: () => m, XE: () => w });
      var i = r(15215),
        n = r(362406),
        o = r(619845),
        a = r(498026),
        s = r(945558),
        h = r(390540),
        l = r(830010),
        u = r(529308),
        c = r(171519),
        f = r(259741),
        p = { fill: '#000' },
        d = {
          style: (0, a.defaults)(
            {
              fill: !0,
              stroke: !0,
              fillOpacity: !0,
              strokeOpacity: !0,
              lineWidth: !0,
              fontSize: !0,
              lineHeight: !0,
              width: !0,
              height: !0,
              textShadowColor: !0,
              textShadowBlur: !0,
              textShadowOffsetX: !0,
              textShadowOffsetY: !0,
              backgroundColor: !0,
              padding: !0,
              borderColor: !0,
              borderWidth: !0,
              borderRadius: !0,
            },
            c.sW.style,
          ),
        },
        y = (function (t) {
          function e(e) {
            var r = t.call(this) || this;
            return ((r.type = 'text'), (r._children = []), (r._defaultStyle = p), r.attr(e), r);
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.childrenRef = function () {
              return this._children;
            }),
            (e.prototype.update = function () {
              (t.prototype.update.call(this), this.styleChanged() && this._updateSubTexts());
              for (var e = 0; e < this._children.length; e++) {
                var r = this._children[e];
                ((r.zlevel = this.zlevel),
                  (r.z = this.z),
                  (r.z2 = this.z2),
                  (r.culling = this.culling),
                  (r.cursor = this.cursor),
                  (r.invisible = this.invisible));
              }
            }),
            (e.prototype.updateTransform = function () {
              var e = this.innerTransformable;
              e
                ? (e.updateTransform(), e.transform && (this.transform = e.transform))
                : t.prototype.updateTransform.call(this);
            }),
            (e.prototype.getLocalTransform = function (e) {
              var r = this.innerTransformable;
              return r ? r.getLocalTransform(e) : t.prototype.getLocalTransform.call(this, e);
            }),
            (e.prototype.getComputedTransform = function () {
              return (
                this.__hostTarget &&
                  (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)),
                t.prototype.getComputedTransform.call(this)
              );
            }),
            (e.prototype._updateSubTexts = function () {
              var t;
              ((this._childCursor = 0),
                b((t = this.style)),
                (0, a.each)(t.rich, b),
                this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(),
                (this._children.length = this._childCursor),
                this.styleUpdated());
            }),
            (e.prototype.addSelfToZr = function (e) {
              t.prototype.addSelfToZr.call(this, e);
              for (var r = 0; r < this._children.length; r++) this._children[r].__zr = e;
            }),
            (e.prototype.removeSelfFromZr = function (e) {
              t.prototype.removeSelfFromZr.call(this, e);
              for (var r = 0; r < this._children.length; r++) this._children[r].__zr = null;
            }),
            (e.prototype.getBoundingRect = function () {
              if ((this.styleChanged() && this._updateSubTexts(), !this._rect)) {
                for (
                  var t = new u.A(0, 0, 0, 0), e = this._children, r = [], i = null, n = 0;
                  n < e.length;
                  n++
                ) {
                  var o = e[n],
                    a = o.getBoundingRect(),
                    s = o.getLocalTransform(r);
                  s
                    ? (t.copy(a), t.applyTransform(s), (i = i || t.clone()).union(t))
                    : (i = i || a.clone()).union(a);
                }
                this._rect = i || t;
              }
              return this._rect;
            }),
            (e.prototype.setDefaultTextStyle = function (t) {
              this._defaultStyle = t || p;
            }),
            (e.prototype.setTextContent = function (t) {}),
            (e.prototype._mergeStyle = function (t, e) {
              if (!e) return t;
              var r = e.rich,
                i = t.rich || (r && {});
              return (
                (0, a.extend)(t, e),
                r && i ? (this._mergeRich(i, r), (t.rich = i)) : i && (t.rich = i),
                t
              );
            }),
            (e.prototype._mergeRich = function (t, e) {
              for (var r = (0, a.keys)(e), i = 0; i < r.length; i++) {
                var n = r[i];
                ((t[n] = t[n] || {}), (0, a.extend)(t[n], e[n]));
              }
            }),
            (e.prototype.getAnimationStyleProps = function () {
              return d;
            }),
            (e.prototype._getOrCreateChild = function (t) {
              var e = this._children[this._childCursor];
              return (
                (e && e instanceof t) || (e = new t()),
                (this._children[this._childCursor++] = e),
                (e.__zr = this.__zr),
                (e.parent = this),
                e
              );
            }),
            (e.prototype._updatePlainTexts = function () {
              var t = this.style,
                e = t.font || f.OH,
                r = t.padding,
                i = A(t),
                a = (0, n.j_)(i, t),
                h = C(t),
                l = !!t.backgroundColor,
                c = a.outerHeight,
                p = a.outerWidth,
                d = a.contentWidth,
                y = a.lines,
                v = a.lineHeight,
                g = this._defaultStyle;
              this.isTruncated = !!a.isTruncated;
              var _ = t.x || 0,
                m = t.y || 0,
                w = t.align || g.align || 'left',
                b = t.verticalAlign || g.verticalAlign || 'top',
                P = _,
                M = (0, s.sZ)(m, a.contentHeight, b);
              if (h || r) {
                var O = (0, s.ll)(_, p, w),
                  L = (0, s.sZ)(m, c, b);
                h && this._renderBackground(t, t, O, L, p, c);
              }
              ((M += v / 2),
                r && ((P = T(_, w, r)), 'top' === b ? (M += r[0]) : 'bottom' === b && (M -= r[2])));
              for (
                var D = 0,
                  R = !1,
                  z = S(('fill' in t) ? t.fill : ((R = !0), g.fill)),
                  I = k(
                    ('stroke' in t)
                      ? t.stroke
                      : l || (g.autoStroke && !R)
                        ? null
                        : ((D = 2), g.stroke),
                  ),
                  B = t.textShadowBlur > 0,
                  F =
                    null != t.width &&
                    ('truncate' === t.overflow ||
                      'break' === t.overflow ||
                      'breakAll' === t.overflow),
                  N = a.calculatedLineHeight,
                  E = 0;
                E < y.length;
                E++
              ) {
                var W = this._getOrCreateChild(o.A),
                  H = W.createStyle();
                (W.useStyle(H),
                  (H.text = y[E]),
                  (H.x = P),
                  (H.y = M),
                  w && (H.textAlign = w),
                  (H.textBaseline = 'middle'),
                  (H.opacity = t.opacity),
                  (H.strokeFirst = !0),
                  B &&
                    ((H.shadowBlur = t.textShadowBlur || 0),
                    (H.shadowColor = t.textShadowColor || 'transparent'),
                    (H.shadowOffsetX = t.textShadowOffsetX || 0),
                    (H.shadowOffsetY = t.textShadowOffsetY || 0)),
                  (H.stroke = I),
                  (H.fill = z),
                  I &&
                    ((H.lineWidth = t.lineWidth || D),
                    (H.lineDash = t.lineDash),
                    (H.lineDashOffset = t.lineDashOffset || 0)),
                  (H.font = e),
                  x(H, t),
                  (M += v),
                  F &&
                    W.setBoundingRect(
                      new u.A(
                        (0, s.ll)(H.x, d, H.textAlign),
                        (0, s.sZ)(H.y, N, H.textBaseline),
                        d,
                        N,
                      ),
                    ));
              }
            }),
            (e.prototype._updateRichTexts = function () {
              var t = this.style,
                e = A(t),
                r = (0, n.FQ)(e, t),
                i = r.width,
                o = r.outerWidth,
                a = r.outerHeight,
                h = t.padding,
                l = t.x || 0,
                u = t.y || 0,
                c = this._defaultStyle,
                f = t.align || c.align,
                p = t.verticalAlign || c.verticalAlign;
              this.isTruncated = !!r.isTruncated;
              var d = (0, s.ll)(l, o, f),
                y = (0, s.sZ)(u, a, p),
                v = d,
                g = y;
              h && ((v += h[3]), (g += h[0]));
              var _ = v + i;
              C(t) && this._renderBackground(t, t, d, y, o, a);
              for (var m = !!t.backgroundColor, x = 0; x < r.lines.length; x++) {
                for (
                  var w = r.lines[x],
                    b = w.tokens,
                    k = b.length,
                    S = w.lineHeight,
                    T = w.width,
                    P = 0,
                    M = v,
                    O = _,
                    L = k - 1,
                    D = void 0;
                  P < k && (!(D = b[P]).align || 'left' === D.align);
                )
                  (this._placeToken(D, t, S, g, M, 'left', m), (T -= D.width), (M += D.width), P++);
                for (; L >= 0 && 'right' === (D = b[L]).align;)
                  (this._placeToken(D, t, S, g, O, 'right', m),
                    (T -= D.width),
                    (O -= D.width),
                    L--);
                for (M += (i - (M - v) - (_ - O) - T) / 2; P <= L;)
                  ((D = b[P]),
                    this._placeToken(D, t, S, g, M + D.width / 2, 'center', m),
                    (M += D.width),
                    P++);
                g += S;
              }
            }),
            (e.prototype._placeToken = function (t, e, r, i, n, h, l) {
              var c = e.rich[t.styleName] || {};
              c.text = t.text;
              var p = t.verticalAlign,
                d = i + r / 2;
              ('top' === p ? (d = i + t.height / 2) : 'bottom' === p && (d = i + r - t.height / 2),
                !t.isLineHolder &&
                  C(c) &&
                  this._renderBackground(
                    c,
                    e,
                    'right' === h ? n - t.width : 'center' === h ? n - t.width / 2 : n,
                    d - t.height / 2,
                    t.width,
                    t.height,
                  ));
              var y = !!c.backgroundColor,
                v = t.textPadding;
              v && ((n = T(n, h, v)), (d -= t.height / 2 - v[0] - t.innerHeight / 2));
              var g = this._getOrCreateChild(o.A),
                _ = g.createStyle();
              g.useStyle(_);
              var m = this._defaultStyle,
                w = !1,
                b = 0,
                A = S('fill' in c ? c.fill : 'fill' in e ? e.fill : ((w = !0), m.fill)),
                P = k(
                  'stroke' in c
                    ? c.stroke
                    : 'stroke' in e
                      ? e.stroke
                      : y || l || (m.autoStroke && !w)
                        ? null
                        : ((b = 2), m.stroke),
                ),
                M = c.textShadowBlur > 0 || e.textShadowBlur > 0;
              ((_.text = t.text),
                (_.x = n),
                (_.y = d),
                M &&
                  ((_.shadowBlur = c.textShadowBlur || e.textShadowBlur || 0),
                  (_.shadowColor = c.textShadowColor || e.textShadowColor || 'transparent'),
                  (_.shadowOffsetX = c.textShadowOffsetX || e.textShadowOffsetX || 0),
                  (_.shadowOffsetY = c.textShadowOffsetY || e.textShadowOffsetY || 0)),
                (_.textAlign = h),
                (_.textBaseline = 'middle'),
                (_.font = t.font || f.OH),
                (_.opacity = (0, a.retrieve3)(c.opacity, e.opacity, 1)),
                x(_, c),
                P &&
                  ((_.lineWidth = (0, a.retrieve3)(c.lineWidth, e.lineWidth, b)),
                  (_.lineDash = (0, a.retrieve2)(c.lineDash, e.lineDash)),
                  (_.lineDashOffset = e.lineDashOffset || 0),
                  (_.stroke = P)),
                A && (_.fill = A));
              var O = t.contentWidth,
                L = t.contentHeight;
              g.setBoundingRect(
                new u.A((0, s.ll)(_.x, O, _.textAlign), (0, s.sZ)(_.y, L, _.textBaseline), O, L),
              );
            }),
            (e.prototype._renderBackground = function (t, e, r, i, n, o) {
              var s,
                u,
                c,
                f = t.backgroundColor,
                p = t.borderWidth,
                d = t.borderColor,
                y = f && f.image,
                v = f && !y,
                g = t.borderRadius,
                _ = this;
              if (v || t.lineHeight || (p && d)) {
                ((s = this._getOrCreateChild(l.A)).useStyle(s.createStyle()),
                  (s.style.fill = null));
                var m = s.shape;
                ((m.x = r), (m.y = i), (m.width = n), (m.height = o), (m.r = g), s.dirtyShape());
              }
              if (v)
                (((c = s.style).fill = f || null),
                  (c.fillOpacity = (0, a.retrieve2)(t.fillOpacity, 1)));
              else if (y) {
                (u = this._getOrCreateChild(h.Ay)).onload = function () {
                  _.dirtyStyle();
                };
                var x = u.style;
                ((x.image = f.image), (x.x = r), (x.y = i), (x.width = n), (x.height = o));
              }
              p &&
                d &&
                (((c = s.style).lineWidth = p),
                (c.stroke = d),
                (c.strokeOpacity = (0, a.retrieve2)(t.strokeOpacity, 1)),
                (c.lineDash = t.borderDash),
                (c.lineDashOffset = t.borderDashOffset || 0),
                (s.strokeContainThreshold = 0),
                s.hasFill() && s.hasStroke() && ((c.strokeFirst = !0), (c.lineWidth *= 2)));
              var w = (s || u).style;
              ((w.shadowBlur = t.shadowBlur || 0),
                (w.shadowColor = t.shadowColor || 'transparent'),
                (w.shadowOffsetX = t.shadowOffsetX || 0),
                (w.shadowOffsetY = t.shadowOffsetY || 0),
                (w.opacity = (0, a.retrieve3)(t.opacity, e.opacity, 1)));
            }),
            (e.makeFont = function (t) {
              var e = '';
              return (
                w(t) &&
                  (e = [
                    t.fontStyle,
                    t.fontWeight,
                    m(t.fontSize),
                    t.fontFamily || 'sans-serif',
                  ].join(' ')),
                (e && (0, a.trim)(e)) || t.textFont || t.font
              );
            }),
            e
          );
        })(c.Ay),
        v = { left: !0, right: 1, center: 1 },
        g = { top: 1, bottom: 1, middle: 1 },
        _ = ['fontStyle', 'fontWeight', 'fontSize', 'fontFamily'];
      function m(t) {
        return 'string' != typeof t ||
          (-1 === t.indexOf('px') && -1 === t.indexOf('rem') && -1 === t.indexOf('em'))
          ? isNaN(+t)
            ? f.gI + 'px'
            : t + 'px'
          : t;
      }
      function x(t, e) {
        for (var r = 0; r < _.length; r++) {
          var i = _[r],
            n = e[i];
          null != n && (t[i] = n);
        }
      }
      function w(t) {
        return null != t.fontSize || t.fontFamily || t.fontWeight;
      }
      function b(t) {
        if (t) {
          t.font = y.makeFont(t);
          var e = t.align;
          ('middle' === e && (e = 'center'), (t.align = null == e || v[e] ? e : 'left'));
          var r = t.verticalAlign;
          ('center' === r && (r = 'middle'),
            (t.verticalAlign = null == r || g[r] ? r : 'top'),
            t.padding && (t.padding = (0, a.normalizeCssArray)(t.padding)));
        }
      }
      function k(t, e) {
        return null == t || e <= 0 || 'transparent' === t || 'none' === t
          ? null
          : t.image || t.colorStops
            ? '#000'
            : t;
      }
      function S(t) {
        return null == t || 'none' === t ? null : t.image || t.colorStops ? '#000' : t;
      }
      function T(t, e, r) {
        return 'right' === e ? t - r[1] : 'center' === e ? t + r[3] / 2 - r[1] / 2 : t + r[3];
      }
      function A(t) {
        var e = t.text;
        return (null != e && (e += ''), e);
      }
      function C(t) {
        return !!(t.backgroundColor || t.lineHeight || (t.borderWidth && t.borderColor));
      }
      const P = y;
    },
    756448: (t, e, r) => {
      r.d(e, { Dl: () => o, M: () => i, pO: () => n });
      var i = 1,
        n = 2,
        o = 4;
    },
    212191: (t, e, r) => {
      r.d(e, { OD: () => s, SR: () => a, xA: () => l });
      var i = r(160501),
        n = r(259741),
        o = new i.Ay(50);
      function a(t) {
        if ('string' == typeof t) {
          var e = o.get(t);
          return e && e.image;
        }
        return t;
      }
      function s(t, e, r, i, a) {
        if (t) {
          if ('string' == typeof t) {
            if ((e && e.__zrImageSrc === t) || !r) return e;
            var s = o.get(t),
              u = { hostEl: r, cb: i, cbPayload: a };
            return (
              s
                ? !l((e = s.image)) && s.pending.push(u)
                : (((e = n.yh.loadImage(t, h, h)).__zrImageSrc = t),
                  o.put(t, (e.__cachedImgObj = { image: e, pending: [u] }))),
              e
            );
          }
          return t;
        }
        return e;
      }
      function h() {
        var t = this.__cachedImgObj;
        this.onload = this.onerror = this.__cachedImgObj = null;
        for (var e = 0; e < t.pending.length; e++) {
          var r = t.pending[e],
            i = r.cb;
          (i && i(this, r.cbPayload), r.hostEl.dirty());
        }
        t.pending.length = 0;
      }
      function l(t) {
        return t && t.width && t.height;
      }
    },
    362406: (t, e, r) => {
      r.d(e, { EJ: () => s, FQ: () => v, j_: () => f });
      var i = r(212191),
        n = r(498026),
        o = r(945558),
        a = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
      function s(t, e, r, i, n) {
        var o = {};
        return (h(o, t, e, r, i, n), o.text);
      }
      function h(t, e, r, i, n, o) {
        if (!r) return ((t.text = ''), void (t.isTruncated = !1));
        var a = (e + '').split('\n');
        o = l(r, i, n, o);
        for (var s = !1, h = {}, c = 0, f = a.length; c < f; c++)
          (u(h, a[c], o), (a[c] = h.textLine), (s = s || h.isTruncated));
        ((t.text = a.join('\n')), (t.isTruncated = s));
      }
      function l(t, e, r, i) {
        i = i || {};
        var a = (0, n.extend)({}, i);
        ((a.font = e),
          (r = (0, n.retrieve2)(r, '...')),
          (a.maxIterations = (0, n.retrieve2)(i.maxIterations, 2)));
        var s = (a.minChar = (0, n.retrieve2)(i.minChar, 0));
        a.cnCharWidth = (0, o.RG)('国', e);
        var h = (a.ascCharWidth = (0, o.RG)('a', e));
        a.placeholder = (0, n.retrieve2)(i.placeholder, '');
        for (var l = (t = Math.max(0, t - 1)), u = 0; u < s && l >= h; u++) l -= h;
        var c = (0, o.RG)(r, e);
        return (
          c > l && ((r = ''), (c = 0)),
          (l = t - c),
          (a.ellipsis = r),
          (a.ellipsisWidth = c),
          (a.contentWidth = l),
          (a.containerWidth = t),
          a
        );
      }
      function u(t, e, r) {
        var i = r.containerWidth,
          n = r.font,
          a = r.contentWidth;
        if (!i) return ((t.textLine = ''), void (t.isTruncated = !1));
        var s = (0, o.RG)(e, n);
        if (s <= i) return ((t.textLine = e), void (t.isTruncated = !1));
        for (var h = 0; ; h++) {
          if (s <= a || h >= r.maxIterations) {
            e += r.ellipsis;
            break;
          }
          var l =
            0 === h
              ? c(e, a, r.ascCharWidth, r.cnCharWidth)
              : s > 0
                ? Math.floor((e.length * a) / s)
                : 0;
          ((e = e.substr(0, l)), (s = (0, o.RG)(e, n)));
        }
        ('' === e && (e = r.placeholder), (t.textLine = e), (t.isTruncated = !0));
      }
      function c(t, e, r, i) {
        for (var n = 0, o = 0, a = t.length; o < a && n < e; o++) {
          var s = t.charCodeAt(o);
          n += 0 <= s && s <= 127 ? r : i;
        }
        return o;
      }
      function f(t, e) {
        null != t && (t += '');
        var r,
          i = e.overflow,
          a = e.padding,
          s = e.font,
          h = 'truncate' === i,
          c = (0, o.ks)(s),
          f = (0, n.retrieve2)(e.lineHeight, c),
          p = !!e.backgroundColor,
          d = 'truncate' === e.lineOverflow,
          y = !1,
          v = e.width,
          g =
            (r =
              null == v || ('break' !== i && 'breakAll' !== i)
                ? t
                  ? t.split('\n')
                  : []
                : t
                  ? x(t, e.font, v, 'breakAll' === i, 0).lines
                  : []).length * f,
          _ = (0, n.retrieve2)(e.height, g);
        if (g > _ && d) {
          var m = Math.floor(_ / f);
          ((y = y || r.length > m), (r = r.slice(0, m)));
        }
        if (t && h && null != v)
          for (
            var w = l(v, s, e.ellipsis, { minChar: e.truncateMinChar, placeholder: e.placeholder }),
              b = {},
              k = 0;
            k < r.length;
            k++
          )
            (u(b, r[k], w), (r[k] = b.textLine), (y = y || b.isTruncated));
        var S = _,
          T = 0;
        for (k = 0; k < r.length; k++) T = Math.max((0, o.RG)(r[k], s), T);
        null == v && (v = T);
        var A = T;
        return (
          a && ((S += a[0] + a[2]), (A += a[1] + a[3]), (v += a[1] + a[3])),
          p && (A = v),
          {
            lines: r,
            height: _,
            outerWidth: A,
            outerHeight: S,
            lineHeight: f,
            calculatedLineHeight: c,
            contentWidth: T,
            contentHeight: g,
            width: v,
            isTruncated: y,
          }
        );
      }
      var p = function () {},
        d = function (t) {
          ((this.tokens = []), t && (this.tokens = t));
        },
        y = function () {
          ((this.width = 0),
            (this.height = 0),
            (this.contentWidth = 0),
            (this.contentHeight = 0),
            (this.outerWidth = 0),
            (this.outerHeight = 0),
            (this.lines = []),
            (this.isTruncated = !1));
        };
      function v(t, e) {
        var r = new y();
        if ((null != t && (t += ''), !t)) return r;
        for (
          var s,
            l = e.width,
            u = e.height,
            c = e.overflow,
            f =
              ('break' !== c && 'breakAll' !== c) || null == l
                ? null
                : { width: l, accumWidth: 0, breakAll: 'breakAll' === c },
            p = (a.lastIndex = 0);
          null != (s = a.exec(t));
        ) {
          var d = s.index;
          (d > p && g(r, t.substring(p, d), e, f), g(r, s[2], e, f, s[1]), (p = a.lastIndex));
        }
        p < t.length && g(r, t.substring(p, t.length), e, f);
        var v = [],
          _ = 0,
          m = 0,
          x = e.padding,
          w = 'truncate' === c,
          b = 'truncate' === e.lineOverflow,
          k = {};
        function S(t, e, r) {
          ((t.width = e), (t.lineHeight = r), (_ += r), (m = Math.max(m, e)));
        }
        t: for (var T = 0; T < r.lines.length; T++) {
          for (var A = r.lines[T], C = 0, P = 0, M = 0; M < A.tokens.length; M++) {
            var O = ((H = A.tokens[M]).styleName && e.rich[H.styleName]) || {},
              L = (H.textPadding = O.padding),
              D = L ? L[1] + L[3] : 0,
              R = (H.font = O.font || e.font);
            H.contentHeight = (0, o.ks)(R);
            var z = (0, n.retrieve2)(O.height, H.contentHeight);
            if (
              ((H.innerHeight = z),
              L && (z += L[0] + L[2]),
              (H.height = z),
              (H.lineHeight = (0, n.retrieve3)(O.lineHeight, e.lineHeight, z)),
              (H.align = (O && O.align) || e.align),
              (H.verticalAlign = (O && O.verticalAlign) || 'middle'),
              b && null != u && _ + H.lineHeight > u)
            ) {
              var I = r.lines.length;
              (M > 0
                ? ((A.tokens = A.tokens.slice(0, M)),
                  S(A, P, C),
                  (r.lines = r.lines.slice(0, T + 1)))
                : (r.lines = r.lines.slice(0, T)),
                (r.isTruncated = r.isTruncated || r.lines.length < I));
              break t;
            }
            var B = O.width,
              F = null == B || 'auto' === B;
            if ('string' == typeof B && '%' === B.charAt(B.length - 1))
              ((H.percentWidth = B), v.push(H), (H.contentWidth = (0, o.RG)(H.text, R)));
            else {
              if (F) {
                var N = O.backgroundColor,
                  E = N && N.image;
                E &&
                  ((E = i.SR(E)),
                  i.xA(E) && (H.width = Math.max(H.width, (E.width * z) / E.height)));
              }
              var W = w && null != l ? l - P : null;
              null != W && W < H.width
                ? !F || W < D
                  ? ((H.text = ''), (H.width = H.contentWidth = 0))
                  : (h(k, H.text, W - D, R, e.ellipsis, { minChar: e.truncateMinChar }),
                    (H.text = k.text),
                    (r.isTruncated = r.isTruncated || k.isTruncated),
                    (H.width = H.contentWidth = (0, o.RG)(H.text, R)))
                : (H.contentWidth = (0, o.RG)(H.text, R));
            }
            ((H.width += D), (P += H.width), O && (C = Math.max(C, H.lineHeight)));
          }
          S(A, P, C);
        }
        for (
          r.outerWidth = r.width = (0, n.retrieve2)(l, m),
            r.outerHeight = r.height = (0, n.retrieve2)(u, _),
            r.contentHeight = _,
            r.contentWidth = m,
            x && ((r.outerWidth += x[1] + x[3]), (r.outerHeight += x[0] + x[2])),
            T = 0;
          T < v.length;
          T++
        ) {
          var H,
            Y = (H = v[T]).percentWidth;
          H.width = (parseInt(Y, 10) / 100) * r.width;
        }
        return r;
      }
      function g(t, e, r, i, n) {
        var a,
          s,
          h = '' === e,
          l = (n && r.rich[n]) || {},
          u = t.lines,
          c = l.font || r.font,
          f = !1;
        if (i) {
          var y = l.padding,
            v = y ? y[1] + y[3] : 0;
          if (null != l.width && 'auto' !== l.width) {
            var g = (0, o.lo)(l.width, i.width) + v;
            (u.length > 0 && g + i.accumWidth > i.width && ((a = e.split('\n')), (f = !0)),
              (i.accumWidth = g));
          } else {
            var _ = x(e, c, i.width, i.breakAll, i.accumWidth);
            ((i.accumWidth = _.accumWidth + v), (s = _.linesWidths), (a = _.lines));
          }
        } else a = e.split('\n');
        for (var m = 0; m < a.length; m++) {
          var w = a[m],
            b = new p();
          if (
            ((b.styleName = n),
            (b.text = w),
            (b.isLineHolder = !w && !h),
            'number' == typeof l.width
              ? (b.width = l.width)
              : (b.width = s ? s[m] : (0, o.RG)(w, c)),
            m || f)
          )
            u.push(new d([b]));
          else {
            var k = (u[u.length - 1] || (u[0] = new d())).tokens,
              S = k.length;
            1 === S && k[0].isLineHolder ? (k[0] = b) : (w || !S || h) && k.push(b);
          }
        }
      }
      var _ = (0, n.reduce)(
        ',&?/;] '.split(''),
        function (t, e) {
          return ((t[e] = !0), t);
        },
        {},
      );
      function m(t) {
        return (
          !(function (t) {
            var e = t.charCodeAt(0);
            return (
              (e >= 32 && e <= 591) ||
              (e >= 880 && e <= 4351) ||
              (e >= 4608 && e <= 5119) ||
              (e >= 7680 && e <= 8303)
            );
          })(t) || !!_[t]
        );
      }
      function x(t, e, r, i, n) {
        for (var a = [], s = [], h = '', l = '', u = 0, c = 0, f = 0; f < t.length; f++) {
          var p = t.charAt(f);
          if ('\n' !== p) {
            var d = (0, o.RG)(p, e),
              y = !i && !m(p);
            (a.length ? c + d > r : n + c + d > r)
              ? c
                ? (h || l) &&
                  (y
                    ? (h || ((h = l), (l = ''), (c = u = 0)),
                      a.push(h),
                      s.push(c - u),
                      (l += p),
                      (h = ''),
                      (c = u += d))
                    : (l && ((h += l), (l = ''), (u = 0)), a.push(h), s.push(c), (h = p), (c = d)))
                : y
                  ? (a.push(l), s.push(u), (l = p), (u = d))
                  : (a.push(p), s.push(d))
              : ((c += d),
                y ? ((l += p), (u += d)) : (l && ((h += l), (l = ''), (u = 0)), (h += p)));
          } else
            (l && ((h += l), (c += u)), a.push(h), s.push(c), (h = ''), (l = ''), (u = 0), (c = 0));
        }
        return (
          a.length || h || ((h = t), (l = ''), (u = 0)),
          l && (h += l),
          h && (a.push(h), s.push(c)),
          1 === a.length && (c += n),
          { accumWidth: c, lines: a, linesWidths: s }
        );
      }
    },
    59184: (t, e, r) => {
      r.d(e, { U: () => n });
      var i = r(983509);
      function n(t, e, r) {
        var n = e.smooth,
          o = e.points;
        if (o && o.length >= 2) {
          if (n) {
            var a = (function (t, e, r, n) {
              var o,
                a,
                s,
                h,
                l = [],
                u = [],
                c = [],
                f = [];
              if (n) {
                ((s = [1 / 0, 1 / 0]), (h = [-1 / 0, -1 / 0]));
                for (var p = 0, d = t.length; p < d; p++)
                  ((0, i.min)(s, s, t[p]), (0, i.max)(h, h, t[p]));
                ((0, i.min)(s, s, n[0]), (0, i.max)(h, h, n[1]));
              }
              for (p = 0, d = t.length; p < d; p++) {
                var y = t[p];
                if (r) ((o = t[p ? p - 1 : d - 1]), (a = t[(p + 1) % d]));
                else {
                  if (0 === p || p === d - 1) {
                    l.push((0, i.clone)(t[p]));
                    continue;
                  }
                  ((o = t[p - 1]), (a = t[p + 1]));
                }
                ((0, i.sub)(u, a, o), (0, i.scale)(u, u, e));
                var v = (0, i.distance)(y, o),
                  g = (0, i.distance)(y, a),
                  _ = v + g;
                (0 !== _ && ((v /= _), (g /= _)), (0, i.scale)(c, u, -v), (0, i.scale)(f, u, g));
                var m = (0, i.add)([], y, c),
                  x = (0, i.add)([], y, f);
                (n &&
                  ((0, i.max)(m, m, s),
                  (0, i.min)(m, m, h),
                  (0, i.max)(x, x, s),
                  (0, i.min)(x, x, h)),
                  l.push(m),
                  l.push(x));
              }
              return (r && l.push(l.shift()), l);
            })(o, n, r, e.smoothConstraint);
            t.moveTo(o[0][0], o[0][1]);
            for (var s = o.length, h = 0; h < (r ? s : s - 1); h++) {
              var l = a[2 * h],
                u = a[2 * h + 1],
                c = o[(h + 1) % s];
              t.bezierCurveTo(l[0], l[1], u[0], u[1], c[0], c[1]);
            }
          } else {
            (t.moveTo(o[0][0], o[0][1]), (h = 1));
            for (var f = o.length; h < f; h++) t.lineTo(o[h][0], o[h][1]);
          }
          r && t.closePath();
        }
      }
    },
    14865: (t, e, r) => {
      r.d(e, { M7: () => a, Op: () => o, eB: () => n });
      var i = Math.round;
      function n(t, e, r) {
        if (e) {
          var n = e.x1,
            o = e.x2,
            s = e.y1,
            h = e.y2;
          ((t.x1 = n), (t.x2 = o), (t.y1 = s), (t.y2 = h));
          var l = r && r.lineWidth;
          return l
            ? (i(2 * n) === i(2 * o) && (t.x1 = t.x2 = a(n, l, !0)),
              i(2 * s) === i(2 * h) && (t.y1 = t.y2 = a(s, l, !0)),
              t)
            : t;
        }
      }
      function o(t, e, r) {
        if (e) {
          var i = e.x,
            n = e.y,
            o = e.width,
            s = e.height;
          ((t.x = i), (t.y = n), (t.width = o), (t.height = s));
          var h = r && r.lineWidth;
          return h
            ? ((t.x = a(i, h, !0)),
              (t.y = a(n, h, !0)),
              (t.width = Math.max(a(i + o, h, !1) - t.x, 0 === o ? 0 : 1)),
              (t.height = Math.max(a(n + s, h, !1) - t.y, 0 === s ? 0 : 1)),
              t)
            : t;
        }
      }
      function a(t, e, r) {
        if (!e) return t;
        var n = i(2 * t);
        return (n + i(e)) % 2 == 0 ? n / 2 : (n + (r ? 1 : -1)) / 2;
      }
    },
    943471: (t, e, r) => {
      r.d(e, { A: () => s });
      var i = r(15215),
        n = r(467065),
        o = function () {
          ((this.cx = 0),
            (this.cy = 0),
            (this.r = 0),
            (this.startAngle = 0),
            (this.endAngle = 2 * Math.PI),
            (this.clockwise = !0));
        },
        a = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultStyle = function () {
              return { stroke: '#000', fill: null };
            }),
            (e.prototype.getDefaultShape = function () {
              return new o();
            }),
            (e.prototype.buildPath = function (t, e) {
              var r = e.cx,
                i = e.cy,
                n = Math.max(e.r, 0),
                o = e.startAngle,
                a = e.endAngle,
                s = e.clockwise,
                h = Math.cos(o),
                l = Math.sin(o);
              (t.moveTo(h * n + r, l * n + i), t.arc(r, i, n, o, a, !s));
            }),
            e
          );
        })(n.Ay);
      a.prototype.type = 'arc';
      const s = a;
    },
    853849: (t, e, r) => {
      r.d(e, { A: () => c });
      var i = r(15215),
        n = r(467065),
        o = r(983509),
        a = r(989259),
        s = [],
        h = function () {
          ((this.x1 = 0),
            (this.y1 = 0),
            (this.x2 = 0),
            (this.y2 = 0),
            (this.cpx1 = 0),
            (this.cpy1 = 0),
            (this.percent = 1));
        };
      function l(t, e, r) {
        var i = t.cpx2,
          n = t.cpy2;
        return null != i || null != n
          ? [
              (r ? a.rD : a.Yb)(t.x1, t.cpx1, t.cpx2, t.x2, e),
              (r ? a.rD : a.Yb)(t.y1, t.cpy1, t.cpy2, t.y2, e),
            ]
          : [(r ? a.z7 : a.k3)(t.x1, t.cpx1, t.x2, e), (r ? a.z7 : a.k3)(t.y1, t.cpy1, t.y2, e)];
      }
      var u = (function (t) {
        function e(e) {
          return t.call(this, e) || this;
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.getDefaultStyle = function () {
            return { stroke: '#000', fill: null };
          }),
          (e.prototype.getDefaultShape = function () {
            return new h();
          }),
          (e.prototype.buildPath = function (t, e) {
            var r = e.x1,
              i = e.y1,
              n = e.x2,
              o = e.y2,
              h = e.cpx1,
              l = e.cpy1,
              u = e.cpx2,
              c = e.cpy2,
              f = e.percent;
            0 !== f &&
              (t.moveTo(r, i),
              null == u || null == c
                ? (f < 1 &&
                    ((0, a.kx)(r, h, n, f, s),
                    (h = s[1]),
                    (n = s[2]),
                    (0, a.kx)(i, l, o, f, s),
                    (l = s[1]),
                    (o = s[2])),
                  t.quadraticCurveTo(h, l, n, o))
                : (f < 1 &&
                    ((0, a.YT)(r, h, u, n, f, s),
                    (h = s[1]),
                    (u = s[2]),
                    (n = s[3]),
                    (0, a.YT)(i, l, c, o, f, s),
                    (l = s[1]),
                    (c = s[2]),
                    (o = s[3])),
                  t.bezierCurveTo(h, l, u, c, n, o)));
          }),
          (e.prototype.pointAt = function (t) {
            return l(this.shape, t, !1);
          }),
          (e.prototype.tangentAt = function (t) {
            var e = l(this.shape, t, !0);
            return o.normalize(e, e);
          }),
          e
        );
      })(n.Ay);
      u.prototype.type = 'bezier-curve';
      const c = u;
    },
    131571: (t, e, r) => {
      r.d(e, { A: () => s });
      var i = r(15215),
        n = r(467065),
        o = function () {
          ((this.cx = 0), (this.cy = 0), (this.r = 0));
        },
        a = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultShape = function () {
              return new o();
            }),
            (e.prototype.buildPath = function (t, e) {
              (t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI));
            }),
            e
          );
        })(n.Ay);
      a.prototype.type = 'circle';
      const s = a;
    },
    818393: (t, e, r) => {
      r.d(e, { A: () => s });
      var i = r(15215),
        n = r(467065),
        o = function () {
          ((this.cx = 0), (this.cy = 0), (this.rx = 0), (this.ry = 0));
        },
        a = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultShape = function () {
              return new o();
            }),
            (e.prototype.buildPath = function (t, e) {
              var r = 0.5522848,
                i = e.cx,
                n = e.cy,
                o = e.rx,
                a = e.ry,
                s = o * r,
                h = a * r;
              (t.moveTo(i - o, n),
                t.bezierCurveTo(i - o, n - h, i - s, n - a, i, n - a),
                t.bezierCurveTo(i + s, n - a, i + o, n - h, i + o, n),
                t.bezierCurveTo(i + o, n + h, i + s, n + a, i, n + a),
                t.bezierCurveTo(i - s, n + a, i - o, n + h, i - o, n),
                t.closePath());
            }),
            e
          );
        })(n.Ay);
      a.prototype.type = 'ellipse';
      const s = a;
    },
    982861: (t, e, r) => {
      r.d(e, { A: () => l });
      var i = r(15215),
        n = r(467065),
        o = r(14865),
        a = {},
        s = function () {
          ((this.x1 = 0), (this.y1 = 0), (this.x2 = 0), (this.y2 = 0), (this.percent = 1));
        },
        h = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultStyle = function () {
              return { stroke: '#000', fill: null };
            }),
            (e.prototype.getDefaultShape = function () {
              return new s();
            }),
            (e.prototype.buildPath = function (t, e) {
              var r, i, n, s;
              if (this.subPixelOptimize) {
                var h = (0, o.eB)(a, e, this.style);
                ((r = h.x1), (i = h.y1), (n = h.x2), (s = h.y2));
              } else ((r = e.x1), (i = e.y1), (n = e.x2), (s = e.y2));
              var l = e.percent;
              0 !== l &&
                (t.moveTo(r, i),
                l < 1 && ((n = r * (1 - l) + n * l), (s = i * (1 - l) + s * l)),
                t.lineTo(n, s));
            }),
            (e.prototype.pointAt = function (t) {
              var e = this.shape;
              return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t];
            }),
            e
          );
        })(n.Ay);
      h.prototype.type = 'line';
      const l = h;
    },
    252505: (t, e, r) => {
      r.d(e, { A: () => h });
      var i = r(15215),
        n = r(467065),
        o = r(59184),
        a = function () {
          ((this.points = null), (this.smooth = 0), (this.smoothConstraint = null));
        },
        s = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultShape = function () {
              return new a();
            }),
            (e.prototype.buildPath = function (t, e) {
              o.U(t, e, !0);
            }),
            e
          );
        })(n.Ay);
      s.prototype.type = 'polygon';
      const h = s;
    },
    39195: (t, e, r) => {
      r.d(e, { A: () => h });
      var i = r(15215),
        n = r(467065),
        o = r(59184),
        a = function () {
          ((this.points = null),
            (this.percent = 1),
            (this.smooth = 0),
            (this.smoothConstraint = null));
        },
        s = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultStyle = function () {
              return { stroke: '#000', fill: null };
            }),
            (e.prototype.getDefaultShape = function () {
              return new a();
            }),
            (e.prototype.buildPath = function (t, e) {
              o.U(t, e, !1);
            }),
            e
          );
        })(n.Ay);
      s.prototype.type = 'polyline';
      const h = s;
    },
    830010: (t, e, r) => {
      r.d(e, { A: () => l });
      var i = r(15215),
        n = r(467065),
        o = r(14865),
        a = function () {
          ((this.x = 0), (this.y = 0), (this.width = 0), (this.height = 0));
        },
        s = {},
        h = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultShape = function () {
              return new a();
            }),
            (e.prototype.buildPath = function (t, e) {
              var r, i, n, a;
              if (this.subPixelOptimize) {
                var h = (0, o.Op)(s, e, this.style);
                ((r = h.x), (i = h.y), (n = h.width), (a = h.height), (h.r = e.r), (e = h));
              } else ((r = e.x), (i = e.y), (n = e.width), (a = e.height));
              e.r
                ? (function (t, e) {
                    var r,
                      i,
                      n,
                      o,
                      a,
                      s = e.x,
                      h = e.y,
                      l = e.width,
                      u = e.height,
                      c = e.r;
                    (l < 0 && ((s += l), (l = -l)),
                      u < 0 && ((h += u), (u = -u)),
                      'number' == typeof c
                        ? (r = i = n = o = c)
                        : c instanceof Array
                          ? 1 === c.length
                            ? (r = i = n = o = c[0])
                            : 2 === c.length
                              ? ((r = n = c[0]), (i = o = c[1]))
                              : 3 === c.length
                                ? ((r = c[0]), (i = o = c[1]), (n = c[2]))
                                : ((r = c[0]), (i = c[1]), (n = c[2]), (o = c[3]))
                          : (r = i = n = o = 0),
                      r + i > l && ((r *= l / (a = r + i)), (i *= l / a)),
                      n + o > l && ((n *= l / (a = n + o)), (o *= l / a)),
                      i + n > u && ((i *= u / (a = i + n)), (n *= u / a)),
                      r + o > u && ((r *= u / (a = r + o)), (o *= u / a)),
                      t.moveTo(s + r, h),
                      t.lineTo(s + l - i, h),
                      0 !== i && t.arc(s + l - i, h + i, i, -Math.PI / 2, 0),
                      t.lineTo(s + l, h + u - n),
                      0 !== n && t.arc(s + l - n, h + u - n, n, 0, Math.PI / 2),
                      t.lineTo(s + o, h + u),
                      0 !== o && t.arc(s + o, h + u - o, o, Math.PI / 2, Math.PI),
                      t.lineTo(s, h + r),
                      0 !== r && t.arc(s + r, h + r, r, Math.PI, 1.5 * Math.PI));
                  })(t, e)
                : t.rect(r, i, n, a);
            }),
            (e.prototype.isZeroArea = function () {
              return !this.shape.width || !this.shape.height;
            }),
            e
          );
        })(n.Ay);
      h.prototype.type = 'rect';
      const l = h;
    },
    142933: (t, e, r) => {
      r.d(e, { A: () => s });
      var i = r(15215),
        n = r(467065),
        o = function () {
          ((this.cx = 0), (this.cy = 0), (this.r = 0), (this.r0 = 0));
        },
        a = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultShape = function () {
              return new o();
            }),
            (e.prototype.buildPath = function (t, e) {
              var r = e.cx,
                i = e.cy,
                n = 2 * Math.PI;
              (t.moveTo(r + e.r, i),
                t.arc(r, i, e.r, 0, n, !1),
                t.moveTo(r + e.r0, i),
                t.arc(r, i, e.r0, 0, n, !0));
            }),
            e
          );
        })(n.Ay);
      a.prototype.type = 'ring';
      const s = a;
    },
    725014: (t, e, r) => {
      r.d(e, { A: () => x });
      var i = r(15215),
        n = r(467065),
        o = r(498026),
        a = Math.PI,
        s = 2 * a,
        h = Math.sin,
        l = Math.cos,
        u = Math.acos,
        c = Math.atan2,
        f = Math.abs,
        p = Math.sqrt,
        d = Math.max,
        y = Math.min,
        v = 1e-4;
      function g(t, e, r, i, n, o, a) {
        var s = t - r,
          h = e - i,
          l = (a ? o : -o) / p(s * s + h * h),
          u = l * h,
          c = -l * s,
          f = t + u,
          y = e + c,
          v = r + u,
          g = i + c,
          _ = (f + v) / 2,
          m = (y + g) / 2,
          x = v - f,
          w = g - y,
          b = x * x + w * w,
          k = n - o,
          S = f * g - v * y,
          T = (w < 0 ? -1 : 1) * p(d(0, k * k * b - S * S)),
          A = (S * w - x * T) / b,
          C = (-S * x - w * T) / b,
          P = (S * w + x * T) / b,
          M = (-S * x + w * T) / b,
          O = A - _,
          L = C - m,
          D = P - _,
          R = M - m;
        return (
          O * O + L * L > D * D + R * R && ((A = P), (C = M)),
          { cx: A, cy: C, x0: -u, y0: -c, x1: A * (n / k - 1), y1: C * (n / k - 1) }
        );
      }
      var _ = function () {
          ((this.cx = 0),
            (this.cy = 0),
            (this.r0 = 0),
            (this.r = 0),
            (this.startAngle = 0),
            (this.endAngle = 2 * Math.PI),
            (this.clockwise = !0),
            (this.cornerRadius = 0));
        },
        m = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getDefaultShape = function () {
              return new _();
            }),
            (e.prototype.buildPath = function (t, e) {
              !(function (t, e) {
                var r,
                  i = d(e.r, 0),
                  n = d(e.r0 || 0, 0),
                  _ = i > 0;
                if (_ || n > 0) {
                  if ((_ || ((i = n), (n = 0)), n > i)) {
                    var m = i;
                    ((i = n), (n = m));
                  }
                  var x = e.startAngle,
                    w = e.endAngle;
                  if (!isNaN(x) && !isNaN(w)) {
                    var b = e.cx,
                      k = e.cy,
                      S = !!e.clockwise,
                      T = f(w - x),
                      A = T > s && T % s;
                    if ((A > v && (T = A), i > v))
                      if (T > s - v)
                        (t.moveTo(b + i * l(x), k + i * h(x)),
                          t.arc(b, k, i, x, w, !S),
                          n > v && (t.moveTo(b + n * l(w), k + n * h(w)), t.arc(b, k, n, w, x, S)));
                      else {
                        var C = void 0,
                          P = void 0,
                          M = void 0,
                          O = void 0,
                          L = void 0,
                          D = void 0,
                          R = void 0,
                          z = void 0,
                          I = void 0,
                          B = void 0,
                          F = void 0,
                          N = void 0,
                          E = void 0,
                          W = void 0,
                          H = void 0,
                          Y = void 0,
                          X = i * l(x),
                          j = i * h(x),
                          q = n * l(w),
                          V = n * h(w),
                          G = T > v;
                        if (G) {
                          var Z = e.cornerRadius;
                          Z &&
                            ((C = (r = (function (t) {
                              var e;
                              if ((0, o.isArray)(t)) {
                                var r = t.length;
                                if (!r) return t;
                                e =
                                  1 === r
                                    ? [t[0], t[0], 0, 0]
                                    : 2 === r
                                      ? [t[0], t[0], t[1], t[1]]
                                      : 3 === r
                                        ? t.concat(t[2])
                                        : t;
                              } else e = [t, t, t, t];
                              return e;
                            })(Z))[0]),
                            (P = r[1]),
                            (M = r[2]),
                            (O = r[3]));
                          var U = f(i - n) / 2;
                          if (
                            ((L = y(U, M)),
                            (D = y(U, O)),
                            (R = y(U, C)),
                            (z = y(U, P)),
                            (F = I = d(L, D)),
                            (N = B = d(R, z)),
                            (I > v || B > v) &&
                              ((E = i * l(w)),
                              (W = i * h(w)),
                              (H = n * l(x)),
                              (Y = n * h(x)),
                              T < a))
                          ) {
                            var K = (function (t, e, r, i, n, o, a, s) {
                              var h = r - t,
                                l = i - e,
                                u = a - n,
                                c = s - o,
                                f = c * h - u * l;
                              if (!(f * f < v))
                                return [t + (f = (u * (e - o) - c * (t - n)) / f) * h, e + f * l];
                            })(X, j, H, Y, E, W, q, V);
                            if (K) {
                              var $ = X - K[0],
                                Q = j - K[1],
                                J = E - K[0],
                                tt = W - K[1],
                                et =
                                  1 /
                                  h(
                                    u(($ * J + Q * tt) / (p($ * $ + Q * Q) * p(J * J + tt * tt))) /
                                      2,
                                  ),
                                rt = p(K[0] * K[0] + K[1] * K[1]);
                              ((F = y(I, (i - rt) / (et + 1))), (N = y(B, (n - rt) / (et - 1))));
                            }
                          }
                        }
                        if (G)
                          if (F > v) {
                            var it = y(M, F),
                              nt = y(O, F),
                              ot = g(H, Y, X, j, i, it, S),
                              at = g(E, W, q, V, i, nt, S);
                            (t.moveTo(b + ot.cx + ot.x0, k + ot.cy + ot.y0),
                              F < I && it === nt
                                ? t.arc(
                                    b + ot.cx,
                                    k + ot.cy,
                                    F,
                                    c(ot.y0, ot.x0),
                                    c(at.y0, at.x0),
                                    !S,
                                  )
                                : (it > 0 &&
                                    t.arc(
                                      b + ot.cx,
                                      k + ot.cy,
                                      it,
                                      c(ot.y0, ot.x0),
                                      c(ot.y1, ot.x1),
                                      !S,
                                    ),
                                  t.arc(
                                    b,
                                    k,
                                    i,
                                    c(ot.cy + ot.y1, ot.cx + ot.x1),
                                    c(at.cy + at.y1, at.cx + at.x1),
                                    !S,
                                  ),
                                  nt > 0 &&
                                    t.arc(
                                      b + at.cx,
                                      k + at.cy,
                                      nt,
                                      c(at.y1, at.x1),
                                      c(at.y0, at.x0),
                                      !S,
                                    )));
                          } else (t.moveTo(b + X, k + j), t.arc(b, k, i, x, w, !S));
                        else t.moveTo(b + X, k + j);
                        n > v && G
                          ? N > v
                            ? ((it = y(C, N)),
                              (ot = g(q, V, E, W, n, -(nt = y(P, N)), S)),
                              (at = g(X, j, H, Y, n, -it, S)),
                              t.lineTo(b + ot.cx + ot.x0, k + ot.cy + ot.y0),
                              N < B && it === nt
                                ? t.arc(
                                    b + ot.cx,
                                    k + ot.cy,
                                    N,
                                    c(ot.y0, ot.x0),
                                    c(at.y0, at.x0),
                                    !S,
                                  )
                                : (nt > 0 &&
                                    t.arc(
                                      b + ot.cx,
                                      k + ot.cy,
                                      nt,
                                      c(ot.y0, ot.x0),
                                      c(ot.y1, ot.x1),
                                      !S,
                                    ),
                                  t.arc(
                                    b,
                                    k,
                                    n,
                                    c(ot.cy + ot.y1, ot.cx + ot.x1),
                                    c(at.cy + at.y1, at.cx + at.x1),
                                    S,
                                  ),
                                  it > 0 &&
                                    t.arc(
                                      b + at.cx,
                                      k + at.cy,
                                      it,
                                      c(at.y1, at.x1),
                                      c(at.y0, at.x0),
                                      !S,
                                    )))
                            : (t.lineTo(b + q, k + V), t.arc(b, k, n, w, x, S))
                          : t.lineTo(b + q, k + V);
                      }
                    else t.moveTo(b, k);
                    t.closePath();
                  }
                }
              })(t, e);
            }),
            (e.prototype.isZeroArea = function () {
              return (
                this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0
              );
            }),
            e
          );
        })(n.Ay);
      m.prototype.type = 'sector';
      const x = m;
    },
    318409: (t, e, r) => {
      r.d(e, { A: () => Dt });
      var i = r(3455),
        n = r(467065),
        o = r(390540),
        a = r(945558),
        s = r(619845),
        h = Math.sin,
        l = Math.cos,
        u = Math.PI,
        c = 2 * Math.PI,
        f = 180 / u;
      const p = (function () {
        function t() {}
        return (
          (t.prototype.reset = function (t) {
            ((this._start = !0),
              (this._d = []),
              (this._str = ''),
              (this._p = Math.pow(10, t || 4)));
          }),
          (t.prototype.moveTo = function (t, e) {
            this._add('M', t, e);
          }),
          (t.prototype.lineTo = function (t, e) {
            this._add('L', t, e);
          }),
          (t.prototype.bezierCurveTo = function (t, e, r, i, n, o) {
            this._add('C', t, e, r, i, n, o);
          }),
          (t.prototype.quadraticCurveTo = function (t, e, r, i) {
            this._add('Q', t, e, r, i);
          }),
          (t.prototype.arc = function (t, e, r, i, n, o) {
            this.ellipse(t, e, r, r, 0, i, n, o);
          }),
          (t.prototype.ellipse = function (t, e, r, n, o, a, s, p) {
            var d,
              y = s - a,
              v = !p,
              g = Math.abs(y),
              _ = (0, i.Cv)(g - c) || (v ? y >= c : -y >= c),
              m = y > 0 ? y % c : (y % c) + c;
            d = !!_ || (!(0, i.Cv)(g) && m >= u == !!v);
            var x = t + r * l(a),
              w = e + n * h(a);
            this._start && this._add('M', x, w);
            var b = Math.round(o * f);
            if (_) {
              var k = 1 / this._p,
                S = (v ? 1 : -1) * (c - k);
              (this._add('A', r, n, b, 1, +v, t + r * l(a + S), e + n * h(a + S)),
                k > 0.01 && this._add('A', r, n, b, 0, +v, x, w));
            } else {
              var T = t + r * l(s),
                A = e + n * h(s);
              this._add('A', r, n, b, +d, +v, T, A);
            }
          }),
          (t.prototype.rect = function (t, e, r, i) {
            (this._add('M', t, e),
              this._add('l', r, 0),
              this._add('l', 0, i),
              this._add('l', -r, 0),
              this._add('Z'));
          }),
          (t.prototype.closePath = function () {
            this._d.length > 0 && this._add('Z');
          }),
          (t.prototype._add = function (t, e, r, i, n, o, a, s, h) {
            for (var l = [], u = this._p, c = 1; c < arguments.length; c++) {
              var f = arguments[c];
              if (isNaN(f)) return void (this._invalid = !0);
              l.push(Math.round(f * u) / u);
            }
            (this._d.push(t + l.join(' ')), (this._start = 'Z' === t));
          }),
          (t.prototype.generateStr = function () {
            ((this._str = this._invalid ? '' : this._d.join('')), (this._d = []));
          }),
          (t.prototype.getStr = function () {
            return this._str;
          }),
          t
        );
      })();
      var d = r(576050),
        y = r(498026),
        v = 'none',
        g = Math.round,
        _ = ['lineCap', 'miterLimit', 'lineJoin'],
        m = (0, y.map)(_, function (t) {
          return 'stroke-' + t.toLowerCase();
        });
      var x = r(429687),
        w = 'http://www.w3.org/2000/svg',
        b = 'http://www.w3.org/1999/xlink',
        k = 'ecmeta_';
      function S(t) {
        return document.createElementNS(w, t);
      }
      function T(t, e, r, i, n) {
        return { tag: t, attrs: r || {}, children: i, text: n, key: e };
      }
      function A(t, e) {
        var r = (e = e || {}).newline ? '\n' : '';
        return (function t(e) {
          var i = e.children,
            n = e.tag,
            o = e.attrs,
            a = e.text;
          return (
            (function (t, e) {
              var r = [];
              if (e)
                for (var i in e) {
                  var n = e[i],
                    o = i;
                  !1 !== n && (!0 !== n && null != n && (o += '="' + n + '"'), r.push(o));
                }
              return '<' + t + ' ' + r.join(' ') + '>';
            })(n, o) +
            ('style' !== n ? (0, x.Me)(a) : a || '') +
            (i
              ? '' +
                r +
                (0, y.map)(i, function (e) {
                  return t(e);
                }).join(r) +
                r
              : '') +
            '</' +
            n +
            '>'
          );
        })(t);
      }
      function C(t) {
        return {
          zrId: t,
          shadowCache: {},
          patternCache: {},
          gradientCache: {},
          clipPathCache: {},
          defs: {},
          cssNodes: {},
          cssAnims: {},
          cssStyleCache: {},
          cssAnimIdx: 0,
          shadowIdx: 0,
          gradientIdx: 0,
          patternIdx: 0,
          clipPathIdx: 0,
        };
      }
      function P(t, e, r, i) {
        return T(
          'svg',
          'root',
          {
            width: t,
            height: e,
            xmlns: w,
            'xmlns:xlink': b,
            version: '1.1',
            baseProfile: 'full',
            viewBox: !!i && '0 0 ' + t + ' ' + e,
          },
          r,
        );
      }
      var M = r(212191),
        O = r(692836),
        L = r(368717),
        D = r(482591),
        R = r(496320),
        z = 0;
      function I() {
        return z++;
      }
      var B = {
          cubicIn: '0.32,0,0.67,0',
          cubicOut: '0.33,1,0.68,1',
          cubicInOut: '0.65,0,0.35,1',
          quadraticIn: '0.11,0,0.5,0',
          quadraticOut: '0.5,1,0.89,1',
          quadraticInOut: '0.45,0,0.55,1',
          quarticIn: '0.5,0,0.75,0',
          quarticOut: '0.25,1,0.5,1',
          quarticInOut: '0.76,0,0.24,1',
          quinticIn: '0.64,0,0.78,0',
          quinticOut: '0.22,1,0.36,1',
          quinticInOut: '0.83,0,0.17,1',
          sinusoidalIn: '0.12,0,0.39,0',
          sinusoidalOut: '0.61,1,0.88,1',
          sinusoidalInOut: '0.37,0,0.63,1',
          exponentialIn: '0.7,0,0.84,0',
          exponentialOut: '0.16,1,0.3,1',
          exponentialInOut: '0.87,0,0.13,1',
          circularIn: '0.55,0,1,0.45',
          circularOut: '0,0.55,0.45,1',
          circularInOut: '0.85,0,0.15,1',
        },
        F = 'transform-origin';
      function N(t, e, r) {
        var n = (0, y.extend)({}, t.shape);
        ((0, y.extend)(n, e), t.buildPath(r, n));
        var o = new p();
        return (o.reset((0, i.MD)(t)), r.rebuildPath(o, 1), o.generateStr(), o.getStr());
      }
      function E(t, e) {
        var r = e.originX,
          i = e.originY;
        (r || i) && (t[F] = r + 'px ' + i + 'px');
      }
      var W = {
        fill: 'fill',
        opacity: 'opacity',
        lineWidth: 'stroke-width',
        lineDashOffset: 'stroke-dashoffset',
      };
      function H(t, e) {
        var r = e.zrId + '-ani-' + e.cssAnimIdx++;
        return ((e.cssAnims[r] = t), r);
      }
      function Y(t) {
        return (0, y.isString)(t)
          ? B[t]
            ? 'cubic-bezier(' + B[t] + ')'
            : (0, R.w)(t)
              ? t
              : ''
          : '';
      }
      function X(t, e, r, n) {
        var o = t.animators,
          a = o.length,
          s = [];
        if (t instanceof D.A) {
          var h = (function (t, e, r) {
            var i,
              n,
              o = t.shape.paths,
              a = {};
            if (
              ((0, y.each)(o, function (t) {
                var e = C(r.zrId);
                ((e.animation = !0), X(t, {}, e, !0));
                var o = e.cssAnims,
                  s = e.cssNodes,
                  h = (0, y.keys)(o),
                  l = h.length;
                if (l) {
                  var u = o[(n = h[l - 1])];
                  for (var c in u) {
                    var f = u[c];
                    ((a[c] = a[c] || { d: '' }), (a[c].d += f.d || ''));
                  }
                  for (var p in s) {
                    var d = s[p].animation;
                    d.indexOf(n) >= 0 && (i = d);
                  }
                }
              }),
              i)
            ) {
              e.d = !1;
              var s = H(a, r);
              return i.replace(n, s);
            }
          })(t, e, r);
          if (h) s.push(h);
          else if (!a) return;
        } else if (!a) return;
        for (var l = {}, u = 0; u < a; u++) {
          var c = o[u],
            f = [c.getMaxTime() / 1e3 + 's'],
            p = Y(c.getClip().easing),
            d = c.getDelay();
          (p ? f.push(p) : f.push('linear'),
            d && f.push(d / 1e3 + 's'),
            c.getLoop() && f.push('infinite'));
          var v = f.join(' ');
          ((l[v] = l[v] || [v, []]), l[v][1].push(c));
        }
        function g(o) {
          var a,
            s = o[1],
            h = s.length,
            l = {},
            u = {},
            c = {},
            f = 'animation-timing-function';
          function p(t, e, r) {
            for (var i = t.getTracks(), n = t.getMaxTime(), o = 0; o < i.length; o++) {
              var a = i[o];
              if (a.needsAnimate()) {
                var s = a.keyframes,
                  h = a.propName;
                if ((r && (h = r(h)), h))
                  for (var l = 0; l < s.length; l++) {
                    var u = s[l],
                      c = Math.round((u.time / n) * 100) + '%',
                      p = Y(u.easing),
                      d = u.rawValue;
                    ((0, y.isString)(d) || (0, y.isNumber)(d)) &&
                      ((e[c] = e[c] || {}), (e[c][h] = u.rawValue), p && (e[c][f] = p));
                  }
              }
            }
          }
          for (var d = 0; d < h; d++)
            (T = (S = s[d]).targetName) ? 'shape' === T && p(S, u) : !n && p(S, l);
          for (var v in l) {
            var g = {};
            ((0, O.IT)(g, t), (0, y.extend)(g, l[v]));
            var _ = (0, i.Z1)(g),
              m = l[v][f];
            ((c[v] = _ ? { transform: _ } : {}), E(c[v], g), m && (c[v][f] = m));
          }
          var x = !0;
          for (var v in u) {
            c[v] = c[v] || {};
            var w = !a;
            ((m = u[v][f]), w && (a = new L.A()));
            var b = a.len();
            (a.reset(), (c[v].d = N(t, u[v], a)));
            var k = a.len();
            if (!w && b !== k) {
              x = !1;
              break;
            }
            m && (c[v][f] = m);
          }
          if (!x) for (var v in c) delete c[v].d;
          if (!n)
            for (d = 0; d < h; d++) {
              var S, T;
              'style' === (T = (S = s[d]).targetName) &&
                p(S, c, function (t) {
                  return W[t];
                });
            }
          var A,
            C = (0, y.keys)(c),
            P = !0;
          for (d = 1; d < C.length; d++) {
            var M = C[d - 1],
              D = C[d];
            if (c[M][F] !== c[D][F]) {
              P = !1;
              break;
            }
            A = c[M][F];
          }
          if (P && A) {
            for (var v in c) c[v][F] && delete c[v][F];
            e[F] = A;
          }
          if (
            (0, y.filter)(C, function (t) {
              return (0, y.keys)(c[t]).length > 0;
            }).length
          )
            return H(c, r) + ' ' + o[0] + ' both';
        }
        for (var _ in l) (h = g(l[_])) && s.push(h);
        if (s.length) {
          var m = r.zrId + '-cls-' + I();
          ((r.cssNodes['.' + m] = { animation: s.join(',') }), (e.class = m));
        }
      }
      var j = r(132322),
        q = r(259741),
        V = r(747698);
      function G(t, e, r, i) {
        var n = JSON.stringify(t),
          o = r.cssStyleCache[n];
        (o ||
          ((o = r.zrId + '-cls-' + I()),
          (r.cssStyleCache[n] = o),
          (r.cssNodes['.' + o + (i ? ':hover' : '')] = t)),
          (e.class = e.class ? e.class + ' ' + o : o));
      }
      var Z = r(633572),
        U = Math.round;
      function K(t) {
        return t && (0, y.isString)(t.src);
      }
      function $(t) {
        return t && (0, y.isFunction)(t.toDataURL);
      }
      function Q(t, e, r, a) {
        ((function (t, e, r, a) {
          var s = null == e.opacity ? 1 : e.opacity;
          if (r instanceof o.Ay) t('opacity', s);
          else {
            if (
              (function (t) {
                var e = t.fill;
                return null != e && e !== v;
              })(e)
            ) {
              var h = (0, i.$2)(e.fill);
              t('fill', h.color);
              var l = null != e.fillOpacity ? e.fillOpacity * h.opacity * s : h.opacity * s;
              (a || l < 1) && t('fill-opacity', l);
            } else t('fill', v);
            if (
              (function (t) {
                var e = t.stroke;
                return null != e && e !== v;
              })(e)
            ) {
              var u = (0, i.$2)(e.stroke);
              t('stroke', u.color);
              var c = e.strokeNoScale ? r.getLineScale() : 1,
                f = c ? (e.lineWidth || 0) / c : 0,
                p = null != e.strokeOpacity ? e.strokeOpacity * u.opacity * s : u.opacity * s,
                y = e.strokeFirst;
              if (
                ((a || 1 !== f) && t('stroke-width', f),
                (a || y) && t('paint-order', y ? 'stroke' : 'fill'),
                (a || p < 1) && t('stroke-opacity', p),
                e.lineDash)
              ) {
                var x = (0, d.V)(r),
                  w = x[0],
                  b = x[1];
                w &&
                  ((b = g(b || 0)),
                  t('stroke-dasharray', w.join(',')),
                  (b || a) && t('stroke-dashoffset', b));
              } else a && t('stroke-dasharray', v);
              for (var k = 0; k < _.length; k++) {
                var S = _[k];
                if (a || e[S] !== n.MW[S]) {
                  var T = e[S] || n.MW[S];
                  T && t(m[k], T);
                }
              }
            } else a && t('stroke', v);
          }
        })(
          function (n, o) {
            var s = 'fill' === n || 'stroke' === n;
            (s && (0, i.bn)(o) ? lt(e, t, n, a) : s && (0, i.Pt)(o) ? ut(r, t, n, a) : (t[n] = o),
              s && a.ssr && 'none' === o && (t['pointer-events'] = 'visible'));
          },
          e,
          r,
          !1,
        ),
          (function (t, e, r) {
            var n = t.style;
            if ((0, i.dX)(n)) {
              var o = (0, i.si)(t),
                a = r.shadowCache,
                s = a[o];
              if (!s) {
                var h = t.getGlobalScale(),
                  l = h[0],
                  u = h[1];
                if (!l || !u) return;
                var c = n.shadowOffsetX || 0,
                  f = n.shadowOffsetY || 0,
                  p = n.shadowBlur,
                  d = (0, i.$2)(n.shadowColor),
                  y = d.opacity,
                  v = d.color,
                  g = p / 2 / l + ' ' + p / 2 / u;
                ((s = r.zrId + '-s' + r.shadowIdx++),
                  (r.defs[s] = T(
                    'filter',
                    s,
                    { id: s, x: '-100%', y: '-100%', width: '300%', height: '300%' },
                    [
                      T('feDropShadow', '', {
                        dx: c / l,
                        dy: f / u,
                        stdDeviation: g,
                        'flood-color': v,
                        'flood-opacity': y,
                      }),
                    ],
                  )),
                  (a[o] = s));
              }
              e.filter = (0, i.Xu)(s);
            }
          })(r, t, a));
      }
      function J(t, e) {
        var r = (0, Z.getElementSSRData)(e);
        r &&
          (r.each(function (e, r) {
            null != e && (t[(k + r).toLowerCase()] = e + '');
          }),
          e.isSilent() && (t[k + 'silent'] = 'true'));
      }
      function tt(t) {
        return (0, i.Cv)(t[0] - 1) && (0, i.Cv)(t[1]) && (0, i.Cv)(t[2]) && (0, i.Cv)(t[3] - 1);
      }
      function et(t, e, r) {
        if (
          e &&
          (!(function (t) {
            return (0, i.Cv)(t[4]) && (0, i.Cv)(t[5]);
          })(e) ||
            !tt(e))
        ) {
          var n = r ? 10 : 1e4;
          t.transform = tt(e)
            ? 'translate(' + U(e[4] * n) / n + ' ' + U(e[5] * n) / n + ')'
            : (0, i.nV)(e);
        }
      }
      function rt(t, e, r) {
        for (var i = t.points, n = [], o = 0; o < i.length; o++)
          (n.push(U(i[o][0] * r) / r), n.push(U(i[o][1] * r) / r));
        e.points = n.join(' ');
      }
      function it(t) {
        return !t.smooth;
      }
      var nt,
        ot,
        at = {
          circle: [
            ((nt = ['cx', 'cy', 'r']),
            (ot = (0, y.map)(nt, function (t) {
              return 'string' == typeof t ? [t, t] : t;
            })),
            function (t, e, r) {
              for (var i = 0; i < ot.length; i++) {
                var n = ot[i],
                  o = t[n[0]];
                null != o && (e[n[1]] = U(o * r) / r);
              }
            }),
          ],
          polyline: [rt, it],
          polygon: [rt, it],
        };
      function st(t, e) {
        var r = t.style,
          n = t.shape,
          o = at[t.type],
          a = {},
          s = e.animation,
          h = 'path',
          l = t.style.strokePercent,
          u = (e.compress && (0, i.MD)(t)) || 4;
        if (
          !o ||
          e.willUpdate ||
          (o[1] && !o[1](n)) ||
          (s &&
            (function (t) {
              for (var e = t.animators, r = 0; r < e.length; r++)
                if ('shape' === e[r].targetName) return !0;
              return !1;
            })(t)) ||
          l < 1
        ) {
          var c = !t.path || t.shapeChanged();
          t.path || t.createPathProxy();
          var f = t.path;
          c && (f.beginPath(), t.buildPath(f, t.shape), t.pathUpdated());
          var d = f.getVersion(),
            y = t,
            v = y.__svgPathBuilder;
          ((y.__svgPathVersion === d && v && l === y.__svgPathStrokePercent) ||
            (v || (v = y.__svgPathBuilder = new p()),
            v.reset(u),
            f.rebuildPath(v, l),
            v.generateStr(),
            (y.__svgPathVersion = d),
            (y.__svgPathStrokePercent = l)),
            (a.d = v.getStr()));
        } else {
          h = t.type;
          var g = Math.pow(10, u);
          o[0](n, a, g);
        }
        return (
          et(a, t.transform),
          Q(a, r, t, e),
          J(a, t),
          e.animation && X(t, a, e),
          e.emphasis &&
            (function (t, e, r) {
              if (!t.ignore)
                if (t.isSilent()) G((l = { 'pointer-events': 'none' }), e, r, !0);
                else {
                  var i =
                      t.states.emphasis && t.states.emphasis.style ? t.states.emphasis.style : {},
                    n = i.fill;
                  if (!n) {
                    var o = t.style && t.style.fill,
                      a = t.states.select && t.states.select.style && t.states.select.style.fill,
                      s = (t.currentStates.indexOf('select') >= 0 && a) || o;
                    s && (n = (0, V.liftColor)(s));
                  }
                  var h = i.lineWidth;
                  h && (h /= !i.strokeNoScale && t.transform ? t.transform[0] : 1);
                  var l = { cursor: 'pointer' };
                  (n && (l.fill = n),
                    i.stroke && (l.stroke = i.stroke),
                    h && (l['stroke-width'] = h),
                    G(l, e, r, !0));
                }
            })(t, a, e),
          T(h, t.id + '', a)
        );
      }
      function ht(t, e) {
        return t instanceof n.Ay
          ? st(t, e)
          : t instanceof o.Ay
            ? (function (t, e) {
                var r = t.style,
                  i = r.image;
                if (
                  (i && !(0, y.isString)(i) && (K(i) ? (i = i.src) : $(i) && (i = i.toDataURL())),
                  i)
                ) {
                  var n = r.x || 0,
                    o = r.y || 0,
                    a = { href: i, width: r.width, height: r.height };
                  return (
                    n && (a.x = n),
                    o && (a.y = o),
                    et(a, t.transform),
                    Q(a, r, t, e),
                    J(a, t),
                    e.animation && X(t, a, e),
                    T('image', t.id + '', a)
                  );
                }
              })(t, e)
            : t instanceof s.A
              ? (function (t, e) {
                  var r = t.style,
                    n = r.text;
                  if ((null != n && (n += ''), n && !isNaN(r.x) && !isNaN(r.y))) {
                    var o = r.font || q.OH,
                      s = r.x || 0,
                      h = (0, i.sZ)(r.y || 0, (0, a.ks)(o), r.textBaseline),
                      l = {
                        'dominant-baseline': 'central',
                        'text-anchor': i.eQ[r.textAlign] || r.textAlign,
                      };
                    if ((0, j.XE)(r)) {
                      var u = '',
                        c = r.fontStyle,
                        f = (0, j.I5)(r.fontSize);
                      if (!parseFloat(f)) return;
                      var p = r.fontFamily || q.zs,
                        d = r.fontWeight;
                      ((u += 'font-size:' + f + ';font-family:' + p + ';'),
                        c && 'normal' !== c && (u += 'font-style:' + c + ';'),
                        d && 'normal' !== d && (u += 'font-weight:' + d + ';'),
                        (l.style = u));
                    } else l.style = 'font: ' + o;
                    return (
                      n.match(/\s/) && (l['xml:space'] = 'preserve'),
                      s && (l.x = s),
                      h && (l.y = h),
                      et(l, t.transform),
                      Q(l, r, t, e),
                      J(l, t),
                      e.animation && X(t, l, e),
                      T('text', t.id + '', l, void 0, n)
                    );
                  }
                })(t, e)
              : void 0;
      }
      function lt(t, e, r, n) {
        var o,
          a = t[r],
          s = { gradientUnits: a.global ? 'userSpaceOnUse' : 'objectBoundingBox' };
        if ((0, i.OS)(a))
          ((o = 'linearGradient'), (s.x1 = a.x), (s.y1 = a.y), (s.x2 = a.x2), (s.y2 = a.y2));
        else {
          if (!(0, i.OH)(a)) return;
          ((o = 'radialGradient'),
            (s.cx = (0, y.retrieve2)(a.x, 0.5)),
            (s.cy = (0, y.retrieve2)(a.y, 0.5)),
            (s.r = (0, y.retrieve2)(a.r, 0.5)));
        }
        for (var h = a.colorStops, l = [], u = 0, c = h.length; u < c; ++u) {
          var f = 100 * (0, i.XP)(h[u].offset) + '%',
            p = h[u].color,
            d = (0, i.$2)(p),
            v = d.color,
            g = d.opacity,
            _ = { offset: f };
          ((_['stop-color'] = v), g < 1 && (_['stop-opacity'] = g), l.push(T('stop', u + '', _)));
        }
        var m = A(T(o, '', s, l)),
          x = n.gradientCache,
          w = x[m];
        (w ||
          ((w = n.zrId + '-g' + n.gradientIdx++),
          (x[m] = w),
          (s.id = w),
          (n.defs[w] = T(o, w, s, l))),
          (e[r] = (0, i.Xu)(w)));
      }
      function ut(t, e, r, n) {
        var o,
          a = t.style[r],
          s = t.getBoundingRect(),
          h = {},
          l = a.repeat,
          u = 'no-repeat' === l,
          c = 'repeat-x' === l,
          f = 'repeat-y' === l;
        if ((0, i.sL)(a)) {
          var p = a.imageWidth,
            d = a.imageHeight,
            v = void 0,
            g = a.image;
          if (
            ((0, y.isString)(g) ? (v = g) : K(g) ? (v = g.src) : $(g) && (v = g.toDataURL()),
            'undefined' == typeof Image)
          ) {
            var _ = 'Image width/height must been given explictly in svg-ssr renderer.';
            ((0, y.assert)(p, _), (0, y.assert)(d, _));
          } else if (null == p || null == d) {
            var m = function (t, e) {
                if (t) {
                  var r = t.elm,
                    i = p || e.width,
                    n = d || e.height;
                  ('pattern' === t.tag &&
                    (c ? ((n = 1), (i /= s.width)) : f && ((i = 1), (n /= s.height))),
                    (t.attrs.width = i),
                    (t.attrs.height = n),
                    r && (r.setAttribute('width', i), r.setAttribute('height', n)));
                }
              },
              x = (0, M.OD)(v, null, t, function (t) {
                (u || m(S, t), m(o, t));
              });
            x && x.width && x.height && ((p = p || x.width), (d = d || x.height));
          }
          ((o = T('image', 'img', { href: v, width: p, height: d })),
            (h.width = p),
            (h.height = d));
        } else
          a.svgElement &&
            ((o = (0, y.clone)(a.svgElement)), (h.width = a.svgWidth), (h.height = a.svgHeight));
        if (o) {
          var w, b;
          (u
            ? (w = b = 1)
            : c
              ? ((b = 1), (w = h.width / s.width))
              : f
                ? ((w = 1), (b = h.height / s.height))
                : (h.patternUnits = 'userSpaceOnUse'),
            null == w || isNaN(w) || (h.width = w),
            null == b || isNaN(b) || (h.height = b));
          var k = (0, i.Z1)(a);
          k && (h.patternTransform = k);
          var S = T('pattern', '', h, [o]),
            C = A(S),
            P = n.patternCache,
            O = P[C];
          (O ||
            ((O = n.zrId + '-p' + n.patternIdx++),
            (P[C] = O),
            (h.id = O),
            (S = n.defs[O] = T('pattern', O, h, [o]))),
            (e[r] = (0, i.Xu)(O)));
        }
      }
      function ct(t, e, r) {
        var n = r.clipPathCache,
          o = r.defs,
          a = n[t.id];
        if (!a) {
          var s = { id: (a = r.zrId + '-c' + r.clipPathIdx++) };
          ((n[t.id] = a), (o[a] = T('clipPath', a, s, [st(t, r)])));
        }
        e['clip-path'] = (0, i.Xu)(a);
      }
      function ft(t) {
        return document.createTextNode(t);
      }
      function pt(t, e, r) {
        t.insertBefore(e, r);
      }
      function dt(t, e) {
        t.removeChild(e);
      }
      function yt(t, e) {
        t.appendChild(e);
      }
      function vt(t) {
        return t.parentNode;
      }
      function gt(t) {
        return t.nextSibling;
      }
      function _t(t, e) {
        t.textContent = e;
      }
      var mt = T('', '');
      function xt(t) {
        return void 0 === t;
      }
      function wt(t) {
        return void 0 !== t;
      }
      function bt(t, e, r) {
        for (var i = {}, n = e; n <= r; ++n) {
          var o = t[n].key;
          void 0 !== o && (i[o] = n);
        }
        return i;
      }
      function kt(t, e) {
        var r = t.key === e.key;
        return t.tag === e.tag && r;
      }
      function St(t) {
        var e,
          r = t.children,
          i = t.tag;
        if (wt(i)) {
          var n = (t.elm = S(i));
          if ((Ct(mt, t), (0, y.isArray)(r)))
            for (e = 0; e < r.length; ++e) {
              var o = r[e];
              null != o && yt(n, St(o));
            }
          else wt(t.text) && !(0, y.isObject)(t.text) && yt(n, ft(t.text));
        } else t.elm = ft(t.text);
        return t.elm;
      }
      function Tt(t, e, r, i, n) {
        for (; i <= n; ++i) {
          var o = r[i];
          null != o && pt(t, St(o), e);
        }
      }
      function At(t, e, r, i) {
        for (; r <= i; ++r) {
          var n = e[r];
          null != n && (wt(n.tag) ? dt(vt(n.elm), n.elm) : dt(t, n.elm));
        }
      }
      function Ct(t, e) {
        var r,
          i = e.elm,
          n = (t && t.attrs) || {},
          o = e.attrs || {};
        if (n !== o) {
          for (r in o) {
            var a = o[r];
            n[r] !== a &&
              (!0 === a
                ? i.setAttribute(r, '')
                : !1 === a
                  ? i.removeAttribute(r)
                  : 'style' === r
                    ? (i.style.cssText = a)
                    : 120 !== r.charCodeAt(0)
                      ? i.setAttribute(r, a)
                      : 'xmlns:xlink' === r || 'xmlns' === r
                        ? i.setAttributeNS('http://www.w3.org/2000/xmlns/', r, a)
                        : 58 === r.charCodeAt(3)
                          ? i.setAttributeNS('http://www.w3.org/XML/1998/namespace', r, a)
                          : 58 === r.charCodeAt(5)
                            ? i.setAttributeNS(b, r, a)
                            : i.setAttribute(r, a));
          }
          for (r in n) r in o || i.removeAttribute(r);
        }
      }
      function Pt(t, e) {
        var r = (e.elm = t.elm),
          i = t.children,
          n = e.children;
        t !== e &&
          (Ct(t, e),
          xt(e.text)
            ? wt(i) && wt(n)
              ? i !== n &&
                (function (t, e, r) {
                  for (
                    var i,
                      n,
                      o,
                      a = 0,
                      s = 0,
                      h = e.length - 1,
                      l = e[0],
                      u = e[h],
                      c = r.length - 1,
                      f = r[0],
                      p = r[c];
                    a <= h && s <= c;
                  )
                    null == l
                      ? (l = e[++a])
                      : null == u
                        ? (u = e[--h])
                        : null == f
                          ? (f = r[++s])
                          : null == p
                            ? (p = r[--c])
                            : kt(l, f)
                              ? (Pt(l, f), (l = e[++a]), (f = r[++s]))
                              : kt(u, p)
                                ? (Pt(u, p), (u = e[--h]), (p = r[--c]))
                                : kt(l, p)
                                  ? (Pt(l, p), pt(t, l.elm, gt(u.elm)), (l = e[++a]), (p = r[--c]))
                                  : kt(u, f)
                                    ? (Pt(u, f), pt(t, u.elm, l.elm), (u = e[--h]), (f = r[++s]))
                                    : (xt(i) && (i = bt(e, a, h)),
                                      xt((n = i[f.key])) || (o = e[n]).tag !== f.tag
                                        ? pt(t, St(f), l.elm)
                                        : (Pt(o, f), (e[n] = void 0), pt(t, o.elm, l.elm)),
                                      (f = r[++s]));
                  (a <= h || s <= c) &&
                    (a > h
                      ? Tt(t, null == r[c + 1] ? null : r[c + 1].elm, r, s, c)
                      : At(t, e, a, h));
                })(r, i, n)
              : wt(n)
                ? (wt(t.text) && _t(r, ''), Tt(r, null, n, 0, n.length - 1))
                : wt(i)
                  ? At(r, i, 0, i.length - 1)
                  : wt(t.text) && _t(r, '')
            : t.text !== e.text && (wt(i) && At(r, i, 0, i.length - 1), _t(r, e.text)));
      }
      var Mt = r(153479),
        Ot = 0,
        Lt = (function () {
          function t(t, e, r) {
            if (
              ((this.type = 'svg'),
              (this.refreshHover = function () {}),
              (this.configLayer = function () {}),
              (this.storage = e),
              (this._opts = r = (0, y.extend)({}, r)),
              (this.root = t),
              (this._id = 'zr' + Ot++),
              (this._oldVNode = P(r.width, r.height)),
              t && !r.ssr)
            ) {
              var i = (this._viewport = document.createElement('div'));
              i.style.cssText = 'position:relative;overflow:hidden';
              var n = (this._svgDom = this._oldVNode.elm = S('svg'));
              (Ct(null, this._oldVNode), i.appendChild(n), t.appendChild(i));
            }
            this.resize(r.width, r.height);
          }
          return (
            (t.prototype.getType = function () {
              return this.type;
            }),
            (t.prototype.getViewportRoot = function () {
              return this._viewport;
            }),
            (t.prototype.getViewportRootOffset = function () {
              var t = this.getViewportRoot();
              if (t) return { offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0 };
            }),
            (t.prototype.getSvgDom = function () {
              return this._svgDom;
            }),
            (t.prototype.refresh = function () {
              if (this.root) {
                var t = this.renderToVNode({ willUpdate: !0 });
                ((t.attrs.style = 'position:absolute;left:0;top:0;user-select:none'),
                  (function (t, e) {
                    if (kt(t, e)) Pt(t, e);
                    else {
                      var r = t.elm,
                        i = vt(r);
                      (St(e), null !== i && (pt(i, e.elm, gt(r)), At(i, [t], 0, 0)));
                    }
                  })(this._oldVNode, t),
                  (this._oldVNode = t));
              }
            }),
            (t.prototype.renderOneToVNode = function (t) {
              return ht(t, C(this._id));
            }),
            (t.prototype.renderToVNode = function (t) {
              t = t || {};
              var e = this.storage.getDisplayList(!0),
                r = this._width,
                n = this._height,
                o = C(this._id);
              ((o.animation = t.animation),
                (o.willUpdate = t.willUpdate),
                (o.compress = t.compress),
                (o.emphasis = t.emphasis),
                (o.ssr = this._opts.ssr));
              var a = [],
                s = (this._bgVNode = (function (t, e, r, n) {
                  var o;
                  if (r && 'none' !== r)
                    if (
                      ((o = T('rect', 'bg', { width: t, height: e, x: '0', y: '0' })), (0, i.bn)(r))
                    )
                      lt({ fill: r }, o.attrs, 'fill', n);
                    else if ((0, i.Pt)(r))
                      ut(
                        {
                          style: { fill: r },
                          dirty: y.noop,
                          getBoundingRect: function () {
                            return { width: t, height: e };
                          },
                        },
                        o.attrs,
                        'fill',
                        n,
                      );
                    else {
                      var a = (0, i.$2)(r),
                        s = a.color,
                        h = a.opacity;
                      ((o.attrs.fill = s), h < 1 && (o.attrs['fill-opacity'] = h));
                    }
                  return o;
                })(r, n, this._backgroundColor, o));
              s && a.push(s);
              var h = t.compress ? null : (this._mainVNode = T('g', 'main', {}, []));
              (this._paintList(e, o, h ? h.children : a), h && a.push(h));
              var l = (0, y.map)((0, y.keys)(o.defs), function (t) {
                return o.defs[t];
              });
              if ((l.length && a.push(T('defs', 'defs', {}, l)), t.animation)) {
                var u = (function (t, e, r) {
                  var i = (r = r || {}).newline ? '\n' : '',
                    n = ' {' + i,
                    o = i + '}',
                    a = (0, y.map)((0, y.keys)(t), function (e) {
                      return (
                        e +
                        n +
                        (0, y.map)((0, y.keys)(t[e]), function (r) {
                          return r + ':' + t[e][r] + ';';
                        }).join(i) +
                        o
                      );
                    }).join(i),
                    s = (0, y.map)((0, y.keys)(e), function (t) {
                      return (
                        '@keyframes ' +
                        t +
                        n +
                        (0, y.map)((0, y.keys)(e[t]), function (r) {
                          return (
                            r +
                            n +
                            (0, y.map)((0, y.keys)(e[t][r]), function (i) {
                              var n = e[t][r][i];
                              return ('d' === i && (n = 'path("' + n + '")'), i + ':' + n + ';');
                            }).join(i) +
                            o
                          );
                        }).join(i) +
                        o
                      );
                    }).join(i);
                  return a || s ? ['<![CDATA[', a, s, ']]>'].join(i) : '';
                })(o.cssNodes, o.cssAnims, { newline: !0 });
                if (u) {
                  var c = T('style', 'stl', {}, [], u);
                  a.push(c);
                }
              }
              return P(r, n, a, t.useViewBox);
            }),
            (t.prototype.renderToString = function (t) {
              return (
                (t = t || {}),
                A(
                  this.renderToVNode({
                    animation: (0, y.retrieve2)(t.cssAnimation, !0),
                    emphasis: (0, y.retrieve2)(t.cssEmphasis, !0),
                    willUpdate: !1,
                    compress: !0,
                    useViewBox: (0, y.retrieve2)(t.useViewBox, !0),
                  }),
                  { newline: !0 },
                )
              );
            }),
            (t.prototype.setBackgroundColor = function (t) {
              this._backgroundColor = t;
            }),
            (t.prototype.getSvgRoot = function () {
              return this._mainVNode && this._mainVNode.elm;
            }),
            (t.prototype._paintList = function (t, e, r) {
              for (var i, n, o = t.length, a = [], s = 0, h = 0, l = 0; l < o; l++) {
                var u = t[l];
                if (!u.invisible) {
                  var c = u.__clipPaths,
                    f = (c && c.length) || 0,
                    p = (n && n.length) || 0,
                    d = void 0;
                  for (d = Math.max(f - 1, p - 1); d >= 0 && (!c || !n || c[d] !== n[d]); d--);
                  for (var y = p - 1; y > d; y--) i = a[--s - 1];
                  for (var v = d + 1; v < f; v++) {
                    var g = {};
                    ct(c[v], g, e);
                    var _ = T('g', 'clip-g-' + h++, g, []);
                    ((i ? i.children : r).push(_), (a[s++] = _), (i = _));
                  }
                  n = c;
                  var m = ht(u, e);
                  m && (i ? i.children : r).push(m);
                }
              }
            }),
            (t.prototype.resize = function (t, e) {
              var r = this._opts,
                n = this.root,
                o = this._viewport;
              if (
                (null != t && (r.width = t),
                null != e && (r.height = e),
                n &&
                  o &&
                  ((o.style.display = 'none'),
                  (t = (0, Mt.YC)(n, 0, r)),
                  (e = (0, Mt.YC)(n, 1, r)),
                  (o.style.display = '')),
                this._width !== t || this._height !== e)
              ) {
                if (((this._width = t), (this._height = e), o)) {
                  var a = o.style;
                  ((a.width = t + 'px'), (a.height = e + 'px'));
                }
                if ((0, i.Pt)(this._backgroundColor)) this.refresh();
                else {
                  var s = this._svgDom;
                  s && (s.setAttribute('width', t), s.setAttribute('height', e));
                  var h = this._bgVNode && this._bgVNode.elm;
                  h && (h.setAttribute('width', t), h.setAttribute('height', e));
                }
              }
            }),
            (t.prototype.getWidth = function () {
              return this._width;
            }),
            (t.prototype.getHeight = function () {
              return this._height;
            }),
            (t.prototype.dispose = function () {
              (this.root && (this.root.innerHTML = ''),
                (this._svgDom =
                  this._viewport =
                  this.storage =
                  this._oldVNode =
                  this._bgVNode =
                  this._mainVNode =
                    null));
            }),
            (t.prototype.clear = function () {
              (this._svgDom && (this._svgDom.innerHTML = null), (this._oldVNode = null));
            }),
            (t.prototype.toDataURL = function (t) {
              var e = this.renderToString(),
                r = 'data:image/svg+xml;';
              return t
                ? (e = (0, i.WG)(e)) && r + 'base64,' + e
                : r + 'charset=UTF-8,' + encodeURIComponent(e);
            }),
            t
          );
        })();
      const Dt = Lt;
    },
    3455: (t, e, r) => {
      r.d(e, {
        $2: () => s,
        Cv: () => l,
        MD: () => k,
        OH: () => x,
        OS: () => m,
        Pt: () => _,
        WG: () => T,
        XP: () => c,
        Xu: () => b,
        Z1: () => S,
        bn: () => w,
        dX: () => y,
        eQ: () => p,
        nV: () => f,
        sL: () => g,
        sZ: () => d,
        si: () => v,
      });
      var i = r(498026),
        n = r(747698),
        o = r(738123),
        a = Math.round;
      function s(t) {
        var e;
        if (t && 'transparent' !== t) {
          if ('string' == typeof t && t.indexOf('rgba') > -1) {
            var r = (0, n.parse)(t);
            r && ((t = 'rgb(' + r[0] + ',' + r[1] + ',' + r[2] + ')'), (e = r[3]));
          }
        } else t = 'none';
        return { color: t, opacity: e ?? 1 };
      }
      var h = 1e-4;
      function l(t) {
        return t < h && t > -h;
      }
      function u(t) {
        return a(1e3 * t) / 1e3;
      }
      function c(t) {
        return a(1e4 * t) / 1e4;
      }
      function f(t) {
        return (
          'matrix(' +
          u(t[0]) +
          ',' +
          u(t[1]) +
          ',' +
          u(t[2]) +
          ',' +
          u(t[3]) +
          ',' +
          c(t[4]) +
          ',' +
          c(t[5]) +
          ')'
        );
      }
      var p = { left: 'start', right: 'end', center: 'middle', middle: 'middle' };
      function d(t, e, r) {
        return ('top' === r ? (t += e / 2) : 'bottom' === r && (t -= e / 2), t);
      }
      function y(t) {
        return t && (t.shadowBlur || t.shadowOffsetX || t.shadowOffsetY);
      }
      function v(t) {
        var e = t.style,
          r = t.getGlobalScale();
        return [
          e.shadowColor,
          (e.shadowBlur || 0).toFixed(2),
          (e.shadowOffsetX || 0).toFixed(2),
          (e.shadowOffsetY || 0).toFixed(2),
          r[0],
          r[1],
        ].join(',');
      }
      function g(t) {
        return t && !!t.image;
      }
      function _(t) {
        return (
          g(t) ||
          (function (t) {
            return t && !!t.svgElement;
          })(t)
        );
      }
      function m(t) {
        return 'linear' === t.type;
      }
      function x(t) {
        return 'radial' === t.type;
      }
      function w(t) {
        return t && ('linear' === t.type || 'radial' === t.type);
      }
      function b(t) {
        return 'url(#' + t + ')';
      }
      function k(t) {
        var e = t.getGlobalScale(),
          r = Math.max(e[0], e[1]);
        return Math.max(Math.ceil(Math.log(r) / Math.log(10)), 1);
      }
      function S(t) {
        var e = t.x || 0,
          r = t.y || 0,
          n = (t.rotation || 0) * i.RADIAN_TO_DEGREE,
          o = (0, i.retrieve2)(t.scaleX, 1),
          s = (0, i.retrieve2)(t.scaleY, 1),
          h = t.skewX || 0,
          l = t.skewY || 0,
          u = [];
        return (
          (e || r) && u.push('translate(' + e + 'px,' + r + 'px)'),
          n && u.push('rotate(' + n + ')'),
          (1 === o && 1 === s) || u.push('scale(' + o + ',' + s + ')'),
          (h || l) &&
            u.push(
              'skew(' + a(h * i.RADIAN_TO_DEGREE) + 'deg, ' + a(l * i.RADIAN_TO_DEGREE) + 'deg)',
            ),
          u.join(' ')
        );
      }
      var T =
        o.A.hasGlobalWindow && (0, i.isFunction)(window.btoa)
          ? function (t) {
              return window.btoa(unescape(encodeURIComponent(t)));
            }
          : 'undefined' != typeof Buffer
            ? function (t) {
                return Buffer.from(t).toString('base64');
              }
            : function (t) {
                return null;
              };
    },
  },
]);
