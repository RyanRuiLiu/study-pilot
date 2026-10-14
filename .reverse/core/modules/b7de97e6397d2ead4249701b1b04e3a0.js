EDU(
  'b7de97e6397d2ead4249701b1b04e3a0',
  function (e, t) {
    t._$getMocStaffSelfDto = function (t) {
      e._$request({
        url: '/web/j/mocSchoolBean.getMocStaffSelfDto.rpc',
        method: 'post',
        onload: t,
      });
    };
    t._$saveStaffSelfPersonInfo = function (t, n) {
      var i = { staffDto: t };
      e._$request({
        url: '/web/j/mocSchoolBean.saveStaffSelfPersonInfo.rpc',
        method: 'post',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify(i),
        onload: n,
        json: !0,
      });
    };
    t._$getSchoolCollegeList = function (t, n) {
      e._$request({
        url: '/mm-school/web/j/mocSchoolCollegeBean.listSchoolCollege.rpc',
        method: 'post',
        data: { schoolId: t },
        onload: n,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
