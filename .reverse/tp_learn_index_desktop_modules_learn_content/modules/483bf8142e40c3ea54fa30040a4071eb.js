EDU(
  '483bf8142e40c3ea54fa30040a4071eb',
  function (e, t, n) {
    var i = function () {
      this.init.call(this, arguments[0]);
    };
    var o = i.prototype;
    o.init = function (e) {
      var i = e.container;
      var o = e.defaultViewport;
      this.onThumbClick = e.onThumbClick;
      this.id = e.id;
      this.renderingId = 'thumbnail' + this.id;
      this.page = null;
      this.viewport = o;
      this.renderingState = n.INITIAL;
      this.rotation = 0;
      this.pageRotate = o.rotation;
      this.renderTask = null;
      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this._getCanvasSize();
      var a = document.createElement('a');
      var s = this;
      a.onclick = function () {
        s.onThumbClick && s.onThumbClick(s.id);
      };
      this.anchor = a;
      var r = document.createElement('div');
      r.className = 'thumbnail';
      r.setAttribute('data-page-number', this.id);
      this.div = r;
      var c = document.createElement('div');
      c.className = 'thumbnailSelectionRing';
      c.style.width = this.canvasWidth + 'px';
      c.style.height = this.canvasHeight + 'px';
      c.style.left = (t.THUMBNAIL_WIDTH - this.canvasWidth) / 2 + 'px';
      c.style.top = (t.THUMBNAIL_HEIGHT - this.canvasHeight) / 2 + 'px';
      this.ring = c;
      r.appendChild(c);
      a.appendChild(r);
      i.appendChild(a);
    };
    o.setPage = function (e) {
      this.page = e;
      this.pageRotate = e.rotate;
      var t = (this.rotation + this.pageRotate) % 360;
      this.viewport = e.getViewport(1, t);
      this.reset();
    };
    o._getCanvasSize = function () {
      this.pageRatio = this.pageWidth / this.pageHeight;
      var e = t.THUMBNAIL_WIDTH / t.THUMBNAIL_HEIGHT;
      if (this.pageRatio > e) {
        this.canvasWidth = t.THUMBNAIL_WIDTH;
        this.canvasHeight = this.canvasWidth / this.pageRatio;
      } else {
        this.canvasHeight = t.THUMBNAIL_HEIGHT;
        this.canvasWidth = this.canvasHeight * this.pageRatio;
      }
      this.scale = this.canvasWidth / this.pageWidth;
    };
    o.reset = function () {
      this.cancelRendering();
      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this._getCanvasSize();
      this.div.removeAttribute('data-loaded');
      var e = this.ring;
      var n = e.childNodes;
      for (var i = n.length - 1; i >= 0; i--) e.removeChild(n[i]);
      e.style.width = this.canvasWidth + 'px';
      e.style.height = this.canvasHeight + 'px';
      e.style.left = (t.THUMBNAIL_WIDTH - this.canvasWidth) / 2 + 'px';
      e.style.top = (t.THUMBNAIL_HEIGHT - this.canvasHeight) / 2 + 'px';
      if (this.canvas) {
        this.canvas.width = 0;
        this.canvas.height = 0;
        delete this.canvas;
      }
      if (this.image) {
        this.image.removeAttribute('src');
        delete this.image;
      }
    };
    o.cancelRendering = function () {
      if (this.renderTask) {
        this.renderTask.cancel();
        this.renderTask = null;
      }
      this.renderingState = n.INITIAL;
    };
    o.draw = function () {
      if (this.renderingState !== n.INITIAL) {
        console.error('Must be in new state before drawing');
        return Promise.resolve(void 0);
      }
      this.renderingState = n.RUNNING;
      var e = this;
      var t = function (t) {
        if (c === e.paintTask) e.paintTask = null;
        e.renderingState = n.FINISHED;
        e._convertCanvasToImage();
        if (!t) o.resolve(void 0);
        else o.reject(t);
      };
      var i = function (t) {
        e.renderingState = n.RUNNING;
        t();
      };
      var o = PDFJS.createPromiseCapability();
      var a = this._getPageDrawContext();
      var s = this.viewport.clone({ scale: this.scale });
      var r = { canvasContext: a, viewport: s };
      var c = (this.renderTask = this.page.render(r));
      c.onContinue = i;
      c.promise.then(
        function () {
          t(null);
        },
        function (e) {
          t(e);
        },
      );
      return o.promise;
    };
    o._getPageDrawContext = function () {
      var t = document.createElement('canvas');
      this.canvas = t;
      var n = t.getContext('2d', { alpha: !1 });
      var i = e.getOutputScale(n);
      t.width = (this.canvasWidth * i.sx) | 0;
      t.height = (this.canvasHeight * i.sy) | 0;
      t.style.width = this.canvasWidth + 'px';
      t.style.height = this.canvasHeight + 'px';
      if (i.scaled) n.scale(i.sx, i.sy);
      return n;
    };
    o._convertCanvasToImage = function () {
      if (this.canvas)
        if (this.renderingState === n.FINISHED) {
          var e = this.renderingId;
          var t = 'thumbnailImage';
          var i = document.createElement('img');
          i.id = e;
          i.className = t;
          i.style.width = this.canvasWidth + 'px';
          i.style.height = this.canvasHeight + 'px';
          i.src = this.canvas.toDataURL();
          this.image = i;
          this.div.setAttribute('data-loaded', !0);
          this.ring.appendChild(i);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
        }
    };
    o.destroy = function () {
      this.reset();
      if (this.page) {
        this.page.cleanup();
        this.page = null;
      }
    };
    return i;
  },
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
);
