EDU(
  '4a9ab75e4ccb63cd074aef392ec39260',
  function (e, t, n, i, o) {
    var a = NEJ.P,
      r = NEJ.O,
      s = NEJ.F,
      c = a('nej.c'),
      d = a('nej.e'),
      l = a('nej.u'),
      u = a('nej.ut'),
      _ = a('nej.ui'),
      f = a('nej.v'),
      h,
      p;
    _._$$EditorImageButton = NEJ.C();
    h = _._$$EditorImageButton._$extend(_._$$EditorDialogButton);
    p = _._$$EditorImageButton._$supro;
    h.__reset = function (e) {
      this.__supReset(e);
      this.__imageConfig = e.config.imageConfig || { setImageWH: !1 };
      this.__editor.addListener(
        'selectionchange',
        function (e, t, n) {
          var i = this.__editor.queryCommandState(this.__cmd);
          if (i == -1) this._$setDisabled(!0);
          else if (!n) this._$setDisabled(!1);
        }._$bind(this),
      );
    };
    h.__destroy = function () {
      this.__supDestroy();
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__cmd = 'insertimage';
    };
    h.__onClick = function () {
      if (!this.__isDisabled) _._$$ImageCard._$allocate(this.__dialogOption)._$show();
    };
    h.__onchange = function (e) {
      this.__url = e;
      var n = this.__url + '?imageInfo';
      if (n.indexOf(o.NOS_FORM_UPLOAD_URL) != -1 && this.__imageConfig.setImageWH)
        t._$request(n, {
          type: 'json',
          method: 'get',
          mode: 0,
          headers: { 'x-nos-entity-type': 'json' },
          onload: function (e) {
            this.__editor.execCommand(this.__cmd, {
              src: this.__url,
              class: 'eduEditor-img',
              width: e.Width,
              height: e.Height,
            });
          }._$bind(this),
          onerror: function () {
            this.__editor.execCommand(this.__cmd, { src: this.__url, class: 'eduEditor-img' });
          }._$bind(this),
        });
      else this.__editor.execCommand(this.__cmd, { src: this.__url, class: 'eduEditor-img' });
    };
    return _._$$EditorImageButton;
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '8a864b627c302d7d1c56bd928b515d1b',
  '74b0aa2cd36a05aa3d2263b4de234a9b',
  '5debbf385cf6d60dcbf0832e1f59a52d',
  '5c7056e4308772bfe37d20fd87012cce',
);
