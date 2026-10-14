EDU(
  'f98de6abfbf240342af8b49bd5f747b7',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      n = NEJ.F,
      i = e('nej.c'),
      o = e('nej.e'),
      a = e('nej.u'),
      r = e('nej.ut'),
      s = e('nej.ui'),
      c = e('nej.v'),
      d,
      l;
    var u = o._$addNodeTemplate(
      '<div class="u-snapscreen-install">                                                                                <div class="content">                                                                                    <p>截图功能需要首先安装UEditor截图插件！</p>                                                                                    <div class="f-fs0">                                                                                        <div><a href="http://ueditor.baidu.com/ueditor/third-party/snapscreen/UEditorSnapscreen.exe" target="_blank" id="downlink">点此下载</a></div>                                                                                        <div>第一步，下载UEditor截图插件并运行安装。</div>                                                                                        <div>第二步，插件安装完成后即可使用，如不生效，请重启浏览器后再试！</div>                                                                                    </div>                                                                                    <div class="b-20"></div>                                                                                    <div><a class="j-btn button tiny">确认</a></div>                                                                                </div>                                                                          </div>',
    );
    var _ = o._$pushCSSText('');
    s._$$SnapScreenInstall = NEJ.C();
    d = s._$$SnapScreenInstall._$extend(s._$$WindowWrapper);
    l = s._$$SnapScreenInstall._$supro;
    d.__initXGui = function () {
      this.__seed_css = _;
      this.__seed_html = u;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__btns = o._$getByClassName(this.__body, 'j-btn');
    };
    d.__onOK = function () {
      this._$hide();
    };
    d.__reset = function (e) {
      e = e || {};
      e.clazz = e.clazz || 'm-basewin u-editor-snapscreenDialog';
      e.maskclazz = e.maskclazz || 'm-editor-mask';
      e.parent = e.parent || document.body;
      e.draggable = e.draggable || !1;
      e.destroyable = e.destroyable || !1;
      e.title = e.title || '截图';
      e.mask = e.mask || !0;
      this.__supReset(e);
      this.__doInitDomEvent([[this.__btns[0], 'click', this.__onOK._$bind(this)]]);
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    return s._$$SnapScreenInstall;
  },
  '5e23a17a4345e0de7b9e3ec78706c924',
);
