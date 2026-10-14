EDU('8d118aed500eb8c7b91ad835708628c5', function () {
  function e(e) {
    var t,
      i = new RegExp('(^| )' + e + '=([^;]*)(;|$)');
    t = document.cookie.match(i);
    if (t) return unescape(t[2]);
    else return null;
  }
  var t = window;
  var i = 'STUDY_INFO';
  var n = {
    '-1': { type: 'urs', name: '网易邮箱' },
    1: { type: 'youdao', name: '有道' },
    2: { type: 'weibo' },
    3: { type: 'renren' },
    4: { type: 'qq' },
    5: { type: 'qiye163' },
    6: { type: 'weixin' },
    7: { type: 'jiaowuxitong', name: '教务系统' },
    8: { type: 'urs_cellphone', name: 'urs 手机账号' },
    11: { type: 'icourse' },
    20: { type: 'enterprise' },
    23: { type: 'corpself' },
    30: { type: 'mobilephone' },
    40: { type: 'enterprise_mobile' },
    50: { type: 'k12campus' },
    60: { type: 'device_id' },
  };
  var a,
    o,
    s = e(i);
  if (s) {
    a = s.split('|')[1];
    if (void 0 !== a) {
      o = n[a];
      if (o) if (t.localStorage) t.localStorage.setItem('LAST_LOGIN_TYPE', o['type']);
    }
  }
});
