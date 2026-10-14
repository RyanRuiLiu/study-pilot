EDU(
  '70ba1ea19c0beb2d4038a1a14ce700b7',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = e.C();
    f.NAME = 'textTrackComponent';
    var h = f.extend(n);
    h._init = function (e, t) {
      this.__super(e, t);
      this._initEvent();
      return this;
    };
    h.listNotificationInterests = function () {
      return [a.MAINVIDEO_VIDEO_READY, a.MOVIEDATA_READY, a.MAINVIDEO_START_LOAD];
    };
    h.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case a.MAINVIDEO_VIDEO_READY:
          this._handleVideoReady(e.getBody());
          break;
        case a.MOVIEDATA_READY:
          this._handleCaptionData(e.getBody());
          break;
        case a.MAINVIDEO_START_LOAD:
          this._handleLoadStart(e.getBody());
      }
    };
    h._initEvent = function () {};
    h._handleCaptionData = function (e) {
      this._captionChange = !0;
      this._captionData = e.captionData || {};
    };
    h._handleVideoReady = function (e) {
      this._mainVideoNode = e;
    };
    h._handleLoadStart = function (e) {
      if (this._captionChange) {
        this._captionChange = !1;
        if (this._captionData.hasCaption) if (this._mainVideoNode) this._setTextTrackNode();
      }
    };
    h._setTextTrackNode = function () {
      this._removeTextTrackNode();
      t._$forEach(
        this._captionData.data,
        function (t, n) {
          var i = e.createEl('track', {
            label: t.name,
            kind: 'subtitles',
            src: t.url,
            srclang: t.lang,
          });
          this._mainVideoNode.appendChild(i);
        },
        this,
      );
      this._textTrackNodes = e.T('track', this._mainVideoNode);
      for (var n = 0; n < this._captionData.data.length; n++)
        this._showOrHideTextTrack(
          this._captionData.data[n].lang,
          this._captionData.data[n].isSelect,
        );
    };
    h._removeTextTrackNode = function () {
      if (this._textTrackNodes)
        t._$forEach(
          this._textTrackNodes,
          function (e, t) {
            this._mainVideoNode.removeChild(e);
          },
          this,
        );
      this._textTrackNodes = null;
    };
    h._showOrHideTextTrack = function (e, t) {
      var n, i;
      for (var o = 0; o < this._textTrackNodes.length; o++)
        if (this._textTrackNodes[o].srclang == e) n = this._textTrackNodes[o];
      for (var a = 0; a < this._mainVideoNode.textTracks.length; a++)
        if (this._mainVideoNode.textTracks[a].language == e) i = this._mainVideoNode.textTracks[a];
      if (n && i)
        if (t) {
          n.mode = 'showing';
          i.mode = 'showing';
        } else {
          n.mode = 'hidden';
          i.mode = 'hidden';
        }
    };
    return f;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
  'fe86216ed59e3103a56c42c850d389f0',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
);
