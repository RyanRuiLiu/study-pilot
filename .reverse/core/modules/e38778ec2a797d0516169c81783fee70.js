EDU(
  'e38778ec2a797d0516169c81783fee70',
  function (e, t, n, i, o, a, r, s, c) {
    var d;
    a._$$Layer = t._$klass();
    d = a._$$Layer._$extend(o._$$Abstract);
    d.__reset = function (e) {
      this.__super(e);
      this._$setEvent('oncontentready', e.oncontentready || this.__doInitContent._$bind(this));
      this.__nohack = !!e.nohack;
      this.__destroyable = !!e.destroyable;
      this._$setContent(e.content);
    };
    d.__destroy = function () {
      this._$dispatchEvent('onbeforerecycle');
      this.__super();
      this.__doHide();
      this._$setContent('');
      n._$style(this.__body, { top: '', left: '' });
    };
    d.__doInitContent = s;
    d.__doPositionAlign = s;
    d.__doHide = function () {
      n._$removeByEC(this.__body);
      if (this.__mask) {
        n._$unmask(this.__body);
        delete this.__mask;
      }
    };
    d._$setContent = function (e) {
      if (this.__body && this.__ncnt && null != e) {
        e = e || '';
        i._$isString(e) ? (this.__ncnt.innerHTML = e) : this.__ncnt.appendChild(e);
        this._$dispatchEvent('oncontentready', this.__ncnt);
      }
    };
    d._$setPosition = function (e) {
      var t = e.top;
      if (null != t) {
        t += 'px';
        n._$setStyle(this.__body, 'top', t);
        n._$setStyle(this.__mask, 'top', t);
      }
      var t = e.left;
      if (null != t) {
        t += 'px';
        n._$setStyle(this.__body, 'left', t);
        n._$setStyle(this.__mask, 'left', t);
      }
    };
    d._$show = function () {
      n._$setStyle(this.__body, 'visibility', 'hidden');
      this.__super();
      this.__doPositionAlign();
      n._$setStyle(this.__body, 'visibility', '');
      if (!this.__nohack) this.__mask = n._$mask(this.__body);
    };
    d._$hide = function () {
      this.__destroyable ? this._$recycle() : this.__doHide();
    };
    if (!0) e.copy(e.P('nej.ui'), a);
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '2251224ef4bde318c45429fafdfcdd19',
);
