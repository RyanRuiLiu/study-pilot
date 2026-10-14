EDU(
  '0420fecbfe618803d5371cc64a44090f',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$CommonExamListUI = NEJ.C();
    r = o._$$CommonExamListUI._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-edu-examListUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      console.log('this.__body', this.__body);
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__syncMooc = e.syncMooc;
      this.__examId = e.examId;
      console.log('CommonExamListUI', e);
      o._$hiddenNode(this.__emptyNode);
      this.__genUIs(e.exams);
      window.onload = function () {
        var e = document.getElementById(this.__examId);
        if (e) e.scrollIntoView({ behavior: 'smooth' });
      }._$bind(this);
    };
    r.__genUIs = function (e) {
      console.log('生成一次examlist', e);
      var t = e || {};
      if (t && t.length) {
        var i = t.length;
        this.__examListItemUIs = [];
        var n = null;
        s._$forEach(
          t,
          function (e, t) {
            var a = o._$$ExamListItem._$allocate({
              parent: this.__body,
              examVo: e,
              clazz: t == i - 1 ? 'last' : '',
              syncMooc: this.__syncMooc,
            });
            this.__examListItemUIs.push(a);
            console.log('this.__examId', this.__examId, e);
            if (this.__examId && this.__examId == e.chapterId) n = a;
            else;
          }._$bind(this),
        );
        if (n) n._$showUpDownMode(!0);
      } else o._$showNode(this.__emptyNode);
      if (!window.currentLanguage) {
        setTimeout(
          function () {
            this.showNewExamList();
          }._$bind(this),
          0,
        );
        console.log('this.__examListItemUIs', this.__examListItemUIs);
      }
    };
    r.showNewExamList = function () {
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch;
      console.log('showNewExamList');
      var e = {
        isPreview: window.isPreview,
        courseId: window.courseDto.id,
        schoolSN:
          window.courseDto && window.courseDto.schoolPanel
            ? window.courseDto.schoolPanel.shortName
            : null,
        termId: this.__syncMooc
          ? window.moocTermDto
            ? window.moocTermDto.id
            : null
          : window.termDto
            ? window.termDto.id
            : null,
        isSpoc: window.isSpoc,
        expandKey: this.__examId,
      };
      if (window.reactComponentLoadBootstrap) window.reactComponentLoadBootstrap.setFtlData(e);
      if (!this.__syncMooc) {
        var t = document.createElement('div');
        t.setAttribute('id', 'j-new-exam-card');
        this.__body.appendChild(t);
        if (window.renderReactComponent && window.renderReactComponent['NewExamCard']) {
          window.renderReactComponent.ReactDOM.unmountComponentAtNode(
            document.getElementById('j-new-exam-card'),
          );
          var i = window.renderReactComponent['NewExamCard'];
          window.renderReactComponent.render(
            i.component,
            i.initialState,
            document.getElementById('j-new-exam-card'),
          );
        } else
          window.reactComponentLoadBootstrap.init(
            { name: 'NewExamCard', container: document.getElementById('j-new-exam-card') },
            e,
          );
      } else {
        var n = document.createElement('div');
        n.setAttribute('id', 'j-new-exam-card-sync');
        this.__body.appendChild(n);
        var i = window.renderReactComponent['NewExamCard'];
        window.renderReactComponent.render(
          i.component,
          i.initialState,
          document.getElementById('j-new-exam-card-sync'),
        );
      }
    };
    r.__clearUI = function () {
      s._$forEach(
        this.__examListItemUIs,
        function (e, t) {
          e = o._$$ExamListItem._$recycle(e);
        }._$bind(this),
      );
      if (document.getElementById('j-new-exam-card'))
        this.__body.removeChild(document.getElementById('j-new-exam-card'));
      this.__quizHwItemUIs = null;
    };
    r.__destroy = function () {
      this.__clearUI();
      this.__supDestroy();
    };
  },
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '40afa2e0d560068c0496bec063bb0d2b',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
