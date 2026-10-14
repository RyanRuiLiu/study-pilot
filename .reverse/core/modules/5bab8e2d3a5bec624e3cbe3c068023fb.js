EDU(
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  function (e, t, n) {
    var i = {
      zh: {
        KEY_NO_RIGHT: '没有权限！',
        KEY_NO_COURSE_PUBLISH: '课程未发布，不能操作此功能！',
        KEY_NO_COURSE_IS_DOING:
          '该课程制作者正在重新编辑内容，暂时不可学习，给你带来的不便深表歉意。',
        KEY_NO_COURSE_DELETE: '该课程已删除，给你带来不便深表歉意。你可以选择其他课程学习。',
        KEY_NO_COURSE_SENSITIVE: '输入的内容包含敏感词，不能发布！',
        KEY_NO_COURSE_SPEED: '哎呀，您的网速不太给力，请刷新或稍后再试。',
        KEY_CACHE_CONFIRM: '确认',
        KEY_CACHE_PROMPT: '提示',
      },
      en: {
        KEY_NO_RIGHT: 'Permission denied!',
        KEY_NO_COURSE_PUBLISH: 'Course is not released, cannot operate this function!',
        KEY_NO_COURSE_IS_DOING:
          "The course is being edited by the course's producer. It is not available for the time being. We apologize for the inconvenience.",
        KEY_NO_COURSE_DELETE:
          'The course has been deleted. We apologize for the inconvenience. You can take other courses.',
        KEY_NO_COURSE_SENSITIVE: 'Input content contains sensitive words, cannot be published!',
        KEY_NO_COURSE_SPEED:
          'Oops!your internet speed is not too good, please refresh or try again later.',
        KEY_CACHE_CONFIRM: 'Confirm',
        KEY_CACHE_PROMPT: 'Prompt',
      },
    };
    var o = 'true' === window.isMobilePhone ? n : t;
    var a = 'en' === window.currentLanguage ? i['en'] : i['zh'];
    var r = [],
      s = window,
      c = NEJ.O,
      d = NEJ.F,
      l = NEJ.P('nej.e'),
      u = NEJ.P('nej.j'),
      _ = NEJ.P('nej.u'),
      f = NEJ.P('mb.c'),
      h = NEJ.P('edu.d'),
      p = NEJ.P('edu.u'),
      m = NEJ.P('nej.ut'),
      g,
      b;
    h._$$COM_Cache = NEJ.C();
    g = h._$$COM_Cache._$extend(m._$$Cache);
    b = h._$$COM_Cache._$supro;
    g.__getDWROption = function (e) {
      var t = f._$$VISITOR || c,
        e = e || {};
      e.method = e.method || 'POST';
      if (t.xauthKey) e.headers = { 'Auth-Key': t.xauthKey };
      return e;
    };
    g._$postDWR = function (e) {
      if (!e.notShowLoading && p.showLoading && !e.onlyHideLoading) p.showLoading(e.notShowMask);
      if (!this.__clearLoadingInterval)
        this.__clearLoadingInterval = setInterval(function () {
          if (document.getElementById('loadingMask') && p.hideLoading)
            setTimeout(function () {
              p.hideLoading();
            }, 100);
        }, 100);
      var t = this.__getDWROption(e);
      t.sync = e.sync || !1;
      t.param = e.param;
      t.onload = this.__onloadHandler._$bind(this, e.onload, e.notShowLoading, e.onlyHideLoading);
      t.onerror = this.__errorHandler._$bind(
        this,
        e.onpreError,
        e.onerror,
        e.notShowLoading,
        e.onlyHideLoading,
      );
      t.session = 'NTESSTUDYSI';
      u._$requestByDWR(e.url, t);
    };
    g.__onloadHandler = function (e, t, n, i) {
      e(i);
    };
    g.__errorHandler = function (t, n, i, r, s) {
      if (t) t(s);
      if (n) n(s);
      else {
        var c = (s.message || '').split('_vG_Gv_');
        var d = c[0];
        var l = c[1];
        var u = [];
        if (l) {
          var _ = l.split('&');
          for (var f = _.length; f;) {
            var h = _[--f].split('=');
            u.push({ key: h[0], value: h[1] });
          }
        }
        if (!i)
          switch (d) {
            case 'not_auth':
              e._$getInstance()._$dispatchEvent('showLogin', { from: 'otherauth', aftParams: u });
              break;
            case 'not_access':
              p._$$CommonDialog._$showDialog({ type: 1, message: a.KEY_NO_RIGHT });
              break;
            case 'not_publish':
              p._$$CommonDialog._$showDialog({ type: 1, message: a.KEY_NO_COURSE_PUBLISH });
              break;
            case 'course_edit':
              p._$$CommonDialog._$showDialog({ type: 1, message: a.KEY_NO_COURSE_IS_DOING });
              break;
            case 'course_delete':
              p._$$CommonDialog._$showDialog({ type: 1, message: a.KEY_NO_COURSE_DELETE });
              break;
            case 'keyword':
              p._$$CommonDialog._$showDialog({ type: 1, message: a.KEY_NO_COURSE_SENSITIVE });
              break;
            default:
              d = d && 'Error' != d && d.indexOf('超时') < 0 ? d : a.KEY_NO_COURSE_SPEED;
              if (d.indexOf('服务器返回异常状态') < 0)
                o.alert(d, a.KEY_CACHE_PROMPT, a.KEY_CACHE_CONFIRM);
          }
      }
    };
    return g;
  },
  '44cc1afbd22c08dd5a5091b9cd6a94d8',
  'd414623f7407e577cd6c05efff08e96f',
  'd02f606099112f5cede2764ed0c329fb',
  '74f9cf4eae0cb03f66a18b5e6df66bdb',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '493607ab361630ca82fc5bf094051616',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '30d63ffe089acafaee2be20c82e60486',
  'e84f4ffbabe7f66126ac41b88810c962',
  '30d63ffe089acafaee2be20c82e60486',
  '74f9cf4eae0cb03f66a18b5e6df66bdb',
);
