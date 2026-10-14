EDU(
  '8c74319ffdada3b7e6671877fa2ebde1',
  function (e, t, n, i, o, a) {
    a = e.$extends({
      name: 'success-modal',
      css: n,
      config: function () {
        o.extend(
          this.data,
          { contentTemplate: t, class: 'success-modal', okButton: !1, cancelButton: !1 },
          !0,
        );
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    return a;
  },
  'b516785709eb028a7438c7fb930dc640',
  '3b5a24414a187a6dcf61d45a77cc73ee',
  '08db696451d6292d55af5cb4190eef1b',
  '8419259be84b2292fe5117e5d132029e',
  '217dcfc103efb36d2f192eecc4548797',
);
