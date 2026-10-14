EDU(
  '17f410b6bc803f6ece8136a3a17a1094',
  function (e, t, n) {
    var i = ' (分享自@云课堂)',
      o = '3024282805',
      a = '';
    var r = t.$extends({
      config: function () {
        n.extend(this, { settingKey: 'component-share-share-embedded' });
        n.extend(this.data, {});
        this.supr();
        n.extend(this.data, { model: 0, shareID: { name: i, sina: { id: o, ralateUid: a } } });
        var e = [];
        e[0] = 'height=505,width=615,top=' + (window.screen.height - 280) / 2;
        e[1] = 'left=' + (window.screen.width - 550) / 2;
        e[2] = 'toolbar=no, menubar=no, scrollbars=no,';
        e[2] += 'resizable=yes,location=no, status=no';
        this.data.window = e.join(',');
      },
      init: function () {
        this.supr();
        n.extend(this.data, {
          title: '分享title,请传参',
          topic: '分享topic,请传参',
          description: '分享description,请传参',
          pic: '分享图片,请传参',
          url: window.location.href,
          weixinQR: '',
        });
        if (!this.data.weixinQR) this.genWeiXinQR();
      },
      getShareUrl: function (e, t) {
        var n = /^.*?\?/;
        var i = { utm_source: '(' + t + ')', utm_medium: '(webshare)', utm_campaign: 'share' };
        var o = e.split('').reverse().join('').match(n);
        if (o) {
          var a = o[0];
          if (!/\#/.test(a)) {
            a = a.split('').reverse().join('').replace(/\?/g, '');
            e = e.replace(a, '').replace(/\?$/, '');
            a.split(/\&/).forEach(function (e) {
              e = e.split(/\=/);
              i[e[0]] = e[1];
            });
          }
        }
        e += '?';
        for (var r in i) if (i.hasOwnProperty(r)) e += '&' + r + '=' + i[r];
        return e.replace(/\?\&/g, '?');
      },
      shareSina: function () {
        var e = {
          url: this.getShareUrl(this.data.url, 'weibo'),
          appkey: this.data.shareID.sina.id,
          title: this.data.sinaTitle || this.data.title,
          pic: this.data.sinaPic || this.data.pic,
          ralateUid: this.data.shareID.sina.ralateUid,
          language: 'zh_cn',
        };
        var t = [];
        for (var n in e) t.push(n + '=' + encodeURIComponent(e[n] || ''));
        var i = '//service.weibo.com/share/share.php?' + t.join('&');
        window.open(i, '_blank', this.data.window);
        this.$emit('share', { type: 'weibo' });
      },
      onHoverWechatShare: function () {
        this.$emit('share', { type: 'wechat' });
      },
      shareQzone: function () {
        var e = {
          url: this.getShareUrl(this.data.url, 'qq'),
          title: this.data.qzoneTitle || this.data.title,
          pics: this.data.qzonePic || this.data.pic,
          summary: this.data.description,
        };
        var t = [];
        for (var n in e) t.push(n + '=' + encodeURIComponent(e[n] || ''));
        var i = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + t.join('&');
        window.open(i, 'Qzone', this.data.window);
        this.$emit('share', { type: 'qzone' });
      },
      genWeiXinQR: function () {
        var t = this.getShareUrl(this.data.url, 'weixin');
        var n = document.createElement('div');
        new e(n, { text: t, height: 325, width: 325, correctLevel: 3 });
        var i = n.querySelector('canvas').toDataURL('image/jpeg');
        this._resultShow({ url: i });
      },
      _addScriptTag: function (e) {
        var t = document.createElement('script');
        t.setAttribute('type', 'text/javascript');
        t.src = e;
        document.body.appendChild(t);
      },
      _resultShow: function (e) {
        var t = this;
        if (t && t.data && t.$refs && t.$refs.weixinImg) {
          t.data.weixinQR = e.url;
          t.$refs.weixinImg.src = t.data.weixinQR;
        }
      },
      destroy: function () {
        this.supr();
      },
    });
    return r;
  },
  '754689c7f068e68312a614dcc026b5ee',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
