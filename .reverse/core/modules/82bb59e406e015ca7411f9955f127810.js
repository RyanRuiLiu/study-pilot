EDU(
  '82bb59e406e015ca7411f9955f127810',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = n._$pushCSSText(
      '        .u-upload{ position:relative; display:inline-block;}        .u-upload .showIpt{ text-align:center; overflow:hidden;}        .u-upload .filewrap{ overflow:hidden; position:absolute; top:0; left:0; width:100%; height:100%;}        .u-upload .realIpt{ font-size:100px; display:block; position:absolute; top:0; left:0; filter:alpha(opacity=0); opacity:0; cursor:pointer; width:100%; height:100%;}',
    );
    d._$$UploadUI = NEJ.C();
    var h;
    h = d._$$UploadUI._$extend(o._$$Abstract, !0);
    h.__initXGui = function () {
      this.__seed_css = f;
      this.__seed_html = i._$addNodeTemplate(e);
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__showUpload = this.__body;
      this.__txtNode = n._$getByClassName(this.__body, 'j-txt')[0];
      this.__fileWrapNode = n._$getByClassName(this.__body, 'j-filewrap')[0];
      this.__uploadForm = n._$getByClassName(this.__body, 'j-uploadForm')[0];
    };
    h.__errorHandler = function (e, n) {
      if (!t._$isObject(e)) e = { message: e };
      if (e.code != -2) {
        var i = (e.code || e.errCode || '') + (e.errMsg || e.msg || e.message || '网络错误');
        this.__resetHtmlFileNode();
        if (!this.__isAbort)
          this.__config.onUploadError &&
            this.__config.onUploadError({ reqId: this.__reqId, errMsg: i, fileName: this.__file });
      } else this.__getEduToken();
    };
    h.__resetHtmlFileNode = function (e) {
      var t;
      if (!e) {
        var t = '<input name="file" type="file" class="j-inputfile realIpt" title="" ';
        switch (this.__config.type) {
          case s.UPLOAD_FILE_TYPE_PDF:
            t += 'accept="' + s.PDF_FILE_EXTENSION.join(', ') + '" >';
            break;
          case s.UPLOAD_FILE_TYPE_VIDEO:
            t += 'accept="' + s.VIDEO_FILE_EXTENSION.join(', ') + '" >';
            break;
          case s.UPLOAD_FILE_TYPE_ATTACH:
            t += 'accept="' + s.ATTACH_FILE_EXTENSION.join(', ') + '" >';
            break;
          case s.UPLOAD_FILE_TYPE_CAPTION:
            t += 'accept="' + s.CAPTION_FILE_EXTENSION.join(', ') + '" >';
          case s.UPLOAD_FILE_TYPE_IMAGE:
            t += 'accept="' + s.IMAGE_FILE_EXTENSION.join(', ') + '" >';
            break;
          case s.UPLOAD_FILE_TYPE_EXCEL:
            t += 'accept="' + s.EXCEL_FILE_EXTENSION.join(', ') + '" >';
            break;
          default:
            t += '>';
        }
        this.__fileWrapNode.innerHTML = t;
        this.__realUpload = n._$getByClassName(this.__body, 'j-inputfile')[0];
        this.__doInitDomEvent([[this.__realUpload, 'change', this.__uploadHandler._$bind(this)]]);
      } else this.__fileWrapNode.innerHTML = '';
    };
    h._$disable = function (e) {
      this.__isDisable = e;
      if (this.__isDisable) {
        if (this.__config.btnDisableClassName)
          n._$addClassName(this.__showUpload, this.__config.btnDisableClassName);
      } else if (this.__config.btnDisableClassName)
        n._$delClassName(this.__showUpload, this.__config.btnDisableClassName);
      this.__resetHtmlFileNode(e);
    };
    h._$abort = function () {
      this.__isAbort = !0;
      if (this.__reqId) {
        a._$abort(this.__reqId);
        this.__reqId = null;
      }
      if (this.__blobUploadId) {
        r._$abortFileUploadByBlobs(this.__blobUploadId);
        this.__blobUploadId = null;
      }
      this.__resetHtmlFileNode();
    };
    h.__onUploading = function (e) {
      if (e) {
        e.initOffset = e.initOffset || 0;
        e.beginTime = this.__beginTime;
        e.fileName = this.__file;
        this.__config.onUpdateProgress && this.__config.onUpdateProgress(e);
      }
    };
    h.__onUploadComplete = function (e) {
      e = e || {};
      this.__resetHtmlFileNode();
      if (!e.errCode) {
        var e = { fileName: this.__file, nosKey: this.__nosKey, bucket: this.__bucket };
        this.__config.onFinishUpload && this.__config.onFinishUpload(e);
      } else this.__errorHandler(e);
    };
    h.__uploadHandler = function () {
      this.__isAbort = !1;
      var e = this.__realUpload.value;
      for (; e.indexOf('\\') != -1;) e = e.slice(e.lastIndexOf('\\') + 1);
      if (!this.__config.verifyFile || this.__config.verifyFile(e, this.__realUpload)) {
        this.__file = e;
        this.__beginTime = new Date().getTime();
        this.__fileSize = r._$getFileSize(this.__realUpload);
        this.__fileGmtModifiedTime = r._$getFileLastModifiedTime(this.__realUpload);
        if (this.__file)
          this.__config.onBeginUpload &&
            this.__config.onBeginUpload({ name: this.__file, curTime: this.__beginTime });
        this.__getEduToken();
      } else this.__resetHtmlFileNode();
    };
    h.__getEduToken = function () {
      var e = {
        sync: !1,
        type: 'json',
        data: {
          fileName: encodeURIComponent((this.__file || '').toLocaleLowerCase()),
          type: this.__config.type,
          fileSize: this.__fileSize,
          fileGmtModifiedTime: this.__fileGmtModifiedTime,
        },
        query: {},
        method: 'GET',
        timeout: 0,
        headers: {},
        cookie: !1,
        mode: this.__config.mode,
        onload: function (e) {
          if (e)
            if (0 != e.code) this.__errorHandler(e);
            else {
              this.__eduUploaderToken = e.result;
              this.__getNosToken();
            }
          else this.__errorHandler('上传失败！无数据返回');
        }._$bind(this),
        onerror: this.__errorHandler._$bind(this, '初始化上传失败！'),
      };
      this.__reqId = a._$request(this.__config.initUploadUrl, e);
    };
    h.__getNosToken = function () {
      var e = {
        sync: !1,
        type: 'json',
        query: {
          eduUploaderToken: this.__eduUploaderToken,
          fileName: encodeURIComponent((this.__file || '').toLocaleLowerCase()),
          fileSize: this.__fileSize,
          fileGmtModifiedTime: this.__fileGmtModifiedTime,
          _t: new Date().getTime(),
        },
        method: 'GET',
        timeout: 0,
        headers: {},
        cookie: !1,
        mode: this.__config.mode,
        onload: function (e) {
          if (e)
            if (0 != e.code) this.__errorHandler(e);
            else {
              this.__xNosToken = e.result.xnosToken;
              this.__bucket = e.result.bucketName;
              this.__nosKey = e.result.nosKey;
              this.__checkToUpload();
            }
          else this.__errorHandler('上传失败！无数据返回');
        }._$bind(this),
        onerror: this.__errorHandler._$bind(this, '上传失败！'),
      };
      this.__reqId = a._$request(s.EXCHANGE_NOSTOKEN_URL, e);
    };
    h.__checkToUpload = function () {
      if (this.__isSupportAnchor())
        if (this.__hasGetIPs) this.__startUploadByBlobs();
        else this.__getNosIP();
      else this.__startFromUpload();
    };
    h.__startFromUpload = function () {
      n._$getByClassName(this.__uploadForm, 'j-noskey')[0].value = this.__nosKey;
      n._$getByClassName(this.__uploadForm, 'j-xnostoken')[0].value = this.__xNosToken;
      var e = {
        type: 'json',
        mode: this.__config.mode,
        method: 'POST',
        cookie: !1,
        headers: {},
        onuploading: this.__onUploading._$bind(this),
        onload: this.__onUploadComplete._$bind(this),
        onerror: this.__errorHandler._$bind(this),
      };
      this.__uploadForm.action = this.__uploadIPs[this.__posUploadIPIndex] + '/' + this.__bucket;
      this.__reqId = a._$upload(this.__uploadForm, e);
    };
    h.__getNosIP = function () {
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
            this.__uploadIPs = e.upload;
            this.__hasGetIPs = !0;
            this.__startUploadByBlobs();
          } else this.__errorHandler('上传失败！无法获得上传地址');
        }._$bind(this),
        onerror: this.__errorHandler._$bind(this, '上传失败！'),
      };
      this.__reqId = a._$request(s.NOS_GET_IP_URL, e);
    };
    h.__startUploadByBlobs = function () {
      this.__blobUploadId = r._$fileUploadByBlobs({
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
        onerror: this.__errorHandler._$bind(this),
      });
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__config = t._$merge({}, c());
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
      this.__uploadIPs = [s.NOS_FORM_UPLOAD_URL];
      this.__posUploadIPIndex = 0;
      this.__xNosToken = '';
      this.__bucket = '';
      this.__nosKey = '';
      this.__reqId = null;
      this.__blobUploadId = null;
      this.__isAbort = !1;
      this.__isDisable = !1;
      this.__hasGetIPs = !1;
      this.__resetHtmlFileNode();
    };
    h.__isSupportAnchor = function () {
      return (
        r._$canUseFileUploadByBlobs() &&
        (this.__config.type == s.UPLOAD_FILE_TYPE_VIDEO ||
          this.__config.type == s.UPLOAD_FILE_TYPE_PDF ||
          this.__config.type == s.UPLOAD_FILE_TYPE_SCORM)
      );
    };
    h.__destroy = function () {
      this._$abort();
      if (this.__config.btnClassName)
        n._$delClassName(this.__showUpload, this.__config.btnClassName);
      if (this.__config.btnDisableClassName)
        n._$delClassName(this.__showUpload, this.__config.btnDisableClassName);
      this.__supDestroy();
    };
    return d;
  },
  'd969c84a56242ac710c1c514d45d058e',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '2251224ef4bde318c45429fafdfcdd19',
  '8a864b627c302d7d1c56bd928b515d1b',
  '11f6f17562b378193e24e3e7fd9cddbd',
  '5c7056e4308772bfe37d20fd87012cce',
  '9396b0e297eab8a29156fcb12e1e4bcd',
);
