EDU(
  '353a94f970f3303d6a29097bf8f613a3',
  function (e, t) {
    var i = e.$extends({
      name: 'u-channel-panel',
      data: { channelList: [], showPanel: !1, certificationTestResult: !1 },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        this.getChannelList();
        this.getCertificationTestResult();
      },
      getCertificationTestResult: function () {
        t._$getCertificationTestResult(
          {},
          function (e) {
            this.data.certificationTestResult = e;
            this.$update('certificationTestResult', this.data.certificationTestResult);
          }._$bind(this),
        );
      },
      getChannelList: function () {
        var e = sessionStorage.getItem('icourse163.common.nav.channelList'),
          i;
        try {
          i = JSON.parse(e);
        } catch (n) {}
        if (e && i) {
          this.data.channelList = i;
          this.$update('channelList', this.data.channelList);
        } else
          t._$getListChannelCategoryDetail(
            { includeALLChannels: !0, includeDefaultChannels: !1, includeMyChannels: !1 },
            function (e) {
              var t = (e || {}).result || {};
              var i = t.channelCategoryDetails || [];
              this.data.channelList = i;
              i && sessionStorage.setItem('icourse163.common.nav.channelList', JSON.stringify(i));
              this.$update('channelList', this.data.channelList);
            }._$bind(this),
          );
      },
      handleItemClick: function (e, t) {
        var i = '//www.icourse163.org/channel/' + t.id + '.htm';
        window.DATracker &&
          window.DATracker.track('导航频道点击', {
            pagename: 'home',
            user_id: window.webUser && window.webUser.id,
            channel_id: t.id,
            channel_name: t.name,
          });
        e.stopPropagation();
        window.open(i);
      },
      handleCertifiedLearnClick: function (e) {
        var t = '//www.icourse163.org/certifiedInterest.htm#/';
        e.stopPropagation();
        window.open(t);
      },
      handleSmartCourseClick: function (e) {
        var t = 'https://www.icourse163.org/channel/126001.htm';
        e.stopPropagation();
        window.open(t);
      },
      toggleShow: function () {
        this.data.showPanel = !this.data.showPanel;
        this.$update();
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  'd5f43a657e3dc81d77c7b87a66b6aca2',
);
