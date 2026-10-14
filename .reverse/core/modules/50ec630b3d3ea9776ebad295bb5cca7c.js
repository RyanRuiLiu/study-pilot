EDU(
  '50ec630b3d3ea9776ebad295bb5cca7c',
  function (e, t, n, i, o, a, r, s) {
    o._$postMessage = (function () {
      var e = window.name || '_parent',
        o = { _top: window.top, _self: window, _parent: window.parent };
      return function (r, s) {
        if (t._$isString(r)) {
          r = o[r] || window.frames[r] || (n._$get(r) || a).contentWindow;
          if (!r) return;
        }
        var c = t._$fetch({ data: null, origin: '*', source: e }, s);
        i.__postMessage(r, c);
      };
    })();
    if (!0) e.copy(e.P('nej.j'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '99465cb59a5fd0dfd3186c356e3f04b9',
);
