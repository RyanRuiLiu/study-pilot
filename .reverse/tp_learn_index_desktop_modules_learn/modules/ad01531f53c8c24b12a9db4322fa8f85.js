EDU(
  'ad01531f53c8c24b12a9db4322fa8f85',
  function (e, t, i, n, a, o, s, r, c) {
    var d;
    o._$$Suggest = t._$klass();
    d = o._$$Suggest._$extend(n._$$EventTarget);
    d.__init = function () {
      this.__sopt = {
        loopable: !0,
        onselect: this.__onSelect._$bind(this),
        onchange: this.__onSelectionChange._$bind(this),
      };
      this.__super();
    };
    d.__reset = function (e) {
      this.__super(e);
      this.__auto = !!e.autofill;
      this.__input = i._$get(e.input);
      this.__sopt.clazz = e.clazz;
      this.__sopt.parent = i._$get(e.body);
      this.__sopt.selected = e.selected || 'js-selected';
      this.__doInitDomEvent([
        [this.__input, 'input', this.__onInput._$bind(this)],
        [this.__input, 'focus', this.__onInput._$bind(this)],
      ]);
      if (!e.noblur) this.__doInitDomEvent([[this.__input, 'blur', this.__onBlur._$bind(this)]]);
      this._$visibile(!1);
      this.__helper = a._$$SelectHelper._$allocate(this.__sopt);
    };
    d.__destroy = function () {
      this.__super();
      if (this.__helper) {
        this.__helper._$recycle();
        delete this.__helper;
      }
      delete this.__xxx;
      delete this.__input;
      delete this.__sopt.parent;
    };
    d.__onBlur = function () {
      this.__onSelect({ target: this.__helper._$getSelectedNode() });
    };
    d.__onInput = function () {
      var e = this.__input.value.trim();
      if (!e) this._$visibile(!1);
      else if (!this.__xxx) this._$dispatchEvent('onchange', e);
    };
    d.__doUpdateValue = function (e) {
      if (!this.__xxx) {
        this.__xxx = !0;
        if (e && e != this.__input.value) this.__input.value = e;
        this.__xxx = !1;
      }
    };
    d.__onSelect = function (e) {
      var t = i._$dataset(e.target, 'value') || '';
      this.__doUpdateValue(t);
      t = t || this.__input.value;
      this._$update('');
      this._$dispatchEvent('onselect', t, { target: e.target, enter: e.enter, value: t });
    };
    d.__onSelectionChange = function (e) {
      if (this.__auto) this.__doUpdateValue(i._$dataset(e.target, 'value') || '');
    };
    d._$setList = function (e) {
      this._$visibile(!!e && e.length > 0);
    };
    d._$visibile = function (e) {
      var e = !e ? 'hidden' : 'visible';
      this.__sopt.parent.style.visibility = e;
      if ('hidden' === e) this.__sopt.parent.innerHTML = '';
    };
    d._$update = function (e) {
      this.__sopt.parent.innerHTML = e || '&nbsp;';
      this._$visibile(!!e);
    };
    if (!0) e.copy(e.P('nej.ut'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'aa75ab57e1533bbc2fc6aea356d2ba42',
);
