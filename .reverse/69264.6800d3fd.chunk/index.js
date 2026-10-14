'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [69264],
  {
    355855: (t, e, i) => {
      i.d(e, { A: () => s });
      var o = i(15215),
        n = i(498026),
        r = i(316985),
        a = ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'];
      const s = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.render = function (t, e, i) {
            var o, r, a;
            (e.eachComponent({ mainType: 'brush' }, function (t) {
              ((o = t.brushType),
                (r = t.brushOption.brushMode || 'single'),
                (a = a || !!t.areas.length));
            }),
              (this._brushType = o),
              (this._brushMode = r),
              n.each(t.get('type', !0), function (e) {
                t.setIconStatus(
                  e,
                  ('keep' === e ? 'multiple' === r : 'clear' === e ? a : e === o)
                    ? 'emphasis'
                    : 'normal',
                );
              }));
          }),
          (e.prototype.updateView = function (t, e, i) {
            this.render(t, e, i);
          }),
          (e.prototype.getIcons = function () {
            var t = this.model,
              e = t.get('icon', !0),
              i = {};
            return (
              n.each(t.get('type', !0), function (t) {
                e[t] && (i[t] = e[t]);
              }),
              i
            );
          }),
          (e.prototype.onclick = function (t, e, i) {
            var o = this._brushType,
              n = this._brushMode;
            'clear' === i
              ? (e.dispatchAction({ type: 'axisAreaSelect', intervals: [] }),
                e.dispatchAction({ type: 'brush', command: 'clear', areas: [] }))
              : e.dispatchAction({
                  type: 'takeGlobalCursor',
                  key: 'brush',
                  brushOption: {
                    brushType: 'keep' === i ? o : o !== i && i,
                    brushMode: 'keep' === i ? ('multiple' === n ? 'single' : 'multiple') : n,
                  },
                });
          }),
          (e.getDefaultOption = function (t) {
            return {
              show: !0,
              type: a.slice(),
              icon: {
                rect: 'M7.3,34.7 M0.4,10V-0.2h9.8 M89.6,10V-0.2h-9.8 M0.4,60v10.2h9.8 M89.6,60v10.2h-9.8 M12.3,22.4V10.5h13.1 M33.6,10.5h7.8 M49.1,10.5h7.8 M77.5,22.4V10.5h-13 M12.3,31.1v8.2 M77.7,31.1v8.2 M12.3,47.6v11.9h13.1 M33.6,59.5h7.6 M49.1,59.5 h7.7 M77.5,47.6v11.9h-13',
                polygon:
                  'M55.2,34.9c1.7,0,3.1,1.4,3.1,3.1s-1.4,3.1-3.1,3.1 s-3.1-1.4-3.1-3.1S53.5,34.9,55.2,34.9z M50.4,51c1.7,0,3.1,1.4,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1 C47.3,52.4,48.7,51,50.4,51z M55.6,37.1l1.5-7.8 M60.1,13.5l1.6-8.7l-7.8,4 M59,19l-1,5.3 M24,16.1l6.4,4.9l6.4-3.3 M48.5,11.6 l-5.9,3.1 M19.1,12.8L9.7,5.1l1.1,7.7 M13.4,29.8l1,7.3l6.6,1.6 M11.6,18.4l1,6.1 M32.8,41.9 M26.6,40.4 M27.3,40.2l6.1,1.6 M49.9,52.1l-5.6-7.6l-4.9-1.2',
                lineX:
                  'M15.2,30 M19.7,15.6V1.9H29 M34.8,1.9H40.4 M55.3,15.6V1.9H45.9 M19.7,44.4V58.1H29 M34.8,58.1H40.4 M55.3,44.4 V58.1H45.9 M12.5,20.3l-9.4,9.6l9.6,9.8 M3.1,29.9h16.5 M62.5,20.3l9.4,9.6L62.3,39.7 M71.9,29.9H55.4',
                lineY:
                  'M38.8,7.7 M52.7,12h13.2v9 M65.9,26.6V32 M52.7,46.3h13.2v-9 M24.9,12H11.8v9 M11.8,26.6V32 M24.9,46.3H11.8v-9 M48.2,5.1l-9.3-9l-9.4,9.2 M38.9-3.9V12 M48.2,53.3l-9.3,9l-9.4-9.2 M38.9,62.3V46.4',
                keep: 'M4,10.5V1h10.3 M20.7,1h6.1 M33,1h6.1 M55.4,10.5V1H45.2 M4,17.3v6.6 M55.6,17.3v6.6 M4,30.5V40h10.3 M20.7,40 h6.1 M33,40h6.1 M55.4,30.5V40H45.2 M21,18.9h62.9v48.6H21V18.9z',
                clear:
                  'M22,14.7l30.9,31 M52.9,14.7L22,45.7 M4.7,16.8V4.2h13.1 M26,4.2h7.8 M41.6,4.2h7.8 M70.3,16.8V4.2H57.2 M4.7,25.9v8.6 M70.3,25.9v8.6 M4.7,43.2v12.6h13.1 M26,55.8h7.8 M41.6,55.8h7.8 M70.3,43.2v12.6H57.2',
              },
              title: t.getLocaleModel().get(['toolbox', 'brush', 'title']),
            };
          }),
          e
        );
      })(r.Ms);
    },
    316985: (t, e, i) => {
      i.d(e, { M_: () => r, Ms: () => o, x$: () => a });
      var o = function () {},
        n = {};
      function r(t, e) {
        n[t] = e;
      }
      function a(t) {
        return n[t];
      }
    },
    692260: (t, e, i) => {
      i.d(e, { a: () => Q });
      var o = i(903087),
        n = i(895376),
        r = i(15215),
        a = i(498026),
        s = i(316985);
      const l = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return ((i.type = e.type), i);
        }
        return (
          (0, r.__extends)(e, t),
          (e.prototype.optionUpdated = function () {
            t.prototype.optionUpdated.apply(this, arguments);
            var e = this.ecModel;
            a.each(this.option.feature, function (t, i) {
              var o = s.x$(i);
              o &&
                (o.getDefaultOption && (o.defaultOption = o.getDefaultOption(e)),
                a.merge(t, o.defaultOption));
            });
          }),
          (e.type = 'toolbox'),
          (e.layoutMode = { type: 'box', ignoreSize: !0 }),
          (e.defaultOption = {
            show: !0,
            z: 6,
            orient: 'horizontal',
            left: 'right',
            top: 'top',
            backgroundColor: 'transparent',
            borderColor: '#ccc',
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemSize: 15,
            itemGap: 8,
            showTitle: !0,
            iconStyle: { borderColor: '#666', color: 'none' },
            emphasis: { iconStyle: { borderColor: '#3E98C5' } },
            tooltip: { show: !1, position: 'bottom' },
          }),
          e
        );
      })(i(515915).A);
      var h = i(945558),
        u = i(543199),
        p = i(34833),
        c = i(143172),
        d = i(716563),
        f = i(602400),
        g = i(659109),
        v = i(612616),
        m = i(132322),
        y = i(289632);
      const x = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (0, r.__extends)(e, t),
          (e.prototype.render = function (t, e, i, o) {
            var n = this.group;
            if ((n.removeAll(), t.get('show'))) {
              var r = +t.get('itemSize'),
                l = 'vertical' === t.get('orient'),
                g = t.get('feature') || {},
                x = this._features || (this._features = {}),
                _ = [];
              (a.each(g, function (t, e) {
                _.push(e);
              }),
                new d.A(this._featureNames || [], _)
                  .add(M)
                  .update(M)
                  .remove(a.curry(M, null))
                  .execute(),
                (this._featureNames = _),
                f.Z(n, t, i),
                n.add(f.P(n.getBoundingRect(), t)),
                l ||
                  n.eachChild(function (t) {
                    var e = t.__title,
                      o = t.ensureState('emphasis'),
                      s = o.textConfig || (o.textConfig = {}),
                      l = t.getTextContent(),
                      u = l && l.ensureState('emphasis');
                    if (u && !a.isFunction(u) && e) {
                      var p = u.style || (u.style = {}),
                        c = h.NO(e, m.Ay.makeFont(p)),
                        d = t.x + n.x,
                        f = !1;
                      t.y + n.y + r + c.height > i.getHeight() && ((s.position = 'top'), (f = !0));
                      var g = f ? -5 - c.height : r + 10;
                      d + c.width / 2 > i.getWidth()
                        ? ((s.position = ['100%', g]), (p.align = 'right'))
                        : d - c.width / 2 < 0 && ((s.position = [0, g]), (p.align = 'left'));
                    }
                  }));
            }
            function M(h, d) {
              var f,
                M = _[h],
                b = _[d],
                S = g[M],
                w = new c.A(S, t, t.ecModel);
              if (
                (o && null != o.newTitle && o.featureName === M && (S.title = o.newTitle), M && !b)
              ) {
                if (
                  (function (t) {
                    return 0 === t.indexOf('my');
                  })(M)
                )
                  f = { onclick: w.option.onclick, featureName: M };
                else {
                  var T = (0, s.x$)(M);
                  if (!T) return;
                  f = new T();
                }
                x[M] = f;
              } else if (!(f = x[b])) return;
              ((f.uid = (0, v.$Q)('toolbox-feature')), (f.model = w), (f.ecModel = e), (f.api = i));
              var C = f instanceof s.Ms;
              M || !b
                ? !w.get('show') || (C && f.unusable)
                  ? C && f.remove && f.remove(e, i)
                  : ((function (o, h, c) {
                      var d,
                        f,
                        g = o.getModel('iconStyle'),
                        v = o.getModel(['emphasis', 'iconStyle']),
                        x = h instanceof s.Ms && h.getIcons ? h.getIcons() : o.get('icon'),
                        _ = o.get('title') || {};
                      (a.isString(x) ? ((d = {})[c] = x) : (d = x),
                        a.isString(_) ? ((f = {})[c] = _) : (f = _));
                      var M = (o.iconPaths = {});
                      a.each(d, function (s, c) {
                        var d = u.createIcon(s, {}, { x: -r / 2, y: -r / 2, width: r, height: r });
                        (d.setStyle(g.getItemStyle()),
                          (d.ensureState('emphasis').style = v.getItemStyle()));
                        var x = new m.Ay({
                          style: {
                            text: f[c],
                            align: v.get('textAlign'),
                            borderRadius: v.get('textBorderRadius'),
                            padding: v.get('textPadding'),
                            fill: null,
                            font: (0, y.c8)(
                              {
                                fontStyle: v.get('textFontStyle'),
                                fontFamily: v.get('textFontFamily'),
                                fontSize: v.get('textFontSize'),
                                fontWeight: v.get('textFontWeight'),
                              },
                              e,
                            ),
                          },
                          ignore: !0,
                        });
                        (d.setTextContent(x),
                          u.setTooltipConfig({
                            el: d,
                            componentModel: t,
                            itemName: c,
                            formatterParamsExtra: { title: f[c] },
                          }),
                          (d.__title = f[c]),
                          d
                            .on('mouseover', function () {
                              var e = v.getItemStyle(),
                                o = l
                                  ? null == t.get('right') && 'right' !== t.get('left')
                                    ? 'right'
                                    : 'left'
                                  : null == t.get('bottom') && 'bottom' !== t.get('top')
                                    ? 'bottom'
                                    : 'top';
                              (x.setStyle({
                                fill: v.get('textFill') || e.fill || e.stroke || '#000',
                                backgroundColor: v.get('textBackgroundColor'),
                              }),
                                d.setTextConfig({ position: v.get('textPosition') || o }),
                                (x.ignore = !t.get('showTitle')),
                                i.enterEmphasis(this));
                            })
                            .on('mouseout', function () {
                              ('emphasis' !== o.get(['iconStatus', c]) && i.leaveEmphasis(this),
                                x.hide());
                            }),
                          ('emphasis' === o.get(['iconStatus', c]) ? p.HY : p.SD)(d),
                          n.add(d),
                          d.on('click', a.bind(h.onclick, h, e, i, c)),
                          (M[c] = d));
                      });
                    })(w, f, M),
                    (w.setIconStatus = function (t, e) {
                      var i = this.option,
                        o = this.iconPaths;
                      ((i.iconStatus = i.iconStatus || {}),
                        (i.iconStatus[t] = e),
                        o[t] && ('emphasis' === e ? p.HY : p.SD)(o[t]));
                    }),
                    f instanceof s.Ms && f.render && f.render(w, e, i, o))
                : C && f.dispose && f.dispose(e, i);
            }
          }),
          (e.prototype.updateView = function (t, e, i, o) {
            a.each(this._features, function (t) {
              t instanceof s.Ms && t.updateView && t.updateView(t.model, e, i, o);
            });
          }),
          (e.prototype.remove = function (t, e) {
            (a.each(this._features, function (i) {
              i instanceof s.Ms && i.remove && i.remove(t, e);
            }),
              this.group.removeAll());
          }),
          (e.prototype.dispose = function (t, e) {
            a.each(this._features, function (i) {
              i instanceof s.Ms && i.dispose && i.dispose(t, e);
            });
          }),
          (e.type = 'toolbox'),
          e
        );
      })(g.A);
      var _ = i(738123);
      const M = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (0, r.__extends)(e, t),
          (e.prototype.onclick = function (t, e) {
            var i = this.model,
              o = i.get('name') || t.get('title.0.text') || 'echarts',
              n = 'svg' === e.getZr().painter.getType(),
              r = n ? 'svg' : i.get('type', !0) || 'png',
              a = e.getConnectedDataURL({
                type: r,
                backgroundColor: i.get('backgroundColor', !0) || t.get('backgroundColor') || '#fff',
                connectedBackgroundColor: i.get('connectedBackgroundColor'),
                excludeComponents: i.get('excludeComponents'),
                pixelRatio: i.get('pixelRatio'),
              }),
              s = _.A.browser;
            if ('function' != typeof MouseEvent || (!s.newEdge && (s.ie || s.edge)))
              if (window.navigator.msSaveOrOpenBlob || n) {
                var l = a.split(','),
                  h = l[0].indexOf('base64') > -1,
                  u = n ? decodeURIComponent(l[1]) : l[1];
                h && (u = window.atob(u));
                var p = o + '.' + r;
                if (window.navigator.msSaveOrOpenBlob) {
                  for (var c = u.length, d = new Uint8Array(c); c--;) d[c] = u.charCodeAt(c);
                  var f = new Blob([d]);
                  window.navigator.msSaveOrOpenBlob(f, p);
                } else {
                  var g = document.createElement('iframe');
                  document.body.appendChild(g);
                  var v = g.contentWindow,
                    m = v.document;
                  (m.open('image/svg+xml', 'replace'),
                    m.write(u),
                    m.close(),
                    v.focus(),
                    m.execCommand('SaveAs', !0, p),
                    document.body.removeChild(g));
                }
              } else {
                var y = i.get('lang'),
                  x =
                    '<body style="margin:0;"><img src="' +
                    a +
                    '" style="max-width:100%;" title="' +
                    ((y && y[0]) || '') +
                    '" /></body>',
                  M = window.open();
                (M.document.write(x), (M.document.title = o));
              }
            else {
              var b = document.createElement('a');
              ((b.download = o + '.' + r), (b.target = '_blank'), (b.href = a));
              var S = new MouseEvent('click', {
                view: document.defaultView,
                bubbles: !0,
                cancelable: !1,
              });
              b.dispatchEvent(S);
            }
          }),
          (e.getDefaultOption = function (t) {
            return {
              show: !0,
              icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
              title: t.getLocaleModel().get(['toolbox', 'saveAsImage', 'title']),
              type: 'png',
              connectedBackgroundColor: '#fff',
              name: '',
              excludeComponents: ['toolbox'],
              lang: t.getLocaleModel().get(['toolbox', 'saveAsImage', 'lang']),
            };
          }),
          e
        );
      })(s.Ms);
      var b = i(695383),
        S = i(48170),
        w = '__ec_magicType_stack__',
        T = [['line', 'bar'], ['stack']],
        C = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            (0, r.__extends)(e, t),
            (e.prototype.getIcons = function () {
              var t = this.model,
                e = t.get('icon'),
                i = {};
              return (
                a.each(t.get('type'), function (t) {
                  e[t] && (i[t] = e[t]);
                }),
                i
              );
            }),
            (e.getDefaultOption = function (t) {
              return {
                show: !0,
                type: [],
                icon: {
                  line: 'M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4',
                  bar: 'M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7',
                  stack:
                    'M8.2,38.4l-8.4,4.1l30.6,15.3L60,42.5l-8.1-4.1l-21.5,11L8.2,38.4z M51.9,30l-8.1,4.2l-13.4,6.9l-13.9-6.9L8.2,30l-8.4,4.2l8.4,4.2l22.2,11l21.5-11l8.1-4.2L51.9,30z M51.9,21.7l-8.1,4.2L35.7,30l-5.3,2.8L24.9,30l-8.4-4.1l-8.3-4.2l-8.4,4.2L8.2,30l8.3,4.2l13.9,6.9l13.4-6.9l8.1-4.2l8.1-4.1L51.9,21.7zM30.4,2.2L-0.2,17.5l8.4,4.1l8.3,4.2l8.4,4.2l5.5,2.7l5.3-2.7l8.1-4.2l8.1-4.2l8.1-4.1L30.4,2.2z',
                },
                title: t.getLocaleModel().get(['toolbox', 'magicType', 'title']),
                option: {},
                seriesIndex: {},
              };
            }),
            (e.prototype.onclick = function (t, e, i) {
              var o = this.model,
                n = o.get(['seriesIndex', i]);
              if (I[i]) {
                var r,
                  s = { series: [] };
                (a.each(T, function (t) {
                  a.indexOf(t, i) >= 0 &&
                    a.each(t, function (t) {
                      o.setIconStatus(t, 'normal');
                    });
                }),
                  o.setIconStatus(i, 'emphasis'),
                  t.eachComponent(
                    { mainType: 'series', query: null == n ? null : { seriesIndex: n } },
                    function (t) {
                      var e = t.subType,
                        n = t.id,
                        r = I[i](e, n, t, o);
                      r && (a.defaults(r, t.option), s.series.push(r));
                      var l = t.coordinateSystem;
                      if (l && 'cartesian2d' === l.type && ('line' === i || 'bar' === i)) {
                        var h = l.getAxesByScale('ordinal')[0];
                        if (h) {
                          var u = h.dim + 'Axis',
                            p = t.getReferringComponents(u, S.US).models[0].componentIndex;
                          s[u] = s[u] || [];
                          for (var c = 0; c <= p; c++) s[u][p] = s[u][p] || {};
                          s[u][p].boundaryGap = 'bar' === i;
                        }
                      }
                    },
                  ));
                var l = i;
                ('stack' === i &&
                  ((r = a.merge(
                    { stack: o.option.title.tiled, tiled: o.option.title.stack },
                    o.option.title,
                  )),
                  'emphasis' !== o.get(['iconStatus', i]) && (l = 'tiled')),
                  e.dispatchAction({
                    type: 'changeMagicType',
                    currentType: l,
                    newOption: s,
                    newTitle: r,
                    featureName: 'magicType',
                  }));
              }
            }),
            e
          );
        })(s.Ms),
        I = {
          line: function (t, e, i, o) {
            if ('bar' === t)
              return a.merge(
                {
                  id: e,
                  type: 'line',
                  data: i.get('data'),
                  stack: i.get('stack'),
                  markPoint: i.get('markPoint'),
                  markLine: i.get('markLine'),
                },
                o.get(['option', 'line']) || {},
                !0,
              );
          },
          bar: function (t, e, i, o) {
            if ('line' === t)
              return a.merge(
                {
                  id: e,
                  type: 'bar',
                  data: i.get('data'),
                  stack: i.get('stack'),
                  markPoint: i.get('markPoint'),
                  markLine: i.get('markLine'),
                },
                o.get(['option', 'bar']) || {},
                !0,
              );
          },
          stack: function (t, e, i, o) {
            var n = i.get('stack') === w;
            if ('line' === t || 'bar' === t)
              return (
                o.setIconStatus('stack', n ? 'normal' : 'emphasis'),
                a.merge({ id: e, stack: n ? '' : w }, o.get(['option', 'stack']) || {}, !0)
              );
          },
        };
      b.OH(
        { type: 'changeMagicType', event: 'magicTypeChanged', update: 'prepareAndUpdate' },
        function (t, e) {
          e.mergeOption(t.newOption);
        },
      );
      const A = C;
      var k = i(435452),
        O = new Array(60).join('-'),
        V = '\t';
      function L(t) {
        return t.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      }
      var D = new RegExp('[\t]+', 'g');
      var z = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (0, r.__extends)(e, t),
          (e.prototype.onclick = function (t, e) {
            setTimeout(function () {
              e.dispatchAction({ type: 'hideTip' });
            });
            var i = e.getDom(),
              o = this.model;
            this._dom && i.removeChild(this._dom);
            var n = document.createElement('div');
            ((n.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;padding:5px'),
              (n.style.backgroundColor = o.get('backgroundColor') || '#fff'));
            var r = document.createElement('h4'),
              s = o.get('lang') || [];
            ((r.innerHTML = s[0] || o.get('title')),
              (r.style.cssText = 'margin:10px 20px'),
              (r.style.color = o.get('textColor')));
            var l = document.createElement('div'),
              h = document.createElement('textarea');
            l.style.cssText = 'overflow:auto';
            var u = o.get('optionToContent'),
              p = o.get('contentToOption'),
              c = (function (t) {
                var e,
                  i,
                  o,
                  n = (function (t) {
                    var e = {},
                      i = [],
                      o = [];
                    return (
                      t.eachRawSeries(function (t) {
                        var n = t.coordinateSystem;
                        if (!n || ('cartesian2d' !== n.type && 'polar' !== n.type)) i.push(t);
                        else {
                          var r = n.getBaseAxis();
                          if ('category' === r.type) {
                            var a = r.dim + '_' + r.index;
                            (e[a] ||
                              ((e[a] = {
                                categoryAxis: r,
                                valueAxis: n.getOtherAxis(r),
                                series: [],
                              }),
                              o.push({ axisDim: r.dim, axisIndex: r.index })),
                              e[a].series.push(t));
                          } else i.push(t);
                        }
                      }),
                      { seriesGroupByCategoryAxis: e, other: i, meta: o }
                    );
                  })(t);
                return {
                  value: a
                    .filter(
                      [
                        ((i = n.seriesGroupByCategoryAxis),
                        (o = []),
                        a.each(i, function (t, e) {
                          var i = t.categoryAxis,
                            n = t.valueAxis.dim,
                            r = [' '].concat(
                              a.map(t.series, function (t) {
                                return t.name;
                              }),
                            ),
                            s = [i.model.getCategories()];
                          a.each(t.series, function (t) {
                            var e = t.getRawData();
                            s.push(
                              t.getRawData().mapArray(e.mapDimension(n), function (t) {
                                return t;
                              }),
                            );
                          });
                          for (var l = [r.join(V)], h = 0; h < s[0].length; h++) {
                            for (var u = [], p = 0; p < s.length; p++) u.push(s[p][h]);
                            l.push(u.join(V));
                          }
                          o.push(l.join('\n'));
                        }),
                        o.join('\n\n' + O + '\n\n')),
                        ((e = n.other),
                        a
                          .map(e, function (t) {
                            var e = t.getRawData(),
                              i = [t.name],
                              o = [];
                            return (
                              e.each(e.dimensions, function () {
                                for (
                                  var t = arguments.length,
                                    n = arguments[t - 1],
                                    r = e.getName(n),
                                    a = 0;
                                  a < t - 1;
                                  a++
                                )
                                  o[a] = arguments[a];
                                i.push((r ? r + V : '') + o.join(V));
                              }),
                              i.join('\n')
                            );
                          })
                          .join('\n\n' + O + '\n\n')),
                      ],
                      function (t) {
                        return !!t.replace(/[\n\t\s]/g, '');
                      },
                    )
                    .join('\n\n' + O + '\n\n'),
                  meta: n.meta,
                };
              })(t);
            if (a.isFunction(u)) {
              var d = u(e.getOption());
              a.isString(d) ? (l.innerHTML = d) : a.isDom(d) && l.appendChild(d);
            } else {
              h.readOnly = o.get('readOnly');
              var f = h.style;
              ((f.cssText =
                'display:block;width:100%;height:100%;font-family:monospace;font-size:14px;line-height:1.6rem;resize:none;box-sizing:border-box;outline:none'),
                (f.color = o.get('textColor')),
                (f.borderColor = o.get('textareaBorderColor')),
                (f.backgroundColor = o.get('textareaColor')),
                (h.value = c.value),
                l.appendChild(h));
            }
            var g = c.meta,
              v = document.createElement('div');
            v.style.cssText = 'position:absolute;bottom:5px;left:0;right:0';
            var m =
                'float:right;margin-right:20px;border:none;cursor:pointer;padding:2px 5px;font-size:12px;border-radius:3px',
              y = document.createElement('div'),
              x = document.createElement('div');
            ((m += ';background-color:' + o.get('buttonColor')),
              (m += ';color:' + o.get('buttonTextColor')));
            var _ = this;
            function M() {
              (i.removeChild(n), (_._dom = null));
            }
            ((0, k.q2)(y, 'click', M),
              (0, k.q2)(x, 'click', function () {
                if ((null == p && null != u) || (null != p && null == u)) M();
                else {
                  var t;
                  try {
                    t = a.isFunction(p)
                      ? p(l, e.getOption())
                      : (function (t, e) {
                          var i = t.split(new RegExp('\n*' + O + '\n*', 'g')),
                            o = { series: [] };
                          return (
                            a.each(i, function (t, i) {
                              if (
                                (function (t) {
                                  if (t.slice(0, t.indexOf('\n')).indexOf(V) >= 0) return !0;
                                })(t)
                              ) {
                                var n = (function (t) {
                                    for (
                                      var e = t.split(/\n+/g),
                                        i = L(e.shift()).split(D),
                                        o = [],
                                        n = a.map(i, function (t) {
                                          return { name: t, data: [] };
                                        }),
                                        r = 0;
                                      r < e.length;
                                      r++
                                    ) {
                                      var s = L(e[r]).split(D);
                                      o.push(s.shift());
                                      for (var l = 0; l < s.length; l++)
                                        n[l] && (n[l].data[r] = s[l]);
                                    }
                                    return { series: n, categories: o };
                                  })(t),
                                  r = e[i],
                                  s = r.axisDim + 'Axis';
                                r &&
                                  ((o[s] = o[s] || []),
                                  (o[s][r.axisIndex] = { data: n.categories }),
                                  (o.series = o.series.concat(n.series)));
                              } else
                                ((n = (function (t) {
                                  for (
                                    var e = t.split(/\n+/g), i = L(e.shift()), o = [], n = 0;
                                    n < e.length;
                                    n++
                                  ) {
                                    var r = L(e[n]);
                                    if (r) {
                                      var a = r.split(D),
                                        s = '',
                                        l = void 0,
                                        h = !1;
                                      isNaN(a[0])
                                        ? ((h = !0),
                                          (s = a[0]),
                                          (a = a.slice(1)),
                                          (o[n] = { name: s, value: [] }),
                                          (l = o[n].value))
                                        : (l = o[n] = []);
                                      for (var u = 0; u < a.length; u++) l.push(+a[u]);
                                      1 === l.length && (h ? (o[n].value = l[0]) : (o[n] = l[0]));
                                    }
                                  }
                                  return { name: i, data: o };
                                })(t)),
                                  o.series.push(n));
                            }),
                            o
                          );
                        })(h.value, g);
                  } catch (t) {
                    throw (M(), new Error('Data view format error ' + t));
                  }
                  (t && e.dispatchAction({ type: 'changeDataView', newOption: t }), M());
                }
              }),
              (y.innerHTML = s[1]),
              (x.innerHTML = s[2]),
              (x.style.cssText = y.style.cssText = m),
              !o.get('readOnly') && v.appendChild(x),
              v.appendChild(y),
              n.appendChild(r),
              n.appendChild(l),
              n.appendChild(v),
              (l.style.height = i.clientHeight - 80 + 'px'),
              i.appendChild(n),
              (this._dom = n));
          }),
          (e.prototype.remove = function (t, e) {
            this._dom && e.getDom().removeChild(this._dom);
          }),
          (e.prototype.dispose = function (t, e) {
            this.remove(t, e);
          }),
          (e.getDefaultOption = function (t) {
            return {
              show: !0,
              readOnly: !1,
              optionToContent: null,
              contentToOption: null,
              icon: 'M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28',
              title: t.getLocaleModel().get(['toolbox', 'dataView', 'title']),
              lang: t.getLocaleModel().get(['toolbox', 'dataView', 'lang']),
              backgroundColor: '#fff',
              textColor: '#000',
              textareaColor: '#fff',
              textareaBorderColor: '#333',
              buttonColor: '#c23531',
              buttonTextColor: '#fff',
            };
          }),
          e
        );
      })(s.Ms);
      function H(t, e) {
        return a.map(t, function (t, i) {
          var o = e && e[i];
          if (a.isObject(o) && !a.isArray(o)) {
            (a.isObject(t) && !a.isArray(t)) || (t = { value: t });
            var n = null != o.name && null == t.name;
            return ((t = a.defaults(t, o)), n && delete t.name, t);
          }
          return t;
        });
      }
      b.OH(
        { type: 'changeDataView', event: 'dataViewChanged', update: 'prepareAndUpdate' },
        function (t, e) {
          var i = [];
          (a.each(t.newOption.series, function (t) {
            var o = e.getSeriesByName(t.name)[0];
            if (o) {
              var n = o.get('data');
              i.push({ name: t.name, data: H(t.data, n) });
            } else i.push(a.extend({ type: 'scatter' }, t));
          }),
            e.mergeOption(a.defaults({ series: i }, t.newOption)));
        },
      );
      const R = z;
      var B = i(278668),
        P = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            (0, r.__extends)(e, t),
            (e.prototype.onclick = function (t, e) {
              (B.IU(t), e.dispatchAction({ type: 'restore', from: this.uid }));
            }),
            (e.getDefaultOption = function (t) {
              return {
                show: !0,
                icon: 'M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5',
                title: t.getLocaleModel().get(['toolbox', 'restore', 'title']),
              };
            }),
            e
          );
        })(s.Ms);
      b.OH({ type: 'restore', event: 'restore', update: 'prepareAndUpdate' }, function (t, e) {
        e.resetOption('recreate');
      });
      const E = P;
      var F = i(814403),
        N = i(798595),
        Y = i(898983),
        W = i(807442),
        G = a.each,
        X = (0, S.S_)('toolbox-dataZoom_'),
        U = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            (0, r.__extends)(e, t),
            (e.prototype.render = function (t, e, i, o) {
              (this._brushController ||
                ((this._brushController = new F.A(i.getZr())),
                this._brushController.on('brush', a.bind(this._onBrush, this)).mount()),
                (function (t, e, i, o, n) {
                  var r = i._isZoomActive;
                  (o &&
                    'takeGlobalCursor' === o.type &&
                    (r = 'dataZoomSelect' === o.key && o.dataZoomSelectActive),
                    (i._isZoomActive = r),
                    t.setIconStatus('zoom', r ? 'emphasis' : 'normal'));
                  var a = new N.A(j(t), e, { include: ['grid'] }).makePanelOpts(n, function (t) {
                    return t.xAxisDeclared && !t.yAxisDeclared
                      ? 'lineX'
                      : !t.xAxisDeclared && t.yAxisDeclared
                        ? 'lineY'
                        : 'rect';
                  });
                  i._brushController
                    .setPanels(a)
                    .enableBrush(
                      !(!r || !a.length) && {
                        brushType: 'auto',
                        brushStyle: t.getModel('brushStyle').getItemStyle(),
                      },
                    );
                })(t, e, this, o, i),
                (function (t, e) {
                  t.setIconStatus('back', B.U9(e) > 1 ? 'emphasis' : 'normal');
                })(t, e));
            }),
            (e.prototype.onclick = function (t, e, i) {
              Z[i].call(this);
            }),
            (e.prototype.remove = function (t, e) {
              this._brushController && this._brushController.unmount();
            }),
            (e.prototype.dispose = function (t, e) {
              this._brushController && this._brushController.dispose();
            }),
            (e.prototype._onBrush = function (t) {
              var e = t.areas;
              if (t.isEnd && e.length) {
                var i = {},
                  o = this.ecModel;
                (this._brushController.updateCovers([]),
                  new N.A(j(this.model), o, { include: ['grid'] }).matchOutputRanges(
                    e,
                    o,
                    function (t, e, i) {
                      if ('cartesian2d' === i.type) {
                        var o = t.brushType;
                        'rect' === o
                          ? (n('x', i, e[0]), n('y', i, e[1]))
                          : n({ lineX: 'x', lineY: 'y' }[o], i, e);
                      }
                    },
                  ),
                  B.VC(o, i),
                  this._dispatchZoomAction(i));
              }
              function n(t, e, n) {
                var r = e.getAxis(t),
                  a = r.model,
                  s = (function (t, e, i) {
                    var o;
                    return (
                      i.eachComponent({ mainType: 'dataZoom', subType: 'select' }, function (i) {
                        i.getAxisModel(t, e.componentIndex) && (o = i);
                      }),
                      o
                    );
                  })(t, a, o),
                  l = s.findRepresentativeAxisProxy(a).getMinMaxSpan();
                ((null == l.minValueSpan && null == l.maxValueSpan) ||
                  (n = (0, Y.A)(
                    0,
                    n.slice(),
                    r.scale.getExtent(),
                    0,
                    l.minValueSpan,
                    l.maxValueSpan,
                  )),
                  s && (i[s.id] = { dataZoomId: s.id, startValue: n[0], endValue: n[1] }));
              }
            }),
            (e.prototype._dispatchZoomAction = function (t) {
              var e = [];
              (G(t, function (t, i) {
                e.push(a.clone(t));
              }),
                e.length &&
                  this.api.dispatchAction({ type: 'dataZoom', from: this.uid, batch: e }));
            }),
            (e.getDefaultOption = function (t) {
              return {
                show: !0,
                filterMode: 'filter',
                icon: {
                  zoom: 'M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1',
                  back: 'M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26',
                },
                title: t.getLocaleModel().get(['toolbox', 'dataZoom', 'title']),
                brushStyle: { borderWidth: 0, color: 'rgba(210,219,238,0.2)' },
              };
            }),
            e
          );
        })(s.Ms),
        Z = {
          zoom: function () {
            var t = !this._isZoomActive;
            this.api.dispatchAction({
              type: 'takeGlobalCursor',
              key: 'dataZoomSelect',
              dataZoomSelectActive: t,
            });
          },
          back: function () {
            this._dispatchZoomAction(B.uY(this.ecModel));
          },
        };
      function j(t) {
        var e = {
          xAxisIndex: t.get('xAxisIndex', !0),
          yAxisIndex: t.get('yAxisIndex', !0),
          xAxisId: t.get('xAxisId', !0),
          yAxisId: t.get('yAxisId', !0),
        };
        return (
          null == e.xAxisIndex && null == e.xAxisId && (e.xAxisIndex = 'all'),
          null == e.yAxisIndex && null == e.yAxisId && (e.yAxisIndex = 'all'),
          e
        );
      }
      (0, W.S)('dataZoom', function (t) {
        var e = t.getComponent('toolbox', 0),
          i = ['feature', 'dataZoom'];
        if (e && null != e.get(i)) {
          var o = e.getModel(i),
            n = [],
            r = j(o),
            a = (0, S._e)(t, r);
          return (
            G(a.xAxisModels, function (t) {
              return s(t, 'xAxis', 'xAxisIndex');
            }),
            G(a.yAxisModels, function (t) {
              return s(t, 'yAxis', 'yAxisIndex');
            }),
            n
          );
        }
        function s(t, e, i) {
          var r = t.componentIndex,
            a = {
              type: 'select',
              $fromToolbox: !0,
              filterMode: o.get('filterMode', !0) || 'filter',
              id: X + e + r,
            };
          ((a[i] = r), n.push(a));
        }
      });
      const $ = U;
      function Q(t) {
        (t.registerComponentModel(l),
          t.registerComponentView(x),
          (0, s.M_)('saveAsImage', M),
          (0, s.M_)('magicType', A),
          (0, s.M_)('dataView', R),
          (0, s.M_)('dataZoom', $),
          (0, s.M_)('restore', E),
          (0, o.Y)(n.a));
      }
    },
    606641: (t, e, i) => {
      i.d(e, { a: () => q });
      var o = i(746524),
        n = i(903087),
        r = i(15215);
      const a = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return ((i.type = e.type), i);
        }
        return (
          (0, r.__extends)(e, t),
          (e.type = 'tooltip'),
          (e.dependencies = ['axisPointer']),
          (e.defaultOption = {
            z: 60,
            show: !0,
            showContent: !0,
            trigger: 'item',
            triggerOn: 'mousemove|click',
            alwaysShowContent: !1,
            displayMode: 'single',
            renderMode: 'auto',
            confine: null,
            showDelay: 0,
            hideDelay: 100,
            transitionDuration: 0.4,
            enterable: !1,
            backgroundColor: '#fff',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, .2)',
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            borderRadius: 4,
            borderWidth: 1,
            padding: null,
            extraCssText: '',
            axisPointer: {
              type: 'line',
              axis: 'auto',
              animation: 'auto',
              animationDurationUpdate: 200,
              animationEasingUpdate: 'exponentialOut',
              crossStyle: { color: '#999', width: 1, type: 'dashed', textStyle: {} },
            },
            textStyle: { color: '#666', fontSize: 14 },
          }),
          e
        );
      })(i(515915).A);
      var s = i(498026),
        l = i(738123),
        h = i(435452),
        u = i(429687),
        p = i(783412);
      function c(t) {
        var e = t.get('confine');
        return null != e ? !!e : 'richText' === t.get('renderMode');
      }
      function d(t) {
        if (l.A.domSupported)
          for (var e = document.documentElement.style, i = 0, o = t.length; i < o; i++)
            if (t[i] in e) return t[i];
      }
      var f = d(['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']),
        g = d(['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);
      function v(t, e) {
        if (!t) return e;
        e = (0, p.Cb)(e, !0);
        var i = t.indexOf(e);
        return (t = -1 === i ? e : '-' + t.slice(0, i) + '-' + e).toLowerCase();
      }
      var m = i(603961),
        y = v(g, 'transition'),
        x = v(f, 'transform'),
        _ =
          'position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;' +
          (l.A.transform3dSupported ? 'will-change:transform;' : '');
      function M(t, e, i) {
        var o = t.toFixed(0) + 'px',
          n = e.toFixed(0) + 'px';
        if (!l.A.transformSupported)
          return i
            ? 'top:' + n + ';left:' + o + ';'
            : [
                ['top', n],
                ['left', o],
              ];
        var r = l.A.transform3dSupported,
          a = 'translate' + (r ? '3d' : '') + '(' + o + ',' + n + (r ? ',0' : '') + ')';
        return i
          ? 'top:0;left:0;' + x + ':' + a + ';'
          : [
              ['top', 0],
              ['left', 0],
              [f, a],
            ];
      }
      function b(t, e, i, o, n) {
        var r = e && e.painter;
        if (i) {
          var a = r && r.getViewportRoot();
          a && (0, u.lJ)(t, a, i, o, n);
        } else {
          ((t[0] = o), (t[1] = n));
          var s = r && r.getViewportRootOffset();
          s && ((t[0] += s.offsetLeft), (t[1] += s.offsetTop));
        }
        ((t[2] = t[0] / e.getWidth()), (t[3] = t[1] / e.getHeight()));
      }
      var S = (function () {
        function t(t, e) {
          if (
            ((this._show = !1),
            (this._styleCoord = [0, 0, 0, 0]),
            (this._enterable = !0),
            (this._alwaysShowContent = !1),
            (this._firstShow = !0),
            (this._longHide = !0),
            l.A.wxa)
          )
            return null;
          var i = document.createElement('div');
          ((i.domBelongToZr = !0), (this.el = i));
          var o = (this._zr = t.getZr()),
            n = e.appendTo,
            r =
              n &&
              ((0, s.isString)(n)
                ? document.querySelector(n)
                : (0, s.isDom)(n)
                  ? n
                  : (0, s.isFunction)(n) && n(t.getDom()));
          (b(this._styleCoord, o, r, t.getWidth() / 2, t.getHeight() / 2),
            (r || t.getDom()).appendChild(i),
            (this._api = t),
            (this._container = r));
          var a = this;
          ((i.onmouseenter = function () {
            (a._enterable && (clearTimeout(a._hideTimeout), (a._show = !0)), (a._inContent = !0));
          }),
            (i.onmousemove = function (t) {
              if (((t = t || window.event), !a._enterable)) {
                var e = o.handler,
                  i = o.painter.getViewportRoot();
                ((0, h.e0)(i, t, !0), e.dispatch('mousemove', t));
              }
            }),
            (i.onmouseleave = function () {
              ((a._inContent = !1), a._enterable && a._show && a.hideLater(a._hideDelay));
            }));
        }
        return (
          (t.prototype.update = function (t) {
            if (!this._container) {
              var e = this._api.getDom(),
                i =
                  ((r = 'position'),
                  (a =
                    (n = e).currentStyle ||
                    (document.defaultView && document.defaultView.getComputedStyle(n)))
                    ? r
                      ? a[r]
                      : a
                    : null),
                o = e.style;
              'absolute' !== o.position && 'absolute' !== i && (o.position = 'relative');
            }
            var n,
              r,
              a,
              s = t.get('alwaysShowContent');
            (s && this._moveIfResized(),
              (this._alwaysShowContent = s),
              (this.el.className = t.get('className') || ''));
          }),
          (t.prototype.show = function (t, e) {
            (clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout));
            var i = this.el,
              o = i.style,
              n = this._styleCoord;
            (i.innerHTML
              ? (o.cssText =
                  _ +
                  (function (t, e, i) {
                    var o = [],
                      n = t.get('transitionDuration'),
                      r = t.get('backgroundColor'),
                      a = t.get('shadowBlur'),
                      h = t.get('shadowColor'),
                      u = t.get('shadowOffsetX'),
                      c = t.get('shadowOffsetY'),
                      d = t.getModel('textStyle'),
                      f = (0, m.CO)(t, 'html'),
                      g = u + 'px ' + c + 'px ' + a + 'px ' + h;
                    return (
                      o.push('box-shadow:' + g),
                      e &&
                        n &&
                        o.push(
                          (function (t, e) {
                            var i = 'cubic-bezier(0.23,1,0.32,1)',
                              o = ' ' + t / 2 + 's ' + i,
                              n = 'opacity' + o + ',visibility' + o;
                            return (
                              e ||
                                ((o = ' ' + t + 's ' + i),
                                (n += l.A.transformSupported
                                  ? ',' + x + o
                                  : ',left' + o + ',top' + o)),
                              y + ':' + n
                            );
                          })(n, i),
                        ),
                      r && o.push('background-color:' + r),
                      (0, s.each)(['width', 'color', 'radius'], function (e) {
                        var i = 'border-' + e,
                          n = (0, p.Cb)(i),
                          r = t.get(n);
                        null != r && o.push(i + ':' + r + ('color' === e ? '' : 'px'));
                      }),
                      o.push(
                        (function (t) {
                          var e = [],
                            i = t.get('fontSize'),
                            o = t.getTextColor();
                          (o && e.push('color:' + o), e.push('font:' + t.getFont()));
                          var n = (0, s.retrieve2)(t.get('lineHeight'), Math.round((3 * i) / 2));
                          i && e.push('line-height:' + n + 'px');
                          var r = t.get('textShadowColor'),
                            a = t.get('textShadowBlur') || 0,
                            l = t.get('textShadowOffsetX') || 0,
                            h = t.get('textShadowOffsetY') || 0;
                          return (
                            r &&
                              a &&
                              e.push('text-shadow:' + l + 'px ' + h + 'px ' + a + 'px ' + r),
                            (0, s.each)(['decoration', 'align'], function (i) {
                              var o = t.get(i);
                              o && e.push('text-' + i + ':' + o);
                            }),
                            e.join(';')
                          );
                        })(d),
                      ),
                      null != f && o.push('padding:' + (0, p.QX)(f).join('px ') + 'px'),
                      o.join(';') + ';'
                    );
                  })(t, !this._firstShow, this._longHide) +
                  M(n[0], n[1], !0) +
                  'border-color:' +
                  (0, p.he)(e) +
                  ';' +
                  (t.get('extraCssText') || '') +
                  ';pointer-events:' +
                  (this._enterable ? 'auto' : 'none'))
              : (o.display = 'none'),
              (this._show = !0),
              (this._firstShow = !1),
              (this._longHide = !1));
          }),
          (t.prototype.setContent = function (t, e, i, o, n) {
            var r = this.el;
            if (null != t) {
              var a = '';
              if (
                ((0, s.isString)(n) &&
                  'item' === i.get('trigger') &&
                  !c(i) &&
                  (a = (function (t, e, i) {
                    if (!(0, s.isString)(i) || 'inside' === i) return '';
                    var o = t.get('backgroundColor'),
                      n = t.get('borderWidth');
                    e = (0, p.he)(e);
                    var r,
                      a,
                      l =
                        'left' === (r = i)
                          ? 'right'
                          : 'right' === r
                            ? 'left'
                            : 'top' === r
                              ? 'bottom'
                              : 'top',
                      h = Math.max(1.5 * Math.round(n), 6),
                      u = '',
                      c = x + ':';
                    (0, s.indexOf)(['left', 'right'], l) > -1
                      ? ((u += 'top:50%'),
                        (c +=
                          'translateY(-50%) rotate(' + (a = 'left' === l ? -225 : -45) + 'deg)'))
                      : ((u += 'left:50%'),
                        (c += 'translateX(-50%) rotate(' + (a = 'top' === l ? 225 : 45) + 'deg)'));
                    var d = (a * Math.PI) / 180,
                      f = h + n,
                      g = f * Math.abs(Math.cos(d)) + f * Math.abs(Math.sin(d)),
                      v = e + ' solid ' + n + 'px;';
                    return (
                      '<div style="' +
                      [
                        'position:absolute;width:' + h + 'px;height:' + h + 'px;z-index:-1;',
                        (u +=
                          ';' +
                          l +
                          ':-' +
                          Math.round(
                            100 * ((g - Math.SQRT2 * n) / 2 + Math.SQRT2 * n - (g - f) / 2),
                          ) /
                            100 +
                          'px') +
                          ';' +
                          c +
                          ';',
                        'border-bottom:' + v,
                        'border-right:' + v,
                        'background-color:' + o + ';',
                      ].join('') +
                      '"></div>'
                    );
                  })(i, o, n)),
                (0, s.isString)(t))
              )
                r.innerHTML = t + a;
              else if (t) {
                ((r.innerHTML = ''), (0, s.isArray)(t) || (t = [t]));
                for (var l = 0; l < t.length; l++)
                  (0, s.isDom)(t[l]) && t[l].parentNode !== r && r.appendChild(t[l]);
                if (a && r.childNodes.length) {
                  var h = document.createElement('div');
                  ((h.innerHTML = a), r.appendChild(h));
                }
              }
            } else r.innerHTML = '';
          }),
          (t.prototype.setEnterable = function (t) {
            this._enterable = t;
          }),
          (t.prototype.getSize = function () {
            var t = this.el;
            return t ? [t.offsetWidth, t.offsetHeight] : [0, 0];
          }),
          (t.prototype.moveTo = function (t, e) {
            if (this.el) {
              var i = this._styleCoord;
              if ((b(i, this._zr, this._container, t, e), null != i[0] && null != i[1])) {
                var o = this.el.style,
                  n = M(i[0], i[1]);
                (0, s.each)(n, function (t) {
                  o[t[0]] = t[1];
                });
              }
            }
          }),
          (t.prototype._moveIfResized = function () {
            var t = this._styleCoord[2],
              e = this._styleCoord[3];
            this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
          }),
          (t.prototype.hide = function () {
            var t = this,
              e = this.el.style;
            ((e.visibility = 'hidden'),
              (e.opacity = '0'),
              l.A.transform3dSupported && (e.willChange = ''),
              (this._show = !1),
              (this._longHideTimeout = setTimeout(function () {
                return (t._longHide = !0);
              }, 500)));
          }),
          (t.prototype.hideLater = function (t) {
            !this._show ||
              (this._inContent && this._enterable) ||
              this._alwaysShowContent ||
              (t
                ? ((this._hideDelay = t),
                  (this._show = !1),
                  (this._hideTimeout = setTimeout((0, s.bind)(this.hide, this), t)))
                : this.hide());
          }),
          (t.prototype.isShow = function () {
            return this._show;
          }),
          (t.prototype.dispose = function () {
            (clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout));
            var t = this.el.parentNode;
            (t && t.removeChild(this.el), (this.el = this._container = null));
          }),
          t
        );
      })();
      const w = S;
      var T = i(132322),
        C = i(863406),
        I = (function () {
          function t(t) {
            ((this._show = !1),
              (this._styleCoord = [0, 0, 0, 0]),
              (this._alwaysShowContent = !1),
              (this._enterable = !0),
              (this._zr = t.getZr()),
              O(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2));
          }
          return (
            (t.prototype.update = function (t) {
              var e = t.get('alwaysShowContent');
              (e && this._moveIfResized(), (this._alwaysShowContent = e));
            }),
            (t.prototype.show = function () {
              (this._hideTimeout && clearTimeout(this._hideTimeout),
                this.el.show(),
                (this._show = !0));
            }),
            (t.prototype.setContent = function (t, e, i, o, n) {
              var r = this;
              (s.isObject(t) && (0, C.$8)(''), this.el && this._zr.remove(this.el));
              var a = i.getModel('textStyle');
              ((this.el = new T.Ay({
                style: {
                  rich: e.richTextStyles,
                  text: t,
                  lineHeight: 22,
                  borderWidth: 1,
                  borderColor: o,
                  textShadowColor: a.get('textShadowColor'),
                  fill: i.get(['textStyle', 'color']),
                  padding: (0, m.CO)(i, 'richText'),
                  verticalAlign: 'top',
                  align: 'left',
                },
                z: i.get('z'),
              })),
                s.each(
                  [
                    'backgroundColor',
                    'borderRadius',
                    'shadowColor',
                    'shadowBlur',
                    'shadowOffsetX',
                    'shadowOffsetY',
                  ],
                  function (t) {
                    r.el.style[t] = i.get(t);
                  },
                ),
                s.each(['textShadowBlur', 'textShadowOffsetX', 'textShadowOffsetY'], function (t) {
                  r.el.style[t] = a.get(t) || 0;
                }),
                this._zr.add(this.el));
              var l = this;
              (this.el.on('mouseover', function () {
                (l._enterable && (clearTimeout(l._hideTimeout), (l._show = !0)),
                  (l._inContent = !0));
              }),
                this.el.on('mouseout', function () {
                  (l._enterable && l._show && l.hideLater(l._hideDelay), (l._inContent = !1));
                }));
            }),
            (t.prototype.setEnterable = function (t) {
              this._enterable = t;
            }),
            (t.prototype.getSize = function () {
              var t = this.el,
                e = this.el.getBoundingRect(),
                i = k(t.style);
              return [e.width + i.left + i.right, e.height + i.top + i.bottom];
            }),
            (t.prototype.moveTo = function (t, e) {
              var i = this.el;
              if (i) {
                var o = this._styleCoord;
                (O(o, this._zr, t, e), (t = o[0]), (e = o[1]));
                var n = i.style,
                  r = A(n.borderWidth || 0),
                  a = k(n);
                ((i.x = t + r + a.left), (i.y = e + r + a.top), i.markRedraw());
              }
            }),
            (t.prototype._moveIfResized = function () {
              var t = this._styleCoord[2],
                e = this._styleCoord[3];
              this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
            }),
            (t.prototype.hide = function () {
              (this.el && this.el.hide(), (this._show = !1));
            }),
            (t.prototype.hideLater = function (t) {
              !this._show ||
                (this._inContent && this._enterable) ||
                this._alwaysShowContent ||
                (t
                  ? ((this._hideDelay = t),
                    (this._show = !1),
                    (this._hideTimeout = setTimeout(s.bind(this.hide, this), t)))
                  : this.hide());
            }),
            (t.prototype.isShow = function () {
              return this._show;
            }),
            (t.prototype.dispose = function () {
              this._zr.remove(this.el);
            }),
            t
          );
        })();
      function A(t) {
        return Math.max(0, t);
      }
      function k(t) {
        var e = A(t.shadowBlur || 0),
          i = A(t.shadowOffsetX || 0),
          o = A(t.shadowOffsetY || 0);
        return { left: A(e - i), right: A(e + i), top: A(e - o), bottom: A(e + o) };
      }
      function O(t, e, i, o) {
        ((t[0] = i), (t[1] = o), (t[2] = t[0] / e.getWidth()), (t[3] = t[1] / e.getHeight()));
      }
      const V = I;
      var L = i(624326),
        D = i(830010),
        z = i(826333),
        H = i(834253),
        R = i(143172),
        B = i(444784),
        P = i(399031),
        E = i(103686),
        F = i(48170),
        N = i(659109),
        Y = i(555854),
        W = i(669622),
        G = i(609427),
        X = i(747411),
        U = i(824711),
        Z = new D.A({ shape: { x: -1, y: -1, width: 2, height: 2 } });
      function j(t, e, i) {
        var o,
          n = e.ecModel;
        i ? ((o = new R.A(i, n, n)), (o = new R.A(e.option, o, n))) : (o = e);
        for (var r = t.length - 1; r >= 0; r--) {
          var a = t[r];
          a &&
            (a instanceof R.A && (a = a.get('tooltip', !0)),
            (0, s.isString)(a) && (a = { formatter: a }),
            a && (o = new R.A(a, o, n)));
        }
        return o;
      }
      function $(t, e) {
        return t.dispatchAction || (0, s.bind)(e.dispatchAction, e);
      }
      function Q(t) {
        return 'center' === t || 'middle' === t;
      }
      const K = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return ((i.type = e.type), i);
        }
        return (
          (0, r.__extends)(e, t),
          (e.prototype.init = function (t, e) {
            if (!l.A.node && e.getDom()) {
              var i = t.getComponent('tooltip'),
                o = (this._renderMode = (0, F.XJ)(i.get('renderMode')));
              this._tooltipContent =
                'richText' === o
                  ? new V(e)
                  : new w(e, {
                      appendTo: i.get('appendToBody', !0) ? 'body' : i.get('appendTo', !0),
                    });
            }
          }),
          (e.prototype.render = function (t, e, i) {
            if (!l.A.node && i.getDom()) {
              (this.group.removeAll(),
                (this._tooltipModel = t),
                (this._ecModel = e),
                (this._api = i));
              var o = this._tooltipContent;
              (o.update(t),
                o.setEnterable(t.get('enterable')),
                this._initGlobalListener(),
                this._keepShow(),
                'richText' !== this._renderMode && t.get('transitionDuration')
                  ? (0, U.N)(this, '_updatePosition', 50, 'fixRate')
                  : (0, U.IU)(this, '_updatePosition'));
            }
          }),
          (e.prototype._initGlobalListener = function () {
            var t = this._tooltipModel.get('triggerOn');
            B.k(
              'itemTooltip',
              this._api,
              (0, s.bind)(function (e, i, o) {
                'none' !== t &&
                  (t.indexOf(e) >= 0 ? this._tryShow(i, o) : 'leave' === e && this._hide(o));
              }, this),
            );
          }),
          (e.prototype._keepShow = function () {
            var t = this._tooltipModel,
              e = this._ecModel,
              i = this._api,
              o = t.get('triggerOn');
            if (null != this._lastX && null != this._lastY && 'none' !== o && 'click' !== o) {
              var n = this;
              (clearTimeout(this._refreshUpdateTimeout),
                (this._refreshUpdateTimeout = setTimeout(function () {
                  !i.isDisposed() &&
                    n.manuallyShowTip(t, e, i, {
                      x: n._lastX,
                      y: n._lastY,
                      dataByCoordSys: n._lastDataByCoordSys,
                    });
                })));
            }
          }),
          (e.prototype.manuallyShowTip = function (t, e, i, o) {
            if (o.from !== this.uid && !l.A.node && i.getDom()) {
              var n = $(o, i);
              this._ticket = '';
              var r = o.dataByCoordSys,
                a = (function (t, e, i) {
                  var o = (0, F.HB)(t).queryOptionMap,
                    n = o.keys()[0];
                  if (n && 'series' !== n) {
                    var r,
                      a = (0, F.JO)(e, n, o.get(n), {
                        useDefault: !1,
                        enableAll: !1,
                        enableNone: !1,
                      }).models[0];
                    if (a)
                      return (
                        i.getViewOfComponentModel(a).group.traverse(function (e) {
                          var i = (0, W.z)(e).tooltipConfig;
                          if (i && i.name === t.name) return ((r = e), !0);
                        }),
                        r
                          ? { componentMainType: n, componentIndex: a.componentIndex, el: r }
                          : void 0
                      );
                  }
                })(o, e, i);
              if (a) {
                var s = a.el.getBoundingRect().clone();
                (s.applyTransform(a.el.transform),
                  this._tryShow(
                    {
                      offsetX: s.x + s.width / 2,
                      offsetY: s.y + s.height / 2,
                      target: a.el,
                      position: o.position,
                      positionDefault: 'bottom',
                    },
                    n,
                  ));
              } else if (o.tooltip && null != o.x && null != o.y) {
                var h = Z;
                ((h.x = o.x),
                  (h.y = o.y),
                  h.update(),
                  ((0, W.z)(h).tooltipConfig = { name: null, option: o.tooltip }),
                  this._tryShow({ offsetX: o.x, offsetY: o.y, target: h }, n));
              } else if (r)
                this._tryShow(
                  {
                    offsetX: o.x,
                    offsetY: o.y,
                    position: o.position,
                    dataByCoordSys: r,
                    tooltipOption: o.tooltipOption,
                  },
                  n,
                );
              else if (null != o.seriesIndex) {
                if (this._manuallyAxisShowTip(t, e, i, o)) return;
                var u = (0, z.A)(o, e),
                  p = u.point[0],
                  c = u.point[1];
                null != p &&
                  null != c &&
                  this._tryShow(
                    {
                      offsetX: p,
                      offsetY: c,
                      target: u.el,
                      position: o.position,
                      positionDefault: 'bottom',
                    },
                    n,
                  );
              } else
                null != o.x &&
                  null != o.y &&
                  (i.dispatchAction({ type: 'updateAxisPointer', x: o.x, y: o.y }),
                  this._tryShow(
                    {
                      offsetX: o.x,
                      offsetY: o.y,
                      position: o.position,
                      target: i.getZr().findHover(o.x, o.y).target,
                    },
                    n,
                  ));
            }
          }),
          (e.prototype.manuallyHideTip = function (t, e, i, o) {
            var n = this._tooltipContent;
            (this._tooltipModel && n.hideLater(this._tooltipModel.get('hideDelay')),
              (this._lastX = this._lastY = this._lastDataByCoordSys = null),
              o.from !== this.uid && this._hide($(o, i)));
          }),
          (e.prototype._manuallyAxisShowTip = function (t, e, i, o) {
            var n = o.seriesIndex,
              r = o.dataIndex,
              a = e.getComponent('axisPointer').coordSysAxesInfo;
            if (null != n && null != r && null != a) {
              var s = e.getSeriesByIndex(n);
              if (
                s &&
                'axis' ===
                  j(
                    [s.getData().getItemModel(r), s, (s.coordinateSystem || {}).model],
                    this._tooltipModel,
                  ).get('trigger')
              )
                return (
                  i.dispatchAction({
                    type: 'updateAxisPointer',
                    seriesIndex: n,
                    dataIndex: r,
                    position: o.position,
                  }),
                  !0
                );
            }
          }),
          (e.prototype._tryShow = function (t, e) {
            var i = t.target;
            if (this._tooltipModel) {
              ((this._lastX = t.offsetX), (this._lastY = t.offsetY));
              var o = t.dataByCoordSys;
              if (o && o.length) this._showAxisTooltip(o, t);
              else if (i) {
                var n, r;
                if ('legend' === (0, W.z)(i).ssrType) return;
                ((this._lastDataByCoordSys = null),
                  (0, X.R)(
                    i,
                    function (t) {
                      return null != (0, W.z)(t).dataIndex
                        ? ((n = t), !0)
                        : null != (0, W.z)(t).tooltipConfig
                          ? ((r = t), !0)
                          : void 0;
                    },
                    !0,
                  ),
                  n
                    ? this._showSeriesItemTooltip(t, n, e)
                    : r
                      ? this._showComponentItemTooltip(t, r, e)
                      : this._hide(e));
              } else ((this._lastDataByCoordSys = null), this._hide(e));
            }
          }),
          (e.prototype._showOrMove = function (t, e) {
            var i = t.get('showDelay');
            ((e = (0, s.bind)(e, this)),
              clearTimeout(this._showTimout),
              i > 0 ? (this._showTimout = setTimeout(e, i)) : e());
          }),
          (e.prototype._showAxisTooltip = function (t, e) {
            var i = this._ecModel,
              o = this._tooltipModel,
              n = [e.offsetX, e.offsetY],
              r = j([e.tooltipOption], o),
              a = this._renderMode,
              l = [],
              h = (0, m.Qx)('section', { blocks: [], noHeader: !0 }),
              u = [],
              c = new m.lb();
            ((0, s.each)(t, function (t) {
              (0, s.each)(t.dataByAxis, function (t) {
                var e = i.getComponent(t.axisDim + 'Axis', t.axisIndex),
                  n = t.value;
                if (e && null != n) {
                  var r = E._F(n, e.axis, i, t.seriesDataIndices, t.valueLabelOpt),
                    d = (0, m.Qx)('section', {
                      header: r,
                      noHeader: !(0, s.trim)(r),
                      sortBlocks: !0,
                      blocks: [],
                    });
                  (h.blocks.push(d),
                    (0, s.each)(t.seriesDataIndices, function (h) {
                      var f = i.getSeriesByIndex(h.seriesIndex),
                        g = h.dataIndexInside,
                        v = f.getDataParams(g);
                      if (!(v.dataIndex < 0)) {
                        ((v.axisDim = t.axisDim),
                          (v.axisIndex = t.axisIndex),
                          (v.axisType = t.axisType),
                          (v.axisId = t.axisId),
                          (v.axisValue = P.Dt(e.axis, { value: n })),
                          (v.axisValueLabel = r),
                          (v.marker = c.makeTooltipMarker('item', (0, p.he)(v.color), a)));
                        var m = (0, G.L)(f.formatTooltip(g, !0, null)),
                          y = m.frag;
                        if (y) {
                          var x = j([f], o).get('valueFormatter');
                          d.blocks.push(x ? (0, s.extend)({ valueFormatter: x }, y) : y);
                        }
                        (m.text && u.push(m.text), l.push(v));
                      }
                    }));
                }
              });
            }),
              h.blocks.reverse(),
              u.reverse());
            var d = e.position,
              f = r.get('order'),
              g = (0, m.Yu)(h, c, a, f, i.get('useUTC'), r.get('textStyle'));
            g && u.unshift(g);
            var v = 'richText' === a ? '\n\n' : '<br/>',
              y = u.join(v);
            this._showOrMove(r, function () {
              this._updateContentNotChangedOnAxis(t, l)
                ? this._updatePosition(r, d, n[0], n[1], this._tooltipContent, l)
                : this._showTooltipContent(r, y, l, Math.random() + '', n[0], n[1], d, null, c);
            });
          }),
          (e.prototype._showSeriesItemTooltip = function (t, e, i) {
            var o = this._ecModel,
              n = (0, W.z)(e),
              r = n.seriesIndex,
              a = o.getSeriesByIndex(r),
              l = n.dataModel || a,
              h = n.dataIndex,
              u = n.dataType,
              c = l.getData(u),
              d = this._renderMode,
              f = t.positionDefault,
              g = j(
                [c.getItemModel(h), l, a && (a.coordinateSystem || {}).model],
                this._tooltipModel,
                f ? { position: f } : null,
              ),
              v = g.get('trigger');
            if (null == v || 'item' === v) {
              var y = l.getDataParams(h, u),
                x = new m.lb();
              y.marker = x.makeTooltipMarker('item', (0, p.he)(y.color), d);
              var _ = (0, G.L)(l.formatTooltip(h, !1, u)),
                M = g.get('order'),
                b = g.get('valueFormatter'),
                S = _.frag,
                w = S
                  ? (0, m.Yu)(
                      b ? (0, s.extend)({ valueFormatter: b }, S) : S,
                      x,
                      d,
                      M,
                      o.get('useUTC'),
                      g.get('textStyle'),
                    )
                  : _.text,
                T = 'item_' + l.name + '_' + h;
              (this._showOrMove(g, function () {
                this._showTooltipContent(g, w, y, T, t.offsetX, t.offsetY, t.position, t.target, x);
              }),
                i({
                  type: 'showTip',
                  dataIndexInside: h,
                  dataIndex: c.getRawIndex(h),
                  seriesIndex: r,
                  from: this.uid,
                }));
            }
          }),
          (e.prototype._showComponentItemTooltip = function (t, e, i) {
            var o = 'html' === this._renderMode,
              n = (0, W.z)(e),
              r = n.tooltipConfig.option || {},
              a = r.encodeHTMLContent;
            ((0, s.isString)(r) && ((r = { content: r, formatter: r }), (a = !0)),
              a && o && r.content && ((r = (0, s.clone)(r)).content = (0, u.Me)(r.content)));
            var l = [r],
              h = this._ecModel.getComponent(n.componentMainType, n.componentIndex);
            (h && l.push(h), l.push({ formatter: r.content }));
            var p = t.positionDefault,
              c = j(l, this._tooltipModel, p ? { position: p } : null),
              d = c.get('content'),
              f = Math.random() + '',
              g = new m.lb();
            (this._showOrMove(c, function () {
              var i = (0, s.clone)(c.get('formatterParams') || {});
              this._showTooltipContent(c, d, i, f, t.offsetX, t.offsetY, t.position, e, g);
            }),
              i({ type: 'showTip', from: this.uid }));
          }),
          (e.prototype._showTooltipContent = function (t, e, i, o, n, r, a, l, h) {
            if (((this._ticket = ''), t.get('showContent') && t.get('show'))) {
              var u = this._tooltipContent;
              u.setEnterable(t.get('enterable'));
              var c = t.get('formatter');
              a = a || t.get('position');
              var d = e,
                f = this._getNearestPoint([n, r], i, t.get('trigger'), t.get('borderColor')).color;
              if (c)
                if ((0, s.isString)(c)) {
                  var g = t.ecModel.get('useUTC'),
                    v = (0, s.isArray)(i) ? i[0] : i;
                  ((d = c),
                    v &&
                      v.axisType &&
                      v.axisType.indexOf('time') >= 0 &&
                      (d = (0, Y.GP)(v.axisValue, d, g)),
                    (d = (0, p.YK)(d, i, !0)));
                } else if ((0, s.isFunction)(c)) {
                  var m = (0, s.bind)(function (e, o) {
                    e === this._ticket &&
                      (u.setContent(o, h, t, f, a), this._updatePosition(t, a, n, r, u, i, l));
                  }, this);
                  ((this._ticket = o), (d = c(i, o, m)));
                } else d = c;
              (u.setContent(d, h, t, f, a),
                u.show(t, f),
                this._updatePosition(t, a, n, r, u, i, l));
            }
          }),
          (e.prototype._getNearestPoint = function (t, e, i, o) {
            return 'axis' === i || (0, s.isArray)(e)
              ? { color: o || ('html' === this._renderMode ? '#fff' : 'none') }
              : (0, s.isArray)(e)
                ? void 0
                : { color: o || e.color || e.borderColor };
          }),
          (e.prototype._updatePosition = function (t, e, i, o, n, r, a) {
            var l = this._api.getWidth(),
              h = this._api.getHeight();
            e = e || t.get('position');
            var u = n.getSize(),
              p = t.get('align'),
              d = t.get('verticalAlign'),
              f = a && a.getBoundingRect().clone();
            if (
              (a && f.applyTransform(a.transform),
              (0, s.isFunction)(e) &&
                (e = e([i, o], r, n.el, f, { viewSize: [l, h], contentSize: u.slice() })),
              (0, s.isArray)(e))
            )
              ((i = (0, L.lo)(e[0], l)), (o = (0, L.lo)(e[1], h)));
            else if ((0, s.isObject)(e)) {
              var g = e;
              ((g.width = u[0]), (g.height = u[1]));
              var v = (0, H.dV)(g, { width: l, height: h });
              ((i = v.x), (o = v.y), (p = null), (d = null));
            } else if ((0, s.isString)(e) && a) {
              var m = (function (t, e, i, o) {
                var n = i[0],
                  r = i[1],
                  a = Math.ceil(Math.SQRT2 * o) + 8,
                  s = 0,
                  l = 0,
                  h = e.width,
                  u = e.height;
                switch (t) {
                  case 'inside':
                    ((s = e.x + h / 2 - n / 2), (l = e.y + u / 2 - r / 2));
                    break;
                  case 'top':
                    ((s = e.x + h / 2 - n / 2), (l = e.y - r - a));
                    break;
                  case 'bottom':
                    ((s = e.x + h / 2 - n / 2), (l = e.y + u + a));
                    break;
                  case 'left':
                    ((s = e.x - n - a), (l = e.y + u / 2 - r / 2));
                    break;
                  case 'right':
                    ((s = e.x + h + a), (l = e.y + u / 2 - r / 2));
                }
                return [s, l];
              })(e, f, u, t.get('borderWidth'));
              ((i = m[0]), (o = m[1]));
            } else
              ((m = (function (t, e, i, o, n, r, a) {
                var s = i.getSize(),
                  l = s[0],
                  h = s[1];
                return (
                  null != r && (t + l + r + 2 > o ? (t -= l + r) : (t += r)),
                  null != a && (e + h + a > n ? (e -= h + a) : (e += a)),
                  [t, e]
                );
              })(i, o, n, l, h, p ? null : 20, d ? null : 20)),
                (i = m[0]),
                (o = m[1]));
            (p && (i -= Q(p) ? u[0] / 2 : 'right' === p ? u[0] : 0),
              d && (o -= Q(d) ? u[1] / 2 : 'bottom' === d ? u[1] : 0),
              c(t) &&
                ((m = (function (t, e, i, o, n) {
                  var r = i.getSize(),
                    a = r[0],
                    s = r[1];
                  return (
                    (t = Math.min(t + a, o) - a),
                    (e = Math.min(e + s, n) - s),
                    [(t = Math.max(t, 0)), (e = Math.max(e, 0))]
                  );
                })(i, o, n, l, h)),
                (i = m[0]),
                (o = m[1])),
              n.moveTo(i, o));
          }),
          (e.prototype._updateContentNotChangedOnAxis = function (t, e) {
            var i = this._lastDataByCoordSys,
              o = this._cbParamsList,
              n = !!i && i.length === t.length;
            return (
              n &&
                (0, s.each)(i, function (i, r) {
                  var a = i.dataByAxis || [],
                    l = (t[r] || {}).dataByAxis || [];
                  (n = n && a.length === l.length) &&
                    (0, s.each)(a, function (t, i) {
                      var r = l[i] || {},
                        a = t.seriesDataIndices || [],
                        h = r.seriesDataIndices || [];
                      ((n =
                        n &&
                        t.value === r.value &&
                        t.axisType === r.axisType &&
                        t.axisId === r.axisId &&
                        a.length === h.length) &&
                        (0, s.each)(a, function (t, e) {
                          var i = h[e];
                          n = n && t.seriesIndex === i.seriesIndex && t.dataIndex === i.dataIndex;
                        }),
                        o &&
                          (0, s.each)(t.seriesDataIndices, function (t) {
                            var i = t.seriesIndex,
                              r = e[i],
                              a = o[i];
                            r && a && a.data !== r.data && (n = !1);
                          }));
                    });
                }),
              (this._lastDataByCoordSys = t),
              (this._cbParamsList = e),
              !!n
            );
          }),
          (e.prototype._hide = function (t) {
            ((this._lastDataByCoordSys = null), t({ type: 'hideTip', from: this.uid }));
          }),
          (e.prototype.dispose = function (t, e) {
            !l.A.node &&
              e.getDom() &&
              ((0, U.IU)(this, '_updatePosition'),
              this._tooltipContent.dispose(),
              B.h('itemTooltip', e));
          }),
          (e.type = 'tooltip'),
          e
        );
      })(N.A);
      function q(t) {
        ((0, n.Y)(o.a),
          t.registerComponentModel(a),
          t.registerComponentView(K),
          t.registerAction(
            { type: 'showTip', event: 'showTip', update: 'tooltip:manuallyShowTip' },
            s.noop,
          ),
          t.registerAction(
            { type: 'hideTip', event: 'hideTip', update: 'tooltip:manuallyHideTip' },
            s.noop,
          ));
      }
    },
    204235: (t, e, i) => {
      i.d(e, { J: () => s });
      var o = i(498026),
        n = i(603961),
        r = i(558267),
        a = i(48170);
      function s(t) {
        var e,
          i,
          s,
          l,
          h = t.series,
          u = t.dataIndex,
          p = t.multipleSeries,
          c = h.getData(),
          d = c.mapDimensionsAll('defaultedTooltip'),
          f = d.length,
          g = h.getRawValue(u),
          v = (0, o.isArray)(g),
          m = (0, n.aw)(h, u);
        if (f > 1 || (v && !f)) {
          var y = (function (t, e, i, a, s) {
            var l = e.getData(),
              h = (0, o.reduce)(
                t,
                function (t, e, i) {
                  var o = l.getDimensionInfo(i);
                  return t || (o && !1 !== o.tooltip && null != o.displayName);
                },
                !1,
              ),
              u = [],
              p = [],
              c = [];
            function d(t, e) {
              var i = l.getDimensionInfo(e);
              i &&
                !1 !== i.otherDims.tooltip &&
                (h
                  ? c.push(
                      (0, n.Qx)('nameValue', {
                        markerType: 'subItem',
                        markerColor: s,
                        name: i.displayName,
                        value: t,
                        valueType: i.type,
                      }),
                    )
                  : (u.push(t), p.push(i.type)));
            }
            return (
              a.length
                ? (0, o.each)(a, function (t) {
                    d((0, r.QE)(l, i, t), t);
                  })
                : (0, o.each)(t, d),
              { inlineValues: u, inlineValueTypes: p, blocks: c }
            );
          })(g, h, u, d, m);
          ((e = y.inlineValues), (i = y.inlineValueTypes), (s = y.blocks), (l = y.inlineValues[0]));
        } else if (f) {
          var x = c.getDimensionInfo(d[0]);
          ((l = e = (0, r.QE)(c, u, d[0])), (i = x.type));
        } else l = e = v ? g[0] : g;
        var _ = (0, a.O0)(h),
          M = (_ && h.name) || '',
          b = c.getName(u),
          S = p ? M : b;
        return (0, n.Qx)('section', {
          header: M,
          noHeader: p || !_,
          sortParam: l,
          blocks: [
            (0, n.Qx)('nameValue', {
              markerType: 'item',
              markerColor: m,
              name: S,
              noName: !(0, o.trim)(S),
              value: e,
              valueType: i,
              dataIndex: u,
            }),
          ].concat(s || []),
        });
      }
    },
    603961: (t, e, i) => {
      i.d(e, { CO: () => S, Qx: () => d, Yu: () => x, aw: () => b, lb: () => w });
      var o = i(429687),
        n = i(783412),
        r = i(498026),
        a = i(731825),
        s = i(624326),
        l = 'line-height:1';
      function h(t) {
        var e = t.lineHeight;
        return null == e ? l : 'line-height:' + (0, o.Me)(e + '') + 'px';
      }
      function u(t, e) {
        var i = t.color || '#6e7079',
          n = t.fontSize || 12,
          r = t.fontWeight || '400',
          a = t.color || '#464646',
          s = t.fontSize || 14,
          l = t.fontWeight || '900';
        return 'html' === e
          ? {
              nameStyle:
                'font-size:' +
                (0, o.Me)(n + '') +
                'px;color:' +
                (0, o.Me)(i) +
                ';font-weight:' +
                (0, o.Me)(r + ''),
              valueStyle:
                'font-size:' +
                (0, o.Me)(s + '') +
                'px;color:' +
                (0, o.Me)(a) +
                ';font-weight:' +
                (0, o.Me)(l + ''),
            }
          : {
              nameStyle: { fontSize: n, fill: i, fontWeight: r },
              valueStyle: { fontSize: s, fill: a, fontWeight: l },
            };
      }
      var p = [0, 10, 20, 30],
        c = ['', '\n', '\n\n', '\n\n\n'];
      function d(t, e) {
        return ((e.type = t), e);
      }
      function f(t) {
        return 'section' === t.type;
      }
      function g(t) {
        return f(t) ? m : y;
      }
      function v(t) {
        if (f(t)) {
          var e = 0,
            i = t.blocks.length,
            o = i > 1 || (i > 0 && !t.noHeader);
          return (
            (0, r.each)(t.blocks, function (t) {
              var i = v(t);
              i >= e && (e = i + +(o && (!i || (f(t) && !t.noHeader))));
            }),
            e
          );
        }
        return 0;
      }
      function m(t, e, i, s) {
        var l,
          d = e.noHeader,
          f = ((l = v(e)), { html: p[l], richText: c[l] }),
          m = [],
          y = e.blocks || [];
        ((0, r.assert)(!y || (0, r.isArray)(y)), (y = y || []));
        var x = t.orderMode;
        if (e.sortBlocks && x) {
          y = y.slice();
          var b = { valueAsc: 'asc', valueDesc: 'desc' };
          if ((0, r.hasOwn)(b, x)) {
            var S = new a.Fl(b[x], null);
            y.sort(function (t, e) {
              return S.evaluate(t.sortParam, e.sortParam);
            });
          } else 'seriesDesc' === x && y.reverse();
        }
        (0, r.each)(y, function (i, o) {
          var n = e.valueFormatter,
            a = g(i)(
              n ? (0, r.extend)((0, r.extend)({}, t), { valueFormatter: n }) : t,
              i,
              o > 0 ? f.html : 0,
              s,
            );
          null != a && m.push(a);
        });
        var w = 'richText' === t.renderMode ? m.join(f.richText) : _(s, m.join(''), d ? i : f.html);
        if (d) return w;
        var T = (0, n.yC)(e.header, 'ordinal', t.useUTC),
          C = u(s, t.renderMode).nameStyle,
          I = h(s);
        return 'richText' === t.renderMode
          ? M(t, T, C) + f.richText + w
          : _(s, '<div style="' + C + ';' + I + ';">' + (0, o.Me)(T) + '</div>' + w, i);
      }
      function y(t, e, i, a) {
        var s = t.renderMode,
          l = e.noName,
          h = e.noValue,
          p = !e.markerType,
          c = e.name,
          d = t.useUTC,
          f =
            e.valueFormatter ||
            t.valueFormatter ||
            function (t) {
              return (
                (t = (0, r.isArray)(t) ? t : [t]),
                (0, r.map)(t, function (t, e) {
                  return (0, n.yC)(t, (0, r.isArray)(m) ? m[e] : m, d);
                })
              );
            };
        if (!l || !h) {
          var g = p
              ? ''
              : t.markupStyleCreator.makeTooltipMarker(e.markerType, e.markerColor || '#333', s),
            v = l ? '' : (0, n.yC)(c, 'ordinal', d),
            m = e.valueType,
            y = h ? [] : f(e.value, e.dataIndex),
            x = !p || !l,
            b = !p && l,
            S = u(a, s),
            w = S.nameStyle,
            T = S.valueStyle;
          return 'richText' === s
            ? (p ? '' : g) +
                (l ? '' : M(t, v, w)) +
                (h
                  ? ''
                  : (function (t, e, i, o, n) {
                      var a = [n],
                        s = o ? 10 : 20;
                      return (
                        i && a.push({ padding: [0, 0, 0, s], align: 'right' }),
                        t.markupStyleCreator.wrapRichTextStyle(
                          (0, r.isArray)(e) ? e.join('  ') : e,
                          a,
                        )
                      );
                    })(t, y, x, b, T))
            : _(
                a,
                (p ? '' : g) +
                  (l
                    ? ''
                    : (function (t, e, i) {
                        return (
                          '<span style="' +
                          i +
                          ';' +
                          (e ? 'margin-left:2px' : '') +
                          '">' +
                          (0, o.Me)(t) +
                          '</span>'
                        );
                      })(v, !p, w)) +
                  (h
                    ? ''
                    : (function (t, e, i, n) {
                        var a = e ? 'float:right;margin-left:' + (i ? '10px' : '20px') : '';
                        return (
                          (t = (0, r.isArray)(t) ? t : [t]),
                          '<span style="' +
                            a +
                            ';' +
                            n +
                            '">' +
                            (0, r.map)(t, function (t) {
                              return (0, o.Me)(t);
                            }).join('&nbsp;&nbsp;') +
                            '</span>'
                        );
                      })(y, x, b, T)),
                i,
              );
        }
      }
      function x(t, e, i, o, n, r) {
        if (t)
          return g(t)(
            {
              useUTC: n,
              renderMode: i,
              orderMode: o,
              markupStyleCreator: e,
              valueFormatter: t.valueFormatter,
            },
            t,
            0,
            r,
          );
      }
      function _(t, e, i) {
        return (
          '<div style="margin: ' +
          i +
          'px 0 0;' +
          h(t) +
          ';">' +
          e +
          '<div style="clear:both"></div></div>'
        );
      }
      function M(t, e, i) {
        return t.markupStyleCreator.wrapRichTextStyle(e, i);
      }
      function b(t, e) {
        var i = t.getData().getItemVisual(e, 'style')[t.visualDrawType];
        return (0, n.he)(i);
      }
      function S(t, e) {
        var i = t.get('padding');
        return null != i ? i : 'richText' === e ? [8, 10] : 10;
      }
      var w = (function () {
        function t() {
          ((this.richTextStyles = {}), (this._nextStyleNameId = (0, s.IH)()));
        }
        return (
          (t.prototype._generateStyleName = function () {
            return '__EC_aUTo_' + this._nextStyleNameId++;
          }),
          (t.prototype.makeTooltipMarker = function (t, e, i) {
            var o = 'richText' === i ? this._generateStyleName() : null,
              a = (0, n.qg)({ color: e, type: t, renderMode: i, markerId: o });
            return (0, r.isString)(a) ? a : ((this.richTextStyles[o] = a.style), a.content);
          }),
          (t.prototype.wrapRichTextStyle = function (t, e) {
            var i = {};
            (0, r.isArray)(e)
              ? (0, r.each)(e, function (t) {
                  return (0, r.extend)(i, t);
                })
              : (0, r.extend)(i, e);
            var o = this._generateStyleName();
            return ((this.richTextStyles[o] = i), '{' + o + '|' + t + '}');
          }),
          t
        );
      })();
    },
    44934: (t, e, i) => {
      i.d(e, { a: () => p });
      var o = i(506129),
        n = i(498026),
        r = i(863406),
        a = {
          type: 'echarts:filter',
          transform: function (t) {
            for (
              var e,
                i = t.upstream,
                a = (0, o.I)(t.config, {
                  valueGetterAttrMap: (0, n.createHashMap)({ dimension: !0 }),
                  prepareGetValue: function (t) {
                    var e = t.dimension;
                    (0, n.hasOwn)(t, 'dimension') || (0, r.$8)('');
                    var o = i.getDimensionInfo(e);
                    return (o || (0, r.$8)(''), { dimIdx: o.index });
                  },
                  getValue: function (t) {
                    return i.retrieveValueFromItem(e, t.dimIdx);
                  },
                }),
                s = [],
                l = 0,
                h = i.count();
              l < h;
              l++
            )
              ((e = i.getRawDataItem(l)), a.evaluate() && s.push(e));
            return { data: s };
          },
        },
        s = i(313430),
        l = i(48170),
        h = i(731825),
        u = {
          type: 'echarts:sort',
          transform: function (t) {
            var e = t.upstream,
              i = t.config,
              o = '',
              a = (0, l.qB)(i);
            a.length || (0, r.$8)(o);
            var u = [];
            (0, n.each)(a, function (t) {
              var i = t.dimension,
                n = t.order,
                a = t.parser,
                s = t.incomparable;
              (null == i && (0, r.$8)(o),
                'asc' !== n && 'desc' !== n && (0, r.$8)(o),
                s && 'min' !== s && 'max' !== s && (0, r.$8)(''),
                'asc' !== n && 'desc' !== n && (0, r.$8)(''));
              var l = e.getDimensionInfo(i);
              l || (0, r.$8)(o);
              var p = a ? (0, h.zC)(a) : null;
              (a && !p && (0, r.$8)(o),
                u.push({ dimIdx: l.index, parser: p, comparator: new h.Fl(n, s) }));
            });
            var p = e.sourceFormat;
            p !== s.Km && p !== s.Wk && (0, r.$8)(o);
            for (var c = [], d = 0, f = e.count(); d < f; d++) c.push(e.getRawDataItem(d));
            return (
              c.sort(function (t, i) {
                for (var o = 0; o < u.length; o++) {
                  var n = u[o],
                    r = e.retrieveValueFromItem(t, n.dimIdx),
                    a = e.retrieveValueFromItem(i, n.dimIdx);
                  n.parser && ((r = n.parser(r)), (a = n.parser(a)));
                  var s = n.comparator.evaluate(r, a);
                  if (0 !== s) return s;
                }
                return 0;
              }),
              { data: c }
            );
          },
        };
      function p(t) {
        (t.registerTransform(a), t.registerTransform(u));
      }
    },
    226192: (t, e, i) => {
      i.d(e, { A: () => m });
      var o = i(15215),
        n = i(498026),
        r = i(54942),
        a = i(907857),
        s = i(106372),
        l = i(48170),
        h = i(624326),
        u = i(515915),
        p = a.A.mapVisual,
        c = a.A.eachVisual,
        d = n.isArray,
        f = n.each,
        g = h.Y6,
        v = h.Cb;
      const m = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return (
            (i.type = e.type),
            (i.stateList = ['inRange', 'outOfRange']),
            (i.replacableOptionKeys = ['inRange', 'outOfRange', 'target', 'controller', 'color']),
            (i.layoutMode = { type: 'box', ignoreSize: !0 }),
            (i.dataBound = [-1 / 0, 1 / 0]),
            (i.targetVisuals = {}),
            (i.controllerVisuals = {}),
            i
          );
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.init = function (t, e, i) {
            this.mergeDefaultAndTheme(t, i);
          }),
          (e.prototype.optionUpdated = function (t, e) {
            var i = this.option;
            (!e && s.St(i, t, this.replacableOptionKeys),
              (this.textStyleModel = this.getModel('textStyle')),
              this.resetItemSize(),
              this.completeVisualOption());
          }),
          (e.prototype.resetVisual = function (t) {
            var e = this.stateList;
            ((t = n.bind(t, this)),
              (this.controllerVisuals = s.u1(this.option.controller, e, t)),
              (this.targetVisuals = s.u1(this.option.target, e, t)));
          }),
          (e.prototype.getItemSymbol = function () {
            return null;
          }),
          (e.prototype.getTargetSeriesIndices = function () {
            var t = this.option.seriesIndex,
              e = [];
            return (
              null == t || 'all' === t
                ? this.ecModel.eachSeries(function (t, i) {
                    e.push(i);
                  })
                : (e = l.qB(t)),
              e
            );
          }),
          (e.prototype.eachTargetSeries = function (t, e) {
            n.each(
              this.getTargetSeriesIndices(),
              function (i) {
                var o = this.ecModel.getSeriesByIndex(i);
                o && t.call(e, o);
              },
              this,
            );
          }),
          (e.prototype.isTargetSeries = function (t) {
            var e = !1;
            return (
              this.eachTargetSeries(function (i) {
                i === t && (e = !0);
              }),
              e
            );
          }),
          (e.prototype.formatValueText = function (t, e, i) {
            var o,
              r = this.option,
              a = r.precision,
              s = this.dataBound,
              l = r.formatter;
            ((i = i || ['<', '>']), n.isArray(t) && ((t = t.slice()), (o = !0)));
            var h = e ? t : o ? [u(t[0]), u(t[1])] : u(t);
            return n.isString(l)
              ? l.replace('{value}', o ? h[0] : h).replace('{value2}', o ? h[1] : h)
              : n.isFunction(l)
                ? o
                  ? l(t[0], t[1])
                  : l(t)
                : o
                  ? t[0] === s[0]
                    ? i[0] + ' ' + h[1]
                    : t[1] === s[1]
                      ? i[1] + ' ' + h[0]
                      : h[0] + ' - ' + h[1]
                  : h;
            function u(t) {
              return t === s[0] ? 'min' : t === s[1] ? 'max' : (+t).toFixed(Math.min(a, 20));
            }
          }),
          (e.prototype.resetExtent = function () {
            var t = this.option,
              e = g([t.min, t.max]);
            this._dataExtent = e;
          }),
          (e.prototype.getDataDimensionIndex = function (t) {
            var e = this.option.dimension;
            if (null != e) return t.getDimensionIndex(e);
            for (var i = t.dimensions, o = i.length - 1; o >= 0; o--) {
              var n = i[o],
                r = t.getDimensionInfo(n);
              if (!r.isCalculationCoord) return r.storeDimIndex;
            }
          }),
          (e.prototype.getExtent = function () {
            return this._dataExtent.slice();
          }),
          (e.prototype.completeVisualOption = function () {
            var t = this.ecModel,
              e = this.option,
              i = { inRange: e.inRange, outOfRange: e.outOfRange },
              o = e.target || (e.target = {}),
              s = e.controller || (e.controller = {});
            (n.merge(o, i), n.merge(s, i));
            var l = this.isCategory();
            function h(i) {
              (d(e.color) && !i.inRange && (i.inRange = { color: e.color.slice().reverse() }),
                (i.inRange = i.inRange || { color: t.get('gradientColor') }));
            }
            (h.call(this, o),
              h.call(this, s),
              function (t, e, i) {
                var o = t[e],
                  n = t[i];
                o &&
                  !n &&
                  ((n = t[i] = {}),
                  f(o, function (t, e) {
                    if (a.A.isValidType(e)) {
                      var i = r.A.get(e, 'inactive', l);
                      null != i &&
                        ((n[e] = i),
                        'color' !== e ||
                          n.hasOwnProperty('opacity') ||
                          n.hasOwnProperty('colorAlpha') ||
                          (n.opacity = [0, 0]));
                    }
                  }));
              }.call(this, o, 'inRange', 'outOfRange'),
              function (t) {
                var e = (t.inRange || {}).symbol || (t.outOfRange || {}).symbol,
                  i = (t.inRange || {}).symbolSize || (t.outOfRange || {}).symbolSize,
                  o = this.get('inactiveColor'),
                  r = this.getItemSymbol() || 'roundRect';
                f(
                  this.stateList,
                  function (a) {
                    var s = this.itemSize,
                      h = t[a];
                    (h || (h = t[a] = { color: l ? o : [o] }),
                      null == h.symbol && (h.symbol = (e && n.clone(e)) || (l ? r : [r])),
                      null == h.symbolSize &&
                        (h.symbolSize = (i && n.clone(i)) || (l ? s[0] : [s[0], s[0]])),
                      (h.symbol = p(h.symbol, function (t) {
                        return 'none' === t ? r : t;
                      })));
                    var u = h.symbolSize;
                    if (null != u) {
                      var d = -1 / 0;
                      (c(u, function (t) {
                        t > d && (d = t);
                      }),
                        (h.symbolSize = p(u, function (t) {
                          return v(t, [0, d], [0, s[0]], !0);
                        })));
                    }
                  },
                  this,
                );
              }.call(this, s));
          }),
          (e.prototype.resetItemSize = function () {
            this.itemSize = [parseFloat(this.get('itemWidth')), parseFloat(this.get('itemHeight'))];
          }),
          (e.prototype.isCategory = function () {
            return !!this.option.categories;
          }),
          (e.prototype.setSelected = function (t) {}),
          (e.prototype.getSelected = function () {
            return null;
          }),
          (e.prototype.getValueState = function (t) {
            return null;
          }),
          (e.prototype.getVisualMeta = function (t) {
            return null;
          }),
          (e.type = 'visualMap'),
          (e.dependencies = ['series']),
          (e.defaultOption = {
            show: !0,
            z: 4,
            seriesIndex: 'all',
            min: 0,
            max: 200,
            left: 0,
            right: null,
            top: null,
            bottom: 0,
            itemWidth: null,
            itemHeight: null,
            inverse: !1,
            orient: 'vertical',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',
            contentColor: '#5793f3',
            inactiveColor: '#aaa',
            borderWidth: 0,
            padding: 5,
            textGap: 10,
            precision: 0,
            textStyle: { color: '#333' },
          }),
          e
        );
      })(u.A);
    },
    559044: (t, e, i) => {
      i.d(e, { A: () => h });
      var o = i(15215),
        n = i(498026),
        r = i(830010),
        a = i(783412),
        s = i(834253),
        l = i(907857);
      const h = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return (
            (i.type = e.type),
            (i.autoPositionValues = { left: 1, right: 1, top: 1, bottom: 1 }),
            i
          );
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.init = function (t, e) {
            ((this.ecModel = t), (this.api = e));
          }),
          (e.prototype.render = function (t, e, i, o) {
            ((this.visualMapModel = t),
              !1 !== t.get('show') ? this.doRender(t, e, i, o) : this.group.removeAll());
          }),
          (e.prototype.renderBackground = function (t) {
            var e = this.visualMapModel,
              i = a.QX(e.get('padding') || 0),
              o = t.getBoundingRect();
            t.add(
              new r.A({
                z2: -1,
                silent: !0,
                shape: {
                  x: o.x - i[3],
                  y: o.y - i[0],
                  width: o.width + i[3] + i[1],
                  height: o.height + i[0] + i[2],
                },
                style: {
                  fill: e.get('backgroundColor'),
                  stroke: e.get('borderColor'),
                  lineWidth: e.get('borderWidth'),
                },
              }),
            );
          }),
          (e.prototype.getControllerVisual = function (t, e, i) {
            var o = (i = i || {}).forceState,
              r = this.visualMapModel,
              a = {};
            if ('color' === e) {
              var s = r.get('contentColor');
              a.color = s;
            }
            function h(t) {
              return a[t];
            }
            function u(t, e) {
              a[t] = e;
            }
            var p = r.controllerVisuals[o || r.getValueState(t)],
              c = l.A.prepareVisualTypes(p);
            return (
              n.each(c, function (o) {
                var n = p[o];
                (i.convertOpacityToAlpha &&
                  'opacity' === o &&
                  ((o = 'colorAlpha'), (n = p.__alphaForOpacity)),
                  l.A.dependsOn(o, e) && n && n.applyVisual(t, h, u));
              }),
              a[e]
            );
          }),
          (e.prototype.positionGroup = function (t) {
            var e = this.visualMapModel,
              i = this.api;
            s.m$(t, e.getBoxLayoutParams(), { width: i.getWidth(), height: i.getHeight() });
          }),
          (e.prototype.doRender = function (t, e, i, o) {}),
          (e.type = 'visualMap'),
          e
        );
      })(i(659109).A);
    },
    46259: (t, e, i) => {
      i.d(e, { J: () => a, l: () => s });
      var o = i(498026),
        n = i(834253),
        r = [
          ['left', 'right', 'width'],
          ['top', 'bottom', 'height'],
        ];
      function a(t, e, i) {
        var o = t.option,
          a = o.align;
        if (null != a && 'auto' !== a) return a;
        for (
          var s = { width: e.getWidth(), height: e.getHeight() },
            l = 'horizontal' === o.orient ? 1 : 0,
            h = r[l],
            u = [0, null, 10],
            p = {},
            c = 0;
          c < 3;
          c++
        )
          ((p[r[1 - l][c]] = u[c]), (p[h[c]] = 2 === c ? i[0] : o[h[c]]));
        var d = [
            ['x', 'width', 3],
            ['y', 'height', 0],
          ][l],
          f = (0, n.dV)(p, s, o.padding);
        return h[(f.margin[d[2]] || 0) + f[d[0]] + 0.5 * f[d[1]] < 0.5 * s[d[1]] ? 0 : 1];
      }
      function s(t, e) {
        return (
          o.each(t || [], function (t) {
            (null != t.dataIndex && ((t.dataIndexInside = t.dataIndex), (t.dataIndex = null)),
              (t.highlightKey = 'visualMap' + (e ? e.componentIndex : '')));
          }),
          t
        );
      }
    },
    728540: (t, e, i) => {
      i.d(e, { a: () => a });
      var o = i(903087),
        n = i(267113),
        r = i(468781);
      function a(t) {
        ((0, o.Y)(n.a), (0, o.Y)(r.a));
      }
    },
    841369: (t, e, i) => {
      i.d(e, { A: () => g });
      var o = { type: 'selectDataRange', event: 'dataRangeSelected', update: 'update' },
        n = function (t, e) {
          e.eachComponent({ mainType: 'visualMap', query: t }, function (e) {
            e.setSelected(t.selected);
          });
        },
        r = i(498026),
        a = i(106372),
        s = i(907857),
        l = i(337395),
        h = [
          {
            createOnAllSeries: !0,
            reset: function (t, e) {
              var i = [];
              return (
                e.eachComponent('visualMap', function (e) {
                  var o = t.pipelineContext;
                  !e.isTargetSeries(t) ||
                    (o && o.large) ||
                    i.push(
                      a.dS(
                        e.stateList,
                        e.targetVisuals,
                        r.bind(e.getValueState, e),
                        e.getDataDimensionIndex(t.getData()),
                      ),
                    );
                }),
                i
              );
            },
          },
          {
            createOnAllSeries: !0,
            reset: function (t, e) {
              var i = t.getData(),
                o = [];
              (e.eachComponent('visualMap', function (e) {
                if (e.isTargetSeries(t)) {
                  var n = e.getVisualMeta(r.bind(u, null, t, e)) || { stops: [], outerColors: [] },
                    a = e.getDataDimensionIndex(i);
                  a >= 0 && ((n.dimension = a), o.push(n));
                }
              }),
                t.getData().setVisual('visualMeta', o));
            },
          },
        ];
      function u(t, e, i, o) {
        for (
          var n = e.targetVisuals[o],
            r = s.A.prepareVisualTypes(n),
            a = { color: (0, l.rI)(t.getData(), 'color') },
            h = 0,
            u = r.length;
          h < u;
          h++
        ) {
          var p = r[h],
            c = n['opacity' === p ? '__alphaForOpacity' : p];
          c && c.applyVisual(i, d, f);
        }
        return a.color;
        function d(t) {
          return a[t];
        }
        function f(t, e) {
          a[t] = e;
        }
      }
      var p = r.each;
      function c(t) {
        var e = t && t.visualMap;
        (r.isArray(e) || (e = e ? [e] : []),
          p(e, function (t) {
            if (t) {
              d(t, 'splitList') &&
                !d(t, 'pieces') &&
                ((t.pieces = t.splitList), delete t.splitList);
              var e = t.pieces;
              e &&
                r.isArray(e) &&
                p(e, function (t) {
                  r.isObject(t) &&
                    (d(t, 'start') && !d(t, 'min') && (t.min = t.start),
                    d(t, 'end') && !d(t, 'max') && (t.max = t.end));
                });
            }
          }));
      }
      function d(t, e) {
        return t && t.hasOwnProperty && t.hasOwnProperty(e);
      }
      var f = !1;
      function g(t) {
        f ||
          ((f = !0),
          t.registerSubTypeDefaulter('visualMap', function (t) {
            return t.categories ||
              ((t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) && !t.calculable)
              ? 'piecewise'
              : 'continuous';
          }),
          t.registerAction(o, n),
          (0, r.each)(h, function (e) {
            t.registerVisual(t.PRIORITY.VISUAL.COMPONENT, e);
          }),
          t.registerPreprocessor(c));
      }
    },
    267113: (t, e, i) => {
      i.d(e, { a: () => P });
      var o = i(15215),
        n = i(498026),
        r = i(226192),
        a = i(624326),
        s = i(612616),
        l = [20, 140];
      function h(t, e, i) {
        if (i[0] === i[1]) return i.slice();
        for (var o = (i[1] - i[0]) / 200, n = i[0], r = [], a = 0; a <= 200 && n < i[1]; a++)
          (r.push(n), (n += o));
        return (r.push(i[1]), r);
      }
      const u = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return ((i.type = e.type), i);
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.optionUpdated = function (e, i) {
            (t.prototype.optionUpdated.apply(this, arguments),
              this.resetExtent(),
              this.resetVisual(function (t) {
                ((t.mappingMethod = 'linear'), (t.dataExtent = this.getExtent()));
              }),
              this._resetRange());
          }),
          (e.prototype.resetItemSize = function () {
            t.prototype.resetItemSize.apply(this, arguments);
            var e = this.itemSize;
            ((null == e[0] || isNaN(e[0])) && (e[0] = l[0]),
              (null == e[1] || isNaN(e[1])) && (e[1] = l[1]));
          }),
          (e.prototype._resetRange = function () {
            var t = this.getExtent(),
              e = this.option.range;
            !e || e.auto
              ? ((t.auto = 1), (this.option.range = t))
              : n.isArray(e) &&
                (e[0] > e[1] && e.reverse(),
                (e[0] = Math.max(e[0], t[0])),
                (e[1] = Math.min(e[1], t[1])));
          }),
          (e.prototype.completeVisualOption = function () {
            (t.prototype.completeVisualOption.apply(this, arguments),
              n.each(
                this.stateList,
                function (t) {
                  var e = this.option.controller[t].symbolSize;
                  e && e[0] !== e[1] && (e[0] = e[1] / 3);
                },
                this,
              ));
          }),
          (e.prototype.setSelected = function (t) {
            ((this.option.range = t.slice()), this._resetRange());
          }),
          (e.prototype.getSelected = function () {
            var t = this.getExtent(),
              e = a.Y6((this.get('range') || []).slice());
            return (
              e[0] > t[1] && (e[0] = t[1]),
              e[1] > t[1] && (e[1] = t[1]),
              e[0] < t[0] && (e[0] = t[0]),
              e[1] < t[0] && (e[1] = t[0]),
              e
            );
          }),
          (e.prototype.getValueState = function (t) {
            var e = this.option.range,
              i = this.getExtent();
            return (e[0] <= i[0] || e[0] <= t) && (e[1] >= i[1] || t <= e[1])
              ? 'inRange'
              : 'outOfRange';
          }),
          (e.prototype.findTargetDataIndices = function (t) {
            var e = [];
            return (
              this.eachTargetSeries(function (i) {
                var o = [],
                  n = i.getData();
                (n.each(
                  this.getDataDimensionIndex(n),
                  function (e, i) {
                    t[0] <= e && e <= t[1] && o.push(i);
                  },
                  this,
                ),
                  e.push({ seriesId: i.id, dataIndex: o }));
              }, this),
              e
            );
          }),
          (e.prototype.getVisualMeta = function (t) {
            var e = h(0, 0, this.getExtent()),
              i = h(0, 0, this.option.range.slice()),
              o = [];
            function n(e, i) {
              o.push({ value: e, color: t(e, i) });
            }
            for (
              var r = 0, a = 0, s = i.length, l = e.length;
              a < l && (!i.length || e[a] <= i[0]);
              a++
            )
              e[a] < i[r] && n(e[a], 'outOfRange');
            for (var u = 1; r < s; r++, u = 0)
              (u && o.length && n(i[r], 'outOfRange'), n(i[r], 'inRange'));
            for (u = 1; a < l; a++)
              (!i.length || i[i.length - 1] < e[a]) &&
                (u && (o.length && n(o[o.length - 1].value, 'outOfRange'), (u = 0)),
                n(e[a], 'outOfRange'));
            var p = o.length;
            return {
              stops: o,
              outerColors: [p ? o[0].color : 'transparent', p ? o[p - 1].color : 'transparent'],
            };
          }),
          (e.type = 'visualMap.continuous'),
          (e.defaultOption = (0, s.G_)(r.A.defaultOption, {
            align: 'auto',
            calculable: !1,
            hoverLink: !0,
            realtime: !0,
            handleIcon:
              'path://M-11.39,9.77h0a3.5,3.5,0,0,1-3.5,3.5h-22a3.5,3.5,0,0,1-3.5-3.5h0a3.5,3.5,0,0,1,3.5-3.5h22A3.5,3.5,0,0,1-11.39,9.77Z',
            handleSize: '120%',
            handleStyle: { borderColor: '#fff', borderWidth: 1 },
            indicatorIcon: 'circle',
            indicatorSize: '50%',
            indicatorStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              shadowBlur: 2,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              shadowColor: 'rgba(0,0,0,0.2)',
            },
          })),
          e
        );
      })(r.A);
      var p = i(229668),
        c = i(435452),
        d = i(559044),
        f = i(132322),
        g = i(843870),
        v = i(830010),
        m = i(543199),
        y = i(252505),
        x = i(898983),
        _ = i(46259),
        M = i(48170),
        b = i(945558),
        S = i(34833),
        w = i(62103),
        T = i(390540),
        C = i(669622),
        I = i(289632),
        A = i(747411),
        k = a.Cb,
        O = n.each,
        V = Math.min,
        L = Math.max;
      function D(t, e, i, o) {
        return new y.A({
          shape: { points: t },
          draggable: !!i,
          cursor: e,
          drift: i,
          onmousemove: function (t) {
            c.ds(t.event);
          },
          ondragend: o,
        });
      }
      function z(t) {
        return !!(t.get('hoverLinkOnHandle') ?? t.get('realtime'));
      }
      function H(t) {
        return 'vertical' === t ? 'ns-resize' : 'ew-resize';
      }
      const R = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return (
            (i.type = e.type),
            (i._shapes = {}),
            (i._dataInterval = []),
            (i._handleEnds = []),
            (i._hoverLinkDataIndices = []),
            i
          );
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.init = function (e, i) {
            (t.prototype.init.call(this, e, i),
              (this._hoverLinkFromSeriesMouseOver = n.bind(
                this._hoverLinkFromSeriesMouseOver,
                this,
              )),
              (this._hideIndicator = n.bind(this._hideIndicator, this)));
          }),
          (e.prototype.doRender = function (t, e, i, o) {
            (o && 'selectDataRange' === o.type && o.from === this.uid) || this._buildView();
          }),
          (e.prototype._buildView = function () {
            this.group.removeAll();
            var t = this.visualMapModel,
              e = this.group;
            ((this._orient = t.get('orient')),
              (this._useHandle = t.get('calculable')),
              this._resetInterval(),
              this._renderBar(e));
            var i = t.get('text');
            (this._renderEndsText(e, i, 0),
              this._renderEndsText(e, i, 1),
              this._updateView(!0),
              this.renderBackground(e),
              this._updateView(),
              this._enableHoverLinkToSeries(),
              this._enableHoverLinkFromSeries(),
              this.positionGroup(e));
          }),
          (e.prototype._renderEndsText = function (t, e, i) {
            if (e) {
              var o = e[1 - i];
              o = null != o ? o + '' : '';
              var n = this.visualMapModel,
                r = n.get('textGap'),
                a = n.itemSize,
                s = this._shapes.mainGroup,
                l = this._applyTransform([a[0] / 2, 0 === i ? -r : a[1] + r], s),
                h = this._applyTransform(0 === i ? 'bottom' : 'top', s),
                u = this._orient,
                p = this.visualMapModel.textStyleModel;
              this.group.add(
                new f.Ay({
                  style: (0, I.VB)(p, {
                    x: l[0],
                    y: l[1],
                    verticalAlign: 'horizontal' === u ? 'middle' : h,
                    align: 'horizontal' === u ? h : 'center',
                    text: o,
                  }),
                }),
              );
            }
          }),
          (e.prototype._renderBar = function (t) {
            var e = this.visualMapModel,
              i = this._shapes,
              o = e.itemSize,
              r = this._orient,
              a = this._useHandle,
              s = _.J(e, this.api, o),
              l = (i.mainGroup = this._createBarGroup(s)),
              h = new g.A();
            (l.add(h),
              h.add((i.outOfRange = D())),
              h.add(
                (i.inRange = D(
                  null,
                  a ? H(this._orient) : null,
                  n.bind(this._dragHandle, this, 'all', !1),
                  n.bind(this._dragHandle, this, 'all', !0),
                )),
              ),
              h.setClipPath(new v.A({ shape: { x: 0, y: 0, width: o[0], height: o[1], r: 3 } })));
            var u = e.textStyleModel.getTextRect('国'),
              p = L(u.width, u.height);
            (a &&
              ((i.handleThumbs = []),
              (i.handleLabels = []),
              (i.handleLabelPoints = []),
              this._createHandle(e, l, 0, o, p, r),
              this._createHandle(e, l, 1, o, p, r)),
              this._createIndicator(e, l, o, p, r),
              t.add(l));
          }),
          (e.prototype._createHandle = function (t, e, i, o, r, a) {
            var s = n.bind(this._dragHandle, this, i, !1),
              l = n.bind(this._dragHandle, this, i, !0),
              h = (0, b.lo)(t.get('handleSize'), o[0]),
              u = (0, w.v5)(t.get('handleIcon'), -h / 2, -h / 2, h, h, null, !0),
              p = H(this._orient);
            (u.attr({
              cursor: p,
              draggable: !0,
              drift: s,
              ondragend: l,
              onmousemove: function (t) {
                c.ds(t.event);
              },
            }),
              (u.x = o[0] / 2),
              u.useStyle(t.getModel('handleStyle').getItemStyle()),
              u.setStyle({ strokeNoScale: !0, strokeFirst: !0 }),
              (u.style.lineWidth *= 2),
              (u.ensureState('emphasis').style = t
                .getModel(['emphasis', 'handleStyle'])
                .getItemStyle()),
              (0, S.ix)(u, !0),
              e.add(u));
            var d = this.visualMapModel.textStyleModel,
              g = new f.Ay({
                cursor: p,
                draggable: !0,
                drift: s,
                onmousemove: function (t) {
                  c.ds(t.event);
                },
                ondragend: l,
                style: (0, I.VB)(d, { x: 0, y: 0, text: '' }),
              });
            ((g.ensureState('blur').style = { opacity: 0.1 }),
              (g.stateTransition = { duration: 200 }),
              this.group.add(g));
            var v = [h, 0],
              m = this._shapes;
            ((m.handleThumbs[i] = u), (m.handleLabelPoints[i] = v), (m.handleLabels[i] = g));
          }),
          (e.prototype._createIndicator = function (t, e, i, o, r) {
            var a = (0, b.lo)(t.get('indicatorSize'), i[0]),
              s = (0, w.v5)(t.get('indicatorIcon'), -a / 2, -a / 2, a, a, null, !0);
            s.attr({ cursor: 'move', invisible: !0, silent: !0, x: i[0] / 2 });
            var l = t.getModel('indicatorStyle').getItemStyle();
            if (s instanceof T.Ay) {
              var h = s.style;
              s.useStyle(
                n.extend({ image: h.image, x: h.x, y: h.y, width: h.width, height: h.height }, l),
              );
            } else s.useStyle(l);
            e.add(s);
            var u = this.visualMapModel.textStyleModel,
              p = new f.Ay({
                silent: !0,
                invisible: !0,
                style: (0, I.VB)(u, { x: 0, y: 0, text: '' }),
              });
            this.group.add(p);
            var c = [('horizontal' === r ? o / 2 : 6) + i[0] / 2, 0],
              d = this._shapes;
            ((d.indicator = s),
              (d.indicatorLabel = p),
              (d.indicatorLabelPoint = c),
              (this._firstShowIndicator = !0));
          }),
          (e.prototype._dragHandle = function (t, e, i, o) {
            if (this._useHandle) {
              if (((this._dragging = !e), !e)) {
                var n = this._applyTransform([i, o], this._shapes.mainGroup, !0);
                (this._updateInterval(t, n[1]), this._hideIndicator(), this._updateView());
              }
              (e === !this.visualMapModel.get('realtime') &&
                this.api.dispatchAction({
                  type: 'selectDataRange',
                  from: this.uid,
                  visualMapId: this.visualMapModel.id,
                  selected: this._dataInterval.slice(),
                }),
                e
                  ? !this._hovering && this._clearHoverLinkToSeries()
                  : z(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[t], !1));
            }
          }),
          (e.prototype._resetInterval = function () {
            var t = this.visualMapModel,
              e = (this._dataInterval = t.getSelected()),
              i = t.getExtent(),
              o = [0, t.itemSize[1]];
            this._handleEnds = [k(e[0], i, o, !0), k(e[1], i, o, !0)];
          }),
          (e.prototype._updateInterval = function (t, e) {
            e = e || 0;
            var i = this.visualMapModel,
              o = this._handleEnds,
              n = [0, i.itemSize[1]];
            (0, x.A)(e, o, n, t, 0);
            var r = i.getExtent();
            this._dataInterval = [k(o[0], n, r, !0), k(o[1], n, r, !0)];
          }),
          (e.prototype._updateView = function (t) {
            var e = this.visualMapModel,
              i = e.getExtent(),
              o = this._shapes,
              n = [0, e.itemSize[1]],
              r = t ? n : this._handleEnds,
              a = this._createBarVisual(this._dataInterval, i, r, 'inRange'),
              s = this._createBarVisual(i, i, n, 'outOfRange');
            (o.inRange.setStyle({ fill: a.barColor }).setShape('points', a.barPoints),
              o.outOfRange.setStyle({ fill: s.barColor }).setShape('points', s.barPoints),
              this._updateHandle(r, a));
          }),
          (e.prototype._createBarVisual = function (t, e, i, o) {
            var n = { forceState: o, convertOpacityToAlpha: !0 },
              r = this._makeColorGradient(t, n),
              a = [
                this.getControllerVisual(t[0], 'symbolSize', n),
                this.getControllerVisual(t[1], 'symbolSize', n),
              ],
              s = this._createBarPoints(i, a);
            return {
              barColor: new p.A(0, 0, 0, 1, r),
              barPoints: s,
              handlesColor: [r[0].color, r[r.length - 1].color],
            };
          }),
          (e.prototype._makeColorGradient = function (t, e) {
            var i = [],
              o = (t[1] - t[0]) / 100;
            i.push({ color: this.getControllerVisual(t[0], 'color', e), offset: 0 });
            for (var n = 1; n < 100; n++) {
              var r = t[0] + o * n;
              if (r > t[1]) break;
              i.push({ color: this.getControllerVisual(r, 'color', e), offset: n / 100 });
            }
            return (i.push({ color: this.getControllerVisual(t[1], 'color', e), offset: 1 }), i);
          }),
          (e.prototype._createBarPoints = function (t, e) {
            var i = this.visualMapModel.itemSize;
            return [
              [i[0] - e[0], t[0]],
              [i[0], t[0]],
              [i[0], t[1]],
              [i[0] - e[1], t[1]],
            ];
          }),
          (e.prototype._createBarGroup = function (t) {
            var e = this._orient,
              i = this.visualMapModel.get('inverse');
            return new g.A(
              'horizontal' !== e || i
                ? 'horizontal' === e && i
                  ? { scaleX: 'bottom' === t ? -1 : 1, rotation: -Math.PI / 2 }
                  : 'vertical' !== e || i
                    ? { scaleX: 'left' === t ? 1 : -1 }
                    : { scaleX: 'left' === t ? 1 : -1, scaleY: -1 }
                : { scaleX: 'bottom' === t ? 1 : -1, rotation: Math.PI / 2 },
            );
          }),
          (e.prototype._updateHandle = function (t, e) {
            if (this._useHandle) {
              var i = this._shapes,
                o = this.visualMapModel,
                n = i.handleThumbs,
                r = i.handleLabels,
                a = o.itemSize,
                s = o.getExtent(),
                l = this._applyTransform('left', i.mainGroup);
              O(
                [0, 1],
                function (h) {
                  var u = n[h];
                  (u.setStyle('fill', e.handlesColor[h]), (u.y = t[h]));
                  var p = k(t[h], [0, a[1]], s, !0),
                    c = this.getControllerVisual(p, 'symbolSize');
                  ((u.scaleX = u.scaleY = c / a[0]), (u.x = a[0] - c / 2));
                  var d = m.applyTransform(i.handleLabelPoints[h], m.getTransform(u, this.group));
                  if ('horizontal' === this._orient) {
                    var f = 'left' === l || 'top' === l ? (a[0] - c) / 2 : (a[0] - c) / -2;
                    d[1] += f;
                  }
                  r[h].setStyle({
                    x: d[0],
                    y: d[1],
                    text: o.formatValueText(this._dataInterval[h]),
                    verticalAlign: 'middle',
                    align:
                      'vertical' === this._orient
                        ? this._applyTransform('left', i.mainGroup)
                        : 'center',
                  });
                },
                this,
              );
            }
          }),
          (e.prototype._showIndicator = function (t, e, i, o) {
            var n = this.visualMapModel,
              r = n.getExtent(),
              a = n.itemSize,
              s = [0, a[1]],
              l = this._shapes,
              h = l.indicator;
            if (h) {
              h.attr('invisible', !1);
              var u = this.getControllerVisual(t, 'color', { convertOpacityToAlpha: !0 }),
                p = this.getControllerVisual(t, 'symbolSize'),
                c = k(t, r, s, !0),
                d = a[0] - p / 2,
                f = { x: h.x, y: h.y };
              ((h.y = c), (h.x = d));
              var g = m.applyTransform(l.indicatorLabelPoint, m.getTransform(h, this.group)),
                v = l.indicatorLabel;
              v.attr('invisible', !1);
              var y = this._applyTransform('left', l.mainGroup),
                x = 'horizontal' === this._orient;
              v.setStyle({
                text: (i || '') + n.formatValueText(e),
                verticalAlign: x ? y : 'middle',
                align: x ? 'center' : y,
              });
              var _ = { x: d, y: c, style: { fill: u } },
                M = { style: { x: g[0], y: g[1] } };
              if (n.ecModel.isAnimationEnabled() && !this._firstShowIndicator) {
                var b = { duration: 100, easing: 'cubicInOut', additive: !0 };
                ((h.x = f.x), (h.y = f.y), h.animateTo(_, b), v.animateTo(M, b));
              } else (h.attr(_), v.attr(M));
              this._firstShowIndicator = !1;
              var S = this._shapes.handleLabels;
              if (S) for (var w = 0; w < S.length; w++) this.api.enterBlur(S[w]);
            }
          }),
          (e.prototype._enableHoverLinkToSeries = function () {
            var t = this;
            this._shapes.mainGroup
              .on('mousemove', function (e) {
                if (((t._hovering = !0), !t._dragging)) {
                  var i = t.visualMapModel.itemSize,
                    o = t._applyTransform([e.offsetX, e.offsetY], t._shapes.mainGroup, !0, !0);
                  ((o[1] = V(L(0, o[1]), i[1])),
                    t._doHoverLinkToSeries(o[1], 0 <= o[0] && o[0] <= i[0]));
                }
              })
              .on('mouseout', function () {
                ((t._hovering = !1), !t._dragging && t._clearHoverLinkToSeries());
              });
          }),
          (e.prototype._enableHoverLinkFromSeries = function () {
            var t = this.api.getZr();
            this.visualMapModel.option.hoverLink
              ? (t.on('mouseover', this._hoverLinkFromSeriesMouseOver, this),
                t.on('mouseout', this._hideIndicator, this))
              : this._clearHoverLinkFromSeries();
          }),
          (e.prototype._doHoverLinkToSeries = function (t, e) {
            var i = this.visualMapModel,
              o = i.itemSize;
            if (i.option.hoverLink) {
              var n = [0, o[1]],
                r = i.getExtent();
              t = V(L(n[0], t), n[1]);
              var a = (function (t, e, i) {
                  var o = 6,
                    n = t.get('hoverLinkDataSize');
                  return (n && (o = k(n, e, i, !0) / 2), o);
                })(i, r, n),
                s = [t - a, t + a],
                l = k(t, n, r, !0),
                h = [k(s[0], n, r, !0), k(s[1], n, r, !0)];
              (s[0] < n[0] && (h[0] = -1 / 0),
                s[1] > n[1] && (h[1] = 1 / 0),
                e &&
                  (h[0] === -1 / 0
                    ? this._showIndicator(l, h[1], '< ', a)
                    : h[1] === 1 / 0
                      ? this._showIndicator(l, h[0], '> ', a)
                      : this._showIndicator(l, l, '≈ ', a)));
              var u = this._hoverLinkDataIndices,
                p = [];
              (e || z(i)) && (p = this._hoverLinkDataIndices = i.findTargetDataIndices(h));
              var c = M.D6(u, p);
              (this._dispatchHighDown('downplay', _.l(c[0], i)),
                this._dispatchHighDown('highlight', _.l(c[1], i)));
            }
          }),
          (e.prototype._hoverLinkFromSeriesMouseOver = function (t) {
            var e;
            if (
              ((0, A.R)(
                t.target,
                function (t) {
                  var i = (0, C.z)(t);
                  if (null != i.dataIndex) return ((e = i), !0);
                },
                !0,
              ),
              e)
            ) {
              var i = this.ecModel.getSeriesByIndex(e.seriesIndex),
                o = this.visualMapModel;
              if (o.isTargetSeries(i)) {
                var n = i.getData(e.dataType),
                  r = n.getStore().get(o.getDataDimensionIndex(n), e.dataIndex);
                isNaN(r) || this._showIndicator(r, r);
              }
            }
          }),
          (e.prototype._hideIndicator = function () {
            var t = this._shapes;
            (t.indicator && t.indicator.attr('invisible', !0),
              t.indicatorLabel && t.indicatorLabel.attr('invisible', !0));
            var e = this._shapes.handleLabels;
            if (e) for (var i = 0; i < e.length; i++) this.api.leaveBlur(e[i]);
          }),
          (e.prototype._clearHoverLinkToSeries = function () {
            this._hideIndicator();
            var t = this._hoverLinkDataIndices;
            (this._dispatchHighDown('downplay', _.l(t, this.visualMapModel)), (t.length = 0));
          }),
          (e.prototype._clearHoverLinkFromSeries = function () {
            this._hideIndicator();
            var t = this.api.getZr();
            (t.off('mouseover', this._hoverLinkFromSeriesMouseOver),
              t.off('mouseout', this._hideIndicator));
          }),
          (e.prototype._applyTransform = function (t, e, i, o) {
            var r = m.getTransform(e, o ? null : this.group);
            return n.isArray(t) ? m.applyTransform(t, r, i) : m.transformDirection(t, r, i);
          }),
          (e.prototype._dispatchHighDown = function (t, e) {
            e && e.length && this.api.dispatchAction({ type: t, batch: e });
          }),
          (e.prototype.dispose = function () {
            (this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries());
          }),
          (e.type = 'visualMap.continuous'),
          e
        );
      })(d.A);
      var B = i(841369);
      function P(t) {
        (t.registerComponentModel(u), t.registerComponentView(R), (0, B.A)(t));
      }
    },
    468781: (t, e, i) => {
      i.d(e, { a: () => S });
      var o = i(15215),
        n = i(498026),
        r = i(226192),
        a = i(907857),
        s = i(54942),
        l = i(624326),
        h = i(612616),
        u = (function (t) {
          function e() {
            var i = (null !== t && t.apply(this, arguments)) || this;
            return ((i.type = e.type), (i._pieceList = []), i);
          }
          return (
            (0, o.__extends)(e, t),
            (e.prototype.optionUpdated = function (e, i) {
              (t.prototype.optionUpdated.apply(this, arguments), this.resetExtent());
              var o = (this._mode = this._determineMode());
              ((this._pieceList = []),
                p[this._mode].call(this, this._pieceList),
                this._resetSelected(e, i));
              var r = this.option.categories;
              this.resetVisual(function (t, e) {
                'categories' === o
                  ? ((t.mappingMethod = 'category'), (t.categories = n.clone(r)))
                  : ((t.dataExtent = this.getExtent()),
                    (t.mappingMethod = 'piecewise'),
                    (t.pieceList = n.map(this._pieceList, function (t) {
                      return ((t = n.clone(t)), 'inRange' !== e && (t.visual = null), t);
                    })));
              });
            }),
            (e.prototype.completeVisualOption = function () {
              var e = this.option,
                i = {},
                o = a.A.listVisualTypes(),
                r = this.isCategory();
              function l(t, e, i) {
                return t && t[e] && t[e].hasOwnProperty(i);
              }
              (n.each(e.pieces, function (t) {
                n.each(o, function (e) {
                  t.hasOwnProperty(e) && (i[e] = 1);
                });
              }),
                n.each(
                  i,
                  function (t, i) {
                    var o = !1;
                    (n.each(
                      this.stateList,
                      function (t) {
                        o = o || l(e, t, i) || l(e.target, t, i);
                      },
                      this,
                    ),
                      !o &&
                        n.each(this.stateList, function (t) {
                          (e[t] || (e[t] = {}))[i] = s.A.get(
                            i,
                            'inRange' === t ? 'active' : 'inactive',
                            r,
                          );
                        }));
                  },
                  this,
                ),
                t.prototype.completeVisualOption.apply(this, arguments));
            }),
            (e.prototype._resetSelected = function (t, e) {
              var i = this.option,
                o = this._pieceList,
                r = (e ? i : t).selected || {};
              if (
                ((i.selected = r),
                n.each(
                  o,
                  function (t, e) {
                    var i = this.getSelectedMapKey(t);
                    r.hasOwnProperty(i) || (r[i] = !0);
                  },
                  this,
                ),
                'single' === i.selectedMode)
              ) {
                var a = !1;
                n.each(
                  o,
                  function (t, e) {
                    var i = this.getSelectedMapKey(t);
                    r[i] && (a ? (r[i] = !1) : (a = !0));
                  },
                  this,
                );
              }
            }),
            (e.prototype.getItemSymbol = function () {
              return this.get('itemSymbol');
            }),
            (e.prototype.getSelectedMapKey = function (t) {
              return 'categories' === this._mode ? t.value + '' : t.index + '';
            }),
            (e.prototype.getPieceList = function () {
              return this._pieceList;
            }),
            (e.prototype._determineMode = function () {
              var t = this.option;
              return t.pieces && t.pieces.length > 0
                ? 'pieces'
                : this.option.categories
                  ? 'categories'
                  : 'splitNumber';
            }),
            (e.prototype.setSelected = function (t) {
              this.option.selected = n.clone(t);
            }),
            (e.prototype.getValueState = function (t) {
              var e = a.A.findPieceIndex(t, this._pieceList);
              return null != e && this.option.selected[this.getSelectedMapKey(this._pieceList[e])]
                ? 'inRange'
                : 'outOfRange';
            }),
            (e.prototype.findTargetDataIndices = function (t) {
              var e = [],
                i = this._pieceList;
              return (
                this.eachTargetSeries(function (o) {
                  var n = [],
                    r = o.getData();
                  (r.each(
                    this.getDataDimensionIndex(r),
                    function (e, o) {
                      a.A.findPieceIndex(e, i) === t && n.push(o);
                    },
                    this,
                  ),
                    e.push({ seriesId: o.id, dataIndex: n }));
                }, this),
                e
              );
            }),
            (e.prototype.getRepresentValue = function (t) {
              var e;
              if (this.isCategory()) e = t.value;
              else if (null != t.value) e = t.value;
              else {
                var i = t.interval || [];
                e = i[0] === -1 / 0 && i[1] === 1 / 0 ? 0 : (i[0] + i[1]) / 2;
              }
              return e;
            }),
            (e.prototype.getVisualMeta = function (t) {
              if (!this.isCategory()) {
                var e = [],
                  i = ['', ''],
                  o = this,
                  r = this._pieceList.slice();
                if (r.length) {
                  var a = r[0].interval[0];
                  (a !== -1 / 0 && r.unshift({ interval: [-1 / 0, a] }),
                    (a = r[r.length - 1].interval[1]) !== 1 / 0 &&
                      r.push({ interval: [a, 1 / 0] }));
                } else r.push({ interval: [-1 / 0, 1 / 0] });
                var s = -1 / 0;
                return (
                  n.each(
                    r,
                    function (t) {
                      var e = t.interval;
                      e && (e[0] > s && l([s, e[0]], 'outOfRange'), l(e.slice()), (s = e[1]));
                    },
                    this,
                  ),
                  { stops: e, outerColors: i }
                );
              }
              function l(n, r) {
                var a = o.getRepresentValue({ interval: n });
                r || (r = o.getValueState(a));
                var s = t(a, r);
                n[0] === -1 / 0
                  ? (i[0] = s)
                  : n[1] === 1 / 0
                    ? (i[1] = s)
                    : e.push({ value: n[0], color: s }, { value: n[1], color: s });
              }
            }),
            (e.type = 'visualMap.piecewise'),
            (e.defaultOption = (0, h.G_)(r.A.defaultOption, {
              selected: null,
              minOpen: !1,
              maxOpen: !1,
              align: 'auto',
              itemWidth: 20,
              itemHeight: 14,
              itemSymbol: 'roundRect',
              pieces: null,
              categories: null,
              splitNumber: 5,
              selectedMode: 'multiple',
              itemGap: 10,
              hoverLink: !0,
            })),
            e
          );
        })(r.A),
        p = {
          splitNumber: function (t) {
            var e = this.option,
              i = Math.min(e.precision, 20),
              o = this.getExtent(),
              r = e.splitNumber;
            ((r = Math.max(parseInt(r, 10), 1)), (e.splitNumber = r));
            for (var a = (o[1] - o[0]) / r; +a.toFixed(i) !== a && i < 5;) i++;
            ((e.precision = i),
              (a = +a.toFixed(i)),
              e.minOpen && t.push({ interval: [-1 / 0, o[0]], close: [0, 0] }));
            for (var s = 0, h = o[0]; s < r; h += a, s++) {
              var u = s === r - 1 ? o[1] : h + a;
              t.push({ interval: [h, u], close: [1, 1] });
            }
            (e.maxOpen && t.push({ interval: [o[1], 1 / 0], close: [0, 0] }),
              (0, l.sL)(t),
              n.each(
                t,
                function (t, e) {
                  ((t.index = e), (t.text = this.formatValueText(t.interval)));
                },
                this,
              ));
          },
          categories: function (t) {
            var e = this.option;
            (n.each(
              e.categories,
              function (e) {
                t.push({ text: this.formatValueText(e, !0), value: e });
              },
              this,
            ),
              c(e, t));
          },
          pieces: function (t) {
            var e = this.option;
            (n.each(
              e.pieces,
              function (e, i) {
                n.isObject(e) || (e = { value: e });
                var o = { text: '', index: i };
                if ((null != e.label && (o.text = e.label), e.hasOwnProperty('value'))) {
                  var r = (o.value = e.value);
                  ((o.interval = [r, r]), (o.close = [1, 1]));
                } else {
                  for (
                    var s = (o.interval = []),
                      l = (o.close = [0, 0]),
                      h = [1, 0, 1],
                      u = [-1 / 0, 1 / 0],
                      p = [],
                      c = 0;
                    c < 2;
                    c++
                  ) {
                    for (
                      var d = [
                          ['gte', 'gt', 'min'],
                          ['lte', 'lt', 'max'],
                        ][c],
                        f = 0;
                      f < 3 && null == s[c];
                      f++
                    )
                      ((s[c] = e[d[f]]), (l[c] = h[f]), (p[c] = 2 === f));
                    null == s[c] && (s[c] = u[c]);
                  }
                  (p[0] && s[1] === 1 / 0 && (l[0] = 0),
                    p[1] && s[0] === -1 / 0 && (l[1] = 0),
                    s[0] === s[1] && l[0] && l[1] && (o.value = s[0]));
                }
                ((o.visual = a.A.retrieveVisuals(e)), t.push(o));
              },
              this,
            ),
              c(e, t),
              (0, l.sL)(t),
              n.each(
                t,
                function (t) {
                  var e = t.close,
                    i = [['<', '≤'][e[1]], ['>', '≥'][e[0]]];
                  t.text =
                    t.text || this.formatValueText(null != t.value ? t.value : t.interval, !1, i);
                },
                this,
              ));
          },
        };
      function c(t, e) {
        var i = t.inverse;
        ('vertical' === t.orient ? !i : i) && e.reverse();
      }
      const d = u;
      var f = i(559044),
        g = i(843870),
        v = i(132322),
        m = i(62103),
        y = i(834253),
        x = i(46259),
        _ = i(289632);
      const M = (function (t) {
        function e() {
          var i = (null !== t && t.apply(this, arguments)) || this;
          return ((i.type = e.type), i);
        }
        return (
          (0, o.__extends)(e, t),
          (e.prototype.doRender = function () {
            var t = this.group;
            t.removeAll();
            var e = this.visualMapModel,
              i = e.get('textGap'),
              o = e.textStyleModel,
              r = o.getFont(),
              a = o.getTextColor(),
              s = this._getItemAlign(),
              l = e.itemSize,
              h = this._getViewData(),
              u = h.endsText,
              p = n.retrieve(e.get('showLabel', !0), !u),
              c = !e.get('selectedMode');
            (u && this._renderEndsText(t, u[0], l, p, s),
              n.each(
                h.viewPieceList,
                function (o) {
                  var h = o.piece,
                    u = new g.A();
                  ((u.onclick = n.bind(this._onItemClick, this, h)),
                    this._enableHoverLink(u, o.indexInModelPieceList));
                  var d = e.getRepresentValue(h);
                  if ((this._createItemSymbol(u, d, [0, 0, l[0], l[1]], c), p)) {
                    var f = this.visualMapModel.getValueState(d);
                    u.add(
                      new v.Ay({
                        style: {
                          x: 'right' === s ? -i : l[0] + i,
                          y: l[1] / 2,
                          text: h.text,
                          verticalAlign: 'middle',
                          align: s,
                          font: r,
                          fill: a,
                          opacity: 'outOfRange' === f ? 0.5 : 1,
                        },
                        silent: c,
                      }),
                    );
                  }
                  t.add(u);
                },
                this,
              ),
              u && this._renderEndsText(t, u[1], l, p, s),
              y.aP(e.get('orient'), t, e.get('itemGap')),
              this.renderBackground(t),
              this.positionGroup(t));
          }),
          (e.prototype._enableHoverLink = function (t, e) {
            var i = this;
            t.on('mouseover', function () {
              return o('highlight');
            }).on('mouseout', function () {
              return o('downplay');
            });
            var o = function (t) {
              var o = i.visualMapModel;
              o.option.hoverLink &&
                i.api.dispatchAction({ type: t, batch: x.l(o.findTargetDataIndices(e), o) });
            };
          }),
          (e.prototype._getItemAlign = function () {
            var t = this.visualMapModel,
              e = t.option;
            if ('vertical' === e.orient) return x.J(t, this.api, t.itemSize);
            var i = e.align;
            return ((i && 'auto' !== i) || (i = 'left'), i);
          }),
          (e.prototype._renderEndsText = function (t, e, i, o, n) {
            if (e) {
              var r = new g.A(),
                a = this.visualMapModel.textStyleModel;
              (r.add(
                new v.Ay({
                  style: (0, _.VB)(a, {
                    x: o ? ('right' === n ? i[0] : 0) : i[0] / 2,
                    y: i[1] / 2,
                    verticalAlign: 'middle',
                    align: o ? n : 'center',
                    text: e,
                  }),
                }),
              ),
                t.add(r));
            }
          }),
          (e.prototype._getViewData = function () {
            var t = this.visualMapModel,
              e = n.map(t.getPieceList(), function (t, e) {
                return { piece: t, indexInModelPieceList: e };
              }),
              i = t.get('text'),
              o = t.get('orient'),
              r = t.get('inverse');
            return (
              ('horizontal' === o ? r : !r) ? e.reverse() : i && (i = i.slice().reverse()),
              { viewPieceList: e, endsText: i }
            );
          }),
          (e.prototype._createItemSymbol = function (t, e, i, o) {
            var n = (0, m.v5)(
              this.getControllerVisual(e, 'symbol'),
              i[0],
              i[1],
              i[2],
              i[3],
              this.getControllerVisual(e, 'color'),
            );
            ((n.silent = o), t.add(n));
          }),
          (e.prototype._onItemClick = function (t) {
            var e = this.visualMapModel,
              i = e.option,
              o = i.selectedMode;
            if (o) {
              var r = n.clone(i.selected),
                a = e.getSelectedMapKey(t);
              ('single' === o || !0 === o
                ? ((r[a] = !0),
                  n.each(r, function (t, e) {
                    r[e] = e === a;
                  }))
                : (r[a] = !r[a]),
                this.api.dispatchAction({
                  type: 'selectDataRange',
                  from: this.uid,
                  visualMapId: this.visualMapModel.id,
                  selected: r,
                }));
            }
          }),
          (e.type = 'visualMap.piecewise'),
          e
        );
      })(f.A);
      var b = i(841369);
      function S(t) {
        (t.registerComponentModel(d), t.registerComponentView(M), (0, b.A)(t));
      }
    },
  },
]);
