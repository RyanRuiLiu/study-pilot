EDU(
  '523b8ae6cfcaaec42a11754b79f3e8ef',
  function (e, t, n, i) {
    var o = t.$extends({
      config: function () {
        n.extend(this, { crtAgreeListUI: null, hasActiveUI: !1 });
        n.extend(this.data, { AgreeListList: [], hasMask: !1 });
        this.supr();
      },
      init: function () {
        this.showAgreeListUI();
        this.supr();
      },
      pulishAgreeListItem: function (e) {
        this.data.AgreeListList.push(e);
        if (!this.data.hasActiveUI) this.showAgreeListUI();
      },
      showAgreeListUI: function () {
        if (this.data.AgreeListList.length > 0 && !this.data.hasActiveUI) {
          if (this.data.hasMask)
            e._$addClassName(document.body, 'um-user-answer-sheet-AgreeListList-mask');
          var t = this.data.AgreeListList.shift();
          this.crtAgreeListUI = new i({ data: { node: t.node, name: t.name } }).$inject(
            document.body,
          );
          this.data.hasActiveUI = !0;
          this.crtAgreeListUI.$on(
            'finish',
            function () {
              this.data.hasActiveUI = !1;
              this.showAgreeListUI();
            }._$bind(this),
          );
        } else {
          if (this.data.hasMask)
            e._$delClassName(document.body, 'um-user-answer-sheet-AgreeListList-mask');
          return 0;
        }
      },
    });
    return o;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '296e43cf37b540bd21721724b755d42b',
);
