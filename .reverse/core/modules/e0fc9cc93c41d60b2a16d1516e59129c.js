EDU(
  'e0fc9cc93c41d60b2a16d1516e59129c',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      n = e('nej.c'),
      i = e('nej.e'),
      o = e('nej.u'),
      a = e('nej.ut'),
      r = e('nej.ui'),
      s = e('nej.v'),
      c,
      d;
    r._$$MathCard = NEJ.C();
    c = r._$$MathCard._$extend(r._$$WindowWrapper);
    d = r._$$MathCard._$supro;
    var l = i._$addNodeTemplate(
      '<div class="u-richeditor-math">                        <div class="j-equation"></div>                        <input type="hidden" class="j-ipt" />                        <input type="hidden" class="j-ipt" />                        <div class="btns f-cb">                            <a class="f-fr u-btn u-btn-default j-btn">确定</a>                            <a class="f-fr u-btn-gh u-btn-primary j-btn">取消</a>                        </div>                    </div>',
    );
    c.__initXGui = function () {
      this.__seed_html = l;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__equation = i._$getByClassName(this.__body, 'j-equation')[0];
      this.__inputs = i._$getByClassName(this.__body, 'j-ipt');
      this.__btns = i._$getByClassName(this.__body, 'j-btn');
      this.__doInitDomEvent([
        [this.__btns[0], 'click', this.__onOK._$bind(this)],
        [this.__btns[1], 'click', this.__onCancel._$bind(this)],
      ]);
    };
    c.__reset = function (e) {
      e = e || {};
      e.clazz = 'u-eduEditorDialog';
      e.title = '公式编辑';
      e.draggable = !1;
      e.parent = e.parent || document.body;
      e.mask = !0;
      this.__mathEquatuonUI = r._$$MathEditUI._$allocate({
        parent: this.__equation,
        onGetImgSrc: function (e) {
          this.__inputs[1].value = e;
        }._$bind(this),
      });
      this.__supReset(e);
    };
    c.__onCancel = function () {
      this._$hide();
    };
    c.__onOK = function () {
      var e = {};
      e.name = o._$escape(this.__inputs[0].value);
      e.href = this.__inputs[1].value;
      this._$dispatchEvent('onchange', e);
      this._$hide();
    };
    c.__destroy = function () {
      if (this.__mathEquatuonUI)
        this.__mathEquatuonUI = r._$$MathEditUI._$recycle(this.__mathEquatuonUI);
      this.__supDestroy();
    };
    return r._$$MathCard;
  },
  '5e23a17a4345e0de7b9e3ec78706c924',
  'cb42c867c9c13647b1f038402d4c1905',
);
