EDU(
  'e83a00cddb870f1d80ccdcf07ebe03b4',
  function (e, t, n, i) {
    var o = function () {
      this.init.call(this, arguments[0]);
    };
    var a = o.prototype;
    a.init = function (e) {
      var o = e.container;
      var a = e.defaultViewport;
      this.pdfViewer = e.pdfViewer;
      this.id = e.id;
      this.renderingId = 'page' + this.id;
      this.page = null;
      this.rotation = 0;
      this.scale = e.scale || t.DEFAULT_SCALE;
      this.viewport = a;
      this.pageRotate = a.rotation;
      this.hasRestrictedScaling = !1;
      this.renderInteractiveForms = e.renderInteractiveForms || !1;
      this.paintTask = null;
      this.paintedViewportMap = new n();
      this.renderingState = i.INITIAL;
      this.resume = null;
      this.error = null;
      this.onBeforeDraw = e.onBeforeDraw;
      this.onAfterDraw = e.onAfterDraw;
      this.zoomLayer = null;
      var s = document.createElement('div');
      s.className = 'page';
      s.style.width = Math.floor(this.scale * this.viewport.width) + 'px';
      s.style.height = Math.floor(this.scale * this.viewport.height) + 'px';
      s.setAttribute('data-page-number', this.id);
      this.div = s;
      o.appendChild(s);
    };
    a.setPage = function (e) {
      this.page = e;
      this.pageRotate = e.rotate;
      var n = (this.rotation + this.pageRotate) % 360;
      this.viewport = e.getViewport(this.scale * t.CSS_UNITS, n);
      this.stats = e.stats;
      this.reset();
    };
    a.reset = function (e) {
      this.cancelRendering();
      var t = this.div;
      t.style.width = Math.floor(this.viewport.width) + 'px';
      t.style.height = Math.floor(this.viewport.height) + 'px';
      var n = t.childNodes;
      var i = (e && this.zoomLayer) || null;
      for (var o = n.length - 1; o >= 0; o--) {
        var a = n[o];
        if (i !== a) t.removeChild(a);
        else;
      }
      t.removeAttribute('data-loaded');
      if (!i) {
        if (this.canvas) {
          this.paintedViewportMap['delete'](this.canvas);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
        }
        this._resetZoomLayer();
      }
      this.loadingIconDiv = document.createElement('div');
      this.loadingIconDiv.className = 'loadingIcon';
      t.appendChild(this.loadingIconDiv);
    };
    a.update = function (e, n) {
      this.scale = e || this.scale;
      if ('undefined' != typeof n) this.rotation = n;
      var i = (this.rotation + this.pageRotate) % 360;
      this.viewport = this.viewport.clone({ scale: this.scale * t.CSS_UNITS, rotation: i });
      var o = !1;
      if (this.canvas && t.MAX_CANVAS_PIXELS > 0) {
        var a = this.outputScale;
        if (
          ((Math.floor(this.viewport.width) * a.sx) | 0) *
            ((Math.floor(this.viewport.height) * a.sy) | 0) >
          t.MAX_CANVAS_PIXELS
        )
          o = !0;
      }
      if (this.canvas) {
        if (this.hasRestrictedScaling && o) {
          this.cssTransform(this.canvas, !0);
          return;
        }
        if (!this.zoomLayer && !this.canvas.hasAttribute('hidden')) {
          this.zoomLayer = this.canvas.parentNode;
          this.zoomLayer.style.position = 'absolute';
        }
      }
      this.reset(!0);
    };
    a.cancelRendering = function () {
      if (this.paintTask) {
        this.paintTask.cancel();
        this.paintTask = null;
      }
      this.renderingState = i.INITIAL;
      this.resume = null;
    };
    a.cssTransform = function (e) {
      var t = this.viewport.width;
      var n = this.viewport.height;
      var i = this.div;
      e.style.width = e.parentNode.style.width = i.style.width = Math.floor(t) + 'px';
      e.style.height = e.parentNode.style.height = i.style.height = Math.floor(n) + 'px';
      var o = this.viewport.rotation - this.paintedViewportMap.get(e).rotation;
      var a = Math.abs(o);
      var s = 1,
        r = 1;
      if (90 === a || 270 === a) {
        s = n / t;
        r = t / n;
      }
      var c = 'rotate(' + o + 'deg) scale(' + s + ',' + r + ')';
      PDFJS.CustomStyle.setProp('transform', e, c);
    };
    a._resetZoomLayer = function (e) {
      if (this.zoomLayer) {
        var t = this.zoomLayer.firstChild;
        this.paintedViewportMap['delete'](t);
        t.width = 0;
        t.height = 0;
        if (e) this.zoomLayer.remove();
        this.zoomLayer = null;
      }
    };
    a.getWidth = function () {
      return this.viewport.width;
    };
    a.getHeight = function () {
      return this.viewport.height;
    };
    a.draw = function () {
      if (this.renderingState !== i.INITIAL) {
        console.error('Must be in new state before drawing');
        this.reset();
      }
      if (!this.page) {
        this.renderingState = i.FINISHED;
        return Promise.reject(new Error('Page is not loaded'));
      }
      this.renderingState = i.RUNNING;
      var e = this.page;
      var t = this.div;
      var n = this;
      var o = document.createElement('div');
      o.style.width = t.style.width;
      o.style.height = t.style.height;
      o.classList.add('canvasWrapper');
      t.appendChild(o);
      var a = function (e) {
        this.renderingState = i.RUNNING;
        e();
      }._$bind(this);
      var s = function (o) {
        if (r === n.paintTask) n.paintTask = null;
        if (o)
          if ('cancelled' === o) {
            console.error('finishPaintTask, but error:' + o);
            n.error = null;
            return Promise.resolve(void 0);
          }
        n.renderingState = i.FINISHED;
        if (n.loadingIconDiv) {
          t.removeChild(n.loadingIconDiv);
          delete n.loadingIconDiv;
        }
        n._resetZoomLayer(!0);
        n.error = o;
        n.stats = e.stats;
        if (n.onAfterDraw) n.onAfterDraw();
        if (o) return Promise.reject(o);
        else return Promise.resolve(n.id);
      };
      var r = this.paintOnCanvas(o);
      r.onRenderContinue = a;
      this.paintTask = r;
      var c = r.promise.then(
        function () {
          return s(null);
        },
        function (e) {
          return s(e);
        },
      );
      t.setAttribute('data-loaded', !0);
      if (this.onBeforeDraw) this.onBeforeDraw(this);
      return c;
    };
    a.paintOnCanvas = function (n) {
      var i = PDFJS.createPromiseCapability();
      var o = {
        promise: i.promise,
        onRenderContinue: function (e) {
          e();
        },
        cancel: function () {
          b.cancel();
        },
      };
      var a = this.viewport;
      var s = document.createElement('canvas');
      s.id = this.renderingId;
      s.setAttribute('hidden', 'hidden');
      var r = !0;
      var c = function () {
        if (r) {
          s.removeAttribute('hidden');
          r = !1;
        }
      };
      n.appendChild(s);
      this.canvas = s;
      var d = s.getContext('2d', { alpha: !1 });
      var l = e.getOutputScale(d);
      this.outputScale = l;
      if (t.MAX_CANVAS_PIXELS > 0) {
        var _ = a.width * a.height;
        var u = Math.sqrt(t.MAX_CANVAS_PIXELS / _);
        if (l.sx > u || l.sy > u) {
          l.sx = u;
          l.sy = u;
          l.scaled = !0;
          this.hasRestrictedScaling = !0;
        } else this.hasRestrictedScaling = !1;
      }
      var f = e.approximateFraction(l.sx);
      var h = e.approximateFraction(l.sy);
      s.width = e.roundToDivide(a.width * l.sx, f[0]);
      s.height = e.roundToDivide(a.height * l.sy, h[0]);
      s.style.width = e.roundToDivide(a.width, f[1]) + 'px';
      s.style.height = e.roundToDivide(a.height, h[1]) + 'px';
      this.paintedViewportMap.set(s, a);
      var p = !l.scaled ? null : [l.sx, 0, 0, l.sy, 0, 0];
      var m = {
        canvasContext: d,
        transform: p,
        viewport: this.viewport,
        renderInteractiveForms: this.renderInteractiveForms,
      };
      var b = this.page.render(m);
      b.onContinue = function (e) {
        c();
        if (o.onRenderContinue) o.onRenderContinue(e);
        else e();
      };
      b.promise.then(
        function () {
          c();
          i.resolve(void 0);
        },
        function (e) {
          c();
          i.reject(e);
        },
      );
      return o;
    };
    a.destroy = function () {
      this.reset();
      if (this.page) {
        this.page.cleanup();
        this.page = null;
      }
    };
    return o;
  },
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  'ae4ab8cf92c001207f476c97db0b65c2',
  'c713e1ea371d7be585e8229c82c025f6',
);
