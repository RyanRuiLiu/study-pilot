EDU(
  '7832f00c56a132c163eeaae343444dd9',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      s,
      r = 'ck-reportCache';
    i._$$COM_Cache_ReportCache = NEJ.C();
    s = i._$$COM_Cache_ReportCache._$extend(i._$$COM_Cache);
    s._$reportPost = function (e, t, n, i, o, s) {
      this._$postDWR({
        key: r + a,
        url: 'ReportBean.reportPostV1',
        param: [e, n, i, o, s],
        onload: this.__cbOnReportCb._$bind(this),
      });
    };
    s._$reportReply = function (e, t, n, i, o) {
      this._$postDWR({
        key: r + a,
        url: 'ReportBean.reportReplyV1',
        param: [e, n, i, o],
        onload: this.__cbOnReportCb._$bind(this),
      });
    };
    s._$reportComment = function (e, t, n, i, o) {
      this._$postDWR({
        key: r + a,
        url: 'ReportBean.reportCommentV1',
        param: [e, n, i, o],
        onload: this.__cbOnReportCb._$bind(this),
      });
    };
    s.__cbOnReportCb = function (e) {
      this._$dispatchEvent('onReportCb', e);
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
