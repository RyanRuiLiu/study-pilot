EDU(
  'd19848d97d669e1c3823c33c3dc4a6db',
  function (e, t, n, i, o, a, r, s) {
    function c(t) {
      var i = null;
      var o = {
        klass: '',
        type: 1,
        start: 0,
        anchors: [],
        init: function () {},
        onAnchor: function (e) {},
        onLectureNote: function (e) {},
        onMousedown: function (e, t) {},
        onMousemove: function (e, t) {},
        onMouseup: function (e, t) {},
        onHover: function (e, t) {},
        onChange: function (e, t) {},
      };
      t = n._$merge({}, o, t);
      this._initProperty(t);
      i = e._$create('div');
      i.innerHTML =
        '<div class="backgroundbar"></div>            <div class="bufferbar"></div>            <div class="progressbar"></div>            <div class="drag_item"></div>';
      if (t.segmentList && t.segmentList.length && 1 === this.type) {
        var a = '';
        var r = '';
        var s = '';
        for (var c = 0; c < t.segmentList.length; c++) {
          var d = (t.segmentList[c].endTime - t.segmentList[c].startTime) / (1e3 * this.duration);
          a +=
            '<div class="m-segmentBar-item" style="width:' +
            100 * d +
            '%">                <div class="m-segmentBar-item-bg"></div>                <div class="m-segmentBar-item-buffer"></div>                <div class="m-segmentBar-item-progress"></div>                </div>';
        }
        i.innerHTML = '<div class="m-segmentBar">' + a + '</div><div class="drag_item"></div>';
      }
      this._initClass(i);
      this.rootNode = i;
      this._dragItem = e._$getByClassName(this.rootNode, 'drag_item')[0];
      this._progressbar = e._$getByClassName(this.rootNode, 'progressbar')[0];
      this._bufferbar = e._$getByClassName(this.rootNode, 'bufferbar')[0];
      this._segmentBar = e._$getByClassName(this.rootNode, 'm-segmentBar')[0];
      this._anchorsElems = [];
      this._initEvent();
      this.opts.init.call(this);
      return this;
    }
    function d(e, t) {
      var n = null;
      return function () {
        var i = this,
          o = arguments;
        clearTimeout(n);
        n = setTimeout(function () {
          e.apply(i, o);
        }, t);
      };
    }
    var l;
    l = c.prototype;
    l._initProperty = function (e) {
      this.opts = e;
      this.isDragging = !1;
      this.type = this.opts.type;
      this.anchors = this.opts.anchors || [];
      this.duration = this.opts.duration;
      this.segments = this.opts.segmentList || [];
      this.preProgressPos = -1;
      if (this.opts.start <= 0) this.crtProgressPos = 0;
      else if (this.opts.start >= 1) this.crtProgressPos = 1;
      else this.crtProgressPos = this.opts.start;
    };
    l._initClass = function (t) {
      var n = 'm-progressbar';
      switch (this.type) {
        case 2:
          n += ' m-progressbar-hr';
          break;
        case 3:
          n += ' m-progressbar-vt';
          break;
        case 4:
          n += ' m-progressbar-vb';
          break;
        default:
          n += '';
      }
      n += ' ' + this.opts.klass;
      e._$addClassName(t, n);
    };
    l._initEvent = function () {
      var e = this;
      t._$addEvent(this.rootNode, 'mousemove', this._onHover._$bind(this));
      t._$addEvent(this.rootNode, 'mousedown', this._onMousedown._$bind(this));
      t._$addEvent(
        window,
        'resize',
        d(function () {
          e._setBarPos(e.crtProgressPos, 'progress');
          e._setDragItemPos(e.crtProgressPos);
          e._removeAnchors();
          e._initAnchors();
        }, 0),
      );
    };
    l._initProgress = function () {
      this._setBarPos(this.crtProgressPos, 'progress');
      this._setDragItemPos(this.crtProgressPos);
    };
    l._initAnchors = function () {
      function t(t, o) {
        function a() {
          switch (i) {
            case 1:
              if (t * r <= d) return 0;
              else return t - d / r;
            case 4:
              if (t * s <= l) return 0;
              else return t - l / s;
          }
        }
        var r = n.rootNode.offsetWidth,
          s = n.rootNode.offsetHeight,
          c = e._$create('div', 'anchor', n.rootNode),
          d = c.offsetWidth,
          l = c.offsetHeight;
        switch (i) {
          case 1:
            e._$style(c, { left: 100 * a() + '%' });
            break;
          case 4:
            e._$style(c, { bottom: 100 * a() + '%' });
        }
        n._anchorsElems.push(c);
      }
      var n = this,
        i = this.type,
        o = this.anchors;
      for (var a = 0; a < o.length; a++)
        if (1 == localStorage.getItem('MOOC_CLOSE_ANCHOR') && o[a] && 5 == o[a].type);
        else t(o[a].position, o[a].type);
      this._isAnchor(this.crtProgressPos);
      this._isLectureNote(this.crtProgressPos, this.duration);
    };
    l._removeAnchors = function () {
      for (var t = 0; t < this._anchorsElems.length; t++) e._$remove(this._anchorsElems[t]);
      this._anchorsElems = [];
    };
    l._onHover = function (e) {
      this.opts.onHover.call(this, this.getPosByCursor(e), e, this.segments);
    };
    l._onMousedown = function (e) {
      function n(e) {
        o.crtProgressPos = o.getPosByCursor(e);
        o._setProgressPos(o.crtProgressPos);
        o.opts.onMousemove.call(o, o.crtProgressPos, e);
      }
      function i(e) {
        o.isDragging = !1;
        o.crtProgressPos = o.getPosByCursor(e);
        o._setProgressPos(o.crtProgressPos);
        o.opts.onMouseup.call(o, o.crtProgressPos, e);
        t._$delEvent(document, 'mousemove', n);
        t._$delEvent(document, 'mouseup', i);
      }
      var o = this;
      this.isDragging = !0;
      this.preProgressPos = this.crtProgressPos;
      this.crtProgressPos = this.getPosByCursor(e);
      this._setProgressPos(this.crtProgressPos);
      this.opts.onMousedown.call(this, this.crtProgressPos, e);
      t._$addEvent(document, 'mousemove', n);
      t._$addEvent(document, 'mouseup', i);
    };
    l._setBarPos = function (t, n) {
      var i = this.type,
        o = 'progress' === n ? this._progressbar : this._bufferbar;
      var a = this.segments.length;
      if (a && 1 === i) {
        var r = e._$getByClassName(this._segmentBar, 'm-segmentBar-item');
        var s = 0;
        for (var c = 0; c < a; c++) {
          var d = t * this.duration;
          var l =
            'progress' === n
              ? e._$getByClassName(r[c], 'm-segmentBar-item-progress')[0]
              : e._$getByClassName(r[c], 'm-segmentBar-item-buffer')[0];
          if (1e3 * d >= this.segments[c].startTime && 1e3 * d < this.segments[c].endTime) {
            var u = (1e3 * d - s) / (this.segments[c].endTime - this.segments[c].startTime);
            e._$style(l, { width: 100 * u + '%' });
          } else if (1e3 * d >= this.segments[c].endTime) {
            s = this.segments[c].endTime;
            e._$style(l, { width: '100%' });
          } else e._$style(l, { width: 0 });
        }
      } else
        switch (i) {
          case 1:
            e._$style(o, { width: 100 * t + '%' });
            break;
          case 4:
            e._$style(o, { height: 100 * t + '%' });
        }
    };
    l._setDragItemPos = function (t) {
      var n = this.type,
        i = this.rootNode.offsetWidth,
        o = this.rootNode.offsetHeight,
        a = this._dragItem.offsetWidth,
        r = this._dragItem.offsetHeight;
      switch (n) {
        case 1:
          e._$style(this._dragItem, { left: i * t - a * t + 'px' });
          break;
        case 4:
          if (o && r) e._$style(this._dragItem, { bottom: o * t - r * t + 'px' });
          else e._$style(this._dragItem, { bottom: 100 * t + '%' });
      }
    };
    l._setProgressPos = function (e) {
      this._setBarPos(e, 'progress');
      this._setDragItemPos(e);
    };
    l._isAnchor = function (e, t) {
      var n = this.segments ? this.segments.length - 2 : 0;
      for (var i = 0; i < this.anchors.length; i++)
        if (t) {
          if (this.anchors[i].time == Math.round(e * t)) {
            this.opts.onAnchor.call(this, this.anchors[i]);
            break;
          }
        } else if (this.anchors[i].position == e) {
          this.opts.onAnchor.call(this, this.anchors[i]);
          break;
        }
    };
    l._isLectureNote = function (e, t) {
      var n = this.segments ? this.segments.length - 2 : 0;
      for (var i = 0; i < this.segments.length; i++)
        if (t) {
          var o = 1e3 * Math.round(e * t);
          if (this.segments[i].startTime <= o && o <= this.segments[i].endTime) {
            if (this.segments[i].knowledgeId) this.opts.onLectureNote.call(this, this.segments[i]);
            break;
          }
        }
    };
    l.insertTo = function (e, t) {
      t || (t = 'append');
      if ('string' != typeof t) t = 'append';
      t = t.toLowerCase();
      if ('prepend' == t) e.insertBefore(this.rootNode, e.childNodes[0]);
      else if ('append' == t) e.appendChild(this.rootNode);
      this._initProgress();
      this._initAnchors();
      return this;
    };
    l.getPosByCursor = function (e) {
      var n = this.type,
        o = i.getPageScroll(),
        a = this.rootNode.getBoundingClientRect(),
        r = t._$clientX(e),
        s = t._$clientY(e),
        c = a.left + o.x,
        d = a.top + o.y,
        l = this.rootNode.offsetWidth,
        u = this.rootNode.offsetHeight;
      switch (n) {
        case 1:
          if (r <= c) return 0;
          else if (r >= c + l) return 1;
          else return (r - c) / l;
        case 4:
          if (s >= d + u) return 0;
          else if (s <= d) return 1;
          else return (u + d - s) / u;
      }
    };
    l.setBufferPos = function (e) {
      this._setBarPos(e, 'buffer');
    };
    l.resetAnchor = function () {
      this._removeAnchors();
      this._initAnchors();
    };
    l.setProgressPos = function (e, t, n) {
      if (void 0 === t) t = !0;
      if (this.crtProgressPos == e) return e;
      else {
        this.preProgressPos = this.crtProgressPos;
        this.crtProgressPos = e;
        this._setBarPos(e, 'progress');
        this._setDragItemPos(e);
        if (t) this.opts.onChange.call(this, this.crtProgressPos, this.preProgressPos);
        this._isAnchor(e, n);
        this._isLectureNote(e, n);
      }
    };
    l.reset = function (e) {
      var t = !1;
      t = e.anchors == this.opts.anchors ? !0 : !1;
      e = n._$merge({}, this.opts, e);
      this._initProperty(e);
      this._initClass(this.rootNode);
      this._initProgress();
      if (!t) {
        this._removeAnchors();
        this._initAnchors();
      }
    };
    return c;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '06a1fe998ca2ede601d4740c114f6c3c',
);
