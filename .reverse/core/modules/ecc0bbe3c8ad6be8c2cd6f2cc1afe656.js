EDU(
  'ecc0bbe3c8ad6be8c2cd6f2cc1afe656',
  function (e, t, n, i, o, a, r) {
    var s = {},
      c = (function () {
        return this;
      })();
    s._$getWebUser = (function () {
      var e = c.webUser || '';
      return function () {
        return e;
      };
    })();
    s._$isUserOwner = function (e, t) {
      return (!!e && e == s._$getWebUser().id) || (!!t && t == s._$getWebUser().loginId);
    };
    s._$uuid = function (e, i, o) {
      var a = (i && o) || 0;
      if ('string' == typeof e) {
        i = 'binary' == e ? new Array(16) : null;
        e = null;
      }
      e = e || {};
      var r = e.random || (e.rng || t)();
      r[6] = (15 & r[6]) | 64;
      r[8] = (63 & r[8]) | 128;
      if (i) for (var s = 0; s < 16; ++s) i[a + s] = r[s];
      return i || n(r);
    };
    s._$getUuidFromCookie = function (e) {
      var t = i._$cookie('uuid');
      e = e || {};
      if (!t) {
        t = s._$uuid();
        i._$cookie('uuid', {
          path: '/',
          domain: '.' + location.hostname,
          value: t,
          expires: e.expireTime || 30,
        });
      }
      return t;
    };
    s._$autoSelf = function () {
      if ('TO_B' == i._$cookie('LOGIN_CHANNEL')) return !0;
      else return !1;
    };
    s._$autoFirstLogin = function () {
      if ('TRUE' == i._$cookie('FIRST_LOGIN')) {
        i._$cookie('FIRST_LOGIN', { expires: -1 });
        return !0;
      }
      return !1;
    };
    return s;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
  '51673b24179dbf87b616a0d2900dafe5',
  'd19ae8965a936b9a65401f821484e1ce',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'fb061c769bfc74628a81f422f590544c',
  'beec6201069596ecb83a09e5fc3eb415',
  'c23a9d4e237326dadfa12366ae1b6e48',
);
