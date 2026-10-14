EDU(
  '206d700f30c20776732fe89f2c364cde',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'segmentList',
      data: { className: '', segmentList: [] },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
      show: function () {
        this.data.className = 'slide-in';
        this.$update();
      },
      hide: function () {
        this.data.className = 'slide-out';
        this.$update();
      },
      toSegmentInfo: function (e) {
        this.$emit('setVideoTime', { time: parseInt(e.startTime / 1e3), segment: e });
      },
      formatTime: function (e) {
        var t = Math.floor(e / 1e3);
        var n = Math.floor(t / 60);
        t %= 60;
        return n.toString().padStart(2, '0') + ':' + t.toString().padStart(2, '0');
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  '93828627ddb358ed890cb65967a0c1de',
  '217dcfc103efb36d2f192eecc4548797',
);
