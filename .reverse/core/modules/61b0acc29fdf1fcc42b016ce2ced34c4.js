EDU(
  '61b0acc29fdf1fcc42b016ce2ced34c4',
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
    n._$memberVerify = function (t, n) {
      e._$request(i('/web/j/MocSchoolBean.memberVerify.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: n,
      });
    };
  },
  '8a864b627c302d7d1c56bd928b515d1b',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
