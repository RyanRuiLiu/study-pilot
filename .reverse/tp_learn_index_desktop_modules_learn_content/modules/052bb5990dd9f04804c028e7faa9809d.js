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
