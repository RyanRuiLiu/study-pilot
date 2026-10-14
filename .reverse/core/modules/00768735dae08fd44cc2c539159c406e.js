EDU(
  '00768735dae08fd44cc2c539159c406e',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l,
      u = 6e4;
    r._$$LoaderAbstract = t._$klass();
    l = r._$$LoaderAbstract._$extend(a._$$EventTarget);
    l.__init = function () {
      this.__super();
      this.__qopt = {
        onerror: this.__onQueueError._$bind(this),
        onload: this.__onQueueLoaded._$bind(this),
      };
      if (!this.constructor.__cache) this.constructor.__cache = { loaded: {} };
    };
    l.__reset = function (e) {
      this.__super(e);
      this.__version = e.version;
      this.__timeout = e.timeout;
      this.__qopt.version = this.__version;
      this.__qopt.timeout = this.__timeout;
    };
    l.__delLoadData = function (e) {
      delete this.constructor.__cache[e];
    };
    l.__getLoadData = function (e) {
      return this.constructor.__cache[e];
    };
    l.__setLoadData = function (e, t) {
      this.constructor.__cache[e] = t;
    };
    l.__getRequest = c;
    l.__doClearRequest = function (e) {
      i._$clearEvent(e);
    };
    l.__doRequest = function (e) {
      e.src = this.__url;
      document.head.appendChild(e);
    };
    l.__doClear = function () {
      var e = this.__getLoadData(this.__url);
      if (e) {
        window.clearTimeout(e.timer);
        this.__doClearRequest(e.request);
        delete e.bind;
        delete e.timer;
        delete e.request;
        this.__delLoadData(this.__url);
        this.__getLoadData('loaded')[this.__url] = !0;
      }
    };
    l.__doCallback = function (e) {
      var t = this.__getLoadData(this.__url);
      if (t) {
        var n = t.bind;
        this.__doClear();
        if (n && n.length > 0) {
          var i;
          for (; n.length;) {
            i = n.shift();
            try {
              i._$dispatchEvent(e, arguments[1]);
            } catch (o) {
              if (!1) throw o;
              console.error(o.message);
              console.error(o.stack);
            }
            i._$recycle();
          }
        }
      }
    };
    l.__onError = function (e) {
      this.__doCallback('onerror', e);
    };
    l.__onLoaded = function () {
      this.__doCallback('onload');
    };
    l.__doLoadQueue = function (e) {
      this.constructor._$allocate(this.__qopt)._$load(e);
    };
    l.__onQueueCheck = function (e) {
      var t = this.__getLoadData(this.__key);
      if (t) {
        if (e) t.error++;
        t.loaded++;
        if (!(t.loaded < t.total)) {
          this.__delLoadData(this.__key);
          this._$dispatchEvent(t.error > 0 ? 'onerror' : 'onload');
        }
      }
    };
    l.__onQueueError = function (e) {
      this.__onQueueCheck(!0);
    };
    l.__onQueueLoaded = function () {
      this.__onQueueCheck();
    };
    l._$load = function (e) {
      e = o._$absolute(e);
      if (e) {
        this.__url = e;
        if (this.__version)
          this.__url += (this.__url.indexOf('?') < 0 ? '?' : '&') + this.__version;
        if (!this.__getLoadData('loaded')[this.__url]) {
          var t = this.__getLoadData(this.__url),
            a;
          if (t) {
            t.bind.unshift(this);
            t.timer = window.clearTimeout(t.timer);
          } else {
            a = this.__getRequest();
            t = { request: a, bind: [this] };
            this.__setLoadData(this.__url, t);
            i._$addEvent(a, 'load', this.__onLoaded._$bind(this));
            i._$addEvent(
              a,
              'error',
              this.__onError._$bind(this, {
                code: n._$CODE_ERRSERV,
                message: '无法加载指定资源文件[' + this.__url + ']！',
              }),
            );
          }
          if (0 != this.__timeout)
            t.timer = window.setTimeout(
              this.__onError._$bind(this, {
                code: n._$CODE_TIMEOUT,
                message: '指定资源文件[' + this.__url + ']载入超时！',
              }),
              this.__timeout || u,
            );
          if (a) this.__doRequest(a);
          this._$dispatchEvent('onloading');
        } else {
          try {
            this._$dispatchEvent('onload');
          } catch (r) {
            if (!1) throw r;
            console.error(r.message);
            console.error(r.stack);
          }
          this._$recycle();
        }
      } else
        this._$dispatchEvent('onerror', {
          code: n._$CODE_NOTASGN,
          message: '请指定要载入的资源地址！',
        });
    };
    l._$queue = function (e) {
      if (e && e.length) {
        this.__key = o._$uniqueID();
        var t = { error: 0, loaded: 0, total: e.length };
        this.__setLoadData(this.__key, t);
        o._$forEach(
          e,
          function (e, n) {
            if (e) this.__doLoadQueue(e);
            else t.total--;
          },
          this,
        );
        this._$dispatchEvent('onloading');
      } else
        this._$dispatchEvent('onerror', {
          code: n._$CODE_NOTASGN,
          message: '请指定要载入的资源队列！',
        });
    };
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '8b5c7ec5f50504fcb779ea6190a77347',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
