EDU(
  'e8bee5584e29d89e8858dec9daa50a83',
  function (e, t, n, i, o, a, s) {
    var r = i.$extends({
      config: function () {
        a.extend(this, {});
        a.extend(this.data, { showThumb: !0 });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      _bindEvents: function () {
        t._$addEvent(this.$refs.root, 'mouseup', this._clickRoot._$bind(this));
        if (this.$refs.h5pdfthumbcontainer)
          t._$addEvent(this.$refs.h5pdfthumbcontainer, 'mouseup', this._clickThumb._$bind(this));
        this._keydownHandler = this._onKeyDown.bind(this);
        t._$addEvent(document, 'keydown', this._keydownHandler);
      },
      _getFocus: function (e) {
        var t = document.activeElement;
        if (!t) return !0;
        if (t == this.$refs.root || this.$refs.root.contains(t)) return !0;
        else return !1;
      },
      _clickRoot: function (e) {
        this.data.showThumb = !this.data.showThumb;
        this.$update();
        var n = t._$getElement(e);
        if (n != this.$refs.numinput) {
          this.$refs.root.tabIndex = -1;
          this.$refs.root.focus();
        }
      },
      _clickThumb: function (e) {
        t._$stopBubble(e);
      },
      _onKeyDown: function (e) {
        e = document.all ? window.event : e;
        if (this._getFocus()) {
          var t = e.keyCode || e.which;
          switch (t) {
            case 32:
              this._clickSpace(e);
              break;
            case 37:
              this._clickLeft(e);
              break;
            case 38:
              this._clickUp(e);
              break;
            case 39:
              this._clickRight(e);
              break;
            case 40:
              this._clickDown(e);
          }
        }
      },
      _clickSpace: function (e) {
        this.nextPage();
      },
      _clickLeft: function (e) {
        if (this.data.showThumb) this.prevPage();
        else this._movePage(0, -20);
      },
      _clickRight: function (e) {
        if (this.data.showThumb) this.nextPage();
        else this._movePage(0, 20);
      },
      _clickUp: function (e) {
        this._movePage(-20, 0);
      },
      _clickDown: function (e) {
        this._movePage(20, 0);
      },
      _movePage: function (e, t) {
        var n = this._viewer.getCurrentPageNode();
        if (n) {
          var i = n.scrollTop + e;
          var o = n.scrollLeft + t;
          if (n.scrollTo) n.scrollTo({ top: i, left: o, behavior: 'instant' });
          else {
            n.scrollTop = i;
            n.scrollLeft = o;
          }
        }
      },
      destroy: function () {
        this.supr();
        t._$delEvent(document, 'keydown', this._keydownHandler);
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
  'f051aeae7bb889518ead30ef6e491df3',
);
