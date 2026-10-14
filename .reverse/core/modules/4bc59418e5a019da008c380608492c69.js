EDU(
  '4bc59418e5a019da008c380608492c69',
  function (e, t, n, i) {
    var o = !1;
    var a = window.navigator.userAgent;
    var r = new RegExp('MSIE 8.0', 'i').test(a);
    var s = t.$extends({
      name: 'ux-draggable',
      template: '{#inc this.$body}',
      config: function () {
        n.extend(this.data, {
          data: null,
          proxy: 'clone',
          direction: 'all',
          class: 'z-draggable',
          dragClass: 'z-drag',
          draggableLimit: null,
        });
        this.supr();
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onBodyMouseMove = this._onBodyMouseMove.bind(this);
        this._onBodyMouseUp = this._onBodyMouseUp.bind(this);
        this.cancel = this.cancel.bind(this);
      },
      init: function () {
        var e = n.dom.element(this);
        n.dom.on(e, 'mousedown', this._onMouseDown);
        this.supr();
        this.$watch('disabled', function (t) {
          if (t) n.dom.delClass(e, this.data['class']);
          else n.dom.addClass(e, this.data['class']);
        });
      },
      _getProxy: function () {
        var e, t, i, o;
        if ('function' == typeof this.data.proxy) {
          i = this.data.proxy();
          if (!i) return;
          t = i.cloneNode(!0);
          e = n.dom.getDimension(n.dom.element(this));
          this._initProxy(t, e);
          i.parentElement.appendChild(t);
          return t;
        } else if (this.data.proxy.nodeType && this.data.proxy instanceof Element) {
          e = n.dom.getDimension(this.data.proxy);
          t = this.data.proxy.cloneNode(!0);
          this._initProxy(t, e);
          this.data.proxy.parentElement.appendChild(t);
          return t;
        } else if (this.data.proxy instanceof s.Proxy) {
          t = n.dom.element(this.data.proxy);
          e = n.dom.getDimension(n.dom.element(this));
          this._initProxy(t, e);
          document.body.appendChild(t);
          return t;
        } else if ('clone' === this.data.proxy) {
          o = n.dom.element(this);
          e = n.dom.getDimension(o);
          t = o.cloneNode(!0);
          this._initProxy(t, e);
          o.parentElement.appendChild(t);
          return t;
        } else if ('self' === this.data.proxy) {
          t = n.dom.element(this);
          e = n.dom.getDimension(t);
          this._initProxy(t, e);
          return t;
        } else if ('string' == typeof this.data.proxy) {
          i = n.dom.find(this.data.proxy);
          if (!i) return;
          t = i.cloneNode(!0);
          e = n.dom.getDimension(n.dom.element(this));
          this._initProxy(t, e);
          i.parentElement.appendChild(t);
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
      _onMouseDown: function (e) {
        if (!o && !this.data.disabled) {
          o = !0;
          if (!this.data.notPreventDefault) e.preventDefault();
          n.dom.addClass(document.body, 'f-unselectable');
          n.dom.on(document, 'mousemove', this._onBodyMouseMove);
          n.dom.on(document, 'mouseup', this._onBodyMouseUp);
        }
      },
      _onBodyMouseMove: function (e) {
        var t = e.event;
        var a, s, c;
        var d, l, u;
        o = !1;
        e.preventDefault();
        if (i.dragging === !1) {
          n.extend(
            i,
            {
              dragging: !0,
              data: this.data.data,
              proxy: this._getProxy(),
              screenX: t.screenX,
              screenY: t.screenY,
              clientX: t.clientX,
              clientY: t.clientY,
              pageX: t.pageX,
              pageY: t.pageY,
              movementX: 0,
              movementY: 0,
              droppable: void 0,
            },
            !0,
          );
          this._dragStart();
        } else {
          n.extend(
            i,
            {
              screenX: t.screenX,
              screenY: t.screenY,
              clientX: t.clientX,
              clientY: t.clientY,
              pageX: t.pageX,
              pageY: t.pageY,
              movementX: t.screenX - i.screenX,
              movementY: t.screenY - i.screenY,
            },
            !0,
          );
          a = i.proxy.offsetLeft + i.movementX;
          s = i.proxy.offsetTop + i.movementY;
          if (this.data.draggableLimit) c = i.proxy.getBoundingClientRect();
          if (i.proxy) {
            if ('all' === this.data.direction || 'horizontal' === this.data.direction) {
              if (this.data.draggableLimit) {
                if (a > this.data.draggableLimit.right - c.width)
                  a = this.data.draggableLimit.right - c.width;
                if (a < this.data.draggableLimit.left) a = this.data.draggableLimit.left;
              }
              i.proxy.style.left = a + 'px';
            }
            if ('all' === this.data.direction || 'vertical' === this.data.direction) {
              if (this.data.draggableLimit) {
                if (s > this.data.draggableLimit.bottom - c.height)
                  s = this.data.draggableLimit.bottom - c.height;
                if (s < this.data.draggableLimit.top) s = this.data.draggableLimit.top;
              }
              i.proxy.style.top = s + 'px';
            }
          }
          this._drag();
          if (!i.dragging) return;
          d = null;
          if (i.proxy) {
            i.proxy.style.display = 'none';
            d = document.elementFromPoint(t.clientX, t.clientY);
            if (!r) i.proxy.style.display = '';
          } else d = document.elementFromPoint(t.clientX, t.clientY);
          l = d;
          u = null;
          for (; l;) {
            u = i.droppables.find(function (e) {
              var t = n.dom.element(e);
              if (l === t) return !0;
            });
            if (u) break;
            l = l.parentElement;
          }
          if (i.droppable !== u) {
            i.droppable && i.droppable._dragLeave(this);
            if (!i.dragging) return;
            u && u._dragEnter(this);
            if (!i.dragging) return;
            i.droppable = u;
          } else u && u._dragOver(this);
        }
      },
      _onBodyMouseUp: function (e) {
        o = !1;
        e.preventDefault();
        n.dom.delClass(document.body, 'f-unselectable');
        this._dragEnd();
        i.droppable && i.droppable._drop(this);
        this.cancel();
      },
      cancel: function () {
        if (i.proxy) {
          if ('self' != this.data.proxy && i.proxy.parentElement)
            i.proxy.parentElement.removeChild(i.proxy);
          n.dom.delClass(i.proxy, this.data.dragClass);
        }
        n.extend(
          i,
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
        n.dom.off(document, 'mousemove', this._onBodyMouseMove);
        n.dom.off(document, 'mouseup', this._onBodyMouseUp);
      },
      _dragStart: function () {
        if (i.proxy) n.dom.addClass(i.proxy, this.data.dragClass);
        this.$emit(
          'dragstart',
          n.extend(
            {
              sender: this,
              origin: this,
              source: n.dom.element(this),
              proxy: i.proxy,
              cancel: this.cancel,
            },
            i,
          ),
        );
      },
      _drag: function () {
        this.$emit(
          'drag',
          n.extend(
            {
              sender: this,
              origin: this,
              source: n.dom.element(this),
              proxy: i.proxy,
              cancel: this.cancel,
            },
            i,
          ),
        );
      },
      _dragEnd: function () {
        this.$emit('dragend', {
          sender: this,
          origin: this,
          source: n.dom.element(this),
          proxy: i.proxy,
        });
        if (i.proxy) {
          if ('self' != this.data.proxy && i.proxy.parentElement)
            i.proxy.parentElement.removeChild(i.proxy);
          n.dom.delClass(i.proxy, this.data.dragClass);
        }
      },
    });
    s.Proxy = t.extend({
      name: 'draggable.proxy',
      template: '{#inc this.$body}',
      init: function () {
        if (this.$outer instanceof s) {
          n.dom.element(this).style.display = 'none';
          this.$outer.data.proxy = this;
        }
      },
    });
    return s;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '714e5dc87661fe92a4fc6bf8695fb4e1',
  '6482ff2f3f06e88a2b8acbcb154aaf7f',
);
