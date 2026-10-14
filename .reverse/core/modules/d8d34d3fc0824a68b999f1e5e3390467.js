EDU(
  'd8d34d3fc0824a68b999f1e5e3390467',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('nej.ut'),
      s = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('edu.d'),
      l = NEJ.P('nej.ui'),
      u;
    s._$$CourseList = NEJ.C();
    u = s._$$CourseList._$extend(r._$$Event, !0);
    u.__reset = function (e) {
      this.__supReset(e);
      this.__parent = e.parent || o._$html2node('<div></div>');
      this.__tpl = e.tpl || '';
      this.__clickActions = e.clickActions || [];
      this.__linkClazz = e.linkClazz || 'j-href';
      this.__linkout = e.linkout || !1;
    };
    u._$setContent = function (n, i, r, c) {
      this.__tpl = i || this.__tpl;
      this.__data = n;
      c = c || [];
      var i = o._$getHtmlTemplate(this.__tpl, {
        xlist: s._$formatCourseList(n, c),
        prefix: t.urlPrefix,
        constant: s.CONST,
        Const: e,
        role: r || null,
      });
      this.__parent.appendChild(o._$html2node(i));
      this.__linkout = o._$getByClassName(this.__parent, this.__linkClazz).length > 0;
      a._$clearEvent(this.__parent, 'click');
      a._$addEvent(this.__parent, 'click', this.__onClick._$bind(this));
    };
    u.__onClick = function (e) {
      var n = a._$getElement(e),
        i = n.parentNode;
      c._$forEach(this.__clickActions, function (e) {
        if (o._$hasClassName(n, e.clazz)) e.cb(n);
      });
      if ('a' != n.tagName.toLowerCase() && 'span' != n.tagName.toLowerCase()) {
        if (this.__linkout)
          for (; i;)
            if (o._$hasClassName(i, this.__linkClazz)) {
              var r = o._$dataset(i, 'href');
              t.open(r, '_blank');
              break;
            } else i = i.parentNode;
      } else a._$stopBubble(e);
    };
    u.__destroy = function () {
      this.__parent.innerHTML = '';
      this.__supDestroy();
    };
  },
  '93828627ddb358ed890cb65967a0c1de',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fe86216ed59e3103a56c42c850d389f0',
);
