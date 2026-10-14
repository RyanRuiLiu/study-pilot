EDU(
  '1739fa74ae085e454b5fe7821640d9db',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.ui'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      _ = NEJ.P('nej.$'),
      l;
    var h = n._$pushCSSText(
      '        .#<uispace> .u-prizeInfoEdit .main{padding:20px 50px 0;}        .#<uispace> .u-prizeInfoEdit .main .subtitle{top: -30px;left: 120px;}        .#<uispace> .u-prizeInfoEdit .row{margin:0 0 20px;}        .#<uispace> .u-prizeInfoEdit .row .lb{display:block;width:90px;height:60px;line-height:20px;padding:0 20px 0 0;float:left;text-align:right;}        .#<uispace> .u-prizeInfoEdit .row .lb span{display:inline-block;font-size:14px;}        .#<uispace> .u-prizeInfoEdit .row .lb span.lbr{color:#444;}        .#<uispace> .u-prizeInfoEdit .row .m-feedbackinfo{float:left;}        .#<uispace> .u-prizeInfoEdit .row .opt .m-feedbackinfo{margin-top: 10px;}        .#<uispace> .u-prizeInfoEdit .row .j-delImg{margin-left: 10px;}        .#<uispace> .u-prizeInfoEdit .row.mb0{margin-bottom:0;}        .#<uispace> .u-prizeInfoEdit .row .tel{padding:0;}        .#<uispace> .footer {text-align: center;margin-bottom: 50px;}        .#<uispace> .footer .saveTxt{padding: 0 50px;}        .#<uispace> .u-prizeInfoEdit .uploadbox{padding-top: 10px;}        .#<uispace> .u-prizeInfoEdit .uploadbox .j-flashbox{height: 38px;}        .#<uispace> .u-prizeInfoEdit .u-upd-img-btn .j-upload{background-color: #E1E1E1;background-image: linear-gradient(#EBEBEB, #E1E1E1);color: #666;border: 1px solid #999;padding: 0 10px;}        ',
    );
    var f = n._$addHtmlTemplate(
      '\t\t\t<div class="u-prizeInfoEdit f-cb">            <div class="main f-pr">                <div class="f-fcred subtitle f-pa">*填写截止时间为学期结束后的第30天</div>                <div class="row f-cb">                    <label class="lb f-cb"><span class="f-f0 lbr">网易支付账号:</span></label>                    <div class="content f-fl">                        <span class="j-mailAcc f-fc9">作为您的收款账号，添加之后<strong>无法修改</strong>，请仔细核对</span>                        <div class="j-epayAccount epay"></div>                        <div class="f-fc9">还没有网易支付账号？<a href="//epay.163.com/account/registStep1.htm" target="_blank">马上注册</a></div>                    </div>                </div>                <div class="row f-cb">                    <label class="lb f-cb"><span class="f-f0 lbr">身份证正反面复印件照片:</span></label>                    <div class="f-fl">                        <div class="info j-info f-fc9">支持jpg、gif、png或bmp格式的图片，建议文件小于20M<br>由于公司财务审核要求，需上传身份证正反面复印件照片。</div>                        <div class="opt f-cb">                            <div class="uploadbox j-uploadbox f-fl">                            </div>                            <div class="feedbox j-feedbox f-fl"></div>                        </div>                        <div class="j-imgBox" style="display: none"><span class="j-imgSrc"></span><a class="j-delImg">删除</a></div>                    </div>                </div>                <div class="row f-cb mb0">                    <label class="lb f-cb"><span class="f-f0 lbr">手机号码:</span></label>                    <div class="j-ipt tel f-cb f-fl"></div>                    <div class="j-fd"></div>                </div>            </div>            </div>            <div class="footer f-cb">                <a class="j-save u-btn u-btn-default"><span class="saveTxt">保存</span></a>            </div>\t\t',
    );
    c._$$ReceivePrizeCAEDialog = NEJ.C();
    l = c._$$ReceivePrizeCAEDialog._$extend(c._$$Window, !0);
    c._$$ReceivePrizeCAEDialog._$showDialog = function (e) {
      var t = c._$$ReceivePrizeCAEDialog._$allocate(e);
      t._$show();
    };
    l.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = h;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__epayAccountNode = n._$getByClassName(this.__body, 'j-epayAccount')[0];
      this.__uploadbox = n._$getByClassName(this.__body, 'j-uploadbox')[0];
      this.__feedbox = n._$getByClassName(this.__body, 'j-feedbox')[0];
      this.__infoBox = n._$getByClassName(this.__body, 'j-info')[0];
      this.__imgBox = n._$getByClassName(this.__body, 'j-imgBox')[0];
      this.__imgNode = n._$getByClassName(this.__body, 'j-imgSrc')[0];
      this.__delImgBtn = n._$getByClassName(this.__body, 'j-delImg')[0];
      this.__telIptNode = n._$getByClassName(this.__body, 'j-ipt')[0];
      this.__telFbNode = n._$getByClassName(this.__body, 'j-fd')[0];
      this.__save = n._$getByClassName(this.__body, 'j-save')[0];
      a._$addEvent(this.__delImgBtn, 'click', this.__onDelImgHandler._$bind(this));
      a._$addEvent(this.__save, 'click', this.__onSaveHandler._$bind(this));
      this.__settingCache = new s._$$COM_Cache_TermSettingsCache();
      this.__settingCache._$addEvent('onGetMemberInfo', this.__onGetMemberInfo._$bind(this));
      this.__settingCache._$addEvent(
        'onGetScholarshipInfo',
        this.__onGetScholarshipInfo._$bind(this),
      );
      this.__settingCache._$addEvent(
        'onSaveScholarshipInfo',
        function (e) {
          if (e) {
            if (this.__needRefresh) this._$dispatchEvent('onFill', null);
            this.__recycleUI();
            this._$hide();
            c._$showNode(n._$getByClassName(document.body, this.__fromClass)[0]);
            c._$showNode(_(n._$getByClassName(document.body, this.__fromClass)[0])._$prev()[0]);
          } else c._$showToastTips({ content: '保存失败，请重试！', type: 2 });
        }._$bind(this),
      );
    };
    l.__onDelImgHandler = function () {
      if (this.__imgNode.innerText) {
        c._$hiddenNode(this.__imgBox);
        c._$showNode(this.__uploadbox);
        c._$showNode(this.__infoBox);
        this.__imgUrl = '';
      }
    };
    l.__onGetMemberInfo = function (e) {
      this.__epayAccountUI = c._$$EpayAccountBindUI._$allocate({
        parent: this.__epayAccountNode,
        data: e,
      });
    };
    l.__onGetScholarshipInfo = function (e) {
      if (e) {
        this.__telIptUI._$setInitContent(e.phoneNumber || '');
        this.__imgUrl = e.idCardPhoto || '';
        this.__setIDCard(this.__imgUrl);
      }
    };
    l.__onSaveHandler = function () {
      var e = this._$getPrizeInfo();
      if (e) this.__settingCache._$saveScholarshipInfo(e.phoneNumber, e.idCardPhoto);
    };
    l.__uploadError = function (e) {
      this.__feedbackUI._$showWarnTips(e);
    };
    l.__uploadStart = function () {
      this.__feedbackUI._$showLoadingTips();
    };
    l.__uploadComplete = function () {
      this.__feedbackUI._$showRightTips('');
      if (this.__imgUpdUI) {
        var e = this.__imgUpdUI._$getUploadObj();
        if (e && e.urls && e.urls.length > 0) {
          this.__imgUrl = e.urls[0];
          this.__setIDCard(e.urls[0]);
        }
      }
    };
    l.__setIDCard = function (e) {
      var t;
      if (e) {
        t =
          e.split('?')[0].substr(-4, 4).split('.')[1] ||
          e.split('?')[0].substr(-4, 4).split('.')[0];
        this.__imgNode.innerText = '身份证.' + t;
        c._$hiddenNode(this.__uploadbox);
        c._$hiddenNode(this.__infoBox);
        this.__feedbackUI._$hideFeedback();
        c._$showNode(this.__imgBox);
      }
    };
    l.__genUI = function (e) {
      this.__imgUpdUI = c._$$ImgUploadUI._$allocate({
        parent: this.__uploadbox,
        customSize: ['3264x2448x1'],
        btnText: window.moocConfig.lang.KEY_LEARN_UPLOAD_PHOTOS,
      });
      this.__imgUpdUI._$addEvent('uploadStart', this.__uploadStart._$bind(this));
      this.__imgUpdUI._$addEvent('uploadError', this.__uploadError._$bind(this));
      this.__imgUpdUI._$addEvent('uploadComplete', this.__uploadComplete._$bind(this));
      this.__feedbackUI = c._$$FeedBackUI._$allocate({ parent: this.__feedbox });
      this.__feedbackUI._$hideFeedback();
      this.__telIptUI = c._$$BaseInputUI._$allocate({
        parent: this.__telIptNode,
        labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_NUMBER,
        height: 30,
        width: 120,
        onInputFocus: function () {
          this.__telFbUI._$hideFeedback();
        }._$bind(this),
      });
      this.__telFbUI = c._$$FeedBackUI._$allocate({ parent: this.__telFbNode });
      this.__telFbUI._$hideFeedback();
    };
    l._$getPrizeInfo = function () {
      var e = this.__verifyPrizeInfo();
      return e;
    };
    l.__verifyPrizeInfo = function () {
      var e = this.__telIptUI._$getContent(),
        t = !0;
      if (!e) {
        this.__telFbUI._$showWarnTips('请输入联系电话，座机格式为区号-电话号', !0);
        t = !1;
      } else if (!/^\d{11}$|^(\d{4}|\d{3})-(\d{7,8})$/.test(e)) {
        this.__telFbUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_PHONE_INCORRECT, !0);
        t = !1;
      }
      if (!this.__imgUrl) {
        this.__feedbackUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_PLEASE_CARD, !0);
        t = !1;
      }
      var i = t ? { phoneNumber: e, idCardPhoto: this.__imgUrl } : null;
      return i;
    };
    l.__reset = function (e) {
      e.title = window.moocConfig.lang.KEY_LEARN_FILL_INFORMATION;
      e.maskClickNotHidden = !0;
      e.clazz = 'u-prizeDialog f-f0';
      e.onclose = this.__closeHandle._$bind(this);
      this.__fromClass = e.from;
      this.__needRefresh = e.needRefresh || !1;
      this.__supReset(e);
      this.__settingCache._$getMemberInfo(c._$getWebUser().id);
      this.__settingCache._$getScholarshipInfo();
      this.__genUI(e);
    };
    l.__recycleUI = function () {
      if (this.__epayAccountUI)
        this.__epayAccountUI = c._$$EpayAccountBindUI._$recycle(this.__epayAccountUI);
      if (this.__imgUpdUI) {
        this.__imgUpdUI.__destroy();
        this.__imgUpdUI = null;
      }
      if (this.__feedbackUI) this.__feedbackUI = c._$$FeedBackUI._$recycle(this.__feedbackUI);
      if (this.__telIptUI) this.__telIptUI = c._$$BaseInputUI._$recycle(this.__telIptUI);
      if (this.__telFbUI) this.__telFbUI = c._$$FeedBackUI._$recycle(this.__telFbUI);
    };
    l.__closeHandle = function () {
      this.__recycleUI();
      this._$hide();
      c._$showNode(n._$getByClassName(document.body, this.__fromClass)[0]);
      c._$showNode(_(n._$getByClassName(document.body, this.__fromClass)[0])._$prev()[0]);
    };
    l.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  'ddff3fe6a4233d567887a1921f3f1668',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  'cafdd5186cffb672997fd8e30345b39b',
  '398ddb926810364dac877824f1b0015a',
  'd702c6c0bcd70f9b4114ae0d7c2ea1b8',
  'fee4c38f314dd0beb1624df2aa08cdc8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
