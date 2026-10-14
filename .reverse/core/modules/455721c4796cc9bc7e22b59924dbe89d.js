EDU(
  '455721c4796cc9bc7e22b59924dbe89d',
  function (e, t, n, i) {
    var o = {};
    o.buildEvents = function (e, t) {
      var n = [],
        i = {},
        o = null;
      if ('function' != typeof t) return n;
      for (var a = 0; a < e.length; a++) {
        o = t(e[a]);
        if (o) {
          if (o.eventName)
            if (i.eventName == o.eventName) i.data.push(e[a]);
            else {
              i = { eventName: o.eventName, data: [e[a]] };
              n.push(i);
            }
        } else;
      }
      return n;
    };
    return o;
  },
  '6182651a6f54d23eace06c6446bb3dcb',
);
