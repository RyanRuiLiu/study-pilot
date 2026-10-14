EDU(
  'd6c071332c7308ee7aac884791446059',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l;
    r._$$ModuleAbstract = t._$klass();
    l = r._$$ModuleAbstract._$extend(o._$$EventTarget);
    l.__init = function (e) {
      this.__super(e);
      this.__export = {};
      this.__doBuild(e.config);
    };
    l.__reset = function (e) {
      this.__super(e);
      this.__umi = e.umi || '';
      this.__dispatcher = e.dispatcher;
      this.__composites = e.composite || s;
      this._$batEvent({
        onshow: this.__onShow._$bind(this),
        onhide: this.__onHide._$bind(this),
        onrefresh: this.__onRefresh._$bind(this),
        onmessage: this.__onMessage._$bind(this),
        onbeforehide: this.__onBeforeHide._$bind(this),
      });
    };
    l.__destroy = function () {
      this.__super();
      this.__export = {};
      delete this.__umi;
      delete this.__composites;
      delete this.__dispatcher;
    };
    l.__stop = function (e) {
      if (e) e.stopped = !0;
    };
    l.__doBuild = c;
    l.__onBeforeHide = c;
    l.__doClearComponentExDsp = (function () {
      var e = function (e) {
        return !!a._$$Dispatcher && e instanceof a._$$Dispatcher;
      };
      return function () {
        this.__doClearComponent(e);
      };
    })();
    l.__onMessage = c;
    l.__doSendMessage = function (e, t, n) {
      this.__dispatcher._$message({ to: e, mode: n || 0, data: t, from: this.__umi });
    };
    l.__doPublishMessage = function (e, t) {
      this.__dispatcher._$publish(e, { from: this.__umi, data: t });
    };
    l.__doSubscribeMessage = function () {
      this.__dispatcher._$subscribe.apply(this.__dispatcher, arguments);
    };
    l._$getExportData = function () {
      return this.__export;
    };
    l.__doParseParent = function (e) {
      var t;
      if (!t) {
        var i = e.input || s;
        t = n._$get(i.parent);
      }
      if (!t) {
        var i = e.data || s;
        t = n._$get(i.parent);
      }
      if (!t) t = n._$get(e.parent);
      return t;
    };
    l.__onShow = function (e) {
      var t = this.__doParseParent(e);
      if (t && this.__body) t.appendChild(this.__body);
      this.__doApplyComposite('onshow', e);
      this.__onRefresh(e);
    };
    l.__onRefresh = function (e) {
      this.__doApplyComposite('onrefresh', e);
    };
    l.__onHide = function () {
      this.__doHideComposite();
      n._$removeByEC(this.__body);
    };
    l.__isEscapedComposite = (function () {
      var e = /^onshow|onrefresh|delay$/;
      return function (t) {
        return e.test(t);
      };
    })();
    l.__doGenCompositeParam = c;
    l.__doApplyComposite = (function () {
      var e = function (e, t, n, i) {
        if (!this.__isEscapedComposite(i)) {
          if (e) n += (n.indexOf('?') > 1 ? '&' : '?') + e;
          var o = this.__doGenCompositeParam(i, t) || {};
          o.location = t;
          o.parent = this.__export[i];
          this.__dispatcher._$redirect(n, { input: o });
        }
      };
      return function (t, n) {
        if (!n.nodelay) {
          if (this.__composites.delay) return;
          var o = this.__composites[t] || s;
          if (o.delay) return;
        }
        var a = i._$object2query(n.param) || '';
        if ('onrefresh' == t) i._$loop(this.__composites, e._$bind(this, a, n));
        i._$loop(o, e._$bind(this, a, n));
      };
    })();
    l.__doHideComposite = (function () {
      var e = function (e, t) {
        if (!this.__isEscapedComposite(t)) this.__dispatcher._$hide(e);
      };
      return function () {
        i._$loop(this.__composites, e, this);
        i._$loop(this.__composites.onshow, e, this);
        i._$loop(this.__composites.onrefresh, e, this);
      };
    })();
    r._$regist = (function () {
      var e;
      r._$dumpModules = function () {
        if (e) {
          i._$loop(e, function (e, t) {
            dispatcher._$loaded(t, e);
          });
          e = null;
        }
      };
      return function (t, n) {
        if (window.dispatcher) dispatcher._$loaded.apply(dispatcher, arguments);
        else {
          if (!e) e = {};
          e[t] = n;
        }
      };
    })();
    if (!0) {
      e.P('nej.e')._$regist = r._$regist;
      e.P('nej.ut')._$$Module = r._$$ModuleAbstract;
      e.P('nej.ut')._$$AbstractModule = r._$$ModuleAbstract;
    }
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '2b0ffed5486d600563959948fa2ea3e2',
);
