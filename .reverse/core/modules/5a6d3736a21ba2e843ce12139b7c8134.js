EDU(
  '5a6d3736a21ba2e843ce12139b7c8134',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      r,
      s = 'ck-adminSchoolCache';
    i._$$COM_Cache_AdminSchoolCache = NEJ.C();
    r = i._$$COM_Cache_AdminSchoolCache._$extend(i._$$COM_Cache);
    r._$getSchool = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.getSchool',
        param: [e],
        onload: this.__onGetSchool._$bind(this),
      });
    };
    r.__onGetSchool = function (e) {
      this._$dispatchEvent('onGetSchool', e);
    };
    r._$editSchool = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.editSchool',
        param: [e],
        onload: this.__onEditSchool._$bind(this),
      });
    };
    r.__onEditSchool = function (e) {
      this._$dispatchEvent('onEditSchool', e);
    };
    r._$publishSchool = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.publishSchool',
        param: [e],
        onload: this.__onPublishSchool._$bind(this),
      });
    };
    r.__onPublishSchool = function (e) {
      this._$dispatchEvent('onPublishSchool', e);
    };
    r._$getCourseCategorys = function () {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getCategorys',
        param: [],
        onload: this.__onGetCourseCategorys._$bind(this),
      });
    };
    r.__onGetCourseCategorys = function (e) {
      this._$dispatchEvent('onGetCourseCategorys', e);
    };
    r._$saveGid = function (e, t) {
      this._$dispatchEvent('onSaveGid', 1);
    };
    r.__onSaveGid = function (e) {
      this._$dispatchEvent('onSaveGid', e);
    };
    r._$saveGidsAndPhotoUrls = function (e, t) {
      this._$dispatchEvent('onSaveGidsAndPhotoUrls', 1);
    };
    r._$AdminCreateCourse = function (e, t, n, i, o, r) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.createCourse',
        param: [e, t, n, i, o, r],
        onload: this.__onAdminCreateCourse._$bind(this),
      });
    };
    r.__onAdminCreateCourse = function (e) {
      this._$dispatchEvent('AdminCreateCourse', e);
    };
    r._$AdminUpdateCourse = function (e, t, n, i, o, r, c) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.editCourse',
        param: [e, t, n, i, o, r, c],
        onload: this.__onAdminUpdateCourse._$bind(this),
      });
    };
    r.__onAdminUpdateCourse = function (e) {
      this._$dispatchEvent('AdminUpdateCourse', e);
    };
    r._$AdminGetCourseList = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.getCoursesBySchool',
        param: [e, t, n],
        onload: this.__onAdminGetCourseList._$bind(this),
      });
    };
    r.__onAdminGetCourseList = function (e) {
      this._$dispatchEvent('AdminGetCourseList', e);
    };
    r._$AdminGetFilterCourseList = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.getCoursesBySchool',
        param: [e, t, n],
        onload: this.__onAdminGetFilterCourseList._$bind(this),
      });
    };
    r.__onAdminGetFilterCourseList = function (e) {
      this._$dispatchEvent('AdminGetFilterCourseList', e);
    };
    r._$getSchoolSessionPriviledge = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.getSchoolSessionPriviledge',
        param: [e],
        onload: this.__onGetSchoolSessionPriviledge._$bind(this),
      });
    };
    r.__onGetSchoolSessionPriviledge = function (e) {
      this._$dispatchEvent('onGetSchoolSessionPriviledge', e);
    };
    r._$AdminCreateTerm = function (e, t, n, i, o, r) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.createTerm',
        param: [e, t, n, i, o, r],
        onload: this.__onAdminCreateTerm._$bind(this),
      });
    };
    r.__onAdminCreateTerm = function (e) {
      this._$dispatchEvent('AdminCreateTerm', e);
    };
    r._$AdminUpdateTerm = function (e, t, n, i, o, r, c) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.editTerm',
        param: [e, t, n, i, o, r, c],
        onload: this.__onAdminUpdateTerm._$bind(this),
      });
    };
    r.__onAdminUpdateTerm = function (e) {
      this._$dispatchEvent('AdminUpdateTerm', e);
    };
    r._$updateCourseDraft = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.updateCourseDraft',
        param: [e, t, n],
        onload: this.__onUpdateCourseDraft._$bind(this),
      });
    };
    r.__onUpdateCourseDraft = function (e) {
      this._$dispatchEvent('onUpdateCourseDraft', e);
    };
    r._$publishTermDetail = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.publishTermDetail',
        param: [e, t, n],
        onload: this.__onPublishTermDetail._$bind(this),
      });
    };
    r.__onPublishTermDetail = function (e) {
      this._$dispatchEvent('onPublishTermDetail', e);
    };
    r._$validateTermDetailStaff = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.validateTermDetailStaff',
        param: [e],
        onload: this.__onvalidateTermDetailStaff._$bind(this),
      });
    };
    r.__onvalidateTermDetailStaff = function (e) {
      this._$dispatchEvent('onValidateTermDetailStaff', e);
    };
    r._$getTermsByTeacher = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.getTermsByTeacher',
        param: [e],
        onload: this.__onGetTermsByTeacher._$bind(this),
      });
    };
    r.__onGetTermsByTeacher = function (e) {
      this._$dispatchEvent('onGetTermsByTeacher', e);
    };
    r._$getCourseDto = function (e, t, n, i) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.getCourseDto',
        param: [e, t, n],
        onload: 'function' == typeof i ? i : this.__onGetCourseDto._$bind(this),
      });
    };
    r.__onGetCourseDto = function (e) {
      this._$dispatchEvent('onGetCourseDto', e);
    };
    r._$deleteTermById = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.deleteTermById',
        param: [e],
        onload: this.__onDeleteTermById._$bind(this),
      });
    };
    r.__onDeleteTermById = function (e) {
      this._$dispatchEvent('onDeleteTermById', e);
    };
    r._$deleteCourseById = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.deleteCourseById',
        param: [e],
        onload: this.__onDeleteCourseById._$bind(this),
      });
    };
    r.__onDeleteCourseById = function (e) {
      this._$dispatchEvent('onDeleteCourseById', e);
    };
    r._$validateSpocFromCourse = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'PublishCourseBean.validateSpocFromCourse',
        param: [e, t],
        onload: this.__onValidateSpocFromCourse._$bind(this),
      });
    };
    r.__onValidateSpocFromCourse = function (e) {
      this._$dispatchEvent('onValidateSpocFromCourse', e);
    };
    r._$setAuthStatusAndBgPhoto = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.setAuthStatusAndBgPhoto',
        param: [e, t, n],
        onload: this.__onSetAuthStatusAndBgPhoto._$bind(this),
      });
    };
    r.__onSetAuthStatusAndBgPhoto = function (e) {
      this._$dispatchEvent('onSetAuthStatusAndBgPhoto', e);
    };
    r._$getAuthStatusAndBgPhoto = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocSchoolBean.getAuthStatusAndBgPhoto',
        param: [e],
        onload: this.__onGetAuthStatusAndBgPhoto._$bind(this),
      });
    };
    r.__onGetAuthStatusAndBgPhoto = function (e) {
      this._$dispatchEvent('onGetAuthStatusAndBgPhoto', e);
    };
    r._$getTermPanelListForFromCourse = function (e, t, n, i, o, r, c, d, l) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getTermPanelListForFromCourse',
        param: [e, t, n, i, o, r, c, d, l],
        onload: this.__onGetTermPanelListForFromCourse._$bind(this),
      });
    };
    r.__onGetTermPanelListForFromCourse = function (e) {
      this._$dispatchEvent('onGetTermPanelListForFromCourse', e);
    };
    r._$getSpocCopyStatistics = function (e, t, n, i, o, r, c) {
      this._$postDWR({
        key: s + a,
        url: 'MocOrderBean.getSpocCopyStatistics',
        param: [e, t, n, i, o, r, c],
        onload: this.__onGetSpocCopyStatistics._$bind(this),
      });
    };
    r.__onGetSpocCopyStatistics = function (e) {
      this._$dispatchEvent('onGetSpocCopyStatistics', e);
    };
    r._$getMocPayAccountOperationLogDtoPageBySchoolId = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'MocOrderBean.getMocPayAccountOperationLogDtoPageBySchoolId',
        param: [e, t, n],
        onload: this.__onGetMocPayAccountOperationLogDtoPageBySchoolId._$bind(this),
      });
    };
    r.__onGetMocPayAccountOperationLogDtoPageBySchoolId = function (e) {
      this._$dispatchEvent('onGetMocPayAccountOperationLogDtoPageBySchoolId', e);
    };
    r._$getMocPayAccountOperationLogDtoBySchoolId = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocOrderBean.getMocPayAccountOperationLogDtoBySchoolId',
        param: [e],
        onload: this.__onGetMocPayAccountOperationLogDtoBySchoolId._$bind(this),
      });
    };
    r.__onGetMocPayAccountOperationLogDtoBySchoolId = function (e) {
      this._$dispatchEvent('onGetMocPayAccountOperationLogDtoBySchoolId', e);
    };
    r._$getSelectTerm = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'TermCopyBean.getAllTermsOfCourseAsc',
        param: [e, t, n],
        onload: this.__onGetSelectTerm._$bind(this),
      });
    };
    r.__onGetSelectTerm = function (e) {
      this._$dispatchEvent('onGetSelectTerm', e);
    };
    r._$getSchoolBalance = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocOrderBean.getPayAccountBySchool',
        param: [e],
        onload: this.__onGetSchoolBalance._$bind(this),
      });
    };
    r.__onGetSchoolBalance = function (e) {
      this._$dispatchEvent('onGetSchoolBalance', e);
    };
    r._$AdminCreateCopyTerm = function (e, t, n, i, o, r, c) {
      this._$postDWR({
        key: s + a,
        url: 'TermBean.createCopyTerm',
        param: [e, t, n, i, o, r, c],
        onload: this.__onAdminCreateCopyTerm._$bind(this),
      });
    };
    r.__onAdminCreateCopyTerm = function (e) {
      this._$dispatchEvent('AdminCreateCopyTerm', e);
    };
    return r;
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
