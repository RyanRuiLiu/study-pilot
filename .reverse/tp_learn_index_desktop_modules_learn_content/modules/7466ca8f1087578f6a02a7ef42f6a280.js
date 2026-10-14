EDU('7466ca8f1087578f6a02a7ef42f6a280', function () {
  return {
    'live-interactive-get': { method: 'GET', url: '/api/interactive/get' },
    'live-interactive-list': { method: 'GET', url: '/api/interactive/list' },
    'live-interactive-create': { url: '/api/interactive/create' },
    'live-interactive-delete': { url: '/api/interactive/delete' },
    'live-interactive-update': { url: '/api/interactive/update' },
    'live-interactive-sort': { url: '/api/interactive/sort' },
    'live-interactive-info-get': {
      method: 'GET',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/interactive/info/get',
    },
    'live-interactive-microphone-request': {
      rest: !0,
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/microphone/request',
    },
    'live-interactive-microphone-cancel': {
      rest: !0,
      method: 'POST',
      notShowLoading: !0,
      hideError: !0,
      url: '//mozart.study.163.com/j/live/microphone/cancel',
    },
    'live-interactive-presenter-inform': {
      url: '//mozart.study.163.com/j/presenter/informServer.do',
      notShowLoading: !0,
    },
    'live-interactive-vcloudNoticeLive': {
      url: '//mozart.study.163.com/j/live/vcloudNoticeLive.do',
      notShowLoading: !0,
    },
    'live-interactive-isUpdateVersion': {
      url: '//mozart.study.163.com/j/live/updateVersion.json',
      notShowLoading: !0,
    },
    'live-interactive-liveClientCrash-log': {
      url: '//log.study.163.com/qyy/liveClientCrash/log.do',
      notShowLoading: !0,
    },
    'live-interactive-getscreenlocation': {
      url: '//mozart.study.163.com/api/v1/live/{liveId}/info/get',
      rest: !0,
      notShowLoading: !0,
    },
  };
});
