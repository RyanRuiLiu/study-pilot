EDU(
  '9a4e3ec58394f1d885dede90ffdef662',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      i = e('nej.e'),
      n = e('nej.u'),
      a = e('nej.ut'),
      o = e('nej.ui'),
      s = e('edu.u'),
      r,
      c;
    var d = i._$pushCSSText(
      '        .#<uispace>-parent{position:absolute;left:-1px;border:1px solid #d5d5d5;width:100%;background:#FAFAFA;z-index:999;}        .#<uispace>-parent .j-cnt{width:100%;color:#444;visibility:hidden;}\t\t.#<uispace>-parent .zitm-top{width:100%;text-indent:6px;line-height:32px;cursor:pointer;}        .#<uispace>-parent .zitm,.#<uispace>-parent .zitm p{width:100%;text-indent:6px;line-height:32px;cursor:pointer;}\t\t.#<uispace>-parent .zitm a{display:block;overflow:hidden;text-overflow:ellipsis;font-size:12px}\t\t.#<uispace>-parent .zitm:hover,.#<uispace>-parent .zitm:hover p{color:#16914E;background-color:#ECECEE;}        .#<uispace>-parent .js-selected,.#<uispace>-parent .js-selected p{color:#16914E;background-color:#ECECEE;}',
    );
    var _;
    s._$$Suggest = NEJ.C();
    r = s._$$Suggest._$extend(o._$$Abstract);
    c = s._$$Suggest._$supro;
    s._$$Suggest._$getInstance = function (e) {
      if (_) {
        _.__suggest._$recycle();
        delete _.__suggest;
        _.__reset(e);
        return _;
      } else {
        _ = s._$$Suggest._$allocate(e);
        return _;
      }
    };
    r.__init = function () {
      this.__sopt = {
        onchange: this.__onChange._$bind(this),
        onselect: this.__onSelect._$bind(this),
        onblur: this.__onBlur._$bind(this),
      };
      this.__supInit();
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__suggestOption = e.suggestOption;
      this.__separate = e.separate;
      this.__sopt.body = this.__suggestOption;
      this.__sopt.input = i._$get(e.input);
      this.__sopt.input.insertAdjacentElement('afterEnd', e.parent);
      this.__sopt.noInputFill = e.noInputFill;
      this.__suggest = s._$$SuggestAgent._$allocate(this.__sopt);
    };
    r.__destroy = function () {
      this.__supDestroy();
      this.__suggest._$recycle();
      delete this.__suggest;
      delete this.__sopt.input;
    };
    r.__initXGui = function () {
      this.__seed_css = d;
    };
    r.__initNode = function () {
      this.__supInitNode();
    };
    r.__onChange = function (e, t) {
      this._$dispatchEvent('onchange', e, t);
    };
    r.__onSelect = function (e) {
      if (n._$isObject(e)) this._$dispatchEvent('onselect', e);
    };
    r.__onBlur = function (e) {
      this._$dispatchEvent('onblur', e);
    };
    r._$setList = function (e, t, a) {
      this.__dataList = e;
      if (n._$isArray(e)) {
        n._$forEach(e, function (e, t) {
          if (e.name) e.name = e.name.replace(/<br\/>/gi, ' ');
          if (e.title) e.title = e.title || e.name;
        });
        e = i._$getHtmlTemplate(a || 'jst-suggest', { xlist: e });
      }
      this.__suggestOption.innerHTML = e || '';
      this.__nodeList = !t
        ? i._$getChildren(this.__suggestOption)
        : i._$getByClassName(this.__suggestOption, t);
      n._$forEach(
        this.__nodeList,
        function (e, t) {
          var n = this.__dataList[t].id;
          if (n) if (this.__separate && this.__separate[n]) i._$addClassName(e, this.__separate[n]);
        }._$bind(this),
      );
      this.__suggest._$setList(this.__nodeList, this.__dataList);
    };
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'e88d1d3d987cb956bc96010a864bfb7a',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fe86216ed59e3103a56c42c850d389f0',
  '2251224ef4bde318c45429fafdfcdd19',
);
