EDU(
  'fd2d304e0f3ed379c890a0e85b358838',
  function (e) {
    var t = window,
      i = NEJ.P('nej.e'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s =
        '            <div class="u-sugInput">                <div class="iptArea f-cb">                    <div class="ipt"></div>                </div>            </div>',
      _;
    var r = { COURSE: 1, KAOYAN: 2, COLUMN: 3 };
    var c = { MOOC: 0, ADULT: 1 };
    o._$$SearchSuggest = NEJ.C();
    _ = o._$$SearchSuggest._$extend(o._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(s);
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__inputWrp = i._$getChildren(this.__body)[0];
      this.__inputP = i._$getChildren(this.__inputWrp)[0];
      this.__charUtil = new a._$$CharasetUtil();
      this.__suggestionCache = new n._$$COM_Cache_SuggestionCache();
      this.__suggestionCache._$addEvent(
        'onGetCourseSuggestList',
        this.__onGetSuggestion._$bind(this),
      );
    };
    _.__onGetSuggestion = function (i) {
      this.__list = [];
      this.__list.push({
        id: -1,
        originalName: this.__phrase,
        name: '搜索"' + this.__phrase + '"所有相关课程',
        url: t.urlPrefix.searchPrefix + '?search=' + encodeURIComponent(this.__phrase),
      });
      if (i && i.length) {
        var n = i.length > 10 ? 10 : i.length;
        for (var a = 0; a < n; a++) {
          var o = '';
          var s = i[a] || {};
          var _ = s.name || '';
          var d = s.productType;
          var l = 'zw_mooc_pcsslx_';
          _ = _.replace(/<[^>]+>/g, '');
          var u = _;
          if (s.schoolName) _ = _ + ' (' + s.schoolName + ')';
          if (s.platType === c.ADULT)
            o = e._$getChangeEduCookiesUrl(
              'https://ke.study.163.com/course/detail/' + s.id + '?inLoc=MocWebss_sslx&Pdt=Moc.Web',
            );
          else if (d === r.COURSE || (d === r.KAOYAN && 1 == s.courseType))
            o = t.urlPrefix.courseInfoPrefix + s.id + '.htm?outVendor=' + l;
          else if (d === r.KAOYAN)
            o = '//kaoyan.icourse163.org/course/packages/' + s.id + '.htm?outVendor=' + l;
          else if (d === r.COLUMN) o = '/columns/' + s.currentTermId + '.htm?outVendor=' + l;
          this.__list.push({ url: o, name: _, id: s.id, originalName: u });
        }
      }
      this.__inputSug._$onSetLabelSuggestion(this.__list);
    };
    _._$getContent = function () {
      return this.__inputSug._$getContent();
    };
    _.__reset = function (e) {
      this.__supReset(e);
      this.__labelText = e.labelText || '';
      this.__phrase = e.phrase || '';
      this.__inputSug = o._$$InputSuggest._$allocate({
        parent: this.__inputP,
        labelText: this.__labelText,
        height: 30,
        noEnterFill: !0,
        onSelect: this.__selectSuggest._$bind(this),
        onKeyDown: this.__onInputKeyDown._$bind(this),
        onSuggest: this.__postSuggest._$bind(this),
        onInputFocus: function () {
          this._$dispatchEvent('onInputFocus');
        }._$bind(this),
        onInputBlur: function () {
          this._$dispatchEvent('onInputBlur');
        }._$bind(this),
      });
    };
    _.__onInputKeyDown = (function () {
      function e(e) {
        if (!i) {
          i = !0;
          if (!this.__list || 0 == this.__list.length) this.__inputSug.__input._$blurTextArea();
          this._$dispatchEvent('onInputKeyDown', e);
          i = !1;
        }
      }
      var t = 50;
      var i = !1;
      return function (i) {
        if (i && 13 == i.keyCode)
          if (/mac os/i.test(window.navigator.userAgent)) setTimeout(e._$bind(this, i), t);
          else e.call(this, i);
      };
    })();
    _.__selectSuggest = function (e) {
      for (var i = 0; i < this.__list.length; i++)
        if (this.__list[i].id == e.id) NEJ.X(e, this.__list[i]);
      if (e.url) {
        t.open(e.url);
        window.DATracker &&
          window.DATracker.track('首页-搜索联想点击-w', {
            user_id: window.webUser ? window.webUser.id : '',
            associate_words: e.name,
          });
      }
    };
    _.__destroy = function () {
      this.__schoolId = null;
      this.__inputSug = o._$$InputSuggest._$recycle(this.__inputSug);
      this.__supDestroy();
    };
    _.__postSuggest = function (e) {
      this.__phrase = e;
      this.__suggestionCache._$getCourseSuggestList(e);
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
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'add7e5d4d4a772d787eec2ad51e08ae5',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '9fdfe36fa0d16f9b8a86b6a56a15749d',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
