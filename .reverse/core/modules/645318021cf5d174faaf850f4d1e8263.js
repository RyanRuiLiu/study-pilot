EDU(
  '645318021cf5d174faaf850f4d1e8263',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    s._$$Module = e._$klass();
    c = s._$$Module._$extend(o._$$ModuleAbstract, !0);
    c.__doBuild = function (e) {
      this.__struct = this.__getStructure();
      this.__parent = this.__getParent();
      this.__body = t._$html2node(this.__getXhtml());
      this.__buildFuncPoints();
    };
    c.__getStructure = d;
    c.__getXhtml = function () {
      return a._$getTextTemplate(this.__struct.body) || r._$get(this.__struct.body);
    };
    c.__buildFuncPoints = function () {};
    c.__getParent = function () {
      return t._$get(this.__struct.parent);
    };
    c.__getParam = function (e) {
      e = e || {};
      this.__param = n._$merge(
        e.param,
        n._$query2object(location.search.length > 1 ? location.search.substr(1) : ''),
      );
    };
    c.__onShow = function (e) {
      if (e) {
        if (this.__parent && this.__body.parentNode != this.__parent)
          this.__parent.appendChild(this.__body);
        this.__getParam(e);
      }
    };
    c.__onRefresh = function (e) {
      this.__getParam(e);
    };
    c.__onHide = function () {
      t._$removeByEC(this.__body);
    };
  },
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'd6c071332c7308ee7aac884791446059',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
);
