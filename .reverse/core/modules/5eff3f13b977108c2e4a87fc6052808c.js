EDU(
  '5eff3f13b977108c2e4a87fc6052808c',
  function (e, t, n) {
    var i = window;
    var o = e.$extends({
      config: function () {
        this.supr();
        this.data.formData = {
          returnUrl: '',
          failUrl: '',
          saveLogin: !0,
          oauthType: '',
          username: '',
          passwd: '',
        };
        this.data.error = null;
      },
      init: function () {
        this.supr();
        this.data.formData.returnUrl = this.getReturnUrl();
        this.data.formData.oauthType = this.getOAuthType();
        this.checkError();
      },
      getReturnUrl: function () {
        return t._$str2b64(i.location.href);
      },
      getFailUrl: function () {
        var e = i.location.href,
          n = '';
        var o =
          i && i.urlPrefix && i.urlPrefix.loginPrefix
            ? i.urlPrefix.loginPrefix
            : '/member/login.htm';
        if (i.oauthType) n = '/member/icourseLogin.htm';
        else n = o;
        if (e.indexOf('emailEncoded') < 0)
          e =
            i.location.protocol +
            '//' +
            i.location.host +
            n +
            i.location.search +
            (e.indexOf('?') > 0 ? '&' : '?') +
            'emailEncoded=' +
            t._$str2b64(this.data.formData.username);
        else
          e =
            i.location.protocol +
            '//' +
            i.location.host +
            n +
            '?emailEncoded=' +
            t._$str2b64(this.data.formData.username) +
            '&returnUrl=' +
            t._$str2b64(i.returnUrl) +
            '&oauthType=' +
            (i.oauthType || '');
        return t._$str2b64(e);
      },
      getOAuthType: function () {
        return i.oauthType || '';
      },
      checkError: function () {
        var e = n._$query2object((i.location.search || '').slice(1)),
          o;
        if ('-1' === e['errorCode']) {
          o = t._$b642str(e.emailEncoded || '');
          this.data.formData.username = o;
          this.data.error = { field: 'username', message: '账号或密码错误' };
          this.$update();
        }
      },
      destroy: function () {
        this.supr();
      },
      getValidError: function (e) {
        switch (e) {
          case 'username':
            if (!this.data.formData.username) return { field: 'username', message: '请填写用户名' };
            else return null;
          case 'passwd':
            if (!this.data.formData.passwd) return { field: 'passwd', message: '请填写密码' };
            else return null;
          default:
            if (!this.data.formData.username) return { field: 'username', message: '请填写用户名' };
            if (!this.data.formData.passwd) return { field: 'passwd', message: '请填写密码' };
            else return null;
        }
      },
      removeValidError: function () {
        if (this.data.error) {
          var e = this.data.error.field;
          this.data.error = this.getValidError(e);
          this.$update();
        }
      },
      handleSubmit: function () {
        var e = this.getValidError();
        if (!e) {
          this.$refs.failUrl.value = this.getFailUrl();
          this.$refs.form.submit();
        } else {
          this.data.error = e;
          this.$update();
        }
      },
      checkEnterSubmit: function (e) {
        if (13 == e.which) {
          e.preventDefault();
          this.handleSubmit();
        }
      },
    });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'fe86216ed59e3103a56c42c850d389f0',
);
