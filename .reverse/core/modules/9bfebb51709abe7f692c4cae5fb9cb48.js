EDU(
  '9bfebb51709abe7f692c4cae5fb9cb48',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      r,
      s = 'ck-courseCreateCache';
    i._$$COM_Cache_CourseCreateCache = NEJ.C();
    r = i._$$COM_Cache_CourseCreateCache._$extend(i._$$COM_Cache);
    r._$getTermDto = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.getTermContent',
        param: [e],
        onload: this.__onGetTermDto._$bind(this),
      });
    };
    r.__onGetTermDto = function (e) {
      this._$dispatchEvent('onGetTermDto', e);
    };
    r._$publishChapter = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.publishChapter',
        param: [e, t],
        onload: this.__onPublishChapter._$bind(this),
      });
    };
    r.__onPublishChapter = function (e) {
      this._$dispatchEvent('onPublishChapter', e);
    };
    r._$publishTest = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MocAdminQuizBean.publishTest',
        param: [e, t],
        onload: this.__onPublishTest._$bind(this),
      });
    };
    r.__onPublishTest = function (e) {
      this._$dispatchEvent('onPublishTest', e);
    };
    r._$appendChapterInfo = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.appendChapterInfo',
        param: [e],
        onload: this.__onAppendChapterInfo._$bind(this),
      });
    };
    r.__onAppendChapterInfo = function (e) {
      this._$dispatchEvent('onAppendChapterInfo', e);
    };
    r._$updateChapterInfo = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.updateChapterInfo',
        param: [e],
        onload: this.__onUpdateChapterInfo._$bind(this),
      });
    };
    r.__onUpdateChapterInfo = function (e) {
      this._$dispatchEvent('onUpdateChapterInfo', e);
    };
    r._$deleteChapterInfo = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.deleteChapterInfo',
        param: [e],
        onload: this.__onDeleteChapterInfo._$bind(this),
      });
    };
    r.__onDeleteChapterInfo = function (e) {
      this._$dispatchEvent('onDeleteChapterInfo', e);
    };
    r._$appendLessonInfo = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.appendLessonInfo',
        param: [e],
        onload: this.__onAppendLessonInfo._$bind(this),
      });
    };
    r.__onAppendLessonInfo = function (e) {
      this._$dispatchEvent('onAppendLessonInfo', e);
    };
    r._$updateLessonInfo = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.updateLessonInfo',
        param: [e],
        onload: this.__onUpdateLessonInfo._$bind(this),
      });
    };
    r.__onUpdateLessonInfo = function (e) {
      this._$dispatchEvent('onUpdateLessonInfo', e);
    };
    r._$getLessonUnits = function (e, t, n) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getLessonInfo',
        param: [e, t, n],
        onload: this.__ongetLessonUnits._$bind(this),
      });
    };
    r.__ongetLessonUnits = function (e) {
      this._$dispatchEvent('ongetLessonUnits', e);
    };
    r._$deleteLessonInfo = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.deleteLessonInfo',
        param: [e],
        onload: this.__onDeleteLessonInfo._$bind(this),
      });
    };
    r.__onDeleteLessonInfo = function (e) {
      this._$dispatchEvent('onDeleteLessonInfo', e);
    };
    r._$appendLessonUnit = function (e, t) {
      var n = 'TermDraftBean.' + (e.id ? 'updateLessonUnit' : 'appendLessonUnit');
      this._$postDWR({
        key: s + a,
        url: n,
        param: [e],
        onload: this.__onappendLessonUnit._$bind(this, e, t),
      });
    };
    r.__onappendLessonUnit = function (e, t, n) {
      if ('name' == t) this._$dispatchEvent('onappendLessonUnit', n, e);
      else if ('content' == t) this._$dispatchEvent('onupdateLessonUnitContent', n, e);
      else this._$dispatchEvent('onupdateLessonUnitJsonContent', n, e);
    };
    r._$deleteLessonUnit = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.deleteLessonUnit',
        param: [e],
        onload: this.__ondeleteLessonUnit._$bind(this, e),
      });
    };
    r.__ondeleteLessonUnit = function (e) {
      this._$dispatchEvent('ondeleteLessonUnit', e);
    };
    r._$moveLessonUnit = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'TermDraftBean.moveLessonUnit',
        param: [e, t],
        onload: this.__onmoveLessonUnit._$bind(this),
      });
    };
    r.__onmoveLessonUnit = function (e, t) {
      this._$dispatchEvent('onmoveLessonUnit', t);
    };
    r._$getLessonUnitPreviewVo = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getLessonUnitPreviewVo',
        param: [e, t],
        onload: this.__ongetLessonUnitPreviewVo._$bind(this, e),
      });
    };
    r.__ongetLessonUnitPreviewVo = function (e, t) {
      t.unitId = e;
      this._$dispatchEvent('ongetLessonUnitPreviewVo', t);
    };
    r._$getLessonUnitPreviewVoWithParam = function (e, t, n, i) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.getLessonUnitPreviewVo',
        param: [e, t],
        onload: this.__ongetLessonUnitPreviewVoWithParam._$bind(this, e, n, i),
      });
    };
    r.__ongetLessonUnitPreviewVoWithParam = function (e, t, n, i) {
      i.unitId = e;
      this._$dispatchEvent('ongetLessonUnitPreviewVoWithParam', i, t, n);
    };
    r._$saveContentForFileResource = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocResourceBean.saveContentForResource',
        param: [e],
        onload: this.__onsaveResource._$bind(this, e.type),
      });
    };
    r.__onsaveResource = function (e, t) {
      this._$dispatchEvent('onsaveResource', t, e);
    };
    r._$generateLessonUnitTest = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocAdminQuizBean.generateLessonUnitTest',
        param: [e],
        onload: this.__onGenerateLessonUnitTest._$bind(this),
      });
    };
    r.__onGenerateLessonUnitTest = function (e) {
      this._$dispatchEvent('onGenerateLessonUnitTest', e);
    };
    r._$getTermGuideData = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MocSettingBean.getTermTutorialDto',
        param: [e],
        onload: this.__onGetTermGuideData._$bind(this),
      });
    };
    r.__onGetTermGuideData = function (e) {
      this._$dispatchEvent('onGetTermGuideData', e);
    };
    r._$getOnlineReleaseTime = function (e, t) {
      if (null == e) this.__onGetOnlineReleaseTime(null);
      else
        this._$postDWR({
          key: s + a,
          url: 'TermDraftBean.getOnlineReleaseTime',
          param: [e, t],
          onload: this.__onGetOnlineReleaseTime._$bind(this),
        });
    };
    r.__onGetOnlineReleaseTime = function (e) {
      this._$dispatchEvent('onGetOnlineReleaseTime', e);
    };
    r._$getTermsForCopy = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermCopyBean.getTermsForCopy',
        param: [e],
        onload: this.__onGetTermsForCopy._$bind(this),
      });
    };
    r.__onGetTermsForCopy = function (e) {
      this._$dispatchEvent('onGetTermsForCopy', e);
    };
    r._$getAllTermsOfCourse = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermCopyBean.getAllTermsOfCourse',
        param: [e],
        onload: this.__onGetAllTermsOfCourse._$bind(this),
      });
    };
    r.__onGetAllTermsOfCourse = function (e) {
      this._$dispatchEvent('onGetAllTermsOfCourse', e);
    };
    r._$getFromTermsByToTerm = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermCopyBean.getFromTermByToTermId',
        param: [e],
        onload: this.__onGetFromTermByToTerm._$bind(this),
      });
    };
    r.__onGetFromTermByToTerm = function (e) {
      this._$dispatchEvent('onGetFromTermByToTerm', e);
    };
    r._$copyTerm = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'TermCopyBean.copyTerm',
        param: [e, t],
        onload: this.__onCopyTerm._$bind(this),
      });
    };
    r.__onCopyTerm = function (e) {
      this._$dispatchEvent('onCopyTerm', e);
    };
    r._$copySpocTerm = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'TermCopyBean.copySpocTerm',
        param: [e, t],
        onload: this.__onCopySpocTerm._$bind(this),
      });
    };
    r.__onCopySpocTerm = function (e) {
      this._$dispatchEvent('onCopySpocTerm', e);
    };
    r._$watchCopyTermStatus = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'TermCopyBean.watchCopyTermStatus',
        param: [e],
        notShowLoading: !0,
        onload: this.__onWatchCopyTermStatus._$bind(this),
      });
    };
    r.__onWatchCopyTermStatus = function (e) {
      this._$dispatchEvent('onWatchCopyTermStatus', e);
    };
    r._$validateTermPassword = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'CourseBean.validateTermPassword',
        param: [e, t],
        onload: this.__onValidateTermPassword._$bind(this),
      });
    };
    r.__onValidateTermPassword = function (e) {
      this._$dispatchEvent('onValidateTermPassword', e);
    };
    r._$getRecommendPost = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'PostBean.getRecommendPost',
        param: [e],
        onload: this.__onGetRecommendPost._$bind(this),
      });
    };
    r.__onGetRecommendPost = function (e) {
      this._$dispatchEvent('onGetRecommendPost', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
