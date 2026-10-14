EDU(
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _ = o._$add(s);
    c._$flash = (function () {
      var s = {},
        c,
        d = /^(?:mouse.*|(?:dbl)?click)$/i;
      window.onflashevent = function (e) {
        var t = decodeURIComponent(e.target),
          n = e.type.toLowerCase();
        var i = s[t + '-tgt'];
        if (i && d.test(n)) u(i, e);
        var o = s[t + '-on' + n];
        if (o) {
          var a = '';
          try {
            a = o(e);
          } catch (r) {}
          return a;
        }
      };
      var l = function (e) {
        c = document.title;
        var n = t._$get(e.parent) || document.body,
          i = o._$get(_, e);
        n.insertAdjacentHTML(!e.hidden ? 'beforeEnd' : 'afterBegin', i);
      };
      var u = function (e, t) {
        var i = t.type.toLowerCase();
        a.requestAnimationFrame(function () {
          n._$dispatchEvent(e, i);
        });
      };
      var f = function (e) {
        return !!e && !!e.inited && !!e.inited();
      };
      var h = function (e) {
        var n = [document.embeds[e], t._$get(e), document[e], window[e]],
          o = i._$forIn(n, f),
          a = n[o],
          r = e + '-count';
        s[r]++;
        if (!a) window.setTimeout(h._$bind(null, e), 300);
        else {
          if (c) {
            document.title = c;
            c = null;
          }
          s[e](a);
          delete s[e];
          delete s[r];
        }
      };
      var p = function (e) {
        var n = e.id,
          o = e.params;
        if (!o) {
          o = {};
          e.params = o;
        }
        var a = o.flashvars || '';
        a += (!a ? '' : '&') + ('id=' + n);
        if (!e.hidden && (e.target || r.__canFlashEventBubble(o.wmode))) {
          var c = t._$id(e.target) || t._$id(e.parent);
          s[n + '-tgt'] = c;
        }
        o.flashvars = a;
        i._$loop(e, function (e, t) {
          if (i._$isFunction(e) && 'onready' != t) s[n + '-' + t] = e;
        });
      };
      return function (t) {
        t = e.X({}, t);
        if (t.src) {
          var n = '_' + i._$uniqueID();
          t.id = n;
          p(t);
          l(t);
          if (t.onready) {
            s[n] = t.onready;
            s[n + '-count'] = 0;
            h(n);
          }
        }
      };
    })();
    if (!0) e.copy(e.P('nej.e'), c);
    return c;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '77d2226943bd145280d6a32ebbedeb9d',
  '52eba946c1c025bf3fc5cfca71b6bd86',
  'c02cab32057c9cc6ba9972f520db57a0',
);
