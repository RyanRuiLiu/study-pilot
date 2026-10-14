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
