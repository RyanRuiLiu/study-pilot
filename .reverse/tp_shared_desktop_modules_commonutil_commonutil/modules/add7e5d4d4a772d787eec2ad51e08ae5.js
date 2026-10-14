EDU(
  'add7e5d4d4a772d787eec2ad51e08ae5',
  function (e) {
    var t = NEJ.P('nej.e'),
      i = NEJ.P('nej.v'),
      n = NEJ.P('edu.m'),
      a = NEJ.P('edu.u'),
      o =
        '                    <div class="u-insug">                        <div class="area"></div>                        <div class="sug" style="display:none">                            <div class="f-thide s-fc6 ar j-basetxt">请选择或继续输入...</div>                            <div class=""></div>                        </div>                    </div>',
      s;
    a._$$InputSuggest = NEJ.C();
    s = a._$$InputSuggest._$extend(a._$$UIBase, !0);
    s.__initXGui = function () {
      this.__seed_html = t._$addNodeTemplate(o);
    };
    s.__initNode = function () {
      this.__supInitNode();
      var e = t._$getChildren(this.__body);
      this.__inputP = e[0];
      this.__suggestP = e[1];
      this.__baseTextInput = t._$getByClassName(this.__body, 'j-basetxt')[0];
      this.__sugstCnt = t._$getChildren(this.__suggestP)[1];
      this.__charUtil = new n._$$CharasetUtil();
    };
    s._$onSetLabelSuggestion = function (e, t, i, n) {
      if (!e || 0 != e.length) {
        if (!((t && t != this.__labelValue) || this.__noFocus)) {
          this.__suggest._$setList(e, i, n);
          a._$showNode(this.__suggestP);
        }
      } else {
        this.__suggest._$setList(e);
        a._$hiddenNode(this.__suggestP);
      }
    };
    s.__cursorHandle = function (e) {
      this._$dispatchEvent('onInputFocus');
      setTimeout(
        function () {
          if (e) {
            this.__suggest = a._$$Suggest._$getInstance({
              input: this.__input.__textArea || this.__input.__input,
              parent: this.__suggestP,
              suggestOption: this.__sugstCnt,
              separate: this.__separate,
              onchange: this.__onChange._$bind(this),
              onselect: this.__onSelect._$bind(this),
              onblur: this.__onBlur._$bind(this),
              noInputFill: this.__noEnterFill || !1,
            });
            this.__noFocus = !1;
          }
        }._$bind(this),
        200,
      );
    };
    s.__hiddenSuggest = function () {
      this.__suggest._$setList();
      a._$hiddenNode(this.__suggestP);
    };
    s.__onChange = function (e, t) {
      switch (t.keyCode) {
        case 13:
          i._$stop(t);
          if (a._$isNodeShown(this.__suggestP)) this.__onAddToInput(e);
          return;
        case 8:
          i._$stop(t);
          if (!a._$isNodeShown(this.__suggestP))
            if (e.match('.+\\s\\(.+')) {
              e = a._$trim(e.split('(')[0]);
              this.__input._$setInitContent(e);
              this._$dispatchEvent('onDeleteCnt');
              return;
            }
          break;
        case 38:
          i._$stop(t);
          return;
        case 40:
          i._$stop(t);
          return;
      }
      if (!e.match('.*\\s+$'))
        if ('' != e) {
          var n = this.__charUtil._$spaceFilter(e);
          this.__labelValue = n[n.length - 1];
          this.__handleOnSuggest(this, this.__labelValue);
        } else this.__hiddenSuggest();
      else this.__hiddenSuggest();
    };
    s.__handleOnSuggest = (function () {
      return e.debounce(
        function (e, t) {
          if (t) e._$dispatchEvent('onSuggest', t);
        },
        400,
        !1,
      );
    })();
    s.__onAddToInput = function (e) {
      if (this.__input._$getContent().trim() != e.name) {
        var t = this.__charUtil._$spaceFilter(this.__input._$getContent().trim());
        t[t.length - 1] = e.name;
        if (!this.__noEnterFill) this.__input._$setInitContent(t.join(' ') + ' ');
      }
      a._$hiddenNode(this.__suggestP);
    };
    s.__onSelect = function (e) {
      this.__onAddToInput(e);
      this.__noFocus = !1;
      if (e) this._$dispatchEvent('onSelect', e);
    };
    s.__onBlur = function () {
      a._$hiddenNode(this.__suggestP);
      this.__noFocus = !0;
    };
    s.__onInputKeyDown = function (e) {
      this._$dispatchEvent('onKeyDown', e, this.__input._$getContent());
    };
    s._$setInitContent = function (e) {
      this.__input._$setInitContent(e);
    };
    s.__reset = function (e) {
      this.__supReset(e);
      this.__critical = e.critical || 0;
      this.__labeText = e.labelText || '请输入';
      this.__separate = e.separate || '';
      this.__noEnterFill = e.noEnterFill || !1;
      this.__baseTextInput.innerText = e.baseText || '请选择或继续输入...';
      if (!this.__critical)
        this.__input = a._$$BaseInputUI._$allocate({
          parent: this.__inputP,
          labelText: this.__labeText,
          content: e.content,
          width: e.width,
          height: e.height,
          type: 'input',
          onInputFocus: this.__cursorHandle._$bind(this, !0),
          onInputBlur: e.onInputBlur,
          onInputChange: this.__onInputKeyDown._$bind(this),
        });
      else
        this.__input = a._$$TipInputUI._$allocate({
          parent: this.__inputP,
          labelText: this.__labeText,
          filterEnter: !0,
          type: 'input',
          width: e.width,
          height: e.height,
          critical: this.__critical,
          onInputFocus: this.__cursorHandle._$bind(this, !0),
          onInputBlur: e.onInputBlur,
          onInputChange: this.__onInputKeyDown._$bind(this),
        });
    };
    s._$getContent = function () {
      return this.__input._$getContent();
    };
    s._$setContent = function (e) {
      this.__input._$getContent(e);
    };
    s._$disableNoInitInput = function () {
      this.__input._$disableNoInitInput();
    };
    s._$enableInput = function () {
      this.__input._$enableInput();
    };
    s.__destroy = function () {
      if (!this.__critical) this.__input = a._$$BaseInputUI._$recycle(this.__input);
      else this.__input = a._$$TipInputUI._$recycle(this.__input);
      this.__supDestroy();
    };
  },
  '06a1fe998ca2ede601d4740c114f6c3c',
  '02c14b544f21e379de73ba82b326d2a9',
  '342ad7ae4eea50c3cad860686650a915',
  '5f6786e7896f2a86bf128de299871305',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '9a4e3ec58394f1d885dede90ffdef662',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
