EDU(
  'ac5be9068e47d8486d9371069bd2fccb',
  function (e, t, n, i, o, a, r, s, c, d) {
    c._$$UploadLog = t._$klass();
    var l = c._$$UploadLog._$extend(i._$$EventTarget);
    l.__init = function () {
      this.__super();
      this._logData = {};
      this._logId = null;
    };
    l.__reset = function (e) {
      this.__super(e);
      this._uploader = e.uploader;
      this._initEvent();
      this._statObjStart = {
        manufacturer: navigator.userAgent,
        platform: 'web',
        memberId: (r._$getWebUser() || {}).id || '',
      };
      this._logData = {};
      this._logId = null;
    };
    l.__destroy = function () {
      this.__super();
    };
    l._initEvent = function () {
      if (this._uploader.$on) {
        this._uploader.$on('onLogUploadError', this._onError._$bind(this));
        this._uploader.$on('onLogUploadBlob', this._onUploadBlob._$bind(this));
        this._uploader.$on('onLogFinishUpload', this._onUploadComplete._$bind(this));
        this._uploader.$on('onLogBeginUpload', this._onLogUploadStart._$bind(this));
        this._uploader.$on('onLogUploadRetry', this._onLogUploadRetry._$bind(this));
      } else if (this._uploader._$addEvent) {
        this._uploader._$addEvent('onLogUploadError', this._onError._$bind(this));
        this._uploader._$addEvent('onLogUploadBlob', this._onUploadBlob._$bind(this));
        this._uploader._$addEvent('onLogFinishUpload', this._onUploadComplete._$bind(this));
        this._uploader._$addEvent('onLogBeginUpload', this._onLogUploadStart._$bind(this));
        this._uploader._$addEvent('onLogUploadRetry', this._onLogUploadRetry._$bind(this));
      }
    };
    l._postLog = function () {
      this._logData.action =
        this._logData.errorCode || this._logData.errorMessage ? 'uploadError' : 'upload';
      this._logData.manufacturer = this._statObjStart.manufacturer;
      this._logData.platform = this._statObjStart.platform;
      this._logData.memberId = this._statObjStart.memberId;
      if (this._logData.blobSpeed && this._logData.blobSpeed.length)
        this._logData.blobSpeed = this._logData.blobSpeed.join(',');
      if (this._logData.blobStartOffset && this._logData.blobStartOffset.length)
        this._logData.blobStartOffset = this._logData.blobStartOffset.join(',');
      if (this._logData.blobEndOffset && this._logData.blobEndOffset.length)
        this._logData.blobEndOffset = this._logData.blobEndOffset.join(',');
      if (this._logData.uploadIp && this._logData.uploadIp.length)
        this._logData.uploadIp = this._logData.uploadIp.join(',');
      if (this._logData.errorCodeHistory && this._logData.errorCodeHistory.length)
        this._logData.errorCodeHistory = this._logData.errorCodeHistory.join(',');
      if (this._logData.errorMsgHistory && this._logData.errorMsgHistory.length)
        this._logData.errorMsgHistory = this._logData.errorMsgHistory.join(',');
      var e = (window.eduProduct && window.eduProduct.gaProduct) || window.gaProduct;
      if (e) {
        var t = {
          type: 'json',
          data: { p: e, dt: a._$str2hex(JSON.stringify(this._logData)) },
          method: 'POST',
          cookie: !0,
          onload: function (e) {}._$bind(this),
          onerror: function () {},
        };
        o._$request('//log.study.163.com/__utm.gif', t);
      }
    };
    l._onLogUploadStart = function (e) {
      this._logId = e.logId;
      window['eduUploadLogData-' + this._logId + '-' + new Date().getTime()] = this._logData = {};
      this._logData.startTime = e.curTime;
      this._logData.completeTime = null;
      this._logData.errorTime = null;
      this._logData.retryCount = 0;
      this._logData.errorCodeHistory = [];
      this._logData.errorMsgHistory = [];
      this._logData.uploadType = e.uploadType;
      this._logData.supportBlob = e.supportBlob;
      this._logData.fileSize = e.fileSize;
      this._logData.fileName = e.fileName;
      this._logData.bucket = e.bucket;
      this._logData.nosKey = e.nosKey;
      this._logData.uploadIp = [e.uploadIp];
      this._logData.blobSpeed = [];
      this._logData.blobStartOffset = [];
      this._logData.blobEndOffset = [];
      this._logData.errorCode = null;
      this._logData.errorMessage = null;
    };
    l._onUploadBlob = function (e) {
      var t = e.startTime;
      var n = e.endTime;
      var i = e.startOffset;
      var o = e.endOffset;
      if (!this._logData.blobSpeed) this._logData.blobSpeed = [];
      var a = s._$formatFileSize((o - i) / ((n - t) / 1e3));
      this._logData.blobSpeed.push(a);
      if (!this._logData.blobStartOffset) this._logData.blobStartOffset = [];
      this._logData.blobStartOffset.push(i);
      if (!this._logData.blobEndOffset) this._logData.blobEndOffset = [];
      this._logData.blobEndOffset.push(o);
    };
    l._onUploadComplete = function (e) {
      this._logData.completeTime = new Date().getTime();
      this._postLog();
    };
    l._onLogUploadRetry = function (e) {
      this._logData.retryCount = e.index;
      this._logData.uploadIp = this._logData.uploadIp || [];
      this._logData.uploadIp.push(e.ip);
      this._logData.errorCodeHistory = this._logData.errorCodeHistory || [];
      this._logData.errorCodeHistory.push(e.errCode);
      this._logData.errorMsgHistory = this._logData.errorMsgHistory || [];
      this._logData.errorMsgHistory.push(e.errMsg);
    };
    l._onError = function (t) {
      if (e._$isObject(t)) {
        this._logData.errorCode = t.errCode;
        this._logData.errorMessage = t.errMsg;
      } else {
        this._logData.errorCode = t;
        this._logData.errorMessage = null;
      }
      this._logData.errorTime = t.errorTime;
      this._postLog();
    };
    return c;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '8a864b627c302d7d1c56bd928b515d1b',
  'af8805404cc0bd2b95d3d3c9573484b1',
  'ecc0bbe3c8ad6be8c2cd6f2cc1afe656',
  'b7fc133486c3e69fac5e1cd5bca47c40',
);
