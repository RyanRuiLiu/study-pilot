EDU(
  'b27de8c1436f3a72359bbe7dc9ba93c7',
  function (e, t, i, n, a, o, s, r, c, d, _) {
    var l;
    r._$$CardWrapper = t._$klass();
    l = r._$$CardWrapper._$extend(o._$$LayerWrapper);
    r._$$CardWrapper._$attach = (function () {
      var e = function (e, t, i, o, s) {
        var r,
          c = t + '-i',
          d = i.__cdpol,
          _ = !!o.noclear,
          l = !!o.toggled;
        if (a._$isFunction(o.onbeforeclick)) {
          var h = o.noclear,
            f = o.toggled;
          try {
            o.onbeforeclick(o);
          } catch (u) {}
          _ = !!o.noclear;
          l = !!o.toggled;
          o.toggled = f;
          o.noclear = h;
        }
        var p = d[c];
        if (!l || !p) {
          n._$stop(e);
          if (!_) {
            n._$dispatchEvent(document, 'click');
            r = i._$allocate(o);
          } else r = i._$getInstanceWithReset(o, !0);
          d[c] = r;
          r._$setEvent('onbeforerecycle', function () {
            delete d[c];
          });
          r._$showByReference(s);
        } else p._$hide();
      };
      return function (t, o) {
        t = i._$get(t);
        if (t) {
          if (!this.__cdpol) this.__cdpol = {};
          var s = i._$id(t);
          if (!this.__cdpol[s]) {
            o = a._$merge({}, o);
            var r = a._$fetch({ align: '', delta: null, fitable: !1 }, o);
            r.target = s;
            o.destroyable = !0;
            if (!o.fixed) {
              r.fitable = !0;
              o.parent = document.body;
            }
            this.__cdpol[s] = [s, o.event || 'click', e._$bind2(null, s, this, o, r)];
            n._$addEvent.apply(n, this.__cdpol[s]);
          }
        }
      };
    })();
    r._$$CardWrapper._$detach = function (e) {
      if (this.__cdpol) {
        var t = i._$id(e),
          a = this.__cdpol[t];
        if (a) {
          delete this.__cdpol[t];
          n._$delEvent.apply(n, a);
          var o = this.__cdpol[t + '-i'];
          if (o) o._$hide();
        }
      }
    };
    l.__getLayerInstance = function () {
      return s._$$Card._$allocate(this.__lopt);
    };
    l.__doInitLayerOptions = function () {
      this.__super();
      this.__lopt.top = null;
      this.__lopt.left = null;
      this.__lopt.nostop = !1;
    };
    l._$showByReference = function (e) {
      if (this.__layer) this.__layer._$showByReference(e);
    };
    if (!0) e.copy(e.P('nej.ui'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '4bc2e0ec2ac53645ad0e7f1ccde39c2b',
  '718339c82039ab37605f9b07444eab0a',
);
