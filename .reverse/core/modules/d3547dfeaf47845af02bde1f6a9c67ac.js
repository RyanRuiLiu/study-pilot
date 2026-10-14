EDU(
  'd3547dfeaf47845af02bde1f6a9c67ac',
  function (e, t, n, i, o) {
    var a = window;
    var r = e.$extends({
      config: function () {
        t.extend(this, {
          ursConfig: {},
          ursBasicConfig: {
            newCDN: 1,
            version: 4,
            productKey: '1d4e84a9a899bbd06ded527e400f636f',
            swidth: 360,
            product: 'study',
            promark: 'tajyMJn',
            host: 'study.163.com',
            skin: 4,
            needUnLogin: 1,
            defaultUnLogin: 1,
            mobileUnLoginTimeTxt: '十天内免登录',
            mobileUnLoginTime: 10,
            mobileDefaultUnLogin: 1,
            placeholder: { account: '网易邮箱/常用邮箱', pwd: '密码' },
            needPrepare: 1,
            loginText: '登 录',
            needUrsBgp: 1,
            wdaId: 'UA1438236666413',
            mbBtnTxt: '登 录',
            smsBtnTxt: '登 录',
            regMbTxt: '注 册',
            isHttps: 1,
            mbNeedItl: 1,
            changepage: this.changePage._$bind(this),
          },
          ursModelConfig: [
            { needMobileLogin: 1, needMobileReg: 1 },
            { needMobileLogin: 0, needMobileReg: 0, page: 'login', single: 1 },
            { needMobileLogin: 1, needMobileReg: 1, mobileFirst: 1, page: 'register' },
          ],
        });
        t.extend(this.data, {
          model: 0,
          initStartTime: +new Date(),
          ursCustomConfig: {},
          isSuccessLoad: !1,
          UrsUnloadError:
            '<div style="top:80px;left:' +
            (this.data.ursCustomConfig && this.data.ursCustomConfig.swidth
              ? this.data.ursCustomConfig.swidth
              : 360) /
              2 +
            'px;position:absolute;"><img src="//s.stu.126.net/res/images/ui/loading.gif?348e3cea35602e70543b87a77333867e"/></div>',
        });
        this.supr();
      },
      init: function () {
        this.supr();
        var e = this;
        setTimeout(
          function () {
            if (a.URS && i._$isFunction(a.URS)) this.initURSLogin();
            else this.loadScript();
          }._$bind(this),
          0,
        );
        this.errorLogTimer = setTimeout(function () {
          if (!e.data.isSuccessLoad)
            o._$loadScript(
              '//only367.73119.35.167.38.nstool.netease.com/info.js?referer=//nstool.netease.com/info.js',
              {
                version: +new Date(),
                onload: e.doUrsUnloadError._$bind(e),
                charset: 'gbk',
                onerror: function () {},
              },
            );
        }, 2e4);
      },
      initURSLogin: function () {
        var e = this;
        i._$merge(this.ursBasicConfig, a.ursBasicConfig || {});
        i._$merge(this.ursConfig, this.ursBasicConfig);
        i._$merge(this.ursConfig, this.ursModelConfig[this.data.model]);
        i._$merge(this.ursConfig, this.data.ursCustomConfig);
        this.ursConfig.initReady = function () {
          e.$emit('initReady');
          var t = +new Date() - e.data.initStartTime;
          n._$trackEvent('URS登录监测统计', 'URSLoadTime', 'URSLoadTimeCount', t);
          e.data.isSuccessLoad = !0;
          e.data.UrsUnloadError = '';
          e.$update();
        };
        this._ursComponent = new URS(this.ursConfig);
        this._ursComponent.showIframe();
      },
      loadScript: function () {
        var e = this;
        o._$loadScript('https://webzj.netstatic.net/webzj_cdn101/message4.js', {
          version: +new Date(),
          onload: e.initURSLogin._$bind(e),
          onerror: e.handleError._$bind(e),
        });
      },
      handleError: function () {
        var e = this;
        this.count++;
        if (this.count <= 3) this.loadScript();
        else {
          this.data.UrsUnloadError =
            '<div class="u-script-load-error" style="top:56px;left:76px;width:260px;position:absolute;">对不起，账号登录被外星人带走了，<br>请更换其它方式，或稍后刷新页面再试^_^</div>';
          this.$update();
        }
      },
      doUrsUnloadError: function () {
        var e = [
          '[ip:' + a.ip + ']',
          '[dns:' + a.dns + ']',
          '[ip_province:' + a.ip_province + ']',
          '[ip_city:' + a.ip_city + ']',
          '[ip_isp:' + a.ip_isp + ']',
          '[dns_province:' + a.dns_province + ']',
          '[dns_city:' + a.dns_city + ']',
          '[dns_isp:' + a.dns_isp + ']',
          '[res:' + a.res + ']',
          '[msg:' + a.msg + ']',
        ];
        var t = e.join('--');
        n._$trackEvent('URS登录监测统计', 'URSUnloadError', t);
      },
      changePage: function (e) {
        this.$emit('changeStatus', e);
      },
      destroy: function () {
        this.supr();
        if (this.errorLogTimer) a.clearTimeout(this.errorLogTimer);
      },
    });
    return r;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'b803fd38b5faf2609a81b93c9bf1d352',
  'fe86216ed59e3103a56c42c850d389f0',
  '9a830f6a308feb17fe43372af2d6e799',
);
