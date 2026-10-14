EDU(
  'd1d974391ebf3355eda4e01bed2cc5ad',
  function () {
    var e = NEJ.O,
      t = window,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.g'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      s = NEJ.P('edu.d'),
      c = NEJ.P('nej.j'),
      d;
    var l = i._$addHtmlTemplate(
      '<div class="u-upload">                                        <form class="j-uploadForm" action="" enctype="multipart/form-data">                                            <div class="upload f-ib">                                                <a class="j-upload showIpt u-btn u-btn-default" >                                                    <span class="j-txt">+上传</span>                                                    <input name="file" type="file" class="j-upload realIpt" title="">                                                </a>                                            </div>                                        </form>                                    </div>',
    );
    r._$$FileUploadUI = NEJ.C();
    d = r._$$FileUploadUI._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(i._$getHtmlTemplate(l));
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__uploads = i._$getByClassName(this.__body, 'j-upload');
      this.__showUpload = this.__uploads[0];
      this.__txtNode = i._$getByClassName(this.__body, 'j-txt')[0];
      this.__uploadForm = i._$getByClassName(this.__body, 'j-uploadForm')[0];
      this.__uploadCache = new s._$$COM_Cache_UploadCache();
      this.__uploadCache._$addEvent('ongetToken', this.__ongetToken._$bind(this));
    };
    d.__updateToken = function () {
      this.__uploadCache._$getUploaderToken(this.__needAuth, this.__tokenType);
    };
    d.__ongetToken = function (e) {
      if (e) {
        this.__token = e.token;
        if (!this.__bucket) this.__bucket = e.bucket;
        this.__uploadHandler();
      }
    };
    d.__resetFile = function () {
      this.__showUpload.innerHTML =
        '<span class="j-txt">' +
        this.__txt +
        '</span>            <input name="file" type="file" class="j-upload realIpt" title="">';
      this.__realUpload = i._$getChildren(this.__showUpload)[1];
      if (this.__disabled) {
        this.__realUpload.disabled = !0;
        i._$addClassName(this.__showUpload, 'u-btn-disabled');
      }
      this.__doInitDomEvent([[this.__realUpload, 'change', this.__updateToken._$bind(this)]]);
    };
    d._$abort = function () {
      if (r._$canUseFileUploadByBlobs() && this.__supportAnchor)
        r._$abortFileUploadByBlobs(this.__reqId);
      else c._$abort(this.__reqId);
      this.__reqId = null;
      this.__resetFile();
    };
    d.__onuploading = function (e) {
      if (e) {
        if (this.__reqId) e.reqId = this.__reqId;
        e.initOffset = e.initOffset || 0;
        this._$dispatchEvent('onupdateProgress', e);
      } else;
    };
    d.__onload = function (e) {
      if (e) {
        if (!e.retSuc && 40 == e.errorCode) {
          this.__updateToken();
          return;
        }
        e.name = this.__file;
        e.bucket = this.__bucket;
        this.__resetFile();
        this._$dispatchEvent('onFinishUpload', e);
      }
    };
    d.__onerror = function (e) {
      if (e) {
        e.name = this.__file;
        this.__resetFile();
        this._$dispatchEvent('onUploadError', e);
      }
    };
    d.__uploadHandler = function () {
      var e = this.__realUpload.value;
      for (; e.indexOf('\\') != -1;) e = e.slice(e.lastIndexOf('\\') + 1);
      if (!this.__verifyFile || this.__verifyFile(e)) {
        this.__file = e;
        var t = { name: this.__file, curTime: new Date().getTime() };
        if (this.__file) this._$dispatchEvent('beginUpload', t);
        if (!r._$canUseFileUploadByBlobs() || !this.__supportAnchor) {
          var n = {
            type: 'json',
            mode: this.__mode,
            method: 'POST',
            cookie: !0,
            onuploading: this.__onuploading._$bind(this),
            onload: this.__onload._$bind(this),
            onerror: this.__onerror._$bind(this),
          };
          this.__uploadForm.action =
            this.__originAction +
            (this.__originAction.indexOf('?') >= 0 ? '&' : '?') +
            '_upload_mth_=sync_parse&token=' +
            encodeURIComponent(this.__token) +
            '&bucket=' +
            encodeURIComponent(this.__bucket);
          this.__reqId = c._$upload(this.__uploadForm, n);
        } else
          this.__reqId = r._$fileUploadByBlobs({
            file: this.__realUpload.files[0],
            onuploading: this.__onuploading._$bind(this),
            onload: this.__onload._$bind(this),
            onerror: this.__onerror._$bind(this),
            form: this.__uploadForm,
            token: this.__token,
            bucket: this.__bucket,
          });
      } else this.__resetFile();
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__reqId = null;
      this.__txt = this.__txtNode.innerText = e.txt || '+上传';
      this.__mode = e.mode || 0;
      this.__originAction = this.__uploadForm.action =
        (t.uploadHost || '') + (e.action || '/file/multipartUpload.htm');
      this.__body.title = e.title || '';
      this.__supportAnchor = 0 == e.supportAnchor ? !1 : !0;
      this.__verifyFile = e.verifyFile;
      this.__needAuth = e.needAuth || 1;
      this.__tokenType = e.tokenType;
      this.__bucket = e.bucket;
      this.__disabled = e.disabled || !1;
      this.__resetFile();
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '24f8154ce482a05ab133345b291e357f',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '63e959d261c0f61c7cc410b71b0a2a2b',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '8a864b627c302d7d1c56bd928b515d1b',
);
