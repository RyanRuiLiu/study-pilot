'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [58324],
  {
    380854: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DEFAULT_AVATOR = void 0),
        (t.DEFAULT_AVATOR =
          'https://edu-image.nosdn.127.net/49E89BEA3F1B3F1AC788F5F94C4A457F.png'));
    },
    965196: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n,
        o = r(48816),
        u = r(832780),
        i = r(235079),
        l = (n = r(615010)) && n.__esModule ? n : { default: n },
        a = r(380854);
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
      function p(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return s(e);
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
              if ('string' == typeof e) return s(e, t);
              var r = {}.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? s(e, t)
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
      function s(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      function f(e, t) {
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
      function m(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? f(Object(r), !0).forEach(function (t) {
                d(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : f(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function d(e, t, r) {
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
      var y = function (e) {
          var t, r;
          return m(
            m({}, e),
            {},
            {
              count: (null === (t = e.members) || void 0 === t ? void 0 : t.length) || 0,
              members:
                null !== (r = e.members) && void 0 !== r && r.length
                  ? e.members.map(function (e) {
                      var t = e.largeFaceUrl || a.DEFAULT_AVATOR;
                      return m(m({}, e), {}, { avator: l.default.imageUtil.scaleImage(t, 25, 25) });
                    })
                  : [],
            },
          );
        },
        v = function (e) {
          return (null != e && e.length ? e : []).map(function (e) {
            return y(e);
          });
        },
        g = function (e, t) {
          var r = null != t && t.length ? t.length - 1 : 0,
            n = !(null == t || !t.length) && -1 === t[r].id,
            o = y(e);
          return n ? [].concat(p(t.slice(0, r)), [o, t[r]]) : [].concat(p(t), [o]);
        };
      t.default = [
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.GET_GROUP_LIST),
            (0, u.switchMap)(function (e) {
              var r = e.classroomId;
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.listGroup.rpc',
                body: { classroomId: r || t.value.h5.group.urlParams.classroomId },
              });
            }),
            (0, u.map)(function (e) {
              return { type: i.Type.GET_GROUP_LIST_SUCCESS, list: v(e) };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.INIT_GROUP),
            (0, u.switchMap)(function (e) {
              var r = e.groupMemberNumber;
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.fullGroup.rpc',
                body: { classroomId: t.value.h5.group.urlParams.classroomId, groupMemberNumber: r },
              });
            }),
            (0, u.map)(function (e) {
              return {
                type: null != e && e.length ? i.Type.INIT_GROUP_SUCCESS : i.Type.INIT_GROUP_FAILED,
                list: v(e),
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.ADD_GROUP),
            (0, u.switchMap)(function (e) {
              var r = e.groupName;
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.createGroup.rpc',
                body: { classroomId: t.value.h5.group.urlParams.classroomId, groupName: r },
              });
            }),
            (0, u.map)(function (e) {
              return {
                type: e ? i.Type.ADD_GROUP_SUCCESS : i.Type.ADD_GROUP_FAILED,
                list: e ? g(e, t.value.h5.group.list) : t.value.h5.group.list,
                addGroupSuccess: !!e,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.CLEAR_GROUP),
            (0, u.switchMap)(function () {
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.cleanAllGroups.rpc',
                body: { classroomId: t.value.h5.group.urlParams.classroomId },
              });
            }),
            (0, u.map)(function (e) {
              return { type: e ? i.Type.CLEAR_GROUP_SUCCESS : i.Type.CLEAR_GROUP_FAILED };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.EDIT_GROUP),
            (0, u.switchMap)(function (e) {
              var r = e.groupId,
                o = e.groupName;
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.editGroup.rpc',
                body: { groupId: r, groupName: o },
              }).pipe(
                (0, u.map)(function (e) {
                  return {
                    type: e ? i.Type.EDIT_GROUP_SUCCESS : i.Type.EDIT_GROUP_FAILED,
                    groupInfo: e,
                    list: e
                      ? t.value.h5.group.list.map(function (e) {
                          return e.id === r ? m(m({}, e), {}, { groupName: o }) : e;
                        })
                      : t.value.h5.group.list,
                  };
                }),
              );
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.MOVE_MEMBERS),
            (0, u.switchMap)(function (e) {
              var t = e.fromGroupId,
                r = e.toGroupId,
                o = e.memberIds,
                u = e.classroomId;
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.moveGroupMember.rpc',
                body: { fromGroupId: t, toGroupId: r, memberIds: o, classroomId: u },
              });
            }),
            (0, u.map)(function (e) {
              if (e.errType) return { type: i.Type.MOVE_MEMBERS_FAILED };
              var t = l.default.urlUtil.parseParams().groupId,
                r = e.filter(function (e) {
                  return e.id == t;
                });
              return {
                type: e.errType ? i.Type.MOVE_MEMBERS_FAILED : i.Type.MOVE_MEMBERS_SUCCESS,
                groupInfo: null != r && r.length ? r[0] : null,
                moveSuccessTime: +new Date(),
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.DISBAND_GROUP),
            (0, u.switchMap)(function (e) {
              var t = e.groupId;
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.disbandGroup.rpc',
                body: { groupId: t },
              }).pipe(
                (0, u.map)(function (e) {
                  return null != e && e.errType
                    ? { type: i.Type.DISBAND_GROUP_FAILED }
                    : { type: i.Type.DISBAND_GROUP_SUCCESS };
                }),
              );
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.GET_CLASSROOM_BY_ID),
            (0, u.switchMap)(function () {
              return n({
                url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getClassroomById.rpc',
                body: { classroomId: t.value.h5.group.urlParams.classroomId },
              });
            }),
            (0, u.map)(function (e) {
              var t = e.enrollCount;
              return {
                type: Number.isInteger(t)
                  ? i.Type.GET_CLASSROOM_BY_ID_SUCCESS
                  : i.Type.GET_CLASSROOM_BY_ID_FAILED,
                enrollCount: t || 0,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, o.ofType)(i.Type.GET_GROUP_INFO),
            (0, u.switchMap)(function (e) {
              var t = e.groupId,
                r = e.classroomId;
              return n({
                url: '/mm-classroom/web/j/groupRpcBean.groupDetail.rpc',
                body: { groupId: t, classroomId: r },
              });
            }),
            (0, u.map)(function (e) {
              return { type: i.Type.GET_GROUP_INFO_SUCCESS, res: e };
            }),
          );
        },
      ];
    },
    235079: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o,
        u = r(96328),
        i = (n = r(615010)) && n.__esModule ? n : { default: n };
      function l(e) {
        return (
          (l =
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
          l(e)
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
                p(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function p(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != l(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != l(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == l(t) ? t : t + '';
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
      var s = (0, u.createActions)({
          getGroupList: ['classroomId'],
          getGroupListSuccess: null,
          initGroup: ['groupMemberNumber'],
          initGroupSuccess: null,
          addGroup: ['groupName'],
          addGroupSuccess: null,
          clearGroup: null,
          clearGroupSuccess: null,
          editGroup: ['groupId', 'groupName'],
          editGroupSuccess: null,
          moveMembers: ['fromGroupId', 'toGroupId', 'memberIds', 'classroomId'],
          moveMembersSuccess: null,
          moveMembersFailed: null,
          disbandGroup: ['groupId'],
          disbandGroupSuccess: null,
          disbandGroupFailed: null,
          setGroupManageWindow: ['g'],
          setGroupManageUrlParams: ['urlParams'],
          setGroupManageUserInfo: ['userInfo'],
          toggleAdd: ['showAdd'],
          toggleAddGroupSuccess: ['addGroupSuccess'],
          getClassroomById: null,
          getClassroomByIdSuccess: null,
          getGroupInfo: ['groupId', 'classroomId'],
          getGroupInfoSuccess: null,
        }),
        f = s.Types,
        m = s.Creators,
        d =
          ((t.Creator = m),
          (t.Type = f),
          {
            list: [],
            enrollCount: 0,
            showManageGroup: !1,
            showMoveMembers: !1,
            showAdd: !1,
            addGroupSuccess: !1,
            g: {},
            urlParams: {},
            userInfo: {},
            currentGroup: { id: null, classroomId: null, groupName: '', members: [] },
          });
      t.default = (0, u.createReducer)(
        d,
        (p(
          p(
            p(
              p(
                p(
                  p(
                    p(
                      p(
                        p(
                          p((o = {}), f.GET_GROUP_LIST_SUCCESS, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                              ),
                              {},
                              { list: e.list },
                            );
                          }),
                          f.INIT_GROUP_SUCCESS,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                              ),
                              {},
                              { list: e.list, showAdd: !1 },
                            );
                          },
                        ),
                        f.ADD_GROUP_SUCCESS,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return c(
                            c(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                            ),
                            {},
                            { list: e.list, addGroupSuccess: e.addGroupSuccess },
                          );
                        },
                      ),
                      f.CLEAR_GROUP_SUCCESS,
                      function () {
                        return c(
                          c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                          {},
                          { list: [], total: 0 },
                        );
                      },
                    ),
                    f.EDIT_GROUP_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                        {},
                        { list: e.list, currentGroup: e.groupInfo },
                      );
                    },
                  ),
                  f.MOVE_MEMBERS_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                      {},
                      { list: e.list, currentGroup: e.groupInfo },
                    );
                  },
                ),
                f.MOVE_MEMBERS_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                    {},
                    { currentGroup: e.groupInfo, moveSuccessTime: e.moveSuccessTime },
                  );
                },
              ),
              f.GET_GROUP_INFO_SUCCESS,
              function () {
                var e,
                  t = arguments.length > 1 ? arguments[1] : void 0;
                return c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  {},
                  { currentGroup: null !== (e = t.res) && void 0 !== e ? e : {} },
                );
              },
            ),
            f.DISBAND_GROUP_SUCCESS,
            function () {
              var e,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                r = arguments.length > 1 ? arguments[1] : void 0,
                n = i.default.urlUtil.parseParams().classroomId,
                o = '/h5/teacher/group/listManage.htm?classroomId='.concat(n, '&isTeacher=true');
              return c(
                c({}, t),
                {},
                { currentGroup: null !== (e = r.res) && void 0 !== e ? e : {}, returnUrl: o },
              );
            },
          ),
          f.TOGGLE_ADD,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return c(
              c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
              {},
              { showAdd: e.showAdd },
            );
          },
        ),
        p(
          p(
            p(
              p(
                p(o, f.TOGGLE_ADD_GROUP_SUCCESS, function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                    {},
                    { addGroupSuccess: e.addGroupSuccess },
                  );
                }),
                f.GET_CLASSROOM_BY_ID_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                    {},
                    { enrollCount: e.enrollCount },
                  );
                },
              ),
              f.SET_GROUP_MANAGE_WINDOW,
              function () {
                var e,
                  t = arguments.length > 1 ? arguments[1] : void 0;
                return c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  {},
                  { g: null !== (e = t.g) && void 0 !== e ? e : {} },
                );
              },
            ),
            f.SET_GROUP_MANAGE_URL_PARAMS,
            function () {
              var e,
                t = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  'true' === t.urlParams.isTeacher
                    ? { showManageGroup: !0, showMoveMembers: !0 }
                    : { showManageGroup: !1, showMoveMembers: !1 },
                ),
                {},
                { urlParams: null !== (e = t.urlParams) && void 0 !== e ? e : {} },
              );
            },
          ),
          f.SET_GROUP_MANAGE_USER_INFO,
          function () {
            var e,
              t = arguments.length > 1 ? arguments[1] : void 0;
            return c(
              c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
              {},
              { userInfo: null !== (e = t.userInfo) && void 0 !== e ? e : {} },
            );
          },
        )),
      );
    },
    789663: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.TIME_INFINITE = t.DEFAULT_AVATOR = void 0),
        (t.TIME_INFINITE = 325036512e5),
        (t.DEFAULT_AVATOR =
          'https://edu-image.nosdn.127.net/49E89BEA3F1B3F1AC788F5F94C4A457F.png'));
    },
    857435: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n,
        o = r(397338),
        u = (n = r(795093)) && n.__esModule ? n : { default: n },
        i = r(48816),
        l = r(832780),
        a = r(789663),
        c = r(991350),
        p = r(572662);
      function s(e) {
        return (
          (s =
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
          s(e)
        );
      }
      function f(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return m(e);
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
              if ('string' == typeof e) return m(e, t);
              var r = {}.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? m(e, t)
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
      function m(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
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
      function y(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? d(Object(r), !0).forEach(function (t) {
                v(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : d(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function v(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != s(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != s(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == s(t) ? t : t + '';
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
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.GET_POST),
            (0, l.switchMap)(function () {
              return n({
                url: '/mm-classroom/web/j/forumRpcBean.getPost.rpc',
                body: {
                  postId: t.value.h5.post.urlParams.postId,
                  classroomId: t.value.h5.post.urlParams.classroomId,
                },
              });
            }),
            (0, l.map)(function (e) {
              return {
                type: c.Type.GET_POST_SUCCESS,
                postContent: y(
                  y({}, e),
                  {},
                  {
                    images: e.images ? JSON.parse(e.images) : [],
                    publishTimeText: e.publishTime
                      ? (0, u.default)(e.publishTime).format('YYYY-MM-DD HH:mm')
                      : '',
                  },
                ),
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.GET_REPLY_LIST),
            (0, l.switchMap)(function (e) {
              var r = e.pageSize,
                o = void 0 === r ? 20 : r;
              return (
                void 0 === e.beforeTime && a.TIME_INFINITE,
                n({
                  url: '/mm-classroom/web/j/forumReplyRpcBean.getReplyPage.rpc',
                  body: {
                    postId: t.value.h5.post.urlParams.postId,
                    pageSize: o,
                    beforeTime: a.TIME_INFINITE,
                  },
                })
              );
            }),
            (0, l.map)(function (e) {
              var r,
                n = e.totalReplyStudentCount,
                o = void 0 === n ? 0 : n,
                u = e.replyPage,
                i = void 0 === u ? { list: [] } : u;
              return {
                type: c.Type.GET_REPLY_LIST_SUCCESS,
                total: o,
                query: null !== (r = null == i ? void 0 : i.query) && void 0 !== r ? r : {},
                list: i.list
                  ? i.list.map(function (e) {
                      var r,
                        n =
                          e.headImageUrl ||
                          'https://edu-image.nosdn.127.net/49E89BEA3F1B3F1AC788F5F94C4A457F.png';
                      return y(
                        y({}, e),
                        {},
                        {
                          replyTimeFormat: e.replyTime ? (0, p.formatTime)(e.replyTime) : '--',
                          avator: n,
                          tagAgreeText: e.tagAgree ? '优秀发言' : '',
                          images: (function (e) {
                            var t = [];
                            if (!e) return t;
                            try {
                              t = JSON.parse(e);
                            } catch (e) {
                              t = [];
                            }
                            return t;
                          })(e.images),
                          deletable:
                            e.replierId ==
                            (null === (r = t.value.h5.post.userInfo) || void 0 === r
                              ? void 0
                              : r.id),
                        },
                      );
                    })
                  : [],
                isOpen: !(i.list && i.list.length),
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.LIKE),
            (0, l.switchMap)(function (e) {
              var r = e.targetId,
                o = e.targetType,
                u = void 0 === o ? 2 : o,
                i = e.agree;
              return n({
                url: '/mm-classroom/web/j/forumRpcBean.markVote.rpc',
                body: {
                  postId: t.value.h5.post.urlParams.postId,
                  targetId: r,
                  targetType: u,
                  agree: i,
                },
              }).pipe(
                (0, l.map)(function (e) {
                  var n, o, u, l;
                  return {
                    type: c.Type.LIKE_SUCCESS,
                    list:
                      ((n = e),
                      (u = t.value.h5.post.list),
                      (l = u.findIndex(function (e) {
                        return e.id === r;
                      })),
                      -1 === l
                        ? u
                        : [].concat(
                            f(u.slice(0, l)),
                            [
                              y(
                                y({}, u[l]),
                                {},
                                {
                                  countVote: n,
                                  agree: i,
                                  tagAgreeText:
                                    ((o = u[l].tagAgreeText),
                                    t.value.h5.post.isTeacher ? (i ? '优秀发言' : '') : o),
                                },
                              ),
                            ],
                            f(u.slice(l + 1)),
                          )),
                  };
                }),
              );
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.DELETE_REPLY),
            (0, l.switchMap)(function (e) {
              var r = e.replyId;
              return n({
                url: '/mm-classroom/web/j/forumReplyRpcBean.deleteReply.rpc',
                body: { replyId: r },
              }).pipe(
                (0, l.map)(function (e) {
                  var n, o;
                  return {
                    type: c.Type.DELETE_REPLY_SUCCESS,
                    list:
                      ((n = t.value.h5.post.list),
                      (o = n.findIndex(function (e) {
                        return e.id === r;
                      })),
                      -1 === o ? n : [].concat(f(n.slice(0, o)), f(n.slice(o + 1)))),
                  };
                }),
              );
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.GET_NEW_REPLY_COUNT),
            (0, l.switchMap)(function (e) {
              var r = e.afterTime,
                o = void 0 === r ? -1 : r;
              return n({
                url: '/mm-classroom/web/j/forumReplyRpcBean.countReplyAfterTime.rpc',
                body: { postId: t.value.h5.post.urlParams.postId, afterTime: o },
              });
            }),
            (0, l.map)(function (e) {
              return { type: c.Type.GET_NEW_REPLY_COUNT_SUCCESS, newReplyCount: e };
            }),
          );
        },
        function (e, t) {
          return e.pipe(
            (0, i.ofType)(c.Type.NEXT_PAGE),
            (0, l.map)(function () {
              return {
                type: c.Type.GET_REPLY_LIST,
                pageSize: t.value.h5.post.currentPageSize,
                beforeTime: t.value.h5.post.beforeTime,
              };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.DELETE_REPLY_SUCCESS),
            (0, l.switchMap)(function () {
              return n({
                url: '/mm-classroom/web/j/forumReplyRpcBean.countPostReplyMember.rpc',
                body: { postId: t.value.h5.post.urlParams.postId },
              });
            }),
            (0, l.map)(function (e) {
              return { type: c.Type.GET_REPLY_USER_TOTAL_SUCCESS, total: e };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.DELETE_COMMENT),
            (0, l.switchMap)(function (e) {
              var r = e.postId,
                u = e.commentId,
                i = e.replyId;
              return n({
                url: '/mm-classroom/web/j/forumCommentRpcBean.deleteComment.rpc',
                body: { postId: r, commentId: u },
              }).pipe(
                (0, l.map)(function (e) {
                  var r = (function () {
                    var r = t.value.h5.post.list,
                      n = r.find(function (e) {
                        return e.id === i;
                      });
                    if (!e || !n)
                      return (
                        o.message.warning('删除失败'),
                        { type: c.Type.DELETE_COMMENT_FAILED, list: r }
                      );
                    var l =
                      null == n
                        ? void 0
                        : n.mocCommentList.findIndex(function (e) {
                            return e.id === u;
                          });
                    if (-1 === l) return { type: c.Type.DELETE_COMMENT_SUCCESS, list: r };
                    var a = r.findIndex(function (e) {
                      return e.id === i;
                    });
                    return (
                      n.mocCommentList.splice(l, 1),
                      o.message.success('删除成功'),
                      r.splice(a, 1, y(y({}, r[a]), {}, { mocCommentList: n.mocCommentList })),
                      { type: c.Type.DELETE_COMMENT_SUCCESS, list: f(r) }
                    );
                  })();
                  return { type: r.type, list: r.list };
                }),
              );
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, i.ofType)(c.Type.GET_COMMENTS),
            (0, l.switchMap)(function (e) {
              var r = e.replyId;
              return n({
                url: '/mm-classroom/web/j/forumCommentRpcBean.getComments.rpc',
                body: { replyId: r },
              }).pipe(
                (0, l.map)(function (e) {
                  var n, o;
                  return {
                    type: c.Type.GET_COMMENTS_SUCCESS,
                    list:
                      ((n = t.value.h5.post.list),
                      (o = n.findIndex(function (e) {
                        return e.id === r;
                      })),
                      n.splice(
                        o,
                        1,
                        y(y({}, n[o]), {}, { mocCommentList: null != e && e.length ? e : [] }),
                      ),
                      f(n)),
                  };
                }),
              );
            }),
          );
        },
      ];
    },
    991350: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o,
        u = (n = r(795093)) && n.__esModule ? n : { default: n },
        i = r(96328);
      function l(e) {
        return (
          (l =
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
          l(e)
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
                p(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function p(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != l(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != l(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == l(t) ? t : t + '';
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
      var s = (0, i.createActions)({
          getPost: null,
          getPostSuccess: null,
          getReplyList: ['pageSize', 'beforeTime'],
          getReplyListSuccess: null,
          like: ['targetId', 'targetType', 'agree'],
          likeSuccess: null,
          deleteReply: ['replyId'],
          deleteReplySuccess: null,
          getNewReplyCount: ['afterTime'],
          getNewReplyCountSuccess: null,
          toggleFold: ['isOpen'],
          saveParams: ['params'],
          setUrlParams: ['urlParams'],
          setUserInfo: ['userInfo'],
          setFtlData: ['ftlData'],
          nextPage: null,
          getReplyUserTotal: null,
          getReplyUserTotalSuccess: null,
          updateNewReplyCount: ['count'],
          deleteComment: ['postId', 'commentId', 'replyId'],
          deleteCommentSuccess: null,
          deleteCommentFailed: null,
          getComments: ['replyId'],
          getCommentsSuccess: null,
        }),
        f = s.Types,
        m = s.Creators,
        d =
          ((t.Creator = m),
          (t.Type = f),
          {
            postContent: {},
            list: null,
            total: 0,
            newReplycount: '',
            isOpen: !0,
            foldHeight: 380,
            needLikeGuide: !1,
            showCommentArea: !1,
            showNewReplyCount: !1,
            isTeacher: !1,
            urlParams: {},
            userInfo: {},
            ftlData: {},
            currentPageSize: 20,
            beforeTime: (0, u.default)().valueOf(),
          });
      t.default = (0, i.createReducer)(
        d,
        (p(
          p(
            p(
              p(
                p(
                  p(
                    p(
                      p(
                        p(
                          p((o = {}), f.GET_POST_SUCCESS, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                              ),
                              {},
                              { postContent: e.postContent },
                            );
                          }),
                          f.GET_REPLY_LIST,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return c(
                              c(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                              ),
                              {},
                              { beforeTime: e.beforeTime },
                            );
                          },
                        ),
                        f.GET_REPLY_LIST_SUCCESS,
                        function () {
                          var e =
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                          return c(
                            c({}, e),
                            {},
                            {
                              total: t.total,
                              list: t.list,
                              isOpen: t.isOpen,
                              currentPageSize:
                                e.currentPageSize / 20 > t.query.totlePageCount
                                  ? 20 * t.query.totlePageCount
                                  : e.currentPageSize,
                            },
                          );
                        },
                      ),
                      f.GET_NEW_REPLY_COUNT_SUCCESS,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return c(
                          c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                          {},
                          { newReplyCount: e.newReplyCount },
                        );
                      },
                    ),
                    f.LIKE_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                        {},
                        { list: e.list },
                      );
                    },
                  ),
                  f.DELETE_REPLY_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                      {},
                      { list: e.list },
                    );
                  },
                ),
                f.TOGGLE_FOLD,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                    {},
                    { isOpen: e.isOpen },
                  );
                },
              ),
              f.SAVE_PARAMS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  e.params,
                );
              },
            ),
            f.SET_URL_PARAMS,
            function () {
              var e,
                t = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  'true' === t.urlParams.isTeacher
                    ? {
                        needLikeGuide: !0,
                        showCommentArea: !1,
                        showNewReplyCount: !0,
                        isTeacher: !0,
                      }
                    : {
                        needLikeGuide: !1,
                        showCommentArea: !0,
                        showNewReplyCount: !1,
                        isTeacher: !1,
                      },
                ),
                {},
                { urlParams: null !== (e = t.urlParams) && void 0 !== e ? e : {} },
              );
            },
          ),
          f.SET_USER_INFO,
          function () {
            var e,
              t = arguments.length > 1 ? arguments[1] : void 0;
            return c(
              c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
              {},
              { userInfo: null !== (e = t.userInfo) && void 0 !== e ? e : {} },
            );
          },
        ),
        p(
          p(
            p(
              p(
                p(
                  p(
                    p(o, f.SET_FTL_DATA, function () {
                      var e,
                        t = arguments.length > 1 ? arguments[1] : void 0;
                      return c(
                        c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                        {},
                        { ftlData: null !== (e = t.ftlData) && void 0 !== e ? e : {} },
                      );
                    }),
                    f.NEXT_PAGE,
                    function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
                        t = e.currentPageSize;
                      return c(c({}, e), {}, { currentPageSize: 20 * (t / 20 + 1) });
                    },
                  ),
                  f.GET_REPLY_USER_TOTAL_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return c(
                      c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                      {},
                      { total: e.total || 0 },
                    );
                  },
                ),
                f.UPDATE_NEW_REPLY_COUNT,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return c(
                    c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                    {},
                    { newReplyCount: e.count || 0 },
                  );
                },
              ),
              f.DELETE_COMMENT_SUCCESS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return c(
                  c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                  {},
                  { list: e.list },
                );
              },
            ),
            f.DELETE_COMMENT_FAILED,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
                {},
                { list: e.list },
              );
            },
          ),
          f.GET_COMMENTS_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return c(
              c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d),
              {},
              { list: e.list },
            );
          },
        )),
      );
    },
    572662: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.formatTime = t.default = void 0));
      var n,
        o = (n = r(795093)) && n.__esModule ? n : { default: n },
        u = (t.formatTime = function (e) {
          var t = new Date(),
            r = new Date(e),
            n = t.getDay() === r.getDay(),
            u = t.getFullYear() === r.getFullYear();
          return n
            ? (0, o.default)(e).format('HH:mm')
            : u
              ? (0, o.default)(e).format('MM月DD日 HH:mm')
              : (0, o.default)(e).format('YYYY年MM月DD日 HH:mm');
        });
      t.default = { formatTime: u };
    },
    979585: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(688200),
        u = r(764046),
        i = r(832780);
      t.default = [
        function (e, t) {
          return e.pipe(
            (0, n.ofType)(o.Type.INC_ASYC),
            (0, i.switchMap)(function () {
              return u.Observable.create(function (e) {
                setTimeout(function () {
                  e.next(!0);
                }, 2e3);
              });
            }),
            (0, i.map)(function () {
              return { type: o.Type.INC, count: t.value.h5.test.count + 1 };
            }),
          );
        },
        function (e, t) {
          return e.pipe(
            (0, n.ofType)(o.Type.DEC_ASYC),
            (0, i.switchMap)(function () {
              return u.Observable.create(function (e) {
                setTimeout(function () {
                  e.next(!0);
                }, 2e3);
              });
            }),
            (0, i.map)(function () {
              return { type: o.Type.DEC, count: t.value.h5.test.count - 1 };
            }),
          );
        },
      ];
    },
    688200: (e, t, r) => {
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
      function u(e, t, r) {
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
      var i = (0, n.createActions)({
          inc: ['count'],
          dec: ['count'],
          incAsyc: null,
          decAsyc: null,
        }),
        l = i.Types,
        a = i.Creators,
        c = ((t.Creator = a), (t.Type = l), { count: 0 });
      t.default = (0, n.createReducer)(
        c,
        u(
          u({}, l.INC, function () {
            return { count: (arguments.length > 1 ? arguments[1] : void 0).count };
          }),
          l.DEC,
          function () {
            return { count: (arguments.length > 1 ? arguments[1] : void 0).count };
          },
        ),
      );
    },
    247088: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = i(r(979585)),
        o = i(r(857435)),
        u = i(r(965196));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return a(e);
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
              if ('string' == typeof e) return a(e, t);
              var r = {}.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? a(e, t)
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
      function a(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      t.default = [].concat(l(n.default), l(o.default), l(u.default));
    },
    394979: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(82960),
        o = l(r(688200)),
        u = l(r(991350)),
        i = l(r(235079));
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = (0, n.combineReducers)({ test: o.default, post: u.default, group: i.default });
    },
  },
]);
