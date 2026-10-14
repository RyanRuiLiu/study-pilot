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
