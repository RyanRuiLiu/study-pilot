EDU(
  '126d23b5ac6aef1dd83e84a4a70524a3',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c,
      d;
    var l = e.isEn();
    var _ = l
      ? '        <div class="f-fc6 j-title title f-f0" style="line-height: 50px;">Successfully enrolled!</div>        <p class="j-cnt cnt f-f0 f-fs14"></p>    '
      : '        <div class="f-fc6 j-title title f-f0">报名成功！</div>        <p class="j-cnt cnt f-f0 f-fs14">重要的课程提醒将通过邮件通知，请填写常用<br/>邮箱：</p>    ';
    var u = l
      ? '<div style="display: none;" class="j-add f-cb add">        <div class="f-fl"></div>        <div class="j-addFb f-fl"></div>    </div>'
      : '<div class="j-add f-cb add">        <div class="f-fl"></div>        <div class="j-addFb f-fl"></div>    </div>';
    var f = l
      ? '<div style="display: none;" class="f-cb btns">        <a style="display: none;" hidefocus="true" class="f-fr j-right u-btn-default u-btn-sm u-save u-btn"><span class="j-right-txt">Confirm</span></a>        <a hidefocus="true" class="f-fr j-left gotoLearn f-f0 f-fs18"><span class="j-left-txt">Go to directly</span></a>        <a hidefocus="true" class="f-fr j-know u-btn-default u-btn-sm u-save u-btn" style="display:none"><span>OK</span></a>    </div>'
      : '<div class="f-cb btns">        <a hidefocus="true" class="f-fr j-right u-btn-default u-btn-sm u-save u-btn"><span class="j-right-txt">保存</span></a>        <a hidefocus="true" class="f-fr j-left gotoLearn f-f0 f-fs18"><span class="j-left-txt">直接进入学习</span></a>        <a hidefocus="true" class="f-fr j-know u-btn-default u-btn-sm u-save u-btn" style="display:none"><span>知道了</span></a>    </div>';
    var h = '<div class="icn icn-success"' + (l ? ' style="margin-bottom: 0;"' : '') + '></div>';
    var p = o._$addNodeTemplate(
      '        <div class="m-commonMailDialog f-cb">            <div class="all j-all f-fl">' +
        h +
        _ +
        u +
        f +
        '</div>        </div>',
    );
    r._$$CommonMailDialog = NEJ.C();
    c = r._$$CommonMailDialog._$extend(r._$$Window, !0);
    r._$$CommonMailDialog._$showDialog = function (e) {
      var t = r._$$CommonMailDialog._$allocate(e);
      t._$show();
    };
    c.__initXGui = function () {
      this.__seed_html = p;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__title = o._$getByClassName(this.__body, 'title')[0];
      this.__cnt = o._$getByClassName(this.__body, 'j-cnt')[0];
      this.__saveBtn = o._$getByClassName(this.__body, 'j-right')[0];
      this.__knowBtn = o._$getByClassName(this.__body, 'j-know')[0];
      this.__gotoLearnBtn = o._$getByClassName(this.__body, 'j-left')[0];
      this.__gotoLearnBtnTxt = o._$getByClassName(this.__body, 'j-left-txt')[0];
      this.__mailAdd = o._$getByClassName(this.__body, 'j-add')[0];
      this.__mailAddChildren = o._$getChildren(this.__mailAdd);
      this.__iptNode = this.__mailAddChildren[0];
      this.__fbNode = this.__mailAddChildren[1];
      a._$addEvent(this.__saveBtn, 'click', this.__checkMail._$bind(this));
      a._$addEvent(this.__gotoLearnBtn, 'click', this.__gotoLearn._$bind(this));
      a._$addEvent(this.__knowBtn, 'click', this.__gotoLearn._$bind(this));
      this.__settingsCache = new s._$$COM_Cache_MemberCache();
      this.__settingsCache._$addEvent('onsaveEmail', this.__onsaveEmail._$bind(this));
      this.__settingsCache._$addEvent(
        'onsendActiveEmail',
        function (e, t) {
          if (t) {
            var n = l ? 'Mail sent successfully' : '邮件发送成功';
            var i = l ? 'Mail sent failed' : '邮件发送失败';
            var o = e ? n : i,
              a = e ? 1 : 2;
            r.showToastTips({ content: o, type: a });
          }
        }._$bind(this),
      );
    };
    c.__checkMail = function () {
      if (this.__mailIptUI) {
        var e = this.__mailIptUI._$getContent();
        var t = this.__mailIptUI._$getCount();
        if (t <= 0) {
          var n = l ? 'Please fill in your frequently used email address' : '请填写你的常用邮箱';
          this.__mailAddFbUI._$showWarnTips(n, !0);
          return;
        } else if (
          !this.__mailIptUI._$isMatchExp(/@([a-z0-9]+[_|\-|\.]?)*[a-z0-9]+\.[a-z]{2,3}$/i)
        ) {
          var n = l ? 'Please input a valid email address' : '请输入正确的邮箱地址';
          this.__mailAddFbUI._$showWarnTips('请输入正确的邮箱地址', !0);
          return;
        }
        this.__settingsCache._$saveEmail(e);
      }
    };
    c.__gotoLearn = function () {
      this._$dispatchEvent('onGotoLearn');
      this.__gotoLearnFlag = !0;
      this._$hide();
    };
    c.__onsaveEmail = function (e, t) {
      if (t) {
        this.__recycleUI();
        var n = l ? 'Email saved successfully' : '邮箱保存成功！';
        if (this.__startOffset > 0) {
          r._$hiddenNode(this.__gotoLearnBtn);
          r._$showNode(this.__knowBtn);
          r._$hiddenNode(this.__saveBtn);
          r._$hiddenNode(this.__cnt);
          this.__title.innerHTML = n;
        } else {
          var i = l ? 'Go to the course' : '进入学习';
          this.__gotoLearnBtnTxt.innerHTML = i;
          r._$hiddenNode(this.__saveBtn);
          r._$hiddenNode(this.__cnt);
          this.__title.innerHTML = n;
        }
        this.__sendVerifyEmail();
      }
    };
    c.__sendVerifyEmail = function (e) {
      this.__settingsCache._$sendActiveEmail(e);
    };
    c.__reset = function (e) {
      e.maskClickNotHidden = !0;
      e.title = e.title || ' ';
      this.__startOffset = e.start;
      this.__recycleUI();
      this.__supReset(e);
      if (!l) this.__genUI();
    };
    c.__genUI = function () {
      this.__mailIptUI = r._$$BaseInputUI._$allocate({
        parent: this.__iptNode,
        labelText: 'name@example.com',
        width: 270,
        height: 32,
        onInputFocus: function () {
          if (this.__mailAddFbUI) this.__mailAddFbUI._$hideFeedback();
        }._$bind(this),
      });
      this.__mailAddFbUI = r._$$FeedBackUI._$allocate({ parent: this.__fbNode });
      this.__mailAddFbUI._$hideFeedback();
      if (this.__startOffset > 0) r._$hiddenNode(this.__gotoLearnBtn);
    };
    c.__recycleUI = function () {
      if (this.__mailIptUI) this.__mailIptUI = r._$$BaseInputUI._$recycle(this.__mailIptUI);
      if (this.__mailAddFbUI) this.__mailAddFbUI = r._$$FeedBackUI._$recycle(this.__mailAddFbUI);
    };
    c.__destroy = function () {
      if (!this.__gotoLearnFlag) this._$dispatchEvent('enrollnotGotoLearn');
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'ddff3fe6a4233d567887a1921f3f1668',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '891a76809ded82c88f5536f4458ae1ad',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'cc26d5920093e9742f0feca3855e8e68',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
