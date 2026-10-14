EDU(
  '385da800654a943dec07688305df7b37',
  function (e, t, n, i, o, a, r) {
    var s = e
      .$extends({
        name: 'ux-live-interactive-list',
        config: function () {
          t.extend(this, {});
          t.extend(this.data, {
            connectedList: [],
            chatroomNum: 0,
            defaultAvatar:
              '//edu-image.nosdn.127.net/59528ffa-d99b-4bb8-9f66-2882d9904aa2a.png?imageView&quality=100',
            showChatroomNum: !0,
            isShowOverview: !0,
          });
          this.supr();
        },
        init: function () {
          this.$watch('chatroomNum', function (e, t) {
            if (e !== t) this.$update();
          });
          this.supr();
        },
        destroy: function () {
          this.supr();
        },
        toggle: function () {
          this.data.isShowOverview = !this.data.isShowOverview;
          this.$update();
        },
        updateInteractiveNum: function (e) {
          if ('number' == typeof e) {
            this.data.chatroomNum = e;
            this.$update();
          }
        },
        updateInteractiveList: function (e) {
          this.data.connectedList = e;
          this.$update();
        },
      })
      .filter({
        showDefaultAvatar: function (e) {
          if (e && a.isURL(e)) return e;
          else
            return '//edu-image.nosdn.127.net/59528ffa-d99b-4bb8-9f66-2882d9904aa2a.png?imageView&quality=100';
        },
        shortLength: function (e) {
          if (!e || e.length <= 3) return e;
          else return e.substr(0, 3);
        },
        hideCameraIcon: function (e) {
          return e != r.MICRO_TYPE_DICT.VIDEO;
        },
      });
    return s;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  '8f34a99b20d362b3542aebd517390fc1',
  '268c3257e756ea058b7f5849ce71559d',
  '8cef6083a5dcc1555a6a85163ef158e2',
  'bcf071761289ae1019dcc5e22b391493',
  '2646b793c31afa1c4f8642fa12145cd1',
);
