EDU(
  'af2a7901f01e5083a1fb1f6d4a673974',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      r = NEJ.P('edu.m'),
      s = NEJ.P('nej.ut'),
      c = NEJ.P('edu.u'),
      d;
    r._$$CharasetUtil = NEJ.C();
    d = r._$$CharasetUtil._$extend(s._$$Event, !0);
    d.__init = function (e) {
      this.__supInit(e);
    };
    c._$getCharsL = d._$getCharsL = function (e) {
      e = e || '';
      e = e.replace(/^\n+|\n+$/g, '');
      var t = e.length,
        n = 0;
      var i = e.match(/[^\x00-\x80]/g);
      if (i && i.length > 0) n = i.length || 0;
      return t + n;
    };
    c._$sliceCnAndEns = d._$sliceCnAndEns = function (e, t) {
      e = e || '';
      var n = '',
        i = e.length,
        e = e.split(''),
        o = 0;
      for (var a = 0; a < i; a++) {
        var r = e[a];
        var s = r.match(/[^\x00-\x80]/g);
        if (s && s.length > 0) o += 2;
        else o += 1;
        if (o > t) break;
        n += r;
      }
      return n;
    };
    c._$genNewStrByLength = d._$genNewStrByLength = function (e, t) {
      var n = e;
      if (this._$getCharsL(n) > t) n = this._$sliceCnAndEns(n, t) + '...';
      return n;
    };
    c._$escapeText = d._$escapeText = function (e) {
      var t = {
        r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        ' ': '&nbsp;',
        '"': '&quot;',
        "'": '&#39;',
        '\n': '',
        '\r': '',
      };
      e = a._$encode(t, e);
      return e;
    };
    c._$string2object = d._$string2object = function (e, t) {
      var n = {};
      a._$forEach((e || '').split(t), function (e) {
        var t = e.split('=');
        if (t && t.length) {
          var i = t.shift();
          if (i) {
            i = i.replace(/%/g, encodeURIComponent('%'));
            n[decodeURIComponent(i)] = decodeURIComponent(encodeURIComponent(t.join('=')));
          }
        }
      });
      return n;
    };
    d._$formatChars = function (e, t) {
      var n = new RegExp(e);
      return n.test(t);
    };
    d._$spaceFilter = function (e) {
      var t = new RegExp('(;|；|,|，|\\s{1,})');
      var n = e.split(t),
        i = [];
      for (var o = 0; o < n.length; o++)
        if (
          n[o] &&
          '' != n[o].trim() &&
          ';' != n[o].trim() &&
          '；' != n[o].trim() &&
          ',' != n[o].trim() &&
          '，' != n[o].trim()
        )
          i.push(n[o]);
      return i;
    };
    d.__reset = function (e) {
      this.__supReset(e);
    };
    return new r._$$CharasetUtil();
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
