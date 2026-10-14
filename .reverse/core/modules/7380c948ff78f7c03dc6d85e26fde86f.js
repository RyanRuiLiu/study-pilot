EDU(
  '7380c948ff78f7c03dc6d85e26fde86f',
  function (e, t, n, i) {
    var o = { MAX_LENGTH: 500, MIN_LENGTH: 5 };
    i = e.$extendsWithTheming({
      name: 'ux-mooc-comment-course-textarea',
      data: {
        defaultText: n.KEY_COMMENT_EVALUATE_COURSE,
        originalContent: '',
        prompt:
          n.KEY_COMMENT_PELASE_ENTER + o.MIN_LENGTH + '-' + o.MAX_LENGTH + n.KEY_COMMENT_WORDS,
        emptyRules: [
          { type: 'isRequired', message: n.KEY_COMMENT_FILL_COMMENTS },
          {
            method: function (e) {
              return e.trim().length >= o.MIN_LENGTH && e.trim().length <= o.MAX_LENGTH;
            },
            message: '',
          },
        ],
        content: '',
      },
      computed: {
        prompt: function () {
          var e = this.data.content;
          var t = { text: '', class: '' };
          if (e.trim().length > o.MAX_LENGTH) {
            t.text =
              this.data.lang.KEY_COMMENT_EXCEEDED +
              (e.trim().length - o.MAX_LENGTH) +
              this.data.lang.KEY_COMMENT_WORDS;
            t['class'] = 'warning-text';
          } else if (e.trim().length < o.MIN_LENGTH) {
            t.text =
              this.data.lang.KEY_COMMENT_AT_LEAST +
              ' ' +
              o.MIN_LENGTH +
              ' ' +
              this.data.lang.KEY_COMMENT_WORDS2;
            t['class'] = 'warning-text';
          } else
            t.text =
              this.data.lang.KEY_COMMENT_PELASE_ENTER +
              o.MIN_LENGTH +
              '-' +
              o.MAX_LENGTH +
              this.data.lang.KEY_COMMENT_WORDS;
          return t;
        },
      },
      init: function () {
        this.supr();
      },
      config: function () {
        this.data.content = this.data.originalContent || this.data.content;
        this.supr();
      },
      validate: function () {
        return !!(
          this.$refs &&
          this.$refs.EmptyValidation &&
          this.$refs.EmptyValidation.validate().success
        );
      },
    });
    i.CONST = o;
    return i;
  },
  '957514dddeae51d4fabf753bfa09ba13',
  '76b358c87f41ecd47da41ee2ba42776f',
  'a7add48e02a03729abfaf56a6c09f977',
);
