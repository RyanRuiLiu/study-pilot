EDU(
  '3b4542f6c69db6c4ad7d25311949d774',
  function (e, t, n, i, o, a, r, s, c) {
    var d;
    a._$$CardCommand = t._$klass();
    d = a._$$CardCommand._$extend(o._$$EditorCommand);
    d.__init = function () {
      this.__fopt = {
        destroyable: !0,
        parent: document.body,
        onchange: this.__onChange._$bind(this),
      };
      this.__super();
    };
    d.__onChange = s;
    d.__doShowCard = s;
    d._$execute = function (e) {
      i._$dispatchEvent(document, 'click');
      var t = e.target,
        o = n._$offset(t);
      this.__fopt.top = o.y + t.offsetHeight + 1;
      this.__fopt.left = o.x - 1;
      this.__fopt.width = t.clientWidth;
      this.__doShowCard();
    };
    if (!0) e.copy(e.P('nej.ut.cmd'), a);
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '556895e605286d88413183fe0c170cd7',
);
