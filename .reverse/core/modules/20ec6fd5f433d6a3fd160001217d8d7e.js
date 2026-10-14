EDU(
  '20ec6fd5f433d6a3fd160001217d8d7e',
  function (e, t) {
    !(function () {
      UE = window.UE || {};
      var e = !!window.ActiveXObject;
      var t = {
        removeLastbs: function (e) {
          return e.replace(/\/$/, '');
        },
        extend: function (e, t) {
          var n = arguments,
            i = this.isBoolean(n[n.length - 1]) ? n[n.length - 1] : !1,
            o = this.isBoolean(n[n.length - 1]) ? n.length - 1 : n.length;
          for (var a = 1; a < o; a++) {
            var r = n[a];
            for (var s in r) if (!i || !e.hasOwnProperty(s)) e[s] = r[s];
          }
          return e;
        },
        isIE: e,
        cssRule: e
          ? function (e, t, n) {
              var i, o;
              n = n || document;
              if (n.indexList) i = n.indexList;
              else i = n.indexList = {};
              var a;
              if (!i[e]) {
                if (void 0 === t) return '';
                a = n.createStyleSheet('', (o = n.styleSheets.length));
                i[e] = o;
              } else a = n.styleSheets[i[e]];
              if (void 0 === t) return a.cssText;
              a.cssText = a.cssText + '\n' + (t || '');
            }
          : function (e, t, n) {
              n = n || document;
              var i = n.getElementsByTagName('head')[0],
                o;
              if (!(o = n.getElementById(e))) {
                if (void 0 === t) return '';
                o = n.createElement('style');
                o.id = e;
                i.appendChild(o);
              }
              if (void 0 === t) return o.innerHTML;
              if ('' !== t) o.innerHTML = o.innerHTML + '\n' + t;
              else i.removeChild(o);
            },
        domReady: function (t) {
          var n = window.document;
          if ('complete' === n.readyState) t();
          else if (e) {
            !(function () {
              if (!n.isReady) {
                try {
                  n.documentElement.doScroll('left');
                } catch (e) {
                  setTimeout(arguments.callee, 0);
                  return;
                }
                t();
              }
            })();
            window.attachEvent('onload', function () {
              t();
            });
          } else {
            n.addEventListener(
              'DOMContentLoaded',
              function () {
                n.removeEventListener('DOMContentLoaded', arguments.callee, !1);
                t();
              },
              !1,
            );
            window.addEventListener(
              'load',
              function () {
                t();
              },
              !1,
            );
          }
        },
        each: function (e, t, n) {
          if (null != e)
            if (e.length === +e.length) {
              for (var i = 0, o = e.length; i < o; i++) if (t.call(n, e[i], i, e) === !1) return !1;
            } else
              for (var a in e) if (e.hasOwnProperty(a)) if (t.call(n, e[a], a, e) === !1) return !1;
        },
        inArray: function (e, t) {
          var n = -1;
          this.each(e, function (e, i) {
            if (e === t) {
              n = i;
              return !1;
            }
          });
          return n;
        },
        pushItem: function (e, t) {
          if (this.inArray(e, t) == -1) e.push(t);
        },
        trim: function (e) {
          return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
        },
        indexOf: function (e, t, n) {
          var i = -1;
          n = this.isNumber(n) ? n : 0;
          this.each(e, function (e, o) {
            if (o >= n && e === t) {
              i = o;
              return !1;
            }
          });
          return i;
        },
        hasClass: function (e, t) {
          t = t
            .replace(/(^[ ]+)|([ ]+$)/g, '')
            .replace(/[ ]{2,}/g, ' ')
            .split(' ');
          for (var n = 0, i, o = e.className; (i = t[n++]);)
            if (!new RegExp('\\b' + i + '\\b', 'i').test(o)) return !1;
          return n - 1 == t.length;
        },
        addClass: function (e, n) {
          if (e) {
            n = this.trim(n)
              .replace(/[ ]{2,}/g, ' ')
              .split(' ');
            for (var i = 0, o, a = e.className; (o = n[i++]);)
              if (!new RegExp('\\b' + o + '\\b').test(a)) a += ' ' + o;
            e.className = t.trim(a);
          }
        },
        removeClass: function (e, t) {
          t = this.isArray(t)
            ? t
            : this.trim(t)
                .replace(/[ ]{2,}/g, ' ')
                .split(' ');
          for (var n = 0, i, o = e.className; (i = t[n++]);)
            o = o.replace(new RegExp('\\b' + i + '\\b'), '');
          o = this.trim(o).replace(/[ ]{2,}/g, ' ');
          e.className = o;
          !o && e.removeAttribute('className');
        },
        on: function (e, n, i) {
          var o = this.isArray(n) ? n : n.split(/\s+/),
            a = o.length;
          if (a)
            for (; a--;) {
              n = o[a];
              if (e.addEventListener) e.addEventListener(n, i, !1);
              else {
                if (!i._d) i._d = { els: [] };
                var r = n + i.toString(),
                  s = t.indexOf(i._d.els, e);
                if (!i._d[r] || s == -1) {
                  if (s == -1) i._d.els.push(e);
                  if (!i._d[r])
                    i._d[r] = function (e) {
                      return i.call(e.srcElement, e || window.event);
                    };
                  e.attachEvent('on' + n, i._d[r]);
                }
              }
            }
          e = null;
        },
        off: function (e, n, i) {
          var o = this.isArray(n) ? n : n.split(/\s+/),
            a = o.length;
          if (a)
            for (; a--;) {
              n = o[a];
              if (e.removeEventListener) e.removeEventListener(n, i, !1);
              else {
                var r = n + i.toString();
                try {
                  e.detachEvent('on' + n, i._d ? i._d[r] : i);
                } catch (s) {}
                if (i._d && i._d[r]) {
                  var c = t.indexOf(i._d.els, e);
                  if (c != -1) i._d.els.splice(c, 1);
                  0 == i._d.els.length && delete i._d[r];
                }
              }
            }
        },
        loadFile: (function () {
          function e(e, n) {
            try {
              for (var i = 0, o; (o = t[i++]);)
                if (o.doc === e && o.url == (n.src || n.href)) return o;
            } catch (a) {
              return null;
            }
          }
          var t = [];
          return function (n, i, o) {
            var a = e(n, i);
            if (!a) {
              t.push({ doc: n, url: i.src || i.href, funs: [o] });
              if (n.body) {
                if (!i.id || !n.getElementById(i.id)) {
                  var r = n.createElement(i.tag);
                  delete i.tag;
                  for (var s in i) r.setAttribute(s, i[s]);
                  r.onload = r.onreadystatechange = function () {
                    if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                      a = e(n, i);
                      if (a.funs.length > 0) {
                        a.ready = 1;
                        for (var t; (t = a.funs.pop());) t();
                      }
                      r.onload = r.onreadystatechange = null;
                    }
                  };
                  r.onerror = function () {
                    throw Error('The load ' + (i.href || i.src) + ' fails,check the url');
                  };
                  n.getElementsByTagName('head')[0].appendChild(r);
                }
              } else {
                var c = [];
                for (var s in i)
                  if ('tag' != s) c.push(s + '="' + i[s] + '"');
                  else;
                n.write('<' + i.tag + ' ' + c.join(' ') + ' ></' + i.tag + '>');
              }
            } else if (a.ready) o && o();
            else a.funs.push(o);
          };
        })(),
      };
      t.each(
        ['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Boolean'],
        function (e) {
          t['is' + e] = function (t) {
            return Object.prototype.toString.apply(t) == '[object ' + e + ']';
          };
        },
      );
      var n = {};
      UE.parse = {
        register: function (e, t) {
          n[e] = t;
        },
        load: function (e) {
          t.each(n, function (n) {
            n.call(e, t);
          });
        },
      };
      uParse = function (e, n) {
        t.domReady(function () {
          var i;
          if (document.querySelectorAll) i = document.querySelectorAll(e);
          else if (/^#/.test(e)) i = [document.getElementById(e.replace(/^#/, ''))];
          else if (/^\./.test(e)) {
            var i = [];
            t.each(document.getElementsByTagName('*'), function (t) {
              if (
                t.className &&
                new RegExp('\\b' + e.replace(/^\./, '') + '\\b', 'i').test(t.className)
              )
                i.push(t);
            });
          } else i = document.getElementsByTagName(e);
          t.each(i, function (i) {
            UE.parse.load(t.extend({ root: i, selector: e }, n));
          });
        });
      };
      uParse2 = function (e, n, i) {
        var o = [e];
        t.each(o, function (e) {
          UE.parse.load(t.extend({ root: e, selector: n }, i));
        });
      };
    })();
    Function.prototype.bind = function () {
      var e = arguments,
        t = arguments[0],
        n = this;
      return function () {
        var i = [].slice.call(e, 1);
        [].push.apply(i, arguments);
        return n.apply(t || window, i);
      };
    };
    UE.parse.register('insertcode', function (e) {
      function t() {
        var t = i.getElementsByTagName('code');
        e.each(
          t,
          function (e) {
            if (t[0] && /brush/i.test(t[0].className)) SyntaxHighlighter.highlight(null, t[0]);
          }.bind(this),
        );
      }
      var n = this.root.getElementsByTagName('code');
      if (n.length && window.SyntaxHighlighter) {
        var i = this.root;
        if (i.parentNode) t();
      }
    });
    UE.parse.register('background', function (e) {
      var t = this,
        n = t.root,
        i = n.getElementsByTagName('p'),
        o;
      for (var a = 0, r; (r = i[a++]);) {
        o = r.getAttribute('data-background');
        if (o) r.parentNode.removeChild(r);
      }
      o && e.cssRule('ueditor_background', t.selector + '{' + o + '}', document);
    });
    UE.parse.register('list', function (e) {
      function t(t) {
        var o = this;
        e.each(t, function (t) {
          if (t.className && /custom_/i.test(t.className)) {
            var a = t.className.match(/custom_(\w+)/)[1];
            if ('dash' == a || 'dot' == a) {
              e.pushItem(
                n,
                s + ' li.list-' + i[a] + '{background-image:url(' + o.liiconpath + i[a] + '.gif)}',
              );
              e.pushItem(
                n,
                s +
                  ' ul.custom_' +
                  a +
                  '{list-style:none;} ' +
                  s +
                  ' ul.custom_' +
                  a +
                  ' li{background-position:0 3px;background-repeat:no-repeat}',
              );
            } else {
              var r = 1;
              e.each(t.childNodes, function (t) {
                if ('LI' == t.tagName) {
                  e.pushItem(
                    n,
                    s +
                      ' li.list-' +
                      i[a] +
                      r +
                      '{background-image:url(' +
                      o.liiconpath +
                      'list-' +
                      i[a] +
                      r +
                      '.gif)}',
                  );
                  r++;
                }
              });
              e.pushItem(
                n,
                s +
                  ' ol.custom_' +
                  a +
                  '{list-style:none;}' +
                  s +
                  ' ol.custom_' +
                  a +
                  ' li{background-position:0 3px;background-repeat:no-repeat}',
              );
            }
            switch (a) {
              case 'cn':
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-1{padding-left:25px}');
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-2{padding-left:40px}');
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-3{padding-left:55px}');
                break;
              case 'cn1':
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-1{padding-left:30px}');
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-2{padding-left:40px}');
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-3{padding-left:55px}');
                break;
              case 'cn2':
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-1{padding-left:40px}');
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-2{padding-left:55px}');
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-3{padding-left:68px}');
                break;
              case 'num':
              case 'num1':
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-1{padding-left:25px}');
                break;
              case 'num2':
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-1{padding-left:35px}');
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft-2{padding-left:40px}');
                break;
              case 'dash':
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft{padding-left:35px}');
                break;
              case 'dot':
                e.pushItem(n, s + ' li.list-' + a + '-paddingleft{padding-left:20px}');
            }
          }
        });
      }
      var n = [],
        i = {
          cn: 'cn-1-',
          cn1: 'cn-2-',
          cn2: 'cn-3-',
          num: 'num-1-',
          num1: 'num-2-',
          num2: 'num-3-',
          dash: 'dash',
          dot: 'dot',
        };
      e.extend(this, { liiconpath: 'http://bs.baidu.com/listicon/', listDefaultPaddingLeft: '20' });
      var o = this.root,
        a = o.getElementsByTagName('ol'),
        r = o.getElementsByTagName('ul'),
        s = this.selector;
      if (a.length) t.call(this, a);
      if (r.length) t.call(this, r);
      if (a.length || r.length) {
        n.push(s + ' .list-paddingleft-1{padding-left:0}');
        n.push(s + ' .list-paddingleft-2{padding-left:' + this.listDefaultPaddingLeft + 'px}');
        n.push(s + ' .list-paddingleft-3{padding-left:' + 2 * this.listDefaultPaddingLeft + 'px}');
        e.cssRule('list', s + ' ol,' + s + ' ul{margin:0;padding:0;}' + n.join('\n'), document);
      }
    });
  },
  '27686b3c560af71bed80223c857240ee',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
