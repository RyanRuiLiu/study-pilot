EDU(
  '9d279df4af180d366f079ab901224cbc',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = i._$randNumberString(),
      s,
      r = 'ck-termNoticeCache';
    n._$$COM_Cache_TermNoticeCache = NEJ.C();
    s = n._$$COM_Cache_TermNoticeCache._$extend(n._$$COM_Cache);
    s._$saveOrPublishAnnouncement = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.saveOrPublishAnnouncement',
        param: [e, t, i],
        onload: this.__onSaveOrPublishAnnouncement._$bind(this, i),
      });
    };
    s.__onSaveOrPublishAnnouncement = function (e, t) {
      this._$dispatchEvent('onSaveOrPublishAnnouncement', { data: t, isDraft: e });
    };
    s._$checkAnnouncementDuplicate = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.checkAnnouncementDuplicate',
        param: [e, t, i],
        onload: this.__onCheckAnnouncementDuplicate._$bind(this),
      });
    };
    s.__onCheckAnnouncementDuplicate = function (e) {
      this._$dispatchEvent('onCheckAnnouncementDuplicate', e);
    };
    s._$getAllAnnouncementByTerm = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.getAllAnnouncementByTerm',
        param: [e, t],
        onload: this.__onGetAllAnnouncementByTerm._$bind(this),
      });
    };
    s.__onGetAllAnnouncementByTerm = function (e) {
      this._$dispatchEvent('onGetAllAnnouncementByTerm', e);
    };
    s._$getAllAnnouncementByTermFront = function (e, t, i) {
      var n = i
        ? 'PublishCourseBean.getAllAnnouncementByTerm'
        : 'CourseBean.getAllAnnouncementByTerm';
      this._$postDWR({
        key: r + o,
        url: n,
        replaceDisable: !0,
        param: [e, t],
        onload: this.__onGetAllAnnouncementByTerm._$bind(this),
      });
    };
    s.__onGetAllAnnouncementByTerm = function (e) {
      this._$dispatchEvent('onGetAllAnnouncementByTerm', e);
    };
    s._$deleteAnnouncementById = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.deleteAnnouncementById',
        param: [e],
        onload: this.__onDeleteAnnouncementById._$bind(this),
      });
    };
    s.__onDeleteAnnouncementById = function (e) {
      this._$dispatchEvent('onDeleteAnnouncementById', e);
    };
    s._$getMixedForumAnnouncementByTerm = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'CourseBean.getMixedForumAnnouncementByTerm',
        param: [e, t],
        onload: this.__onGetMixedForumAnnouncementByTerm._$bind(this),
      });
    };
    s.__onGetMixedForumAnnouncementByTerm = function (e) {
      this._$dispatchEvent('onGetMixedForumAnnouncementByTerm', e);
    };
    s._$getIndependentMailDtos = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.getMocTermMailDtos',
        param: [e, t, i],
        onload: this.__onGetIndependentMailDtos._$bind(this),
      });
    };
    s.__onGetIndependentMailDtos = function (e) {
      this._$dispatchEvent('onGetIndependentMailDtos', e);
    };
    s._$sendTermMail = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.sendTermMail',
        param: [e],
        onload: this.__onSendTermMail._$bind(this),
      });
    };
    s.__onSendTermMail = function (e) {
      this._$dispatchEvent('onSendTermMail', e);
    };
    s._$checkTermMailDuplicate = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.checkTermMailDuplicate',
        param: [e],
        onload: this.__onCheckTermMailDuplicate._$bind(this),
      });
    };
    s.__onCheckTermMailDuplicate = function (e) {
      this._$dispatchEvent('onCheckTermMailDuplicate', e);
    };
    s._$saveTermMailDraft = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.saveTermMailDraft',
        param: [e],
        onload: this.__onSaveTermMailDraft._$bind(this),
      });
    };
    s.__onSaveTermMailDraft = function (e) {
      this._$dispatchEvent('onSaveTermMailDraft', e);
    };
    s._$getSuggestMember = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocSearchBean.getSuggestMember',
        param: [e, t],
        onload: this.__onGetSuggestMember._$bind(this),
      });
    };
    s.__onGetSuggestMember = function (e) {
      this._$dispatchEvent('onGetSuggestMember', e);
    };
    s._$getMemberByName = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocSearchBean.getMemberByName',
        param: [e, t],
        onload: this.__onGetMemberByName._$bind(this),
      });
    };
    s.__onGetMemberByName = function (e) {
      this._$dispatchEvent('onGetMemberByName', e);
    };
    s._$deleteMocMail = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.deleteMocMail',
        param: [e],
        onload: this.__onDeleteMocMail._$bind(this),
      });
    };
    s.__onDeleteMocMail = function (e) {
      this._$dispatchEvent('onDeleteMocMail', e);
    };
    s._$getMocTermAutoMail = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.getMocTermMailTemplate',
        param: [e, t],
        onload: this.__onGetMocTermAutoMail._$bind(this),
      });
    };
    s.__onGetMocTermAutoMail = function (e) {
      this._$dispatchEvent('onGetMocTermAutoMail', e);
    };
    s._$updatetMocTermAutoMail = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.updateMocTermMailTemplate',
        param: [e],
        onload: this.__onUpdatetMocTermAutoMail._$bind(this),
      });
    };
    s.__onUpdatetMocTermAutoMail = function (e) {
      this._$dispatchEvent('onUpdatetMocTermAutoMail', e);
    };
    s._$getMocTermScoreRank = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMocTermScoreRank',
        param: [e],
        onload: this.__onGetMocTermScoreRank._$bind(this),
      });
    };
    s.__onGetMocTermScoreRank = function (e) {
      this._$dispatchEvent('onGetMocTermScoreRank', e);
    };
    s._$getScholarshipRecord = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getScholarshipRecord',
        param: [e],
        onload: this.__onGetScholarshipRecord._$bind(this),
      });
    };
    s.__onGetScholarshipRecord = function (e) {
      this._$dispatchEvent('onGetScholarshipRecord', e);
    };
    s._$updateMocScholarshipRecord = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.updateMocScholarshipRecord',
        param: [e],
        onload: this.__onUpdateMocScholarshipRecord._$bind(this),
      });
    };
    s.__onUpdateMocScholarshipRecord = function (e) {
      this._$dispatchEvent('onUpdateMocScholarshipRecord', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
