EDU(
  '6d39e324797cb82838cea3c6a550723f',
  function (e, t, n, i, o, a, r) {
    if ('trident' === t._$KERNEL.engine)
      EDU('61b11e89726b12a946056854825d3b09', function () {
        e.__getChildren = e.__getChildren._$aop(function (e) {
          var t = e.args[0];
          if (!t.children) {
            e.stopped = !0;
            var i = [];
            n._$forEach(t.childNodes, function (e) {
              if (1 == e.nodeType) i.push(e);
            });
            e.value = i;
          }
        });
      });
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release <= '6.0')
      EDU('bbb25e7d3dd790e4ed20c0fb23a65ea5', function () {
        e.__dataset = (function () {
          var e = {},
            t = 'data-',
            i = /\-(.{1})/gi;
          var o = function (o) {
            var a = o.id;
            if (!e[a]) {
              var r = {};
              n._$forEach(o.attributes, function (e) {
                var n = e.nodeName;
                if (0 == n.indexOf(t)) {
                  n = n.replace(t, '').replace(i, function (e, t) {
                    return t.toUpperCase();
                  });
                  r[n] = e.nodeValue || '';
                }
              });
              e[a] = r;
            }
          };
          return function (t, n, i) {
            o(t);
            var a = e[t.id];
            if (void 0 !== i) a[n] = i;
            return a[n];
          };
        })();
      });
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release <= '5.0')
      EDU('3695e0d68b55e2a159278db7072ed136', function () {
        try {
          document.execCommand('BackgroundImageCache', !1, !0);
        } catch (t) {}
        e.__injectCSSText = (function () {
          var t = 30;
          return e.__injectCSSText._$aop(function (e) {
            var n = e.args[0];
            if (n.styleSheet) {
              e.stopped = !0;
              var i = e.args[1];
              var o = document.styleSheets;
              if (o.length > t) {
                n = o[t];
                i = n.cssText + i;
              } else n = n.styleSheet;
              n.cssText = i;
            }
          });
        })();
        e.__getClassRegExp = (function () {
          var e = /\s+/g;
          return function (t) {
            t = (t || '').trim().replace(e, '|');
            return !t ? null : new RegExp('(\\s|^)(?:' + t + ')(?=\\s|$)', 'g');
          };
        })();
        e.__processClassName = function (t, n, i) {
          i = i || '';
          var o = t.className || '',
            a = e.__getClassRegExp(i + ' ' + (arguments[3] || ''));
          var r = o;
          if (a) r = r.replace(a, '');
          switch (n) {
            case 'remove':
              i = '';
              break;
            case 'replace':
              i = arguments[3] || '';
          }
          r = (r + ' ' + i).trim();
          if (o != r) t.className = r;
        };
        e.__hasClassName = function (t, n) {
          var i = e.__getClassRegExp(n);
          if (i) return i.test(t.className || '');
          else return !1;
        };
      });
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release <= '4.0')
      EDU('656509553570316dc8535903327a6469', function () {
        e.__getElementsByClassName = function (e, t) {
          var i = [],
            o = new RegExp('(\\s|^)(?:' + t.replace(/\s+/g, '|') + ')(?=\\s|$)');
          n._$forEach(e.getElementsByTagName('*'), function (e) {
            if (o.test(e.className)) i.push(e);
          });
          return i;
        };
        e.__nextSibling = function (e) {
          for (; (e = e.nextSibling);) if (1 == e.nodeType) return e;
        };
        e.__previousSibling = function (e) {
          for (; (e = e.previousSibling);) if (1 == e.nodeType) return e;
        };
        e.__serializeDOM2XML = function (e) {
          return 'xml' in e ? e.xml : e.outerHTML;
        };
        e.__parseDOMFromXML = (function () {
          var e = ['Msxml2.DOMDocument.6.0', 'Msxml2.DOMDocument.3.0'];
          var t = function () {
            try {
              for (var t = 0, n = e.length; t < n; t++) return new ActiveXObject(e[t]);
            } catch (i) {
              return null;
            }
          };
          return function (e) {
            var n = t();
            if (n && n.loadXML(e) && !n.parseError.errorCode) return n.documentElement;
            else return null;
          };
        })();
        e.__getStyleValue = (function () {
          var t = /opacity\s*=\s*([\d]+)/i;
          var n = {
            opacity: function (e) {
              var n = 0;
              if (t.test(e.filter || '')) n = parseFloat(RegExp.$1) / 100;
              return n;
            },
          };
          return function (t, i) {
            var o = t.currentStyle,
              a = n[i];
            if (a) return a(o);
            else return o[e.__getStyleName(i)] || '';
          };
        })();
        e.__setStyleValue = (function () {
          var t = {
            opacity: function (e, t) {
              e.style.filter = 'alpha(opacity=' + 100 * t + ')';
            },
          };
          return function (n, i, o) {
            var a = t[i];
            if (a) a(n, o);
            else n.style[e.__getStyleName(i)] = o;
          };
        })();
        e.__appendCSSText = function (e, t) {
          var n = e.styleSheet,
            i = n.rules.length,
            o = t.split(/[\{\}]/);
          n.addRule(o[0], o[1], i);
          return n.rules[i];
        };
      });
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release <= '3.0')
      EDU('7ab2b6f8ece64b7df7638fd8c1eff721', function () {
        e.__getAttribute = e.__getAttribute._$aop(null, function (e) {
          var t = e.args;
          if ('maxlength' == t[1] && 2147483647 == e.value) e.value = null;
        });
      });
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release <= '2.0')
      EDU('21a5472b1021807e5de972e2bf85350b', function () {
        e.__fullScreen = function (e, t) {
          var n = e.style;
          n.width = t.scrollWidth + 'px';
          n.height = t.scrollHeight + 'px';
        };
        e.__mask = (function () {
          var t = {};
          e.__unmask = function (e) {
            var n = e.id,
              i = t[n];
            if (i) {
              delete t[n];
              i.parentNode.removeChild(i);
            }
          };
          return function (e) {
            var n = e.id,
              i = t[n];
            if (!i) {
              i = document.createElement('iframe');
              i.style.position = 'absolute';
              t[n] = i;
            }
            var o = i.style,
              a = e.style;
            o.top = (parseInt(a.top) || 0) + 'px';
            o.left = (parseInt(a.left) || 0) + 'px';
            o.width = e.offsetWidth + 'px';
            o.height = e.offsetHeight + 'px';
            e.insertAdjacentElement('beforeBegin', i);
            return i;
          };
        })();
      });
    if ('gecko' === t._$KERNEL.engine)
      EDU('82e391468e570bc213ebed41c8ab9470', function () {
        if (!t._$SUPPORT.css3d) t._$SUPPORT.css3d = 'MozPerspective' in document.body.style;
        if (!('insertAdjacentElement' in document.body))
          HTMLElement.prototype.insertAdjacentElement = function (e, t) {
            if (e && t)
              switch (e) {
                case 'beforeEnd':
                  this.appendChild(t);
                  return;
                case 'beforeBegin':
                  this.parentNode.insertBefore(t, this);
                  return;
                case 'afterBegin':
                  !this.firstChild ? this.appendChild(t) : this.insertBefore(t, this.firstChild);
                  return;
                case 'afterEnd':
                  !this.nextSibling
                    ? this.parentNode.appendChild(t)
                    : this.parentNode.insertBefore(t, this.nextSibling);
                  return;
              }
          };
        if (!('innerText' in document.body)) {
          HTMLElement.prototype['__defineGetter__']('innerText', function () {
            return this.textContent;
          });
          HTMLElement.prototype['__defineSetter__']('innerText', function (e) {
            this.textContent = e;
          });
        }
      });
    return e;
  },
  'bbf67ded5364ba1d6349943a991cca4c',
  'f051aeae7bb889518ead30ef6e491df3',
  'fe86216ed59e3103a56c42c850d389f0',
);
