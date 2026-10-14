EDU('a683120291a4c0998be593ee310724ec', function (e, t, n, i) {
  var o = function (e) {
    var t = [{ begin: 0, text: '' }];
    e = e.replace(/^\s+/, '').replace(/\s+$/, '');
    var n = e.split('\r\n\r\n');
    if (1 == n.length) n = e.split('\n\n');
    for (var i = 0; i < n.length; i++) {
      var o = a(n[i]);
      if (o['text']) {
        t.push(o);
        if (o['end']) {
          t.push({ begin: o['end'], text: '' });
          delete o['end'];
        }
      }
    }
    return t;
  };
  var a = function (e) {
    var t = {};
    var n = e.split('\r\n');
    if (1 == n.length) n = e.split('\n');
    try {
      var i = n[1].indexOf(' --> ');
      if (i > 0) {
        t['begin'] = r(n[1].substr(0, i));
        t['end'] = r(n[1].substr(i + 5));
      }
      if (n[2]) {
        t['text'] = n[2];
        for (var o = 3; o < n.length; o++) t['text'] += '\n' + n[o];
      }
    } catch (a) {
      throw a;
    }
    return t;
  };
  var r = function (e) {
    e = e.replace(',', '.');
    var t = e.split(':');
    var n = 0;
    if ('ms' == e.substr(-2).toLocaleLowerCase()) n = Number(e.substr(0, e.length - 2)) / 1e3;
    else if ('s' == e.substr(-1).toLocaleLowerCase()) n = Number(e.substr(0, e.length - 1));
    else if ('m' == e.substr(-1).toLocaleLowerCase()) n = 60 * Number(e.substr(0, e.length - 1));
    else if ('h' == e.substr(-1).toLocaleLowerCase()) n = 3600 * Number(e.substr(0, e.length - 1));
    else if (t.length > 1) {
      n = Number(t[t.length - 1]);
      n += 60 * Number(t[t.length - 2]);
      if (3 == t.length) n += 3600 * Number(t[t.length - 3]);
    } else n = Number(e);
    return n;
  };
  e.parseSrt = o;
  return e;
});
