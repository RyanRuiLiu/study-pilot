EDU(
  '63e959d261c0f61c7cc410b71b0a2a2b',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = n._$randNumberString(),
      a,
      r = 'ck-uploadCache';
    i._$$COM_Cache_UploadCache = NEJ.C();
    a = i._$$COM_Cache_UploadCache._$extend(i._$$COM_Cache);
    a._$getUploaderToken = function (e, t) {
      switch (e) {
        case 1:
          var n = 'FileUploaderBean.getUploaderTokenByType';
          var i = [t];
          break;
        case 2:
          var n = 'FileUploaderBean.getUploaderTokenAndPublicBucket';
          var i = [];
          break;
        case 3:
          var n = 'FileUploaderBean.getUploaderTokenWithNoLogon';
          var i = [];
      }
      this._$postDWR({ key: r + o, url: n, param: i, onload: this.__ongetToken._$bind(this) });
    };
    a.__ongetToken = function (e) {
      this._$dispatchEvent('ongetToken', e);
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
