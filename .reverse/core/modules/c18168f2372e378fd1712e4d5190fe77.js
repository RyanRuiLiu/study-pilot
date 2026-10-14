EDU(
  'c18168f2372e378fd1712e4d5190fe77',
  function (e, t, n, i, o, a) {
    var r = e._$klass();
    a = r._$extend(t.Processor);
    a.__init = function (e) {
      this.prefix = 'screenPush';
      this.customType = i.CUSTOM_TYPE.PUSH_SCREEN;
      this.__super(e, o);
    };
    a.customList = function () {
      return [
        { name: 'startScreenPush', eventType: i.PUSH_SCREEN_START_PUSH },
        { name: 'endScreenPush', eventType: i.PUSH_SCREEN_END_PUSH },
      ];
    };
    o.Processor = r;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'c71f4fc01e6f58a7959dc227b6cbdb5c',
  '06a1fe998ca2ede601d4740c114f6c3c',
  'aa4573f12aff14ef5eb071010a13bcd5',
);
