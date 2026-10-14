EDU(
  'fb6ef2aff84297ee79ff49759e2f6468',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d,
      l = o._$addHtmlTemplate(
        '<div class="u-simpleFileUpload">                                            <div class="j-uploadArea f-cb" style="display:none;">                                                <div class="j-upload f-fl uploadBtn"></div>                                                <div class="j-tipNode f-fl tipNode"></div>                                            </div>                                            <div class="j-info f-cb info" style="display:none;">                                                <div class="f-fl name f-thide"></div>                                                <div class="f-fl fb"></div>                                                <a class="f-fl cancel">${lang.KEY_NEJ_UPLOAD_CANCEL}</a>                                            </div>                                          </div>',
      );
    s._$$SimpleFileUploadUI = NEJ.C();
    d = s._$$SimpleFileUploadUI._$extend(s._$$UIBase, !0);
    d.__initXGui = function () {
      var t = e.isCh() ? { KEY_NEJ_UPLOAD_CANCEL: '取消' } : { KEY_NEJ_UPLOAD_CANCEL: 'cancel' };
      this.__seed_html = o._$addNodeTemplate(o._$getHtmlTemplate(l, { lang: t }));
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__uploadArea = o._$getByClassName(this.__body, 'j-uploadArea')[0];
      this.__uploadBtn = o._$getByClassName(this.__body, 'j-upload')[0];
      this.__tipNode = o._$getByClassName(this.__body, 'j-tipNode')[0];
      this.__infoArea = o._$getByClassName(this.__body, 'j-info')[0];
      this.__infos = o._$getChildren(this.__infoArea);
      this.__name = this.__infos[0];
      this.__feedbackNode = this.__infos[1];
      this.__cancelNode = this.__infos[2];
      a._$addEvent(this.__cancelNode, 'click', this.__abortUpload._$bind(this));
    };
    d.__showInfoArea = function (t) {
      var n = e.isEn() ? 'uploading ...' : '上传中';
      this.__uploadingFbUI._$showLoadingTips(n);
      this.__name.innerText = s._$formatFileName(t.name || '');
      s._$showNode(this.__cancelNode);
      s._$showNode(this.__infoArea);
      s._$hiddenNode(this.__uploadArea);
      this._$dispatchEvent('beginUpload', t);
    };
    d.__showUploadBtn = function (e) {
      this.__uploadingFbUI._$hideFeedback();
      this.__name.innerText = '';
      s._$hiddenNode(this.__cancelNode);
      s._$hiddenNode(this.__infoArea);
      s._$showNode(this.__uploadArea);
    };
    d.__abortUpload = function () {
      if (this.__uploadUI) this.__uploadUI._$abort();
      this._$dispatchEvent('abortUpload');
    };
    d.__onupdateProgress = function (e) {
      if (!(e.total > this.__initObj.maxSize)) this._$dispatchEvent('onupdateProgress', e);
      else s._$uploadErrorHandle(s.CONST.UPLOAD_ERROR_LIMITED, this.__abortUpload._$bind(this));
    };
    d.__onload = function (e) {
      if (e.retSuc) {
        this.__uploadingFbUI._$hideFeedback();
        this._$dispatchEvent('onFinishUpload', e);
      } else s._$uploadErrorHandle();
      this.__showUploadBtn();
    };
    d.__verifyFile = function (e) {
      if (this.__initObj.suffixs) return s._$verifyFileNameByType(null, e, this.__initObj.suffixs);
      else return !0;
    };
    d.__genUploadUI = function () {
      if (this.__uploadUI) this.__uploadUI = s._$$FileUploadUI._$recycle(this.__uploadUI);
      this.__uploadUI = s._$$FileUploadUI._$allocate({
        parent: this.__uploadBtn,
        disabled: this.__initObj.disabled,
        beginUpload: this.__showInfoArea._$bind(this),
        txt: this.__initObj.txt,
        action: '/file/smallFileUpload.htm',
        supportAnchor: !1,
        tokenType: s.CONST.UPLOAD_TOKEN_TYPE_DEFAULT,
        verifyFile: this.__verifyFile._$bind(this),
        onFinishUpload: this.__onload._$bind(this),
        onupdateProgress: this.__onupdateProgress._$bind(this),
        onUploadError: function () {
          this._$dispatchEvent('onUploadError');
        }._$bind(this),
      });
      this.__tipNode.innerHTML = this.__initObj.tip;
      s._$hiddenNode(this.__infoArea);
      s._$showNode(this.__uploadArea);
    };
    d.__reset = function (t) {
      this.__supReset(t);
      var n = e.isEn() ? 'Upload attachment' : '+ 上传附件';
      this.__initObj = {
        txt: t.txt || n,
        tip: t.tip || '',
        suffixs: t.suffixs,
        maxSize: t.maxSize || s.CONST.UPLOAD_SIZE_MAX_SIMPLE,
        disabled: t.disabled || !1,
      };
      this.__genUploadUI();
      this.__uploadingFbUI = s._$$FeedBackUI._$allocate({ parent: this.__feedbackNode });
      this.__uploadingFbUI._$hideFeedback();
    };
    d.__destroy = function () {
      if (this.__uploadingFbUI)
        this.__uploadingFbUI = s._$$FeedBackUI._$recycle(this.__uploadingFbUI);
      if (this.__uploadUI) this.__uploadUI = s._$$FileUploadUI._$recycle(this.__uploadUI);
      this.__supDestroy();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '342ad7ae4eea50c3cad860686650a915',
  'd1d974391ebf3355eda4e01bed2cc5ad',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '24f8154ce482a05ab133345b291e357f',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
