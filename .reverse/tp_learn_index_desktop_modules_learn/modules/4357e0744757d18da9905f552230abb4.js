EDU(
  '4357e0744757d18da9905f552230abb4',
  function (e, t, i, n, a, o, s) {
    function r(e) {
      return e + '_' + s.constants.COMMENT_MODAL_SHOWING_COOKIE_KEY;
    }
    var c = new a.CourseComment();
    s.constants = { COMMENT_MODAL_SHOWING_COOKIE_KEY: 'cmsck', MODAL_CANCELED: '15' };
    s.getMyComment = function (e, t) {
      c.getCommentList(
        e,
        void 0,
        1,
        function (e) {
          var i = (e ? e.list : e.result && e.result.list) || [];
          var n;
          if (i && i.length && i[0].commentorId == window.webUser.id) n = i[0];
          t(n);
        }._$bind(this),
        1,
      );
    };
    s.hasUserCanceledModal = function (e) {
      return n._$cookie(r(e)) === s.constants.MODAL_CANCELED;
    };
    s.setUserCanceledModal = function (e) {
      n._$cookie(r(e), { value: s.constants.MODAL_CANCELED, expires: 9999999 });
    };
    s.showCommentModal = function (e, n, a, r, c, d, _, l, h, f, u, p, m, b) {
      u = 'undefined' == typeof u ? !0 : !!u;
      var g =
        window.moocConfig && window.moocConfig.lang
          ? window.moocConfig.lang.KEY_COMMENTUTIL_TIP_GX
          : void 0;
      var E = new t({
        data: {
          mode: n ? i.MODE.SIMPLE : i.MODE.VERBOSE,
          termId: r,
          courseId: a,
          schoolShortName: _,
          modalTitle: g,
          evaluation: { courseName: c, rate: l, originContent: h, id: f },
          courseCoverImageUrl: d,
          gaCategory: p,
          shareUrl: m,
          courseTypeName: b,
        },
      });
      var v = s.setUserCanceledModal.bind(s, e);
      if (u)
        E = E.$on('cancel', v)
          .$on('close', v)
          .$on('submit', function () {
            o._$userActionLog('evaluate', a);
          });
      return E;
    };
  },
  '3c901c22ade77485e83c760f41b2eb47',
  'ffb2bd7b7ed4019841cb1f9c238eafe3',
  'cf3d228cb5ed8727271758f2c836ea9f',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '9cd3f5cb5f8a85acc9ce0fba66876da5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
);
