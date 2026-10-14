EDU(
  '36cf3daba8bd3958bf230dc3ddbfcbec',
  function (
    e,
    t,
    n,
    i,
    o,
    a,
    r,
    s,
    c,
    d,
    l,
    u,
    _,
    f,
    h,
    p,
    m,
    g,
    b,
    v,
    E,
    x,
    w,
    C,
    y,
    $,
    I,
    T,
    S,
    A,
  ) {
    var N = [];
    var O = [];
    var L = function (t) {
      N = [];
      if (t.useNative) {
        N.push(d);
        N.push(l);
        N.push(c);
        if ('live' == t.mode) N.push(s);
        else N.push(r);
        return N;
      }
      if (O.length)
        for (var v = 0; v < O.length; v++)
          if (O[v] && e._$isFunction(O[v])) {
            var I = O[v](t);
            if (I._$super == n) N.push(I);
            else console.error('custom class is not extends from base component');
          }
      if ($.isMobileNotIncludeIPad()) {
        N.push(h);
        if ('live' == t.mode) N.push(x);
        else {
          N.push(g);
          N.push(b);
        }
        N.push(E);
        N.push(C);
      } else {
        if ('live' == t.mode) N.push(w);
        else N.push(m);
        if (t.useFullscreenSegmentComponent) N.push(o);
        if (t.useFullscreenAIAssistant) N.push(i);
        N.push(u);
        N.push(p);
        N.push(E);
        N.push(C);
        N.push(y);
      }
      N.push(a);
      N.push(_);
      N.push(f);
      N.push(d);
      N.push(l);
      N.push(c);
      if ('live' == t.mode) N.push(s);
      else N.push(r);
      return N;
    };
    var D = function (e) {
      O.push(e);
    };
    return { get: L, add: D };
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'beec6201069596ecb83a09e5fc3eb415',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'b96bb7721f3fe1a828f0436373f38b56',
  'f7e1d12421d09a6f5b00dc60a4e0f325',
  '1a228bb0cf4273cf344c18e299ffc8db',
  '6693f1561a8c0e703015162d34bdd4b6',
  'd1d67569cf2a573e07caf66240368108',
  'f3ed5a709f05344e3fa424e5db7ef2b4',
  'a508cc68f94c8b40cb5b00c55365745f',
  '34a09cbad8b068d9f93c8504f0ce8a18',
  '82d8e9ab89ae731ef63d88419d9bb26a',
  '12ae07c790f722e4c20eab5c8922d5fc',
  '6e4699f61a845f3d3c46fa78b694be93',
  '247c72aa6c507ef070dc63f0edd8d0a8',
  '044e08db51d3c94f056a9988048f84ca',
  '12b72d4a2615385d0ae005e51c1e7399',
  'a15ec49bf0e436d5537ba8a48da8ff80',
  '19803d3da600e0ad4f0fa1485fb92e5f',
  '70ba1ea19c0beb2d4038a1a14ce700b7',
  '4b327640358fcd6bb70717b9f8422769',
  '4d5c78bd9e143e5b5feaeb2562cff080',
  '35c159d1128b972af3bbf7c5f61a2155',
  'db89380e7babfdb305a11d017d2001db',
  '552be1c6dfd53a39b92d1a8cfb50646e',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
);
