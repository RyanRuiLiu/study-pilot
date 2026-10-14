EDU(
  '26f449f90f63799f69a9bf96670cc396',
  function (e, t, n, i, o, a) {
    var r = t.$extends({
      name: 'ux-modal',
      config: function (e) {
        o.extend(this.data, {
          title: '',
          content: '',
          okButton: !0,
          cancelButton: !1,
          noClose: !1,
          draggable: !1,
          type: 'warning',
          maskClickHide: !1,
          state: 'gh',
        });
        this.isSingleContent();
        this.supr(e);
      },
      init: function () {
        this.supr();
        if (this.$root === this) this.$inject(document.body);
      },
      destroy: function () {
        this.supr();
      },
      isSingleContent: function () {
        var e = this.data;
        if (!((e.title && e.content) || e.contentTemplate))
          setTimeout(
            function () {
              var e = this.$refs.modalTitle,
                t = this.$refs.modalContent,
                n = this.$refs.modalContentBox;
              if (n && (e || t)) {
                var i = e.offsetWidth,
                  o = t.offsetWidth,
                  a = n.offsetWidth;
                if ((i && i < a) || (o && o < a)) this.$update('isSingleContent', !0);
              }
            }._$bind(this),
          );
      },
      clickMask: function () {
        if (this.data.maskClickHide) this.cancel();
      },
      cancelProgation: function (e) {
        if (this.data.maskClickHide) e.stopPropagation();
      },
      close: function (e) {
        this.$emit('close', { result: e });
        if ('null' != e) e ? this.ok() : this.cancel();
        else {
          this.destroy();
          a.log(this.nodePointer, 'click', 'close');
        }
      },
      ok: function () {
        this.$emit('ok');
        if (!this.data.notDestroy) {
          a.log(this.nodePointer, 'click', 'ok');
          this.destroy();
        } else this.data.notDestroy = !1;
      },
      cancel: function () {
        this.$emit('cancel');
        a.log(this.nodePointer, 'click', 'cancel');
        this.destroy();
      },
      onDragStart: function (e) {
        var t = e.proxy;
        t.style.left = t.offsetLeft + 'px';
        t.style.top = t.offsetTop + 'px';
        t.style.zIndex = '1000';
        t.style.position = 'absolute';
      },
    });
    return r;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '4bc59418e5a019da008c380608492c69',
  'f85d7120c48724ce3338aa4501f72ed5',
  '217dcfc103efb36d2f192eecc4548797',
  'd8c4fef7bea5350977a86242cb988076',
);
