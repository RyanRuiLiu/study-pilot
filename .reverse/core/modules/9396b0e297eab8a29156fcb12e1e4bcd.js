EDU(
  '9396b0e297eab8a29156fcb12e1e4bcd',
  function (e, t, n, i, o, a) {
    n.isLocal = !1;
    n.isdev = !1;
    n.txt = '上传';
    n.btnClassName = '';
    n.btnDisableClassName = '';
    n.type = t.UPLOAD_FILE_TYPE_VIDEO;
    n.mode = 0;
    n.initUploadUrl = t.DEFAULT_INIT_UPLOAD_URL;
    n.verifyFile = null;
    n.onBeginUpload = null;
    n.onUpdateProgress = null;
    n.onFinishUpload = null;
    n.onUploadError = null;
    var r = function () {
      if (window.uploaderDefaultConfig) n = e._$merge(n, window.uploaderDefaultConfig);
      return n;
    };
    return r;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '5c7056e4308772bfe37d20fd87012cce',
);
