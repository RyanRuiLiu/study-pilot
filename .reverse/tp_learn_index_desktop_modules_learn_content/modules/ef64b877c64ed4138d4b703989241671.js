EDU('ef64b877c64ed4138d4b703989241671', function () {
  var e = {};
  e['LIVE_NORMAL_MODE'] = 0;
  e['LIVE_CDN_MODE'] = 1;
  if (!window.useOldLiveConstant) {
    e['LIVE_STATUS_NOTSTART'] = 35;
    e['LIVE_STATUS_PLAYING'] = 0;
    e['LIVE_STATUS_END'] = 10;
    e['LIVE_STATUS_TRANSFORM_COMPLETE'] = 15;
    e['LIVE_STATUS_COMING'] = 20;
    e['LIVE_STATUS_DELAY_START'] = 25;
    e['LIVE_STATUS_INVALID'] = 30;
    e['LIVE_STATUS_LOADING'] = 999;
  } else {
    e['LIVE_STATUS_NOTSTART'] = 0;
    e['LIVE_STATUS_PLAYING'] = 1;
    e['LIVE_STATUS_END'] = 2;
    e['LIVE_STATUS_TRANSFORM_COMPLETE'] = 3;
    e['LIVE_STATUS_COMING'] = 4;
    e['LIVE_STATUS_DELAY_START'] = 5;
    e['LIVE_STATUS_INVALID'] = 6;
    e['LIVE_STATUS_LOADING'] = 999;
  }
  e['CUSTOM_LIVE'] = 1;
  e['INTERACTIVE_LIVE'] = 2;
  e['CLOUD_SIMPLE_LIVE'] = 10;
  e['CLOUD_PRETTY_LIVE'] = 11;
  e['OUT_LIVE'] = 13;
  return e;
});
