EDU(
  '88e8566578468714d2825fe121ade995',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l = window;
    var u = e
      .$extends({
        config: function () {
          this._flushSetting(o, i);
          t.extend(this, {});
          t.extend(this.data, {
            tabs: i.tabConfig,
            selected: i.tabConfig[0],
            showCampus: !1,
            showPhoneLogin: !1,
            verifyParams: {},
          });
          this.supr();
        },
        init: function () {
          this.supr();
          for (var e = 0; e < this.data.tabs.length; e++) this.data.tabs[e].index = e;
          this.initUI();
          this.setClass();
        },
        handleCampus: function () {
          this.data.showCampus = !0;
          this.$update();
        },
        handleCancel: function () {
          var e = this;
          this.data.showCampus = !1;
          this.$update();
        },
        verifySuccess: function (e) {
          var t = this;
          this.data.showCampus = !1;
          this.data.showPhoneLogin = !0;
          this.data.verifyParams = e.data;
          this.$update();
          setTimeout(function () {
            t.initPhoneComponent();
          }, 100);
        },
        initPhoneComponent: function () {
          var e = this;
          var t = function (t) {
            var n = e.data.verifyParams;
            if (!n.shouldLoginDirect) {
              var i = {
                number: n.number,
                authCode: n.authCode,
                schoolId: n.schoolId,
                identityType: n.identityType,
              };
              sessionStorage.setItem('campus_login_first_success_params', JSON.stringify(i));
            }
            if ('/member/logoutResult.htm' !== l.location.pathname) l.location.reload();
            else l.location.href = l.urlPrefix.indexPrefix;
          };
          new d({
            data: {
              model: 0,
              ursCustomConfig: {
                mobileFirst: 1,
                cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
                cssFiles: 'nosurslogincss_a29d1e108edde5b11815c256c4adecd2.css',
                includeBox: 'j-ursContainer-1',
                single: 1,
                gotoRegText: '',
                regMbTxt: '注册并登录',
                preFilledMobile: e.data.verifyParams.phone,
                mbNeedItl: 0,
                smsLoginFirst: 1,
                logincb: t,
              },
            },
          }).$inject(this.$refs.phoneLoginUiBox);
        },
        setClass: function (e) {
          if (!e) e = 0;
          var t = this.$refs.uibox.children;
          for (var n = 0; n < this.data.tabs.length; n++)
            if (this.data.tabs[n].index != e) a._$addClassName(t[n], 'tab-hide');
            else a._$delClassName(t[n], 'tab-hide');
        },
        initUI: function () {
          var e;
          for (var t = 0; t < this.data.tabs.length; t++) {
            e = this.data.tabs[t];
            new e.component({ data: e.data })
              .$on('changeStatus', this.changeStatus._$bind(this))
              .$inject(this.$refs.uibox);
          }
        },
        changeTab: function (e) {
          this.setClass(e.selected.index);
        },
        changeStatus: function (e) {
          this.$emit('changeStatus', e);
        },
        destroy: function () {
          this.supr();
        },
      })
      .filter({});
    return u;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  '12615895933a003e03ff8643dc0b0f84',
  'f25c65433c9a312ccdd3c59ceffdcdf1',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '61b0acc29fdf1fcc42b016ce2ced34c4',
  '86fd469f7d1d87e1b2b1e2fa879a94d2',
  'b8714c987eaf705bde5757c8ff7b72e3',
  '62509deb2e2f09c6cdab91044c6e4ba4',
);
