EDU(
  '120e12d85ba376ee7c3203b5513ee152',
  function (e, t, n, i, o, a, r) {
    var s = 'component-module-live-live-chat-emoji';
    var c = 23;
    var d = e
      .$extends({
        config: function () {
          this._flushSetting(s, o);
          this.AdaptEmojiList = this.emojiAdapt(r.emoji);
          t.extend(this, { settingKey: s });
          t.extend(this.data, { emojiList: this.AdaptEmojiList });
          this.supr();
        },
        init: function () {
          this.supr();
          if (this.data.type) this.buildWapSlider();
        },
        buildWapSlider: function () {
          var e = [];
          var t = [];
          for (var n = 0, o = this.AdaptEmojiList.length; n < o; n += c)
            e.push(this.AdaptEmojiList.slice(n, n + c).concat(r.deleteIcon));
          for (var n = 0; n < e.length; n++) {
            t[n] = new a({ data: { emojiList: e[n] } });
            t[n].$on(
              'emojiSelect',
              function (e) {
                this.onEmojiClick(e.emoji);
              }._$bind(this),
            );
            t[n].$on(
              'emojiDelete',
              function (e) {
                this.onEmojiDelClick(e.emoji);
              }._$bind(this),
            );
          }
          this.__swipeUI = new i({ data: { items: t } }).$inject(this.$refs.slider);
        },
        emojiAdapt: function (e) {
          var t = [];
          for (var n in e) {
            var i = {};
            i.key = n;
            i.file = e[n].file;
            t.push(i);
          }
          return t;
        },
        onEmojiClick: function (e) {
          var t = e.key;
          var n = e.file;
          this.$emit('emojiSelect', { emoji: e });
        },
        onEmojiDelClick: function (e) {
          this.$emit('emojiDelete', { emoji: e });
        },
        destroy: function () {
          this.supr();
        },
      })
      .filter({
        getEmojiKey: function (e) {
          return e.key;
        },
        getEmojiValue: function (e) {
          return e.file;
        },
        getEmojiPicUrl: function (e) {
          return r.getEmojiPicUrl(e);
        },
        getEmojiDelPicUrl: function () {
          return r.getEmojiDelPicUrl();
        },
      });
    return d;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  '27599791929c2c72e99cf6e6732d026d',
  '85cb3c02f659681683d8e4731ef8fb2f',
  'c3059c56dbfd44b6d4f92217c76680ac',
  'f92fcb9468157ecb2a2e74ddb6c7af44',
);
