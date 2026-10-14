EDU(
  '6f662c68416d97c376fb7e135752a301',
  function (e, t, n) {
    function i(e) {
      if (e) {
        if (!t._$cookie('NTESSTUDYSI'));
        var n = e.split('#')[0];
        if (/\?/g.test(n)) n += '&csrfKey=' + t._$cookie('NTESSTUDYSI');
        else n += '?csrfKey=' + t._$cookie('NTESSTUDYSI');
        if (e.split('#')[1]) n += e.split('#')[1];
        return n;
      }
    }
    n._$getPolyvChannelInfo = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getPolyvChannelInfo.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getPolyvChannelToken = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getPolyvChannelToken.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getChatRoomMaxMemberNum = function (t, n) {
      e._$request(i('/web/j/MocLiveRoomContentRpcBean.getChatRoomMemberNum.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getLiveRoomInfo = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getLiveRoomInfo.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
    n._$getPolyvDircetAuthParm = function (t, n) {
      e._$request(i('/web/j/mocLiveRoomContentRpcBean.getPolyvDircetAuthParm.rpc'), {
        method: 'post',
        type: 'json',
        data: t,
        onload: function (e) {
          n && n(e.result);
        },
      });
    };
  },
  '8a864b627c302d7d1c56bd928b515d1b',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
