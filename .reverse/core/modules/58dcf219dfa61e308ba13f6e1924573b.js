EDU(
  '58dcf219dfa61e308ba13f6e1924573b',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    var u = {
      'mooc1vod.stu.126.net':
        '//mooc1vod.stu.126.net/nos/ept/hls/2021/11/21/459/120d3e4e-98bb-4411-bff6-bc7b53e41fec_e7.m3u8',
      'mooc2vod.stu.126.net':
        '//mooc2vod.stu.126.net/nos/hls/2021/11/22/66/629b9b82-2cea-4db8-80e1-918782e015d8_7.m3u8',
    };
    d._$$LogReport = t._$klass();
    var _ = d._$$LogReport._$extend(i._$$EventTarget);
    _.__init = function () {
      this.__super();
    };
    _.__reset = function () {
      this.__super();
      this._statObjStart = {
        create_time: new Date().getTime().toString(),
        device_id: this._genDeviceID(),
        manufacturer: navigator.userAgent,
        platform: 'web',
        sdk_version: 'eduPlayer v0.0.26',
        session_id: this._genSessionId(),
      };
      this._statTimes = 0;
      this._currentMovie = null;
      this._blockNumArr = [];
      this._printTimeArr = [];
      this._vfpsArr = [];
      this._pvfpsArr = [];
      this._kbpsArr = [];
      this._errorCode = null;
      this._errorMessage = null;
    };
    _.setPlayer = function (e, t) {
      this._player = t;
      this._isLive = 'live' == e.mode;
      this._videoData = e.videoData;
      this._initEvent();
    };
    _.__destroy = function () {
      this.__super();
      this._clearSecTimer();
    };
    _._initEvent = function () {
      this._player._$addEvent('onStartLoad', this._onStartLoad._$bind(this));
      this._player._$addEvent('onError', this._onError._$bind(this));
      this._player._$addEvent('onPlayEnd', this._onEnd._$bind(this));
      this._player._$addEvent('onPlay', this._onPlay._$bind(this));
      this._player._$addEvent('onPause', this._onPause._$bind(this));
    };
    ((_._genDeviceID = function () {
      var e,
        t = new Date(),
        n = document.cookie.match(i),
        i = new RegExp('(^| )eduplayer_device_id=([^;]*)(;|$)');
      if (n) e = n[2];
      else {
        e = new Date().getTime().toString() + Math.round(1e10 * Math.random()).toString();
        t.setTime(t.getTime() + 31536e6);
        document.cookie = 'eduplayer_device_id=' + e + ';path=/;expires=' + t.toGMTString();
      }
      return e;
    }),
      (_._genSessionId = function () {
        if (!this._sessionId)
          this._sessionId =
            new Date().getTime().toString() + Math.round(1e10 * Math.random()).toString();
        return this._sessionId;
      }));
    _._choosePostLog = function () {};
    _._getLogoParams = function (e) {
      var t = this._getBrowser();
      var n = document.querySelector('.ux-video-player .bufferbar');
      var i =
        n && this._videoData.duration
          ? (n.style.width.replace('%', '') / 100) * this._videoData.duration
          : 0;
      var o = {
        errorCode: e ? e.errorCode : this._errorCode,
        errorMsg: e ? e.errMsg : this._errorMessage,
        preLoadTime: parseInt(i),
        userId: (c._$getWebUser() || {}).id,
        videoId: this._videoData.videoId,
        rate: s._$cookie('videoRate') || 1,
        deviceName: t.type + '/' + t.versions,
        currentKbps: this._player && this._player._$currentFPS ? this._player._$currentFPS() : 0,
        source: 'web',
        time: +new Date(),
      };
      if (this._netInfo) o = Object.assign({}, o, this._netInfo);
      if (this._cdnInfo) o = Object.assign({}, o, this._cdnInfo);
      if (this._domainInfos)
        o = Object.assign({}, o, {
          domainInfos: this._domainInfos,
        });
      return o;
    };
    _.postErrToVod = function (e) {
      if (e && e.videoData) this._videoData = e.videoData;
      this._checkAsyncInfo(
        function () {
          var t = this._getLogoParams(e);
          var n = {
            type: 'json',
            data: JSON.stringify(t),
            method: 'POST',
            cookie: !0,
            headers: { 'Content-Type': 'application/json' },
            onload: function (e) {}._$bind(this),
            onerror: function () {},
          };
          o._$request('//vod.study.163.com/submit/exception', n);
        }._$bind(this),
      );
    };
    _.postHeartBeat = function () {
      this._checkAsyncInfo(
        function () {
          var e = this._getLogoParams();
          var t = {
            type: 'json',
            data: JSON.stringify(e),
            method: 'POST',
            cookie: !0,
            headers: { 'Content-Type': 'application/json' },
            onload: function (e) {}._$bind(this),
            onerror: function () {},
          };
          o._$request('//vod.study.163.com/submit/heartBeat', t);
        }._$bind(this),
        !0,
      );
    };
    _._postLiveLogToSPY = function () {
      if (this._currentMovie) {
        var e = {
          create_time: this._statObjStart.create_time,
          device_id: this._statObjStart.device_id,
          manufacturer: this._statObjStart.manufacturer,
          platform: this._statObjStart.platform,
          sdk_version: this._statObjStart.sdk_version,
          session_id: this._statObjStart.session_id,
          pull_url: this._currentMovie.url,
          isp: '',
          cdn_type: '',
        };
        e.print_time = this._printTimeArr.join(',');
        e.real_block_num = this._blockNumArr.join(',');
        e.real_v_fps = this._vfpsArr.join(',');
        e.real_p_v_fps = this._pvfpsArr.join(',');
        e.real_v_kbps = this._kbpsArr.join(',');
        var t = {
          type: 'json',
          data: JSON.stringify(e),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cookie: !1,
          onload: function (e) {}._$bind(this),
          onerror: function () {},
        };
        o._$request('//sdkstats.live.126.net/sdkstats/report/type=4', t);
      }
    };
    _._setSecTimer = function () {
      if (!this._secTimer) this._secTimer = setInterval(this._getDataSec._$bind(this), 1e3);
    };
    _._clearSecTimer = function () {
      if (this._secTimer) {
        clearInterval(this._secTimer);
        this._secTimer = null;
      }
    };
    _._getDataSec = function () {
      this._printTimeArr.push(new Date().getTime());
      if (this._player._$isBlock)
        try {
          this._blockNumArr.push(this._player._$isBlock() ? 1 : 0);
        } catch (e) {
          this._blockNumArr.push(0);
        }
      else this._blockNumArr.push(0);
      if (this._player._$metaFPS)
        try {
          this._vfpsArr.push(Math.round(this._player._$metaFPS()));
        } catch (e) {
          this._vfpsArr.push(0);
        }
      else this._vfpsArr.push(0);
      if (this._player._$currentFPS)
        try {
          this._pvfpsArr.push(Math.round(this._player._$currentFPS()));
        } catch (e) {
          this._pvfpsArr.push(0);
        }
      else this._pvfpsArr.push(0);
      if (this._player._$currentKbps)
        try {
          this._kbpsArr.push(Math.round(this._player._$currentKbps()));
        } catch (e) {
          this._kbpsArr.push(0);
        }
      else this._kbpsArr.push(0);
      this._statTimes++;
      if (this._statTimes == (localStorage.getItem('videoHeartBeatPeriod') || 10)) {
        this._statTimes = 0;
        this.postHeartBeat();
        this._printTimeArr = [];
        this._blockNumArr = [];
        this._vfpsArr = [];
        this._pvfpsArr = [];
        this._kbpsArr = [];
      }
    };
    _._onStartLoad = function (e) {
      if (!this._currentMovie || (this._currentMovie && e.url != this._currentMovie.url)) {
        this._clearSecTimer();
        this._currentMovie = e;
        this._blockNumArr = [];
        this._printTimeArr = [];
        this._vfpsArr = [];
        this._pvfpsArr = [];
        this._kbpsArr = [];
        this._statTimes = 0;
      }
    };
    _._onPlay = function (e) {
      this._setSecTimer();
    };
    _._onPause = function (e) {
      this._clearSecTimer();
    };
    _._onEnd = function (e) {
      this._clearSecTimer();
    };
    _._onError = function (t) {
      this._clearSecTimer();
      if (e._$isObject(t)) {
        this._errorCode = t.errorType || t.errorCode || t.code;
        this._errorMessage = t.errorMessage || t.errMsg || t.message;
      } else {
        this._errorCode = t;
        this._errorMessage = null;
      }
      this.postErrToVod();
    };
    _._checkAsyncInfo = function (e, t) {
      this._requestIp(
        function () {
          if (t) e();
          else
            this._requestCDN(
              function () {
                e();
              }._$bind(this),
            );
        }._$bind(this),
      );
    };
    _._requestIp = function (e) {
      if (!this._netInfo)
        r._$loadScript('https://nstool.netease.com/info.js', {
          onload: function (t) {
            this._netInfo = {
              ip: window.ip,
              dns: window.dns,
              ipProvince: window.ip_province,
              ipCity: window.ip_city,
              ipIsp: window.ip_isp,
              dnsProvince: window.dns_province,
              dnsCity: window.dns_city,
              dnsIsp: window.dns_isp,
              dnsRes: window.res,
              dnsMsg: window.msg,
            };
            e();
          }._$bind(this),
          onerror: function () {
            e();
          }._$bind(this),
        });
      else e();
    };
    _._requestCDN = function (e) {
      if (!this._cdnInfo) {
        var t = ['mooc1vod.stu.126.net', 'mooc2vod.stu.126.net'];
        this._pingTime = t.length - 1;
        this._domainInfos = [];
        t.forEach(
          function (t) {
            this.pingHost(t, e);
          }._$bind(this),
        );
      } else e();
    };
    _.pingHost = function (e, t) {
      var n = +new Date();
      o._$request(u[e], {
        type: 'json',
        result: { headers: ['cdn-ip', 'cdn-user-ip'] },
        method: 'GET',
        onload: function (i, o) {
          this._domainInfos.push({ ip: i.headers['cdn-ip'], domain: e, delay: +new Date() - n });
          console.log('yyyyy', n);
          if (this._pingTime) this._pingTime--;
          else {
            this._reqCode = 200;
            t();
          }
        }._$bind(this),
        onerror: function (e) {
          console.log('yyyyy', n);
          if (this._pingTime) this._pingTime--;
          else {
            this._reqCode = e.data || e.code;
            t();
          }
        }._$bind(this),
      });
    };
    _._getBrowser = function () {
      var e = navigator.userAgent.toLowerCase();
      var t = {};
      var n = {
        IE: window.ActiveXObject || 'ActiveXObject' in window,
        Chrome: e.indexOf('chrome') > -1 && e.indexOf('safari') > -1,
        Firefox: e.indexOf('firefox') > -1,
        Opera: e.indexOf('opera') > -1,
        Safari: e.indexOf('safari') > -1 && e.indexOf('chrome') == -1,
        Edge: e.indexOf('edge') > -1,
        QQBrowser: /qqbrowser/.test(e),
        WeixinBrowser: /MicroMessenger/i.test(e),
      };
      for (var i in n)
        if (n[i]) {
          var o = '';
          if ('IE' == i) o = e.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
          else if ('Chrome' == i) {
            for (var a in navigator.mimeTypes)
              if ('application/360softmgrplugin' == navigator.mimeTypes[a]['type']) i = '360';
            o = e.match(/chrome\/([\d.]+)/)[1];
          } else if ('Firefox' == i) o = e.match(/firefox\/([\d.]+)/)[1];
          else if ('Opera' == i) o = e.match(/opera\/([\d.]+)/)[1];
          else if ('Safari' == i) o = e.match(/version\/([\d.]+)/)[1];
          else if ('Edge' == i) o = e.match(/edge\/([\d.]+)/)[1];
          else if ('QQBrowser' == i) o = e.match(/qqbrowser\/([\d.]+)/)[1];
          t.type = i;
          t.versions = parseInt(o);
        }
      return t;
    };
    return d;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '8a864b627c302d7d1c56bd928b515d1b',
  'af8805404cc0bd2b95d3d3c9573484b1',
  '9a830f6a308feb17fe43372af2d6e799',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'ecc0bbe3c8ad6be8c2cd6f2cc1afe656',
);
