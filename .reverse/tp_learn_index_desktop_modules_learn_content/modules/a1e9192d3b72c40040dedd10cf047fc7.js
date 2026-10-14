EDU(
  'a1e9192d3b72c40040dedd10cf047fc7',
  function (e, t, n, i, o, a, s, r, c, d, l) {
    var _ = window,
      u = NEJ.O,
      f = NEJ.F,
      h = NEJ.P('nej.e'),
      p = NEJ.P('nej.v'),
      m = NEJ.P('edu.u'),
      b = NEJ.P('nej.u'),
      g = NEJ.P('edu.d'),
      v;
    var E = { PUBLISH: 2, CLOSED: 3, GENERATING: 1, PART_OF_FAIL: 4, FAIL: 5 };
    var w = {};
    w[E.PUBLISH] = 'AIGC内容已生成';
    w[E.CLOSED] = 'AIGC内容已关闭';
    w[E.GENERATING] = 'AIGC内容生成中';
    m._$$LessonNormal = NEJ.C();
    v = m._$$LessonNormal._$extend(m._$$UIBase, !0);
    v.__initXGui = function () {
      this.__seed_html = h._$addNodeTemplate(
        h._$getHtmlTemplate('jst-learnLessonNormal', {
          lang: (window.moocConfig || {}).lang || {},
          isEn: 'en' === window.currentLanguage,
        }),
      );
    };
    v.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = h._$getByClassName(this.__body, 'j-name')[0];
      this.__typeNode = h._$getByClassName(this.__body, 'j-typebox')[0];
      this.__icon = h._$getByClassName(this.__body, 'j-icon')[0];
      this.__line = h._$getByClassName(this.__body, 'j-line')[0];
      p._$addEvent(this.__body, 'click', this.__lessonClickHandle._$bind(this, null));
      this.__contentCache = new g._$$COM_Cache_CourseCtCache();
      this.__contentCache._$addEvent(
        'onGetLessonUnitVo',
        function (e) {
          p._$dispatchEvent(window, 'updateCourseVideo', { unit: e, isUnit: !0 });
        }._$bind(this),
      );
    };
    v.__lessonClickHandle = function (t, n, i, a, s, r) {
      o._$userActionLog('learn', _.courseDto.id);
      if (m._$isWap()) {
        var c = {
          课程id: _.courseDto.id,
          学期id: _.termDto.termId,
          lessonId: this.__lessonVo.id,
          lesssonUnitId: t,
        };
        m._$trackEvent('课程详情', '目录课时点击', m._$convertToJSONHex(c));
        if (!window.isEnrolled) {
          alert('请点击下方‘立即参加’后学习');
          return;
        }
        if (l.interceptUnitClick(i)) return;
        this.handleUnitClick(s, i, _.termDto.termId, t, _.courseDto.id, this.__lessonVo.id, a);
      } else {
        m._$trackEvent(
          'normalLesson',
          'click',
          '点击进入普通课时' + (t ? '(点击图标进入：' + t + ')' : ''),
        );
        if (this.__lessonVo.units) {
          if (
            !r &&
            this.__lessonVo.units[0].live &&
            this.__lessonVo.units[0].live.cdnMode == e.OUT_LIVE
          ) {
            if (window.isPreview)
              window.open(
                '/learn/preview/outsideLive.htm?termId=' +
                  this.__lessonVo.termId +
                  '&roomId=' +
                  this.__lessonVo.units[0].live.relatedLiveId,
              );
            else window.open('/learn/outsideLive.htm?id=' + this.__lessonVo.units[0].live.id);
            return;
          }
          if (r && r.live && r.live.cdnMode == e.OUT_LIVE)
            if (window.isPreview)
              window.open(
                '/learn/preview/outsideLive.htm?termId=' +
                  this.__lessonVo.termId +
                  '&roomId=' +
                  r.live.relatedLiveId,
              );
            else window.open('/learn/outsideLive.htm?id=' + r.live.id);
          else {
            var d =
              m.umi('learnContent') +
              '?type=detail&id=' +
              this.__lessonVo.id +
              (t ? '&cid=' + t : '');
            if (this.__syncMooc) d += '&sm=1';
            _.dispatcher._$redirect(d);
          }
        } else m._$$CommonDialog._$showDialog({ type: 1, message: '尚未添加课时单元', modal: !0 });
      }
    };
    v.handleUnitClick = function (e, t, n, i, o, a, s) {
      var r = '/mob/course/{{type}}.htm?tid=' + n + '&uid=' + i + '&cid=' + o + '&lid=' + a;
      switch (1 * t) {
        case m.CONST.LESSONUNIT_VIDEO:
          this.__contentCache._$getLessonUnitVo(s, t, _.isPreview || 0, i);
          if (_._empLessonTypeNode) _._empLessonTypeNode.setAttribute('style', '');
          _._empLessonTypeNode = e;
          _._empLessonTypeNode.setAttribute('style', 'color:#00CC7E');
          break;
        case m.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
          _.location.href =
            '/mooc/main/interactive-courseware/preview?contentId=' +
            encodeURIComponent(s) +
            '&termId=' +
            encodeURIComponent(n) +
            '&unitId=' +
            encodeURIComponent(i);
          break;
        case m.CONST.LESSONUNIT_PDF:
          var c = 'en' === window.currentLanguage;
          _.location.href = (c ? '/en/mooc' : '') + r.replace('{{type}}', 'pdfView');
          break;
        case m.CONST.LESSONUNIT_TEXT:
          _.location.href = r.replace('{{type}}', 'richTextView');
          break;
        case m.CONST.LESSONUNIT_DISCUSS:
          _.location.href = '/learn/netease-' + _.courseDto.id + '/wapForumDetail/?pid=' + s;
          break;
        case m.CONST.LESSONUNIT_LIVE:
          _.location.href = '/live/' + s + '.htm';
      }
    };
    v.__notSupport = function (e) {
      m._$$CommonDialog._$showDialog({
        title: '提示',
        message: '请前往中国大学MOOC客户端，完成测验作业考试。',
        modal: 'true',
        okTip: '前往中国大学MOOC',
        customStyle: 'u-callApp-dialog u-hidetitle',
        onclose: function () {
          var t = {
            课程id: _.courseDto.id,
            学期id: _.termDto.termId,
            lessonId: this.__lessonVo.id,
            lesssonUnitId: e,
          };
          m._$trackEvent('课程详情', '目录页app观看关闭', m._$convertToJSONHex(t));
        }._$bind(this),
        okFunc: function () {
          var t = {
            课程id: _.courseDto.id,
            学期id: _.termDto.termId,
            lessonId: this.__lessonVo.id,
            lesssonUnitId: e,
          };
          m._$trackEvent('课程详情', '目录页app观看点击', m._$convertToJSONHex(t));
          n._$getMobToken({}, function (e) {
            if (e)
              m._$openMobileCoursePageByToken((_.courseDto || {}).id, (_.termDto || {}).termId, e);
          });
        }._$bind(this),
      });
    };
    v.__getAigcStatus = function (e) {
      var t = w[e.aiStatus] || '';
      return window.isPreview && t ? '<span class="tag aiStatus">' + t + '</span>' : '';
    };
    v.__handleTypeIcon = function () {
      var e = this.__typeNode.parentNode.querySelectorAll('.sourceList');
      for (var t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t]);
      var n = '';
      this.__typeNode.innerHTML = '';
      this.__lessonViewStatus = 0;
      b._$forEach(
        this.__lessonVo.units,
        function (e, t) {
          if (m._$isWap()) {
            n +=
              '<div class="lsicon f-thide ' +
              (e.viewStatus ? 'learned' : '') +
              '" data-cid=' +
              e.id +
              ' data-ctype=' +
              e.contentType +
              ' data-ctid=' +
              e.contentId +
              '><span class="logo">';
            switch (e.contentType) {
              case m.CONST.LESSONUNIT_MUSIC_VIDEO:
                n +=
                  window.moocConfig.lang.KEY_LEARN_VIDEO_3 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_VIDEO:
                n +=
                  window.moocConfig.lang.KEY_LEARN_VIDEO_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_PDF:
                n += 'PDF</span>' + b._$escape(e.name) + '</div>';
                break;
              case m.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
                n += '互动课件</span>' + b._$escape(e.name) + '</div>';
                break;
              case m.CONST.LESSONUNIT_TEXT:
                n +=
                  window.moocConfig.lang.KEY_LEARN_TEXT_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_QUESTION:
                n +=
                  window.moocConfig.lang.KEY_LEARN_TEST_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_DISCUSS:
                n +=
                  window.moocConfig.lang.KEY_LEARN_DISCUSS_2 +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_COLUMN_CONTENT:
                n +=
                  window.moocConfig.lang.KEY_LEARN_AUTIO +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_RELATED_LIVE:
                n +=
                  window.moocConfig.lang.KEY_LEARN_RELATED_LIVE +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_LIVE:
                n +=
                  window.moocConfig.lang.KEY_LEARN_LIVE + '</span>' + b._$escape(e.name) + '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_EXERCISE:
                n +=
                  window.moocConfig.lang.KEY_LEARN_MUSIC_EXERCISE +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_HOMEWORK:
                n +=
                  window.moocConfig.lang.KEY_LEARN_MUSIC_HOMEWORK +
                  '</span>' +
                  b._$escape(e.name) +
                  '</div>';
            }
          } else {
            this.__lessonViewStatus += e.viewStatus ? 1 : 0;
            n +=
              '<div class="f-icon lsicon ' +
              (e.viewStatus ? 'learned' : '') +
              '" data-cid=' +
              e.id +
              ' title=';
            switch (e.contentType) {
              case m.CONST.LESSONUNIT_MUSIC_VIDEO:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_VIDEO_3 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_VIDEO_3 +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_VIDEO:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_VIDEO_2 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_VIDEO_2 +
                  '</div>' +
                  b._$escape(e.name) +
                  this.__getAigcStatus(e) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_PDF:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_DOCUMENT +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_DOCUMENT +
                  '</div>' +
                  b._$escape(e.name) +
                  this.__getAigcStatus(e) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_INTERACTIVE_COURSEWARE:
                n +=
                  '"互动课件' +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">互动课件</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_TEXT:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_TXT_DOCUMENT +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_RICH_TEXT +
                  '</div>' +
                  b._$escape(e.name) +
                  this.__getAigcStatus(e) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_QUESTION:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_QUIZ_QUESTIONS1 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_TEST +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_DISCUSS:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_DISCUSS1 +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_DISCUSS_2 +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_COLUMN_CONTENT:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_AUTIO +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_AUTIO +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_RELATED_LIVE:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_RELATED_LIVE +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_RELATED_LIVE +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_LIVE:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_LIVE +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_LIVE +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_EXERCISE:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_MUSIC_EXERCISE +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_MUSIC_EXERCISE +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
                break;
              case m.CONST.LESSONUNIT_MUSIC_HOMEWORK:
                n +=
                  '"' +
                  this.__lang.KEY_LEARN_MUSIC_HOMEWORK +
                  b._$escape(e.name) +
                  '"><div class="tag ' +
                  (e.viewStatus ? 'learned' : '') +
                  '">' +
                  window.moocConfig.lang.KEY_LEARN_MUSIC_HOMEWORK +
                  '</div>' +
                  b._$escape(e.name) +
                  '</div>';
            }
          }
        }._$bind(this),
      );
      if (n) {
        var i = document.createElement('div');
        i.style.clear = 'both';
        i.style.overflow = 'hidden';
        i.className = 'sourceList';
        i.innerHTML = n;
        var o = h._$getChildren(i);
        if (m._$isWap()) {
          i = document.createElement('div');
          i.innerHTML = n;
          o = h._$getChildren(i);
          this.__typeNode.appendChild(i);
        } else {
          this.__typeNode.parentNode.appendChild(i);
          var a = this.__lessonVo.units.filter(function (e) {
            return !!e.viewStatus;
          }).length;
          var s = i.parentNode.querySelector('.circle');
          if (s) {
            if (!this.__notPreview) s.style.display = 'none';
            else s.style.display = 'block';
            if (a === this.__lessonVo.units.length) s.className = 'circle checked';
            else if (a > 0) s.className = 'circle semichecked';
          }
        }
        b._$forEach(
          o,
          function (e, t) {
            this.__doInitDomEvent([
              [
                e,
                'click',
                function (n) {
                  return function (n) {
                    p._$stop(n);
                    var i = h._$dataset(e, 'cid');
                    var o = h._$dataset(e, 'ctype');
                    var a = h._$dataset(e, 'ctid');
                    this.__lessonClickHandle(i, n, o, a, e, this.__lessonVo.units[t]);
                  }._$bind(this);
                }._$bind(this)(),
              ],
            ]);
          }._$bind(this),
        );
        Array.from(document.querySelectorAll('.sourceList')).forEach(function (e) {
          e.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        });
      }
    };
    v.__handleViewRecord = function () {
      m._$hiddenNode(this.__icon);
    };
    v.__reset = function (e) {
      this.__lang = window.moocConfig.lang;
      this.__supReset(e);
      this.__lessonVo = e.lessonVo;
      this.__nameNode.innerHTML = this.__lessonVo.name || '';
      this.__notPreview = e.notPreview || !1;
      this.__syncMooc = e.syncMooc || !1;
      this.__handleTypeIcon();
      this.__handleViewRecord();
    };
    v.__destroy = function () {
      this.__supDestroy();
    };
  },
  'ef64b877c64ed4138d4b703989241671',
  '8e2e477f7b9e6e134cfe14f830c66a52',
  'c30079064832c51159d1cf37ab222277',
  '892e35f71d7ab44fd31b760aa99d9fa9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '493607ab361630ca82fc5bf094051616',
  'd02f606099112f5cede2764ed0c329fb',
  'ab2bbf87ffa27a1f06950bbbc9c81788',
  '68471111cd34db27f540f48b62615eb2',
  '72082ce7fa131d8e62eb43521a683cd9',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'bf8d09e46d2369efd6e41b29fe211330',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
