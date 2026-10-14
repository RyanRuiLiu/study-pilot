EDU('0bfe59f6a064f7cd0db6f0bc1556935d', function () {
  var e = window.currentLanguage;
  var t = {};
  var n = 'en';
  var i = 'ch';
  var o = 'ja';
  t.isCh = function () {
    return !e || e === i;
  };
  t.isEn = function () {
    return e === n;
  };
  t.isJp = function () {
    return e === o;
  };
  t.isImoocUrl = function () {
    return location.pathname.match(/\/imooc/);
  };
  t.setLang = function (e) {
    window.moocConfig = window.moocConfig || {};
    window.moocConfig.lang = Object.assign({}, window.moocConfig.lang || {}, e);
  };
  t.getLang = function () {
    return window.moocConfig ? window.moocConfig.lang || {} : {};
  };
  t.getLangPack = function (e, t, n) {
    var i = e;
    if (this.isEn()) i = t;
    else if (this.isJp()) i = n;
    return i;
  };
  return t;
});
