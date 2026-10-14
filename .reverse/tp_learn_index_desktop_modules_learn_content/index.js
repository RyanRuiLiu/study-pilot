EDU('ef64b877c64ed4138d4b703989241671', function () {
  var e = {};
  e['LIVE_NORMAL_MODE'] = 0;
  e['LIVE_CDN_MODE'] = 1;
  if (!window.useOldLiveConstant) {
    e['LIVE_STATUS_NOTSTART'] = 35;
    e['LIVE_STATUS_PLAYING'] = 0;
    e['LIVE_STATUS_END'] = 10;
    e['LIVE_STATUS_TRANSFORM_COMPLETE'] = 15;
    e['LIVE_STATUS_COMING'] = 20;
    e['LIVE_STATUS_DELAY_START'] = 25;
    e['LIVE_STATUS_INVALID'] = 30;
    e['LIVE_STATUS_LOADING'] = 999;
  } else {
    e['LIVE_STATUS_NOTSTART'] = 0;
    e['LIVE_STATUS_PLAYING'] = 1;
    e['LIVE_STATUS_END'] = 2;
    e['LIVE_STATUS_TRANSFORM_COMPLETE'] = 3;
    e['LIVE_STATUS_COMING'] = 4;
    e['LIVE_STATUS_DELAY_START'] = 5;
    e['LIVE_STATUS_INVALID'] = 6;
    e['LIVE_STATUS_LOADING'] = 999;
  }
  e['CUSTOM_LIVE'] = 1;
  e['INTERACTIVE_LIVE'] = 2;
  e['CLOUD_SIMPLE_LIVE'] = 10;
  e['CLOUD_PRETTY_LIVE'] = 11;
  e['OUT_LIVE'] = 13;
  return e;
});
EDU(
  '39253eba71912d1492d6af7035e30738',
  function (e, t) {
    t._$getRecommend = function (t, n) {
      t.targetTypes = JSON.stringify(t.targetTypes);
      e._$request({
        url: '/web/j/recommendRPCBean.getRecommend.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$contentFeedback = function (t, n) {
      e._$request({
        url: '/web/j/mocPromoFeedbackBean.contentFeedback.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
EDU(
  '023f6ad1232c688c37f05d531ca475da',
  '<div class="um-recommend-feedback-box">\n<div class="title">内容反馈及投诉</div>\n<div class="content">\n{#list optionList as option}\n<div class="feedbackOption" on-click={this.sendFeedback(option)}>{option.text}</div>\n{/list}\n</div>\n</div>',
);
EDU(
  '0caa45293ff72fb6f03781c0fb270351',
  function (e, t, n, i, o, a, s) {
    var r = e.$extends({
      name: 'um-recommend-feedback-box',
      data: { course: null, cb: function () {} },
      config: function () {
        this.supr();
        t.extend(this.data, {});
      },
      init: function () {
        this.supr();
      },
      openModal: function (e, t) {
        this.data.course = e;
        var n = this;
        this._modalUI && this._modalUI.destroy();
        this._modalUI = new i({
          data: {
            class: 'um-recommend-feedback-box-modal',
            okButton: !1,
            cancelButton: !1,
            content: a,
            title: '',
            type: null,
            optionList: [
              { value: 1, text: '不感兴趣' },
              { value: 2, text: '重复推荐过很多次' },
              { value: 3, text: '造成学习干扰' },
            ],
          },
          sendFeedback: function (e) {
            n.sendFeedback(e);
            t && t();
          },
        });
      },
      closeModal: function () {
        this._modalUI && this._modalUI.destroy();
      },
      sendFeedback: function (e, t) {
        s._$contentFeedback(
          {
            mocPromoFeedbackDto: JSON.stringify({
              positionType: 1,
              positionId: 6,
              fdType: e && e.value,
              contentId: this.data.course && (this.data.course.id || this.data.course.courseId),
              contentType: this.data.course && this.data.course.type,
            }),
          },
          function () {}._$bind(this),
        );
        this.closeModal();
      },
      destroy: function () {
        this.supr();
        this._modalUI && this._modalUI.destroy();
      },
    });
    return r;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  'd414623f7407e577cd6c05efff08e96f',
  '93828627ddb358ed890cb65967a0c1de',
  '023f6ad1232c688c37f05d531ca475da',
  '39253eba71912d1492d6af7035e30738',
);
EDU(
  '0236077441893c507217f02d62f60370',
  '.um-recommend-feedback-box-modal .ux-modal_dialog {\n  padding: 16px;\n  width: 380px;\n  min-width: 0;\n  border-radius: 12px; }\n\n.um-recommend-feedback-box-modal .ux-modal_content {\n  width: 100%;\n  margin-left: 0; }\n\n.um-recommend-feedback-box-modal .ux-modal_icon {\n  display: none; }\n\n.um-recommend-feedback-box-modal .ux-modal_content_content {\n  position: relative; }\n  .um-recommend-feedback-box-modal .ux-modal_content_content .f-dib {\n    display: block; }\n\n.um-recommend-feedback-box-modal .ux-modal_bd,\n.um-recommend-feedback-box-modal .ux-modal_hd {\n  padding: 0; }\n\n.um-recommend-feedback-box-modal .ux-modal_content_ft {\n  margin: 0; }\n\n.um-recommend-feedback-box-modal .um-recommend-feedback-box {\n  width: 100%;\n  padding: 0 16px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: relative; }\n  .um-recommend-feedback-box-modal .um-recommend-feedback-box .title {\n    font-size: 18px;\n    font-weight: 600;\n    color: #333333;\n    margin-bottom: 24px; }\n  .um-recommend-feedback-box-modal .um-recommend-feedback-box .content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n    .um-recommend-feedback-box-modal .um-recommend-feedback-box .content .feedbackOption {\n      -webkit-box-flex: 0;\n          -ms-flex: 0 0 45%;\n              flex: 0 0 45%;\n      background-color: #0000000A;\n      border-radius: 18px;\n      padding: 8px 0;\n      text-align: center;\n      font-size: 14px;\n      margin: 0 6px;\n      margin-bottom: 12px;\n      cursor: pointer;\n      -webkit-user-select: none; }\n      .um-recommend-feedback-box-modal .um-recommend-feedback-box .content .feedbackOption:hover {\n        -webkit-transition: all 0.2s ease;\n        transition: all 0.2s ease;\n        background-color: #00CC7E1A;\n        color: #00CC7E; }\n',
);
EDU(
  'fc9b6f8caf107e0df9648422060c8ddf',
  function (e, t) {
    var n = e.$extends({
      name: 'um-recommend-feedback-box',
      css: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return n;
  },
  '0caa45293ff72fb6f03781c0fb270351',
  '0236077441893c507217f02d62f60370',
);
EDU(
  '5884d28f94b9d858d9c5ca557e9e831a',
  function (e, t, n, i, o, a, s, r) {
    var c = window;
    var d = '';
    var l = new r();
    Component = e
      .$extends({
        name: 'um-recommend-list',
        data: {},
        config: function () {
          this.supr();
          t.extend(this.data, {
            list: [],
            recommendOpt: {},
            title: '',
            showToggle: !1,
            isOpen: !0,
            isCardBig: !1,
            key: '',
            logOpt: null,
          });
          if (this.data.showToggle) this.data.isOpen = this.getToggleFromStorage();
        },
        computed: {
          showRecommendFeedbackBtn: function () {
            return !!window.webUser;
          },
        },
        init: function () {
          this.supr();
          if ('web_course_learn_recommend_click' === this.data.logOpt.data_action)
            d = '慕课学习页-推荐成人课程';
          else d = '慕课介绍页-推荐成人课程';
          if (!this.data.list || !this.data.list.length) this.getRecommend();
          else this._formatList(this.data.list);
        },
        isTopic: function (e) {
          return e && e.recommendType && e.recommendType == i.RECOMMENDATION_TYPE.TOPIC;
        },
        isColumn: function (e) {
          return e && e.recommendType && e.recommendType == i.RECOMMENDATION_TYPE.COLUMN;
        },
        goToContent: function (e) {
          if (e.infoUrl) {
            this._addLog(e);
            var t = e.infoUrl.indexOf('?') > -1 ? '&' : '?';
            var n = this.data.outVendor
              ? 'outVendor=' + this.data.outVendor
              : 'outVendor=zw_mooc_pcundefined';
            if (100 === e.recommendType && this.data.adultOutVendor) {
              n = 'outVendor=' + this.data.adultOutVendor;
              DATracker.track(d + '点击-iaw', {
                pagename: 'home',
                user_id: window.webUser ? window.webUser.id : '',
                course_id: e.courseId,
                tab_name: window.trackData ? window.trackData.tabName : '',
              });
            }
            window.open(e.infoUrl + t + n);
          } else console.warn('当前内容跳转地址有误');
        },
        _addLog: function (e) {
          if (this.data.logOpt && this.data.logOpt.eventId) {
            var t = {
              user_id: !!window.webUser && window.webUser.id,
              data_pagename: c.location.href,
            };
            t = n._$merge(t, this.data.logOpt);
            t = n._$merge(t, JSON.parse(e.logData));
            DATracker.track(t.eventId, t);
          } else console.log('请传入正确的打点事件名称');
        },
        getRecommend: function () {
          o._$getRecommend(this.data.recommendOpt, this._recommendLoad._$bind(this));
        },
        handleFeedbackBox: function (e, t, n, i) {
          console.log(t);
          e && e.stopPropagation && e.stopPropagation();
          t
            ? l.openModal(
                n,
                function () {
                  var e = [],
                    t = [];
                  for (var n = 0; n < this.data.list.length; n++)
                    if (n != i) {
                      e.push(this.data.list[n]);
                      t.push(this.data.originList[n]);
                    }
                  this.data.list = e;
                  this.data.originList = t;
                  this.$update();
                }._$bind(this),
              )
            : l.closeModal();
        },
        _recommendLoad: function (e) {
          e = e || [];
          this._formatList(e);
        },
        _formatList: function (e) {
          this.data.originList = e;
          this.data.list = a._$formatRecommendCard(e);
          for (var t = 0; t < this.data.list.length; t++) {
            var n = this.data.list[t];
            if (100 === n.recommendType)
              DATracker.track(d + '展示-iaw', {
                pagename: 'home',
                user_id: window.webUser ? window.webUser.id : '',
                course_id: n.courseId,
                tab_name: window.trackData ? window.trackData.tabName : '',
              });
          }
          this.$update();
        },
        toggle: function () {
          this.data.isOpen = !this.data.isOpen;
          if (this.data.showToggle) this.saveToggleToStorage();
          this.$update();
        },
        saveToggleToStorage: function () {
          var e = this._getToggleKey();
          try {
            localStorage.setItem(e, this.data.isOpen);
          } catch (t) {
            console.warn('browser not support localStorage');
          }
        },
        getToggleFromStorage: function () {
          var e = this._getToggleKey();
          try {
            var t = 'false' == localStorage.getItem(e);
            return t ? !1 : !0;
          } catch (n) {
            console.warn('browser not support localStorage');
            return !0;
          }
        },
        _getToggleKey: function () {
          return this.data.key ? 'RECOMMEND_TOGGLE_' + this.data.key : 'RECOMMEND_TOGGLE';
        },
        destroy: function () {
          this.supr();
        },
      })
      .filter({
        scaleImg: function (e) {
          if (this.data.isCardBig) return s._$scaleImage(e, 180, 104);
          else return s._$scaleImage(e, 102, 76);
        },
      });
    return Component;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  '93828627ddb358ed890cb65967a0c1de',
  '39253eba71912d1492d6af7035e30738',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'ea321df1a66d5a1d11c5df37a56589c4',
  'fc9b6f8caf107e0df9648422060c8ddf',
);
EDU(
  '188ce9e691d65335efaeff1ab170374e',
  '{#if list && list.length}\n<div class="um-recommend {class}" r-class={{\'z-unfold\':!isOpen}}>\n<div class="um-recommend_hd f-pr">\n{#if title}\n<h3 class="um-recommend_hd_tlt">{title}</h3>\n{/if}\n{#if showToggle}\n<a class="um-recommend_hd_toggle" on-click={this.toggle()}>\n{#if isOpen}\n收起\n{#else}\n展开\n{/if}\n<span class="um-recommend_hd_icon"\nr-class={{\'ux-icon-caret-up\':isOpen,\'ux-icon-caret-down\':!isOpen}}></span>\n</a>\n{/if}\n</div>\n<div class="um-recommend-list f-cb" r-class={{\'f-dn\':!isOpen}}>\n{#list list as item}\n{#if this.isTopic(item)}\n<div class="um-recommend-list_item topic f-fl" r-class={{\'card-big\':isCardBig, \'card-small\' :!isCardBig}}\non-click={this.goToContent(item)}>\n<img src={item.imgUrl} />\n{#if showRecommendFeedbackBtn}\n<div class="um-recommend-list_item_feedback_btn"\non-click={this.handleFeedbackBox($event,true,originList[item_index],item_index)}>\n<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">\n<g clip-path="url(#clip0_111_638)">\n<path\nd="M3.00002 6.66666C2.26669 6.66666 1.66669 7.26666 1.66669 7.99999C1.66669 8.73332 2.26669 9.33332 3.00002 9.33332C3.73335 9.33332 4.33335 8.73332 4.33335 7.99999C4.33335 7.26666 3.73335 6.66666 3.00002 6.66666Z"\nfill="black" fill-opacity="0.45"></path>\n<path\nd="M8.00002 6.66666C7.26669 6.66666 6.66669 7.26666 6.66669 7.99999C6.66669 8.73332 7.26669 9.33332 8.00002 9.33332C8.73335 9.33332 9.33335 8.73332 9.33335 7.99999C9.33335 7.26666 8.73335 6.66666 8.00002 6.66666Z"\nfill="black" fill-opacity="0.45"></path>\n<path\nd="M13 6.66666C12.2667 6.66666 11.6667 7.26666 11.6667 7.99999C11.6667 8.73332 12.2667 9.33332 13 9.33332C13.7334 9.33332 14.3334 8.73332 14.3334 7.99999C14.3334 7.26666 13.7334 6.66666 13 6.66666Z"\nfill="black" fill-opacity="0.45"></path>\n</g>\n</svg>\n</div>\n{/if}\n</div>\n{#else}\n<div class="um-recommend-list_item kaoyan f-fl f-cb f-pr" r-class={{\'card-big\':isCardBig, \'card-small\'\n:!isCardBig}} on-click={this.goToContent(item)}>\n<img class="um-recommend-list_item_img f-fl" src={item.imgUrl|scaleImg} />\n{#if this.isColumn(item)}\n<span class="um-recommend-list_item_tag f-pa">{item.recommendTypeText}</span>\n{/if}\n<div class="um-recommend-list_item_wrap f-fl">\n<h4 class="um-recommend-list_item_name" title={item.name}>{item.name}</h4>\n<div class="um-recommend-list_item_school_info">\n{#if item.teacherName}\n<h4 class="um-recommend-list_item_teacher f-ib">{item.teacherName}</h4>\n{/if}\n</div>\n{#if item.heat }\n<div class="um-recommend-list_item_heat f-pa">\n<img width="16"\nsrc="http://mooc-image.nosdn.127.net/f71f3b17b935456a89f8c6e4201eeca9.png?imageView&quality=100" />\n<span class="heat">{item.heat}</span>\n</div>\n{#elseif item.orderedCount}\n<div class="um-recommend-list_item_count f-pa">\n<span class="hot">{item.orderedCount}人参加</span>\n</div>\n{/if}\n</div>\n{#if showRecommendFeedbackBtn}\n<div class="um-recommend-list_item_feedback_btn"\non-click={this.handleFeedbackBox($event,true,originList[item_index],item_index)}>\n<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">\n<g clip-path="url(#clip0_111_638)">\n<path\nd="M3.00002 6.66666C2.26669 6.66666 1.66669 7.26666 1.66669 7.99999C1.66669 8.73332 2.26669 9.33332 3.00002 9.33332C3.73335 9.33332 4.33335 8.73332 4.33335 7.99999C4.33335 7.26666 3.73335 6.66666 3.00002 6.66666Z"\nfill="black" fill-opacity="0.45"></path>\n<path\nd="M8.00002 6.66666C7.26669 6.66666 6.66669 7.26666 6.66669 7.99999C6.66669 8.73332 7.26669 9.33332 8.00002 9.33332C8.73335 9.33332 9.33335 8.73332 9.33335 7.99999C9.33335 7.26666 8.73335 6.66666 8.00002 6.66666Z"\nfill="black" fill-opacity="0.45"></path>\n<path\nd="M13 6.66666C12.2667 6.66666 11.6667 7.26666 11.6667 7.99999C11.6667 8.73332 12.2667 9.33332 13 9.33332C13.7334 9.33332 14.3334 8.73332 14.3334 7.99999C14.3334 7.26666 13.7334 6.66666 13 6.66666Z"\nfill="black" fill-opacity="0.45"></path>\n</g>\n</svg>\n</div>\n{/if}\n</div>\n{/if}\n{/list}\n</div>\n</div>\n{/if}',
);
EDU(
  '8d55ca9f1d73879fdbef5e2d30797f6e',
  '.um-recommend_hd {\n  font-size: 18px; }\n  .um-recommend_hd_tlt {\n    font-size: 18px;\n    color: #333;\n    height: 24px;\n    line-height: 24px;\n    margin-bottom: 20px; }\n\n.um-recommend-list_item {\n  position: relative;\n  cursor: pointer;\n  height: 76px;\n  margin-bottom: 20px;\n  width: 100%; }\n  .um-recommend-list_item_img {\n    cursor: pointer;\n    width: 102px;\n    height: 76px; }\n  .um-recommend-list_item_wrap {\n    cursor: pointer;\n    height: 100%;\n    margin-left: 15px; }\n  .um-recommend-list_item_name {\n    color: #333;\n    font-size: 13px;\n    max-height: 34px;\n    line-height: 17px;\n    white-space: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical; }\n  .um-recommend-list_item_school_info {\n    line-height: 16px; }\n  .um-recommend-list_item_teacher {\n    font-size: 12px;\n    color: #999;\n    margin-top: 4px; }\n  .um-recommend-list_item_count {\n    bottom: 0;\n    margin-top: 11px;\n    font-size: 12px;\n    line-height: 14px;\n    color: #999; }\n  .um-recommend-list_item_school {\n    max-width: 145px; }\n  .um-recommend-list_item_tag {\n    display: inline-block;\n    position: absolute;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    left: 0;\n    top: 5px;\n    width: 38px;\n    height: 15px;\n    line-height: 15px;\n    padding-left: 7px;\n    background: #e5ac4f;\n    border-radius: 0px 75px 75px 0px;\n    font-size: 11px;\n    color: #fff; }\n  .um-recommend-list_item_feedback_btn {\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    cursor: pointer; }\n\n.um-recommend-list_item.topic {\n  height: auto;\n  max-height: 80px;\n  margin-bottom: 30px; }\n  .um-recommend-list_item.topic img {\n    max-width: 90%;\n    max-height: 80px; }\n\n.um-recommend-list_item.card-big {\n  cursor: pointer;\n  height: 104px;\n  margin-bottom: 30px;\n  width: 380px; }\n  .um-recommend-list_item.card-big .um-recommend-list_item_img {\n    width: 180px;\n    height: 104px; }\n  .um-recommend-list_item.card-big .um-recommend-list_item_wrap {\n    width: 188px;\n    height: 100%;\n    margin-left: 12px; }\n  .um-recommend-list_item.card-big .um-recommend-list_item_name {\n    font-weight: 600;\n    color: #333;\n    font-size: 14px;\n    max-height: 42px;\n    line-height: 19px;\n    white-space: normal;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical; }\n  .um-recommend-list_item.card-big .um-recommend-list_item_school_info {\n    line-height: 17px;\n    margin-top: 10px; }\n  .um-recommend-list_item.card-big .um-recommend-list_item_teacher {\n    font-size: 12px;\n    color: #999; }\n  .um-recommend-list_item.card-big .um-recommend-list_item_count {\n    bottom: 0;\n    margin-top: 11px;\n    font-size: 12px;\n    height: 17px;\n    color: #999; }\n\n.um-recommend-list .um-recommend-list_item.topic.card-big {\n  max-height: 104px; }\n  .um-recommend-list .um-recommend-list_item.topic.card-big img {\n    max-width: 100%;\n    max-height: 104px; }\n\n.um-recommend-list .um-recommend-list_item_heat {\n  bottom: 0; }\n  .um-recommend-list .um-recommend-list_item_heat .heat {\n    color: #ff6b47;\n    font-size: 16px;\n    line-height: 16px;\n    font-family: DIN; }\n',
);
EDU(
  'ebe210c8c771158d609dfded929fb0ed',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'um-recommend-list',
      template: t,
      css: n,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '5884d28f94b9d858d9c5ca557e9e831a',
  '188ce9e691d65335efaeff1ab170374e',
  '8d55ca9f1d73879fdbef5e2d30797f6e',
);
EDU(
  'efe50979c5575c995dcae42ffc49d80a',
  function (e, t) {
    Component = t.$extends({
      name: 'um-recommend-bottom',
      data: {},
      config: function () {
        e.extend(this.data, { class: 'um-recommend-bottom', isCardBig: !0 });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    return Component;
  },
  '217dcfc103efb36d2f192eecc4548797',
  'ebe210c8c771158d609dfded929fb0ed',
);
EDU(
  '43ca3a6e5c0d4e451a1e94128b6aff00',
  '.um-recommend-bottom {\n  width: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 32px 32px 0 32px;\n  background: #fff;\n  border: 1px solid #f5f5f5;\n  border-radius: 8px; }\n  .um-recommend-bottom .um-recommend_hd {\n    font-size: 18px; }\n    .um-recommend-bottom .um-recommend_hd .um-recommend_hd_toggle {\n      position: absolute;\n      right: 0;\n      top: 0;\n      color: #00CC7E; }\n    .um-recommend-bottom .um-recommend_hd .um-recommend_hd_icon {\n      padding-right: 8px;\n      vertical-align: text-top; }\n\n.z-unfold.um-recommend-bottom {\n  padding: 13px 40px; }\n  .z-unfold.um-recommend-bottom .um-recommend_hd .um-recommend_hd_tlt {\n    font-weight: 600;\n    margin-bottom: 0; }\n\n.um-recommend-bottom .um-recommend-list {\n  margin-left: -50px; }\n  .um-recommend-bottom .um-recommend-list .um-recommend-list_item {\n    margin-left: 50px; }\n',
);
EDU(
  '3b4b0bfe96b6f18b5667d392a02a8f9d',
  function (e, t, n) {
    n = e.$extends({
      name: 'um-recommend-bottom',
      css: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return n;
  },
  'efe50979c5575c995dcae42ffc49d80a',
  '43ca3a6e5c0d4e451a1e94128b6aff00',
);
EDU(
  '5b1a46f551ade5cafa27284058ba7da2',
  function (e, t) {
    Component = e.$extends({
      name: 'um-recommend-side',
      data: {},
      config: function () {
        this.supr();
        t.extend(this.data, { class: 'um-recommend-side' });
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    return Component;
  },
  'ebe210c8c771158d609dfded929fb0ed',
  '217dcfc103efb36d2f192eecc4548797',
);
EDU(
  'd87ba35ddeb76d66f2d96b19b755fea3',
  '.um-recommend-side {\n  width: 300px;\n  padding: 20px 0 0 20px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #fff;\n  border-radius: 8px;\n  overflow-y: auto; }\n  .um-recommend-side .um-recommend_hd_tlt {\n    font-weight: 600;\n    padding-left: 0;\n    border-left: none; }\n  .um-recommend-side .um-recommend-list_item {\n    width: 260px;\n    height: auto;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    .um-recommend-side .um-recommend-list_item .um-recommend-list_item_wrap {\n      margin-left: 0;\n      max-width: 148px; }\n    .um-recommend-side .um-recommend-list_item .um-recommend-list_item_img {\n      width: 96px;\n      height: 64px;\n      border-radius: 8px;\n      margin-right: 16px; }\n    .um-recommend-side .um-recommend-list_item .um-recommend-list_item_name {\n      font-weight: 600;\n      -webkit-line-clamp: 1;\n      color: #333333;\n      font-size: 14px;\n      height: 20px;\n      line-height: 20px; }\n    .um-recommend-side .um-recommend-list_item .um-recommend-list_item_teacher {\n      color: #666666;\n      font-size: 12px;\n      line-height: 18px;\n      height: 18px; }\n    .um-recommend-side .um-recommend-list_item .um-recommend-list_item_count {\n      color: #999999;\n      font-size: 12px;\n      line-height: 18px;\n      height: 18px; }\n      .um-recommend-side .um-recommend-list_item .um-recommend-list_item_count .u-icon-person {\n        display: none; }\n  .um-recommend-side .um-recommend-list_item {\n    margin-bottom: 20px; }\n  .um-recommend-side .um-recommend-list_item.topic img {\n    border-radius: 8px; }\n',
);
EDU(
  '4506823daf61ad0e7db0db8ecc157b4c',
  function (e, t, n) {
    n = e.$extends({
      name: 'um-recommend-side',
      css: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return n;
  },
  '5b1a46f551ade5cafa27284058ba7da2',
  'd87ba35ddeb76d66f2d96b19b755fea3',
);
EDU(
  '8e2e477f7b9e6e134cfe14f830c66a52',
  function (e, t) {
    var n = NEJ.O,
      i = NEJ.P('nej.j'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.d'),
      s = o._$randNumberString(),
      r,
      c = 'ck-CourseCtCache';
    var d;
    a._$$COM_Cache_CourseCtCache = NEJ.C();
    r = a._$$COM_Cache_CourseCtCache._$extend(a._$$COM_Cache);
    r._$getChapterListWithLearned = function (e) {
      d = e;
      var t = 'MOOC_LEARN_CHAPTER_LIST_' + e;
      var n = sessionStorage.getItem(t);
      if (!1);
      else
        this._$postDWR({
          key: c + s,
          url: 'CourseBean.getLastLearnedMocTermDto',
          param: [e],
          onload: this.__onGetChapterListWithLearned._$bind(this),
        });
    };
    r.getLastLearnedMocTermDto = function (e, n) {
      d = e;
      t._$request({
        url: '/web/j/courseBean.getLastLearnedMocTermDto.rpc',
        method: 'POST',
        data: { termId: e },
        onload: function (e) {
          if (e) {
            var t = 'MOOC_LEARN_CHAPTER_LIST_' + d;
            sessionStorage.setItem(t, JSON.stringify(e));
            if (n) n(e);
            else this._$dispatchEvent('onGetChapterList', e);
          }
        }._$bind(this),
      });
    };
    r.__onGetChapterListWithLearned = function (e) {
      if (e) {
        var t = 'MOOC_LEARN_CHAPTER_LIST_' + d;
        sessionStorage.setItem(t, JSON.stringify(e));
        this._$dispatchEvent('onGetChapterList', e);
      }
    };
    r._$getChapterList = function (e, t, n) {
      console.log('33333');
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getMocTermDto',
        param: [e, t, n],
        onload: this.__onGetChapterList._$bind(this),
      });
    };
    r.getMocTermDto = function (e, n, i) {
      t._$request({
        url: '/web/j/courseBean.getMocTermDto.rpc',
        method: 'POST',
        data: { termId: e, isDraft: n, excludeUnrelease: i },
        notShowLoading: !0,
        hideError: !0,
        onload: function (e) {
          this._$dispatchEvent('onGetChapterList', { mocTermDto: e, lastLearnUnitId: null });
        }._$bind(this),
      });
    };
    r.__onGetChapterList = function (e) {
      this._$dispatchEvent('onGetChapterList', { mocTermDto: e, lastLearnUnitId: null });
    };
    r._$getLessonUnitVo = function (e, t, n, i) {
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getLessonUnitLearnVo',
        param: [e, t, n, i],
        onload: this.__onGetLessonUnitVo._$bind(this, i),
      });
    };
    r.__onGetLessonUnitVo = function (t, n) {
      n.unitId = t;
      try {
        if (n.paper && n.paper.objectiveQList)
          n.paper.objectiveQList.forEach(function (t) {
            t.plainTextTitle = e._$formateImagePrefix(t.plainTextTitle);
            t.title = e._$formateImagePrefix(t.title);
            if (t.optionDtos)
              t.optionDtos.forEach(function (t) {
                t.content = e._$formateImagePrefix(t.content);
              });
          });
        if (n.htmlContent) n.htmlContent = e._$formateImagePrefix(n.htmlContent);
        if (n.post) n.post.content = e._$formateImagePrefix(n.post.content);
      } catch (i) {}
      this._$dispatchEvent('onGetLessonUnitVo', n);
    };
    r._$saveLearnInfo = function (e) {
      t._$request({
        url: '/web/j/courseRpcBean.saveMocContentLearn.rpc',
        method: 'POST',
        data: JSON.stringify({ dto: e }),
        notShowLoading: !0,
        hideError: !0,
        isNeedAuth: !0,
      });
    };
    r._$saveMocContentLearn = function (e) {
      t._$request({
        url: '/web/j/courseBean.saveMocContentLearn.rpc',
        method: 'POST',
        data: JSON.stringify({ dto: e }),
        notShowLoading: !0,
        hideError: !0,
        isNeedAuth: !0,
      });
    };
    r._$getMenuItem = function (e, t, n, i) {
      this._$postDWR({
        key: c + s,
        url: 'MocMenuItemBean.getMenuItem',
        param: [e, t, n, i],
        onload: this.__onGetMenuItem._$bind(this),
      });
    };
    r.__onGetMenuItem = function (e) {
      this._$dispatchEvent('onGetMenuItem', e);
    };
    r._$getNewestItems = function (e) {
      this._$postDWR({
        key: c + s,
        url: 'TermBean.getNewestItems',
        param: [e],
        onload: this.__onGetNewestItems._$bind(this),
      });
    };
    r.__onGetNewestItems = function (e) {
      this._$dispatchEvent('onGetNewestItems', e);
    };
    r._$fetchQuestions = function (e) {
      var t = JSON.parse(JSON.stringify(e));
      if (t.videoSegmentInfoDtos) delete t.videoSegmentInfoDtos;
      this._$postDWR({
        key: c + s,
        url: 'MocQuizBean.fetchQuestions',
        param: [t],
        onload: this.__onFetchQuestions._$bind(this),
      });
    };
    r.__onFetchQuestions = function (e) {
      this._$dispatchEvent('onFetchQuestions', e);
    };
    r._$getTermScoreRule = function (e, t) {
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getEvaluationDescription',
        param: [e, t],
        onload: this.__onGetEvaluationDescription._$bind(this),
      });
    };
    r.__onGetEvaluationDescription = function (e) {
      this._$dispatchEvent('onGetEvaluationDescription', e);
    };
    r._$getNextVideo = function (e) {
      this._$postDWR({
        key: c + s,
        url: 'CourseBean.getNextVideo',
        param: [e],
        onload: this.__onGetNextVideo._$bind(this),
      });
    };
    r.__onGetNextVideo = function (e) {
      this._$dispatchEvent('onGetNextVideo', e);
    };
    r._$getZhixuanAdsShowStatus = function (e) {
      t._$request({
        url: '/web/j/zhiXuanAdsBean.judgeZhiXuanAdsShowStatusByTermId.rpc',
        method: 'POST',
        data: { termId: e, positionId: 1, positionType: 1 },
        onload: this.__onGetZhixuanAdsShowStatus._$bind(this),
      });
    };
    r.__onGetZhixuanAdsShowStatus = function (e) {
      this._$dispatchEvent('onGetZhixuanAdsShowStatus', e);
    };
    r._$setIgnoreZhixuanAds = function () {
      t._$request({
        url: '/web/j/zhiXuanAdsBean.showClose.rpc',
        method: 'POST',
        data: { positionId: 1, positionType: 1 },
      });
    };
    r.getLessonUnitAILectureNoteSegmentList = function (e, n, i) {
      t._$request({
        url: '//www.icourse163.org/mm-course/web/j/mocLessonUnitBean.listMocVideoAiSegmentInfoDto.rpc',
        method: 'POST',
        data: e,
        cookie: !0,
        onload: n,
        onerror: i,
      });
    };
    r.getMocPreviewVideoSegmentInfoDto = function (e, n, i) {
      t._$request({
        url: '//www.icourse163.org/web/j/adminTermCertifiedBean.getMocPreviewVideoSegmentInfoDto.rpc',
        method: 'POST',
        data: e,
        cookie: !0,
        onload: n,
        onerror: i,
      });
    };
    r._$listUnitAIStatus = function (e, n, i) {
      t._$request({
        url: '//www.icourse163.org/mm-course/web/j/mocAdminTermCertifiedBean.listUnitAIStatus.rpc',
        method: 'POST',
        data: e,
        cookie: !0,
        onload: n,
        onerror: i,
      });
    };
    return r;
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'e78bb439e23b5c380ffb5b269896d6bf',
  '<div class="wapUnitUI">\n<div id="j-unitImg" class="m-recimg canlick f-pr" ref="unitImg">\n<img class="hdImg" src="{videoVo.videoImgUrl}">\n</div>\n<div class="u-title f-f0">\n<span class="unitName">{title}</span>\n<span class="time">{videoDuration}</span>\n</div>\n<div class="bottom f-f0 f-pf">\n<appCallBanner></appCallBanner>\n</div>\n</div>',
);
EDU(
  '5289c798a728525273713946bf73de90',
  function (e, t, n, i) {
    var o = window,
      a = NEJ.O,
      s = NEJ.F,
      r = NEJ.P('nej.p'),
      c = NEJ.P('nej.e'),
      d = NEJ.P('nej.v'),
      l = NEJ.P('nej.u'),
      _ = NEJ.P('nej.j'),
      u = NEJ.P('edu.d'),
      f = NEJ.P('edu.u'),
      h,
      p;
    window.isVideoPlayerLoaded = 'loaded';
    f._$$VideoPlayer = NEJ.C();
    h = f._$$VideoPlayer._$extend(f._$$UIBase, !0);
    p = f._$$VideoPlayer._$supro;
    h.__initNode = function () {
      this.__supInitNode();
    };
    h.__initEvents = function () {
      this.__player.$on(
        'onAnchorPoint',
        function (e) {
          this._$dispatchEvent('onAnchorPoint', e);
        }._$bind(this),
      );
      this.__player.$on(
        'onPlayEnd',
        function () {
          f._$trackEvent('video', 'complete');
          this._$dispatchEvent('onPlayEnd');
        }._$bind(this),
      );
      this.__player.$on(
        'onSeek',
        function (e) {
          f._$trackEvent('video', 'seek', e);
          this._$dispatchEvent('onSeek', e);
        }._$bind(this),
      );
      this.__player.$on(
        'onPlay',
        function () {
          f._$trackEvent('video', 'play');
          this._$getCurVideoTime(
            function (e) {
              this._$dispatchEvent('onPlay', e);
            }._$bind(this),
          );
        }._$bind(this),
      );
      this.__player.$on(
        'onPauseClick',
        function () {
          this._$dispatchEvent('onPauseClick');
        }._$bind(this),
      );
      this.__player.$on(
        'onPlayerType',
        function (e) {
          this._$dispatchEvent('onPlayerType', e);
        }._$bind(this),
      );
    };
    h.__loadVideo = function () {
      if (this.__videoInfo) this.__player.load(this.__videoInfo);
    };
    h._$getResolutionType = function () {
      return this.__resolutionType;
    };
    h._$stopVideo = function () {
      this.__player.stop();
    };
    h._$pauseVideo = function () {
      this.__player.pause();
    };
    h._$resumeVideo = function () {
      this.__player.resume();
    };
    h._$getCurVideoTime = function (e) {
      return this.__player && this.__player.__playerUI && this.__player.getPosition(e);
    };
    h._$seekAnchorTime = function (e) {
      this.__player.seek(e);
    };
    h._$getState = function (e) {
      this.__player.getState(e);
    };
    h.__html5Support = function () {
      try {
        var e = document.createElement('video');
        var t = !!e.canPlayType && '' != e.canPlayType('video/mp4');
      } catch (n) {
        t = !1;
      }
      return t;
    };
    h.__getVideoConfigFromCookie = function () {
      this.__config = this.__config || {};
      this.__qualityMap = { 1: 'SD', 2: 'HD', 3: 'SHD' };
      this.__config.videoVolume = _._$cookie('videoVolume') || 0.8;
      this.__config.hasVolume = 'true' == (_._$cookie('hasVolume') || 'true');
      this.__config.cdnSwitch = _._$cookie('cdnName') || null;
      this.__config.videoRate = _._$cookie('videoRate') || null;
    };
    h.__dispatcherPlayer = function (e) {
      this.__videoInfo = e.videoInfo;
      this.__isEncrypted = !(!e.videoInfo || !e.videoInfo.isEncrypt);
      this.__notAllowFullScreen = e.notAllowFullScreen;
      this.__parentNode = e.parent;
      this.__getVideoConfigFromCookie();
      this.__useHtm5Player = void 0 === e.useHtml5Player ? !0 : e.useHtml5Player;
      this.__html5 = this.__html5Support();
      var i = { isNewVideoToken: e.isNewVideoToken };
      if (i.isNewVideoToken) {
        i.bizId = e.unitId;
        i.bizType = 1;
        i.contentType = 1;
      } else {
        i.videoId = this.__videoInfo.videoId;
        i.targetId = this.__videoInfo.targetId || this.__videoInfo.termId;
        i.targetType = this.__videoInfo.targetType || n.VIDEO_TARGET.COURSE;
      }
      t._$getVideoToken(
        i,
        function (e) {
          var t = e.signature || (e.videoSignDto && e.videoSignDto.signature);
          if (t) {
            this.__videoInfo.signature = t;
            this.__genPlayer();
            this.__initEvents();
          }
        }._$bind(this),
      );
    };
    h.__genPlayer = function () {
      var t = !1;
      if (this.__videoInfo.signature) {
        var n = {
          start: this.__videoInfo.start,
          videoImgUrl: this.__videoInfo.image,
          isEncrypt: this.__isEncrypted,
          clientEncryptKeyVersion: this.__videoInfo.clientEncryptKeyVersion,
          flvCaption: this.__videoInfo.html5caption,
          cluPointData: this.__videoInfo.cluPointData,
          videoId: this.__videoInfo.videoId,
          signature: this.__videoInfo.signature,
          videoDecryptData: this.__videoInfo.videoDecryptData,
        };
        try {
          t = window.termDto && +window.termDto.price > 0;
        } catch (i) {}
        this.__player = new e({
          data: {
            autoStart: !!this.__videoInfo.autoStart,
            useH5: this.__useHtm5Player,
            showCdnSwitch: !1,
            waterMark: t,
            waterMarkContent: window.webUser ? window.webUser.id : '',
            videoPlayerSwfRemoteUrl: window.swfUrlMap.CloudPlayer,
            videoPlayerUISwfRemotePath: window.swfUrlMap.cloudPlayerUI,
            beforePlay: !1,
            videoData: n,
          },
        }).$inject(this.__parentNode);
      }
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__dispatcherPlayer(e);
    };
    h.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
    h.__recycleUI = function () {
      if (this.__parent) {
        var e = c._$getChildren(this.__parent);
        if (e) for (var t = 0; t < e.length; t++) this.__parent.removeChild(e[t]);
      }
    };
    return f._$$VideoPlayer;
  },
  '4b2a52ea911cc1cabd5156fdc88e88a2',
  '66a53b58eef786f54f6d61c6f2761843',
  '93828627ddb358ed890cb65967a0c1de',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  '342ad7ae4eea50c3cad860686650a915',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'f051aeae7bb889518ead30ef6e491df3',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
EDU(
  '9012b9caf3df83fba126f6b27de5f484',
  '<div class="u-appCallBanner f-cb">\n<img class="imgLogo f-fl" src="//edu-image.nosdn.127.net/02A8BDCF01CC96CA951BA4A71067B799.png?imageView&thumbnail=56y46&quality=100" alt="logo">\n{#if activityNotEnd}\n<div id="bannerFrame" >\n<div id="bannerPlay" class="play">\n<div class="txt f-fl">\n<p class="mooc">{startTimeText}至{endTimeText}</p>\n<p class="desc">下载APP赢kindle</p>\n</div>\n<div class="txt f-fl">\n<p class="mooc">中国大学MOOC</p>\n<p class="desc">海量免费名师名校课程</p>\n</div>\n<div class="txt f-fl">\n<p class="mooc">{startTimeText}至{endTimeText}</p>\n<p class="desc">下载APP赢kindle</p>\n</div>\n<div class="txt f-fl">\n<p class="mooc">中国大学MOOC</p>\n<p class="desc">海量免费名师名校课程</p>\n</div>\n</div>\n</div>\n{#else}\n<div class="txt f-fl">\n<p class="mooc">中国大学MOOC</p>\n<p class="desc">海量免费名师名校课程</p>\n</div>\n{/if}\n<div class="goBtn f-fr" on-click={this.handleOnOpen($event)}>打开APP</div>\n</div>',
);
EDU(
  '59d2c9ad64cda0355517ea4ff7ff6908',
  '@charset "UTF-8";\n/* rem */\n.u-appCallBanner {\n  background: #F5F5F5;\n  width: 100%;\n  height: 1.33333rem;\n  border-top: solid 1px #ddd; }\n  .u-appCallBanner .imgLogo {\n    width: 0.74667rem;\n    height: 0.61333rem;\n    margin-right: 0.4rem;\n    margin-top: 0.36rem;\n    margin-left: 0.4rem; }\n  .u-appCallBanner .mooc {\n    font-size: 15px;\n    color: #666;\n    margin-top: 0.12rem; }\n  .u-appCallBanner .desc {\n    font-size: 12px;\n    color: #999; }\n  .u-appCallBanner .goBtn {\n    background: #00CC7E;\n    border-radius: 0.08rem;\n    margin-right: 0.4rem;\n    margin-top: 0.26667rem;\n    width: 2.66667rem;\n    height: 0.8rem;\n    line-height: 0.8rem;\n    text-align: center;\n    color: #fff;\n    font-size: 14px; }\n\n#bannerFrame {\n  /*----------图片轮播相框容器----------*/\n  position: absolute;\n  /*--绝对定位，方便子元素的定位*/\n  width: 4rem;\n  height: 1.33333rem;\n  overflow: hidden;\n  /*--相框作用，只显示一个图片---*/\n  left: 1.6rem; }\n\n#bannerPlay .txt {\n  float: left;\n  width: 4rem;\n  height: 100%; }\n\n#bannerPlay {\n  /*---设置总的图片宽度--通过位移来达到轮播效果----*/\n  width: 16rem;\n  /*---修改图片数量的话需要修改下面的动画参数*/ }\n\n.play {\n  -webkit-animation: ma 12s ease-out infinite normal;\n          animation: ma 12s ease-out infinite normal;\n  /**/ }\n\n@-webkit-keyframes ma {\n  /*---每图片切换有两个阶段：位移切换和静置。中间的效果可以任意定制----*/\n  0%, 20% {\n    margin-left: 4rem; }\n  20%, 40% {\n    margin-left: 0rem; }\n  40%, 60% {\n    margin-left: -4rem; }\n  60%, 80% {\n    margin-left: -8rem; }\n  80%, 100% {\n    margin-left: -12rem; } }\n\n@keyframes ma {\n  /*---每图片切换有两个阶段：位移切换和静置。中间的效果可以任意定制----*/\n  0%, 20% {\n    margin-left: 4rem; }\n  20%, 40% {\n    margin-left: 0rem; }\n  40%, 60% {\n    margin-left: -4rem; }\n  60%, 80% {\n    margin-left: -8rem; }\n  80%, 100% {\n    margin-left: -12rem; } }\n',
);
EDU(
  '6de20ab3cb8a0113ff59f8fdde6145dd',
  function (e, t, n, i, o, a) {
    var s = window,
      r = NEJ.P('edu.d');
    var c = n.$extends({
      name: 'appCallBanner',
      template: e,
      css: t,
      data: { activityNotEnd: !1 },
      config: function () {},
      init: function () {
        this.__commonCache = new r._$$COM_Cache_commonCache();
      },
      gotoMoocApp: function () {
        a._$callAppDownload('fromCallApp', {
          courseId: s.courseDto && s.courseDto.id,
          termId: s.courseDto && s.termDto.id,
          from: 'learn',
        });
      },
      handleOnOpen: function () {
        var e = setTimeout(
          function () {
            this.gotoMoocApp();
          }._$bind(this),
          2e3,
        );
        this.$emit('open', {
          preventDefault: function () {
            clearTimeout(e);
          },
        });
      },
    });
    return c;
  },
  '9012b9caf3df83fba126f6b27de5f484',
  '59d2c9ad64cda0355517ea4ff7ff6908',
  '235c21779ec98ac90606962a862dadc9',
  '08d2f36062baca2c8eb8327afd74d88c',
  'fb80274a93905bc7807baceaedc07c15',
  '13d9d0a0fedd5c22f2453b15332aedc6',
);
EDU(
  '892e35f71d7ab44fd31b760aa99d9fa9',
  function (e, t, n, i, o, a, s, r, c, d) {
    var l = window,
      _ = NEJ.P('nej.e'),
      u = NEJ.P('edu.u'),
      f = NEJ.P('nej.u'),
      h = NEJ.P('nej.v'),
      p = NEJ.P('edu.d');
    var m = n
      .extend({
        name: 'wapLearnVideoUI',
        template: t,
        config: function () {
          this.supr();
          e.extend(this.data, { bigPhoto: l.termDto.bigPhoto });
        },
        init: function () {
          document.title = this.data.title;
          this.__unitImg = this.$refs.unitImg;
          this.data.videoDuration = s._$formatVideoTime(this.data.videoVo.duration);
          this.showVideo();
          this.$update();
          this.supr();
        },
        showVideo: function () {
          this.__unitImg.innerHTML = '';
          if (this.__video) this.__video.__destroy();
          this.__video = u._$$VideoPlayer._$allocate({
            parent: this.__unitImg,
            videoInfo: NEJ.X(this.data.videoVo, {
              autoStart: !1,
              image: window.termDto.bigPhoto,
              targetId: l.termDto.id,
              targetType: 0,
              videoId: this.data.videoId || this.data.videoVo.videoId,
            }),
          });
        },
        gotoMoocApp: function () {
          r._$callAppDownload('fromCallApp', {
            courseId: l.courseDto.id,
            termId: l.termDto.id,
            from: 'learn',
          });
        },
      })
      .filter({})
      .directive({});
    return m;
  },
  'ca38b7e137b28e4006cbadb343315267',
  'e78bb439e23b5c380ffb5b269896d6bf',
  '6f1453d31194f86271694dd0542354fe',
  '5289c798a728525273713946bf73de90',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '08d2f36062baca2c8eb8327afd74d88c',
  'beec6201069596ecb83a09e5fc3eb415',
  '6de20ab3cb8a0113ff59f8fdde6145dd',
);
EDU('68471111cd34db27f540f48b62615eb2', function () {
  return {
    TERM_PROGRESS_STATUS: {
      UNSTARTED: { UNDETERMINED_START_TIME: 0, DETERMINED_START_TIME: 1 },
      ONGOING: 2,
      ENDED: {
        CLOSED_WITH_CONTENT_VISIBLE_TO_ENROLLED_USERS: 3,
        CLOSED_WITH_CONTENT_VISIBLE_TO_ALL_USERS: 4,
        CLOSED_WITH_CONTENT_INVISIBLE: 5,
      },
    },
    ACTION_TYPE: { ENROLL: 0, VIEW: 1, PAY: 2 },
  };
});
EDU(
  'ab2bbf87ffa27a1f06950bbbc9c81788',
  function (e, t, n, i) {
    var o = 6048e5;
    i.getTermProgressStatus = function (i) {
      var o = t._$getCurServerTime();
      if (i.startTime === e.UNDETERMINDED_STARTTIME)
        return n.TERM_PROGRESS_STATUS.UNSTARTED.UNDETERMINED_START_TIME;
      else if (o < i.startTime) return n.TERM_PROGRESS_STATUS.UNSTARTED.DETERMINED_START_TIME;
      else if (
        o < i.endTime &&
        i.closeVisableStatus !== e.CLOSE_VISABLE_CLOSE &&
        i.closeVisableStatus !== e.CLOSE_VISABLE_HALFOPEN &&
        i.closeVisableStatus !== e.CLOSE_VISABLE_OPEN
      )
        return n.TERM_PROGRESS_STATUS.ONGOING;
      else
        switch (parseInt(i.closeVisableStatus, 10)) {
          case e.CLOSE_VISABLE_CLOSE:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_INVISIBLE;
          case e.CLOSE_VISABLE_HALFOPEN:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ENROLLED_USERS;
          case e.CLOSE_VISABLE_OPEN:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ALL_USERS;
          default:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ALL_USERS;
        }
    };
    i.isUnstarted = function (e) {
      for (var t in n.TERM_PROGRESS_STATUS.UNSTARTED)
        if (
          n.TERM_PROGRESS_STATUS.UNSTARTED.hasOwnProperty(t) &&
          n.TERM_PROGRESS_STATUS.UNSTARTED[t] === e
        )
          return !0;
      return !1;
    };
    i.isEnded = function (e) {
      for (var t in n.TERM_PROGRESS_STATUS.ENDED)
        if (n.TERM_PROGRESS_STATUS.ENDED.hasOwnProperty(t) && n.TERM_PROGRESS_STATUS.ENDED[t] === e)
          return !0;
      return !1;
    };
    i.isOngoing = function (e) {
      return !i.isUnstarted(e) && !i.isEnded(e);
    };
    i.getTermProgressWeek = function (e) {
      var n = t._$getCurServerTime();
      if (n < e.startTime) n = e.startTime;
      var i = {
        currentWeek: Math.ceil((n - e.startTime) / o) || 1,
        totalWeek: Math.ceil((e.endTime - e.startTime) / o),
      };
      return i;
    };
  },
  '93828627ddb358ed890cb65967a0c1de',
  '89a466f05573f560c156411121b8daae',
  '68471111cd34db27f540f48b62615eb2',
);
EDU(
  '72082ce7fa131d8e62eb43521a683cd9',
  function (e, t, n, i, o, a) {
    var s = {};
    var r = window;
    var c = NEJ.P('edu.u');
    s.cannotView = function () {
      var e = t.getTermProgressStatus(r.termDto);
      var i = function () {
        if (t.isEnded(e)) return e == n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_INVISIBLE;
      };
      var o = function () {
        if (t.isEnded(e))
          return e == n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ENROLLED_USERS;
      };
      return i() || (o() && !r.isEnrolled);
    };
    s.interceptUnitClick = function (e, t) {
      e = void 0 !== e ? parseInt(e) : e;
      console.log('ctype', e);
      if (r.isSpoc) {
        if (e === c.CONST.LESSONUNIT_VIDEO) return !1;
        this.__notSupport(void 0, t);
        return !0;
      }
      if (!i._$isLogin()) {
        i._$login();
        return !0;
      }
      if (this.cannotView()) {
        o.alert(window.moocConfig.lang.KEY_LEARN_SORRY_MATERIALS);
        return !0;
      }
      var n = a.isEn()
        ? [
            c.CONST.LESSONUNIT_QUESTION,
            c.CONST.LESSONUNIT_DISCUSS,
            c.CONST.LESSONUNIT_LIVE,
            c.CONST.LESSONUNIT_COLUMN_CONTENT,
          ]
        : [c.CONST.LESSONUNIT_QUESTION];
      if (n.indexOf(e) !== -1 || void 0 === e) {
        this.__notSupport(void 0, t);
        return !0;
      }
      if (e !== c.CONST.LESSONUNIT_VIDEO)
        if (!r.isEnrolled) {
          o.alert(
            window.moocConfig.lang.KEY_LEARN_TAKE_CONTENT,
            '',
            window.moocConfig.lang.KEY_LEARN_UNDERSTOOD,
          );
          return !0;
        }
    };
    s.__notSupport = function (t, n) {
      if (!n)
        if (!a.isEn())
          c._$$CommonDialog._$showDialog({
            title: window.moocConfig.lang.KEY_LEARN_PROMPT,
            message: '请前往中国大学MOOC客户端，完成测验作业考试。',
            modal: 'true',
            okTip: '前往中国大学MOOC',
            customStyle: 'u-callApp-dialog u-hidetitle',
            okFunc: function () {
              e._$getMobToken({}, function (e) {
                if (e)
                  c._$openMobileCoursePageByToken(
                    (r.courseDto || {}).id,
                    (r.termDto || {}).termId,
                    e,
                  );
              });
            },
          });
        else
          c._$$CommonDialog._$showDialog({
            title: '',
            message:
              'Sorry,this type of courseware only supports for web side.Please go to web learn.',
            modal: 'true',
            okTip: 'OK',
            customStyle: 'u-callApp-dialog u-hidetitle',
          });
      else {
        console.log('isRedirctToNewExam', n);
        if (!i._$isLogin()) {
          i._$login();
          return;
        }
        if (this.cannotView()) {
          o.alert(window.moocConfig.lang.KEY_LEARN_SORRY_MATERIALS);
          return;
        }
        if (!r.isEnrolled) {
          o.alert(
            window.moocConfig.lang.KEY_LEARN_TAKE_CONTENT,
            '',
            window.moocConfig.lang.KEY_LEARN_UNDERSTOOD,
          );
          return;
        }
        location.href = n;
      }
    };
    return s;
  },
  'c30079064832c51159d1cf37ab222277',
  'ab2bbf87ffa27a1f06950bbbc9c81788',
  '68471111cd34db27f540f48b62615eb2',
  '493607ab361630ca82fc5bf094051616',
  'd02f606099112f5cede2764ed0c329fb',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '93828627ddb358ed890cb65967a0c1de',
  '342ad7ae4eea50c3cad860686650a915',
  'ab6af9f7e26b55b8c5a875bba5679347',
);
EDU(
  'a1e9192d3b72c40040dedd10cf047fc7',
  function (e, t, n, i, o, a, s, r, c, d, l) {
    var _ = window,
      u = NEJ.O,
      f = NEJ.F,
      h = NEJ.P('nej.e'),
      p = NEJ.P('nej.v'),
      m = NEJ.P('edu.u'),
      b = NEJ.P('nej.u'),
      g = NEJ.P('edu.d'),
      v;
    var E = { PUBLISH: 2, CLOSED: 3, GENERATING: 1, PART_OF_FAIL: 4, FAIL: 5 };
    var w = {};
    w[E.PUBLISH] = 'AIGC内容已生成';
    w[E.CLOSED] = 'AIGC内容已关闭';
    w[E.GENERATING] = 'AIGC内容生成中';
    m._$$LessonNormal = NEJ.C();
    v = m._$$LessonNormal._$extend(m._$$UIBase, !0);
    v.__initXGui = function () {
      this.__seed_html = h._$addNodeTemplate(
        h._$getHtmlTemplate('jst-learnLessonNormal', {
          lang: (window.moocConfig || {}).lang || {},
          isEn: 'en' === window.currentLanguage,
        }),
      );
    };
    v.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = h._$getByClassName(this.__body, 'j-name')[0];
      this.__typeNode = h._$getByClassName(this.__body, 'j-typebox')[0];
      this.__icon = h._$getByClassName(this.__body, 'j-icon')[0];
      this.__line = h._$getByClassName(this.__body, 'j-line')[0];
      p._$addEvent(this.__body, 'click', this.__lessonClickHandle._$bind(this, null));
      this.__contentCache = new g._$$COM_Cache_CourseCtCache();
      this.__contentCache._$addEvent(
        'onGetLessonUnitVo',
        function (e) {
          p._$dispatchEvent(window, 'updateCourseVideo', { unit: e, isUnit: !0 });
        }._$bind(this),
      );
    };
    v.__lessonClickHandle = function (t, n, i, a, s, r) {
      o._$userActionLog('learn', _.courseDto.id);
      if (m._$isWap()) {
        var c = {
          课程id: _.courseDto.id,
          学期id: _.termDto.termId,
          lessonId: this.__lessonVo.id,
          lesssonUnitId: t,
        };
        m._$trackEvent('课程详情', '目录课时点击', m._$convertToJSONHex(c));
        if (!window.isEnrolled) {
          alert('请点击下方‘立即参加’后学习');
          return;
        }
        if (l.interceptUnitClick(i)) return;
        this.handleUnitClick(s, i, _.termDto.termId, t, _.courseDto.id, this.__lessonVo.id, a);
      } else {
        m._$trackEvent(
          'normalLesson',
          'click',
          '点击进入普通课时' + (t ? '(点击图标进入：' + t + ')' : ''),
        );
        if (this.__lessonVo.units) {
          if (
            !r &&
            this.__lessonVo.units[0].live &&
            this.__lessonVo.units[0].live.cdnMode == e.OUT_LIVE
          ) {
            if (window.isPreview)
              window.open(
                '/learn/preview/outsideLive.htm?termId=' +
                  this.__lessonVo.termId +
                  '&roomId=' +
                  this.__lessonVo.units[0].live.relatedLiveId,
              );
            else window.open('/learn/outsideLive.htm?id=' + this.__lessonVo.units[0].live.id);
            return;
          }
          if (r && r.live && r.live.cdnMode == e.OUT_LIVE)
            if (window.isPreview)
              window.open(
                '/learn/preview/outsideLive.htm?termId=' +
                  this.__lessonVo.termId +
                  '&roomId=' +
                  r.live.relatedLiveId,
              );
            else window.open('/learn/outsideLive.htm?id=' + r.live.id);
          else {
            var d =
              m.umi('learnContent') +
              '?type=detail&id=' +
              this.__lessonVo.id +
              (t ? '&cid=' + t : '');
            if (this.__syncMooc) d += '&sm=1';
            _.dispatcher._$redirect(d);
          }
        } else m._$$CommonDialog._$showDialog({ type: 1, message: '尚未添加课时单元', modal: !0 });
      }
    };
    v.handleUnitClick = function (e, t, n, i, o, a, s) {
      var r = '/mob/course/{{type}}.htm?tid=' + n + '&uid=' + i + '&cid=' + o + '&lid=' + a;
      switch (1 * t) {
        case m.CONST.LESSONUNIT_VIDEO:
          this.__contentCache._$getLessonUnitVo(s, t, _.isPreview || 0, i);
          if (_._empLessonTypeNode) _._empLessonTypeNode.setAttribute('style', '');
          _._empLessonTypeNode = e;
          _._empLessonTypeNode.setAttribute('style', 'color:#00CC7E');
          break;
        case m.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
          _.location.href =
            '/mooc/main/interactive-courseware/preview?contentId=' +
            encodeURIComponent(s) +
            '&termId=' +
            encodeURIComponent(n) +
            '&unitId=' +
            encodeURIComponent(i);
          break;
        case m.CONST.LESSONUNIT_PDF:
          var c = 'en' === window.currentLanguage;
          _.location.href = (c ? '/en/mooc' : '') + r.replace('{{type}}', 'pdfView');
          break;
        case m.CONST.LESSONUNIT_TEXT:
          _.location.href = r.replace('{{type}}', 'richTextView');
          break;
        case m.CONST.LESSONUNIT_DISCUSS:
          _.location.href = '/learn/netease-' + _.courseDto.id + '/wapForumDetail/?pid=' + s;
          break;
        case m.CONST.LESSONUNIT_LIVE:
          _.location.href = '/live/' + s + '.htm';
      }
    };
    v.__notSupport = function (e) {
      m._$$CommonDialog._$showDialog({
        title: '提示',
        message: '请前往中国大学MOOC客户端，完成测验作业考试。',
        modal: 'true',
        okTip: '前往中国大学MOOC',
        customStyle: 'u-callApp-dialog u-hidetitle',
        onclose: function () {
          var t = {
            课程id: _.courseDto.id,
            学期id: _.termDto.termId,
            lessonId: this.__lessonVo.id,
            lesssonUnitId: e,
          };
          m._$trackEvent('课程详情', '目录页app观看关闭', m._$convertToJSONHex(t));
        }._$bind(this),
        okFunc: function () {
          var t = {
            课程id: _.courseDto.id,
            学期id: _.termDto.termId,
            lessonId: this.__lessonVo.id,
            lesssonUnitId: e,
          };
          m._$trackEvent('课程详情', '目录页app观看点击', m._$convertToJSONHex(t));
          n._$getMobToken({}, function (e) {
            if (e)
              m._$openMobileCoursePageByToken((_.courseDto || {}).id, (_.termDto || {}).termId, e);
          });
        }._$bind(this),
      });
    };
    v.__getAigcStatus = function (e) {
      var t = w[e.aiStatus] || '';
      return window.isPreview && t ? '<span class="tag aiStatus">' + t + '</span>' : '';
    };
    v.__handleTypeIcon = function () {
      var e = this.__typeNode.parentNode.querySelectorAll('.sourceList');
      for (var t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t]);
      var n = '';
      this.__typeNode.innerHTML = '';
      this.__lessonViewStatus = 0;
      b._$forEach(
        this.__lessonVo.units,
        function (e, t) {
          if (m._$isWap()) {
            n +=
              '<div class="lsicon f-thide ' +
              (e.viewStatus ? 'learned' : '') +
              '" data-cid=' +
              e.id +
              ' data-ctype=' +
              e.contentType +
              ' data-ctid=' +
              e.contentId +
              '><span class="logo">';
            switch (e.contentType) {
              case m.CONST.LESSONUNIT_MUSIC_VIDEO:
                n +=
                  window.moocConfig.lang.KEY_LEARN_VIDEO_3 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_VIDEO:
                n +=
                  window.moocConfig.lang.KEY_LEARN_VIDEO_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_PDF:
                n += 'PDF</span>' + b._$escape(e.name) + '</div>';
                break;
              case m.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
                n += '互动课件</span>' + b._$escape(e.name) + '</div>';
                break;
              case m.CONST.LESSONUNIT_TEXT:
                n +=
                  window.moocConfig.lang.KEY_LEARN_TEXT_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_QUESTION:
                n +=
                  window.moocConfig.lang.KEY_LEARN_TEST_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_DISCUSS:
                n +=
                  window.moocConfig.lang.KEY_LEARN_DISCUSS_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_COLUMN_CONTENT:
                n +=
                  window.moocConfig.lang.KEY_LEARN_AUTIO +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_RELATED_LIVE:
                n +=
                  window.moocConfig.lang.KEY_LEARN_RELATED_LIVE +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_LIVE:
                n +=
                  window.moocConfig.lang.KEY_LEARN_LIVE + '</span>' + b._$escape(e.name) + '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_EXERCISE:
                n +=
                  window.moocConfig.lang.KEY_LEARN_MUSIC_EXERCISE +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_HOMEWORK:
                n +=
                  window.moocConfig.lang.KEY_LEARN_MUSIC_HOMEWORK +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
            }
          } else {
            this.__lessonViewStatus += e.viewStatus ? 1 : 0;
            n +=
              '<div class="f-icon lsicon ' +
              (e.viewStatus ? 'learned' : '') +
              '" data-cid=' +
              e.id +
              ' title=';
            switch (e.contentType) {
              case m.CONST.LESSONUNIT_MUSIC_VIDEO:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_VIDEO_3 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_VIDEO_3 +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_VIDEO:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_VIDEO_2 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_VIDEO_2 +
                  '</div>' +
                  b._$escape(e.name) +
                  this.__getAigcStatus(e) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_PDF:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_DOCUMENT +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_DOCUMENT +
                  '</div>' +
                  b._$escape(e.name) +
                  this.__getAigcStatus(e) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
                n +=
                  '"互动课件' +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">互动课件</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_TEXT:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_TXT_DOCUMENT +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_RICH_TEXT +
                  '</div>' +
                  b._$escape(e.name) +
                  this.__getAigcStatus(e) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_QUESTION:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_QUIZ_QUESTIONS1 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_TEST +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_DISCUSS:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_DISCUSS1 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_DISCUSS_2 +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_COLUMN_CONTENT:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_AUTIO +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_AUTIO +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_RELATED_LIVE:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_RELATED_LIVE +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_RELATED_LIVE +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_LIVE:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_LIVE +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_LIVE +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_EXERCISE:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_MUSIC_EXERCISE +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_MUSIC_EXERCISE +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_HOMEWORK:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_MUSIC_HOMEWORK +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_MUSIC_HOMEWORK +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
            }
          }
        }._$bind(this),
      );
      if (n) {
        var i = document.createElement('div');
        i.style.clear = 'both';
        i.style.overflow = 'hidden';
        i.className = 'sourceList';
        i.innerHTML = n;
        var o = h._$getChildren(i);
        if (m._$isWap()) {
          i = document.createElement('div');
          i.innerHTML = n;
          o = h._$getChildren(i);
          this.__typeNode.appendChild(i);
        } else {
          this.__typeNode.parentNode.appendChild(i);
          var a = this.__lessonVo.units.filter(function (e) {
            return !!e.viewStatus;
          }).length;
          var s = i.parentNode.querySelector('.circle');
          if (s) {
            if (!this.__notPreview) s.style.display = 'none';
            else s.style.display = 'block';
            if (a === this.__lessonVo.units.length) s.className = 'circle checked';
            else if (a > 0) s.className = 'circle semichecked';
          }
        }
        b._$forEach(
          o,
          function (e, t) {
            this.__doInitDomEvent([
              [
                e,
                'click',
                function (n) {
                  return function (n) {
                    p._$stop(n);
                    var i = h._$dataset(e, 'cid');
                    var o = h._$dataset(e, 'ctype');
                    var a = h._$dataset(e, 'ctid');
                    this.__lessonClickHandle(i, n, o, a, e, this.__lessonVo.units[t]);
                  }._$bind(this);
                }._$bind(this)(),
              ],
            ]);
          }._$bind(this),
        );
        Array.from(document.querySelectorAll('.sourceList')).forEach(function (e) {
          e.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        });
      }
    };
    v.__handleViewRecord = function () {
      m._$hiddenNode(this.__icon);
    };
    v.__reset = function (e) {
      this.__lang = window.moocConfig.lang;
      this.__supReset(e);
      this.__lessonVo = e.lessonVo;
      this.__nameNode.innerHTML = this.__lessonVo.name || '';
      this.__notPreview = e.notPreview || !1;
      this.__syncMooc = e.syncMooc || !1;
      this.__handleTypeIcon();
      this.__handleViewRecord();
    };
    v.__destroy = function () {
      this.__supDestroy();
    };
  },
  'ef64b877c64ed4138d4b703989241671',
  '8e2e477f7b9e6e134cfe14f830c66a52',
  'c30079064832c51159d1cf37ab222277',
  '892e35f71d7ab44fd31b760aa99d9fa9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '493607ab361630ca82fc5bf094051616',
  'd02f606099112f5cede2764ed0c329fb',
  'ab2bbf87ffa27a1f06950bbbc9c81788',
  '68471111cd34db27f540f48b62615eb2',
  '72082ce7fa131d8e62eb43521a683cd9',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'bf8d09e46d2369efd6e41b29fe211330',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'aa604eee72c30e4ab47131b0e65592a7',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    r._$$LessonQuiz = NEJ.C();
    d = r._$$LessonQuiz._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate('jst-learnLessonQuiz', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = a._$getByClassName(this.__body, 'j-name')[0];
      this.__infoNode = a._$getByClassName(this.__body, 'j-info')[0];
      this.__retryNode = a._$getByClassName(this.__body, 'j-retry')[0];
      this.__icon = a._$getByClassName(this.__body, 'j-icon')[0];
      this.__iconCircle = a._$getByClassName(this.__body, 'j-circle')[0];
      this.__previewStatusNode = a._$getByClassName(this.__body, 'j-previewStatus')[0];
      s._$addEvent(this.__body, 'click', this.__lessonClickHandle._$bind(this));
    };
    d.__lessonClickHandle = function (i) {
      if (r._$isWap()) e.interceptUnitClick();
      else {
        var o = !!n.isPreview && this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_DELETED;
        if (o || !this.__lessonVo.test.id) {
          if (i) {
            var a = '测验';
            var s = o
              ? a + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
              : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
                a +
                window.moocConfig.lang.KEY_LEARN_CONTENT;
            r._$$CommonDialog._$showDialog({ type: 1, message: s, modal: !0 });
          }
          return;
        }
        t._$userActionLog('learn', n.courseDto.id);
        r._$trackEvent(
          'quizLesson',
          'click',
          window.moocConfig.lang.KEY_LEARN_CLICK_TIME + this.__lessonVo.test.id,
        );
        n.dispatcher._$redirect(r.umi('learnQuiz') + '?id=' + this.__lessonVo.test.id);
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__lessonVo = e.lessonVo;
      this.__lessonVo.test = this.__lessonVo.test || {};
      if (n.isPreview && !n.isReview) {
        var t =
          this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_MODIFIED;
        var i = window.webUser.roles || [];
        this.__previewStatusUI = r._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__lessonVo,
          type: r.CONST.LESSON_TYPE_QUIZ,
          hidePublish: t || !!e.syncMooc || i.includes(r.CONST.ROLE_REGION_ADMIN),
        });
      }
      if (this.__lessonVo.test.id) {
        this.__nameNode.innerText = this.__lessonVo.test.name;
        if (this.__lessonVo.test.deadline)
          this.__infoNode.innerText =
            window.moocConfig.lang.KEY_LEARN_SUBMISSION_DEADLINE +
            r._$formatCommonTime(this.__lessonVo.test.deadline || 0) +
            ' / ' +
            window.moocConfig.lang.KEY_LEARN_TRY +
            ' ' +
            (this.__lessonVo.test.trytime || 0) +
            ' ' +
            window.moocConfig.lang.KEY_LEARN_TIMES;
        if (this.__lessonVo.test.deadline - r._$getCurServerTime() > 0) {
          a._$delClassName(this.__retryNode, 'phrase3');
          this.__retryNode.innerText = window.moocConfig.lang.KEY_LEARN_SUBMISSION_STAGE;
        } else {
          this.__retryNode.innerText = window.moocConfig.lang.KEY_LEARN_RESULTS_ANNOUNCED;
          a._$addClassName(this.__retryNode, 'phrase3');
        }
        r._$toggleNodeDisplay(this.__retryNode, !!this.__lessonVo.test.deadline);
        if (this.__previewStatusUI);
        else this.__retryNode.style.marginRight = '0px';
      } else {
        this.__nameNode.innerText = this.__lessonVo.name;
        this.__infoNode.innerText = '';
        this.__retryNode.innerText = '';
        r._$hiddenNode(this.__retryNode);
      }
      this.__handleViewRecord();
    };
    d.__handleViewRecord = function () {
      console.log('this.__lessonVo', this.__lessonVo);
      if (!n.isPreview) {
        if (r._$isWap())
          if (!this.__lessonVo.viewStatus || !n.isEnrolled) console.log(1);
          else {
            console.log(3);
            a._$addClassName(this.__body, 'learned');
          }
        else if (this.__iconCircle) {
          a._$delClassName(this.__iconCircle, 'checked semichecked');
          this.__iconCircle.style.display = 'block';
          if (0 == this.__lessonVo.viewStatus || !n.isEnroll)
            a._$addClassName(this.__iconCircle, '');
          else if (3 == this.__lessonVo.viewStatus)
            a._$addClassName(this.__iconCircle, 'semichecked');
          else a._$addClassName(this.__iconCircle, 'checked');
        }
      } else {
        r._$hiddenNode(this.__icon);
        this.__iconCircle && (this.__iconCircle.style.display = 'none');
      }
    };
    d.__destroy = function () {
      if (this.__previewStatusUI)
        this.__previewStatusUI = r._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '72082ce7fa131d8e62eb43521a683cd9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  '94ec8a8dfa596967c090fc2c92487692',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '1787c38a11a8e8184385e7783942c142',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    r._$$LessonHomework = NEJ.C();
    d = r._$$LessonHomework._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate('jst-learnLessonHw', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = a._$getByClassName(this.__body, 'j-name')[0];
      this.__infoNode = a._$getByClassName(this.__body, 'j-info')[0];
      this.__phaseNode = a._$getByClassName(this.__body, 'j-phase')[0];
      this.__icon = a._$getByClassName(this.__body, 'j-icon')[0];
      this.__iconCircle = a._$getByClassName(this.__body, 'j-circle')[0];
      this.__previewStatusNode = a._$getByClassName(this.__body, 'j-previewStatus')[0];
      s._$addEvent(this.__body, 'click', this.__lessonClickHandle._$bind(this));
    };
    d.__lessonClickHandle = function (i) {
      if (r._$isWap()) e.interceptUnitClick();
      else {
        var o = !!n.isPreview && this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_DELETED;
        if (o || !this.__lessonVo.test.id) {
          if (i) {
            var a = window.moocConfig.lang.KEY_LEARN_ASSIGNMENT;
            var s = o
              ? a + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
              : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
                a +
                window.moocConfig.lang.KEY_LEARN_CONTENT;
            r._$$CommonDialog._$showDialog({ type: 1, message: s, modal: !0 });
          }
          return;
        }
        t._$userActionLog('learn', n.courseDto.id);
        if (this.__lessonVo.test.type == r.CONST.TYPE_SUBJECTIVE_OJ) {
          r._$trackEvent(
            'OJLesson',
            'click',
            '点击进入Online Judge单元作业课时：' + this.__lessonVo.test.id,
          );
          n.dispatcher._$redirect(r.umi('learnOJHomework') + '?id=' + this.__lessonVo.test.id);
        } else {
          r._$trackEvent(
            'homeworkLesson',
            'click',
            '点击进入单元作业课时：' + this.__lessonVo.test.id,
          );
          n.dispatcher._$redirect(r.umi('learnHomework') + '?id=' + this.__lessonVo.test.id);
        }
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__lessonVo = e.lessonVo;
      this.__lessonVo.test = this.__lessonVo.test || {};
      if (n.isPreview && !n.isReview) {
        var t =
          this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__lessonVo.testDraftStatus == r.CONST.CHAPTERSTATUS_MODIFIED;
        var i = window.webUser.roles || [];
        this.__previewStatusUI = r._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__lessonVo,
          type: r.CONST.LESSON_TYPE_HOMEWORK,
          hidePublish: t || !!e.syncMooc || i.includes(r.CONST.ROLE_REGION_ADMIN),
        });
      }
      if (this.__lessonVo.test.id) {
        this.__nameNode.innerText = this.__lessonVo.test.name;
        var o = r._$currentEvaluatePhase(this.__lessonVo.test);
        var s = '';
        switch (o) {
          case r.CONST.HW_PHASE_SUBMIT:
            s =
              window.moocConfig.lang.KEY_LEARN_SUBMISSION_DEADLINE +
              r._$formatCommonTime(this.__lessonVo.test.deadline || 0);
            break;
          case r.CONST.HW_PHASE_EVALUATION:
            s =
              window.moocConfig.lang.KEY_LEARN_CHECKOUT_DEADLINE +
              r._$formatCommonTime(
                this.__lessonVo.test.evaluateEnd || this.__lessonVo.test.evaluateScoreReleaseTime,
              );
            break;
          case r.CONST.HW_PHASE_SCORE:
            s =
              window.moocConfig.lang.KEY_LEARN_RESULTS_TIME +
              r._$formatCommonTime(this.__lessonVo.test.evaluateScoreReleaseTime || 0);
        }
        this.__infoNode.innerText =
          s + ' / ' + r._$getEvJudgeStr(this.__lessonVo.test.evaluateJudgeType);
        this.__phaseNode.innerText = r._$getHwPhaseStrByTest(this.__lessonVo.test);
        a._$delClassName(this.__phaseNode, 'phrase1 phrase2 phrase3 phrase4');
        a._$addClassName(this.__phaseNode, 'phrase' + o);
        r._$toggleNodeDisplay(this.__phaseNode, !!this.__lessonVo.test.deadline);
        r._$toggleNodeDisplay(this.__infoNode, !!this.__lessonVo.test.deadline);
        if (this.__previewStatusUI);
        else this.__phaseNode.style.marginRight = '0px';
      } else {
        this.__nameNode.innerText = this.__lessonVo.name;
        this.__infoNode.innerText = '';
        this.__phaseNode.innerText = '';
        r._$hiddenNode(this.__phaseNode);
      }
      this.__handleViewRecord();
    };
    d.__handleViewRecord = function () {
      console.log('this.__lessonVo', this.__lessonVo, !this.__lessonVo.viewStatus, !n.isEnrolled);
      if (!n.isPreview) {
        if (r._$isWap())
          if (!this.__lessonVo.viewStatus || !n.isEnrolled) console.log(1);
          else {
            console.log(3);
            a._$addClassName(this.__body, 'learned');
          }
        else if (this.__iconCircle) {
          this.__iconCircle.style.display = 'block';
          a._$delClassName(this.__iconCircle, 'checked semichecked');
          if (0 == this.__lessonVo.viewStatus || !n.isEnroll)
            a._$addClassName(this.__iconCircle, '');
          else if (3 == this.__lessonVo.viewStatus)
            a._$addClassName(this.__iconCircle, 'semichecked');
          else a._$addClassName(this.__iconCircle, 'checked');
        }
      } else {
        this.__icon && r._$hiddenNode(this.__icon);
        this.__iconCircle && (this.__iconCircle.style.display = 'none');
      }
    };
    d.__destroy = function () {
      if (this.__previewStatusUI)
        this.__previewStatusUI = r._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '72082ce7fa131d8e62eb43521a683cd9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  '94ec8a8dfa596967c090fc2c92487692',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '08d2f36062baca2c8eb8327afd74d88c',
);
EDU(
  '8e9c53b98e22fa9419ebaabd0dd2b334',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    s._$$ChapterNormal = NEJ.C();
    c = s._$$ChapterNormal._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(o._$getHtmlTemplate('jst-learnChapterNormal'));
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = o._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__nameNode = o._$getByClassName(this.__body, 'j-titleName')[0];
      this.__lessoBox = o._$getByClassName(this.__body, 'j-lessoBox')[0];
      this.__upNode = o._$getByClassName(this.__body, 'j-up')[0];
      this.__downNode = o._$getByClassName(this.__body, 'j-down')[0];
      this.__noContent = o._$getByClassName(this.__body, 'j-noContent')[0];
      this.__previewStatusNode = o._$getByClassName(this.__body, 'j-previewStatus')[0];
      this.__line = o._$getByClassName(this.__body, 'j-line')[0];
      a._$addEvent(
        this.__titleBox,
        'click',
        function (e) {
          this.__showUpDownMode(!this.__downStatus, e);
        }._$bind(this),
      );
    };
    c.__showUpDownMode = function (n, i) {
      s._$hiddenNode(this.__upNode);
      s._$hiddenNode(this.__downNode);
      s._$showNode(this.__noContent);
      var o = this.__chapterVo.mergeLessons.length;
      var a = !!t.isPreview && this.__chapterVo.draftStatus == s.CONST.CHAPTERSTATUS_DELETED;
      if (!a && o) {
        this.__downStatus = !!n;
        s._$hiddenNode(this.__noContent);
        if (this.__downStatus) {
          s._$showNode(this.__downNode);
          this.__lessonNormalUIs = [];
          this.__lessonQuizUIs = [];
          this.__lessonHwUIs = [];
          r._$forEach(
            this.__chapterVo.mergeLessons,
            function (e, n) {
              var i = null;
              switch (e.contentType) {
                case s.CONST.LESSON_TYPE_QUIZ:
                  i = s._$$LessonQuiz._$allocate({
                    parent: this.__lessoBox,
                    lessonVo: e,
                    clazz: n == o - 1 ? 'last' : '',
                    syncMooc: this.__syncMooc,
                  });
                  this.__lessonQuizUIs.push(i);
                  break;
                case s.CONST.LESSON_TYPE_HOMEWORK:
                  i = s._$$LessonHomework._$allocate({
                    parent: this.__lessoBox,
                    lessonVo: e,
                    clazz: n == o - 1 ? 'last' : '',
                    syncMooc: this.__syncMooc,
                  });
                  this.__lessonHwUIs.push(i);
                  break;
                case s.CONST.LESSON_TYPE_NORMAL:
                default:
                  i = s._$$LessonNormal._$allocate({
                    parent: this.__lessoBox,
                    lessonVo: e,
                    clazz: n == o - 1 ? 'last' : '',
                    notPreview: !t.isPreview,
                    syncMooc: this.__syncMooc,
                  });
                  this.__lessonNormalUIs.push(i);
              }
            }._$bind(this),
          );
        } else {
          s._$showNode(this.__upNode);
          this.__clearUIs();
        }
      } else if (i) {
        var c = e.KEY_TEACH_UNIT;
        var d = a
          ? c + e.KEY_LEARN_CONTENT_DELETED
          : e.KEY_LEARN_NOT_ADDED_YET + c + e.KEY_LEARN_CONTENT;
        s._$$CommonDialog._$showDialog({ type: 1, message: d, modal: !0 });
      }
    };
    c.__mergeLsnQuizHW = function (e) {
      this.__chapterVo = e;
      this.__chapterVo.lessons = this.__chapterVo.lessons || [];
      var n = !t.isPreview
        ? this.__chapterVo.lessons
            .concat(this.__chapterVo.quizs || [])
            .concat(this.__chapterVo.homeworks || [])
        : this.__chapterVo.lessons;
      this.__chapterVo.mergeLessons = n.sort(function (e, t) {
        return e.position - t.position;
      });
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__syncMooc = e.syncMooc;
      this.__mergeLsnQuizHW(e.chapterVo);
      this.__nameNode.innerText = this.__chapterVo.name || '';
      this.__showUpDownMode(!!e.initDownStatus);
      if (t.isPreview && !t.isReview) {
        var n =
          this.__chapterVo.draftStatus == s.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__chapterVo.draftStatus == s.CONST.CHAPTERSTATUS_DELETED;
        var i = window.webUser.roles || [];
        this.__previewStatusUI = s._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__chapterVo,
          type: s.CONST.CHAPTER_TYPE_NORMAL,
          hidePublish: n || !!e.syncMooc || i.includes(s.CONST.ROLE_REGION_ADMIN),
        });
      }
    };
    c.__clearUIs = function () {
      r._$forEach(
        this.__lessonNormalUIs,
        function (e, t) {
          e = s._$$LessonNormal._$recycle(e);
        }._$bind(this),
      );
      this.__lessonNormalUIs = null;
      r._$forEach(
        this.__lessonQuizUIs,
        function (e, t) {
          e = s._$$LessonQuiz._$recycle(e);
        }._$bind(this),
      );
      this.__lessonQuizUIs = null;
      r._$forEach(
        this.__lessonHwUIs,
        function (e, t) {
          e = s._$$LessonHomework._$recycle(e);
        }._$bind(this),
      );
      this.__lessonHwUIs = null;
    };
    c.__destroy = function () {
      this.__clearUIs();
      if (this.__previewStatusUI)
        this.__previewStatusUI = s._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '05914c6f767170cf483bb9df9a899f1e',
  'a1e9192d3b72c40040dedd10cf047fc7',
  'aa604eee72c30e4ab47131b0e65592a7',
  '1787c38a11a8e8184385e7783942c142',
  '94ec8a8dfa596967c090fc2c92487692',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'b5a950f651fa0961e0eaec9b66523521',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    r._$$ChapterExam = NEJ.C();
    d = r._$$ChapterExam._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(a._$getHtmlTemplate('jst-learnChapterExam'));
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = a._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__nameNode = a._$getByClassName(this.__body, 'j-titleName')[0];
      this.__noContent = a._$getByClassName(this.__body, 'j-noContent')[0];
      this.__phraseNode = a._$getByClassName(this.__body, 'j-phase')[0];
      this.__previewStatusNode = a._$getByClassName(this.__body, 'j-previewStatus')[0];
      s._$addEvent(this.__titleBox, 'click', this.__examClickHandle._$bind(this));
    };
    d.__examClickHandle = function (i) {
      var o = window.courseDto && window.courseDto.id;
      var a = window.termDto && window.termDto.id;
      var s = this.__examVo.exam && this.__examVo.exam.id;
      var c = window.schoolDto && window.schoolDto.shortName;
      if (o) t._$userActionLog('learn', o);
      if (r._$isWap()) {
        console.log('__examClickHandle', this.__examVo);
        var d = this.__isNewExam
          ? 'https://www.icourse163.org/mooc/main/newExamCard?eid=' +
            s +
            '&tid=' +
            a +
            '&cid=' +
            o +
            '&sn=' +
            c +
            (window.isSpoc ? '&isSpoc=1' : '')
          : !1;
        console.log('redirectUrl', d);
        e.interceptUnitClick(void 0, d);
      } else {
        var l = !!n.isPreview && this.__examVo.draftStatus == r.CONST.CHAPTERSTATUS_DELETED;
        if (l || !this.__examVo.id) {
          if (i) {
            var _ = window.moocConfig.lang.KEY_LEARN_EXAMINATION;
            var u = l
              ? _ + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
              : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
                _ +
                window.moocConfig.lang.KEY_LEARN_CONTENT;
            r._$$CommonDialog._$showDialog({ type: 1, message: u, modal: !0 });
          }
          return;
        }
        console.log('this.examvo', this.__examVo);
        n.dispatcher._$redirect(r.umi('learnExamList') + '?id=' + this.__examVo.id);
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__examVo = e.examVo || {};
      this.__nameNode.innerText = this.__examVo.name || '';
      this.__isNewExam = 3 == this.__examVo.contentType;
      if (this.__isNewExam) a._$addClassName(this.__titleBox, 'new-exam');
      if (n.isPreview && !n.isReview) {
        if (this.__examVo.exam) this.__examVo.draftStatus = this.__examVo.exam.draftStatus;
        var t = window.webUser.roles || [];
        var i =
          this.__examVo.draftStatus == r.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__examVo.draftStatus == r.CONST.CHAPTERSTATUS_MODIFIED;
        this.__previewStatusUI = r._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__examVo,
          type: r.CONST.CHAPTER_TYPE_EXAM,
          hidePublish: i || !!e.syncMooc || t.includes(r.CONST.ROLE_REGION_ADMIN),
        });
      }
      this.__genTextPhrase();
    };
    d.__genTextPhrase = function () {
      var e = '',
        t = r._$getCurServerTime();
      a._$delClassName(this.__phraseNode, 'phrase3');
      r._$showNode(this.__phraseNode);
      if (this.__examVo.subjectTest) {
        e = r._$getHwPhaseStrByTest(this.__examVo.subjectTest);
        a._$delClassName(this.__phraseNode, 'phrase1 phrase2 phrase3 phrase4');
        a._$addClassName(
          this.__phraseNode,
          'phrase' + r._$currentEvaluatePhase(this.__examVo.subjectTest),
        );
        if (!this.__examVo.subjectTest.deadline) r._$hiddenNode(this.__phraseNode);
      } else if (this.__examVo.objectTest) {
        if (t < this.__examVo.objectTest.deadline)
          e = window.moocConfig.lang.KEY_LEARN_SUBMISSION_STAGE;
        else {
          e = window.moocConfig.lang.KEY_LEARN_RESULTS_ANNOUNCED;
          a._$addClassName(this.__phraseNode, 'phrase3');
        }
        if (!this.__examVo.objectTest.deadline) r._$hiddenNode(this.__phraseNode);
      } else r._$hiddenNode(this.__phraseNode);
      this.__phraseNode.innerText = e;
    };
    d.__destroy = function () {
      if (this.__previewStatusUI)
        this.__previewStatusUI = r._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '72082ce7fa131d8e62eb43521a683cd9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '94ec8a8dfa596967c090fc2c92487692',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '342ad7ae4eea50c3cad860686650a915',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '08d2f36062baca2c8eb8327afd74d88c',
);
EDU(
  'c1ba0a8ce6586f97db89350042a33ef5',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    s._$$ChapterList = NEJ.C();
    c = s._$$ChapterList._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate('jst-learnChapterList', {
          lang: (window.moocConfig || {}).lang || {},
          isEn: 'en' === window.currentLanguage,
        }),
      );
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = o._$getByClassName(this.__body, 'j-moduletitle')[0];
      this.__moduleNameNode = o._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__emptyNode = o._$getByClassName(this.__body, 'j-empty')[0];
    };
    c.__mergeChapExams = function (e) {
      this.__termVo = e || {};
      this.__termVo.chapters = this.__termVo.chapters || [];
      var t = this.__termVo.chapters;
      this.__termVo.mergeChapters = t;
    };
    c.__mergeAiStatus = function (n, i) {
      if (isPreview) {
        var o = [];
        if (n.chapters && n.chapters.length)
          r._$forEach(n.chapters, function (e, t) {
            if (e.lessons && e.lessons.length)
              r._$forEach(e.lessons, function (e, t) {
                if (e.units && e.units.length)
                  r._$forEach(e.units, function (e, t) {
                    if (e.contentType == s.CONST.LESSONUNIT_VIDEO) o.push(e.id);
                  });
              });
          });
        e._$listUnitAIStatus({ termId: t.termDto.id, unitIds: JSON.stringify(o) }, function (e) {
          var t = {};
          r._$forEach(e, function (e, n) {
            t[e.unitId] = { unitAiStatus: e.unitAiStatus, contentId: e.contentId };
          });
          i(t);
        });
      } else i();
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__mergeChapExams(e.termVo);
      this.__mergeAiStatus(
        e.termVo,
        function (t) {
          this.__moduleNameNode.innerText = e.moduleName || '';
          s._$toggleNodeDisplay(this.__titleNode, !e.syncMooc);
          if (!this.__termVo.mergeChapters.length) s._$showNode(this.__emptyNode);
          else {
            s._$hiddenNode(this.__emptyNode);
            var n = this.__termVo.mergeChapters[0];
            r._$forEach(this.__termVo.mergeChapters, function (i, o) {
              r._$forEach(i.lessons, function (o, a) {
                r._$forEach(o.units, function (o, a) {
                  if (e.lastLearnUnitId && o.id == e.lastLearnUnitId) n = i;
                  if (t && void 0 != t[o.id] && t[o.id].contentId == o.contentId)
                    o.aiStatus = t[o.id].unitAiStatus;
                });
              });
            });
            this.__chapterUIs = [];
            r._$forEach(
              this.__termVo.mergeChapters,
              function (t, i) {
                var o = null;
                var a = null;
                var r = null;
                switch (t.contentType) {
                  case s.CONST.CHAPTER_TYPE_NORMAL:
                    o = s._$$ChapterNormal._$allocate({
                      parent: this.__body,
                      chapterVo: t,
                      initDownStatus: n == t,
                      syncMooc: e.syncMooc,
                    });
                    this.__chapterUIs.push({ type: 'chapter', ui: o });
                    break;
                  case s.CONST.CHAPTER_QUIZ:
                    a = s._$$ChapterExam._$allocate({
                      parent: this.__body,
                      examVo: t,
                      syncMooc: e.syncMooc,
                    });
                    this.__chapterUIs.push({ type: 'exam', ui: a });
                    break;
                  case 3:
                    r = s._$$ChapterExam._$allocate({
                      parent: this.__body,
                      examVo: t,
                      isNewExam: !0,
                      syncMooc: e.syncMooc,
                    });
                    this.__chapterUIs.push({ type: 'newExam', ui: r });
                }
              }._$bind(this),
            );
          }
        }._$bind(this),
      );
    };
    c.__destroy = function () {
      r._$forEach(
        this.__chapterUIs,
        function (e, t) {
          if ('chapter' === e.type) _chapterUI = s._$$ChapterNormal._$recycle(e.ui);
          else if ('exam' === e.type) _examUI = s._$$ChapterExam._$recycle(e.ui);
          else if ('newExam' === e.type) _newExamUI = s._$$ChapterExam._$recycle(e.ui);
        }._$bind(this),
      );
      this.__chapterUIs = null;
      this.__supDestroy();
    };
  },
  '8e2e477f7b9e6e134cfe14f830c66a52',
  '8e9c53b98e22fa9419ebaabd0dd2b334',
  'b5a950f651fa0961e0eaec9b66523521',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'c05dd632e9d52734ddcf7eb505e23cb0',
  '<div class="m-joinQa {hasJoin?\'hasJoin\':\'\'}" r-hide={!showQaEntry}  on-mouseover={this.hoverToggle(true)} on-mouseout={this.hoverToggle(false)}>\n<p class="m-joinQa-btn">\n{#if hasJoin}\n<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g id="CheckCircle" clip-path="url(#clip0_1_36319)">\n<path id="icon" d="M1.75004 7.00016C1.75004 4.10067 4.10055 1.75016 7.00004 1.75016C9.89954 1.75016 12.25 4.10067 12.25 7.00016C12.25 9.89966 9.89954 12.2502 7.00004 12.2502C4.10055 12.2502 1.75004 9.89966 1.75004 7.00016ZM7.00004 0.583496C3.45621 0.583496 0.583374 3.45634 0.583374 7.00016C0.583374 10.544 3.45621 13.4168 7.00004 13.4168C10.5439 13.4168 13.4167 10.544 13.4167 7.00016C13.4167 3.45634 10.5439 0.583496 7.00004 0.583496ZM10.0375 5.66264L6.53752 9.16264C6.30971 9.39045 5.94037 9.39045 5.71256 9.16264L3.96256 7.41264C3.73476 7.18484 3.73476 6.81549 3.96256 6.58768C4.19037 6.35988 4.55971 6.35988 4.78752 6.58768L6.12504 7.92521L9.21256 4.83768C9.44037 4.60988 9.80971 4.60988 10.0375 4.83768C10.2653 5.06549 10.2653 5.43484 10.0375 5.66264Z" fill="white"/>\n</g>\n<defs>\n<clipPath id="clip0_1_36319">\n<rect width="14" height="14" fill="white"/>\n</clipPath>\n</defs>\n</svg>已添加<svg class="svg-arrow" xmlns="http://www.w3.org/2000/svg" width="6" height="4" viewBox="0 0 6 4" fill="none">\n<path d="M2.6 0.533333C2.8 0.266666 3.2 0.266666 3.4 0.533333L5.4 3.2C5.64721 3.52962 5.41202 4 5 4L1 4C0.587978 4 0.352787 3.52962 0.6 3.2L2.6 0.533333Z" fill="white"/>\n</svg>\n{#else}\n<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g id="PlusCircle" clip-path="url(#clip0_1_35390)">\n<path id="icon" d="M1.75001 7.00016C1.75001 4.10067 4.10052 1.75016 7.00001 1.75016C9.89951 1.75016 12.25 4.10067 12.25 7.00016C12.25 9.89966 9.89951 12.2502 7.00001 12.2502C4.10052 12.2502 1.75001 9.89966 1.75001 7.00016ZM7.00001 0.583496C3.45618 0.583496 0.583344 3.45634 0.583344 7.00016C0.583344 10.544 3.45618 13.4168 7.00001 13.4168C10.5438 13.4168 13.4167 10.544 13.4167 7.00016C13.4167 3.45634 10.5438 0.583496 7.00001 0.583496ZM7.58334 4.66683C7.58334 4.34466 7.32218 4.0835 7.00001 4.0835C6.67785 4.0835 6.41668 4.34466 6.41668 4.66683V6.41683H4.66668C4.34451 6.41683 4.08334 6.678 4.08334 7.00016C4.08334 7.32233 4.34451 7.5835 4.66668 7.5835H6.41668V9.3335C6.41668 9.65566 6.67785 9.91683 7.00001 9.91683C7.32218 9.91683 7.58334 9.65566 7.58334 9.3335V7.5835H9.33334C9.65551 7.5835 9.91668 7.32233 9.91668 7.00016C9.91668 6.678 9.65551 6.41683 9.33334 6.41683H7.58334V4.66683Z" fill="white"/>\n</g>\n<defs>\n<clipPath id="clip0_1_35390">\n<rect width="14" height="14" fill="white"/>\n</clipPath>\n</defs>\n</svg>添加到文档问答\n{/if}\n</p>\n<div class="m-joinQa-content"  r-hide={!showMore} r-animation="on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;">\n{#if hasJoin}\n<div class="m-joinQa-content-ul">\n<p><a on-click="{this.toDocPage()}">去文档问答</a></p>\n<p on-click="{this.joinOrCancelDoc(null, 1)}">取消添加</p>\n</div>\n{#else}\n<p>添加到...</p>\n<div class="m-joinQa-content-ul">\n{#if useDefaultKb}\n<p on-click="{this.joinOrCancelDoc(defaultKbId, 0)}">{defaultKbName}</p>\n{#else}\n{#list kbList as kb}\n<p on-click="{this.joinOrCancelDoc(kb.id, 0)}">{kb.name}</p>\n{/list}\n{/if}\n</div>\n{/if}\n</div>\n</div>',
);
EDU(
  '4c8e3e49726e9626bdaa4895f1b1e5e4',
  '.m-joinQa{position:absolute;top:35px;right:24px;z-index:1;font-family:PingFang SC;font-size:14px;font-weight:400;padding:10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:end;-ms-flex-align:end;align-items:end;}.m-joinQa.hasJoin:hover .svg-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg);}.m-joinQa-btn{cursor:pointer;color:#fff;height:35px;width:150px;line-height:35px;padding:0 15px;border-radius:18px;background-color:rgba(0, 0, 0, 0.5);-webkit-box-sizing:border-box;box-sizing:border-box;}.m-joinQa.hasJoin .m-joinQa-btn{width:105px;}.m-joinQa-btn svg{vertical-align:middle;display:inline-block;-webkit-transition:all ease-in 0.24s;transition:all ease-in 0.24s;margin:0 3px;}.m-joinQa-content{width:160px;border-radius:6px;background:rgba(236, 239, 244, 0.9);backdrop-filter:blur(5px);text-align:center;margin-top:8px;padding:6px 8px;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:12px;color:#666;}.m-joinQa-content-ul p{width:100%;height:32px;font-size:14px;line-height:32px;border-radius:4px;cursor:pointer;color:#333;margin:8px 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}.m-joinQa-content-ul p a{color:#333;}.m-joinQa-content-ul p.active,.m-joinQa-content-ul p:hover{background:#fff;}',
);
EDU(
  'd1b339d8b948d535e1ceb88c9586d7da',
  function (e, t, n, i, o) {
    var a = NEJ.P('edu.u');
    var s = n.$extends({
      name: 'lesson-lessonJoin-qa',
      css: t,
      template: e,
      data: {
        hasJoin: !0,
        showMore: !1,
        kbList: [],
        useDefaultKb: !1,
        defaultKbName: '默认知识库',
        defaultKbId: 0,
        showQaEntry: !1,
      },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.$$init();
      },
      $$init: function (e) {
        o._$getGrayTestResult(
          { key: 'document_qa_abtest_ratio' },
          function (e) {
            if (e && e.isGrayTestResult) {
              this.data.showQaEntry = !0;
              this.initDocStatus();
            }
            this.$update();
          }._$bind(this),
        );
      },
      hoverToggle: function (e) {
        this.data.showMore = e;
        this.$update();
      },
      initDocStatus: function () {
        i._$getUnitDocQaFileStatus(
          { unitId: this.data.unitId },
          function (e) {
            this.data.knowledgeBaseId = e && e.knowledgeBaseId;
            this.data.hasJoin = e && 1 == e.status;
            this.$update();
            if (e && 1 == e.status);
            else this.getKbList();
          }._$bind(this),
        );
      },
      getKbList: function () {
        i._$listDocQaKb(
          {},
          function (e) {
            if (e && e.length > 0) this.data.kbList = e;
            else {
              this.data.useDefaultKb = !0;
              this.saveDocQaKb();
            }
            this.$update();
          }._$bind(this),
        );
      },
      saveDocQaKb: function () {
        i._$saveDocQaKb(
          { dto: { name: this.data.defaultKbName } },
          function (e) {
            if (e) this.data.defaultKbId = e;
            this.$update();
          }._$bind(this),
        );
      },
      joinOrCancelDoc: function (e, t) {
        var n = 1 == t ? this.data.knowledgeBaseId : e;
        i._$saveDocQaFileFromUnit(
          { unitId: this.data.unitId, kbId: n, cancel: t },
          function () {
            this.data.showMore = !1;
            if (1 == t) {
              this.data.hasJoin = !1;
              this.getKbList();
              a.showToastTips({ content: '取消成功', type: 1 });
            } else {
              this.data.knowledgeBaseId = e;
              this.data.hasJoin = !0;
              a.showToastTips({ content: '添加成功', type: 1 });
            }
            this.$update();
          }._$bind(this),
        );
      },
      toDocPage: function () {
        var e = 'SELECT_KB_' + (window.webUser && window.webUser.id);
        var t = localStorage.getItem(e);
        var n = this.data.knowledgeBaseId;
        if (t)
          if (t.split(',').indexOf(n.toString()) > -1) localStorage.setItem(e, t);
          else localStorage.setItem(e, t + ',' + n);
        else localStorage.setItem(e, n);
        var i = '//www.icourse163.org/documentQuestion.htm';
        window.open(i, '_blank');
      },
      destroy: function () {
        this.supr();
      },
    });
    return s;
  },
  'c05dd632e9d52734ddcf7eb505e23cb0',
  '4c8e3e49726e9626bdaa4895f1b1e5e4',
  '235c21779ec98ac90606962a862dadc9',
  'a936afb5ecab0e9286c3c9d05341571d',
  '07fb20540dab72c327de3dc584541c21',
);
EDU('1e48b10ef446f27504f14c515b0f3e54', function () {
  return {};
});
EDU(
  '65b898d277b0f056d537f0e2df45ff78',
  function (e, t, n) {
    var i = 'component-check-switcher';
    var o = e.$extends({
      config: function (e) {
        this._flushSetting(i, n);
        t.extend(this, { settingKey: i });
        t.extend({ status: !1, disable: !1, openText: '已开启', closeText: '已关闭' }, this.data);
        this.supr();
        this.$watch('status', this.emitStatusChange._$bind(this));
      },
      computed: {
        text: function (e) {
          if (e.status) return e.openText;
          else return e.closeText;
        },
      },
      init: function (e) {
        this.supr();
      },
      emitStatusChange: function (e) {
        if (e) this.$emit('open');
        else this.$emit('close');
      },
      toggleStatus: function () {
        if (!this.data.disable) {
          this.data.status = !this.data.status;
          this.$update();
          this.$emit('toggle', this.data.status);
        }
      },
      destroy: function () {
        this.supr();
      },
    });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '1e48b10ef446f27504f14c515b0f3e54',
);
EDU(
  'dc47c0cbd3590b02fac495009e67774a',
  '<div class="ux-check-switcher" r-class={{\'open\':status,\'disable\':disable}} on-click={this.toggleStatus()}>\n    <span class="ux-check-switcher-text">\n        {text}\n    </span>\n    <div class="ux-check-switcher-round"></div>\n</div>',
);
EDU(
  'd1c7a1711a7eef9ea73cb9f0398b5208',
  '.ux-check-switcher{position:relative;width:250px;height:30px;border-radius:15px;background-color:#dddddd;text-align:center;cursor:pointer;font-size:0;}.ux-check-switcher-text{line-height:30px;font-size:16px;color:#859295;}.ux-check-switcher-round{position:absolute;top:0;box-sizing:border-box;width:30px;height:30px;border-radius:15px;background-color:#ffffff;border:2px solid #dddddd;}.ux-check-switcher.disable{cursor:not-allowed;opacity:0.5;}.ux-check-switcher.open{background-color:#49AF4F;transition:all .2s ease;}.ux-check-switcher.open .ux-check-switcher-text{color:#ffffff;}.ux-check-switcher.open .ux-check-switcher-round{right:0;border:2px solid #49AF4F;}',
);
EDU(
  '1ee4132d3e572b8c83dffd6ef72c5208',
  function (e, t, n) {
    return e.$extends({ name: 'ux-check-switcher', css: n, template: t });
  },
  '65b898d277b0f056d537f0e2df45ff78',
  'dc47c0cbd3590b02fac495009e67774a',
  'd1c7a1711a7eef9ea73cb9f0398b5208',
);
EDU(
  'c97c700cbe5cc1ac9fa112564f3f7655',
  '<div class="music-unit">\n<p>本课程涉及到AI音乐教学功能，为了更好地学习体验，暂不支持PC端进行观看，请下载并打开中国大学MOOC APP进行学习</p>\n<img class="qr-code" src="//img-ph-mirror.nosdn.127.net/Rg6muO26iMOFWx9vwEHC-g==/6630234335885341999.png"\nalt="APP下载">\n<p class="tips">扫码下载APP</p>\n</div>',
);
EDU(
  '5ec29e5d3fbad2e25432a399e9a70ab0',
  '.music-unit{padding:50px 0 0 0;font-size:14px;font-family:PingFangSC, PingFangSC-Regular;font-weight:400;text-align:center;color:#666666;line-height:20px;}.music-unit .qr-code{margin-top:20px;}.music-unit .tips{font-size:12px;color:#999;margin-top:5px;}',
);
EDU(
  'de02e8d2bf60bf98f3242e97cb4dc007',
  function (e, t, n) {
    var i = n.$extends({
      name: 'music-unit',
      css: t,
      template: e,
      data: {},
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    return i;
  },
  'c97c700cbe5cc1ac9fa112564f3f7655',
  '5ec29e5d3fbad2e25432a399e9a70ab0',
  '235c21779ec98ac90606962a862dadc9',
);
EDU(
  'bc0e480fd32a7febbef6f6a9aec53542',
  '.music-unit {\n  padding: 50px 0 0 0;\n  font-size: 14px;\n  font-family: PingFangSC, PingFangSC-Regular;\n  font-weight: 400;\n  text-align: center;\n  color: #666666;\n  line-height: 20px; }\n  .music-unit .qr-code {\n    margin-top: 20px; }\n  .music-unit .tips {\n    font-size: 12px;\n    color: #999;\n    margin-top: 5px; }\n',
);
EDU(
  '72d45d4792047bd62a782346c4fcadc1',
  function (e, t, n) {
    var i = e.$extends({
      name: 'music-unit',
      css: n,
      template: t,
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  'de02e8d2bf60bf98f3242e97cb4dc007',
  'c97c700cbe5cc1ac9fa112564f3f7655',
  'bc0e480fd32a7febbef6f6a9aec53542',
);
EDU(
  '12b528595f4682da0afb7aaeb9b572e0',
  '<div class="lesson-live-wrapper"  id="j-content">\n{#if $$isLiveExist}\n<div class="main-area f-f0 liveExist">\n<div class="liveWrap" style="max-width: {this._getMaxWidthOfLiveWrapper()}px;">\n<live-info-head\nliveName={$$liveName}\nliveDateTime={$$liveDateTime}\nmemberNum={$$memberNum}\nshareTitle={$$shareTitle}\nshareTopic={$$shareTopic}\nshareDesc={$$shareDesc}\nsharePic={$$sharePic}\nshareUrl={$$shareUrl}\nliveStatus={$$liveStatus}\npresenterUrl={$$presenterUrl}\npresenterProfileImageUrl={$$presenterProfileImageUrl}\npresenterName={$$presenterName}\nshowPresenterInfo={false}\n></live-info-head>\n<div class="unitContentBox f-pr" ref="liveWrapBox">\n<live-wrap\nref="liveWrap"\nliveId={liveId}\nisLiveLearn={true}\n></live-wrap>\n</div>\n<div class="livePresenter f-pr f-cb">\n</div>\n</div>\n</div>\n{#else}\n<div class="main-area liveNotExist f-f0">\n<img src="//edu-image.nosdn.127.net/9AEA09F65245757822FA66B857CE01EF.png?imageView&thumbnail=447y300&quality=100"\nalt="{lang.KEY_LEARN_INVALID_LIVE}">\n</div>\n{/if}\n</div>',
);
EDU(
  '395bdf4ab3827a145e12c5bb9dcbb9ec',
  '.lesson-live-wrapper {\n  min-width: 675px; }\n  .lesson-live-wrapper .ux-share_up {\n    z-index: 9999; }\n  .lesson-live-wrapper .main-area {\n    padding-bottom: 100px;\n    padding-top: 20px; }\n  .lesson-live-wrapper .inline-block {\n    display: inline-block;\n    vertical-align: top; }\n  .lesson-live-wrapper .liveWrap {\n    max-width: 1267px;\n    min-width: 675px;\n    margin: 0 auto; }\n    .lesson-live-wrapper .liveWrap .unitTitle .name {\n      color: #000000; }\n    .lesson-live-wrapper .liveWrap .unitTitle .liveInfo__presenter__name {\n      color: inherit; }\n    .lesson-live-wrapper .liveWrap .unitContentBox {\n      height: auto; }\n      .lesson-live-wrapper .liveWrap .unitContentBox .j-unitctBar .j-share {\n        display: none; }\n  .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper {\n    padding-bottom: 22px;\n    font-size: 0px; }\n    .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .presenterInfo {\n      margin-top: 19px;\n      width: 20%; }\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .presenterInfo .nickName {\n        font-size: 16px; }\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .presenterInfo .schoolName {\n        font-size: 13px; }\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .presenterInfo .tag {\n        background-color: #FF7A3E;\n        font-size: 12px;\n        padding-top: 0px;\n        padding-bottom: 0px; }\n    .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .presenter .presenter-image {\n      width: 50px;\n      height: 50px;\n      margin-left: 0px;\n      margin-right: 15px; }\n    .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content {\n      width: calc(100% - 20% - 67px);\n      margin-top: 23px; }\n    .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .desc {\n      font-size: 14px;\n      color: #666666; }\n    .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content-head {\n      text-align: center;\n      font-size: 0px; }\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content-head .datetime,\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content-head .share {\n        vertical-align: middle; }\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content-head .datetime {\n        text-align: left;\n        width: 60%;\n        font-size: 14px; }\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content-head .share {\n        width: 40%;\n        text-align: right; }\n      .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content-head .u-icon-clock-icon {\n        margin-right: 7px; }\n        .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content-head .u-icon-clock-icon:before {\n          position: relative;\n          top: 1px; }\n  .lesson-live-wrapper .unitContentBox {\n    height: 610px; }\n    .lesson-live-wrapper .unitContentBox .live-wrap-wrapper .ux-live-pc-chat_write-content {\n      border: 1px solid #eeeeee; }\n  .lesson-live-wrapper .liveNotExist {\n    margin-top: 150px;\n    text-align: center;\n    font-size: 18px; }\n    .lesson-live-wrapper .liveNotExist .u-btn-discover {\n      font-size: 20px;\n      color: #f4f6f0;\n      padding: 0 50px;\n      display: inline-block;\n      height: 44px;\n      line-height: 44px;\n      background-color: #85b523;\n      border-radius: 5px;\n      margin-top: 20px; }\n  .lesson-live-wrapper .bigger {\n    width: 100% !important; }\n  .lesson-live-wrapper .ux-live-pc-player_status_tbar_h3 {\n    font-size: 32px; }\n  .lesson-live-wrapper .ux-mooc-polyv-live {\n    width: 1077px;\n    height: 480px;\n    position: relative; }\n  .lesson-live-wrapper #polyvPlayerBg {\n    position: absolute;\n    top: 33px;\n    width: 76.2%;\n    height: 413px;\n    left: 0px; }\n\n@media screen and (max-width: 1079px) {\n  .lesson-live-wrapper .livePresenter .live-presenter-info-wrapper .content {\n    width: calc(100% - 150px - 67px); } }\n',
);
EDU(
  '52bf85fbe934b39a8dab83a207ee9f33',
  '<div class="live-presenter-info-wrapper {class}">\n<a class="{$$linkStylesToggle}" href="{presenterUrl}" target="_blank">\n<div class="presenter inline-block">\n<div class="presenter-image" style="background-image: url({$$presenterProfileImageUrl})"></div>\n</div>\n</a>\n<div class="presenterInfo inline-block">\n<a class="{$$linkStylesToggle}" href="{presenterUrl}" target="_blank" class="presenterName f-fcgreen"><span class="nickName">{presenterName}</span></a>\n<span class="tag">主持人</span>\n<div class="schoolName"><a class="{$$linkStylesToggle}" href="{schoolUrl}" target="_blank">{schoolName}</a></div>\n</div>\n<p class="content inline-block">\n{#inc this.$body}\n</p>\n</div>',
);
EDU(
  '74ce2067e0a1851eee7f46b2d51ce722',
  '.live-presenter-info-wrapper {\n  font-size: 0px;\n  width: 100%; }\n  .live-presenter-info-wrapper .inline-block {\n    display: inline-block;\n    vertical-align: top; }\n  .live-presenter-info-wrapper .presenter {\n    line-height: 120px; }\n    .live-presenter-info-wrapper .presenter .presenter-image {\n      vertical-align: middle;\n      margin: 22px 22px 0px 22px;\n      border-radius: 50%;\n      width: 80px;\n      height: 80px;\n      background-size: 100%;\n      background-repeat: no-repeat; }\n  .live-presenter-info-wrapper .no-link {\n    cursor: inherit;\n    color: inherit;\n    text-decoration: inherit; }\n  .live-presenter-info-wrapper .presenterInfo {\n    margin-top: 32px;\n    font-size: 20px;\n    color: #ddd;\n    width: 19%;\n    min-width: 150px;\n    height: 60px; }\n    .live-presenter-info-wrapper .presenterInfo .tag {\n      background: #13a654;\n      padding: 1.5px 9px;\n      display: inline-block;\n      font-size: 14px;\n      color: #fff;\n      text-align: center; }\n    .live-presenter-info-wrapper .presenterInfo .schoolName {\n      color: #999;\n      font-size: 14px; }\n    .live-presenter-info-wrapper .presenterInfo .presenterName {\n      vertical-align: middle; }\n  .live-presenter-info-wrapper .content {\n    font-size: 14px;\n    min-width: 360px;\n    margin-top: 32px;\n    color: #999;\n    word-wrap: break-word;\n    width: calc(100% - 19% - 126px); }\n  .live-presenter-info-wrapper .foot-share-wrapper {\n    width: 200px;\n    margin-top: 4%;\n    text-align: center; }\n',
);
EDU(
  '052bb5990dd9f04804c028e7faa9809d',
  function (e, t, n, i) {
    var o = NEJ.P('edu.u');
    var a = {
      NAMES: { NO_LINK: 'no-link' },
      LINKS: { DEFAULT_PROFILE_IMAGE: '//mc.stu.126.net/res/images/ui/profile-image.png' },
    };
    var s = i.$extends({
      name: 'live-presenter-info',
      template: t,
      css: n,
      data: {
        presenterUrl: '',
        presenterProfileImageUrl: '',
        presenterName: '',
        schoolUrl: '',
        schoolName: '',
      },
      config: function () {
        this.supr();
      },
      computed: {
        $$linkStylesToggle: function () {
          return this.data.presenterUrl ? 'f-fcgreen' : a.NAMES.NO_LINK;
        },
        $$presenterProfileImageUrl: function () {
          return this.data.presenterProfileImageUrl || a.LINKS.DEFAULT_PROFILE_IMAGE;
        },
      },
      init: function () {
        this.supr();
      },
    });
    s.CONST = a;
    return s;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '52bf85fbe934b39a8dab83a207ee9f33',
  '74ce2067e0a1851eee7f46b2d51ce722',
  '235c21779ec98ac90606962a862dadc9',
);
EDU(
  'afe426fdcae7b771cb970d9ab5a70a3f',
  '<div class="live-wrap-wrapper polyv" ref="liveWrap">\n</div>',
);
EDU(
  '52a5c99cd736ff9eb728dcd2051013b3',
  '.live-wrap-wrapper {\n  min-height: 590px; }\n  .live-wrap-wrapper .mooc-video-player {\n    height: 590px; }\n  .live-wrap-wrapper .md-live-pc_chat .ux-live-pc-chat {\n    bottom: 76px;\n    left: 0;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    position: absolute; }\n    .live-wrap-wrapper .md-live-pc_chat .ux-live-pc-chat .ux-live-pc-chat_scroll {\n      padding-bottom: 45px;\n      margin-bottom: 0; }\n  .live-wrap-wrapper .ux-module-live-live-chat-send_notlogintip a {\n    color: #00CC7E; }\n    .live-wrap-wrapper .ux-module-live-live-chat-send_notlogintip a:hover {\n      color: #96D103; }\n\n.live-wrap-wrapper.polyv {\n  padding-bottom: 0;\n  padding-top: 0; }\n\n.live-wrap-wrapper .polyv-live-container {\n  display: none;\n  width: 100%;\n  height: 665px;\n  position: relative; }\n  .live-wrap-wrapper .polyv-live-container.show {\n    display: block; }\n  .live-wrap-wrapper .polyv-live-container__player {\n    height: 100%;\n    overflow: hidden;\n    top: 0;\n    left: 0;\n    width: auto;\n    right: 260px;\n    z-index: 10;\n    position: absolute; }\n  .live-wrap-wrapper .polyv-live-container__wrap {\n    width: 260px;\n    height: 100%;\n    z-index: 1;\n    bottom: 0;\n    right: 0;\n    overflow: hidden;\n    position: absolute; }\n    .live-wrap-wrapper .polyv-live-container__wrap .tab-online {\n      overflow-y: auto; }\n      .live-wrap-wrapper .polyv-live-container__wrap .tab-online > div {\n        height: 30% !important; }\n  .live-wrap-wrapper .polyv-live-container__local {\n    position: absolute;\n    z-index: 9;\n    right: 0;\n    top: 195px;\n    width: 260px;\n    height: 200px; }\n  .live-wrap-wrapper .polyv-live-container__teacher {\n    z-index: 9;\n    width: 260px;\n    height: 195px;\n    top: 0;\n    right: 0;\n    overflow: hidden;\n    position: absolute; }\n  .live-wrap-wrapper .polyv-live-container__ppt {\n    display: none;\n    z-index: 1;\n    width: 260px;\n    height: 195px;\n    top: 0;\n    right: 0;\n    overflow: hidden;\n    position: absolute; }\n    .live-wrap-wrapper .polyv-live-container__ppt-setting {\n      color: #fff;\n      position: absolute;\n      right: 10px;\n      top: 0;\n      float: left;\n      z-index: 9; }\n    .live-wrap-wrapper .polyv-live-container__ppt-apply {\n      color: #fff;\n      font-size: 14px;\n      position: absolute;\n      right: 10px;\n      bottom: 0;\n      float: left;\n      z-index: 9; }\n  .live-wrap-wrapper .polyv-live-container.triple .polyv-live-container__ppt {\n    display: block; }\n  .live-wrap-wrapper .polyv-live-container.triple .polyv-live-container__wrap {\n    height: calc(100% - 195px); }\n  .live-wrap-wrapper .polyv-live-container.mobile .polyv-live-container__player {\n    right: 0;\n    height: 5rem; }\n  .live-wrap-wrapper .polyv-live-container.mobile .polyv-live-container__wrap {\n    width: 100%;\n    height: calc(100% - 5rem); }\n',
);
EDU(
  '238589f971b1494b164029770fa923b4',
  '<!-- @TEMPLATE -->\n<!-- 模块主体结构模板 -->\n<div class="md-live-pc">\n    \n    <!-- <div class="md-live-pc_player f-pa" id="j-liveplayer-wrap">\n\n    </div>\n\n    <div class="md-live-pc_right f-pa" id="j-liveright">\n        <div class="md-live-pc_right_notice f-pa j-livenotice-wrap"></div>\n\n        <div class="md-live-pc_right_interactiveList f-pa j-live-interactiveList">\n        </div>\n\n        <div class="md-live-pc_right_mircophone f-pa j-live-mircophone">\n        </div>\n\n        <div class="md-live-pc_right_chat f-pa j-livechat-wrap"></div>\n    </div>\n\n    <div class="md-live-pc_deleted f-pa j-deleted">\n        <div class="md-live-pc_deleted_mid f-pa">\n            <div class="md-live-pc_deleted_ic ux-icon-sad f-fl"></div>\n            <div class="md-live-pc_deleted_rcon f-fl">\n                <h4 class="md-live-pc_deleted_bt">哎呀，该直播已不存在了</h4>\n                <p class="md-live-pc_deleted_in">直播可能被讲师删除了</p>\n            </div>\n        </div>\n    </div> -->\n\n</div>\n<!-- /@TEMPLATE -->\n',
);
EDU(
  '95505edb0cbde6bef675ad0664625223',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h, p, m, b) {
    var g = o
      .$extends({
        name: 'ux-live-pc-player',
        config: function () {
          a.extend(this, {
            liveConstant: f,
            liveUnstartCustomUI: p.get('live-pc').liveUnstartCustomUI,
            clockUIs: {},
          });
          a.extend(this.data, {
            liveMethodType: null,
            liveContentId: '',
            liveCover: '',
            liveTitle: '',
            liveStartTime: 0,
            accurateStartTime: 0,
            liveEndTime: 0,
            accurateFinishedTime: 0,
            liveStatus: null,
            playBackVideoData: null,
            showLiveInIdleFlag: !1,
            showLiveStreamErrorFlag: !1,
            waterMark: !1,
            waterMarkContent: '',
            notAllowFullScreen: !1,
            lang: e,
          });
          this.supr();
        },
        init: function () {
          this.supr();
          this._cacheIns = u.Live._$allocate({});
          this._getLiveInfo();
        },
        _getLiveInfo: function (e) {
          if (e) this._updateLiveInfo();
          else
            setTimeout(
              function () {
                this._updateLiveInfo();
              }._$bind(this),
              0,
            );
        },
        _updateLiveInfo: function () {
          this._cacheIns._$getLiveInfo({
            data: { liveContentId: this.data.liveContentId },
            onload: function (e) {
              if (void 0 !== e.result) e = e.result;
              this.updateLiveInfo(e);
              m._$dispatchEvent(b.EVT_LIVE_STATUS, e);
              this.$emit('updateLiveInfo', e);
            }._$bind(this),
          });
        },
        updateLiveInfo: function (e) {
          if (e) {
            this.data.liveTitle = e.name;
            this.data.liveStatus = e.liveStatus;
            this.data.liveStartTime = e.liveStartTime;
            this.data.accurateStartTime = e.accurateStartTime;
            this.data.liveEndTime = e.liveFinishedTime;
            this.data.accurateFinishedTime = e.accurateFinishedTime;
            this.data.liveCover = e.liveCoverUrl;
            this.data.liveMethodType = e.liveMethodType;
            if (e.supportYD && e.lines && e.lines.length) this.data.lines = e.lines;
            this.$update();
            this._setCheckStatusHeartbeat(e.liveStatus);
            this._checkLiveStatus();
          } else {
            this._destroyLivePlayer();
            this._destroyPlayBackPlayer();
            this._clearClock();
          }
        },
        _setCheckStatusHeartbeat: function (e) {
          if (!this.__checkLiveStatusId) {
            var t = 30;
            this.__checkLiveStatusId = setInterval(this._getLiveInfo._$bind(this, !0), 1e3 * t);
          }
        },
        _clearStatusHeartbeat: function () {
          if (this.__checkLiveStatusId) {
            clearInterval(this.__checkLiveStatusId);
            this.__checkLiveStatusId = null;
          }
        },
        _checkLiveStatus: function () {
          if (this.data.liveStatus == f.LIVE_STATUS_NOTSTART) {
            var e = this.data.liveStartTime - h._$getCurServerTime() - 18e5;
            this._setClock('notstart', e / 1e3);
          } else if (this.data.liveStatus == f.LIVE_STATUS_COMING)
            this._setClock('coming', (this.data.liveStartTime - h._$getCurServerTime()) / 1e3);
          else if (this.data.liveStatus == f.LIVE_STATUS_DELAY_START);
          else if (this.data.liveStatus == f.LIVE_STATUS_PLAYING) {
            this._genLivePlayer();
            if (!this.__checkLiveProgressId)
              this.__checkLiveProgressId = setInterval(
                this._checkLiveProgress._$bind(this, !0),
                1e3,
              );
            this._setClock('playing', (this.data.liveEndTime - h._$getCurServerTime()) / 1e3);
          } else if (this.data.liveStatus == f.LIVE_STATUS_INVALID) this._clearStatusHeartbeat();
          else if (this.data.liveStatus == f.LIVE_STATUS_END) {
            this._destroyLivePlayer();
            this._clearStatusHeartbeat();
            if (this.__checkLiveProgressId) {
              clearTimeout(this.__checkLiveProgressId);
              this.__checkLiveProgressId = null;
            }
          } else if (this.data.liveStatus == f.LIVE_STATUS_TRANSFORM_COMPLETE) {
            this._genPlayBackPlayer();
            this._clearStatusHeartbeat();
          }
        },
        _setClock: function (e, t, n) {
          if (!this.clockUIs[e]) {
            if (t < 0) t = 0;
            var i = new d({ data: { class: 'f-ib' } });
            this.clockUIs[e] = i;
            if (n) i.$inject(n);
            i.$on(
              'finish',
              function () {
                this._clearStatusHeartbeat();
                this._getLiveInfo();
              }._$bind(this),
            );
            i.setTime(parseInt(t));
            i.start();
          }
        },
        _clearClock: function () {
          t._$forEach(this.clockUIs, function (e, t) {
            e && e.destroy();
          });
        },
        _checkLiveProgress: function () {
          if (f.LIVE_METHOD_TYPE_OBS != this.data.liveMethodType)
            if (this.data.accurateFinishedTime - h._$getCurServerTime() <= 15e3)
              if (!this._hasSetTimeoutNotif) {
                this._hasSetTimeoutNotif = !0;
                l.warning(e.KYE_LIB_PCPLAYER_TIMEOUT_LIVE_FINISH, 15e3);
              }
        },
        _genLivePlayer: function () {
          var e, t, n;
          if (this.data.lines && this.data.lines.length) {
            e = this.data.lines[0].ratios[0].rtmpUrl;
            t = this.data.lines[0].ratios[0].flvUrl;
          }
          if (!this._hasGenLivePlayer) {
            this._hasGenLivePlayer = !0;
            if (!this.data.lines || !this.data.lines.length) this._getStreamUrl();
            else {
              n = {
                liveId: this.data.liveContentId,
                liveTitle: this.data.liveTitle,
                liveStartTime: this.data.liveStartTime,
                liveEndTime: this.data.liveEndTime,
                defaultRtmpStreamUrl: e,
                defaultFlvStreamUrl: t,
                lines: this.data.lines,
              };
              this._genVideoPlayer(n);
            }
          }
        },
        _getStreamUrl: function () {
          this._cacheIns._$getStraamUrl({
            data: { liveContentId: this.data.liveContentId, isWeb: this.isIPad ? '0' : '1' },
            onload: function (e) {
              this._onGetStramUrl(e);
            }._$bind(this),
          });
        },
        _genVideoPlayer: function (e) {
          this._livePlayerUI = new r({
            data: {
              useH5: this.data.useH5,
              autoStart: c._$isMobileAll() ? !1 : !0,
              notAllowFullScreen: this.data.notAllowFullScreen,
              waterMark: this.data.waterMark,
              waterMarkContent: this.data.waterMarkContent,
              videoData: e,
            },
          }).$inject(this.$refs.livePlayerNode);
          this._livePlayerUI.$on('onLiveStreamClosed', this._onLiveStreamClosed._$bind(this));
          m._$dispatchEvent(b.EVT_LIVE_PLAYER_INS_INITED, this._livePlayerUI);
        },
        _onGetStramUrl: function (e) {
          if (e) {
            var t = {
              liveId: this.data.liveContentId,
              liveTitle: this.data.liveTitle,
              liveStartTime: this.data.liveStartTime,
              liveEndTime: this.data.liveEndTime,
              defaultRtmpStreamUrl: e.liveRtmpStreamUrl || e.liveStreamUrl,
              defaultFlvStreamUrl: e.liveFlvStreamUrl,
              defaultHlsStreamUrl: e.liveHlsStreamUrl,
              streamUrlReqAdr: e.liveChannelYoudaoDetail
                ? e.liveChannelYoudaoDetail.pullUrlGet
                : null,
            };
            this._genVideoPlayer(t);
          }
        },
        _onLiveStreamClosed: function () {},
        showLiveInIdle: function () {
          this.data.showLiveInIdleFlag = !0;
          this.$update();
        },
        showLiveStreamError: function () {
          this.data.showLiveStreamErrorFlag = !0;
          this.$update();
        },
        checkReload: function () {
          if (this._livePlayerUI) {
            this.data.showLiveStreamErrorFlag = !1;
            this.$update();
            try {
              this._livePlayerUI.checkLiveReload();
            } catch (e) {}
          }
        },
        _destroyLivePlayer: function () {
          if (this._livePlayerUI)
            try {
              this._livePlayerUI.destroy();
              this._livePlayerUI = null;
            } catch (e) {
              console.warn(e);
            }
          if (this.$refs && this.$refs.livePlayerNode) {
            var t = n._$getChildren(this.$refs.livePlayerNode);
            if (t) for (var i = 0; i < t.length; i++) this.$refs.livePlayerNode.removeChild(t[i]);
          }
        },
        _genPlayBackPlayer: function () {
          if (!this._playBackPlayerUI) {
            this._playBackPlayerUI = new s({
              data: {
                waterMark: this.data.waterMark,
                waterMarkContent: this.data.waterMarkContent,
                notAllowFullScreen: this.data.notAllowFullScreen,
                videoData: this.data.playBackVideoData,
              },
            }).$inject(this.$refs.playBackPlayerNode);
            this._playBackPlayerUI.$on(
              'onPlay',
              function (e) {
                this.$emit('PlayBackPlay', e);
              }._$bind(this),
            );
            this._playBackPlayerUI.$on(
              'onPauseClick',
              function (e) {
                this.$emit('PlayBackPauseClick', e);
              }._$bind(this),
            );
            this._playBackPlayerUI.$on(
              'onSeek',
              function (e) {
                this.$emit('PlayBackSeek', e);
              }._$bind(this),
            );
            this._playBackPlayerUI.$on(
              'onPlayEnd',
              function (e) {
                this.$emit('PlayBackEnd', e);
              }._$bind(this),
            );
          }
        },
        getPlayBackStateInfo: function (e) {
          this._playBackPlayerUI && this._playBackPlayerUI.getStateInfo(e);
        },
        _destroyPlayBackPlayer: function () {
          if (this._playBackPlayerUI) {
            this._playBackPlayerUI.destroy();
            this._playBackPlayerUI = null;
          }
          if (this.$refs && this.$refs.playBackPlayerNode) {
            var e = n._$getChildren(this.$refs.playBackPlayerNode);
            if (e)
              for (var t = 0; t < e.length; t++) this.$refs.playBackPlayerNode.removeChild(e[t]);
          }
        },
        destroy: function () {
          this._destroyLivePlayer();
          this._destroyPlayBackPlayer();
          this._clearClock();
          this._clearStatusHeartbeat();
          this.supr();
        },
      })
      .filter({});
    return g;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '4b2a52ea911cc1cabd5156fdc88e88a2',
  '838594f8af8a76858b8ceed990333912',
  'beec6201069596ecb83a09e5fc3eb415',
  'f16163ac846a07f5993da5026e5efada',
  '29f555f70e6e64cf8315ed720772ced1',
  'abe9a6b99742882e8efaadd2518b0cb2',
  '9dc508f2eef931918f19fafe68ba902b',
  'e3c72a3eb3b9f2c3bb2bb123118a374f',
  '89a466f05573f560c156411121b8daae',
  '8f34a99b20d362b3542aebd517390fc1',
  '665b4e36772193beffe50de855029c13',
  '97edda62b43e7a7a70e398500c91441e',
);
EDU(
  '23eaf7797ac8fd05d371386cb5fce7ff',
  '<div class="ux-live-pc-player f-pa"> \n    {#if liveStatus == this.liveConstant.LIVE_STATUS_TRANSFORM_COMPLETE}\n    <div class="ux-live-pc-player_playerbox f-pa">\n        <div class="ux-live-pc-player_playerbox_videobox" ref=playBackPlayerNode></div>\n    </div>\n\n    {#elseif liveStatus != null}\n    <div class="ux-live-pc-player_playerbox f-pa">\n\n        {#if liveStatus == this.liveConstant.LIVE_STATUS_NOTSTART}\n        <div class="ux-live-pc-player_status" r-class={{\'ux-live-pc-player_customui\':!!this.liveUnstartCustomUI}}>\n            <div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-notstart"></div>\n            <div class="ux-live-pc-player_status_tbar f-pa">\n                <div class="ux-live-pc-player_status_tbar_bg"></div>\n                <div class="ux-live-pc-player_status_tbar_w f-pa">\n                    <h3 class="ux-live-pc-player_status_tbar_h3">{lang.KYE_LIB_PCPLAYER_LIVE_NOT_START}</h3>\n                    <p class="ux-live-pc-player_status_tbar_p">{lang.KYE_LIB_PCPLAYER_TIP_WAIT}</p>\n                    {#if this.liveUnstartCustomUI}\n                    <r-component is = {this.liveUnstartCustomUI}/>\n                    {/if}\n                </div>\n            </div>\n        </div>\n\n        {#elseif liveStatus == this.liveConstant.LIVE_STATUS_COMING}\n        <div class="ux-live-pc-player_status">\n            <div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-coming"></div>\n            <div class="ux-live-pc-player_status_tbar f-pa">\n                <div class="ux-live-pc-player_status_tbar_bg"></div>\n                <div class="ux-live-pc-player_status_tbar_w f-pa">\n                    <h3 class="ux-live-pc-player_status_tbar_h3">{lang.KYE_LIB_PCPLAYER_LIVE_TO_START}</h3>\n                    <p class="ux-live-pc-player_status_tbar_p">{lang.KYE_LIB_PCPLAYER_TIP_WAIT2}</p>\n                </div>\n            </div>\n        </div>\n\n        {#elseif liveStatus == this.liveConstant.LIVE_STATUS_DELAY_START}\n        <div class="ux-live-pc-player_status">\n            <div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-delay"></div>\n            <div class="ux-live-pc-player_status_tbar f-pa">\n                <div class="ux-live-pc-player_status_tbar_bg"></div>\n                <div class="ux-live-pc-player_status_tbar_w f-pa">\n                    <h3 class="ux-live-pc-player_status_tbar_h3">{lang.KYE_LIB_PCPLAYER_LIVE_TEACHER_NO_START}</h3>\n                    <p class="ux-live-pc-player_status_tbar_p">{lang.KYE_LIB_PCPLAYER_TIP_WAIT3}</p>\n                </div>\n            </div>\n        </div>\n\n        {#elseif liveStatus == this.liveConstant.LIVE_STATUS_INVALID}\n        <div class="ux-live-pc-player_status">\n            <div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-delay"></div>\n            <div class="ux-live-pc-player_status_tbar f-pa">\n                <div class="ux-live-pc-player_status_tbar_bg"></div>\n                <div class="ux-live-pc-player_status_tbar_w f-pa">\n                    <h3 class="ux-live-pc-player_status_tbar_h3">{lang.KYE_LIB_PCPLAYER_LIVE_EXPIRED}</h3>\n                    <p class="ux-live-pc-player_status_tbar_p">{lang.KYE_LIB_PCPLAYER_TIP_WAIT4}</p>\n                </div>\n            </div>\n        </div>\n            \n        {#elseif liveStatus == this.liveConstant.LIVE_STATUS_PLAYING}\n            {#if showLiveStreamErrorFlag}\n            <!-- 显示流异常 -->\n            <div class="ux-live-pc-player_status">\n                <div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-notstart"></div>\n                <div class="ux-live-pc-player_status_tbar f-pa">\n                    <div class="ux-live-pc-player_status_tbar_bg"></div>\n                    <div class="ux-live-pc-player_status_tbar_w f-pa">\n                        <h3 class="ux-live-pc-player_status_tbar_h3">{lang.KYE_LIB_PCPLAYER_NETERR_TIP}</h3>\n                        <p class="ux-live-pc-player_status_tbar_p">{lang.KYE_LIB_PCPLAYER_TIP_RETRY}<a class="th-fc8" on-click={this.checkReload()}>{lang.KYE_LIB_PCPLAYER_TIP_RECONNECT}</a></p>\n                    </div>\n                </div>\n            </div>\n            {/if}\n\n            {#if showLiveInIdleFlag}\n            <!-- 主播没来 -->\n            <div class="ux-live-pc-player_status">\n                <div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-end"></div>\n                <div class="ux-live-pc-player_status_tbar f-pa">\n                    <div class="ux-live-pc-player_status_tbar_bg"></div>\n                    <div class="ux-live-pc-player_status_tbar_w f-pa">\n                        <h3 class="ux-live-pc-player_status_tbar_h3">{lang.KYE_LIB_PCPLAYER_TEACHER_COMING}</h3>\n                    </div>\n                </div>\n            </div>    \n            {/if}\n\n            <div class="ux-live-pc-player_playerbox_videobox" ref=livePlayerNode></div>\n\n        {#elseif liveStatus == this.liveConstant.LIVE_STATUS_END}\n        <div class="ux-live-pc-player_status">\n            <div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-end"></div>\n            <div class="ux-live-pc-player_status_tbar f-pa">\n                <div class="ux-live-pc-player_status_tbar_bg"></div>\n                <div class="ux-live-pc-player_status_tbar_w f-pa">\n                    <h3 class="ux-live-pc-player_status_tbar_h3">{lang.KYE_LIB_PCPLAYER_FINISH_WAIT_REPLAY}</h3>\n                    <p class="ux-live-pc-player_status_tbar_p">{lang.KYE_LIB_PCPLAYER_DEAL_REPLAYING}</p>\n                </div>\n            </div>\n        </div>\n        {/if}\n\n    </div>\n    {/if}\n</div>\n',
);
EDU(
  'df04c050718b1699e45eb7d76893c32f',
  '@charset "UTF-8";.ux-live-pc-player{width:100%;height:100%;top:0;left:0;background-color:#000;}.ux-live-pc-player_playerbox{z-index:1;width:100%;height:100%;position:absolute;overflow:hidden;top:0;left:0;}.ux-live-pc-player_playerbox_videobox{width:100%;height:100%;}.ux-live-pc-player_status{z-index:10;position:absolute;width:100%;height:100%;top:0;left:0;}.ux-live-pc-player_status_img{width:100%;height:100%;background-position:center center;background-repeat:no-repeat;}.ux-live-pc-player_status_img-notstart{background-image:url(//mc.stu.126.net/res/module-live/images/live_status_bg1.jpg?83438ad580658022771e88acd07fed1e);}.ux-live-pc-player_status_img-coming{background-image:url(//mc.stu.126.net/res/module-live/images/live_status_bg1.jpg?83438ad580658022771e88acd07fed1e);}.ux-live-pc-player_status_img-delay{background-image:url(//mc.stu.126.net/res/module-live/images/live_status_bg2.jpg?bbb338974c30d62c9e1ecd95c1256ebf);}.ux-live-pc-player_status_img-end{background-image:url(//mc.stu.126.net/res/module-live/images/live_status_bg3.jpg?2d5454547f0cb52cf82520e7bab32c62);}.ux-live-pc-player_status_tbar{height:166px;width:100%;top:50%;left:0;margin-top:-83px;}.ux-live-pc-player_status_tbar_bg{height:100%;background-color:#fff;opacity:0.8;height:100%;}.ux-live-pc-player_status_tbar_w{width:100%;height:100%;top:0;left:0;color:#333;text-align:center;}.ux-live-pc-player_status_tbar_h3{font-size:36px;line-height:47px;margin-top:40px;}.ux-live-pc-player_status_tbar_p{font-size:18px;line-height:24px;margin-top:15px;}',
);
EDU(
  'e71dc3be9cd207b262db571dc93abf68',
  function (e, t, n) {
    return e.$extends({ name: 'ux-live-pc-player', css: n, template: t });
  },
  '95505edb0cbde6bef675ad0664625223',
  '23eaf7797ac8fd05d371386cb5fce7ff',
  'df04c050718b1699e45eb7d76893c32f',
);
EDU(
  '3baac7dd3a4f3fc21e3b476eaa33dd96',
  '<div class="um-user-answer-sheet">\n    <div class="answersheet-entry-wrap">\n        <div ref="qe" class="entry question-entry" r-class={{\'z-show\':isQEntryVisible}}\n             on-click={this.showQuestionModal()}></div>\n        <div ref="ae" class="entry answer-entry" r-class={{\'z-show\':isAEntryVisible}} \n        on-click={this.showAnswerModal()}></div>\n    </div>\n</div>\n',
);
EDU(
  '3f7e13933db824dc4e3ab51f27e7e980',
  '@charset "UTF-8";.um-user-answer-sheet .answersheet-entry-wrap .entry{z-index:1000;position:absolute;bottom:0;left:50%;margin-left:-42px;width:84px;height:42px;background:url(//mc.stu.126.net/res/module-live/images/user_answer_sheet_copy.png?d6377a11eded856e6e640f8059fbf72b) no-repeat;background-size:contain;-webkit-transition:0.25s ease-out transform;-moz-transition:0.25s ease-out transform;transition:0.25s ease-out transform;-webkit-transform:translateY(100%);-moz-transform:translateY(100%);-ms-transform:translateY(100%);-o-transform:translateY(100%);transform:translateY(100%);cursor:pointer;}.um-user-answer-sheet .answersheet-entry-wrap .entry:hover{background:url(//mc.stu.126.net/res/module-live/images/user_answer_sheet_hover.png?98e24e0d481200a61bc23c520f5e2fd6) no-repeat;background-size:contain;}.um-user-answer-sheet .answersheet-entry-wrap .entry.z-show{-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0);}@media (min-width: 1680px){.um-user-answer-sheet .answersheet-entry-wrap .entry{margin-left:-56px;width:112px;height:56px;background-size:contain;background-image:url(//mc.stu.126.net/res/module-live/images/user_answer_sheet_copy.png?d6377a11eded856e6e640f8059fbf72b);}}',
);
EDU(
  'ae3c1f8bf7a436af80c6fd95f3e56020',
  '<div class="ux-component-modal-slideModal {class}" r-class={{\'z-show\':visible}}>\n    <div class="mask" r-hide={!hasMask} on-click={this.hide()}></div>\n    <div class="container">\n        <div class="wrapper" ref="wrapper">\n            {#inc content}\n        </div>\n        {#if hasToggleBtn}\n            <button class="btn" on-click={this.toggle()}><span class="th-fc5 caret" r-class={{"ux-icon-caret-down":visible,"ux-icon-caret-up":!visible}}></span></button>\n        {/if}\n    </div>\n</div>\n',
);
EDU(
  'a3f370baeea30d540921f3d6084096e8',
  '.ux-component-modal-slideModal .mask{position:absolute;top:0;right:0;bottom:0;left:0;z-index:999;background:transparent;-webkit-transform:translateY(-100%);-moz-transform:translateY(-100%);-ms-transform:translateY(-100%);-o-transform:translateY(-100%);transform:translateY(-100%);-webkit-transition:.2s opacity ease-out,0s transform ease-out .2s;-moz-transition:.2s opacity ease-out,0s transform ease-out .2s;transition:.2s opacity ease-out,0s transform ease-out .2s;}.ux-component-modal-slideModal .container{position:absolute;bottom:0;border-top:1px solid #dcdcdc;width:100%;z-index:999;background:rgba(255,255,255,0.9);-webkit-transform:translateY(100%);-moz-transform:translateY(100%);-ms-transform:translateY(100%);-o-transform:translateY(100%);transform:translateY(100%);-webkit-transition:.2s transform ease-out;-moz-transition:.2s transform ease-out;transition:.2s transform ease-out;}.ux-component-modal-slideModal .container .btn{position:absolute;top:-10px;left:50%;margin-left:-25px;width:50px;height:10px;padding:0;border:1px solid #dcdcdc;border-bottom:0;line-height:10px;text-align:center;border-radius:2px 2px 0 0;background:rgba(255,255,255,0.9);font-size:12px;}.ux-component-modal-slideModal .container .btn:focus{outline:0;}.ux-component-modal-slideModal.z-show .mask{opacity:0.5;-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0);-webkit-transition:.2s opacity ease-out;-moz-transition:.2s opacity ease-out;transition:.2s opacity ease-out;}.ux-component-modal-slideModal.z-show .container{-webkit-transform:translateY(0);-moz-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0);}',
);
EDU(
  '2334d2d972df9316ff24a1d267677759',
  function (e, t, n, i, o) {
    return e.$extends({
      name: 'ux-component-modal-slideModal',
      css: n,
      template: t,
      config: function () {
        i.extend(this, { animationTime: 200 });
        i.extend(this.data, { hasToggleBtn: !0, isContainerOverflowHidden: !0 });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.data.visible) this.show();
      },
      toggle: function () {
        if (this.data.visible) this.hide();
        else this.show();
      },
      $inject: function (e) {
        if ('string' == typeof e) e = document.querySelector(e);
        if ('static' == o._$getStyle(e, 'position')) o._$style(e, { position: 'relative' });
        if (this.data.isContainerOverflowHidden)
          if ('visible' == o._$getStyle(e, 'overflow')) o._$style(e, { overflow: 'hidden' });
        return this.supr(e);
      },
    });
  },
  '516d81fc0fe9e695c8e9c36e27f51066',
  'ae3c1f8bf7a436af80c6fd95f3e56020',
  'a3f370baeea30d540921f3d6084096e8',
  '217dcfc103efb36d2f192eecc4548797',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU(
  '093e495cf234b7e82e0b95621a2f7c83',
  '<div class="um-user-answer-sheet-question-modal_cnt">\n    <um-user-answer-sheet-question-list-wrap liveId={liveId}\n                                                  quizId={quizId} />\n</div>\n',
);
EDU(
  '74f4daf406cf2f4b5bc788dd2bf3addc',
  '@charset "UTF-8";\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n',
);
EDU(
  '60cc6a5ffd372d7583828f1789b7537d',
  '<div class="um-user-answer-sheet-question-list-wrap">\n    <div class="pagination">\n        <p class="page th-fc4">第{index+1}/{total}题</p>\n    </div>\n    <div class="content">\n        <ux-slider-switcher ref="switcher" contentClass="list" itemClass="item" on-switch={this.onSwitcherChange($event)} emitWhenInit horizontal={false}>\n            <um-user-answer-sheet-question-list ref="questionlist" questions={answerSheet.questionList}\n                                                   on-hasFinished={this.onAnswer($event)} on-switch={this.onQuestionlistSwitch($event)}/>\n        </ux-slider-switcher>\n    </div>\n    {#if !isFirst}\n    <ux-button class="btn-left" value="上一题" state="gh" on-click={this.prev()}></ux-button>\n    {/if}\n    {#if !isLast}\n    <ux-button class="btn-right" value="下一题" on-click={this.next()}></ux-button>\n    {/if}\n    {#if isLast}\n    <ux-button class="btn-right" value={submitTxt} state={isSubmitted ? \'disabled\' : \'primary\'} on-click={this.submit()}></ux-button>\n    {/if}\n</div>\n',
);
EDU(
  '51c72d064fb9a1ab6601cc85ebb21a90',
  '@charset "UTF-8";.um-user-answer-sheet-question-list-wrap{position:relative;height:80px;font-size:14px;}.um-user-answer-sheet-question-list-wrap .pagination{position:absolute;left:20px;top:0;height:100%;line-height:100%;}.um-user-answer-sheet-question-list-wrap .pagination .page{margin-top:33px;}.um-user-answer-sheet-question-list-wrap .pagination .caret{position:absolute;left:13px;padding:5px;cursor:pointer;}.um-user-answer-sheet-question-list-wrap .pagination .caret.z-dis{color:#999;}.um-user-answer-sheet-question-list-wrap .pagination .ux-icon-thin-caret-up{top:13px;}.um-user-answer-sheet-question-list-wrap .pagination .ux-icon-thin-caret-down{bottom:13px;}.um-user-answer-sheet-question-list-wrap .ux-btn{width:96px;height:34px;}.um-user-answer-sheet-question-list-wrap .btn-right{position:absolute;right:20px;top:38px;}.um-user-answer-sheet-question-list-wrap .btn-left{position:absolute;right:128px;top:38px;}.um-user-answer-sheet-question-list-wrap .content{margin:0 130px 0 100px;height:100%;}@media (min-width: 1680px){.um-user-answer-sheet-question-list-wrap{height:110px;font-size:18px;}.um-user-answer-sheet-question-list-wrap .pagination{left:27px;}.um-user-answer-sheet-question-list-wrap .pagination .page{margin-top:46px;margin-left:-6px;}.um-user-answer-sheet-question-list-wrap .pagination .ux-icon-thin-caret-up{top:23px;}.um-user-answer-sheet-question-list-wrap .pagination .ux-icon-thin-caret-down{bottom:23px;}.um-user-answer-sheet-question-list-wrap .content{margin:0 160px 0 120px;}}',
);
EDU(
  'b0465c0f3ae90fb128794aabddeb5082',
  '<div ref="self" class="ux-slider-switcher {class}" style="width:{width};height:{height};">\n    {#inc this.$body||content}\n</div>\n',
);
EDU(
  '8d85cbe91f6b00f2420ce9e39c82fc5f',
  '.ux-slider-switcher-content{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0);}.ux-slider-switcher-content-h{position:relative;display:-webkit-box;display:-moz-box;display:box;display:-webkit-flex;display:-moz-flex;display:-ms-flexbox;display:flex;-webkit-transition:-webkit-transform .3s;-moz-transition:-moz-transform .3s;transition:transform .3s;width:100%;height:100%;}.ux-slider-switcher-item-h{-webkit-flex-shrink:0;-moz-flex-shrink:0;flex-shrink:0;-ms-flex-negative:0;}.ux-slider-switcher-content-v{position:relative;-webkit-transition:-webkit-transform .3s;-moz-transition:-moz-transform .3s;transition:transform .3s;width:100%;height:100%;}.ux-slider-switcher{overflow:hidden;}',
);
EDU(
  '81571a82bcaef5fff7faa9428fa963c8',
  function (e, t, n) {
    return e.$extends({ name: 'ux-slider-switcher', css: n, template: t });
  },
  '72e69d7ea3d8e3a1bbdeb9ca45794217',
  'b0465c0f3ae90fb128794aabddeb5082',
  '8d85cbe91f6b00f2420ce9e39c82fc5f',
);
EDU(
  'dc40156b3ab1b6a72101d826f903a411',
  '<div class="um-user-answer-sheet-question-list list {class}">\n    {#list questions as question}\n    <um-user-answer-sheet-question-generator ref="q{question_index}" questionData={question} on-hasFinished="hasFinished" on-focus="focus" on-blur="blur"></um-user-answer-sheet-question-generator>\n    {/list}\n</div>\n',
);
EDU(
  'da6ca8bcc9c1dd3a612d821f55756246',
  '@charset "UTF-8";.um-user-answer-sheet-question-list .um-user-answer-sheet-question-generator{width:100%;height:100%;}.um-user-answer-sheet-question-list .um-user-answer-sheet-question-fill-in{position:absolute;top:50%;margin-top:-15px;}@media (min-width: 1680px){.um-user-answer-sheet-question-list .um-user-answer-sheet-question-fill-in{margin-top:-20px;}}',
);
EDU(
  '119d6a86c6c59b9578016faca428790d',
  '<div class="um-user-answer-sheet-question-generator item th-bd2" ref="ele">\n    {#inc this.$body}\n</div>\n',
);
EDU(
  '7b9afd7e5e50d03911d654e4387c6246',
  '@charset "UTF-8";.um-user-answer-sheet-question-generator{position:relative;}',
);
EDU(
  'bc941246d2a905df5cd9a0df777e435b',
  '<div class="um-module-live-answer-sheet-choice-question {type}">\n    <div class="option-wrapper">\n        <ux-check-group\n            readonly={isReadonly}\n            class={isReadonlyClass} \n            source={UIData.liveAnswerOptions}\n            on-check={this.select($event)}>\n        </ux-check-group>\n    </div>\n    {#if type == \'view\'}\n        <div class="right-answer-wrapper">{UIData.rightAnswer}</div>\n        <div class="my-answer-wrapper {UIData.resultStyle.replace(\'th-wrong\', \'th-fc6\')}">{UIData.judgeResult}</div>\n    {/if}\n</div>\n',
);
EDU(
  '1d91763552878dbc823b7b3502dfa0e4',
  '@charset "UTF-8";.um-module-live-answer-sheet-choice-question{position:relative;}.um-module-live-answer-sheet-choice-question.edit{width:100%;height:100%;}.um-module-live-answer-sheet-choice-question.view{height:40px;}.um-module-live-answer-sheet-choice-question .option-wrapper{position:absolute;top:50%;left:0;display:inline-block;overflow:hidden;margin-top:-20px;width:430px;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group{font-size:0;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group .ux-check{position:relative;float:left;margin-right:20px;width:40px;height:40px;font-size:14px;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group .ux-check .check_box{border:none;background-color:transparent;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group .ux-check .check_box i{display:none;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group .ux-check span{font-size:16px;position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:40px;border-radius:100%;color:#ffffff;text-align:center;line-height:40px;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group.edit .ux-check .ux-check_unchecked + span{border-style:solid;border-width:1px;background-color:#fff;color:#3c4352;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group.view .ux-check{cursor:default;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group.view .ux-check .ux-check_unchecked + span{border-style:solid;border-width:1px;background-color:#e5e5e5;color:#999999;}.um-module-live-answer-sheet-choice-question .right-answer-wrapper,.um-module-live-answer-sheet-choice-question .my-answer-wrapper{position:absolute;top:50%;display:inline-block;margin-top:-20px;text-align:center;font-size:14px;line-height:40px;}.um-module-live-answer-sheet-choice-question .right-answer-wrapper{left:430px;width:280px;color:#333333;}.um-module-live-answer-sheet-choice-question .my-answer-wrapper{left:710px;width:200px;}.um-module-live-answer-sheet-choice-question .my-answer-wrapper.right{color:#45af54;}.um-module-live-answer-sheet-choice-question .my-answer-wrapper.wrong{color:#f6454a;}@media (min-width: 1680px){.um-module-live-answer-sheet-choice-question.view{height:50px;}.um-module-live-answer-sheet-choice-question .option-wrapper{margin-top:-25px;width:652px;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group{font-size:0;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group .ux-check{width:50px;height:50px;}.um-module-live-answer-sheet-choice-question .option-wrapper .ux-check-group .ux-check span{height:50px;line-height:50px;font-size:22px;}.um-module-live-answer-sheet-choice-question .right-answer-wrapper{width:424px;left:652px;font-size:18px;margin-top:-25px;line-height:50px;}.um-module-live-answer-sheet-choice-question .my-answer-wrapper{width:304px;left:1076px;font-size:18px;margin-top:-25px;line-height:50px;}}',
);
EDU(
  '0fd8827c50ed61c823e81a9616b748ce',
  function (e, t, n) {
    return e.$extends({ name: 'um-module-live-choice-question', css: n, template: t });
  },
  '2a7e2f64a34af1727c18e0084fc4716d',
  'bc941246d2a905df5cd9a0df777e435b',
  '1d91763552878dbc823b7b3502dfa0e4',
);
EDU(
  '290ddb0fa4eb1c4998e979124ad33c3b',
  '<div class="um-module-live-answer-sheet-true-false-question {type}">\n    <div class="option-wrapper">\n        <ux-radio-group\n            readonly={isReadonly}\n            class={isReadonlyClass}\n            source={UIData.liveAnswerOptions}\n            selected = {UIData.selected}\n            on-select={this.select($event)}>\n        </ux-radio-group>\n    </div>\n    {#if type == \'view\'}\n    <div class="right-answer-wrapper">{UIData.rightAnswer}</div>\n    <div class="my-answer-wrapper {UIData.resultStyle.replace(\'th-wrong\', \'th-fc6\')}">{UIData.judgeResult}</div>\n{/if}\n</div>\n',
);
EDU(
  '843ebf04b036db65d5a924384e314e1e',
  '@charset "UTF-8";.um-module-live-answer-sheet-true-false-question{position:relative;overflow:hidden;}.um-module-live-answer-sheet-true-false-question.edit{width:100%;height:100%;}.um-module-live-answer-sheet-true-false-question.view{height:40px;}.um-module-live-answer-sheet-true-false-question .option-wrapper{position:absolute;top:50%;left:0;margin-top:-20px;width:430px;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group{overflow:hidden;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group .ux-radio{position:relative;float:left;margin-right:14px;width:40px;height:40px;font-size:10px;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group .ux-radio .radio_box{width:100%;height:100%;border:none;background-color:transparent;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group .ux-radio .radio_box + span{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-radius:100%;color:#ffffff;text-align:center;line-height:40px;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group .ux-radio .radio_box i{display:none;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group.edit .ux-radio .ux-radio_unchecked{background-color:transparent;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group.edit .ux-radio .ux-radio_unchecked + span{border-style:solid;border-width:1px;background-color:#fff;color:#3c4352;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group.view .ux-radio{cursor:default;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group.view .ux-radio .ux-radio_unchecked + span{border-style:solid;border-width:1px;background-color:#e5e5e5;color:#999999;}.um-module-live-answer-sheet-true-false-question .right-answer-wrapper{position:absolute;top:50%;left:430px;margin-top:-20px;width:280px;color:#333333;text-align:center;font-size:14px;line-height:40px;}.um-module-live-answer-sheet-true-false-question .my-answer-wrapper{position:absolute;top:50%;left:710px;display:inline-block;margin-top:-20px;width:200px;text-align:center;font-size:14px;line-height:40px;}.um-module-live-answer-sheet-true-false-question .my-answer-wrapper.right{color:#45af54;}.um-module-live-answer-sheet-true-false-question .my-answer-wrapper.wrong{color:#f6454a;}@media (min-width: 1680px){.um-module-live-answer-sheet-true-false-question.view{height:50px;}.um-module-live-answer-sheet-true-false-question .option-wrapper{margin-top:-25px;width:652px;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group .ux-radio{width:50px;height:50px;line-height:50px;}.um-module-live-answer-sheet-true-false-question .option-wrapper .ux-radio2-group .ux-radio .radio_box + span{font-size:18px;line-height:50px;}.um-module-live-answer-sheet-true-false-question .right-answer-wrapper{width:424px;left:652px;font-size:18px;margin-top:-25px;line-height:50px;}.um-module-live-answer-sheet-true-false-question .my-answer-wrapper{width:304px;left:1076px;font-size:18px;margin-top:-25px;line-height:50px;}}',
);
EDU(
  '4a54f225fe2c22cb0ec9efccd1ac92c6',
  function (e, t, n) {
    return e.$extends({ name: 'um-module-live-true-false-question', css: n, template: t });
  },
  '5d70c70622b8efabe0749fe11a5ca3cf',
  '290ddb0fa4eb1c4998e979124ad33c3b',
  '843ebf04b036db65d5a924384e314e1e',
);
EDU(
  '480450a6d7e7e4c1178196d2c84b329d',
  '<div class="um-user-answer-sheet-question-fill-in">\n    {#if type === \'edit\'}\n    <ul class="fill-in-question-edit f-cb">\n        <ux-validation-container ref="validation">\n            {#list questionUIData.liveAnswerOptions as opt}\n            <li class="fill-in-item f-fl">\n                {#if questionUIData.liveAnswerOptions.length <=1}\n                <ux-input\n                    placeholder={"请输入答案"}\n                    disabled={questionUIData.liveAnswerSectionStudentDetail.isSubmitted}\n                    on-input={this.checkAnswerFinish()} on-blur={this.checkAnswerFinish()} blurValidate={false}\n                    value={questionUIData.liveAnswerSectionStudentDetail.submitAnswers[opt_index]}\n                    rules={this.answerRules}></ux-input>\n                {#else}\n                <ux-input\n                    placeholder={""+opt_index|placeholderFilter}\n                    disabled={questionUIData.liveAnswerSectionStudentDetail.isSubmitted}\n                    on-input={this.checkAnswerFinish()} on-blur={this.checkAnswerFinish()} blurValidate={false}\n                    value={questionUIData.liveAnswerSectionStudentDetail.submitAnswers[opt_index]}\n                    rules={this.answerRules}></ux-input>\n                {/if}\n            </li>\n            {/list}\n        </ux-validation-container>\n    </ul>\n    {#else}\n    <div class="fill-in-question-view f-cb">\n        <ul class="fill-in-question-view_answers">\n            {#list questionUIData.liveAnswerOptions as opt}\n            <li class="f-cb fill-in-question-view_answer">\n                <div class="fill-in-question-view_myAnswer f-fl">\n                    {questionUIData.liveAnswerSectionStudentDetail.submitAnswers[opt_index]}\n                </div>\n                <div class="fill-in-question-view_rightAnswer f-fl">\n                    {opt.standardAnswer}\n                </div>\n                <div class="fill-in-question-view_judgeResult f-fl fill-in-question-view_judgeResult_{questionUIData.resultStyle[opt_index].replace(\'th-wrong\', \'th-fc6\')}">\n                    {questionUIData.judgeResults[opt_index]}\n                </div>\n            </li>\n            {/list}\n        </ul>\n    </div>\n    {/if}\n</div>\n',
);
EDU(
  '3a5c429845f16255eda2d1892010ce00',
  '@charset "UTF-8";.um-user-answer-sheet-question-fill-in{font-size:14px;color:#333333;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item{margin-right:10px;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item .ux-input2{position:relative;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item .ux-tip{padding-left:0;position:absolute;left:0;top:32px;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item .ux-tip.ux-tip-error:before{display:none;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item .ux-input{box-sizing:border-box;width:160px;height:30px;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item .ux-input:disabled{border-color:#ccc;color:#999;background:#e5e5e5;}.um-user-answer-sheet-question-fill-in .fill-in-question-view{text-align:center;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_answer{line-height:1;margin-bottom:17px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_myAnswer{text-align:left;width:430px;min-height:1px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_rightAnswer{width:280px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_judgeResult{width:200px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_judgeResult_right{color:#45af54;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_judgeResult_wrong{color:#f6454a;}@media (min-width: 1680px){.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item{margin-right:12px;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item .ux-tip{top:42px;}.um-user-answer-sheet-question-fill-in .fill-in-question-edit .fill-in-item .ux-input{font-size:16px;width:260px;height:40px;line-height:40px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_answer{line-height:1;margin-bottom:25px;font-size:18px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_myAnswer{width:652px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_rightAnswer{width:424px;}.um-user-answer-sheet-question-fill-in .fill-in-question-view_judgeResult{width:304px;}}',
);
EDU(
  '380c4cdc6b0470f5a96ecbd3f14eccac',
  function (e, t, n) {
    return e.$extends({ name: 'um-module-live-fill-in-question', css: n, template: t });
  },
  '68d36f7e2df0f26b1f50e5a746e668bb',
  '480450a6d7e7e4c1178196d2c84b329d',
  '3a5c429845f16255eda2d1892010ce00',
  '9173c482d206c787516ab689a7b9e845',
  'f7a7f0a146b7050b707d24d8149041a6',
);
EDU(
  'ecda170843969623fadb54552d7a6475',
  function (e, t, n, i, o, a, s, r) {
    return e.$extends({
      name: 'um-user-answer-sheet-question-generator',
      css: n,
      template: t,
      init: function () {
        this.supr();
        this._question = this.generation(this.data.questionData.type);
        this._question.$on(
          'hasFinished',
          function (e) {
            this.$emit('hasFinished', e);
          }._$bind(this),
        );
      },
      generation: function (e) {
        var t;
        switch (e) {
          case o.MULTI_CHOICE:
            this.data.questionType = 'choice';
            t = new a({
              data: { questionData: this.data.questionData, type: this.data.type },
            }).$inject(this.$refs.ele);
            break;
          case o.TRUE_FALSE:
            this.data.questionType = 'judge';
            t = new s({
              data: { questionData: this.data.questionData, type: this.data.type },
            }).$inject(this.$refs.ele);
            break;
          case o.FILL_BLANK:
            this.data.questionType = 'fillin';
            t = new r({
              data: { questionData: this.data.questionData, type: this.data.type },
            }).$inject(this.$refs.ele);
        }
        i._$addClassName(this.$refs.ele, this.data.questionType);
        return t;
      },
    });
  },
  '1b4014e7109c0a22958042c6c404d25f',
  '119d6a86c6c59b9578016faca428790d',
  '7b9afd7e5e50d03911d654e4387c6246',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '8d98fbb0c61000406549c95ea6bf0417',
  '0fd8827c50ed61c823e81a9616b748ce',
  '4a54f225fe2c22cb0ec9efccd1ac92c6',
  '380c4cdc6b0470f5a96ecbd3f14eccac',
);
EDU(
  '2cd0713ca3f7316037039001853e4802',
  function (e, t, n) {
    return e.$extends({ name: 'um-user-answer-sheet-question-list', css: n, template: t });
  },
  '0e9b5e5f97540ffabe0b56db9841401e',
  'dc40156b3ab1b6a72101d826f903a411',
  'da6ca8bcc9c1dd3a612d821f55756246',
  'ecda170843969623fadb54552d7a6475',
);
EDU(
  '8dc5cf20baed1bbff3af83cc8e30ef99',
  function (e, t, n) {
    return e.$extends({
      name: 'um-user-answer-sheet-question-list-wrap',
      css: n,
      template: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
  },
  'e8aae7daf591b22a8176021ff81d7a7e',
  '60cc6a5ffd372d7583828f1789b7537d',
  '51c72d064fb9a1ab6601cc85ebb21a90',
  '81571a82bcaef5fff7faa9428fa963c8',
  '2cd0713ca3f7316037039001853e4802',
);
EDU(
  '150eae2c89b3fc74e500623a4ba54647',
  function (e, t, n, i) {
    return e.$extends({
      name: 'um-user-answer-sheet-question-modal',
      css: n,
      config: function () {
        i.extend(this, {});
        i.extend(this.data, { class: 'um-user-answer-sheet-question-modal', content: t });
        this.supr();
      },
    });
  },
  '2334d2d972df9316ff24a1d267677759',
  '093e495cf234b7e82e0b95621a2f7c83',
  '74f4daf406cf2f4b5bc788dd2bf3addc',
  '217dcfc103efb36d2f192eecc4548797',
  '8dc5cf20baed1bbff3af83cc8e30ef99',
);
EDU(
  'f6aa11897b23412c018c8650b8423a20',
  '<div class="um-user-answer-sheet-answer-modal_cnt th-bg1">\n    <header class="header f-cb">\n        <div class="myRecord th-fs2 th-fc5 f-fl">答题记录</div>\n        <div class="rightAnswer th-fs2 th-fc5 f-fl">正确答案</div>\n        <div class="myAnswer th-fs2 th-fc5 f-fl">答题结果</div>\n    </header>\n    <um-user-answer-sheet-answer-list questions={questions}></um-user-answer-sheet-answer-list>\n</div>\n',
);
EDU(
  '6c17abdc4167ba8ae5918406f0f58160',
  '@charset "UTF-8";\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n.um-user-answer-sheet-answer-modal .container {\n  min-width: 750px;\n}\n.um-user-answer-sheet-answer-modal_cnt {\n  box-sizing: border-box;\n  max-height: 430px;\n  min-width: 980px;\n  padding: 15px 20px 12px;\n  overflow: auto;\n}\n.um-user-answer-sheet-answer-modal_cnt .header {\n  text-align: center;\n}\n.um-user-answer-sheet-answer-modal_cnt .header .myRecord {\n  width: 460px;\n  text-align: left;\n}\n.um-user-answer-sheet-answer-modal_cnt .header .rightAnswer {\n  width: 280px;\n}\n.um-user-answer-sheet-answer-modal_cnt .header .myAnswer {\n  width: 200px;\n}\n\n@media (min-width: 1680px) {\n  .um-user-answer-sheet-answer-modal_cnt {\n    max-height: 590px;\n    min-width: 1480px;\n    padding: 20px 30px 20px;\n  }\n  .um-user-answer-sheet-answer-modal_cnt .header {\n    text-align: center;\n  }\n  .um-user-answer-sheet-answer-modal_cnt .header .myRecord {\n    width: 692px;\n    text-align: left;\n    font-size: 20px;\n  }\n  .um-user-answer-sheet-answer-modal_cnt .header .rightAnswer {\n    width: 424px;\n    font-size: 20px;\n  }\n  .um-user-answer-sheet-answer-modal_cnt .header .myAnswer {\n    width: 304px;\n    font-size: 20px;\n  }\n}\n',
);
EDU(
  '3664e566b35568de1ed127b5a134fffa',
  '<div class="um-user-answer-sheet-answer-list {class}">\n    {#list questions as question}\n    <um-user-answer-sheet-question-generator type="view" questionData={question}>\n        <span class="seq th-fs2 th-fc5">{question_index+1}.</span>\n    </um-user-answer-sheet-question-generator>\n    {/list}\n</div>\n',
);
EDU(
  'b5d42a6ebc7e70d727df0b442e842326',
  '@charset "UTF-8";.um-user-answer-sheet-answer-list .seq{position:absolute;top:27px;left:0;line-height:1;}.um-user-answer-sheet-answer-list .um-user-answer-sheet-question-generator{padding:14px 0 14px 30px;border-bottom-style:solid;border-bottom-width:1px;}.um-user-answer-sheet-answer-list .um-user-answer-sheet-question-generator.fillin{padding:19px 0 0 30px;}.um-user-answer-sheet-answer-list .um-user-answer-sheet-question-generator.fillin .seq{top:19px;}@media (min-width: 1680px){.um-user-answer-sheet-answer-list .seq{top:36px;font-size:20px;}.um-user-answer-sheet-answer-list .um-user-answer-sheet-question-generator{padding:20px 0 20px 40px;}.um-user-answer-sheet-answer-list .um-user-answer-sheet-question-generator.fillin{padding:30px 0 0 40px;}.um-user-answer-sheet-answer-list .um-user-answer-sheet-question-generator.fillin .seq{top:29px;}}',
);
EDU(
  'e43a9d9ee1a0342951e8f6255b4e9a2c',
  function (e, t, n) {
    return e.$extends({ name: 'um-user-answer-sheet-answer-list', css: n, template: t });
  },
  'ae543b6d451d05a33f46706699a7b05a',
  '3664e566b35568de1ed127b5a134fffa',
  'b5d42a6ebc7e70d727df0b442e842326',
  'ecda170843969623fadb54552d7a6475',
);
EDU(
  '52ed6e3df1f2290794b5ae5b3f7e446a',
  function (e, t, n, i) {
    var o = t.$extends({
      name: 'um-user-answer-sheet-answer-modal',
      data: { class: 'um-user-answer-sheet-answer-modal', content: n },
      css: i,
    });
    o.use(e);
    return o;
  },
  '76e02436c1565a0c8fb9abf57a7bbc35',
  '2334d2d972df9316ff24a1d267677759',
  'f6aa11897b23412c018c8650b8423a20',
  '6c17abdc4167ba8ae5918406f0f58160',
  'e43a9d9ee1a0342951e8f6255b4e9a2c',
);
EDU(
  '864d370e2f6d40783480b6bc6ebae0d7',
  function (e, t, n, i, o, a, s, r) {
    return t.$extends({
      name: 'um-user-answer-sheet',
      css: i,
      template: n,
      config: function () {
        o.extend(this.data, {});
        this.supr();
      },
      showQuestionModal: function () {
        if (this.qm) this.qm.show();
        else {
          this.qm = new s({ data: { liveId: this.liveId, quizId: this.quizId } }).$inject(
            this.data.mountDom,
          );
          this.qm.$on(
            'hide',
            function () {
              this.showQuestionEntry();
            }._$bind(this),
          );
          this.qm.$on(
            'show',
            function () {
              this.hideQuestionEntry();
            }._$bind(this),
          );
        }
      },
      showAnswerModal: function () {
        if (this.am) this.am.show();
        else {
          this.am = new r({ data: { liveId: this.liveId, quizId: this.quizId } }).$inject(
            this.data.mountDom,
          );
          this.am.$on(
            'hide',
            function () {
              this.showAnswerEntry();
            }._$bind(this),
          );
          this.am.$on(
            'show',
            function () {
              this.hideAnswerEntry();
            }._$bind(this),
          );
        }
      },
      endAnswer: function () {
        this.supr();
        a.show(e.KYE_LIB_USERANSWER_SHEET_TEACHER_STOP_ANSWER);
      },
      closeAnswer: function () {
        this.supr();
        a.show(e.KYE_LIB_USERANSWER_SHEET_TEACHER_CLOSE_EXERCISE);
      },
      hideAnswerModal: function () {
        this.supr();
        this.hideAnswerEntry();
      },
      hideQuestionModal: function () {
        this.supr();
        this.hideQuestionEntry();
      },
    });
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  '8e64365cbe06bc9335712c8b6f1e60c0',
  '3baac7dd3a4f3fc21e3b476eaa33dd96',
  '3f7e13933db824dc4e3ab51f27e7e980',
  '217dcfc103efb36d2f192eecc4548797',
  '29f555f70e6e64cf8315ed720772ced1',
  '150eae2c89b3fc74e500623a4ba54647',
  '52ed6e3df1f2290794b5ae5b3f7e446a',
);
EDU(
  '24fc459b087ee4ceba5d8a9ad4a32482',
  function (e, t, n, i, o) {
    var a = null;
    var s = e._$klass();
    o = s._$extend(t._$$EventTarget);
    o.__init = function (e) {
      this.__super(e);
      try {
        this._nim = window.SDK.NIM.getInstance(e);
      } catch (t) {
        console.log(t);
      }
    };
    o.__reset = function (e) {
      this.__super(e);
    };
    o.__destroy = function () {
      this._nim = null;
      this._doClearRet();
      this.__super();
    };
    o.getNim = function () {
      return this._nim;
    };
    i.getInstance = function (e) {
      if (!a) a = i.PackagedNim._$allocate(e);
      return a;
    };
    i.PackagedNim = s;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '06a1fe998ca2ede601d4740c114f6c3c',
);
EDU('7466ca8f1087578f6a02a7ef42f6a280', function () {
  return {
    'live-interactive-get': { method: 'GET', url: '/api/interactive/get' },
    'live-interactive-list': { method: 'GET', url: '/api/interactive/list' },
    'live-interactive-create': { url: '/api/interactive/create' },
    'live-interactive-delete': { url: '/api/interactive/delete' },
    'live-interactive-update': { url: '/api/interactive/update' },
    'live-interactive-sort': { url: '/api/interactive/sort' },
    'live-interactive-info-get': {
      method: 'GET',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/interactive/info/get',
    },
    'live-interactive-microphone-request': {
      rest: !0,
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/microphone/request',
    },
    'live-interactive-microphone-cancel': {
      rest: !0,
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/microphone/cancel',
    },
    'live-interactive-presenter-inform': {
      url: '//mozart.study.163.com/j/presenter/informServer.do',
      notShowLoading: !0,
    },
    'live-interactive-vcloudNoticeLive': {
      url: '//mozart.study.163.com/j/live/vcloudNoticeLive.do',
      notShowLoading: !0,
    },
    'live-interactive-isUpdateVersion': {
      url: '//mozart.study.163.com/j/live/updateVersion.json',
      notShowLoading: !0,
    },
    'live-interactive-liveClientCrash-log': {
      url: '//log.study.163.com/qyy/liveClientCrash/log.do',
      notShowLoading: !0,
    },
    'live-interactive-getscreenlocation': {
      url: '//mozart.study.163.com/api/v1/live/{liveId}/info/get',
      rest: !0,
      notShowLoading: !0,
    },
  };
});
EDU(
  'ca643d30a76212dcbe62390e2a0e3054',
  function (e, t, n, i, o, a, s) {
    var r = 'cache-live-interactive';
    var c = e._$klass();
    s = c._$extend(n.Cache);
    s.__init = function () {
      this._doFlushSetting(r, o);
      this.__super();
    };
    s._doLoadList = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-list', e);
    };
    s._doLoadItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-get', e);
    };
    s._doAddItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-create', e);
    };
    s._doDeleteItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-delete', e);
    };
    s._doUpdateItem = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-update', e);
    };
    s._doUpdateSort = function (e) {
      this.__super(e);
      this.__doSendRequest('live-interactive-sort', e);
    };
    s.getLiveInteractiveInfo = function (e) {
      this.__doSendRequest('live-interactive-info-get', e);
    };
    s.requestLiveInteractive = function (e) {
      this.__doSendRequest('live-interactive-microphone-request', e);
    };
    s.cancelLiveInteractive = function (e) {
      this.__doSendRequest('live-interactive-microphone-cancel', e);
    };
    s.informServer = function (e) {
      this.__doSendRequest('live-interactive-presenter-inform', e);
    };
    s.vcloudNoticeLive = function (e) {
      this.__doSendRequest('live-interactive-vcloudNoticeLive', e);
    };
    s.isUpdateVersion = function (e) {
      this.__doSendRequest('live-interactive-isUpdateVersion', e);
    };
    s.logLiveClientCrash = function (e) {
      this.__doSendRequest('live-interactive-liveClientCrash-log', e);
    };
    s.getScreenLocation = function (e) {
      e.data = e.data || {};
      e.data.queryKeys = ['layout'];
      this.__doSendRequest('live-interactive-getscreenlocation', e);
    };
    t._$$CustomEvent._$allocate({ element: c, event: 'listchange' });
    a.$do = n.$do._$bind(null, c);
    a.Interactive = c;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '7466ca8f1087578f6a02a7ef42f6a280',
);
EDU('f657f10b7466ef69e5081338d923dc35', function () {
  var e = {};
  e.checkCompatibility = function (e) {
    window.WebRTC.checkCompatibility().then(function (t) {
      console.log(t);
      e.call(this, t);
    });
  };
  e.checkCamera = function (e) {
    if (window.WebRTC)
      window.WebRTC.checkCompatibility().then(function (t) {
        console.log(t);
        e.call(this, t.Camera);
      });
    else e.call(this, !1);
  };
  e.checkMicrophone = function (e) {
    if (window.WebRTC)
      window.WebRTC.checkCompatibility().then(function (t) {
        console.log(t);
        e.call(this, t.Microphone);
      });
    else e.call(this, !1);
  };
  e.checkSupportInteractive = function (e) {
    if (window.WebRTC)
      window.WebRTC.checkCompatibility().then(function (t) {
        var n = !1,
          i = t.version.split('.') || [],
          o = 54,
          a = 0;
        if ('chrome' == t.browser.toLocaleLowerCase() && i[a] > o) n = !0;
        e.call(this, n);
      });
    else e.call(this, !1);
  };
  return e;
});
EDU(
  '61de5e0e5129c3d919aa4e0086972fa5',
  function (e) {
    var t = {};
    t.tipsTexts = {
      NO_MICROPHONE: '没有检测到麦克风',
      NO_CAMERA: '没有检测到摄像头',
      NOT_SUPPORTED: '当前浏览器不支持举手互动，请更换成Chrome浏览器 54.0以上版本',
      PRESENTER_REQUEST: '您是讲师，无法申请互动',
      FREQUENCY_LIMIT: '申请互动频率过高，请稍后再试',
      REJECT: '互动请求未被接受，请稍后再试',
      EXCEPTION: '服务器异常，请重新申请互动',
    };
    t.tipsTexts[e.MICRO_TYPE_DICT.VIDEO] = {
      REQUESTING: '视频互动请求中，请耐心等待',
      REQUEST_SUC: '已成功进入视频互动',
      ASK_REQUEST_END: '确定要结束视频互动吗？',
      REQUEST_END: '视频互动已结束',
    };
    t.tipsTexts[e.MICRO_TYPE_DICT.AUDIO] = {
      REQUESTING: '音频互动请求中，请耐心等待',
      REQUEST_SUC: '已成功进入音频互动',
      ASK_REQUEST_END: '确定要结束音频互动吗？',
      REQUEST_END: '音频互动已结束',
    };
    t.REQUEST_FREQUENCY = 1e3;
    t.TIMEOUT = 2e5;
    t.btnStatusDict = { UNFOLD: 0, FOLD: 2, DISABLE: 4, CANCEL: 6, END: 8 };
    t.btnObjDict = {
      0: {
        status: 'unfold',
        className: 'unfold',
        text: '<i class="icon-edu-live-handup-empty"></i>',
        fn: 'clickUnfoldBtn',
      },
      2: {
        status: 'fold',
        className: 'fold',
        text: '<i class="ux-icon ux-icon-wrong"></i>',
        fn: 'clickFoldBtn',
      },
      4: { status: 'disable', className: 'disable', text: '', fn: 'clickDisableBtn' },
      6: { status: 'cancel', className: 'cancel', text: '取消', fn: 'clickCancelBtn' },
      8: { status: 'end', className: 'end', text: '结束', fn: 'clickEndBtn' },
    };
    t.microIconObjDict = {};
    t.microIconObjDict[e.MICRO_TYPE_DICT.VIDEO] = { className: 'camera-empty' };
    t.microIconObjDict[e.MICRO_TYPE_DICT.AUDIO] = { className: 'microphone-empty' };
    t.serverCodeDict = {
      SUC: 0,
      LIMIT: 101,
      NOT_ALLOWED: 102,
      ERROR: 103,
      REPEATED: 104,
      AUDIO_ALREADY: 105,
      VIDEO_ALREADY: 106,
    };
    t.serverCodeTipsDict = {
      101: '申请互动名额已满，请稍后再试',
      102: '当前直播状态不允许请麦',
      103: '服务器异常，请重新申请互动',
      104: '视频互动请求中，请耐心等待',
      105: '',
      106: '',
    };
    return t;
  },
  'bcf071761289ae1019dcc5e22b391493',
);
EDU(
  '7b3ed6ca37be00bcd9b45e0cef3dc606',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f) {
    var h = t.$extends({
      config: function () {
        n.extend(this, {});
        n.extend(this.data, {
          liveId: 0,
          userId: 0,
          appType: 0,
          isUserLogin: !0,
          anonymousConf: null,
          interactiveConf: null,
        });
        this._interactiveCacheIns = c.Interactive._$allocate();
        this._microType = r.MICRO_TYPE_DICT.AUDIO;
        this.data.microIconObj = this.getMicroIconObj();
        this.hideMicroIcon();
        this.data.btnObj = this.getBtnObj('DISABLE');
        this._toastDuration = 2e3;
        this._toastSingle = !0;
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS,
          this._onUserOnlineMicrophoneSuc._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_FAILURE,
          this._onUserOnlineMicrophoneFail._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS,
          this._onUserOfflineMicrophoneSuc._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_REJECT_REQUEST_MICROPHONE,
          this._onUserMicrophoneReject._$bind(this),
        );
        s._$addEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_DETECT_TIME_OUT_REQUEST_MICROPHONE,
          this._onRequestMicroTimeout._$bind(this),
        );
        this.supr();
      },
      init: function () {
        this._getLiveInteractiveInfo();
        e._$addEvent(window, 'beforeunload', this.onBeforeunload._$bind(this));
        e._$addEvent(window, 'unload', this.onUnload._$bind(this));
        this.supr();
      },
      onBeforeunload: function (e) {
        var t;
        if ('unfold' !== this.data.btnObj.status) {
          t = 'xx';
          (e || window.event).returnValue = t;
          return t;
        }
      },
      onUnload: function () {
        if ('cancel' === this.data.btnObj.status) this._cancelLiveInteractive();
        else if ('end' === this.data.btnObj.status) this._endLiveInteractive();
      },
      mouseleave: function () {
        if ('fold' === this.data.btnObj.status) this.resetAppearance();
      },
      resetAppearance: function () {
        this.hideMicroIcon();
        this.data.btnObj = this.getBtnObj('UNFOLD');
        this.$update();
      },
      getMicroIconObj: function () {
        return l.microIconObjDict[this._microType];
      },
      showMicroIcon: function () {
        this.data.isShowMicroIcon = !0;
        this.$update();
      },
      hideMicroIcon: function () {
        this.data.isShowMicroIcon = !1;
        this.$update();
      },
      getBtnObj: function (e) {
        var t = 0;
        this._btnStatusDict = l.btnStatusDict;
        this._btnObjDict = l.btnObjDict;
        t = this._btnStatusDict[e] || this._btnStatusDict.UNFOLD;
        return this._btnObjDict[t];
      },
      clickUnfoldBtn: function () {
        if (this.data.isUserLogin)
          d.checkSupportInteractive(
            function (e) {
              _.log('互动兼容性检查:' + e);
              if (!this._accid || this._accid !== this._lectorAccid)
                if (e) {
                  this.data.btnObj = this.getBtnObj('FOLD');
                  this.$update();
                } else a.alert(l.tipsTexts.NOT_SUPPORTED);
              else o.warning(l.tipsTexts.PRESENTER_REQUEST, this._toastDuration, this._toastSingle);
            }._$bind(this),
          );
        else {
          var e =
            (this.data.anonymousConf && this.data.anonymousConf.loginTipText) ||
            '登录后才能参与直播间互动';
          var t = (this.data.anonymousConf && this.data.anonymousConf.loginBtnText) || '去登录';
          a.confirm('', e, t, '取消').$on('ok', function () {
            u._$dispatchEvent(f.EVT_CLICK_LOGIN, {});
          });
        }
      },
      clickFoldBtn: function () {
        this.resetAppearance();
        this.$update();
      },
      clickDisableBtn: function () {},
      clickCancelBtn: function () {
        this._cancelLiveInteractive();
      },
      clickEndBtn: function () {
        var e = l.tipsTexts[this._microType].ASK_REQUEST_END;
        a.confirm(e, '', '结束', '取消').$on(
          'ok',
          function () {
            this._endLiveInteractive();
          }._$bind(this),
        );
      },
      _endLiveInteractive: function () {
        this._contentObj.eventType = r.EVENT_TYPE_DICT.USER_OFFLINE_MICROPHONE;
        this._sendCustomSysMsg(this._contentObj);
      },
      clickVideoBtn: function () {
        d.checkMicrophone(
          function (e) {
            if (e)
              d.checkCamera(
                function (e) {
                  if (e) this._handleRequestMicro(r.MICRO_TYPE_DICT.VIDEO);
                  else {
                    o.warning(l.tipsTexts.NO_CAMERA, this._toastDuration, this._toastSingle);
                    this.resetAppearance();
                  }
                }._$bind(this),
              );
            else {
              o.warning(l.tipsTexts.NO_MICROPHONE, this._toastDuration, this._toastSingle);
              this.resetAppearance();
            }
          }._$bind(this),
        );
      },
      clickAudioBtn: function () {
        d.checkMicrophone(
          function (e) {
            if (e) this._handleRequestMicro(r.MICRO_TYPE_DICT.AUDIO);
            else {
              o.warning(l.tipsTexts.NO_MICROPHONE, this._toastDuration, this._toastSingle);
              this.resetAppearance();
              this.$update();
            }
          }._$bind(this),
        );
      },
      _handleRequestMicro: function (e) {
        if (this._checkFrequency()) {
          this._requestTime = +new Date();
          this._microType = e;
          this._requestLiveInteractive(this._microType, this._requestTime);
          o.success(
            l.tipsTexts[this._microType].REQUESTING,
            this._toastDuration,
            this._toastSingle,
          );
          this.data.btnObj = this.getBtnObj('DISABLE');
          this.data.microIconObj = this.getMicroIconObj();
          this.showMicroIcon();
          this.setTimeout();
          this.$update();
        } else o.warning(l.tipsTexts.FREQUENCY_LIMIT, this._toastDuration, this._toastSingle);
      },
      _onUserOnlineMicrophoneSuc: function () {
        this.clearTimeout();
        this.data.btnObj = this.getBtnObj('END');
        this.$update();
      },
      _onUserOfflineMicrophoneSuc: function () {
        o.success(l.tipsTexts[this._microType].REQUEST_END, this._toastDuration, this._toastSingle);
        this.resetAppearance();
        this.$update();
      },
      _onUserOnlineMicrophoneFail: function () {
        this.clearTimeout();
        o.warning(l.tipsTexts.EXCEPTION, this._toastDuration, this._toastSingle);
        this.resetAppearance();
        this._contentObj.eventType = r.EVENT_TYPE_DICT.USER_ONLINE_MICROPHONE_FAILURE;
        this._sendCustomSysMsg(this._contentObj);
      },
      _onUserMicrophoneReject: function () {
        this.clearTimeout();
        o.warning(l.tipsTexts.REJECT, this._toastDuration, this._toastSingle);
        this.resetAppearance();
      },
      _onRequestMicroTimeout: function () {
        this._cancelLiveInteractive(
          function () {
            this._onCancelLiveInteractive();
            o.warning(l.tipsTexts.REJECT, this._toastDuration, this._toastSingle);
          }._$bind(this),
        );
      },
      setTimeout: function () {
        this._st = window.setTimeout(
          function () {
            this._cancelLiveInteractive();
          }._$bind(this),
          l.TIMEOUT,
        );
      },
      clearTimeout: function () {
        window.clearTimeout(this._st);
      },
      _checkFrequency: function () {
        var e = +new Date();
        if (this._requestTime && e - this._requestTime < l.REQUEST_FREQUENCY) {
          o.warning(l.tipsTexts.FREQUENCY_LIMIT, this._toastDuration, this._toastSingle);
          return !1;
        }
        return !0;
      },
      _getLiveInteractiveInfo: function () {
        this._interactiveCacheIns.getLiveInteractiveInfo({
          data: { liveId: this.data.liveId, userId: this.data.userId, appType: this.data.appType },
          onload: this._onGetLiveInteractiveInfo._$bind(this),
        });
      },
      _onGetLiveInteractiveInfo: function (e) {
        var t = 0;
        this._connectedSayerList = e.connectedSayerList;
        this._accid = e.liveYunxinAccount.accid;
        this._token = e.liveYunxinAccount.token;
        this._lectorAccid = e.chatroomInfo.lectorAccount;
        this._imRoomId = e.chatroomInfo.imRoomId || e.chatroomInfo._imRoomId;
        this._appKey = e.chatroomInfo.appKey;
        this._packagedNim = i.getInstance({
          debug: !0,
          appKey: this._appKey,
          account: this._accid,
          token: this._token,
          oncustomsysmsg: this._oncustomsysmsg._$bind(this),
          onmyinfo: this._onmyinfo._$bind(this),
        });
        this.nimIns = this._packagedNim.getNim();
        this._contentObj = {
          eventType: -1,
          code: 0,
          fromAccid: this._accid,
          toAccid: this._lectorAccid,
          interactionRoomId: this.data.liveId,
          liveId: this.data.liveId,
          imroomId: this._imroomId,
          msgBody: { microType: this._microType || r.MICRO_TYPE_DICT.AUDIO },
        };
        for (; t < this._connectedSayerList.length; t++)
          if (this._connectedSayerList[t].accid === this._accid) {
            this._microType = this._contentObj.microType = this._connectedSayerList[t].microType;
            s._$dispatchEvent(r.EVENT_NAME_DICT.EVT_INTERACTIVE_JOIN_CHANNEL, this._contentObj);
          }
        this.resetAppearance();
        this.$emit('ready', {
          connectedList: this._connectedSayerList,
          nim: this.nimIns,
          lectorAccount: this._lectorAccid,
        });
      },
      _oncustomsysmsg: function (e) {
        var t = e.content;
        if ('string' == typeof t) t = JSON.parse(t);
        if (t.liveId == this.data.liveId) s.dispatchByMsg(e);
      },
      _onmyinfo: function (e) {
        this._yxNickName = e.nick;
      },
      _requestLiveInteractive: function (e, t) {
        _.log('请求能否互动', {
          microType: e,
          liveId: this.data.liveId,
          userId: this.data.userId,
          appType: this.data.appType,
          accid: this._accid,
          yxNickName: this._yxNickName,
        });
        this._interactiveCacheIns.requestLiveInteractive({
          headers: { 'Content-Type': 'application/json' },
          data: {
            liveId: this.data.liveId,
            userId: this.data.userId,
            appType: this.data.appType,
            accid: this._accid,
            yxNickName: this._yxNickName,
            microType: e,
            requestId: t,
          },
          onload: this._onRequestLiveInteractive._$bind(this),
          onerror: function () {
            _.log('请求能否互动失败');
            o.warning(l.tipsTexts.EXCEPTION, this._toastDuration, this._toastSingle);
            this.resetAppearance();
          }._$bind(this),
        });
      },
      _cancelLiveInteractive: function (e) {
        var t = {
          data: {
            liveId: this.data.liveId,
            appType: this.data.appType,
            userId: this.data.userId,
            accid: this._accid,
          },
        };
        t.onload =
          'function' == typeof e ? e._$bind(this) : this._onCancelLiveInteractive._$bind(this);
        this._interactiveCacheIns.cancelLiveInteractive(t);
      },
      _onRequestLiveInteractive: function (e) {
        _.log('请求能否互动回调成功', { code: e });
        if (e == l.serverCodeDict.SUC || e == l.serverCodeDict.REPEATED) {
          this.data.btnObj = this.getBtnObj('CANCEL');
          this.$update();
        } else if (e == l.serverCodeDict.AUDIO_ALREADY || e == l.serverCodeDict.VIDEO_ALREADY) {
          if (e == l.serverCodeDict.AUDIO_ALREADY) this._microType = r.MICRO_TYPE_DICT.AUDIO;
          else this._microType = r.MICRO_TYPE_DICT.VIDEO;
          this.data.microIconObj = this.getMicroIconObj();
          this.data.btnObj = this.getBtnObj('END');
          this.$update();
        } else {
          this.resetAppearance();
          if (l.serverCodeTipsDict[e])
            o.warning(l.serverCodeTipsDict[e], this._toastDuration, this._toastSingle);
        }
      },
      _onCancelLiveInteractive: function () {
        this.resetAppearance();
      },
      _sendCustomSysMsg: function (e) {
        if ('string' != typeof e) e = JSON.stringify(e);
        this.nimIns.sendCustomSysMsg({
          scene: 'p2p',
          to: this._lectorAccid,
          content: e,
          sendToOnlineUsersOnly: !0,
          done: this._onSendCustomSysMsg._$bind(this),
        });
      },
      _onSendCustomSysMsg: function (e, t) {
        if (e) this.nimIns.sendCustomSysMsg(t);
        else s.dispatchByMsg(t);
      },
      destroy: function () {
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS,
          this._onUserOnlineMicrophoneSuc._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_FAILURE,
          this._onUserOnlineMicrophoneFail._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS,
          this._onUserOfflineMicrophoneSuc._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_REJECT_REQUEST_MICROPHONE,
          this._onUserMicrophoneReject._$bind(this),
        );
        s._$delEvent(
          r.EVENT_NAME_DICT.EVT_PRESENTER_DETECT_TIME_OUT_REQUEST_MICROPHONE,
          this._onRequestMicroTimeout._$bind(this),
        );
        e._$delEvent(window, 'beforeunload', this.onBeforeunload);
        this.supr();
      },
    });
    return h;
  },
  '3f8f347c9171583dc1295dc796e8a1bf',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '24fc459b087ee4ceba5d8a9ad4a32482',
  '268c3257e756ea058b7f5849ce71559d',
  'abe9a6b99742882e8efaadd2518b0cb2',
  '9a447a3b597e896dca4aac83e1c86427',
  'bcf071761289ae1019dcc5e22b391493',
  'ca643d30a76212dcbe62390e2a0e3054',
  'f657f10b7466ef69e5081338d923dc35',
  '61de5e0e5129c3d919aa4e0086972fa5',
  '0b37bd19208cbac1c1ef61490b546431',
  '665b4e36772193beffe50de855029c13',
  '97edda62b43e7a7a70e398500c91441e',
);
EDU(
  '4cf786a7353cf1e9776f73fa1204c7b7',
  '<div class="um-live-interactive-process" on-mouseleave={this.mouseleave()}>\n    <div class="um-live-interactive-process_icon icon-edu-live-{microIconObj.className}"\n        r-hide={!isShowMicroIcon}>\n    </div>\n    <div\n        class="um-live-interactive-process_btn {btnObj.className}"\n        on-click={this[btnObj.fn]._$bind(this)()} r-html={btnObj.text}>\n    </div>\n    {#if btnObj.status == \'fold\'}\n    <div class="um-live-interactive-process_options">\n        <div class="um-live-interactive-process_opt" r-hide={!interactiveConf.isShowVideoInteractive} on-click={this.clickVideoBtn()}>\n            <i class="icon-edu-live-camera-empty"></i>\n            <span>视频</span>\n        </div>\n        <div class="um-live-interactive-process_opt" r-hide={!interactiveConf.isShowAudioInteractive} on-click={this.clickAudioBtn()}>\n            <i class="icon-edu-live-microphone-empty"></i>\n            <span>音频</span>\n        </div>\n    </div>\n    {/if}\n</div>\n',
);
EDU(
  '51930e6e7760297b47b8f64f0aef4fe3',
  '@charset "UTF-8";@font-face{font-family:"icon-edu-live";src:url(//icon.nosdn.127.net/2d56f012698f14c56c4b3d2b65b2b46b.eot);src:url(//icon.nosdn.127.net/2d56f012698f14c56c4b3d2b65b2b46b.eot) format("embedded-opentype"), url(//icon.nosdn.127.net/2a223c7268a1184422ad0ac088556c82.ttf) format("truetype"), url(//icon.nosdn.127.net/812782b3701741129dce89d976c9b96d.woff) format("woff"), url(//icon.nosdn.127.net/a687bad909bdda5a506faf446a542617.svg) format("svg");font-weight:normal;font-style:normal;}[class^=icon-edu-live-],[class*=" icon-edu-live-"]{font-family:"icon-edu-live" !important;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-style:normal;font-variant:normal;font-weight:normal;text-decoration:none;text-transform:none;line-height:1;}.icon-edu-live-camera-empty:before{content:"";}.icon-edu-live-camera:before{content:"";}.icon-edu-live-emoji:before{content:"";}.icon-edu-live-handup-empty:before{content:"";}.icon-edu-live-handup:before{content:"";}.icon-edu-live-microphone-empty:before{content:"";}.icon-edu-live-microphone:before{content:"";}.icon-edu-live-mute:before{content:"";}.icon-edu-live-notice-arrow:before{content:"";}.icon-edu-live-notice-horn:before{content:"";}.icon-edu-live-notice-horn2:before{content:"";}.icon-edu-live-notice-horn3:before{content:"";}.icon-edu-live-tupian:before{content:"";}.icon-edu-live-camera-empty-after:after{content:"";}.icon-edu-live-camera-after:after{content:"";}.icon-edu-live-emoji-after:after{content:"";}.icon-edu-live-handup-empty-after:after{content:"";}.icon-edu-live-handup-after:after{content:"";}.icon-edu-live-microphone-empty-after:after{content:"";}.icon-edu-live-microphone-after:after{content:"";}.icon-edu-live-mute-after:after{content:"";}.icon-edu-live-notice-arrow-after:after{content:"";}.icon-edu-live-notice-horn-after:after{content:"";}.icon-edu-live-notice-horn2-after:after{content:"";}.icon-edu-live-notice-horn3-after:after{content:"";}.icon-edu-live-tupian-after:after{content:"";}.um-live-interactive-process{position:relative;padding:20px;}.um-live-interactive-process_icon{height:28px;width:34px;box-sizing:border-box;color:#fff;line-height:28px;text-align:center;background-color:#2196F3;border-radius:28px;position:absolute;top:4px;left:32px;z-index:100;}.um-live-interactive-process_btn{width:54px;height:54px;box-sizing:border-box;border-radius:100%;background-color:#3C4A55;background-position:center center;background-repeat:no-repeat;background-size:24px;cursor:pointer;text-align:center;box-shadow:0px 2px 6px rgba(0, 0, 0, 0.5);}.um-live-interactive-process_btn:hover{background-color:rgba(60, 74, 85, 0.9);}.um-live-interactive-process_btn.unfold{padding-top:14px;color:#fff;text-align:center;font-size:24px;cursor:pointer;}.um-live-interactive-process_btn.fold{text-align:center;font-size:14px;color:#FFF;}.um-live-interactive-process_btn.fold .ux-icon-wrong{display:inline-block;margin-top:18px;}.um-live-interactive-process_btn.disable{cursor:wait;background-color:#b2b6bc;}.um-live-interactive-process_btn.cancel,.um-live-interactive-process_btn.end{font-size:14px;color:#fff;line-height:54px;}.um-live-interactive-process_btn.cancel::before{content:" ";display:block;width:54px;height:54px;box-sizing:border-box;border-radius:100%;border:2px solid #3C4A55;border-top-color:#2196F3;background-color:transparent;-webkit-animation:spin 1s infinite linear;-moz-animation:spin 1s infinite linear;animation:spin 1s infinite linear;position:absolute;z-index:0;}@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg);}}@-moz-keyframes spin{100%{-moz-transform:rotate(360deg);}}@keyframes spin{100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}.um-live-interactive-process_options{width:76px;position:absolute;bottom:75px;right:20px;}.um-live-interactive-process_opt{width:76px;height:36px;margin-bottom:10px;background-color:#2196F3;border-radius:36px;text-align:center;font-size:14px;color:#fff;line-height:36px;cursor:pointer;}.um-live-interactive-process_opt:hover{background-color:rgba(33, 150, 243, 0.9);}.um-live-interactive-process_opt .icon-edu-live-camera-empty,.um-live-interactive-process_opt .icon-edu-live-microphone-empty{vertical-align:text-top;}',
);
EDU(
  '2cd31b69273f8eaef051521582664008',
  function (e, t, n) {
    return e.$extends({ name: 'um--live-interactive-process', css: n, template: t });
  },
  '7b3ed6ca37be00bcd9b45e0cef3dc606',
  '4cf786a7353cf1e9776f73fa1204c7b7',
  '51930e6e7760297b47b8f64f0aef4fe3',
);
EDU('53341ee840b3b128f705d2b577117815', function (e) {
  e.getListKey = function (e, t) {};
});
EDU('1217725aa1f7c67daf8018ca27120adc', function () {
  return {
    'im-webrtc-get': { method: 'GET', url: '/api/webrtc/get' },
    'im-webrtc-list': { method: 'GET', url: '/api/webrtc/list' },
    'im-webrtc-create': { url: '/api/webrtc/create' },
    'im-webrtc-delete': { url: '/api/webrtc/delete' },
    'im-webrtc-update': { url: '/api/webrtc/update' },
    'im-webrtc-sort': { url: '/api/webrtc/sort' },
  };
});
EDU(
  'c05b94d8b8af4a92dbf100784275e06c',
  function (e, t, n, i, o, a, s, r, c) {
    var d = 'cache-im-webrtc',
      l = null;
    var _ = e._$klass();
    c = _._$extend(i.Cache);
    c.__init = function () {
      this._doFlushSetting(d, s);
      this.__super();
    };
    c._doLoadList = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-list', e);
    };
    c._doLoadItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-get', e);
    };
    c._doAddItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-create', e);
    };
    c._doDeleteItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-delete', e);
    };
    c._doUpdateItem = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-update', e);
    };
    c._doUpdateSort = function (e) {
      this.__super(e);
      this.__doSendRequest('im-webrtc-sort', e);
    };
    r.getInstance = function (e) {
      var t = window.SDK.NIM;
      var n = window.WebRTC;
      if (!t || !n) return null;
      t.use(n);
      if (!l) l = n.getInstance(e);
      return l;
    };
    c.joinChannel = function (e) {
      n._$dispatchEvent(this.constructor, 'joinChannel', e);
    };
    c.leaveChannel = function (e) {
      n._$dispatchEvent(this.constructor, 'leaveChannel', e);
    };
    t._$$CustomEvent._$allocate({
      element: _,
      event: ['listchange', 'joinChannel', 'leaveChannel'],
    });
    r.$do = i.$do._$bind(null, _);
    r.Webrtc = _;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '53341ee840b3b128f705d2b577117815',
  '1217725aa1f7c67daf8018ca27120adc',
);
EDU(
  '917969e471dbd9892e5b0a78d5790a16',
  '<div class="um-watermark f-pa" ref=root r-hide={!waterMark}>\n    <span class="um-watermark_content" style="{contentStyle}" r-hide={!showContent}>{waterMarkContent}</span>\n</div>\n',
);
EDU(
  '1925c3ef31a1cf16520111ad0ed1fec7',
  '@charset "UTF-8";.um-watermark{position:absolute;left:0;bottom:0;width:100%;top:0;z-index:3;pointer-events:none;}.um-watermark_content{line-height:1;color:#fff;position:absolute;top:0;left:0;}',
);
EDU(
  '91163032df3d891ca0bf8ef59449cd10',
  function (e, t, n, i, o, a, s, r) {
    var c = ['#fff', '#333'];
    var d = n.$extends({
      name: 'ux-watermark',
      css: t,
      template: e,
      config: function () {
        i.extend(this, {});
        i.extend(this.data, {
          waterMark: !1,
          waterMarkContent: '',
          showContent: !1,
          contentStyle: '',
          waterMarkColorIndex: 0,
        });
        this.supr();
        this._displayDuration = 12e3;
        this._restDuration = 0;
        this._opacity = 0.2;
        this._fontSize = 24;
      },
      init: function () {
        this.supr();
        this._bodyNode = this.$refs.root;
        if (this.data.waterMark) this.play();
      },
      _getPositionRandomAndSetColor: function () {
        this.data.waterMarkColorIndex = (this.data.waterMarkColorIndex + 1) % c.length;
        return {
          x: Math.random() * this._bodyNode.offsetWidth,
          y: Math.random() * (this._bodyNode.offsetHeight - 14),
        };
      },
      play: function () {
        this.stop();
        this._startDisplay();
      },
      _startDisplay: function () {
        this._displayTimer = setTimeout(
          function () {
            this._endDisplay();
            this._restTimer = setTimeout(
              function () {
                this._startDisplay();
              }._$bind(this),
              this._restDuration,
            );
          }._$bind(this),
          this._displayDuration,
        );
        var e = this._getPositionRandomAndSetColor();
        this.data.contentStyle =
          'left:' +
          e.x +
          'px; top:' +
          e.y +
          'px;opacity: ' +
          this._opacity +
          ';font-size: ' +
          this._fontSize +
          'px;color:' +
          c[this.data.waterMarkColorIndex];
        console.warn(this.data.contentStyle);
        this.data.showContent = !0;
        this.$update();
      },
      _endDisplay: function () {
        this.data.showContent = !1;
        this.$update();
      },
      stop: function () {
        if (this._restTimer) clearTimeout(this._restTimer);
        if (this._displayTimer) clearTimeout(this._displayTimer);
        this.data.showContent = !1;
        this.$update();
      },
    });
    return d;
  },
  '917969e471dbd9892e5b0a78d5790a16',
  '1925c3ef31a1cf16520111ad0ed1fec7',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
EDU(
  '911e04f713dbd1fbca1bda173610d1fd',
  function (e, t, n, i, o, a, s, r, c, d, l, _) {
    var u = 100;
    var f = t.$extends({
      config: function () {
        n.extend(this, { accountList: [] });
        n.extend(this.data, {
          liveId: null,
          account: '',
          lectorAccount: '',
          screenLocations: null,
          isShow: !1,
          screenSharingChromeExtensionId: '',
          supportBrowserWindShare: 0,
          isScreenSharingChromeExtensionInstalled: !1,
          amISharingScreen: !1,
          waterMark: !1,
          waterMarkContent: '',
        });
        this.supr();
        a._$addEvent(
          s.EVENT_NAME_DICT.EVT_INTERACTIVE_LEAVE_CHANNEL,
          this._cbLeaveChannel._$bind(this),
        );
        a._$addEvent(
          s.EVENT_NAME_DICT.EVT_INTERACTIVE_JOIN_CHANNEL,
          this._cbJoinChannel._$bind(this),
        );
        a._$addEvent(
          s.EVENT_NAME_DICT.EVT_PRESENTER_UPDATE_MAIN_SCREEN,
          this._onScreenLocationsChange._$bind(this),
        );
        if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage)
          chrome.runtime.sendMessage(
            this.data.screenSharingChromeExtensionId,
            'detect',
            null,
            function (e) {
              if ('installed' === e) {
                this.data.isScreenSharingChromeExtensionInstalled = !0;
                this.$update();
              }
            }._$bind(this),
          );
      },
      init: function () {
        this.supr();
        d.checkSupportInteractive(
          function (e) {
            if (e) {
              l.log('互动兼容性检查：' + e);
              this.Nim = r.getInstance().getNim();
              this.netcall = i.getInstance({
                nim: this.Nim,
                debug: !1,
                chromeId: this.data.screenSharingChromeExtensionId,
              });
              this._watchResize(this.$refs.root, this._resize._$bind(this));
              this._interactiveCache = o.Interactive._$allocate();
            }
          }._$bind(this),
        );
      },
      startScreenSharing: function () {
        return this.netcall
          .startDevice({ type: WebRTC.DEVICE_TYPE_DESKTOP_CHROME_SCREEN })
          .then(
            function (e) {
              console.log('screen sharing success', e);
              var t = this._getScreenByCurrentAccount();
              this.netcall.startLocalStream(t.node);
              t.node.getElementsByTagName('video')[0].srcObject.getVideoTracks()[0].onended =
                function () {
                  this.stopScreenSharing();
                }._$bind(this);
              this.data.amISharingScreen = !0;
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console.log('screen sharing cancelled or error', e);
              return this.stopScreenSharing();
            }._$bind(this),
          )
          .then(
            function (e) {
              this.$update();
            }._$bind(this),
          );
      },
      stopScreenSharing: function () {
        return new Promise(
          function (e) {
            this.netcall.stopLocalStream();
            this.data.amISharingScreen = !1;
            this.$update();
            e();
          }._$bind(this),
        )
          .then(
            function () {
              return this.netcall.startDevice({ type: WebRTC.DEVICE_TYPE_VIDEO });
            }._$bind(this),
          )
          .then(
            function (e) {
              var t = this._getScreenByCurrentAccount();
              this.netcall.startLocalStream(t.node);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              c.warning('启动摄像头失败');
              l.log('启动摄像头失败', e);
              console.error('启动摄像头失败:' + e);
            }._$bind(this),
          );
      },
      _getScreenByCurrentAccount: function (e) {
        var e = e || this.data.account;
        var t = this.data.screenLocations;
        for (var n = 0; n < t.length; n++) if (t[n].user === e && t[n].node) return t[n];
        return null;
      },
      _watchResize: function (e, t) {
        var n = e.offsetWidth,
          i = e.offsetHeight,
          o;
        var a = setInterval(function () {
          if (!o) {
            var a = e.offsetWidth;
            var s = e.offsetHeight;
            if (a !== n || s !== i)
              o = setTimeout(function () {
                if (e.offsetWidth == a && e.offsetHeight == s) {
                  n = a;
                  i = s;
                  t(a, s);
                }
                o = null;
              }, 200);
          }
        }, 100);
        return a;
      },
      destroy: function () {
        this.supr();
      },
      _cbJoinChannel: function (e) {
        l.log('加入房间申请成功回调，开始进入房间', e);
        var t = e.liveId;
        this.microType =
          e.msgBody.microType == s.MICRO_TYPE_DICT.AUDIO
            ? Netcall.NETCALL_TYPE_AUDIO
            : Netcall.NETCALL_TYPE_VIDEO;
        this.data.isVideo = this.microType === Netcall.NETCALL_TYPE_VIDEO;
        this._initWebRTCEvent();
        var n = {
          videoQuality: Netcall.CHAT_VIDEO_QUALITY_540P,
          videoFrameRate: Netcall.CHAT_VIDEO_FRAME_RATE_15,
          rtmpRecord: !0,
          splitMode: Netcall.LAYOUT_SPLITCUSTOM,
          layout: Netcall.LAYOUT_SPLITCUSTOM,
          highAudio: !0,
          liveEnable: !0,
        };
        this.netcall
          .joinChannel({ channelName: t, type: this.microType, liveEnable: !0, sessionConfig: n })
          .then(this._cbJoinChannelSucc._$bind(this))
          ['catch'](function (e) {
            console.error('进入房间失败：' + e);
            l.log('进入房间失败：', e);
            c.warning('请麦失败');
          });
      },
      _cbLeaveChannel: function (e) {
        l.log('有人离开了房间', e);
        var t = this.netcall,
          n = this;
        this.netcall
          .leaveChannel()
          .then(function (t) {
            a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS, {
              account: e.toAccid,
              microType: (e.msgBody || {}).microType,
            });
            n._clearScreenLocations();
            n.accountList = [];
          })
          ['catch'](function (t) {
            l.log('有人离开了房间，但是发生了错误', t);
            if ('noConnection' === t.code)
              a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS, {
                account: e.toAccid,
                microType: (e.msgBody || {}).microType,
              });
          });
      },
      _cbJoinChannelSucc: function (e) {
        l.log('进入房间成功');
        this._waterMarkUI && this._waterMarkUI.destroy();
        this._waterMarkUI = new _({
          data: { waterMark: this.data.waterMark, waterMarkContent: this.data.waterMarkContent },
        }).$inject(this.$refs.root);
        if (this.data.screenLocations) {
          var t = this.netcall,
            n = this,
            i = this.data.account,
            o = !(this.microType != Netcall.NETCALL_TYPE_VIDEO);
          t.startRtc()
            .then(function () {
              return t.startDevice({ type: Netcall.DEVICE_TYPE_AUDIO_IN })['catch'](function (e) {
                console.log('启动麦克风失败');
                l.log('启动麦克风失败', e);
                console.error(e);
              });
            })
            .then(function () {
              t.setCaptureVolume(255);
              n._addToAccountList(i);
              if (o)
                return new Promise(function (e, o) {
                  setTimeout(function () {
                    t.startDevice({ type: Netcall.DEVICE_TYPE_VIDEO, width: 221, height: 125 })
                      ['catch'](function (e) {
                        c.warning('启动摄像头失败');
                        l.log('启动摄像头失败', e);
                        console.error('启动摄像头失败:' + e);
                        o('启动摄像头失败:' + e);
                      })
                      .then(function () {
                        try {
                          l.log('当前为视频请麦，创建屏幕');
                          var a = n._addScreenLocation({ account: i });
                          l.log('当前视频请麦开始拉取本地流');
                          t.startLocalStream(a.node);
                          e();
                        } catch (s) {
                          o('startLocalStream error:' + s);
                        }
                      });
                  }, 2e3);
                });
            })
            .then(function () {
              t.changeRoleToPlayer();
              console.log('webrtc连接成功');
              l.log('webrtc连接成功');
            })
            ['catch'](function (e) {
              l.log('webrtc连接失败', e);
              a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_FAILURE, {});
              console.error('发生错误, 上麦失败：' + e);
              t.stopLocalStream();
              t.stopRemoteStream();
              t.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN);
              t.stopDevice(Netcall.DEVICE_TYPE_VIDEO);
              t.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL);
              t.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT);
              n._clearScreenLocations();
              n.accountList = [];
            });
        } else {
          l.log('先获取屏幕布局信息');
          this._getScreenLocations(this._cbJoinChannelSucc._$bind(this));
        }
      },
      _initWebRTCEvent: function () {
        var e = this.netcall,
          t = this;
        this._audioVolumeLastUpdateTime = new Date().getTime();
        e.on('remoteTrack', function (n) {
          console.log('收到远程轨道信息', n);
          l.log('新用户进入房间', n);
          a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS, {});
          t._addToAccountList(n.account);
          if ('audio' === n.track.kind) {
            l.log('新用户为音频请麦，播放声音');
            e.startDevice({ type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT })['catch'](function (e) {
              console.error('播放对方的声音失败:' + e);
            });
          }
          if ('video' === n.track.kind) {
            l.log('新用户为视频请麦，创建屏幕');
            var i = t._addScreenLocation(n);
            e.startRemoteStream({ account: n.account, uid: n.uid, node: i.node }).then(function () {
              t._checkVideoCanplay(i);
            });
          }
        });
        e.on('leaveChannel', function (e) {
          t._removeScreenLocation(e.account);
          t._deleteAccountList(e.account);
        });
        e.on('audioVolume', function (e) {
          if (new Date().getTime() - t._audioVolumeLastUpdateTime > u) {
            a._$dispatchEvent(s.EVENT_NAME_DICT.EVT_INTERACTIVE_VOLUME_CHANGE, e);
            t._audioVolumeLastUpdateTime = new Date().getTime();
          }
        });
        l.log('webrtc初始化完成');
      },
      _addToAccountList: function (e) {
        this.Nim.getUser({
          account: e,
          done: function (e, t) {
            var n = this.accountList;
            for (var i = n.length - 1; i >= 0; i--) if (n[i].account == t.account) n.splice(i, 1);
            if (t.account !== this.data.lectorAccount) this.accountList.unshift(t);
            a._$dispatchEvent(
              s.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU,
              this.accountList,
            );
          }._$bind(this),
        });
      },
      _deleteAccountList: function (e) {
        var t = this.accountList;
        for (var n = t.length - 1; n >= 0; n--) if (t[n].account == e) t.splice(n, 1);
        a._$dispatchEvent(
          s.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU,
          this.accountList,
        );
      },
      _getScreenLocations: function (e) {
        this._interactiveCache.getScreenLocation({
          data: { liveId: this.data.liveId },
          onload: function (t) {
            l.log('获取屏幕布局信息成功', t);
            this._cbGetScreenLocations(t);
            e && e();
          }._$bind(this),
          onerror: function (t) {
            l.log('获取屏幕布局信息失败', t);
            this._cbGetScreenLocations(null);
            e && e();
          }._$bind(this),
        });
      },
      _cbGetScreenLocations: function (e) {
        if (e && e.length)
          for (var t = 0; t < e.length; t++)
            if ('layout' == e[t].infoKey && e[t].infoValue) {
              var n = e[t].infoValue.locationIndexs && e[t].infoValue.locationIndexs[0];
              if (n) this.data.screenLocations = [n];
              break;
            }
        if (!this.data.screenLocations)
          this.data.screenLocations = [{ user: this.data.lectorAccount, index: 0 }];
      },
      _onScreenLocationsChange: function (e) {
        var t,
          e = e.msgBody;
        if (e.locationIndexs && e.locationIndexs[0]) {
          t = e.locationIndexs[0].user;
          if (this.data.screenLocations) {
            var n = -1,
              i = !1,
              o = -1;
            for (var a = 0; a < this.data.screenLocations.length; a++) {
              if (this.data.screenLocations[a].user == t) {
                n = a;
                i = this.data.screenLocations[a].isLector;
              }
              if (this.data.screenLocations[a].isLector) o = a;
            }
            if (!(n < 0 || 0 == n)) {
              if (i) {
                this.data.screenLocations[0].index = this.data.screenLocations[n].index;
                this.data.screenLocations[n].index = 0;
              } else {
                this.data.screenLocations[0].index = this.data.screenLocations[o].index;
                this.data.screenLocations[o].index = 0;
                this.data.screenLocations[o].index = this.data.screenLocations[n].index;
                this.data.screenLocations[n].index = 0;
              }
              this._restScreenLocation();
            }
          }
        } else;
      },
      _addScreenLocation: function (e) {
        var t = this._getScreenByCurrentAccount(e.account);
        if (t) return t;
        var n;
        if (
          this.data.screenLocations &&
          this.data.screenLocations[0] &&
          e.account == this.data.screenLocations[0].user
        ) {
          n = this.data.screenLocations[0];
          n.canPlay = !0;
          if (this.data.screenLocations[0].node)
            this.$refs.root.removeChild(this.data.screenLocations[0].node);
        } else {
          for (var i = 0; i < this.data.screenLocations.length; i++)
            if (this.data.screenLocations[i].user == e.account) {
              this.$refs.root.removeChild(this.data.screenLocations[i].node);
              this.data.screenLocations.splice(i, 1);
              break;
            }
          var o = !1;
          if (e.account == this.data.account && this.microType == Netcall.NETCALL_TYPE_VIDEO)
            o = !0;
          n = { user: e.account, canPlay: o };
          this.data.screenLocations.push(n);
        }
        var a = document.createElement('div');
        a.className = 'um-live-live-interactive-player_screen';
        var s = document.createElement('span');
        s.className = 'um-live-live-interactive-player_screen_nick';
        a.appendChild(s);
        this.$refs.root.appendChild(a);
        if (e.account == this.data.lectorAccount) s.innerText = '讲师';
        else
          this.Nim.getUser({
            account: e.account,
            done: function (e, t) {
              s.innerText = (t || {}).nick;
            },
          });
        n.node = a;
        this._restScreenLocation();
        return n;
      },
      _checkVideoCanplay: function (e) {
        var t = e.node;
        var n = t.getElementsByTagName('video')[0];
        if (n)
          n.addEventListener(
            'canplay',
            function () {
              l.log('视频流开始播放', e);
              e.canPlay = !0;
              this._resize();
            }._$bind(this),
          );
      },
      _removeScreenLocation: function (e) {
        for (var t = 0; t < this.data.screenLocations.length; t++)
          if (e == this.data.screenLocations[t].user) {
            this.$refs.root.removeChild(this.data.screenLocations[t].node);
            this.data.screenLocations.splice(t, 1);
            break;
          }
        this._restScreenLocation();
      },
      _restScreenLocation: function () {
        if (this.data.screenLocations.length) {
          if (this.data.screenLocations && this.data.screenLocations.length) {
            if (this.data.screenLocations.length > 4)
              this.data.screenLocations.splice(4, this.data.screenLocations.length - 4);
            var e,
              t = -1;
            for (var n = 0; n < this.data.screenLocations.length; n++) {
              if (this.data.screenLocations[n].user == this.data.lectorAccount) {
                this.data.screenLocations[n].isLector = !0;
                e = n;
              }
              if (0 == this.data.screenLocations[n].index) t = n;
            }
            if (t == -1) this.data.screenLocations[e].index = 0;
            this.data.screenLocations.sort(function (e, t) {
              return e.index - t.index;
            });
            for (var n = 0; n < this.data.screenLocations.length; n++)
              this.data.screenLocations[n].index = n;
          }
          l.log('当前屏幕数据', this.data.screenLocations);
          this._resize();
        }
      },
      _clearScreenLocations: function () {
        var t = e._$getChildren(this.$refs.root);
        if (t) for (var n = 0; n < t.length; n++) this.$refs.root.removeChild(t[n]);
        this.data.screenLocations = null;
        this.$update();
      },
      _resize: function () {
        if (this.data.screenLocations) {
          var e = [];
          for (var t = 0; t < this.data.screenLocations.length; t++)
            if (this.data.screenLocations[t].node && this.data.screenLocations[t].canPlay) {
              var n = {
                user: this.data.screenLocations[t].user,
                node: this.data.screenLocations[t].node,
                index: t,
              };
              e.push(n);
            }
          if (e.length) {
            var i = this.$refs.root.offsetWidth;
            var o = this.$refs.root.offsetHeight;
            var a, s, r, c, d, l;
            if (1 == e.length) {
              a = i;
              s = 0.57 * i;
              l = (o - s) / 2;
            } else {
              a = 0.775 * i;
              s = 0.775 * i * 0.57;
              r = 0.225 * i;
              c = 0.225 * i * 0.57;
              d = (s - 3 * c) / 2;
              l = (o - s) / 2;
            }
            var _;
            for (var t = 0; t < e.length; t++) {
              _ = e[t].node;
              if (0 == t) {
                _.style.width = a + 'px';
                _.style.height = s + 'px';
                _.style.top = l + 'px';
                _.style.left = '0px';
                _.style.right = 'auto';
              } else {
                _.style.width = r + 'px';
                _.style.height = c + 'px';
                _.style.top = l + (t - 1) * (d + c) + 'px';
                _.style.right = '0px';
                _.style.left = 'auto';
              }
            }
          }
        }
      },
      show: function () {
        this.data.isShow = !0;
        this.$update();
      },
      hide: function () {
        this._clearScreenLocations();
        this.data.isShow = !1;
        this.data.amISharingScreen = !1;
        this.$update();
      },
    });
    return f;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'c05b94d8b8af4a92dbf100784275e06c',
  'ca643d30a76212dcbe62390e2a0e3054',
  '9a447a3b597e896dca4aac83e1c86427',
  'bcf071761289ae1019dcc5e22b391493',
  '24fc459b087ee4ceba5d8a9ad4a32482',
  '268c3257e756ea058b7f5849ce71559d',
  'f657f10b7466ef69e5081338d923dc35',
  '0b37bd19208cbac1c1ef61490b546431',
  '91163032df3d891ca0bf8ef59449cd10',
);
EDU(
  'fb78d041e85c491672c79e6b5811080c',
  '\n<div class="um-live-live-interactive-player" r-hide={!isShow} ref=root>\n    {#if isVideo && supportBrowserWindShare && isScreenSharingChromeExtensionInstalled}\n    <div class="um-live-live-interactive-player_screen_sharing">\n        {#if amISharingScreen}\n        <span class="um-live-live-interactive-player_screen_sharing_button end" \n            on-click={this.stopScreenSharing()}>结束共享</span>\n        {/if}\n        <span class="um-live-live-interactive-player_screen_sharing_button start" \n            on-click={this.startScreenSharing()}>{ amISharingScreen ? \'切换共享\' : \'共享屏幕\' }</span>\n    </div>\n    {/if}\n    <div class="um-live-live-interactive-player_root" ref=root>\n    </div>\n</div>\n',
);
EDU(
  'e420c16a974d4b23bc9166bf35fdd805',
  '@charset "UTF-8";.um-live-live-interactive-player{position:relative;background:#000;width:100%;height:100%;}.um-live-live-interactive-player_root{width:100%;height:100%;}.um-live-live-interactive-player_screen{position:absolute;top:9999px;overflow:hidden;}.um-live-live-interactive-player_screen div{width:100% !important;height:auto !important;position:static !important;bottom:0px;}.um-live-live-interactive-player_screen div video{width:100%;height:auto;}.um-live-live-interactive-player_screen div p{display:none;}.um-live-live-interactive-player_screen_nick{width:100%;height:25px;line-height:25px;background:rgba(0, 0, 0, 0.3);color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;position:absolute;z-index:99;bottom:0px;left:0;text-indent:8px;}.um-live-live-interactive-player_screen_sharing{position:absolute;z-index:1;right:20px;top:20px;}.um-live-live-interactive-player_screen_sharing_button{float:right;margin-left:12px;cursor:pointer;width:80px;height:30px;border-radius:100px;font-size:14px;text-align:center;line-height:30px;color:#fff;}.um-live-live-interactive-player_screen_sharing_button.start{border:1px solid rgba(255, 255, 255, 0.6);}.um-live-live-interactive-player_screen_sharing_button.start:hover{border-color:white;}.um-live-live-interactive-player_screen_sharing_button.end{background:#FF341A;}.um-live-live-interactive-player_screen_sharing_button.end:active{background:#EB1B00;}',
);
EDU(
  'b49f06ed95dcc6350bf21af46520e05f',
  function (e, t, n) {
    return e.$extends({ name: 'um-live-live-interactive-player', css: n, template: t });
  },
  '911e04f713dbd1fbca1bda173610d1fd',
  'fb78d041e85c491672c79e6b5811080c',
  'e420c16a974d4b23bc9166bf35fdd805',
);
EDU(
  '9824bfb5f1cf9c4d591bbb1618386800',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h, p, m, b, g) {
    var v = i.$extends({
      name: 'um-live-live-pc',
      config: function () {
        o.extend(this, { __options: null });
        o.extend(this.data, {
          edsAuthorization: null,
          scope: null,
          liveContentId: null,
          liveId: null,
          userId: null,
          anonymousUserName: null,
          playBackVideoData: null,
          waterMarkContent: null,
          lang: e,
        });
        if (this.data.edsAuthorization) a.setAuth(this.data.edsAuthorization);
        if (this.data.scope) a.setScope(this.data.scope);
        if (!this.data.liveId) this.data.liveId = this.data.liveContentId;
        if (!this.data.liveContentId) this.data.liveContentId = this.data.liveId;
        this.__livePcSetting = a.get('live-pc');
        this.__chatSetting = this.__livePcSetting.chatroomConf || this.__livePcSetting;
        this.__options = t._$merge({}, this.data);
        this.__options = t._$merge(this.__options, this.__livePcSetting);
        this.supr();
      },
      init: function () {
        this.supr();
        this.__body = this.$refs.root;
        this.__dom = {
          player: this.$refs['j-liveplayer-wrap'],
          right: this.$refs['j-liveright'],
          chat: this.$refs['j-livechat-wrap'],
          notice: this.$refs['j-livenotice-wrap'],
        };
        if (this.__options.liveContentId || this.__options.liveId)
          if (this.__options.userId) {
            this._cacheIns = d.Live._$allocate({});
            this._cacheIns._$getLiveInitInfo({
              param: { liveId: this.__options.liveContentId },
              data: { userId: this.__options.userId },
              onload: this._initLive._$bind(this),
            });
          } else console.error('no userId');
        else console.error('no liveId');
      },
      _initLive: function (e) {
        if (e && (!e || e.liveId)) {
          this.__liveInitData = e;
          if (this.__liveInitData.anonymousUser) {
            if (!this.__options.anonymousUserName) this.__options.anonymousUserName = '匿名用户';
            this.data.bodyClass = 'um-live-live-pc-notlogin';
          }
          this._useH5 = 2 === this.__liveInitData.liveType ? !1 : !0;
          this._genLivePcPlayer();
          if (this.__options.playBackVideoData)
            this.data.playerClass = 'um-live-live-pc_player-noim';
          else {
            this.data.playerClass = '';
            this._genLivePcChat();
          }
          this.$update();
          m.live(
            this.__options.liveId,
            this.__options.userId,
            this.__liveInitData.anonymousUser ? this.__options.anonymousUserName : null,
            this.__livePcPlayer,
            this.__livePcChat,
          );
        } else this._showDeleted();
      },
      _geneInteractive: function () {
        this._liveInteractiveProcess = new _({
          data: {
            liveId: this.__options.liveContentId,
            userId: this.__options.userId,
            appType: this.__liveInitData.appType,
            isUserLogin: !this.__liveInitData.anonymousUser,
            anonymousConf: this.__livePcSetting.anonymousConf,
            interactiveConf: this.__livePcSetting.interactiveConf,
          },
        }).$inject(this.$refs['j-live-mircophone']);
        this._liveInteractiveProcess.$on(
          'ready',
          function (e) {
            this.__liveInteractivePlayer = this._geneLiveInteractivePlayer();
            this._interactiveList = this._geneInteractiveList(
              e.connectedList,
              this.__livePcChat.getChatroomMemberNum(),
              function () {
                this.__livePcChat.data.showChatroomNum = !1;
                this.__livePcChat.$update();
              }._$bind(this),
            );
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_INTERACTIVE_VOLUME_CHANGE,
          function (e) {
            var t = Object.getOwnPropertyNames(e),
              n,
              i,
              o;
            for (n = 0; n < t.length; n++) {
              i = e[t[n]];
              if ('self' == t[n]) o = this.__liveInitData.chatroomInfo.account;
              else o = t[n];
              if (this._interactiveList && this._interactiveList.$refs[o])
                this._interactiveList.$refs[o].change(255 * i.status);
            }
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED,
          function (e) {
            var t = [];
            this._connectListByPre = e.connectedList;
            if (this._interactiveList)
              if (!this._connectListByStu)
                this._interactiveList.updateInteractiveList(this._connectListByPre);
              else {
                t = this._formatConnectListByStu(
                  this._connectListByStu || [],
                  this._connectListByPre || [],
                );
                this._interactiveList.updateInteractiveList(t);
              }
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU,
          function (e) {
            var t = [];
            this._connectListByStu = e;
            if (this._interactiveList) {
              t = this._formatConnectListByStu(
                this._connectListByStu || [],
                this._connectListByPre || [],
              );
              this._interactiveList.updateInteractiveList(t);
            }
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_USER_ONLINE_MICROPHONE_SUCCESS,
          function () {
            if (this.__livePcPlayer) this.__livePcPlayer.destroy();
            if (this.__liveInteractivePlayer) this.__liveInteractivePlayer.show();
          }._$bind(this),
        );
        h._$addEvent(
          p.EVENT_NAME_DICT.EVT_USER_OFFLINE_MICROPHONE_SUCCESS,
          function (e) {
            this._genLivePcPlayer();
            if (this.__liveInteractivePlayer) this.__liveInteractivePlayer.hide();
            h._$delEvent(p.EVENT_NAME_DICT.EVT_ONLINE_MICROPHONE_QUEUE_CHANGEED_BY_STU);
            this._connectListByStu = null;
            t._$forEach(
              this._connectListByPre,
              function (t, n) {
                if (t.accid === e.account) this._connectListByPre.splice(n, 1);
              }._$bind(this),
            );
            this._interactiveList.updateInteractiveList(this._connectListByPre);
          }._$bind(this),
        );
      },
      _formatConnectListByStu: function (e, n) {
        var i = [];
        t._$forEach(e, function (e, o) {
          t._$forEach(n, function (t, n) {
            if (e.account !== t.accid);
            else e.microType = t.microType;
          });
          i.push({
            accid: e.account,
            nickName: e.nick,
            avatar: e.avatar,
            microType: e.microType || 0,
          });
        });
        i.sort(function (e, t) {
          return t.microType - e.microType;
        });
        return i;
      },
      _genLivePcPlayer: function () {
        if (location.search.match('testflash=true')) this._useH5 = !1;
        else if (location.search.match('testH5=true')) this._useH5 = !0;
        this.__livePcPlayer = new s({
          data: {
            useH5: this._useH5,
            liveContentId: this.__options.liveContentId,
            playBackVideoData: this.__options.playBackVideoData,
            waterMark: this.__livePcSetting.waterMark,
            waterMarkContent: this.__options.waterMarkContent,
            notAllowFullScreen: this.__livePcSetting.notAllowFullScreen,
          },
        }).$inject(this.__dom.player);
        this.__livePcPlayer.$on('updateLiveInfo', this._onUpdateLiveInfo._$bind(this));
        this.__livePcPlayer.$on('PlayBackPlay', this.onPlayBackPlay._$bind(this));
        this.__livePcPlayer.$on('PlayBackPauseClick', this.onPlayBackPauseClick._$bind(this));
        this.__livePcPlayer.$on('PlayBackSeek', this.onPlayBackSeek._$bind(this));
        this.__livePcPlayer.$on('PlayBackEnd', this.onPlayBackEnd._$bind(this));
      },
      _genLivePcNotice: function () {
        if (this.__livePcNotice) this.__livePcNotice.destroy();
        this.__livePcNotice = new r({
          data: {
            content: '',
            isNew: !1,
            isTeacher: !1,
            liveId: this.__options.liveContentId,
            account: this.__liveInitData.chatroomInfo.account,
          },
        }).$inject(this.__dom.notice);
        this.__livePcChat.$on(
          'chatroomNotice',
          function (e) {
            this.__livePcNotice.data.content = this.__livePcChat.data.notice.content;
            this.__livePcNotice.data.isNew = this.__livePcChat.data.notice.isNew;
            this.__livePcNotice.data.isTeacher = this.__livePcChat.data.notice.isTeacher;
            if (this.__livePcNotice.noticeView)
              this.__livePcNotice.noticeView.data.isTeacher =
                this.__livePcChat.data.notice.isTeacher;
            this.__livePcNotice.$update();
          }._$bind(this),
        );
      },
      _geneLiveInteractivePlayer: function (e) {
        return new u({
          data: {
            liveId: this.__options.liveContentId,
            account: this.__liveInitData.chatroomInfo.account,
            lectorAccount: this.__liveInitData.chatroomInfo.lectorAccount,
            supportBrowserWindShare: this.__liveInitData.settingInfo.supportBrowserWindShare,
            screenSharingChromeExtensionId: a.get('live-pc')['screenSharingChromeExtensionId'],
            waterMark: this.__livePcSetting.waterMark,
            waterMarkContent: this.__options.waterMarkContent,
          },
        }).$inject(this.__dom.player);
      },
      _genLivePcChat: function () {
        if (this.__livePcChat) this.__livePcChat.destroy();
        var e = this.__liveInitData.chatroomInfo || {};
        var t = this.__liveInitData.settingInfo || {};
        this.__livePcChat = new c({
          data: {
            liveId: this.__options.liveId,
            appKey: e.appKey,
            account: e.account,
            chatroomId: e.imRoomId,
            token: e.token,
            lectorAccount: e.lectorAccount,
            addr: e.addr,
            showChatroomNum: this.__chatSetting.showChatroomNum,
            isSendMsgCreate: this.__chatSetting.isSendMsgCreate,
            isUserLogin: !this.__liveInitData.anonymousUser,
            chatroomNick: this.__options.anonymousUserName,
            anonymousConf: this.__livePcSetting.anonymousConf,
            isMemberNumFromRequest: this.__chatSetting.isMemberNumFromRequest,
            openMuteOpt: this.__chatSetting.openMuteOpt,
            openRoomMute: this.__chatSetting.openRoomMute,
            openTeammanagerOpt: this.__chatSetting.openTeammanagerOpt,
            openNoticeOpt: t.supportAnnouncement,
          },
        }).$inject(this.__dom.chat);
        if (this.__livePcChat.isBrowserSupport) {
          this.__livePcChat.$on(
            'onlineMemberNumChange',
            function (e) {
              if (this._interactiveList) this._interactiveList.updateInteractiveNum(e);
            }._$bind(this),
          );
          if (e.addr && e.addr.length > 0) {
            if (t.supportAnnouncement) {
              this._genLivePcNotice();
              this.data.rightClass = 'open_notice';
            }
            if (t.supportWebRequestMicro) this._geneInteractive();
            if (t.supportAnswer && !this.__liveInitData.anonymousUser) this._genAnswerSheet();
          }
        }
      },
      _onUpdateLiveInfo: function (e) {
        if (e) {
          if (this.liveInfoUpdate) {
            e.onlineMemberNum = this.__livePcChat ? this.__livePcChat.data.onlineMemberNum : 0;
            this.liveInfoUpdate(e);
          }
        } else this._showDeleted();
      },
      _geneInteractiveList: function (e, n, i) {
        var o = !1,
          a;
        if (e && e.length > 0) o = !0;
        a = new f({ data: { isShowOverview: o, connectedList: e, chatroomNum: n } }).$inject(
          this.$refs['j-live-interactiveList'],
        );
        a.$watch('connectedList.length', function (e) {
          if (e > 0) this.data.isShowOverview = !0;
          else this.data.isShowOverview = !1;
          this.$update();
        });
        if (i && t._$isFunction(i)) i.call(this);
        return a;
      },
      _genAnswerSheet: function () {
        var e = this.__dom.player;
        this._userAnswerSheetUI = new l({
          data: {
            lectorAccount: this.__liveInitData.chatroomInfo.lectorAccount,
            liveId: this.__options.liveContentId,
            account: this.__liveInitData.chatroomInfo.account,
            mountDom: e,
          },
        }).$inject(e);
      },
      liveInfoUpdate: function (e) {
        this.$emit('liveInfoUpdate', e);
      },
      onPlayBackPlay: function (e) {
        this.$emit('playBackPlay', e);
      },
      onPlayBackPauseClick: function (e) {
        this.$emit('playBackPauseClick', e);
      },
      onPlayBackEnd: function (e) {
        this.$emit('playBackEnd', e);
      },
      onPlayBackSeek: function (e) {
        this.$emit('playBackSeek', e);
      },
      _showDeleted: function (e) {
        this.__livePcNotice && this.__livePcNotice.destroy();
        this.__liveInteractivePlayer && this.__liveInteractivePlayer.destroy();
        this._interactiveList && this._interactiveList.destroy();
        this._liveInteractiveProcess && this._liveInteractiveProcess.destroy();
        this._userAnswerSheetUI && this._userAnswerSheetUI.destroy();
        this.__livePcChat && this.__livePcChat.destroy();
        this.__livePcPlayer && this.__livePcPlayer.destroy();
        this.$refs['j-deleted'].style.display = 'block';
      },
      destroy: function () {
        this.supr();
        if (this._cacheIns) this._cacheIns._$recycle();
        this.__livePcNotice && this.__livePcNotice.destroy();
        this.__liveInteractivePlayer && this.__liveInteractivePlayer.destroy();
        this._interactiveList && this._interactiveList.destroy();
        this._liveInteractiveProcess && this._liveInteractiveProcess.destroy();
        this._userAnswerSheetUI && this._userAnswerSheetUI.destroy();
        this.__livePcChat && this.__livePcChat.destroy();
        this.__livePcPlayer && this.__livePcPlayer.destroy();
      },
    });
    return v;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  'e71dc3be9cd207b262db571dc93abf68',
  'cf80be04d65f6ed45ce71bbb99957213',
  '83edf396d43c6caaaa5d83ffac3e1edc',
  '9dc508f2eef931918f19fafe68ba902b',
  '864d370e2f6d40783480b6bc6ebae0d7',
  '2cd31b69273f8eaef051521582664008',
  'b49f06ed95dcc6350bf21af46520e05f',
  'dac7471872ff9a642deb82db1438960a',
  '9a447a3b597e896dca4aac83e1c86427',
  'bcf071761289ae1019dcc5e22b391493',
  '0e44ded955eba38916ea8a8f0bb1ba19',
);
EDU(
  'f73c8a5163d7e0cd718c84e6f6e30262',
  '<div class="um-live-live-pc {bodyClass}" ref=root>\n    <!-- 播放器节点 -->\n    <div class="um-live-live-pc_player f-pa {playerClass}" ref="j-liveplayer-wrap">\n\n    </div>\n\n    <!-- 聊天室节点 -->\n    <div class="um-live-live-pc_right f-pa {rightClass}" ref="j-liveright">\n        <div class="um-live-live-pc_right_notice f-pa" ref="j-livenotice-wrap"></div>\n\n        <!-- 互动列表节点 -->\n        <div class="um-live-live-pc_right_interactiveList f-pa" ref="j-live-interactiveList">\n        </div>\n\n        <!-- 请麦举手节点 -->\n        <div class="um-live-live-pc_right_mircophone f-pa" ref="j-live-mircophone">\n        </div>\n\n        <div class="um-live-live-pc_right_chat f-pa" ref="j-livechat-wrap"></div>\n    </div>\n\n    <div class="um-live-live-pc_deleted f-pa" ref="j-deleted">\n        <div class="um-live-live-pc_deleted_mid f-pa">\n            <div class="um-live-live-pc_deleted_ic ux-icon-sad f-fl"></div>\n            <div class="um-live-live-pc_deleted_rcon f-fl">\n                <h4 class="um-live-live-pc_deleted_bt">{lang.KEY_LIB_LIVE_HELPER_NO_LIVESTREAM}</h4>\n                <p class="um-live-live-pc_deleted_in">{lang.KEY_LIB_LIVE_HELPER_LIVESTREAM_DEL_BY_TEACHER}</p>\n            </div>\n        </div>\n    </div>\n</div>',
);
EDU(
  '023602ed5ba8cec9301ac6a19449427b',
  '@charset "UTF-8";.um-live-live-pc{width:100%;height:100%;overflow:hidden;position:absolute;top:0;left:0;}.um-live-live-pc_player{width:auto;height:100%;overflow:hidden;top:0;left:0;width:auto;right:260px;z-index:10;}.um-live-live-pc_player-noim{width:100%;right:0;}.um-live-live-pc_player .ux-component-modal-slideModal .container .btn,.um-live-live-pc_player .ux-component-modal-slideModal .container{background:#fff;}.um-live-live-pc_right{box-sizing:border-box;z-index:1;width:260px;height:100%;top:0;right:0;overflow:hidden;background-color:#F7F9FC;}.um-live-live-pc_right_notice{box-sizing:border-box;width:260px;height:0;top:0;right:0;overflow:hidden;background-color:#fff;}.um-live-live-pc_right_mircophone{position:absolute;right:0;bottom:154px;z-index:100;}.um-live-live-pc_right_interactiveList{z-index:1000;left:0;top:0;width:100%;}.um-live-live-pc_right_chat{position:absolute;top:0;left:0;bottom:0;width:100%;}.um-live-live-pc_right.open_notice .um-live-live-pc_right_notice{height:42px;}.um-live-live-pc_right.open_notice .um-live-live-pc_right_interactiveList{top:42px;}.um-live-live-pc_right.open_notice .um-live-live-pc_right_chat{top:42px;}.um-live-live-pc-notlogin .um-live-live-pc_right_mircophone{bottom:57px;}.um-live-live-pc_deleted{display:none;z-index:20;width:100%;height:100%;top:0;left:0;background-color:#f8f8f8;}.um-live-live-pc_deleted_mid{width:500px;height:100px;margin:-50px 0 0 -250px;top:50%;left:50%;}.um-live-live-pc_deleted_ic{font-size:64px;color:#859295;}.um-live-live-pc_deleted_rcon{margin-left:20px;width:400px;}.um-live-live-pc_deleted_bt{font-size:36px;line-height:47px;color:#fd513a;margin-bottom:5px;}.um-live-live-pc_deleted_in{font-size:18px;line-height:24px;color:#666;}',
);
EDU(
  '7317cf5208f3eb4283a0622965da7dca',
  function (e, t, n, i, o) {
    return e.$extends({
      name: 'um-live-live-pc',
      css: i,
      template: n,
      config: function () {
        t.extend(this, {});
        t.extend(this.data, {});
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
  },
  '9824bfb5f1cf9c4d591bbb1618386800',
  '217dcfc103efb36d2f192eecc4548797',
  'f73c8a5163d7e0cd718c84e6f6e30262',
  '023602ed5ba8cec9301ac6a19449427b',
  'c9477ed290fe766ef4ef947e18b2a9ac',
);
EDU(
  '098dabe9992b32df749962703d6bda43',
  function (e, t, n, i, o, a, s, r) {
    var c = t._$klass();
    r = c._$extend(n.Module);
    r._doBuild = function (e) {
      this.__super(o, e);
    };
    r._onShow = function (t) {
      this.__super(t);
      this.__options = e._$merge({}, t, t.param || {});
      this._livePcUI && this._livePcUI.destroy();
      this._livePcUI = new a({
        data: {
          liveContentId: this.__options.liveContentId,
          liveId: this.__options.liveId,
          userId: this.__options.userId,
          anonymousUserName: this.__options.anonymousUserName,
          playBackVideoData: this.__options.playBackVideoData,
          waterMarkContent: this.__options.waterMarkContent,
        },
      }).$inject(this.__body || this._body);
      this._livePcUI.$on('liveInfoUpdate', this.liveInfoUpdate._$bind(this));
      this._livePcUI.$on('playBackPlay', this.onPlayBackPlay._$bind(this));
      this._livePcUI.$on('playBackPauseClick', this.onPlayBackPauseClick._$bind(this));
      this._livePcUI.$on('playBackEnd', this.onPlayBackEnd._$bind(this));
      this._livePcUI.$on('playBackSeek', this.onPlayBackSeek._$bind(this));
    };
    r.liveInfoUpdate = function (e) {};
    r.onPlayBackPlay = function () {};
    r.onPlayBackPauseClick = function () {};
    r.onPlayBackEnd = function () {};
    r.onPlayBackSeek = function () {};
    r._onRefresh = function (e) {
      this.__super(e);
    };
    r._onHide = function () {
      this.__super();
      this._livePcUI && this._livePcUI.destroy();
    };
    s.build = n.build._$bind(n, c);
    s.regist = n.regist._$bind2(n, c);
    s.LivePc = c;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  'a1fbe6d4b1d59d038ffa939f0ff9a2b0',
  '8f34a99b20d362b3542aebd517390fc1',
  '238589f971b1494b164029770fa923b4',
  '7317cf5208f3eb4283a0622965da7dca',
);
EDU(
  'fed2a7787616f1c847df896918b515b5',
  function (e, t, n, i, o, a, s) {
    var r = t._$klass();
    s = r._$extend(i.LivePc);
    s.liveInfoUpdate = function (e) {
      o._$dispatchEvent('onLiveInfoUpdate', e);
    };
    a.LivePc = r;
    a.build = n.build._$bind(n, r);
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'f1c1923e72a7bf464958899fa52f322f',
  'a1fbe6d4b1d59d038ffa939f0ff9a2b0',
  '098dabe9992b32df749962703d6bda43',
  '665b4e36772193beffe50de855029c13',
);
EDU(
  '6f662c68416d97c376fb7e135752a301',
  function (e, t, n) {
    function i(e) {
      if (e) {
        if (!t._$cookie('NTESSTUDYSI'));
        var n = e.split('#')[0];
        if (/\?/g.test(n)) n += '&csrfKey=' + t._$cookie('NTESSTUDYSI');
        else n += '?csrfKey=' + t._$cookie('NTESSTUDYSI');
        if (e.split('#')[1]) n += e.split('#')[1];
        return n;
      }
    }
    n._$getPolyvChannelInfo = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getPolyvChannelInfo.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getPolyvChannelToken = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getPolyvChannelToken.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getChatRoomMaxMemberNum = function (t, n) {
      e._$request(i('/web/j/MocLiveRoomContentRpcBean.getChatRoomMemberNum.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getLiveRoomInfo = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getLiveRoomInfo.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getPolyvDircetAuthParm = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getPolyvDircetAuthParm.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
  },
  '8a864b627c302d7d1c56bd928b515d1b',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
EDU(
  '051638d0f2bc4e591e7a6a850e191ac4',
  function (e, t, n, i, o, a, s, r, c, d) {
    function l(e, t) {
      if (e && 'string' == typeof e)
        u.alert(e, '提示', '知道了').$on('ok', function () {
          window.location.reload();
        });
      else if ('number' == typeof t)
        switch (t) {
          case 1002:
            u.alert('直播即将开始，无法再预约了哦~', '提示', '知道了').$on('ok', function () {
              window.location.reload();
            });
            break;
          case 1001:
            o._$showLogin({});
            break;
          case 1003:
            u.alert('不支持当前订阅方式', '提示', '知道了');
            break;
          case 1004:
            u.alert('直播时间有误', '提示', '知道了');
        }
    }
    var _ = window.isMobilePhone === !0 || 'true' === window.isMobilePhone ? n : t;
    var u = window.isMobilePhone === !0 || 'true' === window.isMobilePhone ? i : a;
    d.settings = {
      subscribeMethod: s._$doSubscribeBySubscribeChannel,
      subscribeReqData: {},
      getSubscriptionStatusMethod: s._$getSubscribeStatusBySubscribeChannel,
      getSubscriptionStatusReqData: {},
      getSubscriptionUserCountMethod: s._$getCountSubscribeMember,
      getSubscriptionUserCountReqData: {},
    };
    d.handleLiveSubscriptionComp = function (e, t, n, i) {
      if (e) {
        var o = document.querySelector(t);
        if (e.liveStatus == r.LIVE_STATUS_NOTSTART || e.liveStatus == r.LIVE_STATUS_COMING) {
          if (!this.__liveSubscription)
            if (o) {
              this.__liveSubscription = new n({ data: { liveInfo: e } }).$inject(o);
              this.__liveSubscription.$update('liveInfo', e);
            } else
              setTimeout(
                function () {
                  this.handleLiveSubscriptionComp(e, t, n);
                }._$bind(this),
                10,
              );
          else if (i) {
            this.__liveSubscription.destroy();
            this.__liveSubscription = null;
            setTimeout(
              function () {
                this.handleLiveSubscriptionComp(e, t, n);
              }._$bind(this),
              0,
            );
          }
        } else if (this.__liveSubscription) {
          this.__liveSubscription.destroy();
          this.__liveSubscription = null;
        }
      }
    };
    d.saveSubscriptionPhoneNumber = function (t, n, i, o) {
      if (n)
        if (n === -1 || c.isMobilePhone(n.toString(), 'zh-CN')) {
          var a = { liveId: t, subscribeType: 1, subscribeChannelValue: n };
          if (n === -1) delete a.subscribeChannelValue;
          d.settings.subscribeMethod(
            e.extend(a, d.settings.subscribeReqData),
            function (e) {
              if (e) {
                _.success('预约成功，开播前30分钟将发送短信至你的手机');
                if (!o) {
                  String.prototype.replace = window.moocTempReplace
                    ? window.moocTempReplace
                    : String.prototype.replace;
                  String.prototype.match = window.moocTempMatch
                    ? window.moocTempMatch
                    : String.prototype.match;
                  var n = document.querySelector('#community-tip-modal');
                  if (!n) {
                    n = document.createElement('div');
                    n.setAttribute('id', 'community-tip-modal');
                    document.body.appendChild(n);
                  }
                  var a = window.__setCommunityTipModalSetting
                    ? function () {
                        window.__setCommunityTipModalSetting(window.__communityTipModalSetting);
                      }
                    : function () {
                        window.reactComponentLoadBootstrap.init({
                          name: 'CommonCommunityTipModal',
                          container: n,
                        });
                      };
                  window.__communityTipModalSetting = {
                    isWap: 'true' === window.isMobilePhone,
                    isLive: !0,
                    isTerm: !1,
                    id: t,
                    isVisible: !0,
                    onClose: function () {
                      window.__communityTipModalSetting.isVisible = !1;
                      window.__setCommunityTipModalSetting(window.__communityTipModalSetting);
                    },
                  };
                  a();
                }
              } else if (e === !1) _.error('预约失败');
              i(e);
            },
            l,
          );
        } else _.error('请输入正确的手机号');
      else _.error('请输入手机号');
    };
    d.getSubscriptionInfo = function (t, n) {
      function i() {
        if ('undefined' != typeof o.subscriptionCount && 'undefined' != typeof o.phoneNumber) n(o);
      }
      var o = { phoneNumber: void 0, subscriptionCount: void 0 };
      d.settings.getSubscriptionStatusMethod(
        e.extend(
          { liveId: t, subscribeType: 1, needMultiple: !1 },
          d.settings.getSubscriptionStatusReqData,
        ),
        function (e) {
          if (e) o.phoneNumber = e.subscribeChannelValue || null;
          else o.phoneNumber = null;
          i();
        },
        l,
      );
      d.settings.getSubscriptionUserCountMethod(
        e.extend(
          { liveId: t, subscribeType: 1, needMultiple: !1 },
          d.settings.getSubscriptionUserCountReqData,
        ),
        function (e) {
          o.subscriptionCount = e || 0;
          i();
        },
        l,
      );
    };
  },
  '06a1fe998ca2ede601d4740c114f6c3c',
  '29f555f70e6e64cf8315ed720772ced1',
  '268c3257e756ea058b7f5849ce71559d',
  'd02f606099112f5cede2764ed0c329fb',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  'd414623f7407e577cd6c05efff08e96f',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  '8cef6083a5dcc1555a6a85163ef158e2',
);
EDU('3ecf81caf77a883249e06e8a2db0829c', function (e) {
  e.LIVE_MARKETING_CONTENT_KEY_PREFIX = 'live_marketing_content_';
});
EDU(
  '11935d395143b5b43959ed94ae7c82b9',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f) {
    f = e
      .$extends({
        name: 'live-subscription',
        data: {
          liveInfo: {},
          subscriptionInfo: {},
          subscribed: void 0,
          subscribing: void 0,
          intro: '',
          autoEnrollSwitchConfig: void 0,
          subscribedPhoneNumber: void 0,
          showSubscribeDiv: !0,
        },
        computed: {
          hasLiveIntro: function () {
            return !!this.data.intro;
          },
          buttonText: function () {
            return (this.data.subscribed ? '已' : '') + '预约直播';
          },
          buttonClass: function () {
            return this.data.subscribed ? 'disabled' : '';
          },
          isStarted: function () {
            return !(
              !this.data.liveInfo || this.data.liveInfo.liveStatus == d.LIVE_STATUS_NOTSTART
            );
          },
          isComing: function () {
            return !(!this.data.liveInfo || this.data.liveInfo.liveStatus != d.LIVE_STATUS_COMING);
          },
          showSubscriptionCount: function () {
            return this.data.subscriptionInfo && !!this.data.subscriptionInfo.subscriptionCount;
          },
          showSubscribe: function () {
            return !location.pathname.match(/\/custom\/live/);
          },
        },
        config: function () {
          this.supr();
        },
        init: function () {
          this.supr();
          this._getSubscriptionInfo();
          this._getIntro();
        },
        _getIntro: function () {
          if (this.data.liveInfo)
            r._$getCommonData(
              { key: s.LIVE_MARKETING_CONTENT_KEY_PREFIX + this.data.liveInfo.id },
              function (e) {
                e = e || null;
                if (e) {
                  try {
                    e = JSON.parse(e);
                    if (e.autoEnrollSwitch)
                      this.data.autoEnrollSwitchConfig = {
                        autoEnrollSwitch: e.autoEnrollSwitch,
                        courseId: e.courseId,
                        courseType: e.courseType,
                      };
                    this.data.intro = e.desktopIntro
                      .replace(/nos\.netease\.com\/edu-image/g, 'edu-image.nosdn.127.net')
                      .replace(/nos\.netease\.com\/mooc-image/g, 'mooc-image.nosdn.127.net');
                  } catch (t) {
                    this.data.intro = '';
                  }
                  this.$update();
                }
              }._$bind(this),
            );
        },
        _getSubscriptionInfo: function () {
          if (this.data.liveInfo && this.data.liveInfo.id && this.data.showSubscribeDiv)
            n.getSubscriptionInfo(
              this.data.liveInfo.id,
              function (e) {
                this.data.subscriptionInfo = e;
                this.data.subscribed = !!e.phoneNumber;
                this.data.subscribedPhoneNumber = e.phoneNumber;
                this.data.subscribing = !1;
                var t = u._$parseUrlParams(window.location.search);
                if (!this.data.subscribed && window.webUser)
                  c._$getContactPhone(
                    function (e) {
                      this.data.subscriptionInfo.phoneNumber = e;
                      if ('1' === t.subscribe) this.toggleSubscribing(!0);
                    }._$bind(this),
                  );
                this.$update();
              }._$bind(this),
            );
        },
        handleOnSaveSubscription: function (e, t) {
          if (this.data.liveInfo && this.data.liveInfo.id)
            n.saveSubscriptionPhoneNumber(
              this.data.liveInfo.id,
              'number' == typeof e || 'string' == typeof e
                ? e
                : this.data.subscriptionInfo.phoneNumber,
              function () {
                this._getSubscriptionInfo();
                this.getYktCourseIdFromCheckCourse();
                if (t) t();
              }._$bind(this),
            );
        },
        toggleSubscribing: function (e) {
          this.data.subscribing = e;
          this.$update();
        },
        preSubscribe: function (e) {
          if (window.webUser)
            n.saveSubscriptionPhoneNumber(
              this.data.liveInfo.id,
              -1,
              function (t) {
                if (null === t) e();
                else if (t) {
                  this.getYktCourseIdFromCheckCourse();
                  this._getSubscriptionInfo();
                }
              }._$bind(this),
              !0,
            );
          else t._$showLogin({}, i._$composeUrl(window.location.href, { subscribe: 1 }));
        },
        subscribe: function () {
          this.preSubscribe(
            function () {
              this.toggleSubscribing(!0);
            }._$bind(this),
          );
        },
        mobileSubscribe: function () {
          if (!this.data.subscribed)
            this.preSubscribe(
              function () {
                this.showMobileModal();
              }._$bind(this),
            );
        },
        getYktCourseIdFromCheckCourse: function () {
          if (this.data.autoEnrollSwitchConfig && 'true' !== window.isMobilePhone)
            c._$checkLiveEnrollCourseId(
              {
                courseType: this.data.autoEnrollSwitchConfig.courseType,
                courseId: this.data.autoEnrollSwitchConfig.courseId,
              },
              function (e) {
                if (e) {
                  this.data.autoEnrollSwitchConfig.yktCourseId = e.id;
                  this.data.autoEnrollSwitchConfig.enrollCourseName = e.courseTitle;
                  this.checkCourseRightsCourseId(e.id);
                } else this.openCommunityModal();
              }._$bind(this),
              function (e) {
                console.log('checkLiveEnrollCourseId error :>> ', e);
              }._$bind(this),
            );
          else this.openCommunityModal();
        },
        checkCourseRightsCourseId: function (e) {
          c._$checkCourseRightsCourseId(
            { yktCourseId: e },
            function (t) {
              if (1 == t.bought) this.openCommunityModal();
              else this.enrollCourse(e);
            }._$bind(this),
            function (e) {
              console.log('checkCourseRightsCourseId error :>> ', e);
            }._$bind(this),
          );
        },
        enrollCourse: function (e) {
          c._$enrollCourse(
            { courseId: e, outVendor: 'zw_mooc_pczjzb' },
            function (e) {
              if (e.success) {
                this.data.autoEnrollSwitchConfig.enrollSuccess = !0;
                if (e.paySuccessGuide && e.paySuccessGuide.btn && e.paySuccessGuide.btn.link) {
                  this.data.autoEnrollSwitchConfig.paySuccessGuideQrCode =
                    e.paySuccessGuide.btn.link;
                  this.openCommunityModal();
                } else this.openCommunityModal();
              } else this.openCommunityModal();
            }._$bind(this),
            function (e) {
              console.log('error :>> ', e);
              this.openCommunityModal();
            }._$bind(this),
          );
        },
        openCommunityModal: function () {
          String.prototype.replace = window.moocTempReplace
            ? window.moocTempReplace
            : String.prototype.replace;
          String.prototype.match = window.moocTempMatch
            ? window.moocTempMatch
            : String.prototype.match;
          var e = document.querySelector('#community-tip-modal');
          if (!e) {
            e = document.createElement('div');
            e.setAttribute('id', 'community-tip-modal');
            document.body.appendChild(e);
          }
          var t = this.data.liveInfo.id;
          var n = !1;
          var i = void 0;
          var o = void 0;
          if (this.data.autoEnrollSwitchConfig && this.data.autoEnrollSwitchConfig.enrollSuccess) {
            n = !0;
            i = this.data.autoEnrollSwitchConfig.enrollCourseName;
            o = this.data.autoEnrollSwitchConfig.paySuccessGuideQrCode || void 0;
          }
          var a = {
            isWap: 'true' === window.isMobilePhone,
            isTerm: !1,
            isLive: !0,
            id: t,
            isVisible: !0,
            enrollSuccess: n,
            enrollCourseName: i,
            paySuccessGuideQrCode: o,
            onClose: function () {
              a.isVisible = !1;
              if (window.__setCommunityTipModalSetting) window.__setCommunityTipModalSetting(a);
            },
          };
          console.log('modalSetting :>> ', a, this.data);
          var s = window.__setCommunityTipModalSetting
            ? function () {
                window.__setCommunityTipModalSetting(window.__communityTipModalSetting);
              }
            : function () {
                window.reactComponentLoadBootstrap.init({
                  name: 'CommonCommunityTipModal',
                  container: e,
                });
              };
          window.__communityTipModalSetting = a;
          s();
        },
      })
      .filter('formatDate', a._$formatTime);
    return f;
  },
  '235c21779ec98ac90606962a862dadc9',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '051638d0f2bc4e591e7a6a850e191ac4',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '217dcfc103efb36d2f192eecc4548797',
  '89a466f05573f560c156411121b8daae',
  '3ecf81caf77a883249e06e8a2db0829c',
  'c30079064832c51159d1cf37ab222277',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  'b7de97e6397d2ead4249701b1b04e3a0',
  '06fd65927611e25c8b5ce3f72c6ce481',
  'fb061c769bfc74628a81f422f590544c',
);
EDU(
  '41c553fd382cad2e5ee783a75cdd3d16',
  '<div r-hide={isStarted && !isComing} class="f-f0 live-subscription">\n<div class="live-subscription__box {hasLiveIntro ? \'\' : \'no-live-intro\'}">\n<div class="live-subscription__box__status">\n<div class="live-subscription__box__status__title">{isComing? \'直播即将开始\' : \'直播未开始\'}</div>\n<div class="live-subscription__box__status__start-time">将于{liveInfo.liveStartTime | formatDate : \'yyyy-MM-dd HH:mm\'}开播</div>\n</div>\n{#if showSubscribe}\n<div class="live-subscription__box__subscribe">\n{#if subscribed || subscribing}\n<div class="{subscribing ? \'\' : \'hidden\'}">\n<div class="live-subscription__box__subscribe__input-info">\n<label class="live-subscription__box__subscribe__input-info__label">手机号</label>\n<div class="live-subscription__box__subscribe__input-info__input">\n<ux-input value={subscriptionInfo.phoneNumber} placeholder="请填写手机号"></ux-input>\n</div>\n<div class="live-subscription__box__subscribe__input-info__save-btn">\n<ux-button on-click={this.handleOnSaveSubscription($event)}>保存</ux-button>\n</div>\n<div class="live-subscription__box__subscribe__input-info__cancel-btn">\n<ux-button on-click={this.toggleSubscribing(false)}>取消</ux-button>\n</div>\n</div>\n</div>\n<div class="live-subscription__box__subscribe__tip">\n<span class="live-subscription__box__subscribe__tip__text">\n开播前30分钟{#if subscribed && !subscribing}发送短信至手机{subscribedPhoneNumber}{#else}通过手机短信发送提醒{/if}\n</span> {#if subscribed && !subscribing && !isComing}\n<a on-click={this.toggleSubscribing(true)} href="javascript:;" class="live-subscription__box__subscribe__tip__modify">修改</a> {/if}\n</div>\n{#elseif subscribed === false && !isComing && showSubscribeDiv}\n<div class="live-subscription__box__subscribe__btn">\n<ux-button on-click={this.subscribe()} value="预约直播"></ux-button>\n</div>\n{#if showSubscriptionCount}\n<div class="live-subscription__box__subscribe__subscription-count">{subscriptionInfo.subscriptionCount}人已预约</div>\n{/if} {/if}\n</div>\n{/if}\n<div class="live-subscription__box__clear-float-margin f-cb"></div>\n{#if hasLiveIntro}\n<div class="live-subscription__box__intro-wrapper">\n<div class="live-subscription__box__intro-wrapper__intro" r-html={intro}></div>\n</div>\n{/if}\n</div>\n</div>',
);
EDU(
  '5e2ca770538e93f47464faa1e375da86',
  '.live-subscription {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 99;\n  background-image: url("//edu-image.nosdn.127.net/3a6ea7500910475b8979603837d2f4b8.jpg?imageView&quality=100");\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0.8))), url("//edu-image.nosdn.127.net/3a6ea7500910475b8979603837d2f4b8.jpg?imageView&quality=100");\n  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("//edu-image.nosdn.127.net/3a6ea7500910475b8979603837d2f4b8.jpg?imageView&quality=100");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center; }\n  .live-subscription__box {\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    z-index: 100;\n    position: absolute;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 38px 30px 0px;\n    width: 700px;\n    background-color: transparent;\n    min-height: 350px;\n    color: #999999; }\n    .live-subscription__box.no-live-intro {\n      min-height: 220px; }\n      .live-subscription__box.no-live-intro .live-subscription__box__status {\n        float: none;\n        text-align: center;\n        margin-bottom: 25px; }\n    .live-subscription__box__status {\n      float: left; }\n      .live-subscription__box__status__title {\n        font-size: 24px;\n        color: white;\n        margin-bottom: 5px;\n        line-height: 31px; }\n      .live-subscription__box__status__start-time {\n        font-size: 14px;\n        color: #cccccc; }\n    .live-subscription__box__clear-float-margin {\n      margin-bottom: 12px; }\n    .live-subscription__box__subscribe {\n      min-width: 302px;\n      float: right;\n      text-align: right; }\n      .live-subscription__box__subscribe .hidden {\n        visibility: hidden; }\n      .live-subscription__box.no-live-intro .live-subscription__box__subscribe {\n        float: none;\n        text-align: center; }\n      .live-subscription__box__subscribe__btn {\n        display: inline-block; }\n        .live-subscription__box__subscribe__btn .ux-btn {\n          width: 130px;\n          height: 36px;\n          line-height: 36px;\n          font-size: 16px;\n          background-color: #00CC7E;\n          border: 1px solid #00CC7E; }\n          .live-subscription__box__subscribe__btn .ux-btn:hover {\n            opacity: 0.8; }\n      .live-subscription__box__subscribe__input-info__label {\n        font-size: 14px;\n        color: #cccccc; }\n      .live-subscription__box__subscribe__input-info__input, .live-subscription__box__subscribe__input-info__save-btn, .live-subscription__box__subscribe__input-info__cancel-btn {\n        display: inline-block;\n        vertical-align: middle; }\n      .live-subscription__box__subscribe__input-info__label, .live-subscription__box__subscribe__input-info__input, .live-subscription__box__subscribe__input-info__save-btn {\n        margin-right: 10px; }\n      .live-subscription__box__subscribe__input-info__input .ux-input_base {\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        height: 30px;\n        padding: 5px 10px;\n        width: 130px; }\n      .live-subscription__box__subscribe__input-info__save-btn .ux-btn {\n        border: 1px solid #00CC7E;\n        background: #00CC7E; }\n        .live-subscription__box__subscribe__input-info__save-btn .ux-btn:hover {\n          opacity: 0.8; }\n      .live-subscription__box__subscribe__input-info__cancel-btn .ux-btn {\n        border: 1px solid #00CC7E;\n        color: #00CC7E; }\n        .live-subscription__box__subscribe__input-info__cancel-btn .ux-btn:hover {\n          background: #00CC7E;\n          color: white; }\n      .live-subscription__box__subscribe__input-info__save-btn .ux-btn, .live-subscription__box__subscribe__input-info__cancel-btn .ux-btn {\n        width: 56px;\n        height: 30px;\n        line-height: 30px; }\n      .live-subscription__box__subscribe__tip {\n        margin-top: 6px;\n        width: 100%;\n        font-size: 12px;\n        color: #cccccc; }\n        .live-subscription__box__subscribe__tip__modify, .live-subscription__box__subscribe__tip__modify:link, .live-subscription__box__subscribe__tip__modify:active {\n          color: #00CC7E; }\n        .live-subscription__box__subscribe__tip__modify:hover {\n          opacity: 0.8; }\n      .live-subscription__box__subscribe__subscription-count {\n        margin-top: 10px; }\n    .live-subscription__box__intro-wrapper {\n      border-top: 1px solid #d8d8d8;\n      padding: 12px 0px; }\n      .live-subscription__box__intro-wrapper__intro {\n        font-size: 14px;\n        color: #999999;\n        max-height: 380px;\n        overflow: auto;\n        text-align: left; }\n        .live-subscription__box__intro-wrapper__intro::-webkit-scrollbar {\n          width: 12px; }\n        .live-subscription__box__intro-wrapper__intro::-webkit-scrollbar-thumb {\n          background-color: #666666;\n          border-radius: 2px;\n          outline: none; }\n',
);
EDU(
  '2d049fbc26f142d58c4f7b43ab6d59d0',
  function (e, t, n, i, o, a) {
    a = e.$extends({
      name: 'live-subscription',
      template: t,
      css: o,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return a;
  },
  '11935d395143b5b43959ed94ae7c82b9',
  '41c553fd382cad2e5ee783a75cdd3d16',
  'bee6fef94cf2beab28b7ff76f5b652a0',
  'f85d7120c48724ce3338aa4501f72ed5',
  '5e2ca770538e93f47464faa1e375da86',
);
EDU(
  '7f08ac1c542b8db57d3789fb54c2f8ae',
  '<div class="f-f0 live-subscription">\n<div class="live-subscription__box no-live-intro">\n<div class="live-subscription__box__status">\n<div class="live-subscription__box__status__title">{isComing? \'直播即将开始\' : \'直播未开始\'}</div>\n<div class="live-subscription__box__status__start-time">将于{liveInfo.liveStartTime | formatDate : \'yyyy-MM-dd HH:mm\'}开播</div>\n{#if !isComing && showSubscribe}\n<ux-button on-click={this.mobileSubscribe()} value={buttonText} class={buttonClass}></ux-button>\n{/if}\n</div>\n</div>\n</div>',
);
EDU(
  '56703fe23c2ac5d714004ced1de322c3',
  '/* rem */\n.live-subscription {\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  z-index: 100;\n  position: absolute;\n  text-align: center;\n  padding-top: x2rem(100px);\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n  .live-subscription .ux-btn.th-bk-main {\n    position: relative;\n    z-index: 101; }\n  .live-subscription .ux-button-mobile {\n    margin: 0.4rem 0;\n    background: #00CC7E;\n    border-radius: 0.08rem;\n    font-size: 0.37333rem;\n    height: 1.01333rem;\n    line-height: 1.01333rem;\n    width: 3.41333rem;\n    border: 1px solid #00CC7E;\n    color: white;\n    text-align: center;\n    display: inline-block;\n    position: relative;\n    z-index: 101; }\n    .live-subscription .ux-button-mobile:hover, .live-subscription .ux-button-mobile:active, .live-subscription .ux-button-mobile:link {\n      background-color: #00cd7e; }\n    .live-subscription .ux-button-mobile.disabled {\n      background: #999999;\n      cursor: not-allowed;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      border: 1px solid #999999; }\n\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .ux-input {\n  width: 80%; }\n\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_title {\n  font-size: 0.42667rem;\n  color: #333333;\n  text-align: left; }\n\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_bd {\n  padding: 0; }\n  .mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_bd .ux-input2,\n  .mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_bd .ux-input2 input {\n    width: 90%; }\n\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_title,\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_bd .input-wrapper {\n  padding: 0px 0.66667rem; }\n\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_bd .input-wrapper {\n  padding-bottom: 0.48rem; }\n\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_ft .um-modal-btn.cancel-btn,\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_ft .um-modal-btn.ok-btn {\n  color: #00CC7E; }\n\n.mobile-live-subscription-modal.um-modal.ux-mobile-modal .um-modal_dialog .um-modal_ft .um-modal-btn.ok-btn {\n  font-weight: bold; }\n',
);
EDU(
  '7d54152970cd710e0efa53a37a1e2c95',
  function (e, t, n, i, o, a, s) {
    s = e.$extends({
      name: 'live-subscription',
      template: t,
      css: a,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
      showMobileModal: function () {
        new o({
          data: {
            title: '请留下你的手机号码，我们将在开播前30分钟通过手机短信提醒你~',
            content:
              '<div class="input-wrapper"><ux-input placeholder="手机号" value={phoneNumber}></ux-input></div>                        <div class="um-modal_ft">                            <a class="um-modal-btn cancel-btn" on-click={this.close(false)} >取消</a>                            <a class="um-modal-btn ok-btn" on-click={this.handleOnFinish()}>完成</a>                        </div>',
            cancelButton: !1,
            okButton: !1,
            phoneNumber: this.data.subscriptionInfo.phoneNumber,
            class: 'mobile-live-subscription-modal',
          },
          handleOnFinish: function () {
            this.$emit('finish', {
              phoneNumber: this.data.phoneNumber,
              done: function () {
                this.ok();
              }._$bind(this),
            });
          },
        }).$on(
          'finish',
          function (e) {
            this.handleOnSaveSubscription(e.phoneNumber, e.done);
          }._$bind(this),
        );
      },
    });
    return s;
  },
  '11935d395143b5b43959ed94ae7c82b9',
  '7f08ac1c542b8db57d3789fb54c2f8ae',
  'f4a213853cffcfada160edc3d1bcce37',
  'f85d7120c48724ce3338aa4501f72ed5',
  'c0dd21910ad7af74349ee30bc87e5ed9',
  '56703fe23c2ac5d714004ced1de322c3',
);
EDU(
  '87e551382d039d13eaf55d62f0709535',
  function (e, t, n, i) {
    var o;
    o = t.$extends({
      name: 'live-pc-player_status',
      data: {},
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        var t = this.data.liveStatus;
        var n = document.querySelector('.live-subscription');
        if (n) n.remove();
        if (t == i.LIVE_STATUS_END) {
          this.data.statusText = '直播已结束，视频转码中';
          this.data.statusTextTips = '课时正在转码，转码成功后可随时观看录播';
        } else if (t == i.LIVE_STATUS_INVALID)
          this.data.statusText = e.KYE_LIVE_BORADCAST_LIVE_EXPIRED;
        else if (t == i.LIVE_STATUS_DELAY_START) {
          this.data.statusText = e.KYE_LIVE_BORADCAST_TEACHER_NO_START;
          this.data.statusTextTips = e.KYE_LIVE_BORADCAST_TIP_WAIT;
        }
        this.$update();
      },
    });
    return o;
  },
  'f65d4c38b0afda6fbd1ac233d0d7e05d',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
);
EDU(
  '1ad7d62a1e0adc91007d90f53b36a3ab',
  '<div class="live-pc-player_status"><div class="ux-live-pc-player_status">\n<div class="ux-live-pc-player_status_img ux-live-pc-player_status_img-delay"></div>\n<div class="ux-live-pc-player_status_tbar f-pa">\n<div class="ux-live-pc-player_status_tbar_bg"></div>\n<div class="ux-live-pc-player_status_tbar_w f-pa">\n<h3 class="ux-live-pc-player_status_tbar_h3">{statusText}</h3>\n<p class="ux-live-pc-player_status_tbar_p">{statusTextTips || \'\'}</p>\n</div>\n</div>\n</div>\n</div>',
);
EDU('0d8bf1a3f5ec3708344fd90355416fcc', '');
EDU(
  'f2389227e456e3ea56d0bf34ceb8fad4',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'live-pc-player_status',
      template: t,
      css: n,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '87e551382d039d13eaf55d62f0709535',
  '1ad7d62a1e0adc91007d90f53b36a3ab',
  '0d8bf1a3f5ec3708344fd90355416fcc',
);
EDU(
  'dbfa45f69ec334f263c861c5ef022851',
  '<div class="live-pc-player_status">\n<div class="ux-live-mobile-player_status">\n<div class="ux-live-mobile-player_status f-pa" style="height:100%">\n<div class="ux-live-mobile-player_status_bg f-pr">\n<img class="ux-live-mobile-player_status_bg_img" src="http://edu-image.nosdn.127.net/7C988ACF656AB0B457AFBB40463533F8.jpg?imageView&amp;blur=20x8">\n<div class="ux-live-mobile-player_status_bg_mask f-pa"></div>\n</div>\n<div class="ux-live-mobile-player_status_twrap f-pa">\n<h4 class="ux-live-mobile-player_status_tbig">{statusText}</h4>\n<div>\n<p class="ux-live-mobile-player_status_tinfo">{statusTextTips || \'\'}</p>\n</div>\n</div>\n</div>\n</div>\n</div>',
);
EDU('4b30096a83e85b1ab9fa8bf215eb923b', '.ux-live-mobile-player_status {\n  height: 100%; }\n');
EDU(
  '9da0c5f9c3384f5bf831188567dfa7e9',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'live-pc-player_status',
      template: t,
      css: n,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '87e551382d039d13eaf55d62f0709535',
  'dbfa45f69ec334f263c861c5ef022851',
  '4b30096a83e85b1ab9fa8bf215eb923b',
);
!(function (e, t, n) {
  'use strict';
  'undefined' != typeof window && 'function' == typeof define && define.amd
    ? define(n)
    : 'undefined' != typeof module && module.exports
      ? (module.exports = n())
      : t.exports
        ? (t.exports = n())
        : (t.Fingerprint2 = n());
})(0, this, function () {
  'use strict';
  var e = function (e, t) {
      ((e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]));
      var n = [0, 0, 0, 0];
      return (
        (n[3] += e[3] + t[3]),
        (n[2] += n[3] >>> 16),
        (n[3] &= 65535),
        (n[2] += e[2] + t[2]),
        (n[1] += n[2] >>> 16),
        (n[2] &= 65535),
        (n[1] += e[1] + t[1]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[0] += e[0] + t[0]),
        (n[0] &= 65535),
        [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
      );
    },
    t = function (e, t) {
      ((e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
        (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]));
      var n = [0, 0, 0, 0];
      return (
        (n[3] += e[3] * t[3]),
        (n[2] += n[3] >>> 16),
        (n[3] &= 65535),
        (n[2] += e[2] * t[3]),
        (n[1] += n[2] >>> 16),
        (n[2] &= 65535),
        (n[2] += e[3] * t[2]),
        (n[1] += n[2] >>> 16),
        (n[2] &= 65535),
        (n[1] += e[1] * t[3]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[1] += e[2] * t[2]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[1] += e[3] * t[1]),
        (n[0] += n[1] >>> 16),
        (n[1] &= 65535),
        (n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
        (n[0] &= 65535),
        [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
      );
    },
    n = function (e, t) {
      return 32 === (t %= 64)
        ? [e[1], e[0]]
        : t < 32
          ? [(e[0] << t) | (e[1] >>> (32 - t)), (e[1] << t) | (e[0] >>> (32 - t))]
          : ((t -= 32), [(e[1] << t) | (e[0] >>> (32 - t)), (e[0] << t) | (e[1] >>> (32 - t))]);
    },
    i = function (e, t) {
      return 0 === (t %= 64)
        ? e
        : t < 32
          ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t]
          : [e[1] << (t - 32), 0];
    },
    o = function (e, t) {
      return [e[0] ^ t[0], e[1] ^ t[1]];
    },
    a = function (e) {
      return (
        (e = o(e, [0, e[0] >>> 1])),
        (e = t(e, [4283543511, 3981806797])),
        (e = o(e, [0, e[0] >>> 1])),
        (e = t(e, [3301882366, 444984403])),
        (e = o(e, [0, e[0] >>> 1]))
      );
    },
    s = function (s, r) {
      r = r || 0;
      for (
        var c = (s = s || '').length % 16,
          d = s.length - c,
          l = [0, r],
          _ = [0, r],
          u = [0, 0],
          f = [0, 0],
          h = [2277735313, 289559509],
          p = [1291169091, 658871167],
          m = 0;
        m < d;
        m += 16
      )
        ((u = [
          (255 & s.charCodeAt(m + 4)) |
            ((255 & s.charCodeAt(m + 5)) << 8) |
            ((255 & s.charCodeAt(m + 6)) << 16) |
            ((255 & s.charCodeAt(m + 7)) << 24),
          (255 & s.charCodeAt(m)) |
            ((255 & s.charCodeAt(m + 1)) << 8) |
            ((255 & s.charCodeAt(m + 2)) << 16) |
            ((255 & s.charCodeAt(m + 3)) << 24),
        ]),
          (f = [
            (255 & s.charCodeAt(m + 12)) |
              ((255 & s.charCodeAt(m + 13)) << 8) |
              ((255 & s.charCodeAt(m + 14)) << 16) |
              ((255 & s.charCodeAt(m + 15)) << 24),
            (255 & s.charCodeAt(m + 8)) |
              ((255 & s.charCodeAt(m + 9)) << 8) |
              ((255 & s.charCodeAt(m + 10)) << 16) |
              ((255 & s.charCodeAt(m + 11)) << 24),
          ]),
          (u = t(u, h)),
          (u = n(u, 31)),
          (u = t(u, p)),
          (l = o(l, u)),
          (l = n(l, 27)),
          (l = e(l, _)),
          (l = e(t(l, [0, 5]), [0, 1390208809])),
          (f = t(f, p)),
          (f = n(f, 33)),
          (f = t(f, h)),
          (_ = o(_, f)),
          (_ = n(_, 31)),
          (_ = e(_, l)),
          (_ = e(t(_, [0, 5]), [0, 944331445])));
      switch (((u = [0, 0]), (f = [0, 0]), c)) {
        case 15:
          f = o(f, i([0, s.charCodeAt(m + 14)], 48));
        case 14:
          f = o(f, i([0, s.charCodeAt(m + 13)], 40));
        case 13:
          f = o(f, i([0, s.charCodeAt(m + 12)], 32));
        case 12:
          f = o(f, i([0, s.charCodeAt(m + 11)], 24));
        case 11:
          f = o(f, i([0, s.charCodeAt(m + 10)], 16));
        case 10:
          f = o(f, i([0, s.charCodeAt(m + 9)], 8));
        case 9:
          ((f = o(f, [0, s.charCodeAt(m + 8)])),
            (f = t(f, p)),
            (f = n(f, 33)),
            (f = t(f, h)),
            (_ = o(_, f)));
        case 8:
          u = o(u, i([0, s.charCodeAt(m + 7)], 56));
        case 7:
          u = o(u, i([0, s.charCodeAt(m + 6)], 48));
        case 6:
          u = o(u, i([0, s.charCodeAt(m + 5)], 40));
        case 5:
          u = o(u, i([0, s.charCodeAt(m + 4)], 32));
        case 4:
          u = o(u, i([0, s.charCodeAt(m + 3)], 24));
        case 3:
          u = o(u, i([0, s.charCodeAt(m + 2)], 16));
        case 2:
          u = o(u, i([0, s.charCodeAt(m + 1)], 8));
        case 1:
          ((u = o(u, [0, s.charCodeAt(m)])),
            (u = t(u, h)),
            (u = n(u, 31)),
            (u = t(u, p)),
            (l = o(l, u)));
      }
      return (
        (l = o(l, [0, s.length])),
        (_ = o(_, [0, s.length])),
        (l = e(l, _)),
        (_ = e(_, l)),
        (l = a(l)),
        (_ = a(_)),
        (l = e(l, _)),
        (_ = e(_, l)),
        ('00000000' + (l[0] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (l[1] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (_[0] >>> 0).toString(16)).slice(-8) +
          ('00000000' + (_[1] >>> 0).toString(16)).slice(-8)
      );
    },
    r = {
      preprocessor: null,
      audio: { timeout: 1e3, excludeIOS11: !0 },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: !1,
      },
      screen: { detectScreenOrientation: !0 },
      plugins: { sortPluginsFor: [/palemoon/i], excludeIE: !1 },
      extraComponents: [],
      excludes: { enumerateDevices: !0, pixelRatio: !0, doNotTrack: !0, fontsFlash: !0 },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded',
    },
    c = function (e, t) {
      if (Array.prototype.forEach && e.forEach === Array.prototype.forEach) e.forEach(t);
      else if (e.length === +e.length) for (var n = 0, i = e.length; n < i; n++) t(e[n], n, e);
      else for (var o in e) e.hasOwnProperty(o) && t(e[o], o, e);
    },
    d = function (e, t) {
      var n = [];
      return null == e
        ? n
        : Array.prototype.map && e.map === Array.prototype.map
          ? e.map(t)
          : (c(e, function (e, i, o) {
              n.push(t(e, i, o));
            }),
            n);
    },
    l = function () {
      return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
    },
    _ = function (e) {
      var t = [window.screen.width, window.screen.height];
      return (e.screen.detectScreenOrientation && t.sort().reverse(), t);
    },
    u = function (e) {
      if (window.screen.availWidth && window.screen.availHeight) {
        var t = [window.screen.availHeight, window.screen.availWidth];
        return (e.screen.detectScreenOrientation && t.sort().reverse(), t);
      }
      return e.NOT_AVAILABLE;
    },
    f = function (e) {
      if (null == navigator.plugins) return e.NOT_AVAILABLE;
      for (var t = [], n = 0, i = navigator.plugins.length; n < i; n++)
        navigator.plugins[n] && t.push(navigator.plugins[n]);
      return (
        p(e) &&
          (t = t.sort(function (e, t) {
            return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
          })),
        d(t, function (e) {
          var t = d(e, function (e) {
            return [e.type, e.suffixes];
          });
          return [e.name, e.description, t];
        })
      );
    },
    h = function (e) {
      var t = [];
      if (
        (Object.getOwnPropertyDescriptor &&
          Object.getOwnPropertyDescriptor(window, 'ActiveXObject')) ||
        'ActiveXObject' in window
      )
        t = d(
          [
            'AcroPDF.PDF',
            'Adodb.Stream',
            'AgControl.AgControl',
            'DevalVRXCtrl.DevalVRXCtrl.1',
            'MacromediaFlashPaper.MacromediaFlashPaper',
            'Msxml2.DOMDocument',
            'Msxml2.XMLHTTP',
            'PDF.PdfCtrl',
            'QuickTime.QuickTime',
            'QuickTimeCheckObject.QuickTimeCheck.1',
            'RealPlayer',
            'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
            'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
            'Scripting.Dictionary',
            'SWCtl.SWCtl',
            'Shell.UIHelper',
            'ShockwaveFlash.ShockwaveFlash',
            'Skype.Detection',
            'TDCCtl.TDCCtl',
            'WMPlayer.OCX',
            'rmocx.RealPlayer G2 Control',
            'rmocx.RealPlayer G2 Control.1',
          ],
          function (t) {
            try {
              return (new window.ActiveXObject(t), t);
            } catch (t) {
              return e.ERROR;
            }
          },
        );
      else t.push(e.NOT_AVAILABLE);
      return (navigator.plugins && (t = t.concat(f(e))), t);
    },
    p = function (e) {
      for (var t = !1, n = 0, i = e.plugins.sortPluginsFor.length; n < i; n++) {
        var o = e.plugins.sortPluginsFor[n];
        if (navigator.userAgent.match(o)) {
          t = !0;
          break;
        }
      }
      return t;
    },
    m = function (e) {
      try {
        return !!window.sessionStorage;
      } catch (t) {
        return e.ERROR;
      }
    },
    b = function (e) {
      try {
        return !!window.localStorage;
      } catch (t) {
        return e.ERROR;
      }
    },
    g = function (e) {
      try {
        return !!window.indexedDB;
      } catch (t) {
        return e.ERROR;
      }
    },
    v = function (e) {
      return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : e.NOT_AVAILABLE;
    },
    E = function (e) {
      return navigator.cpuClass || e.NOT_AVAILABLE;
    },
    w = function (e) {
      return navigator.platform ? navigator.platform : e.NOT_AVAILABLE;
    },
    y = function (e) {
      return navigator.doNotTrack
        ? navigator.doNotTrack
        : navigator.msDoNotTrack
          ? navigator.msDoNotTrack
          : window.doNotTrack
            ? window.doNotTrack
            : e.NOT_AVAILABLE;
    },
    x = function () {
      var e,
        t = 0;
      void 0 !== navigator.maxTouchPoints
        ? (t = navigator.maxTouchPoints)
        : void 0 !== navigator.msMaxTouchPoints && (t = navigator.msMaxTouchPoints);
      try {
        (document.createEvent('TouchEvent'), (e = !0));
      } catch (t) {
        e = !1;
      }
      return [t, e, 'ontouchstart' in window];
    },
    T = function (e) {
      var t = [],
        n = document.createElement('canvas');
      ((n.width = 2e3), (n.height = 200), (n.style.display = 'inline'));
      var i = n.getContext('2d');
      return (
        i.rect(0, 0, 10, 10),
        i.rect(2, 2, 6, 6),
        t.push('canvas winding:' + (!1 === i.isPointInPath(5, 5, 'evenodd') ? 'yes' : 'no')),
        (i.textBaseline = 'alphabetic'),
        (i.fillStyle = '#f60'),
        i.fillRect(125, 1, 62, 20),
        (i.fillStyle = '#069'),
        e.dontUseFakeFontInCanvas ? (i.font = '11pt Arial') : (i.font = '11pt no-real-font-123'),
        i.fillText('Cwm fjordbank glyphs vext quiz, 😃', 2, 15),
        (i.fillStyle = 'rgba(102, 204, 0, 0.2)'),
        (i.font = '18pt Arial'),
        i.fillText('Cwm fjordbank glyphs vext quiz, 😃', 4, 45),
        (i.globalCompositeOperation = 'multiply'),
        (i.fillStyle = 'rgb(255,0,255)'),
        i.beginPath(),
        i.arc(50, 50, 50, 0, 2 * Math.PI, !0),
        i.closePath(),
        i.fill(),
        (i.fillStyle = 'rgb(0,255,255)'),
        i.beginPath(),
        i.arc(100, 50, 50, 0, 2 * Math.PI, !0),
        i.closePath(),
        i.fill(),
        (i.fillStyle = 'rgb(255,255,0)'),
        i.beginPath(),
        i.arc(75, 100, 50, 0, 2 * Math.PI, !0),
        i.closePath(),
        i.fill(),
        (i.fillStyle = 'rgb(255,0,255)'),
        i.arc(75, 75, 75, 0, 2 * Math.PI, !0),
        i.arc(75, 75, 25, 0, 2 * Math.PI, !0),
        i.fill('evenodd'),
        n.toDataURL && t.push('canvas fp:' + n.toDataURL()),
        t
      );
    },
    S = function () {
      var e,
        t = function (t) {
          return (
            e.clearColor(0, 0, 0, 1),
            e.enable(e.DEPTH_TEST),
            e.depthFunc(e.LEQUAL),
            e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
            '[' + t[0] + ', ' + t[1] + ']'
          );
        };
      if (!(e = M())) return null;
      var n = [],
        i = e.createBuffer();
      e.bindBuffer(e.ARRAY_BUFFER, i);
      var o = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
      (e.bufferData(e.ARRAY_BUFFER, o, e.STATIC_DRAW), (i.itemSize = 3), (i.numItems = 3));
      var a = e.createProgram(),
        s = e.createShader(e.VERTEX_SHADER);
      (e.shaderSource(
        s,
        'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}',
      ),
        e.compileShader(s));
      var r = e.createShader(e.FRAGMENT_SHADER);
      (e.shaderSource(
        r,
        'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}',
      ),
        e.compileShader(r),
        e.attachShader(a, s),
        e.attachShader(a, r),
        e.linkProgram(a),
        e.useProgram(a),
        (a.vertexPosAttrib = e.getAttribLocation(a, 'attrVertex')),
        (a.offsetUniform = e.getUniformLocation(a, 'uniformOffset')),
        e.enableVertexAttribArray(a.vertexPosArray),
        e.vertexAttribPointer(a.vertexPosAttrib, i.itemSize, e.FLOAT, !1, 0, 0),
        e.uniform2f(a.offsetUniform, 1, 1),
        e.drawArrays(e.TRIANGLE_STRIP, 0, i.numItems));
      try {
        n.push(e.canvas.toDataURL());
      } catch (t) {}
      (n.push('extensions:' + (e.getSupportedExtensions() || []).join(';')),
        n.push('webgl aliased line width range:' + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))),
        n.push('webgl aliased point size range:' + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))),
        n.push('webgl alpha bits:' + e.getParameter(e.ALPHA_BITS)),
        n.push('webgl antialiasing:' + (e.getContextAttributes().antialias ? 'yes' : 'no')),
        n.push('webgl blue bits:' + e.getParameter(e.BLUE_BITS)),
        n.push('webgl depth bits:' + e.getParameter(e.DEPTH_BITS)),
        n.push('webgl green bits:' + e.getParameter(e.GREEN_BITS)),
        n.push(
          'webgl max anisotropy:' +
            (function (e) {
              var t =
                e.getExtension('EXT_texture_filter_anisotropic') ||
                e.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                e.getExtension('MOZ_EXT_texture_filter_anisotropic');
              if (t) {
                var n = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                return (0 === n && (n = 2), n);
              }
              return null;
            })(e),
        ),
        n.push(
          'webgl max combined texture image units:' +
            e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
        ),
        n.push('webgl max cube map texture size:' + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)),
        n.push(
          'webgl max fragment uniform vectors:' + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),
        ),
        n.push('webgl max render buffer size:' + e.getParameter(e.MAX_RENDERBUFFER_SIZE)),
        n.push('webgl max texture image units:' + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)),
        n.push('webgl max texture size:' + e.getParameter(e.MAX_TEXTURE_SIZE)),
        n.push('webgl max varying vectors:' + e.getParameter(e.MAX_VARYING_VECTORS)),
        n.push('webgl max vertex attribs:' + e.getParameter(e.MAX_VERTEX_ATTRIBS)),
        n.push(
          'webgl max vertex texture image units:' +
            e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
        ),
        n.push('webgl max vertex uniform vectors:' + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)),
        n.push('webgl max viewport dims:' + t(e.getParameter(e.MAX_VIEWPORT_DIMS))),
        n.push('webgl red bits:' + e.getParameter(e.RED_BITS)),
        n.push('webgl renderer:' + e.getParameter(e.RENDERER)),
        n.push('webgl shading language version:' + e.getParameter(e.SHADING_LANGUAGE_VERSION)),
        n.push('webgl stencil bits:' + e.getParameter(e.STENCIL_BITS)),
        n.push('webgl vendor:' + e.getParameter(e.VENDOR)),
        n.push('webgl version:' + e.getParameter(e.VERSION)));
      try {
        var d = e.getExtension('WEBGL_debug_renderer_info');
        d &&
          (n.push('webgl unmasked vendor:' + e.getParameter(d.UNMASKED_VENDOR_WEBGL)),
          n.push('webgl unmasked renderer:' + e.getParameter(d.UNMASKED_RENDERER_WEBGL)));
      } catch (t) {}
      return (
        e.getShaderPrecisionFormat &&
          c(['FLOAT', 'INT'], function (t) {
            c(['VERTEX', 'FRAGMENT'], function (i) {
              c(['HIGH', 'MEDIUM', 'LOW'], function (o) {
                c(['precision', 'rangeMin', 'rangeMax'], function (a) {
                  var s = e.getShaderPrecisionFormat(e[i + '_SHADER'], e[o + '_' + t])[a];
                  'precision' !== a && (a = 'precision ' + a);
                  var r = [
                    'webgl ',
                    i.toLowerCase(),
                    ' shader ',
                    o.toLowerCase(),
                    ' ',
                    t.toLowerCase(),
                    ' ',
                    a,
                    ':',
                    s,
                  ].join('');
                  n.push(r);
                });
              });
            });
          }),
        n
      );
    },
    C = function () {
      try {
        var e = M(),
          t = e.getExtension('WEBGL_debug_renderer_info');
        return (
          e.getParameter(t.UNMASKED_VENDOR_WEBGL) + '~' + e.getParameter(t.UNMASKED_RENDERER_WEBGL)
        );
      } catch (e) {
        return null;
      }
    },
    I = function () {
      var e = document.createElement('div');
      e.innerHTML = '&nbsp;';
      var t = !(e.className = 'adsbox');
      try {
        (document.body.appendChild(e),
          (t = 0 === document.getElementsByClassName('adsbox')[0].offsetHeight),
          document.body.removeChild(e));
      } catch (e) {
        t = !1;
      }
      return t;
    },
    O = function () {
      if (void 0 !== navigator.languages)
        try {
          if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0;
        } catch (e) {
          return !0;
        }
      return !1;
    },
    $ = function () {
      return (
        window.screen.width < window.screen.availWidth ||
        window.screen.height < window.screen.availHeight
      );
    },
    N = function () {
      var e,
        t = navigator.userAgent.toLowerCase(),
        n = navigator.oscpu,
        i = navigator.platform.toLowerCase();
      if (
        ((e =
          0 <= t.indexOf('windows phone')
            ? 'Windows Phone'
            : 0 <= t.indexOf('win')
              ? 'Windows'
              : 0 <= t.indexOf('android')
                ? 'Android'
                : 0 <= t.indexOf('linux') || 0 <= t.indexOf('cros')
                  ? 'Linux'
                  : 0 <= t.indexOf('iphone') || 0 <= t.indexOf('ipad')
                    ? 'iOS'
                    : 0 <= t.indexOf('mac')
                      ? 'Mac'
                      : 'Other'),
        ('ontouchstart' in window ||
          0 < navigator.maxTouchPoints ||
          0 < navigator.msMaxTouchPoints) &&
          'Windows Phone' !== e &&
          'Android' !== e &&
          'iOS' !== e &&
          'Other' !== e)
      )
        return !0;
      if (void 0 !== n) {
        if (0 <= (n = n.toLowerCase()).indexOf('win') && 'Windows' !== e && 'Windows Phone' !== e)
          return !0;
        if (0 <= n.indexOf('linux') && 'Linux' !== e && 'Android' !== e) return !0;
        if (0 <= n.indexOf('mac') && 'Mac' !== e && 'iOS' !== e) return !0;
        if (
          (-1 === n.indexOf('win') && -1 === n.indexOf('linux') && -1 === n.indexOf('mac')) !=
          ('Other' === e)
        )
          return !0;
      }
      return (
        (0 <= i.indexOf('win') && 'Windows' !== e && 'Windows Phone' !== e) ||
        ((0 <= i.indexOf('linux') || 0 <= i.indexOf('android') || 0 <= i.indexOf('pike')) &&
          'Linux' !== e &&
          'Android' !== e) ||
        ((0 <= i.indexOf('mac') ||
          0 <= i.indexOf('ipad') ||
          0 <= i.indexOf('ipod') ||
          0 <= i.indexOf('iphone')) &&
          'Mac' !== e &&
          'iOS' !== e) ||
        (i.indexOf('win') < 0 &&
          i.indexOf('linux') < 0 &&
          i.indexOf('mac') < 0 &&
          i.indexOf('iphone') < 0 &&
          i.indexOf('ipad') < 0) !=
          ('Other' === e) ||
        (void 0 === navigator.plugins && 'Windows' !== e && 'Windows Phone' !== e)
      );
    },
    U = function () {
      var e,
        t = navigator.userAgent.toLowerCase(),
        n = navigator.productSub;
      if (
        ('Chrome' ==
          (e =
            0 <= t.indexOf('firefox')
              ? 'Firefox'
              : 0 <= t.indexOf('opera') || 0 <= t.indexOf('opr')
                ? 'Opera'
                : 0 <= t.indexOf('chrome')
                  ? 'Chrome'
                  : 0 <= t.indexOf('safari')
                    ? 'Safari'
                    : 0 <= t.indexOf('trident')
                      ? 'Internet Explorer'
                      : 'Other') ||
          'Safari' === e ||
          'Opera' === e) &&
        '20030107' !== n
      )
        return !0;
      var i,
        o = eval.toString().length;
      if (37 === o && 'Safari' !== e && 'Firefox' !== e && 'Other' !== e) return !0;
      if (39 === o && 'Internet Explorer' !== e && 'Other' !== e) return !0;
      if (33 === o && 'Chrome' !== e && 'Opera' !== e && 'Other' !== e) return !0;
      try {
        throw 'a';
      } catch (e) {
        try {
          (e.toSource(), (i = !0));
        } catch (e) {
          i = !1;
        }
      }
      return i && 'Firefox' !== e && 'Other' !== e;
    },
    A = function () {
      var e = document.createElement('canvas');
      return !(!e.getContext || !e.getContext('2d'));
    },
    D = function () {
      if (!A()) return !1;
      var e = M();
      return !!window.WebGLRenderingContext && !!e;
    },
    R = function () {
      return (
        'Microsoft Internet Explorer' === navigator.appName ||
        !('Netscape' !== navigator.appName || !/Trident/.test(navigator.userAgent))
      );
    },
    P = function () {
      return void 0 !== window.swfobject;
    },
    L = function () {
      return window.swfobject.hasFlashPlayerVersion('9.0.0');
    },
    k = function (e, t) {
      var n = '___fp_swf_loaded';
      window[n] = function (t) {
        e(t);
      };
      var i,
        o,
        a = t.fonts.swfContainerId;
      ((o = document.createElement('div')).setAttribute('id', i.fonts.swfContainerId),
        document.body.appendChild(o));
      var s = { onReady: n };
      window.swfobject.embedSWF(
        t.fonts.swfPath,
        a,
        '1',
        '1',
        '9.0.0',
        !1,
        s,
        { allowScriptAccess: 'always', menu: 'false' },
        {},
      );
    },
    M = function () {
      var e = document.createElement('canvas'),
        t = null;
      try {
        t = e.getContext('webgl') || e.getContext('experimental-webgl');
      } catch (e) {}
      return (t || (t = null), t);
    },
    B = [
      {
        key: 'userAgent',
        getData: function (e) {
          e(navigator.userAgent);
        },
      },
      {
        key: 'webdriver',
        getData: function (e, t) {
          e(null == navigator.webdriver ? t.NOT_AVAILABLE : navigator.webdriver);
        },
      },
      {
        key: 'language',
        getData: function (e, t) {
          e(
            navigator.language ||
              navigator.userLanguage ||
              navigator.browserLanguage ||
              navigator.systemLanguage ||
              t.NOT_AVAILABLE,
          );
        },
      },
      {
        key: 'colorDepth',
        getData: function (e, t) {
          e(window.screen.colorDepth || t.NOT_AVAILABLE);
        },
      },
      {
        key: 'deviceMemory',
        getData: function (e, t) {
          e(navigator.deviceMemory || t.NOT_AVAILABLE);
        },
      },
      {
        key: 'pixelRatio',
        getData: function (e, t) {
          e(window.devicePixelRatio || t.NOT_AVAILABLE);
        },
      },
      {
        key: 'hardwareConcurrency',
        getData: function (e, t) {
          e(v(t));
        },
      },
      {
        key: 'screenResolution',
        getData: function (e, t) {
          e(_(t));
        },
      },
      {
        key: 'availableScreenResolution',
        getData: function (e, t) {
          e(u(t));
        },
      },
      {
        key: 'timezoneOffset',
        getData: function (e) {
          e(new Date().getTimezoneOffset());
        },
      },
      {
        key: 'timezone',
        getData: function (e, t) {
          window.Intl && window.Intl.DateTimeFormat
            ? e(new window.Intl.DateTimeFormat().resolvedOptions().timeZone)
            : e(t.NOT_AVAILABLE);
        },
      },
      {
        key: 'sessionStorage',
        getData: function (e, t) {
          e(m(t));
        },
      },
      {
        key: 'localStorage',
        getData: function (e, t) {
          e(b(t));
        },
      },
      {
        key: 'indexedDb',
        getData: function (e, t) {
          e(g(t));
        },
      },
      {
        key: 'addBehavior',
        getData: function (e) {
          e(!(!document.body || !document.body.addBehavior));
        },
      },
      {
        key: 'openDatabase',
        getData: function (e) {
          e(!!window.openDatabase);
        },
      },
      {
        key: 'cpuClass',
        getData: function (e, t) {
          e(E(t));
        },
      },
      {
        key: 'platform',
        getData: function (e, t) {
          e(w(t));
        },
      },
      {
        key: 'doNotTrack',
        getData: function (e, t) {
          e(y(t));
        },
      },
      {
        key: 'plugins',
        getData: function (e, t) {
          R() ? (t.plugins.excludeIE ? e(t.EXCLUDED) : e(h(t))) : e(f(t));
        },
      },
      {
        key: 'canvas',
        getData: function (e, t) {
          A() ? e(T(t)) : e(t.NOT_AVAILABLE);
        },
      },
      {
        key: 'webgl',
        getData: function (e, t) {
          D() ? e(S()) : e(t.NOT_AVAILABLE);
        },
      },
      {
        key: 'webglVendorAndRenderer',
        getData: function (e) {
          D() ? e(C()) : e();
        },
      },
      {
        key: 'adBlock',
        getData: function (e) {
          e(I());
        },
      },
      {
        key: 'hasLiedLanguages',
        getData: function (e) {
          e(O());
        },
      },
      {
        key: 'hasLiedResolution',
        getData: function (e) {
          e($());
        },
      },
      {
        key: 'hasLiedOs',
        getData: function (e) {
          e(N());
        },
      },
      {
        key: 'hasLiedBrowser',
        getData: function (e) {
          e(U());
        },
      },
      {
        key: 'touchSupport',
        getData: function (e) {
          e(x());
        },
      },
      {
        key: 'fonts',
        getData: function (e, t) {
          var n = ['monospace', 'sans-serif', 'serif'],
            i = [
              'Andale Mono',
              'Arial',
              'Arial Black',
              'Arial Hebrew',
              'Arial MT',
              'Arial Narrow',
              'Arial Rounded MT Bold',
              'Arial Unicode MS',
              'Bitstream Vera Sans Mono',
              'Book Antiqua',
              'Bookman Old Style',
              'Calibri',
              'Cambria',
              'Cambria Math',
              'Century',
              'Century Gothic',
              'Century Schoolbook',
              'Comic Sans',
              'Comic Sans MS',
              'Consolas',
              'Courier',
              'Courier New',
              'Geneva',
              'Georgia',
              'Helvetica',
              'Helvetica Neue',
              'Impact',
              'Lucida Bright',
              'Lucida Calligraphy',
              'Lucida Console',
              'Lucida Fax',
              'LUCIDA GRANDE',
              'Lucida Handwriting',
              'Lucida Sans',
              'Lucida Sans Typewriter',
              'Lucida Sans Unicode',
              'Microsoft Sans Serif',
              'Monaco',
              'Monotype Corsiva',
              'MS Gothic',
              'MS Outlook',
              'MS PGothic',
              'MS Reference Sans Serif',
              'MS Sans Serif',
              'MS Serif',
              'MYRIAD',
              'MYRIAD PRO',
              'Palatino',
              'Palatino Linotype',
              'Segoe Print',
              'Segoe Script',
              'Segoe UI',
              'Segoe UI Light',
              'Segoe UI Semibold',
              'Segoe UI Symbol',
              'Tahoma',
              'Times',
              'Times New Roman',
              'Times New Roman PS',
              'Trebuchet MS',
              'Verdana',
              'Wingdings',
              'Wingdings 2',
              'Wingdings 3',
            ];
          t.fonts.extendedJsFonts &&
            (i = i.concat([
              'Abadi MT Condensed Light',
              'Academy Engraved LET',
              'ADOBE CASLON PRO',
              'Adobe Garamond',
              'ADOBE GARAMOND PRO',
              'Agency FB',
              'Aharoni',
              'Albertus Extra Bold',
              'Albertus Medium',
              'Algerian',
              'Amazone BT',
              'American Typewriter',
              'American Typewriter Condensed',
              'AmerType Md BT',
              'Andalus',
              'Angsana New',
              'AngsanaUPC',
              'Antique Olive',
              'Aparajita',
              'Apple Chancery',
              'Apple Color Emoji',
              'Apple SD Gothic Neo',
              'Arabic Typesetting',
              'ARCHER',
              'ARNO PRO',
              'Arrus BT',
              'Aurora Cn BT',
              'AvantGarde Bk BT',
              'AvantGarde Md BT',
              'AVENIR',
              'Ayuthaya',
              'Bandy',
              'Bangla Sangam MN',
              'Bank Gothic',
              'BankGothic Md BT',
              'Baskerville',
              'Baskerville Old Face',
              'Batang',
              'BatangChe',
              'Bauer Bodoni',
              'Bauhaus 93',
              'Bazooka',
              'Bell MT',
              'Bembo',
              'Benguiat Bk BT',
              'Berlin Sans FB',
              'Berlin Sans FB Demi',
              'Bernard MT Condensed',
              'BernhardFashion BT',
              'BernhardMod BT',
              'Big Caslon',
              'BinnerD',
              'Blackadder ITC',
              'BlairMdITC TT',
              'Bodoni 72',
              'Bodoni 72 Oldstyle',
              'Bodoni 72 Smallcaps',
              'Bodoni MT',
              'Bodoni MT Black',
              'Bodoni MT Condensed',
              'Bodoni MT Poster Compressed',
              'Bookshelf Symbol 7',
              'Boulder',
              'Bradley Hand',
              'Bradley Hand ITC',
              'Bremen Bd BT',
              'Britannic Bold',
              'Broadway',
              'Browallia New',
              'BrowalliaUPC',
              'Brush Script MT',
              'Californian FB',
              'Calisto MT',
              'Calligrapher',
              'Candara',
              'CaslonOpnface BT',
              'Castellar',
              'Centaur',
              'Cezanne',
              'CG Omega',
              'CG Times',
              'Chalkboard',
              'Chalkboard SE',
              'Chalkduster',
              'Charlesworth',
              'Charter Bd BT',
              'Charter BT',
              'Chaucer',
              'ChelthmITC Bk BT',
              'Chiller',
              'Clarendon',
              'Clarendon Condensed',
              'CloisterBlack BT',
              'Cochin',
              'Colonna MT',
              'Constantia',
              'Cooper Black',
              'Copperplate',
              'Copperplate Gothic',
              'Copperplate Gothic Bold',
              'Copperplate Gothic Light',
              'CopperplGoth Bd BT',
              'Corbel',
              'Cordia New',
              'CordiaUPC',
              'Cornerstone',
              'Coronet',
              'Cuckoo',
              'Curlz MT',
              'DaunPenh',
              'Dauphin',
              'David',
              'DB LCD Temp',
              'DELICIOUS',
              'Denmark',
              'DFKai-SB',
              'Didot',
              'DilleniaUPC',
              'DIN',
              'DokChampa',
              'Dotum',
              'DotumChe',
              'Ebrima',
              'Edwardian Script ITC',
              'Elephant',
              'English 111 Vivace BT',
              'Engravers MT',
              'EngraversGothic BT',
              'Eras Bold ITC',
              'Eras Demi ITC',
              'Eras Light ITC',
              'Eras Medium ITC',
              'EucrosiaUPC',
              'Euphemia',
              'Euphemia UCAS',
              'EUROSTILE',
              'Exotc350 Bd BT',
              'FangSong',
              'Felix Titling',
              'Fixedsys',
              'FONTIN',
              'Footlight MT Light',
              'Forte',
              'FrankRuehl',
              'Fransiscan',
              'Freefrm721 Blk BT',
              'FreesiaUPC',
              'Freestyle Script',
              'French Script MT',
              'FrnkGothITC Bk BT',
              'Fruitger',
              'FRUTIGER',
              'Futura',
              'Futura Bk BT',
              'Futura Lt BT',
              'Futura Md BT',
              'Futura ZBlk BT',
              'FuturaBlack BT',
              'Gabriola',
              'Galliard BT',
              'Gautami',
              'Geeza Pro',
              'Geometr231 BT',
              'Geometr231 Hv BT',
              'Geometr231 Lt BT',
              'GeoSlab 703 Lt BT',
              'GeoSlab 703 XBd BT',
              'Gigi',
              'Gill Sans',
              'Gill Sans MT',
              'Gill Sans MT Condensed',
              'Gill Sans MT Ext Condensed Bold',
              'Gill Sans Ultra Bold',
              'Gill Sans Ultra Bold Condensed',
              'Gisha',
              'Gloucester MT Extra Condensed',
              'GOTHAM',
              'GOTHAM BOLD',
              'Goudy Old Style',
              'Goudy Stout',
              'GoudyHandtooled BT',
              'GoudyOLSt BT',
              'Gujarati Sangam MN',
              'Gulim',
              'GulimChe',
              'Gungsuh',
              'GungsuhChe',
              'Gurmukhi MN',
              'Haettenschweiler',
              'Harlow Solid Italic',
              'Harrington',
              'Heather',
              'Heiti SC',
              'Heiti TC',
              'HELV',
              'Herald',
              'High Tower Text',
              'Hiragino Kaku Gothic ProN',
              'Hiragino Mincho ProN',
              'Hoefler Text',
              'Humanst 521 Cn BT',
              'Humanst521 BT',
              'Humanst521 Lt BT',
              'Imprint MT Shadow',
              'Incised901 Bd BT',
              'Incised901 BT',
              'Incised901 Lt BT',
              'INCONSOLATA',
              'Informal Roman',
              'Informal011 BT',
              'INTERSTATE',
              'IrisUPC',
              'Iskoola Pota',
              'JasmineUPC',
              'Jazz LET',
              'Jenson',
              'Jester',
              'Jokerman',
              'Juice ITC',
              'Kabel Bk BT',
              'Kabel Ult BT',
              'Kailasa',
              'KaiTi',
              'Kalinga',
              'Kannada Sangam MN',
              'Kartika',
              'Kaufmann Bd BT',
              'Kaufmann BT',
              'Khmer UI',
              'KodchiangUPC',
              'Kokila',
              'Korinna BT',
              'Kristen ITC',
              'Krungthep',
              'Kunstler Script',
              'Lao UI',
              'Latha',
              'Leelawadee',
              'Letter Gothic',
              'Levenim MT',
              'LilyUPC',
              'Lithograph',
              'Lithograph Light',
              'Long Island',
              'Lydian BT',
              'Magneto',
              'Maiandra GD',
              'Malayalam Sangam MN',
              'Malgun Gothic',
              'Mangal',
              'Marigold',
              'Marion',
              'Marker Felt',
              'Market',
              'Marlett',
              'Matisse ITC',
              'Matura MT Script Capitals',
              'Meiryo',
              'Meiryo UI',
              'Microsoft Himalaya',
              'Microsoft JhengHei',
              'Microsoft New Tai Lue',
              'Microsoft PhagsPa',
              'Microsoft Tai Le',
              'Microsoft Uighur',
              'Microsoft YaHei',
              'Microsoft Yi Baiti',
              'MingLiU',
              'MingLiU_HKSCS',
              'MingLiU_HKSCS-ExtB',
              'MingLiU-ExtB',
              'Minion',
              'Minion Pro',
              'Miriam',
              'Miriam Fixed',
              'Mistral',
              'Modern',
              'Modern No. 20',
              'Mona Lisa Solid ITC TT',
              'Mongolian Baiti',
              'MONO',
              'MoolBoran',
              'Mrs Eaves',
              'MS LineDraw',
              'MS Mincho',
              'MS PMincho',
              'MS Reference Specialty',
              'MS UI Gothic',
              'MT Extra',
              'MUSEO',
              'MV Boli',
              'Nadeem',
              'Narkisim',
              'NEVIS',
              'News Gothic',
              'News GothicMT',
              'NewsGoth BT',
              'Niagara Engraved',
              'Niagara Solid',
              'Noteworthy',
              'NSimSun',
              'Nyala',
              'OCR A Extended',
              'Old Century',
              'Old English Text MT',
              'Onyx',
              'Onyx BT',
              'OPTIMA',
              'Oriya Sangam MN',
              'OSAKA',
              'OzHandicraft BT',
              'Palace Script MT',
              'Papyrus',
              'Parchment',
              'Party LET',
              'Pegasus',
              'Perpetua',
              'Perpetua Titling MT',
              'PetitaBold',
              'Pickwick',
              'Plantagenet Cherokee',
              'Playbill',
              'PMingLiU',
              'PMingLiU-ExtB',
              'Poor Richard',
              'Poster',
              'PosterBodoni BT',
              'PRINCETOWN LET',
              'Pristina',
              'PTBarnum BT',
              'Pythagoras',
              'Raavi',
              'Rage Italic',
              'Ravie',
              'Ribbon131 Bd BT',
              'Rockwell',
              'Rockwell Condensed',
              'Rockwell Extra Bold',
              'Rod',
              'Roman',
              'Sakkal Majalla',
              'Santa Fe LET',
              'Savoye LET',
              'Sceptre',
              'Script',
              'Script MT Bold',
              'SCRIPTINA',
              'Serifa',
              'Serifa BT',
              'Serifa Th BT',
              'ShelleyVolante BT',
              'Sherwood',
              'Shonar Bangla',
              'Showcard Gothic',
              'Shruti',
              'Signboard',
              'SILKSCREEN',
              'SimHei',
              'Simplified Arabic',
              'Simplified Arabic Fixed',
              'SimSun',
              'SimSun-ExtB',
              'Sinhala Sangam MN',
              'Sketch Rockwell',
              'Skia',
              'Small Fonts',
              'Snap ITC',
              'Snell Roundhand',
              'Socket',
              'Souvenir Lt BT',
              'Staccato222 BT',
              'Steamer',
              'Stencil',
              'Storybook',
              'Styllo',
              'Subway',
              'Swis721 BlkEx BT',
              'Swiss911 XCm BT',
              'Sylfaen',
              'Synchro LET',
              'System',
              'Tamil Sangam MN',
              'Technical',
              'Teletype',
              'Telugu Sangam MN',
              'Tempus Sans ITC',
              'Terminal',
              'Thonburi',
              'Traditional Arabic',
              'Trajan',
              'TRAJAN PRO',
              'Tristan',
              'Tubular',
              'Tunga',
              'Tw Cen MT',
              'Tw Cen MT Condensed',
              'Tw Cen MT Condensed Extra Bold',
              'TypoUpright BT',
              'Unicorn',
              'Univers',
              'Univers CE 55 Medium',
              'Univers Condensed',
              'Utsaah',
              'Vagabond',
              'Vani',
              'Vijaya',
              'Viner Hand ITC',
              'VisualUI',
              'Vivaldi',
              'Vladimir Script',
              'Vrinda',
              'Westminster',
              'WHITNEY',
              'Wide Latin',
              'ZapfEllipt BT',
              'ZapfHumnst BT',
              'ZapfHumnst Dm BT',
              'Zapfino',
              'Zurich BlkEx BT',
              'Zurich Ex BT',
              'ZWAdobeF',
            ]));
          i = (i = i.concat(t.fonts.userDefinedFonts)).filter(function (e, t) {
            return i.indexOf(e) === t;
          });
          var o = document.getElementsByTagName('body')[0],
            a = document.createElement('div'),
            s = document.createElement('div'),
            r = {},
            c = {},
            d = function () {
              var e = document.createElement('span');
              return (
                (e.style.position = 'absolute'),
                (e.style.left = '-9999px'),
                (e.style.fontSize = '72px'),
                (e.style.fontStyle = 'normal'),
                (e.style.fontWeight = 'normal'),
                (e.style.letterSpacing = 'normal'),
                (e.style.lineBreak = 'auto'),
                (e.style.lineHeight = 'normal'),
                (e.style.textTransform = 'none'),
                (e.style.textAlign = 'left'),
                (e.style.textDecoration = 'none'),
                (e.style.textShadow = 'none'),
                (e.style.whiteSpace = 'normal'),
                (e.style.wordBreak = 'normal'),
                (e.style.wordSpacing = 'normal'),
                (e.innerHTML = 'mmmmmmmmmmlli'),
                e
              );
            },
            l = function (e) {
              for (var t = !1, i = 0; i < n.length; i++)
                if ((t = e[i].offsetWidth !== r[n[i]] || e[i].offsetHeight !== c[n[i]])) return t;
              return t;
            },
            _ = (function () {
              for (var e = [], t = 0, i = n.length; t < i; t++) {
                var o = d();
                ((o.style.fontFamily = n[t]), a.appendChild(o), e.push(o));
              }
              return e;
            })();
          o.appendChild(a);
          for (var u = 0, f = n.length; u < f; u++)
            ((r[n[u]] = _[u].offsetWidth), (c[n[u]] = _[u].offsetHeight));
          var h = (function () {
            for (var e, t, o, a = {}, r = 0, c = i.length; r < c; r++) {
              for (var l = [], _ = 0, u = n.length; _ < u; _++) {
                var f =
                  ((e = i[r]),
                  (t = n[_]),
                  (o = void 0),
                  ((o = d()).style.fontFamily = "'" + e + "'," + t),
                  o);
                (s.appendChild(f), l.push(f));
              }
              a[i[r]] = l;
            }
            return a;
          })();
          o.appendChild(s);
          for (var p = [], m = 0, b = i.length; m < b; m++) l(h[i[m]]) && p.push(i[m]);
          (o.removeChild(s), o.removeChild(a), e(p));
        },
        pauseBefore: !0,
      },
      {
        key: 'fontsFlash',
        getData: function (e, t) {
          return P()
            ? L()
              ? t.fonts.swfPath
                ? void k(function (t) {
                    e(t);
                  }, t)
                : e('missing options.fonts.swfPath')
              : e('flash not installed')
            : e('swf object not loaded');
        },
        pauseBefore: !0,
      },
      {
        key: 'audio',
        getData: function (e, t) {
          var n = t.audio;
          if (n.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/))
            return e(t.EXCLUDED);
          var i = window.OfflineAudioContext || window.webkitOfflineAudioContext;
          if (null == i) return e(t.NOT_AVAILABLE);
          var o = new i(1, 44100, 44100),
            a = o.createOscillator();
          ((a.type = 'triangle'), a.frequency.setValueAtTime(1e4, o.currentTime));
          var s = o.createDynamicsCompressor();
          (c(
            [
              ['threshold', -50],
              ['knee', 40],
              ['ratio', 12],
              ['reduction', -20],
              ['attack', 0],
              ['release', 0.25],
            ],
            function (e) {
              void 0 !== s[e[0]] &&
                'function' == typeof s[e[0]].setValueAtTime &&
                s[e[0]].setValueAtTime(e[1], o.currentTime);
            },
          ),
            a.connect(s),
            s.connect(o.destination),
            a.start(0),
            o.startRendering());
          var r = setTimeout(function () {
            return (
              console.warn(
                'Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' +
                  navigator.userAgent +
                  '".',
              ),
              (o.oncomplete = function () {}),
              (o = null),
              e('audioTimeout')
            );
          }, n.timeout);
          o.oncomplete = function (t) {
            var n;
            try {
              (clearTimeout(r),
                (n = t.renderedBuffer
                  .getChannelData(0)
                  .slice(4500, 5e3)
                  .reduce(function (e, t) {
                    return e + Math.abs(t);
                  }, 0)
                  .toString()),
                a.disconnect(),
                s.disconnect());
            } catch (t) {
              return void e(t);
            }
            e(n);
          };
        },
      },
      {
        key: 'enumerateDevices',
        getData: function (e, t) {
          if (!l()) return e(t.NOT_AVAILABLE);
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (t) {
              e(
                t.map(function (e) {
                  return 'id=' + e.deviceId + ';gid=' + e.groupId + ';' + e.kind + ';' + e.label;
                }),
              );
            })
            ['catch'](function (t) {
              e(t);
            });
        },
      },
    ],
    Y = function (e) {
      throw new Error(
        "'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200",
      );
    };
  return (
    (Y.get = function (e, t) {
      (t ? e || (e = {}) : ((t = e), (e = {})),
        (function (e, t) {
          if (null != t) {
            var n, i;
            for (i in t)
              null == (n = t[i]) || Object.prototype.hasOwnProperty.call(e, i) || (e[i] = n);
          }
        })(e, r),
        (e.components = e.extraComponents.concat(B)));
      var n = {
          data: [],
          addPreprocessedComponent: function (t, i) {
            ('function' == typeof e.preprocessor && (i = e.preprocessor(t, i)),
              n.data.push({ key: t, value: i }));
          },
        },
        i = -1,
        o = function (a) {
          if ((i += 1) >= e.components.length) t(n.data);
          else {
            var s = e.components[i];
            if (e.excludes[s.key]) o(!1);
            else {
              if (!a && s.pauseBefore)
                return (
                  (i -= 1),
                  void setTimeout(function () {
                    o(!0);
                  }, 1)
                );
              try {
                s.getData(function (e) {
                  (n.addPreprocessedComponent(s.key, e), o(!1));
                }, e);
              } catch (a) {
                (n.addPreprocessedComponent(s.key, String(a)), o(!1));
              }
            }
          }
        };
      o(!1);
    }),
    (Y.getPromise = function (e) {
      return new Promise(function (t, n) {
        Y.get(e, t);
      });
    }),
    (Y.getV18 = function (e, t) {
      return (
        null == t && ((t = e), (e = {})),
        Y.get(e, function (n) {
          for (var i = [], o = 0; o < n.length; o++) {
            var a = n[o];
            if (a.value === (e.NOT_AVAILABLE || 'not available'))
              i.push({ key: a.key, value: 'unknown' });
            else if ('plugins' === a.key)
              i.push({
                key: 'plugins',
                value: d(a.value, function (e) {
                  var t = d(e[2], function (e) {
                    return e.join ? e.join('~') : e;
                  }).join(',');
                  return [e[0], e[1], t].join('::');
                }),
              });
            else if (-1 !== ['canvas', 'webgl'].indexOf(a.key))
              i.push({ key: a.key, value: a.value.join('~') });
            else if (
              -1 !==
              [
                'sessionStorage',
                'localStorage',
                'indexedDb',
                'addBehavior',
                'openDatabase',
              ].indexOf(a.key)
            ) {
              if (!a.value) continue;
              i.push({ key: a.key, value: 1 });
            } else
              a.value
                ? i.push(a.value.join ? { key: a.key, value: a.value.join(';') } : a)
                : i.push({ key: a.key, value: a.value });
          }
          var r = s(
            d(i, function (e) {
              return e.value;
            }).join('~~~'),
            31,
          );
          t(r, i);
        })
      );
    }),
    (Y.x64hash128 = s),
    (Y.VERSION = '2.1.0'),
    Y
  );
});
EDU(
  '0f41af6787ffe3a4069dbd1559a55c3d',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u) {
    function f(e) {
      var t = document.createElement('div');
      t.setAttribute('id', e);
      t.classList.add('user-player');
      return t;
    }
    var h;
    var p = window;
    var m = 3e4;
    var b = parseInt(1e5 * Math.random());
    var g = p.webUser ? p.webUser.id : b;
    var v = p.webUser ? p.webUser.nickName : '游客' + b;
    var E =
      p.webUser && p.webUser.largeFaceUrl
        ? p.webUser.largeFaceUrl
        : 'https://edu-image.nosdn.127.net/11652E8DC02A06857E392EB2A3C8E2FD.png';
    var w = 'true' == window.isMobilePhone ? s : a;
    h = e.$extends({
      name: 'ux-mooc-polyv-live',
      data: {
        watchStartTime: null,
        hasLogin: window.webUser && window.webUser.id,
        liveId: window.liveInfo && window.liveInfo.id,
        liveTokenInfo: {},
        dircetAuthParm: {},
        liveInfo: {},
        userId: g,
        userName: v,
        base64UserName: encodeURIComponent(_._$str2b64(v)),
        userFaceUrl: E.split('?')[0],
        isPlaying: !1,
      },
      computed: {
        isPolyvLive: function () {
          return (
            this.data.liveInfo.cdnMode === o.LIVE_MODE_POLYV_PART ||
            this.data.liveInfo.cdnMode === o.LIVE_MODE_POLYV_FULL
          );
        },
        isYKT: function () {
          if (!this.data.liveInfo) return !1;
          else return this.data.liveInfo.cdnMode == o.LIVE_MODE_POLYV_PART;
        },
        isPlayingAndYKT: function () {
          if (!this.data.liveInfo) return !1;
          else
            return (
              this.computed.isYKT.get(this) &&
              this.data.liveInfo.liveStatus == o.LIVE_STATUS_PLAYING
            );
        },
        isNotStart: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_NOTSTART;
        },
        isComing: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_COMING;
        },
        isPlaying: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_PLAYING;
        },
        isEnd: function () {
          var e = this.data.liveInfo;
          return e.liveStatus == o.LIVE_STATUS_END || e.liveStatus == o.LIVE_STATUS_INVALID;
        },
        isHasChat: function () {
          if (this.data.originMenus)
            for (var e = 0; e < this.data.originMenus.length; e++) {
              var t = this.data.originMenus[e];
              if ('chat' == t.menuType) {
                if ('Y' == t.displayEnabled) return !0;
                break;
              }
            }
          return !1;
        },
      },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.initTrackEvent();
        this.data.$$isNarrowScreen =
          this.data.isLiveLearn && window.screen && window.screen.width < 1500;
        this.$update();
        if (this.data.isLiveLearn && !this.data.isColumnLive && !this.computed.isEnd.get(this))
          r.handleLiveSubscriptionComp(
            this.data.liveInfo,
            '#polyvPlayerBg',
            w,
            this.computed.isPolyvLive.get(this),
          );
        this.getPolyvDircetAuthParm();
      },
      getPolyvDircetAuthParm: function () {
        n._$getPolyvDircetAuthParm(
          { viewId: g },
          function (e) {
            this.data.dircetAuthParm = e;
            var t = i._$isMiniProgram()
              ? 'https://fde86a4bc0.live.polyv.cn'
              : 'https://live.polyv.cn';
            this.data.iframeUrl =
              t +
              '/watch/' +
              this.data.liveInfo.liveChannelId +
              (this.data.isMobile ? '?' : '?hasFrame=1&') +
              'userid=' +
              this.data.userId +
              '&ts=' +
              e.ts +
              '&sign=' +
              e.sign;
            this.$update();
            this.fetchToken();
          }._$bind(this),
        );
      },
      pollingLiveInfo: function (e) {
        n._$getLiveRoomInfo(
          { liveContentId: this.data.liveId || this.data.liveInfo.id, isNeedDetail: e },
          function (e) {
            if (e) {
              this.data.liveInfo = e;
              this.pollingLiveInfoCb(e);
              this.$update();
            }
          }._$bind(this),
        );
      },
      pollingLiveInfoCb: function (e) {
        this.data.liveInfo = e;
        if (
          e.liveStatus == o.LIVE_STATUS_END ||
          e.liveStatus == o.LIVE_STATUS_INVALID ||
          e.liveStatus == o.LIVE_STATUS_DELAY_START
        ) {
          if (e.liveStatus != o.LIVE_STATUS_DELAY_START)
            this.setIntervalLiveInfo && clearInterval(this.setIntervalLiveInfo);
          if (this.liveMobilePlayerStatus) this.liveMobilePlayerStatus.destroy();
          if (this.data.isMobile)
            this.liveMobilePlayerStatus = new d({ data: { liveStatus: e.liveStatus } }).$inject(
              this.$refs.polyvPlayerBg,
            );
          else
            this.liveMobilePlayerStatus = new c({ data: { liveStatus: e.liveStatus } }).$inject(
              this.$refs.polyvPlayerBg,
            );
        } else if (this.liveMobilePlayerStatus) this.liveMobilePlayerStatus.destroy();
        var t = e.liveStatus === o.LIVE_STATUS_PLAYING;
        var n = e.liveStatus === o.LIVE_STATUS_END;
        if (t && !window.__trackWatchTime) {
          var i = this.trackWatchTime;
          this.data.watchStartTime = new Date();
          window.__trackWatchTime = function () {
            i();
          };
        }
        if (n && window.__trackWatchTime) window.__trackWatchTime();
        this.$update();
      },
      fetchToken: function () {
        n._$getPolyvChannelToken(
          { channelId: this.data.liveInfo.liveChannelId },
          function (e) {
            this.data.liveTokenInfo = e || {};
            this.$update();
            this.getMenu();
          }._$bind(this),
        );
      },
      getMenu: function () {
        var e = this;
        var t = this.data.liveInfo;
        var n = t.liveChannelId;
        var i = this.data.liveTokenInfo.appId;
        var a = this.data.liveTokenInfo.sign;
        var s = this.data.liveTokenInfo.timestamp;
        PolyvLiveSdk.getChannelInfo(n, i, a, s).then(function (n) {
          if (!e.data.isMobile && n.channelMenus) {
            var i = [];
            n.channelMenus.forEach(function (e) {
              if ('desc' == e.menuType || 'text' == e.menuType || 'iframe' == e.menuType) {
                if (e.content)
                  e.content = e.content
                    .replace(/nos\.netease\.com\/edu-image/g, 'edu-image.nosdn.127.net')
                    .replace(/nos\.netease\.com\/mooc-image/g, 'mooc-image.nosdn.127.net');
                i.push(e);
              }
            });
            e.data.channelMenus = i;
            e.data.activeMenuId = i[0].menuId;
            e.data.originMenus = n.channelMenus;
          }
          if (
            t.liveStatus == o.LIVE_STATUS_PLAYING ||
            t.liveStatus == o.LIVE_STATUS_COMING ||
            t.liveStatus == o.LIVE_STATUS_DELAY_START
          ) {
            e.pollingLiveInfo(0);
            e.setIntervalLiveInfo = setInterval(function () {
              e.pollingLiveInfo(0);
            }, m);
          } else e.pollingLiveInfoCb(t);
          e.$update();
        });
      },
      clickMenu: function (e) {
        this.$update({ activeMenuId: e });
      },
      toLogin: function () {
        u._$showLogin({}, location.href);
      },
      trackWatchTime: function () {
        var e = this.data.watchStartTime;
        if (null !== e) {
          var t = new Date();
          var n = (t - e) / 1e3;
          if (!(n < 1)) {
            var i = {
              pagename: '直播间页面',
              user_id: null,
              live_id: this.data.liveId || p.liveInfo.id,
              remain_time: null,
            };
            if (!window.webUser)
              window.Fingerprint2 &&
                window.Fingerprint2.getV18({}, function (e, t) {
                  i.user_id = 'anonymous-' + e;
                  i.remain_time = n;
                  DATracker && DATracker.track('观看直播', i);
                  console.info('live watch log', i);
                });
            else {
              i.user_id = window.webUser.id;
              i.remain_time = n;
              DATracker && DATracker.track('观看直播', i);
              console.info('live watch log', i);
            }
            this.data.watchStartTime = new Date();
          }
        }
      },
      initTrackEvent: function () {
        DATracker &&
          DATracker.init('MA-A976-948FFA05E931', {
            img: !0,
            truncateLength: 255,
            persistence: 'localStorage',
            cross_subdomain_cookie: !1,
            use_app_track: !0,
          });
        var e = !('onpagehide' in window);
        window.addEventListener(
          'visibilitychange',
          function (e) {
            if ('hidden' === document.visibilityState) this.trackWatchTime();
            if ('visible' === document.visibilityState && null !== this.data.watchStartTime)
              this.data.watchStartTime = new Date();
          }._$bind(this),
        );
        window.addEventListener(
          'beforeunload',
          function (e) {
            this.trackWatchTime();
            e.preventDefault();
            e.returnValue = '';
          }._$bind(this),
        );
        window.addEventListener(
          'popstate',
          function (e) {
            this.trackWatchTime();
          }._$bind(this),
        );
        window.addEventListener(
          'unload',
          function (e) {
            this.trackWatchTime();
          }._$bind(this),
        );
        if (!e)
          window.addEventListener(
            'pagehide',
            function (e) {
              this.trackWatchTime();
            }._$bind(this),
          );
      },
    });
    return h;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '6f662c68416d97c376fb7e135752a301',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  '2d049fbc26f142d58c4f7b43ab6d59d0',
  '7d54152970cd710e0efa53a37a1e2c95',
  '051638d0f2bc4e591e7a6a850e191ac4',
  'f2389227e456e3ea56d0bf34ceb8fad4',
  '9da0c5f9c3384f5bf831188567dfa7e9',
  'f788ea0e4c9e44230ca4931f90b407e4',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
);
EDU(
  '7ce31ec96c87c1843c1a31ab1f65c11a',
  '<div class="ux-mooc-polyv-live {isYKT?\'ykt\':\'normal\'}">\n{#if isYKT}\n<iframe src="{iframeUrl}"  width="100%" height="100%" scrolling="no" frameborder="0" allowfullscreen="true" allow="microphone; camera"></iframe>\n{#if !hasLogin}\n<div class="ux-mooc-polyv-live__unlogin" on-click={this.toLogin()}><p>请先登录后发言</p></div>\n{/if}\n{#else}\n<iframe src="{iframeUrl}"  width="100%" height="100%" scrolling="no" frameborder="0" allowfullscreen="true" allow="microphone; camera"></iframe>\n{#if isHasChat && !hasLogin}\n<div class="ux-mooc-polyv-live__unlogin" on-click={this.toLogin()}><p>请先登录后发言</p></div>\n{/if}\n{/if}\n<div id="polyvPlayerBg" ref="polyvPlayerBg" class="ux-mooc-polyv-live__bg {isHasChat? \'\' : \'noHasChat\'}" style="display:{isPlaying?\'none\':\'block\'}"></div>\n</div>\n{#if channelMenus && channelMenus.length > 0 && channelMenus[0].content}\n<div class="ux-mooc-polyv-live__menu {$$isNarrowScreen ? \'ux-mooc-polyv-live__menu--mini\' : \'\'}">\n<ul id="menuTab" class="menu-tab">\n{#list channelMenus as menu}\n<li on-click={this.clickMenu(menu.menuId)} class="{activeMenuId == menu.menuId?\'active\':\'\'}">{menu.name}</li>\n{/list}\n</ul>\n<div id="menuContent" class="menu-content">\n{#list channelMenus as menu}\n<div class="menu-content__item {activeMenuId == menu.menuId?\'active\':\'\'}  {menu.menuType}">\n{#if menu.menuType == \'iframe\'}\n<iframe src="{menu.content}" width=\'100%\' height=\'700px\'></iframe>\n{#else}\n<div class="">{#inc menu.content}</div>\n{/if}\n</div>\n{/list}\n</div>\n</div>\n{/if}',
);
EDU(
  'b47171ad54c753b88eb2b2433608e0ee',
  '.ux-mooc-polyv-live__menu {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 1425px;\n  padding: 0 70px; }\n  .ux-mooc-polyv-live__menu--mini {\n    width: 100%;\n    min-width: 960px; }\n\n.ux-mooc-polyv-live.normal #polyvPlayerBg.ux-mooc-polyv-live__bg.noHasChat {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n\n.ux-mooc-polyv-live {\n  width: 1425px;\n  height: 635px;\n  overflow: hidden;\n  position: relative; }\n  .ux-mooc-polyv-live.mini {\n    position: relative;\n    left: -80px;\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n    .ux-mooc-polyv-live.mini.normal {\n      width: 1201px;\n      height: 546px; }\n    .ux-mooc-polyv-live.mini.normal .ux-mooc-polyv-live__bg {\n      width: 901px;\n      height: 505px; }\n  .ux-mooc-polyv-live__maskbg {\n    width: calc(100% + 1px);\n    height: 40px;\n    position: absolute;\n    left: 0;\n    top: 0;\n    background: url(//edu-image.nosdn.127.net/7D3D2997B73E9CDECE2AB19E23D50705.jpg?imageView&thumbnail=500y500&quality=100) repeat; }\n  .ux-mooc-polyv-live .ux-mooc-polyv-live__bg {\n    position: absolute;\n    left: 71px;\n    top: 45px;\n    width: 978px;\n    height: 550px; }\n  .ux-mooc-polyv-live .ux-mooc-polyv-live__unlogin {\n    position: absolute;\n    left: 1049px;\n    width: 306px;\n    background: #a7a7a7;\n    height: 90px;\n    top: 505px;\n    color: #ffff;\n    text-align: center;\n    padding-top: 30px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    cursor: pointer; }\n\n.menu-tab {\n  margin: 0;\n  list-style: none;\n  line-height: 38px;\n  text-align: center;\n  color: #fff;\n  font-size: 24px; }\n\n.menu-tab > li {\n  padding: 5px 0;\n  margin: 0 15px;\n  display: inline-block;\n  border-bottom: 2px solid transparent;\n  cursor: pointer;\n  -webkit-transition: all 0.1s;\n  transition: all 0.1s; }\n\n.menu-tab > li.active {\n  color: #2196f3;\n  border-bottom: 4px solid #2196f3; }\n\n.menu-content {\n  background-color: #f6f9fa;\n  margin: 20px 0;\n  overflow: auto;\n  font-size: 14px; }\n  .menu-content img {\n    max-width: 100%;\n    height: auto; }\n  .menu-content__item {\n    display: none;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 30px 20px; }\n    .menu-content__item.iframe {\n      padding: 0; }\n    .menu-content__item.active {\n      display: block; }\n',
);
EDU(
  'aae6e059722698fd6c1e787c74837e08',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'ux-mooc-polyv-live',
      template: t,
      css: n,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '0f41af6787ffe3a4069dbd1559a55c3d',
  '7ce31ec96c87c1843c1a31ab1f65c11a',
  'b47171ad54c753b88eb2b2433608e0ee',
);
EDU(
  '2bd79248584c9681e369d4f4c0395fcb',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h, p, m, b) {
    var g = NEJ.P('edu.u');
    var v = {
      TIME: { MS_OF_1_MIN: 6e4 },
      EVENTS: {
        SHOULD_UPDATE_LIVE_INFO: 'shouldUpdateLiveInfo',
        SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA: 'shouldUpdatePlayBackVideoData',
        SHOULD_UPDATE_ROOM_INFO: 'shouldUpdateRoomInfo',
        AFTER_UPDATE_LIVE_INFO: 'afterUpdateLiveInfo',
        AFTER_UPDATE_PLAY_BACK_VIDEO_DATA: 'afterUpdatePlayBackVideoData',
      },
    };
    var E = i.$extends({
      name: 'live-wrap',
      template: t,
      css: n,
      data: {
        liveId: null,
        isLiveLearn: !1,
        _liveInfo: null,
        _roomInfo: null,
        _playBackVideoData: null,
        _liveModule: null,
        $$joinStatus: 0,
      },
      config: function () {
        this.supr();
      },
      computed: {
        isYKT: function () {
          var e = this.data._liveInfo;
          return e.cdnMode == a.LIVE_MODE_POLYV_PART;
        },
        isPlayingAndYKT: function () {
          var e = this.data._liveInfo;
          if (!e) return !1;
          else return e.cdnMode == a.LIVE_MODE_POLYV_PART && e.liveStatus == a.LIVE_STATUS_PLAYING;
        },
      },
      _hasOngoingLive: function (e, t) {
        return !!(e && t && e.id && e.meetId && t.appKey && t.token);
      },
      _onLiveInfoUpdate: function (e) {
        this.$emit(v.EVENTS.AFTER_UPDATE_LIVE_INFO, e);
      },
      tryInitLiveModule: function () {
        var e = this.data._liveInfo || {},
          t = this.data._roomInfo || {};
        var n = this._hasOngoingLive(e, t);
        if ((n || this.data._playBackVideoData) && !this.data._liveModule) {
          this._initLive();
          this.$update();
        }
      },
      _initPlayBackData: function () {
        if (this.data._playBackVideoData) {
          this.data._playBackVideoData.autoStart = !0;
          this.data._playBackVideoData.preload = !1;
          this.data._playBackVideoData.start = 0;
        }
      },
      _normalizeLiveInfo: function () {
        var e = this.data._liveInfo;
        if (e)
          e.presenterFaceUrl =
            e.presenterFaceUrl ||
            '//edu-image.nosdn.127.net/D893FA72CDBD42A24B8E0F8A537DA1F4.jpg?imageView&thumbnail=80y80&quality=100';
      },
      _initLiveInfo: function () {
        if (this.data.liveId)
          this.$emit(v.EVENTS.SHOULD_UPDATE_LIVE_INFO, this._on[v.EVENTS.SHOULD_UPDATE_LIVE_INFO]);
        else this.data.isLiveExist = !1;
      },
      _initRoomInfo: function () {
        var e = this;
        var t = this.data._liveInfo.cdnMode;
        if (this.data.liveId)
          if (
            (t == a.LIVE_MODE_POLYV_PART || t == a.LIVE_MODE_POLYV_FULL) &&
            this.data._liveInfo.liveStatus != a.LIVE_STATUS_TRANSFORM_COMPLETE
          ) {
            if (!this.polyvLive)
              this.polyvLive = new f({
                data: {
                  liveInfo: this.data._liveInfo,
                  isLiveLearn: this.data.isLiveLearn,
                  isColumnLive: this.data.isColumnLive,
                },
              }).$inject(this.$refs.liveWrap);
          } else
            this.$emit(
              v.EVENTS.SHOULD_UPDATE_ROOM_INFO,
              this._on[v.EVENTS.SHOULD_UPDATE_ROOM_INFO],
            );
        else this.data.isLiveExist = !1;
      },
      openDeviceSetting: function () {
        this.polyvLive.rtc.openDeviceSetting();
      },
      joinChannel: function () {
        if (this.polyvLive.rtc)
          if (1 == this.data.$$joinStatus) {
            this.polyvLive.rtc.cancelJoinChannel();
            this.data.$$joinStatus = 0;
            this.polyvLive.showOnlineTab();
          } else {
            this.polyvLive.rtc.joinChannel();
            this.data.$$joinStatus = 1;
          }
      },
      init: function () {
        this.supr();
        this._initEventHandlers();
        setTimeout(
          function () {
            this._initLiveInfo();
            this.$update();
          }.bind(this),
          200,
        );
        this.$update();
      },
      _initLive: function () {
        c._$getLiveAuthInfo(
          { liveId: this.data.liveId },
          function (e) {
            if (e.authToken) {
              var t = window;
              s.setAuth(e.authToken);
              s.setScope({
                applicationId: e.applicationId,
                sceneType: e.sceneType,
                sceneId: e.sceneId,
              });
              _._$addEvent(l.EVT_CLICK_LOGIN, function (e) {
                u._$showLogin({});
                _._$stop(e);
              });
              s.batch({});
              r.build({
                parent: this.$refs.liveWrap,
                liveId: this.data.liveId || t.liveInfo.id,
                userId: (t.webUser && t.webUser.id) || -1,
                playBackVideoData: null,
              });
              if (
                this.data._liveInfo.liveStatus == a.LIVE_STATUS_END ||
                this.data._liveInfo.liveStatus == a.LIVE_STATUS_INVALID
              )
                new b({ data: { liveStatus: this.data._liveInfo.liveStatus } }).$inject(
                  '.um-live-live-pc_player',
                );
              _._$addEvent('onLiveInfoUpdate', this._onLiveInfoUpdate.bind(this));
            } else alert('获取签名失败');
          }._$bind(this),
        );
      },
      _initEventHandlers: function () {
        this._on = {};
        this._on[v.EVENTS.SHOULD_UPDATE_LIVE_INFO] = function (e) {
          if (e) {
            this.data._liveInfo = e;
            this.data.$$showTripleScreen =
              e.cdnMode == a.LIVE_MODE_POLYV_PART && e.liveStatus != a.LIVE_STATUS_END;
            this._normalizeLiveInfo();
            if (e.liveStatus == a.LIVE_STATUS_TRANSFORM_COMPLETE)
              this.$emit(
                v.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA,
                this._on[v.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA],
              );
            else this._initRoomInfo();
          } else this.data.isLiveExist = !1;
          this.$emit(v.EVENTS.AFTER_UPDATE_LIVE_INFO, e);
          this.$update();
        }.bind(this);
        this._on[v.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA] = function (e) {
          console.log(e);
          this.data._playBackVideoData = (e && e.Video && e.Video.videoVo) || null;
          this._initPlayBackData();
          this._initVideo();
          this.$emit(v.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA, e, this.data._liveInfo);
          this.$update();
        }.bind(this);
        this._on[v.EVENTS.SHOULD_UPDATE_ROOM_INFO] = function (e) {
          this.data._roomInfo = e || {};
          this.tryInitLiveModule();
          this.$update();
        }.bind(this);
      },
      _initVideo: function () {
        if (this.__video) this.__video.__destroy();
        var e = { contentType: p.CONTENT_TYPE.LIVE, videoInfo: { autoStart: !0 } };
        if (this.data.isColumnLive) {
          e.bizId = this.data.lessonUnitId;
          e.bizType = p.BIZ_TYPE.UNIT;
        } else {
          e.bizId = this.data._liveInfo.id;
          e.bizType = p.BIZ_TYPE.LIVE;
        }
        if (!this.data.isLiveLearn || this.data.isColumnLive)
          this.__video = new h({ data: e })
            .$inject(this.$refs.liveWrap)
            .$on('onGetResourceTokenError', this._onGetResourceTokenError._$bind(this));
      },
      _onGetResourceTokenError: function (e) {},
    });
    E.CONST = v;
    return E;
  },
  'ca38b7e137b28e4006cbadb343315267',
  'afe426fdcae7b771cb970d9ab5a70a3f',
  '52a5c99cd736ff9eb728dcd2051013b3',
  '235c21779ec98ac90606962a862dadc9',
  'fed2a7787616f1c847df896918b515b5',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  '8f34a99b20d362b3542aebd517390fc1',
  'fed2a7787616f1c847df896918b515b5',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '731fee98f4051ac4516e6be41b9e3430',
  '7cc3fd8fe229634761a8f9221fda22d8',
  '665b4e36772193beffe50de855029c13',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  'aae6e059722698fd6c1e787c74837e08',
  '8950f51727c5f2d563d0f32d23cb63d5',
  'f2ddbbb127b496a19d690f05e2c0f5fe',
  '93828627ddb358ed890cb65967a0c1de',
  'f2389227e456e3ea56d0bf34ceb8fad4',
);
EDU(
  'ee319749cb1a4fb40557c321ad3ea842',
  '<div class="live-info-head-wrapper">\n<div class="unitTitle f-pr">\n<h1 class="name">{liveName}</h1>\n<div class="liveInfo f-fl">\n<div class=\'liveInfo__presenter\'>\n<a href="{presenterUrl}" target="_blank" rel="noopener noreferrer">\n<div class="liveInfo__presenter__avatar" style="background-image: url({presenterProfileImageUrl})"></div>\n</a>\n<a href="{presenterUrl}" target="_blank" class="presenterName f-fcgreen" rel="noopener noreferrer">\n<div class="liveInfo__presenter__name">{presenterName}</div>\n</a>\n<div class="liveInfo__presenter__tag">{lang.KEY_LIVEROOM_HOST}</div>\n</div>\n<span class="liveInfo__time">\n<span class="u-icon-clock2"></span>{lang.KEY_LIVEROOM_LIVE_TIME}&nbsp;&nbsp;&nbsp;{liveDateTime}\n</span>\n{#if memberNum}\n<div class=\'liveInfo__num\'><span class="u-icon-person"></span>{memberNum}{lang.KEY_LIVEROOM_PERSON_JOIN}</div>\n{/if}\n</div>\n{#if !isIntel && !showPresenterInfo && showShare}\n<div class="share f-fr" ref="share">\n<span>分享</span>\n<ux-share-share-embedded\ntitle={shareTitle}\ntopic={shareTopic}\ndescription={shareDesc}\npic={sharePic}\nurl={shareUrl}\nweixinQR={""}\nmodel={1}\n></ux-share-share-embedded>\n</div>\n{/if}\n</div>\n</div>',
);
EDU(
  'c345769186d8a7be2b72bf33d3150cd4',
  '.live-info-head-wrapper {\n  margin-bottom: 20px; }\n  .live-info-head-wrapper .unitTitle {\n    z-index: 99;\n    height: 75px; }\n    .live-info-head-wrapper .unitTitle .name {\n      margin-top: 30px;\n      color: #fff; }\n    .live-info-head-wrapper .unitTitle .share {\n      font-size: 16px;\n      color: #999; }\n      .live-info-head-wrapper .unitTitle .share .ux-share-share-embedded {\n        vertical-align: middle;\n        height: 30px;\n        margin-left: 15px; }\n    .live-info-head-wrapper .unitTitle .liveInfo {\n      color: #999;\n      font-size: 14px;\n      margin-top: 7px; }\n      .live-info-head-wrapper .unitTitle .liveInfo .u-icon-clock2 {\n        margin-right: 10px; }\n      .live-info-head-wrapper .unitTitle .liveInfo .u-icon-person {\n        margin: 0 10px 0 40px; }\n      .live-info-head-wrapper .unitTitle .liveInfo__num, .live-info-head-wrapper .unitTitle .liveInfo__presenter, .live-info-head-wrapper .unitTitle .liveInfo__presenter__avatar, .live-info-head-wrapper .unitTitle .liveInfo__presenter__name, .live-info-head-wrapper .unitTitle .liveInfo__presenter__tag {\n        display: inline-block;\n        vertical-align: middle; }\n      .live-info-head-wrapper .unitTitle .liveInfo__presenter {\n        margin-right: 30px;\n        font-size: 0px; }\n        .live-info-head-wrapper .unitTitle .liveInfo__presenter__avatar {\n          width: 30px;\n          height: 30px;\n          border-radius: 50%;\n          background-size: 100%;\n          background-position: center;\n          background-repeat: no-repeat;\n          margin-right: 10px;\n          background-image: url("//mc.stu.126.net/res/images/ui/profile-image.png?6fcdd9ff89580aad75d12cf9595aaa15"); }\n        .live-info-head-wrapper .unitTitle .liveInfo__presenter__name {\n          font-size: 16px;\n          color: white;\n          margin-right: 10px; }\n        .live-info-head-wrapper .unitTitle .liveInfo__presenter__tag {\n          background: #00CC7E;\n          border-radius: 2px;\n          width: 46px;\n          height: 20px;\n          line-height: 20px;\n          text-align: center;\n          font-size: 12px;\n          color: white; }\n',
);
EDU(
  '14ccab79839aac2dd9b426816a7215bb',
  function (e, t, n, i, o, a, s, r) {
    var c = {
      NAMES: { NO_LINK: 'no-link' },
      LINKS: { DEFAULT_PROFILE_IMAGE: '//mc.stu.126.net/res/images/ui/profile-image.png' },
    };
    var d = a.$extends({
      name: 'live-info-head',
      template: i,
      css: o,
      data: {
        liveName: '',
        liveDateTime: 0,
        memberNum: 0,
        shareTitle: '',
        shareTopic: '',
        shareDesc: '',
        sharePic: '',
        shareUrl: '',
        presenterUrl: '',
        presenterProfileImageUrl: '',
        presenterName: '',
        showPresenterInfo: !1,
        lang: e,
        isIntel: t.isImoocUrl(),
      },
      computed: {
        $$showMember: function () {
          return this.data.liveStatus != r.LIVE_STATUS_NOTSTART;
        },
        $$presenterProfileImageUrl: function () {
          return this.data.presenterProfileImageUrl || c.LINKS.DEFAULT_PROFILE_IMAGE;
        },
        showShare: function () {
          return !location.pathname.match(/\/custom\/live/);
        },
      },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return d;
  },
  'f65d4c38b0afda6fbd1ac233d0d7e05d',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'ca38b7e137b28e4006cbadb343315267',
  'ee319749cb1a4fb40557c321ad3ea842',
  'c345769186d8a7be2b72bf33d3150cd4',
  '235c21779ec98ac90606962a862dadc9',
  '8419259be84b2292fe5117e5d132029e',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
);
EDU(
  '6a55482e5dbb028d0889d49da80296ae',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u) {
    var f = NEJ.P('edu.u');
    var h = {
      TIME: { MS_OF_1_MIN: 6e4, MS_OF_20_SEC: 2e4, MS_OF_10_SEC: 1e4 },
      EVENTS: {
        SHOULD_SAVE_LEARN_PROGRESS: 'shouldSaveLearnProgress',
        SHOULD_SET_UNIT_FINISHED: 'shouldSetUnitFinished',
      },
      WIDTH: { LIVE_MAX_WIDTH: 1267, PLAYBACK_MAX_WIDTH: 960 },
    };
    var p = o.$extends({
      name: 'lesson-live-wrapper',
      template: n,
      css: i,
      data: {
        liveId: 0,
        maxWidth: h.WIDTH.LIVE_MAX_WIDTH,
        $$isLiveExist: !0,
        $$memberNum: 0,
        _updateMemberNumInterval: void 0,
        _liveInfo: {},
        _startWatchingLiveTime: null,
        _initialLiveStatus: null,
        _isLiveEnd: !1,
        _isInitEventsForwardingDone: !1,
      },
      config: function () {
        this.supr();
      },
      computed: {
        $$liveName: function () {
          return this.data._liveInfo.name;
        },
        $$liveDateTime: function () {
          return (
            d._$formatTime(
              this.data._liveInfo.liveStartTime,
              e.isImoocUrl() ? 'MM-dd HH:mm' : 'MM月dd日 HH:mm',
            ) +
            ' - ' +
            d._$formatTime(this.data._liveInfo.liveFinishedTime, 'HH:mm')
          );
        },
        $$presenterUrl: function () {
          return '//' + this.data._liveInfo.teacherUrl || '';
        },
        $$presenterProfileImageUrl: function () {
          return this.data._liveInfo.presenterFaceUrl || '';
        },
        $$presenterName: function () {
          return this.data._liveInfo.presenterName || '';
        },
        $$schoolUrl: function () {
          return this.data._liveInfo.schoolUrl || '';
        },
        $$schoolName: function () {
          return this.data._liveInfo.schoolName || '';
        },
        $$liveDesc: function () {
          return this.data._liveInfo.description || '';
        },
        $$shareTitle: function () {
          return (
            this.data._liveInfo.name +
            '_来自' +
            (this.data._liveInfo.schoolName || '') +
            (this.data._liveInfo.presenterName || '') +
            '的直播_中国大学MOOC出品'
          );
        },
        $$shareTopic: function () {
          return this.computed.$$shareTitle.get(this);
        },
        $$shareDesc: function () {
          return this.data._liveInfo.description || '更多精彩直播前往中国大学MOOC';
        },
        $$sharePic: function () {
          return this.data._liveInfo.liveCoverUrl || '';
        },
        $$shareUrl: function () {
          return window.location.href;
        },
        $$liveStatus: function () {
          return this.data._liveInfo.liveStatus || '';
        },
        $$shouldHideShare: function () {
          return window.hideTermShare;
        },
        $$isCloudLive: function () {
          var e = this.data._liveInfo.cdnMode;
          return 10 === e || 11 === e;
        },
      },
      _getMaxWidthOfLiveWrapper: function () {
        var e = this.computed.$$isCloudLive.get(this);
        return e ? '1303' : this.data.maxWidth;
      },
      _initMemberNum: function (e) {
        if (e.liveStatus == _.LIVE_STATUS_END || e.liveStatus == _.LIVE_STATUS_TRANSFORM_COMPLETE)
          this.data.$$memberNum = e.maxMemberNum || 0;
        else this.$update({ $$memberNum: 0 });
      },
      _initMaxMemberNum: function () {
        a._$getChatRoomMaxMemberNum(
          { liveContentId: this.data.liveId },
          function (e) {
            if (
              (this.data._liveInfo || {}).liveStatus == _.LIVE_STATUS_END ||
              (this.data._liveInfo || {}).liveStatus == _.LIVE_STATUS_TRANSFORM_COMPLETE
            )
              this.$update({ $$memberNum: e });
            else this.$update({ $$memberNum: 0 });
          }._$bind(this),
        );
      },
      _initLiveInfo: function (e) {
        this.data.$$isLiveExist = !!e;
        if (
          e &&
          'undefined' != typeof e.liveStatus &&
          e.liveStatus === _.LIVE_STATUS_TRANSFORM_COMPLETE
        )
          this.data.maxWidth = h.WIDTH.PLAYBACK_MAX_WIDTH;
        this.data._liveInfo = e || {};
        this.$update();
        this._initEventsForwarding();
      },
      _initInitialLiveStatus: (function () {
        var e = !1;
        return function (t) {
          if (!e && t) {
            this.data._initialLiveStatus = t.liveStatus;
            e = !0;
          }
        };
      })(),
      _updateLearnProgress: function (e, t) {
        var n = Date.now(),
          i = this.data._startWatchingLiveTime,
          t = t || h.TIME.MS_OF_10_SEC,
          o = this.data._initialLiveStatus,
          a = (e || {}).liveStatus,
          s = this.data._isLiveEnd,
          r = {};
        if (!s && e && null != a && o == _.LIVE_STATUS_PLAYING) {
          if (a == _.LIVE_STATUS_END || a == _.LIVE_STATUS_TRANSFORM_COMPLETE) {
            r.isFinished = !0;
            this.data._isLiveEnd = !0;
          } else if (n - i >= t) r.isFinished = !1;
          else return;
          this.$emit(h.EVENTS.SHOULD_SAVE_LEARN_PROGRESS, r);
        }
      },
      _initEvents: function () {
        this._on = {};
        this._on[r.CONST.EVENTS.AFTER_UPDATE_LIVE_INFO] = function (e) {
          this._initMemberNum(e);
          this._initLiveInfo(e);
          this._initInitialLiveStatus(e);
          this._updateLearnProgress(e);
          if (!this._isFirst) {
            this._isFirst = !0;
            this._initMaxMemberNum();
          }
          this.$update();
        }.bind(this);
        this._on[r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA] = function (e, t) {
          this.data._liveInfo = t;
          this.data.$$memberNum = t.maxMemberNum || 0;
          this.$update();
          this.$emit(r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA, e);
        }.bind(this);
        this._on[r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO] = function (e) {
          this.$emit(r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO, e);
        }.bind(this);
        this._on[r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA] = function (e) {
          this.$emit(r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA, e);
        }.bind(this);
        this._on[r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO] = function (e) {
          this.$emit(r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO, e);
        }.bind(this);
      },
      _initEventsForwarding: function () {
        if (this.$refs.liveWrap && !this.data._isInitEventsForwardingDone) {
          this.$refs.liveWrap
            .$on(
              r.CONST.EVENTS.AFTER_UPDATE_LIVE_INFO,
              this._on[r.CONST.EVENTS.AFTER_UPDATE_LIVE_INFO],
            )
            .$on(
              r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA,
              this._on[r.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA],
            )
            .$on(
              r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO,
              this._on[r.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO],
            )
            .$on(
              r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA,
              this._on[r.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA],
            )
            .$on(
              r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO,
              this._on[r.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO],
            );
          this.data._isInitEventsForwardingDone = !0;
        }
      },
      init: function () {
        this.supr();
        this._initEvents();
        this.data._startWatchingLiveTime = Date.now();
        this._initEventsForwarding();
      },
      onGetResourceTokenError: function (e) {
        this.data.getResourceTokenError = !0;
        this.$update();
      },
    });
    p.CONST = u(!0, h, r.CONST);
    return p;
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'ca38b7e137b28e4006cbadb343315267',
  '12b528595f4682da0afb7aaeb9b572e0',
  '395bdf4ab3827a145e12c5bb9dcbb9ec',
  '235c21779ec98ac90606962a862dadc9',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '052bb5990dd9f04804c028e7faa9809d',
  '2bd79248584c9681e369d4f4c0395fcb',
  '14ccab79839aac2dd9b426816a7215bb',
  '89a466f05573f560c156411121b8daae',
  '8419259be84b2292fe5117e5d132029e',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
  'f6224c30f6817fcd2b8c45779bf407f2',
);
EDU(
  '088051b8c61eef3a38d043e6c637cbb0',
  function (e) {
    var t = window,
      n = NEJ.P('edu.u');
    return {
      'live-pc': {
        liveUnstartCustomUI: null,
        chatroomConf: {
          showChatroomNum: !0,
          isMemberNumFromRequest: !1,
          isUserLogin: !!window.webUser,
          isSendMsgCreate: !0,
          openMuteOpt: !0,
          openRoomMute: !1,
          openTeammanagerOpt: !0,
        },
        anonymousConf: { loginBtnText: '去登录', loginTipText: '登录后才能参与直播间互动' },
        interactiveConf: { isShowVideoInteractive: !0, isShowAudioInteractive: !0 },
        waterMark: !1,
        notAllowFullScreen: !1,
        screenSharingChromeExtensionId: 'nioplpojiekfbkdaijjoekcbiidobgpa',
      },
      'live-mobile': {
        liveUnstartCustomUI: null,
        chatroomConf: {
          showChatroomNum: !0,
          isMemberNumFromRequest: !1,
          isUserLogin: !!window.webUser,
          isSendMsgCreate: !0,
          openMuteOpt: !0,
          openRoomMute: !1,
          openTeammanagerOpt: !0,
        },
        anonymousConf: { loginBtnText: '去登录', loginTipText: '登录后才能参与直播间互动' },
        waterMark: !1,
        notAllowFullScreen: !1,
        x5Fullscreen: !1,
      },
      'live-helper': {
        chatroomConf: {
          isMemberNumFromRequest: !1,
          isUserLogin: !!window.webUser,
          isSendMsgCreate: !0,
          openMuteOpt: !0,
          openRoomMute: !1,
          openTeammanagerOpt: !0,
        },
        anonymousConf: { loginBtnText: '去登录', loginTipText: '登录后才能参与直播间互动' },
      },
      'cache-live': {
        'live-getInfo': {
          url: e._$getUrlWithCsrfKey('/web/j/mocLiveRoomContentRpcBean.getLiveRoomInfo.rpc'),
        },
        'chat-getAddress': {
          url: e._$getUrlWithCsrfKey('/web/j/mocLiveRoomContentRpcBean.getChatroomAddr.rpc'),
        },
      },
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'f1c1923e72a7bf464958899fa52f322f',
  'd21e14021604149334caa2d8abddbfb2',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
);
EDU(
  '126d23b5ac6aef1dd83e84a4a70524a3',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c,
      d;
    var l = e.isEn();
    var _ = l
      ? '        <div class="f-fc6 j-title title f-f0" style="line-height: 50px;">Successfully enrolled!</div>        <p class="j-cnt cnt f-f0 f-fs14"></p>    '
      : '        <div class="f-fc6 j-title title f-f0">报名成功！</div>        <p class="j-cnt cnt f-f0 f-fs14">重要的课程提醒将通过邮件通知，请填写常用<br/>邮箱：</p>    ';
    var u = l
      ? '<div style="display: none;" class="j-add f-cb add">        <div class="f-fl"></div>        <div class="j-addFb f-fl"></div>    </div>'
      : '<div class="j-add f-cb add">        <div class="f-fl"></div>        <div class="j-addFb f-fl"></div>    </div>';
    var f = l
      ? '<div style="display: none;" class="f-cb btns">        <a style="display: none;" hidefocus="true" class="f-fr j-right u-btn-default u-btn-sm u-save u-btn"><span class="j-right-txt">Confirm</span></a>        <a hidefocus="true" class="f-fr j-left gotoLearn f-f0 f-fs18"><span class="j-left-txt">Go to directly</span></a>        <a hidefocus="true" class="f-fr j-know u-btn-default u-btn-sm u-save u-btn" style="display:none"><span>OK</span></a>    </div>'
      : '<div class="f-cb btns">        <a hidefocus="true" class="f-fr j-right u-btn-default u-btn-sm u-save u-btn"><span class="j-right-txt">保存</span></a>        <a hidefocus="true" class="f-fr j-left gotoLearn f-f0 f-fs18"><span class="j-left-txt">直接进入学习</span></a>        <a hidefocus="true" class="f-fr j-know u-btn-default u-btn-sm u-save u-btn" style="display:none"><span>知道了</span></a>    </div>';
    var h = '<div class="icn icn-success"' + (l ? ' style="margin-bottom: 0;"' : '') + '></div>';
    var p = o._$addNodeTemplate(
      '        <div class="m-commonMailDialog f-cb">            <div class="all j-all f-fl">' +
        h +
        _ +
        u +
        f +
        '</div>        </div>',
    );
    r._$$CommonMailDialog = NEJ.C();
    c = r._$$CommonMailDialog._$extend(r._$$Window, !0);
    r._$$CommonMailDialog._$showDialog = function (e) {
      var t = r._$$CommonMailDialog._$allocate(e);
      t._$show();
    };
    c.__initXGui = function () {
      this.__seed_html = p;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__title = o._$getByClassName(this.__body, 'title')[0];
      this.__cnt = o._$getByClassName(this.__body, 'j-cnt')[0];
      this.__saveBtn = o._$getByClassName(this.__body, 'j-right')[0];
      this.__knowBtn = o._$getByClassName(this.__body, 'j-know')[0];
      this.__gotoLearnBtn = o._$getByClassName(this.__body, 'j-left')[0];
      this.__gotoLearnBtnTxt = o._$getByClassName(this.__body, 'j-left-txt')[0];
      this.__mailAdd = o._$getByClassName(this.__body, 'j-add')[0];
      this.__mailAddChildren = o._$getChildren(this.__mailAdd);
      this.__iptNode = this.__mailAddChildren[0];
      this.__fbNode = this.__mailAddChildren[1];
      a._$addEvent(this.__saveBtn, 'click', this.__checkMail._$bind(this));
      a._$addEvent(this.__gotoLearnBtn, 'click', this.__gotoLearn._$bind(this));
      a._$addEvent(this.__knowBtn, 'click', this.__gotoLearn._$bind(this));
      this.__settingsCache = new s._$$COM_Cache_MemberCache();
      this.__settingsCache._$addEvent('onsaveEmail', this.__onsaveEmail._$bind(this));
      this.__settingsCache._$addEvent(
        'onsendActiveEmail',
        function (e, t) {
          if (t) {
            var n = l ? 'Mail sent successfully' : '邮件发送成功';
            var i = l ? 'Mail sent failed' : '邮件发送失败';
            var o = e ? n : i,
              a = e ? 1 : 2;
            r.showToastTips({ content: o, type: a });
          }
        }._$bind(this),
      );
    };
    c.__checkMail = function () {
      if (this.__mailIptUI) {
        var e = this.__mailIptUI._$getContent();
        var t = this.__mailIptUI._$getCount();
        if (t <= 0) {
          var n = l ? 'Please fill in your frequently used email address' : '请填写你的常用邮箱';
          this.__mailAddFbUI._$showWarnTips(n, !0);
          return;
        } else if (
          !this.__mailIptUI._$isMatchExp(/@([a-z0-9]+[_|\-|\.]?)*[a-z0-9]+\.[a-z]{2,3}$/i)
        ) {
          var n = l ? 'Please input a valid email address' : '请输入正确的邮箱地址';
          this.__mailAddFbUI._$showWarnTips('请输入正确的邮箱地址', !0);
          return;
        }
        this.__settingsCache._$saveEmail(e);
      }
    };
    c.__gotoLearn = function () {
      this._$dispatchEvent('onGotoLearn');
      this.__gotoLearnFlag = !0;
      this._$hide();
    };
    c.__onsaveEmail = function (e, t) {
      if (t) {
        this.__recycleUI();
        var n = l ? 'Email saved successfully' : '邮箱保存成功！';
        if (this.__startOffset > 0) {
          r._$hiddenNode(this.__gotoLearnBtn);
          r._$showNode(this.__knowBtn);
          r._$hiddenNode(this.__saveBtn);
          r._$hiddenNode(this.__cnt);
          this.__title.innerHTML = n;
        } else {
          var i = l ? 'Go to the course' : '进入学习';
          this.__gotoLearnBtnTxt.innerHTML = i;
          r._$hiddenNode(this.__saveBtn);
          r._$hiddenNode(this.__cnt);
          this.__title.innerHTML = n;
        }
        this.__sendVerifyEmail();
      }
    };
    c.__sendVerifyEmail = function (e) {
      this.__settingsCache._$sendActiveEmail(e);
    };
    c.__reset = function (e) {
      e.maskClickNotHidden = !0;
      e.title = e.title || ' ';
      this.__startOffset = e.start;
      this.__recycleUI();
      this.__supReset(e);
      if (!l) this.__genUI();
    };
    c.__genUI = function () {
      this.__mailIptUI = r._$$BaseInputUI._$allocate({
        parent: this.__iptNode,
        labelText: 'name@example.com',
        width: 270,
        height: 32,
        onInputFocus: function () {
          if (this.__mailAddFbUI) this.__mailAddFbUI._$hideFeedback();
        }._$bind(this),
      });
      this.__mailAddFbUI = r._$$FeedBackUI._$allocate({ parent: this.__fbNode });
      this.__mailAddFbUI._$hideFeedback();
      if (this.__startOffset > 0) r._$hiddenNode(this.__gotoLearnBtn);
    };
    c.__recycleUI = function () {
      if (this.__mailIptUI) this.__mailIptUI = r._$$BaseInputUI._$recycle(this.__mailIptUI);
      if (this.__mailAddFbUI) this.__mailAddFbUI = r._$$FeedBackUI._$recycle(this.__mailAddFbUI);
    };
    c.__destroy = function () {
      if (!this.__gotoLearnFlag) this._$dispatchEvent('enrollnotGotoLearn');
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'ddff3fe6a4233d567887a1921f3f1668',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '891a76809ded82c88f5536f4458ae1ad',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'cc26d5920093e9742f0feca3855e8e68',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '1c23b43dfd9c054559909485b4169fa4',
  function (e, t, n, i, o, a, s) {
    var r = window,
      c = NEJ.P('edu.d'),
      d = NEJ.P('edu.u');
    var l = (window.moocConfig || {}).lang || {};
    var _ = t.extend({
      config: function () {
        e.extend(this.data, {
          discusFlag: !0,
          contentTemplate: "<span class='u-icon-warning2'></span>请先参加课程再参与讨论。",
          title: '',
          cancelButton: this.data.lang ? this.data.lang.KEY_LEARN_CANCEL : l.KEY_LEARN_CANCEL,
          okButton: this.data.lang ? this.data.lang.KEY_LEARN_JOIN_NOW : l.KEY_LEARN_JOIN_NOW,
          class: 'u-attend-tip',
        });
        if (!this.data.discusFlag)
          this.data.contentTemplate = this.data.lang
            ? this.data.lang.KEY_LEARN_PLEASE_QUIZ
            : l.KEY_LEARN_PLEASE_QUIZ;
        this.supr();
      },
      init: function () {
        this.courseName = r.courseDto.name;
        this.termDto = r.termDto;
        this.$update();
        this.cache = new c._$$COM_Cache_CourseCache();
        this.memberCache = new c._$$COM_Cache_MemberCache();
        this.cache._$addEvent('onStartTermLearn', this.onStartLearnCourseCb._$bind(this));
        this.memberCache._$addEvent('onCheckEmailStatus', this.onCheckEmailStatus._$bind(this));
        this.supr();
      },
      ok: function () {
        this.memberCache._$checkEmailStatus();
        this.supr();
      },
      onCheckEmailStatus: function (e) {
        this.cache._$StartTermLearn(this.termDto.id, null);
      },
      onStartLearnCourseCb: function () {
        r.isEnroll = !0;
        if (this.enrollnotGotoLearn) window.location.reload();
        else r.location.reload();
        this.destroy();
      },
      gotoLearn: function () {
        this.cache._$StartTermLearn(this.termDto.id, null);
      },
      destroy: function () {
        this.supr();
      },
    });
    return _;
  },
  'ca38b7e137b28e4006cbadb343315267',
  'd414623f7407e577cd6c05efff08e96f',
  '891a76809ded82c88f5536f4458ae1ad',
  '93828627ddb358ed890cb65967a0c1de',
  '126d23b5ac6aef1dd83e84a4a70524a3',
  'a936afb5ecab0e9286c3c9d05341571d',
);
EDU(
  '206d700f30c20776732fe89f2c364cde',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'segmentList',
      data: { className: '', segmentList: [] },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
      show: function () {
        this.data.className = 'slide-in';
        this.$update();
      },
      hide: function () {
        this.data.className = 'slide-out';
        this.$update();
      },
      toSegmentInfo: function (e) {
        this.$emit('setVideoTime', { time: parseInt(e.startTime / 1e3), segment: e });
      },
      formatTime: function (e) {
        var t = Math.floor(e / 1e3);
        var n = Math.floor(t / 60);
        t %= 60;
        return n.toString().padStart(2, '0') + ':' + t.toString().padStart(2, '0');
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  '93828627ddb358ed890cb65967a0c1de',
  '217dcfc103efb36d2f192eecc4548797',
);
EDU(
  'a73e7ee2eea7fb7073b1b0af2916f224',
  '<div class="video-segment-list {className}">\n<i class="close" on-click={this.hide()}></i>\n<p class="video-segment-list_title">视频分段</p>\n<div class="video-segment-list_container">\n{#list segmentList as segment}\n<div class="video-segment-list_item" on-click={this.toSegmentInfo(segment)}>\n<img src="{segment.pictureUrl}" alt="">\n<div class="video-segment-list_item-content">\n<p class="video-segment-list_item-title">{segment.title}</p>\n<p class="video-segment-list_item-time">{this.formatTime(segment.startTime)}-{this.formatTime(segment.endTime)}</p>\n</div>\n</div>\n{/list}\n</div>\n</div>',
);
EDU(
  '19695dad3d68d9d9f834e6ee98a30ba4',
  "@charset \"UTF-8\";\n@-webkit-keyframes slidein {\n  from {\n    -webkit-transform: translateX(-550px);\n            transform: translateX(-550px); }\n  to {\n    -webkit-transform: translateX(-173px);\n            transform: translateX(-173px); } }\n@keyframes slidein {\n  from {\n    -webkit-transform: translateX(-550px);\n            transform: translateX(-550px); }\n  to {\n    -webkit-transform: translateX(-173px);\n            transform: translateX(-173px); } }\n\n@-webkit-keyframes slideout {\n  from {\n    -webkit-transform: translateX(-173px);\n            transform: translateX(-173px); }\n  to {\n    -webkit-transform: translateX(-550px);\n            transform: translateX(-550px); } }\n\n@keyframes slideout {\n  from {\n    -webkit-transform: translateX(-173px);\n            transform: translateX(-173px); }\n  to {\n    -webkit-transform: translateX(-550px);\n            transform: translateX(-550px); } }\n\n.video-segment-list {\n  width: 352px;\n  height: 90%;\n  position: absolute;\n  right: -360px;\n  top: 20px;\n  z-index: 11;\n  border-radius: 8px;\n  padding: 15px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background-color: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(20.3742px);\n  color: #fff;\n  -webkit-transition: all 0.5s ease-in-out;\n  transition: all 0.5s ease-in-out; }\n  .video-segment-list.slide-in {\n    right: 20px; }\n  .video-segment-list.slide-out {\n    right: -360px; }\n  .video-segment-list .close {\n    width: 30px;\n    height: 30px;\n    font-size: 20px;\n    position: absolute;\n    right: 0;\n    top: 0;\n    text-align: center;\n    font-style: normal;\n    cursor: pointer;\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA05JREFUWEfNmU9oE1EQxr8ELbSCrSANHoLRGINYIhpNbbRgFfHkoQex5iDoVXKpp1py8BJKISAKBenNQw1KbAUpSBEjGCrFCBUlYiWmvdiDIApaaGuUL2bDNu6f2TRp90FYSN7M++2bnW9mXxyofWwH4AGwE8A2AC3lKz3+BPCrfP0KoADgRy1LOSwaNQM4CGAPgB0Wbb8B+AzgPYAlqa0UcCuAAIBDALZInevMWwUwC+AtgBUzXxJA7tZJANy9eg7u4svyrur6NQLkb0cABOtJpeErC+ANgD9a6+gBMoynAOxtMJziPg8gDYDhXzO0APndmQ2EU0M+q95JLUCGtNFh1QsMw81PZVQDMiHOblBY9ZaZUieOGpBS0teAbLV6v8zupCJBasDNDG31TVRCrQBS4y5JRdjn8zXPzc2Jq4GyugU7ZvN9VhwF8BiAw5JYzM/P97vdbt/09PSL7u7uZLFYNDXr6upqHR8fv9be3u5OJpMPIpHIc1Ojf9r4WgG8IKmtfr+/JZfLJRwOh5MLZLPZTCgUumcESbjJycnrbW1tLtrk8/l3Xq/3jgCQtfshAdmVMDlEI5PJ9IXD4R5lshFkNVyxWPwdi8Vux+PxD6LFgCQB2QQcFxrA6XRiZmbmcjAYPGEEqQU3PDx8d2BggI2CdLwi4GkA+6QWnGcGWSc4LvWJgOcB7LICaAQZjUYfq585hrWGnVNwvhDwIoBWq4B6kMvLy0tNTU2l1mydcHTxnYBXpfqndRNa4a4THN2sEvAKAJa5mgefuXQ6fVPZOToqFAo5r9d7S6KTBguvrCvEdFydEOrFJDppsiulENeUJFpwfOYWFhY+ejyeAxKdFISslCSWZUYPjtk6ODg4K9FJAVxFZiwJtRGcIsJmOimE47SSUFsqdVIRrhNkqdRxiJoFTlxcXLzhcrl2S6REC3JiYuJRb2/vU8EuVpoFzj1afsU0tFN3M1IRroa00M2sabfEDevY2FhPZ2dnx+jo6NTQ0JCoKyFkKpU6FwgE9icSiScjIyM8AjEa/zWsnGzrlp+Atn9pIqStXzuVZ2IzQ2364k5I2x99ENLWh0dKqG19/KbWKNseYKohbX0ErAZlxekon+7b6hBdqyxtyN8QfwGd16w/0FfALwAAAABJRU5ErkJggg==) no-repeat;\n    background-size: contain; }\n  .video-segment-list_title {\n    font-family: 'PingFang SC';\n    font-style: normal;\n    font-weight: 500;\n    font-size: 16px;\n    line-height: 22px;\n    margin-bottom: 16px; }\n  .video-segment-list_container {\n    max-height: 90%;\n    overflow-y: auto; }\n    .video-segment-list_container::-webkit-scrollbar {\n      width: 5px;\n      height: 1px; }\n    .video-segment-list_container::-webkit-scrollbar-thumb {\n      border-radius: 10px;\n      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n      background: #d5d5d5; }\n  .video-segment-list_item {\n    font-family: 'PingFang SC';\n    font-style: normal;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 20px;\n    color: #FFFFFF;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    margin-bottom: 20px;\n    cursor: pointer; }\n    .video-segment-list_item img {\n      border-radius: 8px;\n      margin-right: 11px;\n      width: 92px; }\n    .video-segment-list_item-content {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -ms-flex-pack: distribute;\n          justify-content: space-around; }\n    .video-segment-list_item-title {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      /* 超出部分显示省略号 */\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      /* 最多显示两行文本 */\n      -webkit-box-orient: vertical;\n      white-space: normal;\n      /* 允许换行 */ }\n    .video-segment-list_item-time {\n      font-size: 12px;\n      line-height: 14px;\n      opacity: 0.6; }\n",
);
EDU(
  'd7bf69989e546759b84529160c7674fa',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'segmentList',
      template: t,
      css: n,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '206d700f30c20776732fe89f2c364cde',
  'a73e7ee2eea7fb7073b1b0af2916f224',
  '19695dad3d68d9d9f834e6ee98a30ba4',
);
EDU(
  'e364e2057bc7983da4625c72cc14d9f4',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'segmentMaskGuide',
      data: { hasSegment: !1, hasAnchor: !1, $$toNext: !1 },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.data.hasSegment || this.data.hasAnchor) {
          var e = document.querySelector('.j-unitctBox');
          e.classList.add('mask-disabled');
        }
      },
      next: function () {
        if (this.data.hasAnchor) {
          this.data.hasSegment = !1;
          this.$update();
        } else {
          var e = document.querySelector('.j-unitctBox');
          e.classList.remove('mask-disabled');
          this.destroy();
        }
      },
      close: function () {
        var e = document.querySelector('.j-unitctBox');
        e.classList.remove('mask-disabled');
        this.destroy();
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  '93828627ddb358ed890cb65967a0c1de',
  '217dcfc103efb36d2f192eecc4548797',
);
EDU(
  '0572dc0c820204407037e85aabdf8dc4',
  '<div class="segment-mask-guide {!hasSegment?\'anchor\':\'\'} ">\n{#if hasSegment}\n<div class="segment-mask-guide_item">\n<p class="title">新增视频分段</p>\n<p class="info">点击快速定位知识点</p>\n<p class="btn" on-click={this.next()}>知道了</p>\n</div>\n{#else}\n<div class="segment-mask-guide_item">\n<p class="title">新增知识驻点开关</p>\n<p class="info">打开开关可查看视频补充内容</p>\n<p class="btn" on-click={this.close()}>知道了</p>\n</div>\n{/if}\n</div>',
);
EDU(
  '776bdabcf062ad60baaac68225ecbed3',
  ".segment-mask-guide {\n  position: absolute;\n  left: 100px;\n  bottom: 44px;\n  z-index: 12;\n  font-family: 'PingFang SC'; }\n  .segment-mask-guide.anchor {\n    left: initial;\n    right: 100px; }\n  .segment-mask-guide_item {\n    width: 214px;\n    height: 116px;\n    background: #FFFFFF;\n    border-radius: 8px;\n    padding: 16px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    font-weight: 400;\n    font-size: 14px;\n    position: relative;\n    color: #666666; }\n    .segment-mask-guide_item .title {\n      color: #333333;\n      font-weight: 500;\n      font-size: 16px;\n      margin-bottom: 6px; }\n    .segment-mask-guide_item .btn {\n      margin-top: 12px;\n      height: 24px;\n      font-size: 12px;\n      color: #fff;\n      line-height: 24px;\n      background: #00CC7E;\n      border-radius: 99px;\n      padding: 0 10px;\n      font-style: normal;\n      font-weight: 500;\n      display: inline-block;\n      cursor: pointer; }\n    .segment-mask-guide_item::after {\n      content: '';\n      display: block;\n      width: 0;\n      height: 0;\n      border-top: 15px solid white;\n      border-right: 15px solid transparent;\n      border-left: 15px solid transparent;\n      position: absolute;\n      bottom: -10px;\n      left: 88px; }\n",
);
EDU(
  '35f84d81ad6ae92f28bbb591b632b6c0',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'segmentList',
      template: t,
      css: n,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  'e364e2057bc7983da4625c72cc14d9f4',
  '0572dc0c820204407037e85aabdf8dc4',
  '776bdabcf062ad60baaac68225ecbed3',
);
EDU(
  '36ed33f3975bcc23db0b3cc5eda647b1',
  function (e, t, n, i, o) {
    function a(e, t) {
      var n,
        i,
        o = t;
      this.pause = function () {
        window.clearTimeout(n);
        o -= new Date() - i;
      };
      this.play = function () {
        i = new Date();
        window.clearTimeout(n);
        n = window.setTimeout(e, o);
      };
      this.play();
    }
    var s = {
      RIGHT_POS: [1, 2, 3],
      LEFT_POS: [4, 5, 6],
      POSTION_CLASS: {
        1: 'right-up',
        2: 'right-center',
        3: 'right-down',
        4: 'left-down',
        5: 'left-down',
        6: 'left-down',
      },
    };
    o = e.$extends({
      name: 'testRichText',
      data: { $$fullscreen: !1, $$ShowInfoModal: !1, posClass: 'right' },
      config: function () {
        this.supr();
      },
      computed: {
        $$top: function () {
          var e = { 1: '5%', 2: '42%', 3: '70%', 4: '5%', 5: '42%', 6: '70%' };
          return e[this.data.position];
        },
      },
      init: function () {
        this.supr();
        var e = this;
        var t = this.data.position || s.RIGHT_POS[2];
        this.data.posClass = s.LEFT_POS.indexOf(+this.data.position) > -1 ? 'left' : 'right';
        this.$update();
        var n = this.data.duration || 5;
        var o = i._$cookie('videoRate') || 1;
        var a = parseInt((n / o) * 1e3);
        e.__setTimeout = setTimeout(function () {
          if (!e.data.$$ShowInfoModal)
            if (!e.data.$$fullscreen) {
              e.slideOut();
              setTimeout(function () {
                if (e.__setTimeout) window.clearTimeout(e.__setTimeout);
                e.destroy();
              }, 800);
            } else e.destroy();
        }, a);
        document.documentElement.addEventListener('fullscreenchange', function () {
          if (document.fullscreenElement) e.data.$$fullscreen = !0;
          else e.data.$$fullscreen = !1;
          e.$update();
        });
      },
      toInfo: function () {
        this.$emit('onViewInfo');
        this.data.$$ShowInfoModal = !0;
        this.$update();
        DATracker.track('视频播放页-驻点点击-iaw', {
          user_id: !!window.webUser && window.webUser.id,
          pagename: 'videolearn',
          term_id: this.data.termId,
          video_id: this.data.videoId,
          point_id: this.data.id,
          point_name: this.data.title,
        });
      },
      showInfoModal: function () {
        this.data.$$ShowInfoModal = !0;
        this.$update();
      },
      close: function () {
        this.data.$$ShowInfoModal = !1;
        this.$emit('onClose');
        this.$update();
        DATracker.track('视频播放页-驻点关闭-iaw', {
          user_id: !!window.webUser && window.webUser.id,
          pagename: 'videolearn',
          term_id: this.data.termId,
          video_id: this.data.videoId,
          point_id: this.data.id,
          point_name: this.data.title,
        });
        this.destroy();
      },
      slideOut: function () {
        this.data.slideOut = !0;
        this.$update();
      },
    });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '93828627ddb358ed890cb65967a0c1de',
  '217dcfc103efb36d2f192eecc4548797',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
EDU(
  '2981bf58d3649d6d19c33eac9604953c',
  '<div class="test-richText {$$fullscreen?\'fullscreen\':\'\'} {slideOut?\'slide-out\':\'\'} {$$ShowInfoModal?\'info-modal\':posClass}" style="top:{$$top}">\n    {#if $$ShowInfoModal}\n    <div class="test-richText-info">\n        <span class="close" on-click="{this.close()}"></span>\n        {#inc analyse}\n    </div>\n    {#else}\n    <div class="test-richText-modal">\n        <span class="close" on-click="{this.close()}"></span>\n        <p class="title">{title}</p>\n        <p class="desc">{description}</p>\n        {#if analyse}\n        <a class="btn" href="javascript:;" on-click="{this.toInfo()}">看详解</a>\n        {/if}\n    </div>\n    {/if}\n</div>\n',
);
EDU(
  '82caaf84ec4930d607a7da19cde80713',
  '@charset "UTF-8";\n/* clear float */\n.f-cb:after,\n.g-container:after {\n  display: block;\n  clear: both;\n  visibility: hidden;\n  height: 0;\n  overflow: hidden;\n  content: \'.\'; }\n\n.f-cb,\n.g-container {\n  zoom: 1; }\n\n.f-thide,\n.f-nowrp {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.f-hide {\n  text-indent: -9999px;\n  overflow: hidden; }\n\n.f-ib {\n  display: inline-block;\n  zoom: 1;\n  *display: inline; }\n\n.f-vam {\n  vertical-align: middle; }\n\n.f-vat {\n  vertical-align: top; }\n\n.f-dn {\n  display: none; }\n\n.f-db {\n  display: block; }\n\n.f-pr {\n  position: relative; }\n\n.f-pf {\n  position: fixed; }\n\n.f-af {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\n.f-tc {\n  text-align: center; }\n\n.f-ww {\n  word-wrap: break-word; }\n\n.f-sign {\n  font-weight: bold;\n  color: #cc3333;\n  padding-right: 5px;\n  vertical-align: middle; }\n\n.f-bg {\n  background-color: #fff;\n  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); }\n\n.f-bgw {\n  background-color: #fff; }\n\n/* suggest not use */\n.f-fl {\n  float: left; }\n\n.f-fr {\n  float: right; }\n\n.f-pa {\n  position: absolute; }\n\n/* 富文本内容 样式 */\n.f-richEditorText {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  text-align: left;\n  color: #666;\n  line-height: 22px;\n  word-break: break-word;\n  word-wrap: break-word;\n  white-space: pre-wrap; }\n  .f-richEditorText em {\n    font-style: italic; }\n  .f-richEditorText p {\n    margin: 0;\n    padding: 0; }\n  .f-richEditorText span {\n    word-wrap: break-word;\n    white-space: pre-wrap; }\n  .f-richEditorText div {\n    margin: 10px 0;\n    padding: 0;\n    position: relative; }\n  .f-richEditorText sup,\n  .f-richEditorText blockquote {\n    border-left: 3px solid #d0e5f2;\n    font-style: normal;\n    padding: 0 0 0 10px;\n    vertical-align: baseline;\n    margin: 0;\n    font-size: 14px; }\n  .f-richEditorText img {\n    max-height: none;\n    max-width: 520px;\n    vertical-align: top;\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n    image-rendering: -webkit-optimize-contrast;\n    image-rendering: optimize-contrast;\n    image-rendering: crisp-edges;\n    image-rendering: -webkit-crisp-edges;\n    image-rendering: -moz-crisp-edges;\n    image-rendering: -o-crisp-edges;\n    -webkit-transform: translateZ(0);\n            transform: translateZ(0); }\n  .f-richEditorText code {\n    display: inline-block;\n    font-family: monospace;\n    white-space: pre-wrap;\n    margin: 0.5em 0;\n    padding: 0.4em 0.6em;\n    border-radius: 8px;\n    background: #efefef; }\n  .f-richEditorText ol li {\n    list-style-type: decimal; }\n  .f-richEditorText ul li {\n    list-style-type: disc; }\n  .f-richEditorText table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 1px solid #e4e4e4; }\n    .f-richEditorText table th,\n    .f-richEditorText table td {\n      border: 1px solid #e4e4e4;\n      padding: 5px; }\n\n.f-scale1 {\n  -webkit-transition: all 0.5s ease-in-out 0s;\n  transition: all 0.5s ease-in-out 0s; }\n  .f-scale1:hover {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); }\n\n.f-scale11 {\n  -webkit-transition: all 0.3s ease-in-out 0s;\n  transition: all 0.3s ease-in-out 0s; }\n  .f-scale11:hover {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1); }\n\n.f-scaleSubImg11 img {\n  -webkit-transition: all 0.3s cubic-bezier(0, 0.5, 0.5, 1) 0s;\n  transition: all 0.3s cubic-bezier(0, 0.5, 0.5, 1) 0s; }\n\n.f-scaleSubImg11:hover img {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1); }\n\n.f-transition {\n  -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s; }\n\n.f-3line span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical; }\n\n.f-4line span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 4;\n  -webkit-box-orient: vertical; }\n\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n/* 非衬线字体 */\n.f-f0 {\n  font-family: "Microsoft YaHei", \\5fae\\8f6f\\96c5\\9ed1, "Helvetica", "sans-serif"; }\n\n/* 衬线字体 */\n.f-f1 {\n  font-family: "Arial", "Hiragino Sans GB", "SimSun", \\5b8b\\4f53, "Georgia", "serif"; }\n\n/* 字体颜色 */\n.f-fc0 {\n  color: #000; }\n\n.f-fc3 {\n  color: #333; }\n\n.f-fc6 {\n  color: #666; }\n\n.f-fc9 {\n  color: #999; }\n\n.f-fcf {\n  color: #fff; }\n\n.f-fcc {\n  color: #ccc; }\n\n.f-fcred {\n  color: #FF0202; }\n\n.f-fcgreen {\n  color: #00CC7E; }\n\n.f-fcorange {\n  color: #FF7A3E; }\n\n/* a链接颜色，非绿色hover变绿，绿色的hover下下划线 */\na.f-fcgreen {\n  color: #00CC7E; }\n\na:hover {\n  color: #00CC7E;\n  text-decoration: none;\n  cursor: pointer; }\n\na.f-fcgreen:hover {\n  color: #00AD4D;\n  text-decoration: none; }\n\na.f-fc0:hover,\na:hover .f-fc0,\na.f-fc3:hover,\na:hover .f-fc3,\na.f-fc6:hover,\na:hover .f-fc6,\na.f-fc9:hover,\na:hover .f-fc9,\na.f-fcf:hover,\na:hover .f-fcf {\n  color: #00AD4D;\n  text-decoration: none; }\n\n/* 字体大小 */\n.f-fs0 {\n  font-size: 12px; }\n\n.f-fs13 {\n  font-size: 13px;\n  line-height: 20px; }\n\n.f-fs14 {\n  font-size: 14px;\n  line-height: 22px; }\n\n.f-fs15 {\n  font-size: 15px;\n  line-height: 25px; }\n\n.f-fs16 {\n  font-size: 16px;\n  line-height: 28px; }\n\n.f-fs18 {\n  font-size: 18px;\n  line-height: 30px; }\n\n/* 修饰 */\n.f-fwb {\n  font-weight: bold; }\n\n@-webkit-keyframes slidein {\n  from {\n    -webkit-transform: translateX(195px);\n            transform: translateX(195px); }\n  to {\n    -webkit-transform: translateX(-15px);\n            transform: translateX(-15px); } }\n\n@keyframes slidein {\n  from {\n    -webkit-transform: translateX(195px);\n            transform: translateX(195px); }\n  to {\n    -webkit-transform: translateX(-15px);\n            transform: translateX(-15px); } }\n\n@-webkit-keyframes slideout {\n  from {\n    -webkit-transform: translateX(-15px);\n            transform: translateX(-15px); }\n  to {\n    -webkit-transform: translateX(195px);\n            transform: translateX(195px); } }\n\n@keyframes slideout {\n  from {\n    -webkit-transform: translateX(-15px);\n            transform: translateX(-15px); }\n  to {\n    -webkit-transform: translateX(195px);\n            transform: translateX(195px); } }\n\n@-webkit-keyframes leftSlidein {\n  from {\n    -webkit-transform: translateX(-195px);\n            transform: translateX(-195px); }\n  to {\n    -webkit-transform: translateX(15px);\n            transform: translateX(15px); } }\n\n@keyframes leftSlidein {\n  from {\n    -webkit-transform: translateX(-195px);\n            transform: translateX(-195px); }\n  to {\n    -webkit-transform: translateX(15px);\n            transform: translateX(15px); } }\n\n@-webkit-keyframes leftSlideout {\n  from {\n    -webkit-transform: translateX(15px);\n            transform: translateX(15px); }\n  to {\n    -webkit-transform: translateX(-195px);\n            transform: translateX(-195px); } }\n\n@keyframes leftSlideout {\n  from {\n    -webkit-transform: translateX(15px);\n            transform: translateX(15px); }\n  to {\n    -webkit-transform: translateX(-195px);\n            transform: translateX(-195px); } }\n\n.test-richText {\n  position: absolute;\n  z-index: 11;\n  width: 192px;\n  border-radius: 8px;\n  background: rgba(128, 128, 128, 0.5);\n  backdrop-filter: blur(20.3742px);\n  padding: 15px;\n  font-family: PingFangSC, PingFangSC-Medium;\n  color: #ffffff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n  .test-richText.fullscreen {\n    width: 315px;\n    padding: 16px; }\n    .test-richText.fullscreen .test-richText-modal .title {\n      font-size: 18px;\n      line-height: 25px;\n      margin-bottom: 12px; }\n    .test-richText.fullscreen .test-richText-modal .desc {\n      font-size: 14px;\n      line-height: 20px;\n      -webkit-line-clamp: 4; }\n    .test-richText.fullscreen .test-richText-modal .btn {\n      font-size: 14px; }\n  .test-richText.info-modal {\n    top: 32px !important;\n    left: calc(50% - 440px) !important;\n    background-image: none !important;\n    width: 880px;\n    margin: 0 auto;\n    height: 90%;\n    min-height: 450px;\n    opacity: 1;\n    background: #ffffff;\n    border-radius: 8px;\n    overflow: auto;\n    padding: 20px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n  .test-richText.left {\n    left: 0;\n    -webkit-animation-name: leftSlidein;\n            animation-name: leftSlidein;\n    -webkit-animation-duration: 0.5s;\n            animation-duration: 0.5s;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards; }\n    .test-richText.left.slide-out {\n      -webkit-animation-name: leftSlideout;\n              animation-name: leftSlideout;\n      -webkit-animation-duration: 0.5s;\n              animation-duration: 0.5s;\n      -webkit-animation-fill-mode: forwards;\n              animation-fill-mode: forwards; }\n  .test-richText.right {\n    right: 0;\n    -webkit-animation-name: slidein;\n            animation-name: slidein;\n    -webkit-animation-duration: 0.5s;\n            animation-duration: 0.5s;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards; }\n    .test-richText.right.slide-out {\n      -webkit-animation-name: slideout;\n              animation-name: slideout;\n      -webkit-animation-duration: 0.5s;\n              animation-duration: 0.5s;\n      -webkit-animation-fill-mode: forwards;\n              animation-fill-mode: forwards; }\n  .test-richText .close {\n    width: 20px;\n    height: 20px;\n    position: absolute;\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA05JREFUWEfNmU9oE1EQxr8ELbSCrSANHoLRGINYIhpNbbRgFfHkoQex5iDoVXKpp1py8BJKISAKBenNQw1KbAUpSBEjGCrFCBUlYiWmvdiDIApaaGuUL2bDNu6f2TRp90FYSN7M++2bnW9mXxyofWwH4AGwE8A2AC3lKz3+BPCrfP0KoADgRy1LOSwaNQM4CGAPgB0Wbb8B+AzgPYAlqa0UcCuAAIBDALZInevMWwUwC+AtgBUzXxJA7tZJANy9eg7u4svyrur6NQLkb0cABOtJpeErC+ANgD9a6+gBMoynAOxtMJziPg8gDYDhXzO0APndmQ2EU0M+q95JLUCGtNFh1QsMw81PZVQDMiHOblBY9ZaZUieOGpBS0teAbLV6v8zupCJBasDNDG31TVRCrQBS4y5JRdjn8zXPzc2Jq4GyugU7ZvN9VhwF8BiAw5JYzM/P97vdbt/09PSL7u7uZLFYNDXr6upqHR8fv9be3u5OJpMPIpHIc1Ojf9r4WgG8IKmtfr+/JZfLJRwOh5MLZLPZTCgUumcESbjJycnrbW1tLtrk8/l3Xq/3jgCQtfshAdmVMDlEI5PJ9IXD4R5lshFkNVyxWPwdi8Vux+PxD6LFgCQB2QQcFxrA6XRiZmbmcjAYPGEEqQU3PDx8d2BggI2CdLwi4GkA+6QWnGcGWSc4LvWJgOcB7LICaAQZjUYfq585hrWGnVNwvhDwIoBWq4B6kMvLy0tNTU2l1mydcHTxnYBXpfqndRNa4a4THN2sEvAKAJa5mgefuXQ6fVPZOToqFAo5r9d7S6KTBguvrCvEdFydEOrFJDppsiulENeUJFpwfOYWFhY+ejyeAxKdFISslCSWZUYPjtk6ODg4K9FJAVxFZiwJtRGcIsJmOimE47SSUFsqdVIRrhNkqdRxiJoFTlxcXLzhcrl2S6REC3JiYuJRb2/vU8EuVpoFzj1afsU0tFN3M1IRroa00M2sabfEDevY2FhPZ2dnx+jo6NTQ0JCoKyFkKpU6FwgE9icSiScjIyM8AjEa/zWsnGzrlp+Atn9pIqStXzuVZ2IzQ2364k5I2x99ENLWh0dKqG19/KbWKNseYKohbX0ErAZlxekon+7b6hBdqyxtyN8QfwGd16w/0FfALwAAAABJRU5ErkJggg==) no-repeat;\n    background-size: contain;\n    cursor: pointer;\n    z-index: 1; }\n  .test-richText .test-richText-modal .close {\n    right: -8px;\n    top: -8px; }\n  .test-richText .test-richText-modal .title {\n    line-height: 22px;\n    font-size: 16px;\n    font-weight: 500;\n    margin-bottom: 4px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 2; }\n  .test-richText .test-richText-modal .desc {\n    font-size: 12px;\n    font-weight: 400;\n    line-height: 17px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 2;\n    color: rgba(255, 255, 255, 0.9); }\n  .test-richText .test-richText-modal .btn {\n    display: inline-block;\n    width: 66px;\n    margin-top: 10px;\n    height: 24px;\n    line-height: 24px;\n    text-align: center;\n    background: #00cc7e;\n    border-radius: 18px;\n    font-size: 12px;\n    color: #fff;\n    font-weight: 500; }\n\n.test-richText-info {\n  color: rgba(0, 0, 0, 0.65); }\n  .test-richText-info .close {\n    right: 10px;\n    top: 10px; }\n  .test-richText-info img {\n    max-width: 100%; }\n  .test-richText-info::-webkit-scrollbar {\n    width: 10px;\n    height: 1px; }\n  .test-richText-info::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n    background: #d5d5d5; }\n',
);
EDU(
  '6822705a15f3a92045e363766de57848',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'testRichText',
      template: t,
      css: n,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '36ed33f3975bcc23db0b3cc5eda647b1',
  '2981bf58d3649d6d19c33eac9604953c',
  '82caaf84ec4930d607a7da19cde80713',
);
EDU(
  '1dd142e7e2a6aba9b1774b6eb5e86fa7',
  '<div class="um-recommend-modal_cnt f-pr">\n{#if topic && topic.length}\n<div class="um-recommend-modal_cnt_img" on-click={this.goToContent()}>\n<img src={topic[0].imgUrl} />\n</div>\n{#else}\n{#if list && list.length}\n<um-recommend-list list={list} class={\'um-recommend-modal_cnt_list\'}\nisCardBig={true} logOpt={logOpt} outVendor={outVendor}></um-recommend-list>\n{/if}\n{/if}\n</div>',
);
EDU(
  'a549ee0b822aa576bd7b7723a557ff9d',
  function (e, t, n, i, o, a, s, r) {
    Component = e.$extends({
      name: 'um-recommend-modal',
      data: { list: [], recommendOpt: {}, topic: [], logOpt: null },
      config: function () {
        this.supr();
        t.extend(this.data, { list: [], recommendOpt: {}, topic: [] });
      },
      init: function () {
        this.supr();
        this.getRecommend();
      },
      getRecommend: function () {
        r._$getRecommend(this.data.recommendOpt, this._recommendLoad._$bind(this));
      },
      _recommendLoad: function (e) {
        n._$forEach(
          e,
          function (t, n) {
            if (t.type == a.RECOMMENDATION_TYPE.TOPIC) {
              this.data.topic.push(t);
              e.splice(n, 1);
            }
          }._$bind(this),
        );
        this.data.list = e;
        this.data.topic = o._$formatRecommendCard(this.data.topic);
        this.$update();
        if (this.data.topic.length || this.data.list.length) this._initModal();
      },
      _initModal: function () {
        var e = this.data;
        if (this._modalUI) {
          this._modalUI.destroy();
          this._modalUI = null;
        }
        var t = this.data.topic && !!this.data.topic.length;
        this._modalUI = new i({
          data: {
            class: t ? 'um-recommend-modal um-recommend-modal-topic' : 'um-recommend-modal',
            title: t ? '' : '推荐课程',
            contentTemplate: s,
            okButton: '',
            cancelButton: '',
            list: this.data.list,
            recommendOpt: this.data.recommendOpt,
            topic: this.data.topic,
            logOpt: this.data.logOpt,
            maskClickHide: !0,
          },
          goToContent: function () {
            this._addLog(this.data.topic[0]);
            window.open(this.data.topic[0].link);
          },
          _addLog: function (e) {
            var t = this.data.logOpt;
            if (t && t.eventId) {
              var i = {
                user_id: !!window.webUser && window.webUser.id,
                data_cate: t.data_cate,
                data_action: t.data_action,
                data_label: t.data_label,
              };
              i = n._$merge(i, JSON.parse(e.logData));
              DATracker.track(t.eventId, i);
            } else console.log('请传入正确的打点事件名称');
          },
        })
          .$on(
            'close',
            function () {
              this.$emit('close');
              this.destroy();
            }._$bind(this),
          )
          .$on(
            'cancel',
            function () {
              this.$emit('cancel');
              this.destroy();
            }._$bind(this),
          );
        if (this.$root != this) this._modalUI.$inject(this.$root);
      },
      destroy: function () {
        this.supr();
        if (this._modalUI) {
          this._modalUI.destroy();
          this._modalUI = null;
        }
      },
    });
    return Component;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  'd414623f7407e577cd6c05efff08e96f',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '93828627ddb358ed890cb65967a0c1de',
  '1dd142e7e2a6aba9b1774b6eb5e86fa7',
  '39253eba71912d1492d6af7035e30738',
  'ebe210c8c771158d609dfded929fb0ed',
);
EDU(
  'ed62f685fa709ca7ffa67901d2faf840',
  '.um-recommend-modal .ux-modal_dialog {\n  width: 490px;\n  max-height: 352px; }\n\n.um-recommend-modal_cnt {\n  width: 380px;\n  max-height: 240px; }\n  .um-recommend-modal_cnt .um-recommend-list_item:last-child {\n    margin-bottom: 0; }\n\n.um-recommend-modal_cnt_img {\n  font-size: 0; }\n  .um-recommend-modal_cnt_img img {\n    cursor: pointer;\n    max-width: 490px;\n    max-height: 354px; }\n\n.um-recommend-modal .ux-modal_bd_ct {\n  padding-bottom: 0; }\n\n.um-recommend-modal .ux-modal_title,\n.um-recommend-modal .ux-modal_content_title {\n  margin: 14px 18px -5px;\n  font-size: 18px; }\n\n.um-recommend-modal_cnt_list {\n  width: 380x; }\n\n.um-recommend-modal.um-recommend-modal-topic .ux-modal_dialog {\n  min-width: auto;\n  width: auto; }\n\n.um-recommend-modal.um-recommend-modal-topic .ux-modal_hd {\n  position: relative;\n  padding: 0; }\n\n.um-recommend-modal.um-recommend-modal-topic .ux-modal_bd_ct {\n  padding: 0; }\n\n.um-recommend-modal.um-recommend-modal-topic .ux-modal_ft,\n.um-recommend-modal.um-recommend-modal-topic .ux-modal_content_ft {\n  margin: 0; }\n\n.um-recommend-modal.um-recommend-modal-topic .ux-modal_close {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  z-index: 2;\n  color: #fff; }\n\n.um-recommend-modal.um-recommend-modal-topic .um-recommend-modal_cnt {\n  width: auto;\n  max-height: 352px; }\n',
);
EDU(
  'ecd59ff8d09a183ad64d245b3081fdb9',
  function (e, t, n) {
    n = e.$extends({
      name: 'um-recommend-modal',
      css: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return n;
  },
  'a549ee0b822aa576bd7b7723a557ff9d',
  'ed62f685fa709ca7ffa67901d2faf840',
);
EDU(
  '1085a79200eae1cc393e9fb1c5b9ac45',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.u'),
      d = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        6: 'G',
        7: 'H',
        8: 'I',
        9: 'J',
        10: 'K',
        11: 'L',
        12: 'M',
        13: 'N',
        14: 'O',
        15: 'P',
        16: 'Q',
        17: 'R',
      },
      l,
      _;
    var u = 'en' === window.currentLanguage;
    var f = a._$addHtmlTemplate(
      '<div class="m-choiceQuestion u-questionItem">       \t  <div class="j-title title f-cb">       \t  \t<div class="position f-fl"></div>       \t  \t<div class="qaDescription f-fl f-cb">       \t  \t    <div class="qaIndex j-qaindex f-fl f-dn"></div>       \t  \t\t<div class="qaCate j-qacate f-fl"></div>\t       \t  \t<div class="f-richEditorText j-richTxt"></div>\t       \t  \t<div class="qaMark j-qamark f-fr f-dn"></div>               <div class="j-aiQuery aiQuery f-dn"></div>       \t  \t</div>       \t  \t<label class="scoreLabel f-fr f-dn j-scoreLabel">' +
        window.moocConfig.lang.KEY_LEARN_SCORE_AND_TOTAL_SCORE +
        '</label>       \t  </div>          <div class="j-choicebox">       \t  </div>       </div>',
    );
    c._$$ChoiceQuestionUI = NEJ.C();
    l = c._$$ChoiceQuestionUI._$extend(c._$$BaseType, !0);
    _ = c._$$ChoiceQuestionUI._$supro;
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = a._$getByClassName(this.__body, 'j-title')[0];
      this.__choicebox = a._$getByClassName(this.__body, 'j-choicebox')[0];
      this.__scoreLabel = a._$getByClassName(this.__body, 'j-scoreLabel')[0];
      this.__cateLabel = a._$getByClassName(this.__body, 'j-qacate')[0];
      this.__indexLabel = a._$getByClassName(this.__body, 'j-qaindex')[0];
      this.__markLabel = a._$getByClassName(this.__body, 'j-qamark')[0];
      this.__richTextNode = a._$getByClassName(this.__body, 'j-richTxt')[0];
      this.__aiQueryBox = a._$getByClassName(this.__body, 'j-aiQuery')[0];
      this.__questionInfo = a._$getChildren(this.__titleNode);
    };
    l.__buildQuestionInfo = function () {
      var t = 'en' === window.currentLanguage;
      var i = window.moocConfig.lang.KEY_LEARN_SCORE_POINTS;
      if (!this.__optIds)
        this.__optIds = this.__recordDto.qAnswerDto ? this.__recordDto.qAnswerDto.optIds : [];
      else this.__recordDto.qAnswerDto = { optIds: this.__optIds };
      var o = '',
        l = this.__recordDto.questionDto,
        _ = this.__paperType;
      if ((!this.__position && 0 != this.__position) || this.__position < 0)
        c._$hiddenNode(this.__questionInfo[0]);
      else {
        c._$showNode(this.__questionInfo[0]);
        this.__questionInfo[0].innerText = this.__position + 1;
      }
      if (this.__indexNum > 0) {
        this.__indexLabel.innerHTML = this.__indexNum + '、';
        a._$delClassName(this.__indexLabel, 'f-dn');
      }
      this.__cateLabel.innerHTML = '';
      if (this.__noScore && !c._$isWap()) {
        this.__richTextNode.innerHTML = e._$formateImagePrefix(l.title || '');
        this.__cateLabel.innerHTML = '';
      } else {
        var u = l.title || '',
          f = '';
        var h = t && l.score >= 1 ? 's' : '';
        switch (l.type) {
          case c.CONST.TYPE_OBJECTIVE_SINGLE:
            f +=
              '<span class="dan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_SINGLE +
              '</span>';
            if (!c._$isWap()) f += '(' + l.score + i + h + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_MULTI:
            f +=
              '<span class="duo">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_MULTIPLE +
              '</span>';
            if (!c._$isWap()) f += '(' + l.score + i + h + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_JUDGE:
            f +=
              '<span class="pan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_JUDGE +
              '</span>';
            if (!c._$isWap()) f += '(' + l.score + i + h + ')';
        }
        this.__cateLabel.innerHTML = f;
        this.__richTextNode.innerHTML = u;
        if (c._$isWap() && 6 != _) {
          this.__markLabel.innerHTML = '(' + l.score + i + ')';
          a._$delClassName(this.__markLabel, 'f-dn');
        }
      }
      r._$renderRich(this.__richTextNode);
      this.__type = c._$parseOptionType(l.type);
      if (1 === this.__mode && !this.__noScore && !n.isPreview)
        if (!c._$isWap() && this.__showAnalysis)
          a._$setStyle(this.__scoreLabel, 'display', 'block');
        else a._$setStyle(this.__scoreLabel, 'display', 'none');
      else a._$setStyle(this.__scoreLabel, 'display', 'none');
      var p = [],
        m = [],
        b = null,
        g = !0,
        v = {};
      if (
        this.__recordDto.qAnswerDto &&
        this.__recordDto.qAnswerDto.optIds &&
        this.__recordDto.qAnswerDto.optIds.length > 0
      )
        v = r._$array2object(this.__recordDto.qAnswerDto.optIds || null, function (e) {
          return e;
        });
      else g = !1;
      r._$forEach(l.optionDtos, function (e, t) {
        if (v[e.id]) {
          if (!e.answer) g = !1;
          m.push(d[t]);
        }
        if (e.answer) p.push(d[t]);
        if (e.analyse) b = (b || '') + '  ' + d[t] + '、' + e.analyse;
      });
      if ('checkbox' == this.__type && m.length != p.length) g = !1;
      if (l.type == c.CONST.TYPE_OBJECTIVE_JUDGE) b = l.analyse || null;
      if (this.__showAnalysis && !b) b = '';
      o = a._$getHtmlTemplate(
        'jst-edu-testChoiceOption',
        r._$merge(
          {
            queDto: l,
            showAskBtn:
              (100 == window.learnMode &&
                window.termDto &&
                0 == window.termDto.supportAiLessonPlan) ||
              (window.termDto &&
                1 == window.termDto.supportAiLessonPlan &&
                1 == window.termDto.supportFastQuiz),
            shouldHiddenScore: 1 == window.shouldHiddenScore,
            answers: this.__recordDto.qAnswerDto,
            mode: this.__mode,
            CONST: c.CONST,
            optionType: this.__type,
            letters: d,
            noScore: this.__noScore,
            rightAns: p.join('、'),
            selectAns: m.join('、'),
            showAnalysis: this.__showAnalysis,
            anstrue: g,
            analyse: b,
            offsetCtn: function (e) {
              if (l.type == c.CONST.TYPE_OBJECTIVE_JUDGE && e) {
                e = e.replace('正确', '<span class="u-icon-correct"></span>');
                e = e.replace('错误', '<span class="u-icon-wrong"></span>');
              }
              return e;
            }._$bind(this),
            setScore: function (e) {
              if (e && !this.__noScore) e = e.toFixed(2);
              else e = '0.00';
              return e;
            }._$bind(this),
          },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
      this.__choicebox.innerHTML = o;
      if (0 === this.__mode) {
        this.__inputs = a._$getByClassName(this.__choicebox, 'u-tbi');
        r._$forEach(
          this.__inputs,
          function (e, t) {
            s._$addEvent(e, 'click', this.__onSelect._$bind(this, l.optionDtos[t]));
          }._$bind(this),
        );
      }
    };
    l.__onSelect = function (e, t) {
      if ('radio' == this.__type) {
        this.__optIds[0] = e.id;
        var n = s._$getElement(t),
          i = n.checked;
        if (c._$isWap()) {
          r._$forEach(a._$getByClassName(n.parentNode.parentNode, 'answer-item'), function (e, t) {
            a._$delClassName(e, 'checked');
          });
          if (i) a._$addClassName(n.parentNode, 'checked');
          else a._$delClassName(n.parentNode, 'checked');
        }
      } else {
        var n = s._$getElement(t),
          i = n.checked;
        if (c._$isWap())
          if (i) {
            a._$addClassName(a._$getByClassName(n.parentNode, 'optionPos-check')[0], 'checked');
            a._$addClassName(n.parentNode, 'checked');
          } else {
            a._$delClassName(a._$getByClassName(n.parentNode, 'optionPos-check')[0], 'checked');
            a._$delClassName(n.parentNode, 'checked');
          }
        for (var o = !1, d = 0, l = this.__optIds.length; d < l; d++)
          if (this.__optIds[d] == e.id)
            if (i) o = !0;
            else this.__optIds.splice(d, 1);
        if (!o && i) this.__optIds.push(e.id);
      }
      this.__answerDto.optIds = this.__optIds;
      if (!this.__done && !this.__answerDto.time) {
        this.__done = !0;
        this.__answerDto.time = c._$getCurServerTime();
      }
      if (!this.__answerDto.qid) this.__answerDto.qid = this.__recordDto.questionDto.id;
      this._$dispatchEvent('onSelect', this.__answerDto);
    };
    l.__reset = function (e) {
      this.__paperType = e.type;
      this.__supReset(e);
      this.__answerDto = this.__recordDto.qAnswerDto;
      this.__done = !1;
      if (!this.__answerDto)
        this.__answerDto = {
          qid: this.__recordDto.questionDto.id,
          type: this.__recordDto.questionDto.type,
          optIds: [],
        };
    };
    l.__destroy = function () {
      this.__supDestroy();
      this.__optIds = null;
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '3f9cd2835e49e1a4b1d9cfa0e92683b1',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '93828627ddb358ed890cb65967a0c1de',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '08d2f36062baca2c8eb8327afd74d88c',
);
EDU(
  'f31031c2cc1deb44691c723fd75b2bd3',
  function (e, t, n) {
    var i = window,
      o = NEJ.O,
      a = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('edu.u'),
      l,
      _;
    var u = s._$addHtmlTemplate(
      '<div class="m-FillBlank examMode u-questionItem f-pr">       \t  \t<div class="j-title title f-cb">\t       \t  \t<div class="position f-fl"></div>                <div class="qaDescription f-fl f-cb">                    <div class="qaIndex j-qaindex f-fl f-dn"></div>                    <div class="qaCate j-qacate f-fl"></div>    \t       \t  \t<div class="f-richEditorText j-richTxt"></div>    \t       \t  \t<div class="qaMark j-qamark f-fr f-dn"></div>                </div>       \t  \t\t<label class="scoreLabel f-fr f-dn j-scoreLabel">${lang.KEY_LEARN_SCORE}/${lang.KEY_LEARN_TOTAL_SCORE}</label>       \t  \t</div>\t       \t<div class="f-cb inputArea">\t       \t\t<div class="f-fl j-input input"></div>\t       \t\t<div class="score f-fr f-fn j-score"></div>       \t \t</div>       \t \t<div class="analysisInfo f-dn j-analysis">            </div>       </div>',
    );
    d._$$FillBlankUI = NEJ.C();
    l = d._$$FillBlankUI._$extend(d._$$BaseType, !0);
    _ = d._$$FillBlankUI._$supro;
    l.__initXGui = function () {
      this.__seed_html = s._$addNodeTemplate(
        s._$getHtmlTemplate(u, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = s._$getByClassName(this.__body, 'j-title')[0];
      this.__input = s._$getByClassName(this.__body, 'j-input')[0];
      this.__analysisNode = s._$getByClassName(this.__body, 'j-analysis')[0];
      this.__scoreNode = s._$getByClassName(this.__body, 'j-score')[0];
      this.__scoreLabel = s._$getByClassName(this.__body, 'j-scoreLabel')[0];
      this.__indexLabel = s._$getByClassName(this.__body, 'j-qaindex')[0];
      this.__markLabel = s._$getByClassName(this.__body, 'j-qamark')[0];
      this.__cateLabel = s._$getByClassName(this.__body, 'j-qacate')[0];
      this.__richTextNode = s._$getByClassName(this.__body, 'j-richTxt')[0];
      this.__questionInfo = s._$getChildren(this.__titleNode);
    };
    l.__buildQuestionInfo = function () {
      if ((!this.__position && 0 != this.__position) || this.__position < 0)
        d._$hiddenNode(this.__questionInfo[0]);
      else {
        d._$showNode(this.__questionInfo[0]);
        this.__questionInfo[0].innerText = this.__position + 1;
      }
      if (this.__indexNum > 0) {
        this.__indexLabel.innerHTML = this.__indexNum + '、';
        s._$delClassName(this.__indexLabel, 'f-dn');
      }
      var i = !this.__noScore
        ? '<span class="pan">' + window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_FILL + '</span>'
        : '';
      var o = this.__recordDto.questionDto.score >= 1 && n.isEn() ? 's' : '';
      if (!d._$isWebView() && !this.__noScore)
        i +=
          '(' +
          this.__recordDto.questionDto.score +
          window.moocConfig.lang.KEY_LEARN_SCORE_POINTS +
          o +
          ')';
      this.__cateLabel.innerHTML = i;
      this.__richTextNode.innerHTML = e._$formateImagePrefix(
        this.__recordDto.questionDto.title || '',
      );
      c._$renderRich(this.__richTextNode);
      if (d._$isMobile() || d._$isWap()) {
        if (6 != this.__paperType) {
          var o = this.__recordDto.questionDto.score >= 1 && n.isEn() ? 's' : '';
          this.__markLabel.innerHTML =
            '(' +
            this.__recordDto.questionDto.score +
            window.moocConfig.lang.KEY_LEARN_SCORE_POINTS +
            o +
            ')';
          s._$delClassName(this.__markLabel, 'f-dn');
        }
        var a = t._$parseUrlParams(window.location.search);
        if (a.quizeCount && this.__indexNum == a.quizeCount)
          this.__fillblankInputUI = d._$$BaseInputUI._$allocate({
            parent: this.__input,
            labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_ANSWER,
            onInputChange: this.__inputBlur._$bind(this),
            type: 'input',
            height: 35,
            width: 250,
          });
        else
          this.__fillblankInputUI = d._$$BaseInputUI._$allocate({
            parent: this.__input,
            labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_ANSWER,
            onInputBlur: this.__inputBlur._$bind(this),
            type: 'input',
            height: 35,
            width: 250,
          });
      } else
        this.__fillblankInputUI = d._$$BaseInputUI._$allocate({
          parent: this.__input,
          labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_ANSWER,
          onInputBlur: this.__inputBlur._$bind(this),
          height: 35,
          width: 250,
        });
      var r = this;
      var l = navigator.userAgent;
      var _ = l.indexOf('Android') > -1 || l.indexOf('Adr') > -1;
      if (_);
    };
    l.__inputBlur = function () {
      var e = this.__fillblankInputUI._$getContent();
      this.__answerDto.content.content = e;
      if (!this.__done && !this.__answerDto.time) {
        this.__done = !0;
        this.__answerDto.time = d._$getCurServerTime();
      }
      this._$dispatchEvent('onSelect', this.__answerDto);
    };
    l._$setAnswerRecord = function () {
      this.__fillblankInputUI._$enableInput();
      this.__fillblankInputUI._$setInitContent(
        (this.__answerDto.content && this.__answerDto.content.content) || '',
      );
      if (1 === this.__mode) {
        this.__fillblankInputUI._$disableNoInitInput();
        if (!this.__answerDto.content.content || '' == this.__answerDto.content.content) {
          this.__fillblankInputUI._$setTextLabel(window.moocConfig.lang.KEY_LEARN_YOU_ANSWER);
          var e = !1;
        } else var e = !0;
      }
      s._$addClassName(this.__analysisNode, 'f-dn');
      if (1 == this.__mode) {
        var t = this.__recordDto.questionDto.analyse
          ? '<br><b>' +
            window.moocConfig.lang.KEY_LEARN_RESOLUTION +
            ' </b>' +
            this.__recordDto.questionDto.analyse
          : null;
        if (this.__showAnalysis && !t) t = '';
        if (this.__noScore) {
          s._$delClassName(this.__analysisNode, 'f-dn');
          this.__analysisNode.innerHTML =
            '<span class="f-f0 tt1">' +
            window.moocConfig.lang.KEY_LEARN_CORRECT_ANSWER +
            '</span><span class="f-f0 tt2">' +
            c._$escape(
              this.__recordDto.questionDto.stdAnswer.replace(
                d.CONST.FILL_BLANK_SPLITCHARREG,
                ' ' + window.moocConfig.lang.KEY_LEARN_OR,
              ) || '',
            ) +
            '</span>';
          d._$toggleClassName(!this.__judgeAnswer(), this.__analysisNode, 'answrong');
        } else if (null != t) {
          s._$delClassName(this.__analysisNode, 'f-dn');
          this.__analysisNode.innerHTML =
            '<span class="f-f0 tt1">' +
            window.moocConfig.lang.KEY_LEARN_CORRECT_ANSWER +
            '</span><span class="f-f0 tt2">' +
            c._$escape(
              this.__recordDto.questionDto.stdAnswer.replace(
                d.CONST.FILL_BLANK_SPLITCHARREG,
                ' ' + window.moocConfig.lang.KEY_LEARN_OR + ' ',
              ) || '',
            ) +
            '</span>';
          if (
            (100 == window.learnMode &&
              window.termDto &&
              0 == window.termDto.supportAiLessonPlan) ||
            (window.termDto &&
              1 == window.termDto.supportAiLessonPlan &&
              1 == window.termDto.supportFastQuiz)
          )
            this.__analysisNode.innerHTML +=
              '<span class="j-global-ai-question-entry" data-id=' +
              this.__recordDto.questionDto.id +
              '>提问</span>';
          this.__analysisNode.innerHTML += t;
          d._$toggleClassName(0 != this.__answerDto.correct, this.__analysisNode, 'answrong');
        }
      }
      d._$toggleNodeDisplay(
        this.__scoreLabel,
        1 == this.__mode && !this.__noScore && !!this.__showAnalysis,
      );
      d._$toggleNodeDisplay(
        this.__scoreNode,
        1 == this.__mode && !this.__noScore && !!e && !!this.__showAnalysis,
      );
      if (1 == this.__mode && !this.__noScore)
        if (window.shouldHiddenScore)
          this.__scoreNode.innerHTML = '<span class="j-triggerLockScore"></span>';
        else {
          if (0 == this.__answerDto.correct) {
            s._$addClassName(this.__scoreNode, 'right');
            var n = '<span class="f-icon u-icon-correct"></span> ';
          } else {
            s._$delClassName(this.__scoreNode, 'right');
            var n = '<span class="f-icon u-icon-wrong"></span> ';
          }
          this.__scoreNode.innerHTML =
            n +
            (this.__answerDto.score ? this.__answerDto.score.toFixed(2) : '0.00') +
            '/' +
            this.__recordDto.questionDto.score.toFixed(2);
        }
    };
    l.__judgeAnswer = function (e) {
      switch (this.__recordDto.questionDto.fillblankType) {
        case 1:
        case 2:
          var e = (this.__recordDto.questionDto.stdAnswer || '').split(
            d.CONST.FILL_BLANK_SPLITCHAR,
          );
          var t = d._$arrContains(e, this.__answerDto.content.content);
          return t;
        case 3:
          var n = this.__recordDto.questionDto.stdAnswer.split(','),
            i = parseFloat(n[0].substr(1)),
            o = parseFloat(n[1].substr(0, n[1].length - 1)),
            a = !1,
            s = !1;
          0 == n[0].indexOf('(') ? (a = !1) : (a = !0);
          n[1].indexOf(')') > 0 ? (s = !1) : (s = !0);
          if (this.__answerDto.content.content > i && this.__answerDto.content.content < o)
            return !0;
          else if (this.__answerDto.content.content == i && a) return !0;
          else if (this.__answerDto.content.content == o && s) return !0;
          else return !1;
        case 4:
          return this.__answerDto.content.content &&
            this.__recordDto.questionDto.stdAnswer.indexOf(this.__answerDto.content.content) >= 0
            ? !0
            : !1;
      }
    };
    l.__goToAnalysisMode = function () {
      this.__fillblankInputUI._$disableNoInitInput();
    };
    l.__goToExamMode = function () {
      this.__fillblankInputUI._$enableInput();
    };
    l.__reset = function (e) {
      this.__paperType = e.type;
      this.__supReset(e);
      this.__answerDto = this.__recordDto.qAnswerDto;
      this.__done = !1;
      if (!this.__answerDto)
        this.__answerDto = {
          qid: this.__recordDto.questionDto.id,
          type: this.__recordDto.questionDto.type,
          content: { content: '' },
        };
      this._$setAnswerRecord();
    };
    l.__destroy = function () {
      this.__supDestroy();
      this.__fillblankInputUI = d._$$BaseInputUI._$recycle(this.__fillblankInputUI);
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fb061c769bfc74628a81f422f590544c',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '3f9cd2835e49e1a4b1d9cfa0e92683b1',
  '02c14b544f21e379de73ba82b326d2a9',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  'fe86216ed59e3103a56c42c850d389f0',
  '08d2f36062baca2c8eb8327afd74d88c',
);
EDU(
  '69e1c387d1f075b36fd909b21836f8b2',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('nej.ut'),
      r = NEJ.P('edu.u'),
      c;
    r._$$QuestionItem = NEJ.C();
    c = r._$$QuestionItem._$extend(s._$$Event, !0);
    c._$getItem = function () {
      return this.__itemUI;
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__recordDto = e.recordDto;
      if (this.__recordDto) {
        this.__mode = e.mode;
        var t = {
          parent: e.parent,
          recordDto: this.__recordDto,
          mode: this.__mode,
          showAnalysis: e.showAnalysis,
          position: e.position,
          noScore: e.noScore,
          indexNum: e.indexNum,
          type: e.type,
          onSelect: function (e) {
            this._$dispatchEvent('onSelect', e);
          }._$bind(this),
        };
        var n = document.querySelector('#j-anchorContainer');
        if (n) {
          n.classList.remove('f-pop');
          n.classList.remove('f-pop-width');
        }
        switch (this.__recordDto.questionDto.type) {
          case r.CONST.TYPE_OBJECTIVE_SINGLE:
          case r.CONST.TYPE_OBJECTIVE_MULTI:
          case r.CONST.TYPE_OBJECTIVE_JUDGE:
            this.__itemUI = r._$$ChoiceQuestionUI._$allocate(t);
            break;
          case r.CONST.TYPE_SUBJECTIVE_NORMAL:
            this.__itemUI = r._$$AnalysisQuestionUI._$allocate(t);
            break;
          case r.CONST.TYPE_OBJECTIVE_FILLBLANK:
            this.__itemUI = r._$$FillBlankUI._$allocate(t);
            break;
          case 5:
        }
      }
    };
    c._$getAnswerDto = function () {
      return this.__itemUI._$getAnswerDto();
    };
    c.__destroy = function () {
      if (this.__itemUI)
        switch (this.__recordDto.questionDto.type) {
          case r.CONST.TYPE_OBJECTIVE_SINGLE:
          case r.CONST.TYPE_OBJECTIVE_MULTI:
          case r.CONST.TYPE_OBJECTIVE_JUDGE:
            this.__itemUI = r._$$ChoiceQuestionUI._$recycle(this.__itemUI);
            break;
          case r.CONST.TYPE_SUBJECTIVE_NORMAL:
            this.__itemUI = r._$$AnalysisQuestionUI._$recycle(this.__itemUI);
            break;
          case r.CONST.TYPE_OBJECTIVE_FILLBLANK:
            this.__itemUI = r._$$FillBlankUI._$recycle(this.__itemUI);
            break;
          case 5:
            this.__itemUI.destroy();
        }
      this.__supDestroy();
    };
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '1085a79200eae1cc393e9fb1c5b9ac45',
  'f31031c2cc1deb44691c723fd75b2bd3',
  '0f188659b8c10dc2a8793ba1f7b9322d',
  '93828627ddb358ed890cb65967a0c1de',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
EDU(
  '726a7dcda1df09970835f707b7b82c44',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    var d = o._$pushCSSText(
      '        .#<uispace> {width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:101;}        .#<uispace>.f-pop{background-color:rgba(0,0,0,0);width: 192px;height: auto;bottom:193px;right: 0;left: initial;top: initial;}        .#<uispace>.f-pop.f-pop-left{left:0;}        .#<uispace> .insetCt{overflow:auto;background: #fff;padding: 20px 30px 80px;box-sizing: border-box;width: 77%;height: 77%;position: relative;margin: 0 auto;margin-top: 7%;border-radius: 8px;}        .#<uispace> .u-questionItem{border:none;padding-top:0;}        .#<uispace> .submit,.#<uispace> .cont{position:absolute;bottom:20%;left:14%;z-index:5}        ',
    );
    var l = o._$addHtmlTemplate(
      '<div class="f-af" id="j-anchorContainer">    \t\t<div class="insetCt j-insetCt"></div>    \t\t<a class="u-btn u-btn-default submit j-submit">${lang.KEY_LEARN_SUBMIT}</a>    \t\t<a class="u-btn u-btn-default cont j-continue">${lang.KEY_LEARN_CONTINUE_STUDY}</a>       </div>',
    );
    s._$$InsetVideoAnchorUI = NEJ.C();
    c = s._$$InsetVideoAnchorUI._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(l, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__insetCtNode = o._$getByClassName(this.__body, 'j-insetCt')[0];
      this.__submitBtn = o._$getByClassName(this.__body, 'j-submit')[0];
      this.__continueBtn = o._$getByClassName(this.__body, 'j-continue')[0];
      a._$addEvent(this.__submitBtn, 'click', this.__showAnsOrAnalysis._$bind(this, !1));
      a._$addEvent(
        this.__continueBtn,
        'click',
        function () {
          this._$dispatchEvent('onReturnLearn');
        }._$bind(this),
      );
    };
    c.__showAnsOrAnalysis = function (n) {
      var i = { parent: this.__insetCtNode, recordDto: null, mode: null, noScore: !0 };
      var o =
        this.__questionUI && this.__questionUI._$getAnswerDto()
          ? [this.__questionUI._$getAnswerDto()]
          : null;
      var a = s._$convertPaperQustionObj([this.__questionVo], o);
      i.recordDto = a['_' + this.__questionVo.id];
      if (n) {
        s._$showNode(this.__submitBtn);
        s._$hiddenNode(this.__continueBtn);
        i.mode = 0;
      } else {
        if (!s._$isUserLogin()) {
          s._$$LoginDialog._$showLogin({ from: 'learn' });
          return;
        } else if (0 == t.isEnroll) {
          this.__attendCourseModal = new e({ data: { discusFlag: !1 } });
          return;
        }
        s._$hiddenNode(this.__submitBtn);
        s._$showNode(this.__continueBtn);
        i.mode = 1;
      }
      this.__clearQuestionUI();
      i.onReturnRichInfo = function () {
        this._$dispatchEvent('onReturnRichInfo');
      }._$bind(this);
      i.onReturnLearn = function () {
        this._$dispatchEvent('onReturnLearn');
      }._$bind(this);
      this.__questionUI = s._$$QuestionItem._$allocate(i);
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__questionVo = e.questionVo;
      this.__showAnsOrAnalysis(!0);
    };
    c.__clearQuestionUI = function () {
      if (this.__questionUI) this.__questionUI = s._$$QuestionItem._$recycle(this.__questionUI);
    };
    c.__destroy = function () {
      this.__clearQuestionUI();
      this.__supDestroy();
    };
  },
  '1c23b43dfd9c054559909485b4169fa4',
  '69e1c387d1f075b36fd909b21836f8b2',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '342ad7ae4eea50c3cad860686650a915',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '9f1797f8fce69be4524346a82910b5e7',
  function () {
    var e = window,
      t = NEJ.P('edu.u'),
      n = NEJ.P('nej.u');
    t._$convertSrts = function (i) {
      var o = { html5: [], flash: [] },
        a = '';
      if (!i) return o;
      i.sort(function (e, t) {
        return e.lang < t.lang ? -1 : 1;
      });
      n._$forEach(
        i,
        function (i) {
          if (i && i.nosUrl) {
            a = i.lang == t.CONST.SRT_TYPE_CH ? '中文' : '外文';
            o.html5.push({
              url: e.urlPrefix.getTextPrefix + '?downloadUrl=' + n._$str2hex(i.nosUrl),
              name: a,
            });
            o.flash.push({ url: i.nosUrl, name: a });
          }
        }._$bind(this),
      );
      return o;
    };
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '93828627ddb358ed890cb65967a0c1de',
  'fe86216ed59e3103a56c42c850d389f0',
  'af8805404cc0bd2b95d3d3c9573484b1',
);
EDU(
  '23df9936459ce00fd8c2c782b7cf7c8d',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f, h) {
    function p() {
      var e = parent.document;
      var t =
        e.cancelFullScreen || e.webkitCancelFullScreen || e.mozCancelFullScreen || e.exitFullScreen;
      if (t) t.call(e);
      else if ('undefined' != typeof window.ActiveXObject) {
        var n = new ActiveXObject('WScript.Shell');
        if (null != n) n.SendKeys('{F11}');
      } else alert('切换失败,可尝试Esc退出');
    }
    function m(e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    }
    var b = window,
      g = NEJ.P('nej.e'),
      v = NEJ.P('nej.v'),
      E = NEJ.P('nej.u'),
      w = NEJ.P('edu.d'),
      y = NEJ.P('edu.u'),
      x = NEJ.P('nej.j'),
      T = b.isSpoc,
      S;
    var C = h._$parseUrlParams(window.location.search);
    var I = !!C.appId;
    var O = courseDto && courseDto.schoolPanel && 6 == courseDto.schoolPanel.schoolType;
    y._$$VideoUnit = NEJ.C();
    S = y._$$VideoUnit._$extend(y._$$UIBase, !0);
    S.__initXGui = function () {
      var e = this;
      this.__seed_html = g._$addNodeTemplate(this.__initHtmlTemplate());
    };
    S.__initHtmlTemplate = function () {
      var e = this;
      return g._$getHtmlTemplate(
        'jst-lessonVideoUI',
        E._$merge(
          { urlPrefix: b.urlPrefix, url: E._$str2b64(window.location.href) },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    S.__initNode = function () {
      this.__supInitNode();
      this.__AILectureNoteSidebarNode = g._$getByClassName(
        this.__body,
        'j-AIlectureNoteSidebar',
      )[0];
      this.__AILectureNoteViewerNode = g._$getByClassName(this.__body, 'j-AIlectureNoteViewer')[0];
      this.__unitctBoxNode = g._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__unitlgBarNode = g._$getByClassName(this.__body, 'j-loginBar')[0];
      this.__unitUI = g._$getByClassName(this.__body, 'm-learnunitUI')[0];
      this.__unitLoginNode = g._$getByClassName(this.__body, 'j-login')[0];
      this.__unitctBarNode = g._$getByClassName(this.__body, 'j-unitctBar')[0];
      this.__unitReportBug = g._$getByClassName(this.__body, 'j-report-bug')[0];
      this.__downSrtNode = g._$getByClassName(this.__body, 'j-downsrt')[0];
      this.__switchPlayer = g._$getByClassName(this.__body, 'j-switchPlayer')[0];
      this.__autoNext = g._$getByClassName(this.__body, 'j-autoNext')[0];
      this.__shareNode = g._$getByClassName(this.__body, 'j-share')[0];
      this.__AILectureNoteNode = g._$getByClassName(this.__body, 'j-AILectureNote')[0];
      v._$addEvent(
        this.__unitLoginNode,
        'click',
        function () {
          y._$$LoginDialog._$showLogin({ from: 'videoUnit' });
        }._$bind(this),
      );
      v._$addEvent(
        this.__shareNode,
        'click',
        function () {
          var e = {
            url: b.location.href,
            uid: b.webUser ? b.webUser.id : -1,
            stat_id: this.__unitVo.id,
            stat_type: 16,
          };
          e['action'] = 'MOC_ACTIVITY_SHARE';
          this.__commonCache._$addGaLog({
            dt: this.__strToHexCharCode(JSON.stringify(e)).substr(2),
            p: 'mooc',
          });
        }._$bind(this),
      );
      v._$addEvent(
        this.__downSrtNode,
        'click',
        function () {
          y._$trackEvent(
            'captionDownload',
            'click',
            '字幕下载, 地址：' + this.__resourceVo.parsedSrtUrl,
          );
        }._$bind(this),
      );
      this.__contentCache = new w._$$COM_Cache_CourseCtCache();
      this.__commonCache = new w._$$COM_Cache_commonCache();
      this.__contentCache._$addEvent(
        'onFetchQuestions',
        this.__genPlayerWithMergeAISegments._$bind(this),
      );
      this.__contentCache._$addEvent('onGetNextVideo', this.__genNextVideo._$bind(this));
      this.__contentCache._$addEvent(
        'onGetZhixuanAdsShowStatus',
        this.getZhixuanAdsShowStatus._$bind(this),
      );
      this.hideByLanguage();
    };
    S.__AILectureExpand = function (e, t, n) {
      var i = sessionStorage.getItem('AINote_lessonUnitId');
      var o = sessionStorage.getItem('AINote_contentId');
      var a = sessionStorage.getItem('AINote_keyKnowledgeId');
      if (e != i || t != o || n != a) {
        sessionStorage.setItem('AINote_lessonUnitId', e);
        sessionStorage.setItem('AINote_contentId', t);
        sessionStorage.setItem('AINote_keyKnowledgeId', n);
        String.prototype.replace = window.moocTempReplace
          ? window.moocTempReplace
          : String.prototype.replace;
        String.prototype.match = window.moocTempMatch
          ? window.moocTempMatch
          : String.prototype.match;
        window.reactComponentLoadBootstrap.setFtlData({
          keyKnowledgeId: n,
          lessonUnitId: e,
          contentId: t,
          contentType: 1,
          videoWrapperDom: this.__body,
          getPreviewAIStatusCb: function (e) {
            this._$dispatchEvent('getPreviewAIStatusCb', NEJ.X({}, e || {}));
          }._$bind(this),
        });
        if (window.renderReactComponent && window.renderReactComponent['LearnAILectureExpand']) {
          window.renderReactComponent.ReactDOM.unmountComponentAtNode(
            document.getElementById('AILectureNote'),
          );
          var s = window.renderReactComponent['LearnAILectureExpand'];
          window.renderReactComponent.render(
            s.component,
            s.initialState,
            document.getElementById('AILectureNote'),
          );
        } else
          window.reactComponentLoadBootstrap.init({
            name: 'LearnAILectureExpand',
            container: document.getElementById('AILectureNote'),
          });
      }
    };
    S.__AILectureNoteViewer = function (e, t) {
      window.reactComponentLoadBootstrap.setFtlData({
        lessonUnitId: e,
        contentId: t,
        contentType: 1,
      });
      if (window.renderReactComponent && window.renderReactComponent['LearnAINoteViewer']) {
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(
          document.getElementById('AILectureNoteViewer'),
        );
        var n = window.renderReactComponent['LearnAINoteViewer'];
        window.renderReactComponent.render(
          n.component,
          n.initialState,
          document.getElementById('AILectureNoteViewer'),
        );
      } else
        window.reactComponentLoadBootstrap.init({
          name: 'LearnAINoteViewer',
          container: document.getElementById('AILectureNoteViewer'),
        });
    };
    S.hideByLanguage = function () {
      if (f.isEn()) {
        this.__unitReportBug.style.display = 'none';
        this.__shareNode.style.display = 'none';
      }
    };
    S.__strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    };
    S.__genShareUI = function () {
      if (this.__shareUI) this.__shareUI.destroy();
      var e = b.courseDto,
        t = [
          'MOOC是全新完整的教学模式--定期开课、简短视频，提交作业，学完还能考取认证证书，更可以结交到新朋友！',
          window.moocConfig.lang.KEY_LEARN_RECOMMEND_EVERYONE,
          '我在#中国大学MOOC#平台上学习，',
        ];
      var n = T
          ? t[2]
          : '我在学习' +
            this.__unitVo.name +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        i = T
          ? t[2]
          : '我在学习' +
            this.__unitVo.name +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        o = T ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，';
      var a = '';
      if (b.activityNotEnd && b.webUser)
        a =
          '//www.icourse163.org' +
          b.location.pathname +
          '/wapLearnVideoDetail/?id=' +
          this.__unitVo.lessonId +
          '&cid=' +
          this.__unitVo.id +
          '&inviterId=' +
          b.webUser.id +
          '&activityId=' +
          b.activityId +
          '&isWebShare=1';
      else
        a =
          '//www.icourse163.org' +
          b.location.pathname +
          '/wapLearnVideoDetail/?id=' +
          this.__unitVo.lessonId +
          '&cid=' +
          this.__unitVo.id;
      if (!b.hideTermShare)
        this.__shareUI = new c({
          data: {
            title: n,
            topic: i + t[1],
            description: o + t[0],
            pic: b.termDto.bigPhoto,
            url: window.location.protocol + (T ? '//www.icourse163.org' : a),
            weixinQR: '',
            model: 0,
          },
        }).$inject(this.__shareNode);
    };
    S.__genNextVideo = function (e) {
      if (e) {
        g._$addClassName(this.__unitctBoxNode, 'hide-replay-icon');
        this.__unitctBoxNode.appendChild(
          g._$html2node(
            g._$getHtmlTemplate(
              'jst-lessonVideoPlayEnd',
              E._$merge({ type: 2 }, { lang: (window.moocConfig || {}).lang || {} }),
            ),
          ),
        );
        this.__counter = g._$getByClassName(this.__body, 'j-counter')[0];
        var t = 5;
        var n;
        var i = this.__videoId;
        var o = function () {
          this.__counter.innerText = t;
          t--;
          n = setTimeout(o, 1e3);
          if (t <= 0) {
            clearTimeout(n);
            if (this.__video && this.__videoId == i) {
              this.__video.__player.destroy();
              this.__video.__destroy();
              this.__video = null;
            }
          }
        }._$bind(this);
        o();
        this.__replay = g._$getByClassName(this.__body, 'j-replay');
        g._$style(this.__replay[0], { display: 'none' });
        this.__replay = g._$getByClassName(this.__body, 'j-replay');
        v._$addEvent(
          this.__replay[1],
          'click',
          function () {
            clearTimeout(n);
            this._$dispatchEvent('replay', null);
          }._$bind(this),
        );
        setTimeout(
          function () {
            if (t <= 0 && this.__videoId == i) this._$dispatchEvent('autoNext', e);
          }._$bind(this),
          5e3,
        );
      } else {
        g._$addClassName(this.__unitctBoxNode, 'hide-replay-icon');
        this.__unitctBoxNode.appendChild(
          g._$html2node(
            g._$getHtmlTemplate(
              'jst-lessonVideoPlayEnd',
              E._$merge({ type: 1 }, { lang: (window.moocConfig || {}).lang || {} }),
            ),
          ),
        );
        this.__replay = g._$getByClassName(this.__body, 'j-replay');
        g._$style(this.__replay[0], { display: 'none' });
        v._$addEvent(
          this.__replay[1],
          'click',
          function () {
            this._$dispatchEvent('replay', null);
          }._$bind(this),
        );
      }
    };
    S.__injectYadkAdvertising = function () {
      var e = !1,
        t = l.moocIndex.webVideoLearning.config,
        n = document.createElement('div'),
        i = l.getScriptTagByScriptConfig(t, e);
      n.setAttribute('class', 'close-yadk-btn');
      window.webVideoLearningCallback = function () {
        var e = this.__yadkAdWrapper.children && this.__yadkAdWrapper.children[0];
        var t = e && (e.contentDocument || (e.contentWindow && e.contentWindow.document));
        if (e && 'IFRAME' === e.tagName && t) {
          e.style.width = '200px';
          e.style.minHeight = '113px';
          e.style.borderRadius = '8px';
          var i = document.createElement('style');
          i.type = 'text/css';
          i.innerHTML = '#ad_logo { font-size: 12px; background-color: rgba(0, 0, 0, .3); }';
          t.body.appendChild(i);
          this.__yadkAdWrapper.appendChild(n);
        }
        this.__yadkAdWrapper.style.display = 'block';
      }._$bind(this);
      if (this.__yadkAdWrapper.innerHTML) this.__yadkAdWrapper.innerHTML = '';
      this.__yadkAdWrapper.appendChild(i);
      n.addEventListener(
        'click',
        function () {
          this.__contentCache._$setIgnoreZhixuanAds();
          this.__yadkAdWrapper.style.display = 'none';
        }._$bind(this),
      );
    };
    S.getZhixuanAdsShowStatus = function (e) {
      if (e) this.__injectYadkAdvertising();
    };
    S.__genPlayerWithAnchors = function (i, a) {
      var s = this;
      this.__anchorQuesMap = {};
      if (i) {
        this.__questionsData = i;
        this.__anchorQuesMap = y._$convertListToMaps(i.questions);
      }
      this.__unitVo.aiLectureNoteSegmentList = a;
      this.__unitctBoxNode.style.height = '540px';
      g._$setStyle(this.__unitctBoxNode, 'overflow-y', 'visible');
      this.__unitctBoxNode.style.minHeight = this.__showAILectureNote ? '235px' : '570px';
      this.__unitctBoxNode.style.minWidth = this.__showAILectureNote ? '300px' : '500px';
      this.__cluPointData = y._$convertUnitAnchors(
        this.__unitVo.anchorQuestions,
        this.__anchorQuesMap,
      );
      var c =
        this.__resourceVo.videoId ||
        (this.__resourceVo.videoVo ? this.__resourceVo.videoVo.videoId : null);
      var d = [];
      if (window.isCertifiedPreview)
        if (this.__aiSegmentStatus == y.CONST.AI_STATUS.GENERATE_COMPLETE)
          d = this.__unitVo.aiLectureNoteSegmentList || [];
        else d = this.__unitVo.videoSegmentInfoDtos || [];
      else if (
        this.__unitVo.aiLectureNoteSegmentList &&
        this.__unitVo.aiLectureNoteSegmentList.length
      )
        d = this.__unitVo.aiLectureNoteSegmentList || [];
      else d = this.__unitVo.videoSegmentInfoDtos || [];
      var l = h._$parseUrlParams(window.location.hash);
      var _ = l.startTime;
      var u = r._$merge(
        NEJ.X(this.__resourceVo.videoVo, {
          autoStart: !0,
          file: this.__resourceVo.videoUrl,
          start: _ || this.__resourceVo.videoLearnTime,
          image: this.__resourceVo.videoImgUrl,
          unitId: this.__resourceVo.unitId,
          videoId: this.__videoId,
          cluPointData: this.__cluPointData,
          segmentListData: d,
          targetId: this.__unitVo.termId,
          targetType: 0,
        }),
        function (e) {
          return !e;
        },
      );
      if (this.__video) this.__video.__destroy();
      if (this.__isLiveVideo || O) g._$addClassName(this.__unitctBarNode, 'f-dn');
      var m = this.__isLiveVideo ? n.CONTENT_TYPE.LIVE : n.CONTENT_TYPE.VIDEO;
      var v;
      if (1 == b.isPreview) {
        v = n.VIDEO_TYPE.WITH_AUTH;
        if (this.__isLiveVideo) v = n.VIDEO_TYPE.WITH_AUTO_UNIT;
      } else v = n.VIDEO_TYPE.COMMON;
      this.__unitctBoxNode.innerHTML = '';
      this.__yadkAdWrapper = document.createElement('div');
      this.__yadkAdWrapper.setAttribute('id', 'j-vidio-learning-yadk');
      this.__unitctBoxNode.appendChild(this.__yadkAdWrapper);
      this.__videoNotNeedFullscreen = !0;
      var E = {
        bizId: this.__unitVo.id,
        bizType: n.BIZ_TYPE.UNIT,
        contentType: m,
        videoInfo: u,
        termId: this.__unitVo.termId,
        videoId: this.__unitVo.contentId,
        unitId: this.__unitVo.id,
        videoType: v,
        notNeedFullscreen: this.__videoNotNeedFullscreen,
        forbidViewSegment: !1,
        useFullscreenSegmentComponent: !0,
        useFullscreenAIAssistant: location.hash.includes('/learn/content'),
        AIAssistantParam: {
          pageType: this.__unitVo.contentType,
          termId: this.__unitVo.termId,
          courseId: window.courseDto && window.courseDto.id,
          courseName: window.courseDto && window.courseDto.name,
          sceneType: e.SCENE_TYPE.NORMAL,
          chapterId: this.__unitVo.chapterId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
        },
        forbidAiSubtitle: !this.__showAILectureNote,
      };
      this.__video = new t({ data: E })
        .$inject(this.__unitctBoxNode)
        .$on('onGetResourceToken', this.__onGetResourceToken._$bind(this))
        .$on('onGetResourceTokenError', this.__onGetResourceTokenError._$bind(this))
        .$on(
          'onMeta',
          function () {
            var e = this.__unitctBoxNode.querySelector('video');
            if (!b.isPreview)
              if (this.__autoNext.checked) {
                if (this.__unitctBoxNode.classList.contains('mask-disabled')) return;
                var t = setInterval(function () {
                  if (e.paused)
                    e.play()['catch'](function () {
                      clearInterval(t);
                    });
                  else clearInterval(t);
                }, 100);
              } else e.pause();
          }._$bind(this),
        );
      setTimeout(function () {
        s.__AILectureExpand(s.__unitVo.id, s.__unitVo.contentId);
      }, 1e3);
      if (this.__showAILectureNote) {
        this.__initVideoSegmentAILectureNote();
        this.__AILectureNoteViewer(this.__unitVo.id, this.__unitVo.contentId);
      }
      DATracker.track('视频播放页-分段展示-iaw', {
        user_id: !!window.webUser && window.webUser.id,
        pagename: 'videolearn',
        term_id: s.__unitVo.termId,
        video_id: c,
        slice_name: d.map(function (e) {
          return e.title;
        }),
      });
      if (this.__cluPointData && this.__cluPointData.length)
        this.__cluPointData.forEach(function (e) {
          if (5 == e.type) s.__hasTypeFiveAnchor = !0;
        });
      if (
        !localStorage.getItem('MOOC_SEGMENGT_VIEW_CLOSE') &&
        (d.length || this.__hasTypeFiveAnchor)
      ) {
        localStorage.setItem('MOOC_SEGMENGT_VIEW_CLOSE', 1);
        this.segmentMaskGuide = new o({
          data: { hasSegment: d.length, hasAnchor: this.__hasTypeFiveAnchor },
        }).$inject(s.__unitctBoxNode);
      }
      if (!b.isPreview) {
        this.__recordCount = 1;
        this.__recordDuration = localStorage.getItem('learnTimeUploadPeriod') || 180;
        this.__learnedVideoTimeCount = this.__recordDuration;
        this.__video.$on('onPlayEnd', this.__videoPlayEndHandle._$bind(this));
        this.__video.$on(
          'onPlay',
          function () {
            if (!this.__recordTimer) {
              this.__timeFlag = +new Date();
              this.__recordTimer = b.setInterval(
                this.__recordVideoTime._$bind(this, !1),
                1e3 * this.__recordDuration,
              );
            }
            this.__yadkAdWrapper.style.display = 'none';
          }._$bind(this),
        );
        this.__video.$on(
          'onPauseClick',
          function () {
            var e = parseInt((+new Date() - this.__timeFlag) / 1e3);
            this.__recordTimer = b.clearInterval(this.__recordTimer);
            this.__recordVideoTime(!1, !1, e);
            if (!f.isEn() && !b.isSpoc && !I)
              this.__contentCache._$getZhixuanAdsShowStatus(this.__unitVo.termId);
          }._$bind(this),
        );
      }
      if (this.__videoNotNeedFullscreen) {
        this._isFullscreen = !1;
        var w = this.__unitctBoxNode;
        this.__video.$on(
          'onFullscreenChange',
          function (e) {
            if (e !== this._isFullscreen) {
              this._isFullscreen = e;
              this._$dispatchEvent('onFullscreenChange', e);
              if (e) {
                var t = [
                  'requestFullscreen',
                  'mozRequestFullScreen',
                  'msRequestFullscreen',
                  'webkitRequestFullscreen',
                ];
                for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  if (w[i]) {
                    w[i]();
                    break;
                  }
                }
              } else p();
            }
          }._$bind(this),
        );
      }
      this.__trackGAData('view');
      this.__video.$on(
        'onSeek',
        function (e) {
          this.__trackGAData('drag', 1e3 * parseInt(e || 0));
          var t = e.newData;
          if (this.__cluPointData && this.__cluPointData.length) {
            this.__cluPointData.sort(function (e, t) {
              return e.anchor - t.anchor;
            });
            for (var n = 0; n < this.__cluPointData.length; n++) {
              var i = this.__cluPointData[n];
              if (5 === i.type && t >= i.anchor)
                if (t <= i.anchor + i.duration) {
                  var o = this.__anchorQuesMap[i.questionId];
                  if (this.testItemRichText) this.testItemRichText.destroy();
                  this.__initTypeFiveAnchor(o);
                  break;
                }
            }
          }
        }._$bind(this),
      );
      this.__video.$on('onAnchorPoint', this.__videoAnchorHandle._$bind(this));
      this.__video.$on('onLectureNoteChange', this.__videoSegmentAILectureNoteHandle._$bind(this));
    };
    S.__genPlayerWithMergeAISegments = function (e) {
      var t = this;
      if (this.__showAILectureNote) {
        DATracker.track('认证MOOC课程学期模式视频课时页-展示-iaw', {
          pagename: 'video',
          user_id: !!window.webUser && window.webUser.id,
          course_id: !!window.courseDto && window.courseDto.id,
          term_id: !!window.termDto && window.termDto.id,
        });
        var n = function (n) {
          var i = n;
          for (var o = 0; o < i.length; o++) i[o].type = 'AILectureNote';
          if (window.isCertifiedPreview) t.__unitUI.classList.add('learn-show-note');
          else if (n && n.length) t.__unitUI.classList.add('learn-show-note');
          else {
            t.__showAILectureNote = !1;
            t.__unitUI.classList.remove('learn-show-note');
            t.__showOrHideAINode(!1);
          }
          t.__genPlayerWithAnchors(e, i);
        }._$bind(this);
        var i = function () {
          if (!window.isCertifiedPreview) {
            t.__showAILectureNote = !1;
            t.__unitUI.classList.remove('learn-show-note');
            t.__showOrHideAINode(!1);
          }
          t.__genPlayerWithAnchors(e, []);
        }._$bind(this);
        if (window.isCertifiedPreview)
          this.__contentCache.getMocPreviewVideoSegmentInfoDto(
            {
              lessonUnitId: this.__unitVo.id,
              contentId: this.__unitVo.contentId,
              contentType: this.__unitVo.contentType,
            },
            function (e) {
              this.__aiSegmentStatus = e.aiStatus;
              this._$dispatchEvent('getPreviewAIStatusCb', {
                aiSegmentStatus: this.__aiSegmentStatus,
              });
              e = e.mocVideoSegmentInfoExtDtoList || [];
              n(e);
            }._$bind(this),
            i,
          );
        else
          this.__contentCache.getLessonUnitAILectureNoteSegmentList(
            {
              lessonUnitId: this.__unitVo.id,
              contentId: this.__unitVo.contentId,
              contentType: this.__unitVo.contentType,
            },
            n,
            i,
          );
      } else {
        t.__unitUI.classList.remove('learn-show-note');
        this.__genPlayerWithAnchors(e, []);
      }
    };
    S.__onGetResourceTokenError = function (e) {
      this._$dispatchEvent('onGetResourceTokenError', e);
    };
    S.__onGetResourceToken = function (e) {
      if (null == e.learnVideoTime) this.__recordVideoTime(!1, !0);
    };
    S.__trackGAData = function (e, t) {
      if (!b.isPreview) {
        var n = {
          userId: y._$getWebUser().id,
          courseId: b.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          videoId: this.__unitVo.contentId,
          resolutionType: this.__video._$getResolutionType(),
        };
        if (void 0 != t) n.value = t;
        y._$trackEvent('videoUnit', e, y._$convertToJSONHex(n));
        y._$log2Study('videoUnit', e, n);
      }
    };
    S._initRecommendUI = function () {
      if (this._recommendModal) {
        this._recommendModal.destroy();
        this._recommendModal = null;
      }
      if (!u._$isLogin() || !this._getRecommendInStorage()) {
        this._recommendModal = new d({
          $root: this.__unitctBoxNode,
          data: {
            recommendOpt: {
              targetId: this.__unitVo.termId,
              targetTypes: [
                _.RECOMMEND_POSITION.VIDEO_PLAY_COURSE_WEB,
                _.RECOMMEND_POSITION.VIDEO_PLAY_CATEGORY_WEB,
              ],
              number: 2,
            },
            logOpt: {
              eventId: '视频播放页内容推荐点击',
              data_cate: '视频播放页内容推荐点击',
              data_action: 'web_course_learn_video_recommend_click',
              data_label: window.moocConfig.lang.KEY_LEARN_VIDEO_PAGE,
            },
            outVendor: 'zw_mooc_pckcxxywntj',
          },
        })
          .$on(
            'close',
            function () {
              if (this._recommendModal) {
                this._recommendModal.destroy();
                this._recommendModal = null;
              }
              this._saveRecommendInStorage();
            }._$bind(this),
          )
          .$on(
            'cancel',
            function () {
              if (this._recommendModal) {
                this._recommendModal.destroy();
                this._recommendModal = null;
              }
              this.__video._$resumeVideo();
            }._$bind(this),
          );
        DATracker.track('视频播放页内容推荐展现', {
          user_id: !!window.webUser && window.webUser.id,
          data_cate: '视频播放页内容推荐展现',
          data_action: 'web_course_learn_video_recommend_page_view',
          data_label: window.moocConfig.lang.KEY_LEARN_VIDEO_PAGE,
          data_pagename: b.location.href,
        });
      }
    };
    S._saveRecommendInStorage = function () {
      if (u._$isLogin())
        try {
          b.localStorage.setItem(this._getRecommendKey(), !0);
        } catch (e) {
          console.log('浏览器不支持localStorage');
        }
    };
    S._getRecommendInStorage = function () {
      if (u._$isLogin())
        try {
          return 'true' == b.localStorage.getItem(this._getRecommendKey()) ? !0 : !1;
        } catch (e) {
          return !1;
        }
    };
    S._getRecommendKey = function () {
      var e = b.webUser && b.webUser.id;
      return 'HIDE_RECOMMEND_COURSE_' + b.courseDto.id + '_USER_' + e;
    };
    S.__getCookiePlayerChoose = function () {
      if (void 0 !== this.__useHtm5Player) return this.__useHtm5Player;
      else {
        var e = x._$cookie('playerChoose');
        if ('' == e || '1' == e) e = !0;
        else e = !1;
        return e;
      }
    };
    S.__switchPlayerHandler = function () {
      if (this.__video) {
        this.__video._$getCurVideoTime(
          function (e) {
            this.__resourceVo.videoLearnTime = e;
          }._$bind(this),
        );
        this.__video.__destroy();
        this.__video = null;
      }
      this.__useHtm5Player = !this.__useHtm5Player;
      x._$cookie('playerChoose', {
        path: '/learn/',
        domain: '.' + b.moocHost,
        value: this.__useHtm5Player ? '1' : '0',
        expires: 365,
      });
      this._$dispatchEvent('onSwitchPlayer');
    };
    S.__handlerH5Switch = function (e) {
      this.__switchPlayer.style.display = 'block';
      this.__supportHtml5 = !0;
      if (this.__useHtm5Player && 'flash' == e) {
        this.__supportHtml5 = !1;
        this.__switchPlayer.style.display = 'none';
      } else if ('h5' == e) this.__isHtml5Player = !0;
      else this.__isHtml5Player = !1;
    };
    S.__showOrHideAINode = function (e) {
      if (e) {
        y._$showNode(this.__AILectureNoteSidebarNode);
        y._$showNode(this.__AILectureNoteNode);
        y._$showNode(this.__AILectureNoteViewerNode);
      } else {
        y._$hiddenNode(this.__AILectureNoteSidebarNode);
        y._$hiddenNode(this.__AILectureNoteNode);
        y._$hiddenNode(this.__AILectureNoteViewerNode);
      }
    };
    S.__reset = function (e) {
      if (
        window.isCertifiedPreview ||
        (1 == window.termDto.certified && null !== window.learnMode && 100 == window.learnMode)
      )
        this.__showAILectureNote = !0;
      if (
        (window.isCertifiedNotPreview || window.isCertifiedPreview) &&
        !Object.is(e.showAIGC, null) &&
        !Object.is(e.showAIGC, void 0)
      )
        if (window.isCertifiedPreview)
          this.__showAILectureNote =
            e.showAIGC == y.CONST.AI_STATUS.NOT_COMMIT ||
            e.showAIGC == y.CONST.AI_STATUS.GENERATE_ALL_FAIL ||
            e.showAIGC == y.CONST.AI_STATUS.UNABLE_TO_HANDLE
              ? !1
              : !0;
        else this.__showAILectureNote = e.showAIGC > 0 ? !0 : !1;
      this.__showOrHideAINode(this.__showAILectureNote);
      this.__supReset(e);
      this.__unitVo = e.unitVo;
      window.videoId = e.unitVo && e.unitVo.contentId;
      this.__isLiveVideo = !!e.isLiveVideo;
      this.__resourceVo = e.resourceVo;
      this.__useHtm5Player = this.__getCookiePlayerChoose();
      if (this.__resourceVo.parsedSrtUrl) {
        y._$showNode(this.__downSrtNode);
        this.__downSrtNode.href = this.__resourceVo.parsedSrtUrl;
      } else y._$hiddenNode(this.__downSrtNode);
      if (this.__unitVo.anchorQuestions && this.__unitVo.anchorQuestions.length)
        this.__contentCache._$fetchQuestions(this.__unitVo);
      else this.__genPlayerWithMergeAISegments(null);
      this.__genShareUI();
    };
    S.__judgePlayingTime = function () {
      this.__video._$getCurVideoTime(
        function (e) {
          if (e > 180) {
            this.__video._$pauseVideo();
            g._$addClassName(this.__unitctBoxNode, 'hide-replay-icon');
            this.__unitctBoxNode.appendChild(
              g._$html2node(
                g._$getHtmlTemplate('jst-lessonVideoPause', {
                  lang: (window.moocConfig || {}).lang || {},
                }),
              ),
            );
            this.__loginNode = g._$getByClassName(this.__body, 'j-login')[0];
            v._$addEvent(
              this.__loginNode,
              'click',
              function () {
                y._$$LoginDialog._$showLogin({ from: 'videoUnit' });
              }._$bind(this),
            );
            b.clearInterval(this.__3minsTimer);
          }
        }._$bind(this),
      );
    };
    S.__recordVideoTime = function (e, t, n) {
      var i = this.__contentCache && this.__contentCache._$addLearnLog;
      this.__timeFlag = +new Date();
      if (this.__video) {
        var o = {
          unitId: this.__unitVo.id,
          finished: e,
          index: this.__recordCount++,
          duration: 1e3 * this.__recordDuration,
          courseId: b.courseDto.id,
          lessonId: this.__unitVo.lessonId,
          videoId: this.__unitVo.contentId,
          termId: this.__unitVo.termId,
          resolutionType: this.__video._$getResolutionType(),
          userId: window.webUser && window.webUser.id,
          contentType: 1,
          action: 'LEARN_TIME_COUNT',
        };
        if (t) {
          var a = -1;
          var s = NEJ.X(o, { videoTime: a, learnedVideoTimeCount: 0 });
          this.__contentCache._$saveLearnInfo(s);
        } else
          this.__video._$getCurVideoTime(
            function (e) {
              var a = t ? -1 : e || this.__resourceVo.videoLearnTime;
              a = b.parseInt(a);
              if (0 != a || this.__lastRecordTime)
                if (this.__lastRecordTime != a) {
                  var s =
                    n && n <= this.__learnedVideoTimeCount
                      ? n
                      : parseInt(this.__learnedVideoTimeCount);
                  if (s < 0) s = this.__recordDuration;
                  var r = NEJ.X(o, { videoTime: a, learnedVideoTimeCount: s });
                  this.__contentCache._$saveLearnInfo(r);
                  if (i) i({ dt: m(JSON.stringify(o)).substr(2), p: 'mooc' });
                  this.__lastRecordTime = a;
                }
            }._$bind(this),
          );
      }
    };
    S.__videoPlayEndHandle = function () {
      this.__recordTimer = b.clearInterval(this.__recordTimer);
      var e = parseInt((+new Date() - this.__timeFlag) / 1e3);
      this.__recordVideoTime(!0, !1, e);
      this.__clearAnchorUI();
      if (this.__autoNext.checked) this.__contentCache._$getNextVideo(this.__unitVo.id);
      else if (g._$hasClassName(this.__unitctBoxNode, 'hide-replay-icon'))
        g._$delClassName(this.__unitctBoxNode, 'hide-replay-icon');
    };
    ((S.__initTypeFiveAnchor = function (e) {
      var t = this.__resourceVo.videoId || this.__resourceVo.videoVo.videoId;
      NEJ.X(e, { slideOut: !1, termId: this.__unitVo.termId, videoId: t });
      this.testItemRichText = new s({ data: e })
        .$inject(this.__unitctBoxNode)
        .$on(
          'onViewInfo',
          function () {
            if (this.__video) {
              this.__video._$pauseVideo();
              g._$addClassName(this.__unitctBoxNode, 'mask-disabled');
            }
          }._$bind(this),
        )
        .$on(
          'onClose',
          function () {
            if (this.__video) {
              this.__video._$resumeVideo();
              g._$delClassName(this.__unitctBoxNode, 'mask-disabled');
            }
          }._$bind(this),
        );
    }),
      (S.__videoAnchorHandle = function (e) {
        this.__clearAnchorUI();
        this.__video._$getState(
          function (t) {
            if ('PLAYING' == t) {
              var n = this.__anchorQuesMap[e.questionId];
              if (n) {
                var i = this.__resourceVo.videoId || this.__resourceVo.videoVo.videoId;
                if (5 !== n.type) this.__video._$pauseVideo();
                if (5 === n.type) {
                  console.log('_questionVos', n);
                  this.__initTypeFiveAnchor(n);
                } else
                  this.__insetVideoAnchorUI = y._$$InsetVideoAnchorUI._$allocate({
                    parent: this.__unitctBoxNode,
                    questionVo: n,
                    onReturnLearn: function () {
                      this.__clearAnchorUI();
                      if (this.__video) this.__video._$resumeVideo();
                    }._$bind(this),
                    onReturnRichInfo: function () {
                      if (this.__video) this.__video._$pauseVideo();
                    }._$bind(this),
                  });
                DATracker.track('视频播放页-驻点浮窗展示-iaw', {
                  user_id: !!window.webUser && window.webUser.id,
                  pagename: 'videolearn',
                  term_id: this.__unitVo.termId,
                  video_id: i,
                  point_id: n.id,
                  point_name: n.title,
                  type: n.type,
                });
              }
            }
          }._$bind(this),
        );
        y._$trackEvent('video', 'anchor', this.__resourceVo.unitId + '：' + e.time + 's');
      }));
    S.__videoSegmentAILectureNoteHandle = function (e) {
      var t = this;
      if (this.__currentKnowledgeId !== e.knowledgeId && this.__showAILectureNote) {
        console.log('__videoSegmentAILectureNoteHandle :>> 变化', e);
        DATracker.track('认证MOOC课程学期模式视频课时页-视频分段-点击-iaw', {
          pagename: 'video',
          user_id: !!window.webUser && window.webUser.id,
          course_id: !!window.courseDto && window.courseDto.id,
          term_id: !!window.termDto && window.termDto.id,
        });
        this.__currentKnowledgeId = e.knowledgeId;
        if (this.__segmentAILectureNote)
          this.__segmentAILectureNote.$update({ currentKnowledgeId: e.knowledgeId });
      }
    };
    S.__initVideoSegmentAILectureNote = function () {
      if (this.__segmentAILectureNote) this.__segmentAILectureNote.destroy();
      var e = this;
      var t = '';
      if (
        e.__showAILectureNote &&
        e.__unitVo.aiLectureNoteSegmentList &&
        e.__unitVo.aiLectureNoteSegmentList.length &&
        e.__unitVo.aiLectureNoteSegmentList[0].knowledgeId
      )
        t = e.__unitVo.aiLectureNoteSegmentList[0].knowledgeId;
      e.__currentKnowledgeId = t;
      e.__segmentAILectureNote = new a({
        data: {
          segmentList: e.__unitVo.aiLectureNoteSegmentList || [],
          currentKnowledgeId: t,
          aiSegmentStatus: this.__aiSegmentStatus,
        },
      })
        .$inject(e.__AILectureNoteSidebarNode)
        .$on('setVideoTime', function (t) {
          console.log('setVideoTime :>> ', t);
          e.__video._$seekAnchorTime(t.time);
        });
    };
    S.__initAILectureViewer = function () {
      if (this.__AILectureViewer) this.__AILectureViewer.destroy();
      var e = this;
      var t = '';
      if (
        e.__showAILectureNote &&
        e.__unitVo.videoSegmentInfoDtos &&
        e.__unitVo.videoSegmentInfoDtos.length &&
        e.__unitVo.videoSegmentInfoDtos[0].knowledgeId
      )
        t = e.__unitVo.videoSegmentInfoDtos[0].knowledgeId;
      e.__AILectureViewer = new a({
        data: { segmentList: e.__unitVo.videoSegmentInfoDtos || [], currentKnowledgeId: t },
      }).$inject(e.__AILectureViewer);
    };
    S.__clearAnchorUI = function () {
      if (this.__insetVideoAnchorUI)
        this.__insetVideoAnchorUI = y._$$InsetVideoAnchorUI._$recycle(this.__insetVideoAnchorUI);
    };
    S.__destroy = function () {
      this.__clearAnchorUI();
      this.__recordTimer = b.clearInterval(this.__recordTimer);
      this.__3minsTimer = b.clearInterval(this.__3minsTimer);
      if (this.__video) {
        this.__video.__destroy();
        this.__video = null;
      }
      if (this._recommendModal) {
        this._recommendModal.destroy();
        this._recommendModal = null;
      }
      if (this.__segmentAILectureNote) this.__segmentAILectureNote.destroy();
      this.__supDestroy();
    };
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '8950f51727c5f2d563d0f32d23cb63d5',
  'f2ddbbb127b496a19d690f05e2c0f5fe',
  'd7bf69989e546759b84529160c7674fa',
  '35f84d81ad6ae92f28bbb591b632b6c0',
  '1eef47bbdf1fed4fada13b5ae7d0d174',
  '6822705a15f3a92045e363766de57848',
  'fe86216ed59e3103a56c42c850d389f0',
  '8419259be84b2292fe5117e5d132029e',
  'ecd59ff8d09a183ad64d245b3081fdb9',
  '45aeb51a857b8c0e0cbd727ee1df0c1a',
  '93828627ddb358ed890cb65967a0c1de',
  '493607ab361630ca82fc5bf094051616',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'fb061c769bfc74628a81f422f590544c',
  '726a7dcda1df09970835f707b7b82c44',
  'ad72e09e8978dc83423b503971b6294c',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '9f1797f8fce69be4524346a82910b5e7',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  'fb80274a93905bc7807baceaedc07c15',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
EDU(
  '78c5fa6a9e6887b200fd30c7e7e4ff5d',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('nej.u'),
      c;
    a._$$LessonBreadCrumb = NEJ.C();
    c = a._$$LessonBreadCrumb._$extend(a._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate('jst-lessonBreadCrumbUI', {
          lang: (window.moocConfig || {}).lang || {},
        }),
      );
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__dropNode1 = i._$getByClassName(this.__body, 'j-chapter')[0];
      this.__dropNode2 = i._$getByClassName(this.__body, 'j-lesson')[0];
    };
    c.__onGetChapterList = function (e) {
      this.__chapterUI = a._$$DropListSelect._$allocate({
        parent: this.__dropNode1,
        list: this.__mocTermDto.chapters || [],
        selectId: this.__chapterVo.id,
        itemSelect: this.__onGetNewChapter._$bind(this),
      });
      this.__lessonUI = a._$$DropListSelect._$allocate({
        parent: this.__dropNode2,
        list: this.__chapterVo.lessons || [],
        selectId: this.__lessonVo.id,
        itemSelect: this.__onGetNewLesson._$bind(this),
      });
    };
    c.__onGetNewChapter = function (e) {
      this.__lessonUI = a._$$DropListSelect._$recycle(this.__lessonUI);
      if (e.lessons && !(e.lessons.length <= 0)) {
        this.__chapterVo = e;
        this.__lessonUI = a._$$DropListSelect._$allocate({
          parent: this.__dropNode2,
          list: e.lessons || [],
          defaultName: window.moocConfig.lang.KEY_LEARN_PLEASE_TIME,
          itemSelect: this.__onGetNewLesson._$bind(this),
        });
      }
    };
    c.__onGetNewLesson = function (t) {
      a._$trackEvent('selectLesson', 'click', '点击课时内下拉菜单, id:' + this.__lessonVo.id);
      this.__lessonVo = t;
      e.dispatcher._$redirect(
        a.umi('learnContent') + '?type=detail&id=' + this.__lessonVo.id + '&sm=1',
      );
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__curChapter = -1;
      this.__curLesson = -1;
      this.__lessonVo = e.lessonVo || {};
      this.__chapterVo = e.chapterVo || {};
      this.__mocTermDto = e.mocTermDto || {};
      this.__onGetChapterList();
    };
    c.__destroy = function () {
      if (this.__chapterUI) this.__chapterUI = a._$$DropListSelect._$recycle(this.__chapterUI);
      if (this.__lessonUI) this.__lessonUI = a._$$DropListSelect._$recycle(this.__lessonUI);
      this.__supDestroy();
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '83af3930ddd32bf42c9b2148c50fe1e4',
  '342ad7ae4eea50c3cad860686650a915',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU(
  '0e333ec44c0b303a47a48ae755ccb373',
  '@charset "UTF-8";.ux-watermark_w{-webkit-transform:rotate(-15deg);-moz-transform:rotate(-15deg);-o-transform:rotate(-15deg);-ms-transform:rotate(-15deg);transform:rotate(-15deg);position:absolute;z-index:99999;top:0;left:0;pointer-events:none;}.ux-watermark_item{position:absolute;font-size:18px;color:#999;opacity:0.18;filter:alpha(opacity=18);width:300px;height:20px;line-height:20px;}',
);
EDU(
  'b86535cf4593184fbfbdb719d41c3b83',
  function (e, t, n) {
    e._$pushCSSText(t);
    var i = 18;
    var o = 300;
    var a = 20;
    var s = 240;
    var r = 120;
    if (n._$isMobileAll()) {
      i = 15;
      o = 180;
      s = 70;
      r = 70;
    }
    var c = function () {
      this.init.call(this, arguments[0]);
    };
    var d = c.prototype;
    d.init = function (t) {
      this._element = t.element;
      this._content = t.content;
      if (this._content) {
        e._$dumpCSSText();
        this.update(!0);
      }
    };
    d.update = function () {
      if (this._element && this._content) {
        var e = this._element.offsetHeight;
        var t = this._element.offsetWidth;
        this._height = 2 * e;
        this._width = 2 * t;
        this._numX = parseInt(this._width / o);
        this._numY = parseInt(this._height / a);
        if (!this._div) {
          this._div = document.createElement('div');
          this._div.className = 'ux-watermark';
          this._element.appendChild(this._div);
          this._divw = document.createElement('div');
          this._divw.className = 'ux-watermark_w';
          this._div.appendChild(this._divw);
        }
        this._divw.style.width = this._width + 'px';
        this._divw.style.height = this._height + 'px';
        this._divw.style.top = -this._height / 4 + 'px';
        this._divw.style.left = -this._width / 4 + 'px';
        this._divw.innerHTML = '';
        var n = '';
        for (var i = 1; i <= this._numY; i++)
          for (var s = 1; s <= this._numX; s++) n += this._getWaterMarkItem(s, i);
        this._divw.innerHTML = n;
      }
    };
    d._getWaterMarkItem = function (e, t) {
      var n = 0,
        c = 0;
      var d = c + (o + s) * (e - 1);
      var l = n + (a + r) * (t - 1);
      if (t % 2 == 0) d += 300;
      return (
        '<div class="ux-watermark_item f-thide" style="font-size:' +
        i +
        'px; width:' +
        o +
        'px; left:' +
        d +
        'px; top:' +
        l +
        'px;">' +
        this._content +
        '</div>'
      );
    };
    return c;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '0e333ec44c0b303a47a48ae755ccb373',
  'beec6201069596ecb83a09e5fc3eb415',
);
EDU(
  'dfb69f6053ff766807b472a7b5767a2e',
  function (e, t, n, i, o, a, s, r, c, d) {
    var l,
      _ = window;
    s._$$PdfReader = t._$klass();
    l = s._$$PdfReader._$extend(i._$$EventTarget);
    l.__init = function () {
      this.__super();
    };
    l.__reset = function (e) {
      this.__super(e);
      this.__options = e;
      this.__initNamespace();
      this.__genPlayer();
      this._buildWaterMark();
    };
    l.__initNamespace = function () {
      var t = 'edu.front.flashPdfReader' + e._$randNumberString(2);
      this.__options.namespaceStudy = t;
      this.__jsNamespace = NEJ.P(this.__options.namespaceStudy);
      this.__jsNamespace.changePage = this.__changePage._$bind(this);
    };
    l.__genPlayer = function () {
      var e = this.__options.pdfReaderSwfRemoteUrl;
      var t = 'namespace=' + this.__options.namespaceStudy;
      o._$flash({
        src: e,
        width: '100%',
        height: '100%',
        parent: this.__options.parent,
        params: {
          wmode: 'transparent',
          allowscriptaccess: 'always',
          allowFullScreen: !this.__options.notAllowFullScreen,
          flashvars: t,
        },
        onready: function (e) {
          this.__flashObj = e;
        }._$bind(this),
      });
      if (this.__options.pdfData) this._$load(this.__options.pdfData);
    };
    l.__setPlayerFunc = function (e) {
      if (e && this.__flashObj) e();
      else {
        if (this.__timer) this.__timer = _.clearInterval(this.__timer);
        this.__timer = _.setInterval(
          function () {
            if (e && this.__flashObj) {
              e();
              this.__timer = _.clearInterval(this.__timer);
            }
          }._$bind(this),
          100,
        );
      }
    };
    l._buildWaterMark = function () {
      if (this.__options.waterMark && this.__options.waterMarkContent) {
        this._waterMark = new a({
          element: this.__options.parent,
          content: this.__options.waterMarkContent,
        });
        setTimeout(
          function () {
            this._waterMark.update();
          }._$bind(this),
          50,
        );
      }
    };
    l.__destroy = function () {
      this.__clear();
      this.__supDestroy();
    };
    l.load = l._$load = function (e) {
      if (e) {
        this.__pdfData = e;
        if (!this.__pdfData.textUrl) this.__pdfData.textUrl = this.__pdfData.sources[0].url;
        this.__setPlayerFunc(
          function () {
            this.__flashObj.loadSwfFile(this.__pdfData.textUrl, {
              startPageNum: this.__pdfData.learnedPosition,
              widthHeightRadio: this.__pdfData.textPageWhRatio,
            });
          }._$bind(this),
        );
      }
    };
    l.__changePage = function (e) {
      this._$dispatchEvent('onPageChange', e);
    };
    l.__clear = function () {
      if (this.__parent) {
        var e = n._$getChildren(this.__parent);
        if (e) for (var t = 0; t < e.length; t++) this.__parent.removeChild(e[t]);
      }
      if (this.__timer) this.__timer = _.clearInterval(this.__timer);
      delete this.__flashObj;
    };
    return s;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  'b86535cf4593184fbfbdb719d41c3b83',
);
EDU('04114f69dda271a25460e2c2080630c8', function (e, t, n, i) {
  var o = {};
  o.f = function () {};
  o.isFunction = function (e) {
    return '[object Function]' === o.toString.call(e);
  };
  var a = function (e, t, n) {
    if (e && t) {
      var i;
      for (var o in e)
        if (e.hasOwnProperty(o)) {
          i = t.call(n, e[o], o, e);
          if (i) return o;
        } else;
    }
  };
  var s = function (e, t) {
    for (; t;) {
      var n = t.prototype,
        i = a(n, function (t) {
          return e === t;
        });
      if (null != i) return { name: i, klass: t };
      t = t._$super;
    }
  };
  o.C = function () {
    var e = function () {
      return this._init.apply(this, arguments);
    };
    e.pro = e.prototype;
    e.extend = function (e) {
      if (!o.isFunction(e)) throw new TypeError('SuperClass must be a function');
      var t = function () {};
      t.prototype = e.prototype;
      this.prototype = new t();
      var n = this.prototype;
      n.constructor = this;
      if (void 0 === n._init) n._init = o.f;
      this._$super = e;
      var i = [],
        a = {};
      var r = function (e, t) {
        var n = s(e, t);
        if (n) {
          if (i[i.length - 1] != n.name) i.push(n.name);
          a[n.name] = n.klass._$super;
          return n.name;
        }
      };
      this.prototype.__super = function () {
        var e = i[i.length - 1],
          t = arguments.callee.caller;
        if (!e) e = r(t, this.constructor);
        else {
          var n = a[e].prototype;
          if (!n.hasOwnProperty(t) || t != n[e]) e = r(t, this.constructor);
          else a[e] = a[e]._$super;
        }
        var o = a[e].prototype[e].apply(this, arguments);
        if (e == i[i.length - 1]) {
          i.pop();
          delete a[e];
        }
        return o;
      };
      return n;
    };
    return e;
  };
  return o;
});
EDU(
  '52d3d71916301eac2362f321943cb736',
  function (e) {
    var t = e.C();
    var n = t.pro;
    n._init = function (e) {
      this._viewerContainer = e.viewerNode;
      this._thumbContainer = e.thumbViewerNode;
      this._openThumbnail = e.openThumbnail;
      this._activeWaterMark = e.activeWaterMark;
      this._waterMarkContent = e.waterMarkContent;
      this._onReady = e.onReady;
      this._onPageUpdate = e.onPageUpdate;
      this._onError = e.onError;
      this._activeGrab = e.activeGrab;
      this._pagesCount = 0;
      this._viewer = this._genViewer();
      this._thumbViewer = this._genThumbnailViewer();
    };
    n._genViewer = function () {
      return null;
    };
    n._genThumbnailViewer = function () {
      if (this._openThumbnail) return null;
      else return null;
    };
    n._onPageChange = function (e) {
      this.setCurrentPageNumber(e);
    };
    n.load = function (e, t) {};
    n._setDocument = function (e, t) {
      if (e) {
        this.document = e;
        this._pagesCount = e.numPages;
        this._viewer.setDocument(this.document, t);
        this._thumbViewer && this._thumbViewer.setDocument(this.document, t);
      }
    };
    n.getPagesCount = function () {
      return this._pagesCount;
    };
    n.getCurrentPageNode = function () {
      return this._viewer.getCurrentPageNode();
    };
    n.getCurrentPageNumber = function () {
      this._viewer.getCurrentPageNumber();
    };
    n.setCurrentPageNumber = function (e) {
      this._viewer.setCurrentPageNumber(e);
      this._thumbViewer && this._thumbViewer.setCurrentPageNumber(e);
    };
    n.nextPage = function () {
      this._viewer.nextPage();
    };
    n.prevPage = function () {
      this._viewer.prevPage();
    };
    n.getCurrentScale = function () {
      return this._viewer.getCurrentScale();
    };
    n.setCurrentScale = function (e) {
      this._viewer.setCurrentScale(e);
    };
    n.destroy = function () {
      this._viewer && this._viewer.destroy();
      this._thumbViewer && this._thumbViewer.destroy();
    };
    return t;
  },
  '04114f69dda271a25460e2c2080630c8',
);
EDU(
  'b0a021b0ab86a5e78ae95a65ac08dc03',
  '<div class="ux-edu-pdfviewer f-pa j-body">\n    <div class="sliderWrapper j-sliderwrap"></div>\n</div>\n',
);
EDU(
  '7fa96f408f6a2f4553810864c19b8774',
  '@charset "UTF-8";.ux-edu-pdfviewer{position:relative;width:100%;height:100%;overflow:hidden;}.ux-edu-pdfviewer .sliderWrapper{position:absolute;left:0;top:0;width:999999px;height:100%;-webkit-transition:all 0.2s ease-in-out;-moz-transition:all 0.2s ease-in-out;transition:all 0.2s ease-in-out;}.ux-edu-pdfviewer .slider{float:left;height:100%;width:auto;background-color:#fff;overflow:auto;}.ux-edu-pdfviewer .slidertable{display:table;margin:0 auto;height:100%;}.ux-edu-pdfviewer .canvasWrapper{overflow:hidden;}.ux-edu-pdfviewer .page{width:100px;height:100px;position:relative;overflow:visible;background-color:#fff;margin:0 auto;display:table-cell;vertical-align:middle;}.ux-edu-pdfviewer .page canvas{margin:0;display:block;}.ux-edu-pdfviewer .page canvas[hidden]{display:none;}.ux-edu-pdfviewer .page img{display:block;}.ux-edu-pdfviewer .page .loadingIcon{position:absolute;display:block;left:0;top:0;right:0;bottom:0;background:url("http://edu-image.nosdn.127.net/55965a55-366e-4ae1-83d8-990e0de89477.gif?imageView&quality=100") center no-repeat;}',
);
EDU(
  'f0e047b70228ef4514444ceb678b01da',
  function (e) {
    function t(e) {
      var t = [];
      this.push = function n(i) {
        var o = t.indexOf(i);
        if (o >= 0) t.splice(o, 1);
        t.push(i);
        if (t.length > e) t.shift().destroy();
      };
      this.resize = function (n) {
        e = n;
        for (; t.length > e;) t.shift().destroy();
      };
    }
    if ('ie' == e._$KERNEL.browser && e._$KERNEL.version <= 9) t.DEFAULT_CACHE_SIZE = 3;
    else t.DEFAULT_CACHE_SIZE = 10;
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
);
EDU('c6ac68abc784a45c1aa600db388ebcc3', function () {
  var e = {};
  e.getOutputScale = function (e) {
    var t = window.devicePixelRatio || 1;
    var n =
      e.webkitBackingStorePixelRatio ||
      e.mozBackingStorePixelRatio ||
      e.msBackingStorePixelRatio ||
      e.oBackingStorePixelRatio ||
      e.backingStorePixelRatio ||
      1;
    var i = t / n;
    return { sx: i, sy: i, scaled: 1 !== i };
  };
  e.approximateFraction = function (e) {
    if (Math.floor(e) === e) return [e, 1];
    var t = 1 / e;
    var n = 8;
    if (t > n) return [1, n];
    else if (Math.floor(t) === t) return [1, t];
    var i = e > 1 ? t : e;
    var o = 0,
      a = 1,
      s = 1,
      r = 1;
    for (;;) {
      var c = o + s,
        d = a + r;
      if (d > n) break;
      if (i <= c / d) {
        s = c;
        r = d;
      } else {
        o = c;
        a = d;
      }
    }
    var l;
    if (i - o / a < s / r - i) l = i === e ? [o, a] : [a, o];
    else l = i === e ? [s, r] : [r, s];
    return l;
  };
  e.roundToDivide = function (e, t) {
    var n = e % t;
    return 0 === n ? e : Math.round(e - n + t);
  };
  e.watchResize = function (e, t) {
    var n = e.offsetWidth,
      i = e.offsetHeight,
      o;
    var a = setInterval(function () {
      if (!o) {
        var a = e.offsetWidth;
        var s = e.offsetHeight;
        if (a !== n || s !== i)
          o = setTimeout(function () {
            if (e.offsetWidth == a && e.offsetHeight == s) {
              n = a;
              i = s;
              t(a, s);
            }
            o = null;
          }, 200);
      }
    }, 100);
    return a;
  };
  return e;
});
EDU('6c55c98e8114721018ba02bb36e9a7da', function () {
  var e = {};
  e.MAX_CANVAS_PIXELS = 16e6;
  e.SCALE_VALUE_MAX = 5;
  e.SCALE_VALUE_MIN = 0.01;
  e.CSS_UNITS = 96 / 72;
  e.DEFAULT_SCALE = 1;
  e.THUMBNAIL_CANVAS_BORDER_WIDTH = 1;
  e.THUMBNAIL_WIDTH = 128;
  e.THUMBNAIL_HEIGHT = 72;
  e.THUMBNAIL_OUTWIDTH = 140;
  return e;
});
EDU('0ae40beefbe61a7436a36d54d2e96075', function () {
  var e = {};
  e.errorCode = {
    SOURCE_EMPTY_ERROR: -2,
    DATA_FORMAT_ERROR: -1,
    LOAD_PDF_ERROR: 0,
    LOAD_PDF_PAGE_ERROR: 1,
    PDF_PAGE_DRAW_ERROR: 2,
  };
  e.errorTxt = {
    '-2': '无数据',
    '-1': '没有可以播放的图文资源',
    0: '图文加载失败',
    1: '资源加载失败或者已经过期，请刷新页面',
    2: '资源出现了错误',
  };
  return e;
});
EDU(
  '8d55582df3233e044f632a8de8faa4a2',
  function (e, t, n) {
    function i(e) {
      if ('buttons' in e && a) return !(1 & e.buttons);
      if (r || c) return 0 === e.which;
      else;
    }
    var o;
    !(function () {
      var e = ['webkitM', 'mozM', 'msM', 'oM', 'm'];
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        var i = n + 'atches';
        if (i in document.documentElement) o = i;
        i += 'Selector';
        if (i in document.documentElement) o = i;
        if (o) break;
      }
    })();
    var a = !document.documentMode || document.documentMode > 9;
    var s = window.chrome;
    var r = s && (s.webstore || s.app);
    var c =
      /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);
    var d = function () {
      this.init.call(this, arguments[0]);
    };
    var l = d.prototype;
    l.init = function (e) {
      this.element = e.element;
      this.document = e.element.ownerDocument;
      this.CSS_CLASS_GRAB = 'grab-to-pan-grab';
      this.activate = this.activate._$bind(this);
      this.deactivate = this.deactivate._$bind(this);
      this.toggle = this.toggle._$bind(this);
      this._onmousedown = this._onmousedown._$bind(this);
      this._onmousemove = this._onmousemove._$bind(this);
      this._endPan = this._endPan._$bind(this);
      var t = (this.overlay = document.createElement('div'));
      t.className = 'grab-to-pan-grabbing';
    };
    l.activate = function () {
      if (!this.active) {
        this.active = !0;
        this.element.addEventListener('mousedown', this._onmousedown, !0);
        this.element.classList.add(this.CSS_CLASS_GRAB);
        if (this.onActiveChanged) this.onActiveChanged(!0);
      }
    };
    l.deactivate = function () {
      if (this.active) {
        this.active = !1;
        this.element.removeEventListener('mousedown', this._onmousedown, !0);
        this._endPan();
        this.element.classList.remove(this.CSS_CLASS_GRAB);
        if (this.onActiveChanged) this.onActiveChanged(!1);
      }
    };
    l.toggle = function () {
      if (this.active) this.deactivate();
      else this.activate();
    };
    l.ignoreTarget = function (e) {
      return e[o]('a[href], a[href] *, input, textarea, button, button *, select, option');
    };
    l._onmousedown = function (e) {
      if (0 === e.button && !this.ignoreTarget(e.target)) {
        this._hasmoved = !1;
        if (e.originalTarget)
          try {
            e.originalTarget.tagName;
          } catch (t) {
            return;
          }
        this.scrollLeftStart = this.element.scrollLeft;
        this.scrollTopStart = this.element.scrollTop;
        this.clientXStart = e.clientX;
        this.clientYStart = e.clientY;
        this.document.addEventListener('mousemove', this._onmousemove, !0);
        this.document.addEventListener('mouseup', this._endPan, !0);
        this.element.addEventListener('scroll', this._endPan, !0);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    l._onmousemove = function (e) {
      this.element.removeEventListener('scroll', this._endPan, !0);
      this._hasmoved = !0;
      if (!i(e)) {
        var t = e.clientX - this.clientXStart;
        var n = e.clientY - this.clientYStart;
        var o = this.scrollTopStart - n;
        var a = this.scrollLeftStart - t;
        if (this.element.scrollTo) this.element.scrollTo({ top: o, left: a, behavior: 'instant' });
        else {
          this.element.scrollTop = o;
          this.element.scrollLeft = a;
        }
        if (!this.overlay.parentNode) document.body.appendChild(this.overlay);
      } else this._endPan();
    };
    l._endPan = function (e) {
      this.element.removeEventListener('scroll', this._endPan, !0);
      this.document.removeEventListener('mousemove', this._onmousemove, !0);
      this.document.removeEventListener('mouseup', this._endPan, !0);
      if (this.overlay.remove) this.overlay.remove();
      else if (!this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
      if (this._hasmoved) e && e.stopPropagation();
    };
    return d;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '066e4c8da2c00fde47a845832a3121f4',
  function (e, t, n, i, o, a, s, r, c, d, l, _) {
    t._$pushCSSText(i);
    var u = e.C();
    var f = u.pro;
    f._init = function (e) {
      this.container = e.container;
      this.onReady = e.onReady;
      this.onPageUpdate = e.onPageUpdate;
      this.onError = e.onError;
      this.activeGrab = e.activeGrab;
      this.activeWaterMark = e.activeWaterMark;
      this.waterMarkContent = e.waterMarkContent;
      t._$dumpCSSText();
      this._isNodeReady = !1;
      this._buildHtml();
      this._reset();
    };
    f._buildHtml = function () {
      if (this.container) {
        this.container.appendChild(t._$html2node(n));
        this._bodyNode = t._$getByClassName(this.container, 'j-body')[0];
        this._sliderWrapNode = t._$getByClassName(this.container, 'j-sliderwrap')[0];
        this._bodyWidth = this._bodyNode.offsetWidth;
        this._bodyHeight = this._bodyNode.offsetHeight;
        setTimeout(
          function () {
            this._containerResizeHandler();
            this._af = a.watchResize(this._bodyNode, this._containerResizeHandler._$bind(this));
          }._$bind(this),
          0,
        );
      }
    };
    f.getPagesCount = function () {
      return this._pages.length;
    };
    f.getCurrentPageNode = function () {
      return this._sliderNodes[this._currentPageNumber - 1];
    };
    f.getCurrentPageNumber = function () {
      return this._currentPageNumber;
    };
    f.setCurrentPageNumber = function (e) {
      if (this._currentPageNumber != e) this._slideToPage(e);
    };
    f.nextPage = function () {
      if (!(this._currentPageNumber >= this.getPagesCount()))
        this.setCurrentPageNumber(this._currentPageNumber + 1);
    };
    f.prevPage = function () {
      if (!(this._currentPageNumber <= 1)) this.setCurrentPageNumber(this._currentPageNumber - 1);
    };
    f.getCurrentScale = function () {
      return this._pages[this._currentPageNumber - 1].scale;
    };
    f.setCurrentScale = function (e) {
      if (this._pages[this._currentPageNumber - 1]) {
        this._update();
        this._setScale(this._pages[this._currentPageNumber - 1], e);
      }
    };
    f._reset = function () {
      this._pages = [];
      this._currentPageNumber = 1;
      this._initScaleValue = 1;
      this._currentScaleValue = 1;
      this._pagesRequests = [];
    };
    f._checkReady = function () {
      this._bodyWidth = this._bodyNode.offsetWidth;
      this._bodyHeight = this._bodyNode.offsetHeight;
      if (this._bodyWidth && this._bodyHeight) {
        this._isNodeReady = !0;
        return !0;
      }
      return !1;
    };
    f.setDocument = function (e, t) {
      if (this._checkReady()) {
        if (this._document) {
          this._cancelRendering();
          this._reset();
        }
        if (e) {
          if (this.activeWaterMark && this.waterMarkContent && !this._waterMark)
            this._waterMark = new d({ element: this.container, content: this.waterMarkContent });
          this._document = e;
          var n = this._document.numPages;
          this._buffer = new o(o.DEFAULT_CACHE_SIZE);
          if (o.DEFAULT_CACHE_SIZE > n) this._buffer.resize(n);
        }
      } else
        setTimeout(
          function () {
            this.setDocument(e, t);
          }._$bind(this),
          50,
        );
    };
    f._genPages = function (e) {
      for (var n = 1; n <= e; ++n) {
        var i = document.createElement('div');
        i.className = 'slider j-slider';
        i.style.width = this._bodyWidth + 'px';
        i.style.height = this._bodyHeight + 'px';
        this._sliderWrapNode.appendChild(i);
        if (this.activeGrab) new c({ element: i }).activate();
        var o = document.createElement('div');
        o.className = 'slidertable';
        i.appendChild(o);
        var a = this._genPageView(o, n);
        this._pages.push(a);
      }
      this._sliderNodes = t._$getByClassName(this._sliderWrapNode, 'j-slider');
      this._sliderWrapNode.style.width = e * this._bodyWidth + 'px';
    };
    f._genPageView = function (e, t) {
      return null;
    };
    f._updateScale = function (e) {
      var t = this._bodyWidth;
      var n = this._bodyHeight;
      var i = e.width;
      var o = e.height;
      var a = i / o,
        r = t / n;
      if (a < r) initScale = n / o;
      else initScale = t / i;
      initScale = initScale < s.SCALE_VALUE_MIN ? s.SCALE_VALUE_MIN : initScale;
      initScale = initScale > s.SCALE_VALUE_MAX ? s.SCALE_VALUE_MAX : initScale;
      this._initScaleValue = initScale;
    };
    f._slideToPage = function (e) {
      if (this._sliderNodes) {
        var t = e - 1;
        t = t < 0 ? 0 : t;
        t = t > this._pages.length ? this._pages.length : t;
        if (this._sliderNodes[t] && this._pages[t]) {
          this._currentPageNumber = e;
          this._sliderWrapNode.style.left = -(t * this._bodyWidth) + 'px';
          this._update();
        }
      }
    };
    f._resize = function () {
      this._bodyWidth = this._bodyNode.offsetWidth;
      this._bodyHeight = this._bodyNode.offsetHeight;
      if (this._bodyWidth && this._bodyHeight && this._pages && this._pages.length) {
        var e = this._initScaleValue;
        if (this._defaultViewport) this._updateScale(this._defaultViewport);
        if (this._sliderNodes)
          for (var t = 0; t < this._sliderNodes.length; t++) {
            this._sliderNodes[t].style.width = this._bodyWidth + 'px';
            this._sliderNodes[t].style.height = this._bodyHeight + 'px';
          }
        if (this._sliderWrapNode && this._pages) {
          this._sliderWrapNode.style.width = this._pages.length * this._bodyWidth + 'px';
          this._sliderWrapNode.style.left = -(this._currentPageNumber - 1) * this._bodyWidth + 'px';
        }
        if (this._pages) {
          for (var t = 0; t < this._pages.length; t++)
            if (this._pages[t].scale == e || this._pages[t].scale < this._initScaleValue)
              this._setScale(this._pages[t], this._initScaleValue);
          this._update();
        }
        this._waterMark && this._waterMark.update();
      }
    };
    f._setScale = function (e, t) {
      t = t < this._initScaleValue ? this._initScaleValue : t;
      t = t > s.SCALE_VALUE_MAX ? s.SCALE_VALUE_MAX : t;
      e.update(t);
    };
    f._containerResizeHandler = function () {
      console.log('container resize');
      this._resize();
    };
    f._update = function () {
      this._forceRendering(this._currentPageNumber);
      this.onPageUpdate &&
        this.onPageUpdate({
          pageIndex: this._currentPageNumber,
          scale: this._pages[this._currentPageNumber - 1].scale,
        });
    };
    f.destroy = function () {
      if (this._af) {
        clearInterval(this._af);
        this._af = null;
      }
      if (this._pages && this._pages.length)
        for (var e = 0, t = this._pages.length; e < t; e++) this._pages[e].destroy();
      var n = this.container.childNodes;
      for (var e = n.length - 1; e >= 0; e--) this.container.removeChild(n[e]);
      this._pages = null;
      this._buffer = null;
    };
    f._cancelRendering = function () {
      if (this._pages && this._pages.length)
        for (var e = 0, t = this._pages.length; e < t; e++)
          if (this._pages[e]) this._pages[e].cancelRendering();
    };
    f._ensurePageLoaded = function (e) {
      if (e.page) return _.resolve(e.page);
      var t = e.id;
      if (this._pagesRequests[t]) return this._pagesRequests[t];
      var n = this._document
        .getPage(t)
        .then(
          function (n) {
            if (!e.page) e.setPage(n);
            this._pagesRequests[t] = null;
            return n;
          }._$bind(this),
        )
        ['catch'](
          function (e) {
            console.error('Unable to get page for page view', e);
            this._pagesRequests[t] = null;
            this.onError &&
              this.onError(
                r.errorCode.LOAD_PDF_PAGE_ERROR,
                r.errorTxt[r.errorCode.LOAD_PDF_PAGE_ERROR + ''],
              );
          }._$bind(this),
        );
      this._pagesRequests[t] = n;
      return n;
    };
    f._forceRendering = function (e) {
      if (!(e < 1 || e > this._pages.length)) {
        var t = this._pages[e - 1];
        if (t)
          this._ensurePageLoaded(t).then(
            function () {
              this._renderPage(t);
            }._$bind(this),
          );
      }
    };
    f._renderPage = function (e) {};
    return u;
  },
  '04114f69dda271a25460e2c2080630c8',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'b0a021b0ab86a5e78ae95a65ac08dc03',
  '7fa96f408f6a2f4553810864c19b8774',
  'f0e047b70228ef4514444ceb678b01da',
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  '0ae40beefbe61a7436a36d54d2e96075',
  '8d55582df3233e044f632a8de8faa4a2',
  'b86535cf4593184fbfbdb719d41c3b83',
  'f051aeae7bb889518ead30ef6e491df3',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
EDU('ae4ab8cf92c001207f476c97db0b65c2', function () {
  var e = function () {
    this.init.call(this, arguments);
  };
  var t = e.prototype;
  t.init = function () {
    this._cache = {};
  };
  t.set = function (e, t) {
    if (!e.__weakmapid) e.__weakmapid = 'WeakMap-' + new Date().getTime();
    this._cache[e.__weakmapid] = t;
  };
  t.get = function (e) {
    if (!e.__weakmapid) return null;
    if (!this._cache[e.__weakmapid]) return null;
    else return this._cache[e.__weakmapid];
  };
  t['delete'] = function (e) {
    if (e.__weakmapid)
      if (this._cache[e.__weakmapid]) {
        this._cache[e.__weakmapid] = void 0;
        delete this._cache[e.__weakmapid];
      }
  };
  return e;
});
EDU('c713e1ea371d7be585e8229c82c025f6', function () {
  RenderingStates = { INITIAL: 0, RUNNING: 1, PAUSED: 2, FINISHED: 3 };
  return RenderingStates;
});
EDU(
  'e83a00cddb870f1d80ccdcf07ebe03b4',
  function (e, t, n, i) {
    var o = function () {
      this.init.call(this, arguments[0]);
    };
    var a = o.prototype;
    a.init = function (e) {
      var o = e.container;
      var a = e.defaultViewport;
      this.pdfViewer = e.pdfViewer;
      this.id = e.id;
      this.renderingId = 'page' + this.id;
      this.page = null;
      this.rotation = 0;
      this.scale = e.scale || t.DEFAULT_SCALE;
      this.viewport = a;
      this.pageRotate = a.rotation;
      this.hasRestrictedScaling = !1;
      this.renderInteractiveForms = e.renderInteractiveForms || !1;
      this.paintTask = null;
      this.paintedViewportMap = new n();
      this.renderingState = i.INITIAL;
      this.resume = null;
      this.error = null;
      this.onBeforeDraw = e.onBeforeDraw;
      this.onAfterDraw = e.onAfterDraw;
      this.zoomLayer = null;
      var s = document.createElement('div');
      s.className = 'page';
      s.style.width = Math.floor(this.scale * this.viewport.width) + 'px';
      s.style.height = Math.floor(this.scale * this.viewport.height) + 'px';
      s.setAttribute('data-page-number', this.id);
      this.div = s;
      o.appendChild(s);
    };
    a.setPage = function (e) {
      this.page = e;
      this.pageRotate = e.rotate;
      var n = (this.rotation + this.pageRotate) % 360;
      this.viewport = e.getViewport(this.scale * t.CSS_UNITS, n);
      this.stats = e.stats;
      this.reset();
    };
    a.reset = function (e) {
      this.cancelRendering();
      var t = this.div;
      t.style.width = Math.floor(this.viewport.width) + 'px';
      t.style.height = Math.floor(this.viewport.height) + 'px';
      var n = t.childNodes;
      var i = (e && this.zoomLayer) || null;
      for (var o = n.length - 1; o >= 0; o--) {
        var a = n[o];
        if (i !== a) t.removeChild(a);
        else;
      }
      t.removeAttribute('data-loaded');
      if (!i) {
        if (this.canvas) {
          this.paintedViewportMap['delete'](this.canvas);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
        }
        this._resetZoomLayer();
      }
      this.loadingIconDiv = document.createElement('div');
      this.loadingIconDiv.className = 'loadingIcon';
      t.appendChild(this.loadingIconDiv);
    };
    a.update = function (e, n) {
      this.scale = e || this.scale;
      if ('undefined' != typeof n) this.rotation = n;
      var i = (this.rotation + this.pageRotate) % 360;
      this.viewport = this.viewport.clone({ scale: this.scale * t.CSS_UNITS, rotation: i });
      var o = !1;
      if (this.canvas && t.MAX_CANVAS_PIXELS > 0) {
        var a = this.outputScale;
        if (
          ((Math.floor(this.viewport.width) * a.sx) | 0) *
            ((Math.floor(this.viewport.height) * a.sy) | 0) >
          t.MAX_CANVAS_PIXELS
        )
          o = !0;
      }
      if (this.canvas) {
        if (this.hasRestrictedScaling && o) {
          this.cssTransform(this.canvas, !0);
          return;
        }
        if (!this.zoomLayer && !this.canvas.hasAttribute('hidden')) {
          this.zoomLayer = this.canvas.parentNode;
          this.zoomLayer.style.position = 'absolute';
        }
      }
      this.reset(!0);
    };
    a.cancelRendering = function () {
      if (this.paintTask) {
        this.paintTask.cancel();
        this.paintTask = null;
      }
      this.renderingState = i.INITIAL;
      this.resume = null;
    };
    a.cssTransform = function (e) {
      var t = this.viewport.width;
      var n = this.viewport.height;
      var i = this.div;
      e.style.width = e.parentNode.style.width = i.style.width = Math.floor(t) + 'px';
      e.style.height = e.parentNode.style.height = i.style.height = Math.floor(n) + 'px';
      var o = this.viewport.rotation - this.paintedViewportMap.get(e).rotation;
      var a = Math.abs(o);
      var s = 1,
        r = 1;
      if (90 === a || 270 === a) {
        s = n / t;
        r = t / n;
      }
      var c = 'rotate(' + o + 'deg) scale(' + s + ',' + r + ')';
      PDFJS.CustomStyle.setProp('transform', e, c);
    };
    a._resetZoomLayer = function (e) {
      if (this.zoomLayer) {
        var t = this.zoomLayer.firstChild;
        this.paintedViewportMap['delete'](t);
        t.width = 0;
        t.height = 0;
        if (e) this.zoomLayer.remove();
        this.zoomLayer = null;
      }
    };
    a.getWidth = function () {
      return this.viewport.width;
    };
    a.getHeight = function () {
      return this.viewport.height;
    };
    a.draw = function () {
      if (this.renderingState !== i.INITIAL) {
        console.error('Must be in new state before drawing');
        this.reset();
      }
      if (!this.page) {
        this.renderingState = i.FINISHED;
        return Promise.reject(new Error('Page is not loaded'));
      }
      this.renderingState = i.RUNNING;
      var e = this.page;
      var t = this.div;
      var n = this;
      var o = document.createElement('div');
      o.style.width = t.style.width;
      o.style.height = t.style.height;
      o.classList.add('canvasWrapper');
      t.appendChild(o);
      var a = function (e) {
        this.renderingState = i.RUNNING;
        e();
      }._$bind(this);
      var s = function (o) {
        if (r === n.paintTask) n.paintTask = null;
        if (o)
          if ('cancelled' === o) {
            console.error('finishPaintTask, but error:' + o);
            n.error = null;
            return Promise.resolve(void 0);
          }
        n.renderingState = i.FINISHED;
        if (n.loadingIconDiv) {
          t.removeChild(n.loadingIconDiv);
          delete n.loadingIconDiv;
        }
        n._resetZoomLayer(!0);
        n.error = o;
        n.stats = e.stats;
        if (n.onAfterDraw) n.onAfterDraw();
        if (o) return Promise.reject(o);
        else return Promise.resolve(n.id);
      };
      var r = this.paintOnCanvas(o);
      r.onRenderContinue = a;
      this.paintTask = r;
      var c = r.promise.then(
        function () {
          return s(null);
        },
        function (e) {
          return s(e);
        },
      );
      t.setAttribute('data-loaded', !0);
      if (this.onBeforeDraw) this.onBeforeDraw(this);
      return c;
    };
    a.paintOnCanvas = function (n) {
      var i = PDFJS.createPromiseCapability();
      var o = {
        promise: i.promise,
        onRenderContinue: function (e) {
          e();
        },
        cancel: function () {
          b.cancel();
        },
      };
      var a = this.viewport;
      var s = document.createElement('canvas');
      s.id = this.renderingId;
      s.setAttribute('hidden', 'hidden');
      var r = !0;
      var c = function () {
        if (r) {
          s.removeAttribute('hidden');
          r = !1;
        }
      };
      n.appendChild(s);
      this.canvas = s;
      var d = s.getContext('2d', { alpha: !1 });
      var l = e.getOutputScale(d);
      this.outputScale = l;
      if (t.MAX_CANVAS_PIXELS > 0) {
        var _ = a.width * a.height;
        var u = Math.sqrt(t.MAX_CANVAS_PIXELS / _);
        if (l.sx > u || l.sy > u) {
          l.sx = u;
          l.sy = u;
          l.scaled = !0;
          this.hasRestrictedScaling = !0;
        } else this.hasRestrictedScaling = !1;
      }
      var f = e.approximateFraction(l.sx);
      var h = e.approximateFraction(l.sy);
      s.width = e.roundToDivide(a.width * l.sx, f[0]);
      s.height = e.roundToDivide(a.height * l.sy, h[0]);
      s.style.width = e.roundToDivide(a.width, f[1]) + 'px';
      s.style.height = e.roundToDivide(a.height, h[1]) + 'px';
      this.paintedViewportMap.set(s, a);
      var p = !l.scaled ? null : [l.sx, 0, 0, l.sy, 0, 0];
      var m = {
        canvasContext: d,
        transform: p,
        viewport: this.viewport,
        renderInteractiveForms: this.renderInteractiveForms,
      };
      var b = this.page.render(m);
      b.onContinue = function (e) {
        c();
        if (o.onRenderContinue) o.onRenderContinue(e);
        else e();
      };
      b.promise.then(
        function () {
          c();
          i.resolve(void 0);
        },
        function (e) {
          c();
          i.reject(e);
        },
      );
      return o;
    };
    a.destroy = function () {
      this.reset();
      if (this.page) {
        this.page.cleanup();
        this.page = null;
      }
    };
    return o;
  },
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  'ae4ab8cf92c001207f476c97db0b65c2',
  'c713e1ea371d7be585e8229c82c025f6',
);
EDU(
  '86267b0a351fbf3dc9c26799ec16c180',
  function (e, t, n, i, o, a, s, r) {
    var c = 'ie' == r._$KERNEL.browser && r._$KERNEL.version <= 9;
    var d = e.C();
    var l = d.extend(t);
    l._init = function (e) {
      this.__super(e);
      this.syncScaleValue = {};
    };
    l._reset = function () {
      this.__super();
      this._highestPriorityPage = null;
    };
    l.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getPage(1)
          .then(
            function (n) {
              var i = n.getViewport(1 * o.CSS_UNITS);
              this._defaultViewport = i.clone();
              this._updateScale(this._defaultViewport);
              this._genPages(e.numPages);
              this.onReady && this.onReady({ pagesCount: e.numPages, pageIndex: t });
              this._slideToPage(t);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console.error('pdf document getPage fail:' + e);
              this.onError &&
                this.onError(
                  s.errorCode.LOAD_PDF_PAGE_ERROR,
                  s.errorTxt[s.errorCode.LOAD_PDF_PAGE_ERROR + ''],
                );
            }._$bind(this),
          );
      }
    };
    l._genPageView = function (e, t) {
      return new i({
        pdfViewer: this,
        container: e,
        id: t,
        scale: 3 * this._initScaleValue,
        defaultViewport: this._defaultViewport,
        onBeforeDraw: function (e) {
          this._buffer && this._buffer.push(e);
        }._$bind(this),
      });
    };
    l._renderPage = function (e) {
      switch (e.renderingState) {
        case a.FINISHED:
          this._preRender(e.id);
          return;
        case a.PAUSED:
          this._highestPriorityPage = 'page' + this._currentPageNumber;
          e.resume();
          break;
        case a.RUNNING:
          this._highestPriorityPage = 'page' + this._currentPageNumber;
          break;
        case a.INITIAL:
          this._highestPriorityPage = 'page' + this._currentPageNumber;
          e.draw()
            .then(
              function (e) {
                if (e) this._preRender(e);
              }._$bind(this),
            )
            ['catch'](
              function (e) {
                console.error('pdf page draw error:' + e);
              }._$bind(this),
            );
      }
    };
    l._preRender = function (e) {
      if (!c)
        if (e == this._currentPageNumber) {
          var t = this.syncScaleValue;
          t[e] = t[e] ? !0 : this.setCurrentScale(this._initScaleValue / 3) || !0;
          this._forceRendering(e - 1);
          this._forceRendering(e + 1);
        }
    };
    l.isCurrPage = function (e) {
      return this._highestPriorityPage == e.renderingId;
    };
    return d;
  },
  '04114f69dda271a25460e2c2080630c8',
  '066e4c8da2c00fde47a845832a3121f4',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'e83a00cddb870f1d80ccdcf07ebe03b4',
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
  '0ae40beefbe61a7436a36d54d2e96075',
  'f051aeae7bb889518ead30ef6e491df3',
);
EDU(
  'baf808aaf7dbe832091bb0b38c759bb0',
  '<div class="ux-edu-pdfthumbnailviewer f-pa j-body">\n    <div class="sliderWrapper j-sliderwrap"></div>\n</div>\n',
);
EDU(
  'cf3c1180c76cb43acffd8e7251417a90',
  '@charset "UTF-8";.ux-edu-pdfthumbnailviewer{position:relative;width:100%;height:100%;overflow-x:auto;overflow-y:hidden;}.ux-edu-pdfthumbnailviewer .sliderWrapper{position:absolute;left:0;top:0;width:999999px;height:100%;-webkit-transition:all 0.2s ease-in-out;-moz-transition:all 0.2s ease-in-out;transition:all 0.2s ease-in-out;}.ux-edu-pdfthumbnailviewer .slider{float:left;background-color:#000;overflow:hidden;position:relative;}.ux-edu-pdfthumbnailviewer .slider a{display:block;width:100%;height:100%;}.ux-edu-pdfthumbnailviewer .slider .thumbnailSelectionRing{position:absolute;left:0;top:0;background-color:#fff;}',
);
EDU(
  'e2585f9b03f9ebe40fef9dd6b2fdd434',
  function (e, t, n, i, o, a, s) {
    t._$pushCSSText(i);
    var r = e.C();
    var c = r.pro;
    c._init = function (e) {
      this.container = e.container;
      this.onPageChange = e.onPageChange;
      t._$dumpCSSText();
      this._buildHtml();
      this._reset();
    };
    c._reset = function () {
      this._thumbnails = [];
      this._currentPageNumber = 1;
      this._pagesRequests = [];
    };
    c._buildHtml = function () {
      if (this.container) {
        this.container.appendChild(t._$html2node(n));
        this._bodyNode = t._$getByClassName(this.container, 'j-body')[0];
        this._sliderWrapNode = t._$getByClassName(this.container, 'j-sliderwrap')[0];
        this._bodyWidth = this._bodyNode.offsetWidth;
        this._bodyHeight = this._bodyNode.offsetHeight;
        this._af = o.watchResize(this._bodyNode, this._containerResizeHandler._$bind(this));
        this._bodyNode.addEventListener('scroll', this._containerScrollHandler._$bind(this));
      }
    };
    c._checkReady = function () {
      this._bodyWidth = this._bodyNode.offsetWidth;
      this._bodyHeight = this._bodyNode.offsetHeight;
      if (this._bodyWidth && this._bodyHeight) {
        this._isNodeReady = !0;
        return !0;
      }
      return !1;
    };
    c.setDocument = function (e, t) {
      if (this._checkReady()) {
        if (this._document) {
          this._cancelRendering();
          this._reset();
        }
        if (e) this._document = e;
      } else
        setTimeout(
          function () {
            this.setDocument(e, t);
          }._$bind(this),
          50,
        );
    };
    c._genThumbnails = function (e) {
      for (var n = 1; n <= e; ++n) {
        var i = document.createElement('div');
        i.className = 'slider j-slider';
        i.style.width = a.THUMBNAIL_WIDTH + 'px';
        i.style.height = a.THUMBNAIL_HEIGHT + 'px';
        this._sliderWrapNode.appendChild(i);
        var o = document.createElement('span');
        o.innerHTML = n;
        i.appendChild(o);
        var s = this._genThumbnail(i, n);
        this._thumbnails.push(s);
      }
      this._sliderNodes = t._$getByClassName(this._sliderWrapNode, 'j-slider');
      this._sliderWrapNode.style.width = e * a.THUMBNAIL_OUTWIDTH + 'px';
    };
    c._genThumbnail = function (e, t) {};
    c._onThumbClick = function (e) {
      this.onPageChange && this.onPageChange(e);
    };
    c.getPagesCount = function () {
      return this._thumbnails.length;
    };
    c.getCurrentPageNumber = function () {
      return this._currentPageNumber;
    };
    c.setCurrentPageNumber = function (e) {
      if (this._currentPageNumber != e) this._slideToThumb(e);
    };
    c.nextPage = function () {
      if (!(this._currentPageNumber >= this.getPagesCount()))
        this.setCurrentPageNumber(this._currentPageNumber + 1);
    };
    c.prevPage = function () {
      if (!(this._currentPageNumber <= 1)) this.setCurrentPageNumber(this._currentPageNumber - 1);
    };
    c._searchFirstVisibleView = function (e, t) {
      for (var n = 0; n < e.length; n++) if (e[n].offsetLeft + e[n].clientLeft <= t) return n;
      return 0;
    };
    c._getVisibleThumbs = function (e, t) {
      if (!t || !t.length) return null;
      var n = e.scrollLeft,
        i = n + e.clientWidth;
      var o = [],
        a,
        s;
      var r, c;
      var d = 0 === t.length ? 0 : this._searchFirstVisibleView(t, n);
      for (var l = d, _ = t.length; l < _; l++) {
        a = t[l];
        s = this._sliderNodes[l];
        r = s.offsetLeft + s.clientLeft;
        c = s.clientWidth;
        if (!(r + c < n || r > i)) o.push(a);
        else;
      }
      var u = o[0];
      var f = o[o.length - 1];
      return { first: u, last: f, views: o };
    };
    c._slideToThumb = function (e) {
      if (this._sliderNodes) {
        var n = e - 1;
        if (this._sliderNodes[n] && this._thumbnails[n]) {
          t._$delClassName(this._sliderNodes[this._currentPageNumber - 1], 'cur');
          this._currentPageNumber = e;
          t._$addClassName(this._sliderNodes[n], 'cur');
          this._bodyWidth = this._bodyNode.offsetWidth;
          var i = n * a.THUMBNAIL_OUTWIDTH;
          var o = this._bodyWidth / 2 - a.THUMBNAIL_OUTWIDTH / 2;
          var s = i - o;
          var r = this.getPagesCount() * a.THUMBNAIL_OUTWIDTH - this._bodyWidth;
          s = s < 0 ? 0 : s;
          s = s > r ? r : s;
          if (this._bodyNode.scrollTo)
            this._bodyNode.scrollTo({ top: 0, left: s, behavior: 'smooth' });
          else this._bodyNode.scrollLeft = s;
          this._forceRendering();
        }
      }
    };
    c._containerScrollHandler = function () {
      this._forceRendering();
    };
    c._containerResizeHandler = function () {
      this._forceRendering();
    };
    c._getHighestPriority = function (e) {
      if (!e) return null;
      var t = e.views;
      var n = t.length;
      if (0 === n) return !1;
      for (var i = 0; i < n; i++) {
        var o = t[i];
        if (!this._isViewFinished(o)) return o;
      }
    };
    c._isViewFinished = function (e) {
      return e.renderingState === s.FINISHED;
    };
    c._cancelRendering = function () {
      for (var e = 0; e < this._thumbnails.length; e++)
        if (this._thumbnails[e]) this._thumbnails[e].cancelRendering();
    };
    c._ensurePageLoaded = function (e) {};
    c._forceRendering = function () {
      var e = this._getVisibleThumbs(this._bodyNode, this._thumbnails);
      var t = this._getHighestPriority(e),
        n = this;
      if (t)
        this._ensurePageLoaded(t).then(function () {
          n._renderPage(t);
        });
    };
    c._renderPage = function (e) {};
    c.destroy = function () {
      if (this._af) {
        clearInterval(this._af);
        this._af = null;
      }
      if (this._thumbnails && this._thumbnails.length)
        for (var e = 0, t = this._thumbnails.length; e < t; e++) this._thumbnails[e].destroy();
      var n = this.container.childNodes;
      for (var e = n.length - 1; e >= 0; e--) this.container.removeChild(n[e]);
      this._thumbnails = null;
    };
    return r;
  },
  '04114f69dda271a25460e2c2080630c8',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'baf808aaf7dbe832091bb0b38c759bb0',
  'cf3c1180c76cb43acffd8e7251417a90',
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
);
EDU(
  '483bf8142e40c3ea54fa30040a4071eb',
  function (e, t, n) {
    var i = function () {
      this.init.call(this, arguments[0]);
    };
    var o = i.prototype;
    o.init = function (e) {
      var i = e.container;
      var o = e.defaultViewport;
      this.onThumbClick = e.onThumbClick;
      this.id = e.id;
      this.renderingId = 'thumbnail' + this.id;
      this.page = null;
      this.viewport = o;
      this.renderingState = n.INITIAL;
      this.rotation = 0;
      this.pageRotate = o.rotation;
      this.renderTask = null;
      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this._getCanvasSize();
      var a = document.createElement('a');
      var s = this;
      a.onclick = function () {
        s.onThumbClick && s.onThumbClick(s.id);
      };
      this.anchor = a;
      var r = document.createElement('div');
      r.className = 'thumbnail';
      r.setAttribute('data-page-number', this.id);
      this.div = r;
      var c = document.createElement('div');
      c.className = 'thumbnailSelectionRing';
      c.style.width = this.canvasWidth + 'px';
      c.style.height = this.canvasHeight + 'px';
      c.style.left = (t.THUMBNAIL_WIDTH - this.canvasWidth) / 2 + 'px';
      c.style.top = (t.THUMBNAIL_HEIGHT - this.canvasHeight) / 2 + 'px';
      this.ring = c;
      r.appendChild(c);
      a.appendChild(r);
      i.appendChild(a);
    };
    o.setPage = function (e) {
      this.page = e;
      this.pageRotate = e.rotate;
      var t = (this.rotation + this.pageRotate) % 360;
      this.viewport = e.getViewport(1, t);
      this.reset();
    };
    o._getCanvasSize = function () {
      this.pageRatio = this.pageWidth / this.pageHeight;
      var e = t.THUMBNAIL_WIDTH / t.THUMBNAIL_HEIGHT;
      if (this.pageRatio > e) {
        this.canvasWidth = t.THUMBNAIL_WIDTH;
        this.canvasHeight = this.canvasWidth / this.pageRatio;
      } else {
        this.canvasHeight = t.THUMBNAIL_HEIGHT;
        this.canvasWidth = this.canvasHeight * this.pageRatio;
      }
      this.scale = this.canvasWidth / this.pageWidth;
    };
    o.reset = function () {
      this.cancelRendering();
      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this._getCanvasSize();
      this.div.removeAttribute('data-loaded');
      var e = this.ring;
      var n = e.childNodes;
      for (var i = n.length - 1; i >= 0; i--) e.removeChild(n[i]);
      e.style.width = this.canvasWidth + 'px';
      e.style.height = this.canvasHeight + 'px';
      e.style.left = (t.THUMBNAIL_WIDTH - this.canvasWidth) / 2 + 'px';
      e.style.top = (t.THUMBNAIL_HEIGHT - this.canvasHeight) / 2 + 'px';
      if (this.canvas) {
        this.canvas.width = 0;
        this.canvas.height = 0;
        delete this.canvas;
      }
      if (this.image) {
        this.image.removeAttribute('src');
        delete this.image;
      }
    };
    o.cancelRendering = function () {
      if (this.renderTask) {
        this.renderTask.cancel();
        this.renderTask = null;
      }
      this.renderingState = n.INITIAL;
    };
    o.draw = function () {
      if (this.renderingState !== n.INITIAL) {
        console.error('Must be in new state before drawing');
        return Promise.resolve(void 0);
      }
      this.renderingState = n.RUNNING;
      var e = this;
      var t = function (t) {
        if (c === e.paintTask) e.paintTask = null;
        e.renderingState = n.FINISHED;
        e._convertCanvasToImage();
        if (!t) o.resolve(void 0);
        else o.reject(t);
      };
      var i = function (t) {
        e.renderingState = n.RUNNING;
        t();
      };
      var o = PDFJS.createPromiseCapability();
      var a = this._getPageDrawContext();
      var s = this.viewport.clone({ scale: this.scale });
      var r = { canvasContext: a, viewport: s };
      var c = (this.renderTask = this.page.render(r));
      c.onContinue = i;
      c.promise.then(
        function () {
          t(null);
        },
        function (e) {
          t(e);
        },
      );
      return o.promise;
    };
    o._getPageDrawContext = function () {
      var t = document.createElement('canvas');
      this.canvas = t;
      var n = t.getContext('2d', { alpha: !1 });
      var i = e.getOutputScale(n);
      t.width = (this.canvasWidth * i.sx) | 0;
      t.height = (this.canvasHeight * i.sy) | 0;
      t.style.width = this.canvasWidth + 'px';
      t.style.height = this.canvasHeight + 'px';
      if (i.scaled) n.scale(i.sx, i.sy);
      return n;
    };
    o._convertCanvasToImage = function () {
      if (this.canvas)
        if (this.renderingState === n.FINISHED) {
          var e = this.renderingId;
          var t = 'thumbnailImage';
          var i = document.createElement('img');
          i.id = e;
          i.className = t;
          i.style.width = this.canvasWidth + 'px';
          i.style.height = this.canvasHeight + 'px';
          i.src = this.canvas.toDataURL();
          this.image = i;
          this.div.setAttribute('data-loaded', !0);
          this.ring.appendChild(i);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
        }
    };
    o.destroy = function () {
      this.reset();
      if (this.page) {
        this.page.cleanup();
        this.page = null;
      }
    };
    return i;
  },
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
);
EDU(
  'bfb9f9ce3f7c1168b4f7f00e799858d0',
  function (e, t, n, i) {
    var o = e.C();
    var a = o.extend(t);
    a._init = function (e) {
      this.__super(e);
    };
    a.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getPage(1)
          .then(
            function (n) {
              var i = n.getViewport(1);
              this._defaultViewport = i.clone();
              this._genThumbnails(e.numPages);
              this._slideToThumb(t);
            }._$bind(this),
          )
          ['catch'](
            function () {
              console.error('pdf document getThumbnailPage fail');
            }._$bind(this),
          );
      }
    };
    a._genThumbnail = function (e, t) {
      return new n({
        container: e,
        id: t,
        defaultViewport: this._defaultViewport,
        onThumbClick: this._onThumbClick._$bind(this),
      });
    };
    a._ensurePageLoaded = function (e) {
      if (e.page) return Promise.resolve(e.page);
      var t = e.id;
      if (this._pagesRequests[t]) return this._pagesRequests[t];
      var n = this._document
        .getPage(t)
        .then(
          function (n) {
            if (!e.page) e.setPage(n);
            this._pagesRequests[t] = null;
            return n;
          }._$bind(this),
        )
        ['catch'](
          function (e) {
            console.error('Unable to get page for thumb view', e);
            this._pagesRequests[t] = null;
          }._$bind(this),
        );
      this._pagesRequests[t] = n;
      return n;
    };
    a._renderPage = function (e) {
      var t = this;
      switch (e.renderingState) {
        case i.FINISHED:
          return;
        case i.PAUSED:
          e.resume && e.resume();
          break;
        case i.RUNNING:
          break;
        case i.INITIAL:
          e.draw().then(
            function () {
              t._continueRender();
            },
            function (e) {
              t._continueRender();
              console.error('pdf thumb page draw error:' + e);
            },
          );
      }
    };
    a._continueRender = function () {
      this._forceRendering();
    };
    return o;
  },
  '04114f69dda271a25460e2c2080630c8',
  'e2585f9b03f9ebe40fef9dd6b2fdd434',
  '483bf8142e40c3ea54fa30040a4071eb',
  'c713e1ea371d7be585e8229c82c025f6',
);
EDU(
  '64c1ccae8de58fecf6d0475407fc5551',
  function (e, t, n, i, o, a) {
    var s = e.C();
    var r = s.extend(t);
    r._init = function (e) {
      this.__super(e);
    };
    r._genViewer = function () {
      return new n({
        container: this._viewerContainer,
        onReady: this._onReady,
        onPageUpdate: this._onPageUpdate,
        onError: this._onError,
        activeGrab: this._activeGrab,
        activeWaterMark: this._activeWaterMark,
        waterMarkContent: this._waterMarkContent,
      });
    };
    r._genThumbnailViewer = function () {
      if (this._openThumbnail)
        return new i({
          container: this._thumbContainer,
          onPageChange: this._onPageChange._$bind(this),
        });
      else return null;
    };
    r.load = function (e, t) {
      if (a._$isMobileAll()) this.loadByXhr(e, t);
      else this.loadByPdfjs(e, t);
    };
    r.loadByXhr = function (e, t) {
      if (e) {
        var n = new XMLHttpRequest();
        n.open('GET', e, !0);
        n.responseType = 'arraybuffer';
        var i = function (e) {
          var n = PDFJS.getDocument(e)
            .then(
              function (e) {
                this._setDocument(e, t || 1);
              }._$bind(this),
            )
            ['catch'](
              function (e) {
                console && console.error(e && e.message);
                this._onError &&
                  this._onError(
                    o.errorCode.LOAD_PDF_ERROR,
                    o.errorTxt[o.errorCode.LOAD_PDF_ERROR + ''],
                  );
              }._$bind(this),
            );
        }._$bind(this);
        n.onreadystatechange = function () {
          if (4 == n.readyState) {
            var e = n.status;
            if (e >= 200 && e < 300) i(new Uint8Array(n.response));
            else
              this._onError &&
                this._onError(
                  o.errorCode.LOAD_PDF_ERROR,
                  o.errorTxt[o.errorCode.LOAD_PDF_ERROR + ''],
                );
            n = null;
          }
        }._$bind(this);
        n.send(null);
      }
    };
    r.loadByPdfjs = function (e, t) {
      if (e)
        var n = PDFJS.getDocument({ url: e, withCredentials: !1 })
          .then(
            function (e) {
              this._setDocument(e, t || 1);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console && console.error(e && e.message);
              this._onError &&
                this._onError(
                  o.errorCode.LOAD_PDF_ERROR,
                  o.errorTxt[o.errorCode.LOAD_PDF_ERROR + ''],
                );
            }._$bind(this),
          );
    };
    return s;
  },
  '04114f69dda271a25460e2c2080630c8',
  '52d3d71916301eac2362f321943cb736',
  '86267b0a351fbf3dc9c26799ec16c180',
  'bfb9f9ce3f7c1168b4f7f00e799858d0',
  '0ae40beefbe61a7436a36d54d2e96075',
  'beec6201069596ecb83a09e5fc3eb415',
);
EDU(
  '8b3037c016b81c2866ad092beeeac865',
  function (e, t, n, i) {
    var o = function () {
      this.init.call(this, arguments[0]);
    };
    var a = o.prototype;
    a.init = function (n) {
      var i = n.container;
      var o = n.defaultViewport;
      this.id = n.id;
      this.renderingId = 'page' + this.id;
      this.page = null;
      this.rotation = 0;
      this.scale = n.scale || e.DEFAULT_SCALE;
      this.viewport = o;
      this.picPageRotate = o.rotation;
      this.renderingState = t.INITIAL;
      this.renderTask = null;
      this.onBeforeDraw = n.onBeforeDraw;
      this.onAfterDraw = n.onAfterDraw;
      var a = document.createElement('div');
      a.className = 'page';
      a.style.width = Math.floor(this.scale * this.viewport.width) + 'px';
      a.style.height = Math.floor(this.scale * this.viewport.height) + 'px';
      a.setAttribute('data-page-number', this.id);
      this.div = a;
      i.appendChild(a);
    };
    a.reset = function () {
      this.cancelRendering();
      var e = this.div;
      e.style.width = Math.floor(this.viewport.width) + 'px';
      e.style.height = Math.floor(this.viewport.height) + 'px';
      var t = e.childNodes;
      for (var n = t.length - 1; n >= 0; n--) e.removeChild(t[n]);
      e.removeAttribute('data-loaded');
      this.loadingIconDiv = document.createElement('div');
      this.loadingIconDiv.className = 'loadingIcon';
      e.appendChild(this.loadingIconDiv);
      if (this.image) {
        this.image.removeAttribute('src');
        delete this.image;
      }
    };
    a.setPage = function (e) {
      this.page = e;
      this.viewport = e.getViewport(this.scale);
      this.reset();
    };
    a.update = function (e, t) {
      if (this.page && this.image) {
        this.scale = e || this.scale;
        if ('undefined' != typeof t) this.rotation = t;
        var n = (this.rotation + this.picPageRotate) % 360;
        this.viewport = this.page.getViewport(this.scale, n);
        this.cssTransform(this.image);
      }
    };
    a.cssTransform = function (e) {
      var t = this.viewport.width;
      var n = this.viewport.height;
      var i = this.div;
      e.style.width = i.style.width = Math.floor(t) + 'px';
      e.style.height = i.style.height = Math.floor(n) + 'px';
    };
    a.getWidth = function () {
      return this.viewport.width;
    };
    a.getHeight = function () {
      return this.viewport.height;
    };
    a.draw = function () {
      if (this.renderingState !== t.INITIAL) {
        console.error('Must be in new state before drawing');
        this.reset();
      }
      if (!this.page) {
        this.renderingState = t.FINISHED;
        return i.reject(new Error('Page is not loaded'));
      }
      var e = this.div;
      if (this.onBeforeDraw) this.onBeforeDraw(this);
      this.renderingState = t.RUNNING;
      this.renderTask = this.page
        .render()
        .then(
          function (n) {
            var o;
            this.image = o = document.createElement('img');
            o.id = this.renderingId;
            o.className = 'viewerImage';
            o.style.width = e.style.width;
            o.style.height = e.style.height;
            e.appendChild(o);
            o.src = n;
            e.setAttribute('data-loaded', !0);
            if (this.loadingIconDiv) {
              e.removeChild(this.loadingIconDiv);
              delete this.loadingIconDiv;
            }
            this.renderingState = t.FINISHED;
            if (this.onAfterDraw) this.onAfterDraw(this);
            return i.resolve(this.id);
          }._$bind(this),
        )
        ['catch'](function (e) {
          return i.reject(e);
        });
      return this.renderTask;
    };
    a.cancelRendering = function () {
      if (this.renderTask) this.renderTask = null;
      this.renderingState = t.INITIAL;
    };
    a.destroy = function () {
      this.reset();
      if (this.page) {
        this.page.cleanup();
        this.page = null;
      }
    };
    return o;
  },
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
EDU(
  'b8a080e680aec6214d4fc7f460f56254',
  function (e, t, n, i, o) {
    var a = e.C();
    var s = a.extend(t);
    s._init = function (e) {
      this.__super(e);
    };
    s.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getPage(1)
          .then(
            function (n) {
              this._defaultViewport = n.getViewport();
              this._updateScale(this._defaultViewport);
              this._genPages(e.numPages);
              this.onReady && this.onReady({ pagesCount: e.numPages, pageIndex: t });
              this._slideToPage(t);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console.error('pic document getPage fail:' + e);
              this.onError &&
                this.onError(
                  o.errorCode.LOAD_PDF_PAGE_ERROR,
                  o.errorTxt[o.errorCode.LOAD_PDF_PAGE_ERROR + ''],
                );
            }._$bind(this),
          );
      }
    };
    s._genPageView = function (e, t) {
      return new n({
        container: e,
        id: t,
        scale: this._initScaleValue,
        defaultViewport: this._defaultViewport,
        onBeforeDraw: function (e) {
          this._buffer && this._buffer.push(e);
        }._$bind(this),
      });
    };
    s._renderPage = function (e) {
      switch (e.renderingState) {
        case i.FINISHED:
          this._preRender(e.id);
          return;
        case i.RUNNING:
          break;
        case i.INITIAL:
          e.draw()
            .then(
              function (e) {
                this._preRender(e);
              }._$bind(this),
            )
            ['catch'](
              function (e) {
                console.error('pic page draw error:' + e);
              }._$bind(this),
            );
      }
    };
    s._preRender = function (e) {
      if (e == this._currentPageNumber) {
        this._forceRendering(e - 1);
        this._forceRendering(e + 1);
      }
    };
    return a;
  },
  '04114f69dda271a25460e2c2080630c8',
  '066e4c8da2c00fde47a845832a3121f4',
  '8b3037c016b81c2866ad092beeeac865',
  'c713e1ea371d7be585e8229c82c025f6',
  '0ae40beefbe61a7436a36d54d2e96075',
);
EDU(
  'ace54cbf8138d8966d0eb9bdc81de612',
  function (e, t, n) {
    var i = function () {
      this.init.call(this, arguments[0]);
    };
    var o = i.prototype;
    o.init = function (n) {
      var i = n.container;
      var o = n.defaultViewport;
      this.onThumbClick = n.onThumbClick;
      this.id = n.id;
      this.renderingId = 'thumbnail' + this.id;
      this.page = null;
      this.viewport = o;
      this.renderingState = t.INITIAL;
      this.rotation = 0;
      this.scale = n.scale || e.DEFAULT_SCALE;
      this.renderTask = null;
      this.imageWidth = Math.round(this.viewport.width);
      this.imageHeight = Math.round(this.viewport.height);
      var a = document.createElement('a');
      var s = this;
      a.onclick = function () {
        s.onThumbClick && s.onThumbClick(s.id);
      };
      this.anchor = a;
      var r = document.createElement('div');
      r.className = 'thumbnail';
      r.setAttribute('data-page-number', this.id);
      this.div = r;
      var c = document.createElement('div');
      c.className = 'thumbnailSelectionRing';
      c.style.width = this.imageWidth + 'px';
      c.style.height = this.imageHeight + 'px';
      c.style.left = (e.THUMBNAIL_WIDTH - this.imageWidth) / 2 + 'px';
      c.style.top = (e.THUMBNAIL_HEIGHT - this.imageHeight) / 2 + 'px';
      this.ring = c;
      r.appendChild(c);
      a.appendChild(r);
      i.appendChild(a);
    };
    o.setPage = function (e) {
      this.page = e;
      this.viewport = e.getViewport(this.scale);
      this.reset();
    };
    o.reset = function () {
      this.imageWidth = Math.round(this.viewport.width);
      this.imageHeight = Math.round(this.viewport.height);
      this.div.removeAttribute('data-loaded');
      var t = this.ring;
      var n = t.childNodes;
      for (var i = n.length - 1; i >= 0; i--) t.removeChild(n[i]);
      t.style.width = this.imageWidth + 'px';
      t.style.height = this.imageHeight + 'px';
      t.style.left = (e.THUMBNAIL_WIDTH - this.imageWidth) / 2 + 'px';
      t.style.top = (e.THUMBNAIL_HEIGHT - this.imageHeight) / 2 + 'px';
      if (this.imageNode) {
        this.imageNode.removeAttribute('src');
        delete this.imageNode;
      }
    };
    o.draw = function () {
      if (this.renderingState !== t.INITIAL) {
        console.error('Must be in new state before drawing');
        this.reset();
      }
      if (!this.page) {
        this.renderingState = t.FINISHED;
        return n.reject(new Error('Page is not loaded'));
      }
      this.renderingState = t.RUNNING;
      this.renderTask = this.page
        .render({ width: this.imageWidth, height: this.imageHeight })
        .then(
          function (e) {
            var i;
            this.imageNode = i = document.createElement('img');
            i.id = this.renderingId;
            i.className = 'thumbnailImage';
            i.style.width = this.imageWidth + 'px';
            i.style.height = this.imageHeight + 'px';
            i.src = e;
            this.ring.appendChild(i);
            this.div.setAttribute('data-loaded', !0);
            this.renderingState = t.FINISHED;
            return n.resolve(this.id);
          }._$bind(this),
        )
        ['catch'](function (e) {
          return n.reject(e);
        });
      return this.renderTask;
    };
    o.cancelRendering = function () {
      if (this.renderTask) this.renderTask = null;
      this.renderingState = t.INITIAL;
    };
    o.destroy = function () {
      this.reset();
      if (this.page) {
        this.page.cleanup();
        this.page = null;
      }
    };
    return i;
  },
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
EDU(
  '4f6ee3a19a77f970026bfa623db7def7',
  function (e, t, n, i, o, a) {
    var s = e.C();
    var r = s.extend(t);
    r._init = function (e) {
      this.__super(e);
    };
    r.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getThumbnailPage(1)
          .then(
            function (n) {
              this._defaultViewport = n.getViewport(1);
              var i = this._getThumbnailPicSize(this._defaultViewport);
              this._initScaleValue = i.scale;
              this._genThumbnails(e.numPages);
              this._slideToThumb(t);
            }._$bind(this),
          )
          ['catch'](
            function () {
              console.error('pic document getThumbnailPage fail');
            }._$bind(this),
          );
      }
    };
    r._getThumbnailPicSize = function (e) {
      var t = e.width / e.height;
      var n = o.THUMBNAIL_WIDTH / o.THUMBNAIL_HEIGHT;
      var i, a, s;
      if (t > n) {
        i = o.THUMBNAIL_WIDTH;
        a = Math.round(i / t);
      } else {
        a = o.THUMBNAIL_HEIGHT;
        i = Math.round(a * t);
      }
      s = i / e.width;
      return { width: i, height: a, scale: s };
    };
    r._genThumbnail = function (e, t) {
      return new n({
        container: e,
        id: t,
        scale: this._initScaleValue,
        defaultViewport: this._defaultViewport,
        onThumbClick: this._onThumbClick._$bind(this),
      });
    };
    r._ensurePageLoaded = function (e) {
      if (e.page) return a.resolve(e.page);
      var t = e.id;
      if (this._pagesRequests[t]) return this._pagesRequests[t];
      var n = this._document
        .getThumbnailPage(t)
        .then(
          function (n) {
            if (!e.page) e.setPage(n);
            this._pagesRequests[t] = null;
            return n;
          }._$bind(this),
        )
        ['catch'](
          function (e) {
            console.error('Unable to get page for thumb view', e);
            this._pagesRequests[t] = null;
          }._$bind(this),
        );
      this._pagesRequests[t] = n;
      return n;
    };
    r._renderPage = function (e) {
      var t = this;
      switch (e.renderingState) {
        case i.FINISHED:
          return;
        case i.RUNNING:
          break;
        case i.INITIAL:
          e.draw().then(
            function () {
              t._continueRender();
            },
            function (e) {
              t._continueRender();
              console.error('pdf thumb page draw error:' + e);
            },
          );
      }
    };
    r._continueRender = function () {
      this._forceRendering();
    };
    return s;
  },
  '04114f69dda271a25460e2c2080630c8',
  'e2585f9b03f9ebe40fef9dd6b2fdd434',
  'ace54cbf8138d8966d0eb9bdc81de612',
  'c713e1ea371d7be585e8229c82c025f6',
  '6c55c98e8114721018ba02bb36e9a7da',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
EDU(
  'eb38dfb19c29fff2d7ed7e478819143e',
  function (e, t) {
    var n = function () {
      this.init.call(this, arguments[0]);
    };
    var i = n.prototype;
    i.init = function (e) {
      this._picData = e;
      this._picLoaded = {};
      this._basePageInfo = null;
      this._baseThumbnailPageInfo = null;
      this.numPages = e.pageCount;
    };
    i.getPage = function (t) {
      if (this._basePageInfo) return e.resolve(this._getReturnPage(t, this._basePageInfo.baseImg));
      else {
        var n = this._getPagePicUrl(t);
        return new e(
          function (e, i) {
            this._loadPic(
              n,
              function () {},
              function (i) {
                this._picLoaded[n] = !0;
                var o = this._getReturnPage(t, i);
                this._basePageInfo = o;
                e(o);
              }._$bind(this),
              function (e) {
                i(e);
              }._$bind(this),
            );
          }._$bind(this),
        );
      }
    };
    i.getThumbnailPage = function (t) {
      if (this._baseThumbnailPageInfo)
        return e.resolve(this._getReturnPage(t, this._baseThumbnailPageInfo.baseImg, !0));
      else {
        var n = this._getPagePicUrl(t, { thumbnail: !0 });
        return new e(
          function (e, i) {
            this._loadPic(
              n,
              function () {},
              function (i) {
                this._picLoaded[n] = !0;
                var o = this._getReturnPage(t, i, !0);
                this._baseThumbnailPageInfo = o;
                e(o);
              }._$bind(this),
              function (e) {
                i(e);
              }._$bind(this),
            );
          }._$bind(this),
        );
      }
    };
    i.downloadPage = function (t) {
      if (this._picLoaded[t]) return e.resolve(t);
      else
        return new e(
          function (e, n) {
            this._loadPic(
              t,
              function () {},
              function (n) {
                this._picLoaded[t] = !0;
                e(t);
              }._$bind(this),
              function (e) {
                n(e);
              }._$bind(this),
            );
          }._$bind(this),
        );
    };
    i._getPagePicUrl = function (e, n) {
      n = n || {};
      var i =
        this._picData.picPrefix + e + '.' + this._picData.picSuffix + '?da=' + this._picData.dAuth;
      if (n.thumbnail) i = this._picData.smallPicPrefix + e + '.' + this._picData.picSuffix;
      return t._$scaleImage(i, n.width, n.height);
    };
    i._getReturnPage = function (e, t, n) {
      var i = this;
      return {
        pageNum: e,
        baseImg: t,
        url: null,
        isThumbnail: n,
        getViewport: function (e, t) {
          e = e || 1;
          return {
            width: this.baseImg.width * e,
            height: this.baseImg.height * e,
            rotation: t ? t : 0,
          };
        },
        cleanup: function () {
          delete this.baseImg;
          if (this.url) i._picLoaded[this.url] = null;
        },
        render: function (e) {
          this.params = e || {};
          this.params.thumbnail = !!this.isThumbnail;
          this.url = i._getPagePicUrl(this.pageNum, this.params);
          return i.downloadPage(this.url);
        },
      };
    };
    i.destroy = function () {
      this._picData = null;
      this._picLoaded = null;
      this._basePageInfo = null;
    };
    i._loadPic = (function () {
      var e = [],
        t = null,
        n = function () {
          var t = 0;
          for (; t < e.length; t++) e[t].end ? e.splice(t--, 1) : e[t]();
          !e.length && i();
        },
        i = function () {
          clearInterval(t);
          t = null;
        };
      return function (i, o, a, s) {
        var r,
          c,
          d,
          l,
          _,
          u = new Image();
        u.src = i;
        if (!u.complete) {
          c = -1;
          d = -1;
          u.onerror = function (e) {
            s && s(e);
            r.end = !0;
            u = u.onload = u.onerror = null;
          };
          r = function () {
            l = u.width;
            _ = u.height;
            if (l !== c || _ !== d) {
              o(u);
              r.end = !0;
            }
          };
          r();
          u.onload = function () {
            !r.end && r();
            a && a(u);
            u = u.onload = u.onerror = null;
          };
          if (!r.end) {
            e.push(r);
            if (null === t) t = setInterval(n, 40);
          }
        } else {
          o(u);
          a && a(u);
        }
      };
    })();
    return n;
  },
  'acaf016265ee9e46872cbbb2398ea4b7',
  'ea321df1a66d5a1d11c5df37a56589c4',
);
EDU(
  '06bf5c992404120aa89a086dd93a60aa',
  function (e, t, n, i, o, a) {
    var s = e.C();
    var r = s.extend(t);
    r._init = function (e) {
      this.__super(e);
    };
    r._genViewer = function () {
      return new n({
        container: this._viewerContainer,
        onReady: this._onReady,
        onPageUpdate: this._onPageUpdate,
        onError: this._onError,
        activeGrab: this._activeGrab,
        activeWaterMark: this._activeWaterMark,
        waterMarkContent: this._waterMarkContent,
      });
    };
    r._genThumbnailViewer = function () {
      if (this._openThumbnail)
        return new i({
          container: this._thumbContainer,
          onPageChange: this._onPageChange._$bind(this),
        });
      else return null;
    };
    r.load = function (e, t) {
      this._setDocument(new a(e), t);
    };
    return s;
  },
  '04114f69dda271a25460e2c2080630c8',
  '52d3d71916301eac2362f321943cb736',
  'b8a080e680aec6214d4fc7f460f56254',
  '4f6ee3a19a77f970026bfa623db7def7',
  '0ae40beefbe61a7436a36d54d2e96075',
  'eb38dfb19c29fff2d7ed7e478819143e',
);
EDU(
  'fc3273513654082669a4cda1da469bfa',
  function (e, t, n, i, o, a, s, r, c, d) {
    var l = window;
    var _ = !!document.createElement('canvas').getContext;
    var u = !0;
    if ('ie' == d._$KERNEL.browser && d._$KERNEL.version <= 10) u = !1;
    var f = o.$extends({
      config: function () {
        a.extend(this, {});
        a.extend(this.data, {
          openThumbnail: !0,
          activeGrab: !('ie' == d._$KERNEL.browser && d._$KERNEL.version <= 9),
          notAllowFullScreen: !1,
          isFullScreenMode: !1,
          currentPageIndex: 0,
          scale: 1,
          pageCount: 0,
          showLoading: !0,
          showError: !1,
          usePdf: !1,
          curReaderType: null,
          hasOrigin: !1,
          hasPic: !1,
          pdfData: null,
          formatLoadData: null,
          errorText: '',
          waterMark: !1,
          waterMarkContent: '',
        });
        this.supr();
        this.$watch(
          'currentPageIndex',
          function (e) {
            if (e) {
              e = Number(e);
              if (n._$isNumber(e) && this.data.pageCount)
                if (e > 0 && e <= this.data.pageCount) this.go(e);
            }
          }._$bind(this),
        );
      },
      computed: {
        noPrev: function (e) {
          return 1 == e.currentPageIndex;
        },
        noNext: function (e) {
          return e.currentPageIndex == e.pageCount;
        },
      },
      init: function () {
        this.supr();
        this._rootNode = this.$refs.root;
        this._bindEvents();
        this._showLoading();
        if (this.data.pdfData) this.load(this.data.pdfData);
      },
      _bindEvents: function () {},
      _genPdfViewer: function () {
        try {
          PDFJS.cMapPacked = !0;
          PDFJS.cMapUrl =
            '//yds3-infra-arch.ydstatic.com/school-cdn-storage/mooc-static/pdfjs-dist/cmaps/';
        } catch (e) {
          console.log('cMap设置出错', e);
        }
        this._viewer = new s({
          viewerNode: this.$refs.h5pdfreader,
          thumbViewerNode: this.$refs.h5pdfthumb,
          openThumbnail: this.data.openThumbnail,
          onReady: this._getPageReady._$bind(this),
          onPageUpdate: this._getPageUpdate._$bind(this),
          onError: this._showError._$bind(this),
          activeGrab: this.data.activeGrab,
          activeWaterMark: this.data.waterMark,
          waterMarkContent: this.data.waterMarkContent,
        });
        this._viewer.load(
          this.data.formatLoadData[this.data.curReaderType],
          this.data.currentPageIndex,
        );
      },
      _genPicViewer: function () {
        this._viewer = new r({
          viewerNode: this.$refs.h5pdfreader,
          thumbViewerNode: this.$refs.h5pdfthumb,
          openThumbnail: this.data.openThumbnail,
          onReady: this._getPageReady._$bind(this),
          onPageUpdate: this._getPageUpdate._$bind(this),
          onError: this._showError._$bind(this),
          activeGrab: this.data.activeGrab,
          activeWaterMark: this.data.waterMark,
          waterMarkContent: this.data.waterMarkContent,
        });
        this._viewer.load(
          this.data.formatLoadData[this.data.curReaderType],
          this.data.currentPageIndex,
        );
      },
      load: function (e) {
        if (e) {
          this.data.pdfData = e;
          var t = this._getReaderType(e);
          if (void 0 != t)
            if (!this.data.curReaderType || this.data.curReaderType != t) {
              this.data.curReaderType = t;
              this._createReader(this.data.curReaderType);
            }
        }
      },
      _createReader: function (e) {
        if (this._viewer) {
          this._viewer.destroy();
          this._viewer = null;
        }
        if ('origin' == e)
          if (l.PDFJS) this._genPdfViewer();
          else this._loadPdfJS();
        else this._genPicViewer();
      },
      _getReaderType: function (e) {
        this.data.currentPageIndex = e.learnedPosition;
        this.data.formatLoadData = {};
        this.data.hasPic = !1;
        this.data.hasOrigin = !1;
        this.data.canChangeReaderType = !1;
        if (e.sources && e.sources.length) {
          for (var t = 0; t < e.sources.length; t++)
            if (3 == e.sources[t].type) {
              this.data.hasOrigin = !0;
              this.data.formatLoadData['origin'] = e.sources[t].url;
            } else if (2 == e.sources[t].type) {
              this.data.hasPic = !0;
              this.data.formatLoadData['pic'] = {
                picPrefix: e.sources[t].picPrefix,
                smallPicPrefix: e.sources[t].smallPicPrefix,
                picSuffix: e.sources[t].picSuffix,
                dAuth: e.sources[t].da,
                pageCount: e.pageCount,
              };
            }
          this.data.canChangeReaderType = this.data.hasOrigin && this.data.hasPic && u && _;
          this.$emit('canChangeReaderType', this.data.canChangeReaderType);
          if (this.data.usePdf)
            if (this.data.hasOrigin && u && _) {
              this.$emit('readerType', 'origin');
              return 'origin';
            }
          if (this.data.hasPic) {
            this.$emit('readerType', 'pic');
            return 'pic';
          }
          if (this.data.hasOrigin && u && _) {
            this.$emit('readerType', 'origin');
            return 'origin';
          }
          this._showError(c.errorCode.DATA_FORMAT_ERROR);
        } else this._showError(c.errorCode.DATA_FORMAT_ERROR);
      },
      _loadPdfJS: function () {
        i._$loadScript('//cst.stu.126.net/u/js/cms/pdf.js?1530862868615', {
          onload: this._genPdfViewer._$bind(this),
        });
      },
      _getPageReady: function (e) {
        this.data.pageCount = e.pagesCount;
        this._hideLoading();
        this.$emit('pageCounts', e.pagesCount);
        this.$update();
      },
      _getPageUpdate: function (e) {
        if (this.data.currentPageIndex != e.pageIndex || this.data.scale != e.scale) {
          this.data.currentPageIndex = e.pageIndex;
          this.data.scale = e.scale;
          this.$update();
          this.$emit('pageChange', e.pageIndex);
        }
      },
      changePlayerType: function (e) {
        if (this.data.canChangeReaderType)
          if ('origin' === e || 'pic' === e)
            if (this.data.curReaderType != e) {
              this.data.curReaderType = e;
              this._createReader(this.data.curReaderType);
            }
      },
      go: function (e) {
        this._viewer.setCurrentPageNumber(e);
      },
      prevPage: function (e) {
        if (e) t._$stopBubble(e);
        this._viewer.prevPage();
      },
      nextPage: function (e) {
        if (e) t._$stopBubble(e);
        this._viewer.nextPage();
      },
      scaleBigger: function (e) {
        if (e) t._$stopBubble(e);
        this.data.scale += 0.2;
        this._viewer.setCurrentScale(this.data.scale);
      },
      scaleSmaller: function (e) {
        if (e) t._$stopBubble(e);
        this.data.scale -= 0.2;
        this._viewer.setCurrentScale(this.data.scale);
      },
      _showLoading: function () {
        this.data.showLoading = !0;
        this.$update();
        if (this._loadingInter) clearInterval(this._loadingInter);
        this._loadingInter = setInterval(
          function () {
            if (!this._loadingRotate) this._loadingRotate = 0;
            this._loadingRotate = this._loadingRotate >= 7 ? 0 : ++this._loadingRotate;
            var e = 'rotate(' + 45 * this._loadingRotate + 'deg)';
            var t =
              'display:block;-moz-transform:' + e + ';-o-transform:' + e + ';-ms-transform:' + e;
            if (this.$refs && this.$refs.loading && this.$refs.loading.style) {
              this.$refs.loading.style.cssText = t;
              this.$refs.loading.style.webkitTransform = e;
            }
          }._$bind(this),
          50,
        );
      },
      _hideLoading: function () {
        if (this._loadingInter) clearInterval(this._loadingInter);
        this.data.showLoading = !1;
        this.$update();
      },
      _showError: function (e, t) {
        this._hideLoading();
        this.data.showError = !0;
        this.data.errorText = c.errorTxt[e + ''] + '[code:' + e + ']';
        this.$update();
        this.$emit('error', { errorCode: e, errorMessage: c.errorTxt[e + ''] });
      },
      reload: function () {
        l.location.reload();
      },
      doFullscreen: function (e) {
        if (e) t._$stopBubble(e);
        if (!this.data.notAllowFullScreen)
          if (this.data.isFullScreenMode) this._existfullScreen();
          else this._enterfullScreen();
      },
      _getfullScreenState: function () {
        if (void 0 !== document.fullscreen) return document.fullscreen;
        else if (void 0 !== document.webkitIsFullScreen) return document.webkitIsFullScreen;
        else if (void 0 !== document.mozFullScreen) return document.mozFullScreen;
        else return this._isFullScreenMode;
      },
      _enterfullScreen: function () {
        this.data.isFullScreenMode = !0;
        this.$update();
        if (!this._hasBindFullscreenchange) {
          document.onfullscreenchange = this._onfullScreenChange.bind(this);
          document.onwebkitfullscreenchange = this._onfullScreenChange.bind(this);
          document.onmozfullscreenchange = this._onfullScreenChange.bind(this);
          this._hasBindFullscreenchange = !0;
        }
        if (n._$isFunction(this._rootNode.requestFullScreen)) this._rootNode.requestFullScreen();
        else if (n._$isFunction(this._rootNode.webkitRequestFullScreen))
          this._rootNode.webkitRequestFullScreen();
        else if (n._$isFunction(this._rootNode.mozRequestFullScreen))
          this._rootNode.mozRequestFullScreen();
        else this._enterfullWindow();
      },
      _existfullScreen: function () {
        this.data.isFullScreenMode = !1;
        this.$update();
        if (n._$isFunction(document.exitFullscreen)) document.exitFullscreen();
        else if (n._$isFunction(document.webkitCancelFullScreen)) document.webkitCancelFullScreen();
        else if (n._$isFunction(document.mozCancelFullScreen)) document.mozCancelFullScreen();
        else this._existfullWindow();
      },
      _enterfullWindow: function () {
        t._$addEvent(document, 'keydown', this._fullWindowOnEscKey.bind(this));
        e._$addClassName(document.body, 'ux-edu-h5pdf-bodyfullWindow');
        e._$addClassName(this._rootNode, 'ux-edu-h5pdf-fullWindow');
      },
      _existfullWindow: function () {
        t._$delEvent(document, 'keydown', this._fullWindowOnEscKey.bind(this));
        e._$delClassName(document.body, 'ux-edu-h5pdf-bodyfullWindow');
        e._$delClassName(this._rootNode, 'ux-edu-h5pdf-fullWindow');
      },
      _onfullScreenChange: function (e) {
        this.data.isFullScreenMode = this._getfullScreenState();
        this.$update();
      },
      _fullWindowOnEscKey: function (e) {
        e = document.all ? window.event : e;
        if (27 === (e.keyCode || e.which))
          if (1 == this.data.isFullScreenMode) this._existfullScreen();
      },
      destroy: function () {
        this._viewer && this._viewer.destroy();
        this.supr();
      },
    });
    return f;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '9a830f6a308feb17fe43372af2d6e799',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '64c1ccae8de58fecf6d0475407fc5551',
  '06bf5c992404120aa89a086dd93a60aa',
  '0ae40beefbe61a7436a36d54d2e96075',
  'f051aeae7bb889518ead30ef6e491df3',
);
EDU('158e9623d9c98fd23ce198f1cc953c98', { KEY_REFRESH: '刷新', KEY_LABEL: '图文', KEY_PAGE: '页' });
EDU('733feb78734253f0e1c4b2476cc4c5af', { KEY_REFRESH: 'Refresh', KEY_LABEL: 'PDF', KEY_PAGE: '' });
EDU('5364246a3bfbcb6c6c3fa8463abdeb15', {
  KEY_REFRESH: '更新',
  KEY_LABEL: '画像',
  KEY_PAGE: 'ページ',
});
EDU(
  'ddda2d7d2ae8dce4ee882d69bb14653e',
  function (e, t, n, i, o) {
    var a = o.getLangPack(e, t, n);
    i.set(a);
    o.setLang(a);
    return a;
  },
  '158e9623d9c98fd23ce198f1cc953c98',
  '733feb78734253f0e1c4b2476cc4c5af',
  '5364246a3bfbcb6c6c3fa8463abdeb15',
  '315b0d494df86fc9000e825abd903397',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
);
EDU('01a0da73e099cf4c90e828992736e017', function () {
  return {};
});
EDU('862facc8f6747520ad48ac596770e983', function () {
  return { DIRECTION_PREV: 0, DIRECTION_NEXT: 1 };
});
EDU(
  '5d0cf5af0c4acc2a272b10e23f61baec',
  function (e, t, n, i, o, a) {
    var s = 'component-slider-sticky-switcher';
    var r = e.$extends({
      config: function () {
        this._flushSetting(s, i);
        t.extend(this, { settingKey: s, stickyDistance: 0, criticalIndex: 0, openGesture: !1 });
        t.extend(this.data, {});
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      refresh: function () {
        this.supr();
        if (0 === this.items.length) {
          this.stickyDistance = 0;
          this.criticalIndex = 0;
        } else {
          this.stickyDistance = this.getStickyDistance();
          this.criticalIndex = this._getCriticalIndex();
        }
        this.$emit('refresh', {
          isLast: this.isLast(this.data.index),
          isFirst: this.isFirst(this.data.index),
        });
      },
      _getCriticalIndex: function () {
        for (var e = this.items.length - 1; e >= 0; e--)
          if (this.data.horizontal) {
            if (this.items[e].x < this.stickyDistance) return e - this.data.step + 1;
          } else if (this.items[e].y < this.stickyDistance) return e - this.data.step + 1;
        return 0;
      },
      getStickyDistance: function () {
        var e = this.items.length,
          t;
        if (this.data.horizontal)
          t = this.items[e - 1].x + this.items[e - 1].width - n.getContentWidth(this.$self);
        else t = this.items[e - 1].y + this.items[e - 1].height - n.getContentHeight(this.$self);
        return t >= 0 ? t : 0;
      },
      prev: function () {
        this.select(this.data.index - this.data.step, null, o.DIRECTION_PREV);
      },
      next: function () {
        this.select(this.data.index + this.data.step, null, o.DIRECTION_NEXT);
      },
      select: function (e, t, n) {
        if (isNaN(e))
          if (n === o.DIRECTION_PREV) e = this.criticalIndex;
          else if (n === o.DIRECTION_NEXT) return;
        this.supr(e, t);
      },
      _getAvailableTarget: function (e) {
        var t;
        if (this._isContentSmallerThanContainer()) return 0;
        var n;
        if (isNaN(e)) n = NaN;
        else {
          if (e <= 0) e = 0;
          else if (e >= this.items.length) e = this.items.length - 1;
          if (this.data.horizontal) t = this.items[e].x;
          else t = this.items[e].y;
          if (t >= this.stickyDistance && 0 !== this.stickyDistance) n = NaN;
          else n = e;
          return n;
        }
      },
      _moveTo: function (e) {
        var t;
        if (this.data.horizontal) {
          if (isNaN(e)) t = this.stickyDistance;
          else {
            t = this.items[e].x;
            if (t > this.stickyDistance) t = this.stickyDistance;
          }
          this._translateX(this.$content, -t);
        } else {
          if (isNaN(e)) t = this.stickyDistance;
          else {
            t = this.items[e].y;
            if (t > this.stickyDistance) t = this.stickyDistance;
          }
          this._translateY(this.$content, -t);
        }
        this.transDistance = t;
      },
      _emitSelectEvent: function (e) {
        this.$emit('switch', { target: e, isLast: this.isLast(e), isFirst: this.isFirst(e) });
      },
      isFirst: function (e) {
        return 0 == e;
      },
      isLast: function (e) {
        return isNaN(e) || this._isContentSmallerThanContainer() ? !0 : !1;
      },
      _isContentSmallerThanContainer: function () {
        return 0 === this.stickyDistance;
      },
      _isContentTotallyInContainer: function () {
        return this._isContentSmallerThanContainer() && 0 === this.transDistance;
      },
      onDel: function (e) {
        this.refresh();
        if (this.items.length > 0)
          if (!this._isContentSmallerThanContainer()) {
            if (this.isLastItemBeforeCriticalPoint()) this.select(NaN, { judgeSame: !1 });
          } else this.select(0);
        this.$emit('del', {
          target: e,
          isLast: this.isLast(this.data.index),
          isFirst: this.isFirst(this.data.index),
        });
      },
      isLastItemBeforeCriticalPoint: function () {
        var e,
          t,
          n = this.items[this.items.length - 1];
        if (this.data.horizontal) {
          e = this.$content.clientWidth - n.width;
          t = n.x - this.transDistance;
          if (t < e) return !0;
        }
        return !1;
      },
      onSwipeLeft: function () {
        if (this.data.openGesture && this.data.horizontal) this.next();
      },
      onSwipeRight: function () {
        if (this.data.openGesture && this.data.horizontal) this.prev();
      },
    });
    r.event('swipeleft', function (e, t) {
      var n = null;
      if (window.Hammer) {
        n = new Hammer(e, {});
        n.on('swipeleft', function (e) {
          t(e);
        });
      }
    });
    r.event('swiperight', function (e, t) {
      var n = null;
      if (window.Hammer) {
        n = new Hammer(e, {});
        n.on('swiperight', function (e) {
          t(e);
        });
      }
    });
    return r;
  },
  '72e69d7ea3d8e3a1bbdeb9ca45794217',
  '217dcfc103efb36d2f192eecc4548797',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '01a0da73e099cf4c90e828992736e017',
  '862facc8f6747520ad48ac596770e983',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '4d3cfbb4bed6c67be301f1e9b3644213',
  '<div ref="self" class="ux-slider-switcher ux-slider-sticky-switcher {class}" on-swipeleft={this.onSwipeLeft($event)} on-swiperight={this.onSwipeRight($event)} style="width:{width};height:{height};">\n    {#inc this.$body||content}\n</div>\n',
);
EDU(
  'bfb70f20923024a1185e50f1a03d9fc7',
  '.ux-slider-switcher-content{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0);}.ux-slider-switcher-content-h{position:relative;display:-webkit-box;display:-moz-box;display:box;display:-webkit-flex;display:-moz-flex;display:-ms-flexbox;display:flex;-webkit-transition:-webkit-transform .3s;-moz-transition:-moz-transform .3s;transition:transform .3s;width:100%;height:100%;}.ux-slider-switcher-item-h{-webkit-flex-shrink:0;-moz-flex-shrink:0;flex-shrink:0;-ms-flex-negative:0;}.ux-slider-switcher-content-v{position:relative;-webkit-transition:-webkit-transform .3s;-moz-transition:-moz-transform .3s;transition:transform .3s;width:100%;height:100%;}.ux-slider-switcher{overflow:hidden;}',
);
EDU(
  '8711c9a7b8f533cb8176393befe31458',
  function (e, t, n, i) {
    var o = e.$extends({
      name: 'ux-slider-sticky-switcher',
      css: n,
      template: t,
      config: function () {
        i.extend(this.data, {});
        this.supr();
      },
    });
    return o;
  },
  '5d0cf5af0c4acc2a272b10e23f61baec',
  '4d3cfbb4bed6c67be301f1e9b3644213',
  'bfb70f20923024a1185e50f1a03d9fc7',
  '217dcfc103efb36d2f192eecc4548797',
);
EDU(
  '254c5b8a40141587415605c2e42e133a',
  function (e, t, n, i, o, a) {
    var s = window;
    var r = i.$extends({
      config: function () {
        a.extend(this, {});
        a.extend(this.data, { show: !0, openThumbnail: !1, activeGrab: !1 });
        this.supr();
      },
      init: function () {
        this.supr();
        this.adaptOrientation();
      },
      _bindEvents: function () {
        window.addEventListener(
          'resize',
          function () {
            clearTimeout(this._tid);
            this._tid = setTimeout(this.adaptOrientation._$bind(this), 301);
          }._$bind(this),
        );
        setTimeout(function () {
          document.head.append(
            '<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">',
          );
        }, 500);
        var e = 0;
        var t = 0;
        if (s.Hammer) {
          var n = this.$refs.pdfContainerViewer;
          var i = this.$refs.enterIcon;
          var o = new Hammer(n, { touchAction: 'auto' });
          o.get('pinch').set({ enable: !0 });
          o.on(
            'pinchin',
            function (t) {
              this.showFooter(!1);
              var n = new Date().getTime();
              if (!(n - e < 500)) {
                setTimeout(
                  function () {
                    this.scaleSmaller();
                  }._$bind(this),
                  200,
                );
                e = new Date().getTime();
              }
            }._$bind(this),
          );
          o.on(
            'pinchout',
            function (e) {
              this.showFooter(!1);
              var n = new Date().getTime();
              if (!(n - t < 500)) {
                setTimeout(
                  function () {
                    this.scaleBigger();
                  }._$bind(this),
                  200,
                );
                t = new Date().getTime();
              }
            }._$bind(this),
          );
          o.on(
            'swipeleft',
            function (e) {
              e.preventDefault();
              this.showFooter(!1);
              if (e.deltaX < -80) this.nextPage();
            }._$bind(this),
          );
          o.on(
            'swiperight',
            function (e) {
              e.preventDefault();
              this.showFooter(!1);
              if (e.deltaX > 80) this.prevPage();
            }._$bind(this),
          );
          o.on(
            'tap',
            function () {
              this.showFooter(!this.data.show);
              this.genTimer();
            }._$bind(this),
          );
          var a = new Hammer(i);
          a.on(
            'tap',
            function () {
              this.doFullscreen();
            }._$bind(this),
          );
        }
      },
      adaptOrientation: function () {
        if (s.innerHeight < s.innerWidth) {
          var e = screen.width;
          var t = 1;
          if (e / t > 540) e = 540 * t;
          var n = e / 10;
          var i = s.lib.flexible || (s.lib.flexible = {});
          document.documentElement.style.fontSize = n + 'px';
          i.rem = s.rem = n;
        }
      },
      genTimer: function () {
        clearInterval(this._timer);
        this._timer = setInterval(
          function () {
            this.showFooter(!1);
          }._$bind(this),
          5e3,
        );
      },
      _getPageReady: function (e) {
        this.supr(e);
        this.genTimer();
      },
      _getPageUpdate: function (e) {
        this.supr(e);
        this.select(e.pageIndex);
      },
      select: function (e) {
        if (this.$refs && this.$refs.switcherNode) this.$refs.switcher.select(e - 1);
      },
      go: function (e) {
        this.supr(e);
        this.genTimer();
        this.select(e);
      },
      showFooter: function (e) {
        if (this.$refs && this.$refs.switcherNode) {
          this.$refs.switcherNode.style.pointerEvents = 'none';
          setTimeout(
            function () {
              this.$refs.switcherNode.style.pointerEvents = 'auto';
            }._$bind(this),
            100,
          );
        }
        this.data.show = e;
        this.$update();
      },
      destroy: function () {
        clearInterval(this._timer);
        this.supr();
      },
    });
    return r;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '9a830f6a308feb17fe43372af2d6e799',
  'fc3273513654082669a4cda1da469bfa',
  'ddda2d7d2ae8dce4ee882d69bb14653e',
  '217dcfc103efb36d2f192eecc4548797',
  '8711c9a7b8f533cb8176393befe31458',
);
EDU(
  '6081445e5c998ebe5e57f2bcb627f557',
  '<div class="ux-h5pdfreader" ref=root>\n\t<!-- <div class="ux-h5pdfreader-loading f-pa" ref="loading" r-hide={!showLoading}></div> -->\n\t<div class="ux-h5pdfreader_loadingwrap f-pa" r-hide={!showLoading}>\n\t\t<div class="ux-h5pdfreader_loadingwrap_loading f-pa" ref="loading"></div>\n\t</div>\n\n\t<div class="ux-h5pdfreader_error f-pa j-error" r-hide={!showError}>\n\t\t<div class="emid">\n\t\t\t<div class="f-ib eic"></div>\n\t\t\t<span class="f-ib j-error-txt" ref="errorText"></span>\n\t\t</div>\n\n\t\t<div class="bwarp">\n\t\t\t<a class="reloadbtn f-ib j-error-reload" on-click={this.reload()}>\n\t\t\t\t<span class="">{lang.KEY_REFRESH}</span>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class="ux-h5pdfreader_container f-pr th-bg1" ref="pdfContainer">\n\t\t<div class="ux-h5pdfreader_container_viewer" ref="pdfContainerViewer">\n\t\t\t<div ref="h5pdfreader" style="height: 100%"></div>\n\t\t</div>\n\n\t\t<div class="ux-h5pdfreader_container_slide f-pa" r-class={{"ux-h5pdfreader_container_slide_show": show, "ux-h5pdfreader_container_slide_hide": !show}} ref="switcherNode">\t\t\n\t\t\t<ux-slider-sticky-switcher resize contentClass="ux-h5pdfreader_container_slide_pager" itemClass="ux-h5pdfreader_container_slide_pager_item" ref="switcher" visibilityControl={false} openGesture={true} step={5} on-switch={this.genTimer()}>\n\t\t\t\t<ul class="ux-h5pdfreader_container_slide_pager f-cb">\n\t\t\t\t\t{#list 1..pageCount as i}\n\t\t\t\t\t\t<li class="ux-h5pdfreader_container_slide_pager_item f-fl th-fs3fc6" r-class={{\'ux-h5pdfreader_container_slide_pager_item_selected\': currentPageIndex == i}} on-click={this.go(i)}>\n\t\t\t\t\t\t\t<a class="ux-h5pdfreader_container_slide_pager_index">{i}</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t{/list}\n\t\t\t\t</ul>\n\t\t\t</ux-slider-sticky-switcher>\n\t\t</div>\n\n\t\t<div class="ux-h5pdfreader_container_footer f-pa" r-class={{"ux-h5pdfreader_container_footer_show": show, "ux-h5pdfreader_container_footer_hide": !show}} ref="footer">\n\t\t\t<label class="ux-h5pdfreader_container_footer_label th-fs3fc4">{lang.KEY_LABEL}</label>\n\t\t\t<span class="ux-h5pdfreader_container_footer_page th-fs3fc4">{currentPageIndex}&nbsp;/&nbsp;{pageCount}&nbsp;{lang.KEY_PAGE}</span>\n\t\t\t\n\t\t\t<i ref="enterIcon" class="ux-h5pdfreader_container_footer_icon ux-icon-enter-fullscreen th-fs6fc1" r-class={{\'ux-icon-enter-fullscreen\':!isFullScreenMode, \'ux-icon-exit-fullscreen\':isFullScreenMode}}></i>\n\t\t</div>\n\t</div>\n</div>',
);
EDU(
  'e535bb768ffb8a028ece874ffeebb0f3',
  '@charset "UTF-8";\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n/* 字体 */\n.ux-h5pdfreader {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background: #000;\n}\n.ux-h5pdfreader_loadingwrap {\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n  left: 0;\n  top: 0;\n  background: #000;\n}\n.ux-h5pdfreader_loadingwrap_loading {\n  width: 36px;\n  height: 36px;\n  background: url("//edu-image.nosdn.127.net/component-pdf-reader-images-buffering_04eed3bc0591209bcf6d291d99939f89.png");\n  background-size: 36px 36px;\n  top: 50%;\n  margin: -18px 0 0 -18px;\n  left: 50%;\n}\n.ux-h5pdfreader_error {\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: #000;\n  z-index: 100;\n}\n.ux-h5pdfreader_error .emid {\n  font-size: 14px;\n  line-height: 0.48rem;\n  height: 0.48rem;\n  width: 100%;\n  position: absolute;\n  left: 0;\n  top: 40%;\n  margin-top: -0.6666666667rem;\n  text-align: center;\n  color: #999;\n}\n[data-dpr="2"] .ux-h5pdfreader_error .emid {\n  font-size: 28px;\n}\n[data-dpr="3"] .ux-h5pdfreader_error .emid {\n  font-size: 42px;\n}\n.ux-h5pdfreader_error .emid .eic {\n  background: url("//edu-image.nosdn.127.net/component-pdf-reader-images-error_icon_0522fdc139c709e3b63041fc3ab41124.png");\n  width: 0.48rem;\n  height: 0.48rem;\n  margin-right: 3px;\n  vertical-align: top;\n  background-size: 0.48rem 0.48rem;\n}\n.ux-h5pdfreader_error .bwarp {\n  position: absolute;\n  width: 100%;\n  height: 0.88rem;\n  left: 0;\n  top: 40%;\n  text-align: center;\n  margin-top: 0.1333333333rem;\n}\n.ux-h5pdfreader_error .bwarp .reloadbtn {\n  text-align: center;\n  font-size: 14px;\n  line-height: 0.8rem;\n  height: 0.8rem;\n  color: #00CC7E;\n  border: 1px solid #00CC7E;\n  border-radius: 0.1333333333rem;\n  width: 2.1333333333rem;\n}\n[data-dpr="2"] .ux-h5pdfreader_error .bwarp .reloadbtn {\n  font-size: 28px;\n}\n[data-dpr="3"] .ux-h5pdfreader_error .bwarp .reloadbtn {\n  font-size: 42px;\n}\n.ux-h5pdfreader_container {\n  width: 100%;\n  height: 100%;\n}\n.ux-h5pdfreader_container ::-webkit-scrollbar {\n  display: none;\n}\n.ux-h5pdfreader_container_viewer {\n  height: 100%;\n  z-index: 1;\n  position: relative;\n}\n.ux-h5pdfreader_container_viewer .ux-edu-pdfviewer .slider, .ux-h5pdfreader_container_viewer .ux-edu-pdfviewer .page {\n  background: #000;\n}\n.ux-h5pdfreader_container_slide {\n  z-index: 3;\n  width: 100%;\n  bottom: 1.0666666667rem;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.6);\n  padding: 0.1333333333rem 0rem;\n}\n.ux-h5pdfreader_container_slide .ux-slider-switcher {\n  padding-left: 0.4rem;\n  box-sizing: border-box;\n}\n.ux-h5pdfreader_container_slide_pager {\n  /*overflow: auto;*/\n  padding: 0.0266666667rem 0rem;\n}\n.ux-h5pdfreader_container_slide_pager_item {\n  height: 1.1733333333rem;\n  padding: 0.32rem 0.4533333333rem;\n  background: #333740;\n  box-sizing: border-box;\n  margin-right: 0.16rem;\n}\n.ux-h5pdfreader_container_slide_pager_item_selected {\n  background: #1e7cff;\n  color: #fff;\n  border: 1px solid #fff;\n  height: 1.1466666667rem;\n}\n.ux-h5pdfreader_container_slide_pager_item_selected a {\n  line-height: 0.5066666667rem !important;\n}\n.ux-h5pdfreader_container_slide_pager_item a, .ux-h5pdfreader_container_slide_pager_item a:hover, .ux-h5pdfreader_container_slide_pager_item a:active {\n  text-decoration: none;\n  line-height: 0.5333333333rem;\n}\n.ux-h5pdfreader_container_slide_show {\n  transition: all 0.2s;\n  -webkit-transition: all 0.2s;\n}\n.ux-h5pdfreader_container_slide_hide {\n  padding: 0;\n  height: 0;\n  opacity: 0;\n  bottom: 0;\n  transition: all 0.2s;\n  -webkit-transition: all 0.2s;\n}\n.ux-h5pdfreader_container_footer {\n  z-index: 9;\n  width: 100%;\n  height: 1.0666666667rem;\n  background: #333740;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: -webkit-box;\n  display: -moz-box;\n  display: box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.ux-h5pdfreader_container_footer_label, .ux-h5pdfreader_container_footer_page {\n  flex-grow: 1;\n  -webkit-flex-grow: 1;\n  display: -webkit-box;\n  display: -moz-box;\n  display: box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  align-items: center;\n  -webkit-align-items: center;\n}\n.ux-h5pdfreader_container_footer_label {\n  padding-left: 0.4rem;\n}\n.ux-h5pdfreader_container_footer_icon {\n  display: -webkit-box;\n  display: -moz-box;\n  display: box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  align-items: center;\n  -webkit-align-items: center;\n  padding-right: 0.4rem;\n}\n.ux-h5pdfreader_container_footer_show {\n  transition: all 0.2s;\n  -webkit-transition: all 0.2s;\n}\n.ux-h5pdfreader_container_footer_hide {\n  height: 0;\n  opacity: 0;\n  transition: all 0.2s;\n  -webkit-transition: all 0.2s;\n}\n\n/* 全屏时body样式 */\n.u-edu-h5pdf-bodyfullWindow {\n  padding: 0;\n  margin: 0;\n  height: 100%;\n  overflow-y: auto;\n  -webkit-text-size-adjust: none;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n}\n\n.u-edu-h5pdf-fullWindow {\n  position: fixed !important;\n  overflow: hidden;\n  z-index: 2147483647;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 100% !important;\n  height: 100% !important;\n}\n',
);
EDU(
  'f3c978e3c32c114b58a219233836be9b',
  function (e, t, n) {
    return e.$extends({ name: 'ux-h5pdf-reader', template: t, css: n });
  },
  '254c5b8a40141587415605c2e42e133a',
  '6081445e5c998ebe5e57f2bcb627f557',
  'e535bb768ffb8a028ece874ffeebb0f3',
);
EDU(
  'e8bee5584e29d89e8858dec9daa50a83',
  function (e, t, n, i, o, a, s) {
    var r = i.$extends({
      config: function () {
        a.extend(this, {});
        a.extend(this.data, { showThumb: !0 });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      _bindEvents: function () {
        t._$addEvent(this.$refs.root, 'mouseup', this._clickRoot._$bind(this));
        if (this.$refs.h5pdfthumbcontainer)
          t._$addEvent(this.$refs.h5pdfthumbcontainer, 'mouseup', this._clickThumb._$bind(this));
        this._keydownHandler = this._onKeyDown.bind(this);
        t._$addEvent(document, 'keydown', this._keydownHandler);
      },
      _getFocus: function (e) {
        var t = document.activeElement;
        if (!t) return !0;
        if (t == this.$refs.root || this.$refs.root.contains(t)) return !0;
        else return !1;
      },
      _clickRoot: function (e) {
        this.data.showThumb = !this.data.showThumb;
        this.$update();
        var n = t._$getElement(e);
        if (n != this.$refs.numinput) {
          this.$refs.root.tabIndex = -1;
          this.$refs.root.focus();
        }
      },
      _clickThumb: function (e) {
        t._$stopBubble(e);
      },
      _onKeyDown: function (e) {
        e = document.all ? window.event : e;
        if (this._getFocus()) {
          var t = e.keyCode || e.which;
          switch (t) {
            case 32:
              this._clickSpace(e);
              break;
            case 37:
              this._clickLeft(e);
              break;
            case 38:
              this._clickUp(e);
              break;
            case 39:
              this._clickRight(e);
              break;
            case 40:
              this._clickDown(e);
          }
        }
      },
      _clickSpace: function (e) {
        this.nextPage();
      },
      _clickLeft: function (e) {
        if (this.data.showThumb) this.prevPage();
        else this._movePage(0, -20);
      },
      _clickRight: function (e) {
        if (this.data.showThumb) this.nextPage();
        else this._movePage(0, 20);
      },
      _clickUp: function (e) {
        this._movePage(-20, 0);
      },
      _clickDown: function (e) {
        this._movePage(20, 0);
      },
      _movePage: function (e, t) {
        var n = this._viewer.getCurrentPageNode();
        if (n) {
          var i = n.scrollTop + e;
          var o = n.scrollLeft + t;
          if (n.scrollTo) n.scrollTo({ top: i, left: o, behavior: 'instant' });
          else {
            n.scrollTop = i;
            n.scrollLeft = o;
          }
        }
      },
      destroy: function () {
        this.supr();
        t._$delEvent(document, 'keydown', this._keydownHandler);
      },
    });
    return r;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '9a830f6a308feb17fe43372af2d6e799',
  'fc3273513654082669a4cda1da469bfa',
  'ddda2d7d2ae8dce4ee882d69bb14653e',
  '217dcfc103efb36d2f192eecc4548797',
  'f051aeae7bb889518ead30ef6e491df3',
);
EDU(
  '9a3981cd00ad7256f987a9decbfcf125',
  '<div class="ux-h5pdfreader" ref=root>\n\t<div class="ux-h5pdfreader_loadingwrap f-pa" r-hide={!showLoading}>\n\t\t<div class="ux-h5pdfreader_loadingwrap_loading f-pa" ref="loading"></div>\n\t</div>\n\t<div class="ux-h5pdfreader_error f-pa" r-hide={!showError}>\n\t\t<div class="emid">\n\t\t\t<div class="f-ib eic"></div>\n\t\t\t<span class="f-ib" r-html={errorText}></span>\n\t\t</div>\n\t\t<div class="bwarp">\n\t\t\t<a class="reloadbtn f-ib" on-click={this.reload()}>\n\t\t\t\t<span class="">{lang.KEY_REFRESH}</span>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class="ux-h5pdfreader_container">\n\t\t<div class="ux-h5pdfreader_container_viewer">\n\t\t\t<div class="ux-h5pdfreader_container_viewer_wrap" ref="h5pdfreader"></div>\n\t\t</div>\n\n\t\t<a class="ux-h5pdfreader_container_bigprev" r-class={{\'disable\':noPrev}} on-mouseup={this.prevPage($event)}></a>\n\t\t<a class="ux-h5pdfreader_container_bignext" r-class={{\'disable\':noNext}} on-mouseup={this.nextPage($event)}></a>\n\n\t\t{#if openThumbnail}\n\t\t<div class="ux-h5pdfreader_container_thumb" ref="h5pdfthumbcontainer" r-class={{\'show\':showThumb}}>\n\t\t\t<div class="ux-h5pdfreader_container_thumb_bg"></div>\n\t\t\t<div class="ux-h5pdfreader_container_thumb_con" ref="h5pdfthumb" ></div>\n\t\t</div>\n\t\t{/if}\n\n\t\t<div class="ux-h5pdfreader_container_footer">\n\t\t\t<!-- <a class="" on-click={this.changePlayerType(\'origin\')}>{curReaderType}</a>\t -->\n\n\t\t\t<div class="ux-h5pdfreader_container_footer_pages">\n\t\t\t\t<a class="ux-h5pdfreader_container_footer_pages_prev" r-class={{\'disable\':noPrev}} on-mouseup={this.prevPage($event)}></a>\n\t\t\t\t<input class="ux-h5pdfreader_container_footer_pages_in" ref="numinput" r-model={currentPageIndex}>\n\t\t\t\t<span class="ux-h5pdfreader_container_footer_pages_total">/&nbsp;{pageCount}</span>\n\t\t\t\t<a class="ux-h5pdfreader_container_footer_pages_next" r-class={{\'disable\':noNext}} on-mouseup={this.nextPage($event)}></a>\n\t\t\t</div>\n\n\t\t\t<a class="ux-h5pdfreader_container_footer_scalebigger" on-mouseup={this.scaleBigger($event)}></a>\n\t\t\t<a class="ux-h5pdfreader_container_footer_scalesmaller" on-mouseup={this.scaleSmaller($event)}></a>\n\n\t\t\t{#if !isFullScreenMode}\n\t\t\t<a class="ux-h5pdfreader_container_footer_enterfull" on-mouseup={this.doFullscreen($event)}></a>\n\t\t\t{#else}\n\t\t\t<a class="ux-h5pdfreader_container_footer_existfull" on-mouseup={this.doFullscreen($event)}></a>\n\t\t\t{/if}\n\t\t</div>\n\t</div>\n</div>',
);
EDU(
  'bee889190495379e804d0e83a214d6d0',
  '@charset "UTF-8";\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n.ux-h5pdfreader {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background: #fff;\n  overflow: hidden;\n}\n.ux-h5pdfreader:focus {\n  outline: none;\n}\n.ux-h5pdfreader ::-webkit-scrollbar {\n  width: 4px;\n  height: 4px;\n}\n.ux-h5pdfreader ::-webkit-scrollbar-thumb {\n  border-radius: 2px;\n  background-color: #aaa;\n}\n.ux-h5pdfreader ::-webkit-scrollbar-thumb:hover {\n  background-color: #aaa;\n}\n.ux-h5pdfreader ::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n.ux-h5pdfreader_loadingwrap {\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n  left: 0;\n  top: 0;\n  background: #000;\n}\n.ux-h5pdfreader_loadingwrap_loading {\n  width: 36px;\n  height: 36px;\n  background: url("//edu-image.nosdn.127.net/component-pdf-reader-images-buffering_04eed3bc0591209bcf6d291d99939f89.png");\n  background-size: 36px 36px;\n  top: 50%;\n  margin: -18px 0 0 -18px;\n  left: 50%;\n}\n.ux-h5pdfreader_error {\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: #000;\n  z-index: 100;\n}\n.ux-h5pdfreader_error .emid {\n  font-size: 14px;\n  line-height: 18px;\n  height: 18px;\n  width: 100%;\n  position: absolute;\n  left: 0;\n  top: 40%;\n  margin-top: -25px;\n  text-align: center;\n  color: #999;\n}\n.ux-h5pdfreader_error .emid .eic {\n  background: url("//edu-image.nosdn.127.net/component-pdf-reader-images-web-error_icon_f8fd4d63c4e63c1bbbb66974dc1bf9d1.png");\n  width: 18px;\n  height: 18px;\n  margin-right: 3px;\n  vertical-align: top;\n  background-size: 18px 18px;\n}\n.ux-h5pdfreader_error .bwarp {\n  position: absolute;\n  width: 100%;\n  height: 33px;\n  left: 0;\n  top: 40%;\n  text-align: center;\n  margin-top: 5px;\n}\n.ux-h5pdfreader_error .bwarp .reloadbtn {\n  text-align: center;\n  font-size: 14px;\n  line-height: 30px;\n  height: 30px;\n  color: #00CC7E;\n  border: 1px solid #00CC7E;\n  border-radius: 5px;\n  width: 80px;\n}\n.ux-h5pdfreader_container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background: #fff;\n}\n.ux-h5pdfreader_container_viewer {\n  width: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 32px;\n  z-index: 1;\n}\n.ux-h5pdfreader_container_viewer_wrap {\n  width: 100%;\n  height: 100%;\n}\n.ux-h5pdfreader_container_viewer .ux-edu-pdfviewer .slider, .ux-h5pdfreader_container_viewer .ux-edu-pdfviewer .page {\n  background: #fff;\n}\n.ux-h5pdfreader_container_bigprev, .ux-h5pdfreader_container_bignext {\n  z-index: 5;\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 32px;\n  width: 20%;\n  background: #fff;\n  opacity: 0;\n  cursor: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-prev_cur_d632f7a5d6bbba8b8684f0bcc644e6fb.ico"), move;\n}\n.ux-h5pdfreader_container_bigprev.disable, .ux-h5pdfreader_container_bignext.disable {\n  cursor: inherit;\n  visibility: hidden;\n}\n.ux-h5pdfreader_container_bignext {\n  right: 0;\n  left: auto;\n  cursor: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-next_cur_8831c54940bde1bbf2a26d5a32d3eef4.ico"), move;\n}\n.ux-h5pdfreader_container_thumb {\n  width: 100%;\n  height: 50px;\n  position: absolute;\n  left: 0;\n  bottom: 32px;\n  z-index: 6;\n  opacity: 0;\n  visibility: hidden;\n  transition: 0.2s;\n}\n.ux-h5pdfreader_container_thumb.show {\n  visibility: visible;\n  opacity: 1;\n  height: 104px;\n}\n.ux-h5pdfreader_container_thumb_bg {\n  opacity: 0.6;\n  background: #000;\n  width: 100%;\n  height: 100%;\n}\n.ux-h5pdfreader_container_thumb_con {\n  width: 100%;\n  height: 104px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.ux-h5pdfreader_container_thumb_con .ux-edu-pdfthumbnailviewer .slider {\n  background: #fff;\n  margin: 16px 6px;\n}\n.ux-h5pdfreader_container_thumb_con .ux-edu-pdfthumbnailviewer .slider span {\n  z-index: 1;\n  color: #fff;\n  font-size: 12px;\n  text-align: center;\n  position: absolute;\n  right: 4px;\n  bottom: 4px;\n  line-height: 20px;\n  padding: 0 7px;\n  background: #3E3F49;\n  border-radius: 10px;\n  opacity: 0.6;\n}\n.ux-h5pdfreader_container_thumb_con .ux-edu-pdfthumbnailviewer .slider.cur {\n  border: 3px solid #1E97FF;\n  margin: 13px 3px;\n}\n.ux-h5pdfreader_container_footer {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  background-color: #212228;\n  height: 32px;\n  z-index: 9;\n}\n.ux-h5pdfreader_container_footer_pages {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  width: 140px;\n  margin-left: -70px;\n  height: 32px;\n  line-height: 32px;\n  color: #999;\n  font-size: 12px;\n}\n.ux-h5pdfreader_container_footer_pages_prev {\n  float: left;\n  width: 16px;\n  height: 16px;\n  margin: 8px;\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: 0 -16px;\n}\n.ux-h5pdfreader_container_footer_pages_prev:hover {\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -16px -32px;\n}\n.ux-h5pdfreader_container_footer_pages_prev.disable {\n  background-image: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -16px 0;\n}\n.ux-h5pdfreader_container_footer_pages_next {\n  float: left;\n  width: 16px;\n  height: 16px;\n  margin: 8px;\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -32px -16px;\n}\n.ux-h5pdfreader_container_footer_pages_next:hover {\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -32px 0;\n}\n.ux-h5pdfreader_container_footer_pages_next.disable {\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -16px -16px;\n}\n.ux-h5pdfreader_container_footer_pages_in {\n  float: left;\n  background: #3E3F49;\n  border-radius: 10px;\n  width: 32px;\n  height: 20px;\n  line-height: 20px;\n  margin: 6px;\n  text-align: center;\n  color: #fff;\n}\n.ux-h5pdfreader_container_footer_pages_total {\n  float: left;\n}\n.ux-h5pdfreader_container_footer_scalebigger {\n  position: absolute;\n  right: 48px;\n  top: 8px;\n  width: 16px;\n  height: 16px;\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -48px -32px;\n}\n.ux-h5pdfreader_container_footer_scalebigger:hover {\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -48px -16px;\n}\n.ux-h5pdfreader_container_footer_scalesmaller {\n  position: absolute;\n  right: 80px;\n  top: 8px;\n  width: 16px;\n  height: 16px;\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -16px -48px;\n}\n.ux-h5pdfreader_container_footer_scalesmaller:hover {\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: 0px -48px;\n}\n.ux-h5pdfreader_container_footer_enterfull {\n  position: absolute;\n  right: 16px;\n  top: 8px;\n  width: 16px;\n  height: 16px;\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -48px 0px;\n}\n.ux-h5pdfreader_container_footer_enterfull:hover {\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: -32px -32px;\n}\n.ux-h5pdfreader_container_footer_existfull {\n  position: absolute;\n  right: 16px;\n  top: 8px;\n  width: 16px;\n  height: 16px;\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: 0 0;\n}\n.ux-h5pdfreader_container_footer_existfull:hover {\n  background: url("http://edu-image.nosdn.127.net/component-pdf-reader-images-web-sprite_38f6e566c7118d66bb24b7cd4ea1f118.png");\n  background-position: 0 -32px;\n}\n\n/* 全屏时body样式 */\n.ux-edu-h5pdf-bodyfullWindow {\n  padding: 0;\n  margin: 0;\n  height: 100%;\n  overflow-y: auto;\n  -webkit-text-size-adjust: none;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n}\n\n.ux-edu-h5pdf-fullWindow {\n  position: fixed !important;\n  overflow: hidden;\n  z-index: 2147483647;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 100% !important;\n  height: 100% !important;\n}\n',
);
EDU(
  '81b035387ac51d97fe5f678c9cb319fa',
  function (e, t, n) {
    return e.$extends({ name: 'ux-h5pdf-reader', template: t, css: n });
  },
  'e8bee5584e29d89e8858dec9daa50a83',
  '9a3981cd00ad7256f987a9decbfcf125',
  'bee889190495379e804d0e83a214d6d0',
);
EDU(
  'b58c1bf9b04ca2c75c6e48cf3ad0b4d0',
  function (e, t, n, i, o, a, s, r, c) {
    var d = 1;
    var l = 2;
    var _ = 3;
    var u = 1;
    var f = 3;
    var h = window.isMobilePhone === !0 || 'true' === window.isMobilePhone ? a : s;
    var p = t.$extends({
      name: 'ux-pdf-reader',
      config: function (e) {
        n.extend(this.data, {
          isWap: i._$isMobileAll(),
          usePdf: !1,
          notAllowFullScreen: !1,
          waterMark: !1,
          waterMarkContent: '',
          disableContextMenu: !0,
          pdfReaderSwfRemoteUrl:
            (window.swfUrlMap || {}).pdfReader ||
            '//s.stu.126.net/res/swf/pdfReader.swf?46f67ec609ab49d4ccafd059daba26fe',
          pdfData: null,
        });
        this._fetchDocErrorCount = 0;
        this.supr(e);
      },
      init: function () {
        this.supr();
        if (this.data.disableContextMenu)
          this.$refs.pdfNode.addEventListener('contextmenu', function (e) {
            e.preventDefault();
          });
        this._fetchDocData();
      },
      _canUseH5Pdf: function (e) {
        var t = e.sources;
        if (1 == t.length && t[0].type == d) return !1;
        else return !0;
      },
      _genReader: function () {
        setTimeout(
          function () {
            this.$emit('get_pdf_data', this.data.pdfData);
          }._$bind(this),
          100,
        );
        var e = this._canUseH5Pdf(this.data.pdfData);
        var t = e ? 'h5' : 'flash';
        if (!this._readerUI || !this.__curReaderType || this.__curReaderType != t) {
          var n = this.__curReaderType;
          this.__curReaderType = t;
          setTimeout(
            function () {
              this.$emit('onReaderType', t);
            }._$bind(this),
            0,
          );
          if (this._readerUI && n) {
            if ('h5' == n) this._readerUI && this._readerUI.destroy();
            else if ('flash' == n) this._readerUI = o._$$PdfReader._$recycle(this._readerUI);
            this._readerUI = null;
          }
          if (e) {
            this._readerUI = new h({
              data: {
                usePdf: this.data.usePdf,
                notAllowFullScreen: this.data.notAllowFullScreen,
                waterMark: this.data.waterMark,
                waterMarkContent: this.data.waterMarkContent,
                pdfData: this.data.pdfData,
              },
            }).$inject(this.$refs.pdfNode);
            this._readerUI.$on('pageChange', this._onPageChange._$bind(this));
            this._readerUI.$on('pageCounts', this._onGetPageCounts._$bind(this));
            this._readerUI.$on('canChangeReaderType', this._onCanChangeReaderType._$bind(this));
            this._readerUI.$on('readerType', this._onReaderType._$bind(this));
            this._readerUI.$on('error', this._onError._$bind(this));
          } else {
            if (!c._$checkFlash()) {
              this._showNotSupportFlash();
              return;
            }
            this._readerUI = o._$$PdfReader._$allocate({
              parent: this.$refs.pdfNode,
              pdfReaderSwfRemoteUrl: this.data.pdfReaderSwfRemoteUrl,
              notAllowFullScreen: this.data.notAllowFullScreen,
              waterMark: this.data.waterMark,
              waterMarkContent: this.data.waterMarkContent,
              pdfData: this.data.pdfData,
            });
            this._readerUI._$addEvent('onPageChange', this._onPageChange._$bind(this));
          }
        } else this._readerUI.load(this.data.pdfData);
      },
      load: function (e) {
        if (e) {
          this.data.pdfData = e;
          this._fetchDocData();
        }
      },
      _fetchDocData: function () {
        var t = this._disposeOldPros();
        if (t)
          if (this.data.pdfData.docId && this.data.pdfData.signature) {
            var n = {
              onload: function (t) {
                if (0 == t.code) {
                  this.data.pdfData = e._$merge({}, t.result, this.data.pdfData || {});
                  if (!this.data.pdfData.textPageWhRatio && t.result.whRatio)
                    this.data.pdfData.textPageWhRatio = t.result.whRatio;
                  this._genReader();
                } else if (t.code == -2) {
                  this._onError('signature_expired');
                  this._showTip('页面已过期，请<a class="j-reload">刷新页面</a>[code:-5]');
                } else {
                  this._onError('invalid_error');
                  this._showTip('图文获取失败[code:-3]');
                }
              }._$bind(this),
              onerror: function (e) {
                this._retryFetchDoc();
              }._$bind(this),
              method: 'get',
              type: 'json',
              cookie: !0,
              data: { signature: this.data.pdfData.signature, clientType: this.data.isWap ? f : u },
            };
            r._$request('//vod.study.163.com/api/v1/doc/' + this.data.pdfData.docId + '/get', n);
          } else this._genReader();
        else console.log('no pdf data to load');
      },
      _retryFetchDoc: function () {
        if (this._fetchDocErrorCount >= 3) {
          this._onError('get_video_net_work_error');
          this._showTip('图文获取失败[code:-4]');
        } else {
          this._fetchDocErrorCount++;
          this._fetchDocData();
        }
      },
      _disposeOldPros: function () {
        var e = this.data.pdfData;
        if (e)
          if (!e.docId || !e.signature) {
            e.sources = e.sources || [];
            if (e.textUrl) e.sources.push({ type: d, url: e.textUrl, size: 0 });
            if (e.pdfUrl) e.sources.push({ type: _, url: e.pdfUrl, size: 0 });
            if (!e.sources.length) return !1;
            else {
              e.sources.sort(function (e, t) {
                return t.type - e.type;
              });
              return !0;
            }
          } else if (e.docId && e.signature) return !0;
          else return !1;
        else return !1;
      },
      _showTip: function (e) {
        this.data.showTip = !0;
        this.data.tipMsg = e;
        this.$update();
      },
      _showNotSupportFlash: function () {
        this._showTip(
          '未安装flash，点击<a target="_blank" href="https://get.adobe.com/flashplayer/">这里</a>安装。如果已经安装，请检查flash是否被浏览器拦截',
        );
      },
      changePlayerType: function (e) {
        if ('h5' == this.__curReaderType && this._readerUI) this._readerUI.changePlayerType(e);
      },
      _onPageChange: function (e) {
        this.$emit('pageChange', e);
      },
      _onGetPageCounts: function (e) {
        this.$emit('pageCounts', e);
      },
      _onCanChangeReaderType: function (e) {
        this.$emit('canChangeReaderType', e);
      },
      _onReaderType: function (e) {
        this.$emit('readerType', e);
      },
      _onError: function (e) {
        this.$emit('error', e);
      },
      destroy: function () {
        if ('h5' == this.__curReaderType) this._readerUI && this._readerUI.destroy();
        else if ('flash' == this.__curReaderType && this._readerUI)
          this._readerUI = o._$$PdfReader._$recycle(this._readerUI);
        this._readerUI = null;
        this.supr();
      },
    });
    return p;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'beec6201069596ecb83a09e5fc3eb415',
  'dfb69f6053ff766807b472a7b5767a2e',
  'f3c978e3c32c114b58a219233836be9b',
  '81b035387ac51d97fe5f678c9cb319fa',
  '8a864b627c302d7d1c56bd928b515d1b',
  'f2277e0b522a8d6029276ad9719038dc',
);
EDU(
  '14426dd507849334f792797ec270f5b5',
  '<div class="ux-pdf-reader" ref=pdfNode>\n\n    <!-- 提示 -->\n    {#if showTip}\n    <div class="ux-pdf-reader_tip" r-class="{{\'ux-pdf-reader_tip-wap\':isWap}}">\n        <div class="emid">\n            <div class="f-ib eic"></div>\n            <span class="f-ib" r-html={tipMsg}></span>\n        </div>\n    </div>\n    {/if}\n</div>\n',
);
EDU(
  '9fe62422102bcef9db0f33b769510f23',
  '@charset "UTF-8";\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n.ux-pdf-reader {\n  position: relative;\n  height: 100%;\n  background: #000;\n  overflow: hidden;\n}\n.ux-pdf-reader_tip {\n  position: relative;\n  background-color: #000000;\n  height: 100%;\n}\n.ux-pdf-reader_tip .emid {\n  font-size: 14px;\n  line-height: 18px;\n  height: 18px;\n  width: 100%;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  margin-top: -9px;\n  text-align: center;\n  color: #999;\n}\n.ux-pdf-reader_tip .emid .eic {\n  margin-right: 3px;\n  vertical-align: top;\n  width: 18px;\n  height: 18px;\n  background: url("//edu-image.nosdn.127.net/component-pdf-reader-images-error_icon_0522fdc139c709e3b63041fc3ab41124.png");\n  background-size: 18px 18px;\n}\n.ux-pdf-reader_tip-wap .emid {\n  font-size: 14px;\n  line-height: 0.48rem;\n  height: 0.48rem;\n  width: 100%;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  margin-top: -0.6666666667rem;\n  text-align: center;\n}\n[data-dpr="2"] .ux-pdf-reader_tip-wap .emid {\n  font-size: 28px;\n}\n[data-dpr="3"] .ux-pdf-reader_tip-wap .emid {\n  font-size: 42px;\n}\n.ux-pdf-reader_tip-wap .emid .eic {\n  background: url("//edu-image.nosdn.127.net/component-pdf-reader-images-error_icon_0522fdc139c709e3b63041fc3ab41124.png");\n  width: 0.48rem;\n  height: 0.48rem;\n  margin-right: 3px;\n  vertical-align: top;\n  background-size: 0.48rem 0.48rem;\n}\n\n/* flash不支持的样式 */\n',
);
EDU(
  '053423f7ca87a51880dfaefb4f9a31f5',
  function (e, t, n) {
    return e.$extends({ name: 'ux-pdf-reader', template: t, css: n });
  },
  'b58c1bf9b04ca2c75c6e48cf3ad0b4d0',
  '14426dd507849334f792797ec270f5b5',
  '9fe62422102bcef9db0f33b769510f23',
);
EDU(
  '89a20d6e04a4ff5b168f1faa46d80b1a',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.u'),
      s,
      r;
    a._$$PdfReader = NEJ.C();
    s = a._$$PdfReader._$extend(a._$$UIBase, !0);
    r = a._$$PdfReader._$supro;
    s.__initNode = function () {
      this.__idNum = o._$randNumberString(2);
      this.__jsNamespace = NEJ.P('edu.u.pdfReader' + this.__idNum);
      this.__supInitNode();
      this.__initGInterface();
    };
    s.__destroy = function () {
      if (this.__parent) {
        var e = i._$getChildren(this.__parent);
        if (e) for (var t = 0; t < e.length; t++) this.__parent.removeChild(e[t]);
      }
      delete this.__flashObj;
      this.__supDestroy();
    };
    s.__initGInterface = function () {
      this.__jsNamespace.changePage = this.__changePage._$bind(this);
    };
    s.__changePage = function (e) {
      if (1 != e || this.isFirstLearnedPosition)
        this._$dispatchEvent('onPageChange', { toPageNum: e });
    };
    s.__reset = function (t) {
      this.isFirstLearnedPosition = 1 == t.lessonLearnVo.learnedPosition;
      i._$flash({
        src: e.imageUrlMap.image_pdf_swf,
        width: '100%',
        height: '100%',
        parent: t.parent,
        params: {
          wmode: 'transparent',
          flashvars: 'namespace=edu.u.pdfReader' + this.__idNum,
          allowscriptaccess: 'always',
          allowFullScreen: !t.notAllowFullScreen,
        },
        onready: function (e) {
          this.__flashObj = e;
        }._$bind(this),
      });
      this.__supReset(t);
      this._$readPdf(t.lessonLearnVo);
    };
    s._$readPdf = function (t) {
      if (t) {
        this.___lessonLearnVo = t;
        if (this.__readTimer) this.__readTimer = e.clearInterval(this.__readTimer);
        this.__readTimer = e.setInterval(
          function () {
            if (this.__flashObj) {
              this.__flashObj.loadSwfFile(t.textUrl, {
                startPageNum: t.learnedPosition || 1,
                widthHeightRadio: t.textPageWhRatio,
              });
              this.__readTimer = e.clearInterval(this.__readTimer);
            }
          }._$bind(this),
          100,
        );
      }
    };
  },
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '84117c1b0fcf34c8802d9f0946d1869e',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      l;
    c._$$PdfUnit = NEJ.C();
    l = c._$$PdfUnit._$extend(c._$$UIBase, !0);
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate('jst-lessonPdfUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    l.__initNode = function (e) {
      this.__supInitNode();
      this.__unitctBoxNode = a._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__unitctBarNode = a._$getByClassName(this.__body, 'j-unitctBar')[0];
      this.__contentCache = new r._$$COM_Cache_CourseCtCache();
    };
    l.__reset = function (i) {
      this.__supReset(i);
      this.__unitVo = i.unitVo;
      this.__resourceVo = i.resourceVo;
      this.__downPdfNode = a._$getByClassName(i.outNode, 'j-downpdf')[0];
      this.__curTime = new Date().getTime();
      this.__nowPage = 1;
      this.__pdfTimeLogTime = 0;
      this.__totalPage = this.__resourceVo.textPages || 0;
      if (this.__resourceVo.textOrigUrl) {
        c._$showNode(this.__unitctBarNode);
        this.__downPdfNode.href = t._$changeProtocol(this.__resourceVo.textOrigUrl);
      } else c._$hiddenNode(this.__unitctBarNode);
      this.__unitctBoxNode.style.height =
        this.__unitctBoxNode.scrollWidth / this.__resourceVo.textPageWhRatio + 'px';
      a._$setStyle(this.__unitctBoxNode, 'overflow-y', 'visible');
      var o = [{ type: 3, url: this.__resourceVo.textUrl }];
      if (this.__reader) this.__reader.destroy();
      this.__reader = new e({
        data: { pdfData: { sources: o, learnedPosition: this.__resourceVo.learnedPosition } },
      }).$inject(this.__unitctBoxNode);
      this.__reader.$on('pageChange', this.__recordTextPage._$bind(this));
      this.__reader.$on(
        'pageCounts',
        function (e) {
          this.__totalPage = e;
        }._$bind(this),
      );
      if (!n.isPreview) {
        var s = {
          userId: c._$getWebUser().id,
          courseId: n.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          pdfId: this.__unitVo.contentId,
        };
        c._$trackEvent('pdfUnit', 'view', c._$convertToJSONHex(s));
        c._$log2Study('pdfUnit', 'view', s);
      }
    };
    l.__recordTextPage = function (e) {
      console.log('111111.', e);
      if (e) this.__nowPage = e;
      if (Number.isInteger(this.__curTime)) {
        var t = new Date().getTime();
        var i = t - this.__curTime;
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: this.__nowPage == this.__totalPage,
          contentType: 3,
          index: this.__pdfTimeLogTime++,
          pageNum: this.__nowPage,
          courseId: n.courseDto.id,
          lessonId: this.__unitVo.lessonId,
          termId: this.__unitVo.termId,
          lastLearnTime: t,
          learnedVideoTimeCount: parseInt(i / 1e3, 10),
        });
        this.__curTime = t;
      }
    };
    l.__destroy = function () {
      this.__recordTextPage();
      if (this.__reader) {
        this.__reader.destroy();
        this.__reader = null;
      }
      this.__supDestroy();
    };
  },
  '053423f7ca87a51880dfaefb4f9a31f5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '89a20d6e04a4ff5b168f1faa46d80b1a',
  'ad72e09e8978dc83423b503971b6294c',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU(
  'be679cde8e87d7a4d28f9f32f4ee35ac',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c;
    var d = i._$pushCSSText(
      '        .#<uispace> .unitctBox{word-break: break-word;word-wrap: break-word;padding:20px 30px;font-size:14px; overflow: auto; }        ',
    );
    a._$$RichTextUnit = NEJ.C();
    c = a._$$RichTextUnit._$extend(a._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate('jst-lessonRichTxtUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__unitctBoxNode = i._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__contentCache = new r._$$COM_Cache_CourseCtCache();
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__unitVo = t.unitVo;
      this.__resourceVo = t.resourceVo;
      this.__unitctBoxNode.style.minHeight = 0.6 * this.__unitctBoxNode.scrollWidth - 40 + 'px';
      this.__unitctBoxNode.style.maxHeight = 0.8 * this.__unitctBoxNode.scrollWidth - 40 + 'px';
      this.__unitctBoxNode.innerHTML = this.__resourceVo.htmlContent || '';
      s._$renderRich(this.__unitctBoxNode);
      if (!e.isPreview) {
        var n = {
          userId: a._$getWebUser().id,
          courseId: e.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          contentId: this.__unitVo.contentId,
        };
        a._$trackEvent('richTextUnit', 'view', a._$convertToJSONHex(n));
        a._$log2Study('richTextUnit', 'view', n);
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: !0,
          contentType: 4,
        });
      }
    };
    c.__destroy = function () {
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ad72e09e8978dc83423b503971b6294c',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
EDU(
  'fb689a88a2915cc7060dce11733a426e',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.ui'),
      d,
      l =
        '<div class="m-basepool f-cb">\t\t\t\t\t<div class="j-list">\t\t\t\t\t\t<div class="m-data-lists f-cb f-pr j-data-list"></div>\t\t\t\t\t\t<div class="u-pager f-pr j-data-pager"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="j-none empty" style="display:none"><span class="f-f0 f-fc9 j-none-txt f-ib"></span></div>\t\t\t    </div>';
    var _ = i._$pushCSSText(
      '.#<uispace> .item-highlight{background:#E0F2E2;}\t\t\t.#<uispace> .m-data-lists{position:relative;z-index:100;}\t\t\t.#<uispace> .u-pager{position:relative;z-index:99;}',
    );
    s._$$BasePool = NEJ.C();
    d = s._$$BasePool._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_css = _;
      this.__seed_html = i._$addNodeTemplate(l);
    };
    d.__destroy = function () {
      this.__destroyUIPools();
      this.__supDestroy();
    };
    d.__destroyUIPools = function () {
      if (this.__uiPools) {
        for (var e in this.__uiPools)
          if (this.__uiPools.hasOwnProperty(e)) {
            var t = this.__uiPools[e];
            this.__handleFirstLast(e, 0);
            t = this.__itemDestroy(t);
          }
        this.__uiPools = {};
      }
    };
    d.__genUIPools = function () {
      this.__uiPools = {};
      if (this.__dataMaps && this.__dataMaps.list) {
        var e = this.__dataMaps.list;
        for (var t = 0; t < e.length; t++) this._$genUIItem(e[t]);
      } else this.__innerFirstLast();
    };
    d._$getCurList = function () {
      if (this.__dataMaps && this.__dataMaps.list) return this.__dataMaps.list;
      else return null;
    };
    d._$genUIItem = function (e, t) {
      var n = this.__data_list_box;
      if (!this.__uiPools[e.id]) {
        if (t) this.__itemZIndex = (this.__idArr || []).length + 101;
        var i = this.__itemGen(e);
        i._$addEvent('onDelSubItem', this.__itemDelCb._$bind(this));
        if (i) {
          this.__uiPools[e.id] = i;
          var o = n.firstChild;
          if (o && t) {
            i.__parent = n;
            n.insertBefore(i._$getBody(), o);
            this.__handleFirstLast(e.id, 1);
          } else {
            i._$appendTo(n);
            this.__handleFirstLast(e.id, 2);
          }
        }
        return i;
      } else this.__itemUpdated(this.__uiPools[e.id], e);
    };
    d.__itemUpdated = function (e, t) {
      if (this.__dataMaps && this.__dataMaps.list && t) {
        var n = this.__dataMaps.list;
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          if (t.id == o.id) {
            n.splice(i, 1);
            n.splice(i, 0, t);
            break;
          }
        }
      }
    };
    d.__itemDestroy = n;
    d.__itemGen = n;
    d.__itemDelCb = function (e) {
      var t = e.id;
      this.__handleFirstLast(t, 0);
      this.__uiPools[t] = null;
      delete this.__uiPools[t];
      this._$dispatchEvent('onDelItem');
      if (!this._$hasData()) this.__poolToggle(!0);
    };
    d.__itemEditCb = function (e) {
      this._$dispatchEvent('onEditItem', e);
    };
    d.__handleFirstLast = function (e, t) {
      this.__idArr = this.__idArr || [];
      e = '' + e;
      switch (t) {
        case 0:
          var n = a._$indexOf(this.__idArr, e);
          if (n >= 0) this.__idArr.splice(n, 1);
          break;
        case 1:
          this.__idArr.splice(0, 0, e);
          break;
        case 2:
          this.__idArr.push(e);
      }
      this.__innerFirstLast();
    };
    d._$hasData = function () {
      this.__idArr = this.__idArr || [];
      return this.__idArr.length >= 1;
    };
    d.__innerFirstLast = function () {
      if (this.__firstItem) {
        i._$delClassName(this.__firstItem._$getBody(), 'first');
        this.__firstItem = null;
      }
      if (this.__lastItem) {
        i._$delClassName(this.__lastItem._$getBody(), 'last');
        this.__lastItem = null;
      }
      if (this._$hasData()) {
        var e = this.__uiPools[this.__idArr[0]];
        var t = this.__uiPools[this.__idArr[this.__idArr.length - 1]];
        i._$addClassName(e._$getBody(), 'first');
        i._$addClassName(t._$getBody(), 'last');
        this.__firstItem = e;
        this.__lastItem = t;
        this.__poolToggle(!1);
      } else r._$hiddenNode(this.__listNode);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__data_list_box = i._$getByClassName(this.__body, 'j-data-list')[0];
      this.__data_pager_box = i._$getByClassName(this.__body, 'j-data-pager')[0];
      this.__listNode = i._$getByClassName(this.__body, 'j-list')[0];
      this.__noneNode = i._$getByClassName(this.__body, 'j-none')[0];
      this.__noneTxt = i._$getByClassName(this.__body, 'j-none-txt')[0];
      if (this.__showPager) {
        r._$showNode(this.__data_pager_box);
        this.__curIndex = 1;
        var e = (window.moocConfig || {}).lang;
        this.__pager = c._$$Pager._$allocate({
          parent: this.__data_pager_box,
          onchange: this.__onPageChange._$bind(this),
          index: 1,
          total: 1,
          label: {
            prev: e.KEY_NEJ_COMPONENT_PAGE_PREV || '上一页',
            next: e.KEY_NEJ_COMPONENT_PAGE_NEXT || '下一页',
          },
        });
      } else r._$hiddenNode(this.__data_pager_box);
    };
    d.__onPageChange = n;
    d.__cbOnRead = function (e) {
      if (e && e.list && e.list.length > 0) {
        this.__poolToggle(!1);
        this.__itemZIndex = (e && e.list ? e.list.length : 0) + 100;
        this.__dataMaps = e;
        this.__updatePageInfo(this.__dataMaps);
        this.__destroyUIPools();
        this.__genUIPools();
      } else this.__poolToggle(!0);
    };
    d.__poolToggle = function (e) {
      if (e) {
        r._$hiddenNode(this.__listNode);
        r._$showNode(this.__noneNode);
        if (!this.__noneTxt.innerText) r._$hiddenNode(this.__noneNode);
      } else {
        r._$hiddenNode(this.__noneNode);
        r._$showNode(this.__listNode);
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__uiPools = {};
      if (e.noneTxt) this.__noneTxt.innerText = e.noneTxt;
      if (this.__data_pager_box) r._$hiddenNode(this.__data_pager_box);
      if (e.dataMaps) this.__cbOnRead(e.dataMaps);
      else if (!e.notGetData) this._$getPageData(1);
    };
    d._$getItemUI = function (e) {
      if (!e || !this.__uiPools[e]) return null;
      else return this.__uiPools[e];
    };
    d._$getPageData = function (e) {
      if (this.__showPager) {
        this.__curIndex = -1;
        this.__pager._$updatePage(e, e);
      }
    };
    d.__updatePageInfo = function (e) {
      if (e) {
        var t = 1;
        var n = 1;
        if (e.totlePageCount && e.totlePageCount > 0) t = e.totlePageCount;
        if (e.currentPageNo && e.currentPageNo > 0) n = e.currentPageNo;
        this.__curIndex = n;
        if (this.__data_pager_box)
          if (t > 1 && this.__showPager) {
            r._$showNode(this.__data_pager_box);
            this.__pager._$updatePage(n, t);
          } else r._$hiddenNode(this.__data_pager_box);
      }
    };
    d._$scrollToItemById = function (t, n) {
      if (t && this.__uiPools[t]) {
        var o = this.__uiPools[t]._$getBody();
        var a = i._$offset(o);
        n = n ? n : 0;
        window.scrollTo(a.x, a.y - n);
        var s = 0;
        var r = e.setInterval(function () {
          if (i._$hasClassName(o, 'item-highlight')) i._$delClassName(o, 'item-highlight');
          else i._$addClassName(o, 'item-highlight');
          s += 300;
          if (s > 1e3) {
            e.clearInterval(r);
            i._$delClassName(o, 'item-highlight');
          }
        }, 300);
      }
    };
  },
  '966ab075c73a2b79f28794a2ff87c1bc',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
  '966ab075c73a2b79f28794a2ff87c1bc',
);
EDU(
  'a328147ec582fd1a85c9f0beb695bb31',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d,
      l;
    r._$$Quiz_Question_Pool = NEJ.C();
    d = r._$$Quiz_Question_Pool._$extend(s._$$BasePool, !0);
    l = r._$$Quiz_Question_Pool._$supro;
    d.__initNode = function () {
      this.__showPager = !1;
      this.__supInitNode();
    };
    d._$showPool = function () {
      r._$showNode(this.__body);
    };
    d._$hidePool = function () {
      r._$hiddenNode(this.__body);
    };
    d.__changeQuestionMapData = function (e) {
      var t = null,
        n = e.objectiveQList;
      t = { totlePageCount: 1, currentPageNo: 1, list: n };
      this.__idsArr = [];
      c._$forEach(
        n,
        function (e) {
          this.__idsArr.push(e.id);
        }._$bind(this),
      );
      return t;
    };
    d.__itemGen = function (e) {
      var t = c._$indexOf(this.__idsArr, e.id);
      var n = r._$$QuestionItem
        ._$allocate({
          parent: this.__body,
          recordDto: this.__recordDtos['_' + e.id],
          mode: this.__mode,
          showAnalysis: this.__showAnalysis,
          position: t,
          noScore: this.__noScore,
          onSelect: function (e) {
            this._$dispatchEvent('onSelect', e);
          }._$bind(this),
        })
        ._$getItem();
      return n;
    };
    d.__itemDestroy = function (e) {
      if (e) e = r._$$QuestionItem._$recycle(e);
      return e;
    };
    d.__reset = function (e) {
      if (e.data) e.dataMaps = this.__changeQuestionMapData(e.data);
      this.__showAnalysis = e.data.showAnalysis;
      this.__mode = e.mode || 0;
      this.__recordDtos = e.recordDtos;
      this.__noScore = e.noScore || !1;
      this.__supReset(e);
    };
    d._$getAnswerDtos = function () {
      var e = [];
      for (var t in this.__uiPools)
        if (this.__uiPools.hasOwnProperty(t)) {
          var n = this.__uiPools[t];
          if (n) e.push(n._$getAnswerDto());
        }
      return e;
    };
  },
  'fb689a88a2915cc7060dce11733a426e',
  '69e1c387d1f075b36fd909b21836f8b2',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'e7089a68b20be110ce888f1374a52bfb',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    var l = o._$pushCSSText(
      '        .#<uispace> {border:1px solid #ccc;padding:20px;}        .#<uispace> .unitctBox{border:none;}        .#<uispace> .u-questionItem.first{padding-top:0;}        .#<uispace> .submit{margin-top:20px;}        ',
    );
    r._$$TestUnit = NEJ.C();
    d = r._$$TestUnit._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(
          'jst-lessonTestUI',
          c._$merge(
            { showTest: !(!t.webUser || 0 == t.isEnroll) },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        ),
      );
      this.__seed_css = l;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__unitctBoxNode = o._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__submitBtn = o._$getByClassName(this.__body, 'j-submit')[0];
      this.__replayBtn = o._$getByClassName(this.__body, 'j-replay')[0];
      this.__enrollBtnNode = o._$getByClassName(this.__body, 'j-enroll')[0];
      this.cache = new s._$$COM_Cache_CourseCache();
      this.memberCache = new s._$$COM_Cache_MemberCache();
      this.cache._$addEvent('onStartTermLearn', this.__onStartLearnCourseCb._$bind(this));
      this.memberCache._$addEvent('onCheckEmailStatus', this.__onCheckEmailStatus._$bind(this));
      a._$addEvent(this.__enrollBtnNode, 'click', this.__attendCourse._$bind(this));
      a._$addEvent(this.__submitBtn, 'click', this.__submitAnswer._$bind(this));
      a._$addEvent(this.__replayBtn, 'click', this.__replayAnswer._$bind(this));
      this.__quizCache = new s._$$COM_Cache_QuizCache();
      this.__contentCache = new s._$$COM_Cache_CourseCtCache();
      this.__quizCache._$addEvent('onSubmitAnswers', this.__submitAnswerCb._$bind(this));
    };
    d.__attendCourse = function () {
      if (!r._$isUserLogin()) r._$$LoginDialog._$showLogin({ from: 'learn' });
      else this.memberCache._$checkEmailStatus();
    };
    d.__onCheckEmailStatus = function (e) {
      if (e && e.emailStatus == r.CONST.EMAIL_ACTIVE_INIT)
        r._$$CommonMailDialog._$showDialog({
          start: -1,
          onGotoLearn: function () {
            this.__gotoLearn();
          }._$bind(this),
          enrollnotGotoLearn: function () {
            this.__enrollnotGotoLearn = !0;
            this.__gotoLearn();
          }._$bind(this),
        });
      else this.cache._$StartTermLearn(t.termDto.id, null);
    };
    d.__onStartLearnCourseCb = function () {
      t.isEnroll = !0;
      if (this.__enrollnotGotoLearn) window.location.reload();
      else {
        r.showToastTips({
          content:
            window.moocConfig.lang.KEY_LEARN_HAVE_COURSE +
            t.courseDto.name +
            window.moocConfig.lang.KEY_LEARN_SYMBOL3,
          type: 1,
        });
        if (this.__noticeNode) r._$hiddenNode(this.__noticeNode);
        setTimeout(function () {
          window.location.reload();
        }, 1e3);
      }
    };
    d.__gotoLearn = function () {
      this.cache._$StartTermLearn(t.termDto.id, null);
    };
    d.__submitAnswer = function () {
      if (r._$isUserLogin()) {
        if (0 == t.isEnroll) {
          this.__attendCourseModal = new e({ data: { discusFlag: !1 } });
          return;
        }
        this.__paperVo.answers = this.__questionPool._$getAnswerDtos();
        this.__quizCache._$submitAnswers(this.__paperVo, !!t.isPreview);
      } else r._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__replayAnswer = function () {
      if (r._$isUserLogin()) {
        if (0 == t.isEnroll) {
          this.__attendCourseModal = new e();
          return;
        }
        this.__showAnsOrAnalysis(!0);
      } else r._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__submitAnswerCb = function () {
      this.__showAnsOrAnalysis(!1);
      this.__buildAndTrack('submit');
    };
    d.__buildAndTrack = function (e) {
      if (!t.isPreview) {
        var n = {
          userId: r._$getWebUser().id,
          courseId: t.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          testId: this.__unitVo.contentId,
        };
        r._$trackEvent('testUnit', e, r._$convertToJSONHex(n));
        r._$log2Study('testUnit', e, n);
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: !0,
          contentType: 5,
        });
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      if (t.webUser && 0 != t.isEnroll) {
        this.__unitVo = e.unitVo;
        this.__resourceVo = e.resourceVo;
        if (this.__resourceVo) {
          this.__paperVo = e.resourceVo.paper;
          this.__showAnsOrAnalysis(!(this.__paperVo.answers && this.__paperVo.answers.length));
        }
        this.__buildAndTrack('view');
      }
    };
    d.__showAnsOrAnalysis = function (e) {
      var t = {
        parent: this.__unitctBoxNode,
        data: this.__paperVo,
        recordDtos: r._$convertPaperQustionObj(
          this.__paperVo.objectiveQList,
          this.__paperVo.answers,
        ),
        mode: null,
        noScore: !0,
      };
      if (e) {
        r._$showNode(this.__submitBtn);
        r._$hiddenNode(this.__replayBtn);
        t.mode = 0;
        t.recordDtos = r._$convertPaperQustionObj(this.__paperVo.objectiveQList, null);
      } else {
        r._$hiddenNode(this.__submitBtn);
        r._$showNode(this.__replayBtn);
        t.mode = 1;
      }
      this.__clearQuestionPool();
      this.__questionPool = r._$$Quiz_Question_Pool._$allocate(t);
    };
    d.__clearQuestionPool = function () {
      if (this.__questionPool)
        this.__questionPool = r._$$Quiz_Question_Pool._$recycle(this.__questionPool);
    };
    d.__destroy = function () {
      this.__clearQuestionPool();
      this.__supDestroy();
    };
  },
  '1c23b43dfd9c054559909485b4169fa4',
  '342ad7ae4eea50c3cad860686650a915',
  'a328147ec582fd1a85c9f0beb695bb31',
  '2c666a1ceb412082b906b11b0948dedf',
  'ad72e09e8978dc83423b503971b6294c',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '126d23b5ac6aef1dd83e84a4a70524a3',
  'a936afb5ecab0e9286c3c9d05341571d',
  '891a76809ded82c88f5536f4458ae1ad',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  'e8fb5373e2239362823bb77f6fc2ce39',
  function (e, t) {
    var n = NEJ.O,
      i = NEJ.P('nej.j'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      r = o._$randNumberString(),
      c,
      d = 'ck-forumDetailCache';
    a._$$COM_Cache_ForumDetailCache = NEJ.C();
    c = a._$$COM_Cache_ForumDetailCache._$extend(a._$$COM_Cache);
    c._$getPostDetailById = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'PostBean.getPostDetailById',
        param: [e],
        onload: this.__cbGetPostDetailById._$bind(this),
      });
    };
    c.__cbGetPostDetailById = function (e) {
      this._$dispatchEvent('onGetPostDetailById', e);
    };
    c._$addBrowseCount = function (e) {
      this._$postDWR({
        notShowLoading: !0,
        key: d + r,
        url: 'PostBean.incrPostBrowse',
        param: [e],
        onload: this.__cbAddBrowseCount._$bind(this),
      });
    };
    c.__cbAddBrowseCount = function (e) {
      this._$dispatchEvent('onAddBrowseCount', e);
    };
    c._$clearUnreadCount = function (e, t) {
      this._$postDWR({
        notShowLoading: !0,
        key: d + r,
        url: 'PostBean.clearUnreadCount',
        param: [e, t],
        onload: this.__cbclearUnreadCount._$bind(this),
      });
    };
    c.__cbclearUnreadCount = function (e) {
      this._$dispatchEvent('onclearUnreadCount', e);
    };
    c._$delPost = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.deletePost',
        param: [e],
        onload: this.__cbDelPost._$bind(this),
      });
    };
    c.__cbDelPost = function (e) {
      this._$dispatchEvent('onDelPost', e);
    };
    c._$followPost = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.changePostFollow',
        param: [e, !0],
        onload: this.__onFollowPost._$bind(this),
      });
    };
    c.__onFollowPost = function (t) {
      var n = e.KEY_FORUM_TIP_FOCUS;
      var i = e.KEY_FORUM_TIP_FOCUS_FAIL;
      if (t) {
        s.showToastTips({ content: n, type: 1 });
        this._$dispatchEvent('onFollowPost', t);
      } else s.showToastTips({ content: i, type: 2 });
    };
    c._$cancelFollowPost = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.changePostFollow',
        param: [e, !1],
        onload: this.__onCancelFollowPost._$bind(this),
      });
    };
    c.__onCancelFollowPost = function (t) {
      var n = e.KEY_FORUM_TIP_CANCEL_SUC;
      var i = e.KEY_FORUM_TIP_CANCEL_FAIL;
      if (t) {
        s.showToastTips({ content: n, type: 1 });
        this._$dispatchEvent('onCancelFollowPost', t);
      } else s.showToastTips({ content: i, type: 2 });
    };
    c._$addRely = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.addReply',
        param: [e, t],
        onload: this.__cbAddReply._$bind(this),
      });
    };
    c.__cbAddReply = function (e) {
      this._$dispatchEvent('onAddReply', e);
    };
    c._$delReply = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.deleteReply',
        param: [e, t],
        onload: this.__cbOnDelReply._$bind(this),
      });
    };
    c.__cbOnDelReply = function (e) {
      this._$dispatchEvent('onDelReply', e);
    };
    c._$getReplyList = function (e, t, n, i) {
      var o = 'gmt_create' == t ? ('asc' == n ? 1 : 2) : 3;
      this._$postDWR({
        key: d + r,
        url: 'PostBean.getPaginationReplys',
        param: [e, o, i],
        onload: this.__cbOnGetReplyList._$bind(this),
      });
    };
    c.__cbOnGetReplyList = function (e) {
      this._$dispatchEvent('onGetReplyList', e);
    };
    c._$getCommentList = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'PostBean.getPaginationComments',
        param: [e, t],
        onload: this.__cbOnGetCmtList._$bind(this),
      });
    };
    c.__cbOnGetCmtList = function (e) {
      this._$dispatchEvent('onGetCmtList', e);
    };
    c._$addComment = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.addComment',
        param: [e, t],
        onload: this.__cbAddComment._$bind(this),
      });
    };
    c.__cbAddComment = function (e) {
      this._$dispatchEvent('onAddComment', e);
    };
    c._$delComment = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.deleteComment',
        param: [e, t],
        onload: this.__cbOnDelComment._$bind(this),
      });
    };
    c.__cbOnDelComment = function (e) {
      this._$dispatchEvent('onDelComment', e);
    };
    c._$talkVote = function (e, t, n, i, o) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markVote',
        param: [e, t, n, i, o],
        onload: this.__cbOnVote._$bind(this),
      });
    };
    c.__cbOnVote = function (e) {
      this._$dispatchEvent('onVote', e);
    };
    c._$markTop = function (e, t, n, i) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markTop',
        param: [e, t, n, i ? 1 : 0],
        onload: this.__cbOnMarkTop._$bind(this, i),
      });
    };
    c.__cbOnMarkTop = function (t, n) {
      var i = e.KEY_FORUM_TIP_MARCK_STIIC;
      var o = e.KEY_FORUM_TIP_CANCEL_STIIC;
      if (n) s.showToastTips({ content: t ? i : o, type: 1 });
      this._$dispatchEvent('onMarkTop', n);
    };
    c._$markAgree = function (e, t, n, i) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markAgree',
        param: [e, t, n, i ? 1 : 0],
        onload: this.__cbOnMarkAgree._$bind(this, i),
      });
    };
    c.__cbOnMarkAgree = function (t, n) {
      var i = e.KEY_FORUM_TIP_MARCK_APPROVAL;
      var o = e.KEY_FORUM_TIP_CANCEL_APPROVAL;
      if (n) s.showToastTips({ content: t ? i : o, type: 1 });
      this._$dispatchEvent('onMarkAgree', n);
    };
    c._$markSolve = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markSolve',
        param: [e, t ? 1 : 0],
        onload: this.__cbOnMarkSolve._$bind(this, t),
      });
    };
    c.__cbOnMarkSolve = function (t, n) {
      var i = e.KEY_FORUM_TIP_MARCK_RESOLVE;
      var o = e.KEY_FORUM_TIP_CANCEL_RESOLVE;
      if (n) s.showToastTips({ content: t ? i : o, type: 1 });
      this._$dispatchEvent('onMarkSolve', n);
    };
    c._$checkPosterInfo = function (e, t, n) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.checkPosterInfo',
        param: [e, t, n],
        onload: this.__cbOnCheckPosterInfo._$bind(this),
      });
    };
    c.__cbOnCheckPosterInfo = function (e) {
      this._$dispatchEvent('onCheckPosterInfo', e);
    };
    c._$addPost = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.addPost',
        param: [e, t],
        onload: this.__cbAddPost._$bind(this),
      });
    };
    c.__cbAddPost = function (e) {
      this._$dispatchEvent('onAddPost', e);
    };
    c._$editPost = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.editPost',
        param: [e, t],
        onload: this.__cbEditPost._$bind(this),
      });
    };
    c.__cbEditPost = function (e) {
      this._$dispatchEvent('onEditPost', e);
    };
    c._$setUserBannedForSite = function (e, t, n) {
      this._$postDWR({
        key: d + e,
        url: 'MocForumBean.setUserBannedForSite',
        param: [e, t],
        onload: n || this.__cbsetUserBannedForSite._$bind(this, t),
      });
    };
    c.__cbsetUserBannedForSite = function (e, t) {
      this._$dispatchEvent('onsetUserBannedForSite', t, e);
    };
    c._$setUserBannedForTerm = function (e, t, n, i) {
      this._$postDWR({
        key: d + e,
        url: 'MocForumBean.setUserBannedForTerm',
        param: [e, t, n],
        onload: i || this.__cbsetUserBannedForTerm._$bind(this, n),
      });
    };
    c.__cbsetUserBannedForTerm = function (e, t) {
      this._$dispatchEvent('onsetUserBannedForTerm', t, e);
    };
    c._$checkUserBannedList = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.checkUserBannedList',
        param: [e],
        onload: t || this.__cbcheckUserBannedList._$bind(this),
      });
    };
    c.__cbcheckUserBannedList = function (e) {
      this._$dispatchEvent('oncheckUserBannedList', e);
    };
    c._$copyGoodPost = function (e, t, n) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.copyGoodPost',
        param: [e, t, n],
        onload: this.__cbCopyGoodPost._$bind(this),
      });
    };
    c.__cbCopyGoodPost = function (e) {
      this._$dispatchEvent('onCopyGoodPost', e);
    };
    return a;
  },
  '61a3a3a5a602c34a33d876f6138c6ede',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  'cc26d5920093e9742f0feca3855e8e68',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '8eb6c5c05557c81b78bf50f441e3f28c',
  function (e, t, n, i, o, a, s) {
    var r = a.isEn();
    var c = (window.moocConfig || {}).lang || {};
    var d = NEJ.P('edu.u');
    var l = 'true' === window.isMobilePhone ? o : i;
    s.BanUserUtil = e._$klass();
    var _ = s.BanUserUtil.prototype;
    _.__init = function (e) {
      e = e || {};
      this.__forumCache = new t._$$COM_Cache_ForumDetailCache();
    };
    _.__onBan = function (e, t, n, i) {
      if (i) {
        d.showToastTips({
          type: 1,
          content:
            (n ? '' : c.KEY_LEARN_DELETE) +
            c.KEY_LEARN_NO +
            (i ? c.KEY_LEARN_SUCCESS : c.KEY_LEARN_FAILED),
        });
        if (t) t(e, !!n);
      }
    };
    _.__onGetBanStatus = function (e, t, n, i) {
      var o = i[0];
      var a = i[1];
      if (e)
        if (1 == o) n();
        else t();
      else if (1 == a) n();
      else t();
    };
    _.changeUserBanStatus = function (e, t, n, i, o) {
      var a = this.__onBan._$bind(this, t, o, n);
      var s = function () {
        if (t) this.__forumCache._$setUserBannedForSite(e, c, a);
        else this.__forumCache._$setUserBannedForTerm(e, i, c, a);
      }._$bind(this);
      var c = n ? 1 : 0;
      if (n)
        if (r) s();
        else
          new l({
            data: {
              title: '你确认' + (n ? '将' : '解除') + '该用户禁言吗？',
              content:
                '确认后该用户将' +
                (n ? '无法' : '可以') +
                '在' +
                (t ? '所有' : '课程') +
                '讨论区发表主题、回复、评论',
              cancelButton: !0,
            },
          }).$on(
            'ok',
            function () {
              s();
            }._$bind(this),
          );
      else s();
    };
    _.checkIsBanned = function (e, t, n) {
      var i = !t;
      if (d._$isUserLogin()) {
        t = t || -1;
        e = e || function () {};
        n =
          n ||
          function () {
            var e = r
              ? 'You are forbidden to post any content in the Discussion Forum.'
              : '您已被讨论区管理员禁言，无法发表任何主题、回复、评论、关注或者对帖子进行投票。如有疑问请<a href="//www.icourse163.org/about/contactus.htm#/contactus?type=2">联系我们</a>。';
            l.alert(e, c.KEY_LEARN_PROMPT || '提示');
          };
        this.__forumCache._$checkUserBannedList(
          -1,
          this.__onGetBanStatus._$bind(
            this,
            !0,
            function () {
              if (!i)
                this.__forumCache._$checkUserBannedList(
                  t,
                  this.__onGetBanStatus._$bind(this, !1, e, n),
                );
              else e();
            }._$bind(this),
            n,
          ),
        );
      } else d._$$LoginDialog._$showLogin({ from: 'forum' });
    };
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'cc26d5920093e9742f0feca3855e8e68',
  'd414623f7407e577cd6c05efff08e96f',
  'd02f606099112f5cede2764ed0c329fb',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
);
EDU(
  'ebe2d3cb30fd968a4110767d27b2041a',
  function (e, t, n, i) {
    var o = e.isEn();
    var a = (window.moocConfig || {}).lang || {};
    var s = { EVENTS: { CHANGE_BAN_STATUS: 'changeBanStatus' } };
    i = t.$extends({
      name: 'banUserModal',
      config: function () {
        this.supr();
        n.extend(this.data, { okButton: !1, cancelButton: !1, class: 'ban-user-modal' }, !0);
        n.extend(this.data, {
          username: '',
          email: '',
          isFullSiteBanned: !1,
          isCourseDiscussBanned: !1,
          isEn: o,
        });
      },
      init: function () {
        this.supr();
      },
      computed: {
        $$fullSiteBanBtnText: function () {
          return (
            (this.data.isFullSiteBanned ? (o ? a.KEY_LEARN_DELETE : '解除') : '') +
            (o ? a.KEY_LEARN_NO_POST : '全站禁言')
          );
        },
        $$courseDiscussBanBtnText: function () {
          return (
            (this.data.isCourseDiscussBanned ? (o ? a.KEY_LEARN_DELETE : '解除') : '') +
            (o ? a.KEY_LEARN_NO_POST_COURSES : '课程禁言')
          );
        },
        $$showMail: function () {
          return this.data.email;
        },
        $$title: function () {
          return o ? 'User Nickname' : '用户昵称';
        },
      },
      $$mail: function () {
        if (this.data.email) window.open('mailto:' + this.data.email);
      },
      $$changeBanStatus: function (e) {
        this.$emit(s.EVENTS.CHANGE_BAN_STATUS, {
          isFullSite: e,
          ban: e ? !this.data.isFullSiteBanned : !this.data.isCourseDiscussBanned,
        });
        this.ok();
      },
    });
    i.CONST = s;
    return i;
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'd414623f7407e577cd6c05efff08e96f',
  '217dcfc103efb36d2f192eecc4548797',
);
EDU(
  '4f45e0706d883c527f7222548953087d',
  '<div class="ban-user-modal">\n<div class="ban-user-modal_title">{$$title}</div>\n<div class="ban-user-modal_username">{username}</div>\n<div class="ban-user-modal_buttons">\n{#if $$showMail}\n<div class="ban-user-modal_buttons_email" on-click={this.$$mail()}>\n<i class="u-icon-email"></i>\n<span>{isEn?\'Send Email\':\'发邮件\'}</span>\n</div>\n{/if}\n<div class="ban-user-modal_buttons_left-btn"><ux-button on-click={this.$$changeBanStatus(true)} value={$$fullSiteBanBtnText}></ux-button></div>\n<div class="ban-user-modal_buttons_right-btn"><ux-button on-click={this.$$changeBanStatus(false)} value={$$courseDiscussBanBtnText}></ux-button></div>\n</div>\n</div>',
);
EDU(
  'b5937ade69b006e73bb019e5f83d9513',
  '@charset "UTF-8";\n@font-face {\n  font-family: \'icon-mooc\';\n  src: url("//mc.stu.126.net/res/fonts/icon-mooc.eot?t1548127521177");\n  src: url("//mc.stu.126.net/res/fonts/icon-mooc.eot?t1548127521177#iefix") format("embedded-opentype"), url("//mc.stu.126.net/res/fonts/icon-mooc.ttf?t1548127521177") format("truetype"), url("//mc.stu.126.net/res/fonts/icon-mooc.woff?t1548127521177") format("woff"), url("//mc.stu.126.net/res/fonts/icon-mooc.svg?t1548127521177#icon-mooc") format("svg");\n  font-weight: normal;\n  font-style: normal; }\n\n.f-icon {\n  font-family: \'icon-mooc\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n[class^=\'u-icon-\'],\n[class*=\' u-icon-\'] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \'icon-mooc\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.u-icon-management:before {\n  content: "\\e99e"; }\n\n.u-icon-economics:before {\n  content: "\\e99f"; }\n\n.u-icon-literature:before {\n  content: "\\e9a0"; }\n\n.u-icon-history:before {\n  content: "\\e9a1"; }\n\n.u-icon-postgrad-exam1:before {\n  content: "\\e99c"; }\n\n.u-icon-cet:before {\n  content: "\\e99d"; }\n\n.u-icon-agriculture:before {\n  content: "\\e99b"; }\n\n.u-icon-book-alter:before {\n  content: "\\e99a"; }\n\n.u-icon-audio-wave:before {\n  content: "\\e999"; }\n\n.u-icon-replace:before {\n  content: "\\e997"; }\n\n.u-icon-mobile:before {\n  content: "\\e998"; }\n\n.u-icon-teacher-live:before {\n  content: "\\e900"; }\n\n.u-icon-live-people:before {\n  content: "\\e901";\n  color: #666; }\n\n.u-icon-time:before {\n  content: "\\e600"; }\n\n.u-icon-search:before {\n  content: "\\e601"; }\n\n.u-icon-renren:before {\n  content: "\\e602"; }\n\n.u-icon-weibo:before {\n  content: "\\e603"; }\n\n.u-icon-small-renren:before {\n  content: "\\e604"; }\n\n.u-icon-weibo2:before {\n  content: "\\e605"; }\n\n.u-icon-douban:before {\n  content: "\\e606"; }\n\n.u-icon-douban2:before {\n  content: "\\e607"; }\n\n.u-icon-qzone:before {\n  content: "\\e608"; }\n\n.u-icon-qq-zone:before {\n  content: "\\e609"; }\n\n.u-icon-big-close:before {\n  content: "\\e60a"; }\n\n.u-icon-small-close:before {\n  content: "\\e60b"; }\n\n.u-icon-cert:before {\n  content: "\\e60c"; }\n\n.u-icon-caret-right2:before {\n  content: "\\e60d"; }\n\n.u-icon-doc:before {\n  content: "\\e60e"; }\n\n.u-icon-discuss2:before {\n  content: "\\e60f"; }\n\n.u-icon-video2:before {\n  content: "\\e610"; }\n\n.u-icon-text:before {\n  content: "\\e611"; }\n\n.u-icon-test3:before {\n  content: "\\e612"; }\n\n.u-icon-caret-down2:before {\n  content: "\\e613"; }\n\n.u-icon-return:before {\n  content: "\\e614"; }\n\n.u-icon-info:before {\n  content: "\\e615"; }\n\n.u-icon-wrong:before {\n  content: "\\e616"; }\n\n.u-icon-clock:before {\n  content: "\\e617"; }\n\n.u-icon-correct:before {\n  content: "\\e618"; }\n\n.u-icon-play:before {\n  content: "\\e619"; }\n\n.u-icon-full-screen:before {\n  content: "\\e61a"; }\n\n.u-icon-voice:before {\n  content: "\\e61b"; }\n\n.u-icon-caret-up2:before {\n  content: "\\e61c"; }\n\n.u-icon-mute:before {\n  content: "\\e61d"; }\n\n.u-icon-pause:before {\n  content: "\\e61e"; }\n\n.u-icon-replay:before {\n  content: "\\e61f"; }\n\n.u-icon-close2:before {\n  content: "\\e620"; }\n\n.u-icon-wechat:before {\n  content: "\\e621"; }\n\n.u-icon-setting:before {\n  content: "\\e622"; }\n\n.u-icon-weixin:before {\n  content: "\\e623"; }\n\n.u-icon-icourse:before {\n  content: "\\e624"; }\n\n.u-icon-QQ:before {\n  content: "\\e625"; }\n\n.u-icon-success:before {\n  content: "\\e626"; }\n\n.u-icon-min-screen:before {\n  content: "\\e627"; }\n\n.u-icon-warning2:before {\n  content: "\\e628"; }\n\n.u-icon-calendar:before {\n  content: "\\e800"; }\n\n.u-icon-braille:before {\n  content: "\\e801"; }\n\n.u-icon-help:before {\n  content: "\\e802"; }\n\n.u-icon-trash:before {\n  content: "\\e803"; }\n\n.u-icon-down-circle:before {\n  content: "\\e804"; }\n\n.u-icon-up-circle:before {\n  content: "\\e805"; }\n\n.u-icon-pencil:before {\n  content: "\\e806"; }\n\n.u-icon-share:before {\n  content: "\\e902"; }\n\n.u-icon-caret-left:before {\n  content: "\\e903"; }\n\n.u-icon-arr-right-small:before {\n  content: "\\e904"; }\n\n.u-icon-caret-right:before {\n  content: "\\e905"; }\n\n.u-icon-caret-up:before {\n  content: "\\e906"; }\n\n.u-icon-book:before {\n  content: "\\e907"; }\n\n.u-icon-dialog:before {\n  content: "\\e908"; }\n\n.u-icon-discuss:before {\n  content: "\\e909"; }\n\n.u-icon-document:before {\n  content: "\\e90a"; }\n\n.u-icon-download:before {\n  content: "\\e90b"; }\n\n.u-icon-exam:before {\n  content: "\\e90c"; }\n\n.u-icon-exercise:before {\n  content: "\\e90d"; }\n\n.u-icon-home:before {\n  content: "\\e90e"; }\n\n.u-icon-list:before {\n  content: "\\e90f"; }\n\n.u-icon-live:before {\n  content: "\\e910"; }\n\n.u-icon-message:before {\n  content: "\\e911"; }\n\n.u-icon-notice:before {\n  content: "\\e912"; }\n\n.u-icon-playing:before {\n  content: "\\e913"; }\n\n.u-icon-richText:before {\n  content: "\\e914"; }\n\n.u-icon-score:before {\n  content: "\\e915"; }\n\n.u-icon-unknown:before {\n  content: "\\e916"; }\n\n.u-icon-video:before {\n  content: "\\e917"; }\n\n.u-icon-collect:before {\n  content: "\\e918"; }\n\n.u-icon-star:before {\n  content: "\\e919"; }\n\n.u-icon-im:before {\n  content: "\\e91a"; }\n\n.u-icon-cart:before {\n  content: "\\e91b"; }\n\n.u-icon-mobileview:before {\n  content: "\\e91c"; }\n\n.u-icon-caret-down:before {\n  content: "\\e91d"; }\n\n.u-icon-angle-double-right:before {\n  content: "\\e91e"; }\n\n.u-icon-angle-double-left:before {\n  content: "\\e91f"; }\n\n.u-icon-course-manage:before {\n  content: "\\e920"; }\n\n.u-icon-move:before {\n  content: "\\e921"; }\n\n.u-icon-check:before {\n  content: "\\e922"; }\n\n.u-icon-gear:before {\n  content: "\\e923"; }\n\n.u-icon-close:before {\n  content: "\\e924"; }\n\n.u-icon-back:before {\n  content: "\\e925"; }\n\n.u-icon-renren2:before {\n  content: "\\e926"; }\n\n.u-icon-noword:before {\n  content: "\\e927"; }\n\n.u-icon-sad:before {\n  content: "\\e928"; }\n\n.u-icon-org-tutor:before {\n  content: "\\e929"; }\n\n.u-icon-org-content:before {\n  content: "\\e92a"; }\n\n.u-icon-org-utility:before {\n  content: "\\e92b"; }\n\n.u-icon-error-circle:before {\n  content: "\\e92c"; }\n\n.u-icon-org-content2:before {\n  content: "\\e92d"; }\n\n.u-icon-org-test:before {\n  content: "\\e92e"; }\n\n.u-icon-thin-caret-up:before {\n  content: "\\e92f"; }\n\n.u-icon-success-circle:before {\n  content: "\\e930"; }\n\n.u-icon-thin-caret-down:before {\n  content: "\\e931"; }\n\n.u-icon-delete:before {\n  content: "\\e932"; }\n\n.u-icon-edit:before {\n  content: "\\e933"; }\n\n.u-icon-test2:before {\n  content: "\\e934"; }\n\n.u-icon-hand-up:before {\n  content: "\\e935"; }\n\n.u-icon-hand-down:before {\n  content: "\\e936"; }\n\n.u-icon-order:before {\n  content: "\\e937"; }\n\n.u-icon-cash:before {\n  content: "\\e938"; }\n\n.u-icon-exchange:before {\n  content: "\\e939"; }\n\n.u-icon-data:before {\n  content: "\\e93a"; }\n\n.u-icon-tag:before {\n  content: "\\e93b"; }\n\n.u-icon-plus:before {\n  content: "\\e93c"; }\n\n.u-icon-minus:before {\n  content: "\\e93d"; }\n\n.u-icon-qiyemail:before {\n  content: "\\e93e"; }\n\n.u-icon-netease:before {\n  content: "\\e93f"; }\n\n.u-icon-arrange:before {\n  content: "\\e940"; }\n\n.u-icon-smile:before {\n  content: "\\e941"; }\n\n.u-icon-empty:before {\n  content: "\\e942"; }\n\n.u-icon-warning:before {\n  content: "\\e943"; }\n\n.u-icon-empty-criterial:before {\n  content: "\\e944"; }\n\n.u-icon-front:before {\n  content: "\\e945"; }\n\n.u-icon-add-big:before {\n  content: "\\e946"; }\n\n.u-icon-chat-circle:before {\n  content: "\\e947"; }\n\n.u-icon-course-discuss:before {\n  content: "\\e948"; }\n\n.u-icon-course-content:before {\n  content: "\\e949"; }\n\n.u-icon-test:before {\n  content: "\\e94a"; }\n\n.u-icon-minus-big:before {\n  content: "\\e94b"; }\n\n.u-icon-reply2:before {\n  content: "\\e94c"; }\n\n.u-icon-continue:before {\n  content: "\\e94d"; }\n\n.u-icon-elite:before {\n  content: "\\e94e"; }\n\n.u-icon-check-slim:before {\n  content: "\\e94f"; }\n\n.u-icon-surprise:before {\n  content: "\\e950"; }\n\n.u-icon-qq:before {\n  content: "\\e951"; }\n\n.u-icon-neteaseEmail:before {\n  content: "\\e952"; }\n\n.u-icon-neatease:before {\n  content: "\\e953"; }\n\n.u-icon-icourse2:before {\n  content: "\\e954"; }\n\n.u-icon-caret-left2:before {\n  content: "\\e955"; }\n\n.u-icon-stu:before {\n  content: "\\e956"; }\n\n.u-icon-teacher:before {\n  content: "\\e957"; }\n\n.u-icon-admin:before {\n  content: "\\e958"; }\n\n.u-icon-service:before {\n  content: "\\e959"; }\n\n.u-icon-more:before {\n  content: "\\e95a"; }\n\n.u-icon-normal-close:before {\n  content: "\\e95b"; }\n\n.u-icon-post:before {\n  content: "\\e95c"; }\n\n.u-icon-reply:before {\n  content: "\\e95d"; }\n\n.u-icon-vote:before {\n  content: "\\e95e"; }\n\n.u-icon-person:before {\n  content: "\\e95f"; }\n\n.u-icon-clock2:before {\n  content: "\\e960"; }\n\n.u-icon-presenter:before {\n  content: "\\e961"; }\n\n.u-icon-all:before {\n  content: "\\e962"; }\n\n.u-icon-art:before {\n  content: "\\e963"; }\n\n.u-icon-biomedicine:before {\n  content: "\\e964"; }\n\n.u-icon-computer:before {\n  content: "\\e965"; }\n\n.u-icon-eco-management:before {\n  content: "\\e966"; }\n\n.u-icon-engineering:before {\n  content: "\\e967"; }\n\n.u-icon-foreign-language:before {\n  content: "\\e968"; }\n\n.u-icon-law:before {\n  content: "\\e969"; }\n\n.u-icon-literary-history:before {\n  content: "\\e96a"; }\n\n.u-icon-more2:before {\n  content: "\\e96b"; }\n\n.u-icon-philosophy:before {\n  content: "\\e96c"; }\n\n.u-icon-psychology:before {\n  content: "\\e96d"; }\n\n.u-icon-science:before {\n  content: "\\e96e"; }\n\n.u-icon-teaching-method:before {\n  content: "\\e96f"; }\n\n.u-icon-all-m:before {\n  content: "\\e970"; }\n\n.u-icon-art-m:before {\n  content: "\\e971"; }\n\n.u-icon-biomedicine-m:before {\n  content: "\\e972"; }\n\n.u-icon-computer-m:before {\n  content: "\\e973"; }\n\n.u-icon-eco-management-m:before {\n  content: "\\e974"; }\n\n.u-icon-engineering-m:before {\n  content: "\\e975"; }\n\n.u-icon-foreign-language-m:before {\n  content: "\\e976"; }\n\n.u-icon-law-m:before {\n  content: "\\e977"; }\n\n.u-icon-literary-history-m:before {\n  content: "\\e978"; }\n\n.u-icon-philosophy-m:before {\n  content: "\\e979"; }\n\n.u-icon-psychology-m:before {\n  content: "\\e97a"; }\n\n.u-icon-science-m:before {\n  content: "\\e97b"; }\n\n.u-icon-teaching-method-m:before {\n  content: "\\e97c"; }\n\n.u-icon-circle-caret-right:before {\n  content: "\\e97d"; }\n\n.u-icon-circle-caret-left:before {\n  content: "\\e97e"; }\n\n.u-icon-played:before {\n  content: "\\e97f"; }\n\n.u-icon-gotop:before {\n  content: "\\e980"; }\n\n.u-icon-leave-message:before {\n  content: "\\e981"; }\n\n.u-icon-mobile-phone:before {\n  content: "\\e982"; }\n\n.u-icon-search2:before {\n  content: "\\e983"; }\n\n.u-icon-moreArrow:before {\n  content: "\\e984"; }\n\n.u-icon-clock-icon:before {\n  content: "\\e985"; }\n\n.u-icon-message-icon:before {\n  content: "\\e986"; }\n\n.u-icon-like-icon:before {\n  content: "\\e987"; }\n\n.u-icon-icon-live2:before {\n  content: "\\e988"; }\n\n.u-icon-dots-more:before {\n  content: "\\e989"; }\n\n.u-icon-inquiry:before {\n  content: "\\e98a"; }\n\n.u-icon-plus-thin:before {\n  content: "\\e98b"; }\n\n.u-icon-arrow-left-thin:before {\n  content: "\\e98c"; }\n\n.u-icon-arrow-right-thin:before {\n  content: "\\e98d"; }\n\n.u-icon-postgrad-exam:before {\n  content: "\\e98e"; }\n\n.u-icon-email:before {\n  content: "\\e98f"; }\n\n.u-icon-stacks:before {\n  content: "\\e990"; }\n\n.u-icon-questioning:before {\n  content: "\\e991"; }\n\n.u-icon-bookmark:before {\n  content: "\\e992"; }\n\n.u-icon-categories:before {\n  content: "\\e993"; }\n\n.u-icon-scholar:before {\n  content: "\\e994"; }\n\n.u-icon-cert2:before {\n  content: "\\e995"; }\n\n.u-icon-play-hollow:before {\n  content: "\\e996"; }\n\n/*res-base 中的样式*/\n/* @import \'res-base/scss/_icons\'; */\n/*@font-face {\n    font-family: \'ux-icon-edu\';\n    src: url(\'//mc.stu.126.net/res/res-base/fonts/ux-icon-edu.eot?#iefix\');\n    src: url(\'//mc.stu.126.net/res/res-base/fonts/ux-icon-edu.eot?#iefix\')\n            format(\'embedded-opentype\'),\n        url(\'//mc.stu.126.net/res/res-base/fonts/ux-icon-edu.ttf?86ac34de807ea7ceb401c8ef7b43b120\') format(\'truetype\'),\n        url(\'//mc.stu.126.net/res/res-base/fonts/ux-icon-edu.woff?b1e61cb43271a8e2facda77a6dc5af8e\') format(\'woff\'),\n        url(\'//mc.stu.126.net/res/res-base/fonts/ux-icon-edu.svg?b894520997224d4a52cd1af3f1827d5c\') format(\'svg\');\n    font-weight: normal;\n    font-style: normal;\n}*/\n/* 非衬线字体 */\n.f-f0, .ban-user-modal {\n  font-family: "Microsoft YaHei", \\5fae\\8f6f\\96c5\\9ed1, "Helvetica", "sans-serif"; }\n\n/* 衬线字体 */\n.f-f1 {\n  font-family: "Arial", "Hiragino Sans GB", "SimSun", \\5b8b\\4f53, "Georgia", "serif"; }\n\n/* 字体颜色 */\n.f-fc0 {\n  color: #000; }\n\n.f-fc3 {\n  color: #333; }\n\n.f-fc6 {\n  color: #666; }\n\n.f-fc9 {\n  color: #999; }\n\n.f-fcf {\n  color: #fff; }\n\n.f-fcc {\n  color: #ccc; }\n\n.f-fcred {\n  color: #FF0202; }\n\n.f-fcgreen {\n  color: #00CC7E; }\n\n.f-fcorange {\n  color: #FF7A3E; }\n\n/* a链接颜色，非绿色hover变绿，绿色的hover下下划线 */\na.f-fcgreen {\n  color: #00CC7E; }\n\na:hover {\n  color: #00CC7E;\n  text-decoration: none;\n  cursor: pointer; }\n\na.f-fcgreen:hover {\n  color: #00AD4D;\n  text-decoration: none; }\n\na.f-fc0:hover,\na:hover .f-fc0,\na.f-fc3:hover,\na:hover .f-fc3,\na.f-fc6:hover,\na:hover .f-fc6,\na.f-fc9:hover,\na:hover .f-fc9,\na.f-fcf:hover,\na:hover .f-fcf {\n  color: #00AD4D;\n  text-decoration: none; }\n\n/* 字体大小 */\n.f-fs0 {\n  font-size: 12px; }\n\n.f-fs13 {\n  font-size: 13px;\n  line-height: 20px; }\n\n.f-fs14 {\n  font-size: 14px;\n  line-height: 22px; }\n\n.f-fs15 {\n  font-size: 15px;\n  line-height: 25px; }\n\n.f-fs16 {\n  font-size: 16px;\n  line-height: 28px; }\n\n.f-fs18 {\n  font-size: 18px;\n  line-height: 30px; }\n\n/* 修饰 */\n.f-fwb {\n  font-weight: bold; }\n\n.ban-user-modal {\n  text-align: center; }\n  .ban-user-modal .ux-modal_bd {\n    padding-bottom: 0;\n    padding-left: 30px;\n    padding-right: 30px; }\n  .ban-user-modal .ux-modal_ft {\n    margin-bottom: 30px; }\n  .ban-user-modal_title {\n    color: #666666;\n    font-size: 14px; }\n  .ban-user-modal_username {\n    font-size: 18px;\n    padding: 11px 0 29px; }\n  .ban-user-modal_buttons {\n    text-align: left; }\n    .ban-user-modal_buttons_email {\n      cursor: pointer;\n      color: #00CC7E;\n      font-size: 14px; }\n    .ban-user-modal_buttons .ux-btn {\n      border: 1px solid #00CC7E;\n      min-width: 96px;\n      border-radius: 2px; }\n    .ban-user-modal_buttons_email, .ban-user-modal_buttons_left-btn, .ban-user-modal_buttons_right-btn {\n      display: inline-block;\n      vertical-align: middle; }\n    .ban-user-modal_buttons_left-btn {\n      margin-left: 107px; }\n      .ban-user-modal_buttons_left-btn .ux-btn {\n        background-color: white;\n        color: #00CC7E; }\n',
);
EDU(
  '57e9f440d9661b56030650b673056e36',
  function (e, t, n, i, o, a) {
    a = e.$extends({
      name: 'banUserModal',
      css: o,
      config: function () {
        this.supr();
        n.extend(this.data, { contentTemplate: t }, !0);
      },
      init: function () {
        this.supr();
      },
    });
    a.CONST = e.CONST;
    return a;
  },
  'ebe2d3cb30fd968a4110767d27b2041a',
  '4f45e0706d883c527f7222548953087d',
  '217dcfc103efb36d2f192eecc4548797',
  'f85d7120c48724ce3338aa4501f72ed5',
  'b5937ade69b006e73bb019e5f83d9513',
);
EDU(
  '391bade1f824c8724e734dc7a3557f36',
  function (e, t, n) {
    var i = window,
      o = NEJ.O,
      a = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('edu.d'),
      l = NEJ.P('nej.v'),
      _;
    var u = (window.moocConfig || {}).lang || {};
    var f = e.isEn();
    var h = s._$pushCSSText(
      '        .#<uispace> .anonyInfo{color:#999;}        .#<uispace> .userInfo .type{margin:0 5px;padding:0 5px;display:inline-block;line-height:18px;color:#fff;text-align:center;}        .#<uispace> .userInfo .type.lector{background-color:#6CB4FB;}        .#<uispace> .userInfo .type.manager{background-color:#9BCE00;}        .#<uispace> .userInfo .type.assist{background-color:#6CB4FB;}        ',
    );
    var p = s._$addNodeTemplate(
      '<span>    \t\t<span class="anonyInfo j-anonyInfo">' +
        u.KEY_LEARN_ANONYMOUS +
        '</span>    \t\t<span class="userInfo j-userInfo"></span>       </span>',
    );
    c._$$UserItem = NEJ.C();
    _ = c._$$UserItem._$extend(c._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = p;
      this.__seed_css = h;
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__anonyInfoNode = s._$getByClassName(this.__body, 'j-anonyInfo')[0];
      this.__userInfoNode = s._$getByClassName(this.__body, 'j-userInfo')[0];
      this.__banUserUtil = new t.BanUserUtil();
    };
    _._$showUserMailInfo = function (e, t) {
      this.__handleUserInfo(!1);
      var i = e[1],
        o = !!parseInt(e[2], 10),
        a = !!parseInt(e[3], 10);
      this.__termId = t;
      new n({
        data: {
          username: this.__userDto.nickName,
          email: i,
          isFullSiteBanned: o,
          isCourseDiscussBanned: a,
        },
      }).$on(
        n.CONST.EVENTS.CHANGE_BAN_STATUS,
        function (e) {
          this.__banUserUtil.changeUserBanStatus(this.__userDto.id, e.isFullSite, e.ban, t);
        }._$bind(this),
      );
    };
    _.__handleUserInfo = function (e) {
      if (e) {
        c._$showNode(this.__anonyInfoNode);
        c._$hiddenNode(this.__userInfoNode);
      } else {
        c._$hiddenNode(this.__anonyInfoNode);
        c._$showNode(this.__userInfoNode);
        var t = f
          ? 'javascript:;'
          : '#' + c.umi('learnForumPersonal') + '?uid=' + this.__userDto.id;
        var n,
          o = this.__userDto.nickName || '',
          a = c._$getWebUser(),
          s = [];
        r._$forEach(i.courseDto.lectorPanels, function (e, t) {
          s[t] = e.memberId;
        });
        if (
          this.__userDto.mocAuthenticatedMemberDto &&
          (c._$hasOneMemberRole([c.CONST.ROLE_SCHOOLSUPER_ADMIN, c.CONST.ROLE_OUT_COURSE_EDITOR]) ||
            c._$arrContains(s, a.id) ||
            c._$isOrdinaryEditorForCourse(i.courseDto.ordinaryEditors))
        )
          o = c._$getUserShowInfo(this.__userDto.mocAuthenticatedMemberDto);
        if (this.__locked)
          n = '<span class="f-fc6" title="' + o + '">' + c._$genNewStrByLength(o, 12) + '</span>';
        else
          n =
            '<a class="f-fcgreen" href="' +
            t +
            '" title="' +
            o +
            '">' +
            c._$genNewStrByLength(o, 12) +
            '</a>';
        if (c._$arrContains(this.__userDto.roles, c.CONST.ROLE_FORUM_MANAGER))
          n += "<span class='type manager'>" + u.KEY_LEARN_ADMINISTRATOR + '</span>';
        else {
          var d = c._$getCourseLecOrAssists(i.courseDto.lectorPanels, this.__userDto.id);
          if (null != d)
            switch (d.lectorType) {
              case c.CONST.REL_TYPE_TERM_CHIEF_LECTOR:
              case c.CONST.REL_TYPE_TERM_LECTOR:
                n =
                  '<a class="f-fcgreen" href="' +
                  t +
                  '"title="' +
                  (this.__userDto.realName || this.__userDto.nickName) +
                  '">' +
                  c._$genNewStrByLength(this.__userDto.realName || this.__userDto.nickName, 12) +
                  "</a><span class='type lector'>" +
                  u.KEY_LEARN_TEACHER +
                  '</span>';
                break;
              case c.CONST.REL_TYPE_TERM_ASSIST:
                n += "<span class='type assist'>" + u.KEY_LEARN_TEACHING_ASSISTANT + '</span>';
            }
        }
        this.__userInfoNode.innerHTML = n;
      }
    };
    _.__destroy = function () {
      this.__userInfoNode.title = '';
      this.__supDestroy();
    };
    _.__reset = function (e) {
      this.__supReset(e);
      this.__userDto = e.userDto;
      this.__locker = e.locked || c._$isForumJustShow() == c.CONST.FORUM_FORBID_ELITE || !1;
      this.__handleUserInfo(!!e.anonymous);
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '8eb6c5c05557c81b78bf50f441e3f28c',
  '57e9f440d9661b56030650b673056e36',
  '342ad7ae4eea50c3cad860686650a915',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  'bf8d09e46d2369efd6e41b29fe211330',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '865336bdee3def2e90e635383cc1e284',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.P('edu.u');
    n._$formatNum = function (e) {
      e = parseInt(e || 0);
      var t = null;
      var n = '';
      var i = e >= 0 ? '' : '-';
      e = Math.abs(e);
      if (e < 1e3) n = '' + e;
      else if (e < 1e6) {
        t = Math.floor((e % 1e3) / 100);
        e = Math.floor(e / 1e3);
        n = e >= 10 ? e + 'k' : t > 0 ? e + '.' + t + 'k' : e + 'k';
      } else {
        e /= 1e3;
        t = Math.floor((e % 1e3) / 100);
        e = Math.floor(e / 1e3);
        n = e >= 10 ? e + 'm' : t > 0 ? e + '.' + t + 'm' : e + 'm';
      }
      return i + n;
    };
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
EDU(
  '7c0f38757da06c54ce1062cbacb9b5c1',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.u'),
      d;
    var l = a._$pushCSSText(
      '        .#<uispace> div{cursor:pointer;width:15px;height:15px;background: url(' +
        n.imageUrlMap.forum_icon_sprite +
        ') no-repeat -4999px -4999px;}        .#<uispace> .num{color:#666;line-height:15px;max-width:45px;margin:0 3px;}        .#<uispace> .up{ background-position:2px -22px;}        .#<uispace> .up.hvr:hover{ background-position:-15px -22px;}        .#<uispace> .up.voted{ background-position:-33px -22px;}        .#<uispace> .down{ background-position:2px -44px;}        .#<uispace> .down.hvr:hover{ background-position:-15px -44px;}        .#<uispace> .down.voted{ background-position:-33px -44px;}        ',
    );
    var _ = a._$addNodeTemplate(
      '<div class="f-cb">    \t\t<div class="up f-fl j-up"></div>    \t\t<p class="num f-fl f-thide j-num"></p>    \t\t<div class="down f-fl j-down"></div>       </div>',
    );
    c._$$VoteItem = NEJ.C();
    d = c._$$VoteItem._$extend(c._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = _;
      this.__seed_css = l;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__upbtn = a._$getByClassName(this.__body, 'j-up')[0];
      this.__numLabel = a._$getByClassName(this.__body, 'j-num')[0];
      this.__downbtn = a._$getByClassName(this.__body, 'j-down')[0];
      s._$addEvent(this.__upbtn, 'click', this.__voteHandle._$bind(this, c.CONST.TALK_VOTE_DIGG));
      s._$addEvent(this.__downbtn, 'click', this.__voteHandle._$bind(this, c.CONST.TALK_VOTE_CAI));
      this.__forumDetailCache = new r._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onVote', this.__onVoteCb._$bind(this));
    };
    d.__voteHandle = function (e, i) {
      if (c._$isUserLogin()) {
        if (0 == n.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        s._$stop(i);
        this.__clickOpinion = e;
        this.__forumDetailCache._$talkVote(
          this.__postId,
          this.__id,
          this.__type,
          this.__clickOpinion,
          this.__dataVo.voteOpinion === this.__clickOpinion ? 1 : 0,
        );
      } else c._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__onVoteCb = function (e) {
      if (null != e) {
        var t = 0;
        var n = this.__clickOpinion;
        if (this.__dataVo.voteOpinion < 0) t = 1;
        else if (this.__clickOpinion != this.__dataVo.voteOpinion) t = 2;
        else {
          n = -1;
          t = -1;
        }
        this.__dataVo.voteOpinion = n;
        if (this.__clickOpinion == c.CONST.TALK_VOTE_DIGG) this.__dataVo.voteCount += t;
        else if (this.__clickOpinion == c.CONST.TALK_VOTE_CAI) this.__dataVo.voteCount -= t;
        this.__onSetState();
        this._$dispatchEvent('onVote', {
          voteOpinion: this.__dataVo.voteOpinion,
          targetId: this.__id,
          targetType: this.__type,
        });
      } else c.showToastTips({ type: 2, content: window.moocConfig.lang.KEY_LEARN_VOTE_FAILED });
    };
    d.__onSetState = function () {
      this.__dataVo.voteCount = this.__dataVo.voteCount || 0;
      this.__numLabel.innerText = c._$formatNum(this.__dataVo.voteCount);
      this.__numLabel.title = this.__dataVo.voteCount;
      a._$delClassName(this.__upbtn, 'voted');
      a._$delClassName(this.__downbtn, 'voted');
      a._$addClassName(this.__upbtn, 'hvr');
      a._$addClassName(this.__downbtn, 'hvr');
      this.__upbtn.title = window.moocConfig.lang.KEY_LEARN_UPVOTE;
      this.__downbtn.title = window.moocConfig.lang.KEY_LEARN_DISLIKE;
      if (this.__dataVo.voteOpinion == c.CONST.TALK_VOTE_DIGG) {
        a._$delClassName(this.__upbtn, 'hvr');
        a._$addClassName(this.__upbtn, 'voted');
        this.__upbtn.title = window.moocConfig.lang.KEY_LEARN_CANCEL_LIKE;
      } else if (this.__dataVo.voteOpinion == c.CONST.TALK_VOTE_CAI) {
        a._$delClassName(this.__downbtn, 'hvr');
        a._$addClassName(this.__downbtn, 'voted');
        this.__downbtn.title = window.moocConfig.lang.KEY_LEARN_CANCEL_DISLIKE;
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__postId = e.postId;
      this.__id = e.id;
      this.__type = e.type;
      this.__dataVo = e.dataVo;
      this.__onSetState();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '1c23b43dfd9c054559909485b4169fa4',
  '342ad7ae4eea50c3cad860686650a915',
  '865336bdee3def2e90e635383cc1e284',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '93828627ddb358ed890cb65967a0c1de',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  'bbd38ff49a9c39da32c8f35626316f21',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '        .#<uispace> .bd{color:#ddd;margin:0 5px;}        .#<uispace> .manBtn span{display:inline-block;vertical-align:middle;height:14px;width:14px;background:url(' +
        e.imageUrlMap.forum_icon_sprite +
        ') no-repeat -55px -45px;}        .#<uispace> .manBtn:hover span{background-position:-72px -45px;}        .u-manList{position:absolute;width:110px;background-color:#fff;border:1px solid #DDD;border-bottom:none;}        .u-manList li{line-height:30px;text-align:center;border-bottom:1px solid #DDD;cursor:pointer;}        .u-manList li:hover a{color:#61A500;}        ',
    );
    var d = i._$addHtmlTemplate(
      '<div class="f-cb">\t\t  \t<div class="f-fl bd">|</div>\t\t  \t<a hidefocus="true" class="f-fl f-fc9 manBtn"><span></span>${lang.KEY_LEARN_MANAGE}</a>       </div>',
    );
    s._$$ManageItem = NEJ.C();
    r = s._$$ManageItem._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate(d, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      o._$addEvent(
        this.__body,
        s._$isIE() ? 'mouseenter' : 'mouseover',
        this.__showHiddenHandle._$bind(this, !0),
      );
      o._$addEvent(
        this.__body,
        s._$isIE() ? 'mouseleave' : 'mouseout',
        this.__showHiddenHandle._$bind(this, !1),
      );
    };
    r.__showHiddenHandle = function (t, n) {
      if (t) {
        if (this.__delayHide) e.clearTimeout(this.__delayHide);
        if (this.__manListNode && document.body.contains(this.__manListNode)) return;
        var o = i._$offset(this.__body);
        this.__manListNode.style.zIndex = 1e3;
        this.__manListNode.style.top = o.y + 18 + 'px';
        this.__manListNode.style.left = o.x - 20 + 'px';
        document.body.appendChild(this.__manListNode);
      } else
        this.__delayHide = e.setTimeout(
          function () {
            if (this.__manListNode && document.body.contains(this.__manListNode))
              document.body.removeChild(this.__manListNode);
          }._$bind(this),
          10,
        );
    };
    r.__destroy = function () {
      if (this.__manListNode && this.__manListNode.parentNode)
        this.__manListNode.parentNode.removeChild(this.__manListNode);
      this.__supDestroy();
    };
    r._$setItemMes = function (e, t) {
      var n = this.__liAlinkChildrenMap[e];
      if (n) n.innerText = t || '';
    };
    r.__reset = function (e) {
      this.__supReset(e);
      var t = "<ul class='u-manList'>";
      a._$forEach(e.showItems, function (e) {
        switch (e) {
          case 'onCheck':
            t +=
              "<li data-eventmes='onCheck'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_POSTER_MANAGEMENT +
              '</a></li>';
            break;
          case 'onResolve':
            t +=
              "<li data-eventmes='onResolve'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_SOLVED +
              '</a></li>';
            break;
          case 'onTop':
            t +=
              "<li data-eventmes='onTop'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_TOP +
              '</a></li>';
            break;
          case 'onAgree':
            t +=
              "<li data-eventmes='onAgree'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_AGREE_AGREE +
              '</a></li>';
            break;
          case 'onDel':
            t +=
              "<li data-eventmes='onDel'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_DELETE_DELETE +
              '</a></li>';
        }
      });
      t += '</ul>';
      this.__manListNode = i._$html2node(t);
      var n = i._$getChildren(this.__manListNode);
      this.__liAlinkChildrenMap = {};
      a._$forEach(
        n,
        function (e) {
          var t = i._$dataset(e, 'eventmes');
          this.__liAlinkChildrenMap[t] = i._$getChildren(e)[0];
          this.__doInitDomEvent([
            [
              e,
              'click',
              function () {
                this._$dispatchEvent(t);
              }._$bind(this),
            ],
          ]);
        }._$bind(this),
      );
      this.__doInitDomEvent([
        [
          this.__manListNode,
          s._$isIE() ? 'mouseenter' : 'mouseover',
          this.__showHiddenHandle._$bind(this, !0),
        ],
        [
          this.__manListNode,
          s._$isIE() ? 'mouseleave' : 'mouseout',
          this.__showHiddenHandle._$bind(this, !1),
        ],
      ]);
      this.__showHiddenHandle(!1);
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'bbb7d6117a4fc9e146e67adf883521d6',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c,
      d = i._$addHtmlTemplate(
        '<div class="m-edititem">\t\t    <div class="editwrap">\t\t        <textarea name="edittxt" class="j-edittxt edittxt"></textarea>\t\t        <label class="j-hint hint" for="edittxt"></label>\t\t    </div>\t\t\t<div class="editopt f-cb">\t            <a hidefocus="true" class="j-edit-btn u-btn u-btn-primary editbtn"><span class="j-btn-text">保存</span></a>\t            <a hidefocus="true" class="j-close-btn f-fc9 cancelbtn">取消</a>\t\t\t</div>\t\t</div>',
      );
    r._$$EditItem = NEJ.C();
    c = r._$$EditItem._$extend(r._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(i._$getHtmlTemplate(d));
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__textLabel = i._$getByClassName(this.__body, 'j-hint')[0];
      this.__textArea = i._$getByClassName(this.__body, 'j-edittxt')[0];
      this.__edit_btn = i._$getByClassName(this.__body, 'j-edit-btn')[0];
      this.__edit_btn_text = i._$getByClassName(this.__body, 'j-btn-text')[0];
      this.__close_btn = i._$getByClassName(this.__body, 'j-close-btn')[0];
      o._$addEvent(this.__textLabel, 'click', this._$focusTextArea._$bind(this));
      o._$addEvent(this.__textArea, 'focus', this.__onTextareaFocus._$bind(this));
      o._$addEvent(this.__textArea, 'blur', this.__onTextareaBlur._$bind(this));
      o._$addEvent(this.__textArea, 'keydown', this.__onTextareaDown._$bind(this));
      o._$addEvent(this.__edit_btn, 'click', this.__editNotesHandle._$bind(this));
      o._$addEvent(this.__close_btn, 'click', this.__closeNotesHandle._$bind(this));
    };
    c._$focusTextArea = function () {
      this.__textArea.focus();
    };
    c.__onTextareaBlur = function (e) {
      o._$stop(e);
      var t = this.__textArea.value;
      if (!t) r._$showNode(this.__textLabel);
      else r._$hiddenNode(this.__textLabel);
      this._$dispatchEvent('onBlurArea');
    };
    c.__onTextareaFocus = function (e) {
      o._$stop(e);
      r._$hiddenNode(this.__textLabel);
      this._$dispatchEvent('onFocusArea');
    };
    c.__onTextareaDown = function (e) {
      if (e.ctrlKey)
        switch (e.keyCode) {
          case 13:
            o._$stop(e);
            this.__editNotesHandle();
        }
    };
    c.__editNotesHandle = function (e) {
      o._$stop(e);
      this._$dispatchEvent('onEditClick');
    };
    c.__closeNotesHandle = function (e) {
      o._$stop(e);
      this._$dispatchEvent('onCloseClick');
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__edit_btn_text.innerText = e.btnText || '保存';
      this.__close_btn.innerText = e.cancelBtnText || '取消';
      this.__textLabel.innerText = e.labelText || '';
      r._$showNode(this.__textLabel);
      var t = e.notShowClose || !1;
      if (!t) r._$showNode(this.__close_btn);
      else r._$hiddenNode(this.__close_btn);
    };
    c._$setInitContent = function (e) {
      e = r._$trim(e || '');
      this.__initValue = e;
      this.__textArea.value = e;
      this.__onTextareaBlur();
    };
    c._$isModified = function () {
      var e = this._$getContent();
      return this.__initValue != e && '' != e;
    };
    c._$getContent = function () {
      var e = r._$trim(this.__textArea.value || '');
      return e;
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '7832f00c56a132c163eeaae343444dd9',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      s,
      r = 'ck-reportCache';
    i._$$COM_Cache_ReportCache = NEJ.C();
    s = i._$$COM_Cache_ReportCache._$extend(i._$$COM_Cache);
    s._$reportPost = function (e, t, n, i, o, s) {
      this._$postDWR({
        key: r + a,
        url: 'ReportBean.reportPostV1',
        param: [e, n, i, o, s],
        onload: this.__cbOnReportCb._$bind(this),
      });
    };
    s._$reportReply = function (e, t, n, i, o) {
      this._$postDWR({
        key: r + a,
        url: 'ReportBean.reportReplyV1',
        param: [e, n, i, o],
        onload: this.__cbOnReportCb._$bind(this),
      });
    };
    s._$reportComment = function (e, t, n, i, o) {
      this._$postDWR({
        key: r + a,
        url: 'ReportBean.reportCommentV1',
        param: [e, n, i, o],
        onload: this.__cbOnReportCb._$bind(this),
      });
    };
    s.__cbOnReportCb = function (e) {
      this._$dispatchEvent('onReportCb', e);
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'c30834300a1390e7ec4f8432fef9123b',
  function (e) {
    var t = e.isEn();
    var n = (window.moocConfig || {}).lang || {};
    var i = window,
      o = NEJ.O,
      a = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('edu.u'),
      l;
    var _ = s._$addNodeTemplate(
      '\t\t\t<div class="m-reportDialog">\t\t\t\t<div class="j-reportedit reportedit"></div>\t\t\t\t<div class="j-feedback feedback"></div>\t\t\t</div>',
    );
    d._$$ReportDialog = NEJ.C();
    l = d._$$ReportDialog._$extend(d._$$Window, !0);
    d._$$ReportDialog._$showDialog = function (e) {
      var t = d._$$ReportDialog._$allocate(e);
      t._$show();
    };
    l.__initXGui = function () {
      this.__seed_html = _;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__reporteditNode = s._$getByClassName(this.__body, 'j-reportedit')[0];
      this.__feedbackNode = s._$getByClassName(this.__body, 'j-feedback')[0];
      this.__reportCache = new c._$$COM_Cache_ReportCache();
      this.__reportCache._$addEvent('onReportCb', this.__onReportCb._$bind(this));
    };
    l.__onReportCb = function (e) {
      if (e) {
        d.showToastTips({ content: '提交成功，感谢你对中国大学MOOC的支持！', type: 1 });
        this._$hide();
      } else this.__feedbackUI._$showWarnTips('提交失败，请重试');
    };
    l.__onEditHandle = function () {
      var e = this.__editUI._$getContent();
      if ('' == e) this.__feedbackUI._$showWarnTips(this.__feedTxt, !0);
      else
        switch (this.__type) {
          case d.CONST.TALK_VOTE_POST:
            this.__reportCache._$reportPost(
              this.__vo.id,
              this.__vo.posterId,
              this.__vo.title,
              this.__vo.content,
              location.href,
              e,
            );
            break;
          case d.CONST.TALK_VOTE_REPLY:
            this.__reportCache._$reportReply(
              this.__vo.id,
              this.__vo.replyerId,
              this.__vo.content,
              location.href,
              e,
            );
            break;
          case d.CONST.TALK_VOTE_COMMENT:
            this.__reportCache._$reportComment(
              this.__vo.id,
              this.__vo.commentorId,
              this.__vo.content,
              location.href,
              e,
            );
        }
    };
    l.__onCloseHandle = function () {
      this._$hide();
    };
    l.__onFocusHandle = function () {
      this.__feedbackUI._$hideFeedback();
    };
    l.__destroy = function () {
      if (this.__feedbackUI) this.__feedbackUI = d._$$FeedBackUI._$recycle(this.__feedbackUI);
      if (this.__editUI) this.__editUI = d._$$EditItem._$recycle(this.__editUI);
      this.__supDestroy();
    };
    l.__reset = function (e) {
      this.__vo = e.vo;
      this.__type = e.type;
      e.title = e.title || '举报不良信息';
      e.clazz = 'u-window-pd';
      var t = e.placeHold || '请填写举报原因';
      this.__feedTxt = e.feedBackTxt || '请填写举报原因';
      this.__supReset(e);
      this.__feedbackUI = d._$$FeedBackUI._$allocate({ parent: this.__feedbackNode });
      this.__feedbackUI._$hideFeedback();
      this.__editUI = d._$$EditItem._$allocate({
        parent: this.__reporteditNode,
        labelText: t,
        btnText: '提交',
      });
      this.__editUI._$setInitContent('');
      this.__editUI._$addEvent('onFocusArea', this.__onFocusHandle._$bind(this));
      this.__editUI._$addEvent('onEditClick', this.__onEditHandle._$bind(this));
      this.__editUI._$addEvent('onCloseClick', this.__onCloseHandle._$bind(this));
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'ddff3fe6a4233d567887a1921f3f1668',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bbb7d6117a4fc9e146e67adf883521d6',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '7832f00c56a132c163eeaae343444dd9',
  'cc26d5920093e9742f0feca3855e8e68',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU(
  'f89bf7955a392302db95e1359fe83de6',
  function (e, t, n, i) {
    var o = (window.moocConfig || {}).lang || {};
    var a = !i.isCh();
    var s = window,
      r = NEJ.F,
      c = NEJ.P('nej.e'),
      d = NEJ.P('nej.v'),
      l = NEJ.P('nej.u'),
      _ = NEJ.P('edu.d'),
      u = NEJ.P('edu.u'),
      f = s.isSpoc,
      h;
    var p = c._$pushCSSText(
      '\t\t.#<uispace>{background-color:#f8f8f8;padding:10px 20px;}            .#<uispace> .title{max-width:68%;word-break:break-word;}            .#<uispace> .content{padding-top:10px;}\t.#<uispace> .infobar{padding:10px 0;border-bottom:1px solid #eee;}            .#<uispace> .infobar .time{padding:0 10px;}            .#<uispace> .optbar{padding-top:10px;}            .#<uispace> .optBox,.#<uispace> .votebox{margin-top:5px;}            .#<uispace> .optBox .divider{color:#ddd;margin:0 5px;}            .#<uispace> .optbar a.u-btn-sm{line-height:18px;}            .#<uispace> .optbar a i{vertical-align:-3px;display:inline-block;width:20px;height:16px;background:url(' +
        s.imageUrlMap.forum_icon_sprite +
        ') no-repeat -4999px -4999px;}            .#<uispace> .optbar .replyBtn i{background-position: -54px 1px;}            .#<uispace> .followBtn{margin-right:10px;}            .#<uispace> .optbar .followBtn.unfollowed i{background-position: -78px 0;}            .#<uispace> .optbar .followBtn.unfollowed .second,.#<uispace> .optbar .followBtn.unfollowed .secHvr{display:none;}            .#<uispace> .optbar .followBtn.followed i{background-position: -53px -24px;}            .#<uispace> .optbar .followBtn.followed .first,.#<uispace> .optbar .followBtn.followed .secHvr{display:none;}            .#<uispace> .optbar .followBtn.followed:hover .second{display:none;}            .#<uispace> .optbar .followBtn.followed:hover .secHvr{display:inline-block;padding-left:8px;}            ',
    );
    var m = c._$addHtmlTemplate(
      '<div>\t\t\t<div class="f-cb"> <h3 class="j-title title f-fl"></h3>\t<a class="f-fr u-btn u-btn-sm u-btn-default j-transBtn" style="display:none">迁移至“过往学期精华贴”</a>\t<div class="f-cb f-fr j-tagBox">\t<div class="u-forumtag u-forumtag1 j-tagTopNode">${lang.KEY_LEARN_TOP}</div>\t<div class="u-forumtag j-tagAgreeNode">${lang.KEY_LEARN_AGREE_AGREE}</div>                <div class="u-forumtag j-tagSolveNode">${lang.KEY_LEARN_SOLVED}</div>                <div class="u-forumtag j-tagTeacherNode">${lang.KEY_LEARN_LECTURER_PARTICIPATION}</div></div></div>\t\t\t<div class="content f-richEditorText j-content"></div><div class="infobar f-cb"><div class="j-infoBox"><div class="f-fl name j-name"></div><div class="f-fl f-fc9 time j-time"></div></div><div class="f-fl f-fc9 j-fromUnitBox">${lang.KEY_LEARN_FROM_DOCUMENTS}“<a class="j-fromUnit f-fcgreen"></a>”</div>\t\t\t</div>\t\t\t<div class="optbar f-cb">            <div class="j-share f-fl"></div><div class="f-cb f-fr optBox j-optBox"><div class="f-fl j-editDivider divider">|</div><a hidefocus="true" class="f-fl f-fc9 editBtn j-editBtn">${lang.KEY_LEARN_EDIT}</a>' +
        (a
          ? ''
          : '<div class="f-fl divider">|</div><a hidefocus="true" class="f-fl f-fc9 editBtn j-reportBtn">${lang.KEY_LEARN_REPORT_REPORT}</a>') +
        '<div class="f-fl j-manBox"></div></div><div class="f-fr votebox j-vote"></div>              <a hidefocus="true" class="replyBtn u-btn u-btn-sm j-replyBtn f-fr"><span><i></i>${lang.KEY_LEARN_REPLY2}</span></a>              <a hidefocus="true" class="followBtn u-btn u-btn-sm j-followBtn f-fr">                <span class="first j-followInner"><i></i>${lang.KEY_LEARN_ATTENTION}</span>                <span class="second j-followInner"><i></i>${lang.KEY_LEARN_FOLLOWED}</span>                <span class="secHvr j-followInner">${lang.KEY_LEARN_UNFOLLOW}</span>             </a>\t\t\t</div>\t\t</div>',
    );
    u._$$PostItem = NEJ.C();
    h = u._$$PostItem._$extend(u._$$UIBase, !0);
    h.__initXGui = function () {
      this.__seed_html = c._$addNodeTemplate(
        c._$getHtmlTemplate(m, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = p;
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = c._$getByClassName(this.__body, 'j-title')[0];
      this.__contentNode = c._$getByClassName(this.__body, 'j-content')[0];
      this.__timeLabel = c._$getByClassName(this.__body, 'j-time')[0];
      this.__nameNode = c._$getByClassName(this.__body, 'j-name')[0];
      this.__voteNode = c._$getByClassName(this.__body, 'j-vote')[0];
      this.__optBox = c._$getByClassName(this.__body, 'j-optBox')[0];
      this.__editBtn = c._$getByClassName(this.__body, 'j-editBtn')[0];
      this.__editDivider = c._$getByClassName(this.__body, 'j-editDivider')[0];
      this.__reportBtn = c._$getByClassName(this.__body, 'j-reportBtn')[0];
      this.__followBtn = c._$getByClassName(this.__body, 'j-followBtn')[0];
      this.__followInners = c._$getByClassName(this.__body, 'j-followInner');
      this.__replyBtn = c._$getByClassName(this.__body, 'j-replyBtn')[0];
      this.__manNode = c._$getByClassName(this.__body, 'j-manBox')[0];
      this.__tranferBtn = c._$getByClassName(this.__body, 'j-transBtn')[0];
      this.__tagBox = c._$getByClassName(this.__body, 'j-tagBox')[0];
      this.__tagTopNode = c._$getByClassName(this.__body, 'j-tagTopNode')[0];
      this.__tagAgreeNode = c._$getByClassName(this.__body, 'j-tagAgreeNode')[0];
      this.__tagSolveNode = c._$getByClassName(this.__body, 'j-tagSolveNode')[0];
      this.__tagTeacherNode = c._$getByClassName(this.__body, 'j-tagTeacherNode')[0];
      this.__infoBox = c._$getByClassName(this.__body, 'j-infoBox')[0];
      this.__fromUnitBox = c._$getByClassName(this.__body, 'j-fromUnitBox')[0];
      this.__fromUnitNode = c._$getByClassName(this.__body, 'j-fromUnit')[0];
      d._$addEvent(this.__editBtn, 'click', this.__onEditHandle._$bind(this));
      d._$addEvent(this.__reportBtn, 'click', this.__onReportHandle._$bind(this));
      d._$addEvent(this.__followBtn, 'click', this.__onFollowHandle._$bind(this));
      d._$addEvent(this.__replyBtn, 'click', this.__onReplyHandle._$bind(this));
      this.__banUserUtil = new e.BanUserUtil();
      this.__shareNode = c._$getByClassName(this.__body, 'j-share')[0];
      this.__newTermId = s.newTermId;
      d._$addEvent(
        this.__tranferBtn,
        'click',
        function () {
          if (!this.__onTransfer) {
            this.__forumDetailCache._$copyGoodPost(
              this.__postVo.termId,
              this.__postVo.id,
              this.__newTermId,
            );
            this.__onTransfer = !0;
          }
        }._$bind(this),
      );
      this.__forumDetailCache = new _._$$COM_Cache_ForumDetailCache();
      this.__commonCache = new _._$$COM_Cache_commonCache();
      this.__forumDetailCache._$addEvent('onDelPost', this.__onDelPostCb._$bind(this));
      this.__forumDetailCache._$addEvent(
        'onFollowPost',
        this._$followStatusHandle._$bind(this, !0),
      );
      this.__forumDetailCache._$addEvent(
        'onCancelFollowPost',
        this._$followStatusHandle._$bind(this, !1),
      );
      this.__forumDetailCache._$addEvent(
        'onCheckPosterInfo',
        this.__onManCb._$bind(this, 'onCheck'),
      );
      this.__forumDetailCache._$addEvent('onMarkAgree', this.__onManCb._$bind(this, 'onAgree'));
      this.__forumDetailCache._$addEvent('onMarkTop', this.__onManCb._$bind(this, 'onTop'));
      this.__forumDetailCache._$addEvent('onMarkSolve', this.__onManCb._$bind(this, 'onResolve'));
      this.__forumDetailCache._$addEvent('onCopyGoodPost', this.__onCopyGoodPost._$bind(this));
      d._$addEvent(
        this.__shareNode,
        'click',
        function () {
          var e = {
            url: s.location.href,
            uid: s.webUser ? s.webUser.id : -1,
            stat_id: this.__postVo.id,
            stat_type: 18,
          };
          e['action'] = 'MOC_ACTIVITY_SHARE';
          this.__commonCache._$addGaLog({
            dt: this.__strToHexCharCode(JSON.stringify(e)).substr(2),
            p: 'mooc',
          });
        }._$bind(this),
      );
      this.hideByLanguage();
    };
    h.hideByLanguage = function () {
      if (!i.isCh()) this.__shareNode.style.display = 'none';
    };
    h.__strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    };
    h.__genShareUI = function () {
      if (this.__shareUI) this.__shareUI.destroy();
      var e = s.courseDto,
        t = [
          'MOOC是全新完整的教学模式--定期开课、简短视频，提交作业，学完还能考取认证证书，更可以结交到新朋友！',
          window.moocConfig.lang.KEY_LEARN_RECOMMEND_EVERYONE,
          '我在#中国大学MOOC#平台上学习，',
        ];
      var i = f
          ? t[2]
          : this.__postVo.title +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        o = f
          ? t[2]
          : this.__postVo.title +
            '_来自' +
            e.schoolPanel.name +
            window.moocConfig.lang.KEY_LEARN_OF +
            e.name +
            '》_中国大学MOOC出品',
        a = f ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，';
      var r = '';
      if (s.activityNotEnd && s.webUser)
        r =
          '//www.icourse163.org' +
          s.location.pathname +
          '/wapForumDetail/?pid=' +
          this.__postVo.id +
          '&inviterId=' +
          s.webUser.id +
          '&activityId=' +
          s.activityId +
          '&isWebShare=1';
      else
        r =
          '//www.icourse163.org' + s.location.pathname + '/wapForumDetail/?pid=' + this.__postVo.id;
      if (!s.hideTermShare)
        this.__shareUI = new n({
          data: {
            title: i,
            topic: o + t[1],
            description: a + t[0],
            pic: s.termDto.bigPhoto,
            url: window.location.protocol + (f ? '//www.icourse163.org' : r),
            weixinQR: '',
            model: 0,
          },
        }).$inject(this.__shareNode);
    };
    h.__onCopyGoodPost = function (e) {
      var t = window.moocConfig.lang.KEY_LEARN_HAS_POSTS,
        n = 1;
      this.__onTransfer = !1;
      if (!e) {
        t = window.moocConfig.lang.KEY_LEARN_MIGRATION_FAILED;
        n = 2;
      }
      u.showToastTips({ type: n, content: t });
    };
    h.__onReportHandle = function () {
      if (u._$isUserLogin()) {
        if (0 == s.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        u._$$ReportDialog._$showDialog({ vo: this.__postVo, type: u.CONST.TALK_VOTE_POST });
      } else u._$$LoginDialog._$showLogin({ from: 'forum' });
    };
    h.__onDelPostCb = function (e) {
      if (e) s.dispatcher._$redirect(u.umi('learnForumIndex'));
    };
    h.__onDelHandle = function () {
      u._$$CommonDialog._$showDialog({
        type: 1,
        message: '<b>' + o.KEY_LEARN_ARE_POST + '</b><p>' + o.KEY_LEARN_ALL_CONFIRMING + '</p>',
        okFunc: function () {
          this.__forumDetailCache._$delPost(this.__postVo.id);
        }._$bind(this),
        cancelFunc: r._$bind(this),
        focusNum: 1,
      });
    };
    h._$followStatusHandle = function (e) {
      u._$showNode(this.__followBtn);
      this.__postVo.hasFollowed = !!e;
      c._$delClassName(this.__followBtn, 'followed unfollowed');
      if (e) c._$addClassName(this.__followBtn, 'followed');
      else c._$addClassName(this.__followBtn, 'unfollowed');
    };
    h.__onFollowHandle = function () {
      if (u._$isUserLogin()) {
        if (0 == s.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        if (!(u._$isForumJustShow() > 0))
          if (this.__postVo.hasFollowed)
            this.__forumDetailCache._$cancelFollowPost(this.__postVo.id);
          else this.__forumDetailCache._$followPost(this.__postVo.id);
        else this._$dispatchEvent('onBanned');
      } else u._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    h.__onManCb = function (e, t) {
      if (t) {
        switch (e) {
          case 'onCheck':
            if (this.__userUI) this.__userUI._$showUserMailInfo(t, this.__postVo.termId);
            break;
          case 'onAgree':
            this.__postVo.tagAgree = !this.__postVo.tagAgree;
            break;
          case 'onTop':
            this.__postVo.tagTop = !this.__postVo.tagTop;
            break;
          case 'onResolve':
            this.__postVo.tagSolve = !this.__postVo.tagSolve;
        }
        this.__onUpdateItemMes();
      }
    };
    h.__onManHandle = function (e) {
      switch (e) {
        case 'onCheck':
          if (this.__postVo.type == u.CONST.TYPE_LESSONUNIT)
            u.showToastTips({
              content:
                window.moocConfig.lang.KEY_LEARN_THIS_DOCUMENTS +
                ',' +
                window.moocConfig.lang.KEY_LEARN_CANT_INFORMATION,
              type: 2,
            });
          else
            this.__forumDetailCache._$checkPosterInfo(
              this.__postVo.id,
              this.__postVo.id,
              u.CONST.TALK_VOTE_POST,
            );
          break;
        case 'onAgree':
          this.__forumDetailCache._$markAgree(
            this.__postVo.id,
            this.__postVo.id,
            u.CONST.TALK_VOTE_POST,
            !this.__postVo.tagAgree,
          );
          break;
        case 'onTop':
          this.__forumDetailCache._$markTop(
            this.__postVo.id,
            this.__postVo.id,
            u.CONST.TALK_VOTE_POST,
            !this.__postVo.tagTop,
          );
          break;
        case 'onResolve':
          this.__forumDetailCache._$markSolve(this.__postVo.id, !this.__postVo.tagSolve);
      }
    };
    h.__onUpdateItemMes = function () {
      u._$showNode(this.__tagBox);
      if (
        this.__postVo.tagTop ||
        this.__postVo.tagAgree ||
        this.__postVo.tagSolve ||
        this.__postVo.tagLector
      ) {
        u._$hiddenNode(this.__tagTopNode);
        u._$hiddenNode(this.__tagAgreeNode);
        u._$hiddenNode(this.__tagSolveNode);
        u._$hiddenNode(this.__tagTeacherNode);
        if (this.__postVo.tagTop) u._$showNode(this.__tagTopNode);
        if (this.__postVo.tagAgree) u._$showNode(this.__tagAgreeNode);
        if (this.__postVo.tagSolve) u._$showNode(this.__tagSolveNode);
        if (this.__postVo.tagLector) u._$showNode(this.__tagTeacherNode);
      } else u._$hiddenNode(this.__tagBox);
      if (this.__newTermId) {
        u._$hiddenNode(this.__tagBox);
        u._$showNode(this.__tranferBtn);
      }
      if (this.__manUI) {
        this.__manUI._$setItemMes(
          'onTop',
          this.__postVo.tagTop
            ? window.moocConfig.lang.KEY_LEARN_UNPIN
            : window.moocConfig.lang.KEY_LEARN_TOP,
        );
        this.__manUI._$setItemMes(
          'onAgree',
          this.__postVo.tagAgree
            ? window.moocConfig.lang.KEY_LEARN_CANCEL_APPROVE
            : window.moocConfig.lang.KEY_LEARN_AGREE_AGREE,
        );
        this.__manUI._$setItemMes(
          'onResolve',
          this.__postVo.tagSolve
            ? window.moocConfig.lang.KEY_LEARN_CANCEL_RESOLUTION
            : window.moocConfig.lang.KEY_LEARN_SOLVED,
        );
      }
    };
    h.__onReplyHandle = function () {
      if (!u._$isUserLogin()) u._$$LoginDialog._$showLogin({ from: 'learn' });
      else if (0 == s.isEnroll) this.__attendCourseModal = new t();
      else
        this.__banUserUtil.checkIsBanned(
          function () {
            this._$dispatchEvent('onReply');
          }._$bind(this),
          window.termDto && window.termDto.id,
        );
    };
    h.__onEditHandle = function () {
      if (u._$isUserLogin()) {
        if (0 == s.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        s.dispatcher._$redirect(
          u.umi('learnForumTopic') + '?fid=' + this.__postVo.forumId + '&pid=' + this.__postVo.id,
        );
      } else u._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    h.__handleInfoBar = function () {
      if (this.__postVo.relateUnit) {
        u._$showNode(this.__fromUnitBox);
        this.__fromUnitNode.innerText = this.__postVo.relateUnit.name;
        this.__fromUnitNode.href =
          '#' +
          u.umi('learnContent') +
          '?type=detail&id=' +
          this.__postVo.relateUnit.lessonId +
          '&cid=' +
          this.__postVo.relateUnit.id;
      } else u._$hiddenNode(this.__fromUnitBox);
      if (this.__postVo.type == u.CONST.TYPE_LESSONUNIT) u._$hiddenNode(this.__infoBox);
      else {
        u._$showNode(this.__infoBox);
        this.__timeLabel.innerText = u._$formatForumTime(this.__postVo.postTime);
        this.__userUI = u._$$UserItem._$allocate({
          parent: this.__nameNode,
          anonymous: this.__postVo.anonymous,
          userDto: this.__userDto,
        });
      }
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__postVo = e.postVo;
      this.__userDto = this.__postVo.poster || {};
      this.__titleNode.innerText = u._$removeNRNBSP(this.__postVo.title || '');
      if (u._$trim(this.__postVo.content)) {
        u._$showNode(this.__contentNode);
        l._$renderRich(this.__contentNode, this.__postVo.content);
        var t = this.__contentNode.getElementsByTagName('img');
        l._$forEach(
          t,
          function (e) {
            var t = e.getAttribute('src');
            if (t.indexOf('nos.netease.com') > -1 && t.indexOf('?imageView') < 0)
              e.src += '?imageView';
          }._$bind(this),
        );
      } else u._$hiddenNode(this.__contentNode);
      this.__handleInfoBar();
      this.__voteUI = u._$$VoteItem._$allocate({
        parent: this.__voteNode,
        postId: this.__postVo.id,
        id: this.__postVo.id,
        type: u.CONST.TALK_VOTE_POST,
        dataVo: {
          voteCount: this.__postVo.countVote,
          voteOpinion: this.__postVo.hasVoteUp
            ? u.CONST.TALK_VOTE_DIGG
            : this.__postVo.hasVoteDown
              ? u.CONST.TALK_VOTE_CAI
              : -1,
        },
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      this._$followStatusHandle(this.__postVo.hasFollowed);
      if (u._$isUserOwner(this.__userDto.id)) {
        u._$showNode(this.__editBtn);
        u._$showNode(this.__editDivider);
      } else {
        u._$hiddenNode(this.__editBtn);
        u._$hiddenNode(this.__editDivider);
      }
      if (
        u._$getCourseLecOrAssists(s.courseDto.lectorPanels, u._$getWebUser().id) ||
        u._$isOrdinaryEditorForCourse(s.courseDto.ordinaryEditors) ||
        u._$hasMemberRole(u.CONST.ROLE_OUT_COURSE_EDITOR) ||
        u._$hasMemberRole(u.CONST.ROLE_PLATFORM_ADMIN) ||
        u._$hasMemberRole(u.CONST.ROLE_FORUM_MANAGER)
      ) {
        u._$showNode(this.__manNode);
        var n = ['onCheck', 'onResolve', 'onTop', 'onAgree'];
        if (this.__postVo.type != u.CONST.TYPE_LESSONUNIT) n.push('onDel');
        this.__manUI = u._$$ManageItem._$allocate({
          parent: this.__manNode,
          showItems: n,
          onTop: this.__onManHandle._$bind(this, 'onTop'),
          onAgree: this.__onManHandle._$bind(this, 'onAgree'),
          onResolve: this.__onManHandle._$bind(this, 'onResolve'),
          onCheck: this.__onManHandle._$bind(this, 'onCheck'),
          onDel: this.__onDelHandle._$bind(this),
        });
      } else u._$hiddenNode(this.__manNode);
      this.__onUpdateItemMes();
      this.__genShareUI();
    };
    h.__destroy = function () {
      if (this.__userUI) this.__userUI = u._$$UserItem._$recycle(this.__userUI);
      if (this.__voteUI) this.__voteUI = u._$$VoteItem._$recycle(this.__voteUI);
      if (this.__manUI) this.__manUI = u._$$ManageItem._$recycle(this.__manUI);
      if (this.__shareUI) this.__shareUI.destroy();
      this.__supDestroy();
    };
  },
  '8eb6c5c05557c81b78bf50f441e3f28c',
  '1c23b43dfd9c054559909485b4169fa4',
  '8419259be84b2292fe5117e5d132029e',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7ae1049f52447f73129209d74071c691',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '391bade1f824c8724e734dc7a3557f36',
  '7c0f38757da06c54ce1062cbacb9b5c1',
  'bbd38ff49a9c39da32c8f35626316f21',
  'c30834300a1390e7ec4f8432fef9123b',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  'fb80274a93905bc7807baceaedc07c15',
  'cc26d5920093e9742f0feca3855e8e68',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '831c24e8616de4f54d6f34150ec7747d',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.ui'),
      d;
    var l = a._$pushCSSText(
      '\t \t        .#<uispace> {}\t \t        .#<uispace> .rich-opt{margin-top:10px;}\t \t        .#<uispace> .rich-opt label{cursor:pointer;color:#999;vertical-align:top;}\t \t        .#<uispace> .rich-opt label:hover{color:#61a500;}\t \t        .#<uispace> .rich-opt label input{margin-top:3px;}\t \t        .#<uispace> .rich-opt .cancelbtn{margin-right:10px;line-height:24px;}\t \t        .#<uispace> .unlogin{position:absolute;top:0;left:0;bottom:0;right:0;}\t \t        .#<uispace> .unlogin .autowrap {margin:115px auto;width:188px;}\t \t        .#<uispace> .unlogin .autowrap p{line-height:26px;color:#666;margin-right:10px;}\t \t        ',
    );
    var _ = a._$addHtmlTemplate(
      '\t\t\t<div class="ui-richEditor f-cb f-pr">\t\t\t    <div class="rich-wrap">\t\t\t        <div class="rich-editor j-richeditor"></div>\t\t\t        <div class="rich-opt f-cb">\t    \t\t\t\t<label class="j-anony f-fl"><input type="checkbox" hidefocus="true" class="j-anonycheck"/>&nbsp;&nbsp;${lang.KEY_LEARN_ANONYMOUS}</label>\t    \t\t\t\t<a hidefocus="true" class="j-edit-btn editbtn u-btn u-btn-sm u-btn-primary f-fr"></a>\t\t            \t<a hidefocus="true" class="j-close-btn cancelbtn f-fc9 f-fr">${lang.KEY_LEARN_CANCEL}</a>\t\t\t        </div>\t\t\t    </div>\t\t\t    <div class="unlogin j-unloginbox">\t\t\t    \t<div class="autowrap f-cb">\t\t\t    \t\t<p class="f-fl">${lang.KEY_LEARN_LOGIN_OPINION}</p>\t\t\t    \t\t<a hidefocus="true" class="j-login-btn loginbtn u-btn u-btn-sm u-btn-primary f-fl">${lang.KEY_LEARN_LOG_IMMEDIATELY}</a>\t\t\t    \t</div>\t\t\t    </div>\t\t\t</div>',
    );
    r._$$RichEditItem = NEJ.C();
    d = r._$$RichEditItem._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(_, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = l;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__richBox = a._$getByClassName(this.__body, 'j-richeditor')[0];
      this.__edit_btn = a._$getByClassName(this.__body, 'j-edit-btn')[0];
      this.__close_btn = a._$getByClassName(this.__body, 'j-close-btn')[0];
      this.__anonyNode = a._$getByClassName(this.__body, 'j-anony')[0];
      this.__anonyCheckBox = a._$getByClassName(this.__body, 'j-anonycheck')[0];
      this.__unloginBox = a._$getByClassName(this.__body, 'j-unloginbox')[0];
      this.__loginBtn = a._$getByClassName(this.__body, 'j-login-btn')[0];
      s._$addEvent(this.__edit_btn, 'click', this.__editHandle._$bind(this));
      s._$addEvent(this.__close_btn, 'click', this.__closeHandle._$bind(this));
      s._$addEvent(this.__loginBtn, 'click', this.__loginHandle._$bind(this));
    };
    d.__editHandle = function (e) {
      if (r._$isUserLogin()) {
        if (0 == n.isEnroll) {
          this.__attendCourseModal = new t();
          return;
        }
        s._$stop(e);
        this._$dispatchEvent('onEditClick');
      } else r._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__closeHandle = function (e) {
      s._$stop(e);
      this._$dispatchEvent('onCloseClick');
    };
    d.__loginHandle = function (e) {
      s._$stop(e);
      r._$$LoginDialog._$showLogin({});
    };
    d.__dealWithLoginStatus = function () {
      if (r._$isUserLogin()) r._$hiddenNode(this.__unloginBox);
      else r._$showNode(this.__unloginBox);
    };
    d.__reset = function (t) {
      this.__supReset(t);
      this.__edit_btn.innerText = t.btnText || window.moocConfig.lang.KEY_LEARN_PUBLISH;
      var n = t.notShowClose || !1;
      if (!n) r._$showNode(this.__close_btn);
      else r._$hiddenNode(this.__close_btn);
      this.__initValue = t.initContent || '';
      if (this.__richUI) this.__richUI.destroy();
      this.__richUI = new e({
        data: { value: this.__initValue, focus: !!t.focus, height: t.height },
      }).$inject(this.__richBox);
      this._$setAnonyChecked(!!t.anonyChecked);
      this.__dealWithLoginStatus();
    };
    d._$isModified = function () {
      var e = this._$getContent();
      return this.__initValue != e && '' != e;
    };
    d._$getContent = function () {
      return this.__richUI.__richUI._$getContent();
    };
    d._$getAnonyChecked = function () {
      return this.__anonyCheckBox.checked ? 1 : 0;
    };
    d._$setAnonyChecked = function (e) {
      this.__anonyCheckBox.checked = !!e;
    };
    d._$getPhotoIdsAndUrls = function () {
      return this.__richUI.__richUI._$getPhotoIdsAndUrls();
    };
    d._$setContent = function (e) {
      return this.__richUI.__richUI._$setContent(e);
    };
    d._$clearCtAndAnony = function (e) {
      if (!r._$isNodeShown(this.__unloginBox)) {
        this.__richUI.__richUI._$setContent('');
        this._$setAnonyChecked(!1);
        if (e) this.__richUI.__richUI._$focus();
      }
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
  },
  'c3d8b9ca858a4c969aa91fbe6e8bca0c',
  '1c23b43dfd9c054559909485b4169fa4',
  '342ad7ae4eea50c3cad860686650a915',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '919745c60678236fdf2cbf9d4a1b416e',
  function () {
    var e = (window.moocConfig || {}).lang || {};
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c;
    r._$$AddReply = NEJ.C();
    c = r._$$AddReply._$extend(r._$$RichEditItem, !0);
    c.__initNode = function () {
      this.__supInitNode();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onAddReply', this.__onAddReplyCb._$bind(this));
    };
    c.__addReplyHandle = function () {
      var t = this._$getContent();
      if ('' != t)
        this.__forumDetailCache._$addRely(
          { postId: this.__postId, content: t, anonymous: this._$getAnonyChecked() },
          r._$formatEditorUrlsGids(this._$getPhotoIdsAndUrls()),
        );
      else r.showToastTips({ content: e.KEY_LEARN_PLEASE_ANSWER_CONTENT, type: 2 });
    };
    c.__onAddReplyCb = function (e) {
      if (e) {
        if (this.__submitCallback) this.__submitCallback(e);
        this._$clearCtAndAnony(!0);
      } else r._$$CommonDialog._$showDialog({ type: 1, message: '发表失败，请刷新重试' });
    };
    c.__reset = function (t) {
      t.btnText = t.btnText || e.KEY_LEARN_POST_COMMENT;
      this.__submitCallback = t.submitCallback;
      this.__postId = t.postId;
      this._$addEvent('onEditClick', this.__addReplyHandle._$bind(this));
      t.notShowClose = !0;
      t.focus = !1;
      t.initContent = '';
      this.__supReset(t);
    };
  },
  '831c24e8616de4f54d6f34150ec7747d',
  'cc26d5920093e9742f0feca3855e8e68',
  '24f8154ce482a05ab133345b291e357f',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'ab6af9f7e26b55b8c5a875bba5679347',
);
EDU(
  'ea3f5e83db4dc94c1e618ff6219e35d5',
  function (e) {
    var t = !e.isCh();
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('edu.u'),
      l;
    var _ = a._$pushCSSText(
      '    \t\t.#<uispace>{width:100%;padding-top:15px;}    \t\t.#<uispace> .tagCt{margin-bottom:6px;}    \t\t.#<uispace> .bar{padding:10px 0;}            .#<uispace> .time{padding-left:10px;}            .#<uispace> .opt{cursor:pointer;}            .#<uispace> .divider{color:#ddd;margin:0 5px;}            ',
    );
    var u = a._$addHtmlTemplate(
      '<div class="m-detailInfoItem f-pr">\t\t\t <div class="tagCt f-cb j-tagBox">             \t<div class="u-forumtag u-forumtag1 j-tagTopNode">${lang.KEY_LEARN_TOP}</div>             \t<div class="u-forumtag j-tagAgreeNode">${lang.KEY_LEARN_AGREE_AGREE}</div>             </div>\t\t\t<div class="f-richEditorText j-content"></div>\t\t\t<div class="bar f-cb">\t\t\t  <div class="f-fl name j-name"></div>\t\t\t  <div class="f-fl f-fc9 time j-time"></div>\t\t\t  <div class="f-fr j-manBox"></div>' +
        (t
          ? ''
          : '<a hidefocus="true" class="f-fr f-fc9 opt delBtn j-reportBtn">${lang.KEY_LEARN_REPORT_REPORT}</a><div class="f-fr divider">|</div>') +
        '<a hidefocus="true" class="f-fr f-fc9 opt delBtn j-delBtn">${lang.KEY_LEARN_DELETE_DELETE}</a>\t\t\t  <div class="j-delDivider f-fr divider">|</div>\t\t\t  <a hidefocus="true" class="f-fr f-fc9 opt cmtBtn j-cmtBtn">${lang.KEY_LEARN_COMMENT}(0)</a>\t\t\t  <div class="j-cmtDivider f-fr divider">|</div>\t\t\t  <div class="f-fr votebox j-vote"></div>\t\t\t</div>\t\t</div>',
    );
    d._$$DetailInfoItem = NEJ.C();
    l = d._$$DetailInfoItem._$extend(d._$$UIBase, !0);
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(u, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = _;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__timeLabel = a._$getByClassName(this.__body, 'j-time')[0];
      this.__delBtn = a._$getByClassName(this.__body, 'j-delBtn')[0];
      this.__cmtBtn = a._$getByClassName(this.__body, 'j-cmtBtn')[0];
      this.__reportBtn = a._$getByClassName(this.__body, 'j-reportBtn')[0];
      this.__delDivider = a._$getByClassName(this.__body, 'j-delDivider')[0];
      this.__cmtDivider = a._$getByClassName(this.__body, 'j-cmtDivider')[0];
      this.__contentNode = a._$getByClassName(this.__body, 'j-content')[0];
      this.__nameNode = a._$getByClassName(this.__body, 'j-name')[0];
      this.__voteNode = a._$getByClassName(this.__body, 'j-vote')[0];
      this.__manNode = a._$getByClassName(this.__body, 'j-manBox')[0];
      this.__tagBox = a._$getByClassName(this.__body, 'j-tagBox')[0];
      this.__tagTopNode = a._$getByClassName(this.__body, 'j-tagTopNode')[0];
      this.__tagAgreeNode = a._$getByClassName(this.__body, 'j-tagAgreeNode')[0];
      s._$addEvent(this.__reportBtn, 'click', this.__onReportHandle._$bind(this));
      s._$addEvent(this.__delBtn, 'click', this.__onDelHandle._$bind(this));
      s._$addEvent(this.__cmtBtn, 'click', this.__onCmtHandle._$bind(this));
      this.__forumDetailCache = new c._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onMarkAgree', this.__onManCb._$bind(this, 'onAgree'));
      this.__forumDetailCache._$addEvent('onMarkTop', this.__onManCb._$bind(this, 'onTop'));
      this.__forumDetailCache._$addEvent(
        'onCheckPosterInfo',
        this.__onManCb._$bind(this, 'onCheck'),
      );
    };
    l.__onReportHandle = function (e) {
      d._$$ReportDialog._$showDialog({ vo: this.__infoVo, type: this.__targetType });
    };
    l.__onManCb = function (e, t) {
      if (t) {
        switch (e) {
          case 'onCheck':
            if (this.__userUI) this.__userUI._$showUserMailInfo(t, n.termDto.id);
            break;
          case 'onAgree':
            this.__infoVo.tagAgree = !this.__infoVo.tagAgree;
            break;
          case 'onTop':
            this.__infoVo.tagTop = !this.__infoVo.tagTop;
        }
        this.__onUpdateItemMes();
      }
    };
    l.__onManHandle = function (e) {
      switch (e) {
        case 'onCheck':
          this.__forumDetailCache._$checkPosterInfo(
            this.__infoVo.postId,
            this.__infoVo.id,
            this.__targetType,
          );
          break;
        case 'onAgree':
          this.__forumDetailCache._$markAgree(
            this.__infoVo.postId,
            this.__infoVo.id,
            this.__targetType,
            !this.__infoVo.tagAgree,
          );
          break;
        case 'onTop':
          this.__forumDetailCache._$markTop(
            this.__infoVo.postId,
            this.__infoVo.id,
            this.__targetType,
            !this.__infoVo.tagTop,
          );
      }
    };
    l.__onUpdateItemMes = function () {
      if (this.__infoVo.tagTop || this.__infoVo.tagAgree) {
        d._$showNode(this.__tagBox);
        d._$hiddenNode(this.__tagTopNode);
        d._$hiddenNode(this.__tagAgreeNode);
        if (this.__infoVo.tagTop) d._$showNode(this.__tagTopNode);
        if (this.__infoVo.tagAgree) d._$showNode(this.__tagAgreeNode);
      } else d._$hiddenNode(this.__tagBox);
      if (this.__manUI) {
        this.__manUI._$setItemMes(
          'onTop',
          this.__infoVo.tagTop
            ? window.moocConfig.lang.KEY_LEARN_UNPIN
            : window.moocConfig.lang.KEY_LEARN_TOP,
        );
        this.__manUI._$setItemMes(
          'onAgree',
          this.__infoVo.tagAgree
            ? window.moocConfig.lang.KEY_LEARN_CANCEL_APPROVE
            : window.moocConfig.lang.KEY_LEARN_AGREE_AGREE,
        );
      }
    };
    l.__reset = function (e) {
      this.__supReset(e);
      this.__infoVo = e.infoVo;
      this.__targetType = e.type;
      this.__userDto = e.userDto || {};
      this.__timeLabel.innerText = d._$formatForumTime(this.__infoVo.gmtCreate);
      r._$renderRich(this.__contentNode, this.__infoVo.content || '');
      var t = this.__contentNode.getElementsByTagName('img');
      r._$forEach(
        t,
        function (e) {
          var t = e.getAttribute('src');
          if (t && t.indexOf('nos.netease.com') > -1 && t.indexOf('?imageView') < 0)
            e.src += '?imageView';
        }._$bind(this),
      );
      if (
        d._$isUserOwner(this.__userDto.id) &&
        d._$isForumJustShow() == d.CONST.FORUM_FORBID_NORMAL
      ) {
        d._$showNode(this.__delBtn);
        d._$showNode(this.__delDivider);
      } else {
        d._$hiddenNode(this.__delBtn);
        d._$hiddenNode(this.__delDivider);
      }
      if (
        d._$getCourseLecOrAssists(n.courseDto.lectorPanels, d._$getWebUser().id) ||
        d._$isOrdinaryEditorForCourse(n.courseDto.ordinaryEditors) ||
        d._$hasMemberRole(d.CONST.ROLE_OUT_COURSE_EDITOR) ||
        d._$hasMemberRole(d.CONST.ROLE_PLATFORM_ADMIN) ||
        d._$hasMemberRole(d.CONST.ROLE_FORUM_MANAGER)
      ) {
        d._$showNode(this.__manNode);
        this.__manUI = d._$$ManageItem._$allocate({
          parent: this.__manNode,
          showItems: ['onCheck', 'onTop', 'onAgree', 'onDel'],
          onTop: this.__onManHandle._$bind(this, 'onTop'),
          onAgree: this.__onManHandle._$bind(this, 'onAgree'),
          onCheck: this.__onManHandle._$bind(this, 'onCheck'),
          onDel: this.__onDelHandle._$bind(this),
        });
      } else d._$hiddenNode(this.__manNode);
      this.__onUpdateItemMes();
      if (e.showCmtBtn) {
        d._$showNode(this.__cmtBtn);
        d._$showNode(this.__cmtDivider);
      } else {
        d._$hiddenNode(this.__cmtBtn);
        d._$hiddenNode(this.__cmtDivider);
      }
      this.__userUI = d._$$UserItem._$allocate({
        parent: this.__nameNode,
        anonymous: this.__infoVo.anonymous,
        userDto: this.__userDto,
      });
      this.__voteUI = d._$$VoteItem._$allocate({
        parent: this.__voteNode,
        postId: this.__infoVo.postId,
        id: this.__infoVo.id,
        type: this.__targetType,
        dataVo: {
          voteCount: this.__infoVo.countVote,
          voteOpinion: this.__infoVo.hasVoteUp
            ? d.CONST.TALK_VOTE_DIGG
            : this.__infoVo.hasVoteDown
              ? d.CONST.TALK_VOTE_CAI
              : -1,
        },
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
    };
    l._$getOptBtnCnt = function () {
      var e = 1;
      if (d._$isNodeShown(this.__delBtn)) e++;
      if (d._$isNodeShown(this.__manNode)) e++;
      return e;
    };
    l._$updateCmtCount = function (e) {
      this.__cmtBtn.innerText = window.moocConfig.lang.KEY_LEARN_COMMENT + '(' + (e || 0) + ')';
    };
    l.__onCmtHandle = function () {
      this._$dispatchEvent('onCmt');
    };
    l.__onDelHandle = function () {
      this._$dispatchEvent('onDel');
    };
    l.__destroy = function () {
      if (this.__userUI) this.__userUI = d._$$UserItem._$recycle(this.__userUI);
      if (this.__voteUI) this.__voteUI = d._$$VoteItem._$recycle(this.__voteUI);
      if (this.__manUI) this.__manUI = d._$$ManageItem._$recycle(this.__manUI);
      this.__supDestroy();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7ae1049f52447f73129209d74071c691',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'c30834300a1390e7ec4f8432fef9123b',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '391bade1f824c8724e734dc7a3557f36',
  '7c0f38757da06c54ce1062cbacb9b5c1',
  'bbd38ff49a9c39da32c8f35626316f21',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'a234059e7f4c350dd8920f68f370bdc9',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c;
    var d = o._$pushCSSText(
      '       .#<uispace> {width:550px;}       .#<uispace> .small{background-color:#fff;border:1px solid #dfdfdf;padding:10px;color:#999;}       .#<uispace> .small a{color:#61A500;}       .#<uispace> .small.j-logupbox{cursor:pointer;}       .#<uispace> .ui-richEditor .rich-editor .ztbar{padding:0 4px;}       ',
    );
    var l = o._$addHtmlTemplate(
      '<div>    \t\t<p class="small j-unlogbox">${lang.KEY_LEARN_LOGIN_CLICK}<a hidefocus="true" class="j-loginbtn loginbtn">${lang.KEY_LEARN_LOG_IN}</a></p>    \t\t<p class="small j-logupbox">${lang.KEY_LEARN_ADD_COMMENT}...</p>    \t\t<div class="j-logdownbox"></div>        </div>',
    );
    r._$$AddComment = NEJ.C();
    c = r._$$AddComment._$extend(r._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(l, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__unlogBox = o._$getByClassName(this.__body, 'j-unlogbox')[0];
      this.__logupBox = o._$getByClassName(this.__body, 'j-logupbox')[0];
      this.__logdownBox = o._$getByClassName(this.__body, 'j-logdownbox')[0];
      this.__loginBtn = o._$getByClassName(this.__body, 'j-loginbtn')[0];
      a._$addEvent(this.__logupBox, 'click', this.__upDownHandle._$bind(this, !0, !0));
      a._$addEvent(this.__loginBtn, 'click', this.__loginHandle._$bind(this));
      this.__banUserUtil = new e.BanUserUtil();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onAddComment', this.__onAddCommentCb._$bind(this));
    };
    c.__loginHandle = function (e) {
      a._$stop(e);
      r._$$LoginDialog._$showLogin({});
    };
    c.__upDownHandle = function (e, t) {
      var n = function () {
        if (e) {
          r._$hiddenNode(this.__logupBox);
          r._$showNode(this.__logdownBox);
          this.__editor = r._$$RichEditItem._$allocate({
            parent: this.__logdownBox,
            focus: !0,
            initContent: '',
            height: 80,
            btnText: window.moocConfig.lang.KEY_LEARN_ADD_COMMENT,
            onEditClick: this.__addReplyHandle._$bind(this),
            onCloseClick: this._$initUpDownStatus._$bind(this, !1),
          });
        } else {
          if (this.__editor) this.__editor = r._$$RichEditItem._$recycle(this.__editor);
          r._$showNode(this.__logupBox);
          r._$hiddenNode(this.__logdownBox);
        }
      }._$bind(this);
      if (t)
        this.__banUserUtil.checkIsBanned(
          function () {
            n();
          }._$bind(this),
          window.termDto && window.termDto.id,
        );
      else n();
    };
    c._$initUpDownStatus = function (e) {
      if (r._$isUserLogin()) {
        r._$hiddenNode(this.__unlogBox);
        this.__upDownHandle(e);
      } else {
        this.__upDownHandle(!1);
        r._$showNode(this.__unlogBox);
        r._$hiddenNode(this.__logupBox);
      }
    };
    c.__addReplyHandle = function () {
      var e = this.__editor._$getContent();
      if ('' != e)
        this.__forumDetailCache._$addComment(
          {
            postId: this.__postId,
            replyId: this.__replyId,
            content: e,
            anonymous: this.__editor._$getAnonyChecked(),
          },
          r._$formatEditorUrlsGids(this.__editor._$getPhotoIdsAndUrls()),
        );
      else r.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_PLEASE_COMMENT, type: 2 });
    };
    c.__onAddCommentCb = function (e) {
      if (e) {
        if (this.__submitCallback) this.__submitCallback(e);
        this._$initUpDownStatus(!1);
      } else
        r._$$CommonDialog._$showDialog({
          type: 1,
          message: window.moocConfig.lang.KEY_LEARN_POST_AGAIN,
        });
    };
    c.__reset = function (e) {
      this.__submitCallback = e.submitCallback;
      this.__postId = e.postId;
      this.__replyId = e.replyId;
      this.__supReset(e);
      this._$initUpDownStatus(!1);
    };
    c.__destroy = function () {
      if (this.__editor) this.__editor = r._$$RichEditItem._$recycle(this.__editor);
      this.__supDestroy();
    };
  },
  '8eb6c5c05557c81b78bf50f441e3f28c',
  '831c24e8616de4f54d6f34150ec7747d',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '24f8154ce482a05ab133345b291e357f',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '342ad7ae4eea50c3cad860686650a915',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '5c2a91c71128fa627b0f43cdbb2ea6c7',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '    \t\t.#<uispace>{border-bottom:1px solid #eee;}    \t\t.#<uispace> .m-detailInfoItem .bar{padding:5px 0;}    \t\t',
    );
    var d = i._$addNodeTemplate('<div></div>');
    s._$$CommentItem = NEJ.C();
    r = s._$$CommentItem._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__forumDetailCache = new a._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onDelComment', this.__onDelCommentCb._$bind(this));
    };
    r.__onDelCommentCb = function (e) {
      if (e) {
        this._$dispatchEvent('onDelSuc', e);
        s._$$CommentItem._$recycle(this);
      }
    };
    r.__onDelHandle = function () {
      s._$$CommonDialog._$showDialog({
        type: 1,
        message: window.moocConfig.lang.KEY_LEARN_ARE_COMMENT,
        okFunc: function () {
          this.__forumDetailCache._$delComment(this.__commentVo.postId, this.__commentVo.id);
        }._$bind(this),
        cancelFunc: n._$bind(this),
        focusNum: 1,
      });
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__commentVo = e.commentVo;
      this.__infoItem = s._$$DetailInfoItem._$allocate({
        parent: this.__body,
        infoVo: this.__commentVo,
        userDto: this.__commentVo.commentor,
        showCmtBtn: !1,
        type: s.CONST.TALK_VOTE_COMMENT,
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      this.__infoItem._$addEvent('onDel', this.__onDelHandle._$bind(this));
    };
    r.__destroy = function () {
      if (this.__infoItem) this.__infoItem = s._$$DetailInfoItem._$recycle(this.__infoItem);
      this.__supDestroy();
    };
  },
  'ea3f5e83db4dc94c1e618ff6219e35d5',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
EDU(
  'ba24f6842569f3bad309e01524f2ffbd',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.m'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c;
    r._$$CommentPool = NEJ.C();
    c = r._$$CommentPool._$extend(a._$$BasePool, !0);
    c.__initNode = function () {
      this.__showPager = !0;
      this.__supInitNode();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onGetCmtList', this.__onGetCmtListCb._$bind(this));
    };
    c.__itemGen = function (e) {
      var t = r._$$CommentItem._$allocate({
        commentVo: e,
        onDelSuc: this.__itemDelCb._$bind(this),
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      return t;
    };
    c.__itemDestroy = function (e) {
      return r._$$CommentItem._$recycle(e);
    };
    c.__onPageChange = function (e) {
      var t = e ? e.index : -1;
      if (this.__curIndex && this.__curIndex != t) {
        this.__curIndex = t;
        this.__forumDetailCache._$getCommentList(this.__cmtData.id, this.__curIndex);
      }
    };
    c.__onGetCmtListCb = function (e) {
      if (e) {
        var t = this.__changeCommentsData(e);
        this.__cbOnRead(t);
        this.__onUpdateCmtCnt(e);
      }
    };
    c.__onUpdateCmtCnt = function (e) {
      if (e) this._$dispatchEvent('onUpdateCmtCnt', e.totalCount);
    };
    c.__changeCommentsData = function (e) {
      var t = null;
      if (e) t = { totlePageCount: e.totalPageCount, currentPageNo: e.pageNo, list: e.list || [] };
      return t;
    };
    c.__reset = function (e) {
      this.__cmtData = e.cmtData;
      e.dataMaps = this.__changeCommentsData(e.commentsMaps);
      this.__supReset(e);
      this.__onUpdateCmtCnt(e.commentsMaps);
    };
  },
  'fb689a88a2915cc7060dce11733a426e',
  '5c2a91c71128fa627b0f43cdbb2ea6c7',
  'e8fb5373e2239362823bb77f6fc2ce39',
);
EDU(
  'a3819abcbce305738ac672636dcc946d',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '    \t\t.#<uispace> .triangle{position:absolute;top:0;width:14px;height:10px;background: url(' +
        e.imageUrlMap.forum_icon_sprite +
        ') no-repeat -100px -2px;}    \t\t.#<uispace> .wrap{margin-top:7px;border:1px solid #ddd;border-radius:2px;}    \t\t.#<uispace> .wrap .m-comment-pool{padding:0 10px;}    \t\t.#<uispace> .wrap .m-comment-pool .j-list{padding-bottom:20px;}    \t\t.#<uispace> .wrap .m-add-comment{padding:15px 10px;background-color:#fafafa;border-top:1px solid #eee;position:relative;}    \t\t',
    );
    var d = i._$addNodeTemplate(
      '<div class="m-commentWrapper f-pr f-cb">\t\t\t   <div class="wrap f-fr">\t\t       \t\t<div class="m-comment-pool j-commentpool"></div>\t\t       \t\t<div class="m-add-comment j-addcomment"></div>\t\t       \t</div>\t\t\t   <div class="j-triangle triangle"></div>\t\t </div>',
    );
    s._$$CommentWrapper = NEJ.C();
    r = s._$$CommentWrapper._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__triangle = i._$getByClassName(this.__body, 'j-triangle')[0];
      this.__cmtpoolNode = i._$getByClassName(this.__body, 'j-commentpool')[0];
      this.__addcmtNode = i._$getByClassName(this.__body, 'j-addcomment')[0];
    };
    r.__addCommentCb = function (e) {
      if (e && this.__cmtpoolUI) {
        this.__cmtpoolUI._$genUIItem(e);
        this._$dispatchEvent('onAddItem');
      }
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__cmtData = e.cmtData;
      this.__triangle.style.right = e.triRight + 'px' || '0px';
      this.__addcmtUI = s._$$AddComment._$allocate({
        parent: this.__addcmtNode,
        postId: this.__cmtData.postId,
        replyId: this.__cmtData.id,
        submitCallback: this.__addCommentCb._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      this.__cmtpoolUI = s._$$CommentPool._$allocate({
        parent: this.__cmtpoolNode,
        cmtData: this.__cmtData,
        commentsMaps: e.commentsMaps,
        onUpdateCmtCnt: function (e) {
          this._$dispatchEvent('onUpdateCmtCnt', e);
        }._$bind(this),
        onDelItem: function () {
          this._$dispatchEvent('onDelItem');
        }._$bind(this),
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
    };
    r._$handleTriangle = function (e) {
      if (e) s._$showNode(this.__triangle);
      else s._$hiddenNode(this.__triangle);
    };
    r.__destroy = function () {
      if (this.__cmtpoolUI) this.__cmtpoolUI = s._$$CommentPool._$recycle(this.__cmtpoolUI);
      if (this.__addcmtUI) this.__addcmtUI = s._$$AddComment._$recycle(this.__addcmtUI);
      this.__supDestroy();
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'a234059e7f4c350dd8920f68f370bdc9',
  'ba24f6842569f3bad309e01524f2ffbd',
  '5c2a91c71128fa627b0f43cdbb2ea6c7',
  '342ad7ae4eea50c3cad860686650a915',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
EDU(
  '8dea050de02418ce18f537ea58c033a2',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c;
    var d = o._$pushCSSText(
      '    \t\t.#<uispace>{border-bottom:1px solid #eee;zoom:1;}    \t\t.#<uispace> .m-commentWrapper{margin:-5px 0 15px 0;}    \t\t.#<uispace> .m-commentWrapper .wrap{width:570px; position:relative;}    \t\t',
    );
    var l = o._$addNodeTemplate('<div class="f-pr"></div>');
    r._$$ReplyItem = NEJ.C();
    c = r._$$ReplyItem._$extend(r._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = l;
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onDelReply', this.__onDelReplyCb._$bind(this));
      this.__banUserUtil = new e.BanUserUtil();
    };
    c.__onDelReplyCb = function (e) {
      if (e) {
        this.__setCmtCount(0);
        this._$dispatchEvent('onDelSuc', e);
        r._$$ReplyItem._$recycle(this);
      }
    };
    c.__onDelHandle = function () {
      r._$$CommonDialog._$showDialog({
        type: 1,
        message:
          '<b>' +
          window.moocConfig.lang.KEY_LEARN_ARE_COMMENT_DELETE +
          '</b><p>' +
          window.moocConfig.lang.KEY_LEARN_ALL_CONFIRMATION +
          '</p>',
        okFunc: function () {
          this.__forumDetailCache._$delReply(this.__replyVo.postId, this.__replyVo.id);
        }._$bind(this),
        cancelFunc: i._$bind(this),
        focusNum: 1,
      });
    };
    c.__onCmtHandle = function (e, t) {
      if (this.__cmtWrapper) this.__cmtWrapper = r._$$CommentWrapper._$recycle(this.__cmtWrapper);
      else if (this.__replyVo.countComment || !e) {
        var n = function () {
          this.__cmtWrapper = r._$$CommentWrapper._$allocate({
            parent: this.__body,
            cmtData: this.__replyVo,
            triRight: 40 * this.__infoItem._$getOptBtnCnt() + 20,
            onUpdateCmtCnt: this.__setCmtCount._$bind(this),
            onAddItem: function () {
              this.__setCmtCount(this.__replyVo.countComment + 1);
              this._$dispatchEvent('onAddCmtItem', this.__replyVo);
            }._$bind(this),
            onDelItem: function () {
              this.__setCmtCount(this.__replyVo.countComment - 1);
            }._$bind(this),
            onVote: function (e) {
              this._$dispatchEvent('onVote', e);
            }._$bind(this),
            onBanned: function () {
              this._$dispatchEvent('onBanned');
            }._$bind(this),
          });
          this.__cmtWrapper._$getBody().style.zIndex = 99;
          if (!this.__replyVo.countComment) this.__cmtWrapper.__addcmtUI._$initUpDownStatus(!0);
        }._$bind(this);
        if (!e)
          this.__banUserUtil.checkIsBanned(
            function () {
              n();
            }._$bind(this),
            window.termDto && window.termDto.id,
          );
        else n();
      }
    };
    c.__setCmtCount = function (e) {
      this.__replyVo.countComment = e > 0 ? e : 0;
      this.__infoItem._$updateCmtCount(this.__replyVo.countComment);
      if (this.__cmtWrapper) this.__cmtWrapper._$handleTriangle(!!this.__replyVo.countComment);
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__replyVo = e.replyVo;
      this.__replyVo.countComment = this.__replyVo.countComment || 0;
      this.__body.style.zIndex = e.zIndex || 0;
      this.__infoItem = r._$$DetailInfoItem._$allocate({
        parent: this.__body,
        infoVo: this.__replyVo,
        userDto: this.__replyVo.replyer,
        showCmtBtn: !0,
        type: r.CONST.TALK_VOTE_REPLY,
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
      });
      this.__infoItem._$getBody().style.zIndex = 100;
      this.__infoItem._$addEvent('onDel', this.__onDelHandle._$bind(this));
      this.__infoItem._$addEvent('onCmt', this.__onCmtHandle._$bind(this, !1));
      this.__infoItem._$updateCmtCount(this.__replyVo.commentCount);
      this.__onCmtHandle(!0);
    };
    c.__destroy = function () {
      if (this.__infoItem) this.__infoItem = r._$$DetailInfoItem._$recycle(this.__infoItem);
      if (this.__cmtWrapper) this.__cmtWrapper = r._$$CommentWrapper._$recycle(this.__cmtWrapper);
      this.__supDestroy();
    };
  },
  '8eb6c5c05557c81b78bf50f441e3f28c',
  'ea3f5e83db4dc94c1e618ff6219e35d5',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'a3819abcbce305738ac672636dcc946d',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '865336bdee3def2e90e635383cc1e284',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
EDU(
  'd550f98719e03a495e71e818d9e95af6',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.u'),
      d;
    c._$$ReplyPool = NEJ.C();
    d = c._$$ReplyPool._$extend(s._$$BasePool, !0);
    d.__initNode = function () {
      this.__showPager = !0;
      this.__supInitNode();
      this.__forumDetailCache = new r._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onGetReplyList', this.__onGetReplyListCb._$bind(this));
    };
    d.__itemGen = function (e) {
      var t = c._$$ReplyItem._$allocate({
        replyVo: e,
        onDelSuc: this.__itemDelCb._$bind(this),
        onAddCmtItem: function (e) {
          this._$dispatchEvent('onAddCmtItem', e);
        }._$bind(this),
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      return t;
    };
    d.__itemDestroy = function (e) {
      return c._$$ReplyItem._$recycle(e);
    };
    d.__onPageChange = function (e) {
      var t = e ? e.index : -1;
      if (this.__curIndex && this.__curIndex != t) {
        this.__curIndex = t;
        this.__forumDetailCache._$getReplyList(
          this.__postVo.id,
          this.__sortType,
          this.__sortAsc,
          this.__curIndex,
        );
      }
    };
    d.__onGetReplyListCb = function (e) {
      if (e) {
        var t = this.__changeReplysData(e);
        this.__cbOnRead(t);
        this.__onUpdateReplysCnt(e);
      }
    };
    d.__onUpdateReplysCnt = function (e) {
      if (e) this._$dispatchEvent('updateCount', e.totalCount);
    };
    d.__changeReplysData = function (e) {
      var t = null;
      if (e) t = { totlePageCount: e.totalPageCount, currentPageNo: e.pageNo, list: e.list || [] };
      return t;
    };
    d._$changeSortType = function (e, t) {
      this.__sortType = e;
      this.__sortAsc = t;
      this._$getPageData(1);
    };
    d._$getSortVo = function () {
      return { sortType: this.__sortType, sortAsc: this.__sortAsc };
    };
    d.__reset = function (e) {
      this.__postVo = e.postVo;
      this.__sortType = e.sortType;
      this.__sortAsc = e.sortAsc;
      e.dataMaps = this.__changeReplysData(e.replysMaps);
      this.__supReset(e);
      this.__onUpdateReplysCnt(e.replysMaps);
    };
  },
  'fb689a88a2915cc7060dce11733a426e',
  '8dea050de02418ce18f537ea58c033a2',
  'e8fb5373e2239362823bb77f6fc2ce39',
);
EDU(
  '0a60a58976df980417d408dd43f51aac',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      s;
    var r = i._$pushCSSText(
      '\t        .#<uispace> {line-height:20px;color:#666;}\t        .#<uispace> .divider{display:inline-block;border-left:1px solid #ddd;margin:0px 10px 0px 5px;}\t        .#<uispace> a{color:#666;cursor:pointer;}\t        .#<uispace> a:hover{color:#61A500;text-decoration:none;}\t        .#<uispace> a span{background:url(' +
        e.imageUrlMap.forum_icon_sprite +
        ') no-repeat -4999px -4999px;margin-left:4px;display:inline-block;width:12px;height:20px;vertical-align:top;}\t        .#<uispace> .upsort,.#<uispace> .downsort{color:#61A500;}\t        .#<uispace> .double.nosort span{background-position:0 2px;}\t        .#<uispace> .double.downsort span{background-position:-20px 2px;}\t        .#<uispace> .double.upsort span{background-position:-38px 2px;}\t        ',
    );
    var c = i._$addHtmlTemplate(
      '<div>                ${lang.KEY_LEARN_SORT_BY}<a class="j-time double">${lang.KEY_LEARN_RESPONSE_TIME}<span></span></a                ><span class="divider"></span><a class="j-vote single">${lang.KEY_LEARN_NUMBER_VOTES}</a             </div>',
    );
    a._$$TalkSortItem = NEJ.C();
    s = a._$$TalkSortItem._$extend(a._$$UIBase, !0);
    s.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate(c, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = r;
    };
    s.__initNode = function () {
      this.__supInitNode();
      this.__timebtn = i._$getByClassName(this.__body, 'j-time')[0];
      this.__votebtn = i._$getByClassName(this.__body, 'j-vote')[0];
      this.__btnsMap = { gmt_create: this.__timebtn, vote_count: this.__votebtn };
      for (var e in this.__btnsMap)
        o._$addEvent(this.__btnsMap[e], 'click', this.__selectSortBtnHandle._$bind(this, e, !0));
    };
    s.__selectSortBtnHandle = function (e, t) {
      var n = this.__setSortBtn(this.__btnsMap[e]);
      if (t) {
        this.__sortType = e;
        this.__sortAsc = n;
        this._$dispatchEvent('onSortChange', { sortType: e, sortAsc: n });
      }
    };
    s.__setSortBtn = function (e) {
      if (e) {
        var t;
        if (i._$hasClassName(e, 'nosort')) {
          if (this.__curSortNode) this.__setBtnInitState(this.__curSortNode);
          this.__curSortNode = e;
          t = this.__sortAsc || 'asc';
          i._$replaceClassName(e, 'nosort', 'asc' == t ? 'upsort' : 'downsort');
        } else if (i._$hasClassName(e, 'downsort')) {
          i._$replaceClassName(e, 'downsort', 'upsort');
          t = 'asc';
        } else if (i._$hasClassName(e, 'upsort')) {
          i._$replaceClassName(e, 'upsort', 'downsort');
          t = 'desc';
        }
        return t;
      }
    };
    s.__setBtnInitState = function (e) {
      if (e) {
        i._$delClassName(e, 'downsort');
        i._$delClassName(e, 'upsort');
        i._$addClassName(e, 'nosort');
      }
    };
    s.__setShowBtns = function (e) {
      e = e || [];
      for (var t in this.__btnsMap) a._$hiddenNode(this.__btnsMap[t]);
      for (var n = 0; n < e.length; n++)
        if (this.__btnsMap[e[n]]) {
          var i = this.__btnsMap[e[n]];
          a._$showNode(i);
        }
    };
    s.__reset = function (e) {
      this.__supReset(e);
      this.__curSortNode = null;
      this.__setShowBtns(e.showTypes);
      if (void 0 != e.sortType) this._$setInitSort(e.sortType, e.sortAsc);
    };
    s._$getSort = function () {
      return { sortType: this.__sortType, sortAsc: this.__sortAsc };
    };
    s._$setInitSort = function (e, t) {
      this.__sortType = e;
      this.__sortAsc = t;
      for (var n in this.__btnsMap) this.__setBtnInitState(this.__btnsMap[n]);
      this.__selectSortBtnHandle(e, !1);
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '1f83f8e3c9352095fd466c5ef180fb8d',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      s,
      r = 'ck-forumCache',
      c = 20;
    i._$$COM_Cache_ForumCache = NEJ.C();
    s = i._$$COM_Cache_ForumCache._$extend(i._$$COM_Cache);
    s._$getForumInfo = function (e) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumInfo',
        param: [e],
        onload: this.__onGetForumInfo._$bind(this),
      });
    };
    s.__onGetForumInfo = function (e) {
      this._$dispatchEvent('onGetForumInfo', e);
    };
    s._$getForumListByTermId = function (e, t, n) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumListByTermId',
        param: [e, t, n],
        onload: this.__onGetForumListByTermId._$bind(this),
      });
    };
    s.__onGetForumListByTermId = function (e) {
      if (e) {
        var t = e[0];
        e[0] = e[1];
        e[1] = e[2];
        e[2] = t;
        if (e[4] && e[4].type == o.CONST.FORUM_TYPE_ELITE) {
          t = e[4];
          e.splice(4, 1);
          e.splice(3, 0, t);
        }
        this._$dispatchEvent('onGetForumListByTermId', e);
      }
    };
    s._$getForumByIdWithChildrens = function (e, t, n, i) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumByIdWithChildrens',
        param: [e, t, n, i],
        onload: this.__onGetForumByIdWithChildrens._$bind(this),
      });
    };
    s.__onGetForumByIdWithChildrens = function (e) {
      this._$dispatchEvent('onGetForumByIdWithChildrens', e);
    };
    s._$getUserFollowedPosts = function (e, t, n, i) {
      this._$postDWR({
        key: r + a,
        url: 'PostBean.getUserFollowedPosts',
        param: [e, t, n, c],
        onload: this.__onGetUserFollowedPosts._$bind(this, i),
      });
    };
    s.__onGetUserFollowedPosts = function (e, t) {
      this._$dispatchEvent('onGetUserFollowedPosts', t, e);
    };
    s._$getAllPostsPagination = function (e, t, n, i, o, s) {
      this._$postDWR({
        key: r + a,
        url: 'PostBean.getAllPostsPagination',
        param: [e, t, n, i, c, o, s || null],
        onload: this.__onGetAllPostsPagination._$bind(this),
      });
    };
    s.__onGetAllPostsPagination = function (e) {
      this._$dispatchEvent('onGetAllPostsPagination', e);
    };
    s._$getForumNavi = function (e, t, n, i) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumNavi',
        param: [e, t, n, i],
        onload: this.__onGetForumNavi._$bind(this),
      });
    };
    s.__onGetForumNavi = function (e) {
      this._$dispatchEvent('onGetForumNavi', e);
    };
    s._$getMocMemberTrim = function (e) {
      this._$postDWR({
        key: r + a,
        url: 'MemberBean.getMocMemberTrim',
        param: [e],
        onload: this.__onGetMocMemberTrim._$bind(this),
      });
    };
    s.__onGetMocMemberTrim = function (e) {
      this._$dispatchEvent('onGetMocMemberTrim', e);
    };
    s._$searchMocForum = function (e, t) {
      e = NEJ.X(e || {}, { highlight: !0 });
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.searchMocForum',
        notShowLoading: !0,
        param: [e, t],
        onload: this.__onSearchMocForum._$bind(this),
      });
    };
    s.__onSearchMocForum = function (e) {
      this._$dispatchEvent('onSearchMocForum', e);
    };
    s._$getMocForumDto = function (e) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getMocForumDto',
        param: [e],
        onload: this.__ongetMocForumDto._$bind(this),
      });
    };
    s.__ongetMocForumDto = function (e) {
      this._$dispatchEvent('ongetMocForumDto', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '93828627ddb358ed890cb65967a0c1de',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'ec5f286cece29e66b88a702d2943a530',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c,
      d;
    var l = i._$pushCSSText(
      '    \t\t.#<uispace> .rinfobox{padding:30px 0 10px 0; border-bottom:1px solid #eee;}    \t\t.#<uispace> .allbox{margin-bottom:20px;}    \t\t',
    );
    var _ = i._$addNodeTemplate(
      '<div>\t\t    <div class="j-post"></div>\t\t    <div class="j-banState"></div>\t\t    <div class="rinfobox f-cb">\t\t        <h4 class="j-reply-info f-fl"></h4>\t\t        <div class="j-reply-sort f-fr"></div>\t\t    </div>\t\t\t<div class="j-reply-all allbox"></div>\t\t    <div class="j-reply-add"></div>\t\t</div>',
    );
    r._$$ForumDetailUI = NEJ.C();
    c = r._$$ForumDetailUI._$extend(r._$$UIBase, !0);
    d = r._$$ForumDetailUI._$supro;
    c.__initXGui = function () {
      this.__seed_html = _;
      this.__seed_css = l;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__postNode = i._$getByClassName(this.__body, 'j-post')[0];
      this.__replyInfoNode = i._$getByClassName(this.__body, 'j-reply-info')[0];
      this.__replySortNode = i._$getByClassName(this.__body, 'j-reply-sort')[0];
      this.__replyAllNode = i._$getByClassName(this.__body, 'j-reply-all')[0];
      this.__replyAddNode = i._$getByClassName(this.__body, 'j-reply-add')[0];
      this.__banStateNode = i._$getByClassName(this.__body, 'j-banState')[0];
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent(
        'oncheckUserBannedList',
        this.__onCheckForumIsJustShow._$bind(this, -1, 'banned'),
      );
      this.__ForumListCache = new s._$$COM_Cache_ForumCache();
      this.__ForumListCache._$addEvent(
        'ongetMocForumDto',
        this.__onCheckForumIsJustShow._$bind(this, -1, 'close'),
      );
    };
    c.__onSortChange = function (e) {
      if (this.__replyPool && e) this.__replyPool._$changeSortType(e.sortType, e.sortAsc);
    };
    c.__onBanned = function () {
      i._$scrollTo(this.__banStateNode);
    };
    c.__onReplyHandle = function () {
      if (this.__addReply) {
        this.__addReply._$clearCtAndAnony(!0);
        i._$scrollTo(this.__addReply._$getBody());
      } else if (this.__isJustShow > 0) this.__onBanned();
    };
    c.__onDelItem = function () {
      this.__postVo.countReply -= 1;
      this.__showReplyTotal();
    };
    c.__updateReplyCountHandle = function (e) {
      this.__postVo.countReply = e;
      this.__showReplyTotal();
    };
    c.__showReplyTotal = function () {
      this.__replyInfoNode.innerText =
        window.moocConfig.lang.KEY_LEARN_TOTAL +
        ' ' +
        (this.__postVo.countReply || 0) +
        ' ' +
        window.moocConfig.lang.KEY_LEARN_REPLIES;
    };
    c.__submitCb = function (t) {
      this.__postUI._$followStatusHandle(!0);
      this.__replyPool._$genUIItem(t);
      this.__postVo.countReply += 1;
      this.__showReplyTotal();
      if (!e.isPreview)
        r._$trackEvent('forum', 'answerPost', r._$convertToJSONHex(this.__buildBaseGAData()));
    };
    c.__buildBaseGAData = function () {
      var t = {
        userId: r._$getWebUser().id,
        courseId: e.courseDto.id,
        termId: this.__postVo.termId,
        postId: this.__postVo.id,
        postType: this.__postVo.type,
      };
      if (this.__postVo.relateUnit) {
        t['lessonId'] = this.__postVo.relateUnit.lessonId;
        t['unitId'] = this.__postVo.relateUnit.id;
      }
      return t;
    };
    c.__trackVoteInfoData = function (t) {
      if (!e.isPreview) {
        var n = this.__buildBaseGAData();
        NEJ.X(n, t);
        r._$trackEvent('forum', 'vote', r._$convertToJSONHex(n));
      }
    };
    c.__onGenPostUI = function () {
      this.__isJustShow = r._$isForumJustShow();
      this.__postUI = r._$$PostItem._$allocate({
        parent: this.__postNode,
        postVo: this.__postVo,
        onReply: this.__onReplyHandle._$bind(this),
        onVote: this.__trackVoteInfoData._$bind(this),
        onBanned: this.__onBanned._$bind(this),
      });
      this.__sortUI = r._$$TalkSortItem._$allocate({
        parent: this.__replySortNode,
        showTypes: ['gmt_create', 'vote_count'],
        sortType: this.__initSortType,
        sortAsc: this.__initAsc,
        onSortChange: this.__onSortChange._$bind(this),
      });
      this.__replyPool = r._$$ReplyPool._$allocate({
        parent: this.__replyAllNode,
        postVo: this.__postVo,
        sortType: this.__initSortType,
        sortAsc: this.__initAsc,
        updateCount: this.__updateReplyCountHandle._$bind(this),
        onDelItem: this.__onDelItem._$bind(this),
        onAddCmtItem: function (t) {
          this.__postUI._$followStatusHandle(!0);
          if (!e.isPreview) {
            var n = this.__buildBaseGAData();
            n['replyId'] = t.id;
            r._$trackEvent('forum', 'commentReply', r._$convertToJSONHex(n));
          }
        }._$bind(this),
        onVote: this.__trackVoteInfoData._$bind(this),
        onBanned: this.__onBanned._$bind(this),
      });
      if (this.__isJustShow < 0)
        this.__addReply = r._$$AddReply._$allocate({
          parent: this.__replyAddNode,
          postId: this.__postVo.id,
          termId: this.__postVo.termId,
          submitCallback: this.__submitCb._$bind(this),
        });
      else if (this.__isJustShow > 1)
        this.__banStateNode.innerHTML = i._$getHtmlTemplate('jst-edu-' + this.__isJustShow, {
          lang: (window.moocConfig || {}).lang || {},
        });
      this.__forumDetailCache._$addBrowseCount(this.__postVo.id);
      this.__forumDetailCache._$clearUnreadCount(this.__postVo.id, this.__postVo.termId);
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__forumData = t.forumData || {};
      this.__termId = t.termId || e.termDto.id;
      this.__ForumListCache._$getMocForumDto(
        this.__forumData.subForumId > 0 ? this.__forumData.subForumId : this.__forumData.forumId,
      );
      this.__forumDetailCache._$checkUserBannedList(this.__termId);
      this.__sentinel = 2;
      this.__postVo = t.postVo;
      this.__initSortType = 'gmt_create';
      this.__initAsc = 'desc';
      this.__banStateNode.innerHTML = '';
    };
    c.__onCheckForumIsJustShow = function (t, n, i) {
      if (i)
        if ('banned' == n) e.bannedState = { site: i[0], term: i[1] };
        else if ('close' == n) {
          e.mergedClosedStatus = i.mergedClosedStatus;
          e.forumType = i.type;
        }
      this.__sentinel += t;
      if (!(this.__sentinel > 0)) this.__onGenPostUI();
    };
    c.__clearUI = function () {
      if (this.__postUI) this.__postUI = r._$$PostItem._$recycle(this.__postUI);
      if (this.__sortUI) this.__sortUI = r._$$TalkSortItem._$recycle(this.__sortUI);
      if (this.__replyPool) this.__replyPool = r._$$ReplyPool._$recycle(this.__replyPool);
      if (this.__addReply) this.__addReply = r._$$AddReply._$recycle(this.__addReply);
    };
    c.__destroy = function () {
      this.__clearUI();
      this.__supDestroy();
    };
  },
  'f89bf7955a392302db95e1359fe83de6',
  '919745c60678236fdf2cbf9d4a1b416e',
  'd550f98719e03a495e71e818d9e95af6',
  '0a60a58976df980417d408dd43f51aac',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '1f83f8e3c9352095fd466c5ef180fb8d',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '342ad7ae4eea50c3cad860686650a915',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
);
EDU(
  '7872629f0fb778433629a1d520d03d44',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('nej.u'),
      c;
    var d = i._$pushCSSText(
      '        .#<uispace> .unitctBox{padding:20px;}        .#<uispace> .forumEnter{display:block;margin-bottom:10px;}        ',
    );
    a._$$ForumUnit = NEJ.C();
    c = a._$$ForumUnit._$extend(a._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate('jst-lessonForumUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__unitctBoxNode = i._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__forumEnterNode = i._$getByClassName(this.__body, 'j-forumEnter')[0];
      o._$addEvent(this.__forumEnterNode, 'click', this.__handleForumEnter._$bind(this));
      this.__contentCache = new s._$$COM_Cache_CourseCtCache();
    };
    c.__handleForumEnter = function () {
      e.dispatcher._$redirect(a.umi('learnForumPanel') + '?id=' + this.__resourceVo.post.forumId);
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__unitVo = t.unitVo;
      this.__resourceVo = t.resourceVo;
      this.__detailUI = a._$$ForumDetailUI._$allocate({
        parent: this.__unitctBoxNode,
        postVo: this.__resourceVo.post,
        forumData: { forumId: e.lessonForumId || '' },
        termId: this.__unitVo.termId,
      });
      if (!e.isPreview) {
        var n = {
          userId: a._$getWebUser().id,
          courseId: e.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          postId: this.__unitVo.contentId,
        };
        a._$trackEvent('forumUnit', 'view', a._$convertToJSONHex(n));
        a._$log2Study('forumUnit', 'view', n);
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: !0,
          contentType: 6,
        });
      }
    };
    c.__destroy = function () {
      if (this.__detailUI) this.__detailUI = a._$$ForumDetailUI._$recycle(this.__detailUI);
      this.__supDestroy();
    };
  },
  'ec5f286cece29e66b88a702d2943a530',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ad72e09e8978dc83423b503971b6294c',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '342ad7ae4eea50c3cad860686650a915',
  'bf8d09e46d2369efd6e41b29fe211330',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  'f8d67315026aca254304d36bea9d9d34',
  function (e, t, n, i, o, a, s, r, c, d, l, _, u, f) {
    var h = window,
      p = NEJ.P('nej.e'),
      m = NEJ.P('nej.v'),
      b = NEJ.P('edu.d'),
      g = NEJ.P('edu.u'),
      v = NEJ.P('nej.u'),
      E;
    var w =
      '<span class="f-icon" style="display:inline-flex;vertical-align:middle"><svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.333 2.667H21.333L26.667 8V27.333C26.667 28.438 25.771 29.333 24.667 29.333H7.333C6.229 29.333 5.333 28.438 5.333 27.333V4.667C5.333 3.562 6.229 2.667 7.333 2.667Z" fill="white" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><path d="M16 10L18.06 14.173L22.667 14.843L19.333 18.092L20.12 23.333L16 20.833L11.88 23.333L12.667 18.092L9.333 14.843L13.94 14.173L16 10Z" fill="white" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></span>';
    l.batch(_);
    var y = s._$parseUrlParams(window.location.search);
    var x = !!y.appId;
    g._$$LessonDetailUI = NEJ.C();
    E = g._$$LessonDetailUI._$extend(g._$$UIBase, !0);
    var T = p._$pushCSSText(
      '        .previewAIBox { display:flex; flex-direction:column; align-items:flex-end; margin-top:12px; }        .previewAIContentSwitch .j-switch{ margin-left:12px }        .previewAIContentSwitch .j-switch .ux-check-switcher{ width:40px; height:20px;}        .previewAIContentSwitch .j-switch .ux-check-switcher-round { width:20px; height:20px; border-radius:50%; }        .previewAIContentSwitch {display:flex;align-items:center;margin-bottom: 12px;}        .previewAIContentSwitch .switchText{font-size:14px}        .j-askt{ margin-left: 32px; }    ',
    );
    E.__initXGui = function () {
      this.__seed_html = p._$addNodeTemplate(
        p._$getHtmlTemplate('jst-lessonDetail', {
          lang: (window.moocConfig || {}).lang || {},
          isCertifiedPreview: window.isCertifiedPreview,
        }),
      );
      this.__seed_css = T;
    };
    E.__initNode = function () {
      this.__supInitNode();
      this.__lsemptyNode = p._$getByClassName(this.__body, 'j-empty')[0];
      this.__lscontentNode = p._$getByClassName(this.__body, 'j-lscontent')[0];
      this.__askTeacherNode = p._$getByClassName(this.__body, 'j-askt')[0];
      this.__breadCrumbNode = p._$getByClassName(this.__body, 'j-breadcb')[0];
      this.__unithelplinkNode = p._$getByClassName(this.__body, 'j-unithelplink')[0];
      this.__unitJoinQa = p._$getByClassName(this.__body, 'j-unitQanything')[0];
      this.__unitctNode = p._$getByClassName(this.__body, 'j-unitct')[0];
      this.__pageLeftNode = p._$getByClassName(this.__body, 'page-icon-left')[0];
      this.__pageRightNode = p._$getByClassName(this.__body, 'page-icon-right')[0];
      this.__learningPlanNode = p._$getByClassName(this.__body, 'j-learning-plan')[0];
      this.__unitsListNode = p._$getByClassName(this.__body, 'j-unitslist')[0];
      if (window.isCertifiedPreview) {
        this.__previewAIContentSwitchNode = p._$getByClassName(this.__body, 'j-switch')[0];
        this.__previewAIBox = p._$getByClassName(this.__body, 'previewAIBox')[0];
      }
      this.__contentCache = new b._$$COM_Cache_CourseCtCache();
      this.__contentCache._$addEvent('onGetLessonUnitVo', this.__onGetLessonUnitCb._$bind(this));
      this.__courseCache = new b._$$COM_Cache_CourseCache();
      this.__courseCache._$addEvent('onCheckTermLearn', this.__onCheckTermLearnCb._$bind(this));
    };
    E.__genUnitsNav = function () {
      var e = '';
      this.__navUnitsMap = {};
      this.__navUnitsIdArr = [];
      var t = this.__lessonVo.units.length;
      var n = 100 / t;
      v._$forEach(
        this.__lessonVo.units,
        function (t, n) {
          this.__navUnitsMap[t.id] = { vo: t };
          this.__navUnitsIdArr.push(t.id);
          var i,
            o = '',
            a = 'f-icon ',
            s = '',
            r = '';
          switch (t.contentType) {
            case g.CONST.LESSONUNIT_VIDEO:
              i = window.moocConfig.lang.KEY_LEARN_VIDEO;
              a += 'u-icon-video2';
              break;
            case g.CONST.LESSONUNIT_PDF:
              i = window.moocConfig.lang.KEY_LEARN_DOCUMENT;
              a += 'u-icon-doc';
              break;
            case g.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
              i = '互动课件';
              s = w;
              break;
            case g.CONST.LESSONUNIT_TEXT:
              i = window.moocConfig.lang.KEY_LEARN_RICH_TEXT;
              a += 'u-icon-text';
              break;
            case g.CONST.LESSONUNIT_QUESTION:
              i = window.moocConfig.lang.KEY_LEARN_QUIZ_QUESTIONS;
              a += 'u-icon-test3';
              break;
            case g.CONST.LESSONUNIT_DISCUSS:
              i = window.moocConfig.lang.KEY_LEARN_DISCUSS;
              a += 'u-icon-discuss2';
              break;
            case g.CONST.LESSONUNIT_LIVE:
              i = window.moocConfig.lang.KEY_LEARN_LIVE;
              a += 'u-icon-icon-live2';
              r = '<span class="live-replay-text live-replay-text-' + t.id + '" >' + o + '</span>';
              break;
            case 10:
              i = window.moocConfig.lang.KEY_LEARN_MUSIC_VIDEO;
              a += 'u-icon-music-video';
              break;
            case 11:
            case 12:
              i = window.moocConfig.lang.KEY_LEARN_MUSIC_EXERCISE;
              a += 'u-icon-music-exercise';
          }
          e +=
            '<li class="f-fl" title="' +
            i +
            '：' +
            v._$escape(t.name) +
            '" data-id=' +
            t.id +
            '" data-contentid=' +
            t.contentId +
            '>' +
            (s || '<span class="' + a + '"></span>') +
            (r || '<span class="unit-name">' + v._$escape(t.name)) +
            '</li>';
        }._$bind(this),
      );
      this.__unitsListNode.innerHTML = e;
      if (!this.hasEntry) {
        this.hasEntry = !0;
        m._$addEvent(this.__pageLeftNode, 'click', this.__onChangePage._$bind(this, -1));
        m._$addEvent(this.__pageRightNode, 'click', this.__onChangePage._$bind(this, 1));
      }
      this.screenPage = this.screenPage || 1;
      var i = this.__unitsListNode.scrollWidth;
      this.onePageWidth = this.__unitsListNode.clientWidth;
      this.screenPageTotal = Math.ceil(i / this.onePageWidth);
      this.__resetPage();
      var o = p._$getChildren(this.__unitsListNode);
      v._$forEach(
        o,
        function (e, t) {
          var n = parseInt(p._$dataset(e, 'id'));
          this.__navUnitsMap[n]['navNode'] = e;
          this.__doInitDomEvent([
            [e, 'click', this.__onRedirectUnit._$bind(this, n, this.__lessonVo.units[t])],
          ]);
          if (this.__curNavId == n) p._$addClassName(e, 'current');
        }._$bind(this),
      );
    };
    E.__resetPage = function () {
      if (1 === this.screenPage) this.__unitsListNode.style.transform = 'translateX(0)';
      if (this.screenPage > 1) this.__pageLeftNode.style.display = 'block';
      else this.__pageLeftNode.style.display = 'none';
      if (this.screenPage === this.screenPageTotal) this.__pageRightNode.style.display = 'none';
      else this.__pageRightNode.style.display = 'block';
    };
    E.__onChangePage = function (e) {
      this.screenPage = this.screenPage + e;
      this.__resetPage();
      this.__unitsListNode.style.transform =
        'translateX(' + -this.onePageWidth * (this.screenPage - 1) + 'px)';
    };
    E.__onRedirectNextVideo = function (e) {
      console.log('__proLessonDetailUI.__onRedirectNextVideo');
      if (e && e.id && e.lessonId)
        h.dispatcher._$redirect(
          g.umi('learnContent') + '?type=detail&id=' + e.lessonId + '&cid=' + e.id + '&replay=true',
        );
      else;
    };
    E.__onRedirectReplay = function () {
      h.dispatcher._$redirect(
        g.umi('learnContent') +
          '?type=detail&id=' +
          this.__lessonVo.id +
          '&cid=' +
          this.__curNavId +
          '&replay=true',
        { force: !0 },
      );
    };
    E.__onRedirectUnit = function (e, t) {
      g._$trackEvent('selectUnit', 'click', '点击课时内部Tab, unitId:' + e);
      if (!this.__curNavId || this.__curNavId != e)
        if (!t.live || t.live.cdnMode != i.OUT_LIVE)
          h.dispatcher._$redirect(
            g.umi('learnContent') +
              '?type=detail&id=' +
              this.__lessonVo.id +
              '&cid=' +
              e +
              '&contentid=' +
              t.contentId,
          );
        else if (window.isPreview)
          window.open(
            '/learn/preview/outsideLive.htm?termId=' +
              this.__lessonVo.termId +
              '&roomId=' +
              t.live.relatedLiveId,
          );
        else window.open('/learn/outsideLive.htm?id=' + t.live.id);
    };
    E.__onNavUnitContent = function (e) {
      var t = this.__navUnitsMap[e];
      if (t) {
        var n = t['navNode'];
        var i = t['vo'];
        p._$delClassName(this.__navUnitsMap[this.__curNavId]['navNode'], 'current');
        p._$addClassName(n, 'current');
        if ((!g._$isUserLogin() || 0 == h.isEnroll) && 5 == i.contentType)
          this.__onGetLessonUnitCb();
        else {
          this.__renderPreviewAIContentSwitchUI(null);
          this.__contentCache._$getLessonUnitVo(i.contentId, i.contentType, h.isPreview, i.id);
        }
      } else
        g._$$CommonDialog._$showDialog({
          type: 1,
          message: window.moocConfig.lang.KEY_LEARN_COURSE_WARES_NOT_EXISTS,
          modal: !0,
        });
    };
    E.__initVideoUnitUI = function (e) {
      e = e || {};
      var t = e.resourceVo || {};
      var n = e.unitVo || {};
      DATracker.track('视频播放页展示', {
        pagename: 'videolearn',
        course_id: window.courseCardDto ? window.courseCardDto.id : '',
        user_id: window.webUser ? window.webUser.id : '',
        video_id: t.videoVo ? t.videoVo.videoId : '',
        unitId: n ? n.id : '',
        version: 'old',
        learnmode: window.courseCardDto ? window.courseCardDto.studyMode : '',
      });
      if (this.__videoUnitUI) this.__videoUnitUI = g._$$VideoUnit._$recycle(this.__videoUnitUI);
      if (this.__playFromStart) t.videoLearnTime = 0;
      this.__videoUnitUI = g._$$VideoUnit._$allocate({
        parent: e.parent || this.__unitctNode,
        unitVo: e.unitVo,
        isLiveVideo: e.isLiveVideo,
        resourceVo: t,
        onSwitchPlayer: (
          e.onSwitchPlayer ||
          function () {
            this.__contentCache._$getLessonUnitVo(n.contentId, n.contentType, h.isPreview, n.id);
          }
        )._$bind(this),
        autoNext: this.__onRedirectNextVideo._$bind(this),
        replay: this.__onRedirectReplay._$bind(this),
        onGetResourceTokenError: this.__onGetResourceTokenError._$bind(this),
        onFullscreenChange: function () {
          r._$renderGLobalAIButton(
            {
              pageType: n.contentType,
              sceneType: r.SCENE_TYPE.NORMAL,
              termId: n.termId,
              courseId: window.courseDto && window.courseDto.id,
              courseName: window.courseDto && window.courseDto.name,
              chapterId: n.chapterId,
              lessonId: n.lessonId,
              unitId: n.id,
            },
            document.querySelector('#j-global-ai-robot'),
          );
        }._$bind(this),
        getPreviewAIStatusCb: function (e) {
          this.__aiStatusObj = NEJ.X({}, this.__aiStatusObj, e);
          this.__renderPreviewVideoAIGCStatusText();
        }._$bind(this),
        showAIGC: this.__showAIGC,
      });
    };
    E.__onGetResourceTokenError = function (e) {
      this._liveUnitUI && this._liveUnitUI.onGetResourceTokenError(e);
    };
    E.__renderPreviewVideoAIGCStatusText = function () {
      var e = '',
        t,
        n;
      var i = Object.keys(this.__aiStatusObj);
      var o = { aiSegmentStatus: '分段', aiSummaryStatus: '概要', aiSubtitleStatus: '字幕' };
      var a = function (e, a) {
        var s = '';
        for (t = 0, n = 0; t < i.length; t++)
          for (var r = 0; r < e.length; r++)
            if (this.__aiStatusObj[i[t]] == e[r]) {
              n++;
              if (1 != n) s += '、';
              s += o[i[t]];
              break;
            }
        if (n) return s + a;
        else return '';
      }._$bind(this);
      var s = [
        a([g.CONST.AI_STATUS.GENERATE_COMPLETE], '生成成功'),
        a(
          [
            g.CONST.AI_STATUS.NOT_COMMIT,
            g.CONST.AI_STATUS.NO_GENERATE,
            g.CONST.AI_STATUS.GENERATING,
          ],
          '生成中',
        ),
        a([g.CONST.AI_STATUS.GENERATE_ALL_FAIL, g.CONST.AI_STATUS.UNABLE_TO_HANDLE], '生成失败'),
      ];
      for (t = 0, n = 0; t < s.length; t++)
        if ('' != s[t]) {
          n++;
          if (1 != n) e += ',';
          e += s[t];
        }
    };
    E.__renderPreviewAIContentSwitchUI = function (e) {
      if (this.__previewAIContentSwitchUI) this.__previewAIContentSwitchUI.destroy();
      if (this.__previewAIBox) this.__previewAIBox.style.display = 'none';
      if (e && window.isCertifiedPreview && e.contentType == g.CONST.LESSONUNIT_VIDEO) {
        this.__previewAIBox.style.display = 'block';
        this.__previewAIContentSwitchUI = new n({
          data: {
            status: this.__showAIGC > 0 ? !0 : !1,
            openText: '',
            closeText: '',
            disable: !window.canModifyCertifiedPreview || this.__showAIGC == -1 ? !0 : !1,
          },
        })
          .$inject(this.__previewAIContentSwitchNode)
          .$on(
            'toggle',
            function (t) {
              if (window.canModifyCertifiedPreview) {
                var n = this.__previewAIContentSwitchUI.data.status;
                this.__courseCache._$switchTermAI(
                  {
                    termId: this.__lessonVo.termId,
                    switchType: 2,
                    targetId: e.id,
                    status: t ? 1 : 0,
                  },
                  function (e) {
                    console.log(e);
                  },
                  function () {
                    this.__previewAIContentSwitchUI.data.status = n;
                    this.__previewAIContentSwitchUI.$update();
                  }._$bind(this),
                );
              }
            }._$bind(this),
          );
      }
    };
    E.__onGetLessonUnitCb = function (n) {
      var i = this;
      var a = this.__navUnitsMap[this.__curNavId]['vo'];
      this.__clearUIs();
      r._$renderGLobalAIButton(
        {
          pageType: a.contentType,
          sceneType: r.SCENE_TYPE.NORMAL,
          termId: a.termId,
          courseId: window.courseDto && window.courseDto.id,
          courseName: window.courseDto && window.courseDto.name,
          chapterId: a.chapterId,
          lessonId: a.lessonId,
          unitId: a.id,
        },
        document.querySelector('#j-global-ai-robot'),
      );
      this.__breadCbUI = g._$$LessonBreadCrumb._$allocate({
        parent: this.__breadCrumbNode,
        lessonVo: this.__lessonVo,
        chapterVo: this.__chapterVo,
        mocTermDto: this.__mocTermDto,
      });
      this.__createHelpLink(a);
      if (a.contentType !== g.CONST.LESSONUNIT_LIVE || !g._$isMobile()) {
        if (this.__LessonJoinQa) this.__LessonJoinQa.destroy();
        if (1 == window.termDto.studyVipFlag || 1 == window.termDto.supportAiCapabilityFlag) {
          var s = document.getElementById('AITool');
          var l = 'LearnAITool';
          var _ = document.querySelector('.m-lessonDetail');
          if (a.contentType === g.CONST.LESSONUNIT_VIDEO) {
            String.prototype.replace = window.moocTempReplace;
            String.prototype.match = window.moocTempMatch;
            window.reactComponentLoadBootstrap.setFtlData({
              lessonUnitId: a.id,
              termId: a.termId,
              isPreview: !!window.isPreview,
            });
            if (window.renderReactComponent && window.renderReactComponent[l]) {
              var u = window.renderReactComponent[l];
              u.render(u.component, u.initialState, s);
            } else
              window.reactComponentLoadBootstrap.init(
                { name: l, container: s },
                { lessonUnitId: a.id },
              );
          } else {
            window.renderReactComponent &&
              window.renderReactComponent.ReactDOM.unmountComponentAtNode(s);
            _.style.width = '100%';
          }
        }
        switch (a.contentType) {
          case g.CONST.LESSONUNIT_VIDEO:
            p._$addClassName(p._$getByClassName(document, 'm-lessonDetail')[0], 'videoDetail');
            if (window.isCertifiedPreview || window.isCertifiedNotPreview)
              t._$getTermAiSwitchStatus(
                { termId: window.termDto.id, switchType: 2, targetId: a.id },
                function (e) {
                  this.__showAIGC = e;
                  this.__renderPreviewAIContentSwitchUI(a);
                  this.__initVideoUnitUI({ unitVo: a, resourceVo: n });
                }._$bind(this),
              );
            else this.__initVideoUnitUI({ unitVo: a, resourceVo: n });
            break;
          case g.CONST.LESSONUNIT_PDF:
            p._$delClassName(this.__unitJoinQa, 'f-dn');
            this.__LessonJoinQa = new e({ data: { unitId: a.id } }).$inject(this.__unitJoinQa);
            this.__pdfUnitUI = g._$$PdfUnit._$allocate({
              parent: this.__unitctNode,
              outNode: this.__unithelplinkNode,
              qaNode: this.__unitJoinQa,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case g.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
            this.__initInteractiveCoursewareUnitUI(n, a);
            break;
          case g.CONST.LESSONUNIT_TEXT:
            this.__richUnitUI = g._$$RichTextUnit._$allocate({
              parent: this.__unitctNode,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case g.CONST.LESSONUNIT_QUESTION:
            this.__testUnitUI = g._$$TestUnit._$allocate({
              parent: this.__unitctNode,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case g.CONST.LESSONUNIT_DISCUSS:
            this.__forumUnitUI = g._$$ForumUnit._$allocate({
              parent: this.__unitctNode,
              unitVo: a,
              resourceVo: n,
            });
            break;
          case 10:
          case 11:
          case 12:
            this.__musicUnitUI = new o().$inject(this.__unitctNode);
            break;
          case g.CONST.LESSONUNIT_LIVE:
            this.__recordCount = 1;
            console.log('_unitVo', a);
            var f = document.body.getAttribute('style');
            document.body.setAttribute('style', 'overflow: auto !important;' + f || '');
            this._liveUnitUI = new c({ data: { liveId: a.contentId } })
              .$on(c.CONST.EVENTS.SHOULD_UPDATE_LIVE_INFO, function (e) {
                window.liveInfo = a.live ? a.live : {};
                d._$getLiveInfo({ liveContentId: a.contentId, isNeedDetail: 1 }, e);
              })
              .$on(c.CONST.EVENTS.SHOULD_UPDATE_PLAY_BACK_VIDEO_DATA, function (e) {
                var t = p._$getByClassName(i.__body, 'live-replay-text-' + a.id);
                if (t && t[0]) g._$showNode(t[0]);
                e && e();
              })
              .$on(c.CONST.EVENTS.AFTER_UPDATE_PLAY_BACK_VIDEO_DATA, function (e) {
                i._liveUnitUI.$refs.liveWrapBox.innerHTML = '';
                i._liveUnitUI.$refs.liveWrap.destroy();
                i._liveUnitUI.data.maxWidth = c.CONST.WIDTH.PLAYBACK_MAX_WIDTH;
                i.__initVideoUnitUI({
                  parent: i._liveUnitUI.$refs.liveWrapBox,
                  isLiveVideo: !0,
                  unitVo: a,
                });
                this.$update();
              })
              .$on(c.CONST.EVENTS.SHOULD_UPDATE_ROOM_INFO, function (e) {
                d._$getImRoomInfo({ liveContentId: a.contentId }, e);
              })
              .$on(c.CONST.EVENTS.SHOULD_SAVE_LEARN_PROGRESS, function (e) {
                var t = {
                  unitId: a.id,
                  finished: !!e.isFinished,
                  index: i.__recordCount++,
                  duration: c.CONST.TIME.MS_OF_10_SEC,
                  courseId: window.courseDto.id,
                  lessonId: a.lessonId,
                  videoId: a.contentId,
                  termId: a.termId,
                  userId: window.webUser && window.webUser.id,
                  contentType: 7,
                };
                i.__contentCache._$saveLearnInfo(t);
                t['action'] = 'LEARN_TIME_COUNT';
                i.__contentCache._$addLearnLog({
                  dt: g._$strToHexCharCode(JSON.stringify(t)).substr(2),
                  p: 'mooc',
                });
              })
              .$inject(this.__unitctNode);
        }
      } else window.location = '/live/' + a.contentId + '.htm';
    };
    E.__initInteractiveCoursewareUnitUI = function (e, t) {
      p._$addClassName(this.__unitJoinQa, 'f-dn');
      if (t && t.contentId && t.termId && t.id) {
        var n = 'LearnInteractiveCoursewarePreview';
        var i = document.createElement('div');
        i.style.width = '100%';
        i.style.height = '680px';
        this.__unitctNode.appendChild(i);
        this.__interactiveCoursewareContainer = i;
        window.reactComponentLoadBootstrap.setFtlData(
          {
            contentId: t.contentId,
            termId: t.termId,
            unitId: t.id,
            saveMocContentLearn: function (e) {
              return this.__contentCache._$saveLearnInfo(e);
            }._$bind(this),
          },
          n,
        );
        var o = function () {
          if (
            this.__interactiveCoursewareContainer === i &&
            window.renderReactComponent &&
            window.renderReactComponent[n]
          ) {
            var e = window.renderReactComponent[n];
            e.render(e.component, e.initialState, i);
          }
        }._$bind(this);
        if (window.renderReactComponent && window.renderReactComponent[n]) o();
        else
          window.reactComponentLoadBootstrap.init(
            { name: n, container: i },
            {},
            { loadSuccessCb: o },
          );
      } else
        g._$$CommonDialog._$showDialog({
          type: 1,
          message: '互动课件参数不完整，暂无法预览',
          modal: !0,
        });
    };
    E.__createHelpLink = function (e) {
      var t = JSON.parse(e.jsonContent || '{}');
      this.__unithelplinkNode.innerHTML = '';
      switch (e.contentType) {
        case g.CONST.LESSONUNIT_VIDEO:
          break;
        case g.CONST.LESSONUNIT_PDF:
          this.__unithelplinkNode.innerHTML =
            '<div class="pdf-helplink"><p class="u-helplink u-helplinkpdf">' +
            window.moocConfig.lang.KEY_LEARN_THE_CAN +
            ' <a class="f-fcgreen" href="/help/help.htm#/hf?t=2&i=2" target="_blank">' +
            window.moocConfig.lang.KEY_LEARN_VIEW_HELP +
            '</a></p><a class="j-downpdf downpdf u-btn u-btn-sm " target="_blank">' +
            window.moocConfig.lang.KEY_LEARN_DOCUMENT_DOWNLOAD +
            '</a></div>';
          break;
        case g.CONST.LESSONUNIT_TEXT:
          if (t.fileName && t.nosKey)
            this.__unithelplinkNode.innerHTML =
              '<a class="j-downtxt downpdf u-btn u-btn-sm f-fr" href="/course/attachment.htm?fileName=' +
              encodeURIComponent(t.fileName) +
              '&nosKey=' +
              encodeURIComponent(t.nosKey) +
              '" target="_blank">' +
              window.moocConfig.lang.KEY_LEARN_DOWNLOAD_ATTACHMENTS +
              '</a>';
      }
    };
    E.__reset = function (e) {
      console.log('reset', p._$get('courseLearn-inner-box'));
      this.__supReset(e);
      if (this.__lessonVo && this.__lessonVo.id !== e.lessonVo.id) this.screenPage = null;
      this.__lessonVo = e.lessonVo;
      this.__chapterVo = e.chapterVo;
      this.__mocTermDto = e.mocTermDto;
      this.__aiStatusObj = {};
      this.__curNavId = parseInt(e.curNavId);
      this.__playFromStart = e.playFromStart;
      var t = courseDto && courseDto.schoolPanel && 6 == courseDto.schoolPanel.schoolType;
      var n = h.termDto.mode == g.CONST.MODE_SPOC_SYNC && this.__lessonVo.termId == h.termDto.id,
        i = 1 * h.canAskTeacher && !t;
      var o = h.qaForumId,
        a = h.moocQAForumId;
      if (a) this.__forumId = n ? o : a;
      else this.__forumId = o;
      m._$addEvent(
        this.__askTeacherNode,
        'click',
        function () {
          if (g._$isUserLogin()) this.__courseCache._$CheckTermLearn(h.termDto.id);
          else g._$$LoginDialog._$showLogin({ from: 'learn' });
        }._$bind(this),
      );
      if (i)
        this.__askTeacherNode.innerHTML =
          '<a class="u-btn u-btn-default f-fr">' +
          window.moocConfig.lang.KEY_LEARN_ASK_TEACHER +
          '</a>';
      if (this.__lessonVo.units && this.__lessonVo.units.length) {
        g._$hiddenNode(this.__lsemptyNode);
        g._$showNode(this.__lscontentNode);
        this.__genUnitsNav();
        this.__onNavUnitContent(this.__curNavId);
        this.resizeObserver = new ResizeObserver(this.__genUnitsNav._$bind(this));
        this.resizeObserver.observe(this.__unitsListNode, { box: 'border-box' });
      } else {
        g._$showNode(this.__lsemptyNode);
        g._$hiddenNode(this.__lscontentNode);
      }
    };
    E.__onCheckTermLearnCb = function (e) {
      if (e >= 0)
        h.location.hash =
          '#' + g.umi('learnForumTopic') + '?fid=' + this.__forumId + '&lid=' + this.__curNavId;
      else {
        if (this.__attendCourseModal) this.__attendCourseModal.destroy();
        this.__attendCourseModal = new u();
      }
    };
    E.__clearUIs = function () {
      p._$delClassName(p._$getByClassName(document, 'm-lessonDetail')[0], 'videoDetail');
      p._$delClassName(p._$getByClassName(document, 'learnPageContentRight')[0], 'hide');
      console.log('lessonDetail __clearUIs');
      if (this.videoDataTimer) clearImmediate(this.videoDataTimer);
      if (this.__videoUnitUI) this.__videoUnitUI = g._$$VideoUnit._$recycle(this.__videoUnitUI);
      if (this.__pdfUnitUI) this.__pdfUnitUI = g._$$PdfUnit._$recycle(this.__pdfUnitUI);
      if (this.__interactiveCoursewareContainer) {
        if (window.renderReactComponent && window.renderReactComponent.ReactDOM)
          window.renderReactComponent.ReactDOM.unmountComponentAtNode(
            this.__interactiveCoursewareContainer,
          );
        if (this.__interactiveCoursewareContainer.parentNode)
          this.__interactiveCoursewareContainer.parentNode.removeChild(
            this.__interactiveCoursewareContainer,
          );
        this.__interactiveCoursewareContainer = null;
      }
      if (this.__richUnitUI) this.__richUnitUI = g._$$RichTextUnit._$recycle(this.__richUnitUI);
      if (this.__testUnitUI) this.__testUnitUI = g._$$TestUnit._$recycle(this.__testUnitUI);
      if (this.__forumUnitUI) this.__forumUnitUI = g._$$ForumUnit._$recycle(this.__forumUnitUI);
      if (this.__musicUnitUI) this.__musicUnitUI.destroy();
      if (this.__breadCbUI) this.__breadCbUI = g._$$ForumUnit._$recycle(this.__breadCbUI);
      if (this._liveUnitUI) this._liveUnitUI.destroy();
      if (this.__outsideLiveUi) this.__outsideLiveUi.destroy();
    };
    E.__destroy = function () {
      console.log('__proLessonDetailUI.__destroy');
      this.__clearUIs();
      this.__supDestroy();
    };
  },
  'd1b339d8b948d535e1ceb88c9586d7da',
  'a936afb5ecab0e9286c3c9d05341571d',
  '1ee4132d3e572b8c83dffd6ef72c5208',
  'ef64b877c64ed4138d4b703989241671',
  '72d45d4792047bd62a782346c4fcadc1',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'fb061c769bfc74628a81f422f590544c',
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '6a55482e5dbb028d0889d49da80296ae',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '8f34a99b20d362b3542aebd517390fc1',
  '088051b8c61eef3a38d043e6c637cbb0',
  '1c23b43dfd9c054559909485b4169fa4',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '23df9936459ce00fd8c2c782b7cf7c8d',
  '78c5fa6a9e6887b200fd30c7e7e4ff5d',
  '84117c1b0fcf34c8802d9f0946d1869e',
  'be679cde8e87d7a4d28f9f32f4ee35ac',
  'e7089a68b20be110ce888f1374a52bfb',
  '7872629f0fb778433629a1d520d03d44',
  'ad72e09e8978dc83423b503971b6294c',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'aa787b31fae1d6b4be87937316849923',
  function (e, t, n, i, o, a) {
    var s = window,
      r = NEJ.O,
      c = NEJ.F,
      d = NEJ.P('nej.e'),
      l = NEJ.P('nej.v'),
      _ = NEJ.P('nej.u'),
      u = NEJ.P('edu.m'),
      f = NEJ.P('edu.d'),
      h = NEJ.P('edu.u'),
      p,
      m;
    var b = a._$parseUrlParams(window.location.search);
    var g = !!b.appId;
    u._$$LearnContent = NEJ.C();
    p = u._$$LearnContent._$extend(u._$$Module, !0);
    m = u._$$LearnContent._$supro;
    p.__getXhtml = function () {
      return d._$getHtmlTemplate('jst-edu-learnContent', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    p.__getParent = function () {
      return d._$get('courseLearn-inner-box');
    };
    p._getRecommendWrap = function () {
      return d._$get('j-recommend-content');
    };
    p.__buildFuncPoints = function () {
      m.__buildFuncPoints.apply(this, arguments);
      this.__contentCache = new f._$$COM_Cache_CourseCtCache();
      this.__contentCache._$addEvent('onGetChapterList', this.__onGetChapterList._$bind(this));
      this.__chapterListUIs = [];
      this._recommendNode = d._$get('j-recommend-content');
      this._recommendSideNode = d._$get('j-recommend-side');
      this._scrollHandler();
    };
    p.__getChapterListData = function () {
      if (this.__type == h.CONST.LEARN_TAB.CONTENT_TYPE.LIST) this.__getChapterList(s.termDto.id);
      else if (!this.__termInfoData) {
        this.__sentry = 2;
        this.__getChapterList(s.termDto.id);
      } else this.__genTypeUI();
    };
    p.__getChapterList = function (e, t) {
      var n = void 0 === s.isReview || !s.isReview ? 0 : 1;
      if (s.isPreview)
        if (t) o.getMocTermContentDraftSync(e, this.__onGetChapterList.bind(this));
        else o.getMocTermContentDraft(e, this.__onGetChapterList.bind(this));
      else if (s.webUser && 1 == s.isEnroll)
        o.getLastLearnedMocTermDto(e, this.__onGetChapterList.bind(this));
      else this.__contentCache._$getChapterList(e, n, !s.isPreview);
    };
    p.__onGetChapterList = function (e) {
      console.log('__onGetChapterList', e);
      if (!e.mocTermDto) e = { lastLearnUnitId: null, mocTermDto: e };
      this.__termInfoData = this.__termInfoData || {};
      this.__termMode =
        this.__type == h.CONST.LEARN_TAB.CONTENT_TYPE.DETAIL && this.__termMode
          ? this.__termMode
          : e.mocTermDto.mode;
      this.__termInfoData[e.mocTermDto.mode] = e;
      this.__chapterVoMap = {};
      this.__lessonVoMap = h._$isEmpty(this.__lessonVoMap) ? {} : this.__lessonVoMap;
      if (e && e.mocTermDto)
        _._$forEach(
          e.mocTermDto.chapters,
          function (e, t) {
            this.__chapterVoMap[e.id] = e;
            _._$forEach(
              e.lessons,
              function (t, n) {
                this.__lessonVoMap[t.id] = { lesson: t, chapter: e };
              }._$bind(this),
            );
          }._$bind(this),
        );
      this.__genTypeUI();
    };
    p.__genTypeUI = function () {
      switch (this.__type) {
        case h.CONST.LEARN_TAB.CONTENT_TYPE.LIST:
          this.__genChapterListUIs();
          this._updateRecommendPosition();
          break;
        case h.CONST.LEARN_TAB.CONTENT_TYPE.DETAIL:
          this.__genChapterDetailUI();
      }
    };
    p._updateRecommendPosition = function () {
      var e = function () {
        var e = [];
        for (var t in this.__chapterVoMap) e.push(t);
        return e.length;
      }._$bind(this);
      var t = this._getRecommendWrap();
      if (!e()) d._$addClassName(t, 'z-recommend-fixed');
    };
    p._isInViewPort = function (e) {
      var t =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var n = e.getBoundingClientRect() && e.getBoundingClientRect().top;
      return n <= t + 100;
    };
    p._scrollHandler = function () {
      setTimeout(
        function () {
          if (d._$hasClassName(this._recommendNode, 'z-recommend-fixed'))
            DATracker.track(window.moocConfig.lang.KEY_LEARN_RECOMMENDED_PAGE, {
              user_id: !!s.webUser && s.webUser.id,
              data_cate: window.moocConfig.lang.KEY_LEARN_RECOMMENDED_PAGE,
              data_action: 'web_course_learn_recommend_page_view',
              data_label: window.moocConfig.lang.KEY_LEARN_LEARNING_PAGE1,
              data_pagename: s.location.href,
            });
        }._$bind(this),
        50,
      );
    };
    p.__genChapterListUIs = function () {
      var e = h._$$ChapterList._$allocate({
        parent: this.__body,
        termVo: this.__termInfoData[this.__termMode].mocTermDto,
        lastLearnUnitId: this.__termInfoData[this.__termMode].lastLearnUnitId,
        moduleName: this.__moduleName,
        syncMooc: !!this.__splitUI && !this.__termMode,
      });
      this.__chapterListUIs.push(e);
      if (h._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = h._$$SpocMoocSplit._$allocate({ parent: this.__body });
        if (s.isPreview) this.__getChapterList(s.termDto.id, !0);
        else this.__getChapterList(s.moocTermDto.id);
      }
    };
    p.__genChapterDetailUI = function () {
      this.__sentry--;
      if (!(this.__sentry > 0 && h._$isSpocSync())) {
        var e = this.__lessonVoMap[this.__lessonId];
        if (e) {
          var t = this.__curNavId || e.lesson.units[0].id;
          console.log('__genChapterDetailUI _lessonInfo', e, t);
          this.__lessonDetailUI = h._$$LessonDetailUI._$allocate({
            parent: this.__body,
            lessonVo: e.lesson,
            chapterVo: e.chapter,
            mocTermDto: this.__termInfoData[this.__termMode].mocTermDto,
            curNavId: t,
            playFromStart: this.__playFromStart,
          });
        } else {
          console.log('__genChapterDetailUI fail');
          h._$$CommonDialog._$showDialog({
            type: 1,
            message: window.moocConfig.lang.KEY_LEARN_THE_EXIST,
          });
        }
      }
    };
    p.__onRedirectUnit = function (t, n, i) {
      h._$trackEvent('selectUnit', 'click', '点击课时内部Tab, unitId:' + t);
      if (!this.__curNavId || this.__curNavId != t)
        if (!n.live || n.live.cdnMode != e.OUT_LIVE)
          s.dispatcher._$redirect(h.umi('learnContent') + '?type=detail&id=' + i.id + '&cid=' + t);
        else if (window.isPreview)
          window.open(
            '/learn/preview/outsideLive.htm?termId=' + i.termId + '&roomId=' + n.live.relatedLiveId,
          );
        else window.open('/learn/outsideLive.htm?id=' + n.live.id);
    };
    p.__onShow = function (e) {
      console.log('__proLearnContent.__onShow');
      m.__onShow.apply(this, arguments);
      this.__moduleName = s.learnBigTabNames[e.target];
      this.__clearUI();
      this.__onRefresh(e);
    };
    p.__onRefresh = function (e) {
      console.log('content __onRefresh');
      m.__onRefresh.apply(this, arguments);
      this.__type = e.param.type || h.CONST.LEARN_TAB.CONTENT_TYPE.LIST;
      if (this.__type == h.CONST.LEARN_TAB.CONTENT_TYPE.DETAIL) {
        this.__lessonId = e.param.id;
        this.__curNavId = e.param.cid;
        this.__playFromStart = e.param.replay || !1;
      }
      this.__clearUI();
      if (h._$isSpocSync())
        if (1 == e.param.sm) this.__termMode = h.CONST.MODE_MOOC;
        else this.__termMode = h.CONST.MODE_SPOC_SYNC;
      if (courseCardDto && courseCardDto.mode == h.CONST.MODE_SPOC_ASYNC)
        this.__termMode = h.CONST.MODE_SPOC_ASYNC;
      if (
        courseCardDto &&
        courseCardDto.mode == h.CONST.MODE_SPOC_SYNC &&
        courseCardDto.fromCourseMode == h.CONST.MODE_SPOC_ONLY
      )
        this.__termMode = h.CONST.MODE_SPOC_ONLY;
      this.__getChapterListData();
    };
    p.__clearUI = function () {
      console.log('content clearUI', window.renderReactComponent);
      _._$forEach(
        this.__chapterListUIs,
        function (e) {
          e = h._$$ChapterList._$recycle(e);
        }._$bind(this),
      );
      this.__chapterListUIs = [];
      if (this.__splitUI) this.__splitUI = h._$$SpocMoocSplit._$recycle(this.__splitUI);
      if (this.__lessonDetailUI)
        this.__lessonDetailUI = h._$$LessonDetailUI._$recycle(this.__lessonDetailUI);
    };
    p.__onHide = function () {
      console.log('__proLearnContent.__onHide');
      this.__clearUI();
      this.__termInfoData = null;
      this.__lessonVoMap = null;
      m.__onHide.apply(this, arguments);
      d._$removeByEC(this.__body);
    };
    s.dispatcher._$loaded(h.umi('learnContent'), u._$$LearnContent);
  },
  'ef64b877c64ed4138d4b703989241671',
  '3b4b0bfe96b6f18b5667d392a02a8f9d',
  '4506823daf61ad0e7db0db8ecc157b4c',
  '93828627ddb358ed890cb65967a0c1de',
  'ad72e09e8978dc83423b503971b6294c',
  'fb061c769bfc74628a81f422f590544c',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'c1ba0a8ce6586f97db89350042a33ef5',
  'f8d67315026aca254304d36bea9d9d34',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
//# sourceMappingURL=./s/tp_learn_index_desktop_modules_learn_content.js.map
