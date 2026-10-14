EDU(
  '08d2f36062baca2c8eb8327afd74d88c',
  function (e, t, n) {
    n = t;
    n._$formatTime2long = function (e) {
      var t = new Date();
      t.setFullYear(+e.split('-')[0]);
      t.setMonth(+e.split('-')[1]);
      t.setDate(+e.split('-')[2].split(' ')[0]);
      t.setHours(+e.split('-')[2].split(' ')[1].split(':')[0]);
      t.setMinutes(+e.split('-')[2].split(' ')[1].split(':')[1]);
      return t.getTime();
    };
    n.addZero = function (e) {
      return +e < 10 ? '0' + e : e;
    };
    n.formatTiktokTime = function (e, n) {
      var i = t._$tiktok(e, n);
      if (!i) return null;
      var o = this.addZero(i.h);
      var a = this.addZero(i.m);
      var r = this.addZero(i.s);
      if (i.d >= 1) return i.d + '天 ' + o + ':' + a + ':' + r;
      else if (i.h >= 1) return o + ':' + a + ' :' + r;
      else if (i.m >= 1) return a + ': ' + r + ':';
      else return r + '';
    };
    NEJ.copy(NEJ.P('edu.u'), n);
    return n;
  },
  'a225fd9e6aba8ca4ae39f96771726601',
  '89a466f05573f560c156411121b8daae',
);
