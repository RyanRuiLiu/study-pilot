EDU('0ae40beefbe61a7436a36d54d2e96075', function () {
  var e = {};
  e.errorCode = {
    SOURCE_EMPTY_ERROR: -2,
    DATA_FORMAT_ERROR: -1,
    LOAD_PDF_ERROR: 0,
    LOAD_PDF_PAGE_ERROR: 1,
    PDF_PAGE_DRAW_ERROR: 2,
  };
  e.errorTxt = {
    '-2': '无数据',
    '-1': '没有可以播放的图文资源',
    0: '图文加载失败',
    1: '资源加载失败或者已经过期，请刷新页面',
    2: '资源出现了错误',
  };
  return e;
});
