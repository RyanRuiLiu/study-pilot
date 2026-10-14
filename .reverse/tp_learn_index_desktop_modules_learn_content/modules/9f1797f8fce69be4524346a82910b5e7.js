EDU(
  '9f1797f8fce69be4524346a82910b5e7',
  function () {
    var e = window,
      t = NEJ.P('edu.u'),
      n = NEJ.P('nej.u');
    t._$convertSrts = function (i) {
      var o = { html5: [], flash: [] },
        a = '';
      if (!i) return o;
      i.sort(function (e, t) {
        return e.lang < t.lang ? -1 : 1;
      });
      n._$forEach(
        i,
        function (i) {
          if (i && i.nosUrl) {
            a = i.lang == t.CONST.SRT_TYPE_CH ? '中文' : '外文';
            o.html5.push({
              url: e.urlPrefix.getTextPrefix + '?downloadUrl=' + n._$str2hex(i.nosUrl),
              name: a,
            });
            o.flash.push({ url: i.nosUrl, name: a });
          }
        }._$bind(this),
      );
      return o;
    };
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '93828627ddb358ed890cb65967a0c1de',
  'fe86216ed59e3103a56c42c850d389f0',
  'af8805404cc0bd2b95d3d3c9573484b1',
);
