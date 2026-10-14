EDU(
  '208a8147fce417dc5fb4918a01c31b49',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.ut'),
      r = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('nej.ui'),
      l;
    r._$$ICLoginForm = NEJ.C();
    l = r._$$ICLoginForm._$extend(a._$$Event, !0);
    l.__reset = function (e) {
      this.__supReset(e);
      this.__fromWhere = e.from;
      this.__body = e.parent;
      this.__nodes = i._$getByClassName(this.__body, 'j-iarea');
      this.__failNode = i._$getByClassName(this.__body, 'j-failUrl')[0];
      this.__tipNode = i._$getByClassName(this.__body, 'j-tip')[0];
      this.__initUIs();
      this.__form = this.__body.getElementsByTagName('FORM')[0];
      this.__setReturnUrl();
      this.__autologin = i._$getByClassName(this.__body, 'j-autologin')[0];
      this.__checkBox = i._$getByClassName(this.__body, 'u-checkbox')[0];
      if (this.__autologin) {
        o._$addEvent(
          this.__autologin,
          r._$isIE() ? 'propertychange' : 'change',
          this.__checkSaveLogin._$bind(this, this.__autologin),
        );
        o._$addEvent(
          this.__autologin,
          'click',
          function () {
            if (!i._$hasClassName(this.__checkBox, 'u-checkbox-select'))
              i._$addClassName(this.__checkBox, 'u-checkbox-select');
            else i._$delClassName(this.__checkBox, 'u-checkbox-select');
          }._$bind(this),
        );
      }
      this.__submitBtn = i._$getByClassName(this.__body, 'j-submit')[0];
      o._$addEvent(this.__submitBtn, 'click', this.__onSubmit._$bind(this));
      this.__forgetNode = i._$getByClassName(this.__body, 'u-forget')[0];
      this.__regNode = this.__forgetNode.parentNode.getElementsByTagName('a')[0];
      o._$addEvent(
        this.__forgetNode,
        'click',
        function () {
          var e = '_登录前';
          r._$trackEvent(this.__fromWhere, '爱课程网账号登陆忘记密码', this.__forgetNode.href + e);
        }._$bind(this),
      );
      o._$addEvent(
        this.__regNode,
        'click',
        function () {
          var e = '_登录前';
          r._$trackEvent(this.__fromWhere, '爱课程网账号登陆忘记密码', this.__regNode.href + e);
        }._$bind(this),
      );
    };
    l.__onSubmit = function (t) {
      var n = '',
        i = '',
        o = e.location.href;
      this.__form['username'].value = this.__userNameUI._$getContent();
      this.__form['passwd'].value = this.__passwrdUI._$getContent();
      if (this.__form['username'].value && this.__form['passwd'].value) {
        if (e.oauthType) i = '/member/icourseLogin.htm';
        else i = e.urlPrefix.loginPrefix || '';
        if (o.indexOf('emailEncoded') < 0)
          o =
            e.location.protocol +
            '//' +
            e.location.host +
            i +
            e.location.search +
            (o.indexOf('?') > 0 ? '&' : '?') +
            'emailEncoded=' +
            s._$str2b64(this.__userNameUI._$getContent());
        else
          o =
            e.location.protocol +
            '//' +
            e.location.host +
            i +
            '?emailEncoded=' +
            s._$str2b64(this.__userNameUI._$getContent()) +
            '&returnUrl=' +
            s._$str2b64(e.returnUrl) +
            '&oauthType=' +
            e.oauthType;
        this.__form['failUrl'].value = s._$str2b64(o);
        this.__form['oauthType'].value = e.oauthType || '';
        this.__form.submit();
        if (this.__fromWhere) {
          r._$trackEvent(this.__fromWhere, '爱课程网账号登陆', this.__form.action);
          r._$trackEvent('爱课程点击', 'click', '登陆弹窗');
        }
      }
    };
    l.__onInputWrite = function (e, t) {
      var n = o._$getElement(t);
      if (n && n.name)
        switch (t.keyCode) {
          case 13:
            o._$stop(t);
            if ('username' == e && this.__userNameUI._$getContent())
              this.__passwrdUI._$focusTextArea();
            else if ('password' == e && this.__passwrdUI._$getContent()) this.__onSubmit();
            break;
          case 9:
            o._$stop(t);
            if ('username' == e) this.__passwrdUI._$focusTextArea();
            else if ('password' == e) this.__userNameUI._$focusTextArea();
        }
    };
    l.__initUIs = function () {
      var t = e.uname;
      this.__userNameUI = r._$$BaseInputUI._$allocate({
        inputArea: this.__nodes[0],
        content: t || '',
        onInputFocus: function () {
          this.__tipUI._$hideFeedback();
          i._$addClassName(this.__nodes[0], 'active');
        }._$bind(this),
        onInputBlur: function (e) {
          this._$dispatchEvent('onUserNameBlur', e);
          i._$delClassName(this.__nodes[0], 'active');
        }._$bind(this),
        onInputKeyDown: this.__onInputWrite._$bind(this, 'username'),
      });
      this.__passwrdUI = r._$$BaseInputUI._$allocate({
        inputArea: this.__nodes[1],
        onInputFocus: function () {
          this.__tipUI._$hideFeedback();
          i._$addClassName(this.__nodes[1], 'active');
        }._$bind(this),
        onInputBlur: function () {
          i._$delClassName(this.__nodes[1], 'active');
        }._$bind(this),
        onInputKeyDown: this.__onInputWrite._$bind(this, 'password'),
      });
      this.__tipUI = r._$$FeedBackUI._$allocate({ parent: this.__tipNode });
      if (t) this.__tipUI._$showErrorTips('账号或密码错误，请重新输入', !1);
      else this.__tipUI._$hideFeedback();
    };
    l.__setReturnUrl = function () {
      this.__form['returnUrl'].value = s._$str2b64(r._$getDecodeCurUrl());
    };
    l.__checkSaveLogin = function (e) {
      if (e.checked) this.__form['savelogin'].value = !0;
      else this.__form['savelogin'].value = !1;
    };
    l.__destroy = function () {
      this.__doClearComponent();
      this.__supDestroy();
    };
    return r._$$ICLoginForm;
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '73940963cbde37a0177f383a34a3cf2a',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '02c14b544f21e379de73ba82b326d2a9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '493607ab361630ca82fc5bf094051616',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'c23a9d4e237326dadfa12366ae1b6e48',
);
