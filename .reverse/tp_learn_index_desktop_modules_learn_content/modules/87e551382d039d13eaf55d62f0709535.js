EDU(
  '87e551382d039d13eaf55d62f0709535',
  function (e, t, n, i) {
    var o;
    o = t.$extends({
      name: 'live-pc-player_status',
      data: {},
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        var t = this.data.liveStatus;
        var n = document.querySelector('.live-subscription');
        if (n) n.remove();
        if (t == i.LIVE_STATUS_END) {
          this.data.statusText = '直播已结束，视频转码中';
          this.data.statusTextTips = '课时正在转码，转码成功后可随时观看录播';
        } else if (t == i.LIVE_STATUS_INVALID)
          this.data.statusText = e.KYE_LIVE_BORADCAST_LIVE_EXPIRED;
        else if (t == i.LIVE_STATUS_DELAY_START) {
          this.data.statusText = e.KYE_LIVE_BORADCAST_TEACHER_NO_START;
          this.data.statusTextTips = e.KYE_LIVE_BORADCAST_TIP_WAIT;
        }
        this.$update();
      },
    });
    return o;
  },
  'f65d4c38b0afda6fbd1ac233d0d7e05d',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'ac7d64fe1d0d70755aaf94a58e8768c8',
);
