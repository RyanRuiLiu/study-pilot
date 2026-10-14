EDU(
  '235c21779ec98ac90606962a862dadc9',
  function (e, t, n, i, o, a, r, s, c) {
    n._$pushCSSText(c);
    var d = Regular.extend({
      config: function () {
        n._$dumpCSSText();
        o.extend(this.data, { visible: !0, lang: r });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        e._$forEach(this._tmp_events, function (e) {
          t._$delEvent.apply(t, e);
        });
        delete this._tmp_events;
        this.supr();
      },
      isShow: function (e) {
        return i.isShow({ switcher: e, key: this.settingKey });
      },
      _flushSetting: (function () {
        var e = {};
        return function (t, n) {
          if (!e[t]) {
            e[t] = !0;
            i.$default(t, n);
          }
        };
      })(),
      _addGlobalEvent: function (n) {
        var i = this._tmp_events;
        if (!i) {
          i = [];
          this._tmp_events = i;
        }
        e._$forEach(n, function (e) {
          t._$addEvent.apply(t, e);
          i.push(e);
        });
      },
    })
      .directive(a)
      .filter(s);
    d.$extends = function l(e) {
      if (e.hasOwnProperty('bem')) e.bemify = e.bem;
      if (e.bemify && e.template) e.template = o.bemify(e.template, e.name, '&' === e.bemify);
      if ('string' == typeof e.css) {
        var t = e.css.trim();
        if (t) n._$pushCSSText(e.css);
        delete e.css;
      }
      var i = this.extend(e);
      i.$extends = l;
      i.cname = e.name;
      return i;
    };
    return d;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '8f34a99b20d362b3542aebd517390fc1',
  '217dcfc103efb36d2f192eecc4548797',
  '70746e7d5275e20a5007065b9c00efe4',
  '315b0d494df86fc9000e825abd903397',
  'b0268a776c76b43d4dd59d25b88ae1af',
  'dbfd070b057104385e81f664b4a4e55a',
);
