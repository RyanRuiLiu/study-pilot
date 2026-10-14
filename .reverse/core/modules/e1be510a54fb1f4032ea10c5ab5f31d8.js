EDU(
  'e1be510a54fb1f4032ea10c5ab5f31d8',
  function (e, t, n, i, o, a, r, s) {
    var c = NEJ.P('edu.u');
    var d = n.$extends({
      name: 'u-signin',
      css: t,
      template: e,
      config: function () {
        i.extend(this, {});
        i.extend(this.data, {});
        this.supr();
      },
      showSignTip: function () {
        var e = o._$getByClassName(o._$get('j-activityRightBanner'), 'e-hover-target');
        var t = o._$getByClassName(o._$get('j-activityRightBanner'), 'u-signIn-container');
        if (e && e.length > 0) {
          o._$style(e[0], { display: 'block' });
          if (t && t.length > 0)
            a._$addEvent(
              t[0],
              'mouseover',
              function (t) {
                o._$style(e[0], { display: '' });
              },
              !1,
            );
        }
      },
      init: function () {
        this.supr();
        var e = window.webUser && window.webUser.id;
        if (e)
          r._$getSignInfo(
            {},
            function (e) {
              var t = e || {};
              if (t && t.count < 1) {
                this.data.noSign = !0;
                this.$update();
                this.showSignTip();
              } else this.data.signCnt = t.count;
              if (t.count > 0 && !t.isSignTody) this.data.noSign = !1;
              this.data.isSignTody = t.isSignTody;
              this.$update();
            }._$bind(this),
          );
        var t = this.data.promoUrl;
        if (t) s._$adActionLogByShow(t);
      },
      signIn: function () {
        if (!window.webUser) {
          if ('/member/login.htm' == window.location.pathname) return;
          c._$$LoginDialog._$showLogin({ from: 'signIn' });
        } else if (!this.data.isSignTody) {
          var e = this.data.promoUrl;
          if (e) s._$adActionLogByClick(e);
          r._$signIn(
            {},
            function (e) {
              if (e.count > 0) {
                this.data.signCnt = e.count;
                this.data.isSignTody = !0;
                this.data.noSign = !1;
                this.$update();
                this.showSignTip();
              }
            }._$bind(this),
          );
        }
      },
      destroy: function () {
        this.supr();
      },
    });
    return d;
  },
  '14d7ed18e07b6b6976151f860184ffa1',
  '587415e755e348518ef3256f0a6aa335',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'a3406b03e47bf5b3df6a90da7fd587f5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
);
