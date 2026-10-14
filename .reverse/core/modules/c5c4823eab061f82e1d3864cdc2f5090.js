EDU(
  'c5c4823eab061f82e1d3864cdc2f5090',
  function () {
    var _ = NEJ.P,
      _o = NEJ.O,
      _f = NEJ.F,
      _c = _('nej.c'),
      _e = _('nej.e'),
      _u = _('nej.u'),
      _t = _('nej.ut'),
      _p = _('nej.ui'),
      _v = _('nej.v'),
      _proSnapScreenButton,
      _supSnapScreenButton;
    _p._$$SnapScreenButton = NEJ.C();
    _proSnapScreenButton = _p._$$SnapScreenButton._$extend(_p._$$EditorDialogButton);
    _supSnapScreenButton = _p._$$SnapScreenButton._$supro;
    _proSnapScreenButton.__reset = function (e) {
      this.__supReset(e);
      this.__editor.addListener(
        'selectionchange',
        function (e, t, n) {
          var i = this.__editor.queryCommandState(this.__cmd);
          if (i == -1) this._$setDisabled(!0);
          else if (!n) this._$setDisabled(!1);
        }._$bind(this),
      );
    };
    _proSnapScreenButton.__destroy = function () {
      this.__supDestroy();
    };
    _proSnapScreenButton.__initNode = function () {
      this.__supInitNode();
      this.__cmd = 'snapscreen';
    };
    _proSnapScreenButton.__onClick = function () {
      if (!this.__isDisabled) this.__excute();
    };
    _proSnapScreenButton.__excute = function () {
      var me = this.__editor,
        doc,
        snapplugin,
        lang = me.getLang('snapScreen_plugin');
      if (!snapplugin) {
        var container = me.container;
        doc = container.ownerDocument || container.document;
        snapplugin = doc.createElement('object');
        try {
          snapplugin.type = 'application/x-pluginbaidusnap';
        } catch (e) {
          return;
        }
        snapplugin.style.cssText = 'position:absolute;left:-9999px;';
        snapplugin.setAttribute('width', '0');
        snapplugin.setAttribute('height', '0');
        container.appendChild(snapplugin);
      }
      var editorOptions = me.options;
      var onSuccess = function (rs) {
        try {
          rs = eval('(' + rs + ')');
        } catch (e) {
          alert(lang.callBackErrorMsg);
          return;
        }
        if (!rs.state || 'SUCCESS' == rs.state)
          me.execCommand('insertimage', {
            src: editorOptions.snapscreenPath + rs.url,
            floatStyle: editorOptions.snapscreenImgAlign,
            _src: editorOptions.snapscreenPath + rs.url,
          });
        else alert(rs.state);
      };
      var onStartUpload = function () {};
      var onError = function () {
        alert(lang.uploadErrorMsg);
      };
      try {
        var port = editorOptions.snapscreenServerPort + '';
        editorOptions.snapscreenServerUrl = editorOptions.snapscreenServerUrl.split(
          editorOptions.snapscreenHost,
        );
        editorOptions.snapscreenServerUrl =
          editorOptions.snapscreenServerUrl[1] || editorOptions.snapscreenServerUrl[0];
        if (0 === editorOptions.snapscreenServerUrl.indexOf(':' + port))
          editorOptions.snapscreenServerUrl = editorOptions.snapscreenServerUrl.substring(
            port.length + 1,
          );
        var ret = snapplugin.saveSnapshot(
          editorOptions.snapscreenHost,
          editorOptions.snapscreenServerUrl,
          port,
        );
        onSuccess(ret);
      } catch (e) {
        _p._$$SnapScreenInstall._$allocate(this.__dialogOption)._$show();
      }
    };
    _proSnapScreenButton.__onchange = function (e) {
      this.__editor.execCommand(this.__cmd, { href: e.href, textValue: e.name, target: '_blank' });
    };
    return _p._$$SnapScreenButton;
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '74b0aa2cd36a05aa3d2263b4de234a9b',
  'f98de6abfbf240342af8b49bd5f747b7',
);
