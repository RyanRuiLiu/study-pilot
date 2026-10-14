EDU(
  '9726410548d2e15abe44467418220b3f',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$WindowWrapper = t._$klass();
    c = o._$$WindowWrapper._$extend(n._$$LayerWrapper);
    c.__getLayerInstance = function () {
      return i._$$Window._$allocate(this.__lopt);
    };
    c.__doInitLayerOptions = function () {
      this.__super();
      this.__lopt.mask = null;
      this.__lopt.title = '标题';
      this.__lopt.align = '';
      this.__lopt.draggable = !1;
      this.__lopt.onclose = null;
    };
    if (!0) e.copy(e.P('nej.ui'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '4bc2e0ec2ac53645ad0e7f1ccde39c2b',
  'a5039301f6508ebad1476107f4d9a8c9',
);
