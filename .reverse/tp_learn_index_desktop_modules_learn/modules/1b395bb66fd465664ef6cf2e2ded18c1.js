EDU(
  '1b395bb66fd465664ef6cf2e2ded18c1',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.ui'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.m'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      _;
    var l = n._$pushCSSText(
      '        .#<uispace> .topinfo{margin-bottom:5px;}        .#<uispace> .tipinfo{margin-top:5px;line-height:20px;width:305px;}        .#<uispace> .tit{height:20px;line-height:20px;padding-bottom:5px;font-size:14px;}        .#<uispace> .dateDay,.dateMin {text-align: center;}        .#<uispace> .timeSet{top:35px;left:0;z-index:3000;}        .#<uispace> .timesetType,.chargeType{margin:5px 15px;}        .#<uispace> .timesetType input, .chargeType input{vertical-align:middle;margin-right:5px;}        .#<uispace> .timesetType label, .chargeType input{vertical-align:middle;}        .#<uispace> .timesetting .timedetail{margin: 5px 0 10px 36px;}        .#<uispace> .timesetting .timedetail .desc{height:30px;line-height:30px;}        .#<uispace> .timesetting .timedetail .dateMinLayer{left:143px;}        .#<uispace> .timesetting .timedetail .dateDayLayer{left:60px;}        .#<uispace> .timeSet .zday a{font-size: 10px;font-family: sans-serif;color: #666;}        .#<uispace> .timeSet .zday .js-extended{color:#ccc;}        .#<uispace> .timeSet .zday .js-selected{background-color:#00A84A;color:#fff;}        .#<uispace> .timeSet .zday th{font-size: 12px;font-family: sans-serif;text-align: center;}        .#<uispace> .timeSet .zact span{font-size: 12px;font-family: sans-serif;}        .#<uispace> .m-feedbackinfo{padding: 5px 0 5px 10px;}        .#<uispace> .u-sugInput .u-btn{margin-left:10px;padding:4px 8px;line-height:22px;}        .#<uispace> .fb{height:22px;}        .#<uispace>\t.fb .m-feedbackinfo{padding:0px;}        .#<uispace>\t.schoollector{vertical-align:middle;margin-right:3px;}        .#<uispace>\t.lectorfrom{height:33px;line-height:33px;margin-left:10px;}        .#<uispace> .u-btn{padding:0 4px;height:30px;line-height:30px;}        .#<uispace> .priceBox{margin-left: 33px;}        .#<uispace> .m-chargableNode{margin-bottom: 20px;}        ',
    );
    var h = n._$addNodeTemplate(
      '\t\t\t<div class="u-caeUI">\t\t\t\t<div class="tit f-f0"><em class="f-sign">*</em>学期负责人</div>\t\t\t\t<div class="f-cb">\t\t\t\t\t<div class="j-text name f-fl"></div>\t\t\t\t\t<div class="f-fl lectorfrom"><input type="checkbox" id="schoollector" class="j-school schoollector"><label class="schoollector" for="schoollector">本校老师</label></div>\t\t\t\t</div>\t\t\t\t<p class="tipinfo f-fc9">保存后，课程负责人将不可再修改。如果查找不到，请电话联系 010-58582372  或发邮件至aina@hep.com.cn进行申请。</p>\t\t\t\t<div class="j-fd fb f-cb"></div>\t\t\t\t<blockquote class="b-20"></blockquote>\t\t\t\t<div class="tit f-f0"><em class="f-sign">*</em>制定学期开课时间和结束时间</div>\t\t\t\t<div class="f-cb timesetting">\t\t\t\t\t<div class="timesetType">\t\t\t\t\t\t<input type="radio" id="exacttimeOk" name="NeteaseAhu" class="j-timesetType">\t\t\t\t\t\t<label for="exacttimeOk">设定具体时间</label>\t\t\t\t\t</div>\t\t\t\t\t<div class="f-cb timedetail f-pr">\t\t\t\t\t\t<div class="desc j-desc f-fl">开课时间：</div>\t\t\t\t\t\t<div class="f-fl timeSet f-cb j-timeSet"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="f-cb timedetail f-pr">\t\t\t\t\t\t<div class="desc j-desc f-fl">结束时间：</div>\t\t\t\t\t\t<div class="f-fl timeSet f-cb j-timeSet"></div>\t\t\t\t\t</div>\t\t\t\t\t<div class="timesetType">\t\t\t\t\t\t<input type="radio" id="exacttimeNotOk" name="NeteaseAhu" class="j-timesetType">\t\t\t\t\t\t<label for="exacttimeNotOk">待定</label>\t\t\t\t\t</div>\t\t\t\t  </div>\t\t\t\t  <div class="j-fd fb f-cb"></div>\t\t\t\t  <div class="j-isChargableNode m-chargableNode">                      <div class="tit f-f0"><em class="f-sign">*</em> 是否收费</div>                      <div class="chargeType">                           <input type="radio" name="isChargable" class="j-chargableType">                           <label for="forFree" class="j-chargeRadio">免费</label>                      </div>                      <div class="chargeType">                           <input type="radio" name="isChargable" class="j-chargableType">                           <label for="forCharge" class="j-chargeRadio">收费</label>                      </div>                      <div class="j-priceBox priceBox">                      </div>\t\t\t\t  </div>\t\t\t  </div>\t\t',
    );
    c._$$TermCreateEditUI = NEJ.C();
    _ = c._$$TermCreateEditUI._$extend(c._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = h;
      this.__seed_css = l;
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__timeSet = n._$getByClassName(this.__body, 'j-timeSet');
      this.__txtNodes = n._$getByClassName(this.__body, 'j-text');
      this.__descNodes = n._$getByClassName(this.__body, 'j-desc');
      this.__fdNodes = n._$getByClassName(this.__body, 'j-fd');
      this.__lectorSchool = n._$getByClassName(this.__body, 'j-school')[0];
      this.__timesetTypeNode = n._$getByClassName(this.__body, 'j-timesetType');
      this.__isChargableNode = n._$getByClassName(this.__body, 'j-isChargableNode')[0];
      this.__chargableTypeNode = n._$getByClassName(this.__body, 'j-chargableType');
      this.__priceBox = n._$getByClassName(this.__body, 'j-priceBox')[0];
      a._$addEvent(this.__lectorSchool, 'click', this.__schoolLectorHandle._$bind(this));
      d._$forEach(
        this.__timesetTypeNode,
        function (e, t) {
          a._$addEvent(e, 'click', this.__timeTypeChange._$bind(this, t));
        }._$bind(this),
      );
      d._$forEach(
        this.__chargableTypeNode,
        function (e, t) {
          a._$addEvent(e, 'click', this.__chargableTypeChange._$bind(this, t));
        }._$bind(this),
      );
    };
    _.__schoolLectorHandle = function () {
      if (this.__lectorSchool.checked) this.__chargeTeacher._$setSchoolId(e.school.id);
      else this.__chargeTeacher._$setSchoolId(null);
    };
    _._$getDto = function () {
      var e = {},
        t = {};
      if (this.__timesetTypeNode[0].checked) {
        e = this.__startTimeUI._$getDate();
        t = this.__endTimeUI._$getDate();
        if (0 == e.totalData || 0 == e.day) {
          this.__fdCourseTime._$showWarnTips(window.moocConfig.lang.KEY_LEARN_START_EMPTY, !0);
          return null;
        }
        if (0 == t.totalData || 0 == t.day) {
          this.__fdCourseTime._$showWarnTips(window.moocConfig.lang.KEY_LEARN_END_EMPTY, !0);
          return null;
        }
        if (t.totalData < e.totalData) {
          this.__fdCourseTime._$showWarnTips(window.moocConfig.lang.KEY_LEARN_END_DATE, !0);
          return null;
        }
      } else if (this.__timesetTypeNode[1].checked) {
        e.totalData = c.CONST.UNDETERMINDED_STARTTIME;
        t.totalData = c.CONST.UNDETERMINDED_ENDTIME;
      }
      if (this.__chiefTeacherId == -1) {
        this.__fdChiefTeacher._$showWarnTips(window.moocConfig.lang.KEY_LEARN_COURSE_EMPTY, !0);
        return null;
      }
      this.__price = c.CONST.FREE_OF_CHARGE_TERM;
      if (this.__chargableTypeNode[0].checked) this.__price = c.CONST.FREE_OF_CHARGE_TERM;
      else if (this.__chargableTypeNode[1].checked && this.__priceUI)
        this.__price = this.__priceUI._$getContent() || 0;
      var i = {
        id: this.__id,
        courseId: this.__courseId,
        chiefTeacherId: this.__chiefTeacherId,
        startTime: e.totalData,
        endTime: t.totalData,
        checked: !!this.__timesetTypeNode[1].checked,
        lector: n._$getByClassName(this.__txtNodes[0], 'j-textarea')[0].value,
        isInSchool: this.__lectorSchool.checked,
        price: this.__price,
      };
      return i;
    };
    _.__chargableTypeChange = function (e) {
      if (0 == e) c._$hiddenNode(this.__priceBox);
      else if (1 == e) c._$showNode(this.__priceBox);
    };
    _.__timeTypeChange = function (e) {
      if (0 == e) {
        n._$delClassName(this.__descNodes[0], 'f-fc9');
        n._$delClassName(this.__descNodes[1], 'f-fc9');
        this.__startTimeUI._$enable();
        this.__endTimeUI._$enable();
        this.__startTimeUI._$setDate(this.__lastStartTime);
        this.__endTimeUI._$setDate(this.__lastEndTime);
      } else if (1 == e) {
        n._$addClassName(this.__descNodes[0], 'f-fc9');
        n._$addClassName(this.__descNodes[1], 'f-fc9');
        this.__lastStartTime = this.__startTimeUI._$getDate().totalData;
        this.__lastEndTime = this.__endTimeUI._$getDate().totalData;
        this.__startTimeUI._$disEnable();
        this.__endTimeUI._$disEnable();
        if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
      }
    };
    _.__genUI = function (t) {
      this.__chargeTeacher = c._$$InfoSuggest._$allocate({
        parent: this.__txtNodes[0],
        labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_COORDINATOR,
        onSelect: function (e) {
          this.__chiefTeacherId = e.lectorId;
        }._$bind(this),
        onDeleteCnt: function () {
          this.__chiefTeacherId = -1;
        }._$bind(this),
        onInputFocus: function () {
          if (this.__fdChiefTeacher) this.__fdChiefTeacher._$hideFeedback();
        }._$bind(this),
        phrase: 'chargeTeacher',
      });
      this.__startTimeUI = c._$$DatepickUI._$allocate({
        parent: this.__timeSet[0],
        onDateClick: function () {
          if (this.__endTimeUI && this.__endTimeUI.__dpUI) this.__endTimeUI.__dpUI._$recycle();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onMinClick: function () {
          if (this.__endTimeUI) this.__endTimeUI._$hideDateMin();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onClick: function () {
          if (this.__endTimeUI) this.__endTimeUI._$hideDateAndHour();
        }._$bind(this),
      });
      if (this.__status == c.CONST.TERMSTATUS_PUBLISHED && t.startTime <= c._$getCurServerTime()) {
        this.__startTimeUI._$disEnable();
        n._$addClassName(this.__descNodes[0], 'f-fc9');
        this.__canModifyTime = !1;
        this.__timesetTypeNode[0].disabled = !0;
        this.__timesetTypeNode[1].disabled = !0;
      } else this.__startTimeUI._$enable();
      this.__endTimeUI = c._$$DatepickUI._$allocate({
        parent: this.__timeSet[1],
        onDateClick: function () {
          if (this.__startTimeUI && this.__startTimeUI.__dpUI)
            this.__startTimeUI.__dpUI._$recycle();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onMinClick: function () {
          if (this.__startTimeUI) this.__startTimeUI._$hideDateMin();
          if (this.__fdCourseTime) this.__fdCourseTime._$hideFeedback();
        }._$bind(this),
        onClick: function () {
          if (this.__startTimeUI) this.__startTimeUI._$hideDateAndHour();
        }._$bind(this),
      });
      if (this.__status == c.CONST.TERMSTATUS_PUBLISHED && t.endTime <= c._$getCurServerTime()) {
        this.__endTimeUI._$disEnable();
        n._$addClassName(this.__descNodes[1], 'f-fc9');
        this.__canModifyTime = !1;
      } else this.__endTimeUI._$enable();
      if (t && t.startTime)
        if (t.startTime == c.CONST.UNDETERMINDED_STARTTIME) {
          this.__timesetTypeNode[1].checked = !0;
          this.__timeTypeChange(1);
        } else {
          this.__timesetTypeNode[0].checked = !0;
          this.__startTimeUI._$setDate(t.startTime);
          this.__endTimeUI._$setDate(t.endTime);
          this.__lastStartTime = t.startTime;
        }
      else {
        this.__timeTypeChange(0);
        this.__timesetTypeNode[0].checked = !0;
      }
      this.__fdChiefTeacher = c._$$FeedBackUI._$allocate({ parent: this.__fdNodes[0] });
      this.__fdChiefTeacher._$hideFeedback();
      this.__fdCourseTime = c._$$FeedBackUI._$allocate({ parent: this.__fdNodes[1] });
      this.__fdCourseTime._$hideFeedback();
      if (t && t.lectorPanels) {
        for (var i = 0; i < t.lectorPanels.length; i++)
          if (
            t.lectorPanels[i].lectorType == c.CONST.REL_TYPE_TERM_CHIEF_LECTOR ||
            null === t.lectorPanels[i].lectorType
          ) {
            if (!t.lectorPanels[i].nickName) t.lectorPanels[i].nickName = '';
            this.__chargeTeacher._$setInitContent(
              t.lectorPanels[i].realName +
                ' (' +
                t.schoolPanel.name +
                ' ' +
                t.lectorPanels[i].nickName +
                ')',
            );
          }
        this.__fdCourseTime._$hideFeedback();
        this.__id = t.id;
      } else this.__id = 0;
      if ('undefined' == typeof t.isInSchool) this.__lectorSchool.checked = !0;
      else this.__lectorSchool.checked = t.isInSchool;
      this.__chargeTeacher._$setSchoolId(e.school.id);
      if (t && t.hasOwnProperty('price')) {
        this.__priceUI = c._$$AccountUI._$allocate({
          parent: this.__priceBox,
          inputWidth: 185,
          inputHeight: 32,
        });
        if (this.__status == c.CONST.TERMSTATUS_PUBLISHED || !this.__supportChargable) {
          d._$forEach(
            this.__chargableTypeNode,
            function (e) {
              e.disabled = !0;
              a._$clearEvent(e, 'click');
            }._$bind(this),
          );
          this.__priceUI._$disableInput();
        } else {
          d._$forEach(
            this.__chargableTypeNode,
            function (e, t) {
              e.disabled = !1;
              a._$addEvent(e, 'click', this.__chargableTypeChange._$bind(this, t));
            }._$bind(this),
          );
          this.__priceUI._$enableInput();
        }
        if (t.price == c.CONST.FREE_OF_CHARGE_TERM) {
          this.__chargableTypeNode[0].checked = !0;
          this.__chargableTypeChange(0);
        } else {
          this.__chargableTypeNode[1].checked = !0;
          this.__priceUI._$setContent(t.price);
          this.__chargableTypeChange(1);
        }
        if (this.__supportChargable || t.price > 0) c._$showNode(this.__isChargableNode);
        else c._$hiddenNode(this.__isChargableNode);
      } else if (this.__supportChargable) {
        if (this.__priceUI) this.__priceUI = c._$$AccountUI._$recycle(this.__priceUI);
        this.__priceUI = c._$$AccountUI._$allocate({
          parent: this.__priceBox,
          inputWidth: 185,
          inputHeight: 32,
        });
        this.__chargableTypeChange(0);
        this.__chargableTypeNode[0].checked = !0;
        this.__chargableTypeChange(0);
        c._$showNode(this.__isChargableNode);
      } else c._$hiddenNode(this.__isChargableNode);
    };
    _.__reset = function (t) {
      t.title = window.moocConfig.lang.KEY_LEARN_SEMESTER_EDITOR;
      t.clazz = 'u-termdialog';
      t.maskClickNotHidden = !0;
      this.__courseId = t.termDto.courseId;
      this.__mode = t.termDto.mode;
      this.__supportChargable = !(
        (this.__mode == c.CONST.MODE_MOOC ? 0 : 1) ||
        (1 == e.school.supportChargeableCourse ? 0 : 1)
      );
      if (t.termDto.lectorPanels) this.__chiefTeacherId = t.termDto.lectorPanels[0].memberId;
      else this.__chiefTeacherId = -1;
      this.__status = t.status || c.CONST.TERMSTATUS_DRAFT;
      this.__canModifyTime = !0;
      this.__recycleUI();
      this.__supReset(t);
      this.__lastStartTime = null;
      this.__lastEndTime = null;
      this.__timesetTypeNode[0].disabled = !1;
      this.__timesetTypeNode[1].disabled = !1;
      this.__canCreateNewTerm = t.canCreateNewTerm || 0;
      this.__genUI(t.termDto);
    };
    _.__recycleUI = function () {
      if (this.__chargeTeacher)
        this.__chargeTeacher = c._$$InfoSuggest._$recycle(this.__chargeTeacher);
      if (this.__startTimeUI) this.__startTimeUI = c._$$DatepickUI._$recycle(this.__startTimeUI);
      if (this.__endTimeUI) this.__endTimeUI = c._$$DatepickUI._$recycle(this.__endTimeUI);
      if (this.__fdChiefTeacher)
        this.__fdChiefTeacher = c._$$FeedBackUI._$recycle(this.__fdChiefTeacher);
      if (this.__fdCourseTime) this.__fdCourseTime = c._$$FeedBackUI._$recycle(this.__fdCourseTime);
      if (this.__priceUI) this.__priceUI = c._$$AccountUI._$recycle(this.__priceUI);
    };
    _.__closeHandle = function () {
      this.__recycleUI();
      this._$hide();
    };
    _.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
  },
  'c8e2f94428503238a8e7e3be165a1b18',
  '02c14b544f21e379de73ba82b326d2a9',
  '4e864010811e0e31c689fda70e8a9dc7',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '93828627ddb358ed890cb65967a0c1de',
  '7ae1049f52447f73129209d74071c691',
  'cdf25b5b7ebe60e2b3e1f74f71d61de8',
  '68140d527eabb13c83a92c899000ea65',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
