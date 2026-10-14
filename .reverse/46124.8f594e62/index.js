'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [46124],
  {
    767550: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(755749);
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
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
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
            (0, n.ofType)(a.Type.GET_SCHOOL_RESOURCE),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-school/web/j/schoolEducationResourceBean.search.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(c(c({}, t), {}, { type: r.tag }));
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e, t) {
              return e.data && 0 === e.data.code
                ? {
                    type: a.Type.GET_SCHOOL_RESOURCE_SUCCESS,
                    data: e.data.result,
                    resourceType: e.data.type,
                  }
                : c({ type: a.Type.GET_SCHOOL_RESOURCE_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_SCHOOL_RESOURCE),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-school/web/j/schoolEducationResourceBean.searchSchoolMoocCourse.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.GET_COURSE_SCHOOL_RESOURCE_SUCCESS, data: e.data.result }
                : c({ type: a.Type.GET_COURSE_SCHOOL_RESOURCE_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_TREE_LIST),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-course/web/j/mocCourseBean.getFixedTermStructure.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.GET_COURSE_TREE_LIST_SUCCESS, data: e.data.result }
                : c({ type: a.Type.GET_COURSE_TREE_LIST_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.IMPORT_RESOURCE_TO_PLAN),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-classroom/web/j/mocSchoolEducationResourceBean.importResourceToPlan.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.IMPORT_RESOURCE_TO_PLAN_SUCCESS, data: e.data.result }
                : c({ type: a.Type.IMPORT_RESOURCE_TO_PLAN_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.LIST_IMPORT_RESULT),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-classroom/web/j/mocSchoolEducationResourceBean.listImportResult.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.LIST_IMPORT_RESULT_SUCCESS, data: e.data.result }
                : c({ type: a.Type.LIST_IMPORT_RESULT_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_SCHOOL_RESOURCE_LIST),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-course/web/j/mocCourseBean.getSchoolCourseBySchoolIdOrContent.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.GET_SCHOOL_RESOURCE_LIST_SUCCESS, data: e.data.result }
                : c({ type: a.Type.GET_SCHOOL_RESOURCE_LIST_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.UPDATE_REFERENCE_COUNT),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-school/web/j/schoolEducationResourceBean.updateReferenceCount.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.UPDATE_REFERENCE_COUNT_SUCCESS, data: e.data.result }
                : c({ type: a.Type.UPDATE_REFERENCE_COUNT_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_RECENTLY_COURSE_SCHOOL_RESOURCE),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-classroom/web/j/mocTeacherBean.listRecentCourse.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.GET_RECENTLY_COURSE_SCHOOL_RESOURCE_SUCCESS, data: e.data.result }
                : c({ type: a.Type.GET_RECENTLY_COURSE_SCHOOL_RESOURCE_FAIL }, e);
            }),
          );
        },
      ];
    },
    755749: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328);
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
      function i(e) {
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
      var l = (0, o.createActions)({
          updateCourseSelected: ['selected'],
          updateVideoSelected: ['selectd'],
          updateTeachDocSelected: ['selectd'],
          updateTabExtraText: ['param'],
          getSchoolResource: ['param'],
          getSchoolResourceSuccess: null,
          getSchoolResourceFail: null,
          getCourseSchoolResource: ['param'],
          getCourseSchoolResourceSuccess: null,
          getCourseSchoolResourceFail: null,
          getCourseTreeList: ['param'],
          getCourseTreeListSuccess: null,
          getCourseTreeListFail: null,
          importResourceToPlan: ['param'],
          importResourceToPlanSuccess: null,
          importResourceToPlanFail: null,
          listImportResult: ['param'],
          listImportResultSuccess: null,
          listImportResultFail: null,
          getSchoolResourceList: ['param'],
          getSchoolResourceListSuccess: null,
          getSchoolResourceListFail: null,
          updateReferenceCount: ['param'],
          updateReferenceCountSuccess: null,
          updateReferenceCountFail: null,
          getRecentlyCourseSchoolResource: ['param'],
          getRecentlyCourseSchoolResourceSuccess: null,
          getRecentlyCourseSchoolResourceFail: null,
        }),
        s = l.Types,
        _ = l.Creators,
        p =
          ((t.Creator = _),
          (t.Type = s),
          {
            resourceCourseList: {},
            treeList: [],
            resourceVideoList: {},
            resourceTeachDocList: {},
            courseSelected: [],
            videoSelected: [],
            teachDocSelected: [],
            schoolResourceList: {},
            recentlyCourseList: [],
            tabExtraText: '',
          });
      t.default = (0, o.createReducer)(
        p,
        (c(
          c(
            c(
              c(
                c(
                  c(
                    c(
                      c(
                        c(
                          c((n = {}), s.UPDATE_TAB_EXTRA_TEXT, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return i(
                              i(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                              ),
                              {},
                              { tabExtraText: e.data },
                            );
                          }),
                          s.UPDATE_COURSE_SELECTED,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return i(
                              i(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                              ),
                              {},
                              { courseSelected: e.selected },
                            );
                          },
                        ),
                        s.UPDATE_VIDEO_SELECTED,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return i(
                            i(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                            ),
                            {},
                            { videoSelected: e.selected },
                          );
                        },
                      ),
                      s.UPDATE_TEACH_DOC_SELECTED,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return i(
                          i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                          {},
                          { teachDocSelected: e.selected },
                        );
                      },
                    ),
                    s.GET_SCHOOL_RESOURCE_SUCCESS,
                    function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                        t = arguments.length > 1 ? arguments[1] : void 0,
                        r = 1 === t.resourceType ? 'resourceTeachDocList' : 'resourceVideoList';
                      return i(i({}, e), {}, c({}, r, t.data));
                    },
                  ),
                  s.GET_SCHOOL_RESOURCE_FAIL,
                  function () {
                    return i(
                      {},
                      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                    );
                  },
                ),
                s.GET_COURSE_SCHOOL_RESOURCE_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return i(
                    i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                    {},
                    { resourceCourseList: e.data },
                  );
                },
              ),
              s.GET_COURSE_SCHOOL_RESOURCE_FAIL,
              function () {
                return i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p);
              },
            ),
            s.GET_COURSE_TREE_LIST_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return i(
                i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                {},
                { treeList: e.data },
              );
            },
          ),
          s.GET_COURSE_TREE_LIST_FAIL,
          function () {
            return i(
              i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { treeList: [] },
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
                          c(n, s.IMPORT_RESOURCE_TO_PLAN_SUCCESS, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return i(
                              i(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                              ),
                              {},
                              { importResourceToPlanList: e.data },
                            );
                          }),
                          s.IMPORT_RESOURCE_TO_PLAN_FAIL,
                          function () {
                            return i(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                            );
                          },
                        ),
                        s.LIST_IMPORT_RESULT_SUCCESS,
                        function () {
                          return i(
                            {},
                            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                          );
                        },
                      ),
                      s.LIST_IMPORT_RESULT_FAIL,
                      function () {
                        return i(
                          {},
                          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                        );
                      },
                    ),
                    s.GET_SCHOOL_RESOURCE_LIST_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return i(
                        i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                        {},
                        { schoolResourceList: e.data },
                      );
                    },
                  ),
                  s.GET_SCHOOL_RESOURCE_LIST_FAIL,
                  function () {
                    return i(
                      {},
                      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                    );
                  },
                ),
                s.UPDATE_REFERENCE_COUNT_SUCCESS,
                function () {
                  return i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p);
                },
              ),
              s.UPDATE_REFERENCE_COUNT_FAIL,
              function () {
                return i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p);
              },
            ),
            s.GET_RECENTLY_COURSE_SCHOOL_RESOURCE_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return i(
                i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                {},
                { recentlyCourseList: e.data },
              );
            },
          ),
          s.GET_RECENTLY_COURSE_SCHOOL_RESOURCE_FAIL,
          function () {
            return i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p);
          },
        )),
      );
    },
    384164: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(739503),
        u = c(r(615010)),
        i = c(r(398461));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
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
      function s(e, t) {
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
      function _(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? s(Object(r), !0).forEach(function (t) {
                p(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : s(Object(r)).forEach(function (t) {
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
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_DATA_OVERVIEW),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/termStatisticBean.getDataOverview.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              if (null == e || !e.errType) {
                var t = function (e) {
                    return e ? e.toLocaleString('en-US') : '0';
                  },
                  r = [];
                if (!e.isOfflineClass) {
                  var n = (e.countLearnTime || 0) / 3600,
                    o = Number.isInteger(n);
                  o || (n = n.toFixed(1));
                  var u = o
                    ? t(n)
                    : ''.concat(t(parseInt(n)), '.').concat(n.toString().split('.')[1]);
                  r = r.concat([
                    {
                      name: '线上视频学习总学时（小时）',
                      value: u,
                      tips: '对于关联线上学期所有已发布的视频，课堂学生学习的总学时之和',
                    },
                    {
                      name: '线上考核参与人次',
                      value: t(e.testCount || 0),
                      tips: '对于关联线上学期所有已发布的测验、作业和考试，课堂学生完成的次数之和',
                    },
                  ]);
                }
                return (
                  (r = r.concat([
                    {
                      name: '发布课堂活动次数',
                      value: t(e.publishResourceCount || 0),
                      tips: '课堂中发布的活动次数之和',
                    },
                    {
                      name: '累计课堂活动参与总人次',
                      value: t(e.totalResourceCount || 0),
                      tips: '课堂所有活动中，学生参与的次数之和',
                    },
                  ])),
                  {
                    type: a.Type.GET_DATA_OVERVIEW_SUCCESS,
                    res: { items: r, isOfflineClass: e.isOfflineClass },
                  }
                );
              }
              return _({ type: a.Type.FETCH_FAILED }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_STUDY_PROGRESS),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/termStatisticBean.studyProgress.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_STUDY_PROGRESS_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_VIDEO_LEARN_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.startTime,
                n = e.endTime,
                o = { classroomId: t };
              return (
                r && Object.assign(o, { startTime: r }),
                n && Object.assign(o, { endTime: n }),
                u({
                  url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getVideoViewLearnCount.rpc',
                  body: _({}, o),
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_VIDEO_LEARN_DATA_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSEWARE_LEARN_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.startTime,
                n = e.endTime,
                o = { classroomId: t, isOnline: !0 };
              return (
                r && Object.assign(o, { startTime: r }),
                n && Object.assign(o, { endTime: n }),
                u({
                  url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getCoursewareViewLearnCount.rpc',
                  body: o,
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_COURSEWARE_LEARN_DATA_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_ALL_STU_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getAllStuInfoByClassroomId.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_ALL_STU_INFO_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_VIDEO_LEARN_STU),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.unitId,
                n = e.startTime,
                o = e.endTime,
                a = { classroomId: t, unitId: r };
              return (
                n && Object.assign(a, { startTime: n }),
                o && Object.assign(a, { endTime: o }),
                u({
                  url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getUnitLearnMember.rpc',
                  body: _({}, a),
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_VIDEO_LEARN_STU_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSEWARE_LEARN_STU),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.unitId,
                n = e.startTime,
                o = e.endTime,
                a = { classroomId: t, unitId: r };
              return (
                n && Object.assign(a, { startTime: n }),
                o && Object.assign(a, { endTime: o }),
                u({
                  url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getCoursewareLearnMember.rpc',
                  body: a,
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_COURSEWARE_LEARN_STU_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_CHECK_STU),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.contentId,
                n = e.contentType,
                o = e.startTime,
                a = e.endTime,
                i = { classroomId: t, contentId: r, contentType: n };
              return (
                o && Object.assign(i, { startTime: o }),
                a && Object.assign(i, { endTime: a }),
                u({
                  url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getTestLearnMemberIds.rpc',
                  body: _({}, i),
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_CHECK_STU_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_CHECK_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.startTime,
                n = e.endTime,
                o = { classroomId: t };
              return (
                r && Object.assign(o, { startTime: r }),
                n && Object.assign(o, { endTime: n }),
                u({
                  url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getTestCount.rpc',
                  body: _({}, o),
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.GET_CHECK_DATA_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_OFFLINE_ACTIVITY_STAT),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return i({
                url: '/mm-classroom/web/j/classroomDataBean.getClassroomActivityStatisticsData.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              if (null == e || !e.errType) {
                var t = e || {};
                return {
                  type: a.Type.GET_OFFLINE_ACTIVITY_STAT_SUCCESS,
                  offlineOverview: (function (e) {
                    var t,
                      r,
                      n,
                      o,
                      a,
                      u = e || {};
                    return {
                      activityTotalCount:
                        null !== (t = u.activityTotalCount) && void 0 !== t ? t : 0,
                      signinCount: null !== (r = u.signinCount) && void 0 !== r ? r : 0,
                      questionnaireCount:
                        null !== (n = u.questionnaireCount) && void 0 !== n ? n : 0,
                      paperCount: null !== (o = u.paperCount) && void 0 !== o ? o : 0,
                      forumCount: null !== (a = u.forumCount) && void 0 !== a ? a : 0,
                    };
                  })(null == t ? void 0 : t.overview),
                  offlineDetail: (function (e) {
                    var t,
                      r,
                      n,
                      o,
                      a = e || {};
                    return {
                      signinList: (null !== (t = a.signinList) && void 0 !== t ? t : []).map(
                        function (e) {
                          return _(_({}, e), {}, { count: e.signinCount });
                        },
                      ),
                      forumList: (null !== (r = a.forumList) && void 0 !== r ? r : []).map(
                        function (e) {
                          return _(
                            _({}, e),
                            {},
                            {
                              count: e.forumCount,
                              avgParticipateRate: u.default.mathUtil.accMul(
                                e.avgParticipateRate,
                                100,
                              ),
                            },
                          );
                        },
                      ),
                      paperList: (null !== (n = a.paperList) && void 0 !== n ? n : []).map(
                        function (e) {
                          return _(
                            _({}, e),
                            {},
                            {
                              count: e.paperCount,
                              avgParticipateRate: u.default.mathUtil.accMul(
                                e.avgParticipateRate,
                                100,
                              ),
                              avgCorrectRate: u.default.mathUtil.accMul(e.avgCorrectRate, 100),
                            },
                          );
                        },
                      ),
                      questionnaireList: (null !== (o = a.questionnaireList) && void 0 !== o
                        ? o
                        : []
                      ).map(function (e) {
                        return _(
                          _({}, e),
                          {},
                          {
                            count: e.questionnaireCount,
                            avgParticipateRate: u.default.mathUtil.accMul(
                              e.avgParticipateRate,
                              100,
                            ),
                          },
                        );
                      }),
                    };
                  })(null == t ? void 0 : t.details),
                };
              }
              return _({ type: a.Type.FETCH_FAILED }, e);
            }),
          );
        },
        function (e, t, r) {
          var c = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_OFFLINE_COURSE_BILLBOARD),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return c({
                url: '/mm-classroom/web/j/classroomDataBean.getClassroomActivityBillboard.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              if (null == e || !e.errType) {
                var t = function (e) {
                  return e.map(function (e) {
                    var t = e.smallFaceUrl || i.default.DEFAULT_CONST.DEFAULT_AVATOR,
                      r = u.default.imageUtil.scaleImage(t, 32, 32);
                    return _(_({}, e), {}, { avator: r });
                  });
                };
                return {
                  type: a.Type.GET_OFFLINE_COURSE_BILLBOARD_SUCCESS,
                  courseBillboard: (function (e) {
                    var r,
                      n,
                      o,
                      a,
                      i,
                      c,
                      l,
                      s = e || {};
                    return {
                      signinBillboard: t(
                        null !== (r = s.signinBillboard) && void 0 !== r ? r : [],
                      ).map(function (e) {
                        var t;
                        return _(
                          _({}, e),
                          {},
                          {
                            attendanceRate: u.default.mathUtil.accMul(
                              null !== (t = e.attendanceRate) && void 0 !== t ? t : 0,
                              100,
                            ),
                          },
                        );
                      }),
                      signinReverseBillboard: t(
                        null !== (n = s.signinReverseBillboard) && void 0 !== n ? n : [],
                      ).map(function (e) {
                        var t;
                        return _(
                          _({}, e),
                          {},
                          {
                            attendanceRate: u.default.mathUtil.accMul(
                              null !== (t = e.attendanceRate) && void 0 !== t ? t : 0,
                              100,
                            ),
                          },
                        );
                      }),
                      paperBillboard: t(
                        null !== (o = s.paperBillboard) && void 0 !== o ? o : [],
                      ).map(function (e) {
                        var t;
                        return _(
                          _({}, e),
                          {},
                          {
                            correctRate: u.default.mathUtil.accMul(
                              null !== (t = e.correctRate) && void 0 !== t ? t : 0,
                              100,
                            ),
                          },
                        );
                      }),
                      paperReverseBillboard: t(
                        null !== (a = s.paperReverseBillboard) && void 0 !== a ? a : [],
                      ).map(function (e) {
                        var t;
                        return _(
                          _({}, e),
                          {},
                          {
                            correctRate: u.default.mathUtil.accMul(
                              null !== (t = e.correctRate) && void 0 !== t ? t : 0,
                              100,
                            ),
                          },
                        );
                      }),
                      forumBillboard: t(null !== (i = s.forumBillboard) && void 0 !== i ? i : []),
                      lowAccuracyQuestionList: (null !== (c = s.lowAccuracyQuestionList) &&
                      void 0 !== c
                        ? c
                        : []
                      ).map(function (e) {
                        var t;
                        return _(
                          _({}, e),
                          {},
                          {
                            correctRate: u.default.mathUtil.accMul(
                              null !== (t = e.correctRate) && void 0 !== t ? t : 0,
                              100,
                            ),
                          },
                        );
                      }),
                      highParticipateRateForumList: (null !==
                        (l = s.highParticipateRateForumList) && void 0 !== l
                        ? l
                        : []
                      ).map(function (e) {
                        var t;
                        return _(
                          _({}, e),
                          {},
                          {
                            participateRate: u.default.mathUtil.accMul(
                              null !== (t = e.participateRate) && void 0 !== t ? t : 0,
                              100,
                            ),
                          },
                        );
                      }),
                    };
                  })(e),
                };
              }
              return _({ type: a.Type.FETCH_FAILED }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.DOWNLOAD),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.unitId;
              return u({
                url: '/mm-classroom/web/j/asyncExportExcelDataBean.downLoadClassroomStudScore.rpc',
                body: { classroomId: t, unitId: r },
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.DOWNLOAD_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.COURSEWARE_DOWNLOAD),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.unitId,
                n = e.startTime,
                o = e.endTime,
                a = { classroomId: t, unitId: r };
              return (
                n && Object.assign(a, { startTime: n }),
                o && Object.assign(a, { endTime: o }),
                u({
                  url: '/mm-classroom/web/j/asyncExportExcelDataBean.downLoadClassroomCoursewareScore.rpc',
                  body: a,
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.FETCH_FAILED }, e)
                : { type: a.Type.COURSEWARE_DOWNLOAD_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.CHECK_DOWNLOAD),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId,
                r = e.contentId,
                n = e.contentType,
                o = e.startTime,
                a = e.endTime,
                i = { classroomId: t, contentId: r, contentType: n };
              return (
                o && Object.assign(i, { startTime: o }),
                a && Object.assign(i, { endTime: a }),
                u({
                  url: '/mm-classroom/web/j/asyncExportExcelDataBean.downLoadClassroomTermScore.rpc',
                  body: _({}, i),
                })
              );
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? _({ type: a.Type.CHECK_DOWNLOAD }, e)
                : { type: a.Type.CHECK_DOWNLOAD_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.ROLLING_DOWNLOAD),
            (0, o.switchMap)(function (e) {
              var t = e.threadId;
              return u({
                url: '/mm-classroom/web/j/asyncExportExcelDataBean.getThreadStatusByThreadId.rpc',
                body: { threadId: t },
              });
            }),
            (0, o.map)(function (e) {
              if (null == e || !e.errType)
                return e.finished
                  ? { type: a.Type.ROLLING_DOWNLOAD_SUCCESS, res: e }
                  : { type: a.Type.ROLLING_DOWNLOAD_UNFINISHED, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_IS_CLASSROOM_OPEN_RESOURCE_IN_VEDIO_LEARN),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/offlineOnlineCourseBean.isNotClassroomOpenResource.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              return {
                type: a.Type.GET_IS_CLASSROOM_OPEN_RESOURCE_SUCCESS_IN_VEDIO_LEARN,
                status: e,
              };
            }),
          );
        },
      ];
    },
    739503: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328);
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
      function u(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return i(e);
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
              if ('string' == typeof e) return i(e, t);
              var r = {}.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? i(e, t)
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
      function i(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
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
                s(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : c(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function s(e, t, r) {
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
      var _ = (0, o.createActions)({
          getDataOverview: ['classroomId'],
          getDataOverviewSuccess: null,
          getStudyProgress: ['classroomId'],
          getStudyProgressSuccess: null,
          getVideoLearnData: ['classroomId', 'startTime', 'endTime'],
          getVideoLearnDataSuccess: null,
          getVideoLearnStu: ['classroomId', 'unitId', 'startTime', 'endTime'],
          getVideoLearnStuSuccess: null,
          getCoursewareLearnData: ['classroomId', 'startTime', 'endTime'],
          getCoursewareLearnDataSuccess: null,
          getCoursewareLearnStu: ['classroomId', 'unitId', 'startTime', 'endTime'],
          getCoursewareLearnStuSuccess: null,
          getCheckData: ['classroomId', 'startTime', 'endTime'],
          getCheckDataSuccess: null,
          getCheckStu: ['classroomId', 'contentId', 'contentType', 'startTime', 'endTime'],
          getCheckStuSuccess: null,
          getAllStuInfo: ['classroomId'],
          getAllStuInfoSuccess: null,
          getOfflineActivityStat: ['classroomId'],
          getOfflineActivityStatSuccess: null,
          getOfflineCourseBillboard: ['classroomId'],
          getOfflineCourseBillboardSuccess: null,
          download: ['classroomId', 'unitId'],
          coursewareDownload: ['classroomId', 'unitId', 'startTime', 'endTime'],
          checkDownload: ['classroomId', 'contentId', 'contentType', 'startTime', 'endTime'],
          downloadSuccess: null,
          coursewareDownloadSuccess: null,
          checkDownloadSuccess: null,
          rollingDownload: ['threadId'],
          rollingDownloadSuccess: null,
          rollingDownloadUnfinished: null,
          clearDownload: null,
          clearMessage: null,
          fetchFailed: null,
          getIsClassroomOpenResourceInVedioLearn: ['classroomId'],
          getIsClassroomOpenResourceSuccessInVedioLearn: ['status'],
          setClassroomId: ['classroomId'],
        }),
        p = _.Types,
        f = _.Creators,
        T =
          ((t.Creator = f),
          (t.Type = p),
          {
            overviews: [],
            studyProgress: {},
            videoLearnData: [],
            coursewareLearnData: [],
            checkData: [],
            checkStu: [],
            videoLearnStu: [],
            coursewareLearnStu: [],
            allStudentsInfo: [],
            allStudentsInfoMap: {},
            isClassroomOpenResource: !1,
            classroomId: 114002,
            isOfflineClass: !1,
            offlineOverview: {
              activityTotalCount: 0,
              signinCount: 0,
              questionnaireCount: 0,
              paperCount: 0,
              forumCount: 0,
            },
            offlineDetail: { signinList: [], forumList: [], paperList: [], questionnaireList: [] },
            courseBillboard: {
              signinBillboard: [],
              signinReverseBillboard: [],
              paperBillboard: [],
              paperReverseBillboard: [],
              forumBillboard: [],
              lowAccuracyQuestionList: [],
              highParticipateRateForumList: [],
            },
            threadId: null,
            downloadUrl: null,
            errType: null,
            msg: '',
          });
      t.default = (0, o.createReducer)(
        T,
        (s(
          s(
            s(
              s(
                s(
                  s(
                    s(
                      s(
                        s(
                          s((n = {}), p.FETCH_FAILED, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return l(
                              l(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T,
                              ),
                              {},
                              { msg: e.msg, errType: e.errType },
                            );
                          }),
                          p.GET_DATA_OVERVIEW_SUCCESS,
                          function () {
                            var e,
                              t,
                              r = arguments.length > 1 ? arguments[1] : void 0;
                            return l(
                              l(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T,
                              ),
                              {},
                              {
                                overviews: u(
                                  null === (e = r.res) || void 0 === e ? void 0 : e.items,
                                ),
                                isOfflineClass:
                                  null === (t = r.res) || void 0 === t ? void 0 : t.isOfflineClass,
                              },
                            );
                          },
                        ),
                        p.GET_STUDY_PROGRESS_SUCCESS,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return l(
                            l(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T,
                            ),
                            {},
                            { studyProgress: l({}, e.res) },
                          );
                        },
                      ),
                      p.GET_VIDEO_LEARN_DATA_SUCCESS,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return l(
                          l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                          {},
                          { videoLearnData: u(e.res) },
                        );
                      },
                    ),
                    p.GET_COURSEWARE_LEARN_DATA_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return l(
                        l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                        {},
                        { coursewareLearnData: u(e.res) },
                      );
                    },
                  ),
                  p.GET_CHECK_DATA_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return l(
                      l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                      {},
                      { checkData: u(e.res) },
                    );
                  },
                ),
                p.GET_ALL_STU_INFO_SUCCESS,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T,
                    t = arguments.length > 1 ? arguments[1] : void 0,
                    r = {};
                  return (
                    t.res.forEach(function (e) {
                      r[e.memberId] = l({}, e);
                    }),
                    l(l({}, e), {}, { allStudentsInfo: u(t.res), allStudentsInfoMap: l({}, r) })
                  );
                },
              ),
              p.GET_VIDEO_LEARN_STU_SUCCESS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return l(
                  l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                  {},
                  { videoLearnStu: u(e.res) },
                );
              },
            ),
            p.GET_COURSEWARE_LEARN_STU_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return l(
                l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                {},
                { coursewareLearnStu: u(e.res) },
              );
            },
          ),
          p.GET_CHECK_STU_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return l(
              l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
              {},
              { checkStu: u(e.res) },
            );
          },
        ),
        s(
          s(
            s(
              s(
                s(
                  s(
                    s(
                      s(
                        s(n, p.GET_OFFLINE_ACTIVITY_STAT_SUCCESS, function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return l(
                            l(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T,
                            ),
                            {},
                            { offlineOverview: e.offlineOverview, offlineDetail: e.offlineDetail },
                          );
                        }),
                        p.GET_OFFLINE_COURSE_BILLBOARD_SUCCESS,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return l(
                            l(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T,
                            ),
                            {},
                            { courseBillboard: e.courseBillboard },
                          );
                        },
                      ),
                      p.DOWNLOAD_SUCCESS,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return l(
                          l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                          {},
                          { threadId: e.res.threadId },
                        );
                      },
                    ),
                    p.COURSEWARE_DOWNLOAD_SUCCESS,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return l(
                        l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                        {},
                        { threadId: e.res.threadId },
                      );
                    },
                  ),
                  p.CHECK_DOWNLOAD_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return l(
                      l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                      {},
                      { threadId: e.res.threadId },
                    );
                  },
                ),
                p.ROLLING_DOWNLOAD_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return l(
                    l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                    {},
                    { downloadUrl: e.res.data },
                  );
                },
              ),
              p.ROLLING_DOWNLOAD_UNFINISHED,
              function () {
                return l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T);
              },
            ),
            p.CLEAR_DOWNLOAD,
            function () {
              return l(
                l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                {},
                { downloadUrl: null, threadId: null },
              );
            },
          ),
          p.GET_IS_CLASSROOM_OPEN_RESOURCE_SUCCESS_IN_VEDIO_LEARN,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return l(
              l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
              {},
              { isClassroomOpenResource: e.status },
            );
          },
        )),
      );
    },
    804496: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(111491);
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
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
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
            (0, n.ofType)(a.Type.GET_RESOURCE_SETTING),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-classroom/web/j/classroomResourceBean.getResourceSetting.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.GET_RESOURCE_SETTING_SUCCESS, data: e.data.result }
                : c({ type: a.Type.GET_RESOURCE_SETTING_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.LIST_RESOURCE_COURSE),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-classroom/web/j/classroomResourceBean.listResourceCourse.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.LIST_RESOURCE_COURSE_SUCCESS, data: e.data.result }
                : c({ type: a.Type.LIST_RESOURCE_COURSE_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.ADD_RESOURCE_COURSE),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-classroom/web/j/classroomResourceBean.addResourceCourse.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.ADD_RESOURCE_COURSE_SUCCESS, data: e.data.result }
                : c({ type: a.Type.ADD_RESOURCE_COURSE_FAIL }, e);
            }),
          );
        },
      ];
    },
    111491: (e, t, r) => {
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
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                i(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function i(e, t, r) {
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
          getResourceSetting: ['param'],
          getResourceSettingSuccess: null,
          getResourceSettingFail: null,
          listResourceCourse: ['param'],
          listResourceCourseSuccess: null,
          listResourceCourseFail: null,
          addResourceCourse: ['param'],
          addResourceCourseSuccess: null,
          addResourceCourseFail: null,
        }),
        l = c.Types,
        s = c.Creators,
        _ =
          ((t.Creator = s),
          (t.Type = l),
          { resouceSetting: {}, resourceList: {}, isAddResourceCourseSuccess: !1 });
      t.default = (0, n.createReducer)(
        _,
        i(
          i(
            i(
              i(
                i(
                  i({}, l.GET_RESOURCE_SETTING_SUCCESS, function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return u(
                      u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                      {},
                      { resouceSetting: e.data },
                    );
                  }),
                  l.GET_RESOURCE_SETTING_FAIL,
                  function () {
                    return u(
                      {},
                      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
                    );
                  },
                ),
                l.LIST_RESOURCE_COURSE_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return u(
                    u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                    {},
                    { resourceList: e.data },
                  );
                },
              ),
              l.LIST_RESOURCE_COURSE_FAIL,
              function () {
                return u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _);
              },
            ),
            l.ADD_RESOURCE_COURSE_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return u(
                u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                {},
                { isAddResourceCourseSuccess: !!e.data },
              );
            },
          ),
          l.ADD_RESOURCE_COURSE_FAIL,
          function () {
            return u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _);
          },
        ),
      );
    },
    558449: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = { WITH_ONLINE_TERM: { WITH: 1, WITHOUT: 2 } }));
    },
    244484: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(305231);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.UPSET_SCORE_CONFIG),
            (0, o.switchMap)(function (e) {
              var t = e.mocClassroom;
              return u({
                url: '/mm-classroom/web/j/classroomManageBean.upsetScoreConfig.rpc',
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                body: { mocClassroom: t },
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? null
                : { type: a.Type.UPSET_SCORE_CONFIG_SUCCESS, msg: '成绩统计设置成功' };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_SCORE_CONFIG),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/classroomManageBean.getClassroom.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              return null != e && e.errType
                ? null
                : { type: a.Type.GET_SCORE_CONFIG_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_IS_CLASSROOM_OPEN_RESOURCE_IN_SCORE_MANAGE),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/offlineOnlineCourseBean.isNotClassroomOpenResource.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              return {
                type: a.Type.GET_IS_CLASSROOM_OPEN_RESOURCE_SUCCESS_IN_SCORE_MANAGE,
                status: e,
              };
            }),
          );
        },
      ];
    },
    305231: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328);
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
      function i(e) {
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
      var l = ((n = r(558449)) && n.__esModule ? n : { default: n }).default.WITH_ONLINE_TERM,
        s = (0, o.createActions)({
          upsetScoreConfig: ['mocClassroom'],
          upsetScoreConfigSuccess: null,
          getScoreConfig: ['classroomId'],
          getScoreConfigSuccess: null,
          clearMessage: null,
          getIsClassroomOpenResourceInScoreManage: ['classroomId'],
          getIsClassroomOpenResourceSuccessInScoreManage: ['status'],
        }),
        _ = s.Types,
        p = s.Creators,
        f =
          ((t.Creator = p),
          (t.Type = _),
          { mocClassroom: {}, msg: '', isClassroomOpenResource: !1 });
      t.default = (0, o.createReducer)(
        f,
        c(
          c(
            c(
              c({}, _.UPSET_SCORE_CONFIG_SUCCESS, function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return i(
                  i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                  {},
                  { msg: e.msg },
                );
              }),
              _.GET_SCORE_CONFIG_SUCCESS,
              function () {
                var e,
                  t,
                  r,
                  n,
                  o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
                  a = arguments.length > 1 ? arguments[1] : void 0,
                  u = {
                    sign: { isEnable: 0, percentage: null },
                    discuss: { isEnable: 0, percentage: null },
                    test: { isEnable: 0, percentage: null },
                    testRule: 1,
                    signRule: 1,
                    signFullScoreCount: null,
                    leave: {
                      isEnable: 0,
                      leaveType: 1,
                      leaveOneSign: null,
                      sickLeaveType: 4,
                      sickLeaveOneSign: null,
                    },
                  },
                  c = { goodCommit: 0, goodSign: 0, plusRule: 1 },
                  s = { otherScore: { isEnable: 1, percentage: null } },
                  _ = {
                    onlineConfig: {
                      onlineScore: { isEnable: 0, percentage: null },
                      videoComplete: { isEnable: 0, percentage: null },
                      videoRule: 1,
                    },
                    offlineConfig: u,
                    plusConfig: c,
                    otherScoreConfig: s,
                  },
                  p = { offlineConfig: u, plusConfig: c, otherScoreConfig: s },
                  T = null === (e = a.res) || void 0 === e ? void 0 : e.scoreConfig;
                return (
                  T
                    ? (null !== (t = T) &&
                        void 0 !== t &&
                        null !== (r = t.offlineConfig) &&
                        void 0 !== r &&
                        r.leave) ||
                      (T.offlineConfig.leave = {
                        isEnable: 0,
                        leaveType: 1,
                        leaveOneSign: null,
                        sickLeaveType: 4,
                        sickLeaveOneSign: null,
                      })
                    : (T =
                        (null === (n = a.res) || void 0 === n ? void 0 : n.withOnlineTerm) ===
                        l.WITHOUT
                          ? p
                          : _),
                  i(i({}, o), {}, { mocClassroom: i(i({}, a.res), {}, { scoreConfig: i({}, T) }) })
                );
              },
            ),
            _.CLEAR_MESSAGE,
            function () {
              return i(
                i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
                {},
                { msg: '' },
              );
            },
          ),
          _.GET_IS_CLASSROOM_OPEN_RESOURCE_SUCCESS_IN_SCORE_MANAGE,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return i(
              i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f),
              {},
              { isClassroomOpenResource: e.status },
            );
          },
        ),
      );
    },
    268121: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(623728);
      t.default = [
        function (e, t, r) {
          return (
            r.fetch,
            e.pipe(
              (0, n.ofType)(a.Type.GOTO_CO_REF),
              (0, o.map)(function () {
                return { type: a.Type.GET_DATA_IN_CO_REF };
              }),
            )
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_DATA_IN_CO_REF),
            (0, o.switchMap)(function () {
              var e = t.value.teach.coRef,
                r = e.schoolId,
                n = e.pagination,
                o = n.pageSize,
                a = n.current;
              return u({
                url: '/web/j/mocOrderBean.getSpocCopyStatistics.rpc',
                body: {
                  schoolId: r,
                  psize: o,
                  pIndex: a,
                  fromSchoolName: '',
                  toSchoolName: '',
                  fromCourseNamePart: '',
                  toCourseNamePart: '',
                },
              });
            }),
            (0, o.map)(function (e) {
              return (console.log(e), { type: a.Type.GET_DATA_IN_CO_REF_SUCCESS, data: e });
            }),
          );
        },
      ];
    },
    623728: (e, t, r) => {
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
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var o = u(r(795093)),
        a = r(96328);
      function u(e) {
        return e && e.__esModule ? e : { default: e };
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
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function l(e, t, r) {
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
      function s(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      var _ = (0, u(r(891482)).default)(),
        p = (0, a.createActions)({
          initEnvInCoRef: ['schoolId'],
          getDataInCoRef: null,
          getDataInCoRefSuccess: null,
          gotoCoRef: ['current'],
        }),
        f = p.Types,
        T = p.Creators,
        d =
          ((t.Creator = T),
          (t.Type = f),
          [
            [_.KEY_SPOC_COURSE_NAME, 'name'],
            [_.KEY_COURSE_MANAGER, 'cperson'],
            [_.KEY_SEMESTER_START_END_TIME, 'duration'],
            [_.KEY_SOURSE_COURSE, 'course'],
            [_.KEY_SOURSE_COURSE_MANEGER, 'sperson'],
            [_.KEY_REFERENCE_TIME, 'refTime'],
            [_.KEY_COURSE_STATE, 'status'],
          ].map(function (e) {
            var t,
              r,
              n =
                ((r = 2),
                (function (e) {
                  if (Array.isArray(e)) return e;
                })((t = e)) ||
                  (function (e, t) {
                    var r =
                      null == e
                        ? null
                        : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                    if (null != r) {
                      var n,
                        o,
                        a,
                        u,
                        i = [],
                        c = !0,
                        l = !1;
                      try {
                        if (((a = (r = r.call(e)).next), 0 === t)) {
                          if (Object(r) !== r) return;
                          c = !1;
                        } else
                          for (
                            ;
                            !(c = (n = a.call(r)).done) && (i.push(n.value), i.length !== t);
                            c = !0
                          );
                      } catch (e) {
                        ((l = !0), (o = e));
                      } finally {
                        try {
                          if (!c && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                        } finally {
                          if (l) throw o;
                        }
                      }
                      return i;
                    }
                  })(t, r) ||
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
                  })(t, r) ||
                  (function () {
                    throw new TypeError(
                      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                    );
                  })()),
              o = n[0],
              a = n[1];
            return { title: o, key: a, dataIndex: a };
          })),
        E = {
          schoolId: 42002,
          pagination: { hideOnSinglePage: !0, pageSize: 20, current: 1, total: 0 },
          dataSource: [],
          columns: d,
          defaultColumns: d,
        };
      t.default = (0, a.createReducer)(
        E,
        l(
          l(
            l({}, f.INIT_ENV_IN_CO_REF, function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return c(
                c({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : E),
                {},
                { schoolId: e.schoolId },
              );
            }),
            f.GET_DATA_IN_CO_REF_SUCCESS,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : E,
                t = (arguments.length > 1 ? arguments[1] : void 0).data,
                r = t.result,
                n = t.pagination;
              return c(
                c({}, e),
                {},
                {
                  dataSource: r.map(function (e) {
                    var t = e.termCreateTime,
                      r = e.toChiefLectorName,
                      n = e.startTime,
                      a = e.endTime,
                      u = e.fromCourseName,
                      i = e.fromSchoolName,
                      c = e.fromChiefLectorName,
                      l = e.mode,
                      s = e.toCourseName,
                      p = e.toSchoolName,
                      f = e.publishStatus,
                      T = e.schoolShortName,
                      d = e.courseId,
                      E = e.id,
                      S = e.copied,
                      m = '',
                      y = ''.concat(s, ' - ').concat(p);
                    return (
                      10 === l
                        ? (m = ''.concat(_.KEY_SYNCHRONIZE, ',,,').concat(y))
                        : 15 === l && (m = ''.concat(_.KEY_ASYNCHRONOUS, ',,,').concat(y)),
                      {
                        name: m,
                        cperson: r || '-',
                        duration:
                          n >= 32503651201e3
                            ? _.KEY_TO_BE_DETERMINED
                            : ''
                                .concat((0, o.default)(n).format('YYYY-MM-DD'), ' ')
                                .concat(_.KEY_TO, ' ')
                                .concat(a ? (0, o.default)(a).format('YYYY-MM-DD') : _.KEY_NOT_SET),
                        course: ''.concat(u, '-').concat(i || 'null'),
                        sperson: c || '-',
                        refTime: t ? (0, o.default)(t).format('YYYY-MM-DD') : _.KEY_NOT_SET,
                        status: {
                          publishStatus: f,
                          schoolShortName: T,
                          courseId: d,
                          id: E,
                          copied: S,
                        },
                      }
                    );
                  }),
                  pagination: c(c({}, e.pagination), {}, { total: n.totleCount }),
                },
              );
            },
          ),
          f.GOTO_CO_REF,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : E,
              t = arguments.length > 1 ? arguments[1] : void 0;
            return c(
              c({}, e),
              {},
              { pagination: c(c({}, e.pagination), {}, { current: t.current }) },
            );
          },
        ),
      );
    },
    368782: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(978453),
        u = r(138525);
      t.default = [
        function (e, t) {
          return e.pipe(
            (0, n.ofType)(a.Type.GET_TAB_DATA_IN_DATA_CENTER),
            (0, o.map)(function () {
              return {
                type: [
                  a.Type.GET_COURSE_STATISTIC_IN_DATA_CENTER,
                  a.Type.GET_TERM_STATISTIC_IN_DATA_CENTER,
                  a.Type.GET_TERM_ENROLL_STATISTIC_IN_DATA_CENTER,
                ][t.value.teach.course.tabIndex],
              };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_BASE_INFO_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId;
              return u({
                url: '/mm-school/web/j/schoolStatisticBean.getSchoolTimeCourseType.rpc',
                body: { schoolId: e },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COURSE_BASE_INFO_IN_DATA_CENTER_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_STATISTIC_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.course,
                n = r.startTime,
                o = r.endTime;
              return u({
                url: '/mm-school/web/j/schoolStatisticBean.getCourseStatistic.rpc',
                body: { schoolId: e, startTime: n, endTime: o },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COURSE_STATISTIC_IN_DATA_CENTER_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_TERM_STATISTIC_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.course,
                n = r.startTime,
                o = r.endTime;
              return u({
                url: '/mm-school/web/j/schoolStatisticBean.getTermStatistic.rpc',
                body: { schoolId: e, startTime: n, endTime: o },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_TERM_STATISTIC_IN_DATA_CENTER_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_TERM_ENROLL_STATISTIC_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.course,
                n = r.startTime,
                o = r.endTime;
              return u({
                url: '/mm-school/web/j/schoolStatisticBean.getTermEnrollStatistic.rpc',
                body: { schoolId: e, startTime: n, endTime: o },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_TERM_ENROLL_STATISTIC_IN_DATA_CENTER_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_DETAIL_STATISTIC_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.course,
                n = r.startTime,
                o = r.endTime,
                a = r.activedCourseType,
                i = r.activedStatus,
                c = { schoolId: e, startTime: n, endTime: o };
              return (
                null !== a && (c.type = a),
                null !== i && (c.status = i),
                u({
                  url: '/mm-school/web/j/schoolStatisticBean.getCourseDetailStatistic.rpc',
                  body: c,
                })
              );
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COURSE_DETAIL_STATISTIC_IN_DATA_CENTER_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.course,
                n = r.startTime,
                o = r.endTime,
                a = r.courseName,
                i = r.teacherName,
                c = r.activedCourseType,
                l = r.activedStatus,
                s = r.pagination,
                _ = {
                  schoolId: e,
                  startTime: n,
                  endTime: o,
                  pageSize: s.pageSize,
                  pageIndex: s.current,
                };
              return (
                null !== c && (_.type = c),
                null !== l && (_.status = l),
                i && (_.teacherName = i),
                a && (_.courseName = a),
                u({ url: '/mm-school/web/j/schoolStatisticBean.listTermStatistic.rpc', body: _ })
              );
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.EXPORT_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.course,
                n = r.startTime,
                o = r.endTime,
                a = r.courseName,
                i = r.teacherName,
                c = r.activedCourseType,
                l = r.activedStatus,
                s = { schoolId: e, startTime: n, endTime: o };
              return (
                null !== c && (s.type = c),
                null !== l && (s.status = l),
                i && (s.teacherName = i),
                a && (s.courseName = a),
                u({
                  url: '/mm-school/web/j/asyncExportExcelDataBean.exportCourseStatistic.rpc',
                  body: s,
                })
              );
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.SET_EXPORTING_IN_DATA_CENTER, threadId: e.threadId };
            }),
          );
        },
        function (e, t, r) {
          return (
            r.g,
            e.pipe(
              (0, n.ofType)(a.Type.SET_EXPORTING_IN_DATA_CENTER),
              (0, o.map)(function (e) {
                var t = e.threadId;
                return {
                  type: u.Type.EXPORT_POLLING,
                  threadId: t,
                  returnType: a.Type.EXPORT_FINISHED_IN_DATA_CENTER,
                };
              }),
            )
          );
        },
        function (e, t, r) {
          return (
            r.g,
            e.pipe(
              (0, n.ofType)(a.Type.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_FROM_STORAGE),
              (0, o.map)(function (e) {
                return {
                  type: a.Type.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_FROM_STORAGE_SUCCESS,
                  data: window.localStorage.getItem(t.value.teach.course.COLUMN_SETTINGS_KEY),
                };
              }),
            )
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(a.Type.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_FROM_STORAGE_SUCCESS),
            (0, o.mapTo)({ type: u.Type.SWALLOW_IT, index: 0 }),
          );
        },
        function (e, t, r) {
          return (
            r.g,
            e.pipe(
              (0, n.ofType)(a.Type.SET_COLUMN_SETTINGS_IN_DATA_CENTER_TO_STORAGE),
              (0, o.tap)(function () {
                window.localStorage.setItem(
                  t.value.teach.course.COLUMN_SETTINGS_KEY,
                  JSON.stringify(t.value.teach.course.columnSettings),
                );
              }),
              (0, o.map)(function (e) {
                return { type: u.Type.SWALLOW_IT };
              }),
            )
          );
        },
      ];
    },
    978453: (e, t, r) => {
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
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var o,
        a = c(r(795093)),
        u = r(96328),
        i = c(r(133938));
      function c(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r =
              null == e
                ? null
                : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
            if (null != r) {
              var n,
                o,
                a,
                u,
                i = [],
                c = !0,
                l = !1;
              try {
                if (((a = (r = r.call(e)).next), 0 === t)) {
                  if (Object(r) !== r) return;
                  c = !1;
                } else
                  for (; !(c = (n = a.call(r)).done) && (i.push(n.value), i.length !== t); c = !0);
              } catch (e) {
                ((l = !0), (o = e));
              } finally {
                try {
                  if (!c && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                } finally {
                  if (l) throw o;
                }
              }
              return i;
            }
          })(e, t) ||
          T(e, t) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function s(e, t) {
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
      function _(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? s(Object(r), !0).forEach(function (t) {
                p(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : s(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function p(e, t, r) {
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
      function f(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return d(e);
          })(e) ||
          (function (e) {
            if (
              ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e);
          })(e) ||
          T(e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function T(e, t) {
        if (e) {
          if ('string' == typeof e) return d(e, t);
          var r = {}.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? d(e, t)
                : void 0
          );
        }
      }
      function d(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      var E = i.default.STATUS_MAPPING,
        S = i.default.COURSE_TYPE_MAPPING,
        m = i.default.COURSE_TYPE_ARRAY,
        y = i.default.COURSE_PIE_TITLE,
        O = i.default.COURSE_INFO_TITLE,
        C = i.default.PIE_COLOR_MAPPING,
        v = i.default.DEFAULT_PAGINATION,
        I = (0, u.createActions)({
          setTabIndexInDataCenter: ['index'],
          setDateRangeInDataCenter: ['startTime', 'endTime'],
          setActiveStatusInDataCenter: ['value'],
          setActiveCourseTypeInDataCenter: ['value'],
          setFilterDataInDataCenter: ['typeName', 'value'],
          initColumnSettingsInDataCenterFromStorage: null,
          initColumnSettingsInDataCenterFromStorageSuccess: ['data'],
          setColumnSettingsInDataCenterToStorage: ['key', 'checked'],
          getCourseBaseInfoInDataCenter: null,
          getCourseBaseInfoInDataCenterSuccess: ['data'],
          getTabDataInDataCenter: null,
          getCourseStatisticInDataCenter: null,
          getCourseStatisticInDataCenterSuccess: ['data'],
          getTermStatisticInDataCenter: null,
          getTermStatisticInDataCenterSuccess: ['data'],
          getTermEnrollStatisticInDataCenter: null,
          getTermEnrollStatisticInDataCenterSuccess: ['data'],
          getCourseDetailStatisticInDataCenter: ['type', 'status'],
          getCourseDetailStatisticInDataCenterSuccess: ['data'],
          getCourseInfoDetailDataInDataCenter: null,
          getCourseInfoDetailDataInDataCenterSuccess: ['data'],
          exportCourseInfoDetailDataInDataCenter: null,
          exportCourseInfoDetailDataInDataCenterSuccess: null,
          setExportingInDataCenter: null,
          exportFinishedInDataCenter: null,
          gotoPageInDataCenter: ['pageIndex'],
        }),
        b = I.Types,
        g = I.Creators,
        h =
          ((t.Creator = g),
          (t.Type = b),
          function (e) {
            return e - 0 < 0
              ? '-'.concat(''.concat(-(e - 0)).replace(/(?!^)(?=(\d{3})+$)/g, ','))
              : ''.concat(e).replace(/(?!^)(?=(\d{3})+$)/g, ',');
          }),
        R = function (e) {
          return e > 1e8
            ? ''.concat(Math.floor(e / 1e7) / 10, '亿')
            : e > 1e3
              ? ''.concat(Math.floor(e / 1e3) / 10, '万')
              : ''.concat(e);
        },
        A = function (e) {
          var t = ''.concat(e);
          return t.length < 2 ? '0'.concat(t) : t;
        },
        N = function (e) {
          var t = Math.floor(e / 3600),
            r = Math.floor((e - 3600 * t) / 60),
            n = e - 3600 * t - 60 * r;
          return ''.concat(A(t), ':').concat(A(r), ':').concat(A(n));
        },
        D = [
          ['termName', '学期', !0, !0, 200, !0],
          ['courseTime', '开课时间', !0, !1, 200, !1],
          ['principalName', '期次负责人', !0, !1, 100, !0],
          ['members', '课程团队成员', !0, !1, 120, !0],
          ['status', '状态', !0, !1, 100, !1],
          ['type', '类型', !0, !1, 100, !1],
          ['enrollCount', '报名人数', !0, !1, 100, !1],
          ['classroomCount', '建设课堂数', !0, !1, 120, !1],
          ['videoTotalLength', '视频总时长', !0, !1, 120, !1],
          ['videoCount', '发布视频个数', !1, !1, 120, !1],
          ['pdfCount', '发布PDF个数', !1, !1, 120, !1],
          ['richTextCount', '发布富文本个数', !1, !1, 130, !1],
          ['discussCount', '发布课堂讨论个数', !1, !1, 150, !1],
          ['liveCount', '发布直播个数', !1, !1, 120, !1],
          ['testCount', '发布测验个数', !1, !1, 120, !1],
          ['homeworkCount', '发布作业个数', !1, !1, 120, !1],
          ['examCount', '发布考试个数', !1, !1, 120, !1],
          ['studentLearnVideoSum', '学生视频总时长', !1, !1, 130, !1],
          ['videoPersonCount', '视频观看人次', !1, !1, 120, !1],
          ['pdfPersonCount', 'PDF观看人次', !1, !1, 120, !1],
          ['richTestPersonCount', '富文本观看人次', !1, !1, 130, !1],
          ['discussPersonCount', '课堂讨论参与人次', !1, !1, 150, !1],
          ['livePersonCount', '直播观看人次', !1, !1, 120, !1],
          ['testSubmitPersonCount', '测验提交人次', !1, !1, 120, !1],
          ['homeworkSubmitPersonCount', '作业提交人次', !1, !1, 120, !1],
          ['examSubmitPersonCount', '考试提交人次', !1, !1, 120, !1],
          ['forumPostCount', '论坛发帖总数', !1, !1, 120, !1],
          ['forumReplyCount', '论坛回复总数', !1, !1, 120, !1],
          ['teacherPostCount', '论坛老师讨论数', !1, !1, 130, !1],
          ['passRate', '课程通过率', !1, !1, 120, !1],
        ],
        P = ['视频', '测验', '直播', '考试'],
        U = ['PDF', '作业', '富文本', '课堂讨论'],
        L = [
          { name: '同步SPOC' },
          { name: '异步SPOC' },
          { name: '独立SPOC' },
          { name: 'MOOC' },
          { name: 'OOC' },
        ],
        M = {
          colorList: C,
          desc: [
            '学期筛选下统计时间内的课件发布及课件学习情况。',
            '学期筛选下统计时间内的通过率情况。',
            '学期筛选下统计时间内讨论区产生的总发帖数及回复数。',
            '学期筛选下统计时间内老师参与讨论区产生的总发帖数加上回复数。',
          ],
        },
        w = L.map(function (e) {
          return { name: e.name, value: 0 };
        }),
        j = E.map(function (e) {
          return { name: e, value: 0 };
        }),
        G = L.map(function (e) {
          return { name: e, value: 0, courseNumber: 0 };
        }),
        Y = [{ text: '全部', value: null }].concat(
          f(
            E.map(function (e, t) {
              return { text: e, value: t };
            }),
          ),
        ),
        K = function (e, t) {
          return e.reduce(function (e, r) {
            return ((e[r] = t || r), e);
          }, {});
        },
        F = 'path://M0,7a4,4 0 1,0 8,0a4,4 0 1,0 -8,0',
        k = [_({ icon: F, left: 230 }, K(m)), _({ left: 330 }, K(m, '0门'))],
        H = [_({ icon: F, left: 230 }, K(E)), _({ left: 330 }, K(E, '0门'))],
        B = [
          _({ icon: F, left: 230 }, K(m)),
          _({ left: 330 }, K(m, '0门')),
          _({ left: 430 }, K(m, '0人次')),
        ],
        x = E.map(function (e) {
          return { name: e };
        }),
        V = (0, a.default)().add(-1, 'days').valueOf(),
        W = _(
          _({}, M),
          {},
          {
            title: [
              { text: '发布课件总个数', count: 0 },
              { text: '学生学习课件人次', count: 0 },
              { text: '学期平均通过率' },
            ],
            legendData: [
              P.map(function (e) {
                return { name: e, value: 0 };
              }),
              U.map(function (e) {
                return { name: e, value: 0 };
              }),
            ],
            seriesData: [
              P.concat(U).map(function (e) {
                return { name: e, value: 0 };
              }),
              P.concat(U).map(function (e) {
                return { name: e, value: 0 };
              }),
            ],
            others: {
              avgPassRate: 0,
              forumPostCount: 0,
              forumReplyCount: 0,
              teacherDiscussCount: 0,
            },
          },
        ),
        X = m.reduce(function (e, t) {
          return ((e[t] = ''), e);
        }, {}),
        J = E.reduce(function (e, t) {
          return ((e[t] = ''), e);
        }, {}),
        q =
          (m.reduce(function (e, t) {
            return ((e[t] = ''), e);
          }, {}),
          {
            COLUMN_SETTINGS_KEY: 'column_settings_key',
            tabIndex: 0,
            startTime: V,
            rangeStartTime: V,
            endTime: V,
            courseTypeList: [],
            courseInfo: [],
            termInfo: [],
            personCountInfo: [],
            concentricTitle: O[0],
            labelTitle: y[0],
            labelNumber: '0',
            concentricData: w,
            concentricLegendData: k,
            concentricTooltipMapping: X,
            courseDetailConfig: W,
            columns: D.map(function (e) {
              var t = l(e, 6),
                r = t[0],
                n = t[1],
                o = t[3],
                a = t[4];
              return { title: n, dataIndex: r, key: r, disabled: o, ellipsis: t[5], width: a };
            }),
            dataSource: [],
            columnSettings: D.filter(function (e) {
              return l(e, 3)[2];
            }).map(function (e) {
              return l(e, 1)[0];
            }),
            pagination: v,
            status: Y,
            activedStatus: null,
            courseType: [{ value: null, text: '全部' }],
            activedCourseType: null,
            courseName: '',
            teacherName: '',
            exporting: !1,
            hasCourse: !1,
            concentricIsPristine: !0,
            courseDetailIsPristine: !0,
            datatableIsPristine: !0,
          });
      t.default = (0, u.createReducer)(
        q,
        (p(
          p(
            p(
              p(
                p(
                  p(
                    p(
                      p(
                        p(
                          p((o = {}), b.SET_TAB_INDEX_IN_DATA_CENTER, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return _(
                              _(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                              ),
                              {},
                              { tabIndex: e.index },
                            );
                          }),
                          b.SET_DATE_RANGE_IN_DATA_CENTER,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return _(
                              _(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                              ),
                              {},
                              {
                                startTime: (0, a.default)(e.startTime)
                                  .hour(0)
                                  .minute(0)
                                  .second(1)
                                  .valueOf(),
                                endTime: (0, a.default)(e.endTime)
                                  .hour(23)
                                  .minute(59)
                                  .second(59)
                                  .valueOf(),
                              },
                            );
                          },
                        ),
                        b.SET_ACTIVE_STATUS_IN_DATA_CENTER,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return _(
                            _(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                            ),
                            {},
                            { activedStatus: e.value },
                          );
                        },
                      ),
                      b.SET_ACTIVE_COURSE_TYPE_IN_DATA_CENTER,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return _(
                          _({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q),
                          {},
                          { activedCourseType: e.value },
                        );
                      },
                    ),
                    b.GET_COURSE_BASE_INFO_IN_DATA_CENTER_SUCCESS,
                    function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                        t = arguments.length > 1 ? arguments[1] : void 0,
                        r = [{ value: null, text: '全部' }],
                        n = t.data,
                        o = n.isMoocEnabled,
                        u = n.isOocEnabled,
                        i = n.isSyncSopcEnabled,
                        c = n.isAsyncSopcEnabled,
                        l = n.isIndependentSopcEnabled,
                        s = n.hasCourse;
                      return (
                        i && r.push({ value: 10, text: '同步SPOC' }),
                        c && r.push({ value: 15, text: '异步SPOC' }),
                        l && r.push({ value: 20, text: '独立SPOC' }),
                        o && r.push({ value: 0, text: 'MOOC' }),
                        u && r.push({ value: 25, text: 'OOC' }),
                        _(
                          _({}, e),
                          {},
                          {
                            startTime: (0, a.default)(t.data.gmtCreate)
                              .hour(0)
                              .minute(0)
                              .second(1)
                              .valueOf(),
                            rangeStartTime: (0, a.default)(t.data.gmtCreate)
                              .hour(0)
                              .minute(0)
                              .second(1)
                              .valueOf(),
                            courseType: r,
                            hasCourse: s,
                            tabIndex: e.tabIndex,
                          },
                        )
                      );
                    },
                  ),
                  b.SET_FILTER_DATA_IN_DATA_CENTER,
                  function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                      t = arguments.length > 1 ? arguments[1] : void 0;
                    return _(
                      _({}, e),
                      {},
                      {
                        courseName: 'course' === t.typeName ? t.value : '',
                        teacherName: 'teacher' === t.typeName ? t.value : '',
                        pagination: _(_({}, e.pagination), {}, { current: 1 }),
                      },
                    );
                  },
                ),
                b.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_FROM_STORAGE_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return _(
                    _({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q),
                    {},
                    {
                      columnSettings: e.data
                        ? JSON.parse(e.data)
                        : D.filter(function (e) {
                            return l(e, 3)[2];
                          }).map(function (e) {
                            return l(e, 1)[0];
                          }),
                    },
                  );
                },
              ),
              b.SET_COLUMN_SETTINGS_IN_DATA_CENTER_TO_STORAGE,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                  t = arguments.length > 1 ? arguments[1] : void 0;
                return _(
                  _({}, e),
                  {},
                  {
                    columnSettings: t.checked
                      ? D.filter(function (r) {
                          var n = l(r, 1)[0];
                          return -1 !== [].concat(f(e.columnSettings), [t.key]).indexOf(n);
                        }).map(function (e) {
                          return l(e, 1)[0];
                        })
                      : e.columnSettings.filter(function (e) {
                          return e !== t.key;
                        }),
                  },
                );
              },
            ),
            b.GET_COURSE_STATISTIC_IN_DATA_CENTER_SUCCESS,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                t = arguments.length > 1 ? arguments[1] : void 0;
              if (0 === t.data.length)
                return _(
                  _({}, e),
                  {},
                  {
                    concentricData: w,
                    labelNumber: '0',
                    concentricLegendData: k,
                    labelTitle: y[e.tabIndex],
                    concentricTitle: O[e.tabIndex],
                    concentricTooltipMapping: X,
                    concentricIsPristine: !1,
                  },
                );
              var r = 0,
                n = JSON.parse(JSON.stringify(k)),
                o = n[1],
                a = {},
                u = t.data
                  .reduce(
                    function (e, t) {
                      var n = t.type,
                        a = t.count;
                      switch (((r += a), n)) {
                        case 0:
                          ((e[3].value = a), (o[e[3].name] = ''.concat(a, '门')));
                          break;
                        case 10:
                          ((e[0].value = a), (o[e[0].name] = ''.concat(a, '门')));
                          break;
                        case 15:
                          ((e[1].value = a), (o[e[1].name] = ''.concat(a, '门')));
                          break;
                        case 20:
                          ((e[2].value = a), (o[e[2].name] = ''.concat(a, '门')));
                          break;
                        case 25:
                          ((e[4].value = a), (o[e[4].name] = ''.concat(a, '门')));
                      }
                      return e;
                    },
                    JSON.parse(JSON.stringify(L)),
                  )
                  .filter(function (e) {
                    return void 0 !== e.value;
                  });
              return (
                u.forEach(function (e) {
                  var t = e.name,
                    r = e.value;
                  a[t] = ''.concat(t, '<br>课程数：').concat(r);
                }),
                _(
                  _({}, e),
                  {},
                  {
                    concentricData: u,
                    labelNumber: h(r),
                    concentricLegendData: n,
                    labelTitle: y[e.tabIndex],
                    concentricTitle: O[e.tabIndex],
                    concentricTooltipMapping: a,
                    concentricIsPristine: !1,
                  },
                )
              );
            },
          ),
          b.GET_TERM_STATISTIC_IN_DATA_CENTER_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
              t = arguments.length > 1 ? arguments[1] : void 0;
            if (0 === t.data.length)
              return _(
                _({}, e),
                {},
                {
                  concentricData: j,
                  labelNumber: '0',
                  concentricLegendData: H,
                  labelTitle: y[e.tabIndex],
                  concentricTitle: O[e.tabIndex],
                  concentricTooltipMapping: J,
                  concentricIsPristine: !1,
                },
              );
            var r = 0,
              n = JSON.parse(JSON.stringify(H)),
              o = n[1],
              a = {},
              u = t.data
                .reduce(
                  function (e, t) {
                    var n = t.type,
                      a = t.count;
                    switch (((r += a), n)) {
                      case 0:
                        ((e[0].value = a), (o[e[0].name] = ''.concat(a, '门')));
                        break;
                      case 1:
                        ((e[1].value = a), (o[e[1].name] = ''.concat(a, '门')));
                        break;
                      case 2:
                        ((e[2].value = a), (o[e[2].name] = ''.concat(a, '门')));
                        break;
                      case 3:
                        ((e[3].value = a), (o[e[3].name] = ''.concat(a, '门')));
                    }
                    return e;
                  },
                  JSON.parse(JSON.stringify(x)),
                )
                .filter(function (e) {
                  return void 0 !== e.value;
                });
            return (
              u.forEach(function (e) {
                var t = e.name,
                  r = e.value;
                a[t] = ''.concat(t, '<br>学期数：').concat(r);
              }),
              _(
                _({}, e),
                {},
                {
                  concentricData: u,
                  labelNumber: h(r),
                  concentricLegendData: n,
                  labelTitle: y[e.tabIndex],
                  concentricTitle: O[e.tabIndex],
                  concentricTooltipMapping: a,
                  concentricIsPristine: !1,
                },
              )
            );
          },
        ),
        p(
          p(
            p(
              p(
                p(
                  p(o, b.GET_TERM_ENROLL_STATISTIC_IN_DATA_CENTER_SUCCESS, function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                      t = arguments.length > 1 ? arguments[1] : void 0;
                    if (0 === t.data.length)
                      return _(
                        _({}, e),
                        {},
                        {
                          concentricData: G,
                          labelNumber: '0',
                          concentricLegendData: B,
                          labelTitle: y[e.tabIndex],
                          concentricTitle: O[e.tabIndex],
                          concentricTooltipMapping: J,
                          concentricIsPristine: !1,
                        },
                      );
                    var r = JSON.parse(JSON.stringify(B)),
                      n = r[1],
                      o = r[2],
                      a = {},
                      u = 0,
                      i = t.data
                        .reduce(
                          function (e, t) {
                            var r = t.type,
                              a = t.count;
                            switch (r) {
                              case 0:
                                ((e[3].courseNumber = a), (n[e[3].name] = ''.concat(a, '门')));
                                break;
                              case 10:
                                ((e[0].courseNumber = a), (n[e[0].name] = ''.concat(a, '门')));
                                break;
                              case 15:
                                ((e[1].courseNumber = a), (n[e[1].name] = ''.concat(a, '门')));
                                break;
                              case 20:
                                ((e[2].courseNumber = a), (n[e[2].name] = ''.concat(a, '门')));
                                break;
                              case 25:
                                ((e[4].courseNumber = a), (n[e[4].name] = ''.concat(a, '门')));
                                break;
                              case 1e3:
                                ((e[3].personNumber = a >= 0 ? a : 0),
                                  (o[e[3].name] = ''.concat(a, '人次')),
                                  (u += a));
                                break;
                              case 1010:
                                ((e[0].personNumber = a >= 0 ? a : 0),
                                  (o[e[0].name] = ''.concat(a, '人次')),
                                  (u += a));
                                break;
                              case 1015:
                                ((e[1].personNumber = a >= 0 ? a : 0),
                                  (o[e[1].name] = ''.concat(a, '人次')),
                                  (u += a));
                                break;
                              case 1020:
                                ((e[2].personNumber = a >= 0 ? a : 0),
                                  (o[e[2].name] = ''.concat(a, '人次')),
                                  (u += a));
                                break;
                              case 1025:
                                ((e[4].personNumber = a >= 0 ? a : 0),
                                  (o[e[4].name] = ''.concat(a, '人次')),
                                  (u += a));
                            }
                            return e;
                          },
                          JSON.parse(JSON.stringify(L)),
                        )
                        .map(function (e) {
                          return {
                            name: e.name,
                            value: e.personNumber,
                            courseNumber: e.courseNumber,
                          };
                        })
                        .filter(function (e) {
                          return void 0 !== e.value;
                        });
                    return (
                      i.forEach(function (e) {
                        var t = e.name,
                          r = e.value,
                          n = e.courseNumber;
                        a[t] = ''.concat(t, '<br>学期数：').concat(n, '<br>人次数：').concat(r);
                      }),
                      _(
                        _({}, e),
                        {},
                        {
                          concentricData: i,
                          concentricLegendData: r,
                          labelNumber: h(u),
                          labelTitle: y[e.tabIndex],
                          concentricTitle: O[e.tabIndex],
                          concentricTooltipMapping: a,
                          concentricIsPristine: !1,
                        },
                      )
                    );
                  }),
                  b.GET_COURSE_DETAIL_STATISTIC_IN_DATA_CENTER_SUCCESS,
                  function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                      t = arguments.length > 1 ? arguments[1] : void 0;
                    if (!t.data)
                      return _(_({}, e), {}, { courseDetailConfig: W, courseDetailIsPristine: !1 });
                    var r = t.data,
                      n = r.videoCount,
                      o = r.testCount,
                      a = r.liveCount,
                      u = r.examCount,
                      i = r.pdfCount,
                      c = r.homeworkCount,
                      l = r.richTextCount,
                      s = r.discussCount,
                      p = r.videoPersonCount,
                      f = r.testSubmitPersonCount,
                      T = r.livePersonCount,
                      d = r.discussPersonCount,
                      E = r.pdfPersonCount,
                      S = r.homeworkSubmitPersonCount,
                      m = r.richTestPersonCount,
                      y = r.examSubmitPersonCount,
                      O = r.avgPassRate,
                      C = r.forumPostCount,
                      v = r.forumReplyCount,
                      I = r.teacherDiscussCount,
                      b = [n, o, a, u, i, c, l, s],
                      g = [p, f, T, d, E, S, m, y];
                    return _(
                      _({}, e),
                      {},
                      {
                        courseDetailIsPristine: !1,
                        courseDetailConfig: _(
                          _({}, M),
                          {},
                          {
                            title: [
                              {
                                text: '发布课件总个数',
                                count: h(
                                  b.reduce(function (e, t) {
                                    return e + t;
                                  }, 0),
                                ),
                              },
                              {
                                text: '学生学习课件人次',
                                count: h(
                                  g.reduce(function (e, t) {
                                    return e + t;
                                  }, 0),
                                ),
                              },
                              { text: '学期平均通过率' },
                            ],
                            legendData: [
                              P.map(function (e, t) {
                                return { name: e, value: b[t] };
                              }),
                              U.map(function (e, t) {
                                return { name: e, value: b[t + 4] };
                              }),
                            ],
                            seriesData: [
                              P.concat(U).map(function (e, t) {
                                return { name: e, value: b[t] };
                              }),
                              P.concat(U).map(function (e, t) {
                                return { name: e, value: g[t] };
                              }),
                            ],
                            others: {
                              avgPassRate: O || '--',
                              forumPostCount: R(C),
                              forumReplyCount: R(v),
                              teacherDiscussCount: R(I),
                            },
                          },
                        ),
                      },
                    );
                  },
                ),
                b.GET_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER_SUCCESS,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                    t = (arguments.length > 1 ? arguments[1] : void 0).data,
                    r = t.list,
                    n = t.query;
                  if (0 === r.length)
                    return _(
                      _({}, e),
                      {},
                      { dataSource: [], pagination: v, datatableIsPristine: !1 },
                    );
                  var o = _({}, e.pagination);
                  return (
                    (o.total = n.totleCount),
                    (o.current = n.pageIndex),
                    _(
                      _({}, e),
                      {},
                      {
                        datatableIsPristine: !1,
                        dataSource: r.map(function (e) {
                          return {
                            termName: e.termName,
                            courseTime:
                              e.startTime >= 325036512e5
                                ? '待定'
                                : ''
                                    .concat((0, a.default)(e.startTime).format('YYYY.MM.DD'), '-')
                                    .concat((0, a.default)(e.endTime).format('YYYY.MM.DD')),
                            principalName: e.principalName || '-',
                            members: e.teamMember
                              .map(function (e) {
                                return e.realName;
                              })
                              .join('、'),
                            status: E[e.status],
                            type: S[e.type],
                            enrollCount: e.enrollCount || 0,
                            classroomCount: e.classroomCount || 0,
                            videoTotalLength: e.videoTotalLength
                              ? N(e.videoTotalLength)
                              : '00:00:00',
                            videoCount: e.videoCount || 0,
                            pdfCount: e.pdfCount || 0,
                            richTextCount: e.richTextCount || 0,
                            discussCount: e.discussCount || 0,
                            liveCount: e.liveCount || 0,
                            testCount: e.testCount || 0,
                            homeworkCount: e.homeworkCount || 0,
                            examCount: e.examCount || 0,
                            studentLearnVideoSum: e.studentLearnVideoSum
                              ? N(e.studentLearnVideoSum)
                              : '00:00:00',
                            videoPersonCount: e.videoPersonCount || 0,
                            pdfPersonCount: e.pdfPersonCount || 0,
                            richTestPersonCount: e.richTestPersonCount || 0,
                            discussPersonCount: e.discussPersonCount || 0,
                            livePersonCount: e.livePersonCount || 0,
                            testSubmitPersonCount: e.testSubmitPersonCount || 0,
                            homeworkSubmitPersonCount: e.homeworkSubmitPersonCount || 0,
                            examSubmitPersonCount: e.examSubmitPersonCount || 0,
                            forumPostCount: e.forumPostCount || 0,
                            forumReplyCount: e.forumReplyCount || 0,
                            teacherPostCount: e.teacherPostCount || 0,
                            passRate:
                              null === e.passRate || void 0 === e.passRate ? '--' : e.passRate,
                          };
                        }),
                        pagination: o,
                      },
                    )
                  );
                },
              ),
              b.GOTO_PAGE_IN_DATA_CENTER,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q,
                  t = arguments.length > 1 ? arguments[1] : void 0;
                return _(
                  _({}, e),
                  {},
                  { pagination: _(_({}, e.pagination), {}, { current: t.pageIndex }) },
                );
              },
            ),
            b.SET_EXPORTING_IN_DATA_CENTER,
            function () {
              return _(
                _({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q),
                {},
                { exporting: !0 },
              );
            },
          ),
          b.EXPORT_FINISHED_IN_DATA_CENTER,
          function () {
            return _(
              _({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : q),
              {},
              { exporting: !1 },
            );
          },
        )),
      );
    },
    441814: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(852653),
        u = r(138525);
      t.default = [
        function (e, t) {
          return e.pipe(
            (0, n.ofType)(a.Type.GET_TAB_DATA_IN_DATA_CENTER_MKT),
            (0, o.mapTo)({ type: a.Type.GET_COURSE_STATISTIC_IN_DATA_CENTER_MKT }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_BASE_INFO_IN_DATA_CENTER_MKT),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId;
              return u({
                url: '/mm-school/web/j/schoolStatisticBean.getSchoolTimeClassroomType.rpc',
                body: { schoolId: e },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COURSE_BASE_INFO_IN_DATA_CENTER_MKT_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_STATISTIC_IN_DATA_CENTER_MKT),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.mkt,
                n = r.startTime,
                o = r.endTime,
                a = r.tabIndex;
              return u({
                url: '/mm-school/web/j/schoolStatisticBean.getClassroomStatistic.rpc',
                body: { schoolId: e, startTime: n, endTime: o, type: a },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COURSE_STATISTIC_IN_DATA_CENTER_MKT_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_DETAIL_STATISTIC_IN_DATA_CENTER_MKT),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.mkt,
                n = r.startTime,
                o = r.endTime,
                a = r.activedCourseType,
                i = { schoolId: e, startTime: n, endTime: o, webVisible: r.activedCourseOrigin };
              return (
                null !== a && (i.type = a),
                u({ url: '/mm-school/web/j/schoolStatisticBean.classroomStatics.rpc', body: i })
              );
            }),
            (0, o.map)(function (e) {
              return {
                type: a.Type.GET_COURSE_DETAIL_STATISTIC_IN_DATA_CENTER_MKT_SUCCESS,
                data: e,
              };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER_MKT),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.mkt,
                n = r.startTime,
                o = r.endTime,
                a = r.courseName,
                i = r.teacherName,
                c = r.classroomName,
                l = r.activedCourseType,
                s = r.activedCourseOrigin,
                _ = r.pagination,
                p = {
                  schoolId: e,
                  startTime: n,
                  endTime: o,
                  pageSize: _.pageSize,
                  pageIndex: _.current,
                  webVisible: s,
                };
              return (
                null !== l && (p.type = l),
                i && (p.teacherName = i),
                a && (p.courseName = a),
                c && (p.classroomName = c),
                u({
                  url: '/mm-school/web/j/schoolStatisticBean.listClassroomStatistic.rpc',
                  body: p,
                })
              );
            }),
            (0, o.map)(function (e) {
              return {
                type: a.Type.GET_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER_MKT_SUCCESS,
                data: e,
              };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.EXPORT_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER_MKT),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId,
                r = t.value.teach.mkt,
                n = r.startTime,
                o = r.endTime,
                a = r.courseName,
                i = r.teacherName,
                c = r.classroomName,
                l = r.activedCourseType,
                s = { schoolId: e, startTime: n, endTime: o };
              return (
                null !== l && (s.type = l),
                c && (s.classroomName = c),
                i && (s.teacherName = i),
                a && (s.courseName = a),
                u({
                  url: '/mm-school/web/j/asyncExportExcelDataBean.exportClassroomStatics.rpc',
                  body: s,
                })
              );
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.SET_EXPORTING_IN_DATA_CENTER_MKT, threadId: e.threadId };
            }),
          );
        },
        function (e, t, r) {
          return (
            r.g,
            e.pipe(
              (0, n.ofType)(a.Type.SET_EXPORTING_IN_DATA_CENTER_MKT),
              (0, o.map)(function (e) {
                var t = e.threadId;
                return {
                  type: u.Type.EXPORT_POLLING,
                  threadId: t,
                  returnType: a.Type.EXPORT_FINISHED_IN_DATA_CENTER_MKT,
                };
              }),
            )
          );
        },
        function (e, t, r) {
          return (
            r.g,
            e.pipe(
              (0, n.ofType)(a.Type.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_MKT_FROM_STORAGE),
              (0, o.map)(function (e) {
                return {
                  type: a.Type.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_MKT_FROM_STORAGE_SUCCESS,
                  data: window.localStorage.getItem(t.value.teach.mkt.COLUMN_SETTINGS_KEY),
                };
              }),
            )
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(a.Type.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_MKT_FROM_STORAGE_SUCCESS),
            (0, o.mapTo)({ type: u.Type.SWALLOW_IT, index: 0 }),
          );
        },
        function (e, t, r) {
          return (
            r.g,
            e.pipe(
              (0, n.ofType)(a.Type.SET_COLUMN_SETTINGS_IN_DATA_CENTER_MKT_TO_STORAGE),
              (0, o.tap)(function () {
                window.localStorage.setItem(
                  t.value.teach.mkt.COLUMN_SETTINGS_KEY,
                  JSON.stringify(t.value.teach.mkt.columnSettings),
                );
              }),
              (0, o.map)(function (e) {
                return { type: u.Type.SWALLOW_IT };
              }),
            )
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.HAS_IMPORT_SCHEDULE_IN_DATA_CENTER_MKT),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId;
              return u({
                url: '/mm-school/web/j/schoolBean.hasImportSchedule.rpc',
                body: { schoolId: e },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.HAS_IMPORT_SCHEDULE_IN_DATA_CENTER_MKT_RESULT, hasImported: e };
            }),
          );
        },
      ];
    },
    852653: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328),
        a = i(r(795093)),
        u = i(r(133938));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
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
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var r =
              null == e
                ? null
                : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
            if (null != r) {
              var n,
                o,
                a,
                u,
                i = [],
                c = !0,
                l = !1;
              try {
                if (((a = (r = r.call(e)).next), 0 === t)) {
                  if (Object(r) !== r) return;
                  c = !1;
                } else
                  for (; !(c = (n = a.call(r)).done) && (i.push(n.value), i.length !== t); c = !0);
              } catch (e) {
                ((l = !0), (o = e));
              } finally {
                try {
                  if (!c && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                } finally {
                  if (l) throw o;
                }
              }
              return i;
            }
          })(e, t) ||
          s(e, t) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function s(e, t) {
        if (e) {
          if ('string' == typeof e) return _(e, t);
          var r = {}.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? _(e, t)
                : void 0
          );
        }
      }
      function _(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
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
      function f(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? p(Object(r), !0).forEach(function (t) {
                T(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : p(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function T(e, t, r) {
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
      var d = u.default.COURSE_TYPE_ARRAY_MKT,
        E = u.default.COURSE_PIE_TITLE_MKT,
        S = u.default.COURSE_INFO_TITLE_MKT,
        m = u.default.PIE_COLOR_MAPPING,
        y = u.default.DEFAULT_PAGINATION,
        O = (0, o.createActions)({
          setTabIndexInDataCenterMkt: ['index'],
          setDateRangeInDataCenterMkt: ['startTime', 'endTime'],
          setActiveCourseTypeInDataCenterMkt: ['value'],
          setActiveCourseOriginInDataCenterMkt: ['value'],
          setFilterDataInDataCenterMkt: ['typeName', 'value'],
          initColumnSettingsInDataCenterMktFromStorage: null,
          initColumnSettingsInDataCenterMktFromStorageSuccess: ['data'],
          setColumnSettingsInDataCenterMktToStorage: ['key', 'checked'],
          hasImportScheduleInDataCenterMkt: null,
          hasImportScheduleInDataCenterMktResult: ['hasImported'],
          getCourseBaseInfoInDataCenterMkt: null,
          getCourseBaseInfoInDataCenterMktSuccess: ['data'],
          getTabDataInDataCenterMkt: null,
          getCourseStatisticInDataCenterMkt: null,
          getCourseStatisticInDataCenterMktSuccess: ['data'],
          getCourseDetailStatisticInDataCenterMkt: ['type', 'status'],
          getCourseDetailStatisticInDataCenterMktSuccess: ['data'],
          getCourseInfoDetailDataInDataCenterMkt: null,
          getCourseInfoDetailDataInDataCenterMktSuccess: ['data'],
          exportCourseInfoDetailDataInDataCenterMkt: null,
          exportCourseInfoDetailDataInDataCenterMktSuccess: null,
          setExportingInDataCenterMkt: null,
          exportFinishedInDataCenterMkt: null,
          gotoPageInDataCenterMkt: ['pageIndex'],
        }),
        C = O.Types,
        v = O.Creators,
        I =
          ((t.Creator = v),
          (t.Type = C),
          function (e) {
            return e - 0 < 0
              ? '-' + ''.concat(-(e - 0)).replace(/(?!^)(?=(\d{3})+$)/g, ',')
              : ''.concat(e).replace(/(?!^)(?=(\d{3})+$)/g, ',');
          }),
        b = [
          ['classroomName', '课堂名称', !0, !0, 200, !0],
          ['classroomTime', '上课时间', !0, !1, 200, !0],
          ['createrName', '创建者', !0, !1, 140, !0],
          ['type', '类型', !0, !1, 140, !1],
          ['enrollCount', '参加人数', !0, !1, 120, !1],
          ['termName', '关联学期', !0, !1, 200, !0],
          ['termDuration', '学期开课时间', !1, !1, 200, !1],
          ['signinCount', '签到个数', !1, !1, 120, !1],
          ['practiceCount', '练习个数', !1, !1, 120, !1],
          ['questionnaireCount', '问卷个数', !1, !1, 120, !1],
          ['discussCount', '讨论个数', !1, !1, 120, !1],
          ['lotteryCount', '点名个数', !1, !1, 120, !1],
          ['announcementCount', '公告个数', !1, !1, 120, !1],
          ['signinPersonCount', '参与签到人数', !1, !1, 140, !1],
          ['practicePersonCount', '参与练习人数', !1, !1, 140, !1],
          ['questionnairePersonCount', '参与问卷人数', !1, !1, 140, !1],
          ['discussPersonCount', '参与讨论人数', !1, !1, 140, !1],
          ['lotteryPersonCount', '点名抽到人数', !1, !1, 140, !1],
          ['signinRate', '课堂签到率', !1, !1, 140, !1],
        ],
        g = ['签到', '练习', '问卷', '讨论'],
        h = ['点名', '公告'],
        R = {
          colorList: m,
          desc: [
            '慕课堂筛选下统计时间内的课堂活动发布及学生完成情况。',
            '慕课堂筛选下统计时间内的课堂签到率情况。',
          ],
        },
        A = ['关联本校课程', '关联外校课程', '独立未关联'].map(function (e) {
          return { name: e, value: 0 };
        }),
        N = function (e, t) {
          return e.reduce(function (e, r) {
            return ((e[r] = t || r), e);
          }, {});
        },
        D = [f({ icon: 'circle', left: 230 }, N(d)), f({ left: 380 }, N(d, '0门'))],
        P = [
          f({ icon: 'circle', left: 230 }, N(d)),
          f({ left: 380 }, N(d, '0门')),
          f({ left: 430 }, N(d, '0人次')),
        ],
        U = (0, a.default)().add(-1, 'days').valueOf(),
        L = f(
          f({}, R),
          {},
          {
            title: [
              { text: '发布活动总个数', count: 0 },
              { text: '学生完成活动人次', count: 0 },
              { text: '课堂平均签到率' },
            ],
            legendData: [
              g.map(function (e) {
                return { name: e, value: 0 };
              }),
              h.map(function (e) {
                return { name: e, value: 0 };
              }),
            ],
            seriesData: [
              g.concat(h).map(function (e) {
                return { name: e, value: 0 };
              }),
              g.concat([h[0]]).map(function (e) {
                return { name: e, value: 0 };
              }),
            ],
            others: {
              mkt: !0,
              avgPassRate: 0,
              forumPostCount: 0,
              forumReplyCount: 0,
              teacherDiscussCount: 0,
            },
          },
        ),
        M = {
          COLUMN_SETTINGS_KEY: 'mkt_column_settings_key',
          tabIndex: 1,
          startTime: U,
          rangeStartTime: U,
          endTime: U,
          courseTypeList: [],
          courseInfo: [],
          termInfo: [],
          personCountInfo: [],
          concentricTitle: S[1],
          labelTitle: E[1],
          labelNumber: '0',
          concentricData: A,
          concentricLegendData: D,
          concentricTooltipMapping: d.reduce(function (e, t) {
            return ((e[t] = '0个'), e);
          }, {}),
          courseDetailConfig: L,
          columns: b.map(function (e) {
            var t = l(e, 6),
              r = t[0],
              n = t[1],
              o = t[3],
              a = t[4];
            return { title: n, dataIndex: r, key: r, disabled: o, ellipsis: t[5], width: a };
          }),
          dataSource: [],
          columnSettings: b
            .filter(function (e) {
              return l(e, 3)[2];
            })
            .map(function (e) {
              return l(e, 1)[0];
            }),
          pagination: y,
          courseType: [{ value: null, text: '全部' }],
          activedCourseType: null,
          courseOrigin: [
            { value: 0, text: '全部' },
            { value: 1, text: '自主创建' },
            { value: 2, text: '学校导入' },
          ],
          activedCourseOrigin: 0,
          courseName: '',
          teacherName: '',
          classroomName: '',
          exporting: !1,
          concentricIsPristine: !0,
          courseDetailIsPristine: !0,
          datatableIsPristine: !0,
          hasImported: !1,
        };
      t.default = (0, o.createReducer)(
        M,
        (T(
          T(
            T(
              T(
                T(
                  T(
                    T(
                      T(
                        T(
                          T((n = {}), C.SET_TAB_INDEX_IN_DATA_CENTER_MKT, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return f(
                              f(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                              ),
                              {},
                              { tabIndex: e.index },
                            );
                          }),
                          C.SET_DATE_RANGE_IN_DATA_CENTER_MKT,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return f(
                              f(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                              ),
                              {},
                              {
                                startTime: (0, a.default)(e.startTime)
                                  .hour(0)
                                  .minute(0)
                                  .second(1)
                                  .valueOf(),
                                endTime: (0, a.default)(e.endTime)
                                  .hour(23)
                                  .minute(59)
                                  .second(59)
                                  .valueOf(),
                              },
                            );
                          },
                        ),
                        C.SET_ACTIVE_COURSE_TYPE_IN_DATA_CENTER_MKT,
                        function () {
                          var e = arguments.length > 1 ? arguments[1] : void 0;
                          return f(
                            f(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                            ),
                            {},
                            { activedCourseType: e.value },
                          );
                        },
                      ),
                      C.SET_ACTIVE_COURSE_ORIGIN_IN_DATA_CENTER_MKT,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return f(
                          f({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M),
                          {},
                          { activedCourseOrigin: e.value },
                        );
                      },
                    ),
                    C.GET_COURSE_BASE_INFO_IN_DATA_CENTER_MKT_SUCCESS,
                    function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                        t = (arguments.length > 1 ? arguments[1] : void 0).data,
                        r = t.gmtCreate,
                        n = t.enabledTypes;
                      return f(
                        f({}, e),
                        {},
                        {
                          startTime: (0, a.default)(r).hour(0).minute(0).second(1).valueOf(),
                          rangeStartTime: (0, a.default)(r).hour(0).minute(0).second(1).valueOf(),
                          courseType: n.sort().reduce(
                            function (e, t) {
                              return (e.push({ value: t, text: d[t] }), e);
                            },
                            [{ value: null, text: '全部' }],
                          ),
                        },
                      );
                    },
                  ),
                  C.SET_FILTER_DATA_IN_DATA_CENTER_MKT,
                  function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                      t = arguments.length > 1 ? arguments[1] : void 0;
                    return f(
                      f({}, e),
                      {},
                      {
                        courseName: 'term' === t.typeName ? t.value : '',
                        teacherName: 'creator' === t.typeName ? t.value : '',
                        classroomName: 'course' === t.typeName ? t.value : '',
                        pagination: f(f({}, e.pagination), {}, { current: 1 }),
                      },
                    );
                  },
                ),
                C.INIT_COLUMN_SETTINGS_IN_DATA_CENTER_MKT_FROM_STORAGE_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return f(
                    f({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M),
                    {},
                    {
                      columnSettings: e.data
                        ? JSON.parse(e.data)
                        : b
                            .filter(function (e) {
                              return l(e, 3)[2];
                            })
                            .map(function (e) {
                              return l(e, 1)[0];
                            }),
                    },
                  );
                },
              ),
              C.SET_COLUMN_SETTINGS_IN_DATA_CENTER_MKT_TO_STORAGE,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                  t = arguments.length > 1 ? arguments[1] : void 0;
                return f(
                  f({}, e),
                  {},
                  {
                    columnSettings: t.checked
                      ? b
                          .filter(function (r) {
                            var n,
                              o = l(r, 1)[0];
                            return (
                              -1 !==
                              []
                                .concat(
                                  ((n = e.columnSettings),
                                  (function (e) {
                                    if (Array.isArray(e)) return _(e);
                                  })(n) ||
                                    (function (e) {
                                      if (
                                        ('undefined' != typeof Symbol &&
                                          null != e[Symbol.iterator]) ||
                                        null != e['@@iterator']
                                      )
                                        return Array.from(e);
                                    })(n) ||
                                    s(n) ||
                                    (function () {
                                      throw new TypeError(
                                        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                                      );
                                    })()),
                                  [t.key],
                                )
                                .indexOf(o)
                            );
                          })
                          .map(function (e) {
                            return l(e, 1)[0];
                          })
                      : e.columnSettings.filter(function (e) {
                          return e !== t.key;
                        }),
                  },
                );
              },
            ),
            C.GET_COURSE_STATISTIC_IN_DATA_CENTER_MKT_SUCCESS,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                t = arguments.length > 1 ? arguments[1] : void 0,
                r = 0,
                n = 1 === e.tabIndex,
                o = JSON.parse(JSON.stringify(n ? D : P)),
                a = o[1],
                u = o[2],
                i = {},
                c = t.data
                  .sort(function (e, t) {
                    return e.type - t.type;
                  })
                  .reduce(function (e, t) {
                    var o = t.type,
                      c = t.count,
                      l = t.personCount;
                    return (
                      n
                        ? ((r += c), (i[d[o]] = ''.concat(d[o], '<br>课堂数：').concat(c)))
                        : ((r += l),
                          (i[d[o]] = ''
                            .concat(d[o], '<br>个数：')
                            .concat(c, '<br>人次数：')
                            .concat(l))),
                      (e[o] = { name: d[o], value: n ? c : l }),
                      (a[d[o]] = ''.concat(c, '个')),
                      n || (u[d[o]] = ''.concat(l, '人次')),
                      e
                    );
                  }, []);
              return f(
                f({}, e),
                {},
                {
                  concentricIsPristine: !1,
                  concentricData: c,
                  labelNumber: I(r),
                  concentricLegendData: o,
                  concentricTooltipMapping: i,
                  labelTitle: E[e.tabIndex],
                  concentricTitle: S[e.tabIndex],
                },
              );
            },
          ),
          C.GET_COURSE_DETAIL_STATISTIC_IN_DATA_CENTER_MKT_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
              t = arguments.length > 1 ? arguments[1] : void 0;
            if (!t.data)
              return f(f({}, e), {}, { courseDetailConfig: L, courseDetailIsPristine: !1 });
            var r = t.data,
              n = r.signinCount,
              o = r.practiceCount,
              a = r.questionnaireCount,
              u = r.discussCount,
              i = r.lotteryCount,
              c = r.announcementCount,
              l = r.signinPersonCount,
              s = r.practicePersonCount,
              _ = r.questionnairePersonCount,
              p = r.discussPersonCount,
              T = r.lotteryPersonCount,
              d = r.signinRate,
              E = [n, o, a, u, i, c],
              S = [l, s, _, p, T];
            return f(
              f({}, e),
              {},
              {
                courseDetailIsPristine: !1,
                courseDetailConfig: f(
                  f({}, R),
                  {},
                  {
                    title: [
                      {
                        text: '发布活动总个数',
                        count: I(
                          E.reduce(function (e, t) {
                            return e + t;
                          }, 0),
                        ),
                      },
                      {
                        text: '学生完成活动人次',
                        count: I(
                          S.reduce(function (e, t) {
                            return e + t;
                          }, 0),
                        ),
                      },
                      { text: '课堂平均签到率' },
                    ],
                    legendData: [
                      g.map(function (e, t) {
                        return { name: e, value: E[t] };
                      }),
                      h.map(function (e, t) {
                        return { name: e, value: E[t + 4] };
                      }),
                    ],
                    seriesData: [
                      g.concat(h).map(function (e, t) {
                        return { name: e, value: E[t] || 0 };
                      }),
                      g.concat([h[0]]).map(function (e, t) {
                        return { name: e, value: S[t] || 0 };
                      }),
                    ],
                    others: { mkt: !0, avgPassRate: d ?? '--' },
                  },
                ),
              },
            );
          },
        ),
        T(
          T(
            T(
              T(
                T(n, C.GET_COURSE_INFO_DETAIL_DATA_IN_DATA_CENTER_MKT_SUCCESS, function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                    t = (arguments.length > 1 ? arguments[1] : void 0).data,
                    r = t.list,
                    n = t.query;
                  if (0 === r.length)
                    return f(
                      f({}, e),
                      {},
                      { dataSource: [], datatableIsPristine: !1, pagination: y },
                    );
                  var o = f({}, e.pagination);
                  return (
                    (o.total = n.totleCount),
                    (o.current = n.pageIndex),
                    f(
                      f({}, e),
                      {},
                      {
                        datatableIsPristine: !1,
                        dataSource: r.map(function (e) {
                          return {
                            classroomName: e.classroomName,
                            classroomTime: e.classroomTime || '-',
                            createrName: e.createrName,
                            type: e.type || '-',
                            enrollCount: e.enrollCount || 0,
                            termName: e.termName || '-',
                            termDuration: e.termStartTime
                              ? e.termStartTime > 325036512e5
                                ? '待定'
                                : ''
                                    .concat(
                                      (0, a.default)(e.termStartTime).format('YYYY.MM.DD'),
                                      '-',
                                    )
                                    .concat((0, a.default)(e.termEndTime).format('YYYY.MM.DD'))
                              : '-',
                            signinCount: e.signinCount || 0,
                            practiceCount: e.practiceCount || 0,
                            questionnaireCount: e.questionnaireCount || 0,
                            discussCount: e.discussCount || 0,
                            lotteryCount: e.lotteryCount || 0,
                            announcementCount: e.announcementCount || 0,
                            signinPersonCount: e.signinPersonCount || 0,
                            practicePersonCount: e.practicePersonCount || 0,
                            questionnairePersonCount: e.questionnairePersonCount || 0,
                            discussPersonCount: e.discussPersonCount || 0,
                            lotteryPersonCount: e.lotteryPersonCount || 0,
                            signinRate:
                              null === e.signinRate || void 0 === e.signinRate
                                ? '--'
                                : e.signinRate,
                          };
                        }),
                        pagination: o,
                      },
                    )
                  );
                }),
                C.GOTO_PAGE_IN_DATA_CENTER_MKT,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M,
                    t = arguments.length > 1 ? arguments[1] : void 0;
                  return f(
                    f({}, e),
                    {},
                    { pagination: f(f({}, e.pagination), {}, { current: t.pageIndex }) },
                  );
                },
              ),
              C.SET_EXPORTING_IN_DATA_CENTER_MKT,
              function () {
                return f(
                  f({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M),
                  {},
                  { exporting: !0 },
                );
              },
            ),
            C.EXPORT_FINISHED_IN_DATA_CENTER_MKT,
            function () {
              return f(
                f({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M),
                {},
                { exporting: !1 },
              );
            },
          ),
          C.HAS_IMPORT_SCHEDULE_IN_DATA_CENTER_MKT_RESULT,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return f(
              f({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : M),
              {},
              { hasImported: !!e.hasImported },
            );
          },
        )),
      );
    },
    314568: (e, t, r) => {
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
      var o,
        a = r(48816),
        u = r(832780),
        i = r(931051),
        c = (o = r(995233)) && o.__esModule ? o : { default: o };
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
      function _(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      t.default = [
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, a.ofType)(i.Type.GET_SCHOOL_OVERVIEW),
            (0, u.switchMap)(function (e) {
              var t = e.schoolId;
              return n({
                url: '/mm-school/web/j/schoolStatisticBean.getSchoolStatistic.rpc',
                body: { schoolId: t },
              });
            }),
            (0, u.map)(function (e) {
              var t = {};
              return (
                Object.entries(e).forEach(function (e) {
                  var r = (function (e, t) {
                      return (
                        (function (e) {
                          if (Array.isArray(e)) return e;
                        })(e) ||
                        (function (e, t) {
                          var r =
                            null == e
                              ? null
                              : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                                e['@@iterator'];
                          if (null != r) {
                            var n,
                              o,
                              a,
                              u,
                              i = [],
                              c = !0,
                              l = !1;
                            try {
                              if (((a = (r = r.call(e)).next), 0 === t)) {
                                if (Object(r) !== r) return;
                                c = !1;
                              } else
                                for (
                                  ;
                                  !(c = (n = a.call(r)).done) && (i.push(n.value), i.length !== t);
                                  c = !0
                                );
                            } catch (e) {
                              ((l = !0), (o = e));
                            } finally {
                              try {
                                if (!c && null != r.return && ((u = r.return()), Object(u) !== u))
                                  return;
                              } finally {
                                if (l) throw o;
                              }
                            }
                            return i;
                          }
                        })(e, t) ||
                        (function (e, t) {
                          if (e) {
                            if ('string' == typeof e) return _(e, t);
                            var r = {}.toString.call(e).slice(8, -1);
                            return (
                              'Object' === r && e.constructor && (r = e.constructor.name),
                              'Map' === r || 'Set' === r
                                ? Array.from(e)
                                : 'Arguments' === r ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                                  ? _(e, t)
                                  : void 0
                            );
                          }
                        })(e, t) ||
                        (function () {
                          throw new TypeError(
                            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                          );
                        })()
                      );
                    })(e, 2),
                    n = r[0],
                    o = r[1];
                  t[n] = o ? o.toLocaleString() : 0;
                }),
                { type: i.Type.GET_SCHOOL_OVERVIEW_SUCCESS, schoolOverview: e }
              );
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, a.ofType)(i.Type.GET_SCHOOL_OVERVIEW_DETAIL),
            (0, u.switchMap)(function (e) {
              var t = e.schoolId;
              return n({
                url: '/mm-school/web/j/schoolStatisticBean.getAllSchoolStatistic.rpc',
                body: { schoolId: t },
              });
            }),
            (0, u.map)(function (e) {
              return { type: i.Type.GET_SCHOOL_OVERVIEW_DETAIL_SUCCESS, schoolOverviewDetail: e };
            }),
          );
        },
        function (e, t, r) {
          var n,
            o = r.fetch;
          return e.pipe(
            (0, a.ofType)(i.Type.GET_LATEST_DATA),
            (0, u.switchMap)(function (e) {
              var t = e.schoolId,
                r = e.startTime,
                a = e.endTime,
                u = e.latestType;
              return (
                (n = u),
                o({
                  url: '/mm-school/web/j/schoolStatisticBean.listSchoolStatistic.rpc',
                  body: { schoolId: t, startTime: r, endTime: a, type: u },
                })
              );
            }),
            (0, u.map)(function (e) {
              var t = e
                ? e.map(function (e) {
                    return (function (e) {
                      for (var t = 1; t < arguments.length; t++) {
                        var r = null != arguments[t] ? arguments[t] : {};
                        t % 2
                          ? l(Object(r), !0).forEach(function (t) {
                              s(e, t, r[t]);
                            })
                          : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                            : l(Object(r)).forEach(function (t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                              });
                      }
                      return e;
                    })({}, c.default.filterEmpty(e));
                  })
                : null;
              return { type: i.Type.GET_LATEST_DATA_SUCCESS, res: t, latestType: n };
            }),
          );
        },
        function (e, t, r) {
          var n,
            o = r.fetch;
          return e.pipe(
            (0, a.ofType)(i.Type.EXPORT_LATEST_DATA),
            (0, u.switchMap)(function (e) {
              var t = e.schoolId,
                r = e.startTime,
                a = e.endTime,
                u = e.exportType;
              return (
                (n = u),
                o({
                  url: '/mm-school/web/j/asyncExportExcelDataBean.downloadLearnCount.rpc',
                  body: { schoolId: t, startTime: r, endTime: a, type: u },
                })
              );
            }),
            (0, u.map)(function (e) {
              return null != e && e.finished && null != e && e.data
                ? {
                    type: i.Type.DOWNLOAD_LATEST_DATA,
                    exportLatestUrl: e.data,
                    exportLatestType: n,
                  }
                : {
                    type: i.Type.GET_LATEST_EXPORT_PROGRESS,
                    threadId: null == e ? void 0 : e.threadId,
                  };
            }),
          );
        },
        function (e, t, r) {
          var n = r.fetch;
          return e.pipe(
            (0, a.ofType)(i.Type.GET_LATEST_EXPORT_PROGRESS),
            (0, u.switchMap)(function (e) {
              var t = e.threadId;
              return n({
                url: '/mm-school/web/j/asyncExportExcelDataBean.getThreadStatusByThreadId.rpc',
                body: { threadId: t },
              });
            }),
            (0, u.map)(function (e) {
              return null != e && e.finished && null != e && e.data
                ? { type: i.Type.DOWNLOAD_LATEST_DATA, exportLatestUrl: e.data }
                : {
                    type: i.Type.GET_LATEST_EXPORT_PROGRESS_POLLING,
                    threadId: null == e ? void 0 : e.threadId,
                  };
            }),
          );
        },
        function (e, t, r) {
          return (
            r.fetch,
            e.pipe(
              (0, a.ofType)(i.Type.GET_LATEST_EXPORT_PROGRESS_POLLING),
              (0, u.delay)(1e3),
              (0, u.map)(function (e) {
                var t = e.threadId;
                return { type: i.Type.GET_LATEST_EXPORT_PROGRESS, threadId: t };
              }),
            )
          );
        },
      ];
    },
    931051: (e, t, r) => {
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
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                i(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function i(e, t, r) {
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
          getSchoolOverview: ['schoolId'],
          getSchoolOverviewSuccess: null,
          getSchoolOverviewDetail: ['schoolId'],
          getSchoolOverviewDetailSuccess: null,
          getLatestData: ['schoolId', 'startTime', 'endTime', 'latestType'],
          getLatestDataSuccess: null,
          exportLatestData: ['schoolId', 'startTime', 'endTime', 'exportType'],
          getLatestExportProgress: ['threadId', 'exportLatestUrl', 'exportLatestType'],
          downloadLatestData: ['exportLatestUrl', 'exportLatestType'],
          getLatestExportProgressPolling: null,
          clearExportLatestStatus: null,
        }),
        l = c.Types,
        s = c.Creators,
        _ =
          ((t.Creator = s),
          (t.Type = l),
          {
            schoolOverview: {},
            schoolOverviewDetail: {},
            latestCourseLearn: [],
            latestClassroomLearn: [],
            latestStudentLearn: [],
            exportLatestUrl: '',
            exportLatestType: '',
          });
      t.default = (0, n.createReducer)(
        _,
        i(
          i(
            i(
              i(
                i(
                  i({}, l.GET_SCHOOL_OVERVIEW_SUCCESS, function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return u(
                      u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                      {},
                      { schoolOverview: e.schoolOverview },
                    );
                  }),
                  l.GET_SCHOOL_OVERVIEW_DETAIL_SUCCESS,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return u(
                      u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                      {},
                      { schoolOverviewDetail: e.schoolOverviewDetail },
                    );
                  },
                ),
                l.GET_LATEST_DATA_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return u(
                    u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                    {},
                    i(
                      {},
                      {
                        1: 'latestCourseLearn',
                        2: 'latestClassroomLearn',
                        3: 'latestStudentLearn',
                      }[e.latestType],
                      e.res,
                    ),
                  );
                },
              ),
              l.DOWNLOAD_LATEST_DATA,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return u(
                  u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                  {},
                  { exportLatestUrl: e.exportLatestUrl },
                );
              },
            ),
            l.EXPORT_LATEST_DATA,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return u(
                u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                {},
                { exportLatestType: e.exportType },
              );
            },
          ),
          l.CLEAR_EXPORT_LATEST_STATUS,
          function () {
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
              {},
              { exportLatestUrl: '', exportLatestType: '' },
            );
          },
        ),
      );
    },
    995233: (e, t) => {
      function r(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = 3600,
        o = 36e6,
        a = 36e10;
      t.default = {
        filterEmpty: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = {};
          return (
            Object.entries(e).forEach(function (e) {
              var n,
                o,
                a =
                  ((o = 2),
                  (function (e) {
                    if (Array.isArray(e)) return e;
                  })((n = e)) ||
                    (function (e, t) {
                      var r =
                        null == e
                          ? null
                          : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                      if (null != r) {
                        var n,
                          o,
                          a,
                          u,
                          i = [],
                          c = !0,
                          l = !1;
                        try {
                          if (((a = (r = r.call(e)).next), 0 === t)) {
                            if (Object(r) !== r) return;
                            c = !1;
                          } else
                            for (
                              ;
                              !(c = (n = a.call(r)).done) && (i.push(n.value), i.length !== t);
                              c = !0
                            );
                        } catch (e) {
                          ((l = !0), (o = e));
                        } finally {
                          try {
                            if (!c && null != r.return && ((u = r.return()), Object(u) !== u))
                              return;
                          } finally {
                            if (l) throw o;
                          }
                        }
                        return i;
                      }
                    })(n, o) ||
                    (function (e, t) {
                      if (e) {
                        if ('string' == typeof e) return r(e, t);
                        var n = {}.toString.call(e).slice(8, -1);
                        return (
                          'Object' === n && e.constructor && (n = e.constructor.name),
                          'Map' === n || 'Set' === n
                            ? Array.from(e)
                            : 'Arguments' === n ||
                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                              ? r(e, t)
                              : void 0
                        );
                      }
                    })(n, o) ||
                    (function () {
                      throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                      );
                    })()),
                u = a[0],
                i = a[1];
              null != i && (t[u] = i);
            }),
            t
          );
        },
        formatTimeText: function (e) {
          return [
            {
              text: 0,
              value: e,
              visible: function (e) {
                return !e;
              },
            },
            {
              text: ''.concat(e, '秒'),
              visible: function (e) {
                return e > 0 && e < 60;
              },
            },
            {
              text: ''.concat(Math.floor(e / 60), '分钟'),
              visible: function (e) {
                return e >= 60 && e <= 3600;
              },
            },
            {
              text: ''.concat(Math.floor(e / n), '小时'),
              visible: function (e) {
                return e >= n && e < o;
              },
            },
            {
              text: ''.concat((e / o).toFixed(1), '万小时'),
              visible: function (e) {
                return e >= o && e < a;
              },
            },
            {
              text: ''.concat((e / a).toFixed(1), '亿小时'),
              visible: function (e) {
                return e >= a;
              },
            },
          ].filter(function (t) {
            return t.visible(Number(e));
          })[0].text;
        },
        HOUR: n,
      };
    },
    133938: (e, t) => {
      function r(e) {
        return (
          (r =
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
          r(e)
        );
      }
      function n(e, t) {
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
      function o(e, t, n) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != r(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var n = t.call(e, 'string');
                if ('object' != r(n)) return n;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == r(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var a = { SPOC_SYNC: 11, SPOC_ASYNC: 12, SPOC_INDEPENDENT: 13, MOOC: 14, OOC: 15 },
        u = { DRAFT: 20, NOT_START: 21, CURRENT: 22, FINISH: 23 },
        i = { CONNECTED_SCHOOL: 61, NOT_CONNECTED: 62, CONNECTED_FOREIGN: 63 },
        c = { ALL: 0, OWN: 1, OTHER: 2 },
        l = o(o(o({}, c.ALL, '全部'), c.OWN, '已认证'), c.OTHER, '未认证'),
        s = {
          COURSE_TYPE: a,
          COURSE_TYPE_TEXT: o(
            o(
              o(
                o(o({}, a.SPOC_SYNC, '同步SPOC'), a.SPOC_ASYNC, '异步SPOC'),
                a.SPOC_INDEPENDENT,
                '独立SPOC',
              ),
              a.MOOC,
              'MOOC',
            ),
            a.OOC,
            'OOC',
          ),
          TERM_STATUS: u,
          TERM_STATUS_TEXT: o(
            o(o(o({}, u.DRAFT, '草稿'), u.NOT_START, '即将开始'), u.CURRENT, '正在进行'),
            u.FINISH,
            '已结束',
          ),
          CLASSROOM_TYPE: i,
          CLASSROOM_TYPE_TEXT: o(
            o(o({}, i.CONNECTED_SCHOOL, '本校课程关联课堂'), i.NOT_CONNECTED, '独立未关联'),
            i.CONNECTED_FOREIGN,
            '外校课程关联课堂',
          ),
          COLOR_MAPPING: [
            '#00c456',
            '#4099ff',
            '#00cccd',
            '#ff7a3e',
            '#fae449',
            '#755bf8',
            '#46ccff',
            '#e53d1c',
          ],
          PIE_COLOR_MAPPING: [
            '#59d04d',
            '#f9c336',
            '#f67a3e',
            '#f5522a',
            '#e53d1c',
            '#755bf8',
            '#4099ff',
            '#46ccff',
          ],
          COURSE_TYPE_ARRAY: ['同步SPOC', '异步SPOC', '独立SPOC', 'MOOC', 'OOC'],
          COURSE_TYPE_ARRAY_MKT: ['本校课程关联课堂', '外校课程关联课堂', '独立课堂'],
          STATUS_MAPPING: ['草稿', '即将开始', '正在进行', '已结束'],
          COURSE_TYPE_MAPPING: [
            'MOOC',
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            '同步SPOC',
            ,
            ,
            ,
            ,
            '异步SPOC',
            ,
            ,
            ,
            ,
            '独立SPOC',
            ,
            ,
            ,
            ,
            'OOC',
          ],
          COURSE_PIE_TITLE: ['新建课程', '新建学期', '报名人次'],
          COURSE_PIE_TITLE_MKT: [, '建设课堂', '参加人数'],
          COURSE_INFO_TITLE: [
            '本校在统计时间内建设的课程数及发布学期数。',
            '本校课程在统计时间内的有效的学期数',
            '本校课程在统计时间内的有效的对应学期的报名人次。',
          ],
          COURSE_INFO_TITLE_MKT: [
            '',
            '本校在统计时间内建设的课堂数。',
            '本校课堂在统计时间内的参加人次。',
          ],
          DEFAULT_PAGINATION: { hideOnSinglePage: !0, pageSize: 20, current: 1, total: 0 },
          CERT_STATUS: c,
          CERT_STATUS_TEXT: l,
          LATEST_TYPE: { COURSE: 1, CLASSROOM: 2, STUDENT: 3 },
        };
      t.default = (function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? n(Object(r), !0).forEach(function (t) {
                o(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : n(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      })({}, s);
    },
    814144: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(703763);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_SCHOOL_INFO_FOR_TAB_IN_DATA_CENTER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.dataCenter.schoolId;
              return u({
                url: '/mm-school/web/j/schoolStatisticBean.getSchoolTimeClassroomType.rpc',
                body: { schoolId: e },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_SCHOOL_INFO_FOR_TAB_IN_DATA_CENTER_SUCCESS, data: e };
            }),
          );
        },
      ];
    },
    703763: (e, t, r) => {
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
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                i(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function i(e, t, r) {
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
          initEnvInDataCenter: ['schoolId', 'schoolName'],
          getSchoolInfoForTabInDataCenter: null,
          getSchoolInfoForTabInDataCenterSuccess: ['data'],
        }),
        l = c.Types,
        s = c.Creators,
        _ = ((t.Creator = s), (t.Type = l), { schoolId: 39001, schoolName: '', supportMkt: !1 });
      t.default = (0, n.createReducer)(
        _,
        i(
          i({}, l.INIT_ENV_IN_DATA_CENTER, function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
              {},
              { schoolId: e.schoolId, schoolName: e.schoolName },
            );
          }),
          l.GET_SCHOOL_INFO_FOR_TAB_IN_DATA_CENTER_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
              {},
              { supportMkt: e.data.supportClassroom },
            );
          },
        ),
      );
    },
    859024: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(662979);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_STAT_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.data;
              return u({
                url: '/mm-classroom/web/j/mocClassroomJobBean.statisticClassroomJobById.rpc',
                body: t,
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_STAT_DATA_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_SUB_TASK_DETAIL_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.data;
              return u({
                url: '/mm-classroom/web/j/mocClassroomJobBean.getChildJobDetailInfo.rpc',
                body: t,
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_SUB_TASK_DETAIL_INFO_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_SUB_TASK_REVIEW_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.data;
              return u({
                url: '/mm-classroom/web/j/mocClassroomJobBean.listClassroomJobPreviewDetail.rpc',
                body: t,
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_SUB_TASK_REVIEW_INFO_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_IS_CLASSROOM_OPEN_RESOURCE),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/offlineOnlineCourseBean.isNotClassroomOpenResource.rpc',
                body: { classroomId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_IS_CLASSROOM_OPEN_RESOURCE_SUCCESS, status: e };
            }),
          );
        },
      ];
    },
    662979: (e, t, r) => {
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
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                i(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function i(e, t, r) {
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
          getStatData: ['data'],
          getStatDataSuccess: null,
          getSubTaskDetailInfo: ['data'],
          getSubTaskDetailInfoSuccess: null,
          getSubTaskReviewInfo: ['data'],
          getSubTaskReviewInfoSuccess: null,
          getIsClassroomOpenResource: ['classroomId'],
          getIsClassroomOpenResourceSuccess: ['status'],
        }),
        l = c.Types,
        s = c.Creators,
        _ =
          ((t.Creator = s),
          (t.Type = l),
          {
            statData: void 0,
            subTaskDetailInfo: null,
            subTaskReviewInfo: null,
            isClassroomOpenResource: !1,
          });
      t.default = (0, n.createReducer)(
        _,
        i(
          i(
            i(
              i({}, l.GET_STAT_DATA_SUCCESS, function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return u(
                  u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                  {},
                  { statData: e.res },
                );
              }),
              l.GET_SUB_TASK_DETAIL_INFO_SUCCESS,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return u(
                  u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                  {},
                  { subTaskDetailInfo: e.res },
                );
              },
            ),
            l.GET_SUB_TASK_REVIEW_INFO_SUCCESS,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return u(
                u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                {},
                { subTaskReviewInfo: e.res },
              );
            },
          ),
          l.GET_IS_CLASSROOM_OPEN_RESOURCE_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
              {},
              { isClassroomOpenResource: e.status },
            );
          },
        ),
      );
    },
    592575: (e, t) => {
      var r;
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
      function o(e, t, r) {
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
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.CONTETNT_MAP = t.CONTENT_TYPE = void 0));
      var a = (t.CONTENT_TYPE = {
          VIDEO: 1,
          PDF: 3,
          TEXT: 4,
          QUESTIONS: 5,
          POST: 6,
          LIVE: 7,
          AUDIO: 8,
          QUESTIONNAIRE: 30,
          PAPER: 31,
          EXAM: 40,
          QUIZ: 20,
          HOMEWORK: 21,
        }),
        u = (t.CONTETNT_MAP =
          (o(
            o(
              o(
                o(
                  o(
                    o(
                      o(
                        o(
                          o(o((r = {}), a.VIDEO, { text: '视频', className: 'video' }), a.PDF, {
                            text: 'PDF',
                            className: 'pdf',
                          }),
                          a.TEXT,
                          { text: '富文本', className: 'text' },
                        ),
                        a.QUESTIONS,
                        { text: '随堂测验', className: 'questions' },
                      ),
                      a.POST,
                      { text: '讨论', className: 'post' },
                    ),
                    a.LIVE,
                    { text: '直播', className: 'live' },
                  ),
                  a.AUDIO,
                  { text: '音频', className: 'audio' },
                ),
                a.QUESTIONNAIRE,
                { text: '问卷', className: 'questionnaire' },
              ),
              a.PAPER,
              { text: '练习', className: 'paper' },
            ),
            a.EXAM,
            { text: '考试', className: 'exam' },
          ),
          o(o(r, a.QUIZ, { text: '测验', className: 'quiz' }), a.HOMEWORK, {
            text: '作业',
            className: 'homework',
          })));
      t.default = { CONTENT_TYPE: a, CONTETNT_MAP: u };
    },
    244759: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(411690);
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
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
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
            (0, n.ofType)(a.Type.GET_TERM_STRUCTURE),
            (0, o.switchMap)(function (e) {
              var t = e.termId,
                r = e.isOpenSource;
              return u({
                url: r
                  ? '/mm-course/web/j/mocCourseBean.getSimpleTermStructure.rpc'
                  : '/mm-course/web/j/mocCourseBean.getTermStructure.rpc',
                body: { termId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_TERM_STRUCTURE_SUCCESS, termStructure: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_CLASSROOM_INFO_BY_ID),
            (0, o.switchMap)(function (e) {
              var t = e.classroomId;
              return u({
                url: '/mm-classroom/web/j/mocTermClassroomRpcBean.getOffLineClassroomInfoById.rpc',
                body: { id: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_CLASSROOM_INFO_BY_ID_SUCCESS, classroom: c({}, e) };
            }),
          );
        },
      ];
    },
    411690: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328),
        o = r(592575);
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
      function i(e) {
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
      var l = (0, n.createActions)({
          getTermStructure: ['termId', 'isOpenSource'],
          getTermStructureSuccess: null,
          reFormateTermStructure: ['disabledKeys'],
          getClassroomInfoById: ['classroomId'],
          getClassroomInfoByIdSuccess: null,
        }),
        s = l.Types,
        _ = l.Creators,
        p =
          ((t.Creator = _),
          (t.Type = s),
          {
            schoolId: 39001,
            schoolName: '',
            termStructure: [],
            originalTermStructure: [],
            courseName: '',
            classroom: {},
          }),
        f = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            r = [],
            n = e.chapters,
            a = void 0 === n ? [] : n,
            u = e.exams,
            i = void 0 === u ? [] : u,
            c = e.endTime,
            l = e.startTime,
            s = e.closeVisableStatus,
            _ = 0;
          return c < +new Date() && 2 == s
            ? [{ showTree: !1, errMsg: '当前线上课程已结束且无法查看，无法添加课时' }]
            : 32503651201e3 == l
              ? [{ showTree: !1, errMsg: '当前线上课程开课时间待定，无法添加课时' }]
              : l > +new Date()
                ? [{ showTree: !1, errMsg: '当前线上课程还未开课，无法添加课时' }]
                : (a.length &&
                    a.forEach(function (e, n) {
                      var a = e.lessons,
                        u = void 0 === a ? [] : a,
                        i = e.homeworks,
                        c = void 0 === i ? [] : i,
                        l = e.quizs,
                        s = void 0 === l ? [] : l,
                        p = {
                          title: e.name,
                          key: ''.concat(n, '-').concat(e.id),
                          disableCheckbox: !0,
                          children: [],
                        };
                      (null != u &&
                        u.length &&
                        u.forEach(function (r, a) {
                          var u = r.units,
                            i = void 0 === u ? [] : u,
                            c = {
                              title: r.name,
                              key: ''
                                .concat(n + a + 1, '-')
                                .concat(e.id, '-')
                                .concat(r.id),
                              disableCheckbox: !0,
                            };
                          if (null != i && i.length) {
                            ((c.children = []),
                              i.forEach(function (n, a) {
                                var u;
                                (_++, (n.resourceType = 8));
                                var i = {
                                  title: '['
                                    .concat(
                                      null === (u = o.CONTETNT_MAP[n.contentType]) || void 0 === u
                                        ? void 0
                                        : u.text,
                                      ']',
                                    )
                                    .concat(n.name),
                                  info: n,
                                  serial: _,
                                  key: ''
                                    .concat(_, '-')
                                    .concat(e.id, '-')
                                    .concat(r.id, '-')
                                    .concat(n.id, '-name_')
                                    .concat(n.name),
                                };
                                (t && t.includes(n.id) && (i.disableCheckbox = !0),
                                  c.children.push(i));
                              }));
                            for (var l = 0; l < c.children.length; l++)
                              if (!c.children[l].disableCheckbox) {
                                delete c.disableCheckbox;
                                break;
                              }
                          }
                          p.children.push(c);
                        }),
                        null != c &&
                          c.length &&
                          c.forEach(function (e, r) {
                            (_++, (e.resourceType = 7), (e.contentType = 21));
                            var n = {
                              title: e.name,
                              info: e,
                              serial: _ + r,
                              key: ''
                                .concat(_ + r, '-')
                                .concat(e.id, '-name_')
                                .concat(e.name),
                            };
                            (t && t.includes(e.id) && (n.disableCheckbox = !0), p.children.push(n));
                          }),
                        null != s &&
                          s.length &&
                          s.forEach(function (e, r) {
                            (_++, (e.resourceType = 7), (e.contentType = 20));
                            var n = {
                              title: e.name,
                              info: e,
                              serial: _ + r,
                              key: ''
                                .concat(_ + r, '-')
                                .concat(e.id, '-name_')
                                .concat(e.name),
                            };
                            (t && t.includes(e.id) && (n.disableCheckbox = !0), p.children.push(n));
                          }));
                      for (var f = 0; f < p.children.length; f++)
                        if (!p.children[f].disableCheckbox) {
                          delete p.disableCheckbox;
                          break;
                        }
                      r.push(p);
                    }),
                  null != i &&
                    i.length &&
                    i.forEach(function (e, n) {
                      (_++, (e.resourceType = 9), (e.contentType = 40));
                      var o = {
                        title: e.name,
                        info: e,
                        serial: _ + n,
                        key: ''
                          .concat(_ + n, '-')
                          .concat(e.id, '-name_')
                          .concat(e.name),
                      };
                      (t && t.includes(e.id) && (o.disableCheckbox = !0), r.push(o));
                    }),
                  r);
        };
      t.default = (0, n.createReducer)(
        p,
        c(
          c(
            c({}, s.GET_TERM_STRUCTURE_SUCCESS, function () {
              var e,
                t = arguments.length > 1 ? arguments[1] : void 0;
              return i(
                i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                {},
                {
                  originalTermStructure: t.termStructure,
                  termStructure: f(t.termStructure),
                  courseName:
                    null == t || null === (e = t.termStructure) || void 0 === e
                      ? void 0
                      : e.courseName,
                },
              );
            }),
            s.RE_FORMATE_TERM_STRUCTURE,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                t = arguments.length > 1 ? arguments[1] : void 0;
              return i(i({}, e), {}, { termStructure: f(e.originalTermStructure, t.disabledKeys) });
            },
          ),
          s.GET_CLASSROOM_INFO_BY_ID_SUCCESS,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return i(
              i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { classroom: e.classroom },
            );
          },
        ),
      );
    },
    541749: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(670548);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_LIST_FOR_ONLINE_COURSE),
            (0, o.switchMap)(function () {
              var e = t.value.teach.onlineCourse,
                r = e.query,
                n = r.pageIndex,
                o = r.pageSize,
                a = e.courseName,
                i = e.categoryId,
                c = { pIndex: n, pSize: o, schoolId: e.schoolId };
              return (
                a && (c.keyword = a),
                i && (c.categoryId = i),
                u({
                  url: 'http://www.icourse163.org/mm-classroom/web/j/offlineOnlineCourseBean.searchClassroomLinkCourse.rpc',
                  body: c,
                })
              );
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_LIST_SUCCESS_FOR_ONLINE_COURSE, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_CATEGORY_LIST_FOR_ONLINE_COURSE),
            (0, o.switchMap)(function () {
              return u({
                url: 'http://www.icourse163.org/web/j/mocCourseCategoryBean.getCategByType.rpc',
                body: { type: 5 },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_CATEGORY_LIST_SUCCESS_FOR_ONLINE_COURSE, data: e };
            }),
          );
        },
      ];
    },
    670548: (e, t, r) => {
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
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                i(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function i(e, t, r) {
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
          getListForOnlineCourse: null,
          getListSuccessForOnlineCourse: null,
          setCourseNameForOnlineCourse: ['courseName'],
          setCategoryIdForOnlineCourse: ['categoryId'],
          getCategoryListForOnlineCourse: null,
          getCategoryListSuccessForOnlineCourse: ['data'],
          setSchoolIdForOnlineCourse: ['schoolId'],
          gotoPageForOnlineCourse: ['pageIndex'],
        }),
        l = c.Types,
        s = c.Creators,
        _ =
          ((t.Creator = s),
          (t.Type = l),
          {
            schoolId: null,
            courseName: null,
            categoryId: null,
            query: { pageSize: 20, pageIndex: 1, totleCount: 0 },
            datasource: [],
            categoryList: [],
          });
      t.default = (0, n.createReducer)(
        _,
        i(
          i(
            i(
              i(
                i(
                  i({}, l.GET_LIST_SUCCESS_FOR_ONLINE_COURSE, function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
                      t = (arguments.length > 1 ? arguments[1] : void 0).data,
                      r = t.query,
                      n = t.list;
                    return u(
                      u({}, e),
                      {},
                      {
                        datasource: null != n ? n : [],
                        query: u(
                          u({}, e.query),
                          {},
                          { pageIndex: r.pageIndex, totleCount: r.totleCount },
                        ),
                      },
                    );
                  }),
                  l.SET_COURSE_NAME_FOR_ONLINE_COURSE,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return u(
                      u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                      {},
                      { courseName: e.courseName },
                    );
                  },
                ),
                l.SET_CATEGORY_ID_FOR_ONLINE_COURSE,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return u(
                    u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                    {},
                    { categoryId: e.categoryId },
                  );
                },
              ),
              l.GET_CATEGORY_LIST_SUCCESS_FOR_ONLINE_COURSE,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return u(
                  u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                  {},
                  { categoryList: e.data },
                );
              },
            ),
            l.SET_SCHOOL_ID_FOR_ONLINE_COURSE,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return u(
                u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                {},
                { schoolId: e.schoolId || 42002 },
              );
            },
          ),
          l.GOTO_PAGE_FOR_ONLINE_COURSE,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
              t = arguments.length > 1 ? arguments[1] : void 0;
            return u(u({}, e), {}, { query: u(u({}, e.query), {}, { pageIndex: t.pageIndex }) });
          },
        ),
      );
    },
    234687: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(336674);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_SCHOOL_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.schoolId;
              return u({ url: '/web/j/mocSchoolBean.getSchool.rpc', body: { schoolId: t } });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_SCHOOL_INFO_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_CUSTOM_LOGIN_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.key;
              return u({ url: '/web/j/commonBean.obtain.rpc', body: { key: t } });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_CUSTOM_LOGIN_DATA_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.SAVE_CUSTOM_LOGIN_DATA),
            (0, o.switchMap)(function (e) {
              var t = e.key,
                r = e.value;
              return u({
                url: '/web/j/commonBean.addOrUpdate.rpc',
                body: { key: t, value: JSON.stringify(r) },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.SAVE_CUSTOM_LOGIN_DATA_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.EDIT_SCHOOL),
            (0, o.switchMap)(function (e) {
              var t = e.schoolDto;
              return u({
                url: '/web/j/mocSchoolBean.editSchool.rpc',
                body: { schoolDto: JSON.stringify(t) },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.EDIT_SCHOOL_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.PUBLISH_SCHOOL),
            (0, o.switchMap)(function (e) {
              var t = e.schoolId;
              return u({ url: '/web/j/mocSchoolBean.publishSchool.rpc', body: { schoolId: t } });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.PUBLISH_SCHOOL_SUCCESS, data: e };
            }),
          );
        },
      ];
    },
    336674: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328),
        a = (n = r(891482)) && n.__esModule ? n : { default: n },
        u = r(397338);
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
                s(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : c(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function s(e, t, r) {
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
      var _ = (0, o.createActions)({
          getSchoolInfo: ['schoolId'],
          getSchoolInfoSuccess: null,
          editSchool: ['schoolDto'],
          editSchoolSuccess: null,
          publishSchool: ['schoolId'],
          publishSchoolSuccess: null,
          getCustomLoginData: ['key'],
          getCustomLoginDataSuccess: null,
          saveCustomLoginData: ['key', 'value'],
          saveCustomLoginDataSuccess: null,
        }),
        p = _.Types,
        f = _.Creators,
        T = ((t.Creator = f), (t.Type = p), { schoolData: {}, customLoginData: {} });
      t.default = (0, o.createReducer)(
        T,
        s(
          s(
            s(
              s(
                s({}, p.GET_SCHOOL_INFO_SUCCESS, function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return l(
                    l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                    {},
                    { schoolData: e.data },
                  );
                }),
                p.GET_CUSTOM_LOGIN_DATA_SUCCESS,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return l(
                    l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T),
                    {},
                    { customLoginData: e.data ? JSON.parse(e.data) : {} },
                  );
                },
              ),
              p.SAVE_CUSTOM_LOGIN_DATA_SUCCESS,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T;
                if ((arguments.length > 1 ? arguments[1] : void 0).data) {
                  var t = (0, a.default)();
                  u.message.success(t.KEY_SAVE_SUCCESS);
                }
                return l({}, e);
              },
            ),
            p.EDIT_SCHOOL_SUCCESS,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T;
              if ((arguments.length > 1 ? arguments[1] : void 0).data) {
                var t = (0, a.default)();
                u.message.success(t.KEY_SAVE_SUCCESS);
              }
              return l({}, e);
            },
          ),
          p.PUBLISH_SCHOOL_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : T;
            if ((arguments.length > 1 ? arguments[1] : void 0).data) {
              var t = (0, a.default)();
              u.message.success(t.KEY_PUBLISH_SUCCESS);
            }
            return l({}, e);
          },
        ),
      );
    },
    487547: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(907158),
        u = r(138525);
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
                s(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : c(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function s(e, t, r) {
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
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_DATA_IN_STU_MGR),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr,
                r = e.schoolId,
                n = e.searchName,
                o = e.searchNumber,
                a = e.searchFileName,
                i = e.sortType,
                c = e.pagination,
                l = { schoolId: r, pageSize: c.pageSize, pageIndex: c.current };
              return (
                n && (l.searchName = n),
                o && (l.searchNumber = o),
                a && (l.searchFileName = a),
                i && (l.sortType = i),
                u({ url: '/web/j/mocSchoolBean.getStudentInfo.rpc', body: l })
              );
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_DATA_IN_STU_MGR_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.DELETE_DATA_IN_STU_MGR),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr,
                r = e.schoolId,
                n = e.selectedRowIds;
              return u({
                url: '/web/j/mocSchoolBean.getSchoolStudentCountDto.rpc',
                body: { schoolId: r, infoIds: JSON.stringify(n), type: 1 },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.DELETE_DATA_IN_STU_MGR_SUCCESS, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.DELETE_DATA_START_IN_STU_MGR),
            (0, o.switchMap)(function (e) {
              var r = e.deleteType,
                n = t.value.teach.stuMgr,
                o = n.schoolId,
                a = n.selectedRowIds,
                i = n.delExcludedInfoIds,
                c = { schoolId: o, deleteType: r };
              return (
                a.length > 0 && ((c.type = 1), (c.infoIds = JSON.stringify(a))),
                i && (c.excludedInfoIds = i),
                r && (c.deleteType = r),
                u({ url: '/web/j/mocSchoolBean.deleteSchoolStudentInfoAndReg.rpc', body: c })
              );
            }),
            (0, o.map)(function () {
              return { type: a.Type.DELETE_DATA_START_IN_STU_MGR_SUCCESS, status: !1 };
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(a.Type.DELETE_DATA_START_IN_STU_MGR_SUCCESS),
            (0, o.map)(function () {
              return { type: a.Type.GET_DATA_IN_STU_MGR };
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(a.Type.FILE_CHANGE_IN_STU_MGR),
            (0, o.map)(function () {
              return { type: a.Type.GET_UPLOADER_TOKEN_BY_TYPE };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_UPLOADER_TOKEN_BY_TYPE),
            (0, o.switchMap)(function () {
              return u({
                url: '/web/j/fileUploaderBean.getUploaderTokenByType.rpc',
                body: { type: 'default' },
              });
            }),
            (0, o.map)(function (e) {
              var t = e.token,
                r = e.bucket;
              return { type: a.Type.START_UPLOAD, token: t, bucket: r };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.START_UPLOAD),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr,
                r = e.formData,
                n = e.token,
                o = e.bucket;
              return u({
                url: 'http://upload.icourse163.org/file/smallFileUpload.htm?_upload_mth_=sync_parse&token='
                  .concat(encodeURIComponent(n), '&bucket=')
                  .concat(o),
                body: r,
                file: !0,
                isNeedCsrfKey: !1,
                async: !1,
              });
            }),
            (0, o.map)(function (e) {
              var t = e.nosKey;
              return (
                e.retMsg,
                e.retSuc,
                { type: a.Type.IMPORT_ADD_OR_UPDATE_STUDENT_INFOS_IN_STU_MGR, nosKey: t }
              );
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.IMPORT_ADD_OR_UPDATE_STUDENT_INFOS_IN_STU_MGR),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr,
                r = e.filename,
                n = e.bucket,
                o = e.schoolId,
                a = e.nosKey;
              return u({
                url: '/web/j/mocSchoolRpcBean.importAddOrUpdateStudentInfos.rpc',
                body: { filename: r, nosKey: a, bucket: n, schoolId: o },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_UPLOAD_STU_INFO_RESULT_STATUS_IN_STU_MGR, key: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_UPLOAD_STU_INFO_RESULT_STATUS_IN_STU_MGR),
            (0, o.delay)(500),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr.key;
              return u({
                url: '/web/j/mocSchoolRpcBean.getUploadStuInfoResultStatus.rpc',
                body: { key: e },
              });
            }),
            (0, o.map)(function (e) {
              var r = t.value.teach.stuMgr.key;
              return 0 === e.code
                ? { type: a.Type.GET_UPLOAD_STU_INFO_RESULT_STATUS_IN_STU_MGR, key: r }
                : { type: a.Type.UPLOAD_COMPLETE_IN_STU_MGR, data: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.CHECK_STUDENT_EXIST_IN_STU_MGR),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr.rowData;
              return u({
                url: '/web/j/mocSchoolBean.checkStudentExist.rpc',
                body: { info: JSON.stringify(l(l({}, e), {}, { verified: 0 })) },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.CHECK_STUDENT_EXIST_IN_STU_MGR_SUCCESS, data: e };
            }),
          );
        },
        function (e, t) {
          return e.pipe(
            (0, n.ofType)(a.Type.CHECK_STUDENT_EXIST_IN_STU_MGR_SUCCESS),
            (0, o.map)(function () {
              return '' === t.value.teach.stuMgr.rowData.infoId
                ? { type: a.Type.ADD_STUDENT_IN_STU_MGR }
                : { type: u.Type.SWALLOW_IT };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.ADD_STUDENT_IN_STU_MGR),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr,
                r = e.schoolId,
                n = e.rowData,
                o = n.idCard,
                a = n.number,
                i = n.realName,
                c = n.fileName,
                l = n.departments,
                s = n.professional,
                _ = n.clazz,
                p = n.comment;
              return u({
                url: '/web/j/mocSchoolBean.addOneStudentInfo.rpc',
                body: {
                  info: JSON.stringify({
                    schoolId: r,
                    idCard: o,
                    number: a,
                    realName: i,
                    verified: 0,
                    fileName: c,
                    departments: l,
                    professional: s,
                    clazz: _,
                    comment: p,
                  }),
                },
              });
            }),
            (0, o.map)(function () {
              return { type: a.Type.ADD_STUDENT_IN_STU_MGR_SUCCESS };
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(a.Type.ADD_STUDENT_IN_STU_MGR_SUCCESS),
            (0, o.map)(function () {
              return { type: a.Type.GET_DATA_IN_STU_MGR };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.EDIT_STUDENT_IN_STU_MGR),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr,
                r = e.schoolId,
                n = e.rowData,
                o = n.idCard,
                a = n.number,
                i = n.realName,
                c = n.verified,
                l = n.fileName,
                s = n.departments,
                _ = n.professional,
                p = n.clazz,
                f = n.comment,
                T = n.infoId;
              return u({
                url: '/web/j/mocSchoolBean.editOneStudentInfo.rpc',
                body: {
                  infoDto: JSON.stringify({
                    schoolId: r,
                    idCard: o,
                    number: a,
                    realName: i,
                    verified: '未认证' === c ? 0 : 1,
                    fileName: l,
                    departments: s,
                    professional: _,
                    clazz: p,
                    comment: f,
                    infoId: T,
                  }),
                },
              });
            }),
            (0, o.map)(function (e) {
              return (console.log(e), { type: a.Type.EDIT_STUDENT_IN_STU_MGR_SUCCESS });
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(a.Type.EDIT_STUDENT_IN_STU_MGR_SUCCESS),
            (0, o.map)(function () {
              return { type: a.Type.GET_DATA_IN_STU_MGR };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_MEMBER_CACHE_RESULT_STATUS_IN_STU_MGR),
            (0, o.delay)(1e3),
            (0, o.switchMap)(function () {
              var e = t.value.teach.stuMgr.downLoadKey;
              return u({
                url: '/web/j/mocSchoolRpcBean.getMemberCacheResultStatus.rpc',
                body: { key: e },
              });
            }),
            (0, o.map)(function (e) {
              if (0 === e || '0' === e)
                return { type: a.Type.GET_MEMBER_CACHE_RESULT_STATUS_IN_STU_MGR };
              if (-1 === e)
                return (
                  window.alert('下载数据失败，请重试！'),
                  { type: a.Type.GET_MEMBER_CACHE_RESULT_STATUS_IN_STU_MGR_FAILED }
                );
              var t = document.createElement('a');
              return (
                (t.href = e),
                (t.style.display = 'none'),
                document.body.appendChild(t),
                setTimeout(function () {
                  (t.click(), t.parentNode.removeChild(t));
                }, 200),
                { type: a.Type.GET_MEMBER_CACHE_RESULT_STATUS_IN_STU_MGR_SUCCESS }
              );
            }),
          );
        },
        function (e, t, r) {
          return (
            r.fetch,
            e.pipe(
              (0, n.ofType)(a.Type.SET_UPLOADING_START_IN_STU_MGR),
              (0, o.delay)(1e3),
              (0, o.map)(function () {
                return t.value.teach.stuMgr.uploading
                  ? { type: a.Type.SET_UPLOADING_START_IN_STU_MGR }
                  : { type: a.Type.SET_UPLOADING_START_IN_STU_MGR_END };
              }),
            )
          );
        },
        function (e, t, r) {
          return (
            r.fetch,
            e.pipe(
              (0, n.ofType)(a.Type.UPLOAD_COMPLETE_IN_STU_MGR),
              (0, o.map)(function (e) {
                return { type: a.Type.GET_DATA_IN_STU_MGR };
              }),
            )
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.SHOW_STU_INFO_IN_STU_MGR),
            (0, o.switchMap)(function (e) {
              var t = e.record.infoId;
              return u({
                url: '/web/j/mocSchoolBean.getStudentLoginTypes.rpc',
                body: { infoId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.SHOW_STU_INFO_IN_STU_MGR_SUCCESS, data: e };
            }),
          );
        },
      ];
    },
    907158: (e, t, r) => {
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
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var o,
        a,
        u = r(96328);
      function i(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return p(e);
          })(e) ||
          (function (e) {
            if (
              ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e);
          })(e) ||
          _(e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
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
                s(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : c(Object(r)).forEach(function (t) {
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
      function _(e, t) {
        if (e) {
          if ('string' == typeof e) return p(e, t);
          var r = {}.toString.call(e).slice(8, -1);
          return (
            'Object' === r && e.constructor && (r = e.constructor.name),
            'Map' === r || 'Set' === r
              ? Array.from(e)
              : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? p(e, t)
                : void 0
          );
        }
      }
      function p(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      var f = (0, ((o = r(891482)) && o.__esModule ? o : { default: o }).default)(),
        T = (0, u.createActions)({
          initEnvInStuMgr: ['schoolId'],
          getDataInStuMgr: null,
          getDataInStuMgrSuccess: ['data'],
          resetRowDataInStuMgr: null,
          setRowDataInStuMgr: ['field', 'value'],
          setShowEditDialogInStuMgr: ['status'],
          setRowSelectionInStuMgr: ['status'],
          goInStuMgr: ['pageIndex'],
          setSelectedRowIdsInStuMgr: ['rows', 'ids'],
          setColumnInStuMgr: ['columns'],
          setCriteriaInStuMgr: ['ctype', 'cvalue'],
          deleteDataInStuMgr: null,
          deleteDataInStuMgrSuccess: ['data'],
          restoreDeleteDataInStuMgr: null,
          deleteDataStartInStuMgr: ['deleteType'],
          showDelDialogInStuMgr: ['status'],
          deleteDataStartInStuMgrSuccess: null,
          setRowInStuMgr: ['record'],
          setRowIdsInStuMgr: ['ids'],
          checkStudentExistInStuMgr: null,
          checkStudentExistInStuMgrSuccess: null,
          addStudentInStuMgr: null,
          addStudentInStuMgrSuccess: null,
          editStudentInStuMgr: null,
          editStudentInStuMgrSuccess: null,
          getUploaderTokenByType: null,
          startUpload: ['token', 'bucket'],
          importAddOrUpdateStudentInfosInStuMgr: ['nosKey'],
          getUploadStuInfoResultStatusInStuMgr: ['key'],
          uploadCompleteInStuMgr: ['data'],
          fileChangeInStuMgr: ['filename', 'formData'],
          showAddConfirmDialogInStuMgr: ['status'],
          setSortedInfoInStuMgr: ['field', 'order'],
          setShowImportCheckDialogInStuMgr: ['status'],
          getMemberCacheResultStatusInStuMgr: null,
          getMemberCacheResultStatusInStuMgrSuccess: null,
          getMemberCacheResultStatusInStuMgrFailed: null,
          setUploadingStartInStuMgr: null,
          setUploadingStartInStuMgrEnd: null,
          setShowImportInStuMgr: ['status'],
          showStuInfoInStuMgrSuccess: ['data'],
          showStuInfoInStuMgr: ['record'],
          setShowStuInfoDialog: ['status'],
        }),
        d = T.Types,
        E = T.Creators,
        S =
          ((t.Creator = E),
          (t.Type = d),
          { hideOnSinglePage: !0, pageSize: 20, current: 1, total: 0 }),
        m = [
          ['id', 'infoId'],
          [f.KEY_ACCOUNT_SOURCE, 'fileName'],
          [f.KEY_STUDENG_ID, 'number'],
          [f.KEY_NICKNAME, 'nickName'],
          [f.KEY_NAME, 'realName'],
          [f.KEY_ID_6, 'idCard'],
          [f.KEY_CERTIFICATE_STATUS, 'verified'],
        ].map(function (e, t) {
          var r = (function (e, t) {
              return (
                (function (e) {
                  if (Array.isArray(e)) return e;
                })(e) ||
                (function (e, t) {
                  var r =
                    null == e
                      ? null
                      : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                  if (null != r) {
                    var n,
                      o,
                      a,
                      u,
                      i = [],
                      c = !0,
                      l = !1;
                    try {
                      if (((a = (r = r.call(e)).next), 0 === t)) {
                        if (Object(r) !== r) return;
                        c = !1;
                      } else
                        for (
                          ;
                          !(c = (n = a.call(r)).done) && (i.push(n.value), i.length !== t);
                          c = !0
                        );
                    } catch (e) {
                      ((l = !0), (o = e));
                    } finally {
                      try {
                        if (!c && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                      } finally {
                        if (l) throw o;
                      }
                    }
                    return i;
                  }
                })(e, t) ||
                _(e, t) ||
                (function () {
                  throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })()
              );
            })(e, 2),
            n = r[0],
            o = r[1];
          return l({ title: n, key: o, dataIndex: o }, [0, 1, 4].includes(t) ? { sort: !0 } : {});
        }),
        y = {
          schoolId: null,
          pagination: S,
          dataSource: [],
          columns: m,
          defaultColumns: m,
          searchName: '',
          searchNumber: '',
          searchFileName: '',
          sortType: 80,
          rowData: {
            infoId: '',
            realName: '',
            number: '',
            idCard: '',
            departments: '',
            professional: '',
            clazz: '',
            comment: '',
            verified: '',
          },
          showEditDialog: !1,
          selectedRowKeys: [],
          currentPageSelectedRowIds: [],
          selectedRowIds: [],
          showSelected: !1,
          delTotal: -1,
          delVerifiedNumber: -1,
          delExcludedInfoIds: null,
          showDelDialog: !1,
          showAddConfirmDialog: !1,
          token: '',
          bucket: '',
          nosKey: '',
          formData: null,
          filename: '',
          sortedInfo: { field: null, order: null },
          uploading: !1,
          uploadingProgress: 30,
          uploadResultMsg: [],
          downLoadKey: '',
          showImportCheckDialog: !1,
          showImport: !1,
          uploadingStart: !1,
          showStuInfoDialog: !1,
          stuInfo: {
            number: null,
            realName: null,
            nickName: null,
            QqNickName: null,
            WeiBoNickName: null,
            WXNickName: null,
            RRNickName: null,
            NeteaseEmail: null,
            IcourseName: null,
            PhoneNumber: null,
          },
          failDownloading: !1,
        };
      t.default = (0, u.createReducer)(
        y,
        (s(
          s(
            s(
              s(
                s(
                  s(
                    s(
                      s(
                        s(
                          s((a = {}), d.INIT_ENV_IN_STU_MGR, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return l(
                              l(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                              ),
                              {},
                              { schoolId: e.schoolId },
                            );
                          }),
                          d.GET_DATA_IN_STU_MGR_SUCCESS,
                          function () {
                            var e =
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                              t = arguments.length > 1 ? arguments[1] : void 0;
                            if (!t.data) return l(l({}, e), {}, { dataSource: [], pagination: S });
                            var r = t.data,
                              n = r.list,
                              o = r.query;
                            return l(
                              l({}, e),
                              {},
                              {
                                dataSource: n.map(function (e) {
                                  return {
                                    infoId: e.infoId,
                                    fileName: e.fileName || '-',
                                    number: e.number || '-',
                                    nickName: e.nickname || '',
                                    realName: e.realName || '-',
                                    idCard: e.idCard || '-',
                                    verified:
                                      0 === e.verified ? f.KEY_NOT_CERTIFIED : f.KEY_VERIFIED,
                                    clazz: e.clazz || '',
                                    comment: e.comment || '',
                                    departments: e.departments || '',
                                    professional: e.professional || '',
                                    info: 1 === e.verified,
                                  };
                                }),
                                pagination: l(
                                  l({}, e.pagination),
                                  {},
                                  { current: o.pageIndex, total: o.totleCount },
                                ),
                              },
                              e.showSelected
                                ? {
                                    selectedRowKeys: n.reduce(function (t, r, n) {
                                      return (e.selectedRowIds.includes(r.infoId) && t.push(n), t);
                                    }, []),
                                  }
                                : {},
                            );
                          },
                        ),
                        d.RESET_ROW_DATA_IN_STU_MGR,
                        function () {
                          return l(
                            l(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                            ),
                            {},
                            {
                              showEditDialog: !1,
                              rowData: {
                                infoId: '',
                                realName: '',
                                number: '',
                                idCard: '',
                                departments: '',
                                professional: '',
                                clazz: '',
                                comment: '',
                                verified: 0,
                              },
                            },
                          );
                        },
                      ),
                      d.SET_ROW_DATA_IN_STU_MGR,
                      function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                          t = arguments.length > 1 ? arguments[1] : void 0;
                        return l(
                          l({}, e),
                          {},
                          { rowData: l(l({}, e.rowData), {}, s({}, ''.concat(t.field), t.value)) },
                        );
                      },
                    ),
                    d.SET_SHOW_EDIT_DIALOG_IN_STU_MGR,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return l(
                        l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                        {},
                        { showEditDialog: e.status },
                      );
                    },
                  ),
                  d.SET_ROW_SELECTION_IN_STU_MGR,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return l(
                      l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                      {},
                      { showSelected: e.status },
                    );
                  },
                ),
                d.GO_IN_STU_MGR,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                    t = arguments.length > 1 ? arguments[1] : void 0;
                  return l(
                    l({}, e),
                    {},
                    { pagination: l(l({}, e.pagination), {}, { current: t.pageIndex }) },
                  );
                },
              ),
              d.SET_SELECTED_ROW_IDS_IN_STU_MGR,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                  t = arguments.length > 1 ? arguments[1] : void 0,
                  r = t.rows,
                  n = t.ids,
                  o = e.currentPageSelectedRowIds.map(function (e) {
                    return n.indexOf(e) < 0;
                  });
                return l(
                  l({}, e),
                  {},
                  {
                    selectedRowKeys: r,
                    currentPageSelectedRowIds: n,
                    selectedRowIds: i(
                      new Set(
                        [].concat(
                          i(
                            e.selectedRowIds.filter(function (e) {
                              return o.indexOf(e) >= 0;
                            }),
                          ),
                          i(n),
                        ),
                      ),
                    ),
                  },
                );
              },
            ),
            d.SET_ROW_IDS_IN_STU_MGR,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return l(
                l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                {},
                { selectedRowIds: [e.ids] },
              );
            },
          ),
          d.SET_COLUMN_IN_STU_MGR,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return l(
              l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
              {},
              { columns: e.columns },
            );
          },
        ),
        s(
          s(
            s(
              s(
                s(
                  s(
                    s(
                      s(
                        s(
                          s(a, d.SET_CRITERIA_IN_STU_MGR, function () {
                            var e,
                              t,
                              r,
                              n =
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                              o = arguments.length > 1 ? arguments[1] : void 0,
                              a = o.ctype,
                              u = o.cvalue;
                            return (
                              a === f.KEY_STUDENG_ID && ((e = ''), (t = u), (r = '')),
                              a === f.KEY_STUDENG_NAME && ((e = u), (t = ''), (r = '')),
                              a === f.KEY_IMPORT_FILE && ((e = ''), (t = ''), (r = u)),
                              l(
                                l({}, n),
                                {},
                                {
                                  searchName: e,
                                  searchNumber: t,
                                  searchFileName: r,
                                  pagination: l(l({}, n.pagination), {}, { current: 1 }),
                                },
                              )
                            );
                          }),
                          d.DELETE_DATA_IN_STU_MGR_SUCCESS,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return l(
                              l(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                              ),
                              {},
                              {
                                delTotal: e.data.total,
                                delVerifiedNumber: e.data.verifiedNumber,
                                delExcludedInfoIds: e.data.delExcludedInfoIds || null,
                              },
                            );
                          },
                        ),
                        d.RESTORE_DELETE_DATA_IN_STU_MGR,
                        function () {
                          return l(
                            l(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                            ),
                            {},
                            { delTotal: -1, delVerifiedNumber: -1, delExcludedInfoIds: null },
                          );
                        },
                      ),
                      d.DELETE_DATA_START_IN_STU_MGR_SUCCESS,
                      function () {
                        return l(
                          l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                          {},
                          {
                            showDelDialog: !1,
                            showSelected: !1,
                            selectedRowKeys: [],
                            selectedRowIds: [],
                            currentPageSelectedRowIds: [],
                            delTotal: -1,
                            delVerifiedNumber: -1,
                            delExcludedInfoIds: null,
                          },
                        );
                      },
                    ),
                    d.SHOW_DEL_DIALOG_IN_STU_MGR,
                    function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                        t = (arguments.length > 1 ? arguments[1] : void 0).status;
                      return l(
                        l({}, e),
                        {},
                        { showDelDialog: t },
                        t
                          ? {}
                          : {
                              selectedRowKeys: [],
                              selectedRowIds: [],
                              currentPageSelectedRowIds: [],
                              delTotal: -1,
                              delVerifiedNumber: -1,
                              delExcludedInfoIds: null,
                            },
                      );
                    },
                  ),
                  d.SET_ROW_IN_STU_MGR,
                  function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                      t = (arguments.length > 1 ? arguments[1] : void 0).record,
                      r = t.infoId,
                      n = (t.fileName, t.number),
                      o = t.realName,
                      a = t.idCard,
                      u = t.clazz,
                      i = t.comment,
                      c = t.departments,
                      s = t.professional,
                      _ = t.verified;
                    return l(
                      l({}, e),
                      {},
                      {
                        rowData: {
                          infoId: r,
                          realName: '-' === o ? '' : o,
                          number: '-' === n ? '' : n,
                          idCard: '-' === a ? '' : a,
                          departments: c,
                          professional: s,
                          clazz: u,
                          comment: i,
                          verified: _,
                        },
                      },
                    );
                  },
                ),
                d.CHECK_STUDENT_EXIST_IN_STU_MGR_SUCCESS,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                    t = (arguments.length > 1 ? arguments[1] : void 0).data;
                  return l(
                    l({}, e),
                    {},
                    { rowData: l(l({}, e.rowData), t ? { infoId: t.infoId } : {}) },
                    t ? { showAddConfirmDialog: !0, showEditDialog: !1 } : { showEditDialog: !1 },
                  );
                },
              ),
              d.START_UPLOAD,
              function () {
                var e = arguments.length > 1 ? arguments[1] : void 0;
                return l(
                  l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                  {},
                  { token: e.token, bucket: e.bucket, uploading: !0 },
                );
              },
            ),
            d.FILE_CHANGE_IN_STU_MGR,
            function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return l(
                l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                {},
                { filename: e.filename, formData: e.formData },
              );
            },
          ),
          d.GET_UPLOAD_STU_INFO_RESULT_STATUS_IN_STU_MGR,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return l(
              l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
              {},
              { key: e.key },
            );
          },
        ),
        s(
          s(
            s(
              s(
                s(
                  s(
                    s(
                      s(
                        s(
                          s(a, d.SHOW_ADD_CONFIRM_DIALOG_IN_STU_MGR, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return l(
                              l(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                              ),
                              {},
                              { showAddConfirmDialog: e.status },
                            );
                          }),
                          d.EDIT_STUDENT_IN_STU_MGR_SUCCESS,
                          function () {
                            return l(
                              l(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                              ),
                              {},
                              {
                                showEditDialog: !1,
                                rowData: {
                                  infoId: '',
                                  realName: '',
                                  number: '',
                                  idCard: '',
                                  departments: '',
                                  professional: '',
                                  clazz: '',
                                  comment: '',
                                  verified: '',
                                },
                              },
                            );
                          },
                        ),
                        d.ADD_STUDENT_IN_STU_MGR_SUCCESS,
                        function () {
                          return l(
                            l(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                            ),
                            {},
                            {
                              showEditDialog: !1,
                              rowData: {
                                infoId: '',
                                realName: '',
                                number: '',
                                idCard: '',
                                departments: '',
                                professional: '',
                                clazz: '',
                                comment: '',
                                verified: '',
                              },
                            },
                          );
                        },
                      ),
                      d.SET_SORTED_INFO_IN_STU_MGR,
                      function () {
                        var e,
                          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                          r = arguments.length > 1 ? arguments[1] : void 0,
                          n = r.order,
                          o = r.field;
                        return (
                          (e =
                            'fileName' === o
                              ? 'descend' === n
                                ? 20
                                : 10
                              : 'number' === o
                                ? 'descend' === n
                                  ? 60
                                  : 50
                                : 'verified' === o
                                  ? 'descend' === n
                                    ? 40
                                    : 30
                                  : 80),
                          l(
                            l({}, t),
                            {},
                            { showEditDialog: !1, sortedInfo: { field: o, order: n }, sortType: e },
                          )
                        );
                      },
                    ),
                    d.IMPORT_ADD_OR_UPDATE_STUDENT_INFOS_IN_STU_MGR,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return l(
                        l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                        {},
                        { nosKey: e.nosKey, uploadingProgress: 30 },
                      );
                    },
                  ),
                  d.SET_SHOW_IMPORT_CHECK_DIALOG_IN_STU_MGR,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return l(
                      l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                      {},
                      { showImportCheckDialog: e.status },
                    );
                  },
                ),
                d.UPLOAD_COMPLETE_IN_STU_MGR,
                function () {
                  var e,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                    r = (arguments.length > 1 ? arguments[1] : void 0).data,
                    n = r.downLoadKey,
                    o = r.code,
                    a = r.failNums,
                    u = r.failedReason,
                    i = r.successNums,
                    c = r.updateNums;
                  return (
                    (e =
                      -1 == o || 0 == a
                        ? [
                            -1 === o
                              ? u
                              : f.KEY_INPORT_ALL_SUCCESS +
                                i +
                                f.KEY_STUDENT_INFO +
                                (c ? f.KEY_AMONG_THEM + c + f.KEY_UPDATE_INFO : ''),
                          ]
                        : [
                            0 === i
                              ? f.KEY_IMPORT_ALL_INFO_FAIL
                              : f.KEY_SUCCESS_INPORT +
                                i +
                                f.KEY_STUDENT_INFO +
                                (c
                                  ? ''.concat(f.KEY_AMONG_THEM + c + f.KEY_UPDATE_INFO, '，')
                                  : '，') +
                                f.KEY_FAIL +
                                a +
                                f.KEY_PIECE,
                            f.KEY_DOWNLOAD_FAIL_DATA_TABLE,
                          ]),
                    l(
                      l({}, t),
                      {},
                      {
                        showImport: !1,
                        uploading: !1,
                        uploadingProgress: 30,
                        uploadResultMsg: e,
                        downLoadKey: n,
                        showImportCheckDialog: !0,
                      },
                    )
                  );
                },
              ),
              d.GET_MEMBER_CACHE_RESULT_STATUS_IN_STU_MGR,
              function () {
                return l(
                  l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                  {},
                  { failDownloading: !0 },
                );
              },
            ),
            d.GET_MEMBER_CACHE_RESULT_STATUS_IN_STU_MGR_FAILED,
            function () {
              return l(
                l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                {},
                { failDownloading: !1 },
              );
            },
          ),
          d.GET_MEMBER_CACHE_RESULT_STATUS_IN_STU_MGR_SUCCESS,
          function () {
            return l(
              l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
              {},
              {
                token: '',
                bucket: '',
                nosKey: '',
                formData: null,
                filename: '',
                showImportCheckDialog: !1,
                uploadingProgress: 30,
                uploadResultMsg: [],
                downLoadKey: '',
                failDownloading: !1,
              },
            );
          },
        ),
        s(
          s(
            s(
              s(
                s(
                  s(a, d.SET_UPLOADING_START_IN_STU_MGR, function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y;
                    return l(
                      l({}, e),
                      {},
                      {
                        uploadingProgress:
                          e.uploadingProgress >= 95 ? e.uploadingProgress : e.uploadingProgress + 5,
                      },
                    );
                  }),
                  d.SET_UPLOADING_START_IN_STU_MGR_END,
                  function () {
                    return l(
                      l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                      {},
                      { uploadingProgress: 30 },
                    );
                  },
                ),
                d.SET_SHOW_IMPORT_IN_STU_MGR,
                function () {
                  var e = arguments.length > 1 ? arguments[1] : void 0;
                  return l(
                    l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
                    {},
                    {
                      showImport: e.status,
                      token: '',
                      bucket: '',
                      nosKey: '',
                      formData: null,
                      filename: '',
                      showImportCheckDialog: !1,
                      uploadingProgress: 30,
                      uploadResultMsg: [],
                      downLoadKey: '',
                    },
                  );
                },
              ),
              d.SHOW_STU_INFO_IN_STU_MGR_SUCCESS,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                  t = (arguments.length > 1 ? arguments[1] : void 0).data,
                  r = t.QqNickName,
                  n = t.WeiBoNickName,
                  o = t.WXNickName,
                  a = t.RRNickName,
                  u = t.NeteaseEmail,
                  i = t.IcourseName,
                  c = t.PhoneNumber;
                return l(
                  l({}, e),
                  {},
                  {
                    showStuInfoDialog: !0,
                    stuInfo: l(
                      l({}, e.stuInfo),
                      {},
                      {
                        QqNickName: r,
                        WeiBoNickName: n,
                        WXNickName: o,
                        RRNickName: a,
                        NeteaseEmail: u,
                        IcourseName: i,
                        PhoneNumber: c,
                      },
                    ),
                  },
                );
              },
            ),
            d.SHOW_STU_INFO_IN_STU_MGR,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
                t = (arguments.length > 1 ? arguments[1] : void 0).record,
                r = t.number,
                n = t.realName,
                o = t.nickName;
              return l(
                l({}, e),
                {},
                { stuInfo: l(l({}, e.stuInfo), {}, { number: r, realName: n, nickName: o }) },
              );
            },
          ),
          d.SET_SHOW_STU_INFO_DIALOG,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return l(
              l({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y),
              {},
              { showStuInfoDialog: e.status },
              e.status
                ? {}
                : {
                    stuInfo: {
                      number: null,
                      realName: null,
                      nickName: null,
                      QqNickName: null,
                      WeiBoNickName: null,
                      WXNickName: null,
                      RRNickName: null,
                      NeteaseEmail: null,
                      IcourseName: null,
                      PhoneNumber: null,
                    },
                  },
            );
          },
        )),
      );
    },
    425292: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), r(397338));
      var n = r(48816),
        o = r(832780),
        a = r(763847);
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
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
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
            (0, n.ofType)(a.Type.QUERY_TEACHER_REG),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-school/web/j/mocSchoolTeacherRegBean.queryTeacherReg.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.QUERY_TEACHER_REG_SUCCESS, data: e.data.result }
                : c({ type: a.Type.QUERY_TEACHER_REG_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.ADD_OR_UPDATE_TEACHER_REG_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-school/web/j/mocSchoolTeacherRegBean.addOrUpdateTeacherRegInfo.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.ADD_OR_UPDATE_TEACHER_REG_INFO_SUCCESS, data: e.data.result }
                : c({ type: a.Type.ADD_OR_UPDATE_TEACHER_REG_INFO_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.ADD_TEACHER_BY_AUTH),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({ url: '/web/j/adminMemberBean.addTeacher.rpc', body: r, raw: !0 }).subscribe(
                  function (t) {
                    return e(t);
                  },
                );
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.ADD_TEACHER_BY_AUTH_SUCCESS, data: e.data.result }
                : c({ type: a.Type.ADD_TEACHER_BY_AUTH_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.DELETE_TEACHER_REG_INFO),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({
                  url: '/mm-school/web/j/mocSchoolTeacherRegBean.deleteTeacherRegInfo.rpc',
                  body: r,
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? { type: a.Type.DELETE_TEACHER_REG_INFO_SUCCESS, data: e.data.result }
                : c({ type: a.Type.DELETE_TEACHER_REG_INFO_FAIL }, e);
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.EXPORT_TEACHER),
            (0, o.switchMap)(function (e) {
              var t = e.param,
                r = t.value,
                n = t.callback;
              return new Promise(function (e) {
                u({ url: '/mm-school/school/teacher/reg/info/export', body: r, raw: !0 }).subscribe(
                  function (t) {
                    return e(t);
                  },
                );
              }).then(function (e) {
                return (null == n || n(e), { data: e });
              });
            }),
            (0, o.map)(function (e) {
              return c({ type: a.Type.EXPORT_TEACHER_SUCCESS }, e);
            }),
          );
        },
        function (e) {
          return e.pipe(
            (0, n.ofType)(a.Type.FILE_CHANGE_IN_TEACHER_MGR),
            (0, o.map)(function () {
              return { type: a.Type.GET_TEACHER_UPLOADER_TOKEN_BY_TYPE };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_TEACHER_UPLOADER_TOKEN_BY_TYPE),
            (0, o.switchMap)(function () {
              return u({
                url: '/web/j/fileUploaderBean.getUploaderTokenByType.rpc',
                body: { type: 'default' },
              });
            }),
            (0, o.map)(function (e) {
              var t = e.token,
                r = e.bucket;
              return { type: a.Type.START_UPLOAD_TEACHER, token: t, bucket: r };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.START_UPLOAD_TEACHER),
            (0, o.switchMap)(function () {
              var e = t.value.teach.teacherMgr,
                r = e.formData,
                n = e.token,
                o = e.bucket;
              return u({
                url: 'http://upload.icourse163.org/file/smallFileUpload.htm?_upload_mth_=sync_parse&token='
                  .concat(encodeURIComponent(n), '&bucket=')
                  .concat(o),
                body: r,
                file: !0,
                isNeedCsrfKey: !1,
                async: !1,
              });
            }),
            (0, o.map)(function (e) {
              var t = e.nosKey;
              return (e.retMsg, e.retSuc, { type: a.Type.IMPORT_TEACHER_REG_INFO, nosKey: t });
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.IMPORT_TEACHER_REG_INFO),
            (0, o.switchMap)(function () {
              var e = t.value.teach.teacherMgr,
                r = (e.filename, e.bucket),
                n = e.schoolId,
                o = e.nosKey;
              return new Promise(function (e) {
                u({
                  url: '/mm-school/web/j/mocSchoolTeacherRegBean.importTeacherRegInfo.rpc',
                  body: { nosKey: o, nosBucket: r, schoolId: n },
                  raw: !0,
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return { data: e };
              });
            }),
            (0, o.map)(function (e) {
              return e.data && 0 === e.data.code
                ? {
                    type: a.Type.GET_UPLOAD_TEACHER_INFO_RESULT_STATUS_IN_TEACHER_MGR,
                    key: e.data.result,
                  }
                : {
                    type: a.Type.UPLOAD_COMPLETE_IN_TEACHER_MGR,
                    data: { status: 4, message: e.data.message, resultExcelUrl: '' },
                  };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_UPLOAD_TEACHER_INFO_RESULT_STATUS_IN_TEACHER_MGR),
            (0, o.delay)(500),
            (0, o.switchMap)(function () {
              var e = t.value.teach.teacherMgr.key;
              return u({
                url: '/mm-school/web/j/mocSchoolTeacherRegBean.queryImportStatus.rpc',
                body: { key: e },
              });
            }),
            (0, o.map)(function (e) {
              var r = t.value.teach.teacherMgr.key;
              return 0 === e.status
                ? { type: a.Type.GET_UPLOAD_TEACHER_INFO_RESULT_STATUS_IN_TEACHER_MGR, key: r }
                : { type: a.Type.UPLOAD_COMPLETE_IN_TEACHER_MGR, data: e };
            }),
          );
        },
        function (e, t, r) {
          return (
            r.fetch,
            e.pipe(
              (0, n.ofType)(a.Type.SET_UPLOADING_START_IN_TEACHER_MGR),
              (0, o.delay)(1e3),
              (0, o.map)(function () {
                return t.value.teach.teacherMgr.uploading
                  ? { type: a.Type.SET_UPLOADING_START_IN_TEACHER_MGR }
                  : { type: a.Type.SET_UPLOADING_START_IN_TEACHER_MGR_END };
              }),
            )
          );
        },
      ];
    },
    763847: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n,
        o = r(96328);
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
      function i(e) {
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
      var l = (0, o.createActions)({
          queryTeacherReg: ['param'],
          queryTeacherRegSuccess: null,
          queryTeacherRegFail: null,
          addOrUpdateTeacherRegInfo: ['param'],
          addOrUpdateTeacherRegInfoSuccess: null,
          addOrUpdateTeacherRegInfoFail: null,
          addTeacherByAuth: ['param'],
          addTeacherByAuthSuccess: null,
          addTeacherByAuthFail: null,
          deleteTeacherRegInfo: ['param'],
          deleteTeacherRegInfoSuccess: null,
          deleteTeacherRegInfoFail: null,
          exportTeacher: ['param'],
          exportTeacherSuccess: null,
          initEnvInTeacherMgr: ['schoolId'],
          fileChangeInTeacherMgr: ['filename', 'formData'],
          setShowImportCheckDialogInTeacherMgr: ['status'],
          getMemberCacheResultStatusInTeacherMgr: null,
          getMemberCacheResultStatusInTeacherMgrSuccess: null,
          getMemberCacheResultStatusInTeacherMgrFailed: null,
          setUploadingStartInTeacherMgr: null,
          setUploadingStartInTeacherMgrEnd: null,
          getTeacherUploaderTokenByType: null,
          startUploadTeacher: ['token', 'bucket'],
          importTeacherRegInfo: ['nosKey'],
          getUploadTeacherInfoResultStatusInTeacherMgr: ['key'],
          getUploadTeacherInfoResultStatusInTeacherMgrFail: null,
          uploadCompleteInTeacherMgr: ['data'],
        }),
        s = l.Types,
        _ = l.Creators,
        p =
          ((t.Creator = _),
          (t.Type = s),
          {
            teacherList: {},
            schoolId: null,
            uploading: !1,
            uploadingProgress: 30,
            showImportCheckDialog: !1,
            uploadResultMsg: [],
            failDownloading: !1,
            formData: null,
            filename: '',
            token: '',
            bucket: '',
            nosKey: '',
            key: '',
            resultExcelUrl: '',
            status: null,
          });
      t.default = (0, o.createReducer)(
        p,
        (c(
          c(
            c(
              c(
                c(
                  c(
                    c(
                      c(
                        c(
                          c((n = {}), s.QUERY_TEACHER_REG_FAIL, function () {
                            return i(
                              {},
                              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                            );
                          }),
                          s.QUERY_TEACHER_REG_SUCCESS,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return i(
                              i(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                              ),
                              {},
                              { teacherList: e.data },
                            );
                          },
                        ),
                        s.ADD_OR_UPDATE_TEACHER_REG_INFO_SUCCESS,
                        function () {
                          return i(
                            {},
                            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                          );
                        },
                      ),
                      s.ADD_OR_UPDATE_TEACHER_REG_INFO_FAIL,
                      function () {
                        return i(
                          {},
                          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                        );
                      },
                    ),
                    s.ADD_TEACHER_BY_AUTH_SUCCESS,
                    function () {
                      return i(
                        {},
                        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                      );
                    },
                  ),
                  s.ADD_TEACHER_BY_AUTH_FAIL,
                  function () {
                    return i(
                      {},
                      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                    );
                  },
                ),
                s.DELETE_TEACHER_REG_INFO_SUCCESS,
                function () {
                  return i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p);
                },
              ),
              s.DELETE_TEACHER_REG_INFO_FAIL,
              function () {
                return i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p);
              },
            ),
            s.EXPORT_TEACHER_SUCCESS,
            function () {
              return i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p);
            },
          ),
          s.UPLOAD_COMPLETE_IN_TEACHER_MGR,
          function () {
            var e,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
              r = (arguments.length > 1 ? arguments[1] : void 0).data,
              n = r.status,
              o = r.resultExcelUrl,
              a = r.message;
            return (
              (e =
                2 == n || 3 == n
                  ? [a, '请下载失败数据表，根据表格中的错误原因进行修改。修改后可再次导入。']
                  : [a]),
              i(
                i({}, t),
                {},
                {
                  status: n,
                  uploading: !1,
                  uploadingProgress: 30,
                  uploadResultMsg: e,
                  resultExcelUrl: o,
                  showImportCheckDialog: !0,
                },
              )
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
                          c(n, s.IMPORT_TEACHER_REG_INFO, function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return i(
                              i(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                              ),
                              {},
                              { resultExcelUrl: '', nosKey: e.nosKey, uploadingProgress: 30 },
                            );
                          }),
                          s.GET_UPLOAD_TEACHER_INFO_RESULT_STATUS_IN_TEACHER_MGR,
                          function () {
                            var e = arguments.length > 1 ? arguments[1] : void 0;
                            return i(
                              i(
                                {},
                                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                              ),
                              {},
                              { key: e.key },
                            );
                          },
                        ),
                        s.GET_UPLOAD_TEACHER_INFO_RESULT_STATUS_IN_TEACHER_MGR_FAIL,
                        function () {
                          return i(
                            {},
                            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
                          );
                        },
                      ),
                      s.INIT_ENV_IN_TEACHER_MGR,
                      function () {
                        var e = arguments.length > 1 ? arguments[1] : void 0;
                        return i(
                          i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                          {},
                          { schoolId: e.schoolId },
                        );
                      },
                    ),
                    s.FILE_CHANGE_IN_TEACHER_MGR,
                    function () {
                      var e = arguments.length > 1 ? arguments[1] : void 0;
                      return i(
                        i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                        {},
                        { filename: e.filename, formData: e.formData },
                      );
                    },
                  ),
                  s.SET_SHOW_IMPORT_CHECK_DIALOG_IN_TEACHER_MGR,
                  function () {
                    var e = arguments.length > 1 ? arguments[1] : void 0;
                    return i(
                      i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                      {},
                      { showImportCheckDialog: e.status },
                    );
                  },
                ),
                s.GET_MEMBER_CACHE_RESULT_STATUS_IN_TEACHER_MGR,
                function () {
                  return i(
                    i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                    {},
                    { failDownloading: !0 },
                  );
                },
              ),
              s.GET_MEMBER_CACHE_RESULT_STATUS_IN_TEACHER_MGR_FAILED,
              function () {
                return i(
                  i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                  {},
                  { failDownloading: !1 },
                );
              },
            ),
            s.GET_MEMBER_CACHE_RESULT_STATUS_IN_TEACHER_MGR_SUCCESS,
            function () {
              return i(
                i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
                {},
                {
                  token: '',
                  bucket: '',
                  nosKey: '',
                  formData: null,
                  filename: '',
                  resultExcelUrl: '',
                  showImportCheckDialog: !1,
                  uploadingProgress: 30,
                  uploadResultMsg: [],
                  downLoadKey: '',
                  failDownloading: !1,
                },
              );
            },
          ),
          s.SET_UPLOADING_START_IN_TEACHER_MGR,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p;
            return i(
              i({}, e),
              {},
              {
                resultExcelUrl: '',
                uploadingProgress:
                  e.uploadingProgress >= 95 ? e.uploadingProgress : e.uploadingProgress + 5,
              },
            );
          },
        ),
        c(
          c(n, s.SET_UPLOADING_START_IN_TEACHER_MGR_END, function () {
            return i(
              i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { uploadingProgress: 30 },
            );
          }),
          s.START_UPLOAD_TEACHER,
          function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return i(
              i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p),
              {},
              { token: e.token, bucket: e.bucket, uploading: !0 },
            );
          },
        )),
      );
    },
    577604: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(296015);
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
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? i(Object(r), !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
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
            (0, n.ofType)(a.Type.SET_COMMUNITY_SETTING),
            (0, o.switchMap)(function (e) {
              var t,
                r = (null !== (t = e.communities) && void 0 !== t ? t : []).map(function (t) {
                  return c(c({}, t), {}, { targetId: e.termId, targetType: 2 });
                });
              return new Promise(function (e) {
                u({
                  url: '/web/j/mocCommunityRpcBean.saveOrUpdateMocCommunity.rpc',
                  body: { mocCommunities: JSON.stringify(r) },
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (t) {
                var r;
                return (null === (r = e.callback) || void 0 === r || r.call(e, t), t);
              });
            }),
            (0, o.map)(function () {
              return { type: a.Type.SET_COMMUNITY_SETTING_SUCCESS };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COMMUNITY_SETTING),
            (0, o.switchMap)(function (e) {
              var t = e.termId;
              return u({
                url: '/web/j/mocCommunityRpcBean.getTermCommunity.rpc',
                body: { termId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COMMUNITY_SETTING_SUCCESS, res: e };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.DEL_COMMUNITY),
            (0, o.switchMap)(function (e) {
              var t = e.ids,
                r = e.callback;
              return new Promise(function (e) {
                u({
                  url: '/web/j/mocCommunityRpcBean.deleteCommunity.rpc',
                  body: { communityIds: JSON.stringify(t) },
                }).subscribe(function (t) {
                  return e(t);
                });
              }).then(function (e) {
                return (null == r || r(e), e);
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.DEL_COMMUNITY_SUCCESS, res: e };
            }),
          );
        },
      ];
    },
    296015: (e, t, r) => {
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
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                i(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function i(e, t, r) {
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
          getCommunitySetting: ['termId'],
          getCommunitySettingSuccess: null,
          setCommunitySetting: ['termId', 'communities', 'callback'],
          setCommunitySettingSuccess: null,
          delCommunity: ['ids', 'callback'],
          delCommunitySuccess: null,
        }),
        l = c.Types,
        s = c.Creators,
        _ = ((t.Creator = s), (t.Type = l), { communitySetting: [] });
      t.default = (0, n.createReducer)(
        _,
        i(
          i(
            i({}, l.GET_COMMUNITY_SETTING_SUCCESS, function () {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return u(
                u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
                {},
                { communitySetting: e.res },
              );
            }),
            l.SET_COMMUNITY_SETTING_SUCCESS,
            function () {
              return u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _);
            },
          ),
          l.DEL_COMMUNITY_SUCCESS,
          function () {
            return arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
          },
        ),
      );
    },
    150234: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(397338),
        u = r(25341);
      t.default = [
        function (e, t, r) {
          var a = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.GET_TERM_DETAIL_ADVERT_LIST),
            (0, o.switchMap)(function (e) {
              var t = e.termId;
              return a({
                url: '/web/j/publishCourseBean.getMocTermDetailAdvertisementDto.rpc',
                body: { termId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: u.Type.GET_TERM_DETAIL_ADVERT_LIST_SUCCESS, data: null != e ? e : [] };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(u.Type.UPDATE_TERM_DETAIL_ADVERT_LIST),
            (0, o.switchMap)(function (e) {
              var t = e.termId,
                r = e.termDetailDto;
              return i({
                url: '/web/j/publishCourseBean.updateMocTermDetailAdvertisementDto.rpc',
                body: { termId: t, mocTermDetailAdvertisementdDtos: JSON.stringify(r) },
                raw: !0,
              });
            }),
            (0, o.map)(function (e) {
              if (e && 0 === e.code)
                return { type: u.Type.UPDATE_TERM_DETAIL_ADVERT_LIST_SUCCESS, data: e.result };
              a.message.error(e.message || '请求失败');
            }),
          );
        },
      ];
    },
    25341: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328),
        o = r(397338);
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
      function i(e) {
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
      var l = (0, n.createActions)({
          getTermDetailAdvertList: ['termId'],
          getTermDetailAdvertListSuccess: null,
          updateTermDetailAdvertList: ['termId', 'termDetailDto'],
          updateTermDetailAdvertListSuccess: null,
        }),
        s = (t.Type = l.Types),
        _ = ((t.Creator = l.Creators), { termDetailAdvertisementList: [] });
      t.default = (0, n.createReducer)(
        _,
        c(
          c({}, s.GET_TERM_DETAIL_ADVERT_LIST_SUCCESS, function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return i(
              i({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _),
              {},
              { termDetailAdvertisementList: e.data || [] },
            );
          }),
          s.UPDATE_TERM_DETAIL_ADVERT_LIST_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
            return (o.message.success('保存成功！！'), i({}, e));
          },
        ),
      );
    },
    36948: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(101427),
        u = 'term_manage_jpk_convert_config_';
      t.default = [
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_CONVERT_SETTING),
            (0, o.switchMap)(function (e) {
              var t = e.termId;
              return i({
                url: '/web/j/commonBean.obtain.rpc',
                body: { key: ''.concat(u).concat(t) },
              });
            }),
            (0, o.map)(function (e) {
              var t;
              return {
                type: a.Type.GET_CONVERT_SETTING_SUCCESS,
                data: null !== (t = JSON.parse(e)) && void 0 !== t ? t : {},
              };
            }),
          );
        },
        function (e, t, r) {
          var i = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.SAVE_CONVERT_SETTING),
            (0, o.switchMap)(function (e) {
              var t = e.termId,
                r = e.value,
                n = e.callback;
              return new Promise(function (e) {
                return i({
                  url: '/web/j/commonBean.addOrUpdate.rpc',
                  body: { key: ''.concat(u).concat(t), value: JSON.stringify(r) },
                }).subscribe(function () {
                  for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
                    r[o] = arguments[o];
                  (null == n || n.apply(void 0, r), e.apply(void 0, r));
                });
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.SAVE_CONVERT_SETTING_SUCCESS, data: e };
            }),
          );
        },
      ];
    },
    101427: (e, t, r) => {
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
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                i(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : a(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function i(e, t, r) {
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
          getConvertSetting: ['termId'],
          getConvertSettingSuccess: null,
          saveConvertSetting: ['termId', 'value', 'callback'],
          saveConvertSettingSuccess: null,
        }),
        l = (t.Type = c.Types),
        s =
          ((t.Creator = c.Creators),
          { config: { needConvert: null, introText: '', imageUrl: '' } });
      t.default = (0, n.createReducer)(
        s,
        i(
          i({}, l.GET_CONVERT_SETTING_SUCCESS, function () {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return u(
              u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s),
              {},
              { config: e.data },
            );
          }),
          l.SAVE_CONVERT_SETTING_SUCCESS,
          function () {
            return u({}, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s);
          },
        ),
      );
    },
    642550: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(48816),
        o = r(832780),
        a = r(798113);
      t.default = [
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.ADD_OR_UPDATE_COURSE_SETTING),
            (0, o.switchMap)(function (e) {
              var t = e.courseId,
                r = e.targetId,
                n = e.weight,
                o = e.id,
                a = { courseId: t, weight: n };
              return (
                r && (a.targetId = r),
                o && (a.id = o),
                u({
                  url: '/mm-course//web/j/mocCourseRecommandBean.addOrUpdateMocCourseRecommand.rpc',
                  body: a,
                  raw: !0,
                })
              );
            }),
            (0, o.map)(function (e) {
              return 0 === e.code
                ? { type: a.Type.ADD_OR_UPDATE_COURSE_SETTING_SUCCESS, data: e.result }
                : { type: a.Type.ADD_OR_UPDATE_COURSE_SETTING_FAILURE, data: e.message };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_SETTING_BY_COURSE_ID),
            (0, o.switchMap)(function (e) {
              var t = e.courseId;
              return u({
                url: '/mm-course//web/j/mocCourseRecommandBean.getMocCourseRecommandDtoByCourseId.rpc',
                body: { courseId: t },
              });
            }),
            (0, o.map)(function (e) {
              return {
                type: a.Type.GET_COURSE_SETTING_BY_COURSE_ID_SUCCESS,
                data: null != e ? e : {},
              };
            }),
          );
        },
        function (e, t, r) {
          var u = r.fetch;
          return e.pipe(
            (0, n.ofType)(a.Type.GET_COURSE_SETTING_YOUDAO_JPK_COURSE),
            (0, o.switchMap)(function (e) {
              var t = e.id;
              return u({
                url: '/web/j/thirdProductRpcBean.getThirdCourseCardByCourseId.rpc',
                body: { courseId: t },
              });
            }),
            (0, o.map)(function (e) {
              return { type: a.Type.GET_COURSE_SETTING_YOUDAO_JPK_COURSE_SUCCESS, data: e };
            }),
          );
        },
      ];
    },
    798113: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.Type = t.Creator = void 0));
      var n = r(96328),
        o = r(397338);
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
      function i(e) {
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
      var l = (0, n.createActions)({
          addOrUpdateCourseSetting: ['courseId', 'targetId', 'weight', 'id'],
          addOrUpdateCourseSettingSuccess: null,
          addOrUpdateCourseSettingFailure: null,
          getCourseSettingByCourseId: ['courseId'],
          getCourseSettingByCourseIdSuccess: null,
          getCourseSettingYoudaoJPKCourse: ['id'],
          getCourseSettingYoudaoJPKCourseSuccess: null,
        }),
        s = (t.Type = l.Types),
        _ =
          ((t.Creator = l.Creators),
          {
            config: null,
            youdaoJPKCourseInfo: { id: null, courseTitle: null, courseSalePrice: null },
            isValidCourseId: !1,
          });
      t.default = (0, n.createReducer)(
        _,
        c(
          c(
            c(
              c({}, s.GET_COURSE_SETTING_BY_COURSE_ID_SUCCESS, function () {
                var e,
                  t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
                  r = (arguments.length > 1 ? arguments[1] : void 0).data;
                return i(
                  i({}, t),
                  {},
                  {
                    config: r,
                    isValidCourseId: Boolean(null !== (e = r.targetId) && void 0 !== e && e),
                  },
                );
              }),
              s.ADD_OR_UPDATE_COURSE_SETTING_SUCCESS,
              function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;
                return (o.message.success('保存成功'), i({}, e));
              },
            ),
            s.ADD_OR_UPDATE_COURSE_SETTING_FAILURE,
            function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
                t = (arguments.length > 1 ? arguments[1] : void 0).data;
              return (o.message.error(null != t ? t : '保存失败'), i({}, e));
            },
          ),
          s.GET_COURSE_SETTING_YOUDAO_JPK_COURSE_SUCCESS,
          function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
              t = (arguments.length > 1 ? arguments[1] : void 0).data,
              r = Boolean(null == t ? void 0 : t.id);
            return (
              r || o.message.error('请输入正确的精品课课程id'),
              i(i({}, e), {}, { youdaoJPKCourseInfo: null != t ? t : {}, isValidCourseId: r })
            );
          },
        ),
      );
    },
    385438: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = v(r(767550)),
        o = v(r(384164)),
        a = v(r(804496)),
        u = v(r(244484)),
        i = v(r(268121)),
        c = v(r(368782)),
        l = v(r(814144)),
        s = v(r(234687)),
        _ = v(r(441814)),
        p = v(r(314568)),
        f = v(r(859024)),
        T = v(r(244759)),
        d = v(r(487547)),
        E = v(r(425292)),
        S = v(r(577604)),
        m = v(r(36948)),
        y = v(r(642550)),
        O = v(r(150234)),
        C = v(r(541749));
      function v(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function I(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return b(e);
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
              if ('string' == typeof e) return b(e, t);
              var r = {}.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? b(e, t)
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
      function b(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      t.default = [].concat(
        I(o.default),
        I(u.default),
        I(l.default),
        I(s.default),
        I(T.default),
        I(f.default),
        I(p.default),
        I(c.default),
        I(_.default),
        I(d.default),
        I(E.default),
        I(i.default),
        I(S.default),
        I(m.default),
        I(y.default),
        I(O.default),
        I(a.default),
        I(n.default),
        I(C.default),
      );
    },
    444397: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          KEY_ERR_NEED_SCHOOL_LOGO: '学校logo头像不能为空！',
          KEY_ERR_NEED_SCHOOL_NAME_IMG: '学校全称图片不能为空！',
          KEY_ERR_NEED_SCHOOL_INDEX_IMG: '学校主页背景不能为空！',
          KEY_SCHOOL: '学校',
          KEY_SCHOOL_TIP: '这些信息会展示在学校页面',
          KEY_LABEL_SCHOOL_NAME: '学校名称',
          KEY_ERR_NEED_SCHOOL_NAME: '学校名称必填!',
          KEY_TIP_INPUT_SCHOOL_NAME: '输入学校名称',
          KEY_LABEL_SHCOOL_INTO: '学校简介',
          KEY_ERR_NEED_SCHOOL_INTO: '学校简介必填!',
          KEY_SCHOOL_INTO_TIP: '输入学简介信息，不超过400字',
          KEY_LABEL_SCHOOL_LOGO_IMG: '学校logo头像（建议大于150*150像素）',
          KEY_IMG_DEMO: '示意图',
          KEY_MODIFY_LOGO: '修改logo',
          KEY_LABEL_SCHOOL_NAME_IMG: '学校全称图片（建议大于220*80像素）',
          KEY_MODIFY_IMG: '修改图片',
          KEY_LABEL_SCHOOL_INDEX_BG: '学校主页背景（建议大于1280*200像素）',
          KEY_SAVE_TEMP: '保存为草稿',
          KEY_PUBLISH: '发布',
          KEY_LOGIN_SETTING: '登录页设置',
          KEY_LOGIN_PAGE_IMG_UPLOAD_TIP: '图片未上传或重置后，登录页将使用系统默认的背景图及logo',
          KEY_LABEL_BG_PREVIEW: '背景预览（建议大于349*131像素）',
          KEY_SWITCH_BG: '更换背景',
          KEY_LABEL_LOGIN_PAGE_LOGO: '登录页logo（建议大于300*100像素）',
          KEY_LOGO_URL: 'Logo链接',
          KEY_SAVE_LOGIN_PAGE_SETTING: '保存登录页设置',
          KEY_SAVE_SUCCESS: '保存成功！',
          KEY_PUBLISH_SUCCESS: '发布成功！',
          KEY_EDIT_IMAGE: '修改图片',
          KEY_UPLOAD_IMAGE_SIZE_TIP: '支持jpg、png或bmp格式的图片,需大于950*250像素，小于20M',
          KEY_COURSE_NAME: '课程名称',
          KEY_COURSE_CLASSIFY: '课程分类',
          KEY_IN_CHARGE_TEACHER: '负责老师',
          KEY_COURSE_TYPE: '课程类型',
          KEY_PUBLISH_VIDEO_NUM: '发布视频个数',
          KEY_PUBLISH_QUESTION_NUM: '发布试题个数',
          KEY_OPERATION: '操作',
          KEY_CHECK_COURSE: '查看课程',
          KEY_CREATE_CLASS: '创建课堂',
          KEY_SCHOOL_RESOURCE_PAGE_HEAD_TITLE:
            '这里有本校所有教学资源，您可以查看并且在您的课程/慕课堂教学中进行运用',
          KEY_BY_CREATOR: '按创建者',
          KEY_BY_COURSE_NAME: '按课程名称',
          KEY_INPUT_PLACEHOLDER: '请输入课程名称，创建者',
          KEY_TABLE_EMPTY_TEXT: '校内资源库暂时还没有内容',
          KEY_SPOC_COURSE_NAME: 'SPOC课程名',
          KEY_COURSE_MANAGER: '课程负责人',
          KEY_SEMESTER_START_END_TIME: '学期始末时间',
          KEY_SOURSE_COURSE: '源课程',
          KEY_SOURSE_COURSE_MANEGER: '源课程负责人',
          KEY_REFERENCE_TIME: '引用时间',
          KEY_COURSE_STATE: '课程状态',
          KEY_SYNCHRONIZE: '同步',
          KEY_ASYNCHRONOUS: '异步',
          KEY_TO_BE_DETERMINED: '待定',
          KEY_NOT_SET: '未设置',
          KEY_ACCOUNT_SOURCE: '账号来源',
          KEY_STUDENG_ID: '学号',
          KEY_NICKNAME: '昵称',
          KEY_NAME: '姓名',
          KEY_ID_6: '身份证后6位',
          KEY_CERTIFICATE_STATUS: '认证状态',
          KEY_NOT_CERTIFIED: '未认证',
          KEY_VERIFIED: '已认证',
          KEY_STUDENG_NAME: '学生名字',
          KEY_IMPORT_FILE: '导入文件',
          KEY_INPORT_ALL_SUCCESS: '恭喜，成功导入全部',
          KEY_STUDENT_INFO: '条学生信息',
          KEY_AMONG_THEM: '（其中',
          KEY_UPDATE_INFO: '条更新原有信息）',
          KEY_IMPORT_ALL_INFO_FAIL: '全部信息导入失败，未导入任何数据，请检查文档后重试。',
          KEY_SUCCESS_INPORT: '成功导入',
          KEY_FAIL: '失败',
          KEY_PIECE: '条。',
          KEY_DOWNLOAD_FAIL_DATA_TABLE:
            '请下载失败数据表，根据表格中的错误原因进行修改。修改后可再次导入。',
        }));
    },
    436801: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          KEY_ERR_NEED_SCHOOL_LOGO: 'school logo avatar cannot be empty！',
          KEY_ERR_NEED_SCHOOL_NAME_IMG: "Picture of the school's full name cannot be empty！",
          KEY_ERR_NEED_SCHOOL_INDEX_IMG: 'school homepage background cannot be empty！',
          KEY_SCHOOL: 'School',
          KEY_SCHOOL_TIP: 'This information will be displayed on the school page',
          KEY_LABEL_SCHOOL_NAME: 'School name',
          KEY_ERR_NEED_SCHOOL_NAME: 'school name cannot be empty！',
          KEY_TIP_INPUT_SCHOOL_NAME: 'enter school Name',
          KEY_LABEL_SHCOOL_INTO: 'School profile',
          KEY_ERR_NEED_SCHOOL_INTO: 'School profile is required!',
          KEY_SCHOOL_INTO_TIP: 'Please enter the school profile in no more than 400 words',
          KEY_LABEL_SCHOOL_LOGO_IMG: 'School logo (recommended to be larger than 150*150 pixels)',
          KEY_IMG_DEMO: 'demo',
          KEY_MODIFY_LOGO: 'Modify logo',
          KEY_LABEL_SCHOOL_NAME_IMG:
            'Picture of the school’s full name(recommended to be larger than 220 * 80 pixels)',
          KEY_MODIFY_IMG: 'Edit picture',
          KEY_LABEL_SCHOOL_INDEX_BG:
            'School homepage background (recommended to be larger than 1280*200 pixels)',
          KEY_SAVE_TEMP: 'Save as draft',
          KEY_PUBLISH: 'Publish',
          KEY_LOGIN_SETTING: 'login page setting',
          KEY_LOGIN_PAGE_IMG_UPLOAD_TIP:
            'When custom image is not uploaded or reset, the login page will use the system default background image and logo',
          KEY_LABEL_BG_PREVIEW:
            'background preview（recommended to be larger than 349*131 pixels）',
          KEY_SWITCH_BG: 'change background',
          KEY_LABEL_LOGIN_PAGE_LOGO:
            'login page logo（recommended to be larger than 300*100 pixels）',
          KEY_LOGO_URL: 'Logo link',
          KEY_SAVE_LOGIN_PAGE_SETTING: 'Save login page settings',
          KEY_SAVE_SUCCESS: 'Saved successfully.',
          KEY_PUBLISH_SUCCESS: 'Released successfully.',
          KEY_UPLOAD_IMAGE_SIZE_TIP:
            'Support pictures in jpg, png or bmp format, which must be larger than 950*250 pixels and smaller than 20M',
          KEY_COURSE_NAME: 'Course title',
          KEY_COURSE_CLASSIFY: 'Class catogory',
          KEY_IN_CHARGE_TEACHER: 'Teacher in charge',
          KEY_COURSE_TYPE: 'Course type',
          KEY_PUBLISH_VIDEO_NUM: 'Number of videos published',
          KEY_PUBLISH_QUESTION_NUM: 'Number of test questions posted',
          KEY_OPERATION: 'Operation',
          KEY_CHECK_COURSE: 'view course',
          KEY_CREATE_CLASS: 'Create a classroom',
          KEY_SCHOOL_RESOURCE_PAGE_HEAD_TITLE:
            'Here are all the teaching resources of our school. You can view and use them in your course/MOOC classroom teaching',
          KEY_BY_CREATOR: 'by creator',
          KEY_BY_COURSE_NAME: 'by course name',
          KEY_INPUT_PLACEHOLDER: 'Please enter the course name and creator.',
          KEY_TABLE_EMPTY_TEXT: 'The school resource library has no content yet.',
          KEY_SPOC_COURSE_NAME: 'SPOC course name',
          KEY_COURSE_MANAGER: 'Course manager',
          KEY_SEMESTER_START_END_TIME: 'Beginning and ending time of semester',
          KEY_SOURSE_COURSE: 'Source course',
          KEY_SOURSE_COURSE_MANEGER: 'Source course manager',
          KEY_REFERENCE_TIME: 'Reference time',
          KEY_COURSE_STATE: 'Course status',
          KEY_SYNCHRONIZE: 'synchronous',
          KEY_ASYNCHRONOUS: 'asynchronous',
          KEY_TO_BE_DETERMINED: 'To be determined',
          KEY_NOT_SET: 'Not set',
          KEY_ACCOUNT_SOURCE: 'Account source',
          KEY_STUDENG_ID: 'Student ID',
          KEY_NICKNAME: 'Nickname',
          KEY_NAME: 'Name',
          KEY_ID_6: 'The last 6 digits of the ID card',
          KEY_CERTIFICATE_STATUS: 'Verification status',
          KEY_NOT_CERTIFIED: 'Not verified',
          KEY_VERIFIED: 'Verified',
          KEY_STUDENG_NAME: 'Student name',
          KEY_IMPORT_FILE: 'Import file',
          KEY_INPORT_ALL_SUCCESS: 'Congratulations, all import success.',
          KEY_STUDENT_INFO: ' pieces of student Information',
          KEY_AMONG_THEM: '(Among them ',
          KEY_UPDATE_INFO: ' pieces with updates to original information.)',
          KEY_IMPORT_ALL_INFO_FAIL:
            'Failed to import all information. No data was imported. Please check the document and try again.',
          KEY_SUCCESS_INPORT: 'Successfully imported ',
          KEY_FAIL: 'failure',
          KEY_PIECE: ' pieces.',
          KEY_DOWNLOAD_FAIL_DATA_TABLE:
            'Please download the failed data sheet and modify it according to the reasons for the error in the table. You can import it again after modification.',
        }));
    },
    285423: (e, t) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          KEY_ERR_NEED_SCHOOL_LOGO: '学校のロゴを設定してください！',
          KEY_ERR_NEED_SCHOOL_NAME_IMG: '学校のフルネーム写真を設定してください！',
          KEY_ERR_NEED_SCHOOL_INDEX_IMG: '学校ホームページの背景を設定してください！',
          KEY_SCHOOL: '学校',
          KEY_SCHOOL_TIP: 'こちらの情報は学校のページに表示されます',
          KEY_LABEL_SCHOOL_NAME: '学校名',
          KEY_ERR_NEED_SCHOOL_NAME: '学校名は必ず入力してください!',
          KEY_TIP_INPUT_SCHOOL_NAME: '学校名を入力する',
          KEY_LABEL_SHCOOL_INTO: '学校の概要',
          KEY_ERR_NEED_SCHOOL_INTO: '学校の概要は必ず入力してください!',
          KEY_SCHOOL_INTO_TIP: '学校の概要を入力してください，400字を超えてはいけません',
          KEY_LABEL_SCHOOL_LOGO_IMG: '学校のロゴの写真（150 × 150ピクセル以上を推奨）',
          KEY_IMG_DEMO: '模式図',
          KEY_MODIFY_LOGO: 'ロゴを修正する',
          KEY_LABEL_SCHOOL_NAME_IMG: '学校のフルネーム写真(220 × 80ピクセル以上を推奨)',
          KEY_MODIFY_IMG: '画像修正',
          KEY_LABEL_SCHOOL_INDEX_BG: '学校ホームページの背景(1280 × 200ピクセル以上を推奨)',
          KEY_SAVE_TEMP: '下書きとして保存する',
          KEY_PUBLISH: '発表する',
          KEY_LOGIN_SETTING: 'ログインページの設定',
          KEY_LOGIN_PAGE_IMG_UPLOAD_TIP:
            '画像がアップロードされなかったりリセットされたりした場合、ログインページはシステムのデフォルト背景画像とロゴを使用します',
          KEY_LABEL_BG_PREVIEW: '背景プレビュー(349*131ピクセルより大きいピクセルを推奨)',
          KEY_SWITCH_BG: '背景を変更する',
          KEY_LABEL_LOGIN_PAGE_LOGO: 'ログインページのロゴ(300 × 100ピクセル以上を推奨)',
          KEY_LOGO_URL: 'ロゴリンク',
          KEY_SAVE_LOGIN_PAGE_SETTING: 'ログインページの設定を保存します',
          KEY_SAVE_SUCCESS: '保存に成功しました！',
          KEY_PUBLISH_SUCCESS: '公開に成功しました！',
          KEY_EDIT_IMAGE: '画像を修正する',
          KEY_UPLOAD_IMAGE_SIZE_TIP:
            'jpg、pngまたはbmpフォーマットをサポートしています、写真は950*250ピクセル以上で、20M以下でなければなりません。',
          KEY_COURSE_NAME: 'カリキュラム名',
          KEY_COURSE_CLASSIFY: 'カリキュラム分類',
          KEY_IN_CHARGE_TEACHER: '担当先生',
          KEY_COURSE_TYPE: 'カリキュラムの種類',
          KEY_PUBLISH_VIDEO_NUM: '動画の個数を発表します',
          KEY_PUBLISH_QUESTION_NUM: '試験問題の個数を発表します',
          KEY_OPERATION: '操作',
          KEY_CHECK_COURSE: 'カリキュラムを見る',
          KEY_CREATE_CLASS: '教室を作る',
          KEY_SCHOOL_RESOURCE_PAGE_HEAD_TITLE:
            'ここに本校のすべての教育資源があって、あなたはそれにあなたのカリキュラム/ミュークラスの授業の中で運用することができます',
          KEY_BY_CREATOR: '設立者によって',
          KEY_BY_COURSE_NAME: 'カリキュラム名によって',
          KEY_INPUT_PLACEHOLDER: 'カリキュラム名、作成者を入力してください',
          KEY_TABLE_EMPTY_TEXT: '学内の資源バンクにはまだ内容がありません',
          KEY_SPOC_COURSE_NAME: 'SPOCカリキュラム名',
          KEY_COURSE_MANAGER: 'カリキュラム担当者',
          KEY_SEMESTER_START_END_TIME: '学期の開始と終了の時間',
          KEY_SOURSE_COURSE: '元カリキュラム',
          KEY_SOURSE_COURSE_MANEGER: '元カリキュラム担当者',
          KEY_REFERENCE_TIME: '時間を引用する',
          KEY_COURSE_STATE: 'カリキュラム状態',
          KEY_SYNCHRONIZE: 'シンクロ',
          KEY_ASYNCHRONOUS: '異常',
          KEY_TO_BE_DETERMINED: '未定',
          KEY_NOT_SET: '未設定',
          KEY_ACCOUNT_SOURCE: 'アカウント',
          KEY_STUDENG_ID: '学生番号',
          KEY_NICKNAME: 'アイコン',
          KEY_NAME: '名前',
          KEY_ID_6: '住民番号の下６桁',
          KEY_CERTIFICATE_STATUS: '認証状態',
          KEY_NOT_CERTIFIED: '未認証',
          KEY_VERIFIED: '認証済み',
          KEY_STUDENG_NAME: '学生名前',
          KEY_IMPORT_FILE: 'ファイルを導入する',
          KEY_INPORT_ALL_SUCCESS: 'おめでとうございます、全て導入に成功しました',
          KEY_STUDENT_INFO: '学生情報',
          KEY_AMONG_THEM: '（そのうち',
          KEY_UPDATE_INFO: '元の情報を更新する）',
          KEY_IMPORT_ALL_INFO_FAIL:
            'すべての情報のインポートに失敗しました。データが導入されていません。ドキュメントを確認してからやり直してください。',
          KEY_SUCCESS_INPORT: '導入に成功しました',
          KEY_FAIL: '失敗しました',
          KEY_PIECE: '条。',
          KEY_DOWNLOAD_FAIL_DATA_TABLE:
            '失敗データシートをダウンロードし、エラーの原因に応じて修正してください。修正して再度導入することができます。',
        }));
    },
    891482: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function () {
          var e = (0, n.getLocal)();
          return 'en' === e ? o.default : 'ja' === e ? u.default : a.default;
        }));
      var n = r(935852),
        o = i(r(436801)),
        a = i(r(444397)),
        u = i(r(285423));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    918725: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(82960),
        o = I(r(755749)),
        a = I(r(739503)),
        u = I(r(111491)),
        i = I(r(305231)),
        c = I(r(623728)),
        l = I(r(978453)),
        s = I(r(852653)),
        _ = I(r(931051)),
        p = I(r(703763)),
        f = I(r(336674)),
        T = I(r(662979)),
        d = I(r(411690)),
        E = I(r(907158)),
        S = I(r(763847)),
        m = I(r(296015)),
        y = I(r(101427)),
        O = I(r(798113)),
        C = I(r(25341)),
        v = I(r(670548));
      function I(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = (0, n.combineReducers)({
        learnStatistics: a.default,
        scoreManage: i.default,
        overview: _.default,
        course: l.default,
        mkt: s.default,
        dataCenter: p.default,
        schoolInfo: f.default,
        offlineClassTask: d.default,
        offlineClassExtraHomeworkStat: T.default,
        stuMgr: E.default,
        teacherMgr: S.default,
        coRef: c.default,
        communitySetting: m.default,
        convertSetting: y.default,
        courseSetting: O.default,
        learnPageGuide: C.default,
        openSource: u.default,
        sys: { errType: 0, msg: '' },
        addFromRes: o.default,
        onlineCourse: v.default,
      });
    },
    320551: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function () {
          var e,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = arguments.length > 1 ? arguments[1] : void 0,
            c = r.doc,
            l = void 0 === c ? null : c,
            s = r.g,
            _ = void 0 === s ? null : s,
            p = {
              dispatch: null,
              bindAction: function (e) {
                return (0, n.bindActionCreators)(e, p.dispatch);
              },
            },
            f = (0, o.createEpicMiddleware)({
              dependencies: {
                fetch: (0, u.fetch)({
                  doc: l,
                  errorCallBack: function (e) {
                    i.error.s$.next(e);
                  },
                }),
                g: _,
                bridge: p,
              },
            }),
            T = [f];
          e = n.applyMiddleware.apply(void 0, T);
          var d = (0, n.createStore)(a.rootReducer, t, e);
          return ((p.dispatch = d.dispatch), f.run(a.rootEpic), d);
        }));
      var n = r(82960),
        o = r(48816),
        a = r(447234),
        u = (r(79448), r(216073), r(508330), r(601884)),
        i = r(297691);
    },
    447234: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.rootReducer = t.rootEpic = void 0));
      var n,
        o,
        a = r(82960),
        u = r(48816),
        i = p(r(138525)),
        c = (p(r(394979)), p(r(328929))),
        l = (p(r(918725)), p(r(62387))),
        s = p(r(859667)),
        _ = p(r(690592));
      function p(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function f(e) {
        return (
          (f =
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
          f(e)
        );
      }
      function T(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      function d(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != f(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != f(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == f(t) ? t : t + '';
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
      ((n = c.default),
        (t.rootReducer = (0, a.combineReducers)(
          d(d({ sys: i.default, common: s.default }, 'main', n), 'kaoyan', l.default),
        )),
        (t.rootEpic = u.combineEpics.apply(
          void 0,
          (function (e) {
            if (Array.isArray(e)) return T(e);
          })((o = _.default)) ||
            (function (e) {
              if (
                ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e['@@iterator']
              )
                return Array.from(e);
            })(o) ||
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
            })(o) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
              );
            })(),
        )));
    },
  },
]);
