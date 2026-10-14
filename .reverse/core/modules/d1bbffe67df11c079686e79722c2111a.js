EDU('d1bbffe67df11c079686e79722c2111a', function () {
  return {
    'cellphone-login': { url: '/passport/cellphone/login.htm', hideError: !0 },
    'cellphone-register': { url: '/passport/cellphone/registerAndLogin.htm', hideError: !0 },
    sendcode2Reg: { url: '/passport/cellphone/v2/sendValidationCode.htm', hideError: !0 },
    sendcode2RetrievePwd: { url: '/passport/cellphone/v2/sendValidationCode.htm', hideError: !0 },
    retrievePasswordAndLogin: {
      url: '/passport/cellphone/retrievePasswordAndLogin.htm',
      hideError: !0,
    },
    sendValidationCode2ChangePassword: {
      url: '/passport/cellphone/sendValidationCode2ChangePassword.htm',
      hideError: !0,
    },
    changePassword: { url: '/passport/cellphone/changePassword.htm', hideError: !0 },
    verifyValidationCode: { url: '/passport/cellphone/verifyValidationCode.htm', hideError: !0 },
    getEncryptKey: { url: '/passport/cellphone/getEncryptKey.htm' },
    needVerifyCode: { url: '/passport/cellphone/needVerifyCode.htm' },
    sendVerifyCodeToPhoneNumber: {
      rest: !0,
      method: 'GET',
      url: '/j/cp/provider/sendValidationCode.json',
    },
    checkPhoneAndVerifyCode: {
      rest: !0,
      method: 'GET',
      url: '/passport/cellphone/verifyValidationCode.htm',
    },
    bindMobileToAccount: { url: '/j/order/bindTelPhoneToAccount.do' },
    switchAccount: { url: '/j/order/changeAccountSysOrder.do' },
    'urs-json-script': { url: 'http://webzj.reg.163.com/webapp/javascript/page/json3.js' },
    'urs-message-script': { url: 'https://webzj.reg.163.com/v1.0.1/message.js?v=1452750438' },
  };
});
