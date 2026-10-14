EDU(
  'e3304dcfa1d9e92025c61407dcbc0e30',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    var u = n
      .extend({
        name: 'applyCloudModal',
        data: {
          contentTemplate: e,
          class: 'u-apply-cloud-modal',
          title: '',
          okButton: '',
          cancelButton: '',
          step1: !1,
          step2: !1,
          inputRules: [
            { type: 'isFilled', message: '请输入內容！' },
            { type: 'inputTips', min: 1, max: 20, message: '最长20个字符！' },
          ],
          emailRules: [
            { type: 'isFilled', message: '请输入內容！' },
            { type: 'isEmail', message: '请输入正确的邮箱！' },
          ],
          desRules: [{ type: 'inputTips', max: 200, message: '最长200个字符！' }],
          phoneRules: [
            { type: 'isFilled', message: '请输入內容！' },
            { type: 'inputTips', min: 3, max: 20, message: '最长20个字符！' },
          ],
        },
        config: function () {
          this.supr();
          t.extend(this.data, {});
        },
        init: function () {
          this.supr();
          this.keyUp();
        },
        keyUp: function (e) {
          if (this.data.contactName && this.data.organization && this.data.profession) {
            var t = this.$refs.validationStep1.validate();
            if (!t.success) {
              this.data.step1 = !1;
              this.$update();
              return;
            } else {
              this.data.step1 = !0;
              this.$update();
            }
          } else {
            this.data.step1 = !1;
            this.$update();
          }
        },
        step2: function () {
          if (this.data.step1) {
            this.data.step1 = !1;
            this.data.step2 = !0;
          }
        },
        step1: function () {
          if (this.data.step2) {
            this.data.step2 = !1;
            this.data.step1 = !0;
          }
        },
        submit: function () {
          var e = this.$refs.validationStep2.validate();
          if (e.success)
            r._$applySchool(
              {
                organization: this.data.organization,
                telphone: this.data.telphone,
                contactName: this.data.contactName,
                email: this.data.email,
                profession: this.data.profession,
                description: this.data.description,
                personalStatus: this.data.personalStatus ? 1 : 0,
              },
              function (e) {
                if (e) {
                  this.close();
                  l.show();
                }
              }._$bind(this),
            );
        },
      })
      .filter({})
      .directive({});
    u.showAlreadyTry = function () {
      var e = n.alert(
        "<p class='modal_desc'>若想采购学校云服务，请通过以下方式联系我们，会有采购专员为你服务。</p><div class='contact-info'><div class='contact-phone'><span class='notice'>电话联系</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='phone'>0571 - 89852412</span></div><div class='buy'><span>直接采购</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn ga-click' data-cate='学校云申请试用弹窗' onclick='ysf.open();return false;'>采购专员</a></div></div>",
        '对不起，你已申请试用学校云，无法再次申请试用。',
        '知道了',
      );
      e.data['class'] = 'm-big-modal';
      e.$update();
    };
    u.showDeny = function (e, t) {
      var i = n.alert(
        "<div class='deny-info'><p class='title'>审核拒绝原因：</p><p class='content'>" +
          c._$escape(e) +
          '</p></div>',
        '对不起，你的试用申请未通过审核。',
        '重新申请试用',
      );
      i.data['class'] = 'm-big-modal';
      i.$update();
      i.$on('ok', t);
    };
    u.showAlreadyApply = function () {
      var e = n.alert(
        "<p class='modal_desc'>若想采购学校云服务，请通过以下方式联系我们，会有采购专员为你服务。</p><div class='contact-info'><div class='contact-phone'><span class='notice'>电话联系</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='phone'>0571 - 89852412</span></div><div class='buy'><span>直接采购</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class='btn' onclick='ysf.open();return false;'>采购专员</a></div></div>",
        '对不起，你已申请试用，平台正在审核中，请耐心等待。',
        '知道了',
      );
      e.data['class'] = 'm-big-modal';
      e.$update();
    };
    u.show = function (e) {
      r._$getApplyStatus(
        function (e) {
          if (1 == e.code) u.showAlreadyApply();
          else if (2 == e.code) u.showAlreadyTry();
          else if (3 == e.code)
            u.showDeny(e.message, function () {
              r._$reapplySchool(function (e) {
                var t = {
                  organization: e.organization,
                  telphone: e.telphone,
                  contactName: e.contactName,
                  email: e.email,
                  profession: e.profession,
                  description: e.description,
                  personalStatus: e.personalStatus,
                };
                var n = new u({ data: t });
                return n;
              });
            });
          else {
            var t = new u({ data: e });
            return t;
          }
        }._$bind(this),
      );
    };
    return u;
  },
  '67b45619b18af7a063c59449edaa65d5',
  'ca38b7e137b28e4006cbadb343315267',
  '147dc5970e28e453eca3d302eb318dbe',
  '6ccdab50b3006d28f601b40e94766d9a',
  'a7588bc13862937c065d2df1622e0c7a',
  '2fa4cc846a44d0e7603f51822ebd537b',
  '3849f5eb84c389c7316cc900fb9cda78',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'ff399209d4b47c4c8d7e061e5944c2fb',
  '9f65ffa92a9990bd929e466c4e2348f0',
);
