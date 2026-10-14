EDU(
  '7b513668ff4875f67ec0a62dd912ded0',
  function (e, t, n, i, o, a, r, s, c) {
    var d;
    a._$$PageFragment = t._$klass();
    d = a._$$PageFragment._$extend(o._$$PageAbstract);
    d.__init = function () {
      this.__ndot = [];
      this.__super();
    };
    d.__destroy = function () {
      this.__super();
      this.__doRecycleDotNode();
    };
    d.__doRecycleDotNode = (function () {
      var e = function (e, t, i) {
        n._$remove(e);
        i.splice(t, 1);
      };
      return function () {
        i._$reverseEach(this.__ndot, e);
      };
    })();
    d.__doRefreshPage = function () {
      this.__extdata = { last: !1, first: !1, list: this.__list };
      this.__doRecycleDotNode();
      this.__doSetNodeIndex(this.__list[0], 1);
      var e = 1,
        t = this.__list.length;
      if (!(this.__total < t)) {
        if (this.__index > 1) {
          var i = Math.floor((t - 2) / 2),
            o = this.__total - t + 2,
            a = Math.max(2, this.__index - i);
          if (this.__total >= t) a = Math.min(a, o);
          if (a > 2) {
            var r = n._$create('span', 'zdot');
            this.__ndot.push(r);
            r.innerText = '...';
            this.__list[0].insertAdjacentElement('afterEnd', r);
            this.__extdata.first = !0;
          }
          for (var s; ; e++) {
            s = a + e - 1;
            if (s > this.__index) break;
            this.__doSetNodeIndex(this.__list[e], s);
          }
        }
        if (this.__index < this.__total) {
          var s,
            a = this.__index + 1;
          for (var c = 0, d = t - 2; ; c++, e++) {
            s = a + c;
            if (e > d || s > this.__total) break;
            this.__doSetNodeIndex(this.__list[e], s);
          }
          if (s < this.__total) {
            var r = n._$create('span', 'zdot');
            this.__ndot.push(r);
            r.innerText = '...';
            this.__list[e].insertAdjacentElement('beforeBegin', r);
            this.__extdata.last = !0;
          }
          if (s <= this.__total) this.__doSetNodeIndex(this.__list[e++], this.__total);
        }
        for (; e < t; e++) this.__doSetNodeIndex(this.__list[e]);
      } else
        for (var l; e < t; e++) {
          l = e + 1;
          this.__doSetNodeIndex(this.__list[e], l > this.__total ? null : l);
        }
    };
    if (!0) e.P('nej.ut')._$$Page = a._$$PageFragment;
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '52cbe4ed9048c5bebf9d1b8750646854',
);
