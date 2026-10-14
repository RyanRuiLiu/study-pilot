EDU(
  '709a1ca4461db8be476800647eb950cf',
  function (e, t, i) {
    var n = new e();
    i.getPhoneAccountNumber = function (e) {
      n._$getBindInfo(function (i) {
        e(i && i[t.LOGINTYPE.PHONE]);
      });
    };
  },
  '865bba476606f3b1d5979bffa92980b6',
  '93828627ddb358ed890cb65967a0c1de',
);
