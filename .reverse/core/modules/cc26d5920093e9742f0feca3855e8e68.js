EDU(
  'cc26d5920093e9742f0feca3855e8e68',
  function (e, t, n, i, o, a, r) {
    var s = NEJ.O,
      c = window,
      d = NEJ.P('nej.e'),
      l = NEJ.P('nej.u'),
      u = NEJ.P('nej.v'),
      _ = NEJ.P('edu.m'),
      f = NEJ.P('edu.d'),
      h = NEJ.P('edu.u'),
      p = NEJ.P('nej.j'),
      m = NEJ.P('edu.cms');
    window.windowOpen = window.windowOpen || window.open;
    window.open = a.open;
    var g, b, v;
    d._$parseTemplate(d._$html2node(n));
    h.__genId = function (e) {
      return e + l._$randNumberString(2);
    };
    var E = function () {
      g = d._$html2node(d._$getHtmlTemplate('jst-edu-ui-loading'));
      document.body.appendChild(g);
      b = d._$get('loadingMask');
      v = d._$get('loadingPb');
    };
    h.showLoading = function (e) {
      if (!g) E();
      e = e || !1;
      if (!e) h._$showNode(b);
      h._$showNode(v);
    };
    h.hideLoading = function () {
      b = b || d._$get('loadingMask');
      v = v || d._$get('loadingPb');
      b && h._$hiddenNode(b);
      v && h._$hiddenNode(v);
    };
    m.showToastTips = h.showToastTips = function (t) {
      var n = h.__genId('toasttips'),
        t = t || s,
        i = t.content || e.KEY_INPUT_PROMPT_CONTENT,
        o = t.minutes || 1e3,
        a = t.type || 1,
        r = t.myStyle || '';
      if (1 == a) _typeClass = 'u-icon-success';
      else _typeClass = 'u-icon-warning';
      var l = d._$html2node(
        d._$getHtmlTemplate('jst-edu-ui-tips', {
          tipId: n,
          content: i,
          type: _typeClass,
          className: r,
        }),
      );
      document.body.appendChild(l);
      var u;
      var _ = {
        from: { offset: 100, velocity: 10 },
        to: { offset: 0 },
        duration: 500,
        onupdate: function (e) {
          l.style.opacity = e.offset / 100;
        },
        onstop: function () {
          u = nej.ut._$$AnimEaseIn._$recycle(u);
          l.parentNode.removeChild(l);
        },
      };
      c.setTimeout(
        function () {
          u = nej.ut._$$AnimEaseIn._$allocate(_);
          u._$play();
        }._$bind(this),
        o,
      );
    };
    h.filterUrl = function (e) {
      var t = !0;
      if (e)
        l._$forEach(e.split(','), function (e, n) {
          if (location.href.indexOf(e) >= 0) t = !1;
        });
      return t;
    };
    h.__initLogoAndActivity = function () {
      if ('/mobile.htm' != location.pathname)
        if (
          !location.search ||
          'hidden' != h._$parseUrlParams(location.search.substring(1)).mobiletopbar
        )
          h._$$AppBannerUI._$allocate({ parent: d._$get('j-appbanner') });
      this.__commonCache = new f._$$COM_Cache_commonCache();
      this.__commonCache._$getTopAndLowerRightCornerBar({}, function (e) {
        var n = e.mocWebTopBarVo;
        var o = e.mocWebLowRightConnerBarVo;
        var a = e.mocWebLowerRightCornerSignVo;
        var r = d._$get('j-activityBanner');
        var s = d._$get('j-activityRightBanner');
        var c = function () {};
        if (n && !h._$isWap() && n.pictureUrl && (!+p._$cookie('close_topBar') || !r))
          if (h.filterUrl(n.filterKeyWord) && r) {
            r.innerHTML =
              "<a href='javascript:;' style='background:url(" +
              n.pictureUrl +
              ") 50% 0 no-repeat'></a><a class='u-icon-normal-close'></a>";
            var l = d._$getByClassName(r, 'u-icon-normal-close')[0];
            var _ = {
              user_id: window.webUser && window.webUser.id,
              pagename: '首页',
              photo_url: n.pictureUrl,
              link_url: n.linkUrl,
            };
            DATracker && DATracker.track('首页-顶部通栏展现-w', _);
            t._$adActionLogByShow(n.linkUrl);
            u._$addEvent(r, 'click', function (e) {
              if (e.target && 'u-icon-normal-close' != e.target.className) {
                DATracker && DATracker.track('首页-顶部通栏点击-w', _);
                t._$adActionLogByClick(n.linkUrl);
                n.linkUrl = t._$urlAddParam(n.linkUrl, 'outVendor', 'zw_mooc_pcdt');
                window.open(n.linkUrl);
              }
            });
            u._$addEvent(l, 'click', function () {
              p._$cookie('close_topBar', { value: '1' });
              d._$addClassName(r, 'f-dn');
              DATracker && DATracker.track('首页-顶部通栏关闭-w', _);
            });
            d._$delClassName(r, 'f-dn');
          }
        var f = function (e) {
          try {
            if (h._$isWap() || !e) return;
            var t = document.createElement('div');
            var n = document.createElement('style');
            t.setAttribute('class', 'lector-entry');
            t.addEventListener('click', function () {
              window.open('https://www.icourse163.org/about/contactus.htm#/contactus?type=2');
            });
            n.type = 'text/css';
            n.innerHTML =
              '                        .lector-entry { display: flex;justify-content: center;align-items: center;position: relative; width: 40px; height: 100px; margin: 8px 0 0 0; border-radius: 4px; background-color: #00CC7E; cursor: pointer; }                        .lector-entry__text { display: inline-block; width: 16px; line-height: 18px; font-size: 16px; color: rgb(255, 255, 255) }                        .lector-entry__text:link { color: rgb(255, 255, 255); }                        .lector-entry__text:active { color: rgb(255, 255, 255); }                        .lector-entry__text:visited { color: rgb(255, 255, 255); }                        .lector-entry__text:hover { color: rgb(255, 255, 255); }                    ';
            document.head.appendChild(n);
            t.innerHTML = '<span class="lector-entry__text">联系我们</span>';
            e.appendChild(t);
          } catch (i) {
            console && console.error && console.error('renderContactUsEntry error:', i);
          }
        };
        var m = function (e) {
          try {
            if (h._$isWap() || !e) return;
            var t = document.createElement('div');
            var n = document.createElement('style');
            t.setAttribute('class', 'ai-lector-entry');
            t.addEventListener('click', function () {
              window.open('https://ai-train.study.163.com/recruit');
            });
            n.type = 'text/css';
            n.innerHTML =
              '                        .ai-lector-entry { display: flex;justify-content: center;align-items: center;position: relative; width: 40px; height: 100px; margin: 8px 0 0 0; border-radius: 4px; background-color: #00CC7E; cursor: pointer; }                        .ai-lector-entry__text { display: inline-block; width: 16px; line-height: 18px; font-size: 16px; color: rgb(255, 255, 255) }                        .ai-lector-entry__text:link { color: rgb(255, 255, 255); }                        .ai-lector-entry__text:active { color: rgb(255, 255, 255); }                        .ai-lector-entry__text:visited { color: rgb(255, 255, 255); }                        .ai-lector-entry__text:hover { color: rgb(255, 255, 255); }                    ';
            document.head.appendChild(n);
            t.innerHTML = '<span class="ai-lector-entry__text">AI讲师招募</span>';
            e.appendChild(t);
          } catch (i) {
            console && console.error && console.error('renderAiLectorEntry error:', i);
          }
        };
        f(s);
        m(s);
        if (a && !h._$isWap() && a.switchStatus && s)
          if (h.filterUrl(a.filterKeyWord)) {
            var g = a.content.split(',');
            new i({
              data: { dailyTips: g[Math.floor(Math.random() * g.length)], promoUrl: a.promoUrl },
            }).$inject(s);
          }
      });
    };
  },
  '61a3a3a5a602c34a33d876f6138c6ede',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '3eab45af1879a2eb052b9a8878c9705c',
  'e1be510a54fb1f4032ea10c5ab5f31d8',
  '45aeb51a857b8c0e0cbd727ee1df0c1a',
  '93a8b71abb2b77c047008b3b84a9f4fa',
  'fb80274a93905bc7807baceaedc07c15',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '25a5b92a97c696ae56ad7f07fbc475dc',
  'c9088f14303859a992db8abb00e8c4f0',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
