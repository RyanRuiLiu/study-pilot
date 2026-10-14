'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [36514],
  {
    311734: (t, e, o) => {
      o.d(e, { a: () => U });
      var n = o(15215),
        i = o(913637),
        a = o(347355),
        r = o(62103),
        s = o(843870);
      const l = (function (t) {
        function e() {
          var o = (null !== t && t.apply(this, arguments)) || this;
          return ((o.type = e.type), (o.hasSymbolVisual = !0), o);
        }
        return (
          (0, n.__extends)(e, t),
          (e.prototype.getInitialData = function (t) {
            return (0, i.A)(null, this, { useEncodeDefaulter: !0 });
          }),
          (e.prototype.getLegendIcon = function (t) {
            var e = new s.A(),
              o = (0, r.v5)('line', 0, t.itemHeight / 2, t.itemWidth, 0, t.lineStyle.stroke, !1);
            (e.add(o), o.setStyle(t.lineStyle));
            var n = this.getData().getVisual('symbol'),
              i = this.getData().getVisual('symbolRotate'),
              a = 'none' === n ? 'circle' : n,
              l = 0.8 * t.itemHeight,
              h = (0, r.v5)(
                a,
                (t.itemWidth - l) / 2,
                (t.itemHeight - l) / 2,
                l,
                l,
                t.itemStyle.fill,
              );
            (e.add(h), h.setStyle(t.itemStyle));
            var u = 'inherit' === t.iconRotate ? i : t.iconRotate || 0;
            return (
              (h.rotation = (u * Math.PI) / 180),
              h.setOrigin([t.itemWidth / 2, t.itemHeight / 2]),
              a.indexOf('empty') > -1 &&
                ((h.style.stroke = h.style.fill), (h.style.fill = '#fff'), (h.style.lineWidth = 2)),
              e
            );
          }),
          (e.type = 'series.line'),
          (e.dependencies = ['grid', 'polar']),
          (e.defaultOption = {
            z: 3,
            coordinateSystem: 'cartesian2d',
            legendHoverLink: !0,
            clip: !0,
            label: { position: 'top' },
            endLabel: { show: !1, valueAnimation: !0, distance: 8 },
            lineStyle: { width: 2, type: 'solid' },
            emphasis: { scale: !0 },
            step: !1,
            smooth: !1,
            smoothMonotone: null,
            symbol: 'emptyCircle',
            symbolSize: 4,
            symbolRotate: null,
            showSymbol: !0,
            showAllSymbol: 'auto',
            connectNulls: !1,
            sampling: 'none',
            animationEasing: 'linear',
            progressive: 0,
            hoverLayerThreshold: 1 / 0,
            universalTransition: { divideShape: 'clone' },
            triggerLineEvent: !1,
          }),
          e
        );
      })(a.A);
      var h = o(498026),
        u = o(218386),
        p = o(10128),
        d = o(265008);
      function c(t, e, o) {
        var n = t.getBaseAxis(),
          i = t.getOtherAxis(n),
          a = (function (t, e) {
            var o = 0,
              n = t.scale.getExtent();
            return (
              'start' === e
                ? (o = n[0])
                : 'end' === e
                  ? (o = n[1])
                  : (0, h.isNumber)(e) && !isNaN(e)
                    ? (o = e)
                    : n[0] > 0
                      ? (o = n[0])
                      : n[1] < 0 && (o = n[1]),
              o
            );
          })(i, o),
          r = n.dim,
          s = i.dim,
          l = e.mapDimension(s),
          u = e.mapDimension(r),
          p = 'x' === s || 'radius' === s ? 1 : 0,
          c = (0, h.map)(t.dimensions, function (t) {
            return e.mapDimension(t);
          }),
          f = !1,
          g = e.getCalculationInfo('stackResultDimension');
        return (
          (0, d.sJ)(e, c[0]) && ((f = !0), (c[0] = g)),
          (0, d.sJ)(e, c[1]) && ((f = !0), (c[1] = g)),
          {
            dataDimsForPoint: c,
            valueStart: a,
            valueAxisDim: s,
            baseAxisDim: r,
            stacked: !!f,
            valueDim: l,
            baseDim: u,
            baseDataOffset: p,
            stackedOverDimension: e.getCalculationInfo('stackedOverDimension'),
          }
        );
      }
      function f(t, e, o, n) {
        var i = NaN;
        (t.stacked && (i = o.get(o.getCalculationInfo('stackedOverDimension'), n)),
          isNaN(i) && (i = t.valueStart));
        var a = t.baseDataOffset,
          r = [];
        return ((r[a] = o.get(t.baseDim, n)), (r[1 - a] = i), e.dataToPoint(r));
      }
      var g = o(108957),
        y = o(229668),
        v = o(683257),
        m = o(132322),
        _ = o(48170),
        b = o(553364),
        S = o(106666),
        x = o(195235),
        w = o(741849),
        A = o(34833),
        C = o(289632),
        D = o(744532),
        L = o(669622),
        I = o(783412),
        O = o(747698);
      function P(t, e) {
        if (t.length === e.length) {
          for (var o = 0; o < t.length; o++) if (t[o] !== e[o]) return;
          return !0;
        }
      }
      function N(t) {
        for (var e = 1 / 0, o = 1 / 0, n = -1 / 0, i = -1 / 0, a = 0; a < t.length;) {
          var r = t[a++],
            s = t[a++];
          (isNaN(r) || ((e = Math.min(r, e)), (n = Math.max(r, n))),
            isNaN(s) || ((o = Math.min(s, o)), (i = Math.max(s, i))));
        }
        return [
          [e, o],
          [n, i],
        ];
      }
      function M(t, e) {
        var o = N(t),
          n = o[0],
          i = o[1],
          a = N(e),
          r = a[0],
          s = a[1];
        return Math.max(
          Math.abs(n[0] - r[0]),
          Math.abs(n[1] - r[1]),
          Math.abs(i[0] - s[0]),
          Math.abs(i[1] - s[1]),
        );
      }
      function k(t) {
        return h.isNumber(t) ? t : t ? 0.5 : 0;
      }
      function T(t, e, o, n, i) {
        var a = o.getBaseAxis(),
          r = 'x' === a.dim || 'radius' === a.dim ? 0 : 1,
          s = [],
          l = 0,
          h = [],
          u = [],
          p = [],
          d = [];
        if (i) {
          for (l = 0; l < t.length; l += 2) {
            var c = e || t;
            isNaN(c[l]) || isNaN(c[l + 1]) || d.push(t[l], t[l + 1]);
          }
          t = d;
        }
        for (l = 0; l < t.length - 2; l += 2)
          switch (
            ((p[0] = t[l + 2]),
            (p[1] = t[l + 3]),
            (u[0] = t[l]),
            (u[1] = t[l + 1]),
            s.push(u[0], u[1]),
            n)
          ) {
            case 'end':
              ((h[r] = p[r]), (h[1 - r] = u[1 - r]), s.push(h[0], h[1]));
              break;
            case 'middle':
              var f = (u[r] + p[r]) / 2,
                g = [];
              ((h[r] = g[r] = f),
                (h[1 - r] = u[1 - r]),
                (g[1 - r] = p[1 - r]),
                s.push(h[0], h[1]),
                s.push(g[0], g[1]));
              break;
            default:
              ((h[r] = u[r]), (h[1 - r] = p[1 - r]), s.push(h[0], h[1]));
          }
        return (s.push(t[l++], t[l++]), s);
      }
      function E(t, e) {
        return isNaN(t) || isNaN(e);
      }
      function z(t, e) {
        return [t[2 * e], t[2 * e + 1]];
      }
      function V(t) {
        if (t.get(['endLabel', 'show'])) return !0;
        for (var e = 0; e < A.BV.length; e++) if (t.get([A.BV[e], 'endLabel', 'show'])) return !0;
        return !1;
      }
      function F(t, e, o, n) {
        if ((0, w.g)(e, 'cartesian2d')) {
          var i = n.getModel('endLabel'),
            a = i.get('valueAnimation'),
            r = n.getData(),
            s = { lastFrameIndex: 0 },
            l = V(n)
              ? function (o, n) {
                  t._endLabelOnDuring(o, n, r, s, a, i, e);
                }
              : null,
            h = e.getBaseAxis().isHorizontal(),
            u = (0, x.SM)(
              e,
              o,
              n,
              function () {
                var e = t._endLabel;
                e && o && null != s.originalX && e.attr({ x: s.originalX, y: s.originalY });
              },
              l,
            );
          if (!n.get('clip', !0)) {
            var p = u.shape,
              d = Math.max(p.width, p.height);
            h ? ((p.y -= d), (p.height += 2 * d)) : ((p.x -= d), (p.width += 2 * d));
          }
          return (l && l(1, u), u);
        }
        return (0, x.Mi)(e, o, n);
      }
      var R = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (0, n.__extends)(e, t),
          (e.prototype.init = function () {
            var t = new s.A(),
              e = new u.A();
            (this.group.add(e.group),
              (this._symbolDraw = e),
              (this._lineGroup = t),
              (this._changePolyState = h.bind(this._changePolyState, this)));
          }),
          (e.prototype.render = function (t, e, o) {
            var n = t.coordinateSystem,
              i = this.group,
              a = t.getData(),
              r = t.getModel('lineStyle'),
              s = t.getModel('areaStyle'),
              l = a.getLayout('points') || [],
              u = 'polar' === n.type,
              d = this._coordSys,
              m = this._symbolDraw,
              _ = this._polyline,
              b = this._polygon,
              S = this._lineGroup,
              x = !e.ssr && t.get('animation'),
              w = !s.isEmpty(),
              C = s.get('origin'),
              D = c(n, a, C),
              N =
                w &&
                (function (t, e, o) {
                  if (!o.valueDim) return [];
                  for (var n = e.count(), i = (0, g.J)(2 * n), a = 0; a < n; a++) {
                    var r = f(o, t, e, a);
                    ((i[2 * a] = r[0]), (i[2 * a + 1] = r[1]));
                  }
                  return i;
                })(n, a, D),
              M = t.get('showSymbol'),
              E = t.get('connectNulls'),
              z =
                M &&
                !u &&
                (function (t, e, o) {
                  var n = t.get('showAllSymbol'),
                    i = 'auto' === n;
                  if (!n || i) {
                    var a = o.getAxesByScale('ordinal')[0];
                    if (
                      a &&
                      (!i ||
                        !(function (t, e) {
                          var o = t.getExtent(),
                            n = Math.abs(o[1] - o[0]) / t.scale.count();
                          isNaN(n) && (n = 0);
                          for (
                            var i = e.count(), a = Math.max(1, Math.round(i / 5)), r = 0;
                            r < i;
                            r += a
                          )
                            if (1.5 * p.A.getSymbolSize(e, r)[t.isHorizontal() ? 1 : 0] > n)
                              return !1;
                          return !0;
                        })(a, e))
                    ) {
                      var r = e.mapDimension(a.dim),
                        s = {};
                      return (
                        h.each(a.getViewLabels(), function (t) {
                          var e = a.scale.getRawOrdinalNumber(t.tickValue);
                          s[e] = 1;
                        }),
                        function (t) {
                          return !s.hasOwnProperty(e.get(r, t));
                        }
                      );
                    }
                  }
                })(t, a, n),
              V = this._data;
            (V &&
              V.eachItemGraphicEl(function (t, e) {
                t.__temp && (i.remove(t), V.setItemGraphicEl(e, null));
              }),
              M || m.remove(),
              i.add(S));
            var R,
              G = !u && t.get('step');
            (n &&
              n.getArea &&
              t.get('clip', !0) &&
              (null != (R = n.getArea()).width
                ? ((R.x -= 0.1), (R.y -= 0.1), (R.width += 0.2), (R.height += 0.2))
                : R.r0 && ((R.r0 -= 0.5), (R.r += 0.5))),
              (this._clipShapeForSymbol = R));
            var H =
              (function (t, e, o) {
                var n = t.getVisual('visualMeta');
                if (n && n.length && t.count() && 'cartesian2d' === e.type) {
                  for (var i, a, r = n.length - 1; r >= 0; r--) {
                    var s = t.getDimensionInfo(n[r].dimension);
                    if ('x' === (i = s && s.coordDim) || 'y' === i) {
                      a = n[r];
                      break;
                    }
                  }
                  if (a) {
                    var l = e.getAxis(i),
                      u = h.map(a.stops, function (t) {
                        return { coord: l.toGlobalCoord(l.dataToCoord(t.value)), color: t.color };
                      }),
                      p = u.length,
                      d = a.outerColors.slice();
                    p && u[0].coord > u[p - 1].coord && (u.reverse(), d.reverse());
                    var c = (function (t, e) {
                        var o,
                          n,
                          i = [],
                          a = t.length;
                        function r(t, e, o) {
                          var n = t.coord,
                            i = (o - n) / (e.coord - n);
                          return { coord: o, color: (0, O.lerp)(i, [t.color, e.color]) };
                        }
                        for (var s = 0; s < a; s++) {
                          var l = t[s],
                            h = l.coord;
                          if (h < 0) o = l;
                          else {
                            if (h > e) {
                              n ? i.push(r(n, l, e)) : o && i.push(r(o, l, 0), r(o, l, e));
                              break;
                            }
                            (o && (i.push(r(o, l, 0)), (o = null)), i.push(l), (n = l));
                          }
                        }
                        return i;
                      })(u, 'x' === i ? o.getWidth() : o.getHeight()),
                      f = c.length;
                    if (!f && p)
                      return u[0].coord < 0
                        ? d[1]
                          ? d[1]
                          : u[p - 1].color
                        : d[0]
                          ? d[0]
                          : u[0].color;
                    var g = c[0].coord - 10,
                      v = c[f - 1].coord + 10,
                      m = v - g;
                    if (m < 0.001) return 'transparent';
                    (h.each(c, function (t) {
                      t.offset = (t.coord - g) / m;
                    }),
                      c.push({ offset: f ? c[f - 1].offset : 0.5, color: d[1] || 'transparent' }),
                      c.unshift({ offset: f ? c[0].offset : 0.5, color: d[0] || 'transparent' }));
                    var _ = new y.A(0, 0, 0, 0, c, !0);
                    return ((_[i] = g), (_[i + '2'] = v), _);
                  }
                }
              })(a, n, o) || a.getVisual('style')[a.getVisual('drawType')];
            if (_ && d.type === n.type && G === this._step) {
              (w && !b
                ? (b = this._newPolygon(l, N))
                : b && !w && (S.remove(b), (b = this._polygon = null)),
                u || this._initOrUpdateEndLabel(t, n, (0, I.he)(H)));
              var B = S.getClipPath();
              if (B) {
                var U = F(this, n, !1, t);
                v.LW(B, { shape: U.shape }, t);
              } else S.setClipPath(F(this, n, !0, t));
              (M &&
                m.updateData(a, {
                  isIgnore: z,
                  clipShape: R,
                  disableAnimation: !0,
                  getSymbolPoint: function (t) {
                    return [l[2 * t], l[2 * t + 1]];
                  },
                }),
                (P(this._stackedOnPoints, N) && P(this._points, l)) ||
                  (x
                    ? this._doUpdateAnimation(a, N, n, o, G, C, E)
                    : (G && (N && (N = T(N, l, n, G, E)), (l = T(l, null, n, G, E))),
                      _.setShape({ points: l }),
                      b && b.setShape({ points: l, stackedOnPoints: N }))));
            } else
              (M &&
                m.updateData(a, {
                  isIgnore: z,
                  clipShape: R,
                  disableAnimation: !0,
                  getSymbolPoint: function (t) {
                    return [l[2 * t], l[2 * t + 1]];
                  },
                }),
                x && this._initSymbolLabelAnimation(a, n, R),
                G && (N && (N = T(N, l, n, G, E)), (l = T(l, null, n, G, E))),
                (_ = this._newPolyline(l)),
                w ? (b = this._newPolygon(l, N)) : b && (S.remove(b), (b = this._polygon = null)),
                u || this._initOrUpdateEndLabel(t, n, (0, I.he)(H)),
                S.setClipPath(F(this, n, !0, t)));
            var J = t.getModel('emphasis'),
              W = J.get('focus'),
              Z = J.get('blurScope'),
              Y = J.get('disabled');
            (_.useStyle(
              h.defaults(r.getLineStyle(), { fill: 'none', stroke: H, lineJoin: 'bevel' }),
            ),
              (0, A.Mx)(_, t, 'lineStyle'),
              _.style.lineWidth > 0 &&
                'bolder' === t.get(['emphasis', 'lineStyle', 'width']) &&
                (_.getState('emphasis').style.lineWidth = +_.style.lineWidth + 1),
              ((0, L.z)(_).seriesIndex = t.seriesIndex),
              (0, A.Lm)(_, W, Z, Y));
            var X = k(t.get('smooth')),
              q = t.get('smoothMonotone');
            if ((_.setShape({ smooth: X, smoothMonotone: q, connectNulls: E }), b)) {
              var j = a.getCalculationInfo('stackedOnSeries'),
                K = 0;
              (b.useStyle(
                h.defaults(s.getAreaStyle(), {
                  fill: H,
                  opacity: 0.7,
                  lineJoin: 'bevel',
                  decal: a.getVisual('style').decal,
                }),
              ),
                j && (K = k(j.get('smooth'))),
                b.setShape({ smooth: X, stackedOnSmooth: K, smoothMonotone: q, connectNulls: E }),
                (0, A.Mx)(b, t, 'areaStyle'),
                ((0, L.z)(b).seriesIndex = t.seriesIndex),
                (0, A.Lm)(b, W, Z, Y));
            }
            var Q = this._changePolyState;
            (a.eachItemGraphicEl(function (t) {
              t && (t.onHoverStateChange = Q);
            }),
              (this._polyline.onHoverStateChange = Q),
              (this._data = a),
              (this._coordSys = n),
              (this._stackedOnPoints = N),
              (this._points = l),
              (this._step = G),
              (this._valueOrigin = C),
              t.get('triggerLineEvent') &&
                (this.packEventData(t, _), b && this.packEventData(t, b)));
          }),
          (e.prototype.packEventData = function (t, e) {
            (0, L.z)(e).eventData = {
              componentType: 'series',
              componentSubType: 'line',
              componentIndex: t.componentIndex,
              seriesIndex: t.seriesIndex,
              seriesName: t.name,
              seriesType: 'line',
            };
          }),
          (e.prototype.highlight = function (t, e, o, n) {
            var i = t.getData(),
              a = _.le(i, n);
            if ((this._changePolyState('emphasis'), !(a instanceof Array) && null != a && a >= 0)) {
              var r = i.getLayout('points'),
                s = i.getItemGraphicEl(a);
              if (!s) {
                var l = r[2 * a],
                  h = r[2 * a + 1];
                if (isNaN(l) || isNaN(h)) return;
                if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(l, h)) return;
                var u = t.get('zlevel') || 0,
                  d = t.get('z') || 0;
                (((s = new p.A(i, a)).x = l), (s.y = h), s.setZ(u, d));
                var c = s.getSymbolPath().getTextContent();
                (c && ((c.zlevel = u), (c.z = d), (c.z2 = this._polyline.z2 + 1)),
                  (s.__temp = !0),
                  i.setItemGraphicEl(a, s),
                  s.stopSymbolAnimation(!0),
                  this.group.add(s));
              }
              s.highlight();
            } else S.A.prototype.highlight.call(this, t, e, o, n);
          }),
          (e.prototype.downplay = function (t, e, o, n) {
            var i = t.getData(),
              a = _.le(i, n);
            if ((this._changePolyState('normal'), null != a && a >= 0)) {
              var r = i.getItemGraphicEl(a);
              r && (r.__temp ? (i.setItemGraphicEl(a, null), this.group.remove(r)) : r.downplay());
            } else S.A.prototype.downplay.call(this, t, e, o, n);
          }),
          (e.prototype._changePolyState = function (t) {
            var e = this._polygon;
            ((0, A.Pk)(this._polyline, t), e && (0, A.Pk)(e, t));
          }),
          (e.prototype._newPolyline = function (t) {
            var e = this._polyline;
            return (
              e && this._lineGroup.remove(e),
              (e = new b.N({ shape: { points: t }, segmentIgnoreThreshold: 2, z2: 10 })),
              this._lineGroup.add(e),
              (this._polyline = e),
              e
            );
          }),
          (e.prototype._newPolygon = function (t, e) {
            var o = this._polygon;
            return (
              o && this._lineGroup.remove(o),
              (o = new b.z({
                shape: { points: t, stackedOnPoints: e },
                segmentIgnoreThreshold: 2,
              })),
              this._lineGroup.add(o),
              (this._polygon = o),
              o
            );
          }),
          (e.prototype._initSymbolLabelAnimation = function (t, e, o) {
            var n,
              i,
              a = e.getBaseAxis(),
              r = a.inverse;
            'cartesian2d' === e.type
              ? ((n = a.isHorizontal()), (i = !1))
              : 'polar' === e.type && ((n = 'angle' === a.dim), (i = !0));
            var s = t.hostModel,
              l = s.get('animationDuration');
            h.isFunction(l) && (l = l(null));
            var u = s.get('animationDelay') || 0,
              p = h.isFunction(u) ? u(null) : u;
            t.eachItemGraphicEl(function (t, a) {
              var s = t;
              if (s) {
                var d = [t.x, t.y],
                  c = void 0,
                  f = void 0,
                  g = void 0;
                if (o)
                  if (i) {
                    var y = o,
                      v = e.pointToCoord(d);
                    n
                      ? ((c = y.startAngle), (f = y.endAngle), (g = (-v[1] / 180) * Math.PI))
                      : ((c = y.r0), (f = y.r), (g = v[0]));
                  } else {
                    var m = o;
                    n
                      ? ((c = m.x), (f = m.x + m.width), (g = t.x))
                      : ((c = m.y + m.height), (f = m.y), (g = t.y));
                  }
                var _ = f === c ? 0 : (g - c) / (f - c);
                r && (_ = 1 - _);
                var b = h.isFunction(u) ? u(a) : l * _ + p,
                  S = s.getSymbolPath(),
                  x = S.getTextContent();
                (s.attr({ scaleX: 0, scaleY: 0 }),
                  s.animateTo(
                    { scaleX: 1, scaleY: 1 },
                    { duration: 200, setToFinal: !0, delay: b },
                  ),
                  x && x.animateFrom({ style: { opacity: 0 } }, { duration: 300, delay: b }),
                  (S.disableLabelAnimation = !0));
              }
            });
          }),
          (e.prototype._initOrUpdateEndLabel = function (t, e, o) {
            var n = t.getModel('endLabel');
            if (V(t)) {
              var i = t.getData(),
                a = this._polyline,
                r = i.getLayout('points');
              if (!r) return (a.removeTextContent(), void (this._endLabel = null));
              var s = this._endLabel;
              s ||
                (((s = this._endLabel = new m.Ay({ z2: 200 })).ignoreClip = !0),
                a.setTextContent(this._endLabel),
                (a.disableLabelAnimation = !0));
              var l = (function (t) {
                for (var e = t.length / 2; e > 0 && E(t[2 * e - 2], t[2 * e - 1]); e--);
                return e - 1;
              })(r);
              l >= 0 &&
                ((0, C.qM)(
                  a,
                  (0, C.lx)(t, 'endLabel'),
                  {
                    inheritColor: o,
                    labelFetcher: t,
                    labelDataIndex: l,
                    defaultText: function (t, e, o) {
                      return null != o ? (0, D.T)(i, o) : (0, D.i)(i, t);
                    },
                    enableTextSetter: !0,
                  },
                  (function (t, e) {
                    var o = e.getBaseAxis(),
                      n = o.isHorizontal(),
                      i = o.inverse,
                      a = n ? (i ? 'right' : 'left') : 'center',
                      r = n ? 'middle' : i ? 'top' : 'bottom';
                    return {
                      normal: {
                        align: t.get('align') || a,
                        verticalAlign: t.get('verticalAlign') || r,
                      },
                    };
                  })(n, e),
                ),
                (a.textConfig.position = null));
            } else this._endLabel && (this._polyline.removeTextContent(), (this._endLabel = null));
          }),
          (e.prototype._endLabelOnDuring = function (t, e, o, n, i, a, r) {
            var s = this._endLabel,
              l = this._polyline;
            if (s) {
              t < 1 && null == n.originalX && ((n.originalX = s.x), (n.originalY = s.y));
              var h = o.getLayout('points'),
                u = o.hostModel,
                p = u.get('connectNulls'),
                d = a.get('precision'),
                c = a.get('distance') || 0,
                f = r.getBaseAxis(),
                g = f.isHorizontal(),
                y = f.inverse,
                v = e.shape,
                m = y ? (g ? v.x : v.y + v.height) : g ? v.x + v.width : v.y,
                b = (g ? c : 0) * (y ? -1 : 1),
                S = (g ? 0 : -c) * (y ? -1 : 1),
                x = g ? 'x' : 'y',
                w = (function (t, e, o) {
                  for (
                    var n, i, a = t.length / 2, r = 'x' === o ? 0 : 1, s = 0, l = -1, h = 0;
                    h < a;
                    h++
                  )
                    if (((i = t[2 * h + r]), !isNaN(i) && !isNaN(t[2 * h + 1 - r])))
                      if (0 !== h) {
                        if ((n <= e && i >= e) || (n >= e && i <= e)) {
                          l = h;
                          break;
                        }
                        ((s = h), (n = i));
                      } else n = i;
                  return { range: [s, l], t: (e - n) / (i - n) };
                })(h, m, x),
                A = w.range,
                D = A[1] - A[0],
                L = void 0;
              if (D >= 1) {
                if (D > 1 && !p) {
                  var I = z(h, A[0]);
                  (s.attr({ x: I[0] + b, y: I[1] + S }), i && (L = u.getRawValue(A[0])));
                } else {
                  (I = l.getPointOn(m, x)) && s.attr({ x: I[0] + b, y: I[1] + S });
                  var O = u.getRawValue(A[0]),
                    P = u.getRawValue(A[1]);
                  i && (L = _.Il(o, d, O, P, w.t));
                }
                n.lastFrameIndex = A[0];
              } else {
                var N = 1 === t || n.lastFrameIndex > 0 ? A[0] : 0;
                ((I = z(h, N)), i && (L = u.getRawValue(N)), s.attr({ x: I[0] + b, y: I[1] + S }));
              }
              if (i) {
                var M = (0, C.Lu)(s);
                'function' == typeof M.setLabelText && M.setLabelText(L);
              }
            }
          }),
          (e.prototype._doUpdateAnimation = function (t, e, o, n, i, a, r) {
            var s = this._polyline,
              l = this._polygon,
              h = t.hostModel,
              u = (function (t, e, o, n, i, a, r) {
                for (
                  var s = (function (t, e) {
                      var o = [];
                      return (
                        e
                          .diff(t)
                          .add(function (t) {
                            o.push({ cmd: '+', idx: t });
                          })
                          .update(function (t, e) {
                            o.push({ cmd: '=', idx: e, idx1: t });
                          })
                          .remove(function (t) {
                            o.push({ cmd: '-', idx: t });
                          })
                          .execute(),
                        o
                      );
                    })(t, e),
                    l = [],
                    h = [],
                    u = [],
                    p = [],
                    d = [],
                    y = [],
                    v = [],
                    m = c(i, e, r),
                    _ = t.getLayout('points') || [],
                    b = e.getLayout('points') || [],
                    S = 0;
                  S < s.length;
                  S++
                ) {
                  var x = s[S],
                    w = !0,
                    A = void 0,
                    C = void 0;
                  switch (x.cmd) {
                    case '=':
                      ((A = 2 * x.idx), (C = 2 * x.idx1));
                      var D = _[A],
                        L = _[A + 1],
                        I = b[C],
                        O = b[C + 1];
                      ((isNaN(D) || isNaN(L)) && ((D = I), (L = O)),
                        l.push(D, L),
                        h.push(I, O),
                        u.push(o[A], o[A + 1]),
                        p.push(n[C], n[C + 1]),
                        v.push(e.getRawIndex(x.idx1)));
                      break;
                    case '+':
                      var P = x.idx,
                        N = m.dataDimsForPoint,
                        M = i.dataToPoint([e.get(N[0], P), e.get(N[1], P)]);
                      ((C = 2 * P), l.push(M[0], M[1]), h.push(b[C], b[C + 1]));
                      var k = f(m, i, e, P);
                      (u.push(k[0], k[1]), p.push(n[C], n[C + 1]), v.push(e.getRawIndex(P)));
                      break;
                    case '-':
                      w = !1;
                  }
                  w && (d.push(x), y.push(y.length));
                }
                y.sort(function (t, e) {
                  return v[t] - v[e];
                });
                var T = l.length,
                  E = (0, g.J)(T),
                  z = (0, g.J)(T),
                  V = (0, g.J)(T),
                  F = (0, g.J)(T),
                  R = [];
                for (S = 0; S < y.length; S++) {
                  var G = y[S],
                    H = 2 * S,
                    B = 2 * G;
                  ((E[H] = l[B]),
                    (E[H + 1] = l[B + 1]),
                    (z[H] = h[B]),
                    (z[H + 1] = h[B + 1]),
                    (V[H] = u[B]),
                    (V[H + 1] = u[B + 1]),
                    (F[H] = p[B]),
                    (F[H + 1] = p[B + 1]),
                    (R[S] = d[G]));
                }
                return { current: E, next: z, stackedOnCurrent: V, stackedOnNext: F, status: R };
              })(this._data, t, this._stackedOnPoints, e, this._coordSys, 0, this._valueOrigin),
              p = u.current,
              d = u.stackedOnCurrent,
              y = u.next,
              m = u.stackedOnNext;
            if (
              (i &&
                ((d = T(u.stackedOnCurrent, u.current, o, i, r)),
                (p = T(u.current, null, o, i, r)),
                (m = T(u.stackedOnNext, u.next, o, i, r)),
                (y = T(u.next, null, o, i, r))),
              M(p, y) > 3e3 || (l && M(d, m) > 3e3))
            )
              return (
                s.stopAnimation(),
                s.setShape({ points: y }),
                void (l && (l.stopAnimation(), l.setShape({ points: y, stackedOnPoints: m })))
              );
            ((s.shape.__points = u.current), (s.shape.points = p));
            var _ = { shape: { points: y } };
            (u.current !== p && (_.shape.__points = u.next),
              s.stopAnimation(),
              v.oi(s, _, h),
              l &&
                (l.setShape({ points: p, stackedOnPoints: d }),
                l.stopAnimation(),
                v.oi(l, { shape: { stackedOnPoints: m } }, h),
                s.shape.points !== l.shape.points && (l.shape.points = s.shape.points)));
            for (var b = [], S = u.status, x = 0; x < S.length; x++)
              if ('=' === S[x].cmd) {
                var w = t.getItemGraphicEl(S[x].idx1);
                w && b.push({ el: w, ptIdx: x });
              }
            s.animators &&
              s.animators.length &&
              s.animators[0].during(function () {
                l && l.dirtyShape();
                for (var t = s.shape.__points, e = 0; e < b.length; e++) {
                  var o = b[e].el,
                    n = 2 * b[e].ptIdx;
                  ((o.x = t[n]), (o.y = t[n + 1]), o.markRedraw());
                }
              });
          }),
          (e.prototype.remove = function (t) {
            var e = this.group,
              o = this._data;
            (this._lineGroup.removeAll(),
              this._symbolDraw.remove(!0),
              o &&
                o.eachItemGraphicEl(function (t, n) {
                  t.__temp && (e.remove(t), o.setItemGraphicEl(n, null));
                }),
              (this._polyline =
                this._polygon =
                this._coordSys =
                this._points =
                this._stackedOnPoints =
                this._endLabel =
                this._data =
                  null));
          }),
          (e.type = 'line'),
          e
        );
      })(S.A);
      const G = R;
      var H = o(430682),
        B = o(937959);
      function U(t) {
        (t.registerChartView(G),
          t.registerSeriesModel(l),
          t.registerLayout((0, H.A)('line', !0)),
          t.registerVisual({
            seriesType: 'line',
            reset: function (t) {
              var e = t.getData(),
                o = t.getModel('lineStyle').getLineStyle();
              (o && !o.stroke && (o.stroke = e.getVisual('style').fill),
                e.setVisual('legendLineStyle', o));
            },
          }),
          t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, (0, B.A)('line')));
      }
    },
    553364: (t, e, o) => {
      o.d(e, { N: () => d, z: () => f });
      var n = o(15215),
        i = o(467065),
        a = o(368717),
        r = o(989259),
        s = Math.min,
        l = Math.max;
      function h(t, e) {
        return isNaN(t) || isNaN(e);
      }
      function u(t, e, o, n, i, a, r, u, p) {
        for (var d, c, f, g, y, v, m = o, _ = 0; _ < n; _++) {
          var b = e[2 * m],
            S = e[2 * m + 1];
          if (m >= i || m < 0) break;
          if (h(b, S)) {
            if (p) {
              m += a;
              continue;
            }
            break;
          }
          if (m === o) (t[a > 0 ? 'moveTo' : 'lineTo'](b, S), (f = b), (g = S));
          else {
            var x = b - d,
              w = S - c;
            if (x * x + w * w < 0.5) {
              m += a;
              continue;
            }
            if (r > 0) {
              for (var A = m + a, C = e[2 * A], D = e[2 * A + 1]; C === b && D === S && _ < n;)
                (_++,
                  (m += a),
                  (C = e[2 * (A += a)]),
                  (D = e[2 * A + 1]),
                  (x = (b = e[2 * m]) - d),
                  (w = (S = e[2 * m + 1]) - c));
              var L = _ + 1;
              if (p) for (; h(C, D) && L < n;) (L++, (C = e[2 * (A += a)]), (D = e[2 * A + 1]));
              var I = 0.5,
                O = 0,
                P = 0,
                N = void 0,
                M = void 0;
              if (L >= n || h(C, D)) ((y = b), (v = S));
              else {
                ((O = C - d), (P = D - c));
                var k = b - d,
                  T = C - b,
                  E = S - c,
                  z = D - S,
                  V = void 0,
                  F = void 0;
                if ('x' === u) {
                  var R = O > 0 ? 1 : -1;
                  ((y = b - R * (V = Math.abs(k)) * r),
                    (v = S),
                    (N = b + R * (F = Math.abs(T)) * r),
                    (M = S));
                } else if ('y' === u) {
                  var G = P > 0 ? 1 : -1;
                  ((y = b),
                    (v = S - G * (V = Math.abs(E)) * r),
                    (N = b),
                    (M = S + G * (F = Math.abs(z)) * r));
                } else
                  ((V = Math.sqrt(k * k + E * E)),
                    (y = b - O * r * (1 - (I = (F = Math.sqrt(T * T + z * z)) / (F + V)))),
                    (v = S - P * r * (1 - I)),
                    (M = S + P * r * I),
                    (N = s((N = b + O * r * I), l(C, b))),
                    (M = s(M, l(D, S))),
                    (N = l(N, s(C, b))),
                    (v = S - ((P = (M = l(M, s(D, S))) - S) * V) / F),
                    (y = s((y = b - ((O = N - b) * V) / F), l(d, b))),
                    (v = s(v, l(c, S))),
                    (N = b + ((O = b - (y = l(y, s(d, b)))) * F) / V),
                    (M = S + ((P = S - (v = l(v, s(c, S)))) * F) / V));
              }
              (t.bezierCurveTo(f, g, y, v, b, S), (f = N), (g = M));
            } else t.lineTo(b, S);
          }
          ((d = b), (c = S), (m += a));
        }
        return _;
      }
      var p = function () {
          ((this.smooth = 0), (this.smoothConstraint = !0));
        },
        d = (function (t) {
          function e(e) {
            var o = t.call(this, e) || this;
            return ((o.type = 'ec-polyline'), o);
          }
          return (
            (0, n.__extends)(e, t),
            (e.prototype.getDefaultStyle = function () {
              return { stroke: '#000', fill: null };
            }),
            (e.prototype.getDefaultShape = function () {
              return new p();
            }),
            (e.prototype.buildPath = function (t, e) {
              var o = e.points,
                n = 0,
                i = o.length / 2;
              if (e.connectNulls) {
                for (; i > 0 && h(o[2 * i - 2], o[2 * i - 1]); i--);
                for (; n < i && h(o[2 * n], o[2 * n + 1]); n++);
              }
              for (; n < i;)
                n += u(t, o, n, i, i, 1, e.smooth, e.smoothMonotone, e.connectNulls) + 1;
            }),
            (e.prototype.getPointOn = function (t, e) {
              this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
              for (
                var o, n, i = this.path.data, s = a.A.CMD, l = 'x' === e, h = [], u = 0;
                u < i.length;
              ) {
                var p = void 0,
                  d = void 0,
                  c = void 0,
                  f = void 0,
                  g = void 0,
                  y = void 0,
                  v = void 0;
                switch (i[u++]) {
                  case s.M:
                    ((o = i[u++]), (n = i[u++]));
                    break;
                  case s.L:
                    if (
                      ((p = i[u++]),
                      (d = i[u++]),
                      (v = l ? (t - o) / (p - o) : (t - n) / (d - n)) <= 1 && v >= 0)
                    ) {
                      var m = l ? (d - n) * v + n : (p - o) * v + o;
                      return l ? [t, m] : [m, t];
                    }
                    ((o = p), (n = d));
                    break;
                  case s.C:
                    ((p = i[u++]),
                      (d = i[u++]),
                      (c = i[u++]),
                      (f = i[u++]),
                      (g = i[u++]),
                      (y = i[u++]));
                    var _ = l ? (0, r._E)(o, p, c, g, t, h) : (0, r._E)(n, d, f, y, t, h);
                    if (_ > 0)
                      for (var b = 0; b < _; b++) {
                        var S = h[b];
                        if (S <= 1 && S >= 0)
                          return (
                            (m = l ? (0, r.Yb)(n, d, f, y, S) : (0, r.Yb)(o, p, c, g, S)),
                            l ? [t, m] : [m, t]
                          );
                      }
                    ((o = g), (n = y));
                }
              }
            }),
            e
          );
        })(i.Ay),
        c = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return ((0, n.__extends)(e, t), e);
        })(p),
        f = (function (t) {
          function e(e) {
            var o = t.call(this, e) || this;
            return ((o.type = 'ec-polygon'), o);
          }
          return (
            (0, n.__extends)(e, t),
            (e.prototype.getDefaultShape = function () {
              return new c();
            }),
            (e.prototype.buildPath = function (t, e) {
              var o = e.points,
                n = e.stackedOnPoints,
                i = 0,
                a = o.length / 2,
                r = e.smoothMonotone;
              if (e.connectNulls) {
                for (; a > 0 && h(o[2 * a - 2], o[2 * a - 1]); a--);
                for (; i < a && h(o[2 * i], o[2 * i + 1]); i++);
              }
              for (; i < a;) {
                var s = u(t, o, i, a, a, 1, e.smooth, r, e.connectNulls);
                (u(t, n, i + s - 1, s, a, -1, e.stackedOnSmooth, r, e.connectNulls),
                  (i += s + 1),
                  t.closePath());
              }
            }),
            e
          );
        })(i.Ay);
    },
    506325: (t, e, o) => {
      o.d(e, { a: () => w });
      var n = o(15215),
        i = o(564380),
        a = o(831331),
        r = o(532182),
        s = o(446448),
        l = o(713269),
        h = o(382681);
      const u = {
        seriesType: 'lines',
        plan: (0, o(687582).A)(),
        reset: function (t) {
          var e = t.coordinateSystem;
          if (e) {
            var o = t.get('polyline'),
              n = t.pipelineContext.large;
            return {
              progress: function (i, a) {
                var r = [];
                if (n) {
                  var s = void 0,
                    l = i.end - i.start;
                  if (o) {
                    for (var h = 0, u = i.start; u < i.end; u++) h += t.getLineCoordsCount(u);
                    s = new Float32Array(l + 2 * h);
                  } else s = new Float32Array(4 * l);
                  var p = 0,
                    d = [];
                  for (u = i.start; u < i.end; u++) {
                    var c = t.getLineCoords(u, r);
                    o && (s[p++] = c);
                    for (var f = 0; f < c; f++)
                      ((d = e.dataToPoint(r[f], !1, d)), (s[p++] = d[0]), (s[p++] = d[1]));
                  }
                  a.setLayout('linesPoints', s);
                } else
                  for (u = i.start; u < i.end; u++) {
                    var g = a.getItemModel(u),
                      y = ((c = t.getLineCoords(u, r)), []);
                    if (o) for (var v = 0; v < c; v++) y.push(e.dataToPoint(r[v]));
                    else {
                      ((y[0] = e.dataToPoint(r[0])), (y[1] = e.dataToPoint(r[1])));
                      var m = g.get(['lineStyle', 'curveness']);
                      +m &&
                        (y[2] = [
                          (y[0][0] + y[1][0]) / 2 - (y[0][1] - y[1][1]) * m,
                          (y[0][1] + y[1][1]) / 2 - (y[1][0] - y[0][0]) * m,
                        ]);
                    }
                    a.setItemLayout(u, y);
                  }
              },
            };
          }
        },
      };
      var p = o(195235);
      const d = (function (t) {
        function e() {
          var o = (null !== t && t.apply(this, arguments)) || this;
          return ((o.type = e.type), o);
        }
        return (
          (0, n.__extends)(e, t),
          (e.prototype.render = function (t, e, o) {
            var n = t.getData(),
              i = this._updateLineDraw(n, t),
              a = t.get('zlevel'),
              r = t.get(['effect', 'trailLength']),
              s = o.getZr(),
              l = 'svg' === s.painter.getType();
            (l || s.painter.getLayer(a).clear(!0),
              null == this._lastZlevel || l || s.configLayer(this._lastZlevel, { motionBlur: !1 }),
              this._showEffect(t) &&
                r > 0 &&
                (l ||
                  s.configLayer(a, {
                    motionBlur: !0,
                    lastFrameAlpha: Math.max(Math.min(r / 10 + 0.9, 1), 0),
                  })),
              i.updateData(n));
            var h = t.get('clip', !0) && (0, p.Ip)(t.coordinateSystem, !1, t);
            (h ? this.group.setClipPath(h) : this.group.removeClipPath(),
              (this._lastZlevel = a),
              (this._finished = !0));
          }),
          (e.prototype.incrementalPrepareRender = function (t, e, o) {
            var n = t.getData();
            (this._updateLineDraw(n, t).incrementalPrepareUpdate(n),
              this._clearLayer(o),
              (this._finished = !1));
          }),
          (e.prototype.incrementalRender = function (t, e, o) {
            (this._lineDraw.incrementalUpdate(t, e.getData()),
              (this._finished = t.end === e.getData().count()));
          }),
          (e.prototype.eachRendered = function (t) {
            this._lineDraw && this._lineDraw.eachRendered(t);
          }),
          (e.prototype.updateTransform = function (t, e, o) {
            var n = t.getData(),
              i = t.pipelineContext;
            if (!this._finished || i.large || i.progressiveRender) return { update: !0 };
            var a = u.reset(t, e, o);
            (a.progress && a.progress({ start: 0, end: n.count(), count: n.count() }, n),
              this._lineDraw.updateLayout(),
              this._clearLayer(o));
          }),
          (e.prototype._updateLineDraw = function (t, e) {
            var o = this._lineDraw,
              n = this._showEffect(e),
              u = !!e.get('polyline'),
              p = e.pipelineContext.large;
            return (
              (o && n === this._hasEffet && u === this._isPolyline && p === this._isLargeDraw) ||
                (o && o.remove(),
                (o = this._lineDraw = p ? new h.A() : new i.A(u ? (n ? l.A : s.A) : n ? a.A : r.A)),
                (this._hasEffet = n),
                (this._isPolyline = u),
                (this._isLargeDraw = p)),
              this.group.add(o.group),
              o
            );
          }),
          (e.prototype._showEffect = function (t) {
            return !!t.get(['effect', 'show']);
          }),
          (e.prototype._clearLayer = function (t) {
            var e = t.getZr();
            'svg' === e.painter.getType() ||
              null == this._lastZlevel ||
              e.painter.getLayer(this._lastZlevel).clear(!0);
          }),
          (e.prototype.remove = function (t, e) {
            (this._lineDraw && this._lineDraw.remove(),
              (this._lineDraw = null),
              this._clearLayer(e));
          }),
          (e.prototype.dispose = function (t, e) {
            this.remove(t, e);
          }),
          (e.type = 'lines'),
          e
        );
      })(o(106666).A);
      var c = o(347355),
        f = o(6006),
        g = o(498026),
        y = o(603961),
        v = 'undefined' == typeof Uint32Array ? Array : Uint32Array,
        m = 'undefined' == typeof Float64Array ? Array : Float64Array;
      function _(t) {
        var e = t.data;
        e &&
          e[0] &&
          e[0][0] &&
          e[0][0].coord &&
          (t.data = (0, g.map)(e, function (t) {
            var e = { coords: [t[0].coord, t[1].coord] };
            return (
              t[0].name && (e.fromName = t[0].name),
              t[1].name && (e.toName = t[1].name),
              (0, g.mergeAll)([e, t[0], t[1]])
            );
          }));
      }
      const b = (function (t) {
        function e() {
          var o = (null !== t && t.apply(this, arguments)) || this;
          return (
            (o.type = e.type),
            (o.visualStyleAccessPath = 'lineStyle'),
            (o.visualDrawType = 'stroke'),
            o
          );
        }
        return (
          (0, n.__extends)(e, t),
          (e.prototype.init = function (e) {
            ((e.data = e.data || []), _(e));
            var o = this._processFlatCoordsArray(e.data);
            ((this._flatCoords = o.flatCoords),
              (this._flatCoordsOffset = o.flatCoordsOffset),
              o.flatCoords && (e.data = new Float32Array(o.count)),
              t.prototype.init.apply(this, arguments));
          }),
          (e.prototype.mergeOption = function (e) {
            if ((_(e), e.data)) {
              var o = this._processFlatCoordsArray(e.data);
              ((this._flatCoords = o.flatCoords),
                (this._flatCoordsOffset = o.flatCoordsOffset),
                o.flatCoords && (e.data = new Float32Array(o.count)));
            }
            t.prototype.mergeOption.apply(this, arguments);
          }),
          (e.prototype.appendData = function (t) {
            var e = this._processFlatCoordsArray(t.data);
            (e.flatCoords &&
              (this._flatCoords
                ? ((this._flatCoords = (0, g.concatArray)(this._flatCoords, e.flatCoords)),
                  (this._flatCoordsOffset = (0, g.concatArray)(
                    this._flatCoordsOffset,
                    e.flatCoordsOffset,
                  )))
                : ((this._flatCoords = e.flatCoords),
                  (this._flatCoordsOffset = e.flatCoordsOffset)),
              (t.data = new Float32Array(e.count))),
              this.getRawData().appendData(t.data));
          }),
          (e.prototype._getCoordsFromItemModel = function (t) {
            var e = this.getData().getItemModel(t);
            return e.option instanceof Array ? e.option : e.getShallow('coords');
          }),
          (e.prototype.getLineCoordsCount = function (t) {
            return this._flatCoordsOffset
              ? this._flatCoordsOffset[2 * t + 1]
              : this._getCoordsFromItemModel(t).length;
          }),
          (e.prototype.getLineCoords = function (t, e) {
            if (this._flatCoordsOffset) {
              for (
                var o = this._flatCoordsOffset[2 * t], n = this._flatCoordsOffset[2 * t + 1], i = 0;
                i < n;
                i++
              )
                ((e[i] = e[i] || []),
                  (e[i][0] = this._flatCoords[o + 2 * i]),
                  (e[i][1] = this._flatCoords[o + 2 * i + 1]));
              return n;
            }
            var a = this._getCoordsFromItemModel(t);
            for (i = 0; i < a.length; i++)
              ((e[i] = e[i] || []), (e[i][0] = a[i][0]), (e[i][1] = a[i][1]));
            return a.length;
          }),
          (e.prototype._processFlatCoordsArray = function (t) {
            var e = 0;
            if ((this._flatCoords && (e = this._flatCoords.length), (0, g.isNumber)(t[0]))) {
              for (
                var o = t.length, n = new v(o), i = new m(o), a = 0, r = 0, s = 0, l = 0;
                l < o;
              ) {
                s++;
                var h = t[l++];
                ((n[r++] = a + e), (n[r++] = h));
                for (var u = 0; u < h; u++) {
                  var p = t[l++],
                    d = t[l++];
                  ((i[a++] = p), (i[a++] = d));
                }
              }
              return { flatCoordsOffset: new Uint32Array(n.buffer, 0, r), flatCoords: i, count: s };
            }
            return { flatCoordsOffset: null, flatCoords: null, count: t.length };
          }),
          (e.prototype.getInitialData = function (t, e) {
            var o = new f.A(['value'], this);
            return (
              (o.hasItemOption = !1),
              o.initData(t.data, [], function (t, e, n, i) {
                if (t instanceof Array) return NaN;
                o.hasItemOption = !0;
                var a = t.value;
                return null != a ? (a instanceof Array ? a[i] : a) : void 0;
              }),
              o
            );
          }),
          (e.prototype.formatTooltip = function (t, e, o) {
            var n = this.getData().getItemModel(t),
              i = n.get('name');
            if (i) return i;
            var a = n.get('fromName'),
              r = n.get('toName'),
              s = [];
            return (
              null != a && s.push(a),
              null != r && s.push(r),
              (0, y.Qx)('nameValue', { name: s.join(' > ') })
            );
          }),
          (e.prototype.preventIncremental = function () {
            return !!this.get(['effect', 'show']);
          }),
          (e.prototype.getProgressive = function () {
            return this.option.progressive ?? (this.option.large ? 1e4 : this.get('progressive'));
          }),
          (e.prototype.getProgressiveThreshold = function () {
            return (
              this.option.progressiveThreshold ??
              (this.option.large ? 2e4 : this.get('progressiveThreshold'))
            );
          }),
          (e.prototype.getZLevelKey = function () {
            var t = this.getModel('effect'),
              e = t.get('trailLength');
            return this.getData().count() > this.getProgressiveThreshold()
              ? this.id
              : t.get('show') && e > 0
                ? e + ''
                : '';
          }),
          (e.type = 'series.lines'),
          (e.dependencies = ['grid', 'polar', 'geo', 'calendar']),
          (e.defaultOption = {
            coordinateSystem: 'geo',
            z: 2,
            legendHoverLink: !0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: ['none', 'none'],
            symbolSize: [10, 10],
            geoIndex: 0,
            effect: {
              show: !1,
              period: 4,
              constantSpeed: 0,
              symbol: 'circle',
              symbolSize: 3,
              loop: !0,
              trailLength: 0.2,
            },
            large: !1,
            largeThreshold: 2e3,
            polyline: !1,
            clip: !0,
            label: { show: !1, position: 'end' },
            lineStyle: { opacity: 0.5 },
          }),
          e
        );
      })(c.A);
      function S(t) {
        return (t instanceof Array || (t = [t, t]), t);
      }
      const x = {
        seriesType: 'lines',
        reset: function (t) {
          var e = S(t.get('symbol')),
            o = S(t.get('symbolSize')),
            n = t.getData();
          return (
            n.setVisual('fromSymbol', e && e[0]),
            n.setVisual('toSymbol', e && e[1]),
            n.setVisual('fromSymbolSize', o && o[0]),
            n.setVisual('toSymbolSize', o && o[1]),
            {
              dataEach: n.hasItemOption
                ? function (t, e) {
                    var o = t.getItemModel(e),
                      n = S(o.getShallow('symbol', !0)),
                      i = S(o.getShallow('symbolSize', !0));
                    (n[0] && t.setItemVisual(e, 'fromSymbol', n[0]),
                      n[1] && t.setItemVisual(e, 'toSymbol', n[1]),
                      i[0] && t.setItemVisual(e, 'fromSymbolSize', i[0]),
                      i[1] && t.setItemVisual(e, 'toSymbolSize', i[1]));
                  }
                : null,
            }
          );
        },
      };
      function w(t) {
        (t.registerChartView(d),
          t.registerSeriesModel(b),
          t.registerLayout(u),
          t.registerVisual(x));
      }
    },
  },
]);
