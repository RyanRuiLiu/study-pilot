EDU(
  'fee4c38f314dd0beb1624df2aa08cdc8',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = i._$randNumberString(),
      s,
      r = 'ck-termSettingsCache';
    n._$$COM_Cache_TermSettingsCache = NEJ.C();
    s = n._$$COM_Cache_TermSettingsCache._$extend(n._$$COM_Cache);
    s._$getAllMenuItems = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.getAllMenuItems',
        param: [e, t],
        onload: this.__onGetAllMenuItems._$bind(this),
      });
    };
    s.__onGetAllMenuItems = function (e) {
      this._$dispatchEvent('onGetAllMenuItems', e);
    };
    s._$getMenuItem = function (e, t, i, n) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.getMenuItem',
        param: [e, t, i, n],
        onload: this.__onGetMenuItem._$bind(this),
      });
    };
    s.__onGetMenuItem = function (e) {
      this._$dispatchEvent('onGetMenuItem', e);
    };
    s._$saveMenuItems = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.saveMenuItemDrafts',
        param: [e, t, i],
        onload: this.__onSaveMenuItems._$bind(this),
      });
    };
    s.__onSaveMenuItems = function (e) {
      this._$dispatchEvent('onSaveMenuItems', e);
    };
    s._$publishMenuItems = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.publishMenuItems',
        param: [e, t, i],
        onload: this.__publishMenuItems._$bind(this),
      });
    };
    s.__publishMenuItems = function (e) {
      this._$dispatchEvent('publishMenuItems', e);
    };
    s._$publishMenuItems4Spoc = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.publishMenuItems4Spoc',
        param: [e, t],
        onload: this.__publishMenuItems4Spoc._$bind(this),
      });
    };
    s.__publishMenuItems4Spoc = function (e) {
      this._$dispatchEvent('publishMenuItems4Spoc', e);
    };
    s._$saveMenuItem = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.saveMenuItemDraft',
        param: [e],
        onload: this.__onSaveMenuItem._$bind(this),
      });
    };
    s.__onSaveMenuItem = function (e) {
      this._$dispatchEvent('onSaveMenuItem', e);
    };
    s._$saveMenuItemDraft4Spoc = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.saveMenuItemDraft4Spoc',
        param: [e, t, i],
        onload: this.__onsSaveMenuItemDraft4Spoc._$bind(this),
      });
    };
    s.__onsSaveMenuItemDraft4Spoc = function (e) {
      this._$dispatchEvent('onsSaveMenuItemDraft4Spoc', e);
    };
    s._$saveTermOpenStatus = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.manageTermCloseStatus',
        param: [e, t],
        onload: this.__onSaveTermOpenStatus._$bind(this),
      });
    };
    s.__onSaveTermOpenStatus = function (e) {
      this._$dispatchEvent('onSaveTermOpenStatus', e);
    };
    s._$updateCopyRightSetting = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.updateCopyRightSetting',
        param: [e, t],
        onload: this.__onUpdateCopyRightSetting._$bind(this),
      });
    };
    s.__onUpdateCopyRightSetting = function (e) {
      this._$dispatchEvent('onUpdateCopyRightSetting', e);
    };
    s._$updateSpocCopyRightSetting = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.updateSpocCopyRightSetting',
        param: [e],
        onload: this.__onUpdateSpocCopyRightSetting._$bind(this),
      });
    };
    s.__onUpdateSpocCopyRightSetting = function (e) {
      this._$dispatchEvent('onUpdateSpocCopyRightSetting', e);
    };
    s._$getSpocCopyRightSetting = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.getSpocCopyRightSetting',
        param: [e],
        onload: this.__onGetSpocCopyRightSetting._$bind(this),
      });
    };
    s.__onGetSpocCopyRightSetting = function (e) {
      this._$dispatchEvent('onGetSpocCopyRightSetting', e);
    };
    s._$getAllstaffByTerm = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.getAllstaffByTerm',
        param: [e],
        onload: this.__onGetAllstaffByTerm._$bind(this),
      });
    };
    s.__onGetAllstaffByTerm = function (e) {
      this._$dispatchEvent('onGetAllstaffByTerm', e);
    };
    s._$deleteStaff = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.deleteStaff',
        param: [e, t],
        onload: this.__onDeleteStaff._$bind(this),
      });
    };
    s.__onDeleteStaff = function (e) {
      this._$dispatchEvent('onDeleteStaff', e);
    };
    s._$addLector = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.addLector',
        param: [e, t],
        onload: this.__onAddLector._$bind(this),
      });
    };
    s.__onAddLector = function (e) {
      this._$dispatchEvent('onAddLector', e);
    };
    s._$moveLector = function (e, t, i, n, a) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.move',
        param: [e, t, i, n, a],
        onload: this.__onMoveLector._$bind(this),
      });
    };
    s.__onMoveLector = function (e) {
      this._$dispatchEvent('onMoveLector', e);
    };
    s._$addAssist = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.addAssist',
        param: [e, t],
        onload: this.__onAddAssist._$bind(this),
      });
    };
    s.__onAddAssist = function (e) {
      this._$dispatchEvent('onAddAssist', e);
    };
    s._$saveTermScoreRule = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocSettingBean.updateTermSetting',
          param: [e, t],
          onload: this.__onSaveTermScoreRule._$bind(this),
        });
    };
    s.__onSaveTermScoreRule = function (e) {
      this._$dispatchEvent('onSaveTermScoreRule', e);
    };
    s._$saveEvaluationDescriptionDraft = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocSettingBean.saveEvaluationDescriptionDraft',
          param: [e, t, i],
          onload: this.__onSaveEvaluationDescriptionDraft._$bind(this, i),
        });
    };
    s.__onSaveEvaluationDescriptionDraft = function (e, t) {
      this._$dispatchEvent('onSaveEvaluationDescriptionDraft', e, t);
    };
    s._$getTermScoreRule = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.getTermSetting',
        param: [e],
        onload: this.__onGetTermScoreRule._$bind(this),
      });
    };
    s.__onGetTermScoreRule = function (e) {
      this._$dispatchEvent('onGetTermScoreRule', e);
    };
    s._$getForumsByTerm = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.getForumsByTerm',
        param: [e],
        onload: this.__ongetForumsByTerm._$bind(this),
      });
    };
    s.__ongetForumsByTerm = function (e) {
      if (e) {
        var t = e[0];
        e[0] = e[1];
        e[1] = e[2];
        e[2] = t;
        if (e[4]) {
          t = e[4];
          e.splice(4, 1);
          e.splice(3, 0, t);
        }
        this._$dispatchEvent('ongetForumsByTerm', e);
      }
    };
    s._$manageForum = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.manageForum',
        param: [e, t],
        onload: this.__onmanageForum._$bind(this, t, e),
      });
    };
    s.__onmanageForum = function (e, t, i) {
      t.id = i;
      this._$dispatchEvent('onmanageForum', t, e);
    };
    s._$saveForumBase = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.saveForumBase',
        param: [e, t, i],
        onload: this.__onsaveForumBase._$bind(this, i, t),
      });
    };
    s.__onsaveForumBase = function (e, t, i) {
      if (1 == e) this._$dispatchEvent('onsaveForumBaseName', i, t);
      else this._$dispatchEvent('onsaveForumBaseDescription', i, t);
    };
    s._$publishTermForumSetting = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.publishTermForumSetting',
        param: [e],
        onload: this.__onpublishTermForumSetting._$bind(this),
      });
    };
    s.__onpublishTermForumSetting = function (e) {
      this._$dispatchEvent('onpublishTermForumSetting', e);
    };
    s._$updateForumClosedStatus = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.updateForumClosedStatus',
        param: [e],
        onload: this.__onupdateForumClosedStatus._$bind(this),
      });
    };
    s.__onupdateForumClosedStatus = function (e) {
      this._$dispatchEvent('onupdateForumClosedStatus', e);
    };
    s._$resetTermOrTest = function (e, t) {
      var i = 'term' == e ? 'TermDraftBean.resetTermDraft' : 'MocAdminQuizBean.resetTestDraft';
      this._$postDWR({
        key: r + o,
        url: i,
        param: [t],
        onload: this.__onResetTermOrTest._$bind(this),
      });
    };
    s.__onResetTermOrTest = function (e) {
      this._$dispatchEvent('onResetTermOrTest', e);
    };
    s._$getMemberInfo = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MemberBean.getMemberInfo',
        param: [e],
        onload: this.__onGetMemberInfo._$bind(this),
      });
    };
    s.__onGetMemberInfo = function (e) {
      this._$dispatchEvent('onGetMemberInfo', e);
    };
    s._$saveMemberEpayAccount = function (e) {
      this._$postDWR({
        key: r + o,
        param: [e],
        url: 'MemberBean.saveMemberEpayAccount',
        onload: this.__onsaveMemberEpayAccount._$bind(this),
      });
    };
    s.__onsaveMemberEpayAccount = function (e) {
      this._$dispatchEvent('onsaveMemberEpayAccount', e);
    };
    s._$checkMemberEpayAccountState = function () {
      this._$postDWR({
        key: r + o,
        url: 'MemberBean.checkMemberEpayAccountState',
        onload: this.__oncheckMemberEpayAccountState._$bind(this),
      });
    };
    s.__oncheckMemberEpayAccountState = function (e) {
      this._$dispatchEvent('oncheckMemberEpayAccountState', e);
    };
    s._$getScholarshipInfo = function () {
      this._$postDWR({
        key: r + o,
        url: 'MemberBean.getScholarshipInfo',
        onload: this.__onGetScholarshipInfo._$bind(this),
      });
    };
    s.__onGetScholarshipInfo = function (e) {
      this._$dispatchEvent('onGetScholarshipInfo', e);
    };
    s._$saveScholarshipInfo = function (e, t) {
      this._$postDWR({
        key: r + o,
        param: [e, t],
        url: 'MemberBean.saveReceiveScholarshipInfo',
        onload: this.__onSaveScholarshipInfo._$bind(this),
      });
    };
    s.__onSaveScholarshipInfo = function (e) {
      this._$dispatchEvent('onSaveScholarshipInfo', e);
    };
    s._$getObjectScoreRuleByTestId = function (e, t) {
      this._$postDWR({
        key: r + o,
        param: [e, t],
        url: 'MocAdminQuizBean.getObjectScoreRuleByTestId',
        onload: this.__onGetObjectScoreRuleByTestId._$bind(this),
      });
    };
    s.__onGetObjectScoreRuleByTestId = function (e) {
      this._$dispatchEvent('onGetObjectScoreRuleByTestId', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
