EDU(
  '12615895933a003e03ff8643dc0b0f84',
  function (e, t) {
    var n = window;
    return {
      urssdk: '//webzj.netstatic.net/webzj_cdn101/message4.js',
      tabConfig: [
        {
          title: '手机号登录',
          id: 'mobile',
          component: t,
          data: {
            model: 0,
            ursCustomConfig: {
              mobileFirst: 1,
              cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
              cssFiles: 'nosurslogincss_a29d1e108edde5b11815c256c4adecd2.css',
              includeBox: 'j-ursContainer-1',
              single: 1,
              regMbTxt: '注册并登录',
              mbNeedItl: 0,
              logincb: function () {
                if ('logout' !== n.currentPageName) n.location.reload();
                else n.location.href = returnUrl || studyHref;
              },
            },
          },
        },
        {
          title: '邮箱登录',
          id: 'mail',
          component: e,
          data: {
            model: 1,
            ursCustomConfig: {
              cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
              cssFiles: 'nosurslogincss_a29d1e108edde5b11815c256c4adecd2.css',
              includeBox: 'j-ursContainer-0',
              logincb: function () {
                if ('logout' !== n.currentPageName) n.location.reload();
                else n.location.href = returnUrl || studyHref;
              },
            },
          },
        },
      ],
      registConfig: {
        ursCustomConfig: {
          mbNeedItl: 0,
          cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
          cssFiles: 'nosursregistcss_8f4afda7aa3f9d4e4236b238eeaecb15.css',
          regcb: function () {
            if ('logout' !== n.currentPageName) n.location.reload();
            else n.location.href = returnUrl || studyHref;
          },
        },
      },
      snsShowConfig: ['weixin', 'qq', 'weibo', 'renren', 'icourse'],
      snsShowWapConfig: ['mail', 'weibo', 'qq', 'renren'],
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
        },
        weibo: {
          type: 'weibo',
          txt: '微博',
          icon: '//edu-image.nosdn.127.net/15c811d3-6a3d-459b-b100-3f4eb776b2c2.png?imageView&quality=100',
          getHref: function () {
            return '/passport/sns/doOAuth.htm?snsType=2';
          },
        },
        renren: {
          type: 'renren',
          txt: '人人',
          icon: '//edu-image.nosdn.127.net/84c18e49-200b-440d-a15c-db363e4b132d.png?imageView&quality=100',
          getHref: function () {
            return '/passport/sns/doOAuth.htm?snsType=3';
          },
        },
        qq: {
          type: 'qq',
          txt: 'QQ',
          icon: '//edu-image.nosdn.127.net/9bd019b4-f657-4674-8550-212d47128d60.png?imageView&quality=100',
          getHref: function () {
            return '/passport/sns/doOAuth.htm?snsType=4';
          },
        },
        icourse: {
          type: 'icourse',
          txt: '爱课程',
          icon: '//edu-image.nosdn.127.net/f33097e9-370f-4be4-b0f0-43af673419eb.png?imageView&quality=100',
          getHref: function () {
            return '/member/icourseLogin.htm';
          },
        },
        mail: {
          type: 'mail',
          txt: '邮箱',
          icon: '//edu-image.nosdn.127.net/8d0ce296-9f92-4f3b-b6fe-8d727a323064.png?imageView&quality=100',
          getHref: function () {
            return '#/mobileUrsLogin';
          },
        },
      },
      wapLoginUrl: '//study.163.com/member/telLogin.htm',
      wapRegistUrl: '//study.163.com/member/mobileTelRegister.htm',
      wapLoginUrsConfig: {
        swidth: 335,
        cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
        cssFiles: 'nosurswaplogincss_bbf56e8e0b2734947f07d88a48dad2ee.css',
        includeBox: 'j-ursContainer-wap-login',
      },
      wapRegistUrsConfig: {
        swidth: 335,
        mbNeedItl: 0,
        cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
        cssFiles: 'nosurswaplogincss_bbf56e8e0b2734947f07d88a48dad2ee.css',
        includeBox: 'j-ursContainer-wap-regist',
        regcb: function () {
          n.location.replace(returnUrl || '//study.163.com/');
        },
      },
      phoneBindUrsConfig: {
        cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
        cssFiles: 'nosursbindcss_279e11a0028d968c6ffca5c409ebb9d1.css',
      },
      wapPhoneBindUrsConfig: {
        swidth: 280,
        cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
        cssFiles: 'nosursbindwapcss_92e7ae5750b1b6342ed12513e35ffc02.css',
      },
      wapPhoneRegistLoginConfig: {
        swidth: 270,
        cssDomain: '//edu-cms.nosdn.127.net/topics/css/',
        cssFiles: 'nosursphoneregistloginwapcss_73abd8b5ae0e9049b0f4aef3e780f345s.css',
      },
    };
  },
  'f7025bad9c69872e3ff0e4cf05072b31',
  '86fd469f7d1d87e1b2b1e2fa879a94d2',
);
