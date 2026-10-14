EDU(
  '8b3037c016b81c2866ad092beeeac865',
  function (e, t, n, i) {
    var o = function () {
      this.init.call(this, arguments[0]);
    };
    var a = o.prototype;
    a.init = function (n) {
      var i = n.container;
      var o = n.defaultViewport;
      this.id = n.id;
      this.renderingId = 'page' + this.id;
      this.page = null;
      this.rotation = 0;
      this.scale = n.scale || e.DEFAULT_SCALE;
      this.viewport = o;
      this.picPageRotate = o.rotation;
      this.renderingState = t.INITIAL;
      this.renderTask = null;
      this.onBeforeDraw = n.onBeforeDraw;
      this.onAfterDraw = n.onAfterDraw;
      var a = document.createElement('div');
      a.className = 'page';
      a.style.width = Math.floor(this.scale * this.viewport.width) + 'px';
      a.style.height = Math.floor(this.scale * this.viewport.height) + 'px';
      a.setAttribute('data-page-number', this.id);
      this.div = a;
      i.appendChild(a);
    };
    a.reset = function () {
      this.cancelRendering();
      var e = this.div;
      e.style.width = Math.floor(this.viewport.width) + 'px';
      e.style.height = Math.floor(this.viewport.height) + 'px';
      var t = e.childNodes;
      for (var n = t.length - 1; n >= 0; n--) e.removeChild(t[n]);
      e.removeAttribute('data-loaded');
      this.loadingIconDiv = document.createElement('div');
      this.loadingIconDiv.className = 'loadingIcon';
      e.appendChild(this.loadingIconDiv);
      if (this.image) {
        this.image.removeAttribute('src');
        delete this.image;
      }
    };
    a.setPage = function (e) {
      this.page = e;
      this.viewport = e.getViewport(this.scale);
      this.reset();
    };
    a.update = function (e, t) {
      if (this.page && this.image) {
        this.scale = e || this.scale;
        if ('undefined' != typeof t) this.rotation = t;
        var n = (this.rotation + this.picPageRotate) % 360;
        this.viewport = this.page.getViewport(this.scale, n);
        this.cssTransform(this.image);
      }
    };
    a.cssTransform = function (e) {
      var t = this.viewport.width;
      var n = this.viewport.height;
      var i = this.div;
      e.style.width = i.style.width = Math.floor(t) + 'px';
      e.style.height = i.style.height = Math.floor(n) + 'px';
    };
    a.getWidth = function () {
      return this.viewport.width;
    };
    a.getHeight = function () {
      return this.viewport.height;
    };
    a.draw = function () {
      if (this.renderingState !== t.INITIAL) {
        console.error('Must be in new state before drawing');
        this.reset();
      }
      if (!this.page) {
        this.renderingState = t.FINISHED;
        return i.reject(new Error('Page is not loaded'));
      }
      var e = this.div;
      if (this.onBeforeDraw) this.onBeforeDraw(this);
      this.renderingState = t.RUNNING;
      this.renderTask = this.page
        .render()
        .then(
          function (n) {
            var o;
            this.image = o = document.createElement('img');
            o.id = this.renderingId;
            o.className = 'viewerImage';
            o.style.width = e.style.width;
            o.style.height = e.style.height;
            e.appendChild(o);
            o.src = n;
            e.setAttribute('data-loaded', !0);
            if (this.loadingIconDiv) {
              e.removeChild(this.loadingIconDiv);
              delete this.loadingIconDiv;
            }
            this.renderingState = t.FINISHED;
            if (this.onAfterDraw) this.onAfterDraw(this);
            return i.resolve(this.id);
          }._$bind(this),
        )
        ['catch'](function (e) {
          return i.reject(e);
        });
      return this.renderTask;
    };
    a.cancelRendering = function () {
      if (this.renderTask) this.renderTask = null;
      this.renderingState = t.INITIAL;
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
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
