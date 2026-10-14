EDU(
  'ad54fcaeb73e46ff02912887837d1314',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p, m, g, b) {
    var v = n._$pushCSSText(
      '        .u-upload{ position:relative; display:inline-block;}        .u-upload .showIpt{ text-align:center; overflow:hidden;}        .u-upload .filewrap{ overflow:hidden; position:absolute; top:0; left:0; width:100%; height:100%;}        .u-upload .realIpt{ font-size:100px; display:block; position:absolute; top:0; left:0; filter:alpha(opacity=0); opacity:0; cursor:pointer; width:100%; height:100%;}',
    );
    p._$$UploadUI = NEJ.C();
    var E;
    E = p._$$UploadUI._$extend(o._$$Abstract, !0);
    E.__initXGui = function () {
      this.__seed_css = v;
      this.__seed_html = i._$addNodeTemplate(e);
    };
    E.__initNode = function () {
      this.__supInitNode();
      this.__showUpload = this.__body;
      this.__txtNode = n._$getByClassName(this.__body, 'j-txt')[0];
      this.__fileWrapNode = n._$getByClassName(this.__body, 'j-filewrap')[0];
      this.__uploadForm = n._$getByClassName(this.__body, 'j-uploadForm')[0];
    };
    E.__errorHandler = function (e, n) {
      if (!t._$isObject(e)) e = { errCode: null, errMsg: e };
      if (
        e.errCode == l['ERROR_CODE_GET_NOS_TOKEN_FAIL'] ||
        e.errCode == l['ERROR_CODE_GET_CONTEXT_FAIL'] ||
        e.errCode == l['ERROR_CODE_SAVE_CONTEXT_FAIL'] ||
        e.errCode == l['ERROR_CODE_CHECK_FILE_ERROR']
      )
        if (e.errMsg == -2) {
          this.__getEduToken();
          return;
        }
      if (
        e.errCode == l['ERROR_CODE_NOS_UPLOAD_BLOB_ERROR'] ||
        e.errCode == l['ERROR_CODE_NOS_UPLOAD_BLOB_NO_OFFSET_ERROR'] ||
        e.errCode == l['ERROR_CODE_NOS_UPLOAD_BLOB_NETWORK_ERROR']
      )
        if (this.__posUploadIPIndex != this.__uploadIPs.length - 1) {
          this.__posUploadIPIndex++;
          this._$dispatchEvent('onLogUploadRetry', {
            logId: this._logId,
            index: this.__posUploadIPIndex,
            errCode: e.errCode,
            errMsg: e.errMsg,
            ip: this.__uploadIPs[this.__posUploadIPIndex],
          });
          this.__isRetry = !0;
          this.__checkToUpload();
          return;
        }
      var i = e.code || e.errCode || '';
      var o = e.errMsg || e.msg || e.message || '网络错误';
      this.__resetHtmlFileNode();
      if (!this.__isAbort) {
        this._$dispatchEvent('onLogUploadError', { logId: this._logId, errCode: i, errMsg: o });
        this.__config.onUploadError &&
          this.__config.onUploadError({
            reqId: this.__reqId,
            errCode: i,
            errMsg: o,
            fileName: this.__file,
          });
      }
    };
    E.__resetHtmlFileNode = function (e) {
      var i;
      if (!e) {
        i = '<input name="file" type="file" class="j-inputfile realIpt" title="" ';
        if (t._$isArray(this.__config.allowFileTypes) && this.__config.allowFileTypes.length > 0)
          i += 'accept="' + this.__config.allowFileTypes.join(', ') + '" >';
        else
          switch (this.__config.type) {
            case l.UPLOAD_FILE_TYPE_PDF:
              i += 'accept="' + l.PDF_FILE_EXTENSION.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_VIDEO:
              i += 'accept="' + l.VIDEO_FILE_EXTENSION.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_ATTACH:
              i += 'accept="' + l.ATTACH_FILE_EXTENSION.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_ATTACH_BIG:
              i += 'accept="' + l.ATTACH_FILE_EXTENSION_BIG.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_CAPTION:
              i += 'accept="' + l.CAPTION_FILE_EXTENSION.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_IMAGE:
              if (f._$is('android') && f._$isWeixin()) i += ' >';
              else i += 'accept="' + l.IMAGE_FILE_EXTENSION.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_EXCEL:
              i += 'accept="' + l.EXCEL_FILE_EXTENSION.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_AUDIO:
              i += 'accept="' + l.AUDIO_FILE_EXTENSION.join(', ') + '" >';
              break;
            case l.UPLOAD_FILE_TYPE_STEAM_WORK:
              i += 'accept="' + l.STEAM_WORK_FILE_EXTENSION.join(', ') + '" >';
              break;
            default:
              i += '>';
          }
        this.__fileWrapNode.innerHTML = i;
        this.__realUpload = n._$getByClassName(this.__body, 'j-inputfile')[0];
        this.__doInitDomEvent([[this.__realUpload, 'change', this.__uploadHandler._$bind(this)]]);
      } else this.__fileWrapNode.innerHTML = '';
    };
    E._$disable = function (e) {
      this.__isDisable = e;
      if (this.__isDisable) {
        if (this.__config.btnDisableClassName)
          n._$addClassName(this.__showUpload, this.__config.btnDisableClassName);
      } else if (this.__config.btnDisableClassName)
        n._$delClassName(this.__showUpload, this.__config.btnDisableClassName);
      this.__resetHtmlFileNode(e);
    };
    E._$abort = function () {
      this.__isAbort = !0;
      if (this.__formUploadId) {
        d._$abortFileUploadByForm(this.__formUploadId);
        this.__formUploadId = null;
      }
      if (this.__blobUploadId) {
        c._$abortFileUploadByBlobs(this.__blobUploadId);
        this.__blobUploadId = null;
      }
      this.__resetHtmlFileNode();
    };
    E.__onUploading = function (e) {
      if (e) {
        e.initOffset = e.initOffset || 0;
        e.beginTime = this.__beginTime;
        e.fileName = this.__file;
        this.__config.onUpdateProgress && this.__config.onUpdateProgress(e);
      }
    };
    E.__onUploadBlob = function (e) {
      if (e) {
        e.logId = this._logId;
        this._$dispatchEvent('onLogUploadBlob', e);
      }
    };
    E.__onUploadComplete = function (e) {
      e = e || {};
      this.__resetHtmlFileNode();
      if (!e.errCode)
        if (!this.__isSupportAnchor()) {
          var t = {
            fileName: this.__file,
            nosKey: this.__nosKey,
            bucket: this.__bucket,
            fileSize: this.__fileSize,
          };
          this._$dispatchEvent('onLogFinishUpload', { logId: this._logId });
          this.__config.onFinishUpload && this.__config.onFinishUpload(t);
        } else this.__checkFileComplete();
      else this.__errorHandler(e);
    };
    E.__uploadHandler = function () {
      this.__isAbort = !1;
      this.__isRetry = !1;
      var e = this.__realUpload.value,
        t = e;
      for (; t.indexOf('\\') != -1;) t = t.slice(t.lastIndexOf('\\') + 1);
      if (
        !this.__config.verifyFile ||
        this.__config.verifyFile(t, this.__realUpload, this.__config.sizeLimit)
      ) {
        this.__file = t;
        this.__filePath = r._$str2hex(e);
        this.__beginTime = new Date().getTime();
        this.__fileSize = s._$getFileSize(this.__realUpload);
        this.__fileGmtModifiedTime = s._$getFileLastModifiedTime(this.__realUpload);
        if (this.__file)
          this.__config.onBeginUpload &&
            this.__config.onBeginUpload({
              name: this.__file,
              fileName: this.__file,
              curTime: this.__beginTime,
            });
        this.__getEduToken();
      } else this.__resetHtmlFileNode();
    };
    E.__getEduToken = function () {
      var e = {
        fileName: encodeURIComponent(this.__file),
        type: s._$getFinalUploadType(this.__config.type),
        fileSize: this.__fileSize,
        fileGmtModifiedTime: this.__fileGmtModifiedTime,
      };
      if (!e.fileSize) {
        e.filePath = this.__filePath;
        e.version = 1;
        e.uuid = h._$getUuidFromCookie();
      }
      if (this.__config.tokenHasVersion) {
        e.filePath = this.__filePath;
        e.version = 1;
      }
      var t = {
        sync: !1,
        type: 'json',
        data: e,
        query: {},
        method: 'GET',
        timeout: 0,
        headers: {},
        cookie: this.__config.eduToken || !1,
        mode: this.__config.mode,
        onload: function (e) {
          if (e)
            if (0 != e.code)
              this.__errorHandler({ errCode: l['ERROR_CODE_GET_APP_TOKEN_FAIL'], errMsg: e.code });
            else {
              this.__eduUploaderToken = e.result;
              this.__getNosToken();
            }
          else
            this.__errorHandler({
              errCode: l['ERROR_CODE_GET_APP_TOKEN_FAIL'],
              errMsg: '初始化上传失败！',
            });
        }._$bind(this),
        onerror: this.__errorHandler._$bind(this, {
          errCode: l['ERROR_CODE_GET_APP_TOKEN_FAIL'],
          errMsg: '初始化上传失败！',
        }),
      };
      this.__reqId = a._$request(this.__config.initUploadUrl, t);
    };
    E.__getNosToken = function () {
      var e = {
        sync: !1,
        type: 'json',
        query: {
          eduUploaderToken: this.__eduUploaderToken,
          fileName: encodeURIComponent(this.__file),
          fileSize: this.__fileSize,
          fileGmtModifiedTime: this.__fileGmtModifiedTime,
          _t: new Date().getTime(),
        },
        method: 'GET',
        timeout: 0,
        headers: {},
        cookie: this.__config.nosToken || !1,
        mode: this.__config.mode,
        onload: function (e) {
          if (e)
            if (0 != e.code)
              this.__errorHandler({ errCode: l['ERROR_CODE_GET_NOS_TOKEN_FAIL'], errMsg: e.code });
            else {
              this.__xNosToken = e.result.xnosToken;
              this.__bucket = e.result.bucketName;
              this.__nosKey = e.result.nosKey;
              this.__checkToUpload();
            }
          else
            this.__errorHandler({
              errCode: l['ERROR_CODE_GET_NOS_TOKEN_FAIL'],
              errMsg: '获取nos信息失败',
            });
        }._$bind(this),
        onerror: this.__errorHandler._$bind(this, {
          errCode: l['ERROR_CODE_GET_NOS_TOKEN_FAIL'],
          errMsg: '获取nos信息失败',
        }),
      };
      this.__reqId = a._$request(l.EXCHANGE_NOSTOKEN_URL, e);
    };
    E.__checkFileComplete = function () {
      var e = {
        type: 'json',
        query: { bucketName: this.__bucket, nosKey: this.__nosKey },
        method: 'POST',
        cookie: !1,
        mode: this.__config.mode,
        onload: function (e) {
          if (e)
            if (0 == e.code && e.result) {
              var t = { fileName: this.__file, nosKey: this.__nosKey, bucket: this.__bucket };
              this._$dispatchEvent('onLogFinishUpload', { logId: this._logId });
              this.__config.onFinishUpload && this.__config.onFinishUpload(t);
            } else
              this.__errorHandler({ errCode: l['ERROR_CODE_CHECK_FILE_ERROR'], errMsg: e.code });
          else
            this.__errorHandler({
              errCode: l['ERROR_CODE_CHECK_FILE_ERROR'],
              errMsg: '文件校验失败！请重新上传',
            });
        }._$bind(this),
        onerror: this.__errorHandler._$bind(this, {
          errCode: l['ERROR_CODE_CHECK_FILE_ERROR'],
          errMsg: '文件校验失败！请重新上传',
        }),
      };
      this.__reqId = a._$request(l.CHECK_FILE_COMPLETE_URL, e);
    };
    E.__checkToUpload = function () {
      if (this.__isSupportAnchor())
        if (this.__hasGetIPs) this.__startUploadByBlobs();
        else this.__getNosIP();
      else this.__startFromUpload();
    };
    E.__getNosIP = function () {
      var e = {
        sync: !1,
        type: 'json',
        data: {},
        query: { version: '1.0', bucketname: this.__bucket },
        method: 'GET',
        timeout: 0,
        cookie: !1,
        mode: this.__config.mode,
        onload: function (e) {
          if (e) {
            if (e.upload && e.upload.length)
              for (var t = e.upload.length - 1; t >= 0; t--) this.__uploadIPs.unshift(e.upload[t]);
            this.__hasGetIPs = !0;
            this.__startUploadByBlobs();
          } else
            this.__errorHandler({
              errCode: l['ERROR_CODE_GET_IP_FAIL'],
              errMsg: '无法获得上传地址ip',
            });
        }._$bind(this),
        onerror: this.__errorHandler._$bind(this, {
          errCode: l['ERROR_CODE_GET_IP_FAIL'],
          errMsg: '无法获得上传地址ip',
        }),
      };
      this.__reqId = a._$request(l.NOS_GET_IP_URL, e);
    };
    E.__startFromUpload = function () {
      this.__formUploadId = d._$fileUploadByForm({
        key: this.__formUploadId,
        file: this.__realUpload.files[0],
        fileName: this.__file,
        form: this.__uploadForm,
        mode: this.__config.mode,
        xNosToken: this.__xNosToken,
        nosKey: this.__nosKey,
        bucket: this.__bucket,
        onload: this.__onUploadComplete._$bind(this),
        onerror: this.__errorHandler._$bind(this),
      });
    };
    E.__startUploadByBlobs = function () {
      if (!this.__isRetry)
        this._$dispatchEvent('onLogBeginUpload', {
          logId: this._logId,
          fileName: this.__file,
          curTime: this.__beginTime,
          uploadType: this.__config.type,
          fileSize: this.__fileSize,
          supportBlob: this.__isSupportAnchor(),
          nosKey: this.__nosKey,
          bucket: this.__bucket,
          uploadIp: this.__uploadIPs[this.__posUploadIPIndex],
        });
      this.__blobUploadId = c._$fileUploadByBlobs({
        key: this.__blobUploadId,
        ip: this.__uploadIPs[this.__posUploadIPIndex],
        file: this.__realUpload.files[0],
        fileName: this.__file,
        form: this.__uploadForm,
        mode: this.__config.mode,
        eduUploaderToken: this.__eduUploaderToken,
        xNosToken: this.__xNosToken,
        nosKey: this.__nosKey,
        bucket: this.__bucket,
        onuploading: this.__onUploading._$bind(this),
        onload: this.__onUploadComplete._$bind(this),
        onuploadBlob: this.__onUploadBlob._$bind(this),
        onerror: this.__errorHandler._$bind(this),
      });
    };
    E.__reset = function (e) {
      this.__supReset(e);
      this.__config = t._$merge({}, u());
      this.__config = t._$merge(this.__config, e || {}, function (e) {
        return void 0 === e;
      });
      this.__txtNode.innerHTML = this.__config.txt;
      if (this.__config.btnClassName)
        n._$addClassName(this.__showUpload, this.__config.btnClassName);
      this.__file = null;
      this.__fileSize = null;
      this.__fileGmtModifiedTime = null;
      this.__eduUploaderToken = '';
      this.__uploadIPs = [l.NOS_CENTER_HOST];
      this.__hasGetIPs = !1;
      this.__posUploadIPIndex = 0;
      this.__xNosToken = '';
      this.__bucket = '';
      this.__nosKey = '';
      this.__reqId = null;
      this.__blobUploadId = null;
      this.__isAbort = !1;
      this.__isRetry = !1;
      this.__isDisable = !1;
      this._logId = 'edu-upload-log-' + new Date().getTime();
      this._log = _._$$UploadLog._$allocate({ uploader: this });
      this.__resetHtmlFileNode();
    };
    E.__isSupportAnchor = function () {
      return (
        s._$canUseFileUploadByBlobs() &&
        (this.__config.type == l.UPLOAD_FILE_TYPE_VIDEO ||
          this.__config.type == l.UPLOAD_FILE_TYPE_PDF ||
          this.__config.type == l.UPLOAD_FILE_TYPE_SCORM ||
          this.__config.type == l.UPLOAD_FILE_TYPE_AUDIO ||
          this.__config.type == l.UPLOAD_FILE_TYPE_ATTACH_BIG)
      );
    };
    E.__destroy = function () {
      this._$abort();
      if (this.__config.btnClassName)
        n._$delClassName(this.__showUpload, this.__config.btnClassName);
      if (this.__config.btnDisableClassName)
        n._$delClassName(this.__showUpload, this.__config.btnDisableClassName);
      this._log && this._log._$recycle();
      this.__supDestroy();
    };
    return p;
  },
  'ab3c49199e7a18d2bc360ba5ced8d49c',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '2251224ef4bde318c45429fafdfcdd19',
  '8a864b627c302d7d1c56bd928b515d1b',
  'af8805404cc0bd2b95d3d3c9573484b1',
  '219bba80fd1e900dadcd3a275e06c374',
  '0e0f05eeaf0ae55e126d55648838e274',
  '9a5fcf7f8d103e69bd7c43703291d692',
  '66c2ed70c8e5c5a6817eb8911f02fa45',
  'cc3230161064fa3e5d840399ba83ff57',
  'ac5be9068e47d8486d9371069bd2fccb',
  'beec6201069596ecb83a09e5fc3eb415',
  'ecc0bbe3c8ad6be8c2cd6f2cc1afe656',
);
