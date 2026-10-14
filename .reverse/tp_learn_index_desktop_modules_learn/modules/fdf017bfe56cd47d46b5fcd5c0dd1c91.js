EDU(
  'fdf017bfe56cd47d46b5fcd5c0dd1c91',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      s = NEJ.P('nej.ui'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.m'),
      d = NEJ.P('edu.u'),
      _ = NEJ.P('nej.u'),
      l;
    var h = a._$pushCSSText(
      '        .#<uispace> {padding:20px;}        .#<uispace> .save, .next{margin-right:20px;}        .#<uispace> .fb{height:22px;}        .#<uispace>\t.fb .m-feedbackinfo{padding:0px;}        .#<uispace> .u-btn{padding:0 4px;height:30px;line-height:30px;}        ',
    );
    var f = a._$addHtmlTemplate(
      '\t\t\t<div class="u-caeDialog">\t\t\t\t<div class="j-moocBase moocBase"></div>\t\t\t\t<div class="j-createfd createfd"></div>\t\t\t\t<a class="u-btn u-btn-default j-next next">下一步</a>\t\t\t\t<a class="u-btn u-btn-default j-save save">保存</a>\t\t\t\t<a class="u-btn j-cancel">取消</a>\t\t\t</div>\t\t',
    );
    d._$$TermCAEDialog = NEJ.C();
    l = d._$$TermCAEDialog._$extend(d._$$Window, !0);
    d._$$TermCAEDialog._$showDialog = function (e) {
      var t = d._$$TermCAEDialog._$allocate(e);
      t._$show();
    };
    e._$getInstance()._$addEvent('showTermCAEDialog', function (e) {
      d._$$TermCAEDialog._$showDialog(e);
    });
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = h;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__save = a._$getByClassName(this.__body, 'j-save')[0];
      this.__next = a._$getByClassName(this.__body, 'j-next')[0];
      this.__cancel = a._$getByClassName(this.__body, 'j-cancel')[0];
      this.__moocBase = a._$getByClassName(this.__body, 'j-moocBase')[0];
      this.__createFdNode = a._$getByClassName(this.__body, 'j-createfd')[0];
      o._$addEvent(this.__save, 'click', this.__onSaveHandler._$bind(this));
      o._$addEvent(this.__next, 'click', this.__onNextHandler._$bind(this));
      o._$addEvent(
        this.__cancel,
        'click',
        function () {
          this.__closeHandle();
        }._$bind(this),
      );
      this.__createTermCache = new r._$$COM_Cache_AdminSchoolCache();
      this.__createTermCache._$addEvent('AdminCreateTerm', this.__onCreateTermCb._$bind(this));
      this.__createTermCache._$addEvent('AdminCreateCopyTerm', this.__onCreateTermCb._$bind(this));
      this.__createTermCache._$addEvent('AdminUpdateTerm', this.__onUpdateTermCb._$bind(this));
    };
    l.__onCreateTermCb = function (e) {
      this._$dispatchEvent('createTerm', e);
      this.__recycleUI();
      this._$hide();
    };
    l.__onUpdateTermCb = function (e) {
      if (e) this._$dispatchEvent('updateTerm', e);
      this.__recycleUI();
      this._$hide();
    };
    l.__onSaveHandler = function () {
      if (!this.__canCreateNewTerm) {
        this.__bsDto = this.__baseMoocUI._$getDto();
        if (this.__bsDto)
          if (!this.__bsDto.id)
            this.__createTermCache._$AdminCreateTerm(
              this.__bsDto.courseId,
              this.__bsDto.chiefTeacherId,
              this.__bsDto.startTime,
              this.__bsDto.endTime,
              this.__bsDto.checked,
              this.__bsDto.price,
            );
          else
            this.__createTermCache._$AdminUpdateTerm(
              this.__bsDto.courseId,
              this.__bsDto.id,
              this.__bsDto.chiefTeacherId,
              this.__bsDto.startTime,
              this.__bsDto.endTime,
              this.__bsDto.checked,
              this.__bsDto.price,
            );
      }
    };
    l.__onNextHandler = function () {
      if (!this.__canCreateNewTerm) {
        this.__bsDto = this.__baseMoocUI._$getDto();
        if (this.__bsDto) {
          var t = this;
          t._$hide();
          e._$getInstance()._$dispatchEvent('showTermSelectDialog', {
            firstOptions: this.__options,
            firstSaveObj: this.__bsDto,
            createTerm: this.__options.createTerm,
            updateTerm: this.__options.updateTerm,
          });
        }
      }
    };
    l.__genUI = function (e, t) {
      this.__baseMoocUI = d._$$TermCreateEditUI._$allocate({
        parent: this.__moocBase,
        termDto: e.termDto,
        status: e.status || d.CONST.TERMSTATUS_DRAFT,
      });
      this.__fdCreateTerm = d._$$FeedBackUI._$allocate({ parent: this.__createFdNode });
      this.__fdCreateTerm._$hideFeedback();
      a._$addClassName(t, 'u-btn-default');
      a._$delClassName(t, 'u-btn-disabled');
      if (this.__canCreateNewTerm) {
        if (1 == this.__canCreateNewTerm)
          this.__fdCreateTerm._$showWarnTips(
            '已经有一个未发布的学期，无法保存。<br>如有需要，请删除未发布的学期后重新操作。',
            !0,
          );
        if (2 == this.__canCreateNewTerm)
          this.__fdCreateTerm._$showWarnTips(window.moocConfig.lang.KEY_LEARN_THE_SEMESTER, !0);
        a._$delClassName(t, 'u-btn-default');
        a._$addClassName(t, 'u-btn-disabled');
      }
    };
    l.__reset = function (e) {
      e.title = window.moocConfig.lang.KEY_LEARN_SEMESTER_EDITOR;
      e.clazz = 'u-termdialog';
      e.maskClickNotHidden = !0;
      this.__status = e.status || d.CONST.TERMSTATUS_DRAFT;
      this.__supReset(e);
      this.__canCreateNewTerm = e.canCreateNewTerm || 0;
      this.__options = e;
      this.__mode = this.__options.termDto.mode;
      var t;
      if (
        (this.__mode == d.CONST.MODE_SPOC_ASYNC || this.__mode == d.CONST.MODE_SPOC_SYNC) &&
        'undefined' == typeof this.__options.updateTerm
      ) {
        d._$hiddenNode(this.__save);
        d._$showNode(this.__next);
        t = this.__next;
      } else {
        d._$hiddenNode(this.__next);
        d._$showNode(this.__save);
        t = this.__save;
      }
      this.__genUI(this.__options, t);
    };
    l.__recycleUI = function () {
      if (this.__baseMoocUI) this.__baseMoocUI = d._$$TermCreateEditUI._$recycle(this.__baseMoocUI);
      if (this.__fdCreateTerm) this.__fdCreateTerm = d._$$FeedBackUI._$recycle(this.__fdCreateTerm);
    };
    l.__closeHandle = function () {
      this.__recycleUI();
      this._$hide();
    };
    l.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  '9f00cd6c3134c86431c1d1e3a7678de8',
  'ddff3fe6a4233d567887a1921f3f1668',
  '1b395bb66fd465664ef6cf2e2ded18c1',
  '5a6d3736a21ba2e843ce12139b7c8134',
  '93828627ddb358ed890cb65967a0c1de',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
