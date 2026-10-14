EDU(
  '088051b8c61eef3a38d043e6c637cbb0',
  function (e) {
    var t = window,
      n = NEJ.P('edu.u');
    return {
      'live-pc': {
        liveUnstartCustomUI: null,
        chatroomConf: {
          showChatroomNum: !0,
          isMemberNumFromRequest: !1,
          isUserLogin: !!window.webUser,
          isSendMsgCreate: !0,
          openMuteOpt: !0,
          openRoomMute: !1,
          openTeammanagerOpt: !0,
        },
        anonymousConf: { loginBtnText: '去登录', loginTipText: '登录后才能参与直播间互动' },
        interactiveConf: { isShowVideoInteractive: !0, isShowAudioInteractive: !0 },
        waterMark: !1,
        notAllowFullScreen: !1,
        screenSharingChromeExtensionId: 'nioplpojiekfbkdaijjoekcbiidobgpa',
      },
      'live-mobile': {
        liveUnstartCustomUI: null,
        chatroomConf: {
          showChatroomNum: !0,
          isMemberNumFromRequest: !1,
          isUserLogin: !!window.webUser,
          isSendMsgCreate: !0,
          openMuteOpt: !0,
          openRoomMute: !1,
          openTeammanagerOpt: !0,
        },
        anonymousConf: { loginBtnText: '去登录', loginTipText: '登录后才能参与直播间互动' },
        waterMark: !1,
        notAllowFullScreen: !1,
        x5Fullscreen: !1,
      },
      'live-helper': {
        chatroomConf: {
          isMemberNumFromRequest: !1,
          isUserLogin: !!window.webUser,
          isSendMsgCreate: !0,
          openMuteOpt: !0,
          openRoomMute: !1,
          openTeammanagerOpt: !0,
        },
        anonymousConf: { loginBtnText: '去登录', loginTipText: '登录后才能参与直播间互动' },
      },
      'cache-live': {
        'live-getInfo': {
          url: e._$getUrlWithCsrfKey('/web/j/mocLiveRoomContentRpcBean.getLiveRoomInfo.rpc'),
        },
        'chat-getAddress': {
          url: e._$getUrlWithCsrfKey('/web/j/mocLiveRoomContentRpcBean.getChatroomAddr.rpc'),
        },
      },
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'f1c1923e72a7bf464958899fa52f322f',
  'd21e14021604149334caa2d8abddbfb2',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
);
