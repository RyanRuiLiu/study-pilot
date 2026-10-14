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
