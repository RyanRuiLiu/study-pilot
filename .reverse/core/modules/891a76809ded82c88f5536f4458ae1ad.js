EDU(
  '891a76809ded82c88f5536f4458ae1ad',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      r,
      s = 'ck-termSettingsCache';
    i._$$COM_Cache_MemberCache = NEJ.C();
    r = i._$$COM_Cache_MemberCache._$extend(i._$$COM_Cache);
    r._$getSchools = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.getSchools',
        param: [e],
        onload: this.__onGetSchools._$bind(this),
      });
    };
    r.__onGetSchools = function (e) {
      this._$dispatchEvent('onGetSchools', e);
    };
    r._$getDepartment = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.getDepartment',
        param: [e, t],
        onload: this.__onGetDepartment._$bind(this),
      });
    };
    r.__onGetDepartment = function (e) {
      this._$dispatchEvent('onGetDepartment', e);
    };
    r._$updateMocMember = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.updateMocMember',
        param: [e],
        onload: t && 'function' == typeof t ? t : this.__onUpdateMocMember._$bind(this),
      });
    };
    r.__onUpdateMocMember = function (e) {
      this._$dispatchEvent('onUpdateMocMember', e);
    };
    r._$getMocMember = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.getMocMember',
        param: [e],
        onload: t && 'function' == typeof t ? t : this.__onGetMocMember._$bind(this),
      });
    };
    r.__onGetMocMember = function (e) {
      this._$dispatchEvent('onGetMocMember', e);
    };
    r._$getKeyMailOfMocMember = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.getMocMember',
        sync: !0,
        param: [e],
        onload: this.__onGetKeyMailOfMocMember._$bind(this),
      });
    };
    r.__onGetKeyMailOfMocMember = function (e) {
      this._$dispatchEvent('onGetKeyMailOfMocMember', e);
    };
    r._$isNickNameValid = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.isNickNameValid',
        param: [e],
        notShowLoading: !0,
        onload: t && 'function' == typeof t ? t : this.__onisNickNameValid._$bind(this),
      });
    };
    r.__onisNickNameValid = function (e) {
      this._$dispatchEvent('onisNickNameValid', e);
    };
    r._$isOtherNickNameValid = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.isOtherNickNameValid',
        notShowLoading: !0,
        param: [e, t],
        onload: this.__onisOtherNickNameValid._$bind(this),
      });
    };
    r.__onisOtherNickNameValid = function (e) {
      this._$dispatchEvent('onisOtherNickNameValid', e);
    };
    r._$checkEmailStatus = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.checkEmailStatus',
        sync: !0,
        param: [],
        onload: 'function' == typeof e ? e : this.__onCheckEmailStatus._$bind(this),
      });
    };
    r.__onCheckEmailStatus = function (e) {
      this._$dispatchEvent('onCheckEmailStatus', e);
    };
    r._$saveEmail = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.saveEmail',
        param: [e],
        onload: t && 'function' == typeof t ? t : this.__onsaveEmail._$bind(this, e),
      });
    };
    r.__onsaveEmail = function (e, t) {
      this._$dispatchEvent('onsaveEmail', e, t);
    };
    r._$sendActiveEmail = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'MemberBean.sendActiveEmail',
        param: [],
        onload: t && 'function' == typeof t ? t : this.__onsendActiveEmail._$bind(this, e),
      });
    };
    r.__onsendActiveEmail = function (e, t) {
      this._$dispatchEvent('onsendActiveEmail', t, e);
    };
    return r;
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  'fe86216ed59e3103a56c42c850d389f0',
);
