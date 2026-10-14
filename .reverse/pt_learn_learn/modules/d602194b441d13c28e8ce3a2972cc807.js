EDU(
  'd602194b441d13c28e8ce3a2972cc807',
  function (e, t, n, i, a, o, s, r) {
    var c = 'FOLLOW_MOOC_MODAL';
    r = n.$extends({
      name: 'learn-follow-modal',
      css: t,
      data: {},
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.showModal();
      },
      showModal: function () {
        setTimeout(
          function () {
            var t = window.localStorage.getItem('LEARN_PAGE_GLOBAL_CERTIFIED_MODAL');
            if (!t) {
              var n = window.webUser && String(window.webUser.id);
              if (n) {
                var i = JSON.parse(localStorage.getItem(c)) || {};
                if (document.referrer.indexOf('/course/') > -1 && !i[n])
                  a._$getUserIdAlreadyBindedStatus(
                    {},
                    function (t) {
                      if (!t)
                        this.followModal = new o({
                          data: { class: 'learn-follow-modal', contentTemplate: e, okButton: !1 },
                          switchRemind: this.switchRemind._$bind(this),
                        });
                    }._$bind(this),
                  );
              }
            } else window.localStorage.removeItem('LEARN_PAGE_GLOBAL_CERTIFIED_MODAL');
          }._$bind(this),
          2e3,
        );
      },
      switchRemind: function (e) {
        try {
          var t = e.sender.$refs.input.checked;
          var n = JSON.parse(localStorage.getItem(c)) || {};
          var i = n || {};
          var a = String(window.webUser.id);
          i[a] = 1;
          if (t) localStorage.setItem(c, JSON.stringify(i));
        } catch (o) {
          console.log('input错误');
        }
      },
    });
    return r;
  },
  'a245046c4e50175a1d70fb7bd1a8f16c',
  '7cfe5cdb1e8677de3ae5c69574bd174c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'c30079064832c51159d1cf37ab222277',
  'd414623f7407e577cd6c05efff08e96f',
  'bee6fef94cf2beab28b7ff76f5b652a0',
);
