EDU(
  '5debbf385cf6d60dcbf0832e1f59a52d',
  function (e, t, n, i, o, a, r, s) {
    var c = NEJ.P,
      d = NEJ.O,
      l = NEJ.F,
      u = c('nej.c'),
      _ = c('nej.e'),
      f = c('nej.u'),
      h = c('nej.ut'),
      p = c('nej.ui'),
      m = c('nej.v'),
      g = window,
      b,
      v;
    var E = o;
    var x = _._$pushCSSText('');
    p._$$ImageCard = NEJ.C();
    b = p._$$ImageCard._$extend(p._$$WindowWrapper);
    v = p._$$ImageCard._$supro;
    b.__initXGui = function () {
      this.__seed_css = x;
      this.__seed_html = _._$addNodeTemplate(this.__getHtmlStr());
    };
    b.__initNode = function () {
      this.__supInitNode();
      this.__desc = _._$getByClassName(this.__body, 'j-desc');
      this.__desc[0].innerText = e.KEY_FRONT_UI_IMAGE_TIPS;
      this.__desc[1].innerText = e.KEY_FRONT_UI_IMAGE_NET_TIPS;
      this.__tabs = _._$getByClassName(this.__body, 'j-tab');
      this.__choose = _._$getByClassName(this.__body, 'j-choosefile')[0];
      this.__cnts = _._$getByClassName(this.__body, 'j-cnt');
      this.__imgUrl = _._$getByClassName(this.__body, 'j-ipturl')[0];
      this.__smtImgUrl = _._$getByClassName(this.__body, 'j-smturl')[0];
      this.__errorMsg = _._$getByClassName(this.__body, 'j-error')[0];
      this.__imgBox = _._$getByClassName(this.__body, 'j-image')[0];
      this.__tabMg = h._$$Tab._$allocate({
        list: this.__tabs,
        selected: 'j-selected',
        onchange: this.__tabChange._$bind(this),
      });
      m._$addEvent(this.__smtImgUrl, 'click', this.__onSubmitImgUrl._$bind(this));
      m._$addEvent(this.__imgBox, 'error', this.__imageUrlError._$bind(this));
      m._$addEvent(this.__imgBox, 'load', this.__imageOnLoad._$bind(this));
      m._$addEvent(this.__imgUrl, 'focus', this.__showErrorTips._$bind(this, ''));
    };
    b.__onSubmitImgUrl = function () {
      this.__imgBox.src = this.__imgUrl.value.trim();
    };
    b.__imageUrlError = function () {
      this.__showErrorTips(e.KEY_FRONT_UI_IMAGE_ERROR);
    };
    b.__imageOnLoad = function () {
      this.__uploadComplete(this.__imgUrl.value);
    };
    b.__reset = function (n) {
      n = n || {};
      n.clazz = 'u-eduEditorDialog';
      n.parent = n.parent || document.body;
      n.draggable = n.draggable || !1;
      n.title = n.title || e.KEY_FRONT_UI_IMAGE_CHOOSE;
      n.mask = !0;
      this.__supReset(n);
      this.__config = n.config;
      this.__imgUploaderUI = t._$$UploadUI._$allocate({
        parent: this.__choose,
        btnClassName: this.__config.imgUploadBtnClassName || 'u-btn',
        btnDisableClassName: this.__config.imgUploadBtnDisableClassName || 'u-btn-disabled',
        type: a.UPLOAD_FILE_TYPE_IMAGE,
        txt: e.KEY_FRONT_UI_IMAGE_UPLOAD,
        verifyFile: this.__verifyFile._$bind(this),
        onBeginUpload: this.__uploadStart._$bind(this),
        onFinishUpload: function (e) {
          var t = 'https://' + e.bucket + '.nosdn.127.net/' + [e.nosKey].join('/');
          this.__uploadComplete(t);
        }._$bind(this),
        onUploadError: this.__uploadError._$bind(this),
      });
      this.__showErrorTips('');
    };
    b.__verifyFile = function (t, n) {
      if (!t) {
        _notify.warning(e.KEY_FRONT_UI_IMAGE_ERROR_TYPE);
        return !1;
      }
      var i = t.slice(t.lastIndexOf('.') + 1);
      var o = /jpg|png|jpeg|bmp|gif/i;
      if (i) {
        if (o && !o.test(i)) {
          this.__showErrorTips(e.KEY_FRONT_UI_IMAGE_ERROR_PLEASE);
          return !1;
        }
      } else {
        this.__showErrorTips(e.KEY_FRONT_UI_IMAGE_ERROR_TYPE);
        return !1;
      }
      var c = r._$getFileSize(n);
      if (!c) return !0;
      var d = a.UPLOAD_SIZE_MAX_IMAGE;
      var l = e.KEY_FRONT_UI_IMAGE_MAX + s._$formatFileSize(a.UPLOAD_SIZE_MAX_IMAGE);
      if (d && c > d) {
        this.__showErrorTips(l);
        return !1;
      }
      return !0;
    };
    b.__destroy = function () {
      if (this.__tabMg) this.__tabMg = h._$$Tab._$recycle(this.__tabMg);
      if (this.__imgUploaderUI)
        this.__imgUploaderUI = t._$$UploadUI._$recycle(this.__imgUploaderUI);
      this.__supDestroy();
    };
    b.__getHtmlStr = function () {
      var t = '<a class="u-btn f-pa">' + e.KEY_FRONT_UI_IMAGE_CHOOSE + '</a>';
      var n = '<a class="u-btn f-fl j-smturl">' + e.KEY_FRONT_UI_IMAGE_CONFIRM + '</a>';
      return E.replace('$btn1_html_str', t)
        .replace('$btn2_html_str', n)
        .replace('$uploadImage', e.KEY_FRONT_UI_IMAGE_UPLOAD)
        .replace('$offSiteImage', e.KEY_FRONT_UI_IMAGE_OUT);
    };
    b.__uploadStart = function () {
      this.__onbeforeupload();
    };
    b.__uploadComplete = function (t) {
      if (!t) {
        this.__showErrorTips(e.KEY_FRONT_UI_IMAGE_ERROR_UPLOAD);
        this.__onafterupload();
      } else {
        this.__showErrorTips('');
        this._$dispatchEvent('onchange', t);
        this.__onafterupload();
        this._$hide();
      }
    };
    b.__showErrorTips = function (e) {
      this.__errorMsg.innerText = e;
    };
    b.__onbeforeupload = function () {
      if ('function' == typeof this.__config.showLoadingFn)
        try {
          this.__config.showLoadingFn();
        } catch (e) {}
    };
    b.__onafterupload = function () {
      if ('function' == typeof this.__config.hideLoadingFn)
        try {
          this.__config.hideLoadingFn();
        } catch (e) {}
    };
    b.__uploadError = function (t) {
      this.__showErrorTips(e.KEY_FRONT_UI_IMAGE_ERROR_UPLOAD + e.KEY_FRONT_UI_IMAGE_ERROR_TRY);
      this.__onafterupload();
    };
    b.__tabChange = function (e) {
      this.__showErrorTips('');
      var t = e.index;
      if (!t) {
        this.__cnts[0].style.display = '';
        this.__cnts[1].style.display = 'none';
      } else {
        this.__imgUrl.value = '';
        this.__cnts[1].style.display = '';
        this.__cnts[0].style.display = 'none';
      }
    };
    return p._$$ImageCard;
  },
  '1ca3c38dd9d463e9c6f6b82303c4a43b',
  '82bb59e406e015ca7411f9955f127810',
  '5e23a17a4345e0de7b9e3ec78706c924',
  'e3defd06257975c1084e0f9707de5e15',
  '7fbee3cf7f1c9676d61dc0d1a0fd022e',
  '5c7056e4308772bfe37d20fd87012cce',
  '11f6f17562b378193e24e3e7fd9cddbd',
  'aa911ca41144204fc85b66cdc40900eb',
);
