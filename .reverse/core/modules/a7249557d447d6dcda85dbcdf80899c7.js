EDU(
  'a7249557d447d6dcda85dbcdf80899c7',
  function (e, t) {
    var n = window;
    t._$getSchoolSugList = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolBean.getSchoolByPinyin.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    t._$getAzSchoolList = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolBean.getSchoolGroupByPinyin.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$checkStuVerified = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolBean.checkStudentVerified.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    t._$lastVerified = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolBean.verifyStudent.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
