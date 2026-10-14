EDU(
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  function (e, t, n, i, o, a, r, s, c) {
    var d = document.createElement('video');
    a.isMobileIncludeIPad = function () {
      var e = window.navigator.userAgent,
        t = new RegExp('(iPad)', 'ig').test(e);
      return t && i._$isMobileAll();
    };
    a.isMobileNotIncludeIPad = function () {
      var e = window.navigator.userAgent,
        t = new RegExp('(iPad)', 'ig').test(e);
      return !t && i._$isMobileAll();
    };
    ((a.supportVideo = function () {
      var e = !!d.canPlayType;
      try {
        d.canPlayType('video/mp4');
      } catch (t) {
        e = !1;
      }
      return e;
    }),
      (a.supportHLS = function () {
        return i._$isMobileAll() || a.supportMSEH264();
      }));
    a.supportFlv = function () {
      return a.supportMSEH264();
    };
    a.supportMSEH264 = function () {
      var e = /Chrome[\/\s]*(\d+)\./i,
        t = !1;
      var n = e.exec(window.navigator.userAgent);
      if (n) if (n[1] && Number(n[1]) <= 49) t = !0;
      var i = window.MediaSource || window.WebKitMediaSource;
      var o = window.SourceBuffer || window.WebKitSourceBuffer;
      var a =
        i &&
        'function' == typeof i.isTypeSupported &&
        i.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
      var r =
        !o ||
        (o.prototype &&
          'function' == typeof o.prototype.appendBuffer &&
          'function' == typeof o.prototype.remove);
      return !!a && !!r && !t;
    };
    a.checkVideoCanPlay = function (e) {
      var t = e.split(';');
      var n = !1;
      for (var i = 0; i < t.length; i++) {
        n = '' != d.canPlayType(t[i]);
        if (n) return n;
      }
      return n;
    };
    ((a.getVideoMIMEType = function (t) {
      if (!t) return !1;
      var n = t.split(/\?/)[0];
      var i = n.split('.');
      var o = i[i.length - 1];
      var a = e.VIDEO_SOURSE_MIME_TYPE[o];
      if (a) return a;
      else return !1;
    }),
      (a.supportTexttrack = function () {}),
      (a.supportVolumeChange = function () {
        try {
          var e = d.volume;
          d.volume = e / 2 + 0.1;
          return e !== d.volume;
        } catch (t) {
          return !1;
        }
      }),
      (a.supportAutoPlay = function (e, t) {
        o.log('check autoplay support');
        if (!e.autoStart) {
          o.log('autoplay close or not support');
          return t(!1);
        }
        if (i._$isMobileAll()) {
          o.log('mobile autoplay');
          return t(e.autoStart);
        }
        var n = navigator.userAgent.toLowerCase(),
          a = !1;
        if (n.indexOf('chrome') > -1 && n.indexOf('66') > -1) a = !0;
        if (e.autoStart && e.mute && a) {
          o.log('chrome can autoplay in ver 66 when mute is true');
          return t(!0);
        }
        var r = document.createElement('video');
        r.autoplay = !0;
        r.src =
          'data:video/mp4;base64,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';
        r.load();
        var s = r.play();
        if (s && s.then)
          s.then(function () {
            o.log('check autoplay complete:true');
            r.pause();
            t(!0);
          })['catch'](function (e) {
            o.log('check autoplay complete:false');
            r.pause();
            t(!1);
          });
        else {
          o.log('check autoplay complete，no promise:true');
          r.pause();
          t(!0);
        }
      }));
    ((a.supportRateChange = function () {
      try {
        var e = d.playbackRate;
        d.playbackRate = e / 2 + 0.1;
        return e !== d.playbackRate;
      } catch (t) {
        return !1;
      }
    }),
      (a.getMediaType = function (e) {
        var t = e.split('?')[0];
        var n = t.split('.'),
          i = '';
        if (n && n.length > 0) i = n[n.length - 1];
        i = i.toLowerCase();
        if ('m3u8' == i) i = 'hls';
        return i;
      }));
    a.formatVideoTime = function (e) {
      e = e || 0;
      var t = parseInt(e / 60);
      var n = parseInt(e % 60);
      return (t < 10 ? '0' + t : t) + ':' + (n < 10 ? '0' + n : n);
    };
    a.formatLiveTime = function (e, n) {
      if (new Date(Number(e)).getFullYear() != new Date().getFullYear())
        if ('en' == window.currentLanguage)
          return t._$formatTime(e, 'yyyy/MM/dd HH:mm') + ' - ' + t._$formatTime(n, 'HH:mm');
        else return t._$formatTime(e, 'yyyy年MM月dd日 HH:mm') + ' - ' + t._$formatTime(n, 'HH:mm');
      if ('en' == window.currentLanguage)
        return t._$formatTime(e, 'MM/dd HH:mm') + ' - ' + t._$formatTime(n, 'HH:mm');
      else return t._$formatTime(e, 'MM月dd日 HH:mm') + ' - ' + t._$formatTime(n, 'HH:mm');
    };
    a.imgReady = (function () {
      var e = [],
        t = null,
        n = function () {
          var t = 0;
          for (; t < e.length; t++) e[t].end ? e.splice(t--, 1) : e[t]();
          !e.length && i();
        },
        i = function () {
          clearInterval(t);
          t = null;
        };
      return function (i, o, a, r) {
        var s,
          c,
          d,
          l,
          u,
          _ = new Image();
        _.src = i;
        if (!_.complete) {
          c = -1;
          d = -1;
          _.onerror = function () {
            r && r(_);
            s.end = !0;
            _ = _.onload = _.onerror = null;
          };
          s = function () {
            l = _.width;
            u = _.height;
            if (l !== c || u !== d) {
              o(_);
              s.end = !0;
            }
          };
          s();
          _.onload = function () {
            !s.end && s();
            a && a(_);
            _ = _.onload = _.onerror = null;
          };
          if (!s.end) {
            e.push(s);
            if (null === t) t = setInterval(n, 40);
          }
        } else {
          o(_);
          a && a(_);
        }
      };
    })();
    return a;
  },
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '89a466f05573f560c156411121b8daae',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'beec6201069596ecb83a09e5fc3eb415',
  'fb7ea872222351a1a18d727c3cc70c47',
);
