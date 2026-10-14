EDU(
  '098dabe9992b32df749962703d6bda43',
  function (e, t, n, i, o, a, s, r) {
    var c = t._$klass();
    r = c._$extend(n.Module);
    r._doBuild = function (e) {
      this.__super(o, e);
    };
    r._onShow = function (t) {
      this.__super(t);
      this.__options = e._$merge({}, t, t.param || {});
      this._livePcUI && this._livePcUI.destroy();
      this._livePcUI = new a({
        data: {
          liveContentId: this.__options.liveContentId,
          liveId: this.__options.liveId,
          userId: this.__options.userId,
          anonymousUserName: this.__options.anonymousUserName,
          playBackVideoData: this.__options.playBackVideoData,
          waterMarkContent: this.__options.waterMarkContent,
        },
      }).$inject(this.__body || this._body);
      this._livePcUI.$on('liveInfoUpdate', this.liveInfoUpdate._$bind(this));
      this._livePcUI.$on('playBackPlay', this.onPlayBackPlay._$bind(this));
      this._livePcUI.$on('playBackPauseClick', this.onPlayBackPauseClick._$bind(this));
      this._livePcUI.$on('playBackEnd', this.onPlayBackEnd._$bind(this));
      this._livePcUI.$on('playBackSeek', this.onPlayBackSeek._$bind(this));
    };
    r.liveInfoUpdate = function (e) {};
    r.onPlayBackPlay = function () {};
    r.onPlayBackPauseClick = function () {};
    r.onPlayBackEnd = function () {};
    r.onPlayBackSeek = function () {};
    r._onRefresh = function (e) {
      this.__super(e);
    };
    r._onHide = function () {
      this.__super();
      this._livePcUI && this._livePcUI.destroy();
    };
    s.build = n.build._$bind(n, c);
    s.regist = n.regist._$bind2(n, c);
    s.LivePc = c;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  'a1fbe6d4b1d59d038ffa939f0ff9a2b0',
  '8f34a99b20d362b3542aebd517390fc1',
  '238589f971b1494b164029770fa923b4',
  '7317cf5208f3eb4283a0622965da7dca',
);
