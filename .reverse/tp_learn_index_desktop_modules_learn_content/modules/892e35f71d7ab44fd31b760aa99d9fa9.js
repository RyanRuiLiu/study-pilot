EDU(
  '892e35f71d7ab44fd31b760aa99d9fa9',
  function (e, t, n, i, o, a, s, r, c, d) {
    var l = window,
      _ = NEJ.P('nej.e'),
      u = NEJ.P('edu.u'),
      f = NEJ.P('nej.u'),
      h = NEJ.P('nej.v'),
      p = NEJ.P('edu.d');
    var m = n
      .extend({
        name: 'wapLearnVideoUI',
        template: t,
        config: function () {
          this.supr();
          e.extend(this.data, { bigPhoto: l.termDto.bigPhoto });
        },
        init: function () {
          document.title = this.data.title;
          this.__unitImg = this.$refs.unitImg;
          this.data.videoDuration = s._$formatVideoTime(this.data.videoVo.duration);
          this.showVideo();
          this.$update();
          this.supr();
        },
        showVideo: function () {
          this.__unitImg.innerHTML = '';
          if (this.__video) this.__video.__destroy();
          this.__video = u._$$VideoPlayer._$allocate({
            parent: this.__unitImg,
            videoInfo: NEJ.X(this.data.videoVo, {
              autoStart: !1,
              image: window.termDto.bigPhoto,
              targetId: l.termDto.id,
              targetType: 0,
              videoId: this.data.videoId || this.data.videoVo.videoId,
            }),
          });
        },
        gotoMoocApp: function () {
          r._$callAppDownload('fromCallApp', {
            courseId: l.courseDto.id,
            termId: l.termDto.id,
            from: 'learn',
          });
        },
      })
      .filter({})
      .directive({});
    return m;
  },
  'ca38b7e137b28e4006cbadb343315267',
  'e78bb439e23b5c380ffb5b269896d6bf',
  '6f1453d31194f86271694dd0542354fe',
  '5289c798a728525273713946bf73de90',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '08d2f36062baca2c8eb8327afd74d88c',
  'beec6201069596ecb83a09e5fc3eb415',
  '6de20ab3cb8a0113ff59f8fdde6145dd',
);
