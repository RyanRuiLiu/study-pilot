EDU(
  'be836b3e4eb69c3616f9cc097e503955',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      s = NEJ.P('nej.u'),
      c = NEJ.P('edu.m'),
      d = NEJ.P('edu.u'),
      l,
      u = a._$addHtmlTemplate(
        '            <div class="u-share f-cb">                <div class="share-item">                    <a id="share-weixin" class="weixin f-fl f-fc6 solo f-icon u-icon-weixin f-pr" title="分享到微信" rel="weixin">                    <div class="cnt f-f0 f-pa f-dn">                        <img src="" class="j-pic" width="125"/>                        <div class="tip">用微信扫描二维码<br>分享至好友和朋友圈</div>                        <div class="tipBg f-pa"></div>                        <div class="tipTp f-pa"></div>                    </div>                    </a>                    <div class="share-item-text">                        微信                    </div>                </div>                <div class="share-item">                    <a id="share-sina" class="solo f-fl f-fc6 sina f-icon u-icon-weibo" title="分享到新浪微博" rel="sina"></a>                    <div class="share-item-text">                    微博                    </div>                </div>                <div class="share-item">                    <a id="share-qzone" class="solo f-fl f-fc6 qzone f-icon u-icon-qq" title="分享到QQ空间" rel="qzone"></a>                    <div class="share-item-text">                    QQ                    </div>                </div>                <a id="share-renren"class="solo f-fl f-fc6 renren f-icon u-icon-renren" title="分享到人人" rel="renren"></a>            </div>',
      );
    d._$$ShareUI = NEJ.C();
    l = d._$$ShareUI._$extend(d._$$UIBase, !0);
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(a._$getHtmlTemplate(u));
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__shareItems = a._$getByClassName(this.__body, 'solo');
      this.__shareID = {};
      this.__shareID.name = ' (分享自@云课堂)';
      this.__shareID.netease = 'HrJOJ17S62E4ipIa';
      this.__shareID.sina = {};
      this.__shareID.sina.id = '3024282805';
      this.__shareID.sina.ralateUid = '';
      this.__shareID.renren = '';
      this.__shareID.kaixin = {};
      this.__shareID.kaixin.starid = '0';
      this.__shareID.kaixin.aid = '0';
      this.__shareID.douban = '';
      var e = [];
      e[0] = 'height=505,width=615,top=' + (screen.height - 280) / 2;
      e[1] = 'left=' + (screen.width - 550) / 2;
      e[2] = 'toolbar=no, menubar=no, scrollbars=no,';
      e[2] += 'resizable=yes,location=no, status=no';
      this.__window = e.join(',');
      this.__weixinPic = a._$getByClassName(this.__body, 'j-pic')[0];
    };
    l.__bindEvent = function (e) {
      var t;
      t = e.getAttribute('rel');
      this.__doInitDomEvent([[e, 'click', this.__onClick._$bind(this, t)]]);
    };
    l.__onClick = function (e, t) {
      this._$dispatchEvent('clickShare');
      switch (e) {
        case 'sina':
          this.__shareSina();
          break;
        case 'renren':
          this.__shareRenren();
          break;
        case 'qzone':
          this.__shareQzone();
          break;
        case 'douban':
          this.__shareDouban();
          break;
        case 'weixin':
      }
      d._$trackEvent('share', e, this.__from + ':' + this.__url);
    };
    l.__shareQzone = function (e) {
      var t = {
        url: this.__url,
        title: this.__topic,
        pics: this.__pic,
        summary: this.__description,
      };
      var n = [];
      for (var i in t) n.push(i + '=' + encodeURIComponent(t[i] || ''));
      var o = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + n.join('&');
      var a = document.getElementById('share-qzone');
      a.setAttribute('href', o);
      a.setAttribute('target', '_blank');
      a.click();
    };
    l.__shareSina = function () {
      var e = {
        url: this.__url,
        appkey: this.__shareID.sina.id,
        title: this.__title,
        pic: this.__pic,
        ralateUid: this.__shareID.sina.ralateUid,
        language: 'zh_cn',
      };
      var t = [];
      for (var n in e) t.push(n + '=' + encodeURIComponent(e[n] || ''));
      var i = '//service.weibo.com/share/share.php?' + t.join('&');
      var o = document.getElementById('share-sina');
      o.setAttribute('href', i);
      o.setAttribute('target', '_blank');
      o.click();
    };
    l.__shareRenren = function () {
      var e = {
        api_key: this.__shareID.renren,
        resourceUrl: '',
        srcUrl: this.__url,
        pic: this.__pic,
        title: this.__topic,
        description: this.__description,
      };
      var t = location.href.indexOf('#');
      var n = t == -1 ? location.href : location.href.substr(0, t);
      var i = '';
      var o = function (e) {
        e = e || {};
        e.api_key = e.api_key || '';
        e.resourceUrl = e.resourceUrl || n;
        e.title = e.title || '';
        e.pic = e.pic || '';
        e.description = e.description || '';
        if (n == e.resourceUrl) e.images = e.images || i;
        e.charset = e.charset || '';
        return e;
      };
      var a = '//widget.renren.com/dialog/share';
      var r = o(e);
      var s = [];
      for (var c in r) if (r[c]) s.push(c + '=' + encodeURIComponent(r[c]));
      var l = a + '?' + s.join('&'),
        u = d._$isIE ? 2048 : 4100,
        _ = 'width=700,height=650,left=0,top=0,resizable=yes,scrollbars=1';
      var f = document.getElementById('share-renren');
      f.setAttribute('href', l);
      f.setAttribute('target', '_blank');
      f.click();
    };
    l.__genQrCode = function (t) {
      var n = document.createElement('div');
      new e(n, { text: t, height: 325, width: 325, correctLevel: 3 });
      var i = n.querySelector('canvas').toDataURL('image/jpeg');
      return i;
    };
    l.__reset = function (e) {
      this.__supReset(e);
      s._$forEach(this.__shareItems, this.__bindEvent._$bind(this));
      this.__title = e.title || '';
      this.__topic = e.topic || '';
      this.__description = e.description || '';
      this.__pic = e.pic || '';
      this.__url = e.url || n.location.href;
      this.__url = this.__url.replace(/(^\/\/)/, window.location.protocol + '$1');
      this.__type = e.type || 0;
      if (e.weixinQRParams) this.__weixinQR = this.__genQrCode(e.weixinQRParams);
      if (e.weixinQRUrl) this.__weixinQR = e.weixinQRUrl;
      d._$toggleNodeDisplay(this.__shareItems[3], !this.__weixinQR);
      d._$toggleNodeDisplay(this.__shareItems[0], !!this.__weixinQR);
      if (this.__weixinQR) this.__weixinPic.src = this.__weixinQR;
      a._$delClassName(this.__body, 'u-share2');
      if (1 == this.__type) a._$addClassName(this.__body, 'u-share2');
      this.__from = e.from || '';
    };
    l._$showAll = function () {
      d._$showNode(this.__shareItems[0]);
      d._$showNode(this.__shareItems[3]);
    };
    l.__destroy = function () {
      this.__supDestroy();
    };
    return d._$$ShareUI;
  },
  '754689c7f068e68312a614dcc026b5ee',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  'd14a47d7c55055ecfb0c4f86d2a9b195',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
