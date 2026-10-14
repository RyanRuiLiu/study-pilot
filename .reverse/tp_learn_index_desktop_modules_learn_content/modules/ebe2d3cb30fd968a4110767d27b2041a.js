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
