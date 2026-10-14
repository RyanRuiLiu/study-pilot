EDU('05c0ea5e48892fb0a985173f49c2b642', {
  KEY_SHARED_DESKTOP_SEARCH_INTEREST_COURSE: '搜索感兴趣的课程',
  KEY_SHARED_DESKTOP_PEAK_WARN: '错峰使用提醒',
  KEY_SHARED_DESKTOP_SWITCH_ACCOUNT: '切换账号',
  KEY_SHARED_DESKTOP_ROLE_MARKET_EDITOR: '高教社运营编辑',
  KEY_SHARED_DESKTOP_ROLE_COURSE_EDITOR: '高教社课程编辑',
  KEY_SHARED_DESKTOP_ROLE_COURSE_CHECK: '高教社课程审核',
  KEY_SHARED_DESKTOP_ROLE_ORG_MANAGE_BKG: '机构管理后台',
  KEY_SHARED_DESKTOP_SRARCH: '搜索',
});
EDU('da93b7a30c2d366ec59a76eaceef68ac', {
  KEY_SHARED_DESKTOP_SEARCH_INTEREST_COURSE: 'Serach for courses of interest',
  KEY_SHARED_DESKTOP_PEAK_WARN: '错峰使用提醒',
  KEY_SHARED_DESKTOP_SWITCH_ACCOUNT: '切换账号',
  KEY_SHARED_DESKTOP_ROLE_MARKET_EDITOR: '高教社运营编辑',
  KEY_SHARED_DESKTOP_ROLE_COURSE_EDITOR: '高教社课程编辑',
  KEY_SHARED_DESKTOP_ROLE_COURSE_CHECK: '高教社课程审核',
  KEY_SHARED_DESKTOP_ROLE_ORG_MANAGE_BKG: '机构管理后台',
  KEY_SHARED_DESKTOP_SRARCH: '搜索',
});
EDU('a4fbb2f2d7d12c9f05500910a35d1d99', {
  KEY_SHARED_DESKTOP_SEARCH_INTEREST_COURSE: '興味のあるコースを検索する',
  KEY_SHARED_DESKTOP_PEAK_WARN: 'アクセスピークのお知らせを使用する',
  KEY_SHARED_DESKTOP_SWITCH_ACCOUNT: 'アカウントを切り替える',
  KEY_SHARED_DESKTOP_ROLE_MARKET_EDITOR: '中国高等教育出版社運営編集',
  KEY_SHARED_DESKTOP_ROLE_COURSE_EDITOR: '中国高等教育出版社コース編集',
  KEY_SHARED_DESKTOP_ROLE_COURSE_CHECK: '中国高等教育出版社コース審査',
  KEY_SHARED_DESKTOP_ROLE_ORG_MANAGE_BKG: '機構管理画面',
  KEY_SHARED_DESKTOP_SRARCH: '検索',
});
EDU(
  'ff86782b505dd009231ed4954ea018f5',
  function (e, t, i, n, a) {
    var o = a.getLangPack(e, t, i);
    n.set(o);
    a.setLang(o);
    return o;
  },
  '05c0ea5e48892fb0a985173f49c2b642',
  'da93b7a30c2d366ec59a76eaceef68ac',
  'a4fbb2f2d7d12c9f05500910a35d1d99',
  '315b0d494df86fc9000e825abd903397',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
);
EDU(
  'd5f43a657e3dc81d77c7b87a66b6aca2',
  function (e, t, i) {
    i._$getCertificationTestResult = function (e, i) {
      t._$request({
        url: '/web/j/indexBeanV3.getCertificationTestResult.rpc',
        method: 'post',
        data: e,
        onload: i,
      });
    };
    i._$getListChannelCategoryDetail = function (t, i) {
      var n = 'ke.study.youdao.com';
      var a = 'study.163.com';
      var o = window.location.href;
      var s = '/web/j/channelBean.listChannelCategoryDetail.rpc';
      if (o.indexOf(a) >= 0 || o.indexOf(n) >= 0) s = '/course/channel/detail.do';
      e._$request(s, { method: 'post', type: 'json', data: t, onload: i });
    };
    return i;
  },
  '8a864b627c302d7d1c56bd928b515d1b',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
EDU(
  '353a94f970f3303d6a29097bf8f613a3',
  function (e, t) {
    var i = e.$extends({
      name: 'u-channel-panel',
      data: { channelList: [], showPanel: !1, certificationTestResult: !1 },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.getChannelList();
        this.getCertificationTestResult();
      },
      getCertificationTestResult: function () {
        t._$getCertificationTestResult(
          {},
          function (e) {
            this.data.certificationTestResult = e;
            this.$update('certificationTestResult', this.data.certificationTestResult);
          }._$bind(this),
        );
      },
      getChannelList: function () {
        var e = sessionStorage.getItem('icourse163.common.nav.channelList'),
          i;
        try {
          i = JSON.parse(e);
        } catch (n) {}
        if (e && i) {
          this.data.channelList = i;
          this.$update('channelList', this.data.channelList);
        } else
          t._$getListChannelCategoryDetail(
            { includeALLChannels: !0, includeDefaultChannels: !1, includeMyChannels: !1 },
            function (e) {
              var t = (e || {}).result || {};
              var i = t.channelCategoryDetails || [];
              this.data.channelList = i;
              i && sessionStorage.setItem('icourse163.common.nav.channelList', JSON.stringify(i));
              this.$update('channelList', this.data.channelList);
            }._$bind(this),
          );
      },
      handleItemClick: function (e, t) {
        var i = '//www.icourse163.org/channel/' + t.id + '.htm';
        window.DATracker &&
          window.DATracker.track('导航频道点击', {
            pagename: 'home',
            user_id: window.webUser && window.webUser.id,
            channel_id: t.id,
            channel_name: t.name,
          });
        e.stopPropagation();
        window.open(i);
      },
      handleCertifiedLearnClick: function (e) {
        var t = '//www.icourse163.org/certifiedInterest.htm#/';
        e.stopPropagation();
        window.open(t);
      },
      handleSmartCourseClick: function (e) {
        var t = 'https://www.icourse163.org/channel/126001.htm';
        e.stopPropagation();
        window.open(t);
      },
      toggleShow: function () {
        this.data.showPanel = !this.data.showPanel;
        this.$update();
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  'd5f43a657e3dc81d77c7b87a66b6aca2',
);
EDU(
  'c36414865c2931673e35048eefb04c03',
  '<div class="channel-panel" style="display: {showPanel ? \'block\' : \'none\'};">\n<div class="channel-panel__indicator"></div>\n<div class="channel-panel__indicator-shadow"></div>\n<div class="channel-panel__content">\n<p class="channel-panel__description">中国大学MOOC，为你提供一流的大学教育</p>\n<div class="channel-panel__cards">\n<div class="channel-panel__smart-course" on-click={this.handleSmartCourseClick($event)}>\n<div class="channel-panel__smart-course-title">智慧课程</div>\n<div class="channel-panel__smart-course-desc">AI深度赋能教与学，提供全新智慧学习体验</div>\n<div class="channel-panel__smart-course-btn">查看详情</div>\n</div>\n{#if certificationTestResult}\n<div class="channel-panel__certified-learn" on-click={this.handleCertifiedLearnClick($event)}>\n<div class="channel-panel__certified-learn-title">认证学习</div>\n<div class="channel-panel__certified-learn-desc">为你提供认证成绩和证书，以及AI高效学习服务</div>\n<div class="channel-panel__certified-learn-btn">查看详情</div>\n</div>\n{/if}\n</div>\n{#list channelList as detail}\n{#if detail.channels}\n<section class="channel-panel__section">\n<h5 class="channel-panel__type">\n{detail.name}\n</h5>\n<div class="channel-panel__items">\n{#list detail.channels as channel}\n{#if channel.linkType && channel.linkType == "urlLink"}\n<a\nclass="channel-panel__item"\nhref="{channel.link}"\ntarget="_blank"\n>\n<p>{channel.name}</p>\n</a>\n{#else}\n<div\nclass="channel-panel__item"\non-click={this.handleItemClick($event, channel)}\n>\n<p>{channel.name}</p>\n</div>\n{/if}\n{/list}\n</div>\n</section>\n{/if}\n{/list}\n</div>\n</div>',
);
EDU(
  '70b62bbfe4f91bdccb79789fa759e45a',
  ".channel-panel {\n  position: absolute;\n  top: 0;\n  margin: 100% 0 0 -100px;\n  z-index: 1000;\n  cursor: auto; }\n  .channel-panel__content {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    width: 662px;\n    max-height: 600px;\n    padding: 32px 32px 12px 32px;\n    border-radius: 4px;\n    -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.12);\n            box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.12);\n    background-color: #fff;\n    font-size: 14px;\n    overflow-y: auto;\n    overflow-x: hidden; }\n    .channel-panel__content::-webkit-scrollbar {\n      width: 5px;\n      height: 5px;\n      background-color: #F5F5F5; }\n    .channel-panel__content::-webkit-scrollbar-thumb {\n      border-radius: 10px;\n      background-color: #c5c5c5; }\n  .channel-panel__indicator {\n    position: absolute;\n    top: -24px;\n    left: 100px; }\n    .channel-panel__indicator::before {\n      content: '';\n      width: 0;\n      height: 0;\n      border: 1px solid transparent;\n      border-width: 0 14px 14px 14px;\n      border-bottom-color: #fff;\n      position: absolute;\n      top: 10px; }\n    .channel-panel__indicator-shadow {\n      width: 0;\n      height: 0;\n      border: 1px solid transparent;\n      border-width: 0 14px 14px 14px;\n      border-bottom-color: #fff;\n      position: absolute;\n      top: -5px;\n      left: 99px;\n      border-width: 16px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);\n              box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);\n      z-index: -1; }\n  .channel-panel__description {\n    width: 275px;\n    height: 20px;\n    padding-bottom: 14px;\n    line-height: 20px;\n    font-size: 14px;\n    color: #999999; }\n  .channel-panel__cards {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    gap: 12px;\n    margin-bottom: 20px; }\n  .channel-panel__smart-course {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    width: 294px;\n    height: 75px;\n    cursor: pointer;\n    border-radius: 8px;\n    padding: 14px 16px;\n    position: relative;\n    background-color: #DEE2FF; }\n    .channel-panel__smart-course-title {\n      color: #333;\n      font-family: PingFang SC;\n      font-size: 18px;\n      font-style: normal;\n      font-weight: 600;\n      line-height: normal;\n      margin-bottom: 4px; }\n    .channel-panel__smart-course-desc {\n      color: rgba(0, 0, 0, 0.4);\n      font-family: PingFang SC;\n      font-size: 12px;\n      font-style: normal;\n      font-weight: 400;\n      line-height: 18px;\n      /* 150% */ }\n    .channel-panel__smart-course-btn {\n      position: absolute;\n      top: 21px;\n      right: 16px;\n      width: 96px;\n      height: 32px;\n      background: -webkit-gradient(linear, left top, right top, from(#C9CFFF), to(#B3BDFF));\n      background: linear-gradient(90deg, #C9CFFF 0%, #B3BDFF 100%);\n      border-radius: 16px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      cursor: pointer;\n      color: #333;\n      text-align: center;\n      font-family: PingFang SC;\n      font-size: 14px;\n      font-style: normal;\n      font-weight: 500;\n      line-height: normal; }\n  .channel-panel__certified-learn {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    width: 294px;\n    height: 75px;\n    cursor: pointer;\n    border-radius: 8px;\n    padding: 14px 16px;\n    position: relative;\n    background-color: rgba(255, 237, 213, 0.5); }\n    .channel-panel__certified-learn-title {\n      color: #333;\n      font-family: PingFang SC;\n      font-size: 18px;\n      font-style: normal;\n      font-weight: 600;\n      line-height: normal;\n      margin-bottom: 4px; }\n    .channel-panel__certified-learn-desc {\n      color: rgba(0, 0, 0, 0.4);\n      font-family: PingFang SC;\n      font-size: 12px;\n      font-style: normal;\n      font-weight: 400;\n      line-height: 18px;\n      /* 150% */ }\n    .channel-panel__certified-learn-btn {\n      position: absolute;\n      top: 21px;\n      right: 16px;\n      width: 96px;\n      height: 32px;\n      background: -webkit-gradient(linear, left top, right top, from(#FFE7B2), to(#FFD79F));\n      background: linear-gradient(90deg, #FFE7B2 0%, #FFD79F 100%);\n      border-radius: 16px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      cursor: pointer;\n      color: #333;\n      text-align: center;\n      font-family: PingFang SC;\n      font-size: 14px;\n      font-style: normal;\n      font-weight: 500;\n      line-height: normal; }\n  .channel-panel__section {\n    padding: 0 0 20px 0; }\n  .channel-panel__type {\n    height: 22px;\n    line-height: 22px;\n    font-size: 16px;\n    font-weight: 600;\n    color: #333333;\n    margin-bottom: 0; }\n  .channel-panel__items {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .channel-panel__item {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 110px;\n    height: 32px;\n    padding: 0 10px;\n    margin: 9px 12px 2px 0;\n    border-radius: 16px;\n    line-height: 32px;\n    font-size: 14px;\n    color: #333333;\n    text-align: center;\n    background-color: rgba(0, 0, 0, 0.04);\n    cursor: pointer; }\n    .channel-panel__item:nth-child(5n) {\n      margin-right: 0; }\n    .channel-panel__item:hover {\n      color: #00c758;\n      background-color: rgba(0, 199, 88, 0.1); }\n    .channel-panel__item > p {\n      width: 100%;\n      height: 100%;\n      word-break: break-all;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden; }\n",
);
EDU(
  'a780ef675686a51d7f3ecd22b899b1e4',
  function (e, t, i, n) {
    n = e.$extends({
      name: 'u-channel-panel',
      template: t,
      css: i,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return n;
  },
  '353a94f970f3303d6a29097bf8f613a3',
  'c36414865c2931673e35048eefb04c03',
  '70b62bbfe4f91bdccb79789fa759e45a',
);
EDU(
  '709a1ca4461db8be476800647eb950cf',
  function (e, t, i) {
    var n = new e();
    i.getPhoneAccountNumber = function (e) {
      n._$getBindInfo(function (i) {
        e(i && i[t.LOGINTYPE.PHONE]);
      });
    };
  },
  '865bba476606f3b1d5979bffa92980b6',
  '93828627ddb358ed890cb65967a0c1de',
);
EDU(
  '163e8fd26158a329dc0b2d60ce4fd6b8',
  function (e, t, i, n) {
    n.FRONT_TYPE = 4;
    n._$getCategory = function (t, i) {
      e._$request({
        url: '/web/j/mocCourseCategoryBean.getCategByType.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getCourseList = function (t, i) {
      e._$request({
        url: '/web/j/courseBean.getCoursePanelListByFrontCategory.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getSpecial = function (t, i) {
      e._$request({
        url: '/web/j/courseBean.getSpecificByCategoryId.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getExtentionImgs = function (e, i) {
      t._$postDWR({
        key: 'categoryCache_getExtentionImgs',
        url: 'CommonBean.obtain',
        param: ['moocExtentionImageList'],
        onload: i,
      });
    };
    n._$getMocTermStatisticListByParms = function (t, i) {
      e._$request({
        url: '/web/j/courseBean.getMocTermStatisticListByParms.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getRecommend = function (t, i) {
      t.targetTypes = JSON.stringify(t.targetTypes);
      e._$request({
        url: '/web/j/recommendRPCBean.getRecommend.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'eb3b508fa0a9c765da0be22918aeedb8',
  '<div class="u-cateNavR-container  f-cb">{#if webCateNavVoList}{#list webCateNavVoList as item}<div class="cateNavR-container-f"><div class="f-fl cateNavR-container-f_div185"><a href="/category/{item.linkName}" target="_blank" class="cateNavR-container-f_div185_a186"><div class="{item.webIcon} cateNavR-container-f_div185_a186_div187"></div><div class="f-thide cateNavR-container-f_div185_a186_div188"><span class="f-thide cateNavR-container-f_div185_a186_div188_span189">{item.name}</span></div></a></div></div>{/list}{/if}</div>',
);
EDU(
  'c7222d0ba29828fd5b94fc06b0565741',
  '.cateNavR-container-f_div185{left: 0px; top: 0px; width: 124px; height: 35px; z-index: 0; border-radius: 0px; margin: 0px; padding: 0px; color: rgb(51, 51, 51); font-size: 16px; position: relative;}.cateNavR-container-f_div185_a186{display: inline-block; width: 100%; height: 35px;}.cateNavR-container-f_div185_a186_div187{left: 10px; top: 8px; width: 18px; height: 18px; z-index: 0; border-radius: 0px; margin: 0px; padding: 0px; color: rgb(51, 51, 51); font-size: 19px; position: absolute;}.cateNavR-container-f_div185_a186_div188{left: 40px; top: 6px; width: 65px; height: 22px; z-index: 0; border-radius: 0px; margin: 0px; padding: 0px; color: rgb(51, 51, 51); font-size: 16px; position: absolute; line-height: 22px;}.cateNavR-container-f_div185_a186_div188_span189{line-height: 22px; display: inline-block; width: 100%; font-family: 微软雅黑, "Microsoft YaHei"; font-size: 16px; color: rgb(51, 51, 51); text-align: left; vertical-align: middle;}.u-cateNavR-container {left: 0px; top: 0px; width: 248px; height: auto; z-index: 0; border-radius: 0px; margin: 0px; padding: 0px; color: rgb(0, 0, 0); font-size: 16px; position: relative;}.f-fl{\n    float: left;\n}\n.f-fr{\n    float: right;\n}\n.f-line, .f-thide {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.f-2lines {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n}\n\n.f-3lines {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-line-clamp: 3;\n    -webkit-box-orient: vertical;\n}\n\n.f-4lines {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-line-clamp: 4;\n    -webkit-box-orient: vertical;\n}\n',
);
EDU(
  '272af5852d94b7b40065909c2e324537',
  function (e, t, i, n, a, o) {
    var s = i.$extends({
      name: 'u-cateNavR',
      css: t,
      template: e,
      config: function () {
        n.extend(this, {});
        n.extend(this.data, {});
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    return s;
  },
  'eb3b508fa0a9c765da0be22918aeedb8',
  'c7222d0ba29828fd5b94fc06b0565741',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  'b0fe8868b75bec6e96e9133ab916d817',
  function (e, t, i, n) {
    n._$getMoocLogo = function (e) {
      t._$postDWR({
        key: 'getMoocLogoWeb',
        url: 'CommonBean.obtain',
        param: ['MoocLogo'],
        notShowLoading: !0,
        onload: e,
      });
    };
    n._$getMoocKaoyan = function (e) {
      t._$postDWR({
        key: 'getMoocKaoyan',
        url: 'CommonBean.obtain',
        param: ['MoocKaoyan'],
        notShowLoading: !0,
        onload: e,
      });
    };
    n._$getStudent = function (e, t) {
      t([
        {
          url: '//edu-image.nosdn.127.net/03B3283015E4A7AEBA2F62705D7A6068.png?imageView&thumbnail=94y94&quality=100',
          name: '陈睿',
          desc: '我第一次感受到故宫角楼在夕阳下震撼的美，便是在考完《中国古代建筑艺术》之后的那个下午；学完了《不朽的艺术》，再去博物馆不再是陪儿子完成任务了。学习MOOC之前和之后的对比，让我感受最深的就是鲍勃·迪伦的那句“昔日我曾苍老，如今风华正茂” 。',
          school: '北京某事业单位 公务员',
        },
        {
          url: '//edu-image.nosdn.127.net/534DC33D9C26EB680537236EFF907B4A.png?imageView&thumbnail=200y200&quality=100',
          name: '周昀',
          desc: '中国大学MOOC帮助我在专业上更进一步：《公司金融》，《财务管理》，《会计学》，《大学英语口语》，《大学英语写作》，我刷了一遍又一遍。很显然，卿不负我如来亦此，我等来了命运对我的眷顾，成为浙大一名准博士生。',
          school: '中南财经政法大学 工商管理',
        },
        {
          url: '//edu-image.nosdn.127.net/188D3CE39192F285304A2AA8AAE570D6.png?imageView&thumbnail=200y200&quality=100',
          name: '刘瑜',
          desc: '原来学习是可以上瘾的。我相信只要找对打开姿势，都会被慕课的魅力所吸引：分课程做笔记；听到精彩的地方，写两笔小感悟；有困惑的地方，在讨论区总有热心的学友们答疑解惑；偶尔还能得到老师的评语，受宠若惊啊。',
          school: '北京某软件公司 测试兼商务英语培训师',
        },
        {
          url: '//edu-image.nosdn.127.net/D55A842CEACAF57AAB547FDCA8822470.png?imageView&thumbnail=200y200&quality=100',
          name: '崔常山',
          desc: '我没有受到正规的大学教育，更没有听过大学老师的讲课。自己的两个本科文凭，都是自考的。因此看到有那么多自己曾经无限羡慕的大学，犹如一个从没有见过糖果的小孩子一下子见到那么多诱人的糖果，那种欣喜若狂，不知道大家能否想象得出……',
          school: '报社记者，正准备往律师方向发展',
        },
        {
          url: '//edu-image.nosdn.127.net/ECC8F44844DBDEFDBFF5C8B5FB498D40.png?imageView&thumbnail=200y200&quality=100',
          name: '刘纪孔',
          desc: '我是一个七十多岁的退休人员，也是慕课粉丝。上了年纪的人学习有两座大山拦着前进的大方向：一是记忆力衰退，二是电脑水平不高。但是，也有两大法宝：一是时间充沛，二是心无旁骛。我在人生的黄昏时光里变得像年青人玩手机一样地迷恋着中国大学MOOC。',
          school: '退休人员',
        },
        {
          url: '//edu-image.nosdn.127.net/344B88BAEE67F96BE5D7D3185873C360.png?imageView&thumbnail=200y200&quality=100',
          name: '舢板',
          desc: '我起初的工作是建筑施工的技术员，干了快三年了，想有所提高，成为一名管理人员。一次偶然的机会，我接触到中国大学MOOC的《工程项目管理》。课程知识非常实用，在面试时，让我游刃有余。可以说，因为慕课，我开始了人生的新阶段。',
          school: '工程项目管理员',
        },
      ]);
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '682eb3959b27312ff66688573dd64e00',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      _ = NEJ.P('nej.ut'),
      r,
      c = n._$addHtmlTemplate(
        '            <div class="m-side-operation" id="j-side-operation">                 <div class="j-zc-contact side-service-item">                     <a class="item-link-block feedback sobotService" href="javascript:;">                          <i class="side-service-icon feedback-icon feedback-text">                            <img src="http://edu-image.nosdn.127.net/781ea44d125b4d05a4059b7c29b49ee9.png?imageView&quality=100" />                            <div>咨询</div>                        </i>                        <span class="item-hover-text">                            <img src="http://edu-image.nosdn.127.net/4ae5ebf3317c40ee8528c368e569e2f4.png?imageView&quality=100" />                            <div>咨询</div>                        </span>                    </a>                 </div>                <div class="line-wrap"><div class="line"></div></div>                <div class="side-service-item">                     <a class="item-link-block feedback" href="//www.icourse163.org/about/contactus.htm#/contactus?type=4" target="_blank">                          <i class="side-service-icon feedback-icon feedback-text">                            <img src="http://edu-image.nosdn.127.net/2bb0b4f3a90e41d381743dad3488b371.png?imageView&quality=100" />                            <div>反馈</div>                        </i>                        <span class="item-hover-text">                            <img src="http://edu-image.nosdn.127.net/b725849184a9487d988d62b859b3f66d.png?imageView&quality=100" />                            <div>反馈</div>                        </span>                    </a>                 </div>                <div class="line-wrap"><div class="line"></div></div>                <div class="side-service-item ">                     <a class="item-link-block app-download" data-name="手机课堂" href="javascript:void(0)">                          <i class="side-service-icon phone-icon">                            <img src="http://edu-image.nosdn.127.net/9a03ff848fff4f91bd47584bbbab8d33.png?imageView&quality=100" />                            <div>下载</div>                        </i>                        <span class="item-hover-text">                            <img src="http://edu-image.nosdn.127.net/1ce99075a87b46ea99f8c37501fde8fd.png?imageView&quality=100" />                            <div>下载</div>                        </span>                        <div class="qrcode-bubble">                            <div class="qrcode">                                <div class="download">                                    <img src="//mc.stu.126.net/res/images/common/downloadQR.png?ac4060b8beafd048347c06bc86311d8e" />                                    <p>下载App</p>                                </div>                                <div class="follow-weixin">                                    <img src="//mc.stu.126.net/res/images/common/qrcode_for_gh_f7652e9b9e0d_860.jpg?abfdfcbf8f260b1767ac3c03343cfe75"/>                                    <p>关注微信</p>                                </div>                                <div class="follow-kaoyan">                                    <img src="//mooc-image.nosdn.127.net/06116aeb365a4e028e515dcf3550fa2e.jpg?imageView&quality=100" />                                    <p>考研公众号</p>                                </div>                            </div>                            <div class="arrow"><div class="arrow-border"></div><div class="arrow-cnt"></div></div>                        </div>                     </a>                 </div>                <div class="line-wrap j-wrap"><div class="line"></div></div>                <div class="side-service-item j-backToTop">                     <a class="item-link-block side-service-top" data-name="回到顶部" href="javascript:void(0)" >                          <i class="side-service-icon top-icon">                            <img src="http://edu-image.nosdn.127.net/79b2e59c49764653b2bc849ba11443e8.png?imageView&quality=100" />                            <div>顶部</div>                        </i>                        <span class="item-hover-text  scrtop-text">                            <img src="http://edu-image.nosdn.127.net/ffa896a11bc240258c07ea6dcb4378d1.png?imageView&quality=100" />                            <div>顶部</div>                        </span>                    </a>                 </div>             </div>',
      );
    var d = n._$pushCSSText(
      '#j-activityRightBanner {right:13px !important;}        .m-side-operation { position: fixed; right: 12px; bottom: 12px; z-index: 300; font-size: 14px; border: 1px solid #e6e6e6; background: #fff; width: 40px; border-radius: 5px; }            .m-side-operation .side-service-item {width: 40px;}            .m-side-operation .side-service-item .item-link-block { position: relative; width: 40px; height: 60px; display: inline-block; display: flex; align-items: center; justify-content: center; }            .m-side-operation .side-service-item .item-link-block:hover .item-hover-text {display: block;}            .m-side-operation .side-service-item .item-link-block:hover .side-service-icon {display: none;}            .m-side-operation .side-service-item .item-link-block .side-service-icon { }            .m-side-operation .side-service-item .item-link-block .side-service-icon div { font-style: normal; font-size: 12px; color: #666; padding-top: 2px; }            .m-side-operation .side-service-item .item-link-block .side-service-icon img { width: 24px; height: 24px; }            .m-side-operation .side-service-item .item-link-block .item-hover-text { display: none; text-align: center; padding: 8px; background-color: #00cc7e; color: #fff; }            .m-side-operation .side-service-item .item-link-block .item-hover-text div { font-style: normal; font-size: 12px; color: #fff; padding-top: 2px; }            .m-side-operation .side-service-item .item-link-block .item-hover-text img { width: 24px; height: 24px; }            .m-side-operation .side-service-item .item-link-block .qrcode-bubble {display: none;z-index:300;}            .m-side-operation .side-service-item .item-link-block .qrcode-bubble .qrcode {box-sizing: content-box;border: 1px solid #e6e6e6;position: absolute;right: 50px;top: -44px;width:300px;padding: 16px 7px 14px 16px;background-color: #fff;border-radius: 5px;text-align: center;}            .m-side-operation .side-service-item .item-link-block .qrcode-bubble .qrcode .download, .m-side-operation .side-service-item .item-link-block .qrcode-bubble .qrcode .follow-weixin, .m-side-operation .side-service-item .item-link-block .qrcode-bubble .qrcode .follow-kaoyan{float: left;width: 90px;color: #666;margin-right: 10px;}            .m-side-operation .side-service-item .item-link-block .qrcode-bubble .qrcode .download img, .m-side-operation .side-service-item .item-link-block .qrcode-bubble .qrcode .follow-weixin img, .m-side-operation .side-service-item .item-link-block .qrcode-bubble .qrcode .follow-kaoyan img{width: 90px;height: 90px;}            .m-side-operation .side-service-item .item-link-block .arrow .arrow-cnt, .m-side-operation .side-service-item .item-link-block .arrow .arrow-border {display: block;position: absolute;top: 15px;right: 32px;border-width: 7px 9px;border-style: solid;border-color: transparent transparent transparent #fff;}            .m-side-operation .side-service-item .item-link-block .arrow .arrow-cnt {left: -12px;}            .m-side-operation .side-service-item .item-link-block .arrow .arrow-border {border-left-color: #e6e6e6;}            .m-side-operation .side-service-item .app-download:hover .qrcode-bubble {display: block;}            .m-side-operation .side-service-item .follow:hover .qrcode-bubble {display: block;}            .m-side-operation .line-wrap { width: 40px; text-align: center; font-size: 0; }            .m-side-operation .line-wrap .line { width: 24px; border-top: 1px solid #e6e6e6; display: inline-block; }          ',
    );
    s._$$ScrollTop2 = NEJ.C();
    r = s._$$ScrollTop2._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_css = d;
      this.__seed_html = n._$addNodeTemplate(n._$getHtmlTemplate(c));
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__scrollTopBtn = n._$getByClassName(this.__body, 'side-service-top')[0];
      this.__isIE = s._$isIE();
      this.__allNode = n._$get('j-side-operation');
      this.__wrap = n._$getByClassName(this.__body, 'j-wrap')[0];
      this.__backToTop = n._$getByClassName(this.__body, 'j-backToTop')[0];
      this.__zcNode = n._$getByClassName(this.__body, 'j-zc-contact')[0];
      this.isShowZC =
        '/channel/13001.htm' == location.pathname ||
        '/kaoyan/channel/index.htm' == location.pathname ||
        '/activities/kaochongServing.htm' == location.pathname;
      this.__activityRightBanner = n._$get('j-activityRightBanner');
      this.__reactAiMoocDom = n._$get('j-reactInjectAiMoocEntry');
      this.__getPageBox();
      var e;
      if (this.__scrollTop <= 0) {
        this.__wrap.style.display = 'none';
        this.__backToTop.style.display = 'none';
        e = this.isShowZC ? '205px' : '143px';
        !!this.__activityRightBanner && (this.__activityRightBanner.style.bottom = e);
      } else {
        e = this.isShowZC ? '265px' : '204px';
        !!this.__activityRightBanner && (this.__activityRightBanner.style.bottom = e);
      }
      setTimeout(
        function () {
          if (this.__reactAiMoocDom) {
            this.__reactAiMoocDom.style.bottom =
              parseInt(e, 10) + 12 + parseInt(this.__activityRightBanner.offsetHeight, 10) + 'px';
            this.__reactAiMoocDom.style.display = 'inline-block';
          }
        }._$bind(this),
        300,
      );
      this.__feedback = n._$getByClassName(this.__body, 'feedback')[0];
      a._$addEvent(this.__scrollTopBtn, 'click', this.__onScrollTop._$bind(this));
      a._$addEvent(window, 'scroll', this.__onScroll._$bind(this));
      a._$addEvent(this.__body, 'click', this.__getEvent._$bind(this, '首页_底部导航'));
      a._$addEvent(this.__zcNode, 'click', this.__onClickZC._$bind(this));
      if (!this.isShowZC) this.__zcNode && (this.__zcNode.style.display = 'none');
    };
    r.__onClickZC = function () {
      if (window.DATracker)
        DATracker &&
          DATracker.track('频道页-侧边栏客服入口点击', {
            pagename: 'home',
            user_id: window.webUser ? window.webUser.id : null,
            channel_name: '考研',
          });
    };
    r.__onScrollTop = function () {
      var e = n._$getPageBox().scrollTop;
      this.__easeout = _._$$AnimEaseOut._$allocate({
        from: { offset: e },
        to: { offset: 0 },
        duration: 100,
        onupdate: this.__onAnimate._$bind(this),
        onstop: this.__stopAnimate._$bind(this),
      });
      this.__easeout._$play();
    };
    r.__onAnimate = function (e) {
      window.scrollTo(0, e.offset);
    };
    r.__stopAnimate = function () {
      if (this.__easeout) this.__easeout = _._$$AnimEaseOut._$recycle(this.__easeout);
    };
    r.__onScroll = function () {
      this.__getPageBox();
      if (this.__scrollTop > 0) this.__showScrollTop();
      else this.__hideScrollTop();
    };
    r.__getPageBox = function () {
      var e = n._$getPageBox();
      this.__scrollTop = e.scrollTop;
      this.__clientWidth = e.clientWidth;
    };
    r.__clearScrollTopTimer = function () {
      if (this.__timer) this.__timer = window.clearTimeout(this.__timer);
    };
    r.__showScrollTop = function () {
      this.__clearScrollTopTimer();
      if (this.__isIE);
      var e = this.isShowZC ? '265px' : '204px';
      this.__wrap.style.display = 'block';
      this.__backToTop.style.display = 'block';
      !!this.__activityRightBanner && (this.__activityRightBanner.style.bottom = e);
      if (this.__reactAiMoocDom)
        this.__reactAiMoocDom.style.bottom =
          parseInt(e, 10) + 12 + parseInt(this.__activityRightBanner.offsetHeight, 10) + 'px';
    };
    r.__hideScrollTop = function () {
      this.__clearScrollTopTimer();
      var e = this.isShowZC ? '205px' : '143px';
      this.__timer = window.setTimeout(
        function () {
          if (this.__isIE);
          this.__wrap.style.display = 'none';
          this.__backToTop.style.display = 'none';
          !!this.__activityRightBanner && (this.__activityRightBanner.style.bottom = e);
          this.__reactAiMoocDom.style.bottom =
            parseInt(e, 10) + 12 + parseInt(this.__activityRightBanner.offsetHeight, 10) + 'px';
        }._$bind(this),
        300,
      );
    };
    r.__getEvent = function (t, i) {
      var o = a._$getElement(i, 'd:name'),
        _ = '',
        r = {};
      if (o) {
        a._$stopBubble(i);
        _ = n._$dataset(o, 'name');
        r['是否登陆'] = s._$getWebUser() ? '已登录' : '未登陆';
        r['当前url'] = e.location.href;
        s._$trackEvent(t, _, JSON.stringify(r || {}));
      }
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__hideAll();
      if (window.zc) zc('dynamic_ready');
    };
    r.__hideAll = function (e) {
      var t = window.location.href && window.location.href.toLowerCase();
      if (t.includes('documentquestion') || t.includes('export'))
        n._$get('j-side-operation').style = 'display:none';
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'b8157c8e66c25b7e96415cbd6307e8a5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'b8157c8e66c25b7e96415cbd6307e8a5',
);
EDU(
  'aa75ab57e1533bbc2fc6aea356d2ba42',
  function (e, t, i, n, a, o, s, _, r, c) {
    o._$$SelectHelper = t._$klass();
    c = o._$$SelectHelper._$extend(a._$$EventTarget);
    c.__reset = function (e) {
      this.__super(e);
      this.__loop = !!e.loopable;
      this.__parent = i._$get(e.parent);
      this.__selected = e.selected || 'js-selected';
      this.__hovered = e.hover || this.__selected;
      this.__nopt = {};
      if (e.clazz) {
        this.__nopt.filter = i._$hasClassName._$bind2(i, e.clazz);
        this.__clazz = e.clazz;
      }
      this.__kbody = this.__getKeyBoardParent(this.__parent);
      this.__doInitDomEvent([
        [this.__kbody, 'keydown', this.__doCheckKBAction._$bind(this), !0],
        [this.__kbody, 'enter', this.__doCheckKBEnter._$bind(this)],
        [this.__parent, 'click', this.__onCheckClick._$bind(this)],
        [this.__parent, 'mouseover', this.__onCheckHover._$bind(this)],
        [this.__parent, 'mouseleave', this.__onCheckLeave._$bind(this)],
      ]);
    };
    c.__destroy = function () {
      this.__super();
      delete this.__selected;
      delete this.__hovered;
      delete this.__parent;
      delete this.__kbody;
      delete this.__clazz;
      delete this.__nopt;
      delete this.__loop;
    };
    c.__isItemElement = function (e) {
      if (this.__clazz) return i._$hasClassName(e, this.__clazz);
      else return e.parentNode == this.__parent;
    };
    c.__getKeyBoardParent = (function () {
      var e = 1e3;
      return function (t) {
        for (; t && (parseInt(t.tabIndex) || 0) <= e;) t = t.parentNode;
        return t || document;
      };
    })();
    c.__getItemElement = function (e) {
      var t = i._$getByClassName(this.__parent, e);
      return !t ? null : t[0];
    };
    c.__doSyncSelection = function (e, t) {
      i._$delClassName(e.last, t);
      i._$addClassName(e.target, t);
      if (t == this.__selected && e.last != e.target) {
        this.__doScrollToView(e.target);
        this._$dispatchEvent('onchange', e);
      }
    };
    c.__doScrollToView = function (e) {
      var t = i._$getScrollViewPort(e),
        n = i._$offset(e, t);
      if (!(n.y - t.scrollTop < 0)) {
        var a = n.y + e.offsetHeight - t.clientHeight;
        if (a > t.scrollTop) t.scrollTop = a;
      } else t.scrollTop = n.y;
    };
    c.__doParseSelection = function (e, t) {
      var i = n._$getElement(e, this.__isItemElement._$bind(this));
      return !i ? null : { last: this.__getItemElement(t), target: i };
    };
    c.__doCheckKBAction = function (e) {
      var t = e.keyCode;
      if (38 == t || 40 == t) {
        n._$stop(e);
        var a = { last: this._$getSelectedNode() };
        this.__nopt.backward = 38 == t;
        var o = !this.__clazz
            ? i._$getChildren(this.__parent)
            : i._$getByClassName(this.__parent, this.__clazz),
          s = this.__nopt.backward ? o[o.length - 1] : o[0];
        if (!a.last) a.target = this.__getItemElement(this.__hovered) || s;
        else a.target = i._$getSibling(a.last, this.__nopt);
        if (!a.target) {
          if (!this.__loop || o.length <= 1) return;
          a.target = s;
        }
        this.__doSyncSelection(a, this.__selected);
      }
    };
    c.__doCheckKBEnter = function (e) {
      n._$stop(e);
      this._$dispatchEvent('onselect', { enter: !0, target: this._$getSelectedNode() });
    };
    c.__onCheckClick = function (e) {
      n._$stop(e);
      var t = this.__doParseSelection(e, this.__selected);
      if (t) {
        this.__doSyncSelection(t, this.__selected);
        this._$dispatchEvent('onselect', { target: t.target });
      }
    };
    c.__onCheckHover = function (e) {
      var t = this.__doParseSelection(e, this.__hovered);
      if (t) {
        this.__doSyncSelection(t, this.__hovered);
        if (this.__kbody.focus) this.__kbody.focus();
      }
    };
    c.__onCheckLeave = function (e) {
      if (this.__hovered != this.__selected)
        i._$delClassName(this.__getItemElement(this.__hovered), this.__hovered);
    };
    c._$getSelectedNode = function () {
      return this.__getItemElement(this.__selected);
    };
    if (!0) e.copy(e.P('nej.ut'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
EDU(
  'ad01531f53c8c24b12a9db4322fa8f85',
  function (e, t, i, n, a, o, s, _, r) {
    var c;
    o._$$Suggest = t._$klass();
    c = o._$$Suggest._$extend(n._$$EventTarget);
    c.__init = function () {
      this.__sopt = {
        loopable: !0,
        onselect: this.__onSelect._$bind(this),
        onchange: this.__onSelectionChange._$bind(this),
      };
      this.__super();
    };
    c.__reset = function (e) {
      this.__super(e);
      this.__auto = !!e.autofill;
      this.__input = i._$get(e.input);
      this.__sopt.clazz = e.clazz;
      this.__sopt.parent = i._$get(e.body);
      this.__sopt.selected = e.selected || 'js-selected';
      this.__doInitDomEvent([
        [this.__input, 'input', this.__onInput._$bind(this)],
        [this.__input, 'focus', this.__onInput._$bind(this)],
      ]);
      if (!e.noblur) this.__doInitDomEvent([[this.__input, 'blur', this.__onBlur._$bind(this)]]);
      this._$visibile(!1);
      this.__helper = a._$$SelectHelper._$allocate(this.__sopt);
    };
    c.__destroy = function () {
      this.__super();
      if (this.__helper) {
        this.__helper._$recycle();
        delete this.__helper;
      }
      delete this.__xxx;
      delete this.__input;
      delete this.__sopt.parent;
    };
    c.__onBlur = function () {
      this.__onSelect({ target: this.__helper._$getSelectedNode() });
    };
    c.__onInput = function () {
      var e = this.__input.value.trim();
      if (!e) this._$visibile(!1);
      else if (!this.__xxx) this._$dispatchEvent('onchange', e);
    };
    c.__doUpdateValue = function (e) {
      if (!this.__xxx) {
        this.__xxx = !0;
        if (e && e != this.__input.value) this.__input.value = e;
        this.__xxx = !1;
      }
    };
    c.__onSelect = function (e) {
      var t = i._$dataset(e.target, 'value') || '';
      this.__doUpdateValue(t);
      t = t || this.__input.value;
      this._$update('');
      this._$dispatchEvent('onselect', t, { target: e.target, enter: e.enter, value: t });
    };
    c.__onSelectionChange = function (e) {
      if (this.__auto) this.__doUpdateValue(i._$dataset(e.target, 'value') || '');
    };
    c._$setList = function (e) {
      this._$visibile(!!e && e.length > 0);
    };
    c._$visibile = function (e) {
      var e = !e ? 'hidden' : 'visible';
      this.__sopt.parent.style.visibility = e;
      if ('hidden' === e) this.__sopt.parent.innerHTML = '';
    };
    c._$update = function (e) {
      this.__sopt.parent.innerHTML = e || '&nbsp;';
      this._$visibile(!!e);
    };
    if (!0) e.copy(e.P('nej.ut'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'aa75ab57e1533bbc2fc6aea356d2ba42',
);
EDU(
  'e88d1d3d987cb956bc96010a864bfb7a',
  function () {
    var e = NEJ.P,
      t = e('nej.e'),
      i = e('nej.v'),
      n = e('nej.u'),
      a = e('edu.u'),
      o = e('nej.ut'),
      s;
    a._$$SuggestAgent = NEJ.C();
    s = a._$$SuggestAgent._$extend(o._$$Suggest);
    s.__reset = function (e) {
      this.__supReset(e);
      this.__noInputFill = e.noInputFill || !1;
      this.__registDomEvent({});
    };
    s.__onSelect = function (e) {
      var t = this._$update;
      this._$update = function () {};
      this.__super(e);
      this._$update = t;
    };
    s.__registDomEvent = function (e) {
      this.__doClearDomEvent();
      this.__doInitDomEvent([
        [this.__input, 'keyup', this.__onInput._$bind(this)],
        [this.__input, 'blur', this.__onBlur._$bind(this)],
        [this.__sopt.parent, 'click', this.__doFinishSelect._$bind(this, e)],
        [document, 'keypress', this.__onKeyBoardEnter._$bind2(this, e)],
      ]);
    };
    s.__destroy = function () {
      this.__supDestroy();
      this.__doDestroyList();
      delete this.__sopt.selected;
      delete this.__input;
      delete this.__sopt.parent;
    };
    s.__isSuggestAgentItem = function (e) {
      return null != e.flag;
    };
    s.__doDestroyList = (function () {
      var e = function (e) {
        n._$safeDelete(e, 'flag');
      };
      return function () {
        n._$forEach(this.__list, e);
        this.__list = [];
        this.__index = 0;
      };
    })();
    s.__doSelectItem = function (e) {
      if (this.__index !== e) this.__index = e;
    };
    s.__deSelectItem = function (e) {
      if (this.__index === e) delete this.__index;
    };
    s.__onBlur = function (e) {
      var t = e.srcElement;
      this.__blurSTL = setTimeout(
        function () {
          this._$setList();
          this._$dispatchEvent('onblur', t);
        }._$bind(this),
        200,
      );
    };
    s.__doFinishSelect = function (e, a) {
      if (this.__blurSTL) this.__blurSTL = window.clearTimeout(this.__blurSTL);
      this.__byClick = !0;
      this.__target = i._$getElement(a, 'c:zitm');
      var o = !1;
      if (13 == a.keyCode) o = !0;
      var s = this.__target;
      if (!s && o && a.target && !a.target.value)
        if (this.__list) {
          if (0 !== this.__index) this.__index--;
          s = this.__list[this.__index];
        }
      if (s) {
        var _ = s.innerText;
        this.__sopt.parent.style.visibility = 'hidden';
        if (!this.__noInputFill) this.__input.value = _;
        this._$setList();
        var r;
        n._$forEach(e, function (e) {
          if (t._$dataset(s, 'id') == e.id) r = e;
        });
        if (o) {
          r.keyCode = 13;
          r.isEnterKeyPressed = o;
        }
        this._$dispatchEvent('onselect', r);
        this.__byClick = !1;
      } else this.__byClick = !1;
    };
    s.__doProSelect = function () {
      if (this.__byKeyDown) this.__byKeyDown = window.clearTimeout(this.__byKeyDown);
      this.__byKeyDown = setTimeout(
        function () {
          if (this.__list) {
            var e = this.__list[this.__index] || this.__list[0],
              i = t._$dataset(e, 'value') || e.innerText;
            if (!this.__noInputFill) this.__input.value = i;
            this.__byKeyDown = !1;
          }
        }._$bind(this),
        200,
      );
    };
    s.__onInput = function (e) {
      if (!this.__byClick && !this.__byKeyDown) {
        var t = this.__input.value.trim();
        this._$dispatchEvent('onchange', t, e);
        var n = 0,
          a = e.keyCode;
        if (38 == a) n = -1;
        if (40 == a) n = 1;
        if (n) {
          i._$stop(e);
          if (this.__list) {
            var o = Math.max(0, Math.min(this.__index + n, this.__list.length - 1));
            if (o !== this.__index) {
              this.__deSelectItem(this.__index);
              this.__doSelectItem(o);
              this.__doProSelect();
            }
          }
        }
      }
    };
    s.__onKeyBoardSelect = function (e) {
      var t = 0,
        n = e.keyCode;
      if (38 == n) t = -1;
      if (40 == n) t = 1;
      if (t) {
        i._$stop(e);
        if (this.__list) {
          var a = Math.max(0, Math.min(this.__index + t, this.__list.length - 1));
          if (a !== this.__index) {
            this.__deSelectItem(this.__index);
            this.__doSelectItem(a);
            this.__doProSelect();
          }
        }
      }
    };
    s.__onKeyBoardEnter = function (e, t) {
      if (13 == e.keyCode) this.__doFinishSelect(t, e);
    };
    s._$setList = (function () {
      var e = function (e, t) {
        e.flag = t;
      };
      return function (t, i) {
        this.__doDestroyList();
        if (t && t.length) {
          this.__list = t;
          this.__doSelectItem(0);
          this.__registDomEvent(i);
          n._$forEach(this.__list, e);
          this.__sopt.parent.style.visibility = 'visible';
        }
      };
    })();
  },
  'ad01531f53c8c24b12a9db4322fa8f85',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'ad01531f53c8c24b12a9db4322fa8f85',
);
EDU(
  '9a4e3ec58394f1d885dede90ffdef662',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      i = e('nej.e'),
      n = e('nej.u'),
      a = e('nej.ut'),
      o = e('nej.ui'),
      s = e('edu.u'),
      _,
      r;
    var c = i._$pushCSSText(
      '        .#<uispace>-parent{position:absolute;left:-1px;border:1px solid #d5d5d5;width:100%;background:#FAFAFA;z-index:999;}        .#<uispace>-parent .j-cnt{width:100%;color:#444;visibility:hidden;}\t\t.#<uispace>-parent .zitm-top{width:100%;text-indent:6px;line-height:32px;cursor:pointer;}        .#<uispace>-parent .zitm,.#<uispace>-parent .zitm p{width:100%;text-indent:6px;line-height:32px;cursor:pointer;}\t\t.#<uispace>-parent .zitm a{display:block;overflow:hidden;text-overflow:ellipsis;font-size:12px}\t\t.#<uispace>-parent .zitm:hover,.#<uispace>-parent .zitm:hover p{color:#16914E;background-color:#ECECEE;}        .#<uispace>-parent .js-selected,.#<uispace>-parent .js-selected p{color:#16914E;background-color:#ECECEE;}',
    );
    var d;
    s._$$Suggest = NEJ.C();
    _ = s._$$Suggest._$extend(o._$$Abstract);
    r = s._$$Suggest._$supro;
    s._$$Suggest._$getInstance = function (e) {
      if (d) {
        d.__suggest._$recycle();
        delete d.__suggest;
        d.__reset(e);
        return d;
      } else {
        d = s._$$Suggest._$allocate(e);
        return d;
      }
    };
    _.__init = function () {
      this.__sopt = {
        onchange: this.__onChange._$bind(this),
        onselect: this.__onSelect._$bind(this),
        onblur: this.__onBlur._$bind(this),
      };
      this.__supInit();
    };
    _.__reset = function (e) {
      this.__supReset(e);
      this.__suggestOption = e.suggestOption;
      this.__separate = e.separate;
      this.__sopt.body = this.__suggestOption;
      this.__sopt.input = i._$get(e.input);
      this.__sopt.input.insertAdjacentElement('afterEnd', e.parent);
      this.__sopt.noInputFill = e.noInputFill;
      this.__suggest = s._$$SuggestAgent._$allocate(this.__sopt);
    };
    _.__destroy = function () {
      this.__supDestroy();
      this.__suggest._$recycle();
      delete this.__suggest;
      delete this.__sopt.input;
    };
    _.__initXGui = function () {
      this.__seed_css = c;
    };
    _.__initNode = function () {
      this.__supInitNode();
    };
    _.__onChange = function (e, t) {
      this._$dispatchEvent('onchange', e, t);
    };
    _.__onSelect = function (e) {
      if (n._$isObject(e)) this._$dispatchEvent('onselect', e);
    };
    _.__onBlur = function (e) {
      this._$dispatchEvent('onblur', e);
    };
    _._$setList = function (e, t, a) {
      this.__dataList = e;
      if (n._$isArray(e)) {
        n._$forEach(e, function (e, t) {
          if (e.name) e.name = e.name.replace(/<br\/>/gi, ' ');
          if (e.title) e.title = e.title || e.name;
        });
        e = i._$getHtmlTemplate(a || 'jst-suggest', { xlist: e });
      }
      this.__suggestOption.innerHTML = e || '';
      this.__nodeList = !t
        ? i._$getChildren(this.__suggestOption)
        : i._$getByClassName(this.__suggestOption, t);
      n._$forEach(
        this.__nodeList,
        function (e, t) {
          var n = this.__dataList[t].id;
          if (n) if (this.__separate && this.__separate[n]) i._$addClassName(e, this.__separate[n]);
        }._$bind(this),
      );
      this.__suggest._$setList(this.__nodeList, this.__dataList);
    };
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'e88d1d3d987cb956bc96010a864bfb7a',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fe86216ed59e3103a56c42c850d389f0',
  '2251224ef4bde318c45429fafdfcdd19',
);
EDU(
  'add7e5d4d4a772d787eec2ad51e08ae5',
  function (e) {
    var t = NEJ.P('nej.e'),
      i = NEJ.P('nej.v'),
      n = NEJ.P('edu.m'),
      a = NEJ.P('edu.u'),
      o =
        '                    <div class="u-insug">                        <div class="area"></div>                        <div class="sug" style="display:none">                            <div class="f-thide s-fc6 ar j-basetxt">请选择或继续输入...</div>                            <div class=""></div>                        </div>                    </div>',
      s;
    a._$$InputSuggest = NEJ.C();
    s = a._$$InputSuggest._$extend(a._$$UIBase, !0);
    s.__initXGui = function () {
      this.__seed_html = t._$addNodeTemplate(o);
    };
    s.__initNode = function () {
      this.__supInitNode();
      var e = t._$getChildren(this.__body);
      this.__inputP = e[0];
      this.__suggestP = e[1];
      this.__baseTextInput = t._$getByClassName(this.__body, 'j-basetxt')[0];
      this.__sugstCnt = t._$getChildren(this.__suggestP)[1];
      this.__charUtil = new n._$$CharasetUtil();
    };
    s._$onSetLabelSuggestion = function (e, t, i, n) {
      if (!e || 0 != e.length) {
        if (!((t && t != this.__labelValue) || this.__noFocus)) {
          this.__suggest._$setList(e, i, n);
          a._$showNode(this.__suggestP);
        }
      } else {
        this.__suggest._$setList(e);
        a._$hiddenNode(this.__suggestP);
      }
    };
    s.__cursorHandle = function (e) {
      this._$dispatchEvent('onInputFocus');
      setTimeout(
        function () {
          if (e) {
            this.__suggest = a._$$Suggest._$getInstance({
              input: this.__input.__textArea || this.__input.__input,
              parent: this.__suggestP,
              suggestOption: this.__sugstCnt,
              separate: this.__separate,
              onchange: this.__onChange._$bind(this),
              onselect: this.__onSelect._$bind(this),
              onblur: this.__onBlur._$bind(this),
              noInputFill: this.__noEnterFill || !1,
            });
            this.__noFocus = !1;
          }
        }._$bind(this),
        200,
      );
    };
    s.__hiddenSuggest = function () {
      this.__suggest._$setList();
      a._$hiddenNode(this.__suggestP);
    };
    s.__onChange = function (e, t) {
      switch (t.keyCode) {
        case 13:
          i._$stop(t);
          if (a._$isNodeShown(this.__suggestP)) this.__onAddToInput(e);
          return;
        case 8:
          i._$stop(t);
          if (!a._$isNodeShown(this.__suggestP))
            if (e.match('.+\\s\\(.+')) {
              e = a._$trim(e.split('(')[0]);
              this.__input._$setInitContent(e);
              this._$dispatchEvent('onDeleteCnt');
              return;
            }
          break;
        case 38:
          i._$stop(t);
          return;
        case 40:
          i._$stop(t);
          return;
      }
      if (!e.match('.*\\s+$'))
        if ('' != e) {
          var n = this.__charUtil._$spaceFilter(e);
          this.__labelValue = n[n.length - 1];
          this.__handleOnSuggest(this, this.__labelValue);
        } else this.__hiddenSuggest();
      else this.__hiddenSuggest();
    };
    s.__handleOnSuggest = (function () {
      return e.debounce(
        function (e, t) {
          if (t) e._$dispatchEvent('onSuggest', t);
        },
        400,
        !1,
      );
    })();
    s.__onAddToInput = function (e) {
      if (this.__input._$getContent().trim() != e.name) {
        var t = this.__charUtil._$spaceFilter(this.__input._$getContent().trim());
        t[t.length - 1] = e.name;
        if (!this.__noEnterFill) this.__input._$setInitContent(t.join(' ') + ' ');
      }
      a._$hiddenNode(this.__suggestP);
    };
    s.__onSelect = function (e) {
      this.__onAddToInput(e);
      this.__noFocus = !1;
      if (e) this._$dispatchEvent('onSelect', e);
    };
    s.__onBlur = function () {
      a._$hiddenNode(this.__suggestP);
      this.__noFocus = !0;
    };
    s.__onInputKeyDown = function (e) {
      this._$dispatchEvent('onKeyDown', e, this.__input._$getContent());
    };
    s._$setInitContent = function (e) {
      this.__input._$setInitContent(e);
    };
    s.__reset = function (e) {
      this.__supReset(e);
      this.__critical = e.critical || 0;
      this.__labeText = e.labelText || '请输入';
      this.__separate = e.separate || '';
      this.__noEnterFill = e.noEnterFill || !1;
      this.__baseTextInput.innerText = e.baseText || '请选择或继续输入...';
      if (!this.__critical)
        this.__input = a._$$BaseInputUI._$allocate({
          parent: this.__inputP,
          labelText: this.__labeText,
          content: e.content,
          width: e.width,
          height: e.height,
          type: 'input',
          onInputFocus: this.__cursorHandle._$bind(this, !0),
          onInputBlur: e.onInputBlur,
          onInputChange: this.__onInputKeyDown._$bind(this),
        });
      else
        this.__input = a._$$TipInputUI._$allocate({
          parent: this.__inputP,
          labelText: this.__labeText,
          filterEnter: !0,
          type: 'input',
          width: e.width,
          height: e.height,
          critical: this.__critical,
          onInputFocus: this.__cursorHandle._$bind(this, !0),
          onInputBlur: e.onInputBlur,
          onInputChange: this.__onInputKeyDown._$bind(this),
        });
    };
    s._$getContent = function () {
      return this.__input._$getContent();
    };
    s._$setContent = function (e) {
      this.__input._$getContent(e);
    };
    s._$disableNoInitInput = function () {
      this.__input._$disableNoInitInput();
    };
    s._$enableInput = function () {
      this.__input._$enableInput();
    };
    s.__destroy = function () {
      if (!this.__critical) this.__input = a._$$BaseInputUI._$recycle(this.__input);
      else this.__input = a._$$TipInputUI._$recycle(this.__input);
      this.__supDestroy();
    };
  },
  '06a1fe998ca2ede601d4740c114f6c3c',
  '02c14b544f21e379de73ba82b326d2a9',
  '342ad7ae4eea50c3cad860686650a915',
  '5f6786e7896f2a86bf128de299871305',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '9a4e3ec58394f1d885dede90ffdef662',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '9fdfe36fa0d16f9b8a86b6a56a15749d',
  function (e) {
    var t = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      n = t._$randNumberString(),
      a,
      o = 'ck-suggestionCache';
    i._$$COM_Cache_SuggestionCache = NEJ.C();
    a = i._$$COM_Cache_SuggestionCache._$extend(i._$$COM_Cache);
    a._$getChargeTeacherSuggestion = function (e, t) {
      this._$postDWR({
        key: o + n,
        url: 'MocSchoolBean.getSuggestLector',
        param: [e, t],
        notShowLoading: !0,
        onload: this.__onGetSuggestLector._$bind(this),
      });
    };
    a.__onGetSuggestLector = function (e) {
      this._$dispatchEvent('onGetTeacherInChargeSuggest', e);
    };
    a._$listCourseByName = function (e) {
      this._$postDWR({
        key: o + n,
        url: 'PublishCourseBean.listCourseByName',
        param: [e],
        onload: this.__onGetSuggestCourse._$bind(this),
      });
    };
    a.__onGetSuggestCourse = function (e) {
      this._$dispatchEvent('onGetSuggestCourse', e);
    };
    a._$getMoocSuggestList = function (t) {
      e._$request({
        url: '/web/j/courseSuggestionBean.getCourseSuggestion.rpc',
        method: 'post',
        data: { keyword: t },
        onload: this.__onGetMoocSuggestList._$bind(this),
      });
    };
    a.__onGetMoocSuggestList = function (e) {
      this._$dispatchEvent('onGetMoocSuggestList', e);
    };
    a._$getCourseSuggestList = function (t) {
      e._$request({
        url: '/web/j/courseSuggestionBean.listSimapleCourseDto.rpc',
        method: 'post',
        data: { keyword: t },
        onload: this.__onGetCourseSuggestList._$bind(this),
      });
    };
    a.__onGetCourseSuggestList = function (e) {
      this._$dispatchEvent('onGetCourseSuggestList', e);
    };
    a._$queryAssits = function (e) {
      this._$postDWR({
        key: o + n,
        url: 'TermStaffBean.queryAssits',
        param: [e],
        notShowLoading: !0,
        onload: this.__onqueryAssits._$bind(this),
      });
    };
    a.__onqueryAssits = function (e) {
      this._$dispatchEvent('onqueryAssits', e);
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'fd2d304e0f3ed379c890a0e85b358838',
  function (e) {
    var t = window,
      i = NEJ.P('nej.e'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s =
        '            <div class="u-sugInput">                <div class="iptArea f-cb">                    <div class="ipt"></div>                </div>            </div>',
      _;
    var r = { COURSE: 1, KAOYAN: 2, COLUMN: 3 };
    var c = { MOOC: 0, ADULT: 1 };
    o._$$SearchSuggest = NEJ.C();
    _ = o._$$SearchSuggest._$extend(o._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(s);
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__inputWrp = i._$getChildren(this.__body)[0];
      this.__inputP = i._$getChildren(this.__inputWrp)[0];
      this.__charUtil = new a._$$CharasetUtil();
      this.__suggestionCache = new n._$$COM_Cache_SuggestionCache();
      this.__suggestionCache._$addEvent(
        'onGetCourseSuggestList',
        this.__onGetSuggestion._$bind(this),
      );
    };
    _.__onGetSuggestion = function (i) {
      this.__list = [];
      this.__list.push({
        id: -1,
        originalName: this.__phrase,
        name: '搜索"' + this.__phrase + '"所有相关课程',
        url: t.urlPrefix.searchPrefix + '?search=' + encodeURIComponent(this.__phrase),
      });
      if (i && i.length) {
        var n = i.length > 10 ? 10 : i.length;
        for (var a = 0; a < n; a++) {
          var o = '';
          var s = i[a] || {};
          var _ = s.name || '';
          var d = s.productType;
          var l = 'zw_mooc_pcsslx_';
          _ = _.replace(/<[^>]+>/g, '');
          var u = _;
          if (s.schoolName) _ = _ + ' (' + s.schoolName + ')';
          if (s.platType === c.ADULT)
            o = e._$getChangeEduCookiesUrl(
              'https://ke.study.163.com/course/detail/' + s.id + '?inLoc=MocWebss_sslx&Pdt=Moc.Web',
            );
          else if (d === r.COURSE || (d === r.KAOYAN && 1 == s.courseType))
            o = t.urlPrefix.courseInfoPrefix + s.id + '.htm?outVendor=' + l;
          else if (d === r.KAOYAN)
            o = '//kaoyan.icourse163.org/course/packages/' + s.id + '.htm?outVendor=' + l;
          else if (d === r.COLUMN) o = '/columns/' + s.currentTermId + '.htm?outVendor=' + l;
          this.__list.push({ url: o, name: _, id: s.id, originalName: u });
        }
      }
      this.__inputSug._$onSetLabelSuggestion(this.__list);
    };
    _._$getContent = function () {
      return this.__inputSug._$getContent();
    };
    _.__reset = function (e) {
      this.__supReset(e);
      this.__labelText = e.labelText || '';
      this.__phrase = e.phrase || '';
      this.__inputSug = o._$$InputSuggest._$allocate({
        parent: this.__inputP,
        labelText: this.__labelText,
        height: 30,
        noEnterFill: !0,
        onSelect: this.__selectSuggest._$bind(this),
        onKeyDown: this.__onInputKeyDown._$bind(this),
        onSuggest: this.__postSuggest._$bind(this),
        onInputFocus: function () {
          this._$dispatchEvent('onInputFocus');
        }._$bind(this),
        onInputBlur: function () {
          this._$dispatchEvent('onInputBlur');
        }._$bind(this),
      });
    };
    _.__onInputKeyDown = (function () {
      function e(e) {
        if (!i) {
          i = !0;
          if (!this.__list || 0 == this.__list.length) this.__inputSug.__input._$blurTextArea();
          this._$dispatchEvent('onInputKeyDown', e);
          i = !1;
        }
      }
      var t = 50;
      var i = !1;
      return function (i) {
        if (i && 13 == i.keyCode)
          if (/mac os/i.test(window.navigator.userAgent)) setTimeout(e._$bind(this, i), t);
          else e.call(this, i);
      };
    })();
    _.__selectSuggest = function (e) {
      for (var i = 0; i < this.__list.length; i++)
        if (this.__list[i].id == e.id) NEJ.X(e, this.__list[i]);
      if (e.url) {
        t.open(e.url);
        window.DATracker &&
          window.DATracker.track('首页-搜索联想点击-w', {
            user_id: window.webUser ? window.webUser.id : '',
            associate_words: e.name,
          });
      }
    };
    _.__destroy = function () {
      this.__schoolId = null;
      this.__inputSug = o._$$InputSuggest._$recycle(this.__inputSug);
      this.__supDestroy();
    };
    _.__postSuggest = function (e) {
      this.__phrase = e;
      this.__suggestionCache._$getCourseSuggestList(e);
    };
    _._$setInitContent = function (e) {
      this.__inputSug._$setInitContent(e);
    };
    _._$disableNoInitInput = function () {
      this.__inputSug._$disableNoInitInput();
    };
    _._$enableInput = function () {
      this.__inputSug._$enableInput();
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'add7e5d4d4a772d787eec2ad51e08ae5',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '9fdfe36fa0d16f9b8a86b6a56a15749d',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU('8d118aed500eb8c7b91ad835708628c5', function () {
  function e(e) {
    var t,
      i = new RegExp('(^| )' + e + '=([^;]*)(;|$)');
    t = document.cookie.match(i);
    if (t) return unescape(t[2]);
    else return null;
  }
  var t = window;
  var i = 'STUDY_INFO';
  var n = {
    '-1': { type: 'urs', name: '网易邮箱' },
    1: { type: 'youdao', name: '有道' },
    2: { type: 'weibo' },
    3: { type: 'renren' },
    4: { type: 'qq' },
    5: { type: 'qiye163' },
    6: { type: 'weixin' },
    7: { type: 'jiaowuxitong', name: '教务系统' },
    8: { type: 'urs_cellphone', name: 'urs 手机账号' },
    11: { type: 'icourse' },
    20: { type: 'enterprise' },
    23: { type: 'corpself' },
    30: { type: 'mobilephone' },
    40: { type: 'enterprise_mobile' },
    50: { type: 'k12campus' },
    60: { type: 'device_id' },
  };
  var a,
    o,
    s = e(i);
  if (s) {
    a = s.split('|')[1];
    if (void 0 !== a) {
      o = n[a];
      if (o) if (t.localStorage) t.localStorage.setItem('LAST_LOGIN_TYPE', o['type']);
    }
  }
});
EDU(
  'd43724d79592db2de8aae01e6a1475fa',
  function (e, t, i, n, a, o, s, _, r, c, d, l, u, h, f, p) {
    function E(e, t) {
      if (!t) t = window.location.href;
      e = e.replace(/[\[\]]/g, '\\$&');
      var i = new RegExp('[?&]' + e + '(=([^&#]*)|&|#|$)'),
        n = i.exec(t);
      if (!n) return null;
      if (!n[2]) return '';
      else return decodeURIComponent(n[2].replace(/\+/g, ' '));
    }
    function b() {
      if (window.webUser)
        if (webUser && webUser.schoolId)
          e._$getSchoolConfig({ schoolId: webUser.schoolId }, function (e) {
            var t = '/mooc/main/spoc/entry';
            var i = '/spoc/university.htm?schoolId=' + window.webUser.schoolId;
            var n = document.querySelector('#mySchoolCloud');
            if (n) {
              window.supportBifrost = 1 === e.supportBifrost;
              n.href = window.supportBifrost ? t : i;
            }
          });
    }
    function g(e, t) {
      if (e) return getComputedStyle(e) ? getComputedStyle(e)[t] : e.currentStyle[t];
      else return '';
    }
    var m = window,
      O = NEJ.O,
      T = NEJ.P('nej.e'),
      S = NEJ.P('nej.v'),
      U = NEJ.P('nej.u'),
      v = NEJ.P('edu.m'),
      A = NEJ.P('edu.d'),
      D = NEJ.P('edu.u'),
      y,
      $,
      w = { BIND_PHONE_MODAL_NOT_SHOWN_COOKIE_NAME: 'bpmns' };
    v._$$CommonUtil = NEJ.C();
    y = v._$$CommonUtil._$extend(v._$$Module, !0);
    $ = v._$$CommonUtil._$supro;
    b();
    !(function () {
      function e() {
        var e = new URLSearchParams(window.location.search);
        var t = e.get('appId');
        var i = ['e04a1975848683a1b16ec6aa2e19a861', '8407ae1b8ec74b381f99c53af62a9364'];
        return i.includes(t);
      }
      function t() {
        var e = document.querySelector('#spocNav');
        if (e) e.style.display = 'none';
        var t = document.querySelector('.u-navVocation-container');
        if (t) t.style.display = 'none';
        var i = document.querySelector('#web-nav-container');
        var n = document.querySelector('#g-container');
        if (!i && n) {
          i = document.createElement('div');
          i.id = 'web-nav-container';
          i.style.position = 'sticky';
          i.style.zIndex = '999';
          i.style.top = '0';
          i.style.width = '100%';
          n.insertBefore(i, n.firstChild);
        }
      }
      function i() {
        var e = new URLSearchParams(window.location.search);
        var t = e.get('appId');
        if (t) {
          var i = function (e) {
            try {
              var i = window.location.origin;
              var n = new URL(e, i);
              if (n.host !== window.location.host) return e;
              if (!n.searchParams.has('appId')) n.searchParams.set('appId', t);
              return n.href;
            } catch (a) {
              return e;
            }
          };
          var n = history.pushState;
          var a = history.replaceState;
          history.pushState = function (e, t, a) {
            var o = i(a);
            return n.call(this, e, t, o);
          };
          history.replaceState = function (e, t, n) {
            var o = i(n);
            return a.call(this, e, t, o);
          };
          document.addEventListener(
            'click',
            function (e) {
              var t = e.target.closest('a');
              if (t) {
                var n = t.getAttribute('href');
                if (n && !n.includes('appId=')) t.href = i(n);
              }
            },
            !0,
          );
          var o = window.open;
          window.open = function (e, t, n) {
            return o(i(e), t, n);
          };
        }
      }
      function n() {
        var e = document.querySelector('.u-navVocation-container');
        if (e) e.style.display = 'block';
      }
      function a() {
        var e = document.querySelector('#j-moocFooterInfo');
        var t = document.querySelector('#j-footer');
        if (e) e.style.display = 'none';
        if (t) t.style.display = 'none';
      }
      function o() {
        var e = document.querySelector('#j-moocFooterInfo');
        if (e) e.style.display = 'block';
      }
      try {
        if (e()) {
          t();
          a();
          i();
        } else {
          n();
          o();
        }
      } catch (s) {
        n();
      }
    })();
    y.__onShow = function (e) {
      e = e || {};
      this.__injectReactMoocHeader();
      $.__onShow.apply(this, arguments);
      var t = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (t && location.href.indexOf('loginSuccessCbReturnUrl=') > -1) {
        var i = E('loginSuccessCbReturnUrl', location.href);
        if (i) location.href = p._$b642str(i);
      } else {
        this.__charUtil = new v._$$CharasetUtil();
        this.__commonCache = new A._$$COM_Cache_commonCache();
        if (m.webUser) this.campusLoginCb();
        if (!this.__dealWithInit) {
          var a = T._$get('j-topnav');
          var o = T._$getByClassName(document.body, 'navLoginBtn');
          o.forEach(
            function (e) {
              this.__handleLogin(e);
            }._$bind(this),
          );
          var s = T._$getByClassName(document.body, 'j-nav-info-box');
          s.forEach(
            function (e) {
              this.__handleInfoBox(e);
            }._$bind(this),
          );
          this.__uhref = T._$getByClassName(a, 'j-uhref');
          this.__imgTag = T._$get('my-img');
          this.__dealWithPersonLink();
          if (
            e.target &&
            '/snsSpread' != e.target &&
            e.target.indexOf('/learn') < 0 &&
            e.target.indexOf('/live') < 0 &&
            !D._$isMobile() &&
            !D._$isWap() &&
            window.location.href.indexOf('/live') < 0 &&
            !/scholarship2017/.test(window.location.pathname)
          )
            if (f.isCh()) this.__scrollTop = D._$$ScrollTop2._$allocate({ parent: document.body });
          m.activityNotEnd = !1;
          var d = T._$getByClassName(document.body, ' j-nav-CateBox');
          d.forEach(
            function (e) {
              this.__handleCateNavBox(e);
            }._$bind(this),
          );
          setTimeout(
            function () {
              this.__handleMultiLineEllipsis();
              this.__injectRightBottomAiMoocEntry();
            }._$bind(this),
            300,
          );
          this.__topLinkHandler();
          this.__setEduEditorOpt();
          this.__initHoverOnCourse();
          this.__dealWithInit = !0;
          if (D._$isWap() && 'undefined' != typeof window.wx && window.wx) {
            this.__commonCache._$wxGetTicket(m.location.href.split('#')[0]);
            this.__commonCache._$addEvent('onWxGetTicket', this.__initWXJSShare._$bind(this));
          }
          D.__initLogoAndActivity();
          var l = !f.isCh();
          var u =
            '1' !== c._$cookie(w.BIND_PHONE_MODAL_NOT_SHOWN_COOKIE_NAME) &&
            !!window.webUser &&
            window.__phoneAccountFunctionalitiesSwitch &&
            !l;
          var h = this.__handleOnCloseBindPhoneModal._$bind(this);
          if (u)
            n._$getDgSchoolList(
              function (e) {
                try {
                  var t = JSON.parse(e);
                  if (t.length && t.indexOf(Number(window.webUser.schoolId)) > -1) {
                    window.isDgSchool = !0;
                    u = !1;
                  } else
                    n._$getPhoneBindPopupStatus({}, function (e) {
                      if (e) {
                        var t = r.thirdBindUtil()._$open(_.LOGINTYPE.PHONE);
                        t && t.$on('ok', h).$on('cancel', h).$on('close', h);
                      }
                    });
                } catch (i) {}
              }._$bind(this),
            );
        }
      }
    };
    y.campusLoginCb = function () {
      try {
        var e = sessionStorage.getItem('campus_login_first_success_params');
        if (e) {
          this.__commonCache._$memberVerify(JSON.parse(e), function (e) {
            if (e && e['1']);
            else console.log('认证失败');
          });
          sessionStorage.removeItem('campus_login_first_success_params');
        }
      } catch (t) {}
    };
    y.__initHoverOnCourse = function () {
      var e = (function () {
        var e, t;
        return function (i, n) {
          e = e || n.querySelector('.channel-panel');
          clearTimeout(t);
          var a = 'mouseenter' === i.type;
          if (a) e.style.display = 'block';
          else
            t = setTimeout(
              function () {
                e.style.display = 'none';
              }._$bind(this),
              300,
            );
        };
      })();
      var t = document.querySelector('.u-navLogin-course');
      if (t) {
        new o({}).$inject('.u-navLogin-course');
        t.addEventListener('mouseenter', function (i) {
          e(i, t);
        });
        t.addEventListener('mouseleave', function (i) {
          e(i, t);
        });
      }
    };
    y.__handleOnCloseBindPhoneModal = function () {
      c._$cookie(w.BIND_PHONE_MODAL_NOT_SHOWN_COOKIE_NAME, { path: '/', expires: 1e3, value: '1' });
    };
    y.__handleLogin = function (e) {
      if (e) {
        var i = e.innerText;
        if (i != t.KEY_SHARED_DESKTOP_SWITCH_ACCOUNT)
          S._$addEvent(e, 'click', this.__gotoLoginHandle._$bind(this));
        else
          e.href = m.urlPrefix.logoutPrefix + '?returnUrl=' + U._$str2b64(D._$getDecodeCurUrl({}));
      }
    };
    y.__handleCateNavBox = function (e) {};
    y.__handleMultiLineEllipsis = function () {
      var e = 0;
      var t = 0;
      for (var i = 2; i < 5; i++) {
        var n = T._$getByClassName(document.body, 'f-' + i + 'lines');
        if (n.length)
          for (var a = 0; a < n.length; a++) {
            var o = n[a];
            e = parseInt(g(o, 'lineHeight'));
            if ('auto' == g(o, 'height')) {
              o.parentElement.style.height = 'auto';
              t = parseInt(g(o.parentElement, 'height'));
            } else t = parseInt(g(o, 'height'));
            if (t > i * e)
              o.innerText = o.innerText.substr(0, (o.innerText.length * i * e) / t - 1) + '...';
          }
        else;
      }
    };
    y.__handleInfoBox = function (e) {
      if (!window.isCustomThirdPartyVisiting) {
        if (m.cert_owner && e) D._$showNode(T._$getByClassName(e, 'j-cert-card')[0]);
        if (T._$getChildren(e).length) {
          var i = T._$getByClassName(e, 'j-nav-set')[0];
          S._$addEvent(e, 'mouseover', this.__navHandle._$bind(this, !0, i));
          S._$addEvent(e, 'mouseout', this.__navHandle._$bind(this, !1, i));
          if (D._$hasMemberRole(D.CONST.ROLE_OUT_SUPER_ADMIN))
            D._$showNode(T._$getByClassName(i, 'j-partner-man')[0]);
          if (D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_ADMIN))
            D._$showNode(T._$getByClassName(i, 'j-postgrade-man')[0]);
          if (
            D._$hasMemberRole(D.CONST.ROLE_OUT_BUSINESS_EDITOR) ||
            D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_EDITOR) ||
            D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_REVIEWER) ||
            D._$hasMemberRole(D.CONST.ROLE_OUT_ORDINARY_EDITOR)
          ) {
            var n = T._$getByClassName(i, 'j-editor-man')[0];
            var a = T._$getByClassName(n, 'j-editor-txt')[0];
            D._$showNode(n);
            if (D._$hasMemberRole(D.CONST.ROLE_OUT_BUSINESS_EDITOR))
              a.innerText = t.KEY_SHARED_DESKTOP_ROLE_MARKET_EDITOR;
            else if (
              D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_EDITOR) ||
              D._$hasMemberRole(D.CONST.ROLE_OUT_ORDINARY_EDITOR)
            )
              a.innerText = t.KEY_SHARED_DESKTOP_ROLE_COURSE_EDITOR;
            else if (D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_REVIEWER))
              a.innerText = t.KEY_SHARED_DESKTOP_ROLE_COURSE_CHECK;
          }
          if (
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLSUPER_ADMIN) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLNORMAL_ADMIN) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLNORMAL_ADMIN_SELF)
          )
            !(function () {
              var e = T._$getByClassName(i, 'j-school-man')[0];
              D._$showNode(e);
              if (
                /appId=1fe22d51cfc678903b998c16daba2d5c/.test(window.location.search) &&
                e.children[0]
              )
                e.children[0].innerText = t.KEY_SHARED_DESKTOP_ROLE_ORG_MANAGE_BKG;
            })();
          if (D._$hasMemberRole(D.CONST.ROLE_REGION_ADMIN))
            !(function () {
              var e = T._$getByClassName(i, 'j-region-man')[0];
              D._$showNode(e);
            })();
          if (
            D._$hasMemberRole(D.CONST.ROLE_COLUMNIST) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMN_ASSISTANT)
          )
            if (D._$hasMemberRole(D.CONST.ROLE_COLUMNIST));
          if (
            D._$hasMemberRole(D.CONST.ROLE_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_ASSISTANT) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMNIST) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMN_ASSISTANT)
          )
            D._$showNode(T._$getByClassName(i, 'j-teacher-man')[0]);
          if (
            D._$hasMemberRole(D.CONST.ROLE_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR)
          ) {
            m.showTeachLink = !0;
            D._$showNode(T._$getByClassName(i, 'j-teacher-main')[0]);
          }
          if (D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR));
          if (D._$hasMemberRole(D.CONST.ROLE_BSITE_ADMIN))
            D._$showNode(T._$getByClassName(i, 'j-bsite')[0]);
          if (
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMNIST)
          )
            D._$showNode(T._$getByClassName(i, 'j-order-service')[0]);
          if (m.webUser.roles && m.webUser.roles.indexOf('lector') == -1)
            this.__commonCache._$hasOfflineClassroom(
              function (e) {
                if (e) D._$showNode(T._$getByClassName(i, 'j-offline-nonteacher-entry')[0]);
              }._$bind(this),
            );
        }
      }
    };
    y.__injectReactMoocHeader = function () {
      var e = 'MainHeader';
      var t = document.getElementById('web-nav-container');
      var i = window.termDto && 30 == window.termDto.mode;
      var n = location.href.includes('/learn');
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch || window.moocTempReplace1;
      if (window.renderReactComponent && window.renderReactComponent[e] && t) {
        var a = window.renderReactComponent[e];
        window.renderReactComponent.render(a.component, a.initialState, t);
      } else if (t) {
        var o = (window.courseDto && window.courseDto.schoolPanel) || {};
        window.reactComponentLoadBootstrap.init(
          { name: e, container: t },
          {
            isRooc: i,
            webUser: window.webUser || {},
            schoolDto: window.schoolDto || o || {},
            fullWidth: n,
          },
        );
      }
    };
    y.__injectRightBottomAiMoocEntry = function () {
      var e = 'RightBottomAiMoocEntry';
      var t = document.querySelector('#j-reactInjectAiMoocEntry');
      if (t) {
        String.prototype.replace = window.moocTempReplace;
        String.prototype.match = window.moocTempMatch || window.moocTempReplace1;
        window.reactComponentLoadBootstrap.setFtlData({ nowPageUrl: window.location.href });
        if (window.renderReactComponent && window.renderReactComponent[e]) {
          var i = window.renderReactComponent[e];
          i.render(i.component, i.initialState, t);
        } else
          window.reactComponentLoadBootstrap.init(
            { name: e, container: t },
            {},
            {
              loadSuccessCb: function () {
                this.__injectRightBottomAiMoocEntry();
              }._$bind(this),
            },
          );
      }
    };
    y.__initWXJSShare = function (e) {
      if (e)
        if (window.wx)
          window.wx.config({
            debug: !1,
            appId: 'wx72345eb11caa176e',
            timestamp: e.timestamp,
            nonceStr: e.nonceStr,
            signature: e.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            openTagList: ['wx-open-launch-app'],
          });
    };
    y.__initRecruit = function () {
      this.__recruitBtn = T._$get('j-recruitBtn');
      if (this.__recruitBtn)
        S._$addEvent(
          this.__recruitBtn,
          'click',
          function () {
            D._$$RecruitDialog._$showDialog({});
          }._$bind(this),
        );
    };
    y.__topLinkHandler = function () {
      this.__cloudClassLink = T._$get('j-goCloudClass');
      this.__cloudClassLink1 = T._$get('j-goCloudClass1');
      this.__goIcourse = T._$get('j-goIcourse');
      this.__goIcourse1 = T._$get('j-goIcourse1');
      this.__youdaoKaoyan = T._$get('navYDKaoyan');
      S._$addEvent(
        this.__cloudClassLink,
        'click',
        function () {
          D._$trackEvent('cloudlink', 'click', 'right');
        }._$bind(this),
      );
      S._$addEvent(
        this.__cloudClassLink1,
        'click',
        function () {
          D._$trackEvent('cloudlink', 'click', 'left');
        }._$bind(this),
      );
      S._$addEvent(
        this.__goIcourse,
        'click',
        function () {
          D._$trackEvent('icourselink', 'click', 'right');
        }._$bind(this),
      );
      S._$addEvent(
        this.__goIcourse1,
        'click',
        function () {
          D._$trackEvent('icourselink', 'click', 'left');
        }._$bind(this),
      );
      S._$addEvent(
        this.__youdaoKaoyan,
        'click',
        function () {
          window.DATracker &&
            window.DATracker.track('主导航-升学考研点击-iaw', {
              user_id: window.webUser ? window.webUser.id : '',
              pagename: 'kaoyan',
            });
        }._$bind(this),
      );
    };
    y.__dealWithPersonLink = function () {
      if (this.__uhref)
        U._$forEach(this.__uhref, function (e) {
          e.href = U._$escape(D._$getMyCenterURL());
        });
    };
    y.__onMessage = function (e) {
      var t = (e || O).data || O;
      switch (t.action) {
        case 'updatedInfo':
          this.__updateInfo(t.infoData);
          this.__dealWithPersonLink();
      }
    };
    y.__updateInfo = function (e) {
      if (e && m.webUser) {
        if (e.nickName) m.webUser.nickName = e.nickName;
        if (e.smallFaceUrl) m.webUser.smallFaceUrl = e.smallFaceUrl;
        if (e.largeFaceUrl) m.webUser.largeFaceUrl = e.largeFaceUrl;
        if (e.personalUrlSuffix) m.webUser.personalUrlSuffix = e.personalUrlSuffix;
        if (this.__imgTag && m.webUser.smallFaceUrl) this.__imgTag.src = m.webUser.smallFaceUrl;
      }
    };
    y.__gotoLoginHandle = function () {
      if (D._$isWap())
        window.location.href =
          m.moocHref +
          m.urlPrefix.loginPrefix +
          '?returnUrl=' +
          U._$str2b64(D._$getDecodeCurUrl({}));
      else {
        var e = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (e && 'www.icourse163.cn' === location.hostname) {
          var t = '/' == location.pathname ? 'https://www.icourse163.org' : location.href;
          location.href = 'https://www.icourse163.org/member/login.htm?returnUrl=' + p._$str2b64(t);
          return;
        }
        if ('/member/login.htm' === location.pathname)
          D._$$LoginDialog._$showLogin({ from: 'navi' });
        var i = /icourse163\.org\/course/g;
        var n = /chrome\/([\d\.]+)/g;
        if (
          'http:' === location.protocol &&
          i.test(location.href) &&
          n.test(navigator.userAgent.toLowerCase())
        ) {
          var a = '/member/login.htm?returnUrl=' + p._$str2b64(location.href);
          location.href = a;
          return;
        }
        D._$$LoginDialog._$showLogin({ from: 'navi' });
      }
    };
    y.__navHandle = function (e, t, i) {
      S._$stop(i);
      if (e) {
        if (this.__timer) this.__timer = clearTimeout(this.__timer);
        D._$showNode(t);
      } else
        this.__timer = m.setTimeout(
          function () {
            D._$hiddenNode(t);
          }._$bind(this),
          200,
        );
    };
    y.__setEduEditorOpt = function () {
      m.eduEditor_options = U._$merge(m.eduEditor_options || {}, {
        showLoadingFn: D.showLoading,
        hideLoadingFn: D.hideLoading,
        autoHeightEnabled: !0,
      });
    };
    y.__onHide = function () {
      if (this.__scrollTop) this.__scrollTop = D._$$ScrollTop2._$recycle(this.__scrollTop);
      $.__onHide.apply(this, arguments);
    };
    if (m.dispatcher) m.dispatcher._$loaded(D.umi('commonutil'), v._$$CommonUtil);
    return v._$$CommonUtil;
  },
  '3849f5eb84c389c7316cc900fb9cda78',
  'ff86782b505dd009231ed4954ea018f5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'c30079064832c51159d1cf37ab222277',
  'd414623f7407e577cd6c05efff08e96f',
  'a780ef675686a51d7f3ecd22b899b1e4',
  '709a1ca4461db8be476800647eb950cf',
  '93828627ddb358ed890cb65967a0c1de',
  'c1a44a564863a56b7daf00b04a3f7c26',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '163e8fd26158a329dc0b2d60ce4fd6b8',
  '272af5852d94b7b40065909c2e324537',
  'b0fe8868b75bec6e96e9133ab916d817',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'cc26d5920093e9742f0feca3855e8e68',
  'fb80274a93905bc7807baceaedc07c15',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '02c14b544f21e379de73ba82b326d2a9',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '682eb3959b27312ff66688573dd64e00',
  '678f74e81cf8355bfe95ad6575235cfc',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'fd2d304e0f3ed379c890a0e85b358838',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'de71aaa4f77ef1f13ed8ee8014eef1b1',
  '493607ab361630ca82fc5bf094051616',
  'bf8d09e46d2369efd6e41b29fe211330',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'fe86216ed59e3103a56c42c850d389f0',
  '1b284280ad407af1a8993da91f6d7952',
  '8d118aed500eb8c7b91ad835708628c5',
);
//# sourceMappingURL=./s/tp_shared_desktop_modules_commonutil_commonutil.js.map
