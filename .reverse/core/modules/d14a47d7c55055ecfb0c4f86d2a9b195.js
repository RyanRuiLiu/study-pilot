EDU(
  'd14a47d7c55055ecfb0c4f86d2a9b195',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      c;
    var d = i._$addHtmlTemplate(
      '            <div class="ctn">                <img src="" class="j-pic f-fl" width="125"/>                <div class="f-fl tip">用微信扫描二维码<br>分享至好友和朋友圈</div>            </div>        ',
    );
    s._$$QRCodeDialog = NEJ.C();
    c = s._$$QRCodeDialog._$extend(s._$$Window, !0);
    s._$$QRCodeDialog._$showDialog = function (e) {
      var t = s._$$QRCodeDialog._$allocate(e);
      t._$show();
    };
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(i._$getHtmlTemplate(d));
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__pic = i._$getByClassName(this.__body, 'j-pic')[0];
    };
    c.__destroy = function () {
      this.__supDestroy();
    };
    c.__reset = function (e) {
      e.title = ' ';
      e.clazz = 'm-QRCodeDialog';
      this.__supReset(e);
      this.__pic.src = e.pic;
    };
  },
  'ddff3fe6a4233d567887a1921f3f1668',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
