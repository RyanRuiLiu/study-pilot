EDU(
  '15343e9e5cd54986fb9a9452a3eb9adb',
  function (utils, _urlUtil, Const, u) {
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
      if (
        e.isHasCourseRecommendTarget &&
        e.courseRecommendTargetType === Const.COURSE_RECOMMENDATION_TYPE.YOUDAO_JPK
      )
        e.infoUrl = _urlUtil._$addParamToUrl(e.infoUrl, 'outVendor', e.outVendor);
      return e;
    };
    var _highlight = function (_arr) {
      u._$forEach(_arr, function (_item) {
        if (_item.realName)
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
      if (n.type == Const.PRODUCT_TYPE.COURSE) n.imgUrl = utils._$formatImage(n.bigPhoto);
      else if (n.type == Const.PRODUCT_TYPE.COURSE_PACKAGE) {
        n.termPanel.bigPhotoUrl = n.bigPhoto;
        n.orderedCount = n.enrollNum;
        n.infoUrl = '//kaoyan.icourse163.org/course/packages/' + n.packageId + '.htm';
      } else if (n.type == Const.PRODUCT_TYPE.COLUMN) {
        if (!n.termPanel) n.termPanel = {};
        n.termPanel.bigPhotoUrl = n.columnCoverPictureUrl || n.headPhoto;
        n.name = n.columnName;
        n.infoUrl = '/columns/' + n.columnId + '.htm';
      }
      if (n.termPanel) {
        if (!n.termPanel.bigPhotoUrl)
          n.imgUrl = utils._$formatImage(g.imageUrlMap.img_default_course);
        else if (n.type == Const.PRODUCT_TYPE.COURSE_PACKAGE)
          n.imgUrl = utils._$formatImage(n.coverPhoto || n.termPanel.bigPhotoUrl);
        else n.imgUrl = utils._$formatImage(n.termPanel.bigPhotoUrl);
        n.termPanel = _doManipulateTerm(n.termPanel);
        if (n.termPanel.jsonContent && n.termPanel.jsonContent.indexOf('spContent=') == -1)
          n.termPanel.jsonContent = 'spContent=' + n.termPanel.jsonContent;
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
        if (t.termPanel && t.termPanel.lectorPanels) {
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
        if (n.type == Const.PRODUCT_TYPE.COURSE_PACKAGE)
          n.teacherList = '<span class="f-fc9">' + n.teacherNames + '</span>';
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
    eu._$formatCourseList = function (e, t) {
      e = this._$formatCourseData(e);
      if (!t || !t.length) return e;
      u._$forEach(
        t,
        function (e, n) {
          if (e.type == Const.RECOMMENDATION_TYPE.TOPIC) t.splice(n, 1);
        }._$bind(this),
      );
      t = this._$formatRecommendCard(t);
      var n = e.length;
      for (var i = 0; i < n && t.length; i++)
        if (!(i < 2 || i % 2 === 1)) {
          var o = t.shift();
          e.splice(i, 0, o);
        } else;
      return e;
    };
    var getMoocCourseUrl = function (e) {
      var t = g.urlPrefix.courseInfoPrefix;
      infoUrl = t + encodeURIComponent(e.shortName || e.schoolSN) + '-' + encodeURIComponent(e.id);
      return infoUrl;
    };
    var getAdultCourseUrl = function (e) {
      var t = 'https://ke.study.163.com/course/detail/' + e.id;
      return t;
    };
    var _formatRecommendCard = function (e) {
      var t = {};
      t[Const.RECOMMENDATION_TYPE.MOOC] = 'mocCourseBaseCardVo';
      t[Const.RECOMMENDATION_TYPE.KAOYAN] = 'mocCourseKyCardBaseInfoDto';
      t[Const.RECOMMENDATION_TYPE.COLUMN] = 'columnVo';
      t[Const.RECOMMENDATION_TYPE.TOPIC] = 'mobRecommendAdDto';
      t[Const.RECOMMENDATION_TYPE.ADULT] = 'adultCourseCardDto';
      var n = [],
        i = function (e, t) {
          var n = {};
          n[Const.RECOMMENDATION_TYPE.KAOYAN] = eu._$getKaoyanCourseLink(
            Const.PRODUCT_TYPE.COURSE,
            e.termId,
          );
          n[Const.RECOMMENDATION_TYPE.COLUMN] = eu._$getKaoyanCourseLink(
            Const.PRODUCT_TYPE.COLUMN,
            e.columnId,
          );
          n[Const.RECOMMENDATION_TYPE.MOOC] = getMoocCourseUrl(e);
          n[Const.RECOMMENDATION_TYPE.TOPIC] = e.mobLinkUrl;
          n[Const.RECOMMENDATION_TYPE.ADULT] = getAdultCourseUrl(e);
          return n[t];
        },
        o = function (e, t) {
          var n = {},
            o = {};
          n[Const.RECOMMENDATION_TYPE.KAOYAN] = {
            tetmId: e.termId,
            termId: e.termId,
            courseId: e.courseId,
            name: e.courseName,
            teacherId: e.staffId,
            teacherName: e.teacherName,
            teacherPhoto: e.teacherPhoto,
            imgUrl: e.bigPhoto,
            tags: e.tags,
            orderedCount: e.orderedCount || e.enrollNum || 0,
            isHasCourseRecommendTarget: e.isHasCourseRecommendTarget,
            courseRecommendTargetId: e.courseRecommendTargetId,
            courseRecommendTargetType: e.courseRecommendTargetType,
            logData: JSON.stringify({ courseId: e.courseId }),
          };
          n[Const.RECOMMENDATION_TYPE.COLUMN] = {
            id: e.columnId,
            name: e.columnName,
            teacherId: e.columnistId,
            teacherName: e.columnist,
            imgUrl: e.headPhoto,
            shortDesc: e.shortDesc,
            orderedCount: e.orderedCount || 0,
            courseId: e.courseId,
            logData: JSON.stringify({ columnId: e.columnId }),
          };
          n[Const.RECOMMENDATION_TYPE.TOPIC] = {
            id: e.id,
            name: e.name,
            link: e.mobLinkUrl,
            imgUrl: e.link,
            logData: JSON.stringify({ topicId: e.id }),
          };
          n[Const.RECOMMENDATION_TYPE.MOOC] = {
            id: e.id,
            courseId: e.id,
            name: e.name,
            teacherId: e.staffId,
            teacherName: e.teacherName,
            imgUrl: e.bigPhoto,
            orderedCount: e.enrollCount || 0,
            schoolName: e.schoolName,
            schoolSN: e.schoolSN,
            logData: JSON.stringify({ courseId: e.courseId }),
          };
          n[Const.RECOMMENDATION_TYPE.ADULT] = {
            id: e.id,
            courseId: e.id,
            name: e.courseTitle,
            teacherId: e.teacherList && e.teacherList[0] ? e.teacherList[0].id : '',
            teacherName: e.teacherList && e.teacherList[0] ? e.teacherList[0].name : '',
            imgUrl: e.headImg,
            heat: e.heat,
            orderedCount: e.courseSaleNum || 0,
            logData: JSON.stringify({ courseId: e.id }),
          };
          o = n[t];
          o = u._$merge(o, {
            recommendType: t,
            recommendTypeText: Const.RECOMMENDATION_TYPE_TEXT[t],
            infoUrl: i(e, t),
          });
          return o;
        };
      u._$forEach(
        e,
        function (e) {
          console.log('item', e, t[e.type]);
          var i = o(e[t[e.type]], e.type);
          n.push(i);
        }._$bind(this),
      );
      return n;
    };
    eu._$formatRecommendCard = function (e) {
      e = e || [];
      return _formatRecommendCard(e);
    };
    eu._$formatCourseCard = function (e) {
      if (e) return _formatCourseCard(e);
      else return {};
    };
    eu._$convertUnitAnchors = function (e, t) {
      var n = null;
      if (e && e.length) {
        n = [];
        u._$forEach(e, function (e, i) {
          var o = t[e.questionId];
          e.time = parseInt(e.anchor);
          e.type = o ? o.type : 5;
          e.duration = o ? o.duration : 5;
          e.id = o ? o.id : 5;
          e.title = o ? o.title : 5;
          n.push(e);
        });
      }
      return n;
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
        eu._$$CommonDialog._$showDialog({
          type: 1,
          message: '与学生成绩相关的评分规则、学生成绩管理、查看课程数据、学期计分等设置已被冻结！',
        });
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
              e.fromTermMode == eu.CONST.MODE_SPOC_ONLY)
        : !1;
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
    eu._$getCourseIntroLink = function (e, t, n, i) {
      var o = '';
      switch (+e) {
        case Const.COURSE_CARD_TYPE.KAOYAN:
          o = '//kaoyan.icourse163.org/course/terms/' + t + '.htm';
          break;
        case Const.COURSE_CARD_TYPE.PACKAGES:
          o = '//kaoyan.icourse163.org/course/packages/' + t + '.htm';
          break;
        case Const.COURSE_CARD_TYPE.COLUMN:
          o = '//www.icourse163.org/columns/' + t + '.htm';
          break;
        case Const.COURSE_CARD_TYPE.MOOC:
          o =
            i && 'null' != i
              ? '//www.icourse163.org/course/' + i + '-' + t
              : '//www.icourse163.org/course/' + n + '.htm?tid=' + t;
      }
      return o;
    };
    eu._$getYoudaoJPKCourseLink = function (e, t) {
      var n = t ? '?outVendor=' + t : '';
      if (e) return '//ke.youdao.com/course/detail/' + e + n;
      else return '//ke.youdao.com' + n;
    };
    return eu;
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '31921308bcb58962f9350daa19eae1dc',
  '93828627ddb358ed890cb65967a0c1de',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '7ae1049f52447f73129209d74071c691',
  '50ff622f043441ddf14df6a87321feda',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'bf8d09e46d2369efd6e41b29fe211330',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '1d4924019dd37cd2d53eb7a2d76fa518',
  'beec6201069596ecb83a09e5fc3eb415',
);
