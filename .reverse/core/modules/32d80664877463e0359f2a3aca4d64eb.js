EDU('32d80664877463e0359f2a3aca4d64eb', function () {
  return {
    'login-set-login-set-get': { method: 'GET', url: '/api/login-set/get' },
    'login-set-login-set-list': { method: 'GET', url: '/api/login-set/list' },
    'login-set-login-set-create': { url: '/api/login-set/create' },
    'login-set-login-set-delete': { url: '/api/login-set/delete' },
    'login-set-login-set-update': { url: '/api/login-set/update' },
    'login-set-login-set-sort': { url: '/api/login-set/sort' },
    'login-set-check-urs-switch': {
      method: 'GET',
      url: '/passport/cellphone/isUrsCellphoneActive.htm',
    },
    'login-set-bind-urs-phone': { method: 'GET', url: '/passport/member/bindUrsCellphone.htm' },
    'login-set-get-login-qr-code': { method: 'GET', url: '/logonByQRCode/code.do' },
    'login-set-polling-scan-status': { method: 'GET', url: '/logonByQRCode/poll.do' },
  };
});
