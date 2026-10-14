EDU(
  '398ddb926810364dac877824f1b0015a',
  function () {
    var e = NEJ.O,
      t = window,
      n = NEJ.P('nej.e'),
      i = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.u'),
      r;
    var s = n._$addNodeTemplate(
      '<div>\t          <a  class="u-btn u-btn-default j-upload" title="支持jpg、gif、png或bmp格式的图片，建议文件小于10M">上传图片</a>\t          <div class="flashbox j-flashbox"></div>\t     </div>',
    );
    a._$$ImgUploadUI = NEJ.C();
    r = a._$$ImgUploadUI._$extend(a._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = s;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__idNum = o._$randNumberString(2);
      this.__jsNamespace = NEJ.P('edu.u.imgUpload' + this.__idNum);
      this.__initGInterface();
      this.__uploadBtn = n._$getByClassName(this.__body, 'j-upload')[0];
      this.__flashBox = n._$getByClassName(this.__body, 'j-flashbox')[0];
    };
    r.__initGInterface = function () {
      this.__jsNamespace.mouseOver = this.__mouseOver._$bind(this);
      this.__jsNamespace.mouseOut = this.__mouseOut._$bind(this);
      this.__jsNamespace.uploadStart = this.__uploadStart._$bind(this);
      this.__jsNamespace.uploadComplete = this.__uploadComplete._$bind(this);
      this.__jsNamespace.uploadError = this.__uploadError._$bind(this);
    };
    r.__mouseOver = function () {
      n._$addClassName(this.__uploadBtn, 'hvr');
    };
    r.__mouseOut = function () {
      n._$delClassName(this.__uploadBtn, 'hvr');
    };
    r.__uploadStart = function (e, t) {
      this._$dispatchEvent('uploadStart');
    };
    r.__uploadComplete = function (e, t, n) {
      if (999 == t) {
        this.__uploadObj = a._$formatPhotoData(n);
        this._$dispatchEvent('uploadComplete', n);
      }
    };
    r.__uploadError = function (e, t, n) {
      var i = '';
      if (12 == t) i = '图片格式不正确，上传失败';
      else if (0 == t) i = '请上传jpg、gif、png或bmp格式图片，文件不大于20M';
      else i = '上传失败，请重试';
      this._$dispatchEvent('uploadError', i);
    };
    r._$getUploadObj = function () {
      return this.__uploadObj;
    };
    r.__reset = function (e) {
      e.clazz = e.clazz || 'u-upd-img-btn';
      this.__uploadBtn.innerText = e.btnText || '上传图片';
      this.__supReset(e);
      var i = e.customSize || '';
      var o = e.baseUrl || '//upload.icourse163.org/api/photoUpload2.do?_upload_mth_=sync_parse&';
      o =
        o +
        'userdefinesize=' +
        i +
        '&saveorigin=' +
        (e.saveorigin || 'false') +
        '&responsetype=' +
        (e.responsetype || 'xml') +
        '&rotatedegree=' +
        (e.rotatedegree || '0') +
        '&stamptype=' +
        (e.stamptype || '') +
        '&stampstring=' +
        encodeURIComponent(e.stampstring || '') +
        '&sitefrom=study';
      this.__uploadObj = null;
      n._$flash({
        src: t.imageUrlMap.image_upload_swf,
        width: '100%',
        height: '100%',
        hidden: !1,
        parent: this.__flashBox,
        params: {
          allowScriptAccess: 'always',
          wmode: 'transparent',
          flashvars:
            'cbNameSpace=edu.u.imgUpload' +
            this.__idNum +
            '&uploadExif=true&uploadUrl=' +
            encodeURIComponent(o),
        },
        onready: function (e) {
          this.__flashObj = e;
        }._$bind(this),
      });
    };
    r.__destroy = function () {
      if (this.__flashBox) {
        var e = n._$getChildren(this.__flashBox);
        if (e) for (var t = 0; t < e.length; t++) this.__flashBox.removeChild(e[t]);
      }
      delete this.__flashObj;
      this.__supDestroy();
    };
  },
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '24f8154ce482a05ab133345b291e357f',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  'fe86216ed59e3103a56c42c850d389f0',
);
