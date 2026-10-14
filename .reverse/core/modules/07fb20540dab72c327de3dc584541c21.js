EDU(
  '07fb20540dab72c327de3dc584541c21',
  function (e, t, n, i) {
    var o = window,
      a = n._$randNumberString();
    i._$getSchoolStatistic = function (t, n) {
      e._$request({
        url: '/web/j/learnerCourseRpcBean.getPersonalLearningStatisticDto.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getLearningBifrostCourse = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/mm-bifrost/web/j/mocCourseBean.getCourseCount.rpc',
        method: 'post',
        data: t,
        onload: n,
        cookie: !0,
        notShowLoading: !0,
      });
    };
    i._$getUserCourseVip = function (t) {
      e._$request({
        url: '//ke-api.icourse163.org/vip/course/listUserCourseVip.json',
        method: 'post',
        onload: t,
        cookie: !0,
        notShowLoading: !0,
      });
    };
    i._$getTeacherMainStatisticDto = function (t, n) {
      e._$request({
        url: '/web/j/learnerCourseRpcBean.getTeacherMainStatisticDto.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getOtherLearnedCoursePagination = function (t, n) {
      e._$request({
        url: '/web/j/learnerCourseRpcBean.getOtherLearnedCoursePagination.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getBothLearnedCoursePagination = function (t, n) {
      e._$request({
        url: '/web/j/learnerCourseRpcBean.getBothLearnedCoursePagination.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getColumnInfoListForMember = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.getColumnInfoListForMember.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$pageMemberLive = function (t, n) {
      e._$request({
        url: '/web/j/mocMemberLiveRoomRpcBean.pageMemberLive.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getJpkCourseList = function (t, n) {
      e._$request({
        url: '//ke-api.icourse163.org/my/course.json',
        method: 'get',
        data: t,
        cookie: !0,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getGrayTestResult = function (t, n, i) {
      e._$request({
        url: '//www.icourse163.org/web/j/indexBeanV3.getGrayTestResult.rpc',
        method: 'post',
        data: t,
        onload: n,
        cookie: !0,
        onerror: i,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
