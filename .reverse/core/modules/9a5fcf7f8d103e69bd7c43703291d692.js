EDU(
  '9a5fcf7f8d103e69bd7c43703291d692',
  function (e, t, n, i, o, a) {
    var r = window;
    var s = {};
    a._$fileUploadByForm = function (n) {
      var a = n.form;
      if (a) {
        if (!n.key) n.key = e._$randNumberString();
        s[n.key] = s[n.key] || {};
        s[n.key].options = n;
        t._$getByClassName(a, 'j-noskey')[0].value = n.nosKey;
        t._$getByClassName(a, 'j-xnostoken')[0].value = n.xNosToken;
        var r = function (e) {
          n.onload(e);
        };
        var c = function (e) {
          n.onerror({
            errCode: i['ERROR_CODE_NOS_UPLOAD_FORM_NETWORK_ERROR'],
            errMsg: 'nos form upload network error',
          });
        };
        var d = {
          type: 'json',
          mode: n.mode,
          method: 'POST',
          cookie: !1,
          headers: {},
          onload: r._$bind(this),
          onerror: c._$bind(this),
        };
        a.action = i.NOS_FORM_UPLOAD_URL + '/' + n.bucket;
        s[n.key].reqId = o._$upload(a, d);
        return n.key;
      }
    };
    a._$abortFileUploadByForm = function (e) {
      if (s[e]) {
        o._$abort(s[e].reqId);
        s[e] = null;
      }
    };
    return a;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '66c2ed70c8e5c5a6817eb8911f02fa45',
  '8a864b627c302d7d1c56bd928b515d1b',
);
