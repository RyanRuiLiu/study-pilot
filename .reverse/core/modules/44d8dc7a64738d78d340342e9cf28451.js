EDU(
  '44d8dc7a64738d78d340342e9cf28451',
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
  'a05586e8b7ed90b0a1483eda64d79950',
  'a29eaa6a9ccc9bfd703afadd6da18ea7',
);
