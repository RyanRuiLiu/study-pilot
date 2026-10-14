EDU(
  '68140d527eabb13c83a92c899000ea65',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d =
        '            <div class="u-sugInput">                <div class="iptArea f-cb">                    <div class="ipt"></div>                    <a class="add u-btn u-btn-default">添加</a>                </div>                <p></p>                <p></p>                <div class="tags"></div>            </div>',
      _;
    c._$$InfoSuggest = NEJ.C();
    _ = c._$$InfoSuggest._$extend(c._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(d);
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__inputWrp = n._$getChildren(this.__body)[0];
      this.__inputP = n._$getChildren(this.__inputWrp)[0];
      this.__add = n._$getChildren(this.__inputWrp)[1];
      this.__countTxt = n._$getChildren(this.__body)[1];
      this.__hintTxt = n._$getChildren(this.__body)[2];
      this.__tagP = n._$getChildren(this.__body)[3];
      this.__tagArr = [];
      this.__tagVo = [];
      this.__charUtil = new r._$$CharasetUtil();
      a._$addEvent(this.__add, 'click', this.__onAddHandle._$bind(this));
      this.__suggestionCache = new s._$$COM_Cache_SuggestionCache();
      this.__suggestionCache._$addEvent(
        'onGetTeacherInChargeSuggest',
        this.__onGetSuggestion._$bind(this),
      );
      this.__suggestionCache._$addEvent('onGetSuggestCourse', this.__onGetSuggestion._$bind(this));
    };
    _.__onGetSuggestion = function (e) {
      this.__list = [];
      for (var t = 0; t < e.length; t++) {
        e[t].text = 'text';
        if ('chargeTeacher' == this.__phrase) {
          if (!e[t].nickName) e[t].nickName = '';
          e[t].name = e[t].lectorName + ' (' + e[t].schoolName + ' ' + e[t].nickName + ')';
          e[t].id = e[t].lectorId;
        } else if ('spocCourse' == this.__phrase) {
          if (!e[t].name) e[t].name = '';
          e[t].name = e[t].name + ' (' + (e[t].schoolPanel || {}).name + ')';
        }
        e[t].title = '';
        this.__list.push(e[t]);
      }
      this.__inputSug._$onSetLabelSuggestion(this.__list);
    };
    _.__onAddHandle = function () {
      var e = this.__inputSug.__input._$getContent();
      e = e.replace(/\s/g, '_');
      if ('' == e) {
        c.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_PLEASE_LABEL, type: 2 });
        return !1;
      }
      this.__inputSug.__input._$setInitContent();
    };
    _.__reset = function (e) {
      this.__supReset(e);
      this.__tagCount = e.tagCount;
      this.__countTxt.innerText = window.moocConfig.lang.KEY_LEARN_YOU_UP + this.__tagCount + '个';
      this.__hintTxt.innerText = e.hint || '';
      this.__labelText = e.labelText || '';
      this.__tagArr = [];
      this.__phrase = e.phrase || '';
      this.__schoolId = null;
      if ('chargeTeacher' == this.__phrase || 'spocCourse' == this.__phrase) {
        c._$hiddenNode(this.__countTxt);
        c._$hiddenNode(this.__add);
        c._$hiddenNode(this.__countTxt);
      } else c._$showNode(this.__countTxt);
      this.__inputSug = c._$$InputSuggest._$allocate({
        parent: this.__inputP,
        labelText: this.__labelText,
        width: 280,
        height: 32,
        onSelect: this.__selectSuggest._$bind(this),
        onKeyDown: this.__onInputKeyDown._$bind(this),
        onSuggest: this.__postSuggest._$bind(this),
        onDeleteCnt: function () {
          this._$dispatchEvent('onDeleteCnt');
        }._$bind(this),
        onInputFocus: function () {
          this._$dispatchEvent('onInputFocus');
        }._$bind(this),
      });
    };
    _.__onInputKeyDown = function (e) {
      if (13 == e.keyCode)
        if (0 == this.__list.length) {
          var t = this.__inputSug.__input._$getContent();
          this.__inputSug.__input._$setInitContent('');
          this.__inputSug.__input._$blurTextArea();
        }
    };
    _.__selectSuggest = function (e) {
      for (var t = 0; t < this.__list.length; t++)
        if (this.__list[t].id == e.id) NEJ.X(e, this.__list[t]);
      this._$dispatchEvent('onSelect', e);
    };
    _.__destroy = function () {
      this.__schoolId = null;
      this.__inputSug = c._$$InputSuggest._$recycle(this.__inputSug);
      this.__supDestroy();
    };
    _.__postSuggest = function (e) {
      if ('chargeTeacher' == this.__phrase)
        this.__suggestionCache._$getChargeTeacherSuggestion(e, this.__schoolId);
      else if ('spocCourse' == this.__phrase) this.__suggestionCache._$listCourseByName(e);
    };
    _._$setSchoolId = function (e) {
      this.__schoolId = e;
    };
    _._$setInitContent = function (e) {
      this.__inputSug._$setInitContent(e);
    };
    _._$disableNoInitInput = function () {
      this.__inputSug._$disableNoInitInput();
    };
    _._$enableInput = function () {
      this.__inputSug._$enableInput();
    };
  },
  'add7e5d4d4a772d787eec2ad51e08ae5',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '9fdfe36fa0d16f9b8a86b6a56a15749d',
  '342ad7ae4eea50c3cad860686650a915',
  'cc26d5920093e9742f0feca3855e8e68',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
