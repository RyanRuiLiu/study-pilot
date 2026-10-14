EDU(
  '0e44ded955eba38916ea8a8f0bb1ba19',
  function (e, t, n, i) {
    n.setUTM();
    i.log = function (e) {
      return n.post2server(
        {
          url: 'https://log.study.163.com/api/v1/log.do',
          product: 'eduos',
          format: function (e) {
            return e;
          },
        },
        e,
      );
    };
    i.live = function (n, o, a, r, s) {
      function c() {
        if (l.liveInfo && l.chatInfo && l.userCountInfo) {
          f._$enter({ param: { liveId: n }, data: { userId: o } });
          d = e._$merge(d, { itemType: 'eds_live', itemId: n, userId: o });
          var t = new Date().getTime();
          u = _ = t;
          var a = e._$merge({}, d, {
            actionId: 'eds_live_enter_event',
            onlineWatchTime: 0,
            currentProcess: 0,
            currentHeartTime: t,
          });
          i.log(a);
          console.log('stats', a);
          setInterval(function () {
            var t = new Date().getTime();
            var n = e._$merge({}, d, {
              actionId: 'eds_live_poll_event',
              onlineWatchTime: t - u,
              currentProcess: t - _,
              currentHeartTime: t,
            });
            u = t;
            i.log(n);
            console.log('stats', n);
          }, 6e4);
        }
      }
      var d,
        l,
        u,
        _,
        f = t.Live._$allocate();
      r.$on('updateLiveInfo', function (t) {
        d = e._$merge(d, { itemStatus: t.liveStatus });
        if (!l || !l.liveInfo) {
          d = e._$merge(d, { itemName: t.name });
          l = l || {};
          l.liveInfo = !0;
          c();
        }
      });
      if (s) {
        s.$on('chatroomConnect', function (t) {
          if (!l || !l.chatInfo) {
            d = e._$merge(d, { accid: t.member.account, nickName: a ? a : t.member.nick });
            l = l || {};
            l.chatInfo = !0;
            c();
          }
        });
        s.$on('onlineMemberNumChange', function (t) {
          d = e._$merge(d, { onlineUserCount: t });
          if (!l || !l.userCountInfo) {
            l = l || {};
            l.userCountInfo = !0;
            c();
          }
        });
      }
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '9dc508f2eef931918f19fafe68ba902b',
  'd8c4fef7bea5350977a86242cb988076',
);
