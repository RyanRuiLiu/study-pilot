EDU(
  'a15ec49bf0e436d5537ba8a48da8ff80',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = t.C(),
      h = f.extend(n);
    f.NAME = 'videoControlMobileComponent';
    h._init = function (e, t) {
      this.__super(e, t);
      this._isDragging = !1;
      this._timmer = null;
      this._preTime = null;
      this._cluPointList = null;
      this._duration = 0;
      this._start = 0;
      this._bodyNode = i._$getByClassName(this._rootNode, 'j-mControlwrap')[0];
      this._processBarNode = i._$getByClassName(this._bodyNode, 'j-mProgressbar')[0];
      this._dragItem = i._$getByClassName(this._bodyNode, 'j-mDragitem')[0];
      this._timebar = i._$getByClassName(this._bodyNode, 'j-mTimebar')[0];
      this._bufferbar = i._$getByClassName(this._bodyNode, 'j-mBufferbar')[0];
      this._anchorNode = i._$getByClassName(this._bodyNode, 'j-mAnchor')[0];
      this._controlBarNode = i._$getByClassName(this._bodyNode, 'j-mControlbar')[0];
      this._pausePlayBtnNode = i._$getByClassName(this._bodyNode, 'j-pausePlayBtn')[0];
      this._nowTimeNode = i._$getByClassName(this._bodyNode, 'j-nowTime')[0];
      this._allDurationNode = i._$getByClassName(this._bodyNode, 'j-allDuration')[0];
      this._moreBtnNode = i._$getByClassName(this._bodyNode, 'j-moreBtn')[0];
      this._fullScreenBtnNode = i._$getByClassName(this._bodyNode, 'j-fullScreenBtn')[0];
      this._controlbarCoverNode = i._$getByClassName(this._bodyNode, 'j-controlbarCover')[0];
      this._initEvent();
      this._controlBarAutoDisplay();
      return this;
    };
    h._getTpl = function () {
      return e;
    };
    h.listNotificationInterests = function () {
      return [
        a.MOVIEDATA_READY,
        a.MAINVIDEO_TIME,
        a.MAINVIDEO_META,
        a.MAINVIDEO_STATE,
        a.MAINVIDEO_BUFFER,
        a.BOX_FULLSCREEN_CHANGE,
        a.VIEW_MORE_MENU_CHANGE,
        a.VIEW_PREAD_START,
        a.VIEW_PREAD_END,
      ];
    };
    h.handleNotification = function (e) {
      var t = e.getBody();
      this.__super(e);
      switch (e.getName()) {
        case a.MOVIEDATA_READY:
          this._resetStartTime(t);
          this._cluPointList = t.cluPointList || [];
          break;
        case a.MAINVIDEO_META:
          this._updateVideoTimeline(t, !0);
          this._initVideoPlayTime(t);
          this._initAnchorPoint(t);
          break;
        case a.MAINVIDEO_STATE:
          this._videoStateHandler(t);
          break;
        case a.MAINVIDEO_BUFFER:
          this._updateBufferTimeline(t);
          break;
        case a.MAINVIDEO_TIME:
          this._updateVideoTimeline(t);
          this._updateVideoPlayTime(t);
          this._triggerAnchor(t);
          break;
        case a.BOX_FULLSCREEN_CHANGE:
          this._toggleFullscreen(t);
          break;
        case a.VIEW_MORE_MENU_CHANGE:
          this._toggleMoreMenuBtn(t);
          break;
        case a.VIEW_PREAD_START:
          this._disabledControlBar(t);
          break;
        case a.VIEW_PREAD_END:
          this._enabledControlBar(t);
      }
    };
    h._resetStartTime = function (e) {
      this._start = e.start;
    };
    h._updateVideoTimeline = function (e, t) {
      function n() {
        if (d <= c / 2) return 0;
        else if (d >= s - c / 2) return s - c;
        else return d - c / 2;
      }
      function o() {
        if (d <= 0) return 0;
        else if (d >= s) return s;
        else return d;
      }
      var a = e.currentTime,
        r = e.duration,
        s = this._processBarNode.offsetWidth,
        c = this._dragItem.offsetWidth,
        d = 0;
      if (t) {
        d = (this._start / e.duration) * s;
        this._duration = e.duration;
      } else d = (a / r) * s;
      if (!this._isDragging) {
        i._$style(this._dragItem, { left: n() + 'px' });
        i._$style(this._timebar, { width: o() + 'px' });
      }
    };
    h._initAnchorPoint = function (e) {
      function t(t) {
        if (!t) return 0;
        else return (t / e.duration) * i._processBarNode.offsetWidth;
      }
      var n = '',
        i = this;
      for (var o = 0; o < this._cluPointList.length; o++)
        n += '<div class="anchor" style="left:' + t(this._cluPointList[o].time) + 'px;"></div>';
      this._anchorNode.innerHTML = n;
    };
    h._updateBufferTimeline = function (e) {
      var t = this._processBarNode.offsetWidth * e.bufferPercent,
        n = this._bufferbar.offsetWidth;
      if (!(t < n)) {
        i._$style(this._bufferbar, { width: t + 'px' });
        n = t;
      }
    };
    h._videoStateHandler = function (e) {
      this._togglePlayState(e);
    };
    h._initVideoPlayTime = function (e) {
      this._allDurationNode.innerHTML = s.formatVideoTime(e.duration);
    };
    h._updateVideoPlayTime = function (e) {
      this._nowTimeNode.innerHTML = s.formatVideoTime(e.currentTime);
    };
    h._togglePlayState = function (e) {
      if ('PLAYING' == e.newState) {
        if (i._$hasClassName(this._pausePlayBtnNode, 'active')) return;
        i._$addClassName(this._pausePlayBtnNode, 'active');
      } else if ('PAUSED' == e.newState) i._$delClassName(this._pausePlayBtnNode, 'active');
    };
    h._toggleFullscreen = function (e) {
      if (e) i._$addClassName(this._fullScreenBtnNode, 'active');
      else i._$delClassName(this._fullScreenBtnNode, 'active');
    };
    h._controlBarAutoDisplay = function () {
      var e = this;
      clearTimeout(this._timmer);
      this._timmer = setTimeout(function () {
        if (!i._$hasClassName(e._bodyNode, 'f-vh')) i._$addClassName(e._bodyNode, 'f-vh');
      }, 5e3);
    };
    h._toggleMoreMenuBtn = function (e) {
      if (i._$hasClassName(this._moreBtnNode, 'active'))
        i._$delClassName(this._moreBtnNode, 'active');
      else i._$addClassName(this._moreBtnNode, 'active');
    };
    h._disabledControlBar = function (e) {
      i._$delClassName(this._controlbarCoverNode, 'f-dn');
    };
    h._enabledControlBar = function (e) {
      i._$addClassName(this._controlbarCoverNode, 'f-dn');
    };
    h._triggerAnchor = function (e) {
      var t = !1;
      for (var n = 0; n < this._cluPointList.length; n++)
        if (this._cluPointList[n].time == e.currentTime) {
          t = !0;
          break;
        }
      if (t)
        if (this._preTime != e.currentTime)
          this.sendNotification(a.VIEW_ANCHOR, this._cluPointList[n]);
      this._preTime = e.currentTime;
    };
    h._initEvent = function () {
      function e(e) {
        if (e.center.x < 0) return 0;
        var t = c.offsetWidth;
        return Math.floor((e.center.x / t) * r._duration);
      }
      function t(e) {
        var t = c.offsetWidth;
        return Math.floor((s.offsetLeft / t) * r._duration);
      }
      function n(e) {
        var t = c.offsetWidth;
        var n = s.offsetWidth;
        if (e.center.x <= n / 2) return 0;
        else if (e.center.x >= t - n / 2) return t - n;
        else return e.center.x - n / 2;
      }
      var r = this,
        s = this._dragItem,
        c = this._processBarNode,
        d = this._timebar,
        l = { oldData: 0, newData: 0 },
        u = new Hammer(c),
        _ = new Hammer(s),
        f = new Hammer(this._pausePlayBtnNode),
        h = new Hammer(this._fullScreenBtnNode),
        p = new Hammer(this._bodyNode),
        m = new Hammer(this._rootNode),
        g = new Hammer(this._moreBtnNode);
      p.on(
        'tap',
        function (e) {
          e.srcEvent.cancelBubble = !0;
        },
        !1,
      );
      _.on('panstart pan', function (o) {
        if ('panstart' == o.type) l.oldData = t();
        if (o.isFinal) {
          l.newData = e(o);
          r.sendNotification(a.VIEW_SEEK, l);
        } else i._$style(s, { left: n(o) + 'px' });
      });
      u.on('tap', function (n) {
        if (o._$getElement(n) != r._dragItem) {
          l = { oldData: t(n), newData: e(n) };
          r.sendNotification(a.VIEW_SEEK, l);
        }
      });
      f.on('tap', function (e) {
        if (!i._$hasClassName(r._pausePlayBtnNode, 'active')) r.sendNotification(a.VIEW_PLAY);
        else r.sendNotification(a.VIEW_PAUSE);
      });
      h.on('tap', function (e) {
        r.sendNotification(a.VIEW_FULLSCREEN);
      });
      m.on('tap', function (e) {
        if (!e.srcEvent.cancelBubble)
          if (i._$hasClassName(r._bodyNode, 'f-vh')) {
            i._$delClassName(r._bodyNode, 'f-vh');
            r._controlBarAutoDisplay();
          } else {
            i._$addClassName(r._bodyNode, 'f-vh');
            clearTimeout(this._timmer);
          }
      });
      g.on('tap', function (e) {
        r.sendNotification(a.VIEW_MORE_MENU);
      });
    };
    return f;
  },
  '8040fb624497f5153a0b60033bb3c6fb',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
);
