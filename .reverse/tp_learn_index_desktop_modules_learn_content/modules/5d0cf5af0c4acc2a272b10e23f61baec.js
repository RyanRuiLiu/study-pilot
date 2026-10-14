EDU(
  '5d0cf5af0c4acc2a272b10e23f61baec',
  function (e, t, n, i, o, a) {
    var s = 'component-slider-sticky-switcher';
    var r = e.$extends({
      config: function () {
        this._flushSetting(s, i);
        t.extend(this, { settingKey: s, stickyDistance: 0, criticalIndex: 0, openGesture: !1 });
        t.extend(this.data, {});
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      refresh: function () {
        this.supr();
        if (0 === this.items.length) {
          this.stickyDistance = 0;
          this.criticalIndex = 0;
        } else {
          this.stickyDistance = this.getStickyDistance();
          this.criticalIndex = this._getCriticalIndex();
        }
        this.$emit('refresh', {
          isLast: this.isLast(this.data.index),
          isFirst: this.isFirst(this.data.index),
        });
      },
      _getCriticalIndex: function () {
        for (var e = this.items.length - 1; e >= 0; e--)
          if (this.data.horizontal) {
            if (this.items[e].x < this.stickyDistance) return e - this.data.step + 1;
          } else if (this.items[e].y < this.stickyDistance) return e - this.data.step + 1;
        return 0;
      },
      getStickyDistance: function () {
        var e = this.items.length,
          t;
        if (this.data.horizontal)
          t = this.items[e - 1].x + this.items[e - 1].width - n.getContentWidth(this.$self);
        else t = this.items[e - 1].y + this.items[e - 1].height - n.getContentHeight(this.$self);
        return t >= 0 ? t : 0;
      },
      prev: function () {
        this.select(this.data.index - this.data.step, null, o.DIRECTION_PREV);
      },
      next: function () {
        this.select(this.data.index + this.data.step, null, o.DIRECTION_NEXT);
      },
      select: function (e, t, n) {
        if (isNaN(e))
          if (n === o.DIRECTION_PREV) e = this.criticalIndex;
          else if (n === o.DIRECTION_NEXT) return;
        this.supr(e, t);
      },
      _getAvailableTarget: function (e) {
        var t;
        if (this._isContentSmallerThanContainer()) return 0;
        var n;
        if (isNaN(e)) n = NaN;
        else {
          if (e <= 0) e = 0;
          else if (e >= this.items.length) e = this.items.length - 1;
          if (this.data.horizontal) t = this.items[e].x;
          else t = this.items[e].y;
          if (t >= this.stickyDistance && 0 !== this.stickyDistance) n = NaN;
          else n = e;
          return n;
        }
      },
      _moveTo: function (e) {
        var t;
        if (this.data.horizontal) {
          if (isNaN(e)) t = this.stickyDistance;
          else {
            t = this.items[e].x;
            if (t > this.stickyDistance) t = this.stickyDistance;
          }
          this._translateX(this.$content, -t);
        } else {
          if (isNaN(e)) t = this.stickyDistance;
          else {
            t = this.items[e].y;
            if (t > this.stickyDistance) t = this.stickyDistance;
          }
          this._translateY(this.$content, -t);
        }
        this.transDistance = t;
      },
      _emitSelectEvent: function (e) {
        this.$emit('switch', { target: e, isLast: this.isLast(e), isFirst: this.isFirst(e) });
      },
      isFirst: function (e) {
        return 0 == e;
      },
      isLast: function (e) {
        return isNaN(e) || this._isContentSmallerThanContainer() ? !0 : !1;
      },
      _isContentSmallerThanContainer: function () {
        return 0 === this.stickyDistance;
      },
      _isContentTotallyInContainer: function () {
        return this._isContentSmallerThanContainer() && 0 === this.transDistance;
      },
      onDel: function (e) {
        this.refresh();
        if (this.items.length > 0)
          if (!this._isContentSmallerThanContainer()) {
            if (this.isLastItemBeforeCriticalPoint()) this.select(NaN, { judgeSame: !1 });
          } else this.select(0);
        this.$emit('del', {
          target: e,
          isLast: this.isLast(this.data.index),
          isFirst: this.isFirst(this.data.index),
        });
      },
      isLastItemBeforeCriticalPoint: function () {
        var e,
          t,
          n = this.items[this.items.length - 1];
        if (this.data.horizontal) {
          e = this.$content.clientWidth - n.width;
          t = n.x - this.transDistance;
          if (t < e) return !0;
        }
        return !1;
      },
      onSwipeLeft: function () {
        if (this.data.openGesture && this.data.horizontal) this.next();
      },
      onSwipeRight: function () {
        if (this.data.openGesture && this.data.horizontal) this.prev();
      },
    });
    r.event('swipeleft', function (e, t) {
      var n = null;
      if (window.Hammer) {
        n = new Hammer(e, {});
        n.on('swipeleft', function (e) {
          t(e);
        });
      }
    });
    r.event('swiperight', function (e, t) {
      var n = null;
      if (window.Hammer) {
        n = new Hammer(e, {});
        n.on('swiperight', function (e) {
          t(e);
        });
      }
    });
    return r;
  },
  '72e69d7ea3d8e3a1bbdeb9ca45794217',
  '217dcfc103efb36d2f192eecc4548797',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '01a0da73e099cf4c90e828992736e017',
  '862facc8f6747520ad48ac596770e983',
  'fe86216ed59e3103a56c42c850d389f0',
);
