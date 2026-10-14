EDU(
  'bbb7d6117a4fc9e146e67adf883521d6',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c,
      d = i._$addHtmlTemplate(
        '<div class="m-edititem">\t\t    <div class="editwrap">\t\t        <textarea name="edittxt" class="j-edittxt edittxt"></textarea>\t\t        <label class="j-hint hint" for="edittxt"></label>\t\t    </div>\t\t\t<div class="editopt f-cb">\t            <a hidefocus="true" class="j-edit-btn u-btn u-btn-primary editbtn"><span class="j-btn-text">保存</span></a>\t            <a hidefocus="true" class="j-close-btn f-fc9 cancelbtn">取消</a>\t\t\t</div>\t\t</div>',
      );
    r._$$EditItem = NEJ.C();
    c = r._$$EditItem._$extend(r._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(i._$getHtmlTemplate(d));
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__textLabel = i._$getByClassName(this.__body, 'j-hint')[0];
      this.__textArea = i._$getByClassName(this.__body, 'j-edittxt')[0];
      this.__edit_btn = i._$getByClassName(this.__body, 'j-edit-btn')[0];
      this.__edit_btn_text = i._$getByClassName(this.__body, 'j-btn-text')[0];
      this.__close_btn = i._$getByClassName(this.__body, 'j-close-btn')[0];
      o._$addEvent(this.__textLabel, 'click', this._$focusTextArea._$bind(this));
      o._$addEvent(this.__textArea, 'focus', this.__onTextareaFocus._$bind(this));
      o._$addEvent(this.__textArea, 'blur', this.__onTextareaBlur._$bind(this));
      o._$addEvent(this.__textArea, 'keydown', this.__onTextareaDown._$bind(this));
      o._$addEvent(this.__edit_btn, 'click', this.__editNotesHandle._$bind(this));
      o._$addEvent(this.__close_btn, 'click', this.__closeNotesHandle._$bind(this));
    };
    c._$focusTextArea = function () {
      this.__textArea.focus();
    };
    c.__onTextareaBlur = function (e) {
      o._$stop(e);
      var t = this.__textArea.value;
      if (!t) r._$showNode(this.__textLabel);
      else r._$hiddenNode(this.__textLabel);
      this._$dispatchEvent('onBlurArea');
    };
    c.__onTextareaFocus = function (e) {
      o._$stop(e);
      r._$hiddenNode(this.__textLabel);
      this._$dispatchEvent('onFocusArea');
    };
    c.__onTextareaDown = function (e) {
      if (e.ctrlKey)
        switch (e.keyCode) {
          case 13:
            o._$stop(e);
            this.__editNotesHandle();
        }
    };
    c.__editNotesHandle = function (e) {
      o._$stop(e);
      this._$dispatchEvent('onEditClick');
    };
    c.__closeNotesHandle = function (e) {
      o._$stop(e);
      this._$dispatchEvent('onCloseClick');
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__edit_btn_text.innerText = e.btnText || '保存';
      this.__close_btn.innerText = e.cancelBtnText || '取消';
      this.__textLabel.innerText = e.labelText || '';
      r._$showNode(this.__textLabel);
      var t = e.notShowClose || !1;
      if (!t) r._$showNode(this.__close_btn);
      else r._$hiddenNode(this.__close_btn);
    };
    c._$setInitContent = function (e) {
      e = r._$trim(e || '');
      this.__initValue = e;
      this.__textArea.value = e;
      this.__onTextareaBlur();
    };
    c._$isModified = function () {
      var e = this._$getContent();
      return this.__initValue != e && '' != e;
    };
    c._$getContent = function () {
      var e = r._$trim(this.__textArea.value || '');
      return e;
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
