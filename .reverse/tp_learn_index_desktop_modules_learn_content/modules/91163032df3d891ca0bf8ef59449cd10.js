EDU(
  '91163032df3d891ca0bf8ef59449cd10',
  function (e, t, n, i, o, a, s, r) {
    var c = ['#fff', '#333'];
    var d = n.$extends({
      name: 'ux-watermark',
      css: t,
      template: e,
      config: function () {
        i.extend(this, {});
        i.extend(this.data, {
          waterMark: !1,
          waterMarkContent: '',
          showContent: !1,
          contentStyle: '',
          waterMarkColorIndex: 0,
        });
        this.supr();
        this._displayDuration = 12e3;
        this._restDuration = 0;
        this._opacity = 0.2;
        this._fontSize = 24;
      },
      init: function () {
        this.supr();
        this._bodyNode = this.$refs.root;
        if (this.data.waterMark) this.play();
      },
      _getPositionRandomAndSetColor: function () {
        this.data.waterMarkColorIndex = (this.data.waterMarkColorIndex + 1) % c.length;
        return {
          x: Math.random() * this._bodyNode.offsetWidth,
          y: Math.random() * (this._bodyNode.offsetHeight - 14),
        };
      },
      play: function () {
        this.stop();
        this._startDisplay();
      },
      _startDisplay: function () {
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
        var e = this._getPositionRandomAndSetColor();
        this.data.contentStyle =
          'left:' +
          e.x +
          'px; top:' +
          e.y +
          'px;opacity: ' +
          this._opacity +
          ';font-size: ' +
          this._fontSize +
          'px;color:' +
          c[this.data.waterMarkColorIndex];
        console.warn(this.data.contentStyle);
        this.data.showContent = !0;
        this.$update();
      },
      _endDisplay: function () {
        this.data.showContent = !1;
        this.$update();
      },
      stop: function () {
        if (this._restTimer) clearTimeout(this._restTimer);
        if (this._displayTimer) clearTimeout(this._displayTimer);
        this.data.showContent = !1;
        this.$update();
      },
    });
    return d;
  },
  '917969e471dbd9892e5b0a78d5790a16',
  '1925c3ef31a1cf16520111ad0ed1fec7',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
