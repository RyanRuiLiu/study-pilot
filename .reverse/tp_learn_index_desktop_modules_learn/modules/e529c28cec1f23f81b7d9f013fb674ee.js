EDU(
  'e529c28cec1f23f81b7d9f013fb674ee',
  function () {
    var e = NEJ.P('nej.e'),
      t = NEJ.P('nej.u'),
      i = NEJ.P('nej.v'),
      n = NEJ.P('edu.u'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.d');
    var s = 6;
    var r = { 10: '申诉已提交', 20: '申诉处理中', 30: '申诉已处理', 40: '申诉已撤销' };
    var c = function (e, t, i, n, a, o) {
      if (!(1 !== Number(i) || Number(n) <= 0 || Number(a) <= 0) && window.DATracker)
        window.DATracker.track(e, {
          actionId: t,
          label: '-',
          user_id: o || '',
          term_id: n,
          exam_id: a,
        });
    };
    var d = function (e, t) {
      if ('string' == typeof e) return e || t;
      else return (e && (e.message || e.msg)) || t;
    };
    var _ = function (e) {
      e.__canAppeal = !1;
      e.__entryNode.textContent = '';
      e.__entryNode.disabled = !0;
      e.__entryNode.style.display = 'none';
      e.__statusNode.innerHTML = '';
    };
    var l = function (e, t, i) {
      var n = e.__entryNode.style;
      e.__canAppeal = i;
      e.__entryNode.textContent = t;
      e.__entryNode.disabled = !i;
      n.display = 'inline-block';
      n.boxSizing = 'border-box';
      n.height = '32px';
      n.padding = '0 20px';
      n.fontSize = '14px';
      n.lineHeight = '30px';
      n.borderRadius = '16px';
      n.color = i ? '#00c77b' : '#999';
      n.backgroundColor = i ? '#fff' : '#f5f5f5';
      n.border = '1px solid ' + (i ? '#00c77b' : '#d9d9d9');
      n.cursor = i ? 'pointer' : 'not-allowed';
      e.__statusNode.innerHTML = '';
      if (!e.__appealViewTracked) {
        c(
          '考试作答页-申诉入口-展示',
          'Web_item_view',
          e.__bizType,
          window.termDto && window.termDto.id,
          e.__bizId,
          e.__userId,
        );
        e.__appealViewTracked = !0;
      }
    };
    n._$$ScoreAppealUI = NEJ.C();
    var h = n._$$ScoreAppealUI._$extend(n._$$UIBase, !0);
    h.__initXGui = function () {
      this.__seed_html = e._$addNodeTemplate(
        e._$getHtmlTemplate('jst-edu-scoreAppeal', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__entryNode = e._$getByClassName(this.__body, 'j-scoreAppealEntry')[0];
      this.__statusNode = e._$getByClassName(this.__body, 'j-scoreAppealStatus')[0];
      this.__cache = new o._$$COM_Cache_ScoreAppealCache();
      this.__cache._$addEvent('onGetAppealStatus', this.__onStatus._$bind(this));
      this.__cache._$addEvent('onGetAppealStatusError', this.__onStatusError._$bind(this));
      this.__cache._$addEvent('onSubmitAppeal', this.__onSubmit._$bind(this));
      this.__cache._$addEvent('onSubmitAppealError', this.__onSubmitError._$bind(this));
      i._$addEvent(this.__entryNode, 'click', this.__submit._$bind(this));
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__bizType = e.bizType;
      this.__bizId = e.bizId;
      this.__userId = e.userId;
      this.__examType = e.examType;
      this.__hasSubjective = !!e.hasSubjective;
      this.__submitting = !1;
      this.__canAppeal = !1;
      this.__appealStatusRequested = !1;
      this.__appealViewTracked = !1;
      this.__entryNode.style.display = 'none';
      this.__statusNode.innerHTML = '';
      if (Number(this.__examType) !== s) this.__tryGetAppealStatus();
    };
    h.__tryGetAppealStatus = function () {
      var e = window.certificationRightsDto || {};
      var t = e.rightsType > 0 && e.rightsEndTime > +new Date();
      if (
        !this.__appealStatusRequested &&
        this.__hasSubjective &&
        this.__bizId &&
        1 == e.certified &&
        t
      ) {
        this.__appealStatusRequested = !0;
        this.__cache._$getAppealStatus(this.__bizType, this.__bizId);
      }
    };
    h._$setHasSubjective = function (e) {
      this.__hasSubjective = !!e;
      if (this.__hasSubjective) this.__tryGetAppealStatus();
      else {
        this.__entryNode.style.display = 'none';
        this.__statusNode.innerHTML = '';
      }
    };
    h.__onStatus = function (e) {
      var t = (e && e.result) || e || {};
      this.__status = t;
      if (this.__hasSubjective)
        if (t.status && r[t.status]) l(this, r[t.status], !1);
        else if (t.canAppeal) l(this, '申诉', !0);
        else _(this);
    };
    h.__onStatusError = function (e) {
      _(this);
      n._$$CommonDialog._$showDialog({ type: 1, message: d(e, '申诉状态获取失败，请刷新重试') });
    };
    h.__submit = function () {
      if (!this.__submitting && this.__canAppeal) {
        c(
          '考试作答页-申诉-点击',
          'Web_item_click',
          this.__bizType,
          window.termDto && window.termDto.id,
          this.__bizId,
          this.__userId,
        );
        this.__showDialog();
      }
    };
    h.__showDialog = function () {
      var t = document.createElement('div');
      t.style.cssText =
        'position:fixed;left:0;top:0;right:0;bottom:0;z-index:10000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;';
      var n = document.createElement('div');
      n.style.cssText = 'width:460px;background:#fff;padding:20px;box-sizing:border-box;';
      n.innerHTML =
        '<h3 style="margin:0 0 12px;font-size:16px">成绩申诉</h3><textarea class="j-appealReason" maxlength="2000" placeholder="请输入申诉理由" style="width:100%;height:120px;box-sizing:border-box;padding:8px"></textarea><div style="margin-top:12px;text-align:right"><button class="j-appealCancel" style="margin-right:8px">取消</button><button class="j-appealSubmit">提交申诉</button></div>';
      t.appendChild(n);
      document.body.appendChild(t);
      var a = e._$getByClassName(n, 'j-appealReason')[0];
      i._$addEvent(e._$getByClassName(n, 'j-appealCancel')[0], 'click', function () {
        document.body.removeChild(t);
      });
      i._$addEvent(
        e._$getByClassName(n, 'j-appealSubmit')[0],
        'click',
        function () {
          c(
            '考试作答页-申诉理由提交按钮-点击',
            'Web_item_click',
            this.__bizType,
            window.termDto && window.termDto.id,
            this.__bizId,
            this.__userId,
          );
          var e = (a.value || '').replace(/^\s+|\s+$/g, '');
          if (e) {
            document.body.removeChild(t);
            this.__submitting = !0;
            this.__entryNode.disabled = !0;
            this.__cache._$submitAppeal(this.__bizType, this.__bizId, e);
          } else window.alert('请输入申诉理由');
        }._$bind(this),
      );
    };
    h.__onSubmit = function (e) {
      this.__submitting = !1;
      this.__entryNode.disabled = !1;
      this.__onStatus(e);
      this.__cache._$getAppealStatus(this.__bizType, this.__bizId);
    };
    h.__onSubmitError = function (e) {
      this.__submitting = !1;
      this.__entryNode.disabled = !this.__canAppeal;
      n._$$CommonDialog._$showDialog({ type: 1, message: d(e, '申诉提交失败，请重试') });
    };
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '89b93e863cc28cb6585df6be96082031',
);
