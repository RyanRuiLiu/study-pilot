EDU(
  '05b537d315730cc58840ada1f88f3430',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.m'),
      r = NEJ.P('nej.u'),
      s = NEJ.P('nej.ut'),
      c = NEJ.P('edu.u'),
      d,
      l = 'js-zhvr-901',
      u = 'ui-' + r._$randNumberString(),
      _ = [
        '163.com',
        '126.com',
        'yeah.net',
        'vip.163.com',
        'vip.126.com',
        'popo.163.com',
        '188.com',
        'qq.com',
        'yahoo.com',
        'sina.com',
      ];
    var f =
      '#<uispace>-hack{position:absolute;z-index:99;}\t\t\t\t       #<uispace>{position:absolute;z-index:101;border:1px solid #d5d5d5;background:#FAFAFA;color:#444}\t\t\t           #<uispace> .zitm{width:100%;text-indent:6px;height:32px;line-height:32px;cursor:default;}\t\t\t           #<uispace> .zitm.' +
      l +
      '{color:#16914E;background-color:#ECECEE;}';
    a._$$LoginSuggest = NEJ.C();
    d = a._$$LoginSuggest._$extend(s._$$Event, !0);
    a._$$LoginSuggest._$bind = function (e, t) {
      if (f) {
        i._$addStyle(f.replace(/\#\<.*?\>/gi, '.' + u));
        f = null;
      }
      return new a._$$LoginSuggest(e, t);
    };
    d.__init = function (e, t) {
      this.__supInit(t);
      this.__input = i._$get(e);
      this.__input.setAttribute('autocomplete', 'off');
      this.__body = i._$create('div', u);
      this.__parent = i._$get(t.parent) || document.body;
      this._$resetOption(t);
      o._$addEvent(this.__input, 'blur', this.__onInputBlur._$bind(this));
      o._$addEvent(this.__input, 'focus', this.__onInputFocus._$bind(this));
      o._$addEvent(this.__input, 'keydown', this.__onInputWrite._$bind(this));
      o._$addEvent(this.__body, 'mouseover', this.__onHover._$bind(this));
    };
    d._$resetOption = function (e) {
      e = e || t;
      this.__suffixes = e.suffixes || _;
      this._$addEvent('onselect', e.onselect || n);
      if (e.width) this.__body.style.width = e.width + 'px';
    };
    d.__onInputBlur = function (t) {
      this.q = e.clearInterval(this.q);
      if (c._$trim(this.__input.value)) this.__select();
    };
    d.__onInputFocus = function (t) {
      this.__oldinput = c._$trim(this.__input.value);
      if (!this.q) this.q = e.setInterval(this.__monitor._$bind(this), 100);
    };
    d.__onInputWrite = function (e) {
      if (this.__working()) {
        var t = e.keyCode;
        switch (t) {
          case 9:
          case 13:
            this.__select();
            break;
          case 38:
          case 40:
            this.__move(40 == t);
        }
      }
    };
    d.__onHover = function (e) {
      var t = o._$getElement(e),
        n = i._$getChildren(this.__body);
      if (n.length && n[0] != t)
        for (var a = 1, r = n.length; a < r; ++a)
          n[a] == t ? i._$addClassName(n[a], l) : i._$delClassName(n[a], l);
    };
    d.__working = function () {
      var e = this.__body.parentNode;
      return !!e && !!e.tagName;
    };
    d.__move = function (e) {
      var t = i._$getChildren(this.__body);
      for (var n = 0, o = t.length, a; n < o; ++n)
        if (i._$hasClassName(t[n], l)) {
          a = e ? (n == o - 1 ? 1 : n + 1) : 1 == n ? o - 1 : n - 1;
          i._$delClassName(t[n], l);
          i._$addClassName(t[a], l);
          break;
        }
    };
    d.__select = function () {
      for (var e = 0, t = i._$getChildren(this.__body), n = t.length; e < n; ++e)
        if (i._$hasClassName(t[e], l)) {
          this.__input.value = t[e].innerHTML;
          this.__oldinput = this.__input.value;
          this._$render(!1);
          this._$dispatchEvent('onselect');
          break;
        }
      if (e >= n && t[1]) {
        this.__input.value = t[1].innerHTML;
        this.__oldinput = this.__input.value;
        this._$render(!1);
        this._$dispatchEvent('onselect');
      }
    };
    d._$render = function (e) {
      !e ? i._$removeByEC(this.__body) : this.__parent.appendChild(this.__body);
    };
    d.__monitor = function () {
      var e = c._$trim(this.__input.value);
      if (e != this.__oldinput) {
        this.__oldinput = e;
        this.__setList(e);
      }
    };
    d.__clearList = function () {
      this.__body.innerHTML = '';
    };
    d.__setList = function (e) {
      this.__clearList();
      var e = r._$escape(e || '');
      if (e) {
        var t = [],
          n;
        var i = e.indexOf('@'),
          o = this.__suffixes;
        if (i < 0) for (n = 0; n < o.length; ++n) t.push(e + '@' + o[n]);
        else {
          var a = e.substring(i + 1),
            s = a.length;
          for (n = 0; n < o.length; ++n)
            if (o[n].substr(0, s) == a) t.push(e.substring(0, i) + '@' + o[n]);
        }
        if (t.length) {
          for (
            var n = 0, c = ['<div class="zitm f-thide s-fc6">请选择或继续输入...</div>'];
            n < t.length;
            ++n
          )
            c.push('<div class="zitm f-thide' + (0 == n ? ' ' + l : '') + '">' + t[n] + '</div>');
          this._$render(!0);
          this.__body.innerHTML = c.join('');
        } else this._$render(!1);
      } else this._$render(!1);
    };
    d._$setPosition = function (e, t) {
      if (null != e && null != t) {
        var n = this.__body.style;
        n.top = t + 'px';
        n.left = e + 'px';
      }
    };
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
