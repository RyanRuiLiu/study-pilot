EDU(
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  function (e, t, n, i, o, a) {
    var r = NEJ.P,
      s = NEJ.F,
      c = window,
      d = r('nej.e'),
      l = r('nej.u');
    a._$renderRich = (function () {
      var e = 0;
      if (!c.uParse) return null;
      else
        return function (t, n) {
          var o, a;
          if (t) {
            if (n) {
              t.innerHTML = n;
              o = t.querySelectorAll('[edu-custom]');
              l._$forEach(o, function (e) {
                var t = d._$dataset(e, 'link'),
                  n;
                if (e && t) {
                  n = d._$create('iframe');
                  n.className = e.getAttribute('edu-custom');
                  n.width = '100%';
                  n.height = d._$dataset(e, 'height');
                  n.src = t;
                  e.parentNode.replaceChild(n, e);
                }
              });
            }
            if (t && t.innerHTML) t.innerHTML = window.filterXSS(t.innerHTML, i);
            if (t.id) a = '#' + t.id;
            else {
              a = 'edueditor_styleclass_' + e++;
              d._$addClassName(t, a);
              a = '.' + a;
            }
            c.uParse2(t, a);
          }
        };
    })();
    a._$renderRich2 = (function () {
      if (!c.uParse) return null;
      var e = 0;
      return function (t) {
        if (t) {
          var n = document.createElement('div');
          var o;
          n.innerHTML = window.filterXSS(t, i);
          o = 'edueditor_styleclass_' + e++;
          d._$addClassName(n, o);
          o = '.' + o;
          c.uParse2(n, o);
          return n.innerHTML;
        }
      };
    })();
    l._$renderRich = a._$renderRich;
    l._$renderRich2 = a._$renderRich2;
    d._$getHtmlTemplate = d._$getHtmlTemplate._$aop(s, function (e) {
      var t = d._$html2node(e.value),
        n = d._$getByClassName(t, 'f-richEditorText'),
        i = d._$create('div');
      if (!n || n.length <= 0) return e;
      try {
        l._$forEach(n, function (e) {
          l._$renderRich(e);
        });
        i.appendChild(t);
        e.value = i.innerHTML;
        return e;
      } catch (o) {
        return e;
      }
    });
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'f31df7e65a4316911010cf3952ae1607',
  '1fc3ceedcd3896255166c7f123b6e40d',
  '20ec6fd5f433d6a3fd160001217d8d7e',
);
