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
