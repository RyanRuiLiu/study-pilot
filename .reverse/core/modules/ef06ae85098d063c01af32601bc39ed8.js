EDU('ef06ae85098d063c01af32601bc39ed8', function (e, t, n, i) {
  e.__formatOrigin = (function () {
    var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
    return function (t) {
      t = t || '';
      if (e.test(t)) return RegExp.$1;
      else return '*';
    };
  })();
  e.__formatPassData = function (e) {
    var t = 0;
    if (
      /msie\s+(.*?);/i.test(navigator.userAgent) ||
      /trident\/.+rv:([\d\.]+)/i.test(navigator.userAgent)
    )
      t = parseInt(RegExp.$1);
    if (t && t < 10 && t > 7) return JSON.stringify(e);
    else return e;
  };
  e.__postMessage = function (n, i) {
    if (n.postMessage) {
      i = i || t;
      n.postMessage(e.__formatPassData(i.data), e.__formatOrigin(i.origin));
    }
  };
  return e;
});
