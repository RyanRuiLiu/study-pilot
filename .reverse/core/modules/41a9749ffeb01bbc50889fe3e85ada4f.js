EDU(
  '41a9749ffeb01bbc50889fe3e85ada4f',
  function (e, t, n, i, o, a, r, s, c) {
    var d = {};
    a._$seed = TrimPath.seed;
    a._$get = (function () {
      var e = function (e) {
        return !a._$getTextTemplate ? '' : a._$getTextTemplate(e);
      };
      return function (n, i, o) {
        i = i || {};
        i.inline = e;
        o = t._$merge({}, d, o);
        o.rand = t._$uniqueID;
        o.format = t._$format;
        o.escape = t._$escape;
        o.inline = e;
        return TrimPath.merge(n, i, o);
      };
    })();
    a._$add = function (e, t) {
      if (!e) return '';
      var i,
        o = n._$get(e);
      if (o) {
        i = o.id;
        e = o.value || o.innerText;
        if (!t) n._$remove(o);
      }
      return TrimPath.parse(e, i);
    };
    a._$addTemplate = function (e, t) {
      return TrimPath.parse(e, t);
    };
    a._$render = function (e, t, i, o) {
      e = n._$get(e);
      if (e) e.innerHTML = a._$get(t, i, o);
    };
    a._$extend = function (e) {
      t._$merge(d, e);
    };
    i._$merge({ _$render: a._$render });
    if (!0) {
      var l = e.P('nej.e');
      l._$addHtmlTemplate = a._$add;
      l._$getHtmlTemplate = a._$get;
      l._$getHtmlTemplateSeed = a._$seed;
      l._$renderHtmlTemplate = a._$render;
      l._$registJSTExt = a._$extend;
    }
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'd37bb207915efdc94c2f2a74d479b6f5',
  '5b1463f91b12a37f47bf6a6997542c01',
);
