EDU(
  '19803d3da600e0ad4f0fa1485fb92e5f',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = t.C(),
      p = h.extend(n);
    h.NAME = 'videoMoreMenuMobileComponent';
    p._init = function (e, t) {
      this.__super(e, t);
      ((this._cVideoInfo = { quality: {}, line: {}, rate: 1 }), (this._lineMap = {}));
      this._bodyNode = i._$getByClassName(this._rootNode, 'j-moreMenu')[0];
      this._partSpeed = i._$getByClassName(this._bodyNode, 'j-partSpeed')[0];
      this._partLine = i._$getByClassName(this._bodyNode, 'j-partLine')[0];
      this._partLineBox = i._$getByClassName(this._bodyNode, 'j-partLineBox');
      this._partQuality = i._$getByClassName(this._bodyNode, 'j-partQuality')[0];
      if (!c.supportRateChange()) i._$remove(this._partSpeed);
      if (!this._config.showCdnSwitch) {
        i._$addClassName(this._partLineBox[0], 'f-dn');
        i._$addClassName(this._partLineBox[1], 'f-dn');
      }
      this._initEvent();
      return this;
    };
    p._getTpl = function () {
      return e;
    };
    p.listNotificationInterests = function () {
      return [
        r.VIEW_MORE_MENU,
        r.MOVIEDATA_READY,
        r.MAINVIDEO_RATE_CHANGE,
        r.MAINVIDEO_QUALITY_CHANGE,
        r.MOVIEDATA_CURRENT_CDN_CHANGE,
      ];
    };
    p.handleNotification = function (e) {
      var t = e.getBody();
      this.__super(e);
      switch (e.getName()) {
        case r.VIEW_MORE_MENU:
          this._toggleMoreMenu(t);
          break;
        case r.MOVIEDATA_READY:
          this._initMoreMenu(t);
          break;
        case r.MAINVIDEO_RATE_CHANGE:
          this._changeRate(t);
          break;
        case r.MOVIEDATA_CURRENT_CDN_CHANGE:
          this._changeLine(t);
          break;
        case r.MAINVIDEO_QUALITY_CHANGE:
          this._changeQuality(t);
      }
    };
    p._toggleMoreMenu = function (e) {
      this.sendNotification(r.VIEW_MORE_MENU_CHANGE);
      if (!i._$hasClassName(this._bodyNode, 'f-dn')) i._$addClassName(this._bodyNode, 'f-dn');
      else i._$delClassName(this._bodyNode, 'f-dn');
    };
    p._initMoreMenu = function (e) {
      var t = e.movieItemList.length,
        n = e.cdnSwitchData && e.cdnSwitchData.length,
        i = '';
      if (t > 0) {
        for (var o = 0; o < t; o++)
          i +=
            '<li class="' +
            (0 == o ? 'active' : '') +
            '" data-type="quality" data-quality="' +
            e.movieItemList[o].quality +
            '" data-qualityName="' +
            e.movieItemList[o].qualityName +
            '">' +
            e.movieItemList[o].qualityName +
            '</li>';
        this._partQuality.innerHTML = i;
        i = '';
      }
      if (n) {
        for (var a = 0; a < e.cdnSwitchData.length; a++) {
          this._lineMap[e.cdnSwitchData[a].isp] = e.cdnSwitchData[a].ispName;
          i +=
            '<li class="' +
            (0 == a ? 'active' : '') +
            '" data-type="line" data-line="' +
            e.cdnSwitchData[a].isp +
            '" data-lineName="' +
            e.cdnSwitchData[a].ispName +
            '">' +
            e.cdnSwitchData[a].ispName +
            '</li>';
        }
        this._partLine.innerHTML = i;
        i = '';
      }
      this._cVideoInfo.quality.name = e.currentMovieItem.qualityName;
      this._cVideoInfo.quality.quality = e.currentMovieItem.quality;
      this._cVideoInfo.line.isp = e.cdnSwitch;
      if ('' == this._cVideoInfo.line.isp) this._cVideoInfo.line.ispName = '默认';
      else this._cVideoInfo.line.ispName = this._lineMap[this._cVideoInfo.line.isp];
    };
    p._changeRate = function (e) {
      var t = i._$getChildren(this._partSpeed),
        n = null;
      a._$forEach(t, function (t, o) {
        if (i._$attr(t, 'data-rate') == e) n = t;
        i._$delClassName(t, 'active');
      });
      i._$addClassName(n, 'active');
      this._cVideoInfo.rate = e;
    };
    p._changeLine = function (e) {
      var t = i._$getChildren(this._partLine),
        n = null;
      a._$forEach(t, function (t, o) {
        if (i._$attr(t, 'data-line') == e.cdnSwitch.newData.isp) n = t;
        i._$delClassName(t, 'active');
      });
      i._$addClassName(n, 'active');
    };
    p._changeQuality = function (e) {
      var t = i._$getChildren(this._partQuality),
        n = null;
      a._$forEach(t, function (t, o) {
        if (i._$attr(t, 'data-quality') == e.quality) n = t;
        i._$delClassName(t, 'active');
      });
      i._$addClassName(n, 'active');
      this._cVideoInfo.quality.name = e.qualityName;
      this._cVideoInfo.quality.quality = e.quality;
    };
    p._initEvent = function () {
      if (window.Hammer) {
        var e = new Hammer(this._bodyNode);
        e.on('tap', this._handlerEvent._$bind(this));
      } else o._$addEvent(this._bodyNode, 'click', this._handlerEvent._$bind(this));
    };
    p._handlerEvent = function (e) {
      var t = this;
      var n = o._$getElement(e, function (e) {
        return e.tagName.toLowerCase();
      });
      var a = i._$attr(n, 'data-type'),
        s = {},
        c = {};
      if ('rate' == a) {
        var d = Number(i._$attr(n, 'data-rate'));
        if (t._cVideoInfo.rate == d) return;
        t.sendNotification(r.VIEW_RATE, d);
      }
      if ('quality' == a) {
        var l = Number(i._$attr(n, 'data-quality'));
        var u = i._$attr(n, 'data-qualityName');
        if (t._cVideoInfo.quality.quality && t._cVideoInfo.quality.quality == l) return;
        s = { name: u, quality: l };
        c = { name: t._cVideoInfo.quality.name, quality: t._cVideoInfo.quality.quality };
        t.sendNotification(r.VIEW_QUALITY, { oldData: c, newData: s });
      }
      if ('line' == a) {
        s = { isp: i._$attr(n, 'data-line'), ispName: i._$attr(n, 'data-lineName') };
        c = { isp: t._cVideoInfo.line.isp, ispName: t._cVideoInfo.line.ispName };
        t.sendNotification(r.VIEW_CDN, { oldData: c, newData: s });
      }
      i._$addClassName(t._bodyNode, 'f-dn');
      t.sendNotification(r.VIEW_MORE_MENU_CHANGE);
    };
    return h;
  },
  '45ce997cf8a053e342478a281341f5da',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
);
