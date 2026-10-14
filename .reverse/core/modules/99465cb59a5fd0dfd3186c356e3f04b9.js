EDU(
  '99465cb59a5fd0dfd3186c356e3f04b9',
  function (e, t, n, i, o, a, r, s) {
    if (
      'trident' === e._$KERNEL.engine &&
      e._$KERNEL.release >= '4.0' &&
      e._$KERNEL.release <= '5.0'
    )
      EDU('4b1c4480af1c98f0075f2c05dbed4ed2', function () {
        t.__formatPassData = function (e) {
          return JSON.stringify(e);
        };
      });
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release <= '3.0')
      EDU(
        'eeda7339fa212bd641a8685b38079de4',
        function (e) {
          var o = 'MSG|',
            r = [];
          var s = function () {
            var e = unescape(window.name || '').trim();
            if (e && 0 == e.indexOf(o)) {
              window.name = '';
              var a = n._$string2object(e.replace(o, ''), '|'),
                r = (a.origin || '').toLowerCase();
              if (!r || '*' == r || 0 == location.href.toLowerCase().indexOf(r))
                i._$dispatchEvent(window, 'message', {
                  data: JSON.parse(a.data || 'null'),
                  source: window.frames[a.self] || a.self,
                  origin: t.__formatOrigin(a.ref || document.referrer),
                });
            }
          };
          var c = (function () {
            var e;
            var t = function (t, i, o) {
              if (n._$indexOf(e, t.w) < 0) {
                e.push(t.w);
                o.splice(i, 1);
                t.w.name = t.d;
              }
            };
            return function () {
              e = [];
              n._$reverseEach(r, t);
              e = null;
            };
          })();
          t.__postMessage = (function () {
            var e = function (e) {
              var t = {};
              e = e || a;
              t.origin = e.origin || '';
              t.ref = location.href;
              t.self = e.source;
              t.data = JSON.stringify(e.data);
              return o + n._$object2string(t, '|', !0);
            };
            return function (t, n) {
              r.unshift({ w: t, d: escape(e(n)) });
            };
          })();
          e._$$CustomEvent._$allocate({ element: window, event: 'message' });
          setInterval(c, 100);
          setInterval(s, 20);
        },
        'accb3fb8e644fc0d22ad33c978dcd3b3',
        '4a1eebd4a6f73a95ccf8ecf0a547fa18',
      );
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  'ef06ae85098d063c01af32601bc39ed8',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
