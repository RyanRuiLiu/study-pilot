EDU(
  '8d55582df3233e044f632a8de8faa4a2',
  function (e, t, n) {
    function i(e) {
      if ('buttons' in e && a) return !(1 & e.buttons);
      if (r || c) return 0 === e.which;
      else;
    }
    var o;
    !(function () {
      var e = ['webkitM', 'mozM', 'msM', 'oM', 'm'];
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        var i = n + 'atches';
        if (i in document.documentElement) o = i;
        i += 'Selector';
        if (i in document.documentElement) o = i;
        if (o) break;
      }
    })();
    var a = !document.documentMode || document.documentMode > 9;
    var s = window.chrome;
    var r = s && (s.webstore || s.app);
    var c =
      /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);
    var d = function () {
      this.init.call(this, arguments[0]);
    };
    var l = d.prototype;
    l.init = function (e) {
      this.element = e.element;
      this.document = e.element.ownerDocument;
      this.CSS_CLASS_GRAB = 'grab-to-pan-grab';
      this.activate = this.activate._$bind(this);
      this.deactivate = this.deactivate._$bind(this);
      this.toggle = this.toggle._$bind(this);
      this._onmousedown = this._onmousedown._$bind(this);
      this._onmousemove = this._onmousemove._$bind(this);
      this._endPan = this._endPan._$bind(this);
      var t = (this.overlay = document.createElement('div'));
      t.className = 'grab-to-pan-grabbing';
    };
    l.activate = function () {
      if (!this.active) {
        this.active = !0;
        this.element.addEventListener('mousedown', this._onmousedown, !0);
        this.element.classList.add(this.CSS_CLASS_GRAB);
        if (this.onActiveChanged) this.onActiveChanged(!0);
      }
    };
    l.deactivate = function () {
      if (this.active) {
        this.active = !1;
        this.element.removeEventListener('mousedown', this._onmousedown, !0);
        this._endPan();
        this.element.classList.remove(this.CSS_CLASS_GRAB);
        if (this.onActiveChanged) this.onActiveChanged(!1);
      }
    };
    l.toggle = function () {
      if (this.active) this.deactivate();
      else this.activate();
    };
    l.ignoreTarget = function (e) {
      return e[o]('a[href], a[href] *, input, textarea, button, button *, select, option');
    };
    l._onmousedown = function (e) {
      if (0 === e.button && !this.ignoreTarget(e.target)) {
        this._hasmoved = !1;
        if (e.originalTarget)
          try {
            e.originalTarget.tagName;
          } catch (t) {
            return;
          }
        this.scrollLeftStart = this.element.scrollLeft;
        this.scrollTopStart = this.element.scrollTop;
        this.clientXStart = e.clientX;
        this.clientYStart = e.clientY;
        this.document.addEventListener('mousemove', this._onmousemove, !0);
        this.document.addEventListener('mouseup', this._endPan, !0);
        this.element.addEventListener('scroll', this._endPan, !0);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    l._onmousemove = function (e) {
      this.element.removeEventListener('scroll', this._endPan, !0);
      this._hasmoved = !0;
      if (!i(e)) {
        var t = e.clientX - this.clientXStart;
        var n = e.clientY - this.clientYStart;
        var o = this.scrollTopStart - n;
        var a = this.scrollLeftStart - t;
        if (this.element.scrollTo) this.element.scrollTo({ top: o, left: a, behavior: 'instant' });
        else {
          this.element.scrollTop = o;
          this.element.scrollLeft = a;
        }
        if (!this.overlay.parentNode) document.body.appendChild(this.overlay);
      } else this._endPan();
    };
    l._endPan = function (e) {
      this.element.removeEventListener('scroll', this._endPan, !0);
      this.document.removeEventListener('mousemove', this._onmousemove, !0);
      this.document.removeEventListener('mouseup', this._endPan, !0);
      if (this.overlay.remove) this.overlay.remove();
      else if (!this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
      if (this._hasmoved) e && e.stopPropagation();
    };
    return d;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
