EDU(
  'f374969de47559e68a0cfa94879762ea',
  function (e, t, n) {
    var i = 'component-module-live-live-chat-emoji-emojiunit';
    var o = e
      .$extends({
        config: function () {
          t.extend(this, { settingKey: i });
          t.extend(this.data, { emojiList: this.data.emojiList, trList: 3 });
          this.supr();
        },
        init: function () {
          this.supr();
          var e = this.data.emojiList;
          var t = [];
          for (var n = 0; n < e.length; n += 8) t.push(e.slice(n, n + 8));
          this.data.trEmojiList = t;
          this.$update();
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
          return n.getEmojiPicUrl(e);
        },
        getEmojiDelPicUrl: function () {
          return n.getEmojiDelPicUrl();
        },
      });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'f92fcb9468157ecb2a2e74ddb6c7af44',
);
