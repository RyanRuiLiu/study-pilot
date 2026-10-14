'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [26291],
  {
    120912: (t, e, n) => {
      n.d(e, { A: () => v });
      var i = n(498026),
        o = n(624326),
        r = n(945558),
        a = n(48170),
        s = n(399031),
        l = (0, a.$r)();
      function c(t, e) {
        var n = i.map(e, function (e) {
          return t.scale.parse(e);
        });
        return (
          'time' === t.type && n.length > 0 && (n.sort(), n.unshift(n[0]), n.push(n[n.length - 1])),
          n
        );
      }
      function u(t, e) {
        var n,
          o,
          r = p(t, 'labels'),
          a = (0, s.j2)(e);
        return (
          h(r, a) ||
          (i.isFunction(a)
            ? (n = g(t, a))
            : ((o =
                'auto' === a
                  ? (function (t) {
                      var e = l(t).autoInterval;
                      return null != e ? e : (l(t).autoInterval = t.calculateCategoryInterval());
                    })(t)
                  : a),
              (n = f(t, o))),
          d(r, a, { labels: n, labelCategoryInterval: o }))
        );
      }
      function p(t, e) {
        return l(t)[e] || (l(t)[e] = []);
      }
      function h(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n].key === e) return t[n].value;
      }
      function d(t, e, n) {
        return (t.push({ key: e, value: n }), n);
      }
      function f(t, e, n) {
        var i = (0, s.ry)(t),
          o = t.scale,
          r = o.getExtent(),
          a = t.getLabelModel(),
          l = [],
          c = Math.max((e || 0) + 1, 1),
          u = r[0],
          p = o.count();
        0 !== u && c > 1 && p / c > 2 && (u = Math.round(Math.ceil(u / c) * c));
        var h = (0, s.PJ)(t),
          d = a.get('showMinLabel') || h,
          f = a.get('showMaxLabel') || h;
        d && u !== r[0] && m(r[0]);
        for (var g = u; g <= r[1]; g += c) m(g);
        function m(t) {
          var e = { value: t };
          l.push(n ? t : { formattedLabel: i(e), rawLabel: o.getLabel(e), tickValue: t });
        }
        return (f && g - c !== r[1] && m(r[1]), l);
      }
      function g(t, e, n) {
        var o = t.scale,
          r = (0, s.ry)(t),
          a = [];
        return (
          i.each(o.getTicks(), function (t) {
            var i = o.getLabel(t),
              s = t.value;
            e(t.value, i) && a.push(n ? s : { formattedLabel: r(t), rawLabel: i, tickValue: s });
          }),
          a
        );
      }
      var m = [0, 1];
      function y(t, e) {
        var n = (t[1] - t[0]) / e / 2;
        ((t[0] += n), (t[1] -= n));
      }
      const v = (function () {
        function t(t, e, n) {
          ((this.onBand = !1),
            (this.inverse = !1),
            (this.dim = t),
            (this.scale = e),
            (this._extent = n || [0, 0]));
        }
        return (
          (t.prototype.contain = function (t) {
            var e = this._extent,
              n = Math.min(e[0], e[1]),
              i = Math.max(e[0], e[1]);
            return t >= n && t <= i;
          }),
          (t.prototype.containData = function (t) {
            return this.scale.contain(t);
          }),
          (t.prototype.getExtent = function () {
            return this._extent.slice();
          }),
          (t.prototype.getPixelPrecision = function (t) {
            return (0, o.hb)(t || this.scale.getExtent(), this._extent);
          }),
          (t.prototype.setExtent = function (t, e) {
            var n = this._extent;
            ((n[0] = t), (n[1] = e));
          }),
          (t.prototype.dataToCoord = function (t, e) {
            var n = this._extent,
              i = this.scale;
            return (
              (t = i.normalize(t)),
              this.onBand && 'ordinal' === i.type && y((n = n.slice()), i.count()),
              (0, o.Cb)(t, m, n, e)
            );
          }),
          (t.prototype.coordToData = function (t, e) {
            var n = this._extent,
              i = this.scale;
            this.onBand && 'ordinal' === i.type && y((n = n.slice()), i.count());
            var r = (0, o.Cb)(t, n, m, e);
            return this.scale.scale(r);
          }),
          (t.prototype.pointToData = function (t, e) {}),
          (t.prototype.getTicksCoords = function (t) {
            var e = (t = t || {}).tickModel || this.getTickModel(),
              n = (function (t, e) {
                var n = t.getTickModel().get('customValues');
                if (n) {
                  var o = t.scale.getExtent(),
                    r = c(t, n);
                  return {
                    ticks: i.filter(r, function (t) {
                      return t >= o[0] && t <= o[1];
                    }),
                  };
                }
                return 'category' === t.type
                  ? (function (t, e) {
                      var n,
                        o,
                        r = p(t, 'ticks'),
                        a = (0, s.j2)(e),
                        l = h(r, a);
                      if (l) return l;
                      if (((e.get('show') && !t.scale.isBlank()) || (n = []), i.isFunction(a)))
                        n = g(t, a, !0);
                      else if ('auto' === a) {
                        var c = u(t, t.getLabelModel());
                        ((o = c.labelCategoryInterval),
                          (n = i.map(c.labels, function (t) {
                            return t.tickValue;
                          })));
                      } else n = f(t, (o = a), !0);
                      return d(r, a, { ticks: n, tickCategoryInterval: o });
                    })(t, e)
                  : {
                      ticks: i.map(t.scale.getTicks(), function (t) {
                        return t.value;
                      }),
                    };
              })(this, e).ticks,
              r = (0, i.map)(
                n,
                function (t) {
                  return {
                    coord: this.dataToCoord(
                      'ordinal' === this.scale.type ? this.scale.getRawOrdinalNumber(t) : t,
                    ),
                    tickValue: t,
                  };
                },
                this,
              );
            return (
              (function (t, e, n, r) {
                var a = e.length;
                if (t.onBand && !n && a) {
                  var s,
                    l,
                    c = t.getExtent();
                  if (1 === a)
                    ((e[0].coord = c[0]), (s = e[1] = { coord: c[1], tickValue: e[0].tickValue }));
                  else {
                    var u = e[a - 1].tickValue - e[0].tickValue,
                      p = (e[a - 1].coord - e[0].coord) / u;
                    (0, i.each)(e, function (t) {
                      t.coord -= p / 2;
                    });
                    var h = t.scale.getExtent();
                    ((l = 1 + h[1] - e[a - 1].tickValue),
                      (s = { coord: e[a - 1].coord + p * l, tickValue: h[1] + 1 }),
                      e.push(s));
                  }
                  var d = c[0] > c[1];
                  (f(e[0].coord, c[0]) && (r ? (e[0].coord = c[0]) : e.shift()),
                    r && f(c[0], e[0].coord) && e.unshift({ coord: c[0] }),
                    f(c[1], s.coord) && (r ? (s.coord = c[1]) : e.pop()),
                    r && f(s.coord, c[1]) && e.push({ coord: c[1] }));
                }
                function f(t, e) {
                  return ((t = (0, o.LI)(t)), (e = (0, o.LI)(e)), d ? t > e : t < e);
                }
              })(this, r, e.get('alignWithLabel'), t.clamp),
              r
            );
          }),
          (t.prototype.getMinorTicksCoords = function () {
            if ('ordinal' === this.scale.type) return [];
            var t = this.model.getModel('minorTick').get('splitNumber');
            (t > 0 && t < 100) || (t = 5);
            var e = this.scale.getMinorTicks(t);
            return (0, i.map)(
              e,
              function (t) {
                return (0, i.map)(
                  t,
                  function (t) {
                    return { coord: this.dataToCoord(t), tickValue: t };
                  },
                  this,
                );
              },
              this,
            );
          }),
          (t.prototype.getViewLabels = function () {
            return (function (t) {
              var e = t.getLabelModel().get('customValues');
              if (e) {
                var n = (0, s.ry)(t),
                  o = t.scale.getExtent(),
                  r = c(t, e),
                  a = i.filter(r, function (t) {
                    return t >= o[0] && t <= o[1];
                  });
                return {
                  labels: i.map(a, function (e) {
                    var i = { value: e };
                    return { formattedLabel: n(i), rawLabel: t.scale.getLabel(i), tickValue: e };
                  }),
                };
              }
              return 'category' === t.type
                ? (function (t) {
                    var e = t.getLabelModel(),
                      n = u(t, e);
                    return !e.get('show') || t.scale.isBlank()
                      ? { labels: [], labelCategoryInterval: n.labelCategoryInterval }
                      : n;
                  })(t)
                : (function (t) {
                    var e = t.scale.getTicks(),
                      n = (0, s.ry)(t);
                    return {
                      labels: i.map(e, function (e, i) {
                        return {
                          level: e.level,
                          formattedLabel: n(e, i),
                          rawLabel: t.scale.getLabel(e),
                          tickValue: e.value,
                        };
                      }),
                    };
                  })(t);
            })(this).labels;
          }),
          (t.prototype.getLabelModel = function () {
            return this.model.getModel('axisLabel');
          }),
          (t.prototype.getTickModel = function () {
            return this.model.getModel('axisTick');
          }),
          (t.prototype.getBandWidth = function () {
            var t = this._extent,
              e = this.scale.getExtent(),
              n = e[1] - e[0] + (this.onBand ? 1 : 0);
            0 === n && (n = 1);
            var i = Math.abs(t[1] - t[0]);
            return Math.abs(i) / n;
          }),
          (t.prototype.calculateCategoryInterval = function () {
            return (function (t) {
              var e = (function (t) {
                  var e = t.getLabelModel();
                  return {
                    axisRotate: t.getRotate
                      ? t.getRotate()
                      : t.isHorizontal && !t.isHorizontal()
                        ? 90
                        : 0,
                    labelRotate: e.get('rotate') || 0,
                    font: e.getFont(),
                  };
                })(t),
                n = (0, s.ry)(t),
                i = ((e.axisRotate - e.labelRotate) / 180) * Math.PI,
                o = t.scale,
                a = o.getExtent(),
                c = o.count();
              if (a[1] - a[0] < 1) return 0;
              var u = 1;
              c > 40 && (u = Math.max(1, Math.floor(c / 40)));
              for (
                var p = a[0],
                  h = t.dataToCoord(p + 1) - t.dataToCoord(p),
                  d = Math.abs(h * Math.cos(i)),
                  f = Math.abs(h * Math.sin(i)),
                  g = 0,
                  m = 0;
                p <= a[1];
                p += u
              ) {
                var y,
                  v,
                  x = r.NO(n({ value: p }), e.font, 'center', 'top');
                ((y = 1.3 * x.width),
                  (v = 1.3 * x.height),
                  (g = Math.max(g, y, 7)),
                  (m = Math.max(m, v, 7)));
              }
              var _ = g / d,
                A = m / f;
              (isNaN(_) && (_ = 1 / 0), isNaN(A) && (A = 1 / 0));
              var M = Math.max(0, Math.floor(Math.min(_, A))),
                T = l(t.model),
                w = t.getExtent(),
                b = T.lastAutoInterval,
                S = T.lastTickCount;
              return (
                null != b &&
                null != S &&
                Math.abs(b - M) <= 1 &&
                Math.abs(S - c) <= 1 &&
                b > M &&
                T.axisExtent0 === w[0] &&
                T.axisExtent1 === w[1]
                  ? (M = b)
                  : ((T.lastTickCount = c),
                    (T.lastAutoInterval = M),
                    (T.axisExtent0 = w[0]),
                    (T.axisExtent1 = w[1])),
                M
              );
            })(this);
          }),
          t
        );
      })();
    },
    741849: (t, e, n) => {
      function i(t, e) {
        return t.type === e;
      }
      n.d(e, { g: () => i });
    },
    556219: (t, e, n) => {
      n.d(e, { A: () => p });
      var i = n(15215),
        o = n(983509),
        r = n(345587),
        a = n(529308),
        s = n(692836),
        l = n(624326),
        c = o.applyTransform;
      function u(t) {
        var e = t.seriesModel;
        return e ? e.coordinateSystem : null;
      }
      const p = (function (t) {
        function e(e) {
          var n = t.call(this) || this;
          return (
            (n.type = 'view'),
            (n.dimensions = ['x', 'y']),
            (n._roamTransformable = new s.Ay()),
            (n._rawTransformable = new s.Ay()),
            (n.name = e),
            n
          );
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.setBoundingRect = function (t, e, n, i) {
            return ((this._rect = new a.A(t, e, n, i)), this._rect);
          }),
          (e.prototype.getBoundingRect = function () {
            return this._rect;
          }),
          (e.prototype.setViewRect = function (t, e, n, i) {
            (this._transformTo(t, e, n, i), (this._viewRect = new a.A(t, e, n, i)));
          }),
          (e.prototype._transformTo = function (t, e, n, i) {
            var o = this.getBoundingRect(),
              r = this._rawTransformable;
            r.transform = o.calculateTransform(new a.A(t, e, n, i));
            var s = r.parent;
            ((r.parent = null), r.decomposeTransform(), (r.parent = s), this._updateTransform());
          }),
          (e.prototype.setCenter = function (t, e) {
            t &&
              ((this._center = [(0, l.lo)(t[0], e.getWidth()), (0, l.lo)(t[1], e.getHeight())]),
              this._updateCenterAndZoom());
          }),
          (e.prototype.setZoom = function (t) {
            t = t || 1;
            var e = this.zoomLimit;
            (e &&
              (null != e.max && (t = Math.min(e.max, t)),
              null != e.min && (t = Math.max(e.min, t))),
              (this._zoom = t),
              this._updateCenterAndZoom());
          }),
          (e.prototype.getDefaultCenter = function () {
            var t = this.getBoundingRect();
            return [t.x + t.width / 2, t.y + t.height / 2];
          }),
          (e.prototype.getCenter = function () {
            return this._center || this.getDefaultCenter();
          }),
          (e.prototype.getZoom = function () {
            return this._zoom || 1;
          }),
          (e.prototype.getRoamTransform = function () {
            return this._roamTransformable.getLocalTransform();
          }),
          (e.prototype._updateCenterAndZoom = function () {
            var t = this._rawTransformable.getLocalTransform(),
              e = this._roamTransformable,
              n = this.getDefaultCenter(),
              i = this.getCenter(),
              r = this.getZoom();
            ((i = o.applyTransform([], i, t)),
              (n = o.applyTransform([], n, t)),
              (e.originX = i[0]),
              (e.originY = i[1]),
              (e.x = n[0] - i[0]),
              (e.y = n[1] - i[1]),
              (e.scaleX = e.scaleY = r),
              this._updateTransform());
          }),
          (e.prototype._updateTransform = function () {
            var t = this._roamTransformable,
              e = this._rawTransformable;
            ((e.parent = t),
              t.updateTransform(),
              e.updateTransform(),
              r.copy(this.transform || (this.transform = []), e.transform || r.create()),
              (this._rawTransform = e.getLocalTransform()),
              (this.invTransform = this.invTransform || []),
              r.invert(this.invTransform, this.transform),
              this.decomposeTransform());
          }),
          (e.prototype.getTransformInfo = function () {
            var t = this._rawTransformable,
              e = this._roamTransformable,
              n = new s.Ay();
            return (
              (n.transform = e.transform),
              n.decomposeTransform(),
              {
                roam: { x: n.x, y: n.y, scaleX: n.scaleX, scaleY: n.scaleY },
                raw: { x: t.x, y: t.y, scaleX: t.scaleX, scaleY: t.scaleY },
              }
            );
          }),
          (e.prototype.getViewRect = function () {
            return this._viewRect;
          }),
          (e.prototype.getViewRectAfterRoam = function () {
            var t = this.getBoundingRect().clone();
            return (t.applyTransform(this.transform), t);
          }),
          (e.prototype.dataToPoint = function (t, e, n) {
            var i = e ? this._rawTransform : this.transform;
            return ((n = n || []), i ? c(n, t, i) : o.copy(n, t));
          }),
          (e.prototype.pointToData = function (t) {
            var e = this.invTransform;
            return e ? c([], t, e) : [t[0], t[1]];
          }),
          (e.prototype.convertToPixel = function (t, e, n) {
            var i = u(e);
            return i === this ? i.dataToPoint(n) : null;
          }),
          (e.prototype.convertFromPixel = function (t, e, n) {
            var i = u(e);
            return i === this ? i.pointToData(n) : null;
          }),
          (e.prototype.containPoint = function (t) {
            return this.getViewRectAfterRoam().contain(t[0], t[1]);
          }),
          (e.dimensions = ['x', 'y']),
          e
        );
      })(s.Ay);
    },
    103486: (t, e, n) => {
      n.d(e, { m: () => l });
      var i = n(624326),
        o = n(274562),
        r = n(399031),
        a = n(667071),
        s = Math.log;
      function l(t, e, n) {
        var l = o.A.prototype,
          c = l.getTicks.call(n),
          u = l.getTicks.call(n, !0),
          p = c.length - 1,
          h = l.getInterval.call(n),
          d = (0, r.Rx)(t, e),
          f = d.extent,
          g = d.fixMin,
          m = d.fixMax;
        if ('log' === t.type) {
          var y = s(t.base);
          f = [s(f[0]) / y, s(f[1]) / y];
        }
        (t.setExtent(f[0], f[1]), t.calcNiceExtent({ splitNumber: p, fixMin: g, fixMax: m }));
        var v = l.getExtent.call(t);
        (g && (f[0] = v[0]), m && (f[1] = v[1]));
        var x = l.getInterval.call(t),
          _ = f[0],
          A = f[1];
        if (g && m) x = (A - _) / p;
        else if (g)
          for (A = f[0] + x * p; A < f[1] && isFinite(A) && isFinite(f[1]);)
            ((x = (0, a.kH)(x)), (A = f[0] + x * p));
        else if (m)
          for (_ = f[1] - x * p; _ > f[0] && isFinite(_) && isFinite(f[0]);)
            ((x = (0, a.kH)(x)), (_ = f[1] - x * p));
        else {
          t.getTicks().length - 1 > p && (x = (0, a.kH)(x));
          var M = x * p;
          ((A = Math.ceil(f[1] / x) * x),
            (_ = (0, i.LI)(A - M)) < 0 && f[0] >= 0
              ? ((_ = 0), (A = (0, i.LI)(M)))
              : A > 0 && f[1] <= 0 && ((A = 0), (_ = -(0, i.LI)(M))));
        }
        var T = (c[0].value - u[0].value) / h,
          w = (c[p].value - u[p].value) / h;
        (l.setExtent.call(t, _ + x * T, A + x * w),
          l.setInterval.call(t, x),
          (T || w) && l.setNiceExtent.call(t, _ + x, A - x));
      }
    },
    613286: (t, e, n) => {
      n.d(e, { A: () => s });
      var i = n(498026),
        o = {
          show: !0,
          z: 0,
          inverse: !1,
          name: '',
          nameLocation: 'end',
          nameRotate: null,
          nameTruncate: { maxWidth: null, ellipsis: '...', placeholder: '.' },
          nameTextStyle: {},
          nameGap: 15,
          silent: !1,
          triggerEvent: !1,
          tooltip: { show: !1 },
          axisPointer: {},
          axisLine: {
            show: !0,
            onZero: !0,
            onZeroAxisIndex: null,
            lineStyle: { color: '#6E7079', width: 1, type: 'solid' },
            symbol: ['none', 'none'],
            symbolSize: [10, 15],
          },
          axisTick: { show: !0, inside: !1, length: 5, lineStyle: { width: 1 } },
          axisLabel: {
            show: !0,
            inside: !1,
            rotate: 0,
            showMinLabel: null,
            showMaxLabel: null,
            margin: 8,
            fontSize: 12,
          },
          splitLine: {
            show: !0,
            showMinLine: !0,
            showMaxLine: !0,
            lineStyle: { color: ['#E0E6F1'], width: 1, type: 'solid' },
          },
          splitArea: {
            show: !1,
            areaStyle: { color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)'] },
          },
        },
        r = i.merge(
          {
            boundaryGap: !0,
            deduplication: null,
            splitLine: { show: !1 },
            axisTick: { alignWithLabel: !1, interval: 'auto' },
            axisLabel: { interval: 'auto' },
          },
          o,
        ),
        a = i.merge(
          {
            boundaryGap: [0, 0],
            axisLine: { show: 'auto' },
            axisTick: { show: 'auto' },
            splitNumber: 5,
            minorTick: { show: !1, splitNumber: 5, length: 3, lineStyle: {} },
            minorSplitLine: { show: !1, lineStyle: { color: '#F4F7FD', width: 1 } },
          },
          o,
        );
      const s = {
        category: r,
        value: a,
        time: i.merge(
          {
            splitNumber: 6,
            axisLabel: {
              showMinLabel: !1,
              showMaxLabel: !1,
              rich: { primary: { fontWeight: 'bold' } },
            },
            splitLine: { show: !1 },
          },
          a,
        ),
        log: i.defaults({ logBase: 10 }, a),
      };
    },
    399031: (t, e, n) => {
      n.d(e, {
        Dt: () => v,
        JJ: () => m,
        Og: () => x,
        PJ: () => M,
        PN: () => w,
        Rx: () => d,
        af: () => f,
        f$: () => g,
        j2: () => A,
        ry: () => y,
        wq: () => T,
      });
      var i = n(498026),
        o = n(818550),
        r = n(274562),
        a = n(28613),
        s = n(462536),
        l = n(529308),
        c = n(812706),
        u = n(48605),
        p = n(265008),
        h = n(942262);
      function d(t, e) {
        var n = t.type,
          o = (0, h.Tc)(t, e, t.getExtent()).calculate();
        t.setBlank(o.isBlank);
        var r = o.min,
          a = o.max,
          l = e.ecModel;
        if (l && 'time' === n) {
          var c = (0, s.GL)('bar', l),
            u = !1;
          if (
            (i.each(c, function (t) {
              u = u || t.getBaseAxis() === e.axis;
            }),
            u)
          ) {
            var p = (0, s.vq)(c),
              d = (function (t, e, n, o) {
                var r = n.axis.getExtent(),
                  a = Math.abs(r[1] - r[0]),
                  l = (0, s.VA)(o, n.axis);
                if (void 0 === l) return { min: t, max: e };
                var c = 1 / 0;
                i.each(l, function (t) {
                  c = Math.min(t.offset, c);
                });
                var u = -1 / 0;
                (i.each(l, function (t) {
                  u = Math.max(t.offset + t.width, u);
                }),
                  (c = Math.abs(c)),
                  (u = Math.abs(u)));
                var p = c + u,
                  h = e - t,
                  d = h / (1 - (c + u) / a) - h;
                return { min: (t -= d * (c / p)), max: (e += d * (u / p)) };
              })(r, a, e, p);
            ((r = d.min), (a = d.max));
          }
        }
        return { extent: [r, a], fixMin: o.minFixed, fixMax: o.maxFixed };
      }
      function f(t, e) {
        var n = e,
          i = d(t, n),
          o = i.extent,
          r = n.get('splitNumber');
        t instanceof u.A && (t.base = n.get('logBase'));
        var a = t.type,
          s = n.get('interval'),
          l = 'interval' === a || 'time' === a;
        (t.setExtent(o[0], o[1]),
          t.calcNiceExtent({
            splitNumber: r,
            fixMin: i.fixMin,
            fixMax: i.fixMax,
            minInterval: l ? n.get('minInterval') : null,
            maxInterval: l ? n.get('maxInterval') : null,
          }),
          null != s && t.setInterval && t.setInterval(s));
      }
      function g(t, e) {
        if ((e = e || t.get('type')))
          switch (e) {
            case 'category':
              return new o.A({
                ordinalMeta: t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(),
                extent: [1 / 0, -1 / 0],
              });
            case 'time':
              return new c.A({
                locale: t.ecModel.getLocaleModel(),
                useUTC: t.ecModel.get('useUTC'),
              });
            default:
              return new (a.A.getClass(e) || r.A)();
          }
      }
      function m(t) {
        var e = t.scale.getExtent(),
          n = e[0],
          i = e[1];
        return !((n > 0 && i > 0) || (n < 0 && i < 0));
      }
      function y(t) {
        var e,
          n,
          o = t.getLabelModel().get('formatter'),
          r = 'category' === t.type ? t.scale.getExtent()[0] : null;
        return 'time' === t.scale.type
          ? ((n = o),
            function (e, i) {
              return t.scale.getFormattedLabel(e, i, n);
            })
          : i.isString(o)
            ? (function (e) {
                return function (n) {
                  var i = t.scale.getLabel(n);
                  return e.replace('{value}', null != i ? i : '');
                };
              })(o)
            : i.isFunction(o)
              ? ((e = o),
                function (n, i) {
                  return (
                    null != r && (i = n.value - r),
                    e(v(t, n), i, null != n.level ? { level: n.level } : null)
                  );
                })
              : function (e) {
                  return t.scale.getLabel(e);
                };
      }
      function v(t, e) {
        return 'category' === t.type ? t.scale.getLabel(e) : e.value;
      }
      function x(t) {
        var e = t.model,
          n = t.scale;
        if (e.get(['axisLabel', 'show']) && !n.isBlank()) {
          var i,
            r,
            a = n.getExtent();
          r = n instanceof o.A ? n.count() : (i = n.getTicks()).length;
          var s,
            l = t.getLabelModel(),
            c = y(t),
            u = 1;
          r > 40 && (u = Math.ceil(r / 40));
          for (var p = 0; p < r; p += u) {
            var h = c(i ? i[p] : { value: a[0] + p }, p),
              d = _(l.getTextRect(h), l.get('rotate') || 0);
            s ? s.union(d) : (s = d);
          }
          return s;
        }
      }
      function _(t, e) {
        var n = (e * Math.PI) / 180,
          i = t.width,
          o = t.height,
          r = i * Math.abs(Math.cos(n)) + Math.abs(o * Math.sin(n)),
          a = i * Math.abs(Math.sin(n)) + Math.abs(o * Math.cos(n));
        return new l.A(t.x, t.y, r, a);
      }
      function A(t) {
        return t.get('interval') ?? 'auto';
      }
      function M(t) {
        return 'category' === t.type && 0 === A(t.getLabelModel());
      }
      function T(t, e) {
        var n = {};
        return (
          i.each(t.mapDimensionsAll(e), function (e) {
            n[(0, p.me)(t, e)] = !0;
          }),
          i.keys(n)
        );
      }
      function w(t, e, n) {
        e &&
          i.each(T(e, n), function (n) {
            var i = e.getApproximateExtent(n);
            (i[0] < t[0] && (t[0] = i[0]), i[1] > t[1] && (t[1] = i[1]));
          });
      }
    },
    912462: (t, e, n) => {
      n.d(e, { L: () => i });
      var i = (function () {
        function t() {}
        return (
          (t.prototype.getNeedCrossZero = function () {
            return !this.option.scale;
          }),
          (t.prototype.getCoordSysModel = function () {}),
          t
        );
      })();
    },
    859470: (t, e, n) => {
      n.d(e, { A: () => c });
      var i = n(15215),
        o = n(613286),
        r = n(834253),
        a = n(415135),
        s = { value: 1, category: 1, time: 1, log: 1 },
        l = n(498026);
      function c(t, e, n, c) {
        ((0, l.each)(s, function (s, p) {
          var h = (0, l.merge)((0, l.merge)({}, o.A[p], !0), c, !0),
            d = (function (t) {
              function n() {
                var n = (null !== t && t.apply(this, arguments)) || this;
                return ((n.type = e + 'Axis.' + p), n);
              }
              return (
                (0, i.__extends)(n, t),
                (n.prototype.mergeDefaultAndTheme = function (t, e) {
                  var n = (0, r.ad)(this),
                    i = n ? (0, r.vs)(t) : {},
                    o = e.getTheme();
                  ((0, l.merge)(t, o.get(p + 'Axis')),
                    (0, l.merge)(t, this.getDefaultOption()),
                    (t.type = u(t)),
                    n && (0, r.YA)(t, i, n));
                }),
                (n.prototype.optionUpdated = function () {
                  'category' === this.option.type &&
                    (this.__ordinalMeta = a.A.createByAxisModel(this));
                }),
                (n.prototype.getCategories = function (t) {
                  var e = this.option;
                  if ('category' === e.type) return t ? e.data : this.__ordinalMeta.categories;
                }),
                (n.prototype.getOrdinalMeta = function () {
                  return this.__ordinalMeta;
                }),
                (n.type = e + 'Axis.' + p),
                (n.defaultOption = h),
                n
              );
            })(n);
          t.registerComponentModel(d);
        }),
          t.registerSubTypeDefaulter(e + 'Axis', u));
      }
      function u(t) {
        return t.type || (t.data ? 'category' : 'value');
      }
    },
    223509: (t, e, n) => {
      n.d(e, { A: () => l });
      var i = n(498026),
        o = n(834253),
        r = n(624326),
        a = 864e5;
      function s(t) {
        var e = t.calendarModel,
          n = t.seriesModel;
        return e ? e.coordinateSystem : n ? n.coordinateSystem : null;
      }
      const l = (function () {
        function t(e, n, i) {
          ((this.type = 'calendar'),
            (this.dimensions = t.dimensions),
            (this.getDimensionsInfo = t.getDimensionsInfo),
            (this._model = e));
        }
        return (
          (t.getDimensionsInfo = function () {
            return [{ name: 'time', type: 'time' }, 'value'];
          }),
          (t.prototype.getRangeInfo = function () {
            return this._rangeInfo;
          }),
          (t.prototype.getModel = function () {
            return this._model;
          }),
          (t.prototype.getRect = function () {
            return this._rect;
          }),
          (t.prototype.getCellWidth = function () {
            return this._sw;
          }),
          (t.prototype.getCellHeight = function () {
            return this._sh;
          }),
          (t.prototype.getOrient = function () {
            return this._orient;
          }),
          (t.prototype.getFirstDayOfWeek = function () {
            return this._firstDayOfWeek;
          }),
          (t.prototype.getDateInfo = function (t) {
            var e = (t = r._U(t)).getFullYear(),
              n = t.getMonth() + 1,
              i = n < 10 ? '0' + n : '' + n,
              o = t.getDate(),
              a = o < 10 ? '0' + o : '' + o,
              s = t.getDay();
            return {
              y: e + '',
              m: i,
              d: a,
              day: (s = Math.abs((s + 7 - this.getFirstDayOfWeek()) % 7)),
              time: t.getTime(),
              formatedDate: e + '-' + i + '-' + a,
              date: t,
            };
          }),
          (t.prototype.getNextNDay = function (t, e) {
            return (
              0 === (e = e || 0) ||
                (t = new Date(this.getDateInfo(t).time)).setDate(t.getDate() + e),
              this.getDateInfo(t)
            );
          }),
          (t.prototype.update = function (t, e) {
            ((this._firstDayOfWeek = +this._model.getModel('dayLabel').get('firstDay')),
              (this._orient = this._model.get('orient')),
              (this._lineWidth = this._model.getModel('itemStyle').getItemStyle().lineWidth || 0),
              (this._rangeInfo = this._getRangeInfo(this._initRangeOption())));
            var n = this._rangeInfo.weeks || 1,
              r = ['width', 'height'],
              a = this._model.getCellSize().slice(),
              s = this._model.getBoxLayoutParams(),
              l = 'horizontal' === this._orient ? [n, 7] : [7, n];
            i.each([0, 1], function (t) {
              p(a, t) && (s[r[t]] = a[t] * l[t]);
            });
            var c = { width: e.getWidth(), height: e.getHeight() },
              u = (this._rect = o.dV(s, c));
            function p(t, e) {
              return null != t[e] && 'auto' !== t[e];
            }
            (i.each([0, 1], function (t) {
              p(a, t) || (a[t] = u[r[t]] / l[t]);
            }),
              (this._sw = a[0]),
              (this._sh = a[1]));
          }),
          (t.prototype.dataToPoint = function (t, e) {
            (i.isArray(t) && (t = t[0]), null == e && (e = !0));
            var n = this.getDateInfo(t),
              o = this._rangeInfo,
              r = n.formatedDate;
            if (e && !(n.time >= o.start.time && n.time < o.end.time + a)) return [NaN, NaN];
            var s = n.day,
              l = this._getRangeInfo([o.start.time, r]).nthWeek;
            return 'vertical' === this._orient
              ? [
                  this._rect.x + s * this._sw + this._sw / 2,
                  this._rect.y + l * this._sh + this._sh / 2,
                ]
              : [
                  this._rect.x + l * this._sw + this._sw / 2,
                  this._rect.y + s * this._sh + this._sh / 2,
                ];
          }),
          (t.prototype.pointToData = function (t) {
            var e = this.pointToDate(t);
            return e && e.time;
          }),
          (t.prototype.dataToRect = function (t, e) {
            var n = this.dataToPoint(t, e);
            return {
              contentShape: {
                x: n[0] - (this._sw - this._lineWidth) / 2,
                y: n[1] - (this._sh - this._lineWidth) / 2,
                width: this._sw - this._lineWidth,
                height: this._sh - this._lineWidth,
              },
              center: n,
              tl: [n[0] - this._sw / 2, n[1] - this._sh / 2],
              tr: [n[0] + this._sw / 2, n[1] - this._sh / 2],
              br: [n[0] + this._sw / 2, n[1] + this._sh / 2],
              bl: [n[0] - this._sw / 2, n[1] + this._sh / 2],
            };
          }),
          (t.prototype.pointToDate = function (t) {
            var e = Math.floor((t[0] - this._rect.x) / this._sw) + 1,
              n = Math.floor((t[1] - this._rect.y) / this._sh) + 1,
              i = this._rangeInfo.range;
            return 'vertical' === this._orient
              ? this._getDateByWeeksAndDay(n, e - 1, i)
              : this._getDateByWeeksAndDay(e, n - 1, i);
          }),
          (t.prototype.convertToPixel = function (t, e, n) {
            var i = s(e);
            return i === this ? i.dataToPoint(n) : null;
          }),
          (t.prototype.convertFromPixel = function (t, e, n) {
            var i = s(e);
            return i === this ? i.pointToData(n) : null;
          }),
          (t.prototype.containPoint = function (t) {
            return (console.warn('Not implemented.'), !1);
          }),
          (t.prototype._initRangeOption = function () {
            var t,
              e = this._model.get('range');
            if ((i.isArray(e) && 1 === e.length && (e = e[0]), i.isArray(e))) t = e;
            else {
              var n = e.toString();
              if (
                (/^\d{4}$/.test(n) && (t = [n + '-01-01', n + '-12-31']),
                /^\d{4}[\/|-]\d{1,2}$/.test(n))
              ) {
                var o = this.getDateInfo(n),
                  r = o.date;
                r.setMonth(r.getMonth() + 1);
                var a = this.getNextNDay(r, -1);
                t = [o.formatedDate, a.formatedDate];
              }
              /^\d{4}[\/|-]\d{1,2}[\/|-]\d{1,2}$/.test(n) && (t = [n, n]);
            }
            if (!t) return e;
            var s = this._getRangeInfo(t);
            return (s.start.time > s.end.time && t.reverse(), t);
          }),
          (t.prototype._getRangeInfo = function (t) {
            var e,
              n = [this.getDateInfo(t[0]), this.getDateInfo(t[1])];
            n[0].time > n[1].time && ((e = !0), n.reverse());
            var i = Math.floor(n[1].time / a) - Math.floor(n[0].time / a) + 1,
              o = new Date(n[0].time),
              r = o.getDate(),
              s = n[1].date.getDate();
            o.setDate(r + i - 1);
            var l = o.getDate();
            if (l !== s)
              for (
                var c = o.getTime() - n[1].time > 0 ? 1 : -1;
                (l = o.getDate()) !== s && (o.getTime() - n[1].time) * c > 0;
              )
                ((i -= c), o.setDate(l - c));
            var u = Math.floor((i + n[0].day + 6) / 7),
              p = e ? 1 - u : u - 1;
            return (
              e && n.reverse(),
              {
                range: [n[0].formatedDate, n[1].formatedDate],
                start: n[0],
                end: n[1],
                allDay: i,
                weeks: u,
                nthWeek: p,
                fweek: n[0].day,
                lweek: n[1].day,
              }
            );
          }),
          (t.prototype._getDateByWeeksAndDay = function (t, e, n) {
            var i = this._getRangeInfo(n);
            if (t > i.weeks || (0 === t && e < i.fweek) || (t === i.weeks && e > i.lweek))
              return null;
            var o = 7 * (t - 1) - i.fweek + e,
              r = new Date(i.start.time);
            return (r.setDate(+i.start.d + o), this.getDateInfo(r));
          }),
          (t.create = function (e, n) {
            var i = [];
            return (
              e.eachComponent('calendar', function (o) {
                var r = new t(o, e, n);
                (i.push(r), (o.coordinateSystem = r));
              }),
              e.eachSeries(function (t) {
                'calendar' === t.get('coordinateSystem') &&
                  (t.coordinateSystem = i[t.get('calendarIndex') || 0]);
              }),
              i
            );
          }),
          (t.dimensions = ['time', 'value']),
          t
        );
      })();
    },
    205196: (t, e, n) => {
      n.d(e, { A: () => l });
      var i = n(15215),
        o = n(498026),
        r = n(515915),
        a = n(834253);
      function s(t, e) {
        var n,
          i = t.cellSize;
        1 === (n = o.isArray(i) ? i : (t.cellSize = [i, i])).length && (n[1] = n[0]);
        var r = o.map([0, 1], function (t) {
          return ((0, a.Qf)(e, t) && (n[t] = 'auto'), null != n[t] && 'auto' !== n[t]);
        });
        (0, a.YA)(t, e, { type: 'box', ignoreSize: r });
      }
      const l = (function (t) {
        function e() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return ((n.type = e.type), n);
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.init = function (e, n, i) {
            var o = (0, a.vs)(e);
            (t.prototype.init.apply(this, arguments), s(e, o));
          }),
          (e.prototype.mergeOption = function (e) {
            (t.prototype.mergeOption.apply(this, arguments), s(this.option, e));
          }),
          (e.prototype.getCellSize = function () {
            return this.option.cellSize;
          }),
          (e.type = 'calendar'),
          (e.defaultOption = {
            z: 2,
            left: 80,
            top: 60,
            cellSize: 20,
            orient: 'horizontal',
            splitLine: { show: !0, lineStyle: { color: '#000', width: 1, type: 'solid' } },
            itemStyle: { color: '#fff', borderWidth: 1, borderColor: '#ccc' },
            dayLabel: { show: !0, firstDay: 0, position: 'start', margin: '50%', color: '#000' },
            monthLabel: {
              show: !0,
              position: 'start',
              margin: 5,
              align: 'center',
              formatter: null,
              color: '#000',
            },
            yearLabel: {
              show: !0,
              position: null,
              margin: 30,
              formatter: null,
              color: '#ccc',
              fontFamily: 'sans-serif',
              fontWeight: 'bolder',
              fontSize: 20,
            },
          }),
          e
        );
      })(r.A);
    },
    36915: (t, e, n) => {
      function i(t) {
        var e = t.getRect(),
          n = t.getRangeInfo();
        return {
          coordSys: {
            type: 'calendar',
            x: e.x,
            y: e.y,
            width: e.width,
            height: e.height,
            cellWidth: t.getCellWidth(),
            cellHeight: t.getCellHeight(),
            rangeInfo: { start: n.start, end: n.end, weeks: n.weeks, dayCount: n.allDay },
          },
          api: {
            coord: function (e, n) {
              return t.dataToPoint(e, n);
            },
          },
        };
      }
      n.d(e, { A: () => i });
    },
    57483: (t, e, n) => {
      n.d(e, { P: () => l });
      var i = n(15215),
        o = n(498026),
        r = n(515915),
        a = n(912462),
        s = n(48170),
        l = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getCoordSysModel = function () {
              return this.getReferringComponents('grid', s.US).models[0];
            }),
            (e.type = 'cartesian2dAxis'),
            e
          );
        })(r.A);
      o.mixin(l, a.L);
    },
    574345: (t, e, n) => {
      n.d(e, { A: () => T });
      var i = n(498026),
        o = n(834253),
        r = n(399031),
        a = n(15215),
        s = n(529308);
      const l = (function () {
        function t(t) {
          ((this.type = 'cartesian'),
            (this._dimList = []),
            (this._axes = {}),
            (this.name = t || ''));
        }
        return (
          (t.prototype.getAxis = function (t) {
            return this._axes[t];
          }),
          (t.prototype.getAxes = function () {
            return i.map(
              this._dimList,
              function (t) {
                return this._axes[t];
              },
              this,
            );
          }),
          (t.prototype.getAxesByScale = function (t) {
            return (
              (t = t.toLowerCase()),
              i.filter(this.getAxes(), function (e) {
                return e.scale.type === t;
              })
            );
          }),
          (t.prototype.addAxis = function (t) {
            var e = t.dim;
            ((this._axes[e] = t), this._dimList.push(e));
          }),
          t
        );
      })();
      var c = n(345587),
        u = n(983509),
        p = ['x', 'y'];
      function h(t) {
        return 'interval' === t.type || 'time' === t.type;
      }
      const d = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return ((e.type = 'cartesian2d'), (e.dimensions = p), e);
          }
          return (
            (0, a.__extends)(e, t),
            (e.prototype.calcAffineTransform = function () {
              this._transform = this._invTransform = null;
              var t = this.getAxis('x').scale,
                e = this.getAxis('y').scale;
              if (h(t) && h(e)) {
                var n = t.getExtent(),
                  i = e.getExtent(),
                  o = this.dataToPoint([n[0], i[0]]),
                  r = this.dataToPoint([n[1], i[1]]),
                  a = n[1] - n[0],
                  s = i[1] - i[0];
                if (a && s) {
                  var l = (r[0] - o[0]) / a,
                    u = (r[1] - o[1]) / s,
                    p = o[0] - n[0] * l,
                    d = o[1] - i[0] * u,
                    f = (this._transform = [l, 0, 0, u, p, d]);
                  this._invTransform = (0, c.invert)([], f);
                }
              }
            }),
            (e.prototype.getBaseAxis = function () {
              return (
                this.getAxesByScale('ordinal')[0] ||
                this.getAxesByScale('time')[0] ||
                this.getAxis('x')
              );
            }),
            (e.prototype.containPoint = function (t) {
              var e = this.getAxis('x'),
                n = this.getAxis('y');
              return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]));
            }),
            (e.prototype.containData = function (t) {
              return this.getAxis('x').containData(t[0]) && this.getAxis('y').containData(t[1]);
            }),
            (e.prototype.containZone = function (t, e) {
              var n = this.dataToPoint(t),
                i = this.dataToPoint(e),
                o = this.getArea(),
                r = new s.A(n[0], n[1], i[0] - n[0], i[1] - n[1]);
              return o.intersect(r);
            }),
            (e.prototype.dataToPoint = function (t, e, n) {
              n = n || [];
              var i = t[0],
                o = t[1];
              if (this._transform && null != i && isFinite(i) && null != o && isFinite(o))
                return (0, u.applyTransform)(n, t, this._transform);
              var r = this.getAxis('x'),
                a = this.getAxis('y');
              return (
                (n[0] = r.toGlobalCoord(r.dataToCoord(i, e))),
                (n[1] = a.toGlobalCoord(a.dataToCoord(o, e))),
                n
              );
            }),
            (e.prototype.clampData = function (t, e) {
              var n = this.getAxis('x').scale,
                i = this.getAxis('y').scale,
                o = n.getExtent(),
                r = i.getExtent(),
                a = n.parse(t[0]),
                s = i.parse(t[1]);
              return (
                ((e = e || [])[0] = Math.min(
                  Math.max(Math.min(o[0], o[1]), a),
                  Math.max(o[0], o[1]),
                )),
                (e[1] = Math.min(Math.max(Math.min(r[0], r[1]), s), Math.max(r[0], r[1]))),
                e
              );
            }),
            (e.prototype.pointToData = function (t, e) {
              var n = [];
              if (this._invTransform) return (0, u.applyTransform)(n, t, this._invTransform);
              var i = this.getAxis('x'),
                o = this.getAxis('y');
              return (
                (n[0] = i.coordToData(i.toLocalCoord(t[0]), e)),
                (n[1] = o.coordToData(o.toLocalCoord(t[1]), e)),
                n
              );
            }),
            (e.prototype.getOtherAxis = function (t) {
              return this.getAxis('x' === t.dim ? 'y' : 'x');
            }),
            (e.prototype.getArea = function (t) {
              t = t || 0;
              var e = this.getAxis('x').getGlobalExtent(),
                n = this.getAxis('y').getGlobalExtent(),
                i = Math.min(e[0], e[1]) - t,
                o = Math.min(n[0], n[1]) - t,
                r = Math.max(e[0], e[1]) - i + t,
                a = Math.max(n[0], n[1]) - o + t;
              return new s.A(i, o, r, a);
            }),
            e
          );
        })(l),
        f = (function (t) {
          function e(e, n, i, o, r) {
            var a = t.call(this, e, n, i) || this;
            return ((a.index = 0), (a.type = o || 'value'), (a.position = r || 'bottom'), a);
          }
          return (
            (0, a.__extends)(e, t),
            (e.prototype.isHorizontal = function () {
              var t = this.position;
              return 'top' === t || 'bottom' === t;
            }),
            (e.prototype.getGlobalExtent = function (t) {
              var e = this.getExtent();
              return (
                (e[0] = this.toGlobalCoord(e[0])),
                (e[1] = this.toGlobalCoord(e[1])),
                t && e[0] > e[1] && e.reverse(),
                e
              );
            }),
            (e.prototype.pointToData = function (t, e) {
              return this.coordToData(this.toLocalCoord(t['x' === this.dim ? 0 : 1]), e);
            }),
            (e.prototype.setCategorySortInfo = function (t) {
              if ('category' !== this.type) return !1;
              ((this.model.option.categorySortInfo = t), this.scale.setSortInfo(t));
            }),
            e
          );
        })(n(120912).A);
      var g = n(48170),
        m = n(196878),
        y = n(667071),
        v = n(103486),
        x = (function () {
          function t(t, e, n) {
            ((this.type = 'grid'),
              (this._coordsMap = {}),
              (this._coordsList = []),
              (this._axesMap = {}),
              (this._axesList = []),
              (this.axisPointerEnabled = !0),
              (this.dimensions = p),
              this._initCartesian(t, e, n),
              (this.model = t));
          }
          return (
            (t.prototype.getRect = function () {
              return this._rect;
            }),
            (t.prototype.update = function (t, e) {
              var n = this._axesMap;
              function o(t) {
                var e,
                  n = (0, i.keys)(t),
                  o = n.length;
                if (o) {
                  for (var a = [], s = o - 1; s >= 0; s--) {
                    var l = t[+n[s]],
                      c = l.model,
                      u = l.scale;
                    (0, y.rf)(u) && c.get('alignTicks') && null == c.get('interval')
                      ? a.push(l)
                      : ((0, r.af)(u, c), (0, y.rf)(u) && (e = l));
                  }
                  a.length &&
                    (e || ((e = a.pop()), (0, r.af)(e.scale, e.model)),
                    (0, i.each)(a, function (t) {
                      (0, v.m)(t.scale, t.model, e.scale);
                    }));
                }
              }
              (this._updateScale(t, this.model), o(n.x), o(n.y));
              var a = {};
              ((0, i.each)(n.x, function (t) {
                A(n, 'y', t, a);
              }),
                (0, i.each)(n.y, function (t) {
                  A(n, 'x', t, a);
                }),
                this.resize(this.model, e));
            }),
            (t.prototype.resize = function (t, e, n) {
              var a = t.getBoxLayoutParams(),
                s = !n && t.get('containLabel'),
                l = (0, o.dV)(a, { width: e.getWidth(), height: e.getHeight() });
              this._rect = l;
              var c = this._axesList;
              function u() {
                (0, i.each)(c, function (t) {
                  var e = t.isHorizontal(),
                    n = e ? [0, l.width] : [0, l.height],
                    i = t.inverse ? 1 : 0;
                  (t.setExtent(n[i], n[1 - i]),
                    (function (t, e) {
                      var n = t.getExtent(),
                        i = n[0] + n[1];
                      ((t.toGlobalCoord =
                        'x' === t.dim
                          ? function (t) {
                              return t + e;
                            }
                          : function (t) {
                              return i - t + e;
                            }),
                        (t.toLocalCoord =
                          'x' === t.dim
                            ? function (t) {
                                return t - e;
                              }
                            : function (t) {
                                return i - t + e;
                              }));
                    })(t, e ? l.x : l.y));
                });
              }
              (u(),
                s &&
                  ((0, i.each)(c, function (t) {
                    if (!t.model.get(['axisLabel', 'inside'])) {
                      var e = (0, r.Og)(t);
                      if (e) {
                        var n = t.isHorizontal() ? 'height' : 'width',
                          i = t.model.get(['axisLabel', 'margin']);
                        ((l[n] -= e[n] + i),
                          'top' === t.position
                            ? (l.y += e.height + i)
                            : 'left' === t.position && (l.x += e.width + i));
                      }
                    }
                  }),
                  u()),
                (0, i.each)(this._coordsList, function (t) {
                  t.calcAffineTransform();
                }));
            }),
            (t.prototype.getAxis = function (t, e) {
              var n = this._axesMap[t];
              if (null != n) return n[e || 0];
            }),
            (t.prototype.getAxes = function () {
              return this._axesList.slice();
            }),
            (t.prototype.getCartesian = function (t, e) {
              if (null != t && null != e) {
                var n = 'x' + t + 'y' + e;
                return this._coordsMap[n];
              }
              (0, i.isObject)(t) && ((e = t.yAxisIndex), (t = t.xAxisIndex));
              for (var o = 0, r = this._coordsList; o < r.length; o++)
                if (r[o].getAxis('x').index === t || r[o].getAxis('y').index === e) return r[o];
            }),
            (t.prototype.getCartesians = function () {
              return this._coordsList.slice();
            }),
            (t.prototype.convertToPixel = function (t, e, n) {
              var i = this._findConvertTarget(e);
              return i.cartesian
                ? i.cartesian.dataToPoint(n)
                : i.axis
                  ? i.axis.toGlobalCoord(i.axis.dataToCoord(n))
                  : null;
            }),
            (t.prototype.convertFromPixel = function (t, e, n) {
              var i = this._findConvertTarget(e);
              return i.cartesian
                ? i.cartesian.pointToData(n)
                : i.axis
                  ? i.axis.coordToData(i.axis.toLocalCoord(n))
                  : null;
            }),
            (t.prototype._findConvertTarget = function (t) {
              var e,
                n,
                o = t.seriesModel,
                r = t.xAxisModel || (o && o.getReferringComponents('xAxis', g.US).models[0]),
                a = t.yAxisModel || (o && o.getReferringComponents('yAxis', g.US).models[0]),
                s = t.gridModel,
                l = this._coordsList;
              return (
                o
                  ? ((e = o.coordinateSystem), (0, i.indexOf)(l, e) < 0 && (e = null))
                  : r && a
                    ? (e = this.getCartesian(r.componentIndex, a.componentIndex))
                    : r
                      ? (n = this.getAxis('x', r.componentIndex))
                      : a
                        ? (n = this.getAxis('y', a.componentIndex))
                        : s && s.coordinateSystem === this && (e = this._coordsList[0]),
                { cartesian: e, axis: n }
              );
            }),
            (t.prototype.containPoint = function (t) {
              var e = this._coordsList[0];
              if (e) return e.containPoint(t);
            }),
            (t.prototype._initCartesian = function (t, e, n) {
              var o = this,
                a = this,
                s = { left: !1, right: !1, top: !1, bottom: !1 },
                l = { x: {}, y: {} },
                c = { x: 0, y: 0 };
              if (
                (e.eachComponent('xAxis', u('x'), this),
                e.eachComponent('yAxis', u('y'), this),
                !c.x || !c.y)
              )
                return ((this._axesMap = {}), void (this._axesList = []));
              function u(e) {
                return function (n, i) {
                  if (_(n, t)) {
                    var o = n.get('position');
                    ('x' === e
                      ? 'top' !== o && 'bottom' !== o && (o = s.bottom ? 'top' : 'bottom')
                      : 'left' !== o && 'right' !== o && (o = s.left ? 'right' : 'left'),
                      (s[o] = !0));
                    var u = new f(e, (0, r.f$)(n), [0, 0], n.get('type'), o),
                      p = 'category' === u.type;
                    ((u.onBand = p && n.get('boundaryGap')),
                      (u.inverse = n.get('inverse')),
                      (n.axis = u),
                      (u.model = n),
                      (u.grid = a),
                      (u.index = i),
                      a._axesList.push(u),
                      (l[e][i] = u),
                      c[e]++);
                  }
                };
              }
              ((this._axesMap = l),
                (0, i.each)(l.x, function (e, n) {
                  (0, i.each)(l.y, function (i, r) {
                    var a = 'x' + n + 'y' + r,
                      s = new d(a);
                    ((s.master = o),
                      (s.model = t),
                      (o._coordsMap[a] = s),
                      o._coordsList.push(s),
                      s.addAxis(e),
                      s.addAxis(i));
                  });
                }));
            }),
            (t.prototype._updateScale = function (t, e) {
              function n(t, e) {
                (0, i.each)((0, r.wq)(t, e.dim), function (n) {
                  e.scale.unionExtentFromData(t, n);
                });
              }
              ((0, i.each)(this._axesList, function (t) {
                if ((t.scale.setExtent(1 / 0, -1 / 0), 'category' === t.type)) {
                  var e = t.model.get('categorySortInfo');
                  t.scale.setSortInfo(e);
                }
              }),
                t.eachSeries(function (t) {
                  if ((0, m.gO)(t)) {
                    var i = (0, m.LR)(t),
                      o = i.xAxisModel,
                      r = i.yAxisModel;
                    if (!_(o, e) || !_(r, e)) return;
                    var a = this.getCartesian(o.componentIndex, r.componentIndex),
                      s = t.getData(),
                      l = a.getAxis('x'),
                      c = a.getAxis('y');
                    (n(s, l), n(s, c));
                  }
                }, this));
            }),
            (t.prototype.getTooltipAxes = function (t) {
              var e = [],
                n = [];
              return (
                (0, i.each)(this.getCartesians(), function (o) {
                  var r = null != t && 'auto' !== t ? o.getAxis(t) : o.getBaseAxis(),
                    a = o.getOtherAxis(r);
                  ((0, i.indexOf)(e, r) < 0 && e.push(r), (0, i.indexOf)(n, a) < 0 && n.push(a));
                }),
                { baseAxes: e, otherAxes: n }
              );
            }),
            (t.create = function (e, n) {
              var i = [];
              return (
                e.eachComponent('grid', function (o, r) {
                  var a = new t(o, e, n);
                  ((a.name = 'grid_' + r), a.resize(o, n, !0), (o.coordinateSystem = a), i.push(a));
                }),
                e.eachSeries(function (t) {
                  if ((0, m.gO)(t)) {
                    var e = (0, m.LR)(t),
                      n = e.xAxisModel,
                      i = e.yAxisModel,
                      o = n.getCoordSysModel().coordinateSystem;
                    t.coordinateSystem = o.getCartesian(n.componentIndex, i.componentIndex);
                  }
                }),
                i
              );
            }),
            (t.dimensions = p),
            t
          );
        })();
      function _(t, e) {
        return t.getCoordSysModel() === e;
      }
      function A(t, e, n, i) {
        n.getAxesOnZeroOf = function () {
          return o ? [o] : [];
        };
        var o,
          r = t[e],
          a = n.model,
          s = a.get(['axisLine', 'onZero']),
          l = a.get(['axisLine', 'onZeroAxisIndex']);
        if (s) {
          if (null != l) M(r[l]) && (o = r[l]);
          else
            for (var c in r)
              if (r.hasOwnProperty(c) && M(r[c]) && !i[u(r[c])]) {
                o = r[c];
                break;
              }
          o && (i[u(o)] = !0);
        }
        function u(t) {
          return t.dim + '_' + t.index;
        }
      }
      function M(t) {
        return t && 'category' !== t.type && 'time' !== t.type && (0, r.JJ)(t);
      }
      const T = x;
    },
    236788: (t, e, n) => {
      n.d(e, { A: () => o });
      var i = n(15215);
      const o = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (0, i.__extends)(e, t),
          (e.type = 'grid'),
          (e.dependencies = ['xAxis', 'yAxis']),
          (e.layoutMode = 'box'),
          (e.defaultOption = {
            show: !1,
            z: 0,
            left: '10%',
            top: 60,
            right: '10%',
            bottom: 70,
            containLabel: !1,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            borderColor: '#ccc',
          }),
          e
        );
      })(n(515915).A);
    },
    196878: (t, e, n) => {
      n.d(e, { LR: () => s, Zp: () => r, gO: () => a });
      var i = n(498026),
        o = n(48170);
      function r(t, e, n) {
        n = n || {};
        var o = t.coordinateSystem,
          r = e.axis,
          a = {},
          s = r.getAxesOnZeroOf()[0],
          l = r.position,
          c = s ? 'onZero' : l,
          u = r.dim,
          p = o.getRect(),
          h = [p.x, p.x + p.width, p.y, p.y + p.height],
          d = { left: 0, right: 1, top: 0, bottom: 1, onZero: 2 },
          f = e.get('offset') || 0,
          g = 'x' === u ? [h[2] - f, h[3] + f] : [h[0] - f, h[1] + f];
        if (s) {
          var m = s.toGlobalCoord(s.dataToCoord(0));
          g[d.onZero] = Math.max(Math.min(m, g[1]), g[0]);
        }
        ((a.position = ['y' === u ? g[d[c]] : h[0], 'x' === u ? g[d[c]] : h[3]]),
          (a.rotation = (Math.PI / 2) * ('x' === u ? 0 : 1)),
          (a.labelDirection =
            a.tickDirection =
            a.nameDirection =
              { top: -1, bottom: 1, left: -1, right: 1 }[l]),
          (a.labelOffset = s ? g[d[l]] - g[d.onZero] : 0),
          e.get(['axisTick', 'inside']) && (a.tickDirection = -a.tickDirection),
          i.retrieve(n.labelInside, e.get(['axisLabel', 'inside'])) &&
            (a.labelDirection = -a.labelDirection));
        var y = e.get(['axisLabel', 'rotate']);
        return ((a.labelRotate = 'top' === c ? -y : y), (a.z2 = 1), a);
      }
      function a(t) {
        return 'cartesian2d' === t.get('coordinateSystem');
      }
      function s(t) {
        var e = { xAxisModel: null, yAxisModel: null };
        return (
          i.each(e, function (n, i) {
            var r = i.replace(/Model$/, ''),
              a = t.getReferringComponents(r, o.US).models[0];
            e[i] = a;
          }),
          e
        );
      }
    },
    984557: (t, e, n) => {
      n.d(e, { A: () => r });
      var i = n(498026);
      function o(t, e) {
        return (
          (e = e || [0, 0]),
          i.map(
            ['x', 'y'],
            function (n, i) {
              var o = this.getAxis(n),
                r = e[i],
                a = t[i] / 2;
              return 'category' === o.type
                ? o.getBandWidth()
                : Math.abs(o.dataToCoord(r - a) - o.dataToCoord(r + a));
            },
            this,
          )
        );
      }
      function r(t) {
        var e = t.master.getRect();
        return {
          coordSys: { type: 'cartesian2d', x: e.x, y: e.y, width: e.width, height: e.height },
          api: {
            coord: function (e) {
              return t.dataToPoint(e);
            },
            size: i.bind(o, t),
          },
        };
      }
    },
    793074: (t, e, n) => {
      n.d(e, { A: () => u });
      var i = n(15215),
        o = n(498026),
        r = n(48170),
        a = n(515915),
        s = n(143172),
        l = n(198592),
        c = n(676311);
      const u = (function (t) {
        function e() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return ((n.type = e.type), n);
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.init = function (t, e, n) {
            var i = c.A.getGeoResource(t.map);
            if (i && 'geoJSON' === i.type) {
              var o = (t.itemStyle = t.itemStyle || {});
              'color' in o || (o.color = '#eee');
            }
            (this.mergeDefaultAndTheme(t, n), r.M5(t, 'label', ['show']));
          }),
          (e.prototype.optionUpdated = function () {
            var t = this,
              e = this.option;
            e.regions = l.A.getFilledRegions(e.regions, e.map, e.nameMap, e.nameProperty);
            var n = {};
            ((this._optionModelMap = o.reduce(
              e.regions || [],
              function (e, i) {
                var o = i.name;
                return (o && (e.set(o, new s.A(i, t, t.ecModel)), i.selected && (n[o] = !0)), e);
              },
              o.createHashMap(),
            )),
              e.selectedMap || (e.selectedMap = n));
          }),
          (e.prototype.getRegionModel = function (t) {
            return this._optionModelMap.get(t) || new s.A(null, this, this.ecModel);
          }),
          (e.prototype.getFormattedLabel = function (t, e) {
            var n = this.getRegionModel(t),
              i =
                'normal' === e
                  ? n.get(['label', 'formatter'])
                  : n.get(['emphasis', 'label', 'formatter']),
              r = { name: t };
            return o.isFunction(i)
              ? ((r.status = e), i(r))
              : o.isString(i)
                ? i.replace('{a}', null != t ? t : '')
                : void 0;
          }),
          (e.prototype.setZoom = function (t) {
            this.option.zoom = t;
          }),
          (e.prototype.setCenter = function (t) {
            this.option.center = t;
          }),
          (e.prototype.select = function (t) {
            var e = this.option,
              n = e.selectedMode;
            n &&
              ('multiple' !== n && (e.selectedMap = null),
              ((e.selectedMap || (e.selectedMap = {}))[t] = !0));
          }),
          (e.prototype.unSelect = function (t) {
            var e = this.option.selectedMap;
            e && (e[t] = !1);
          }),
          (e.prototype.toggleSelected = function (t) {
            this[this.isSelected(t) ? 'unSelect' : 'select'](t);
          }),
          (e.prototype.isSelected = function (t) {
            var e = this.option.selectedMap;
            return !(!e || !e[t]);
          }),
          (e.type = 'geo'),
          (e.layoutMode = 'box'),
          (e.defaultOption = {
            z: 0,
            show: !0,
            left: 'center',
            top: 'center',
            aspectScale: null,
            silent: !1,
            map: '',
            boundingCoords: null,
            center: null,
            zoom: 1,
            scaleLimit: null,
            label: { show: !1, color: '#000' },
            itemStyle: { borderWidth: 0.5, borderColor: '#444' },
            emphasis: {
              label: { show: !0, color: 'rgb(100,0,0)' },
              itemStyle: { color: 'rgba(255,215,0,0.8)' },
            },
            select: {
              label: { show: !0, color: 'rgb(100,0,0)' },
              itemStyle: { color: 'rgba(255,215,0,0.8)' },
            },
            regions: [],
          }),
          e
        );
      })(a.A);
    },
    431024: (t, e, n) => {
      n.d(e, { U5: () => m, cn: () => g, m5: () => d, nS: () => f });
      var i = n(15215),
        o = n(529308),
        r = n(983509),
        a = n(651183),
        s = n(345587),
        l = n(498026),
        c = [];
      function u(t, e) {
        for (var n = 0; n < t.length; n++) r.applyTransform(t[n], t[n], e);
      }
      function p(t, e, n, i) {
        for (var o = 0; o < t.length; o++) {
          var a = t[o];
          (i && (a = i.project(a)),
            a && isFinite(a[0]) && isFinite(a[1]) && (r.min(e, e, a), r.max(n, n, a)));
        }
      }
      var h = (function () {
          function t(t) {
            this.name = t;
          }
          return (
            (t.prototype.setCenter = function (t) {
              this._center = t;
            }),
            (t.prototype.getCenter = function () {
              var t = this._center;
              return (t || (t = this._center = this.calcCenter()), t);
            }),
            t
          );
        })(),
        d = function (t, e) {
          ((this.type = 'polygon'), (this.exterior = t), (this.interiors = e));
        },
        f = function (t) {
          ((this.type = 'linestring'), (this.points = t));
        },
        g = (function (t) {
          function e(e, n, i) {
            var o = t.call(this, e) || this;
            return ((o.type = 'geoJSON'), (o.geometries = n), (o._center = i && [i[0], i[1]]), o);
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.calcCenter = function () {
              for (var t, e = this.geometries, n = 0, i = 0; i < e.length; i++) {
                var o = e[i],
                  r = o.exterior,
                  a = r && r.length;
                a > n && ((t = o), (n = a));
              }
              if (t)
                return (function (t) {
                  for (
                    var e = 0, n = 0, i = 0, o = t.length, r = t[o - 1][0], a = t[o - 1][1], s = 0;
                    s < o;
                    s++
                  ) {
                    var l = t[s][0],
                      c = t[s][1],
                      u = r * c - l * a;
                    ((e += u), (n += (r + l) * u), (i += (a + c) * u), (r = l), (a = c));
                  }
                  return e ? [n / e / 3, i / e / 3, e] : [t[0][0] || 0, t[0][1] || 0];
                })(t.exterior);
              var s = this.getBoundingRect();
              return [s.x + s.width / 2, s.y + s.height / 2];
            }),
            (e.prototype.getBoundingRect = function (t) {
              var e = this._rect;
              if (e && !t) return e;
              var n = [1 / 0, 1 / 0],
                i = [-1 / 0, -1 / 0],
                r = this.geometries;
              return (
                (0, l.each)(r, function (e) {
                  'polygon' === e.type
                    ? p(e.exterior, n, i, t)
                    : (0, l.each)(e.points, function (e) {
                        p(e, n, i, t);
                      });
                }),
                (isFinite(n[0]) && isFinite(n[1]) && isFinite(i[0]) && isFinite(i[1])) ||
                  (n[0] = n[1] = i[0] = i[1] = 0),
                (e = new o.A(n[0], n[1], i[0] - n[0], i[1] - n[1])),
                t || (this._rect = e),
                e
              );
            }),
            (e.prototype.contain = function (t) {
              var e = this.getBoundingRect(),
                n = this.geometries;
              if (!e.contain(t[0], t[1])) return !1;
              t: for (var i = 0, o = n.length; i < o; i++) {
                var r = n[i];
                if ('polygon' === r.type) {
                  var s = r.exterior,
                    l = r.interiors;
                  if (a.l(s, t[0], t[1])) {
                    for (var c = 0; c < (l ? l.length : 0); c++)
                      if (a.l(l[c], t[0], t[1])) continue t;
                    return !0;
                  }
                }
              }
              return !1;
            }),
            (e.prototype.transformTo = function (t, e, n, i) {
              var r = this.getBoundingRect(),
                a = r.width / r.height;
              n ? i || (i = n / a) : (n = a * i);
              for (
                var s = new o.A(t, e, n, i),
                  c = r.calculateTransform(s),
                  p = this.geometries,
                  h = 0;
                h < p.length;
                h++
              ) {
                var d = p[h];
                'polygon' === d.type
                  ? (u(d.exterior, c),
                    (0, l.each)(d.interiors, function (t) {
                      u(t, c);
                    }))
                  : (0, l.each)(d.points, function (t) {
                      u(t, c);
                    });
              }
              ((r = this._rect).copy(s), (this._center = [r.x + r.width / 2, r.y + r.height / 2]));
            }),
            (e.prototype.cloneShallow = function (t) {
              null == t && (t = this.name);
              var n = new e(t, this.geometries, this._center);
              return ((n._rect = this._rect), (n.transformTo = null), n);
            }),
            e
          );
        })(h),
        m = (function (t) {
          function e(e, n) {
            var i = t.call(this, e) || this;
            return ((i.type = 'geoSVG'), (i._elOnlyForCalculate = n), i);
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.calcCenter = function () {
              for (
                var t = this._elOnlyForCalculate,
                  e = t.getBoundingRect(),
                  n = [e.x + e.width / 2, e.y + e.height / 2],
                  i = s.identity(c),
                  o = t;
                o && !o.isGeoSVGGraphicRoot;
              )
                (s.mul(i, o.getLocalTransform(), i), (o = o.parent));
              return (s.invert(i, i), r.applyTransform(n, n, i), n);
            }),
            e
          );
        })(h);
    },
    198592: (t, e, n) => {
      n.d(e, { A: () => x });
      var i = n(498026),
        o = n(15215),
        r = n(529308),
        a = n(556219),
        s = n(676311),
        l = n(48170),
        c = {
          geoJSON: { aspectScale: 0.75, invertLongitute: !0 },
          geoSVG: { aspectScale: 1, invertLongitute: !1 },
        },
        u = ['lng', 'lat'],
        p = (function (t) {
          function e(e, n, o) {
            var r = t.call(this, e) || this;
            ((r.dimensions = u),
              (r.type = 'geo'),
              (r._nameCoordMap = i.createHashMap()),
              (r.map = n));
            var a,
              l = o.projection,
              p = s.A.load(n, o.nameMap, o.nameProperty),
              h = s.A.getGeoResource(n),
              d = ((r.resourceType = h ? h.type : null), (r.regions = p.regions)),
              f = c[h.type];
            if (((r._regionsMap = p.regionsMap), (r.regions = p.regions), (r.projection = l), l))
              for (var g = 0; g < d.length; g++) {
                var m = d[g].getBoundingRect(l);
                (a = a || m.clone()).union(m);
              }
            else a = p.boundingRect;
            return (
              r.setBoundingRect(a.x, a.y, a.width, a.height),
              (r.aspectScale = l ? 1 : i.retrieve2(o.aspectScale, f.aspectScale)),
              (r._invertLongitute = !l && f.invertLongitute),
              r
            );
          }
          return (
            (0, o.__extends)(e, t),
            (e.prototype._transformTo = function (t, e, n, i) {
              var o = this.getBoundingRect(),
                a = this._invertLongitute;
              ((o = o.clone()), a && (o.y = -o.y - o.height));
              var s = this._rawTransformable;
              s.transform = o.calculateTransform(new r.A(t, e, n, i));
              var l = s.parent;
              ((s.parent = null),
                s.decomposeTransform(),
                (s.parent = l),
                a && (s.scaleY = -s.scaleY),
                this._updateTransform());
            }),
            (e.prototype.getRegion = function (t) {
              return this._regionsMap.get(t);
            }),
            (e.prototype.getRegionByCoord = function (t) {
              for (var e = this.regions, n = 0; n < e.length; n++) {
                var i = e[n];
                if ('geoJSON' === i.type && i.contain(t)) return e[n];
              }
            }),
            (e.prototype.addGeoCoord = function (t, e) {
              this._nameCoordMap.set(t, e);
            }),
            (e.prototype.getGeoCoord = function (t) {
              var e = this._regionsMap.get(t);
              return this._nameCoordMap.get(t) || (e && e.getCenter());
            }),
            (e.prototype.dataToPoint = function (t, e, n) {
              if ((i.isString(t) && (t = this.getGeoCoord(t)), t)) {
                var o = this.projection;
                return (o && (t = o.project(t)), t && this.projectedToPoint(t, e, n));
              }
            }),
            (e.prototype.pointToData = function (t) {
              var e = this.projection;
              return (e && (t = e.unproject(t)), t && this.pointToProjected(t));
            }),
            (e.prototype.pointToProjected = function (e) {
              return t.prototype.pointToData.call(this, e);
            }),
            (e.prototype.projectedToPoint = function (e, n, i) {
              return t.prototype.dataToPoint.call(this, e, n, i);
            }),
            (e.prototype.convertToPixel = function (t, e, n) {
              var i = h(e);
              return i === this ? i.dataToPoint(n) : null;
            }),
            (e.prototype.convertFromPixel = function (t, e, n) {
              var i = h(e);
              return i === this ? i.pointToData(n) : null;
            }),
            e
          );
        })(a.A);
      function h(t) {
        var e = t.geoModel,
          n = t.seriesModel;
        return e
          ? e.coordinateSystem
          : n
            ? n.coordinateSystem ||
              (n.getReferringComponents('geo', l.US).models[0] || {}).coordinateSystem
            : null;
      }
      i.mixin(p, a.A);
      const d = p;
      var f = n(834253),
        g = n(624326),
        m = n(983509);
      function y(t, e) {
        var n = t.get('boundingCoords');
        if (null != n) {
          var i = n[0],
            o = n[1];
          if (isFinite(i[0]) && isFinite(i[1]) && isFinite(o[0]) && isFinite(o[1])) {
            var r = this.projection;
            if (r) {
              var a = i[0],
                s = i[1],
                l = o[0],
                c = o[1];
              ((i = [1 / 0, 1 / 0]), (o = [-1 / 0, -1 / 0]));
              var u = function (t, e, n, a) {
                for (var s = n - t, l = a - e, c = 0; c <= 100; c++) {
                  var u = c / 100,
                    p = r.project([t + s * u, e + l * u]);
                  (m.min(i, i, p), m.max(o, o, p));
                }
              };
              (u(a, s, l, s), u(l, s, l, c), u(l, c, a, c), u(a, c, l, s));
            }
            this.setBoundingRect(i[0], i[1], o[0] - i[0], o[1] - i[1]);
          }
        }
        var p,
          h,
          d,
          y = this.getBoundingRect(),
          v = t.get('layoutCenter'),
          x = t.get('layoutSize'),
          _ = e.getWidth(),
          A = e.getHeight(),
          M = (y.width / y.height) * this.aspectScale,
          T = !1;
        if (
          (v &&
            x &&
            ((p = [g.lo(v[0], _), g.lo(v[1], A)]),
            (h = g.lo(x, Math.min(_, A))),
            isNaN(p[0]) || isNaN(p[1]) || isNaN(h) || (T = !0)),
          T)
        )
          ((d = {}),
            M > 1 ? ((d.width = h), (d.height = h / M)) : ((d.height = h), (d.width = h * M)),
            (d.y = p[1] - d.height / 2),
            (d.x = p[0] - d.width / 2));
        else {
          var w = t.getBoxLayoutParams();
          ((w.aspect = M), (d = f.dV(w, { width: _, height: A })));
        }
        (this.setViewRect(d.x, d.y, d.width, d.height),
          this.setCenter(t.get('center'), e),
          this.setZoom(t.get('zoom')));
      }
      var v = (function () {
        function t() {
          this.dimensions = u;
        }
        return (
          (t.prototype.create = function (t, e) {
            var n = [];
            function o(t) {
              return {
                nameProperty: t.get('nameProperty'),
                aspectScale: t.get('aspectScale'),
                projection: t.get('projection'),
              };
            }
            (t.eachComponent('geo', function (t, r) {
              var a = t.get('map'),
                s = new d(a + r, a, i.extend({ nameMap: t.get('nameMap') }, o(t)));
              ((s.zoomLimit = t.get('scaleLimit')),
                n.push(s),
                (t.coordinateSystem = s),
                (s.model = t),
                (s.resize = y),
                s.resize(t, e));
            }),
              t.eachSeries(function (t) {
                if ('geo' === t.get('coordinateSystem')) {
                  var e = t.get('geoIndex') || 0;
                  t.coordinateSystem = n[e];
                }
              }));
            var r = {};
            return (
              t.eachSeriesByType('map', function (t) {
                if (!t.getHostGeoModel()) {
                  var e = t.getMapType();
                  ((r[e] = r[e] || []), r[e].push(t));
                }
              }),
              i.each(r, function (t, r) {
                var a = i.map(t, function (t) {
                    return t.get('nameMap');
                  }),
                  s = new d(r, r, i.extend({ nameMap: i.mergeAll(a) }, o(t[0])));
                ((s.zoomLimit = i.retrieve.apply(
                  null,
                  i.map(t, function (t) {
                    return t.get('scaleLimit');
                  }),
                )),
                  n.push(s),
                  (s.resize = y),
                  s.resize(t[0], e),
                  i.each(t, function (t) {
                    ((t.coordinateSystem = s),
                      (function (t, e) {
                        i.each(e.get('geoCoord'), function (e, n) {
                          t.addGeoCoord(n, e);
                        });
                      })(s, t));
                  }));
              }),
              n
            );
          }),
          (t.prototype.getFilledRegions = function (t, e, n, o) {
            for (var r = (t || []).slice(), a = i.createHashMap(), l = 0; l < r.length; l++)
              a.set(r[l].name, r[l]);
            var c = s.A.load(e, n, o);
            return (
              i.each(c.regions, function (t) {
                var e = t.name,
                  n = a.get(e),
                  o = t.properties && t.properties.echartsStyle;
                (n || ((n = { name: e }), r.push(n)), o && i.merge(n, o));
              }),
              r
            );
          }),
          t
        );
      })();
      const x = new v();
    },
    676311: (t, e, n) => {
      n.d(e, { A: () => T });
      for (
        var i = n(498026),
          o = n(369942),
          r = n(843870),
          a = n(830010),
          s = n(529308),
          l = n(302141),
          c = n(431024),
          u = (0, i.createHashMap)([
            'rect',
            'circle',
            'line',
            'ellipse',
            'polygon',
            'polyline',
            'path',
            'text',
            'tspan',
            'g',
          ]),
          p = (function () {
            function t(t, e) {
              ((this.type = 'geoSVG'),
                (this._usedGraphicMap = (0, i.createHashMap)()),
                (this._freedGraphics = []),
                (this._mapName = t),
                (this._parsedXML = (0, l.h)(e)));
            }
            return (
              (t.prototype.load = function () {
                var t = this._firstGraphic;
                if (!t) {
                  ((t = this._firstGraphic = this._buildGraphic(this._parsedXML)),
                    this._freedGraphics.push(t),
                    (this._boundingRect = this._firstGraphic.boundingRect.clone()));
                  var e = (function (t) {
                      var e = [],
                        n = (0, i.createHashMap)();
                      return (
                        (0, i.each)(t, function (t) {
                          if (null == t.namedFrom) {
                            var i = new c.U5(t.name, t.el);
                            (e.push(i), n.set(t.name, i));
                          }
                        }),
                        { regions: e, regionsMap: n }
                      );
                    })(t.named),
                    n = e.regions,
                    o = e.regionsMap;
                  ((this._regions = n), (this._regionsMap = o));
                }
                return {
                  boundingRect: this._boundingRect,
                  regions: this._regions,
                  regionsMap: this._regionsMap,
                };
              }),
              (t.prototype._buildGraphic = function (t) {
                var e, n;
                try {
                  ((n = (e = (t && (0, o.cM)(t, { ignoreViewBox: !0, ignoreRootClip: !0 })) || {})
                    .root),
                    (0, i.assert)(null != n));
                } catch (t) {
                  throw new Error('Invalid svg format\n' + t.message);
                }
                var l = new r.A();
                (l.add(n), (l.isGeoSVGGraphicRoot = !0));
                var c = e.width,
                  p = e.height,
                  h = e.viewBoxRect,
                  d = this._boundingRect;
                if (!d) {
                  var f = void 0,
                    g = void 0,
                    m = void 0,
                    y = void 0;
                  if (
                    (null != c ? ((f = 0), (m = c)) : h && ((f = h.x), (m = h.width)),
                    null != p ? ((g = 0), (y = p)) : h && ((g = h.y), (y = h.height)),
                    null == f || null == g)
                  ) {
                    var v = n.getBoundingRect();
                    (null == f && ((f = v.x), (m = v.width)),
                      null == g && ((g = v.y), (y = v.height)));
                  }
                  d = this._boundingRect = new s.A(f, g, m, y);
                }
                if (h) {
                  var x = (0, o.ps)(h, d);
                  ((n.scaleX = n.scaleY = x.scale), (n.x = x.x), (n.y = x.y));
                }
                l.setClipPath(new a.A({ shape: d.plain() }));
                var _ = [];
                return (
                  (0, i.each)(e.named, function (t) {
                    var e;
                    null != u.get(t.svgNodeTagLower) &&
                      (_.push(t),
                      ((e = t.el).silent = !1),
                      e.isGroup &&
                        e.traverse(function (t) {
                          t.silent = !1;
                        }));
                  }),
                  { root: l, boundingRect: d, named: _ }
                );
              }),
              (t.prototype.useGraphic = function (t) {
                var e = this._usedGraphicMap,
                  n = e.get(t);
                return (
                  n ||
                  ((n = this._freedGraphics.pop() || this._buildGraphic(this._parsedXML)),
                  e.set(t, n),
                  n)
                );
              }),
              (t.prototype.freeGraphic = function (t) {
                var e = this._usedGraphicMap,
                  n = e.get(t);
                n && (e.removeKey(t), this._freedGraphics.push(n));
              }),
              t
            );
          })(),
          h = n(869718),
          d = [126, 25],
          f = '南海诸岛',
          g = [
            [
              [0, 3.5],
              [7, 11.2],
              [15, 11.9],
              [30, 7],
              [42, 0.7],
              [52, 0.7],
              [56, 7.7],
              [59, 0.7],
              [64, 0.7],
              [64, 0],
              [5, 0],
              [0, 3.5],
            ],
            [
              [13, 16.1],
              [19, 14.7],
              [16, 21.7],
              [11, 23.1],
              [13, 16.1],
            ],
            [
              [12, 32.2],
              [14, 38.5],
              [15, 38.5],
              [13, 32.2],
              [12, 32.2],
            ],
            [
              [16, 47.6],
              [12, 53.2],
              [13, 53.2],
              [18, 47.6],
              [16, 47.6],
            ],
            [
              [6, 64.4],
              [8, 70],
              [9, 70],
              [8, 64.4],
              [6, 64.4],
            ],
            [
              [23, 82.6],
              [29, 79.8],
              [30, 79.8],
              [25, 82.6],
              [23, 82.6],
            ],
            [
              [37, 70.7],
              [43, 62.3],
              [44, 62.3],
              [39, 70.7],
              [37, 70.7],
            ],
            [
              [48, 51.1],
              [51, 45.5],
              [53, 45.5],
              [50, 51.1],
              [48, 51.1],
            ],
            [
              [51, 35],
              [51, 28.7],
              [53, 28.7],
              [53, 35],
              [51, 35],
            ],
            [
              [52, 22.4],
              [55, 17.5],
              [56, 17.5],
              [53, 22.4],
              [52, 22.4],
            ],
            [
              [58, 12.6],
              [62, 7],
              [63, 7],
              [60, 12.6],
              [58, 12.6],
            ],
            [
              [0, 3.5],
              [0, 93.1],
              [64, 93.1],
              [64, 0],
              [63, 0],
              [63, 92.4],
              [1, 92.4],
              [1, 3.5],
              [0, 3.5],
            ],
          ],
          m = 0;
        m < g.length;
        m++
      )
        for (var y = 0; y < g[m].length; y++)
          ((g[m][y][0] /= 10.5), (g[m][y][1] /= -14), (g[m][y][0] += d[0]), (g[m][y][1] += d[1]));
      var v = { 南海诸岛: [32, 80], 广东: [0, -10], 香港: [10, 5], 澳门: [-10, 10], 天津: [5, 5] },
        x = [
          [
            [123.45165252685547, 25.73527164402261],
            [123.49731445312499, 25.73527164402261],
            [123.49731445312499, 25.750734064600884],
            [123.45165252685547, 25.750734064600884],
            [123.45165252685547, 25.73527164402261],
          ],
        ],
        _ = (function () {
          function t(t, e, n) {
            var o;
            ((this.type = 'geoJSON'),
              (this._parsedMap = (0, i.createHashMap)()),
              (this._mapName = t),
              (this._specialAreas = n),
              (this._geoJSON =
                ((o = e),
                (0, i.isString)(o)
                  ? 'undefined' != typeof JSON && JSON.parse
                    ? JSON.parse(o)
                    : new Function('return (' + o + ');')()
                  : o)));
          }
          return (
            (t.prototype.load = function (t, e) {
              e = e || 'name';
              var n = this._parsedMap.get(e);
              if (!n) {
                var o = this._parseToRegions(e);
                n = this._parsedMap.set(e, { regions: o, boundingRect: A(o) });
              }
              var r = (0, i.createHashMap)(),
                a = [];
              return (
                (0, i.each)(n.regions, function (e) {
                  var n = e.name;
                  (t && (0, i.hasOwn)(t, n) && (e = e.cloneShallow((n = t[n]))),
                    a.push(e),
                    r.set(n, e));
                }),
                { regions: a, boundingRect: n.boundingRect || new s.A(0, 0, 0, 0), regionsMap: r }
              );
            }),
            (t.prototype._parseToRegions = function (t) {
              var e,
                n = this._mapName,
                o = this._geoJSON;
              try {
                e = o ? (0, h.A)(o, t) : [];
              } catch (t) {
                throw new Error('Invalid geoJson format\n' + t.message);
              }
              return (
                (function (t, e) {
                  if ('china' === t) {
                    for (var n = 0; n < e.length; n++) if (e[n].name === f) return;
                    e.push(
                      new c.cn(
                        f,
                        i.map(g, function (t) {
                          return { type: 'polygon', exterior: t };
                        }),
                        d,
                      ),
                    );
                  }
                })(n, e),
                (0, i.each)(
                  e,
                  function (t) {
                    var e = t.name;
                    (!(function (t, e) {
                      if ('china' === t) {
                        var n = v[e.name];
                        if (n) {
                          var i = e.getCenter();
                          ((i[0] += n[0] / 10.5), (i[1] += -n[1] / 14), e.setCenter(i));
                        }
                      }
                    })(n, t),
                      (function (t, e) {
                        'china' === t &&
                          '台湾' === e.name &&
                          e.geometries.push({ type: 'polygon', exterior: x[0] });
                      })(n, t));
                    var i = this._specialAreas && this._specialAreas[e];
                    i && t.transformTo(i.left, i.top, i.width, i.height);
                  },
                  this,
                ),
                e
              );
            }),
            (t.prototype.getMapForUser = function () {
              return {
                geoJson: this._geoJSON,
                geoJSON: this._geoJSON,
                specialAreas: this._specialAreas,
              };
            }),
            t
          );
        })();
      function A(t) {
        for (var e, n = 0; n < t.length; n++) {
          var i = t[n].getBoundingRect();
          (e = e || i.clone()).union(i);
        }
        return e;
      }
      var M = (0, i.createHashMap)();
      const T = {
        registerMap: function (t, e, n) {
          if (e.svg) {
            var i = new p(t, e.svg);
            M.set(t, i);
          } else {
            var o = e.geoJson || e.geoJSON;
            (o && !e.features ? (n = e.specialAreas) : (o = e), (i = new _(t, o, n)), M.set(t, i));
          }
        },
        getGeoResource: function (t) {
          return M.get(t);
        },
        getMapForUser: function (t) {
          var e = M.get(t);
          return e && 'geoJSON' === e.type && e.getMapForUser();
        },
        load: function (t, e, n) {
          var i = M.get(t);
          if (i) return i.load(e, n);
        },
      };
    },
    869718: (t, e, n) => {
      n.d(e, { A: () => s });
      var i = n(498026),
        o = n(431024);
      function r(t, e, n) {
        for (var i = 0; i < t.length; i++) t[i] = a(t[i], e[i], n);
      }
      function a(t, e, n) {
        for (var i = [], o = e[0], r = e[1], a = 0; a < t.length; a += 2) {
          var s = t.charCodeAt(a) - 64,
            l = t.charCodeAt(a + 1) - 64;
          ((s = (s >> 1) ^ -(1 & s)),
            (l = (l >> 1) ^ -(1 & l)),
            (o = s += o),
            (r = l += r),
            i.push([s / n, l / n]));
        }
        return i;
      }
      function s(t, e) {
        return (
          (t = (function (t) {
            if (!t.UTF8Encoding) return t;
            var e = t,
              n = e.UTF8Scale;
            null == n && (n = 1024);
            var o = e.features;
            return (
              i.each(o, function (t) {
                var e = t.geometry,
                  o = e.encodeOffsets,
                  s = e.coordinates;
                if (o)
                  switch (e.type) {
                    case 'LineString':
                      e.coordinates = a(s, o, n);
                      break;
                    case 'Polygon':
                    case 'MultiLineString':
                      r(s, o, n);
                      break;
                    case 'MultiPolygon':
                      i.each(s, function (t, e) {
                        return r(t, o[e], n);
                      });
                  }
              }),
              (e.UTF8Encoding = !1),
              e
            );
          })(t)),
          i.map(
            i.filter(t.features, function (t) {
              return t.geometry && t.properties && t.geometry.coordinates.length > 0;
            }),
            function (t) {
              var n = t.properties,
                r = t.geometry,
                a = [];
              switch (r.type) {
                case 'Polygon':
                  var s = r.coordinates;
                  a.push(new o.m5(s[0], s.slice(1)));
                  break;
                case 'MultiPolygon':
                  i.each(r.coordinates, function (t) {
                    t[0] && a.push(new o.m5(t[0], t.slice(1)));
                  });
                  break;
                case 'LineString':
                  a.push(new o.nS([r.coordinates]));
                  break;
                case 'MultiLineString':
                  a.push(new o.nS(r.coordinates));
              }
              var l = new o.cn(n[e || 'name'], a, n.cp);
              return ((l.properties = n), l);
            },
          )
        );
      }
    },
    979798: (t, e, n) => {
      n.d(e, { A: () => r });
      var i = n(498026);
      function o(t, e) {
        return (
          (e = e || [0, 0]),
          i.map(
            [0, 1],
            function (n) {
              var i = e[n],
                o = t[n] / 2,
                r = [],
                a = [];
              return (
                (r[n] = i - o),
                (a[n] = i + o),
                (r[1 - n] = a[1 - n] = e[1 - n]),
                Math.abs(this.dataToPoint(r)[n] - this.dataToPoint(a)[n])
              );
            },
            this,
          )
        );
      }
      function r(t) {
        var e = t.getBoundingRect();
        return {
          coordSys: {
            type: 'geo',
            x: e.x,
            y: e.y,
            width: e.width,
            height: e.height,
            zoom: t.getZoom(),
          },
          api: {
            coord: function (e) {
              return t.dataToPoint(e);
            },
            size: i.bind(o, t),
          },
        };
      }
    },
    761504: (t, e, n) => {
      n.d(e, { A: () => u });
      var i = n(15215),
        o = n(498026),
        r = n(515915),
        a = n(732944),
        s = n(624326),
        l = n(912462),
        c = (function (t) {
          function e() {
            var n = (null !== t && t.apply(this, arguments)) || this;
            return ((n.type = e.type), (n.activeIntervals = []), n);
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getAreaSelectStyle = function () {
              return (0, a.A)([
                ['fill', 'color'],
                ['lineWidth', 'borderWidth'],
                ['stroke', 'borderColor'],
                ['width', 'width'],
                ['opacity', 'opacity'],
              ])(this.getModel('areaSelectStyle'));
            }),
            (e.prototype.setActiveIntervals = function (t) {
              var e = (this.activeIntervals = o.clone(t));
              if (e) for (var n = e.length - 1; n >= 0; n--) s.Y6(e[n]);
            }),
            (e.prototype.getActiveState = function (t) {
              var e = this.activeIntervals;
              if (!e.length) return 'normal';
              if (null == t || isNaN(+t)) return 'inactive';
              if (1 === e.length) {
                var n = e[0];
                if (n[0] <= t && t <= n[1]) return 'active';
              } else
                for (var i = 0, o = e.length; i < o; i++)
                  if (e[i][0] <= t && t <= e[i][1]) return 'active';
              return 'inactive';
            }),
            e
          );
        })(r.A);
      o.mixin(c, l.L);
      const u = c;
    },
    424130: (t, e, n) => {
      n.d(e, { A: () => r });
      var i = n(15215),
        o = n(498026);
      const r = (function (t) {
        function e() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return ((n.type = e.type), n);
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.init = function () {
            (t.prototype.init.apply(this, arguments), this.mergeOption({}));
          }),
          (e.prototype.mergeOption = function (t) {
            var e = this.option;
            (t && o.merge(e, t, !0), this._initDimensions());
          }),
          (e.prototype.contains = function (t, e) {
            var n = t.get('parallelIndex');
            return null != n && e.getComponent('parallel', n) === this;
          }),
          (e.prototype.setAxisExpand = function (t) {
            o.each(
              [
                'axisExpandable',
                'axisExpandCenter',
                'axisExpandCount',
                'axisExpandWidth',
                'axisExpandWindow',
              ],
              function (e) {
                t.hasOwnProperty(e) && (this.option[e] = t[e]);
              },
              this,
            );
          }),
          (e.prototype._initDimensions = function () {
            var t = (this.dimensions = []),
              e = (this.parallelAxisIndex = []),
              n = o.filter(
                this.ecModel.queryComponents({ mainType: 'parallelAxis' }),
                function (t) {
                  return (t.get('parallelIndex') || 0) === this.componentIndex;
                },
                this,
              );
            o.each(n, function (n) {
              (t.push('dim' + n.get('dim')), e.push(n.componentIndex));
            });
          }),
          (e.type = 'parallel'),
          (e.dependencies = ['parallelAxis']),
          (e.layoutMode = 'box'),
          (e.defaultOption = {
            z: 0,
            left: 80,
            top: 60,
            right: 80,
            bottom: 60,
            layout: 'horizontal',
            axisExpandable: !1,
            axisExpandCenter: null,
            axisExpandCount: 0,
            axisExpandWidth: 50,
            axisExpandRate: 17,
            axisExpandDebounce: 50,
            axisExpandSlideTriggerArea: [-0.15, 0.05, 0.4],
            axisExpandTriggerOn: 'click',
            parallelAxisDefault: null,
          }),
          e
        );
      })(n(515915).A);
    },
    742744: (t, e, n) => {
      n.d(e, { A: () => w });
      var i = n(498026),
        o = n(345587),
        r = n(834253),
        a = n(399031),
        s = n(15215);
      const l = (function (t) {
        function e(e, n, i, o, r) {
          var a = t.call(this, e, n, i) || this;
          return ((a.type = o || 'value'), (a.axisIndex = r), a);
        }
        return (
          (0, s.__extends)(e, t),
          (e.prototype.isHorizontal = function () {
            return 'horizontal' !== this.coordinateSystem.getModel().get('layout');
          }),
          e
        );
      })(n(120912).A);
      var c = n(543199),
        u = n(624326),
        p = n(898983),
        h = i.each,
        d = Math.min,
        f = Math.max,
        g = Math.floor,
        m = Math.ceil,
        y = u.LI,
        v = Math.PI;
      function x(t, e) {
        return d(f(t, e[0]), e[1]);
      }
      function _(t, e) {
        var n = e.layoutLength / (e.axisCount - 1);
        return { position: n * t, axisNameAvailableWidth: n, axisLabelShow: !0 };
      }
      function A(t, e) {
        var n,
          i,
          o = e.layoutLength,
          r = e.axisExpandWidth,
          a = e.axisCount,
          s = e.axisCollapseWidth,
          l = e.winInnerIndices,
          c = s,
          u = !1;
        return (
          t < l[0]
            ? ((n = t * s), (i = s))
            : t <= l[1]
              ? ((n = e.axisExpandWindow0Pos + t * r - e.axisExpandWindow[0]), (c = r), (u = !0))
              : ((n = o - (a - 1 - t) * s), (i = s)),
          { position: n, axisNameAvailableWidth: c, axisLabelShow: u, nameTruncateMaxWidth: i }
        );
      }
      const M = (function () {
        function t(t, e, n) {
          ((this.type = 'parallel'),
            (this._axesMap = i.createHashMap()),
            (this._axesLayout = {}),
            (this.dimensions = t.dimensions),
            (this._model = t),
            this._init(t, e, n));
        }
        return (
          (t.prototype._init = function (t, e, n) {
            var i = t.dimensions,
              o = t.parallelAxisIndex;
            h(
              i,
              function (t, n) {
                var i = o[n],
                  r = e.getComponent('parallelAxis', i),
                  s = this._axesMap.set(t, new l(t, a.f$(r), [0, 0], r.get('type'), i)),
                  c = 'category' === s.type;
                ((s.onBand = c && r.get('boundaryGap')),
                  (s.inverse = r.get('inverse')),
                  (r.axis = s),
                  (s.model = r),
                  (s.coordinateSystem = r.coordinateSystem = this));
              },
              this,
            );
          }),
          (t.prototype.update = function (t, e) {
            this._updateAxesFromSeries(this._model, t);
          }),
          (t.prototype.containPoint = function (t) {
            var e = this._makeLayoutInfo(),
              n = e.axisBase,
              i = e.layoutBase,
              o = e.pixelDimIndex,
              r = t[1 - o],
              a = t[o];
            return r >= n && r <= n + e.axisLength && a >= i && a <= i + e.layoutLength;
          }),
          (t.prototype.getModel = function () {
            return this._model;
          }),
          (t.prototype._updateAxesFromSeries = function (t, e) {
            e.eachSeries(function (n) {
              if (t.contains(n, e)) {
                var i = n.getData();
                h(
                  this.dimensions,
                  function (t) {
                    var e = this._axesMap.get(t);
                    (e.scale.unionExtentFromData(i, i.mapDimension(t)), a.af(e.scale, e.model));
                  },
                  this,
                );
              }
            }, this);
          }),
          (t.prototype.resize = function (t, e) {
            ((this._rect = r.dV(t.getBoxLayoutParams(), {
              width: e.getWidth(),
              height: e.getHeight(),
            })),
              this._layoutAxes());
          }),
          (t.prototype.getRect = function () {
            return this._rect;
          }),
          (t.prototype._makeLayoutInfo = function () {
            var t,
              e = this._model,
              n = this._rect,
              i = ['x', 'y'],
              o = ['width', 'height'],
              r = e.get('layout'),
              a = 'horizontal' === r ? 0 : 1,
              s = n[o[a]],
              l = [0, s],
              c = this.dimensions.length,
              u = x(e.get('axisExpandWidth'), l),
              p = x(e.get('axisExpandCount') || 0, [0, c]),
              h = e.get('axisExpandable') && c > 3 && c > p && p > 1 && u > 0 && s > 0,
              d = e.get('axisExpandWindow');
            d
              ? ((t = x(d[1] - d[0], l)), (d[1] = d[0] + t))
              : ((t = x(u * (p - 1), l)),
                ((d = [u * (e.get('axisExpandCenter') || g(c / 2)) - t / 2])[1] = d[0] + t));
            var f = (s - t) / (c - p);
            f < 3 && (f = 0);
            var v = [g(y(d[0] / u, 1)) + 1, m(y(d[1] / u, 1)) - 1],
              _ = (f / u) * d[0];
            return {
              layout: r,
              pixelDimIndex: a,
              layoutBase: n[i[a]],
              layoutLength: s,
              axisBase: n[i[1 - a]],
              axisLength: n[o[1 - a]],
              axisExpandable: h,
              axisExpandWidth: u,
              axisCollapseWidth: f,
              axisExpandWindow: d,
              axisCount: c,
              winInnerIndices: v,
              axisExpandWindow0Pos: _,
            };
          }),
          (t.prototype._layoutAxes = function () {
            var t = this._rect,
              e = this._axesMap,
              n = this.dimensions,
              i = this._makeLayoutInfo(),
              r = i.layout;
            (e.each(function (t) {
              var e = [0, i.axisLength],
                n = t.inverse ? 1 : 0;
              t.setExtent(e[n], e[1 - n]);
            }),
              h(
                n,
                function (e, n) {
                  var a = (i.axisExpandable ? A : _)(n, i),
                    s = {
                      horizontal: { x: a.position, y: i.axisLength },
                      vertical: { x: 0, y: a.position },
                    },
                    l = { horizontal: v / 2, vertical: 0 },
                    c = [s[r].x + t.x, s[r].y + t.y],
                    u = l[r],
                    p = o.create();
                  (o.rotate(p, p, u),
                    o.translate(p, p, c),
                    (this._axesLayout[e] = {
                      position: c,
                      rotation: u,
                      transform: p,
                      axisNameAvailableWidth: a.axisNameAvailableWidth,
                      axisLabelShow: a.axisLabelShow,
                      nameTruncateMaxWidth: a.nameTruncateMaxWidth,
                      tickDirection: 1,
                      labelDirection: 1,
                    }));
                },
                this,
              ));
          }),
          (t.prototype.getAxis = function (t) {
            return this._axesMap.get(t);
          }),
          (t.prototype.dataToPoint = function (t, e) {
            return this.axisCoordToPoint(this._axesMap.get(e).dataToCoord(t), e);
          }),
          (t.prototype.eachActiveState = function (t, e, n, o) {
            (null == n && (n = 0), null == o && (o = t.count()));
            var r = this._axesMap,
              a = this.dimensions,
              s = [],
              l = [];
            i.each(a, function (e) {
              (s.push(t.mapDimension(e)), l.push(r.get(e).model));
            });
            for (var c = this.hasAxisBrushed(), u = n; u < o; u++) {
              var p = void 0;
              if (c) {
                p = 'active';
                for (var h = t.getValues(s, u), d = 0, f = a.length; d < f; d++)
                  if ('inactive' === l[d].getActiveState(h[d])) {
                    p = 'inactive';
                    break;
                  }
              } else p = 'normal';
              e(p, u);
            }
          }),
          (t.prototype.hasAxisBrushed = function () {
            for (
              var t = this.dimensions, e = this._axesMap, n = !1, i = 0, o = t.length;
              i < o;
              i++
            )
              'normal' !== e.get(t[i]).model.getActiveState() && (n = !0);
            return n;
          }),
          (t.prototype.axisCoordToPoint = function (t, e) {
            var n = this._axesLayout[e];
            return c.applyTransform([t, 0], n.transform);
          }),
          (t.prototype.getAxisLayout = function (t) {
            return i.clone(this._axesLayout[t]);
          }),
          (t.prototype.getSlidedAxisExpandWindow = function (t) {
            var e = this._makeLayoutInfo(),
              n = e.pixelDimIndex,
              i = e.axisExpandWindow.slice(),
              o = i[1] - i[0],
              r = [0, e.axisExpandWidth * (e.axisCount - 1)];
            if (!this.containPoint(t)) return { behavior: 'none', axisExpandWindow: i };
            var a,
              s = t[n] - e.layoutBase - e.axisExpandWindow0Pos,
              l = 'slide',
              c = e.axisCollapseWidth,
              u = this._model.get('axisExpandSlideTriggerArea'),
              h = null != u[0];
            if (c)
              (h && c && s < o * u[0]
                ? ((l = 'jump'), (a = s - o * u[2]))
                : h && c && s > o * (1 - u[0])
                  ? ((l = 'jump'), (a = s - o * (1 - u[2])))
                  : (a = s - o * u[1]) >= 0 && (a = s - o * (1 - u[1])) <= 0 && (a = 0),
                (a *= e.axisExpandWidth / c) ? (0, p.A)(a, i, r, 'all') : (l = 'none'));
            else {
              var g = i[1] - i[0];
              (((i = [f(0, (r[1] * s) / g - g / 2)])[1] = d(r[1], i[0] + g)), (i[0] = i[1] - g));
            }
            return { axisExpandWindow: i, behavior: l };
          }),
          t
        );
      })();
      var T = n(48170);
      const w = {
        create: function (t, e) {
          var n = [];
          return (
            t.eachComponent('parallel', function (i, o) {
              var r = new M(i, t, e);
              ((r.name = 'parallel_' + o),
                r.resize(i, e),
                (i.coordinateSystem = r),
                (r.model = i),
                n.push(r));
            }),
            t.eachSeries(function (t) {
              if ('parallel' === t.get('coordinateSystem')) {
                var e = t.getReferringComponents('parallel', T.US).models[0];
                t.coordinateSystem = e.coordinateSystem;
              }
            }),
            n
          );
        },
      };
    },
    378308: (t, e, n) => {
      n.d(e, { A: () => r });
      var i = n(498026),
        o = n(48170);
      function r(t) {
        (!(function (t) {
          if (!t.parallel) {
            var e = !1;
            (i.each(t.series, function (t) {
              t && 'parallel' === t.type && (e = !0);
            }),
              e && (t.parallel = [{}]));
          }
        })(t),
          (function (t) {
            var e = o.qB(t.parallelAxis);
            i.each(e, function (e) {
              if (i.isObject(e)) {
                var n = e.parallelIndex || 0,
                  r = o.qB(t.parallel)[n];
                r && r.parallelAxisDefault && i.merge(e, r.parallelAxisDefault, !1);
              }
            });
          })(t));
      }
    },
    296413: (t, e, n) => {
      n.d(e, { vI: () => u, w2: () => c });
      var i = n(15215),
        o = n(498026),
        r = n(515915),
        a = n(912462),
        s = n(48170),
        l = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getCoordSysModel = function () {
              return this.getReferringComponents('polar', s.US).models[0];
            }),
            (e.type = 'polarAxis'),
            e
          );
        })(r.A);
      o.mixin(l, a.L);
      var c = (function (t) {
          function e() {
            var n = (null !== t && t.apply(this, arguments)) || this;
            return ((n.type = e.type), n);
          }
          return ((0, i.__extends)(e, t), (e.type = 'angleAxis'), e);
        })(l),
        u = (function (t) {
          function e() {
            var n = (null !== t && t.apply(this, arguments)) || this;
            return ((n.type = e.type), n);
          }
          return ((0, i.__extends)(e, t), (e.type = 'radiusAxis'), e);
        })(l);
    },
    317838: (t, e, n) => {
      n.d(e, { A: () => o });
      var i = n(15215);
      const o = (function (t) {
        function e() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return ((n.type = e.type), n);
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.findAxisModel = function (t) {
            var e;
            return (
              this.ecModel.eachComponent(
                t,
                function (t) {
                  t.getCoordSysModel() === this && (e = t);
                },
                this,
              ),
              e
            );
          }),
          (e.type = 'polar'),
          (e.dependencies = ['radiusAxis', 'angleAxis']),
          (e.defaultOption = { z: 0, center: ['50%', '50%'], radius: '80%' }),
          e
        );
      })(n(515915).A);
    },
    842506: (t, e, n) => {
      n.d(e, { A: () => _ });
      var i = n(498026),
        o = n(15215),
        r = n(120912),
        a = (function (t) {
          function e(e, n) {
            return t.call(this, 'radius', e, n) || this;
          }
          return (
            (0, o.__extends)(e, t),
            (e.prototype.pointToData = function (t, e) {
              return this.polar.pointToData(t, e)['radius' === this.dim ? 0 : 1];
            }),
            e
          );
        })(r.A);
      ((a.prototype.dataToRadius = r.A.prototype.dataToCoord),
        (a.prototype.radiusToData = r.A.prototype.coordToData));
      const s = a;
      var l = n(945558),
        c = n(48170),
        u = (0, c.$r)(),
        p = (function (t) {
          function e(e, n) {
            return t.call(this, 'angle', e, n || [0, 360]) || this;
          }
          return (
            (0, o.__extends)(e, t),
            (e.prototype.pointToData = function (t, e) {
              return this.polar.pointToData(t, e)['radius' === this.dim ? 0 : 1];
            }),
            (e.prototype.calculateCategoryInterval = function () {
              var t = this,
                e = t.getLabelModel(),
                n = t.scale,
                i = n.getExtent(),
                o = n.count();
              if (i[1] - i[0] < 1) return 0;
              var r = i[0],
                a = t.dataToCoord(r + 1) - t.dataToCoord(r),
                s = Math.abs(a),
                c = l.NO(null == r ? '' : r + '', e.getFont(), 'center', 'top'),
                p = Math.max(c.height, 7) / s;
              isNaN(p) && (p = 1 / 0);
              var h = Math.max(0, Math.floor(p)),
                d = u(t.model),
                f = d.lastAutoInterval,
                g = d.lastTickCount;
              return (
                null != f && null != g && Math.abs(f - h) <= 1 && Math.abs(g - o) <= 1 && f > h
                  ? (h = f)
                  : ((d.lastTickCount = o), (d.lastAutoInterval = h)),
                h
              );
            }),
            e
          );
        })(r.A);
      ((p.prototype.dataToAngle = r.A.prototype.dataToCoord),
        (p.prototype.angleToData = r.A.prototype.coordToData));
      const h = p;
      var d = ['radius', 'angle'];
      function f(t) {
        var e = t.seriesModel,
          n = t.polarModel;
        return (n && n.coordinateSystem) || (e && e.coordinateSystem);
      }
      const g = (function () {
        function t(t) {
          ((this.dimensions = d),
            (this.type = 'polar'),
            (this.cx = 0),
            (this.cy = 0),
            (this._radiusAxis = new s()),
            (this._angleAxis = new h()),
            (this.axisPointerEnabled = !0),
            (this.name = t || ''),
            (this._radiusAxis.polar = this._angleAxis.polar = this));
        }
        return (
          (t.prototype.containPoint = function (t) {
            var e = this.pointToCoord(t);
            return this._radiusAxis.contain(e[0]) && this._angleAxis.contain(e[1]);
          }),
          (t.prototype.containData = function (t) {
            return this._radiusAxis.containData(t[0]) && this._angleAxis.containData(t[1]);
          }),
          (t.prototype.getAxis = function (t) {
            return this['_' + t + 'Axis'];
          }),
          (t.prototype.getAxes = function () {
            return [this._radiusAxis, this._angleAxis];
          }),
          (t.prototype.getAxesByScale = function (t) {
            var e = [],
              n = this._angleAxis,
              i = this._radiusAxis;
            return (n.scale.type === t && e.push(n), i.scale.type === t && e.push(i), e);
          }),
          (t.prototype.getAngleAxis = function () {
            return this._angleAxis;
          }),
          (t.prototype.getRadiusAxis = function () {
            return this._radiusAxis;
          }),
          (t.prototype.getOtherAxis = function (t) {
            var e = this._angleAxis;
            return t === e ? this._radiusAxis : e;
          }),
          (t.prototype.getBaseAxis = function () {
            return (
              this.getAxesByScale('ordinal')[0] ||
              this.getAxesByScale('time')[0] ||
              this.getAngleAxis()
            );
          }),
          (t.prototype.getTooltipAxes = function (t) {
            var e = null != t && 'auto' !== t ? this.getAxis(t) : this.getBaseAxis();
            return { baseAxes: [e], otherAxes: [this.getOtherAxis(e)] };
          }),
          (t.prototype.dataToPoint = function (t, e) {
            return this.coordToPoint([
              this._radiusAxis.dataToRadius(t[0], e),
              this._angleAxis.dataToAngle(t[1], e),
            ]);
          }),
          (t.prototype.pointToData = function (t, e) {
            var n = this.pointToCoord(t);
            return [this._radiusAxis.radiusToData(n[0], e), this._angleAxis.angleToData(n[1], e)];
          }),
          (t.prototype.pointToCoord = function (t) {
            var e = t[0] - this.cx,
              n = t[1] - this.cy,
              i = this.getAngleAxis(),
              o = i.getExtent(),
              r = Math.min(o[0], o[1]),
              a = Math.max(o[0], o[1]);
            i.inverse ? (r = a - 360) : (a = r + 360);
            var s = Math.sqrt(e * e + n * n);
            ((e /= s), (n /= s));
            for (var l = (Math.atan2(-n, e) / Math.PI) * 180, c = l < r ? 1 : -1; l < r || l > a;)
              l += 360 * c;
            return [s, l];
          }),
          (t.prototype.coordToPoint = function (t) {
            var e = t[0],
              n = (t[1] / 180) * Math.PI;
            return [Math.cos(n) * e + this.cx, -Math.sin(n) * e + this.cy];
          }),
          (t.prototype.getArea = function () {
            var t = this.getAngleAxis(),
              e = this.getRadiusAxis().getExtent().slice();
            e[0] > e[1] && e.reverse();
            var n = t.getExtent(),
              i = Math.PI / 180,
              o = 1e-4;
            return {
              cx: this.cx,
              cy: this.cy,
              r0: e[0],
              r: e[1],
              startAngle: -n[0] * i,
              endAngle: -n[1] * i,
              clockwise: t.inverse,
              contain: function (t, e) {
                var n = t - this.cx,
                  i = e - this.cy,
                  r = n * n + i * i,
                  a = this.r,
                  s = this.r0;
                return a !== s && r - o <= a * a && r + o >= s * s;
              },
            };
          }),
          (t.prototype.convertToPixel = function (t, e, n) {
            return f(e) === this ? this.dataToPoint(n) : null;
          }),
          (t.prototype.convertFromPixel = function (t, e, n) {
            return f(e) === this ? this.pointToData(n) : null;
          }),
          t
        );
      })();
      var m = n(624326),
        y = n(399031);
      function v(t, e) {
        var n = this,
          o = n.getAngleAxis(),
          r = n.getRadiusAxis();
        if (
          (o.scale.setExtent(1 / 0, -1 / 0),
          r.scale.setExtent(1 / 0, -1 / 0),
          t.eachSeries(function (t) {
            if (t.coordinateSystem === n) {
              var e = t.getData();
              (i.each((0, y.wq)(e, 'radius'), function (t) {
                r.scale.unionExtentFromData(e, t);
              }),
                i.each((0, y.wq)(e, 'angle'), function (t) {
                  o.scale.unionExtentFromData(e, t);
                }));
            }
          }),
          (0, y.af)(o.scale, o.model),
          (0, y.af)(r.scale, r.model),
          'category' === o.type && !o.onBand)
        ) {
          var a = o.getExtent(),
            s = 360 / o.scale.count();
          (o.inverse ? (a[1] += s) : (a[1] -= s), o.setExtent(a[0], a[1]));
        }
      }
      function x(t, e) {
        var n;
        if (
          ((t.type = e.get('type')),
          (t.scale = (0, y.f$)(e)),
          (t.onBand = e.get('boundaryGap') && 'category' === t.type),
          (t.inverse = e.get('inverse')),
          (function (t) {
            return 'angleAxis' === t.mainType;
          })(e))
        ) {
          t.inverse = t.inverse !== e.get('clockwise');
          var i = e.get('startAngle'),
            o = null !== (n = e.get('endAngle')) && void 0 !== n ? n : i + (t.inverse ? -360 : 360);
          t.setExtent(i, o);
        }
        ((e.axis = t), (t.model = e));
      }
      const _ = {
        dimensions: d,
        create: function (t, e) {
          var n = [];
          return (
            t.eachComponent('polar', function (t, o) {
              var r = new g(o + '');
              r.update = v;
              var a = r.getRadiusAxis(),
                s = r.getAngleAxis(),
                l = t.findAxisModel('radiusAxis'),
                c = t.findAxisModel('angleAxis');
              (x(a, l),
                x(s, c),
                (function (t, e, n) {
                  var o = e.get('center'),
                    r = n.getWidth(),
                    a = n.getHeight();
                  ((t.cx = (0, m.lo)(o[0], r)), (t.cy = (0, m.lo)(o[1], a)));
                  var s = t.getRadiusAxis(),
                    l = Math.min(r, a) / 2,
                    c = e.get('radius');
                  null == c ? (c = [0, '100%']) : i.isArray(c) || (c = [0, c]);
                  var u = [(0, m.lo)(c[0], l), (0, m.lo)(c[1], l)];
                  s.inverse ? s.setExtent(u[1], u[0]) : s.setExtent(u[0], u[1]);
                })(r, t, e),
                n.push(r),
                (t.coordinateSystem = r),
                (r.model = t));
            }),
            t.eachSeries(function (t) {
              if ('polar' === t.get('coordinateSystem')) {
                var e = t.getReferringComponents('polar', c.US).models[0];
                t.coordinateSystem = e.coordinateSystem;
              }
            }),
            n
          );
        },
      };
    },
    768971: (t, e, n) => {
      n.d(e, { A: () => r });
      var i = n(498026);
      function o(t, e) {
        return (
          (e = e || [0, 0]),
          i.map(
            ['Radius', 'Angle'],
            function (n, i) {
              var o = this['get' + n + 'Axis'](),
                r = e[i],
                a = t[i] / 2,
                s =
                  'category' === o.type
                    ? o.getBandWidth()
                    : Math.abs(o.dataToCoord(r - a) - o.dataToCoord(r + a));
              return ('Angle' === n && (s = (s * Math.PI) / 180), s);
            },
            this,
          )
        );
      }
      function r(t) {
        var e = t.getRadiusAxis(),
          n = t.getAngleAxis(),
          r = e.getExtent();
        return (
          r[0] > r[1] && r.reverse(),
          {
            coordSys: { type: 'polar', cx: t.cx, cy: t.cy, r: r[1], r0: r[0] },
            api: {
              coord: function (i) {
                var o = e.dataToRadius(i[0]),
                  r = n.dataToAngle(i[1]),
                  a = t.coordToPoint([o, r]);
                return (a.push(o, (r * Math.PI) / 180), a);
              },
              size: i.bind(o, t),
            },
          }
        );
      }
    },
    296504: (t, e, n) => {
      n.d(e, { A: () => c });
      var i = n(15215);
      const o = (function (t) {
        function e(e, n, i) {
          var o = t.call(this, e, n, i) || this;
          return ((o.type = 'value'), (o.angle = 0), (o.name = ''), o);
        }
        return ((0, i.__extends)(e, t), e);
      })(n(120912).A);
      var r = n(274562),
        a = n(624326),
        s = n(498026),
        l = n(103486);
      const c = (function () {
        function t(t, e, n) {
          ((this.dimensions = []),
            (this._model = t),
            (this._indicatorAxes = (0, s.map)(
              t.getIndicatorModels(),
              function (t, e) {
                var n = 'indicator_' + e,
                  i = new o(n, new r.A());
                return (
                  (i.name = t.get('name')),
                  (i.model = t),
                  (t.axis = i),
                  this.dimensions.push(n),
                  i
                );
              },
              this,
            )),
            this.resize(t, n));
        }
        return (
          (t.prototype.getIndicatorAxes = function () {
            return this._indicatorAxes;
          }),
          (t.prototype.dataToPoint = function (t, e) {
            var n = this._indicatorAxes[e];
            return this.coordToPoint(n.dataToCoord(t), e);
          }),
          (t.prototype.coordToPoint = function (t, e) {
            var n = this._indicatorAxes[e].angle;
            return [this.cx + t * Math.cos(n), this.cy - t * Math.sin(n)];
          }),
          (t.prototype.pointToData = function (t) {
            var e = t[0] - this.cx,
              n = t[1] - this.cy,
              i = Math.sqrt(e * e + n * n);
            ((e /= i), (n /= i));
            for (
              var o, r = Math.atan2(-n, e), a = 1 / 0, s = -1, l = 0;
              l < this._indicatorAxes.length;
              l++
            ) {
              var c = this._indicatorAxes[l],
                u = Math.abs(r - c.angle);
              u < a && ((o = c), (s = l), (a = u));
            }
            return [s, +(o && o.coordToData(i))];
          }),
          (t.prototype.resize = function (t, e) {
            var n = t.get('center'),
              i = e.getWidth(),
              o = e.getHeight(),
              r = Math.min(i, o) / 2;
            ((this.cx = a.lo(n[0], i)),
              (this.cy = a.lo(n[1], o)),
              (this.startAngle = (t.get('startAngle') * Math.PI) / 180));
            var l = t.get('radius');
            (((0, s.isString)(l) || (0, s.isNumber)(l)) && (l = [0, l]),
              (this.r0 = a.lo(l[0], r)),
              (this.r = a.lo(l[1], r)),
              (0, s.each)(
                this._indicatorAxes,
                function (t, e) {
                  t.setExtent(this.r0, this.r);
                  var n = this.startAngle + (e * Math.PI * 2) / this._indicatorAxes.length;
                  ((n = Math.atan2(Math.sin(n), Math.cos(n))), (t.angle = n));
                },
                this,
              ));
          }),
          (t.prototype.update = function (t, e) {
            var n = this._indicatorAxes,
              i = this._model;
            ((0, s.each)(n, function (t) {
              t.scale.setExtent(1 / 0, -1 / 0);
            }),
              t.eachSeriesByType(
                'radar',
                function (e, o) {
                  if (
                    'radar' === e.get('coordinateSystem') &&
                    t.getComponent('radar', e.get('radarIndex')) === i
                  ) {
                    var r = e.getData();
                    (0, s.each)(n, function (t) {
                      t.scale.unionExtentFromData(r, r.mapDimension(t.dim));
                    });
                  }
                },
                this,
              ));
            var o = i.get('splitNumber'),
              a = new r.A();
            (a.setExtent(0, o),
              a.setInterval(1),
              (0, s.each)(n, function (t, e) {
                (0, l.m)(t.scale, t.model, a);
              }));
          }),
          (t.prototype.convertToPixel = function (t, e, n) {
            return (console.warn('Not implemented.'), null);
          }),
          (t.prototype.convertFromPixel = function (t, e, n) {
            return (console.warn('Not implemented.'), null);
          }),
          (t.prototype.containPoint = function (t) {
            return (console.warn('Not implemented.'), !1);
          }),
          (t.create = function (e, n) {
            var i = [];
            return (
              e.eachComponent('radar', function (o) {
                var r = new t(o, e, n);
                (i.push(r), (o.coordinateSystem = r));
              }),
              e.eachSeriesByType('radar', function (t) {
                'radar' === t.get('coordinateSystem') &&
                  (t.coordinateSystem = i[t.get('radarIndex') || 0]);
              }),
              i
            );
          }),
          (t.dimensions = []),
          t
        );
      })();
    },
    971674: (t, e, n) => {
      n.d(e, { A: () => p });
      var i = n(15215),
        o = n(498026),
        r = n(613286),
        a = n(143172),
        s = n(912462),
        l = n(515915),
        c = r.A.value;
      function u(t, e) {
        return o.defaults({ show: e }, t);
      }
      const p = (function (t) {
        function e() {
          var n = (null !== t && t.apply(this, arguments)) || this;
          return ((n.type = e.type), n);
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.optionUpdated = function () {
            var t = this.get('boundaryGap'),
              e = this.get('splitNumber'),
              n = this.get('scale'),
              i = this.get('axisLine'),
              r = this.get('axisTick'),
              l = this.get('axisLabel'),
              c = this.get('axisName'),
              u = this.get(['axisName', 'show']),
              p = this.get(['axisName', 'formatter']),
              h = this.get('axisNameGap'),
              d = this.get('triggerEvent'),
              f = o.map(
                this.get('indicator') || [],
                function (f) {
                  null != f.max && f.max > 0 && !f.min
                    ? (f.min = 0)
                    : null != f.min && f.min < 0 && !f.max && (f.max = 0);
                  var g = c;
                  null != f.color && (g = o.defaults({ color: f.color }, c));
                  var m = o.merge(
                    o.clone(f),
                    {
                      boundaryGap: t,
                      splitNumber: e,
                      scale: n,
                      axisLine: i,
                      axisTick: r,
                      axisLabel: l,
                      name: f.text,
                      showName: u,
                      nameLocation: 'end',
                      nameGap: h,
                      nameTextStyle: g,
                      triggerEvent: d,
                    },
                    !1,
                  );
                  if (o.isString(p)) {
                    var y = m.name;
                    m.name = p.replace('{value}', null != y ? y : '');
                  } else o.isFunction(p) && (m.name = p(m.name, m));
                  var v = new a.A(m, null, this.ecModel);
                  return (
                    o.mixin(v, s.L.prototype),
                    (v.mainType = 'radar'),
                    (v.componentIndex = this.componentIndex),
                    v
                  );
                },
                this,
              );
            this._indicatorModels = f;
          }),
          (e.prototype.getIndicatorModels = function () {
            return this._indicatorModels;
          }),
          (e.type = 'radar'),
          (e.defaultOption = {
            z: 0,
            center: ['50%', '50%'],
            radius: '75%',
            startAngle: 90,
            axisName: { show: !0 },
            boundaryGap: [0, 0],
            splitNumber: 5,
            axisNameGap: 15,
            scale: !1,
            shape: 'polygon',
            axisLine: o.merge({ lineStyle: { color: '#bbb' } }, c.axisLine),
            axisLabel: u(c.axisLabel, !1),
            axisTick: u(c.axisTick, !1),
            splitLine: u(c.splitLine, !0),
            splitArea: u(c.splitArea, !0),
            indicator: [],
          }),
          e
        );
      })(l.A);
    },
    942262: (t, e, n) => {
      n.d(e, { Tc: () => l });
      var i = n(498026),
        o = n(945558),
        r = (function () {
          function t(t, e, n) {
            this._prepareParams(t, e, n);
          }
          return (
            (t.prototype._prepareParams = function (t, e, n) {
              (n[1] < n[0] && (n = [NaN, NaN]), (this._dataMin = n[0]), (this._dataMax = n[1]));
              var r = (this._isOrdinal = 'ordinal' === t.type);
              this._needCrossZero =
                'interval' === t.type && e.getNeedCrossZero && e.getNeedCrossZero();
              var a = e.get('min', !0);
              null == a && (a = e.get('startValue', !0));
              var s = (this._modelMinRaw = a);
              (0, i.isFunction)(s)
                ? (this._modelMinNum = c(t, s({ min: n[0], max: n[1] })))
                : 'dataMin' !== s && (this._modelMinNum = c(t, s));
              var l = (this._modelMaxRaw = e.get('max', !0));
              if (
                ((0, i.isFunction)(l)
                  ? (this._modelMaxNum = c(t, l({ min: n[0], max: n[1] })))
                  : 'dataMax' !== l && (this._modelMaxNum = c(t, l)),
                r)
              )
                this._axisDataLen = e.getCategories().length;
              else {
                var u = e.get('boundaryGap'),
                  p = (0, i.isArray)(u) ? u : [u || 0, u || 0];
                'boolean' == typeof p[0] || 'boolean' == typeof p[1]
                  ? (this._boundaryGapInner = [0, 0])
                  : (this._boundaryGapInner = [(0, o.lo)(p[0], 1), (0, o.lo)(p[1], 1)]);
              }
            }),
            (t.prototype.calculate = function () {
              var t = this._isOrdinal,
                e = this._dataMin,
                n = this._dataMax,
                o = this._axisDataLen,
                r = this._boundaryGapInner,
                a = t ? null : n - e || Math.abs(e),
                s = 'dataMin' === this._modelMinRaw ? e : this._modelMinNum,
                l = 'dataMax' === this._modelMaxRaw ? n : this._modelMaxNum,
                c = null != s,
                u = null != l;
              (null == s && (s = t ? (o ? 0 : NaN) : e - r[0] * a),
                null == l && (l = t ? (o ? o - 1 : NaN) : n + r[1] * a),
                (null == s || !isFinite(s)) && (s = NaN),
                (null == l || !isFinite(l)) && (l = NaN));
              var p = (0, i.eqNaN)(s) || (0, i.eqNaN)(l) || (t && !o);
              this._needCrossZero &&
                (s > 0 && l > 0 && !c && (s = 0), s < 0 && l < 0 && !u && (l = 0));
              var h = this._determinedMin,
                d = this._determinedMax;
              return (
                null != h && ((s = h), (c = !0)),
                null != d && ((l = d), (u = !0)),
                { min: s, max: l, minFixed: c, maxFixed: u, isBlank: p }
              );
            }),
            (t.prototype.modifyDataMinMax = function (t, e) {
              this[s[t]] = e;
            }),
            (t.prototype.setDeterminedMinMax = function (t, e) {
              this[a[t]] = e;
            }),
            (t.prototype.freeze = function () {
              this.frozen = !0;
            }),
            t
          );
        })(),
        a = { min: '_determinedMin', max: '_determinedMax' },
        s = { min: '_dataMin', max: '_dataMax' };
      function l(t, e, n) {
        var i = t.rawExtentInfo;
        return i || ((i = new r(t, e, n)), (t.rawExtentInfo = i), i);
      }
      function c(t, e) {
        return null == e ? null : (0, i.eqNaN)(e) ? NaN : t.parse(e);
      }
    },
    986351: (t, e, n) => {
      n.d(e, { A: () => l });
      var i = n(15215),
        o = n(515915),
        r = n(912462),
        a = n(498026),
        s = (function (t) {
          function e() {
            var n = (null !== t && t.apply(this, arguments)) || this;
            return ((n.type = e.type), n);
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype.getCoordSysModel = function () {
              return this;
            }),
            (e.type = 'singleAxis'),
            (e.layoutMode = 'box'),
            (e.defaultOption = {
              left: '5%',
              top: '5%',
              right: '5%',
              bottom: '5%',
              type: 'value',
              position: 'bottom',
              orient: 'horizontal',
              axisLine: { show: !0, lineStyle: { width: 1, type: 'solid' } },
              tooltip: { show: !0 },
              axisTick: { show: !0, length: 6, lineStyle: { width: 1 } },
              axisLabel: { show: !0, interval: 'auto' },
              splitLine: { show: !0, lineStyle: { type: 'dashed', opacity: 0.2 } },
            }),
            e
          );
        })(o.A);
      (0, a.mixin)(s, r.L.prototype);
      const l = s;
    },
    476953: (t, e, n) => {
      n.d(e, { A: () => r });
      var i = n(498026);
      function o(t, e) {
        var n = this.getAxis(),
          i = e instanceof Array ? e[0] : e,
          o = (t instanceof Array ? t[0] : t) / 2;
        return 'category' === n.type
          ? n.getBandWidth()
          : Math.abs(n.dataToCoord(i - o) - n.dataToCoord(i + o));
      }
      function r(t) {
        var e = t.getRect();
        return {
          coordSys: { type: 'singleAxis', x: e.x, y: e.y, width: e.width, height: e.height },
          api: {
            coord: function (e) {
              return t.dataToPoint(e);
            },
            size: (0, i.bind)(o, t),
          },
        };
      }
    },
    785508: (t, e, n) => {
      n.d(e, { Z: () => o });
      var i = n(498026);
      function o(t, e) {
        e = e || {};
        var n = t.coordinateSystem,
          o = t.axis,
          r = {},
          a = o.position,
          s = o.orient,
          l = n.getRect(),
          c = [l.x, l.x + l.width, l.y, l.y + l.height],
          u = { horizontal: { top: c[2], bottom: c[3] }, vertical: { left: c[0], right: c[1] } };
        ((r.position = [
          'vertical' === s ? u.vertical[a] : c[0],
          'horizontal' === s ? u.horizontal[a] : c[3],
        ]),
          (r.rotation = (Math.PI / 2) * { horizontal: 0, vertical: 1 }[s]),
          (r.labelDirection =
            r.tickDirection =
            r.nameDirection =
              { top: -1, bottom: 1, right: 1, left: -1 }[a]),
          t.get(['axisTick', 'inside']) && (r.tickDirection = -r.tickDirection),
          i.retrieve(e.labelInside, t.get(['axisLabel', 'inside'])) &&
            (r.labelDirection = -r.labelDirection));
        var p = e.rotate;
        return (
          null == p && (p = t.get(['axisLabel', 'rotate'])),
          (r.labelRotation = 'top' === a ? -p : p),
          (r.z2 = 1),
          r
        );
      }
    },
    215787: (t, e, n) => {
      n.d(e, { A: () => h });
      var i = n(15215);
      const o = (function (t) {
        function e(e, n, i, o, r) {
          var a = t.call(this, e, n, i) || this;
          return ((a.type = o || 'value'), (a.position = r || 'bottom'), a);
        }
        return (
          (0, i.__extends)(e, t),
          (e.prototype.isHorizontal = function () {
            var t = this.position;
            return 'top' === t || 'bottom' === t;
          }),
          (e.prototype.pointToData = function (t, e) {
            return this.coordinateSystem.pointToData(t)[0];
          }),
          e
        );
      })(n(120912).A);
      var r = n(399031),
        a = n(834253),
        s = n(498026),
        l = ['single'];
      function c(t) {
        var e = t.seriesModel,
          n = t.singleAxisModel;
        return (n && n.coordinateSystem) || (e && e.coordinateSystem);
      }
      const u = (function () {
        function t(t, e, n) {
          ((this.type = 'single'),
            (this.dimension = 'single'),
            (this.dimensions = l),
            (this.axisPointerEnabled = !0),
            (this.model = t),
            this._init(t, e, n));
        }
        return (
          (t.prototype._init = function (t, e, n) {
            var i = this.dimension,
              a = new o(i, r.f$(t), [0, 0], t.get('type'), t.get('position')),
              s = 'category' === a.type;
            ((a.onBand = s && t.get('boundaryGap')),
              (a.inverse = t.get('inverse')),
              (a.orient = t.get('orient')),
              (t.axis = a),
              (a.model = t),
              (a.coordinateSystem = this),
              (this._axis = a));
          }),
          (t.prototype.update = function (t, e) {
            t.eachSeries(function (t) {
              if (t.coordinateSystem === this) {
                var e = t.getData();
                ((0, s.each)(
                  e.mapDimensionsAll(this.dimension),
                  function (t) {
                    this._axis.scale.unionExtentFromData(e, t);
                  },
                  this,
                ),
                  r.af(this._axis.scale, this._axis.model));
              }
            }, this);
          }),
          (t.prototype.resize = function (t, e) {
            ((this._rect = (0, a.dV)(
              {
                left: t.get('left'),
                top: t.get('top'),
                right: t.get('right'),
                bottom: t.get('bottom'),
                width: t.get('width'),
                height: t.get('height'),
              },
              { width: e.getWidth(), height: e.getHeight() },
            )),
              this._adjustAxis());
          }),
          (t.prototype.getRect = function () {
            return this._rect;
          }),
          (t.prototype._adjustAxis = function () {
            var t = this._rect,
              e = this._axis,
              n = e.isHorizontal(),
              i = n ? [0, t.width] : [0, t.height],
              o = e.inverse ? 1 : 0;
            (e.setExtent(i[o], i[1 - o]), this._updateAxisTransform(e, n ? t.x : t.y));
          }),
          (t.prototype._updateAxisTransform = function (t, e) {
            var n = t.getExtent(),
              i = n[0] + n[1],
              o = t.isHorizontal();
            ((t.toGlobalCoord = o
              ? function (t) {
                  return t + e;
                }
              : function (t) {
                  return i - t + e;
                }),
              (t.toLocalCoord = o
                ? function (t) {
                    return t - e;
                  }
                : function (t) {
                    return i - t + e;
                  }));
          }),
          (t.prototype.getAxis = function () {
            return this._axis;
          }),
          (t.prototype.getBaseAxis = function () {
            return this._axis;
          }),
          (t.prototype.getAxes = function () {
            return [this._axis];
          }),
          (t.prototype.getTooltipAxes = function () {
            return { baseAxes: [this.getAxis()], otherAxes: [] };
          }),
          (t.prototype.containPoint = function (t) {
            var e = this.getRect(),
              n = this.getAxis();
            return 'horizontal' === n.orient
              ? n.contain(n.toLocalCoord(t[0])) && t[1] >= e.y && t[1] <= e.y + e.height
              : n.contain(n.toLocalCoord(t[1])) && t[0] >= e.y && t[0] <= e.y + e.height;
          }),
          (t.prototype.pointToData = function (t) {
            var e = this.getAxis();
            return [e.coordToData(e.toLocalCoord(t['horizontal' === e.orient ? 0 : 1]))];
          }),
          (t.prototype.dataToPoint = function (t) {
            var e = this.getAxis(),
              n = this.getRect(),
              i = [],
              o = 'horizontal' === e.orient ? 0 : 1;
            return (
              t instanceof Array && (t = t[0]),
              (i[o] = e.toGlobalCoord(e.dataToCoord(+t))),
              (i[1 - o] = 0 === o ? n.y + n.height / 2 : n.x + n.width / 2),
              i
            );
          }),
          (t.prototype.convertToPixel = function (t, e, n) {
            return c(e) === this ? this.dataToPoint(n) : null;
          }),
          (t.prototype.convertFromPixel = function (t, e, n) {
            return c(e) === this ? this.pointToData(n) : null;
          }),
          t
        );
      })();
      var p = n(48170);
      const h = {
        create: function (t, e) {
          var n = [];
          return (
            t.eachComponent('singleAxis', function (i, o) {
              var r = new u(i, t, e);
              ((r.name = 'single_' + o), r.resize(i, e), (i.coordinateSystem = r), n.push(r));
            }),
            t.eachSeries(function (t) {
              if ('singleAxis' === t.get('coordinateSystem')) {
                var e = t.getReferringComponents('singleAxis', p.US).models[0];
                t.coordinateSystem = e && e.coordinateSystem;
              }
            }),
            n
          );
        },
        dimensions: l,
      };
    },
    189737: (t, e, n) => {
      n.d(e, { A: () => r });
      var i = n(498026),
        o = {};
      const r = (function () {
        function t() {
          this._coordinateSystems = [];
        }
        return (
          (t.prototype.create = function (t, e) {
            var n = [];
            (i.each(o, function (i, o) {
              var r = i.create(t, e);
              n = n.concat(r || []);
            }),
              (this._coordinateSystems = n));
          }),
          (t.prototype.update = function (t, e) {
            i.each(this._coordinateSystems, function (n) {
              n.update && n.update(t, e);
            });
          }),
          (t.prototype.getCoordinateSystems = function () {
            return this._coordinateSystems.slice();
          }),
          (t.register = function (t, e) {
            o[t] = e;
          }),
          (t.get = function (t) {
            return o[t];
          }),
          t
        );
      })();
    },
    695383: (t, e, n) => {
      n.d(e, {
        FQ: () => gt,
        Ng: () => se,
        p5: () => ke,
        El: () => ct,
        zm: () => ce,
        Zf: () => le,
        AS: () => ue,
        Bo: () => Ae,
        FP: () => pe,
        aQ: () => he,
        ZB: () => De,
        Ts: () => ae,
        OH: () => xe,
        pX: () => _e,
        Oh: () => Me,
        Ej: () => Se,
        E: () => nt.E,
        mz: () => Le,
        cf: () => me,
        tb: () => ye,
        lP: () => fe,
        qg: () => ge,
        bf: () => de,
        iY: () => Ie,
        xV: () => ve,
        AF: () => Te,
        vV: () => Ce,
        rE: () => lt,
      });
      var i = n(15215),
        o = n(633572),
        r = n(498026),
        a = n(738123),
        s = n(383470),
        l = n(757861),
        c = n(773100),
        u = [
          'getDom',
          'getZr',
          'getWidth',
          'getHeight',
          'getDevicePixelRatio',
          'dispatchAction',
          'isSSR',
          'isDisposed',
          'on',
          'off',
          'getDataURL',
          'getConnectedDataURL',
          'getOption',
          'getId',
          'updateLabelLayout',
        ];
      const p = function (t) {
        r.each(
          u,
          function (e) {
            this[e] = r.bind(t[e], t);
          },
          this,
        );
      };
      var h = n(189737),
        d = n(708348),
        f = n(274065),
        g = n(807213),
        m = n(347355),
        y = n(659109),
        v = n(106666),
        x = n(830010),
        _ = n(390540),
        A = n(683257),
        M = n(467065),
        T = n(669622),
        w = n(34833),
        b = n(48170),
        S = n(824711),
        C = n(820074),
        L = n(114716),
        D = n(549431),
        I = n(612616),
        k = (function () {
          function t(t, e, n, i) {
            ((this._stageTaskMap = (0, r.createHashMap)()),
              (this.ecInstance = t),
              (this.api = e),
              (n = this._dataProcessorHandlers = n.slice()),
              (i = this._visualHandlers = i.slice()),
              (this._allHandlers = n.concat(i)));
          }
          return (
            (t.prototype.restoreData = function (t, e) {
              (t.restoreData(e),
                this._stageTaskMap.each(function (t) {
                  var e = t.overallTask;
                  e && e.dirty();
                }));
            }),
            (t.prototype.getPerformArgs = function (t, e) {
              if (t.__pipeline) {
                var n = this._pipelineMap.get(t.__pipeline.id),
                  i = n.context,
                  o =
                    !e &&
                    n.progressiveEnabled &&
                    (!i || i.progressiveRender) &&
                    t.__idxInPipeline > n.blockIndex
                      ? n.step
                      : null,
                  r = i && i.modDataCount;
                return { step: o, modBy: null != r ? Math.ceil(r / o) : null, modDataCount: r };
              }
            }),
            (t.prototype.getPipeline = function (t) {
              return this._pipelineMap.get(t);
            }),
            (t.prototype.updateStreamModes = function (t, e) {
              var n = this._pipelineMap.get(t.uid),
                i = t.getData().count(),
                o = n.progressiveEnabled && e.incrementalPrepareRender && i >= n.threshold,
                r = t.get('large') && i >= t.get('largeThreshold'),
                a = 'mod' === t.get('progressiveChunkMode') ? i : null;
              t.pipelineContext = n.context = { progressiveRender: o, modDataCount: a, large: r };
            }),
            (t.prototype.restorePipelines = function (t) {
              var e = this,
                n = (e._pipelineMap = (0, r.createHashMap)());
              t.eachSeries(function (t) {
                var i = t.getProgressive(),
                  o = t.uid;
                (n.set(o, {
                  id: o,
                  head: null,
                  tail: null,
                  threshold: t.getProgressiveThreshold(),
                  progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
                  blockIndex: -1,
                  step: Math.round(i || 700),
                  count: 0,
                }),
                  e._pipe(t, t.dataTask));
              });
            }),
            (t.prototype.prepareStageTasks = function () {
              var t = this._stageTaskMap,
                e = this.api.getModel(),
                n = this.api;
              (0, r.each)(
                this._allHandlers,
                function (i) {
                  var o = t.get(i.uid) || t.set(i.uid, {});
                  ((0, r.assert)(!(i.reset && i.overallReset), ''),
                    i.reset && this._createSeriesStageTask(i, o, e, n),
                    i.overallReset && this._createOverallStageTask(i, o, e, n));
                },
                this,
              );
            }),
            (t.prototype.prepareView = function (t, e, n, i) {
              var o = t.renderTask,
                r = o.context;
              ((r.model = e),
                (r.ecModel = n),
                (r.api = i),
                (o.__block = !t.incrementalPrepareRender),
                this._pipe(e, o));
            }),
            (t.prototype.performDataProcessorTasks = function (t, e) {
              this._performStageTasks(this._dataProcessorHandlers, t, e, { block: !0 });
            }),
            (t.prototype.performVisualTasks = function (t, e, n) {
              this._performStageTasks(this._visualHandlers, t, e, n);
            }),
            (t.prototype._performStageTasks = function (t, e, n, i) {
              i = i || {};
              var o = !1,
                a = this;
              function s(t, e) {
                return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));
              }
              ((0, r.each)(t, function (t, r) {
                if (!i.visualType || i.visualType === t.visualType) {
                  var l = a._stageTaskMap.get(t.uid),
                    c = l.seriesTaskMap,
                    u = l.overallTask;
                  if (u) {
                    var p,
                      h = u.agentStubMap;
                    (h.each(function (t) {
                      s(i, t) && (t.dirty(), (p = !0));
                    }),
                      p && u.dirty(),
                      a.updatePayload(u, n));
                    var d = a.getPerformArgs(u, i.block);
                    (h.each(function (t) {
                      t.perform(d);
                    }),
                      u.perform(d) && (o = !0));
                  } else
                    c &&
                      c.each(function (r, l) {
                        s(i, r) && r.dirty();
                        var c = a.getPerformArgs(r, i.block);
                        ((c.skip = !t.performRawSeries && e.isSeriesFiltered(r.context.model)),
                          a.updatePayload(r, n),
                          r.perform(c) && (o = !0));
                      });
                }
              }),
                (this.unfinished = o || this.unfinished));
            }),
            (t.prototype.performSeriesTasks = function (t) {
              var e;
              (t.eachSeries(function (t) {
                e = t.dataTask.perform() || e;
              }),
                (this.unfinished = e || this.unfinished));
            }),
            (t.prototype.plan = function () {
              this._pipelineMap.each(function (t) {
                var e = t.tail;
                do {
                  if (e.__block) {
                    t.blockIndex = e.__idxInPipeline;
                    break;
                  }
                  e = e.getUpstream();
                } while (e);
              });
            }),
            (t.prototype.updatePayload = function (t, e) {
              'remain' !== e && (t.context.payload = e);
            }),
            (t.prototype._createSeriesStageTask = function (t, e, n, i) {
              var o = this,
                a = e.seriesTaskMap,
                s = (e.seriesTaskMap = (0, r.createHashMap)()),
                l = t.seriesType,
                c = t.getTargetSeries;
              function u(e) {
                var r = e.uid,
                  l = s.set(r, (a && a.get(r)) || (0, D.U)({ plan: O, reset: N, count: V }));
                ((l.context = {
                  model: e,
                  ecModel: n,
                  api: i,
                  useClearVisual: t.isVisual && !t.isLayout,
                  plan: t.plan,
                  reset: t.reset,
                  scheduler: o,
                }),
                  o._pipe(e, l));
              }
              t.createOnAllSeries
                ? n.eachRawSeries(u)
                : l
                  ? n.eachRawSeriesByType(l, u)
                  : c && c(n, i).each(u);
            }),
            (t.prototype._createOverallStageTask = function (t, e, n, i) {
              var o = this,
                a = (e.overallTask = e.overallTask || (0, D.U)({ reset: R }));
              a.context = { ecModel: n, api: i, overallReset: t.overallReset, scheduler: o };
              var s = a.agentStubMap,
                l = (a.agentStubMap = (0, r.createHashMap)()),
                c = t.seriesType,
                u = t.getTargetSeries,
                p = !0,
                h = !1;
              function d(t) {
                var e = t.uid,
                  n = l.set(e, (s && s.get(e)) || ((h = !0), (0, D.U)({ reset: P, onDirty: z })));
                ((n.context = { model: t, overallProgress: p }),
                  (n.agent = a),
                  (n.__block = p),
                  o._pipe(t, n));
              }
              ((0, r.assert)(!t.createOnAllSeries, ''),
                c
                  ? n.eachRawSeriesByType(c, d)
                  : u
                    ? u(n, i).each(d)
                    : ((p = !1), (0, r.each)(n.getSeries(), d)),
                h && a.dirty());
            }),
            (t.prototype._pipe = function (t, e) {
              var n = t.uid,
                i = this._pipelineMap.get(n);
              (!i.head && (i.head = e),
                i.tail && i.tail.pipe(e),
                (i.tail = e),
                (e.__idxInPipeline = i.count++),
                (e.__pipeline = i));
            }),
            (t.wrapStageHandler = function (t, e) {
              return (
                (0, r.isFunction)(t) && (t = { overallReset: t, seriesType: G(t) }),
                (t.uid = (0, I.$Q)('stageHandler')),
                e && (t.visualType = e),
                t
              );
            }),
            t
          );
        })();
      function R(t) {
        t.overallReset(t.ecModel, t.api, t.payload);
      }
      function P(t) {
        return t.overallProgress && E;
      }
      function E() {
        (this.agent.dirty(), this.getDownstream().dirty());
      }
      function z() {
        this.agent && this.agent.dirty();
      }
      function O(t) {
        return t.plan ? t.plan(t.model, t.ecModel, t.api, t.payload) : null;
      }
      function N(t) {
        t.useClearVisual && t.data.clearAllVisual();
        var e = (t.resetDefines = (0, b.qB)(t.reset(t.model, t.ecModel, t.api, t.payload)));
        return e.length > 1
          ? (0, r.map)(e, function (t, e) {
              return F(e);
            })
          : B;
      }
      var B = F(0);
      function F(t) {
        return function (e, n) {
          var i = n.data,
            o = n.resetDefines[t];
          if (o && o.dataEach) for (var r = e.start; r < e.end; r++) o.dataEach(i, r);
          else o && o.progress && o.progress(e, i);
        };
      }
      function V(t) {
        return t.data.count();
      }
      function G(t) {
        W = null;
        try {
          t(U, H);
        } catch (t) {}
        return W;
      }
      var W,
        U = {},
        H = {};
      function Z(t, e) {
        for (var n in e.prototype) t[n] = r.noop;
      }
      (Z(U, c.A),
        Z(H, p),
        (U.eachSeriesByType = U.eachRawSeriesByType =
          function (t) {
            W = t;
          }),
        (U.eachComponent = function (t) {
          'series' === t.mainType && t.subType && (W = t.subType);
        }));
      const j = k;
      var J = n(200412),
        q = n(347006),
        Y = n(330693),
        X = n(481075),
        $ = n(958287),
        Q = n(337395),
        K = n(863406),
        tt = n(716884),
        et = n(517752),
        nt = n(253080),
        it = n(747411),
        ot = n(656970);
      const rt = new l.A();
      var at = n(259741),
        st = n(813976),
        lt = '5.6.0',
        ct = { zrender: '5.6.1' },
        ut = 2e3,
        pt = 1e3,
        ht = 2e3,
        dt = 3e3,
        ft = 4500,
        gt = {
          PROCESSOR: { FILTER: 1e3, SERIES_FILTER: 800, STATISTIC: 5e3 },
          VISUAL: {
            LAYOUT: pt,
            PROGRESSIVE_LAYOUT: 1100,
            GLOBAL: ht,
            CHART: dt,
            POST_CHART_LAYOUT: 4600,
            COMPONENT: 4e3,
            BRUSH: 5e3,
            CHART_ITEM: ft,
            ARIA: 6e3,
            DECAL: 7e3,
          },
        },
        mt = '__flagInMainProcess',
        yt = '__pendingUpdate',
        vt = '__needsUpdateStatus',
        xt = /^[a-zA-Z0-9_]+$/,
        _t = '__connectUpdateStatus';
      function At(t) {
        return function () {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          if (!this.isDisposed()) return Tt(this, t, e);
          Jt(this.id);
        };
      }
      function Mt(t) {
        return function () {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          return Tt(this, t, e);
        };
      }
      function Tt(t, e, n) {
        return ((n[0] = n[0] && n[0].toLowerCase()), l.A.prototype[e].apply(t, n));
      }
      var wt,
        bt,
        St,
        Ct,
        Lt,
        Dt,
        It,
        kt,
        Rt,
        Pt,
        Et,
        zt,
        Ot,
        Nt,
        Bt,
        Ft,
        Vt,
        Gt,
        Wt = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return ((0, i.__extends)(e, t), e);
        })(l.A),
        Ut = Wt.prototype;
      ((Ut.on = Mt('on')), (Ut.off = Mt('off')));
      var Ht = (function (t) {
          function e(e, n, i) {
            var a = t.call(this, new X.d()) || this;
            ((a._chartsViews = []),
              (a._chartsMap = {}),
              (a._componentsViews = []),
              (a._componentsMap = {}),
              (a._pendingActions = []),
              (i = i || {}),
              (0, r.isString)(n) && (n = Kt[n]),
              (a._dom = e),
              i.ssr &&
                o.registerSSRDataGetter(function (t) {
                  var e = (0, T.z)(t),
                    n = e.dataIndex;
                  if (null != n) {
                    var i = (0, r.createHashMap)();
                    return (
                      i.set('series_index', e.seriesIndex),
                      i.set('data_index', n),
                      e.ssrType && i.set('ssr_type', e.ssrType),
                      i
                    );
                  }
                }));
            var l = (a._zr = o.init(e, {
              renderer: i.renderer || 'canvas',
              devicePixelRatio: i.devicePixelRatio,
              width: i.width,
              height: i.height,
              ssr: i.ssr,
              useDirtyRect: (0, r.retrieve2)(i.useDirtyRect, !1),
              useCoarsePointer: (0, r.retrieve2)(i.useCoarsePointer, 'auto'),
              pointerSize: i.pointerSize,
            }));
            ((a._ssr = i.ssr),
              (a._throttledZrFlush = (0, S.nF)((0, r.bind)(l.flush, l), 17)),
              (n = (0, r.clone)(n)) && (0, f.A)(n, !0),
              (a._theme = n),
              (a._locale = (0, nt.A$)(i.locale || nt.Lv)),
              (a._coordSysMgr = new h.A()));
            var c = (a._api = Bt(a));
            function u(t, e) {
              return t.__prio - e.__prio;
            }
            return (
              (0, s.A)(Qt, u),
              (0, s.A)(Xt, u),
              (a._scheduler = new j(a, c, Xt, Qt)),
              (a._messageCenter = new Wt()),
              a._initEvents(),
              (a.resize = (0, r.bind)(a.resize, a)),
              l.animation.on('frame', a._onframe, a),
              Pt(l, a),
              Et(l, a),
              (0, r.setAsPrimitive)(a),
              a
            );
          }
          return (
            (0, i.__extends)(e, t),
            (e.prototype._onframe = function () {
              if (!this._disposed) {
                Gt(this);
                var t = this._scheduler;
                if (this[yt]) {
                  var e = this[yt].silent;
                  this[mt] = !0;
                  try {
                    (wt(this), Ct.update.call(this, null, this[yt].updateParams));
                  } catch (t) {
                    throw ((this[mt] = !1), (this[yt] = null), t);
                  }
                  (this._zr.flush(),
                    (this[mt] = !1),
                    (this[yt] = null),
                    kt.call(this, e),
                    Rt.call(this, e));
                } else if (t.unfinished) {
                  var n = 1,
                    i = this._model,
                    o = this._api;
                  t.unfinished = !1;
                  do {
                    var r = +new Date();
                    (t.performSeriesTasks(i),
                      t.performDataProcessorTasks(i),
                      Dt(this, i),
                      t.performVisualTasks(i),
                      Nt(this, this._model, o, 'remain', {}),
                      (n -= +new Date() - r));
                  } while (n > 0 && t.unfinished);
                  t.unfinished || this._zr.flush();
                }
              }
            }),
            (e.prototype.getDom = function () {
              return this._dom;
            }),
            (e.prototype.getId = function () {
              return this.id;
            }),
            (e.prototype.getZr = function () {
              return this._zr;
            }),
            (e.prototype.isSSR = function () {
              return this._ssr;
            }),
            (e.prototype.setOption = function (t, e, n) {
              if (!this[mt])
                if (this._disposed) Jt(this.id);
                else {
                  var i, o, a;
                  if (
                    ((0, r.isObject)(e) &&
                      ((n = e.lazyUpdate),
                      (i = e.silent),
                      (o = e.replaceMerge),
                      (a = e.transition),
                      (e = e.notMerge)),
                    (this[mt] = !0),
                    !this._model || e)
                  ) {
                    var s = new d.A(this._api),
                      l = this._theme,
                      u = (this._model = new c.A());
                    ((u.scheduler = this._scheduler),
                      (u.ssr = this._ssr),
                      u.init(null, null, null, l, this._locale, s));
                  }
                  this._model.setOption(t, { replaceMerge: o }, $t);
                  var p = { seriesTransition: a, optionChanged: !0 };
                  if (n)
                    ((this[yt] = { silent: i, updateParams: p }),
                      (this[mt] = !1),
                      this.getZr().wakeUp());
                  else {
                    try {
                      (wt(this), Ct.update.call(this, null, p));
                    } catch (t) {
                      throw ((this[yt] = null), (this[mt] = !1), t);
                    }
                    (this._ssr || this._zr.flush(),
                      (this[yt] = null),
                      (this[mt] = !1),
                      kt.call(this, i),
                      Rt.call(this, i));
                  }
                }
            }),
            (e.prototype.setTheme = function () {
              (0, K.aT)('ECharts#setTheme() is DEPRECATED in ECharts 3.0');
            }),
            (e.prototype.getModel = function () {
              return this._model;
            }),
            (e.prototype.getOption = function () {
              return this._model && this._model.getOption();
            }),
            (e.prototype.getWidth = function () {
              return this._zr.getWidth();
            }),
            (e.prototype.getHeight = function () {
              return this._zr.getHeight();
            }),
            (e.prototype.getDevicePixelRatio = function () {
              return this._zr.painter.dpr || (a.A.hasGlobalWindow && window.devicePixelRatio) || 1;
            }),
            (e.prototype.getRenderedCanvas = function (t) {
              return this.renderToCanvas(t);
            }),
            (e.prototype.renderToCanvas = function (t) {
              return (
                (t = t || {}),
                this._zr.painter.getRenderedCanvas({
                  backgroundColor: t.backgroundColor || this._model.get('backgroundColor'),
                  pixelRatio: t.pixelRatio || this.getDevicePixelRatio(),
                })
              );
            }),
            (e.prototype.renderToSVGString = function (t) {
              return ((t = t || {}), this._zr.painter.renderToString({ useViewBox: t.useViewBox }));
            }),
            (e.prototype.getSvgDataURL = function () {
              if (a.A.svgSupported) {
                var t = this._zr,
                  e = t.storage.getDisplayList();
                return (
                  (0, r.each)(e, function (t) {
                    t.stopAnimation(null, !0);
                  }),
                  t.painter.toDataURL()
                );
              }
            }),
            (e.prototype.getDataURL = function (t) {
              if (!this._disposed) {
                var e = (t = t || {}).excludeComponents,
                  n = this._model,
                  i = [],
                  o = this;
                (0, r.each)(e, function (t) {
                  n.eachComponent({ mainType: t }, function (t) {
                    var e = o._componentsMap[t.__viewId];
                    e.group.ignore || (i.push(e), (e.group.ignore = !0));
                  });
                });
                var a =
                  'svg' === this._zr.painter.getType()
                    ? this.getSvgDataURL()
                    : this.renderToCanvas(t).toDataURL('image/' + ((t && t.type) || 'png'));
                return (
                  (0, r.each)(i, function (t) {
                    t.group.ignore = !1;
                  }),
                  a
                );
              }
              Jt(this.id);
            }),
            (e.prototype.getConnectedDataURL = function (t) {
              if (!this._disposed) {
                var e = 'svg' === t.type,
                  n = this.group,
                  i = Math.min,
                  a = Math.max,
                  s = 1 / 0;
                if (ne[n]) {
                  var l = s,
                    c = s,
                    u = -1 / 0,
                    p = -1 / 0,
                    h = [],
                    d = (t && t.pixelRatio) || this.getDevicePixelRatio();
                  (0, r.each)(ee, function (o, s) {
                    if (o.group === n) {
                      var d = e
                          ? o.getZr().painter.getSvgDom().innerHTML
                          : o.renderToCanvas((0, r.clone)(t)),
                        f = o.getDom().getBoundingClientRect();
                      ((l = i(f.left, l)),
                        (c = i(f.top, c)),
                        (u = a(f.right, u)),
                        (p = a(f.bottom, p)),
                        h.push({ dom: d, left: f.left, top: f.top }));
                    }
                  });
                  var f = (u *= d) - (l *= d),
                    g = (p *= d) - (c *= d),
                    m = at.yh.createCanvas(),
                    y = o.init(m, { renderer: e ? 'svg' : 'canvas' });
                  if ((y.resize({ width: f, height: g }), e)) {
                    var v = '';
                    return (
                      (0, r.each)(h, function (t) {
                        var e = t.left - l,
                          n = t.top - c;
                        v += '<g transform="translate(' + e + ',' + n + ')">' + t.dom + '</g>';
                      }),
                      (y.painter.getSvgRoot().innerHTML = v),
                      t.connectedBackgroundColor &&
                        y.painter.setBackgroundColor(t.connectedBackgroundColor),
                      y.refreshImmediately(),
                      y.painter.toDataURL()
                    );
                  }
                  return (
                    t.connectedBackgroundColor &&
                      y.add(
                        new x.A({
                          shape: { x: 0, y: 0, width: f, height: g },
                          style: { fill: t.connectedBackgroundColor },
                        }),
                      ),
                    (0, r.each)(h, function (t) {
                      var e = new _.Ay({
                        style: { x: t.left * d - l, y: t.top * d - c, image: t.dom },
                      });
                      y.add(e);
                    }),
                    y.refreshImmediately(),
                    m.toDataURL('image/' + ((t && t.type) || 'png'))
                  );
                }
                return this.getDataURL(t);
              }
              Jt(this.id);
            }),
            (e.prototype.convertToPixel = function (t, e) {
              return Lt(this, 'convertToPixel', t, e);
            }),
            (e.prototype.convertFromPixel = function (t, e) {
              return Lt(this, 'convertFromPixel', t, e);
            }),
            (e.prototype.containPixel = function (t, e) {
              if (!this._disposed) {
                var n,
                  i = this._model,
                  o = b._e(i, t);
                return (
                  (0, r.each)(
                    o,
                    function (t, i) {
                      i.indexOf('Models') >= 0 &&
                        (0, r.each)(
                          t,
                          function (t) {
                            var o = t.coordinateSystem;
                            if (o && o.containPoint) n = n || !!o.containPoint(e);
                            else if ('seriesModels' === i) {
                              var r = this._chartsMap[t.__viewId];
                              r && r.containPoint && (n = n || r.containPoint(e, t));
                            }
                          },
                          this,
                        );
                    },
                    this,
                  ),
                  !!n
                );
              }
              Jt(this.id);
            }),
            (e.prototype.getVisual = function (t, e) {
              var n = this._model,
                i = b._e(n, t, { defaultMainType: 'series' }),
                o = i.seriesModel.getData(),
                r = i.hasOwnProperty('dataIndexInside')
                  ? i.dataIndexInside
                  : i.hasOwnProperty('dataIndex')
                    ? o.indexOfRawIndex(i.dataIndex)
                    : null;
              return null != r ? (0, Q.Ez)(o, r, e) : (0, Q.rI)(o, e);
            }),
            (e.prototype.getViewOfComponentModel = function (t) {
              return this._componentsMap[t.__viewId];
            }),
            (e.prototype.getViewOfSeriesModel = function (t) {
              return this._chartsMap[t.__viewId];
            }),
            (e.prototype._initEvents = function () {
              var t = this;
              ((0, r.each)(jt, function (e) {
                var n = function (n) {
                  var i,
                    o = t.getModel(),
                    a = n.target;
                  if (
                    ('globalout' === e
                      ? (i = {})
                      : a &&
                        (0, it.R)(
                          a,
                          function (t) {
                            var e = (0, T.z)(t);
                            if (e && null != e.dataIndex) {
                              var n = e.dataModel || o.getSeriesByIndex(e.seriesIndex);
                              return (
                                (i = (n && n.getDataParams(e.dataIndex, e.dataType, a)) || {}),
                                !0
                              );
                            }
                            if (e.eventData) return ((i = (0, r.extend)({}, e.eventData)), !0);
                          },
                          !0,
                        ),
                    i)
                  ) {
                    var s = i.componentType,
                      l = i.componentIndex;
                    ('markLine' !== s && 'markPoint' !== s && 'markArea' !== s) ||
                      ((s = 'series'), (l = i.seriesIndex));
                    var c = s && null != l && o.getComponent(s, l),
                      u =
                        c &&
                        t['series' === c.mainType ? '_chartsMap' : '_componentsMap'][c.__viewId];
                    ((i.event = n),
                      (i.type = e),
                      (t._$eventProcessor.eventInfo = {
                        targetEl: a,
                        packedEvent: i,
                        model: c,
                        view: u,
                      }),
                      t.trigger(e, i));
                  }
                };
                ((n.zrEventfulCallAtLast = !0), t._zr.on(e, n, t));
              }),
                (0, r.each)(Yt, function (e, n) {
                  t._messageCenter.on(
                    n,
                    function (t) {
                      this.trigger(n, t);
                    },
                    t,
                  );
                }),
                (0, r.each)(['selectchanged'], function (e) {
                  t._messageCenter.on(
                    e,
                    function (t) {
                      this.trigger(e, t);
                    },
                    t,
                  );
                }),
                (0, tt.l)(this._messageCenter, this, this._api));
            }),
            (e.prototype.isDisposed = function () {
              return this._disposed;
            }),
            (e.prototype.clear = function () {
              this._disposed ? Jt(this.id) : this.setOption({ series: [] }, !0);
            }),
            (e.prototype.dispose = function () {
              if (this._disposed) Jt(this.id);
              else {
                ((this._disposed = !0), this.getDom() && b.Bq(this.getDom(), re, ''));
                var t = this,
                  e = t._api,
                  n = t._model;
                ((0, r.each)(t._componentsViews, function (t) {
                  t.dispose(n, e);
                }),
                  (0, r.each)(t._chartsViews, function (t) {
                    t.dispose(n, e);
                  }),
                  t._zr.dispose(),
                  (t._dom =
                    t._model =
                    t._chartsMap =
                    t._componentsMap =
                    t._chartsViews =
                    t._componentsViews =
                    t._scheduler =
                    t._api =
                    t._zr =
                    t._throttledZrFlush =
                    t._theme =
                    t._coordSysMgr =
                    t._messageCenter =
                      null),
                  delete ee[t.id]);
              }
            }),
            (e.prototype.resize = function (t) {
              if (!this[mt])
                if (this._disposed) Jt(this.id);
                else {
                  this._zr.resize(t);
                  var e = this._model;
                  if ((this._loadingFX && this._loadingFX.resize(), e)) {
                    var n = e.resetOption('media'),
                      i = t && t.silent;
                    (this[yt] && (null == i && (i = this[yt].silent), (n = !0), (this[yt] = null)),
                      (this[mt] = !0));
                    try {
                      (n && wt(this),
                        Ct.update.call(this, {
                          type: 'resize',
                          animation: (0, r.extend)({ duration: 0 }, t && t.animation),
                        }));
                    } catch (t) {
                      throw ((this[mt] = !1), t);
                    }
                    ((this[mt] = !1), kt.call(this, i), Rt.call(this, i));
                  }
                }
            }),
            (e.prototype.showLoading = function (t, e) {
              if (this._disposed) Jt(this.id);
              else if (
                ((0, r.isObject)(t) && ((e = t), (t = '')),
                (t = t || 'default'),
                this.hideLoading(),
                te[t])
              ) {
                var n = te[t](this._api, e),
                  i = this._zr;
                ((this._loadingFX = n), i.add(n));
              }
            }),
            (e.prototype.hideLoading = function () {
              this._disposed
                ? Jt(this.id)
                : (this._loadingFX && this._zr.remove(this._loadingFX), (this._loadingFX = null));
            }),
            (e.prototype.makeActionFromEvent = function (t) {
              var e = (0, r.extend)({}, t);
              return ((e.type = Yt[t.type]), e);
            }),
            (e.prototype.dispatchAction = function (t, e) {
              if (this._disposed) Jt(this.id);
              else if (((0, r.isObject)(e) || (e = { silent: !!e }), qt[t.type] && this._model))
                if (this[mt]) this._pendingActions.push(t);
                else {
                  var n = e.silent;
                  It.call(this, t, n);
                  var i = e.flush;
                  (i
                    ? this._zr.flush()
                    : !1 !== i && a.A.browser.weChat && this._throttledZrFlush(),
                    kt.call(this, n),
                    Rt.call(this, n));
                }
            }),
            (e.prototype.updateLabelLayout = function () {
              rt.trigger('series:layoutlabels', this._model, this._api, { updatedSeries: [] });
            }),
            (e.prototype.appendData = function (t) {
              if (this._disposed) Jt(this.id);
              else {
                var e = t.seriesIndex;
                (this.getModel().getSeriesByIndex(e).appendData(t),
                  (this._scheduler.unfinished = !0),
                  this.getZr().wakeUp());
              }
            }),
            (e.internalField = (function () {
              function t(t) {
                (t.clearColorPalette(),
                  t.eachSeries(function (t) {
                    t.clearColorPalette();
                  }));
              }
              function e(t) {
                for (var e = [], n = t.currentStates, i = 0; i < n.length; i++) {
                  var o = n[i];
                  'emphasis' !== o && 'blur' !== o && 'select' !== o && e.push(o);
                }
                (t.selected && t.states.select && e.push('select'),
                  t.hoverState === w.e3 && t.states.emphasis
                    ? e.push('emphasis')
                    : t.hoverState === w.zX && t.states.blur && e.push('blur'),
                  t.useStates(e));
              }
              function n(t, e) {
                if (!t.preventAutoZ) {
                  var n = t.get('z') || 0,
                    i = t.get('zlevel') || 0;
                  e.eachRendered(function (t) {
                    return (o(t, n, i, -1 / 0), !0);
                  });
                }
              }
              function o(t, e, n, i) {
                var r = t.getTextContent(),
                  a = t.getTextGuideLine();
                if (t.isGroup)
                  for (var s = t.childrenRef(), l = 0; l < s.length; l++)
                    i = Math.max(o(s[l], e, n, i), i);
                else ((t.z = e), (t.zlevel = n), (i = Math.max(t.z2, i)));
                if ((r && ((r.z = e), (r.zlevel = n), isFinite(i) && (r.z2 = i + 2)), a)) {
                  var c = t.textGuideLineConfig;
                  ((a.z = e),
                    (a.zlevel = n),
                    isFinite(i) && (a.z2 = i + (c && c.showAbove ? 1 : -1)));
                }
                return i;
              }
              function l(t, e) {
                e.eachRendered(function (t) {
                  if (!A.LR(t)) {
                    var e = t.getTextContent(),
                      n = t.getTextGuideLine();
                    (t.stateTransition && (t.stateTransition = null),
                      e && e.stateTransition && (e.stateTransition = null),
                      n && n.stateTransition && (n.stateTransition = null),
                      t.hasState()
                        ? ((t.prevStates = t.currentStates), t.clearStates())
                        : t.prevStates && (t.prevStates = null));
                  }
                });
              }
              function c(t, n) {
                var i = t.getModel('stateAnimation'),
                  o = t.isAnimationEnabled(),
                  r = i.get('duration'),
                  a =
                    r > 0 ? { duration: r, delay: i.get('delay'), easing: i.get('easing') } : null;
                n.eachRendered(function (t) {
                  if (t.states && t.states.emphasis) {
                    if (A.LR(t)) return;
                    if ((t instanceof M.Ay && (0, w.fz)(t), t.__dirty)) {
                      var n = t.prevStates;
                      n && t.useStates(n);
                    }
                    if (o) {
                      t.stateTransition = a;
                      var i = t.getTextContent(),
                        r = t.getTextGuideLine();
                      (i && (i.stateTransition = a), r && (r.stateTransition = a));
                    }
                    t.__dirty && e(t);
                  }
                });
              }
              ((wt = function (t) {
                var e = t._scheduler;
                (e.restorePipelines(t._model),
                  e.prepareStageTasks(),
                  bt(t, !0),
                  bt(t, !1),
                  e.plan());
              }),
                (bt = function (t, e) {
                  for (
                    var n = t._model,
                      i = t._scheduler,
                      o = e ? t._componentsViews : t._chartsViews,
                      r = e ? t._componentsMap : t._chartsMap,
                      a = t._zr,
                      s = t._api,
                      l = 0;
                    l < o.length;
                    l++
                  )
                    o[l].__alive = !1;
                  function c(t) {
                    var l = t.__requireNewView;
                    t.__requireNewView = !1;
                    var c = '_ec_' + t.id + '_' + t.type,
                      u = !l && r[c];
                    if (!u) {
                      var p = (0, Y.CC)(t.type);
                      ((u = new (e ? y.A.getClass(p.main, p.sub) : v.A.getClass(p.sub))()).init(
                        n,
                        s,
                      ),
                        (r[c] = u),
                        o.push(u),
                        a.add(u.group));
                    }
                    ((t.__viewId = u.__id = c),
                      (u.__alive = !0),
                      (u.__model = t),
                      (u.group.__ecComponentInfo = {
                        mainType: t.mainType,
                        index: t.componentIndex,
                      }),
                      !e && i.prepareView(u, t, n, s));
                  }
                  for (
                    e
                      ? n.eachComponent(function (t, e) {
                          'series' !== t && c(e);
                        })
                      : n.eachSeries(c),
                      l = 0;
                    l < o.length;
                  ) {
                    var u = o[l];
                    u.__alive
                      ? l++
                      : (!e && u.renderTask.dispose(),
                        a.remove(u.group),
                        u.dispose(n, s),
                        o.splice(l, 1),
                        r[u.__id] === u && delete r[u.__id],
                        (u.__id = u.group.__ecComponentInfo = null));
                  }
                }),
                (St = function (t, e, n, i, o) {
                  var a = t._model;
                  if ((a.setUpdatePayload(n), i)) {
                    var s = {};
                    ((s[i + 'Id'] = n[i + 'Id']),
                      (s[i + 'Index'] = n[i + 'Index']),
                      (s[i + 'Name'] = n[i + 'Name']));
                    var l = { mainType: i, query: s };
                    o && (l.subType = o);
                    var c,
                      u = n.excludeSeriesId;
                    (null != u &&
                      ((c = (0, r.createHashMap)()),
                      (0, r.each)(b.qB(u), function (t) {
                        var e = b.vS(t, null);
                        null != e && c.set(e, !0);
                      })),
                      a &&
                        a.eachComponent(
                          l,
                          function (e) {
                            if (!c || null == c.get(e.id))
                              if ((0, w.T$)(n))
                                if (e instanceof m.A)
                                  n.type !== w.h5 ||
                                    n.notBlur ||
                                    e.get(['emphasis', 'disabled']) ||
                                    (0, w.lV)(e, n, t._api);
                                else {
                                  var i = (0, w.Tl)(e.mainType, e.componentIndex, n.name, t._api),
                                    o = i.focusSelf,
                                    a = i.dispatchers;
                                  (n.type === w.h5 &&
                                    o &&
                                    !n.notBlur &&
                                    (0, w.Du)(e.mainType, e.componentIndex, t._api),
                                    a &&
                                      (0, r.each)(a, function (t) {
                                        n.type === w.h5 ? (0, w.HY)(t) : (0, w.SD)(t);
                                      }));
                                }
                              else
                                (0, w.Lx)(n) &&
                                  e instanceof m.A &&
                                  ((0, w.t6)(e, n, t._api), (0, w.jA)(e), Vt(t));
                          },
                          t,
                        ),
                      a &&
                        a.eachComponent(
                          l,
                          function (e) {
                            (c && null != c.get(e.id)) ||
                              p(t['series' === i ? '_chartsMap' : '_componentsMap'][e.__viewId]);
                          },
                          t,
                        ));
                  } else (0, r.each)([].concat(t._componentsViews).concat(t._chartsViews), p);
                  function p(i) {
                    i && i.__alive && i[e] && i[e](i.__model, a, t._api, n);
                  }
                }),
                (Ct = {
                  prepareAndUpdate: function (t) {
                    (wt(this), Ct.update.call(this, t, { optionChanged: null != t.newOption }));
                  },
                  update: function (e, n) {
                    var i = this._model,
                      o = this._api,
                      r = this._zr,
                      a = this._coordSysMgr,
                      s = this._scheduler;
                    if (i) {
                      (i.setUpdatePayload(e),
                        s.restoreData(i, e),
                        s.performSeriesTasks(i),
                        a.create(i, o),
                        s.performDataProcessorTasks(i, e),
                        Dt(this, i),
                        a.update(i, o),
                        t(i),
                        s.performVisualTasks(i, e),
                        zt(this, i, o, e, n));
                      var l = i.get('backgroundColor') || 'transparent',
                        c = i.get('darkMode');
                      (r.setBackgroundColor(l),
                        null != c && 'auto' !== c && r.setDarkMode(c),
                        rt.trigger('afterupdate', i, o));
                    }
                  },
                  updateTransform: function (e) {
                    var n = this,
                      i = this._model,
                      o = this._api;
                    if (i) {
                      i.setUpdatePayload(e);
                      var a = [];
                      i.eachComponent(function (t, r) {
                        if ('series' !== t) {
                          var s = n.getViewOfComponentModel(r);
                          if (s && s.__alive)
                            if (s.updateTransform) {
                              var l = s.updateTransform(r, i, o, e);
                              l && l.update && a.push(s);
                            } else a.push(s);
                        }
                      });
                      var s = (0, r.createHashMap)();
                      (i.eachSeries(function (t) {
                        var r = n._chartsMap[t.__viewId];
                        if (r.updateTransform) {
                          var a = r.updateTransform(t, i, o, e);
                          a && a.update && s.set(t.uid, 1);
                        } else s.set(t.uid, 1);
                      }),
                        t(i),
                        this._scheduler.performVisualTasks(i, e, { setDirty: !0, dirtyMap: s }),
                        Nt(this, i, o, e, {}, s),
                        rt.trigger('afterupdate', i, o));
                    }
                  },
                  updateView: function (e) {
                    var n = this._model;
                    n &&
                      (n.setUpdatePayload(e),
                      v.A.markUpdateMethod(e, 'updateView'),
                      t(n),
                      this._scheduler.performVisualTasks(n, e, { setDirty: !0 }),
                      zt(this, n, this._api, e, {}),
                      rt.trigger('afterupdate', n, this._api));
                  },
                  updateVisual: function (e) {
                    var n = this,
                      i = this._model;
                    i &&
                      (i.setUpdatePayload(e),
                      i.eachSeries(function (t) {
                        t.getData().clearAllVisual();
                      }),
                      v.A.markUpdateMethod(e, 'updateVisual'),
                      t(i),
                      this._scheduler.performVisualTasks(i, e, {
                        visualType: 'visual',
                        setDirty: !0,
                      }),
                      i.eachComponent(function (t, o) {
                        if ('series' !== t) {
                          var r = n.getViewOfComponentModel(o);
                          r && r.__alive && r.updateVisual(o, i, n._api, e);
                        }
                      }),
                      i.eachSeries(function (t) {
                        n._chartsMap[t.__viewId].updateVisual(t, i, n._api, e);
                      }),
                      rt.trigger('afterupdate', i, this._api));
                  },
                  updateLayout: function (t) {
                    Ct.update.call(this, t);
                  },
                }),
                (Lt = function (t, e, n, i) {
                  if (t._disposed) Jt(t.id);
                  else
                    for (
                      var o,
                        r = t._model,
                        a = t._coordSysMgr.getCoordinateSystems(),
                        s = b._e(r, n),
                        l = 0;
                      l < a.length;
                      l++
                    ) {
                      var c = a[l];
                      if (c[e] && null != (o = c[e](r, s, i))) return o;
                    }
                }),
                (Dt = function (t, e) {
                  var n = t._chartsMap,
                    i = t._scheduler;
                  e.eachSeries(function (t) {
                    i.updateStreamModes(t, n[t.__viewId]);
                  });
                }),
                (It = function (t, e) {
                  var n = this,
                    i = this.getModel(),
                    o = t.type,
                    a = t.escapeConnect,
                    s = qt[o],
                    l = s.actionInfo,
                    c = (l.update || 'update').split(':'),
                    u = c.pop(),
                    p = null != c[0] && (0, Y.CC)(c[0]);
                  this[mt] = !0;
                  var h = [t],
                    d = !1;
                  t.batch &&
                    ((d = !0),
                    (h = (0, r.map)(t.batch, function (e) {
                      return (((e = (0, r.defaults)((0, r.extend)({}, e), t)).batch = null), e);
                    })));
                  var f,
                    g = [],
                    m = (0, w.Lx)(t),
                    y = (0, w.T$)(t);
                  if (
                    (y && (0, w.qR)(this._api),
                    (0, r.each)(h, function (e) {
                      if (
                        (((f = (f = s.action(e, n._model, n._api)) || (0, r.extend)({}, e)).type =
                          l.event || f.type),
                        g.push(f),
                        y)
                      ) {
                        var i = b.HB(t),
                          o = i.queryOptionMap,
                          a = i.mainTypeSpecified ? o.keys()[0] : 'series';
                        (St(n, u, e, a), Vt(n));
                      } else m ? (St(n, u, e, 'series'), Vt(n)) : p && St(n, u, e, p.main, p.sub);
                    }),
                    'none' !== u && !y && !m && !p)
                  )
                    try {
                      this[yt]
                        ? (wt(this), Ct.update.call(this, t), (this[yt] = null))
                        : Ct[u].call(this, t);
                    } catch (t) {
                      throw ((this[mt] = !1), t);
                    }
                  if (
                    ((f = d ? { type: l.event || o, escapeConnect: a, batch: g } : g[0]),
                    (this[mt] = !1),
                    !e)
                  ) {
                    var v = this._messageCenter;
                    if ((v.trigger(f.type, f), m)) {
                      var x = {
                        type: 'selectchanged',
                        escapeConnect: a,
                        selected: (0, w.mc)(i),
                        isFromClick: t.isFromClick || !1,
                        fromAction: t.type,
                        fromActionPayload: t,
                      };
                      v.trigger(x.type, x);
                    }
                  }
                }),
                (kt = function (t) {
                  for (var e = this._pendingActions; e.length;) {
                    var n = e.shift();
                    It.call(this, n, t);
                  }
                }),
                (Rt = function (t) {
                  !t && this.trigger('updated');
                }),
                (Pt = function (t, e) {
                  t.on('rendered', function (n) {
                    (e.trigger('rendered', n),
                      !t.animation.isFinished() ||
                        e[yt] ||
                        e._scheduler.unfinished ||
                        e._pendingActions.length ||
                        e.trigger('finished'));
                  });
                }),
                (Et = function (t, e) {
                  t.on('mouseover', function (t) {
                    var n = t.target,
                      i = (0, it.R)(n, w.u6);
                    i && ((0, w._m)(i, t, e._api), Vt(e));
                  })
                    .on('mouseout', function (t) {
                      var n = t.target,
                        i = (0, it.R)(n, w.u6);
                      i && ((0, w.Iz)(i, t, e._api), Vt(e));
                    })
                    .on('click', function (t) {
                      var n = t.target,
                        i = (0, it.R)(
                          n,
                          function (t) {
                            return null != (0, T.z)(t).dataIndex;
                          },
                          !0,
                        );
                      if (i) {
                        var o = i.selected ? 'unselect' : 'select',
                          r = (0, T.z)(i);
                        e._api.dispatchAction({
                          type: o,
                          dataType: r.dataType,
                          dataIndexInside: r.dataIndex,
                          seriesIndex: r.seriesIndex,
                          isFromClick: !0,
                        });
                      }
                    });
                }),
                (zt = function (t, e, n, i, o) {
                  (!(function (t) {
                    var e = [],
                      n = [],
                      i = !1;
                    if (
                      (t.eachComponent(function (t, o) {
                        var r = o.get('zlevel') || 0,
                          a = o.get('z') || 0,
                          s = o.getZLevelKey();
                        ((i = i || !!s),
                          ('series' === t ? n : e).push({
                            zlevel: r,
                            z: a,
                            idx: o.componentIndex,
                            type: t,
                            key: s,
                          }));
                      }),
                      i)
                    ) {
                      var o,
                        a,
                        l = e.concat(n);
                      ((0, s.A)(l, function (t, e) {
                        return t.zlevel === e.zlevel ? t.z - e.z : t.zlevel - e.zlevel;
                      }),
                        (0, r.each)(l, function (e) {
                          var n = t.getComponent(e.type, e.idx),
                            i = e.zlevel,
                            r = e.key;
                          (null != o && (i = Math.max(o, i)),
                            r
                              ? (i === o && r !== a && i++, (a = r))
                              : a && (i === o && i++, (a = '')),
                            (o = i),
                            n.setZLevel(i));
                        }));
                    }
                  })(e),
                    Ot(t, e, n, i, o),
                    (0, r.each)(t._chartsViews, function (t) {
                      t.__alive = !1;
                    }),
                    Nt(t, e, n, i, o),
                    (0, r.each)(t._chartsViews, function (t) {
                      t.__alive || t.remove(e, n);
                    }));
                }),
                (Ot = function (t, e, i, o, a, s) {
                  (0, r.each)(s || t._componentsViews, function (t) {
                    var r = t.__model;
                    (l(0, t), t.render(r, e, i, o), n(r, t), c(r, t));
                  });
                }),
                (Nt = function (t, e, i, o, s, u) {
                  var p = t._scheduler;
                  ((s = (0, r.extend)(s || {}, { updatedSeries: e.getSeries() })),
                    rt.trigger('series:beforeupdate', e, i, s));
                  var h = !1;
                  (e.eachSeries(function (e) {
                    var n = t._chartsMap[e.__viewId];
                    n.__alive = !0;
                    var i = n.renderTask;
                    (p.updatePayload(i, o),
                      l(0, n),
                      u && u.get(e.uid) && i.dirty(),
                      i.perform(p.getPerformArgs(i)) && (h = !0),
                      (n.group.silent = !!e.get('silent')),
                      (function (t, e) {
                        var n = t.get('blendMode') || null;
                        e.eachRendered(function (t) {
                          t.isGroup || (t.style.blend = n);
                        });
                      })(e, n),
                      (0, w.jA)(e));
                  }),
                    (p.unfinished = h || p.unfinished),
                    rt.trigger('series:layoutlabels', e, i, s),
                    rt.trigger('series:transition', e, i, s),
                    e.eachSeries(function (e) {
                      var i = t._chartsMap[e.__viewId];
                      (n(e, i), c(e, i));
                    }),
                    (function (t, e) {
                      var n = t._zr.storage,
                        i = 0;
                      (n.traverse(function (t) {
                        t.isGroup || i++;
                      }),
                        i > e.get('hoverLayerThreshold') &&
                          !a.A.node &&
                          !a.A.worker &&
                          e.eachSeries(function (e) {
                            if (!e.preventUsingHoverLayer) {
                              var n = t._chartsMap[e.__viewId];
                              n.__alive &&
                                n.eachRendered(function (t) {
                                  t.states.emphasis && (t.states.emphasis.hoverLayer = !0);
                                });
                            }
                          }));
                    })(t, e),
                    rt.trigger('series:afterupdate', e, i, s));
                }),
                (Vt = function (t) {
                  ((t[vt] = !0), t.getZr().wakeUp());
                }),
                (Gt = function (t) {
                  t[vt] &&
                    (t.getZr().storage.traverse(function (t) {
                      A.LR(t) || e(t);
                    }),
                    (t[vt] = !1));
                }),
                (Bt = function (t) {
                  return new ((function (e) {
                    function n() {
                      return (null !== e && e.apply(this, arguments)) || this;
                    }
                    return (
                      (0, i.__extends)(n, e),
                      (n.prototype.getCoordinateSystems = function () {
                        return t._coordSysMgr.getCoordinateSystems();
                      }),
                      (n.prototype.getComponentByElement = function (e) {
                        for (; e;) {
                          var n = e.__ecComponentInfo;
                          if (null != n) return t._model.getComponent(n.mainType, n.index);
                          e = e.parent;
                        }
                      }),
                      (n.prototype.enterEmphasis = function (e, n) {
                        ((0, w.HY)(e, n), Vt(t));
                      }),
                      (n.prototype.leaveEmphasis = function (e, n) {
                        ((0, w.SD)(e, n), Vt(t));
                      }),
                      (n.prototype.enterBlur = function (e) {
                        ((0, w.QX)(e), Vt(t));
                      }),
                      (n.prototype.leaveBlur = function (e) {
                        ((0, w.JC)(e), Vt(t));
                      }),
                      (n.prototype.enterSelect = function (e) {
                        ((0, w.JI)(e), Vt(t));
                      }),
                      (n.prototype.leaveSelect = function (e) {
                        ((0, w.gd)(e), Vt(t));
                      }),
                      (n.prototype.getModel = function () {
                        return t.getModel();
                      }),
                      (n.prototype.getViewOfComponentModel = function (e) {
                        return t.getViewOfComponentModel(e);
                      }),
                      (n.prototype.getViewOfSeriesModel = function (e) {
                        return t.getViewOfSeriesModel(e);
                      }),
                      n
                    );
                  })(p))(t);
                }),
                (Ft = function (t) {
                  function e(t, e) {
                    for (var n = 0; n < t.length; n++) t[n][_t] = e;
                  }
                  (0, r.each)(Yt, function (n, i) {
                    t._messageCenter.on(i, function (n) {
                      if (ne[t.group] && 0 !== t[_t]) {
                        if (n && n.escapeConnect) return;
                        var i = t.makeActionFromEvent(n),
                          o = [];
                        ((0, r.each)(ee, function (e) {
                          e !== t && e.group === t.group && o.push(e);
                        }),
                          e(o, 0),
                          (0, r.each)(o, function (t) {
                            1 !== t[_t] && t.dispatchAction(i);
                          }),
                          e(o, 2));
                      }
                    });
                  });
                }));
            })()),
            e
          );
        })(l.A),
        Zt = Ht.prototype;
      ((Zt.on = At('on')),
        (Zt.off = At('off')),
        (Zt.one = function (t, e, n) {
          var i = this;
          ((0, K.aT)('ECharts#one is deprecated.'),
            this.on.call(
              this,
              t,
              function n() {
                for (var o = [], r = 0; r < arguments.length; r++) o[r] = arguments[r];
                (e && e.apply && e.apply(this, o), i.off(t, n));
              },
              n,
            ));
        }));
      var jt = [
        'click',
        'dblclick',
        'mouseover',
        'mouseout',
        'mousemove',
        'mousedown',
        'mouseup',
        'globalout',
        'contextmenu',
      ];
      function Jt(t) {}
      var qt = {},
        Yt = {},
        Xt = [],
        $t = [],
        Qt = [],
        Kt = {},
        te = {},
        ee = {},
        ne = {},
        ie = +new Date() - 0,
        oe = +new Date() - 0,
        re = '_echarts_instance_';
      function ae(t, e, n) {
        var i = !(n && n.ssr);
        if (i) {
          var o = pe(t);
          if (o) return o;
        }
        var r = new Ht(t, e, n);
        return (
          (r.id = 'ec_' + ie++),
          (ee[r.id] = r),
          i && b.Bq(t, re, r.id),
          Ft(r),
          rt.trigger('afterinit', r),
          r
        );
      }
      function se(t) {
        if ((0, r.isArray)(t)) {
          var e = t;
          ((t = null),
            (0, r.each)(e, function (e) {
              null != e.group && (t = e.group);
            }),
            (t = t || 'g_' + oe++),
            (0, r.each)(e, function (e) {
              e.group = t;
            }));
        }
        return ((ne[t] = !0), t);
      }
      function le(t) {
        ne[t] = !1;
      }
      var ce = le;
      function ue(t) {
        ((0, r.isString)(t) ? (t = ee[t]) : t instanceof Ht || (t = pe(t)),
          t instanceof Ht && !t.isDisposed() && t.dispose());
      }
      function pe(t) {
        return ee[b.D$(t, re)];
      }
      function he(t) {
        return ee[t];
      }
      function de(t, e) {
        Kt[t] = e;
      }
      function fe(t) {
        (0, r.indexOf)($t, t) < 0 && $t.push(t);
      }
      function ge(t, e) {
        be(Xt, t, e, ut);
      }
      function me(t) {
        ve('afterinit', t);
      }
      function ye(t) {
        ve('afterupdate', t);
      }
      function ve(t, e) {
        rt.on(t, e);
      }
      function xe(t, e, n) {
        (0, r.isFunction)(e) && ((n = e), (e = ''));
        var i = (0, r.isObject)(t) ? t.type : [t, (t = { event: e })][0];
        ((t.event = (t.event || i).toLowerCase()),
          (e = t.event),
          Yt[e] ||
            ((0, r.assert)(xt.test(i) && xt.test(e)),
            qt[i] || (qt[i] = { action: n, actionInfo: t }),
            (Yt[e] = i)));
      }
      function _e(t, e) {
        h.A.register(t, e);
      }
      function Ae(t) {
        var e = h.A.get(t);
        if (e) return e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice();
      }
      function Me(t, e) {
        be(Qt, t, e, pt, 'layout');
      }
      function Te(t, e) {
        be(Qt, t, e, dt, 'visual');
      }
      var we = [];
      function be(t, e, n, i, o) {
        if (
          (((0, r.isFunction)(e) || (0, r.isObject)(e)) && ((n = e), (e = i)),
          !((0, r.indexOf)(we, n) >= 0))
        ) {
          we.push(n);
          var a = j.wrapStageHandler(n, o);
          ((a.__prio = e), (a.__raw = n), t.push(a));
        }
      }
      function Se(t, e) {
        te[t] = e;
      }
      function Ce(t) {
        (0, at.Gs)({ createCanvas: t });
      }
      function Le(t, e, n) {
        var i = (0, st.v)('registerMap');
        i && i(t, e, n);
      }
      function De(t) {
        var e = (0, st.v)('getMap');
        return e && e(t);
      }
      var Ie = et.v5;
      (Te(ht, C.mK),
        Te(ft, C.HG),
        Te(ft, C.EY),
        Te(ht, $.P),
        Te(ft, $.e),
        Te(7e3, ot.A),
        fe(f.A),
        ge(900, g.A),
        Se('default', L.A),
        xe({ type: w.h5, event: w.h5, update: w.h5 }, r.noop),
        xe({ type: w.PW, event: w.PW, update: w.PW }, r.noop),
        xe({ type: w.Lv, event: w.Lv, update: w.Lv }, r.noop),
        xe({ type: w.U2, event: w.U2, update: w.U2 }, r.noop),
        xe({ type: w.Q6, event: w.Q6, update: w.Q6 }, r.noop),
        de('light', J.A),
        de('dark', q.A));
      var ke = {};
    },
    813976: (t, e, n) => {
      n.d(e, { m: () => o, v: () => r });
      var i = {};
      function o(t, e) {
        i[t] = e;
      }
      function r(t) {
        return i[t];
      }
    },
    253080: (t, e, n) => {
      n.d(e, { A$: () => g, A4: () => m, E: () => f, Lv: () => d, pr: () => y });
      var i = n(143172),
        o = n(738123),
        r = n(645764),
        a = n(723073),
        s = n(498026),
        l = 'ZH',
        c = 'EN',
        u = c,
        p = {},
        h = {},
        d =
          o.A.domSupported &&
          (document.documentElement.lang || navigator.language || navigator.browserLanguage || u)
            .toUpperCase()
            .indexOf(l) > -1
            ? l
            : u;
      function f(t, e) {
        ((t = t.toUpperCase()), (h[t] = new i.A(e)), (p[t] = e));
      }
      function g(t) {
        if ((0, s.isString)(t)) {
          var e = p[t.toUpperCase()] || {};
          return t === l || t === c
            ? (0, s.clone)(e)
            : (0, s.merge)((0, s.clone)(e), (0, s.clone)(p[u]), !1);
        }
        return (0, s.merge)((0, s.clone)(t), (0, s.clone)(p[u]), !1);
      }
      function m(t) {
        return h[t];
      }
      function y() {
        return h[u];
      }
      (f(c, r.A), f(l, a.A));
    },
    549431: (t, e, n) => {
      n.d(e, { U: () => o });
      var i = n(498026);
      function o(t) {
        return new r(t);
      }
      var r = (function () {
          function t(t) {
            ((t = t || {}),
              (this._reset = t.reset),
              (this._plan = t.plan),
              (this._count = t.count),
              (this._onDirty = t.onDirty),
              (this._dirty = !0));
          }
          return (
            (t.prototype.perform = function (t) {
              var e,
                n = this._upstream,
                o = t && t.skip;
              if (this._dirty && n) {
                var r = this.context;
                r.data = r.outputData = n.context.outputData;
              }
              (this.__pipeline && (this.__pipeline.currentTask = this),
                this._plan && !o && (e = this._plan(this.context)));
              var a,
                s = p(this._modBy),
                l = this._modDataCount || 0,
                c = p(t && t.modBy),
                u = (t && t.modDataCount) || 0;
              function p(t) {
                return (!(t >= 1) && (t = 1), t);
              }
              ((s === c && l === u) || (e = 'reset'),
                (this._dirty || 'reset' === e) && ((this._dirty = !1), (a = this._doReset(o))),
                (this._modBy = c),
                (this._modDataCount = u));
              var h = t && t.step;
              if (
                ((this._dueEnd = n
                  ? n._outputDueEnd
                  : this._count
                    ? this._count(this.context)
                    : 1 / 0),
                this._progress)
              ) {
                var d = this._dueIndex,
                  f = Math.min(null != h ? this._dueIndex + h : 1 / 0, this._dueEnd);
                if (!o && (a || d < f)) {
                  var g = this._progress;
                  if ((0, i.isArray)(g))
                    for (var m = 0; m < g.length; m++) this._doProgress(g[m], d, f, c, u);
                  else this._doProgress(g, d, f, c, u);
                }
                this._dueIndex = f;
                var y = null != this._settedOutputEnd ? this._settedOutputEnd : f;
                this._outputDueEnd = y;
              } else
                this._dueIndex = this._outputDueEnd =
                  null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
              return this.unfinished();
            }),
            (t.prototype.dirty = function () {
              ((this._dirty = !0), this._onDirty && this._onDirty(this.context));
            }),
            (t.prototype._doProgress = function (t, e, n, i, o) {
              (a.reset(e, n, i, o),
                (this._callingProgress = t),
                this._callingProgress(
                  { start: e, end: n, count: n - e, next: a.next },
                  this.context,
                ));
            }),
            (t.prototype._doReset = function (t) {
              var e, n;
              ((this._dueIndex = this._outputDueEnd = this._dueEnd = 0),
                (this._settedOutputEnd = null),
                !t &&
                  this._reset &&
                  ((e = this._reset(this.context)) &&
                    e.progress &&
                    ((n = e.forceFirstProgress), (e = e.progress)),
                  (0, i.isArray)(e) && !e.length && (e = null)),
                (this._progress = e),
                (this._modBy = this._modDataCount = null));
              var o = this._downstream;
              return (o && o.dirty(), n);
            }),
            (t.prototype.unfinished = function () {
              return this._progress && this._dueIndex < this._dueEnd;
            }),
            (t.prototype.pipe = function (t) {
              (this._downstream !== t || this._dirty) &&
                ((this._downstream = t), (t._upstream = this), t.dirty());
            }),
            (t.prototype.dispose = function () {
              this._disposed ||
                (this._upstream && (this._upstream._downstream = null),
                this._downstream && (this._downstream._upstream = null),
                (this._dirty = !1),
                (this._disposed = !0));
            }),
            (t.prototype.getUpstream = function () {
              return this._upstream;
            }),
            (t.prototype.getDownstream = function () {
              return this._downstream;
            }),
            (t.prototype.setOutputEnd = function (t) {
              this._outputDueEnd = this._settedOutputEnd = t;
            }),
            t
          );
        })(),
        a = (function () {
          var t,
            e,
            n,
            i,
            o,
            r = {
              reset: function (l, c, u, p) {
                ((e = l),
                  (t = c),
                  (n = u),
                  (i = p),
                  (o = Math.ceil(i / n)),
                  (r.next = n > 1 && i > 0 ? s : a));
              },
            };
          return r;
          function a() {
            return e < t ? e++ : null;
          }
          function s() {
            var r = (e % o) * n + Math.ceil(e / o),
              a = e >= t ? null : r < i ? r : e;
            return (e++, a);
          }
        })();
    },
  },
]);
