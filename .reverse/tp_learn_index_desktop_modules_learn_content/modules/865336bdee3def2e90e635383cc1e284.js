EDU(
  '865336bdee3def2e90e635383cc1e284',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.P('edu.u');
    n._$formatNum = function (e) {
      e = parseInt(e || 0);
      var t = null;
      var n = '';
      var i = e >= 0 ? '' : '-';
      e = Math.abs(e);
      if (e < 1e3) n = '' + e;
      else if (e < 1e6) {
        t = Math.floor((e % 1e3) / 100);
        e = Math.floor(e / 1e3);
        n = e >= 10 ? e + 'k' : t > 0 ? e + '.' + t + 'k' : e + 'k';
      } else {
        e /= 1e3;
        t = Math.floor((e % 1e3) / 100);
        e = Math.floor(e / 1e3);
        n = e >= 10 ? e + 'm' : t > 0 ? e + '.' + t + 'm' : e + 'm';
      }
      return i + n;
    };
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
