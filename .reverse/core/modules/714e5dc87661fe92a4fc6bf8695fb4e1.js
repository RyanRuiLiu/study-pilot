EDU(
  '714e5dc87661fe92a4fc6bf8695fb4e1',
  function (e) {
    e.dom.getPosition = function (e) {
      var t = e && e.ownerDocument,
        n = t.documentElement,
        i = t.body;
      var o = e.getBoundingClientRect ? e.getBoundingClientRect() : { top: 0, left: 0 };
      var a = n.clientTop || i.clientTop || 0,
        r = n.clientLeft || i.clientLeft || 0;
      return { top: o.top - a, left: o.left - r };
    };
    e.dom.getOffset = function (e) {
      return { width: e.clientWidth, height: e.clientHeight };
    };
    e.dom.getDimension = function (t) {
      return e.extend(e.dom.getOffset(t), e.dom.getPosition(t));
    };
    return e;
  },
  '217dcfc103efb36d2f192eecc4548797',
);
