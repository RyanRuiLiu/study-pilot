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
