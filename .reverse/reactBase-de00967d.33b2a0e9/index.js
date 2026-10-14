'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [67549],
  {
    341839: (e, t, n) => {
      n.d(t, { A: () => i, n: () => c });
      var l = n(58168),
        r = n(296540),
        a = n(837147);
      const o = n(340627).A,
        i = function (e) {
          var t = e.componentName,
            n = void 0 === t ? 'global' : t,
            i = e.defaultLocale,
            c = e.children,
            s = r.useContext(a.A);
          return c(
            r.useMemo(
              function () {
                var e,
                  t = i || o[n],
                  r = null !== (e = null == s ? void 0 : s[n]) && void 0 !== e ? e : {};
                return (0, l.A)((0, l.A)({}, t instanceof Function ? t() : t), r || {});
              },
              [n, i, s],
            ),
            r.useMemo(
              function () {
                var e = s && s.locale;
                return s && s.exist && !e ? o.locale : e;
              },
              [s],
            ),
            s,
          );
        };
      var c = function (e, t) {
        var n = r.useContext(a.A);
        return [
          r.useMemo(
            function () {
              var r,
                a = t || o[e],
                i = null !== (r = null == n ? void 0 : n[e]) && void 0 !== r ? r : {};
              return (0, l.A)((0, l.A)({}, 'function' == typeof a ? a() : a), i || {});
            },
            [e, t, n],
          ),
        ];
      };
    },
    837147: (e, t, n) => {
      n.d(t, { A: () => l });
      const l = (0, n(296540).createContext)(void 0);
    },
    479384: (e, t, n) => {
      n.d(t, { A: () => c, M: () => i });
      var l = n(58168),
        r = n(296540),
        a = n(321815),
        o = n(837147),
        i = 'internalMark';
      const c = function (e) {
        var t = e.locale,
          n = void 0 === t ? {} : t,
          i = e.children;
        (e._ANT_MARK__,
          r.useEffect(
            function () {
              return (
                (0, a.L)(n && n.Modal),
                function () {
                  (0, a.L)();
                }
              );
            },
            [n],
          ));
        var c = r.useMemo(
          function () {
            return (0, l.A)((0, l.A)({}, n), { exist: !0 });
          },
          [n],
        );
        return r.createElement(o.A.Provider, { value: c }, i);
      };
    },
    340627: (e, t, n) => {
      n.d(t, { A: () => c });
      var l = n(198680),
        r = n(124685),
        a = n(561340),
        o = n(165341),
        i = '${label} is not a valid ${type}';
      const c = {
        locale: 'en',
        Pagination: l.A,
        DatePicker: a.A,
        TimePicker: o.A,
        Calendar: r.A,
        global: { placeholder: 'Please select' },
        Table: {
          filterTitle: 'Filter menu',
          filterConfirm: 'OK',
          filterReset: 'Reset',
          filterEmptyText: 'No filters',
          filterCheckall: 'Select all items',
          filterSearchPlaceholder: 'Search in filters',
          emptyText: 'No data',
          selectAll: 'Select current page',
          selectInvert: 'Invert current page',
          selectNone: 'Clear all data',
          selectionAll: 'Select all data',
          sortTitle: 'Sort',
          expand: 'Expand row',
          collapse: 'Collapse row',
          triggerDesc: 'Click to sort descending',
          triggerAsc: 'Click to sort ascending',
          cancelSort: 'Click to cancel sorting',
        },
        Modal: { okText: 'OK', cancelText: 'Cancel', justOkText: 'OK' },
        Popconfirm: { okText: 'OK', cancelText: 'Cancel' },
        Transfer: {
          titles: ['', ''],
          searchPlaceholder: 'Search here',
          itemUnit: 'item',
          itemsUnit: 'items',
          remove: 'Remove',
          selectCurrent: 'Select current page',
          removeCurrent: 'Remove current page',
          selectAll: 'Select all data',
          removeAll: 'Remove all data',
          selectInvert: 'Invert current page',
        },
        Upload: {
          uploading: 'Uploading...',
          removeFile: 'Remove file',
          uploadError: 'Upload error',
          previewFile: 'Preview file',
          downloadFile: 'Download file',
        },
        Empty: { description: 'No data' },
        Icon: { icon: 'icon' },
        Text: { edit: 'Edit', copy: 'Copy', copied: 'Copied', expand: 'Expand' },
        PageHeader: { back: 'Back' },
        Form: {
          optional: '(optional)',
          defaultValidateMessages: {
            default: 'Field validation error for ${label}',
            required: 'Please enter ${label}',
            enum: '${label} must be one of [${enum}]',
            whitespace: '${label} cannot be a blank character',
            date: {
              format: '${label} date format is invalid',
              parse: '${label} cannot be converted to a date',
              invalid: '${label} is an invalid date',
            },
            types: {
              string: i,
              method: i,
              array: i,
              object: i,
              number: i,
              date: i,
              boolean: i,
              integer: i,
              float: i,
              regexp: i,
              email: i,
              url: i,
              hex: i,
            },
            string: {
              len: '${label} must be ${len} characters',
              min: '${label} must be at least ${min} characters',
              max: '${label} must be up to ${max} characters',
              range: '${label} must be between ${min}-${max} characters',
            },
            number: {
              len: '${label} must be equal to ${len}',
              min: '${label} must be minimum ${min}',
              max: '${label} must be maximum ${max}',
              range: '${label} must be between ${min}-${max}',
            },
            array: {
              len: 'Must be ${len} ${label}',
              min: 'At least ${min} ${label}',
              max: 'At most ${max} ${label}',
              range: 'The amount of ${label} must be between ${min}-${max}',
            },
            pattern: { mismatch: '${label} does not match the pattern ${pattern}' },
          },
        },
        Image: { preview: 'Preview' },
      };
    },
    108182: (e, t, n) => {
      (n.r(t), n.d(t, { default: () => l }));
      const l = n(340627).A;
    },
    33306: (e, t, n) => {
      (n.r(t), n.d(t, { default: () => c }));
      var l = n(63100),
        r = n(611881),
        a = n(59816),
        o = n(335833),
        i = '${label}は有効な${type}ではありません';
      const c = {
        locale: 'ja',
        Pagination: l.A,
        DatePicker: a.A,
        TimePicker: o.A,
        Calendar: r.A,
        Table: {
          filterTitle: 'フィルター',
          filterConfirm: 'OK',
          filterReset: 'リセット',
          filterEmptyText: 'フィルターなし',
          selectAll: 'ページ単位で選択',
          selectInvert: 'ページ単位で反転',
          selectionAll: 'すべてを選択',
          sortTitle: 'ソート',
          expand: '展開する',
          collapse: '折り畳む',
          triggerDesc: 'クリックで降順にソート',
          triggerAsc: 'クリックで昇順にソート',
          cancelSort: 'ソートをキャンセル',
        },
        Modal: { okText: 'OK', cancelText: 'キャンセル', justOkText: 'OK' },
        Popconfirm: { okText: 'OK', cancelText: 'キャンセル' },
        Transfer: {
          titles: ['', ''],
          searchPlaceholder: 'ここを検索',
          itemUnit: 'アイテム',
          itemsUnit: 'アイテム',
        },
        Upload: {
          uploading: 'アップロード中...',
          removeFile: 'ファイルを削除',
          uploadError: 'アップロードエラー',
          previewFile: 'ファイルをプレビュー',
          downloadFile: 'ダウンロードファイル',
        },
        Empty: { description: 'データがありません' },
        Form: {
          defaultValidateMessages: {
            default: '${label}のフィールド検証エラー',
            required: '${label}を入力してください',
            enum: '${label}は[${enum}]のいずれかである必要があります',
            whitespace: '${label}は空白文字にすることはできません',
            date: {
              format: '${label}の日付形式は不正です',
              parse: '${label}は日付に変換できません',
              invalid: '${label}は不正な日付です',
            },
            types: {
              string: i,
              method: i,
              array: i,
              object: i,
              number: i,
              date: i,
              boolean: i,
              integer: i,
              float: i,
              regexp: i,
              email: i,
              url: i,
              hex: i,
            },
            string: {
              len: '${label}は${len}文字である必要があります',
              min: '${label}は${min}文字以上である必要があります',
              max: '${label}は${max}文字以下である必要があります',
              range: '${label}は${min}-${max}文字の範囲である必要があります',
            },
            number: {
              len: '${label}は${len}と等しい必要があります',
              min: '${label}の最小値は${min}です',
              max: '${label}の最大値は${max}です',
              range: '${label}は${min}-${max}の範囲である必要があります',
            },
            array: {
              len: '${label}は${len}である必要があります',
              min: '${label}の最小は${min}です',
              max: '${label}の最大は${max}です',
              range: '${label}の合計は${min}-${max}の範囲である必要があります',
            },
            pattern: { mismatch: '${label}はパターン${pattern}と一致しません' },
          },
        },
      };
    },
    892156: (e, t, n) => {
      (n.r(t), n.d(t, { default: () => c }));
      var l = n(532394),
        r = n(349619),
        a = n(684830),
        o = n(958499),
        i = '${label}不是一个有效的${type}';
      const c = {
        locale: 'zh-cn',
        Pagination: l.A,
        DatePicker: a.A,
        TimePicker: o.A,
        Calendar: r.A,
        global: { placeholder: '请选择' },
        Table: {
          filterTitle: '筛选',
          filterConfirm: '确定',
          filterReset: '重置',
          filterEmptyText: '无筛选项',
          filterCheckall: '全选',
          filterSearchPlaceholder: '在筛选项中搜索',
          selectAll: '全选当页',
          selectInvert: '反选当页',
          selectNone: '清空所有',
          selectionAll: '全选所有',
          sortTitle: '排序',
          expand: '展开行',
          collapse: '关闭行',
          triggerDesc: '点击降序',
          triggerAsc: '点击升序',
          cancelSort: '取消排序',
        },
        Modal: { okText: '确定', cancelText: '取消', justOkText: '知道了' },
        Popconfirm: { cancelText: '取消', okText: '确定' },
        Transfer: {
          titles: ['', ''],
          searchPlaceholder: '请输入搜索内容',
          itemUnit: '项',
          itemsUnit: '项',
          remove: '删除',
          selectCurrent: '全选当页',
          removeCurrent: '删除当页',
          selectAll: '全选所有',
          removeAll: '删除全部',
          selectInvert: '反选当页',
        },
        Upload: {
          uploading: '文件上传中',
          removeFile: '删除文件',
          uploadError: '上传错误',
          previewFile: '预览文件',
          downloadFile: '下载文件',
        },
        Empty: { description: '暂无数据' },
        Icon: { icon: '图标' },
        Text: { edit: '编辑', copy: '复制', copied: '复制成功', expand: '展开' },
        PageHeader: { back: '返回' },
        Form: {
          optional: '（可选）',
          defaultValidateMessages: {
            default: '字段验证错误${label}',
            required: '请输入${label}',
            enum: '${label}必须是其中一个[${enum}]',
            whitespace: '${label}不能为空字符',
            date: {
              format: '${label}日期格式无效',
              parse: '${label}不能转换为日期',
              invalid: '${label}是一个无效日期',
            },
            types: {
              string: i,
              method: i,
              array: i,
              object: i,
              number: i,
              date: i,
              boolean: i,
              integer: i,
              float: i,
              regexp: i,
              email: i,
              url: i,
              hex: i,
            },
            string: {
              len: '${label}须为${len}个字符',
              min: '${label}最少${min}个字符',
              max: '${label}最多${max}个字符',
              range: '${label}须在${min}-${max}字符之间',
            },
            number: {
              len: '${label}必须等于${len}',
              min: '${label}最小值为${min}',
              max: '${label}最大值为${max}',
              range: '${label}须在${min}-${max}之间',
            },
            array: {
              len: '须为${len}个${label}',
              min: '最少${min}个${label}',
              max: '最多${max}个${label}',
              range: '${label}数量须在${min}-${max}之间',
            },
            pattern: { mismatch: '${label}与模式不匹配${pattern}' },
          },
        },
        Image: { preview: '预览' },
      };
    },
    776955: (e, t, n) => {
      n.d(t, { A: () => A });
      var l = n(58168),
        r = n(364467),
        a = n(205544),
        o = n(246942),
        i = n.n(o),
        c = n(198743),
        s = n(8719),
        u = n(296540),
        m = n(862279),
        p = n(935128),
        d = n(94241),
        f = n(900428),
        v = n(458182),
        b = c.A.Option;
      function x() {
        return !0;
      }
      var y = function (e, t) {
          var n = e.prefixCls,
            o = e.className,
            y = e.disabled,
            C = e.loading,
            A = e.filterOption,
            g = e.children,
            $ = e.notFoundContent,
            h = e.options,
            O = e.status,
            P = (function (e, t) {
              var n = {};
              for (var l in e)
                Object.prototype.hasOwnProperty.call(e, l) && t.indexOf(l) < 0 && (n[l] = e[l]);
              if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                var r = 0;
                for (l = Object.getOwnPropertySymbols(e); r < l.length; r++)
                  t.indexOf(l[r]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, l[r]) &&
                    (n[l[r]] = e[l[r]]);
              }
              return n;
            })(e, [
              'prefixCls',
              'className',
              'disabled',
              'loading',
              'filterOption',
              'children',
              'notFoundContent',
              'options',
              'status',
            ]),
            E = u.useState(!1),
            k = (0, a.A)(E, 2),
            T = k[0],
            w = k[1],
            N = u.useRef(),
            I = (0, s.K4)(t, N),
            j = u.useContext(m.QO),
            S = j.getPrefixCls,
            M = j.renderEmpty,
            F = j.direction,
            R = u.useContext(d.$W),
            D = R.status,
            U = R.hasFeedback,
            _ = R.feedbackIcon,
            K = (0, v.v)(D, O),
            L = C
              ? [
                  {
                    value: 'ANTD_SEARCHING',
                    disabled: !0,
                    label: u.createElement(f.A, { size: 'small' }),
                  },
                ]
              : h,
            z = S('mentions', n),
            q = i()(
              (0, r.A)(
                (0, r.A)((0, r.A)({}, ''.concat(z, '-disabled'), y), ''.concat(z, '-focused'), T),
                ''.concat(z, '-rtl'),
                'rtl' === F,
              ),
              (0, v.L)(z, K),
              !U && o,
            ),
            G = u.createElement(
              c.A,
              (0, l.A)(
                {
                  prefixCls: z,
                  notFoundContent: void 0 !== $ ? $ : (M || p.A)('Select'),
                  className: q,
                  disabled: y,
                  direction: F,
                },
                P,
                {
                  filterOption: C ? x : A,
                  onFocus: function () {
                    (P.onFocus && P.onFocus.apply(P, arguments), w(!0));
                  },
                  onBlur: function () {
                    (P.onBlur && P.onBlur.apply(P, arguments), w(!1));
                  },
                  ref: I,
                  options: L,
                },
              ),
              C
                ? u.createElement(
                    b,
                    { value: 'ANTD_SEARCHING', disabled: !0 },
                    u.createElement(f.A, { size: 'small' }),
                  )
                : g,
            );
          return U
            ? u.createElement(
                'div',
                {
                  className: i()(
                    ''.concat(z, '-affix-wrapper'),
                    (0, v.L)(''.concat(z, '-affix-wrapper'), K, U),
                    o,
                  ),
                },
                G,
                u.createElement('span', { className: ''.concat(z, '-suffix') }, _),
              )
            : G;
        },
        C = u.forwardRef(y);
      ((C.Option = b),
        (C.getMentions = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = t.prefix,
            l = void 0 === n ? '@' : n,
            r = t.split,
            a = void 0 === r ? ' ' : r,
            o = Array.isArray(l) ? l : [l];
          return e
            .split(a)
            .map(function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
                t = null;
              return (
                o.some(function (n) {
                  return e.slice(0, n.length) === n && ((t = n), !0);
                }),
                null !== t ? { prefix: t, value: e.slice(t.length) } : null
              );
            })
            .filter(function (e) {
              return !!e && !!e.value;
            });
        }));
      const A = C;
    },
    896476: (e, t, n) => {
      n.d(t, { A: () => o, h: () => i });
      var l = n(58168),
        r = n(296540),
        a = r.createContext(null),
        o = function (e) {
          var t = e.children,
            n = (function (e, t) {
              var n = {};
              for (var l in e)
                Object.prototype.hasOwnProperty.call(e, l) && t.indexOf(l) < 0 && (n[l] = e[l]);
              if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                var r = 0;
                for (l = Object.getOwnPropertySymbols(e); r < l.length; r++)
                  t.indexOf(l[r]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, l[r]) &&
                    (n[l[r]] = e[l[r]]);
              }
              return n;
            })(e, ['children']),
            o = r.useContext(a),
            i = r.useMemo(
              function () {
                return (0, l.A)((0, l.A)({}, o), n);
              },
              [o, n.prefixCls, n.mode, n.selectable],
            );
          return r.createElement(a.Provider, { value: i }, t);
        };
      const i = a;
    },
    219973: (e, t, n) => {
      n.d(t, { A: () => S });
      var l = n(23029),
        r = n(92901),
        a = n(56822),
        o = n(752176),
        i = n(353954),
        c = n(885501),
        s = n(58168),
        u = n(552318),
        m = n(246942),
        p = n.n(m),
        d = n(625738),
        f = n(126956),
        v = n(319853),
        b = n(296540),
        x = n(862279),
        y = n(527964),
        C = n(23723),
        A = n(940682),
        g = n(282284),
        $ = n(364467);
      const h = function (e) {
        var t = e.prefixCls,
          n = e.className,
          l = e.dashed,
          r = (function (e, t) {
            var n = {};
            for (var l in e)
              Object.prototype.hasOwnProperty.call(e, l) && t.indexOf(l) < 0 && (n[l] = e[l]);
            if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
              var r = 0;
              for (l = Object.getOwnPropertySymbols(e); r < l.length; r++)
                t.indexOf(l[r]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, l[r]) &&
                  (n[l[r]] = e[l[r]]);
            }
            return n;
          })(e, ['prefixCls', 'className', 'dashed']),
          a = (0, b.useContext(x.QO).getPrefixCls)('menu', t),
          o = p()((0, $.A)({}, ''.concat(a, '-item-divider-dashed'), !!l), n);
        return b.createElement(d.cG, (0, s.A)({ className: o }, r));
      };
      var O = n(582546),
        P = n(832099);
      const E = (0, b.createContext)({ prefixCls: '', firstLevel: !0, inlineCollapsed: !1 });
      var k = (function (e) {
        function t() {
          var e, n, r, c;
          return (
            (0, l.A)(this, t),
            (n = this),
            (r = t),
            (c = arguments),
            (r = (0, i.A)(r)),
            ((e = (0, a.A)(
              n,
              (0, o.A)() ? Reflect.construct(r, c || [], (0, i.A)(n).constructor) : r.apply(n, c),
            )).renderItem = function (t) {
              var n,
                l = t.siderCollapsed,
                r = e.context,
                a = r.prefixCls,
                o = r.firstLevel,
                i = r.inlineCollapsed,
                c = r.direction,
                u = r.disableMenuItemTitleTooltip,
                m = e.props,
                f = m.className,
                v = m.children,
                x = e.props,
                y = x.title,
                C = x.icon,
                g = x.danger,
                h = (function (e, t) {
                  var n = {};
                  for (var l in e)
                    Object.prototype.hasOwnProperty.call(e, l) && t.indexOf(l) < 0 && (n[l] = e[l]);
                  if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                    var r = 0;
                    for (l = Object.getOwnPropertySymbols(e); r < l.length; r++)
                      t.indexOf(l[r]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(e, l[r]) &&
                        (n[l[r]] = e[l[r]]);
                  }
                  return n;
                })(x, ['title', 'icon', 'danger']),
                E = y;
              void 0 === y ? (E = o ? v : '') : !1 === y && (E = '');
              var k = { title: E };
              l || i || ((k.title = null), (k.open = !1));
              var T = (0, O.A)(v).length,
                w = b.createElement(
                  d.q7,
                  (0, s.A)({}, h, {
                    className: p()(
                      (0, $.A)(
                        (0, $.A)({}, ''.concat(a, '-item-danger'), g),
                        ''.concat(a, '-item-only-child'),
                        1 === (C ? T + 1 : T),
                      ),
                      f,
                    ),
                    title: 'string' == typeof y ? y : void 0,
                  }),
                  (0, A.Ob)(C, {
                    className: p()(
                      (0, A.zO)(C)
                        ? null === (n = C.props) || void 0 === n
                          ? void 0
                          : n.className
                        : '',
                      ''.concat(a, '-item-icon'),
                    ),
                  }),
                  e.renderItemChildren(i),
                );
              return (
                u ||
                  (w = b.createElement(
                    P.A,
                    (0, s.A)({}, k, {
                      placement: 'rtl' === c ? 'left' : 'right',
                      overlayClassName: ''.concat(a, '-inline-collapsed-tooltip'),
                    }),
                    w,
                  )),
                w
              );
            }),
            e
          );
        }
        return (
          (0, c.A)(t, e),
          (0, r.A)(t, [
            {
              key: 'renderItemChildren',
              value: function (e) {
                var t = this.context,
                  n = t.prefixCls,
                  l = t.firstLevel,
                  r = this.props,
                  a = r.icon,
                  o = r.children,
                  i = b.createElement('span', { className: ''.concat(n, '-title-content') }, o);
                return (!a || ((0, A.zO)(o) && 'span' === o.type)) &&
                  o &&
                  e &&
                  l &&
                  'string' == typeof o
                  ? b.createElement(
                      'div',
                      { className: ''.concat(n, '-inline-collapsed-noicon') },
                      o.charAt(0),
                    )
                  : i;
              },
            },
            {
              key: 'render',
              value: function () {
                return b.createElement(y.P.Consumer, null, this.renderItem);
              },
            },
          ]),
          t
        );
      })(b.Component);
      k.contextType = E;
      const T = function (e) {
        var t,
          n,
          l = e.popupClassName,
          r = e.icon,
          a = e.title,
          o = e.theme,
          i = b.useContext(E),
          c = i.prefixCls,
          u = i.inlineCollapsed,
          m = i.antdMenuTheme,
          f = (0, d.Wj)();
        if (r) {
          var x = (0, A.zO)(a) && 'span' === a.type;
          n = b.createElement(
            b.Fragment,
            null,
            (0, A.Ob)(r, {
              className: p()(
                (0, A.zO)(r) ? (null === (t = r.props) || void 0 === t ? void 0 : t.className) : '',
                ''.concat(c, '-item-icon'),
              ),
            }),
            x ? a : b.createElement('span', { className: ''.concat(c, '-title-content') }, a),
          );
        } else
          n =
            u && !f.length && a && 'string' == typeof a
              ? b.createElement(
                  'div',
                  { className: ''.concat(c, '-inline-collapsed-noicon') },
                  a.charAt(0),
                )
              : b.createElement('span', { className: ''.concat(c, '-title-content') }, a);
        var y = b.useMemo(
          function () {
            return (0, s.A)((0, s.A)({}, i), { firstLevel: !1 });
          },
          [i],
        );
        return b.createElement(
          E.Provider,
          { value: y },
          b.createElement(
            d.g8,
            (0, s.A)({}, (0, v.A)(e, ['icon']), {
              title: n,
              popupClassName: p()(c, ''.concat(c, '-').concat(o || m), l),
            }),
          ),
        );
      };
      function w(e) {
        return (e || [])
          .map(function (e, t) {
            if (e && 'object' === (0, g.A)(e)) {
              var n = e,
                l = n.label,
                r = n.children,
                a = n.key,
                o = n.type,
                i = (function (e, t) {
                  var n = {};
                  for (var l in e)
                    Object.prototype.hasOwnProperty.call(e, l) && t.indexOf(l) < 0 && (n[l] = e[l]);
                  if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                    var r = 0;
                    for (l = Object.getOwnPropertySymbols(e); r < l.length; r++)
                      t.indexOf(l[r]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(e, l[r]) &&
                        (n[l[r]] = e[l[r]]);
                  }
                  return n;
                })(n, ['label', 'children', 'key', 'type']),
                c = null != a ? a : 'tmp-'.concat(t);
              return r || 'group' === o
                ? 'group' === o
                  ? b.createElement(d.te, (0, s.A)({ key: c }, i, { title: l }), w(r))
                  : b.createElement(T, (0, s.A)({ key: c }, i, { title: l }), w(r))
                : 'divider' === o
                  ? b.createElement(h, (0, s.A)({ key: c }, i))
                  : b.createElement(k, (0, s.A)({ key: c }, i), l);
            }
            return null;
          })
          .filter(function (e) {
            return e;
          });
      }
      var N = n(896476),
        I = (0, b.forwardRef)(function (e, t) {
          var n,
            l = b.useContext(N.h) || {},
            r = b.useContext(x.QO),
            a = r.getPrefixCls,
            o = r.getPopupContainer,
            i = r.direction,
            c = a(),
            m = e.prefixCls,
            y = e.className,
            g = e.theme,
            $ = void 0 === g ? 'light' : g,
            h = e.expandIcon,
            O = e._internalDisableMenuItemTitleTooltip,
            P = e.inlineCollapsed,
            k = e.siderCollapsed,
            T = e.items,
            I = e.children,
            j = e.mode,
            S = e.selectable,
            M = e.onClick,
            F = (function (e, t) {
              var n = {};
              for (var l in e)
                Object.prototype.hasOwnProperty.call(e, l) && t.indexOf(l) < 0 && (n[l] = e[l]);
              if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
                var r = 0;
                for (l = Object.getOwnPropertySymbols(e); r < l.length; r++)
                  t.indexOf(l[r]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, l[r]) &&
                    (n[l[r]] = e[l[r]]);
              }
              return n;
            })(e, [
              'prefixCls',
              'className',
              'theme',
              'expandIcon',
              '_internalDisableMenuItemTitleTooltip',
              'inlineCollapsed',
              'siderCollapsed',
              'items',
              'children',
              'mode',
              'selectable',
              'onClick',
            ]),
            R = (0, v.A)(F, ['collapsedWidth']),
            D =
              (function (e) {
                return b.useMemo(
                  function () {
                    return e ? w(e) : e;
                  },
                  [e],
                );
              })(T) || I;
          null === (n = l.validator) || void 0 === n || n.call(l, { mode: j });
          var U,
            _ = (0, f.A)(function () {
              var e;
              (null == M || M.apply(void 0, arguments),
                null === (e = null == l ? void 0 : l.onClick) || void 0 === e || e.call(l));
            }),
            K = l.mode || j,
            L = null != S ? S : l.selectable,
            z = b.useMemo(
              function () {
                return void 0 !== k ? k : P;
              },
              [P, k],
            ),
            q = {
              horizontal: { motionName: ''.concat(c, '-slide-up') },
              inline: C.Ay,
              other: { motionName: ''.concat(c, '-zoom-big') },
            },
            G = a('menu', m || l.prefixCls),
            B = p()(''.concat(G, '-').concat($), y);
          U =
            'function' == typeof h
              ? h
              : (0, A.Ob)(h || l.expandIcon, { className: ''.concat(G, '-submenu-expand-icon') });
          var H = b.useMemo(
            function () {
              return {
                prefixCls: G,
                inlineCollapsed: z || !1,
                antdMenuTheme: $,
                direction: i,
                firstLevel: !0,
                disableMenuItemTitleTooltip: O,
              };
            },
            [G, z, $, i, O],
          );
          return b.createElement(
            N.h.Provider,
            { value: null },
            b.createElement(
              E.Provider,
              { value: H },
              b.createElement(
                d.Ay,
                (0, s.A)(
                  {
                    getPopupContainer: o,
                    overflowedIndicator: b.createElement(u.A, null),
                    overflowedIndicatorPopupClassName: ''.concat(G, '-').concat($),
                    mode: K,
                    selectable: L,
                    onClick: _,
                  },
                  R,
                  {
                    inlineCollapsed: z,
                    className: B,
                    prefixCls: G,
                    direction: i,
                    defaultMotions: q,
                    expandIcon: U,
                    ref: t,
                  },
                ),
                D,
              ),
            ),
          );
        }),
        j = (function (e) {
          function t() {
            var e, n, r, c;
            return (
              (0, l.A)(this, t),
              (n = this),
              (r = t),
              (c = arguments),
              (r = (0, i.A)(r)),
              ((e = (0, a.A)(
                n,
                (0, o.A)() ? Reflect.construct(r, c || [], (0, i.A)(n).constructor) : r.apply(n, c),
              )).focus = function (t) {
                var n;
                null === (n = e.menu) || void 0 === n || n.focus(t);
              }),
              e
            );
          }
          return (
            (0, c.A)(t, e),
            (0, r.A)(t, [
              {
                key: 'render',
                value: function () {
                  var e = this;
                  return b.createElement(y.P.Consumer, null, function (t) {
                    return b.createElement(
                      I,
                      (0, s.A)(
                        {
                          ref: function (t) {
                            e.menu = t;
                          },
                        },
                        e.props,
                        t,
                      ),
                    );
                  });
                },
              },
            ]),
            t
          );
        })(b.Component);
      ((j.Divider = h), (j.Item = k), (j.SubMenu = T), (j.ItemGroup = d.te));
      const S = j;
    },
    779478: (e, t, n) => {
      n.d(t, { _m: () => M, Ay: () => F, q0: () => T, FQ: () => I });
      var l,
        r,
        a,
        o,
        i = n(58168),
        c = n(364467),
        s = n(338811),
        u = n(36029),
        m = n(907541),
        p = n(517850),
        d = n(193567),
        f = n(246942),
        v = n.n(f),
        b = n(554380),
        x = n(296540),
        y = n(739428),
        C = n(205544),
        A = n(625892),
        g = n(862279),
        $ = 3,
        h = 1,
        O = '',
        P = 'move-up',
        E = !1,
        k = !1;
      function T() {
        return h++;
      }
      function w(e, t) {
        var n = e.prefixCls,
          i = e.getPopupContainer,
          c = (0, y.cr)(),
          s = c.getPrefixCls,
          u = c.getRootPrefixCls,
          m = c.getIconPrefixCls,
          p = s('message', n || O),
          d = u(e.rootPrefixCls, p),
          f = m();
        if (l) t({ prefixCls: p, rootPrefixCls: d, iconPrefixCls: f, instance: l });
        else {
          var v = {
            prefixCls: p,
            transitionName: E ? P : ''.concat(d, '-').concat(P),
            style: { top: r },
            getContainer: a || i,
            maxCount: o,
          };
          b.A.newInstance(v, function (e) {
            l
              ? t({ prefixCls: p, rootPrefixCls: d, iconPrefixCls: f, instance: l })
              : ((l = e), t({ prefixCls: p, rootPrefixCls: d, iconPrefixCls: f, instance: e }));
          });
        }
      }
      var N = { info: p.A, success: s.A, error: u.A, warning: m.A, loading: d.A },
        I = Object.keys(N);
      function j(e, t, n) {
        var l = void 0 !== e.duration ? e.duration : $,
          r = N[e.type],
          a = v()(
            ''.concat(t, '-custom-content'),
            (0, c.A)(
              (0, c.A)({}, ''.concat(t, '-').concat(e.type), e.type),
              ''.concat(t, '-rtl'),
              !0 === k,
            ),
          );
        return {
          key: e.key,
          duration: l,
          style: e.style || {},
          className: e.className,
          content: x.createElement(
            y.Ay,
            { iconPrefixCls: n },
            x.createElement(
              'div',
              { className: a },
              e.icon || (r && x.createElement(r, null)),
              x.createElement('span', null, e.content),
            ),
          ),
          onClose: e.onClose,
          onClick: e.onClick,
        };
      }
      var S = {
        open: function (e) {
          var t = e.key || T(),
            n = new Promise(function (n) {
              var l = function () {
                return ('function' == typeof e.onClose && e.onClose(), n(!0));
              };
              w(e, function (n) {
                var r = n.prefixCls,
                  a = n.iconPrefixCls;
                n.instance.notice(j((0, i.A)((0, i.A)({}, e), { key: t, onClose: l }), r, a));
              });
            }),
            r = function () {
              var n;
              l && (l.removeNotice(t), null === (n = e.onClose) || void 0 === n || n.call(e));
            };
          return (
            (r.then = function (e, t) {
              return n.then(e, t);
            }),
            (r.promise = n),
            r
          );
        },
        config: function (e) {
          (void 0 !== e.top && ((r = e.top), (l = null)),
            void 0 !== e.duration && ($ = e.duration),
            void 0 !== e.prefixCls && (O = e.prefixCls),
            void 0 !== e.getContainer && ((a = e.getContainer), (l = null)),
            void 0 !== e.transitionName && ((P = e.transitionName), (l = null), (E = !0)),
            void 0 !== e.maxCount && ((o = e.maxCount), (l = null)),
            void 0 !== e.rtl && (k = e.rtl));
        },
        destroy: function (e) {
          if (l)
            if (e) (0, l.removeNotice)(e);
            else {
              ((0, l.destroy)(), (l = null));
            }
        },
      };
      function M(e, t) {
        e[t] = function (n, l, r) {
          return (function (e) {
            return '[object Object]' === Object.prototype.toString.call(e) && !!e.content;
          })(n)
            ? e.open((0, i.A)((0, i.A)({}, n), { type: t }))
            : ('function' == typeof l && ((r = l), (l = void 0)),
              e.open({ content: n, duration: l, type: t, onClose: r }));
        };
      }
      (I.forEach(function (e) {
        return M(S, e);
      }),
        (S.warn = S.warning),
        (S.useMessage = (function (e, t) {
          return function () {
            var n,
              l,
              r = null,
              a = {
                add: function (e, t) {
                  null == r || r.component.add(e, t);
                },
              },
              o = (0, A.A)(a),
              c = (0, C.A)(o, 2),
              s = c[0],
              u = c[1],
              m = x.useRef({});
            return (
              (m.current.open = function (a) {
                var o = a.prefixCls,
                  c = n('message', o),
                  u = n(),
                  m = a.key || T(),
                  p = new Promise(function (n) {
                    var o = function () {
                      return ('function' == typeof a.onClose && a.onClose(), n(!0));
                    };
                    e(
                      (0, i.A)((0, i.A)({}, a), {
                        prefixCls: c,
                        rootPrefixCls: u,
                        getPopupContainer: l,
                      }),
                      function (e) {
                        var n = e.prefixCls,
                          l = e.instance;
                        ((r = l), s(t((0, i.A)((0, i.A)({}, a), { key: m, onClose: o }), n)));
                      },
                    );
                  }),
                  d = function () {
                    r && r.removeNotice(m);
                  };
                return (
                  (d.then = function (e, t) {
                    return p.then(e, t);
                  }),
                  (d.promise = p),
                  d
                );
              }),
              I.forEach(function (e) {
                return M(m.current, e);
              }),
              [
                m.current,
                x.createElement(g.TG, { key: 'holder' }, function (e) {
                  return ((n = e.getPrefixCls), (l = e.getPopupContainer), u);
                }),
              ]
            );
          };
        })(w, j)));
      const F = S;
    },
  },
]);
