EDU(
  'adec563fba581ac0f5bf79fb5e990240',
  function (e) {
    var t = NEJ.O,
      n = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      o = NEJ.P('edu.d'),
      a = i._$randNumberString(),
      r,
      s = 'ck-CourseCache',
      c = 8,
      d = 'true' === window.isMobilePhone || window.isMobilePhone === !0;
    o._$$COM_Cache_CourseCache = NEJ.C();
    r = o._$$COM_Cache_CourseCache._$extend(o._$$COM_Cache);
    r._$getAggreement = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'AdminCommonBean.getAggreement',
        param: [e],
        onload: this.__onGetAggreement._$bind(this),
      });
    };
    r.__onGetAggreement = function (e) {
      this._$dispatchEvent('onGetAggreement', e);
    };
    r._$getCategorys = function () {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getCategorys',
        param: [],
        onload: this.__onGetCategorys._$bind(this),
      });
    };
    r.__onGetCategorys = function (e) {
      this._$dispatchEvent('onGetCategorys', e);
    };
    r._$getCategorysAddCAP = function () {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getCategorysAddCAP',
        param: [],
        onload: this.__onGetCategorysAddCAP._$bind(this),
      });
    };
    r.__onGetCategorysAddCAP = function (e) {
      this._$dispatchEvent('onGetCategorysAddCAP', e);
    };
    r._$getRecommends = function () {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.obtain',
        param: ['moocCourseRecommendList'],
        onload: this.__onGetRecommends._$bind(this),
      });
    };
    r.__onGetRecommends = function (e) {
      this._$dispatchEvent('onGetRecommends', e);
    };
    r._$getExtentionImgs = function () {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.obtain',
        param: ['moocExtentionImageList'],
        onload: this.__onGetExtentionImgs._$bind(this),
      });
    };
    r.__onGetExtentionImgs = function (e) {
      this._$dispatchEvent('onGetExtentionImgs', e);
    };
    r._$getRecommendSpecials = function () {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.obtain',
        param: ['moocMyCourseRecommendSpecialsList'],
        onload: this.__onGetRecommendSpecials._$bind(this),
      });
    };
    r.__onGetRecommendSpecials = function (e) {
      this._$dispatchEvent('onGetRecommendSpecials', e);
    };
    r._$getCourseListByCategory = function (e, t, n, i) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getCoursePanelListByCategory',
        param: [e, t, n, c, i],
        onload: this.__onGetCourseListByCategory._$bind(this),
      });
    };
    r.__onGetCourseListByCategory = function (e) {
      this._$dispatchEvent('onGetCourseListByCategory', e);
    };
    r._$getCAPCoursePanelList = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getCAPCoursePanelList',
        param: [e, t, c, n],
        onload: this.__onGetCAPCoursePanelList._$bind(this),
      });
    };
    r.__onGetCAPCoursePanelList = function (e) {
      this._$dispatchEvent('onGetCourseListByCategory', e);
    };
    r._$getRadomCourseList = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getRadomCoursePanelList',
        param: [e],
        onload: this.__onGetRadomCourseList._$bind(this),
      });
    };
    r.__onGetRadomCourseList = function (e) {
      this._$dispatchEvent('onGetRadomCourseList', e);
    };
    r._$getCourseListBySchoolId = function (e, t, n, i) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getCoursePanelListBySchoolId',
        param: [e, t, n, i],
        onload: this.__onGetCourseListBySchoolId._$bind(this),
      });
    };
    r.__onGetCourseListBySchoolId = function (e) {
      this._$dispatchEvent('onGetCourseListBySchoolId', e);
    };
    r._$getVocationalCourses = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getVocationalCourseList',
        param: [e, t, n],
        onload: this.__onGetVocationalCourses._$bind(this),
      });
    };
    r.__onGetVocationalCourses = function (e) {
      this._$dispatchEvent('onGetCourseListBySchoolId', e);
    };
    r._$getAllCourseListByStaffId = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getAllCoursePanelListByStaffId',
        param: [e, t],
        onload: this.__onGetAllCourseListByStaffId._$bind(this),
      });
    };
    r.__onGetAllCourseListByStaffId = function (e) {
      this._$dispatchEvent('onGetAllCourseListByStaffId', e);
    };
    r._$GetMyLearnedCourseList = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getMyLearnedCoursePanelList',
        param: [e, t, 30],
        onload: this.__onGetMyLearnedCourseList._$bind(this),
      });
    };
    r.__onGetMyLearnedCourseList = function (e) {
      this._$dispatchEvent('onGetMyLearnedCourseList', e);
    };
    r._$StartTermLearn = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.startTermLearn',
        param: [e, t],
        onload: this.__onStartTermLearn._$bind(this),
        sync: !0,
      });
    };
    r.__onStartTermLearn = function (e) {
      this._$dispatchEvent('onStartTermLearn', e);
    };
    r._$StartEfficientTermLearn = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.startEfficientTermLearn',
        param: [e],
        onload: this.__onStartEfficientTermLearn._$bind(this),
        sync: !0,
      });
    };
    r.__onStartEfficientTermLearn = function (e) {
      this._$dispatchEvent('onStartEfficientTermLearn', e);
    };
    r._$StartTermLearnToDiscuss = function (e, t, n, i) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.startTermLearn',
        param: [e, t],
        onload: this.__onStartTermLearnToDiscuss._$bind(this, i),
        sync: !0,
      });
    };
    r.__onStartTermLearnToDiscuss = function (e, t) {
      this._$dispatchEvent('onStartTermLearnToDiscuss', t, e);
    };
    r._$DeleteTermLearn = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.deleteTermLearn',
        param: [e],
        onload: 'function' == typeof t ? t : this.__onDeleteTermLearn._$bind(this),
      });
    };
    r.__onDeleteTermLearn = function (e) {
      this._$dispatchEvent('onDeleteTermLearn', e);
    };
    r._$CheckTermLearn = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.checkTermLearn',
        param: [e],
        onload: this.__onCheckTermLearn._$bind(this),
        sync: t || !1,
      });
    };
    r.__onCheckTermLearn = function (e) {
      this._$dispatchEvent('onCheckTermLearn', e);
    };
    r._$CheckTermLearnWithUrl = function (e, t, n, i) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.checkTermLearn',
        param: [e],
        onload: this.__onCheckTermLearnWithUrl._$bind(this, e, t, n),
        sync: !0,
      });
    };
    r.__onCheckTermLearnWithUrl = function (e, t, n, i) {
      this._$dispatchEvent('onCheckTermLearn', i, e, t, n);
    };
    r._$getMocSchoolLectorDtoList = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.getMocSchoolLectorDtoList',
        param: [e, t, n],
        onload: this.__onGetMocSchoolLectorDtoList._$bind(this),
      });
    };
    r.__onGetMocSchoolLectorDtoList = function (e) {
      this._$dispatchEvent('onGetMocSchoolLectorDtoList', e);
    };
    r._$getSpocSchoolLectorDtoList = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.getSpocSchoolLectorDtoList',
        param: [e, t, n],
        onload: this.__onGetSpocSchoolLectorDtoList._$bind(this),
      });
    };
    r.__onGetSpocSchoolLectorDtoList = function (e) {
      this._$dispatchEvent('onGetSpocSchoolLectorDtoList', e);
    };
    r._$DoCollectSwitch = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocCollectBean.doCollectSwitch',
        param: [e],
        onload: this.__onDoCollectSwitch._$bind(this),
      });
    };
    r.__onDoCollectSwitch = function (e) {
      this._$dispatchEvent('onDoCollectSwitch', e);
    };
    r._$DoCollectDelete = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MocCollectBean.doCollectDelete',
        param: [e],
        onload: 'function' == typeof t ? t : this.__onDoCollectDelete._$bind(this),
      });
    };
    r.__onDoCollectDelete = function (e) {
      this._$dispatchEvent('onDoCollectDelete', e);
    };
    r._$QueryMarkedCourses = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'MocCollectBean.queryMarkedCourses',
        param: [e, t || 6],
        onload: 'function' == typeof n ? n : this.__onQueryMarkedCourses._$bind(this),
      });
    };
    r.__onQueryMarkedCourses = function (e) {
      this._$dispatchEvent('onQueryMarkedCourses', e);
    };
    r._$IsCourseMarked = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocCollectBean.isCourseMarked',
        param: [e],
        onload: this.__onIsCourseMarked._$bind(this),
      });
    };
    r.__onIsCourseMarked = function (e) {
      this._$dispatchEvent('onIsCourseMarked', e);
    };
    r._$SearchMocCourse = function (t) {
      var n = '/web/j/mocSearchBean.searchCourse.rpc';
      var i = { mocCourseQueryVo: t };
      e._$request({
        url: n,
        method: 'post',
        data: i,
        onload: this.__onSearchMocCourse._$bind(this),
      });
    };
    r.__onSearchMocCourse = function (e) {
      if (d) {
        e.result = e.list;
        e.pagination = e.query;
      }
      this._$dispatchEvent('onSearchMocCourse', e);
    };
    r._$getMyCertList = function () {
      this._$postDWR({
        key: s + a,
        url: 'MocCertQueryBean.getMyCertList',
        param: [],
        onload: this.__onGetMyCertList._$bind(this),
      });
    };
    r.__onGetMyCertList = function (e) {
      this._$dispatchEvent('onGetMyCertList', e);
    };
    r._$canDeleteTermLearnRecord4Spoc = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.canDeleteTermLearnRecord4Spoc',
        param: [e],
        onload: 'function' == typeof t ? t : this.__onCanDeleteTermLearnRecord4Spoc._$bind(this),
      });
    };
    r.__onCanDeleteTermLearnRecord4Spoc = function (e) {
      this._$dispatchEvent('onCanDeleteTermLearnRecord4Spoc', e);
    };
    r._$getActivitySignAndEnrollStatus = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.getActivitySignAndEnrollStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$getMoocSearchRecommendList = function (e, t) {
      this._$postDWR({
        key: 'courseCache_getMoocSearchRecommendList',
        url: 'CommonBean.obtain',
        param: ['moocSearchRecommendList'],
        onload: t,
      });
    };
    r._$courseBeanGetCourseListBySchoolId = function (t, n) {
      e._$request({
        url: '/web/j/courseBean.getCourseListBySchoolId.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$searchSchoolCloudCourseList = function (t, n) {
      e._$request({
        url: '/web/j/courseBean.searchSchoolCloudCourseList.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$getMemberLearningRate = function (t, n) {
      e._$request({
        url: '/web/j/mocCourseV2RpcBean.getMemberLearningRate.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$getPackagesBySchoolId = function (t, n) {
      e._$request({
        url: '/mm-school/web/j/schoolCourseResourceBean.listSchoolResourceCategory.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    r._$hitKaoyanKeywords = function (t, n) {
      e._$request({
        url: '/web/j/mocSearchBean.hitKaoyanKeywords.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    return r;
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
