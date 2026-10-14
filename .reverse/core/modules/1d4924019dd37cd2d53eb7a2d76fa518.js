EDU(
  '1d4924019dd37cd2d53eb7a2d76fa518',
  function (Modal) {
    var g = window,
      o = NEJ.O,
      u = NEJ.P('nej.u'),
      e = NEJ.P('nej.e'),
      eu = NEJ.P('edu.u'),
      _teacherTpl = e._$addHtmlTemplate(
        '{if defined("xlist")&&!!xlist.length}{list xlist as x}\t\t\t\t{if x_index != 0}<span class="f-fc9">、<span>{/if}\t\t\t\t<a class="f-fc9" href="${prefix.memberPrefix}${x.subfixUrl|escape}" target="_blank">${x.realName}</a>\t\t\t{/list}{/if}',
      );
    var _getTeacherListByType = function (e, t) {
      var n = [];
      u._$forEach(e, function (e, i) {
        if (e.lectorType === t) n[n.length] = e;
      });
      return n;
    };
    var _doManipulateTerm = function (e) {
      e.isOver = eu._$getCurServerTime() - e.endTime > 0;
      e.offsetStartDay = Math.ceil((e.startTime - eu._$getCurServerTime()) / 864e5);
      e.isStart = eu._$getCurServerTime() - e.startTime > 0;
      var t = e.endTime - e.startTime,
        n = eu._$getCurServerTime() - e.startTime;
      e.termLength = Math.ceil(t / 6048e5);
      e.onProgress = Math.ceil(n / 6048e5);
      e.onProgressPercent = Math.ceil((100 * n) / t);
      return e;
    };
    var _doJoinLinks = function (e) {
      var t = e.termPanel,
        n =
          e.mode == eu.CONST.MODE_MOOC
            ? g.urlPrefix.courseInfoPrefix
            : g.urlPrefix.spocCourseInfoPrefix,
        i =
          e.mode == eu.CONST.MODE_MOOC
            ? g.urlPrefix.courseLearnPrefix
            : g.urlPrefix.spocCourseLearnPrefix;
      e.infoUrl =
        n +
        encodeURIComponent(e.schoolPanel.shortName || e.schoolPanel.schoolSN) +
        '-' +
        encodeURIComponent(e.id);
      e.learnUrl =
        i +
        encodeURIComponent(e.schoolPanel.shortName || e.schoolPanel.schoolSN) +
        '-' +
        encodeURIComponent(e.id) +
        '?tid=' +
        t.id;
      e.scoreUrl =
        i +
        encodeURIComponent(e.schoolPanel.shortName || e.schoolPanel.schoolSN) +
        '-' +
        encodeURIComponent(e.id) +
        '#' +
        eu.umi('learnScore');
      if (t) {
        e.certUrl = 'cert/downCert.htm?termId=' + t.id;
        e.certChargeUrl = 'cert/downChargeCert.htm?termId=' + t.id;
        e.scoreUrl =
          i +
          encodeURIComponent(e.schoolPanel.shortName || e.schoolPanel.schoolSN) +
          '-' +
          encodeURIComponent(e.id) +
          '?tid=' +
          t.id +
          '#' +
          eu.umi('learnScore');
      }
      if (t && e.currentTermId != t.id) e.infoUrl = e.infoUrl + '?tid=' + t.id;
      return e;
    };
    var _highlight = function (_arr) {
      u._$forEach(_arr, function (_item) {
        _item.realName = _item.realName.replace(
          eval('/' + eu._$escapeRegText(g.search) + '/gi'),
          function () {
            return '<span class="f-fcorange f-ib">' + arguments[0] + '</span>';
          },
        );
      });
      return _arr;
    };
    var _highlightStr = function (e) {
      return e.replace(/{##([^{}]+)##}/g, function () {
        return '<span class="f-fcorange f-ib">' + arguments[1] + '</span>';
      });
    };
    var _formatCourseCard = function (t) {
      var n = {},
        i = [],
        o = [];
      u._$forIn(t, function (e, t) {
        n[t] = e;
      });
      if (n.termPanel) {
        if (!n.termPanel.bigPhotoUrl) n.imgUrl = g.imageUrlMap.img_default_course;
        else n.imgUrl = eu._$scalePicDynamic(n.termPanel.bigPhotoUrl, 223, 125);
        n.termPanel = _doManipulateTerm(n.termPanel);
        n.recmendContent = eu._$string2object(n.termPanel.jsonContent || '').spContent;
        if (eu._$getCharsL(n.recmendContent) > 190)
          if (n.recmendContent.indexOf('##') > 88) {
            n.recmendContent =
              n.recmendContent.substr(0, 60) +
              '…' +
              n.recmendContent.substr(n.recmendContent.indexOf('##') - 1);
            n.recmendContent = eu._$sliceCnAndEns(n.recmendContent, 190) + '…';
            if (n.recmendContent.lastIndexOf('{##') > n.recmendContent.lastIndexOf('##}'))
              n.recmendContent =
                n.recmendContent.substring(0, n.recmendContent.lastIndexOf('{##')) + '…';
          } else {
            n.recmendContent = eu._$sliceCnAndEns(n.recmendContent, 190) + '…';
            if (n.recmendContent.lastIndexOf('{##') > n.recmendContent.lastIndexOf('##}'))
              n.recmendContent =
                n.recmendContent.substring(0, n.recmendContent.lastIndexOf('{##')) + '…';
          }
        n.recmendContent = _highlightStr(eu._$filterText(n.recmendContent));
        if (t.termPanel.lectorPanels) {
          i = _getTeacherListByType(t.termPanel.lectorPanels, eu.CONST.REL_TYPE_TERM_CHIEF_LECTOR);
          o = _getTeacherListByType(t.termPanel.lectorPanels, eu.CONST.REL_TYPE_TERM_LECTOR);
        }
        n.mainTeacher =
          e._$getHtmlTemplate(_teacherTpl, { xlist: _highlight(i), prefix: g.urlPrefix }) || '';
        n.teacherList = e._$getHtmlTemplate(_teacherTpl, {
          xlist: _highlight(o),
          prefix: g.urlPrefix,
        });
        if (n.teacherList) n.teacherList = '<span class="f-fc9">、<span>' + n.teacherList;
        n.teacherList = n.mainTeacher + n.teacherList;
        if (o.length > 0) n.mainTeacher += '<span class="f-fc9">等</span>';
      } else n.termPanel = {};
      if (n.schoolPanel) n = _doJoinLinks(n);
      return n;
    };
    eu._$formatCourseData = function (e) {
      var t = [];
      if (e && u._$isArray(e))
        u._$forEach(e, function (e, n) {
          t[n] = _formatCourseCard(e);
        });
      return t;
    };
    eu._$formatCourseCard = function (e) {
      if (e) return _formatCourseCard(e);
      else return {};
    };
    eu._$convertUnitAnchors = function (e) {
      var t = null;
      if (e && e.length) {
        t = [];
        u._$forEach(e, function (e, n) {
          e.time = parseInt(e.anchor);
          t.push(e);
        });
      }
      return t;
    };
    eu._$getCourseLecOrAssists = function (e, t) {
      var n = null;
      u._$forEach(e, function (e, i) {
        if (e && e.memberId == t) n = e;
      });
      return n;
    };
    eu._$isOrdinaryEditorForCourse = function (e) {
      var t = !1;
      u._$forEach(e, function (e, n) {
        if (eu._$getWebUser().id == e.id) t = !0;
      });
      return t;
    };
    eu._$isTermFrozen = function (e) {
      if (!e && g.termDto && g.termDto.endTime) e = g.termDto.endTime;
      if (!g.termDto) return !0;
      var t = eu._$getCurServerTime() - e;
      if (t >= g.termDto.timeToFreeze) {
        Modal.alert(
          '与学生成绩相关的评分规则、学生成绩管理、查看课程数据、学期计分等设置已被冻结！',
          '提示',
        );
        return !1;
      }
      return !0;
    };
    eu._$isForumJustShow = function () {
      if (g.forumType == eu.CONST.FORUM_TYPE_ELITE) return eu.CONST.FORUM_FORBID_ELITE;
      if (g.mergedClosedStatus == eu.CONST.MERGED_CLOSED_STATUS_CLOSED)
        return eu.CONST.FORUM_FORBID_CLOSED;
      if (g.bannedState && (g.bannedState.site > 0 || g.bannedState.term > 0))
        return eu.CONST.FORUM_FORBID_USERFORBID;
      else return eu.CONST.FORUM_FORBID_NORMAL;
    };
    eu._$isSpocSync = function () {
      return !!g.moocTermDto;
    };
    eu._$isTpSpoc = function () {
      return !!g.termDto && g.termDto.mode > 0;
    };
    eu._$isSpocToMooc = function (e) {
      return e
        ? e.mode == eu.CONST.MODE_MOOC &&
            (e.fromCourseMode == eu.CONST.MODE_SPOC_ONLY ||
              e.fromTermMode == eu.CONST.MODE_SPOC_ONLY) &&
            0 == e.spocToOocStatus
        : !1;
    };
    eu._$isSpocToOoc = function (e) {
      return !(
        !e ||
        e.mode != eu.CONST.MODE_MOOC ||
        (e.fromCourseMode != eu.CONST.MODE_SPOC_ONLY &&
          e.fromTermMode != eu.CONST.MODE_SPOC_ONLY) ||
        1 != e.spocToOocStatus
      );
    };
    eu._$getCertTitle = function (e) {
      return e ? '成绩' : '证书';
    };
    eu._$isSuperAuth = function () {
      var e = location.search,
        t = location.hash.split('?');
      var n = e ? e : t[1] ? '?' + t[1] : '';
      var i = eu._$parseUrlParams(n);
      if (
        i.optname == eu.CONST.SUPER_OPT_USER_NAME &&
        eu._$hasMemberRole(eu.CONST.ROLE_PLATFORM_ADMIN)
      )
        return !0;
      else return !1;
    };
    eu._$getKaoyanCourseLink = function (e, t) {
      var n = '';
      switch (e) {
        case eu.CONST.PRODUCT_TYPE.COURSE:
          n = '//kaoyan.icourse163.org/course/terms/' + t + '.htm';
          break;
        case eu.CONST.PRODUCT_TYPE.COURSE_PACKAGE:
          n = '//kaoyan.icourse163.org/course/packages/' + t + '.htm';
          break;
        case eu.CONST.PRODUCT_TYPE.COLUMN:
          n = '//www.icourse163.org/columns/' + t + '.htm';
      }
      return n;
    };
    return eu;
  },
  'd414623f7407e577cd6c05efff08e96f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'f0c13e1275652ec96e3dd6a413b95cfd',
  'f0b73688b257e4ee4d3a3fafef7aafc1',
  'e165f785e63c4ac5e3c5e01d85b415f7',
  '7d25235071653e00985854a666efc1dd',
  '2bb8201e34729a5791599932a3556da8',
  'e750c75783308017e541f2f3647cfcb7',
  'fe86216ed59e3103a56c42c850d389f0',
  '41a9749ffeb01bbc50889fe3e85ada4f',
);
