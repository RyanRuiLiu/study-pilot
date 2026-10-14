EDU(
  '0f188659b8c10dc2a8793ba1f7b9322d',
  function (e, t, n, i, o) {
    var a = window,
      r = NEJ.O,
      s = NEJ.F,
      c = NEJ.P('nej.e'),
      d = NEJ.P('nej.v'),
      l = NEJ.P('edu.d'),
      u = NEJ.P('nej.u'),
      _ = NEJ.P('edu.u'),
      f = NEJ.P('nej.ui'),
      h;
    var p = c._$addHtmlTemplate(
      '<div class="u-questionItem u-analysisQuestion">                                       \t        <div class="j-title f-cb title questionDes">                                    \t       \t  \t<div class="position f-fl"></div>                                                    <div class="qaDescription f-fl f-cb">                                                        <div class="qaIndex j-qaindex f-fl f-dn"></div>                                                        <div class="qaCate j-qacate f-fl"></div>                                                        <div class="f-richEditorText j-richTxt f-fl ql-editor"></div>                                                        <br/><div class="qaMark j-qamark f-fr f-dn"></div>                                                    </div>                                                </div>                                \t       \t  \t<div class="j-answer answer">                                \t       \t  \t    <div class="j-richTip f-fc9 f-fs0" style="margin-bottom: 10px;text-align: right;display:none;">${lang.KEY_LEARN_THE_EXCEEDS} 5000${lang.KEY_LEARN_IT_UPLOAD}</div>                                                    <div class="j-richOrText text f-f0 f-richEditorText"></div>                                    \t       \t  \t<div class="j-attachment attachment f-cb">                                    \t       \t  \t    <div class="j-attchInfo attchinfo f-thide"></div>                                                        <div class="j-upload attchupload"></div>                                    \t       \t  \t</div>                                                    <div class="j-evaluate"></div>                                \t       \t  \t</div>                                \t       \t  \t<div class="j-wap-tips wap-tips f-dn">${lang.KEY_LEARN_PLEASE_ASSIGNMENT}<br/>//www.icourse163.org/</div>                                           </div>',
    );
    _._$$AnalysisQuestionUI = NEJ.C();
    h = _._$$AnalysisQuestionUI._$extend(_._$$BaseType, !0);
    h.__initXGui = function () {
      this.__seed_html = p;
      this.__seed_html = c._$addNodeTemplate(
        c._$getHtmlTemplate(p, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = c._$getByClassName(this.__body, 'j-title')[0];
      this.__questionInfo = c._$getChildren(this.__titleNode);
      this.__answerNode = c._$getByClassName(this.__body, 'j-answer')[0];
      this.__richOrTextNode = c._$getByClassName(this.__answerNode, 'j-richOrText')[0];
      this.__uploadNode = c._$getByClassName(this.__answerNode, 'j-upload')[0];
      this.__attchInfoNode = c._$getByClassName(this.__answerNode, 'j-attchInfo')[0];
      this.__attchmentNode = c._$getByClassName(this.__answerNode, 'j-attachment')[0];
      this.__cateLabel = c._$getByClassName(this.__body, 'j-qacate')[0];
      this.__richTextNode = c._$getByClassName(this.__body, 'j-richTxt')[0];
      this.__indexLabel = c._$getByClassName(this.__body, 'j-qaindex')[0];
      this.__markLabel = c._$getByClassName(this.__body, 'j-qamark')[0];
      this.__richTip = c._$getByClassName(this.__body, 'j-richTip')[0];
      this.__wapTip = c._$getByClassName(this.__body, 'j-wap-tips')[0];
      this.__homeworkCache = new l._$$COM_Cache_HomeworkCache();
      this.__homeworkCache._$addEvent('onDeleteAttachment', this.__cbDeleteAttachment._$bind(this));
    };
    h.__cbDeleteAttachment = function (e) {
      this.__attchInfoNode.innerHTML = '';
      if (this.__answerDto && this.__answerDto.content) this.__answerDto.content.attachments = [];
      delete this.__fileinfo;
    };
    h._$getAnswerData = function () {
      var e = this.__buildAnswerDto();
      return e;
    };
    h._$refreshStatus = function (e) {
      switch (e) {
        case 'onSubmited':
          this.__addAttachInfo(!0);
          return;
      }
    };
    h.__buildQuestionInfo = function () {
      if (this.__position || 0 == this.__position)
        this.__questionInfo[0].innerText = (this.__position || 0) + 1;
      this.__richTextNode.innerHTML = e._$formateImagePrefix(this.__questionDto.title || '');
      if (this.__indexNum > 0) {
        this.__indexLabel.innerHTML = this.__indexNum + '、';
        c._$delClassName(this.__indexLabel, 'f-dn');
      }
      if (_._$isWap()) c._$delClassName(this.__wapTip, 'f-dn');
      var t = n.isEn() && this.__questionDto.score >= 1 ? 's' : '';
      this.__cateLabel.innerHTML = this.__isTraining
        ? ''
        : _._$isWap()
          ? ''
          : ' ( ' +
            this.__questionDto.score +
            window.moocConfig.lang.KEY_LEARN_SCORE_POINTS +
            t +
            ' ) ';
      if (_._$isWap()) {
        this.__markLabel.innerHTML =
          '(' + this.__questionDto.score + window.moocConfig.lang.KEY_LEARN_SCORE_POINTS + t + ')';
        c._$delClassName(this.__markLabel, 'f-dn');
      }
      if (
        this.__questionDto &&
        this.__questionDto.titleAttachmentDtos &&
        this.__questionDto.titleAttachmentDtos.length > 0
      ) {
        this.__titleAttachmentInfo = this.__questionDto.titleAttachmentDtos[0];
        this.__titleAttachmentNode = c._$html2node(
          '<a class="name f-db f-fl f-thide" href="' +
            a.urlPrefix.titleAttachmentPrefix +
            '?key=' +
            this.__titleAttachmentInfo.filekey +
            '&qid=' +
            this.__questionDto.id +
            '" target="_blank">' +
            _._$formatFileName(this.__titleAttachmentInfo.filename || '') +
            '</a><a class="download f-fl f-db" href="' +
            a.urlPrefix.titleAttachmentPrefix +
            '?key=' +
            this.__titleAttachmentInfo.filekey +
            '&qid=' +
            this.__questionDto.id +
            '" target="_blank">' +
            window.moocConfig.lang.KEY_LEARN_DOWNLOAD +
            '</a>',
        );
        this.__titleNode.appendChild(this.__titleAttachmentNode);
      }
      u._$renderRich(this.__richTextNode);
    };
    h.__goToAnalysisMode = function () {
      if (!_._$isWap()) {
        _._$hiddenNode(this.__richTip);
        if (this.__answerDto && this.__answerDto.content) {
          c._$addClassName(this.__richOrTextNode, 'f-richEditorText');
          var e =
            '<span class="tit f-fc3">' +
              window.moocConfig.lang.KEY_LEARN_ANSWER +
              '</span>' +
              this.__answerDto.content.content || '';
          this.__richOrTextNode.innerHTML = (window.filterXSS && window.filterXSS(e, o)) || e;
          u._$renderRich(this.__richOrTextNode);
          if (
            this.__answerDto.content.attachments &&
            this.__answerDto.content.attachments.length > 0
          )
            this.__richOrTextNode.innerHTML +=
              '<a class="downloadLink u-btn u-btn-default u-btn-sm" href="' +
              a.urlPrefix.attachmentPrefix +
              '?key=' +
              this.__answerDto.content.attachments[0].filekey +
              '&aid=' +
              this.__aid +
              '" target="_blank">' +
              window.moocConfig.lang.KEY_LEARN_DOWNLOAD_ATTACHMENTS +
              '</a>';
        }
      }
    };
    h.__genfileData = function (e) {
      this.__fileinfo = { filename: e.name, filekey: e.nosKey };
    };
    h.__buildAnswerDto = function () {
      var e = '',
        t = this.__answerDto ? (this.__answerDto.content || {}).attachments || [] : [];
      if (this.__richEditor) e = this.__richEditor.__richUI._$getContent();
      if (this.__fileinfo) t[0] = this.__fileinfo;
      var n = {
        qid: this.__questionDto.id,
        type: _.CONST.TYPE_SUBJECTIVE_NORMAL,
        content: { content: e, attachments: t },
      };
      return n;
    };
    h.__goToExamMode = function () {
      if (!_._$isWap()) {
        c._$delClassName(this.__richOrTextNode, 'f-richEditorText');
        _._$showNode(this.__richTip);
        if (this.__richEditor) this.__richEditor.destroy();
        this.__richEditor = new t({
          data: { value: this.__answerDto ? (this.__answerDto.content || {}).content || '' : '' },
        }).$inject(this.__richOrTextNode);
        this.__reloadUploadBtn();
        if (
          this.__answerDto &&
          this.__answerDto.content &&
          this.__answerDto.content.attachments &&
          this.__answerDto.content.attachments.length > 0
        ) {
          this.__fileinfo = this.__answerDto.content.attachments[0];
          this.__addAttachInfo(!0);
        } else this.__attchInfoNode.innerText = '';
      }
    };
    h.__addAttachInfo = function (e) {
      if (this.__fileinfo) {
        if (e)
          this.__attchInfoNode.innerHTML =
            '<a class="name f-db f-fl f-thide" href="' +
            a.urlPrefix.attachmentPrefix +
            '?key=' +
            this.__fileinfo.filekey +
            '&aid=' +
            this.__aid +
            '" target="_blank">' +
            _._$formatFileName(this.__fileinfo.filename || '') +
            '</a>';
        else
          this.__attchInfoNode.innerHTML =
            '<div class="name f-fl f-thide">' +
            _._$formatFileName(this.__fileinfo.filename || '') +
            '</div>';
        console.log(111111, this.__attchInfoNode.innerHTML);
        var t = c._$html2node(
          '<a class="del f-fl f-db">' + window.moocConfig.lang.KEY_LEARN_DELETE_DELETE + '</a>',
        );
        d._$addEvent(
          t,
          'click',
          function (e) {
            d._$stop(e);
            _._$$CommonDialog._$showDialog({
              message: window.moocConfig.lang.KEY_LEARN_AFTER_TO_SUBMIT_THE_ANSWER_TO_TAKE_EFFECT,
              okFunc: function () {
                if (this.__aid) this.__cbDeleteAttachment();
                else this.__cbDeleteAttachment();
              }._$bind(this),
              cancelFunc: s,
            });
          }._$bind(this),
        );
        this.__attchInfoNode.appendChild(t);
      }
    };
    h.__reloadUploadBtn = function () {
      if (this.__uploadUI) this.__uploadUI = _._$$SimpleFileUploadUI._$recycle(this.__uploadUI);
      var e = n.isEn()
        ? ' txt, mp3, jpg, png, rar, zip, doc, ppt, xls and pdf '
        : ' txt、mp3、jpg、png、rar、zip、doc、ppt、xls、pdf ';
      this.__uploadUI = _._$$SimpleFileUploadUI._$allocate({
        parent: this.__uploadNode,
        maxSize: 104857600,
        tip:
          window.moocConfig.lang.KEY_LEARN_SUPPORT +
          e +
          window.moocConfig.lang.KEY_LEARN_FORMAT_FILE +
          '100M<br/>' +
          window.moocConfig.lang.KEY_LEARN_ONLY_COVERED,
        suffixs: {
          support: [
            'txt',
            'pdf',
            'html',
            'jpg',
            'jpeg',
            'png',
            'mp3',
            'rar',
            'zip',
            'doc',
            'docx',
            'xls',
            'xlsx',
            'ppt',
            'pptx',
          ],
          max: '100M',
        },
        beginUpload: function () {
          _._$hiddenNode(this.__attchInfoNode);
        }._$bind(this),
        onFinishUpload: function (e) {
          if (e) {
            this.__reloadUploadBtn();
            this.__genfileData(e);
            this.__addAttachInfo(!1);
            _._$showNode(this.__attchInfoNode);
          }
        }._$bind(this),
        abortUpload: function () {
          this.__reloadUploadBtn();
          this.__addAttachInfo(!1);
          _._$showNode(this.__attchInfoNode);
        }._$bind(this),
      });
    };
    h.__reset = function (e) {
      this.__aid = e.aid;
      this.__supReset(e);
    };
    h.__destroy = function () {
      if (this.__uploadUI) this.__uploadUI = _._$$SimpleFileUploadUI._$recycle(this.__uploadUI);
      if (this.__titleAttachmentNode) this.__titleNode.removeChild(this.__titleNode.lastChild);
      this.__richOrTextNode.innerHTML = '';
      this.__supDestroy();
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'c3d8b9ca858a4c969aa91fbe6e8bca0c',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '42eab86c23843111e2b03f8dcbf33521',
  'd1e03ebff12e244305142f6bc3caf737',
  '3f9cd2835e49e1a4b1d9cfa0e92683b1',
  '9404c0406a53242cb88cc30ecf858b38',
  'fb6ef2aff84297ee79ff49759e2f6468',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '24f8154ce482a05ab133345b291e357f',
  '93828627ddb358ed890cb65967a0c1de',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
