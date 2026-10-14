EDU(
  'ace54cbf8138d8966d0eb9bdc81de612',
  function (e, t, n) {
    var i = function () {
      this.init.call(this, arguments[0]);
    };
    var o = i.prototype;
    o.init = function (n) {
      var i = n.container;
      var o = n.defaultViewport;
      this.onThumbClick = n.onThumbClick;
      this.id = n.id;
      this.renderingId = 'thumbnail' + this.id;
      this.page = null;
      this.viewport = o;
      this.renderingState = t.INITIAL;
      this.rotation = 0;
      this.scale = n.scale || e.DEFAULT_SCALE;
      this.renderTask = null;
      this.imageWidth = Math.round(this.viewport.width);
      this.imageHeight = Math.round(this.viewport.height);
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
      c.style.width = this.imageWidth + 'px';
      c.style.height = this.imageHeight + 'px';
      c.style.left = (e.THUMBNAIL_WIDTH - this.imageWidth) / 2 + 'px';
      c.style.top = (e.THUMBNAIL_HEIGHT - this.imageHeight) / 2 + 'px';
      this.ring = c;
      r.appendChild(c);
      a.appendChild(r);
      i.appendChild(a);
    };
    o.setPage = function (e) {
      this.page = e;
      this.viewport = e.getViewport(this.scale);
      this.reset();
    };
    o.reset = function () {
      this.imageWidth = Math.round(this.viewport.width);
      this.imageHeight = Math.round(this.viewport.height);
      this.div.removeAttribute('data-loaded');
      var t = this.ring;
      var n = t.childNodes;
      for (var i = n.length - 1; i >= 0; i--) t.removeChild(n[i]);
      t.style.width = this.imageWidth + 'px';
      t.style.height = this.imageHeight + 'px';
      t.style.left = (e.THUMBNAIL_WIDTH - this.imageWidth) / 2 + 'px';
      t.style.top = (e.THUMBNAIL_HEIGHT - this.imageHeight) / 2 + 'px';
      if (this.imageNode) {
        this.imageNode.removeAttribute('src');
        delete this.imageNode;
      }
    };
    o.draw = function () {
      if (this.renderingState !== t.INITIAL) {
        console.error('Must be in new state before drawing');
        this.reset();
      }
      if (!this.page) {
        this.renderingState = t.FINISHED;
        return n.reject(new Error('Page is not loaded'));
      }
      this.renderingState = t.RUNNING;
      this.renderTask = this.page
        .render({ width: this.imageWidth, height: this.imageHeight })
        .then(
          function (e) {
            var i;
            this.imageNode = i = document.createElement('img');
            i.id = this.renderingId;
            i.className = 'thumbnailImage';
            i.style.width = this.imageWidth + 'px';
            i.style.height = this.imageHeight + 'px';
            i.src = e;
            this.ring.appendChild(i);
            this.div.setAttribute('data-loaded', !0);
            this.renderingState = t.FINISHED;
            return n.resolve(this.id);
          }._$bind(this),
        )
        ['catch'](function (e) {
          return n.reject(e);
        });
      return this.renderTask;
    };
    o.cancelRendering = function () {
      if (this.renderTask) this.renderTask = null;
      this.renderingState = t.INITIAL;
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
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
