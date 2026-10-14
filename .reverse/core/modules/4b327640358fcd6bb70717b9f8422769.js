EDU(
  '4b327640358fcd6bb70717b9f8422769',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p, m, g, b) {
    function v(e, t) {
      try {
        var n = 0,
          i = e.length - 1;
        var o = (n + i) >> 1;
        for (; n < i;) {
          var a = e[o];
          if (a.begin == t) return o;
          if (t < a.begin) i = o - 1;
          else if (t >= e[o + 1].begin) n = o + 1;
          else return o;
          o = (n + i) >> 1;
        }
        return n;
      } catch (r) {
        console.error(r);
        return 0;
      }
    }
    function E(e, t) {
      var n = null;
      return function () {
        var i = this,
          o = arguments;
        clearTimeout(n);
        n = setTimeout(function () {
          e.apply(i, o);
          n = null;
        }, t);
      };
    }
    var x = n.C();
    x.NAME = 'srtCaptionComponent';
    var w = x.extend(i);
    w._init = function (t, n) {
      this.__super(t, n);
      this._captionData = null;
      this._duration = 0;
      this._captionHasLoadLength = 0;
      this._bodyNode = u._$getNodeTemplate(u._$addNodeTemplate(_._$get(_._$add(e), { lang: h })));
      this._bodyNode = o._$getByClassName(this._rootNode, 'j-srt')[0];
      this._initEvent();
      return this;
    };
    w._getTpl = function () {
      if (!d._$isMobileAll()) return e;
      else return t;
    };
    w.listNotificationInterests = function () {
      return [
        r.MOVIEDATA_READY,
        r.MAINVIDEO_START_LOAD,
        r.MAINVIDEO_META,
        r.MAINVIDEO_TIME,
        r.VIEW_CAPTION_SELECT,
        r.VIDEO_CONTROL_DOM_READY,
        r.BOX_FULLSCREEN_CHANGE,
      ];
    };
    w.handleNotification = function (e) {
      var t = e.getBody();
      this.__super(e);
      switch (e.getName()) {
        case r.MOVIEDATA_READY:
          this._handleMoviedataReady(t);
          break;
        case r.MAINVIDEO_START_LOAD:
          this._handleMainvideoStartLoad(t);
          break;
        case r.MAINVIDEO_META:
          this._handleMainvideoMeta(t);
          break;
        case r.MAINVIDEO_TIME:
          this._handleMainvideoTime(t);
          break;
        case r.VIEW_CAPTION_SELECT:
          this._handleViewCaptionSelect(t);
          break;
        case r.VIDEO_CONTROL_DOM_READY:
          this._handleVideoControlDomReady(t);
          break;
        case r.BOX_FULLSCREEN_CHANGE:
          this._initCaptionFontSize();
      }
    };
    w._initEvent = function () {
      a._$addEvent(window, 'resize', E(this._initCaptionFontSize, 100)._$bind(this));
    };
    w._handleMoviedataReady = function (e) {
      this._initCaption(e.captionData);
    };
    w._handleMainvideoStartLoad = function (e) {
      if (this._captionData != e.movieData.captionData) {
        this._garbageCaption();
        this._initCaption(e.movieData.captionData);
      }
    };
    w._handleMainvideoMeta = function (e) {
      this._duration = e.duration;
    };
    w._handleMainvideoTime = function (e) {
      var t = null;
      if (this._captionData)
        if (this._captionData.hasCaption)
          for (var n = 0; n < this._captionData.data.length; n++) {
            t = this._captionData.data[n];
            if (t.isSelect && t.arrdata) this._changeCaption(t, e.preciseCurrentTime);
          }
    };
    w._handleViewCaptionSelect = function (e) {
      var t = null;
      for (var n = 0; n < this._captionData.data.length; n++) {
        t = this._captionData.data[n];
        if (t.name == e.operation.data) {
          if ('select' == e.operation.name) o._$addClassName(t._bodyNode, 'z-show');
          else o._$delClassName(t._bodyNode, 'z-show');
          break;
        }
      }
    };
    w._handleVideoControlDomReady = function (e) {
      e.insertBefore(this._bodyNode, e.childNodes[0]);
    };
    w._initCaption = function (e) {
      if (e) {
        var t = null;
        this._captionData = e;
        if (this._captionData.hasCaption) {
          this._captionHasLoadLength = 0;
          for (var n = 0; n < this._captionData.data.length; n++) {
            t = this._captionData.data[n];
            this._loadOneCaptionFile(t);
            t._bodyNode = o._$create('div', 'srt_item', this._bodyNode);
            if (t.isSelect) o._$addClassName(t._bodyNode, 'z-show');
            else o._$delClassName(t._bodyNode, 'z-show');
          }
          this._initCaptionFontSize();
        }
      }
    };
    w._garbageCaption = function () {
      this._captionData = null;
      this._removeSrtElems();
    };
    w._initMap = function (e) {
      var t = e.arrdata,
        n = 0,
        i = 0;
      try {
        var o = [],
          a = -1;
        for (var r = 0; r < t.length; r++) {
          var s = Math.floor(1e3 * t[r].begin);
          if (0 == r) {
            o.push(t[r]);
            a++;
          } else if (o[a].begin == s) o[a].text = t[r].text;
          else {
            o.push({ begin: s, text: t[r].text });
            a++;
          }
        }
        e._newArrData = o;
        this._nowFocusCaptionIdx = 0;
      } catch (c) {
        console.error(c);
      }
    };
    w._removeSrtElems = function () {
      var e = o._$getByClassName(this._bodyNode, 'srt_item');
      for (var t = 0; t < e.length; t++) o._$remove(e[t]);
    };
    w._initCaptionFontSize = function () {
      if (this._captionData)
        if (this._captionData.hasCaption) {
          var e = 18,
            t = 14,
            n = 300,
            i = o._$getByClassName(this._rootNode, 'u-edu-h5player-mainvideo')[0],
            a = +/\d*/.exec(o._$getStyle(i, 'height'))[0],
            r = Math.floor((a - n) / 100),
            s = null;
          for (var c = 0; c < this._captionData.data.length; c++) {
            s = this._captionData.data[c];
            if (s._bodyNode)
              if ('中文' == s.name)
                if (r <= 0) o._$style(s._bodyNode, { fontSize: e + 'px' });
                else o._$style(s._bodyNode, { fontSize: e + 4 * r + 'px' });
              else if (r <= 0) o._$style(s._bodyNode, { fontSize: t + 'px' });
              else o._$style(s._bodyNode, { fontSize: t + 4 * r + 'px' });
            else;
          }
        }
    };
    w._loadOneCaptionFile = function (e) {
      var t = {
        method: 'GET',
        type: 'text',
        timeout: 1e4,
        cookie: !1,
        sync: !0,
        headers: { 'Content-Type': '' },
        onload: this._cbLoadOneCaptionFileSuccess._$bind(this, e),
        onerror: this._cbLoadOneCaptionFileFail._$bind(this),
      };
      l._$request(e.url, t);
    };
    w._cbLoadOneCaptionFileSuccess = function (e, t) {
      e.arrdata = f.parseSrt(t);
      this._captionHasLoadLength++;
      this._initMap(e);
      if (this._captionData.data.length == this._captionHasLoadLength);
    };
    w._cbLoadOneCaptionFileFail = function (e) {
      this.log('load one caption file fail:' + e.message, 'error');
    };
    w._changeCaption = function (e, t) {
      var n = '';
      var i = Math.floor(1e3 * t);
      var o = e._newArrData[this._nowFocusCaptionIdx];
      var a = null;
      if (this._nowFocusCaptionIdx < e._newArrData.length - 1)
        a = e._newArrData[this._nowFocusCaptionIdx + 1];
      if (o.begin <= i && (!a || (a && a.begin > i))) n = o.text;
      else if (a.begin <= i) {
        var r = null;
        if (this._nowFocusCaptionIdx + 1 < e._newArrData.length - 1)
          r = e._newArrData[this._nowFocusCaptionIdx + 2];
        if (!r || r.begin > i) {
          this._nowFocusCaptionIdx++;
          n = a.text;
        } else {
          setTimeout(
            function () {
              this._nowFocusCaptionIdx = v(e._newArrData, i);
              n = e._newArrData[this._nowFocusCaptionIdx].text;
              e._bodyNode.innerHTML = n.replace(/[\n\r]+/g, '<br>');
            }._$bind(this),
          );
          return;
        }
      } else {
        setTimeout(
          function () {
            this._nowFocusCaptionIdx = v(e._newArrData, i);
            n = e._newArrData[this._nowFocusCaptionIdx].text;
            e._bodyNode.innerHTML = n.replace(/[\n\r]+/g, '<br>');
          }._$bind(this),
        );
        return;
      }
      e._bodyNode.innerHTML = n.replace(/[\n\r]+/g, '<br>');
    };
    return x;
  },
  '310fc5f85dfd99564c9595ee026a1394',
  '284c841e685c31ce4deb2247ae3c5b0e',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
  '8a864b627c302d7d1c56bd928b515d1b',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'a683120291a4c0998be593ee310724ec',
  'ff1c5e9840f717fea21797b5071706db',
);
