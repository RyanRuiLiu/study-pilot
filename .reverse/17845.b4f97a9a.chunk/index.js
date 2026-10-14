'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [17845],
  {
    814403: (e, t, n) => {
      n.d(t, { A: () => Q });
      var o = n(15215),
        i = n(498026),
        r = n(757861),
        a = n(843870),
        s = n(830010),
        l = n(543199),
        u = n(39195),
        c = n(252505),
        p = n(923868),
        d = n(716563),
        g = !0,
        h = Math.min,
        f = Math.max,
        m = Math.pow,
        y = 'globalPan',
        v = { w: [0, 0], e: [0, 1], n: [1, 0], s: [1, 1] },
        x = { w: 'ew', e: 'ew', n: 'ns', s: 'ns', ne: 'nesw', sw: 'nesw', nw: 'nwse', se: 'nwse' },
        _ = {
          brushStyle: { lineWidth: 2, stroke: 'rgba(210,219,238,0.3)', fill: '#D2DBEE' },
          transformable: !0,
          brushMode: 'single',
          removeOnClick: !1,
        },
        b = 0,
        S = (function (e) {
          function t(t) {
            var n = e.call(this) || this;
            return (
              (n._track = []),
              (n._covers = []),
              (n._handlers = {}),
              (n._zr = t),
              (n.group = new a.A()),
              (n._uid = 'brushController_' + b++),
              (0, i.each)(
                q,
                function (e, t) {
                  this._handlers[t] = (0, i.bind)(e, this);
                },
                n,
              ),
              n
            );
          }
          return (
            (0, o.__extends)(t, e),
            (t.prototype.enableBrush = function (e) {
              return (
                this._brushType && this._doDisableBrush(),
                e.brushType && this._doEnableBrush(e),
                this
              );
            }),
            (t.prototype._doEnableBrush = function (e) {
              var t = this._zr;
              (this._enableGlobalPan || p.s(t, y, this._uid),
                (0, i.each)(this._handlers, function (e, n) {
                  t.on(n, e);
                }),
                (this._brushType = e.brushType),
                (this._brushOption = (0, i.merge)((0, i.clone)(_), e, !0)));
            }),
            (t.prototype._doDisableBrush = function () {
              var e = this._zr;
              (p._r(e, y, this._uid),
                (0, i.each)(this._handlers, function (t, n) {
                  e.off(n, t);
                }),
                (this._brushType = this._brushOption = null));
            }),
            (t.prototype.setPanels = function (e) {
              if (e && e.length) {
                var t = (this._panels = {});
                (0, i.each)(e, function (e) {
                  t[e.panelId] = (0, i.clone)(e);
                });
              } else this._panels = null;
              return this;
            }),
            (t.prototype.mount = function (e) {
              ((e = e || {}), (this._enableGlobalPan = e.enableGlobalPan));
              var t = this.group;
              return (
                this._zr.add(t),
                t.attr({
                  x: e.x || 0,
                  y: e.y || 0,
                  rotation: e.rotation || 0,
                  scaleX: e.scaleX || 1,
                  scaleY: e.scaleY || 1,
                }),
                (this._transform = t.getLocalTransform()),
                this
              );
            }),
            (t.prototype.updateCovers = function (e) {
              e = (0, i.map)(e, function (e) {
                return (0, i.merge)((0, i.clone)(_), e, !0);
              });
              var t = this._covers,
                n = (this._covers = []),
                o = this,
                r = this._creatingCover;
              return (
                new d.A(
                  t,
                  e,
                  function (e, t) {
                    return a(e.__brushOption, t);
                  },
                  a,
                )
                  .add(s)
                  .update(s)
                  .remove(function (e) {
                    t[e] !== r && o.group.remove(t[e]);
                  })
                  .execute(),
                this
              );
              function a(e, t) {
                return (null != e.id ? e.id : '\0-brush-index-' + t) + '-' + e.brushType;
              }
              function s(i, a) {
                var s = e[i];
                if (null != a && t[a] === r) n[i] = t[a];
                else {
                  var l = (n[i] = null != a ? ((t[a].__brushOption = s), t[a]) : M(o, A(o, s)));
                  C(o, l);
                }
              }
            }),
            (t.prototype.unmount = function () {
              return (this.enableBrush(!1), k(this), this._zr.remove(this.group), this);
            }),
            (t.prototype.dispose = function () {
              (this.unmount(), this.off());
            }),
            t
          );
        })(r.A);
      function A(e, t) {
        var n = U[t.brushType].createCover(e, t);
        return ((n.__brushOption = t), I(n, t), e.group.add(n), n);
      }
      function M(e, t) {
        var n = D(t);
        return (n.endCreating && (n.endCreating(e, t), I(t, t.__brushOption)), t);
      }
      function w(e, t) {
        var n = t.__brushOption;
        D(t).updateCoverShape(e, t, n.range, n);
      }
      function I(e, t) {
        var n = t.z;
        (null == n && (n = 1e4),
          e.traverse(function (e) {
            ((e.z = n), (e.z2 = n));
          }));
      }
      function C(e, t) {
        (D(t).updateCommon(e, t), w(e, t));
      }
      function D(e) {
        return U[e.__brushOption.brushType];
      }
      function T(e, t, n) {
        var o,
          r = e._panels;
        if (!r) return g;
        var a = e._transform;
        return (
          (0, i.each)(r, function (e) {
            e.isTargetByCursor(t, n, a) && (o = e);
          }),
          o
        );
      }
      function P(e, t) {
        var n = e._panels;
        if (!n) return g;
        var o = t.__brushOption.panelId;
        return null != o ? n[o] : g;
      }
      function k(e) {
        var t = e._covers,
          n = t.length;
        return (
          (0, i.each)(
            t,
            function (t) {
              e.group.remove(t);
            },
            e,
          ),
          (t.length = 0),
          !!n
        );
      }
      function G(e, t) {
        var n = (0, i.map)(e._covers, function (e) {
          var t = e.__brushOption,
            n = (0, i.clone)(t.range);
          return { brushType: t.brushType, panelId: t.panelId, range: n };
        });
        e.trigger('brush', { areas: n, isEnd: !!t.isEnd, removeOnClick: !!t.removeOnClick });
      }
      function O(e) {
        var t = e.length - 1;
        return (t < 0 && (t = 0), [e[0], e[t]]);
      }
      function z(e, t, n, o) {
        var r = new a.A();
        return (
          r.add(
            new s.A({
              name: 'main',
              style: B(n),
              silent: !0,
              draggable: !0,
              cursor: 'move',
              drift: (0, i.curry)(W, e, t, r, ['n', 's', 'w', 'e']),
              ondragend: (0, i.curry)(G, t, { isEnd: !0 }),
            }),
          ),
          (0, i.each)(o, function (n) {
            r.add(
              new s.A({
                name: n.join(''),
                style: { opacity: 0 },
                draggable: !0,
                silent: !0,
                invisible: !0,
                drift: (0, i.curry)(W, e, t, r, n),
                ondragend: (0, i.curry)(G, t, { isEnd: !0 }),
              }),
            );
          }),
          r
        );
      }
      function L(e, t, n, o) {
        var i = o.brushStyle.lineWidth || 0,
          r = f(i, 6),
          a = n[0][0],
          s = n[1][0],
          l = a - i / 2,
          u = s - i / 2,
          c = n[0][1],
          p = n[1][1],
          d = c - r + i / 2,
          g = p - r + i / 2,
          h = c - a,
          m = p - s,
          y = h + i,
          v = m + i;
        (N(e, t, 'main', a, s, h, m),
          o.transformable &&
            (N(e, t, 'w', l, u, r, v),
            N(e, t, 'e', d, u, r, v),
            N(e, t, 'n', l, u, y, r),
            N(e, t, 's', l, g, y, r),
            N(e, t, 'nw', l, u, r, r),
            N(e, t, 'ne', d, u, r, r),
            N(e, t, 'sw', l, g, r, r),
            N(e, t, 'se', d, g, r, r)));
      }
      function R(e, t) {
        var n = t.__brushOption,
          o = n.transformable,
          r = t.childAt(0);
        (r.useStyle(B(n)),
          r.attr({ silent: !o, cursor: o ? 'move' : 'default' }),
          (0, i.each)(
            [['w'], ['e'], ['n'], ['s'], ['s', 'e'], ['s', 'w'], ['n', 'e'], ['n', 'w']],
            function (n) {
              var i = t.childOfName(n.join('')),
                r =
                  1 === n.length
                    ? E(e, n[0])
                    : (function (e, t) {
                        var n = [E(e, t[0]), E(e, t[1])];
                        return (('e' === n[0] || 'w' === n[0]) && n.reverse(), n.join(''));
                      })(e, n);
              i && i.attr({ silent: !o, invisible: !o, cursor: o ? x[r] + '-resize' : null });
            },
          ));
      }
      function N(e, t, n, o, i, r, a) {
        var s,
          l,
          u,
          c = t.childOfName(n);
        c &&
          c.setShape(
            ((s = H(e, t, [
              [o, i],
              [o + r, i + a],
            ])),
            {
              x: (l = h(s[0][0], s[1][0])),
              y: (u = h(s[0][1], s[1][1])),
              width: f(s[0][0], s[1][0]) - l,
              height: f(s[0][1], s[1][1]) - u,
            }),
          );
      }
      function B(e) {
        return (0, i.defaults)({ strokeNoScale: !0 }, e.brushStyle);
      }
      function V(e, t, n, o) {
        var i = [h(e, n), h(t, o)],
          r = [f(e, n), f(t, o)];
        return [
          [i[0], r[0]],
          [i[1], r[1]],
        ];
      }
      function E(e, t) {
        var n = l.transformDirection(
          { w: 'left', e: 'right', n: 'top', s: 'bottom' }[t],
          (function (e) {
            return l.getTransform(e.group);
          })(e),
        );
        return { left: 'w', right: 'e', top: 'n', bottom: 's' }[n];
      }
      function W(e, t, n, o, r, a) {
        var s = n.__brushOption,
          l = e.toRectRange(s.range),
          u = Y(t, r, a);
        ((0, i.each)(o, function (e) {
          var t = v[e];
          l[t[0]][t[1]] += u[t[0]];
        }),
          (s.range = e.fromRectRange(V(l[0][0], l[1][0], l[0][1], l[1][1]))),
          C(t, n),
          G(t, { isEnd: !1 }));
      }
      function F(e, t, n, o) {
        var r = t.__brushOption.range,
          a = Y(e, n, o);
        ((0, i.each)(r, function (e) {
          ((e[0] += a[0]), (e[1] += a[1]));
        }),
          C(e, t),
          G(e, { isEnd: !1 }));
      }
      function Y(e, t, n) {
        var o = e.group,
          i = o.transformCoordToLocal(t, n),
          r = o.transformCoordToLocal(0, 0);
        return [i[0] - r[0], i[1] - r[1]];
      }
      function H(e, t, n) {
        var o = P(e, t);
        return o && o !== g ? o.clipPath(n, e._transform) : (0, i.clone)(n);
      }
      function X(e) {
        var t = e.event;
        t.preventDefault && t.preventDefault();
      }
      function K(e, t, n) {
        return e.childOfName('main').contain(t, n);
      }
      function J(e, t, n, o) {
        var r,
          a = e._creatingCover,
          s = e._creatingPanel,
          l = e._brushOption;
        if (
          (e._track.push(n.slice()),
          (function (e) {
            var t = e._track;
            if (!t.length) return !1;
            var n = t[t.length - 1],
              o = t[0],
              i = n[0] - o[0],
              r = n[1] - o[1];
            return m(i * i + r * r, 0.5) > 6;
          })(e) || a)
        ) {
          if (s && !a) {
            'single' === l.brushMode && k(e);
            var u = (0, i.clone)(l);
            ((u.brushType = j(u.brushType, s)),
              (u.panelId = s === g ? null : s.panelId),
              (a = e._creatingCover = A(e, u)),
              e._covers.push(a));
          }
          if (a) {
            var c = U[j(e._brushType, s)];
            ((a.__brushOption.range = c.getCreatingRange(H(e, a, e._track))),
              o && (M(e, a), c.updateCommon(e, a)),
              w(e, a),
              (r = { isEnd: o }));
          }
        } else
          o &&
            'single' === l.brushMode &&
            l.removeOnClick &&
            T(e, t, n) &&
            k(e) &&
            (r = { isEnd: o, removeOnClick: !0 });
        return r;
      }
      function j(e, t) {
        return 'auto' === e ? t.defaultBrushType : e;
      }
      var q = {
        mousedown: function (e) {
          if (this._dragging) Z(this, e);
          else if (!e.target || !e.target.draggable) {
            X(e);
            var t = this.group.transformCoordToLocal(e.offsetX, e.offsetY);
            ((this._creatingCover = null),
              (this._creatingPanel = T(this, e, t)) &&
                ((this._dragging = !0), (this._track = [t.slice()])));
          }
        },
        mousemove: function (e) {
          var t = e.offsetX,
            n = e.offsetY,
            o = this.group.transformCoordToLocal(t, n);
          if (
            ((function (e, t, n) {
              if (
                e._brushType &&
                !(function (e, t, n) {
                  var o = e._zr;
                  return t < 0 || t > o.getWidth() || n < 0 || n > o.getHeight();
                })(e, t.offsetX, t.offsetY)
              ) {
                var o = e._zr,
                  i = e._covers,
                  r = T(e, t, n);
                if (!e._dragging)
                  for (var a = 0; a < i.length; a++) {
                    var s = i[a].__brushOption;
                    if (
                      r &&
                      (r === g || s.panelId === r.panelId) &&
                      U[s.brushType].contain(i[a], n[0], n[1])
                    )
                      return;
                  }
                r && o.setCursorStyle('crosshair');
              }
            })(this, e, o),
            this._dragging)
          ) {
            X(e);
            var i = J(this, e, o, !1);
            i && G(this, i);
          }
        },
        mouseup: function (e) {
          Z(this, e);
        },
      };
      function Z(e, t) {
        if (e._dragging) {
          X(t);
          var n = t.offsetX,
            o = t.offsetY,
            i = e.group.transformCoordToLocal(n, o),
            r = J(e, t, i, !0);
          ((e._dragging = !1), (e._track = []), (e._creatingCover = null), r && G(e, r));
        }
      }
      var U = {
        lineX: $(0),
        lineY: $(1),
        rect: {
          createCover: function (e, t) {
            function n(e) {
              return e;
            }
            return z({ toRectRange: n, fromRectRange: n }, e, t, [
              ['w'],
              ['e'],
              ['n'],
              ['s'],
              ['s', 'e'],
              ['s', 'w'],
              ['n', 'e'],
              ['n', 'w'],
            ]);
          },
          getCreatingRange: function (e) {
            var t = O(e);
            return V(t[1][0], t[1][1], t[0][0], t[0][1]);
          },
          updateCoverShape: function (e, t, n, o) {
            L(e, t, n, o);
          },
          updateCommon: R,
          contain: K,
        },
        polygon: {
          createCover: function (e, t) {
            var n = new a.A();
            return (n.add(new u.A({ name: 'main', style: B(t), silent: !0 })), n);
          },
          getCreatingRange: function (e) {
            return e;
          },
          endCreating: function (e, t) {
            (t.remove(t.childAt(0)),
              t.add(
                new c.A({
                  name: 'main',
                  draggable: !0,
                  drift: (0, i.curry)(F, e, t),
                  ondragend: (0, i.curry)(G, e, { isEnd: !0 }),
                }),
              ));
          },
          updateCoverShape: function (e, t, n, o) {
            t.childAt(0).setShape({ points: H(e, t, n) });
          },
          updateCommon: R,
          contain: K,
        },
      };
      function $(e) {
        return {
          createCover: function (t, n) {
            return z(
              {
                toRectRange: function (t) {
                  var n = [t, [0, 100]];
                  return (e && n.reverse(), n);
                },
                fromRectRange: function (t) {
                  return t[e];
                },
              },
              t,
              n,
              [
                [['w'], ['e']],
                [['n'], ['s']],
              ][e],
            );
          },
          getCreatingRange: function (t) {
            var n = O(t);
            return [h(n[0][e], n[1][e]), f(n[0][e], n[1][e])];
          },
          updateCoverShape: function (t, n, o, i) {
            var r,
              a = P(t, n);
            if (a !== g && a.getLinearBrushOtherExtent) r = a.getLinearBrushOtherExtent(e);
            else {
              var s = t._zr;
              r = [0, [s.getWidth(), s.getHeight()][1 - e]];
            }
            var l = [o, r];
            (e && l.reverse(), L(t, n, l, i));
          },
          updateCommon: R,
          contain: K,
        };
      }
      const Q = S;
    },
    798595: (e, t, n) => {
      n.d(t, { A: () => x });
      var o = n(498026),
        i = n(543199),
        r = n(725451),
        a = n(48170),
        s = ['grid', 'xAxis', 'yAxis', 'geo', 'graph', 'polar', 'radiusAxis', 'angleAxis', 'bmap'],
        l = (function () {
          function e(e, t, n) {
            var i = this;
            this._targetInfoList = [];
            var r = c(t, e);
            (0, o.each)(p, function (e, t) {
              (!n || !n.include || (0, o.indexOf)(n.include, t) >= 0) && e(r, i._targetInfoList);
            });
          }
          return (
            (e.prototype.setOutputRanges = function (e, t) {
              return (
                this.matchOutputRanges(e, t, function (e, t, n) {
                  if (((e.coordRanges || (e.coordRanges = [])).push(t), !e.coordRange)) {
                    e.coordRange = t;
                    var o = h[e.brushType](0, n, t);
                    e.__rangeOffset = {
                      offset: m[e.brushType](o.values, e.range, [1, 1]),
                      xyMinMax: o.xyMinMax,
                    };
                  }
                }),
                e
              );
            }),
            (e.prototype.matchOutputRanges = function (e, t, n) {
              (0, o.each)(
                e,
                function (e) {
                  var i = this.findTargetInfo(e, t);
                  i &&
                    !0 !== i &&
                    (0, o.each)(i.coordSyses, function (o) {
                      var i = h[e.brushType](1, o, e.range, !0);
                      n(e, i.values, o, t);
                    });
                },
                this,
              );
            }),
            (e.prototype.setInputRanges = function (e, t) {
              (0, o.each)(
                e,
                function (e) {
                  var n,
                    o,
                    i,
                    r,
                    a,
                    s = this.findTargetInfo(e, t);
                  if (((e.range = e.range || []), s && !0 !== s)) {
                    e.panelId = s.panelId;
                    var l = h[e.brushType](0, s.coordSys, e.coordRange),
                      u = e.__rangeOffset;
                    e.range = u
                      ? m[e.brushType](
                          l.values,
                          u.offset,
                          ((n = l.xyMinMax),
                          (o = u.xyMinMax),
                          (i = v(n)),
                          (r = v(o)),
                          (a = [i[0] / r[0], i[1] / r[1]]),
                          isNaN(a[0]) && (a[0] = 1),
                          isNaN(a[1]) && (a[1] = 1),
                          a),
                        )
                      : l.values;
                  }
                },
                this,
              );
            }),
            (e.prototype.makePanelOpts = function (e, t) {
              return (0, o.map)(this._targetInfoList, function (n) {
                var o = n.getPanelRect();
                return {
                  panelId: n.panelId,
                  defaultBrushType: t ? t(n) : null,
                  clipPath: r.wd(o),
                  isTargetByCursor: r.x$(o, e, n.coordSysModel),
                  getLinearBrushOtherExtent: r.wx(o),
                };
              });
            }),
            (e.prototype.controlSeries = function (e, t, n) {
              var i = this.findTargetInfo(e, n);
              return !0 === i || (i && (0, o.indexOf)(i.coordSyses, t.coordinateSystem) >= 0);
            }),
            (e.prototype.findTargetInfo = function (e, t) {
              for (var n = this._targetInfoList, o = c(t, e), i = 0; i < n.length; i++) {
                var r = n[i],
                  a = e.panelId;
                if (a) {
                  if (r.panelId === a) return r;
                } else for (var s = 0; s < d.length; s++) if (d[s](o, r)) return r;
              }
              return !0;
            }),
            e
          );
        })();
      function u(e) {
        return (e[0] > e[1] && e.reverse(), e);
      }
      function c(e, t) {
        return (0, a._e)(e, t, { includeMainTypes: s });
      }
      var p = {
          grid: function (e, t) {
            var n = e.xAxisModels,
              i = e.yAxisModels,
              r = e.gridModels,
              a = (0, o.createHashMap)(),
              s = {},
              l = {};
            (n || i || r) &&
              ((0, o.each)(n, function (e) {
                var t = e.axis.grid.model;
                (a.set(t.id, t), (s[t.id] = !0));
              }),
              (0, o.each)(i, function (e) {
                var t = e.axis.grid.model;
                (a.set(t.id, t), (l[t.id] = !0));
              }),
              (0, o.each)(r, function (e) {
                (a.set(e.id, e), (s[e.id] = !0), (l[e.id] = !0));
              }),
              a.each(function (e) {
                var r = e.coordinateSystem,
                  a = [];
                ((0, o.each)(r.getCartesians(), function (e, t) {
                  ((0, o.indexOf)(n, e.getAxis('x').model) >= 0 ||
                    (0, o.indexOf)(i, e.getAxis('y').model) >= 0) &&
                    a.push(e);
                }),
                  t.push({
                    panelId: 'grid--' + e.id,
                    gridModel: e,
                    coordSysModel: e,
                    coordSys: a[0],
                    coordSyses: a,
                    getPanelRect: g.grid,
                    xAxisDeclared: s[e.id],
                    yAxisDeclared: l[e.id],
                  }));
              }));
          },
          geo: function (e, t) {
            (0, o.each)(e.geoModels, function (e) {
              var n = e.coordinateSystem;
              t.push({
                panelId: 'geo--' + e.id,
                geoModel: e,
                coordSysModel: e,
                coordSys: n,
                coordSyses: [n],
                getPanelRect: g.geo,
              });
            });
          },
        },
        d = [
          function (e, t) {
            var n = e.xAxisModel,
              o = e.yAxisModel,
              i = e.gridModel;
            return (
              !i && n && (i = n.axis.grid.model),
              !i && o && (i = o.axis.grid.model),
              i && i === t.gridModel
            );
          },
          function (e, t) {
            var n = e.geoModel;
            return n && n === t.geoModel;
          },
        ],
        g = {
          grid: function () {
            return this.coordSys.master.getRect().clone();
          },
          geo: function () {
            var e = this.coordSys,
              t = e.getBoundingRect().clone();
            return (t.applyTransform(i.getTransform(e)), t);
          },
        },
        h = {
          lineX: (0, o.curry)(f, 0),
          lineY: (0, o.curry)(f, 1),
          rect: function (e, t, n, o) {
            var i = e ? t.pointToData([n[0][0], n[1][0]], o) : t.dataToPoint([n[0][0], n[1][0]], o),
              r = e ? t.pointToData([n[0][1], n[1][1]], o) : t.dataToPoint([n[0][1], n[1][1]], o),
              a = [u([i[0], r[0]]), u([i[1], r[1]])];
            return { values: a, xyMinMax: a };
          },
          polygon: function (e, t, n, i) {
            var r = [
              [1 / 0, -1 / 0],
              [1 / 0, -1 / 0],
            ];
            return {
              values: (0, o.map)(n, function (n) {
                var o = e ? t.pointToData(n, i) : t.dataToPoint(n, i);
                return (
                  (r[0][0] = Math.min(r[0][0], o[0])),
                  (r[1][0] = Math.min(r[1][0], o[1])),
                  (r[0][1] = Math.max(r[0][1], o[0])),
                  (r[1][1] = Math.max(r[1][1], o[1])),
                  o
                );
              }),
              xyMinMax: r,
            };
          },
        };
      function f(e, t, n, i) {
        var r = n.getAxis(['x', 'y'][e]),
          a = u(
            (0, o.map)([0, 1], function (e) {
              return t
                ? r.coordToData(r.toLocalCoord(i[e]), !0)
                : r.toGlobalCoord(r.dataToCoord(i[e]));
            }),
          ),
          s = [];
        return ((s[e] = a), (s[1 - e] = [NaN, NaN]), { values: a, xyMinMax: s });
      }
      var m = {
        lineX: (0, o.curry)(y, 0),
        lineY: (0, o.curry)(y, 1),
        rect: function (e, t, n) {
          return [
            [e[0][0] - n[0] * t[0][0], e[0][1] - n[0] * t[0][1]],
            [e[1][0] - n[1] * t[1][0], e[1][1] - n[1] * t[1][1]],
          ];
        },
        polygon: function (e, t, n) {
          return (0, o.map)(e, function (e, o) {
            return [e[0] - n[0] * t[o][0], e[1] - n[1] * t[o][1]];
          });
        },
      };
      function y(e, t, n, o) {
        return [t[0] - o[e] * n[0], t[1] - o[e] * n[1]];
      }
      function v(e) {
        return e ? [e[0][1] - e[0][0], e[1][1] - e[1][0]] : [NaN, NaN];
      }
      const x = l;
    },
    108027: (e, t, n) => {
      n.d(t, { A: () => z });
      var o = n(498026),
        i = n(281722),
        r = n(956366),
        a = n(572589),
        s = n(843870),
        l = n(683257),
        u = n(252505),
        c = n(39195),
        p = n(482591),
        d = n(543199),
        g = n(34833),
        h = n(676311),
        f = n(612616),
        m = n(289632),
        y = n(669622),
        v = n(923538),
        x = n(171519),
        _ = n(48170),
        b = ['rect', 'circle', 'line', 'ellipse', 'polygon', 'polyline', 'path'],
        S = o.createHashMap(b),
        A = o.createHashMap(b.concat(['g'])),
        M = o.createHashMap(b.concat(['g'])),
        w = (0, _.$r)();
      function I(e) {
        var t = e.getItemStyle(),
          n = e.get('areaColor');
        return (null != n && (t.fill = n), t);
      }
      function C(e) {
        var t = e.style;
        t && ((t.stroke = t.stroke || t.fill), (t.fill = null));
      }
      function D(e, t, n, o) {
        var i = o.getModel('itemStyle'),
          r = o.getModel(['emphasis', 'itemStyle']),
          a = o.getModel(['blur', 'itemStyle']),
          s = o.getModel(['select', 'itemStyle']),
          l = I(i),
          u = I(r),
          c = I(s),
          p = I(a),
          d = e.data;
        if (d) {
          var h = d.getItemVisual(n, 'style'),
            f = d.getItemVisual(n, 'decal');
          (e.isVisualEncodedByVisualMap && h.fill && (l.fill = h.fill),
            f && (l.decal = (0, v.w)(f, e.api)));
        }
        (t.setStyle(l),
          (t.style.strokeNoScale = !0),
          (t.ensureState('emphasis').style = u),
          (t.ensureState('select').style = c),
          (t.ensureState('blur').style = p),
          (0, g.DW)(t));
      }
      function T(e, t, n, o, i, r, a) {
        var s = e.data,
          l = e.isGeo,
          u = s && isNaN(s.get(s.mapDimension('value'), r)),
          c = s && s.getItemLayout(r);
        if (l || u || (c && c.showLabel)) {
          var p = l ? n : r,
            d = void 0;
          (!s || r >= 0) && (d = i);
          var g = a ? { normal: { align: 'center', verticalAlign: 'middle' } } : null;
          (0, m.qM)(t, (0, m.lx)(o), { labelFetcher: d, labelDataIndex: p, defaultText: n }, g);
          var h = t.getTextContent();
          if (h && ((w(h).ignore = h.ignore), t.textConfig && a)) {
            var f = t.getBoundingRect().clone();
            ((t.textConfig.layoutRect = f),
              (t.textConfig.position = [
                ((a[0] - f.x) / f.width) * 100 + '%',
                ((a[1] - f.y) / f.height) * 100 + '%',
              ]));
          }
          t.disableLabelAnimation = !0;
        } else (t.removeTextContent(), t.removeTextConfig(), (t.disableLabelAnimation = null));
      }
      function P(e, t, n, o, i, r) {
        e.data
          ? e.data.setItemGraphicEl(r, t)
          : ((0, y.z)(t).eventData = {
              componentType: 'geo',
              componentIndex: i.componentIndex,
              geoIndex: i.componentIndex,
              name: n,
              region: (o && o.option) || {},
            });
      }
      function k(e, t, n, o, i) {
        e.data ||
          d.setTooltipConfig({
            el: t,
            componentModel: i,
            itemName: n,
            itemTooltipOption: o.get('tooltip'),
          });
      }
      function G(e, t, n, o, i) {
        t.highDownSilentOnTouch = !!i.get('selectedMode');
        var r = o.getModel('emphasis'),
          a = r.get('focus');
        return (
          (0, g.Lm)(t, a, r.get('blurScope'), r.get('disabled')),
          e.isGeo && (0, g.ml)(t, i, n),
          a
        );
      }
      function O(e, t, n) {
        var i,
          r = [];
        function a() {
          i = [];
        }
        function s() {
          i.length && (r.push(i), (i = []));
        }
        var l = t({
          polygonStart: a,
          polygonEnd: s,
          lineStart: a,
          lineEnd: s,
          point: function (e, t) {
            isFinite(e) && isFinite(t) && i.push([e, t]);
          },
          sphere: function () {},
        });
        return (
          !n && l.polygonStart(),
          o.each(e, function (e) {
            l.lineStart();
            for (var t = 0; t < e.length; t++) l.point(e[t][0], e[t][1]);
            l.lineEnd();
          }),
          !n && l.polygonEnd(),
          r
        );
      }
      const z = (function () {
        function e(e) {
          var t = new s.A();
          ((this.uid = (0, f.$Q)('ec_map_draw')),
            (this._controller = new i.A(e.getZr())),
            (this._controllerHost = { target: t }),
            (this.group = t),
            t.add((this._regionsGroup = new s.A())),
            t.add((this._svgGroup = new s.A())));
        }
        return (
          (e.prototype.draw = function (e, t, n, o, i) {
            var r = 'geo' === e.mainType,
              a = e.getData && e.getData();
            r &&
              t.eachComponent({ mainType: 'series', subType: 'map' }, function (t) {
                a || t.getHostGeoModel() !== e || (a = t.getData());
              });
            var s = e.coordinateSystem,
              u = this._regionsGroup,
              c = this.group,
              p = s.getTransformInfo(),
              d = p.raw,
              g = p.roam;
            !u.childAt(0) || i
              ? ((c.x = g.x), (c.y = g.y), (c.scaleX = g.scaleX), (c.scaleY = g.scaleY), c.dirty())
              : l.oi(c, g, e);
            var h = a && a.getVisual('visualMeta') && a.getVisual('visualMeta').length > 0,
              f = {
                api: n,
                geo: s,
                mapOrGeoModel: e,
                data: a,
                isVisualEncodedByVisualMap: h,
                isGeo: r,
                transformInfoRaw: d,
              };
            ('geoJSON' === s.resourceType
              ? this._buildGeoJSON(f)
              : 'geoSVG' === s.resourceType && this._buildSVG(f),
              this._updateController(e, t, n),
              this._updateMapSelectHandler(e, u, n, o));
          }),
          (e.prototype._buildGeoJSON = function (e) {
            var t = (this._regionsGroupByName = o.createHashMap()),
              n = o.createHashMap(),
              i = this._regionsGroup,
              r = e.transformInfoRaw,
              a = e.mapOrGeoModel,
              l = e.data,
              d = e.geo.projection,
              g = d && d.stream;
            function h(e, t) {
              return (t && (e = t(e)), e && [e[0] * r.scaleX + r.x, e[1] * r.scaleY + r.y]);
            }
            function f(e) {
              for (var t = [], n = !g && d && d.project, o = 0; o < e.length; ++o) {
                var i = h(e[o], n);
                i && t.push(i);
              }
              return t;
            }
            function m(e) {
              return { shape: { points: f(e) } };
            }
            (i.removeAll(),
              o.each(e.geo.regions, function (r) {
                var f = r.name,
                  y = t.get(f),
                  v = n.get(f) || {},
                  x = v.dataIdx,
                  _ = v.regionModel;
                if (!y) {
                  ((y = t.set(f, new s.A())), i.add(y), (x = l ? l.indexOfName(f) : null));
                  var b = (_ = e.isGeo ? a.getRegionModel(f) : l ? l.getItemModel(x) : null).get(
                    'silent',
                    !0,
                  );
                  (null != b && (y.silent = b), n.set(f, { dataIdx: x, regionModel: _ }));
                }
                var S = [],
                  A = [];
                o.each(r.geometries, function (e) {
                  if ('polygon' === e.type) {
                    var t = [e.exterior].concat(e.interiors || []);
                    (g && (t = O(t, g)),
                      o.each(t, function (e) {
                        S.push(new u.A(m(e)));
                      }));
                  } else {
                    var n = e.points;
                    (g && (n = O(n, g, !0)),
                      o.each(n, function (e) {
                        A.push(new c.A(m(e)));
                      }));
                  }
                });
                var M = h(r.getCenter(), d && d.project);
                function w(t, n) {
                  if (t.length) {
                    var i = new p.A({
                      culling: !0,
                      segmentIgnoreThreshold: 1,
                      shape: { paths: t },
                    });
                    (y.add(i),
                      D(e, i, x, _),
                      T(e, i, f, _, a, x, M),
                      n && (C(i), o.each(i.states, C)));
                  }
                }
                (w(S), w(A, !0));
              }),
              t.each(function (t, o) {
                var i = n.get(o),
                  r = i.dataIdx,
                  s = i.regionModel;
                (P(e, t, o, s, a, r), k(e, t, o, s, a), G(e, t, o, s, a));
              }, this));
          }),
          (e.prototype._buildSVG = function (e) {
            var t = e.geo.map,
              n = e.transformInfoRaw;
            ((this._svgGroup.x = n.x),
              (this._svgGroup.y = n.y),
              (this._svgGroup.scaleX = n.scaleX),
              (this._svgGroup.scaleY = n.scaleY),
              this._svgResourceChanged(t) && (this._freeSVG(), this._useSVG(t)));
            var i = (this._svgDispatcherMap = o.createHashMap()),
              r = !1;
            (o.each(
              this._svgGraphicRecord.named,
              function (t) {
                var n = t.name,
                  o = e.mapOrGeoModel,
                  a = e.data,
                  s = t.svgNodeTagLower,
                  l = t.el,
                  u = a ? a.indexOfName(n) : null,
                  c = o.getRegionModel(n);
                (null != S.get(s) && l instanceof x.Ay && D(e, l, u, c),
                  l instanceof x.Ay && (l.culling = !0));
                var p = c.get('silent', !0);
                (null != p && (l.silent = p),
                  (l.z2EmphasisLift = 0),
                  t.namedFrom ||
                    (null != M.get(s) && T(e, l, n, c, o, u, null),
                    P(e, l, n, c, o, u),
                    k(e, l, n, c, o),
                    null != A.get(s) &&
                      ('self' === G(e, l, n, c, o) && (r = !0),
                      (i.get(n) || i.set(n, [])).push(l))));
              },
              this,
            ),
              this._enableBlurEntireSVG(r, e));
          }),
          (e.prototype._enableBlurEntireSVG = function (e, t) {
            if (e && t.isGeo) {
              var n = t.mapOrGeoModel.getModel(['blur', 'itemStyle']).getItemStyle().opacity;
              this._svgGraphicRecord.root.traverse(function (e) {
                if (!e.isGroup) {
                  (0, g.DW)(e);
                  var t = e.ensureState('blur').style || {};
                  (null == t.opacity && null != n && (t.opacity = n), e.ensureState('emphasis'));
                }
              });
            }
          }),
          (e.prototype.remove = function () {
            (this._regionsGroup.removeAll(),
              (this._regionsGroupByName = null),
              this._svgGroup.removeAll(),
              this._freeSVG(),
              this._controller.dispose(),
              (this._controllerHost = null));
          }),
          (e.prototype.findHighDownDispatchers = function (e, t) {
            if (null == e) return [];
            var n = t.coordinateSystem;
            if ('geoJSON' === n.resourceType) {
              var o = this._regionsGroupByName;
              if (o) {
                var i = o.get(e);
                return i ? [i] : [];
              }
            } else if ('geoSVG' === n.resourceType)
              return (this._svgDispatcherMap && this._svgDispatcherMap.get(e)) || [];
          }),
          (e.prototype._svgResourceChanged = function (e) {
            return this._svgMapName !== e;
          }),
          (e.prototype._useSVG = function (e) {
            var t = h.A.getGeoResource(e);
            if (t && 'geoSVG' === t.type) {
              var n = t.useGraphic(this.uid);
              (this._svgGroup.add(n.root), (this._svgGraphicRecord = n), (this._svgMapName = e));
            }
          }),
          (e.prototype._freeSVG = function () {
            var e = this._svgMapName;
            if (null != e) {
              var t = h.A.getGeoResource(e);
              (t && 'geoSVG' === t.type && t.freeGraphic(this.uid),
                (this._svgGraphicRecord = null),
                (this._svgDispatcherMap = null),
                this._svgGroup.removeAll(),
                (this._svgMapName = null));
            }
          }),
          (e.prototype._updateController = function (e, t, n) {
            var i = e.coordinateSystem,
              s = this._controller,
              l = this._controllerHost;
            ((l.zoomLimit = e.get('scaleLimit')),
              (l.zoom = i.getZoom()),
              s.enable(e.get('roam') || !1));
            var u = e.mainType;
            function c() {
              var t = { type: 'geoRoam', componentType: u };
              return ((t[u + 'Id'] = e.id), t);
            }
            (s.off('pan').on(
              'pan',
              function (e) {
                ((this._mouseDownFlag = !1),
                  r.t(l, e.dx, e.dy),
                  n.dispatchAction(
                    o.extend(c(), { dx: e.dx, dy: e.dy, animation: { duration: 0 } }),
                  ));
              },
              this,
            ),
              s.off('zoom').on(
                'zoom',
                function (e) {
                  ((this._mouseDownFlag = !1),
                    r.x(l, e.scale, e.originX, e.originY),
                    n.dispatchAction(
                      o.extend(c(), {
                        totalZoom: l.zoom,
                        zoom: e.scale,
                        originX: e.originX,
                        originY: e.originY,
                        animation: { duration: 0 },
                      }),
                    ));
                },
                this,
              ),
              s.setPointerChecker(function (t, o, r) {
                return i.containPoint([o, r]) && !(0, a.I)(t, n, e);
              }));
          }),
          (e.prototype.resetForLabelLayout = function () {
            this.group.traverse(function (e) {
              var t = e.getTextContent();
              t && (t.ignore = w(t).ignore);
            });
          }),
          (e.prototype._updateMapSelectHandler = function (e, t, n, o) {
            var i = this;
            (t.off('mousedown'),
              t.off('click'),
              e.get('selectedMode') &&
                (t.on('mousedown', function () {
                  i._mouseDownFlag = !0;
                }),
                t.on('click', function (e) {
                  i._mouseDownFlag && (i._mouseDownFlag = !1);
                })));
          }),
          e
        );
      })();
    },
    281722: (e, t, n) => {
      n.d(t, { A: () => p });
      var o = n(15215),
        i = n(757861),
        r = n(435452),
        a = n(923868),
        s = n(498026);
      function l(e, t, n, o, i) {
        e.pointerChecker &&
          e.pointerChecker(o, i.originX, i.originY) &&
          (r.ds(o.event), u(e, t, n, o, i));
      }
      function u(e, t, n, o, i) {
        ((i.isAvailableBehavior = (0, s.bind)(c, null, n, o)), e.trigger(t, i));
      }
      function c(e, t, n) {
        var o = n[e];
        return !e || (o && (!(0, s.isString)(o) || t.event[o + 'Key']));
      }
      const p = (function (e) {
        function t(t) {
          var n = e.call(this) || this;
          n._zr = t;
          var o = (0, s.bind)(n._mousedownHandler, n),
            i = (0, s.bind)(n._mousemoveHandler, n),
            r = (0, s.bind)(n._mouseupHandler, n),
            a = (0, s.bind)(n._mousewheelHandler, n),
            l = (0, s.bind)(n._pinchHandler, n);
          return (
            (n.enable = function (e, n) {
              (this.disable(),
                (this._opt = (0, s.defaults)((0, s.clone)(n) || {}, {
                  zoomOnMouseWheel: !0,
                  moveOnMouseMove: !0,
                  moveOnMouseWheel: !1,
                  preventDefaultMouseMove: !0,
                })),
                null == e && (e = !0),
                (!0 !== e && 'move' !== e && 'pan' !== e) ||
                  (t.on('mousedown', o), t.on('mousemove', i), t.on('mouseup', r)),
                (!0 !== e && 'scale' !== e && 'zoom' !== e) ||
                  (t.on('mousewheel', a), t.on('pinch', l)));
            }),
            (n.disable = function () {
              (t.off('mousedown', o),
                t.off('mousemove', i),
                t.off('mouseup', r),
                t.off('mousewheel', a),
                t.off('pinch', l));
            }),
            n
          );
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.isDragging = function () {
            return this._dragging;
          }),
          (t.prototype.isPinching = function () {
            return this._pinching;
          }),
          (t.prototype.setPointerChecker = function (e) {
            this.pointerChecker = e;
          }),
          (t.prototype.dispose = function () {
            this.disable();
          }),
          (t.prototype._mousedownHandler = function (e) {
            if (!r.W5(e)) {
              for (var t = e.target; t;) {
                if (t.draggable) return;
                t = t.__hostTarget || t.parent;
              }
              var n = e.offsetX,
                o = e.offsetY;
              this.pointerChecker &&
                this.pointerChecker(e, n, o) &&
                ((this._x = n), (this._y = o), (this._dragging = !0));
            }
          }),
          (t.prototype._mousemoveHandler = function (e) {
            if (
              this._dragging &&
              c('moveOnMouseMove', e, this._opt) &&
              'pinch' !== e.gestureEvent &&
              !a.Ck(this._zr, 'globalPan')
            ) {
              var t = e.offsetX,
                n = e.offsetY,
                o = this._x,
                i = this._y,
                s = t - o,
                l = n - i;
              ((this._x = t),
                (this._y = n),
                this._opt.preventDefaultMouseMove && r.ds(e.event),
                u(this, 'pan', 'moveOnMouseMove', e, {
                  dx: s,
                  dy: l,
                  oldX: o,
                  oldY: i,
                  newX: t,
                  newY: n,
                  isAvailableBehavior: null,
                }));
            }
          }),
          (t.prototype._mouseupHandler = function (e) {
            r.W5(e) || (this._dragging = !1);
          }),
          (t.prototype._mousewheelHandler = function (e) {
            var t = c('zoomOnMouseWheel', e, this._opt),
              n = c('moveOnMouseWheel', e, this._opt),
              o = e.wheelDelta,
              i = Math.abs(o),
              r = e.offsetX,
              a = e.offsetY;
            if (0 !== o && (t || n)) {
              if (t) {
                var s = i > 3 ? 1.4 : i > 1 ? 1.2 : 1.1;
                l(this, 'zoom', 'zoomOnMouseWheel', e, {
                  scale: o > 0 ? s : 1 / s,
                  originX: r,
                  originY: a,
                  isAvailableBehavior: null,
                });
              }
              if (n) {
                var u = Math.abs(o);
                l(this, 'scrollMove', 'moveOnMouseWheel', e, {
                  scrollDelta: (o > 0 ? 1 : -1) * (u > 3 ? 0.4 : u > 1 ? 0.15 : 0.05),
                  originX: r,
                  originY: a,
                  isAvailableBehavior: null,
                });
              }
            }
          }),
          (t.prototype._pinchHandler = function (e) {
            a.Ck(this._zr, 'globalPan') ||
              l(this, 'zoom', null, e, {
                scale: e.pinchScale > 1 ? 1.1 : 1 / 1.1,
                originX: e.pinchX,
                originY: e.pinchY,
                isAvailableBehavior: null,
              });
          }),
          t
        );
      })(i.A);
    },
    725451: (e, t, n) => {
      n.d(t, { wd: () => a, wx: () => s, x$: () => l });
      var o = n(529308),
        i = n(572589),
        r = n(543199);
      function a(e) {
        return (
          (e = u(e)),
          function (t) {
            return r.clipPointsByRect(t, e);
          }
        );
      }
      function s(e, t) {
        return (
          (e = u(e)),
          function (n) {
            var o = null != t ? t : n,
              i = o ? e.width : e.height,
              r = o ? e.x : e.y;
            return [r, r + (i || 0)];
          }
        );
      }
      function l(e, t, n) {
        var o = u(e);
        return function (e, r) {
          return o.contain(r[0], r[1]) && !(0, i.I)(e, t, n);
        };
      }
      function u(e) {
        return o.A.create(e);
      }
    },
    572589: (e, t, n) => {
      n.d(t, { I: () => i });
      var o = { axisPointer: 1, tooltip: 1, brush: 1 };
      function i(e, t, n) {
        var i = t.getComponentByElement(e.topTarget),
          r = i && i.coordinateSystem;
        return i && i !== n && !o.hasOwnProperty(i.mainType) && r && r.model !== n;
      }
    },
    923868: (e, t, n) => {
      n.d(t, { Ck: () => l, _r: () => s, s: () => a });
      var o = n(695383),
        i = n(498026),
        r = '\0_ec_interaction_mutex';
      function a(e, t, n) {
        u(e)[t] = n;
      }
      function s(e, t, n) {
        var o = u(e);
        o[t] === n && (o[t] = null);
      }
      function l(e, t) {
        return !!u(e)[t];
      }
      function u(e) {
        return e[r] || (e[r] = {});
      }
      o.OH({ type: 'takeGlobalCursor', event: 'globalCursorTaken', update: 'update' }, i.noop);
    },
    602400: (e, t, n) => {
      n.d(t, { P: () => s, Z: () => a });
      var o = n(834253),
        i = n(783412),
        r = n(830010);
      function a(e, t, n) {
        var i = t.getBoxLayoutParams(),
          r = t.get('padding'),
          a = { width: n.getWidth(), height: n.getHeight() },
          s = (0, o.dV)(i, a, r);
        ((0, o.aP)(t.get('orient'), e, t.get('itemGap'), s.width, s.height), (0, o.m$)(e, i, a, r));
      }
      function s(e, t) {
        var n = i.QX(t.get('padding')),
          o = t.getItemStyle(['color', 'opacity']);
        return (
          (o.fill = t.get('backgroundColor')),
          new r.A({
            shape: {
              x: e.x - n[3],
              y: e.y - n[0],
              width: e.width + n[1] + n[3],
              height: e.height + n[0] + n[2],
              r: t.get('borderRadius'),
            },
            style: o,
            silent: !0,
            z2: -1,
          })
        );
      }
    },
    956366: (e, t, n) => {
      function o(e, t, n) {
        var o = e.target;
        ((o.x += t), (o.y += n), o.dirty());
      }
      function i(e, t, n, o) {
        var i = e.target,
          r = e.zoomLimit,
          a = (e.zoom = e.zoom || 1);
        if (((a *= t), r)) {
          var s = r.min || 0,
            l = r.max || 1 / 0;
          a = Math.max(Math.min(l, a), s);
        }
        var u = a / e.zoom;
        ((e.zoom = a),
          (i.x -= (n - i.x) * (u - 1)),
          (i.y -= (o - i.y) * (u - 1)),
          (i.scaleX *= u),
          (i.scaleY *= u),
          i.dirty());
      }
      n.d(t, { t: () => o, x: () => i });
    },
    898983: (e, t, n) => {
      function o(e, t, n, o, a, s) {
        e = e || 0;
        var l = n[1] - n[0];
        if (
          (null != a && (a = r(a, [0, l])),
          null != s && (s = Math.max(s, null != a ? a : 0)),
          'all' === o)
        ) {
          var u = Math.abs(t[1] - t[0]);
          ((u = r(u, [0, l])), (a = s = r(u, [a, s])), (o = 0));
        }
        ((t[0] = r(t[0], n)), (t[1] = r(t[1], n)));
        var c = i(t, o);
        t[o] += e;
        var p,
          d = a || 0,
          g = n.slice();
        return (
          c.sign < 0 ? (g[0] += d) : (g[1] -= d),
          (t[o] = r(t[o], g)),
          (p = i(t, o)),
          null != a && (p.sign !== c.sign || p.span < a) && (t[1 - o] = t[o] + c.sign * a),
          (p = i(t, o)),
          null != s && p.span > s && (t[1 - o] = t[o] + p.sign * s),
          t
        );
      }
      function i(e, t) {
        var n = e[t] - e[1 - t];
        return { span: Math.abs(n), sign: n > 0 ? -1 : n < 0 ? 1 : t ? -1 : 1 };
      }
      function r(e, t) {
        return Math.min(null != t[1] ? t[1] : 1 / 0, Math.max(null != t[0] ? t[0] : -1 / 0, e));
      }
      n.d(t, { A: () => o });
    },
    169380: (e, t, n) => {
      n.d(t, { a: () => Y });
      var o = n(903087),
        i = n(15215),
        r = n(498026),
        a = n(143172),
        s = n(48170);
      const l = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), (n.layoutMode = { type: 'box', ignoreSize: !0 }), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.init = function (e, t, n) {
            (this.mergeDefaultAndTheme(e, n),
              (e.selected = e.selected || {}),
              this._updateSelector(e));
          }),
          (t.prototype.mergeOption = function (t, n) {
            (e.prototype.mergeOption.call(this, t, n), this._updateSelector(t));
          }),
          (t.prototype._updateSelector = function (e) {
            var t = e.selector,
              n = this.ecModel;
            (!0 === t && (t = e.selector = ['all', 'inverse']),
              r.isArray(t) &&
                r.each(t, function (e, o) {
                  (r.isString(e) && (e = { type: e }),
                    (t[o] = r.merge(
                      e,
                      (function (e, t) {
                        return 'all' === t
                          ? {
                              type: 'all',
                              title: e.getLocaleModel().get(['legend', 'selector', 'all']),
                            }
                          : 'inverse' === t
                            ? {
                                type: 'inverse',
                                title: e.getLocaleModel().get(['legend', 'selector', 'inverse']),
                              }
                            : void 0;
                      })(n, e.type),
                    )));
                }));
          }),
          (t.prototype.optionUpdated = function () {
            this._updateData(this.ecModel);
            var e = this._data;
            if (e[0] && 'single' === this.get('selectedMode')) {
              for (var t = !1, n = 0; n < e.length; n++) {
                var o = e[n].get('name');
                if (this.isSelected(o)) {
                  (this.select(o), (t = !0));
                  break;
                }
              }
              !t && this.select(e[0].get('name'));
            }
          }),
          (t.prototype._updateData = function (e) {
            var t = [],
              n = [];
            (e.eachRawSeries(function (o) {
              var i,
                r = o.name;
              if ((n.push(r), o.legendVisualProvider)) {
                var a = o.legendVisualProvider.getAllNames();
                (e.isSeriesFiltered(o) || (n = n.concat(a)),
                  a.length ? (t = t.concat(a)) : (i = !0));
              } else i = !0;
              i && (0, s.O0)(o) && t.push(o.name);
            }),
              (this._availableNames = n));
            var o = this.get('data') || t,
              i = r.createHashMap(),
              l = r.map(
                o,
                function (e) {
                  return (
                    (r.isString(e) || r.isNumber(e)) && (e = { name: e }),
                    i.get(e.name) ? null : (i.set(e.name, !0), new a.A(e, this, this.ecModel))
                  );
                },
                this,
              );
            this._data = r.filter(l, function (e) {
              return !!e;
            });
          }),
          (t.prototype.getData = function () {
            return this._data;
          }),
          (t.prototype.select = function (e) {
            var t = this.option.selected;
            if ('single' === this.get('selectedMode')) {
              var n = this._data;
              r.each(n, function (e) {
                t[e.get('name')] = !1;
              });
            }
            t[e] = !0;
          }),
          (t.prototype.unSelect = function (e) {
            'single' !== this.get('selectedMode') && (this.option.selected[e] = !1);
          }),
          (t.prototype.toggleSelected = function (e) {
            var t = this.option.selected;
            (t.hasOwnProperty(e) || (t[e] = !0), this[t[e] ? 'unSelect' : 'select'](e));
          }),
          (t.prototype.allSelect = function () {
            var e = this._data,
              t = this.option.selected;
            r.each(e, function (e) {
              t[e.get('name', !0)] = !0;
            });
          }),
          (t.prototype.inverseSelect = function () {
            var e = this._data,
              t = this.option.selected;
            r.each(e, function (e) {
              var n = e.get('name', !0);
              (t.hasOwnProperty(n) || (t[n] = !0), (t[n] = !t[n]));
            });
          }),
          (t.prototype.isSelected = function (e) {
            var t = this.option.selected;
            return !(t.hasOwnProperty(e) && !t[e]) && r.indexOf(this._availableNames, e) >= 0;
          }),
          (t.prototype.getOrient = function () {
            return 'vertical' === this.get('orient')
              ? { index: 1, name: 'vertical' }
              : { index: 0, name: 'horizontal' };
          }),
          (t.type = 'legend.plain'),
          (t.dependencies = ['series']),
          (t.defaultOption = {
            z: 4,
            show: !0,
            orient: 'horizontal',
            left: 'center',
            top: 0,
            align: 'auto',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
            symbolRotate: 'inherit',
            symbolKeepAspect: !0,
            inactiveColor: '#ccc',
            inactiveBorderColor: '#ccc',
            inactiveBorderWidth: 'auto',
            itemStyle: {
              color: 'inherit',
              opacity: 'inherit',
              borderColor: 'inherit',
              borderWidth: 'auto',
              borderCap: 'inherit',
              borderJoin: 'inherit',
              borderDashOffset: 'inherit',
              borderMiterLimit: 'inherit',
            },
            lineStyle: {
              width: 'auto',
              color: 'inherit',
              inactiveColor: '#ccc',
              inactiveWidth: 2,
              opacity: 'inherit',
              type: 'inherit',
              cap: 'inherit',
              join: 'inherit',
              dashOffset: 'inherit',
              miterLimit: 'inherit',
            },
            textStyle: { color: '#333' },
            selectedMode: !0,
            selector: !1,
            selectorLabel: {
              show: !0,
              borderRadius: 10,
              padding: [3, 5, 3, 5],
              fontSize: 12,
              fontFamily: 'sans-serif',
              color: '#666',
              borderWidth: 1,
              borderColor: '#666',
            },
            emphasis: { selectorLabel: { show: !0, color: '#eee', backgroundColor: '#666' } },
            selectorPosition: 'auto',
            selectorItemGap: 7,
            selectorButtonGap: 10,
            tooltip: { show: !1 },
          }),
          t
        );
      })(n(515915).A);
      var u = n(747698),
        c = n(843870),
        p = n(132322),
        d = n(830010),
        g = n(543199),
        h = n(34833),
        f = n(289632),
        m = n(602400),
        y = n(834253),
        v = n(659109),
        x = n(62103),
        _ = n(923538),
        b = n(669622),
        S = r.curry,
        A = r.each,
        M = c.A;
      function w(e, t, n, o) {
        (D(e, t, n, o),
          n.dispatchAction({ type: 'legendToggleSelect', name: null != e ? e : t }),
          C(e, t, n, o));
      }
      function I(e) {
        for (
          var t, n = e.getZr().storage.getDisplayList(), o = 0, i = n.length;
          o < i && !(t = n[o].states.emphasis);
        )
          o++;
        return t && t.hoverLayer;
      }
      function C(e, t, n, o) {
        I(n) || n.dispatchAction({ type: 'highlight', seriesName: e, name: t, excludeSeriesId: o });
      }
      function D(e, t, n, o) {
        I(n) || n.dispatchAction({ type: 'downplay', seriesName: e, name: t, excludeSeriesId: o });
      }
      const T = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), (n.newlineDisabled = !1), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.init = function () {
            (this.group.add((this._contentGroup = new M())),
              this.group.add((this._selectorGroup = new M())),
              (this._isFirstRender = !0));
          }),
          (t.prototype.getContentGroup = function () {
            return this._contentGroup;
          }),
          (t.prototype.getSelectorGroup = function () {
            return this._selectorGroup;
          }),
          (t.prototype.render = function (e, t, n) {
            var o = this._isFirstRender;
            if (((this._isFirstRender = !1), this.resetInner(), e.get('show', !0))) {
              var i = e.get('align'),
                a = e.get('orient');
              (i && 'auto' !== i) ||
                (i = 'right' === e.get('left') && 'vertical' === a ? 'right' : 'left');
              var s = e.get('selector', !0),
                l = e.get('selectorPosition', !0);
              (!s || (l && 'auto' !== l) || (l = 'horizontal' === a ? 'end' : 'start'),
                this.renderInner(i, e, t, n, s, a, l));
              var u = e.getBoxLayoutParams(),
                c = { width: n.getWidth(), height: n.getHeight() },
                p = e.get('padding'),
                d = y.dV(u, c, p),
                g = this.layoutInner(e, i, d, o, s, l),
                h = y.dV(r.defaults({ width: g.width, height: g.height }, u), c, p);
              ((this.group.x = h.x - g.x),
                (this.group.y = h.y - g.y),
                this.group.markRedraw(),
                this.group.add((this._backgroundEl = (0, m.P)(g, e))));
            }
          }),
          (t.prototype.resetInner = function () {
            (this.getContentGroup().removeAll(),
              this._backgroundEl && this.group.remove(this._backgroundEl),
              this.getSelectorGroup().removeAll());
          }),
          (t.prototype.renderInner = function (e, t, n, o, i, a, s) {
            var l = this.getContentGroup(),
              c = r.createHashMap(),
              p = t.get('selectedMode'),
              d = [];
            (n.eachRawSeries(function (e) {
              !e.get('legendHoverLink') && d.push(e.id);
            }),
              A(
                t.getData(),
                function (i, a) {
                  var s = i.get('name');
                  if (!this.newlineDisabled && ('' === s || '\n' === s)) {
                    var g = new M();
                    return ((g.newline = !0), void l.add(g));
                  }
                  var h = n.getSeriesByName(s)[0];
                  if (!c.get(s))
                    if (h) {
                      var f = h.getData(),
                        m = f.getVisual('legendLineStyle') || {},
                        y = f.getVisual('legendIcon'),
                        v = f.getVisual('style'),
                        x = this._createItem(h, s, a, i, t, e, m, v, y, p, o);
                      (x
                        .on('click', S(w, s, null, o, d))
                        .on('mouseover', S(C, h.name, null, o, d))
                        .on('mouseout', S(D, h.name, null, o, d)),
                        n.ssr &&
                          x.eachChild(function (e) {
                            var t = (0, b.z)(e);
                            ((t.seriesIndex = h.seriesIndex),
                              (t.dataIndex = a),
                              (t.ssrType = 'legend'));
                          }),
                        c.set(s, !0));
                    } else
                      n.eachRawSeries(function (l) {
                        if (!c.get(s) && l.legendVisualProvider) {
                          var g = l.legendVisualProvider;
                          if (!g.containName(s)) return;
                          var h = g.indexOfName(s),
                            f = g.getItemVisual(h, 'style'),
                            m = g.getItemVisual(h, 'legendIcon'),
                            y = (0, u.parse)(f.fill);
                          y &&
                            0 === y[3] &&
                            ((y[3] = 0.2),
                            (f = r.extend(r.extend({}, f), { fill: (0, u.stringify)(y, 'rgba') })));
                          var v = this._createItem(l, s, a, i, t, e, {}, f, m, p, o);
                          (v
                            .on('click', S(w, null, s, o, d))
                            .on('mouseover', S(C, null, s, o, d))
                            .on('mouseout', S(D, null, s, o, d)),
                            n.ssr &&
                              v.eachChild(function (e) {
                                var t = (0, b.z)(e);
                                ((t.seriesIndex = l.seriesIndex),
                                  (t.dataIndex = a),
                                  (t.ssrType = 'legend'));
                              }),
                            c.set(s, !0));
                        }
                      }, this);
                },
                this,
              ),
              i && this._createSelector(i, t, o, a, s));
          }),
          (t.prototype._createSelector = function (e, t, n, o, i) {
            var r = this.getSelectorGroup();
            A(e, function (e) {
              var o = e.type,
                i = new p.Ay({
                  style: { x: 0, y: 0, align: 'center', verticalAlign: 'middle' },
                  onclick: function () {
                    n.dispatchAction({
                      type: 'all' === o ? 'legendAllSelect' : 'legendInverseSelect',
                      legendId: t.id,
                    });
                  },
                });
              r.add(i);
              var a = t.getModel('selectorLabel'),
                s = t.getModel(['emphasis', 'selectorLabel']);
              ((0, f.qM)(i, { normal: a, emphasis: s }, { defaultText: e.title }), (0, h.iJ)(i));
            });
          }),
          (t.prototype._createItem = function (e, t, n, o, i, a, s, l, u, c, m) {
            var y,
              v,
              b,
              S = e.visualDrawType,
              w = i.get('itemWidth'),
              I = i.get('itemHeight'),
              C = i.isSelected(t),
              D = o.get('symbolRotate'),
              T = o.get('symbolKeepAspect'),
              P = o.get('icon'),
              k = (function (e, t, n, o, i, r, a) {
                function s(e, t) {
                  ('auto' === e.lineWidth && (e.lineWidth = t.lineWidth > 0 ? 2 : 0),
                    A(e, function (n, o) {
                      'inherit' === e[o] && (e[o] = t[o]);
                    }));
                }
                var l = t.getModel('itemStyle'),
                  u = l.getItemStyle(),
                  c = 0 === e.lastIndexOf('empty', 0) ? 'fill' : 'stroke',
                  p = l.getShallow('decal');
                ((u.decal = p && 'inherit' !== p ? (0, _.w)(p, a) : o.decal),
                  'inherit' === u.fill && (u.fill = o[i]),
                  'inherit' === u.stroke && (u.stroke = o[c]),
                  'inherit' === u.opacity && (u.opacity = ('fill' === i ? o : n).opacity),
                  s(u, o));
                var d = t.getModel('lineStyle'),
                  g = d.getLineStyle();
                if (
                  (s(g, n),
                  'auto' === u.fill && (u.fill = o.fill),
                  'auto' === u.stroke && (u.stroke = o.fill),
                  'auto' === g.stroke && (g.stroke = o.fill),
                  !r)
                ) {
                  var h = t.get('inactiveBorderWidth'),
                    f = u[c];
                  ((u.lineWidth = 'auto' === h ? (o.lineWidth > 0 && f ? 2 : 0) : u.lineWidth),
                    (u.fill = t.get('inactiveColor')),
                    (u.stroke = t.get('inactiveBorderColor')),
                    (g.stroke = d.get('inactiveColor')),
                    (g.lineWidth = d.get('inactiveWidth')));
                }
                return { itemStyle: u, lineStyle: g };
              })((u = P || u || 'roundRect'), o, s, l, S, C, m),
              G = new M(),
              O = o.getModel('textStyle');
            if (!r.isFunction(e.getLegendIcon) || (P && 'inherit' !== P)) {
              var z =
                'inherit' === P && e.getData().getVisual('symbol')
                  ? 'inherit' === D
                    ? e.getData().getVisual('symbolRotate')
                    : D
                  : 0;
              G.add(
                ((y = {
                  itemWidth: w,
                  itemHeight: I,
                  icon: u,
                  iconRotate: z,
                  itemStyle: k.itemStyle,
                  lineStyle: k.lineStyle,
                  symbolKeepAspect: T,
                }),
                (v = y.icon || 'roundRect'),
                (b = (0, x.v5)(
                  v,
                  0,
                  0,
                  y.itemWidth,
                  y.itemHeight,
                  y.itemStyle.fill,
                  y.symbolKeepAspect,
                )).setStyle(y.itemStyle),
                (b.rotation = ((y.iconRotate || 0) * Math.PI) / 180),
                b.setOrigin([y.itemWidth / 2, y.itemHeight / 2]),
                v.indexOf('empty') > -1 &&
                  ((b.style.stroke = b.style.fill),
                  (b.style.fill = '#fff'),
                  (b.style.lineWidth = 2)),
                b),
              );
            } else
              G.add(
                e.getLegendIcon({
                  itemWidth: w,
                  itemHeight: I,
                  icon: u,
                  iconRotate: D,
                  itemStyle: k.itemStyle,
                  lineStyle: k.lineStyle,
                  symbolKeepAspect: T,
                }),
              );
            var L = 'left' === a ? w + 5 : -5,
              R = a,
              N = i.get('formatter'),
              B = t;
            r.isString(N) && N
              ? (B = N.replace('{name}', null != t ? t : ''))
              : r.isFunction(N) && (B = N(t));
            var V = C ? O.getTextColor() : o.get('inactiveColor');
            G.add(
              new p.Ay({
                style: (0, f.VB)(
                  O,
                  { text: B, x: L, y: I / 2, fill: V, align: R, verticalAlign: 'middle' },
                  { inheritColor: V },
                ),
              }),
            );
            var E = new d.A({ shape: G.getBoundingRect(), style: { fill: 'transparent' } }),
              W = o.getModel('tooltip');
            return (
              W.get('show') &&
                g.setTooltipConfig({
                  el: E,
                  componentModel: i,
                  itemName: t,
                  itemTooltipOption: W.option,
                }),
              G.add(E),
              G.eachChild(function (e) {
                e.silent = !0;
              }),
              (E.silent = !c),
              this.getContentGroup().add(G),
              (0, h.iJ)(G),
              (G.__legendDataIndex = n),
              G
            );
          }),
          (t.prototype.layoutInner = function (e, t, n, o, i, r) {
            var a = this.getContentGroup(),
              s = this.getSelectorGroup();
            y.aP(e.get('orient'), a, e.get('itemGap'), n.width, n.height);
            var l = a.getBoundingRect(),
              u = [-l.x, -l.y];
            if ((s.markRedraw(), a.markRedraw(), i)) {
              y.aP('horizontal', s, e.get('selectorItemGap', !0));
              var c = s.getBoundingRect(),
                p = [-c.x, -c.y],
                d = e.get('selectorButtonGap', !0),
                g = e.getOrient().index,
                h = 0 === g ? 'width' : 'height',
                f = 0 === g ? 'height' : 'width',
                m = 0 === g ? 'y' : 'x';
              ('end' === r ? (p[g] += l[h] + d) : (u[g] += c[h] + d),
                (p[1 - g] += l[f] / 2 - c[f] / 2),
                (s.x = p[0]),
                (s.y = p[1]),
                (a.x = u[0]),
                (a.y = u[1]));
              var v = { x: 0, y: 0 };
              return (
                (v[h] = l[h] + d + c[h]),
                (v[f] = Math.max(l[f], c[f])),
                (v[m] = Math.min(0, c[m] + p[1 - g])),
                v
              );
            }
            return ((a.x = u[0]), (a.y = u[1]), this.group.getBoundingRect());
          }),
          (t.prototype.remove = function () {
            (this.getContentGroup().removeAll(), (this._isFirstRender = !0));
          }),
          (t.type = 'legend.plain'),
          t
        );
      })(v.A);
      function P(e) {
        var t = e.findComponents({ mainType: 'legend' });
        t &&
          t.length &&
          e.filterSeries(function (e) {
            for (var n = 0; n < t.length; n++) if (!t[n].isSelected(e.name)) return !1;
            return !0;
          });
      }
      function k(e, t, n) {
        var o = 'allSelect' === e || 'inverseSelect' === e,
          i = {},
          a = [];
        n.eachComponent({ mainType: 'legend', query: t }, function (n) {
          (o ? n[e]() : n[e](t.name), G(n, i), a.push(n.componentIndex));
        });
        var s = {};
        return (
          n.eachComponent('legend', function (e) {
            ((0, r.each)(i, function (t, n) {
              e[t ? 'select' : 'unSelect'](n);
            }),
              G(e, s));
          }),
          o ? { selected: s, legendIndex: a } : { name: t.name, selected: s }
        );
      }
      function G(e, t) {
        var n = t || {};
        return (
          (0, r.each)(e.getData(), function (t) {
            var o = t.get('name');
            if ('\n' !== o && '' !== o) {
              var i = e.isSelected(o);
              (0, r.hasOwn)(n, o) ? (n[o] = n[o] && i) : (n[o] = i);
            }
          }),
          n
        );
      }
      function O(e) {
        (e.registerComponentModel(l),
          e.registerComponentView(T),
          e.registerProcessor(e.PRIORITY.PROCESSOR.SERIES_FILTER, P),
          e.registerSubTypeDefaulter('legend', function () {
            return 'plain';
          }),
          (function (e) {
            (e.registerAction(
              'legendToggleSelect',
              'legendselectchanged',
              (0, r.curry)(k, 'toggleSelected'),
            ),
              e.registerAction('legendAllSelect', 'legendselectall', (0, r.curry)(k, 'allSelect')),
              e.registerAction(
                'legendInverseSelect',
                'legendinverseselect',
                (0, r.curry)(k, 'inverseSelect'),
              ),
              e.registerAction('legendSelect', 'legendselected', (0, r.curry)(k, 'select')),
              e.registerAction('legendUnSelect', 'legendunselected', (0, r.curry)(k, 'unSelect')));
          })(e));
      }
      var z = n(612616);
      function L(e, t, n) {
        var o = [1, 1];
        ((o[e.getOrient().index] = 0), (0, y.YA)(t, n, { type: 'box', ignoreSize: !!o }));
      }
      const R = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.setScrollDataIndex = function (e) {
            this.option.scrollDataIndex = e;
          }),
          (t.prototype.init = function (t, n, o) {
            var i = (0, y.vs)(t);
            (e.prototype.init.call(this, t, n, o), L(this, t, i));
          }),
          (t.prototype.mergeOption = function (t, n) {
            (e.prototype.mergeOption.call(this, t, n), L(this, this.option, t));
          }),
          (t.type = 'legend.scroll'),
          (t.defaultOption = (0, z.G_)(l.defaultOption, {
            scrollDataIndex: 0,
            pageButtonItemGap: 5,
            pageButtonGap: null,
            pageButtonPosition: 'end',
            pageFormatter: '{current}/{total}',
            pageIcons: {
              horizontal: ['M0,0L12,-10L12,10z', 'M0,0L-12,-10L-12,10z'],
              vertical: ['M0,0L20,0L10,-20z', 'M0,0L20,0L10,20z'],
            },
            pageIconColor: '#2f4554',
            pageIconInactiveColor: '#aaa',
            pageIconSize: 15,
            pageTextStyle: { color: '#333' },
            animationDurationUpdate: 800,
          })),
          t
        );
      })(l);
      var N = n(683257),
        B = c.A,
        V = ['width', 'height'],
        E = ['x', 'y'];
      const W = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), (n.newlineDisabled = !0), (n._currentIndex = 0), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.init = function () {
            (e.prototype.init.call(this),
              this.group.add((this._containerGroup = new B())),
              this._containerGroup.add(this.getContentGroup()),
              this.group.add((this._controllerGroup = new B())));
          }),
          (t.prototype.resetInner = function () {
            (e.prototype.resetInner.call(this),
              this._controllerGroup.removeAll(),
              this._containerGroup.removeClipPath(),
              (this._containerGroup.__rectSize = null));
          }),
          (t.prototype.renderInner = function (t, n, o, i, a, s, l) {
            var u = this;
            e.prototype.renderInner.call(this, t, n, o, i, a, s, l);
            var c = this._controllerGroup,
              d = n.get('pageIconSize', !0),
              h = r.isArray(d) ? d : [d, d];
            m('pagePrev', 0);
            var f = n.getModel('pageTextStyle');
            function m(e, t) {
              var o = e + 'DataIndex',
                a = g.createIcon(
                  n.get('pageIcons', !0)[n.getOrient().name][t],
                  { onclick: r.bind(u._pageGo, u, o, n, i) },
                  { x: -h[0] / 2, y: -h[1] / 2, width: h[0], height: h[1] },
                );
              ((a.name = e), c.add(a));
            }
            (c.add(
              new p.Ay({
                name: 'pageText',
                style: {
                  text: 'xx/xx',
                  fill: f.getTextColor(),
                  font: f.getFont(),
                  verticalAlign: 'middle',
                  align: 'center',
                },
                silent: !0,
              }),
            ),
              m('pageNext', 1));
          }),
          (t.prototype.layoutInner = function (e, t, n, o, i, a) {
            var s = this.getSelectorGroup(),
              l = e.getOrient().index,
              u = V[l],
              c = E[l],
              p = V[1 - l],
              d = E[1 - l];
            i && y.aP('horizontal', s, e.get('selectorItemGap', !0));
            var g = e.get('selectorButtonGap', !0),
              h = s.getBoundingRect(),
              f = [-h.x, -h.y],
              m = r.clone(n);
            i && (m[u] = n[u] - h[u] - g);
            var v = this._layoutContentAndController(e, o, m, l, u, p, d, c);
            if (i) {
              if ('end' === a) f[l] += v[u] + g;
              else {
                var x = h[u] + g;
                ((f[l] -= x), (v[c] -= x));
              }
              ((v[u] += h[u] + g),
                (f[1 - l] += v[d] + v[p] / 2 - h[p] / 2),
                (v[p] = Math.max(v[p], h[p])),
                (v[d] = Math.min(v[d], h[d] + f[1 - l])),
                (s.x = f[0]),
                (s.y = f[1]),
                s.markRedraw());
            }
            return v;
          }),
          (t.prototype._layoutContentAndController = function (e, t, n, o, i, a, s, l) {
            var u = this.getContentGroup(),
              c = this._containerGroup,
              p = this._controllerGroup;
            (y.aP(e.get('orient'), u, e.get('itemGap'), o ? n.width : null, o ? null : n.height),
              y.aP('horizontal', p, e.get('pageButtonItemGap', !0)));
            var g = u.getBoundingRect(),
              h = p.getBoundingRect(),
              f = (this._showController = g[i] > n[i]),
              m = [-g.x, -g.y];
            t || (m[o] = u[l]);
            var v = [0, 0],
              x = [-h.x, -h.y],
              _ = r.retrieve2(e.get('pageButtonGap', !0), e.get('itemGap', !0));
            (f &&
              ('end' === e.get('pageButtonPosition', !0)
                ? (x[o] += n[i] - h[i])
                : (v[o] += h[i] + _)),
              (x[1 - o] += g[a] / 2 - h[a] / 2),
              u.setPosition(m),
              c.setPosition(v),
              p.setPosition(x));
            var b = { x: 0, y: 0 };
            if (
              ((b[i] = f ? n[i] : g[i]),
              (b[a] = Math.max(g[a], h[a])),
              (b[s] = Math.min(0, h[s] + x[1 - o])),
              (c.__rectSize = n[i]),
              f)
            ) {
              var S = { x: 0, y: 0 };
              ((S[i] = Math.max(n[i] - h[i] - _, 0)),
                (S[a] = b[a]),
                c.setClipPath(new d.A({ shape: S })),
                (c.__rectSize = S[i]));
            } else
              p.eachChild(function (e) {
                e.attr({ invisible: !0, silent: !0 });
              });
            var A = this._getPageInfo(e);
            return (
              null != A.pageIndex &&
                N.oi(u, { x: A.contentPosition[0], y: A.contentPosition[1] }, f ? e : null),
              this._updatePageInfoView(e, A),
              b
            );
          }),
          (t.prototype._pageGo = function (e, t, n) {
            var o = this._getPageInfo(t)[e];
            null != o &&
              n.dispatchAction({ type: 'legendScroll', scrollDataIndex: o, legendId: t.id });
          }),
          (t.prototype._updatePageInfoView = function (e, t) {
            var n = this._controllerGroup;
            r.each(['pagePrev', 'pageNext'], function (o) {
              var i = null != t[o + 'DataIndex'],
                r = n.childOfName(o);
              r &&
                (r.setStyle(
                  'fill',
                  i ? e.get('pageIconColor', !0) : e.get('pageIconInactiveColor', !0),
                ),
                (r.cursor = i ? 'pointer' : 'default'));
            });
            var o = n.childOfName('pageText'),
              i = e.get('pageFormatter'),
              a = t.pageIndex,
              s = null != a ? a + 1 : 0,
              l = t.pageCount;
            o &&
              i &&
              o.setStyle(
                'text',
                r.isString(i)
                  ? i
                      .replace('{current}', null == s ? '' : s + '')
                      .replace('{total}', null == l ? '' : l + '')
                  : i({ current: s, total: l }),
              );
          }),
          (t.prototype._getPageInfo = function (e) {
            var t = e.get('scrollDataIndex', !0),
              n = this.getContentGroup(),
              o = this._containerGroup.__rectSize,
              i = e.getOrient().index,
              r = V[i],
              a = E[i],
              s = this._findTargetItemIndex(t),
              l = n.children(),
              u = l[s],
              c = l.length,
              p = c ? 1 : 0,
              d = {
                contentPosition: [n.x, n.y],
                pageCount: p,
                pageIndex: p - 1,
                pagePrevDataIndex: null,
                pageNextDataIndex: null,
              };
            if (!u) return d;
            var g = v(u);
            d.contentPosition[i] = -g.s;
            for (var h = s + 1, f = g, m = g, y = null; h <= c; ++h)
              (((!(y = v(l[h])) && m.e > f.s + o) || (y && !x(y, f.s))) &&
                (f = m.i > f.i ? m : y) &&
                (null == d.pageNextDataIndex && (d.pageNextDataIndex = f.i), ++d.pageCount),
                (m = y));
            for (h = s - 1, f = g, m = g, y = null; h >= -1; --h)
              (((y = v(l[h])) && x(m, y.s)) ||
                !(f.i < m.i) ||
                ((m = f),
                null == d.pagePrevDataIndex && (d.pagePrevDataIndex = f.i),
                ++d.pageCount,
                ++d.pageIndex),
                (f = y));
            return d;
            function v(e) {
              if (e) {
                var t = e.getBoundingRect(),
                  n = t[a] + e[a];
                return { s: n, e: n + t[r], i: e.__legendDataIndex };
              }
            }
            function x(e, t) {
              return e.e >= t && e.s <= t + o;
            }
          }),
          (t.prototype._findTargetItemIndex = function (e) {
            return this._showController
              ? (this.getContentGroup().eachChild(function (o, i) {
                  var r = o.__legendDataIndex;
                  (null == n && null != r && (n = i), r === e && (t = i));
                }),
                null != t ? t : n)
              : 0;
            var t, n;
          }),
          (t.type = 'legend.scroll'),
          t
        );
      })(T);
      function F(e) {
        ((0, o.Y)(O),
          e.registerComponentModel(R),
          e.registerComponentView(W),
          (function (e) {
            e.registerAction('legendScroll', 'legendscroll', function (e, t) {
              var n = e.scrollDataIndex;
              null != n &&
                t.eachComponent({ mainType: 'legend', subType: 'scroll', query: e }, function (e) {
                  e.setScrollDataIndex(n);
                });
            });
          })(e));
      }
      function Y(e) {
        ((0, o.Y)(O), (0, o.Y)(F));
      }
    },
    82802: (e, t, n) => {
      n.d(t, { A: () => g });
      var o = n(15215),
        i = n(498026),
        r = n(738123),
        a = n(609427),
        s = n(515915),
        l = n(48170),
        u = n(603961);
      function c(e) {
        (0, l.M5)(e, 'label', ['show']);
      }
      var p = (0, l.$r)(),
        d = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), (n.createdBySelf = !1), n);
          }
          return (
            (0, o.__extends)(t, e),
            (t.prototype.init = function (e, t, n) {
              (this.mergeDefaultAndTheme(e, n), this._mergeOption(e, n, !1, !0));
            }),
            (t.prototype.isAnimationEnabled = function () {
              if (r.A.node) return !1;
              var e = this.__hostSeries;
              return this.getShallow('animation') && e && e.isAnimationEnabled();
            }),
            (t.prototype.mergeOption = function (e, t) {
              this._mergeOption(e, t, !1, !1);
            }),
            (t.prototype._mergeOption = function (e, t, n, o) {
              var r = this.mainType;
              n ||
                t.eachSeries(function (e) {
                  var n = e.get(this.mainType, !0),
                    a = p(e)[r];
                  n && n.data
                    ? (a
                        ? a._mergeOption(n, t, !0)
                        : (o && c(n),
                          i.each(n.data, function (e) {
                            e instanceof Array ? (c(e[0]), c(e[1])) : c(e);
                          }),
                          (a = this.createMarkerModelFromSeries(n, this, t)),
                          i.extend(a, {
                            mainType: this.mainType,
                            seriesIndex: e.seriesIndex,
                            name: e.name,
                            createdBySelf: !0,
                          }),
                          (a.__hostSeries = e)),
                      (p(e)[r] = a))
                    : (p(e)[r] = null);
                }, this);
            }),
            (t.prototype.formatTooltip = function (e, t, n) {
              var o = this.getData(),
                i = this.getRawValue(e),
                r = o.getName(e);
              return (0, u.Qx)('section', {
                header: this.name,
                blocks: [
                  (0, u.Qx)('nameValue', { name: r, value: i, noName: !r, noValue: null == i }),
                ],
              });
            }),
            (t.prototype.getData = function () {
              return this._data;
            }),
            (t.prototype.setData = function (e) {
              this._data = e;
            }),
            (t.prototype.getDataParams = function (e, t) {
              var n = a.J.prototype.getDataParams.call(this, e, t),
                o = this.__hostSeries;
              return (
                o && ((n.seriesId = o.id), (n.seriesName = o.name), (n.seriesType = o.subType)),
                n
              );
            }),
            (t.getMarkerModelFromSeries = function (e, t) {
              return p(e)[t];
            }),
            (t.type = 'marker'),
            (t.dependencies = ['series', 'grid', 'polar', 'geo']),
            t
          );
        })(s.A);
      i.mixin(d, a.J.prototype);
      const g = d;
    },
    201854: (e, t, n) => {
      n.d(t, { A: () => c });
      var o = n(15215),
        i = n(659109),
        r = n(498026),
        a = n(82802),
        s = n(48170),
        l = n(34833),
        u = (0, s.$r)();
      const c = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.init = function () {
            this.markerGroupMap = (0, r.createHashMap)();
          }),
          (t.prototype.render = function (e, t, n) {
            var o = this,
              i = this.markerGroupMap;
            (i.each(function (e) {
              u(e).keep = !1;
            }),
              t.eachSeries(function (e) {
                var i = a.A.getMarkerModelFromSeries(e, o.type);
                i && o.renderSeries(e, i, t, n);
              }),
              i.each(function (e) {
                !u(e).keep && o.group.remove(e.group);
              }));
          }),
          (t.prototype.markKeep = function (e) {
            u(e).keep = !0;
          }),
          (t.prototype.toggleBlurSeries = function (e, t) {
            var n = this;
            (0, r.each)(e, function (e) {
              var o = a.A.getMarkerModelFromSeries(e, n.type);
              o &&
                o.getData().eachItemGraphicEl(function (e) {
                  e && (t ? (0, l.QX)(e) : (0, l.JC)(e));
                });
            });
          }),
          (t.type = 'marker'),
          t
        );
      })(i.A);
    },
    772581: (e, t, n) => {
      n.d(t, { A: () => i });
      var o = n(498026);
      function i(e, t) {
        if (!e) return !1;
        for (var n = (0, o.isArray)(e) ? e : [e], i = 0; i < n.length; i++)
          if (n[i] && n[i][t]) return !0;
        return !1;
      }
    },
    839838: (e, t, n) => {
      n.d(t, { a: () => k });
      var o = n(772581),
        i = n(15215),
        r = n(82802);
      const a = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.createMarkerModelFromSeries = function (e, n, o) {
            return new t(e, n, o);
          }),
          (t.type = 'markArea'),
          (t.defaultOption = {
            z: 1,
            tooltip: { trigger: 'item' },
            animation: !1,
            label: { show: !0, position: 'top' },
            itemStyle: { borderWidth: 0 },
            emphasis: { label: { show: !0, position: 'top' } },
          }),
          t
        );
      })(r.A);
      var s = n(747698),
        l = n(6006),
        u = n(624326),
        c = n(843870),
        p = n(252505),
        d = n(683257),
        g = n(34833),
        h = n(371171),
        f = n(201854),
        m = n(498026),
        y = n(741849),
        v = n(48170),
        x = n(337395),
        _ = n(289632),
        b = n(669622),
        S = n(731825),
        A = (0, v.$r)(),
        M = function (e, t, n, o) {
          var i = o[0],
            r = o[1];
          if (i && r) {
            var a = h.xx(e, i),
              s = h.xx(e, r),
              l = a.coord,
              u = s.coord;
            ((l[0] = (0, m.retrieve)(l[0], -1 / 0)),
              (l[1] = (0, m.retrieve)(l[1], -1 / 0)),
              (u[0] = (0, m.retrieve)(u[0], 1 / 0)),
              (u[1] = (0, m.retrieve)(u[1], 1 / 0)));
            var c = (0, m.mergeAll)([{}, a, s]);
            return (
              (c.coord = [a.coord, s.coord]),
              (c.x0 = a.x),
              (c.y0 = a.y),
              (c.x1 = s.x),
              (c.y1 = s.y),
              c
            );
          }
        };
      function w(e) {
        return !isNaN(e) && !isFinite(e);
      }
      function I(e, t, n, o) {
        var i = 1 - e;
        return w(t[i]) && w(n[i]);
      }
      function C(e, t) {
        var n = t.coord[0],
          o = t.coord[1],
          i = { coord: n, x: t.x0, y: t.y0 },
          r = { coord: o, x: t.x1, y: t.y1 };
        return (0, y.g)(e, 'cartesian2d')
          ? !(!n || !o || (!I(1, n, o) && !I(0, n, o))) || h.PN(e, i, r)
          : h.Lq(e, i) || h.Lq(e, r);
      }
      function D(e, t, n, o, i) {
        var r,
          a = o.coordinateSystem,
          s = e.getItemModel(t),
          l = u.lo(s.get(n[0]), i.getWidth()),
          c = u.lo(s.get(n[1]), i.getHeight());
        if (isNaN(l) || isNaN(c)) {
          if (o.getMarkerPosition) {
            var p = e.getValues(['x0', 'y0'], t),
              d = e.getValues(['x1', 'y1'], t),
              g = a.clampData(p),
              h = a.clampData(d),
              f = [];
            ('x0' === n[0]
              ? (f[0] = g[0] > h[0] ? d[0] : p[0])
              : (f[0] = g[0] > h[0] ? p[0] : d[0]),
              'y0' === n[1]
                ? (f[1] = g[1] > h[1] ? d[1] : p[1])
                : (f[1] = g[1] > h[1] ? p[1] : d[1]),
              (r = o.getMarkerPosition(f, n, !0)));
          } else {
            var m = [(_ = e.get(n[0], t)), (b = e.get(n[1], t))];
            (a.clampData && a.clampData(m, m), (r = a.dataToPoint(m, !0)));
          }
          if ((0, y.g)(a, 'cartesian2d')) {
            var v = a.getAxis('x'),
              x = a.getAxis('y'),
              _ = e.get(n[0], t),
              b = e.get(n[1], t);
            w(_)
              ? (r[0] = v.toGlobalCoord(v.getExtent()['x0' === n[0] ? 0 : 1]))
              : w(b) && (r[1] = x.toGlobalCoord(x.getExtent()['y0' === n[1] ? 0 : 1]));
          }
          (isNaN(l) || (r[0] = l), isNaN(c) || (r[1] = c));
        } else r = [l, c];
        return r;
      }
      var T = [
        ['x0', 'y0'],
        ['x1', 'y0'],
        ['x1', 'y1'],
        ['x0', 'y1'],
      ];
      const P = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.updateTransform = function (e, t, n) {
            t.eachSeries(function (e) {
              var t = r.A.getMarkerModelFromSeries(e, 'markArea');
              if (t) {
                var o = t.getData();
                o.each(function (t) {
                  var i = (0, m.map)(T, function (i) {
                    return D(o, t, i, e, n);
                  });
                  (o.setItemLayout(t, i), o.getItemGraphicEl(t).setShape('points', i));
                });
              }
            }, this);
          }),
          (t.prototype.renderSeries = function (e, t, n, o) {
            var i = e.coordinateSystem,
              r = e.id,
              a = e.getData(),
              h = this.markerGroupMap,
              f = h.get(r) || h.set(r, { group: new c.A() });
            (this.group.add(f.group), this.markKeep(f));
            var y = (function (e, t, n) {
              var o, i;
              if (e) {
                var r = (0, m.map)(e && e.dimensions, function (e) {
                  var n = t.getData(),
                    o = n.getDimensionInfo(n.mapDimension(e)) || {};
                  return (0, m.extend)((0, m.extend)({}, o), { name: e, ordinalMeta: null });
                });
                ((i = (0, m.map)(['x0', 'y0', 'x1', 'y1'], function (e, t) {
                  return { name: e, type: r[t % 2].type };
                })),
                  (o = new l.A(i, n)));
              } else ((i = [{ name: 'value', type: 'float' }]), (o = new l.A(i, n)));
              var a = (0, m.map)(n.get('data'), (0, m.curry)(M, t, e, n));
              e && (a = (0, m.filter)(a, (0, m.curry)(C, e)));
              var s = e
                ? function (e, t, n, o) {
                    var r = e.coord[Math.floor(o / 2)][o % 2];
                    return (0, S.Pn)(r, i[o]);
                  }
                : function (e, t, n, o) {
                    return (0, S.Pn)(e.value, i[o]);
                  };
              return (o.initData(a, null, s), (o.hasItemOption = !0), o);
            })(i, e, t);
            (t.setData(y),
              y.each(function (t) {
                var n = (0, m.map)(T, function (n) {
                    return D(y, t, n, e, o);
                  }),
                  r = i.getAxis('x').scale,
                  l = i.getAxis('y').scale,
                  c = r.getExtent(),
                  p = l.getExtent(),
                  d = [r.parse(y.get('x0', t)), r.parse(y.get('x1', t))],
                  g = [l.parse(y.get('y0', t)), l.parse(y.get('y1', t))];
                (u.Y6(d), u.Y6(g));
                var h = !!(c[0] > d[1] || c[1] < d[0] || p[0] > g[1] || p[1] < g[0]);
                y.setItemLayout(t, { points: n, allClipped: h });
                var f = y.getItemModel(t).getModel('itemStyle').getItemStyle(),
                  v = (0, x.rI)(a, 'color');
                (f.fill ||
                  ((f.fill = v), (0, m.isString)(f.fill) && (f.fill = s.modifyAlpha(f.fill, 0.4))),
                  f.stroke || (f.stroke = v),
                  y.setItemVisual(t, 'style', f));
              }),
              y
                .diff(A(f).data)
                .add(function (e) {
                  var t = y.getItemLayout(e);
                  if (!t.allClipped) {
                    var n = new p.A({ shape: { points: t.points } });
                    (y.setItemGraphicEl(e, n), f.group.add(n));
                  }
                })
                .update(function (e, n) {
                  var o = A(f).data.getItemGraphicEl(n),
                    i = y.getItemLayout(e);
                  i.allClipped
                    ? o && f.group.remove(o)
                    : (o
                        ? d.oi(o, { shape: { points: i.points } }, t, e)
                        : (o = new p.A({ shape: { points: i.points } })),
                      y.setItemGraphicEl(e, o),
                      f.group.add(o));
                })
                .remove(function (e) {
                  var t = A(f).data.getItemGraphicEl(e);
                  f.group.remove(t);
                })
                .execute(),
              y.eachItemGraphicEl(function (e, n) {
                var o = y.getItemModel(n),
                  i = y.getItemVisual(n, 'style');
                (e.useStyle(y.getItemVisual(n, 'style')),
                  (0, _.qM)(e, (0, _.lx)(o), {
                    labelFetcher: t,
                    labelDataIndex: n,
                    defaultText: y.getName(n) || '',
                    inheritColor: (0, m.isString)(i.fill) ? s.modifyAlpha(i.fill, 1) : '#000',
                  }),
                  (0, g.Mx)(e, o),
                  (0, g.Lm)(e, null, null, o.get(['emphasis', 'disabled'])),
                  ((0, b.z)(e).dataModel = t));
              }),
              (A(f).data = y),
              (f.group.silent = t.get('silent') || e.get('silent')));
          }),
          (t.type = 'markArea'),
          t
        );
      })(f.A);
      function k(e) {
        (e.registerComponentModel(a),
          e.registerComponentView(P),
          e.registerPreprocessor(function (e) {
            (0, o.A)(e.series, 'markArea') && (e.markArea = e.markArea || {});
          }));
      }
    },
    842998: (e, t, n) => {
      n.d(t, { a: () => w });
      var o = n(772581),
        i = n(15215),
        r = n(82802);
      const a = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.createMarkerModelFromSeries = function (e, n, o) {
            return new t(e, n, o);
          }),
          (t.type = 'markLine'),
          (t.defaultOption = {
            z: 5,
            symbol: ['circle', 'arrow'],
            symbolSize: [8, 16],
            symbolOffset: 0,
            precision: 2,
            tooltip: { trigger: 'item' },
            label: { show: !0, position: 'end', distance: 5 },
            lineStyle: { type: 'dashed' },
            emphasis: { label: { show: !0 }, lineStyle: { width: 3 } },
            animationEasing: 'linear',
          }),
          t
        );
      })(r.A);
      var s = n(6006),
        l = n(624326),
        u = n(371171),
        c = n(564380),
        p = n(201854),
        d = n(265008),
        g = n(741849),
        h = n(669622),
        f = n(498026),
        m = n(48170),
        y = n(337395),
        v = (0, m.$r)(),
        x = function (e, t, n, o) {
          var i,
            r = e.getData();
          if ((0, f.isArray)(o)) i = o;
          else {
            var a = o.type;
            if (
              'min' === a ||
              'max' === a ||
              'average' === a ||
              'median' === a ||
              null != o.xAxis ||
              null != o.yAxis
            ) {
              var s = void 0,
                l = void 0;
              if (null != o.yAxis || null != o.xAxis)
                ((s = t.getAxis(null != o.yAxis ? 'y' : 'x')),
                  (l = (0, f.retrieve)(o.yAxis, o.xAxis)));
              else {
                var c = u.Yc(o, r, t, e);
                s = c.valueAxis;
                var p = (0, d.me)(r, c.valueDataDim);
                l = u.vz(r, p, a);
              }
              var g = 'x' === s.dim ? 0 : 1,
                h = 1 - g,
                m = (0, f.clone)(o),
                y = { coord: [] };
              ((m.type = null), (m.coord = []), (m.coord[h] = -1 / 0), (y.coord[h] = 1 / 0));
              var v = n.get('precision');
              (v >= 0 && (0, f.isNumber)(l) && (l = +l.toFixed(Math.min(v, 20))),
                (m.coord[g] = y.coord[g] = l),
                (i = [m, y, { type: a, valueIndex: o.valueIndex, value: l }]));
            } else i = [];
          }
          var x = [u.xx(e, i[0]), u.xx(e, i[1]), (0, f.extend)({}, i[2])];
          return (
            (x[2].type = x[2].type || null),
            (0, f.merge)(x[2], x[0]),
            (0, f.merge)(x[2], x[1]),
            x
          );
        };
      function _(e) {
        return !isNaN(e) && !isFinite(e);
      }
      function b(e, t, n, o) {
        var i = 1 - e,
          r = o.dimensions[e];
        return _(t[i]) && _(n[i]) && t[e] === n[e] && o.getAxis(r).containData(t[e]);
      }
      function S(e, t) {
        if ('cartesian2d' === e.type) {
          var n = t[0].coord,
            o = t[1].coord;
          if (n && o && (b(1, n, o, e) || b(0, n, o, e))) return !0;
        }
        return u.Lq(e, t[0]) && u.Lq(e, t[1]);
      }
      function A(e, t, n, o, i) {
        var r,
          a = o.coordinateSystem,
          s = e.getItemModel(t),
          u = l.lo(s.get('x'), i.getWidth()),
          c = l.lo(s.get('y'), i.getHeight());
        if (isNaN(u) || isNaN(c)) {
          if (o.getMarkerPosition) r = o.getMarkerPosition(e.getValues(e.dimensions, t));
          else {
            var p = a.dimensions,
              d = e.get(p[0], t),
              h = e.get(p[1], t);
            r = a.dataToPoint([d, h]);
          }
          if ((0, g.g)(a, 'cartesian2d')) {
            var f = a.getAxis('x'),
              m = a.getAxis('y');
            ((p = a.dimensions),
              _(e.get(p[0], t))
                ? (r[0] = f.toGlobalCoord(f.getExtent()[n ? 0 : 1]))
                : _(e.get(p[1], t)) && (r[1] = m.toGlobalCoord(m.getExtent()[n ? 0 : 1])));
          }
          (isNaN(u) || (r[0] = u), isNaN(c) || (r[1] = c));
        } else r = [u, c];
        e.setItemLayout(t, r);
      }
      const M = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.updateTransform = function (e, t, n) {
            t.eachSeries(function (e) {
              var t = r.A.getMarkerModelFromSeries(e, 'markLine');
              if (t) {
                var o = t.getData(),
                  i = v(t).from,
                  a = v(t).to;
                (i.each(function (t) {
                  (A(i, t, !0, e, n), A(a, t, !1, e, n));
                }),
                  o.each(function (e) {
                    o.setItemLayout(e, [i.getItemLayout(e), a.getItemLayout(e)]);
                  }),
                  this.markerGroupMap.get(e.id).updateLayout());
              }
            }, this);
          }),
          (t.prototype.renderSeries = function (e, t, n, o) {
            var i = e.coordinateSystem,
              r = e.id,
              a = e.getData(),
              l = this.markerGroupMap,
              p = l.get(r) || l.set(r, new c.A());
            this.group.add(p.group);
            var d = (function (e, t, n) {
                var o;
                o = e
                  ? (0, f.map)(e && e.dimensions, function (e) {
                      var n = t.getData().getDimensionInfo(t.getData().mapDimension(e)) || {};
                      return (0, f.extend)((0, f.extend)({}, n), { name: e, ordinalMeta: null });
                    })
                  : [{ name: 'value', type: 'float' }];
                var i = new s.A(o, n),
                  r = new s.A(o, n),
                  a = new s.A([], n),
                  l = (0, f.map)(n.get('data'), (0, f.curry)(x, t, e, n));
                e && (l = (0, f.filter)(l, (0, f.curry)(S, e)));
                var c = u.fY(!!e, o);
                return (
                  i.initData(
                    (0, f.map)(l, function (e) {
                      return e[0];
                    }),
                    null,
                    c,
                  ),
                  r.initData(
                    (0, f.map)(l, function (e) {
                      return e[1];
                    }),
                    null,
                    c,
                  ),
                  a.initData(
                    (0, f.map)(l, function (e) {
                      return e[2];
                    }),
                  ),
                  (a.hasItemOption = !0),
                  { from: i, to: r, line: a }
                );
              })(i, e, t),
              g = d.from,
              m = d.to,
              _ = d.line;
            ((v(t).from = g), (v(t).to = m), t.setData(_));
            var b = t.get('symbol'),
              M = t.get('symbolSize'),
              w = t.get('symbolRotate'),
              I = t.get('symbolOffset');
            function C(t, n, i) {
              var r = t.getItemModel(n);
              A(t, n, i, e, o);
              var s = r.getModel('itemStyle').getItemStyle();
              (null == s.fill && (s.fill = (0, y.rI)(a, 'color')),
                t.setItemVisual(n, {
                  symbolKeepAspect: r.get('symbolKeepAspect'),
                  symbolOffset: (0, f.retrieve2)(r.get('symbolOffset', !0), I[i ? 0 : 1]),
                  symbolRotate: (0, f.retrieve2)(r.get('symbolRotate', !0), w[i ? 0 : 1]),
                  symbolSize: (0, f.retrieve2)(r.get('symbolSize'), M[i ? 0 : 1]),
                  symbol: (0, f.retrieve2)(r.get('symbol', !0), b[i ? 0 : 1]),
                  style: s,
                }));
            }
            ((0, f.isArray)(b) || (b = [b, b]),
              (0, f.isArray)(M) || (M = [M, M]),
              (0, f.isArray)(w) || (w = [w, w]),
              (0, f.isArray)(I) || (I = [I, I]),
              d.from.each(function (e) {
                (C(g, e, !0), C(m, e, !1));
              }),
              _.each(function (e) {
                var t = _.getItemModel(e).getModel('lineStyle').getLineStyle();
                (_.setItemLayout(e, [g.getItemLayout(e), m.getItemLayout(e)]),
                  null == t.stroke && (t.stroke = g.getItemVisual(e, 'style').fill),
                  _.setItemVisual(e, {
                    fromSymbolKeepAspect: g.getItemVisual(e, 'symbolKeepAspect'),
                    fromSymbolOffset: g.getItemVisual(e, 'symbolOffset'),
                    fromSymbolRotate: g.getItemVisual(e, 'symbolRotate'),
                    fromSymbolSize: g.getItemVisual(e, 'symbolSize'),
                    fromSymbol: g.getItemVisual(e, 'symbol'),
                    toSymbolKeepAspect: m.getItemVisual(e, 'symbolKeepAspect'),
                    toSymbolOffset: m.getItemVisual(e, 'symbolOffset'),
                    toSymbolRotate: m.getItemVisual(e, 'symbolRotate'),
                    toSymbolSize: m.getItemVisual(e, 'symbolSize'),
                    toSymbol: m.getItemVisual(e, 'symbol'),
                    style: t,
                  }));
              }),
              p.updateData(_),
              d.line.eachItemGraphicEl(function (e) {
                (((0, h.z)(e).dataModel = t),
                  e.traverse(function (e) {
                    (0, h.z)(e).dataModel = t;
                  }));
              }),
              this.markKeep(p),
              (p.group.silent = t.get('silent') || e.get('silent')));
          }),
          (t.type = 'markLine'),
          t
        );
      })(p.A);
      function w(e) {
        (e.registerComponentModel(a),
          e.registerComponentView(M),
          e.registerPreprocessor(function (e) {
            (0, o.A)(e.series, 'markLine') && (e.markLine = e.markLine || {});
          }));
      }
    },
    422158: (e, t, n) => {
      n.d(t, { a: () => y });
      var o = n(772581),
        i = n(15215),
        r = n(82802);
      const a = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.createMarkerModelFromSeries = function (e, n, o) {
            return new t(e, n, o);
          }),
          (t.type = 'markPoint'),
          (t.defaultOption = {
            z: 5,
            symbol: 'pin',
            symbolSize: 50,
            tooltip: { trigger: 'item' },
            label: { show: !0, position: 'inside' },
            itemStyle: { borderWidth: 2 },
            emphasis: { label: { show: !0 } },
          }),
          t
        );
      })(r.A);
      var s = n(218386),
        l = n(624326),
        u = n(6006),
        c = n(371171),
        p = n(201854),
        d = n(498026),
        g = n(669622),
        h = n(337395);
      function f(e, t, n) {
        var o = t.coordinateSystem;
        e.each(function (i) {
          var r,
            a = e.getItemModel(i),
            s = l.lo(a.get('x'), n.getWidth()),
            u = l.lo(a.get('y'), n.getHeight());
          if (isNaN(s) || isNaN(u)) {
            if (t.getMarkerPosition) r = t.getMarkerPosition(e.getValues(e.dimensions, i));
            else if (o) {
              var c = e.get(o.dimensions[0], i),
                p = e.get(o.dimensions[1], i);
              r = o.dataToPoint([c, p]);
            }
          } else r = [s, u];
          (isNaN(s) || (r[0] = s), isNaN(u) || (r[1] = u), e.setItemLayout(i, r));
        });
      }
      const m = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.updateTransform = function (e, t, n) {
            t.eachSeries(function (e) {
              var t = r.A.getMarkerModelFromSeries(e, 'markPoint');
              t && (f(t.getData(), e, n), this.markerGroupMap.get(e.id).updateLayout());
            }, this);
          }),
          (t.prototype.renderSeries = function (e, t, n, o) {
            var i = e.coordinateSystem,
              r = e.id,
              a = e.getData(),
              l = this.markerGroupMap,
              p = l.get(r) || l.set(r, new s.A()),
              m = (function (e, t, n) {
                var o;
                o = e
                  ? (0, d.map)(e && e.dimensions, function (e) {
                      var n = t.getData().getDimensionInfo(t.getData().mapDimension(e)) || {};
                      return (0, d.extend)((0, d.extend)({}, n), { name: e, ordinalMeta: null });
                    })
                  : [{ name: 'value', type: 'float' }];
                var i = new u.A(o, n),
                  r = (0, d.map)(n.get('data'), (0, d.curry)(c.xx, t));
                e && (r = (0, d.filter)(r, (0, d.curry)(c.Lq, e)));
                var a = c.fY(!!e, o);
                return (i.initData(r, null, a), i);
              })(i, e, t);
            (t.setData(m),
              f(t.getData(), e, o),
              m.each(function (e) {
                var n = m.getItemModel(e),
                  o = n.getShallow('symbol'),
                  i = n.getShallow('symbolSize'),
                  r = n.getShallow('symbolRotate'),
                  s = n.getShallow('symbolOffset'),
                  l = n.getShallow('symbolKeepAspect');
                if (
                  (0, d.isFunction)(o) ||
                  (0, d.isFunction)(i) ||
                  (0, d.isFunction)(r) ||
                  (0, d.isFunction)(s)
                ) {
                  var u = t.getRawValue(e),
                    c = t.getDataParams(e);
                  ((0, d.isFunction)(o) && (o = o(u, c)),
                    (0, d.isFunction)(i) && (i = i(u, c)),
                    (0, d.isFunction)(r) && (r = r(u, c)),
                    (0, d.isFunction)(s) && (s = s(u, c)));
                }
                var p = n.getModel('itemStyle').getItemStyle(),
                  g = (0, h.rI)(a, 'color');
                (p.fill || (p.fill = g),
                  m.setItemVisual(e, {
                    symbol: o,
                    symbolSize: i,
                    symbolRotate: r,
                    symbolOffset: s,
                    symbolKeepAspect: l,
                    style: p,
                  }));
              }),
              p.updateData(m),
              this.group.add(p.group),
              m.eachItemGraphicEl(function (e) {
                e.traverse(function (e) {
                  (0, g.z)(e).dataModel = t;
                });
              }),
              this.markKeep(p),
              (p.group.silent = t.get('silent') || e.get('silent')));
          }),
          (t.type = 'markPoint'),
          t
        );
      })(p.A);
      function y(e) {
        (e.registerComponentModel(a),
          e.registerComponentView(m),
          e.registerPreprocessor(function (e) {
            (0, o.A)(e.series, 'markPoint') && (e.markPoint = e.markPoint || {});
          }));
      }
    },
    371171: (e, t, n) => {
      n.d(t, { Lq: () => d, PN: () => g, Yc: () => p, fY: () => h, vz: () => f, xx: () => c });
      var o = n(624326),
        i = n(265008),
        r = n(498026),
        a = n(731825);
      function s(e) {
        return !(isNaN(parseFloat(e.x)) && isNaN(parseFloat(e.y)));
      }
      function l(e, t, n, r, a, s) {
        var l = [],
          u = (0, i.sJ)(t, r) ? t.getCalculationInfo('stackResultDimension') : r,
          c = f(t, u, e),
          p = t.indicesOfNearest(u, c)[0];
        ((l[a] = t.get(n, p)), (l[s] = t.get(u, p)));
        var d = t.get(r, p),
          g = o.XV(t.get(r, p));
        return ((g = Math.min(g, 20)) >= 0 && (l[s] = +l[s].toFixed(g)), [l, d]);
      }
      var u = {
        min: (0, r.curry)(l, 'min'),
        max: (0, r.curry)(l, 'max'),
        average: (0, r.curry)(l, 'average'),
        median: (0, r.curry)(l, 'median'),
      };
      function c(e, t) {
        if (t) {
          var n = e.getData(),
            o = e.coordinateSystem,
            i = o && o.dimensions;
          if (
            !(function (e) {
              return !isNaN(parseFloat(e.x)) && !isNaN(parseFloat(e.y));
            })(t) &&
            !(0, r.isArray)(t.coord) &&
            (0, r.isArray)(i)
          ) {
            var a = p(t, n, o, e);
            if ((t = (0, r.clone)(t)).type && u[t.type] && a.baseAxis && a.valueAxis) {
              var s = (0, r.indexOf)(i, a.baseAxis.dim),
                l = (0, r.indexOf)(i, a.valueAxis.dim),
                c = u[t.type](n, a.baseDataDim, a.valueDataDim, s, l);
              ((t.coord = c[0]), (t.value = c[1]));
            } else
              t.coord = [
                null != t.xAxis ? t.xAxis : t.radiusAxis,
                null != t.yAxis ? t.yAxis : t.angleAxis,
              ];
          }
          if (null != t.coord && (0, r.isArray)(i))
            for (var d = t.coord, g = 0; g < 2; g++)
              u[d[g]] && (d[g] = f(n, n.mapDimension(i[g]), d[g]));
          else t.coord = [];
          return t;
        }
      }
      function p(e, t, n, o) {
        var i = {};
        return (
          null != e.valueIndex || null != e.valueDim
            ? ((i.valueDataDim = null != e.valueIndex ? t.getDimension(e.valueIndex) : e.valueDim),
              (i.valueAxis = n.getAxis(
                (function (e, t) {
                  var n = e.getData().getDimensionInfo(t);
                  return n && n.coordDim;
                })(o, i.valueDataDim),
              )),
              (i.baseAxis = n.getOtherAxis(i.valueAxis)),
              (i.baseDataDim = t.mapDimension(i.baseAxis.dim)))
            : ((i.baseAxis = o.getBaseAxis()),
              (i.valueAxis = n.getOtherAxis(i.baseAxis)),
              (i.baseDataDim = t.mapDimension(i.baseAxis.dim)),
              (i.valueDataDim = t.mapDimension(i.valueAxis.dim))),
          i
        );
      }
      function d(e, t) {
        return !(e && e.containData && t.coord && !s(t)) || e.containData(t.coord);
      }
      function g(e, t, n) {
        return (
          !(e && e.containZone && t.coord && n.coord && !s(t) && !s(n)) ||
          e.containZone(t.coord, n.coord)
        );
      }
      function h(e, t) {
        return e
          ? function (e, n, o, i) {
              var r = i < 2 ? e.coord && e.coord[i] : e.value;
              return (0, a.Pn)(r, t[i]);
            }
          : function (e, n, o, i) {
              return (0, a.Pn)(e.value, t[i]);
            };
      }
      function f(e, t, n) {
        if ('average' === n) {
          var o = 0,
            i = 0;
          return (
            e.each(t, function (e, t) {
              isNaN(e) || ((o += e), i++);
            }),
            o / i
          );
        }
        return 'median' === n ? e.getMedian(t) : e.getDataExtent(t)['max' === n ? 1 : 0];
      }
    },
    146105: (e, t, n) => {
      n.d(t, { a: () => x });
      var o = n(378308),
        i = n(15215),
        r = n(659109),
        a = n(498026),
        s = n(824711),
        l = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), n);
          }
          return (
            (0, i.__extends)(t, e),
            (t.prototype.render = function (e, t, n) {
              ((this._model = e),
                (this._api = n),
                this._handlers ||
                  ((this._handlers = {}),
                  (0, a.each)(
                    u,
                    function (e, t) {
                      n.getZr().on(t, (this._handlers[t] = (0, a.bind)(e, this)));
                    },
                    this,
                  )),
                (0, s.N)(this, '_throttledDispatchExpand', e.get('axisExpandRate'), 'fixRate'));
            }),
            (t.prototype.dispose = function (e, t) {
              ((0, s.IU)(this, '_throttledDispatchExpand'),
                (0, a.each)(this._handlers, function (e, n) {
                  t.getZr().off(n, e);
                }),
                (this._handlers = null));
            }),
            (t.prototype._throttledDispatchExpand = function (e) {
              this._dispatchExpand(e);
            }),
            (t.prototype._dispatchExpand = function (e) {
              e && this._api.dispatchAction((0, a.extend)({ type: 'parallelAxisExpand' }, e));
            }),
            (t.type = 'parallel'),
            t
          );
        })(r.A),
        u = {
          mousedown: function (e) {
            c(this, 'click') && (this._mouseDownPoint = [e.offsetX, e.offsetY]);
          },
          mouseup: function (e) {
            var t = this._mouseDownPoint;
            if (c(this, 'click') && t) {
              var n = [e.offsetX, e.offsetY];
              if (Math.pow(t[0] - n[0], 2) + Math.pow(t[1] - n[1], 2) > 5) return;
              var o = this._model.coordinateSystem.getSlidedAxisExpandWindow([
                e.offsetX,
                e.offsetY,
              ]);
              'none' !== o.behavior &&
                this._dispatchExpand({ axisExpandWindow: o.axisExpandWindow });
            }
            this._mouseDownPoint = null;
          },
          mousemove: function (e) {
            if (!this._mouseDownPoint && c(this, 'mousemove')) {
              var t = this._model,
                n = t.coordinateSystem.getSlidedAxisExpandWindow([e.offsetX, e.offsetY]),
                o = n.behavior;
              ('jump' === o &&
                this._throttledDispatchExpand.debounceNextCall(t.get('axisExpandDebounce')),
                this._throttledDispatchExpand(
                  'none' === o
                    ? null
                    : {
                        axisExpandWindow: n.axisExpandWindow,
                        animation: 'jump' === o ? null : { duration: 0 },
                      },
                ));
            }
          },
        };
      function c(e, t) {
        var n = e._model;
        return n.get('axisExpandable') && n.get('axisExpandTriggerOn') === t;
      }
      const p = l;
      var d = n(424130),
        g = n(742744),
        h = n(859470),
        f = n(761504),
        m = n(60755),
        y = n(468520),
        v = {
          type: 'value',
          areaSelectStyle: {
            width: 20,
            borderWidth: 1,
            borderColor: 'rgba(160,197,232)',
            color: 'rgba(160,197,232)',
            opacity: 0.3,
          },
          realtime: !0,
          z: 10,
        };
      function x(e) {
        (e.registerComponentView(p),
          e.registerComponentModel(d.A),
          e.registerCoordinateSystem('parallel', g.A),
          e.registerPreprocessor(o.A),
          e.registerComponentModel(f.A),
          e.registerComponentView(m.A),
          (0, h.A)(e, 'parallel', f.A, v),
          (0, y.o)(e));
      }
    },
    559166: (e, t, n) => {
      n.d(t, { a: () => _ });
      var o = n(15215),
        i = n(903087),
        r = n(522480),
        a = n(723953),
        s = n(746524),
        l = n(317838),
        u = n(859470),
        c = n(296413),
        p = n(842506),
        d = n(259481),
        g = n(13006),
        h = n(659109),
        f = n(498026),
        m = n(695926),
        y = { startAngle: 90, clockwise: !0, splitNumber: 12, axisLabel: { rotate: 0 } },
        v = { splitNumber: 5 },
        x = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), n);
          }
          return ((0, o.__extends)(t, e), (t.type = 'polar'), t);
        })(h.A);
      function _(e) {
        ((0, i.Y)(s.a),
          r.A.registerAxisPointerClass('PolarAxisPointer', a.A),
          e.registerCoordinateSystem('polar', p.A),
          e.registerComponentModel(l.A),
          e.registerComponentView(x),
          (0, u.A)(e, 'angle', c.w2, y),
          (0, u.A)(e, 'radius', c.vI, v),
          e.registerComponentView(d.A),
          e.registerComponentView(g.A),
          e.registerLayout((0, f.curry)(m.A, 'bar')));
      }
    },
    118909: (e, t, n) => {
      n.d(t, { a: () => m });
      var o = n(971674),
        i = n(15215),
        r = n(498026),
        a = n(289598),
        s = n(131571),
        l = n(142933),
        u = n(39195),
        c = n(252505),
        p = n(543199),
        d = n(659109),
        g = ['axisLine', 'axisTickLabel', 'axisName'];
      const h = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), n);
        }
        return (
          (0, i.__extends)(t, e),
          (t.prototype.render = function (e, t, n) {
            (this.group.removeAll(), this._buildAxes(e), this._buildSplitLineAndArea(e));
          }),
          (t.prototype._buildAxes = function (e) {
            var t = e.coordinateSystem,
              n = t.getIndicatorAxes(),
              o = r.map(n, function (e) {
                var n = e.model.get('showName') ? e.name : '';
                return new a.A(e.model, {
                  axisName: n,
                  position: [t.cx, t.cy],
                  rotation: e.angle,
                  labelDirection: -1,
                  tickDirection: -1,
                  nameDirection: 1,
                });
              });
            r.each(
              o,
              function (e) {
                (r.each(g, e.add, e), this.group.add(e.getGroup()));
              },
              this,
            );
          }),
          (t.prototype._buildSplitLineAndArea = function (e) {
            var t = e.coordinateSystem,
              n = t.getIndicatorAxes();
            if (n.length) {
              var o = e.get('shape'),
                i = e.getModel('splitLine'),
                a = e.getModel('splitArea'),
                d = i.getModel('lineStyle'),
                g = a.getModel('areaStyle'),
                h = i.get('show'),
                f = a.get('show'),
                m = d.get('color'),
                y = g.get('color'),
                v = r.isArray(m) ? m : [m],
                x = r.isArray(y) ? y : [y],
                _ = [],
                b = [];
              if ('circle' === o)
                for (var S = n[0].getTicksCoords(), A = t.cx, M = t.cy, w = 0; w < S.length; w++)
                  (h && _[O(_, v, w)].push(new s.A({ shape: { cx: A, cy: M, r: S[w].coord } })),
                    f &&
                      w < S.length - 1 &&
                      b[O(b, x, w)].push(
                        new l.A({ shape: { cx: A, cy: M, r0: S[w].coord, r: S[w + 1].coord } }),
                      ));
              else {
                var I,
                  C = r.map(n, function (e, n) {
                    var o = e.getTicksCoords();
                    return (
                      (I = null == I ? o.length - 1 : Math.min(o.length - 1, I)),
                      r.map(o, function (e) {
                        return t.coordToPoint(e.coord, n);
                      })
                    );
                  }),
                  D = [];
                for (w = 0; w <= I; w++) {
                  for (var T = [], P = 0; P < n.length; P++) T.push(C[P][w]);
                  (T[0] && T.push(T[0].slice()),
                    h && _[O(_, v, w)].push(new u.A({ shape: { points: T } })),
                    f && D && b[O(b, x, w - 1)].push(new c.A({ shape: { points: T.concat(D) } })),
                    (D = T.slice().reverse()));
                }
              }
              var k = d.getLineStyle(),
                G = g.getAreaStyle();
              (r.each(
                b,
                function (e, t) {
                  this.group.add(
                    p.mergePath(e, {
                      style: r.defaults({ stroke: 'none', fill: x[t % x.length] }, G),
                      silent: !0,
                    }),
                  );
                },
                this,
              ),
                r.each(
                  _,
                  function (e, t) {
                    this.group.add(
                      p.mergePath(e, {
                        style: r.defaults({ fill: 'none', stroke: v[t % v.length] }, k),
                        silent: !0,
                      }),
                    );
                  },
                  this,
                ));
            }
            function O(e, t, n) {
              var o = n % t.length;
              return ((e[o] = e[o] || []), o);
            }
          }),
          (t.type = 'radar'),
          t
        );
      })(d.A);
      var f = n(296504);
      function m(e) {
        (e.registerCoordinateSystem('radar', f.A),
          e.registerComponentModel(o.A),
          e.registerComponentView(h),
          e.registerVisual({
            seriesType: 'radar',
            reset: function (e) {
              var t = e.getData();
              (t.each(function (e) {
                t.setItemVisual(e, 'legendIcon', 'roundRect');
              }),
                t.setVisual('legendIcon', 'roundRect'));
            },
          }));
      }
    },
    268241: (e, t, n) => {
      n.d(t, { a: () => h });
      var o = n(15215),
        i = n(903087),
        r = n(659109),
        a = n(167688),
        s = n(859470),
        l = n(986351),
        u = n(215787),
        c = n(746524),
        p = n(522480),
        d = n(876081),
        g = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), n);
          }
          return ((0, o.__extends)(t, e), (t.type = 'single'), t);
        })(r.A);
      function h(e) {
        ((0, i.Y)(c.a),
          p.A.registerAxisPointerClass('SingleAxisPointer', d.A),
          e.registerComponentView(g),
          e.registerComponentView(a.A),
          e.registerComponentModel(l.A),
          (0, s.A)(e, 'single', l.A, l.A.defaultOption),
          e.registerCoordinateSystem('single', u.A));
      }
    },
    742751: (e, t, n) => {
      n.d(t, { a: () => W });
      var o = n(15215),
        i = n(515915),
        r = n(6006),
        a = n(498026),
        s = n(48170);
      const l = (function (e) {
        function t() {
          var n = (null !== e && e.apply(this, arguments)) || this;
          return ((n.type = t.type), (n.layoutMode = 'box'), n);
        }
        return (
          (0, o.__extends)(t, e),
          (t.prototype.init = function (e, t, n) {
            (this.mergeDefaultAndTheme(e, n), this._initData());
          }),
          (t.prototype.mergeOption = function (t) {
            (e.prototype.mergeOption.apply(this, arguments), this._initData());
          }),
          (t.prototype.setCurrentIndex = function (e) {
            null == e && (e = this.option.currentIndex);
            var t = this._data.count();
            (this.option.loop ? (e = ((e % t) + t) % t) : (e >= t && (e = t - 1), e < 0 && (e = 0)),
              (this.option.currentIndex = e));
          }),
          (t.prototype.getCurrentIndex = function () {
            return this.option.currentIndex;
          }),
          (t.prototype.isIndexMax = function () {
            return this.getCurrentIndex() >= this._data.count() - 1;
          }),
          (t.prototype.setPlayState = function (e) {
            this.option.autoPlay = !!e;
          }),
          (t.prototype.getPlayState = function () {
            return !!this.option.autoPlay;
          }),
          (t.prototype._initData = function () {
            var e,
              t = this.option,
              n = t.data || [],
              o = t.axisType,
              i = (this._names = []);
            'category' === o
              ? ((e = []),
                (0, a.each)(n, function (t, n) {
                  var o,
                    r = (0, s.vS)((0, s.vj)(t), '');
                  ((0, a.isObject)(t) ? ((o = (0, a.clone)(t)).value = n) : (o = n),
                    e.push(o),
                    i.push(r));
                }))
              : (e = n);
            var l = { category: 'ordinal', time: 'time', value: 'number' }[o] || 'number';
            (this._data = new r.A([{ name: 'value', type: l }], this)).initData(e, i);
          }),
          (t.prototype.getData = function () {
            return this._data;
          }),
          (t.prototype.getCategories = function () {
            if ('category' === this.get('axisType')) return this._names.slice();
          }),
          (t.type = 'timeline'),
          (t.defaultOption = {
            z: 4,
            show: !0,
            axisType: 'time',
            realtime: !0,
            left: '20%',
            top: null,
            right: '20%',
            bottom: 0,
            width: null,
            height: 40,
            padding: 5,
            controlPosition: 'left',
            autoPlay: !1,
            rewind: !1,
            loop: !0,
            playInterval: 2e3,
            currentIndex: 0,
            itemStyle: {},
            label: { color: '#000' },
            data: [],
          }),
          t
        );
      })(i.A);
      var u = n(609427),
        c = n(612616),
        p = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), n);
          }
          return (
            (0, o.__extends)(t, e),
            (t.type = 'timeline.slider'),
            (t.defaultOption = (0, c.G_)(l.defaultOption, {
              backgroundColor: 'rgba(0,0,0,0)',
              borderColor: '#ccc',
              borderWidth: 0,
              orient: 'horizontal',
              inverse: !1,
              tooltip: { trigger: 'item' },
              symbol: 'circle',
              symbolSize: 12,
              lineStyle: { show: !0, width: 2, color: '#DAE1F5' },
              label: { position: 'auto', show: !0, interval: 'auto', rotate: 0, color: '#A4B1D7' },
              itemStyle: { color: '#A4B1D7', borderWidth: 1 },
              checkpointStyle: {
                symbol: 'circle',
                symbolSize: 15,
                color: '#316bf3',
                borderColor: '#fff',
                borderWidth: 2,
                shadowBlur: 2,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                animation: !0,
                animationDuration: 300,
                animationEasing: 'quinticInOut',
              },
              controlStyle: {
                show: !0,
                showPlayBtn: !0,
                showPrevBtn: !0,
                showNextBtn: !0,
                itemSize: 24,
                itemGap: 12,
                position: 'left',
                playIcon:
                  'path://M31.6,53C17.5,53,6,41.5,6,27.4S17.5,1.8,31.6,1.8C45.7,1.8,57.2,13.3,57.2,27.4S45.7,53,31.6,53z M31.6,3.3 C18.4,3.3,7.5,14.1,7.5,27.4c0,13.3,10.8,24.1,24.1,24.1C44.9,51.5,55.7,40.7,55.7,27.4C55.7,14.1,44.9,3.3,31.6,3.3z M24.9,21.3 c0-2.2,1.6-3.1,3.5-2l10.5,6.1c1.899,1.1,1.899,2.9,0,4l-10.5,6.1c-1.9,1.1-3.5,0.2-3.5-2V21.3z',
                stopIcon:
                  'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
                nextIcon:
                  'M2,18.5A1.52,1.52,0,0,1,.92,18a1.49,1.49,0,0,1,0-2.12L7.81,9.36,1,3.11A1.5,1.5,0,1,1,3,.89l8,7.34a1.48,1.48,0,0,1,.49,1.09,1.51,1.51,0,0,1-.46,1.1L3,18.08A1.5,1.5,0,0,1,2,18.5Z',
                prevIcon:
                  'M10,.5A1.52,1.52,0,0,1,11.08,1a1.49,1.49,0,0,1,0,2.12L4.19,9.64,11,15.89a1.5,1.5,0,1,1-2,2.22L1,10.77A1.48,1.48,0,0,1,.5,9.68,1.51,1.51,0,0,1,1,8.58L9,.92A1.5,1.5,0,0,1,10,.5Z',
                prevBtnSize: 18,
                nextBtnSize: 18,
                color: '#A4B1D7',
                borderColor: '#A4B1D7',
                borderWidth: 1,
              },
              emphasis: {
                label: { show: !0, color: '#6f778d' },
                itemStyle: { color: '#316BF3' },
                controlStyle: { color: '#316BF3', borderColor: '#316BF3', borderWidth: 2 },
              },
              progress: {
                lineStyle: { color: '#316BF3' },
                itemStyle: { color: '#316BF3' },
                label: { color: '#6f778d' },
              },
              data: [],
            })),
            t
          );
        })(l);
      (0, a.mixin)(p, u.J.prototype);
      const d = p;
      var g = n(529308),
        h = n(345587),
        f = n(843870),
        m = n(982861),
        y = n(132322),
        v = n(543199),
        x = n(289632),
        _ = n(834253);
      const b = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), n);
          }
          return ((0, o.__extends)(t, e), (t.type = 'timeline'), t);
        })(n(659109).A),
        S = (function (e) {
          function t(t, n, o, i) {
            var r = e.call(this, t, n, o) || this;
            return ((r.type = i || 'value'), r);
          }
          return (
            (0, o.__extends)(t, e),
            (t.prototype.getLabelModel = function () {
              return this.model.getModel('label');
            }),
            (t.prototype.isHorizontal = function () {
              return 'horizontal' === this.model.get('orient');
            }),
            t
          );
        })(n(120912).A);
      var A = n(62103),
        M = n(624326),
        w = n(818550),
        I = n(812706),
        C = n(274562),
        D = n(945558),
        T = n(669622),
        P = n(34833),
        k = n(603961),
        G = Math.PI,
        O = (0, s.$r)(),
        z = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), n);
          }
          return (
            (0, o.__extends)(t, e),
            (t.prototype.init = function (e, t) {
              this.api = t;
            }),
            (t.prototype.render = function (e, t, n) {
              if (
                ((this.model = e),
                (this.api = n),
                (this.ecModel = t),
                this.group.removeAll(),
                e.get('show', !0))
              ) {
                var o = this._layout(e, n),
                  i = this._createGroup('_mainGroup'),
                  r = this._createGroup('_labelGroup'),
                  s = (this._axis = this._createAxis(o, e));
                ((e.formatTooltip = function (e) {
                  var t = s.scale.getLabel({ value: e });
                  return (0, k.Qx)('nameValue', { noName: !0, value: t });
                }),
                  (0, a.each)(
                    ['AxisLine', 'AxisTick', 'Control', 'CurrentPointer'],
                    function (t) {
                      this['_render' + t](o, i, s, e);
                    },
                    this,
                  ),
                  this._renderAxisLabel(o, r, s, e),
                  this._position(o, e));
              }
              (this._doPlayStop(), this._updateTicksStatus());
            }),
            (t.prototype.remove = function () {
              (this._clearTimer(), this.group.removeAll());
            }),
            (t.prototype.dispose = function () {
              this._clearTimer();
            }),
            (t.prototype._layout = function (e, t) {
              var n,
                o,
                i,
                r,
                s = e.get(['label', 'position']),
                l = e.get('orient'),
                u = (function (e, t) {
                  return _.dV(
                    e.getBoxLayoutParams(),
                    { width: t.getWidth(), height: t.getHeight() },
                    e.get('padding'),
                  );
                })(e, t),
                c = {
                  horizontal: 'center',
                  vertical:
                    (n =
                      null == s || 'auto' === s
                        ? 'horizontal' === l
                          ? u.y + u.height / 2 < t.getHeight() / 2
                            ? '-'
                            : '+'
                          : u.x + u.width / 2 < t.getWidth() / 2
                            ? '+'
                            : '-'
                        : (0, a.isString)(s)
                          ? {
                              horizontal: { top: '-', bottom: '+' },
                              vertical: { left: '-', right: '+' },
                            }[l][s]
                          : s) >= 0 || '+' === n
                      ? 'left'
                      : 'right',
                },
                p = { horizontal: n >= 0 || '+' === n ? 'top' : 'bottom', vertical: 'middle' },
                d = { horizontal: 0, vertical: G / 2 },
                g = 'vertical' === l ? u.height : u.width,
                h = e.getModel('controlStyle'),
                f = h.get('show', !0),
                m = f ? h.get('itemSize') : 0,
                y = f ? h.get('itemGap') : 0,
                v = m + y,
                x = e.get(['label', 'rotate']) || 0;
              x = (x * G) / 180;
              var b = h.get('position', !0),
                S = f && h.get('showPlayBtn', !0),
                A = f && h.get('showPrevBtn', !0),
                M = f && h.get('showNextBtn', !0),
                w = 0,
                I = g;
              'left' === b || 'bottom' === b
                ? (S && ((o = [0, 0]), (w += v)),
                  A && ((i = [w, 0]), (w += v)),
                  M && ((r = [I - m, 0]), (I -= v)))
                : (S && ((o = [I - m, 0]), (I -= v)),
                  A && ((i = [0, 0]), (w += v)),
                  M && ((r = [I - m, 0]), (I -= v)));
              var C = [w, I];
              return (
                e.get('inverse') && C.reverse(),
                {
                  viewRect: u,
                  mainLength: g,
                  orient: l,
                  rotation: d[l],
                  labelRotation: x,
                  labelPosOpt: n,
                  labelAlign: e.get(['label', 'align']) || c[l],
                  labelBaseline:
                    e.get(['label', 'verticalAlign']) || e.get(['label', 'baseline']) || p[l],
                  playPosition: o,
                  prevBtnPosition: i,
                  nextBtnPosition: r,
                  axisExtent: C,
                  controlSize: m,
                  controlGap: y,
                }
              );
            }),
            (t.prototype._position = function (e, t) {
              var n = this._mainGroup,
                o = this._labelGroup,
                i = e.viewRect;
              if ('vertical' === e.orient) {
                var r = h.create(),
                  s = i.x,
                  l = i.y + i.height;
                (h.translate(r, r, [-s, -l]),
                  h.rotate(r, r, -G / 2),
                  h.translate(r, r, [s, l]),
                  (i = i.clone()).applyTransform(r));
              }
              var u = v(i),
                c = v(n.getBoundingRect()),
                p = v(o.getBoundingRect()),
                d = [n.x, n.y],
                g = [o.x, o.y];
              g[0] = d[0] = u[0][0];
              var f,
                m = e.labelPosOpt;
              function y(e) {
                ((e.originX = u[0][0] - e.x), (e.originY = u[1][0] - e.y));
              }
              function v(e) {
                return [
                  [e.x, e.x + e.width],
                  [e.y, e.y + e.height],
                ];
              }
              function x(e, t, n, o, i) {
                e[o] += n[o][i] - t[o][i];
              }
              (null == m || (0, a.isString)(m)
                ? (x(d, c, u, 1, (f = '+' === m ? 0 : 1)), x(g, p, u, 1, 1 - f))
                : (x(d, c, u, 1, (f = m >= 0 ? 0 : 1)), (g[1] = d[1] + m)),
                n.setPosition(d),
                o.setPosition(g),
                (n.rotation = o.rotation = e.rotation),
                y(n),
                y(o));
            }),
            (t.prototype._createAxis = function (e, t) {
              var n = t.getData(),
                o = t.get('axisType'),
                i = (function (e, t) {
                  if ((t = t || e.get('type')))
                    switch (t) {
                      case 'category':
                        return new w.A({ ordinalMeta: e.getCategories(), extent: [1 / 0, -1 / 0] });
                      case 'time':
                        return new I.A({
                          locale: e.ecModel.getLocaleModel(),
                          useUTC: e.ecModel.get('useUTC'),
                        });
                      default:
                        return new C.A();
                    }
                })(t, o);
              i.getTicks = function () {
                return n.mapArray(['value'], function (e) {
                  return { value: e };
                });
              };
              var r = n.getDataExtent('value');
              (i.setExtent(r[0], r[1]), i.calcNiceTicks());
              var a = new S('value', i, e.axisExtent, o);
              return ((a.model = t), a);
            }),
            (t.prototype._createGroup = function (e) {
              var t = (this[e] = new f.A());
              return (this.group.add(t), t);
            }),
            (t.prototype._renderAxisLine = function (e, t, n, o) {
              var i = n.getExtent();
              if (o.get(['lineStyle', 'show'])) {
                var r = new m.A({
                  shape: { x1: i[0], y1: 0, x2: i[1], y2: 0 },
                  style: (0, a.extend)(
                    { lineCap: 'round' },
                    o.getModel('lineStyle').getLineStyle(),
                  ),
                  silent: !0,
                  z2: 1,
                });
                t.add(r);
                var s = (this._progressLine = new m.A({
                  shape: {
                    x1: i[0],
                    x2: this._currentPointer ? this._currentPointer.x : i[0],
                    y1: 0,
                    y2: 0,
                  },
                  style: (0, a.defaults)(
                    { lineCap: 'round', lineWidth: r.style.lineWidth },
                    o.getModel(['progress', 'lineStyle']).getLineStyle(),
                  ),
                  silent: !0,
                  z2: 1,
                }));
                t.add(s);
              }
            }),
            (t.prototype._renderAxisTick = function (e, t, n, o) {
              var i = this,
                r = o.getData(),
                s = n.scale.getTicks();
              ((this._tickSymbols = []),
                (0, a.each)(s, function (e) {
                  var s = n.dataToCoord(e.value),
                    l = r.getItemModel(e.value),
                    u = l.getModel('itemStyle'),
                    c = l.getModel(['emphasis', 'itemStyle']),
                    p = l.getModel(['progress', 'itemStyle']),
                    d = { x: s, y: 0, onclick: (0, a.bind)(i._changeTimeline, i, e.value) },
                    g = L(l, u, t, d);
                  ((g.ensureState('emphasis').style = c.getItemStyle()),
                    (g.ensureState('progress').style = p.getItemStyle()),
                    (0, P.iJ)(g));
                  var h = (0, T.z)(g);
                  (l.get('tooltip')
                    ? ((h.dataIndex = e.value), (h.dataModel = o))
                    : (h.dataIndex = h.dataModel = null),
                    i._tickSymbols.push(g));
                }));
            }),
            (t.prototype._renderAxisLabel = function (e, t, n, o) {
              var i = this;
              if (n.getLabelModel().get('show')) {
                var r = o.getData(),
                  s = n.getViewLabels();
                ((this._tickLabels = []),
                  (0, a.each)(s, function (o) {
                    var s = o.tickValue,
                      l = r.getItemModel(s),
                      u = l.getModel('label'),
                      c = l.getModel(['emphasis', 'label']),
                      p = l.getModel(['progress', 'label']),
                      d = n.dataToCoord(o.tickValue),
                      g = new y.Ay({
                        x: d,
                        y: 0,
                        rotation: e.labelRotation - e.rotation,
                        onclick: (0, a.bind)(i._changeTimeline, i, s),
                        silent: !1,
                        style: (0, x.VB)(u, {
                          text: o.formattedLabel,
                          align: e.labelAlign,
                          verticalAlign: e.labelBaseline,
                        }),
                      });
                    ((g.ensureState('emphasis').style = (0, x.VB)(c)),
                      (g.ensureState('progress').style = (0, x.VB)(p)),
                      t.add(g),
                      (0, P.iJ)(g),
                      (O(g).dataIndex = s),
                      i._tickLabels.push(g));
                  }));
              }
            }),
            (t.prototype._renderControl = function (e, t, n, o) {
              var i = e.controlSize,
                r = e.rotation,
                s = o.getModel('controlStyle').getItemStyle(),
                l = o.getModel(['emphasis', 'controlStyle']).getItemStyle(),
                u = o.getPlayState(),
                c = o.get('inverse', !0);
              function p(e, n, u, c) {
                if (e) {
                  var p = (0, D.lo)((0, a.retrieve2)(o.get(['controlStyle', n + 'BtnSize']), i), i),
                    d = (function (e, t, n, o) {
                      var i = o.style,
                        r = v.createIcon(
                          e.get(['controlStyle', t]),
                          o || {},
                          new g.A(n[0], n[1], n[2], n[3]),
                        );
                      return (i && r.setStyle(i), r);
                    })(o, n + 'Icon', [0, -p / 2, p, p], {
                      x: e[0],
                      y: e[1],
                      originX: i / 2,
                      originY: 0,
                      rotation: c ? -r : 0,
                      rectHover: !0,
                      style: s,
                      onclick: u,
                    });
                  ((d.ensureState('emphasis').style = l), t.add(d), (0, P.iJ)(d));
                }
              }
              (p(e.nextBtnPosition, 'next', (0, a.bind)(this._changeTimeline, this, c ? '-' : '+')),
                p(
                  e.prevBtnPosition,
                  'prev',
                  (0, a.bind)(this._changeTimeline, this, c ? '+' : '-'),
                ),
                p(
                  e.playPosition,
                  u ? 'stop' : 'play',
                  (0, a.bind)(this._handlePlayClick, this, !u),
                  !0,
                ));
            }),
            (t.prototype._renderCurrentPointer = function (e, t, n, o) {
              var i = o.getData(),
                r = o.getCurrentIndex(),
                s = i.getItemModel(r).getModel('checkpointStyle'),
                l = this,
                u = {
                  onCreate: function (e) {
                    ((e.draggable = !0),
                      (e.drift = (0, a.bind)(l._handlePointerDrag, l)),
                      (e.ondragend = (0, a.bind)(l._handlePointerDragend, l)),
                      R(e, l._progressLine, r, n, o, !0));
                  },
                  onUpdate: function (e) {
                    R(e, l._progressLine, r, n, o);
                  },
                };
              this._currentPointer = L(s, s, this._mainGroup, {}, this._currentPointer, u);
            }),
            (t.prototype._handlePlayClick = function (e) {
              (this._clearTimer(),
                this.api.dispatchAction({
                  type: 'timelinePlayChange',
                  playState: e,
                  from: this.uid,
                }));
            }),
            (t.prototype._handlePointerDrag = function (e, t, n) {
              (this._clearTimer(), this._pointerChangeTimeline([n.offsetX, n.offsetY]));
            }),
            (t.prototype._handlePointerDragend = function (e) {
              this._pointerChangeTimeline([e.offsetX, e.offsetY], !0);
            }),
            (t.prototype._pointerChangeTimeline = function (e, t) {
              var n = this._toAxisCoord(e)[0],
                o = this._axis,
                i = M.Y6(o.getExtent().slice());
              (n > i[1] && (n = i[1]),
                n < i[0] && (n = i[0]),
                (this._currentPointer.x = n),
                this._currentPointer.markRedraw());
              var r = this._progressLine;
              r && ((r.shape.x2 = n), r.dirty());
              var a = this._findNearestTick(n),
                s = this.model;
              (t || (a !== s.getCurrentIndex() && s.get('realtime'))) && this._changeTimeline(a);
            }),
            (t.prototype._doPlayStop = function () {
              var e = this;
              (this._clearTimer(),
                this.model.getPlayState() &&
                  (this._timer = setTimeout(function () {
                    var t = e.model;
                    e._changeTimeline(t.getCurrentIndex() + (t.get('rewind', !0) ? -1 : 1));
                  }, this.model.get('playInterval'))));
            }),
            (t.prototype._toAxisCoord = function (e) {
              var t = this._mainGroup.getLocalTransform();
              return v.applyTransform(e, t, !0);
            }),
            (t.prototype._findNearestTick = function (e) {
              var t,
                n = this.model.getData(),
                o = 1 / 0,
                i = this._axis;
              return (
                n.each(['value'], function (n, r) {
                  var a = i.dataToCoord(n),
                    s = Math.abs(a - e);
                  s < o && ((o = s), (t = r));
                }),
                t
              );
            }),
            (t.prototype._clearTimer = function () {
              this._timer && (clearTimeout(this._timer), (this._timer = null));
            }),
            (t.prototype._changeTimeline = function (e) {
              var t = this.model.getCurrentIndex();
              ('+' === e ? (e = t + 1) : '-' === e && (e = t - 1),
                this.api.dispatchAction({
                  type: 'timelineChange',
                  currentIndex: e,
                  from: this.uid,
                }));
            }),
            (t.prototype._updateTicksStatus = function () {
              var e = this.model.getCurrentIndex(),
                t = this._tickSymbols,
                n = this._tickLabels;
              if (t)
                for (var o = 0; o < t.length; o++) t && t[o] && t[o].toggleState('progress', o < e);
              if (n)
                for (o = 0; o < n.length; o++)
                  n && n[o] && n[o].toggleState('progress', O(n[o]).dataIndex <= e);
            }),
            (t.type = 'timeline.slider'),
            t
          );
        })(b);
      function L(e, t, n, o, i, r) {
        var s = t.get('color');
        if (i) (i.setColor(s), n.add(i), r && r.onUpdate(i));
        else {
          var l = e.get('symbol');
          ((i = (0, A.v5)(l, -1, -1, 2, 2, s)).setStyle('strokeNoScale', !0),
            n.add(i),
            r && r.onCreate(i));
        }
        var u = t.getItemStyle(['color']);
        (i.setStyle(u), (o = (0, a.merge)({ rectHover: !0, z2: 100 }, o, !0)));
        var c = (0, A.xU)(e.get('symbolSize'));
        ((o.scaleX = c[0] / 2), (o.scaleY = c[1] / 2));
        var p = (0, A.hV)(e.get('symbolOffset'), c);
        p && ((o.x = (o.x || 0) + p[0]), (o.y = (o.y || 0) + p[1]));
        var d = e.get('symbolRotate');
        return ((o.rotation = ((d || 0) * Math.PI) / 180 || 0), i.attr(o), i.updateTransform(), i);
      }
      function R(e, t, n, o, i, r) {
        if (!e.dragging) {
          var a = i.getModel('checkpointStyle'),
            s = o.dataToCoord(i.getData().get('value', n));
          if (r || !a.get('animation', !0))
            (e.attr({ x: s, y: 0 }), t && t.attr({ shape: { x2: s } }));
          else {
            var l = {
              duration: a.get('animationDuration', !0),
              easing: a.get('animationEasing', !0),
            };
            (e.stopAnimation(null, !0),
              e.animateTo({ x: s, y: 0 }, l),
              t && t.animateTo({ shape: { x2: s } }, l));
          }
        }
      }
      const N = z;
      function B(e) {
        var t = e && e.timeline;
        (a.isArray(t) || (t = t ? [t] : []),
          a.each(t, function (e) {
            e &&
              (function (e) {
                var t = e.type,
                  n = { number: 'value', time: 'time' };
                if ((n[t] && ((e.axisType = n[t]), delete e.type), V(e), E(e, 'controlPosition'))) {
                  var o = e.controlStyle || (e.controlStyle = {});
                  (E(o, 'position') || (o.position = e.controlPosition),
                    'none' !== o.position || E(o, 'show') || ((o.show = !1), delete o.position),
                    delete e.controlPosition);
                }
                a.each(e.data || [], function (e) {
                  a.isObject(e) &&
                    !a.isArray(e) &&
                    (!E(e, 'value') && E(e, 'name') && (e.value = e.name), V(e));
                });
              })(e);
          }));
      }
      function V(e) {
        var t = e.itemStyle || (e.itemStyle = {}),
          n = t.emphasis || (t.emphasis = {}),
          o = e.label || e.label || {},
          i = o.normal || (o.normal = {}),
          r = { normal: 1, emphasis: 1 };
        (a.each(o, function (e, t) {
          r[t] || E(i, t) || (i[t] = e);
        }),
          n.label && !E(o, 'emphasis') && ((o.emphasis = n.label), delete n.label));
      }
      function E(e, t) {
        return e.hasOwnProperty(t);
      }
      function W(e) {
        (e.registerComponentModel(d),
          e.registerComponentView(N),
          e.registerSubTypeDefaulter('timeline', function () {
            return 'slider';
          }),
          (function (e) {
            (e.registerAction(
              { type: 'timelineChange', event: 'timelineChanged', update: 'prepareAndUpdate' },
              function (e, t, n) {
                var o = t.getComponent('timeline');
                return (
                  o &&
                    null != e.currentIndex &&
                    (o.setCurrentIndex(e.currentIndex),
                    !o.get('loop', !0) &&
                      o.isIndexMax() &&
                      o.getPlayState() &&
                      (o.setPlayState(!1),
                      n.dispatchAction({
                        type: 'timelinePlayChange',
                        playState: !1,
                        from: e.from,
                      }))),
                  t.resetOption('timeline', { replaceMerge: o.get('replaceMerge', !0) }),
                  (0, a.defaults)({ currentIndex: o.option.currentIndex }, e)
                );
              },
            ),
              e.registerAction(
                { type: 'timelinePlayChange', event: 'timelinePlayChanged', update: 'update' },
                function (e, t) {
                  var n = t.getComponent('timeline');
                  n && null != e.playState && n.setPlayState(e.playState);
                },
              ));
          })(e),
          e.registerPreprocessor(B));
      }
    },
    374064: (e, t, n) => {
      n.d(t, { a: () => f });
      var o = n(15215),
        i = n(498026),
        r = n(132322),
        a = n(830010),
        s = n(669622),
        l = n(289632),
        u = n(834253),
        c = n(515915),
        p = n(659109),
        d = n(783412),
        g = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), (n.layoutMode = { type: 'box', ignoreSize: !0 }), n);
          }
          return (
            (0, o.__extends)(t, e),
            (t.type = 'title'),
            (t.defaultOption = {
              z: 6,
              show: !0,
              text: '',
              target: 'blank',
              subtext: '',
              subtarget: 'blank',
              left: 0,
              top: 0,
              backgroundColor: 'rgba(0,0,0,0)',
              borderColor: '#ccc',
              borderWidth: 0,
              padding: 5,
              itemGap: 10,
              textStyle: { fontSize: 18, fontWeight: 'bold', color: '#464646' },
              subtextStyle: { fontSize: 12, color: '#6E7079' },
            }),
            t
          );
        })(c.A),
        h = (function (e) {
          function t() {
            var n = (null !== e && e.apply(this, arguments)) || this;
            return ((n.type = t.type), n);
          }
          return (
            (0, o.__extends)(t, e),
            (t.prototype.render = function (e, t, n) {
              if ((this.group.removeAll(), e.get('show'))) {
                var o = this.group,
                  c = e.getModel('textStyle'),
                  p = e.getModel('subtextStyle'),
                  g = e.get('textAlign'),
                  h = i.retrieve2(e.get('textBaseline'), e.get('textVerticalAlign')),
                  f = new r.Ay({
                    style: (0, l.VB)(
                      c,
                      { text: e.get('text'), fill: c.getTextColor() },
                      { disableBox: !0 },
                    ),
                    z2: 10,
                  }),
                  m = f.getBoundingRect(),
                  y = e.get('subtext'),
                  v = new r.Ay({
                    style: (0, l.VB)(
                      p,
                      {
                        text: y,
                        fill: p.getTextColor(),
                        y: m.height + e.get('itemGap'),
                        verticalAlign: 'top',
                      },
                      { disableBox: !0 },
                    ),
                    z2: 10,
                  }),
                  x = e.get('link'),
                  _ = e.get('sublink'),
                  b = e.get('triggerEvent', !0);
                ((f.silent = !x && !b),
                  (v.silent = !_ && !b),
                  x &&
                    f.on('click', function () {
                      (0, d.JW)(x, '_' + e.get('target'));
                    }),
                  _ &&
                    v.on('click', function () {
                      (0, d.JW)(_, '_' + e.get('subtarget'));
                    }),
                  ((0, s.z)(f).eventData = (0, s.z)(v).eventData =
                    b ? { componentType: 'title', componentIndex: e.componentIndex } : null),
                  o.add(f),
                  y && o.add(v));
                var S = o.getBoundingRect(),
                  A = e.getBoxLayoutParams();
                ((A.width = S.width), (A.height = S.height));
                var M = (0, u.dV)(
                  A,
                  { width: n.getWidth(), height: n.getHeight() },
                  e.get('padding'),
                );
                (g ||
                  ('middle' === (g = e.get('left') || e.get('right')) && (g = 'center'),
                  'right' === g ? (M.x += M.width) : 'center' === g && (M.x += M.width / 2)),
                  h ||
                    ('center' === (h = e.get('top') || e.get('bottom')) && (h = 'middle'),
                    'bottom' === h ? (M.y += M.height) : 'middle' === h && (M.y += M.height / 2),
                    (h = h || 'top')),
                  (o.x = M.x),
                  (o.y = M.y),
                  o.markRedraw());
                var w = { align: g, verticalAlign: h };
                (f.setStyle(w), v.setStyle(w), (S = o.getBoundingRect()));
                var I = M.margin,
                  C = e.getItemStyle(['color', 'opacity']);
                C.fill = e.get('backgroundColor');
                var D = new a.A({
                  shape: {
                    x: S.x - I[3],
                    y: S.y - I[0],
                    width: S.width + I[1] + I[3],
                    height: S.height + I[0] + I[2],
                    r: e.get('borderRadius'),
                  },
                  style: C,
                  subPixelOptimize: !0,
                  silent: !0,
                });
                o.add(D);
              }
            }),
            (t.type = 'title'),
            t
          );
        })(p.A);
      function f(e) {
        (e.registerComponentModel(g), e.registerComponentView(h));
      }
    },
  },
]);
