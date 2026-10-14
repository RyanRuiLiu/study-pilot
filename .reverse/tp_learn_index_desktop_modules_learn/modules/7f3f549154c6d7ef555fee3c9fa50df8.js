EDU(
  '7f3f549154c6d7ef555fee3c9fa50df8',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.ui'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('nej.$'),
      _;
    var l = n._$addHtmlTemplate(
      '\t\t\t<div class="u-gradeWrap f-f0">\t\t\t    <div class="j-cnt">\t\t\t\t</div>\t\t\t</div>\t\t',
    );
    r._$$GradeDialog = NEJ.C();
    _ = r._$$GradeDialog._$extend(r._$$Window, !0);
    r._$$GradeDialog._$showDialog = function (e) {
      var t = r._$$GradeDialog._$allocate(e);
      t._$show();
    };
    _.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(n._$getHtmlTemplate(l));
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__cntNode = n._$getByClassName(this.__body, 'j-cnt')[0];
    };
    _.__genScholarRecode = function (t) {
      if (t) {
        this.__result = this.__formatResultDto(t.data[0]);
        var i = n._$getHtmlTemplate(
          'jst-edu-scholarship-record',
          c._$merge(
            {
              code: t.code,
              resultDto: this.__result,
              userName: e.webUser.nickName,
              scholarshipInfoValid: t.scholarshipInfoValid,
            },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        );
        this.__cntNode.innerHTML = i;
        this.__genReceivePrizeUI(t.scholarshipInfoValid);
        this.__shareNode = n._$getByClassName(this.__cntNode, 'j-infoshare')[0];
        this.__genWeiXinQR(this.__result);
      }
    };
    _.__genTermScoreRank = function (e) {
      if (e) {
        if (1 == e.code) this.__result = this.__formatResultDto(e.resultDto);
        var t = n._$getHtmlTemplate(
          'jst-edu-score-rank',
          c._$merge(
            { code: e.code, resultDto: this.__result },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        );
        this.__cntNode.innerHTML = t;
        if (1 == e.code) {
          this.__shareNode = n._$getByClassName(this.__cntNode, 'j-infoshare')[0];
          this.__genWeiXinQR(this.__result);
        } else {
          this.__knownNode = n._$getByClassName(this.__cntNode, 'j-known')[0];
          a._$addEvent(
            this.__knownNode,
            'click',
            function () {
              switch (e.code) {
                case -1:
                  window.location.href = window.location.href.split('#')[0] + '#/learn/testlist';
                  break;
                case 0:
                  this.__closeHandle();
                  break;
                case -2:
                  this.__closeHandle();
                  break;
                case -3:
                  this.__closeHandle();
              }
            }._$bind(this),
          );
        }
        this.__genReceivePrizeUI();
      }
    };
    _.__genReceivePrizeUI = function (e) {
      this.__fill = n._$getByClassName(this.__cntNode, 'j-fill')[0];
      a._$addEvent(
        this.__fill,
        'click',
        function () {
          r._$hiddenNode(n._$getByClassName(document.body, 'u-gradetDialog')[0]);
          r._$hiddenNode(d(n._$getByClassName(document.body, 'u-gradetDialog')[0])._$prev()[0]);
          if (2 == this.__type && e === !1)
            r._$$ReceivePrizeCAEDialog._$showDialog({
              from: 'u-gradetDialog',
              needRefresh: !0,
              onFill: this.__finishFillPrizeCb._$bind(this),
            });
          else r._$$ReceivePrizeCAEDialog._$showDialog({ from: 'u-gradetDialog' });
        }._$bind(this),
      );
    };
    _.__finishFillPrizeCb = function () {
      this.__fill.innerText = window.moocConfig.lang.KEY_LEARN_MODIFY_INFORMATION;
    };
    _.__genWeiXinQR = function (t) {
      var i = e.courseDto;
      var n =
        window.location.protocol +
        '//study.163.com/topics/shareGrade_m/?type=' +
        this.__type +
        '&nick=' +
        e.webUser.nickName +
        '&cn=' +
        i.name +
        '&amount=' +
        t.amount +
        '&score=' +
        t.totalScoreWithBonus +
        '&beat=' +
        t.beatRate +
        '&rank=' +
        t.rankNew +
        '&enroll=' +
        t.enrollCount +
        '&improved=' +
        t.improved;
      this.__weixinQRParams = n;
      this.__genShareUI();
    };
    _.__genShareUI = function () {
      var t = e.courseDto,
        i = [
          '我正在参与#中国大学MOOC#十万奖学金活动！',
          '我得到了#中国大学MOOC#颁发的奖学金！',
          '我在#中国大学MOOC#学完了《' + t.name + window.moocConfig.lang.KEY_LEARN_SYMBOL1,
        ];
      var n, a;
      if (this.__shareUI) this.__shareUI = r._$$ShareUI._$recycle(this.__shareUI);
      if (1 == this.__type) {
        n =
          window.moocConfig.lang.KEY_LEARN_I_IN +
          t.name +
          window.moocConfig.lang.KEY_LEARN_SCORE_IS +
          this.__result.totalScoreWithBonus +
          '分，排名第' +
          this.__result.rankNew +
          '，击败了' +
          this.__result.beatRate +
          '%的用户，';
        if (this.__result.rankNew <= 3) n += '当之无愧是学霸！活动地址戳>>';
        else n += '再努力加把劲，就能参与瓜分奖金了！活动地址戳>>';
        a = i[0];
      } else if (2 == this.__type)
        if (parseFloat(this.__result.amount) > 0) {
          n =
            '我在《' +
            t.name +
            window.moocConfig.lang.KEY_LEARN_SCORE_IS +
            this.__result.totalScoreWithBonus +
            '分，排名第' +
            this.__result.rankNew +
            '，击败了' +
            this.__result.beatRate +
            '%的用户，优秀源自于每日的坚持，努力不易，实至名归！';
          a = i[1];
        } else {
          n =
            '我在《' +
            t.name +
            window.moocConfig.lang.KEY_LEARN_SCORE_IS +
            this.__result.totalScoreWithBonus +
            '分，排名第' +
            this.__result.rankNew +
            '，击败了' +
            this.__result.beatRate +
            '%的用户，虽然和十万奖学金擦肩而过，但这是我曾经努力过的证明！';
          a = i[2];
        }
      this.__shareUI = r._$$ShareUI._$allocate({
        parent: this.__shareNode,
        title: n,
        topic: a,
        description: n,
        pic: '//edu-image.nosdn.127.net/7C765B86153AB710C45FA1D90D3AE403.jpg?imageView&thumbnail=130y100&quality=100',
        weixinQRParams: this.__weixinQRParams,
        url: '//www.icourse163.org/topics/2016scholarship/',
        from: window.moocConfig.lang.KEY_LEARN_COURSE_PAGE,
      });
    };
    _.__addScriptTag = function (e) {
      var t = document.createElement('script');
      t.setAttribute('type', 'text/javascript');
      t.src = e;
      document.body.appendChild(t);
    };
    _.__formatResultDto = function (e) {
      if (e) {
        if (e.rankNew) {
          e.beatRate = (100 * (1 - e.rankNew / e.enrollCount)).toFixed(2);
          if (e.rankLast) e.improved = e.rankNew - e.rankLast;
          else e.improved = 0;
        }
        return e;
      }
    };
    _.__reset = function (e) {
      e.title = '';
      e.clazz = 'u-gradetDialog';
      e.maskClickNotHidden = !0;
      e.onclose = this.__onClose._$bind(this);
      this.__type = e.type;
      this.__supReset(e);
      if (2 == this.__type) this.__genScholarRecode(e.data);
      else if (1 == this.__type) this.__genTermScoreRank(e.data);
    };
    _.__onClose = function () {
      if (
        this.__fill &&
        this.__fill.innerText == window.moocConfig.lang.KEY_LEARN_MODIFY_INFORMATION
      )
        window.location.reload();
    };
    _.__closeHandle = function () {
      this._$hide();
    };
    _.__destroy = function () {
      this.__cntNode.innerHTML = '';
      this.__supDestroy();
    };
  },
  'ddff3fe6a4233d567887a1921f3f1668',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'd702c6c0bcd70f9b4114ae0d7c2ea1b8',
  '1739fa74ae085e454b5fe7821640d9db',
  'be836b3e4eb69c3616f9cc097e503955',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
