EDU(
  '25a5b92a97c696ae56ad7f07fbc475dc',
  function () {
    var e = NEJ.O,
      t = window,
      n = NEJ.F,
      i = NEJ.P('nej.p'),
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      s;
    var c = o._$pushCSSText(
      '        .#<uispace>.u-appbanner{ display: none; border-bottom:1px solid #aaa; width:100%;}        .#<uispace>.u-appbanner .wrap{ padding:40px 40px; height:95px; min-width:880px; background:#84b706;}        .#<uispace>.u-appbanner .wrap .logo{ width:402px; height:95px;}        .#<uispace>.u-appbanner .wrap .lookbtn{ width:285px; height:95px; margin-right:25px;}        .#<uispace>.u-appbanner .wrap .dlbtn{ width:285px; height:95px;}        .#<uispace>.u-appbanner .wrap .close{ width:35px; height:35px; margin:27px 0 0 30px;}\t\t.#<uispace>.u-appbanner .tip{ display:none; min-width:880px; background:#07853a; padding:45px 40px; height:95px;}  \t\t.#<uispace>.u-appbanner .tip p{ width:740px; color:#fff; line-height:1.4; font-size:2.6em;; font-family:Hiragino Sans GB;}        .#<uispace>.u-appbanner .tip .jt{ width:106px; height:46px; margin-top:20px;}\t\t.#<uispace>.u-appbanner.pc{ display:none;}    \t.#<uispace>.u-appbanner.iphone{ display:block;}    \t.#<uispace>.u-appbanner.ipad{ display:block;}        .#<uispace>.u-appbanner.ipad .wrap{ padding:20px; height:66px;}        .#<uispace>.u-appbanner.ipad .wrap .logo{ width:229px; height:66px;}        .#<uispace>.u-appbanner.ipad .wrap .lookbtn{ width:139px; height:60px; margin-right:25px;}        .#<uispace>.u-appbanner.ipad .wrap .dlbtn{ width:139px; height:60px;}        .#<uispace>.u-appbanner.ipad .wrap .close{ width:30px; height:30px; margin:16px 0 0 35px;}        .#<uispace>.u-appbanner.ipad .tip{ padding:20px; height:66px;}        .#<uispace>.u-appbanner.ipad .tip p{ line-height:1.3;}        .#<uispace>.u-appbanner.ipad .tip .jt{ margin-top:10px;}    \t.#<uispace>.u-appbanner.android{ display:block;}    \t.#<uispace>.u-appbanner.android .wrap .lookbtn{ display:none;}        ',
    );
    var d = o._$addNodeTemplate(
      '<div class="u-appbanner j-appbanner">        \t<div class="wrap f-cb j-wrap">            \t<img class="logo f-fl" src="//edu-image.nosdn.127.net/6C21E8FAE2F95E8A964501AB5F920FC8.png?imageView&thumbnail=402y95&quality=100"/>            \t<a class="f-fr j-close">                \t<img class="close" src="//s.stu.126.net/res/images/ui/ui_appbanner_closebtn.png"/>            \t</a>            \t<a class="f-fr j-dl">                \t<img class="dlbtn" src="//edu-image.nosdn.127.net/C98738F71B5E662F0239FA9D59D88011.png?imageView&thumbnail=285y66&quality=95"/>            \t</a>        \t</div>        \t<div class="tip j-tip">            \t<p class="f-fl">请点击右上角按钮，选择“在Safari中打开”<br/>再点击页面中的下载或打开</p>            \t<img class="jt f-fr" src="//s.stu.126.net/res/images/ui/ui_appbanner_jt.png">        \t</div>    \t</div>',
    );
    r._$$AppBannerUI = NEJ.C();
    s = r._$$AppBannerUI._$extend(r._$$UIBase, !0);
    s.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    s.__initNode = function () {
      this.__supInitNode();
      this.__appBannerNode = this.__body;
      this.__close = o._$getByClassName(this.__appBannerNode, 'j-close')[0];
      this.__look = o._$getByClassName(this.__appBannerNode, 'j-look')[0];
      this.__dl = o._$getByClassName(this.__appBannerNode, 'j-dl')[0];
      this.__wrap = o._$getByClassName(this.__appBannerNode, 'j-wrap')[0];
      this.__tip = o._$getByClassName(this.__appBannerNode, 'j-tip')[0];
      a._$addEvent(
        this.__close,
        'click',
        function () {
          r._$hiddenNode(this.__appBannerNode);
        }._$bind(this),
      );
      a._$addEvent(
        this.__dl,
        'click',
        function () {
          var e = {};
          e.courseId = t.courseDto ? t.courseDto.id : '';
          e.termId = t.termDto ? t.termDto.id : '';
          e.from = 'mobileTopbar';
          r._$callAppDownload('fromCallApp', e);
        }._$bind(this),
      );
      a._$addEvent(
        this.__look,
        'click',
        function (e) {
          var n = document.createElement('iframe');
          n.setAttribute(
            'style',
            'display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;',
          );
          n.setAttribute('height', '0px');
          n.setAttribute('width', '0px');
          n.setAttribute('frameborder', '0');
          document.body.appendChild(n);
          n.src = this.__lookUrl;
          setTimeout(
            function () {
              t.location = this.__dlUrl;
            }._$bind(this),
            100,
          );
        }._$bind(this),
      );
      this.__dlUrl = '//www.icourse163.org/appDownload.htm?from=mobiletopbar';
    };
    s.__reset = function (e) {
      this.__supReset(e);
      var t = 'pc';
      if (r._$isMobile()) {
        if (i._$IS['android']) {
          this.__lookUrl = '';
          t = 'android';
        } else if (i._$IS['ipad']) {
          this.__lookUrl = 'wangyiyunketang://';
          t = 'ipad';
        } else {
          this.__lookUrl = 'yktiphone://';
          t = 'iphone';
        }
        o._$addClassName(this.__appBannerNode, t);
      }
    };
    s.__showWeixinTip = function () {
      r._$hiddenNode(this.__wrap);
      this.__tip.style.display = 'block';
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'f051aeae7bb889518ead30ef6e491df3',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
