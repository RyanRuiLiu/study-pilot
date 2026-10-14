EDU(
  '0b37bd19208cbac1c1ef61490b546431',
  function (e) {
    var t = {};
    window.liveLog = t;
    var n = [];
    t.log = function (e, t) {
      n.push({ content: e, time: new Date().getTime(), data: t });
    };
    t.cache = function () {
      return n;
    };
    t.output = function () {
      return JSON.stringify(n);
    };
    return t;
  },
  '2c94f4a525e970341087318fd0b94823',
);
