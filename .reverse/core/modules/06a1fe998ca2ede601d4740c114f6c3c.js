EDU(
  '06a1fe998ca2ede601d4740c114f6c3c',
  function (e, t, n) {
    var i = {},
      o = this;
    var a = null;
    i.turnNewPage = function (e) {
      var t = window.document.createElement('form');
      var n = e.parameters || null;
      var i;
      var a;
      var r;
      t.target = '_blank';
      t.action = e.url;
      t.method = 'post';
      if (n)
        for (r in n) {
          i = window.document.createElement('input');
          i.type = 'hidden';
          i.name = r;
          i.value = n[r];
          t.appendChild(i);
        }
      a = e.node || o.document.body;
      a.appendChild(t);
      t.submit();
      a.removeChild(t);
    };
    i.debounce = function (e, t, n) {
      var i;
      return function () {
        var o = this,
          a = arguments;
        var r = function () {
          i = null;
          if (!n) e.apply(o, a);
        };
        var s = n && !i;
        clearTimeout(i);
        i = setTimeout(r, t);
        if (s) e.apply(o, a);
      };
    };
    i.once = function (e, t) {
      var n;
      return function () {
        if (e) {
          n = e.apply(t || this, arguments);
          e = null;
        }
        return n;
      };
    };
    i.requestAnimationFrame = function () {
      var e = 0;
      var t = ['ms', 'moz', 'webkit', 'o'];
      var n;
      if (window.requestAnimationFrame) n = window.requestAnimationFrame;
      for (var i = 0; i < t.length && !n; ++i) n = window[t[i] + 'RequestAnimationFrame'];
      if (!n)
        n = function (t, n) {
          var i = new Date().getTime();
          var o = Math.max(0, 16 - (i - e));
          var a = window.setTimeout(function () {
            t(i + o);
          }, o);
          e = i + o;
          return a;
        };
      return n.apply(this, arguments);
    };
    i.extend = function (e, t, n, i) {
      for (var o in t) if ((!i || t.hasOwnProperty(o)) && (n || void 0 == e[o])) e[o] = t[o];
      return e;
    };
    i.listenFocus = function () {
      e._$addEvent(document, 'focusin', function () {
        a = !0;
      });
      e._$addEvent(document, 'focusout', function () {
        a = !1;
      });
      i.listenFocus = function () {};
    };
    i.getPageScroll = function () {
      return {
        x:
          window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0,
        y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      };
    };
    i.constlize = function (e, t) {
      var n = e.split(/\B(?=[A-Z])/);
      for (var i = 0; i < n.length; i++) n[i] = t ? n[i].toLowerCase() : n[i].toUpperCase();
      return n.join('_');
    };
    i.getValueByVisitor = function (e, t) {
      var n = t.split('.'),
        i = e;
      try {
        for (var o = 0; o < n.length; o++) i = i[n[o]];
      } catch (a) {
        i = void 0;
      }
      return i;
    };
    i.getIsInput = function () {
      return a;
    };
    i.setIsInput = function (e) {
      a = e;
      return a;
    };
    i.numToCheckArr = function (e, t) {
      var n;
      e = e.toString(2).split('');
      for (var i = 0; i < e.length; i++) e[i] = '0' === e[i] ? !1 : !0;
      n = t - e.length;
      for (; n--;) e.unshift(!1);
      return e;
    };
    i.checkArrToNum = function (e) {
      for (var t = 0; t < e.length; t++) e[t] = e[t] ? 1 : 0;
      return parseInt(e.join(''), 2);
    };
    i.getSelectedsByOneId = function (e, t, n) {
      function i(e, r) {
        for (var s = 0; s < e.length; s++) {
          if (a) return;
          if (e[s][n] === t) {
            a = !0;
            o[r] = e[s][n];
            o = o.slice(0, r + 1);
          } else if (e[s]['children']) {
            o[r] = e[s][n];
            i(e[s]['children'], r + 1);
          }
        }
      }
      var o = [],
        a = !1;
      n = n || 'id';
      i(e, 0);
      if (a) return o;
      else return [];
    };
    i.extend = function (e, t, n, i) {
      for (var o in t) if ((!i || t.hasOwnProperty(o)) && (n || void 0 === e[o])) e[o] = t[o];
      return e;
    };
    i.fileToDataURL = function (e) {
      return new t(function (t) {
        var n = new FileReader();
        n.addEventListener(
          'load',
          function () {
            t(this.result);
          },
          !1,
        );
        n.readAsDataURL(e);
      });
    };
    i.filesToDataURLs = function (e) {
      return t.all(
        [].slice.call(e).map(function (e) {
          return i.fileToDataURL(e);
        }),
      );
    };
    i.closest = function (e, t) {
      if ('function' == typeof e.matches) {
        if (!document.documentElement.contains(e)) return null;
        do {
          if (e.matches(t)) return e;
          e = e.parentElement;
        } while (null !== e);
        return null;
      } else {
        var n = (o.document || o.ownerDocument).querySelectorAll(t),
          i;
        do {
          i = n.length;
          for (; --i >= 0 && n.item(i) !== e;);
        } while (i < 0 && (e = e.parentElement));
        return e;
      }
    };
    i.unwrap = function (e) {
      var t = document.createDocumentFragment();
      for (; e.firstChild;) {
        var n = e.removeChild(e.firstChild);
        t.appendChild(n);
      }
      e.parentNode.replaceChild(t, e);
    };
    i.wrap = function (e, t) {
      t = t || document.createElement('div');
      e.parentNode.appendChild(t);
      t.appendChild(e);
      return t;
    };
    i.resetFormElement = function (e) {
      var t = i.wrap(e, document.createElement('form'));
      i.closest(e, 'form').reset();
      i.unwrap(t);
    };
    i.getContentWidth = function (e) {
      var t = o.getComputedStyle(e);
      return e.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight);
    };
    i.getContentHeight = function (e) {
      var t = o.getComputedStyle(e);
      return e.clientHeight - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom);
    };
    i.getPrefixAndSuffix = function (e) {
      var t = e.lastIndexOf('.');
      if (t === -1) return { prefix: e, suffix: '' };
      else return { prefix: e.substr(0, t), suffix: e.substr(t) };
    };
    i.omitStr = function (e, t, n, o) {
      var a = i.getPrefixAndSuffix(e),
        r = a.prefix,
        s = a.suffix;
      t = t || 5;
      n = n || t;
      if (o)
        if (r.length <= t + n) return e;
        else return r.substr(0, t) + '...' + r.substr(-n) + s;
      else if (e.length <= t + n) return e;
      else return e.substr(0, t) + '...' + e.substr(-n);
    };
    i.updateUrlParameter = function (e, t, n) {
      var i = e.indexOf('#');
      var o = i === -1 ? '' : e.substr(i);
      e = i === -1 ? e : e.substr(0, i);
      var a = new RegExp('([?&])' + t + '=.*?(&|$)', 'i');
      var r = e.indexOf('?') !== -1 ? '&' : '?';
      if (!n) {
        e = e.replace(new RegExp('([?&]?)' + t + '=[^&]*', 'i'), '');
        if ('?' === e.slice(-1)) e = e.slice(0, -1);
        if (e.indexOf('?') === -1) e = e.replace(/&/, '?');
      } else if (e.match(a)) e = e.replace(a, '$1' + t + '=' + n + '$2');
      else e = e + r + t + '=' + n;
      return e + o;
    };
    i.addTimestampOnUrl = function (e, t) {
      t = t || 'timestamp';
      return i.updateUrlParameter(e, t, +new Date());
    };
    i.jsonToQueryString = function (e) {
      return Object.keys(e)
        .map(function (t) {
          return encodeURIComponent(t) + '=' + encodeURIComponent(e[t]);
        })
        .join('&');
    };
    i.formatRestfulUrl = function (e, t) {
      var n = /\{(.*?)\}/gi,
        i = /\/:([\w]+?)(?=\/|$)/gi,
        o = '';
      o = e.replace(n, function (e, n) {
        return encodeURIComponent(t[n]) || e;
      });
      o = o.replace(i, function (e, n) {
        return t[n] ? '/' + encodeURIComponent(t[n]) : e;
      });
      return o;
    };
    i.download = function (e, t, n) {
      var o = document.createElement('iframe');
      o.setAttribute(
        'style',
        'display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;',
      );
      o.setAttribute('height', '0px');
      o.setAttribute('width', '0px');
      o.setAttribute('frameborder', '0');
      document.body.appendChild(o);
      t = t || {};
      n = n || {};
      e = i.formatRestfulUrl(e, n || {});
      o.src = window.location.origin + e + '?' + i.jsonToQueryString(t);
    };
    i.delCharset = function (e) {
      var t = '',
        n = null,
        i = 1;
      for (; arguments[i];) {
        t += '|' + arguments[i];
        i++;
      }
      t = t.substr(1);
      n = new RegExp(t, 'g');
      return e.replace(n, '');
    };
    return i;
  },
  '3f8f347c9171583dc1295dc796e8a1bf',
  'acaf016265ee9e46872cbbb2398ea4b7',
  '9a830f6a308feb17fe43372af2d6e799',
);
