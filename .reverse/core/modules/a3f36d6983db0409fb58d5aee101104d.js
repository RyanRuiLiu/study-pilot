EDU(
  'a3f36d6983db0409fb58d5aee101104d',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _;
    c._$$GroupManager = t._$klass();
    _ = c._$$GroupManager._$extend(a._$$EventTarget);
    _.__reset = function (e) {
      this.__super(e);
      this.__root = e.root;
      this.__dispatcher = e.dispatcher;
      this.__mpool = {};
    };
    _.__destroy = function () {
      this.__super();
      delete this.__root;
      delete this.__mpool;
      delete this.__dispatcher;
    };
    _.__isStopped = function (e) {
      if (!s._$isNode(e)) return !1;
      else return !!e._$getData().stopped || this.__isStopped(e._$getParent());
    };
    _.__doClearStopped = function (e) {
      if (s._$isNode(e)) {
        delete e._$getData().stopped;
        this.__doClearStopped(e._$getParent());
      }
    };
    _.__doModuleHide = function (e, t) {
      this.__doModuleCheck('onhide', e, t);
    };
    _.__doModuleShow = function (e, t) {
      this.__doModuleCheck('onshow', e, t);
      this.__doModuleAction(e);
    };
    _.__doModuleRefresh = function (e) {
      this.__doModuleCheck('onrefresh', e);
      this.__doModuleAction(e);
    };
    _.__doModuleCheck = function (e, t, n) {
      if (t != n && s._$isNode(t)) {
        if ('onhide' == e) this.__doModuleDispatch(t, e);
        this.__doModuleCheck(e, t._$getParent(), n);
        if ('onhide' != e) this.__doModuleDispatch(t, e);
      }
    };
    _.__doModuleAction = function (t) {
      if (!s._$isNode(t)) return !0;
      var n = t._$getData(),
        i = n.action,
        o = n.module;
      if (!this.__doModuleAction(t._$getParent()) || (i && e._$isString(o))) return !1;
      if (o && o._$allocate && i && 'onhide' != i) {
        if (this.__isStopped(t)) return;
        var a = {
          umi: t._$getPath(),
          config: n.config,
          composite: n.composite,
          dispatcher: this.__dispatcher,
        };
        o = o._$allocate(a);
        if (s._$isModule(o)) {
          n.module = o;
          this.__doModuleDispatch(t, 'onshow');
        } else delete n.module;
      }
      delete n.action;
      return !0;
    };
    _.__doModuleDispatch = (function () {
      var t = function (e) {
        var t;
        e = e._$getParent();
        for (; e;) {
          t = e._$getData().module;
          if (s._$isModule(t)) return t._$getExportData();
          e = e._$getParent();
        }
        return null;
      };
      var n = function (e, t) {
        var n = { url: (t.root || '') + e, version: (t.ver || d)[e] };
        if (t.mode && n.version) {
          n.url = n.url.replace(/(\.[^.\/]*?)$/, '_' + n.version + '$1');
          n.version = null;
        }
        return n;
      };
      return function (a, c) {
        if (s._$isNode(a)) {
          var l = a._$getData(),
            u = l.module,
            _ = 'onhide' != c;
          if (s._$isModule(u)) {
            if (_ && this.__isStopped(a)) return;
            var f = !this.__source ? l.event : this.__source._$getData().event;
            if (f) {
              f.umi = a._$getPath();
              f.data = t(a);
            }
            var h = l.xname || 'onhide';
            if ('onshow' == c && 'onhide' != h) c = 'onrefresh';
            if ('onrefresh' == c && 'onhide' == h) c = 'onshow';
            l.xname = c;
            u._$dispatchEvent(c, f || {});
            if (_ && f && f.pos && f.umi == f.target) i._$scrollTo(f.pos);
            if (_ && f) {
              l.stopped = f.stopped;
              delete f.stopped;
            }
          } else if (u) {
            l.action = c;
            if ('onshow' == c && e._$isString(u)) {
              var p = i._$get('umi://' + u);
              if (p) r._$parseTemplate(p);
              else {
                var m = location.config || d,
                  g = n(u, m);
                o._$loadTemplate(g.url, { version: g.version, onload: r._$parseTemplate });
              }
            }
          }
        }
      };
    })();
    _._$hasUMI = function (e) {
      return !!this.__mpool[e];
    };
    _._$addUMI = function (e) {
      this.__mpool[e] = !0;
    };
    _._$delUMI = function (e) {
      delete this.__mpool[e];
    };
    _._$loadedUMI = function (e) {
      if (this._$hasUMI(e)) this.__doModuleAction(s._$getNodeByUMI(this.__root, e));
    };
    _._$dispatchUMI = function (e) {
      if (this._$hasUMI(e)) {
        var t = s._$getNodeByUMI(this.__root, e);
        this.__doClearStopped(t);
        this.__doModuleShow(t);
      }
    };
    _._$hideUMI = function (e) {
      if (this._$hasUMI(e)) this.__doModuleHide(s._$getNodeByUMI(this.__root, e));
    };
    return c;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '8b5c7ec5f50504fcb779ea6190a77347',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '9a830f6a308feb17fe43372af2d6e799',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '07b9b4da0bcd7558dcf83fe738e7fc75',
);
