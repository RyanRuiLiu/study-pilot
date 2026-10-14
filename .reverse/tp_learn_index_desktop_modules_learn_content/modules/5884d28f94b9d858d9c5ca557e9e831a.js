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
