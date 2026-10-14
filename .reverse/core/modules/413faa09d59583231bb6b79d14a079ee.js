EDU(
  '413faa09d59583231bb6b79d14a079ee',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$GroupManagerSingle = e._$klass();
    c = o._$$GroupManagerSingle._$extend(i._$$GroupManager);
    c.__reset = function (e) {
      this.__super(e);
      this.__classed = !!e.classed;
    };
    c.__destroy = function () {
      this.__super();
      delete this.__cmroot;
      delete this.__source;
    };
    c._$exitable = function (e) {
      if (!this.__source) return !0;
      var t = this.__source._$getData().module;
      if (n._$isModule(t)) t._$dispatchEvent('onbeforehide', e);
      return !e.stopped;
    };
    c._$refresh = function () {
      if (this.__source)
        window.setTimeout(this._$dispatchUMI._$bind(this, this.__source._$getPath()), 0);
    };
    c._$dispatchUMI = function (e) {
      if (this._$hasUMI(e)) {
        var i = n._$getNodeByUMI(this.__root, e),
          o = i._$getData();
        if (o.module) {
          var r = this.__source,
            s = o.event,
            c = a;
          this.__source = i;
          this.__doClearStopped(i);
          if (r) {
            c = r._$getData().event;
            s.referer = c.href || '';
          }
          if (r != i) {
            this.__cmroot = n._$getCommonRoot(this.__root, r, i);
            if (null != r) {
              if (r != this.__cmroot) {
                if (this.__classed) t._$delClassName(document.body, c.clazz);
                this.__doModuleHide(r, this.__cmroot);
              }
              this.__doModuleRefresh(this.__cmroot);
            } else this.__doModuleShow(this.__cmroot);
            if (i != this.__cmroot) {
              if (this.__classed) t._$addClassName(document.body, s.clazz);
              this.__doModuleShow(i, this.__cmroot);
            }
          } else this.__doModuleRefresh(this.__source);
        }
      }
    };
    c._$loadedUMI = function (e) {
      if (this._$hasUMI(e)) this.__doModuleAction(this.__source);
    };
    c._$hide = function () {
      if (this.__source) {
        this._$hideUMI(this.__source._$getPath());
        delete this.__cmroot;
        delete this.__source;
      }
    };
    return o;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '07b9b4da0bcd7558dcf83fe738e7fc75',
  'a3f36d6983db0409fb58d5aee101104d',
);
