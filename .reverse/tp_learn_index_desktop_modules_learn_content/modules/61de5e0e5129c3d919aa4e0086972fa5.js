EDU(
  '61de5e0e5129c3d919aa4e0086972fa5',
  function (e) {
    var t = {};
    t.tipsTexts = {
      NO_MICROPHONE: '没有检测到麦克风',
      NO_CAMERA: '没有检测到摄像头',
      NOT_SUPPORTED: '当前浏览器不支持举手互动，请更换成Chrome浏览器 54.0以上版本',
      PRESENTER_REQUEST: '您是讲师，无法申请互动',
      FREQUENCY_LIMIT: '申请互动频率过高，请稍后再试',
      REJECT: '互动请求未被接受，请稍后再试',
      EXCEPTION: '服务器异常，请重新申请互动',
    };
    t.tipsTexts[e.MICRO_TYPE_DICT.VIDEO] = {
      REQUESTING: '视频互动请求中，请耐心等待',
      REQUEST_SUC: '已成功进入视频互动',
      ASK_REQUEST_END: '确定要结束视频互动吗？',
      REQUEST_END: '视频互动已结束',
    };
    t.tipsTexts[e.MICRO_TYPE_DICT.AUDIO] = {
      REQUESTING: '音频互动请求中，请耐心等待',
      REQUEST_SUC: '已成功进入音频互动',
      ASK_REQUEST_END: '确定要结束音频互动吗？',
      REQUEST_END: '音频互动已结束',
    };
    t.REQUEST_FREQUENCY = 1e3;
    t.TIMEOUT = 2e5;
    t.btnStatusDict = { UNFOLD: 0, FOLD: 2, DISABLE: 4, CANCEL: 6, END: 8 };
    t.btnObjDict = {
      0: {
        status: 'unfold',
        className: 'unfold',
        text: '<i class="icon-edu-live-handup-empty"></i>',
        fn: 'clickUnfoldBtn',
      },
      2: {
        status: 'fold',
        className: 'fold',
        text: '<i class="ux-icon ux-icon-wrong"></i>',
        fn: 'clickFoldBtn',
      },
      4: { status: 'disable', className: 'disable', text: '', fn: 'clickDisableBtn' },
      6: { status: 'cancel', className: 'cancel', text: '取消', fn: 'clickCancelBtn' },
      8: { status: 'end', className: 'end', text: '结束', fn: 'clickEndBtn' },
    };
    t.microIconObjDict = {};
    t.microIconObjDict[e.MICRO_TYPE_DICT.VIDEO] = { className: 'camera-empty' };
    t.microIconObjDict[e.MICRO_TYPE_DICT.AUDIO] = { className: 'microphone-empty' };
    t.serverCodeDict = {
      SUC: 0,
      LIMIT: 101,
      NOT_ALLOWED: 102,
      ERROR: 103,
      REPEATED: 104,
      AUDIO_ALREADY: 105,
      VIDEO_ALREADY: 106,
    };
    t.serverCodeTipsDict = {
      101: '申请互动名额已满，请稍后再试',
      102: '当前直播状态不允许请麦',
      103: '服务器异常，请重新申请互动',
      104: '视频互动请求中，请耐心等待',
      105: '',
      106: '',
    };
    return t;
  },
  'bcf071761289ae1019dcc5e22b391493',
);
