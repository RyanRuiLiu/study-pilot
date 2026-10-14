EDU(
  'ea321df1a66d5a1d11c5df37a56589c4',
  function (e, t, n) {
    var i = {},
      o = (function () {
        return this;
      })();
    var a = new RegExp('^(http://|https://|//)nos.netease.com/'),
      r = new RegExp('^(http://|https://|//)([a-z0-9]+)-image.nosdn.127.net'),
      s = new RegExp('^http://nos.netease.com/.*thumbnail=(\\d*)y(\\d*).*'),
      c = new RegExp('^(http://|https://|//)img[0-9]*.ph.126.net'),
      d = new RegExp('^(http://|https://|//)img-ph-mirror.nosdn.127.net'),
      l = new RegExp('^(http://|https://|//)imgsize.ph.126.net'),
      u = '//imgsize.ph.126.net/?enlarge=true&imgurl=',
      _ = new RegExp('^data:image/');
    i._$scaleImage = i._$scalePicDynamic = function (e, t, n, o, s, f) {
      function h(e) {
        if (a.test(e)) {
          var t = e.split('/');
          if ('edu-image' == t[3]) {
            t[2] = 'edu-image.nosdn.127.net';
            t.splice(3, 1);
            e = t.join('/');
          }
        } else if (c.test(e)) {
          var t = e.split('/');
          t.splice(0, 3);
          t.unshift('//img-ph-mirror.nosdn.127.net');
          e = t.join('/');
        }
        return e;
      }
      function p(e, t, n, i) {
        var o = '',
          a,
          r,
          c,
          d;
        if (t && n) o = '&thumbnail=' + t + (s || 'y') + n;
        c = (e.split('?') || [])[0];
        r = e.split('?')[1] || '';
        if (!r || r.indexOf('imageView') != -1) {
          d = r ? r.split('&') : [];
          for (var l = 0; l < d.length; l++)
            if (
              d[l].indexOf('thumbnail') != -1 ||
              d[l].indexOf('imageView') != -1 ||
              d[l].indexOf('quality') != -1
            ) {
              d.splice(l, 1);
              l -= 1;
            }
          c = c + '?imageView&quality=100' + (d.length > 0 ? '&' + d.join('&') : '') + o;
        } else c = e + (r ? '&' : '?') + 'imageView' + o + '&quality=100';
        if (i) c += '&' + i;
        return c;
      }
      function m(e, t, n, i) {
        var o, a;
        o = '1x95';
        a = e.substring(e.lastIndexOf('.'));
        if (t && n) e = u + E + e + '_' + t + 'x' + n + 'x' + o + a;
        return e;
      }
      function g(e) {
        if (r.test(e) || a.test(e) || d.test(e) || c.test(e) || l.test(e)) return !0;
        else return !1;
      }
      var b, v;
      if (!e || _.test(e) || !g(e)) return e;
      var E = (e.match(/(\S*)\/\//) || [])[1];
      e = e.replace(/^(http:|https:)/, '');
      if (l.test(e)) {
        v = e.match(/imgurl=(\S*)_/);
        e = v[1];
      }
      b = h(e);
      var x = b.substring(b.lastIndexOf('.')),
        w = new RegExp(/(^\.gif|^\.svg)/);
      if (w.test(x)) return b;
      if (t || n || o)
        if (r.test(b) || d.test(b) || a.test(b)) b = p(b, t, n, o);
        else b = m(b, t, n, o);
      if (f) b = i._$convertToWebP(b);
      return b;
    };
    i._$dom2Img = function (e, t) {
      var n = document.getElementById(e);
      html2canvas(n, {
        useCORS: !0,
        logging: !0,
        onrendered: function (e) {
          t(e.toDataURL('image/png', 1));
        },
      });
    };
    i._$dom2ImgV1 = function (e, t) {
      if ('string' == typeof e) e = document.getElementById(e);
      return html2canvas(e, t).then(function (e) {
        return e.toDataURL('image/png', 1);
      });
    };
    i._$dom2ImgBlob = function (e, t) {
      var n = document.getElementById(e);
      if (!HTMLCanvasElement.prototype.toBlob)
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value: function (e, t, n) {
            var i = atob(this.toDataURL(t, n).split(',')[1]),
              o = i.length,
              a = new Uint8Array(o);
            for (var r = 0; r < o; r++) a[r] = i.charCodeAt(r);
            e(new Blob([a], { type: t || 'image/png' }));
          },
        });
      html2canvas(n, {
        useCORS: !0,
        logging: !1,
        removeContainer: !0,
        forceLoadImage: !1,
        onrendered: function (e) {
          e.toBlob(function (e) {
            t(URL.createObjectURL(e));
          }, 'image/jpeg');
        },
      });
    };
    i.base64toFile = function f(e, t) {
      var n = e.split(','),
        i = n[0].match(/:(.*?);/)[1],
        o = atob(n[1]),
        a = o.length,
        r = new Uint8Array(a);
      t = t || 'test.' + i.replace('image/', '');
      for (; a--;) r[a] = o.charCodeAt(a);
      return new File([r], t, { type: i });
    };
    i.base64toBlob = function h(e, t) {
      var n = e.split(','),
        i,
        o = n[0].match(/:(.*?);/)[1],
        a = atob(n[1]),
        r = a.length,
        s = new Uint8Array(r);
      t = t || 'test.' + o.replace('image/', '');
      for (; r--;) s[r] = a.charCodeAt(r);
      i = new Blob([s], { type: o });
      i.name = t;
      return i;
    };
    i._$isSupportWebP = (function () {
      var e;
      try {
        e =
          0 == document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp');
      } catch (t) {
        e = !1;
      }
      return function () {
        return e;
      };
    })();
    i._$convertToWebP = function (e) {
      var n, o, s, c, l, u;
      if (!r.test(e) && !d.test(e) && !a.test(e)) return e;
      u = e.substring(e.lastIndexOf('.'));
      l = new RegExp(/^\.gif/);
      if (!i._$isSupportWebP() || l.test(u)) return e;
      c = e.split('?') || [];
      o = c[0];
      n = c[1] || '';
      s = t._$query2object(n);
      if (void 0 != s['imageView']) o = e + '&type=webp';
      else o = e + (n ? '&' : '?') + 'imageView&type=webp';
      return o;
    };
    return i;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  'a7d1128d22219f1def1727e67cfa7d44',
);
