'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [77586],
  {
    645764: (e, t, a) => {
      a.d(t, { A: () => r });
      const r = {
        time: {
          month: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          monthAbbr: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          dayOfWeekAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        legend: { selector: { all: 'All', inverse: 'Inv' } },
        toolbox: {
          brush: {
            title: {
              rect: 'Box Select',
              polygon: 'Lasso Select',
              lineX: 'Horizontally Select',
              lineY: 'Vertically Select',
              keep: 'Keep Selections',
              clear: 'Clear Selections',
            },
          },
          dataView: { title: 'Data View', lang: ['Data View', 'Close', 'Refresh'] },
          dataZoom: { title: { zoom: 'Zoom', back: 'Zoom Reset' } },
          magicType: {
            title: {
              line: 'Switch to Line Chart',
              bar: 'Switch to Bar Chart',
              stack: 'Stack',
              tiled: 'Tile',
            },
          },
          restore: { title: 'Restore' },
          saveAsImage: { title: 'Save as Image', lang: ['Right Click to Save Image'] },
        },
        series: {
          typeNames: {
            pie: 'Pie chart',
            bar: 'Bar chart',
            line: 'Line chart',
            scatter: 'Scatter plot',
            effectScatter: 'Ripple scatter plot',
            radar: 'Radar chart',
            tree: 'Tree',
            treemap: 'Treemap',
            boxplot: 'Boxplot',
            candlestick: 'Candlestick',
            k: 'K line chart',
            heatmap: 'Heat map',
            map: 'Map',
            parallel: 'Parallel coordinate map',
            lines: 'Line graph',
            graph: 'Relationship graph',
            sankey: 'Sankey diagram',
            funnel: 'Funnel chart',
            gauge: 'Gauge',
            pictorialBar: 'Pictorial bar',
            themeRiver: 'Theme River Map',
            sunburst: 'Sunburst',
            custom: 'Custom chart',
            chart: 'Chart',
          },
        },
        aria: {
          general: {
            withTitle: 'This is a chart about "{title}"',
            withoutTitle: 'This is a chart',
          },
          series: {
            single: {
              prefix: '',
              withName: ' with type {seriesType} named {seriesName}.',
              withoutName: ' with type {seriesType}.',
            },
            multiple: {
              prefix: '. It consists of {seriesCount} series count.',
              withName: ' The {seriesId} series is a {seriesType} representing {seriesName}.',
              withoutName: ' The {seriesId} series is a {seriesType}.',
              separator: { middle: '', end: '' },
            },
          },
          data: {
            allData: 'The data is as follows: ',
            partialData: 'The first {displayCnt} items are: ',
            withName: 'the data for {name} is {value}',
            withoutName: '{value}',
            separator: { middle: ', ', end: '. ' },
          },
        },
      };
    },
    723073: (e, t, a) => {
      a.d(t, { A: () => r });
      const r = {
        time: {
          month: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
          ],
          monthAbbr: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],
          dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          dayOfWeekAbbr: ['日', '一', '二', '三', '四', '五', '六'],
        },
        legend: { selector: { all: '全选', inverse: '反选' } },
        toolbox: {
          brush: {
            title: {
              rect: '矩形选择',
              polygon: '圈选',
              lineX: '横向选择',
              lineY: '纵向选择',
              keep: '保持选择',
              clear: '清除选择',
            },
          },
          dataView: { title: '数据视图', lang: ['数据视图', '关闭', '刷新'] },
          dataZoom: { title: { zoom: '区域缩放', back: '区域缩放还原' } },
          magicType: {
            title: {
              line: '切换为折线图',
              bar: '切换为柱状图',
              stack: '切换为堆叠',
              tiled: '切换为平铺',
            },
          },
          restore: { title: '还原' },
          saveAsImage: { title: '保存为图片', lang: ['右键另存为图片'] },
        },
        series: {
          typeNames: {
            pie: '饼图',
            bar: '柱状图',
            line: '折线图',
            scatter: '散点图',
            effectScatter: '涟漪散点图',
            radar: '雷达图',
            tree: '树图',
            treemap: '矩形树图',
            boxplot: '箱型图',
            candlestick: 'K线图',
            k: 'K线图',
            heatmap: '热力图',
            map: '地图',
            parallel: '平行坐标图',
            lines: '线图',
            graph: '关系图',
            sankey: '桑基图',
            funnel: '漏斗图',
            gauge: '仪表盘图',
            pictorialBar: '象形柱图',
            themeRiver: '主题河流图',
            sunburst: '旭日图',
            custom: '自定义图表',
            chart: '图表',
          },
        },
        aria: {
          general: { withTitle: '这是一个关于“{title}”的图表。', withoutTitle: '这是一个图表，' },
          series: {
            single: {
              prefix: '',
              withName: '图表类型是{seriesType}，表示{seriesName}。',
              withoutName: '图表类型是{seriesType}。',
            },
            multiple: {
              prefix: '它由{seriesCount}个图表系列组成。',
              withName: '第{seriesId}个系列是一个表示{seriesName}的{seriesType}，',
              withoutName: '第{seriesId}个系列是一个{seriesType}，',
              separator: { middle: '；', end: '。' },
            },
          },
          data: {
            allData: '其数据是——',
            partialData: '其中，前{displayCnt}项是——',
            withName: '{name}的数据是{value}',
            withoutName: '{value}',
            separator: { middle: '，', end: '' },
          },
        },
      };
    },
    535278: (e, t, a) => {
      a.d(t, { _: () => S });
      var r = a(48170),
        i = a(529308),
        n = a(683257),
        o = a(669622),
        l = a(624326),
        s = a(692836),
        d = a(392621),
        u = a(498026),
        c = a(77175),
        h = a(289632),
        f = a(941589);
      function g(e) {
        if (e) {
          for (var t = [], a = 0; a < e.length; a++) t.push(e[a].slice());
          return t;
        }
      }
      function v(e, t) {
        var a = e.label,
          r = t && t.getTextGuideLine();
        return {
          dataIndex: e.dataIndex,
          dataType: e.dataType,
          seriesIndex: e.seriesModel.seriesIndex,
          text: e.label.style.text,
          rect: e.hostRect,
          labelRect: e.rect,
          align: a.style.align,
          verticalAlign: a.style.verticalAlign,
          labelLinePoints: g(r && r.shape.points),
        };
      }
      var p = ['align', 'verticalAlign', 'width', 'height', 'fontSize'],
        y = new s.Ay(),
        m = (0, r.$r)(),
        b = (0, r.$r)();
      function x(e, t, a) {
        for (var r = 0; r < a.length; r++) {
          var i = a[r];
          null != t[i] && (e[i] = t[i]);
        }
      }
      var w = ['x', 'y', 'rotation'];
      const A = (function () {
        function e() {
          ((this._labelList = []), (this._chartViewList = []));
        }
        return (
          (e.prototype.clearLabels = function () {
            ((this._labelList = []), (this._chartViewList = []));
          }),
          (e.prototype._addLabel = function (e, t, a, r, n) {
            var o = r.style,
              l = r.__hostTarget.textConfig || {},
              s = r.getComputedTransform(),
              d = r.getBoundingRect().plain();
            (i.A.applyTransform(d, d, s),
              s
                ? y.setLocalTransform(s)
                : ((y.x = y.y = y.rotation = y.originX = y.originY = 0), (y.scaleX = y.scaleY = 1)),
              (y.rotation = (0, f.n)(y.rotation)));
            var u,
              c = r.__hostTarget;
            if (c) {
              u = c.getBoundingRect().plain();
              var h = c.getComputedTransform();
              i.A.applyTransform(u, u, h);
            }
            var g = u && c.getTextGuideLine();
            this._labelList.push({
              label: r,
              labelLine: g,
              seriesModel: a,
              dataIndex: e,
              dataType: t,
              layoutOption: n,
              computedLayoutOption: null,
              rect: d,
              hostRect: u,
              priority: u ? u.width * u.height : 0,
              defaultAttr: {
                ignore: r.ignore,
                labelGuideIgnore: g && g.ignore,
                x: y.x,
                y: y.y,
                scaleX: y.scaleX,
                scaleY: y.scaleY,
                rotation: y.rotation,
                style: {
                  x: o.x,
                  y: o.y,
                  align: o.align,
                  verticalAlign: o.verticalAlign,
                  width: o.width,
                  height: o.height,
                  fontSize: o.fontSize,
                },
                cursor: r.cursor,
                attachedPos: l.position,
                attachedRot: l.rotation,
              },
            });
          }),
          (e.prototype.addLabelsOfSeries = function (e) {
            var t = this;
            this._chartViewList.push(e);
            var a = e.__model,
              r = a.get('labelLayout');
            ((0, u.isFunction)(r) || (0, u.keys)(r).length) &&
              e.group.traverse(function (e) {
                if (e.ignore) return !0;
                var i = e.getTextContent(),
                  n = (0, o.z)(e);
                i && !i.disableLabelLayout && t._addLabel(n.dataIndex, n.dataType, a, i, r);
              });
          }),
          (e.prototype.updateLayoutConfig = function (e) {
            var t = e.getWidth(),
              a = e.getHeight();
            function r(e, t) {
              return function () {
                (0, d.lB)(e, t);
              };
            }
            for (var i = 0; i < this._labelList.length; i++) {
              var n = this._labelList[i],
                o = n.label,
                s = o.__hostTarget,
                c = n.defaultAttr,
                h = void 0;
              ((h =
                (h = (0, u.isFunction)(n.layoutOption)
                  ? n.layoutOption(v(n, s))
                  : n.layoutOption) || {}),
                (n.computedLayoutOption = h));
              var f = Math.PI / 180;
              s &&
                s.setTextConfig({
                  local: !1,
                  position: null != h.x || null != h.y ? null : c.attachedPos,
                  rotation: null != h.rotate ? h.rotate * f : c.attachedRot,
                  offset: [h.dx || 0, h.dy || 0],
                });
              var g = !1;
              if (
                (null != h.x
                  ? ((o.x = (0, l.lo)(h.x, t)), o.setStyle('x', 0), (g = !0))
                  : ((o.x = c.x), o.setStyle('x', c.style.x)),
                null != h.y
                  ? ((o.y = (0, l.lo)(h.y, a)), o.setStyle('y', 0), (g = !0))
                  : ((o.y = c.y), o.setStyle('y', c.style.y)),
                h.labelLinePoints)
              ) {
                var y = s.getTextGuideLine();
                y && (y.setShape({ points: h.labelLinePoints }), (g = !1));
              }
              ((m(o).needsUpdateLabelLine = g),
                (o.rotation = null != h.rotate ? h.rotate * f : c.rotation),
                (o.scaleX = c.scaleX),
                (o.scaleY = c.scaleY));
              for (var b = 0; b < p.length; b++) {
                var x = p[b];
                o.setStyle(x, null != h[x] ? h[x] : c.style[x]);
              }
              if (h.draggable) {
                if (((o.draggable = !0), (o.cursor = 'move'), s)) {
                  var w = n.seriesModel;
                  (null != n.dataIndex &&
                    (w = n.seriesModel.getData(n.dataType).getItemModel(n.dataIndex)),
                    o.on('drag', r(s, w.getModel('labelLine'))));
                }
              } else (o.off('drag'), (o.cursor = c.cursor));
            }
          }),
          (e.prototype.layout = function (e) {
            var t = e.getWidth(),
              a = e.getHeight(),
              r = (0, c.os)(this._labelList),
              i = (0, u.filter)(r, function (e) {
                return 'shiftX' === e.layoutOption.moveOverlap;
              }),
              n = (0, u.filter)(r, function (e) {
                return 'shiftY' === e.layoutOption.moveOverlap;
              });
            ((0, c.QX)(i, 0, t), (0, c.Xe)(n, 0, a));
            var o = (0, u.filter)(r, function (e) {
              return e.layoutOption.hideOverlap;
            });
            (0, c.If)(o);
          }),
          (e.prototype.processLabelsOverall = function () {
            var e = this;
            (0, u.each)(this._chartViewList, function (t) {
              var a = t.__model,
                r = t.ignoreLabelLineUpdate,
                i = a.isAnimationEnabled();
              t.group.traverse(function (t) {
                if (t.ignore && !t.forceLabelAnimation) return !0;
                var n = !r,
                  o = t.getTextContent();
                (!n && o && (n = m(o).needsUpdateLabelLine),
                  n && e._updateLabelLine(t, a),
                  i && e._animateLabels(t, a));
              });
            });
          }),
          (e.prototype._updateLabelLine = function (e, t) {
            var a = e.getTextContent(),
              r = (0, o.z)(e),
              i = r.dataIndex;
            if (a && null != i) {
              var n = t.getData(r.dataType),
                l = n.getItemModel(i),
                s = {},
                u = n.getItemVisual(i, 'style');
              if (u) {
                var c = n.getVisual('drawType');
                s.stroke = u[c];
              }
              var h = l.getModel('labelLine');
              ((0, d.eR)(e, (0, d.rv)(l), s), (0, d.lB)(e, h));
            }
          }),
          (e.prototype._animateLabels = function (e, t) {
            var a = e.getTextContent(),
              r = e.getTextGuideLine();
            if (
              a &&
              (e.forceLabelAnimation ||
                (!a.ignore && !a.invisible && !e.disableLabelAnimation && !(0, n.LR)(e)))
            ) {
              var i = (y = m(a)).oldLayout,
                l = (0, o.z)(e),
                s = l.dataIndex,
                d = { x: a.x, y: a.y, rotation: a.rotation },
                c = t.getData(l.dataType);
              if (i) {
                a.attr(i);
                var f = e.prevStates;
                (f &&
                  ((0, u.indexOf)(f, 'select') >= 0 && a.attr(y.oldLayoutSelect),
                  (0, u.indexOf)(f, 'emphasis') >= 0 && a.attr(y.oldLayoutEmphasis)),
                  (0, n.oi)(a, d, t, s));
              } else if ((a.attr(d), !(0, h.Lu)(a).valueAnimation)) {
                var g = (0, u.retrieve2)(a.style.opacity, 1);
                ((a.style.opacity = 0), (0, n.LW)(a, { style: { opacity: g } }, t, s));
              }
              if (((y.oldLayout = d), a.states.select)) {
                var v = (y.oldLayoutSelect = {});
                (x(v, d, w), x(v, a.states.select, w));
              }
              if (a.states.emphasis) {
                var p = (y.oldLayoutEmphasis = {});
                (x(p, d, w), x(p, a.states.emphasis, w));
              }
              (0, h.xb)(a, s, c, t, t);
            }
            if (r && !r.ignore && !r.invisible) {
              i = (y = b(r)).oldLayout;
              var y,
                A = { points: r.shape.points };
              (i
                ? (r.attr({ shape: i }), (0, n.oi)(r, { shape: A }, t))
                : (r.setShape(A),
                  (r.style.strokePercent = 0),
                  (0, n.LW)(r, { style: { strokePercent: 1 } }, t)),
                (y.oldLayout = A));
            }
          }),
          e
        );
      })();
      var M = (0, r.$r)();
      function S(e) {
        (e.registerUpdateLifecycle('series:beforeupdate', function (e, t, a) {
          var r = M(t).labelManager;
          (r || (r = M(t).labelManager = new A()), r.clearLabels());
        }),
          e.registerUpdateLifecycle('series:layoutlabels', function (e, t, a) {
            var r = M(t).labelManager;
            (a.updatedSeries.forEach(function (e) {
              r.addLabelsOfSeries(t.getViewOfSeriesModel(e));
            }),
              r.updateLayoutConfig(t),
              r.layout(t),
              r.processLabelsOverall());
          }));
      }
    },
    392621: (e, t, a) => {
      a.d(t, { QK: () => D, YI: () => B, eR: () => _, lB: () => k, rv: () => V });
      var r = a(726346),
        i = a(467065),
        n = a(39195),
        o = a(368717),
        l = a(941589),
        s = a(989259),
        d = a(498026),
        u = a(345587),
        c = a(983509),
        h = a(34833),
        f = 2 * Math.PI,
        g = o.A.CMD,
        v = ['top', 'right', 'bottom', 'left'];
      function p(e, t, a, r, i) {
        var n = a.width,
          o = a.height;
        switch (e) {
          case 'top':
            (r.set(a.x + n / 2, a.y - t), i.set(0, -1));
            break;
          case 'bottom':
            (r.set(a.x + n / 2, a.y + o + t), i.set(0, 1));
            break;
          case 'left':
            (r.set(a.x - t, a.y + o / 2), i.set(-1, 0));
            break;
          case 'right':
            (r.set(a.x + n + t, a.y + o / 2), i.set(1, 0));
        }
      }
      function y(e, t, a, r, i, n, o, s, d) {
        ((o -= e), (s -= t));
        var u = Math.sqrt(o * o + s * s),
          c = (o /= u) * a + e,
          h = (s /= u) * a + t;
        if (Math.abs(r - i) % f < 1e-4) return ((d[0] = c), (d[1] = h), u - a);
        if (n) {
          var g = r;
          ((r = (0, l.n)(i)), (i = (0, l.n)(g)));
        } else ((r = (0, l.n)(r)), (i = (0, l.n)(i)));
        r > i && (i += f);
        var v = Math.atan2(s, o);
        if ((v < 0 && (v += f), (v >= r && v <= i) || (v + f >= r && v + f <= i)))
          return ((d[0] = c), (d[1] = h), u - a);
        var p = a * Math.cos(r) + e,
          y = a * Math.sin(r) + t,
          m = a * Math.cos(i) + e,
          b = a * Math.sin(i) + t,
          x = (p - o) * (p - o) + (y - s) * (y - s),
          w = (m - o) * (m - o) + (b - s) * (b - s);
        return x < w
          ? ((d[0] = p), (d[1] = y), Math.sqrt(x))
          : ((d[0] = m), (d[1] = b), Math.sqrt(w));
      }
      function m(e, t, a, r, i, n, o, l) {
        var s = i - e,
          d = n - t,
          u = a - e,
          c = r - t,
          h = Math.sqrt(u * u + c * c),
          f = (s * (u /= h) + d * (c /= h)) / h;
        (l && (f = Math.min(Math.max(f, 0), 1)), (f *= h));
        var g = (o[0] = e + f * u),
          v = (o[1] = t + f * c);
        return Math.sqrt((g - i) * (g - i) + (v - n) * (v - n));
      }
      function b(e, t, a, r, i, n, o) {
        (a < 0 && ((e += a), (a = -a)), r < 0 && ((t += r), (r = -r)));
        var l = e + a,
          s = t + r,
          d = (o[0] = Math.min(Math.max(i, e), l)),
          u = (o[1] = Math.min(Math.max(n, t), s));
        return Math.sqrt((d - i) * (d - i) + (u - n) * (u - n));
      }
      var x = [];
      function w(e, t, a) {
        var r = b(t.x, t.y, t.width, t.height, e.x, e.y, x);
        return (a.set(x[0], x[1]), r);
      }
      function A(e, t, a) {
        for (
          var r, i, n = 0, o = 0, l = 0, d = 0, u = 1 / 0, c = t.data, h = e.x, f = e.y, v = 0;
          v < c.length;
        ) {
          var p = c[v++];
          1 === v && ((l = n = c[v]), (d = o = c[v + 1]));
          var w = u;
          switch (p) {
            case g.M:
              ((n = l = c[v++]), (o = d = c[v++]));
              break;
            case g.L:
              ((w = m(n, o, c[v], c[v + 1], h, f, x, !0)), (n = c[v++]), (o = c[v++]));
              break;
            case g.C:
              ((w = (0, s.Et)(n, o, c[v++], c[v++], c[v++], c[v++], c[v], c[v + 1], h, f, x)),
                (n = c[v++]),
                (o = c[v++]));
              break;
            case g.Q:
              ((w = (0, s.kh)(n, o, c[v++], c[v++], c[v], c[v + 1], h, f, x)),
                (n = c[v++]),
                (o = c[v++]));
              break;
            case g.A:
              var A = c[v++],
                M = c[v++],
                S = c[v++],
                T = c[v++],
                L = c[v++],
                C = c[v++];
              v += 1;
              var k = !!(1 - c[v++]);
              ((r = Math.cos(L) * S + A),
                (i = Math.sin(L) * T + M),
                v <= 1 && ((l = r), (d = i)),
                (w = y(A, M, T, L, L + C, k, ((h - A) * T) / S + A, f, x)),
                (n = Math.cos(L + C) * S + A),
                (o = Math.sin(L + C) * T + M));
              break;
            case g.R:
              w = b((l = n = c[v++]), (d = o = c[v++]), c[v++], c[v++], h, f, x);
              break;
            case g.Z:
              ((w = m(n, o, l, d, h, f, x, !0)), (n = l), (o = d));
          }
          w < u && ((u = w), a.set(x[0], x[1]));
        }
        return u;
      }
      var M = new r.A(),
        S = new r.A(),
        T = new r.A(),
        L = new r.A(),
        C = new r.A();
      function k(e, t) {
        if (e) {
          var a = e.getTextGuideLine(),
            n = e.getTextContent();
          if (n && a) {
            var o = e.textGuideLineConfig || {},
              l = [
                [0, 0],
                [0, 0],
                [0, 0],
              ],
              s = o.candidates || v,
              d = n.getBoundingRect().clone();
            d.applyTransform(n.getComputedTransform());
            var c = 1 / 0,
              h = o.anchor,
              f = e.getComputedTransform(),
              g = f && (0, u.invert)([], f),
              y = t.get('length2') || 0;
            h && T.copy(h);
            for (var m = 0; m < s.length; m++) {
              (p(s[m], 0, d, M, L), r.A.scaleAndAdd(S, M, L, y), S.transform(g));
              var b = e.getBoundingRect(),
                x = h ? h.distance(S) : e instanceof i.Ay ? A(S, e.path, T) : w(S, b, T);
              x < c &&
                ((c = x),
                S.transform(f),
                T.transform(f),
                T.toArray(l[0]),
                S.toArray(l[1]),
                M.toArray(l[2]));
            }
            (B(l, t.get('minTurnAngle')), a.setShape({ points: l }));
          }
        }
      }
      var I = [],
        W = new r.A();
      function B(e, t) {
        if (t <= 180 && t > 0) {
          ((t = (t / 180) * Math.PI),
            M.fromArray(e[0]),
            S.fromArray(e[1]),
            T.fromArray(e[2]),
            r.A.sub(L, M, S),
            r.A.sub(C, T, S));
          var a = L.len(),
            i = C.len();
          if (!(a < 0.001 || i < 0.001)) {
            (L.scale(1 / a), C.scale(1 / i));
            var n = L.dot(C);
            if (Math.cos(t) < n) {
              var o = m(S.x, S.y, T.x, T.y, M.x, M.y, I, !1);
              (W.fromArray(I), W.scaleAndAdd(C, o / Math.tan(Math.PI - t)));
              var l = T.x !== S.x ? (W.x - S.x) / (T.x - S.x) : (W.y - S.y) / (T.y - S.y);
              if (isNaN(l)) return;
              (l < 0 ? r.A.copy(W, S) : l > 1 && r.A.copy(W, T), W.toArray(e[1]));
            }
          }
        }
      }
      function D(e, t, a) {
        if (a <= 180 && a > 0) {
          ((a = (a / 180) * Math.PI),
            M.fromArray(e[0]),
            S.fromArray(e[1]),
            T.fromArray(e[2]),
            r.A.sub(L, S, M),
            r.A.sub(C, T, S));
          var i = L.len(),
            n = C.len();
          if (
            !(i < 0.001 || n < 0.001) &&
            (L.scale(1 / i), C.scale(1 / n), L.dot(t) < Math.cos(a))
          ) {
            var o = m(S.x, S.y, T.x, T.y, M.x, M.y, I, !1);
            W.fromArray(I);
            var l = Math.PI / 2,
              s = l + Math.acos(C.dot(t)) - a;
            if (s >= l) r.A.copy(W, T);
            else {
              W.scaleAndAdd(C, o / Math.tan(Math.PI / 2 - s));
              var d = T.x !== S.x ? (W.x - S.x) / (T.x - S.x) : (W.y - S.y) / (T.y - S.y);
              if (isNaN(d)) return;
              d < 0 ? r.A.copy(W, S) : d > 1 && r.A.copy(W, T);
            }
            W.toArray(e[1]);
          }
        }
      }
      function O(e, t, a, r) {
        var i = 'normal' === a,
          n = i ? e : e.ensureState(a);
        n.ignore = t;
        var o = r.get('smooth');
        (o && !0 === o && (o = 0.3), (n.shape = n.shape || {}), o > 0 && (n.shape.smooth = o));
        var l = r.getModel('lineStyle').getLineStyle();
        i ? e.useStyle(l) : (n.style = l);
      }
      function P(e, t) {
        var a = t.smooth,
          r = t.points;
        if (r)
          if ((e.moveTo(r[0][0], r[0][1]), a > 0 && r.length >= 3)) {
            var i = c.dist(r[0], r[1]),
              n = c.dist(r[1], r[2]);
            if (!i || !n) return (e.lineTo(r[1][0], r[1][1]), void e.lineTo(r[2][0], r[2][1]));
            var o = Math.min(i, n) * a,
              l = c.lerp([], r[1], r[0], o / i),
              s = c.lerp([], r[1], r[2], o / n),
              d = c.lerp([], l, s, 0.5);
            (e.bezierCurveTo(l[0], l[1], l[0], l[1], d[0], d[1]),
              e.bezierCurveTo(s[0], s[1], s[0], s[1], r[2][0], r[2][1]));
          } else for (var u = 1; u < r.length; u++) e.lineTo(r[u][0], r[u][1]);
      }
      function _(e, t, a) {
        var r = e.getTextGuideLine(),
          i = e.getTextContent();
        if (i) {
          for (var o = t.normal, l = o.get('show'), s = i.ignore, u = 0; u < h.wV.length; u++) {
            var c = h.wV[u],
              f = t[c],
              g = 'normal' === c;
            if (f) {
              var v = f.get('show');
              if (
                (g ? s : (0, d.retrieve2)(i.states[c] && i.states[c].ignore, s)) ||
                !(0, d.retrieve2)(v, l)
              ) {
                var p = g ? r : r && r.states[c];
                (p && (p.ignore = !0), r && O(r, !0, c, f));
                continue;
              }
              (r ||
                ((r = new n.A()),
                e.setTextGuideLine(r),
                g || (!s && l) || O(r, !0, 'normal', t.normal),
                e.stateProxy && (r.stateProxy = e.stateProxy)),
                O(r, !1, c, f));
            }
          }
          if (r) {
            ((0, d.defaults)(r.style, a), (r.style.fill = null));
            var y = o.get('showAbove');
            (((e.textGuideLineConfig = e.textGuideLineConfig || {}).showAbove = y || !1),
              (r.buildPath = P));
          }
        } else r && e.removeTextGuideLine();
      }
      function V(e, t) {
        t = t || 'labelLine';
        for (var a = { normal: e.getModel(t) }, r = 0; r < h.BV.length; r++) {
          var i = h.BV[r];
          a[i] = e.getModel([i, t]);
        }
        return a;
      }
    },
    77175: (e, t, a) => {
      a.d(t, { If: () => d, QX: () => l, Xe: () => s, os: () => n });
      var r = a(584716),
        i = a(529308);
      function n(e) {
        for (var t = [], a = 0; a < e.length; a++) {
          var i = e[a];
          if (!i.defaultAttr.ignore) {
            var n = i.label,
              o = n.getComputedTransform(),
              l = n.getBoundingRect(),
              s = !o || (o[1] < 1e-5 && o[2] < 1e-5),
              d = n.style.margin || 0,
              u = l.clone();
            (u.applyTransform(o), (u.x -= d / 2), (u.y -= d / 2), (u.width += d), (u.height += d));
            var c = s ? new r.A(l, o) : null;
            t.push({
              label: n,
              labelLine: i.labelLine,
              rect: u,
              localRect: l,
              obb: c,
              priority: i.priority,
              defaultAttr: i.defaultAttr,
              layoutOption: i.computedLayoutOption,
              axisAligned: s,
              transform: o,
            });
          }
        }
        return t;
      }
      function o(e, t, a, r, i, n) {
        var o = e.length;
        if (!(o < 2)) {
          e.sort(function (e, a) {
            return e.rect[t] - a.rect[t];
          });
          for (var l, s = 0, d = !1, u = [], c = 0, h = 0; h < o; h++) {
            var f = e[h],
              g = f.rect;
            (l = g[t] - s) < 0 && ((g[t] -= l), (f.label[t] -= l), (d = !0));
            var v = Math.max(-l, 0);
            (u.push(v), (c += v), (s = g[t] + g[a]));
          }
          c > 0 && n && A(-c / o, 0, o);
          var p,
            y,
            m = e[0],
            b = e[o - 1];
          return (
            x(),
            p < 0 && M(-p, 0.8),
            y < 0 && M(y, 0.8),
            x(),
            w(p, y, 1),
            w(y, p, -1),
            x(),
            p < 0 && S(-p),
            y < 0 && S(y),
            d
          );
        }
        function x() {
          ((p = m.rect[t] - r), (y = i - b.rect[t] - b.rect[a]));
        }
        function w(e, t, a) {
          if (e < 0) {
            var r = Math.min(t, -e);
            if (r > 0) {
              A(r * a, 0, o);
              var i = r + e;
              i < 0 && M(-i * a, 1);
            } else M(-e * a, 1);
          }
        }
        function A(a, r, i) {
          0 !== a && (d = !0);
          for (var n = r; n < i; n++) {
            var o = e[n];
            ((o.rect[t] += a), (o.label[t] += a));
          }
        }
        function M(r, i) {
          for (var n = [], l = 0, s = 1; s < o; s++) {
            var d = e[s - 1].rect,
              u = Math.max(e[s].rect[t] - d[t] - d[a], 0);
            (n.push(u), (l += u));
          }
          if (l) {
            var c = Math.min(Math.abs(r) / l, i);
            if (r > 0) for (s = 0; s < o - 1; s++) A(n[s] * c, 0, s + 1);
            else for (s = o - 1; s > 0; s--) A(-n[s - 1] * c, s, o);
          }
        }
        function S(e) {
          var t = e < 0 ? -1 : 1;
          e = Math.abs(e);
          for (var a = Math.ceil(e / (o - 1)), r = 0; r < o - 1; r++)
            if ((t > 0 ? A(a, 0, r + 1) : A(-a, o - r - 1, o), (e -= a) <= 0)) return;
        }
      }
      function l(e, t, a, r) {
        return o(e, 'x', 'width', t, a, r);
      }
      function s(e, t, a, r) {
        return o(e, 'y', 'height', t, a, r);
      }
      function d(e) {
        var t = [];
        e.sort(function (e, t) {
          return t.priority - e.priority;
        });
        var a = new i.A(0, 0, 0, 0);
        function n(e) {
          if (!e.ignore) {
            var t = e.ensureState('emphasis');
            null == t.ignore && (t.ignore = !1);
          }
          e.ignore = !0;
        }
        for (var o = 0; o < e.length; o++) {
          var l = e[o],
            s = l.axisAligned,
            d = l.localRect,
            u = l.transform,
            c = l.label,
            h = l.labelLine;
          (a.copy(l.rect), (a.width -= 0.1), (a.height -= 0.1), (a.x += 0.05), (a.y += 0.05));
          for (var f = l.obb, g = !1, v = 0; v < t.length; v++) {
            var p = t[v];
            if (a.intersect(p.rect)) {
              if (s && p.axisAligned) {
                g = !0;
                break;
              }
              if (
                (p.obb || (p.obb = new r.A(p.localRect, p.transform)),
                f || (f = new r.A(d, u)),
                f.intersect(p.obb))
              ) {
                g = !0;
                break;
              }
            }
          }
          g
            ? (n(c), h && n(h))
            : (c.attr('ignore', l.defaultAttr.ignore),
              h && h.attr('ignore', l.defaultAttr.labelGuideIgnore),
              t.push(l));
        }
      }
    },
    289632: (e, t, a) => {
      a.d(t, {
        Lu: () => x,
        Oh: () => w,
        VB: () => f,
        c8: () => b,
        lx: () => h,
        qM: () => c,
        sD: () => g,
        xb: () => A,
      });
      var r = a(132322),
        i = a(498026),
        n = a(34833),
        o = a(48170),
        l = a(683257),
        s = {};
      function d(e, t) {
        for (var a = 0; a < n.BV.length; a++) {
          var r = n.BV[a],
            i = t[r],
            o = e.ensureState(r);
          ((o.style = o.style || {}), (o.style.text = i));
        }
        var l = e.currentStates.slice();
        (e.clearStates(!0), e.setStyle({ text: t.normal }), e.useStates(l, !0));
      }
      function u(e, t, a) {
        var r,
          o = e.labelFetcher,
          l = e.labelDataIndex,
          s = e.labelDimIndex,
          d = t.normal;
        (o &&
          (r = o.getFormattedLabel(
            l,
            'normal',
            null,
            s,
            d && d.get('formatter'),
            null != a ? { interpolatedValue: a } : null,
          )),
          null == r &&
            (r = (0, i.isFunction)(e.defaultText) ? e.defaultText(l, e, a) : e.defaultText));
        for (var u = { normal: r }, c = 0; c < n.BV.length; c++) {
          var h = n.BV[c],
            f = t[h];
          u[h] = (0, i.retrieve2)(
            o ? o.getFormattedLabel(l, h, null, s, f && f.get('formatter')) : null,
            r,
          );
        }
        return u;
      }
      function c(e, t, a, o) {
        a = a || s;
        for (var l = e instanceof r.Ay, c = !1, h = 0; h < n.wV.length; h++)
          if ((w = t[n.wV[h]]) && w.getShallow('show')) {
            c = !0;
            break;
          }
        var v = l ? e : e.getTextContent();
        if (c) {
          l ||
            (v || ((v = new r.Ay()), e.setTextContent(v)),
            e.stateProxy && (v.stateProxy = e.stateProxy));
          var p = u(a, t),
            y = t.normal,
            m = !!y.getShallow('show'),
            b = f(y, o && o.normal, a, !1, !l);
          for (b.text = p.normal, l || e.setTextConfig(g(y, a, !1)), h = 0; h < n.BV.length; h++) {
            var w,
              A = n.BV[h];
            if ((w = t[A])) {
              var M = v.ensureState(A),
                S = !!(0, i.retrieve2)(w.getShallow('show'), m);
              (S !== m && (M.ignore = !S),
                (M.style = f(w, o && o[A], a, !0, !l)),
                (M.style.text = p[A]),
                l || (e.ensureState(A).textConfig = g(w, a, !0)));
            }
          }
          ((v.silent = !!y.getShallow('silent')),
            null != v.style.x && (b.x = v.style.x),
            null != v.style.y && (b.y = v.style.y),
            (v.ignore = !m),
            v.useStyle(b),
            v.dirty(),
            a.enableTextSetter &&
              (x(v).setLabelText = function (e) {
                var r = u(a, t, e);
                d(v, r);
              }));
        } else v && (v.ignore = !0);
        e.dirty();
      }
      function h(e, t) {
        t = t || 'label';
        for (var a = { normal: e.getModel(t) }, r = 0; r < n.BV.length; r++) {
          var i = n.BV[r];
          a[i] = e.getModel([i, t]);
        }
        return a;
      }
      function f(e, t, a, r, n) {
        var o = {};
        return (
          (function (e, t, a, r, n) {
            a = a || s;
            var o,
              l = t.ecModel,
              d = l && l.option.textStyle,
              u = (function (e) {
                for (var t; e && e !== e.ecModel;) {
                  var a = (e.option || s).rich;
                  if (a) {
                    t = t || {};
                    for (var r = (0, i.keys)(a), n = 0; n < r.length; n++) t[r[n]] = 1;
                  }
                  e = e.parentModel;
                }
                return t;
              })(t);
            if (u)
              for (var c in ((o = {}), u))
                if (u.hasOwnProperty(c)) {
                  var h = t.getModel(['rich', c]);
                  m((o[c] = {}), h, d, a, r, n, !1, !0);
                }
            o && (e.rich = o);
            var f = t.get('overflow');
            f && (e.overflow = f);
            var g = t.get('minMargin');
            (null != g && (e.margin = g), m(e, t, d, a, r, n, !0, !1));
          })(o, e, a, r, n),
          t && (0, i.extend)(o, t),
          o
        );
      }
      function g(e, t, a) {
        t = t || {};
        var r,
          n = {},
          o = e.getShallow('rotate'),
          l = (0, i.retrieve2)(e.getShallow('distance'), a ? null : 5),
          s = e.getShallow('offset');
        return (
          'outside' === (r = e.getShallow('position') || (a ? null : 'inside')) &&
            (r = t.defaultOutsidePosition || 'top'),
          null != r && (n.position = r),
          null != s && (n.offset = s),
          null != o && ((o *= Math.PI / 180), (n.rotation = o)),
          null != l && (n.distance = l),
          (n.outsideFill = 'inherit' === e.get('color') ? t.inheritColor || null : 'auto'),
          n
        );
      }
      var v = [
          'fontStyle',
          'fontWeight',
          'fontSize',
          'fontFamily',
          'textShadowColor',
          'textShadowBlur',
          'textShadowOffsetX',
          'textShadowOffsetY',
        ],
        p = ['align', 'lineHeight', 'width', 'height', 'tag', 'verticalAlign', 'ellipsis'],
        y = [
          'padding',
          'borderWidth',
          'borderRadius',
          'borderDashOffset',
          'backgroundColor',
          'borderColor',
          'shadowColor',
          'shadowBlur',
          'shadowOffsetX',
          'shadowOffsetY',
        ];
      function m(e, t, a, r, n, o, l, d) {
        a = (!n && a) || s;
        var u = r && r.inheritColor,
          c = t.getShallow('color'),
          h = t.getShallow('textBorderColor'),
          f = (0, i.retrieve2)(t.getShallow('opacity'), a.opacity);
        (('inherit' !== c && 'auto' !== c) || (c = u || null),
          ('inherit' !== h && 'auto' !== h) || (h = u || null),
          o || ((c = c || a.color), (h = h || a.textBorderColor)),
          null != c && (e.fill = c),
          null != h && (e.stroke = h));
        var g = (0, i.retrieve2)(t.getShallow('textBorderWidth'), a.textBorderWidth);
        null != g && (e.lineWidth = g);
        var m = (0, i.retrieve2)(t.getShallow('textBorderType'), a.textBorderType);
        null != m && (e.lineDash = m);
        var b = (0, i.retrieve2)(t.getShallow('textBorderDashOffset'), a.textBorderDashOffset);
        (null != b && (e.lineDashOffset = b),
          n || null != f || d || (f = r && r.defaultOpacity),
          null != f && (e.opacity = f),
          n || o || (null == e.fill && r.inheritColor && (e.fill = r.inheritColor)));
        for (var x = 0; x < v.length; x++) {
          var w = v[x];
          null != (M = (0, i.retrieve2)(t.getShallow(w), a[w])) && (e[w] = M);
        }
        for (x = 0; x < p.length; x++) ((w = p[x]), null != (M = t.getShallow(w)) && (e[w] = M));
        if (null == e.verticalAlign) {
          var A = t.getShallow('baseline');
          null != A && (e.verticalAlign = A);
        }
        if (!l || !r.disableBox) {
          for (x = 0; x < y.length; x++) {
            var M;
            ((w = y[x]), null != (M = t.getShallow(w)) && (e[w] = M));
          }
          var S = t.getShallow('borderType');
          (null != S && (e.borderDash = S),
            ('auto' !== e.backgroundColor && 'inherit' !== e.backgroundColor) ||
              !u ||
              (e.backgroundColor = u),
            ('auto' !== e.borderColor && 'inherit' !== e.borderColor) || !u || (e.borderColor = u));
        }
      }
      function b(e, t) {
        var a = t && t.getModel('textStyle');
        return (0, i.trim)(
          [
            e.fontStyle || (a && a.getShallow('fontStyle')) || '',
            e.fontWeight || (a && a.getShallow('fontWeight')) || '',
            (e.fontSize || (a && a.getShallow('fontSize')) || 12) + 'px',
            e.fontFamily || (a && a.getShallow('fontFamily')) || 'sans-serif',
          ].join(' '),
        );
      }
      var x = (0, o.$r)();
      function w(e, t, a, r) {
        if (e) {
          var i = x(e);
          ((i.prevValue = i.value), (i.value = a));
          var n = t.normal;
          ((i.valueAnimation = n.get('valueAnimation')),
            i.valueAnimation &&
              ((i.precision = n.get('precision')),
              (i.defaultInterpolatedText = r),
              (i.statesModels = t)));
        }
      }
      function A(e, t, a, r, n) {
        var s = x(e);
        if (s.valueAnimation && s.prevValue !== s.value) {
          var c = s.defaultInterpolatedText,
            h = (0, i.retrieve2)(s.interpolatedValue, s.prevValue),
            f = s.value;
          ((e.percent = 0),
            (null == s.prevValue ? l.LW : l.oi)(e, { percent: 1 }, r, t, null, function (r) {
              var i = (0, o.Il)(a, s.precision, h, f, r);
              s.interpolatedValue = 1 === r ? null : i;
              var l = u(
                { labelDataIndex: t, labelFetcher: n, defaultText: c ? c(i) : i + '' },
                s.statesModels,
                i,
              );
              d(e, l);
            }));
        }
      }
    },
    294327: (e, t, a) => {
      a.d(t, { W: () => o, r: () => n });
      var r = a(945558),
        i = a(498026);
      function n(e, t) {
        var a = (t = t || {}).isRoundCap;
        return function (t, i, n) {
          var o = i.position;
          if (!o || o instanceof Array) return (0, r.X4)(t, i, n);
          var d = e(o),
            u = null != i.distance ? i.distance : 5,
            c = this.shape,
            h = c.cx,
            f = c.cy,
            g = c.r,
            v = c.r0,
            p = (g + v) / 2,
            y = c.startAngle,
            m = c.endAngle,
            b = (y + m) / 2,
            x = a ? Math.abs(g - v) / 2 : 0,
            w = Math.cos,
            A = Math.sin,
            M = h + g * w(y),
            S = f + g * A(y),
            T = 'left',
            L = 'top';
          switch (d) {
            case 'startArc':
              ((M = h + (v - u) * w(b)), (S = f + (v - u) * A(b)), (T = 'center'), (L = 'top'));
              break;
            case 'insideStartArc':
              ((M = h + (v + u) * w(b)), (S = f + (v + u) * A(b)), (T = 'center'), (L = 'bottom'));
              break;
            case 'startAngle':
              ((M = h + p * w(y) + l(y, u + x, !1)),
                (S = f + p * A(y) + s(y, u + x, !1)),
                (T = 'right'),
                (L = 'middle'));
              break;
            case 'insideStartAngle':
              ((M = h + p * w(y) + l(y, -u + x, !1)),
                (S = f + p * A(y) + s(y, -u + x, !1)),
                (T = 'left'),
                (L = 'middle'));
              break;
            case 'middle':
              ((M = h + p * w(b)), (S = f + p * A(b)), (T = 'center'), (L = 'middle'));
              break;
            case 'endArc':
              ((M = h + (g + u) * w(b)), (S = f + (g + u) * A(b)), (T = 'center'), (L = 'bottom'));
              break;
            case 'insideEndArc':
              ((M = h + (g - u) * w(b)), (S = f + (g - u) * A(b)), (T = 'center'), (L = 'top'));
              break;
            case 'endAngle':
              ((M = h + p * w(m) + l(m, u + x, !0)),
                (S = f + p * A(m) + s(m, u + x, !0)),
                (T = 'left'),
                (L = 'middle'));
              break;
            case 'insideEndAngle':
              ((M = h + p * w(m) + l(m, -u + x, !0)),
                (S = f + p * A(m) + s(m, -u + x, !0)),
                (T = 'right'),
                (L = 'middle'));
              break;
            default:
              return (0, r.X4)(t, i, n);
          }
          return (((t = t || {}).x = M), (t.y = S), (t.align = T), (t.verticalAlign = L), t);
        };
      }
      function o(e, t, a, r) {
        if ((0, i.isNumber)(r)) e.setTextConfig({ rotation: r });
        else if ((0, i.isArray)(t)) e.setTextConfig({ rotation: 0 });
        else {
          var n,
            o = e.shape,
            l = o.clockwise ? o.startAngle : o.endAngle,
            s = o.clockwise ? o.endAngle : o.startAngle,
            d = (l + s) / 2,
            u = a(t);
          switch (u) {
            case 'startArc':
            case 'insideStartArc':
            case 'middle':
            case 'insideEndArc':
            case 'endArc':
              n = d;
              break;
            case 'startAngle':
            case 'insideStartAngle':
              n = l;
              break;
            case 'endAngle':
            case 'insideEndAngle':
              n = s;
              break;
            default:
              return void e.setTextConfig({ rotation: 0 });
          }
          var c = 1.5 * Math.PI - n;
          ('middle' === u && c > Math.PI / 2 && c < 1.5 * Math.PI && (c -= Math.PI),
            e.setTextConfig({ rotation: c }));
        }
      }
      function l(e, t, a) {
        return t * Math.sin(e) * (a ? -1 : 1);
      }
      function s(e, t, a) {
        return t * Math.cos(e) * (a ? 1 : -1);
      }
    },
    462536: (e, t, a) => {
      a.d(t, { DL: () => c, GL: () => h, KF: () => y, VA: () => v, Zp: () => p, vq: () => f });
      var r = a(498026),
        i = a(624326),
        n = a(265008),
        o = a(687582),
        l = a(108957),
        s = '__ec_stack_';
      function d(e) {
        return e.get('stack') || s + e.seriesIndex;
      }
      function u(e) {
        return e.dim + e.index;
      }
      function c(e) {
        var t = [],
          a = e.axis,
          i = 'axis0';
        if ('category' === a.type) {
          for (var n = a.getBandWidth(), o = 0; o < e.count; o++)
            t.push((0, r.defaults)({ bandWidth: n, axisKey: i, stackId: s + o }, e));
          var l = g(t),
            d = [];
          for (o = 0; o < e.count; o++) {
            var u = l[i][s + o];
            ((u.offsetCenter = u.offset + u.width / 2), d.push(u));
          }
          return d;
        }
      }
      function h(e, t) {
        var a = [];
        return (
          t.eachSeriesByType(e, function (e) {
            m(e) && a.push(e);
          }),
          a
        );
      }
      function f(e) {
        var t = (function (e) {
            var t = {};
            (0, r.each)(e, function (e) {
              var a = e.coordinateSystem.getBaseAxis();
              if ('time' === a.type || 'value' === a.type)
                for (
                  var r = e.getData(),
                    i = a.dim + '_' + a.index,
                    n = r.getDimensionIndex(r.mapDimension(a.dim)),
                    o = r.getStore(),
                    l = 0,
                    s = o.count();
                  l < s;
                  ++l
                ) {
                  var d = o.get(n, l);
                  t[i] ? t[i].push(d) : (t[i] = [d]);
                }
            });
            var a = {};
            for (var i in t)
              if (t.hasOwnProperty(i)) {
                var n = t[i];
                if (n) {
                  n.sort(function (e, t) {
                    return e - t;
                  });
                  for (var o = null, l = 1; l < n.length; ++l) {
                    var s = n[l] - n[l - 1];
                    s > 0 && (o = null === o ? s : Math.min(o, s));
                  }
                  a[i] = o;
                }
              }
            return a;
          })(e),
          a = [];
        return (
          (0, r.each)(e, function (e) {
            var r,
              n = e.coordinateSystem.getBaseAxis(),
              o = n.getExtent();
            if ('category' === n.type) r = n.getBandWidth();
            else if ('value' === n.type || 'time' === n.type) {
              var l = n.dim + '_' + n.index,
                s = t[l],
                c = Math.abs(o[1] - o[0]),
                h = n.scale.getExtent(),
                f = Math.abs(h[1] - h[0]);
              r = s ? (c / f) * s : c;
            } else {
              var g = e.getData();
              r = Math.abs(o[1] - o[0]) / g.count();
            }
            var v = (0, i.lo)(e.get('barWidth'), r),
              p = (0, i.lo)(e.get('barMaxWidth'), r),
              y = (0, i.lo)(e.get('barMinWidth') || (b(e) ? 0.5 : 1), r),
              m = e.get('barGap'),
              x = e.get('barCategoryGap');
            a.push({
              bandWidth: r,
              barWidth: v,
              barMaxWidth: p,
              barMinWidth: y,
              barGap: m,
              barCategoryGap: x,
              axisKey: u(n),
              stackId: d(e),
            });
          }),
          g(a)
        );
      }
      function g(e) {
        var t = {};
        (0, r.each)(e, function (e, a) {
          var r = e.axisKey,
            i = e.bandWidth,
            n = t[r] || {
              bandWidth: i,
              remainedWidth: i,
              autoWidthCount: 0,
              categoryGap: null,
              gap: '20%',
              stacks: {},
            },
            o = n.stacks;
          t[r] = n;
          var l = e.stackId;
          (o[l] || n.autoWidthCount++, (o[l] = o[l] || { width: 0, maxWidth: 0 }));
          var s = e.barWidth;
          s &&
            !o[l].width &&
            ((o[l].width = s), (s = Math.min(n.remainedWidth, s)), (n.remainedWidth -= s));
          var d = e.barMaxWidth;
          d && (o[l].maxWidth = d);
          var u = e.barMinWidth;
          u && (o[l].minWidth = u);
          var c = e.barGap;
          null != c && (n.gap = c);
          var h = e.barCategoryGap;
          null != h && (n.categoryGap = h);
        });
        var a = {};
        return (
          (0, r.each)(t, function (e, t) {
            a[t] = {};
            var n = e.stacks,
              o = e.bandWidth,
              l = e.categoryGap;
            if (null == l) {
              var s = (0, r.keys)(n).length;
              l = Math.max(35 - 4 * s, 15) + '%';
            }
            var d = (0, i.lo)(l, o),
              u = (0, i.lo)(e.gap, 1),
              c = e.remainedWidth,
              h = e.autoWidthCount,
              f = (c - d) / (h + (h - 1) * u);
            ((f = Math.max(f, 0)),
              (0, r.each)(n, function (e) {
                var t = e.maxWidth,
                  a = e.minWidth;
                if (e.width)
                  ((r = e.width),
                    t && (r = Math.min(r, t)),
                    a && (r = Math.max(r, a)),
                    (e.width = r),
                    (c -= r + u * r),
                    h--);
                else {
                  var r = f;
                  (t && t < r && (r = Math.min(t, c)),
                    a && a > r && (r = a),
                    r !== f && ((e.width = r), (c -= r + u * r), h--));
                }
              }),
              (f = (c - d) / (h + (h - 1) * u)),
              (f = Math.max(f, 0)));
            var g,
              v = 0;
            ((0, r.each)(n, function (e, t) {
              (e.width || (e.width = f), (g = e), (v += e.width * (1 + u)));
            }),
              g && (v -= g.width * u));
            var p = -v / 2;
            (0, r.each)(n, function (e, r) {
              ((a[t][r] = a[t][r] || { bandWidth: o, offset: p, width: e.width }),
                (p += e.width * (1 + u)));
            });
          }),
          a
        );
      }
      function v(e, t, a) {
        if (e && t) {
          var r = e[u(t)];
          return null != r && null != a ? r[d(a)] : r;
        }
      }
      function p(e, t) {
        var a = h(e, t),
          i = f(a);
        (0, r.each)(a, function (e) {
          var t = e.getData(),
            a = e.coordinateSystem.getBaseAxis(),
            r = d(e),
            n = i[u(a)][r],
            o = n.offset,
            l = n.width;
          t.setLayout({ bandWidth: n.bandWidth, offset: o, size: l });
        });
      }
      function y(e) {
        return {
          seriesType: e,
          plan: (0, o.A)(),
          reset: function (e) {
            if (m(e)) {
              var t = e.getData(),
                a = e.coordinateSystem,
                r = a.getBaseAxis(),
                i = a.getOtherAxis(r),
                o = t.getDimensionIndex(t.mapDimension(i.dim)),
                s = t.getDimensionIndex(t.mapDimension(r.dim)),
                d = e.get('showBackground', !0),
                u = t.mapDimension(i.dim),
                c = t.getCalculationInfo('stackResultDimension'),
                h = (0, n.sJ)(t, u) && !!t.getCalculationInfo('stackedOnSeries'),
                f = i.isHorizontal(),
                g = (function (e, t) {
                  var a = t.model.get('startValue');
                  return (
                    a || (a = 0),
                    t.toGlobalCoord(t.dataToCoord('log' === t.type ? (a > 0 ? a : 1) : a))
                  );
                })(0, i),
                v = b(e),
                p = e.get('barMinHeight') || 0,
                y = c && t.getDimensionIndex(c),
                x = t.getLayout('size'),
                w = t.getLayout('offset');
              return {
                progress: function (e, t) {
                  for (
                    var r,
                      i = e.count,
                      n = v && (0, l.J)(3 * i),
                      u = v && d && (0, l.J)(3 * i),
                      c = v && (0, l.J)(i),
                      m = a.master.getRect(),
                      b = f ? m.width : m.height,
                      A = t.getStore(),
                      M = 0;
                    null != (r = e.next());
                  ) {
                    var S = A.get(h ? y : o, r),
                      T = A.get(s, r),
                      L = g,
                      C = void 0;
                    h && (C = +S - A.get(o, r));
                    var k = void 0,
                      I = void 0,
                      W = void 0,
                      B = void 0;
                    if (f) {
                      var D = a.dataToPoint([S, T]);
                      (h && (L = a.dataToPoint([C, T])[0]),
                        (k = L),
                        (I = D[1] + w),
                        (W = D[0] - L),
                        (B = x),
                        Math.abs(W) < p && (W = (W < 0 ? -1 : 1) * p));
                    } else
                      ((D = a.dataToPoint([T, S])),
                        h && (L = a.dataToPoint([T, C])[1]),
                        (k = D[0] + w),
                        (I = L),
                        (W = x),
                        (B = D[1] - L),
                        Math.abs(B) < p && (B = (B <= 0 ? -1 : 1) * p));
                    (v
                      ? ((n[M] = k),
                        (n[M + 1] = I),
                        (n[M + 2] = f ? W : B),
                        u && ((u[M] = f ? m.x : k), (u[M + 1] = f ? I : m.y), (u[M + 2] = b)),
                        (c[r] = r))
                      : t.setItemLayout(r, { x: k, y: I, width: W, height: B }),
                      (M += 3));
                  }
                  v &&
                    t.setLayout({
                      largePoints: n,
                      largeDataIndices: c,
                      largeBackgroundPoints: u,
                      valueAxisHorizontal: f,
                    });
                },
              };
            }
          },
        };
      }
      function m(e) {
        return e.coordinateSystem && 'cartesian2d' === e.coordinateSystem.type;
      }
      function b(e) {
        return e.pipelineContext && e.pipelineContext.large;
      }
    },
    695926: (e, t, a) => {
      a.d(t, { A: () => s });
      var r = a(498026),
        i = a(624326),
        n = a(265008);
      function o(e) {
        return e.get('stack') || '__ec_stack_' + e.seriesIndex;
      }
      function l(e, t) {
        return t.dim + e.model.componentIndex;
      }
      const s = function (e, t, a) {
        var s = {},
          d = (function (e) {
            var t = {};
            r.each(e, function (e, a) {
              var r = e.getData(),
                n = e.coordinateSystem,
                s = n.getBaseAxis(),
                d = l(n, s),
                u = s.getExtent(),
                c = 'category' === s.type ? s.getBandWidth() : Math.abs(u[1] - u[0]) / r.count(),
                h = t[d] || {
                  bandWidth: c,
                  remainedWidth: c,
                  autoWidthCount: 0,
                  categoryGap: '20%',
                  gap: '30%',
                  stacks: {},
                },
                f = h.stacks;
              t[d] = h;
              var g = o(e);
              (f[g] || h.autoWidthCount++, (f[g] = f[g] || { width: 0, maxWidth: 0 }));
              var v = (0, i.lo)(e.get('barWidth'), c),
                p = (0, i.lo)(e.get('barMaxWidth'), c),
                y = e.get('barGap'),
                m = e.get('barCategoryGap');
              (v &&
                !f[g].width &&
                ((v = Math.min(h.remainedWidth, v)), (f[g].width = v), (h.remainedWidth -= v)),
                p && (f[g].maxWidth = p),
                null != y && (h.gap = y),
                null != m && (h.categoryGap = m));
            });
            var a = {};
            return (
              r.each(t, function (e, t) {
                a[t] = {};
                var n = e.stacks,
                  o = e.bandWidth,
                  l = (0, i.lo)(e.categoryGap, o),
                  s = (0, i.lo)(e.gap, 1),
                  d = e.remainedWidth,
                  u = e.autoWidthCount,
                  c = (d - l) / (u + (u - 1) * s);
                ((c = Math.max(c, 0)),
                  r.each(n, function (e, t) {
                    var a = e.maxWidth;
                    a &&
                      a < c &&
                      ((a = Math.min(a, d)),
                      e.width && (a = Math.min(a, e.width)),
                      (d -= a),
                      (e.width = a),
                      u--);
                  }),
                  (c = (d - l) / (u + (u - 1) * s)),
                  (c = Math.max(c, 0)));
                var h,
                  f = 0;
                (r.each(n, function (e, t) {
                  (e.width || (e.width = c), (h = e), (f += e.width * (1 + s)));
                }),
                  h && (f -= h.width * s));
                var g = -f / 2;
                r.each(n, function (e, r) {
                  ((a[t][r] = a[t][r] || { offset: g, width: e.width }), (g += e.width * (1 + s)));
                });
              }),
              a
            );
          })(
            r.filter(t.getSeriesByType(e), function (e) {
              return (
                !t.isSeriesFiltered(e) && e.coordinateSystem && 'polar' === e.coordinateSystem.type
              );
            }),
          );
        t.eachSeriesByType(e, function (e) {
          if ('polar' === e.coordinateSystem.type) {
            var t = e.getData(),
              a = e.coordinateSystem,
              r = a.getBaseAxis(),
              i = l(a, r),
              u = o(e),
              c = d[i][u],
              h = c.offset,
              f = c.width,
              g = a.getOtherAxis(r),
              v = e.coordinateSystem.cx,
              p = e.coordinateSystem.cy,
              y = e.get('barMinHeight') || 0,
              m = e.get('barMinAngle') || 0;
            s[u] = s[u] || [];
            for (
              var b = t.mapDimension(g.dim),
                x = t.mapDimension(r.dim),
                w = (0, n.sJ)(t, b),
                A = 'radius' !== r.dim || !e.get('roundCap', !0),
                M = g.model.get('startValue'),
                S = g.dataToCoord(M || 0),
                T = 0,
                L = t.count();
              T < L;
              T++
            ) {
              var C = t.get(b, T),
                k = t.get(x, T),
                I = C >= 0 ? 'p' : 'n',
                W = S;
              w && (s[u][k] || (s[u][k] = { p: S, n: S }), (W = s[u][k][I]));
              var B = void 0,
                D = void 0,
                O = void 0,
                P = void 0;
              if ('radius' === g.dim) {
                var _ = g.dataToCoord(C) - S,
                  V = r.dataToCoord(k);
                (Math.abs(_) < y && (_ = (_ < 0 ? -1 : 1) * y),
                  (B = W),
                  (D = W + _),
                  (P = (O = V - h) - f),
                  w && (s[u][k][I] = D));
              } else {
                var R = g.dataToCoord(C, A) - S,
                  G = r.dataToCoord(k);
                (Math.abs(R) < m && (R = (R < 0 ? -1 : 1) * m),
                  (D = (B = G + h) + f),
                  (O = W),
                  (P = W + R),
                  w && (s[u][k][I] = P));
              }
              t.setItemLayout(T, {
                cx: v,
                cy: p,
                r0: B,
                r: D,
                startAngle: (-O * Math.PI) / 180,
                endAngle: (-P * Math.PI) / 180,
                clockwise: O >= P,
              });
            }
          }
        });
      };
    },
    430682: (e, t, a) => {
      a.d(t, { A: () => l });
      var r = a(498026),
        i = a(687582),
        n = a(265008),
        o = a(108957);
      function l(e, t) {
        return {
          seriesType: e,
          plan: (0, i.A)(),
          reset: function (e) {
            var a = e.getData(),
              i = e.coordinateSystem,
              l = e.pipelineContext,
              s = t || l.large;
            if (i) {
              var d = (0, r.map)(i.dimensions, function (e) {
                  return a.mapDimension(e);
                }).slice(0, 2),
                u = d.length,
                c = a.getCalculationInfo('stackResultDimension');
              ((0, n.sJ)(a, d[0]) && (d[0] = c), (0, n.sJ)(a, d[1]) && (d[1] = c));
              var h = a.getStore(),
                f = a.getDimensionIndex(d[0]),
                g = a.getDimensionIndex(d[1]);
              return (
                u && {
                  progress: function (e, t) {
                    for (
                      var a = e.end - e.start,
                        r = s && (0, o.J)(a * u),
                        n = [],
                        l = [],
                        d = e.start,
                        c = 0;
                      d < e.end;
                      d++
                    ) {
                      var v = void 0;
                      if (1 === u) {
                        var p = h.get(f, d);
                        v = i.dataToPoint(p, null, l);
                      } else
                        ((n[0] = h.get(f, d)),
                          (n[1] = h.get(g, d)),
                          (v = i.dataToPoint(n, null, l)));
                      s ? ((r[c++] = v[0]), (r[c++] = v[1])) : t.setItemLayout(d, v.slice());
                    }
                    s && t.setLayout('points', r);
                  },
                }
              );
            }
          },
        };
      }
    },
  },
]);
