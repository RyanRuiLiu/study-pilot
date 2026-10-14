EDU(
  '5c4d74bc0e709956e1cf2155560a30ff',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = i._$randNumberString(),
      s,
      r = 'ck-ManageStudentCache',
      c = 20;
    n._$$COM_Cache_ManageStudentCache = NEJ.C();
    s = n._$$COM_Cache_ManageStudentCache._$extend(n._$$COM_Cache);
    s._$getMocTermDataStatisticDto = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMocTermDataStatisticDto',
        param: [e],
        onload: this.__onGetMocTermDataStatisticDto._$bind(this),
      });
    };
    s.__onGetMocTermDataStatisticDto = function (e) {
      this._$dispatchEvent('onGetMocTermDataStatisticDto', e);
    };
    s._$confirmScores = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.confirmTestScores',
          param: [e, t],
          onload: this.__onConfirmScores._$bind(this),
        });
    };
    s.__onConfirmScores = function (e) {
      this._$dispatchEvent('onConfirmScores', e);
    };
    s._$confirmSubjectScore = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.confirmSubjectScore',
          param: [e],
          onload: this.__onConfirmSubjectScore._$bind(this),
        });
    };
    s.__onConfirmSubjectScore = function (e) {
      this._$dispatchEvent('onConfirmSubjectScore', e);
    };
    s._$confirmExamScores = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.confirmExamScores',
          param: [e, t],
          onload: this.__onConfirmExamScores._$bind(this),
        });
    };
    s.__onConfirmExamScores = function (e) {
      this._$dispatchEvent('onConfirmExamScores', e);
    };
    s._$getStudentScores = function (e, t, i, n, a) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentScores',
        param: [e, c, t, i, n, a],
        onload: this.__onGetStudentScores._$bind(this),
      });
    };
    s.__onGetStudentScores = function (e) {
      this._$dispatchEvent('onGetStudentScores', e);
    };
    s._$getStudentTestAggreScores = function (e, t, i, n) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentTestAggreScores',
        param: [e, c, t, i, n],
        onload: this.__onGetStudentTestAggreScores._$bind(this),
      });
    };
    s.__onGetStudentTestAggreScores = function (e) {
      this._$dispatchEvent('onGetStudentTestAggreScores', e);
    };
    s._$getStudentScoresByTestId = function (e, t, i, n) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentScoresByTestId',
        param: [e, c, t, i, n],
        onload: this.__onGetStudentScoresByTestId._$bind(this),
      });
    };
    s.__onGetStudentScoresByTestId = function (e) {
      this._$dispatchEvent('onGetStudentScoresByTestId', e);
    };
    s._$getStudentScoresByExamId = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentScoresByExamId',
        param: [e, t, c, i],
        onload: this.__onGetStudentScoresByExamId._$bind(this),
      });
    };
    s.__onGetStudentScoresByExamId = function (e) {
      this._$dispatchEvent('onGetStudentScoresByExamId', e);
    };
    s._$giveAwardsForStudentOnEffectiveScore = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.giveAwardsForStudentOnEffectiveScore',
          param: [e, t, i],
          onload: this.__onGiveAwardsForStudentOnEffectiveScore._$bind(this),
        });
    };
    s.__onGiveAwardsForStudentOnEffectiveScore = function (e) {
      this._$dispatchEvent('onGiveAwardsForStudentOnEffectiveScore', e);
    };
    s._$giveAwardsForStudentOnSubjectScore = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.giveAwardsForStudentOnSubjectScore',
          param: [e, t, i],
          onload: this.__onGiveAwardsForStudentOnSubjectScore._$bind(this),
        });
    };
    s.__onGiveAwardsForStudentOnSubjectScore = function (e) {
      this._$dispatchEvent('onGiveAwardsForStudentOnSubjectScore', e);
    };
    s._$showSentMailToast = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.showSentMailToast',
        param: [e, t],
        onload: this.__onShowSentMailToast._$bind(this),
      });
    };
    s.__onShowSentMailToast = function (e) {
      this._$dispatchEvent('onShowSentMailToast', e);
    };
    s._$getSingleStudentScores = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getSingleStudentScores',
        param: [e, t],
        onload: this.__onGetSingleStudentScores._$bind(this),
      });
    };
    s.__onGetSingleStudentScores = function (e) {
      this._$dispatchEvent('onGetSingleStudentScores', e);
    };
    s._$generateFinalScores = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.generateFinalScores',
          param: [e, t],
          onload: this.__onGenerateFinalScores._$bind(this),
        });
    };
    s.__onGenerateFinalScores = function (e) {
      this._$dispatchEvent('onGenerateFinalScores', e);
    };
    s._$getTermSummaryInfo = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getTermSummaryInfo',
        param: [e],
        onload: this.__onGetTermSummaryInfo._$bind(this),
      });
    };
    s.__onGetTermSummaryInfo = function (e) {
      this._$dispatchEvent('onGetTermSummaryInfo', e);
    };
    s._$refreshSingleTest = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.refreshSingleTest',
          param: [e, t],
          onload: this.__onRefreshSingleTest._$bind(this),
        });
    };
    s.__onRefreshSingleTest = function (e) {
      this._$dispatchEvent('onRefreshSingleTest', e);
    };
    s._$refreshExam = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.refreshExam',
          param: [e],
          onload: this.__onRefreshExam._$bind(this),
        });
    };
    s.__onRefreshExam = function (e) {
      this._$dispatchEvent('onRefreshExam', e);
    };
    s._$getMocAchivementDto = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMocAchivementDto',
        param: [e],
        onload: this.__onGetMocAchivementDto._$bind(this),
      });
    };
    s.__onGetMocAchivementDto = function (e) {
      this._$dispatchEvent('onGetMocAchivementDto', e);
    };
    s._$submitTermScoreForReview = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.submitTermScoreForReview',
          param: [e],
          onload: this.__onSubmitTermScoreForReview._$bind(this),
        });
    };
    s.__onSubmitTermScoreForReview = function (e) {
      this._$dispatchEvent('onSubmitTermScoreForReview', e);
    };
    s._$updateSummaryScore = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.updateSummaryScore',
          param: [e],
          onload: this.__onUpdateSummaryScore._$bind(this),
        });
    };
    s.__onUpdateSummaryScore = function (e) {
      this._$dispatchEvent('onUpdateSummaryScore', e);
    };
    s._$getRelatedMoocStudentScores4Spoc = function (e, t, i, n, a) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getRelatedMoocStudentScores4Spoc',
        param: [e, c, t, i, n, a],
        onload: this.__onGetRelatedMoocStudentScores4Spoc._$bind(this),
      });
    };
    s.__onGetRelatedMoocStudentScores4Spoc = function (e) {
      this._$dispatchEvent('onGetRelatedMoocStudentScores4Spoc', e);
    };
    s._$getMemberByLikeNickname = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMemberByLikeNickname',
        param: [e, t],
        onload: this.__onGetMemberByLikeNickname._$bind(this),
      });
    };
    s.__onGetMemberByLikeNickname = function (e) {
      this._$dispatchEvent('onGetMemberByLikeNickname', e);
    };
    s._$getSpocStudentStatisticDataDtoList = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.getSpocStudentStatisticDataDtoList',
          param: [e, t, c, i],
          onload: this.__onGetSpocStudentStatisticDataDtoList._$bind(this),
        });
    };
    s.__onGetSpocStudentStatisticDataDtoList = function (e) {
      this._$dispatchEvent('onGetSpocStudentStatisticDataDtoList', e);
    };
    s._$importOutsideScores = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.importOutsideScores',
        param: [e, t, i],
        onload: this.__onImportOutsideScores._$bind(this),
      });
    };
    s.__onImportOutsideScores = function (e) {
      this._$dispatchEvent('onImportOutsideScores', e);
    };
    s._$importOutsideScoresByOperator = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.importOutsideScoresByOperator',
        param: [e, t, i],
        onload: this.__onImportOutsideScoresByOperator._$bind(this),
      });
    };
    s.__onImportOutsideScoresByOperator = function (e) {
      this._$dispatchEvent('onImportOutsideScoresByOperator', e);
    };
    s._$verifyOutsideScoresByOperator = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.confirmTermScoreWithoutCheck',
        param: [e],
        onload: this.__onVerifyOutsideScoresByOperator._$bind(this),
      });
    };
    s.__onVerifyOutsideScoresByOperator = function (e) {
      this._$dispatchEvent('onVerifyOutsideScoresByOperator', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
