EDU(
  'f1712257727846167b812918a0eee121',
  function (e) {
    var t = e._$klass();
    var n = t.prototype;
    n.__init = function (e) {
      this.items = e.items;
      this.length = e.length;
    };
    n.limitLength = function (e, t) {
      e.splice(0, t);
      return e;
    };
    n.concat = function (e) {
      var t = e.length + this.items.length;
      if (e.length >= this.length) this.items = this.limitLength(e, e.length - this.length);
      else if (t >= this.length) this.items = this.limitLength(this.items, t - this.length);
      this.items = this.items.concat(e);
      return this;
    };
    n.push = function (e) {
      if (options.length <= this.items.length) this.pop();
      this.items.push(e);
    };
    n.pop = function (e) {
      this.items.pop();
    };
    n.empty = function () {
      this.items = [];
    };
    n.size = function () {
      return this.items.length;
    };
    return t;
  },
  'f1c1923e72a7bf464958899fa52f322f',
);
