EDU(
  'cc3230161064fa3e5d840399ba83ff57',
  function (e, t, n, i, o, a) {
    n.isLocal = !1;
    n.isdev = !1;
    n.txt = '上传';
    n.btnClassName = '';
    n.btnDisableClassName = '';
    n.type = t.UPLOAD_FILE_TYPE_VIDEO;
    n.mode = 0;
    n.initUploadUrl = '//www.icourse163.org/uploaderAccess/getUploaderVideoToken';
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
  '66c2ed70c8e5c5a6817eb8911f02fa45',
);
