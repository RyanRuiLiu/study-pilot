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
