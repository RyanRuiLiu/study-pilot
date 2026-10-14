EDU(
  '6182651a6f54d23eace06c6446bb3dcb',
  function (e, t, n, i, o) {
    var a = e._$klass();
    pro = a.prototype;
    pro.__init = function (e) {
      this.opts = e || {};
      this.prefix = this.opts.prefix || '';
      this.name = this.opts.name || '';
      this.eventType = this.opts.eventType || null;
      this.customType = this.opts.customType || null;
      this.type = this.opts.type || '';
      this.eventName = this.opts.eventName || this.getEventName();
      this._match = this.opts.match || this.defaultMatch;
      this.handle = this.opts.handle || o;
    };
    pro.match = function (e) {
      if (e.type !== this.type) return !1;
      else return this._match(e);
    };
    pro.defaultMatch = function (e) {
      return (
        this.eventType === this.getMsgEventType(e) && this.customType === this.getMsgCustomType(e)
      );
    };
    pro.getMsgEventType = function (e) {
      return t.getValueByVisitor(e, 'content.eventType') || '';
    };
    pro.getMsgCustomType = function (e) {
      return t.getValueByVisitor(e, 'content.customType') || '';
    };
    pro.getEventName = function () {
      var e = this.prefix ? this.prefix + '#' : '';
      if (this.name && !this.type) return e + t.constlize(this.name, !0);
      else if (!this.name && this.type) return e + this.type;
      else if (!this.name && !this.type) return '';
      else return e + this.type.toLowerCase() + '_' + t.constlize(this.name, !0);
    };
    n.MsgEvent = a;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  '06a1fe998ca2ede601d4740c114f6c3c',
);
