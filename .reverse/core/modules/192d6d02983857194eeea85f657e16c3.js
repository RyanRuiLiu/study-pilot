EDU(
  '192d6d02983857194eeea85f657e16c3',
  function (e, t, n, i, o, a) {
    var r = location.pathname;
    var s = {};
    var c = function (e) {
      var t = 0 === (r || location.pathname).indexOf('/learn');
      var n = e && e['isTrusted'];
      return !t || n;
    };
    var d = function (e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      return null;
    };
    var l = function (e) {
      return Array.prototype.slice.call(e);
    };
    n.__checkEvent = (function () {
      var e = { touchstart: 'mousedown', touchmove: 'mousemove', touchend: 'mouseup' },
        n = t._$KERNEL.prefix,
        i = {
          transitionend: 'TransitionEnd',
          animationend: 'AnimationEnd',
          animationstart: 'AnimationStart',
          animationiteration: 'AnimationIteration',
          visibilitychange: 'visibilitychange',
          fullscreenchange: 'fullscreenchange',
        };
      var o = {
        enter: function (e, t, n) {
          var i = { type: 'keypress' };
          if (n)
            i.handler = function (t) {
              if (13 === t.keyCode) n.call(e, t);
            };
          return i;
        },
      };
      var a = function (e) {
        return (n.evt || n.pro) + e;
      };
      return function (t, n, r) {
        var s = { type: n, handler: r };
        if (!('on' + n in t)) {
          var c = e[n];
          if (c) {
            s.type = c;
            return s;
          }
          var c = i[n];
          if (c) {
            s.type = a(c);
            return s;
          }
          var d = o[n];
          if (d) return d.apply(null, arguments);
        }
        return s;
      };
    })();
    n.__addEvent = function () {
      var e = arguments;
      if (!1)
        if (!('on' + e[1] in e[0])) console.log('not support event[' + e[1] + '] for ' + e[0]);
      var t = function (t) {
        return e[2].apply(this, l(arguments));
      };
      if (s[e[1]]) s[e[1]].push({ handler: e[2], proxyHandler: t });
      else s[e[1]] = [{ handler: e[2], proxyHandler: t }];
      e[0].addEventListener(e[1], t, e[3]);
    };
    n.__delEvent = function () {
      var e = arguments;
      var t = e[2];
      for (var n = 0; n < (s[e[1]] || []).length; n += 1)
        if (s[e[1]][n].handler === e[2]) {
          t = s[e[1]][n].proxyHandler;
          s[e[1]].splice(n, 1);
          break;
        }
      e[0].removeEventListener(e[1], t, e[3]);
    };
    n.__dispatchEvent = function (t, n, i) {
      var o = document.createEvent('Event');
      o.initEvent(n, !0, !0);
      e._$merge(o, i);
      t.dispatchEvent(o);
    };
    return n;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f051aeae7bb889518ead30ef6e491df3',
);
