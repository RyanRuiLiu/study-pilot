EDU(
  '39253eba71912d1492d6af7035e30738',
  function (e, t) {
    t._$getRecommend = function (t, i) {
      t.targetTypes = JSON.stringify(t.targetTypes);
      e._$request({
        url: '/web/j/recommendRPCBean.getRecommend.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    t._$contentFeedback = function (t, i) {
      e._$request({
        url: '/web/j/mocPromoFeedbackBean.contentFeedback.rpc',
        method: 'post',
        data: t,
        onload: i,
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
  function (e, t, i, n, a, o, s) {
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
        var i = this;
        this._modalUI && this._modalUI.destroy();
        this._modalUI = new n({
          data: {
            class: 'um-recommend-feedback-box-modal',
            okButton: !1,
            cancelButton: !1,
            content: o,
            title: '',
            type: null,
            optionList: [
              { value: 1, text: '不感兴趣' },
              { value: 2, text: '重复推荐过很多次' },
              { value: 3, text: '造成学习干扰' },
            ],
          },
          sendFeedback: function (e) {
            i.sendFeedback(e);
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
    var i = e.$extends({
      name: 'um-recommend-feedback-box',
      css: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '0caa45293ff72fb6f03781c0fb270351',
  '0236077441893c507217f02d62f60370',
);
EDU(
  '5884d28f94b9d858d9c5ca557e9e831a',
  function (e, t, i, n, a, o, s, r) {
    var c = window;
    var d = '';
    var _ = new r();
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
          return e && e.recommendType && e.recommendType == n.RECOMMENDATION_TYPE.TOPIC;
        },
        isColumn: function (e) {
          return e && e.recommendType && e.recommendType == n.RECOMMENDATION_TYPE.COLUMN;
        },
        goToContent: function (e) {
          if (e.infoUrl) {
            this._addLog(e);
            var t = e.infoUrl.indexOf('?') > -1 ? '&' : '?';
            var i = this.data.outVendor
              ? 'outVendor=' + this.data.outVendor
              : 'outVendor=zw_mooc_pcundefined';
            if (100 === e.recommendType && this.data.adultOutVendor) {
              i = 'outVendor=' + this.data.adultOutVendor;
              DATracker.track(d + '点击-iaw', {
                pagename: 'home',
                user_id: window.webUser ? window.webUser.id : '',
                course_id: e.courseId,
                tab_name: window.trackData ? window.trackData.tabName : '',
              });
            }
            window.open(e.infoUrl + t + i);
          } else console.warn('当前内容跳转地址有误');
        },
        _addLog: function (e) {
          if (this.data.logOpt && this.data.logOpt.eventId) {
            var t = {
              user_id: !!window.webUser && window.webUser.id,
              data_pagename: c.location.href,
            };
            t = i._$merge(t, this.data.logOpt);
            t = i._$merge(t, JSON.parse(e.logData));
            DATracker.track(t.eventId, t);
          } else console.log('请传入正确的打点事件名称');
        },
        getRecommend: function () {
          a._$getRecommend(this.data.recommendOpt, this._recommendLoad._$bind(this));
        },
        handleFeedbackBox: function (e, t, i, n) {
          console.log(t);
          e && e.stopPropagation && e.stopPropagation();
          t
            ? _.openModal(
                i,
                function () {
                  var e = [],
                    t = [];
                  for (var i = 0; i < this.data.list.length; i++)
                    if (i != n) {
                      e.push(this.data.list[i]);
                      t.push(this.data.originList[i]);
                    }
                  this.data.list = e;
                  this.data.originList = t;
                  this.$update();
                }._$bind(this),
              )
            : _.closeModal();
        },
        _recommendLoad: function (e) {
          e = e || [];
          this._formatList(e);
        },
        _formatList: function (e) {
          this.data.originList = e;
          this.data.list = o._$formatRecommendCard(e);
          for (var t = 0; t < this.data.list.length; t++) {
            var i = this.data.list[t];
            if (100 === i.recommendType)
              DATracker.track(d + '展示-iaw', {
                pagename: 'home',
                user_id: window.webUser ? window.webUser.id : '',
                course_id: i.courseId,
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
          } catch (i) {
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
  function (e, t, i, n) {
    n = e.$extends({
      name: 'um-recommend-list',
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
  '5884d28f94b9d858d9c5ca557e9e831a',
  '188ce9e691d65335efaeff1ab170374e',
  '8d55ca9f1d73879fdbef5e2d30797f6e',
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
  function (e, t, i) {
    i = e.$extends({
      name: 'um-recommend-side',
      css: t,
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return i;
  },
  '5b1a46f551ade5cafa27284058ba7da2',
  'd87ba35ddeb76d66f2d96b19b755fea3',
);
EDU(
  '4357e0744757d18da9905f552230abb4',
  function (e, t, i, n, a, o, s) {
    function r(e) {
      return e + '_' + s.constants.COMMENT_MODAL_SHOWING_COOKIE_KEY;
    }
    var c = new a.CourseComment();
    s.constants = { COMMENT_MODAL_SHOWING_COOKIE_KEY: 'cmsck', MODAL_CANCELED: '15' };
    s.getMyComment = function (e, t) {
      c.getCommentList(
        e,
        void 0,
        1,
        function (e) {
          var i = (e ? e.list : e.result && e.result.list) || [];
          var n;
          if (i && i.length && i[0].commentorId == window.webUser.id) n = i[0];
          t(n);
        }._$bind(this),
        1,
      );
    };
    s.hasUserCanceledModal = function (e) {
      return n._$cookie(r(e)) === s.constants.MODAL_CANCELED;
    };
    s.setUserCanceledModal = function (e) {
      n._$cookie(r(e), { value: s.constants.MODAL_CANCELED, expires: 9999999 });
    };
    s.showCommentModal = function (e, n, a, r, c, d, _, l, h, f, u, p, m, b) {
      u = 'undefined' == typeof u ? !0 : !!u;
      var g =
        window.moocConfig && window.moocConfig.lang
          ? window.moocConfig.lang.KEY_COMMENTUTIL_TIP_GX
          : void 0;
      var E = new t({
        data: {
          mode: n ? i.MODE.SIMPLE : i.MODE.VERBOSE,
          termId: r,
          courseId: a,
          schoolShortName: _,
          modalTitle: g,
          evaluation: { courseName: c, rate: l, originContent: h, id: f },
          courseCoverImageUrl: d,
          gaCategory: p,
          shareUrl: m,
          courseTypeName: b,
        },
      });
      var v = s.setUserCanceledModal.bind(s, e);
      if (u)
        E = E.$on('cancel', v)
          .$on('close', v)
          .$on('submit', function () {
            o._$userActionLog('evaluate', a);
          });
      return E;
    };
  },
  '3c901c22ade77485e83c760f41b2eb47',
  'ffb2bd7b7ed4019841cb1f9c238eafe3',
  'cf3d228cb5ed8727271758f2c836ea9f',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '9cd3f5cb5f8a85acc9ce0fba66876da5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
);
EDU(
  '33e993f1c0153d9a1289992e7961b29b',
  '<div class="u-notice {class} f-f0" r-animation="on:leave;class:notice-leave">\n<div class="inner g-wrap f-clearfix">\n<div class="info" ><span class="content">{content}</span><a class="attendBtn f-ib" on-click={this.attend()}>{lang.KEY_LEARN_JOIN_NOW}</a>\n<span class="u-icon-close f-fr" on-click={this.close()} r-hide = {!showClose}></span></div>\n</div>\n</div>',
);
EDU(
  'abd6349a635a491f15e90e242d981f47',
  function (e, t, i, n) {
    var a = i.extend({
      template: t,
      config: function () {
        e.extend(this.data, { showClose: !1, lang: window.moocConfig.lang });
      },
      init: function () {},
      close: function () {
        this.destroy();
      },
      attend: function () {
        this.$emit('attend', {});
      },
      destroy: function () {
        this.supr();
      },
    });
    return a;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '33e993f1c0153d9a1289992e7961b29b',
  '6f1453d31194f86271694dd0542354fe',
);
EDU(
  '126d23b5ac6aef1dd83e84a4a70524a3',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c,
      d;
    var _ = e.isEn();
    var l = _
      ? '        <div class="f-fc6 j-title title f-f0" style="line-height: 50px;">Successfully enrolled!</div>        <p class="j-cnt cnt f-f0 f-fs14"></p>    '
      : '        <div class="f-fc6 j-title title f-f0">报名成功！</div>        <p class="j-cnt cnt f-f0 f-fs14">重要的课程提醒将通过邮件通知，请填写常用<br/>邮箱：</p>    ';
    var h = _
      ? '<div style="display: none;" class="j-add f-cb add">        <div class="f-fl"></div>        <div class="j-addFb f-fl"></div>    </div>'
      : '<div class="j-add f-cb add">        <div class="f-fl"></div>        <div class="j-addFb f-fl"></div>    </div>';
    var f = _
      ? '<div style="display: none;" class="f-cb btns">        <a style="display: none;" hidefocus="true" class="f-fr j-right u-btn-default u-btn-sm u-save u-btn"><span class="j-right-txt">Confirm</span></a>        <a hidefocus="true" class="f-fr j-left gotoLearn f-f0 f-fs18"><span class="j-left-txt">Go to directly</span></a>        <a hidefocus="true" class="f-fr j-know u-btn-default u-btn-sm u-save u-btn" style="display:none"><span>OK</span></a>    </div>'
      : '<div class="f-cb btns">        <a hidefocus="true" class="f-fr j-right u-btn-default u-btn-sm u-save u-btn"><span class="j-right-txt">保存</span></a>        <a hidefocus="true" class="f-fr j-left gotoLearn f-f0 f-fs18"><span class="j-left-txt">直接进入学习</span></a>        <a hidefocus="true" class="f-fr j-know u-btn-default u-btn-sm u-save u-btn" style="display:none"><span>知道了</span></a>    </div>';
    var u = '<div class="icn icn-success"' + (_ ? ' style="margin-bottom: 0;"' : '') + '></div>';
    var p = a._$addNodeTemplate(
      '        <div class="m-commonMailDialog f-cb">            <div class="all j-all f-fl">' +
        u +
        l +
        h +
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
      this.__title = a._$getByClassName(this.__body, 'title')[0];
      this.__cnt = a._$getByClassName(this.__body, 'j-cnt')[0];
      this.__saveBtn = a._$getByClassName(this.__body, 'j-right')[0];
      this.__knowBtn = a._$getByClassName(this.__body, 'j-know')[0];
      this.__gotoLearnBtn = a._$getByClassName(this.__body, 'j-left')[0];
      this.__gotoLearnBtnTxt = a._$getByClassName(this.__body, 'j-left-txt')[0];
      this.__mailAdd = a._$getByClassName(this.__body, 'j-add')[0];
      this.__mailAddChildren = a._$getChildren(this.__mailAdd);
      this.__iptNode = this.__mailAddChildren[0];
      this.__fbNode = this.__mailAddChildren[1];
      o._$addEvent(this.__saveBtn, 'click', this.__checkMail._$bind(this));
      o._$addEvent(this.__gotoLearnBtn, 'click', this.__gotoLearn._$bind(this));
      o._$addEvent(this.__knowBtn, 'click', this.__gotoLearn._$bind(this));
      this.__settingsCache = new s._$$COM_Cache_MemberCache();
      this.__settingsCache._$addEvent('onsaveEmail', this.__onsaveEmail._$bind(this));
      this.__settingsCache._$addEvent(
        'onsendActiveEmail',
        function (e, t) {
          if (t) {
            var i = _ ? 'Mail sent successfully' : '邮件发送成功';
            var n = _ ? 'Mail sent failed' : '邮件发送失败';
            var a = e ? i : n,
              o = e ? 1 : 2;
            r.showToastTips({ content: a, type: o });
          }
        }._$bind(this),
      );
    };
    c.__checkMail = function () {
      if (this.__mailIptUI) {
        var e = this.__mailIptUI._$getContent();
        var t = this.__mailIptUI._$getCount();
        if (t <= 0) {
          var i = _ ? 'Please fill in your frequently used email address' : '请填写你的常用邮箱';
          this.__mailAddFbUI._$showWarnTips(i, !0);
          return;
        } else if (
          !this.__mailIptUI._$isMatchExp(/@([a-z0-9]+[_|\-|\.]?)*[a-z0-9]+\.[a-z]{2,3}$/i)
        ) {
          var i = _ ? 'Please input a valid email address' : '请输入正确的邮箱地址';
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
        var i = _ ? 'Email saved successfully' : '邮箱保存成功！';
        if (this.__startOffset > 0) {
          r._$hiddenNode(this.__gotoLearnBtn);
          r._$showNode(this.__knowBtn);
          r._$hiddenNode(this.__saveBtn);
          r._$hiddenNode(this.__cnt);
          this.__title.innerHTML = i;
        } else {
          var n = _ ? 'Go to the course' : '进入学习';
          this.__gotoLearnBtnTxt.innerHTML = n;
          r._$hiddenNode(this.__saveBtn);
          r._$hiddenNode(this.__cnt);
          this.__title.innerHTML = i;
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
      if (!_) this.__genUI();
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
  '60c19c46803c4eca2843aa62cbc1dc50',
  function (e, t, i, n, a, o, s, r) {
    var c = window,
      d = NEJ.P('nej.e'),
      _ = NEJ.P('nej.v'),
      l = NEJ.P('edu.d'),
      h = NEJ.P('edu.m'),
      f = NEJ.P('edu.u'),
      u = NEJ.P('nej.j'),
      p = NEJ.P('nej.u'),
      m = { LEARN_HALF_COOKIE_TYPE: 'lhct' },
      b,
      g,
      E = c.isSpoc;
    var v = s._$parseUrlParams(window.location.search);
    var w = !!v.appId;
    if (f.CONST.LEARN_TAB) {
      f.CONST.LEARN_TAB.KNOWLEDGE_SHARE = 30;
      f.CONST.LEARN_TAB.CERTIFICATION_SCORE = 40;
      f.CONST.LEARN_TAB.AI_NOTE = 41;
      f.CONST.LEARN_TAB.MY_NOTE = 42;
    }
    h._$$CourseLearn = NEJ.C();
    b = h._$$CourseLearn._$extend(h._$$Module, !0);
    g = h._$$CourseLearn._$supro;
    b.__buildFuncPoints = function () {
      g.__buildFuncPoints.apply(this, arguments);
      this.__learnUmis = {};
      this.__learnUmis[f.CONST.LEARN_TAB.ANNOUNCE] = f.umi('learnAnnounce');
      this.__learnUmis[f.CONST.LEARN_TAB.SCORE] = f.umi('learnScore');
      this.__learnUmis[f.CONST.LEARN_TAB.CERTIFICATION_SCORE] = f.umi('certificationScore');
      this.__learnUmis[f.CONST.LEARN_TAB.AI_NOTE] = f.umi('aiNote');
      this.__learnUmis[f.CONST.LEARN_TAB.MY_NOTE] = f.umi('myNote');
      this.__learnUmis[f.CONST.LEARN_TAB.CONTENT] = f.umi('learnContent');
      this.__learnUmis[f.CONST.LEARN_TAB.QUIZ_HOMEWORK] = f.umi('learnTestList');
      this.__learnUmis[f.CONST.LEARN_TAB.EXAM] = f.umi('learnExamList');
      this.__learnUmis[f.CONST.LEARN_TAB.FORUM] = f.umi('learnForumIndex');
      this.__learnUmis[f.CONST.LEARN_TAB.KNOWLEDGE_SHARE] = f.umi('learnKnowledgeShare');
      this.__learnUmis[f.CONST.LEARN_TAB.EFFICIENT] = f.umi('efficientExamine');
      this.__learnUmis[f.CONST.LEARN_TAB.KNOWLEDGE] = f.umi('knowledge');
      this.__learnUmis[f.CONST.LEARN_TAB.CUSTOM] = f.umi('learnCustom');
      this.cache = new l._$$COM_Cache_CourseCache();
      this.__commonCache = new l._$$COM_Cache_commonCache();
      this.memberCache = new l._$$COM_Cache_MemberCache();
      this.cache._$addEvent('onStartTermLearn', this.__onStartLearnCourseCb._$bind(this));
      this.memberCache._$addEvent('onCheckEmailStatus', this.__onCheckEmailStatus._$bind(this));
      this.__commonCache._$addEvent(
        'onCheckActivitySetting',
        function (e) {
          _._$addEvent(
            d._$get('j-activityDetail'),
            'click',
            function () {
              var t = JSON.parse(e);
              window.open(t.activityPostLink);
            }._$bind(this),
          );
        }._$bind(this),
      );
      this.__umisNodes = {};
      this.__courseTabList = d._$getByClassName(d._$get('j-courseTabList'), 'j-tabitem');
      this.__certifiedTabList = d._$getByClassName(d._$get('j-certifiedTabList'), 'j-tabitem');
      _._$addEvent(
        d._$get('j-closeNotice'),
        'click',
        function () {
          f._$hiddenNode(this.__shareNotice);
        }._$bind(this),
      );
      _._$addEvent(
        d._$get('j-ignoreActivityNotice'),
        'click',
        function () {
          f._$hiddenNode(this.__shareNotice);
        }._$bind(this),
      );
      _._$addEvent(
        d._$get('j-courseshare'),
        'click',
        function () {
          var e = {
            url: c.location.href,
            uid: c.webUser ? c.webUser.id : -1,
            stat_id: c.courseDto.id,
            stat_type: 15,
          };
          e['action'] = 'MOC_ACTIVITY_SHARE';
          this.__commonCache._$addGaLog({
            dt: this.__strToHexCharCode(JSON.stringify(e)).substr(2),
            p: 'mooc',
          });
        }._$bind(this),
      );
      this.__courseId = (c.courseDto || {}).id;
      this.__termId = (c.termDto || {}).id;
      if (r._$isUserLogin()) {
        this.__commentLinkNode = d._$get('j-comment-link');
        this.__commentRatingNode = d._$get('j-comment-rating');
        this.__comment = {};
        this.__commentLoaded = !1;
        this.cache._$getMemberLearningRate(
          { termId: this.__termId },
          function (e) {
            if (e && e.lessonLearned / (e.lessonsCount || 1) > 0.5) {
              this.__hasLearnedHalf = !0;
              this.__tryShowingCommentModalAfterLearningHalf();
            }
          }._$bind(this),
        );
        _._$addEvent(
          this.__commentLinkNode,
          'click',
          function () {
            if (this.__comment && this.__comment.id && c.courseDto.schoolPanel) {
              var e = c.termDto && 0 == termDto.mode;
              var t = e ? '' : '/spoc';
              window.open(
                t +
                  window.urlPrefix.courseInfoPrefix +
                  c.courseDto.schoolPanel.shortName +
                  '-' +
                  this.__courseId +
                  '?tab=comment&scrollToTab=1',
              );
            } else {
              f._$trackEvent(
                '课程学习页',
                window.moocConfig.lang.KEY_LEARN_CLICK_COURSE,
                this.__termId,
              );
              this.__showCommentModal(!1);
            }
          }._$bind(this),
        );
        this.__updateMyComment();
      }
      var e = window.menuItemDtos;
      c.learnBigTabNames = {};
      p._$forEach(
        e,
        function (e) {
          if (e.type == f.CONST.LEARN_TAB.CUSTOM) {
            var t = this.__learnUmis[e.type] + '?id=' + e.id;
            c.learnBigTabNames[t] = e.name;
          } else c.learnBigTabNames[this.__learnUmis[e.type]] = e.name;
        },
        this,
      );
      this.__noticeNode = d._$get('j-notice');
      this.__initNotice();
    };
    b.__getLearnHalfCookieType = function () {
      return m.LEARN_HALF_COOKIE_TYPE + '_' + (c.webUser && c.webUser).id + '_' + this.__termId;
    };
    b.__showCommentModal = function (e) {
      var t = c.courseDto && c.courseDto.shortName;
      var i = c.termDto && 0 == termDto.mode;
      var a = i ? '' : 'spoc/';
      var o = 'https://icourse163.org/' + a + 'course/' + t + '-' + this.__courseId;
      return n
        .showCommentModal(
          this.__getLearnHalfCookieType(),
          e,
          this.__courseId,
          this.__termId,
          c.courseDto && c.courseDto.name,
          c.termDto && c.termDto.bigPhoto,
          t,
          this.__comment.mark,
          this.__comment.content,
          this.__comment.id,
          void 0,
          '课程学习页',
          o,
        )
        .$on(
          'submit',
          function (e) {
            if (e && e.result) this.__updateMyComment();
          }._$bind(this),
        )
        .$on('ga', function (e) {
          f._$trackEvent(e.category, e.action, e.label);
        });
    };
    b.__tryShowingCommentModalAfterLearningHalf = function () {
      var e = !!(this.__commentLoaded && this.__comment && this.__comment.id);
      if (
        !E &&
        this.__commentLoaded &&
        !e &&
        this.__hasLearnedHalf &&
        !n.hasUserCanceledModal(this.__getLearnHalfCookieType())
      )
        this.__showCommentModal(!0);
    };
    b.__updateMyComment = function () {
      var e = window.courseDto && courseDto.schoolPanel && 5 == courseDto.schoolPanel.schoolType;
      var t = window.courseDto && courseDto.schoolPanel && 6 == courseDto.schoolPanel.schoolType;
      if (window.webUser && !e && !t)
        n.getMyComment(
          this.__courseId,
          function (e) {
            this.__comment = e || {};
            this.__commentLoaded = !0;
            d._$delClassName(this.__commentLinkNode, 'f-dn');
            if (this.__comment.id) {
              if (this.__ratingComp) {
                this.__ratingComp.destroy();
                delete this.__ratingComp;
              }
              if (this.__commentLinkNode) {
                d._$addClassName(this.__commentLinkNode, 'commented');
                this.__commentLinkNode.innerHTML =
                  '<i></i>' + window.moocConfig.lang.KEY_LEARN_VIEW_COMMENTS;
              }
            } else this.__tryShowingCommentModalAfterLearningHalf();
          }._$bind(this),
        );
      else this.__commentLinkNode.style.display = 'none';
    };
    b.__strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var i = 0; i < e.length; i++) t.push(e.charCodeAt(i).toString(16));
      return t.join('');
    };
    b.__initNotice = function () {
      if ((!f._$isUserLogin() || 0 == c.isEnroll) && this.__noticeNode) {
        this.__noticeUI = new o({
          data: { content: window.moocConfig.lang.KEY_LEARN_YOU_NOT_JOIN_COURSE },
        }).$inject(this.__noticeNode);
        this.__noticeUI.$on('attend', this.__attendCourse._$bind(this));
      }
    };
    b.__attendCourse = function () {
      if (!f._$isUserLogin()) f._$$LoginDialog._$showLogin({ from: 'learn' });
      else this.memberCache._$checkEmailStatus();
    };
    b.__onCheckEmailStatus = function (e) {
      if (e && e.emailStatus == f.CONST.EMAIL_ACTIVE_INIT)
        f._$$CommonMailDialog._$showDialog({
          start: -1,
          onGotoLearn: function () {
            this.__gotoLearn();
          }._$bind(this),
          enrollnotGotoLearn: function () {
            this.__enrollnotGotoLearn = !0;
            this.__gotoLearn();
          }._$bind(this),
        });
      else this.cache._$StartTermLearn(c.termDto.id, null);
    };
    b.__onStartLearnCourseCb = function () {
      c.isEnroll = !0;
      var e = { userId: f._$getWebUser().id, courseId: this.__courseId, termId: this.__termId };
      f._$log2Study('course', 'enroll', e);
      if (this.__enrollnotGotoLearn) window.location.reload();
      else {
        f.showToastTips({
          content:
            window.moocConfig.lang.KEY_LEARN_HAVE_COURSE +
            c.courseDto.name +
            window.moocConfig.lang.KEY_LEARN_SYMBOL3,
          type: 1,
          myStyle: 'attendCourse',
        });
        if (this.__noticeNode) f._$hiddenNode(this.__noticeNode);
        setTimeout(function () {
          window.location.reload();
        }, 1e3);
      }
    };
    b.__gotoLearn = function () {
      this.cache._$StartTermLearn(c.termDto.id, null);
    };
    b.__initTab = function () {
      var e = this.__certifiedTabList
        ? this.__courseTabList.concat(this.__certifiedTabList)
        : this.__courseTabList;
      if (e) c.learnBigTabNames = {};
      p._$forEach(
        e,
        function (e, t) {
          var i = parseInt(d._$dataset(e, 'type'));
          var n = this.__learnUmis[i];
          switch (i) {
            case f.CONST.LEARN_TAB.CUSTOM:
              n += '?id=' + d._$dataset(e, 'id');
              break;
            case f.CONST.LEARN_TAB.QUIZ_HOMEWORK:
              this.__umisNodes[f.umi('learnQuiz')] = e;
              this.__umisNodes[f.umi('learnQuizScore')] = e;
              this.__umisNodes[f.umi('learnHomework')] = e;
              this.__umisNodes[f.umi('learnOJHomework')] = e;
              break;
            case f.CONST.LEARN_TAB.EXAM:
              this.__umisNodes[f.umi('learnExamObjective')] = e;
              this.__umisNodes[f.umi('learnExamObjectScore')] = e;
              this.__umisNodes[f.umi('learnExamSubjective')] = e;
              this.__umisNodes[f.umi('learnExamOJ')] = e;
              break;
            case f.CONST.LEARN_TAB.FORUM:
              this.__umisNodes[f.umi('learnForumIndex')] = e;
              this.__umisNodes[f.umi('learnForumPanel')] = e;
              this.__umisNodes[f.umi('learnForumPersonal')] = e;
              this.__umisNodes[f.umi('learnForumDetail')] = e;
              this.__umisNodes[f.umi('learnForumTopic')] = e;
              this.__umisNodes[f.umi('learnForumEasyTopic')] = e;
              this.__umisNodes[f.umi('forumNoticeDetail')] = e;
              this.__umisNodes[f.umi('forumUserRanking')] = e;
              break;
            case f.CONST.LEARN_TAB.KNOWLEDGE_SHARE:
              this.__umisNodes[f.umi('learnKnowledgeShare')] = e;
              break;
            case f.CONST.LEARN_TAB.EFFICIENT:
              this.__umisNodes[f.umi('efficientExamine')] = e;
              break;
            case f.CONST.KNOWLEDGE:
              this.__umisNodes[f.umi('knowledge')] = e;
          }
          c.learnBigTabNames[n] = e.innerText;
          this.__umisNodes[n] = e;
          var a = e.getElementsByTagName('a');
          if (a && a.length && n) a[0].href = '#' + n;
          _._$addEvent(e, 'click', this.__tabClickHandle._$bind(this, e, n));
        },
        this,
      );
    };
    b.__tabClickHandle = function (e, t) {
      if ('/learn/knowledgeshare' === t) {
        window.DATracker &&
          window.DATracker.track('学习页-知识共享tab点击-iaw', {
            pagename: 'learn',
            user_id: f._$getWebUser().id,
            course_id: this.__courseId,
            term_id: this.__termId,
          });
        var i = location.search.match(/&editId=\d+/);
        if (i) {
          var n = location.search;
          n = n.replace(i[0], '');
          location.href = location.origin + location.pathname + n + '#/learn/knowledgeshare';
        }
      }
      f._$trackEvent('learnPageTab', 'click', '学习页面tab点击：' + c.learnBigTabNames[t]);
    };
    b.__handleTabs = function (e) {
      var t = d._$getByClassName(document, 'tabitem-more')[0];
      if (t) d._$delClassName(t, 'u-curtab');
      if (this.__curTabNode) d._$delClassName(this.__curTabNode, 'u-curtab');
      this.__curTabNode = this.__umisNodes[e];
      if (this.__curTabNode)
        if (window.trackData)
          window.trackData.tabName = this.__curTabNode.getAttribute('data-name');
        else window.trackData = { tabName: this.__curTabNode.getAttribute('data-name') };
      if (this.__curTabNode) {
        var i = !1;
        if (i) {
          if (t) d._$addClassName(t, 'u-curtab');
        } else d._$addClassName(this.__curTabNode, 'u-curtab');
      }
    };
    b.__onShow = function (t) {
      DATracker.track('课程学习页展示', {
        pagename: 'courselearn',
        user_id: window.webUser ? window.webUser.id : '',
        course_id: window.courseCardDto ? window.courseCardDto.id : '',
        learnmode: window.learnMode,
        version: window.courseCardDto
          ? window.courseCardDto.efficientCourse
            ? 'efficient'
            : 'old'
          : '',
      });
      g.__onShow.apply(this, arguments);
      f._$openMobilePageOld({ courseId: this.__courseId, termId: this.__termId });
      this.__onRefresh(t);
      setTimeout(this.__genWeiXinQR._$bind(this), 0);
      setTimeout(this.__hideShareArea._$bind(this), 10);
      window.addEventListener('hashchange', function (e) {
        try {
          var t = ['#/learn/testlist', '#/learn/content', '#/learn/examlist'];
          if (t.indexOf(e.target.location.hash) > -1) {
            var i = document.querySelector('#j-global-ai-robot');
            i && i.classList.remove('f-dn');
          }
          if (location.hash.indexOf('/learn/content') > -1) {
            document.oncontextmenu = function () {
              alert('禁止使用右键');
              window.event.returnValue = !1;
            };
            document.onkeydown = function (e) {
              var t = window.event || e;
              if ((t.ctrlKey && 67 == t.keyCode) || (t.metaKey && 67 == t.keyCode)) {
                t.returnValue = !1;
                alert('禁止复制');
              }
            };
          }
        } catch (n) {}
      });
      window.addEventListener('click', function (t) {
        try {
          var i = d._$hasClassName(t.target, 'j-global-ai-question-entry');
          var n = t.target.dataset.id;
          var a;
          if (i) {
            window.DATracker &&
              window.DATracker.track('认证MOOC课程认证模式答题解析页-提问按钮-点击-iaw', {
                pagename: 'learn',
                user_id: window.webUser ? window.webUser.id : '',
                course_id: window.courseDto && window.courseDto.id,
                term_id: window.termDto && window.termDto.id,
              });
            var o = window.learnUtilQuestionList || [];
            for (var s = 0; s < o.length; s++) {
              var r = o[s];
              if (r.id == n) a = r;
            }
            e._$renderGLobalAIButton(
              {
                pageType:
                  location.hash.indexOf('/learn/exam') > -1 ? e.PAGE_TYPE.EXAM : e.PAGE_TYPE.QUIZ,
                sceneType: e.SCENE_TYPE.FAST_QUIZ,
                termId: window.termDto && window.termDto.id,
                courseId: window.courseDto && window.courseDto.id,
                courseName: window.courseDto && window.courseDto.name,
                questions: window.learnUtilQuestionList || [],
                question: a,
                timestamp: new Date().getTime(),
              },
              document.querySelector('#j-global-ai-robot'),
            );
          }
        } catch (c) {}
      });
    };
    b.__hideShareArea = function () {
      var e = d._$get('j-courseshare');
      var t = d._$get('wxItemTab');
      var i = d._$get('appTab');
      if (w) {
        d._$addClassName(e, 'f-dn');
        d._$addClassName(t, 'f-dn');
        d._$addClassName(i, 'f-dn');
      }
    };
    b.__genWeiXinQR = function () {
      if (c.activityNotEnd && c.webUser)
        e =
          c.moocHref +
          c.urlPrefix.courseInfoPrefix +
          c.courseDto.schoolPanel.shortName +
          '-' +
          c.courseDto.id +
          '?inviterId=' +
          c.webUser.id +
          '&activityId=' +
          c.activityId +
          '&isWebShare=1';
      else
        e =
          c.moocHref +
          c.urlPrefix.courseInfoPrefix +
          c.courseDto.schoolPanel.shortName +
          '-' +
          c.courseDto.id;
      var e = E ? window.location.protocol + '//www.icourse163.org' : e;
      this.__weixinQRParams = e;
      this.__genShareUI();
    };
    b.__genShareUI = function () {
      var e = c.courseDto,
        t = [
          'MOOC是全新完整的教学模式--定期开课、简短视频，提交作业，学完还能考取认证证书，更可以结交到新朋友！',
          window.moocConfig.lang.KEY_LEARN_RECOMMEND_EVERYONE,
          '我在#中国大学MOOC#平台上学习，',
        ];
      var i = E ? t[2] : '我在#中国大学MOOC# 学《' + e.name + '》课程，',
        n = E ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，',
        a = E ? t[2] : '我正在学习中国大学MOOC的《' + e.name + '》，';
      var o =
          '中国大学MOOC联合高教社考试中心和任汝芬、杨净、陈剑等众多考研名师，为考生提供权威的考研辅导服务，快来学习吧！',
        s =
          window.moocConfig.lang.KEY_LEARN_I_STUDYING +
          c.courseDto.name +
          '》，@中国大学MOOC 联合高教社考试中心和任汝芬、杨净、陈剑等众多考研名师，为考生提供权威的考研辅导服务，快来学习吧！#考研#';
      var r = '';
      if (c.activityNotEnd && c.webUser) {
        if (location.href.indexOf('?') >= 0)
          r =
            location.href +
            '&inviterId=' +
            c.webUser.id +
            '&activityId=' +
            c.activityId +
            '&isWebShare=1';
        else
          r =
            location.href +
            '?inviterId=' +
            c.webUser.id +
            '&activityId=' +
            c.activityId +
            '&isWebShare=1';
        this.__firstActivityLearnCookiekey = 'first_activity_learn' + c.webUser.id;
        if (!u._$cookie(this.__firstActivityLearnCookiekey)) {
          f._$showNode(this.__shareNotice);
          u._$cookie(this.__firstActivityLearnCookiekey, '1');
        }
        this.__commonCache._$checkActivitySetting('moocShareActivityResult');
      } else r = location.href;
      if (c.courseDto.productType == f.CONST.PRODUCTTYPE.KAOYAN)
        f._$$ShareUI._$allocate({
          parent: d._$get('j-coushare'),
          title: s,
          topic: s,
          description: o,
          pic: c.termDto.bigPhoto,
          weixinQRParams: this.__weixinQRParams,
          url: E ? '//www.icourse163.org' : r,
          from: window.moocConfig.lang.KEY_LEARN_COURSE_PAGE1,
        });
      else
        f._$$ShareUI._$getInstance({
          parent: d._$get('j-coushare'),
          title: i + t[0],
          topic: n + t[1],
          description: a + t[0],
          pic: c.termDto.bigPhoto,
          weixinQRParams: this.__weixinQRParams,
          url: E ? '//www.icourse163.org' : r,
          from: window.moocConfig.lang.KEY_LEARN_COURSE_PAGE1,
        });
    };
    b.__addScriptTag = function (e) {
      var t = document.createElement('script');
      t.setAttribute('type', 'text/javascript');
      t.src = e;
      document.body.appendChild(t);
    };
    b.__resultShow = function () {
      var e = this;
      return function (t) {
        e.__weixinQR = t.url;
        e.__genShareUI();
      };
    };
    b.__onRefresh = function (e) {
      g.__onRefresh.apply(this, arguments);
      var t = e.target;
      if (t == f.umi('learnCustom')) t += '?id=' + e.param.id;
      this.__handleTabs(t);
      if (!c.isSpoc && !w && !this._recommendSideUI) this._initRecommendUI();
      f._$trackPageView(!0);
    };
    b._initRecommendUI = function () {
      if (this._recommendSideUI) {
        this._recommendSideUI.destroy();
        this._recommendSideUI = null;
      }
      if (document.querySelector('#j-recommend-side'))
        this._recommendSideUI = new i({
          data: {
            title: window.moocConfig.lang.INTRO_BOTTOM_COURSE_WEB,
            recommendOpt: {
              targetId: c.termDto.id,
              targetTypes: [
                t.RECOMMEND_POSITION.INTRO_BOTTOM_COURSE_WEB,
                t.RECOMMEND_POSITION.INTRO_BOTTOM_FRONT_CATEGORY_WEB,
              ],
              number: 4,
            },
            logOpt: {
              eventId: window.moocConfig.lang.KEY_LEARN_CLICK_PAGE,
              data_cate: window.moocConfig.lang.KEY_LEARN_CLICK_PAGE,
              data_action: 'web_course_learn_recommend_click',
              data_label: window.moocConfig.lang.KEY_LEARN_STUDY_PAGE,
            },
            title: window.moocConfig.lang.KEY_LEARN_RECOMMENDED_YOU,
            showToggle: !0,
            key: c.termDto.id,
            adultOutVendor: 'zw_mooc_pcmkxxytj',
            outVendor: 'zw_mooc_pckcxxywntj',
          },
        }).$inject('#j-recommend-side');
    };
    b.__onHide = function () {
      g.__onHide.apply(this, arguments);
      d._$removeByEC(this.__body);
    };
    c.dispatcher._$loaded(f.umi('courseLearn'), h._$$CourseLearn);
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '93828627ddb358ed890cb65967a0c1de',
  '4506823daf61ad0e7db0db8ecc157b4c',
  '4357e0744757d18da9905f552230abb4',
  '25fbb912c004f2caca2d7f90579d7371',
  'abd6349a635a491f15e90e242d981f47',
  'fb061c769bfc74628a81f422f590544c',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'fb80274a93905bc7807baceaedc07c15',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  'be836b3e4eb69c3616f9cc097e503955',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '126d23b5ac6aef1dd83e84a4a70524a3',
  'a936afb5ecab0e9286c3c9d05341571d',
  'beec6201069596ecb83a09e5fc3eb415',
  '891a76809ded82c88f5536f4458ae1ad',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '9d279df4af180d366f079ab901224cbc',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = i._$randNumberString(),
      s,
      r = 'ck-termNoticeCache';
    n._$$COM_Cache_TermNoticeCache = NEJ.C();
    s = n._$$COM_Cache_TermNoticeCache._$extend(n._$$COM_Cache);
    s._$saveOrPublishAnnouncement = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.saveOrPublishAnnouncement',
        param: [e, t, i],
        onload: this.__onSaveOrPublishAnnouncement._$bind(this, i),
      });
    };
    s.__onSaveOrPublishAnnouncement = function (e, t) {
      this._$dispatchEvent('onSaveOrPublishAnnouncement', { data: t, isDraft: e });
    };
    s._$checkAnnouncementDuplicate = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.checkAnnouncementDuplicate',
        param: [e, t, i],
        onload: this.__onCheckAnnouncementDuplicate._$bind(this),
      });
    };
    s.__onCheckAnnouncementDuplicate = function (e) {
      this._$dispatchEvent('onCheckAnnouncementDuplicate', e);
    };
    s._$getAllAnnouncementByTerm = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.getAllAnnouncementByTerm',
        param: [e, t],
        onload: this.__onGetAllAnnouncementByTerm._$bind(this),
      });
    };
    s.__onGetAllAnnouncementByTerm = function (e) {
      this._$dispatchEvent('onGetAllAnnouncementByTerm', e);
    };
    s._$getAllAnnouncementByTermFront = function (e, t, i) {
      var n = i
        ? 'PublishCourseBean.getAllAnnouncementByTerm'
        : 'CourseBean.getAllAnnouncementByTerm';
      this._$postDWR({
        key: r + o,
        url: n,
        replaceDisable: !0,
        param: [e, t],
        onload: this.__onGetAllAnnouncementByTerm._$bind(this),
      });
    };
    s.__onGetAllAnnouncementByTerm = function (e) {
      this._$dispatchEvent('onGetAllAnnouncementByTerm', e);
    };
    s._$deleteAnnouncementById = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.deleteAnnouncementById',
        param: [e],
        onload: this.__onDeleteAnnouncementById._$bind(this),
      });
    };
    s.__onDeleteAnnouncementById = function (e) {
      this._$dispatchEvent('onDeleteAnnouncementById', e);
    };
    s._$getMixedForumAnnouncementByTerm = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'CourseBean.getMixedForumAnnouncementByTerm',
        param: [e, t],
        onload: this.__onGetMixedForumAnnouncementByTerm._$bind(this),
      });
    };
    s.__onGetMixedForumAnnouncementByTerm = function (e) {
      this._$dispatchEvent('onGetMixedForumAnnouncementByTerm', e);
    };
    s._$getIndependentMailDtos = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.getMocTermMailDtos',
        param: [e, t, i],
        onload: this.__onGetIndependentMailDtos._$bind(this),
      });
    };
    s.__onGetIndependentMailDtos = function (e) {
      this._$dispatchEvent('onGetIndependentMailDtos', e);
    };
    s._$sendTermMail = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.sendTermMail',
        param: [e],
        onload: this.__onSendTermMail._$bind(this),
      });
    };
    s.__onSendTermMail = function (e) {
      this._$dispatchEvent('onSendTermMail', e);
    };
    s._$checkTermMailDuplicate = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.checkTermMailDuplicate',
        param: [e],
        onload: this.__onCheckTermMailDuplicate._$bind(this),
      });
    };
    s.__onCheckTermMailDuplicate = function (e) {
      this._$dispatchEvent('onCheckTermMailDuplicate', e);
    };
    s._$saveTermMailDraft = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.saveTermMailDraft',
        param: [e],
        onload: this.__onSaveTermMailDraft._$bind(this),
      });
    };
    s.__onSaveTermMailDraft = function (e) {
      this._$dispatchEvent('onSaveTermMailDraft', e);
    };
    s._$getSuggestMember = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocSearchBean.getSuggestMember',
        param: [e, t],
        onload: this.__onGetSuggestMember._$bind(this),
      });
    };
    s.__onGetSuggestMember = function (e) {
      this._$dispatchEvent('onGetSuggestMember', e);
    };
    s._$getMemberByName = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocSearchBean.getMemberByName',
        param: [e, t],
        onload: this.__onGetMemberByName._$bind(this),
      });
    };
    s.__onGetMemberByName = function (e) {
      this._$dispatchEvent('onGetMemberByName', e);
    };
    s._$deleteMocMail = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.deleteMocMail',
        param: [e],
        onload: this.__onDeleteMocMail._$bind(this),
      });
    };
    s.__onDeleteMocMail = function (e) {
      this._$dispatchEvent('onDeleteMocMail', e);
    };
    s._$getMocTermAutoMail = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.getMocTermMailTemplate',
        param: [e, t],
        onload: this.__onGetMocTermAutoMail._$bind(this),
      });
    };
    s.__onGetMocTermAutoMail = function (e) {
      this._$dispatchEvent('onGetMocTermAutoMail', e);
    };
    s._$updatetMocTermAutoMail = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocTermMailBean.updateMocTermMailTemplate',
        param: [e],
        onload: this.__onUpdatetMocTermAutoMail._$bind(this),
      });
    };
    s.__onUpdatetMocTermAutoMail = function (e) {
      this._$dispatchEvent('onUpdatetMocTermAutoMail', e);
    };
    s._$getMocTermScoreRank = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMocTermScoreRank',
        param: [e],
        onload: this.__onGetMocTermScoreRank._$bind(this),
      });
    };
    s.__onGetMocTermScoreRank = function (e) {
      this._$dispatchEvent('onGetMocTermScoreRank', e);
    };
    s._$getScholarshipRecord = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getScholarshipRecord',
        param: [e],
        onload: this.__onGetScholarshipRecord._$bind(this),
      });
    };
    s.__onGetScholarshipRecord = function (e) {
      this._$dispatchEvent('onGetScholarshipRecord', e);
    };
    s._$updateMocScholarshipRecord = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.updateMocScholarshipRecord',
        param: [e],
        onload: this.__onUpdateMocScholarshipRecord._$bind(this),
      });
    };
    s.__onUpdateMocScholarshipRecord = function (e) {
      this._$dispatchEvent('onUpdateMocScholarshipRecord', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'bfa5f84d0b4a33f05565c42dcc8ef1e5',
  function () {
    var e = NEJ.O,
      t = window,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.u'),
      o = NEJ.P('nej.ut'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('nej.ui'),
      d = NEJ.P('edu.d'),
      _ = NEJ.P('edu.m'),
      l,
      h;
    var f = n._$pushCSSText(
      '    \t.#<uispace> {margin-top:20px;}        .#<uispace> .ctinfo{height:65px;line-height:30px;}        .#<uispace> .title{font-size:14px;}        .#<uispace> .cnt{width:650px}        .#<uispace> .cnt .zarea{height:450px;}        .#<uispace> .opts{margin-bottom:10px;padding:0 0 0 50px;}        .#<uispace> .messc{width: 20px;height: 20px;vertical-align: middle;}        .#<uispace> .mess{vertical-align: middle;}        .#<uispace> .publish{height:28px;}        .#<uispace> .mail{font-size:12px;margin:6px 0 10px;}        .#<uispace> .draft,.publish{margin-right:10px;}        .#<uispace> .draft{height:28px;}        .#<uispace> .tipinfo{width:660px;}        .#<uispace> .opts .u-btn{min-width:60px;height:30px;line-height:30px;padding:0 5px;font-size:12px;}        ',
    );
    var u = n._$addNodeTemplate(
      '\t \t<div class="cNotice f-cb"> \t\t\t<div class="ctinfo f-cb f-pr"> \t\t\t\t<div class="title f-fl f-f0"><em class="f-sign">*</em>标题：</div> \t\t\t\t<div class="f-fl j-ctitle"></div> \t\t\t\t<div class="f-fl j-feed feed"></div> \t\t\t</div> \t\t\t<div class="f-cb f-pr"> \t\t\t\t<div class="title f-fl f-f0"><em class="f-sign">*</em>内容：</div>\t\t\t\t<div class="f-fl j-cnt cnt"></div> \t\t\t\t<div class="f-fl j-feed feed"></div> \t\t\t</div> \t\t\t<div class="opts f-cb"> \t\t\t\t<div class="mail" id="j-mailtipInfo"> \t\t\t\t\t<div class="mtop"><input type="checkbox" class="messc j-sendmail" id="aefdsv123"/><label class="mess f-f0" for="aefdsv123">邮件通知</label></div> \t\t\t\t\t<p class="tipinfo f-fc9">发布后学习者将在学习页面上看到该公告，勾选“邮件通知”后，能同时收到相同内容的邮件。</p> \t\t\t\t</div>                <a class="f-fl j-draft draft u-btn u-btn-default f-f1">保存为草稿</a> \t\t\t\t<a class="f-fl j-pubslih publish u-btn u-btn-primary f-f1">发布</a> \t\t\t\t<a class="f-fl j-cancel cancel u-btn f-f1">取消</a> \t\t\t</div>\t \t</div>',
    );
    s._$$CreateNotice = NEJ.C();
    l = s._$$CreateNotice._$extend(s._$$UIBase, !0);
    h = s._$$CreateNotice._$supro;
    l.__initXGui = function () {
      this.__seed_html = u;
      this.__seed_css = f;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__title = n._$getByClassName(this.__body, 'j-ctitle')[0];
      this.__cnt = n._$getByClassName(this.__body, 'j-cnt')[0];
      this.__pubslih = n._$getByClassName(this.__body, 'j-pubslih')[0];
      this.__draft = n._$getByClassName(this.__body, 'j-draft')[0];
      this.__cancel = n._$getByClassName(this.__body, 'j-cancel')[0];
      this.__feed = n._$getByClassName(this.__body, 'j-feed');
      this.__sendMail = n._$getByClassName(this.__body, 'j-sendmail')[0];
      r._$addEvent(this.__pubslih, 'click', this.__publishHandler._$bind(this));
      r._$addEvent(this.__draft, 'click', this.__draftHandler._$bind(this));
      r._$addEvent(this.__cancel, 'click', this.__cancelHandler._$bind(this));
      this.__noticeCache = new d._$$COM_Cache_TermNoticeCache();
      this.__noticeCache._$addEvent(
        'onSaveOrPublishAnnouncement',
        this.__saveOrPublishCb._$bind(this),
      );
      this.__noticeCache._$addEvent(
        'onCheckAnnouncementDuplicate',
        this.__checkAnnouncementDuplicateCb._$bind(this),
      );
    };
    l.__saveOrPublishCb = function (e) {
      if (e.data) {
        if (this.__noticeType == s.CONST.NOTICE_TYPE_FORUMADMIN)
          if (e.isDraft) alert(window.moocConfig.lang.KEY_LEARN_SAVED_SUCCESSFULLY);
          else alert(window.moocConfig.lang.KEY_LEARN_PUBLISHED_SUCCESSFULLY);
        else if (e.isDraft)
          s.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_SAVED_SUCCESSFULLY });
        else s.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_PUBLISHED_SUCCESSFULLY });
        this._$dispatchEvent('saveOrPublish', e.data);
      }
    };
    l.__genBaseUI = function () {
      this.__titleInputUI = s._$$TipInputUI._$allocate({
        parent: this.__title,
        height: 34,
        width: 647,
        labelText: ' ',
        critical: 30,
        onInputFocus: function () {
          if (this.__titfd) this.__titfd._$hideFeedback();
        }._$bind(this),
      });
      var e = '';
      if (this.__noticeDto) {
        this.__titleInputUI._$setInitContent(this.__noticeDto.title || '');
        e = this.__noticeDto.content;
      }
      this.__cntCustomUI = c._$$EduEditor._$allocate({
        parent: this.__cnt,
        height: 435,
        content: e,
      });
      this.__titfd = s._$$FeedBackUI._$allocate({ parent: this.__feed[0] });
      this.__titfd._$hideFeedback();
      this.__cntfd = s._$$FeedBackUI._$allocate({ parent: this.__feed[1] });
      this.__cntfd._$hideFeedback();
      if (1 == this.__noticeDto.status) s._$hiddenNode(this.__draft);
      else s._$showNode(this.__draft);
    };
    l.__getNoticeDto = function () {
      this.__noticeDto.title = this.__titleInputUI._$getContent();
      this.__noticeDto.content = this.__cntCustomUI._$getContent();
      if (this.__noticeType == s.CONST.NOTICE_TYPE_FORUMADMIN) this.__noticeDto.termId = -1;
      else this.__noticeDto.termId = t.termDto.id;
      this.__noticeDto.type = this.__noticeType;
      if (this.__sendMail.checked || 1 == this.__sendMail.checked) this.__sendEmail = 1;
      else this.__sendEmail = 0;
    };
    l.__verifyDto = function (e) {
      var t = this.__charUtil._$getCharsL(this.__noticeDto.title);
      if (!this.__noticeDto.title || '' == this.__noticeDto.title) {
        this.__titfd._$showWarnTips(window.moocConfig.lang.KEY_LEARN_PLEASE_INPUT_NOTICE_TITLE);
        return !1;
      } else if (t > 60) {
        this.__titfd._$showWarnTips(window.moocConfig.lang.KEY_LEARN_ANNOUNCEMENT_LONG);
        return !1;
      } else {
        this.__cntfd._$hideFeedback();
        return !0;
      }
    };
    l.__draftHandler = function () {
      this.__getNoticeDto();
      if (this.__verifyDto(!0))
        this.__noticeCache._$saveOrPublishAnnouncement(this.__noticeDto, 0, 1);
    };
    l.__publishHandler = function () {
      this.__getNoticeDto();
      if (this.__verifyDto(!1))
        this.__noticeCache._$checkAnnouncementDuplicate(this.__noticeDto, this.__sendEmail, 0);
    };
    l.__checkAnnouncementDuplicateCb = function (e) {
      if (1 == e)
        s._$$CommonDialog._$showDialog({
          message: '邮件内容重复，确定要重新发送吗',
          okFunc: function () {
            this.__noticeCache._$saveOrPublishAnnouncement(this.__noticeDto, this.__sendEmail, 0);
          }._$bind(this),
          cancelFunc: i,
        });
      else this.__noticeCache._$saveOrPublishAnnouncement(this.__noticeDto, this.__sendEmail, 0);
    };
    l.__cancelHandler = function () {
      this._$dispatchEvent('onCancel');
    };
    l.__reset = function (e) {
      this.__supReset(e);
      this.__termId = 100;
      this.__noticeDto = e.noticeDto || {};
      this.__genBaseUI();
      this.__charUtil = new _._$$CharasetUtil();
      if (e.isAdmin) {
        n._$addClassName(this.__draft, 'button green');
        n._$addClassName(this.__pubslih, 'button green');
        n._$addClassName(this.__cancel, 'button green');
        s._$hiddenNode(n._$get('j-mailtipInfo'));
        this.__sendMail.checked = !1;
        n._$setStyle(n._$get('j-mailtipInfo').parentNode, 'paddingTop', '20px');
      }
      this.__noticeType = e.noticeType || s.CONST.NOTICE_TYPE_TERM;
    };
    l.__destroy = function () {
      if (this.__titleInputUI) this.__titleInputUI = s._$$TipInputUI._$recycle(this.__titleInputUI);
      if (this.__cntCustomUI) this.__cntCustomUI = c._$$EduEditor._$recycle(this.__cntCustomUI);
      if (this.__titfd) this.__titfd = s._$$FeedBackUI._$recycle(this.__titfd);
      if (this.__cntfd) this.__cntfd = s._$$FeedBackUI._$recycle(this.__cntfd);
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '7ae1049f52447f73129209d74071c691',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '5f6786e7896f2a86bf128de299871305',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '4680ef5be2c55c96de681d2752e800c2',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '9d279df4af180d366f079ab901224cbc',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '9f00cd6c3134c86431c1d1e3a7678de8',
  function (e, t, i) {
    i._$$EventBus = e._$klass();
    var n = i._$$EventBus._$extend(t._$$EventTarget);
    return i._$$EventBus;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
EDU('f8fa8c010d08d59fe9627203a2cf657f', '.#<uispace>{position:absolute;background:#fff;}');
EDU(
  '718339c82039ab37605f9b07444eab0a',
  function (e, t, i, n, a, o, s, r, c, d) {
    var _,
      l = i._$pushCSSText(o);
    s._$$Card = t._$klass();
    _ = s._$$Card._$extend(a._$$Layer);
    _.__reset = function (e) {
      this.__super(e);
      this.__doInitDomEvent([[document, 'click', this.__onDocClick._$bind(this)]]);
      this.__nostop = !!e.nostop;
      this.__position = { top: e.top, left: e.left };
    };
    _.__destroy = function () {
      delete this.__pbox;
      delete this.__fbox;
      delete this.__align;
      delete this.__fitable;
      delete this.__byPoint;
      delete this.__position;
      this.__super();
    };
    _.__initXGui = function () {
      this.__seed_css = l;
    };
    _.__initNode = function () {
      this.__super();
      this.__ncnt = this.__body;
      n._$addEvent(this.__body, 'click', this.__doCheckStop._$bind(this));
    };
    _.__onDocClick = function (e) {
      if (2 != e.button) this._$hide();
    };
    _.__doCheckStop = function (e) {
      if (!this.__nostop) {
        n._$stopBubble(e);
        var t = n._$getElement(e);
        if ('A' == t.tagName) n._$stopDefault(e);
      }
    };
    _.__setAlign = (function () {
      var e = /\s+/i;
      return function (t) {
        t = (t || '').trim().toLowerCase().split(e);
        t[0] = t[0] || 'bottom';
        t[1] = t[1] || 'left';
        this.__align = t;
      };
    })();
    _.__doCalPosition = function (e) {
      var t = {},
        n = this.__fbox,
        a = i._$getPageBox(),
        o = this.__body.offsetWidth,
        s = this.__body.offsetHeight;
      switch (e[0]) {
        case 'top':
          t.top = n.top - s;
          t.left = 'right' == e[1] ? n.left + n.width - o : n.left;
          break;
        case 'left':
          t.left = n.left - o;
          t.top = 'bottom' == e[1] ? n.top + n.height - s : n.top;
          break;
        case 'right':
          t.left = n.left + n.width;
          t.top = 'bottom' == e[1] ? n.top + n.height - s : n.top;
          break;
        default:
          t.top = n.top + n.height;
          t.left = 'right' == e[1] ? n.left + n.width - o : n.left;
      }
      return t;
    };
    _.__doPositionAlign = function () {
      if (this.__fitable)
        if (!this.__byPoint) {
          if (this.__fbox) this._$setPosition(this.__doCalPosition(this.__align));
        } else this._$setPosition(this.__pbox);
      else this._$setPosition(this.__position);
    };
    _.__doFindPosition = function (e, t, a) {
      t = t || r;
      var o = i._$getPageBox(),
        s = n._$pageX(a) + (t.left || 0),
        c = n._$pageY(a) + (t.top || 0),
        d = e.offsetWidth + (t.right || 0),
        _ = e.offsetHeight + (t.bottom || 0),
        l = o.scrollWidth,
        h = o.scrollHeight,
        f = s + d,
        u = c + _;
      switch (this.__align[0]) {
        case 'top':
          c = u > h ? c - _ : c;
          if ('right' == this.__align[1]) s = s - d < 0 ? 0 : s - d;
          else s = f > l ? l - d : s;
          break;
        case 'left':
          s = f > l ? l - d : s;
          if ('top' == this.__align[1]) c = u > h ? c - _ : c;
          else c = c - _ < 0 ? c : c - _;
          break;
        case 'right':
          s = s - d < 0 ? 0 : s - d;
          if ('top' == this.__align[1]) c = u > h ? c - _ : c;
          else c = c - _ < 0 ? c : c - _;
          break;
        default:
          c = c - _ < 0 ? c : c - _;
          if ('left' == this.__align[1]) s = f > l ? l - d : s;
          else s = s - d < 0 ? 0 : s - d;
      }
      return { top: c, left: s };
    };
    _._$showByReference = (function () {
      var e = function (e, t) {
        e = i._$get(e);
        if (e) {
          t = t || r;
          var n = i._$offset(e);
          return {
            top: n.y - (t.top || 0),
            left: n.x - (t.left || 0),
            width: e.offsetWidth + (t.right || 0),
            height: e.offsetHeight + (t.bottom || 0),
          };
        }
      };
      return function (t) {
        t = t || r;
        this.__byPoint = t.event;
        this.__setAlign(t.align);
        if (this.__byPoint) this.__pbox = this.__doFindPosition(t.target, t.delta, this.__byPoint);
        this.__fbox = e(t.target, t.delta);
        this.__fitable = !!t.fitable;
        this._$show();
      };
    })();
    if (!0) e.copy(e.P('nej.ui'), s);
    return s;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'e38778ec2a797d0516169c81783fee70',
  'f8fa8c010d08d59fe9627203a2cf657f',
);
EDU(
  'b27de8c1436f3a72359bbe7dc9ba93c7',
  function (e, t, i, n, a, o, s, r, c, d, _) {
    var l;
    r._$$CardWrapper = t._$klass();
    l = r._$$CardWrapper._$extend(o._$$LayerWrapper);
    r._$$CardWrapper._$attach = (function () {
      var e = function (e, t, i, o, s) {
        var r,
          c = t + '-i',
          d = i.__cdpol,
          _ = !!o.noclear,
          l = !!o.toggled;
        if (a._$isFunction(o.onbeforeclick)) {
          var h = o.noclear,
            f = o.toggled;
          try {
            o.onbeforeclick(o);
          } catch (u) {}
          _ = !!o.noclear;
          l = !!o.toggled;
          o.toggled = f;
          o.noclear = h;
        }
        var p = d[c];
        if (!l || !p) {
          n._$stop(e);
          if (!_) {
            n._$dispatchEvent(document, 'click');
            r = i._$allocate(o);
          } else r = i._$getInstanceWithReset(o, !0);
          d[c] = r;
          r._$setEvent('onbeforerecycle', function () {
            delete d[c];
          });
          r._$showByReference(s);
        } else p._$hide();
      };
      return function (t, o) {
        t = i._$get(t);
        if (t) {
          if (!this.__cdpol) this.__cdpol = {};
          var s = i._$id(t);
          if (!this.__cdpol[s]) {
            o = a._$merge({}, o);
            var r = a._$fetch({ align: '', delta: null, fitable: !1 }, o);
            r.target = s;
            o.destroyable = !0;
            if (!o.fixed) {
              r.fitable = !0;
              o.parent = document.body;
            }
            this.__cdpol[s] = [s, o.event || 'click', e._$bind2(null, s, this, o, r)];
            n._$addEvent.apply(n, this.__cdpol[s]);
          }
        }
      };
    })();
    r._$$CardWrapper._$detach = function (e) {
      if (this.__cdpol) {
        var t = i._$id(e),
          a = this.__cdpol[t];
        if (a) {
          delete this.__cdpol[t];
          n._$delEvent.apply(n, a);
          var o = this.__cdpol[t + '-i'];
          if (o) o._$hide();
        }
      }
    };
    l.__getLayerInstance = function () {
      return s._$$Card._$allocate(this.__lopt);
    };
    l.__doInitLayerOptions = function () {
      this.__super();
      this.__lopt.top = null;
      this.__lopt.left = null;
      this.__lopt.nostop = !1;
    };
    l._$showByReference = function (e) {
      if (this.__layer) this.__layer._$showByReference(e);
    };
    if (!0) e.copy(e.P('nej.ui'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '4bc2e0ec2ac53645ad0e7f1ccde39c2b',
  '718339c82039ab37605f9b07444eab0a',
);
EDU(
  '99d50ec49fda21b42033555905c40435',
  function (e) {
    return e;
  },
  'b27de8c1436f3a72359bbe7dc9ba93c7',
);
EDU(
  'd93bb14023b5e912f99da356715bd55f',
  function (e, t, i, n, a, o, s, r, c, d) {
    var _;
    s._$$Calendar = t._$klass();
    _ = s._$$Calendar._$extend(o._$$EventTarget);
    _.__reset = function (e) {
      this.__super(e);
      this.__doInitDomEvent([
        [e.mprv, 'click', this.__onMonthChange._$bind(this, -1)],
        [e.mnxt, 'click', this.__onMonthChange._$bind(this, 1)],
        [e.yprv, 'click', this.__onYearChange._$bind(this, -1)],
        [e.ynxt, 'click', this.__onYearChange._$bind(this, 1)],
        [e.wprv, 'click', this.__onWeekChange._$bind(this, -1)],
        [e.wnxt, 'click', this.__onWeekChange._$bind(this, 1)],
        [e.wprv, 'click', this.__onDayChange._$bind(this, -1)],
        [e.wnxt, 'click', this.__onDayChange._$bind(this, 1)],
      ]);
      this.__offset = e.offset || 0;
      this.__nyear = i._$get(e.year);
      this.__nmonth = i._$get(e.month);
      this.__selected = e.selected || 'js-selected';
      this.__extended = e.extended || 'js-extended';
      this.__disabled = e.disabled || 'js-disabled';
      this.__doRangeCheck(e.range);
      this.__doDateListCheck(e.list);
      this._$setDate(e.date || new Date());
    };
    _.__destroy = function () {
      this.__super();
      delete this.__list;
      delete this.__range;
      delete this.__nyear;
      delete this.__nmonth;
    };
    _.__doRangeCheck = function (e) {
      this.__range = e || [];
      var t = this.__range[0];
      this.__range[0] = a._$isDate(t) ? +t : t || 0;
      var t = this.__range[1];
      this.__range[1] = a._$isDate(t) ? +t : t || 0;
    };
    _.__doDateListCheck = (function () {
      var e = function (e) {
        this.__list.push(e);
        this.__doInitDomEvent([[e, 'click', this.__onDateChange._$bind(this)]]);
      };
      return function (t) {
        this.__list = [];
        a._$forEach(t, e, this);
      };
    })();
    _.__doSaveDateInfo = (function () {
      var e = function (e, t) {
        var i = e[0],
          n = e[1];
        return t < i || (!!n && t > n);
      };
      return function (t, n, a, o) {
        i._$dataset(t, 'y', n);
        i._$dataset(t, 'm', a);
        i._$dataset(t, 'd', o);
        t.innerText = o;
        t.title = n + '年' + a + '月' + o + '日';
        if (n == this.__year && a == this.__month && o == this.__date)
          i._$addClassName(t, this.__selected);
        else i._$delClassName(t, this.__selected);
        e(this.__range, +new Date(n, a - 1, o))
          ? i._$addClassName(t, this.__disabled)
          : i._$delClassName(t, this.__disabled);
      };
    })();
    _.__doSyncDateShow = (function () {
      var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var t = function (e) {
        return !(e % 400 && (e % 4 || !(e % 100)));
      };
      var n = function (i, n) {
        return 2 == n && t(i) ? 29 : e[n - 1];
      };
      return function () {
        var e = this.__year,
          t = this.__month,
          a = new Date(e, t - 1, 1),
          o = (7 + a.getDay() - this.__offset) % 7,
          s = Math.min(this.__list.length, o + n(e, t));
        if (this.__nyear) this.__nyear.innerText = this.__year;
        if (this.__nmonth) this.__nmonth.innerText = this.__month;
        for (var r = o, c; r < s; r++) {
          c = this.__list[r];
          this.__doSaveDateInfo(c, e, t, r - o + 1);
          i._$delClassName(c, this.__extended);
        }
        if (o > 0) {
          var a = new Date(e, t - 2 || 0, 1);
          var d = a.getFullYear();
          var _ = a.getMonth() + 1;
          var l = n(d, _);
          for (var r = o - 1, c; r >= 0; r--) {
            c = this.__list[r];
            this.__doSaveDateInfo(c, d, _, l--);
            i._$addClassName(c, this.__extended);
          }
        }
        var h = this.__list.length;
        if (s < h - 1) {
          var a = new Date(e, t, 1);
          var d = a.getFullYear();
          var _ = a.getMonth() + 1;
          for (var r = s, f = 1; r < h; r++) {
            c = this.__list[r];
            this.__doSaveDateInfo(c, d, _, f++);
            i._$addClassName(c, this.__extended);
          }
        }
      };
    })();
    _.__onYearChange = function (e) {
      this.__year += e;
      this.__doSyncDateShow();
      this._$dispatchEvent('onchange', this._$getDate());
    };
    _.__onMonthChange = function (e) {
      this.__month += e;
      if (this.__month < 1) {
        this.__year--;
        this.__month += 12;
      }
      if (this.__month > 12) {
        this.__year += Math.floor(this.__month / 12);
        this.__month = ((this.__month - 1) % 12) + 1;
      }
      this.__doSyncDateShow();
      this._$dispatchEvent('onchange', this._$getDate());
    };
    _.__onDateChange = function (e) {
      var t = n._$getElement(e);
      if (!i._$hasClassName(t, this.__disabled)) {
        this.__year = parseInt(i._$dataset(t, 'y'));
        this.__month = parseInt(i._$dataset(t, 'm'));
        this.__date = parseInt(i._$dataset(t, 'd'));
        this.__doSyncDateShow();
        this._$dispatchEvent('onselect', this._$getDate());
      }
    };
    _.__onWeekChange = function (e) {};
    _.__onDayChange = function (e) {};
    _._$setDate = function (e) {
      e = a._$var2date(e);
      this.__year = e.getFullYear();
      this.__month = e.getMonth() + 1;
      this.__date = e.getDate();
      this.__doSyncDateShow();
    };
    _._$getDate = function () {
      return new Date(this.__year, this.__month - 1, this.__date);
    };
    if (!0) e.copy(e.P('nej.ut'), s);
    return s;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
EDU(
  '9106814aa2d29968ca051d4d90125a86',
  '.#<uispace>{width:210px;border:1px solid #aaa;font-size:14px;text-align:center;}\n.#<uispace> .zact{line-height:30px;overflow:hidden;zoom:1;}\n.#<uispace> .zact .zfl{float:left;}\n.#<uispace> .zact .zfr{float:right;}\n.#<uispace> .zact .zbtn{padding:0 5px;cursor:pointer;}\n.#<uispace> .zact .ztxt{margin-left:10px;}\n.#<uispace> .zday{table-layout:fixed;border-collapse:collapse;width:100%;}\n.#<uispace> .zday th{font-weight:normal;}\n.#<uispace> .zday a{display:block;height:22px;line-height:22px;color:#333;text-decoration:none;}\n.#<uispace> .zday a:hover{background:#eee;}\n.#<uispace> .zday a.js-extended{color:#aaa;}\n.#<uispace> .zday a.js-selected,\n.#<uispace> .zday a.js-selected:hover{background:#DAE4E7;}\n.#<uispace> .zday a.js-disabled,\n.#<uispace> .zday a.js-disabled:hover{background:#fff;color:#eee;cursor:default;}',
);
EDU(
  '9a2dae3a96fd05c89f8e92587ad9b01b',
  '<textarea name=\'jst\' id=\'#<seedDate>\'>\n\t<table class="zday">\n\t\t<tr>{list ["日","一","二","三","四","五","六"] as x}<th>${x}</th>{/list}</tr>\n\t\t{list 1..6 as x}\n\t\t<tr>{list 1..7 as y}<td><a href="javascript:void(0);" class="js-ztag"></a></td>{/list}</tr>\n\t\t{/list}\n    </table>\n</textarea>\n\n<textarea name=\'txt\' id=\'#<seedAction>\'>\n\t<div class="zact">\n\t\t<span class="zbtn zfl" title="上一年">&lt;&lt;</span>\n\t\t<span class="zbtn zfl" title="上一月">&lt;</span>\n\t\t<span class="zbtn zfr" title="下一年">&gt;&gt;</span>\n\t\t<span class="zbtn zfr" title="下一月">&gt;</span>\n\t\t<span class="ztxt"></span>年\n\t\t<span class="ztxt"></span>月\n\t</div>\n</textarea>',
);
EDU(
  'c8e2f94428503238a8e7e3be165a1b18',
  function (e, t, i, n, a, o, s, r, c, d, _, l, h, f) {
    var u,
      p,
      m = i._$pushCSSText(c),
      b = s._$parseUITemplate(d),
      g = b['seedDate'],
      E = b['seedAction'];
    _._$$DatePick = t._$klass();
    u = _._$$DatePick._$extend(a._$$CardWrapper);
    u.__init = function () {
      this.__copt = { onselect: this.__onDateChange._$bind(this) };
      this.__super();
    };
    u.__reset = function (e) {
      this.__super(e);
      this.__copt.range = e.range;
      this.__calendar = o._$$Calendar._$allocate(this.__copt);
      this._$setDate(e.date || new Date());
    };
    u.__destroy = function () {
      this.__super();
      delete this.__copt.range;
      var e = this.__calendar;
      if (e) {
        delete this.__calendar;
        e._$recycle();
      }
    };
    u.__initXGui = function () {
      this.__seed_css = m;
      this.__seed_html = p;
    };
    u.__initNode = function () {
      this.__super();
      var e = i._$getChildren(this.__body);
      this.__copt.list = i._$getByClassName(e[1], 'js-ztag');
      e = i._$getChildren(e[0]);
      this.__copt.yprv = e[0];
      this.__copt.mprv = e[1];
      this.__copt.ynxt = e[2];
      this.__copt.mnxt = e[3];
      this.__copt.year = e[4];
      this.__copt.month = e[5];
    };
    u.__initNodeTemplate = function () {
      p = s._$addNodeTemplate(
        '<div class="' + m + ' zcard">' + s._$getTextTemplate(E) + r._$get(g) + '</div>',
      );
      this.__seed_html = p;
    };
    u.__onDateChange = function (e) {
      try {
        this._$dispatchEvent('onchange', e);
      } catch (t) {}
      window.setTimeout(this._$hide._$bind(this), 0);
    };
    u._$setDate = function (e) {
      e = n._$var2date(e);
      this.__calendar._$setDate(e);
    };
    u._$getDate = function () {
      return this.__calendar._$getDate();
    };
    if (!0) e.copy(e.P('nej.ui'), _);
    return _;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '99d50ec49fda21b42033555905c40435',
  'd93bb14023b5e912f99da356715bd55f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '9106814aa2d29968ca051d4d90125a86',
  '9a2dae3a96fd05c89f8e92587ad9b01b',
);
EDU(
  '4e864010811e0e31c689fda70e8a9dc7',
  function () {
    var e = NEJ.O,
      t = window,
      i = NEJ.P('nej.e'),
      n = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('nej.ui'),
      d,
      _ = [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
      ];
    var l = i._$pushCSSText(
      '        .#<uispace> .disable{color:#aaa;}        .#<uispace> .dateDay,.dateMin{border:1px solid #ccc;width:70px;height:18px;padding:4px 3px;margin:2px 5px 0 0;cursor:pointer;background-color:#fff;text-align:center;}        .#<uispace> .dateMin{width:50px;margin-right:10px;background-position:41px -197px;}        .#<uispace> .dateDayLayer{top:26px;left:1px;z-index:10001;}        .#<uispace> .dateMinLayer{z-index:10001;top:26px;left:83px;width:57px;height:165px;background-color:#FFF;border:1px solid #ddd;box-shadow:0px 0px 4px 0px #DDD;overflow-y:scroll;font-size:13px;}        .#<uispace> .dateMinLayer span{display:block;height:22px;line-height:22px;color:#999;padding:0 0 0 3px;cursor:pointer;}        .#<uispace> .dateMinLayer span:hover{background-color:#ececee;}        .#<uispace> .dateDayLayer .zcard{box-shadow:0px 0px 4px 0px #DDD;border:1px solid #ddd;}        .#<uispace> .dateDayLayer .zact{font-size:12px;color:#333;font-family:sans-serif;}        .#<uispace> .dateDayLayer .zbtn{color:#747474;}        .#<uispace> .dateDayLayer .zday .js-extended{color:#ccc;}        .#<uispace> .dateDayLayer .zday th{font-size: 12px;font-family: sans-serif;text-align:center;color:#333;}        .#<uispace> .dateDayLayer .zday td{font-size: 12px;font-family: sans-serif;text-align:center;color:#333;}        .#<uispace> .dateDayLayer .zday a{font-size:10px;font-family:sans-serif;color:#666;}        .#<uispace> .dateDayLayer .zday a.js-selected{background-color:#83b600;color:#fff;}        .#<uispace> .dateDayLayer .zday a.js-disabled{color:#eee;}        ',
    );
    var h = i._$addNodeTemplate(
      '<div class="u-datePick">\t\t       <div class="f-fl dateDay j-dateDay">日期</div>\t\t       <div class="f-pa dateDayLayer j-dateDayLayer"></div>\t\t       <div class="f-fl dateMin j-dateMin">时刻</div>\t\t       <div class="f-pa f-dn dateMinLayer j-dateMinLayer"></div>\t       </div>',
    );
    s._$$DatepickUI = NEJ.C();
    d = s._$$DatepickUI._$extend(s._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = h;
      this.__seed_css = l;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__dateDaytxt = i._$getByClassName(this.__body, 'j-dateDay')[0];
      this.__dateMintxt = i._$getByClassName(this.__body, 'j-dateMin')[0];
      this.__dateDayLayer = i._$getByClassName(this.__body, 'j-dateDayLayer')[0];
      this.__dateMinLayer = i._$getByClassName(this.__body, 'j-dateMinLayer')[0];
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__notShowHM = e.notShowHM;
      this.__range = e.range || null;
      this.__onInitDateHandle(e.date || null);
      this.__baseReset();
    };
    d.__baseReset = function () {
      n._$clearEvent(this.__dateDaytxt, 'click');
      n._$clearEvent(this.__dateMintxt, 'click');
      n._$addEvent(this.__dateDaytxt, 'click', this.__onSelectDateHandle._$bind(this));
      n._$addEvent(this.__dateMintxt, 'click', this.__onSelectHourHandle._$bind(this));
      n._$addEvent(
        document,
        'click',
        function () {
          i._$addClassName(this.__dateMinLayer, 'f-dn');
        }._$bind(this, null),
      );
      this.__dateMinLayer.innerHTML = '';
      r._$forEach(
        _,
        function (e, t) {
          this.__dateMinLayer.innerHTML += '<span>' + e + '</span>';
        }._$bind(this),
      );
      var e = i._$getChildren(this.__dateMinLayer);
      r._$forEach(
        e,
        function (e, t) {
          n._$addEvent(
            e,
            'click',
            function () {
              this.__dateMintxt.innerText = e.innerText;
              var t = e.innerText.split(':');
              this.__dateByMin = 36e5 * Number(t[0]) + 6e4 * Number(t[1]);
              this.__onSelectHourHandle();
            }._$bind(this),
          );
        }._$bind(this),
      );
      if (this.__notShowHM) {
        s._$hiddenNode(this.__dateMintxt);
        s._$hiddenNode(this.__dateMinLayer);
      }
    };
    d.__onInitDateHandle = function (e) {
      if (e) {
        var t = new Date();
        t.setTime(e);
        var i = t.getHours(),
          n = t.getMinutes();
        this.__dateDaytxt.innerText =
          t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
        this.__dateMintxt.innerText = (i < 10 ? '0' + i : i) + ':' + (n < 10 ? '0' + n : n);
        this.__dateByMin = 36e5 * i + 6e4 * n;
        this.__dateByDay = e - this.__dateByMin;
      } else {
        if (this.__notShowHM) this.__dateDaytxt.innerText = '选择日期';
        else this.__dateDaytxt.innerText = '日期';
        this.__dateMintxt.innerText = '时刻';
        this.__dateByDay = 0;
        this.__dateByMin = 0;
      }
    };
    d.__onSelectDateHandle = function (e) {
      if (e) n._$stop(e);
      this._$dispatchEvent('onClick');
      this._$dispatchEvent('onDateClick');
      this.__onSelectHourHandle();
      if (!this.__dpUI) {
        i._$addClassName(this.__dateDaytxt, 'selected');
        this.__dpUI = c._$$DatePick._$allocate({
          parent: this.__dateDayLayer,
          range: this.__range,
        });
        this.__dpUI._$addEvent(
          'onchange',
          function (e) {
            this.__dateDaytxt.innerText =
              e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
            this.__dateByDay = Date.parse(e);
          }._$bind(this),
        );
      }
    };
    d.__onSelectHourHandle = function (e) {
      if (e) {
        n._$stopBubble(e);
        if (i._$hasClassName(this.__dateMintxt, 'selected')) {
          i._$delClassName(this.__dateMintxt, 'selected');
          i._$addClassName(this.__dateMinLayer, 'f-dn');
        } else {
          i._$addClassName(this.__dateMintxt, 'selected');
          i._$delClassName(this.__dateMinLayer, 'f-dn');
        }
        this._$dispatchEvent('onClick');
        this._$dispatchEvent('onMinClick');
      } else {
        i._$delClassName(this.__dateMintxt, 'selected');
        i._$addClassName(this.__dateMinLayer, 'f-dn');
      }
      if (this.__dpUI) {
        i._$delClassName(this.__dateDaytxt, 'selected');
        this.__dpUI = c._$$DatePick._$recycle(this.__dpUI);
      }
    };
    d._$getDate = function () {
      var e = {
        day: this.__dateByDay,
        hour: this.__dateByMin,
        totalData: this.__dateByDay + this.__dateByMin,
      };
      return e;
    };
    d._$setDate = function (e) {
      this.__onInitDateHandle(e);
    };
    d._$disEnable = function () {
      n._$clearEvent(this.__dateDaytxt, 'click');
      n._$clearEvent(this.__dateMintxt, 'click');
      i._$addClassName(this.__dateDaytxt, 'disable');
      i._$addClassName(this.__dateMintxt, 'disable');
    };
    d._$enable = function () {
      i._$delClassName(this.__dateDaytxt, 'disable');
      i._$delClassName(this.__dateMintxt, 'disable');
      this.__onInitDateHandle(null);
      this.__baseReset();
    };
    d._$hideDateMin = function () {
      i._$addClassName(this.__dateMinLayer, 'f-dn');
      i._$delClassName(this.__dateMintxt, 'selected');
    };
    d._$hideDateAndHour = function () {
      this._$hideDateMin();
      if (this.__dpUI) this.__dpUI._$hide();
    };
    d.__destroy = function () {
      i._$delClassName(this.__dateDaytxt, 'disable');
      i._$delClassName(this.__dateMintxt, 'disable');
      i._$delClassName(this.__dateMintxt, 'selected');
      i._$addClassName(this.__dateMinLayer, 'f-dn');
      n._$clearEvent(this.__dateDaytxt, 'click');
      n._$clearEvent(this.__dateMintxt, 'click');
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'c8e2f94428503238a8e7e3be165a1b18',
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'c8e2f94428503238a8e7e3be165a1b18',
);
EDU(
  'cdf25b5b7ebe60e2b3e1f74f71d61de8',
  function () {
    var e = NEJ.O,
      t = window,
      i = NEJ.P('nej.e'),
      n = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '        .#<uispace> div{text-align:left;}        .#<uispace>.m-AccountUI .inputtxt{padding: 5px;font-size: 12px;background: #fafafa;border: none;overflow-y: auto;overflow-x: hidden;resize: none;}        .#<uispace>.m-AccountUI .area{border: 1px solid #ddd;}        .#<uispace> .infobox{float:left;}        .#<uispace> .label{top: 7px;left: 8px;position: absolute;color:#999;}        .#<uispace> .yuan{height:35px;line-height:35px;padding-left:10px;}        .#<uispace>.m-AccountUI .tit{height:35px;line-height:35px;}       ',
    );
    var d = i._$addNodeTemplate(
      '<div class="m-AccountUI u-insug f-cb">    \t   <div class="f-cb">    \t   \t\t<label for="forPrice" class="f-fl tit">学期报名价格：</label>\t       \t\t<div class="area j-inputArea f-fl f-pr">\t\t\t\t\t<input type="text" class="j-input inputtxt"/>\t\t\t\t\t<label class="j-label label"></label>\t\t\t   \t</div>\t       \t\t<div class="yuan f-fl j-yuan">元</div>\t       </div>\t       <p class="tipinfo f-fc9">请输入阿拉伯数字，最低0.01，最高99999.99。最多保留小数点后两位。</p>\t       <div class="j-infobox">\t       </div>\t\t</div>',
    );
    s._$$AccountUI = NEJ.C();
    r = s._$$AccountUI._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__inputNode = i._$getByClassName(this.__body, 'j-inputArea')[0];
      this.__infobox = i._$getByClassName(this.__body, 'j-infobox')[0];
      this.__inputtxt = i._$getByClassName(this.__body, 'j-input')[0];
      this.__yuantxt = i._$getByClassName(this.__body, 'j-yuan')[0];
    };
    r.__onAccountValid = function (e) {
      if ('hidden' == e) {
        this.__feedbackUI._$hideFeedback();
        this.__isValid = !0;
      } else if ('valid' == e) {
        if (void 0 === this.__orginPrice);
        else;
        this.__isValid = !0;
      } else {
        this.__isValid = !1;
        var t = '';
        if (2 == e) t = window.moocConfig.lang.KEY_LEARN_INVALID;
        else if ('empty' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_EMPTY;
        else if ('long' == e) t = window.moocConfig.lang.KEY_LEARN_DECIMAL_POINT;
        else if ('fushu' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_NEGATIVE;
        else if ('zero' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_CANNOT + '0';
        else if ('large' == e) t = window.moocConfig.lang.KEY_LEARN_OVERPRICED;
        else if ('quanjiao' == e) t = window.moocConfig.lang.KEY_LEARN_SWITCH_FULLWIDTH;
        else if ('big' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_GREATER + '99999.99';
        this.__feedbackUI._$showWarnTips(t);
      }
      if (this.__blurFunc) {
        this.__blurFunc();
        this.__blurFunc = null;
      }
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__orginPrice = e.priceValue;
      if (void 0 !== this.__orginPrice) this.__orginPrice = Number(this.__orginPrice);
      this.__inputUI = s._$$BaseInputUI._$allocate({
        inputArea: this.__inputNode,
        labelText: window.moocConfig.lang.KEY_LEARN_ENTER_NUMBER,
        type: 'input',
      });
      this.__noOp = !0;
      this.__isValid = !1;
      this.__inputUI._$addEvent('onInputFocus', this.__onInputFocus._$bind(this));
      this.__inputUI._$addEvent('onInputBlur', this.__onInputBlur._$bind(this));
      this.__inputUI._$addEvent('onInputChange', this.__onInputChange._$bind(this));
      this.__feedbackUI = s._$$FeedBackUI._$allocate({ parent: this.__infobox });
      this.__onAccountValid('hidden');
      if (e.inputWidth) {
        this.__inputNode.style.width = e.inputWidth + 'px';
        this.__inputtxt.style.width = e.inputWidth - 10 + 'px';
      }
      if (e.inputHeight) {
        this.__inputNode.style.height = e.inputHeight + 'px';
        this.__inputtxt.style.height = e.inputHeight - 10 + 'px';
      }
    };
    r.__onInputFocus = function () {
      this.__onAccountValid('hidden');
      this.__isFocus = !0;
    };
    r.__onInputChange = function () {
      this.__noOp = !1;
      if (this.__inputUI._$isMatchExp(/[^\x00-\xff]/)) {
        this.__onAccountValid('quanjiao');
        this.__inputUI._$setInitContent('');
      } else if (this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{1,2})?$/)) {
        this.__value = this.__inputUI._$getContent();
        if (this.__value > 99999.99) {
          this.__value = '99999.99';
          this.__onAccountValid('big');
          this.__inputUI._$setInitContent('99999.99');
        } else this.__inputUI._$setInitContent(this.__value);
      } else if (this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{3,})?$/))
        if (this.__value > 99999.99) {
          this.__onAccountValid('big');
          this.__inputUI._$setInitContent('99999.99');
        } else this.__inputUI._$setInitContent(this.__value);
      else if (!this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{0,})?$/)) this.__onAccountValid(2);
      else this.__value = this.__inputUI._$getContent();
    };
    r.__onInputBlur = function (e) {
      this.__noOp = !1;
      var t = this.__inputUI._$getContent();
      if ('' == t) this.__onAccountValid('empty');
      else if (this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{0,})?$/))
        if (!this.__inputUI._$isMatchExp(/[1-9]+/)) {
          this.__onAccountValid('zero');
          this.__inputUI._$setInitContent('');
        } else {
          var i = this.__value;
          if (void 0 === this.__orginPrice) {
            var n = i.split('.')[0];
            var a = i.split('.')[1];
            if ('undefined' == typeof a) a = '00';
            else if (a.length <= 1) a += '0';
            var o = n + '.' + a;
            this.__inputUI._$setInitContent(o);
            this.__onAccountValid('valid');
          } else if (0 === this.__orginPrice) this.__onAccountValid('nooriginprice');
          else this.__onAccountValid('valid');
        }
      else if (this.__inputUI._$isMatchExp(/[^\x00-\xff]/)) this.__onAccountValid('quanjiao');
      else this.__onAccountValid(2);
      this.__isFocus = !1;
    };
    r.__addBlurCallback = function (e) {
      this.__blurFunc = e;
    };
    r.__destroy = function () {
      if (this.__inputUI) this.__inputUI = s._$$BaseInputUI._$recycle(this.__inputUI);
      if (this.__feedbackUI) this.__feedbackUI = s._$$FeedBackUI._$recycle(this.__feedbackUI);
      this.__supDestroy();
    };
    r._$isFocused = function () {
      return this.__isFocus;
    };
    r._$isValid = function () {
      return this.__isValid;
    };
    r._$getContent = function () {
      return this.__inputUI._$getContent();
    };
    r._$setContent = function (e) {
      this.__inputUI._$setInitContent(e);
      this.__value = e;
    };
    r._$disableInput = function () {
      this.__inputUI._$setInitContent(' ');
      this.__inputtxt.setAttribute('disabled', 'disabled');
      i._$addClassName(this.__yuantxt, 's-fc2');
    };
    r._$enableInput = function () {
      this.__inputtxt.removeAttribute('disabled');
      i._$delClassName(this.__yuantxt, 's-fc2');
    };
    r._$getInputUI = function () {
      return this.__inputUI;
    };
    r._$hideFeedback = function () {
      this.__feedbackUI._$hideFeedback();
    };
    r._$showFeedback = function (e) {
      if (e) this.__feedbackUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_ENTER_PRICE);
      else if (this.__noOp)
        this.__feedbackUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_ENTER_PRICE);
    };
    r._$setOriginPrice = function (e, t) {
      this.__orginPrice = Number(e);
      if (t) this.__onInputBlur(null);
    };
  },
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '342ad7ae4eea50c3cad860686650a915',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
EDU(
  'aa75ab57e1533bbc2fc6aea356d2ba42',
  function (e, t, i, n, a, o, s, r, c, d) {
    o._$$SelectHelper = t._$klass();
    d = o._$$SelectHelper._$extend(a._$$EventTarget);
    d.__reset = function (e) {
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
    d.__destroy = function () {
      this.__super();
      delete this.__selected;
      delete this.__hovered;
      delete this.__parent;
      delete this.__kbody;
      delete this.__clazz;
      delete this.__nopt;
      delete this.__loop;
    };
    d.__isItemElement = function (e) {
      if (this.__clazz) return i._$hasClassName(e, this.__clazz);
      else return e.parentNode == this.__parent;
    };
    d.__getKeyBoardParent = (function () {
      var e = 1e3;
      return function (t) {
        for (; t && (parseInt(t.tabIndex) || 0) <= e;) t = t.parentNode;
        return t || document;
      };
    })();
    d.__getItemElement = function (e) {
      var t = i._$getByClassName(this.__parent, e);
      return !t ? null : t[0];
    };
    d.__doSyncSelection = function (e, t) {
      i._$delClassName(e.last, t);
      i._$addClassName(e.target, t);
      if (t == this.__selected && e.last != e.target) {
        this.__doScrollToView(e.target);
        this._$dispatchEvent('onchange', e);
      }
    };
    d.__doScrollToView = function (e) {
      var t = i._$getScrollViewPort(e),
        n = i._$offset(e, t);
      if (!(n.y - t.scrollTop < 0)) {
        var a = n.y + e.offsetHeight - t.clientHeight;
        if (a > t.scrollTop) t.scrollTop = a;
      } else t.scrollTop = n.y;
    };
    d.__doParseSelection = function (e, t) {
      var i = n._$getElement(e, this.__isItemElement._$bind(this));
      return !i
        ? null
        : {
            last: this.__getItemElement(t),
            target: i,
          };
    };
    d.__doCheckKBAction = function (e) {
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
    d.__doCheckKBEnter = function (e) {
      n._$stop(e);
      this._$dispatchEvent('onselect', { enter: !0, target: this._$getSelectedNode() });
    };
    d.__onCheckClick = function (e) {
      n._$stop(e);
      var t = this.__doParseSelection(e, this.__selected);
      if (t) {
        this.__doSyncSelection(t, this.__selected);
        this._$dispatchEvent('onselect', { target: t.target });
      }
    };
    d.__onCheckHover = function (e) {
      var t = this.__doParseSelection(e, this.__hovered);
      if (t) {
        this.__doSyncSelection(t, this.__hovered);
        if (this.__kbody.focus) this.__kbody.focus();
      }
    };
    d.__onCheckLeave = function (e) {
      if (this.__hovered != this.__selected)
        i._$delClassName(this.__getItemElement(this.__hovered), this.__hovered);
    };
    d._$getSelectedNode = function () {
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
  function (e, t, i, n, a, o, s, r, c) {
    var d;
    o._$$Suggest = t._$klass();
    d = o._$$Suggest._$extend(n._$$EventTarget);
    d.__init = function () {
      this.__sopt = {
        loopable: !0,
        onselect: this.__onSelect._$bind(this),
        onchange: this.__onSelectionChange._$bind(this),
      };
      this.__super();
    };
    d.__reset = function (e) {
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
    d.__destroy = function () {
      this.__super();
      if (this.__helper) {
        this.__helper._$recycle();
        delete this.__helper;
      }
      delete this.__xxx;
      delete this.__input;
      delete this.__sopt.parent;
    };
    d.__onBlur = function () {
      this.__onSelect({ target: this.__helper._$getSelectedNode() });
    };
    d.__onInput = function () {
      var e = this.__input.value.trim();
      if (!e) this._$visibile(!1);
      else if (!this.__xxx) this._$dispatchEvent('onchange', e);
    };
    d.__doUpdateValue = function (e) {
      if (!this.__xxx) {
        this.__xxx = !0;
        if (e && e != this.__input.value) this.__input.value = e;
        this.__xxx = !1;
      }
    };
    d.__onSelect = function (e) {
      var t = i._$dataset(e.target, 'value') || '';
      this.__doUpdateValue(t);
      t = t || this.__input.value;
      this._$update('');
      this._$dispatchEvent('onselect', t, { target: e.target, enter: e.enter, value: t });
    };
    d.__onSelectionChange = function (e) {
      if (this.__auto) this.__doUpdateValue(i._$dataset(e.target, 'value') || '');
    };
    d._$setList = function (e) {
      this._$visibile(!!e && e.length > 0);
    };
    d._$visibile = function (e) {
      var e = !e ? 'hidden' : 'visible';
      this.__sopt.parent.style.visibility = e;
      if ('hidden' === e) this.__sopt.parent.innerHTML = '';
    };
    d._$update = function (e) {
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
        var r = s.innerText;
        this.__sopt.parent.style.visibility = 'hidden';
        if (!this.__noInputFill) this.__input.value = r;
        this._$setList();
        var c;
        n._$forEach(e, function (e) {
          if (t._$dataset(s, 'id') == e.id) c = e;
        });
        if (o) {
          c.keyCode = 13;
          c.isEnterKeyPressed = o;
        }
        this._$dispatchEvent('onselect', c);
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
      r,
      c;
    var d = i._$pushCSSText(
      '        .#<uispace>-parent{position:absolute;left:-1px;border:1px solid #d5d5d5;width:100%;background:#FAFAFA;z-index:999;}        .#<uispace>-parent .j-cnt{width:100%;color:#444;visibility:hidden;}\t\t.#<uispace>-parent .zitm-top{width:100%;text-indent:6px;line-height:32px;cursor:pointer;}        .#<uispace>-parent .zitm,.#<uispace>-parent .zitm p{width:100%;text-indent:6px;line-height:32px;cursor:pointer;}\t\t.#<uispace>-parent .zitm a{display:block;overflow:hidden;text-overflow:ellipsis;font-size:12px}\t\t.#<uispace>-parent .zitm:hover,.#<uispace>-parent .zitm:hover p{color:#16914E;background-color:#ECECEE;}        .#<uispace>-parent .js-selected,.#<uispace>-parent .js-selected p{color:#16914E;background-color:#ECECEE;}',
    );
    var _;
    s._$$Suggest = NEJ.C();
    r = s._$$Suggest._$extend(o._$$Abstract);
    c = s._$$Suggest._$supro;
    s._$$Suggest._$getInstance = function (e) {
      if (_) {
        _.__suggest._$recycle();
        delete _.__suggest;
        _.__reset(e);
        return _;
      } else {
        _ = s._$$Suggest._$allocate(e);
        return _;
      }
    };
    r.__init = function () {
      this.__sopt = {
        onchange: this.__onChange._$bind(this),
        onselect: this.__onSelect._$bind(this),
        onblur: this.__onBlur._$bind(this),
      };
      this.__supInit();
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__suggestOption = e.suggestOption;
      this.__separate = e.separate;
      this.__sopt.body = this.__suggestOption;
      this.__sopt.input = i._$get(e.input);
      this.__sopt.input.insertAdjacentElement('afterEnd', e.parent);
      this.__sopt.noInputFill = e.noInputFill;
      this.__suggest = s._$$SuggestAgent._$allocate(this.__sopt);
    };
    r.__destroy = function () {
      this.__supDestroy();
      this.__suggest._$recycle();
      delete this.__suggest;
      delete this.__sopt.input;
    };
    r.__initXGui = function () {
      this.__seed_css = d;
    };
    r.__initNode = function () {
      this.__supInitNode();
    };
    r.__onChange = function (e, t) {
      this._$dispatchEvent('onchange', e, t);
    };
    r.__onSelect = function (e) {
      if (n._$isObject(e)) this._$dispatchEvent('onselect', e);
    };
    r.__onBlur = function (e) {
      this._$dispatchEvent('onblur', e);
    };
    r._$setList = function (e, t, a) {
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
  '68140d527eabb13c83a92c899000ea65',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d =
        '            <div class="u-sugInput">                <div class="iptArea f-cb">                    <div class="ipt"></div>                    <a class="add u-btn u-btn-default">添加</a>                </div>                <p></p>                <p></p>                <div class="tags"></div>            </div>',
      _;
    c._$$InfoSuggest = NEJ.C();
    _ = c._$$InfoSuggest._$extend(c._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(d);
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__inputWrp = n._$getChildren(this.__body)[0];
      this.__inputP = n._$getChildren(this.__inputWrp)[0];
      this.__add = n._$getChildren(this.__inputWrp)[1];
      this.__countTxt = n._$getChildren(this.__body)[1];
      this.__hintTxt = n._$getChildren(this.__body)[2];
      this.__tagP = n._$getChildren(this.__body)[3];
      this.__tagArr = [];
      this.__tagVo = [];
      this.__charUtil = new r._$$CharasetUtil();
      a._$addEvent(this.__add, 'click', this.__onAddHandle._$bind(this));
      this.__suggestionCache = new s._$$COM_Cache_SuggestionCache();
      this.__suggestionCache._$addEvent(
        'onGetTeacherInChargeSuggest',
        this.__onGetSuggestion._$bind(this),
      );
      this.__suggestionCache._$addEvent('onGetSuggestCourse', this.__onGetSuggestion._$bind(this));
    };
    _.__onGetSuggestion = function (e) {
      this.__list = [];
      for (var t = 0; t < e.length; t++) {
        e[t].text = 'text';
        if ('chargeTeacher' == this.__phrase) {
          if (!e[t].nickName) e[t].nickName = '';
          e[t].name = e[t].lectorName + ' (' + e[t].schoolName + ' ' + e[t].nickName + ')';
          e[t].id = e[t].lectorId;
        } else if ('spocCourse' == this.__phrase) {
          if (!e[t].name) e[t].name = '';
          e[t].name = e[t].name + ' (' + (e[t].schoolPanel || {}).name + ')';
        }
        e[t].title = '';
        this.__list.push(e[t]);
      }
      this.__inputSug._$onSetLabelSuggestion(this.__list);
    };
    _.__onAddHandle = function () {
      var e = this.__inputSug.__input._$getContent();
      e = e.replace(/\s/g, '_');
      if ('' == e) {
        c.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_PLEASE_LABEL, type: 2 });
        return !1;
      }
      this.__inputSug.__input._$setInitContent();
    };
    _.__reset = function (e) {
      this.__supReset(e);
      this.__tagCount = e.tagCount;
      this.__countTxt.innerText = window.moocConfig.lang.KEY_LEARN_YOU_UP + this.__tagCount + '个';
      this.__hintTxt.innerText = e.hint || '';
      this.__labelText = e.labelText || '';
      this.__tagArr = [];
      this.__phrase = e.phrase || '';
      this.__schoolId = null;
      if ('chargeTeacher' == this.__phrase || 'spocCourse' == this.__phrase) {
        c._$hiddenNode(this.__countTxt);
        c._$hiddenNode(this.__add);
        c._$hiddenNode(this.__countTxt);
      } else c._$showNode(this.__countTxt);
      this.__inputSug = c._$$InputSuggest._$allocate({
        parent: this.__inputP,
        labelText: this.__labelText,
        width: 280,
        height: 32,
        onSelect: this.__selectSuggest._$bind(this),
        onKeyDown: this.__onInputKeyDown._$bind(this),
        onSuggest: this.__postSuggest._$bind(this),
        onDeleteCnt: function () {
          this._$dispatchEvent('onDeleteCnt');
        }._$bind(this),
        onInputFocus: function () {
          this._$dispatchEvent('onInputFocus');
        }._$bind(this),
      });
    };
    _.__onInputKeyDown = function (e) {
      if (13 == e.keyCode)
        if (0 == this.__list.length) {
          var t = this.__inputSug.__input._$getContent();
          this.__inputSug.__input._$setInitContent('');
          this.__inputSug.__input._$blurTextArea();
        }
    };
    _.__selectSuggest = function (e) {
      for (var t = 0; t < this.__list.length; t++)
        if (this.__list[t].id == e.id) NEJ.X(e, this.__list[t]);
      this._$dispatchEvent('onSelect', e);
    };
    _.__destroy = function () {
      this.__schoolId = null;
      this.__inputSug = c._$$InputSuggest._$recycle(this.__inputSug);
      this.__supDestroy();
    };
    _.__postSuggest = function (e) {
      if ('chargeTeacher' == this.__phrase)
        this.__suggestionCache._$getChargeTeacherSuggestion(e, this.__schoolId);
      else if ('spocCourse' == this.__phrase) this.__suggestionCache._$listCourseByName(e);
    };
    _._$setSchoolId = function (e) {
      this.__schoolId = e;
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
  'add7e5d4d4a772d787eec2ad51e08ae5',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '9fdfe36fa0d16f9b8a86b6a56a15749d',
  '342ad7ae4eea50c3cad860686650a915',
  'cc26d5920093e9742f0feca3855e8e68',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '1b395bb66fd465664ef6cf2e2ded18c1',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.ui'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      _;
    var l = n._$pushCSSText(
      '        .#<uispace> .topinfo{margin-bottom:5px;}        .#<uispace> .tipinfo{margin-top:5px;line-height:20px;width:305px;}        .#<uispace> .tit{height:20px;line-height:20px;padding-bottom:5px;font-size:14px;}        .#<uispace> .dateDay,.dateMin {text-align: center;}        .#<uispace> .timeSet{top:35px;left:0;z-index:3000;}        .#<uispace> .timesetType,.chargeType{margin:5px 15px;}        .#<uispace> .timesetType input, .chargeType input{vertical-align:middle;margin-right:5px;}        .#<uispace> .timesetType label, .chargeType input{vertical-align:middle;}        .#<uispace> .timesetting .timedetail{margin: 5px 0 10px 36px;}        .#<uispace> .timesetting .timedetail .desc{height:30px;line-height:30px;}        .#<uispace> .timesetting .timedetail .dateMinLayer{left:143px;}        .#<uispace> .timesetting .timedetail .dateDayLayer{left:60px;}        .#<uispace> .timeSet .zday a{font-size: 10px;font-family: sans-serif;color: #666;}        .#<uispace> .timeSet .zday .js-extended{color:#ccc;}        .#<uispace> .timeSet .zday .js-selected{background-color:#00A84A;color:#fff;}        .#<uispace> .timeSet .zday th{font-size: 12px;font-family: sans-serif;text-align: center;}        .#<uispace> .timeSet .zact span{font-size: 12px;font-family: sans-serif;}        .#<uispace> .m-feedbackinfo{padding: 5px 0 5px 10px;}        .#<uispace> .u-sugInput .u-btn{margin-left:10px;padding:4px 8px;line-height:22px;}        .#<uispace> .fb{height:22px;}        .#<uispace>\t.fb .m-feedbackinfo{padding:0px;}        .#<uispace>\t.schoollector{vertical-align:middle;margin-right:3px;}        .#<uispace>\t.lectorfrom{height:33px;line-height:33px;margin-left:10px;}        .#<uispace> .u-btn{padding:0 4px;height:30px;line-height:30px;}        .#<uispace> .priceBox{margin-left: 33px;}        .#<uispace> .m-chargableNode{margin-bottom: 20px;}        ',
    );
    var h = n._$addNodeTemplate(
      '\t\t\t<div class="u-caeUI">\t\t\t\t<div class="tit f-f0"><em class="f-sign">*</em>学期负责人</div>\t\t\t\t<div class="f-cb">\t\t\t\t\t<div class="j-text name f-fl"></div>\t\t\t\t\t<div class="f-fl lectorfrom"><input type="checkbox" id="schoollector" class="j-school schoollector"><label class="schoollector" for="schoollector">本校老师</label></div>\t\t\t\t</div>\t\t\t\t<p class="tipinfo f-fc9">保存后，课程负责人将不可再修改。如果查找不到，请电话联系 010-58582372  或发邮件至aina@hep.com.cn进行申请。</p>\t\t\t\t<div class="j-fd fb f-cb"></div>\t\t\t\t<blockquote class="b-20"></blockquote>\t\t\t\t<div class="tit f-f0"><em class="f-sign">*</em>制定学期开课时间和结束时间</div>\t\t\t\t<div class="f-cb timesetting">\t\t\t\t\t<div class="timesetType">\t\t\t\t\t\t<input type="radio" id="exacttimeOk" name="NeteaseAhu" class="j-timesetType">\t\t\t\t\t\t<label for="exacttimeOk">设定具体时间</label>\t\t\t\t\t</div>\t\t\t\t\t<div class="f-cb timedetail f-pr">\t\t\t\t\t\t<div class="desc j-desc f-fl">开课时间：</div>\t\t\t\t\t\t<div class="f-fl timeSet f-cb j-timeSet"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="f-cb timedetail f-pr">\t\t\t\t\t\t<div class="desc j-desc f-fl">结束时间：</div>\t\t\t\t\t\t<div class="f-fl timeSet f-cb j-timeSet"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="timesetType">\t\t\t\t\t\t<input type="radio" id="exacttimeNotOk" name="NeteaseAhu" class="j-timesetType">\t\t\t\t\t\t<label for="exacttimeNotOk">待定</label>\t\t\t\t\t</div>\t\t\t\t  </div>\t\t\t\t  <div class="j-fd fb f-cb"></div>\t\t\t\t  <div class="j-isChargableNode m-chargableNode">                      <div class="tit f-f0"><em class="f-sign">*</em> 是否收费</div>                      <div class="chargeType">                           <input type="radio" name="isChargable" class="j-chargableType">                           <label for="forFree" class="j-chargeRadio">免费</label>                      </div>                      <div class="chargeType">                           <input type="radio" name="isChargable" class="j-chargableType">                           <label for="forCharge" class="j-chargeRadio">收费</label>                      </div>                      <div class="j-priceBox priceBox">                      </div>\t\t\t\t  </div>\t\t\t  </div>\t\t',
    );
    c._$$TermCreateEditUI = NEJ.C();
    _ = c._$$TermCreateEditUI._$extend(c._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = h;
      this.__seed_css = l;
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__timeSet = n._$getByClassName(this.__body, 'j-timeSet');
      this.__txtNodes = n._$getByClassName(this.__body, 'j-text');
      this.__descNodes = n._$getByClassName(this.__body, 'j-desc');
      this.__fdNodes = n._$getByClassName(this.__body, 'j-fd');
      this.__lectorSchool = n._$getByClassName(this.__body, 'j-school')[0];
      this.__timesetTypeNode = n._$getByClassName(this.__body, 'j-timesetType');
      this.__isChargableNode = n._$getByClassName(this.__body, 'j-isChargableNode')[0];
      this.__chargableTypeNode = n._$getByClassName(this.__body, 'j-chargableType');
      this.__priceBox = n._$getByClassName(this.__body, 'j-priceBox')[0];
      a._$addEvent(this.__lectorSchool, 'click', this.__schoolLectorHandle._$bind(this));
      d._$forEach(
        this.__timesetTypeNode,
        function (e, t) {
          a._$addEvent(e, 'click', this.__timeTypeChange._$bind(this, t));
        }._$bind(this),
      );
      d._$forEach(
        this.__chargableTypeNode,
        function (e, t) {
          a._$addEvent(e, 'click', this.__chargableTypeChange._$bind(this, t));
        }._$bind(this),
      );
    };
    _.__schoolLectorHandle = function () {
      if (this.__lectorSchool.checked) this.__chargeTeacher._$setSchoolId(e.school.id);
      else this.__chargeTeacher._$setSchoolId(null);
    };
    _._$getDto = function () {
      var e = {},
        t = {};
      if (this.__timesetTypeNode[0].checked) {
        e = this.__startTimeUI._$getDate();
        t = this.__endTimeUI._$getDate();
        if (0 == e.totalData || 0 == e.day) {
          this.__fdCourseTime._$showWarnTips(window.moocConfig.lang.KEY_LEARN_START_EMPTY, !0);
          return null;
        }
        if (0 == t.totalData || 0 == t.day) {
          this.__fdCourseTime._$showWarnTips(window.moocConfig.lang.KEY_LEARN_END_EMPTY, !0);
          return null;
        }
        if (t.totalData < e.totalData) {
          this.__fdCourseTime._$showWarnTips(window.moocConfig.lang.KEY_LEARN_END_DATE, !0);
          return null;
        }
      } else if (this.__timesetTypeNode[1].checked) {
        e.totalData = c.CONST.UNDETERMINDED_STARTTIME;
        t.totalData = c.CONST.UNDETERMINDED_ENDTIME;
      }
      if (this.__chiefTeacherId == -1) {
        this.__fdChiefTeacher._$showWarnTips(window.moocConfig.lang.KEY_LEARN_COURSE_EMPTY, !0);
        return null;
      }
      this.__price = c.CONST.FREE_OF_CHARGE_TERM;
      if (this.__chargableTypeNode[0].checked) this.__price = c.CONST.FREE_OF_CHARGE_TERM;
      else if (this.__chargableTypeNode[1].checked && this.__priceUI)
        this.__price = this.__priceUI._$getContent() || 0;
      var i = {
        id: this.__id,
        courseId: this.__courseId,
        chiefTeacherId: this.__chiefTeacherId,
        startTime: e.totalData,
        endTime: t.totalData,
        checked: !!this.__timesetTypeNode[1].checked,
        lector: n._$getByClassName(this.__txtNodes[0], 'j-textarea')[0].value,
        isInSchool: this.__lectorSchool.checked,
        price: this.__price,
      };
      return i;
    };
    _.__chargableTypeChange = function (e) {
      if (0 == e) c._$hiddenNode(this.__priceBox);
      else if (1 == e) c._$showNode(this.__priceBox);
    };
    _.__timeTypeChange = function (e) {
      if (0 == e) {
        n._$delClassName(this.__descNodes[0], 'f-fc9');
        n._$delClassName(this.__descNodes[1], 'f-fc9');
        this.__startTimeUI._$enable();
        this.__endTimeUI._$enable();
        this.__startTimeUI._$setDate(this.__lastStartTime);
        this.__endTimeUI._$setDate(this.__lastEndTime);
      } else if (1 == e) {
        n._$addClassName(this.__descNodes[0], 'f-fc9');
        n._$addClassName(this.__descNodes[1], 'f-fc9');
        this.__lastStartTime = this.__startTimeUI._$getDate().totalData;
        this.__lastEndTime = this.__endTimeUI._$getDate().totalData;
        this.__startTimeUI._$disEnable();
        this.__endTimeUI._$disEnable();
        if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
      }
    };
    _.__genUI = function (t) {
      this.__chargeTeacher = c._$$InfoSuggest._$allocate({
        parent: this.__txtNodes[0],
        labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_COORDINATOR,
        onSelect: function (e) {
          this.__chiefTeacherId = e.lectorId;
        }._$bind(this),
        onDeleteCnt: function () {
          this.__chiefTeacherId = -1;
        }._$bind(this),
        onInputFocus: function () {
          if (this.__fdChiefTeacher) this.__fdChiefTeacher._$hideFeedback();
        }._$bind(this),
        phrase: 'chargeTeacher',
      });
      this.__startTimeUI = c._$$DatepickUI._$allocate({
        parent: this.__timeSet[0],
        onDateClick: function () {
          if (this.__endTimeUI && this.__endTimeUI.__dpUI) this.__endTimeUI.__dpUI._$recycle();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onMinClick: function () {
          if (this.__endTimeUI) this.__endTimeUI._$hideDateMin();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onClick: function () {
          if (this.__endTimeUI) this.__endTimeUI._$hideDateAndHour();
        }._$bind(this),
      });
      if (this.__status == c.CONST.TERMSTATUS_PUBLISHED && t.startTime <= c._$getCurServerTime()) {
        this.__startTimeUI._$disEnable();
        n._$addClassName(this.__descNodes[0], 'f-fc9');
        this.__canModifyTime = !1;
        this.__timesetTypeNode[0].disabled = !0;
        this.__timesetTypeNode[1].disabled = !0;
      } else this.__startTimeUI._$enable();
      this.__endTimeUI = c._$$DatepickUI._$allocate({
        parent: this.__timeSet[1],
        onDateClick: function () {
          if (this.__startTimeUI && this.__startTimeUI.__dpUI)
            this.__startTimeUI.__dpUI._$recycle();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onMinClick: function () {
          if (this.__startTimeUI) this.__startTimeUI._$hideDateMin();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onClick: function () {
          if (this.__startTimeUI) this.__startTimeUI._$hideDateAndHour();
        }._$bind(this),
      });
      if (this.__status == c.CONST.TERMSTATUS_PUBLISHED && t.endTime <= c._$getCurServerTime()) {
        this.__endTimeUI._$disEnable();
        n._$addClassName(this.__descNodes[1], 'f-fc9');
        this.__canModifyTime = !1;
      } else this.__endTimeUI._$enable();
      if (t && t.startTime)
        if (t.startTime == c.CONST.UNDETERMINDED_STARTTIME) {
          this.__timesetTypeNode[1].checked = !0;
          this.__timeTypeChange(1);
        } else {
          this.__timesetTypeNode[0].checked = !0;
          this.__startTimeUI._$setDate(t.startTime);
          this.__endTimeUI._$setDate(t.endTime);
          this.__lastStartTime = t.startTime;
        }
      else {
        this.__timeTypeChange(0);
        this.__timesetTypeNode[0].checked = !0;
      }
      this.__fdChiefTeacher = c._$$FeedBackUI._$allocate({ parent: this.__fdNodes[0] });
      this.__fdChiefTeacher._$hideFeedback();
      this.__fdCourseTime = c._$$FeedBackUI._$allocate({ parent: this.__fdNodes[1] });
      this.__fdCourseTime._$hideFeedback();
      if (t && t.lectorPanels) {
        for (var i = 0; i < t.lectorPanels.length; i++)
          if (
            t.lectorPanels[i].lectorType == c.CONST.REL_TYPE_TERM_CHIEF_LECTOR ||
            null === t.lectorPanels[i].lectorType
          ) {
            if (!t.lectorPanels[i].nickName) t.lectorPanels[i].nickName = '';
            this.__chargeTeacher._$setInitContent(
              t.lectorPanels[i].realName +
                ' (' +
                t.schoolPanel.name +
                ' ' +
                t.lectorPanels[i].nickName +
                ')',
            );
          }
        this.__fdCourseTime._$hideFeedback();
        this.__id = t.id;
      } else this.__id = 0;
      if ('undefined' == typeof t.isInSchool) this.__lectorSchool.checked = !0;
      else this.__lectorSchool.checked = t.isInSchool;
      this.__chargeTeacher._$setSchoolId(e.school.id);
      if (t && t.hasOwnProperty('price')) {
        this.__priceUI = c._$$AccountUI._$allocate({
          parent: this.__priceBox,
          inputWidth: 185,
          inputHeight: 32,
        });
        if (this.__status == c.CONST.TERMSTATUS_PUBLISHED || !this.__supportChargable) {
          d._$forEach(
            this.__chargableTypeNode,
            function (e) {
              e.disabled = !0;
              a._$clearEvent(e, 'click');
            }._$bind(this),
          );
          this.__priceUI._$disableInput();
        } else {
          d._$forEach(
            this.__chargableTypeNode,
            function (e, t) {
              e.disabled = !1;
              a._$addEvent(e, 'click', this.__chargableTypeChange._$bind(this, t));
            }._$bind(this),
          );
          this.__priceUI._$enableInput();
        }
        if (t.price == c.CONST.FREE_OF_CHARGE_TERM) {
          this.__chargableTypeNode[0].checked = !0;
          this.__chargableTypeChange(0);
        } else {
          this.__chargableTypeNode[1].checked = !0;
          this.__priceUI._$setContent(t.price);
          this.__chargableTypeChange(1);
        }
        if (this.__supportChargable || t.price > 0) c._$showNode(this.__isChargableNode);
        else c._$hiddenNode(this.__isChargableNode);
      } else if (this.__supportChargable) {
        if (this.__priceUI) this.__priceUI = c._$$AccountUI._$recycle(this.__priceUI);
        this.__priceUI = c._$$AccountUI._$allocate({
          parent: this.__priceBox,
          inputWidth: 185,
          inputHeight: 32,
        });
        this.__chargableTypeChange(0);
        this.__chargableTypeNode[0].checked = !0;
        this.__chargableTypeChange(0);
        c._$showNode(this.__isChargableNode);
      } else c._$hiddenNode(this.__isChargableNode);
    };
    _.__reset = function (t) {
      t.title = window.moocConfig.lang.KEY_LEARN_SEMESTER_EDITOR;
      t.clazz = 'u-termdialog';
      t.maskClickNotHidden = !0;
      this.__courseId = t.termDto.courseId;
      this.__mode = t.termDto.mode;
      this.__supportChargable = !(
        (this.__mode == c.CONST.MODE_MOOC ? 0 : 1) ||
        (1 == e.school.supportChargeableCourse ? 0 : 1)
      );
      if (t.termDto.lectorPanels) this.__chiefTeacherId = t.termDto.lectorPanels[0].memberId;
      else this.__chiefTeacherId = -1;
      this.__status = t.status || c.CONST.TERMSTATUS_DRAFT;
      this.__canModifyTime = !0;
      this.__recycleUI();
      this.__supReset(t);
      this.__lastStartTime = null;
      this.__lastEndTime = null;
      this.__timesetTypeNode[0].disabled = !1;
      this.__timesetTypeNode[1].disabled = !1;
      this.__canCreateNewTerm = t.canCreateNewTerm || 0;
      this.__genUI(t.termDto);
    };
    _.__recycleUI = function () {
      if (this.__chargeTeacher)
        this.__chargeTeacher = c._$$InfoSuggest._$recycle(this.__chargeTeacher);
      if (this.__startTimeUI) this.__startTimeUI = c._$$DatepickUI._$recycle(this.__startTimeUI);
      if (this.__endTimeUI) this.__endTimeUI = c._$$DatepickUI._$recycle(this.__endTimeUI);
      if (this.__fdChiefTeacher)
        this.__fdChiefTeacher = c._$$FeedBackUI._$recycle(this.__fdChiefTeacher);
      if (this.__fdCourseTime) this.__fdCourseTime = c._$$FeedBackUI._$recycle(this.__fdCourseTime);
      if (this.__priceUI) this.__priceUI = c._$$AccountUI._$recycle(this.__priceUI);
    };
    _.__closeHandle = function () {
      this.__recycleUI();
      this._$hide();
    };
    _.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  'c8e2f94428503238a8e7e3be165a1b18',
  '02c14b544f21e379de73ba82b326d2a9',
  '4e864010811e0e31c689fda70e8a9dc7',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '93828627ddb358ed890cb65967a0c1de',
  '7ae1049f52447f73129209d74071c691',
  'cdf25b5b7ebe60e2b3e1f74f71d61de8',
  '68140d527eabb13c83a92c899000ea65',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'fdf017bfe56cd47d46b5fcd5c0dd1c91',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      s = NEJ.P('nej.ui'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.m'),
      d = NEJ.P('edu.u'),
      _ = NEJ.P('nej.u'),
      l;
    var h = a._$pushCSSText(
      '        .#<uispace> {padding:20px;}        .#<uispace> .save, .next{margin-right:20px;}        .#<uispace> .fb{height:22px;}        .#<uispace>\t.fb .m-feedbackinfo{padding:0px;}        .#<uispace> .u-btn{padding:0 4px;height:30px;line-height:30px;}        ',
    );
    var f = a._$addHtmlTemplate(
      '\t\t\t<div class="u-caeDialog">\t\t\t\t<div class="j-moocBase moocBase"></div>\t\t\t\t<div class="j-createfd createfd"></div>\t\t\t\t<a class="u-btn u-btn-default j-next next">下一步</a>\t\t\t\t<a class="u-btn u-btn-default j-save save">保存</a>\t\t\t\t<a class="u-btn j-cancel">取消</a>\t\t\t</div>\t\t',
    );
    d._$$TermCAEDialog = NEJ.C();
    l = d._$$TermCAEDialog._$extend(d._$$Window, !0);
    d._$$TermCAEDialog._$showDialog = function (e) {
      var t = d._$$TermCAEDialog._$allocate(e);
      t._$show();
    };
    e._$getInstance()._$addEvent('showTermCAEDialog', function (e) {
      d._$$TermCAEDialog._$showDialog(e);
    });
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = h;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__save = a._$getByClassName(this.__body, 'j-save')[0];
      this.__next = a._$getByClassName(this.__body, 'j-next')[0];
      this.__cancel = a._$getByClassName(this.__body, 'j-cancel')[0];
      this.__moocBase = a._$getByClassName(this.__body, 'j-moocBase')[0];
      this.__createFdNode = a._$getByClassName(this.__body, 'j-createfd')[0];
      o._$addEvent(this.__save, 'click', this.__onSaveHandler._$bind(this));
      o._$addEvent(this.__next, 'click', this.__onNextHandler._$bind(this));
      o._$addEvent(
        this.__cancel,
        'click',
        function () {
          this.__closeHandle();
        }._$bind(this),
      );
      this.__createTermCache = new r._$$COM_Cache_AdminSchoolCache();
      this.__createTermCache._$addEvent('AdminCreateTerm', this.__onCreateTermCb._$bind(this));
      this.__createTermCache._$addEvent('AdminCreateCopyTerm', this.__onCreateTermCb._$bind(this));
      this.__createTermCache._$addEvent('AdminUpdateTerm', this.__onUpdateTermCb._$bind(this));
    };
    l.__onCreateTermCb = function (e) {
      this._$dispatchEvent('createTerm', e);
      this.__recycleUI();
      this._$hide();
    };
    l.__onUpdateTermCb = function (e) {
      if (e) this._$dispatchEvent('updateTerm', e);
      this.__recycleUI();
      this._$hide();
    };
    l.__onSaveHandler = function () {
      if (!this.__canCreateNewTerm) {
        this.__bsDto = this.__baseMoocUI._$getDto();
        if (this.__bsDto)
          if (!this.__bsDto.id)
            this.__createTermCache._$AdminCreateTerm(
              this.__bsDto.courseId,
              this.__bsDto.chiefTeacherId,
              this.__bsDto.startTime,
              this.__bsDto.endTime,
              this.__bsDto.checked,
              this.__bsDto.price,
            );
          else
            this.__createTermCache._$AdminUpdateTerm(
              this.__bsDto.courseId,
              this.__bsDto.id,
              this.__bsDto.chiefTeacherId,
              this.__bsDto.startTime,
              this.__bsDto.endTime,
              this.__bsDto.checked,
              this.__bsDto.price,
            );
      }
    };
    l.__onNextHandler = function () {
      if (!this.__canCreateNewTerm) {
        this.__bsDto = this.__baseMoocUI._$getDto();
        if (this.__bsDto) {
          var t = this;
          t._$hide();
          e._$getInstance()._$dispatchEvent('showTermSelectDialog', {
            firstOptions: this.__options,
            firstSaveObj: this.__bsDto,
            createTerm: this.__options.createTerm,
            updateTerm: this.__options.updateTerm,
          });
        }
      }
    };
    l.__genUI = function (e, t) {
      this.__baseMoocUI = d._$$TermCreateEditUI._$allocate({
        parent: this.__moocBase,
        termDto: e.termDto,
        status: e.status || d.CONST.TERMSTATUS_DRAFT,
      });
      this.__fdCreateTerm = d._$$FeedBackUI._$allocate({ parent: this.__createFdNode });
      this.__fdCreateTerm._$hideFeedback();
      a._$addClassName(t, 'u-btn-default');
      a._$delClassName(t, 'u-btn-disabled');
      if (this.__canCreateNewTerm) {
        if (1 == this.__canCreateNewTerm)
          this.__fdCreateTerm._$showWarnTips(
            '已经有一个未发布的学期，无法保存。<br>如有需要，请删除未发布的学期后重新操作。',
            !0,
          );
        if (2 == this.__canCreateNewTerm)
          this.__fdCreateTerm._$showWarnTips(window.moocConfig.lang.KEY_LEARN_THE_SEMESTER, !0);
        a._$delClassName(t, 'u-btn-default');
        a._$addClassName(t, 'u-btn-disabled');
      }
    };
    l.__reset = function (e) {
      e.title = window.moocConfig.lang.KEY_LEARN_SEMESTER_EDITOR;
      e.clazz = 'u-termdialog';
      e.maskClickNotHidden = !0;
      this.__status = e.status || d.CONST.TERMSTATUS_DRAFT;
      this.__supReset(e);
      this.__canCreateNewTerm = e.canCreateNewTerm || 0;
      this.__options = e;
      this.__mode = this.__options.termDto.mode;
      var t;
      if (
        (this.__mode == d.CONST.MODE_SPOC_ASYNC || this.__mode == d.CONST.MODE_SPOC_SYNC) &&
        'undefined' == typeof this.__options.updateTerm
      ) {
        d._$hiddenNode(this.__save);
        d._$showNode(this.__next);
        t = this.__next;
      } else {
        d._$hiddenNode(this.__next);
        d._$showNode(this.__save);
        t = this.__save;
      }
      this.__genUI(this.__options, t);
    };
    l.__recycleUI = function () {
      if (this.__baseMoocUI) this.__baseMoocUI = d._$$TermCreateEditUI._$recycle(this.__baseMoocUI);
      if (this.__fdCreateTerm) this.__fdCreateTerm = d._$$FeedBackUI._$recycle(this.__fdCreateTerm);
    };
    l.__closeHandle = function () {
      this.__recycleUI();
      this._$hide();
    };
    l.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  '9f00cd6c3134c86431c1d1e3a7678de8',
  'ddff3fe6a4233d567887a1921f3f1668',
  '1b395bb66fd465664ef6cf2e2ded18c1',
  '5a6d3736a21ba2e843ce12139b7c8134',
  '93828627ddb358ed890cb65967a0c1de',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '40e20ff72b586e08d36b46c0821f0d7c',
  function (e, t) {
    var i = NEJ.O,
      n = window,
      a = NEJ.P('nej.e'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('nej.ut'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.v'),
      d = NEJ.P('nej.ui'),
      _ = NEJ.P('edu.d'),
      l = NEJ.P('edu.m'),
      h,
      f;
    var u = a._$addNodeTemplate(
      '\t   <div class="noitce f-cb">\t\t <div class="noticeitem f-f0 f-pr f-cb">\t\t\t<div class="f-cb item j-item">\t\t\t\t<span class="j-name name f-fl f-thide">' +
        e.KEY_NOTICE_FIRST_ANNOUNCE +
        '</span>\t\t\t\t<span class="j-type type f-fc9 f-fl">' +
        e.KEY_NOTICE_DRAFT +
        '</span>\t\t\t\t<a class="j-show show f-f1 f-icon f-fr" title=window.moocConfig.lang.KEY_LEARN_CHECK_DETAILS></a>\t\t\t\t<a class="j-delete delete f-f1 f-icon f-fr u-icon-trash" title=window.moocConfig.lang.KEY_LEARN_DELETE_DELETE></a>\t\t\t\t<a class="j-edit edit f-f1 f-icon f-fr u-icon-pencil" title=window.moocConfig.lang.KEY_LEARN_EDIT></a>\t\t\t\t<span class="j-time time f-f1 f-fr">2014年01月08日</span>\t\t\t</div>\t\t\t<div class="f-cb detailtitlpage">\t\t\t\t<span class="j-detailtit detailtit f-fl f-f0">' +
        e.KEY_NOTICE_FIRST_ANNOUNCE +
        '</span>\t\t\t\t<span class="j-lpagetype type f-fc9 f-fl">' +
        e.KEY_NOTICE_DRAFT +
        '</span>\t\t\t\t<span class="f-fc9 f-fr f-f1 nopublish j-nopublish">' +
        e.KEY_NOTICE_NOT_PUBLISH_CANTNOT_SEE +
        '</span>\t\t\t</div>\t\t\t<div class="j-detailcnt detailcnt f-fc6 f-richEditorText"></div>\t\t\t<div class="icons j-icons f-pa"><div class="icon"></div></div>\t\t\t<div class="j-detailcntout detailcntout f-fc6 f-richEditorText"></div>\t\t\t<div class="f-cb opt j-opt"></div>\t\t\t<div class="f-cb lptimeout"><div class="f-fr j-lpagetime lptime"></div></div>\t\t</div>\t\t<a class="j-showmore showmore f-f0">' +
        e.KEY_CLICK_LOAD_MORE +
        '</a>\t\t</div>',
    );
    r._$$NoticeItem = NEJ.C();
    h = r._$$NoticeItem._$extend(r._$$UIBase, !0);
    f = r._$$NoticeItem._$supro;
    h.__initXGui = function () {
      this.__seed_html = u;
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__item = a._$getByClassName(this.__body, 'j-item')[0];
      this.__name = a._$getByClassName(this.__body, 'j-name')[0];
      this.__type = a._$getByClassName(this.__body, 'j-type')[0];
      this.__lpagetype = a._$getByClassName(this.__body, 'j-lpagetype')[0];
      this.__time = a._$getByClassName(this.__body, 'j-time')[0];
      this.__delete = a._$getByClassName(this.__body, 'j-delete')[0];
      this.__edit = a._$getByClassName(this.__body, 'j-edit')[0];
      this.__show = a._$getByClassName(this.__body, 'j-show')[0];
      this.__opt = a._$getByClassName(this.__body, 'j-opt')[0];
      this.__icons = a._$getByClassName(this.__body, 'j-icons')[0];
      this.__detailcnt = a._$getByClassName(this.__body, 'j-detailcnt')[0];
      this.__detailcntout = a._$getByClassName(this.__body, 'j-detailcntout')[0];
      this.__detailtit = a._$getByClassName(this.__body, 'j-detailtit')[0];
      this.__showMore = a._$getByClassName(this.__body, 'j-showmore')[0];
      this.__lpagetime = a._$getByClassName(this.__body, 'j-lpagetime')[0];
      this.__noPublish = a._$getByClassName(this.__body, 'j-nopublish')[0];
      c._$addEvent(this.__edit, 'click', this.__editHandler._$bind(this));
      c._$addEvent(this.__show, 'click', this.__showHandler._$bind(this));
      c._$addEvent(this.__delete, 'click', this.__deleteHandler._$bind(this));
      c._$addEvent(this.__showMore, 'click', this._$showMoreHandler._$bind(this));
      this.__noticeCache = new _._$$COM_Cache_TermNoticeCache();
      this.__noticeCache._$addEvent('onDeleteAnnouncementById', this.__deleteNoticeCb._$bind(this));
    };
    h.__editHandler = function () {
      this.__editOpt(this.__isInEdit);
      if (this.__isInShow) this.__showOpt(this.__isInShow);
    };
    h._$showMoreHandler = function () {
      this._$dispatchEvent('showMoreItems');
    };
    h.__editOpt = function (e) {
      if (e) {
        this.__isInEdit = !1;
        if (this.__createNoticeUI)
          this.__createNoticeUI = r._$$CreateNotice._$recycle(this.__createNoticeUI);
        r._$showNode(this.__item);
        r._$hiddenNode(this.__opt);
      } else {
        this.__isInEdit = !0;
        r._$hiddenNode(this.__item);
        r._$showNode(this.__opt);
        this.__createNoticeUI = r._$$CreateNotice._$allocate({
          parent: this.__opt,
          saveOrPublish: this.__onSaveOrPublish._$bind(this),
          noticeDto: this.__noticeDto,
          onCancel: function () {
            if (this.__createNoticeUI) {
              r._$showNode(this.__item);
              r._$hiddenNode(this.__opt);
              this.__createNoticeUI = r._$$CreateNotice._$recycle(this.__createNoticeUI);
              this.__isInEdit = !1;
            }
          }._$bind(this),
          isAdmin: this.__isAdmin,
          noticeType: this.__noticeType,
        });
      }
    };
    h.__showOpt = function (e) {
      if (e) {
        a._$addClassName(this.__show, 'u-icon-down-circle');
        a._$delClassName(this.__show, 'u-icon-up-circle');
        this.__show.title = window.moocConfig.lang.KEY_LEARN_CHECK_DETAILS;
        this.__isInShow = !1;
        this.__detailcnt.style.display = 'none';
        this.__icons.style.display = 'none';
      } else {
        this.__isInShow = !0;
        a._$addClassName(this.__show, 'u-icon-up-circle');
        a._$delClassName(this.__show, 'u-icon-down-circle');
        this.__show.title = window.moocConfig.lang.KEY_LEARN_HIDE_DETAILS;
        r._$showNode(this.__detailcnt);
        this.__detailcnt.style.display = 'block';
        this.__icons.style.display = 'block';
      }
    };
    h.__showHandler = function () {
      this.__showOpt(this.__isInShow);
    };
    h.__deleteHandler = function () {
      if (this.__isAdmin) {
        if (window.confirm(window.moocConfig.lang.KEY_LEARN_ARE_THIS_ANNOUNCEMENT))
          this.__noticeCache._$deleteAnnouncementById(this.__noticeDto.id);
      } else
        r._$$CommonDialog._$showDialog({
          message: window.moocConfig.lang.KEY_LEARN_ARE_THE_ANNOUNCEMENT,
          cancelFunc: function () {},
          okFunc: function () {
            this.__noticeCache._$deleteAnnouncementById(this.__noticeDto.id);
          }._$bind(this),
        });
    };
    h.__deleteNoticeCb = function (e) {
      if (e) this._$dispatchEvent('deleteNotice');
    };
    h.__onSaveOrPublish = function (e) {
      r._$showNode(this.__item);
      r._$hiddenNode(this.__opt);
      if (e) {
        this.__noticeDto = NEJ.X(this.__noticeDto, e);
        this.__genBaseInfo();
        this.__isInEdit = !1;
        if (this.__createNoticeUI)
          this.__createNoticeUI = r._$$CreateNotice._$recycle(this.__createNoticeUI);
      }
    };
    h.__genBaseInfo = function () {
      var e = this.__charUtil._$getCharsL(this.__noticeDto.title);
      if (e > 60)
        this.__name.innerText = this.__charUtil._$sliceCnAndEns(this.__noticeDto.title, 50) + '...';
      else this.__name.innerText = this.__noticeDto.title;
      if (0 == this.__noticeDto.status) {
        r._$showNode(this.__type);
        r._$showNode(this.__lpagetype);
        r._$showNode(this.__noPublish);
      } else {
        r._$hiddenNode(this.__type);
        r._$hiddenNode(this.__lpagetype);
        r._$hiddenNode(this.__noPublish);
      }
      this.__detailtit.innerText = this.__noticeDto.title;
      this.__detailcnt.innerHTML = t._$formateImagePrefix(this.__noticeDto.content);
      this.__detailcntout.innerHTML = t._$formateImagePrefix(this.__noticeDto.content);
      o._$renderRich2(this.__detailcnt);
      o._$renderRich2(this.__detailcntout);
      if (this.__noticeDto.gmtModified) {
        this.__lpagetime.innerText = r._$formatCommonTime(this.__noticeDto.gmtModified);
        this.__time.innerText = r._$formatCommonTime(this.__noticeDto.gmtModified);
      }
    };
    h._$showMoreHide = function (e) {
      if (e) this.__showMore.style.display = 'block';
      else this.__showMore.style.display = 'none';
    };
    h._$isShowMoreInShow = function () {
      return 'none' != this.__showMore.style.display;
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__isInEdit = !1;
      this.__isInShow = !1;
      a._$addClassName(this.__show, 'u-icon-down-circle');
      a._$delClassName(this.__show, 'u-icon-up-circle');
      r._$hiddenNode(this.__detailcnt);
      r._$hiddenNode(this.__opt);
      if (e.showMore) {
        this.__isShowMore = !0;
        this.__showMore.style.display = 'block';
      } else {
        this.__isShowMore = !1;
        this.__showMore.style.display = 'none';
      }
      this.__noticeDto = e.noticeDto || null;
      this.__charUtil = new l._$$CharasetUtil();
      this.__genBaseInfo();
      if (e.islearnPage) {
        this.__item.innerHTML = '';
        this.__detailtit.parentNode.style.display = 'block';
        this.__detailcntout.style.display = 'block';
        this.__lpagetime.style.display = 'block';
      } else {
        this.__time.style.display = 'block';
        this.__detailtit.parentNode.style.display = 'none';
        this.__lpagetime.style.display = 'none';
      }
      this.__isAdmin = e.isAdmin || !1;
      this.__noticeType = e.noticeType || r.CONST.NOTICE_TYPE_TERM;
    };
    h.__destroy = function () {
      this.__supDestroy();
    };
  },
  '05914c6f767170cf483bb9df9a899f1e',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'bfa5f84d0b4a33f05565c42dcc8ef1e5',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  'fdf017bfe56cd47d46b5fcd5c0dd1c91',
  '9d279df4af180d366f079ab901224cbc',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '09d18bbcabfd2b0ead3cd46dd29ee54b',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    var c = n._$addNodeTemplate(
      '<div>\t\t\t\t\t\t\t\t            <div class="empty f-f0 j-empty">\t\t\t\t\t\t\t\t                <span class="f-ib j-emptyTips"></span>\t\t\t\t\t\t\t\t            </div>\t\t\t\t\t\t\t\t            <div class="j-list"></div>\t\t\t\t\t\t\t\t\t\t</div>',
    );
    var d = n._$pushCSSText('.#<uispace>{}');
    o._$$AnnounceListUI = NEJ.C();
    r = o._$$AnnounceListUI._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_css = d;
      this.__seed_html = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__listNode = n._$getByClassName(this.__body, 'j-list')[0];
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
      this.__emptyTipsNode = n._$getByClassName(this.__body, 'j-emptyTips')[0];
    };
    r.__handleListShow = function () {
      var t = !1;
      var i = [];
      this.__listUIs = [];
      for (var n = 0; n < this.__lists.length; n++)
        if (1 == this.__lists[n].status || e.isPreview) i.push(this.__lists[n]);
      s._$forEach(
        i,
        function (e, i) {
          if ((i + 1) % this.__oneShowNum == 0 && i < this.__lists.length - 1) t = !0;
          else t = !1;
          var n = o._$$NoticeItem._$allocate({
            parent: this.__listNode,
            noticeDto: e,
            showMoreItems: this.__showMoreHandler._$bind(this, i + 1),
            showMore: t,
            islearnPage: !0,
          });
          if (i + 1 > this.__oneShowNum) o._$hiddenNode(n.__body);
          this.__listUIs.push(n);
        }._$bind(this),
      );
    };
    r.__showMoreHandler = function (e) {
      this.__listUIs[e - 1]._$showMoreHide(!1);
      var t = e + this.__oneShowNum;
      t = t > this.__lists.length ? this.__lists.length : t;
      for (var i = e; i < t; i++) if (this.__listUIs[i]) o._$showNode(this.__listUIs[i].__body);
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__oneShowNum = e.showNum || 10;
      this.__lists = e.lists || [];
      if (this.__lists.length > 0) {
        o._$showNode(this.__listNode);
        o._$hiddenNode(this.__emptyNode);
        this.__handleListShow();
      } else {
        o._$hiddenNode(this.__listNode);
        o._$showNode(this.__emptyNode);
        this.__emptyTipsNode.innerText = e.emptyTips || '';
      }
    };
    r.__clearUIs = function () {
      s._$forEach(
        this.__listUIs,
        function (e, t) {
          e = o._$$NoticeItem._$recycle(e);
        }._$bind(this),
      );
      this.__listUIs = [];
    };
    r.__destroy = function () {
      this.__clearUIs();
      this.__supDestroy();
    };
  },
  '40e20ff72b586e08d36b46c0821f0d7c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
!(function (e, t, i) {
  function n(e) {
    e = e || {};
    if (e.macros) this._macros = e.macros;
    this._links = {};
    this._rules = {};
    this.TRUNK = null;
    this.cache = F(e.maxCache || 200);
    this.cache.set('', [[]]);
  }
  function a(e) {
    return re.parse(e);
  }
  function o(e, t) {
    return t ? e.nodeName === t : 1 === e.nodeType;
  }
  function s(e, t) {
    var e = e.firstChild;
    return !e || o(e, t) ? e : d(e, t);
  }
  function r(e, t) {
    var e = e.lastChild;
    return !e || o(e, t) ? e : c(e, t);
  }
  function c(e, t) {
    for (; (e = e.previousSibling);) if (o(e, t)) return e;
    return e;
  }
  function d(e, t) {
    for (; (e = e.nextSibling);) if (o(e, t)) return e;
    return e;
  }
  function _(e, t) {
    var i = de[t];
    if (i) return 'function' == typeof i ? i(e) : e[i];
    if (le) return e.getAttribute(t);
    var n = e.getAttributeNode(t);
    return 'boolean' == typeof e[t] ? (e[t] ? t : null) : n && n.specified ? n.value : null;
  }
  function l(e) {
    for (var t = e.length; t--;) {
      var i = e[t];
      e.splice(t, 1, null);
      if (~e.indexOf(i)) e.splice(t, 1);
      else e.splice(t, 1, i);
    }
    return e;
  }
  function h(e, t) {
    if (e && t) {
      var i = e.nextSibling;
      for (; i;) {
        if (i === t) return -1;
        i = i.nextSibling;
      }
    }
    return e ? 1 : -1;
  }
  function f(e) {
    return l(e.sort(he));
  }
  function u(e, t) {
    var i, n, a, o;
    if (e) {
      a = t ? 'type' : 'child';
      i = d;
      n = c;
      o = s;
    } else {
      a = 'last' + (t ? 'type' : 'child');
      n = d;
      i = c;
      o = r;
    }
    return function (e, s) {
      var r = ue[a];
      if (e === ce) return !1;
      var c = fe(e),
        d = e.parentNode,
        _ = s.step > 0 ? i : n,
        l = s.step,
        h = s.start,
        f = t && e.nodeName;
      if (null === l) return !1;
      if (!r[c]) {
        var u = o(d, f),
          p = 0;
        do {
          r[fe(u)] = ++p;
          ue.length++;
        } while ((u = i(u, f)));
      }
      var m = r[c];
      if (0 === l) return m === h;
      else return (m - h) / l >= 0 && (m - h) % l === 0;
    };
  }
  function p() {
    if (ue.length) ue = { child: {}, lastchild: {}, type: {}, lasttype: {}, length: 0 };
  }
  function m(e, t, i) {
    var n;
    for (var a in t) if (i !== a && (n = me[a]) && !n(e, t[a])) return !1;
    return !0;
  }
  function b(e, t, i) {
    var n = t.length,
      a = t[n - 1];
    if (!m(e, a, i)) return !1;
    else {
      if (1 == n) return !0;
      var o = t[n - 2],
        s = be.combos[o.combo],
        r = ge[n - 2],
        c = s(e, r);
      if (c) return !0;
      else return !1;
    }
  }
  function g(e) {
    return function (i) {
      if (i == ce || null == i || i == t) return null;
      else return b(i, e);
    };
  }
  function E(e) {
    var t = [];
    for (var i = 0, n = e.length; i < n; i++) t.push(g(e.slice(0, i + 1)));
    return t;
  }
  function v(e, t, i) {
    if (!t.length) return e;
    var n = ge;
    ge = E(t);
    for (var a = e.length; a--;) if (!b(e[a], t, i)) e.splice(a, 1);
    ge = n;
    return e;
  }
  function w(e, t) {
    var i,
      n,
      a = e[e.length - 1];
    if (a.id) {
      i = pe.byId(a.id);
      n = 'id';
    } else if (a.classList && a.classList.length && pe.byClassName) {
      i = pe.byClassName(a.classList, t);
      n = 'classList';
    } else {
      i = pe.byTagName(a.tag || '*', t);
      n = 'tag';
    }
    if (!i.length) return i;
    else return v(i, e, n);
  }
  function $(e, t) {
    if (!e[0][0]) return [];
    var i = [],
      n = 0;
    for (var a = 0, o = e.length; a < o; a++) {
      var s = e[a],
        r = s.length,
        c = s[r - 1],
        d = w(s, t);
      if (d && d.length) n++;
      if (!i) i = d;
      else i = i.concat(d);
    }
    p();
    if (n > 1) f(i);
    return i;
  }
  function C(e, i) {
    var n = a(e);
    var o = $(n, i || t);
    return o;
  }
  function T(e, i) {
    var n;
    if (Ee && !I.debug)
      try {
        n = (i || t).querySelector(e);
      } catch (a) {
        n = C(e, i)[0];
      }
    else n = C(e, i)[0];
    return n;
  }
  function y(e, i) {
    var n;
    if (Ee && !I.debug)
      try {
        n = M((i || t).querySelectorAll(e));
      } catch (a) {
        n = C(e, i);
      }
    else n = C(e, i);
    return n;
  }
  function x(e, t) {
    if (!e || 1 !== e.nodeType) return !1;
    var i = a(t),
      n = i.length;
    if (!i[n - 1][0]) return !1;
    for (; n--;) if (S(e, i[n])) return !0;
    return !1;
  }
  function S(e, t) {
    var i = t.length;
    if (!m(e, t[i - 1])) return !1;
    else return 1 === v([e], t.slice(0)).length;
  }
  function N(e) {
    return function (t, i) {
      var n = i.split(/\s+of\s+/);
      if (n.length < 2) throw Error("no 'of' keyword in nth-match\"s selector");
      var a = ne(n[0]),
        o = n[1],
        s = t.parentNode[e ? 'firstChild' : 'lastChild'],
        r = e ? 'nextSibling' : 'previousSibling',
        c = a.step,
        d = a.start,
        _ = 0;
      if (!x(t, o)) return !1;
      if (null === c) return !1;
      do {
        if (1 === s.nodeType && I.matches(s, o)) _++;
        if (s === t) break;
      } while ((s = s[r]));
      if (0 === c) return _ === d;
      else return (_ - d) / c >= 0 && (_ - d) % c === 0;
    };
  }
  var I = function (e, t) {
      return y(e, t);
    },
    O = {};
  var D = Array.prototype,
    U = Object.prototype,
    P = String.prototype,
    A = Function.prototype,
    L = D.slice,
    R = t.body,
    k = t.createElement('div'),
    M = function (e) {
      return L.call(e);
    },
    B = function (e) {
      return null == e ? String(e) : U.toString.call(e).slice(8, -1).toLowerCase();
    },
    H = function (e, t, i) {
      for (var n in t) if (null == e[n] || i) e[n] = t[n];
    },
    F = function (e) {
      var t = [],
        n = {};
      return {
        set: function (e, i) {
          if (t.length > this.length) delete n[t.shift()];
          n[e] = i;
          t.push(e);
          return i;
        },
        get: function (e) {
          if (e === i) return n;
          else return n[e];
        },
        length: e,
        len: function () {
          return t.length;
        },
      };
    },
    j = function (e) {
      return function (t, i) {
        if ('object' == B(t)) for (var n in t) e.call(this, n, t[n]);
        else e.call(this, t, i);
        return this;
      };
    },
    Y = function (e) {
      try {
        return e();
      } catch (t) {
        return !1;
      } finally {
        k = document.createElement('div');
      }
    };
  try {
    L.call(t.getElementsByTagName('body'));
  } catch (V) {
    M = function (e) {
      var t = [],
        i = e.length;
      for (var n = 0; n < i; n++) t.push(e[n]);
      return t;
    };
  }
  var K = /^\s+|\s+$/g;
  P.trim =
    P.trim ||
    function () {
      return this.replace(K, '');
    };
  A.bind =
    A.bind ||
    function (e, t) {
      t = L.call(arguments, 1);
      var i = this;
      return function () {
        return i.apply(e, t.concat(L.call(arguments)));
      };
    };
  D.indexOf =
    D.indexOf ||
    function (e) {
      for (var t = 0, i = this.length; t < i; t++) if (e === this[t]) return t;
      return -1;
    };
  var z = /\(\?\!|\(\?\:/,
    J = function (e) {
      var t = 0,
        i = 0,
        n = e.length,
        a = e.split(z).length - 1;
      for (; n--;) {
        var o = e.charAt(n);
        if (0 === n || '\\' !== e.charAt(n - 1)) {
          if ('(' === o) t++;
          if (')' === o) i++;
        }
      }
      if (t !== i) throw e + '中的括号不匹配';
      else return t - a;
    },
    G = /\\(\d+)/g,
    W = function (e, t) {
      return e;
    },
    q =
      Object.keys ||
      function (e) {
        var t = [];
        for (var i in e) if (e.hasOwnProperty(i)) t.push(i);
        return t;
      },
    Q = function (e) {
      var t = e.reg;
      if ('regexp' === B(t)) t = t.toString().slice(1, -1);
      e.regexp = t.replace(Z, function (e, t) {
        if (t in ae) return ae[t];
        else throw new Error('can"t replace undefined macros:' + t);
      });
      return e;
    },
    X = function (e) {
      for (var t in e) if (e.hasOwnProperty(t)) Q(e[t]);
      return e;
    };
  H(n.prototype, {
    parse: function (e) {
      e = clean(e);
      if ((t = this.cache.get(e))) return t;
      var t = (this.parsed = [[null]]);
      var i = (this.input = e);
      var n = this.TRUNK;
      var a;
      for (; a != (i = i.replace(n, this._process.bind(this)));) a = i;
      if ('' !== i) this.error(i);
      return this.cache.set(e, t);
    },
    on: function (e) {
      if ('string' === B(e)) {
        var t = {};
        t[e] = arguments[1];
        e = t;
      }
      for (var n in e) {
        var a = e[n];
        if ('object' !== B(a)) a = { regexp: a };
        var o = a.regexp;
        if ('regexp' === B(o)) a.regexp = o.toString().slice(1, -1);
        if (a.order === i) a.order = 1;
        this._rules[n] = a;
      }
      this.setup();
      return this;
    },
    off: function (e) {
      if ('array' === B(e)) for (var t = e.length; t--;) this.off(e[t]);
      else if (this._rules[e]) delete this._rules[e];
      return this;
    },
    current: function () {
      var e = this.parsed;
      var t = e[e.length - 1],
        i = t.length;
      return t[i - 1] || (t[i - 1] = { tag: '*' });
    },
    error: function (e) {
      throw Error('输入  ' + this.input + '  含有未识别语句:' + e || '');
    },
    clone: function (e) {
      return new n().on(this._rules);
    },
    _process: function () {
      var e = this._links,
        t = this._rules,
        i = L.call(arguments);
      for (var n in e) {
        var a = e[n],
          o = a[1],
          s = parseInt(a[0]);
        if (i[s] && (rule = t[n])) {
          rule.action.apply(this, i.slice(s, s + o));
          return '';
        }
      }
      return '';
    },
    setup: function () {
      X(this._rules);
      var e = 1,
        t = [],
        i = this._rules,
        n = this._links,
        a = q(i).sort(function (e, t) {
          return i[e].order >= i[t].order;
        }),
        o = a.length;
      for (; o--;) {
        var s = a[o],
          r = i[s],
          c = J(r.regexp) + 1;
        if (r.filter && !me[s]) me[s] = r.filter;
        n[s] = [e, c];
        var d = W(r.regexp, e - 1);
        e += c;
        t.push(d);
      }
      this.TRUNK = new RegExp('^(?:(' + t.join(')|(') + '))');
      return this;
    },
  });
  var Z = /\{\{([^\}]*)\}\}/g,
    ee = /^(?:(\d+)|([+-]?\d*)?n([+-]\d+)?)$/,
    te = /^(nth)[\w-]*(-of-type|-child)/,
    ie = F(100),
    ne = function (e) {
      var t, i, n;
      if (!e || !(e = e.replace(/\s+/g, ''))) return { start: 1, step: 0 };
      if ((n = ie.get(e))) return n;
      if ('even' == e) {
        i = 2;
        t = 2;
      } else if ('odd' == e) {
        t = 2;
        i = 1;
      } else {
        n = e.match(ee);
        if (!n) t = null;
        else if (n[1]) {
          t = 0;
          i = parseInt(n[1]);
        } else {
          if ('-' == n[2]) n[2] = '-1';
          t = n[2] ? parseInt(n[2]) : 1;
          i = n[3] ? parseInt(n[3]) : 0;
        }
      }
      if (i < 1)
        if (t < 1) t = null;
        else i = (-(-i) % t) + t;
      return ie.set(e, { start: i, step: t });
    };
  var ae = {
      split: '\\s*,\\s*',
      operator: '[*^$|~!]?=',
      combo: '[>\\s+~](?!=)',
      word: '[\\\\\\w\\u00A1-\\uFFFF-]',
    },
    oe = {
      split: {
        reg: '{{split}}',
        action: function (e) {
          this.parsed.push([null]);
        },
        order: 0,
      },
      id: {
        reg: '#({{word}}+)',
        action: function (e, t) {
          this.current().id = t;
        },
      },
      tag: {
        reg: '\\*|[a-zA-Z-]\\w*',
        action: function (e) {
          this.current().tag = e.toLowerCase();
        },
      },
      classList: {
        reg: '\\.({{word}}+)',
        action: function (e, t) {
          var i = this.current(),
            n = i.classList || (i.classList = []);
          n.push(t);
        },
      },
      pesudos: {
        reg: ':({{word}}+)(?:\\(([^\\(\\)]*|(?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\))?',
        action: function (e, t, i) {
          var n = this.current(),
            a = n.pesudos || (n.pesudos = []),
            t = t.toLowerCase(),
            o = { name: t };
          if (i) i = i.trim();
          if (te.test(t)) i = ne(i);
          if (i) o.param = i;
          a.push(o);
        },
      },
      attributes: {
        reg: '\\[\\s*({{word}}+)(?:({{operator}})[\'"]?([^\'"\\[]+)[\'"]?)?\\s*\\]',
        action: function (e, t, i, n) {
          var a = this.current(),
            o = a.attributes || (a.attributes = []);
          var s = {};
          o.push({ key: t, operator: i, value: n });
        },
      },
      combo: {
        reg: '\\s*({{combo}})\\s*',
        action: function (e, t) {
          var i = this.parsed,
            n = i[i.length - 1];
          this.current().combo = t;
          n.push(null);
        },
        order: 0,
      },
    };
  var se = new RegExp('\\s*(,|' + ae.combo + '|' + ae.operator + ')\\s*', 'g');
  clean = function (e) {
    return e.trim().replace(/\s+/g, ' ').replace(se, '$1');
  };
  var re = new n();
  re.on(oe);
  var ce = t.documentElement || t;
  var de = {
    for: 'htmlFor',
    href: function (e) {
      return 'href' in e ? e.getAttribute('href', 2) : e.getAttribute('href');
    },
    type: function (e) {
      return 'type' in e ? e.getAttribute('type') : e.type;
    },
  };
  var _e = Y(function () {
    k.appendChild(t.createComment(''));
    return (
      !k.getElementsByTagName('*').length ||
      'number' != typeof t.getElementsByTagName('input').length
    );
  });
  var le = Y(function () {
    k.innerHTML = '<select></select>';
    var e = B(k.lastChild.getAttribute('multiple'));
    return 'boolean' !== e && 'string' !== e;
  });
  var he = t.compareDocumentPosition
    ? function (e, t) {
        if (!e.compareDocumentPosition || !t.compareDocumentPosition) return 0;
        else return 4 & e.compareDocumentPosition(t) ? -1 : e === t ? 0 : 1;
      }
    : 'sourceIndex' in t
      ? function (e, t) {
          if (!e.sourceIndex || !t.sourceIndex) return 0;
          else return e.sourceIndex - t.sourceIndex;
        }
      : function (e, i) {
          var n = 0,
            a = [e],
            o = [i],
            s = e.parentNode,
            r = i.parentNode,
            c = s;
          if (e === t) return -1;
          else if (i === t) return 1;
          else if (!s && !r) return 0;
          else if (!r) return -1;
          else if (!s) return 1;
          else if (s === r) return h(e, i);
          for (; c;) {
            a.unshift(c);
            c = c.parentNode;
          }
          c = r;
          for (; c;) {
            o.unshift(c);
            c = c.parentNode;
          }
          for (; a[n] === o[n];) n++;
          return h(a[n], o[n]);
        };
  var fe = (function (e) {
    var t = 0;
    return function (i) {
      return i._uid || (i._uid = e + t++);
    };
  })('nes_' + (+new Date()).toString(36));
  var ue = { length: 1 };
  p();
  var pe = {
    byId: function (e) {
      var i = t.getElementById(e);
      return i ? [i] : [];
    },
    byClassName: t.getElementsByClassName
      ? function (e, i) {
          e = e.join(' ');
          return M((i || t).getElementsByClassName(e));
        }
      : null,
    byTagName: _e
      ? function (e, i) {
          var n = (i || t).getElementsByTagName(e);
          return M(n);
        }
      : function (e, i) {
          var n = (i || t).getElementsByTagName(e);
          var a,
            o = [],
            s = 0;
          for (; (a = n[s]); s++) if (1 === a.nodeType) o.push(a);
          return o;
        },
  };
  var me = {
    id: function (e, t) {
      return e.id === t;
    },
    classList: function (e, t) {
      var i = t.length,
        n = ' ' + e.className + ' ';
      for (; i--;) if (n.indexOf(' ' + t[i] + ' ') === -1) return !1;
      return !0;
    },
    tag: function (e, t) {
      if ('*' == t) return !0;
      else return e.tagName.toLowerCase() === t;
    },
    pesudos: function (e, t) {
      var i = t.length,
        n = be['pesudos'];
      for (; i--;) {
        var a = t[i],
          o = a.name,
          s = n[o];
        if (!s) throw Error('不支持的伪类:' + o);
        if (!s(e, a.param)) return !1;
      }
      return !0;
    },
    attributes: function (e, t) {
      var i = t.length,
        n = be['operators'];
      for (; i--;) {
        var a = t[i],
          o = a['operator'],
          s = n[o],
          r = _(e, a.key);
        if (null !== r)
          if (o) {
            if (!s) throw Error('不支持的操作符:' + o);
            if (!s(a.value, r + '')) return !1;
          } else;
        else if ('!=' !== o) return !1;
      }
      return !0;
    },
  };
  var be = {
    combos: {
      '>': function (e, t) {
        var i = e.parentNode;
        if (t(i)) return i;
      },
      '~': function (e, t) {
        var i = c(e);
        for (; i;) {
          if (t(i)) return i;
          i = c(i);
        }
      },
      ' ': function (e, t) {
        var i = e.parentNode;
        for (; i;) {
          var n = t(i);
          if (n) return i;
          if (null === n) return null;
          i = i.parentNode;
        }
        return null;
      },
      '+': function (e, t) {
        var i = c(e);
        if (i && t(i)) return i;
      },
    },
    operators: {
      '^=': function (e, t) {
        if (null == t) return !1;
        else return 0 === t.indexOf(e);
      },
      '=': function (e, t) {
        return t === e;
      },
      '~=': function (e, t) {
        if (null == t) return !1;
        else return ~(' ' + t + ' ').indexOf(e);
      },
      '$=': function (e, t) {
        return t.substr(t.length - e.length) === e;
      },
      '|=': function (e, t) {
        return ~('-' + t + '-').indexOf('-' + e + '-');
      },
      '*=': function (e, t) {
        return ~t.indexOf(e);
      },
      '!=': function (e, t) {
        return t !== e;
      },
    },
    pesudos: {
      not: function (e, t) {
        return !x(e, t);
      },
      matches: function (e, t) {
        return x(e, t);
      },
      'nth-child': u(!0, !1),
      'nth-last-child': u(!1, !1),
      'nth-of-type': u(!0, !0),
      'nth-last-of-type': u(!1, !0),
      'first-child': function (e) {
        return !c(e);
      },
      'last-child': function (e) {
        return !d(e);
      },
      'last-of-type': function (e) {
        return !d(e, e.nodeName);
      },
      'first-of-type': function (e) {
        return !c(e, e.nodeName);
      },
      'only-child': function (e) {
        return !c(e) && !d(e);
      },
      'only-of-type': function (e) {
        return !c(e, e.nodeName) && !d(e, e.nodeName);
      },
      contains: function (e, t) {
        return ~(e.innerText || e.textContent || '').indexOf(t);
      },
      checked: function (e) {
        return !!e.checked || !!e.selected;
      },
      selected: function (e) {
        return e.selected;
      },
      enabled: function (e) {
        return e.disabled === !1;
      },
      disabled: function (e) {
        return e.disabled === !0;
      },
      empty: function (e) {
        var t;
        e = e.firstChild;
        for (; e;) {
          if (e.nodeName > '@' || 3 === (t = e.nodeType) || 4 === t) return !1;
          e = e.nextSibling;
        }
        return !0;
      },
      focus: function (e) {
        return (
          e === t.activeElement &&
          (!t.hasFocus || t.hasFocus()) &&
          !!(e.type || e.href || ~e.tabIndex)
        );
      },
      target: function (e, t) {
        var i = e.id || e.name;
        if (!i) return !1;
        else return '#' + i === location.hash;
      },
    },
  };
  var ge = null;
  var Ee = !!t.querySelector;
  !(function ve(e, t) {
    for (var i in e)
      I[i] = (function (i) {
        var n = e[i];
        return j(function (e, a) {
          n[e] = a;
          if (i in t) t[i](e, a);
        });
      })(i);
  })(be, {
    operators: function (e) {
      var t = ae.operator.split(']');
      t.splice(1, 0, e.charAt(0) + ']');
      ae.operator = t.join('');
      re.setup();
    },
    combos: function (e) {
      var t = ae.combo.split(']');
      t.splice(1, 0, e + ']');
      ae.combo = t.join('');
      re.setup();
    },
  });
  I.debug = !1;
  I._nthCache = ie;
  I.parser = re;
  I.parse = a;
  I._find = $;
  I._get = C;
  I.one = T;
  I.all = y;
  I.matches = x;
  I._uniqueSort = f;
  I._cleanSelector = clean;
  I._getUid = fe;
  if ('object' == typeof exports) module.exports = I;
  else if ('function' == typeof define && define.amd)
    define(function () {
      return I;
    });
  else e.nes = I;
  I.pesudos({
    'nth-match': N(!0),
    'nth-last-match': N(!1),
    'local-link': function (e, t) {
      if (t) t = parseInt(t);
    },
  });
})(window, document, void 0);
EDU(
  'a69495f924ee77d68e73892ffff2437c',
  function (e, t, i, n, a, o) {
    i._$all = function () {
      try {
        return nes.all.apply(nes, arguments);
      } catch (e) {
        return null;
      }
    };
    i._$one = function () {
      try {
        return nes.one.apply(nes, arguments);
      } catch (e) {
        return null;
      }
    };
    i._$g = nes._get;
    if (!0) e.copy(e.P('nej.e'), i);
    return i;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '72541068b5cbd18f455bca813fd48628',
);
EDU(
  'd702c6c0bcd70f9b4114ae0d7c2ea1b8',
  function (e, t, i, n, a) {
    function o(e, t) {
      this.length = 0;
      this._signs = {};
      this._context = t || c;
      if (e)
        if ('string' == typeof e) {
          if (t && t instanceof o) t = t[0];
          if ('string' == typeof t) t = E(t)[0];
          this._$add(a._$all(e, t));
        } else if (e instanceof o || m(e) || e.length) this._$add(e);
    }
    var s = /^\s*<(\w+|!)[^>]*>/,
      r = [].slice,
      c = document,
      d = 'documentElement',
      _ = c[d],
      l = c.createElement('div'),
      h = null == l.textContent ? 'innerText' : 'textContent',
      f = function (e, t, i) {
        i = i || {};
        if (null == this[e] || i.override) this[e] = t;
        return this;
      },
      u = function (e, t, i) {
        for (; t && t !== i;) {
          if (nes.matches(t, e)) return t;
          t = t.parentNode;
        }
      },
      p = function (i, n, a) {
        return i === a || 'undefined' === i || i === this || i === t || i === e;
      },
      m = function (e) {
        if (!e) return !1;
        var t = e.nodeType;
        return 1 === t || 9 === t || 11 === t || e.window === e;
      },
      b = function (e) {
        var t = e.prototype,
          i = {};
        return {
          extend: function (e, n) {
            i[e] = t[e];
            t[e] = n;
            return this;
          },
          reset: function () {
            for (var e in i)
              if (i.hasOwnProperty(e))
                if (void 0 === i[e]) delete t[e];
                else t[e] = i[e];
          },
        };
      },
      g = b(Function);
    g.extend('autoSet', function () {
      var e = this;
      return function (t, n) {
        if (i._$isObject(t)) {
          var a = r.call(arguments, 1);
          for (var o in t) e.apply(this, [o, t[o]].concat(a));
          return this;
        } else return e.apply(this, arguments);
      };
    }).extend('splitProcess', function (e) {
      var t = this;
      return function (n) {
        if (i._$isArray(n)) {
          var a = r.call(arguments, 1),
            o = n.length,
            s;
          if (e) s = {};
          for (var c = 0; c < o; c++) {
            var d = n[c],
              _ = t.apply(this, [d].concat(a));
            if (e && 'string' == typeof d) s[d] = _;
          }
          return e ? s : this;
        } else return t.apply(this, arguments);
      };
    });
    f = f.autoSet();
    var E = function (e, t) {
      E._$implement(n._$dump(), { statics: !0 });
      n._$clear();
      if ('string' == typeof e && 0 == e.trim().indexOf('<')) {
        var i = document.createElement('div');
        i.innerHTML = e;
        var a = E(i.childNodes);
        return a;
      }
      return new o(e, t);
    };
    E._$extend = f._$bind(E);
    E._$extend({
      _$signal: '_uid',
      _$instances: {},
      _$handlers: [],
      _$fragment: function () {},
      _$implement: function (e, t, i) {
        i = i || {};
        f.call(o.prototype, e, i.statics ? this._transport(t) : t);
      }.autoSet(),
      _transport: function (e) {
        return function () {
          var t = r.call(arguments);
          t.unshift(this[0]);
          var i = e.apply(this, t);
          if (!p.call(this, i)) return i;
          this._$forEach(function (i, n) {
            if (0 !== n) {
              t[0] = i;
              e.apply(this, t);
            }
          });
          return this;
        };
      },
      _merge: function (e, t, i) {
        var n = e.length || 0,
          a = 0;
        for (; void 0 !== t[a];) {
          var o = t[a++];
          if (!i || i.call(e, o)) e[n++] = o;
        }
        e.length = n;
        return e;
      },
      _toArray: function (e) {
        return E._merge([], e);
      },
      _contains: _.contains
        ? function (e, t) {
            return e === t || (9 == e.nodeType ? e[d] : e).contains(t);
          }
        : _.compareDocumentPosition
          ? function (e, t) {
              return t && !!(16 & e.compareDocumentPosition(t));
            }
          : function (e, t) {
              for (; (t = t.parentNode);) if (t === e) return !0;
              return !1;
            },
      _$cloneNode: function (e, t) {
        t = !!t;
        var i = e.cloneNode(t),
          n,
          a;
        if (t) {
          a = nes.all('*', e);
          a.push(e);
          n = nes.all('*', i);
          n.push(i);
        } else {
          a = [e];
          n = [i];
        }
        for (_i = n.length; _i--;) $.fixture.clone(n[_i], a[_i]);
        return i;
      },
      _delegateHandlers: {},
      _cleanSelector: nes._cleanSelector,
      _$uniqueSort: nes._uniqueSort,
      _$matches: nes.matches,
      _$fn: o.prototype,
      _$uid: nes._getUid,
    });
    var v = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/,
      w = /^key(?:)/,
      $ = {
        insertor: {
          top: function (e, t) {
            e.insertBefore(t, e.firstChild);
          },
          bottom: function (e, t) {
            e.appendChild(t);
          },
          before: function (e, t) {
            var i = e.parentNode;
            if (i) i.insertBefore(t, e);
          },
          after: function (e, t) {
            var i = e.parentNode;
            if (i) i.insertBefore(t, e.nextSibling);
          },
        },
        fixProps: { input: 'checked', option: 'selected', textarea: 'value', script: 'text' },
        fixture: {
          clone: function (e, t) {
            var i, n;
            if (1 === e.nodeType) {
              if (e.clearAttributes) {
                e.clearAttributes();
                e.mergeAttributes(t);
              }
              i = e.nodeName.toLowerCase();
              if ((_prop = $.fixProps[i])) e[_prop] = t[_prop];
              e.removeAttribute(E._$signal);
              e.removeAttribute('id');
            }
          },
          event: function (t) {
            var i = t.type;
            var n = t.button;
            t.__fixed = !0;
            t.target = t.target || t.srcElement || document;
            t.metaKey = !!t.metaKey;
            if (3 === t.target.nodeType) t.target = t.target.parentNode;
            if (v.test(i)) {
              t.pageX = e._$pageX(t);
              t.pageY = e._$pageY(t);
              if ('mouseover' === i || 'mouseout' === i) {
                var a = t.relatedTarget || t[('mouseover' == i ? 'from' : 'to') + 'Element'];
                for (; a && 3 == a.nodeType;) a = a.parentNode;
                t.relatedTarget = a;
              }
            }
            t.which = null != t.charCode ? t.charCode : t.keyCode;
            if (!t.which && void 0 !== n) t.which = 1 & n ? 1 : 2 & n ? 3 : 4 & n ? 2 : 0;
            if (!t.preventDefault)
              t.preventDefault = function () {
                this.returnValue = !1;
                return this;
              };
            if (!t.stopPropagation)
              t.stopPropagation = function () {
                this.cancelBubble = !0;
                return this;
              };
          },
        },
      },
      C = function (e) {
        var t = E._$matches;
        return function (i, n) {
          var a = E([]);
          if ('boolean' == typeof i) {
            n = i;
            i = null;
          }
          this._$forEach(function (o) {
            var s = o[e];
            for (; s;) {
              if (1 === s.nodeType && (!i || t(s, i))) {
                a._$add(s);
                if (!n) break;
              }
              s = s[e];
            }
          });
          return a;
        };
      };
    E._$implement({
      _$style: function (e, i) {
        if (!e) throw Error('缺少css样式名');
        if (void 0 === i) return t._$getStyle(this[0], e);
        else
          return this._$forEach(function (n) {
            t._$setStyle(n, e, i);
          });
      }
        .splitProcess(!0)
        .autoSet(),
      _$attr: function (e, i) {
        if (!e) throw Error('缺少属性名');
        if (void 0 === i) return t._$attr(this[0], e);
        else
          return this._$forEach(function (n) {
            t._$attr(n, e, i);
          });
      }
        .splitProcess(!0)
        .autoSet(),
      _$forEach: function (e) {
        i._$forEach(this, e);
        return this;
      },
      _$filter: function (e) {
        var t = [],
          i = 'string' == typeof e;
        this._$forEach(function (n, a) {
          var o = i ? E._$matches(n, e) : e.call(this, n, a);
          if (o) t.push(n);
        });
        return E(t);
      },
      _$map: function (e) {
        var t = [],
          i = !1;
        this._$forEach(function (n, a) {
          var o = e.call(this, n, a);
          if (!m(o)) i = !0;
          t.push(o);
        });
        return i ? t : E([])._$add(t);
      },
      _$sort: function () {
        var e = this._$get();
        E._$uniqueSort(e);
        return E(e);
      },
      _$add: function (e) {
        if (e) {
          if (e.tagName || 'number' != typeof e.length || e === window) e = [e];
          E._merge(this, e, function (e) {
            if (!m(e)) return !1;
            var t = E._$uid(e);
            if (this._signs[t]) return !1;
            else {
              this._signs[t] = 1;
              return !0;
            }
          });
          return this;
        }
      },
      _$get: function (e, t) {
        if ('number' != typeof e) return E._toArray(this);
        else return t ? E(this[e]) : this[e];
      },
      _$last: function (e) {
        return e ? E(this[this.length - 1]) : this[this.length - 1];
      },
      _$first: function (e) {
        return e ? E(this[0]) : this[0];
      },
      _$matches: function (e) {
        return E._$matches(this[0], e);
      },
      _$parent: C('parentNode'),
      _$prev: C('previousSibling'),
      _$next: C('nextSibling'),
      _$children: function (e, t) {
        var i = E([]);
        if ('boolean' == typeof e) {
          t = e;
          e = null;
        }
        this._$forEach(function (n) {
          var o = t ? a._$all(e || '*', n) : e ? E(n.childNodes)._$filter(e) : E(n.childNodes);
          i._$add(o);
        });
        return i;
      },
      _$siblings: function (e) {
        return this._$prev(e, !0)._$add(this._$next(e, !0));
      },
      _$insert: function (e, t) {
        t = (t && t.toLowerCase()) || 'bottom';
        if (!$.insertor[t]) t = 'bottom';
        var i = E(e)[0],
          n = $.insertor[t];
        if (!i) throw Error('The Element to be inserted is not exist');
        return this._$forEach(function (e, t) {
          n(e, 0 === t ? i : E._$cloneNode(i, !0));
        });
      },
      _$insert2: function (e, t) {
        E(e)._$insert(this, t);
        return this;
      },
      _$clone: function (e) {
        return this._$map(function (t) {
          return E._$cloneNode(t, e);
        });
      },
      _$text: function (e) {
        if (void 0 === e) {
          if (!this[0]) throw Error('内部节点为空，无法完成get操作');
          return this[0][h];
        }
        return this._$forEach(function (t) {
          t[h] = e;
        });
      },
      _$html: function (e) {
        if (void 0 === e) {
          if (!this[0]) throw Error('内部节点为空，无法完成get操作');
          return this[0].innerHTML;
        }
        return this._$forEach(function (t) {
          t.innerHTML = e;
        });
      },
      _$val: function (e) {
        if (void 0 === e) {
          if (!this[0]) throw Error('内部节点为空，无法完成get操作');
          return this[0].value;
        }
        return this._$forEach(function (t) {
          t.value = e;
        });
      },
      _delegate: function (t, i, n) {
        i = E._cleanSelector(i);
        return this._$forEach(function (a) {
          var o = E._$uid(a),
            s = E._delegateHandlers[o] || (E._delegateHandlers[o] = {}),
            r = s[t] || (s[t] = {}),
            c = r[i] || (r[i] = []);
          var d = function (e) {
            var t;
            if ((t = u(i, e.target || e.srcElement, a))) n.apply(t, arguments);
          };
          d._raw = n;
          c.push(d);
          e._$addEvent(a, t, d);
        });
      },
      _undelegate: function (t, i, n) {
        i = E._cleanSelector(i);
        return this._$forEach(function (a) {
          var o = E._$uid(a);
          var s, r, c;
          if ((s = E._delegateHandlers[o]) && (r = s[t]) && (c = r[i])) {
            for (var d = c.length; d--;) {
              var _ = c[d];
              if (!n || _._raw === n) {
                e._$delEvent(a, t, _);
                c.splice(d, 1);
              }
            }
            if (!c.length) delete r[i];
          }
        });
      },
      _$on: function (t, i, n) {
        if (void 0 === t) throw Error('缺少事件名参数');
        if ('function' == typeof i) {
          n = i;
          i = null;
        }
        var a = t.indexOf(' ');
        if (~a) {
          i = t.slice(a + 1);
          t = t.slice(0, a);
        }
        if (!n) throw Error('缺少回调函数');
        else {
          var o = n;
          var n = function (e) {
            $.fixture.event(e);
            o.apply(this, arguments);
          };
          o.real = n;
        }
        if (i) return this._delegate(t, i, n);
        else
          return this._$forEach(function (i) {
            e._$addEvent(i, t, n);
          });
      }
        .splitProcess()
        .autoSet(),
      _$off: function (t, i, n) {
        if ('function' == typeof i) {
          n = i;
          i = null;
        }
        var a;
        if (t && ~(a = t.indexOf(' '))) {
          i = t.slice(a + 1);
          t = t.slice(0, a);
        }
        if (n) n = n.real || n;
        if (i) return this._undelegate(t, i, n);
        else
          return this._$forEach(function (i) {
            var a = E._$uid(i),
              o = E._delegateHandlers[a],
              s;
            if (!t) {
              if (o) delete E._delegateHandlers[a];
              e._$clearEvent(i, t);
            } else {
              if (o) s = o[t];
              if (!n) {
                if (s) delete o[t];
                e._$clearEvent(i, t);
              } else e._$delEvent(i, t, n);
            }
          });
      }
        .splitProcess()
        .autoSet(),
      _$trigger: function (t, i) {
        if ('string' != typeof t) throw Error('事件类型参数错误');
        this._$forEach(function (n) {
          e._$dispatchEvent(n, t, i);
        });
        return this;
      }
        .splitProcess()
        .autoSet(),
      splice: function () {
        throw Error("don't use the NodeList#splice");
      },
    });
    g.reset();
    if (!0) nej.$ = E;
    return E;
  },
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  'd37bb207915efdc94c2f2a74d479b6f5',
  'a69495f924ee77d68e73892ffff2437c',
);
EDU(
  'fee4c38f314dd0beb1624df2aa08cdc8',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = i._$randNumberString(),
      s,
      r = 'ck-termSettingsCache';
    n._$$COM_Cache_TermSettingsCache = NEJ.C();
    s = n._$$COM_Cache_TermSettingsCache._$extend(n._$$COM_Cache);
    s._$getAllMenuItems = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.getAllMenuItems',
        param: [e, t],
        onload: this.__onGetAllMenuItems._$bind(this),
      });
    };
    s.__onGetAllMenuItems = function (e) {
      this._$dispatchEvent('onGetAllMenuItems', e);
    };
    s._$getMenuItem = function (e, t, i, n) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.getMenuItem',
        param: [e, t, i, n],
        onload: this.__onGetMenuItem._$bind(this),
      });
    };
    s.__onGetMenuItem = function (e) {
      this._$dispatchEvent('onGetMenuItem', e);
    };
    s._$saveMenuItems = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.saveMenuItemDrafts',
        param: [e, t, i],
        onload: this.__onSaveMenuItems._$bind(this),
      });
    };
    s.__onSaveMenuItems = function (e) {
      this._$dispatchEvent('onSaveMenuItems', e);
    };
    s._$publishMenuItems = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.publishMenuItems',
        param: [e, t, i],
        onload: this.__publishMenuItems._$bind(this),
      });
    };
    s.__publishMenuItems = function (e) {
      this._$dispatchEvent('publishMenuItems', e);
    };
    s._$publishMenuItems4Spoc = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.publishMenuItems4Spoc',
        param: [e, t],
        onload: this.__publishMenuItems4Spoc._$bind(this),
      });
    };
    s.__publishMenuItems4Spoc = function (e) {
      this._$dispatchEvent('publishMenuItems4Spoc', e);
    };
    s._$saveMenuItem = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.saveMenuItemDraft',
        param: [e],
        onload: this.__onSaveMenuItem._$bind(this),
      });
    };
    s.__onSaveMenuItem = function (e) {
      this._$dispatchEvent('onSaveMenuItem', e);
    };
    s._$saveMenuItemDraft4Spoc = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocMenuItemBean.saveMenuItemDraft4Spoc',
        param: [e, t, i],
        onload: this.__onsSaveMenuItemDraft4Spoc._$bind(this),
      });
    };
    s.__onsSaveMenuItemDraft4Spoc = function (e) {
      this._$dispatchEvent('onsSaveMenuItemDraft4Spoc', e);
    };
    s._$saveTermOpenStatus = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'PublishCourseBean.manageTermCloseStatus',
        param: [e, t],
        onload: this.__onSaveTermOpenStatus._$bind(this),
      });
    };
    s.__onSaveTermOpenStatus = function (e) {
      this._$dispatchEvent('onSaveTermOpenStatus', e);
    };
    s._$updateCopyRightSetting = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.updateCopyRightSetting',
        param: [e, t],
        onload: this.__onUpdateCopyRightSetting._$bind(this),
      });
    };
    s.__onUpdateCopyRightSetting = function (e) {
      this._$dispatchEvent('onUpdateCopyRightSetting', e);
    };
    s._$updateSpocCopyRightSetting = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.updateSpocCopyRightSetting',
        param: [e],
        onload: this.__onUpdateSpocCopyRightSetting._$bind(this),
      });
    };
    s.__onUpdateSpocCopyRightSetting = function (e) {
      this._$dispatchEvent('onUpdateSpocCopyRightSetting', e);
    };
    s._$getSpocCopyRightSetting = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.getSpocCopyRightSetting',
        param: [e],
        onload: this.__onGetSpocCopyRightSetting._$bind(this),
      });
    };
    s.__onGetSpocCopyRightSetting = function (e) {
      this._$dispatchEvent('onGetSpocCopyRightSetting', e);
    };
    s._$getAllstaffByTerm = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.getAllstaffByTerm',
        param: [e],
        onload: this.__onGetAllstaffByTerm._$bind(this),
      });
    };
    s.__onGetAllstaffByTerm = function (e) {
      this._$dispatchEvent('onGetAllstaffByTerm', e);
    };
    s._$deleteStaff = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.deleteStaff',
        param: [e, t],
        onload: this.__onDeleteStaff._$bind(this),
      });
    };
    s.__onDeleteStaff = function (e) {
      this._$dispatchEvent('onDeleteStaff', e);
    };
    s._$addLector = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.addLector',
        param: [e, t],
        onload: this.__onAddLector._$bind(this),
      });
    };
    s.__onAddLector = function (e) {
      this._$dispatchEvent('onAddLector', e);
    };
    s._$moveLector = function (e, t, i, n, a) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.move',
        param: [e, t, i, n, a],
        onload: this.__onMoveLector._$bind(this),
      });
    };
    s.__onMoveLector = function (e) {
      this._$dispatchEvent('onMoveLector', e);
    };
    s._$addAssist = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'TermStaffBean.addAssist',
        param: [e, t],
        onload: this.__onAddAssist._$bind(this),
      });
    };
    s.__onAddAssist = function (e) {
      this._$dispatchEvent('onAddAssist', e);
    };
    s._$saveTermScoreRule = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocSettingBean.updateTermSetting',
          param: [e, t],
          onload: this.__onSaveTermScoreRule._$bind(this),
        });
    };
    s.__onSaveTermScoreRule = function (e) {
      this._$dispatchEvent('onSaveTermScoreRule', e);
    };
    s._$saveEvaluationDescriptionDraft = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocSettingBean.saveEvaluationDescriptionDraft',
          param: [e, t, i],
          onload: this.__onSaveEvaluationDescriptionDraft._$bind(this, i),
        });
    };
    s.__onSaveEvaluationDescriptionDraft = function (e, t) {
      this._$dispatchEvent('onSaveEvaluationDescriptionDraft', e, t);
    };
    s._$getTermScoreRule = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocSettingBean.getTermSetting',
        param: [e],
        onload: this.__onGetTermScoreRule._$bind(this),
      });
    };
    s.__onGetTermScoreRule = function (e) {
      this._$dispatchEvent('onGetTermScoreRule', e);
    };
    s._$getForumsByTerm = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.getForumsByTerm',
        param: [e],
        onload: this.__ongetForumsByTerm._$bind(this),
      });
    };
    s.__ongetForumsByTerm = function (e) {
      if (e) {
        var t = e[0];
        e[0] = e[1];
        e[1] = e[2];
        e[2] = t;
        if (e[4]) {
          t = e[4];
          e.splice(4, 1);
          e.splice(3, 0, t);
        }
        this._$dispatchEvent('ongetForumsByTerm', e);
      }
    };
    s._$manageForum = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.manageForum',
        param: [e, t],
        onload: this.__onmanageForum._$bind(this, t, e),
      });
    };
    s.__onmanageForum = function (e, t, i) {
      t.id = i;
      this._$dispatchEvent('onmanageForum', t, e);
    };
    s._$saveForumBase = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.saveForumBase',
        param: [e, t, i],
        onload: this.__onsaveForumBase._$bind(this, i, t),
      });
    };
    s.__onsaveForumBase = function (e, t, i) {
      if (1 == e) this._$dispatchEvent('onsaveForumBaseName', i, t);
      else this._$dispatchEvent('onsaveForumBaseDescription', i, t);
    };
    s._$publishTermForumSetting = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.publishTermForumSetting',
        param: [e],
        onload: this.__onpublishTermForumSetting._$bind(this),
      });
    };
    s.__onpublishTermForumSetting = function (e) {
      this._$dispatchEvent('onpublishTermForumSetting', e);
    };
    s._$updateForumClosedStatus = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'ForumSettingBean.updateForumClosedStatus',
        param: [e],
        onload: this.__onupdateForumClosedStatus._$bind(this),
      });
    };
    s.__onupdateForumClosedStatus = function (e) {
      this._$dispatchEvent('onupdateForumClosedStatus', e);
    };
    s._$resetTermOrTest = function (e, t) {
      var i = 'term' == e ? 'TermDraftBean.resetTermDraft' : 'MocAdminQuizBean.resetTestDraft';
      this._$postDWR({
        key: r + o,
        url: i,
        param: [t],
        onload: this.__onResetTermOrTest._$bind(this),
      });
    };
    s.__onResetTermOrTest = function (e) {
      this._$dispatchEvent('onResetTermOrTest', e);
    };
    s._$getMemberInfo = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MemberBean.getMemberInfo',
        param: [e],
        onload: this.__onGetMemberInfo._$bind(this),
      });
    };
    s.__onGetMemberInfo = function (e) {
      this._$dispatchEvent('onGetMemberInfo', e);
    };
    s._$saveMemberEpayAccount = function (e) {
      this._$postDWR({
        key: r + o,
        param: [e],
        url: 'MemberBean.saveMemberEpayAccount',
        onload: this.__onsaveMemberEpayAccount._$bind(this),
      });
    };
    s.__onsaveMemberEpayAccount = function (e) {
      this._$dispatchEvent('onsaveMemberEpayAccount', e);
    };
    s._$checkMemberEpayAccountState = function () {
      this._$postDWR({
        key: r + o,
        url: 'MemberBean.checkMemberEpayAccountState',
        onload: this.__oncheckMemberEpayAccountState._$bind(this),
      });
    };
    s.__oncheckMemberEpayAccountState = function (e) {
      this._$dispatchEvent('oncheckMemberEpayAccountState', e);
    };
    s._$getScholarshipInfo = function () {
      this._$postDWR({
        key: r + o,
        url: 'MemberBean.getScholarshipInfo',
        onload: this.__onGetScholarshipInfo._$bind(this),
      });
    };
    s.__onGetScholarshipInfo = function (e) {
      this._$dispatchEvent('onGetScholarshipInfo', e);
    };
    s._$saveScholarshipInfo = function (e, t) {
      this._$postDWR({
        key: r + o,
        param: [e, t],
        url: 'MemberBean.saveReceiveScholarshipInfo',
        onload: this.__onSaveScholarshipInfo._$bind(this),
      });
    };
    s.__onSaveScholarshipInfo = function (e) {
      this._$dispatchEvent('onSaveScholarshipInfo', e);
    };
    s._$getObjectScoreRuleByTestId = function (e, t) {
      this._$postDWR({
        key: r + o,
        param: [e, t],
        url: 'MocAdminQuizBean.getObjectScoreRuleByTestId',
        onload: this.__onGetObjectScoreRuleByTestId._$bind(this),
      });
    };
    s.__onGetObjectScoreRuleByTestId = function (e) {
      this._$dispatchEvent('onGetObjectScoreRuleByTestId', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'cafdd5186cffb672997fd8e30345b39b',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d;
    var _ = n._$pushCSSText(
      '    .epayAccount .ml{margin-left:20px;display: inline-block;height: 36px;line-height: 36px;}    .epayAccount .mailN{height: 36px;line-height: 36px;}    ',
    );
    var l = n._$addNodeTemplate(
      '<div class="epayAccount">                                        <div class="j-mailOpr mailOpr">                                            <div class="j-add f-cb add">                                                <div class="f-fl"></div>                                                <a class="btn f-fl ml"><span>添加</span></a>                                                <a class="cancel f-fl ml">取消</a>                                                <div class="j-addFb f-fl"></div>                                            </div>                                            <div class="j-verify verify f-cb">                                                <div class="f-fl mailN"></div>                                                <a class="btn btn1 f-fl ml" target="_blank"><span>验证账号</span></a>                                                <a class="f-fl change ml" style="display:none">修改账号</a>                                                <div class="f-fl"></div>                                            </div>                                        </div>                                        <div class="j-mailTxt mailTxt f-dn"></div>                                    </div>',
    );
    c._$$EpayAccountBindUI = NEJ.C();
    d = c._$$EpayAccountBindUI._$extend(c._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = l;
      this.__seed_css = _;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__mailAdd = n._$getByClassName(this.__body, 'j-add')[0];
      this.__mailverify = n._$getByClassName(this.__body, 'j-verify')[0];
      this.__mailAddChildren = n._$getChildren(this.__mailAdd);
      this.__verifyChildren = n._$getChildren(this.__mailverify);
      a._$addEvent(this.__mailAddChildren[1], 'click', this.__checkMail._$bind(this));
      a._$addEvent(this.__verifyChildren[2], 'click', this.__toggleAddVerfiy._$bind(this, !0));
      a._$addEvent(this.__mailAddChildren[2], 'click', this.__toggleAddVerfiy._$bind(this, !1));
      this.__settingsCache = new s._$$COM_Cache_TermSettingsCache();
      this.__settingsCache._$addEvent('onsaveMemberEpayAccount', this.__onsaveAccount._$bind(this));
      this.__settingsCache._$addEvent(
        'oncheckMemberEpayAccountState',
        this.__oncheckMemberEpayAccountState._$bind(this),
      );
      this.__settingsCache._$addEvent('onGetMemberInfo', this.__onGetMemberInfo._$bind(this));
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__verifyFbUI = c._$$FeedBackUI._$allocate({ parent: this.__verifyChildren[3] });
      this.__verifyFbUI._$hideFeedback();
      this.__onGetMemberInfo(e.data);
    };
    d._$getMail = function () {
      return this.__memberVo.epayAccount;
    };
    d._$showNecessaryTip = function () {
      this.__mailAddFbUI._$showWarnTips('请填写你的网易支付账号');
    };
    d.__onGetMemberInfo = function (e) {
      this.__memberVo = e;
      var t = this.__memberVo.epayAccount ? !1 : !0;
      this.__toggleAddVerfiy(t);
    };
    d.__oncheckMemberEpayAccountState = function (e) {
      this.__settingsCache._$getMemberInfo(c._$getWebUser().id);
    };
    d.__onsaveAccount = function (e) {
      if (!e) c.showToastTips({ content: '保存失败', type: 2 });
      else this.__settingsCache._$getMemberInfo(c._$getWebUser().id);
    };
    d.__checkMail = function () {
      if (this.__mailIptUI) {
        var e = this.__mailIptUI._$getContent();
        var t = this.__mailIptUI._$getCount();
        if (t <= 0) {
          this.__mailAddFbUI._$showWarnTips('请填写你的网易支付账号');
          return;
        } else if (
          !this.__mailIptUI._$isMatchExp(/@([a-z0-9]+[_|\-|\.]?)*[a-z0-9]+\.[a-z]{2,3}$/i)
        ) {
          this.__mailAddFbUI._$showWarnTips('邮箱格式不对');
          return;
        }
        this.__settingsCache._$saveMemberEpayAccount(e);
      }
    };
    d.__checkEpayAccount = function () {
      this.__settingsCache._$checkMemberEpayAccountState();
    };
    d.__toggleAddVerfiy = function (e) {
      if (e) {
        var t = this.__mailAddChildren[0],
          i = this.__mailAddChildren[1],
          o = this.__mailAddChildren[3],
          s = this.__mailAddChildren[2];
        c._$hiddenNode(s);
        this.__clearUI();
        this.__mailIptUI = c._$$BaseInputUI._$allocate({
          parent: t,
          labelText: 'name@example.com',
          width: 214,
          height: 32,
          onInputFocus: function () {
            if (this.__mailAddFbUI) this.__mailAddFbUI._$hideFeedback();
          }._$bind(this),
        });
        this.__mailAddFbUI = c._$$FeedBackUI._$allocate({ parent: o });
        this.__mailAddFbUI._$hideFeedback();
        if (this.__memberVo.epayAccount) {
          n._$getChildren(i)[0].innerText = '保存';
          c._$showNode(s);
        }
        c._$hiddenNode(this.__mailverify);
        c._$showNode(this.__mailAdd);
      } else {
        c._$hiddenNode(this.__mailAdd);
        this.__clearUI();
        c._$showNode(this.__mailverify);
        var r = this.__verifyChildren[0],
          i = this.__verifyChildren[1],
          d = this.__verifyChildren[3];
        r.innerText = this.__memberVo.epayAccount || '';
        a._$clearEvent(i);
        var _ = this.__memberVo.epayAccountState || 0;
        if (1 == _) {
          c._$hiddenNode(i);
          this.__verifyFbUI._$showRightTips('已验证');
        } else {
          c._$showNode(i);
          n._$replaceClassName(i, 'btn2', 'btn1');
          n._$getChildren(i)[0].innerText = '立即验证账号';
          if (0 == _) this.__verifyFbUI._$showWarnTips('未验证');
          else if (2 == _) this.__verifyFbUI._$showWarnTips('该网易支付账号未激活');
          else if (3 == _) this.__verifyFbUI._$showWarnTips('账号不存在');
          else if (4 == _) this.__verifyFbUI._$showWarnTips('账号异常，请确认');
          this.__doInitDomEvent([[i, 'click', this.__checkEpayAccount._$bind(this)]]);
        }
      }
    };
    d.__clearUI = function () {
      if (this.__mailIptUI) this.__mailIptUI = c._$$BaseInputUI._$recycle(this.__mailIptUI);
      if (this.__mailAddFbUI) this.__mailAddFbUI = c._$$FeedBackUI._$recycle(this.__mailAddFbUI);
      if (this.__tipFbUI) this.__tipFbUI = c._$$FeedBackUI._$recycle(this.__tipFbUI);
    };
    d.__destroy = function () {
      this.__clearUI();
      if (this.__verifyFbUI) this.__verifyFbUI = c._$$FeedBackUI._$recycle(this.__verifyFbUI);
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'fee4c38f314dd0beb1624df2aa08cdc8',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'cc26d5920093e9742f0feca3855e8e68',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '1739fa74ae085e454b5fe7821640d9db',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.ui'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      _ = NEJ.P('nej.$'),
      l;
    var h = n._$pushCSSText(
      '        .#<uispace> .u-prizeInfoEdit .main{padding:20px 50px 0;}        .#<uispace> .u-prizeInfoEdit .main .subtitle{top: -30px;left: 120px;}        .#<uispace> .u-prizeInfoEdit .row{margin:0 0 20px;}        .#<uispace> .u-prizeInfoEdit .row .lb{display:block;width:90px;height:60px;line-height:20px;padding:0 20px 0 0;float:left;text-align:right;}        .#<uispace> .u-prizeInfoEdit .row .lb span{display:inline-block;font-size:14px;}        .#<uispace> .u-prizeInfoEdit .row .lb span.lbr{color:#444;}        .#<uispace> .u-prizeInfoEdit .row .m-feedbackinfo{float:left;}        .#<uispace> .u-prizeInfoEdit .row .opt .m-feedbackinfo{margin-top: 10px;}        .#<uispace> .u-prizeInfoEdit .row .j-delImg{margin-left: 10px;}        .#<uispace> .u-prizeInfoEdit .row.mb0{margin-bottom:0;}        .#<uispace> .u-prizeInfoEdit .row .tel{padding:0;}        .#<uispace> .footer {text-align: center;margin-bottom: 50px;}        .#<uispace> .footer .saveTxt{padding: 0 50px;}        .#<uispace> .u-prizeInfoEdit .uploadbox{padding-top: 10px;}        .#<uispace> .u-prizeInfoEdit .uploadbox .j-flashbox{height: 38px;}        .#<uispace> .u-prizeInfoEdit .u-upd-img-btn .j-upload{background-color: #E1E1E1;background-image: linear-gradient(#EBEBEB, #E1E1E1);color: #666;border: 1px solid #999;padding: 0 10px;}        ',
    );
    var f = n._$addHtmlTemplate(
      '\t\t\t<div class="u-prizeInfoEdit f-cb">            <div class="main f-pr">                <div class="f-fcred subtitle f-pa">*填写截止时间为学期结束后的第30天</div>                <div class="row f-cb">                    <label class="lb f-cb"><span class="f-f0 lbr">网易支付账号:</span></label>                    <div class="content f-fl">                        <span class="j-mailAcc f-fc9">作为您的收款账号，添加之后<strong>无法修改</strong>，请仔细核对</span>                        <div class="j-epayAccount epay"></div>                        <div class="f-fc9">还没有网易支付账号？<a href="//epay.163.com/account/registStep1.htm" target="_blank">马上注册</a></div>                    </div>                </div>                <div class="row f-cb">                    <label class="lb f-cb"><span class="f-f0 lbr">身份证正反面复印件照片:</span></label>                    <div class="f-fl">                        <div class="info j-info f-fc9">支持jpg、gif、png或bmp格式的图片，建议文件小于20M<br>由于公司财务审核要求，需上传身份证正反面复印件照片。</div>                        <div class="opt f-cb">                            <div class="uploadbox j-uploadbox f-fl">                            </div>                            <div class="feedbox j-feedbox f-fl"></div>                        </div>                        <div class="j-imgBox" style="display: none"><span class="j-imgSrc"></span><a class="j-delImg">删除</a></div>                    </div>                </div>                <div class="row f-cb mb0">                    <label class="lb f-cb"><span class="f-f0 lbr">手机号码:</span></label>                    <div class="j-ipt tel f-cb f-fl"></div>                    <div class="j-fd"></div>                </div>            </div>            </div>            <div class="footer f-cb">                <a class="j-save u-btn u-btn-default"><span class="saveTxt">保存</span></a>            </div>\t\t',
    );
    c._$$ReceivePrizeCAEDialog = NEJ.C();
    l = c._$$ReceivePrizeCAEDialog._$extend(c._$$Window, !0);
    c._$$ReceivePrizeCAEDialog._$showDialog = function (e) {
      var t = c._$$ReceivePrizeCAEDialog._$allocate(e);
      t._$show();
    };
    l.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = h;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__epayAccountNode = n._$getByClassName(this.__body, 'j-epayAccount')[0];
      this.__uploadbox = n._$getByClassName(this.__body, 'j-uploadbox')[0];
      this.__feedbox = n._$getByClassName(this.__body, 'j-feedbox')[0];
      this.__infoBox = n._$getByClassName(this.__body, 'j-info')[0];
      this.__imgBox = n._$getByClassName(this.__body, 'j-imgBox')[0];
      this.__imgNode = n._$getByClassName(this.__body, 'j-imgSrc')[0];
      this.__delImgBtn = n._$getByClassName(this.__body, 'j-delImg')[0];
      this.__telIptNode = n._$getByClassName(this.__body, 'j-ipt')[0];
      this.__telFbNode = n._$getByClassName(this.__body, 'j-fd')[0];
      this.__save = n._$getByClassName(this.__body, 'j-save')[0];
      a._$addEvent(this.__delImgBtn, 'click', this.__onDelImgHandler._$bind(this));
      a._$addEvent(this.__save, 'click', this.__onSaveHandler._$bind(this));
      this.__settingCache = new s._$$COM_Cache_TermSettingsCache();
      this.__settingCache._$addEvent('onGetMemberInfo', this.__onGetMemberInfo._$bind(this));
      this.__settingCache._$addEvent(
        'onGetScholarshipInfo',
        this.__onGetScholarshipInfo._$bind(this),
      );
      this.__settingCache._$addEvent(
        'onSaveScholarshipInfo',
        function (e) {
          if (e) {
            if (this.__needRefresh) this._$dispatchEvent('onFill', null);
            this.__recycleUI();
            this._$hide();
            c._$showNode(n._$getByClassName(document.body, this.__fromClass)[0]);
            c._$showNode(_(n._$getByClassName(document.body, this.__fromClass)[0])._$prev()[0]);
          } else c._$showToastTips({ content: '保存失败，请重试！', type: 2 });
        }._$bind(this),
      );
    };
    l.__onDelImgHandler = function () {
      if (this.__imgNode.innerText) {
        c._$hiddenNode(this.__imgBox);
        c._$showNode(this.__uploadbox);
        c._$showNode(this.__infoBox);
        this.__imgUrl = '';
      }
    };
    l.__onGetMemberInfo = function (e) {
      this.__epayAccountUI = c._$$EpayAccountBindUI._$allocate({
        parent: this.__epayAccountNode,
        data: e,
      });
    };
    l.__onGetScholarshipInfo = function (e) {
      if (e) {
        this.__telIptUI._$setInitContent(e.phoneNumber || '');
        this.__imgUrl = e.idCardPhoto || '';
        this.__setIDCard(this.__imgUrl);
      }
    };
    l.__onSaveHandler = function () {
      var e = this._$getPrizeInfo();
      if (e) this.__settingCache._$saveScholarshipInfo(e.phoneNumber, e.idCardPhoto);
    };
    l.__uploadError = function (e) {
      this.__feedbackUI._$showWarnTips(e);
    };
    l.__uploadStart = function () {
      this.__feedbackUI._$showLoadingTips();
    };
    l.__uploadComplete = function () {
      this.__feedbackUI._$showRightTips('');
      if (this.__imgUpdUI) {
        var e = this.__imgUpdUI._$getUploadObj();
        if (e && e.urls && e.urls.length > 0) {
          this.__imgUrl = e.urls[0];
          this.__setIDCard(e.urls[0]);
        }
      }
    };
    l.__setIDCard = function (e) {
      var t;
      if (e) {
        t =
          e.split('?')[0].substr(-4, 4).split('.')[1] ||
          e.split('?')[0].substr(-4, 4).split('.')[0];
        this.__imgNode.innerText = '身份证.' + t;
        c._$hiddenNode(this.__uploadbox);
        c._$hiddenNode(this.__infoBox);
        this.__feedbackUI._$hideFeedback();
        c._$showNode(this.__imgBox);
      }
    };
    l.__genUI = function (e) {
      this.__imgUpdUI = c._$$ImgUploadUI._$allocate({
        parent: this.__uploadbox,
        customSize: ['3264x2448x1'],
        btnText: window.moocConfig.lang.KEY_LEARN_UPLOAD_PHOTOS,
      });
      this.__imgUpdUI._$addEvent('uploadStart', this.__uploadStart._$bind(this));
      this.__imgUpdUI._$addEvent('uploadError', this.__uploadError._$bind(this));
      this.__imgUpdUI._$addEvent('uploadComplete', this.__uploadComplete._$bind(this));
      this.__feedbackUI = c._$$FeedBackUI._$allocate({ parent: this.__feedbox });
      this.__feedbackUI._$hideFeedback();
      this.__telIptUI = c._$$BaseInputUI._$allocate({
        parent: this.__telIptNode,
        labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_NUMBER,
        height: 30,
        width: 120,
        onInputFocus: function () {
          this.__telFbUI._$hideFeedback();
        }._$bind(this),
      });
      this.__telFbUI = c._$$FeedBackUI._$allocate({ parent: this.__telFbNode });
      this.__telFbUI._$hideFeedback();
    };
    l._$getPrizeInfo = function () {
      var e = this.__verifyPrizeInfo();
      return e;
    };
    l.__verifyPrizeInfo = function () {
      var e = this.__telIptUI._$getContent(),
        t = !0;
      if (!e) {
        this.__telFbUI._$showWarnTips('请输入联系电话，座机格式为区号-电话号', !0);
        t = !1;
      } else if (!/^\d{11}$|^(\d{4}|\d{3})-(\d{7,8})$/.test(e)) {
        this.__telFbUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_PHONE_INCORRECT, !0);
        t = !1;
      }
      if (!this.__imgUrl) {
        this.__feedbackUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_PLEASE_CARD, !0);
        t = !1;
      }
      var i = t ? { phoneNumber: e, idCardPhoto: this.__imgUrl } : null;
      return i;
    };
    l.__reset = function (e) {
      e.title = window.moocConfig.lang.KEY_LEARN_FILL_INFORMATION;
      e.maskClickNotHidden = !0;
      e.clazz = 'u-prizeDialog f-f0';
      e.onclose = this.__closeHandle._$bind(this);
      this.__fromClass = e.from;
      this.__needRefresh = e.needRefresh || !1;
      this.__supReset(e);
      this.__settingCache._$getMemberInfo(c._$getWebUser().id);
      this.__settingCache._$getScholarshipInfo();
      this.__genUI(e);
    };
    l.__recycleUI = function () {
      if (this.__epayAccountUI)
        this.__epayAccountUI = c._$$EpayAccountBindUI._$recycle(this.__epayAccountUI);
      if (this.__imgUpdUI) {
        this.__imgUpdUI.__destroy();
        this.__imgUpdUI = null;
      }
      if (this.__feedbackUI) this.__feedbackUI = c._$$FeedBackUI._$recycle(this.__feedbackUI);
      if (this.__telIptUI) this.__telIptUI = c._$$BaseInputUI._$recycle(this.__telIptUI);
      if (this.__telFbUI) this.__telFbUI = c._$$FeedBackUI._$recycle(this.__telFbUI);
    };
    l.__closeHandle = function () {
      this.__recycleUI();
      this._$hide();
      c._$showNode(n._$getByClassName(document.body, this.__fromClass)[0]);
      c._$showNode(_(n._$getByClassName(document.body, this.__fromClass)[0])._$prev()[0]);
    };
    l.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  'ddff3fe6a4233d567887a1921f3f1668',
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  'cafdd5186cffb672997fd8e30345b39b',
  '398ddb926810364dac877824f1b0015a',
  'd702c6c0bcd70f9b4114ae0d7c2ea1b8',
  'fee4c38f314dd0beb1624df2aa08cdc8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '7f3f549154c6d7ef555fee3c9fa50df8',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.ui'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('nej.$'),
      _;
    var l = n._$addHtmlTemplate(
      '\t\t\t<div class="u-gradeWrap f-f0">\t\t\t    <div class="j-cnt">\t\t\t\t</div>\t\t\t</div>\t\t',
    );
    r._$$GradeDialog = NEJ.C();
    _ = r._$$GradeDialog._$extend(r._$$Window, !0);
    r._$$GradeDialog._$showDialog = function (e) {
      var t = r._$$GradeDialog._$allocate(e);
      t._$show();
    };
    _.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(n._$getHtmlTemplate(l));
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__cntNode = n._$getByClassName(this.__body, 'j-cnt')[0];
    };
    _.__genScholarRecode = function (t) {
      if (t) {
        this.__result = this.__formatResultDto(t.data[0]);
        var i = n._$getHtmlTemplate(
          'jst-edu-scholarship-record',
          c._$merge(
            {
              code: t.code,
              resultDto: this.__result,
              userName: e.webUser.nickName,
              scholarshipInfoValid: t.scholarshipInfoValid,
            },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        );
        this.__cntNode.innerHTML = i;
        this.__genReceivePrizeUI(t.scholarshipInfoValid);
        this.__shareNode = n._$getByClassName(this.__cntNode, 'j-infoshare')[0];
        this.__genWeiXinQR(this.__result);
      }
    };
    _.__genTermScoreRank = function (e) {
      if (e) {
        if (1 == e.code) this.__result = this.__formatResultDto(e.resultDto);
        var t = n._$getHtmlTemplate(
          'jst-edu-score-rank',
          c._$merge(
            { code: e.code, resultDto: this.__result },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        );
        this.__cntNode.innerHTML = t;
        if (1 == e.code) {
          this.__shareNode = n._$getByClassName(this.__cntNode, 'j-infoshare')[0];
          this.__genWeiXinQR(this.__result);
        } else {
          this.__knownNode = n._$getByClassName(this.__cntNode, 'j-known')[0];
          a._$addEvent(
            this.__knownNode,
            'click',
            function () {
              switch (e.code) {
                case -1:
                  window.location.href = window.location.href.split('#')[0] + '#/learn/testlist';
                  break;
                case 0:
                  this.__closeHandle();
                  break;
                case -2:
                  this.__closeHandle();
                  break;
                case -3:
                  this.__closeHandle();
              }
            }._$bind(this),
          );
        }
        this.__genReceivePrizeUI();
      }
    };
    _.__genReceivePrizeUI = function (e) {
      this.__fill = n._$getByClassName(this.__cntNode, 'j-fill')[0];
      a._$addEvent(
        this.__fill,
        'click',
        function () {
          r._$hiddenNode(n._$getByClassName(document.body, 'u-gradetDialog')[0]);
          r._$hiddenNode(d(n._$getByClassName(document.body, 'u-gradetDialog')[0])._$prev()[0]);
          if (2 == this.__type && e === !1)
            r._$$ReceivePrizeCAEDialog._$showDialog({
              from: 'u-gradetDialog',
              needRefresh: !0,
              onFill: this.__finishFillPrizeCb._$bind(this),
            });
          else r._$$ReceivePrizeCAEDialog._$showDialog({ from: 'u-gradetDialog' });
        }._$bind(this),
      );
    };
    _.__finishFillPrizeCb = function () {
      this.__fill.innerText = window.moocConfig.lang.KEY_LEARN_MODIFY_INFORMATION;
    };
    _.__genWeiXinQR = function (t) {
      var i = e.courseDto;
      var n =
        window.location.protocol +
        '//study.163.com/topics/shareGrade_m/?type=' +
        this.__type +
        '&nick=' +
        e.webUser.nickName +
        '&cn=' +
        i.name +
        '&amount=' +
        t.amount +
        '&score=' +
        t.totalScoreWithBonus +
        '&beat=' +
        t.beatRate +
        '&rank=' +
        t.rankNew +
        '&enroll=' +
        t.enrollCount +
        '&improved=' +
        t.improved;
      this.__weixinQRParams = n;
      this.__genShareUI();
    };
    _.__genShareUI = function () {
      var t = e.courseDto,
        i = [
          '我正在参与#中国大学MOOC#十万奖学金活动！',
          '我得到了#中国大学MOOC#颁发的奖学金！',
          '我在#中国大学MOOC#学完了《' + t.name + window.moocConfig.lang.KEY_LEARN_SYMBOL1,
        ];
      var n, a;
      if (this.__shareUI) this.__shareUI = r._$$ShareUI._$recycle(this.__shareUI);
      if (1 == this.__type) {
        n =
          window.moocConfig.lang.KEY_LEARN_I_IN +
          t.name +
          window.moocConfig.lang.KEY_LEARN_SCORE_IS +
          this.__result.totalScoreWithBonus +
          '分，排名第' +
          this.__result.rankNew +
          '，击败了' +
          this.__result.beatRate +
          '%的用户，';
        if (this.__result.rankNew <= 3) n += '当之无愧是学霸！活动地址戳>>';
        else n += '再努力加把劲，就能参与瓜分奖金了！活动地址戳>>';
        a = i[0];
      } else if (2 == this.__type)
        if (parseFloat(this.__result.amount) > 0) {
          n =
            '我在《' +
            t.name +
            window.moocConfig.lang.KEY_LEARN_SCORE_IS +
            this.__result.totalScoreWithBonus +
            '分，排名第' +
            this.__result.rankNew +
            '，击败了' +
            this.__result.beatRate +
            '%的用户，优秀源自于每日的坚持，努力不易，实至名归！';
          a = i[1];
        } else {
          n =
            '我在《' +
            t.name +
            window.moocConfig.lang.KEY_LEARN_SCORE_IS +
            this.__result.totalScoreWithBonus +
            '分，排名第' +
            this.__result.rankNew +
            '，击败了' +
            this.__result.beatRate +
            '%的用户，虽然和十万奖学金擦肩而过，但这是我曾经努力过的证明！';
          a = i[2];
        }
      this.__shareUI = r._$$ShareUI._$allocate({
        parent: this.__shareNode,
        title: n,
        topic: a,
        description: n,
        pic: '//edu-image.nosdn.127.net/7C765B86153AB710C45FA1D90D3AE403.jpg?imageView&thumbnail=130y100&quality=100',
        weixinQRParams: this.__weixinQRParams,
        url: '//www.icourse163.org/topics/2016scholarship/',
        from: window.moocConfig.lang.KEY_LEARN_COURSE_PAGE,
      });
    };
    _.__addScriptTag = function (e) {
      var t = document.createElement('script');
      t.setAttribute('type', 'text/javascript');
      t.src = e;
      document.body.appendChild(t);
    };
    _.__formatResultDto = function (e) {
      if (e) {
        if (e.rankNew) {
          e.beatRate = (100 * (1 - e.rankNew / e.enrollCount)).toFixed(2);
          if (e.rankLast) e.improved = e.rankNew - e.rankLast;
          else e.improved = 0;
        }
        return e;
      }
    };
    _.__reset = function (e) {
      e.title = '';
      e.clazz = 'u-gradetDialog';
      e.maskClickNotHidden = !0;
      e.onclose = this.__onClose._$bind(this);
      this.__type = e.type;
      this.__supReset(e);
      if (2 == this.__type) this.__genScholarRecode(e.data);
      else if (1 == this.__type) this.__genTermScoreRank(e.data);
    };
    _.__onClose = function () {
      if (
        this.__fill &&
        this.__fill.innerText == window.moocConfig.lang.KEY_LEARN_MODIFY_INFORMATION
      )
        window.location.reload();
    };
    _.__closeHandle = function () {
      this._$hide();
    };
    _.__destroy = function () {
      this.__cntNode.innerHTML = '';
      this.__supDestroy();
    };
  },
  'ddff3fe6a4233d567887a1921f3f1668',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'd702c6c0bcd70f9b4114ae0d7c2ea1b8',
  '1739fa74ae085e454b5fe7821640d9db',
  'be836b3e4eb69c3616f9cc097e503955',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '5c4d74bc0e709956e1cf2155560a30ff',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = i._$randNumberString(),
      s,
      r = 'ck-ManageStudentCache',
      c = 20;
    n._$$COM_Cache_ManageStudentCache = NEJ.C();
    s = n._$$COM_Cache_ManageStudentCache._$extend(n._$$COM_Cache);
    s._$getMocTermDataStatisticDto = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMocTermDataStatisticDto',
        param: [e],
        onload: this.__onGetMocTermDataStatisticDto._$bind(this),
      });
    };
    s.__onGetMocTermDataStatisticDto = function (e) {
      this._$dispatchEvent('onGetMocTermDataStatisticDto', e);
    };
    s._$confirmScores = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.confirmTestScores',
          param: [e, t],
          onload: this.__onConfirmScores._$bind(this),
        });
    };
    s.__onConfirmScores = function (e) {
      this._$dispatchEvent('onConfirmScores', e);
    };
    s._$confirmSubjectScore = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.confirmSubjectScore',
          param: [e],
          onload: this.__onConfirmSubjectScore._$bind(this),
        });
    };
    s.__onConfirmSubjectScore = function (e) {
      this._$dispatchEvent('onConfirmSubjectScore', e);
    };
    s._$confirmExamScores = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.confirmExamScores',
          param: [e, t],
          onload: this.__onConfirmExamScores._$bind(this),
        });
    };
    s.__onConfirmExamScores = function (e) {
      this._$dispatchEvent('onConfirmExamScores', e);
    };
    s._$getStudentScores = function (e, t, i, n, a) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentScores',
        param: [e, c, t, i, n, a],
        onload: this.__onGetStudentScores._$bind(this),
      });
    };
    s.__onGetStudentScores = function (e) {
      this._$dispatchEvent('onGetStudentScores', e);
    };
    s._$getStudentTestAggreScores = function (e, t, i, n) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentTestAggreScores',
        param: [e, c, t, i, n],
        onload: this.__onGetStudentTestAggreScores._$bind(this),
      });
    };
    s.__onGetStudentTestAggreScores = function (e) {
      this._$dispatchEvent('onGetStudentTestAggreScores', e);
    };
    s._$getStudentScoresByTestId = function (e, t, i, n) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentScoresByTestId',
        param: [e, c, t, i, n],
        onload: this.__onGetStudentScoresByTestId._$bind(this),
      });
    };
    s.__onGetStudentScoresByTestId = function (e) {
      this._$dispatchEvent('onGetStudentScoresByTestId', e);
    };
    s._$getStudentScoresByExamId = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getStudentScoresByExamId',
        param: [e, t, c, i],
        onload: this.__onGetStudentScoresByExamId._$bind(this),
      });
    };
    s.__onGetStudentScoresByExamId = function (e) {
      this._$dispatchEvent('onGetStudentScoresByExamId', e);
    };
    s._$giveAwardsForStudentOnEffectiveScore = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.giveAwardsForStudentOnEffectiveScore',
          param: [e, t, i],
          onload: this.__onGiveAwardsForStudentOnEffectiveScore._$bind(this),
        });
    };
    s.__onGiveAwardsForStudentOnEffectiveScore = function (e) {
      this._$dispatchEvent('onGiveAwardsForStudentOnEffectiveScore', e);
    };
    s._$giveAwardsForStudentOnSubjectScore = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.giveAwardsForStudentOnSubjectScore',
          param: [e, t, i],
          onload: this.__onGiveAwardsForStudentOnSubjectScore._$bind(this),
        });
    };
    s.__onGiveAwardsForStudentOnSubjectScore = function (e) {
      this._$dispatchEvent('onGiveAwardsForStudentOnSubjectScore', e);
    };
    s._$showSentMailToast = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.showSentMailToast',
        param: [e, t],
        onload: this.__onShowSentMailToast._$bind(this),
      });
    };
    s.__onShowSentMailToast = function (e) {
      this._$dispatchEvent('onShowSentMailToast', e);
    };
    s._$getSingleStudentScores = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getSingleStudentScores',
        param: [e, t],
        onload: this.__onGetSingleStudentScores._$bind(this),
      });
    };
    s.__onGetSingleStudentScores = function (e) {
      this._$dispatchEvent('onGetSingleStudentScores', e);
    };
    s._$generateFinalScores = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.generateFinalScores',
          param: [e, t],
          onload: this.__onGenerateFinalScores._$bind(this),
        });
    };
    s.__onGenerateFinalScores = function (e) {
      this._$dispatchEvent('onGenerateFinalScores', e);
    };
    s._$getTermSummaryInfo = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getTermSummaryInfo',
        param: [e],
        onload: this.__onGetTermSummaryInfo._$bind(this),
      });
    };
    s.__onGetTermSummaryInfo = function (e) {
      this._$dispatchEvent('onGetTermSummaryInfo', e);
    };
    s._$refreshSingleTest = function (e, t) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.refreshSingleTest',
          param: [e, t],
          onload: this.__onRefreshSingleTest._$bind(this),
        });
    };
    s.__onRefreshSingleTest = function (e) {
      this._$dispatchEvent('onRefreshSingleTest', e);
    };
    s._$refreshExam = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.refreshExam',
          param: [e],
          onload: this.__onRefreshExam._$bind(this),
        });
    };
    s.__onRefreshExam = function (e) {
      this._$dispatchEvent('onRefreshExam', e);
    };
    s._$getMocAchivementDto = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMocAchivementDto',
        param: [e],
        onload: this.__onGetMocAchivementDto._$bind(this),
      });
    };
    s.__onGetMocAchivementDto = function (e) {
      this._$dispatchEvent('onGetMocAchivementDto', e);
    };
    s._$submitTermScoreForReview = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.submitTermScoreForReview',
          param: [e],
          onload: this.__onSubmitTermScoreForReview._$bind(this),
        });
    };
    s.__onSubmitTermScoreForReview = function (e) {
      this._$dispatchEvent('onSubmitTermScoreForReview', e);
    };
    s._$updateSummaryScore = function (e) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.updateSummaryScore',
          param: [e],
          onload: this.__onUpdateSummaryScore._$bind(this),
        });
    };
    s.__onUpdateSummaryScore = function (e) {
      this._$dispatchEvent('onUpdateSummaryScore', e);
    };
    s._$getRelatedMoocStudentScores4Spoc = function (e, t, i, n, a) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getRelatedMoocStudentScores4Spoc',
        param: [e, c, t, i, n, a],
        onload: this.__onGetRelatedMoocStudentScores4Spoc._$bind(this),
      });
    };
    s.__onGetRelatedMoocStudentScores4Spoc = function (e) {
      this._$dispatchEvent('onGetRelatedMoocStudentScores4Spoc', e);
    };
    s._$getMemberByLikeNickname = function (e, t) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.getMemberByLikeNickname',
        param: [e, t],
        onload: this.__onGetMemberByLikeNickname._$bind(this),
      });
    };
    s.__onGetMemberByLikeNickname = function (e) {
      this._$dispatchEvent('onGetMemberByLikeNickname', e);
    };
    s._$getSpocStudentStatisticDataDtoList = function (e, t, i) {
      if (a._$isTermFrozen())
        this._$postDWR({
          key: r + o,
          url: 'MocScoreManagerBean.getSpocStudentStatisticDataDtoList',
          param: [e, t, c, i],
          onload: this.__onGetSpocStudentStatisticDataDtoList._$bind(this),
        });
    };
    s.__onGetSpocStudentStatisticDataDtoList = function (e) {
      this._$dispatchEvent('onGetSpocStudentStatisticDataDtoList', e);
    };
    s._$importOutsideScores = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.importOutsideScores',
        param: [e, t, i],
        onload: this.__onImportOutsideScores._$bind(this),
      });
    };
    s.__onImportOutsideScores = function (e) {
      this._$dispatchEvent('onImportOutsideScores', e);
    };
    s._$importOutsideScoresByOperator = function (e, t, i) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.importOutsideScoresByOperator',
        param: [e, t, i],
        onload: this.__onImportOutsideScoresByOperator._$bind(this),
      });
    };
    s.__onImportOutsideScoresByOperator = function (e) {
      this._$dispatchEvent('onImportOutsideScoresByOperator', e);
    };
    s._$verifyOutsideScoresByOperator = function (e) {
      this._$postDWR({
        key: r + o,
        url: 'MocScoreManagerBean.confirmTermScoreWithoutCheck',
        param: [e],
        onload: this.__onVerifyOutsideScoresByOperator._$bind(this),
      });
    };
    s.__onVerifyOutsideScoresByOperator = function (e) {
      this._$dispatchEvent('onVerifyOutsideScoresByOperator', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'c79129330f9f62d7d9cba5762dbf350a',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d = NEJ.P('nej.j'),
      _ = NEJ.P('nej.v'),
      l,
      h;
    o._$$LearnAnnounce = NEJ.C();
    l = o._$$LearnAnnounce._$extend(o._$$Module, !0);
    h = o._$$LearnAnnounce._$supro;
    l.__getXhtml = function () {
      return a._$getHtmlTemplate(
        'jst-edu-learnAnnounce',
        r._$merge({ user: s._$getWebUser() }, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    l.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    l.__buildFuncPoints = function () {
      h.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = a._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__announceNode = a._$getByClassName(this.__body, 'j-announce')[0];
      this.__dynamicInfoNode = a._$getByClassName(this.__body, 'j-dynamicInfo')[0];
      this.__progressNode = a._$getByClassName(this.__body, 'j-progressbar')[0];
      this.__nextlinkNode = a._$getByClassName(this.__body, 'j-nextlink');
      this.__mailNoticeNode = a._$getByClassName(this.__body, 'j-mailNotice')[0];
      this.__noticeCache = new c._$$COM_Cache_TermNoticeCache();
      this.__noticeCache._$addEvent(
        'onGetAllAnnouncementByTerm',
        this.__getTermNoticesCb._$bind(this),
      );
      this.__settingsCache = new c._$$COM_Cache_MemberCache();
      if (e.isCh())
        this.__settingsCache._$addEvent(
          'onCheckEmailStatus',
          this.__onCheckEmailStatus._$bind(this),
        );
      this.__upCommingCache = new c._$$COM_Cache_CourseCtCache();
      this.__upCommingCache._$addEvent('onGetNewestItems', this.__getNewestItemsCb._$bind(this));
      if (t.donate && 1 == t.donate)
        s._$showNode(a._$getByClassName(this.__body, 'j-donatelink')[0]);
      else s._$hiddenNode(a._$getByClassName(this.__body, 'j-donatelink')[0]);
      this.__noticeCache._$addEvent(
        'onGetMocTermScoreRank',
        this.__onGetMocTermScoreRank._$bind(this),
      );
      this.__noticeCache._$addEvent(
        'onGetScholarshipRecord',
        this.__cbGetScholarshipRecord._$bind(this),
      );
      this.__mcache = new c._$$COM_Cache_ManageStudentCache();
      this.__mcache._$addEvent('onGetMocAchivementDto', this.__cbGetMocAchivementDto._$bind(this));
    };
    l.__cbGetScholarshipRecord = function (e) {
      this.__type = 2;
      this.__data = e;
      this.__checkGradeClickBind();
      if (!this.__showWelcome)
        if (1 == e.code)
          if (e.scholarshipInfoValid) {
            if (
              !d._$cookie(
                'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoValid',
              )
            ) {
              d._$cookie(
                'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoValid',
                { path: '/', domain: '.' + t.moocHost, value: !0, expires: 365 },
              );
              s._$$GradeDialog._$showDialog({ type: 2, data: e });
            }
          } else if (
            !d._$cookie(
              'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoInvalid',
            )
          ) {
            d._$cookie(
              'SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_scholarshipInfoInvalid',
              { path: '/', domain: '.' + t.moocHost, value: !0, expires: 1 },
            );
            s._$$GradeDialog._$showDialog({ type: 2, data: e });
          }
    };
    l.__onGetMocTermScoreRank = function (e) {
      this.__type = 1;
      this.__data = e;
      this.__checkGradeClickBind();
      if (!this.__showWelcome)
        if (
          !d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_rankChange') &&
          (e.code == -1 ||
            (1 == e.code &&
              e.resultDto.rankNew &&
              e.resultDto.rankLast &&
              Math.abs(e.resultDto.rankNew - e.resultDto.rankLast) >= 15))
        ) {
          d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_rankChange', {
            path: '/',
            domain: '.' + t.moocHost,
            value: !0,
            expires: 1,
          });
          s._$$GradeDialog._$showDialog({ type: 1, data: e });
        }
    };
    l.__cbGetMocAchivementDto = function (e) {
      var i = e.status;
      if (i == s.CONST.ACHIEVEMENT_STATUS_CONFIRMED)
        this.__noticeCache._$getScholarshipRecord(t.termDto.id);
      else this.__noticeCache._$getMocTermScoreRank(t.termDto.id);
    };
    l.__checkGradeClickBind = function () {
      _._$addEvent(
        this.__checkGradeNode,
        'click',
        function () {
          s._$$GradeDialog._$showDialog({ type: this.__type, data: this.__data });
        }._$bind(this),
      );
    };
    l.__getTermNoticesCb = function (e) {
      var i = s._$$AnnounceListUI._$allocate({
        parent: this.__announceNode,
        emptyTips: window.moocConfig.lang.KEY_LEARN_WAIT_TEACHER,
        showNum: s._$isSpocSync() ? 5 : 10,
        lists: e,
      });
      this.__announceUIs.push(i);
      if (s._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = s._$$SpocMoocSplit._$allocate({ parent: this.__announceNode });
        this.__noticeCache._$getAllAnnouncementByTermFront(
          t.moocTermDto.id,
          s.CONST.NOTICE_TYPE_TERM,
          t.isPreview,
        );
      }
    };
    l.__getNewestItemsCb = function (e) {
      if (e) {
        e.urlhref = '#' + s.umi('learnContent') + '?type=detail&id=';
        this.__dynamicNode = a._$html2node('<div class="m-dynamic"></div>');
        var i, n, o;
        if (e.latestChapter && e.latestLesson && e.latestUnit) {
          i = e.latestChapter.name + '/' + e.latestLesson.name;
          n =
            '#' +
            s.umi('learnContent') +
            '?type=detail&id=' +
            e.latestLesson.id +
            '&cid=' +
            e.latestUnit.id;
        } else {
          o = !0;
          i = t.courseDto.name;
          n = '#' + s.umi('learnContent');
        }
        this.__progressNode.innerHTML = a._$getHtmlTemplate(
          'jst-edu-learnAnnouncePGB',
          r._$merge(
            { user: s._$getWebUser(), link: n, name: i, first: o },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        );
        if (e.lessons)
          for (var c = 0; c < e.lessons.length; c++) {
            var d = this.__charUtil._$getCharsL(e.lessons[c].name);
            if (d > 24)
              e.lessons[c].shortName =
                this.__charUtil._$sliceCnAndEns(e.lessons[c].name, 20) + '...';
            else e.lessons[c].shortName = e.lessons[c].name;
          }
        e.infos = [];
        if (e.upcoming)
          for (var _ in e.upcoming)
            if (e.upcoming.hasOwnProperty(_) && e.upcoming[_]) {
              var l = e.upcoming[_];
              var h = { name: l.name || l.examName };
              var d = this.__charUtil._$getCharsL(l.name);
              if ('needEvaluateHomework' == _ || 'needSubmitHomework' == _)
                h.urlhref = '#' + s.umi('learnHomework') + '?id=' + l.testId;
              else if ('needSubmitQuiz' == _)
                h.urlhref = '#' + s.umi('learnQuiz') + '?id=' + l.testId;
              else if ('needSubmitExam' == _) h.urlhref = '#' + s.umi('learnExamList');
              else if ('needEvaluateExam' == _)
                h.urlhref =
                  '#' + s.umi('learnExamSubjective') + '?id=' + l.testId + '&eid=' + l.examId;
              h.submitDeadline = s._$formatCommonTime(l.submitDeadline);
              if (l.evaluateDeadline) h.evaluateDeadline = s._$formatCommonTime(l.evaluateDeadline);
              e.infos.push(h);
            }
        this.__dynamicNode.innerHTML = a._$getHtmlTemplate(
          'jst-edu-learnDynamicInfo',
          r._$merge({ upcoming: e }, { lang: (window.moocConfig || {}).lang || {} }),
        );
        this.__dynamicInfoNode.appendChild(this.__dynamicNode);
        this.__showScholarTips();
      }
    };
    l.__onCheckEmailStatus = function (e) {
      if (e) {
        var t = e.emailStatus,
          i = e.email;
        if (3 == t) s._$hiddenNode(this.__mailNoticeNode);
        else {
          s._$showNode(this.__mailNoticeNode);
          this.__mailNoticeNode.innerHTML = a._$getHtmlTemplate(
            'jst-edu-learnAnnounceMailStatus',
            r._$merge({ emailStatus: t, email: i }, { lang: (window.moocConfig || {}).lang || {} }),
          );
          this.__sendAgain = a._$get('j-sendAgain');
          if (this.__sendAgain)
            _._$addEvent(this.__sendAgain, 'click', this.__sendVerifyEmail._$bind(this, !0));
        }
      }
    };
    l.__sendVerifyEmail = function (e) {
      this.__settingsCache._$sendActiveEmail(e);
    };
    l.__onShow = function (e) {
      h.__onShow.apply(this, arguments);
      this.__moduleNameNode.innerText = (t.learnBigTabNames && t.learnBigTabNames[e.target]) || '';
      this.__onRefresh(e);
    };
    l.__onRefresh = function (e) {
      h.__onRefresh.apply(this, arguments);
      this.__clearUIs();
      this.__termId = t.termDto.id;
      this.__scholarshipFlag = this.__isScholarshiped();
      this.__noticeCache._$getAllAnnouncementByTermFront(
        this.__termId,
        s.CONST.NOTICE_TYPE_TERM,
        t.isPreview,
      );
      if (s._$isUserLogin()) this.__settingsCache._$checkEmailStatus();
      this.__upCommingCache._$getNewestItems(this.__termId);
      this.__charUtil = new o._$$CharasetUtil();
    };
    l.__showScholarTips = function () {
      this.__checkGradeNode = a._$getByClassName(this.__progressNode, 'j-checkGrade')[0];
      if (this.__scholarshipFlag) {
        s._$showNode(this.__checkGradeNode);
        if (!d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_ISWELCOMED')) {
          this.__welcomeUI = s._$$CommonDialog._$allocate({
            title: '',
            closeBtnHidden: !0,
            message:
              '<img src="//edu-image.nosdn.127.net/D754C9AA461C01B1DD840DB1746B61B2.png?imageView&thumbnail=160y160&quality=100" alt="welcome" class="f-db"><div class="title f-f0">欢迎加入“十万元奖学金悬赏令”活动！</div><hr class="line"><div class="desc f-f0">' +
              window.moocConfig.lang.KEY_LEARN_CLICK_GRADE_STATUS_YOU_CAN_VIEW_YOUR_SCORES +
              '</div>',
            okTip: window.moocConfig.lang.KEY_LEARN_UNDERSTOOD,
            okFunc: function () {
              d._$cookie('SCHOLARSHIP_' + t.webUser.id + '_' + t.termDto.id + '_ISWELCOMED', {
                path: '/',
                domain: '.' + t.moocHost,
                value: !0,
                expires: 365,
              });
            }._$bind(this),
            customStyle: 'u-welcome',
          });
          this.__welcomeUI._$show();
          this.__welcomeUINode = a._$getByClassName(document.body, 'u-welcome')[0];
          this.__welcomeUINode.style.top = this.__checkGradeNode.offsetTop + 'px';
          this.__welcomeUINode.style.left = this.__checkGradeNode.offsetLeft - 400 + 'px';
          this.__showWelcome = !0;
          if (this.__welcomeUINode)
            _._$addEvent(
              window,
              'resize',
              function () {
                this.__welcomeUINode.style.top = this.__checkGradeNode.offsetTop + 'px';
                this.__welcomeUINode.style.left = this.__checkGradeNode.offsetLeft - 400 + 'px';
              }._$bind(this),
            );
        }
        this.__mcache._$getMocAchivementDto(t.termDto.id);
      }
    };
    l.__isScholarshiped = function () {
      var e = [
        1001605004, 566001, 1001582005, 1001613003, 1001581002, 1001602008, 1001579001, 1001581011,
        1001656003, 1001657002,
      ];
      var i = !1;
      r._$forEach(
        e,
        function (e) {
          if (e == t.termDto.id) i = !0;
        }._$bind(this),
      );
      return i;
    };
    l.__clearUIs = function () {
      r._$forEach(
        this.__announceUIs,
        function (e, t) {
          e = s._$$AnnounceListUI._$recycle(e);
        }._$bind(this),
      );
      this.__announceUIs = [];
      if (this.__splitUI) this.__splitUI = s._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    l.__onHide = function () {
      this.__clearUIs();
      a._$delClassName(this.__body.parentNode, 'm-notice f-pr');
      this.__dynamicInfoNode.innerHTML = '';
      h.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
    t.dispatcher._$loaded(s.umi('learnAnnounce'), o._$$LearnAnnounce);
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '9d279df4af180d366f079ab901224cbc',
  'ad72e09e8978dc83423b503971b6294c',
  '891a76809ded82c88f5536f4458ae1ad',
  '09d18bbcabfd2b0ead3cd46dd29ee54b',
  '7ae1049f52447f73129209d74071c691',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '7f3f549154c6d7ef555fee3c9fa50df8',
  '5c4d74bc0e709956e1cf2155560a30ff',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  'bf8d09e46d2369efd6e41b29fe211330',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  'ffc2b56f4ef366e142bf7a0836d0b766',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d,
      _;
    a._$$knowledgeShare = NEJ.C();
    d = a._$$knowledgeShare._$extend(a._$$Module, !0);
    _ = a._$$knowledgeShare._$supro;
    d.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-knowledge-share', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    d.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
    };
    d.__onShow = function (e) {
      _.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    d.__onRefresh = function (e) {
      _.__onRefresh.apply(this, arguments);
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch;
      console.log('KnowledgeShare', {
        isPreview: window.isPreview,
        courseId: window.courseDto.id,
        schoolSN:
          window.courseDto && window.courseDto.schoolPanel
            ? window.courseDto.schoolPanel.shortName
            : null,
        termId: window.termDto ? window.termDto.id : null,
      });
      var t = {
        isPreview: window.isPreview,
        courseId: window.courseDto.id,
        schoolSN:
          window.courseDto && window.courseDto.schoolPanel
            ? window.courseDto.schoolPanel.shortName
            : null,
        termId: window.termDto ? window.termDto.id : null,
        isSpoc: window.isSpoc,
      };
      if (window.reactComponentLoadBootstrap) window.reactComponentLoadBootstrap.setFtlData(t);
      console.log(
        'window.reactComponentLoadBootstrap',
        document.getElementById('j-knowledge-share'),
      );
      if (window.renderReactComponent && window.renderReactComponent['KnowledgeShareWeb']) {
        console.log('已经有');
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(
          document.getElementById('j-knowledge-share'),
        );
        var i = window.renderReactComponent['KnowledgeShareWeb'];
        window.renderReactComponent.render(
          i.component,
          i.initialState,
          document.getElementById('j-knowledge-share'),
        );
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'KnowledgeShareWeb', container: document.getElementById('j-knowledge-share') },
          t,
        );
    };
    d.__onHide = function () {
      _.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(r.umi('learnKnowledgeShare'), a._$$knowledgeShare);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '6b5528963cf6513589ed63ca5804f990',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    var c = n._$addNodeTemplate(
      '<div><div class="j-content content f-richEditorText f-f0 ql-editor"></div><div class="j-empty empty"><span class="f-ib f-f0 j-emptyTips"></span></div></div>',
    );
    var d = n._$pushCSSText('.#<uispace> .content{ font-size:14px;}');
    o._$$CommonContentUI = NEJ.C();
    r = o._$$CommonContentUI._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_css = d;
      this.__seed_html = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__contentNode = n._$getByClassName(this.__body, 'j-content')[0];
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
      this.__emptyTipsNode = n._$getByClassName(this.__body, 'j-emptyTips')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      if (e.content) {
        o._$showNode(this.__contentNode);
        o._$hiddenNode(this.__emptyNode);
        this.__contentNode.innerHTML = e.content;
        s._$renderRich2(this.__contentNode);
      } else {
        o._$hiddenNode(this.__contentNode);
        o._$showNode(this.__emptyNode);
        this.__emptyTipsNode.innerText = e.emptyTips || '';
      }
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU(
  'a835e59e9ebde42101193360ba9c3d23',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c,
      d;
    a._$$LearnScoreStandard = NEJ.C();
    c = a._$$LearnScoreStandard._$extend(a._$$Module, !0);
    d = a._$$LearnScoreStandard._$supro;
    c.__init = function (e) {
      this.__parentNode = e.parent;
      d.__supInit.apply(this, arguments);
    };
    c.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-edu-learnScore', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    c.__getParent = function () {
      return this.__parentNode ? this.__parentNode : n._$get('courseLearn-inner-box');
    };
    c.__buildFuncPoints = function () {
      d.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = n._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__contentNode = n._$getByClassName(this.__body, 'j-content')[0];
      this.__courseContentCache = new r._$$COM_Cache_CourseCtCache();
      this.__courseContentCache._$addEvent(
        'onGetEvaluationDescription',
        this.__onGetTermScoreRuleCb._$bind(this),
      );
    };
    c.__onGetTermScoreRuleCb = function (t) {
      var i = o._$$CommonContentUI._$allocate({
        parent: this.__body,
        emptyTips: window.moocConfig.lang.KEY_LEARN_WAIT_STANDARD_WITH_PATIENT,
        content: t ? t.data : null,
      });
      this.__contentUIs.push(i);
      if (o._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = o._$$SpocMoocSplit._$allocate({ parent: this.__body });
        this.__courseContentCache._$getTermScoreRule(e.moocTermDto.id, !!e.isPreview);
      }
    };
    c.__onShow = function (t) {
      d.__onShow.apply(this, arguments);
      if (!t.parent)
        this.__moduleNameNode.innerText = e.learnBigTabNames && e.learnBigTabNames[t.target];
      this.__onRefresh(t);
    };
    c.__onRefresh = function (t) {
      d.__onRefresh.apply(this, arguments);
      this.__clearUIs();
      this.__courseContentCache._$getTermScoreRule(e.termDto.id, !!e.isPreview);
    };
    c.__clearUIs = function () {
      s._$forEach(
        this.__contentUIs,
        function (e, t) {
          e = o._$$CommonContentUI._$recycle(e);
        }._$bind(this),
      );
      this.__contentUIs = [];
      if (this.__splitUI) this.__splitUI = o._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    c.__onHide = function () {
      this.__clearUIs();
      d.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    c.__reset = function (e) {
      console.log('__proLearnScore __reset', e);
      if (e.parent) {
        console.log('this', this);
        e.parent.appendChild(this.__body);
        c.__onShow.apply(this, arguments);
      } else d.__supReset.apply(this, arguments);
    };
    e.dispatcher._$loaded(o.umi('learnScore'), a._$$LearnScoreStandard);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '6b5528963cf6513589ed63ca5804f990',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  'ad72e09e8978dc83423b503971b6294c',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'f7d4dcf1e9ef65b18b66824060f997c9',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c,
      d;
    a._$$LearnScore = NEJ.C();
    c = a._$$LearnScore._$extend(a._$$Module, !0);
    d = a._$$LearnScore._$supro;
    c.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-edu-certificationScore', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    c.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    c.__buildFuncPoints = function () {
      d.__buildFuncPoints.apply(this, arguments);
      this.__contentNode = n._$getByClassName(this.__body, 'j-content')[0];
    };
    c.__initReactTab = function () {
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      if (
        window.renderReactComponent &&
        window.renderReactComponent['LearnCertificationScoreWeb']
      ) {
        window.reactComponentLoadBootstrap.setFtlData({
          termId: window.termDto && window.termDto.id,
          type: 'CERTIFICATION_SCORE',
        });
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__body);
        var e = window.renderReactComponent['LearnCertificationScoreWeb'];
        window.renderReactComponent.render(e.component, e.initialState, this.__body);
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'LearnCertificationScoreWeb', container: this.__body },
          { termId: window.termDto && window.termDto.id, type: 'CERTIFICATION_SCORE' },
        );
    };
    c.__onShow = function (e) {
      d.__onShow.apply(this, arguments);
      this.__onRefresh(e);
      this.__initReactTab();
    };
    c.__onRefresh = function (e) {
      d.__onRefresh.apply(this, arguments);
      this.__clearUIs();
    };
    c.__clearUIs = function () {
      s._$forEach(
        this.__contentUIs,
        function (e, t) {
          e = o._$$CommonContentUI._$recycle(e);
        }._$bind(this),
      );
      this.__contentUIs = [];
    };
    c.__onHide = function () {
      this.__clearUIs();
      d.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('certificationScore'), a._$$LearnScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '6b5528963cf6513589ed63ca5804f990',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '539dc044c1d963df9e94597badd866fe',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d,
      _;
    o._$$LearnAIKnowledgeTermGraph = NEJ.C();
    d = o._$$LearnAIKnowledgeTermGraph._$extend(o._$$Module, !0);
    _ = o._$$LearnAIKnowledgeTermGraph._$supro;
    d.__getXhtml = function () {
      return a._$getHtmlTemplate('jst-edu-learnAIKnowledgeTermGraph', {});
    };
    d.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
    };
    d.__initReactTab = function () {
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      var i = 'CourseGraphLearnView';
      var n = this.__body;
      var a = e._$parseUrlParams(location.search) || {};
      var o = t.termDto && 1 == t.termDto.supportAiLessonPlan;
      window.reactComponentLoadBootstrap.setFtlData({
        graphId: t.termDto && t.termDto.graphId,
        termId: (termDto || {}).id,
        courseId: (courseDto || {}).id,
        questionGraphId: t.termDto && t.termDto.questionGraphId,
        skillGraphId: t.termDto && t.termDto.skillGraphId,
        schoolId: t.courseCardDto && t.courseCardDto.schoolId,
        courseName: t.courseCardDto && t.courseCardDto.name,
        isTeacherPreview: window.isPreview,
        isCourseIntroduce: !1,
        questionNodeId: a.questionNodeId,
        supportIdeologyGraph: o,
        ideologyBizType: 2,
      });
      if (window.renderReactComponent && window.renderReactComponent[i]) {
        var s = window.renderReactComponent[i];
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(n);
        window.renderReactComponent.render(s.component, s.initialState, n);
      } else window.reactComponentLoadBootstrap.init({ name: i, container: n });
    };
    d.__onShow = function (e) {
      _.__onShow.apply(this, arguments);
      this.__onRefresh();
    };
    d.__onRefresh = function (e) {
      _.__onRefresh.apply(this, arguments);
      this.__initReactTab();
    };
    d.__clearUIs = function () {
      window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__body);
    };
    d.__onHide = function () {
      this.__clearUIs();
      _.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
    t.dispatcher._$loaded(s.umi('learnAIKnowledgeTermGraph'), o._$$LearnAIKnowledgeTermGraph);
  },
  'fb061c769bfc74628a81f422f590544c',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'ddbc6553f3d9fd2ea5e975e5f805903b',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c,
      d;
    a._$$LearnScore = NEJ.C();
    c = a._$$LearnScore._$extend(a._$$Module, !0);
    d = a._$$LearnScore._$supro;
    c.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-edu-aiNote', { lang: (window.moocConfig || {}).lang || {} });
    };
    c.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    c.__buildFuncPoints = function () {
      d.__buildFuncPoints.apply(this, arguments);
      this.__contentNode = n._$getByClassName(this.__body, 'j-content')[0];
    };
    c.__initReactTab = function () {
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      if (window.renderReactComponent && window.renderReactComponent['LearnAILectureNotes']) {
        window.reactComponentLoadBootstrap.setFtlData({
          termId: window.termDto && window.termDto.id,
          type: 'AI_NOTE',
        });
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__body);
        var e = window.renderReactComponent['LearnAILectureNotes'];
        window.renderReactComponent.render(e.component, e.initialState, this.__body);
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'LearnAILectureNotes', container: this.__body },
          { termId: window.termDto && window.termDto.id, type: 'AI_NOTE' },
        );
    };
    c.__onShow = function (e) {
      d.__onShow.apply(this, arguments);
      this.__onRefresh(e);
      this.__initReactTab();
    };
    c.__onRefresh = function (e) {
      d.__onRefresh.apply(this, arguments);
      this.__clearUIs();
    };
    c.__clearUIs = function () {
      s._$forEach(
        this.__contentUIs,
        function (e, t) {
          e = o._$$CommonContentUI._$recycle(e);
        }._$bind(this),
      );
      this.__contentUIs = [];
    };
    c.__onHide = function () {
      this.__clearUIs();
      d.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('aiNote'), a._$$LearnScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '6b5528963cf6513589ed63ca5804f990',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '37bef8f3662e96aabbf7daa6bda347b5',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c,
      d;
    a._$$LearnScore = NEJ.C();
    c = a._$$LearnScore._$extend(a._$$Module, !0);
    d = a._$$LearnScore._$supro;
    c.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-edu-myNote', { lang: (window.moocConfig || {}).lang || {} });
    };
    c.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    c.__initReactTab = function () {
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      if (window.renderReactComponent && window.renderReactComponent['LearnAIMyNotes']) {
        window.reactComponentLoadBootstrap.setFtlData({
          termId: window.termDto && window.termDto.id,
          type: 'MY_NOTE',
        });
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__body);
        var e = window.renderReactComponent['LearnAIMyNotes'];
        window.renderReactComponent.render(e.component, e.initialState, this.__body);
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'LearnAIMyNotes', container: this.__body },
          { termId: window.termDto && window.termDto.id, type: 'MY_NOTE' },
        );
    };
    c.__buildFuncPoints = function () {
      d.__buildFuncPoints.apply(this, arguments);
    };
    c.__onShow = function (e) {
      d.__onShow.apply(this, arguments);
      this.__onRefresh(e);
      this.__initReactTab();
    };
    c.__onRefresh = function (e) {
      d.__onRefresh.apply(this, arguments);
      this.__clearUIs();
    };
    c.__clearUIs = function () {
      s._$forEach(
        this.__contentUIs,
        function (e, t) {
          e = o._$$CommonContentUI._$recycle(e);
        }._$bind(this),
      );
      this.__contentUIs = [];
    };
    c.__onHide = function () {
      this.__clearUIs();
      d.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('myNote'), a._$$LearnScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '6b5528963cf6513589ed63ca5804f990',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'b7b9ef3729a2fd81a911dcfcc87b7590',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c,
      d;
    a._$$LearnCustom = NEJ.C();
    c = a._$$LearnCustom._$extend(a._$$Module, !0);
    d = a._$$LearnCustom._$supro;
    c.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-edu-learnCustom', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    c.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    c.__buildFuncPoints = function () {
      d.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = n._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__contentNode = n._$getByClassName(this.__body, 'j-content')[0];
      this.__courseContentCache = new r._$$COM_Cache_CourseCtCache();
      this.__courseContentCache._$addEvent('onGetMenuItem', this.__getMenuItemCb._$bind(this));
    };
    c.__getMenuItemCb = function (t) {
      var i = o._$$CommonContentUI._$allocate({
        parent: this.__body,
        emptyTips: window.moocConfig.lang.KEY_LEARN_WAIT_WITH_PATIENT,
        content: t ? t.htmlContent : null,
      });
      this.__contentUIs.push(i);
      if (o._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = o._$$SpocMoocSplit._$allocate({ parent: this.__body });
        this.__courseContentCache._$getMenuItem(
          e.moocCourseDto.id,
          e.moocTermDto.id,
          this.__itemId,
          !!e.isPreview,
        );
      }
    };
    c.__onShow = function (e) {
      d.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    c.__onRefresh = function (t) {
      d.__onRefresh.apply(this, arguments);
      this.__itemId = t.param.id;
      if (this.__itemId) {
        this.__clearUIs();
        this.__moduleNameNode.innerText =
          e.learnBigTabNames && e.learnBigTabNames[t.target + '?id=' + this.__itemId];
        this.__courseContentCache._$getMenuItem(
          e.courseDto.id,
          e.termDto.id,
          this.__itemId,
          !!e.isPreview,
        );
      }
    };
    c.__clearUIs = function () {
      s._$forEach(
        this.__contentUIs,
        function (e, t) {
          e = o._$$CommonContentUI._$recycle(e);
        }._$bind(this),
      );
      this.__contentUIs = [];
      if (this.__splitUI) this.__splitUI = o._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    c.__onHide = function () {
      this.__clearUIs();
      d.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('learnCustom'), a._$$LearnCustom);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '6b5528963cf6513589ed63ca5804f990',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'ad72e09e8978dc83423b503971b6294c',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'f6692f1ba04c1579df3d018e109e6e81',
  '<div class="real-name-modal">\n<ux-validation-container ref="validation">\n<p class="tips">请添加真实姓名和常用邮箱，测验通过后，证书将在6小时内发送到您的邮箱</p>\n<p>真实姓名：<ux-input value={userInfo.realName} rules={va.nameRules}></ux-input>\n</p>\n<p>常用邮箱：<ux-input value={userInfo.email} rules={va.emailRules}></ux-input>\n</p>\n</ux-validation-container>\n<ux-button on-click={this.save()} class=\'ok-btn f-fr\' value={"确定"}></ux-button>\n</div>',
);
EDU(
  '6606fddb87303318b03de0194c2d9cbc',
  '.real-name-modal.ux-modal .ux-modal_dialog {\n  width: 560px; }\n\n.real-name-modal.ux-modal .tips {\n  font-size: 14px;\n  margin-bottom: 12px; }\n\n.real-name-modal.ux-modal input {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  font-variant: tabular-nums;\n  list-style: none;\n  -webkit-font-feature-settings: "tnum";\n  font-feature-settings: "tnum";\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  min-width: 0;\n  padding: 4px 11px;\n  color: rgba(0, 0, 0, 0.85);\n  font-size: 14px;\n  line-height: 1.5715;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #d9d9d9;\n  border-radius: 2px;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  height: 30px;\n  margin-bottom: 5px;\n  width: 287px; }\n  .real-name-modal.ux-modal input:focus {\n    border-color: rgba(0, 199, 88, 0.8);\n    border-right-width: 1px !important;\n    outline: 0;\n    -webkit-box-shadow: 0 0 0 2px rgba(0, 199, 88, 0.2);\n    box-shadow: 0 0 0 2px rgba(0, 199, 88, 0.2); }\n\n.real-name-modal.ux-modal .ux-btn {\n  background-color: #00CC7E;\n  border-radius: 3px;\n  width: 90px;\n  margin-top: 20px;\n  margin-right: 40px; }\n\n.real-name-modal.ux-modal .ux-modal_bd {\n  font-size: 14px;\n  padding-right: 0; }\n',
);
EDU(
  'bfe4d937668ceb5bf60071e20308537b',
  function (e, t, i, n, a, o, s, r, c, d) {
    d = i.$extends({
      name: 'RealNameSettingsModal',
      css: t,
      data: { userInfo: {}, userId: window.webUser && window.webUser.id },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.showModal();
      },
      showModal: function () {
        var t = this;
        a._$getMocMember({ id: t.data.userId }, function (i) {
          t.data.userInfo = i;
          if (!t.data.userInfo.email || !t.data.userInfo.realName)
            t.settingModal = new o({
              data: {
                class: 'real-name-modal',
                contentTemplate: e,
                userInfo: t.data.userInfo,
                okButton: !1,
                va: {
                  nameRules: [{ type: 'isFilled', message: '请填写真实姓名' }],
                  emailRules: [
                    { type: 'isFilled', message: '请填写邮箱地址' },
                    {
                      type: 'method',
                      method: function (e) {
                        return e.indexOf('@') > -1;
                      },
                      message: '请填写正确邮箱地址',
                    },
                  ],
                },
              },
              save: t.save._$bind(t),
            });
          else t.$emit('onSettingModalSave');
        });
      },
      save: function () {
        try {
          if (this.settingModal.$refs.validation.validate().success)
            a._$updateMemberEmailAndRealName(
              {
                mocMemberDto: {
                  id: this.data.userId,
                  realName: this.settingModal.data.userInfo.realName,
                  email: this.settingModal.data.userInfo.email,
                },
              },
              function (e) {
                if (e) {
                  this.$emit('onSettingModalSave');
                  this.settingModal.destroy();
                }
              }._$bind(this),
            );
        } catch (e) {}
      },
    });
    return d;
  },
  'f6692f1ba04c1579df3d018e109e6e81',
  '6606fddb87303318b03de0194c2d9cbc',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'c30079064832c51159d1cf37ab222277',
  'd414623f7407e577cd6c05efff08e96f',
  'bee6fef94cf2beab28b7ff76f5b652a0',
  '57d0e394bea4b75c21a4479f11fff93f',
  '76b358c87f41ecd47da41ee2ba42776f',
);
EDU(
  'e6b30e2908e7f3ecffc2b8d52a873ad2',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d;
    var _ = a._$addHtmlTemplate(
      '<div class="m-beforeTest">            <div class="j-baseInfo baseInfo f-f0"></div>            <div class="j-detailInfo">            </div>            <div class="agreeBox f-cb">                <input type="checkbox" id="agreeCheck" class="f-fl j-agree">                <label for="agreeCheck" class="j-agreeCt"></label>            </div>            <a class="u-btn u-btn-primary u-btn-disabled j-startBtn">{if lang.KEY_LEARN_START_QUIZ}${lang.KEY_LEARN_START_QUIZ}{else}开始测验{/if}</a>        </div>',
    );
    s._$$BeforeTestUI = NEJ.C();
    d = s._$$BeforeTestUI._$extend(s._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(_, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__baseInfo = a._$getByClassName(this.__body, 'j-baseInfo')[0];
      this.__detailInfo = a._$getByClassName(this.__body, 'j-detailInfo')[0];
      this.__startBtn = a._$getByClassName(this.__body, 'j-startBtn')[0];
      this.__agreeInput = a._$getByClassName(this.__body, 'j-agree')[0];
      this.__cxTxtNode = a._$getByClassName(this.__body, 'j-agreeCt')[0];
      o._$addEvent(this.__startBtn, 'click', this.__startTestHandle._$bind(this));
      o._$addEvent(this.__agreeInput, 'click', this.__checkProtocolHandle._$bind(this));
      this.__quizCache = new c._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent(
        'onGetMocMemberTutorialInfo',
        this.__cbGetHonestData._$bind(this),
      );
      this.__courseCache = new c._$$COM_Cache_CourseCache();
      this.__courseCache._$addEvent('onGetAggreement', this.__cbGetAggreement._$bind(this));
    };
    d.__cbGetAggreement = function (e) {
      this.__cxTxtNode.innerHTML = e;
    };
    d.__cbGetHonestData = function (e) {
      this.__agreeInput.checked = !!e[s.CONST.MOOC_TEST_PROTOCAL];
      this.__checkProtocolHandle();
    };
    d.__checkProtocolHandle = function () {
      s._$trackEvent(
        'quizHonest',
        'click',
        window.moocConfig.lang.KEY_LEARN_CLICK_AGREEMENT + !this.__agreeInput.checked,
      );
      s._$toggleClassName(!this.__agreeInput.checked, this.__startBtn, 'u-btn-disabled');
    };
    d.__startTestHandle = function () {
      if (!a._$hasClassName(this.__startBtn, 'u-btn-disabled'))
        if (this.__detailVo && 1236463554 == this.__detailVo.tid)
          new e({}).$inject(document.body).$on(
            'onSettingModalSave',
            function () {
              this._$dispatchEvent('onDoingAble');
              this.__quizCache._$setTutorialinfo(s.CONST.MOOC_TEST_PROTOCAL, 1);
              s._$trackEvent('quizBegin', 'click', window.moocConfig.lang.KEY_LEARN_CLICK_QUIZ);
            }._$bind(this),
          );
        else {
          this._$dispatchEvent('onDoingAble');
          this.__quizCache._$setTutorialinfo(s.CONST.MOOC_TEST_PROTOCAL, 1);
          s._$trackEvent('quizBegin', 'click', window.moocConfig.lang.KEY_LEARN_CLICK_QUIZ);
        }
    };
    d.__buildBaseInfo = function () {
      var e = '';
      e =
        '<p>1. ' +
        window.moocConfig.lang.KEY_LEARN_NUMBER_ATTEMPTS +
        '<span><em>' +
        this.__detailVo.totalTryCount +
        '</em> ' +
        window.moocConfig.lang.KEY_LEARN_TIMES1 +
        s._$getQuizValidScoreStr(this.__detailVo.effectScoreRule) +
        window.moocConfig.lang.KEY_LEARN_AS_GRADE +
        '</span></p>';
      if (this.__detailVo.duration > 0)
        e +=
          '<p>2. ' +
          window.moocConfig.lang.KEY_LEARN_QUIZ_LIMIT +
          '<span><em>' +
          this.__detailVo.duration / 60 +
          '</em> ' +
          window.moocConfig.lang.KEY_LEARN_MINUTE +
          '</span></p>';
      this.__baseInfo.innerHTML = e;
      this.__detailInfo.innerHTML = r._$escape(this.__detailVo.description);
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__detailVo = e.data;
      this.__buildBaseInfo();
      this.__agreeInput.checked = !1;
      this.__courseCache._$getAggreement(2);
      this.__quizCache._$getTutorialinfo();
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
  },
  'bfe4d937668ceb5bf60071e20308537b',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '2c666a1ceb412082b906b11b0948dedf',
  'adec563fba581ac0f5bf79fb5e990240',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'fb689a88a2915cc7060dce11733a426e',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.ui'),
      d,
      _ =
        '<div class="m-basepool f-cb">\t\t\t\t\t<div class="j-list">\t\t\t\t\t\t<div class="m-data-lists f-cb f-pr j-data-list"></div>\t\t\t\t\t\t<div class="u-pager f-pr j-data-pager"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="j-none empty" style="display:none"><span class="f-f0 f-fc9 j-none-txt f-ib"></span></div>\t\t\t    </div>';
    var l = n._$pushCSSText(
      '.#<uispace> .item-highlight{background:#E0F2E2;}\t\t\t.#<uispace> .m-data-lists{position:relative;z-index:100;}\t\t\t.#<uispace> .u-pager{position:relative;z-index:99;}',
    );
    s._$$BasePool = NEJ.C();
    d = s._$$BasePool._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_css = l;
      this.__seed_html = n._$addNodeTemplate(_);
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
      var i = this.__data_list_box;
      if (!this.__uiPools[e.id]) {
        if (t) this.__itemZIndex = (this.__idArr || []).length + 101;
        var n = this.__itemGen(e);
        n._$addEvent('onDelSubItem', this.__itemDelCb._$bind(this));
        if (n) {
          this.__uiPools[e.id] = n;
          var a = i.firstChild;
          if (a && t) {
            n.__parent = i;
            i.insertBefore(n._$getBody(), a);
            this.__handleFirstLast(e.id, 1);
          } else {
            n._$appendTo(i);
            this.__handleFirstLast(e.id, 2);
          }
        }
        return n;
      } else this.__itemUpdated(this.__uiPools[e.id], e);
    };
    d.__itemUpdated = function (e, t) {
      if (this.__dataMaps && this.__dataMaps.list && t) {
        var i = this.__dataMaps.list;
        for (var n = 0; n < i.length; n++) {
          var a = i[n];
          if (t.id == a.id) {
            i.splice(n, 1);
            i.splice(n, 0, t);
            break;
          }
        }
      }
    };
    d.__itemDestroy = i;
    d.__itemGen = i;
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
          var i = o._$indexOf(this.__idArr, e);
          if (i >= 0) this.__idArr.splice(i, 1);
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
        n._$delClassName(this.__firstItem._$getBody(), 'first');
        this.__firstItem = null;
      }
      if (this.__lastItem) {
        n._$delClassName(this.__lastItem._$getBody(), 'last');
        this.__lastItem = null;
      }
      if (this._$hasData()) {
        var e = this.__uiPools[this.__idArr[0]];
        var t = this.__uiPools[this.__idArr[this.__idArr.length - 1]];
        n._$addClassName(e._$getBody(), 'first');
        n._$addClassName(t._$getBody(), 'last');
        this.__firstItem = e;
        this.__lastItem = t;
        this.__poolToggle(!1);
      } else r._$hiddenNode(this.__listNode);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__data_list_box = n._$getByClassName(this.__body, 'j-data-list')[0];
      this.__data_pager_box = n._$getByClassName(this.__body, 'j-data-pager')[0];
      this.__listNode = n._$getByClassName(this.__body, 'j-list')[0];
      this.__noneNode = n._$getByClassName(this.__body, 'j-none')[0];
      this.__noneTxt = n._$getByClassName(this.__body, 'j-none-txt')[0];
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
    d.__onPageChange = i;
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
        var i = 1;
        if (e.totlePageCount && e.totlePageCount > 0) t = e.totlePageCount;
        if (e.currentPageNo && e.currentPageNo > 0) i = e.currentPageNo;
        this.__curIndex = i;
        if (this.__data_pager_box)
          if (t > 1 && this.__showPager) {
            r._$showNode(this.__data_pager_box);
            this.__pager._$updatePage(i, t);
          } else r._$hiddenNode(this.__data_pager_box);
      }
    };
    d._$scrollToItemById = function (t, i) {
      if (t && this.__uiPools[t]) {
        var a = this.__uiPools[t]._$getBody();
        var o = n._$offset(a);
        i = i ? i : 0;
        window.scrollTo(o.x, o.y - i);
        var s = 0;
        var r = e.setInterval(function () {
          if (n._$hasClassName(a, 'item-highlight')) n._$delClassName(a, 'item-highlight');
          else n._$addClassName(a, 'item-highlight');
          s += 300;
          if (s > 1e3) {
            e.clearInterval(r);
            n._$delClassName(a, 'item-highlight');
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
  '1085a79200eae1cc393e9fb1c5b9ac45',
  function (e, t) {
    var i = window,
      n = NEJ.O,
      a = NEJ.F,
      o = NEJ.P('nej.e'),
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
      _,
      l;
    var h = 'en' === window.currentLanguage;
    var f = o._$addHtmlTemplate(
      '<div class="m-choiceQuestion u-questionItem">       \t  <div class="j-title title f-cb">       \t  \t<div class="position f-fl"></div>       \t  \t<div class="qaDescription f-fl f-cb">       \t  \t    <div class="qaIndex j-qaindex f-fl f-dn"></div>       \t  \t\t<div class="qaCate j-qacate f-fl"></div>\t       \t  \t<div class="f-richEditorText j-richTxt"></div>\t       \t  \t<div class="qaMark j-qamark f-fr f-dn"></div>               <div class="j-aiQuery aiQuery f-dn"></div>       \t  \t</div>       \t  \t<label class="scoreLabel f-fr f-dn j-scoreLabel">' +
        window.moocConfig.lang.KEY_LEARN_SCORE_AND_TOTAL_SCORE +
        '</label>       \t  </div>          <div class="j-choicebox">       \t  </div>       </div>',
    );
    c._$$ChoiceQuestionUI = NEJ.C();
    _ = c._$$ChoiceQuestionUI._$extend(c._$$BaseType, !0);
    l = c._$$ChoiceQuestionUI._$supro;
    _.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = o._$getByClassName(this.__body, 'j-title')[0];
      this.__choicebox = o._$getByClassName(this.__body, 'j-choicebox')[0];
      this.__scoreLabel = o._$getByClassName(this.__body, 'j-scoreLabel')[0];
      this.__cateLabel = o._$getByClassName(this.__body, 'j-qacate')[0];
      this.__indexLabel = o._$getByClassName(this.__body, 'j-qaindex')[0];
      this.__markLabel = o._$getByClassName(this.__body, 'j-qamark')[0];
      this.__richTextNode = o._$getByClassName(this.__body, 'j-richTxt')[0];
      this.__aiQueryBox = o._$getByClassName(this.__body, 'j-aiQuery')[0];
      this.__questionInfo = o._$getChildren(this.__titleNode);
    };
    _.__buildQuestionInfo = function () {
      var t = 'en' === window.currentLanguage;
      var n = window.moocConfig.lang.KEY_LEARN_SCORE_POINTS;
      if (!this.__optIds)
        this.__optIds = this.__recordDto.qAnswerDto ? this.__recordDto.qAnswerDto.optIds : [];
      else this.__recordDto.qAnswerDto = { optIds: this.__optIds };
      var a = '',
        _ = this.__recordDto.questionDto,
        l = this.__paperType;
      if ((!this.__position && 0 != this.__position) || this.__position < 0)
        c._$hiddenNode(this.__questionInfo[0]);
      else {
        c._$showNode(this.__questionInfo[0]);
        this.__questionInfo[0].innerText = this.__position + 1;
      }
      if (this.__indexNum > 0) {
        this.__indexLabel.innerHTML = this.__indexNum + '、';
        o._$delClassName(this.__indexLabel, 'f-dn');
      }
      this.__cateLabel.innerHTML = '';
      if (this.__noScore && !c._$isWap()) {
        this.__richTextNode.innerHTML = e._$formateImagePrefix(_.title || '');
        this.__cateLabel.innerHTML = '';
      } else {
        var h = _.title || '',
          f = '';
        var u = t && _.score >= 1 ? 's' : '';
        switch (_.type) {
          case c.CONST.TYPE_OBJECTIVE_SINGLE:
            f +=
              '<span class="dan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_SINGLE +
              '</span>';
            if (!c._$isWap()) f += '(' + _.score + n + u + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_MULTI:
            f +=
              '<span class="duo">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_MULTIPLE +
              '</span>';
            if (!c._$isWap()) f += '(' + _.score + n + u + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_JUDGE:
            f +=
              '<span class="pan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_JUDGE +
              '</span>';
            if (!c._$isWap()) f += '(' + _.score + n + u + ')';
        }
        this.__cateLabel.innerHTML = f;
        this.__richTextNode.innerHTML = h;
        if (c._$isWap() && 6 != l) {
          this.__markLabel.innerHTML = '(' + _.score + n + ')';
          o._$delClassName(this.__markLabel, 'f-dn');
        }
      }
      r._$renderRich(this.__richTextNode);
      this.__type = c._$parseOptionType(_.type);
      if (1 === this.__mode && !this.__noScore && !i.isPreview)
        if (!c._$isWap() && this.__showAnalysis)
          o._$setStyle(this.__scoreLabel, 'display', 'block');
        else o._$setStyle(this.__scoreLabel, 'display', 'none');
      else o._$setStyle(this.__scoreLabel, 'display', 'none');
      var p = [],
        m = [],
        b = null,
        g = !0,
        E = {};
      if (
        this.__recordDto.qAnswerDto &&
        this.__recordDto.qAnswerDto.optIds &&
        this.__recordDto.qAnswerDto.optIds.length > 0
      )
        E = r._$array2object(this.__recordDto.qAnswerDto.optIds || null, function (e) {
          return e;
        });
      else g = !1;
      r._$forEach(_.optionDtos, function (e, t) {
        if (E[e.id]) {
          if (!e.answer) g = !1;
          m.push(d[t]);
        }
        if (e.answer) p.push(d[t]);
        if (e.analyse) b = (b || '') + '  ' + d[t] + '、' + e.analyse;
      });
      if ('checkbox' == this.__type && m.length != p.length) g = !1;
      if (_.type == c.CONST.TYPE_OBJECTIVE_JUDGE) b = _.analyse || null;
      if (this.__showAnalysis && !b) b = '';
      a = o._$getHtmlTemplate(
        'jst-edu-testChoiceOption',
        r._$merge(
          {
            queDto: _,
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
              if (_.type == c.CONST.TYPE_OBJECTIVE_JUDGE && e) {
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
      this.__choicebox.innerHTML = a;
      if (0 === this.__mode) {
        this.__inputs = o._$getByClassName(this.__choicebox, 'u-tbi');
        r._$forEach(
          this.__inputs,
          function (e, t) {
            s._$addEvent(e, 'click', this.__onSelect._$bind(this, _.optionDtos[t]));
          }._$bind(this),
        );
      }
    };
    _.__onSelect = function (e, t) {
      if ('radio' == this.__type) {
        this.__optIds[0] = e.id;
        var i = s._$getElement(t),
          n = i.checked;
        if (c._$isWap()) {
          r._$forEach(o._$getByClassName(i.parentNode.parentNode, 'answer-item'), function (e, t) {
            o._$delClassName(e, 'checked');
          });
          if (n) o._$addClassName(i.parentNode, 'checked');
          else o._$delClassName(i.parentNode, 'checked');
        }
      } else {
        var i = s._$getElement(t),
          n = i.checked;
        if (c._$isWap())
          if (n) {
            o._$addClassName(o._$getByClassName(i.parentNode, 'optionPos-check')[0], 'checked');
            o._$addClassName(i.parentNode, 'checked');
          } else {
            o._$delClassName(o._$getByClassName(i.parentNode, 'optionPos-check')[0], 'checked');
            o._$delClassName(i.parentNode, 'checked');
          }
        for (var a = !1, d = 0, _ = this.__optIds.length; d < _; d++)
          if (this.__optIds[d] == e.id)
            if (n) a = !0;
            else this.__optIds.splice(d, 1);
        if (!a && n) this.__optIds.push(e.id);
      }
      this.__answerDto.optIds = this.__optIds;
      if (!this.__done && !this.__answerDto.time) {
        this.__done = !0;
        this.__answerDto.time = c._$getCurServerTime();
      }
      if (!this.__answerDto.qid) this.__answerDto.qid = this.__recordDto.questionDto.id;
      this._$dispatchEvent('onSelect', this.__answerDto);
    };
    _.__reset = function (e) {
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
    _.__destroy = function () {
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
  function (e, t, i) {
    var n = window,
      a = NEJ.O,
      o = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('edu.u'),
      _,
      l;
    var h = s._$addHtmlTemplate(
      '<div class="m-FillBlank examMode u-questionItem f-pr">       \t  \t<div class="j-title title f-cb">\t       \t  \t<div class="position f-fl"></div>                <div class="qaDescription f-fl f-cb">                    <div class="qaIndex j-qaindex f-fl f-dn"></div>                    <div class="qaCate j-qacate f-fl"></div>    \t       \t  \t<div class="f-richEditorText j-richTxt"></div>    \t       \t  \t<div class="qaMark j-qamark f-fr f-dn"></div>                </div>       \t  \t\t<label class="scoreLabel f-fr f-dn j-scoreLabel">${lang.KEY_LEARN_SCORE}/${lang.KEY_LEARN_TOTAL_SCORE}</label>       \t  \t</div>\t       \t<div class="f-cb inputArea">\t       \t\t<div class="f-fl j-input input"></div>\t       \t\t<div class="score f-fr f-fn j-score"></div>       \t \t</div>       \t \t<div class="analysisInfo f-dn j-analysis">            </div>       </div>',
    );
    d._$$FillBlankUI = NEJ.C();
    _ = d._$$FillBlankUI._$extend(d._$$BaseType, !0);
    l = d._$$FillBlankUI._$supro;
    _.__initXGui = function () {
      this.__seed_html = s._$addNodeTemplate(
        s._$getHtmlTemplate(h, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    _.__initNode = function () {
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
    _.__buildQuestionInfo = function () {
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
      var n = !this.__noScore
        ? '<span class="pan">' + window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_FILL + '</span>'
        : '';
      var a = this.__recordDto.questionDto.score >= 1 && i.isEn() ? 's' : '';
      if (!d._$isWebView() && !this.__noScore)
        n +=
          '(' +
          this.__recordDto.questionDto.score +
          window.moocConfig.lang.KEY_LEARN_SCORE_POINTS +
          a +
          ')';
      this.__cateLabel.innerHTML = n;
      this.__richTextNode.innerHTML = e._$formateImagePrefix(
        this.__recordDto.questionDto.title || '',
      );
      c._$renderRich(this.__richTextNode);
      if (d._$isMobile() || d._$isWap()) {
        if (6 != this.__paperType) {
          var a = this.__recordDto.questionDto.score >= 1 && i.isEn() ? 's' : '';
          this.__markLabel.innerHTML =
            '(' +
            this.__recordDto.questionDto.score +
            window.moocConfig.lang.KEY_LEARN_SCORE_POINTS +
            a +
            ')';
          s._$delClassName(this.__markLabel, 'f-dn');
        }
        var o = t._$parseUrlParams(window.location.search);
        if (o.quizeCount && this.__indexNum == o.quizeCount)
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
      var _ = navigator.userAgent;
      var l = _.indexOf('Android') > -1 || _.indexOf('Adr') > -1;
      if (l);
    };
    _.__inputBlur = function () {
      var e = this.__fillblankInputUI._$getContent();
      this.__answerDto.content.content = e;
      if (!this.__done && !this.__answerDto.time) {
        this.__done = !0;
        this.__answerDto.time = d._$getCurServerTime();
      }
      this._$dispatchEvent('onSelect', this.__answerDto);
    };
    _._$setAnswerRecord = function () {
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
            var i = '<span class="f-icon u-icon-correct"></span> ';
          } else {
            s._$delClassName(this.__scoreNode, 'right');
            var i = '<span class="f-icon u-icon-wrong"></span> ';
          }
          this.__scoreNode.innerHTML =
            i +
            (this.__answerDto.score ? this.__answerDto.score.toFixed(2) : '0.00') +
            '/' +
            this.__recordDto.questionDto.score.toFixed(2);
        }
    };
    _.__judgeAnswer = function (e) {
      switch (this.__recordDto.questionDto.fillblankType) {
        case 1:
        case 2:
          var e = (this.__recordDto.questionDto.stdAnswer || '').split(
            d.CONST.FILL_BLANK_SPLITCHAR,
          );
          var t = d._$arrContains(e, this.__answerDto.content.content);
          return t;
        case 3:
          var i = this.__recordDto.questionDto.stdAnswer.split(','),
            n = parseFloat(i[0].substr(1)),
            a = parseFloat(i[1].substr(0, i[1].length - 1)),
            o = !1,
            s = !1;
          0 == i[0].indexOf('(') ? (o = !1) : (o = !0);
          i[1].indexOf(')') > 0 ? (s = !1) : (s = !0);
          if (this.__answerDto.content.content > n && this.__answerDto.content.content < a)
            return !0;
          else if (this.__answerDto.content.content == n && o) return !0;
          else if (this.__answerDto.content.content == a && s) return !0;
          else return !1;
        case 4:
          return this.__answerDto.content.content &&
            this.__recordDto.questionDto.stdAnswer.indexOf(this.__answerDto.content.content) >= 0
            ? !0
            : !1;
      }
    };
    _.__goToAnalysisMode = function () {
      this.__fillblankInputUI._$disableNoInitInput();
    };
    _.__goToExamMode = function () {
      this.__fillblankInputUI._$enableInput();
    };
    _.__reset = function (e) {
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
    _.__destroy = function () {
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
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
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
        var i = document.querySelector('#j-anchorContainer');
        if (i) {
          i.classList.remove('f-pop');
          i.classList.remove('f-pop-width');
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
  'a328147ec582fd1a85c9f0beb695bb31',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.d'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d,
      _;
    r._$$Quiz_Question_Pool = NEJ.C();
    d = r._$$Quiz_Question_Pool._$extend(s._$$BasePool, !0);
    _ = r._$$Quiz_Question_Pool._$supro;
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
        i = e.objectiveQList;
      t = { totlePageCount: 1, currentPageNo: 1, list: i };
      this.__idsArr = [];
      c._$forEach(
        i,
        function (e) {
          this.__idsArr.push(e.id);
        }._$bind(this),
      );
      return t;
    };
    d.__itemGen = function (e) {
      var t = c._$indexOf(this.__idsArr, e.id);
      var i = r._$$QuestionItem
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
      return i;
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
          var i = this.__uiPools[t];
          if (i) e.push(i._$getAnswerDto());
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
  'a01f33fc4c73dd5578f3439696dfd8bc',
  function (e, t, i) {
    var n = window,
      a = NEJ.O,
      o = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      _ = NEJ.P('edu.d'),
      l = NEJ.P('nej.ut'),
      h;
    var f = s._$addHtmlTemplate(
      '<div class="m-quizDoing">              <div class="j-warnTip warnTip f-dn"></div>              <div class="j-description"></div>              <div class="timeBox f-pf u-btn u-btn-orange j-timeNode">                  <span class="f-icon u-icon-clock"></span>                  ${lang.KEY_LEARN_COUNTDOWN}                  <span class="j-timeTxt"></span>              </div>              <div class="j-quizPool quizPool"></div>              <a class="u-btn u-btn-default j-submitBtn">${lang.KEY_LEARN_SUBMIT_ANSWER}</a>          </div>',
    );
    var u = { NORMAL: 1, AUTO: 2, CHEAT: 3 };
    c._$$QuizDoingUI = NEJ.C();
    h = c._$$QuizDoingUI._$extend(c._$$UIBase, !0);
    h.__initXGui = function () {
      this.__seed_html = s._$addNodeTemplate(
        s._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    h.__getSwitchCount = function (e) {
      this.__quizCache._$getSwitchCount(
        { aid: this.__originQuizDto.aid },
        function (t) {
          console.log('发请求获取次数', t);
          this.__hasSwitchCount = t.switchPageCount || 0;
          e();
        }._$bind(this),
      );
    };
    h.__onExitFullScreen = function (t) {
      var i = window.moocConfig.lang;
      console.log('__onExitFullScreen', this.__baseInfo);
      var a = '';
      var o = this.__baseInfo.allowSwitchPageCount || 0;
      var s = t ? this.__hasSwitchCount : this.__hasSwitchCount + 1;
      var r = o - s;
      console.log('已切换', s, '剩余', r);
      if (r > 3) a = i.KEY_EXAM_SWITCH_PAGE_TIP_PRE + o + i.KEY_EXAM_SWITCH_TIME_SUBMIT_AFTER;
      else if (r <= 0) {
        a = i.KEY_EXAM_YOU_SWITCH + o + i.KEY_EXAM_YOU_SWITCH_TIME_SUBMIT;
        this._$stopTimer();
        this.__originQuizDto.submitType = u.CHEAT;
        this.__originQuizDto.autoSubmit = !0;
        console.log('强制交卷', this.__originQuizDto);
        if (!this.__hasSubmited)
          this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
        this.__hasSubmited = !0;
      } else if (1 === o) {
        a = i.KEY_EXAM_YOU_SWITCH + o + i.KEY_EXAM_YOU_SWITCH_TIME_SUBMIT;
        this._$stopTimer();
        this.__originQuizDto.submitType = u.CHEAT;
        this.__originQuizDto.autoSubmit = !0;
        console.log('强制交卷', this.__originQuizDto);
        if (!this.__hasSubmited)
          this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
        this.__hasSubmited = !0;
      } else
        a =
          i.KEY_EXAM_YOU_RESWITCH_TIP +
          r +
          i.KEY_EXAM_YOU_RESWITCH_TIME_SUBMIT_TIP +
          s +
          i.KEY_EXAM_YOU_RESWITCH_TIMES;
      this.modal = new e({
        data: {
          title: r ? i.KEY_EXAM_CHECK_SWITCH_PAGE_TIP : i.KEY_EXAM_FORCE_SUBMIT_TIP,
          content: a,
          okButton: i.KEY_LEARN_CONFIRM,
          cancelButton: null,
        },
      });
      this.modal.$on(
        'close',
        !r || document.fullscreenElement
          ? function () {
              console.log('location.hash', location);
              if (
                ~location.hash.indexOf('learn/examObject') ||
                ~location.hash.indexOf('learn/examSubjective')
              )
                this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 4 });
              if (this.modal) {
                this.modal.destroy();
                this.modal = null;
              }
            }._$bind(this)
          : this.__onEnterFullScreen._$bind(this),
      );
    };
    h.__exitHandler = function (e) {
      console.log('__exitHandler', e, location);
      if (this.__isPreventCheating && !this.modal)
        this.__getSwitchCount(
          function () {
            this.__onExitFullScreen(document.fullscreenElement && e && 'blur' === e.type ? !0 : !1);
            this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 3 });
          }._$bind(this),
        );
    };
    h.__onFullScreenChange = function (e, t) {
      console.log('__onFullScreenChange', e, t, this.__isPreventCheating);
      console.log('是否已有弹窗', this.modal);
      if (this.__isPreventCheating && !this.modal)
        if (null !== document.fullscreenElement) {
          console.log('进入全屏');
          this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 4 });
        } else if (!this.__onRefreshing) {
          this.__getSwitchCount(
            function () {
              console.log('退出全屏');
              this.__onExitFullScreen();
              this.__quizCache._$saveTrace({ answerformId: this.__originQuizDto.aid, type: 3 });
            }._$bind(this),
          );
          this.__onRefreshing = !1;
        }
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__warnTip = s._$getByClassName(this.__body, 'j-warnTip')[0];
      this.__timeNode = s._$getByClassName(this.__body, 'j-timeNode')[0];
      this.__timeTxt = s._$getByClassName(this.__body, 'j-timeTxt')[0];
      this.__quizPoolNode = s._$getByClassName(this.__body, 'j-quizPool')[0];
      this.__submitBtn = s._$getByClassName(this.__body, 'j-submitBtn')[0];
      this.__description = s._$getByClassName(this.__body, 'j-description')[0];
      r._$addEvent(this.__submitBtn, 'click', this.__onSubmitHandle._$bind(this));
      this.__quizCache = new _._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onSubmitAnswers', this.__onSubmitAnswersCB._$bind(this));
    };
    h.__onEnterFullScreen = function () {
      if (this.modal) {
        this.modal.destroy();
        this.modal = null;
      }
      var e = [
        'requestFullscreen',
        'mozRequestFullScreen',
        'msRequestFullscreen',
        'webkitRequestFullscreen',
      ];
      for (var t = 0; t < e.length; t++) {
        var i = e[t];
        if (document.body && document.body[i]) {
          document.body[i]();
          break;
        }
      }
    };
    h.__useExitFullScreen = function () {
      console.log('__useExitFullScreen');
      var e = ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'];
      for (var t = 0; t < e.length; t++) {
        var i = e[t];
        if (document[i]) {
          document[i]();
          break;
        }
      }
    };
    h.__removeListern = function () {
      clearInterval(this.__sId);
      clearInterval(this.assistantTimer);
      this.__onRefreshing = !1;
      if (this.__hasEventListener) {
        console.log('清除定时器');
        window.removeEventListener('blur', this.__bindExitHandler);
        document.body.removeEventListener('fullscreenchange', this.__bindOnFullScreenChange);
      }
    };
    h.__reset = function (e) {
      var i = this;
      console.log('__initNode');
      this.__supReset(e);
      this.__type = e.type;
      this.__examId = e.examId;
      this.__examType = e.examType;
      this.__testId = e.testId;
      var n;
      switch (this.__type) {
        case 'quiz':
          n = 11;
          this.__typeTxt = window.moocConfig.lang.KEY_LEARN_TEST;
          break;
        case 'exam':
          n = 12;
          this.__typeTxt = window.moocConfig.lang.KEY_LEARN_EXAMINATION;
          this.__addBeforeUnloadEvent();
          this.__doInitDomEvent([
            [location, 'beforeurlchange', this.__hashChangeHandle._$bind(this)],
          ]);
      }
      this.__baseInfo = e.baseInfo || {};
      var a = /img[0-9].ph.126.net/g;
      var o;
      try {
        o = JSON.parse(JSON.stringify(e.quizDto).replace(a, 'img-ph-mirror.nosdn.127.net'));
      } catch (s) {
        o = e.quizDto;
      }
      this.__originQuizDto = o;
      this.__recordDtos = c._$convertPaperQustionObj(
        this.__originQuizDto.objectiveQList,
        this.__originQuizDto.answers,
      );
      this.__buildBaseData();
      if (this.__canSubmitOrSave()) {
        this.__removeListern();
        this.__assistantHeart(n);
        this.__hasEventListener = !0;
        this.__bindExitHandler = this.__exitHandler._$bind(this);
        this.__bindOnFullScreenChange = this.__onFullScreenChange._$bind(this);
        if (this.__baseInfo.duration != -1) {
          console.log('开始倒计时', this.__baseInfo.duration);
          this.__serverTime = null;
          this.__countdownTime(this.__showTime._$bind(this));
          c._$showNode(this.__timeNode);
        } else c._$hiddenNode(this.__timeNode);
        window.addEventListener('blur', this.__bindExitHandler);
        document.body.addEventListener('fullscreenchange', this.__bindOnFullScreenChange);
        this.__hasSubmited = !1;
        this.__isPreventCheating =
          this.__baseInfo.allowSwitchPageCount && this.__baseInfo.allowSwitchPageCount > 0
            ? !0
            : !1;
        this.__hasSwitchCount = 0;
        console.log('是否设置__isPreventCheating', this.__isPreventCheating);
        if (this.__baseInfo.startTime && this.__isPreventCheating)
          this.__getSwitchCount(
            function () {
              this.__onExitFullScreen(!0);
            }._$bind(this),
          );
        if (this.__baseInfo.duration != -1) {
          var r = document.querySelector('#j-global-ai-robot');
          r && r.classList.add('f-dn');
        }
        console.log(this.__baseInfo);
        document.addEventListener('visibilitychange', function () {
          if (!document.hidden) {
            var e = __clientEndTime - new Date();
            i.__showTime(e);
          } else;
        });
      } else c._$hiddenNode(this.__timeNode);
      window.learnUtilQuestionList = t._$getQuestionList(e.quizDto);
      var d = e.quizDto || {};
      var r = document.querySelector('#j-global-ai-robot');
      r && r.classList.add('f-dn');
    };
    h.__buildBaseData = function (e) {
      this.__buildQuizPool();
      if (!n.isPreview) {
        if (
          'quiz' == this.__type &&
          this.__baseInfo.usedTryCount >= this.__baseInfo.totalTryCount
        ) {
          this.__warnTip.innerHTML =
            window.moocConfig.lang.KEY_LEARN_YOU_USED_UP_ALL +
            this.__typeTxt +
            window.moocConfig.lang.KEY_LEARN_YOU_USED_UP_ALL1;
          s._$delClassName(this.__warnTip, 'f-dn');
        }
        if (c._$getCurServerTime() >= this.__baseInfo.deadline) {
          if (i.isCh())
            this.__warnTip.innerHTML =
              this.__typeTxt + window.moocConfig.lang.KEY_LEARN_DEADLINE_IS_OVER;
          else
            this.__warnTip.innerHTML =
              'The submission deadline for the ' +
              this.__typeTxt +
              ' has passed. You can take the quiz as a self-learning means, but you will not get credit.';
          s._$delClassName(this.__warnTip, 'f-dn');
        } else s._$addClassName(this.__warnTip, 'f-dn');
      }
      if ('exam' == this.__type)
        this.__description.innerHTML = d._$escape(this.__baseInfo.description || '');
      if (window.location.href.includes('quizScreenshot')) {
        var t = document.querySelector('.j-data-list');
        var a = this.__originQuizDto.objectiveQList;
        var o, r;
        for (var _ = 0; _ < a.length; _++) {
          o = t.children[_];
          o.setAttribute('data-id', a[_].id);
          r = o.querySelector('img');
          o.setAttribute('data-hasimg', r ? 1 : 0);
        }
      }
    };
    h.__getServerTime = function (e) {
      console.log('通过接口获取服务器时间');
      this.__quizCache._$getCurServerTimeByFetch(
        function (t) {
          this.__serverTime = t;
          this.__clientCostTime = 0;
          e();
        }._$bind(this),
      );
    };
    h.__countdownTime = function (e) {
      console.log('倒计时');
      var t = this;
      if (!this.__serverTime) {
        console.log('第一次倒计时');
        this.__getServerTime(function () {
          t.orgTime = t.__serverTime;
          t.__calStartTime();
          t.__genTimeDragger();
          e();
        });
      }
    };
    h.__calStartTime = function () {
      var e = (this.__baseInfo.deadline - this.__serverTime) / 1e3;
      console.log('__calStartTime', this.__baseInfo.startTime, this.__baseInfo.deadline);
      if (e > 0 && e < this.__baseInfo.duration + 60) this.__clientStartTime = e;
      else if (this.__baseInfo.startTime)
        this.__clientStartTime =
          this.__baseInfo.duration - (this.__serverTime - this.__baseInfo.startTime) / 1e3;
      else this.__clientStartTime = this.__baseInfo.duration;
      this.__clientEndTime = new Date(this.__serverTime + this.__clientStartTime);
    };
    h.__buildQuizPool = function () {
      this.__examPool = c._$$Quiz_Question_Pool._$allocate({
        parent: this.__quizPoolNode,
        mode: 0,
        data: this.__originQuizDto,
        recordDtos: this.__recordDtos,
        onSelect: this.__storeAnswerDtos._$bind(this),
      });
    };
    h._$startTimer = function () {
      this.__timer && clearInterval(this.__timer);
      this.__timer = n.setInterval(
        function () {
          var e = this.__showTime();
          if (e <= 0) {
            this._$stopTimer();
            this.__originQuizDto.autoSubmit = !0;
            this.__originQuizDto.submitType = u.AUTO;
            console.log('自动提交');
            if (!this.__hasSubmited)
              this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
            this.__hasSubmited = !0;
            c._$trackEvent(
              'quizAutoSave',
              'click',
              '强制提交' +
                this.__typeTxt +
                '，id:' +
                this.__baseInfo.tid +
                ',answeror:' +
                n.webUser.id,
            );
          }
        }._$bind(this),
        1e3,
      );
    };
    h._$stopTimer = function () {
      this.__timer = n.clearInterval(this.__timer);
    };
    h.__onSubmitAnswersCB = function (e) {
      c._$hiddenNode(this.__timeNode);
      this.__removeListern();
      switch (this.__type) {
        case 'quiz':
          if (100 === e)
            c._$$CommonDialog._$showDialog({
              type: 1,
              message: window.moocConfig.lang.KEY_LEARN_THE_QUI_ELSEWHERE,
              okFunc: function () {
                n.dispatcher._$redirect(
                  c.umi('learnQuizScore') +
                    '?id=' +
                    this.__baseInfo.tid +
                    '&aid=' +
                    this.__originQuizDto.aid,
                );
              }._$bind(this),
              okTip: window.moocConfig.lang.KEY_LEARN_CONFIRM,
            });
          else
            n.dispatcher._$redirect(
              c.umi('learnQuizScore') +
                '?id=' +
                this.__baseInfo.tid +
                '&aid=' +
                this.__originQuizDto.aid +
                '&eid=' +
                this.__examId +
                '&examType=' +
                this.__examType,
            );
          break;
        case 'exam':
          this.__clearUnload();
          if (c._$getCurServerTime() >= this.__baseInfo.deadline)
            n.dispatcher._$redirect(
              c.umi('learnExamObjectScore') +
                '?id=' +
                this.__baseInfo.tid +
                '&aid=' +
                this.__originQuizDto.aid,
            );
          else if (100 === e)
            c._$$CommonDialog._$showDialog({
              type: 1,
              message: window.moocConfig.lang.KEY_LEARN_THE_EXAM_ELSEWHERE,
              okFunc: function () {
                this._$dispatchEvent('onSubmit');
              }._$bind(this),
              okTip: window.moocConfig.lang.KEY_LEARN_CONFIRM,
            });
          else this._$dispatchEvent('onSubmit');
      }
    };
    h.__onSubmitHandle = function (e) {
      switch (this.__type) {
        case 'quiz':
          var t = window.moocConfig.lang.KEY_LEARN_THE_SUBMIT;
          break;
        case 'exam':
          var t = window.moocConfig.lang.KEY_LEARN_YOU_SUBMIT;
      }
      if (e != -1) {
        c._$$CommonDialog._$showDialog({
          modal: !1,
          type: 1,
          message: t,
          okFunc: function () {
            this.__originQuizDto.autoSubmit = !1;
            this.__originQuizDto.answers &&
              this.__originQuizDto.answers.forEach(function (e) {
                if (!e.optIds) e.optIds = [];
              });
            this._$stopTimer();
            this.__originQuizDto.submitType = u.NORMAL;
            console.log('手动提交');
            this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
          }._$bind(this),
          cancelFunc: o,
        });
        c._$trackEvent(
          this.__typeTxt + '提交',
          'click',
          '提交' + this.__typeTxt + '，id:' + this.__baseInfo.tid,
        );
        if (!n.isPreview) {
          var i = {
            userId: c._$getWebUser().id,
            courseId: n.courseDto.id,
            termId: n.termDto.id,
            quizId: this.__baseInfo.tid,
          };
          if (this.__examId) i.examId = this.__examId;
          c._$trackEvent(this.__type, 'submit', c._$convertToJSONHex(i));
          c._$log2Study(this.__type, 'submit', i);
        }
      } else window.location.reload();
    };
    h.__canSubmitOrSave = function () {
      return !n.isPreview && c._$getCurServerTime() <= this.__baseInfo.deadline;
    };
    h.__storeAnswerDtos = function (e) {
      if (e) {
        var t = !1;
        d._$forEach(
          this.__originQuizDto.answers,
          function (i, n) {
            if (i.qid == e.qid) {
              t = !0;
              this.__originQuizDto.answers[n] = e;
            }
          }._$bind(this),
        );
        if (!t) {
          if (!this.__originQuizDto.answers) this.__originQuizDto.answers = [];
          this.__originQuizDto.answers.push(e);
        }
        console.log('save', this.__originQuizDto);
        this.__quizCache._$saveDraftAnswers(this.__originQuizDto, !!n.isPreview);
      }
    };
    h.__genTimeDragger = function () {
      if (!this.__dragger)
        this.__dragger = l._$$Dragger._$allocate({
          body: this.__timeNode,
          overflow: !0,
          direction: 0,
          onchange: function (e) {
            s._$setStyle(this.__timeNode, 'top', e.top + 'px');
            s._$setStyle(this.__timeNode, 'left', e.left + 'px');
          }._$bind(this),
        });
    };
    h.__showTime = function (e) {
      if (this.__sId) clearInterval(this.__sId);
      var t = e || this.__clientStartTime - this.__clientCostTime;
      if (!n.isPreview && t <= 0) {
        this._$stopTimer();
        this.__originQuizDto.autoSubmit = !0;
        this.__originQuizDto.submitType = u.AUTO;
        console.log('自动提交');
        if (!this.__hasSubmited)
          this.__quizCache._$submitAnswers(this.__originQuizDto, !!n.isPreview);
        this.__hasSubmited = !0;
        c._$trackEvent(
          'quizAutoSave',
          'click',
          '强制提交' + this.__typeTxt + '，id:' + this.__baseInfo.tid + ',answeror:' + n.webUser.id,
        );
      }
      if (t > 0) this.__timeTxt.innerHTML = c._$formatVideoTime(t);
      this.__sId = setInterval(
        function () {
          this.__clientCostTime++;
          this.__showTime();
        }._$bind(this),
        1e3,
      );
      return t;
    };
    h.__addBeforeUnloadEvent = function () {
      window.onbeforeunload = function (e) {
        this.__onRefreshing = !0;
        e = e || window.event;
        var t = window.moocConfig.lang.KEY_LEARN_EXAM_ONE_CHANCE;
        e.returnValue = t;
        return t;
      }._$bind(this);
    };
    h.__hashChangeHandle = function (e) {
      console.log('__hashChangeHandle');
      if (this.__canSubmitOrSave()) {
        e.stopped = !0;
        c._$$CommonDialog._$showDialog({
          title: window.moocConfig.lang.KEY_LEARN_ARE_PAGE,
          message: window.moocConfig.lang.KEY_LEARN_EXAM_ONE_CHANCE,
          modal: !0,
          okTip: window.moocConfig.lang.KEY_LEARN_LEAVE_PAGE,
          okFunc: function () {
            this.__exitHandler();
            n.dispatcher._$redirect(e.newValue.href, { ignored: !0 });
          }._$bind(this),
          cancelTip: window.moocConfig.lang.KEY_LEARN_STAY_PAGE,
          cancelFunc: o._$bind(this),
        });
      }
    };
    h.__assistantHeart = function (e) {
      console.log('pageType=', e);
      this.assistantTimer = n.setInterval(
        function () {
          this.__quizCache._$assistantHeart(e);
        }._$bind(this),
        1e4,
      );
    };
    h.__clearUnload = function () {
      r._$clearEvent(location, 'beforeurlchange');
      window.onbeforeunload = null;
    };
    h.__destroy = function () {
      if (this.__examPool) this.__examPool = c._$$Quiz_Question_Pool._$recycle(this.__examPool);
      if (this.__dragger) this.__dragger = l._$$Dragger._$recycle(this.__dragger);
      if (this.__timer) this.__timer = n.clearInterval(this.__timer);
      this.__removeListern();
      this.__clearUnload();
      this.__supDestroy();
    };
  },
  'd414623f7407e577cd6c05efff08e96f',
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'c4bf52eb0c59916cecfa7899e5d4791a',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'c4bf52eb0c59916cecfa7899e5d4791a',
  'a328147ec582fd1a85c9f0beb695bb31',
);
EDU(
  '472fb1aba526fad6383f79b0f9c5009d',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('nej.ut'),
      d = NEJ.P('edu.d'),
      _,
      l;
    a._$$LearnQuiz = NEJ.C();
    _ = a._$$LearnQuiz._$extend(a._$$Module, !0);
    l = a._$$LearnQuiz._$supro;
    _.__getXhtml = function () {
      return n._$getHtmlTemplate(
        'jst-edu-learnQuiz',
        s._$merge(
          { showHelp: !0, backTxt: window.moocConfig.lang.KEY_LEARN_RETURN },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    _.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    _.__buildFuncPoints = function () {
      l.__buildFuncPoints.apply(this, arguments);
      this.__titleNode = n._$getByClassName(this.__body, 'j-title')[0];
      this.__prepareNode = n._$getByClassName(this.__body, 'j-prepare')[0];
      this.__doingNode = n._$getByClassName(this.__body, 'j-doing')[0];
      this.__quizPoolNode = n._$getByClassName(this.__body, 'j-quizPool')[0];
      this.__backNode = n._$getByClassName(this.__body, 'j-backList')[0];
      r._$addEvent(
        this.__backNode,
        'click',
        function () {
          if (200 === window.learnMode || 300 === window.learnMode)
            window.dispatcher._$redirect(o.umi('efficientExamine'));
          else window.dispatcher._$redirect(o.umi('learnTestList'));
        }._$bind(this),
      );
      this.__quizCache = new d._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetOpenQuizInfo', this.__onGetQuizInfoCB._$bind(this));
      this.__quizCache._$addEvent('onGetPreviewQuizList', this.__onGetQuizListCB._$bind(this));
      this.__quizCache._$addEvent('onGetQuizPaperList', this.__onGetQuizListCB._$bind(this));
    };
    _.__onGetQuizInfoCB = function (e) {
      if (e) {
        this.__quizInfo = e;
        this.__titleNode.innerHTML = s._$escape(e.name);
        if (this.__beforeTest) this.__beforeTest = o._$$BeforeTestUI._$recycle(this.__beforeTest);
        if (e.aid <= 0 || !e.aid)
          this.__beforeTest = o._$$BeforeTestUI._$allocate({
            parent: this.__prepareNode,
            data: e,
            onDoingAble: this.__onToggleDoing._$bind(this),
          });
        else this.__onToggleDoing();
      }
    };
    _.__onGetQuizListCB = function (e) {
      if (e) {
        n._$addClassName(this.__prepareNode, 'f-dn');
        n._$delClassName(this.__doingNode, 'f-dn');
        this.__quizDoingUI = o._$$QuizDoingUI._$allocate({
          parent: this.__doingNode,
          quizDto: e,
          baseInfo: this.__quizInfo,
          type: 'quiz',
        });
      }
    };
    _.__onToggleDoing = function () {
      var t = !e.isPreview ? this.__quizInfo.aid : null;
      if (1 == e.isPreview) this.__quizCache._$getPreviewQuizList(this.__testId);
      else this.__quizCache._$getOpenQuizPaperList(this.__testId, t, !1, e.appId);
    };
    _.__onRefresh = function (t) {
      l.__onRefresh.apply(this, arguments);
      this.__quizInfo = [];
      this.__testId = t.param.id || '';
      this.__quizCache._$getOpenQuizInfo(this.__testId, null, !!e.isPreview, e.appId);
      if (!e.isPreview) {
        var i = {
          userId: o._$getWebUser().id,
          courseId: e.courseDto.id,
          termId: e.termDto.id,
          quizId: this.__testId,
        };
        o._$trackEvent('quiz', 'view', o._$convertToJSONHex(i));
        o._$log2Study('quiz', 'view', i);
      }
    };
    _.__onShow = function (t) {
      if ((e.webUser && 0 != e.isEnroll) || e.isNeedOpenCloseTerm) {
        l.__onShow.apply(this, arguments);
        this.__onRefresh(t);
      } else e.dispatcher._$redirect(o.umi('notEnroll') + '?from=homework');
    };
    _.__onHide = function () {
      if (this.__beforeTest) this.__beforeTest = o._$$BeforeTestUI._$recycle(this.__beforeTest);
      if (this.__quizDoingUI) this.__quizDoingUI = o._$$QuizDoingUI._$recycle(this.__quizDoingUI);
      n._$delClassName(this.__prepareNode, 'f-dn');
      n._$addClassName(this.__doingNode, 'f-dn');
      if (this.__timer) this.__timer = e.clearInterval(this.__timer);
      l.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('learnQuiz'), a._$$LearnQuiz);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'e6b30e2908e7f3ecffc2b8d52a873ad2',
  'a01f33fc4c73dd5578f3439696dfd8bc',
  '2c666a1ceb412082b906b11b0948dedf',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  'ea133e51ffbd943e2a04b21cb3716cd7',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('nej.v'),
      d = NEJ.P('edu.d'),
      _,
      l;
    o._$$ObjectiveScoreBase = NEJ.C();
    _ = o._$$ObjectiveScoreBase._$extend(o._$$Module, !0);
    l = o._$$ObjectiveScoreBase._$supro;
    _.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    _.__buildFuncPoints = function () {
      l.__buildFuncPoints.apply(this, arguments);
      this.__titleNode = a._$getByClassName(this.__body, 'j-title')[0];
      this.__quizPoolNode = a._$getByClassName(this.__body, 'j-quizPool')[0];
      this.__backNode = a._$getByClassName(this.__body, 'j-backList')[0];
      this.__totalScore = a._$getByClassName(this.__body, 'j-totalScore')[0];
      this.__submitTime = a._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__scoreInfo = a._$getByClassName(this.__body, 'j-scoreInfo')[0];
      this.__warnTip = a._$getByClassName(this.__body, 'j-warnTip')[0];
      this.__quizCache = new d._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetQuizInfo', this.__onGetQuizInfoCB._$bind(this));
      this.__quizCache._$addEvent('onGetPreviewQuizList', this.__onBuildQuizAnalysis._$bind(this));
      this.__quizCache._$addEvent('onGetQuizPaperList', this.__onBuildQuizAnalysis._$bind(this));
    };
    _.__onGetQuizInfoCB = function (e) {
      if (e && e.targetAnswerform) {
        this.__quizInfo = e;
        this.__titleNode.innerText = e.name;
        this.__buildBaseData(e.targetAnswerform);
        if (1 == t.isPreview) this.__quizCache._$getPreviewQuizList(this.__testId);
        else
          this.__quizCache._$getOpenQuizPaperList(
            this.__testId,
            e.targetAnswerform.aid,
            !0,
            t.appId,
          );
      }
    };
    _.__buildBaseData = function (e) {
      if (e) {
        this.__invalidScore = !1;
        if (!s._$isUserOwner(e.answererId)) {
          a._$addClassName(this.__warnTip, 'f-dn');
          a._$addClassName(this.__scoreInfo, 'f-dn');
        } else if (e.effectStatus != s.CONST.QUIZ_SUBMIT_EFFECT && 1 == !t.isPreview) {
          a._$delClassName(this.__warnTip, 'f-dn');
          a._$addClassName(this.__scoreInfo, 'f-dn');
          this.__invalidScore = !0;
        } else {
          a._$addClassName(this.__warnTip, 'f-dn');
          a._$delClassName(this.__scoreInfo, 'f-dn');
          if (1 == window.shouldHiddenScore)
            this.__totalScore.innerHTML =
              '<span class="j-triggerLockScore"></span>/' + this.__quizInfo.totalScore.toFixed(2);
          else
            this.__totalScore.innerText =
              e.score.toFixed(2) + '/' + this.__quizInfo.totalScore.toFixed(2);
          this.__submitTime.innerText = s._$formatShortTime(e.submitTime);
        }
      }
    };
    _.__onBuildQuizAnalysis = function (e) {
      console.log(e);
      if (e) {
        this.__recordDtos = s._$convertPaperQustionObj(e.objectiveQList, e.answers);
        this.__buildQuizPool(e);
      }
    };
    _.__buildQuizPool = function (e) {
      if (this.__quizPool) this.__quizPool = s._$$Quiz_Question_Pool._$recycle(this.__quizPool);
      this.__quizPool = s._$$Quiz_Question_Pool._$allocate({
        parent: this.__quizPoolNode,
        mode: 1,
        data: e,
        recordDtos: this.__recordDtos,
      });
      if (
        (e.deadline && s._$getCurServerTime() > e.deadline) ||
        (e.tryTime && e.usedTryCount >= e.tryTime)
      )
        this.__renderGLobalAIButton(e);
      else {
        var t = document.querySelector('#j-global-ai-robot');
        t && t.classList.add('f-dn');
      }
    };
    _.__renderGLobalAIButton = function (t) {
      var i = document.querySelector('#j-global-ai-robot');
      i && i.classList.remove('f-dn');
      window.learnUtilQuestionList = e._$getQuestionList(t);
      e._$renderGLobalAIButton(
        {
          pageType: location.hash.indexOf('/learn/exam') > -1 ? e.PAGE_TYPE.EXAM : e.PAGE_TYPE.QUIZ,
          sceneType: e.SCENE_TYPE.QUIZ,
          termId: window.termDto && window.termDto.id,
          courseId: window.courseDto && window.courseDto.id,
          courseName: window.courseDto && window.courseDto.name,
          qid: t.tid,
          questions: e._$getQuestionList(t),
        },
        document.querySelector('#j-global-ai-robot'),
      );
    };
    _.__onShow = function (e) {
      l.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    _.__onRefresh = function (e) {
      l.__onRefresh.apply(this, arguments);
      this.__testId = e.param.id || null;
      this.__aid = e.param.aid || null;
      this.__quizCache._$getQuizInfo(this.__testId, this.__aid, !!t.isPreview);
      if (1 == t.isPreview) s._$hiddenNode(this.__scoreInfo);
      else s._$showNode(this.__scoreInfo);
    };
    _.__onHide = function () {
      if (this.__quizPool) this.__quizPool = s._$$Quiz_Question_Pool._$recycle(this.__quizPool);
      l.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'a328147ec582fd1a85c9f0beb695bb31',
  '2c666a1ceb412082b906b11b0948dedf',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '93828627ddb358ed890cb65967a0c1de',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '7ae1049f52447f73129209d74071c691',
);
EDU(
  '89b93e863cc28cb6585df6be96082031',
  function (e) {
    var t = NEJ.P('edu.d'),
      i = NEJ.P('nej.u'),
      n = i._$randNumberString();
    t._$$COM_Cache_ScoreAppealCache = NEJ.C();
    var a = t._$$COM_Cache_ScoreAppealCache._$extend(t._$$COM_Cache);
    a._$getAppealStatus = function (t, i, n, a) {
      e._$request({
        url: '/mm-tiku/web/j/mocCertScoreAppealBean.getAppealStatus.rpc',
        method: 'POST',
        data: JSON.stringify({ bizType: t, bizId: i }),
        isNeedAuth: !0,
        notShowLoading: !0,
        onload: n || this.__onGetAppealStatus._$bind(this),
        onerror: a || this.__onGetAppealStatusError._$bind(this),
      });
    };
    a.__onGetAppealStatus = function (e) {
      this._$dispatchEvent('onGetAppealStatus', e);
    };
    a.__onGetAppealStatusError = function (e) {
      this._$dispatchEvent('onGetAppealStatusError', e);
    };
    a._$submitAppeal = function (t, i, n, a, o) {
      e._$request({
        url: '/mm-tiku/web/j/mocCertScoreAppealBean.submitAppeal.rpc',
        method: 'POST',
        data: JSON.stringify({ bizType: t, bizId: i, appealReason: n }),
        isNeedAuth: !0,
        onload: a || this.__onSubmitAppeal._$bind(this),
        onerror: o || this.__onSubmitAppealError._$bind(this),
      });
    };
    a.__onSubmitAppeal = function (e) {
      this._$dispatchEvent('onSubmitAppeal', e);
    };
    a.__onSubmitAppealError = function (e) {
      this._$dispatchEvent('onSubmitAppealError', e);
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
EDU(
  'e529c28cec1f23f81b7d9f013fb674ee',
  function () {
    var e = NEJ.P('nej.e'),
      t = NEJ.P('nej.u'),
      i = NEJ.P('nej.v'),
      n = NEJ.P('edu.u'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.d');
    var s = 6;
    var r = { 10: '申诉已提交', 20: '申诉处理中', 30: '申诉已处理', 40: '申诉已撤销' };
    var c = function (e, t, i, n, a, o) {
      if (!(1 !== Number(i) || Number(n) <= 0 || Number(a) <= 0) && window.DATracker)
        window.DATracker.track(e, {
          actionId: t,
          label: '-',
          user_id: o || '',
          term_id: n,
          exam_id: a,
        });
    };
    var d = function (e, t) {
      if ('string' == typeof e) return e || t;
      else return (e && (e.message || e.msg)) || t;
    };
    var _ = function (e) {
      e.__canAppeal = !1;
      e.__entryNode.textContent = '';
      e.__entryNode.disabled = !0;
      e.__entryNode.style.display = 'none';
      e.__statusNode.innerHTML = '';
    };
    var l = function (e, t, i) {
      var n = e.__entryNode.style;
      e.__canAppeal = i;
      e.__entryNode.textContent = t;
      e.__entryNode.disabled = !i;
      n.display = 'inline-block';
      n.boxSizing = 'border-box';
      n.height = '32px';
      n.padding = '0 20px';
      n.fontSize = '14px';
      n.lineHeight = '30px';
      n.borderRadius = '16px';
      n.color = i ? '#00c77b' : '#999';
      n.backgroundColor = i ? '#fff' : '#f5f5f5';
      n.border = '1px solid ' + (i ? '#00c77b' : '#d9d9d9');
      n.cursor = i ? 'pointer' : 'not-allowed';
      e.__statusNode.innerHTML = '';
      if (!e.__appealViewTracked) {
        c(
          '考试作答页-申诉入口-展示',
          'Web_item_view',
          e.__bizType,
          window.termDto && window.termDto.id,
          e.__bizId,
          e.__userId,
        );
        e.__appealViewTracked = !0;
      }
    };
    n._$$ScoreAppealUI = NEJ.C();
    var h = n._$$ScoreAppealUI._$extend(n._$$UIBase, !0);
    h.__initXGui = function () {
      this.__seed_html = e._$addNodeTemplate(
        e._$getHtmlTemplate('jst-edu-scoreAppeal', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    h.__initNode = function () {
      this.__supInitNode();
      this.__entryNode = e._$getByClassName(this.__body, 'j-scoreAppealEntry')[0];
      this.__statusNode = e._$getByClassName(this.__body, 'j-scoreAppealStatus')[0];
      this.__cache = new o._$$COM_Cache_ScoreAppealCache();
      this.__cache._$addEvent('onGetAppealStatus', this.__onStatus._$bind(this));
      this.__cache._$addEvent('onGetAppealStatusError', this.__onStatusError._$bind(this));
      this.__cache._$addEvent('onSubmitAppeal', this.__onSubmit._$bind(this));
      this.__cache._$addEvent('onSubmitAppealError', this.__onSubmitError._$bind(this));
      i._$addEvent(this.__entryNode, 'click', this.__submit._$bind(this));
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__bizType = e.bizType;
      this.__bizId = e.bizId;
      this.__userId = e.userId;
      this.__examType = e.examType;
      this.__hasSubjective = !!e.hasSubjective;
      this.__submitting = !1;
      this.__canAppeal = !1;
      this.__appealStatusRequested = !1;
      this.__appealViewTracked = !1;
      this.__entryNode.style.display = 'none';
      this.__statusNode.innerHTML = '';
      if (Number(this.__examType) !== s) this.__tryGetAppealStatus();
    };
    h.__tryGetAppealStatus = function () {
      var e = window.certificationRightsDto || {};
      var t = e.rightsType > 0 && e.rightsEndTime > +new Date();
      if (
        !this.__appealStatusRequested &&
        this.__hasSubjective &&
        this.__bizId &&
        1 == e.certified &&
        t
      ) {
        this.__appealStatusRequested = !0;
        this.__cache._$getAppealStatus(this.__bizType, this.__bizId);
      }
    };
    h._$setHasSubjective = function (e) {
      this.__hasSubjective = !!e;
      if (this.__hasSubjective) this.__tryGetAppealStatus();
      else {
        this.__entryNode.style.display = 'none';
        this.__statusNode.innerHTML = '';
      }
    };
    h.__onStatus = function (e) {
      var t = (e && e.result) || e || {};
      this.__status = t;
      if (this.__hasSubjective)
        if (t.status && r[t.status]) l(this, r[t.status], !1);
        else if (t.canAppeal) l(this, '申诉', !0);
        else _(this);
    };
    h.__onStatusError = function (e) {
      _(this);
      n._$$CommonDialog._$showDialog({ type: 1, message: d(e, '申诉状态获取失败，请刷新重试') });
    };
    h.__submit = function () {
      if (!this.__submitting && this.__canAppeal) {
        c(
          '考试作答页-申诉-点击',
          'Web_item_click',
          this.__bizType,
          window.termDto && window.termDto.id,
          this.__bizId,
          this.__userId,
        );
        this.__showDialog();
      }
    };
    h.__showDialog = function () {
      var t = document.createElement('div');
      t.style.cssText =
        'position:fixed;left:0;top:0;right:0;bottom:0;z-index:10000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;';
      var n = document.createElement('div');
      n.style.cssText = 'width:460px;background:#fff;padding:20px;box-sizing:border-box;';
      n.innerHTML =
        '<h3 style="margin:0 0 12px;font-size:16px">成绩申诉</h3><textarea class="j-appealReason" maxlength="2000" placeholder="请输入申诉理由" style="width:100%;height:120px;box-sizing:border-box;padding:8px"></textarea><div style="margin-top:12px;text-align:right"><button class="j-appealCancel" style="margin-right:8px">取消</button><button class="j-appealSubmit">提交申诉</button></div>';
      t.appendChild(n);
      document.body.appendChild(t);
      var a = e._$getByClassName(n, 'j-appealReason')[0];
      i._$addEvent(e._$getByClassName(n, 'j-appealCancel')[0], 'click', function () {
        document.body.removeChild(t);
      });
      i._$addEvent(
        e._$getByClassName(n, 'j-appealSubmit')[0],
        'click',
        function () {
          c(
            '考试作答页-申诉理由提交按钮-点击',
            'Web_item_click',
            this.__bizType,
            window.termDto && window.termDto.id,
            this.__bizId,
            this.__userId,
          );
          var e = (a.value || '').replace(/^\s+|\s+$/g, '');
          if (e) {
            document.body.removeChild(t);
            this.__submitting = !0;
            this.__entryNode.disabled = !0;
            this.__cache._$submitAppeal(this.__bizType, this.__bizId, e);
          } else window.alert('请输入申诉理由');
        }._$bind(this),
      );
    };
    h.__onSubmit = function (e) {
      this.__submitting = !1;
      this.__entryNode.disabled = !1;
      this.__onStatus(e);
      this.__cache._$getAppealStatus(this.__bizType, this.__bizId);
    };
    h.__onSubmitError = function (e) {
      this.__submitting = !1;
      this.__entryNode.disabled = !this.__canAppeal;
      n._$$CommonDialog._$showDialog({ type: 1, message: d(e, '申诉提交失败，请重试') });
    };
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '89b93e863cc28cb6585df6be96082031',
);
EDU(
  'a47b2c0cab4dd88c835ce58eb65de115',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('edu.d'),
      d,
      _;
    a._$$LearnQuizScore = NEJ.C();
    d = a._$$LearnQuizScore._$extend(a._$$ObjectiveScoreBase, !0);
    _ = a._$$LearnQuizScore._$supro;
    d.__getXhtml = function () {
      return n._$getHtmlTemplate(
        'jst-edu-learnQuizScore',
        s._$merge(
          { backTxt: window.moocConfig.lang.KEY_LEARN_RETURN, showDoAgain: !0 },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
      this.__doAgainNode = n._$getByClassName(this.__body, 'j-doAgain')[0];
      this.__qaForumNode = n._$getByClassName(this.__body, 'j-qaFormLink')[0];
      this.__scoreAppealHolder = n._$getByClassName(this.__body, 'j-scoreAppealHolder')[0];
      if (this.__scoreAppealHolder)
        this.__scoreAppealUI = o._$$ScoreAppealUI._$allocate({ parent: this.__scoreAppealHolder });
      if (this.__qaForumNode)
        this.__qaForumNode.href = '#' + o.umi('learnForumTopic') + '?fid=' + e.quizForumId;
      r._$addEvent(
        this.__backNode,
        'click',
        function () {
          o._$goBack(o.umi('learnTestList'));
        }._$bind(this),
      );
      r._$addEvent(
        this.__doAgainNode,
        'click',
        function () {
          e.dispatcher._$redirect(o.umi('learnQuiz') + '?id=' + this.__testId);
        }._$bind(this),
      );
    };
    d.__buildBaseData = function (e) {
      _.__buildBaseData.apply(this, arguments);
      if (this.__invalidScore)
        this.__warnTip.innerHTML = window.moocConfig.lang.KEY_LEARN_YOU_SUBMISSION_SELFEARNING;
    };
    d.__onBuildQuizAnalysis = function (e) {
      _.__onBuildQuizAnalysis.apply(this, arguments);
      if (this.__scoreAppealUI)
        this.__scoreAppealUI._$setHasSubjective(
          !!(e && e.subjectiveQList && e.subjectiveQList.length),
        );
    };
    d.__onRefresh = function (e) {
      this.__supOnRefresh(e);
      if (this.__scoreAppealUI) {
        var t = o._$getWebUser();
        this.__scoreAppealUI._$reset({
          bizType: 2,
          bizId: e.param.id,
          userId: t ? t.id : '',
          hasSubjective: !1,
        });
      }
    };
    e.dispatcher._$loaded(o.umi('learnQuizScore'), a._$$LearnQuizScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'ea133e51ffbd943e2a04b21cb3716cd7',
  'bf8d09e46d2369efd6e41b29fe211330',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'e529c28cec1f23f81b7d9f013fb674ee',
);
EDU(
  'af2bf5967458d94b196e5d5a47d6bc4c',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$HwInfoItem = NEJ.C();
    r = o._$$HwInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-hwInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__phaseNodes = n._$getByClassName(this.__body, 'j-phase');
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__judgeTypeNode = n._$getByClassName(this.__body, 'j-judgeType')[0];
      this.__judgeTipNode = n._$getByClassName(this.__body, 'j-judgetip')[0];
      this.__evalStartTimeNode = n._$getByClassName(this.__body, 'j-evalStart')[0];
      this.__evalEndTimeNode = n._$getByClassName(this.__body, 'j-evalEnd')[0];
      this.__publishTimeNode = n._$getByClassName(this.__body, 'j-publishTime')[0];
      this.__descriptionNode = n._$getByClassName(this.__body, 'j-description')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__hwInfoVo = e.hwInfoVo || {};
      this.__submitTimeNode.innerText =
        window.moocConfig.lang.KEY_LEARN_DEADLINE1 + o._$formatCommonTime(this.__hwInfoVo.deadline);
      this.__publishTimeNode.innerText =
        window.moocConfig.lang.KEY_LEARN_PUBLISH_TIME +
        o._$formatCommonTime(this.__hwInfoVo.evaluateScoreReleaseTime);
      this.__judgeTypeNode.innerText = o._$getEvJudgeStr(this.__hwInfoVo.evaluateJudgeType);
      this.__descriptionNode.innerText = this.__hwInfoVo.description;
      if (o.CONST.JUDGE_TYPE_EVALUATE == this.__hwInfoVo.evaluateJudgeType) {
        o._$showNode(this.__evalStartTimeNode);
        o._$showNode(this.__evalEndTimeNode);
        o._$showNode(this.__judgeTipNode);
        this.__evalStartTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_STARTS +
          o._$formatCommonTime(this.__hwInfoVo.evaluateStart);
        this.__evalEndTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_DEADLINE1 +
          o._$formatCommonTime(this.__hwInfoVo.evaluateEnd);
      } else {
        o._$hiddenNode(this.__judgeTipNode);
        o._$hiddenNode(this.__evalStartTimeNode);
        o._$hiddenNode(this.__evalEndTimeNode);
      }
      this.__handleCurrentPhase();
    };
    r.__handleCurrentPhase = function () {
      s._$forEach(this.__phaseNodes, function (e, t) {
        n._$delClassName(e, 'current');
      });
      var e = o._$currentEvaluatePhase(this.__hwInfoVo);
      switch (e) {
        case o.CONST.HW_PHASE_SUBMIT:
          n._$addClassName(this.__phaseNodes[0], 'current');
          break;
        case o.CONST.HW_PHASE_EVALUATION:
          n._$addClassName(this.__phaseNodes[1], 'current');
          break;
        case o.CONST.HW_PHASE_SCORE:
          n._$addClassName(this.__phaseNodes[2], 'current');
      }
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '28c5022e9cbc3e7118214389b7ecdf19',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    var c = n._$pushCSSText(
      '        .#<uispace> {margin-bottom:20px;}        .#<uispace> .ansul{margin-top:10px;border:1px solid #DDD;border-bottom:none;overflow:hidden;border-radius:8px;}        .#<uispace> .ansul li{border-bottom:1px solid #DDD;height:48px;}        .#<uispace> .ansul li.hd{background-color:#F8F8F8;color:#333333;font-weight:600;font-size:14px}        .#<uispace> .ansul li.max{background-color:#FEFFD1; color:#FF9200; }        .#<uispace> .ansul li .col{height:100%;line-height:48px;margin-left:16px;}        .#<uispace> .ansul li .col1{width:14%;}        .#<uispace> .ansul li .col2{width:45%;}        .#<uispace> .ansul li .col3{width:14%;}        .#<uispace> .ansul li .col4{width:14%;border-right:none;}        ',
    );
    var d = n._$addHtmlTemplate(
      '<div>       \t  <div>${lang.KEY_LEARN_VAILD_SCORES}</div>       \t <ul class="ansul j-ansul"></ul>       </div>',
    );
    o._$$UserQuizDoneList = NEJ.C();
    r = o._$$UserQuizDoneList._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate(d, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__ansulNode = n._$getByClassName(this.__body, 'j-ansul')[0];
    };
    r.__initScoreLock = function () {
      this.__validLockScoreContainer = n._$getByClassName(
        this.__body,
        'j-validLockScore-container',
      )[0];
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      if (window.renderReactComponent && window.renderReactComponent['LearnScoreLockBtn']) {
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__validLockScoreContainer);
        var e = window.renderReactComponent['LearnScoreLockBtn'];
        window.renderReactComponent.render(
          e.component,
          e.initialState,
          this.__validLockScoreContainer,
        );
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'LearnScoreLockBtn', container: this.__validLockScoreContainer },
          { termId: window.termDto && window.termDto.termId, showFreeLearnBtn: !1 },
        );
    };
    r.__reset = function (e) {
      this.__supReset(e);
      var t =
          '<li class="f-cb hd"><div class="f-fl col col1">' +
          window.moocConfig.lang.KEY_LEARN_TIMES_TIMES +
          '</div><div class="f-fl col col2">' +
          window.moocConfig.lang.KEY_LEARN_TEST_TIME +
          '</div><div class="f-fl col col3">' +
          window.moocConfig.lang.KEY_LEARN_SCORE +
          '</div><div class="f-fl col col4">' +
          window.moocConfig.lang.KEY_LEARN_OPERATING +
          '</div></li>',
        i = -1,
        n = 0,
        a = (e.ansformInfoList && e.ansformInfoList.length && e.ansformInfoList.length - 1) || 0,
        r = '（' + window.moocConfig.lang.KEY_LEARN_FINALLY + '）',
        c = -1,
        d =
          e.quizInfo && 'undefined' != typeof e.quizInfo.effectScoreRule
            ? e.quizInfo.effectScoreRule
            : o.CONST.QUIZ_SCORE_TYPE_AVG;
      switch (d) {
        case o.CONST.QUIZ_SCORE_TYPE_LAST:
          c = a;
          break;
        case o.CONST.QUIZ_SCORE_TYPE_BEST:
          s._$forEach(e.ansformInfoList, function (e, t) {
            if (e.score > n) {
              n = e.score;
              i = t;
            }
          });
          c = i;
          break;
        default:
          c = -1;
      }
      s._$forEach(
        e.ansformInfoList,
        function (e, i) {
          t +=
            '<li class="f-cb' +
            (c == i ? ' max' : '') +
            '"><div class="f-fl col col1">' +
            (i + 1) +
            '</div><div class="f-fl col col2">' +
            o._$formatCommonTime(e.submitTime) +
            '</div><div class="f-fl col col3">' +
            (1 == window.shouldHiddenScore
              ? '<span class="j-triggerLockScore"></span>'
              : (e.score || 0).toFixed(2)) +
            (0 == window.shouldHiddenScore && c == i ? r : '') +
            '</div><div class="f-fl col col4"><a target="_blank" href="#' +
            o.umi('learnQuizScore') +
            '?id=' +
            e.tid +
            '&aid=' +
            e.aid +
            '">' +
            window.moocConfig.lang.KEY_LEARN_VIEW +
            '</a></div></li>';
        }._$bind(this),
      );
      this.__ansulNode.innerHTML = t;
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  'bf8d09e46d2369efd6e41b29fe211330',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '048cfc2ff2fa4df108e4e4829cd229b2',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$QuizInfoItem = NEJ.C();
    r = o._$$QuizInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-quizInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__validScoreNode = n._$getByClassName(this.__body, 'j-validScore')[0];
      this.__validLockScoreNode = n._$getByClassName(this.__body, 'j-validLockScore')[0];
      this.__validLockScoreContainer = n._$getByClassName(
        this.__body,
        'j-validLockScore-container',
      )[0];
      this.__scoreTypeNode = n._$getByClassName(this.__body, 'j-scoreType')[0];
      this.__submitCountNode = n._$getByClassName(this.__body, 'j-submitCount')[0];
      this.__descriptionNode = n._$getByClassName(this.__body, 'j-description')[0];
    };
    r.__reset = function (t) {
      this.__supReset(t);
      this.__quizInfoVo = t.quizInfoVo || {};
      this.__submitTimeNode.innerText = o._$formatCommonTime(this.__quizInfoVo.deadline);
      var i = 1 == window.shouldHiddenScore && this.__quizInfoVo.usedTryCount > 0;
      if (i && this.__validLockScoreNode) {
        this.__validLockScoreNode.style.display = 'block';
        var a = n._$getByClassName(this.__body, 'j-validLockScore-total')[0];
        a.innerText = '/' + (this.__quizInfoVo.totalScore || 0).toFixed(2);
        this.__validScoreNode.innerText = '';
      } else {
        this.__validLockScoreNode.style.display = 'none';
        this.__validScoreNode.innerText =
          (this.__quizInfoVo.effectScore || 0).toFixed(2) +
          '/' +
          (this.__quizInfoVo.totalScore || 0).toFixed(2);
      }
      this.__scoreTypeNode.innerText = o._$getQuizValidScoreStr(this.__quizInfoVo.effectScoreRule);
      this.__submitCountNode.innerText =
        (this.__quizInfoVo.usedTryCount || 0) + '/' + (this.__quizInfoVo.totalTryCount || 0);
      this.__descriptionNode.innerText = this.__quizInfoVo.description;
      if (this.__quizInfoVo.ansformInfoList && this.__quizInfoVo.ansformInfoList.length)
        this.__quizDoneListUI = o._$$UserQuizDoneList._$allocate({
          parent: this.__body,
          ansformInfoList: this.__quizInfoVo.ansformInfoList,
          courseLearnUrl:
            e.urlPrefix.courseLearnPrefix +
            e.courseDto.schoolPanel.shortName +
            '-' +
            e.courseDto.id,
          quizInfo: this.__quizInfoVo,
        });
    };
    r.__destroy = function () {
      if (this.__quizDoneListUI)
        this.__quizDoneListUI = o._$$UserQuizDoneList._$recycle(this.__quizDoneListUI);
      this.__supDestroy();
    };
  },
  '28c5022e9cbc3e7118214389b7ecdf19',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU(
  'dc6c0250afa4505abbbce9d9f504c577',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$OjInfoItem = NEJ.C();
    r = o._$$OjInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-OjInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__publishTimeNode = n._$getByClassName(this.__body, 'j-publishTime')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__ojInfoVo = e.ojInfoVo || {};
      this.__submitTimeNode.innerText = o._$formatCommonTime(this.__ojInfoVo.deadline);
      this.__publishTimeNode.innerText = o._$formatCommonTime(
        this.__ojInfoVo.evaluateScoreReleaseTime,
      );
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
EDU(
  '1159ecd0d791cfc03337b9f9188abac0',
  function (e, t) {
    var i = NEJ.O,
      n = NEJ.P('nej.j'),
      a = NEJ.P('nej.u'),
      o = NEJ.P('edu.d'),
      s = a._$randNumberString(),
      r,
      c = 'ck-OJCacheCache';
    o._$$COM_Cache_OJCache = NEJ.C();
    r = o._$$COM_Cache_OJCache._$extend(o._$$COM_Cache);
    r._$getOJPaperInfo = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.getOJPaperInfo',
        param: [e, t, i],
        onload: this.__ongetOJPaperInfo._$bind(this),
      });
    };
    r.__ongetOJPaperInfo = function (e) {
      this._$dispatchEvent('ongetOJPaperInfo', e);
    };
    r._$getOJPaperDto = function (e, t, i) {
      var n = i ? 'MocAdminQuizBean.previewTestDraft' : 'YocOJQuizBean.getOJPaperDto';
      var a = i ? [e] : [e, t];
      this._$postDWR({ key: c + s, url: n, param: a, onload: this.__ongetOJPaperDto._$bind(this) });
    };
    r.__ongetOJPaperDto = function (i) {
      try {
        if (i.subjectiveQList)
          i.subjectiveQList.forEach(function (e) {
            e.description = t._$formateImagePrefix(e.description);
            e.plainTextTitle = t._$formateImagePrefix(e.plainTextTitle);
            e.title = t._$formateImagePrefix(e.title);
          });
      } catch (n) {}
      this._$dispatchEvent('ongetOJPaperDto', i);
      if (
        i.submitStatus == eu.CONST.HW_STATUS_SUBMITTED ||
        (i.deadline && eu._$getCurServerTime() > i.deadline)
      ) {
        window.learnUtilQuestionList = e._$getQuestionList(i);
        e._$renderGLobalAIButton(
          {
            pageType: e._$getPageType(),
            sceneType: e.SCENE_TYPE.QUIZ,
            termId: window.termDto && window.termDto.id,
            courseId: window.courseDto && window.courseDto.id,
            courseName: window.courseDto && window.courseDto.name,
            qid: i.tid,
            questions: learnUtilQuestionList,
          },
          document.querySelector('#j-global-ai-robot'),
        );
      } else {
        var a = document.querySelector('#j-global-ai-robot');
        a && a.classList.add('f-dn');
      }
    };
    r._$submitSingleAnswer = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.submitSingleAnswer',
        param: [e, t, i],
        onload: this.__onsubmitSingleAnswer._$bind(this),
      });
    };
    r.__onsubmitSingleAnswer = function (e) {
      this._$dispatchEvent('onsubmitSingleAnswer', e);
    };
    r._$getThreadStatusByThreadId = function (e, t) {
      this._$postDWR({
        key: c + s,
        notShowLoading: !0,
        url: 'YocOJQuizBean.getThreadStatusByThreadId',
        param: [e, t],
        onload: this.__ongetThreadStatusByThreadId._$bind(this),
      });
    };
    r.__ongetThreadStatusByThreadId = function (e) {
      this._$dispatchEvent('ongetThreadStatusByThreadId', e);
    };
    r._$getOJPaperInfo = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.getOJPaperInfo',
        param: [e, t, i],
        onload: this.__ongetOJPaperInfo._$bind(this),
      });
    };
    r.__ongetOJPaperInfo = function (e) {
      this._$dispatchEvent('ongetOJPaperInfo', e);
    };
    r._$getOjSubmitRecords = function (e, t) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.getOjQuestionSubmitRecords',
        param: [e, t],
        onload: this.__ongetOjSubmitRecords._$bind(this),
      });
    };
    r.__ongetOjSubmitRecords = function (e) {
      this._$dispatchEvent('ongetOjSubmitRecords', e);
    };
    r._$adminGetOjSubmitRecords = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.adminGetOjQuestionSubmitRecords',
        param: [e, t, i],
        onload: this.__ongetOjSubmitRecords._$bind(this),
      });
    };
    r.__onadminGetOjSubmitRecords = function (e) {
      this._$dispatchEvent('onadminGetOjSubmitRecords', e);
    };
    r._$submitOjPaper = function (e) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.submitOjPaper',
        param: [e],
        onload: this.__onsubmitOjPaper._$bind(this),
      });
    };
    r.__onsubmitOjPaper = function (e) {
      this._$dispatchEvent('onsubmitOjPaper', e);
    };
    r._$submitPreviewSingleAnswer = function (e, t) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.submitPreviewSingleAnswer',
        param: [e, t],
        onload: this.__onsubmitPreviewSingleAnswer._$bind(this),
      });
    };
    r.__onsubmitPreviewSingleAnswer = function (e) {
      this._$dispatchEvent('onsubmitPreviewSingleAnswer', e);
    };
    r._$viewOJData = function (e, t, i) {
      this._$postDWR({
        key: c + s,
        url: 'YocOJQuizBean.viewOJData',
        param: [e, t, !i],
        onload: this.__onviewOJData._$bind(this, i),
      });
    };
    r.__onviewOJData = function (e, t) {
      this._$dispatchEvent('onviewOJData', t, e);
    };
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '90f346889e20579d29ccd3fc01873f10',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    s._$$QuizHwListItem = NEJ.C();
    c = s._$$QuizHwListItem._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-quizHwListItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = n._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__upNode = n._$getByClassName(this.__body, 'j-up')[0];
      this.__downNode = n._$getByClassName(this.__body, 'j-down')[0];
      this.__noContent = n._$getByClassName(this.__body, 'j-noContent')[0];
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__validScoreNode = n._$getByClassName(this.__body, 'j-validScore')[0];
      this.__validLockScoreNode = n._$getByClassName(this.__body, 'j-validLockScore')[0];
      this.__validLockScoreContainer = n._$getByClassName(
        this.__body,
        'j-validLockScore-container',
      )[0];
      this.__quizBtn = n._$getByClassName(this.__body, 'j-quizBtn')[0];
      this.__detailBox = n._$getByClassName(this.__body, 'j-detail')[0];
      this.__previewStatusNode = n._$getByClassName(this.__body, 'j-previewStatus')[0];
      a._$addEvent(this.__quizBtn, 'click', this.__quizHwClickHandle._$bind(this));
      a._$addEvent(
        this.__titleBox,
        'click',
        function (e) {
          this.__showUpDownMode(!this.__downStatus, e);
        }._$bind(this),
      );
      this.__quizCache = new o._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetOpenQuizInfo', this.__onGetQuizInfo._$bind(this));
      this.__homeworkCache = new o._$$COM_Cache_HomeworkCache();
      this.__homeworkCache._$addEvent(
        'onGetOpenHomeworkInfo',
        this.__onGetHomeworkInfo._$bind(this),
      );
      this.__ojCache = new o._$$COM_Cache_OJCache();
      this.__ojCache._$addEvent('ongetOJPaperInfo', this.__ongetOJPaperInfo._$bind(this));
    };
    c.__onGetQuizInfo = function (e) {
      if (this.__quizInfoUI) this.__quizInfoUI = s._$$QuizInfoItem._$recycle(this.__quizInfoUI);
      this.__quizInfoUI = s._$$QuizInfoItem._$allocate({ parent: this.__detailBox, quizInfoVo: e });
      this.__handleTriagleStatus(!0);
    };
    c.__onGetHomeworkInfo = function (e) {
      this.__hwInfoUI = s._$$HwInfoItem._$allocate({ parent: this.__detailBox, hwInfoVo: e });
      this.__handleTriagleStatus(!0);
    };
    c.__ongetOJPaperInfo = function (e) {
      this.__ojInfoUI = s._$$OjInfoItem._$allocate({ parent: this.__detailBox, ojInfoVo: e });
      this.__handleTriagleStatus(!0);
    };
    c.__handleTriagleStatus = function (e) {
      s._$hiddenNode(this.__upNode);
      s._$hiddenNode(this.__downNode);
      s._$hiddenNode(this.__noContent);
      this.__downStatus = !!e;
      if (this.__downStatus) {
        s._$showNode(this.__downNode);
        n._$addClassName(this.__body, 'down');
      } else {
        s._$showNode(this.__upNode);
        n._$delClassName(this.__body, 'down');
        this.__clearUIs();
      }
    };
    c.__showUpDownMode = function (t, i) {
      s._$hiddenNode(this.__upNode);
      s._$hiddenNode(this.__downNode);
      s._$showNode(this.__noContent);
      var n = !!e.isPreview && this.__lessonVo.testDraftStatus == s.CONST.CHAPTERSTATUS_DELETED;
      if (!n && this.__lessonVo.test.id) {
        s._$showNode(this.__quizBtn);
        if (t)
          switch (this.__lessonVo.contentType) {
            case s.CONST.LESSON_TYPE_QUIZ:
              this.__quizCache._$getOpenQuizInfo(
                this.__lessonVo.test.id,
                null,
                !!e.isPreview,
                e.appId,
              );
              break;
            case s.CONST.LESSON_TYPE_HOMEWORK:
              if (this.__lessonVo.test.type == s.CONST.TYPE_SUBJECTIVE_OJ)
                this.__ojCache._$getOJPaperInfo(this.__lessonVo.test.id, null, !!e.isPreview);
              else
                this.__homeworkCache._$getOpenHomeworkInfo(
                  this.__lessonVo.test.id,
                  null,
                  !!e.isPreview,
                  e.appId,
                );
          }
        else this.__handleTriagleStatus(!1);
      } else {
        s._$hiddenNode(this.__quizBtn);
        if (i) {
          var a =
            this.__lessonVo.contentType == s.CONST.LESSON_TYPE_QUIZ
              ? window.moocConfig.lang.KEY_LEARN_TEST
              : window.moocConfig.lang.KEY_LEARN_ASSIGNMENT;
          var o = n
            ? a + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
            : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
              a +
              window.moocConfig.lang.KEY_LEARN_CONTENT;
          s._$$CommonDialog._$showDialog({ type: 1, message: o, modal: !0 });
        }
      }
    };
    c.__quizHwClickHandle = function (t) {
      a._$stop(t);
      var i = '';
      switch (this.__lessonVo.contentType) {
        case s.CONST.LESSON_TYPE_QUIZ:
          s._$trackEvent(
            'quizItem',
            'click',
            window.moocConfig.lang.KEY_LEARN_CLICK_ENTER_QUIZ + 'id:' + this.__lessonVo.test.id,
          );
          i = s.umi('learnQuiz') + '?id=' + this.__lessonVo.test.id;
          break;
        case s.CONST.LESSON_TYPE_HOMEWORK:
          s._$trackEvent(
            'homeItem',
            'click',
            window.moocConfig.lang.KEY_LEARN_CLICK_ASSIGNMENT + 'id:' + this.__lessonVo.test.id,
          );
          if (this.__lessonVo.test.type == s.CONST.TYPE_SUBJECTIVE_OJ)
            i = s.umi('learnOJHomework') + '?id=' + this.__lessonVo.test.id;
          else i = s.umi('learnHomework') + '?id=' + this.__lessonVo.test.id;
      }
      e.dispatcher._$redirect(i);
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__lessonVo = t.lessonVo;
      this.__fouceNotDown = t.fouceNotDown || !1;
      this.__lessonVo.test = this.__lessonVo.test || {};
      this.__nameNode.innerText = this.__lessonVo.test.name || this.__lessonVo.name;
      this.__submitTimeNode.innerText =
        window.moocConfig.lang.KEY_LEARN_DEADLINE1 +
        s._$formatCommonTime(this.__lessonVo.test.deadline);
      this.__validScoreNode.innerText = '';
      var i = 1 == window.shouldHiddenScore;
      switch (this.__lessonVo.contentType) {
        case s.CONST.LESSON_TYPE_QUIZ:
          this.__quizBtn.innerText = window.moocConfig.lang.KEY_LEARN_GO_QUIZ;
          if (null != this.__lessonVo.test.userScore)
            if (i)
              this.__validScoreNode.innerHTML =
                window.moocConfig.lang.KEY_LEARN_QUIZ_SCORE +
                '<span class="j-triggerLockScore"></span>';
            else
              this.__validScoreNode.innerText =
                window.moocConfig.lang.KEY_LEARN_QUIZ_SCORE +
                (this.__lessonVo.test.userScore + this.__lessonVo.test.bonusScore).toFixed(2) +
                window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
          break;
        case s.CONST.LESSON_TYPE_HOMEWORK:
          this.__quizBtn.innerText = window.moocConfig.lang.KEY_LEARN_GO_ASSIGNMENT;
          if (
            null != this.__lessonVo.test.userScore &&
            s._$getCurServerTime() >= this.__lessonVo.test.evaluateScoreReleaseTime &&
            this.__lessonVo.test.scorePubStatus == s.CONST.SCORE_PUB_STATUS_CONFIRMED
          )
            if (i)
              this.__validScoreNode.innerHTML =
                window.moocConfig.lang.KEY_LEARN_ASSIGNMENT_SCORE +
                '<span class="j-triggerLockScore"></span>';
            else
              this.__validScoreNode.innerText =
                window.moocConfig.lang.KEY_LEARN_ASSIGNMENT_SCORE +
                this.__lessonVo.test.userScore.toFixed(2) +
                window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      }
      var n = s._$getCurServerTime();
      if (this.__fouceNotDown) this.__showUpDownMode(!1);
      else
        this.__showUpDownMode(
          n >= this.__lessonVo.test.releaseTime &&
            (n <= this.__lessonVo.test.evaluateScoreReleaseTime ||
              n <= this.__lessonVo.test.deadline),
        );
      if (e.isPreview && !e.isReview) {
        var a =
          this.__lessonVo.testDraftStatus == s.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__lessonVo.testDraftStatus == s.CONST.CHAPTERSTATUS_MODIFIED;
        var o = window.webUser.roles || [];
        this.__previewStatusUI = s._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__lessonVo,
          type: this.__lessonVo.contentType,
          hidePublish: a || !!t.syncMooc || o.includes(s.CONST.ROLE_REGION_ADMIN),
        });
      }
    };
    c.__clearUIs = function () {
      if (this.__quizInfoUI) this.__quizInfoUI = s._$$QuizInfoItem._$recycle(this.__quizInfoUI);
      if (this.__hwInfoUI) this.__hwInfoUI = s._$$HwInfoItem._$recycle(this.__hwInfoUI);
      if (this.__ojInfoUI) this.__ojInfoUI = s._$$OjInfoItem._$recycle(this.__ojInfoUI);
    };
    c.__destroy = function () {
      this.__clearUIs();
      if (this.__previewStatusUI)
        this.__previewStatusUI = s._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  'af2bf5967458d94b196e5d5a47d6bc4c',
  '048cfc2ff2fa4df108e4e4829cd229b2',
  'dc6c0250afa4505abbbce9d9f504c577',
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '2c666a1ceb412082b906b11b0948dedf',
  '9404c0406a53242cb88cc30ecf858b38',
  '1159ecd0d791cfc03337b9f9188abac0',
  '94ec8a8dfa596967c090fc2c92487692',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '8ae840c9adc0658d1ccc470adbfacf62',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ChapterQuizHwItem = NEJ.C();
    r = o._$$ChapterQuizHwItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-learnChapterQuizHwItem', {
          lang: (window.moocConfig || {}).lang || {},
        }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = n._$getByClassName(this.__body, 'j-titleName')[0];
    };
    r.__mergeQuizHW = function (e) {
      this.__chapterVo = e;
      this.__chapterVo.quizs = this.__chapterVo.quizs || [];
      var t = this.__chapterVo.quizs.concat(this.__chapterVo.homeworks || []);
      this.__chapterVo.mergeQuizHw = t;
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__mergeQuizHW(e.chapterVo);
      this.__nameNode.innerText = this.__chapterVo.name || '';
      this.__quizHwItemUIs = [];
      var t = this.__chapterVo.mergeQuizHw.length;
      var i = o._$getCurServerTime();
      this.donwAmount = 0;
      this.fouceNotDown = !1;
      s._$forEach(
        this.__chapterVo.mergeQuizHw.sort(function (e, t) {
          return e.position - t.position;
        }),
        function (n, a) {
          if (this.__chapterVo.mergeQuizHw.length > 1) {
            try {
              var s =
                i >= n.test.releaseTime &&
                (i <= n.test.evaluateScoreReleaseTime || i <= n.test.deadline);
              if (s) this.donwAmount++;
            } catch (r) {}
            if (this.donwAmount > 1) this.fouceNotDown = !0;
          }
          var c = o._$$QuizHwListItem._$allocate({
            parent: this.__body,
            lessonVo: n,
            clazz: a == t - 1 ? 'last' : '',
            syncMooc: e.syncMooc,
            fouceNotDown: this.fouceNotDown,
          });
          this.__quizHwItemUIs.push(c);
        }._$bind(this),
      );
    };
    r.__clearUIs = function () {
      s._$forEach(
        this.__quizHwItemUIs,
        function (e, t) {
          e = o._$$QuizHwListItem._$recycle(e);
        }._$bind(this),
      );
      this.__quizHwItemUIs = null;
    };
    r.__destroy = function () {
      this.__clearUIs();
      this.__supDestroy();
    };
  },
  '90f346889e20579d29ccd3fc01873f10',
  '93828627ddb358ed890cb65967a0c1de',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '5467e62f9605c8141f35bd317120d5c3',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ChapterQuizHwList = NEJ.C();
    r = o._$$ChapterQuizHwList._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-learnChapterQuizHwList', {
          lang: (window.moocConfig || {}).lang || {},
        }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__termVo = e.termVo || {};
      o._$hiddenNode(this.__emptyNode);
      var t = 0;
      this.__chapterQuizHwItemUIs = [];
      s._$forEach(
        this.__termVo.chapters,
        function (i, n) {
          if ((i.quizs && i.quizs.length) || (i.homeworks && i.homeworks.length)) {
            t++;
            var a = o._$$ChapterQuizHwItem._$allocate({
              parent: this.__body,
              chapterVo: i,
              syncMooc: e.syncMooc,
            });
            this.__chapterQuizHwItemUIs.push(a);
          }
        }._$bind(this),
      );
      if (t) o._$hiddenNode(this.__emptyNode);
      else o._$showNode(this.__emptyNode);
    };
    r.__destroy = function () {
      s._$forEach(
        this.__chapterQuizHwItemUIs,
        function (e, t) {
          e = o._$$ChapterQuizHwItem._$recycle(e);
        }._$bind(this),
      );
      this.__chapterQuizHwItemUIs = null;
      this.__supDestroy();
    };
  },
  '8ae840c9adc0658d1ccc470adbfacf62',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  'ff4149f7543351eae8b1de784f4f6b6f',
  function () {
    var e = window,
      t = NEJ.P('nej.e'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.m'),
      a = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      s,
      r;
    n._$$LearnTestList = NEJ.C();
    s = n._$$LearnTestList._$extend(n._$$Module, !0);
    r = n._$$LearnTestList._$supro;
    s.__init = function (e) {
      console.log('__proLearnTestList __init', e);
      this.__parentNode = e.parent;
      r.__supInit.apply(this, arguments);
    };
    s.__getXhtml = function () {
      return t._$getHtmlTemplate('jst-edu-learnTest', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    s.__getParent = function () {
      return this.__parentNode ? this.__parentNode : t._$get('courseLearn-inner-box');
    };
    s.__buildFuncPoints = function () {
      r.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = t._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__googleNode = t._$getByClassName(this.__body, 'j-google-course-cert')[0];
      this.__moduleTitle = t._$getByClassName(this.__body, 'u-learn-moduletitle')[0];
      this.__contentCache = new a._$$COM_Cache_CourseCtCache();
      this.__courseCache = new a._$$COM_Cache_CourseCache();
      this.__contentCache._$addEvent('onGetChapterList', this.__onGetChapterList._$bind(this));
      this.__courseCache._$addEvent('onCheckTermLearn', this.__onCheckTermLearnCb._$bind(this));
      this.__chapterQuizHwListUIs = [];
    };
    s.__onCheckTermLearnCb = function (t) {
      if (t >= 0) {
        r.__onShow.apply(this, arguments);
        this.__onRefresh(this.__onShowOptions);
      } else if (!e.isNeedOpenCloseTerm)
        e.dispatcher._$redirect(o.umi('notEnroll') + '?from=homework');
    };
    s.__onGetChapterList = function (t) {
      this.__termInfoData = t || {};
      if (this._chapterQuizHwListUI && !this.__splitUI)
        o._$$ChapterQuizHwList._$recycle(this._chapterQuizHwListUI);
      var i;
      this._chapterQuizHwListUI = i = o._$$ChapterQuizHwList._$allocate({
        parent: this.__body,
        termVo: this.__termInfoData.mocTermDto,
        syncMooc: !!this.__splitUI,
      });
      this.__chapterQuizHwListUIs.push(i);
      if (e.isNeedOpenCloseTerm) r.__onShow.apply(this, arguments);
      if (o._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = o._$$SpocMoocSplit._$allocate({ parent: this.__body });
        this.__getChapterList(e.moocTermDto.id);
      }
    };
    s.__onShow = function (i) {
      if (e.isPreview) {
        this.__onShowOptions = i;
        r.__onShow.apply(this, arguments);
        this.__moduleNameNode.innerText = e.learnBigTabNames && e.learnBigTabNames[i.target];
        this.__onRefresh(this.__onShowOptions);
      } else {
        if (!e.isNeedOpenCloseTerm)
          if (!e.webUser) {
            e.dispatcher._$redirect(o.umi('notEnroll') + '?from=homework');
            return;
          }
        this.__onShowOptions = i;
        if (e.webUser) this.__courseCache._$CheckTermLearn(e.termDto.id);
        if (!i.parent)
          this.__moduleNameNode.innerText = e.learnBigTabNames && e.learnBigTabNames[i.target];
        if (i.parent) t._$addClassName(this.__moduleTitle, 'f-dn');
        if (e.isNeedOpenCloseTerm) this.__onRefresh(this.__onShowOptions);
      }
    };
    s.__onRefresh = function () {
      r.__onRefresh.apply(this, arguments);
      if (window.googleCourse) {
        var t = { termId: e.termDto.id, googleCourseLink: e.googleCourseLink };
        var i = window.renderReactComponent && window.renderReactComponent['GoogleCourseBtn'];
        if (i) i.render(t);
        else
          window.reactComponentLoadBootstrap.init(
            { name: 'GoogleCourseBtn', container: this.__googleNode },
            t,
          );
      }
      this.__clearUI();
      this.__getChapterList(e.termDto.id);
    };
    s.__getChapterList = function (t) {
      if (e.isPreview) {
        var i = e.isReview ? 0 : 1;
        this.__contentCache._$getChapterList(t, i, !e.isPreview);
      } else if (e.webUser && 1 == e.isEnroll) this.__contentCache.getLastLearnedMocTermDto(t);
      else {
        i = e.isReview ? 0 : 1;
        this.__contentCache._$getChapterList(t, i, !e.isPreview);
      }
    };
    s.__clearUI = function () {
      i._$forEach(
        this.__chapterQuizHwListUIs,
        function (e) {
          o._$$ChapterQuizHwList._$recycle(e);
        }._$bind(this),
      );
      this.__chapterQuizHwListUIs = [];
      if (this.__splitUI) this.__splitUI = o._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    s.__onHide = function () {
      this.__clearUI();
      this.__termInfoData = null;
      r.__onHide.apply(this, arguments);
      t._$removeByEC(this.__body);
    };
    s.__reset = function (e) {
      if (e.parent) {
        e.parent.appendChild(this.__body);
        s.__onShow.apply(this, arguments);
      } else r.__supReset.apply(this, arguments);
    };
    e.dispatcher._$loaded(o.umi('learnTestList'), n._$$LearnTestList);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '5467e62f9605c8141f35bd317120d5c3',
  'ad72e09e8978dc83423b503971b6294c',
  'adec563fba581ac0f5bf79fb5e990240',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  'bf8d09e46d2369efd6e41b29fe211330',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '8a6e1591b595a108dc0d7c3ecef76bb9',
  function (e) {
    var t = (window.moocConfig || {}).lang || {};
    var i = window,
      n = NEJ.O,
      a = NEJ.F,
      o = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('edu.d'),
      _,
      l = { object: 4, subject: 5, oj: 7 };
    var h = o._$addHtmlTemplate(
      '<div class="m-beforeTest">            <div class="j-baseInfo baseInfo f-f0"></div>            <div class="details">                <p class="important f-f0">${lang.KEY_LEARN_WE_QUESTIONS}</p>                <p>${lang.KEY_LEARN_ON_COMPUTER}<span style="color: #ff3f04">${lang.KEY_LEARN_ON_CHROME}</span>${lang.KEY_LEARN_PUNCTUATION}</p>                <p>${lang.KEY_LEARN_IN_OFF}</p>                <p>${lang.KEY_LEARN_EXAM_CONFIRM}</p>                <p>${lang.KEY_LEARN_REFRESH_EXIT}</p>                <p>${lang.KEY_LEARN_EXAM_NOTIFICATION}</p>                <p style="color: #ff3f04">${lang.KEY_LEARN_ACCORDING_START}</p>                <p style="color: #ff3f04">${lang.KEY_LEARN_NOT_OVER_LINIT}</p>            </div>            <div class="agreeBox f-cb">                <input type="checkbox" id="agreeCheck" class="j-agree f-fl">                <label for="agreeCheck" class="j-agreeCt"></label>            </div>            <a class="u-btn u-btn-primary u-btn-disabled j-startBtn">${lang.KEY_LEARN_START_EXAM}</a>        </div>',
    );
    r._$$ExamProtocolUI = NEJ.C();
    _ = r._$$ExamProtocolUI._$extend(r._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(h, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__baseInfo = o._$getByClassName(this.__body, 'j-baseInfo')[0];
      this.__startBtn = o._$getByClassName(this.__body, 'j-startBtn')[0];
      this.__agreeInput = o._$getByClassName(this.__body, 'j-agree')[0];
      this.__cxTxtNode = o._$getByClassName(this.__body, 'j-agreeCt')[0];
      s._$addEvent(this.__startBtn, 'click', this.__startTestHandleModal._$bind(this));
      s._$addEvent(this.__agreeInput, 'click', this.__checkProtocolHandle._$bind(this));
      this.__tutorialCache = new d._$$COM_Cache_QuizCache();
      this.__tutorialCache._$addEvent(
        'onGetMocMemberTutorialInfo',
        this.__cbGetHonestData._$bind(this),
      );
      this.__courseCache = new d._$$COM_Cache_CourseCache();
      this.__courseCache._$addEvent('onGetAggreement', this.__cbGetAggreement._$bind(this));
    };
    _.__cbGetAggreement = function (e) {
      this.__cxTxtNode.innerHTML = e;
    };
    _.__cbGetHonestData = function (e) {
      this.__agreeInput.checked = !!e[this.__tutorialValue];
      this.__checkProtocolHandle();
    };
    _.__checkProtocolHandle = function () {
      switch (this.__type) {
        case 'object':
          r._$trackEvent(
            'examObjectHonest',
            'click',
            t.KEY_EAXM_AGREEMENT_KGT + !this.__agreeInput.checked,
          );
          break;
        case 'subject':
          r._$trackEvent(
            'examSubjectHonest',
            'click',
            t.KEY_EAXM_AGREEMENT_ZGT + !this.__agreeInput.checked,
          );
          break;
        case 'oj':
          r._$trackEvent(
            'examOjHonest',
            'click',
            t.KEY_EAXM_AGREEMENT_OJ + !this.__agreeInput.checked,
          );
      }
      r._$toggleClassName(!this.__agreeInput.checked, this.__startBtn, 'u-btn-disabled');
    };
    _.__startTestHandleModal = function () {
      console.log('option __isPreventCheating', this.__isPreventCheating);
      if (!o._$hasClassName(this.__startBtn, 'u-btn-disabled'))
        if (this.__isPreventCheating)
          e.alert(
            t.KEY_EAXM_TIP_SWITCH_FD +
              (this.__allowSwitchPageCount || 0) +
              t.KEY_EAXM_TIP_AUTO_SUBMIT,
            t.KEY_EAXM_NOTICE,
          ).$on('ok', this.__startTestHandle._$bind(this));
        else this.__startTestHandle();
    };
    _.__startTestHandle = function () {
      if (!o._$hasClassName(this.__startBtn, 'u-btn-disabled')) {
        if (!i.isPreview && this.__isPreventCheating) {
          var e = [
            'requestFullscreen',
            'mozRequestFullScreen',
            'msRequestFullscreen',
            'webkitRequestFullscreen',
          ];
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (document.body && document.body[n]) {
              document.body[n]();
              break;
            }
          }
        }
        this._$dispatchEvent('onDoingAble');
        this.__tutorialCache._$setTutorialinfo(this.__tutorialValue, 1);
        switch (this.__type) {
          case 'object':
            var a = 'examObjectBegin';
            break;
          case 'subject':
            var a = 'examSubjectBegin';
            break;
          case 'oj':
            var a = 'examOJBegin';
        }
        r._$trackEvent(a, 'click', window.moocConfig.lang.KEY_LEARN_CLICK_EXAM);
      }
    };
    _.__buildBaseInfo = function () {
      var e =
        '<p>' +
        t.KEY_LEARN_THERE_EXAM +
        ' <span><em>' +
        (this.__detailVo.questionCount || 0) +
        '</em></span> ' +
        t.KEY_LEARN_QUESTIONS_SCORE +
        ' <span><em>' +
        (this.__detailVo.totalScore || 0) +
        '</em> </span></p>';
      if (this.__detailVo.duration > 0)
        e +=
          t.KEY_LEARN_TOTAL_DURATION +
          '<span> <em>' +
          this.__detailVo.duration / 60 +
          '</em>' +
          t.KEY_LEARN_MINUTE +
          '</span>';
      this.__baseInfo.innerHTML = e;
    };
    _.__reset = function (e) {
      this.__supReset(e);
      console.log('options', e);
      this.__detailVo = e.data || {};
      this.__type = e.type;
      this.__allowSwitchPageCount = this.__detailVo.allowSwitchPageCount;
      this.__isPreventCheating = !i.isPreview && this.__detailVo.allowSwitchPageCount > 0 ? !0 : !1;
      switch (this.__type) {
        case 'object':
          this.__tutorialValue = r.CONST.MOOC_EXAM_OBJECT_PROTOCAL;
          break;
        case 'subject':
          this.__tutorialValue = r.CONST.MOOC_EXAM_SUBJECT_PROTOCAL;
          break;
        case 'oj':
          this.__tutorialValue = r.CONST.OJ_EXAM_PROTOCAL;
      }
      this.__buildBaseInfo();
      this.__agreeInput.checked = !1;
      this.__courseCache._$getAggreement(l[this.__type]);
      this.__tutorialCache._$getTutorialinfo();
    };
    _.__destroy = function () {
      this.__supDestroy();
    };
  },
  'd414623f7407e577cd6c05efff08e96f',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '2c666a1ceb412082b906b11b0948dedf',
  'adec563fba581ac0f5bf79fb5e990240',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  'e388634ee3841d4f33d839ae4b7dde75',
  function () {
    var e = window.moocConfig.lang;
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('nej.v'),
      d = NEJ.P('edu.d'),
      _,
      l;
    o._$$ExamObjective = NEJ.C();
    _ = o._$$ExamObjective._$extend(o._$$Module, !0);
    l = o._$$ExamObjective._$supro;
    _.__getXhtml = function () {
      return a._$getHtmlTemplate(
        'jst-edu-learnQuiz',
        r._$merge({ showHelp: !1, backTxt: window.moocConfig.lang.KEY_LEARN_RETURN }),
      );
    };
    _.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    _.__buildFuncPoints = function () {
      l.__buildFuncPoints.apply(this, arguments);
      this.__titleNode = a._$getByClassName(this.__body, 'j-title')[0];
      this.__prepareNode = a._$getByClassName(this.__body, 'j-prepare')[0];
      this.__doingNode = a._$getByClassName(this.__body, 'j-doing')[0];
      this.__backNode = a._$getByClassName(this.__body, 'j-backList')[0];
      this.__waitNode = a._$getByClassName(this.__body, 'j-waitForScore')[0];
      c._$addEvent(
        this.__backNode,
        'click',
        function () {
          if (200 === window.learnMode || 300 === window.learnMode)
            window.dispatcher._$redirect(s.umi('efficientExamine'));
          else window.dispatcher._$redirect(s.umi('learnExamList'));
        }._$bind(this),
      );
      this.__quizCache = new d._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetOpenQuizInfo', this.__onGetQuizInfoCB._$bind(this));
      this.__quizCache._$addEvent('onGetPreviewQuizList', this.__onGetQuizListCB._$bind(this));
      this.__quizCache._$addEvent('onGetQuizPaperList', this.__onGetQuizListCB._$bind(this));
    };
    _.__onGetQuizInfoCB = function (e) {
      console.log('__ongetquizInfo', e);
      if (e) {
        this.__examInfo = e;
        this.__titleNode.innerHTML = r._$escape(e.name);
        if (e.aid > 0) this.__onToggleDoing();
        else {
          var i = function () {
            this.__examInfo.startTime = 0;
            this.__beforeExam = s._$$ExamProtocolUI._$allocate({
              parent: this.__prepareNode,
              type: 'object',
              data: e,
              onDoingAble: this.__onToggleDoing._$bind(this),
            });
          }._$bind(this);
          if (!t.isPreview && e.targetAnswerform) {
            if (
              e.targetAnswerform.effectStatus == s.CONST.QUIZ_SUBMIT_VALID &&
              s._$getCurServerTime() < e.deadline
            ) {
              i();
              return;
            }
            if (
              e.targetAnswerform.effectStatus == s.CONST.QUIZ_SUBMIT_VALID ||
              (e.evaluateScoreReleaseTime <= s._$getCurServerTime() &&
                e.scorePubStatus == s.CONST.SCORE_PUB_STATUS_CONFIRMED)
            )
              t.dispatcher._$redirect(
                s.umi('learnExamObjectScore') +
                  '?id=' +
                  this.__testId +
                  '&aid=' +
                  e.targetAnswerform.aid +
                  '&eid=' +
                  this.__examId +
                  '&examType=' +
                  this.__examType,
              );
            else this.__onToggleWaitForScore();
          } else i();
        }
      }
    };
    _.__onGetQuizListCB = function (e) {
      console.log('exam object _data', e, this.__examInfo, this.__preventCheatingData);
      if (e) {
        a._$addClassName(this.__prepareNode, 'f-dn');
        a._$delClassName(this.__doingNode, 'f-dn');
        console.log('quizDoingUI data', e, this.__examInfo, this.__preventCheatingData);
        this.__quizDoingUI = s._$$QuizDoingUI._$allocate({
          parent: this.__doingNode,
          quizDto: e,
          testId: this.__testId,
          examId: this.__examId,
          examType: this.__examType,
          baseInfo: this.__examInfo,
          type: 'exam',
          onSubmit: function () {
            this.__onToggleWaitForScore();
          }._$bind(this),
        });
      }
    };
    _.__onToggleDoing = function () {
      var e = !t.isPreview ? this.__examInfo.aid : null;
      if (1 == t.isPreview) this.__quizCache._$getPreviewQuizList(this.__testId);
      else this.__quizCache._$getOpenQuizPaperList(this.__testId, e, !1, t.appId);
    };
    _.__onToggleWaitForScore = function () {
      a._$addClassName(this.__prepareNode, 'f-dn');
      a._$addClassName(this.__doingNode, 'f-dn');
      a._$delClassName(this.__waitNode, 'f-dn');
      this.__waitNode.innerHTML =
        '<div class="f-fl icn"></div><div class="f-fl tip f-f0">' +
        e.KEY_LEARN_SUBMITTED_IN +
        s._$formatCommonTime(this.__examInfo.evaluateScoreReleaseTime) +
        e.KEY_LEARN_ANNOUNCE +
        '</div>';
    };
    _.__onShow = function (e) {
      if (!window.isNeedOpenCloseTerm)
        if (!((t.webUser && 0 != t.isEnroll) || t.isNeedOpenCloseTerm)) {
          t.dispatcher._$redirect(s.umi('notEnroll') + '?from=exam');
          return;
        }
      l.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    _.__onRefresh = function (e) {
      l.__onRefresh.apply(this, arguments);
      console.log('examObjective onrefresh', e);
      this.__clearUI();
      this.__examInfo = [];
      this.__examId = e.param.eid || '';
      this.__examType = e.param.examType;
      this.__testId = e.param.id || '';
      this.__quizCache._$getOpenQuizInfo(this.__testId, null, !!t.isPreview, t.appId);
      if (!t.isPreview) {
        var i = {
          userId: s._$getWebUser().id,
          courseId: t.courseDto.id,
          termId: t.termDto.id,
          quizId: this.__testId,
          examId: this.__examId,
        };
        s._$trackEvent('exam', 'view', s._$convertToJSONHex(i));
        s._$log2Study('exam', 'view', i);
      }
    };
    _.__clearUI = function (e) {
      if (this.__beforeExam) this.__beforeExam = s._$$ExamProtocolUI._$recycle(this.__beforeExam);
      if (this.__quizDoingUI) this.__quizDoingUI = s._$$QuizDoingUI._$recycle(this.__quizDoingUI);
      a._$delClassName(this.__prepareNode, 'f-dn');
      a._$addClassName(this.__doingNode, 'f-dn');
      a._$addClassName(this.__waitNode, 'f-dn');
    };
    _.__onHide = function () {
      this.__clearUI();
      l.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
    t.dispatcher._$loaded(s.umi('learnExamObjective'), o._$$ExamObjective);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '8a6e1591b595a108dc0d7c3ecef76bb9',
  'a01f33fc4c73dd5578f3439696dfd8bc',
  '2c666a1ceb412082b906b11b0948dedf',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '93828627ddb358ed890cb65967a0c1de',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '08d2f36062baca2c8eb8327afd74d88c',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '7df0f01cb101a6c1b8f688eaa9470d4b',
  function () {
    var e = (window.moocConfig || {}).lang || {};
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('nej.v'),
      d,
      _;
    o._$$ExamObjectScore = NEJ.C();
    d = o._$$ExamObjectScore._$extend(o._$$ObjectiveScoreBase, !0);
    _ = o._$$ExamObjectScore._$supro;
    d.__getXhtml = function () {
      return a._$getHtmlTemplate(
        'jst-edu-learnQuizScore',
        r._$merge(
          { backTxt: window.moocConfig.lang.KEY_LEARN_RETURN, showDoAgain: !1 },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
      this.__scoreAppealHolder = a._$getByClassName(this.__body, 'j-scoreAppealHolder')[0];
      if (this.__scoreAppealHolder)
        this.__scoreAppealUI = s._$$ScoreAppealUI._$allocate({ parent: this.__scoreAppealHolder });
      c._$addEvent(
        this.__backNode,
        'click',
        function () {
          window.dispatcher._$redirect(s.umi('learnExamList'));
        }._$bind(this),
      );
    };
    d.__buildBaseData = function (t) {
      _.__buildBaseData.apply(this, arguments);
      if (this.__invalidScore) this.__warnTip.innerHTML = e.KEY_LEARN_YOU_SUBMISSION_SELFEARNING;
    };
    d.__onBuildQuizAnalysis = function (e) {
      _.__onBuildQuizAnalysis.apply(this, arguments);
      if (this.__scoreAppealUI)
        this.__scoreAppealUI._$setHasSubjective(
          !!(e && e.subjectiveQList && e.subjectiveQList.length),
        );
    };
    d.__onRefresh = function (e) {
      this.__supOnRefresh(e);
      this.__examId = e.param.eid || null;
      this.__examType = e.param.examType;
      if (this.__scoreAppealUI) {
        var t = s._$getWebUser();
        this.__scoreAppealUI._$reset({
          bizType: 1,
          bizId: this.__examId,
          examType: this.__examType,
          userId: t ? t.id : '',
          hasSubjective: !1,
        });
      }
    };
    t.dispatcher._$loaded(s.umi('learnExamObjectScore'), o._$$ExamObjectScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  'ea133e51ffbd943e2a04b21cb3716cd7',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'e529c28cec1f23f81b7d9f013fb674ee',
);
EDU(
  'bce468214ca2360a1236a20393444ef6',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ExamObjectiveInfoItem = NEJ.C();
    r = o._$$ExamObjectiveInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-examObjInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__statusNode = n._$getByClassName(this.__body, 'j-status')[0];
      this.__scoreNode = n._$getByClassName(this.__body, 'j-score')[0];
      this.__timeNode = n._$getByClassName(this.__body, 'j-time')[0];
      this.__examBtn = n._$getByClassName(this.__body, 'j-examBtn')[0];
      a._$addEvent(
        this.__examBtn,
        'click',
        function (t) {
          if (this.__umi) e.dispatcher._$redirect(this.__umi);
        }._$bind(this),
      );
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__examVo = e.examVo || {};
      this.__testVo = e.testVo || {};
      this.__nameNode.innerText = this.__testVo.name || '';
      this.__scoreNode.innerText =
        (this.__testVo.objTotalScore || 0) + window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      this.__timeNode.innerText =
        this.__testVo.testTime / 60 + ' ' + window.moocConfig.lang.KEY_LEARN_MINUTE;
      this.__statusNode.innerText = '';
      n._$delClassName(this.__statusNode, 'warn');
      this.__examBtn.innerText = window.moocConfig.lang.KEY_LEARN_ENTER_EXAM;
      this.__umi = null;
      n._$delClassName(this.__examBtn, 'u-btn-disabled');
      var t = 1 == window.shouldHiddenScore;
      if (
        this.__testVo.userSubmitStatus == o.CONST.HW_STATUS_SUBMITTED &&
        this.__testVo.userEffectStatus !== o.CONST.QUIZ_SUBMIT_VALID
      )
        if (
          o._$getCurServerTime() >= this.__examVo.scoreReleaseTime &&
          this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
        ) {
          if (t)
            this.__statusNode.innerHTML =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              '<span class="j-triggerLockScore"></span>';
          else
            this.__statusNode.innerText =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              ((this.__testVo.userScore + this.__examVo.bonusScore).toFixed(2) || 0) +
              window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
          this.__examBtn.innerText = window.moocConfig.lang.KEY_LEARN_VIEW_RESOLUTION;
          this.__umi =
            o.umi('learnExamObjectScore') +
            '?eid=' +
            this.__testVo.examId +
            '&id=' +
            this.__testVo.id +
            '&examType=' +
            this.__examVo.type;
        } else {
          if (this.__testVo.userEffectStatus == o.CONST.QUIZ_SUBMIT_VALID)
            this.__statusNode.innerText = window.moocConfig.lang.KEY_LEARN_SUBMITTED_RESULTS;
          else this.__statusNode.innerText = window.moocConfig.lang.KEY_LEARN_THE_ANNOUCEMENT;
          n._$addClassName(this.__examBtn, 'u-btn-disabled');
        }
      else {
        if (this.__examVo.deadline && o._$getCurServerTime() >= this.__examVo.deadline) {
          this.__statusNode.innerText = window.moocConfig.lang.KEY_LEARN_TIME_IS_OUT;
          n._$addClassName(this.__statusNode, 'warn');
        }
        this.__umi =
          o.umi('learnExamObjective') +
          '?eid=' +
          this.__testVo.examId +
          '&id=' +
          this.__testVo.id +
          '&examType=' +
          this.__examVo.type;
      }
    };
    r.__destroy = function () {
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '83bcbe1b3294c87f82b06a50ede6bd63',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ExamSubjectiveInfoItem = NEJ.C();
    r = o._$$ExamSubjectiveInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-examSbjInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__statusNode = n._$getByClassName(this.__body, 'j-status')[0];
      this.__scoreNode = n._$getByClassName(this.__body, 'j-score')[0];
      this.__timeNode = n._$getByClassName(this.__body, 'j-time')[0];
      this.__judgeTypeNode = n._$getByClassName(this.__body, 'j-judgeType')[0];
      this.__evalStartTimeNode = n._$getByClassName(this.__body, 'j-evalStart')[0];
      this.__evalEndTimeNode = n._$getByClassName(this.__body, 'j-evalEnd')[0];
      this.__examBtn = n._$getByClassName(this.__body, 'j-examBtn')[0];
      a._$addEvent(
        this.__examBtn,
        'click',
        function (t) {
          if (this.__umi) e.dispatcher._$redirect(this.__umi);
        }._$bind(this),
      );
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__examVo = e.examVo || {};
      this.__testVo = e.testVo || {};
      this.__nameNode.innerText = this.__testVo.name || '';
      this.__scoreNode.innerText =
        (this.__testVo.sbjTotalScore || 0) + window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      this.__timeNode.innerText =
        this.__testVo.testTime >= 0
          ? this.__testVo.testTime / 60 + window.moocConfig.lang.KEY_LEARN_MINUTE
          : window.moocConfig.lang.KEY_LEARN_UNLIMITED;
      if (this.__testVo.type == o.CONST.TYPE_SUBJECTIVE_OJ) {
        this.__judgeTypeNode.innerText = 'Online Judge批改';
        this.__umi =
          o.umi('learnExamOJ') +
          '?eid=' +
          this.__testVo.examId +
          '&id=' +
          this.__testVo.id +
          '&examType=' +
          this.__examVo.type;
      } else {
        this.__judgeTypeNode.innerText = o._$getEvJudgeStr(this.__testVo.evaluateJudgeType);
        this.__evalStartTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_STARTS +
          o._$formatCommonTime(this.__testVo.evaluateStart);
        this.__evalEndTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_DEADLINE1 +
          o._$formatCommonTime(this.__testVo.evaluateEnd);
        if (o.CONST.JUDGE_TYPE_EVALUATE == this.__testVo.evaluateJudgeType)
          n._$addClassName(this.__judgeTypeNode.parentNode.parentNode, 'titem1');
        else n._$delClassName(this.__judgeTypeNode.parentNode.parentNode, 'titem1');
        this.__umi =
          o.umi('learnExamSubjective') + '?eid=' + this.__testVo.examId + '&id=' + this.__testVo.id;
      }
      var t = o._$currentEvaluatePhase(this.__testVo);
      var i = '',
        a = o._$getCurServerTime();
      n._$delClassName(this.__statusNode, 'warn');
      this.__examBtn.innerText = window.moocConfig.lang.KEY_LEARN_ENTER_EXAM;
      n._$delClassName(this.__examBtn, 'u-btn-disabled');
      var s = 1 == window.shouldHiddenScore;
      if (this.__testVo.userSubmitStatus == o.CONST.HW_STATUS_SUBMITTED)
        if (
          a >= this.__examVo.scoreReleaseTime &&
          this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
        )
          if (s)
            i =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              '<span class="j-triggerLockScore"></span>';
          else
            i =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              (this.__testVo.userScore || 0).toFixed(2) +
              window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
        else {
          if (this.__testVo.evaluateJudgeType == o.CONST.JUDGE_TYPE_LECTOR)
            i = window.moocConfig.lang.KEY_LEARN_THE_ANNOUCEMENT;
          else if (this.__testVo.evaluateJudgeType == o.CONST.JUDGE_TYPE_EVALUATE)
            if (a < this.__testVo.evaluateStart)
              i = window.moocConfig.lang.KEY_LEARN_ANSWER_SUBMITTER;
            else if (this.__testVo.evaluateStart <= a && a <= this.__testVo.evaluateEnd)
              i = window.moocConfig.lang.KEY_LEARN_PEER_EVALUATION_START;
            else if (this.__testVo.evaluateEnd <= a && a <= this.__testVo.evaluateScoreReleaseTime)
              i = window.moocConfig.lang.KEY_LEARN_PEER_EVALUATION_OVER;
          if (this.__testVo.type == o.CONST.TYPE_SUBJECTIVE_OJ) {
            this.__umi = null;
            n._$addClassName(this.__examBtn, 'u-btn-disabled');
          }
        }
      else if (this.__examVo.deadline && a >= this.__examVo.deadline) {
        i = window.moocConfig.lang.KEY_LEARN_SUBMISSION_EXAM;
        n._$addClassName(this.__statusNode, 'warn');
        if (
          a >= this.__examVo.scoreReleaseTime &&
          this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
        )
          if (this.__testVo.type != o.CONST.TYPE_SUBJECTIVE_OJ) {
            this.__umi =
              o.umi('learnExamSubjective') +
              '?eid=' +
              this.__testVo.examId +
              '&id=' +
              this.__testVo.id +
              '&examType=' +
              this.__examVo.type;
            n._$delClassName(this.__examBtn, 'u-btn-disabled');
          } else if (this.__testVo.type == o.CONST.TYPE_SUBJECTIVE_OJ) {
            this.__umi =
              o.umi('learnExamOJ') + '?eid=' + this.__testVo.examId + '&id=' + this.__testVo.id;
            n._$delClassName(this.__examBtn, 'u-btn-disabled');
          } else {
            this.__umi = null;
            n._$addClassName(this.__examBtn, 'u-btn-disabled');
          }
        else {
          this.__umi = null;
          n._$addClassName(this.__examBtn, 'u-btn-disabled');
        }
      }
      this.__statusNode.innerHTML = i;
    };
    r.__destroy = function () {
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '40afa2e0d560068c0496bec063bb0d2b',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ExamListItem = NEJ.C();
    r = o._$$ExamListItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-examListItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = n._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__upNode = n._$getByClassName(this.__body, 'j-up')[0];
      this.__downNode = n._$getByClassName(this.__body, 'j-down')[0];
      this.__noContent = n._$getByClassName(this.__body, 'j-noContent')[0];
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__totalScoreNode = n._$getByClassName(this.__body, 'j-totalScore')[0];
      this.__validScoreNode = n._$getByClassName(this.__body, 'j-validScore')[0];
      this.__detailBox = n._$getByClassName(this.__body, 'j-detail')[0];
      this.__descriptionNode = n._$getByClassName(this.__body, 'j-description')[0];
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__publishTimeNode = n._$getByClassName(this.__body, 'j-publishTime')[0];
      this.__previewStatusNode = n._$getByClassName(this.__body, 'j-previewStatus')[0];
      a._$addEvent(
        this.__titleBox,
        'click',
        function (e) {
          this.__showUpDownMode(!this.__downStatus, e);
        }._$bind(this),
      );
    };
    r.__handleTriagleStatus = function (e) {
      o._$hiddenNode(this.__upNode);
      o._$hiddenNode(this.__downNode);
      o._$hiddenNode(this.__noContent);
      this.__downStatus = !!e;
      if (this.__downStatus) {
        o._$showNode(this.__downNode);
        n._$addClassName(this.__body, 'down');
        if (this.__examVo.objectTest)
          this.__examObjInfoUI = o._$$ExamObjectiveInfoItem._$allocate({
            parent: this.__detailBox,
            examVo: this.__examVo,
            testVo: this.__examVo.objectTest,
          });
        if (this.__examVo.subjectTest)
          this.__examSbjInfoUI = o._$$ExamSubjectiveInfoItem._$allocate({
            parent: this.__detailBox,
            examVo: this.__examVo,
            testVo: this.__examVo.subjectTest,
          });
      } else {
        o._$showNode(this.__upNode);
        n._$delClassName(this.__body, 'down');
        this.__clearUIs();
      }
    };
    r.__showUpDownMode = function (t, i) {
      o._$hiddenNode(this.__upNode);
      o._$hiddenNode(this.__downNode);
      o._$showNode(this.__noContent);
      var n = !!e.isPreview && this.__examVo.draftStatus == o.CONST.CHAPTERSTATUS_DELETED;
      if (!n && this.__examVo.id)
        if (t) this.__handleTriagleStatus(!0);
        else this.__handleTriagleStatus(!1);
      else if (i) {
        var a = window.moocConfig.lang.KEY_LEARN_EXAMINATION;
        var s = n
          ? a + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
          : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
            a +
            window.moocConfig.lang.KEY_LEARN_CONTENT;
        o._$$CommonDialog._$showDialog({ type: 1, message: s, modal: !0 });
      }
    };
    r._$showUpDownMode = function (e) {
      this.__showUpDownMode(e, null);
    };
    r.__reset = function (t) {
      this.__supReset(t);
      this.__examVo = t.examVo || {};
      this.__nameNode.innerText = this.__examVo.name;
      this.__totalScoreNode.innerText =
        window.moocConfig.lang.KEY_LEARN_TOTAL_SCORE1 +
        (this.__examVo.totalScore || 0) +
        window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      this.__validScoreNode.innerText = '';
      this.__body.setAttribute('id', this.__examVo.chapterId);
      var i = 1 == window.shouldHiddenScore;
      if (
        null != this.__examVo.userScore &&
        o._$getCurServerTime() >= this.__examVo.scoreReleaseTime &&
        this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
      )
        if (i)
          this.__validScoreNode.innerHTML =
            window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
            '<span class="j-triggerLockScore"></span>';
        else
          this.__validScoreNode.innerText =
            window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
            (this.__examVo.userScore + (this.__examVo.bonusScore || 0)).toFixed(2) +
            window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      if (this.__examVo.description) {
        if (this.__descriptionNode) {
          o._$showNode(this.__descriptionNode.parentNode);
          this.__descriptionNode.innerText = this.__examVo.description;
        }
      } else this.__descriptionNode && o._$hiddenNode(this.__descriptionNode.parentNode);
      this.__submitTimeNode.innerText = o._$formatCommonTime(this.__examVo.deadline);
      this.__publishTimeNode.innerText = o._$formatCommonTime(this.__examVo.scoreReleaseTime);
      this.__showUpDownMode(!1);
      if (e.isPreview && !e.isReview) {
        var n =
          this.__examVo.draftStatus == o.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__examVo.draftStatus == o.CONST.CHAPTERSTATUS_MODIFIED;
        var a = window.webUser.roles || [];
        this.__previewStatusUI = o._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__examVo,
          type: this.__examVo.contentType,
          hidePublish: n || !!t.syncMooc || a.includes(o.CONST.ROLE_REGION_ADMIN),
        });
      }
    };
    r.__clearUIs = function () {
      if (this.__examObjInfoUI)
        this.__examObjInfoUI = o._$$ExamObjectiveInfoItem._$recycle(this.__examObjInfoUI);
      if (this.__examSbjInfoUI)
        this.__examSbjInfoUI = o._$$ExamSubjectiveInfoItem._$recycle(this.__examSbjInfoUI);
    };
    r.__destroy = function () {
      this.__clearUIs();
      if (this.__previewStatusUI)
        this.__previewStatusUI = o._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bce468214ca2360a1236a20393444ef6',
  '83bcbe1b3294c87f82b06a50ede6bd63',
  '94ec8a8dfa596967c090fc2c92487692',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
EDU(
  '0420fecbfe618803d5371cc64a44090f',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$CommonExamListUI = NEJ.C();
    r = o._$$CommonExamListUI._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-edu-examListUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      console.log('this.__body', this.__body);
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__syncMooc = e.syncMooc;
      this.__examId = e.examId;
      console.log('CommonExamListUI', e);
      o._$hiddenNode(this.__emptyNode);
      this.__genUIs(e.exams);
      window.onload = function () {
        var e = document.getElementById(this.__examId);
        if (e) e.scrollIntoView({ behavior: 'smooth' });
      }._$bind(this);
    };
    r.__genUIs = function (e) {
      console.log('生成一次examlist', e);
      var t = e || {};
      if (t && t.length) {
        var i = t.length;
        this.__examListItemUIs = [];
        var n = null;
        s._$forEach(
          t,
          function (e, t) {
            var a = o._$$ExamListItem._$allocate({
              parent: this.__body,
              examVo: e,
              clazz: t == i - 1 ? 'last' : '',
              syncMooc: this.__syncMooc,
            });
            this.__examListItemUIs.push(a);
            console.log('this.__examId', this.__examId, e);
            if (this.__examId && this.__examId == e.chapterId) n = a;
            else;
          }._$bind(this),
        );
        if (n) n._$showUpDownMode(!0);
      } else o._$showNode(this.__emptyNode);
      if (!window.currentLanguage) {
        setTimeout(
          function () {
            this.showNewExamList();
          }._$bind(this),
          0,
        );
        console.log('this.__examListItemUIs', this.__examListItemUIs);
      }
    };
    r.showNewExamList = function () {
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch;
      console.log('showNewExamList');
      var e = {
        isPreview: window.isPreview,
        courseId: window.courseDto.id,
        schoolSN:
          window.courseDto && window.courseDto.schoolPanel
            ? window.courseDto.schoolPanel.shortName
            : null,
        termId: this.__syncMooc
          ? window.moocTermDto
            ? window.moocTermDto.id
            : null
          : window.termDto
            ? window.termDto.id
            : null,
        isSpoc: window.isSpoc,
        expandKey: this.__examId,
      };
      if (window.reactComponentLoadBootstrap) window.reactComponentLoadBootstrap.setFtlData(e);
      if (!this.__syncMooc) {
        var t = document.createElement('div');
        t.setAttribute('id', 'j-new-exam-card');
        this.__body.appendChild(t);
        if (window.renderReactComponent && window.renderReactComponent['NewExamCard']) {
          window.renderReactComponent.ReactDOM.unmountComponentAtNode(
            document.getElementById('j-new-exam-card'),
          );
          var i = window.renderReactComponent['NewExamCard'];
          window.renderReactComponent.render(
            i.component,
            i.initialState,
            document.getElementById('j-new-exam-card'),
          );
        } else
          window.reactComponentLoadBootstrap.init(
            { name: 'NewExamCard', container: document.getElementById('j-new-exam-card') },
            e,
          );
      } else {
        var n = document.createElement('div');
        n.setAttribute('id', 'j-new-exam-card-sync');
        this.__body.appendChild(n);
        var i = window.renderReactComponent['NewExamCard'];
        window.renderReactComponent.render(
          i.component,
          i.initialState,
          document.getElementById('j-new-exam-card-sync'),
        );
      }
    };
    r.__clearUI = function () {
      s._$forEach(
        this.__examListItemUIs,
        function (e, t) {
          e = o._$$ExamListItem._$recycle(e);
        }._$bind(this),
      );
      if (document.getElementById('j-new-exam-card'))
        this.__body.removeChild(document.getElementById('j-new-exam-card'));
      this.__quizHwItemUIs = null;
    };
    r.__destroy = function () {
      this.__clearUI();
      this.__supDestroy();
    };
  },
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '40afa2e0d560068c0496bec063bb0d2b',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
EDU(
  '5d00fb7eeccb186d225225499f450adb',
  function () {
    var e = window,
      t = NEJ.P('nej.e'),
      i = NEJ.P('edu.m'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = NEJ.P('nej.u'),
      s,
      r;
    i._$$LearnExamList = NEJ.C();
    s = i._$$LearnExamList._$extend(i._$$Module, !0);
    r = i._$$LearnExamList._$supro;
    s.__init = function (e) {
      this.__parentNode = e.parent;
      r.__supInit.apply(this, arguments);
    };
    s.__getXhtml = function () {
      return t._$getHtmlTemplate('jst-edu-learnExam', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    s.__getParent = function () {
      return this.__parentNode ? this.__parentNode : t._$get('courseLearn-inner-box');
    };
    s.__buildFuncPoints = function () {
      r.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = t._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__moduleTitle = t._$getByClassName(this.__body, 'u-learn-moduletitle')[0];
      this.__contentCache = new n._$$COM_Cache_CourseCtCache();
      this.__courseCache = new n._$$COM_Cache_CourseCache();
      this.__contentCache._$addEvent('onGetChapterList', this.__onGetChapterList._$bind(this));
      this.__courseCache._$addEvent('onCheckTermLearn', this.__onCheckTermLearnCb._$bind(this));
      this.__examListUI = [];
    };
    s.__onGetChapterList = function (t) {
      this.__termInfoData = t || {};
      this.__releaseTimeExamId = null;
      this.__releaseTimeMin = 0;
      if (!this.__examId);
      var i =
        null === this.__termInfoData.mocTermDto
          ? []
          : this.__termInfoData.mocTermDto.chapters.reduce(
              function (e, t) {
                if (t.exam && 1 !== t.contentType) {
                  var i = Math.abs(a._$getCurServerTime() - t.releaseTime);
                  if (!this.__releaseTimeMin) this.__releaseTimeMin = i;
                  if (i < this.__releaseTimeMin) {
                    this.__releaseTimeExamId = t.id;
                    this.__releaseTimeMin = i;
                  }
                  if (3 !== t.contentType) e.push(t.exam);
                }
                return e;
              }._$bind(this),
              [],
            );
      if (this._examListUI && !this.__splitUI) a._$$CommonExamListUI._$recycle(this._examListUI);
      var n;
      this._examListUI = n = a._$$CommonExamListUI._$allocate({
        parent: this.__body,
        exams: i,
        examId: this.__examId || this.__releaseTimeExamId,
        syncMooc: !!this.__splitUI,
      });
      this.__examListUI.push(n);
      if (e.isNeedOpenCloseTerm) r.__onShow.apply(this, arguments);
      if (a._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = a._$$SpocMoocSplit._$allocate({ parent: this.__body });
        this.__getChapterList(e.moocTermDto.id);
      }
    };
    s.__onShow = function (i) {
      if (e.isPreview) {
        this.__onShowOptions = i;
        r.__onShow.apply(this, arguments);
        this.__moduleNameNode.innerText =
          (e.learnBigTabNames && e.learnBigTabNames[i.target]) ||
          window.moocConfig.lang.KEY_LEARN_EXAMINATION;
        this.__onRefresh(this.__onShowOptions);
      } else {
        if (!e.webUser && !e.isNeedOpenCloseTerm && !e.isNeedOpenCloseTerm) {
          e.dispatcher._$redirect(a.umi('notEnroll') + '?from=exam');
          return;
        }
        this.__onShowOptions = i;
        if (e.webUser) this.__courseCache._$CheckTermLearn(e.termDto.id);
        if (!i.parent)
          this.__moduleNameNode.innerText =
            (e.learnBigTabNames && e.learnBigTabNames[i.target]) ||
            window.moocConfig.lang.KEY_LEARN_EXAMINATION;
        if (i.parent) t._$addClassName(this.__moduleTitle, 'f-dn');
        if (e.isNeedOpenCloseTerm) this.__onRefresh(this.__onShowOptions);
      }
    };
    s.__onCheckTermLearnCb = function (t) {
      if (t >= 0) {
        r.__onShow.apply(this, arguments);
        this.__onRefresh(this.__onShowOptions);
      } else if (!e.isNeedOpenCloseTerm) e.dispatcher._$redirect(a.umi('notEnroll') + '?from=exam');
    };
    s.__onRefresh = function (t) {
      r.__onRefresh.apply(this, arguments);
      this.__examId = t.param && t.param.id;
      this.__clearUI();
      this.__getChapterList(e.termDto.id);
    };
    s.__getChapterList = function (t) {
      if (e.isPreview) {
        var i = e.isReview ? 0 : 1;
        this.__contentCache.getMocTermDto(t, i, !e.isPreview);
      } else if (e.webUser && 1 == e.isEnroll) this.__contentCache.getLastLearnedMocTermDto(t);
      else {
        i = e.isReview ? 0 : 1;
        this.__contentCache.getMocTermDto(t, i, !e.isPreview);
      }
    };
    s.__clearUI = function () {
      o._$forEach(
        this.__examListUI,
        function (e) {
          a._$$CommonExamListUI._$recycle(e);
        }._$bind(this),
      );
      this.__examListUI = [];
      if (this.__splitUI) this.__splitUI = a._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    s.__onHide = function () {
      this.__clearUI();
      this.__termInfoData = null;
      r.__onHide.apply(this, arguments);
      t._$removeByEC(this.__body);
    };
    s.__reset = function (e) {
      if (e.parent) {
        e.parent.appendChild(this.__body);
        s.__onShow.apply(this, arguments);
      } else r.__supReset.apply(this, arguments);
    };
    e.dispatcher._$loaded(a.umi('learnExamList'), i._$$LearnExamList);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '7ae1049f52447f73129209d74071c691',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '0420fecbfe618803d5371cc64a44090f',
  'ad72e09e8978dc83423b503971b6294c',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  'a936afb5ecab0e9286c3c9d05341571d',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
//# sourceMappingURL=./s/tp_learn_index_desktop_modules_learn.js.map
