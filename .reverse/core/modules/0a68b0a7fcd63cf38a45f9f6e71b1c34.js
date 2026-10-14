EDU(
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  function () {
    var e = NEJ.O,
      t = window,
      n = NEJ.P('nej.e'),
      i = NEJ.P('nej.v'),
      o = NEJ.P('edu.d'),
      a = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      s;
    var c = n._$pushCSSText(
      '        .#<uispace> {padding:5px 0 5px 15px;font-size:12px;line-height:16px;}        .#<uispace> .warningbox{color:#cc3333;}        .#<uispace> .warningbox .warning{float:left;line-height:22px;}        .#<uispace> .warningbox .wrong{float:left;background: url(' +
        t.imageUrlMap.ui_sprite +
        ') no-repeat -40px -156px;height:20px;width:20px;}        .#<uispace> .warningbox .warn{float:left;background: url(' +
        t.imageUrlMap.ui_sprite +
        ') no-repeat 0 -156px;height:20px;width:20px;}        .#<uispace> .warningbox .right{float:left;background: url(' +
        t.imageUrlMap.ui_sprite +
        ') no-repeat -20px -156px;height:20px;width:20px;}        .#<uispace> .warningbox .normal{float:left;background: url(' +
        t.imageUrlMap.ui_sprite +
        ') no-repeat -62px -156px;height:20px;width:20px;}        .#<uispace> .warningbox .righttxt{color:#666;}        .#<uispace> .loadingbox{color:#999;}        .#<uispace> .loadingbox .loading{float:left;line-height:22px;}        .#<uispace> .loadingbox .icon{float:left;background: url(' +
        t.imageUrlMap.loading_circle_gif +
        ') no-repeat 0 0;height:16px;width:20px;}        ',
    );
    var d = n._$addNodeTemplate(
      '<div class="m-feedbackinfo">       \t  <div class="warningbox j-warningbox f-cb"><span class="right j-warningicon"></span><span class="warning j-warning"></span></div>       \t  <div class="loadingbox j-loadingbox f-cb"><span class="icon"></span><span class="loading j-loading"></span></div>       </div>',
    );
    r._$$FeedBackUI = NEJ.C();
    s = r._$$FeedBackUI._$extend(r._$$UIBase, !0);
    s.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    s.__initNode = function () {
      this.__supInitNode();
      this.__infoWarning = n._$getByClassName(this.__body, 'j-warning')[0];
      this.__infoWarningIcon = n._$getByClassName(this.__body, 'j-warningicon')[0];
      this.__infoWarningBox = n._$getByClassName(this.__body, 'j-warningbox')[0];
      this.__infoLoading = n._$getByClassName(this.__body, 'j-loading')[0];
      this.__infoLoadingBox = n._$getByClassName(this.__body, 'j-loadingbox')[0];
    };
    s._$hideFeedback = function () {
      r._$hiddenNode(this.__body);
    };
    s.__showTips = function (e, t) {
      r._$showNode(this.__body);
      r._$showNode(this.__infoWarningBox);
      r._$hiddenNode(this.__infoLoadingBox);
      n._$delClassName(this.__infoWarningIcon, 'right wrong warn normal');
      n._$addClassName(this.__infoWarningIcon, t);
      n._$delClassName(this.__infoWarning, 'righttxt wrongtxt warntxt normaltxt');
      n._$addClassName(this.__infoWarning, t + 'txt');
      this.__infoWarning.innerHTML = e || '';
    };
    s.__reset = function (e) {
      this.__supReset(e);
      this.__offsetHeight = e.offsetHeight || 200;
    };
    s._$showRightTips = function (e) {
      this.__showTips(e, 'right');
    };
    s._$showErrorTips = function (e, i) {
      this.__showTips(e, 'wrong');
      if (!i) t.scrollTo(0, n._$offset(this.__body).y - this.__offsetHeight);
    };
    s._$showWarnTips = function (e, i) {
      this.__showTips(e, 'warn');
      if (!i) t.scrollTo(0, n._$offset(this.__body).y - this.__offsetHeight);
    };
    s._$showNormalTips = function (e) {
      this.__showTips(e, 'normal');
    };
    s._$showLoadingTips = function (e) {
      r._$showNode(this.__body);
      r._$showNode(this.__infoLoadingBox);
      r._$hiddenNode(this.__infoWarningBox);
      this.__infoLoading.innerText = e || '';
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
