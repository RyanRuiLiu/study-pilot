EDU(
  '70746e7d5275e20a5007065b9c00efe4',
  function (e, t) {
    function n(e) {
      return function (t, n) {
        t.setAttribute(e, n);
        this.$watch(n, function (i) {
          t.setAttribute(e, n);
        });
      };
    }
    function i(e) {
      if (0 !== e.trim().indexOf('{')) return '{' + e + '}';
      else return e;
    }
    var o = 'log-id',
      a = 'data-' + o,
      r = 'log-act',
      s = 'data-' + r,
      c = 'log-data',
      d = 'data-' + c;
    t[o] = n(a);
    t[r] = n(s);
    t.setData = function (t, n) {
      function i(t) {
        if (e._$isObject(t, 'object'))
          try {
            t = JSON.stringify(t);
          } catch (n) {
            t = '{}';
          }
        return t;
      }
      t.setAttribute(d, i(n));
    };
    t[c] = function (e, n) {
      t.setData(e, n);
      this.$watch(n, function (n) {
        t.setData(e, n);
      });
    };
    t['r-class'] = function (e, t) {
      if ('string' == typeof t) t = i(t);
      var n = this.name;
      var o = e.getAttribute('class') || '';
      var a = this.bemify ? e.getAttribute('bem-class') || o.trim().split(' ')[0].trim() : '';
      var r = e.namespaceURI && 'http://www.w3.org/1999/xhtml' !== e.namespaceURI;
      this.$watch(
        t,
        function (t) {
          var i = e.getAttribute('class');
          i = ' ' + (i || '').replace(/\s+/g, ' ') + ' ';
          var o;
          for (var s in t)
            if (t.hasOwnProperty(s)) {
              if (this.bemify) o = s.replace(/^~/, n).replace(/^&/, a);
              else o = s;
              i = i.replace(' ' + o + ' ', ' ');
              if (t[s] === !0) i += o + ' ';
            }
          i = i.trim();
          if (r) e.setAttribute('class', i);
          else e.className = i;
        },
        !0,
      );
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
