EDU(
  '1b1f9fa333068845fc244b9be7f9bac8',
  function (e, t, n, i) {
    var o = 'component-rating-star';
    var a = { SLIDE_MODE: 1, CLICK_MODE: 2 };
    var r = e.$extends({
      config: function () {
        this._flushSetting(o, i);
        t.extend(this, { settingKey: o });
        t.extend(this.data, {
          totalScore: 5,
          starScore: 1,
          score: 0,
          step: 0.5,
          size: 30,
          edit: !0,
          editMode: a.SLIDE_MODE,
        });
        this.supr();
        this.data._preScore = this.data.score;
        this.$watch('score', function () {
          this.data._widthList = this.calculateWidths();
        });
      },
      getScore: function () {
        return this.data.score;
      },
      calculateWidths: function () {
        var e = this.data._widthList || [];
        for (var t = 0; t < this.data.totalScore / this.data.starScore; t++) e[t] = 0;
        var n = Math.floor(this.data.score / this.data.starScore);
        var i = 0;
        for (; i < n;) {
          e[i] = this.data.size;
          i++;
        }
        var o = this.data.score % this.data.starScore;
        if (0 !== o) e[i] = (o / this.data.starScore) * this.data.size;
        return e;
      },
      getStarNum: function () {
        return this.data.totalScore / this.data.starScore;
      },
      debounceRating: function (e) {
        if (this.data.edit) {
          var t = e.target.getAttribute('data-index');
          if (null !== t)
            if (this.data.editMode === a.SLIDE_MODE)
              n.debounce(this.rating._$bind(this, +t, e), 30, !1)();
            else if (this.data.editMode === a.CLICK_MODE) this.rating(+t, e);
        }
      },
      rating: function (e, t) {
        var n = t.event.clientX - t.target.getBoundingClientRect().left;
        if (!(n <= 0)) {
          var i = n / this.data.size;
          var o = this.data.starScore / this.data.step;
          var a = e * this.data.starScore + (Math.ceil(i * o) / o) * this.data.starScore;
          this.data.score = Math.min(a, this.data.totalScore);
          if (this.data.score !== this.data._preScore) {
            this.$emit('rating', this.data.score);
            this.data._preScore = this.data.score;
          }
        } else {
          this.data.score = e * this.data.starScore;
          if (this.data.score !== this.data._preScore) {
            this.$emit('rating', this.data.score);
            this.data._preScore = this.data.score;
          }
        }
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    return r;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '0448b929610e23de5fcf44760f1d91ab',
);
