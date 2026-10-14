EDU(
  '726a7dcda1df09970835f707b7b82c44',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    var d = o._$pushCSSText(
      '        .#<uispace> {width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:101;}        .#<uispace>.f-pop{background-color:rgba(0,0,0,0);width: 192px;height: auto;bottom:193px;right: 0;left: initial;top: initial;}        .#<uispace>.f-pop.f-pop-left{left:0;}        .#<uispace> .insetCt{overflow:auto;background: #fff;padding: 20px 30px 80px;box-sizing: border-box;width: 77%;height: 77%;position: relative;margin: 0 auto;margin-top: 7%;border-radius: 8px;}        .#<uispace> .u-questionItem{border:none;padding-top:0;}        .#<uispace> .submit,.#<uispace> .cont{position:absolute;bottom:20%;left:14%;z-index:5}        ',
    );
    var l = o._$addHtmlTemplate(
      '<div class="f-af" id="j-anchorContainer">    \t\t<div class="insetCt j-insetCt"></div>    \t\t<a class="u-btn u-btn-default submit j-submit">${lang.KEY_LEARN_SUBMIT}</a>    \t\t<a class="u-btn u-btn-default cont j-continue">${lang.KEY_LEARN_CONTINUE_STUDY}</a>       </div>',
    );
    s._$$InsetVideoAnchorUI = NEJ.C();
    c = s._$$InsetVideoAnchorUI._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(l, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__insetCtNode = o._$getByClassName(this.__body, 'j-insetCt')[0];
      this.__submitBtn = o._$getByClassName(this.__body, 'j-submit')[0];
      this.__continueBtn = o._$getByClassName(this.__body, 'j-continue')[0];
      a._$addEvent(this.__submitBtn, 'click', this.__showAnsOrAnalysis._$bind(this, !1));
      a._$addEvent(
        this.__continueBtn,
        'click',
        function () {
          this._$dispatchEvent('onReturnLearn');
        }._$bind(this),
      );
    };
    c.__showAnsOrAnalysis = function (n) {
      var i = { parent: this.__insetCtNode, recordDto: null, mode: null, noScore: !0 };
      var o =
        this.__questionUI && this.__questionUI._$getAnswerDto()
          ? [this.__questionUI._$getAnswerDto()]
          : null;
      var a = s._$convertPaperQustionObj([this.__questionVo], o);
      i.recordDto = a['_' + this.__questionVo.id];
      if (n) {
        s._$showNode(this.__submitBtn);
        s._$hiddenNode(this.__continueBtn);
        i.mode = 0;
      } else {
        if (!s._$isUserLogin()) {
          s._$$LoginDialog._$showLogin({ from: 'learn' });
          return;
        } else if (0 == t.isEnroll) {
          this.__attendCourseModal = new e({ data: { discusFlag: !1 } });
          return;
        }
        s._$hiddenNode(this.__submitBtn);
        s._$showNode(this.__continueBtn);
        i.mode = 1;
      }
      this.__clearQuestionUI();
      i.onReturnRichInfo = function () {
        this._$dispatchEvent('onReturnRichInfo');
      }._$bind(this);
      i.onReturnLearn = function () {
        this._$dispatchEvent('onReturnLearn');
      }._$bind(this);
      this.__questionUI = s._$$QuestionItem._$allocate(i);
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__questionVo = e.questionVo;
      this.__showAnsOrAnalysis(!0);
    };
    c.__clearQuestionUI = function () {
      if (this.__questionUI) this.__questionUI = s._$$QuestionItem._$recycle(this.__questionUI);
    };
    c.__destroy = function () {
      this.__clearQuestionUI();
      this.__supDestroy();
    };
  },
  '1c23b43dfd9c054559909485b4169fa4',
  '69e1c387d1f075b36fd909b21836f8b2',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '342ad7ae4eea50c3cad860686650a915',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
