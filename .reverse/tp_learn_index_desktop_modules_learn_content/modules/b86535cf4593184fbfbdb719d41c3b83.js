EDU(
  'b86535cf4593184fbfbdb719d41c3b83',
  function (e, t, n) {
    e._$pushCSSText(t);
    var i = 18;
    var o = 300;
    var a = 20;
    var s = 240;
    var r = 120;
    if (n._$isMobileAll()) {
      i = 15;
      o = 180;
      s = 70;
      r = 70;
    }
    var c = function () {
      this.init.call(this, arguments[0]);
    };
    var d = c.prototype;
    d.init = function (t) {
      this._element = t.element;
      this._content = t.content;
      if (this._content) {
        e._$dumpCSSText();
        this.update(!0);
      }
    };
    d.update = function () {
      if (this._element && this._content) {
        var e = this._element.offsetHeight;
        var t = this._element.offsetWidth;
        this._height = 2 * e;
        this._width = 2 * t;
        this._numX = parseInt(this._width / o);
        this._numY = parseInt(this._height / a);
        if (!this._div) {
          this._div = document.createElement('div');
          this._div.className = 'ux-watermark';
          this._element.appendChild(this._div);
          this._divw = document.createElement('div');
          this._divw.className = 'ux-watermark_w';
          this._div.appendChild(this._divw);
        }
        this._divw.style.width = this._width + 'px';
        this._divw.style.height = this._height + 'px';
        this._divw.style.top = -this._height / 4 + 'px';
        this._divw.style.left = -this._width / 4 + 'px';
        this._divw.innerHTML = '';
        var n = '';
        for (var i = 1; i <= this._numY; i++)
          for (var s = 1; s <= this._numX; s++) n += this._getWaterMarkItem(s, i);
        this._divw.innerHTML = n;
      }
    };
    d._getWaterMarkItem = function (e, t) {
      var n = 0,
        c = 0;
      var d = c + (o + s) * (e - 1);
      var l = n + (a + r) * (t - 1);
      if (t % 2 == 0) d += 300;
      return (
        '<div class="ux-watermark_item f-thide" style="font-size:' +
        i +
        'px; width:' +
        o +
        'px; left:' +
        d +
        'px; top:' +
        l +
        'px;">' +
        this._content +
        '</div>'
      );
    };
    return c;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '0e333ec44c0b303a47a48ae755ccb373',
  'beec6201069596ecb83a09e5fc3eb415',
);
