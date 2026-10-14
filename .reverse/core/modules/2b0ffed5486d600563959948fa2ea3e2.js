EDU(
  '2b0ffed5486d600563959948fa2ea3e2',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p, m, g) {
    var b;
    h._$$Dispatcher = t._$klass();
    b = h._$$Dispatcher._$extend(s._$$EventTarget);
    b.__init = function () {
      this.__super();
      var e = o._$uniqueID();
      this.__pbseed = 'pb-' + e;
      this.__pvseed = 'pv-' + e;
    };
    b.__reset = function (e) {
      this.__dtmp = {};
      this.__rest = !!e.rest;
      this.__root = d._$$Node._$allocate();
      this.__config = { m: {}, mg: {}, r: [], rr: {}, al: {}, am: {} };
      this.__groups = {};
      this.__doBuildGroup(this.__pbseed);
      this.__groups[this.__pvseed] = l._$$GroupManager._$allocate({
        root: this.__root,
        dispatcher: this,
      });
      f.__doFixHashTitle(document.title);
      this.__doInitDomEvent([[location, 'urlchange', this.__onURLChange._$bind(this)]]);
      this.__super(e);
      this._$rule(e.rules);
      this._$regist(e.modules);
    };
    b.__destroy = (function () {
      var e = function (e, t, n) {
        delete n[t];
        e._$recycle();
      };
      return function () {
        delete this.__config;
        this.__root = this.__root._$recycle();
        o._$loop(this.__groups, e);
        this.__super();
      };
    })();
    b.__setModuleConf = function (e, t, n) {
      var i = this.__config.m[e];
      if (!i) {
        i = {};
        this.__config.m[e] = i;
      }
      i[t] = n;
    };
    b.__getModuleConf = function (e, t) {
      var n = this.__config.m[e];
      return !n ? '' : n[t];
    };
    b.__doBuildGroup = function (e) {
      if (e) {
        var t = this.__groups[e];
        if (!t) {
          t = u._$$GroupManagerSingle._$allocate({
            root: this.__root,
            dispatcher: this,
            classed: e == this.__pbseed,
          });
          this.__groups[e] = t;
        }
        return t;
      }
    };
    b.__doAddUMI2Group = function (e, t) {
      var n = this.__doBuildGroup(t);
      if (!n) {
        t = c._$isUMIPrivate(e) ? this.__pvseed : this.__pbseed;
        n = this.__groups[t];
      }
      n._$addUMI(e);
      this.__config.mg[e] = t;
    };
    b.__doRewriteUMI = (function () {
      var e = /\$\d/;
      return function (t, n) {
        var i;
        o._$forIn(this.__config.r, function (a) {
          o._$forIn(a, function (a, r) {
            if (null != a) {
              if (o._$isFunction(a)) {
                var s = !1;
                try {
                  s = a.call(null, { umi: t, href: n });
                } catch (c) {}
                if (s) {
                  i = r;
                  return !0;
                }
              }
              if (o._$isArray(a)) {
                var d = o._$indexOf(a, function (e) {
                  return e === t || e === n;
                });
                if (d >= 0) {
                  i = r;
                  return !0;
                }
              }
              if (a.test && (a.test(t) || a.test(n))) {
                i = e.test(r) ? t.replace(a, r) : r;
                return !0;
              }
              if (a === t || a === n) {
                i = r;
                return !0;
              }
            }
          });
          return !!i;
        });
        return i || t;
      };
    })();
    b.__onURLChange = (function () {
      var e = /(?:^\/+)|(?:\/+$)/gi,
        t = /#(\$.*?)$/,
        n = /\/$/;
      var i = function (t, n) {
        var i = n._$getPath(),
          t = t.replace(i, '').replace(e, '');
        return t.split('/');
      };
      var o = function (e, t) {
        var n,
          i = e.split('/');
        for (; i.length > 0;) {
          if (!i[i.length - 1]) i.pop();
          else i[i.length - 1] = '';
          n = t[i.join('/')];
          if (n) return n;
        }
        return '';
      };
      return function (e) {
        if (0 != e.path.indexOf('$')) {
          var a = this.__dtmp[e.path];
          delete this.__dtmp[e.path];
          this._$dispatchEvent('onbeforechange', e);
          var r = this.__doRewriteUMI(e.path, e.href),
            s = this.__config.mg[r];
          if (!s && this.__rest) s = o(r, this.__config.mg);
          if (!s && !c._$isUMIPrivate(r)) {
            var d = { path: r, href: e.href };
            this._$dispatchEvent('onnotfound', d);
            if (d.stopped) return;
            r = this.__config.rr['404'];
            s = this.__config.mg[r];
          }
          if (!s && this.__rest) s = o(r, this.__config.mg);
          if (s) {
            var l = c._$getNodeByUMI(this.__root, r),
              u = null;
            if (this.__rest) {
              u = i(r, l);
              if (!n.test(r) && this.__config.mg[r + '/']) l = l._$getChildByName('/');
            }
            var _ = r;
            r = l._$getPath();
            l._$getData().event = {
              target: r,
              source: _,
              href: e.href,
              param: e.query,
              input: a,
              prest: u,
              clazz: this.__getModuleConf(r, 'clazz'),
              pos: t.test(e.href) ? RegExp.$1 : '',
            };
            var d = { title: this.__getModuleConf(_, 'title') };
            this._$dispatchEvent('ontitlechange', d);
            if (d.title) document.title = d.title;
            this.__groups[s]._$dispatchUMI(r);
          }
        }
      };
    })();
    b.__onClickDelegate = (function () {
      var e = function (e, t) {
        if (e) {
          var n = location.parse(e);
          this._$dispatchEvent('onbeforechange', n);
          var i = this.__doRewriteUMI(n.path, t || n.href);
          return this.__groups[this.__pbseed]._$hasUMI(i);
        }
      };
      var t = function (t) {
        var i = n._$dataset(t, 'href');
        if (i) return i;
        var a = n._$attr(t, 'href');
        if (a && !n._$dataset(t, 'notUmi')) {
          var r = a.split('#');
          r.shift();
          var i = r.join('#');
          if (e.call(this, i, a)) return i;
          if (e.call(this, a)) {
            var s = location.parse(a);
            return s.path + '?' + o._$object2query(s.query);
          }
        }
      };
      var a = function (e) {
        return !!t.call(this, e);
      };
      return function (e) {
        var n = i._$getElement(e, a._$bind(this));
        if (n) {
          i._$stopDefault(e);
          this._$redirect(t.call(this, n));
        }
      };
    })();
    b.__onActionDelegate = function (e) {
      var t = this.__config.am,
        o = t[e.type];
      if (o) {
        var a = i._$getElement(e, 'd:resAction');
        if (a) {
          var r = n._$dataset(a, 'resAction') || '',
            s = o[r.toLowerCase()];
          if (s) {
            var c = {
              action: r,
              target: a,
              id: n._$dataset(a, 'resId'),
              type: n._$dataset(a, 'resType'),
              extra: n._$dataset(a, 'resExtra'),
            };
            this._$dispatchEvent('onbeforeaction', { event: e, target: a, result: c });
            s.call(this, c);
          }
        }
      }
    };
    b._$rule = (function () {
      var e = ['404'];
      var t = function (e, t) {
        this._$rule(t, e);
      };
      var n = function (e, t) {
        this.__setModuleConf(t, 'title', e);
      };
      var i = function (e, t) {
        this.__config.al[t] = e;
      };
      var a = function (t) {
        if (t) {
          this.__config.r.push(t);
          o._$forEach(
            e,
            function (e) {
              if (t[e]) {
                this.__config.rr[e] = t[e];
                delete t[e];
              }
            },
            this,
          );
        }
      };
      var r = function (e, t) {
        var n = this.__config.am;
        var i = 'click',
          a = e,
          t = (t || '').toLowerCase();
        if (o._$isObject(e)) {
          i = e.event || i;
          a = e.value;
        }
        if (o._$isString(a))
          a = function (e, t) {
            this._$redirect(e, { force: !0, input: t });
          }._$bind(this, a);
        else if (o._$isFunction(a))
          a = a._$aop(
            null,
            function (e) {
              var t = e.value;
              if (o._$isString(t)) this._$redirect(t, { force: !0, input: e.args[0] });
            }._$bind(this),
          );
        if (o._$isFunction(a)) {
          if (!n[i]) {
            this.__doInitDomEvent([[document, i, this.__onActionDelegate._$bind(this)]]);
            n[i] = {};
          }
          n[i][t] = a;
        }
      };
      var s = {
        title: function (e) {
          o._$loop(e, n, this);
        },
        rewrite: function (e) {
          if (!o._$isArray(e)) a.call(this, e);
          else o._$forEach(e, a, this);
        },
        alias: function (e) {
          o._$loop(e, i, this);
        },
        action: function (e) {
          o._$loop(e, r, this);
        },
      };
      return function (e, n) {
        if (o._$isArray(e)) {
          n = e;
          e = 'rewrite';
        } else if (!o._$isString(e)) {
          o._$forIn(e, t, this);
          return;
        }
        (s[e] || m).call(this, n);
      };
    })();
    b._$regist = (function () {
      var e = function (e, t) {
        this._$regist(t, e);
      };
      var t = function (e) {
        return !!e && !!e._$extend;
      };
      return function (n, i) {
        if (o._$isString(n)) {
          var a = c._$appendNodeByUMI(this.__root, n)._$getData(),
            r = a.module;
          if (!c._$isModule(r) && !t(r)) {
            var s = this.__config.mg[n],
              r;
            if (o._$isString(i) || t(i)) r = i;
            else {
              i = i || p;
              s = i.gid;
              r = i.module;
              if (i.title) this.__setModuleConf(n, 'title', i.title);
              if (i.clazz) this.__setModuleConf(n, 'clazz', i.clazz);
              if (i.composite) a.composite = i.composite;
              if (i.config) a.config = i.config;
            }
            this.__doAddUMI2Group(n, s);
            a.module = r;
          }
        } else o._$forIn(n, e, this);
      };
    })();
    b._$message = (function () {
      var e = function (e, t) {
        var n = e._$getData().module;
        if (c._$isModule(n)) n._$dispatchEvent('onmessage', t);
      };
      var t = [
        e,
        function (t, n) {
          var i = n.from;
          for (; t;) {
            if (t._$getPath() != i) e(t, n);
            t = t._$getParent();
          }
        },
        function (t, n) {
          var i = n.from;
          c._$breadthFirstSearch(t, function (t) {
            if (t._$getPath() != i) e(t, n);
          });
        },
      ];
      return function (e) {
        var n = o._$merge({}, e),
          i = c._$getNodeByUMI(this.__root, n.to);
        n.path = i._$getPath();
        (t[n.mode] || t[0]).call(this, i, n);
      };
    })();
    b._$publish = function (e, t) {
      var t = o._$merge({}, t);
      t.type = e || '';
      this._$dispatchEvent((t.from || '') + ':' + t.type, t);
    };
    b._$subscribe = function (e, t, n) {
      e = this.__config.al[e] || e;
      this._$addEvent((e || '') + ':' + (t || ''), n);
    };
    b._$unsubscribe = function (e, t, n) {
      e = this.__config.al[e] || e;
      this._$delEvent((e || '') + ':' + (t || ''), n);
    };
    b._$hide = function (e) {
      var t = this.__config.mg[e];
      if (t == this.__pvseed) this.__groups[t]._$hideUMI(e);
    };
    b._$hideGroup = function (e) {
      var t = this.__groups[e];
      if (t) t._$hide();
    };
    b._$redirect = function (e, t) {
      t = t || p;
      var n = c._$path2umi(e),
        i = location.parse(e);
      this.__dtmp[i.path] = t.input;
      if (c._$isUMIPrivate(n)) this.__onURLChange(i);
      else {
        var o = this.__groups[this.__pbseed],
          a = { target: i, umi: n };
        if (t.exitable || o._$exitable(a))
          if (location.same(e) && t.force) this.__onURLChange(i);
          else {
            location.ignored = !!t.ignored;
            location.redirect(e, !!t.replace);
          }
      }
    };
    b._$refresh = function (e) {
      if (e) this._$redirect(e, { replace: !0, force: !0 });
      else this.__groups[this.__pbseed]._$refresh();
    };
    b._$delegate = function () {
      this.__doInitDomEvent([[document, 'click', this.__onClickDelegate._$bind(this)]]);
    };
    b._$active = function () {
      location.active();
    };
    b._$loaded = function (e, t) {
      e = this.__config.al[e] || e;
      if (!o._$isArray(e)) {
        this._$regist(e, t);
        this.__groups[this.__config.mg[e]]._$loadedUMI(e);
      } else
        o._$forEach(
          e,
          function (e) {
            this._$loaded(e, t);
          },
          this,
        );
    };
    b._$getTitle = function (e) {
      return this.__getModuleConf(e, 'title');
    };
    b._$getUMIByAlias = function (e, t) {
      var n = this.__config.al[e];
      if (o._$isArray(n)) return n[t || 0];
      else return n;
    };
    h._$startup = function (e) {
      if (!window.dispatcher) {
        window.dispatcher = h._$$Dispatcher._$getInstance(e);
        _._$dumpModules();
        r._$parseTemplate((e || p).tid || 'template-box', location.config);
        i._$addEvent(document, 'templateready', function () {
          window.setTimeout(dispatcher._$active._$bind(dispatcher), 0);
        });
        return window.dispatcher;
      } else console.error('dispatcher is already startup');
    };
    if (!0) {
      e.P('nej.e')._$startup = h._$startup;
      e.P('nej.ut')._$$Dispatcher = h._$$Dispatcher;
    }
    return h;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '4ef5ec5b4c22a1829138a6a305e46183',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '07b9b4da0bcd7558dcf83fe738e7fc75',
  '4aa96d258549a96c19626510b60daf65',
  'a3f36d6983db0409fb58d5aee101104d',
  '413faa09d59583231bb6b79d14a079ee',
  'd6c071332c7308ee7aac884791446059',
  'cf78458cb566b995ef0ad65c44ee9880',
);
