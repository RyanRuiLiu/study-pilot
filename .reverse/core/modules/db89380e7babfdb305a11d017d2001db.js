EDU(
  'db89380e7babfdb305a11d017d2001db',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = '#ffffff';
    var h = t.C();
    h.NAME = 'WatermarkComponent';
    var p = h.extend(n);
    p._init = function (e, t) {
      this.__super(e, t);
      this._contentField = i._$getByClassName(this._rootNode, 'j-content')[0];
      if (this._config.waterMark) {
        this._content = this._config.waterMarkContent;
        this._displayDuration = 12e3;
        this._restDuration = 0;
        this._displayTimer;
        this._restTimer;
        return this;
      } else this._contentField.style.display = 'none';
    };
    p._getTpl = function () {
      return e;
    };
    p.listNotificationInterests = function () {
      return [a.MAINVIDEO_STATE];
    };
    p.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case a.MAINVIDEO_STATE:
          this._handleVideoState(e.getBody());
      }
    };
    p._handleVideoState = function (e) {
      this._state = e.newState;
      switch (this._state) {
        case r.MEDIA_STATE.IDLE:
          this._stop();
          break;
        case r.MEDIA_STATE.PAUSE:
          this._stop();
          break;
        case r.MEDIA_STATE.PLAYING:
          this._play();
          break;
        case r.MEDIA_STATE.BUFFERING:
          this._stop();
          break;
        case r.MEDIA_STATE.COMPLETE:
          this._stop();
      }
    };
    p._getPositionRandom = function () {
      f = '#ffffff' == f ? '#333333' : '#ffffff';
      var e = this._player.__playerConfig.parent;
      return { x: Math.random() * e.offsetWidth, y: Math.random() * (e.offsetHeight - 14) };
    };
    p._play = function () {
      this._stop();
      if (this._content) this._startDisplay();
    };
    p._startDisplay = function () {
      this._displayTimer = setTimeout(
        function () {
          this._endDisplay();
          this._restTimer = setTimeout(
            function () {
              this._startDisplay();
            }._$bind(this),
            this._restDuration,
          );
        }._$bind(this),
        this._displayDuration,
      );
      var e = this._getPositionRandom();
      this._contentField.style.left = e.x + 'px';
      this._contentField.style.top = e.y + 'px';
      this._contentField.innerText = this._content;
      this._contentField.style.display = 'block';
      this._contentField.style.color = f;
    };
    p._endDisplay = function () {
      this._contentField.style.display = 'none';
    };
    p._stop = function () {
      if (this._restTimer) clearTimeout(this._restTimer);
      if (this._displayTimer) clearTimeout(this._displayTimer);
      this._contentField.visible = !1;
    };
    p._observe = function () {
      var e = this;
      var t = new MutationObserver(function (t) {
        t.forEach(function (t) {
          if (t.removedNodes.length > 0 && 'waterContent' == t.removedNodes[0].id) {
            console.log('检测到水印被删除，已重新添加水印');
            e._startDisplay();
            e._config.parent.appendChild(e._contentField);
          }
          if ('attributes' == t.type && 'waterContent' == t.target.id) {
            console.log('检测到水印属性被修改，已重置属性');
            e._contentField.style.display = 'block';
            e._contentField.style.opacity = 0.1;
          }
        });
      });
      t.observe(document.body, {
        childList: !0,
        attributes: !0,
        subtree: !0,
        attributesOldValue: !0,
        characterData: !0,
        characterDataOldValue: !0,
      });
    };
    return h;
  },
  '0e67427707c9015dff588c22d3a24b77',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
);
