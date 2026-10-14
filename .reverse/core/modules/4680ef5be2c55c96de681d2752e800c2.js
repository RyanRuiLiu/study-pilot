EDU(
  '4680ef5be2c55c96de681d2752e800c2',
  function (e, t, n, i, o, a, r, s) {
    function c(e) {
      if (e) {
        var t = /img[0-9].ph.126.net/g;
        return e.replace(t, 'img-ph-mirror.nosdn.127.net');
      }
    }
    var d = NEJ.P,
      l = window,
      u = d('nej.e'),
      _ = d('nej.u'),
      f = d('nej.ui'),
      h = d('edu.u'),
      p,
      m;
    var g =
      '<div class="u-richeditor">                <div class="j-editor"></div>            </div>';
    var b = u._$pushCSSText(
      '        .u-richeditor{border:none}        .ql-toolbar.ql-snow{text-align:left}        ',
    );
    f._$$EduEditor = o._$$EduEditor = NEJ.C();
    p = o._$$EduEditor._$extend(f._$$Abstract);
    m = o._$$EduEditor._$supro;
    p.__init = function () {
      this.__supInit();
    };
    p.__reset = function (e) {
      this.__supReset(e);
      this.__options = NEJ.X(l.eduEditor_options || {}, e || {});
      this.__height = this.__options.height || 200;
      this.__options.content = c(this.__options.content);
      this.__initContent = this.__options.content;
      this.__isFocus = this.__options.focus || !1;
      this.__showCmds = this.__options.showCmds;
      this.__reactEditor = null;
      this.__initReactEditor();
    };
    p.ready = function (e) {
      return !!this.__reactEditor;
    };
    p.change = function (e) {};
    p.__destroy = function () {
      window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__reactEditorNode);
      this.__supDestroy();
    };
    p.__initXGui = function () {
      this.__seed_css = b;
      this.__seed_html = u._$addNodeTemplate(g);
    };
    p.__initNode = function () {
      this.__supInitNode();
      this.__reactEditorNode = u._$getByClassName(this.__body, 'j-editor')[0];
    };
    p.__initReactEditor = function () {
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch;
      var e = 'Editor';
      var t = this.__reactEditorNode;
      window.reactComponentLoadBootstrap.setFtlData({
        height: this.__height + 'px',
        width: '100%',
        value: this.__initContent,
        getRef: function (e) {
          this.__reactEditor = e;
        }._$bind(this),
        notShowCmds: this.__showCmds,
      });
      if (window.renderReactComponent && window.renderReactComponent[e]) {
        var n = window.renderReactComponent[e];
        n.render(n.component, n.initialState, t);
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'Editor', container: t },
          {},
          {
            loadSuccessCb: function () {
              this.__initReactEditor();
            }._$bind(this),
          },
        );
    };
    p._$focus = function () {
      return this.__reactEditor.focus();
    };
    p._$getContent = function () {
      return this.__reactEditor
        .getHTML()
        .replace(/%10/g, ' % 10')
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    };
    p._$getTextContent = function () {
      return this.__reactEditor
        .getHTML()
        .replace(/%10/g, ' % 10')
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    };
    p._$setContent = function (e) {
      this.__reactEditor.setHTML(e);
      return this;
    };
    p._$setHeight = function (e) {
      this.__height = e;
      this.__initReactEditor();
      return this;
    };
    p._$show = function () {
      this.__body.style.display = '';
      return this;
    };
    p._$hide = function () {
      this.__body.style.display = 'none';
      return this;
    };
    p._$getPhotoIdsAndUrls = (function () {
      return function () {
        return [];
      };
    })();
    return o;
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '605186888c239b662c97951c2cdc4869',
  'f3ef006905a7e184af325203c61d4525',
  'c9088f14303859a992db8abb00e8c4f0',
);
