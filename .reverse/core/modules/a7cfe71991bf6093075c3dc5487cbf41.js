EDU('a7cfe71991bf6093075c3dc5487cbf41', function () {
  return {
    'base-setting': {
      CODE_OK: 0,
      WEBROOT: location.protocol + '//' + location.host,
      ORGROOT: location.protocol + '//' + location.host,
      COURSE_LIST: '${ORGROOT}/admin.htm#${PATH}',
      COURSE_INDEX: '${WEBROOT}/courses/${TID}',
      COURSE_LEARN: '${WEBROOT}/courses/${TID}/learning',
      COURSE_LECTURE: '${WEBROOT}/courses/${TID}/lecture-${LID}',
      ADMIN_CENTER: '${ORGROOT}/${PID}.htm',
      ADMIN_SHOPCART: '${ORGROOT}/admin.htm#/shopCart',
      QUIZ_DO: '${WEBROOT}/courses/${TID}/quiz-${QID}',
      EXAM_DO: '${WEBROOT}/courses/${TID}/exam-${EID}/${SID}',
      QUESTIONNAIRE_DO: '${WEBROOT}/courses/${TID}/questionnaire-${QID}',
      SIGNIN_MOBILE: '${ORGROOT}/mobile/signin/${TID}',
      PORTRAIT_URL: '/res/images/common/default/userface.png',
      WAP_COURSE_INDEX: '${WEBROOT}/wap/courses/${TID}',
      WAP_COURSE_LEARN: '${WEBROOT}/wap/courses/${TID}/learning',
      WAP_COURSE_LECTURE: '${WEBROOT}/wap/courses/${TID}/lecture-${LID}',
      TERMEDIT: '${ORGROOT}/terms/${TID}',
      MICRO_SPECIAL_TERMEDIT: '${ORGROOT}/cp/terms/${TID}',
    },
    'base-export-progress-polling': {
      method: 'GET',
      isPolling: !0,
      url: '/j/org/getProgress.json',
    },
    'base-export-progress-polling-new': {
      method: 'GET',
      isPolling: !0,
      url: '/j/org/export/getProgress.json',
    },
    'base-qrcode-url-get': {
      jsonp: !0,
      notShowLoading: !0,
      url: '//capture-srv.icourse163.org/image/qrcode.do',
      post: function (e) {
        var t = e.res || {};
        t.code = 0;
        t.error = null;
      },
      format: function (e) {
        e.result = (e.res || {}).url;
      },
    },
    'base-logger': {
      product: 'ykt',
      cookie: 'STUDY_UUID',
      sessionKey: 'EDU-LOG-UTM',
      domainRegex: /study\.163\.com/,
      csrf_cookie: 'edu-script-token',
      targets: [{ url: '//log.study.163.com/__utm.gif', method: 'get' }],
    },
  };
});
