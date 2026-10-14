EDU(
  '4b6a2b0b658e965f53b78ad4c8f409ea',
  function (e, t, n, i, o, a, r) {
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release <= '4.0')
      EDU('7994fdb9a5b45b805cb76a9aedc7d7cf', function () {
        window.hst_lock = {};
        t.__pushHistory = (function () {
          var e,
            i,
            o = [],
            a = 'cb-' + +new Date(),
            r =
              '<script>parent.hst_lock["' +
              a +
              '"] = !0;parent.location.hash = decodeURIComponent("#<HASH>");</script>';
          var s = function () {
            e = window.clearTimeout(e);
            if (o.length) {
              var t = o.shift();
              try {
                var n = i.contentWindow.document;
                n.open();
                n.write('<head><title>');
                n.write(document.title);
                n.write('</title>');
                n.write(r.replace('#<HASH>', encodeURIComponent(t)));
                n.write('</head><body></body>');
                if (location.hostname != document.domain) n.domain = document.domain;
                n.close();
                hst_lock[a] = !1;
              } catch (c) {
                console.log(c.message || c);
                o.unshift(t);
              }
              e = window.setTimeout(s, 50);
            }
          };
          return function (e) {
            if (!t[a] && (i || e)) {
              o.push(e);
              if (!i) i = n._$createXFrame();
              s();
            }
          };
        })();
      });
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  'cf069cdc80342646a0f3159e4a6d2d23',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
