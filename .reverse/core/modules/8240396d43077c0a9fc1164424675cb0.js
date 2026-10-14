EDU(
  '8240396d43077c0a9fc1164424675cb0',
  function (e) {
    e.mode.ECB = (function () {
      var t = e.lib.BlockCipherMode.extend();
      t.Encryptor = t.extend({
        processBlock: function (e, t) {
          this._cipher.encryptBlock(e, t);
        },
      });
      t.Decryptor = t.extend({
        processBlock: function (e, t) {
          this._cipher.decryptBlock(e, t);
        },
      });
      return t;
    })();
    return e.mode.ECB;
  },
  '45e5d1458815a61a6a2e55fc79eeac61',
  '3798ce93c8dd5825c5bf4dd2975b575a',
);
