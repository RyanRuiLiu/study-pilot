EDU(
  '72082ce7fa131d8e62eb43521a683cd9',
  function (e, t, n, i, o, a) {
    var s = {};
    var r = window;
    var c = NEJ.P('edu.u');
    s.cannotView = function () {
      var e = t.getTermProgressStatus(r.termDto);
      var i = function () {
        if (t.isEnded(e)) return e == n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_INVISIBLE;
      };
      var o = function () {
        if (t.isEnded(e))
          return e == n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ENROLLED_USERS;
      };
      return i() || (o() && !r.isEnrolled);
    };
    s.interceptUnitClick = function (e, t) {
      e = void 0 !== e ? parseInt(e) : e;
      console.log('ctype', e);
      if (r.isSpoc) {
        if (e === c.CONST.LESSONUNIT_VIDEO) return !1;
        this.__notSupport(void 0, t);
        return !0;
      }
      if (!i._$isLogin()) {
        i._$login();
        return !0;
      }
      if (this.cannotView()) {
        o.alert(window.moocConfig.lang.KEY_LEARN_SORRY_MATERIALS);
        return !0;
      }
      var n = a.isEn()
        ? [
            c.CONST.LESSONUNIT_QUESTION,
            c.CONST.LESSONUNIT_DISCUSS,
            c.CONST.LESSONUNIT_LIVE,
            c.CONST.LESSONUNIT_COLUMN_CONTENT,
          ]
        : [c.CONST.LESSONUNIT_QUESTION];
      if (n.indexOf(e) !== -1 || void 0 === e) {
        this.__notSupport(void 0, t);
        return !0;
      }
      if (e !== c.CONST.LESSONUNIT_VIDEO)
        if (!r.isEnrolled) {
          o.alert(
            window.moocConfig.lang.KEY_LEARN_TAKE_CONTENT,
            '',
            window.moocConfig.lang.KEY_LEARN_UNDERSTOOD,
          );
          return !0;
        }
    };
    s.__notSupport = function (t, n) {
      if (!n)
        if (!a.isEn())
          c._$$CommonDialog._$showDialog({
            title: window.moocConfig.lang.KEY_LEARN_PROMPT,
            message: '请前往中国大学MOOC客户端，完成测验作业考试。',
            modal: 'true',
            okTip: '前往中国大学MOOC',
            customStyle: 'u-callApp-dialog u-hidetitle',
            okFunc: function () {
              e._$getMobToken({}, function (e) {
                if (e)
                  c._$openMobileCoursePageByToken(
                    (r.courseDto || {}).id,
                    (r.termDto || {}).termId,
                    e,
                  );
              });
            },
          });
        else
          c._$$CommonDialog._$showDialog({
            title: '',
            message:
              'Sorry,this type of courseware only supports for web side.Please go to web learn.',
            modal: 'true',
            okTip: 'OK',
            customStyle: 'u-callApp-dialog u-hidetitle',
          });
      else {
        console.log('isRedirctToNewExam', n);
        if (!i._$isLogin()) {
          i._$login();
          return;
        }
        if (this.cannotView()) {
          o.alert(window.moocConfig.lang.KEY_LEARN_SORRY_MATERIALS);
          return;
        }
        if (!r.isEnrolled) {
          o.alert(
            window.moocConfig.lang.KEY_LEARN_TAKE_CONTENT,
            '',
            window.moocConfig.lang.KEY_LEARN_UNDERSTOOD,
          );
          return;
        }
        location.href = n;
      }
    };
    return s;
  },
  'c30079064832c51159d1cf37ab222277',
  'ab2bbf87ffa27a1f06950bbbc9c81788',
  '68471111cd34db27f540f48b62615eb2',
  '493607ab361630ca82fc5bf094051616',
  'd02f606099112f5cede2764ed0c329fb',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '93828627ddb358ed890cb65967a0c1de',
  '342ad7ae4eea50c3cad860686650a915',
  'ab6af9f7e26b55b8c5a875bba5679347',
);
