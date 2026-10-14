EDU(
  'de71aaa4f77ef1f13ed8ee8014eef1b1',
  function (e, t, n) {
    var i = window,
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.u'),
      r = NEJ.P('edu.r'),
      s = NEJ.P('nej.e'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('nej.v');
    d._$addEvent(
      document.body,
      'click',
      function (e) {
        var t = e.pageY || e.y;
        var n = document.body.scrollHeight;
        var o = d._$getElement(e, 'c:ga-click'),
          r,
          c,
          l;
        if (o) {
          var u = '';
          if (t && n) u = Math.round(t / n) + '%';
          r = s._$dataset(o, 'action') || o.innerText.replace(/[\r\n| ]/g, '') + '点击';
          var _ = '未登录';
          if (a._$isUserLogin()) _ = '已登录';
          c = s._$dataset(o, 'label') || '{登陆状态:' + _ + ',当前url:' + location.href + '}';
          l = s._$dataset(o, 'cate') || i.gaCate || '未设置GA类别';
          if (l && r && c) a._$trackEvent(l, r, c);
        }
      }._$bind(this),
      !1,
    );
    o._$log2Study = function (i, o, a) {
      var r, s;
      if (a) {
        r = i + '_' + o;
        s = e.extend({ action: r }, a);
        t._$request({
          url: '//log.study.163.com/__utm.gif',
          method: 'get',
          data: { dt: n._$str2hex(JSON.stringify(s)), p: 'mooc' },
          notShowLoading: !0,
          hideError: !0,
        });
      }
    };
    return o._$log2Study;
  },
  '06a1fe998ca2ede601d4740c114f6c3c',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  'af8805404cc0bd2b95d3d3c9573484b1',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
