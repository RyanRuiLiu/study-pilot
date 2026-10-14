EDU(
  '1c23b43dfd9c054559909485b4169fa4',
  function (e, t, n, i, o, a, s) {
    var r = window,
      c = NEJ.P('edu.d'),
      d = NEJ.P('edu.u');
    var l = (window.moocConfig || {}).lang || {};
    var _ = t.extend({
      config: function () {
        e.extend(this.data, {
          discusFlag: !0,
          contentTemplate: "<span class='u-icon-warning2'></span>请先参加课程再参与讨论。",
          title: '',
          cancelButton: this.data.lang ? this.data.lang.KEY_LEARN_CANCEL : l.KEY_LEARN_CANCEL,
          okButton: this.data.lang ? this.data.lang.KEY_LEARN_JOIN_NOW : l.KEY_LEARN_JOIN_NOW,
          class: 'u-attend-tip',
        });
        if (!this.data.discusFlag)
          this.data.contentTemplate = this.data.lang
            ? this.data.lang.KEY_LEARN_PLEASE_QUIZ
            : l.KEY_LEARN_PLEASE_QUIZ;
        this.supr();
      },
      init: function () {
        this.courseName = r.courseDto.name;
        this.termDto = r.termDto;
        this.$update();
        this.cache = new c._$$COM_Cache_CourseCache();
        this.memberCache = new c._$$COM_Cache_MemberCache();
        this.cache._$addEvent('onStartTermLearn', this.onStartLearnCourseCb._$bind(this));
        this.memberCache._$addEvent('onCheckEmailStatus', this.onCheckEmailStatus._$bind(this));
        this.supr();
      },
      ok: function () {
        this.memberCache._$checkEmailStatus();
        this.supr();
      },
      onCheckEmailStatus: function (e) {
        this.cache._$StartTermLearn(this.termDto.id, null);
      },
      onStartLearnCourseCb: function () {
        r.isEnroll = !0;
        if (this.enrollnotGotoLearn) window.location.reload();
        else r.location.reload();
        this.destroy();
      },
      gotoLearn: function () {
        this.cache._$StartTermLearn(this.termDto.id, null);
      },
      destroy: function () {
        this.supr();
      },
    });
    return _;
  },
  'ca38b7e137b28e4006cbadb343315267',
  'd414623f7407e577cd6c05efff08e96f',
  '891a76809ded82c88f5536f4458ae1ad',
  '93828627ddb358ed890cb65967a0c1de',
  '126d23b5ac6aef1dd83e84a4a70524a3',
  'a936afb5ecab0e9286c3c9d05341571d',
);
