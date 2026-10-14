EDU(
  '35c159d1128b972af3bbf7c5f61a2155',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    function h(e, t) {
      for (; t;)
        if (e == t || t.parentElement == e) return !0;
        else t = t.parentElement;
      return !1;
    }
    var p = t.C(),
      m = p.extend(n);
    p.NAME = 'videoControlLiveComponent';
    m._init = function (e, t) {
      this.__super(e, t);
      this.ban();
      this._state = 'PLAYING';
      this._movieData = null;
      this._volumeRecord = 1;
      this._hasVolumeInited = !1;
      this._isKeyEventActive = !0;
      this._controlbar = i._$getByClassName(this._rootNode, 'j-controlbar')[0];
      this._controlWrap = i._$getByClassName(this._rootNode, 'j-controlwrap')[0];
      this._bigplaybtn = i._$getByClassName(this._rootNode, 'j-bigplaybtn')[0];
      this._playbtn = i._$getByClassName(this._controlbar, 'j-playbtn')[0];
      this._pausebtn = i._$getByClassName(this._controlbar, 'j-pausebtn')[0];
      this._volumebtn = i._$getByClassName(this._controlbar, 'j-volumebtn')[0];
      this._volumebar = null;
      this._volumePopover = i._$getByClassName(this._controlbar, 'j-popover-volume')[0];
      this._fullscreen = i._$getByClassName(this._controlbar, 'j-fullscreen')[0];
      this._notfullscreen = i._$getByClassName(this._controlbar, 'j-notfullscreen')[0];
      this._qualityBtn = i._$getByClassName(this._controlbar, 'j-qualitybtn')[0];
      this._qualityBtnTxt = i._$getByClassName(this._controlbar, 'j-qualitybtn_text')[0];
      this._qualityPopover = null;
      this._cdnPopover = null;
      this._cdnBtn = i._$getByClassName(this._controlbar, 'j-cdnbtn')[0];
      this._initEvent();
      return this;
    };
    m._getTpl = function () {
      return e;
    };
    m.listNotificationInterests = function () {
      return [
        a.MOVIEDATA_READY,
        a.MAINVIDEO_TIME,
        a.MAINVIDEO_META,
        a.MAINVIDEO_STATE,
        a.MAINVIDEO_QUALITY_CHANGE,
        a.BOX_FULLSCREEN_CHANGE,
        a.MAINVIDEO_VOLUME,
        a.VIEW_PREAD_START,
        a.VIEW_PREAD_END,
        a.MAINVIDEO_VOLUME_INCREASE,
        a.MAINVIDEO_VOLUME_DECREASE,
        a.MOVIEDATA_CURRENT_CDN_CHANGE,
        a.MOVIEDATA_ERROR,
        a.MAINVIDEO_ERROR,
      ];
    };
    m.handleNotification = function (e) {
      var t = e.getBody();
      this.__super(e);
      switch (e.getName()) {
        case a.MOVIEDATA_READY:
          this._handleMoviedataReady(t);
          break;
        case a.MAINVIDEO_META:
          this._handleMainvideoMeta(t);
          break;
        case a.MAINVIDEO_STATE:
          this._handleMainvideoState(t);
          break;
        case a.MAINVIDEO_QUALITY_CHANGE:
          this._handleMainvideoQualityChange(t);
          break;
        case a.MOVIEDATA_CURRENT_CDN_CHANGE:
          this._handleMoviedataCurrentCDNChange(t);
          break;
        case a.BOX_FULLSCREEN_CHANGE:
          this._handleBoxFullscreenChange(t);
          break;
        case a.MAINVIDEO_VOLUME:
          this._handleMainvideoVolume(t);
          break;
        case a.VIEW_PREAD_START:
          this._handleViewPreadStart(t);
          break;
        case a.VIEW_PREAD_END:
          this._handleViewPreadEnd(t);
          break;
        case a.MAINVIDEO_VOLUME_INCREASE:
          this._volumebar.setProgressPos(t);
          break;
        case a.MAINVIDEO_VOLUME_DECREASE:
          this._volumebar.setProgressPos(t);
          break;
        case a.MOVIEDATA_ERROR:
        case a.MAINVIDEO_ERROR:
          this._handleError(t);
      }
    };
    m._initEvent = function () {
      o._$addEvent(this._rootNode, 'mousedown', this._onRootNodeMousedown._$bind(this));
      o._$addEvent(document, 'mousedown', this._onDocumentMousedown._$bind(this));
      o._$addEvent(document, 'keydown', this._onDocumentKeydown._$bind(this));
      o._$addEvent(
        this._playbtn,
        'click',
        function () {
          if (!this._isBan) this.sendNotification(a.VIEW_PLAY);
        }._$bind(this),
      );
      o._$addEvent(
        this._bigplaybtn,
        'click',
        function () {
          if (!this._isBan) this.sendNotification(a.VIEW_PLAY);
        }._$bind(this),
      );
      o._$addEvent(
        this._pausebtn,
        'click',
        function () {
          if (!this._isBan) this.sendNotification(a.VIEW_PAUSE);
        }._$bind(this),
      );
      o._$addEvent(
        this._fullscreen,
        'click',
        function () {
          this.sendNotification(a.VIEW_FULLSCREEN);
        }._$bind(this),
      );
      o._$addEvent(
        this._notfullscreen,
        'click',
        function () {
          this.sendNotification(a.VIEW_FULLSCREEN);
        }._$bind(this),
      );
      o._$addEvent(this._volumebtn, 'click', this._onVolumeBtnClick._$bind(this));
    };
    m._handleMoviedataReady = function (e) {
      this._movieData = e;
      this._initControl(e);
      this._initAnimation();
    };
    m._handleViewPreadStart = function (e) {
      this.ban();
    };
    m._handleViewPreadEnd = function (e) {};
    m._handleMainvideoMeta = function (e) {
      this.unban();
    };
    m._handleError = function (e) {
      this.ban();
    };
    m._handleMainvideoState = function (e) {
      this._state = e.newState;
      if ('PAUSED' == e.newState) {
        i._$delClassName(this._playbtn, 'z-hide');
        i._$delClassName(this._pausebtn, 'z-show');
        i._$addClassName(this._bigplaybtn, 'z-show');
      } else if ('PLAYING' == e.newState) {
        i._$addClassName(this._playbtn, 'z-hide');
        i._$addClassName(this._pausebtn, 'z-show');
        i._$delClassName(this._bigplaybtn, 'z-show');
      }
    };
    m._handleMainvideoQualityChange = function (e) {
      this._qualityPopover &&
        this._qualityPopover.select(function (t) {
          if (t.value == e.qualityName) return !0;
        }, !1);
      this._qualityBtnTxt.innerHTML = e.qualityName;
    };
    m._handleMoviedataCurrentCDNChange = function (e) {
      this._initCdnList(e.lines, e.currentLine);
      this._cdnPopover &&
        this._cdnPopover.select(function (t) {
          if (t.value == e.currentLine.name) return !0;
        }, !1);
      this._initQualityList(e);
    };
    m._handleBoxFullscreenChange = function (e) {
      if (e) {
        i._$addClassName(this._fullscreen, 'z-hide');
        i._$addClassName(this._notfullscreen, 'z-show');
      } else {
        i._$delClassName(this._fullscreen, 'z-hide');
        i._$delClassName(this._notfullscreen, 'z-show');
      }
    };
    m._handleMainvideoVolume = function (e) {
      var t = this;
      if (!this._hasVolumeInited) {
        this._hasVolumeInited = !0;
        this._volumeRecord = e ? e : 1;
        this._volumebar = new d({
          isChangeInstantly: !0,
          klass: 'volumebar',
          type: 4,
          start: e,
          onMousemove: function (e) {
            e = (+e).toFixed(2);
            t.sendNotification(a.VIEW_VOLUME, e);
          },
          onMouseup: function (e) {
            e = (+e).toFixed(2);
            t.sendNotification(a.VIEW_VOLUME, e);
          },
          onChange: function (e) {
            e = (+e).toFixed(2);
            t.sendNotification(a.VIEW_VOLUME, e);
          },
        }).insertTo(this._volumePopover);
      } else this._volumebar.setProgressPos(e, !1);
      if (!Number(e)) i._$addClassName(t._volumebtn, 'z-close');
      else i._$delClassName(t._volumebtn, 'z-close');
    };
    m._onRootNodeMousedown = function (e) {
      e.stopPropagation();
      this._isKeyEventActive = !0;
    };
    m._onDocumentMousedown = function () {
      this._isKeyEventActive = !1;
    };
    m._onDocumentKeydown = function (e) {
      if (this._isKeyEventActive) {
        var t = this;
        var n = e.keyCode;
        if (!t._isBan) {
          o._$stopDefault(e);
          switch (n) {
            case 32:
              if ('PLAYING' == t._state) t.sendNotification(a.VIEW_PAUSE);
              else t.sendNotification(a.VIEW_PLAY);
              break;
            case 38:
              t.sendNotification(a.VIEW_VOLUME_INCREASE);
              break;
            case 40:
              t.sendNotification(a.VIEW_VOLUME_DECREASE);
          }
        }
      }
    };
    m._onVolumeBtnClick = function (e) {
      if (!h(this._volumePopover, o._$getElement(e)))
        if (this._volumebar.crtProgressPos) {
          this._volumeRecord = this._volumebar.crtProgressPos;
          this._volumebar.setProgressPos(0);
        } else this._volumebar.setProgressPos(this._volumeRecord);
    };
    m._initControl = function (e) {
      this._initQualityList(e);
      this._initCdnList(e.lines, e.currentLine);
    };
    m._initQualityList = function (e) {
      this._qualityPopover && this._qualityPopover.destroy();
      this._qualityBtnTxt.innerHTML = e.currentMovieItem.qualityName;
      if (1 != e.movieItemList.length) {
        i._$delClassName(this._qualityBtn, 'z-dis');
        var t = this,
          n = e.currentMovieItem,
          o = null,
          r = [];
        for (var s = 0; s < e.movieItemList.length; s++) {
          o = e.movieItemList[s];
          r[s] = {};
          if (o.quality == n.quality) r[s].selected = !0;
          r[s].value = o.qualityName;
          r[s].data = { quality: o.quality, name: o.qualityName };
        }
        this._qualityPopover = new c({
          dep: this._qualityBtn,
          klass: 'm-popover-quality',
          list: r,
          onSelect: function (e, n) {
            t.sendNotification(a.VIEW_QUALITY, { newData: e, oldData: n });
          },
        });
      } else i._$addClassName(this._qualityBtn, 'z-dis');
    };
    m._initCdnList = function (e, t) {
      this._cdnPopover && this._cdnPopover.destroy();
      if (!(e.length <= 1)) {
        i._$delClassName(this._cdnBtn, 'z-hide');
        var n = this,
          o = [],
          r = null;
        for (var s = 0; s < e.length; s++) {
          r = e[s];
          o.push({});
          o[s].value = r.name;
          o[s].data = r;
          if (t && r.type == t.type) o[s].selected = !0;
        }
        this._cdnPopover = new c({
          dep: this._cdnBtn,
          klass: 'm-popover-cdn' + (e.length <= 3 ? ' m-popover-cdn-one_column' : ''),
          list: o,
          onSelect: function (e, t) {
            n.sendNotification(a.VIEW_CDN, { newData: e, oldData: t });
          },
        });
      } else i._$addClassName(this._cdnBtn, 'z-hide');
    };
    m._initAnimation = function () {
      var e = this;
      var t = (function () {
        var t = -1;
        return function () {
          clearTimeout(t);
          i._$addClassName(e._controlWrap, 'z-show');
          e.sendNotification(a.VIDEO_CONTROL_SHOW);
          t = setTimeout(function () {
            i._$delClassName(e._controlWrap, 'z-show');
            e.sendNotification(a.VIDEO_CONTROL_HIDE);
          }, 5e3);
        };
      })();
      var n = function () {
        i._$delClassName(e._controlWrap, 'z-show');
        e.sendNotification(a.VIDEO_CONTROL_HIDE);
      };
      o._$addEvent(this._rootNode, 'mousemove', t);
      o._$addEvent(this._rootNode, 'mouseleave', n);
    };
    m.ban = function () {
      this._isBan = !0;
    };
    m.unban = function () {
      this._isBan = !1;
    };
    return p;
  },
  'f62511be1c71e9a9cebd0fb06938612c',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'f7155d88aabc058cab24982e3c3671cc',
  'd19848d97d669e1c3823c33c3dc4a6db',
);
