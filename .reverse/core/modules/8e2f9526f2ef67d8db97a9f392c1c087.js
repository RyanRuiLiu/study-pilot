EDU(
  '8e2f9526f2ef67d8db97a9f392c1c087',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      r,
      s = 'ck-CommonCache';
    i._$$COM_Cache_CommonCache = NEJ.C();
    r = i._$$COM_Cache_CommonCache._$extend(i._$$COM_Cache);
    r._$getThreadStatusByThreadId = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.getThreadStatusByThreadId',
        param: [e],
        notShowLoading: !0,
        onload: this.__onGetThreadStatusByThreadId._$bind(this),
      });
    };
    r.__onGetThreadStatusByThreadId = function (e) {
      this._$dispatchEvent('onGetThreadStatusByThreadId', e);
    };
    r._$checkAccountStatus = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'CommonBean.checkAccountStatus',
        param: [e],
        notShowLoading: !0,
        onload: this.__onCheckAccountStatus._$bind(this),
      });
    };
    r.__onCheckAccountStatus = function (e) {
      this._$dispatchEvent('onCheckAccountStatus', e);
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
);
