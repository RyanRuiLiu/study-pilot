EDU(
  '8fb79401f5c080e87a0d5e25ee0cd608',
  function (e, t, n, i, o) {
    o._$getLiveAuthInfo = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getLiveAuthInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getLiveInfo = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getLiveRoomInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getChatroomAddr = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getChatroomAddr.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$hasLive = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.hasLive.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getVideoInfo = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getVideoInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getChatRoomMemberNum = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getChatRoomMemberNum.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$startLive = function (t, n, i) {
      e._$request({
        url: '/web/j/teacherLiveRpcBean.startVcloudLive.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getImRoomInfo = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getImRoomUserInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getSubscribeStatusBySubscribeChannel = function (t, n, i) {
      e._$request({
        url: '/live/getSubscribeStatusBySubscribeChannel.do',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getNewVcloudClientInfo = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getNewVcloudClientInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$doSubscribeBySubscribeChannel = function (t, n, i) {
      e._$request({
        url: '/live/doSubscribeBySubscribeChannel.do',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$checkLiveEnrollCourseId = function (t, n, i) {
      e._$request({
        url: '/web/j/thirdProductRpcBean.checkLiveEnrollCourseId.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$checkCourseRightsCourseId = function (t, n, i) {
      e._$request({
        url: '//ke-api.icourse163.org/apollo/course-service/web/ykt/courseRights',
        method: 'get',
        data: t,
        onload: n,
        onerror: i,
        cookie: !0,
        notShowLoading: !0,
      });
    };
    o._$enrollCourse = function (t, n, i) {
      e._$request({
        url: '/web/j/mocGoalBean.enrollZyCourse.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        cookie: !0,
        notShowLoading: !0,
      });
    };
    o._$notifyVcloudClient = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.notifyVcloudClient.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getChatRoomMaxMemberNum = function (t, n, i) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getChatRoomMemberNum.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getCountSubscribeMember = function (t, n, i) {
      e._$request({
        url: '/live/getCountSubscribeMember.do',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getColumnInfoByLiveId = function (t, n, i) {
      e._$request({
        url: '/web/j/columnBean.geColumnAndLessonUnitInfoVo.rpc',
        method: 'post',
        data: { contentId: t, contentType: 7 },
        onload: n,
        onerror: i,
        notShowLoading: !0,
      });
    };
    o._$getContactPhone = (function () {
      var t = null;
      var n = null;
      var i = [];
      setInterval(function () {
        if (null !== t && i.length)
          for (; i.length;) {
            var e = i.shift();
            e(t);
          }
      });
      return function (o, a) {
        if (t) o(t);
        else if (n) i.push(o);
        else
          e._$request({
            url: '/web/j/memberBean.getContactPhone.rpc',
            method: 'post',
            onload: function (e) {
              t = e || '';
              o(e);
            },
            onerror: a,
            notShowLoading: !0,
          });
        if (!n) n = (window.webUser && window.webUser.id) || 'contact-phone';
      };
    })();
    o._$getLiveChannelInfo = function (t, n, i) {
      e._$request({
        url: '/web/j/teacherLiveRpcBean.getPolyvChannelInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
      });
    };
    o._$getLiveUrl = function (t, n, i) {
      e._$request({
        url: '/web/j/mocMemberLiveRoomRpcBean.getLiveUrl.rpc',
        method: 'post',
        data: t,
        onload: n,
        onerror: i,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '06fd65927611e25c8b5ce3f72c6ce481',
  'fe86216ed59e3103a56c42c850d389f0',
);
