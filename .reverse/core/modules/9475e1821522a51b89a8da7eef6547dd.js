EDU(
  '9475e1821522a51b89a8da7eef6547dd',
  function (e, t, n, i, o, a) {
    var r = e._$klass();
    a = r._$extend(t.Processor);
    a.__init = function (e) {
      this.prefix = 'answerSheet';
      this.customType = i.CUSTOM_TYPE.ANSWER_SHEET;
      this.__super(e, o);
    };
    a.customList = function () {
      return [
        { name: 'startAnswer', eventType: i.ANSWER_SHEET_START_ANSWER },
        { name: 'endAnswer', eventType: i.ANSWER_SHEET_END_ANSWER },
        { name: 'closeAnswer', eventType: i.ANSWER_SHEET_CLOSE_ANSWER },
        { name: 'upvote', eventType: i.ANSWER_SHEET_UPVOTE },
      ];
    };
    o.Processor = r;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'c71f4fc01e6f58a7959dc227b6cbdb5c',
  '06a1fe998ca2ede601d4740c114f6c3c',
  'aa4573f12aff14ef5eb071010a13bcd5',
);
