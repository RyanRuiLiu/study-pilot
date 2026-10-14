EDU(
  'fc2697b2e0ea24c0b604d47b39f64437',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = {},
      p = 'ntp-' + +new Date() + '-';
    l.tpl = function () {
      return h;
    };
    l._$parseTemplate = (function () {
      var e = { text: 'txt', plain: 'txt', javascript: 'js' };
      var d = {
        textarea: {
          getType: function (t) {
            var n = t.name.toLowerCase();
            return e[n] || n;
          },
          getContent: function (e) {
            return e.value || e.innerText || '';
          },
        },
        script: {
          getType: function (t) {
            var n = (t.type || '').toLowerCase().replace(/^nej\//i, '');
            return e[n] || n;
          },
          getContent: function (e) {
            return e.innerText || e.innerHTML || '';
          },
        },
      };
      var _ = 0;
      var f = function () {
        if (!(_ > 0)) {
          _ = 0;
          n._$dispatchEvent(document, 'templateready');
          n._$clearEvent(document, 'templateready');
        }
      };
      var h = function (e, n) {
        var o = i._$dataset(e, 'src');
        if (o) {
          n = n || u;
          var a = n.root;
          if (!a) a = e.ownerDocument.location.href;
          else a = t._$absolute(a);
          o = o.split(',');
          t._$forEach(o, function (e, n, i) {
            i[n] = t._$absolute(e, a);
          });
          return o;
        }
      };
      var p = function (e, t) {
        if (e) {
          var n = h(e, t);
          if (n) s._$queueStyle(n, { version: i._$dataset(e, 'version') });
          var o = e.tagName.toLowerCase();
          i._$addStyle(d[o].getContent(e));
        }
      };
      var m = function (e) {
        _--;
        i._$addScript(e);
        f();
      };
      var g = function (e, t) {
        if (e) {
          var n = h(e, t),
            o = e.tagName.toLowerCase(),
            a = d[o].getContent(e);
          if (!n) i._$addScript(a);
          else {
            _++;
            var t = { version: i._$dataset(e, 'version'), onload: m._$bind(null, a) };
            window.setTimeout(s._$queueScript._$bind(s, n, t), 0);
          }
        }
      };
      var b = function (e) {
        _--;
        l._$parseTemplate(e);
        f();
      };
      var v = function (e, t) {
        if (e) {
          var n = h(e, t)[0];
          if (n) {
            _++;
            var t = { version: i._$dataset(e, 'version'), onload: b };
            window.setTimeout(s._$loadTemplate._$bind(s, n, t), 0);
          }
        }
      };
      var E = function (e, t) {
        _--;
        l._$addTextTemplate(e, t || '');
        f();
      };
      var x = function (e, t) {
        if (e && e.id) {
          var n = e.id,
            o = h(e, t)[0];
          if (o) {
            _++;
            var a = o + (o.indexOf('?') < 0 ? '?' : '&') + (i._$dataset(e, 'version') || ''),
              t = { type: 'text', method: 'GET', onload: E._$bind(null, n) };
            window.setTimeout(c._$request._$bind(c, a, t), 0);
          }
        }
      };
      var w = function (e) {
        if (o._$is('mac') && 'safari' === o._$KERNEL.browser) return t._$unescape(e.innerHTML);
        else return d[e.tagName.toLowerCase()].getContent(e);
      };
      var C = function (e, t) {
        var n = d[e.tagName.toLowerCase()],
          i = n.getType(e);
        switch (i) {
          case 'jst':
            a._$addTemplate(w(e), e.id);
            return;
          case 'txt':
            l._$addTextTemplate(e.id, w(e));
            return;
          case 'ntp':
            l._$addNodeTemplate(w(e), e.id);
            return;
          case 'js':
            g(e, t);
            return;
          case 'css':
            p(e, t);
            return;
          case 'html':
            v(e, t);
            return;
          case 'res':
            x(e, t);
            return;
        }
      };
      var y = function (e) {
        var n = [],
          i = e.getElementsByTagName('script');
        if (!((i && i.length) || 'BODY' !== e.tagName))
          i = e.ownerDocument.getElementsByTagName('script');
        t._$forEach(i, function (e) {
          if (0 === e.type.search(/^nej\//i)) n.push(e);
        });
        return n;
      };
      r._$$CustomEvent._$allocate({ element: document, event: 'templateready', oneventadd: f });
      return function (e, n) {
        e = i._$get(e);
        if (e) {
          var o,
            a = e.tagName;
          if ('TEXTAREA' === a || 'SCRIPT' === a) o = [e];
          else {
            o = t._$object2array(e.getElementsByTagName('textarea'));
            o.push.apply(o, y(e));
          }
          t._$forEach(o, function (e) {
            C(e, n);
          });
          i._$remove(e, !0);
        }
        f();
      };
    })();
    l._$addTextTemplate = function (e, t) {
      if (null != h[e] && typeof h[e] == typeof t) {
        console.warn('text template overwrited with key ' + e);
        console.debug('old template content: ' + h[e].replace(/\n/g, ' '));
        console.debug('new template content: ' + t.replace(/\n/g, ' '));
      }
      h[e] = t || '';
    };
    l._$getTextTemplate = function (e) {
      return h[e] || '';
    };
    l._$addNodeTemplate = function (e, n) {
      n = n || t._$uniqueID();
      e = i._$get(e) || e;
      l._$addTextTemplate(p + n, e);
      if (!t._$isString(e)) i._$removeByEC(e);
      return n;
    };
    l._$getNodeTemplate = function (e) {
      if (!e) return null;
      e = p + e;
      var n = l._$getTextTemplate(e);
      if (!n) return null;
      var o;
      if (t._$isString(n)) {
        n = i._$html2node(n);
        var a = n.getElementsByTagName('textarea');
        if (!('TEXTAREA' == n.tagName || (a && a.length))) l._$addTextTemplate(e, n);
        else o = n;
      }
      if (!o) o = n.cloneNode(!0);
      i._$removeByEC(o);
      return o;
    };
    l._$getItemTemplate = (function () {
      var e = function (e, t) {
        return 'offset' == t || 'limit' == t;
      };
      return function (n, i, o) {
        var a = [];
        if (!n || !n.length || !i) return a;
        o = o || u;
        var r = n.length,
          s = parseInt(o.offset) || 0,
          c = Math.min(r, s + (parseInt(o.limit) || r)),
          d = { total: n.length, range: [s, c] };
        t._$merge(d, o, e);
        for (var l = s, _; l < c; l++) {
          d.index = l;
          d.data = n[l];
          _ = i._$allocate(d);
          var f = _._$getId();
          h[f] = _;
          _._$recycle = _._$recycle._$aop(
            function (e, t) {
              delete h[e];
              delete t._$recycle;
            }._$bind(null, f, _),
          );
          a.push(_);
        }
        return a;
      };
    })();
    l._$getItemById = function (e) {
      return h[e];
    };
    l._$parseUITemplate = (function () {
      var e = /#<(.+?)>/g;
      return function (n, o) {
        o = o || {};
        n = (n || '').replace(e, function (e, n) {
          var i = o[n];
          if (!i) {
            i = 'tpl-' + t._$uniqueID();
            o[n] = i;
          }
          return i;
        });
        l._$parseTemplate(i._$html2node(n));
        return o;
      };
    })();
    d._$merge({ _$parseTemplate: l._$parseTemplate, _$addNodeTemplate: l._$addNodeTemplate });
    if (!0) e.copy(e.P('nej.e'), l);
    return l;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'f051aeae7bb889518ead30ef6e491df3',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '9a830f6a308feb17fe43372af2d6e799',
  '8a864b627c302d7d1c56bd928b515d1b',
  'd37bb207915efdc94c2f2a74d479b6f5',
);
