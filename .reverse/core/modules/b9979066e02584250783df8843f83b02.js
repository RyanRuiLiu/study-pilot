EDU(
  'b9979066e02584250783df8843f83b02',
  function (e, t, n) {
    var i = e.$extends({ name: 'ux-notify', css: n, template: t });
    var o = new i();
    var a = ['show', 'close', 'closeAll', 'success', 'warning', 'info', 'error', 'setPosition'];
    i.notify = o;
    i.METHODS = a;
    a.forEach(function (e) {
      i[e] = o[e].bind(o);
    });
    return i;
  },
  'b0b9bd51e4e784fd239aaa6452d198e5',
  '0b44add97b3869162244838eb9e53e6f',
  '80e2404dd42121690b289f5c8dc95536',
);
