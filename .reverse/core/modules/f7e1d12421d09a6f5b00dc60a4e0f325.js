EDU(
  'f7e1d12421d09a6f5b00dc60a4e0f325',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _ = n.C();
    _.NAME = 'fullscreenSegmentComponent';
    var f = _.extend(r);
    f._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = a._$getByClassName(this._rootNode, 'j-fullscreen-segmentList')[0];
      this._videoReady = !1;
      this._showSegment = !1;
      this._nowTime = 0;
      this._isFullscreen = !1;
      this._segmentType = null;
      this._segmentListData = [];
      return this;
    };
    f._getTpl = function () {
      return t;
    };
    f.listNotificationInterests = function () {
      return [s.MOVIEDATA_READY, s.BOX_FULLSCREEN_CHANGE, s.VIEW_SEGMENT, s.MAINVIDEO_TIMEUPDATE];
    };
    f.handleNotification = function (e) {
      this.__super(e);
      var t = e.getBody();
      switch (e.getName()) {
        case s.BOX_FULLSCREEN_CHANGE:
          this._handleFullScreen(t);
          break;
        case s.VIEW_SEGMENT:
          this._handleViewSegment(t);
          break;
        case s.MOVIEDATA_READY:
          this._handleMovieDataReady(t);
          break;
        case s.MAINVIDEO_TIMEUPDATE:
          this._handleTimeupdate(t);
      }
    };
    f._handleFullScreen = function (e) {
      if ('AILectureNote' == this._segmentType) this._showSegment = e ? this._showSegment : !1;
      this._isFullscreen = e;
      if (!this._isFullscreen && 'AILectureNote' == this._segmentType)
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this._bodyNode);
    };
    f._handleTimeupdate = function (e) {
      if (this._videoReady) {
        this._nowTime = e.currentTime;
        this._handleSegmentListDisplay();
      }
    };
    f._handleViewSegment = function (e) {
      if ('AILectureNote' == this._segmentType) {
        if (this._videoReady && this._isFullscreen) {
          this._showSegment = !this._showSegment;
          this._handleSegmentListDisplay();
        }
      } else if (this._videoReady) {
        this._showSegment = !this._showSegment;
        this._handleSegmentListDisplay();
      }
    };
    f._handleMovieDataReady = function (e) {
      this._segmentListData = e.segmentListData || [];
      this._videoReady = !0;
      if (this._segmentListData.length) this._segmentType = this._segmentListData[0].type;
    };
    f._handleSegmentListDisplay = function () {
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch;
      window.reactComponentLoadBootstrap.setFtlData({
        open: this._showSegment,
        segmentList: this._segmentListData,
        closeCb: function () {
          this._showSegment = !1;
          this._handleSegmentListDisplay();
        }._$bind(this),
        nowTime: this._nowTime,
        chooseSegmentCb: function (e) {
          this.sendNotification(s.VIEW_SEEK, parseInt(e.startTime / 1e3, 10));
        }._$bind(this),
      });
      this._injectReactComponent('LearnVideoFullscreenSegment', this._bodyNode);
    };
    f._injectReactComponent = function (e, t) {
      if (window.renderReactComponent && window.renderReactComponent[e]) {
        var n = window.renderReactComponent[e];
        n.render(n.component, {}, t);
      } else window.reactComponentLoadBootstrap.init({ name: e, container: t });
    };
    f.onRemove = function () {
      this.__super();
    };
    return _;
  },
  '1eef47bbdf1fed4fada13b5ae7d0d174',
  '7d6b7b38b289718f335a22723f21cc94',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'bf51392f0d61f79621004c6cf9b27b9f',
);
