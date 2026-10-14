'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [3593],
  {
    96895: (e, n, o) => {
      var t = c(o(826287)),
        r = c(o(440961)),
        a = c(o(201583));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i = (0, t.default)({
          resolved: {},
          chunkName: function () {
            return 'TextbookRecommendTextbookSideBox-entry';
          },
          isReady: function (e) {
            var n = this.resolve(e);
            return !0 === this.resolved[n] && !!o.m[n];
          },
          importAsync: function () {
            return Promise.all([o.e(77593), o.e(82294)]).then(o.bind(o, 768887));
          },
          requireAsync: function (e) {
            var n = this,
              o = this.resolve(e);
            return (
              (this.resolved[o] = !1),
              this.importAsync(e).then(function (e) {
                return ((n.resolved[o] = !0), e);
              })
            );
          },
          requireSync: function (e) {
            var n = this.resolve(e);
            return o(n);
          },
          resolve: function () {
            return 768887;
          },
        }),
        u = null,
        d = 'TextbookRecommendTextbookSideBox';
      try {
        u = reactComponentLoadBootstrap.getChunkContainer(d);
      } catch (e) {
        console.log(e);
      }
      var l = function (e) {
        var n,
          o,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : document.getElementById('app'),
          c = arguments.length > 3 ? arguments[3] : void 0,
          i =
            null !==
              (n =
                null != c
                  ? c
                  : null === (o = window.reactComponentLoadBootstrap) || void 0 === o
                    ? void 0
                    : o.reactComponentLoadGet()) && void 0 !== n
              ? n
              : {};
        (0, a.default)(e, t, r, i);
      };
      (window.renderReactComponent ||
        (window.renderReactComponent = { render: a.default, ReactDOM: r.default }),
        (window.renderReactComponent[d] = {
          component: i,
          container: u,
          render: l,
          renderFunc: function () {
            return l(i, {}, u);
          },
        }));
      try {
        var s = reactComponentLoadBootstrap.getChunkLoadPromise()[d].resolve;
        s && s();
      } catch (e) {}
    },
  },
  (e) => {
    (e.O(
      0,
      [
        561, 67549, 78441, 52891, 96316, 28856, 39867, 62323, 57989, 40384, 1639, 25528, 56296,
        28905, 75365, 61157, 85975, 54726, 84112, 4309, 15452, 58324, 14491, 46124,
      ],
      () => e((e.s = 96895)),
    ),
      e.O());
  },
]);
