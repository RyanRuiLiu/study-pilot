!(function (e) {
  var t = function (e, t) {
    try {
      var i = document.createElement('img'),
        n,
        r;
      i.style.position = 'absolute';
      i.style.width = '0px';
      i.style.height = '0px';
      document.body.appendChild(i);
      if ('nss' === t)
        i.src =
          'https://pr.nss.netease.com/sentry/passive?clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&uapi=msgerror&dataTime=' +
          new Date().getTime();
      else {
        n = JSON.stringify(e.stack);
        n = n.slice(0, 300);
        r = location.href.slice(0, 200);
        i.src =
          'https://dl.reg.163.com/UA1435545636633/__utm.gif?log=msgerror&e=' +
          n +
          '&bw=' +
          navigator.userAgent +
          '&from=' +
          r;
      }
      setTimeout(function () {
        document.body.appendChild(i);
      }, 1e4);
    } catch (o) {}
  };
  try {
    if ('function' == typeof define && window.define.amd) window.define([], e);
    else e();
  } catch (i) {
    t(i, 'nss');
    t(i);
  }
})(function () {
  var e = '2024-01-03';
  var t = '';
  var i = 'IS_NEW_MSG';
  var n = '127.0.0.1';
  window.URSCFG = {};
  window.URSCFG.sendLogNumber = 1;
  window.URSCFG.sendLogDtNumber = 1;
  window.URSOPENBGP = '{URSOPENBGPVALUE}';
  var r = {},
    o = {},
    a = {},
    s = {},
    c = [],
    l = 0,
    f,
    u = 100 * Math.random() < window.URSCFG.sendLogNumber,
    d = 100 * Math.random() < window.URSCFG.sendLogDtNumber;
  var h = function () {
    try {
      if (window.localStorage) {
        f = window.localStorage.getItem('urswebzjdeviceid');
        if (!f) {
          f = [new Date().getTime(), Math.floor(1e6 * Math.random())].join('-');
          window.localStorage.setItem('urswebzjdeviceid', f);
        }
      }
    } catch (e) {}
  };
  h();
  var p = function (e) {
    try {
      var t = location.href.slice(0, 200),
        i,
        n,
        r;
      i =
        'https://pr.nss.netease.com/sentry/passive?clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&uapi=msgerror&dataTime=' +
        new Date().getTime();
      g(i);
      r = JSON.stringify(e.stack);
      r = r.slice(0, 300);
      n =
        'https://dl.reg.163.com/UA1435545636633/__utm.gif?log=msgerror&e=' +
        r +
        '&bw=' +
        navigator.userAgent +
        '&from=' +
        t;
      g(n);
    } catch (o) {}
  };
  if (!Function.prototype.bind)
    Function.prototype.bind = function (e) {
      if ('function' != typeof this)
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      var t = Array.prototype.slice.call(arguments, 1),
        i = this,
        n = function () {},
        r = function () {
          return i.apply(
            this instanceof n && e ? this : e,
            t.concat(Array.prototype.slice.call(arguments)),
          );
        };
      if (this.prototype) n.prototype = this.prototype;
      r.prototype = new n();
      return r;
    };
  var g = function (e) {
    var t = document.createElement('img');
    t.style.position = 'absolute';
    t.style.width = '0px';
    t.style.height = '0px';
    document.body.appendChild(t);
    t.src = e;
    setTimeout(function () {
      document.body.appendChild(t);
    }, 1e4);
  };
  var m = (function () {
    var e = '1';
    var n = 'passport-sym3.netease.com';
    var r = [
      { code: 'a', url: 'https://passport-sym3.netease.com/' },
      { code: 'b', url: 'https://reg.163.com/favicon.ico' },
      { code: 'c', url: 'https://q.reg.163.com/qrcode/getqrcodeid' },
      { code: 'd', url: 'https://dl.reg.163.com/favicon.ico' },
    ];
    var o = r.slice(1);
    var a = 5e3;
    var s = 12e3;
    var c = 3;
    var l = 3e5;
    var u = 'urswebzjprobets';
    var d = !1;
    var h = 0;
    var p = 3e5;
    var m = null;
    var v = 20006;
    var w = 'network_probe_error';
    var b = function () {
      try {
        if (window.performance && 'function' == typeof window.performance.now)
          return window.performance.now();
      } catch (e) {}
      return new Date().getTime();
    };
    var y = function (e, t) {
      var i = !1,
        n = b(),
        r;
      var o = function (e) {
        if (!i) {
          i = !0;
          if (r) clearTimeout(r);
          var o = 1 === e ? Math.round(b() - n) : 0;
          try {
            t(e, o);
          } catch (a) {}
        }
      };
      r = setTimeout(function () {
        o(2);
      }, a);
      try {
        if (window.fetch)
          window
            .fetch(e, { mode: 'no-cors', cache: 'no-store' })
            .then(function () {
              o(1);
            })
            ['catch'](function () {
              o(0);
            });
        else {
          var s = new Image();
          s.onload = function () {
            o(1);
          };
          s.onerror = function () {
            o(0);
          };
          s.src = e + (e.indexOf('?') === -1 ? '?' : '&') + 't=' + new Date().getTime();
        }
      } catch (c) {
        o(0);
      }
    };
    var _ = function (e) {
      try {
        var t = (e && e.crossDomainUrl) || '';
        if (!t) return null;
        var i = t.replace(/^https?:\/\//, '');
        var n = i.split('/')[0];
        if (n.indexOf('passport.') === -1) return null;
        if (n.indexOf('dl.reg.163.com') !== -1) return null;
        if (n.indexOf('icourse163.org') !== -1) return null;
        var r = /^http:\/\//.test(t) ? 'http://' : 'https://';
        var o = r + i.replace(/\/+$/, '/');
        return { host: n, base: o };
      } catch (a) {
        return null;
      }
    };
    var S = function (e, t) {
      var i = _(e);
      if (i) {
        var n, r;
        if (window.fetch) {
          n = 'html';
          r = i.base + 'index2.html';
        } else {
          n = 'favicon';
          r = 'https://' + i.host + '/favicon.ico';
        }
        y(r, function (e, r) {
          t({ host: i.host, src: n, status: e, cost: r });
        });
      } else t(null);
    };
    var I = function (e) {
      var t = {},
        i = 0,
        n = 0,
        r = !1,
        a;
      var l = function () {
        if (!r) {
          r = !0;
          if (a) clearTimeout(a);
          for (var i = 0; i < o.length; i++) {
            var n = o[i].code;
            if (!t[n]) t[n] = '2,0';
          }
          try {
            e(t);
          } catch (s) {}
        }
      };
      a = setTimeout(l, s);
      var f = function () {
        if (!r) {
          var e = 0,
            i;
          for (i in t) if (t.hasOwnProperty(i)) e++;
          if (e >= o.length) l();
        }
      };
      var u = function () {
        for (; n < c && i < o.length && !r;) {
          !(function (e) {
            n++;
            y(e.url, function (i, r) {
              n--;
              t[e.code] = i + ',' + r;
              f();
              u();
            });
          })(o[i]);
          i++;
        }
      };
      u();
    };
    var C = function () {
      var e = 0,
        t = new Date().getTime();
      try {
        if (window.localStorage) e = parseInt(window.localStorage.getItem(u), 10) || 0;
        else e = h;
      } catch (i) {
        e = h;
      }
      if (t - e < l) return !1;
      else return !0;
    };
    var k = function () {
      var e = new Date().getTime();
      h = e;
      try {
        if (window.localStorage) window.localStorage.setItem(u, '' + e);
      } catch (t) {}
    };
    var M = function (t, n, o) {
      try {
        var a = 'IS_NEW_MSG' === i ? 'message4' : 'message';
        var s = '';
        for (var c = 0; c < r.length; c++) {
          var l = r[c].code;
          s += (c ? ';' : '') + l + (n[l] || '0,0');
        }
        var u =
          'log=probe&v=' +
          e +
          '&i=' +
          encodeURIComponent(f || '') +
          '&k=' +
          encodeURIComponent((t && t.promark) || '') +
          '&p=' +
          encodeURIComponent((t && t.product) || '') +
          '&t=' +
          new Date().getTime() +
          '&g=1&m=' +
          a +
          '&d=' +
          s;
        if (o)
          u += '&pp=' + encodeURIComponent(o.host + '|' + o.status + ',' + o.cost + '|' + o.src);
        g('https://dl.reg.163.com/UA1435545636633/__utm.gif?' + u);
      } catch (d) {}
    };
    var U = function (t, n, o) {
      var a = 'IS_NEW_MSG' === i ? 'message4' : 'message';
      var s = [];
      for (var c = 0; c < r.length; c++) {
        var l = r[c].code;
        var u = ('' + (n[l] || '0,0')).split(',');
        s.push({
          code: l,
          host: r[c].url.replace(/^https?:\/\//, '').split('/')[0],
          status: parseInt(u[0], 10),
          cost: parseInt(u[1], 10) || 0,
        });
      }
      var d = {
        v: e,
        did: f || '',
        pkid: (t && t.promark) || '',
        pd: (t && t.product) || '',
        ts: new Date().getTime(),
        trigger: 'canary_fail',
        msgProduct: a,
        domains: s,
      };
      if (o) d.pp = { host: o.host, src: o.src, status: o.status, cost: o.cost };
      return d;
    };
    var D = function (e, t, i) {
      try {
        if (!e || 'function' != typeof e.initError) return;
        e.initError({ errNo: v, errMsg: w, timestamp: new Date().getTime(), detail: U(e, t, i) });
      } catch (n) {}
    };
    var R = function (e, t) {
      var i = function (i, n) {
        i = i || {};
        i.a = t;
        D(e, i, n);
        if (C()) {
          k();
          M(e, i, n);
        }
      };
      var n = new Date().getTime();
      if (!(m && n - m.ts < p)) {
        var r = !1,
          o = !1,
          a = null,
          s = null;
        var c = function () {
          if (r && o) {
            m = { ts: new Date().getTime(), domainResults: a, ppResult: s };
            i(a, s);
          }
        };
        I(function (e) {
          a = e;
          o = !0;
          c();
        });
        S(e, function (e) {
          s = e;
          r = !0;
          c();
        });
      } else {
        var l = {};
        for (var f in m.domainResults)
          if (m.domainResults.hasOwnProperty(f)) l[f] = m.domainResults[f];
        i(l, m.ppResult);
      }
    };
    var T = function (e, t) {
      var i = !1,
        n;
      var r = function (e) {
        if (!i) {
          i = !0;
          if (n) clearTimeout(n);
          t(e);
        }
      };
      try {
        var o = 'URSJSONP' + new Date().getTime();
        window[o] = function (e) {
          r(!(e && 0 === e.probe));
        };
        var a = (e && e.promark) || '';
        var s = (e && e.product) || '';
        var c = '1';
        var l =
          '//dl.reg.163.com/dl/getConf?callback=' +
          o +
          '&pkid=' +
          a +
          '&pd=' +
          s +
          '&mode=' +
          c +
          '&probe=1';
        var f = document.createElement('script');
        f.type = 'text/javascript';
        f.id = 'urs-probe-' + o;
        f.onerror = function () {
          r(!0);
        };
        f.src = l;
        document.getElementsByTagName('head')[0].appendChild(f);
        n = setTimeout(function () {
          r(!0);
        }, 3e3);
        setTimeout(function () {
          try {
            document.getElementsByTagName('head')[0].removeChild(f);
          } catch (e) {}
          try {
            delete window[o];
          } catch (e) {
            window[o] = void 0;
          }
        }, 5e3);
      } catch (u) {
        r(!0);
      }
    };
    var E = function (e) {
      try {
        if ('is_IPV6_Message' === t) return;
        if (d) return;
        var i = new Date().getTime();
        T(e, function (t) {
          try {
            if (!t) return;
            y('https://' + n + '/', function (t, n) {
              try {
                if (1 === t) return;
                if (d) return;
                d = !0;
                R(e, t + ',' + n);
              } catch (r) {
                L(i, r);
              }
            });
          } catch (r) {
            L(i, r);
          }
        });
      } catch (r) {
        L(new Date().getTime(), r);
      }
    };
    var L = function (e, t) {
      try {
        var i = new Date().getTime() - e;
        var n = t ? ('' + (t.message || t)).slice(0, 100) : '';
        g(
          'https://dl.reg.163.com/UA1435545636633/__utm.gif?log=probeerr&cost=' +
            i +
            '&e=' +
            encodeURIComponent(n),
        );
      } catch (r) {}
    };
    var O = 'https://mail.163.com/favicon.ico';
    var x = [
      { key: 'passport', url: 'https://passport-sym3.netease.com/' },
      { key: 'dl', url: 'https://dl.reg.163.com/favicon.ico' },
    ];
    var B = function (e, t) {
      var i = !1;
      var n = function (t, n) {
        if (!i) {
          i = !0;
          try {
            if ('function' == typeof e) e(t, n);
          } catch (r) {}
        }
      };
      try {
        var r = 'string' == typeof t && t ? t : O;
        var o = [{ key: 'mail', url: r }].concat(x);
        var a = {},
          s = 0,
          c = o.length;
        var l = function (e, t, i) {
          a[e] = { status: t, cost: i };
          s++;
          if (!(s < c)) {
            var r = a.mail && 1 === a.mail.status;
            var o = a.passport && 1 === a.passport.status;
            var l = a.dl && 1 === a.dl.status;
            var f = !!r && !o && !l;
            n(f, { mail: a.mail, passport: a.passport, dl: a.dl, blocked: f });
          }
        };
        for (var f = 0; f < o.length; f++)
          !(function (e) {
            y(e.url, function (t, i) {
              l(e.key, t, i);
            });
          })(o[f]);
      } catch (u) {
        n(!1, { blocked: !1 });
      }
    };
    return { start: E, checkEntryBlocked: B };
  })();
  var v = function (e) {
    var t = e.time || 0;
    if (u) y.call(this, 'renderOk', t);
  };
  var w = [1e3, 1200, 3e3, 5e3, 1e4, 15e3, 2e4, 25e3, 3e4];
  var b = function (e) {
    var t = new Date().getTime();
    if (e) t = parseInt(e, 10);
    var i = t - this.webzjStartTime || 0;
    var n = 1;
    for (var r = w.length - 1; r >= 0; r--)
      if (i > w[r]) {
        n = r + 2;
        break;
      }
    return n;
  };
  var y = function (e, i) {
    if ('is_IPV6_Message' !== t)
      try {
        var n = b.call(this, i);
        var r = this._url_cache.split('//')[1].split('/')[0];
        var o =
          'https://pr.nss.netease.com/sentry/passive?clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&pd=' +
          this._urs_options.product +
          '&pkid=' +
          this._urs_options.promark +
          '&uapi=' +
          e +
          '&dataTime=' +
          new Date().getTime() +
          '&domain=' +
          r;
        for (var a = 1; a <= 10; a++)
          if (n === a) o = o + '&step' + a + '=1';
          else o = o + '&step' + a + '=0';
        g(o);
      } catch (s) {}
  };
  var _ = function (e) {
    return e.replace(/\/\/([^\/]+:?)\//, function (e, t) {
      var i = t;
      i = i.replace(/([^\.]+:?)\./, function (e, t) {
        return t + '-v6.';
      });
      return '//' + i + '/';
    });
  };
  var S = function (e) {
    e = parseInt(e, 10);
    return e >= 3;
  };
  var I = function () {
    var e = navigator.userAgent.toLowerCase();
    var t = /msie/.test(e) && !/opera/.test(e);
    var i = (e.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1];
    var n = { 6: '2.0', 7: '3.0', 8: '4.0', 9: '5.0', 10: '6.0', 11: '7.0' };
    var r = n[document.documentMode] || n[parseInt(i)];
    if (t && parseInt(r, 10) < 4 && !window.postMessage) return 1;
    else return 0;
  };
  var C = function (e, t, i) {
    if (window.addEventListener) e.addEventListener(t, i, !1);
    else e.attachEvent('on' + t, i);
  };
  var k = function (e, t, i) {
    if (window.removeEventListener) e.removeEventListener(t, i);
    else e.detachEvent('on' + t, i);
  };
  var M = function (e) {
    e = e || '';
    if (
      (e.indexOf('passport.') >= 0 ||
        e.indexOf('dl.reg.163.com') >= 0 ||
        e.indexOf('reg.icourse163.org') >= 0) &&
      e.indexOf('/webzj') >= 0
    )
      e = e.replace(/\:\/\/[^\/]+\/webzj\//, function (e) {
        return e + 'b/';
      });
    else
      e = e.replace(/\:\/\/([^\/]+)/, function (e) {
        return e + '/b';
      });
    return e;
  };
  var U = [];
  var D = function (e) {
    var t = '';
    var i = a[e];
    if (i.__coverBackground && j('animation'))
      t = i.__coverBackground.indexOf('background:') != -1 ? i.__coverBackground : '';
    return (
      'position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:rgb(0,0,0); filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);-moz-opacity:0.6;-khtml-opacity:0.6;opacity:0.6;z-index:1000;' +
      t
    );
  };
  var R = function (e, t) {
    return (
      'position:fixed;_position:absolute;z-index:10000;left:50%;top:50%;width:' +
      e +
      'px;margin-left:-' +
      e / 2 +
      'px;height:' +
      t +
      'px;margin-top:-' +
      t / 2 +
      'px;'
    );
  };
  var T = function (e) {
    var t = a[e];
    var i = null;
    if (t.__iframeShowAnimation)
      i =
        '-webkit-animation:' +
        t.__iframeShowAnimation +
        ';-moz-animation:' +
        t.__iframeShowAnimation +
        ';-ms-animation:' +
        t.__iframeShowAnimation +
        ';-o-animation:' +
        t.__iframeShowAnimation +
        ';animation:' +
        t.__iframeShowAnimation +
        ';';
    return 'width:100%;height:100%;border:none;background:none;' + (i ? i : '');
  };
  var E = function () {
    var e = setInterval(function () {
      for (var t = 0; t < c.length; t++)
        if (c[t].readyDone) {
          e = clearInterval(e);
          c.shift();
          L(1);
          break;
        }
    }, 200);
  };
  var L = function (e) {
    if (e || !l) {
      l = 1;
      var t = setInterval(function () {
        for (var e = 0; e < c.length; e++)
          if (!c[e].readyDone) {
            t = clearInterval(t);
            P.call(c[e]);
            E();
            break;
          }
      }, 200);
    }
  };
  var O = function (e, t, i) {
    var n = i.id;
    var r = 'x-URS-iframe' + n;
    var o = a[n];
    var s = document.getElementById(r),
      l = o._name || '';
    if (!s) {
      try {
        s = document.createElement('<iframe  name="' + l + '" allowTransparency=true ></iframe>');
      } catch (f) {
        s = document.createElement('iframe');
        s.allowTransparency = !0;
        s.name = l;
      }
      s.frameBorder = 0;
      s.id = r;
      s.scrolling = 'no';
      s.style.cssText = T(n);
    }
    if (t) e.appendChild(s);
    else {
      var u = 420,
        d = 408;
      if (o.frameSize) {
        u = o.frameSize.width;
        d = o.frameSize.height;
      }
      var h = document.getElementById('x-discover' + n);
      if (!h) {
        h = document.createElement('div');
        h.id = 'x-discover' + n;
        h.style.cssText = D(n);
      }
      var p = document.getElementById('x-panel' + n);
      if (!p) {
        p = document.createElement('div');
        p.id = 'x-panel' + n;
        o._panel = p;
        p.style.cssText = R(u, d);
      }
      p.appendChild(s);
      e.appendChild(h);
      e.appendChild(p);
      e.style.display = 'none';
    }
    if (!window.postMessage) {
      c.push(this);
      L(0);
    }
  };
  var x = function () {
    var e = window.URSOPENBGP,
      t = this._url_cache.split('//')[1].split('/')[0],
      i = !1;
    if (e instanceof Array && e.length > 0) {
      for (var n = 0; n < e.length; n++) if (t === e[n]) i = !0;
    } else i = !0;
    return i;
  };
  var B = function (e) {
    var i = window.URSCFG[this.MGID];
    this._url_cache = this._url_cache.replace('webzj.reg.163.com', 'webzj2.reg.163.com');
    if (i._$passportNeedUrsBgp) {
      if ('force' === e) {
        var n = x.call(this);
        if (!n) return;
      }
      if ('is_IPV6_Message' === t && this._url_cache.indexOf('-v6') !== -1)
        this._url_cache = this._url_cache
          .replace('passport-v6.', 'passport2.')
          .replace('reg-v6.icourse163.org', 'reg2.icourse163.org')
          .replace('dl-v6.reg.163.com', 'dl2.reg.163.com')
          .replace('/v6/', '/v1.0.1/');
      else
        this._url_cache = this._url_cache
          .replace('passport.', 'passport2.')
          .replace('reg.icourse163.org', 'reg2.icourse163.org')
          .replace('dl.reg.163.com', 'dl2.reg.163.com');
    }
    if (this._urs_options.wdaId)
      this._url_cache = this._url_cache.replace(/wdaId=([^&]+)/, 'wdaId=UA1482833332087');
  };
  var G = function (e) {
    var i = 'x-URS-iframe' + this.MGID;
    var n = document.getElementById(i);
    if (this._urs_options && this._urs_options.afterSetIframeSrc)
      this._urs_options.afterSetIframeSrc(n);
    if ('{URSOPENBGPVALUE}' != window.URSOPENBGP) B.call(this, 'force');
    window.setTimeout(
      function () {
        this.__loadTime = new Date().getTime();
        if (n) {
          if ('is_IPV6_Message' === t)
            if (e != -1 && 1 != e && '{URSOPENBGPVALUE}' === window.URSOPENBGP)
              this._url_cache = _(this._url_cache);
          n.src = this._url_cache;
        }
      }.bind(this),
      0,
    );
    if (e !== -1) {
      this.sto = clearTimeout(this.sto);
      var r = window.URSCFG[this.MGID];
      if (r._$needUrsBgp && '{URSOPENBGPVALUE}' === window.URSOPENBGP)
        if (1 != e) {
          this.sto = setTimeout(
            function () {
              this.sto = clearTimeout(this.sto);
              y.call(this, 'bgp');
              this.webzjStartTime = new Date().getTime();
              B.call(this);
              G.call(this, 1);
            }.bind(this),
            this._urs_options.bgpTime,
          );
          return;
        }
      this.sto = setTimeout(
        function () {
          try {
            if (this._urs_options.loadTimeout) this._urs_options.loadTimeout();
            if ('function' == typeof this._urs_options.initError)
              this._urs_options.initError({
                errNo: 20004,
                errMsg: 'load_timeout',
                timestamp: new Date().getTime(),
              });
          } catch (e) {}
          y.call(this, 'help');
          this.sto = clearTimeout(this.sto);
          var t = location.href || '';
          t = t.substring(0, 200);
          var i = new Date().getTime() + Math.random();
          var n;
          try {
            n = this._url_cache.split('//')[1].split('/')[0];
          } catch (e) {}
          var r = F(
            {
              pkid: this._urs_options.promark,
              pd: this._urs_options.product,
              time: i,
              from: t,
              domain: n,
              enlang: this._urs_options.enlang || '',
            },
            '&',
            !0,
          );
          this._url_cache = '//hc.reg.163.com/webcomponent/guide.html?' + r;
          G.call(this, -1);
        }.bind(this),
        2e4,
      );
    }
  };
  var j = function (e) {
    var t = ['webkit', 'Moz', 'ms', 'o'],
      i,
      n = [],
      r = document.documentElement.style,
      o = function (e) {
        return e.replace(/-(\w)/g, function (e, t) {
          return t.toUpperCase();
        });
      };
    for (i in t) n.push(o(t[i] + '-' + e));
    n.push(o(e));
    for (i in n) if (n[i] in r) return !0;
    return !1;
  };
  var N = function (e, i) {
    var n = document.getElementById('x-URS-iframe' + e);
    var r = window.name || '_parent';
    var o = {};
    o.data = i;
    o.data.from = 'URS|';
    o.data.topURL = location.href || '';
    o.origin = '*';
    o.source = r;
    if ('is_IPV6_Message' === t) o.data.mv = 'new_cdn_101_v6';
    else o.data.mv = 'new_cdn_101';
    o.data.loadTime = new Date().getTime() - this.__loadTime;
    if (n) V(n.contentWindow, o);
  };
  var P = function () {
    N.call(this, this.MGID, this._urs_options);
  };
  var A = (function () {
    var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
    return function (t) {
      t = t || '';
      if (e.test(t)) return RegExp.$1;
      else return '*';
    };
  })();
  var z = function (e, t) {
    try {
      t = t.toLowerCase();
      if (null === e) return 'null' == t;
      if (void 0 === e) return 'undefined' == t;
      else return Object.prototype.toString.call(e).toLowerCase() == '[object ' + t + ']';
    } catch (i) {
      return !1;
    }
  };
  var F = function (e, t, i) {
    if (!e) return '';
    var n = [];
    for (var r in e)
      if (e.hasOwnProperty(r)) {
        var o = e[r];
        if (o)
          if (!z(o, 'function')) {
            if (z(o, 'date')) o = o.getTime();
            else if (z(o, 'array')) o = o.join(',');
            else if (z(o, 'object')) o = JSON.stringify(o);
            if (i) o = encodeURIComponent(o);
            n.push(encodeURIComponent(r) + '=' + o);
          } else;
        else;
      } else;
    return n.join(t || ',');
  };
  var V = (function () {
    var e = 'MSG|';
    var t = function (t) {
      var i = {};
      t = t || {};
      i.origin = t.origin || '';
      i.ref = location.href;
      i.self = t.source;
      i.data = JSON.stringify(t.data);
      return e + F(i, '|', !0);
    };
    return function (e, i) {
      if (window.postMessage) {
        i = i || {};
        e.postMessage(JSON.stringify(i.data), A(i.origin));
      } else U.unshift({ w: e, d: escape(t(i)) });
    };
  })();
  var J = function () {
    var e = navigator.appName;
    if ('Netscape' == e) {
      var t = window.open('about:blank', '_self');
      t.opener = null;
      t.close();
    } else if ('Microsoft Internet Explorer' == e) {
      window.opener = null;
      window.open('', '_self');
      window.close();
    }
  };
  var $ = function () {
    var e = document.createElement('div');
    e.id = 'x-URS' + this.MGID;
    document.body.appendChild(e);
    this.box = e;
  };
  var W = function (e, i) {
    var n;
    var r = 0 != e.isHttps ? 'https://' : 'http://';
    if (e.cssDomain && e.cssFiles) if (e.cssDomain.indexOf('http://') != -1) r = 'http://';
    if (S(e.version)) {
      n = 'index2.html';
      if (e.single) {
        n = 'index_dl2.html';
        if ('register' == e.page) n = 'index_reg2.html';
      }
    } else {
      n = 'index.html';
      if (e.single) {
        n = 'index_dl.html';
        if ('register' == e.page) n = 'index_reg.html';
      }
    }
    if ('1' == e.newCDN) n = n.replace('.html', '_new.html');
    var o;
    if ('is_IPV6_Message' === t) o = e.crossDomainUrl || 'webzj.reg.163.com/v6/pub/';
    else o = e.crossDomainUrl || 'webzj.reg.163.com/v1.0.1/pub/';
    this._url_cache = r + o + n;
    if (e.isDevDemo) this._url_cache = r + 'dl.reg.163.com/webapp/html/' + n;
    var a = parseInt(1e3 * Math.random());
    e.pathB = 0;
    var s = window.URSCFG[e.promark];
    if (s) if (a <= s) e.pathB = 1;
    if (e.pathB) this._url_cache = M(this._url_cache);
    if (i.__cssStr)
      this._url_cache += '?' + i.__cssStr + '&MGID=' + this.MGID + '&wdaId=' + (e.wdaId || '');
    else this._url_cache += '?MGID=' + this.MGID + '&wdaId=' + (e.wdaId || '');
    this._urs_options = e || {};
    if (f) this._urs_options.ursDeviceId = f;
    this._urs_options.bgpTime = e.bgpTime || 1e4;
    this._url_cache +=
      '&pkid=' +
      (this._urs_options.promark || '') +
      '&product=' +
      (this._urs_options.product || '');
    if (e.cdnhostname) this._url_cache += '&cdnhostname=' + e.cdnhostname;
    if ('1' == this._urs_options.needfmp) this._url_cache += '&needfmp=1';
    return this._url_cache;
  };
  window.URS = (function () {
    var e = function () {
      var t = new Date().getTime() + Math.random();
      if (!s[t]) {
        s[t] = t;
        return t;
      } else return e();
    };
    var n = function (e) {
      var i = e.cookieDomain || '';
      var n = e.regCookieDomain || '';
      var r = e.cookieDomainPrefix || '';
      var o = e.crossDomainUrl || '';
      var a, s;
      if (!o) {
        if (i) {
          e.regCookieDomain = i;
          a = i;
        } else if (n) {
          e.cookieDomain = n;
          a = n;
        }
        if ('is_IPV6_Message' === t) s = 'v6';
        else s = 'v1.0.1';
        if (a && '163.com' !== a)
          if (a.indexOf('icourse163.org') > -1)
            e.crossDomainUrl = 'reg.' + a + '/webzj/' + s + '/pub/';
          else e.crossDomainUrl = r + 'passport.' + a + '/webzj/' + s + '/pub/';
        else e.crossDomainUrl = 'dl.reg.163.com/webzj/' + s + '/pub/';
      }
      return e;
    };
    var c = function (r) {
      this.MGID = e();
      window.URSCFG[this.MGID] = {};
      var o = window.URSCFG[this.MGID];
      r.from3Cdn = 1;
      r.needSendLog = u;
      r.needSendLogDt = d;
      if ('IS_NEW_MSG' === i) {
        r.newCDN = 1;
        if (!r.cdnhostname)
          r.cdnhostname =
            'is_IPV6_Message' === t ? 'webzj-v6.netstatic.net' : 'webzj.netstatic.net';
      }
      if (r.from3Cdn && S(r.version)) r = n.call(this, r);
      if (I()) r.needUrsBgp = 0;
      if ('0' == r.needUrsBgp) {
        r.passportNeedUrsBgp = 0;
        o._$needUrsBgp = 0;
        o._$passportNeedUrsBgp = 0;
      } else {
        if (r.crossDomainUrl || r.cookieDomain) {
          o._$passportNeedUrsBgp = 1;
          r.passportNeedUrsBgp = 1;
        }
        o._$needUrsBgp = 1;
        r.needUrsBgp = 1;
      }
      a[this.MGID] = {};
      this._$COM_NUM = 1 == this._$COM_NUM ? 1 : 2;
      var s = a[this.MGID];
      s.promark = r.promark;
      s.frameSize = r.frameSize;
      s.__coverBackground = r.coverBackground;
      s.__iframeShowAnimation = r.iframeShowAnimation;
      if (r.cssDomain && r.cssFiles)
        s.__cssStr =
          'cd=' + encodeURIComponent(r.cssDomain) + '&cf=' + encodeURIComponent(r.cssFiles);
      this.isInclude = 0;
      if (r.includeBox)
        if ('string' == typeof r.includeBox)
          this.isInclude = document.getElementById(r.includeBox) || 0;
        else this.isInclude = r.includeBox;
      s.needPrepare = r.needPrepare || 0;
      if ('string' == typeof r.eventType) this._type = r.eventType;
      if ('string' == typeof r.bid) this._btn = document.getElementById(r.bid);
      else this._btn = r.bid;
      if (r.chromeCookieError) this.chromeCookieError = r.chromeCookieError;
      if (r.doPwdFocus) this.doPwdFocus = r.doPwdFocus;
      if (r.doPwdHide) this.doPwdHide = r.doPwdHide;
      if (r.logincb) this.logincb = r.logincb;
      if (r.mailLoginErrorCb) this.mailLoginErrorCb = r.mailLoginErrorCb;
      if (r.uniteLogin && r.uniteLogin.loginBtnClkCb)
        this.uniteLoginBtnClkCb = r.uniteLogin.loginBtnClkCb;
      if (r.uniteLogin && r.uniteLogin.smsBtnClkCb)
        this.uniteLoginSmsClkCb = r.uniteLogin.smsBtnClkCb;
      if (r.uniteLogin && r.uniteLogin.mobIptCb) this.uniteLoginMobIptCb = r.uniteLogin.mobIptCb;
      if (r.uniteLogin && r.uniteLogin.countrySelCb)
        this.uniteLoginCtryCb = r.uniteLogin.countrySelCb;
      if (r.closecb) this.closecb = r.closecb;
      if (r.regcb) this.regcb = r.regcb;
      if (r.loginCheckLock) this.loginCheckLock = r.loginCheckLock;
      if (r.regCheckLock) this.regCheckLock = r.regCheckLock;
      if (r.initReady) this.initReady = r.initReady;
      if (r.initError) this.initError = r.initError;
      if (r.statecb) this.statecb = r.statecb;
      if (r.resize) this.resize = r.resize;
      if (r.changepage) this.changepage = r.changepage;
      if (r.moduleResize) this.moduleResize = r.moduleResize;
      if (r.loginstate) this.loginstate = r.loginstate;
      if (r.otherRegSuccess) this.otherRegSuccess = r.otherRegSuccess;
      if (r.lockMbLoginState) this.lockMbLoginState = r.lockMbLoginState;
      if (r.lockMbRegState) this.lockMbRegState = r.lockMbRegState;
      if (r.mbInitSuccess) this.mbInitSuccess = r.mbInitSuccess;
      if (r.mbChangeModule) this.mbChangeModule = r.mbChangeModule;
      if (r.loginInitSuccess) this.loginInitSuccess = r.loginInitSuccess;
      if (r.regInitSuccess) this.regInitSuccess = r.regInitSuccess;
      if (r.renderOk) this.renderOk = r.renderOk;
      if (r.webInitOk) this.webInitOk = r.webInitOk;
      if (r.WeiXinInputBlur) this.WeiXinInputBlur = r.WeiXinInputBlur;
      if (r.loginEmailValue) this.loginEmailValue = r.loginEmailValue;
      if (r.loginMbValue) this.loginMbValue = r.loginMbValue;
      if (r.InputBlur) this.InputBlur = r.InputBlur;
      if (r.sendSmsOk) this.sendSmsOk = r.sendSmsOk;
      if (r.onEventTrackChange) this.onEventTrackChange = r.onEventTrackChange;
      if (!this.isInclude) $.call(this);
      this._url_cache = W.call(this, r, s);
      try {
        JSON.stringify(this._urs_options);
      } catch (c) {
        return null;
      }
      if (!this.isInclude) {
        if (this._btn && this._type) C(this._btn, this._type, this.showIframe.bind(this));
      } else this.includeBox = this.isInclude;
    };
    var l = function (e) {
      if (e) e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
    };
    var f = function (e) {
      l(e);
      var t = e.data || '{}';
      if ('string' == typeof t)
        try {
          t = JSON.parse(t);
        } catch (i) {
          t = {};
        }
      if (r[t.MGID])
        try {
          r[t.MGID]({ data: t, origin: A(e.origin) });
        } catch (i) {
          p(i);
        }
    };
    var h = function (e) {
      var t = e.data,
        i,
        n,
        r;
      if (t) {
        if ('string' == typeof t)
          try {
            t = JSON.parse(t);
          } catch (s) {
            t = {};
          }
        if (t.MGID) {
          i = o[t.MGID];
          n = a[t.MGID];
          if (i.isInclude) r = i.includeBox;
          else r = n._panel;
          if (t['URS-READY-DONE']) {
            i.readyDone = 1;
            i.sto = clearTimeout(i.sto);
            if (i.initReady) i.initReady();
          }
          if (t['URS-READY']) {
            i.sto = clearTimeout(i.sto);
            i.ursReady = 1;
          }
          if (!window.postMessage || !t['URS-READY'] || (!i.isInclude && n.needPrepare)) {
            if (t['URS-READY'] && !n._initReady) n._initReady = !0;
            if (!t['URS-CM-STATE'])
              if (!t || !t.fromOutLogin || t.toOpener) {
                if ('initError' != t.type) {
                  if ('onEventTrackChange' != t.type) {
                    if ('chromeCookieError' == t.type) {
                      if (i.chromeCookieError) i.chromeCookieError(t);
                    } else if ('webInitOk' == t.type) {
                      if (i.webInitOk) i.webInitOk(t);
                    } else if ('sendSmsOk' === t.type) {
                      if (i.sendSmsOk) i.sendSmsOk(t);
                    } else if ('InputBlur' === t.type) {
                      if (i.InputBlur) i.InputBlur();
                    } else if ('loginEmailValue' === t.type) {
                      if (i.loginEmailValue) i.loginEmailValue(t);
                    } else if ('loginMbValue' === t.type) {
                      if (i.loginMbValue) i.loginMbValue(t);
                    } else if ('WeiXinInputBlur' === t.type) {
                      if (i.WeiXinInputBlur) i.WeiXinInputBlur();
                    } else if ('renderOk' == t.type) {
                      if (i.renderOk) i.renderOk(t);
                      v.call(this, t);
                    } else if ('moduleResize' == t.type) {
                      if (i.moduleResize) i.moduleResize(t);
                    } else if ('regInitSuccess' == t.type) {
                      if (i.regInitSuccess) i.regInitSuccess();
                    } else if ('loginInitSuccess' == t.type) {
                      if (i.loginInitSuccess) i.loginInitSuccess();
                    } else if ('mbChangeModule' == t.type) {
                      if (i.mbChangeModule) i.mbChangeModule();
                    } else if ('mbInitSuccess' == t.type) {
                      if (i.mbInitSuccess) i.mbInitSuccess();
                    } else if ('lockMbLoginState' == t.type) {
                      if (i.lockMbLoginState) i.lockMbLoginState(t);
                    } else if ('lockMbRegState' == t.type) {
                      if (i.lockMbRegState) i.lockMbRegState(t);
                    } else if ('otherRegSuccess' == t.type) {
                      if (i.otherRegSuccess) i.otherRegSuccess(t);
                    } else if ('success' == t.type) {
                      if (i.logincb) i.logincb(t['username'], t['isOther'], t);
                      if (!this.isInclude) {
                        if (i._btn && i._type) k(i._btn, i._type, i.showIframe.bind(i));
                        i.closeIframe();
                      }
                    } else if ('mailLoginError' == t.type) {
                      if (i.mailLoginErrorCb) i.mailLoginErrorCb(t);
                    } else if ('uniteLoginBtnClkCb' == t.type) {
                      if (i.uniteLoginBtnClkCb) i.uniteLoginBtnClkCb(t);
                    } else if ('uniteLoginSmsClkCb' == t.type) {
                      if (i.uniteLoginSmsClkCb) i.uniteLoginSmsClkCb(t);
                    } else if ('uniteLoginMobIptCb' == t.type) {
                      if (i.uniteLoginMobIptCb) i.uniteLoginMobIptCb(t);
                    } else if ('uniteLoginCtryCb' == t.type) {
                      if (i.uniteLoginCtryCb) i.uniteLoginCtryCb(t);
                    } else if ('close' == t.type) {
                      if (i.closecb) i.closecb();
                      i.closeIframe();
                    } else if ('resize' == t.type || 'init' == t.type) {
                      r.style.width = t.width + 'px';
                      r.style.height = t.height + 'px';
                      if (!i.isInclude) r.style.marginLeft = (-1 * t.width) / 2 + 'px';
                      if (i.resize) i.resize(t);
                    } else if ('register-success' == t.type) {
                      if (i.regcb) i.regcb(t['username'], t['url'], t);
                    } else if ('lockLoginState' == t.type) {
                      if (i.loginCheckLock) i.loginCheckLock(t.value);
                    } else if ('lockRegState' == t.type) {
                      if (i.regCheckLock) i.regCheckLock(t.value);
                    } else if ('changepage' == t.type) {
                      if (i.changepage) i.changepage(t.page);
                    } else if ('loginstate' == t.type) {
                      if (i.loginstate) i.loginstate(t);
                    } else if ('doPwdFocus' == t.type) {
                      try {
                        setTimeout(function () {
                          var e = document.getElementById('x-URS-iframe' + i.MGID);
                          if (e) {
                            var n = e.offsetTop;
                            var r = e.offsetLeft;
                          }
                          window.scrollTo(t.offset.x + r, t.offset.y + n);
                        }, 200);
                      } catch (s) {}
                      if (i.doPwdFocus) i.doPwdFocus(t);
                    } else if ('doPwdHide' == t.type) if (i.doPwdHide) i.doPwdHide(t);
                  } else if (i.onEventTrackChange) i.onEventTrackChange(t);
                } else if (i.initError) i.initError(t);
              } else {
                try {
                  window.opener.$outLogin(t);
                } catch (s) {}
                setTimeout(function () {
                  J();
                }, 200);
              }
            else if (i.statecb) i.statecb(t['URS-CM-STATENAME'], t['URS-CM-STATE']);
          } else P.call(i);
        }
      }
    };
    var g = (function () {
      var e = 'MSG|';
      var t = function (e, t) {
        var i = z(t, 'function')
            ? t
            : function (e) {
                return e === t;
              },
          n = null;
        for (var r = 0, o = e.length - 1, a; r < o; r++) {
          a = e[r];
          if (i(a)) n = r;
        }
        return null != n ? n : -1;
      };
      var i = (function () {
        var e;
        var i = function (i, n, r) {
          if (t(e, i.w) < 0) {
            e.push(i.w);
            r.splice(n, 1);
            i.w.name = i.d;
          }
        };
        return function () {
          e = [];
          if (U && U.length)
            for (var t = U.length, n; t--; t >= 0) {
              n = U[t];
              i(n, t, U);
            }
          e = null;
        };
      })();
      var n = function () {
        var t = unescape(window.name || '');
        if (t && 0 == t.indexOf(e)) {
          window.name = '';
          var i = t.replace(e, ''),
            n = i.split('|'),
            r = n.length,
            o = {};
          for (var a = 0; a < r; a++) {
            var s = n[a].split('=');
            if (!s || !s.length) return;
            var c = s.shift();
            if (!c) return;
            o[decodeURIComponent(c)] = decodeURIComponent(s.join('='));
          }
          i = o;
          var l = (i.origin || '').toLowerCase();
          if (!l || '*' == l || 0 == location.href.toLowerCase().indexOf(l))
            try {
              h({ data: i.data || 'null', origin: A(i.ref || document.referrer) });
            } catch (f) {
              p(f);
            }
        }
      };
      return function () {
        setInterval(i, 100);
        setInterval(n, 20);
      };
    })();
    var w = function () {
      if (!window.__hasRun) {
        if (window.postMessage) C(window, 'message', f);
        else g();
        window.__hasRun = 1;
      }
    };
    return function (e) {
      this.webzjStartTime = new Date().getTime();
      c.call(this, e);
      var t = a[this.MGID];
      if (t.needPrepare || this.isInclude) this.prepareIframe();
      r[this.MGID] = h.bind(this);
      o[this.MGID] = this;
      var i = w();
      try {
        var n = this._urs_options || e;
        setTimeout(function () {
          m.start(n);
        }, 0);
      } catch (s) {}
      return i;
    };
  })();
  window.URS.prototype.safekeyboardMsg = function (e) {
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.prepareIframe = function () {
    if (this.isInclude) {
      O.call(this, this.includeBox, 1, { id: this.MGID });
      G.call(this);
      this.showIframe();
    } else {
      O.call(this, this.box, 0, { id: this.MGID });
      G.call(this);
    }
  };
  window.URS.prototype.showIframe = function (e) {
    var t = a[this.MGID];
    if (!this.isInclude)
      if (!t.needPrepare) {
        O.call(this, this.box, 0, { id: this.MGID });
        G.call(this);
      } else if (!t._initReady) return;
    e = e || {};
    if (e.page) {
      if (100 * Math.random() <= 1)
        try {
          var i =
            '//dl.reg.163.com/UA1435545636633/__utm.gif?log=usepage&pd=' +
              this._urs_options.product || '';
          var n = document.createElement('img');
          n.style.position = 'absolute';
          n.style.width = '0px';
          n.style.height = '0px';
          document.body.appendChild(n);
          n.src = i;
          setTimeout(function () {
            document.body.appendChild(n);
          }, 1e4);
        } catch (r) {}
      if (e.page != this._urs_options.page && this._urs_options.single) {
        this._urs_options.page = e.page;
        this._url_cache = W.call(this, this._urs_options, t);
      }
      G.call(this);
    }
    if (t.needPrepare && !this.isInclude) P.call(this);
    if (this.box) this.box.style.display = 'block';
    if (this._urs_options.afterShow) this._urs_options.afterShow.call(this);
  };
  window.URS.prototype.closeIframe = function () {
    var e = a[this.MGID];
    if (!this.isInclude) {
      this.box.style.display = 'none';
      if (this.sto) this.sto = clearTimeout(this.sto);
      if (!e.needPrepare) {
        if (navigator.userAgent.indexOf('MSIE') > 0) {
          var t = document.getElementById('x-URS-iframe' + this.MGID),
            i = t.contentWindow;
          if (t) {
            t.src = 'about:blank';
            try {
              i.document.write('');
              i.document.clear();
            } catch (n) {}
          }
          var r = document.getElementById('x-panel' + this.MGID);
          r.removeChild(t);
          window.CollectGarbage();
        }
        this.box.innerHTML = '';
      }
    } else;
  };
  window.URS.prototype.doMbUnLoginProxy = function () {
    var e = { proxyModule: 'mbunlogin', doLoginProxy: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.loginUnlock = function () {
    var e = { fromLoginLock: 1, lock: 0 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.loginDolock = function () {
    var e = { fromLoginLock: 1, lock: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.regUnlock = function () {
    var e = { fromRegLock: 1, lock: 0 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.regDolock = function () {
    var e = { fromRegLock: 1, lock: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.doLoginProxy = function (e) {
    var t = { username: e.username, pwd: e.pwd, defaultUnLogin: e.defaultUnLogin, doLoginProxy: 1 };
    N.call(this, this.MGID, t);
  };
  window.URS.prototype.loginUnlockMb = function () {
    var e = { fromLoginLockMb: 1, lock: 0 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.loginDolockMb = function () {
    var e = { fromLoginLockMb: 1, lock: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.regUnlockMb = function () {
    var e = { fromRegLockMb: 1, lock: 0 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.regDolockMb = function () {
    var e = { fromRegLockMb: 1, lock: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.getIframeSize = function () {
    var e = { getIframeSize: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.setMbloginClause = function (e) {
    var t = { fromMbSetClause: 1, mbloginClause: e };
    N.call(this, this.MGID, t);
  };
  window.URS.prototype.setMailloginClause = function (e) {
    var t = { fromMailSetClause: 1, mailloginClause: e };
    N.call(this, this.MGID, t);
  };
  window.URS.prototype.setUniteMbAndSendSms = function (e, t) {
    var i = { fromUniteMbAndSendSms: 1, mobile: e, auto: t };
    N.call(this, this.MGID, i);
  };
  window.URS.prototype.switchModuleType = function (e) {
    var t = { fromSwitchModuleType: 1, type: e };
    N.call(this, this.MGID, t);
  };
  window.URS.prototype.doAutoLogin = function () {
    var e = { fromDoAutoLogin: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.prototype.sendSmsCode = function () {
    var e = { fromSendSmsCode: 1 };
    N.call(this, this.MGID, e);
  };
  window.URS.setPkidAndPd = (function () {
    var e = {};
    var i = function (t) {
      var i, n;
      if (t && t.lgs) {
        i = t.lgs;
        n = t.pkid;
        window.URSCFG[n] = parseInt(i);
        e[n] && e[n](n);
      }
    };
    var n = function (e) {
      var n = e.pkid || '';
      var r = e.pd || '';
      var o;
      if (void 0 === e.mode) o = '3';
      else o = e.mode;
      if ('3' != o && '0' != o) {
        var a = 'URSJSONP' + new Date().getTime();
        window[a] = i;
        var s =
          '//dl.reg.163.com/dl/getConf?callback=' + a + '&pkid=' + n + '&pd=' + r + '&mode=' + o;
        var c = document.createElement('script');
        c.type = 'text/javascript';
        c.id = 'urs-script-' + a;
        if ('is_IPV6_Message' === t) s = _(s);
        c.src = s;
        document.getElementsByTagName('head')[0].appendChild(c);
        setTimeout(function () {
          document.getElementsByTagName('head')[0].removeChild(c);
        }, 5e3);
      }
    };
    return function (t) {
      t = t || {};
      var i = t.pkid || '';
      if ('function' == typeof t.pathbCallback) e[i] = t.pathbCallback;
      n(t);
    };
  })();
  window.URS.checkEntryBlocked = m.checkEntryBlocked;
  return window.URS;
});
(function () {
  function e(t, n) {
    function o(e) {
      if (o[e] !== v) return o[e];
      var t;
      if ('bug-string-char-index' == e) t = 'a' != 'a'[0];
      else if ('json' == e) t = o('json-stringify') && o('json-parse');
      else {
        var i;
        if ('json-stringify' == e) {
          t = n.stringify;
          var r = 'function' == typeof t && w;
          if (r) {
            (i = function () {
              return 1;
            }).toJSON = i;
            try {
              r =
                '0' === t(0) &&
                '0' === t(new a()) &&
                '""' == t(new s()) &&
                t(p) === v &&
                t(v) === v &&
                t() === v &&
                '1' === t(i) &&
                '[1]' == t([i]) &&
                '[null]' == t([v]) &&
                'null' == t(null) &&
                '[null,null,null]' == t([v, p, null]) &&
                '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' ==
                  t({ a: [i, !0, !1, null, '\0\b\n\f\r\t'] }) &&
                '1' === t(null, i) &&
                '[\n 1,\n 2\n]' == t([1, 2], null, 1) &&
                '"-271821-04-20T00:00:00.000Z"' == t(new l(-864e13)) &&
                '"+275760-09-13T00:00:00.000Z"' == t(new l(864e13)) &&
                '"-000001-01-01T00:00:00.000Z"' == t(new l(-621987552e5)) &&
                '"1969-12-31T23:59:59.999Z"' == t(new l(-1));
            } catch (c) {
              r = !1;
            }
          }
          t = r;
        }
        if ('json-parse' == e) {
          t = n.parse;
          if ('function' == typeof t)
            try {
              if (0 === t('0') && !t(!1)) {
                i = t('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');
                var f = 5 == i.a.length && 1 === i.a[0];
                if (f) {
                  try {
                    f = !t('"\t"');
                  } catch (u) {}
                  if (f)
                    try {
                      f = 1 !== t('01');
                    } catch (d) {}
                  if (f)
                    try {
                      f = 1 !== t('1.');
                    } catch (h) {}
                }
              }
            } catch (g) {
              f = !1;
            }
          t = f;
        }
      }
      return (o[e] = !!t);
    }
    t || (t = r.Object());
    n || (n = r.Object());
    var a = t.Number || r.Number,
      s = t.String || r.String,
      c = t.Object || r.Object,
      l = t.Date || r.Date,
      f = t.SyntaxError || r.SyntaxError,
      u = t.TypeError || r.TypeError,
      d = t.Math || r.Math,
      h = t.JSON || r.JSON;
    'object' == typeof h && h && ((n.stringify = h.stringify), (n.parse = h.parse));
    var c = c.prototype,
      p = c.toString,
      g,
      m,
      v,
      w = new l(-0xc782b5b800cec);
    try {
      w =
        -109252 == w.getUTCFullYear() &&
        0 === w.getUTCMonth() &&
        1 === w.getUTCDate() &&
        10 == w.getUTCHours() &&
        37 == w.getUTCMinutes() &&
        6 == w.getUTCSeconds() &&
        708 == w.getUTCMilliseconds();
    } catch (b) {}
    if (!o('json')) {
      var y = o('bug-string-char-index');
      if (!w)
        var _ = d.floor,
          S = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
          I = function (e, t) {
            return (
              S[t] +
              365 * (e - 1970) +
              _((e - 1969 + (t = +(1 < t))) / 4) -
              _((e - 1901 + t) / 100) +
              _((e - 1601 + t) / 400)
            );
          };
      (g = c.hasOwnProperty) ||
        (g = function (e) {
          var t = {},
            i;
          ((t.__proto__ = null), (t.__proto__ = { toString: 1 }), t).toString != p
            ? (g = function (e) {
                var t = this.__proto__;
                e = e in ((this.__proto__ = null), this);
                this.__proto__ = t;
                return e;
              })
            : ((i = t.constructor),
              (g = function (e) {
                var t = (this.constructor || i).prototype;
                return e in this && !(e in t && this[e] === t[e]);
              }));
          t = null;
          return g.call(this, e);
        });
      m = function (e, t) {
        var n = 0,
          r,
          o,
          a;
        (r = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;
        o = new r();
        for (a in o) g.call(o, a) && n++;
        r = o = null;
        n
          ? (m =
              2 == n
                ? function (e, t) {
                    var i = {},
                      n = '[object Function]' == p.call(e),
                      r;
                    for (r in e)
                      (n && 'prototype' == r) ||
                        g.call(i, r) ||
                        !(i[r] = 1) ||
                        !g.call(e, r) ||
                        t(r);
                  }
                : function (e, t) {
                    var i = '[object Function]' == p.call(e),
                      n,
                      r;
                    for (n in e)
                      (i && 'prototype' == n) || !g.call(e, n) || (r = 'constructor' === n) || t(n);
                    (r || g.call(e, (n = 'constructor'))) && t(n);
                  })
          : ((o =
              'valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor'.split(
                ' ',
              )),
            (m = function (e, t) {
              var n = '[object Function]' == p.call(e),
                r,
                a =
                  (!n &&
                    'function' != typeof e.constructor &&
                    i[typeof e.hasOwnProperty] &&
                    e.hasOwnProperty) ||
                  g;
              for (r in e) (n && 'prototype' == r) || !a.call(e, r) || t(r);
              for (n = o.length; (r = o[--n]); a.call(e, r) && t(r));
            }));
        return m(e, t);
      };
      if (!o('json-stringify')) {
        var C = { 92: '\\\\', 34: '\\"', 8: '\\b', 12: '\\f', 10: '\\n', 13: '\\r', 9: '\\t' },
          k = function (e, t) {
            return ('000000' + (t || 0)).slice(-e);
          },
          M = function (e) {
            for (
              var t = '"', i = 0, n = e.length, r = !y || 10 < n, o = r && (y ? e.split('') : e);
              i < n;
              i++
            ) {
              var a = e.charCodeAt(i);
              switch (a) {
                case 8:
                case 9:
                case 10:
                case 12:
                case 13:
                case 34:
                case 92:
                  t += C[a];
                  break;
                default:
                  if (32 > a) {
                    t += '\\u00' + k(2, a.toString(16));
                    break;
                  }
                  t += r ? o[i] : e.charAt(i);
              }
            }
            return t + '"';
          },
          U = function (e, t, i, n, r, o, a) {
            var s, c, l, f, d, h, w, b, y;
            try {
              s = t[e];
            } catch (S) {}
            if ('object' == typeof s && s)
              if (((c = p.call(s)), '[object Date]' != c || g.call(s, 'toJSON')))
                'function' == typeof s.toJSON &&
                  (('[object Number]' != c && '[object String]' != c && '[object Array]' != c) ||
                    g.call(s, 'toJSON')) &&
                  (s = s.toJSON(e));
              else if (s > -1 / 0 && s < 1 / 0) {
                if (I) {
                  f = _(s / 864e5);
                  for (c = _(f / 365.2425) + 1970 - 1; I(c + 1, 0) <= f; c++);
                  for (l = _((f - I(c, 0)) / 30.42); I(c, l + 1) <= f; l++);
                  f = 1 + f - I(c, l);
                  d = ((s % 864e5) + 864e5) % 864e5;
                  h = _(d / 36e5) % 24;
                  w = _(d / 6e4) % 60;
                  b = _(d / 1e3) % 60;
                  d %= 1e3;
                } else
                  ((c = s.getUTCFullYear()),
                    (l = s.getUTCMonth()),
                    (f = s.getUTCDate()),
                    (h = s.getUTCHours()),
                    (w = s.getUTCMinutes()),
                    (b = s.getUTCSeconds()),
                    (d = s.getUTCMilliseconds()));
                s =
                  (0 >= c || 1e4 <= c ? (0 > c ? '-' : '+') + k(6, 0 > c ? -c : c) : k(4, c)) +
                  '-' +
                  k(2, l + 1) +
                  '-' +
                  k(2, f) +
                  'T' +
                  k(2, h) +
                  ':' +
                  k(2, w) +
                  ':' +
                  k(2, b) +
                  '.' +
                  k(3, d) +
                  'Z';
              } else s = null;
            i && (s = i.call(t, e, s));
            if (null === s) return 'null';
            c = p.call(s);
            if ('[object Boolean]' == c) return '' + s;
            if ('[object Number]' == c) return s > -1 / 0 && s < 1 / 0 ? '' + s : 'null';
            if ('[object String]' == c) return M('' + s);
            if ('object' == typeof s) {
              for (e = a.length; e--;) if (a[e] === s) throw u();
              a.push(s);
              y = [];
              t = o;
              o += r;
              if ('[object Array]' == c) {
                l = 0;
                for (e = s.length; l < e; l++)
                  ((c = U(l, s, i, n, r, o, a)), y.push(c === v ? 'null' : c));
                e = y.length
                  ? r
                    ? '[\n' + o + y.join(',\n' + o) + '\n' + t + ']'
                    : '[' + y.join(',') + ']'
                  : '[]';
              } else
                (m(n || s, function (e) {
                  var t = U(e, s, i, n, r, o, a);
                  t !== v && y.push(M(e) + ':' + (r ? ' ' : '') + t);
                }),
                  (e = y.length
                    ? r
                      ? '{\n' + o + y.join(',\n' + o) + '\n' + t + '}'
                      : '{' + y.join(',') + '}'
                    : '{}'));
              a.pop();
              return e;
            }
          };
        n.stringify = function (e, t, n) {
          var r, o, a, s;
          if (i[typeof t] && t)
            if ('[object Function]' == (s = p.call(t))) o = t;
            else if ('[object Array]' == s) {
              a = {};
              for (
                var c = 0, l = t.length, f;
                c < l;
                f = t[c++],
                  ((s = p.call(f)), '[object String]' == s || '[object Number]' == s) && (a[f] = 1)
              );
            }
          if (n)
            if ('[object Number]' == (s = p.call(n))) {
              if (0 < (n -= n % 1)) for (r = '', 10 < n && (n = 10); r.length < n; r += ' ');
            } else '[object String]' == s && (r = 10 >= n.length ? n : n.slice(0, 10));
          return U('', ((f = {}), (f[''] = e), f), o, a, r, '', []);
        };
      }
      if (!o('json-parse')) {
        var D = s.fromCharCode,
          R = { 92: '\\', 34: '"', 47: '/', 98: '\b', 116: '\t', 110: '\n', 102: '\f', 114: '\r' },
          T,
          E,
          L = function () {
            T = E = null;
            throw f();
          },
          O = function () {
            for (var e = E, t = e.length, i, n, r, o, a; T < t;)
              switch (((a = e.charCodeAt(T)), a)) {
                case 9:
                case 10:
                case 13:
                case 32:
                  T++;
                  break;
                case 123:
                case 125:
                case 91:
                case 93:
                case 58:
                case 44:
                  return ((i = y ? e.charAt(T) : e[T]), T++, i);
                case 34:
                  i = '@';
                  for (T++; T < t;)
                    if (((a = e.charCodeAt(T)), 32 > a)) L();
                    else if (92 == a)
                      switch (((a = e.charCodeAt(++T)), a)) {
                        case 92:
                        case 34:
                        case 47:
                        case 98:
                        case 116:
                        case 110:
                        case 102:
                        case 114:
                          i += R[a];
                          T++;
                          break;
                        case 117:
                          n = ++T;
                          for (r = T + 4; T < r; T++)
                            ((a = e.charCodeAt(T)),
                              (48 <= a && 57 >= a) ||
                                (97 <= a && 102 >= a) ||
                                (65 <= a && 70 >= a) ||
                                L());
                          i += D('0x' + e.slice(n, T));
                          break;
                        default:
                          L();
                      }
                    else {
                      if (34 == a) break;
                      a = e.charCodeAt(T);
                      for (n = T; 32 <= a && 92 != a && 34 != a;) a = e.charCodeAt(++T);
                      i += e.slice(n, T);
                    }
                  if (34 == e.charCodeAt(T)) return (T++, i);
                  L();
                default:
                  n = T;
                  45 == a && ((o = !0), (a = e.charCodeAt(++T)));
                  if (48 <= a && 57 >= a) {
                    for (
                      48 == a && ((a = e.charCodeAt(T + 1)), 48 <= a && 57 >= a) && L();
                      T < t && ((a = e.charCodeAt(T)), 48 <= a && 57 >= a);
                      T++
                    );
                    if (46 == e.charCodeAt(T)) {
                      for (r = ++T; r < t && ((a = e.charCodeAt(r)), 48 <= a && 57 >= a); r++);
                      r == T && L();
                      T = r;
                    }
                    a = e.charCodeAt(T);
                    if (101 == a || 69 == a) {
                      a = e.charCodeAt(++T);
                      (43 != a && 45 != a) || T++;
                      for (r = T; r < t && ((a = e.charCodeAt(r)), 48 <= a && 57 >= a); r++);
                      r == T && L();
                      T = r;
                    }
                    return +e.slice(n, T);
                  }
                  o && L();
                  if ('true' == e.slice(T, T + 4)) return ((T += 4), !0);
                  if ('false' == e.slice(T, T + 5)) return ((T += 5), !1);
                  if ('null' == e.slice(T, T + 4)) return ((T += 4), null);
                  L();
              }
            return '$';
          },
          x = function (e) {
            var t, i;
            '$' == e && L();
            if ('string' == typeof e) {
              if ('@' == (y ? e.charAt(0) : e[0])) return e.slice(1);
              if ('[' == e) {
                for (t = []; ; i || (i = !0)) {
                  e = O();
                  if (']' == e) break;
                  i && (',' == e ? ((e = O()), ']' == e && L()) : L());
                  ',' == e && L();
                  t.push(x(e));
                }
                return t;
              }
              if ('{' == e) {
                for (t = {}; ; i || (i = !0)) {
                  e = O();
                  if ('}' == e) break;
                  i && (',' == e ? ((e = O()), '}' == e && L()) : L());
                  (',' != e &&
                    'string' == typeof e &&
                    '@' == (y ? e.charAt(0) : e[0]) &&
                    ':' == O()) ||
                    L();
                  t[e.slice(1)] = x(O());
                }
                return t;
              }
              L();
            }
            return e;
          },
          B = function (e, t, i) {
            i = G(e, t, i);
            i === v ? delete e[t] : (e[t] = i);
          },
          G = function (e, t, i) {
            var n = e[t],
              r;
            if ('object' == typeof n && n)
              if ('[object Array]' == p.call(n)) for (r = n.length; r--;) B(n, r, i);
              else
                m(n, function (e) {
                  B(n, e, i);
                });
            return i.call(e, t, n);
          };
        n.parse = function (e, t) {
          var i, n;
          T = 0;
          E = '' + e;
          i = x(O());
          '$' != O() && L();
          T = E = null;
          return t && '[object Function]' == p.call(t) ? G(((n = {}), (n[''] = i), n), '', t) : i;
        };
      }
    }
    n.runInContext = e;
    return n;
  }
  var t = 'function' == typeof define && define.amd,
    i = { function: !0, object: !0 },
    n = i[typeof exports] && exports && !exports.nodeType && exports,
    r = (i[typeof window] && window) || this,
    o = n && i[typeof module] && module && !module.nodeType && 'object' == typeof global && global;
  !o || (o.global !== o && o.window !== o && o.self !== o) || (r = o);
  if (n && !t) e(r, n);
  else {
    var a = r.JSON,
      s = r.JSON3,
      c = !1,
      l = e(
        r,
        (r.JSON3 = {
          noConflict: function () {
            c || ((c = !0), (r.JSON = a), (r.JSON3 = s), (a = s = null));
            return l;
          },
        }),
      );
    r.JSON = { parse: l.parse, stringify: l.stringify };
  }
  t &&
    define('URS-JSON3', function () {
      return l;
    });
}).call(this);
