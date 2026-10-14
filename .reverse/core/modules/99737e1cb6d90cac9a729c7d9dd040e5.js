EDU(
  '99737e1cb6d90cac9a729c7d9dd040e5',
  function (e, t, n, i) {
    if ('undefined' != typeof module && module.exports) {
      t = require('./component');
      e = require('./_');
      n = require('./dragDrop.js');
      i = require('./polyfill.js');
    }
    var o = !1;
    var a = window.navigator.userAgent;
    var r = new RegExp('MSIE 8.0', 'i').test(a);
    var s = t.extend({
      name: 'draggable',
      template: '{#inc this.$body}',
      config: function () {
        e.extend(this.data, {
          data: null,
          proxy: 'clone',
          direction: 'all',
          class: 'z-draggable',
          dragClass: 'z-drag',
        });
        this.supr();
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onBodyMouseMove = this._onBodyMouseMove.bind(this);
        this._onBodyMouseUp = this._onBodyMouseUp.bind(this);
        this.cancel = this.cancel.bind(this);
      },
      init: function () {
        var t = e.dom.element(this);
        e.dom.on(t, 'mousedown', this._onMouseDown);
        this.supr();
        this.$watch('disabled', function (n) {
          if (n) e.dom.delClass(t, this.data['class']);
          else e.dom.addClass(t, this.data['class']);
        });
      },
      _getProxy: function () {
        if ('function' == typeof this.data.proxy) return this.data.proxy();
        else if (this.data.proxy.nodeType && this.data.proxy instanceof Element) {
          var t = this.data.proxy.cloneNode(!0);
          var n = e.dom.getDimension(e.dom.element(this));
          this._initProxy(t, n);
          this.data.proxy.parentElement.appendChild(t);
          return t;
        } else if (this.data.proxy instanceof s.Proxy) {
          var t = e.dom.element(this.data.proxy);
          var n = e.dom.getDimension(e.dom.element(this));
          this._initProxy(t, n);
          document.body.appendChild(t);
          return t;
        } else if ('clone' === this.data.proxy) {
          var i = e.dom.element(this);
          var n = e.dom.getDimension(i);
          t = i.cloneNode(!0);
          this._initProxy(t, n);
          i.parentElement.appendChild(t);
          return t;
        } else if ('self' === this.data.proxy) {
          var t = e.dom.element(this);
          var n = e.dom.getDimension(t);
          this._initProxy(t, n);
          return t;
        } else if ('string' == typeof this.data.proxy) {
          var o = e.dom.find(this.data.proxy);
          if (!o) return;
          var t = o.cloneNode(!0);
          var n = e.dom.getDimension(e.dom.element(this));
          this._initProxy(t, n);
          o.parentElement.appendChild(t);
          return t;
        }
      },
      _initProxy: function (e, t) {
        e.style.left = t.left + (this.data.leftFix || 0) + 'px';
        e.style.top = t.top + (this.data.topFix || 0) + 'px';
        e.style.zIndex = '2000';
        e.style.position = 'fixed';
        e.style.display = '';
        if (r) e.style.display = 'none';
      },
      _onMouseDown: function (t) {
        if (!o && !this.data.disabled) {
          o = !0;
          if (!this.data.notPreventDefault) t.preventDefault();
          e.dom.addClass(document.body, 'f-unselectable');
          e.dom.on(document, 'mousemove', this._onBodyMouseMove);
          e.dom.on(document, 'mouseup', this._onBodyMouseUp);
        }
      },
      _onBodyMouseMove: function (t) {
        o = !1;
        var i = t.event;
        t.preventDefault();
        if (n.dragging === !1) {
          e.extend(
            n,
            {
              dragging: !0,
              data: this.data.data,
              proxy: this._getProxy(),
              screenX: i.screenX,
              screenY: i.screenY,
              clientX: i.clientX,
              clientY: i.clientY,
              pageX: i.pageX,
              pageY: i.pageY,
              movementX: 0,
              movementY: 0,
              droppable: void 0,
            },
            !0,
          );
          this._dragStart();
        } else {
          e.extend(
            n,
            {
              screenX: i.screenX,
              screenY: i.screenY,
              clientX: i.clientX,
              clientY: i.clientY,
              pageX: i.pageX,
              pageY: i.pageY,
              movementX: i.screenX - n.screenX,
              movementY: i.screenY - n.screenY,
            },
            !0,
          );
          if (n.proxy) {
            if ('all' === this.data.direction || 'horizontal' === this.data.direction)
              n.proxy.style.left = n.proxy.offsetLeft + n.movementX + 'px';
            if ('all' === this.data.direction || 'vertical' === this.data.direction)
              n.proxy.style.top = n.proxy.offsetTop + n.movementY + 'px';
          }
          this._drag();
          if (!n.dragging) return;
          var a = null;
          if (n.proxy) {
            n.proxy.style.display = 'none';
            a = document.elementFromPoint(i.clientX, i.clientY);
            if (!r) n.proxy.style.display = '';
          } else a = document.elementFromPoint(i.clientX, i.clientY);
          var s = a;
          var c = null;
          for (; s;) {
            c = n.droppables.find(function (t) {
              var n = e.dom.element(t);
              if (s === n) return !0;
            });
            if (c) break;
            s = s.parentElement;
          }
          if (n.droppable !== c) {
            n.droppable && n.droppable._dragLeave(this);
            if (!n.dragging) return;
            c && c._dragEnter(this);
            if (!n.dragging) return;
            n.droppable = c;
          } else c && c._dragOver(this);
        }
      },
      _onBodyMouseUp: function (t) {
        o = !1;
        var i = t.event;
        t.preventDefault();
        e.dom.delClass(document.body, 'f-unselectable');
        this._dragEnd();
        n.droppable && n.droppable._drop(this);
        this.cancel();
      },
      cancel: function () {
        e.extend(
          n,
          {
            dragging: !1,
            data: null,
            proxy: null,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            movementX: 0,
            movementY: 0,
            droppable: void 0,
          },
          !0,
        );
        e.dom.off(document, 'mousemove', this._onBodyMouseMove);
        e.dom.off(document, 'mouseup', this._onBodyMouseUp);
      },
      _dragStart: function (t) {
        if (n.proxy) e.dom.addClass(n.proxy, this.data.dragClass);
        this.$emit(
          'dragstart',
          e.extend(
            {
              sender: this,
              origin: this,
              source: e.dom.element(this),
              proxy: n.proxy,
              cancel: this.cancel,
            },
            n,
          ),
        );
      },
      _drag: function () {
        this.$emit(
          'drag',
          e.extend(
            {
              sender: this,
              origin: this,
              source: e.dom.element(this),
              proxy: n.proxy,
              cancel: this.cancel,
            },
            n,
          ),
        );
      },
      _dragEnd: function () {
        this.$emit('dragend', {
          sender: this,
          origin: this,
          source: e.dom.element(this),
          proxy: n.proxy,
        });
        if (n.proxy) {
          if ('self' != this.data.proxy) n.proxy.parentElement.removeChild(n.proxy);
          e.dom.delClass(n.proxy, this.data.dragClass);
        }
      },
    });
    s.Proxy = t.extend({
      name: 'draggable.proxy',
      template: '{#inc this.$body}',
      init: function () {
        if (this.$outer instanceof s) {
          e.dom.element(this).style.display = 'none';
          this.$outer.data.proxy = this;
        }
      },
    });
    return s;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  '3a5d3a45d1316a16ae0ba33d79cd02e3',
  '3493ce004007a2b4311a4a59af9a1a17',
);
