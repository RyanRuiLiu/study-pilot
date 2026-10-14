'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [52891],
  {
    918286: (e, t, n) => {
      n.d(t, { A: () => ee });
      var i = n(58168),
        r = n(489379),
        o = n(23029),
        l = n(92901),
        s = n(109417),
        a = n(885501),
        d = n(329426),
        c = n(364467),
        u = n(296540),
        p = n(282284),
        f = n(180045);
      const h = {
        animating: !1,
        autoplaying: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        dragging: !1,
        edgeDragged: !1,
        initialized: !1,
        lazyLoadedList: [],
        listHeight: null,
        listWidth: null,
        scrolling: !1,
        slideCount: null,
        slideHeight: null,
        slideWidth: null,
        swipeLeft: null,
        swiped: !1,
        swiping: !1,
        touchObject: { startX: 0, startY: 0, curX: 0, curY: 0 },
        trackStyle: {},
        trackWidth: 0,
        targetSlide: 0,
      };
      var v = n(473700),
        S = n(246942),
        g = n.n(S);
      function A(e, t, n) {
        return Math.max(t, Math.min(e, n));
      }
      var y = function (e) {
          ['onTouchStart', 'onTouchMove', 'onWheel'].includes(e._reactName) || e.preventDefault();
        },
        k = function (e) {
          for (var t = [], n = m(e), i = w(e), r = n; r < i; r++)
            e.lazyLoadedList.indexOf(r) < 0 && t.push(r);
          return t;
        },
        m = function (e) {
          return e.currentSlide - T(e);
        },
        w = function (e) {
          return e.currentSlide + L(e);
        },
        T = function (e) {
          return e.centerMode
            ? Math.floor(e.slidesToShow / 2) + (parseInt(e.centerPadding) > 0 ? 1 : 0)
            : 0;
        },
        L = function (e) {
          return e.centerMode
            ? Math.floor((e.slidesToShow - 1) / 2) + 1 + (parseInt(e.centerPadding) > 0 ? 1 : 0)
            : e.slidesToShow;
        },
        b = function (e) {
          return (e && e.offsetWidth) || 0;
        },
        C = function (e) {
          return (e && e.offsetHeight) || 0;
        },
        x = function (e) {
          var t,
            n,
            i,
            r,
            o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          return (
            (t = e.startX - e.curX),
            (n = e.startY - e.curY),
            (i = Math.atan2(n, t)),
            (r = Math.round((180 * i) / Math.PI)) < 0 && (r = 360 - Math.abs(r)),
            (r <= 45 && r >= 0) || (r <= 360 && r >= 315)
              ? 'left'
              : r >= 135 && r <= 225
                ? 'right'
                : !0 === o
                  ? r >= 35 && r <= 135
                    ? 'up'
                    : 'down'
                  : 'vertical'
          );
        },
        E = function (e) {
          var t = !0;
          return (
            e.infinite ||
              (((e.centerMode && e.currentSlide >= e.slideCount - 1) ||
                e.slideCount <= e.slidesToShow ||
                e.currentSlide >= e.slideCount - e.slidesToShow) &&
                (t = !1)),
            t
          );
        },
        M = function (e, t) {
          var n = {};
          return (
            t.forEach(function (t) {
              return (n[t] = e[t]);
            }),
            n
          );
        },
        z = function (e, t) {
          var n = (function (e) {
              for (
                var t = e.infinite ? 2 * e.slideCount : e.slideCount,
                  n = e.infinite ? -1 * e.slidesToShow : 0,
                  i = e.infinite ? -1 * e.slidesToShow : 0,
                  r = [];
                n < t;
              )
                (r.push(n),
                  (n = i + e.slidesToScroll),
                  (i += Math.min(e.slidesToScroll, e.slidesToShow)));
              return r;
            })(e),
            i = 0;
          if (t > n[n.length - 1]) t = n[n.length - 1];
          else
            for (var r in n) {
              if (t < n[r]) {
                t = i;
                break;
              }
              i = n[r];
            }
          return t;
        },
        H = function (e) {
          var t = e.centerMode ? e.slideWidth * Math.floor(e.slidesToShow / 2) : 0;
          if (e.swipeToSlide) {
            var n,
              i = e.listRef,
              r = (i.querySelectorAll && i.querySelectorAll('.slick-slide')) || [];
            if (
              (Array.from(r).every(function (i) {
                if (e.vertical) {
                  if (i.offsetTop + C(i) / 2 > -1 * e.swipeLeft) return ((n = i), !1);
                } else if (i.offsetLeft - t + b(i) / 2 > -1 * e.swipeLeft) return ((n = i), !1);
                return !0;
              }),
              !n)
            )
              return 0;
            var o = !0 === e.rtl ? e.slideCount - e.currentSlide : e.currentSlide;
            return Math.abs(n.dataset.index - o) || 1;
          }
          return e.slidesToScroll;
        },
        W = function (e, t) {
          return t.reduce(function (t, n) {
            return t && e.hasOwnProperty(n);
          }, !0)
            ? null
            : console.error('Keys Missing:', e);
        },
        R = function (e) {
          var t, n;
          W(e, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);
          var i = e.slideCount + 2 * e.slidesToShow;
          e.vertical ? (n = i * e.slideHeight) : (t = D(e) * e.slideWidth);
          var o = { opacity: 1, transition: '', WebkitTransition: '' };
          if (e.useTransform) {
            var l = e.vertical
                ? 'translate3d(0px, ' + e.left + 'px, 0px)'
                : 'translate3d(' + e.left + 'px, 0px, 0px)',
              s = e.vertical
                ? 'translate3d(0px, ' + e.left + 'px, 0px)'
                : 'translate3d(' + e.left + 'px, 0px, 0px)',
              a = e.vertical ? 'translateY(' + e.left + 'px)' : 'translateX(' + e.left + 'px)';
            o = (0, r.A)((0, r.A)({}, o), {}, { WebkitTransform: l, transform: s, msTransform: a });
          } else e.vertical ? (o.top = e.left) : (o.left = e.left);
          return (
            e.fade && (o = { opacity: 1 }),
            t && (o.width = t),
            n && (o.height = n),
            window &&
              !window.addEventListener &&
              window.attachEvent &&
              (e.vertical ? (o.marginTop = e.left + 'px') : (o.marginLeft = e.left + 'px')),
            o
          );
        },
        P = function (e) {
          W(e, [
            'left',
            'variableWidth',
            'slideCount',
            'slidesToShow',
            'slideWidth',
            'speed',
            'cssEase',
          ]);
          var t = R(e);
          return (
            e.useTransform
              ? ((t.WebkitTransition = '-webkit-transform ' + e.speed + 'ms ' + e.cssEase),
                (t.transition = 'transform ' + e.speed + 'ms ' + e.cssEase))
              : e.vertical
                ? (t.transition = 'top ' + e.speed + 'ms ' + e.cssEase)
                : (t.transition = 'left ' + e.speed + 'ms ' + e.cssEase),
            t
          );
        },
        O = function (e) {
          if (e.unslick) return 0;
          W(e, [
            'slideIndex',
            'trackRef',
            'infinite',
            'centerMode',
            'slideCount',
            'slidesToShow',
            'slidesToScroll',
            'slideWidth',
            'listWidth',
            'variableWidth',
            'slideHeight',
          ]);
          var t,
            n,
            i = e.slideIndex,
            r = e.trackRef,
            o = e.infinite,
            l = e.centerMode,
            s = e.slideCount,
            a = e.slidesToShow,
            d = e.slidesToScroll,
            c = e.slideWidth,
            u = e.listWidth,
            p = e.variableWidth,
            f = e.slideHeight,
            h = e.fade,
            v = e.vertical;
          if (h || 1 === e.slideCount) return 0;
          var S = 0;
          if (
            (o
              ? ((S = -I(e)),
                s % d !== 0 && i + d > s && (S = -(i > s ? a - (i - s) : s % d)),
                l && (S += parseInt(a / 2)))
              : (s % d !== 0 && i + d > s && (S = a - (s % d)), l && (S = parseInt(a / 2))),
            (t = v ? i * f * -1 + S * f : i * c * -1 + S * c),
            !0 === p)
          ) {
            var g,
              A = r && r.node;
            if (
              ((g = i + I(e)), (t = (n = A && A.childNodes[g]) ? -1 * n.offsetLeft : 0), !0 === l)
            ) {
              ((g = o ? i + I(e) : i), (n = A && A.children[g]), (t = 0));
              for (var y = 0; y < g; y++) t -= A && A.children[y] && A.children[y].offsetWidth;
              ((t -= parseInt(e.centerPadding)), (t += n && (u - n.offsetWidth) / 2));
            }
          }
          return t;
        },
        I = function (e) {
          return e.unslick || !e.infinite
            ? 0
            : e.variableWidth
              ? e.slideCount
              : e.slidesToShow + (e.centerMode ? 1 : 0);
        },
        N = function (e) {
          return e.unslick || !e.infinite ? 0 : e.slideCount;
        },
        D = function (e) {
          return 1 === e.slideCount ? 1 : I(e) + e.slideCount + N(e);
        },
        X = function (e) {
          var t = e.slidesToShow,
            n = e.centerMode,
            i = e.rtl,
            r = e.centerPadding;
          if (n) {
            var o = (t - 1) / 2 + 1;
            return (parseInt(r) > 0 && (o += 1), i && t % 2 == 0 && (o += 1), o);
          }
          return i ? 0 : t - 1;
        },
        Y = function (e) {
          var t = e.slidesToShow,
            n = e.centerMode,
            i = e.rtl,
            r = e.centerPadding;
          if (n) {
            var o = (t - 1) / 2 + 1;
            return (parseInt(r) > 0 && (o += 1), i || t % 2 != 0 || (o += 1), o);
          }
          return i ? t - 1 : 0;
        },
        q = function () {
          return !(
            'undefined' == typeof window ||
            !window.document ||
            !window.document.createElement
          );
        },
        F = function (e) {
          var t, n, i, r, o;
          return (
            (i = (o = e.rtl ? e.slideCount - 1 - e.index : e.index) < 0 || o >= e.slideCount),
            e.centerMode
              ? ((r = Math.floor(e.slidesToShow / 2)),
                (n = (o - e.currentSlide) % e.slideCount === 0),
                o > e.currentSlide - r - 1 && o <= e.currentSlide + r && (t = !0))
              : (t = e.currentSlide <= o && o < e.currentSlide + e.slidesToShow),
            {
              'slick-slide': !0,
              'slick-active': t,
              'slick-center': n,
              'slick-cloned': i,
              'slick-current':
                o ===
                (e.targetSlide < 0
                  ? e.targetSlide + e.slideCount
                  : e.targetSlide >= e.slideCount
                    ? e.targetSlide - e.slideCount
                    : e.targetSlide),
            }
          );
        },
        j = function (e, t) {
          return e.key + '-' + t;
        },
        B = (function (e) {
          (0, a.A)(n, e);
          var t = (0, d.A)(n);
          function n() {
            var e;
            (0, o.A)(this, n);
            for (var i = arguments.length, r = new Array(i), l = 0; l < i; l++) r[l] = arguments[l];
            return (
              (e = t.call.apply(t, [this].concat(r))),
              (0, c.A)((0, s.A)(e), 'node', null),
              (0, c.A)((0, s.A)(e), 'handleRef', function (t) {
                e.node = t;
              }),
              e
            );
          }
          return (
            (0, l.A)(n, [
              {
                key: 'render',
                value: function () {
                  var e = (function (e) {
                      var t,
                        n = [],
                        i = [],
                        o = [],
                        l = u.Children.count(e.children),
                        s = m(e),
                        a = w(e);
                      return (
                        u.Children.forEach(e.children, function (d, c) {
                          var p,
                            f = {
                              message: 'children',
                              index: c,
                              slidesToScroll: e.slidesToScroll,
                              currentSlide: e.currentSlide,
                            };
                          p =
                            !e.lazyLoad || (e.lazyLoad && e.lazyLoadedList.indexOf(c) >= 0)
                              ? d
                              : u.createElement('div', null);
                          var h = (function (e) {
                              var t = {};
                              return (
                                (void 0 !== e.variableWidth && !1 !== e.variableWidth) ||
                                  (t.width = e.slideWidth),
                                e.fade &&
                                  ((t.position = 'relative'),
                                  e.vertical && e.slideHeight
                                    ? (t.top = -e.index * parseInt(e.slideHeight))
                                    : (t.left = -e.index * parseInt(e.slideWidth)),
                                  (t.opacity = e.currentSlide === e.index ? 1 : 0),
                                  e.useCSS &&
                                    (t.transition =
                                      'opacity ' +
                                      e.speed +
                                      'ms ' +
                                      e.cssEase +
                                      ', visibility ' +
                                      e.speed +
                                      'ms ' +
                                      e.cssEase)),
                                t
                              );
                            })((0, r.A)((0, r.A)({}, e), {}, { index: c })),
                            v = p.props.className || '',
                            S = F((0, r.A)((0, r.A)({}, e), {}, { index: c }));
                          if (
                            (n.push(
                              u.cloneElement(p, {
                                key: 'original' + j(p, c),
                                'data-index': c,
                                className: g()(S, v),
                                tabIndex: '-1',
                                'aria-hidden': !S['slick-active'],
                                style: (0, r.A)(
                                  (0, r.A)({ outline: 'none' }, p.props.style || {}),
                                  h,
                                ),
                                onClick: function (t) {
                                  (p.props && p.props.onClick && p.props.onClick(t),
                                    e.focusOnSelect && e.focusOnSelect(f));
                                },
                              }),
                            ),
                            e.infinite && !1 === e.fade)
                          ) {
                            var A = l - c;
                            (A <= I(e) &&
                              l !== e.slidesToShow &&
                              ((t = -A) >= s && (p = d),
                              (S = F((0, r.A)((0, r.A)({}, e), {}, { index: t }))),
                              i.push(
                                u.cloneElement(p, {
                                  key: 'precloned' + j(p, t),
                                  'data-index': t,
                                  tabIndex: '-1',
                                  className: g()(S, v),
                                  'aria-hidden': !S['slick-active'],
                                  style: (0, r.A)((0, r.A)({}, p.props.style || {}), h),
                                  onClick: function (t) {
                                    (p.props && p.props.onClick && p.props.onClick(t),
                                      e.focusOnSelect && e.focusOnSelect(f));
                                  },
                                }),
                              )),
                              l !== e.slidesToShow &&
                                ((t = l + c) < a && (p = d),
                                (S = F((0, r.A)((0, r.A)({}, e), {}, { index: t }))),
                                o.push(
                                  u.cloneElement(p, {
                                    key: 'postcloned' + j(p, t),
                                    'data-index': t,
                                    tabIndex: '-1',
                                    className: g()(S, v),
                                    'aria-hidden': !S['slick-active'],
                                    style: (0, r.A)((0, r.A)({}, p.props.style || {}), h),
                                    onClick: function (t) {
                                      (p.props && p.props.onClick && p.props.onClick(t),
                                        e.focusOnSelect && e.focusOnSelect(f));
                                    },
                                  }),
                                )));
                          }
                        }),
                        e.rtl ? i.concat(n, o).reverse() : i.concat(n, o)
                      );
                    })(this.props),
                    t = this.props,
                    n = {
                      onMouseEnter: t.onMouseEnter,
                      onMouseOver: t.onMouseOver,
                      onMouseLeave: t.onMouseLeave,
                    };
                  return u.createElement(
                    'div',
                    (0, i.A)(
                      {
                        ref: this.handleRef,
                        className: 'slick-track',
                        style: this.props.trackStyle,
                      },
                      n,
                    ),
                    e,
                  );
                },
              },
            ]),
            n
          );
        })(u.PureComponent),
        _ = (function (e) {
          (0, a.A)(n, e);
          var t = (0, d.A)(n);
          function n() {
            return ((0, o.A)(this, n), t.apply(this, arguments));
          }
          return (
            (0, l.A)(n, [
              {
                key: 'clickHandler',
                value: function (e, t) {
                  (t.preventDefault(), this.props.clickHandler(e));
                },
              },
              {
                key: 'render',
                value: function () {
                  for (
                    var e,
                      t = this.props,
                      n = t.onMouseEnter,
                      i = t.onMouseOver,
                      o = t.onMouseLeave,
                      l = t.infinite,
                      s = t.slidesToScroll,
                      a = t.slidesToShow,
                      d = t.slideCount,
                      c = t.currentSlide,
                      p = (e = { slideCount: d, slidesToScroll: s, slidesToShow: a, infinite: l })
                        .infinite
                        ? Math.ceil(e.slideCount / e.slidesToScroll)
                        : Math.ceil((e.slideCount - e.slidesToShow) / e.slidesToScroll) + 1,
                      f = { onMouseEnter: n, onMouseOver: i, onMouseLeave: o },
                      h = [],
                      v = 0;
                    v < p;
                    v++
                  ) {
                    var S = (v + 1) * s - 1,
                      y = l ? S : A(S, 0, d - 1),
                      k = y - (s - 1),
                      m = l ? k : A(k, 0, d - 1),
                      w = g()({ 'slick-active': l ? c >= m && c <= y : c === m }),
                      T = { message: 'dots', index: v, slidesToScroll: s, currentSlide: c },
                      L = this.clickHandler.bind(this, T);
                    h = h.concat(
                      u.createElement(
                        'li',
                        { key: v, className: w },
                        u.cloneElement(this.props.customPaging(v), { onClick: L }),
                      ),
                    );
                  }
                  return u.cloneElement(
                    this.props.appendDots(h),
                    (0, r.A)({ className: this.props.dotsClass }, f),
                  );
                },
              },
            ]),
            n
          );
        })(u.PureComponent),
        U = (function (e) {
          (0, a.A)(n, e);
          var t = (0, d.A)(n);
          function n() {
            return ((0, o.A)(this, n), t.apply(this, arguments));
          }
          return (
            (0, l.A)(n, [
              {
                key: 'clickHandler',
                value: function (e, t) {
                  (t && t.preventDefault(), this.props.clickHandler(e, t));
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = { 'slick-arrow': !0, 'slick-prev': !0 },
                    t = this.clickHandler.bind(this, { message: 'previous' });
                  !this.props.infinite &&
                    (0 === this.props.currentSlide ||
                      this.props.slideCount <= this.props.slidesToShow) &&
                    ((e['slick-disabled'] = !0), (t = null));
                  var n = {
                      key: '0',
                      'data-role': 'none',
                      className: g()(e),
                      style: { display: 'block' },
                      onClick: t,
                    },
                    o = {
                      currentSlide: this.props.currentSlide,
                      slideCount: this.props.slideCount,
                    };
                  return this.props.prevArrow
                    ? u.cloneElement(this.props.prevArrow, (0, r.A)((0, r.A)({}, n), o))
                    : u.createElement(
                        'button',
                        (0, i.A)({ key: '0', type: 'button' }, n),
                        ' ',
                        'Previous',
                      );
                },
              },
            ]),
            n
          );
        })(u.PureComponent),
        G = (function (e) {
          (0, a.A)(n, e);
          var t = (0, d.A)(n);
          function n() {
            return ((0, o.A)(this, n), t.apply(this, arguments));
          }
          return (
            (0, l.A)(n, [
              {
                key: 'clickHandler',
                value: function (e, t) {
                  (t && t.preventDefault(), this.props.clickHandler(e, t));
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = { 'slick-arrow': !0, 'slick-next': !0 },
                    t = this.clickHandler.bind(this, { message: 'next' });
                  E(this.props) || ((e['slick-disabled'] = !0), (t = null));
                  var n = {
                      key: '1',
                      'data-role': 'none',
                      className: g()(e),
                      style: { display: 'block' },
                      onClick: t,
                    },
                    o = {
                      currentSlide: this.props.currentSlide,
                      slideCount: this.props.slideCount,
                    };
                  return this.props.nextArrow
                    ? u.cloneElement(this.props.nextArrow, (0, r.A)((0, r.A)({}, n), o))
                    : u.createElement(
                        'button',
                        (0, i.A)({ key: '1', type: 'button' }, n),
                        ' ',
                        'Next',
                      );
                },
              },
            ]),
            n
          );
        })(u.PureComponent),
        K = n(143591),
        V = ['animating'],
        J = (function (e) {
          (0, a.A)(n, e);
          var t = (0, d.A)(n);
          function n(e) {
            var l;
            ((0, o.A)(this, n),
              (l = t.call(this, e)),
              (0, c.A)((0, s.A)(l), 'listRefHandler', function (e) {
                return (l.list = e);
              }),
              (0, c.A)((0, s.A)(l), 'trackRefHandler', function (e) {
                return (l.track = e);
              }),
              (0, c.A)((0, s.A)(l), 'adaptHeight', function () {
                if (l.props.adaptiveHeight && l.list) {
                  var e = l.list.querySelector('[data-index="'.concat(l.state.currentSlide, '"]'));
                  l.list.style.height = C(e) + 'px';
                }
              }),
              (0, c.A)((0, s.A)(l), 'componentDidMount', function () {
                if ((l.props.onInit && l.props.onInit(), l.props.lazyLoad)) {
                  var e = k((0, r.A)((0, r.A)({}, l.props), l.state));
                  e.length > 0 &&
                    (l.setState(function (t) {
                      return { lazyLoadedList: t.lazyLoadedList.concat(e) };
                    }),
                    l.props.onLazyLoad && l.props.onLazyLoad(e));
                }
                var t = (0, r.A)({ listRef: l.list, trackRef: l.track }, l.props);
                (l.updateState(t, !0, function () {
                  (l.adaptHeight(), l.props.autoplay && l.autoPlay('playing'));
                }),
                  'progressive' === l.props.lazyLoad &&
                    (l.lazyLoadTimer = setInterval(l.progressiveLazyLoad, 1e3)),
                  (l.ro = new K.default(function () {
                    l.state.animating
                      ? (l.onWindowResized(!1),
                        l.callbackTimers.push(
                          setTimeout(function () {
                            return l.onWindowResized();
                          }, l.props.speed),
                        ))
                      : l.onWindowResized();
                  })),
                  l.ro.observe(l.list),
                  document.querySelectorAll &&
                    Array.prototype.forEach.call(
                      document.querySelectorAll('.slick-slide'),
                      function (e) {
                        ((e.onfocus = l.props.pauseOnFocus ? l.onSlideFocus : null),
                          (e.onblur = l.props.pauseOnFocus ? l.onSlideBlur : null));
                      },
                    ),
                  window.addEventListener
                    ? window.addEventListener('resize', l.onWindowResized)
                    : window.attachEvent('onresize', l.onWindowResized));
              }),
              (0, c.A)((0, s.A)(l), 'componentWillUnmount', function () {
                (l.animationEndCallback && clearTimeout(l.animationEndCallback),
                  l.lazyLoadTimer && clearInterval(l.lazyLoadTimer),
                  l.callbackTimers.length &&
                    (l.callbackTimers.forEach(function (e) {
                      return clearTimeout(e);
                    }),
                    (l.callbackTimers = [])),
                  window.addEventListener
                    ? window.removeEventListener('resize', l.onWindowResized)
                    : window.detachEvent('onresize', l.onWindowResized),
                  l.autoplayTimer && clearInterval(l.autoplayTimer),
                  l.ro.disconnect());
              }),
              (0, c.A)((0, s.A)(l), 'componentDidUpdate', function (e) {
                if (
                  (l.checkImagesLoad(), l.props.onReInit && l.props.onReInit(), l.props.lazyLoad)
                ) {
                  var t = k((0, r.A)((0, r.A)({}, l.props), l.state));
                  t.length > 0 &&
                    (l.setState(function (e) {
                      return { lazyLoadedList: e.lazyLoadedList.concat(t) };
                    }),
                    l.props.onLazyLoad && l.props.onLazyLoad(t));
                }
                l.adaptHeight();
                var n = (0, r.A)(
                    (0, r.A)({ listRef: l.list, trackRef: l.track }, l.props),
                    l.state,
                  ),
                  i = l.didPropsChange(e);
                i &&
                  l.updateState(n, i, function () {
                    (l.state.currentSlide >= u.Children.count(l.props.children) &&
                      l.changeSlide({
                        message: 'index',
                        index: u.Children.count(l.props.children) - l.props.slidesToShow,
                        currentSlide: l.state.currentSlide,
                      }),
                      (e.autoplay === l.props.autoplay &&
                        e.autoplaySpeed === l.props.autoplaySpeed) ||
                        (!e.autoplay && l.props.autoplay
                          ? l.autoPlay('playing')
                          : l.props.autoplay
                            ? l.autoPlay('update')
                            : l.pause('paused')));
                  });
              }),
              (0, c.A)((0, s.A)(l), 'onWindowResized', function (e) {
                (l.debouncedResize && l.debouncedResize.cancel(),
                  (l.debouncedResize = (0, v.s)(50, function () {
                    return l.resizeWindow(e);
                  })),
                  l.debouncedResize());
              }),
              (0, c.A)((0, s.A)(l), 'resizeWindow', function () {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                if (Boolean(l.track && l.track.node)) {
                  var t = (0, r.A)(
                    (0, r.A)({ listRef: l.list, trackRef: l.track }, l.props),
                    l.state,
                  );
                  (l.updateState(t, e, function () {
                    l.props.autoplay ? l.autoPlay('update') : l.pause('paused');
                  }),
                    l.setState({ animating: !1 }),
                    clearTimeout(l.animationEndCallback),
                    delete l.animationEndCallback);
                }
              }),
              (0, c.A)((0, s.A)(l), 'updateState', function (e, t, n) {
                var i = (function (e) {
                  var t,
                    n = u.Children.count(e.children),
                    i = e.listRef,
                    o = Math.ceil(b(i)),
                    l = e.trackRef && e.trackRef.node,
                    s = Math.ceil(b(l));
                  if (e.vertical) t = o;
                  else {
                    var a = e.centerMode && 2 * parseInt(e.centerPadding);
                    ('string' == typeof e.centerPadding &&
                      '%' === e.centerPadding.slice(-1) &&
                      (a *= o / 100),
                      (t = Math.ceil((o - a) / e.slidesToShow)));
                  }
                  var d = i && C(i.querySelector('[data-index="0"]')),
                    c = d * e.slidesToShow,
                    p = void 0 === e.currentSlide ? e.initialSlide : e.currentSlide;
                  e.rtl && void 0 === e.currentSlide && (p = n - 1 - e.initialSlide);
                  var f = e.lazyLoadedList || [],
                    h = k((0, r.A)((0, r.A)({}, e), {}, { currentSlide: p, lazyLoadedList: f })),
                    v = {
                      slideCount: n,
                      slideWidth: t,
                      listWidth: o,
                      trackWidth: s,
                      currentSlide: p,
                      slideHeight: d,
                      listHeight: c,
                      lazyLoadedList: (f = f.concat(h)),
                    };
                  return (null === e.autoplaying && e.autoplay && (v.autoplaying = 'playing'), v);
                })(e);
                e = (0, r.A)((0, r.A)((0, r.A)({}, e), i), {}, { slideIndex: i.currentSlide });
                var o = O(e);
                e = (0, r.A)((0, r.A)({}, e), {}, { left: o });
                var s = R(e);
                ((t || u.Children.count(l.props.children) !== u.Children.count(e.children)) &&
                  (i.trackStyle = s),
                  l.setState(i, n));
              }),
              (0, c.A)((0, s.A)(l), 'ssrInit', function () {
                if (l.props.variableWidth) {
                  var e = 0,
                    t = 0,
                    n = [],
                    i = I(
                      (0, r.A)(
                        (0, r.A)((0, r.A)({}, l.props), l.state),
                        {},
                        { slideCount: l.props.children.length },
                      ),
                    ),
                    o = N(
                      (0, r.A)(
                        (0, r.A)((0, r.A)({}, l.props), l.state),
                        {},
                        { slideCount: l.props.children.length },
                      ),
                    );
                  l.props.children.forEach(function (t) {
                    (n.push(t.props.style.width), (e += t.props.style.width));
                  });
                  for (var s = 0; s < i; s++)
                    ((t += n[n.length - 1 - s]), (e += n[n.length - 1 - s]));
                  for (var a = 0; a < o; a++) e += n[a];
                  for (var d = 0; d < l.state.currentSlide; d++) t += n[d];
                  var c = { width: e + 'px', left: -t + 'px' };
                  if (l.props.centerMode) {
                    var p = ''.concat(n[l.state.currentSlide], 'px');
                    c.left = 'calc('.concat(c.left, ' + (100% - ').concat(p, ') / 2 ) ');
                  }
                  return { trackStyle: c };
                }
                var f = u.Children.count(l.props.children),
                  h = (0, r.A)((0, r.A)((0, r.A)({}, l.props), l.state), {}, { slideCount: f }),
                  v = I(h) + N(h) + f,
                  S = (100 / l.props.slidesToShow) * v,
                  g = 100 / v,
                  A = (-g * (I(h) + l.state.currentSlide) * S) / 100;
                return (
                  l.props.centerMode && (A += (100 - (g * S) / 100) / 2),
                  { slideWidth: g + '%', trackStyle: { width: S + '%', left: A + '%' } }
                );
              }),
              (0, c.A)((0, s.A)(l), 'checkImagesLoad', function () {
                var e =
                    (l.list &&
                      l.list.querySelectorAll &&
                      l.list.querySelectorAll('.slick-slide img')) ||
                    [],
                  t = e.length,
                  n = 0;
                Array.prototype.forEach.call(e, function (e) {
                  var i = function () {
                    return ++n && n >= t && l.onWindowResized();
                  };
                  if (e.onclick) {
                    var r = e.onclick;
                    e.onclick = function (t) {
                      (r(t), e.parentNode.focus());
                    };
                  } else
                    e.onclick = function () {
                      return e.parentNode.focus();
                    };
                  e.onload ||
                    (l.props.lazyLoad
                      ? (e.onload = function () {
                          (l.adaptHeight(),
                            l.callbackTimers.push(setTimeout(l.onWindowResized, l.props.speed)));
                        })
                      : ((e.onload = i),
                        (e.onerror = function () {
                          (i(), l.props.onLazyLoadError && l.props.onLazyLoadError());
                        })));
                });
              }),
              (0, c.A)((0, s.A)(l), 'progressiveLazyLoad', function () {
                for (
                  var e = [],
                    t = (0, r.A)((0, r.A)({}, l.props), l.state),
                    n = l.state.currentSlide;
                  n < l.state.slideCount + N(t);
                  n++
                )
                  if (l.state.lazyLoadedList.indexOf(n) < 0) {
                    e.push(n);
                    break;
                  }
                for (var i = l.state.currentSlide - 1; i >= -I(t); i--)
                  if (l.state.lazyLoadedList.indexOf(i) < 0) {
                    e.push(i);
                    break;
                  }
                e.length > 0
                  ? (l.setState(function (t) {
                      return { lazyLoadedList: t.lazyLoadedList.concat(e) };
                    }),
                    l.props.onLazyLoad && l.props.onLazyLoad(e))
                  : l.lazyLoadTimer && (clearInterval(l.lazyLoadTimer), delete l.lazyLoadTimer);
              }),
              (0, c.A)((0, s.A)(l), 'slideHandler', function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                  n = l.props,
                  i = n.asNavFor,
                  o = n.beforeChange,
                  s = n.onLazyLoad,
                  a = n.speed,
                  d = n.afterChange,
                  c = l.state.currentSlide,
                  u = (function (e) {
                    var t = e.waitForAnimate,
                      n = e.animating,
                      i = e.fade,
                      o = e.infinite,
                      l = e.index,
                      s = e.slideCount,
                      a = e.lazyLoad,
                      d = e.currentSlide,
                      c = e.centerMode,
                      u = e.slidesToScroll,
                      p = e.slidesToShow,
                      f = e.useCSS,
                      h = e.lazyLoadedList;
                    if (t && n) return {};
                    var v,
                      S,
                      g,
                      y = l,
                      m = {},
                      w = {},
                      T = o ? l : A(l, 0, s - 1);
                    if (i) {
                      if (!o && (l < 0 || l >= s)) return {};
                      (l < 0 ? (y = l + s) : l >= s && (y = l - s),
                        a && h.indexOf(y) < 0 && (h = h.concat(y)),
                        (m = { animating: !0, currentSlide: y, lazyLoadedList: h, targetSlide: y }),
                        (w = { animating: !1, targetSlide: y }));
                    } else
                      ((v = y),
                        y < 0
                          ? ((v = y + s), o ? s % u !== 0 && (v = s - (s % u)) : (v = 0))
                          : !E(e) && y > d
                            ? (y = v = d)
                            : c && y >= s
                              ? ((y = o ? s : s - 1), (v = o ? 0 : s - 1))
                              : y >= s && ((v = y - s), o ? s % u !== 0 && (v = 0) : (v = s - p)),
                        !o && y + p >= s && (v = s - p),
                        (S = O((0, r.A)((0, r.A)({}, e), {}, { slideIndex: y }))),
                        (g = O((0, r.A)((0, r.A)({}, e), {}, { slideIndex: v }))),
                        o || (S === g && (y = v), (S = g)),
                        a && (h = h.concat(k((0, r.A)((0, r.A)({}, e), {}, { currentSlide: y })))),
                        f
                          ? ((m = {
                              animating: !0,
                              currentSlide: v,
                              trackStyle: P((0, r.A)((0, r.A)({}, e), {}, { left: S })),
                              lazyLoadedList: h,
                              targetSlide: T,
                            }),
                            (w = {
                              animating: !1,
                              currentSlide: v,
                              trackStyle: R((0, r.A)((0, r.A)({}, e), {}, { left: g })),
                              swipeLeft: null,
                              targetSlide: T,
                            }))
                          : (m = {
                              currentSlide: v,
                              trackStyle: R((0, r.A)((0, r.A)({}, e), {}, { left: g })),
                              lazyLoadedList: h,
                              targetSlide: T,
                            }));
                    return { state: m, nextState: w };
                  })(
                    (0, r.A)(
                      (0, r.A)((0, r.A)({ index: e }, l.props), l.state),
                      {},
                      { trackRef: l.track, useCSS: l.props.useCSS && !t },
                    ),
                  ),
                  p = u.state,
                  h = u.nextState;
                if (p) {
                  o && o(c, p.currentSlide);
                  var v = p.lazyLoadedList.filter(function (e) {
                    return l.state.lazyLoadedList.indexOf(e) < 0;
                  });
                  (s && v.length > 0 && s(v),
                    !l.props.waitForAnimate &&
                      l.animationEndCallback &&
                      (clearTimeout(l.animationEndCallback),
                      d && d(c),
                      delete l.animationEndCallback),
                    l.setState(p, function () {
                      (i &&
                        l.asNavForIndex !== e &&
                        ((l.asNavForIndex = e), i.innerSlider.slideHandler(e)),
                        h &&
                          (l.animationEndCallback = setTimeout(function () {
                            var e = h.animating,
                              t = (0, f.A)(h, V);
                            l.setState(t, function () {
                              (l.callbackTimers.push(
                                setTimeout(function () {
                                  return l.setState({ animating: e });
                                }, 10),
                              ),
                                d && d(p.currentSlide),
                                delete l.animationEndCallback);
                            });
                          }, a)));
                    }));
                }
              }),
              (0, c.A)((0, s.A)(l), 'changeSlide', function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                  n = (function (e, t) {
                    var n,
                      i,
                      o,
                      l,
                      s = e.slidesToScroll,
                      a = e.slidesToShow,
                      d = e.slideCount,
                      c = e.currentSlide,
                      u = e.targetSlide,
                      p = e.lazyLoad,
                      f = e.infinite;
                    if (((n = d % s !== 0 ? 0 : (d - c) % s), 'previous' === t.message))
                      ((l = c - (o = 0 === n ? s : a - n)),
                        p && !f && (l = -1 === (i = c - o) ? d - 1 : i),
                        f || (l = u - s));
                    else if ('next' === t.message)
                      ((l = c + (o = 0 === n ? s : n)),
                        p && !f && (l = ((c + s) % d) + n),
                        f || (l = u + s));
                    else if ('dots' === t.message) l = t.index * t.slidesToScroll;
                    else if ('children' === t.message) {
                      if (((l = t.index), f)) {
                        var h = (function (e) {
                          return e.targetSlide > e.currentSlide
                            ? e.targetSlide > e.currentSlide + X(e)
                              ? 'left'
                              : 'right'
                            : e.targetSlide < e.currentSlide - Y(e)
                              ? 'right'
                              : 'left';
                        })((0, r.A)((0, r.A)({}, e), {}, { targetSlide: l }));
                        l > t.currentSlide && 'left' === h
                          ? (l -= d)
                          : l < t.currentSlide && 'right' === h && (l += d);
                      }
                    } else 'index' === t.message && (l = Number(t.index));
                    return l;
                  })((0, r.A)((0, r.A)({}, l.props), l.state), e);
                if (
                  (0 === n || n) &&
                  (!0 === t ? l.slideHandler(n, t) : l.slideHandler(n),
                  l.props.autoplay && l.autoPlay('update'),
                  l.props.focusOnSelect)
                ) {
                  var i = l.list.querySelectorAll('.slick-current');
                  i[0] && i[0].focus();
                }
              }),
              (0, c.A)((0, s.A)(l), 'clickHandler', function (e) {
                (!1 === l.clickable && (e.stopPropagation(), e.preventDefault()),
                  (l.clickable = !0));
              }),
              (0, c.A)((0, s.A)(l), 'keyHandler', function (e) {
                var t = (function (e, t, n) {
                  return e.target.tagName.match('TEXTAREA|INPUT|SELECT') || !t
                    ? ''
                    : 37 === e.keyCode
                      ? n
                        ? 'next'
                        : 'previous'
                      : 39 === e.keyCode
                        ? n
                          ? 'previous'
                          : 'next'
                        : '';
                })(e, l.props.accessibility, l.props.rtl);
                '' !== t && l.changeSlide({ message: t });
              }),
              (0, c.A)((0, s.A)(l), 'selectHandler', function (e) {
                l.changeSlide(e);
              }),
              (0, c.A)((0, s.A)(l), 'disableBodyScroll', function () {
                window.ontouchmove = function (e) {
                  ((e = e || window.event).preventDefault && e.preventDefault(),
                    (e.returnValue = !1));
                };
              }),
              (0, c.A)((0, s.A)(l), 'enableBodyScroll', function () {
                window.ontouchmove = null;
              }),
              (0, c.A)((0, s.A)(l), 'swipeStart', function (e) {
                l.props.verticalSwiping && l.disableBodyScroll();
                var t = (function (e, t, n) {
                  return (
                    'IMG' === e.target.tagName && y(e),
                    !t || (!n && -1 !== e.type.indexOf('mouse'))
                      ? ''
                      : {
                          dragging: !0,
                          touchObject: {
                            startX: e.touches ? e.touches[0].pageX : e.clientX,
                            startY: e.touches ? e.touches[0].pageY : e.clientY,
                            curX: e.touches ? e.touches[0].pageX : e.clientX,
                            curY: e.touches ? e.touches[0].pageY : e.clientY,
                          },
                        }
                  );
                })(e, l.props.swipe, l.props.draggable);
                '' !== t && l.setState(t);
              }),
              (0, c.A)((0, s.A)(l), 'swipeMove', function (e) {
                var t = (function (e, t) {
                  var n = t.scrolling,
                    i = t.animating,
                    o = t.vertical,
                    l = t.swipeToSlide,
                    s = t.verticalSwiping,
                    a = t.rtl,
                    d = t.currentSlide,
                    c = t.edgeFriction,
                    u = t.edgeDragged,
                    p = t.onEdge,
                    f = t.swiped,
                    h = t.swiping,
                    v = t.slideCount,
                    S = t.slidesToScroll,
                    g = t.infinite,
                    A = t.touchObject,
                    k = t.swipeEvent,
                    m = t.listHeight,
                    w = t.listWidth;
                  if (!n) {
                    if (i) return y(e);
                    o && l && s && y(e);
                    var T,
                      L = {},
                      b = O(t);
                    ((A.curX = e.touches ? e.touches[0].pageX : e.clientX),
                      (A.curY = e.touches ? e.touches[0].pageY : e.clientY),
                      (A.swipeLength = Math.round(Math.sqrt(Math.pow(A.curX - A.startX, 2)))));
                    var C = Math.round(Math.sqrt(Math.pow(A.curY - A.startY, 2)));
                    if (!s && !h && C > 10) return { scrolling: !0 };
                    s && (A.swipeLength = C);
                    var M = (a ? -1 : 1) * (A.curX > A.startX ? 1 : -1);
                    s && (M = A.curY > A.startY ? 1 : -1);
                    var z = Math.ceil(v / S),
                      H = x(t.touchObject, s),
                      W = A.swipeLength;
                    return (
                      g ||
                        (((0 === d && ('right' === H || 'down' === H)) ||
                          (d + 1 >= z && ('left' === H || 'up' === H)) ||
                          (!E(t) && ('left' === H || 'up' === H))) &&
                          ((W = A.swipeLength * c), !1 === u && p && (p(H), (L.edgeDragged = !0)))),
                      !f && k && (k(H), (L.swiped = !0)),
                      (T = o ? b + W * (m / w) * M : a ? b - W * M : b + W * M),
                      s && (T = b + W * M),
                      (L = (0, r.A)(
                        (0, r.A)({}, L),
                        {},
                        {
                          touchObject: A,
                          swipeLeft: T,
                          trackStyle: R((0, r.A)((0, r.A)({}, t), {}, { left: T })),
                        },
                      )),
                      Math.abs(A.curX - A.startX) < 0.8 * Math.abs(A.curY - A.startY) ||
                        (A.swipeLength > 10 && ((L.swiping = !0), y(e))),
                      L
                    );
                  }
                })(
                  e,
                  (0, r.A)(
                    (0, r.A)((0, r.A)({}, l.props), l.state),
                    {},
                    { trackRef: l.track, listRef: l.list, slideIndex: l.state.currentSlide },
                  ),
                );
                t && (t.swiping && (l.clickable = !1), l.setState(t));
              }),
              (0, c.A)((0, s.A)(l), 'swipeEnd', function (e) {
                var t = (function (e, t) {
                  var n = t.dragging,
                    i = t.swipe,
                    o = t.touchObject,
                    l = t.listWidth,
                    s = t.touchThreshold,
                    a = t.verticalSwiping,
                    d = t.listHeight,
                    c = t.swipeToSlide,
                    u = t.scrolling,
                    p = t.onSwipe,
                    f = t.targetSlide,
                    h = t.currentSlide,
                    v = t.infinite;
                  if (!n) return (i && y(e), {});
                  var S = a ? d / s : l / s,
                    g = x(o, a),
                    A = {
                      dragging: !1,
                      edgeDragged: !1,
                      scrolling: !1,
                      swiping: !1,
                      swiped: !1,
                      swipeLeft: null,
                      touchObject: {},
                    };
                  if (u) return A;
                  if (!o.swipeLength) return A;
                  if (o.swipeLength > S) {
                    var k, m;
                    (y(e), p && p(g));
                    var w = v ? h : f;
                    switch (g) {
                      case 'left':
                      case 'up':
                        ((m = w + H(t)), (k = c ? z(t, m) : m), (A.currentDirection = 0));
                        break;
                      case 'right':
                      case 'down':
                        ((m = w - H(t)), (k = c ? z(t, m) : m), (A.currentDirection = 1));
                        break;
                      default:
                        k = w;
                    }
                    A.triggerSlideHandler = k;
                  } else {
                    var T = O(t);
                    A.trackStyle = P((0, r.A)((0, r.A)({}, t), {}, { left: T }));
                  }
                  return A;
                })(
                  e,
                  (0, r.A)(
                    (0, r.A)((0, r.A)({}, l.props), l.state),
                    {},
                    { trackRef: l.track, listRef: l.list, slideIndex: l.state.currentSlide },
                  ),
                );
                if (t) {
                  var n = t.triggerSlideHandler;
                  (delete t.triggerSlideHandler,
                    l.setState(t),
                    void 0 !== n &&
                      (l.slideHandler(n), l.props.verticalSwiping && l.enableBodyScroll()));
                }
              }),
              (0, c.A)((0, s.A)(l), 'touchEnd', function (e) {
                (l.swipeEnd(e), (l.clickable = !0));
              }),
              (0, c.A)((0, s.A)(l), 'slickPrev', function () {
                l.callbackTimers.push(
                  setTimeout(function () {
                    return l.changeSlide({ message: 'previous' });
                  }, 0),
                );
              }),
              (0, c.A)((0, s.A)(l), 'slickNext', function () {
                l.callbackTimers.push(
                  setTimeout(function () {
                    return l.changeSlide({ message: 'next' });
                  }, 0),
                );
              }),
              (0, c.A)((0, s.A)(l), 'slickGoTo', function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (((e = Number(e)), isNaN(e))) return '';
                l.callbackTimers.push(
                  setTimeout(function () {
                    return l.changeSlide(
                      { message: 'index', index: e, currentSlide: l.state.currentSlide },
                      t,
                    );
                  }, 0),
                );
              }),
              (0, c.A)((0, s.A)(l), 'play', function () {
                var e;
                if (l.props.rtl) e = l.state.currentSlide - l.props.slidesToScroll;
                else {
                  if (!E((0, r.A)((0, r.A)({}, l.props), l.state))) return !1;
                  e = l.state.currentSlide + l.props.slidesToScroll;
                }
                l.slideHandler(e);
              }),
              (0, c.A)((0, s.A)(l), 'autoPlay', function (e) {
                l.autoplayTimer && clearInterval(l.autoplayTimer);
                var t = l.state.autoplaying;
                if ('update' === e) {
                  if ('hovered' === t || 'focused' === t || 'paused' === t) return;
                } else if ('leave' === e) {
                  if ('paused' === t || 'focused' === t) return;
                } else if ('blur' === e && ('paused' === t || 'hovered' === t)) return;
                ((l.autoplayTimer = setInterval(l.play, l.props.autoplaySpeed + 50)),
                  l.setState({ autoplaying: 'playing' }));
              }),
              (0, c.A)((0, s.A)(l), 'pause', function (e) {
                l.autoplayTimer && (clearInterval(l.autoplayTimer), (l.autoplayTimer = null));
                var t = l.state.autoplaying;
                'paused' === e
                  ? l.setState({ autoplaying: 'paused' })
                  : 'focused' === e
                    ? ('hovered' !== t && 'playing' !== t) || l.setState({ autoplaying: 'focused' })
                    : 'playing' === t && l.setState({ autoplaying: 'hovered' });
              }),
              (0, c.A)((0, s.A)(l), 'onDotsOver', function () {
                return l.props.autoplay && l.pause('hovered');
              }),
              (0, c.A)((0, s.A)(l), 'onDotsLeave', function () {
                return l.props.autoplay && 'hovered' === l.state.autoplaying && l.autoPlay('leave');
              }),
              (0, c.A)((0, s.A)(l), 'onTrackOver', function () {
                return l.props.autoplay && l.pause('hovered');
              }),
              (0, c.A)((0, s.A)(l), 'onTrackLeave', function () {
                return l.props.autoplay && 'hovered' === l.state.autoplaying && l.autoPlay('leave');
              }),
              (0, c.A)((0, s.A)(l), 'onSlideFocus', function () {
                return l.props.autoplay && l.pause('focused');
              }),
              (0, c.A)((0, s.A)(l), 'onSlideBlur', function () {
                return l.props.autoplay && 'focused' === l.state.autoplaying && l.autoPlay('blur');
              }),
              (0, c.A)((0, s.A)(l), 'render', function () {
                var e,
                  t,
                  n,
                  o = g()('slick-slider', l.props.className, {
                    'slick-vertical': l.props.vertical,
                    'slick-initialized': !0,
                  }),
                  s = (0, r.A)((0, r.A)({}, l.props), l.state),
                  a = M(s, [
                    'fade',
                    'cssEase',
                    'speed',
                    'infinite',
                    'centerMode',
                    'focusOnSelect',
                    'currentSlide',
                    'lazyLoad',
                    'lazyLoadedList',
                    'rtl',
                    'slideWidth',
                    'slideHeight',
                    'listHeight',
                    'vertical',
                    'slidesToShow',
                    'slidesToScroll',
                    'slideCount',
                    'trackStyle',
                    'variableWidth',
                    'unslick',
                    'centerPadding',
                    'targetSlide',
                    'useCSS',
                  ]),
                  d = l.props.pauseOnHover;
                if (
                  ((a = (0, r.A)(
                    (0, r.A)({}, a),
                    {},
                    {
                      onMouseEnter: d ? l.onTrackOver : null,
                      onMouseLeave: d ? l.onTrackLeave : null,
                      onMouseOver: d ? l.onTrackOver : null,
                      focusOnSelect: l.props.focusOnSelect && l.clickable ? l.selectHandler : null,
                    },
                  )),
                  !0 === l.props.dots && l.state.slideCount >= l.props.slidesToShow)
                ) {
                  var c = M(s, [
                      'dotsClass',
                      'slideCount',
                      'slidesToShow',
                      'currentSlide',
                      'slidesToScroll',
                      'clickHandler',
                      'children',
                      'customPaging',
                      'infinite',
                      'appendDots',
                    ]),
                    p = l.props.pauseOnDotsHover;
                  ((c = (0, r.A)(
                    (0, r.A)({}, c),
                    {},
                    {
                      clickHandler: l.changeSlide,
                      onMouseEnter: p ? l.onDotsLeave : null,
                      onMouseOver: p ? l.onDotsOver : null,
                      onMouseLeave: p ? l.onDotsLeave : null,
                    },
                  )),
                    (e = u.createElement(_, c)));
                }
                var f = M(s, [
                  'infinite',
                  'centerMode',
                  'currentSlide',
                  'slideCount',
                  'slidesToShow',
                  'prevArrow',
                  'nextArrow',
                ]);
                ((f.clickHandler = l.changeSlide),
                  l.props.arrows && ((t = u.createElement(U, f)), (n = u.createElement(G, f))));
                var h = null;
                l.props.vertical && (h = { height: l.state.listHeight });
                var v = null;
                !1 === l.props.vertical
                  ? !0 === l.props.centerMode && (v = { padding: '0px ' + l.props.centerPadding })
                  : !0 === l.props.centerMode && (v = { padding: l.props.centerPadding + ' 0px' });
                var S = (0, r.A)((0, r.A)({}, h), v),
                  A = l.props.touchMove,
                  y = {
                    className: 'slick-list',
                    style: S,
                    onClick: l.clickHandler,
                    onMouseDown: A ? l.swipeStart : null,
                    onMouseMove: l.state.dragging && A ? l.swipeMove : null,
                    onMouseUp: A ? l.swipeEnd : null,
                    onMouseLeave: l.state.dragging && A ? l.swipeEnd : null,
                    onTouchStart: A ? l.swipeStart : null,
                    onTouchMove: l.state.dragging && A ? l.swipeMove : null,
                    onTouchEnd: A ? l.touchEnd : null,
                    onTouchCancel: l.state.dragging && A ? l.swipeEnd : null,
                    onKeyDown: l.props.accessibility ? l.keyHandler : null,
                  },
                  k = { className: o, dir: 'ltr', style: l.props.style };
                return (
                  l.props.unslick &&
                    ((y = { className: 'slick-list' }),
                    (k = { className: o, style: l.props.style })),
                  u.createElement(
                    'div',
                    k,
                    l.props.unslick ? '' : t,
                    u.createElement(
                      'div',
                      (0, i.A)({ ref: l.listRefHandler }, y),
                      u.createElement(B, (0, i.A)({ ref: l.trackRefHandler }, a), l.props.children),
                    ),
                    l.props.unslick ? '' : n,
                    l.props.unslick ? '' : e,
                  )
                );
              }),
              (l.list = null),
              (l.track = null),
              (l.state = (0, r.A)(
                (0, r.A)({}, h),
                {},
                {
                  currentSlide: l.props.initialSlide,
                  slideCount: u.Children.count(l.props.children),
                },
              )),
              (l.callbackTimers = []),
              (l.clickable = !0),
              (l.debouncedResize = null));
            var a = l.ssrInit();
            return ((l.state = (0, r.A)((0, r.A)({}, l.state), a)), l);
          }
          return (
            (0, l.A)(n, [
              {
                key: 'didPropsChange',
                value: function (e) {
                  for (var t = !1, n = 0, i = Object.keys(this.props); n < i.length; n++) {
                    var r = i[n];
                    if (!e.hasOwnProperty(r)) {
                      t = !0;
                      break;
                    }
                    if (
                      'object' !== (0, p.A)(e[r]) &&
                      'function' != typeof e[r] &&
                      e[r] !== this.props[r]
                    ) {
                      t = !0;
                      break;
                    }
                  }
                  return (
                    t || u.Children.count(this.props.children) !== u.Children.count(e.children)
                  );
                },
              },
            ]),
            n
          );
        })(u.Component),
        Q = n(11441),
        Z = n.n(Q);
      const $ = {
          accessibility: !0,
          adaptiveHeight: !1,
          afterChange: null,
          appendDots: function (e) {
            return u.createElement('ul', { style: { display: 'block' } }, e);
          },
          arrows: !0,
          autoplay: !1,
          autoplaySpeed: 3e3,
          beforeChange: null,
          centerMode: !1,
          centerPadding: '50px',
          className: '',
          cssEase: 'ease',
          customPaging: function (e) {
            return u.createElement('button', null, e + 1);
          },
          dots: !1,
          dotsClass: 'slick-dots',
          draggable: !0,
          easing: 'linear',
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: null,
          nextArrow: null,
          onEdge: null,
          onInit: null,
          onLazyLoadError: null,
          onReInit: null,
          pauseOnDotsHover: !1,
          pauseOnFocus: !1,
          pauseOnHover: !0,
          prevArrow: null,
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: 'div',
          slidesPerRow: 1,
          slidesToScroll: 1,
          slidesToShow: 1,
          speed: 500,
          swipe: !0,
          swipeEvent: null,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          waitForAnimate: !0,
        },
        ee = (function (e) {
          (0, a.A)(n, e);
          var t = (0, d.A)(n);
          function n(e) {
            var i;
            return (
              (0, o.A)(this, n),
              (i = t.call(this, e)),
              (0, c.A)((0, s.A)(i), 'innerSliderRefHandler', function (e) {
                return (i.innerSlider = e);
              }),
              (0, c.A)((0, s.A)(i), 'slickPrev', function () {
                return i.innerSlider.slickPrev();
              }),
              (0, c.A)((0, s.A)(i), 'slickNext', function () {
                return i.innerSlider.slickNext();
              }),
              (0, c.A)((0, s.A)(i), 'slickGoTo', function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return i.innerSlider.slickGoTo(e, t);
              }),
              (0, c.A)((0, s.A)(i), 'slickPause', function () {
                return i.innerSlider.pause('paused');
              }),
              (0, c.A)((0, s.A)(i), 'slickPlay', function () {
                return i.innerSlider.autoPlay('play');
              }),
              (i.state = { breakpoint: null }),
              (i._responsiveMediaHandlers = []),
              i
            );
          }
          return (
            (0, l.A)(n, [
              {
                key: 'media',
                value: function (e, t) {
                  var n = window.matchMedia(e),
                    i = function (e) {
                      e.matches && t();
                    };
                  (n.addListener(i),
                    i(n),
                    this._responsiveMediaHandlers.push({ mql: n, query: e, listener: i }));
                },
              },
              {
                key: 'componentDidMount',
                value: function () {
                  var e = this;
                  if (this.props.responsive) {
                    var t = this.props.responsive.map(function (e) {
                      return e.breakpoint;
                    });
                    (t.sort(function (e, t) {
                      return e - t;
                    }),
                      t.forEach(function (n, i) {
                        var r;
                        ((r =
                          0 === i
                            ? Z()({ minWidth: 0, maxWidth: n })
                            : Z()({ minWidth: t[i - 1] + 1, maxWidth: n })),
                          q() &&
                            e.media(r, function () {
                              e.setState({ breakpoint: n });
                            }));
                      }));
                    var n = Z()({ minWidth: t.slice(-1)[0] });
                    q() &&
                      this.media(n, function () {
                        e.setState({ breakpoint: null });
                      });
                  }
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  this._responsiveMediaHandlers.forEach(function (e) {
                    e.mql.removeListener(e.listener);
                  });
                },
              },
              {
                key: 'render',
                value: function () {
                  var e,
                    t,
                    n = this;
                  ((e = this.state.breakpoint
                    ? 'unslick' ===
                      (t = this.props.responsive.filter(function (e) {
                        return e.breakpoint === n.state.breakpoint;
                      }))[0].settings
                      ? 'unslick'
                      : (0, r.A)((0, r.A)((0, r.A)({}, $), this.props), t[0].settings)
                    : (0, r.A)((0, r.A)({}, $), this.props)).centerMode &&
                    (e.slidesToScroll, (e.slidesToScroll = 1)),
                    e.fade &&
                      (e.slidesToShow,
                      e.slidesToScroll,
                      (e.slidesToShow = 1),
                      (e.slidesToScroll = 1)));
                  var o = u.Children.toArray(this.props.children);
                  ((o = o.filter(function (e) {
                    return 'string' == typeof e ? !!e.trim() : !!e;
                  })),
                    e.variableWidth &&
                      (e.rows > 1 || e.slidesPerRow > 1) &&
                      (console.warn(
                        'variableWidth is not supported in case of rows > 1 or slidesPerRow > 1',
                      ),
                      (e.variableWidth = !1)));
                  for (var l = [], s = null, a = 0; a < o.length; a += e.rows * e.slidesPerRow) {
                    for (var d = [], c = a; c < a + e.rows * e.slidesPerRow; c += e.slidesPerRow) {
                      for (
                        var p = [], f = c;
                        f < c + e.slidesPerRow &&
                        (e.variableWidth && o[f].props.style && (s = o[f].props.style.width),
                        !(f >= o.length));
                        f += 1
                      )
                        p.push(
                          u.cloneElement(o[f], {
                            key: 100 * a + 10 * c + f,
                            tabIndex: -1,
                            style: {
                              width: ''.concat(100 / e.slidesPerRow, '%'),
                              display: 'inline-block',
                            },
                          }),
                        );
                      d.push(u.createElement('div', { key: 10 * a + c }, p));
                    }
                    e.variableWidth
                      ? l.push(u.createElement('div', { key: a, style: { width: s } }, d))
                      : l.push(u.createElement('div', { key: a }, d));
                  }
                  if ('unslick' === e) {
                    var h = 'regular slider ' + (this.props.className || '');
                    return u.createElement('div', { className: h }, o);
                  }
                  return (
                    l.length <= e.slidesToShow && (e.unslick = !0),
                    u.createElement(
                      J,
                      (0, i.A)({ style: this.props.style, ref: this.innerSliderRefHandler }, e),
                      l,
                    )
                  );
                },
              },
            ]),
            n
          );
        })(u.Component);
    },
  },
]);
