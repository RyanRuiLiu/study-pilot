EDU(
  '753410843e1b2cc8d98c0c96562e78d8',
  function (e, t, n, i, o, a, r, s) {
    console.log(e);
    var c = window,
      d = NEJ.P('edu.u'),
      l = NEJ.P('nej.e'),
      u = NEJ.P('nej.v'),
      _ = NEJ.P('edu.d'),
      f = NEJ.P('nej.u');
    var h = i.extend({
      name: 'identifyStudentModal',
      data: {
        contentTemplate: t,
        class: 'u-identify-student-modal',
        title: '',
        okButton: '',
        cancelButton: '',
        tempStu: { school: '', stuNo: '', name: '', IDCode: '' },
        webUser: c.webUser,
        schoolName: c.schoolName,
        lang: e.exports,
        isEn: e.isEn,
      },
      computed: {
        disableOne: {
          get: function (e) {
            return (this.data.disableOne =
              void 0 != e.checkSchAndNo
                ? 0 != e.checkSchAndNo
                : !(this.$refs.schoolUI.getParams() && e.tempStu.stuNo));
          },
        },
        disableTwo: {
          get: function (e) {
            return (this.data.disableTwo = !(e.tempStu.name && e.tempStu.IDCode));
          },
        },
      },
      config: function () {
        this.supr();
        var t = this;
        n.extend(this.data, {
          step: 1,
          disableOne: !0,
          disableTwo: !0,
          studentNoRules: [
            { type: 'isFilled', message: e.exports.KEY_CLOUD_STU_UTH_SCHOOL_ID_PLEASE },
            {
              type: 'isNotSupported',
              message: e.exports.KEY_CLOUD_STU_AUTH_SCHOOL_ID_ERR,
              method: function (e) {
                return (
                  '' == e ||
                  void 0 == e ||
                  void 0 == t.data.checkSchAndNo ||
                  t.data.checkSchAndNo != -2
                );
              },
            },
            {
              type: 'isVerified',
              message: e.exports.KEY_CLOUD_STU_AUTH_SCHOOL_ID_HAS_BEEN_SINGED,
              method: function (e) {
                return (
                  '' == e ||
                  void 0 == e ||
                  void 0 == t.data.checkSchAndNo ||
                  1 != t.data.checkSchAndNo
                );
              },
            },
          ],
          nameRules: [
            {
              type: 'isNotMatched',
              message:
                e.exports.KEY_CLOUD_STU_AUTH_SCHOOL_ID_NAME_NOT_FIX_ERR + t.data.tempStu.stuNo,
              method: function (e) {
                return (
                  '' == e ||
                  void 0 == e ||
                  void 0 == t.data.checkNameAndID ||
                  t.data.checkNameAndID != -3
                );
              },
            },
          ],
          IDCodeRules: [
            {
              type: 'isNotMatched',
              message:
                e.exports.KEY_CLOUD_STU_AUTH_SCHOOL_ID_VCODE_NOT_FIX_ERR + t.data.tempStu.stuNo,
              method: function (e) {
                return (
                  '' == e ||
                  void 0 == e ||
                  void 0 == t.data.checkNameAndID ||
                  t.data.checkNameAndID != -4
                );
              },
            },
            {
              type: 'isLength',
              message: e.exports.KEY_CLOUD_STU_AUTH_INPUT_SIX_LEN_CODE,
              min: 6,
              max: 6,
            },
          ],
        });
      },
      init: function () {
        this.supr();
        this.snsCache = new _._$$COM_Cache_SnsCache();
        this.snsCache._$addEvent('onGetBindInfo', this.onGetBindInfo._$bind(this));
        this.snsCache._$getBindInfo();
        this.chineseNameObj = {
          '-1': '网易邮箱',
          1: '有道',
          2: '微博',
          3: '人人',
          4: '腾讯QQ',
          5: '企业邮箱',
          6: '微信',
          11: '爱课程',
          20: '企业',
          7: '教务系统',
          90: 'Google',
        };
        this.data.tempStu = { school: '', stuNo: '', name: '', IDCode: '' };
        u._$addEvent(
          this.$refs.modalDialog.parentNode,
          'click',
          function (e) {
            var t = u._$getElement(e),
              n = t.parentNode;
            for (; n && n != this.parentNode;)
              if (l._$hasClassName(n, 'school-ui-content') || l._$hasClassName(n, 'modal_close'))
                return !1;
              else n = n.parentNode;
            this.$refs.schoolUI.hideBoard();
            this.$refs.schoolUI.hideList();
          }._$bind(this),
        );
        document.body.style.overflow = 'hidden';
      },
      onGetBindInfo: function (e) {
        if (e) {
          var t = c.webUser.loginType,
            n = c.webUser.loginId;
          var i = d._$getLoginType();
          if (1 != t && 11 != t) n = e[t];
          this.data.userName = n;
          this.data.typeName = i.name || this.chineseNameObj[d._$getWebUser().loginType];
          this.$update();
        }
      },
      onKeyUp: function (e) {},
      close: function (e) {
        this.supr();
        document.body.style.overflow = 'auto';
      },
      doNext: function (e) {
        if (!this.data.disableOne)
          r._$checkStuVerified(
            {
              schoolName: encodeURIComponent(this.$refs.schoolUI.getParams()),
              number: this.data.tempStu.stuNo,
            },
            function (e) {
              this.verifySchoolAndIDCb(e);
            }._$bind(this),
          );
        else e.event.preventDefault();
      },
      doPrevious: function (e) {
        this.data.step = 1;
      },
      doSuccess: function (e) {
        if (!this.data.disableTwo)
          r._$lastVerified(
            {
              realName: this.data.tempStu.name,
              number: this.data.tempStu.stuNo,
              idCard: this.data.tempStu.IDCode,
              schoolName: encodeURIComponent(this.$refs.schoolUI.getParams()),
            },
            function (e) {
              for (var t in e)
                if (e.hasOwnProperty(t)) {
                  this.data.checkNameAndID = t;
                  if (1 == this.data.checkNameAndID) {
                    var n = e[t];
                    this.data.step = 3;
                    this.data.spocLink = c.urlPrefix.spocUsityIdPrefix + n;
                  }
                }
              this.$update();
              this.$refs.validation2.validate();
            }._$bind(this),
          );
        else e.event.preventDefault();
      },
      stateChange: function (e) {
        if ('step1' == e) {
          this.data.checkSchAndNo = void 0;
          this.$update();
          this.$refs.schoolUI.validate(void 0);
        } else {
          this.data.checkNameAndID = void 0;
          this.$update();
          if ('stuName' == e) this.$refs.validateStuName.validate();
          else if ('IDCode' == e) this.$refs.validateStuID.validate();
        }
      },
      verifySchoolAndIDCb: function (t) {
        for (var n in t)
          if (t.hasOwnProperty(n))
            switch (parseInt(n)) {
              case 0:
                this.data.checkSchAndNo = 0;
                this.data.step = 2;
                this.data.nameRules[0].message =
                  e.exports.KEY_CLOUD_STU_AUTH_SCHOOL_ID_NAME_NOT_FIX_ERR + this.data.tempStu.stuNo;
                this.data.IDCodeRules[0].message =
                  e.exports.KEY_CLOUD_STU_AUTH_SCHOOL_ID_VCODE_NOT_FIX_ERR +
                  this.data.tempStu.stuNo;
                break;
              case -1:
                this.data.checkSchAndNo = -1;
                this.$refs.schoolUI.validate(-1);
                break;
              case -2:
                this.data.checkSchAndNo = -2;
                break;
              case 1:
                this.data.checkSchAndNo = 1;
                var i = t[n];
                var o = [];
                for (var a in i)
                  if (i.hasOwnProperty(a))
                    f._$forEach(i[a], function (e) {
                      var t = { account: e, type: '' };
                      switch (parseInt(a)) {
                        case d.CONST.LOGINTYPE.ICOURSE:
                          t.type = '（爱课程账号）';
                          break;
                        case d.CONST.LOGINTYPE.YOUDAO:
                          t.type = '（有道账号）';
                          break;
                        case d.CONST.LOGINTYPE.WEIBO:
                          t.account = '微博';
                          t.type = '第三方账号';
                          break;
                        case d.CONST.LOGINTYPE.RENREN:
                          t.account = '人人';
                          t.type = '第三方账号';
                          break;
                        case d.CONST.LOGINTYPE.QQ:
                          t.account = 'QQ';
                          t.type = '第三方账号';
                          break;
                        case d.CONST.LOGINTYPE.QIYE163:
                          t.account = '云课堂';
                          t.type = '企业邮';
                          break;
                        case d.CONST.LOGINTYPE.WECHAT:
                          t.account = '微信';
                          t.type = '第三方账号';
                          break;
                        case d.CONST.LOGINTYPE.URS:
                          t.type = '（网易账号）';
                          break;
                        case 90:
                          t.account = 'Google';
                          t.type = '第三方账号';
                      }
                      o.push(t);
                    });
                this.data.accounts = o;
                this.data.showAccounts = !0;
            }
        this.$update();
        this.$refs.validateStuNo.validate();
      },
      enter: function () {},
      leave: function () {},
    });
    h.show = function (e) {
      var t = new h({ data: e });
      return t;
    };
    if (!0) NEJ.copy(NEJ.P('edu.u'), h);
    return h;
  },
  '2f5fec6cee701d8671f51622fe5e3f0c',
  '6132d6e608b7e27625c4d119661f3353',
  'ca38b7e137b28e4006cbadb343315267',
  '147dc5970e28e453eca3d302eb318dbe',
  '6ccdab50b3006d28f601b40e94766d9a',
  '591aed9d1e916324a68ad1da5f72f3fd',
  'a7249557d447d6dcda85dbcdf80899c7',
  '865bba476606f3b1d5979bffa92980b6',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
