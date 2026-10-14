EDU(
  'a1fbe6d4b1d59d038ffa939f0ff9a2b0',
  function (e, t, n, i, o, a, r, s, c) {
    var d = t._$klass();
    c = d._$extend(r._$$ModuleAbstract);
    c.__doBuild = function (e) {
      this.__super(e);
      this._doBuild(e);
    };
    c._doBuild = function (e, t) {
      if (e) {
        this._body = i._$html2node(e);
        this.__body = this._body;
      }
    };
    c.__onShow = function (e) {
      var t = this.__doParseParent(e);
      if (t && this.__body) t.appendChild(this.__body);
      this.__doApplyComposite('onshow', e);
      this._onShow(e);
      this.__onRefresh(e);
    };
    c._onShow = function (e) {};
    c.__onRefresh = function (e) {
      this.__super(e);
      this._onRefresh(e);
    };
    c._onRefresh = function (e) {};
    c.__onHide = function () {
      this.__doClearDomEvent();
      this.__doClearComponentExDsp();
      this.__doClearComponentRegular();
      this._onHide();
      this.__super();
    };
    c._onHide = function () {};
    c.__doClearComponentRegular = function () {
      e._$loop(this, function (e, t, n) {
        if (e && e.destroy) {
          delete n[t];
          e.destroy();
        }
      });
    };
    c.__doParseParent = function (e) {
      return this.__super(e) || document.body;
    };
    c.redirect = function (e, t) {
      if (this.__dispatcher) this.__dispatcher._$redirect.apply(this.__dispatcher, arguments);
      else location.redirect(e, t);
    };
    c.go2error = function (e) {
      location.href = '/error/' + e + '.htm';
    };
    s.build = function (t, i) {
      var o = function (t) {
        var n = location.parse(location.hash.substr(1));
        return e._$merge({ param: n.query }, n, t);
      };
      var a = t._$allocate();
      a._$dispatchEvent('onshow', o(i));
      n._$addEvent(location, 'urlchange', function () {
        a._$dispatchEvent('onrefresh', o());
      });
      location.active();
    };
    s.regist = r._$regist._$bind(r);
    s.merge = (function () {
      var t = ['title', 'rewrite', 'alias', 'action'];
      return function () {
        var n = { rules: {}, modules: {} };
        for (var i = 0, o = arguments.length, a; i < o; i++) {
          a = arguments[i];
          if (a) {
            var r = a.rules;
            if (r)
              e._$forEach(t, function (t) {
                if (r[t]) n.rules[t] = e._$merge(n.rules[t], r[t]);
              });
            n.modules = e._$merge(n.modules, a.modules);
          } else;
        }
        return n;
      };
    })();
    s.Module = d;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '4ef5ec5b4c22a1829138a6a305e46183',
  'd6c071332c7308ee7aac884791446059',
);
