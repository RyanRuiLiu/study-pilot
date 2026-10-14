EDU(
  '7f310e4283533f8c69179605c5b8cbec',
  function (e, t, n, i, o, a, r) {
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release >= '6.0')
      EDU('5576c971546ff9c81cf5446bd99d2e8a', function () {
        t.__checkEvent = (function () {
          var e = {
            touchcancel: 'MSPointerCancel',
            touchstart: 'MSPointerDown',
            touchmove: 'MSPointerMove',
            touchend: 'MSPointerUp',
            fullscreenchange: 'MSFullscreenChange',
          };
          return t.__checkEvent._$aop(function (t) {
            var n = t.args;
            var i = e[n[1]];
            if (i) {
              t.stopped = !0;
              t.value = { type: i, handler: n[2] };
            }
          });
        })();
      });
    if ('trident' === e._$KERNEL.engine && '5.0' == e._$KERNEL.release)
      EDU('7db30a826482125327980f6f0003bb3b', function () {
        t.__checkEvent = (function () {
          var e = {};
          var n = {
            input: function (t, n, i) {
              if (!i) return { type: n };
              else
                return {
                  type: n,
                  handler: function (n) {
                    var o = t.id;
                    e[o] = t.value;
                    i.call(t, n);
                  },
                  link: [
                    [
                      document,
                      'selectionchange',
                      function (n) {
                        var o = t.id;
                        if (t == document.activeElement) {
                          if (e[o] !== t.value) {
                            e[o] = t.value;
                            i.call(t, n);
                          }
                        } else delete e[o];
                      },
                    ],
                  ],
                };
            },
          };
          return t.__checkEvent._$aop(function (e) {
            var t = e.args;
            var i = n[t[1]];
            if (i) {
              e.stopped = !0;
              e.value = i.apply(null, t);
            }
          });
        })();
      });
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release >= '5.0')
      EDU('d0e61256b9e9ce520f8601fbcbf43013', function () {
        var e = { propertychange: 1 };
        t.__addEvent = t.__addEvent._$aop(function (t) {
          var n = t.args;
          if (null != e[n[1]] && n[0].attachEvent) {
            t.stopped = !0;
            n[0].attachEvent('on' + n[1], n[2]);
          }
        });
        t.__delEvent = t.__delEvent._$aop(function (t) {
          var n = t.args,
            i = e[n[1]];
          if (null != e[n[1]] && n[0].detachEvent) {
            t.stopped = !0;
            n[0].detachEvent('on' + n[1], n[2]);
          }
        });
      });
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release <= '4.0')
      EDU('3719b656fb62fe92ba1d325e960d1172', function () {
        t.__checkEvent = (function () {
          var e = {};
          var n = {
            input: function (t, n, i) {
              var o = { type: 'propertychange' };
              if (i) {
                var a = t.id;
                var r = function (n) {
                  if (t.value && !e['x-' + a]) {
                    e['x-' + a] = !0;
                    i.call(t, n);
                  }
                };
                o.handler = function (n) {
                  if ('value' in t && 'value' == n.propertyName) {
                    if (e[a]) return;
                    e[a] = !0;
                    i.call(t, n);
                    delete e[a];
                  }
                };
                o.link = [
                  [t, 'keyup', r],
                  [t, 'mouseup', r],
                  [t, 'mousemove', r],
                ];
                o.destroy = function () {
                  delete e[a];
                  delete e['x-' + a];
                };
              }
              return o;
            },
            load: function (e, t, n) {
              var i = { type: 'readystatechange' };
              if (n)
                i.handler = function (t) {
                  if ('loaded' == e.readyState || 'complete' == e.readyState) n.call(e, t);
                };
              return i;
            },
          };
          return t.__checkEvent._$aop(function (e) {
            var t = e.args;
            var i = n[t[1]];
            if (i) {
              e.stopped = !0;
              e.value = i.apply(null, t);
            }
            if (t[2]) t[2] = t[2]._$bind(t[0]);
          });
        })();
        t.__addEvent = function () {
          var e = arguments;
          if (!1)
            if (!('on' + e[1] in e[0])) console.log('not support event[' + e[1] + '] for ' + e[0]);
          e[0].attachEvent('on' + e[1], e[2]);
        };
        t.__delEvent = function () {
          var e = arguments;
          e[0].detachEvent('on' + e[1], e[2]);
        };
        t.__dispatchEvent = (function () {
          var e = { propertychange: { propertyName: 'value' } };
          return function (t, i, o) {
            var a = document.createEventObject();
            try {
              n._$merge(a, e[i], o);
              t.fireEvent('on' + i, a);
            } catch (r) {
              console.error(r.message);
              console.error(r.stack);
            }
          };
        })();
      });
    if ('gecko' === e._$KERNEL.engine)
      EDU('0a09a26cdb4f636b43f591038797472d', function () {
        t.__checkEvent = (function () {
          var e = /^(?:transitionend|animationend|animationstart|animationiteration)$/i;
          var n = {
            mousewheel: function (e, t, n) {
              var i = { type: 'MozMousePixelScroll' };
              if (n)
                i.handler = function (t) {
                  var i = t.detail;
                  t.wheelDelta = -i;
                  t.wheelDeltaY = -i;
                  t.wheelDeltaX = 0;
                  n.call(e, t);
                };
              return i;
            },
          };
          return t.__checkEvent._$aop(function (t) {
            var i = t.args;
            if (e.test(i[1])) {
              t.stopped = !0;
              t.value = { type: i[1], handler: i[2] };
            }
            var o = n[i[1]];
            if (o) {
              t.stopped = !0;
              t.value = o.apply(null, i);
            }
          });
        })();
      });
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  '192d6d02983857194eeea85f657e16c3',
  'fe86216ed59e3103a56c42c850d389f0',
);
