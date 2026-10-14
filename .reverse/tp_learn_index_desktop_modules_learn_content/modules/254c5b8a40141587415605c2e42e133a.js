EDU(
  '254c5b8a40141587415605c2e42e133a',
  function (e, t, n, i, o, a) {
    var s = window;
    var r = i.$extends({
      config: function () {
        a.extend(this, {});
        a.extend(this.data, { show: !0, openThumbnail: !1, activeGrab: !1 });
        this.supr();
      },
      init: function () {
        this.supr();
        this.adaptOrientation();
      },
      _bindEvents: function () {
        window.addEventListener(
          'resize',
          function () {
            clearTimeout(this._tid);
            this._tid = setTimeout(this.adaptOrientation._$bind(this), 301);
          }._$bind(this),
        );
        setTimeout(function () {
          document.head.append(
            '<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">',
          );
        }, 500);
        var e = 0;
        var t = 0;
        if (s.Hammer) {
          var n = this.$refs.pdfContainerViewer;
          var i = this.$refs.enterIcon;
          var o = new Hammer(n, { touchAction: 'auto' });
          o.get('pinch').set({ enable: !0 });
          o.on(
            'pinchin',
            function (t) {
              this.showFooter(!1);
              var n = new Date().getTime();
              if (!(n - e < 500)) {
                setTimeout(
                  function () {
                    this.scaleSmaller();
                  }._$bind(this),
                  200,
                );
                e = new Date().getTime();
              }
            }._$bind(this),
          );
          o.on(
            'pinchout',
            function (e) {
              this.showFooter(!1);
              var n = new Date().getTime();
              if (!(n - t < 500)) {
                setTimeout(
                  function () {
                    this.scaleBigger();
                  }._$bind(this),
                  200,
                );
                t = new Date().getTime();
              }
            }._$bind(this),
          );
          o.on(
            'swipeleft',
            function (e) {
              e.preventDefault();
              this.showFooter(!1);
              if (e.deltaX < -80) this.nextPage();
            }._$bind(this),
          );
          o.on(
            'swiperight',
            function (e) {
              e.preventDefault();
              this.showFooter(!1);
              if (e.deltaX > 80) this.prevPage();
            }._$bind(this),
          );
          o.on(
            'tap',
            function () {
              this.showFooter(!this.data.show);
              this.genTimer();
            }._$bind(this),
          );
          var a = new Hammer(i);
          a.on(
            'tap',
            function () {
              this.doFullscreen();
            }._$bind(this),
          );
        }
      },
      adaptOrientation: function () {
        if (s.innerHeight < s.innerWidth) {
          var e = screen.width;
          var t = 1;
          if (e / t > 540) e = 540 * t;
          var n = e / 10;
          var i = s.lib.flexible || (s.lib.flexible = {});
          document.documentElement.style.fontSize = n + 'px';
          i.rem = s.rem = n;
        }
      },
      genTimer: function () {
        clearInterval(this._timer);
        this._timer = setInterval(
          function () {
            this.showFooter(!1);
          }._$bind(this),
          5e3,
        );
      },
      _getPageReady: function (e) {
        this.supr(e);
        this.genTimer();
      },
      _getPageUpdate: function (e) {
        this.supr(e);
        this.select(e.pageIndex);
      },
      select: function (e) {
        if (this.$refs && this.$refs.switcherNode) this.$refs.switcher.select(e - 1);
      },
      go: function (e) {
        this.supr(e);
        this.genTimer();
        this.select(e);
      },
      showFooter: function (e) {
        if (this.$refs && this.$refs.switcherNode) {
          this.$refs.switcherNode.style.pointerEvents = 'none';
          setTimeout(
            function () {
              this.$refs.switcherNode.style.pointerEvents = 'auto';
            }._$bind(this),
            100,
          );
        }
        this.data.show = e;
        this.$update();
      },
      destroy: function () {
        clearInterval(this._timer);
        this.supr();
      },
    });
    return r;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '9a830f6a308feb17fe43372af2d6e799',
  'fc3273513654082669a4cda1da469bfa',
  'ddda2d7d2ae8dce4ee882d69bb14653e',
  '217dcfc103efb36d2f192eecc4548797',
  '8711c9a7b8f533cb8176393befe31458',
);
