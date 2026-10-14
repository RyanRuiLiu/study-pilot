EDU(
  'a936afb5ecab0e9286c3c9d05341571d',
  function (e) {
    var t = NEJ.P('nej.u'),
      n = NEJ.P('edu.d'),
      i = t._$randNumberString(),
      o,
      a = 'ck-CourseCache',
      r = 8;
    n._$$COM_Cache_CourseCache = NEJ.C();
    o = n._$$COM_Cache_CourseCache._$extend(n._$$COM_Cache);
    o._$getAggreement = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'AdminCommonBean.getAggreement',
        param: [e],
        onload: this.__onGetAggreement._$bind(this),
      });
    };
    o.__onGetAggreement = function (e) {
      this._$dispatchEvent('onGetAggreement', e);
    };
    o._$getCategorys = function () {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getCategorys',
        param: [],
        onload: this.__onGetCategorys._$bind(this),
      });
    };
    o.__onGetCategorys = function (e) {
      this._$dispatchEvent('onGetCategorys', e);
    };
    o._$getCategorysAddCAP = function () {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getCategorysAddCAP',
        param: [],
        onload: this.__onGetCategorysAddCAP._$bind(this),
      });
    };
    o.__onGetCategorysAddCAP = function (e) {
      this._$dispatchEvent('onGetCategorysAddCAP', e);
    };
    o._$getRecommends = function () {
      this._$postDWR({
        key: a + i,
        url: 'CommonBean.obtain',
        param: ['moocCourseRecommendList'],
        onload: this.__onGetRecommends._$bind(this),
      });
    };
    o.__onGetRecommends = function (e) {
      this._$dispatchEvent('onGetRecommends', e);
    };
    o._$getExtentionImgs = function () {
      this._$postDWR({
        key: a + i,
        url: 'CommonBean.obtain',
        param: ['moocExtentionImageList'],
        onload: this.__onGetExtentionImgs._$bind(this),
      });
    };
    o.__onGetExtentionImgs = function (e) {
      this._$dispatchEvent('onGetExtentionImgs', e);
    };
    o._$getRecommendSpecials = function () {
      this._$postDWR({
        key: a + i,
        url: 'CommonBean.obtain',
        param: ['moocMyCourseRecommendSpecialsList'],
        onload: this.__onGetRecommendSpecials._$bind(this),
      });
    };
    o.__onGetRecommendSpecials = function (e) {
      this._$dispatchEvent('onGetRecommendSpecials', e);
    };
    o._$getCourseListByCategory = function (e, t, n, o) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getCoursePanelListByCategory',
        param: [e, t, n, r, o],
        onload: this.__onGetCourseListByCategory._$bind(this),
      });
    };
    o.__onGetCourseListByCategory = function (e) {
      this._$dispatchEvent('onGetCourseListByCategory', e);
    };
    o._$getCAPCoursePanelList = function (e, t, n) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getCAPCoursePanelList',
        param: [e, t, r, n],
        onload: this.__onGetCAPCoursePanelList._$bind(this),
      });
    };
    o.__onGetCAPCoursePanelList = function (e) {
      this._$dispatchEvent('onGetCourseListByCategory', e);
    };
    o._$getRadomCourseList = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getRadomCoursePanelList',
        param: [e],
        onload: this.__onGetRadomCourseList._$bind(this),
      });
    };
    o.__onGetRadomCourseList = function (e) {
      this._$dispatchEvent('onGetRadomCourseList', e);
    };
    o._$getCourseListBySchoolId = function (e, t, n, o) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getCoursePanelListBySchoolId',
        param: [e, t, n, o],
        onload: this.__onGetCourseListBySchoolId._$bind(this),
      });
    };
    o.__onGetCourseListBySchoolId = function (e) {
      this._$dispatchEvent('onGetCourseListBySchoolId', e);
    };
    o._$getVocationalCourses = function (e, t, n) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getVocationalCourseList',
        param: [e, t, n],
        onload: this.__onGetVocationalCourses._$bind(this),
      });
    };
    o.__onGetVocationalCourses = function (e) {
      this._$dispatchEvent('onGetCourseListBySchoolId', e);
    };
    o._$getAllCourseListByStaffId = function (e, t) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getAllCoursePanelListByStaffId',
        param: [e, t],
        onload: this.__onGetAllCourseListByStaffId._$bind(this),
      });
    };
    o.__onGetAllCourseListByStaffId = function (e) {
      this._$dispatchEvent('onGetAllCourseListByStaffId', e);
    };
    o._$GetMyLearnedCourseList = function (e, t) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.getMyLearnedCoursePanelList',
        param: [e, t, 4],
        onload: this.__onGetMyLearnedCourseList._$bind(this),
      });
    };
    o.__onGetMyLearnedCourseList = function (e) {
      this._$dispatchEvent('onGetMyLearnedCourseList', e);
    };
    o._$StartTermLearn = function (e, t, n) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.startTermLearn',
        param: [e, t],
        onload: this.__onStartTermLearn._$bind(this),
        sync: !0,
      });
    };
    o.__onStartTermLearn = function (e) {
      this._$dispatchEvent('onStartTermLearn', e);
    };
    o._$StartEfficientTermLearn = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.startEfficientTermLearn',
        param: [e],
        onload: this.__onStartEfficientTermLearn._$bind(this),
        sync: !0,
      });
    };
    o.__onStartEfficientTermLearn = function (e) {
      this._$dispatchEvent('onStartEfficientTermLearn', e);
    };
    o._$StartTermLearnToDiscuss = function (e, t, n, o) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.startTermLearn',
        param: [e, t],
        onload: this.__onStartTermLearnToDiscuss._$bind(this, o),
        sync: !0,
      });
    };
    o.__onStartTermLearnToDiscuss = function (e, t) {
      this._$dispatchEvent('onStartTermLearnToDiscuss', t, e);
    };
    o._$DeleteTermLearn = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.deleteTermLearn',
        param: [e],
        onload: this.__onDeleteTermLearn._$bind(this),
      });
    };
    o.__onDeleteTermLearn = function (e) {
      this._$dispatchEvent('onDeleteTermLearn', e);
    };
    o._$CheckTermLearn = function (e, t) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.checkTermLearn',
        param: [e],
        onload: this.__onCheckTermLearn._$bind(this),
        sync: t || !1,
      });
    };
    o.__onCheckTermLearn = function (e) {
      this._$dispatchEvent('onCheckTermLearn', e);
    };
    o._$CheckTermLearnWithUrl = function (e, t, n, o) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.checkTermLearn',
        param: [e],
        onload: this.__onCheckTermLearnWithUrl._$bind(this, e, t, n),
        sync: !0,
      });
    };
    o.__onCheckTermLearnWithUrl = function (e, t, n, i) {
      this._$dispatchEvent('onCheckTermLearn', i, e, t, n);
    };
    o._$getMocSchoolLectorDtoList = function (e, t, n) {
      this._$postDWR({
        key: a + i,
        url: 'MocSchoolBean.getMocSchoolLectorDtoList',
        param: [e, t, n],
        onload: this.__onGetMocSchoolLectorDtoList._$bind(this),
      });
    };
    o.__onGetMocSchoolLectorDtoList = function (e) {
      this._$dispatchEvent('onGetMocSchoolLectorDtoList', e);
    };
    o._$getSpocSchoolLectorDtoList = function (e, t, n) {
      this._$postDWR({
        key: a + i,
        url: 'MocSchoolBean.getSpocSchoolLectorDtoList',
        param: [e, t, n],
        onload: this.__onGetSpocSchoolLectorDtoList._$bind(this),
      });
    };
    o.__onGetSpocSchoolLectorDtoList = function (e) {
      this._$dispatchEvent('onGetSpocSchoolLectorDtoList', e);
    };
    o._$DoCollectSwitch = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'MocCollectBean.doCollectSwitch',
        param: [e],
        onload: this.__onDoCollectSwitch._$bind(this),
      });
    };
    o.__onDoCollectSwitch = function (e) {
      this._$dispatchEvent('onDoCollectSwitch', e);
    };
    o._$DoCollectDelete = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'MocCollectBean.doCollectDelete',
        param: [e],
        onload: this.__onDoCollectDelete._$bind(this),
      });
    };
    o.__onDoCollectDelete = function (e) {
      this._$dispatchEvent('onDoCollectDelete', e);
    };
    o._$QueryMarkedCourses = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'MocCollectBean.queryMarkedCourses',
        param: [e, 6],
        onload: this.__onQueryMarkedCourses._$bind(this),
      });
    };
    o.__onQueryMarkedCourses = function (e) {
      this._$dispatchEvent('onQueryMarkedCourses', e);
    };
    o._$IsCourseMarked = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'MocCollectBean.isCourseMarked',
        param: [e],
        onload: this.__onIsCourseMarked._$bind(this),
      });
    };
    o.__onIsCourseMarked = function (e) {
      this._$dispatchEvent('onIsCourseMarked', e);
    };
    o._$SearchMocCourse = function (t) {
      e._$request({
        url: '/web/j/mocSearchBean.searchCourse.rpc',
        method: 'post',
        data: { mocCourseQueryVo: t },
        onload: this.__onSearchMocCourse._$bind(this),
      });
    };
    o.__onSearchMocCourse = function (e) {
      this._$dispatchEvent('onSearchMocCourse', e);
    };
    o._$getMyCertList = function () {
      this._$postDWR({
        key: a + i,
        url: 'MocCertQueryBean.getMyCertList',
        param: [],
        onload: this.__onGetMyCertList._$bind(this),
      });
    };
    o.__onGetMyCertList = function (e) {
      this._$dispatchEvent('onGetMyCertList', e);
    };
    o._$canDeleteTermLearnRecord4Spoc = function (e) {
      this._$postDWR({
        key: a + i,
        url: 'CourseBean.canDeleteTermLearnRecord4Spoc',
        param: [e],
        onload: this.__onCanDeleteTermLearnRecord4Spoc._$bind(this),
      });
    };
    o.__onCanDeleteTermLearnRecord4Spoc = function (e) {
      this._$dispatchEvent('onCanDeleteTermLearnRecord4Spoc', e);
    };
    o._$getActivitySignAndEnrollStatus = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.getActivitySignAndEnrollStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    o._$getMoocSearchRecommendList = function (e, t) {
      this._$postDWR({
        key: 'courseCache_getMoocSearchRecommendList',
        url: 'CommonBean.obtain',
        param: ['moocSearchRecommendList'],
        onload: t,
      });
    };
    o._$getMemberLearningRate = function (t, n) {
      e._$request({
        url: '/web/j/mocCourseV2RpcBean.getMemberLearningRate.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    o._$getCredentialStatus = function (t, n) {
      e._$request({
        url: '/web/j/mocScoreManagerBean.getCredentialStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    o._$searchSchoolCloudCourseList = function (t, n) {
      e._$request({
        url: '/web/j/courseBean.searchSchoolCloudCourseList.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    o._$courseBeanGetCourseListBySchoolId = function (t, n) {
      e._$request({
        url: '/web/j/courseBean.getCourseListBySchoolId.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    o._$getPackagesBySchoolId = function (t, n) {
      e._$request({
        url: '/mm-school/web/j/schoolCourseResourceBean.listSchoolResourceCategory.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    o._$getTermAiSwitchStatus = function (t, n) {
      e._$request({
        url: '//www.icourse163.org/mm-course/web/j/mocAdminTermCertifiedBean.getTermAiSwitchStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    o._$switchTermAI = function (t, n, i) {
      e._$request({
        url: '/mm-course/web/j/mocAdminTermCertifiedBean.switchTermAi.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
      });
    };
    o._$getUnitDocQaFileStatus = function (t, n, i) {
      e._$request({
        url: '//www.icourse163.org/mm-course/web/j/docQaBean.getUnitDocQaFileStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        cookie: !0,
      });
    };
    o._$saveDocQaFileFromUnit = function (t, n, i) {
      e._$request({
        url: '//www.icourse163.org/mm-course/web/j/docQaBean.saveDocQaFileFromUnit.rpc',
        method: 'post',
        data: t,
        onload: n,
        cookie: !0,
        onerror: i,
      });
    };
    o._$deleteMemberDocQaFile = function (t, n, i) {
      e._$request({
        url: '//www.icourse163.org/mm-course/web/j/docQaBean.deleteMemberDocQaFile.rpc',
        method: 'post',
        data: t,
        onload: n,
        cookie: !0,
        onerror: i,
      });
    };
    o._$listDocQaKb = function (t, n, i) {
      e._$request({
        url: '//www.icourse163.org/ms-ai/web/j/docQaBean.listDocQaKb.rpc',
        method: 'post',
        data: t,
        onload: n,
        cookie: !0,
        onerror: i,
      });
    };
    o._$saveDocQaKb = function (t, n, i) {
      e._$request({
        url: '//www.icourse163.org/ms-ai/web/j/docQaBean.saveDocQaKb.rpc',
        method: 'post',
        data: t,
        onload: n,
        cookie: !0,
        onerror: i,
      });
    };
    o._$hitKaoyanKeywords = function (t, n) {
      e._$request({
        url: '/web/j/mocSearchBean.hitKaoyanKeywords.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    return o;
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
