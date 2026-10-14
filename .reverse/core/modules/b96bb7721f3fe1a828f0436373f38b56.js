EDU(
  'b96bb7721f3fe1a828f0436373f38b56',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _ = NEJ.P('edu.u');
    var f = n.C();
    f.NAME = 'fullscreenAIAssistant';
    var h = f.extend(r);
    h._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = a._$getByClassName(this._rootNode, 'j-fullscreen-ai-robot')[0];
      this._show = !1;
      this._isFullscreen = !1;
      this._videoControlShow = !1;
      this._chatBoxOpen = !1;
      this._AIAssistantParam = NEJ.X({}, e.AIAssistantParam);
      return this;
    };
    h._getTpl = function () {
      return t;
    };
    h.listNotificationInterests = function () {
      return [
        s.MOVIEDATA_READY,
        s.BOX_FULLSCREEN_CHANGE,
        s.VIDEO_CONTROL_SHOW,
        s.VIDEO_CONTROL_HIDE,
      ];
    };
    h.handleNotification = function (e) {
      this.__super(e);
      var t = e.getBody();
      switch (e.getName()) {
        case s.BOX_FULLSCREEN_CHANGE:
          this._handleFullScreen(t);
          break;
        case s.MOVIEDATA_READY:
          this._handleMovieDataReady(t);
          break;
        case s.VIDEO_CONTROL_SHOW:
          this._handleAccordingToControlBar(!0);
          break;
        case s.VIDEO_CONTROL_HIDE:
          this._handleAccordingToControlBar(!1);
      }
    };
    h._handleFullScreen = function (e) {
      if (this._isFullscreen != e) {
        this._isFullscreen = e;
        this._renderAIAssistant(!1);
      }
    };
    h._handleMovieDataReady = function (e) {
      this._metaReady = !0;
    };
    h._handleAccordingToControlBar = function (e) {
      if (this._videoControlShow != e) {
        this._videoControlShow = e;
        this._renderAIAssistant(e);
      }
    };
    h._handleChatBoxChange = function (e) {
      if (this._chatBoxOpen != e) {
        this._chatBoxOpen = e;
        if (this._chatBoxOpen) this.sendNotification(s.VIEW_PAUSE);
      }
    };
    h._showLogicHandle = function () {
      if (!this._isFullscreen) {
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this._bodyNode);
        this._show = !1;
        this._chatBoxOpen = !1;
        return !1;
      }
      if (this._videoControlShow) this._show = !0;
      else this._show = !1;
      if (this._chatBoxOpen) this._show = !0;
      return !0;
    };
    h._renderAIAssistant = function (e) {
      if (this._showLogicHandle()) {
        var t = NEJ.X({}, this._AIAssistantParam, {
          shouldHide: !e,
          chatBoxOpenChange: this._handleChatBoxChange._$bind(this),
          robotStyle: { position: 'absolute', right: 0, bottom: 0 },
        });
        if (window.renderReactComponent && window.renderReactComponent['LearnAIAssistant']) {
          var n = window.renderReactComponent['LearnAIAssistant'];
          window.reactComponentLoadBootstrap.setFtlData(t);
          window.renderReactComponent.render(n.component, n.initialState, this._bodyNode);
        }
      }
    };
    h.onRemove = function () {
      this.__super();
    };
    return f;
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '9bfd11a135bf5439c792cb2dd099c1b3',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'bf51392f0d61f79621004c6cf9b27b9f',
);
