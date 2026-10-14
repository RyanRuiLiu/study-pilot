EDU('ac7d64fe1d0d70755aaf94a58e8768c8', function () {
  var e = {};
  e['LIVE_NORMAL_MODE'] = 0;
  e['LIVE_CDN_MODE'] = 1;
  e['LIVE_METHOD_TYPE_TANGQIAO'] = 0;
  e['LIVE_METHOD_TYPE_OBS'] = 1;
  if (!window.useOldLiveConstant) {
    e['LIVE_STATUS_NOTSTART'] = 35;
    e['LIVE_STATUS_PLAYING'] = 0;
    e['LIVE_STATUS_END'] = 10;
    e['LIVE_STATUS_TRANSFORM_COMPLETE'] = 15;
    e['LIVE_STATUS_COMING'] = 20;
    e['LIVE_STATUS_DELAY_START'] = 25;
    e['LIVE_STATUS_INVALID'] = 30;
  } else {
    e['LIVE_STATUS_NOTSTART'] = 0;
    e['LIVE_STATUS_PLAYING'] = 1;
    e['LIVE_STATUS_END'] = 2;
    e['LIVE_STATUS_TRANSFORM_COMPLETE'] = 3;
    e['LIVE_STATUS_COMING'] = 4;
    e['LIVE_STATUS_DELAY_START'] = 5;
    e['LIVE_STATUS_INVALID'] = 6;
  }
  e['LIVE_STATUS_POLYV_NOTSTART'] = 999;
  e['LIVE_MODE_POLYV_PART'] = 10;
  e['LIVE_MODE_POLYV_FULL'] = 11;
  return e;
});
