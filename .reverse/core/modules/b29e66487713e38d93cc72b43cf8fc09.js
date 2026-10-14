EDU(
  'b29e66487713e38d93cc72b43cf8fc09',
  function (e, t, n) {
    function i(e) {
      if (e) {
        if (!t._$cookie('NTESSTUDYSI'));
        var n = e.split('#')[0];
        if (/\?/g.test(n)) n += '&csrfKey=' + t._$cookie('NTESSTUDYSI');
        else n += '?csrfKey=' + t._$cookie('NTESSTUDYSI');
        if (e.split('#')[1]) n += e.split('#')[1];
        return n;
      }
    }
    n._$getResourceToken = function (t, n, o) {
      e._$request(i('/web/j/resourceRpcBean.getResourceTokenV2.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: n,
        onerror: o,
      });
    };
    n._$getResourceVideoTokenWithAuth = function (t, n, o) {
      e._$request(i('/web/j/resourceRpcBean.getResourceVideoTokenWithAuth.rpc'), {
        method: 'post',
        type: 'json',
        cookie: !0,
        data: t,
        onload: n,
        onerror: o,
      });
    };
    n._$getLiveVideoResourceTokenWithAuthForUnit = function (t, n, o) {
      e._$request(i('/web/j/resourceRpcBean.getLiveVideoResourceTokenWithAuthForUnit.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: n,
        onerror: o,
      });
    };
    n._$getResourceVideoTokenWithPersonal = function (t, n, o) {
      e._$request(i('/web/j/resourceRpcBean.getResourceVideoTokenWithPersonal.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: n,
        onerror: o,
      });
    };
  },
  '8a864b627c302d7d1c56bd928b515d1b',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
