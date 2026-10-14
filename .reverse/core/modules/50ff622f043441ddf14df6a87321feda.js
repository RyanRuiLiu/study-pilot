EDU(
  '50ff622f043441ddf14df6a87321feda',
  function (e, t) {
    t = e;
    t._$filterText = function (e) {
      return t._$removeNRNBSP((e || '').replace(/\<[\s\S]*?\>/g, ''));
    };
    t._$handleImg = function (e) {
      return e.replace(/<img(.*?)>/g, '【图片】');
    };
    t._$removeNRNBSP = function (e) {
      return (e || '')
        .replace(/[\t\r\n]+/gi, ' ')
        .replace(/[ ]+/gi, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
    };
    t._$handleImg = function (e) {
      return e.replace(/<img(.*?)>/g, '【图片】');
    };
    NEJ.copy(NEJ.P('edu.u'), t);
    return t;
  },
  '7af1d8adfbbd073e9119142538a22e8e',
);
