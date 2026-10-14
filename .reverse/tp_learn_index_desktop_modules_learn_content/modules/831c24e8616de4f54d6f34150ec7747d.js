EDU(
  '831c24e8616de4f54d6f34150ec7747d',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.ui'),
      d;
    var l = a._$pushCSSText(
      '\t \t        .#<uispace> {}\t \t        .#<uispace> .rich-opt{margin-top:10px;}\t \t        .#<uispace> .rich-opt label{cursor:pointer;color:#999;vertical-align:top;}\t \t        .#<uispace> .rich-opt label:hover{color:#61a500;}\t \t        .#<uispace> .rich-opt label input{margin-top:3px;}\t \t        .#<uispace> .rich-opt .cancelbtn{margin-right:10px;line-height:24px;}\t \t        .#<uispace> .unlogin{position:absolute;top:0;left:0;bottom:0;right:0;}\t \t        .#<uispace> .unlogin .autowrap {margin:115px auto;width:188px;}\t \t        .#<uispace> .unlogin .autowrap p{line-height:26px;color:#666;margin-right:10px;}\t \t        ',
    );
    var _ = a._$addHtmlTemplate(
      '\t\t\t<div class="ui-richEditor f-cb f-pr">\t\t\t    <div class="rich-wrap">\t\t\t        <div class="rich-editor j-richeditor"></div>\t\t\t        <div class="rich-opt f-cb">\t    \t\t\t\t<label class="j-anony f-fl"><input type="checkbox" hidefocus="true" class="j-anonycheck"/>&nbsp;&nbsp;${lang.KEY_LEARN_ANONYMOUS}</label>\t    \t\t\t\t<a hidefocus="true" class="j-edit-btn editbtn u-btn u-btn-sm u-btn-primary f-fr"></a>\t\t            \t<a hidefocus="true" class="j-close-btn cancelbtn f-fc9 f-fr">${lang.KEY_LEARN_CANCEL}</a>\t\t\t        </div>\t\t\t    </div>\t\t\t    <div class="unlogin j-unloginbox">\t\t\t    \t<div class="autowrap f-cb">\t\t\t    \t\t<p class="f-fl">${lang.KEY_LEARN_LOGIN_OPINION}</p>\t\t\t    \t\t<a hidefocus="true" class="j-login-btn loginbtn u-btn u-btn-sm u-btn-primary f-fl">${lang.KEY_LEARN_LOG_IMMEDIATELY}</a>\t\t\t    \t</div>\t\t\t    </div>\t\t\t</div>',
    );
    r._$$RichEditItem = NEJ.C();
    d = r._$$RichEditItem._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(_, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = l;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__richBox = a._$getByClassName(this.__body, 'j-richeditor')[0];
      this.__edit_btn = a._$getByClassName(this.__body, 'j-edit-btn')[0];
      this.__close_btn = a._$getByClassName(this.__body, 'j-close-btn')[0];
      this.__anonyNode = a._$getByClassName(this.__body, 'j-anony')[0];
      this.__anonyCheckBox = a._$getByClassName(this.__body, 'j-anonycheck')[0];
      this.__unloginBox = a._$getByClassName(this.__body, 'j-unloginbox')[0];
      this.__loginBtn = a._$getByClassName(this.__body, 'j-login-btn')[0];
      s._$addEvent(this.__edit_btn, 'click', this.__editHandle._$bind(this));
      s._$addEvent(this.__close_btn, 'click', this.__closeHandle._$bind(this));
      s._$addEvent(this.__loginBtn, 'click', this.__loginHandle._$bind(this));
    };
    d.__editHandle = function (e) {
      if (r._$isUserLogin()) {
        if (0 == n.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        s._$stop(e);
        this._$dispatchEvent('onEditClick');
      } else r._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__closeHandle = function (e) {
      s._$stop(e);
      this._$dispatchEvent('onCloseClick');
    };
    d.__loginHandle = function (e) {
      s._$stop(e);
      r._$$LoginDialog._$showLogin({});
    };
    d.__dealWithLoginStatus = function () {
      if (r._$isUserLogin()) r._$hiddenNode(this.__unloginBox);
      else r._$showNode(this.__unloginBox);
    };
    d.__reset = function (t) {
      this.__supReset(t);
      this.__edit_btn.innerText = t.btnText || window.moocConfig.lang.KEY_LEARN_PUBLISH;
      var n = t.notShowClose || !1;
      if (!n) r._$showNode(this.__close_btn);
      else r._$hiddenNode(this.__close_btn);
      this.__initValue = t.initContent || '';
      if (this.__richUI) this.__richUI.destroy();
      this.__richUI = new e({
        data: { value: this.__initValue, focus: !!t.focus, height: t.height },
      }).$inject(this.__richBox);
      this._$setAnonyChecked(!!t.anonyChecked);
      this.__dealWithLoginStatus();
    };
    d._$isModified = function () {
      var e = this._$getContent();
      return this.__initValue != e && '' != e;
    };
    d._$getContent = function () {
      return this.__richUI.__richUI._$getContent();
    };
    d._$getAnonyChecked = function () {
      return this.__anonyCheckBox.checked ? 1 : 0;
    };
    d._$setAnonyChecked = function (e) {
      this.__anonyCheckBox.checked = !!e;
    };
    d._$getPhotoIdsAndUrls = function () {
      return this.__richUI.__richUI._$getPhotoIdsAndUrls();
    };
    d._$setContent = function (e) {
      return this.__richUI.__richUI._$setContent(e);
    };
    d._$clearCtAndAnony = function (e) {
      if (!r._$isNodeShown(this.__unloginBox)) {
        this.__richUI.__richUI._$setContent('');
        this._$setAnonyChecked(!1);
        if (e) this.__richUI.__richUI._$focus();
      }
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
  },
  'c3d8b9ca858a4c969aa91fbe6e8bca0c',
  '1c23b43dfd9c054559909485b4169fa4',
  '342ad7ae4eea50c3cad860686650a915',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
