EDU(
  'f7582f5f94dab534ffaf9c0faac60041',
  function (e, t, n, i, o, a) {
    var r = t.$extends({ name: 'um-live-live-notice-view', css: i, template: n });
    r.show = function (t, n, i, s, c) {
      if (o.isInEudLive()) o.showNoticeWnd(i);
      else {
        var d = new r({
          data: { getFromServer: s, mode: i, liveId: t, content: n, account: c, lang: e },
        });
        var l = new a({
          data: {
            class: 'um-live-live-notice-view-modal',
            contentTemplate: '<div ref="noticemodal"></div>',
            title: '',
            okButton: null,
            cancelButton: null,
          },
        });
        d.$on('close', function () {
          l.destroy();
        });
        d.$inject(l.$refs.noticemodal);
        return { modal: l, nt: d };
      }
    };
    return r;
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  '125595967bb00be2a495ff9669c6fc0c',
  '0bbb54848db49beadae701261aeb83da',
  '3fb4ff895d591a33f16fe08f85a61cbf',
  'da1668c9fa910f2a29d77345d1c9ac52',
  'abe9a6b99742882e8efaadd2518b0cb2',
);
