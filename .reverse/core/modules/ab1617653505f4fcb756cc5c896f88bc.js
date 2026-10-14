EDU(
  'ab1617653505f4fcb756cc5c896f88bc',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    t = r.mixinExtendsWithTheming(t);
    var f = new l.CourseComment();
    _ = t.$extendsWithTheming({
      name: 'ux-mooc-comment-course-comment-modal',
      data: {
        courseId: void 0,
        termId: void 0,
        courseCoverImageUrl: '',
        mode: s.MODE.VERBOSE,
        schoolShortName: '',
        gaCategory: '',
        modalTitle: u.KEY_COMMENT_PUBLISH_COMMENT + '{courseName}' + u.KEY_COMMENT_EVALUATE1,
        evaluation: { courseName: '', rate: 0, originContent: '', id: null },
        isHovered: !1,
        rateRules: [
          {
            type: 'custom',
            method: function (e) {
              return (parseFloat(e) || 0) > 0;
            },
            message: u.KEY_COMMENT_PLEASE_SCROE,
          },
        ],
      },
      config: function () {
        this.supr();
      },
      init: function () {
        this._initEventListeners();
        this.supr();
      },
      _initEventListeners: function () {
        this.$refs &&
          this.$refs.Rate &&
          this.$refs.Rate.$on(
            'rating',
            function (e) {
              this.data.rate = e;
              this.$update();
            }._$bind(this),
          );
      },
      computed: {
        hoverVisibility: function () {
          return this.data.isHovered ? 'opacity-0' : '';
        },
        cancelBtnText: function () {
          return this.computed.isSimple.get(this)
            ? this.data.lang.KEY_COMMENT_COMMENT_NUO
            : this.data.lang.KEY_COMMENT_CANCEL;
        },
        isVerbose: function () {
          return this.data.mode === s.MODE.VERBOSE;
        },
        isSimple: function () {
          return this.data.mode === s.MODE.SIMPLE;
        },
        ratingTip: function () {
          var e = parseFloat(this.data.evaluation.rate);
          var t = 1;
          var n = 2;
          var i = 3;
          var o = 4;
          var a = 5;
          if (e)
            if (e <= t) return this.data.lang.KEY_COMMENT_DISAPPOINTED;
            else if (e <= n) return this.data.lang.KEY_COMMENT_NEEDS_IMPORVEMENT;
            else if (e <= i) return this.data.lang.KEY_COMMENT_ACTUALLY_BETTER;
            else if (e <= o) return this.data.lang.KEY_COMMENT_REALLY_GOOD;
            else if (e <= a) return this.data.lang.KEY_COMMENT_EXPECTATIAONS;
        },
        courseName: function () {
          return r.normalizeHTMLEntities(this.data.evaluation.courseName);
        },
      },
      showHoverCard: function (e) {
        this.data.isHovered = e;
        this.$update();
      },
      ok: function () {
        this._submitEvaluation();
        this.$emit('ga', {
          category: this.data.gaCategory,
          action: this.data.lang.KEY_COMMENT_CLICK_SUBMIT_COMMENT,
          label: this.data.termId + '-' + this.data.evaluation.id,
        });
      },
      cancel: function () {
        this.$emit('ga', {
          category: this.data.gaCategory,
          action: this.data.lang.KEY_COMMENT_CANCEL_COMMENT,
          label: this.data.postCommentTermId + '-' + this.data.evaluation.id,
        });
        this.supr();
      },
      _getEvaluationText: function () {
        return this.$refs && this.$refs.Textarea && this.$refs.Textarea.data.content;
      },
      _getEvaluationRate: function () {
        return this.data.evaluation.rate;
      },
      _submitEvaluation: function () {
        var e =
            this.$refs && this.$refs.rateValidation && this.$refs.rateValidation.validate().success,
          n = this.$refs && this.$refs.Textarea && this.$refs.Textarea.validate();
        if (e && n) {
          var i = this._getEvaluationText();
          var a = this._getEvaluationRate();
          var r = this.data.shareUrl;
          f.postComment(
            a,
            i,
            this.data.evaluation.id,
            this.data.courseId,
            this.data.termId,
            function (e) {
              if (!e)
                t.alert(
                  this.data.lang.KEY_COMMENT_SENDING_FAILED,
                  this.data.lang.KEY_COMMENT_PROMPT,
                  this.data.lang.KEY_COMMENT_CONFIRM,
                );
              this.$emit('submit', { result: !!e });
              new o({
                data: {
                  showShare:
                    'en' !== window.currentLanguage &&
                    parseFloat(this.data.evaluation.rate) >= s.SHOW_SHARE_RATING_THRESHOLD,
                  shareTitle: i,
                  shareDesc: i,
                  shareUrl: r
                    ? r
                    : 'https://icourse163.org/course/' +
                      this.data.schoolShortName +
                      '-' +
                      this.data.courseId,
                  sharePic: this.data.courseCoverImageUrl,
                  courseTypeName: this.data.courseTypeName,
                },
              }).$on(
                'share',
                function (e) {
                  var t = e.type;
                  switch (e.type) {
                    case 'wechat':
                      t = 'weixin';
                      break;
                    case 'qzone':
                      t = 'qq';
                  }
                  this.$emit('ga', {
                    category: this.data.gaCategory,
                    action: this.data.lang.KEY_COMMENT_SHARE,
                    label: t + '-' + this.data.termId,
                  });
                }._$bind(this),
              );
              this.destroy();
            }._$bind(this),
          );
        }
      },
    });
    return _;
  },
  'f2fa6d97b209372e620db24ca0a3dedf',
  'd414623f7407e577cd6c05efff08e96f',
  '29f555f70e6e64cf8315ed720772ced1',
  '25fbb912c004f2caca2d7f90579d7371',
  '8c74319ffdada3b7e6671877fa2ebde1',
  'd1f1d00521edfd69b0b6dad18718b90c',
  'a542ca25f068f41ad74799af47ad699d',
  'cf3d228cb5ed8727271758f2c836ea9f',
  'f85d7120c48724ce3338aa4501f72ed5',
  '76b358c87f41ecd47da41ee2ba42776f',
  '9cd3f5cb5f8a85acc9ce0fba66876da5',
  'a7add48e02a03729abfaf56a6c09f977',
);
