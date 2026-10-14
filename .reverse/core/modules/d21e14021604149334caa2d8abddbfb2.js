EDU(
  'd21e14021604149334caa2d8abddbfb2',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    l._$$Page = e._$klass();
    u = l._$$Page._$extend(t._$$EventTarget);
    u.__init = function (e) {
      this.__browserSupported();
      e.param = e.param || {};
      n._$merge(
        e.param,
        n._$query2object(location.search.length > 1 ? location.search.substr(1) : ''),
      );
      this.__super(e);
      r._$trackPageView();
      r._$trackEvent(
        window.gaCate || window.document.title || '中国大学MOOC',
        '页面展示',
        location.href,
      );
    };
    u.__browserSupported = function () {
      if ('trident' === a._$KERNEL.engine && parseFloat(a._$KERNEL.release) < 4)
        window.location.replace('//www.icourse163.org/common/errors/notSupported.htm');
      else if ('trident' === a._$KERNEL.engine && 4 == parseFloat(a._$KERNEL.release))
        this.IE8NoticeUI = new o();
    };
    u.__reset = function (e) {
      this.__super(e);
    };
    u.__destroy = function () {
      this.__super();
    };
    return l._$$Page;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fe86216ed59e3103a56c42c850d389f0',
  '1b284280ad407af1a8993da91f6d7952',
  'c8e43601d2f6cef2be6ab94fed0c696c',
  'f051aeae7bb889518ead30ef6e491df3',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'de71aaa4f77ef1f13ed8ee8014eef1b1',
  '3849f5eb84c389c7316cc900fb9cda78',
);
