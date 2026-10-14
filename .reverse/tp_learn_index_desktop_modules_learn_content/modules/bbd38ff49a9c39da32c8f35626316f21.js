EDU(
  'bbd38ff49a9c39da32c8f35626316f21',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '        .#<uispace> .bd{color:#ddd;margin:0 5px;}        .#<uispace> .manBtn span{display:inline-block;vertical-align:middle;height:14px;width:14px;background:url(' +
        e.imageUrlMap.forum_icon_sprite +
        ') no-repeat -55px -45px;}        .#<uispace> .manBtn:hover span{background-position:-72px -45px;}        .u-manList{position:absolute;width:110px;background-color:#fff;border:1px solid #DDD;border-bottom:none;}        .u-manList li{line-height:30px;text-align:center;border-bottom:1px solid #DDD;cursor:pointer;}        .u-manList li:hover a{color:#61A500;}        ',
    );
    var d = i._$addHtmlTemplate(
      '<div class="f-cb">\t\t  \t<div class="f-fl bd">|</div>\t\t  \t<a hidefocus="true" class="f-fl f-fc9 manBtn"><span></span>${lang.KEY_LEARN_MANAGE}</a>       </div>',
    );
    s._$$ManageItem = NEJ.C();
    r = s._$$ManageItem._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate(d, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      o._$addEvent(
        this.__body,
        s._$isIE() ? 'mouseenter' : 'mouseover',
        this.__showHiddenHandle._$bind(this, !0),
      );
      o._$addEvent(
        this.__body,
        s._$isIE() ? 'mouseleave' : 'mouseout',
        this.__showHiddenHandle._$bind(this, !1),
      );
    };
    r.__showHiddenHandle = function (t, n) {
      if (t) {
        if (this.__delayHide) e.clearTimeout(this.__delayHide);
        if (this.__manListNode && document.body.contains(this.__manListNode)) return;
        var o = i._$offset(this.__body);
        this.__manListNode.style.zIndex = 1e3;
        this.__manListNode.style.top = o.y + 18 + 'px';
        this.__manListNode.style.left = o.x - 20 + 'px';
        document.body.appendChild(this.__manListNode);
      } else
        this.__delayHide = e.setTimeout(
          function () {
            if (this.__manListNode && document.body.contains(this.__manListNode))
              document.body.removeChild(this.__manListNode);
          }._$bind(this),
          10,
        );
    };
    r.__destroy = function () {
      if (this.__manListNode && this.__manListNode.parentNode)
        this.__manListNode.parentNode.removeChild(this.__manListNode);
      this.__supDestroy();
    };
    r._$setItemMes = function (e, t) {
      var n = this.__liAlinkChildrenMap[e];
      if (n) n.innerText = t || '';
    };
    r.__reset = function (e) {
      this.__supReset(e);
      var t = "<ul class='u-manList'>";
      a._$forEach(e.showItems, function (e) {
        switch (e) {
          case 'onCheck':
            t +=
              "<li data-eventmes='onCheck'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_POSTER_MANAGEMENT +
              '</a></li>';
            break;
          case 'onResolve':
            t +=
              "<li data-eventmes='onResolve'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_SOLVED +
              '</a></li>';
            break;
          case 'onTop':
            t +=
              "<li data-eventmes='onTop'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_TOP +
              '</a></li>';
            break;
          case 'onAgree':
            t +=
              "<li data-eventmes='onAgree'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_AGREE_AGREE +
              '</a></li>';
            break;
          case 'onDel':
            t +=
              "<li data-eventmes='onDel'><a hidefocus='true' class='f-fc9'>" +
              window.moocConfig.lang.KEY_LEARN_DELETE_DELETE +
              '</a></li>';
        }
      });
      t += '</ul>';
      this.__manListNode = i._$html2node(t);
      var n = i._$getChildren(this.__manListNode);
      this.__liAlinkChildrenMap = {};
      a._$forEach(
        n,
        function (e) {
          var t = i._$dataset(e, 'eventmes');
          this.__liAlinkChildrenMap[t] = i._$getChildren(e)[0];
          this.__doInitDomEvent([
            [
              e,
              'click',
              function () {
                this._$dispatchEvent(t);
              }._$bind(this),
            ],
          ]);
        }._$bind(this),
      );
      this.__doInitDomEvent([
        [
          this.__manListNode,
          s._$isIE() ? 'mouseenter' : 'mouseover',
          this.__showHiddenHandle._$bind(this, !0),
        ],
        [
          this.__manListNode,
          s._$isIE() ? 'mouseleave' : 'mouseout',
          this.__showHiddenHandle._$bind(this, !1),
        ],
      ]);
      this.__showHiddenHandle(!1);
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
