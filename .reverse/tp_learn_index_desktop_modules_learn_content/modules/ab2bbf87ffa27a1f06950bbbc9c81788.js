EDU(
  'ab2bbf87ffa27a1f06950bbbc9c81788',
  function (e, t, n, i) {
    var o = 6048e5;
    i.getTermProgressStatus = function (i) {
      var o = t._$getCurServerTime();
      if (i.startTime === e.UNDETERMINDED_STARTTIME)
        return n.TERM_PROGRESS_STATUS.UNSTARTED.UNDETERMINED_START_TIME;
      else if (o < i.startTime) return n.TERM_PROGRESS_STATUS.UNSTARTED.DETERMINED_START_TIME;
      else if (
        o < i.endTime &&
        i.closeVisableStatus !== e.CLOSE_VISABLE_CLOSE &&
        i.closeVisableStatus !== e.CLOSE_VISABLE_HALFOPEN &&
        i.closeVisableStatus !== e.CLOSE_VISABLE_OPEN
      )
        return n.TERM_PROGRESS_STATUS.ONGOING;
      else
        switch (parseInt(i.closeVisableStatus, 10)) {
          case e.CLOSE_VISABLE_CLOSE:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_INVISIBLE;
          case e.CLOSE_VISABLE_HALFOPEN:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ENROLLED_USERS;
          case e.CLOSE_VISABLE_OPEN:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ALL_USERS;
          default:
            return n.TERM_PROGRESS_STATUS.ENDED.CLOSED_WITH_CONTENT_VISIBLE_TO_ALL_USERS;
        }
    };
    i.isUnstarted = function (e) {
      for (var t in n.TERM_PROGRESS_STATUS.UNSTARTED)
        if (
          n.TERM_PROGRESS_STATUS.UNSTARTED.hasOwnProperty(t) &&
          n.TERM_PROGRESS_STATUS.UNSTARTED[t] === e
        )
          return !0;
      return !1;
    };
    i.isEnded = function (e) {
      for (var t in n.TERM_PROGRESS_STATUS.ENDED)
        if (n.TERM_PROGRESS_STATUS.ENDED.hasOwnProperty(t) && n.TERM_PROGRESS_STATUS.ENDED[t] === e)
          return !0;
      return !1;
    };
    i.isOngoing = function (e) {
      return !i.isUnstarted(e) && !i.isEnded(e);
    };
    i.getTermProgressWeek = function (e) {
      var n = t._$getCurServerTime();
      if (n < e.startTime) n = e.startTime;
      var i = {
        currentWeek: Math.ceil((n - e.startTime) / o) || 1,
        totalWeek: Math.ceil((e.endTime - e.startTime) / o),
      };
      return i;
    };
  },
  '93828627ddb358ed890cb65967a0c1de',
  '89a466f05573f560c156411121b8daae',
  '68471111cd34db27f540f48b62615eb2',
);
