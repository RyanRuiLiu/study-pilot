EDU(
  'ab6af9f7e26b55b8c5a875bba5679347',
  function () {
    var e = (window.moocConfig || {}).lang || {};
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      c = NEJ.P('edu.cms'),
      d,
      l;
    var u = o._$addHtmlTemplate(
      '    <div class="m-dialog">\t<div class="content j-content f-cb">\t\t<div class="icon"></div>\t\t<div class="cnt"></div>\t\t</div>\t\t<div class="btn f-cb">\t\t<a hidefocus="true" class="u-btn u-btn-primary j-left"><span class="j-ok-txt">' +
        (e.KEY_LEARN_CONFIRM || '确定') +
        '</span></a>\t<a hidefocus="true" class="u-btn j-right"><span class="j-cancel-txt">' +
        (e.KEY_LEARN_CANCEL || '取消') +
        '</span></a>\t</div>\t</div>',
    );
    s._$$CommonDialog = NEJ.C();
    d = s._$$CommonDialog._$extend(s._$$Window, !0);
    s._$$CommonDialog._$showDialog = function (e) {
      var t = (window.moocConfig || {}).lang || {};
      if (l) l = s._$$CommonDialog._$recycle(l);
      l = s._$$CommonDialog._$allocate(e);
      l._$show();
      return l;
    };
    d.__destroy = function () {
      l = null;
      this._$dispatchEvent('destroy');
      this.__supDestroy();
    };
    d.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(o._$getHtmlTemplate(u));
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__content = o._$getChildren(o._$getByClassName(this.__body, 'j-content')[0]);
      this.__contentIcon = this.__content[0];
      this.__contentTxt = this.__content[1];
      this.__cancelBtn = o._$getByClassName(this.__body, 'j-right')[0];
      this.__okBtn = o._$getByClassName(this.__body, 'j-left')[0];
      this.__cancelTxt = o._$getByClassName(this.__body, 'j-cancel-txt')[0];
      this.__okTxt = o._$getByClassName(this.__body, 'j-ok-txt')[0];
      a._$addEvent(this.__cancelBtn, 'click', this.__cancelHandle._$bind(this));
      a._$addEvent(this.__okBtn, 'click', this.__okHandle._$bind(this));
      this.__charUtil = new r._$$CharasetUtil();
    };
    d.__cancelHandle = function () {
      if (this.__cancelFunc) this.__cancelFunc();
      this._$hide();
    };
    d.__okHandle = function () {
      if (this.__okFunc) this.__okFunc();
      this._$hide();
    };
    d.__reset = function (e) {
      var t = (window.moocConfig || {}).lang || {};
      e = e || n;
      e.mask = void 0 == e.modal ? !0 : !!e.modal;
      e.title = e.title || t.KEY_LEARN_PROMPT || '提示';
      e.clazz = 'u-window-pd' + (e.type ? ' u-hidetitle' : '') + ' ' + (e.customStyle || '');
      e.maskClickNotHidden = void 0 == e.maskClickNotHidden ? !0 : e.maskClickNotHidden;
      e.closeBtnHidden = e.closeBtnHidden || !1;
      this.__supReset(e);
      this.__focusNum = e.focusNum || 0;
      this.__okFunc = e.okFunc;
      this.__cancelFunc = e.cancelFunc;
      this.__okTip = e.okTip || t.KEY_LEARN_CONFIRM || '确定';
      this.__cancelTip = e.cancelTip || t.KEY_LEARN_CANCEL || '取消';
      this.__contentTxt.innerHTML =
        e.message || t.KEY_LEARN_INPUT_DIALOG_CONTENT || '请输入对话框内容';
      this.__okTxt.innerText = this.__okTip;
      this.__cancelTxt.innerText = this.__cancelTip;
      this.__dealWithBtn();
      o._$delClassName(this.__contentIcon, 'ic1 ic2 ic3');
      o._$addClassName(this.__contentIcon, 'ic' + (e.type || 3));
      if (!e.type) o._$addClassName(this.__contentTxt, 'cntnom');
      else o._$delClassName(this.__contentTxt, 'cntnom');
    };
    d.__dealWithBtn = function () {
      if (this.__cancelFunc) s._$showNode(this.__cancelBtn);
      else s._$hiddenNode(this.__cancelBtn);
      o._$delClassName(this.__cancelBtn, 'u-btn u-btn-primary');
      o._$delClassName(this.__okBtn, 'u-btn u-btn-primary');
      if (this.__focusNum) {
        o._$addClassName(this.__okBtn, 'u-btn');
        o._$addClassName(this.__cancelBtn, 'u-btn u-btn-primary');
        this.__cancelBtn.focus();
      } else {
        o._$addClassName(this.__okBtn, 'u-btn u-btn-primary');
        o._$addClassName(this.__cancelBtn, 'u-btn');
        this.__okBtn.focus();
      }
    };
    d._$hideBtns = function () {
      s._$hiddenNode(this.__cancelBtn);
      s._$hiddenNode(this.__okBtn);
    };
    c.showCommonDialog = s._$$CommonDialog._$showDialog;
  },
  'ddff3fe6a4233d567887a1921f3f1668',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
