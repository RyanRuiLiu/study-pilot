EDU(
  'dd49525a1a869aac38a69133d0f42e9d',
  function (e, t) {
    var n = e
      .$extends({
        name: 'ux-live-interactive-voice-changer',
        config: function () {
          t.extend(this, {});
          t.extend(this.data, { imgUrl: '' });
          this.supr();
        },
        init: function () {
          this.supr();
        },
        change: function (e) {
          e = window.parseInt((e / 100) * 360);
          if (e > 180) {
            if (this.$refs && this.$refs.pie) this.$refs.pie.classList.add('gthalf');
          } else if (this.$refs && this.$refs.pie) this.$refs.pie.classList.remove('gthalf');
          if (this.$refs && this.$refs.pie)
            this.$refs.pie.getElementsByClassName('voice-changer_left')[0].style.transform =
              'rotate(' + e + 'deg)';
          this.$update();
        },
        destroy: function () {
          this.supr();
        },
      })
      .filter({});
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
