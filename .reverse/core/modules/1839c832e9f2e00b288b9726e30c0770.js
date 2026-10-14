EDU(
  '1839c832e9f2e00b288b9726e30c0770',
  function (e, t, n, i, o, a, r, s, c, d) {
    function l(e, t) {
      if (!t) t = window.location.href;
      e = e.replace(/[\[\]]/g, '\\$&');
      var n = new RegExp('[?&]' + e + '(=([^&#]*)|&|#|$)'),
        i = n.exec(t);
      if (!i) return null;
      if (!i[2]) return '';
      else return decodeURIComponent(i[2].replace(/\+/g, ' '));
    }
    function u(e) {
      return e && /^(?:(?:https?:)?\/\/www\.icourse163\.org)?\/mooc\/examvip(?:\/|\?|#|$)/.test(e);
    }
    function _(e, t) {
      if (!e || (e.indexOf('study.163.com') < 0 && !u(e))) return e;
      var n = /^1[3456789]\d{9}$/.test(t);
      var i = n ? 'ursCellphone' : 'urs';
      return (
        'https://www.icourse163.org/passport/logingate/changeCookie.htm?type=' +
        i +
        '&returnUrl=' +
        c._$str2b64(e) +
        '&edusave=1&loginWay=0'
      );
    }
    function f() {
      var e = '';
      if ('/kaoyan/channel/index.htm' == location.pathname) {
        switch (location.hash) {
          case '#systemIntroduce':
            e = 'zw_mooc_kaoyan_pctxjsy';
            break;
          case '#schoolPlanning':
            e = 'zw_mooc_kaoyan_pczxghy';
            break;
          case '#teachers':
            e = 'zw_mooc_kaoyan_pcszy';
            break;
          case '#experience':
            e = 'zw_mooc_kaoyan_pcsajy';
            break;
          case '#experienceDetail':
            e = 'zw_mooc_kaoyan_pcsajyxqy';
            break;
          default:
            e = 'zw_mooc_kaoyan_pckcpdy';
        }
        if (location.search.indexOf('subCategoryId=125') > -1) e = 'zw_mooc_kaoyan_pczyk1v1';
      }
      if ('/search.htm' == location.pathname) e = 'zw_mooc_kaoyan_pcssjgy';
      if (e) localStorage.setItem('kyOutVendor', e);
    }
    var h = { edusave: 1 };
    var p = !0;
    var m = window;
    s.cname = 'ux-login-set-urs';
    r.cname = 'ux-login-urs-phone-wrap';
    d.cname = 'ux-icourse-login-form';
    var g = function (e) {
      var t = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      var n = m.location.pathname;
      if (window.isMobilePhone !== !0 && 'true' !== window.isMobilePhone)
        if (
          !n ||
          !(n.indexOf('/member/logoutResult.htm') > -1 || n.indexOf('/member/login.htm') > -1)
        ) {
          console.log('kaoyandadian');
          f();
          if (!(
            m.location.pathname.indexOf('/mooc/main') > -1 ||
            m.location.pathname.indexOf('/mooc/examvip') > -1 ||
            m.location.pathname.indexOf('/mooc/teach') > -1 ||
            '/kaoyan/channel/index.htm' == m.location.pathname
          ))
            if (!t) m.location.reload();
            else {
              var i = m.location.host;
              var o =
                'https://' +
                i +
                '/passport/mooc/changeEduCookies.htm?single=false&returnUrl=' +
                c._$str2b64(m.location.href);
              m.location.href =
                (m.location.href.indexOf('?') > -1
                  ? m.location.href + '&'
                  : m.location.href + '?') +
                'loginSuccessCbReturnUrl=' +
                c._$str2b64(o);
            }
          else {
            var a = c._$str2b64(m.location.href);
            console.log('考研频道页有hash，', a);
            const r = /^1[3456789]\d{9}$/.test(e);
            const s = r ? 'ursCellphone' : 'urs';
            m.location.href =
              '/passport/logingate/changeCookie.htm?type=' +
              s +
              '&returnUrl=' +
              a +
              '&edusave=1&loginWay=0';
          }
        } else {
          if (t) {
            var i = m.location.host;
            var o =
              'https://' +
              i +
              '/passport/mooc/changeEduCookies.htm?single=false&returnUrl=' +
              c._$str2b64('https://' + i);
            m.location.href = 'https://' + i + '?loginSuccessCbReturnUrl=' + c._$str2b64(o);
            return;
          }
          o = new URL(location.href).searchParams.get('returnUrl');
          if (o) {
            o = c._$b642str(o);
            console.log(o);
          }
          o = _(o, e);
          m.location.href = o || 'https://www.icourse163.org/';
        }
      else {
        var d = l('returnUrl', location.href);
        if (d) m.location.href = _(c._$b642str(d), e);
        else m.location.href = '//www.icourse163.org/';
      }
    };
    var b = function (e) {
      if ('/member/logoutResult.htm' !== m.location.pathname) {
        console.log('kaoyandadian');
        f();
        if (!(
          m.location.pathname.indexOf('/mooc/main') > -1 ||
          m.location.pathname.indexOf('/mooc/examvip') > -1 ||
          '/kaoyan/channel/index.htm' == m.location.pathname
        ))
          m.location.reload();
        else {
          var t = c._$str2b64(m.location.href);
          const n = /^1[3456789]\d{9}$/.test(e);
          const i = n ? 'ursCellphone' : 'urs';
          m.location.href =
            '/passport/logingate/changeCookie.htm?type=' +
            i +
            '&returnUrl=' +
            t +
            '&edusave=1&loginWay=0';
        }
      } else m.location.href = m.urlPrefix.indexPrefix;
    };
    var v = m.location.hostname;
    var E = v.split('.');
    var x = E[E.length - 2] + '.' + E[E.length - 1];
    var w = {
      KEY: 'component-login-set',
      'component-login-set': {
        ursBasicConfig: {
          productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
          newCDN: 1,
          version: 4,
          mode: 'float',
          product: 'imooc',
          promark: 'cjJVGQM',
          host: v,
          cookieDomain: x,
          regCookieDomain: x,
        },
        wapLoginUrl: '/member/login.htm#/wapLoginTel',
        wapRegistUrl: '/member/login.htm#/wapRegistTel',
        wapLogo:
          '//edu-image.nosdn.127.net/987bd3da-179f-422d-a4d1-6562ad23146a.png?imageView&thumbnail=160y131&quality=100',
        wapBgImg:
          '//edu-image.nosdn.127.net/7559dc1c-6795-473c-bdfc-27ef04a91257.png?imageView&thumbnail=750y1334&quality=100',
        wapAutoAdjust: !0,
        snsShowConfig: ['qq', 'weixin', 'weibo'],
        snsShowWapConfig: ['qq', 'icourse', 'weibo'],
        snsConfig: {
          weixin: {
            type: 'weixin',
            txt: '微信',
            icon: '//edu-image.nosdn.127.net/6218be70-c301-4874-9d75-1e8a07588f49.png?imageView&quality=100',
            getHref: function () {
              return {
                web: '/passport/sns/doOAuth.htm?snsType=6',
                wap: '/passport/sns/doOAuth.htm?isWebview=true&snsType=6',
              };
            },
            aftParams: h,
          },
          weibo: {
            type: 'weibo',
            txt: '微博',
            icon: '//edu-image.nosdn.127.net/15c811d3-6a3d-459b-b100-3f4eb776b2c2.png?imageView&quality=100',
            getHref: function () {
              return '/passport/sns/doOAuth.htm?snsType=2';
            },
            aftParams: h,
          },
          renren: {
            type: 'renren',
            txt: '人人',
            icon: '//edu-image.nosdn.127.net/84c18e49-200b-440d-a15c-db363e4b132d.png?imageView&quality=100',
            getHref: function () {
              return '/passport/sns/doOAuth.htm?snsType=3';
            },
            aftParams: h,
          },
          qq: {
            type: 'qq',
            txt: 'QQ',
            icon: '//edu-image.nosdn.127.net/9bd019b4-f657-4674-8550-212d47128d60.png?imageView&quality=100',
            getHref: function () {
              return '/passport/sns/doOAuth.htm?snsType=4';
            },
            aftParams: h,
          },
          icourse: {
            type: 'icourse',
            txt: '爱课程',
            icon: '//edu-image.nosdn.127.net/f33097e9-370f-4be4-b0f0-43af673419eb.png?imageView&quality=100',
            getHref: function () {
              return '#/wapLoginIcourse';
            },
            aftParams: h,
          },
          mail: {
            type: 'mail',
            txt: '邮箱',
            icon: '//edu-image.nosdn.127.net/8d0ce296-9f92-4f3b-b6fe-8d727a323064.png?imageView&quality=100',
            getHref: function () {
              return '#/wapLoginEmail';
            },
            aftParams: h,
          },
        },
        wapLoginUrsConfig: {},
        wapLoginUrsPhoneConfig: {
          focusHelper: 1,
          autoFocus: 1,
          smsLoginFirst: 0,
          smsBtnTxt: '使用短信登录',
          productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
          newCDN: 1,
          version: 3,
          product: 'imooc',
          promark: 'cjJVGQM',
          host: v,
          mobileFirst: 1,
          mode: 'popup',
          swidth: 250,
          cssDomain: '//cmc.stu.126.net/u/css/cms/',
          cssFiles: 'moc_urs_login_wap_css.css',
          includeBox: 'j-ursContainer-wap-login',
          cookieDomain: x,
          regCookieDomain: x,
          single: 1,
          regMbTxt: '注册并登录',
          mbNeedItl: 0,
          style: i,
          needRegAgreeMbNoChecked: 1,
          uniteLogin: {
            isItl: 0,
            clause: 0,
            first: 1,
            needClause: 1,
            needUnLogin: 1,
            unLoginTime: 10,
            unLoginDefautl: 1,
            unLoginTxt: '十天内免登录',
            loginTxt: '快捷登录',
            terms0: '《服务条款》',
            terms0Link: '//reg.163.com/agreement_mobile.shtml',
            terms1: '《网易隐私政策》',
            terms1Link: '//reg.163.com/agreement_mobile_ysbh.shtml',
            placeholders: { mob: '请输入手机号', cap: '请输入图片验证码', sms: '请输入短信验证码' },
          },
          logincb: g,
        },
        wapLoginUrsEmailConfig: {
          productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
          newCDN: 1,
          version: 4,
          product: 'imooc',
          promark: 'cjJVGQM',
          host: v,
          swidth: 333,
          mode: 'float',
          mbNeedItl: 0,
          cookieDomain: x,
          regCookieDomain: x,
          cssDomain: '//cmc.stu.126.net/u/css/cms/',
          cssFiles: 'moc_urs_login_wap_css.css',
          includeBox: 'j-ursContainer-wap-login',
          regUrl: '//zc.reg.163.com/regInitialized?pd=imooc&pkid=YeaYYzQ&pkht=' + v,
          style: o,
          needRegAgreeNoChecked: 1,
          logincb: g,
        },
        wapRegistUrsConfig: {
          productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
          newCDN: 1,
          version: 4,
          product: 'imooc',
          promark: 'cjJVGQM',
          host: v,
          cookieDomain: x,
          regCookieDomain: x,
          swidth: 250,
          mode: 'popup',
          cssDomain: '//cmc.stu.126.net/u/css/cms/',
          cssFiles: 'moc_urs_login_wap_css.css',
          includeBox: 'j-ursContainer-wap-regist',
          regMbTxt: '注册并登录',
          mbNoPwd: 0,
          mbNeedItl: 0,
          style: a,
          needRegAgreeMbNoChecked: 1,
          regcb: b,
        },
        phoneBindUrsConfig: {
          productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
          newCDN: 1,
          version: 4,
          product: 'imooc',
          promark: 'cjJVGQM',
          host: v,
          cookieDomain: x,
          regCookieDomain: x,
          cssDomain: '//cmc.stu.126.net/u/css/cms/',
          cssFiles: 'moocursbindstyle.css?1532585033428',
          style: n,
          swidth: 250,
          mode: 'popup',
        },
        wapPhoneBindUrsConfig: {
          productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
          newCDN: 1,
          version: 4,
          product: 'imooc',
          promark: 'cjJVGQM',
          host: v,
          cookieDomain: x,
          regCookieDomain: x,
          swidth: 250,
          mode: 'popup',
          cssDomain: 'https://cmc.stu.126.net/u/css/cms/',
          cssFiles: 'mooc_urs_bind_wap.css?1579422266640',
        },
        tabConfig: [
          {
            title: '手机号登录',
            id: 'mobile',
            component: r,
            data: {
              model: 0,
              ursCustomConfig: {
                focusHelper: 1,
                newCDN: 1,
                version: 4,
                mode: 'popup',
                swidth: 250,
                autoFocus: 1,
                smsLoginFirst: 0,
                smsBtnTxt: '使用短信登录',
                productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
                product: 'imooc',
                promark: 'cjJVGQM',
                host: v,
                mobileFirst: 1,
                mbNeedItl: 0,
                cookieDomain: x,
                regCookieDomain: x,
                cssDomain: '//cmc.stu.126.net/u/css/cms/',
                cssFiles: 'mooc_urs_login_css.css',
                includeBox: 'j-ursContainer-0',
                regUrl: '//zc.reg.163.com/regInitialized?pd=imooc&pkid=YeaYYzQ&pkht=' + v,
                single: 1,
                needRegAgreeMbNoChecked: 1,
                style: n,
                uniteLogin: {
                  isItl: 0,
                  clause: 0,
                  first: 0,
                  needClause: 1,
                  needUnLogin: 1,
                  unLoginTime: 10,
                  unLoginDefautl: 1,
                  unLoginTxt: '十天内免登录',
                  loginTxt: '快捷登录',
                  terms0: '《服务条款》',
                  terms0Link: '//reg.163.com/agreement_mobile.shtml',
                  terms1: '《网易隐私政策》',
                  terms1Link: '//reg.163.com/agreement_mobile_ysbh.shtml',
                  placeholders: {
                    mob: '请输入手机号',
                    cap: '请输入图片验证码',
                    sms: '请输入短信验证码',
                  },
                },
                logincb: g,
              },
            },
          },
          {
            title: '邮箱登录',
            id: 'mail',
            component: s,
            data: {
              model: 1,
              ursCustomConfig: {
                focusHelper: 1,
                newCDN: 1,
                version: 4,
                mode: 'float',
                autoFocus: 1,
                productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
                product: 'imooc',
                promark: 'cjJVGQM',
                host: v,
                cookieDomain: x,
                regCookieDomain: x,
                cssDomain: '//cmc.stu.126.net/u/css/cms/',
                cssFiles: 'mooc_urs_login_css.css',
                includeBox: 'j-ursContainer-1',
                regUrl: '//zc.reg.163.com/regInitialized?pd=imooc&pkid=YeaYYzQ&pkht=' + v,
                style: n,
                logincb: g,
              },
            },
          },
          { title: '爱课程登录', id: 'icourse', component: d, data: { model: 2, config: {} } },
        ],
        registConfig: {
          ursCustomConfig: {
            newCDN: 1,
            version: 4,
            mode: 'popup',
            productKey: 'a3b396bb2f589bbc1151f0fa61d14747',
            product: 'imooc',
            promark: 'cjJVGQM',
            host: v,
            cookieDomain: x,
            regCookieDomain: x,
            swidth: 250,
            cssDomain: '//cmc.stu.126.net/u/css/cms/',
            cssFiles: 'mooc_urs_login_css.css',
            includeBox: 'j-ursContainer-wap-regist',
            style: t,
            regMbTxt: '注册并登录',
            mbNoPwd: 0,
            mbNeedItl: 0,
            needRegAgreeMbNoChecked: 1,
            regcb: b,
          },
        },
      },
    };
    if (p === !1) w['component-login-set']['tabConfig'].splice(1, 1);
    w.IS_SHOW_URS_PHONE = p;
    return w;
  },
  '06967bc268d42f1d0c9adc960085a1cc',
  '97b9bc6dc09a3809929734fd2aab0004',
  '6374945277463ba5d0aea9cf66b7f26c',
  'c8925ba8edfa4831254508b79f49f278',
  'b0b3464250bf421f2eed6ea16fe2f52f',
  '7e38f21e0e415ec1c476447f88c8b61c',
  '86fd469f7d1d87e1b2b1e2fa879a94d2',
  'f7025bad9c69872e3ff0e4cf05072b31',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'fd0bd0b11169c794a96379bcb42deb61',
  'bc9f5cbe63d0eab46b36ec6d1cc6f81d',
);
