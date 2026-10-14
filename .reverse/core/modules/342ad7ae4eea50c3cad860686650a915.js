EDU(
  '342ad7ae4eea50c3cad860686650a915',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      n = NEJ.F,
      i = e('nej.e'),
      o = e('nej.u'),
      a = e('nej.ut'),
      r = e('nej.ui'),
      s = e('edu.u'),
      c;
    if (!s._$$UIBase) {
      s._$$UIBase = NEJ.C();
      c = s._$$UIBase._$extend(a._$$Event);
      c.__init = function (e) {
        this.__supInit();
        i._$dumpCSSText();
        this.__initXGui(e);
        this.__initNode(e);
      };
      c.__reset = function (e) {
        this.__supReset(e);
        this.__doInitClass(e.clazz);
        this._$appendTo(e.parent);
      };
      c.__destroy = function () {
        this.__supDestroy();
        this.__doDelParentClass();
        delete this.__parent;
        i._$removeByEC(this.__body);
        i._$delClassName(this.__body, this.__class);
        delete this.__class;
      };
      c.__initXGui = n;
      c.__initNode = function () {
        if (!this.__seed_html) this.__initNodeTemplate();
        this.__body = i._$getNodeTemplate(this.__seed_html);
        if (!this.__body) this.__body = i._$create('div', this.__seed_css);
        i._$addClassName(this.__body, this.__seed_css);
      };
      c.__initNodeTemplate = n;
      c.__doInitClass = function (e) {
        this.__class = e || '';
        i._$addClassName(this.__body, this.__class);
      };
      c.__doAddParentClass = function () {
        if (this.__seed_css) i._$addClassName(this.__parent, this.__seed_css + '-parent');
      };
      c.__doDelParentClass = function () {
        if (this.__seed_css) i._$delClassName(this.__parent, this.__seed_css + '-parent');
      };
      c._$getBody = function () {
        return this.__body;
      };
      c._$appendTo = function (e) {
        if (!this.__body) return this;
        this.__doDelParentClass();
        if (o._$isFunction(e)) this.__parent = e(this.__body);
        else {
          this.__parent = i._$get(e);
          if (this.__parent) this.__parent.appendChild(this.__body);
        }
        this.__doAddParentClass();
        return this;
      };
      c._$show = function () {
        if (!this.__parent || !this.__body || this.__body.parentNode == this.__parent) return this;
        this.__parent.appendChild(this.__body);
        return this;
      };
      c._$hide = function () {
        i._$removeByEC(this.__body);
        return this;
      };
    }
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
