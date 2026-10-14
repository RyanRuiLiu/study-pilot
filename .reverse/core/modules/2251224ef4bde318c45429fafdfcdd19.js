EDU(
  '2251224ef4bde318c45429fafdfcdd19',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l;
    r._$$Abstract = t._$klass();
    l = r._$$Abstract._$extend(o._$$EventTarget);
    l.__init = function () {
      this.__super();
      n._$dumpCSSText();
      this.__initXGui();
      this.__initNode();
    };
    l.__reset = function (e) {
      this.__super(e);
      this.__doInitClass(e.clazz);
      this.__doInitDataset(e.dataset);
      this._$appendTo(e.parent);
    };
    l.__destroy = function () {
      this.__super();
      this.__doDelParentClass();
      this.__doDelParentDataset();
      delete this.__parent;
      n._$removeByEC(this.__body);
      n._$delClassName(this.__body, this.__class);
      delete this.__class;
    };
    l.__initXGui = c;
    l.__initNode = function () {
      if (!this.__seed_html) this.__initNodeTemplate();
      this.__body = a._$getNodeTemplate(this.__seed_html);
      if (!this.__body) this.__body = n._$create('div', this.__seed_css);
      n._$addClassName(this.__body, this.__seed_css);
    };
    l.__initNodeTemplate = c;
    l.__doInitClass = function (e) {
      this.__class = e || '';
      n._$addClassName(this.__body, this.__class);
    };
    l.__doInitDataset = function (e) {
      this.__datamap = i._$merge({}, e);
      n._$dataset(this.__body, this.__datamap);
    };
    l.__doDelParentDataset = function () {
      i._$forIn(
        this.__datamap,
        function (e, t) {
          n._$dataset(this.__body, t, '');
        },
        this,
      );
    };
    l.__doAddParentClass = function () {
      if (this.__seed_css) {
        var e = this.__seed_css.split(/\s+/);
        n._$addClassName(this.__parent, e.pop() + '-parent');
      }
    };
    l.__doDelParentClass = function () {
      if (this.__seed_css) {
        var e = this.__seed_css.split(/\s+/);
        n._$delClassName(this.__parent, e.pop() + '-parent');
      }
    };
    l._$getBody = function () {
      return this.__body;
    };
    l._$appendTo = function (e) {
      if (this.__body) {
        this.__doDelParentClass();
        if (i._$isFunction(e)) this.__parent = e(this.__body);
        else {
          this.__parent = n._$get(e);
          if (this.__parent) this.__parent.appendChild(this.__body);
        }
        this.__doAddParentClass();
      }
    };
    l._$show = function () {
      if (this.__parent && this.__body && this.__body.parentNode != this.__parent)
        this.__parent.appendChild(this.__body);
    };
    l._$hide = function () {
      n._$removeByEC(this.__body);
    };
    if (!0) e.copy(e.P('nej.ui'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
