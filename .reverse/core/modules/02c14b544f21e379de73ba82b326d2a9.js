EDU(
  '02c14b544f21e379de73ba82b326d2a9',
  function () {
    var e = NEJ.O,
      t = window,
      n = NEJ.P('nej.e'),
      i = NEJ.P('nej.v'),
      o = NEJ.P('edu.m'),
      a = NEJ.P('edu.u'),
      r;
    var s = n._$addNodeTemplate(
        '<div class="u-baseinputui">\t        <textarea name="inputtxt" class="j-textarea inputtxt"></textarea>\t        <label class="j-hint inputhint" for="inputtxt"></label>\t\t</div>',
      ),
      c = n._$addNodeTemplate(
        '<div class="u-baseinputui">\t        <input type="text" name="inputtxt" class="j-textarea inputtxt" autocomplete="off"></input>\t        <label class="j-hint inputhint" for="inputtxt"></label>\t\t</div>',
      );
    a._$$BaseInputUI = NEJ.C();
    r = a._$$BaseInputUI._$extend(a._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = s;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__charUtil = new o._$$CharasetUtil();
    };
    r.__reset = function (e) {
      var t = n._$addNodeTemplate(
          '<div class="u-baseinputui">\t        <textarea name="inputtxt" class="j-textarea inputtxt"></textarea>\t        <label class="j-hint inputhint" for="inputtxt"></label>\t\t</div>',
        ),
        i = n._$addNodeTemplate(
          '<div class="u-baseinputui">\t        <input type="text" name="inputtxt" class="j-textarea inputtxt" autocomplete="new-password"></input>\t        <label class="j-hint inputhint" for="inputtxt"></label>\t\t</div>',
        );
      this.__body = n._$getNodeTemplate(t);
      if ('input' == e.type) this.__body = n._$getNodeTemplate(i);
      this.__textLabel = n._$getByClassName(this.__body, 'j-hint')[0];
      this.__textArea = n._$getByClassName(this.__body, 'j-textarea')[0];
      this.__supReset(e);
      this.__textLabel = n._$getByClassName(this.__body, 'j-hint')[0];
      this.__textArea = n._$getByClassName(this.__body, 'j-textarea')[0];
      if (e.inputArea) {
        this.__inputArea = n._$get(e.inputArea);
        this.__textArea = n._$getByClassName(this.__inputArea, 'j-input')[0];
        this.__textLabel = n._$getByClassName(this.__inputArea, 'j-label')[0];
        if (e.width) {
          this.__body.style.width = e.width + 'px';
          this.__textArea.style.width = e.width + 'px';
        }
        if (e.height) {
          this.__body.style.height = e.height + 'px';
          this.__textArea.style.height = e.height + 'px';
        }
      }
      this.__doInitDomEvent([
        [this.__textLabel, 'click', this._$focusTextArea._$bind(this)],
        [this.__textArea, 'click', this.__onTextareaClick._$bind(this)],
        [this.__textArea, 'focus', this.__onTextareaFocus._$bind(this)],
        [this.__textArea, 'blur', this.__onTextareaBlur._$bind(this)],
        [this.__textArea, 'keydown', this.__onTextareaDown._$bind(this)],
        [this.__textArea, 'keyup', this.__onInputChange._$bind(this)],
        [this.__textArea, 'input', this.__onInputChange._$bind(this)],
      ]);
      if (e.labelText) this.__textLabel.innerHTML = e.labelText || '';
      if (e.releaseTime && e.releaseTime <= +new Date()) n._$attr(this.__textArea, 'readonly', !0);
      this._$setInitContent(e.content || '');
      if (e.width) {
        this.__body.style.width = e.width + 'px';
        this.__textArea.style.width = e.width - 10 + 'px';
      }
      if (e.height) {
        this.__body.style.height = e.height + 'px';
        this.__textArea.style.height = e.height - 10 + 'px';
      }
      this._$enableInput();
      this.__notBubble = e.notBubble || !1;
      this.__isFilterEnter = e.filterEnter || !1;
      this.__reg = e.reg || '';
    };
    r.__onTextareaDown = function (e) {
      if (e) this._$dispatchEvent('onInputKeyDown', e);
    };
    r.__onTextareaFocus = function (e) {
      a._$hiddenNode(this.__textLabel);
      if (e) this._$dispatchEvent('onInputFocus');
    };
    r.__onTextareaClick = function (e) {
      if (e) this._$dispatchEvent('onInputClick');
    };
    r.__onTextareaBlur = function (e) {
      var t = this.__textArea.value;
      if (!t) a._$showNode(this.__textLabel);
      else a._$hiddenNode(this.__textLabel);
      if (e) this._$dispatchEvent('onInputBlur', t);
    };
    r.__onInputChange = function (e) {
      if (e) {
        if (this.__isFilterEnter && 13 == e.keyCode) {
          var t = this.__textArea.value.replace(/[\r\n]/g, '');
          this._$setInitContent(t);
        }
        if (this.__reg && 32 != e.keyCode) {
          var t = this.__textArea.value.replace(this.__reg, '');
          this._$setInitContent(t);
        }
        this._$dispatchEvent('onInputChange', e);
      }
    };
    r._$focusTextArea = function () {
      this.__textArea.focus();
    };
    r._$blurTextArea = function () {
      this.__textArea.blur();
    };
    r._$setInitContent = function (e) {
      e += '';
      e = a._$trim(e || '');
      this.__initValue = e;
      this.__textArea.value = e;
      this.__onTextareaBlur(null);
    };
    r._$isModified = function () {
      var e = this._$getContent();
      return this.__initValue != e && '' != e;
    };
    r._$getContent = function () {
      return a._$trim(this.__textArea.value || '').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    };
    r._$getContentNoTrim = function () {
      return (this.__textArea.value || '').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    };
    r._$setContentNoTrim = function (e) {
      e += '';
      e = e || '';
      this.__textArea.value = e;
      this.__onTextareaBlur(null);
    };
    r._$setContent = function (e) {
      e += '';
      e = a._$trim(e || '');
      this.__textArea.value = e;
      this.__onTextareaBlur(null);
    };
    r._$getCount = function () {
      return this.__charUtil._$getCharsL(this._$getContent());
    };
    r._$isMatchExp = function (e) {
      return this.__charUtil._$formatChars(e, this._$getContent());
    };
    r._$disableInput = function () {
      this.__textArea.value = '';
      this.__textArea.setAttribute('disabled', 'disabled');
      n._$addClassName(this.__body, 'u-baseinputui-disable');
    };
    r._$disableNoInitInput = function () {
      this.__textArea.setAttribute('disabled', 'disabled');
      n._$addClassName(this.__body, 'u-baseinputui-disable');
    };
    r._$enableInput = function () {
      this.__textArea.removeAttribute('disabled');
      n._$delClassName(this.__body, 'u-baseinputui-disable');
    };
    r._$erringInput = function () {
      n._$addClassName(this.__body, 'u-baseinputui-error');
    };
    r._$removeErringInput = function () {
      n._$delClassName(this.__body, 'u-baseinputui-error');
    };
    r._$setWidth = function (e) {
      this.__body.style.width = e - 10 + 'px';
      this.__textArea.style.width = e - 10 + 'px';
    };
    r._$setHeight = function (e) {
      this.__body.style.height = e - 10 + 'px';
      this.__textArea.style.height = e - 10 + 'px';
    };
    r._$getTextArea = function () {
      return this.__textArea;
    };
    r._$setTextLabel = function (e) {
      this.__textLabel.innerText = e;
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
