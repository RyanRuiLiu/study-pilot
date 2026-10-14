EDU(
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  function (e, t, n, i, o, a) {
    var r = e._$isMobileAll();
    n.MEDIA_STATE = {
      IDLE: 'IDLE',
      PLAYING: 'PLAYING',
      BUFFERING: 'BUFFERING',
      PAUSE: 'PAUSED',
      COMPLETE: 'COMPLETE',
    };
    n.VIDEO_QUALITY = { SD: 1, HD: 2, SHD: 3 };
    n.VIDEO_QUALITY_NAME = { 1: t.KEY_VIDEO_SD, 2: t.KEY_VIDEO_HD, 3: t.KEY_VIDEO_U_HD };
    n.VIDEO_SOURSE_MIME_TYPE = {
      mp4: 'video/mp4',
      m3u8: 'application/x-mpegURL;application/vnd.apple.mpegURL;video/MP2T',
    };
    n.ERROR_CODE = {
      VIDEO_DATA_ERROR_NO_URL: 3,
      VIDEO_DATA_ERROR_ENCRYPT: 4,
      MEDIA_ERROR_VIDEOTAG_NOT_SUPPORT: 5,
      MEDIA_ERROR_SOURCETYPE_NOT_SUPPORT: 6,
      MEDIA_ERROR_SOURCE_ERROR: 7,
      MEDIA_ERROR_VIDEO_ERROR: 8,
      MEDIA_ERROR_M3U8_DECRYPT_ERROR: 9,
      MEDIA_ERROR_HLS_ERROR: 10,
      MEDIA_ERROR_FLV_ERROR: 11,
    };
    n.ERROR_TXT = {
      3: t.KEY_VIDEO_MISSING,
      4: t.KEY_VIDEO_NOT_SUPPORT,
      5: t.KEY_VIDEO_BROWSER_NOT_SUPPORT,
      6: t.KEY_VIDEO_NOT_SUPPORT,
      7: t.KEY_VIDEO_SORRY,
      8: t.KEY_VIDEO_SORRY,
      9: t.KEY_VIDEO_NOT_SUPPORT,
      10: t.KEY_VIDEO_SORRY,
      11: t.KEY_VIDEO_SORRY,
    };
    n.URLMAP = { GET_CDN_DATA: '//study.163.com/cdn/getCdnPoint.htm' };
    n.VARCONST = { SEEK_STEP: 10, VOLUME_STEP: 0.2 };
    return n;
  },
  'beec6201069596ecb83a09e5fc3eb415',
  'ff1c5e9840f717fea21797b5071706db',
);
