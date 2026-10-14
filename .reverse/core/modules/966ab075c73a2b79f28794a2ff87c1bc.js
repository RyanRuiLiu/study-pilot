EDU(
  '966ab075c73a2b79f28794a2ff87c1bc',
  function (e, t, n, i, o, a, r, s, c) {
    var d;
    a._$$Pager = t._$klass();
    d = a._$$Pager._$extend(i._$$AbstractPager);
    d.__reset = function (e) {
      e.number = parseInt(e.number) || 9;
      this.__super(e);
      this.__page = o._$$PageFragment._$allocate(this.__popt);
    };
    d.__onChange = function (e) {
      if (this.__bopt.noend) {
        var t = e.ext || r,
          i = t.list || c;
        if (t.last) n._$setStyle(i[i.length - 1], 'display', 'none');
      }
      this.__super(e);
    };
    if (!0) e.copy(e.P('nej.ui'), a);
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '8dba0aad6fcea9190488f969bb87e078',
  '7b513668ff4875f67ec0a62dd912ded0',
);
