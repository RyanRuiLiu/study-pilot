EDU('f657f10b7466ef69e5081338d923dc35', function () {
  var e = {};
  e.checkCompatibility = function (e) {
    window.WebRTC.checkCompatibility().then(function (t) {
      console.log(t);
      e.call(this, t);
    });
  };
  e.checkCamera = function (e) {
    if (window.WebRTC)
      window.WebRTC.checkCompatibility().then(function (t) {
        console.log(t);
        e.call(this, t.Camera);
      });
    else e.call(this, !1);
  };
  e.checkMicrophone = function (e) {
    if (window.WebRTC)
      window.WebRTC.checkCompatibility().then(function (t) {
        console.log(t);
        e.call(this, t.Microphone);
      });
    else e.call(this, !1);
  };
  e.checkSupportInteractive = function (e) {
    if (window.WebRTC)
      window.WebRTC.checkCompatibility().then(function (t) {
        var n = !1,
          i = t.version.split('.') || [],
          o = 54,
          a = 0;
        if ('chrome' == t.browser.toLocaleLowerCase() && i[a] > o) n = !0;
        e.call(this, n);
      });
    else e.call(this, !1);
  };
  return e;
});
