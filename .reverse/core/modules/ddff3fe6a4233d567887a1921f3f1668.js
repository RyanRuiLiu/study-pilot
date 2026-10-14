EDU(
  'ddff3fe6a4233d567887a1921f3f1668',
  function () {
    var e = NEJ.P,
      t = e('nej.e'),
      n = window,
      i = e('nej.v'),
      o = e('nej.ui'),
      a = e('edu.u'),
      r,
      s;
    a._$$Window = NEJ.C();
    r = a._$$Window._$extend(o._$$WindowWrapper);
    s = a._$$Window._$supro;
    a._$$Window._$showWindow = function (e) {
      var t = a._$$Window._$allocate(e);
      t._$show();
    };
    r.__reset = function (e) {
      e = e || {};
      e.parent = e.parent || document.body;
      e.mask =
        e.mask || void 0 == e.mask
          ? (this.__comMask = o._$$Mask._$allocate({ parent: e.parent, clazz: 'm-com-mask' }))
          : !1;
      e.draggable = void 0 == e.draggable ? !0 : !!e.draggable;
      e.destroyable = !0;
      e.title = e.title || '标题';
      if (e.mask) {
        e.clazz = 'm-basewin m-winmark ' + (e.clazz || '');
        if (!e.maskClickNotHidden)
          this.__doInitDomEvent([[this.__comMask._$getBody(), 'click', this._$hide._$bind(this)]]);
      } else e.clazz = 'm-basewin ' + (e.clazz || '');
      this.__supReset(e);
      if (this.__body.parentNode && this.__body.parentNode.parentNode) {
        var i = t._$getByClassName(this.__body.parentNode.parentNode, 'zcls')[0];
        i.title = '关闭';
        if (e.closeBtnHidden) a._$hiddenNode(i);
        else a._$showNode(i);
      }
      this.__instanceName = +new Date();
      n.modelList = n.modelList || {};
      n.modelList[this.__instanceName] = this;
    };
    r.__destroy = function () {
      if (this.__comMask) this.__comMask = o._$$Mask._$recycle(this.__comMask);
      this.__supDestroy();
    };
  },
  '5e23a17a4345e0de7b9e3ec78706c924',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '80419355935cef882bd9c8c7a92dd741',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '9726410548d2e15abe44467418220b3f',
  '80419355935cef882bd9c8c7a92dd741',
);
