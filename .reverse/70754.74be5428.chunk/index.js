'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [70754],
  {
    470754: (e, t, o) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.sliceStrByMax =
          t.isSpoc =
          t.isQuiz =
          t.formateImagePrefix =
          t.VIDEO_TYPE =
          t.TAG_FLAG =
          t.STUDY_MODE =
          t.SCORE_PUB_STATUS_CONFIRMED =
          t.QUIZ_TYPE =
          t.OJ_TYPE =
          t.MODE_TYPE =
          t.LearnModeTitle =
          t.LESSON_UNIT_CONTENT_TYPE_NAME =
          t.LESSON_UNIT_CONTENT_TYPE =
          t.LEARN_MODE_LIST =
          t.JUDGE_TYPE_LECTOR =
          t.JUDGE_TYPE_EVALUATE =
          t.ILearnMode =
          t.HOMEWEORK_TYPE =
          t.EXAM_TYPE =
          t.EMPHASIS_QUESTION_TYPE_NAME =
          t.EMPHASIS_QUESTION_TYPE =
          t.COURSE_UNIT_CONTENT_TYPE_NAME =
          t.COURSE_UNIT_CONTENT_TYPE =
          t.CHPATER_CONTENT_TYPE =
            void 0));
      var E,
        r = o(767853);
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
      function n(e, t, o) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != i(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var o = t.call(e, 'string');
                if ('object' != i(o)) return o;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == i(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = o),
          e
        );
      }
      t.CHPATER_CONTENT_TYPE = { NORMAL: 1, EXAM: 2, SMART_EXAM: 3 };
      var C = (t.LESSON_UNIT_CONTENT_TYPE = {
          VIDEO: 1,
          VIDEO_SRT: 2,
          PDF: 3,
          TEXT: 4,
          QUESTION: 5,
          DISCUSS: 6,
          LIVE: 7,
          COLUMN_CONTENT: 8,
          RELATED_LIVE: 9,
          MUSIC_VIDEO: 10,
          MUSIC_EXERCISE: 11,
          MUSIC_HOMEWORK: 12,
        }),
        T =
          ((t.LESSON_UNIT_CONTENT_TYPE_NAME =
            (n(
              n(
                n(
                  n(
                    n(
                      n(
                        n(
                          n(n(n((E = {}), C.VIDEO, '视频'), C.PDF, 'PDF'), C.TEXT, '文本'),
                          C.QUESTION,
                          '测验',
                        ),
                        C.DISCUSS,
                        '讨论',
                      ),
                      C.LIVE,
                      '直播',
                    ),
                    C.COLUMN_CONTENT,
                    '图文',
                  ),
                  C.RELATED_LIVE,
                  '直播',
                ),
                C.MUSIC_VIDEO,
                '音乐视频',
              ),
              C.MUSIC_EXERCISE,
              '音乐练习',
            ),
            n(E, C.MUSIC_HOMEWORK, '音乐作业'))),
          (t.isQuiz = function (e) {
            return 2 == e || 6 == e;
          }),
          (t.OJ_TYPE = 7),
          (t.HOMEWEORK_TYPE = 3),
          (t.QUIZ_TYPE = 2),
          (t.EXAM_TYPE = 0),
          (t.JUDGE_TYPE_EVALUATE = 1),
          (t.JUDGE_TYPE_LECTOR = 2),
          (t.SCORE_PUB_STATUS_CONFIRMED = 2),
          (t.MODE_TYPE = {
            MODE_MOOC: 0,
            MODE_SPOC_SYNC: 10,
            MODE_SPOC_ASYNC: 15,
            MODE_SPOC_ONLY: 20,
            CHANNEL_ZJMOOC: 2,
            CHANNEL_OOC: 3,
          })),
        s =
          ((t.isSpoc = function (e) {
            return e == T.MODE_SPOC_SYNC;
          }),
          (t.TAG_FLAG = { YES: 1, NO: 0 }),
          (t.sliceStrByMax = function (e, t) {
            return e ? (e.length > t ? ''.concat(e.slice(0, t), '...') : e) : '';
          }),
          (t.formateImagePrefix = function (e) {
            if (e)
              return e
                .replace(/img[0-9].ph.126.net/g, 'img-ph-mirror.nosdn.127.net')
                .replace('nos.netease.com/edu-image', 'edu-image.nosdn.127.net');
          }),
          (t.VIDEO_TYPE = (function (e) {
            return ((e.NORMAL = 'NORMAL'), (e.SUMMARY = 'SUMMARY'), e);
          })({})),
          (t.STUDY_MODE = (function (e) {
            return ((e.TERM = 'TERM'), (e.EFFICIENT = 'EFFICIENT'), e);
          })({})),
          (t.COURSE_UNIT_CONTENT_TYPE = (function (e) {
            return (
              (e[(e.VIDEO = 1)] = 'VIDEO'),
              (e[(e.PDF = 3)] = 'PDF'),
              (e[(e.TEXT = 4)] = 'TEXT'),
              (e[(e.QUESTION = 5)] = 'QUESTION'),
              (e[(e.DISCUSS = 6)] = 'DISCUSS'),
              (e[(e.LIVE = 7)] = 'LIVE'),
              (e[(e.OTHER = 8)] = 'OTHER'),
              e
            );
          })({}))),
        _ =
          ((t.COURSE_UNIT_CONTENT_TYPE_NAME = n(
            n(
              n(
                n(
                  n(n(n({}, s.VIDEO, '视频'), s.PDF, '文档'), s.TEXT, '富文本'),
                  s.QUESTION,
                  '测验',
                ),
                s.DISCUSS,
                '讨论',
              ),
              s.LIVE,
              '直播/回放',
            ),
            s.OTHER,
            '文章/音频',
          )),
          (t.EMPHASIS_QUESTION_TYPE = (function (e) {
            return (
              (e.COMPLETION = 'COMPLETION'),
              (e.JUDGE = 'JUDGE'),
              (e.MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'),
              (e.SINGLE_CHOICE = 'SINGLE_CHOICE'),
              (e.SUBJECTIVE = 'SUBJECTIVE'),
              e
            );
          })({}))),
        c =
          ((t.EMPHASIS_QUESTION_TYPE_NAME = n(
            n(
              n(n(n({}, _.COMPLETION, '填空'), _.JUDGE, '判断'), _.MULTIPLE_CHOICE, '多选'),
              _.SINGLE_CHOICE,
              '单选',
            ),
            _.SUBJECTIVE,
            '简答',
          )),
          (t.ILearnMode = (function (e) {
            return (
              (e[(e.FREE = 0)] = 'FREE'),
              (e[(e.CERTIFIED = 100)] = 'CERTIFIED'),
              (e[(e.EFFICIENT_TERM = 200)] = 'EFFICIENT_TERM'),
              (e[(e.WHEREVER = 300)] = 'WHEREVER'),
              e
            );
          })({}))),
        d = (t.LearnModeTitle = n(
          n(
            n(n({}, c.FREE, '学期学习模式'), c.CERTIFIED, '认证学习模式'),
            c.EFFICIENT_TERM,
            '学期学习模式 (新版)',
          ),
          c.WHEREVER,
          '随到随学模式',
        ));
      t.LEARN_MODE_LIST = [
        {
          learnMode: c.CERTIFIED,
          title: d[c.CERTIFIED],
          icon: r.CERTIFIED_BTN,
          description: '认证学一次开通，可跟随老师安排学习完整课程内容、认证成绩及认证证书习模式',
        },
        {
          learnMode: c.EFFICIENT_TERM,
          title: d[c.EFFICIENT_TERM],
          icon: r.CERTIFIED_BTN,
          description: '享受期末考试课程全免费和AI助力高效学习',
        },
      ];
    },
    767853: (e, t, o) => {
      var E, r;
      function i(e, t, o, E) {
        r ||
          (r = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var i = e && e.defaultProps,
          n = arguments.length - 3;
        if ((t || 0 === n || (t = { children: void 0 }), 1 === n)) t.children = E;
        else if (n > 1) {
          for (var C = Array(n), T = 0; T < n; T++) C[T] = arguments[T + 3];
          t.children = C;
        }
        if (t && i) for (var s in i) void 0 === t[s] && (t[s] = i[s]);
        else t || (t = i || {});
        return {
          $$typeof: r,
          type: e,
          key: void 0 === o ? null : '' + o,
          ref: null,
          props: t,
          _owner: null,
        };
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.WHEREVER_BTN =
          t.USELESS_ICON =
          t.USEFUL_ICON =
          t.SWITCH_MODE =
          t.SHARE_SVG =
          t.REMIND_SVG =
          t.HELP_SVG =
          t.EFFICIENT_BTN =
          t.CERTIFIED_BTN =
            void 0),
        (E = o(296540)) && E.__esModule,
        (t.CERTIFIED_BTN = i(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
          },
          void 0,
          i('path', {
            d: 'M12 18H4.5C3.11929 18 2 16.8807 2 15.5V5.5C2 4.11929 3.11929 3 4.5 3H19.5C20.8807 3 22 4.11929 22 5.5V15.5C22 16.8807 20.8807 18 19.5 18H17.5',
            stroke: '#212121',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M6 7H18',
            stroke: '#212121',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M6 10.5H9',
            stroke: '#212121',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M6 14H8',
            stroke: '#212121',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M15 16.5C16.6568 16.5 18 15.1568 18 13.5C18 11.8432 16.6568 10.5 15 10.5C13.3432 10.5 12 11.8432 12 13.5C12 15.1568 13.3432 16.5 15 16.5Z',
            stroke: '#212121',
            strokeWidth: '2',
          }),
          i('path', {
            d: 'M15 20.0002L17 21.0002V15.7363C17 15.7363 16.4297 16.5002 15 16.5002C13.5703 16.5002 13 15.7502 13 15.7502V21.0002L15 20.0002Z',
            stroke: '#212121',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
        )),
        (t.SWITCH_MODE = i(
          'svg',
          {
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          void 0,
          i('path', {
            d: 'M21 9.5H3',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M15 3.5L21 9.5',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M3.39941 14.5H21.3994',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M3.39941 14.5L9.39944 20.5',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
        )),
        (t.HELP_SVG = i(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
          },
          void 0,
          i('path', {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            d: 'M3.75 11.99C3.75 7.43364 7.44365 3.73999 12 3.73999C16.5563 3.73999 20.25 7.43364 20.25 11.99C20.25 16.5463 16.5563 20.24 12 20.24C7.44365 20.24 3.75 16.5463 3.75 11.99ZM12 2.23999C6.61522 2.23999 2.25 6.60521 2.25 11.99C2.25 17.3748 6.61522 21.74 12 21.74C17.3848 21.74 21.75 17.3748 21.75 11.99C21.75 6.60521 17.3848 2.23999 12 2.23999ZM14.8213 8.75782C14.6865 8.4311 14.4812 8.1382 14.22 7.90004C13.6429 7.40517 12.8995 7.14784 12.14 7.18004C11.7228 7.15642 11.3052 7.21683 10.9118 7.35769C10.5184 7.49855 10.1574 7.71698 9.85001 8.00004C9.55564 8.30078 9.32783 8.66008 9.18139 9.05461C9.03495 9.44914 8.97315 9.87007 9.00001 10.29H10.49C10.4628 9.83615 10.5782 9.3851 10.82 9.00004C10.9677 8.81037 11.1631 8.66324 11.3862 8.57365C11.6093 8.48406 11.8521 8.45521 12.09 8.49004C12.2791 8.4684 12.4707 8.48922 12.6508 8.55098C12.8308 8.61274 12.9948 8.71388 13.1309 8.84704C13.2669 8.9802 13.3715 9.14202 13.4371 9.32072C13.5027 9.49942 13.5276 9.6905 13.51 9.88004C13.5047 10.2243 13.3811 10.5562 13.16 10.82L13 11C12.3828 11.4792 11.849 12.057 11.42 12.71C11.2332 13.1136 11.1441 13.5556 11.16 14V14.1H12.66V13.92C12.6575 13.6216 12.726 13.3268 12.86 13.06C12.9882 12.8108 13.165 12.5898 13.38 12.41C14.01 11.89 14.39 11.54 14.51 11.41C14.8495 10.9398 15.0219 10.3696 15 9.79004C15.0172 9.43701 14.9562 9.08454 14.8213 8.75782ZM12.8626 15.3872C12.8109 15.2644 12.7353 15.1532 12.64 15.06C12.5438 14.9698 12.4306 14.8994 12.307 14.8531C12.1834 14.8067 12.0519 14.7853 11.92 14.79C11.7874 14.7866 11.6555 14.8096 11.5319 14.8577C11.4083 14.9058 11.2955 14.978 11.2 15.07C11.1029 15.1601 11.0267 15.2704 10.9766 15.393C10.9265 15.5156 10.9038 15.6477 10.91 15.78C10.9044 15.9123 10.9275 16.0442 10.9775 16.1667C11.0275 16.2892 11.1034 16.3995 11.2 16.49C11.3948 16.6736 11.6524 16.7758 11.92 16.7758C12.1877 16.7758 12.4452 16.6736 12.64 16.49C12.7353 16.3969 12.8109 16.2857 12.8626 16.1629C12.9143 16.0401 12.9409 15.9082 12.9409 15.775C12.9409 15.6418 12.9143 15.51 12.8626 15.3872Z',
            fill: '#333333',
          }),
        )),
        (t.REMIND_SVG = i(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            id: '图层_1',
            x: '0px',
            y: '0px',
            viewBox: '0 0 24 24',
            xmlSpace: 'preserve',
          },
          void 0,
          i(
            'g',
            {},
            void 0,
            i('ellipse', { cx: '7.6', cy: '9.1', rx: '1.1', ry: '1.1' }),
            i('ellipse', { cx: '12.1', cy: '9.1', rx: '1.1', ry: '1.1' }),
            i('path', {
              d: 'M21.8,18.1c0.3-0.7,0.5-1.5,0.5-2.3c0-2.2-1.2-4.2-3-5.2c-0.2-4.6-4.1-8.3-8.7-8.3c-4.8,0-8.8,3.9-8.8,8.8   c0,2.1,0.7,4.1,2.1,5.6l-0.5,3.3c0,0.3,0.1,0.5,0.3,0.7c0.1,0.1,0.3,0.2,0.5,0.2c0.1,0,0.2,0,0.3-0.1l3.3-1.4   c1.4,0.4,2.8,0.6,4.1,0.4c1.1,1.3,2.7,2.1,4.5,2.1c1.1,0,2.2-0.3,3.2-0.9l1.7,0.9c0.1,0.1,0.2,0.1,0.3,0.1c0.2,0,0.3,0,0.4-0.1   c0.2-0.2,0.3-0.4,0.3-0.7L21.8,18.1z M7.8,17.8c-0.2-0.1-0.4,0-0.5,0l-2.3,1l0.4-2.3c0-0.2,0-0.5-0.2-0.6c-1.2-1.3-1.9-3.1-1.9-4.9   c0-4,3.3-7.2,7.2-7.2c3.6,0,6.6,2.7,7.2,6.2c-0.5-0.1-0.9-0.2-1.4-0.2c-3.3,0-6,2.7-6,6c0,0.9,0.2,1.7,0.6,2.5   C9.8,18.3,8.8,18.1,7.8,17.8z M19.7,19.3C19.7,19.3,19.6,19.3,19.7,19.3c-0.2,0-0.2-0.1-0.3-0.1c0,0-0.1,0-0.1,0   c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0.1c0,0-0.1,0-0.1,0c-0.8,0.6-1.7,0.9-2.7,0.9c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5   s4.5,2,4.5,4.5c0,0.7-0.1,1.3-0.4,1.9c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0.1l0.3,1.6L19.7,19.3z',
            }),
            i('path', {
              d: 'M17.8,13.7c-0.5,0-0.8,0.4-0.8,0.8c0,0.5,0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8C18.7,14.1,18.3,13.7,17.8,13.7z',
            }),
            i('path', {
              d: 'M14.5,13.7c-0.5,0-0.8,0.4-0.8,0.8c0,0.5,0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8C15.3,14.1,14.9,13.7,14.5,13.7z',
            }),
          ),
        )),
        (t.SHARE_SVG = i(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24' },
          void 0,
          i(
            'g',
            { clipPath: 'url(#clip0_4353_2079)' },
            void 0,
            i('path', {
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              d: 'M16.941 2.86101C16.6485 2.56772 16.1737 2.56708 15.8804 2.85958C15.5871 3.15208 15.5865 3.62695 15.879 3.92024L18.3128 6.36063H12.94C11.4972 6.36063 10.1135 6.93377 9.09334 7.95396C8.07314 8.97416 7.5 10.3578 7.5 11.8006V16.1106C7.5 16.5248 7.83579 16.8606 8.25 16.8606C8.66421 16.8606 9 16.5248 9 16.1106V11.8006C9 10.7557 9.41511 9.75352 10.154 9.01462C10.8929 8.27573 11.895 7.86063 12.94 7.86063H20.12C20.4232 7.86063 20.6965 7.67811 20.8127 7.3981C20.9289 7.1181 20.8651 6.79567 20.651 6.58101L16.941 2.86101ZM4.90901 6.51838C5.33097 6.09643 5.90326 5.85938 6.5 5.85938H7.12C7.53421 5.85938 7.87 5.52359 7.87 5.10938C7.87 4.69516 7.53421 4.35938 7.12 4.35938H6.5C5.50544 4.35938 4.55161 4.75446 3.84835 5.45772C3.14509 6.16099 2.75 7.11481 2.75 8.10937V17.6094C2.75 18.6039 3.14509 19.5578 3.84835 20.261C4.55161 20.9643 5.50544 21.3594 6.5 21.3594H17.5C18.4946 21.3594 19.4484 20.9643 20.1517 20.261C20.8549 19.5578 21.25 18.6039 21.25 17.6094V11.1094C21.25 10.6952 20.9142 10.3594 20.5 10.3594C20.0858 10.3594 19.75 10.6952 19.75 11.1094V17.6094C19.75 18.2061 19.5129 18.7784 19.091 19.2004C18.669 19.6223 18.0967 19.8594 17.5 19.8594H6.5C5.90326 19.8594 5.33097 19.6223 4.90901 19.2004C4.48705 18.7784 4.25 18.2061 4.25 17.6094V8.10937C4.25 7.51264 4.48705 6.94034 4.90901 6.51838Z',
              fill: '#333333',
            }),
          ),
          i(
            'defs',
            {},
            void 0,
            i(
              'clipPath',
              { id: 'clip0_4353_2079' },
              void 0,
              i('rect', { width: '24', height: '24', fill: 'white' }),
            ),
          ),
        )),
        (t.EFFICIENT_BTN = i(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
          },
          void 0,
          i('path', {
            d: 'M2.5 4.5C2.5 3.94771 2.94772 3.5 3.5 3.5H8C10.2092 3.5 12 5.29085 12 7.5V21C12 19.3432 10.6568 18 9 18H3.5C2.94772 18 2.5 17.5523 2.5 17V4.5Z',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '2',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M21.5 4.5C21.5 3.94771 21.0523 3.5 20.5 3.5H16C13.7908 3.5 12 5.29085 12 7.5V21C12 19.3432 13.3432 18 15 18H20.5C21.0523 18 21.5 17.5523 21.5 17V4.5Z',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '2',
            strokeLinejoin: 'round',
          }),
        )),
        (t.WHEREVER_BTN = i(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
          },
          void 0,
          i('path', {
            d: 'M3.5 3C2.67157 3 2 3.67157 2 4.5V19.5C2 20.3284 2.67157 21 3.5 21H13.5C14.3284 21 15 20.3284 15 19.5V4.5C15 3.67157 14.3284 3 13.5 3H3.5Z',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M6 21V3',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M22 3H18V19L20 21L22 19V3Z',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M18 6H22',
            stroke: 'black',
            strokeOpacity: '0.87',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
        )),
        (t.USEFUL_ICON = i(
          'svg',
          {
            width: '16',
            height: '16',
            viewBox: '0 0 16 16',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          void 0,
          i('path', {
            d: 'M9.20007 6.20001V3.80001C9.20007 2.80589 8.3942 2 7.40007 2L5.00007 7.40001V14H11.9721C12.5704 14.0068 13.0824 13.5716 13.1721 12.98L14.0001 7.58001C14.0529 7.23191 13.9502 6.87818 13.7192 6.61251C13.4882 6.34684 13.1521 6.19601 12.8001 6.20001H9.20007Z',
            stroke: 'white',
            strokeWidth: '1.5',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M5 7.3332H3.398C2.69511 7.32077 2.09423 7.903 2 8.59964V12.7996C2.09423 13.4963 2.69511 14.0121 3.398 13.9996H5V7.3332Z',
            stroke: 'white',
            strokeWidth: '1.5',
            strokeLinejoin: 'round',
          }),
        )),
        (t.USELESS_ICON = i(
          'svg',
          {
            width: '16',
            height: '16',
            viewBox: '0 0 16 16',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          void 0,
          i('path', {
            d: 'M6.7931 9.80007V12.2001C6.7931 13.1942 7.59897 14.0001 8.5931 14.0001L10.9931 8.60007V2.00008H4.0211C3.42273 1.99331 2.91081 2.42843 2.82109 3.02008L1.99309 8.42007C1.94026 8.76817 2.04295 9.1219 2.27397 9.38757C2.505 9.65324 2.84104 9.80407 3.19309 9.80007H6.7931Z',
            stroke: 'white',
            strokeWidth: '1.5',
            strokeLinejoin: 'round',
          }),
          i('path', {
            d: 'M10.9932 2.00022H12.5952C13.2981 1.98779 13.8989 2.50356 13.9932 3.20022V7.40023C13.8989 8.09686 13.2981 8.67933 12.5952 8.6669H10.9932V2.00022Z',
            stroke: 'white',
            strokeWidth: '1.5',
            strokeLinejoin: 'round',
          }),
        )));
    },
  },
]);
