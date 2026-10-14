EDU(
  '12b72d4a2615385d0ae005e51c1e7399',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p) {
    function m(e, t) {
      for (; t;)
        if (e == t || t.parentElement == e) return !0;
        else t = t.parentElement;
      return !1;
    }
    function g(e, t) {
      var n = null,
        i = 0;
      return function () {
        if (n) {
          i++;
          clearTimeout(n);
          n = setTimeout(function () {
            e.call(this, i);
            i = 0;
            n = null;
          }, t);
        } else {
          e.call(this, 1);
          n = setTimeout(function () {
            n = null;
          }, t);
        }
      };
    }
    var b = 'MOOC_CLOSE_ANCHOR';
    var v = 10;
    var E = t.C(),
      x = E.extend(n);
    E.NAME = 'videoControlComponent';
    x._init = function (e, t) {
      this.__super(e, t);
      console.log('videoConfig', e);
      var n = this;
      this.isPreading = !1;
      this._isBan = !1;
      this.ban();
      this._duration = 0;
      this._crtTime = 0;
      this._state = 'PLAYING';
      this._progressbar = null;
      this._hoverTime = null;
      this._movieData = null;
      this._volumeRecord = 1;
      this._isViewSeekBackwardOrForward = !1;
      this._hasVolumeInited = !1;
      this._isKeyEventActive = !0;
      this._bodyNode = i._$getByClassName(this._rootNode, 'j-controlwrap')[0];
      this._controlbar = i._$getByClassName(this._rootNode, 'j-controlbar')[0];
      this._controlWrap = i._$getByClassName(this._rootNode, 'j-controlwrap')[0];
      this._bigplaybtn = i._$getByClassName(this._rootNode, 'j-bigplaybtn')[0];
      this._autoplaynexttip = i._$getByClassName(this._rootNode, 'j-autoplaynexttip')[0];
      this._dragItem = null;
      this._currentTimeElem = i._$getByClassName(this._controlbar, 'j-current_time')[0];
      this._durationElem = i._$getByClassName(this._controlbar, 'j-duration')[0];
      this._segmentTitleElem = i._$getByClassName(this._controlbar, 'j-segment-title')[0];
      this._playbtn = i._$getByClassName(this._controlbar, 'j-playbtn')[0];
      this._pausebtn = i._$getByClassName(this._controlbar, 'j-pausebtn')[0];
      this._anchorbtn = i._$getByClassName(this._controlbar, 'j-anchorbtn')[0];
      this._volumebtn = i._$getByClassName(this._controlbar, 'j-volumebtn')[0];
      this._volumebar = null;
      this._volumePopover = i._$getByClassName(this._controlbar, 'j-popover-volume')[0];
      this._rateBtn = i._$getByClassName(this._controlbar, 'j-ratebtn')[0];
      this._ratePopover = null;
      this._rateBtnTxt = i._$getByClassName(this._controlbar, 'j-ratebtn_text')[0];
      this._captionBtn = i._$getByClassName(this._controlbar, 'j-captionbtn')[0];
      this._captionPopover = null;
      this._qualityBtn = i._$getByClassName(this._controlbar, 'j-qualitybtn')[0];
      this._qualityBtnTxt = i._$getByClassName(this._controlbar, 'j-qualitybtn_text')[0];
      this._qualityPopover = null;
      this._fullscreen = i._$getByClassName(this._controlbar, 'j-fullscreen')[0];
      this._notfullscreen = i._$getByClassName(this._controlbar, 'j-notfullscreen')[0];
      this._cdnPopover = null;
      this._cdnBtn = i._$getByClassName(this._controlbar, 'j-cdnbtn')[0];
      this._viewBack = g(function (e) {
        n.sendNotification(a.VIEW_SEEK, n._crtTime - v * e);
        n._isViewSeekBackwardOrForward = !1;
      }, 300);
      this._viewForward = g(function (e) {
        n.sendNotification(a.VIEW_SEEK, n._crtTime + v * e);
        n._isViewSeekBackwardOrForward = !1;
      }, 300);
      this._viewSeek = function (e) {
        var t = n._progressbar.crtProgressPos,
          i = v / n._duration;
        n._isViewSeekBackwardOrForward = !0;
        n._progressbar.setProgressPos('back' == e ? t - i : t + i);
        if ('back' == e) n._viewBack();
        else n._viewForward();
      };
      this._initEvent();
      return this;
    };
    x._getTpl = function () {
      return e;
    };
    x.listNotificationInterests = function () {
      return [
        a.MOVIEDATA_READY,
        a.MAINVIDEO_START_LOAD,
        a.MAINVIDEO_TIME,
        a.MAINVIDEO_META,
        a.MAINVIDEO_STATE,
        a.MAINVIDEO_BUFFER,
        a.MAINVIDEO_RATE_CHANGE,
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
    x.handleNotification = function (e) {
      var t = e.getBody();
      this.__super(e);
      switch (e.getName()) {
        case a.MOVIEDATA_READY:
          this._handleMoviedataReady(t);
          break;
        case a.MAINVIDEO_START_LOAD:
          this._handleMainvideoStartLoad(t);
          break;
        case a.MAINVIDEO_META:
          this._handleMainvideoMeta(t);
          break;
        case a.MAINVIDEO_STATE:
          this._handleMainvideoState(t);
          break;
        case a.MAINVIDEO_BUFFER:
          this._handleMainvideoBuffer(t);
          break;
        case a.MAINVIDEO_TIME:
          this._handleMainvideoTime(t);
          break;
        case a.MAINVIDEO_RATE_CHANGE:
          this._rateBtnTxt.innerHTML = t + 'x';
          this._ratePopover.select(function (e) {
            if (e.data === t) return !0;
            else return !1;
          }, !1);
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
    x._initEvent = function () {
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
      if (!this._config.forbidViewSegment)
        o._$addEvent(
          this._segmentTitleElem,
          'click',
          function (e) {
            this.sendNotification(a.VIEW_SEGMENT, { title: e.target.innerText });
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
      o._$addEvent(this._anchorbtn, 'click', this._onAnchorbtnClick._$bind(this));
      o._$addEvent(this._volumebtn, 'click', this._onVolumeBtnClick._$bind(this));
      o._$addEvent(
        this._bigplaybtn,
        'click',
        function () {
          if (!this._isBan) this.sendNotification(a.VIEW_PLAY);
        }._$bind(this),
      );
    };
    x._handleMoviedataReady = function (e) {
      console.log('初始化:', e);
      this._movieData = e;
      this._initControl(e);
      this._initAnimation();
    };
    x._handleMainvideoStartLoad = function (e) {
      if (this._movieData != e.movieData) this._initControl(e.movieData);
    };
    x._handleError = function (e) {
      this.ban();
    };
    x._handleViewPreadStart = function (e) {
      this.isPreading = !0;
      this.ban();
    };
    x._handleViewPreadEnd = function (e) {
      this.isPreading = !1;
    };
    x._handleMainvideoQualityChange = function (e) {
      this._qualityPopover &&
        this._qualityPopover.select(function (t) {
          if (t.value == e.qualityName) return !0;
        }, !1);
      this._qualityBtnTxt.innerHTML = e.qualityName;
    };
    x._handleMoviedataCurrentCDNChange = function (e) {
      this._cdnPopover &&
        this._cdnPopover.select(function (t) {
          if (t.value == e.cdnSwitch.newData.ispName) return !0;
        }, !1);
    };
    x._handleMainvideoMeta = function (e) {
      function t(t) {
        for (var n = 0; n < t.length; n++) t[n].position = t[n].time / e._duration;
        return t;
      }
      this._duration = e.duration;
      this._durationElem.innerHTML = s.formatVideoTime(e.duration);
      if (this._progressbar)
        this._progressbar.reset({ start: 0, anchors: this._cluPointList || [] });
      else
        this._initProgressBar(
          this._crtTime,
          this._duration,
          this._cluPointList ? t(this._cluPointList) : [],
        );
      this.unban();
    };
    x._handleMainvideoState = function (e) {
      this._state = e.newState;
      if ('PAUSED' == e.newState) {
        i._$delClassName(this._playbtn, 'z-hide');
        i._$delClassName(this._pausebtn, 'z-show');
        if (!this.isPreading) i._$addClassName(this._bigplaybtn, 'z-show');
      } else {
        if ('PLAYING' == e.newState) {
          i._$addClassName(this._playbtn, 'z-hide');
          i._$addClassName(this._pausebtn, 'z-show');
        }
        i._$delClassName(this._bigplaybtn, 'z-show');
      }
    };
    x._handleMainvideoBuffer = function (e) {
      this._progressbar && this._progressbar.setBufferPos(e.bufferPercent);
    };
    x._handleMainSegment = function (e) {
      try {
        if (this._segmentList && this._segmentList.length)
          for (var t = 0; t < this._segmentList.length; t++) {
            var n = this._segmentList[t];
            if (1e3 * e >= n.startTime && 1e3 * e < n.endTime) {
              this._segmentTitleElem.classList.add('has-content');
              this._segmentTitleElem.innerHTML = n.title;
              break;
            }
          }
      } catch (i) {}
    };
    x._handleMainvideoTime = function (e) {
      var t = e.currentTime,
        n = e.duration;
      this._crtTime = t;
      this._currentTimeElem.innerHTML = s.formatVideoTime(t);
      this._handleMainSegment(t);
      if (this._progressbar && !this._progressbar.isDragging && !this._isViewSeekBackwardOrForward)
        this._progressbar.setProgressPos(t / n, !1, n);
      if (
        this._config.openAutoPlayNextTip &&
        e.duration - e.currentTime <= 5 &&
        !this._movieData.isLast
      )
        i._$addClassName(this._autoplaynexttip, 'u-edu-h5player-controlwrap_autoplaynexttip-show');
      else
        i._$delClassName(this._autoplaynexttip, 'u-edu-h5player-controlwrap_autoplaynexttip-show');
    };
    x._handleBoxFullscreenChange = function (e) {
      if (e) {
        this._showSHD();
        i._$addClassName(this._fullscreen, 'z-hide');
        i._$addClassName(this._notfullscreen, 'z-show');
      } else {
        i._$delClassName(this._fullscreen, 'z-hide');
        i._$delClassName(this._notfullscreen, 'z-show');
      }
    };
    x._handleMainvideoVolume = function (e) {
      var t = this;
      if (!this._hasVolumeInited) {
        this._hasVolumeInited = !0;
        this._volumeRecord = e ? e : 1;
        this._volumebar = new l({
          isChangeInstantly: !0,
          klass: 'volumebar',
          type: 4,
          start: e,
          duration: t._duration,
          segmentList: t._segmentList,
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
    x._onRootNodeMousedown = function (e) {
      e.stopPropagation();
      this._isKeyEventActive = !0;
    };
    x._onDocumentMousedown = function () {
      this._isKeyEventActive = !1;
    };
    x._onDocumentKeydown = function (e) {
      if (this._isKeyEventActive) {
        var t = this;
        var n = e.keyCode;
        if (!t._isBan)
          switch (n) {
            case 37:
              this._viewSeek('back');
              break;
            case 39:
              this._viewSeek();
              break;
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
    };
    x._onAnchorbtnClick = function (e) {
      if (1 == localStorage.getItem(b)) {
        localStorage.removeItem(b);
        i._$style(this._anchorbtn, { color: '#00CC7E' });
        this._anchorbtn.classList.add('switch-open');
        this.sendNotification(a.VIEW_CLOSE_ANCHOR);
      } else {
        localStorage.setItem(b, 1);
        i._$style(this._anchorbtn, { color: '#fff' });
        this._anchorbtn.classList.remove('switch-open');
        this.sendNotification(a.VIEW_OPEN_ANCHOR);
      }
      if (window.DATracker)
        DATracker.track('视频播放页-知识驻点开关点击-iaw', {
          user_id: !!window.webUser && window.webUser.id,
          pagename: 'videolearn',
          term_id: window.termDto && window.termDto.id,
          video_id: this._movieData && this._movieData.videoId,
          status: 1 == localStorage.getItem(b) ? 'turnon' : 'turnoff',
        });
      this._progressbar.resetAnchor();
    };
    x._onVolumeBtnClick = function (e) {
      if (!m(this._volumePopover, o._$getElement(e)))
        if (this._volumebar.crtProgressPos) {
          this._volumeRecord = this._volumebar.crtProgressPos;
          this._volumebar.setProgressPos(0);
        } else this._volumebar.setProgressPos(this._volumeRecord);
    };
    x._initControl = function (e) {
      this._movieData = e;
      this._crtTime = e.start;
      this._cluPointList = e.cluPointList;
      this._segmentList = e.segmentListData;
      i._$style(this._anchorbtn, { display: 'none' });
      if (this._cluPointList && this._cluPointList.length)
        for (var t = 0; t < this._cluPointList.length; t++) {
          var n = this._cluPointList[t];
          if (5 == n.type) {
            var o = 1 == localStorage.getItem(b) ? '#fff' : '#00CC7E';
            var a = 1 == localStorage.getItem(b) ? '' : 'switch-open';
            i._$style(this._anchorbtn, { display: 'inline-block', color: o });
            a && this._anchorbtn.classList.add(a);
            break;
          }
        }
      if (s.supportRateChange()) {
        this._ratePopover && this._ratePopover.destroy();
        this._rateBtnTxt.innerHTML = '1x';
        this._initRateList();
      }
      this._captionPopover && this._captionPopover.destroy();
      if (e.captionData.hasCaption) {
        i._$delClassName(this._captionBtn, 'z-hide');
        this._initCaptionList(e.captionData);
      } else i._$addClassName(this._captionBtn, 'z-hide');
      this._qualityPopover && this._qualityPopover.destroy();
      this._qualityBtnTxt.innerHTML = e.currentMovieItem.qualityName;
      if (1 == e.movieItemList.length) i._$addClassName(this._qualityBtn, 'z-dis');
      else {
        i._$delClassName(this._qualityBtn, 'z-dis');
        this._initQualityList(e);
      }
      this._cdnPopover && this._cdnPopover.destroy();
      if (!e.cdnSwitchData || !this._config.showCdnSwitch) i._$addClassName(this._cdnBtn, 'z-hide');
      else {
        i._$delClassName(this._cdnBtn, 'z-hide');
        if (e.cdnSwitchData.length > 1) {
          i._$delClassName(this._cdnBtn, 'z-dis');
          this._initCdnList(e.cdnSwitchData, e.cdnSwitch);
        } else i._$addClassName(this._cdnBtn, 'z-dis');
      }
      i._$delClassName(this._autoplaynexttip, 'u-edu-h5player-controlwrap_autoplaynexttip-show');
    };
    x._initProgressBar = function (e, t, n) {
      var o = this;
      for (var r = 0; r < n.length; r++) n[r].position = n[r].time / t;
      this._progressbar = new l({
        klass: 'progresswrap',
        type: 1,
        start: e / t,
        duration: t,
        anchors: n,
        segmentList: this._segmentList,
        init: function () {
          o._hoverTime = o._initHoverTime(this.rootNode);
          o._dragItem = i._$getByClassName(this.rootNode, 'drag_item')[0];
          i._$create('div', 'placeholder', this.rootNode);
        },
        onMouseup: function (e) {
          o.sendNotification(a.VIEW_SEEK, {
            newData: Math.floor(e * o._duration),
            oldData: Math.floor(this.preProgressPos * o._duration),
          });
        },
        onHover: function (e, t, n) {
          o._hoverTime.setTime(Math.floor(e * o._duration), n);
        },
        onAnchor: function (e) {
          o.sendNotification(a.VIEW_ANCHOR, e);
        },
        onLectureNote: function (e) {
          o.sendNotification(a.VIEW_AI_LECTURE_NOTE, e);
        },
      }).insertTo(this._bodyNode, 'prepend');
      this._handleMainSegment(e);
      this.sendNotification(a.VIDEO_CONTROL_DOM_READY, this._bodyNode);
    };
    x._initHoverTime = function (e) {
      var t = this,
        n = i._$create('div', 'time', e);
      o._$addEvent(e, 'mouseleave', function () {
        i._$delClassName(n, 'z-show');
      });
      return {
        setTime: function (o, a) {
          function r() {
            if (d <= l / 2) return 0;
            else if (d >= c - l / 2) return c - l;
            else return d - l / 2;
          }
          var c = e.offsetWidth,
            d = (o / t._duration) * c,
            l = 0;
          i._$addClassName(n, 'z-show');
          if (a && a.length) {
            var u = !1;
            if (a[0].type && 'AILectureNote' == a[0].type) {
              u = !0;
              i._$addClassName(n, 'segment-hover-noImg');
            } else i._$addClassName(n, 'segment-hover');
            for (var _ = 0; _ < a.length; _++) {
              var f = a[_];
              if (1e3 * o >= f.startTime && 1e3 * o < f.endTime) {
                if (u)
                  n.innerHTML =
                    '<div class="segment-hover-noImg_filterBg"></div><div class="segment-hover-noImg_timing">' +
                    s.formatVideoTime(o) +
                    '</div><div class="segment-hover-noImg_title">' +
                    f.title +
                    '</div>';
                else
                  n.innerHTML =
                    '<div class="segment-hover_img" style="background:url(' +
                    (f.pictureUrl ||
                      'http://edu-image.nosdn.127.net/838C507E9E96F3F8EF93175D3B70E97F.jpeg?imageView&quality=100&thumbnail=230y130&type=webp') +
                    ') no-repeat;background-size:cover"><span>' +
                    s.formatVideoTime(o) +
                    '</span></div><div class="segment-hover_title">' +
                    f.title +
                    '</div>';
                break;
              }
            }
          } else n.innerHTML = s.formatVideoTime(o);
          l = n.offsetWidth;
          i._$style(n, { left: r() + 'px' });
        },
      };
    };
    x._initQualityList = function (e) {
      var t = this,
        n = e.currentMovieItem,
        i = null,
        o = [];
      for (var r = 0; r < e.movieItemList.length; r++) {
        i = e.movieItemList[r];
        o[r] = {};
        if (i.quality == n.quality) o[r].selected = !0;
        o[r].value = i.qualityName;
        o[r].data = { quality: i.quality, name: i.qualityName };
      }
      this._qualityPopover = new d({
        dep: this._qualityBtn,
        klass: 'm-popover-quality',
        list: o,
        onSelect: function (e, n) {
          t.sendNotification(a.VIEW_QUALITY, { newData: e, oldData: n });
        },
      });
    };
    x._hiddenSHD = function () {
      if (this._qualityPopover) {
        var e = this._qualityPopover.rootNode.querySelectorAll('li');
        e.forEach(function (e) {
          if (e.innerHTML == u.KEY_VIDEO_U_HD) i._$addClassName(e, 'f-dn');
        });
      }
    };
    x._showSHD = function () {
      if (this._qualityPopover) {
        var e = this._qualityPopover.rootNode.querySelectorAll('li');
        e.forEach(function (e) {
          i._$replaceClassName(e, 'f-dn');
        });
      }
    };
    x._initRateList = function () {
      var e = this;
      this._ratePopover = new d({
        dep: this._rateBtn,
        klass: 'm-popover-rate',
        list: [
          { data: 0.75, value: '0.75' + u.KEY_VIDEO_DOUBLE_SPEED },
          { data: 1, value: '1' + u.KEY_VIDEO_DOUBLE_SPEED, selected: !0 },
          { data: 1.25, value: '1.25' + u.KEY_VIDEO_DOUBLE_SPEED },
          { data: 1.5, value: '1.5' + u.KEY_VIDEO_DOUBLE_SPEED },
          { data: 1.75, value: '1.75' + u.KEY_VIDEO_DOUBLE_SPEED },
          { data: 2, value: '2' + u.KEY_VIDEO_DOUBLE_SPEED },
        ],
        onSelect: function (t) {
          e.sendNotification(a.VIEW_RATE, t);
        },
      });
    };
    x._initCaptionList = function (e) {
      var t = this,
        n = [],
        i = {};
      for (var o = 0; o < e.data.length; o++) {
        i = e.data[o];
        n.push({ value: i.name, data: i.name, selected: i.isSelect });
      }
      this._captionPopover = new d({
        dep: this._captionBtn,
        type: 2,
        klass: 'm-popover-caption',
        list: n,
        onSelect: function (n, i, o) {
          for (var r = 0; r < e.data.length; r++)
            if (o.data == e.data[r].name) {
              e.data[r].isSelect = 'select' == o.name;
              break;
            }
          t.sendNotification(a.VIEW_CAPTION_SELECT, { newData: n, oldData: i, operation: o });
        },
      });
    };
    x._initCdnList = function (e, t) {
      var n = this,
        i = [],
        o = null;
      for (var r = 0; r < e.length; r++) {
        o = e[r];
        i.push({});
        i[r].value = o.ispName;
        i[r].data = o;
        if (t && o.isp == t) i[r].selected = !0;
      }
      if (!t) i[0].selected = !0;
      this._cdnPopover = new d({
        dep: this._cdnBtn,
        klass: 'm-popover-cdn' + (e.length <= 3 ? ' m-popover-cdn-one_column' : ''),
        list: i,
        onSelect: function (e, t) {
          n.sendNotification(a.VIEW_CDN, { newData: e, oldData: t });
        },
      });
    };
    x._initAnimation = function () {
      var e = this;
      var t = (function () {
        var t = -1;
        return function () {
          const n = i._$get('j-video-player');
          if (!i._$hasClassName(n, 'mini')) {
            clearTimeout(t);
            i._$addClassName(e._controlWrap, 'z-show');
            e.sendNotification(a.VIDEO_CONTROL_SHOW);
            t = setTimeout(function () {
              i._$delClassName(e._controlWrap, 'z-show');
              e.sendNotification(a.VIDEO_CONTROL_HIDE);
            }, 5e3);
          }
        };
      })();
      var n = function () {
        i._$delClassName(e._controlWrap, 'z-show');
        e.sendNotification(a.VIDEO_CONTROL_HIDE);
      };
      o._$addEvent(this._rootNode, 'mousemove', t);
      o._$addEvent(this._rootNode, 'mouseleave', n);
    };
    x.ban = function () {
      this._isBan = !0;
    };
    x.unban = function () {
      this._isBan = !1;
    };
    return E;
  },
  '2c183ade9c940d0d51ea8c2fad43f1e3',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
  'f7155d88aabc058cab24982e3c3671cc',
  'd19848d97d669e1c3823c33c3dc4a6db',
  'ff1c5e9840f717fea21797b5071706db',
);
