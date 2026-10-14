EDU(
  'f7155d88aabc058cab24982e3c3671cc',
  function (e, t, n, i, o, a, r) {
    function s(t) {
      var i = {
        dep: document.body,
        type: 1,
        klass: '',
        list: [{ selected: !0, value: 'item', data: null }],
        onSelect: function (e) {},
      };
      var o = null,
        a = '',
        r = null,
        s = '',
        c = !1;
      var d = (function () {
        var e = !0;
        return function (t) {
          if (t.selected && e) {
            e = !1;
            return !0;
          } else return !1;
        };
      })();
      t = n._$merge({}, i, t);
      this.opts = t;
      this.list = this.opts.list;
      this.type = this.opts.type;
      this.crtSelData = null;
      this.crtSelElem = null;
      this.preSelData = null;
      this.preSelElem = null;
      this.mouseenterCb = null;
      this.mouseleaveCb = null;
      this.rootNode = null;
      this.rootNode = e._$create(
        'div',
        'm-popover ' + (2 == this.type ? 'm-popover-multi ' : '') + t.klass,
        t.dep,
      );
      o = e._$create('ul', '', this.rootNode);
      if (2 == this.type) this.crtSelData = [];
      for (var l = 0; l < t.list.length; l++) {
        r = t.list[l];
        if (2 == this.type) c = r.selected;
        else c = d(r);
        if (c) {
          if (2 == this.type) this.crtSelData.push[r.data];
          else this.crtSelData = r.data;
          s = 'class="item z-sel"';
        } else s = 'class="item"';
        a += '<li ' + s + ' data-index="' + l + '">' + r.value + '</li>';
        s = '';
      }
      o.innerHTML = a;
      if (2 !== this.type) this.crtSelElem = e._$getByClassName(o, 'z-sel')[0];
      this._initEvent();
    }
    var c;
    c = s.prototype;
    c._initEvent = function () {
      function n(t) {
        var n = [];
        for (var o = 0; o < t.length; o++) n.push(i.list[e._$dataset(t[o], 'index')].data);
        return n;
      }
      var i = this,
        o = this.opts;
      this.mouseenterCb = function () {
        e._$addClassName(i.rootNode, 'z-show');
      };
      this.mouseleaveCb = function () {
        e._$delClassName(i.rootNode, 'z-show');
      };
      t._$addEvent(o.dep, 'mouseenter', this.mouseenterCb);
      t._$addEvent(o.dep, 'mouseleave', this.mouseleaveCb);
      if (2 == this.type)
        t._$addEvent(this.rootNode, 'click', function (a) {
          var r = t._$getElement(a),
            s = {};
          if ('LI' == r.nodeName.toUpperCase()) {
            s.data = o.list[e._$dataset(r, 'index')].data;
            i.preSelData = n(e._$getByClassName(i.rootNode, 'z-sel'));
            if (e._$hasClassName(r, 'z-sel')) {
              s.name = 'unSelect';
              e._$delClassName(r, 'z-sel');
            } else {
              s.name = 'select';
              e._$addClassName(r, 'z-sel');
            }
            i.crtSelData = n(e._$getByClassName(i.rootNode, 'z-sel'));
            o.onSelect(i.crtSelData, i.preSelData, s);
          }
        });
      else
        t._$addEvent(this.rootNode, 'click', function (n) {
          var a = t._$getElement(n);
          if ('LI' == a.nodeName.toUpperCase())
            if (a == i.crtSelElem) return;
            else {
              i.preSelElem = i.crtSelElem;
              i.crtSelElem = a;
              i.preSelData = i.crtSelData;
              i.crtSelData = o.list[+e._$dataset(i.crtSelElem, 'index')].data;
              e._$delClassName(i.preSelElem, 'z-sel');
              e._$addClassName(i.crtSelElem, 'z-sel');
              o.onSelect(i.crtSelData, i.preSelData);
            }
        });
    };
    c.select = function (t, n) {
      var i = -1,
        o = null;
      if (void 0 === n) n = !0;
      for (var a = 0, r; a < this.list.length; a++) {
        r = this.list[a];
        if (t.call(this, r, a, this.list)) {
          o = r.data;
          i = a;
          break;
        }
      }
      if (i != -1) {
        if (this.crtSelData == o) return;
        else {
          this.preSelElem = this.crtSelElem;
          this.crtSelElem = e._$getByClassName(this.rootNode, 'item')[i];
          this.preSelData = this.crtSelData;
          this.crtSelData = o;
          e._$delClassName(this.preSelElem, 'z-sel');
          e._$addClassName(this.crtSelElem, 'z-sel');
          if (n) this.opts.onSelect(this.crtSelData, this.preSelData);
        }
        return this.crtSelData;
      }
    };
    c.destroy = function () {
      e._$remove(this.rootNode);
      t._$delEvent(this.opts.dep, 'mouseenter', this.mouseenterCb);
      t._$delEvent(this.opts.dep, 'mouseleave', this.mouseleaveCb);
    };
    return s;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
