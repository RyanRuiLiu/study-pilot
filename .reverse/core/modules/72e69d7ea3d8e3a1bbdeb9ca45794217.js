EDU(
  '72e69d7ea3d8e3a1bbdeb9ca45794217',
  function (e, t, n, i, o, a, r) {
    var s = 'component-slider-switcher';
    var c = e.$extends({
      config: function () {
        this._flushSetting(s, r);
        t.extend(this, { settingKey: s, total: 0, items: [], transDistance: 0 });
        t.extend(this.data, {
          class: '',
          width: '100%',
          height: '100%',
          contentClass: 'list',
          itemClass: 'item',
          content: '',
          horizontal: !0,
          index: 0,
          autoAddStyle: !0,
          emitWhenInit: !1,
          visibilityControl: !0,
          step: 1,
          autoContentRendered: !0,
        });
        this.supr();
      },
      init: function () {
        this.supr();
        this._judgeProperty(this.data);
        this.$self = this.$refs.self;
        if (this.data.autoContentRendered)
          setTimeout(
            function () {
              this.onContentRendered();
            }._$bind(this),
            0,
          );
      },
      onContentRendered: function () {
        this.refresh();
        if (this.data.emitWhenInit) this.select(this.data.index, { judgeSame: !1 });
        o._$addEvent(
          window,
          'resize',
          n.debounce(
            function () {
              this.refresh();
              this.select(this.data.index, { notEmit: !0, judgeSame: !1 });
            }._$bind(this),
            500,
          ),
        );
      },
      destroy: function () {
        this.supr();
      },
      prev: function () {
        this.select(this.data.index - this.data.step);
      },
      next: function () {
        this.select(this.data.index + this.data.step);
      },
      select: function (e, t) {
        if (0 != this.items.length) {
          t = t || {};
          t.judgeSame = void 0 == t.judgeSame ? !0 : t.judgeSame;
          var n = t.notEmit || !1;
          e = this._getAvailableTarget(e);
          if ((e != this.data.index && !this._isBothNaN(e, this.data.index)) || !t.judgeSame) {
            if (this.data.visibilityControl) {
              this.toggleItem(this.$items[this.data.index], !1);
              this.toggleItem(this.$items[e], !0);
            }
            this._moveTo(e);
            this.$update('index', e);
            if (!n) this._emitSelectEvent(e);
          }
        }
      },
      _moveTo: function (e) {
        if (this.data.horizontal) {
          this.transDistance = this.items[e].x;
          this._translateX(this.$content, -this.transDistance);
        } else {
          this.transDistance = this.items[e].y;
          this._translateY(this.$content, -this.transDistance);
        }
      },
      _emitSelectEvent: function (e) {
        this.$emit('switch', { target: e, isLast: e == this.items.length - 1, isFirst: 0 == e });
      },
      _isBothNaN: function (e, t) {
        var n;
        if (isNaN(e) && isNaN(t)) n = !0;
        else n = !1;
        return n;
      },
      toggleItem: function (e, t) {
        i._$style(e, { visibility: t ? 'visible' : 'hidden' });
      },
      toggleAllItems: function (e, t) {
        for (var n = 0; n < e.length; n++) this.toggleItem(e[n], t);
      },
      _getAvailableTarget: function (e) {
        if (!a._$isNumber(e)) e = 0;
        else if (e <= 0) e = 0;
        else if (e >= this.items.length) e = this.items.length - 1;
        return e;
      },
      _addStyle: function () {
        i._$addClassName(this.$content, 'ux-slider-switcher-content');
        this._judgeAutoAddStyle();
      },
      _judgeAutoAddStyle: function () {
        if (this.data.autoAddStyle)
          if (this.data.horizontal) {
            i._$addClassName(this.$content, 'ux-slider-switcher-content-h');
            for (var e = 0; e < this.$items.length; e++)
              i._$addClassName(this.$items[e], 'ux-slider-switcher-item-h');
          } else i._$addClassName(this.$content, 'ux-slider-switcher-content-v');
      },
      refresh: function () {
        this.$content = i._$getByClassName(this.$self, this.data.contentClass)[0];
        this.$items = i._$getByClassName(this.$self, this.data.itemClass);
        if (this.data.visibilityControl) {
          this.toggleAllItems(this.$items, !1);
          this.toggleItem(this.$items[this.data.index], !0);
        }
        this._addStyle();
        this._computeItems(this.$items);
      },
      _computeItems: function (e) {
        this.items = [];
        for (var t = 0; t < e.length; t++)
          this.items[t] = {
            x: e[t].offsetLeft,
            y: e[t].offsetTop,
            width: e[t].offsetWidth,
            height: e[t].offsetWidth,
            elem: e[t],
          };
        this.total = e.length;
      },
      _translateX: function (e, t) {
        i._$style(e, { transform: 'translateX(' + t + 'px)' });
      },
      _translateY: function (e, t) {
        i._$style(e, { transform: 'translateY(' + t + 'px)' });
      },
      _judgeProperty: function (e) {
        if (!e.contentClass) throw new Error('contentClass为必传项！');
        if (!e.itemClass) throw new Error('itemClass为必传项！');
      },
      onDel: function (e) {
        this.refresh();
      },
    });
    return c;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'df98fb910329ece5ef54724a396ad027',
);
