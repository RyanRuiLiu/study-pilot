EDU(
  'cafdd5186cffb672997fd8e30345b39b',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d;
    var _ = n._$pushCSSText(
      '    .epayAccount .ml{margin-left:20px;display: inline-block;height: 36px;line-height: 36px;}    .epayAccount .mailN{height: 36px;line-height: 36px;}    ',
    );
    var l = n._$addNodeTemplate(
      '<div class="epayAccount">                                        <div class="j-mailOpr mailOpr">                                            <div class="j-add f-cb add">                                                <div class="f-fl"></div>                                                <a class="btn f-fl ml"><span>添加</span></a>                                                <a class="cancel f-fl ml">取消</a>                                                <div class="j-addFb f-fl"></div>                                            </div>                                            <div class="j-verify verify f-cb">                                                <div class="f-fl mailN"></div>                                                <a class="btn btn1 f-fl ml" target="_blank"><span>验证账号</span></a>                                                <a class="f-fl change ml" style="display:none">修改账号</a>                                                <div class="f-fl"></div>                                            </div>                                        </div>                                        <div class="j-mailTxt mailTxt f-dn"></div>                                    </div>',
    );
    c._$$EpayAccountBindUI = NEJ.C();
    d = c._$$EpayAccountBindUI._$extend(c._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = l;
      this.__seed_css = _;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__mailAdd = n._$getByClassName(this.__body, 'j-add')[0];
      this.__mailverify = n._$getByClassName(this.__body, 'j-verify')[0];
      this.__mailAddChildren = n._$getChildren(this.__mailAdd);
      this.__verifyChildren = n._$getChildren(this.__mailverify);
      a._$addEvent(this.__mailAddChildren[1], 'click', this.__checkMail._$bind(this));
      a._$addEvent(this.__verifyChildren[2], 'click', this.__toggleAddVerfiy._$bind(this, !0));
      a._$addEvent(this.__mailAddChildren[2], 'click', this.__toggleAddVerfiy._$bind(this, !1));
      this.__settingsCache = new s._$$COM_Cache_TermSettingsCache();
      this.__settingsCache._$addEvent('onsaveMemberEpayAccount', this.__onsaveAccount._$bind(this));
      this.__settingsCache._$addEvent(
        'oncheckMemberEpayAccountState',
        this.__oncheckMemberEpayAccountState._$bind(this),
      );
      this.__settingsCache._$addEvent('onGetMemberInfo', this.__onGetMemberInfo._$bind(this));
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__verifyFbUI = c._$$FeedBackUI._$allocate({ parent: this.__verifyChildren[3] });
      this.__verifyFbUI._$hideFeedback();
      this.__onGetMemberInfo(e.data);
    };
    d._$getMail = function () {
      return this.__memberVo.epayAccount;
    };
    d._$showNecessaryTip = function () {
      this.__mailAddFbUI._$showWarnTips('请填写你的网易支付账号');
    };
    d.__onGetMemberInfo = function (e) {
      this.__memberVo = e;
      var t = this.__memberVo.epayAccount ? !1 : !0;
      this.__toggleAddVerfiy(t);
    };
    d.__oncheckMemberEpayAccountState = function (e) {
      this.__settingsCache._$getMemberInfo(c._$getWebUser().id);
    };
    d.__onsaveAccount = function (e) {
      if (!e) c.showToastTips({ content: '保存失败', type: 2 });
      else this.__settingsCache._$getMemberInfo(c._$getWebUser().id);
    };
    d.__checkMail = function () {
      if (this.__mailIptUI) {
        var e = this.__mailIptUI._$getContent();
        var t = this.__mailIptUI._$getCount();
        if (t <= 0) {
          this.__mailAddFbUI._$showWarnTips('请填写你的网易支付账号');
          return;
        } else if (
          !this.__mailIptUI._$isMatchExp(/@([a-z0-9]+[_|\-|\.]?)*[a-z0-9]+\.[a-z]{2,3}$/i)
        ) {
          this.__mailAddFbUI._$showWarnTips('邮箱格式不对');
          return;
        }
        this.__settingsCache._$saveMemberEpayAccount(e);
      }
    };
    d.__checkEpayAccount = function () {
      this.__settingsCache._$checkMemberEpayAccountState();
    };
    d.__toggleAddVerfiy = function (e) {
      if (e) {
        var t = this.__mailAddChildren[0],
          i = this.__mailAddChildren[1],
          o = this.__mailAddChildren[3],
          s = this.__mailAddChildren[2];
        c._$hiddenNode(s);
        this.__clearUI();
        this.__mailIptUI = c._$$BaseInputUI._$allocate({
          parent: t,
          labelText: 'name@example.com',
          width: 214,
          height: 32,
          onInputFocus: function () {
            if (this.__mailAddFbUI) this.__mailAddFbUI._$hideFeedback();
          }._$bind(this),
        });
        this.__mailAddFbUI = c._$$FeedBackUI._$allocate({ parent: o });
        this.__mailAddFbUI._$hideFeedback();
        if (this.__memberVo.epayAccount) {
          n._$getChildren(i)[0].innerText = '保存';
          c._$showNode(s);
        }
        c._$hiddenNode(this.__mailverify);
        c._$showNode(this.__mailAdd);
      } else {
        c._$hiddenNode(this.__mailAdd);
        this.__clearUI();
        c._$showNode(this.__mailverify);
        var r = this.__verifyChildren[0],
          i = this.__verifyChildren[1],
          d = this.__verifyChildren[3];
        r.innerText = this.__memberVo.epayAccount || '';
        a._$clearEvent(i);
        var _ = this.__memberVo.epayAccountState || 0;
        if (1 == _) {
          c._$hiddenNode(i);
          this.__verifyFbUI._$showRightTips('已验证');
        } else {
          c._$showNode(i);
          n._$replaceClassName(i, 'btn2', 'btn1');
          n._$getChildren(i)[0].innerText = '立即验证账号';
          if (0 == _) this.__verifyFbUI._$showWarnTips('未验证');
          else if (2 == _) this.__verifyFbUI._$showWarnTips('该网易支付账号未激活');
          else if (3 == _) this.__verifyFbUI._$showWarnTips('账号不存在');
          else if (4 == _) this.__verifyFbUI._$showWarnTips('账号异常，请确认');
          this.__doInitDomEvent([[i, 'click', this.__checkEpayAccount._$bind(this)]]);
        }
      }
    };
    d.__clearUI = function () {
      if (this.__mailIptUI) this.__mailIptUI = c._$$BaseInputUI._$recycle(this.__mailIptUI);
      if (this.__mailAddFbUI) this.__mailAddFbUI = c._$$FeedBackUI._$recycle(this.__mailAddFbUI);
      if (this.__tipFbUI) this.__tipFbUI = c._$$FeedBackUI._$recycle(this.__tipFbUI);
    };
    d.__destroy = function () {
      this.__clearUI();
      if (this.__verifyFbUI) this.__verifyFbUI = c._$$FeedBackUI._$recycle(this.__verifyFbUI);
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'fee4c38f314dd0beb1624df2aa08cdc8',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'cc26d5920093e9742f0feca3855e8e68',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
