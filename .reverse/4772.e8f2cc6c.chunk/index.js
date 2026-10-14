'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [4772],
  {
    104270: (e, t, a) => {
      a.d(t, { a: () => S });
      var n = a(903087),
        o = a(15215),
        i = a(131571),
        r = a(108027),
        l = a(106666),
        s = a(289632),
        d = a(34833);
      const u = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), a);
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.render = function (e, t, a, n) {
            if (!n || 'mapToggleSelect' !== n.type || n.from !== this.uid) {
              var o = this.group;
              if ((o.removeAll(), !e.getHostGeoModel())) {
                if (
                  (this._mapDraw &&
                    n &&
                    'geoRoam' === n.type &&
                    this._mapDraw.resetForLabelLayout(),
                  n && 'geoRoam' === n.type && 'series' === n.componentType && n.seriesId === e.id)
                )
                  (i = this._mapDraw) && o.add(i.group);
                else if (e.needsDrawMap) {
                  var i = this._mapDraw || new r.A(a);
                  (o.add(i.group), i.draw(e, t, a, this, n), (this._mapDraw = i));
                } else (this._mapDraw && this._mapDraw.remove(), (this._mapDraw = null));
                e.get('showLegendSymbol') &&
                  t.getComponent('legend') &&
                  this._renderSymbols(e, t, a);
              }
            }
          }),
          (t.prototype.remove = function () {
            (this._mapDraw && this._mapDraw.remove(),
              (this._mapDraw = null),
              this.group.removeAll());
          }),
          (t.prototype.dispose = function () {
            (this._mapDraw && this._mapDraw.remove(), (this._mapDraw = null));
          }),
          (t.prototype._renderSymbols = function (e, t, a) {
            var n = e.originalData,
              o = this.group;
            n.each(n.mapDimension('value'), function (t, a) {
              if (!isNaN(t)) {
                var r = n.getItemLayout(a);
                if (r && r.point) {
                  var l = r.point,
                    u = r.offset,
                    h = new i.A({
                      style: { fill: e.getData().getVisual('style').fill },
                      shape: { cx: l[0] + 9 * u, cy: l[1], r: 3 },
                      silent: !0,
                      z2: 8 + (u ? 0 : d.CA + 1),
                    });
                  if (!u) {
                    var c = e.mainSeries.getData(),
                      p = n.getName(a),
                      g = c.indexOfName(p),
                      y = n.getItemModel(a),
                      f = y.getModel('label'),
                      v = c.getItemGraphicEl(g);
                    ((0, s.qM)(h, (0, s.lx)(y), {
                      labelFetcher: {
                        getFormattedLabel: function (t, a) {
                          return e.getFormattedLabel(g, a);
                        },
                      },
                      defaultText: p,
                    }),
                      (h.disableLabelAnimation = !0),
                      f.get('position') || h.setTextConfig({ position: 'bottom' }),
                      (v.onHoverStateChange = function (e) {
                        (0, d.Pk)(h, e);
                      }));
                  }
                  o.add(h);
                }
              }
            });
          }),
          (t.type = 'map'),
          t
        );
      })(l.A);
      var h = a(498026),
        c = a(572731),
        p = a(347355),
        g = a(676311),
        y = a(823071),
        f = a(603961),
        v = a(62103);
      const m = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return (
            (a.type = t.type),
            (a.needsDrawMap = !1),
            (a.seriesGroup = []),
            (a.getTooltipPosition = function (e) {
              if (null != e) {
                var t = this.getData().getName(e),
                  a = this.coordinateSystem,
                  n = a.getRegion(t);
                return n && a.dataToPoint(n.getCenter());
              }
            }),
            a
          );
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.getInitialData = function (e) {
            for (
              var t = (0, c.A)(this, {
                  coordDimensions: ['value'],
                  encodeDefaulter: h.curry(y.ln, this),
                }),
                a = h.createHashMap(),
                n = [],
                o = 0,
                i = t.count();
              o < i;
              o++
            ) {
              var r = t.getName(o);
              a.set(r, o);
            }
            var l = g.A.load(this.getMapType(), this.option.nameMap, this.option.nameProperty);
            return (
              h.each(l.regions, function (e) {
                var o,
                  i = e.name,
                  r = a.get(i),
                  l = e.properties && e.properties.echartsStyle;
                (null == r ? ((o = { name: i }), n.push(o)) : (o = t.getRawDataItem(r)),
                  l && h.merge(o, l));
              }),
              t.appendData(n),
              t
            );
          }),
          (t.prototype.getHostGeoModel = function () {
            var e = this.option.geoIndex;
            return null != e ? this.ecModel.getComponent('geo', e) : null;
          }),
          (t.prototype.getMapType = function () {
            return (this.getHostGeoModel() || this).option.map;
          }),
          (t.prototype.getRawValue = function (e) {
            var t = this.getData();
            return t.get(t.mapDimension('value'), e);
          }),
          (t.prototype.getRegionModel = function (e) {
            var t = this.getData();
            return t.getItemModel(t.indexOfName(e));
          }),
          (t.prototype.formatTooltip = function (e, t, a) {
            for (
              var n = this.getData(),
                o = this.getRawValue(e),
                i = n.getName(e),
                r = this.seriesGroup,
                l = [],
                s = 0;
              s < r.length;
              s++
            ) {
              var d = r[s].originalData.indexOfName(i),
                u = n.mapDimension('value');
              isNaN(r[s].originalData.get(u, d)) || l.push(r[s].name);
            }
            return (0, f.Qx)('section', {
              header: l.join(', '),
              noHeader: !l.length,
              blocks: [(0, f.Qx)('nameValue', { name: i, value: o })],
            });
          }),
          (t.prototype.setZoom = function (e) {
            this.option.zoom = e;
          }),
          (t.prototype.setCenter = function (e) {
            this.option.center = e;
          }),
          (t.prototype.getLegendIcon = function (e) {
            var t = e.icon || 'roundRect',
              a = (0, v.v5)(t, 0, 0, e.itemWidth, e.itemHeight, e.itemStyle.fill);
            return (
              a.setStyle(e.itemStyle),
              (a.style.stroke = 'none'),
              t.indexOf('empty') > -1 &&
                ((a.style.stroke = a.style.fill), (a.style.fill = '#fff'), (a.style.lineWidth = 2)),
              a
            );
          }),
          (t.type = 'series.map'),
          (t.dependencies = ['geo']),
          (t.layoutMode = 'box'),
          (t.defaultOption = {
            z: 2,
            coordinateSystem: 'geo',
            map: '',
            left: 'center',
            top: 'center',
            aspectScale: null,
            showLegendSymbol: !0,
            boundingCoords: null,
            center: null,
            zoom: 1,
            scaleLimit: null,
            selectedMode: !0,
            label: { show: !1, color: '#000' },
            itemStyle: { borderWidth: 0.5, borderColor: '#444', areaColor: '#eee' },
            emphasis: {
              label: { show: !0, color: 'rgb(100,0,0)' },
              itemStyle: { areaColor: 'rgba(255,215,0,0.8)' },
            },
            select: {
              label: { show: !0, color: 'rgb(100,0,0)' },
              itemStyle: { color: 'rgba(255,215,0,0.8)' },
            },
            nameProperty: 'name',
          }),
          t
        );
      })(p.A);
      function x(e) {
        var t = {};
        (e.eachSeriesByType('map', function (e) {
          var a = e.getHostGeoModel(),
            n = a ? 'o' + a.id : 'i' + e.getMapType();
          (t[n] = t[n] || []).push(e);
        }),
          h.each(t, function (e, t) {
            for (
              var a,
                n,
                o,
                i =
                  ((a = h.map(e, function (e) {
                    return e.getData();
                  })),
                  (n = e[0].get('mapValueCalculation')),
                  (o = {}),
                  h.each(a, function (e) {
                    e.each(e.mapDimension('value'), function (t, a) {
                      var n = 'ec-' + e.getName(a);
                      ((o[n] = o[n] || []), isNaN(t) || o[n].push(t));
                    });
                  }),
                  a[0].map(a[0].mapDimension('value'), function (e, t) {
                    for (
                      var i = 'ec-' + a[0].getName(t),
                        r = 0,
                        l = 1 / 0,
                        s = -1 / 0,
                        d = o[i].length,
                        u = 0;
                      u < d;
                      u++
                    )
                      ((l = Math.min(l, o[i][u])), (s = Math.max(s, o[i][u])), (r += o[i][u]));
                    return 0 === d
                      ? NaN
                      : 'min' === n
                        ? l
                        : 'max' === n
                          ? s
                          : 'average' === n
                            ? r / d
                            : r;
                  })),
                r = 0;
              r < e.length;
              r++
            )
              e[r].originalData = e[r].getData();
            for (r = 0; r < e.length; r++)
              ((e[r].seriesGroup = e),
                (e[r].needsDrawMap = 0 === r && !e[r].getHostGeoModel()),
                e[r].setData(i.cloneShallow()),
                (e[r].mainSeries = e[0]));
          }));
      }
      function w(e) {
        var t = {};
        e.eachSeriesByType('map', function (a) {
          var n = a.getMapType();
          if (!a.getHostGeoModel() && !t[n]) {
            var o = {};
            h.each(a.seriesGroup, function (t) {
              var a = t.coordinateSystem,
                n = t.originalData;
              t.get('showLegendSymbol') &&
                e.getComponent('legend') &&
                n.each(n.mapDimension('value'), function (e, t) {
                  var i = n.getName(t),
                    r = a.getRegion(i);
                  if (r && !isNaN(e)) {
                    var l = o[i] || 0,
                      s = a.dataToPoint(r.getCenter());
                    ((o[i] = l + 1), n.setItemLayout(t, { point: s, offset: l }));
                  }
                });
            });
            var i = a.getData();
            (i.each(function (e) {
              var t = i.getName(e),
                a = i.getItemLayout(e) || {};
              ((a.showLabel = !o[t]), i.setItemLayout(e, a));
            }),
              (t[n] = !0));
          }
        });
      }
      var b = a(716884),
        I = a(300363);
      function S(e) {
        ((0, n.Y)(I.a),
          e.registerChartView(u),
          e.registerSeriesModel(m),
          e.registerLayout(w),
          e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, x),
          (0, b.I)('map', e.registerAction));
      }
    },
    431966: (e, t, a) => {
      a.d(t, { a: () => _ });
      var n = a(903087),
        o = a(15215),
        i = a(843870),
        r = a(683257),
        l = a(830010),
        s = a(39195),
        d = a(34833),
        u = a(106666),
        h = a(624326),
        c = a(498026);
      function p(e, t, a, n) {
        for (var o = [], i = 0; i < a.length; i++) {
          var r = a[i],
            l = e.get(e.mapDimension(r), t);
          v(l, n.getAxis(r).type) || o.push(n.dataToPoint(l, r));
        }
        return o;
      }
      function g(e, t, a, n, o) {
        var i = p(e, a, n, o),
          r = new s.A({ shape: { points: i }, z2: 10 });
        return (t.add(r), e.setItemGraphicEl(a, r), r);
      }
      function y(e) {
        var t = e.get('smooth', !0);
        return (
          !0 === t && (t = 0.3),
          (t = (0, h.Sm)(t)),
          (0, c.eqNaN)(t) && (t = 0),
          { smooth: t }
        );
      }
      function f(e, t, a, n) {
        (e.useStyle(t.getItemVisual(a, 'style')),
          (e.style.fill = null),
          e.setShape('smooth', n.smooth));
        var o = t.getItemModel(a),
          i = o.getModel('emphasis');
        ((0, d.Mx)(e, o, 'lineStyle'),
          (0, d.Lm)(e, i.get('focus'), i.get('blurScope'), i.get('disabled')));
      }
      function v(e, t) {
        return 'category' === t ? null == e : null == e || isNaN(e);
      }
      const m = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), (a._dataGroup = new i.A()), (a._initialized = !1), a);
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.init = function () {
            this.group.add(this._dataGroup);
          }),
          (t.prototype.render = function (e, t, a, n) {
            this._progressiveEls = null;
            var o = this._dataGroup,
              i = e.getData(),
              s = this._data,
              d = e.coordinateSystem,
              u = d.dimensions,
              h = y(e);
            if (
              (i
                .diff(s)
                .add(function (e) {
                  f(g(i, o, e, u, d), i, e, h);
                })
                .update(function (t, a) {
                  var n = s.getItemGraphicEl(a),
                    o = p(i, t, u, d);
                  (i.setItemGraphicEl(t, n),
                    r.oi(n, { shape: { points: o } }, e, t),
                    (0, r.ap)(n),
                    f(n, i, t, h));
                })
                .remove(function (e) {
                  var t = s.getItemGraphicEl(e);
                  o.remove(t);
                })
                .execute(),
              !this._initialized)
            ) {
              this._initialized = !0;
              var c = (function (e, t) {
                var a = e.model,
                  n = e.getRect(),
                  i = new l.A({ shape: { x: n.x, y: n.y, width: n.width, height: n.height } }),
                  s = 'horizontal' === a.get('layout') ? 'width' : 'height';
                return (
                  i.setShape(s, 0),
                  r.LW(i, { shape: { width: n.width, height: n.height } }, t, function () {
                    setTimeout(function () {
                      o.removeClipPath();
                    });
                  }),
                  i
                );
              })(d, e);
              o.setClipPath(c);
            }
            this._data = i;
          }),
          (t.prototype.incrementalPrepareRender = function (e, t, a) {
            ((this._initialized = !0), (this._data = null), this._dataGroup.removeAll());
          }),
          (t.prototype.incrementalRender = function (e, t, a) {
            for (
              var n = t.getData(),
                o = t.coordinateSystem,
                i = o.dimensions,
                r = y(t),
                l = (this._progressiveEls = []),
                s = e.start;
              s < e.end;
              s++
            ) {
              var d = g(n, this._dataGroup, s, i, o);
              ((d.incremental = !0), f(d, n, s, r), l.push(d));
            }
          }),
          (t.prototype.remove = function () {
            (this._dataGroup && this._dataGroup.removeAll(), (this._data = null));
          }),
          (t.type = 'parallel'),
          t
        );
      })(u.A);
      var x = a(347355),
        w = a(913637);
      function b(e) {
        var t = e.ecModel.getComponent('parallel', e.get('parallelIndex'));
        if (t) {
          var a = {};
          return (
            (0, c.each)(t.dimensions, function (e) {
              var t = +e.replace('dim', '');
              a[e] = t;
            }),
            a
          );
        }
      }
      const I = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return (
            (a.type = t.type),
            (a.visualStyleAccessPath = 'lineStyle'),
            (a.visualDrawType = 'stroke'),
            a
          );
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.getInitialData = function (e, t) {
            return (0, w.A)(null, this, { useEncodeDefaulter: (0, c.bind)(b, null, this) });
          }),
          (t.prototype.getRawIndicesByActiveState = function (e) {
            var t = this.coordinateSystem,
              a = this.getData(),
              n = [];
            return (
              t.eachActiveState(a, function (t, o) {
                e === t && n.push(a.getRawIndex(o));
              }),
              n
            );
          }),
          (t.type = 'series.parallel'),
          (t.dependencies = ['parallel']),
          (t.defaultOption = {
            z: 2,
            coordinateSystem: 'parallel',
            parallelIndex: 0,
            label: { show: !1 },
            inactiveOpacity: 0.05,
            activeOpacity: 1,
            lineStyle: { width: 1, opacity: 0.45, type: 'solid' },
            emphasis: { label: { show: !1 } },
            progressive: 500,
            smooth: !1,
            animationEasing: 'linear',
          }),
          t
        );
      })(x.A);
      var S = ['lineStyle', 'opacity'];
      const A = {
        seriesType: 'parallel',
        reset: function (e, t) {
          var a = e.coordinateSystem,
            n = {
              normal: e.get(['lineStyle', 'opacity']),
              active: e.get('activeOpacity'),
              inactive: e.get('inactiveOpacity'),
            };
          return {
            progress: function (e, t) {
              a.eachActiveState(
                t,
                function (e, a) {
                  var o = n[e];
                  if ('normal' === e && t.hasItemOption) {
                    var i = t.getItemModel(a).get(S, !0);
                    null != i && (o = i);
                  }
                  t.ensureUniqueItemVisual(a, 'style').opacity = o;
                },
                e.start,
                e.end,
              );
            },
          };
        },
      };
      var L = a(146105);
      function _(e) {
        ((0, n.Y)(L.a),
          e.registerChartView(m),
          e.registerSeriesModel(I),
          e.registerVisual(e.PRIORITY.VISUAL.BRUSH, A));
      }
    },
    774625: (e, t, a) => {
      a.d(t, { a: () => W });
      var n = a(716884),
        o = a(624326),
        i = a(834253),
        r = a(498026),
        l = a(368717),
        s = a(48170),
        d = 2 * Math.PI,
        u = Math.PI / 180;
      function h(e, t) {
        return i.dV(e.getBoxLayoutParams(), { width: t.getWidth(), height: t.getHeight() });
      }
      function c(e, t) {
        var a = h(e, t),
          n = e.get('center'),
          i = e.get('radius');
        r.isArray(i) || (i = [0, i]);
        var l,
          s,
          d = (0, o.lo)(a.width, t.getWidth()),
          u = (0, o.lo)(a.height, t.getHeight()),
          c = Math.min(d, u),
          p = (0, o.lo)(i[0], c / 2),
          g = (0, o.lo)(i[1], c / 2),
          y = e.coordinateSystem;
        if (y) {
          var f = y.dataToPoint(n);
          ((l = f[0] || 0), (s = f[1] || 0));
        } else
          (r.isArray(n) || (n = [n, n]),
            (l = (0, o.lo)(n[0], d) + a.x),
            (s = (0, o.lo)(n[1], u) + a.y));
        return { cx: l, cy: s, r0: p, r: g };
      }
      function p(e, t, a) {
        t.eachSeriesByType(e, function (e) {
          var t = e.getData(),
            n = t.mapDimension('value'),
            i = h(e, a),
            r = c(e, a),
            s = r.cx,
            p = r.cy,
            y = r.r,
            f = r.r0,
            v = -e.get('startAngle') * u,
            m = e.get('endAngle'),
            x = e.get('padAngle') * u;
          m = 'auto' === m ? v - d : -m * u;
          var w = e.get('minAngle') * u + x,
            b = 0;
          t.each(n, function (e) {
            !isNaN(e) && b++;
          });
          var I = t.getSum(n),
            S = (Math.PI / (I || b)) * 2,
            A = e.get('clockwise'),
            L = e.get('roseType'),
            _ = e.get('stillShowZeroSum'),
            M = t.getDataExtent(n);
          M[0] = 0;
          var D = A ? 1 : -1,
            N = [v, m],
            T = (D * x) / 2;
          ((0, l.q)(N, !A), (v = N[0]), (m = N[1]));
          var C = g(e);
          ((C.startAngle = v), (C.endAngle = m), (C.clockwise = A));
          var V = Math.abs(m - v),
            R = V,
            P = 0,
            E = v;
          if (
            (t.setLayout({ viewRect: i, r: y }),
            t.each(n, function (e, a) {
              var n;
              if (isNaN(e))
                t.setItemLayout(a, {
                  angle: NaN,
                  startAngle: NaN,
                  endAngle: NaN,
                  clockwise: A,
                  cx: s,
                  cy: p,
                  r0: f,
                  r: L ? NaN : y,
                });
              else {
                (n = 'area' !== L ? (0 === I && _ ? S : e * S) : V / b) < w
                  ? ((n = w), (R -= w))
                  : (P += e);
                var i = E + D * n,
                  r = 0,
                  l = 0;
                (x > n ? (l = r = E + (D * n) / 2) : ((r = E + T), (l = i - T)),
                  t.setItemLayout(a, {
                    angle: n,
                    startAngle: r,
                    endAngle: l,
                    clockwise: A,
                    cx: s,
                    cy: p,
                    r0: f,
                    r: L ? (0, o.Cb)(e, M, [f, y]) : y,
                  }),
                  (E = i));
              }
            }),
            R < d && b)
          )
            if (R <= 0.001) {
              var k = V / b;
              t.each(n, function (e, a) {
                if (!isNaN(e)) {
                  var n = t.getItemLayout(a);
                  n.angle = k;
                  var o = 0,
                    i = 0;
                  (k < x
                    ? (i = o = v + D * (a + 0.5) * k)
                    : ((o = v + D * a * k + T), (i = v + D * (a + 1) * k - T)),
                    (n.startAngle = o),
                    (n.endAngle = i));
                }
              });
            } else
              ((S = R / P),
                (E = v),
                t.each(n, function (e, a) {
                  if (!isNaN(e)) {
                    var n = t.getItemLayout(a),
                      o = n.angle === w ? w : e * S,
                      i = 0,
                      r = 0;
                    (o < x ? (r = i = E + (D * o) / 2) : ((i = E + T), (r = E + D * o - T)),
                      (n.startAngle = i),
                      (n.endAngle = r),
                      (E += D * o));
                  }
                }));
        });
      }
      var g = (0, s.$r)(),
        y = a(878587),
        f = a(15215),
        v = a(132322),
        m = a(683257),
        x = a(39195),
        w = a(725014),
        b = a(34833),
        I = a(106666),
        S = a(726346),
        A = a(392621),
        L = a(77175),
        _ = Math.PI / 180;
      function M(e, t, a, n, o, i, r, l, s, d) {
        if (!(e.length < 2)) {
          for (var u = e.length, h = 0; h < u; h++)
            if ('outer' === e[h].position && 'labelLine' === e[h].labelAlignTo) {
              var c = e[h].label.x - d;
              ((e[h].linePoints[1][0] += c), (e[h].label.x = d));
            }
          (0, L.Xe)(e, s, s + r) &&
            (function (e) {
              for (
                var i = { list: [], maxY: 0 }, r = { list: [], maxY: 0 }, l = 0;
                l < e.length;
                l++
              )
                if ('none' === e[l].labelAlignTo) {
                  var s = e[l],
                    d = s.label.y > a ? r : i,
                    u = Math.abs(s.label.y - a);
                  if (u >= d.maxY) {
                    var h = s.label.x - t - s.len2 * o,
                      c = n + s.len,
                      g = Math.abs(h) < c ? Math.sqrt((u * u) / (1 - (h * h) / c / c)) : c;
                    ((d.rB = g), (d.maxY = u));
                  }
                  d.list.push(s);
                }
              (p(i), p(r));
            })(e);
        }
        function p(e) {
          for (var i = e.rB, r = i * i, l = 0; l < e.list.length; l++) {
            var s = e.list[l],
              d = Math.abs(s.label.y - a),
              u = n + s.len,
              h = u * u,
              c = Math.sqrt(Math.abs((1 - (d * d) / r) * h)),
              p = t + (c + s.len2) * o,
              g = p - s.label.x;
            (D(s, s.targetTextWidth - g * o, !0), (s.label.x = p));
          }
        }
      }
      function D(e, t, a) {
        if ((void 0 === a && (a = !1), null == e.labelStyleWidth)) {
          var n = e.label,
            o = n.style,
            i = e.rect,
            r = o.backgroundColor,
            l = o.padding,
            s = l ? l[1] + l[3] : 0,
            d = o.overflow,
            u = i.width + (r ? 0 : s);
          if (t < u || a) {
            var h = i.height;
            if (d && d.match('break')) {
              (n.setStyle('backgroundColor', null), n.setStyle('width', t - s));
              var c = n.getBoundingRect();
              (n.setStyle('width', Math.ceil(c.width)), n.setStyle('backgroundColor', r));
            } else {
              var p = t - s,
                g = t < u ? p : a ? (p > e.unconstrainedWidth ? null : p) : null;
              n.setStyle('width', g);
            }
            var y = n.getBoundingRect();
            i.width = y.width;
            var f = (n.style.margin || 0) + 2.1;
            ((i.height = y.height + f), (i.y -= (i.height - h) / 2));
          }
        }
      }
      function N(e) {
        return 'center' === e.position;
      }
      var T = a(289632),
        C = a(979446),
        V = (function (e) {
          function t(t, a, n) {
            var o = e.call(this) || this;
            o.z2 = 2;
            var i = new v.Ay();
            return (o.setTextContent(i), o.updateData(t, a, n, !0), o);
          }
          return (
            (0, f.__extends)(t, e),
            (t.prototype.updateData = function (e, t, a, n) {
              var o = this,
                i = e.hostModel,
                l = e.getItemModel(t),
                s = l.getModel('emphasis'),
                d = e.getItemLayout(t),
                u = (0, r.extend)((0, C.i)(l.getModel('itemStyle'), d, !0), d);
              if (isNaN(u.startAngle)) o.setShape(u);
              else {
                if (n) {
                  o.setShape(u);
                  var h = i.getShallow('animationType');
                  i.ecModel.ssr
                    ? (m.LW(o, { scaleX: 0, scaleY: 0 }, i, { dataIndex: t, isFrom: !0 }),
                      (o.originX = u.cx),
                      (o.originY = u.cy))
                    : 'scale' === h
                      ? ((o.shape.r = d.r0), m.LW(o, { shape: { r: d.r } }, i, t))
                      : null != a
                        ? (o.setShape({ startAngle: a, endAngle: a }),
                          m.LW(
                            o,
                            { shape: { startAngle: d.startAngle, endAngle: d.endAngle } },
                            i,
                            t,
                          ))
                        : ((o.shape.endAngle = d.startAngle),
                          m.oi(o, { shape: { endAngle: d.endAngle } }, i, t));
                } else ((0, m.ap)(o), m.oi(o, { shape: u }, i, t));
                (o.useStyle(e.getItemVisual(t, 'style')), (0, b.Mx)(o, l));
                var c = (d.startAngle + d.endAngle) / 2,
                  p = i.get('selectedOffset'),
                  g = Math.cos(c) * p,
                  y = Math.sin(c) * p,
                  f = l.getShallow('cursor');
                (f && o.attr('cursor', f),
                  this._updateLabel(i, e, t),
                  (o.ensureState('emphasis').shape = (0, r.extend)(
                    { r: d.r + ((s.get('scale') && s.get('scaleSize')) || 0) },
                    (0, C.i)(s.getModel('itemStyle'), d),
                  )),
                  (0, r.extend)(o.ensureState('select'), {
                    x: g,
                    y,
                    shape: (0, C.i)(l.getModel(['select', 'itemStyle']), d),
                  }),
                  (0, r.extend)(o.ensureState('blur'), {
                    shape: (0, C.i)(l.getModel(['blur', 'itemStyle']), d),
                  }));
                var v = o.getTextGuideLine(),
                  x = o.getTextContent();
                (v && (0, r.extend)(v.ensureState('select'), { x: g, y }),
                  (0, r.extend)(x.ensureState('select'), { x: g, y }),
                  (0, b.Lm)(this, s.get('focus'), s.get('blurScope'), s.get('disabled')));
              }
            }),
            (t.prototype._updateLabel = function (e, t, a) {
              var n = this,
                o = t.getItemModel(a),
                i = o.getModel('labelLine'),
                l = t.getItemVisual(a, 'style'),
                s = l && l.fill,
                d = l && l.opacity;
              (0, T.qM)(n, (0, T.lx)(o), {
                labelFetcher: t.hostModel,
                labelDataIndex: a,
                inheritColor: s,
                defaultOpacity: d,
                defaultText: e.getFormattedLabel(a, 'normal') || t.getName(a),
              });
              var u = n.getTextContent();
              (n.setTextConfig({ position: null, rotation: null }), u.attr({ z2: 10 }));
              var h = e.get(['label', 'position']);
              if ('outside' !== h && 'outer' !== h) n.removeTextGuideLine();
              else {
                var c = this.getTextGuideLine();
                (c || ((c = new x.A()), this.setTextGuideLine(c)),
                  (0, A.eR)(this, (0, A.rv)(o), {
                    stroke: s,
                    opacity: (0, r.retrieve3)(i.get(['lineStyle', 'opacity']), d, 1),
                  }));
              }
            }),
            t
          );
        })(w.A);
      const R = (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          return ((t.ignoreLabelLineUpdate = !0), t);
        }
        return (
          (0, f.__extends)(t, e),
          (t.prototype.render = function (e, t, a, n) {
            var i,
              l = e.getData(),
              s = this._data,
              d = this.group;
            if (!s && l.count() > 0) {
              for (
                var u = l.getItemLayout(0), h = 1;
                isNaN(u && u.startAngle) && h < l.count();
                ++h
              )
                u = l.getItemLayout(h);
              u && (i = u.startAngle);
            }
            if (
              (this._emptyCircleSector && d.remove(this._emptyCircleSector),
              0 === l.count() && e.get('showEmptyCircle'))
            ) {
              var p = g(e),
                y = new w.A({ shape: (0, r.extend)(c(e, a), p) });
              (y.useStyle(e.getModel('emptyCircleStyle').getItemStyle()),
                (this._emptyCircleSector = y),
                d.add(y));
            }
            (l
              .diff(s)
              .add(function (e) {
                var t = new V(l, e, i);
                (l.setItemGraphicEl(e, t), d.add(t));
              })
              .update(function (e, t) {
                var a = s.getItemGraphicEl(t);
                (a.updateData(l, e, i), a.off('click'), d.add(a), l.setItemGraphicEl(e, a));
              })
              .remove(function (t) {
                var a = s.getItemGraphicEl(t);
                m.t5(a, e, t);
              })
              .execute(),
              (function (e) {
                var t,
                  a,
                  n = e.getData(),
                  i = [],
                  l = !1,
                  s = (e.get('minShowLabelAngle') || 0) * _,
                  d = n.getLayout('viewRect'),
                  u = n.getLayout('r'),
                  h = d.width,
                  c = d.x,
                  p = d.y,
                  g = d.height;
                function y(e) {
                  e.ignore = !0;
                }
                (n.each(function (e) {
                  var d = n.getItemGraphicEl(e),
                    p = d.shape,
                    g = d.getTextContent(),
                    f = d.getTextGuideLine(),
                    v = n.getItemModel(e),
                    m = v.getModel('label'),
                    x = m.get('position') || v.get(['emphasis', 'label', 'position']),
                    w = m.get('distanceToLabelLine'),
                    b = m.get('alignTo'),
                    I = (0, o.lo)(m.get('edgeDistance'), h),
                    A = m.get('bleedMargin'),
                    L = v.getModel('labelLine'),
                    _ = L.get('length');
                  _ = (0, o.lo)(_, h);
                  var M = L.get('length2');
                  if (((M = (0, o.lo)(M, h)), Math.abs(p.endAngle - p.startAngle) < s))
                    return (
                      (0, r.each)(g.states, y),
                      (g.ignore = !0),
                      void (f && ((0, r.each)(f.states, y), (f.ignore = !0)))
                    );
                  if (
                    (function (e) {
                      if (!e.ignore) return !0;
                      for (var t in e.states) if (!1 === e.states[t].ignore) return !0;
                      return !1;
                    })(g)
                  ) {
                    var D,
                      N,
                      T,
                      C,
                      V = (p.startAngle + p.endAngle) / 2,
                      R = Math.cos(V),
                      P = Math.sin(V);
                    ((t = p.cx), (a = p.cy));
                    var E = 'inside' === x || 'inner' === x;
                    if ('center' === x) ((D = p.cx), (N = p.cy), (C = 'center'));
                    else {
                      var k = (E ? ((p.r + p.r0) / 2) * R : p.r * R) + t,
                        G = (E ? ((p.r + p.r0) / 2) * P : p.r * P) + a;
                      if (((D = k + 3 * R), (N = G + 3 * P), !E)) {
                        var z = k + R * (_ + u - p.r),
                          B = G + P * (_ + u - p.r),
                          O = z + (R < 0 ? -1 : 1) * M;
                        ((D = 'edge' === b ? (R < 0 ? c + I : c + h - I) : O + (R < 0 ? -w : w)),
                          (N = B),
                          (T = [
                            [k, G],
                            [z, B],
                            [O, B],
                          ]));
                      }
                      C = E
                        ? 'center'
                        : 'edge' === b
                          ? R > 0
                            ? 'right'
                            : 'left'
                          : R > 0
                            ? 'left'
                            : 'right';
                    }
                    var W = Math.PI,
                      H = 0,
                      Y = m.get('rotate');
                    if ((0, r.isNumber)(Y)) H = Y * (W / 180);
                    else if ('center' === x) H = 0;
                    else if ('radial' === Y || !0 === Y) H = R < 0 ? -V + W : -V;
                    else if ('tangential' === Y && 'outside' !== x && 'outer' !== x) {
                      var X = Math.atan2(R, P);
                      (X < 0 && (X = 2 * W + X), P > 0 && (X = W + X), (H = X - W));
                    }
                    if (
                      ((l = !!H),
                      (g.x = D),
                      (g.y = N),
                      (g.rotation = H),
                      g.setStyle({ verticalAlign: 'middle' }),
                      E)
                    ) {
                      g.setStyle({ align: C });
                      var q = g.states.select;
                      q && ((q.x += g.x), (q.y += g.y));
                    } else {
                      var U = g.getBoundingRect().clone();
                      U.applyTransform(g.getComputedTransform());
                      var F = (g.style.margin || 0) + 2.1;
                      ((U.y -= F / 2),
                        (U.height += F),
                        i.push({
                          label: g,
                          labelLine: f,
                          position: x,
                          len: _,
                          len2: M,
                          minTurnAngle: L.get('minTurnAngle'),
                          maxSurfaceAngle: L.get('maxSurfaceAngle'),
                          surfaceNormal: new S.A(R, P),
                          linePoints: T,
                          textAlign: C,
                          labelDistance: w,
                          labelAlignTo: b,
                          edgeDistance: I,
                          bleedMargin: A,
                          rect: U,
                          unconstrainedWidth: U.width,
                          labelStyleWidth: g.style.width,
                        }));
                    }
                    d.setTextConfig({ inside: E });
                  }
                }),
                  !l &&
                    e.get('avoidLabelOverlap') &&
                    (function (e, t, a, n, o, i, r, l) {
                      for (
                        var s = [], d = [], u = Number.MAX_VALUE, h = -Number.MAX_VALUE, c = 0;
                        c < e.length;
                        c++
                      ) {
                        var p = e[c].label;
                        N(e[c]) ||
                          (p.x < t
                            ? ((u = Math.min(u, p.x)), s.push(e[c]))
                            : ((h = Math.max(h, p.x)), d.push(e[c])));
                      }
                      for (c = 0; c < e.length; c++)
                        if (!N((f = e[c])) && f.linePoints) {
                          if (null != f.labelStyleWidth) continue;
                          p = f.label;
                          var g,
                            y = f.linePoints;
                          ((g =
                            'edge' === f.labelAlignTo
                              ? p.x < t
                                ? y[2][0] - f.labelDistance - r - f.edgeDistance
                                : r + o - f.edgeDistance - y[2][0] - f.labelDistance
                              : 'labelLine' === f.labelAlignTo
                                ? p.x < t
                                  ? u - r - f.bleedMargin
                                  : r + o - h - f.bleedMargin
                                : p.x < t
                                  ? p.x - r - f.bleedMargin
                                  : r + o - p.x - f.bleedMargin),
                            (f.targetTextWidth = g),
                            D(f, g));
                        }
                      for (
                        M(d, t, a, n, 1, 0, i, 0, l, h), M(s, t, a, n, -1, 0, i, 0, l, u), c = 0;
                        c < e.length;
                        c++
                      ) {
                        var f;
                        if (!N((f = e[c])) && f.linePoints) {
                          ((p = f.label), (y = f.linePoints));
                          var v = 'edge' === f.labelAlignTo,
                            m = p.style.padding,
                            x = m ? m[1] + m[3] : 0,
                            w = p.style.backgroundColor ? 0 : x,
                            b = f.rect.width + w,
                            I = y[1][0] - y[2][0];
                          (v
                            ? p.x < t
                              ? (y[2][0] = r + f.edgeDistance + b + f.labelDistance)
                              : (y[2][0] = r + o - f.edgeDistance - b - f.labelDistance)
                            : (p.x < t
                                ? (y[2][0] = p.x + f.labelDistance)
                                : (y[2][0] = p.x - f.labelDistance),
                              (y[1][0] = y[2][0] + I)),
                            (y[1][1] = y[2][1] = p.y));
                        }
                      }
                    })(i, t, a, u, h, g, c, p));
                for (var f = 0; f < i.length; f++) {
                  var v = i[f],
                    m = v.label,
                    x = v.labelLine,
                    w = isNaN(m.x) || isNaN(m.y);
                  if (m) {
                    (m.setStyle({ align: v.textAlign }),
                      w && ((0, r.each)(m.states, y), (m.ignore = !0)));
                    var b = m.states.select;
                    b && ((b.x += m.x), (b.y += m.y));
                  }
                  if (x) {
                    var I = v.linePoints;
                    w || !I
                      ? ((0, r.each)(x.states, y), (x.ignore = !0))
                      : ((0, A.YI)(I, v.minTurnAngle),
                        (0, A.QK)(I, v.surfaceNormal, v.maxSurfaceAngle),
                        x.setShape({ points: I }),
                        (m.__hostTarget.textGuideLineConfig = {
                          anchor: new S.A(I[0][0], I[0][1]),
                        }));
                  }
                }
              })(e),
              'expansion' !== e.get('animationTypeUpdate') && (this._data = l));
          }),
          (t.prototype.dispose = function () {}),
          (t.prototype.containPoint = function (e, t) {
            var a = t.getData().getItemLayout(0);
            if (a) {
              var n = e[0] - a.cx,
                o = e[1] - a.cy,
                i = Math.sqrt(n * n + o * o);
              return i <= a.r && i >= a.r0;
            }
          }),
          (t.type = 'pie'),
          t
        );
      })(I.A);
      var P = a(572731),
        E = a(823071),
        k = a(958239),
        G = a(347355),
        z = s.$r();
      const B = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          (0, f.__extends)(t, e),
          (t.prototype.init = function (t) {
            (e.prototype.init.apply(this, arguments),
              (this.legendVisualProvider = new k.A(
                r.bind(this.getData, this),
                r.bind(this.getRawData, this),
              )),
              this._defaultLabelLine(t));
          }),
          (t.prototype.mergeOption = function () {
            e.prototype.mergeOption.apply(this, arguments);
          }),
          (t.prototype.getInitialData = function () {
            return (0, P.A)(this, {
              coordDimensions: ['value'],
              encodeDefaulter: r.curry(E.ln, this),
            });
          }),
          (t.prototype.getDataParams = function (t) {
            var a = this.getData(),
              n = z(a),
              i = n.seats;
            if (!i) {
              var r = [];
              (a.each(a.mapDimension('value'), function (e) {
                r.push(e);
              }),
                (i = n.seats = (0, o.kM)(r, a.hostModel.get('percentPrecision'))));
            }
            var l = e.prototype.getDataParams.call(this, t);
            return ((l.percent = i[t] || 0), l.$vars.push('percent'), l);
          }),
          (t.prototype._defaultLabelLine = function (e) {
            s.M5(e, 'labelLine', ['show']);
            var t = e.labelLine,
              a = e.emphasis.labelLine;
            ((t.show = t.show && e.label.show), (a.show = a.show && e.emphasis.label.show));
          }),
          (t.type = 'series.pie'),
          (t.defaultOption = {
            z: 2,
            legendHoverLink: !0,
            colorBy: 'data',
            center: ['50%', '50%'],
            radius: [0, '75%'],
            clockwise: !0,
            startAngle: 90,
            endAngle: 'auto',
            padAngle: 0,
            minAngle: 0,
            minShowLabelAngle: 0,
            selectedOffset: 10,
            percentPrecision: 2,
            stillShowZeroSum: !0,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: null,
            height: null,
            label: {
              rotate: 0,
              show: !0,
              overflow: 'truncate',
              position: 'outer',
              alignTo: 'none',
              edgeDistance: '25%',
              bleedMargin: 10,
              distanceToLabelLine: 5,
            },
            labelLine: {
              show: !0,
              length: 15,
              length2: 15,
              smooth: !1,
              minTurnAngle: 90,
              maxSurfaceAngle: 90,
              lineStyle: { width: 1, type: 'solid' },
            },
            itemStyle: { borderWidth: 1, borderJoin: 'round' },
            showEmptyCircle: !0,
            emptyCircleStyle: { color: 'lightgray', opacity: 1 },
            labelLayout: { hideOverlap: !0 },
            emphasis: { scale: !0, scaleSize: 5 },
            avoidLabelOverlap: !0,
            animationType: 'expansion',
            animationDuration: 1e3,
            animationTypeUpdate: 'transition',
            animationEasingUpdate: 'cubicInOut',
            animationDurationUpdate: 500,
            animationEasing: 'cubicInOut',
          }),
          t
        );
      })(G.A);
      var O = a(582796);
      function W(e) {
        (e.registerChartView(R),
          e.registerSeriesModel(B),
          (0, n.I)('pie', e.registerAction),
          e.registerLayout((0, r.curry)(p, 'pie')),
          e.registerProcessor((0, y.A)('pie')),
          e.registerProcessor((0, O.A)('pie')));
      }
    },
    4391: (e, t, a) => {
      a.d(t, { a: () => D });
      var n = a(903087),
        o = a(498026);
      function i(e) {
        e.eachSeriesByType('radar', function (e) {
          var t = e.getData(),
            a = [],
            n = e.coordinateSystem;
          if (n) {
            var i = n.getIndicatorAxes();
            (o.each(i, function (e, o) {
              t.each(t.mapDimension(i[o].dim), function (e, t) {
                a[t] = a[t] || [];
                var i = n.dataToPoint(e, o);
                a[t][o] = r(i) ? i : l(n);
              });
            }),
              t.each(function (e) {
                var i =
                  o.find(a[e], function (e) {
                    return r(e);
                  }) || l(n);
                (a[e].push(i.slice()), t.setItemLayout(e, a[e]));
              }));
          }
        });
      }
      function r(e) {
        return !isNaN(e[0]) && !isNaN(e[1]);
      }
      function l(e) {
        return [e.cx, e.cy];
      }
      var s = a(878587);
      function d(e) {
        var t = e.polar;
        if (t) {
          o.isArray(t) || (t = [t]);
          var a = [];
          (o.each(t, function (t, n) {
            t.indicator
              ? (t.type && !t.shape && (t.shape = t.type),
                (e.radar = e.radar || []),
                o.isArray(e.radar) || (e.radar = [e.radar]),
                e.radar.push(t))
              : a.push(t);
          }),
            (e.polar = a));
        }
        o.each(e.series, function (e) {
          e && 'radar' === e.type && e.polarIndex && (e.radarIndex = e.polarIndex);
        });
      }
      var u = a(15215),
        h = a(543199),
        c = a(252505),
        p = a(39195),
        g = a(683257),
        y = a(843870),
        f = a(34833),
        v = a(62103),
        m = a(106666),
        x = a(289632),
        w = a(390540);
      const b = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), a);
        }
        return (
          (0, u.__extends)(t, e),
          (t.prototype.render = function (e, t, a) {
            var n = e.coordinateSystem,
              i = this.group,
              r = e.getData(),
              l = this._data;
            function s(e, t) {
              var a = e.getItemVisual(t, 'symbol') || 'circle';
              if ('none' !== a) {
                var n = v.xU(e.getItemVisual(t, 'symbolSize')),
                  o = v.v5(a, -1, -1, 2, 2),
                  i = e.getItemVisual(t, 'symbolRotate') || 0;
                return (
                  o.attr({
                    style: { strokeNoScale: !0 },
                    z2: 100,
                    scaleX: n[0] / 2,
                    scaleY: n[1] / 2,
                    rotation: (i * Math.PI) / 180 || 0,
                  }),
                  o
                );
              }
            }
            function d(t, a, n, o, i, r) {
              n.removeAll();
              for (var l = 0; l < a.length - 1; l++) {
                var d = s(o, i);
                d &&
                  ((d.__dimIdx = l),
                  t[l]
                    ? (d.setPosition(t[l]),
                      h[r ? 'initProps' : 'updateProps'](d, { x: a[l][0], y: a[l][1] }, e, i))
                    : d.setPosition(a[l]),
                  n.add(d));
              }
            }
            function u(e) {
              return o.map(e, function (e) {
                return [n.cx, n.cy];
              });
            }
            (r
              .diff(l)
              .add(function (t) {
                var a = r.getItemLayout(t);
                if (a) {
                  var n = new c.A(),
                    o = new p.A(),
                    i = { shape: { points: a } };
                  ((n.shape.points = u(a)),
                    (o.shape.points = u(a)),
                    g.LW(n, i, e, t),
                    g.LW(o, i, e, t));
                  var l = new y.A(),
                    s = new y.A();
                  (l.add(o),
                    l.add(n),
                    l.add(s),
                    d(o.shape.points, a, s, r, t, !0),
                    r.setItemGraphicEl(t, l));
                }
              })
              .update(function (t, a) {
                var n = l.getItemGraphicEl(a),
                  o = n.childAt(0),
                  i = n.childAt(1),
                  s = n.childAt(2),
                  u = { shape: { points: r.getItemLayout(t) } };
                u.shape.points &&
                  (d(o.shape.points, u.shape.points, s, r, t, !1),
                  (0, g.ap)(i),
                  (0, g.ap)(o),
                  g.oi(o, u, e),
                  g.oi(i, u, e),
                  r.setItemGraphicEl(t, n));
              })
              .remove(function (e) {
                i.remove(l.getItemGraphicEl(e));
              })
              .execute(),
              r.eachItemGraphicEl(function (e, t) {
                var a = r.getItemModel(t),
                  n = e.childAt(0),
                  l = e.childAt(1),
                  s = e.childAt(2),
                  d = r.getItemVisual(t, 'style'),
                  u = d.fill;
                (i.add(e),
                  n.useStyle(
                    o.defaults(a.getModel('lineStyle').getLineStyle(), { fill: 'none', stroke: u }),
                  ),
                  (0, f.Mx)(n, a, 'lineStyle'),
                  (0, f.Mx)(l, a, 'areaStyle'));
                var h = a.getModel('areaStyle'),
                  c = h.isEmpty() && h.parentModel.isEmpty();
                ((l.ignore = c),
                  o.each(['emphasis', 'select', 'blur'], function (e) {
                    var t = a.getModel([e, 'areaStyle']),
                      n = t.isEmpty() && t.parentModel.isEmpty();
                    l.ensureState(e).ignore = n && c;
                  }),
                  l.useStyle(
                    o.defaults(h.getAreaStyle(), { fill: u, opacity: 0.7, decal: d.decal }),
                  ));
                var p = a.getModel('emphasis'),
                  g = p.getModel('itemStyle').getItemStyle();
                (s.eachChild(function (e) {
                  if (e instanceof w.Ay) {
                    var n = e.style;
                    e.useStyle(
                      o.extend(
                        { image: n.image, x: n.x, y: n.y, width: n.width, height: n.height },
                        d,
                      ),
                    );
                  } else (e.useStyle(d), e.setColor(u), (e.style.strokeNoScale = !0));
                  e.ensureState('emphasis').style = o.clone(g);
                  var i = r.getStore().get(r.getDimensionIndex(e.__dimIdx), t);
                  ((null == i || isNaN(i)) && (i = ''),
                    (0, x.qM)(e, (0, x.lx)(a), {
                      labelFetcher: r.hostModel,
                      labelDataIndex: t,
                      labelDimIndex: e.__dimIdx,
                      defaultText: i,
                      inheritColor: u,
                      defaultOpacity: d.opacity,
                    }));
                }),
                  (0, f.Lm)(e, p.get('focus'), p.get('blurScope'), p.get('disabled')));
              }),
              (this._data = r));
          }),
          (t.prototype.remove = function () {
            (this.group.removeAll(), (this._data = null));
          }),
          (t.type = 'radar'),
          t
        );
      })(m.A);
      var I = a(347355),
        S = a(572731),
        A = a(958239),
        L = a(603961);
      const _ = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), (a.hasSymbolVisual = !0), a);
        }
        return (
          (0, u.__extends)(t, e),
          (t.prototype.init = function (t) {
            (e.prototype.init.apply(this, arguments),
              (this.legendVisualProvider = new A.A(
                o.bind(this.getData, this),
                o.bind(this.getRawData, this),
              )));
          }),
          (t.prototype.getInitialData = function (e, t) {
            return (0, S.A)(this, { generateCoord: 'indicator_', generateCoordCount: 1 / 0 });
          }),
          (t.prototype.formatTooltip = function (e, t, a) {
            var n = this.getData(),
              i = this.coordinateSystem.getIndicatorAxes(),
              r = this.getData().getName(e),
              l = '' === r ? this.name : r,
              s = (0, L.aw)(this, e);
            return (0, L.Qx)('section', {
              header: l,
              sortBlocks: !0,
              blocks: o.map(i, function (t) {
                var a = n.get(n.mapDimension(t.dim), e);
                return (0, L.Qx)('nameValue', {
                  markerType: 'subItem',
                  markerColor: s,
                  name: t.name,
                  value: a,
                  sortParam: a,
                });
              }),
            });
          }),
          (t.prototype.getTooltipPosition = function (e) {
            if (null != e)
              for (
                var t = this.getData(),
                  a = this.coordinateSystem,
                  n = t.getValues(
                    o.map(a.dimensions, function (e) {
                      return t.mapDimension(e);
                    }),
                    e,
                  ),
                  i = 0,
                  r = n.length;
                i < r;
                i++
              )
                if (!isNaN(n[i])) {
                  var l = a.getIndicatorAxes();
                  return a.coordToPoint(l[i].dataToCoord(n[i]), i);
                }
          }),
          (t.type = 'series.radar'),
          (t.dependencies = ['radar']),
          (t.defaultOption = {
            z: 2,
            colorBy: 'data',
            coordinateSystem: 'radar',
            legendHoverLink: !0,
            radarIndex: 0,
            lineStyle: { width: 2, type: 'solid', join: 'round' },
            label: { position: 'top' },
            symbolSize: 8,
          }),
          t
        );
      })(I.A);
      var M = a(118909);
      function D(e) {
        ((0, n.Y)(M.a),
          e.registerChartView(b),
          e.registerSeriesModel(_),
          e.registerLayout(i),
          e.registerProcessor((0, s.A)('radar')),
          e.registerPreprocessor(d));
      }
    },
    873900: (e, t, a) => {
      a.d(t, { a: () => O });
      var n = a(15215),
        o = a(467065),
        i = a(830010),
        r = a(229668),
        l = a(683257),
        s = a(34833),
        d = a(106666),
        u = a(289632),
        h = a(669622),
        c = a(498026),
        p = function () {
          ((this.x1 = 0),
            (this.y1 = 0),
            (this.x2 = 0),
            (this.y2 = 0),
            (this.cpx1 = 0),
            (this.cpy1 = 0),
            (this.cpx2 = 0),
            (this.cpy2 = 0),
            (this.extent = 0));
        },
        g = (function (e) {
          function t(t) {
            return e.call(this, t) || this;
          }
          return (
            (0, n.__extends)(t, e),
            (t.prototype.getDefaultShape = function () {
              return new p();
            }),
            (t.prototype.buildPath = function (e, t) {
              var a = t.extent;
              (e.moveTo(t.x1, t.y1),
                e.bezierCurveTo(t.cpx1, t.cpy1, t.cpx2, t.cpy2, t.x2, t.y2),
                'vertical' === t.orient
                  ? (e.lineTo(t.x2 + a, t.y2),
                    e.bezierCurveTo(t.cpx2 + a, t.cpy2, t.cpx1 + a, t.cpy1, t.x1 + a, t.y1))
                  : (e.lineTo(t.x2, t.y2 + a),
                    e.bezierCurveTo(t.cpx2, t.cpy2 + a, t.cpx1, t.cpy1 + a, t.x1, t.y1 + a)),
                e.closePath());
            }),
            (t.prototype.highlight = function () {
              (0, s.HY)(this);
            }),
            (t.prototype.downplay = function () {
              (0, s.SD)(this);
            }),
            t
          );
        })(o.Ay),
        y = (function (e) {
          function t() {
            var a = (null !== e && e.apply(this, arguments)) || this;
            return ((a.type = t.type), (a._focusAdjacencyDisabled = !1), a);
          }
          return (
            (0, n.__extends)(t, e),
            (t.prototype.render = function (e, t, a) {
              var n = this,
                o = e.getGraph(),
                r = this.group,
                d = e.layoutInfo,
                p = d.width,
                y = d.height,
                v = e.getData(),
                m = e.getData('edge'),
                x = e.get('orient');
              ((this._model = e),
                r.removeAll(),
                (r.x = d.x),
                (r.y = d.y),
                o.eachEdge(function (t) {
                  var a = new g(),
                    n = (0, h.z)(a);
                  ((n.dataIndex = t.dataIndex),
                    (n.seriesIndex = e.seriesIndex),
                    (n.dataType = 'edge'));
                  var o,
                    i,
                    l,
                    d,
                    v,
                    w,
                    b,
                    I,
                    S = t.getModel(),
                    A = S.getModel('lineStyle'),
                    L = A.get('curveness'),
                    _ = t.node1.getLayout(),
                    M = t.node1.getModel(),
                    D = M.get('localX'),
                    N = M.get('localY'),
                    T = t.node2.getLayout(),
                    C = t.node2.getModel(),
                    V = C.get('localX'),
                    R = C.get('localY'),
                    P = t.getLayout();
                  ((a.shape.extent = Math.max(1, P.dy)),
                    (a.shape.orient = x),
                    'vertical' === x
                      ? ((o = (null != D ? D * p : _.x) + P.sy),
                        (i = (null != N ? N * y : _.y) + _.dy),
                        (l = (null != V ? V * p : T.x) + P.ty),
                        (v = o),
                        (w = i * (1 - L) + (d = null != R ? R * y : T.y) * L),
                        (b = l),
                        (I = i * L + d * (1 - L)))
                      : ((o = (null != D ? D * p : _.x) + _.dx),
                        (i = (null != N ? N * y : _.y) + P.sy),
                        (v = o * (1 - L) + (l = null != V ? V * p : T.x) * L),
                        (w = i),
                        (b = o * L + l * (1 - L)),
                        (I = d = (null != R ? R * y : T.y) + P.ty)),
                    a.setShape({ x1: o, y1: i, x2: l, y2: d, cpx1: v, cpy1: w, cpx2: b, cpy2: I }),
                    a.useStyle(A.getItemStyle()),
                    f(a.style, x, t));
                  var E = '' + S.get('value'),
                    k = (0, u.lx)(S, 'edgeLabel');
                  ((0, u.qM)(a, k, {
                    labelFetcher: {
                      getFormattedLabel: function (t, a, n, o, i, r) {
                        return e.getFormattedLabel(
                          t,
                          a,
                          'edge',
                          o,
                          (0, c.retrieve3)(i, k.normal && k.normal.get('formatter'), E),
                          r,
                        );
                      },
                    },
                    labelDataIndex: t.dataIndex,
                    defaultText: E,
                  }),
                    a.setTextConfig({ position: 'inside' }));
                  var G = S.getModel('emphasis');
                  ((0, s.Mx)(a, S, 'lineStyle', function (e) {
                    var a = e.getItemStyle();
                    return (f(a, x, t), a);
                  }),
                    r.add(a),
                    m.setItemGraphicEl(t.dataIndex, a));
                  var z = G.get('focus');
                  (0, s.Lm)(
                    a,
                    'adjacency' === z
                      ? t.getAdjacentDataIndices()
                      : 'trajectory' === z
                        ? t.getTrajectoryDataIndices()
                        : z,
                    G.get('blurScope'),
                    G.get('disabled'),
                  );
                }),
                o.eachNode(function (t) {
                  var a = t.getLayout(),
                    n = t.getModel(),
                    o = n.get('localX'),
                    l = n.get('localY'),
                    d = n.getModel('emphasis'),
                    c = n.get(['itemStyle', 'borderRadius']) || 0,
                    g = new i.A({
                      shape: {
                        x: null != o ? o * p : a.x,
                        y: null != l ? l * y : a.y,
                        width: a.dx,
                        height: a.dy,
                        r: c,
                      },
                      style: n.getModel('itemStyle').getItemStyle(),
                      z2: 10,
                    });
                  ((0, u.qM)(g, (0, u.lx)(n), {
                    labelFetcher: {
                      getFormattedLabel: function (t, a) {
                        return e.getFormattedLabel(t, a, 'node');
                      },
                    },
                    labelDataIndex: t.dataIndex,
                    defaultText: t.id,
                  }),
                    (g.disableLabelAnimation = !0),
                    g.setStyle('fill', t.getVisual('color')),
                    g.setStyle('decal', t.getVisual('style').decal),
                    (0, s.Mx)(g, n),
                    r.add(g),
                    v.setItemGraphicEl(t.dataIndex, g),
                    ((0, h.z)(g).dataType = 'node'));
                  var f = d.get('focus');
                  (0, s.Lm)(
                    g,
                    'adjacency' === f
                      ? t.getAdjacentDataIndices()
                      : 'trajectory' === f
                        ? t.getTrajectoryDataIndices()
                        : f,
                    d.get('blurScope'),
                    d.get('disabled'),
                  );
                }),
                v.eachItemGraphicEl(function (t, o) {
                  v.getItemModel(o).get('draggable') &&
                    ((t.drift = function (t, i) {
                      ((n._focusAdjacencyDisabled = !0),
                        (this.shape.x += t),
                        (this.shape.y += i),
                        this.dirty(),
                        a.dispatchAction({
                          type: 'dragNode',
                          seriesId: e.id,
                          dataIndex: v.getRawIndex(o),
                          localX: this.shape.x / p,
                          localY: this.shape.y / y,
                        }));
                    }),
                    (t.ondragend = function () {
                      n._focusAdjacencyDisabled = !1;
                    }),
                    (t.draggable = !0),
                    (t.cursor = 'move'));
                }),
                !this._data &&
                  e.isAnimationEnabled() &&
                  r.setClipPath(
                    (function (e, t) {
                      var a = new i.A({
                        shape: { x: e.x - 10, y: e.y - 10, width: 0, height: e.height + 20 },
                      });
                      return (
                        l.LW(a, { shape: { width: e.width + 20 } }, t, function () {
                          r.removeClipPath();
                        }),
                        a
                      );
                    })(r.getBoundingRect(), e),
                  ),
                (this._data = e.getData()));
            }),
            (t.prototype.dispose = function () {}),
            (t.type = 'sankey'),
            t
          );
        })(d.A);
      function f(e, t, a) {
        switch (e.fill) {
          case 'source':
            ((e.fill = a.node1.getVisual('color')), (e.decal = a.node1.getVisual('style').decal));
            break;
          case 'target':
            ((e.fill = a.node2.getVisual('color')), (e.decal = a.node2.getVisual('style').decal));
            break;
          case 'gradient':
            var n = a.node1.getVisual('color'),
              o = a.node2.getVisual('color');
            (0, c.isString)(n) &&
              (0, c.isString)(o) &&
              (e.fill = new r.A(0, 0, +('horizontal' === t), +('vertical' === t), [
                { color: n, offset: 0 },
                { color: o, offset: 1 },
              ]));
        }
      }
      const v = y;
      var m = a(347355),
        x = a(362695),
        w = a(143172),
        b = a(603961),
        I = (function (e) {
          function t() {
            var a = (null !== e && e.apply(this, arguments)) || this;
            return ((a.type = t.type), a);
          }
          return (
            (0, n.__extends)(t, e),
            (t.prototype.getInitialData = function (e, t) {
              var a = e.edges || e.links || [],
                n = e.data || e.nodes || [],
                o = e.levels || [];
              this.levelModels = [];
              for (var i = this.levelModels, r = 0; r < o.length; r++)
                null != o[r].depth && o[r].depth >= 0 && (i[o[r].depth] = new w.A(o[r], this, t));
              var l = (0, x.A)(n, a, this, !0, function (e, t) {
                (e.wrapMethod('getItemModel', function (e, t) {
                  var a = e.parentModel,
                    n = a.getData().getItemLayout(t);
                  if (n) {
                    var o = n.depth,
                      i = a.levelModels[o];
                    i && (e.parentModel = i);
                  }
                  return e;
                }),
                  t.wrapMethod('getItemModel', function (e, t) {
                    var a = e.parentModel,
                      n = a.getGraph().getEdgeByIndex(t).node1.getLayout();
                    if (n) {
                      var o = n.depth,
                        i = a.levelModels[o];
                      i && (e.parentModel = i);
                    }
                    return e;
                  }));
              });
              return l.data;
            }),
            (t.prototype.setNodePosition = function (e, t) {
              var a = (this.option.data || this.option.nodes)[e];
              ((a.localX = t[0]), (a.localY = t[1]));
            }),
            (t.prototype.getGraph = function () {
              return this.getData().graph;
            }),
            (t.prototype.getEdgeData = function () {
              return this.getGraph().edgeData;
            }),
            (t.prototype.formatTooltip = function (e, t, a) {
              function n(e) {
                return isNaN(e) || null == e;
              }
              if ('edge' === a) {
                var o = this.getDataParams(e, a),
                  i = o.data,
                  r = o.value,
                  l = i.source + ' -- ' + i.target;
                return (0, b.Qx)('nameValue', { name: l, value: r, noValue: n(r) });
              }
              var s = this.getGraph().getNodeByIndex(e).getLayout().value,
                d = this.getDataParams(e, a).data.name;
              return (0, b.Qx)('nameValue', {
                name: null != d ? d + '' : null,
                value: s,
                noValue: n(s),
              });
            }),
            (t.prototype.optionUpdated = function () {}),
            (t.prototype.getDataParams = function (t, a) {
              var n = e.prototype.getDataParams.call(this, t, a);
              if (null == n.value && 'node' === a) {
                var o = this.getGraph().getNodeByIndex(t).getLayout().value;
                n.value = o;
              }
              return n;
            }),
            (t.type = 'series.sankey'),
            (t.defaultOption = {
              z: 2,
              coordinateSystem: 'view',
              left: '5%',
              top: '5%',
              right: '20%',
              bottom: '5%',
              orient: 'horizontal',
              nodeWidth: 20,
              nodeGap: 8,
              draggable: !0,
              layoutIterations: 32,
              label: { show: !0, position: 'right', fontSize: 12 },
              edgeLabel: { show: !1, fontSize: 12 },
              levels: [],
              nodeAlign: 'justify',
              lineStyle: { color: '#314656', opacity: 0.2, curveness: 0.5 },
              emphasis: { label: { show: !0 }, lineStyle: { opacity: 0.5 } },
              select: { itemStyle: { borderColor: '#212121' } },
              animationEasing: 'linear',
              animationDuration: 1e3,
            }),
            t
          );
        })(m.A);
      const S = I;
      var A = a(834253),
        L = a(48170);
      function _(e, t) {
        e.eachSeriesByType('sankey', function (e) {
          var a = e.get('nodeWidth'),
            n = e.get('nodeGap'),
            o = (function (e, t) {
              return A.dV(e.getBoxLayoutParams(), { width: t.getWidth(), height: t.getHeight() });
            })(e, t);
          e.layoutInfo = o;
          var i = o.width,
            r = o.height,
            l = e.getGraph(),
            s = l.nodes,
            d = l.edges;
          (!(function (e) {
            c.each(e, function (e) {
              var t = k(e.outEdges, E),
                a = k(e.inEdges, E),
                n = e.getValue() || 0,
                o = Math.max(t, a, n);
              e.setLayout({ value: o }, !0);
            });
          })(s),
            (function (e, t, a, n, o, i, r, l, s) {
              ((function (e, t, a, n, o, i, r) {
                for (var l = [], s = [], d = [], u = [], h = 0, p = 0; p < t.length; p++) l[p] = 1;
                for (p = 0; p < e.length; p++)
                  ((s[p] = e[p].inEdges.length), 0 === s[p] && d.push(e[p]));
                for (var g = -1; d.length;) {
                  for (var y = 0; y < d.length; y++) {
                    var f = d[y],
                      v = f.hostGraph.data.getRawDataItem(f.dataIndex),
                      m = null != v.depth && v.depth >= 0;
                    (m && v.depth > g && (g = v.depth),
                      f.setLayout({ depth: m ? v.depth : h }, !0),
                      'vertical' === i ? f.setLayout({ dy: a }, !0) : f.setLayout({ dx: a }, !0));
                    for (var x = 0; x < f.outEdges.length; x++) {
                      var w = f.outEdges[x];
                      l[t.indexOf(w)] = 0;
                      var b = w.node2;
                      0 === --s[e.indexOf(b)] && u.indexOf(b) < 0 && u.push(b);
                    }
                  }
                  (++h, (d = u), (u = []));
                }
                for (p = 0; p < l.length; p++)
                  if (1 === l[p]) throw new Error('Sankey is a DAG, the original data has cycle!');
                var I = g > h - 1 ? g : h - 1;
                (r &&
                  'left' !== r &&
                  (function (e, t, a, n) {
                    if ('right' === t) {
                      for (var o = [], i = e, r = 0; i.length;) {
                        for (var l = 0; l < i.length; l++) {
                          var s = i[l];
                          s.setLayout({ skNodeHeight: r }, !0);
                          for (var d = 0; d < s.inEdges.length; d++) {
                            var u = s.inEdges[d];
                            o.indexOf(u.node1) < 0 && o.push(u.node1);
                          }
                        }
                        ((i = o), (o = []), ++r);
                      }
                      c.each(e, function (e) {
                        M(e) ||
                          e.setLayout({ depth: Math.max(0, n - e.getLayout().skNodeHeight) }, !0);
                      });
                    } else
                      'justify' === t &&
                        (function (e, t) {
                          c.each(e, function (e) {
                            M(e) || e.outEdges.length || e.setLayout({ depth: t }, !0);
                          });
                        })(e, n);
                  })(e, r, 0, I),
                  (function (e, t, a) {
                    c.each(e, function (e) {
                      var n = e.getLayout().depth * t;
                      'vertical' === a ? e.setLayout({ y: n }, !0) : e.setLayout({ x: n }, !0);
                    });
                  })(e, 'vertical' === i ? (o - a) / I : (n - a) / I, i));
              })(e, t, a, o, i, l, s),
                (function (e, t, a, n, o, i, r) {
                  var l = (function (e, t) {
                    var a = [],
                      n = 'vertical' === t ? 'y' : 'x',
                      o = (0, L.Sq)(e, function (e) {
                        return e.getLayout()[n];
                      });
                    return (
                      o.keys.sort(function (e, t) {
                        return e - t;
                      }),
                      c.each(o.keys, function (e) {
                        a.push(o.buckets.get(e));
                      }),
                      a
                    );
                  })(e, r);
                  ((function (e, t, a, n, o, i) {
                    var r = 1 / 0;
                    (c.each(e, function (e) {
                      var t = e.length,
                        l = 0;
                      c.each(e, function (e) {
                        l += e.getLayout().value;
                      });
                      var s = 'vertical' === i ? (n - (t - 1) * o) / l : (a - (t - 1) * o) / l;
                      s < r && (r = s);
                    }),
                      c.each(e, function (e) {
                        c.each(e, function (e, t) {
                          var a = e.getLayout().value * r;
                          'vertical' === i
                            ? (e.setLayout({ x: t }, !0), e.setLayout({ dx: a }, !0))
                            : (e.setLayout({ y: t }, !0), e.setLayout({ dy: a }, !0));
                        });
                      }),
                      c.each(t, function (e) {
                        var t = +e.getValue() * r;
                        e.setLayout({ dy: t }, !0);
                      }));
                  })(l, t, a, n, o, r),
                    D(l, o, a, n, r));
                  for (var s = 1; i > 0; i--)
                    (N(l, (s *= 0.99), r), D(l, o, a, n, r), G(l, s, r), D(l, o, a, n, r));
                })(e, t, i, o, n, r, l),
                (function (e, t) {
                  var a = 'vertical' === t ? 'x' : 'y';
                  (c.each(e, function (e) {
                    (e.outEdges.sort(function (e, t) {
                      return e.node2.getLayout()[a] - t.node2.getLayout()[a];
                    }),
                      e.inEdges.sort(function (e, t) {
                        return e.node1.getLayout()[a] - t.node1.getLayout()[a];
                      }));
                  }),
                    c.each(e, function (e) {
                      var t = 0,
                        a = 0;
                      (c.each(e.outEdges, function (e) {
                        (e.setLayout({ sy: t }, !0), (t += e.getLayout().dy));
                      }),
                        c.each(e.inEdges, function (e) {
                          (e.setLayout({ ty: a }, !0), (a += e.getLayout().dy));
                        }));
                    }));
                })(e, l));
            })(
              s,
              d,
              a,
              n,
              i,
              r,
              0 !==
                c.filter(s, function (e) {
                  return 0 === e.getLayout().value;
                }).length
                ? 0
                : e.get('layoutIterations'),
              e.get('orient'),
              e.get('nodeAlign'),
            ));
        });
      }
      function M(e) {
        var t = e.hostGraph.data.getRawDataItem(e.dataIndex);
        return null != t.depth && t.depth >= 0;
      }
      function D(e, t, a, n, o) {
        var i = 'vertical' === o ? 'x' : 'y';
        c.each(e, function (e) {
          var r, l, s;
          e.sort(function (e, t) {
            return e.getLayout()[i] - t.getLayout()[i];
          });
          for (var d = 0, u = e.length, h = 'vertical' === o ? 'dx' : 'dy', c = 0; c < u; c++)
            ((s = d - (l = e[c]).getLayout()[i]) > 0 &&
              ((r = l.getLayout()[i] + s),
              'vertical' === o ? l.setLayout({ x: r }, !0) : l.setLayout({ y: r }, !0)),
              (d = l.getLayout()[i] + l.getLayout()[h] + t));
          if ((s = d - t - ('vertical' === o ? n : a)) > 0)
            for (
              r = l.getLayout()[i] - s,
                'vertical' === o ? l.setLayout({ x: r }, !0) : l.setLayout({ y: r }, !0),
                d = r,
                c = u - 2;
              c >= 0;
              --c
            )
              ((s = (l = e[c]).getLayout()[i] + l.getLayout()[h] + t - d) > 0 &&
                ((r = l.getLayout()[i] - s),
                'vertical' === o ? l.setLayout({ x: r }, !0) : l.setLayout({ y: r }, !0)),
                (d = l.getLayout()[i]));
        });
      }
      function N(e, t, a) {
        c.each(e.slice().reverse(), function (e) {
          c.each(e, function (e) {
            if (e.outEdges.length) {
              var n = k(e.outEdges, T, a) / k(e.outEdges, E);
              if (isNaN(n)) {
                var o = e.outEdges.length;
                n = o ? k(e.outEdges, C, a) / o : 0;
              }
              if ('vertical' === a) {
                var i = e.getLayout().x + (n - P(e, a)) * t;
                e.setLayout({ x: i }, !0);
              } else {
                var r = e.getLayout().y + (n - P(e, a)) * t;
                e.setLayout({ y: r }, !0);
              }
            }
          });
        });
      }
      function T(e, t) {
        return P(e.node2, t) * e.getValue();
      }
      function C(e, t) {
        return P(e.node2, t);
      }
      function V(e, t) {
        return P(e.node1, t) * e.getValue();
      }
      function R(e, t) {
        return P(e.node1, t);
      }
      function P(e, t) {
        return 'vertical' === t
          ? e.getLayout().x + e.getLayout().dx / 2
          : e.getLayout().y + e.getLayout().dy / 2;
      }
      function E(e) {
        return e.getValue();
      }
      function k(e, t, a) {
        for (var n = 0, o = e.length, i = -1; ++i < o;) {
          var r = +t(e[i], a);
          isNaN(r) || (n += r);
        }
        return n;
      }
      function G(e, t, a) {
        c.each(e, function (e) {
          c.each(e, function (e) {
            if (e.inEdges.length) {
              var n = k(e.inEdges, V, a) / k(e.inEdges, E);
              if (isNaN(n)) {
                var o = e.inEdges.length;
                n = o ? k(e.inEdges, R, a) / o : 0;
              }
              if ('vertical' === a) {
                var i = e.getLayout().x + (n - P(e, a)) * t;
                e.setLayout({ x: i }, !0);
              } else {
                var r = e.getLayout().y + (n - P(e, a)) * t;
                e.setLayout({ y: r }, !0);
              }
            }
          });
        });
      }
      var z = a(907857);
      function B(e) {
        e.eachSeriesByType('sankey', function (e) {
          var t = e.getGraph(),
            a = t.nodes,
            n = t.edges;
          if (a.length) {
            var o = 1 / 0,
              i = -1 / 0;
            (c.each(a, function (e) {
              var t = e.getLayout().value;
              (t < o && (o = t), t > i && (i = t));
            }),
              c.each(a, function (t) {
                var a = new z.A({
                    type: 'color',
                    mappingMethod: 'linear',
                    dataExtent: [o, i],
                    visual: e.get('color'),
                  }).mapValueToVisual(t.getLayout().value),
                  n = t.getModel().get(['itemStyle', 'color']);
                null != n
                  ? (t.setVisual('color', n), t.setVisual('style', { fill: n }))
                  : (t.setVisual('color', a), t.setVisual('style', { fill: a }));
              }));
          }
          n.length &&
            c.each(n, function (e) {
              var t = e.getModel().get('lineStyle');
              e.setVisual('style', t);
            });
        });
      }
      function O(e) {
        (e.registerChartView(v),
          e.registerSeriesModel(S),
          e.registerLayout(_),
          e.registerVisual(B),
          e.registerAction(
            { type: 'dragNode', event: 'dragnode', update: 'update' },
            function (e, t) {
              t.eachComponent({ mainType: 'series', subType: 'sankey', query: e }, function (t) {
                t.setNodePosition(e.dataIndex, [e.localX, e.localY]);
              });
            },
          ));
      }
    },
    999952: (e, t, a) => {
      a.d(t, { a: () => c });
      var n = a(903087),
        o = a(15215),
        i = a(913637);
      const r = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), (a.hasSymbolVisual = !0), a);
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.getInitialData = function (e, t) {
            return (0, i.A)(null, this, { useEncodeDefaulter: !0 });
          }),
          (t.prototype.getProgressive = function () {
            return this.option.progressive ?? (this.option.large ? 5e3 : this.get('progressive'));
          }),
          (t.prototype.getProgressiveThreshold = function () {
            return (
              this.option.progressiveThreshold ??
              (this.option.large ? 1e4 : this.get('progressiveThreshold'))
            );
          }),
          (t.prototype.brushSelector = function (e, t, a) {
            return a.point(t.getItemLayout(e));
          }),
          (t.prototype.getZLevelKey = function () {
            return this.getData().count() > this.getProgressiveThreshold() ? this.id : '';
          }),
          (t.type = 'series.scatter'),
          (t.dependencies = ['grid', 'polar', 'geo', 'singleAxis', 'calendar']),
          (t.defaultOption = {
            coordinateSystem: 'cartesian2d',
            z: 2,
            legendHoverLink: !0,
            symbolSize: 10,
            large: !1,
            largeThreshold: 2e3,
            itemStyle: { opacity: 0.8 },
            emphasis: { scale: !0 },
            clip: !0,
            select: { itemStyle: { borderColor: '#212121' } },
            universalTransition: { divideShape: 'clone' },
          }),
          t
        );
      })(a(347355).A);
      var l = a(218386),
        s = a(894583),
        d = a(430682);
      const u = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), a);
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.render = function (e, t, a) {
            var n = e.getData();
            (this._updateSymbolDraw(n, e).updateData(n, { clipShape: this._getClipShape(e) }),
              (this._finished = !0));
          }),
          (t.prototype.incrementalPrepareRender = function (e, t, a) {
            var n = e.getData();
            (this._updateSymbolDraw(n, e).incrementalPrepareUpdate(n), (this._finished = !1));
          }),
          (t.prototype.incrementalRender = function (e, t, a) {
            (this._symbolDraw.incrementalUpdate(e, t.getData(), {
              clipShape: this._getClipShape(t),
            }),
              (this._finished = e.end === t.getData().count()));
          }),
          (t.prototype.updateTransform = function (e, t, a) {
            var n = e.getData();
            if ((this.group.dirty(), !this._finished || n.count() > 1e4)) return { update: !0 };
            var o = (0, d.A)('').reset(e, t, a);
            (o.progress && o.progress({ start: 0, end: n.count(), count: n.count() }, n),
              this._symbolDraw.updateLayout(n));
          }),
          (t.prototype.eachRendered = function (e) {
            this._symbolDraw && this._symbolDraw.eachRendered(e);
          }),
          (t.prototype._getClipShape = function (e) {
            if (e.get('clip', !0)) {
              var t = e.coordinateSystem;
              return t && t.getArea && t.getArea(0.1);
            }
          }),
          (t.prototype._updateSymbolDraw = function (e, t) {
            var a = this._symbolDraw,
              n = t.pipelineContext.large;
            return (
              (a && n === this._isLargeDraw) ||
                (a && a.remove(),
                (a = this._symbolDraw = n ? new s.A() : new l.A()),
                (this._isLargeDraw = n),
                this.group.removeAll()),
              this.group.add(a.group),
              a
            );
          }),
          (t.prototype.remove = function (e, t) {
            (this._symbolDraw && this._symbolDraw.remove(!0), (this._symbolDraw = null));
          }),
          (t.prototype.dispose = function () {}),
          (t.type = 'scatter'),
          t
        );
      })(a(106666).A);
      var h = a(554083);
      function c(e) {
        ((0, n.Y)(h.a),
          e.registerSeriesModel(r),
          e.registerChartView(u),
          e.registerLayout((0, d.A)('scatter')));
      }
    },
    344710: (e, t, a) => {
      a.d(t, { a: () => k });
      var n = a(15215),
        o = a(498026),
        i = a(106666),
        r = a(132322),
        l = a(683257),
        s = a(725014),
        d = a(34833),
        u = a(289632),
        h = a(669622),
        c = a(979446),
        p = a(923538),
        g = a(941589),
        y = a(624326);
      const f = (function (e) {
        function t(t, a, n, o) {
          var i = e.call(this) || this;
          ((i.z2 = 2), (i.textConfig = { inside: !0 }), ((0, h.z)(i).seriesIndex = a.seriesIndex));
          var l = new r.Ay({ z2: 4, silent: t.getModel().get(['label', 'silent']) });
          return (i.setTextContent(l), i.updateData(!0, t, a, n, o), i);
        }
        return (
          (0, n.__extends)(t, e),
          (t.prototype.updateData = function (e, t, a, n, i) {
            ((this.node = t),
              (t.piece = this),
              (a = a || this._seriesModel),
              (n = n || this._ecModel));
            var r = this;
            (0, h.z)(r).dataIndex = t.dataIndex;
            var s = t.getModel(),
              u = s.getModel('emphasis'),
              g = t.getLayout(),
              y = o.extend({}, g);
            y.label = null;
            var f = t.getVisual('style');
            f.lineJoin = 'bevel';
            var v = t.getVisual('decal');
            v && (f.decal = (0, p.w)(v, i));
            var m = (0, c.i)(s.getModel('itemStyle'), y, !0);
            (o.extend(y, m),
              o.each(d.BV, function (e) {
                var t = r.ensureState(e),
                  a = s.getModel([e, 'itemStyle']);
                t.style = a.getItemStyle();
                var n = (0, c.i)(a, y);
                n && (t.shape = n);
              }),
              e
                ? (r.setShape(y),
                  (r.shape.r = g.r0),
                  l.LW(r, { shape: { r: g.r } }, a, t.dataIndex))
                : (l.oi(r, { shape: y }, a), (0, l.ap)(r)),
              r.useStyle(f),
              this._updateLabel(a));
            var x = s.getShallow('cursor');
            (x && r.attr('cursor', x),
              (this._seriesModel = a || this._seriesModel),
              (this._ecModel = n || this._ecModel));
            var w = u.get('focus'),
              b =
                'relative' === w
                  ? o.concatArray(t.getAncestorsIndices(), t.getDescendantIndices())
                  : 'ancestor' === w
                    ? t.getAncestorsIndices()
                    : 'descendant' === w
                      ? t.getDescendantIndices()
                      : w;
            (0, d.Lm)(this, b, u.get('blurScope'), u.get('disabled'));
          }),
          (t.prototype._updateLabel = function (e) {
            var t = this,
              a = this.node.getModel(),
              n = a.getModel('label'),
              i = this.node.getLayout(),
              r = i.endAngle - i.startAngle,
              l = (i.startAngle + i.endAngle) / 2,
              s = Math.cos(l),
              h = Math.sin(l),
              c = this,
              p = c.getTextContent(),
              f = this.node.dataIndex,
              v = (n.get('minAngle') / 180) * Math.PI,
              m = n.get('show') && !(null != v && Math.abs(r) < v);
            function x(e, t) {
              return e.get(t) ?? n.get(t);
            }
            ((p.ignore = !m),
              o.each(d.wV, function (n) {
                var d = 'normal' === n ? a.getModel('label') : a.getModel([n, 'label']),
                  v = 'normal' === n,
                  m = v ? p : p.ensureState(n),
                  w = e.getFormattedLabel(f, n);
                (v && (w = w || t.node.name),
                  (m.style = (0, u.VB)(d, {}, null, 'normal' !== n, !0)),
                  w && (m.style.text = w));
                var b = d.get('show');
                null == b || v || (m.ignore = !b);
                var I,
                  S = x(d, 'position'),
                  A = v ? c : c.states[n],
                  L = A.style.fill;
                A.textConfig = {
                  outsideFill: 'inherit' === d.get('color') ? L : null,
                  inside: 'outside' !== S,
                };
                var _ = x(d, 'distance') || 0,
                  M = x(d, 'align'),
                  D = x(d, 'rotate'),
                  N = 0.5 * Math.PI,
                  T = 1.5 * Math.PI,
                  C = (0, g.n)('tangential' === D ? Math.PI / 2 - l : l),
                  V = C > N && !(0, y.dh)(C - N) && C < T;
                ('outside' === S
                  ? ((I = i.r + _), (M = V ? 'right' : 'left'))
                  : M && 'center' !== M
                    ? 'left' === M
                      ? ((I = i.r0 + _), (M = V ? 'right' : 'left'))
                      : 'right' === M && ((I = i.r - _), (M = V ? 'left' : 'right'))
                    : ((I = r === 2 * Math.PI && 0 === i.r0 ? 0 : (i.r + i.r0) / 2),
                      (M = 'center')),
                  (m.style.align = M),
                  (m.style.verticalAlign = x(d, 'verticalAlign') || 'middle'),
                  (m.x = I * s + i.cx),
                  (m.y = I * h + i.cy));
                var R = 0;
                ('radial' === D
                  ? (R = (0, g.n)(-l) + (V ? Math.PI : 0))
                  : 'tangential' === D
                    ? (R = (0, g.n)(Math.PI / 2 - l) + (V ? Math.PI : 0))
                    : o.isNumber(D) && (R = (D * Math.PI) / 180),
                  (m.rotation = (0, g.n)(R)));
              }),
              p.dirtyStyle());
          }),
          t
        );
      })(s.A);
      var v = a(716563),
        m = a(41616),
        x = 'sunburstRootToNode',
        w = 'sunburstHighlight',
        b = 'sunburstUnhighlight',
        I = a(783412);
      const S = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), a);
        }
        return (
          (0, n.__extends)(t, e),
          (t.prototype.render = function (e, t, a, n) {
            var i = this;
            ((this.seriesModel = e), (this.api = a), (this.ecModel = t));
            var r = e.getData(),
              l = r.tree.root,
              s = e.getViewRoot(),
              d = this.group,
              u = e.get('renderLabelForZeroData'),
              h = [];
            s.eachNode(function (e) {
              h.push(e);
            });
            var c = this._oldChildren || [];
            (!(function (n, i) {
              function s(e) {
                return e.getId();
              }
              function h(o, s) {
                !(function (n, o) {
                  if ((u || !n || n.getValue() || (n = null), n !== l && o !== l))
                    if (o && o.piece)
                      n
                        ? (o.piece.updateData(!1, n, e, t, a),
                          r.setItemGraphicEl(n.dataIndex, o.piece))
                        : (s = o) && s.piece && (d.remove(s.piece), (s.piece = null));
                    else if (n) {
                      var i = new f(n, e, t, a);
                      (d.add(i), r.setItemGraphicEl(n.dataIndex, i));
                    }
                  var s;
                })(null == o ? null : n[o], null == s ? null : i[s]);
              }
              (0 === n.length && 0 === i.length) ||
                new v.A(i, n, s, s).add(h).update(h).remove(o.curry(h, null)).execute();
            })(h, c),
              (function (n, o) {
                o.depth > 0
                  ? (i.virtualPiece
                      ? i.virtualPiece.updateData(!1, n, e, t, a)
                      : ((i.virtualPiece = new f(n, e, t, a)), d.add(i.virtualPiece)),
                    o.piece.off('click'),
                    i.virtualPiece.on('click', function (e) {
                      i._rootToNode(o.parentNode);
                    }))
                  : i.virtualPiece && (d.remove(i.virtualPiece), (i.virtualPiece = null));
              })(l, s),
              this._initEvents(),
              (this._oldChildren = h));
          }),
          (t.prototype._initEvents = function () {
            var e = this;
            (this.group.off('click'),
              this.group.on('click', function (t) {
                var a = !1;
                e.seriesModel.getViewRoot().eachNode(function (n) {
                  if (!a && n.piece && n.piece === t.target) {
                    var o = n.getModel().get('nodeClick');
                    if ('rootToNode' === o) e._rootToNode(n);
                    else if ('link' === o) {
                      var i = n.getModel(),
                        r = i.get('link');
                      if (r) {
                        var l = i.get('target', !0) || '_blank';
                        (0, I.JW)(r, l);
                      }
                    }
                    a = !0;
                  }
                });
              }));
          }),
          (t.prototype._rootToNode = function (e) {
            e !== this.seriesModel.getViewRoot() &&
              this.api.dispatchAction({
                type: x,
                from: this.uid,
                seriesId: this.seriesModel.id,
                targetNode: e,
              });
          }),
          (t.prototype.containPoint = function (e, t) {
            var a = t.getData().getItemLayout(0);
            if (a) {
              var n = e[0] - a.cx,
                o = e[1] - a.cy,
                i = Math.sqrt(n * n + o * o);
              return i <= a.r && i >= a.r0;
            }
          }),
          (t.type = 'sunburst'),
          t
        );
      })(i.A);
      var A = a(347355),
        L = a(315719),
        _ = a(143172),
        M = a(868866);
      function D(e) {
        var t = 0;
        o.each(e.children, function (e) {
          D(e);
          var a = e.value;
          (o.isArray(a) && (a = a[0]), (t += a));
        });
        var a = e.value;
        (o.isArray(a) && (a = a[0]),
          (null == a || isNaN(a)) && (a = t),
          a < 0 && (a = 0),
          o.isArray(e.value) ? (e.value[0] = a) : (e.value = a));
      }
      const N = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), (a.ignoreStyleOnData = !0), a);
        }
        return (
          (0, n.__extends)(t, e),
          (t.prototype.getInitialData = function (e, t) {
            var a = { name: e.name, children: e.data };
            D(a);
            var n = (this._levelModels = o.map(
                e.levels || [],
                function (e) {
                  return new _.A(e, this, t);
                },
                this,
              )),
              i = L.A.createTree(a, this, function (e) {
                e.wrapMethod('getItemModel', function (e, t) {
                  var a = i.getNodeByDataIndex(t),
                    o = n[a.depth];
                  return (o && (e.parentModel = o), e);
                });
              });
            return i.data;
          }),
          (t.prototype.optionUpdated = function () {
            this.resetViewRoot();
          }),
          (t.prototype.getDataParams = function (t) {
            var a = e.prototype.getDataParams.apply(this, arguments),
              n = this.getData().tree.getNodeByDataIndex(t);
            return ((a.treePathInfo = (0, m.ev)(n, this)), a);
          }),
          (t.prototype.getLevelModel = function (e) {
            return this._levelModels && this._levelModels[e.depth];
          }),
          (t.prototype.getViewRoot = function () {
            return this._viewRoot;
          }),
          (t.prototype.resetViewRoot = function (e) {
            e ? (this._viewRoot = e) : (e = this._viewRoot);
            var t = this.getRawData().tree.root;
            (e && (e === t || t.contains(e))) || (this._viewRoot = t);
          }),
          (t.prototype.enableAriaDecal = function () {
            (0, M.A)(this);
          }),
          (t.type = 'series.sunburst'),
          (t.defaultOption = {
            z: 2,
            center: ['50%', '50%'],
            radius: [0, '75%'],
            clockwise: !0,
            startAngle: 90,
            minAngle: 0,
            stillShowZeroSum: !0,
            nodeClick: 'rootToNode',
            renderLabelForZeroData: !1,
            label: {
              rotate: 'radial',
              show: !0,
              opacity: 1,
              align: 'center',
              position: 'inside',
              distance: 5,
              silent: !0,
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: 'white',
              borderType: 'solid',
              shadowBlur: 0,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            },
            emphasis: { focus: 'descendant' },
            blur: { itemStyle: { opacity: 0.2 }, label: { opacity: 0.1 } },
            animationType: 'expansion',
            animationDuration: 1e3,
            animationDurationUpdate: 500,
            data: [],
            sort: 'desc',
          }),
          t
        );
      })(A.A);
      var T = Math.PI / 180;
      function C(e, t, a) {
        t.eachSeriesByType(e, function (e) {
          var t = e.get('center'),
            n = e.get('radius');
          (o.isArray(n) || (n = [0, n]), o.isArray(t) || (t = [t, t]));
          var i = a.getWidth(),
            r = a.getHeight(),
            l = Math.min(i, r),
            s = (0, y.lo)(t[0], i),
            d = (0, y.lo)(t[1], r),
            u = (0, y.lo)(n[0], l / 2),
            h = (0, y.lo)(n[1], l / 2),
            c = -e.get('startAngle') * T,
            p = e.get('minAngle') * T,
            g = e.getData().tree.root,
            f = e.getViewRoot(),
            v = f.depth,
            m = e.get('sort');
          null != m && V(f, m);
          var x = 0;
          o.each(f.children, function (e) {
            !isNaN(e.getValue()) && x++;
          });
          var w = f.getValue(),
            b = (Math.PI / (w || x)) * 2,
            I = f.depth > 0,
            S = f.height - (I ? -1 : 1),
            A = (h - u) / (S || 1),
            L = e.get('clockwise'),
            _ = e.get('stillShowZeroSum'),
            M = L ? 1 : -1,
            D = function (t, a) {
              if (t) {
                var n = a;
                if (t !== g) {
                  var i = t.getValue(),
                    r = 0 === w && _ ? b : i * b;
                  (r < p && (r = p), (n = a + M * r));
                  var h = t.depth - v - (I ? -1 : 1),
                    c = u + A * h,
                    f = u + A * (h + 1),
                    m = e.getLevelModel(t);
                  if (m) {
                    var x = m.get('r0', !0),
                      S = m.get('r', !0),
                      N = m.get('radius', !0);
                    (null != N && ((x = N[0]), (S = N[1])),
                      null != x && (c = (0, y.lo)(x, l / 2)),
                      null != S && (f = (0, y.lo)(S, l / 2)));
                  }
                  t.setLayout({
                    angle: r,
                    startAngle: a,
                    endAngle: n,
                    clockwise: L,
                    cx: s,
                    cy: d,
                    r0: c,
                    r: f,
                  });
                }
                if (t.children && t.children.length) {
                  var T = 0;
                  o.each(t.children, function (e) {
                    T += D(e, a + T);
                  });
                }
                return n - a;
              }
            };
          if (I) {
            var N = u,
              C = u + A,
              R = 2 * Math.PI;
            g.setLayout({
              angle: R,
              startAngle: c,
              endAngle: c + R,
              clockwise: L,
              cx: s,
              cy: d,
              r0: N,
              r: C,
            });
          }
          D(f, c);
        });
      }
      function V(e, t) {
        var a = e.children || [];
        ((e.children = (function (e, t) {
          if (o.isFunction(t)) {
            var a = o.map(e, function (e, t) {
              var a = e.getValue();
              return {
                params: {
                  depth: e.depth,
                  height: e.height,
                  dataIndex: e.dataIndex,
                  getValue: function () {
                    return a;
                  },
                },
                index: t,
              };
            });
            return (
              a.sort(function (e, a) {
                return t(e.params, a.params);
              }),
              o.map(a, function (t) {
                return e[t.index];
              })
            );
          }
          var n = 'asc' === t;
          return e.sort(function (e, t) {
            var a = (e.getValue() - t.getValue()) * (n ? 1 : -1);
            return 0 === a ? (e.dataIndex - t.dataIndex) * (n ? -1 : 1) : a;
          });
        })(a, t)),
          a.length &&
            o.each(e.children, function (e) {
              V(e, t);
            }));
      }
      var R = a(747698);
      function P(e) {
        var t = {};
        e.eachSeriesByType('sunburst', function (e) {
          var a = e.getData(),
            n = a.tree;
          n.eachNode(function (i) {
            var r = i.getModel().getModel('itemStyle').getItemStyle();
            r.fill ||
              (r.fill = (function (e, a, n) {
                for (var i = e; i && i.depth > 1;) i = i.parentNode;
                var r = a.getColorFromPalette(i.name || i.dataIndex + '', t);
                return (
                  e.depth > 1 &&
                    (0, o.isString)(r) &&
                    (r = (0, R.lift)(r, ((e.depth - 1) / (n - 1)) * 0.5)),
                  r
                );
              })(i, e, n.root.height));
            var l = a.ensureUniqueItemVisual(i.dataIndex, 'style');
            (0, o.extend)(l, r);
          });
        });
      }
      var E = a(878587);
      function k(e) {
        (e.registerChartView(S),
          e.registerSeriesModel(N),
          e.registerLayout((0, o.curry)(C, 'sunburst')),
          e.registerProcessor((0, o.curry)(E.A, 'sunburst')),
          e.registerVisual(P),
          (function (e) {
            (e.registerAction({ type: x, update: 'updateView' }, function (e, t) {
              t.eachComponent(
                { mainType: 'series', subType: 'sunburst', query: e },
                function (t, a) {
                  var n = (0, m.mw)(e, [x], t);
                  if (n) {
                    var o = t.getViewRoot();
                    (o && (e.direction = (0, m.x5)(o, n.node) ? 'rollUp' : 'drillDown'),
                      t.resetViewRoot(n.node));
                  }
                },
              );
            }),
              e.registerAction({ type: w, update: 'none' }, function (e, t, a) {
                ((e = (0, o.extend)({}, e)),
                  t.eachComponent(
                    { mainType: 'series', subType: 'sunburst', query: e },
                    function (t) {
                      var a = (0, m.mw)(e, [w], t);
                      a && (e.dataIndex = a.node.dataIndex);
                    },
                  ),
                  a.dispatchAction((0, o.extend)(e, { type: 'highlight' })));
              }),
              e.registerAction({ type: b, update: 'updateView' }, function (e, t, a) {
                ((e = (0, o.extend)({}, e)),
                  a.dispatchAction((0, o.extend)(e, { type: 'downplay' })));
              }));
          })(e));
      }
    },
    609895: (e, t, a) => {
      a.d(t, { a: () => L });
      var n = a(15215),
        o = a(553364),
        i = a(843870),
        r = a(683257),
        l = a(830010),
        s = a(34833),
        d = a(289632),
        u = a(498026),
        h = a(716563);
      const c = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), (a._layers = []), a);
        }
        return (
          (0, n.__extends)(t, e),
          (t.prototype.render = function (e, t, a) {
            var n = e.getData(),
              c = this,
              p = this.group,
              g = e.getLayerSeries(),
              y = n.getLayout('layoutInfo'),
              f = y.rect,
              v = y.boundaryGap;
            function m(e) {
              return e.name;
            }
            ((p.x = 0), (p.y = f.y + v[0]));
            var x = new h.A(this._layersSeries || [], g, m, m),
              w = [];
            function b(t, a, u) {
              var h = c._layers;
              if ('remove' !== t) {
                for (var y, f, v = [], m = [], x = g[a].indices, b = 0; b < x.length; b++) {
                  var I = n.getItemLayout(x[b]),
                    S = I.x,
                    A = I.y0,
                    L = I.y;
                  (v.push(S, A), m.push(S, A + L), (y = n.getItemVisual(x[b], 'style')));
                }
                var _ = n.getItemLayout(x[0]),
                  M = e.getModel('label').get('margin'),
                  D = e.getModel('emphasis');
                if ('add' === t) {
                  var N = (w[a] = new i.A());
                  ((f = new o.z({
                    shape: {
                      points: v,
                      stackedOnPoints: m,
                      smooth: 0.4,
                      stackedOnSmooth: 0.4,
                      smoothConstraint: !1,
                    },
                    z2: 0,
                  })),
                    N.add(f),
                    p.add(N),
                    e.isAnimationEnabled() &&
                      f.setClipPath(
                        (function (e, t) {
                          var a = new l.A({
                            shape: { x: e.x - 10, y: e.y - 10, width: 0, height: e.height + 20 },
                          });
                          return (
                            r.LW(
                              a,
                              {
                                shape: { x: e.x - 50, width: e.width + 100, height: e.height + 20 },
                              },
                              t,
                              function () {
                                f.removeClipPath();
                              },
                            ),
                            a
                          );
                        })(f.getBoundingRect(), e),
                      ));
                } else
                  ((N = h[u]),
                    (f = N.childAt(0)),
                    p.add(N),
                    (w[a] = N),
                    r.oi(f, { shape: { points: v, stackedOnPoints: m } }, e),
                    (0, r.ap)(f));
                ((0, d.qM)(
                  f,
                  (0, d.lx)(e),
                  {
                    labelDataIndex: x[b - 1],
                    defaultText: n.getName(x[b - 1]),
                    inheritColor: y.fill,
                  },
                  { normal: { verticalAlign: 'middle' } },
                ),
                  f.setTextConfig({ position: null, local: !0 }));
                var T = f.getTextContent();
                (T && ((T.x = _.x - M), (T.y = _.y0 + _.y / 2)),
                  f.useStyle(y),
                  n.setItemGraphicEl(a, f),
                  (0, s.Mx)(f, e),
                  (0, s.Lm)(f, D.get('focus'), D.get('blurScope'), D.get('disabled')));
              } else p.remove(h[a]);
            }
            (x
              .add((0, u.bind)(b, this, 'add'))
              .update((0, u.bind)(b, this, 'update'))
              .remove((0, u.bind)(b, this, 'remove'))
              .execute(),
              (this._layersSeries = g),
              (this._layers = w));
          }),
          (t.type = 'themeRiver'),
          t
        );
      })(a(106666).A);
      var p = a(347355),
        g = a(297351),
        y = a(229756),
        f = a(6006),
        v = a(48170),
        m = a(958239),
        x = a(603961);
      const w = (function (e) {
        function t() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          return ((a.type = t.type), a);
        }
        return (
          (0, n.__extends)(t, e),
          (t.prototype.init = function (t) {
            (e.prototype.init.apply(this, arguments),
              (this.legendVisualProvider = new m.A(
                u.bind(this.getData, this),
                u.bind(this.getRawData, this),
              )));
          }),
          (t.prototype.fixData = function (e) {
            var t = e.length,
              a = {},
              n = (0, v.Sq)(e, function (e) {
                return (a.hasOwnProperty(e[0] + '') || (a[e[0] + ''] = -1), e[2]);
              }),
              o = [];
            n.buckets.each(function (e, t) {
              o.push({ name: t, dataList: e });
            });
            for (var i = o.length, r = 0; r < i; ++r) {
              for (var l = o[r].name, s = 0; s < o[r].dataList.length; ++s) {
                var d = o[r].dataList[s][0] + '';
                a[d] = r;
              }
              for (var d in a)
                a.hasOwnProperty(d) && a[d] !== r && ((a[d] = r), (e[t] = [d, 0, l]), t++);
            }
            return e;
          }),
          (t.prototype.getInitialData = function (e, t) {
            for (
              var a = this.getReferringComponents('singleAxis', v.US).models[0].get('type'),
                n = u.filter(e.data, function (e) {
                  return void 0 !== e[2];
                }),
                o = this.fixData(n || []),
                i = [],
                r = (this.nameMap = u.createHashMap()),
                l = 0,
                s = 0;
              s < o.length;
              ++s
            )
              (i.push(o[s][2]), r.get(o[s][2]) || (r.set(o[s][2], l), l++));
            var d = (0, g.A)(o, {
                coordDimensions: ['single'],
                dimensionsDefine: [
                  { name: 'time', type: (0, y.B)(a) },
                  { name: 'value', type: 'float' },
                  { name: 'name', type: 'ordinal' },
                ],
                encodeDefine: { single: 0, value: 1, itemName: 2 },
              }).dimensions,
              h = new f.A(d, this);
            return (h.initData(o), h);
          }),
          (t.prototype.getLayerSeries = function () {
            for (var e = this.getData(), t = e.count(), a = [], n = 0; n < t; ++n) a[n] = n;
            var o = e.mapDimension('single'),
              i = (0, v.Sq)(a, function (t) {
                return e.get('name', t);
              }),
              r = [];
            return (
              i.buckets.each(function (t, a) {
                (t.sort(function (t, a) {
                  return e.get(o, t) - e.get(o, a);
                }),
                  r.push({ name: a, indices: t }));
              }),
              r
            );
          }),
          (t.prototype.getAxisTooltipData = function (e, t, a) {
            u.isArray(e) || (e = e ? [e] : []);
            for (
              var n, o = this.getData(), i = this.getLayerSeries(), r = [], l = i.length, s = 0;
              s < l;
              ++s
            ) {
              for (var d = Number.MAX_VALUE, h = -1, c = i[s].indices.length, p = 0; p < c; ++p) {
                var g = o.get(e[0], i[s].indices[p]),
                  y = Math.abs(g - t);
                y <= d && ((n = g), (d = y), (h = i[s].indices[p]));
              }
              r.push(h);
            }
            return { dataIndices: r, nestestValue: n };
          }),
          (t.prototype.formatTooltip = function (e, t, a) {
            var n = this.getData(),
              o = n.getName(e),
              i = n.get(n.mapDimension('value'), e);
            return (0, x.Qx)('nameValue', { name: o, value: i });
          }),
          (t.type = 'series.themeRiver'),
          (t.dependencies = ['singleAxis']),
          (t.defaultOption = {
            z: 2,
            colorBy: 'data',
            coordinateSystem: 'singleAxis',
            boundaryGap: ['10%', '10%'],
            singleAxisIndex: 0,
            animationEasing: 'linear',
            label: { margin: 4, show: !0, position: 'left', fontSize: 11 },
            emphasis: { label: { show: !0 } },
          }),
          t
        );
      })(p.A);
      var b = a(624326);
      function I(e, t) {
        e.eachSeriesByType('themeRiver', function (e) {
          var t = e.getData(),
            a = e.coordinateSystem,
            n = {},
            o = a.getRect();
          n.rect = o;
          var i = e.get('boundaryGap'),
            r = a.getAxis();
          ((n.boundaryGap = i),
            'horizontal' === r.orient
              ? ((i[0] = b.lo(i[0], o.height)),
                (i[1] = b.lo(i[1], o.height)),
                S(t, e, o.height - i[0] - i[1]))
              : ((i[0] = b.lo(i[0], o.width)),
                (i[1] = b.lo(i[1], o.width)),
                S(t, e, o.width - i[0] - i[1])),
            t.setLayout('layoutInfo', n));
        });
      }
      function S(e, t, a) {
        if (e.count())
          for (
            var n,
              o = t.coordinateSystem,
              i = t.getLayerSeries(),
              r = e.mapDimension('single'),
              l = e.mapDimension('value'),
              s = u.map(i, function (t) {
                return u.map(t.indices, function (t) {
                  var a = o.dataToPoint(e.get(r, t));
                  return ((a[1] = e.get(l, t)), a);
                });
              }),
              d = (function (e) {
                for (var t = e.length, a = e[0].length, n = [], o = [], i = 0, r = 0; r < a; ++r) {
                  for (var l = 0, s = 0; s < t; ++s) l += e[s][r][1];
                  (l > i && (i = l), n.push(l));
                }
                for (var d = 0; d < a; ++d) o[d] = (i - n[d]) / 2;
                i = 0;
                for (var u = 0; u < a; ++u) {
                  var h = n[u] + o[u];
                  h > i && (i = h);
                }
                return { y0: o, max: i };
              })(s),
              h = d.y0,
              c = a / d.max,
              p = i.length,
              g = i[0].indices.length,
              y = 0;
            y < g;
            ++y
          ) {
            ((n = h[y] * c),
              e.setItemLayout(i[0].indices[y], {
                layerIndex: 0,
                x: s[0][y][0],
                y0: n,
                y: s[0][y][1] * c,
              }));
            for (var f = 1; f < p; ++f)
              ((n += s[f - 1][y][1] * c),
                e.setItemLayout(i[f].indices[y], {
                  layerIndex: f,
                  x: s[f][y][0],
                  y0: n,
                  y: s[f][y][1] * c,
                }));
          }
      }
      var A = a(878587);
      function L(e) {
        (e.registerChartView(c),
          e.registerSeriesModel(w),
          e.registerLayout(I),
          e.registerProcessor((0, A.A)('themeRiver')));
      }
    },
    31441: (e, t, a) => {
      a.d(t, { a: () => Q });
      var n = a(15215),
        o = a(498026),
        i = a(843870),
        r = a(683257),
        l = a(853849),
        s = a(669622),
        d = a(10128),
        u = a(834253);
      function h(e, t) {
        var a = e.isExpand ? e.children : [],
          n = e.parentNode.children,
          o = e.hierNode.i ? n[e.hierNode.i - 1] : null;
        if (a.length) {
          !(function (e) {
            for (var t = e.children, a = t.length, n = 0, o = 0; --a >= 0;) {
              var i = t[a];
              ((i.hierNode.prelim += n),
                (i.hierNode.modifier += n),
                (o += i.hierNode.change),
                (n += i.hierNode.shift + o));
            }
          })(e);
          var i = (a[0].hierNode.prelim + a[a.length - 1].hierNode.prelim) / 2;
          o
            ? ((e.hierNode.prelim = o.hierNode.prelim + t(e, o)),
              (e.hierNode.modifier = e.hierNode.prelim - i))
            : (e.hierNode.prelim = i);
        } else o && (e.hierNode.prelim = o.hierNode.prelim + t(e, o));
        e.parentNode.hierNode.defaultAncestor = (function (e, t, a, n) {
          if (t) {
            for (
              var o = e,
                i = e,
                r = i.parentNode.children[0],
                l = t,
                s = o.hierNode.modifier,
                d = i.hierNode.modifier,
                u = r.hierNode.modifier,
                h = l.hierNode.modifier;
              (l = f(l)), (i = v(i)), l && i;
            ) {
              ((o = f(o)), (r = v(r)), (o.hierNode.ancestor = e));
              var c = l.hierNode.prelim + h - i.hierNode.prelim - d + n(l, i);
              (c > 0 && (x(m(l, e, a), e, c), (d += c), (s += c)),
                (h += l.hierNode.modifier),
                (d += i.hierNode.modifier),
                (s += o.hierNode.modifier),
                (u += r.hierNode.modifier));
            }
            (l && !f(o) && ((o.hierNode.thread = l), (o.hierNode.modifier += h - s)),
              i && !v(r) && ((r.hierNode.thread = i), (r.hierNode.modifier += d - u), (a = e)));
          }
          return a;
        })(e, o, e.parentNode.hierNode.defaultAncestor || n[0], t);
      }
      function c(e) {
        var t = e.hierNode.prelim + e.parentNode.hierNode.modifier;
        (e.setLayout({ x: t }, !0), (e.hierNode.modifier += e.parentNode.hierNode.modifier));
      }
      function p(e) {
        return arguments.length ? e : w;
      }
      function g(e, t) {
        return ((e -= Math.PI / 2), { x: t * Math.cos(e), y: t * Math.sin(e) });
      }
      function y(e, t) {
        return u.dV(e.getBoxLayoutParams(), { width: t.getWidth(), height: t.getHeight() });
      }
      function f(e) {
        var t = e.children;
        return t.length && e.isExpand ? t[t.length - 1] : e.hierNode.thread;
      }
      function v(e) {
        var t = e.children;
        return t.length && e.isExpand ? t[0] : e.hierNode.thread;
      }
      function m(e, t, a) {
        return e.hierNode.ancestor.parentNode === t.parentNode ? e.hierNode.ancestor : a;
      }
      function x(e, t, a) {
        var n = a / (t.hierNode.i - e.hierNode.i);
        ((t.hierNode.change -= n),
          (t.hierNode.shift += a),
          (t.hierNode.modifier += a),
          (t.hierNode.prelim += a),
          (e.hierNode.change += n));
      }
      function w(e, t) {
        return e.parentNode === t.parentNode ? 1 : 2;
      }
      var b = a(248813),
        I = a(556219),
        S = a(956366),
        A = a(281722),
        L = a(572589),
        _ = a(624326),
        M = a(106666),
        D = a(467065),
        N = a(34833),
        T = function () {
          ((this.parentPoint = []), (this.childPoints = []));
        },
        C = (function (e) {
          function t(t) {
            return e.call(this, t) || this;
          }
          return (
            (0, n.__extends)(t, e),
            (t.prototype.getDefaultStyle = function () {
              return { stroke: '#000', fill: null };
            }),
            (t.prototype.getDefaultShape = function () {
              return new T();
            }),
            (t.prototype.buildPath = function (e, t) {
              var a = t.childPoints,
                n = a.length,
                o = t.parentPoint,
                i = a[0],
                r = a[n - 1];
              if (1 === n) return (e.moveTo(o[0], o[1]), void e.lineTo(i[0], i[1]));
              var l = t.orient,
                s = 'TB' === l || 'BT' === l ? 0 : 1,
                d = 1 - s,
                u = (0, _.lo)(t.forkPosition, 1),
                h = [];
              ((h[s] = o[s]),
                (h[d] = o[d] + (r[d] - o[d]) * u),
                e.moveTo(o[0], o[1]),
                e.lineTo(h[0], h[1]),
                e.moveTo(i[0], i[1]),
                (h[s] = i[s]),
                e.lineTo(h[0], h[1]),
                (h[s] = r[s]),
                e.lineTo(h[0], h[1]),
                e.lineTo(r[0], r[1]));
              for (var c = 1; c < n - 1; c++) {
                var p = a[c];
                (e.moveTo(p[0], p[1]), (h[s] = p[s]), e.lineTo(h[0], h[1]));
              }
            }),
            t
          );
        })(D.Ay),
        V = (function (e) {
          function t() {
            var a = (null !== e && e.apply(this, arguments)) || this;
            return ((a.type = t.type), (a._mainGroup = new i.A()), a);
          }
          return (
            (0, n.__extends)(t, e),
            (t.prototype.init = function (e, t) {
              ((this._controller = new A.A(t.getZr())),
                (this._controllerHost = { target: this.group }),
                this.group.add(this._mainGroup));
            }),
            (t.prototype.render = function (e, t, a) {
              var n = e.getData(),
                o = e.layoutInfo,
                i = this._mainGroup;
              ('radial' === e.get('layout')
                ? ((i.x = o.x + o.width / 2), (i.y = o.y + o.height / 2))
                : ((i.x = o.x), (i.y = o.y)),
                this._updateViewCoordSys(e, a),
                this._updateController(e, t, a));
              var r = this._data;
              (n
                .diff(r)
                .add(function (t) {
                  R(n, t) && P(n, t, null, i, e);
                })
                .update(function (t, a) {
                  var o = r.getItemGraphicEl(a);
                  R(n, t) ? P(n, t, o, i, e) : o && G(r, a, o, i, e);
                })
                .remove(function (t) {
                  var a = r.getItemGraphicEl(t);
                  a && G(r, t, a, i, e);
                })
                .execute(),
                (this._nodeScaleRatio = e.get('nodeScaleRatio')),
                this._updateNodeAndLinkScale(e),
                !0 === e.get('expandAndCollapse') &&
                  n.eachItemGraphicEl(function (t, n) {
                    t.off('click').on('click', function () {
                      a.dispatchAction({
                        type: 'treeExpandAndCollapse',
                        seriesId: e.id,
                        dataIndex: n,
                      });
                    });
                  }),
                (this._data = n));
            }),
            (t.prototype._updateViewCoordSys = function (e, t) {
              var a = e.getData(),
                n = [];
              a.each(function (e) {
                var t = a.getItemLayout(e);
                !t || isNaN(t.x) || isNaN(t.y) || n.push([+t.x, +t.y]);
              });
              var o = [],
                i = [];
              b.Cr(n, o, i);
              var r = this._min,
                l = this._max;
              (i[0] - o[0] === 0 && ((o[0] = r ? r[0] : o[0] - 1), (i[0] = l ? l[0] : i[0] + 1)),
                i[1] - o[1] === 0 && ((o[1] = r ? r[1] : o[1] - 1), (i[1] = l ? l[1] : i[1] + 1)));
              var s = (e.coordinateSystem = new I.A());
              ((s.zoomLimit = e.get('scaleLimit')),
                s.setBoundingRect(o[0], o[1], i[0] - o[0], i[1] - o[1]),
                s.setCenter(e.get('center'), t),
                s.setZoom(e.get('zoom')),
                this.group.attr({ x: s.x, y: s.y, scaleX: s.scaleX, scaleY: s.scaleY }),
                (this._min = o),
                (this._max = i));
            }),
            (t.prototype._updateController = function (e, t, a) {
              var n = this,
                o = this._controller,
                i = this._controllerHost,
                r = this.group;
              (o.setPointerChecker(function (t, n, o) {
                var i = r.getBoundingRect();
                return (i.applyTransform(r.transform), i.contain(n, o) && !(0, L.I)(t, a, e));
              }),
                o.enable(e.get('roam')),
                (i.zoomLimit = e.get('scaleLimit')),
                (i.zoom = e.coordinateSystem.getZoom()),
                o
                  .off('pan')
                  .off('zoom')
                  .on('pan', function (t) {
                    (S.t(i, t.dx, t.dy),
                      a.dispatchAction({ seriesId: e.id, type: 'treeRoam', dx: t.dx, dy: t.dy }));
                  })
                  .on('zoom', function (t) {
                    (S.x(i, t.scale, t.originX, t.originY),
                      a.dispatchAction({
                        seriesId: e.id,
                        type: 'treeRoam',
                        zoom: t.scale,
                        originX: t.originX,
                        originY: t.originY,
                      }),
                      n._updateNodeAndLinkScale(e),
                      a.updateLabelLayout());
                  }));
            }),
            (t.prototype._updateNodeAndLinkScale = function (e) {
              var t = e.getData(),
                a = this._getNodeGlobalScale(e);
              t.eachItemGraphicEl(function (e, t) {
                e.setSymbolScale(a);
              });
            }),
            (t.prototype._getNodeGlobalScale = function (e) {
              var t = e.coordinateSystem;
              if ('view' !== t.type) return 1;
              var a = this._nodeScaleRatio,
                n = t.scaleX || 1;
              return ((t.getZoom() - 1) * a + 1) / n;
            }),
            (t.prototype.dispose = function () {
              (this._controller && this._controller.dispose(), (this._controllerHost = null));
            }),
            (t.prototype.remove = function () {
              (this._mainGroup.removeAll(), (this._data = null));
            }),
            (t.type = 'tree'),
            t
          );
        })(M.A);
      function R(e, t) {
        var a = e.getItemLayout(t);
        return a && !isNaN(a.x) && !isNaN(a.y);
      }
      function P(e, t, a, n, i) {
        var u = !a,
          h = e.tree.getNodeByDataIndex(t),
          c = h.getModel(),
          p = h.getVisual('style').fill,
          g = !1 === h.isExpand && 0 !== h.children.length ? p : '#fff',
          y = e.tree.root,
          f = h.parentNode === y ? h : h.parentNode || h,
          v = e.getItemGraphicEl(f.dataIndex),
          m = f.getLayout(),
          x = v
            ? { x: v.__oldX, y: v.__oldY, rawX: v.__radialOldRawX, rawY: v.__radialOldRawY }
            : m,
          w = h.getLayout();
        (u
          ? (((a = new d.A(e, t, null, { symbolInnerColor: g, useNameLabel: !0 })).x = x.x),
            (a.y = x.y))
          : a.updateData(e, t, null, { symbolInnerColor: g, useNameLabel: !0 }),
          (a.__radialOldRawX = a.__radialRawX),
          (a.__radialOldRawY = a.__radialRawY),
          (a.__radialRawX = w.rawX),
          (a.__radialRawY = w.rawY),
          n.add(a),
          e.setItemGraphicEl(t, a),
          (a.__oldX = a.x),
          (a.__oldY = a.y),
          r.oi(a, { x: w.x, y: w.y }, i));
        var b = a.getSymbolPath();
        if ('radial' === i.get('layout')) {
          var I = y.children[0],
            S = I.getLayout(),
            A = I.children.length,
            L = void 0,
            _ = void 0;
          if (w.x === S.x && !0 === h.isExpand && I.children.length) {
            var M = {
              x: (I.children[0].getLayout().x + I.children[A - 1].getLayout().x) / 2,
              y: (I.children[0].getLayout().y + I.children[A - 1].getLayout().y) / 2,
            };
            ((L = Math.atan2(M.y - S.y, M.x - S.x)) < 0 && (L = 2 * Math.PI + L),
              (_ = M.x < S.x) && (L -= Math.PI));
          } else
            ((L = Math.atan2(w.y - S.y, w.x - S.x)) < 0 && (L = 2 * Math.PI + L),
              0 === h.children.length || (0 !== h.children.length && !1 === h.isExpand)
                ? (_ = w.x < S.x) && (L -= Math.PI)
                : (_ = w.x > S.x) || (L -= Math.PI));
          var D = _ ? 'left' : 'right',
            T = c.getModel('label'),
            V = T.get('rotate'),
            R = V * (Math.PI / 180),
            P = b.getTextContent();
          P &&
            (b.setTextConfig({
              position: T.get('position') || D,
              rotation: null == V ? -L : R,
              origin: 'center',
            }),
            P.setStyle('verticalAlign', 'middle'));
        }
        var E = c.get(['emphasis', 'focus']),
          k =
            'relative' === E
              ? o.concatArray(h.getAncestorsIndices(), h.getDescendantIndices())
              : 'ancestor' === E
                ? h.getAncestorsIndices()
                : 'descendant' === E
                  ? h.getDescendantIndices()
                  : null;
        (k && ((0, s.z)(a).focus = k),
          (function (e, t, a, n, i, s, d, u) {
            var h = t.getModel(),
              c = e.get('edgeShape'),
              p = e.get('layout'),
              g = e.getOrient(),
              y = e.get(['lineStyle', 'curveness']),
              f = e.get('edgeForkPosition'),
              v = h.getModel('lineStyle').getLineStyle(),
              m = n.__edge;
            if ('curve' === c)
              t.parentNode &&
                t.parentNode !== a &&
                (m || (m = n.__edge = new l.A({ shape: z(p, g, y, i, i) })),
                r.oi(m, { shape: z(p, g, y, s, d) }, e));
            else if (
              'polyline' === c &&
              'orthogonal' === p &&
              t !== a &&
              t.children &&
              0 !== t.children.length &&
              !0 === t.isExpand
            ) {
              for (var x = t.children, w = [], b = 0; b < x.length; b++) {
                var I = x[b].getLayout();
                w.push([I.x, I.y]);
              }
              (m ||
                (m = n.__edge =
                  new C({
                    shape: {
                      parentPoint: [d.x, d.y],
                      childPoints: [[d.x, d.y]],
                      orient: g,
                      forkPosition: f,
                    },
                  })),
                r.oi(m, { shape: { parentPoint: [d.x, d.y], childPoints: w } }, e));
            }
            m &&
              ('polyline' !== c || t.isExpand) &&
              (m.useStyle(o.defaults({ strokeNoScale: !0, fill: null }, v)),
              (0, N.Mx)(m, h, 'lineStyle'),
              (0, N.DW)(m),
              u.add(m));
          })(i, h, y, a, x, m, w, n),
          a.__edge &&
            (a.onHoverStateChange = function (t) {
              if ('blur' !== t) {
                var n = h.parentNode && e.getItemGraphicEl(h.parentNode.dataIndex);
                (n && n.hoverState === N.zX) || (0, N.Pk)(a.__edge, t);
              }
            }));
      }
      function E(e, t, a, n, o) {
        var i = k(t.tree.root, e),
          l = i.source,
          s = i.sourceLayout,
          d = t.getItemGraphicEl(e.dataIndex);
        if (d) {
          var u = t.getItemGraphicEl(l.dataIndex).__edge,
            h = d.__edge || (!1 === l.isExpand || 1 === l.children.length ? u : void 0),
            c = n.get('edgeShape'),
            p = n.get('layout'),
            g = n.get('orient'),
            y = n.get(['lineStyle', 'curveness']);
          h &&
            ('curve' === c
              ? r.Nz(h, { shape: z(p, g, y, s, s), style: { opacity: 0 } }, n, {
                  cb: function () {
                    a.remove(h);
                  },
                  removeOpt: o,
                })
              : 'polyline' === c &&
                'orthogonal' === n.get('layout') &&
                r.Nz(
                  h,
                  {
                    shape: { parentPoint: [s.x, s.y], childPoints: [[s.x, s.y]] },
                    style: { opacity: 0 },
                  },
                  n,
                  {
                    cb: function () {
                      a.remove(h);
                    },
                    removeOpt: o,
                  },
                ));
        }
      }
      function k(e, t) {
        for (var a, n = t.parentNode === e ? t : t.parentNode || t; null == (a = n.getLayout());)
          n = n.parentNode === e ? n : n.parentNode || n;
        return { source: n, sourceLayout: a };
      }
      function G(e, t, a, n, o) {
        var i = e.tree.getNodeByDataIndex(t),
          l = k(e.tree.root, i).sourceLayout,
          s = {
            duration: o.get('animationDurationUpdate'),
            easing: o.get('animationEasingUpdate'),
          };
        (r.Nz(a, { x: l.x + 1, y: l.y + 1 }, o, {
          cb: function () {
            (n.remove(a), e.setItemGraphicEl(t, null));
          },
          removeOpt: s,
        }),
          a.fadeOut(null, e.hostModel, { fadeLabel: !0, animation: s }),
          i.children.forEach(function (t) {
            E(t, e, n, o, s);
          }),
          E(i, e, n, o, s));
      }
      function z(e, t, a, n, o) {
        var i, r, l, s, d, u, h, c;
        if ('radial' === e) {
          ((d = n.rawX), (h = n.rawY), (u = o.rawX), (c = o.rawY));
          var p = g(d, h),
            y = g(d, h + (c - h) * a),
            f = g(u, c + (h - c) * a),
            v = g(u, c);
          return {
            x1: p.x || 0,
            y1: p.y || 0,
            x2: v.x || 0,
            y2: v.y || 0,
            cpx1: y.x || 0,
            cpy1: y.y || 0,
            cpx2: f.x || 0,
            cpy2: f.y || 0,
          };
        }
        return (
          (d = n.x),
          (h = n.y),
          (u = o.x),
          (c = o.y),
          ('LR' !== t && 'RL' !== t) ||
            ((i = d + (u - d) * a), (r = h), (l = u + (d - u) * a), (s = c)),
          ('TB' !== t && 'BT' !== t) ||
            ((i = d), (r = h + (c - h) * a), (l = u), (s = c + (h - c) * a)),
          { x1: d, y1: h, x2: u, y2: c, cpx1: i, cpy1: r, cpx2: l, cpy2: s }
        );
      }
      const B = V;
      var O = a(347355),
        W = a(315719),
        H = a(143172),
        Y = a(603961),
        X = a(41616);
      const q = (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          return ((t.hasSymbolVisual = !0), (t.ignoreStyleOnData = !0), t);
        }
        return (
          (0, n.__extends)(t, e),
          (t.prototype.getInitialData = function (e) {
            var t = { name: e.name, children: e.data },
              a = e.leaves || {},
              n = new H.A(a, this, this.ecModel),
              o = W.A.createTree(t, this, function (e) {
                e.wrapMethod('getItemModel', function (e, t) {
                  var a = o.getNodeByDataIndex(t);
                  return ((a && a.children.length && a.isExpand) || (e.parentModel = n), e);
                });
              }),
              i = 0;
            o.eachNode('preorder', function (e) {
              e.depth > i && (i = e.depth);
            });
            var r = e.expandAndCollapse && e.initialTreeDepth >= 0 ? e.initialTreeDepth : i;
            return (
              o.root.eachNode('preorder', function (e) {
                var t = e.hostTree.data.getRawDataItem(e.dataIndex);
                e.isExpand = t && null != t.collapsed ? !t.collapsed : e.depth <= r;
              }),
              o.data
            );
          }),
          (t.prototype.getOrient = function () {
            var e = this.get('orient');
            return ('horizontal' === e ? (e = 'LR') : 'vertical' === e && (e = 'TB'), e);
          }),
          (t.prototype.setZoom = function (e) {
            this.option.zoom = e;
          }),
          (t.prototype.setCenter = function (e) {
            this.option.center = e;
          }),
          (t.prototype.formatTooltip = function (e, t, a) {
            for (
              var n = this.getData().tree,
                o = n.root.children[0],
                i = n.getNodeByDataIndex(e),
                r = i.getValue(),
                l = i.name;
              i && i !== o;
            )
              ((l = i.parentNode.name + '.' + l), (i = i.parentNode));
            return (0, Y.Qx)('nameValue', { name: l, value: r, noValue: isNaN(r) || null == r });
          }),
          (t.prototype.getDataParams = function (t) {
            var a = e.prototype.getDataParams.apply(this, arguments),
              n = this.getData().tree.getNodeByDataIndex(t);
            return ((a.treeAncestors = (0, X.ev)(n, this)), (a.collapsed = !n.isExpand), a);
          }),
          (t.type = 'series.tree'),
          (t.layoutMode = 'box'),
          (t.defaultOption = {
            z: 2,
            coordinateSystem: 'view',
            left: '12%',
            top: '12%',
            right: '12%',
            bottom: '12%',
            layout: 'orthogonal',
            edgeShape: 'curve',
            edgeForkPosition: '50%',
            roam: !1,
            nodeScaleRatio: 0.4,
            center: null,
            zoom: 1,
            orient: 'LR',
            symbol: 'emptyCircle',
            symbolSize: 7,
            expandAndCollapse: !0,
            initialTreeDepth: 2,
            lineStyle: { color: '#ccc', width: 1.5, curveness: 0.5 },
            itemStyle: { color: 'lightsteelblue', borderWidth: 1.5 },
            label: { show: !0 },
            animationEasing: 'linear',
            animationDuration: 700,
            animationDurationUpdate: 500,
          }),
          t
        );
      })(O.A);
      function U(e, t) {
        for (var a, n = [e]; (a = n.pop());)
          if ((t(a), a.isExpand)) {
            var o = a.children;
            if (o.length) for (var i = o.length - 1; i >= 0; i--) n.push(o[i]);
          }
      }
      function F(e, t) {
        e.eachSeriesByType('tree', function (e) {
          !(function (e, t) {
            var a = y(e, t);
            e.layoutInfo = a;
            var n = e.get('layout'),
              o = 0,
              i = 0,
              r = null;
            'radial' === n
              ? ((o = 2 * Math.PI),
                (i = Math.min(a.height, a.width) / 2),
                (r = p(function (e, t) {
                  return (e.parentNode === t.parentNode ? 1 : 2) / e.depth;
                })))
              : ((o = a.width), (i = a.height), (r = p()));
            var l = e.getData().tree.root,
              s = l.children[0];
            if (s) {
              (!(function (e) {
                var t = e;
                t.hierNode = {
                  defaultAncestor: null,
                  ancestor: t,
                  prelim: 0,
                  modifier: 0,
                  change: 0,
                  shift: 0,
                  i: 0,
                  thread: null,
                };
                for (var a, n, o = [t]; (a = o.pop());)
                  if (((n = a.children), a.isExpand && n.length))
                    for (var i = n.length - 1; i >= 0; i--) {
                      var r = n[i];
                      ((r.hierNode = {
                        defaultAncestor: null,
                        ancestor: r,
                        prelim: 0,
                        modifier: 0,
                        change: 0,
                        shift: 0,
                        i,
                        thread: null,
                      }),
                        o.push(r));
                    }
              })(l),
                (function (e, t, a) {
                  for (var n, o = [e], i = []; (n = o.pop());)
                    if ((i.push(n), n.isExpand)) {
                      var r = n.children;
                      if (r.length) for (var l = 0; l < r.length; l++) o.push(r[l]);
                    }
                  for (; (n = i.pop());) t(n, a);
                })(s, h, r),
                (l.hierNode.modifier = -s.hierNode.prelim),
                U(s, c));
              var d = s,
                u = s,
                f = s;
              U(s, function (e) {
                var t = e.getLayout().x;
                (t < d.getLayout().x && (d = e),
                  t > u.getLayout().x && (u = e),
                  e.depth > f.depth && (f = e));
              });
              var v = d === u ? 1 : r(d, u) / 2,
                m = v - d.getLayout().x,
                x = 0,
                w = 0,
                b = 0,
                I = 0;
              if ('radial' === n)
                ((x = o / (u.getLayout().x + v + m)),
                  (w = i / (f.depth - 1 || 1)),
                  U(s, function (e) {
                    ((b = (e.getLayout().x + m) * x), (I = (e.depth - 1) * w));
                    var t = g(b, I);
                    e.setLayout({ x: t.x, y: t.y, rawX: b, rawY: I }, !0);
                  }));
              else {
                var S = e.getOrient();
                'RL' === S || 'LR' === S
                  ? ((w = i / (u.getLayout().x + v + m)),
                    (x = o / (f.depth - 1 || 1)),
                    U(s, function (e) {
                      ((I = (e.getLayout().x + m) * w),
                        (b = 'LR' === S ? (e.depth - 1) * x : o - (e.depth - 1) * x),
                        e.setLayout({ x: b, y: I }, !0));
                    }))
                  : ('TB' !== S && 'BT' !== S) ||
                    ((x = o / (u.getLayout().x + v + m)),
                    (w = i / (f.depth - 1 || 1)),
                    U(s, function (e) {
                      ((b = (e.getLayout().x + m) * x),
                        (I = 'TB' === S ? (e.depth - 1) * w : i - (e.depth - 1) * w),
                        e.setLayout({ x: b, y: I }, !0));
                    }));
              }
            }
          })(e, t);
        });
      }
      function Z(e) {
        e.eachSeriesByType('tree', function (e) {
          var t = e.getData();
          t.tree.eachNode(function (e) {
            var a = e.getModel().getModel('itemStyle').getItemStyle(),
              n = t.ensureUniqueItemVisual(e.dataIndex, 'style');
            (0, o.extend)(n, a);
          });
        });
      }
      var j = a(878536);
      function Q(e) {
        (e.registerChartView(B),
          e.registerSeriesModel(q),
          e.registerLayout(F),
          e.registerVisual(Z),
          (function (e) {
            (e.registerAction(
              { type: 'treeExpandAndCollapse', event: 'treeExpandAndCollapse', update: 'update' },
              function (e, t) {
                t.eachComponent({ mainType: 'series', subType: 'tree', query: e }, function (t) {
                  var a = e.dataIndex,
                    n = t.getData().tree.getNodeByDataIndex(a);
                  n.isExpand = !n.isExpand;
                });
              },
            ),
              e.registerAction(
                { type: 'treeRoam', event: 'treeRoam', update: 'none' },
                function (e, t, a) {
                  t.eachComponent({ mainType: 'series', subType: 'tree', query: e }, function (t) {
                    var n = t.coordinateSystem,
                      o = (0, j.f)(n, e, void 0, a);
                    (t.setCenter && t.setCenter(o.center), t.setZoom && t.setZoom(o.zoom));
                  });
                },
              ));
          })(e));
      }
    },
    549917: (e, t, a) => {
      a.d(t, { a: () => me });
      var n = a(41616),
        o = a(498026),
        i = ['treemapZoomToNode', 'treemapRender', 'treemapMove'],
        r = a(15215),
        l = a(347355),
        s = a(315719),
        d = a(143172),
        u = a(48170),
        h = a(603961),
        c = a(868866),
        p = (function (e) {
          function t() {
            var a = (null !== e && e.apply(this, arguments)) || this;
            return ((a.type = t.type), (a.preventUsingHoverLayer = !0), a);
          }
          return (
            (0, r.__extends)(t, e),
            (t.prototype.getInitialData = function (e, t) {
              var a = { name: e.name, children: e.data };
              g(a);
              var n = e.levels || [],
                i = (this.designatedVisualItemStyle = {}),
                r = new d.A({ itemStyle: i }, this, t);
              n = e.levels = (function (e, t) {
                var a,
                  n,
                  i = (0, u.qB)(t.get('color')),
                  r = (0, u.qB)(t.get(['aria', 'decal', 'decals']));
                if (i) {
                  ((e = e || []),
                    o.each(e, function (e) {
                      var t = new d.A(e),
                        o = t.get('color'),
                        i = t.get('decal');
                      ((t.get(['itemStyle', 'color']) || (o && 'none' !== o)) && (a = !0),
                        (t.get(['itemStyle', 'decal']) || (i && 'none' !== i)) && (n = !0));
                    }));
                  var l = e[0] || (e[0] = {});
                  return (a || (l.color = i.slice()), !n && r && (l.decal = r.slice()), e);
                }
              })(n, t);
              var l = o.map(
                  n || [],
                  function (e) {
                    return new d.A(e, r, t);
                  },
                  this,
                ),
                h = s.A.createTree(a, this, function (e) {
                  e.wrapMethod('getItemModel', function (e, t) {
                    var a = h.getNodeByDataIndex(t),
                      n = a ? l[a.depth] : null;
                    return ((e.parentModel = n || r), e);
                  });
                });
              return h.data;
            }),
            (t.prototype.optionUpdated = function () {
              this.resetViewRoot();
            }),
            (t.prototype.formatTooltip = function (e, t, a) {
              var n = this.getData(),
                o = this.getRawValue(e),
                i = n.getName(e);
              return (0, h.Qx)('nameValue', { name: i, value: o });
            }),
            (t.prototype.getDataParams = function (t) {
              var a = e.prototype.getDataParams.apply(this, arguments),
                o = this.getData().tree.getNodeByDataIndex(t);
              return (
                (a.treeAncestors = (0, n.ev)(o, this)),
                (a.treePathInfo = a.treeAncestors),
                a
              );
            }),
            (t.prototype.setLayoutInfo = function (e) {
              ((this.layoutInfo = this.layoutInfo || {}), o.extend(this.layoutInfo, e));
            }),
            (t.prototype.mapIdToIndex = function (e) {
              var t = this._idIndexMap;
              t || ((t = this._idIndexMap = o.createHashMap()), (this._idIndexMapCount = 0));
              var a = t.get(e);
              return (null == a && t.set(e, (a = this._idIndexMapCount++)), a);
            }),
            (t.prototype.getViewRoot = function () {
              return this._viewRoot;
            }),
            (t.prototype.resetViewRoot = function (e) {
              e ? (this._viewRoot = e) : (e = this._viewRoot);
              var t = this.getRawData().tree.root;
              (e && (e === t || t.contains(e))) || (this._viewRoot = t);
            }),
            (t.prototype.enableAriaDecal = function () {
              (0, c.A)(this);
            }),
            (t.type = 'series.treemap'),
            (t.layoutMode = 'box'),
            (t.defaultOption = {
              progressive: 0,
              left: 'center',
              top: 'middle',
              width: '80%',
              height: '80%',
              sort: !0,
              clipWindow: 'origin',
              squareRatio: 0.5 * (1 + Math.sqrt(5)),
              leafDepth: null,
              drillDownIcon: '▶',
              zoomToNodeRatio: 0.1024,
              scaleLimit: null,
              roam: !0,
              nodeClick: 'zoomToNode',
              animation: !0,
              animationDurationUpdate: 900,
              animationEasing: 'quinticInOut',
              breadcrumb: {
                show: !0,
                height: 22,
                left: 'center',
                top: 'bottom',
                emptyItemWidth: 25,
                itemStyle: { color: 'rgba(0,0,0,0.7)', textStyle: { color: '#fff' } },
                emphasis: { itemStyle: { color: 'rgba(0,0,0,0.9)' } },
              },
              label: {
                show: !0,
                distance: 0,
                padding: 5,
                position: 'inside',
                color: '#fff',
                overflow: 'truncate',
              },
              upperLabel: {
                show: !1,
                position: [0, '50%'],
                height: 20,
                overflow: 'truncate',
                verticalAlign: 'middle',
              },
              itemStyle: {
                color: null,
                colorAlpha: null,
                colorSaturation: null,
                borderWidth: 0,
                gapWidth: 0,
                borderColor: '#fff',
                borderColorSaturation: null,
              },
              emphasis: {
                upperLabel: {
                  show: !0,
                  position: [0, '50%'],
                  overflow: 'truncate',
                  verticalAlign: 'middle',
                },
              },
              visualDimension: 0,
              visualMin: null,
              visualMax: null,
              color: [],
              colorAlpha: null,
              colorSaturation: null,
              colorMappingBy: 'index',
              visibleMin: 10,
              childrenVisibleMin: null,
              levels: [],
            }),
            t
          );
        })(l.A);
      function g(e) {
        var t = 0;
        o.each(e.children, function (e) {
          g(e);
          var a = e.value;
          (o.isArray(a) && (a = a[0]), (t += a));
        });
        var a = e.value;
        (o.isArray(a) && (a = a[0]),
          (null == a || isNaN(a)) && (a = t),
          a < 0 && (a = 0),
          o.isArray(e.value) ? (e.value[0] = a) : (e.value = a));
      }
      const y = p;
      var f = a(843870),
        v = a(830010),
        m = a(669622),
        x = a(34833),
        w = a(716563),
        b = a(252505),
        I = a(132322),
        S = a(834253),
        A = a(289632),
        L = (function () {
          function e(e) {
            ((this.group = new f.A()), e.add(this.group));
          }
          return (
            (e.prototype.render = function (e, t, a, n) {
              var o = e.getModel('breadcrumb'),
                i = this.group;
              if ((i.removeAll(), o.get('show') && a)) {
                var r = o.getModel('itemStyle'),
                  l = o.getModel('emphasis'),
                  s = r.getModel('textStyle'),
                  d = l.getModel(['itemStyle', 'textStyle']),
                  u = {
                    pos: {
                      left: o.get('left'),
                      right: o.get('right'),
                      top: o.get('top'),
                      bottom: o.get('bottom'),
                    },
                    box: { width: t.getWidth(), height: t.getHeight() },
                    emptyItemWidth: o.get('emptyItemWidth'),
                    totalWidth: 0,
                    renderList: [],
                  };
                (this._prepare(a, u, s),
                  this._renderContent(e, u, r, l, s, d, n),
                  S.m$(i, u.pos, u.box));
              }
            }),
            (e.prototype._prepare = function (e, t, a) {
              for (var n = e; n; n = n.parentNode) {
                var o = (0, u.vS)(n.getModel().get('name'), ''),
                  i = a.getTextRect(o),
                  r = Math.max(i.width + 16, t.emptyItemWidth);
                ((t.totalWidth += r + 8), t.renderList.push({ node: n, text: o, width: r }));
              }
            }),
            (e.prototype._renderContent = function (e, t, a, n, i, r, l) {
              for (
                var s = 0,
                  d = t.emptyItemWidth,
                  u = e.get(['breadcrumb', 'height']),
                  h = S.HU(t.pos, t.box),
                  c = t.totalWidth,
                  p = t.renderList,
                  g = n.getModel('itemStyle').getItemStyle(),
                  y = p.length - 1;
                y >= 0;
                y--
              ) {
                var f = p[y],
                  v = f.node,
                  m = f.width,
                  w = f.text;
                c > h.width && ((c -= m - d), (m = d), (w = null));
                var L = new b.A({
                  shape: { points: _(s, 0, m, u, y === p.length - 1, 0 === y) },
                  style: (0, o.defaults)(a.getItemStyle(), { lineJoin: 'bevel' }),
                  textContent: new I.Ay({ style: (0, A.VB)(i, { text: w }) }),
                  textConfig: { position: 'inside' },
                  z2: 1e4 * x.CA,
                  onclick: (0, o.curry)(l, v),
                });
                ((L.disableLabelAnimation = !0),
                  (L.getTextContent().ensureState('emphasis').style = (0, A.VB)(r, { text: w })),
                  (L.ensureState('emphasis').style = g),
                  (0, x.Lm)(L, n.get('focus'), n.get('blurScope'), n.get('disabled')),
                  this.group.add(L),
                  M(L, e, v),
                  (s += m + 8));
              }
            }),
            (e.prototype.remove = function () {
              this.group.removeAll();
            }),
            e
          );
        })();
      function _(e, t, a, n, o, i) {
        var r = [
          [o ? e : e - 5, t],
          [e + a, t],
          [e + a, t + n],
          [o ? e : e - 5, t + n],
        ];
        return (!i && r.splice(2, 0, [e + a + 5, t + n / 2]), !o && r.push([e, t + n / 2]), r);
      }
      function M(e, t, a) {
        (0, m.z)(e).eventData = {
          componentType: 'series',
          componentSubType: 'treemap',
          componentIndex: t.componentIndex,
          seriesIndex: t.seriesIndex,
          seriesName: t.name,
          seriesType: 'treemap',
          selfType: 'breadcrumb',
          nodeData: { dataIndex: a && a.dataIndex, name: a && a.name },
          treePathInfo: a && (0, n.ev)(a, t),
        };
      }
      const D = L;
      var N = a(281722),
        T = a(529308),
        C = a(345587),
        V = a(963253),
        R = a(732944),
        P = a(106666),
        E = a(171519),
        k = a(783412),
        G = f.A,
        z = v.A,
        B = 'label',
        O = 'upperLabel',
        W = 10 * x.CA,
        H = 2 * x.CA,
        Y = 3 * x.CA,
        X = (0, R.A)([
          ['fill', 'color'],
          ['stroke', 'strokeColor'],
          ['lineWidth', 'strokeWidth'],
          ['shadowBlur'],
          ['shadowOffsetX'],
          ['shadowOffsetY'],
          ['shadowColor'],
        ]),
        q = function (e) {
          var t = X(e);
          return ((t.stroke = t.fill = t.lineWidth = null), t);
        },
        U = (0, u.$r)(),
        F = (function (e) {
          function t() {
            var a = (null !== e && e.apply(this, arguments)) || this;
            return (
              (a.type = t.type),
              (a._state = 'ready'),
              (a._storage = { nodeGroup: [], background: [], content: [] }),
              a
            );
          }
          return (
            (0, r.__extends)(t, e),
            (t.prototype.render = function (e, t, a, i) {
              var r = t.findComponents({ mainType: 'series', subType: 'treemap', query: i });
              if (!((0, o.indexOf)(r, e) < 0)) {
                ((this.seriesModel = e), (this.api = a), (this.ecModel = t));
                var l = n.mw(i, ['treemapZoomToNode', 'treemapRootToNode'], e),
                  s = i && i.type,
                  d = e.layoutInfo,
                  u = !this._oldTree,
                  h = this._storage,
                  c =
                    'treemapRootToNode' === s && l && h
                      ? { rootNodeGroup: h.nodeGroup[l.node.getRawIndex()], direction: i.direction }
                      : null,
                  p = this._giveContainerGroup(d),
                  g = e.get('animation'),
                  y = this._doRender(p, e, c);
                (!g || u || (s && 'treemapZoomToNode' !== s && 'treemapRootToNode' !== s)
                  ? y.renderFinally()
                  : this._doAnimation(p, y, e, c),
                  this._resetController(a),
                  this._renderBreadcrumb(e, a, l));
              }
            }),
            (t.prototype._giveContainerGroup = function (e) {
              var t = this._containerGroup;
              return (
                t || ((t = this._containerGroup = new G()), this._initEvents(t), this.group.add(t)),
                (t.x = e.x),
                (t.y = e.y),
                t
              );
            }),
            (t.prototype._doRender = function (e, t, a) {
              var n = t.getData().tree,
                i = this._oldTree,
                r = { nodeGroup: [], background: [], content: [] },
                l = { nodeGroup: [], background: [], content: [] },
                s = this._storage,
                d = [];
              function h(e, n, i, h) {
                return (function (e, t, a, n, i, r, l, s, d, h) {
                  if (l) {
                    var c = l.getLayout(),
                      p = e.getData(),
                      g = l.getModel();
                    if ((p.setItemGraphicEl(l.dataIndex, null), c && c.isInView)) {
                      var y = c.width,
                        v = c.height,
                        w = c.borderWidth,
                        b = c.invisible,
                        I = l.getRawIndex(),
                        S = s && s.getRawIndex(),
                        L = l.viewChildren,
                        _ = c.upperHeight,
                        M = L && L.length,
                        D = g.getModel('itemStyle'),
                        N = g.getModel(['emphasis', 'itemStyle']),
                        T = g.getModel(['blur', 'itemStyle']),
                        C = g.getModel(['select', 'itemStyle']),
                        V = D.get('borderRadius') || 0,
                        R = ae('nodeGroup', G);
                      if (R) {
                        if (
                          (d.add(R),
                          (R.x = c.x || 0),
                          (R.y = c.y || 0),
                          R.markRedraw(),
                          (U(R).nodeWidth = y),
                          (U(R).nodeHeight = v),
                          c.isAboveViewRoot)
                        )
                          return R;
                        var P = ae('background', z, h, H);
                        P &&
                          (function (t, a, n) {
                            var o = (0, m.z)(a);
                            if (
                              ((o.dataIndex = l.dataIndex),
                              (o.seriesIndex = e.seriesIndex),
                              a.setShape({ x: 0, y: 0, width: y, height: v, r: V }),
                              b)
                            )
                              K(a);
                            else {
                              a.invisible = !1;
                              var i = l.getVisual('style'),
                                r = i.stroke,
                                s = q(D);
                              s.fill = r;
                              var d = X(N);
                              d.fill = N.get('borderColor');
                              var u = X(T);
                              u.fill = T.get('borderColor');
                              var h = X(C);
                              if (((h.fill = C.get('borderColor')), n)) {
                                var c = y - 2 * w;
                                ee(a, r, i.opacity, { x: w, y: 0, width: c, height: _ });
                              } else a.removeTextContent();
                              (a.setStyle(s),
                                (a.ensureState('emphasis').style = d),
                                (a.ensureState('blur').style = u),
                                (a.ensureState('select').style = h),
                                (0, x.DW)(a));
                            }
                            t.add(a);
                          })(R, P, M && c.upperLabelHeight);
                        var k = g.getModel('emphasis'),
                          F = k.get('focus'),
                          Z = k.get('blurScope'),
                          j = k.get('disabled'),
                          Q =
                            'ancestor' === F
                              ? l.getAncestorsIndices()
                              : 'descendant' === F
                                ? l.getDescendantIndices()
                                : F;
                        if (M)
                          ((0, x.u6)(R) && (0, x.ix)(R, !1),
                            P &&
                              ((0, x.ix)(P, !j),
                              p.setItemGraphicEl(l.dataIndex, P),
                              (0, x.gR)(P, Q, Z)));
                        else {
                          var $ = ae('content', z, h, Y);
                          ($ &&
                            (function (t, a) {
                              var n = (0, m.z)(a);
                              ((n.dataIndex = l.dataIndex), (n.seriesIndex = e.seriesIndex));
                              var o = Math.max(y - 2 * w, 0),
                                i = Math.max(v - 2 * w, 0);
                              if (
                                ((a.culling = !0),
                                a.setShape({ x: w, y: w, width: o, height: i, r: V }),
                                b)
                              )
                                K(a);
                              else {
                                a.invisible = !1;
                                var r = l.getVisual('style'),
                                  s = r.fill,
                                  d = q(D);
                                ((d.fill = s), (d.decal = r.decal));
                                var u = X(N),
                                  h = X(T),
                                  c = X(C);
                                (ee(a, s, r.opacity, null),
                                  a.setStyle(d),
                                  (a.ensureState('emphasis').style = u),
                                  (a.ensureState('blur').style = h),
                                  (a.ensureState('select').style = c),
                                  (0, x.DW)(a));
                              }
                              t.add(a);
                            })(R, $),
                            (P.disableMorphing = !0),
                            P && (0, x.u6)(P) && (0, x.ix)(P, !1),
                            (0, x.ix)(R, !j),
                            p.setItemGraphicEl(l.dataIndex, R));
                          var J = g.getShallow('cursor');
                          (J && $.attr('cursor', J), (0, x.gR)(R, Q, Z));
                        }
                        return R;
                      }
                    }
                  }
                  function K(e) {
                    !e.invisible && r.push(e);
                  }
                  function ee(t, a, n, i) {
                    var r = g.getModel(i ? O : B),
                      s = (0, u.vS)(g.get('name'), null),
                      d = r.getShallow('show');
                    (0, A.qM)(t, (0, A.lx)(g, i ? O : B), {
                      defaultText: d ? s : null,
                      inheritColor: a,
                      defaultOpacity: n,
                      labelFetcher: e,
                      labelDataIndex: l.dataIndex,
                    });
                    var h = t.getTextContent();
                    if (h) {
                      var p = h.style,
                        y = (0, o.normalizeCssArray)(p.padding || 0);
                      (i && (t.setTextConfig({ layoutRect: i }), (h.disableLabelLayout = !0)),
                        (h.beforeUpdate = function () {
                          var e = Math.max((i ? i.width : t.shape.width) - y[1] - y[3], 0),
                            a = Math.max((i ? i.height : t.shape.height) - y[0] - y[2], 0);
                          (p.width === e && p.height === a) || h.setStyle({ width: e, height: a });
                        }),
                        (p.truncateMinChar = 2),
                        (p.lineOverflow = 'truncate'),
                        te(p, i, c));
                      var f = h.getState('emphasis');
                      te(f ? f.style : null, i, c);
                    }
                  }
                  function te(t, a, n) {
                    var o = t ? t.text : null;
                    if (!a && n.isLeafRoot && null != o) {
                      var i = e.get('drillDownIcon', !0);
                      t.text = i ? i + ' ' + o : o;
                    }
                  }
                  function ae(e, r, s, d) {
                    var u = null != S && a[e][S],
                      h = i[e];
                    return (
                      u
                        ? ((a[e][S] = null),
                          (function (e, t) {
                            var a = (e[I] = {});
                            t instanceof G
                              ? ((a.oldX = t.x), (a.oldY = t.y))
                              : (a.oldShape = (0, o.extend)({}, t.shape));
                          })(h, u))
                        : b ||
                          ((u = new r()) instanceof E.Ay &&
                            (u.z2 = (function (e, t) {
                              return e * W + t;
                            })(s, d)),
                          (function (e, t) {
                            var a = (e[I] = {}),
                              o = l.parentNode,
                              r = t instanceof f.A;
                            if (o && (!n || 'drillDown' === n.direction)) {
                              var s = 0,
                                d = 0,
                                u = i.background[o.getRawIndex()];
                              (!n &&
                                u &&
                                u.oldShape &&
                                ((s = u.oldShape.width), (d = u.oldShape.height)),
                                r
                                  ? ((a.oldX = 0), (a.oldY = d))
                                  : (a.oldShape = { x: s, y: d, width: 0, height: 0 }));
                            }
                            a.fadein = !r;
                          })(h, u)),
                      (t[e][I] = u)
                    );
                  }
                })(t, l, s, a, r, d, e, n, i, h);
              }
              !(function e(t, a, n, i, r) {
                function l(e) {
                  return e.getId();
                }
                function s(o, l) {
                  var s = null != o ? t[o] : null,
                    d = null != l ? a[l] : null,
                    u = h(s, d, n, r);
                  u && e((s && s.viewChildren) || [], (d && d.viewChildren) || [], u, i, r + 1);
                }
                i
                  ? ((a = t),
                    (0, o.each)(t, function (e, t) {
                      !e.isRemoved() && s(t, t);
                    }))
                  : new w.A(a, t, l, l)
                      .add(s)
                      .update(s)
                      .remove((0, o.curry)(s, null))
                      .execute();
              })(n.root ? [n.root] : [], i && i.root ? [i.root] : [], e, n === i || !i, 0);
              var c = (function (e) {
                var t = { nodeGroup: [], background: [], content: [] };
                return (
                  e &&
                    (0, o.each)(e, function (e, a) {
                      var n = t[a];
                      (0, o.each)(e, function (e) {
                        e && (n.push(e), (U(e).willDelete = !0));
                      });
                    }),
                  t
                );
              })(s);
              if (((this._oldTree = n), (this._storage = l), this._controllerHost)) {
                var p = this.seriesModel.layoutInfo,
                  g = n.root.getLayout();
                g.width === p.width && g.height === p.height && (this._controllerHost.zoom = 1);
              }
              return {
                lastsForAnimation: r,
                willDeleteEls: c,
                renderFinally: function () {
                  ((0, o.each)(c, function (e) {
                    (0, o.each)(e, function (e) {
                      e.parent && e.parent.remove(e);
                    });
                  }),
                    (0, o.each)(d, function (e) {
                      ((e.invisible = !0), e.dirty());
                    }));
                },
              };
            }),
            (t.prototype._doAnimation = function (e, t, a, n) {
              var i = a.get('animationDurationUpdate'),
                r = a.get('animationEasing'),
                l = ((0, o.isFunction)(i) ? 0 : i) || 0,
                s = ((0, o.isFunction)(r) ? null : r) || 'cubicOut',
                d = V.x();
              ((0, o.each)(t.willDeleteEls, function (e, t) {
                (0, o.each)(e, function (e, a) {
                  if (!e.invisible) {
                    var o,
                      i = e.parent,
                      r = U(i);
                    if (n && 'drillDown' === n.direction)
                      o =
                        i === n.rootNodeGroup
                          ? {
                              shape: { x: 0, y: 0, width: r.nodeWidth, height: r.nodeHeight },
                              style: { opacity: 0 },
                            }
                          : { style: { opacity: 0 } };
                    else {
                      var u = 0,
                        h = 0;
                      (r.willDelete || ((u = r.nodeWidth / 2), (h = r.nodeHeight / 2)),
                        (o =
                          'nodeGroup' === t
                            ? { x: u, y: h, style: { opacity: 0 } }
                            : {
                                shape: { x: u, y: h, width: 0, height: 0 },
                                style: { opacity: 0 },
                              }));
                    }
                    o && d.add(e, o, l, 0, s);
                  }
                });
              }),
                (0, o.each)(
                  this._storage,
                  function (e, a) {
                    (0, o.each)(e, function (e, n) {
                      var i = t.lastsForAnimation[a][n],
                        r = {};
                      i &&
                        (e instanceof f.A
                          ? null != i.oldX &&
                            ((r.x = e.x), (r.y = e.y), (e.x = i.oldX), (e.y = i.oldY))
                          : (i.oldShape &&
                              ((r.shape = (0, o.extend)({}, e.shape)), e.setShape(i.oldShape)),
                            i.fadein
                              ? (e.setStyle('opacity', 0), (r.style = { opacity: 1 }))
                              : 1 !== e.style.opacity && (r.style = { opacity: 1 })),
                        d.add(e, r, l, 0, s));
                    });
                  },
                  this,
                ),
                (this._state = 'animating'),
                d
                  .finished(
                    (0, o.bind)(function () {
                      ((this._state = 'ready'), t.renderFinally());
                    }, this),
                  )
                  .start());
            }),
            (t.prototype._resetController = function (e) {
              var t = this._controller,
                a = this._controllerHost;
              (a || ((this._controllerHost = { target: this.group }), (a = this._controllerHost)),
                t ||
                  ((t = this._controller = new N.A(e.getZr())).enable(this.seriesModel.get('roam')),
                  (a.zoomLimit = this.seriesModel.get('scaleLimit')),
                  (a.zoom = this.seriesModel.get('zoom')),
                  t.on('pan', (0, o.bind)(this._onPan, this)),
                  t.on('zoom', (0, o.bind)(this._onZoom, this))));
              var n = new T.A(0, 0, e.getWidth(), e.getHeight());
              t.setPointerChecker(function (e, t, a) {
                return n.contain(t, a);
              });
            }),
            (t.prototype._clearController = function () {
              var e = this._controller;
              ((this._controllerHost = null), e && (e.dispose(), (e = null)));
            }),
            (t.prototype._onPan = function (e) {
              if ('animating' !== this._state && (Math.abs(e.dx) > 3 || Math.abs(e.dy) > 3)) {
                var t = this.seriesModel.getData().tree.root;
                if (!t) return;
                var a = t.getLayout();
                if (!a) return;
                this.api.dispatchAction({
                  type: 'treemapMove',
                  from: this.uid,
                  seriesId: this.seriesModel.id,
                  rootRect: { x: a.x + e.dx, y: a.y + e.dy, width: a.width, height: a.height },
                });
              }
            }),
            (t.prototype._onZoom = function (e) {
              var t = e.originX,
                a = e.originY,
                n = e.scale;
              if ('animating' !== this._state) {
                var o = this.seriesModel.getData().tree.root;
                if (!o) return;
                var i = o.getLayout();
                if (!i) return;
                var r,
                  l = new T.A(i.x, i.y, i.width, i.height),
                  s = this._controllerHost;
                r = s.zoomLimit;
                var d = (s.zoom = s.zoom || 1);
                if (((d *= n), r)) {
                  var u = r.min || 0,
                    h = r.max || 1 / 0;
                  d = Math.max(Math.min(h, d), u);
                }
                var c = d / s.zoom;
                s.zoom = d;
                var p = this.seriesModel.layoutInfo;
                ((t -= p.x), (a -= p.y));
                var g = C.create();
                (C.translate(g, g, [-t, -a]),
                  C.scale(g, g, [c, c]),
                  C.translate(g, g, [t, a]),
                  l.applyTransform(g),
                  this.api.dispatchAction({
                    type: 'treemapRender',
                    from: this.uid,
                    seriesId: this.seriesModel.id,
                    rootRect: { x: l.x, y: l.y, width: l.width, height: l.height },
                  }));
              }
            }),
            (t.prototype._initEvents = function (e) {
              var t = this;
              e.on(
                'click',
                function (e) {
                  if ('ready' === t._state) {
                    var a = t.seriesModel.get('nodeClick', !0);
                    if (a) {
                      var n = t.findTarget(e.offsetX, e.offsetY);
                      if (n) {
                        var o = n.node;
                        if (o.getLayout().isLeafRoot) t._rootToNode(n);
                        else if ('zoomToNode' === a) t._zoomToNode(n);
                        else if ('link' === a) {
                          var i = o.hostTree.data.getItemModel(o.dataIndex),
                            r = i.get('link', !0),
                            l = i.get('target', !0) || 'blank';
                          r && (0, k.JW)(r, l);
                        }
                      }
                    }
                  }
                },
                this,
              );
            }),
            (t.prototype._renderBreadcrumb = function (e, t, a) {
              var o = this;
              (a ||
                (a =
                  null != e.get('leafDepth', !0)
                    ? { node: e.getViewRoot() }
                    : this.findTarget(t.getWidth() / 2, t.getHeight() / 2)) ||
                (a = { node: e.getData().tree.root }),
                (this._breadcrumb || (this._breadcrumb = new D(this.group))).render(
                  e,
                  t,
                  a.node,
                  function (t) {
                    'animating' !== o._state &&
                      (n.x5(e.getViewRoot(), t)
                        ? o._rootToNode({ node: t })
                        : o._zoomToNode({ node: t }));
                  },
                ));
            }),
            (t.prototype.remove = function () {
              (this._clearController(),
                this._containerGroup && this._containerGroup.removeAll(),
                (this._storage = { nodeGroup: [], background: [], content: [] }),
                (this._state = 'ready'),
                this._breadcrumb && this._breadcrumb.remove());
            }),
            (t.prototype.dispose = function () {
              this._clearController();
            }),
            (t.prototype._zoomToNode = function (e) {
              this.api.dispatchAction({
                type: 'treemapZoomToNode',
                from: this.uid,
                seriesId: this.seriesModel.id,
                targetNode: e.node,
              });
            }),
            (t.prototype._rootToNode = function (e) {
              this.api.dispatchAction({
                type: 'treemapRootToNode',
                from: this.uid,
                seriesId: this.seriesModel.id,
                targetNode: e.node,
              });
            }),
            (t.prototype.findTarget = function (e, t) {
              var a;
              return (
                this.seriesModel.getViewRoot().eachNode(
                  { attr: 'viewChildren', order: 'preorder' },
                  function (n) {
                    var o = this._storage.background[n.getRawIndex()];
                    if (o) {
                      var i = o.transformCoordToLocal(e, t),
                        r = o.shape;
                      if (!(
                        r.x <= i[0] &&
                        i[0] <= r.x + r.width &&
                        r.y <= i[1] &&
                        i[1] <= r.y + r.height
                      ))
                        return !1;
                      a = { node: n, offsetX: i[0], offsetY: i[1] };
                    }
                  },
                  this,
                ),
                a
              );
            }),
            (t.type = 'treemap'),
            t
          );
        })(P.A);
      const Z = F;
      var j = a(907857),
        Q = a(747698),
        $ = (0, u.$r)();
      const J = {
        seriesType: 'treemap',
        reset: function (e) {
          var t = e.getData().tree.root;
          t.isRemoved() || K(t, {}, e.getViewRoot().getAncestors(), e);
        },
      };
      function K(e, t, a, n) {
        var i = e.getModel(),
          r = e.getLayout(),
          l = e.hostTree.data;
        if (r && !r.invisible && r.isInView) {
          var s,
            d = i.getModel('itemStyle'),
            u = (function (e, t, a) {
              var n = (0, o.extend)({}, t),
                i = a.designatedVisualItemStyle;
              return (
                (0, o.each)(['color', 'colorAlpha', 'colorSaturation'], function (a) {
                  i[a] = t[a];
                  var o = e.get(a);
                  ((i[a] = null), null != o && (n[a] = o));
                }),
                n
              );
            })(d, t, n),
            h = l.ensureUniqueItemVisual(e.dataIndex, 'style'),
            c = d.get('borderColor'),
            p = d.get('borderColorSaturation');
          (null != p &&
            (c = (function (e, t) {
              return null != t ? (0, Q.modifyHSL)(t, null, null, e) : null;
            })(p, (s = ee(u)))),
            (h.stroke = c));
          var g = e.viewChildren;
          if (g && g.length) {
            var y = (function (e, t, a, n, o, i) {
              if (i && i.length) {
                var r =
                  ae(t, 'color') ||
                  (null != o.color &&
                    'none' !== o.color &&
                    (ae(t, 'colorAlpha') || ae(t, 'colorSaturation')));
                if (r) {
                  var l = t.get('visualMin'),
                    s = t.get('visualMax'),
                    d = a.dataExtent.slice();
                  (null != l && l < d[0] && (d[0] = l), null != s && s > d[1] && (d[1] = s));
                  var u = t.get('colorMappingBy'),
                    h = { type: r.name, dataExtent: d, visual: r.range };
                  'color' !== h.type || ('index' !== u && 'id' !== u)
                    ? (h.mappingMethod = 'linear')
                    : ((h.mappingMethod = 'category'), (h.loop = !0));
                  var c = new j.A(h);
                  return (($(c).drColorMappingBy = u), c);
                }
              }
            })(0, i, r, 0, u, g);
            (0, o.each)(g, function (e, t) {
              if (e.depth >= a.length || e === a[e.depth]) {
                var r = (function (e, t, a, n, i, r) {
                  var l = (0, o.extend)({}, t);
                  if (i) {
                    var s = i.type,
                      d = 'color' === s && $(i).drColorMappingBy,
                      u =
                        'index' === d
                          ? n
                          : 'id' === d
                            ? r.mapIdToIndex(a.getId())
                            : a.getValue(e.get('visualDimension'));
                    l[s] = i.mapValueToVisual(u);
                  }
                  return l;
                })(i, u, e, t, y, n);
                K(e, r, a, n);
              }
            });
          } else ((s = ee(u)), (h.fill = s));
        }
      }
      function ee(e) {
        var t = te(e, 'color');
        if (t) {
          var a = te(e, 'colorAlpha'),
            n = te(e, 'colorSaturation');
          return (
            n && (t = (0, Q.modifyHSL)(t, null, null, n)),
            a && (t = (0, Q.modifyAlpha)(t, a)),
            t
          );
        }
      }
      function te(e, t) {
        var a = e[t];
        if (null != a && 'none' !== a) return a;
      }
      function ae(e, t) {
        var a = e.get(t);
        return (0, o.isArray)(a) && a.length ? { name: t, range: a } : null;
      }
      var ne = a(624326),
        oe = Math.max,
        ie = Math.min,
        re = o.retrieve,
        le = o.each,
        se = ['itemStyle', 'borderWidth'],
        de = ['itemStyle', 'gapWidth'],
        ue = ['upperLabel', 'show'],
        he = ['upperLabel', 'height'];
      const ce = {
        seriesType: 'treemap',
        reset: function (e, t, a, i) {
          var r = a.getWidth(),
            l = a.getHeight(),
            s = e.option,
            d = S.dV(e.getBoxLayoutParams(), { width: a.getWidth(), height: a.getHeight() }),
            u = s.size || [],
            h = (0, ne.lo)(re(d.width, u[0]), r),
            c = (0, ne.lo)(re(d.height, u[1]), l),
            p = i && i.type,
            g = n.mw(i, ['treemapZoomToNode', 'treemapRootToNode'], e),
            y = 'treemapRender' === p || 'treemapMove' === p ? i.rootRect : null,
            f = e.getViewRoot(),
            v = n.bl(f);
          if ('treemapMove' !== p) {
            var m =
                'treemapZoomToNode' === p
                  ? (function (e, t, a, n, o) {
                      var i,
                        r = (t || {}).node,
                        l = [n, o];
                      if (!r || r === a) return l;
                      for (var s = n * o, d = s * e.option.zoomToNodeRatio; (i = r.parentNode);) {
                        for (var u = 0, h = i.children, c = 0, p = h.length; c < p; c++)
                          u += h[c].getValue();
                        var g = r.getValue();
                        if (0 === g) return l;
                        d *= u / g;
                        var y = i.getModel(),
                          f = y.get(se);
                        ((d += 4 * f * f + (3 * f + Math.max(f, ve(y))) * Math.pow(d, 0.5)) >
                          ne.Is && (d = ne.Is),
                          (r = i));
                      }
                      d < s && (d = s);
                      var v = Math.pow(d / s, 0.5);
                      return [n * v, o * v];
                    })(e, g, f, h, c)
                  : y
                    ? [y.width, y.height]
                    : [h, c],
              x = s.sort;
            x && 'asc' !== x && 'desc' !== x && (x = 'desc');
            var w = { squareRatio: s.squareRatio, sort: x, leafDepth: s.leafDepth };
            f.hostTree.clearLayouts();
            var b = { x: 0, y: 0, width: m[0], height: m[1], area: m[0] * m[1] };
            (f.setLayout(b),
              pe(f, w, !1, 0),
              (b = f.getLayout()),
              le(v, function (e, t) {
                var a = (v[t + 1] || f).getValue();
                e.setLayout(o.extend({ dataExtent: [a, a], borderWidth: 0, upperHeight: 0 }, b));
              }));
          }
          var I = e.getData().tree.root;
          (I.setLayout(
            (function (e, t, a) {
              if (t) return { x: t.x, y: t.y };
              var n = { x: 0, y: 0 };
              if (!a) return n;
              var o = a.node,
                i = o.getLayout();
              if (!i) return n;
              for (var r = [i.width / 2, i.height / 2], l = o; l;) {
                var s = l.getLayout();
                ((r[0] += s.x), (r[1] += s.y), (l = l.parentNode));
              }
              return { x: e.width / 2 - r[0], y: e.height / 2 - r[1] };
            })(d, y, g),
            !0,
          ),
            e.setLayoutInfo(d),
            fe(I, new T.A(-d.x, -d.y, r, l), v, f, 0));
        },
      };
      function pe(e, t, a, n) {
        var i, r;
        if (!e.isRemoved()) {
          var l = e.getLayout();
          ((i = l.width), (r = l.height));
          var s = e.getModel(),
            d = s.get(se),
            u = s.get(de) / 2,
            h = ve(s),
            c = Math.max(d, h),
            p = d - u,
            g = c - u;
          e.setLayout({ borderWidth: d, upperHeight: c, upperLabelHeight: h }, !0);
          var y = (i = oe(i - 2 * p, 0)) * (r = oe(r - p - g, 0)),
            f = (function (e, t, a, n, i, r) {
              var l = e.children || [],
                s = n.sort;
              'asc' !== s && 'desc' !== s && (s = null);
              var d = null != n.leafDepth && n.leafDepth <= r;
              if (i && !d) return (e.viewChildren = []);
              ((l = o.filter(l, function (e) {
                return !e.isRemoved();
              })),
                (function (e, t) {
                  t &&
                    e.sort(function (e, a) {
                      var n =
                        'asc' === t ? e.getValue() - a.getValue() : a.getValue() - e.getValue();
                      return 0 === n
                        ? 'asc' === t
                          ? e.dataIndex - a.dataIndex
                          : a.dataIndex - e.dataIndex
                        : n;
                    });
                })(l, s));
              var u = (function (e, t, a) {
                for (var n = 0, o = 0, i = t.length; o < i; o++) n += t[o].getValue();
                var r,
                  l = e.get('visualDimension');
                return (
                  t && t.length
                    ? 'value' === l && a
                      ? ((r = [t[t.length - 1].getValue(), t[0].getValue()]),
                        'asc' === a && r.reverse())
                      : ((r = [1 / 0, -1 / 0]),
                        le(t, function (e) {
                          var t = e.getValue(l);
                          (t < r[0] && (r[0] = t), t > r[1] && (r[1] = t));
                        }))
                    : (r = [NaN, NaN]),
                  { sum: n, dataExtent: r }
                );
              })(t, l, s);
              if (0 === u.sum) return (e.viewChildren = []);
              if (
                ((u.sum = (function (e, t, a, n, o) {
                  if (!n) return a;
                  for (var i = e.get('visibleMin'), r = o.length, l = r, s = r - 1; s >= 0; s--) {
                    var d = o['asc' === n ? r - s - 1 : s].getValue();
                    (d / a) * t < i && ((l = s), (a -= d));
                  }
                  return ('asc' === n ? o.splice(0, r - l) : o.splice(l, r - l), a);
                })(t, a, u.sum, s, l)),
                0 === u.sum)
              )
                return (e.viewChildren = []);
              for (var h = 0, c = l.length; h < c; h++) {
                var p = (l[h].getValue() / u.sum) * a;
                l[h].setLayout({ area: p });
              }
              return (
                d && (l.length && e.setLayout({ isLeafRoot: !0 }, !0), (l.length = 0)),
                (e.viewChildren = l),
                e.setLayout({ dataExtent: u.dataExtent }, !0),
                l
              );
            })(e, s, y, t, a, n);
          if (f.length) {
            var v = { x: p, y: g, width: i, height: r },
              m = ie(i, r),
              x = 1 / 0,
              w = [];
            w.area = 0;
            for (var b = 0, I = f.length; b < I;) {
              var S = f[b];
              (w.push(S), (w.area += S.getLayout().area));
              var A = ge(w, m, t.squareRatio);
              A <= x
                ? (b++, (x = A))
                : ((w.area -= w.pop().getLayout().area),
                  ye(w, m, v, u, !1),
                  (m = ie(v.width, v.height)),
                  (w.length = w.area = 0),
                  (x = 1 / 0));
            }
            if ((w.length && ye(w, m, v, u, !0), !a)) {
              var L = s.get('childrenVisibleMin');
              null != L && y < L && (a = !0);
            }
            for (b = 0, I = f.length; b < I; b++) pe(f[b], t, a, n + 1);
          }
        }
      }
      function ge(e, t, a) {
        for (var n = 0, o = 1 / 0, i = 0, r = void 0, l = e.length; i < l; i++)
          (r = e[i].getLayout().area) && (r < o && (o = r), r > n && (n = r));
        var s = e.area * e.area,
          d = t * t * a;
        return s ? oe((d * n) / s, s / (d * o)) : 1 / 0;
      }
      function ye(e, t, a, n, o) {
        var i = t === a.width ? 0 : 1,
          r = 1 - i,
          l = ['x', 'y'],
          s = ['width', 'height'],
          d = a[l[i]],
          u = t ? e.area / t : 0;
        (o || u > a[s[r]]) && (u = a[s[r]]);
        for (var h = 0, c = e.length; h < c; h++) {
          var p = e[h],
            g = {},
            y = u ? p.getLayout().area / u : 0,
            f = (g[s[r]] = oe(u - 2 * n, 0)),
            v = a[l[i]] + a[s[i]] - d,
            m = h === c - 1 || v < y ? v : y,
            x = (g[s[i]] = oe(m - 2 * n, 0));
          ((g[l[r]] = a[l[r]] + ie(n, f / 2)),
            (g[l[i]] = d + ie(n, x / 2)),
            (d += m),
            p.setLayout(g, !0));
        }
        ((a[l[r]] += u), (a[s[r]] -= u));
      }
      function fe(e, t, a, n, o) {
        var i = e.getLayout(),
          r = a[o],
          l = r && r === e;
        if (!((r && !l) || (o === a.length && e !== n))) {
          e.setLayout({ isInView: !0, invisible: !l && !t.intersect(i), isAboveViewRoot: l }, !0);
          var s = new T.A(t.x - i.x, t.y - i.y, t.width, t.height);
          le(e.viewChildren || [], function (e) {
            fe(e, s, a, n, o + 1);
          });
        }
      }
      function ve(e) {
        return e.get(ue) ? e.get(he) : 0;
      }
      function me(e) {
        (e.registerSeriesModel(y),
          e.registerChartView(Z),
          e.registerVisual(J),
          e.registerLayout(ce),
          (function (e) {
            for (var t = 0; t < i.length; t++)
              e.registerAction({ type: i[t], update: 'updateView' }, o.noop);
            e.registerAction({ type: 'treemapRootToNode', update: 'updateView' }, function (e, t) {
              t.eachComponent(
                { mainType: 'series', subType: 'treemap', query: e },
                function (t, a) {
                  var o = n.mw(e, ['treemapZoomToNode', 'treemapRootToNode'], t);
                  if (o) {
                    var i = t.getViewRoot();
                    (i && (e.direction = n.x5(i, o.node) ? 'rollUp' : 'drillDown'),
                      t.resetViewRoot(o.node));
                  }
                },
              );
            });
          })(e));
      }
    },
  },
]);
