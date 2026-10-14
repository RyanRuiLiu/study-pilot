EDU(
  '9fdfe36fa0d16f9b8a86b6a56a15749d',
  function (e) {
    var t = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      n = t._$randNumberString(),
      a,
      o = 'ck-suggestionCache';
    i._$$COM_Cache_SuggestionCache = NEJ.C();
    a = i._$$COM_Cache_SuggestionCache._$extend(i._$$COM_Cache);
    a._$getChargeTeacherSuggestion = function (e, t) {
      this._$postDWR({
        key: o + n,
        url: 'MocSchoolBean.getSuggestLector',
        param: [e, t],
        notShowLoading: !0,
        onload: this.__onGetSuggestLector._$bind(this),
      });
    };
    a.__onGetSuggestLector = function (e) {
      this._$dispatchEvent('onGetTeacherInChargeSuggest', e);
    };
    a._$listCourseByName = function (e) {
      this._$postDWR({
        key: o + n,
        url: 'PublishCourseBean.listCourseByName',
        param: [e],
        onload: this.__onGetSuggestCourse._$bind(this),
      });
    };
    a.__onGetSuggestCourse = function (e) {
      this._$dispatchEvent('onGetSuggestCourse', e);
    };
    a._$getMoocSuggestList = function (t) {
      e._$request({
        url: '/web/j/courseSuggestionBean.getCourseSuggestion.rpc',
        method: 'post',
        data: { keyword: t },
        onload: this.__onGetMoocSuggestList._$bind(this),
      });
    };
    a.__onGetMoocSuggestList = function (e) {
      this._$dispatchEvent('onGetMoocSuggestList', e);
    };
    a._$getCourseSuggestList = function (t) {
      e._$request({
        url: '/web/j/courseSuggestionBean.listSimapleCourseDto.rpc',
        method: 'post',
        data: { keyword: t },
        onload: this.__onGetCourseSuggestList._$bind(this),
      });
    };
    a.__onGetCourseSuggestList = function (e) {
      this._$dispatchEvent('onGetCourseSuggestList', e);
    };
    a._$queryAssits = function (e) {
      this._$postDWR({
        key: o + n,
        url: 'TermStaffBean.queryAssits',
        param: [e],
        notShowLoading: !0,
        onload: this.__onqueryAssits._$bind(this),
      });
    };
    a.__onqueryAssits = function (e) {
      this._$dispatchEvent('onqueryAssits', e);
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
