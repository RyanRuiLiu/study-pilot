EDU(
  '7bfefa2ea7aa6f4d1a546a74bcca92f9',
  function (e, t, n, i) {
    if ('undefined' != typeof module && module.exports) {
      n = require('../base/component');
      i = require('./pager.html');
      t = require('../base/_');
    }
    var o = n.extend({
      name: 'pager',
      template: i,
      config: function () {
        t.extend(this.data, {
          current: 1,
          total: 11,
          position: 'center',
          middle: 5,
          side: 2,
          start: 1,
          end: 5,
          scrollTop: !0,
          scrollTo: '',
          lang: e,
        });
        this.supr();
        this.$watch(['current', 'total'], function (e, t) {
          this.data.current = e = +e;
          this.data.total = t = +t;
          var n = this.data.middle >> 1;
          var i = this.data.side;
          this.data.start = e - n;
          this.data.end = e + n;
          if (this.data.start < i + 1) this.data.start = i + 1;
          if (this.data.end > t - i) this.data.end = t - i;
          if (e - this.data.start < n) this.data.end += this.data.start - e + n;
          if (this.data.end - e < n) this.data.start += this.data.end - e - n;
        });
        this.$watch(['middle', 'side'], function (e, t) {
          this.data.middle = +e;
          this.data.side = +t;
        });
      },
      select: function (e) {
        if (!this.data.readonly && !this.data.disabled)
          if (!(e < 1))
            if (!(e > this.data.total))
              if (e != this.data.current) {
                this.data.current = e;
                if (this.data.scrollTop)
                  (
                    (this.data.scrollTo && Regular.dom.find(this.data.scrollTo)) ||
                    document.body
                  ).scrollTop = 0;
                this.$emit('select', { sender: this, current: this.data.current });
              }
      },
    });
    return o;
  },
  '90517bf514c024b42273b51585771127',
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  '3952ec3e3a53967658b1bda72fa8a212',
);
