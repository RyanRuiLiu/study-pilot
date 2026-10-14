EDU('d8a791c8df530c3b5233baa074670ed6', function () {
  return {
    'live-getInitInfo': {
      rest: !0,
      method: 'GET',
      notShowLoading: !0,
      url: '//mozart.study.163.com/api/v1/live/{liveId}/init/get',
    },
    'live-enter': {
      rest: !0,
      method: 'GET',
      notShowLoading: !0,
      url: '//mozart.study.163.com/api/v1/live/{liveId}/enter',
    },
    'live-getInfo': {
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/getLiveInfo.json',
    },
    'live-getStraamUrl': {
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/getLiveStream.json',
    },
    'chat-getCurrentMemberNum': {
      method: 'GET',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/getCurrentMemberNum.json',
    },
    'live-getChannelStatus': {
      method: 'GET',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/getChannelStatus.json',
    },
    'live-chatroom-updatenotice': {
      rest: !0,
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/api/v1/live/{liveId}/chatroom/notice/update',
    },
    'live-chatroom-delete-message': {
      rest: !0,
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/api/v1/live/{liveId}/chatroom/msg/del',
    },
    'live-chatroom-getnotice': {
      rest: !0,
      method: 'GET',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/api/v1/live/{liveId}/chatroom/notice',
    },
    'live-chatroom-get-room-mute-status': {
      rest: !0,
      method: 'GET',
      notShowLoading: !0,
      hideError: !0,
      url: '/api/v1/live/{liveId}/mute/info/get',
    },
    'live-chatroom-room-mute': { rest: !0, method: 'POST', url: '/api/v1/live/{liveId}/mute' },
  };
});
