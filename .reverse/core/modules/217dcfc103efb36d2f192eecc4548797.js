EDU('217dcfc103efb36d2f192eecc4548797', function (e) {
  function t(e, t) {
    var n = t ? new Map() : {};
    e.forEach(function (e) {
      t ? n.set(e.key, e.value) : (n[e.key] = e.value);
    });
    return n;
  }
  function n(e, n) {
    var i = t(n);
    e.forEach(function (e) {
      e.checked = 1 == i[e.id];
    });
    return e;
  }
  function i(e, t, n) {
    if ('this' === t) return this && this.valueOf ? this.valueOf() : this;
    if (null == e) return n;
    t = t.replace(/\[(\d+)]/g, function (e, t) {
      return '.' + t;
    });
    t = t.replace(/^\./, '');
    var o = t.indexOf('.');
    var a = t.slice(0, o);
    var r = t.slice(o + 1);
    var s = 'this' === a ? this : e[a];
    if (o === -1)
      if ((!e.hasOwnProperty && t in e) || (e.hasOwnProperty && e.hasOwnProperty(t))) return e[t];
      else return n;
    else return i.call(this, s, r, n);
  }
  e.dom = Regular.dom;
  e.noop = Regular.util.noop;
  e.multiline = function (e) {
    if (/^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/.test(e)) return RegExp.$1;
  };
  var o = /(^|[^<]+)<[\w-]+\s*class="\s*([\w-]+)[\s|"]/i;
  var a = /(\sclass="\s*)~/gi;
  var r = /(\sclass="\s*)&/gi;
  e.bemify = function (e, t, n) {
    t = t || (e.trim().match(o) || '')[2];
    if (!t) {
      console.warn('there is no root-class here:\n', e.slice(0, 99));
      return e;
    }
    return e.replace(n ? r : a, function (e, n) {
      return n + t;
    });
  };
  e.extend = function (e, t, n, i) {
    for (var o in t) if ((!i || t.hasOwnProperty(o)) && (n || void 0 === e[o])) e[o] = t[o];
    return e;
  };
  e.map2list = function (e, t, n) {
    var i = [];
    var o;
    t = t || 'id';
    n = n || 'name';
    for (var a in e)
      if (e.hasOwnProperty(a)) {
        o = {};
        o[t] = a;
        o[n] = e[a];
        i.push(o);
      }
    return i;
  };
  e.hashList2map = t;
  e.updateCheckedListByHashList = n;
  e.deepGet = i;
  e.webTypeParserMap = {
    time: function (e) {
      return Number(e) || '';
    },
    number: function (e) {
      e = Number(e);
      return e !== e ? '' : e;
    },
    string: function (e) {
      return null == e ? '' : String(e);
    },
    boolean: function (e) {
      if ('' === e || null == e) return '';
      else return e !== !1 && 0 !== e && '0' !== e && 'false' !== e && 'FALSE' !== e;
    },
    array: function (e) {
      return Array.isArray(e) ? e : [];
    },
    fullList: function (e) {
      if ('string' == typeof e)
        return e
          .split(',')
          .map(function (e) {
            return e.trim();
          })
          .filter(function (e) {
            return !!e;
          });
      else
        return e.filter(function (e) {
          return null != e && '' !== e;
        });
    },
    checkedHashList: function (e) {
      var t = [];
      if (!e) return t;
      for (var n = 0; n < e.length; n++) t.push({ key: e[n].id, value: Number(e[n].checked) });
      return t;
    },
  };
  e.addType = function (t, n) {
    if (e.webTypeParserMap[t]) console.log(t + 'is override!');
    else e.webTypeParserMap[t] = n;
  };
  e.pick = function (t, n, o) {
    var a = {};
    var r = ' as ';
    var s = '{';
    var c = ':';
    var d = /([\w:]+)\s*\{\s*([\w.]+)\s*}/g;
    var l = this === e ? t : this;
    var u = 'string' == typeof n;
    var _, f, h, p, m, g, b, v, E;
    if (null == n) return a;
    else if (u) n = [n];
    if (arguments[2] && 'object' == typeof arguments[2]) {
      b = arguments[2];
      o = b.notFound;
      v = b.keepNull;
      E = b.keepUndefined;
    }
    for (var x = 0; x < n.length; x++) {
      _ = n[x].replace(/\[(\d+)]/g, function (e, t) {
        return '.' + t;
      });
      if (_.indexOf(r) > 0) p = _.split(r);
      else if (_.indexOf(s) > 0)
        _.replace(d, function (e, t, n) {
          p = [n, t];
        });
      if (p) {
        if (p.length < 2) throw new Error('Params Error:there is no attr-path or key here!');
        h = p[0].trim();
        _ = p[1].trim();
      }
      if (_.indexOf(c) > 0) {
        m = _.split(c);
        g = m[1].trim();
        _ = m[0].trim();
      }
      h = h || _;
      f = 2 == arguments.length ? i.call(l, t, h) : i.call(l, t, h, o);
      f = g ? e.webTypeParserMap[g](f) : f;
      if (v && null === f);
      else if (E && void 0 === f);
      else f = null == f ? '' : f;
      a[_] = f;
      p = h = _ = f = g = m = null;
    }
    if (u) for (var w in a) return a[w];
    return a;
  };
});
