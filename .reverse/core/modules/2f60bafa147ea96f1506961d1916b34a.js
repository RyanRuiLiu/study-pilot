EDU(
  '2f60bafa147ea96f1506961d1916b34a',
  function (e, t, n) {
    function i(e) {
      if (!o)
        window.initWatchman &&
          initWatchman({
            productNumber: a.PRODUCT_NUMBER,
            onload: function (t) {
              o = t;
              if (e) e();
            },
          });
    }
    var o = null;
    var a = { BUSINESS_ID: '243feee3b0fb4ed9a9aef3b898449dfb', PRODUCT_NUMBER: 'YD00001080157141' };
    n.init = i;
    n.getToken = function (e) {
      if (!o)
        i(function () {
          o.getToken(a.BUSINESS_ID, e);
        });
      else o.getToken(a.BUSINESS_ID, e);
    };
    n.requestWithToken = function (n, i, o) {
      this.getToken(function (a) {
        var r = e._$merge(t._$deepCopy(i), { token: a });
        n(r, o);
      });
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
);
