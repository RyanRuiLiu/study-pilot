EDU(
  '4a45c42fc3231760231794e7a1c4e452',
  function () {
    var e = window,
      t = NEJ.P('nej.e'),
      n = NEJ.P('nej.v'),
      i = NEJ.P('edu.m'),
      o = NEJ.P('edu.d'),
      a = NEJ.P('nej.j'),
      r = NEJ.P('edu.u'),
      s = NEJ.P('nej.ut'),
      c = NEJ.P('nej.u'),
      d,
      l = ['云课堂', '爱课程网'],
      u = new RegExp(/@([a-z0-9]+[_|\-|.]?)*[a-z0-9]+\.[a-z]{2,3}$/i);
    r._$$LoginWrapper = NEJ.C();
    d = r._$$LoginWrapper._$extend(r._$$UIBase, !0);
    d.__initXGui = function (e) {
      var n = t._$getHtmlTemplate('jst-edu-iclogin-form');
      var i = t._$getHtmlTemplate('jst-edu-cplogin-form');
      this.__seed_html = t._$addNodeTemplate(
        t._$getHtmlTemplate('jst-edu-login-dialog', {
          from: e.from,
          icloginform: n,
          cploginform: i,
        }),
      );
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__loginNodes = t._$getByClassName(this.__body, 'j-loginCnts');
      this.__tabs = t._$getByClassName(this.__body, 'j-tabs');
      this.__loginTip = t._$getByClassName(this.__body, 'j-loginTip')[0];
      this.__socialBox = t._$getByClassName(this.__body, 'j-social-box')[0];
      this.__cache = new o._$$COM_Cache_CommonCache();
      this.__cache._$addEvent('onCheckAccountStatus', this.__onCheckAccountStatus._$bind(this));
      var e = { loginOrAuthType: 0 };
      this.__thirdBindUtil = i.thirdBindUtil(e);
      n._$addEvent(this.__loginTip, 'click', this.__onTipClick._$bind(this));
    };
    d.__onUserNameBlur = function (e) {
      if (e && u.test(e)) {
        this.__email = e;
        this.__cache._$checkAccountStatus(e);
      }
    };
    d.__onTipClick = function (e) {
      var i = n._$getElement(e, 'c:j-btn'),
        o = t._$dataset(i, 'type');
      if (i && o) {
        if (this.__loginTip) r._$hiddenNode(this.__loginTip);
        this.__onTabWithInputNameFocus(o);
      }
    };
    d.__onTabWithInputNameFocus = function (e) {
      if (e == l[0]) this.__tab._$go(0);
      else if (e == l[1]) {
        this.__tab._$go(1);
        this.__icloginUI.__userNameUI._$setInitContent(this.__email);
        this.__icloginUI.__passwrdUI._$focusTextArea();
      }
    };
    d.__onCheckAccountStatus = function (n) {
      var i = !1,
        o;
      if (0 == this.__type && 11 == n) {
        i = !0;
        o = { type: l[1], type2: l[0] };
      }
      if (1 == this.__type && n == -1) {
        i = !0;
        o = { type: l[0], type2: l[1] };
      }
      if (i && !e.oauthType) {
        if (this.__loginTip) r._$showNode(this.__loginTip);
        this.__loginTip.innerHTML = t._$getHtmlTemplate('jst-edu-login-tips', o);
      }
    };
    d.__reset = function (o) {
      this.__supReset(o);
      this.__loginUI = i.bindLoginForm({
        parent: 'j-ursContainer',
        sucessCb: function () {
          if ('urs' == o.thirdBindType) e.location.href = e.urlPrefix.thirdBindCallbackHref;
          else if ('logout' !== e.currentPageName)
            if (o.returnUrl) e.location.href = o.returnUrl;
            else e.location.reload();
          else e.location.href = e.moocHref;
        },
        from: o.from,
        preFilledMail: o.preFilledMail || '',
      });
      this.__icloginUI = r._$$ICLoginForm._$allocate({
        parent: this.__loginNodes[2],
        onUserNameBlur: this.__onUserNameBlur._$bind(this),
        from: o.from,
      });
      this.__cploginUI = new r._$$CPLoginForm({ includeBox: 'cplogin-box' });
      var c = 0,
        d = e.existLoginType,
        u = o.thirdBindType;
      this.__email = e.email || '';
      if (u) c = 'urs' == u ? 1 : 2;
      else if (11 == a._$cookie('slgt') || e.uname) c = 1;
      this.__tab = s._$$Tab._$allocate({
        list: this.__tabs,
        index: c,
        event: 'click',
        selected: 'active',
        onchange: this.__onTabChange._$bind(this),
      });
      if (!u)
        if (11 == d) this.__onTabWithInputNameFocus(l[1]);
        else if (1 == d) this.__onTabWithInputNameFocus(l[0]);
        else this.__tab._$go(0, !0);
      this.__loginUI._$setFromWhere(o.from);
      this.__loginUI._$setCurUrl(this.__socialBox, o.aftParams);
      n._$addEvent(this.__socialBox, 'click', this.__snsDoClick._$bind(this));
      if (r._$isWap()) {
        this.__snsBox = t._$getByClassName(this.__body, 'm-snsbox')[0];
        this.__tabs[0].innerHTML = '网易邮箱账号<div class="f-pa bord"></div>';
        this.__tabs[1].innerHTML = '爱课程账号<div class="f-pa bord"></div>';
        this.__snsBox.children[0].children[0].innerHTML =
          '<div class="line f-pa"></div> <div class="huo f-pr">或</div>';
        if (r._$isWeixin()) this.__snsBox.children[1].children[0].style.display = 'inline-block';
      }
    };
    d.__onTabChange = function (e) {
      c._$forEach(this.__loginNodes, function (t, n) {
        if (n === e.index) {
          if (t) r._$showNode(t);
        } else if (t) r._$hiddenNode(t);
      });
      this.__type = e.index;
      if (this.__loginTip) r._$hiddenNode(this.__loginTip);
      c._$forEach(this.__tabs, function (e) {
        if (!t._$hasClassName(e, 'active')) t._$addClassName(e, 'inactive');
        else t._$delClassName(e, 'inactive');
      });
    };
    d.__snsDoClick = function (n) {
      var i = n.target || n.srcElement;
      if (t._$hasClassName(i, 'j-slink')) {
        var o = t._$dataset(i, 'varName');
        if (r._$isWap() && 'WECHAT' == o) {
          var a = window.location.search;
          window.location.href = e.moocHref + '/member/login/weixin.htm' + a;
        } else this.__thirdBindUtil._$open(r.CONST['LOGINTYPE'][o]);
        r._$trackEvent(o, 'click', '登陆弹窗');
      }
    };
    d.__destroy = function () {
      this.__doClearComponent();
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '8e2f9526f2ef67d8db97a9f392c1c087',
  '208a8147fce417dc5fb4918a01c31b49',
  'cba1a34d557181f80d15c9e3e6057ce2',
  'e1a49a8a4d86714fdfcd7216296e9001',
  'e3defd06257975c1084e0f9707de5e15',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'c1a44a564863a56b7daf00b04a3f7c26',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'e3defd06257975c1084e0f9707de5e15',
  'fe86216ed59e3103a56c42c850d389f0',
);
