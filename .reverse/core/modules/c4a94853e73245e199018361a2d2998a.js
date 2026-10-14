EDU(
  'c4a94853e73245e199018361a2d2998a',
  function (e, t, n, i, o, a, r, s, c) {
    var d = 'component-slider-slider-emoji';
    var l = window;
    var u = e.$extends({
      config: function () {
        this._flushSetting(d, c);
        t.extend(this, { settingKey: d });
        t.extend(this.data, { currentIndex: 0 });
        this.supr();
      },
      init: function () {
        this.supr();
        this._settingSwipe();
        this.$update();
      },
      _settingSwipe: function () {
        var e = this;
        setTimeout(function () {
          e.data.nodes = document.getElementsByClassName('mySwipe')[0];
          e.data.mySwipe = l.Swipe(e.data.nodes, {
            continuous: !1,
            transitionEnd: function (t, n) {
              e._transitionEnd(t, n);
            },
          });
          for (var t = 0, n = e.data.items.length; t < n; t++)
            e.data.items[t].$inject(e.$refs['emoji-' + t]);
          l.addEventListener('orientationchange', function () {
            if (e.data.mySwipe.setup) e.data.mySwipe.setup();
          });
        }, 0);
      },
      _transitionEnd: function (e, t) {
        this.data.currentIndex = e;
        this.$update();
      },
      gaClick: function (e, t) {
        o._$trackEvent(this.data.dataCategory || '', '轮播图点击', e + '-' + t);
      },
      destroy: function () {
        this.supr();
      },
    });
    return u;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  'f1a9d77c0cf830092527172d86ab8450',
  'b803fd38b5faf2609a81b93c9bf1d352',
  'ea321df1a66d5a1d11c5df37a56589c4',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '19f9f63627fa903b1954ceaf5d1f5df9',
);
