EDU(
  'f3ef006905a7e184af325203c61d4525',
  function () {
    var e = 'en' === window.currentLanguage;
    var t = NEJ.P,
      n = NEJ.O,
      i = NEJ.F,
      o = t('nej.c'),
      a = t('nej.e'),
      r = t('nej.u'),
      s = t('nej.ut'),
      c = t('nej.ui'),
      d,
      l;
    var u = '<div class="f-cb"></div>';
    var _ = a._$pushCSSText('');
    c._$$EduEditorToolbar = NEJ.C();
    d = c._$$EduEditorToolbar._$extend(c._$$Abstract);
    l = c._$$EduEditorToolbar._$supro;
    d.__init = function () {
      this.__supInit();
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__hasInitBtns = !1;
      this.__editor = e.editor;
      this.__config = e.config;
      this.__showCmds = this.__config.showCmds || [
        'cleardoc',
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'insertorderedlist',
        'insertunorderedlist',
        'image',
        'math',
        'link',
        'insertcode',
        'fontsize',
        'fontcolor',
      ];
      this.__editor.ready(
        function (e) {
          if (!this.__hasInitBtns) {
            this.__initBaseBtns();
            this.__initColorBtns();
            this.__initDialogBtns();
            this.__initDropDownBtns();
            this.__hasInitBtns = !0;
          }
        }._$bind(this),
      );
    };
    d.__destroy = function () {
      if (this.__baseBtnUIs)
        for (var e in this.__baseBtnUIs)
          if (this.__baseBtnUIs[e])
            this.__baseBtnUIs[e] = c._$$EditorButton._$recycle(this.__baseBtnUIs[e]);
      if (this.__dialogBtnUIs)
        for (var t in this.__dialogBtnUIs)
          if (this.__dialogBtnUIs[t])
            this.__dialogBtnUIs[t] = this.__dialogBtnUIs[t].constructor._$recycle(
              this.__dialogBtnUIs[t],
            );
      if (this.__dropDownBtnUIs)
        for (var t in this.__dropDownBtnUIs)
          if (this.__dropDownBtnUIs[t])
            this.__dropDownBtnUIs[t] = this.__dropDownBtnUIs[t].constructor._$recycle(
              this.__dropDownBtnUIs[t],
            );
      if (this.__colorBtnUIs)
        for (var t in this.__colorBtnUIs)
          if (this.__colorBtnUIs[t])
            this.__colorBtnUIs[t] = c._$$ColorButton._$recycle(this.__colorBtnUIs[t]);
      if (this.__spNodes)
        for (var n = 0; n < this.__spNodes.length; n++) a._$remove(this.__spNodes[n]);
      this.__supDestroy();
    };
    d.__initXGui = function () {
      this.__seed_css = _;
      this.__seed_html = a._$addNodeTemplate(u);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__baseBtns = [
        { name: 'cleardoc', title: 'labelMap.cleardoc', clazz: 'z-i-11', cmd: 'cleardoc' },
        { name: 'undo', title: 'labelMap.undo', clazz: 'z-i-9', cmd: 'undo' },
        { name: 'redo', title: 'labelMap.redo', clazz: 'z-i-10', cmd: 'redo' },
        { name: 'zisp' },
        { name: 'bold', title: 'labelMap.bold', clazz: 'z-i-0', cmd: 'bold' },
        { name: 'italic', title: 'labelMap.italic', clazz: 'z-i-1', cmd: 'italic' },
        { name: 'underline', title: 'labelMap.underline', clazz: 'z-i-2', cmd: 'underline' },
        {
          name: 'strikethrough',
          title: 'labelMap.strikethrough',
          clazz: 'z-i-3',
          cmd: 'strikethrough',
        },
        {
          name: 'insertorderedlist',
          title: 'labelMap.insertorderedlist',
          clazz: 'z-i-4',
          cmd: 'insertorderedlist',
          value: 'decimal',
        },
        {
          name: 'insertunorderedlist',
          title: 'labelMap.insertunorderedlist',
          clazz: 'z-i-5',
          cmd: 'insertunorderedlist',
          value: 'disc',
        },
      ];
      this.__colorBtns = [
        { name: 'fontcolor', title: 'labelMap.forecolor', clazz: 'z-i-12' },
        { name: 'zisp' },
      ];
      this.__justifyBtns = [
        {
          name: 'justifyleft',
          title: 'labelMap.justifyleft',
          clazz: 'z-i-0',
          cmd: 'justify',
          value: 'left',
        },
        {
          name: 'justifycenter',
          title: 'labelMap.justifycenter',
          clazz: 'z-i-0',
          cmd: 'justify',
          value: 'center',
        },
        {
          name: 'justifyright',
          title: 'labelMap.justifyright',
          clazz: 'z-i-0',
          cmd: 'justify',
          value: 'right',
        },
      ];
      if (e)
        this.__dialogBtns = [
          {
            name: 'link',
            title: 'labelMap.link',
            clazz: 'z-i-6',
            constructor: c._$$EditorLinkButton,
          },
          {
            name: 'image',
            title: 'labelMap.insertimage',
            clazz: 'z-i-7',
            constructor: c._$$EditorImageButton,
          },
          {
            name: 'snapscreen',
            title: 'labelMap.snapscreen',
            clazz: 'z-i-13',
            constructor: c._$$SnapScreenButton,
            cmd: 'snapscreen',
          },
          { name: 'zisp' },
        ];
      else
        this.__dialogBtns = [
          {
            name: 'link',
            title: 'labelMap.link',
            clazz: 'z-i-6',
            constructor: c._$$EditorLinkButton,
          },
          {
            name: 'image',
            title: 'labelMap.insertimage',
            clazz: 'z-i-7',
            constructor: c._$$EditorImageButton,
          },
          { name: 'math', title: 'labelMap.math', clazz: 'z-i-8', constructor: c._$$MathButton },
          {
            name: 'snapscreen',
            title: 'labelMap.snapscreen',
            clazz: 'z-i-13',
            constructor: c._$$SnapScreenButton,
            cmd: 'snapscreen',
          },
          { name: 'zisp' },
        ];
      this.__dropDownBtns = [
        {
          name: 'insertcode',
          title: 'insertcode',
          clazz: 'z-i-code',
          constructor: c._$$InsertCodeSelect,
          type: 'map',
        },
        {
          name: 'fontsize',
          title: 'fontsize',
          clazz: 'z-i-size',
          constructor: c._$$FontsizeSelect,
          type: 'list',
        },
        {
          name: 'rowspacingtop',
          title: 'rowspacingtop',
          clazz: 'z-i-0',
          constructor: c._$$Rowspacing,
          type: 'list',
        },
        {
          name: 'lineheight',
          title: 'lineheight',
          clazz: 'z-i-0',
          constructor: c._$$Lineheight,
          type: 'list',
        },
        {
          name: 'rowspacingbottom',
          title: 'rowspacingbottom',
          clazz: 'z-i-0',
          constructor: c._$$Rowspacing,
          type: 'list',
        },
      ];
    };
    d.__appendSplit = function () {
      var e = a._$html2node('<div class="zisp"></div>');
      this.__body.appendChild(e);
      if (!this.__spNodes) this.__spNodes = [];
      this.__spNodes.push(e);
    };
    d.__initBaseBtns = function () {
      this.__baseBtnUIs = {};
      var e = this.__editor;
      var t = this.__body;
      var n = 0;
      r._$forEach(
        this.__baseBtns,
        function (i, o) {
          if (!('zisp' == i.name && n > 0)) {
            if (r._$indexOf(this.__showCmds, i.name) != -1) {
              this.__baseBtnUIs[i.name] = (function (n, i) {
                var o = c._$$EditorButton._$allocate({
                  parent: t,
                  config: i,
                  title: e.getLang(n.title),
                  clazz: n.clazz,
                  onclick: function () {
                    e.execCommand(n.cmd, n.value);
                  }._$bind(this),
                });
                e.addListener('selectionchange', function (t, i, a) {
                  var r = e.queryCommandState(n.cmd);
                  if (r == -1) {
                    o._$setDisabled(!0);
                    o._$setChecked(!1);
                  } else if (!a) {
                    o._$setDisabled(!1);
                    o._$setChecked(r);
                  }
                });
                return o;
              })(i, this.__config);
              n++;
            }
          } else this.__appendSplit();
        }._$bind(this),
      );
      n = 0;
      r._$forEach(
        this.__justifyBtns,
        function (i, o) {
          if (!('zisp' == i.name && n > 0)) {
            if (r._$indexOf(this.__justifyBtns, i.name) != -1) {
              this.__baseBtnUIs[i.name] = (function (n, i) {
                var o = c._$$EditorButton._$allocate({
                  parent: t,
                  config: i,
                  title: e.getLang(n.title),
                  clazz: n.clazz,
                  onclick: function () {
                    e.execCommand(n.cmd, n.value);
                  }._$bind(this),
                });
                e.addListener('selectionchange', function (t, i, a) {
                  o._$setDisabled(e.queryCommandState(n.cmd) == -1);
                  o._$setChecked(e.queryCommandValue(n.cmd) == n.value && !a);
                });
                return o;
              })(i, this.__config);
              n++;
            }
          } else this.__appendSplit();
        }._$bind(this),
      );
    };
    d.__initDialogBtns = function () {
      this.__dialogBtnUIs = {};
      var e = this.__editor;
      var t = this.__body;
      var n = 0;
      r._$forEach(
        this.__dialogBtns,
        function (i, o) {
          if (!('zisp' == i.name && n > 0)) {
            if (r._$indexOf(this.__showCmds, i.name) != -1) {
              this.__dialogBtnUIs[i.name] = (function (n, i) {
                var o = n.constructor._$allocate({
                  parent: t,
                  config: i,
                  title: e.getLang(n.title),
                  clazz: n.clazz,
                  editor: e,
                });
                return o;
              })(i, this.__config);
              n++;
            }
          } else this.__appendSplit();
        }._$bind(this),
      );
    };
    d.__initDropDownBtns = function () {
      this.__dropDownBtnUIs = {};
      var e = this.__editor;
      var t = this.__body;
      var n = 0;
      r._$forEach(
        this.__dropDownBtns,
        function (i, o) {
          if (!('zisp' == i.name && n > 0)) {
            if (r._$indexOf(this.__showCmds, i.name) != -1) {
              this.__dropDownBtnUIs[i.name] = (function (n, i) {
                var o = n.constructor._$allocate({
                  parent: t,
                  config: this.__config,
                  data: e.getLang(n.title),
                  editor: e,
                  clazz: n.clazz,
                });
                return o;
              })(i, this.__config);
              n++;
            }
          } else this.__appendSplit();
        }._$bind(this),
      );
    };
    d.__initColorBtns = function () {
      this.__colorBtnUIs = {};
      var e = this.__editor;
      var t = this.__body;
      r._$forEach(
        this.__colorBtns,
        function (n, i) {
          if (!('zisp' == n.name && this.__colorBtnUIs.length > 0)) {
            if (r._$indexOf(this.__showCmds, n.name) != -1)
              this.__colorBtnUIs[n.name] = (function (n, i) {
                var o = c._$$ColorButton._$allocate({
                  parent: t,
                  config: this.__config,
                  title: e.getLang(n.title),
                  editor: e,
                  clazz: n.clazz,
                });
                return o;
              })(n, this.__config);
          } else this.__appendSplit();
        }._$bind(this),
      );
    };
    return c._$$EduEditorToolbar;
  },
  '2251224ef4bde318c45429fafdfcdd19',
  'be6613579dd4b036d2331f9590122287',
  'b84bf9a75df00d2ffee6ad55bd1b756b',
  '8906bee8378881aec20181c09dcc62be',
  '4a9ab75e4ccb63cd074aef392ec39260',
  'd64598994e3654134c84b87da75017bd',
  '7b471aedaf06f7c7297075231a1b1e91',
  'a7ed1609bd4bda29dbc2d269675525d2',
  '2f3f5738a8a0ab10a43e0944d85ad427',
  'cfe242d0469d0627c33aefab6a9e0e41',
  'c5c4823eab061f82e1d3864cdc2f5090',
);
