EDU(
  '36ed33f3975bcc23db0b3cc5eda647b1',
  function (e, t, n, i, o) {
    function a(e, t) {
      var n,
        i,
        o = t;
      this.pause = function () {
        window.clearTimeout(n);
        o -= new Date() - i;
      };
      this.play = function () {
        i = new Date();
        window.clearTimeout(n);
        n = window.setTimeout(e, o);
      };
      this.play();
    }
    var s = {
      RIGHT_POS: [1, 2, 3],
      LEFT_POS: [4, 5, 6],
      POSTION_CLASS: {
        1: 'right-up',
        2: 'right-center',
        3: 'right-down',
        4: 'left-down',
        5: 'left-down',
        6: 'left-down',
      },
    };
    o = e.$extends({
      name: 'testRichText',
      data: { $$fullscreen: !1, $$ShowInfoModal: !1, posClass: 'right' },
      config: function () {
        this.supr();
      },
      computed: {
        $$top: function () {
          var e = { 1: '5%', 2: '42%', 3: '70%', 4: '5%', 5: '42%', 6: '70%' };
          return e[this.data.position];
        },
      },
      init: function () {
        this.supr();
        var e = this;
        var t = this.data.position || s.RIGHT_POS[2];
        this.data.posClass = s.LEFT_POS.indexOf(+this.data.position) > -1 ? 'left' : 'right';
        this.$update();
        var n = this.data.duration || 5;
        var o = i._$cookie('videoRate') || 1;
        var a = parseInt((n / o) * 1e3);
        e.__setTimeout = setTimeout(function () {
          if (!e.data.$$ShowInfoModal)
            if (!e.data.$$fullscreen) {
              e.slideOut();
              setTimeout(function () {
                if (e.__setTimeout) window.clearTimeout(e.__setTimeout);
                e.destroy();
              }, 800);
            } else e.destroy();
        }, a);
        document.documentElement.addEventListener('fullscreenchange', function () {
          if (document.fullscreenElement) e.data.$$fullscreen = !0;
          else e.data.$$fullscreen = !1;
          e.$update();
        });
      },
      toInfo: function () {
        this.$emit('onViewInfo');
        this.data.$$ShowInfoModal = !0;
        this.$update();
        DATracker.track('视频播放页-驻点点击-iaw', {
          user_id: !!window.webUser && window.webUser.id,
          pagename: 'videolearn',
          term_id: this.data.termId,
          video_id: this.data.videoId,
          point_id: this.data.id,
          point_name: this.data.title,
        });
      },
      showInfoModal: function () {
        this.data.$$ShowInfoModal = !0;
        this.$update();
      },
      close: function () {
        this.data.$$ShowInfoModal = !1;
        this.$emit('onClose');
        this.$update();
        DATracker.track('视频播放页-驻点关闭-iaw', {
          user_id: !!window.webUser && window.webUser.id,
          pagename: 'videolearn',
          term_id: this.data.termId,
          video_id: this.data.videoId,
          point_id: this.data.id,
          point_name: this.data.title,
        });
        this.destroy();
      },
      slideOut: function () {
        this.data.slideOut = !0;
        this.$update();
      },
    });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '93828627ddb358ed890cb65967a0c1de',
  '217dcfc103efb36d2f192eecc4548797',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
