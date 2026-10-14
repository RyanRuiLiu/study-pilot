EDU(
  'e88d1d3d987cb956bc96010a864bfb7a',
  function () {
    var e = NEJ.P,
      t = e('nej.e'),
      i = e('nej.v'),
      n = e('nej.u'),
      a = e('edu.u'),
      o = e('nej.ut'),
      s;
    a._$$SuggestAgent = NEJ.C();
    s = a._$$SuggestAgent._$extend(o._$$Suggest);
    s.__reset = function (e) {
      this.__supReset(e);
      this.__noInputFill = e.noInputFill || !1;
      this.__registDomEvent({});
    };
    s.__onSelect = function (e) {
      var t = this._$update;
      this._$update = function () {};
      this.__super(e);
      this._$update = t;
    };
    s.__registDomEvent = function (e) {
      this.__doClearDomEvent();
      this.__doInitDomEvent([
        [this.__input, 'keyup', this.__onInput._$bind(this)],
        [this.__input, 'blur', this.__onBlur._$bind(this)],
        [this.__sopt.parent, 'click', this.__doFinishSelect._$bind(this, e)],
        [document, 'keypress', this.__onKeyBoardEnter._$bind2(this, e)],
      ]);
    };
    s.__destroy = function () {
      this.__supDestroy();
      this.__doDestroyList();
      delete this.__sopt.selected;
      delete this.__input;
      delete this.__sopt.parent;
    };
    s.__isSuggestAgentItem = function (e) {
      return null != e.flag;
    };
    s.__doDestroyList = (function () {
      var e = function (e) {
        n._$safeDelete(e, 'flag');
      };
      return function () {
        n._$forEach(this.__list, e);
        this.__list = [];
        this.__index = 0;
      };
    })();
    s.__doSelectItem = function (e) {
      if (this.__index !== e) this.__index = e;
    };
    s.__deSelectItem = function (e) {
      if (this.__index === e) delete this.__index;
    };
    s.__onBlur = function (e) {
      var t = e.srcElement;
      this.__blurSTL = setTimeout(
        function () {
          this._$setList();
          this._$dispatchEvent('onblur', t);
        }._$bind(this),
        200,
      );
    };
    s.__doFinishSelect = function (e, a) {
      if (this.__blurSTL) this.__blurSTL = window.clearTimeout(this.__blurSTL);
      this.__byClick = !0;
      this.__target = i._$getElement(a, 'c:zitm');
      var o = !1;
      if (13 == a.keyCode) o = !0;
      var s = this.__target;
      if (!s && o && a.target && !a.target.value)
        if (this.__list) {
          if (0 !== this.__index) this.__index--;
          s = this.__list[this.__index];
        }
      if (s) {
        var r = s.innerText;
        this.__sopt.parent.style.visibility = 'hidden';
        if (!this.__noInputFill) this.__input.value = r;
        this._$setList();
        var c;
        n._$forEach(e, function (e) {
          if (t._$dataset(s, 'id') == e.id) c = e;
        });
        if (o) {
          c.keyCode = 13;
          c.isEnterKeyPressed = o;
        }
        this._$dispatchEvent('onselect', c);
        this.__byClick = !1;
      } else this.__byClick = !1;
    };
    s.__doProSelect = function () {
      if (this.__byKeyDown) this.__byKeyDown = window.clearTimeout(this.__byKeyDown);
      this.__byKeyDown = setTimeout(
        function () {
          if (this.__list) {
            var e = this.__list[this.__index] || this.__list[0],
              i = t._$dataset(e, 'value') || e.innerText;
            if (!this.__noInputFill) this.__input.value = i;
            this.__byKeyDown = !1;
          }
        }._$bind(this),
        200,
      );
    };
    s.__onInput = function (e) {
      if (!this.__byClick && !this.__byKeyDown) {
        var t = this.__input.value.trim();
        this._$dispatchEvent('onchange', t, e);
        var n = 0,
          a = e.keyCode;
        if (38 == a) n = -1;
        if (40 == a) n = 1;
        if (n) {
          i._$stop(e);
          if (this.__list) {
            var o = Math.max(0, Math.min(this.__index + n, this.__list.length - 1));
            if (o !== this.__index) {
              this.__deSelectItem(this.__index);
              this.__doSelectItem(o);
              this.__doProSelect();
            }
          }
        }
      }
    };
    s.__onKeyBoardSelect = function (e) {
      var t = 0,
        n = e.keyCode;
      if (38 == n) t = -1;
      if (40 == n) t = 1;
      if (t) {
        i._$stop(e);
        if (this.__list) {
          var a = Math.max(0, Math.min(this.__index + t, this.__list.length - 1));
          if (a !== this.__index) {
            this.__deSelectItem(this.__index);
            this.__doSelectItem(a);
            this.__doProSelect();
          }
        }
      }
    };
    s.__onKeyBoardEnter = function (e, t) {
      if (13 == e.keyCode) this.__doFinishSelect(t, e);
    };
    s._$setList = (function () {
      var e = function (e, t) {
        e.flag = t;
      };
      return function (t, i) {
        this.__doDestroyList();
        if (t && t.length) {
          this.__list = t;
          this.__doSelectItem(0);
          this.__registDomEvent(i);
          n._$forEach(this.__list, e);
          this.__sopt.parent.style.visibility = 'visible';
        }
      };
    })();
  },
  'ad01531f53c8c24b12a9db4322fa8f85',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'ad01531f53c8c24b12a9db4322fa8f85',
);
