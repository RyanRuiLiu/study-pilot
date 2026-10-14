EDU(
  'ae36493491034dffbe7935b346507647',
  function (e, t, n, i) {
    var o = t.$extends({
      config: function () {
        n.extend(this, {});
        n.extend(this.data, { content: '', isNew: !1, isTeacher: !1, lang: e });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      view: function (e) {
        this.data.isNew = !1;
        var t = i.show(
          this.data.liveId,
          this.data.content,
          e,
          !1,
          this.data.account,
          this.data.clientVersion,
        );
        if (t && t.nt) this.noticeView = t.nt;
      },
      destroy: function () {
        this.supr();
      },
      api: function () {},
      _api: function () {},
    });
    return o;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'f7582f5f94dab534ffaf9c0faac60041',
);
