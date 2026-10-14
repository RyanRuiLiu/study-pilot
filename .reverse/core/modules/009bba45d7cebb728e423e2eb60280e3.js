EDU(
  '009bba45d7cebb728e423e2eb60280e3',
  function (e) {
    var t = {},
      n = (function () {
        return this;
      })();
    t._$isEmail = function (e) {
      return /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/.test(e);
    };
    t._$isPhone = function (e) {
      return /^1\d{10}$/.test(e);
    };
    t._$isTel = function (e) {
      return /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(
        e,
      );
    };
    t._$isPositiveNum = function (e) {
      return /^[1-9]\d*$/.test(e);
    };
    t._$isQQ = function (e) {
      return /^[1-9][0-9]{3,11}$/.test(e);
    };
    return t;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
