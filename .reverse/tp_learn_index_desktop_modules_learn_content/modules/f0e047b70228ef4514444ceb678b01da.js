EDU(
  'f0e047b70228ef4514444ceb678b01da',
  function (e) {
    function t(e) {
      var t = [];
      this.push = function n(i) {
        var o = t.indexOf(i);
        if (o >= 0) t.splice(o, 1);
        t.push(i);
        if (t.length > e) t.shift().destroy();
      };
      this.resize = function (n) {
        e = n;
        for (; t.length > e;) t.shift().destroy();
      };
    }
    if ('ie' == e._$KERNEL.browser && e._$KERNEL.version <= 9) t.DEFAULT_CACHE_SIZE = 3;
    else t.DEFAULT_CACHE_SIZE = 10;
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
);
