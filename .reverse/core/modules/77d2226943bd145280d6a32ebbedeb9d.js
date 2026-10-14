EDU(
  '77d2226943bd145280d6a32ebbedeb9d',
  function (e, t, n, i, o, a) {
    n.requestAnimationFrame = function () {
      t.__requestAnimationFrame.apply(null, arguments);
    };
    n.cancelAnimationFrame = function () {
      t.__cancelAnimationFrame.apply(null, arguments);
    };
    if (!0) {
      if (!this.requestAnimationFrame) this.requestAnimationFrame = n.requestAnimationFrame;
      if (!this.cancelAnimationFrame) this.cancelAnimationFrame = n.cancelAnimationFrame;
    }
    return n;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  '5137809492159f12fce8b43dc7a77b23',
);
