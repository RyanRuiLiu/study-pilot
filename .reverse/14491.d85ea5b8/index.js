'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [14491],
  {
    450080: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(62387);
      function u(e) {
        return (
          (u =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          u(e)
        );
      }
      function a(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function l(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != u(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != u(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == u(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var d = 'https://www.icourse163.org/';
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_COMBO_ORDER_GUIDE),
            (0, o.switchMap)(function (e) {
              var t = e.productList;
              return u({
                url: 'http://www.icourse163.org/web/j/mocPostGradeOrderRPCBean.getComboSaleActivityRelGuide.rpc',
                body: { productList: t },
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? c({ type: i.Type.FETCH_ERROR }, e)
                : { type: i.Type.GET_COMBO_ORDER_GUIDE_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_COMBO_SALE_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.data,
                r = t.moduleId
                  ? ''.concat(d, 'web/j/channelBean.getMocActivityMultiProductVoByModuleID.rpc')
                  : 'https://www.icourse163.org/web/j/mocPostGradeOrderRPCBean.getComboSaleActivityVoByProduct.rpc';
              return u({ url: r, body: t });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? c({ type: i.Type.FETCH_ERROR }, e)
                : { type: i.Type.GET_COMBO_SALE_DATA_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_COMBO_SALE_PRICE),
            (0, o.switchMap)(function (e) {
              var t = e.data,
                r = e.callback;
              return new Promise(function (e) {
                u({
                  url: ''.concat(
                    d,
                    'web/j/mocPostGradeOrderRPCBean.getComboSaleActivityImputedPriceVo.rpc',
                  ),
                  body: { comboSaleProductParams: JSON.stringify(t) },
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (r(e), e);
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? c({ type: i.Type.FETCH_ERROR }, e)
                : { type: i.Type.GET_COMBO_SALE_PRICE_SUCCESS, data: e };
            }),
          );
        },
        function (e, t) {
          return e.pipe(
            (0, n.ofType)(i.Type.SET_COMBO_SALE_DATA),
            (0, o.map)(function (e) {
              var r = e.data,
                n = r.parent,
                o = void 0 === n ? {} : n,
                u = r.child,
                a = void 0 === u ? {} : u,
                c = t.value.kaoyan.comboSaleData,
                l = c.comboSaleCategoryVos.findIndex(function (e) {
                  return e.id === o.id;
                });
              return (
                c.comboSaleCategoryVos[l].comboSaleProductVos.forEach(function (e) {
                  e.hasEnroll = e.productId === a.productId ? a.hasEnroll : e.hasEnroll;
                }),
                { type: i.Type.SET_COMBO_SALE_DATA_SUCCESS, data: c }
              );
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.CHANNEL_MAIN_HUBBLE_TRACKER),
            (0, o.mergeMap)(function (e) {
              var t = e.data;
              return u({
                url: ''.concat(d, 'web/j/adsTraceStatisticsBean.collectClickTraceOnPosition.rpc'),
                body: c({}, t),
                raw: !0,
              });
            }),
            (0, o.map)(function (e) {
              return (
                null != e && e.errType && console.error(e),
                { type: i.Type.CHANNEL_MAIN_HUBBLE_TRACKER_SUCCESS, data: e }
              );
            }),
          );
        },
      ];
    },
    62387: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328);
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      function i(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function a(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != o(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != o(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == o(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var c = (0, n.createActions)({
          getComboSaleData: ['data'],
          getComboSaleDataSuccess: null,
          getComboSalePrice: ['data', 'callback'],
          getComboSalePriceSuccess: null,
          setComboSaleData: ['data'],
          setComboSaleDataSuccess: null,
          getComboOrderGuide: ['productList'],
          getComboOrderGuideSuccess: null,
          fetchError: null,
          channelMainHubbleTracker: ['data'],
          channelMainHubbleTrackerSuccess: null,
        }),
        l = c.Types,
        d = c.Creators,
        p = ((t.Creator = d), (t.Type = l)),
        s = { comboSaleData: null, comboSalePrice: null, comboOrderGuideInfo: {} };
      t.default = (0, n.createReducer)(
        s,
        a(
          a(
            a(
              a(
                a(
                  a({}, l.GET_COMBO_SALE_DATA_SUCCESS, function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return u(
                      u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { comboSaleData: e.data },
                    );
                  }),
                  l.SET_COMBO_SALE_DATA_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return u(
                      u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { comboSaleData: e.data },
                    );
                  },
                ),
                l.GET_COMBO_SALE_PRICE_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return u(
                    u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                    {},
                    { comboSalePrice: e.data },
                  );
                },
              ),
              l.FETCH_ERROR,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return u(
                  u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { error: { msg: e.msg, errType: e.errType } },
                );
              },
            ),
            l.GET_COMBO_ORDER_GUIDE_SUCCESS,
            function () {
              var e,
                t = arguments.length > 1 ? arguments[1] : void 0;
              return u(
                u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                { comboOrderGuideInfo: null !== (e = t.data) && void 0 !== e ? e : {} },
              );
            },
          ),
          p.CHANNEL_MAIN_HUBBLE_TRACKER_SUCCESS,
          function () {
            return u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s);
          },
        ),
      );
    },
    694183: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.SHARE_GUIDE_TIP =
          t.SCAN_TIP_IMG =
          t.LOTTERY_TARGET_TYPE =
          t.DRAW_LIST_LENGTH =
          t.DRAW_ITEM_FRONT =
          t.DRAW_ITEM_BACK =
          t.DEFAULT_NICK_NAME =
          t.DEFAULT_AVATAR_IMG =
            void 0),
        (t.DRAW_LIST_LENGTH = 6),
        (t.LOTTERY_TARGET_TYPE = 20),
        (t.DEFAULT_NICK_NAME = 'MOOC用户'),
        (t.DRAW_ITEM_BACK =
          'http://edu-image.nosdn.127.net/523b488060044656a29d075ae6259eba.png?imageView&quality=100'),
        (t.DRAW_ITEM_FRONT =
          'http://edu-image.nosdn.127.net/4a30565b088a46039062b8029e493b8f.GIF?imageView&quality=100'),
        (t.SCAN_TIP_IMG =
          'http://edu-image.nosdn.127.net/b8c412774ecd4a0399214a972f6300f9.png?imageView&quality=100'),
        (t.DEFAULT_AVATAR_IMG =
          'http://edu-image.nosdn.127.net/f4622ef6fd8e4ea9bab91f2a447b74f8.png?imageView&quality=100'),
        (t.SHARE_GUIDE_TIP = '点击分享给好友，增加抽卡机会'));
    },
    115761: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(694183),
        u = r(52395),
        a = r(138525);
      t.default = [
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.LOTTERY_INVITE),
            (0, o.switchMap)(function (e) {
              var t = e.mocLotteryId,
                r = e.inviterId;
              return i({
                body: { inviterId: r, mocLotteryId: t },
                url: '/web/j/mocLotteryBean.lotteryInvite.rpc',
              });
            }),
            (0, o.map)(function (e) {
              return { type: u.Type.LOTTERY_INVITE_SUCCESS, data: null != e ? e : null };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.DO_LOTTERY_AWARD),
            (0, o.switchMap)(function (e) {
              var t = e.mocLotteryId;
              return i({
                body: { mocLotteryId: t },
                raw: !0,
                url: '/web/j/mocLotteryBean.doLotteryAward.rpc',
              });
            }),
            (0, o.map)(function (e) {
              var t = e || {},
                r = t.code,
                n = t.message,
                o = t.result;
              return 0 === r
                ? { type: u.Type.DO_LOTTERY_AWARD_SUCCESS, data: null != o ? o : null }
                : { type: a.Type.SHOW_ERR_MSG, msg: n || '抽奖失败，请重试' };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.GET_USER_AWARD_LIST),
            (0, o.switchMap)(function (e) {
              var t = e.mocLotteryId;
              return i({
                body: { mocLotteryId: t },
                raw: !0,
                url: '/web/j/mocLotteryBean.getAwardListByLotteryId.rpc',
              });
            }),
            (0, o.map)(function (e) {
              var t = e || {},
                r = t.code,
                n = t.message,
                o = t.result;
              return 0 === r
                ? { type: u.Type.GET_USER_AWARD_LIST_SUCCESS, data: null != o ? o : null }
                : { type: a.Type.SHOW_ERR_MSG, msg: n || '获取卡牌列表失败' };
            }),
          );
        },
        function (e, t, r) {
          var c = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.GET_LOTTERY_COMMON_INFO),
            (0, o.switchMap)(function () {
              return c({
                body: { targetType: i.LOTTERY_TARGET_TYPE },
                raw: !0,
                url: '/web/j/mocLotteryBean.getOddNumsByLotteryType.rpc',
              });
            }),
            (0, o.map)(function (e) {
              var t = e || {},
                r = t.code,
                n = t.message,
                o = t.result;
              return 0 === r
                ? { type: u.Type.GET_LOTTERY_COMMON_INFO_SUCCESS, data: null != o ? o : null }
                : { type: a.Type.SHOW_ERR_MSG, msg: n || '查询活动信息失败' };
            }),
          );
        },
      ];
    },
    52395: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328);
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      function i(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function a(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != o(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != o(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == o(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var c = (0, n.createActions)({
          getLotteryCommonInfo: ['targetType'],
          getLotteryCommonInfoSuccess: ['lotteryCommonInfo'],
          getUserAwardList: ['mocLotteryId'],
          getUserAwardListSuccess: ['userAwardList'],
          lotteryInvite: ['mocLotteryId', 'inviterId'],
          lotteryInviteSuccess: null,
          doLotteryAward: ['mocLotteryId'],
          doLotteryAwardSuccess: ['lotteryAwardDetail'],
        }),
        l = (t.Type = c.Types),
        d =
          ((t.Creator = c.Creators),
          { lotteryCommonInfo: {}, userAwardList: [], lotteryAwardDetail: {} });
      t.default = (0, n.createReducer)(
        d,
        a(
          a(
            a(
              a({}, l.GET_LOTTERY_COMMON_INFO_SUCCESS, function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return u(
                  u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  {},
                  { lotteryCommonInfo: e.data },
                );
              }),
              l.GET_USER_AWARD_LIST_SUCCESS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return u(
                  u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  {},
                  { userAwardList: e.data },
                );
              },
            ),
            l.LOTTERY_INVITE_SUCCESS,
            function () {
              return u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d);
            },
          ),
          l.DO_LOTTERY_AWARD_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
              {},
              { lotteryAwardDetail: e.data },
            );
          },
        ),
      );
    },
    942328: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = Object.freeze({
          BUY_METHOD_TYPE: 14,
          formed: { ING: 1, SUCCESS_NO_PAY: 2, FAIL_NO_PAY: 3, PAYED: 4, TIMEOUT_TO_PAY: 5 },
          targetType: { LIVE: 1, COURSE_PACKAGE: 2, COURSE: 3, TEACHER: 4, COLUMN: 5 },
          urls: {
            LOGIN_URL: '//www.icourse163.org/member/login.htm',
            ICOURSE_BASE_URL: '//www.icourse163.org',
            KAOYAN_BASE_URL: '//kaoyan.icourse163.org',
          },
          imgs: {
            DEFAULT_USER_AVATAR:
              '//edu-image.nosdn.127.net/49E89BEA3F1B3F1AC788F5F94C4A457F.png?imageView&thumbnail=96y96&quality=100',
            NOMAL_CUT_IMG:
              '//edu-image.nosdn.127.net/36324e7d8d4141ba9e493da03ad168d3.png?imageView&quality=100',
            LAST_CUT_IMG:
              '//edu-image.nosdn.127.net/f7eb5d6e7dc9411983f7a1733e5d83c0.png?imageView&quality=100',
            INVALID_CUT_IMG:
              '//edu-image.nosdn.127.net/2419fc4de9fc41e4903e5f7092306d4e.png?imageView&quality=100',
            POINTER_TOP_RIGHT_IMG:
              '//edu-image.nosdn.127.net/e468fb061090497ca5642f53d95a0eb6.png?imageView&quality=100',
            WEIXIN_TIP_BACKGROUND_IMG:
              '//edu-image.nosdn.127.net/4b1be1b11c5843a8a176e5d77354c0d4.png?imageView&quality=100',
          },
        })));
    },
    582033: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n,
        o = r(48816),
        i = r(832780),
        u = r(912440),
        a = (n = r(942328)) && n.__esModule ? n : { default: n };
      function c(e) {
        return (
          (c =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          c(e)
        );
      }
      function l(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function d(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? l(Object(r), !0).forEach(function (t) {
                p(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : l(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function p(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != c(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != c(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == c(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var s = p(
        p(
          p(
            p(
              p(
                p(
                  p({}, u.Type.GET_BARGAIN_DATA, '/web/j/activityTeamBean.getActivityTeamInfo.rpc'),
                  u.Type.CUT_PRICE,
                  '/web/j/activityTeamBean.helpBargain.rpc',
                ),
                u.Type.TRY_ENROLL_COLUMN,
                '/web/j/columnBean.tryAttendColumn.rpc',
              ),
              u.Type.TRY_ENROLL_COURSE,
              'https:'.concat(
                a.default.urls.KAOYAN_BASE_URL,
                '/web/j/kaoyanCourseBean.tryAttendTerm.rpc',
              ),
            ),
            u.Type.TRY_ENROLL_COURSE_PACKAGE,
            'https:'.concat(
              a.default.urls.KAOYAN_BASE_URL,
              '/web/j/kaoyanCourseBean.tryAttendCourse.rpc',
            ),
          ),
          u.Type.GET_NEW_BARGAIN_INFO,
          '/web/j/activityTeamBean.getActivityRelAndBargainInfoVo.rpc',
        ),
        u.Type.GET_WECHAT_ENTRY_STATUS,
        '/web/j/commonBean.obtain.rpc',
      );
      t.default = [
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_BARGAIN_DATA),
            (0, i.switchMap)(function (e) {
              var t = e.bargainId;
              return n({ url: s[u.Type.GET_BARGAIN_DATA], body: { activityTeamId: t } });
            }),
            (0, i.map)(function (e) {
              return null != e && e.errType
                ? d({ type: u.Type.FETCH_ERROR }, e)
                : { type: u.Type.GET_BARGAIN_DATA_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.CUT_PRICE),
            (0, i.switchMap)(function (e) {
              var t = e.bargainId;
              return n({ url: s[u.Type.CUT_PRICE], body: { bargainId: t } });
            }),
            (0, i.map)(function (e) {
              return null != e && e.errType
                ? d({ type: u.Type.FETCH_ERROR }, e)
                : e
                  ? { type: u.Type.CUT_PRICE_SUCCESS, cutData: e }
                  : void 0;
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.TRY_ENROLL_COLUMN),
            (0, i.switchMap)(function (e) {
              var t = e.columnId,
                r = e.activityId,
                o = e.teamId,
                i = e.buyMethodType;
              return n({
                url: s[u.Type.TRY_ENROLL_COLUMN],
                body: { columnId: t, activityId: r, teamId: o, buyMethodType: i },
              });
            }),
            (0, i.map)(function (e) {
              var t;
              if (
                (null !== (t = e) && void 0 !== t && t.errType) ||
                700 !== Number.parseInt(e, 10)
              ) {
                switch (Number.parseInt(e, 10)) {
                  case 0:
                    e = { msg: '你已参加课程，无法发起砍价' };
                    break;
                  case 701:
                    e = { msg: '砍价活动已结束' };
                    break;
                  case 702:
                    e = { msg: '砍价活动不存在' };
                    break;
                  case 703:
                    e = { msg: '砍价活动名额已满' };
                    break;
                  case 704:
                    e = { msg: '已存在有效的砍价单，请勿重新发起' };
                }
                return d({ type: u.Type.FETCH_ERROR }, e);
              }
              if (e) return { type: u.Type.TRY_ENROLL_COLUMN_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.TRY_ENROLL_COURSE),
            (0, i.switchMap)(function (e) {
              var t = e.termId,
                r = e.activityId,
                o = e.teamId,
                i = e.buyMethodType;
              return n({
                url: s[u.Type.TRY_ENROLL_COURSE],
                body: { termId: t, activityId: r, teamId: o, buyMethodType: i },
              });
            }),
            (0, i.map)(function (e) {
              var t;
              if (
                (null !== (t = e) && void 0 !== t && t.errType) ||
                700 !== Number.parseInt(e, 10)
              ) {
                switch (Number.parseInt(e, 10)) {
                  case 0:
                    e = { msg: '你已参加课程，无法发起砍价' };
                    break;
                  case 701:
                    e = { msg: '砍价活动已结束' };
                    break;
                  case 702:
                    e = { msg: '砍价活动不存在' };
                    break;
                  case 703:
                    e = { msg: '砍价活动名额已满' };
                    break;
                  case 704:
                    e = { msg: '已存在有效的砍价单，请勿重新发起' };
                }
                return d({ type: u.Type.FETCH_ERROR }, e);
              }
              if (e) return { type: u.Type.TRY_ENROLL_COURSE_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.TRY_ENROLL_COURSE_PACKAGE),
            (0, i.switchMap)(function (e) {
              var t = e.coursePackageId,
                r = e.activityId,
                o = e.teamId,
                i = e.buyMethodType;
              return n({
                url: s[u.Type.TRY_ENROLL_COURSE_PACKAGE],
                body: { coursePackageId: t, activityId: r, teamId: o, buyMethodType: i },
              });
            }),
            (0, i.map)(function (e) {
              var t;
              if (
                (null !== (t = e) && void 0 !== t && t.errType) ||
                700 !== Number.parseInt(e, 10)
              ) {
                switch (Number.parseInt(e, 10)) {
                  case 0:
                    e = { msg: '你已参加课程，无法发起砍价' };
                    break;
                  case 701:
                    e = { msg: '砍价活动已结束' };
                    break;
                  case 702:
                    e = { msg: '砍价活动不存在' };
                    break;
                  case 703:
                    e = { msg: '砍价活动名额已满' };
                    break;
                  case 704:
                    e = { msg: '已存在有效的砍价单，请勿重新发起' };
                }
                return d({ type: u.Type.FETCH_ERROR }, e);
              }
              if (e) return { type: u.Type.TRY_ENROLL_COURSE_PACKAGE_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_WECHAT_ENTRY_STATUS),
            (0, i.switchMap)(function () {
              return n({
                url: s[u.Type.GET_WECHAT_ENTRY_STATUS],
                body: { key: 'bargain-wx-entry-switch-status' },
              });
            }),
            (0, i.map)(function (e) {
              if (null != e && e.errType) return d({ type: u.Type.FETCH_ERROR }, e);
              if (e) {
                var t = null;
                try {
                  t = JSON.parse(e).isPublicEntry;
                } catch (e) {}
                return { type: u.Type.GET_WECHAT_ENTRY_STATUS_SUCCESS, wechatEntryStatus: t };
              }
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_NEW_BARGAIN_INFO),
            (0, i.switchMap)(function (e) {
              var t = e.targetId,
                r = e.mocActivityRelTargetType;
              return n({
                url: s[u.Type.GET_NEW_BARGAIN_INFO],
                body: { targetId: t, mocActivityRelTargetType: r },
              });
            }),
            (0, i.map)(function (e) {
              return null != e && e.errType
                ? d({ type: u.Type.FETCH_ERROR }, e)
                : e
                  ? { type: u.Type.GET_NEW_BARGAIN_INFO, res: e }
                  : void 0;
            }),
          );
        },
      ];
    },
    912440: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328);
      function i(e) {
        return (
          (i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          i(e)
        );
      }
      function u(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? u(Object(r), !0).forEach(function (t) {
                c(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : u(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != i(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != i(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == i(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var l = (0, o.createActions)({
          getBargainData: ['bargainId'],
          getBargainDataSuccess: null,
          cutPrice: ['bargainId'],
          cutPriceSuccess: null,
          setIsCut: null,
          setBargainWindow: ['g'],
          setBargainId: ['bargainId'],
          setActivityTimeout: null,
          setPayTimeout: null,
          setBargainTimeout: null,
          tryEnrollColumn: ['columnId', 'activityId', 'teamId', 'buyMethodType'],
          tryEnrollColumnSuccess: null,
          tryEnrollCourse: ['termId', 'activityId', 'teamId', 'buyMethodType'],
          tryEnrollCourseSuccess: null,
          tryEnrollCoursePackage: ['coursePackageId', 'activityId', 'teamId', 'buyMethodType'],
          tryEnrollCoursePackageSuccess: null,
          getNewBargainInfo: ['targetId', 'mocActivityRelTargetType'],
          getWechatEntryStatus: null,
          getWechatEntryStatusSuccess: null,
          fetchError: null,
        }),
        d = l.Types,
        p = l.Creators,
        s =
          ((t.Creator = p),
          (t.Type = d),
          {
            data: null,
            cutData: null,
            error: {},
            activityTimeout: !1,
            payTimeout: !1,
            bargainTimeout: !1,
            enrollColumn: null,
            enrollCourse: null,
            enrollCoursePackage: null,
            isCut: !1,
            wechatEntryStatus: null,
          });
      t.default = (0, o.createReducer)(
        s,
        (c(
          c(
            c(
              c(
                c(
                  c(
                    c(
                      c(
                        c(
                          c((n = {}), d.GET_BARGAIN_DATA_SUCCESS, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return a(
                              a(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              { data: e.data, cutData: null },
                            );
                          }),
                          d.SET_BARGAIN_WINDOW,
                          function () {
                            var e,
                              t = arguments.length > 1 ? arguments[1] : void 0;
                            return a(
                              a(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              { g: null !== (e = t.g) && void 0 !== e ? e : {} },
                            );
                          },
                        ),
                        d.CUT_PRICE_SUCCESS,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return a(
                            a(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                            ),
                            {},
                            { cutData: e.cutData },
                          );
                        },
                      ),
                      d.SET_IS_CUT,
                      function () {
                        return a(
                          a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                          {},
                          { isCut: !0 },
                        );
                      },
                    ),
                    d.SET_BARGAIN_ID,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return a(
                        a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                        {},
                        { bargainId: e.bargainId },
                      );
                    },
                  ),
                  d.SET_ACTIVITY_TIMEOUT,
                  function () {
                    return a(
                      a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { activityTimeout: !0 },
                    );
                  },
                ),
                d.SET_PAY_TIMEOUT,
                function () {
                  return a(
                    a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                    {},
                    { payTimeout: !0 },
                  );
                },
              ),
              d.SET_BARGAIN_TIMEOUT,
              function () {
                return a(
                  a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { bargainTimeout: !0 },
                );
              },
            ),
            d.TRY_ENROLL_COLUMN_SUCCESS,
            function () {
              return a(
                a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                { enrollColumn: !0 },
              );
            },
          ),
          d.TRY_ENROLL_COURSE_SUCCESS,
          function () {
            return a(
              a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
              {},
              { enrollCourse: !0 },
            );
          },
        ),
        c(
          c(
            c(
              c(n, d.TRY_ENROLL_COURSE_PACKAGE_SUCCESS, function () {
                return a(
                  a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { enrollCoursePackage: !0 },
                );
              }),
              d.GET_NEW_BARGAIN_INFO,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return a(
                  a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { newBargainInfo: e.res },
                );
              },
            ),
            d.GET_WECHAT_ENTRY_STATUS_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return a(
                a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                { wechatEntryStatus: e.wechatEntryStatus },
              );
            },
          ),
          d.FETCH_ERROR,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return a(
              a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
              {},
              { error: { msg: e.msg, errType: e.errType } },
            );
          },
        )),
      );
    },
    157374: (e, t, r) => {
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o = r(48816),
        i = r(832780),
        u = r(906341),
        a = ['actionId'];
      function c(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? c(Object(r), !0).forEach(function (t) {
                d(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : c(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function d(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != n(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != n(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == n(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function p(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return f(e);
          })(e) ||
          (function (e) {
            if (
              ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e);
          })(e) ||
          s(e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function s(e, t) {
        if (e) {
          if ('string' == typeof e) return f(e, t);
          var r = {}.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? f(e, t)
                : void 0
          );
        }
      }
      function f(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      var y = null;
      t.default = [
        function (e, t) {
          return e.pipe(
            (0, o.ofType)(u.Type.HUBBLE_TRACKER_CHANNEL),
            (0, i.switchMap)(function (e) {
              var r = e.query,
                n = t.value.main.channel.channelId,
                o = t.value.main.channel.name,
                i = t.value.main.channel.g,
                u = r.actionId,
                c = (function (e, t) {
                  if (null == e) return {};
                  var r,
                    n,
                    o = (function (e, t) {
                      if (null == e) return {};
                      var r = {};
                      for (var n in e)
                        if ({}.hasOwnProperty.call(e, n)) {
                          if (-1 !== t.indexOf(n)) continue;
                          r[n] = e[n];
                        }
                      return r;
                    })(e, t);
                  if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++)
                      ((r = i[n]),
                        -1 === t.indexOf(r) && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]));
                  }
                  return o;
                })(r, a),
                l = Object.assign(
                  {},
                  {
                    pagename: 'channelpage',
                    user_id: i.webUser && i.webUser.id,
                    channel_id: n,
                    channel_name: o,
                  },
                  c,
                );
              return (
                (u = u.endsWith('-iaw') ? u : ''.concat(u, '-iaw')),
                console.log('hubble打点成功-频道页，actionId:', u),
                i.DATracker && i.DATracker.track(u, l),
                []
              );
            }),
          );
        },
        function (e, t, r) {
          var n,
            a,
            c = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_COURSE_LIST),
            (0, i.switchMap)(function (e) {
              var t = e.query;
              return (
                (a = t.pageIndex),
                (n = t.shouldConcatData),
                c({
                  url: '/web/j/mocSearchBean.searchCourseCardByChannelAndCategoryId.rpc',
                  body: { mocCourseQueryVo: JSON.stringify(t) },
                })
              );
            }),
            (0, i.map)(function (e) {
              var r,
                n = t.value.main.channel.channelId,
                o = (function (e) {
                  var t = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                  if (!t) {
                    if (Array.isArray(e) || (t = s(e))) {
                      t && (e = t);
                      var r = 0,
                        n = function () {};
                      return {
                        s: n,
                        n: function () {
                          return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
                        },
                        e: function (e) {
                          throw e;
                        },
                        f: n,
                      };
                    }
                    throw new TypeError(
                      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                  }
                  var o,
                    i = !0,
                    u = !1;
                  return {
                    s: function () {
                      t = t.call(e);
                    },
                    n: function () {
                      var e = t.next();
                      return ((i = e.done), e);
                    },
                    e: function (e) {
                      ((u = !0), (o = e));
                    },
                    f: function () {
                      try {
                        i || null == t.return || t.return();
                      } finally {
                        if (u) throw o;
                      }
                    },
                  };
                })((null == e ? void 0 : e.list) || []);
              try {
                for (o.s(); !(r = o.n()).done;) {
                  var i = r.value,
                    u = i.mocCourseKyCardBulkPurchaseVo;
                  (401 == i.type ||
                    ((null == u ? void 0 : u.courseRecommendTargetId) &&
                      1 == (null == u ? void 0 : u.courseRecommendTargetType))) &&
                    window.DATracker &&
                    window.DATracker.track('频道页-全部课程列表成人课程展示-iaw', {
                      pagename: 'channel',
                      course_id: null == i ? void 0 : i.id,
                      channel_id: n,
                      user_id: window.webUser && window.webUser.id,
                    });
                }
              } catch (e) {
                o.e(e);
              } finally {
                o.f();
              }
              return e;
            }),
            (0, i.map)(function (e) {
              var t, r;
              return {
                type: e ? u.Type.GET_COURSE_LIST_SUCCESS : u.Type.GET_COURSE_LIST_FAILED,
                courseList: (null == e ? void 0 : e.list) || [],
                totlePageCount:
                  (null == e || null === (t = e.query) || void 0 === t
                    ? void 0
                    : t.totlePageCount) || 0,
                total:
                  (null == e || null === (r = e.query) || void 0 === r ? void 0 : r.totleCount) ||
                  0,
                shouldConcatData: n,
                pageIndex: a,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_CHANNEL_SETTING),
            (0, i.switchMap)(function (e) {
              var t = e.channelId;
              return n({
                url: '/web/j/channelBean.getChannelSettingInfo.rpc',
                body: { channelId: t },
              });
            }),
            (0, i.map)(function (e) {
              return {
                type: u.Type.GET_CHANNEL_SETTING_SUCCESS,
                name: null == e ? void 0 : e.name,
                shortDesc: null == e ? void 0 : e.shortDesc,
                weight: null == e ? void 0 : e.weight,
                channelConfig: {
                  defaultChannel: !(null == e || !e.defaultChannel),
                  charge: !(null == e || !e.charge),
                  includeLearningProgress: !(null == e || !e.includeLearningProgress),
                  newGiftBag: !(null == e || !e.newGiftBag),
                  suportNavigationType: 2 === (null == e ? void 0 : e.suportNavigationType),
                },
                channelModuleSettings: null == e ? void 0 : e.channelModuleSettings,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_CHILD_CHANNEL_LIST),
            (0, i.switchMap)(function (e) {
              var t = e.channelId,
                r = e.callback;
              return new Promise(function (e) {
                return n({
                  url: '/web/j/channelBean.listChildrenChannel.rpc',
                  body: { channelId: t },
                }).subscribe(function () {
                  for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
                    n[o] = arguments[o];
                  (null == r || r.apply(void 0, n), e.apply(void 0, n));
                });
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_CHILD_CHANNEL_LIST_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_CATEGORY),
            (0, i.switchMap)(function (e) {
              var t = e.channelId;
              return n({
                url: '/web/j/channelBean.listMocChannelCategoryRel.rpc',
                body: { channelId: t },
              });
            }),
            (0, i.map)(function (e) {
              var r = (function (e) {
                  if (null == e || !e.length) return [];
                  var t = e.map(function (e) {
                    var t,
                      r =
                        null != e && null !== (t = e.children) && void 0 !== t && t.length
                          ? [{ id: e.id, name: '全部', children: [], parentId: e.parentId }].concat(
                              p(e.children),
                            )
                          : [];
                    return l(l({}, e), {}, { children: r });
                  });
                  return [{ id: -1, name: '全部', children: [], parentId: -1 }].concat(p(t));
                })(e),
                n = (function (e, t) {
                  var r = null;
                  return (
                    (e || []).forEach(function (e) {
                      var n;
                      (e.id == t && (r = e),
                        !r &&
                          null != e &&
                          null !== (n = e.children) &&
                          void 0 !== n &&
                          n.length &&
                          (r =
                            null == e
                              ? void 0
                              : e.children.find(function (e) {
                                  return e.id == t;
                                })));
                    }),
                    r || e[0]
                  );
                })(r, t.value.main.channel.categoryId);
              return { type: u.Type.GET_CATEGORY_SUCCESS, category: r, categorySel: n };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_ALL_CATEGORY),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({
                url: '/web/j/channelBean.getCourseCategoryDtoList.rpc',
                body: { moduleId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_ALL_CATEGORY_SUCCESS, allCategory: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch,
            a = '';
          return e.pipe(
            (0, o.ofType)(u.Type.GET_CUSTOM_COURSE),
            (0, i.mergeMap)(function (e) {
              var t = e.moduleId,
                r = e.callback,
                o = e.moduleName;
              return (
                (a = o),
                new Promise(function (e) {
                  return n({
                    url: '/web/j/channelBean.getCustomCourseModuleVo.rpc',
                    body: { moduleId: t },
                  }).subscribe(function () {
                    for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
                      n[o] = arguments[o];
                    (null == r || r.apply(void 0, n), e.apply(void 0, n));
                  });
                })
              );
            }),
            (0, i.map)(function (e) {
              var r = t.value.main.channel.channelId,
                n = t.value.main.channel.g;
              return (
                ((null == e ? void 0 : e.courses) || []).forEach(function (e) {
                  var t,
                    o,
                    i,
                    u = e.mocCourseKyCardBulkPurchaseVo;
                  (401 == e.type ||
                    ((null == u ? void 0 : u.courseRecommendTargetId) &&
                      1 == (null == u ? void 0 : u.courseRecommendTargetType))) &&
                    (null === (t = window) ||
                      void 0 === t ||
                      null === (o = t.DATracker) ||
                      void 0 === o ||
                      o.track('频道页-自定义模块成人课程展示-iaw', {
                        pagename: 'channel',
                        user_id:
                          null == n || null === (i = n.webUser) || void 0 === i ? void 0 : i.id,
                        course_id: null == e ? void 0 : e.id,
                        channel_id: r,
                        module_name: a,
                      }));
                }),
                e
              );
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_CUSTOM_COURSE_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_TAB_LIST),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId,
                r = e.callback;
              return new Promise(function (e) {
                return n({
                  url: '/web/j/channelBean.listCustomCourseTabDto.rpc',
                  body: { tabCustomModuleId: t },
                }).subscribe(function () {
                  for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
                    n[o] = arguments[o];
                  (null == r || r.apply(void 0, n), e.apply(void 0, n));
                });
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_TAB_LIST_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_TOP_TEACHER),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({
                url: '/web/j/channelBean.getTopTeacherDtoList.rpc',
                body: { moduleId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_TOP_TEACHER_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_PROMOTE_LIST),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({
                url: '/web/j/channelBean.getPromoteLinkDtoList.rpc',
                body: { moduleId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_PROMOTE_LIST_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_LIVE_LIST),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({ url: '/web/j/channelBean.getLiveDtoList.rpc', body: { moduleId: t } });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_LIVE_LIST_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_VIDEO_LIST),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({
                url: '/web/j/channelBean.getVideoRecommendDtos.rpc',
                body: { moduleId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_VIDEO_LIST_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_BANNER),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({ url: '/web/j/channelBean.getBannerDtoList.rpc', body: { moduleId: t } });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_BANNER_SUCCESS, banner: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_COURSE_CATEGORY),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({
                url: '/web/j/channelBean.getCourseCategoryDtoList.rpc',
                body: { moduleId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_COURSE_CATEGORY_SUCCESS, levelOneCategory: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_CHANNEL_COMBO_SALE_LIST),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({
                url: '/web/j/channelBean.getMocActivityMultiProductVoByModuleID.rpc',
                body: { moduleId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_CHANNEL_COMBO_SALE_LIST_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_CHANNEL_COMBO_SALE_PRICE),
            (0, i.switchMap)(function (e) {
              var t = e.list,
                r = e.ifAdultComboSale,
                o = void 0 !== r && r,
                i = e.activityId;
              return (
                (y = t),
                n(
                  o
                    ? {
                        url: '/web/j/mocPostGradeOrderRPCBean.getAdultComboSaleActivityImputedPriceVo.rpc',
                        body: {
                          activityId: i,
                          adultIdList: JSON.stringify(
                            t.map(function (e) {
                              return e.productId;
                            }),
                          ),
                        },
                      }
                    : {
                        url: '/web/j/mocPostGradeOrderRPCBean.getComboSaleActivityImputedPriceVo.rpc',
                        body: { comboSaleProductParams: JSON.stringify(t) },
                      },
                )
              );
            }),
            (0, i.map)(function (e) {
              return { originList: y, type: u.Type.GET_CHANNEL_COMBO_SALE_PRICE_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_HEAD_PHOTO),
            (0, i.switchMap)(function (e) {
              var t = e.moduleId;
              return n({ url: '/web/j/channelBean.getHeadPhotoDto.rpc', body: { moduleId: t } });
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_HEAD_PHOTO_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(u.Type.GET_BIG_PHOTO),
            (0, i.mergeMap)(function (e) {
              var t = e.moduleId;
              return n({
                url: '/web/j/channelBean.getBigPhotoDto.rpc',
                body: { moduleId: t },
              }).pipe(
                (0, i.map)(function (e) {
                  return l({ moduleId: t }, e);
                }),
              );
            }),
            (0, i.map)(function (e) {
              return { type: u.Type.GET_BIG_PHOTO_SUCCESS, res: e };
            }),
          );
        },
      ];
    },
    906341: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328);
      function i(e) {
        return (
          (i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          i(e)
        );
      }
      function u(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? u(Object(r), !0).forEach(function (t) {
                c(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : u(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != i(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != i(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == i(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var l = (0, o.createActions)({
          getCourseList: ['query'],
          getCourseListSuccess: null,
          getCourseListFailed: null,
          getCategory: ['channelId'],
          getCategorySuccess: null,
          getAllCategory: ['moduleId'],
          getAllCategorySuccess: null,
          getChannelSetting: ['channelId'],
          getChannelSettingSuccess: null,
          getChildChannelList: ['channelId', 'callback'],
          getChildChannelListSuccess: null,
          setCategoryColor: ['categoryColor'],
          setChannelWindow: ['g'],
          setChannelUserInfo: ['userInfo'],
          setChannelId: ['channelId'],
          setChildChannelId: ['channelId'],
          selectCategory: ['categorySel'],
          updateFilter: ['filter'],
          getTabList: ['moduleId', 'callback'],
          getTabListSuccess: null,
          getCustomCourse: ['moduleId', 'callback', 'moduleName'],
          getCustomCourseSuccess: null,
          getTopTeacher: ['moduleId'],
          getTopTeacherSuccess: null,
          getPromoteList: ['moduleId'],
          getPromoteListSuccess: null,
          getLiveList: ['moduleId'],
          getLiveListSuccess: null,
          getVideoList: ['moduleId'],
          getVideoListSuccess: null,
          getBanner: ['moduleId'],
          getBannerSuccess: null,
          getCourseCategory: ['moduleId'],
          getCourseCategorySuccess: null,
          fixedTop: ['isFixedTop'],
          setCategoryHeight: ['categoryHeight'],
          setCategoryId: ['categoryId'],
          fixedCategory: ['isFixedCategory'],
          hubbleTracker: ['query'],
          getChannelComboSaleList: ['moduleId'],
          getChannelComboSaleListSuccess: null,
          getChannelComboSalePrice: ['list', 'ifAdultComboSale', 'activityId'],
          getChannelComboSalePriceSuccess: null,
          resetChannelComboSalePrice: null,
          getHeadPhoto: ['moduleId'],
          getHeadPhotoSuccess: null,
          getBigPhoto: ['moduleId'],
          getBigPhotoSuccess: null,
        }),
        d = l.Types,
        p = l.Creators,
        s =
          ((t.Creator = p),
          (t.Type = d),
          {
            channelId: '',
            name: '',
            courseList: [],
            category: [],
            allCategory: [],
            categorySel: null,
            categoryId: -1,
            shortDesc: '',
            weight: '',
            channelConfig: {
              defaultChannel: !1,
              charge: !1,
              includeLearningProgress: !1,
              newGiftBag: !1,
            },
            categoryColor: { preColor: null, color: null },
            channelModuleSettings: [],
            childChannelId: null,
            childrenChannelDtoList: [],
            g: {},
            filter: { orderBy: 0, stats: 30, pageIndex: 1, pageSize: 20 },
            videoList: [],
            totlePageCount: 0,
            total: 0,
            customCourseList: [],
            customTabList: [],
            needChargeInfoShow: !1,
            banner: [],
            levelOneCategory: [],
            isFixedTop: !1,
            categoryHeight: 0,
            isFixedCategory: !1,
            comboSaleOriginalPriceMap: {},
            comboSaleData: {},
            oriCombosaleData: {},
            comboSalePriceData: {},
            comboSaleHasEnrollProductList: [],
            headerImage: {},
            bigImageDto: {},
          }),
        f = function (e, t) {
          if (t) {
            var r = t.moduleId,
              n = (e.push({ id: r, list: t }), {});
            e = e.reduce(function (e, t) {
              return (!n[t.id] && (n[t.id] = e.push(t)), e);
            }, []);
          }
          return e;
        },
        y = function (e, t, r, n) {
          return r.map(function (r) {
            var o = r.comboSaleProductVos.map(function (r) {
              var o,
                i = t.find(function (e) {
                  return e.productId === r.productId;
                });
              if (
                null == n
                  ? void 0
                  : n.find(function (e) {
                      return e.productId === r.productId;
                    })
              )
                return a(a({}, r), {}, { hasEnroll: !0 });
              var u =
                  null !== (o = i || e.comboSaleOriginalPriceMap[r.productId]) && void 0 !== o
                    ? o
                    : {},
                c = u.price,
                l = u.discountPrice;
              return a(a({}, r), {}, { price: c, discountPrice: l });
            });
            return a(a({}, r), {}, { comboSaleProductVos: o });
          });
        };
      t.default = (0, o.createReducer)(
        s,
        (c(
          c(
            c(
              c(
                c(
                  c(
                    c(
                      c(
                        c(
                          c((n = {}), d.GET_COURSE_LIST_SUCCESS, function () {
                            var e =
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              t = arguments.length > 1 ? arguments[1] : void 0,
                              r = t.courseList,
                              n = t.shouldConcatData,
                              o = t.pageIndex;
                            return (
                              n && 1 != o && (r = (e.courseList || []).concat(t.courseList)),
                              a(
                                a({}, e),
                                {},
                                { courseList: r, totlePageCount: t.totlePageCount, total: t.total },
                              )
                            );
                          }),
                          d.GET_COURSE_LIST_FAILED,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return a(
                              a(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              {
                                courseList: e.courseList,
                                totlePageCount: e.totlePageCount,
                                total: e.total,
                              },
                            );
                          },
                        ),
                        d.GET_CATEGORY_SUCCESS,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return a(
                            a(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                            ),
                            {},
                            { category: e.category, categorySel: e.categorySel },
                          );
                        },
                      ),
                      d.GET_ALL_CATEGORY_SUCCESS,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return a(
                          a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                          {},
                          { allCategory: e.allCategory },
                        );
                      },
                    ),
                    d.GET_CHANNEL_SETTING_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return a(
                        a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                        e,
                      );
                    },
                  ),
                  d.GET_TAB_LIST_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return a(
                      a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { customTabList: e.res },
                    );
                  },
                ),
                d.SELECT_CATEGORY,
                function () {
                  var e,
                    t = arguments.length > 1 ? arguments[1] : void 0;
                  return a(
                    a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                    {},
                    {
                      categorySel: t.categorySel,
                      categoryId:
                        (null === (e = t.categorySel) || void 0 === e ? void 0 : e.id) || -1,
                      isFixedTop: !0,
                      filter: { orderBy: 0, stats: 30, pageIndex: 1, pageSize: 20 },
                    },
                  );
                },
              ),
              d.UPDATE_FILTER,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return a(
                  a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { filter: e.filter },
                );
              },
            ),
            d.SET_CATEGORY_COLOR,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return a(
                a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                { categoryColor: e.categoryColor || { preColor: null, color: null } },
              );
            },
          ),
          d.SET_CHANNEL_WINDOW,
          function () {
            var e,
              t = arguments.length > 1 ? arguments[1] : void 0;
            return a(
              a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
              {},
              { g: null !== (e = t.g) && void 0 !== e ? e : {} },
            );
          },
        ),
        c(
          c(
            c(
              c(
                c(
                  c(
                    c(
                      c(
                        c(
                          c(n, d.SET_CHANNEL_USER_INFO, function () {
                            var e,
                              t = arguments.length > 1 ? arguments[1] : void 0;
                            return a(
                              a(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              { userInfo: null !== (e = t.userInfo) && void 0 !== e ? e : {} },
                            );
                          }),
                          d.SET_CHANNEL_ID,
                          function () {
                            var e,
                              t = arguments.length > 1 ? arguments[1] : void 0;
                            return a(
                              a(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              { channelId: null !== (e = t.channelId) && void 0 !== e ? e : {} },
                            );
                          },
                        ),
                        d.SET_CHILD_CHANNEL_ID,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return a(
                            a(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                            ),
                            {},
                            { childChannelId: e.channelId || null },
                          );
                        },
                      ),
                      d.GET_CUSTOM_COURSE_SUCCESS,
                      function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                          t = arguments.length > 1 ? arguments[1] : void 0;
                        return a(a({}, e), {}, { customCourseList: f(e.customCourseList, t.res) });
                      },
                    ),
                    d.GET_TOP_TEACHER_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return a(
                        a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                        {},
                        { topTeacherList: e.res },
                      );
                    },
                  ),
                  d.GET_PROMOTE_LIST_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return a(
                      a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { promoteList: e.res },
                    );
                  },
                ),
                d.GET_LIVE_LIST_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return a(
                    a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                    {},
                    { liveList: e.res },
                  );
                },
              ),
              d.GET_VIDEO_LIST_SUCCESS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return a(
                  a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { videoList: e.res || [] },
                );
              },
            ),
            d.GET_CHILD_CHANNEL_LIST_SUCCESS,
            function () {
              var e,
                t = arguments.length > 1 ? arguments[1] : void 0;
              return a(
                a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                {
                  childrenChannelDtoList:
                    (null === (e = t.res) || void 0 === e ? void 0 : e.childrenChannelDtoList) ||
                    [],
                },
              );
            },
          ),
          d.GET_BANNER_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return a(
              a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
              {},
              { banner: e.banner },
            );
          },
        ),
        c(
          c(
            c(
              c(
                c(
                  c(
                    c(
                      c(
                        c(
                          c(n, d.GET_COURSE_CATEGORY_SUCCESS, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return a(
                              a(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              { levelOneCategory: e.levelOneCategory },
                            );
                          }),
                          d.FIXED_TOP,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return a(
                              a(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              { isFixedTop: e.isFixedTop },
                            );
                          },
                        ),
                        d.SET_CATEGORY_HEIGHT,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return a(
                            a(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                            ),
                            {},
                            { categoryHeight: e.categoryHeight },
                          );
                        },
                      ),
                      d.SET_CATEGORY_ID,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return a(
                          a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                          {},
                          { categoryId: e.categoryId },
                        );
                      },
                    ),
                    d.FIXED_CATEGORY,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return a(
                        a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                        {},
                        { isFixedCategory: e.isFixedCategory },
                      );
                    },
                  ),
                  d.GET_CHANNEL_COMBO_SALE_LIST_SUCCESS,
                  function () {
                    var e,
                      t,
                      r,
                      n,
                      o,
                      i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                      u = arguments.length > 1 ? arguments[1] : void 0,
                      c =
                        null === (e = null !== (r = u.res) && void 0 !== r ? r : {}) ||
                        void 0 === e ||
                        null === (t = e.comboSaleCategoryVos) ||
                        void 0 === t
                          ? void 0
                          : t.reduce(function (e, t) {
                              return (
                                (null != t ? t : []).comboSaleProductVos.forEach(function (t) {
                                  e[t.productId] = {
                                    price: t.price,
                                    discountPrice: t.discountPrice,
                                  };
                                }),
                                e
                              );
                            }, {});
                    return a(
                      a({}, i),
                      {},
                      {
                        oriCombosaleData: null !== (n = u.res) && void 0 !== n ? n : {},
                        comboSaleData: null !== (o = u.res) && void 0 !== o ? o : {},
                        comboSaleOriginalPriceMap: null != c ? c : {},
                      },
                    );
                  },
                ),
                d.GET_CHANNEL_COMBO_SALE_PRICE_SUCCESS,
                function () {
                  var e,
                    t,
                    r,
                    n,
                    o,
                    i,
                    u,
                    c,
                    l,
                    d,
                    p = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                    f = arguments.length > 1 ? arguments[1] : void 0;
                  if (
                    (console.log('action.res', f),
                    null !== (e = f.res) && void 0 !== e && e.goodsId)
                  ) {
                    var S;
                    if (((c = []), (u = f.originList).length)) {
                      var E, T, _;
                      if (
                        null !== (E = p.comboSaleData) &&
                        void 0 !== E &&
                        null !== (T = E.adultMutexDtoList) &&
                        void 0 !== T &&
                        T.length
                      ) {
                        var v,
                          m = [];
                        if (null !== (v = u) && void 0 !== v && v.length) {
                          var b = u.map(function (e) {
                            return e.productId;
                          });
                          if (
                            (p.comboSaleData.adultMutexDtoList.forEach(function (e) {
                              for (
                                var t = 0;
                                t < p.comboSaleData.comboSaleCategoryVos.length;
                                t++
                              ) {
                                var r,
                                  n = p.comboSaleData.comboSaleCategoryVos[t];
                                if (
                                  null !== (r = n.comboSaleProductVos) &&
                                  void 0 !== r &&
                                  r.length
                                )
                                  for (
                                    var o = function () {
                                        var t = n.comboSaleProductVos[i];
                                        if (b.includes(t.productId) && e.includes(t.productId)) {
                                          var r = e.filter(function (e) {
                                            return e !== t.productId;
                                          });
                                          m = m.concat(r);
                                        }
                                      },
                                      i = 0;
                                    i < n.comboSaleProductVos.length;
                                    i++
                                  )
                                    o();
                              }
                            }),
                            m.length)
                          ) {
                            var g,
                              O = [];
                            (null === (g = p.comboSaleData) ||
                              void 0 === g ||
                              g.comboSaleCategoryVos.forEach(function (e) {
                                O = O.concat(e.comboSaleProductVos);
                              }),
                              (c =
                                O.filter(function (e) {
                                  return m.includes(e.productId);
                                }) || []),
                              console.log('新的disablekey', m, c));
                          }
                        }
                      }
                      (console.log('hasEnrollProductList', c),
                        (l = a(
                          a({}, p.oriCombosaleData),
                          {},
                          {
                            comboSaleCategoryVos: y(
                              p,
                              u,
                              null === (_ = p.oriCombosaleData) || void 0 === _
                                ? void 0
                                : _.comboSaleCategoryVos,
                              c,
                            ),
                          },
                        )),
                        console.log('nextComboSaleData', l));
                      var C = 0;
                      (u.forEach(function (e) {
                        C += e.price;
                      }),
                        (d = {
                          discountPrice: f.res.price || C.toFixed(2),
                          price: f.res.originalPrice || C.toFixed(2),
                          orderId: f.res.goodsId && -1 !== f.res.goodsId ? f.res.goodsId : null,
                        }));
                    } else ((d = {}), (l = p.oriCombosaleData));
                    return a(
                      a({}, p),
                      {},
                      {
                        comboSaleData: l,
                        comboSaleHasEnrollProductList: c,
                        comboSalePriceData: null !== (S = d) && void 0 !== S ? S : {},
                      },
                    );
                  }
                  return (
                    (c =
                      null ===
                        (r = u =
                          null === (t = f.res || {}) || void 0 === t
                            ? void 0
                            : t.comboSaleProductVos) || void 0 === r
                        ? void 0
                        : r.filter(function (e) {
                            return e.hasEnroll;
                          })),
                    (l = a(
                      a({}, p.comboSaleData),
                      {},
                      {
                        comboSaleCategoryVos: y(
                          p,
                          u,
                          null === (n = p.comboSaleData) || void 0 === n
                            ? void 0
                            : n.comboSaleCategoryVos,
                          c,
                        ),
                      },
                    )),
                    (d = f.res),
                    a(
                      a({}, p),
                      {},
                      { comboSaleData: l },
                      (null === (o = c) || void 0 === o ? void 0 : o.length) > 0
                        ? { comboSaleHasEnrollProductList: c }
                        : { comboSalePriceData: null !== (i = d) && void 0 !== i ? i : {} },
                    )
                  );
                },
              ),
              d.RESET_CHANNEL_COMBO_SALE_PRICE,
              function () {
                var e,
                  t,
                  r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                  n = y(
                    r,
                    [],
                    null === (e = r.comboSaleData) || void 0 === e
                      ? void 0
                      : e.comboSaleCategoryVos,
                  );
                return a(
                  a({}, r),
                  {},
                  {
                    comboSaleHasEnrollProductList: [],
                    comboSaleData:
                      1 ==
                      (null === (t = r.comboSaleData) || void 0 === t
                        ? void 0
                        : t.activityChildType)
                        ? r.oriCombosaleData
                        : a(a({}, r.comboSaleData), {}, { comboSaleCategoryVos: n }),
                    comboSalePriceData: {},
                  },
                );
              },
            ),
            d.GET_HEAD_PHOTO_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return a(
                a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                { headerImage: e.res },
              );
            },
          ),
          d.GET_BIG_PHOTO_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
              t = arguments.length > 1 ? arguments[1] : void 0,
              r = t.res.moduleId;
            return (
              (e.bigImageDto[r] = t.res),
              a(a({}, e), {}, { bigImageDto: a({}, e.bigImageDto) })
            );
          },
        )),
      );
    },
    756761: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.COMMUNITY_TERM = t.COMMUNITY_LIVE = void 0),
        (t.COMMUNITY_LIVE = 1),
        (t.COMMUNITY_TERM = 2));
    },
    420844: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(602407),
        u = r(756761);
      function a(e) {
        return (
          (a =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          a(e)
        );
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != a(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != a(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == a(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var l = c(
        c({}, u.COMMUNITY_TERM, {
          url: '/web/j/mocCommunityRpcBean.getTermCommunity.rpc',
          key: 'termId',
        }),
        u.COMMUNITY_LIVE,
        { url: '/web/j/mocCommunityRpcBean.getLiveCommunity.rpc', key: 'liveId' },
      );
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_COMMUNITIES),
            (0, o.switchMap)(function (e) {
              var t = e.id,
                r = e.ctype,
                n = e.callback;
              return new Promise(function (e) {
                u({ url: l[r].url, body: c({}, l[r].key, t) }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), e);
              });
            }),
            (0, o.map)(function (e) {
              return { type: i.Type.GET_COMMUNITIES_SUCCESS, res: e };
            }),
          );
        },
      ];
    },
    602407: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328);
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      function i(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function a(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != o(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != o(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == o(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var c = (0, n.createActions)({
          getCommunities: ['ctype', 'id', 'callback'],
          getCommunitiesSuccess: null,
          delCommunity: ['id', 'callback'],
          delCommunitySuccess: null,
        }),
        l = c.Types,
        d = c.Creators,
        p = ((t.Creator = d), (t.Type = l), { communities: [] });
      t.default = (0, n.createReducer)(
        p,
        a(
          a({}, l.GET_COMMUNITIES_SUCCESS, function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { communities: e.res },
            );
          }),
          l.DEL_COMMUNITY_SUCCESS,
          function () {
            return arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p;
          },
        ),
      );
    },
    93649: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(216312);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.SEARCH_COURSE_CARD_BY_COURSE_IDS),
            (0, o.switchMap)(function (e) {
              var t = e.ids,
                r = e.pageIndex,
                n = e.pageSize;
              return u({
                url: '/web/j/mocSearchBean.searchCourseCardByCourseIds.rpc',
                body: {
                  mocCourseQueryVo: JSON.stringify({
                    courseIds: t,
                    orderBy: 0,
                    stats: 30,
                    pageIndex: r,
                    pageSize: n,
                  }),
                },
              });
            }),
            (0, o.map)(function (e) {
              return {
                type: i.Type.SEARCH_COURSE_CARD_BY_COURSE_IDS_SUCCESS,
                data: null != e ? e : null,
              };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_MOC_PROMOTION_COURSE_INDEX_LIST_VO_BY_IDS),
            (0, o.switchMap)(function (e) {
              var t = e.ids;
              return u({
                url: '/web/j/mocPromotionCourseIndexBean.getMocPromotionCourseIndexListVoByIds.rpc',
                body: { ids: JSON.stringify(t) },
              });
            }),
            (0, o.map)(function (e) {
              return {
                type: i.Type.GET_MOC_PROMOTION_COURSE_INDEX_LIST_VO_BY_IDS_SUCCESS,
                data: null != e ? e : null,
              };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_COUPON_TEMPLATE_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.userCouponId,
                r = e.couponTemplateId;
              return u({
                url: '/web/j/mocCouponBean.getCouponTemplateInfo.rpc',
                body: { userCouponId: t, couponTemplateId: r },
              });
            }),
            (0, o.map)(function (e) {
              return { type: i.Type.GET_COUPON_TEMPLATE_INFO_SUCCESS, data: null != e ? e : null };
            }),
          );
        },
      ];
    },
    216312: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328),
        o = r(783134);
      function i(e) {
        return (
          (i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          i(e)
        );
      }
      function u(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? u(Object(r), !0).forEach(function (t) {
                c(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : u(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != i(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != i(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == i(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var l = (0, n.createActions)({
          searchCourseCardByCourseIds: ['ids', 'pageIndex', 'pageSize'],
          searchCourseCardByCourseIdsSuccess: null,
          getMocPromotionCourseIndexListVoByIds: ['ids'],
          getMocPromotionCourseIndexListVoByIdsSuccess: null,
          getCouponTemplateInfo: ['userCouponId', 'couponTemplateId'],
          getCouponTemplateInfoSuccess: null,
        }),
        d = (t.Type = l.Types),
        p =
          ((t.Creator = l.Creators),
          {
            couponInfo: null,
            couponCourseList: [],
            couponCourseIdList: [],
            couponCourseListPagination: { pageIndex: 1, pageSize: 20, totleCount: 0 },
            couponCombinationList: [],
            couponCombinationIdList: [],
            redirectUrl: null,
          });
      t.default = (0, n.createReducer)(
        p,
        c(
          c(
            c({}, d.SEARCH_COURSE_CARD_BY_COURSE_IDS_SUCCESS, function () {
              var e,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                r =
                  null !== (e = (arguments.length > 1 ? arguments[1] : void 0).data) && void 0 !== e
                    ? e
                    : {},
                n = r.list,
                o = r.query;
              return a(
                a({}, t),
                {},
                {
                  couponCourseList: null != n ? n : [],
                  couponCourseListPagination: null != o ? o : {},
                },
              );
            }),
            d.GET_MOC_PROMOTION_COURSE_INDEX_LIST_VO_BY_IDS_SUCCESS,
            function () {
              var e,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                r =
                  null === (e = (arguments.length > 1 ? arguments[1] : void 0).data) || void 0 === e
                    ? void 0
                    : e.map(function (e) {
                        var r, n;
                        return (
                          (e.discountPrice = Math.max(
                            0.01,
                            (0, o.minus)(
                              e.discountPrice,
                              null !==
                                (r =
                                  null === (n = t.couponInfo) || void 0 === n
                                    ? void 0
                                    : n.amount) && void 0 !== r
                                ? r
                                : 0,
                            ),
                          )),
                          e
                        );
                      });
              return a(a({}, t), {}, { couponCombinationList: null != r ? r : [] });
            },
          ),
          d.GET_COUPON_TEMPLATE_INFO_SUCCESS,
          function () {
            var e,
              t,
              r,
              n,
              o,
              i,
              u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
              c =
                null !== (e = (arguments.length > 1 ? arguments[1] : void 0).data) && void 0 !== e
                  ? e
                  : null,
              l = []
                .concat(
                  null !== (t = null == c ? void 0 : c.mocCouponKyCoursePackageVos) && void 0 !== t
                    ? t
                    : [],
                  null !== (r = null == c ? void 0 : c.mocCouponKyTermVos) && void 0 !== r ? r : [],
                  null !== (n = null == c ? void 0 : c.mocCouponColumnVos) && void 0 !== n ? n : [],
                )
                .map(function (e) {
                  return e.courseId || e.id;
                }),
              d = (
                null !== (o = null == c ? void 0 : c.cmPromotionBags) && void 0 !== o ? o : []
              ).map(function (e) {
                return e.courseId || e.id;
              }),
              s = null !== (i = null == c ? void 0 : c.mocCouponVipVos) && void 0 !== i ? i : [],
              f = 1 === l.length && 0 === d.length,
              y = 1 === s.length && 0 === l.length && 0 === d.length,
              S =
                f || y
                  ? {
                      redirectUrl: f
                        ? '//www.icourse163.org/course/'.concat(l[0], '.htm')
                        : y
                          ? '//www.icourse163.org/vip/myVip.htm'
                          : void 0,
                    }
                  : { couponInfo: c, couponCourseIdList: l, couponCombinationIdList: d };
            return a(a({}, u), S);
          },
        ),
      );
    },
    67391: (e, t, r) => {
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o = r(48816),
        i = r(832780),
        u = r(764046),
        a = r(351202),
        c = ['actionId'],
        l = ['shouldNotConcactData'];
      function d(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function p(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? d(Object(r), !0).forEach(function (t) {
                s(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : d(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function s(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != n(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != n(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == n(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function f(e, t) {
        if (null == e) return {};
        var r,
          n,
          o = (function (e, t) {
            if (null == e) return {};
            var r = {};
            for (var n in e)
              if ({}.hasOwnProperty.call(e, n)) {
                if (-1 !== t.indexOf(n)) continue;
                r[n] = e[n];
              }
            return r;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(e);
          for (n = 0; n < i.length; n++)
            ((r = i[n]),
              -1 === t.indexOf(r) && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]));
        }
        return o;
      }
      var y = 'http://www.icourse163.org';
      t.default = [
        function (e, t) {
          return e.pipe(
            (0, o.ofType)(a.Type.HUBBLE_TRACKER),
            (0, i.switchMap)(function (e) {
              var r = e.query,
                n = t.value.main.index.g,
                o = r.actionId,
                i = f(r, c),
                u = Object.assign({}, { pagename: 'home', user_id: n.webUser && n.webUser.id }, i);
              return (
                (o = o.endsWith('-iaw') ? o : ''.concat(o, '-iaw')),
                n.DATracker && n.DATracker.track(o, u),
                []
              );
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_INDEX_BANNER),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getMobHomePageFirstModuleV3.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return {
                type: a.Type.GET_INDEX_BANNER_SUCCESS,
                mobFocusPicJsonVos: null == e ? void 0 : e.mobFocusPicJsonVos,
                cateNavVos: null == e ? void 0 : e.cateNavVos,
                mobPromotionJsonVo: null == e ? void 0 : e.mobPromotionJsonVo,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_LIVE),
            (0, i.switchMap)(function (e) {
              var t = e.amount;
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getLiveBaseCardDtoListV3.rpc'),
                body: { amount: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_LIVE_SUCCESS, liveList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_LIVE_WEB),
            (0, i.switchMap)(function (e) {
              var t = e.amount;
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getRecommendLive.rpc'),
                body: { amount: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_LIVE_WEB_SUCCESS, liveList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_CHANNEL_RECOMMEND_COURSE),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getHomePageRecommendChannelCourse.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return {
                type: a.Type.GET_CHANNEL_RECOMMEND_COURSE_SUCCESS,
                recommendChannelCourseList: e,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_RANK_COURSE),
            (0, i.switchMap)(function (e) {
              var t = e.pageSize;
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getRankCourse.rpc'),
                body: { pageSize: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_RANK_COURSE_SUCCESS, rankCourseDto: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch,
            u = !1,
            c = null;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_RANK_COURSE_BY_TYPE),
            (0, i.switchMap)(function (e) {
              var t = e.query,
                r = t.shouldNotConcactData,
                o = f(t, l);
              return (
                (u = r),
                (c = t.rankType),
                n({
                  url: ''.concat(y, '/web/j/indexBeanV3.getPagRankCourseForRankType.rpc'),
                  body: p({ rankType: c }, o),
                })
              );
            }),
            (0, i.map)(function (e) {
              return {
                type: a.Type.GET_RANK_COURSE_BY_TYPE_SUCCESS,
                rankCourseByTypeList: (null == e ? void 0 : e.list) || [],
                rankCourseByTypeQuery: (null == e ? void 0 : e.query) || {},
                shouldNotConcactReduxData: u,
                rankType: c,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_EVALUATION),
            (0, i.switchMap)(function () {
              return n({ url: ''.concat(y, '/web/j/indexBeanV3.getEvaluationV3.rpc'), body: {} });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_EVALUATION_SUCCESS, evaluationList: e || [] };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_EVALUATION_WEB),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getEvaluationToWeb.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_EVALUATION_WEB_SUCCESS, evaluationList: e || [] };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_RECOMMEND_COURSE),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/recommendRPCBean.getRecommendCourse.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_RECOMMEND_COURSE_SUCCESS, recommendCourseList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.COLLECT_CLICK_TRACE),
            (0, i.switchMap)(function (e) {
              var t = e.params;
              return n({
                url: ''.concat(y, '/web/j/adsTraceStatisticsBean.collectClickTraceOnPosition.rpc'),
                body: p({}, t),
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.COLLECT_CLICK_TRACE_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_PROMOTE),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getToPromoteBannerV3.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_PROMOTE_SUCCESS, promoteList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch,
            u = '';
          return e.pipe(
            (0, o.ofType)(a.Type.GET_PROMOTE_WEB),
            (0, i.switchMap)(function (e) {
              var t = e.childKey;
              return (
                (u = t),
                n({
                  url: ''.concat(y, '/web/j/indexBeanV3.getBannerList.rpc'),
                  body: { childKey: t },
                })
              );
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_PROMOTE_WEB_SUCCESS, promoteList: e, key: u };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_NAV_CATE),
            (0, i.switchMap)(function () {
              return n({ url: ''.concat(y, '/web/j/indexBeanV3.getCategoryInfo.rpc'), body: {} });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_NAV_CATE_SUCCESS, navCateList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_FOCUS_BANNER),
            (0, i.switchMap)(function () {
              return n({ url: ''.concat(y, '/web/j/indexBeanV3.getFocusPicInfo.rpc'), body: {} });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_FOCUS_BANNER_SUCCESS, focusBannerList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_MY_COURSE),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/courseBean.getLastLearnCourse.rpc.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_MY_COURSE_SUCCESS, myCourseList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_HOT_CATE),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/channelBean.listChannelCategoryDetail.rpc'),
                body: { includeALLChannels: !0, includeDefaultChannels: !1, includeMyChannels: !1 },
              });
            }),
            (0, i.map)(function (e) {
              var t = null == e ? void 0 : e.channelCategoryDetails,
                r =
                  Array.isArray(t) &&
                  t
                    .reduce(function (e, t) {
                      return e.concat(t.channels || []);
                    }, [])
                    .sort(function (e, t) {
                      return t.weight - e.weight;
                    })
                    .slice(0, 15);
              return { type: a.Type.GET_HOT_CATE_SUCCESS, hotCateList: r };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_USER_STORY),
            (0, i.switchMap)(function () {
              return n({ url: ''.concat(y, '/web/j/indexBeanV3.getUserStoryList.rpc') });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_USER_STORY_SUCCESS, userStoryList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_BRAND_VIDEO),
            (0, i.switchMap)(function () {
              return n({ url: ''.concat(y, '/web/j/indexBeanV3.getBrandVideo.rpc') });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_BRAND_VIDEO_SUCCESS, brandVideoUrl: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_EDITOR_RECOMMEND),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.showRecommendCourseForWeb.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_EDITOR_RECOMMEND_SUCCESS, editorRecommendList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_RECOMMEND_OUTLINE),
            (0, i.switchMap)(function () {
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.getRecommendModuleOutline.rpc'),
                body: {},
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_RECOMMEND_OUTLINE_SUCCESS, moduleRecommendList: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch,
            u = 0,
            c = -1;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_RECOMMEND_INFO),
            (0, i.mergeMap)(function (e) {
              var t = e.query;
              return (
                (u = t.moduleId),
                (c = t.childModuleId),
                n({
                  url: ''.concat(y, '/web/j/indexBeanV3.getRecommendModule.rpc'),
                  body: p({}, t),
                })
              );
            }),
            (0, i.map)(function (e) {
              return {
                type: a.Type.GET_RECOMMEND_INFO_SUCCESS,
                moduleRecommendInfo: e,
                moduleId: u,
                childModuleId: c,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.COLLECT_ADS_TRACKER),
            (0, i.switchMap)(function (e) {
              var t = e.collectUrl,
                r = e.collectType;
              return null != t && t.includes('mocInLoc')
                ? n({
                    url: ''.concat(
                      y,
                      '/web/j/adsTraceStatisticsBean.collectAdsTraceStatistics.rpc',
                    ),
                    body: { collectUrl: t, collectType: r },
                  })
                : u.EMPTY;
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.COLLECT_ADS_TRACKER_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_BIG_ACTIVITY),
            (0, i.switchMap)(function () {
              return n({ url: ''.concat(y, '/web/j/indexBeanV3.getBigActivityAds.rpc') });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_BIG_ACTIVITY_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_LIVE_LIST_BY_CHANNEL),
            (0, i.switchMap)(function (e) {
              var t = e.channelId;
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.listChannelLiveCardDto.rpc'),
                body: { channelId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_LIVE_LIST_BY_CHANNEL_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(a.Type.GET_LIVE_CHANNELS),
            (0, i.switchMap)(function (e) {
              var t = e.channelId;
              return n({
                url: ''.concat(y, '/web/j/indexBeanV3.listChannelLiveSummaryDto.rpc'),
                body: { channelId: t },
              });
            }),
            (0, i.map)(function (e) {
              return { type: a.Type.GET_LIVE_CHANNELS_SUCCESS, data: e };
            }),
          );
        },
      ];
    },
    351202: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328),
        i = ['webPromoteListDto'];
      function u(e) {
        return (
          (u =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          u(e)
        );
      }
      function a(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function l(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != u(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != u(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == u(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var d = (0, o.createActions)({
          hubbleTracker: ['query'],
          setWindow: ['g'],
          setUserInfo: ['userInfo'],
          getIndexBanner: null,
          getIndexBannerSuccess: null,
          getLive: ['amount'],
          getLiveSuccess: null,
          getLiveWeb: ['amount'],
          getLiveWebSuccess: null,
          getChannelRecommendCourse: null,
          getChannelRecommendCourseSuccess: null,
          getEditorRecommend: null,
          getEditorRecommendSuccess: null,
          getRankCourse: ['pageSize'],
          getRankCourseSuccess: null,
          getRankCourseByType: ['query'],
          getRankCourseByTypeSuccess: null,
          getEvaluation: null,
          getEvaluationSuccess: null,
          getEvaluationWeb: null,
          getEvaluationWebSuccess: null,
          getRecommendCourse: null,
          getRecommendCourseSuccess: null,
          collectClickTrace: ['params'],
          collectClickTraceSuccess: null,
          getPromote: null,
          getPromoteSuccess: null,
          getPromoteWeb: ['childKey'],
          getPromoteWebSuccess: null,
          getNavCate: null,
          getNavCateSuccess: null,
          getFocusBanner: null,
          getFocusBannerSuccess: null,
          getMyCourse: null,
          getMyCourseSuccess: null,
          getHotCate: null,
          getHotCateSuccess: null,
          getUserStory: null,
          getUserStorySuccess: null,
          getBrandVideo: null,
          getBrandVideoSuccess: null,
          getRecommendOutline: null,
          getRecommendOutlineSuccess: null,
          getRecommendInfo: ['query'],
          getRecommendInfoSuccess: null,
          collectAdsTracker: ['collectUrl', 'collectType'],
          collectAdsTrackerSuccess: null,
          getBigActivity: null,
          getBigActivitySuccess: null,
          getLiveListByChannel: ['channelId'],
          getLiveListByChannelSuccess: null,
          getLiveChannels: ['channelId'],
          getLiveChannelsSuccess: null,
        }),
        p = d.Types,
        s = d.Creators,
        f =
          ((t.Creator = s),
          (t.Type = p),
          {
            g: {},
            mobFocusPicJsonVos: [],
            cateNavVos: [],
            mobPromotionJsonVo: [],
            liveList: [],
            editorRecommendList: [],
            recommendChannelCourseList: [],
            recommendCourseList: [],
            rankCourseDto: {},
            rankCourseByTypeList: [],
            rankCourseByTypeQuery: { pageIndex: 1, pageSize: 20 },
            evaluationList: [],
            promoteList: [],
            webPromoteListDto: {},
            navCateList: [],
            myCourseList: [],
            hotCateList: [],
            userStoryList: [],
            brandVideoUrl: null,
            moduleRecommendList: [{}],
            moduleRecommendInfo: {},
            bigActivityVo: {},
            liveChannelList: [],
            channelLiveList: [],
          });
      t.default = (0, o.createReducer)(
        f,
        (l(
          l(
            l(
              l(
                l(
                  l(
                    l(
                      l(
                        l(
                          l((n = {}), p.HUBBLE_TRACKER, function () {
                            return arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : f;
                          }),
                          p.SET_WINDOW,
                          function () {
                            var e,
                              t = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                              ),
                              {},
                              { g: null !== (e = t.g) && void 0 !== e ? e : {} },
                            );
                          },
                        ),
                        p.SET_USER_INFO,
                        function () {
                          var e,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                          return c(
                            c(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                            ),
                            {},
                            { userInfo: null !== (e = t.userInfo) && void 0 !== e ? e : {} },
                          );
                        },
                      ),
                      p.GET_INDEX_BANNER_SUCCESS,
                      function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                          t = arguments.length > 1 ? arguments[1] : void 0,
                          r = (t.mobFocusPicJsonVos || []).filter(function (e) {
                            return !!e;
                          });
                        return c(
                          c({}, e),
                          {},
                          {
                            mobFocusPicJsonVos: r,
                            cateNavVos: t.cateNavVos,
                            mobPromotionJsonVo: t.mobPromotionJsonVo || [],
                          },
                        );
                      },
                    ),
                    p.GET_LIVE_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                        {},
                        { liveList: e.liveList },
                      );
                    },
                  ),
                  p.GET_LIVE_WEB_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                      {},
                      { liveList: e.liveList },
                    );
                  },
                ),
                p.GET_EDITOR_RECOMMEND_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                    {},
                    { editorRecommendList: e.editorRecommendList },
                  );
                },
              ),
              p.GET_CHANNEL_RECOMMEND_COURSE_SUCCESS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                  {},
                  { recommendChannelCourseList: e.recommendChannelCourseList },
                );
              },
            ),
            p.GET_RECOMMEND_COURSE_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                {},
                { recommendCourseList: e.recommendCourseList },
              );
            },
          ),
          p.COLLECT_CLICK_TRACE_SUCCESS,
          function () {
            return c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f);
          },
        ),
        l(
          l(
            l(
              l(
                l(
                  l(
                    l(
                      l(
                        l(
                          l(n, p.GET_RANK_COURSE_SUCCESS, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                              ),
                              {},
                              { rankCourseDto: e.rankCourseDto },
                            );
                          }),
                          p.GET_RANK_COURSE_BY_TYPE_SUCCESS,
                          function () {
                            var e =
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                              t = arguments.length > 1 ? arguments[1] : void 0,
                              r = t.rankType,
                              n = t.rankCourseByTypeList,
                              o = t.rankCourseByTypeQuery,
                              i = t.shouldNotConcactReduxData,
                              u = e.rankCourseDto,
                              a = o || e.rankCourseByTypeQuery;
                            return (
                              Object.keys(u).forEach(function (e) {
                                u[e] &&
                                  u[e].rankType == r &&
                                  ((u[e].courseList = u[e].courseList.concat(n)), (u[e].query = a));
                              }),
                              c(
                                c({}, e),
                                {},
                                {
                                  rankCourseByTypeList:
                                    n && !i ? e.rankCourseByTypeList.concat(n) : n,
                                  rankCourseByTypeQuery: a,
                                  rankCourseDto: u,
                                },
                              )
                            );
                          },
                        ),
                        p.GET_EVALUATION_SUCCESS,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return c(
                            c(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                            ),
                            {},
                            { evaluationList: e.evaluationList },
                          );
                        },
                      ),
                      p.GET_EVALUATION_WEB_SUCCESS,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return c(
                          c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                          {},
                          { evaluationList: e.evaluationList },
                        );
                      },
                    ),
                    p.GET_PROMOTE_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                        {},
                        { promoteList: e.promoteList },
                      );
                    },
                  ),
                  p.GET_PROMOTE_WEB_SUCCESS,
                  function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                      t = arguments.length > 1 ? arguments[1] : void 0,
                      r = t.key,
                      n = e.webPromoteListDto,
                      o = (function (e, t) {
                        if (null == e) return {};
                        var r,
                          n,
                          o = (function (e, t) {
                            if (null == e) return {};
                            var r = {};
                            for (var n in e)
                              if ({}.hasOwnProperty.call(e, n)) {
                                if (-1 !== t.indexOf(n)) continue;
                                r[n] = e[n];
                              }
                            return r;
                          })(e, t);
                        if (Object.getOwnPropertySymbols) {
                          var i = Object.getOwnPropertySymbols(e);
                          for (n = 0; n < i.length; n++)
                            ((r = i[n]),
                              -1 === t.indexOf(r) &&
                                {}.propertyIsEnumerable.call(e, r) &&
                                (o[r] = e[r]));
                        }
                        return o;
                      })(e, i);
                    return (
                      (n[r] = t.promoteList),
                      c(c({}, o), {}, { webPromoteListDto: n, promoteList: t.promoteList })
                    );
                  },
                ),
                p.GET_NAV_CATE_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                    {},
                    { navCateList: e.navCateList },
                  );
                },
              ),
              p.GET_FOCUS_BANNER_SUCCESS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                  {},
                  { focusBannerList: e.focusBannerList },
                );
              },
            ),
            p.GET_MY_COURSE_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                {},
                { myCourseList: e.myCourseList },
              );
            },
          ),
          p.GET_HOT_CATE_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return c(
              c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
              {},
              { hotCateList: e.hotCateList },
            );
          },
        ),
        l(
          l(
            l(
              l(
                l(
                  l(
                    l(n, p.GET_USER_STORY_SUCCESS, function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                        {},
                        { userStoryList: e.userStoryList },
                      );
                    }),
                    p.GET_BRAND_VIDEO_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                        {},
                        { brandVideoUrl: e.brandVideoUrl },
                      );
                    },
                  ),
                  p.GET_RECOMMEND_OUTLINE_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                      {},
                      { moduleRecommendList: e.moduleRecommendList },
                    );
                  },
                ),
                p.GET_BIG_ACTIVITY_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                    {},
                    { bigActivityVo: e.data },
                  );
                },
              ),
              p.GET_LIVE_CHANNELS_SUCCESS,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                  t = (arguments.length > 1 ? arguments[1] : void 0).data || [];
                return (
                  t.unshift({ channelId: -1, channelName: '全部' }),
                  c(c({}, e), {}, { liveChannelList: t })
                );
              },
            ),
            p.GET_LIVE_LIST_BY_CHANNEL_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                {},
                { channelLiveList: e.data || [] },
              );
            },
          ),
          p.GET_RECOMMEND_INFO_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
              t = arguments.length > 1 ? arguments[1] : void 0,
              r = t.moduleId,
              n = t.childModuleId;
            return (
              e.moduleRecommendList.forEach(function (e) {
                if (e.moduleId == r) {
                  if (-1 == n) e.moduleRecommendInfo = t.moduleRecommendInfo;
                  else {
                    var o = t.moduleRecommendInfo.recommendModuleDetailVos;
                    ((e.moduleRecommendInfo && e.moduleRecommendInfo.recommendModuleDetailVos) ||
                      (e.moduleRecommendInfo = { recommendModuleDetailVos: [] }),
                      e.moduleRecommendInfo.recommendModuleDetailVos.forEach(function (e) {
                        var t;
                        e.moduleId == n &&
                          (e.customCourseModuleVo =
                            null === (t = o[0]) || void 0 === t ? void 0 : t.customCourseModuleVo);
                      }));
                  }
                  e.childModuleId = n;
                }
              }),
              c(c({}, e), {}, { moduleRecommendInfo: t.moduleRecommendInfo })
            );
          },
        )),
      );
    },
    772101: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(188548);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_TERM_LEARN),
            (0, o.switchMap)(function (e) {
              var t = e.termId,
                r = e.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-course/web/j/mocMemberLearnBean.getTermLearn.rpc',
                  body: { termId: t },
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (r(e), e);
              });
            }),
            (0, o.map)(function (e) {
              if (!e.code) return { type: i.Type.GET_TERM_LEARN_SUCCESS, data: e.result };
            }),
          );
        },
      ];
    },
    188548: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328);
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      function i(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function a(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != o(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != o(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == o(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var c = (0, n.createActions)({
          getTermLearn: ['termId', 'callback'],
          getTermLearnSuccess: null,
        }),
        l = c.Types,
        d = c.Creators,
        p =
          ((t.Creator = d),
          (t.Type = l),
          {
            hoursData: {
              learnedCount: 0,
              lessonCount: 0,
              learnedTimeCount: 0,
              learnedVideoCount: 0,
            },
          });
      t.default = (0, n.createReducer)(
        p,
        a({}, l.GET_TERM_LEARN_SUCCESS, function () {
          var e,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
            r =
              null !== (e = (arguments.length > 1 ? arguments[1] : void 0).data) && void 0 !== e
                ? e
                : {};
          return u(u({}, t), {}, { hoursData: r });
        }),
      );
    },
    954152: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(51083);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_YOUDAO_JPK_CONVERT_CONFIG),
            (0, o.switchMap)(function (e) {
              var t = e.termId;
              return u({
                url: '/web/j/commonBean.obtain.rpc',
                body: { key: ''.concat('term_manage_jpk_convert_config_').concat(t) },
              });
            }),
            (0, o.map)(function (e) {
              var t = (function () {
                try {
                  return JSON.parse(e);
                } catch (e) {
                  return null;
                }
              })();
              return { type: i.Type.GET_YOUDAO_JPK_CONVERT_CONFIG_SUCCESS, data: t };
            }),
          );
        },
      ];
    },
    51083: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328);
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      function i(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function a(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != o(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != o(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == o(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var c = (0, n.createActions)({
          getYoudaoJPKConvertConfig: ['termId'],
          getYoudaoJPKConvertConfigSuccess: null,
        }),
        l = c.Types,
        d = c.Creators,
        p = ((t.Creator = d), (t.Type = l), { showModal: !1, richText: '', imageUrl: '' });
      t.default = (0, n.createReducer)(
        p,
        a({}, l.GET_YOUDAO_JPK_CONVERT_CONFIG_SUCCESS, function () {
          var e,
            t,
            r,
            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
            o =
              null !== (e = (arguments.length > 1 ? arguments[1] : void 0).data) && void 0 !== e
                ? e
                : {};
          return u(
            u({}, n),
            {},
            {
              showModal: null !== (t = o.needConvert) && void 0 !== t && t,
              richText: null !== (r = o.introText) && void 0 !== r ? r : '',
              imageUrl: o.imageUrl,
            },
          );
        }),
      );
    },
    511787: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.UPLOAD_TIP_IMG =
          t.TRADE_STATUS =
          t.TRADE_SOURCE =
          t.REFUND_STATUS =
          t.PRODUCT_TYPE_COMBINE =
          t.PAY_METHOD =
          t.ORDER_HEADER_CELL =
          t.GET_REFUND_STATUS =
          t.GET_ORDRE_STATUS =
          t.FILE_UPLOAD_STATUS =
          t.EXPORT_TEMPLATE =
          t.EDIT_TYPE =
          t.DELIVERY_STATUS =
          t.DEFAULT_TRADE_SOURCE =
            void 0),
        (t.ORDER_HEADER_CELL = {
          DELL: {
            title: '交易总额',
            tip: '（不含退款）',
            desc: '交易总额=当前筛选条件下订单的交易金额之和',
          },
          RECEIVABLE: {
            title: '应收金额',
            tip: '（不含退款）',
            desc: '应收金额=当前筛选条件下订单的应收金额之和',
          },
        }),
        (t.PAY_METHOD = {
          'AlipayAll.Alipay': '支付宝',
          'AlipayAll.AlipayWap': '支付宝',
          'AlipayAll.AlipaySdk': '支付宝',
          'WeiXin.WeiXinScan': '微信',
          'WeiXin.WeiXinApi': '微信',
          'WeiXin.WeiXinSdk': '微信',
          'WeiXin.WeiXinH5': '微信',
          CUSTOM_IAP_PURSE: '苹果支付',
        }));
      var r = (t.REFUND_STATUS = { WAIT: 10, REFUNDING: 20, SUCCESS: 30, FAIL: 40 }),
        n = (t.TRADE_STATUS = { SUCCESS: 20 });
      ((t.GET_ORDRE_STATUS = function (e, t) {
        return e === r.SUCCESS ? '退款成功' : t === n.SUCCESS ? '交易成功' : '-';
      }),
        (t.GET_REFUND_STATUS = function (e, t) {
          return e === r.SUCCESS
            ? '完成退款'
            : t === n.SUCCESS
              ? e === r.REFUNDING
                ? '正在退款'
                : e === r.FAIL
                  ? '退款失败'
                  : ''
              : '';
        }),
        (t.DELIVERY_STATUS = { WAIT: 0, FINISHED: 1 }),
        (t.PRODUCT_TYPE_COMBINE = 32),
        (t.EDIT_TYPE = { ADD: 'add', UPDATE: 'update' }),
        (t.EXPORT_TEMPLATE =
          '//nos.netease.com/edu-common-public/25BD8C48E05D20A74D1F00F3697D20F2-1633944851567?download=%E5%BF%AB%E9%80%92%E4%BF%A1%E6%81%AF%E6%A8%A1%E6%9D%BF.xls'),
        (t.TRADE_SOURCE = [
          { name: '交易成功', id: 3 },
          { name: '退款成功', id: 5 },
        ]),
        (t.FILE_UPLOAD_STATUS = { FAIL: -1, UPLOADING: 0, SUCCESS: 1, INIT: -2 }),
        (t.DEFAULT_TRADE_SOURCE = 3),
        (t.UPLOAD_TIP_IMG = {
          SUCCESS:
            'http://edu-image.nosdn.127.net/426a7c0a3b564f8d91257c6ae723e540.png?imageView&quality=100',
          FAIL: 'http://edu-image.nosdn.127.net/abefbc00840a4487911afdd900ab1408.png?imageView&quality=100',
        }));
    },
    401870: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(397338),
        u = r(244309),
        a = r(610982),
        c = r(511787),
        l = r(138525);
      function d(e) {
        return (
          (d =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          d(e)
        );
      }
      function p(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? p(Object(r), !0).forEach(function (t) {
                f(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : p(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function f(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != d(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != d(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == d(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      t.default = [
        function (e, t, r) {
          var a = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.REFUND_ORDER),
            (0, o.switchMap)(function (e) {
              var t = e.orderId,
                r = e.refundReason;
              return a({
                url: '/j/trade/tradeAgent.refund.do',
                body: { orderId: t, refundReason: r },
                raw: !0,
              });
            }),
            (0, o.map)(function (e) {
              return 0 === e.code
                ? (i.message.success('退款成功！'),
                  { type: u.Type.REFUND_ORDER_SUCCESS, data: e.result })
                : { type: l.Type.SHOW_ERR_MSG, msg: e.message };
            }),
          );
        },
        function (e, t, r) {
          var a = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.GET_TEACHER_ORDER),
            (0, o.switchMap)(function (e) {
              var t = e.orderParams;
              return a({
                url: '/web/j/postGradeOrderBean.getPostgradeTotalTeacherOrder.rpc',
                body: s({}, t),
                raw: !0,
              });
            }),
            (0, o.map)(function (e) {
              return 0 === e.code
                ? { type: u.Type.GET_TEACHER_ORDER_SUCCESS, data: e.result }
                : (i.message.error(e.message), { type: u.Type.GET_TEACHER_ORDER_ERROR });
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(u.Type.SET_TABLE_LOADING),
            (0, o.map)(function (e) {
              var t = e.tableLoading;
              return { type: u.Type.SET_TABLE_LOADING_SUCCESS, data: { tableLoading: t } };
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(u.Type.SET_EXPORT_PROMO_ING),
            (0, o.map)(function (e) {
              var t = e.exportPromoIng;
              return { type: u.Type.SET_EXPORT_PROMO_ING_SUCCESS, data: { exportPromoIng: t } };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.EDIT_ORDER_LOGISTICS),
            (0, o.switchMap)(function (e) {
              var t = e.bizOrderLogisticsParm,
                r = t.type,
                n = t.id,
                u = {
                  logisticsNumber: t.logisticsNumber,
                  logisticsCompany: t.logisticsCompany,
                  packageName: t.packageName,
                  bizOrderId: t.bizOrderId,
                };
              return (
                r === c.EDIT_TYPE.UPDATE && (u.id = n),
                i({
                  url: '/web/j/mocLogisticsRpcBean.editOrderLogistics.rpc',
                  body: { bizOrderLogisticsParm: JSON.stringify(u) },
                  raw: !0,
                }).pipe(
                  (0, o.map)(function () {
                    return s(
                      s({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}),
                      {},
                      { bizOrderLogisticsParm: t },
                    );
                  }),
                )
              );
            }),
            (0, o.map)(function (e) {
              var t = e.code,
                r = e.message,
                n = e.result,
                o = void 0 === n ? [] : n,
                i = e.bizOrderLogisticsParm;
              return 0 === t
                ? {
                    type: u.Type.EDIT_ORDER_LOGISTICS_SUCCESS,
                    data: { id: o, bizOrderLogisticsParm: i },
                  }
                : { type: l.Type.SHOW_ERR_MSG, msg: r };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.GET_LOGISTICS_COMPANY),
            (0, o.switchMap)(function () {
              return i({
                url: '/web/j/mocLogisticsRpcBean.listFrequentlyLogisticsCompany.rpc',
                raw: !0,
              });
            }),
            (0, o.map)(function (e) {
              return 0 === e.code
                ? { type: u.Type.GET_LOGISTICS_COMPANY_SUCCESS, data: e.result }
                : { type: l.Type.SHOW_ERR_MSG, msg: e.message };
            }),
          );
        },
        function (e, t, r) {
          var a = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.UPDATE_DELIVERY_STATUS),
            (0, o.switchMap)(function (e) {
              var t = e.deliveryParam,
                r = t.isBatch,
                n = t.logisticsIds,
                i = void 0 === n ? [] : n,
                u = t.rowIndexList,
                c = void 0 === u ? [] : u,
                l = t.logisticIndexList,
                d = void 0 === l ? [] : l;
              return a({
                url: '/web/j/mocLogisticsRpcBean.updateDeliveryStatus.rpc',
                body: { logisticsIds: JSON.stringify(i) },
                raw: !0,
              }).pipe(
                (0, o.map)(function () {
                  return s(
                    s({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}),
                    {},
                    { isBatch: r, rowIndexList: c, logisticIndexList: d },
                  );
                }),
              );
            }),
            (0, o.map)(function (e) {
              var t = e.code,
                r = e.message,
                n = e.result,
                o = e.isBatch,
                a = e.rowIndexList,
                c = e.logisticIndexList;
              return 0 === t
                ? (i.message.success('发货成功！'),
                  {
                    type: u.Type.UPDATE_DELIVERY_STATUS_SUCCESS,
                    data: { isBatch: o, rowIndexList: a, logisticIndexList: c, deliverySuccess: n },
                  })
                : { type: l.Type.SHOW_ERR_MSG, msg: r };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.BATCH_UPLOAD_LOGISTICS),
            (0, o.switchMap)(function (e) {
              var t = e.nosKey,
                r = e.bucket,
                n = e.filename;
              return i({
                url: '/web/j/mocLogisticsRpcBean.batchUploadBizOrderLogistics.rpc',
                body: { nosKey: t, bucket: r, filename: n },
              });
            }),
            (0, o.map)(function (e) {
              return e
                ? {
                    type: u.Type.GET_UPLOAD_LOGISTICS_RESULT,
                    data: { key: e, fileUploadStatus: c.FILE_UPLOAD_STATUS.UPLOADING },
                  }
                : { type: l.Type.SHOW_ERR_MSG, msg: e.message };
            }),
          );
        },
        function (e, t, r) {
          var c = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.ASYNC_EXPORT_ORDER_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.orderParams,
                r = t.teacherId,
                n = t.tradeStatus,
                o = t.productName,
                i = t.buyerNickName,
                u = t.tradeStartTime,
                l = t.tradeEndTime,
                d = (0, a.filterEmpty)({
                  teacherId: r,
                  tradeStatus: n,
                  productName: o,
                  buyerNickName: i,
                  tradeStartTime: u,
                  tradeEndTime: l,
                });
              return c({
                url: '/web/j/chartStatisticsBean.asyncExportOrderData.rpc',
                body: s({}, d),
              });
            }),
            (0, o.map)(function (e) {
              return e[0] && e[0].threadId
                ? { type: u.Type.GET_EXPORT_REVENUE_RESULT, threadId: e[0].threadId }
                : (i.message.error('threadId请求失败，请刷新重试'),
                  { type: u.Type.ASYNC_EXPORT_ORDER_DATA_ERROR });
            }),
          );
        },
        function (e, t, r) {
          var a = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.DELETE_ORDER_LOGISTICS),
            (0, o.switchMap)(function (e) {
              var t = e.orderLogisticsId;
              return a({
                url: '/web/j/mocLogisticsRpcBean.deleteBizOrderLogistics.rpc',
                body: { orderLogisticsId: t },
                raw: !0,
              });
            }),
            (0, o.map)(function (e) {
              return 0 === e.code
                ? (i.message.success('删除成功！'),
                  { type: u.Type.DELETE_ORDER_LOGISTICS_SUCCESS, data: e.result })
                : { type: l.Type.SHOW_ERR_MSG, msg: e.message };
            }),
          );
        },
        function (e, t, r) {
          var a = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.GET_EXPORT_REVENUE_RESULT),
            (0, o.switchMap)(function (e) {
              var t = e.threadId;
              return a({
                url: '/web/j/commonBean.getThreadStatusByThreadId.rpc',
                body: { threadId: t },
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.finished
                ? e.data && e.result
                  ? { type: u.Type.GET_EXPORT_REVENUE_RESULT_SUCCESS, exportUrl: e.data }
                  : (i.message.error('导出失败！请刷新重试'),
                    { type: u.Type.GET_EXPORT_REVENUE_RESULT_FAIL })
                : {
                    type: u.Type.GET_EXPORT_REVENUE_RESULT_POLLING,
                    threadId: null == e ? void 0 : e.threadId,
                  };
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(u.Type.MODIFY_FILE_UPLOAD_STATUS),
            (0, o.map)(function (e) {
              var t = e.fileUploadStatus;
              return {
                type: u.Type.MODIFY_FILE_UPLOAD_STATUS_SUCCESS,
                data: { fileUploadStatus: t },
              };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.GET_UPLOAD_LOGISTICS_RESULT),
            (0, o.switchMap)(function () {
              var e = (t.value.main.orderService || {}).key;
              return i({
                url: '/web/j/mocLogisticsRpcBean.getUploadBizOrderLogisticsResultStatus.rpc',
                body: { key: e },
                raw: !0,
              }).pipe(
                (0, o.map)(function () {
                  return s(
                    s({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}),
                    {},
                    { key: e },
                  );
                }),
              );
            }),
            (0, o.map)(function (e) {
              var t = e.result,
                r = e.key,
                n = e.code,
                o = e.message;
              return 0 === n
                ? t.code === c.FILE_UPLOAD_STATUS.UPLOADING
                  ? { type: u.Type.GET_UPLOAD_LOGISTICS_RESULT_POLLING, key: r }
                  : { type: u.Type.GET_UPLOAD_LOGISTICS_RESULT_SUCCESS, data: t }
                : { type: l.Type.SHOW_ERR_MSG, msg: o };
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(u.Type.GET_EXPORT_REVENUE_RESULT_POLLING),
            (0, o.delay)(1e3),
            (0, o.map)(function (e) {
              var t = e.threadId;
              return { type: u.Type.GET_EXPORT_REVENUE_RESULT, threadId: t };
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(u.Type.GET_UPLOAD_LOGISTICS_RESULT_POLLING),
            (0, o.delay)(1e3),
            (0, o.map)(function () {
              return {
                type: u.Type.GET_UPLOAD_LOGISTICS_RESULT,
                data: { fileUploadStatus: c.FILE_UPLOAD_STATUS.UPLOADING },
              };
            }),
          );
        },
      ];
    },
    244309: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328),
        i = r(511787);
      function u(e) {
        return (
          (u =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          u(e)
        );
      }
      function a(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function l(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != u(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != u(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == u(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var d = (0, o.createActions)({
          getTeacherOrder: ['orderParams'],
          getTeacherOrderSuccess: ['orderParams'],
          getTeacherOrderError: ['orderParams'],
          setTableLoading: ['tableLoading'],
          setTableLoadingSuccess: ['tableLoading'],
          setExportPromoIng: ['exportPromoIng'],
          setExportPromoIngSuccess: ['exportPromoIng'],
          batchUploadLogistics: ['nosKey', 'bucket', 'filename'],
          batchUploadLogisticsSuccess: ['nosKey', 'bucket', 'filename'],
          getUploadLogisticsResult: ['key'],
          getUploadLogisticsResultSuccess: ['key'],
          getLogisticsCompany: null,
          getLogisticsCompanySuccess: null,
          refundOrder: ['orderId', 'refundReason'],
          refundOrderSuccess: ['orderId', 'refundReason'],
          editOrderLogistics: ['bizOrderLogisticsParm'],
          editOrderLogisticsSuccess: ['bizOrderLogisticsParm'],
          deleteOrderLogistics: ['orderLogisticsId'],
          deleteOrderLogisticsSuccess: ['orderLogisticsId'],
          updateDeliveryStatus: ['deliveryParam'],
          updateDeliveryStatusSuccess: ['deliveryParam'],
          modifyFileUploadStatus: ['fileUploadStatus'],
          modifyFileUploadStatusSuccess: ['fileUploadStatus'],
          asyncExportOrderData: ['orderParams'],
          asyncExportOrderDataError: ['orderParams'],
          getExportRevenueResult: ['threadId'],
          getExportRevenueResultSuccess: ['threadId'],
          getExportRevenueResultFail: ['threadId'],
          getExportRevenueResultPolling: ['threadId'],
          getUploadLogisticsResultPolling: ['key'],
        }),
        p = (t.Type = d.Types),
        s =
          ((t.Creator = d.Creators),
          {
            teacherOrder: {},
            uploadResult: {},
            logisticsCompany: [],
            key: '',
            threadId: '',
            fileUploadStatus: i.FILE_UPLOAD_STATUS.INIT,
            fileUploadMsg: '',
            failDataDownLoadKey: '',
            reGetLogisticsResult: '',
            exportPromoIng: !1,
            reseBatchLogistics: '',
            tableLoading: !1,
          });
      t.default = (0, o.createReducer)(
        s,
        (l(
          l(
            l(
              l(
                l(
                  l(
                    l(
                      l(
                        l(
                          l((n = {}), p.SET_TABLE_LOADING_SUCCESS, function () {
                            var e,
                              t = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              {
                                tableLoading:
                                  null === (e = t.data) || void 0 === e ? void 0 : e.tableLoading,
                              },
                            );
                          }),
                          p.SET_EXPORT_PROMO_ING_SUCCESS,
                          function () {
                            var e,
                              t = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                              ),
                              {},
                              {
                                exportPromoIng:
                                  null === (e = t.data) || void 0 === e ? void 0 : e.exportPromoIng,
                              },
                            );
                          },
                        ),
                        p.GET_TEACHER_ORDER_SUCCESS,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return c(
                            c(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                            ),
                            {},
                            { teacherOrder: e.data, tableLoading: !1 },
                          );
                        },
                      ),
                      p.GET_TEACHER_ORDER_ERROR,
                      function () {
                        return c(
                          c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                          {},
                          { tableLoading: !1 },
                        );
                      },
                    ),
                    p.GET_LOGISTICS_COMPANY_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                        {},
                        { logisticsCompany: e.data },
                      );
                    },
                  ),
                  p.DELETE_ORDER_LOGISTICS_SUCCESS,
                  function () {
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { reGetLogisticsResult: +new Date() },
                    );
                  },
                ),
                p.REFUND_ORDER_SUCCESS,
                function () {
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                    {},
                    { reGetLogisticsResult: +new Date() },
                  );
                },
              ),
              p.ASYNC_EXPORT_ORDER_DATA_ERROR,
              function () {
                return c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { exportPromoIng: !1 },
                );
              },
            ),
            p.GET_EXPORT_REVENUE_RESULT_FAIL,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                { threadId: e.data, exportPromoIng: !1 },
              );
            },
          ),
          p.GET_UPLOAD_LOGISTICS_RESULT,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
              t = (arguments.length > 1 ? arguments[1] : void 0).data || {},
              r = t.key,
              n = void 0 === r ? e.key : r,
              o = t.fileUploadStatus;
            return c(c({}, e), {}, { key: n, fileUploadStatus: o });
          },
        ),
        l(
          l(
            l(
              l(
                l(
                  l(n, p.MODIFY_FILE_UPLOAD_STATUS_SUCCESS, function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { fileUploadStatus: e.data.fileUploadStatus },
                    );
                  }),
                  p.GET_EXPORT_REVENUE_RESULT,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                      {},
                      { threadId: e.data, exportPromoIng: !0 },
                    );
                  },
                ),
                p.GET_EXPORT_REVENUE_RESULT_SUCCESS,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                    t = (arguments.length > 1 ? arguments[1] : void 0).exportUrl;
                  if (t) {
                    var r = t.replace(/http(s?):\/\//, '//'),
                      n = window.document,
                      o = n.createElement('a');
                    (o.setAttribute('href', r),
                      o.setAttribute('target', '_blank'),
                      o.setAttribute('style', 'display: none'),
                      n.body.appendChild(o),
                      o.click(),
                      setTimeout(function () {
                        o.parentNode.removeChild(o);
                      }, 1e3));
                  }
                  return c(c({}, e), {}, { exportPromoIng: !1 });
                },
              ),
              p.GET_UPLOAD_LOGISTICS_RESULT_SUCCESS,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                  t = (arguments.length > 1 ? arguments[1] : void 0).data,
                  r = t.code,
                  n = t.failDataDownLoadKey,
                  o = t.failDataNums,
                  u = t.failedReason,
                  a = '',
                  l = e.reGetLogisticsResult;
                return (
                  r === i.FILE_UPLOAD_STATUS.SUCCESS
                    ? ((a =
                        o > 0
                          ? '导入快递信息失败，失败'.concat(o, '条')
                          : '恭喜，成功导入全部快递信息'),
                      (l = +new Date()))
                    : r === i.FILE_UPLOAD_STATUS.FAIL && (a = u),
                  c(
                    c({}, e),
                    {},
                    {
                      fileUploadMsg: a,
                      fileUploadStatus: r,
                      failDataDownLoadKey: n,
                      reGetLogisticsResult: l,
                    },
                  )
                );
              },
            ),
            p.EDIT_ORDER_LOGISTICS_SUCCESS,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                t = arguments.length > 1 ? arguments[1] : void 0,
                r = e.teacherOrder,
                n = t.data,
                o = n.id,
                u = n.bizOrderLogisticsParm,
                a = void 0 === u ? {} : u,
                l = r.paginationOrderKaoYanResult,
                d = (void 0 === l ? {} : l).list,
                p = void 0 === d ? [] : d,
                f = a.type,
                y = a.rowIndex,
                S = a.logisticIndex,
                E = (p[y] || {}).postOrderLogisticsList;
              return (
                f === i.EDIT_TYPE.ADD ? null == E || E.push(c({ id: o }, a)) : (E[S] = a),
                c(c({}, e), {}, { teacherOrder: c({}, r) })
              );
            },
          ),
          p.UPDATE_DELIVERY_STATUS_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
              t = (arguments.length > 1 ? arguments[1] : void 0).data,
              r = t.isBatch,
              n = t.rowIndexList,
              o = t.deliverySuccess,
              u = t.logisticIndexList;
            if (o) {
              if (r)
                return c(
                  c({}, e),
                  {},
                  { reGetLogisticsResult: +new Date(), reseBatchLogistics: +new Date() },
                );
              var a = e.teacherOrder,
                l = a.paginationOrderKaoYanResult,
                d = (void 0 === l ? {} : l).list,
                p = void 0 === d ? [] : d;
              return (
                n.forEach(function (e) {
                  var t = (p[e] || {}).postOrderLogisticsList,
                    r = void 0 === t ? [] : t;
                  u.forEach(function (e) {
                    r[e] = c(c({}, r[e]), {}, { deliveryStatus: i.DELIVERY_STATUS.FINISHED });
                  });
                }),
                c(c({}, e), {}, { teacherOrder: c({}, a) })
              );
            }
            return c({}, e);
          },
        )),
      );
    },
    610982: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.filterEmpty = void 0),
        (t.filterEmpty = function (e) {
          return Object.keys(e).reduce(function (t, r) {
            var n = e[r];
            return (null == n || ('string' == typeof n && !n) || (t[r] = n), t);
          }, {});
        }));
    },
    181785: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(360496);
      function u(e) {
        return (
          (u =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          u(e)
        );
      }
      function a(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function l(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != u(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != u(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == u(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.TEACHER_APPLY),
            (0, o.switchMap)(function (e) {
              var t = e.data;
              return u({ url: '/web/j/MocSchoolBean.offlineLectureInfoV2.rpc', body: c({}, t) });
            }),
            (0, o.map)(function (e) {
              var t = e.success,
                r = e.regType;
              return {
                type: t ? i.Type.TEACHER_APPLY_SUCCESS : i.Type.TEACHER_APPLY_FAILED,
                regType: r,
              };
            }),
          );
        },
      ];
    },
    360496: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328);
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      function i(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                a(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function a(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != o(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != o(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == o(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var c = (0, n.createActions)({
          teacherApply: ['data'],
          teacherApplySuccess: null,
          teacherApplyFailed: null,
        }),
        l = c.Types,
        d = c.Creators,
        p = ((t.Creator = d), (t.Type = l), { applySuccess: !1, regType: '' });
      t.default = (0, n.createReducer)(
        p,
        a(
          a({}, l.TEACHER_APPLY_SUCCESS, function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { applySuccess: !0, regType: e.regType },
            );
          }),
          l.TEACHER_APPLY_FAILED,
          function () {
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { applySuccess: !1 },
            );
          },
        ),
      );
    },
    47478: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = (r(397338), r(244493)),
        u = r(138525);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_MY_ORDER),
            (0, o.switchMap)(function (e) {
              var t = e.pIndex,
                r = e.pSize;
              return u({
                url: '/web/j/postGradeOrderBean.pageMyOrder.rpc',
                body: { pIndex: t, pSize: r },
              });
            }),
            (0, o.map)(function (e) {
              return { type: i.Type.GET_MY_ORDER_SUCCESS, data: null != e ? e : {} };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_ORDER_LOGISTICS),
            (0, o.switchMap)(function (e) {
              var t = e.bizOrderId;
              return u({
                url: '/web/j/mocLogisticsRpcBean.listBizOrderLogistics.rpc',
                body: { bizOrderId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: i.Type.GET_ORDER_LOGISTICS_SUCCESS, data: null != e ? e : null };
            }),
          );
        },
        function (e, t, r) {
          var a = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.UPDATE_ORDER_EXTRA_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.orderId,
                r = e.bizOrderExtraInfoDto;
              return a({
                url: '/web/j/mocLogisticsRpcBean.updateBizOrderExtraInfo.rpc',
                body: { orderId: t, bizOrderExtraInfoDto: JSON.stringify(r) },
                raw: !0,
              });
            }),
            (0, o.map)(function (e) {
              return e && 0 === e.code
                ? {
                    type: i.Type.UPDATE_ORDER_EXTRA_INFO_SUCCESS,
                    data: null == e ? void 0 : e.result,
                  }
                : {
                    type: u.Type.SHOW_ERR_MSG,
                    msg: (null == e ? void 0 : e.message) || '更新失败',
                  };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_ORDER_EXTRA_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.orderId;
              return u({
                url: '/web/j/mocLogisticsRpcBean.getBizOrderExtraInfo.rpc',
                body: { orderId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: i.Type.GET_ORDER_EXTRA_INFO_SUCCESS, data: null != e ? e : null };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.HAS_BIND_IPHONE),
            (0, o.switchMap)(function () {
              return u({ url: '/web/j/memberBean.hasBindIPhoneOrBindFail.rpc', body: {} });
            }),
            (0, o.map)(function (e) {
              return { type: i.Type.HAS_BIND_IPHONE_SUCCESS, data: null != e ? e : null };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_JPK_ORDER),
            (0, o.switchMap)(function (e) {
              var t = e.pageNumber,
                r = e.pageSize;
              return u({
                url: 'http://nei.hz.netease.com/api/apimock-v2/6759a1680f976e984a0164a858fe9b1f/j/withJPK/order.json',
                method: 'GET',
                body: { pageNumber: t, pageSize: r, filter: 'adult' },
              });
            }),
            (0, o.map)(function (e) {
              return { type: i.Type.GET_JPK_ORDER_SUCCESS, data: null != e ? e : null };
            }),
          );
        },
      ];
    },
    244493: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328),
        o = r(397338);
      function i(e) {
        return (
          (i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          i(e)
        );
      }
      function u(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? u(Object(r), !0).forEach(function (t) {
                c(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : u(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != i(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != i(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == i(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var l = (0, n.createActions)({
          getMyOrder: ['pIndex', 'pSize'],
          getMyOrderSuccess: null,
          getOrderLogistics: ['bizOrderId'],
          getOrderLogisticsSuccess: null,
          updateOrderExtraInfo: ['orderId', 'bizOrderExtraInfoDto'],
          updateOrderExtraInfoSuccess: null,
          getOrderExtraInfo: ['orderId'],
          getOrderExtraInfoSuccess: null,
          hasBindIphone: null,
          hasBindIphoneSuccess: null,
          getJpkOrder: ['pageNumber', 'pageSize'],
          getJpkOrderSuccess: null,
        }),
        d = (t.Type = l.Types),
        p =
          ((t.Creator = l.Creators),
          {
            myOrderListQuery: {},
            myOrderList: [],
            orderLogisticsList: [],
            orderExtraInfo: {},
            hasBindIphoneResult: !1,
            jpkOrderList: [],
          });
      t.default = (0, n.createReducer)(
        p,
        c(
          c(
            c(
              c(
                c(
                  c({}, d.GET_MY_ORDER_SUCCESS, function () {
                    var e,
                      t,
                      r,
                      n = arguments.length > 1 ? arguments[1] : void 0;
                    return a(
                      a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                      {},
                      {
                        myOrderListQuery:
                          (null === (e = n.data) || void 0 === e ? void 0 : e.query) || {},
                        myOrderList:
                          ((r = (null === (t = n.data) || void 0 === t ? void 0 : t.list) || []),
                          r.map(function (e) {
                            return (
                              (e.key = e.id),
                              e.postGradeOrderDtos &&
                                e.postGradeOrderDtos.length &&
                                (e.postGradeOrderDtos.forEach(function (e) {
                                  e.key = e.id;
                                }),
                                (e.children = e.postGradeOrderDtos)),
                              e
                            );
                          })),
                      },
                    );
                  }),
                  d.GET_ORDER_LOGISTICS_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return a(
                      a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                      {},
                      { orderLogisticsList: e.data || [] },
                    );
                  },
                ),
                d.GET_ORDER_EXTRA_INFO_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return a(
                    a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                    {},
                    { orderExtraInfo: e.data || {} },
                  );
                },
              ),
              d.UPDATE_ORDER_EXTRA_INFO_SUCCESS,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p;
                return (o.message.success('更新成功！'), a({}, e));
              },
            ),
            d.HAS_BIND_IPHONE_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return a(
                a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                {},
                { hasBindIphoneResult: e.data },
              );
            },
          ),
          d.GET_JPK_ORDER_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return a(
              a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { jpkOrderList: e.data || [] },
            );
          },
        ),
      );
    },
    209107: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        i = r(319966);
      function u(e) {
        return (
          (u =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          u(e)
        );
      }
      function a(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != u(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != u(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == u(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(i.Type.GET_WX_STUDY_EVENT_LIST),
            (0, o.switchMap)(function (e) {
              var t = e.openId;
              return u({
                raw: !0,
                url: '/web/j/mocPersonStudyPlanRpcBean.getWebChatStudyEventsByOpenId.rpc',
                body: { openId: t },
              });
            }),
            (0, o.map)(function (e) {
              return (function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = null != arguments[t] ? arguments[t] : {};
                  t % 2
                    ? a(Object(r), !0).forEach(function (t) {
                        c(e, t, r[t]);
                      })
                    : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                      : a(Object(r)).forEach(function (t) {
                          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                        });
                }
                return e;
              })({ type: i.Type.GET_WX_STUDY_EVENT_LIST_SUCCESS }, null != e ? e : {});
            }),
          );
        },
      ];
    },
    319966: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328),
        o = r(397338);
      function i(e) {
        return (
          (i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          i(e)
        );
      }
      function u(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? u(Object(r), !0).forEach(function (t) {
                c(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : u(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != i(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != i(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == i(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var l = (0, n.createActions)({
          getWxStudyEventList: ['openId'],
          getWxStudyEventListSuccess: null,
        }),
        d = l.Types,
        p = l.Creators,
        s = ((t.Creator = p), (t.Type = d), { studyEventList: null, isBinded: null });
      t.default = (0, n.createReducer)(
        s,
        c({}, d.GET_WX_STUDY_EVENT_LIST_SUCCESS, function () {
          var e,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
            r = arguments.length > 1 ? arguments[1] : void 0,
            n = r.code,
            i = r.result;
          return 500 === n
            ? a(a({}, t), {}, { isBinded: !1 })
            : 0 !== n
              ? (o.message.error(
                  null !== (e = r.message) && void 0 !== e ? e : '前方拥堵，请稍后再试',
                ),
                t)
              : a(a({}, t), {}, { studyEventList: null != i ? i : [], isBinded: !0 });
        }),
      );
    },
    438210: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = S(r(582033)),
        o = S(r(157374)),
        i = S(r(420844)),
        u = S(r(67391)),
        a = S(r(772101)),
        c = S(r(954152)),
        l = S(r(181785)),
        d = S(r(209107)),
        p = S(r(93649)),
        s = S(r(47478)),
        f = S(r(401870)),
        y = S(r(115761));
      function S(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function E(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return T(e);
          })(e) ||
          (function (e) {
            if (
              ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e);
          })(e) ||
          (function (e, t) {
            if (e) {
              if ('string' == typeof e) return T(e, t);
              var r = {}.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? T(e, t)
                    : void 0
              );
            }
          })(e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function T(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      t.default = [].concat(
        E(o.default),
        E(n.default),
        E(u.default),
        E(i.default),
        E(c.default),
        E(d.default),
        E(a.default),
        E(l.default),
        E(p.default),
        E(s.default),
        E(f.default),
        E(y.default),
      );
    },
    194529: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          KEY_MY_LEARN_TIME: '学习时长',
          KEY_CAN_LOOK_YOUR_TIME: '这里可以查看您的学习时长哦',
          KEY_DATA_TEACH_ADMIN_TOR: '您的学习数据在老师课程管理后台将隔天更新',
          KEY_LESSON_STUDY_PROCESS: '课时学习进度：',
          KEY_CONTENT_CHAPTER_INCLUDE:
            '学习内容的结构是章节包含小节，小节包含单元内容。小节学习进度是指你已经学习过的小节数和总小节的比值。',
          KEY_VEDIO_STUDY_TIME: '视频学习时长：',
          KEY_TIME: '时',
          KEY_MINUTES: '分钟',
          KEY_GE: '个',
          KEY_LESSON_VEDIO_STUDY_MORE: '当前课程中视频学习的实际观看的累计时长。',
          KEY_VEDIO_LOOK_GESHU: '视频观看个数：',
          KEY_REAL_WATCH_GESHU: '实际视频的观看个数。',
        }));
    },
    717381: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          KEY_MY_LEARN_TIME: 'My study hours',
          KEY_CAN_LOOK_YOUR_TIME: 'You can check your study hours here!',
          KEY_DATA_TEACH_ADMIN_TOR:
            "Your learning data will be updated every other day in the teacher's course management back office",
          KEY_LESSON_STUDY_PROCESS: 'Lesson learning progression:',
          KEY_CONTENT_CHAPTER_INCLUDE:
            'The learning content is structured so that chapters contain lessons and lessons contain unit content. The lesson learning progression is the ratio of the number of lessons you have studied to the total number of lessons.',
          KEY_VEDIO_STUDY_TIME: 'Duration of video study:',
          KEY_TIME: ' hours ',
          KEY_MINUTES: ' minutes ',
          KEY_GE: '',
          KEY_LESSON_VEDIO_STUDY_MORE:
            'The cumulative number of hours of video learning actually watched in the current course.',
          KEY_VEDIO_LOOK_GESHU: 'Number of videos viewed:',
          KEY_REAL_WATCH_GESHU: 'The number of actual videos watched.',
        }));
    },
    740915: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          KEY_MY_LEARN_TIME: 'My学習時間',
          KEY_CAN_LOOK_YOUR_TIME: 'ここであなたの学習時間を確認できます',
          KEY_DATA_TEACH_ADMIN_TOR: 'あなたの学習データは先生のコース管理画面で翌日更新されます',
          KEY_LESSON_STUDY_PROCESS: 'レッスンの学習進捗：',
          KEY_CONTENT_CHAPTER_INCLUDE:
            '学習内容には、章節レッスン、レッスンにユニットコンテンツが含まれる構造ですという構造になっています。レッスン学習進捗とは、あなたが学習したレッスン時間と総時間の比率です。',
          KEY_VEDIO_STUDY_TIME: '動画学習時間：',
          KEY_TIME: '時',
          KEY_MINUTES: '分',
          KEY_GE: '個',
          KEY_LESSON_VEDIO_STUDY_MORE: '現在のコースでの動画学習の実際視聴時間の累積時間。',
          KEY_VEDIO_LOOK_GESHU: '動画視聴件数：',
          KEY_REAL_WATCH_GESHU: '実際動画の視聴数。',
        }));
    },
    282262: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function () {
          var e = (0, n.getLocal)();
          return 'en' === e ? o.default : 'ja' === e ? u.default : i.default;
        }));
      var n = r(935852),
        o = a(r(717381)),
        i = a(r(194529)),
        u = a(r(740915));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    328929: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(82960),
        o = E(r(912440)),
        i = E(r(906341)),
        u = E(r(602407)),
        a = E(r(351202)),
        c = E(r(188548)),
        l = E(r(51083)),
        d = E(r(360496)),
        p = E(r(319966)),
        s = E(r(216312)),
        f = E(r(244493)),
        y = E(r(244309)),
        S = E(r(52395));
      function E(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = (0, n.combineReducers)({
        channel: i.default,
        bargain: o.default,
        index: a.default,
        communityTipModal: u.default,
        youdaoJPKConvertModal: l.default,
        wxStudy: p.default,
        learnHours: c.default,
        teacherApply: d.default,
        couponUsage: s.default,
        user: f.default,
        orderService: y.default,
        examLottery: S.default,
      });
    },
    142310: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(397338),
        o = r(48816),
        i = r(832780),
        u = r(138525);
      t.default = [
        function (e, t, r) {
          var a = r.fetch;
          return (
            r.g,
            e.pipe(
              (0, o.ofType)(u.Type.EXPORT_POLLING),
              (0, i.delay)(500),
              (0, i.switchMap)(function (e) {
                var t = e.threadId;
                return a({
                  url: '/web/j/commonBean.getThreadStatusVoByThreadId.rpc',
                  body: { threadId: t },
                }).pipe(
                  (0, i.map)(function (e) {
                    return { threadId: t, res: e };
                  }),
                );
              }),
              (0, i.map)(function (e) {
                var r = e.threadId,
                  o = e.res;
                if (o.finished) {
                  var i, a;
                  if (!o.data || !o.result) return (n.message.error('导出失败！请刷新重试'), !1);
                  o.data.replace(/http(s?):\/\//, '//');
                  var c,
                    l = window.document,
                    d = l.createElement('a'),
                    p =
                      null !== (i = null === (a = o.data) || void 0 === a ? void 0 : a.trim()) &&
                      void 0 !== i
                        ? i
                        : '';
                  (d.setAttribute('href', p.replace(/^http:/, '')),
                    d.setAttribute('style', 'display: none'),
                    l.body.appendChild(d),
                    d.click(),
                    setTimeout(function () {
                      d.parentNode.removeChild(d);
                    }));
                  try {
                    c = t.value.sys.threadIdList.find(function (e) {
                      return e.threadId === r;
                    }).returnType;
                  } catch (e) {
                    console.log('some thing bad happens!');
                  }
                  return { type: u.Type.EXPORT_SUCCESS, threadId: r, returnType: c };
                }
                return { type: u.Type.EXPORT_POLLING, threadId: r };
              }),
            )
          );
        },
        function (e) {
          return e.pipe(
            (0, o.ofType)(u.Type.EXPORT_SUCCESS),
            (0, i.map)(function (e) {
              var t = e.returnType;
              return t ? { type: t } : { type: u.Type.SWALLOW_IT };
            }),
          );
        },
      ];
    },
    138525: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328);
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      function i(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      function u(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? u(Object(r), !0).forEach(function (t) {
                c(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : u(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function c(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != o(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != o(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == o(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var l = (0, n.createActions)({
          swallowIt: null,
          exportPolling: ['threadId'],
          exportSuccess: ['threadId'],
          showErrMsg: ['msg'],
          clearErrMsg: null,
          showSuccessMsg: ['msg'],
          clearSuccessMsg: null,
        }),
        d = l.Types,
        p = l.Creators,
        s = ((t.Creator = p), (t.Type = d), { threadIdList: [], errMsg: null, successMsg: null });
      t.default = (0, n.createReducer)(
        s,
        c(
          c(
            c(
              c(
                c(
                  c(
                    c({}, d.SWALLOW_IT, function () {
                      return arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s;
                    }),
                    d.EXPORT_POLLING,
                    function () {
                      var e,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                        r = arguments.length > 1 ? arguments[1] : void 0;
                      return a(
                        a({}, t),
                        {},
                        {
                          threadIdList: t.threadIdList.find(function (e) {
                            return e.threadId === r.threadId;
                          })
                            ? t.threadIdList
                            : [].concat(
                                ((e = t.threadIdList),
                                (function (e) {
                                  if (Array.isArray(e)) return i(e);
                                })(e) ||
                                  (function (e) {
                                    if (
                                      ('undefined' != typeof Symbol &&
                                        null != e[Symbol.iterator]) ||
                                      null != e['@@iterator']
                                    )
                                      return Array.from(e);
                                  })(e) ||
                                  (function (e, t) {
                                    if (e) {
                                      if ('string' == typeof e) return i(e, t);
                                      var r = {}.toString.call(e).slice(8, -1);
                                      return (
                                        'Object' === r && e.constructor && (r = e.constructor.name),
                                        'Map' === r || 'Set' === r
                                          ? Array.from(e)
                                          : 'Arguments' === r ||
                                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                                            ? i(e, t)
                                            : void 0
                                      );
                                    }
                                  })(e) ||
                                  (function () {
                                    throw new TypeError(
                                      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                                    );
                                  })()),
                                [{ threadId: r.threadId, returnType: r.returnType }],
                              ),
                        },
                      );
                    },
                  ),
                  d.EXPORT_SUCCESS,
                  function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
                      t = arguments.length > 1 ? arguments[1] : void 0;
                    return a(
                      a({}, e),
                      {},
                      {
                        threadIdList: e.threadIdList.filter(function (e) {
                          return e.threadId !== t.threadId;
                        }),
                      },
                    );
                  },
                ),
                d.SHOW_ERR_MSG,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return a(
                    a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                    {},
                    { errMsg: e.msg },
                  );
                },
              ),
              d.CLEAR_ERR_MSG,
              function () {
                return a(
                  a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                  {},
                  { errMsg: null },
                );
              },
            ),
            d.SHOW_SUCCESS_MSG,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return a(
                a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
                {},
                { successMsg: e.msg },
              );
            },
          ),
          d.CLEAR_SUCCESS_MSG,
          function () {
            return a(
              a({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
              {},
              { successMsg: null },
            );
          },
        ),
      );
    },
  },
]);
