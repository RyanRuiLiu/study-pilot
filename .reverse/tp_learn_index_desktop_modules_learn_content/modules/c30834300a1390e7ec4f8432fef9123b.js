EDU(
  'c30834300a1390e7ec4f8432fef9123b',
  function (e) {
    var t = e.isEn();
    var n = (window.moocConfig || {}).lang || {};
    var i = window,
      o = NEJ.O,
      a = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('edu.u'),
      l;
    var _ = s._$addNodeTemplate(
      '\t\t\t<div class="m-reportDialog">\t\t\t\t<div class="j-reportedit reportedit"></div>\t\t\t\t<div class="j-feedback feedback"></div>\t\t\t</div>',
    );
    d._$$ReportDialog = NEJ.C();
    l = d._$$ReportDialog._$extend(d._$$Window, !0);
    d._$$ReportDialog._$showDialog = function (e) {
      var t = d._$$ReportDialog._$allocate(e);
      t._$show();
    };
    l.__initXGui = function () {
      this.__seed_html = _;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__reporteditNode = s._$getByClassName(this.__body, 'j-reportedit')[0];
      this.__feedbackNode = s._$getByClassName(this.__body, 'j-feedback')[0];
      this.__reportCache = new c._$$COM_Cache_ReportCache();
      this.__reportCache._$addEvent('onReportCb', this.__onReportCb._$bind(this));
    };
    l.__onReportCb = function (e) {
      if (e) {
        d.showToastTips({ content: '提交成功，感谢你对中国大学MOOC的支持！', type: 1 });
        this._$hide();
      } else this.__feedbackUI._$showWarnTips('提交失败，请重试');
    };
    l.__onEditHandle = function () {
      var e = this.__editUI._$getContent();
      if ('' == e) this.__feedbackUI._$showWarnTips(this.__feedTxt, !0);
      else
        switch (this.__type) {
          case d.CONST.TALK_VOTE_POST:
            this.__reportCache._$reportPost(
              this.__vo.id,
              this.__vo.posterId,
              this.__vo.title,
              this.__vo.content,
              location.href,
              e,
            );
            break;
          case d.CONST.TALK_VOTE_REPLY:
            this.__reportCache._$reportReply(
              this.__vo.id,
              this.__vo.replyerId,
              this.__vo.content,
              location.href,
              e,
            );
            break;
          case d.CONST.TALK_VOTE_COMMENT:
            this.__reportCache._$reportComment(
              this.__vo.id,
              this.__vo.commentorId,
              this.__vo.content,
              location.href,
              e,
            );
        }
    };
    l.__onCloseHandle = function () {
      this._$hide();
    };
    l.__onFocusHandle = function () {
      this.__feedbackUI._$hideFeedback();
    };
    l.__destroy = function () {
      if (this.__feedbackUI) this.__feedbackUI = d._$$FeedBackUI._$recycle(this.__feedbackUI);
      if (this.__editUI) this.__editUI = d._$$EditItem._$recycle(this.__editUI);
      this.__supDestroy();
    };
    l.__reset = function (e) {
      this.__vo = e.vo;
      this.__type = e.type;
      e.title = e.title || '举报不良信息';
      e.clazz = 'u-window-pd';
      var t = e.placeHold || '请填写举报原因';
      this.__feedTxt = e.feedBackTxt || '请填写举报原因';
      this.__supReset(e);
      this.__feedbackUI = d._$$FeedBackUI._$allocate({ parent: this.__feedbackNode });
      this.__feedbackUI._$hideFeedback();
      this.__editUI = d._$$EditItem._$allocate({
        parent: this.__reporteditNode,
        labelText: t,
        btnText: '提交',
      });
      this.__editUI._$setInitContent('');
      this.__editUI._$addEvent('onFocusArea', this.__onFocusHandle._$bind(this));
      this.__editUI._$addEvent('onEditClick', this.__onEditHandle._$bind(this));
      this.__editUI._$addEvent('onCloseClick', this.__onCloseHandle._$bind(this));
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'ddff3fe6a4233d567887a1921f3f1668',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bbb7d6117a4fc9e146e67adf883521d6',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '7832f00c56a132c163eeaae343444dd9',
  'cc26d5920093e9742f0feca3855e8e68',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
