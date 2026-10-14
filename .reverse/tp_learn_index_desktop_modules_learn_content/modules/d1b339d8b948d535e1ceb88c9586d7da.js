EDU(
  'd1b339d8b948d535e1ceb88c9586d7da',
  function (e, t, n, i, o) {
    var a = NEJ.P('edu.u');
    var s = n.$extends({
      name: 'lesson-lessonJoin-qa',
      css: t,
      template: e,
      data: {
        hasJoin: !0,
        showMore: !1,
        kbList: [],
        useDefaultKb: !1,
        defaultKbName: '默认知识库',
        defaultKbId: 0,
        showQaEntry: !1,
      },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.$$init();
      },
      $$init: function (e) {
        o._$getGrayTestResult(
          { key: 'document_qa_abtest_ratio' },
          function (e) {
            if (e && e.isGrayTestResult) {
              this.data.showQaEntry = !0;
              this.initDocStatus();
            }
            this.$update();
          }._$bind(this),
        );
      },
      hoverToggle: function (e) {
        this.data.showMore = e;
        this.$update();
      },
      initDocStatus: function () {
        i._$getUnitDocQaFileStatus(
          { unitId: this.data.unitId },
          function (e) {
            this.data.knowledgeBaseId = e && e.knowledgeBaseId;
            this.data.hasJoin = e && 1 == e.status;
            this.$update();
            if (e && 1 == e.status);
            else this.getKbList();
          }._$bind(this),
        );
      },
      getKbList: function () {
        i._$listDocQaKb(
          {},
          function (e) {
            if (e && e.length > 0) this.data.kbList = e;
            else {
              this.data.useDefaultKb = !0;
              this.saveDocQaKb();
            }
            this.$update();
          }._$bind(this),
        );
      },
      saveDocQaKb: function () {
        i._$saveDocQaKb(
          { dto: { name: this.data.defaultKbName } },
          function (e) {
            if (e) this.data.defaultKbId = e;
            this.$update();
          }._$bind(this),
        );
      },
      joinOrCancelDoc: function (e, t) {
        var n = 1 == t ? this.data.knowledgeBaseId : e;
        i._$saveDocQaFileFromUnit(
          { unitId: this.data.unitId, kbId: n, cancel: t },
          function () {
            this.data.showMore = !1;
            if (1 == t) {
              this.data.hasJoin = !1;
              this.getKbList();
              a.showToastTips({ content: '取消成功', type: 1 });
            } else {
              this.data.knowledgeBaseId = e;
              this.data.hasJoin = !0;
              a.showToastTips({ content: '添加成功', type: 1 });
            }
            this.$update();
          }._$bind(this),
        );
      },
      toDocPage: function () {
        var e = 'SELECT_KB_' + (window.webUser && window.webUser.id);
        var t = localStorage.getItem(e);
        var n = this.data.knowledgeBaseId;
        if (t)
          if (t.split(',').indexOf(n.toString()) > -1) localStorage.setItem(e, t);
          else localStorage.setItem(e, t + ',' + n);
        else localStorage.setItem(e, n);
        var i = '//www.icourse163.org/documentQuestion.htm';
        window.open(i, '_blank');
      },
      destroy: function () {
        this.supr();
      },
    });
    return s;
  },
  'c05dd632e9d52734ddcf7eb505e23cb0',
  '4c8e3e49726e9626bdaa4895f1b1e5e4',
  '235c21779ec98ac90606962a862dadc9',
  'a936afb5ecab0e9286c3c9d05341571d',
  '07fb20540dab72c327de3dc584541c21',
);
