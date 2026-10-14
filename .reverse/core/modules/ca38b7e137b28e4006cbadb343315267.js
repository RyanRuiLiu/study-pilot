EDU('ca38b7e137b28e4006cbadb343315267', function () {
  if ('undefined' != typeof module && module.exports) Regular = require('regularjs');
  Regular.prototype.$once = function (e, t) {
    var n = function () {
      t && t.apply(this, arguments);
      this.$off(e, n);
    };
    this.$on(e, n);
  };
  var e = {
    noop: Regular.util.noop,
    dom: Regular.dom,
    multiline: function (e) {
      var t = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
      return t.exec(e)[1];
    },
  };
  e.extend = function (e, t, n, i) {
    for (var o in t) if ((!i || t.hasOwnProperty(o)) && (n || void 0 === e[o])) e[o] = t[o];
    return e;
  };
  e.dom.emit = function (e, t, n) {
    if (e.dispatchEvent) {
      var i = new CustomEvent(t, { detail: n });
      e.dispatchEvent(i);
    } else {
      var i = document.createEventObject();
      i.detail = n;
      e.fireEvent('on' + t, i);
    }
  };
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
  e.dom.getDimension = function (t, n) {
    return e.extend(e.dom.getOffset(t), e.dom.getPosition(t, n));
  };
  e.dom.isInRect = function (e, t) {
    if (!e || !t) return !1;
    else
      return (
        e.left > t.left && e.left < t.left + t.width && e.top > t.top && e.top < t.top + t.height
      );
  };
  e.dom.once = function (t, n, i) {
    function o() {
      i.apply(this, arguments);
      e.dom.off(t, n, o);
    }
    e.dom.on(t, n, o);
  };
  return e;
});
