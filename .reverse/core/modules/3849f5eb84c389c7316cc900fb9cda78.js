EDU(
  '3849f5eb84c389c7316cc900fb9cda78',
  function (e, t, n, i) {
    var o = window,
      a = n._$randNumberString(),
      r = 'ck-spocCloudCache';
    i._$getSchoolConfig = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/mm-school/web/j/schoolBean.getSchoolById.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    i._$getSchoolCategory = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolCloudApplyRpcBean.getSchoolCategory.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    i._$unBundCloud = function (t, n) {
      e._$request({
        url: '/web/j/mocSchoolBean.unBundCloud.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    i._$isBundingSchool = function (t, n) {
      e._$request({
        url: '/web/j/mocSchoolBean.isBundingSchool.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    i._$getSchoolStatistic = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolCloudApplyRpcBean.getSchoolCourseCount.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getQuestionListByTermId = function (t, n) {
      e._$request({
        url: '/web/j/mocQuizRpcBean.getQuestionListByTermId.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    i._$getCaseIntro = function (e) {
      t._$postDWR({
        key: r + a,
        url: 'CommonBean.obtain',
        param: ['SchoolCloudCaseIntro'],
        onload: e,
      });
    };
    i._$getApplyStatus = function (t) {
      e._$request({
        url: '/web/j/MocSchoolCloudApplyRpcBean.getApplyStatus.rpc',
        method: 'post',
        data: {},
        onload: t,
      });
    };
    i._$applySchool = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolCloudApplyRpcBean.applySchoolCloud.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    i._$reapplySchool = function (t) {
      e._$request({
        url: '/web/j/MocSchoolCloudApplyRpcBean.resetApply.rpc',
        method: 'post',
        data: {},
        onload: t,
      });
    };
    i._$getPartnerList = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolCloudApplyRpcBean.getMocSchoolPartnerVoList.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    i._$getSchoolTryEndTime = function (t, n) {
      e._$request({
        url: '/web/j/MocSchoolBean.getSchoolTryEndTime.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    var s = {
      show: !1,
      reason: 'request_error',
      floatImageUrl: '',
      webModalImageUrl: '',
      courseId: null,
      outVendor: 'zw_mooc_web_yjbm_xxy',
    };
    i._$getSelectFloatDisplayStatus = function (t, n, i) {
      e._$request({
        url: '/web/j/mocSchoolSelectFloatBean.getDisplayStatus.rpc',
        method: 'post',
        data: { schoolId: t && t.schoolId },
        onload: n,
        onerror: function (e, t) {
          n && n(s);
          i && i(e, t);
        },
        hideError: !0,
        notShowLoading: !0,
      });
    };
    i._$enrollSelectFloatCourse = function (t, n, i) {
      e._$request({
        url: '/web/j/mocSchoolSelectFloatBean.enrollConfiguredCourse.rpc',
        method: 'post',
        data: { schoolId: t && t.schoolId },
        onload: n,
        onerror: i,
        hideError: !0,
        notShowLoading: !0,
      });
    };
    i._$closeSelectFloat = function (t, n, i) {
      e._$request({
        url: '/web/j/mocSchoolSelectFloatBean.close.rpc',
        method: 'post',
        data: { schoolId: t && t.schoolId },
        onload: n,
        onerror: i,
        hideError: !0,
        notShowLoading: !0,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
