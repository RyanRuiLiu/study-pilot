EDU(
  '3c901c22ade77485e83c760f41b2eb47',
  function (e, t, n, i, o, a) {
    var r = {};
    r[t.SETTING_KEY] = n;
    a.batch(r);
    e.batchComponentSetting({
      'theme-color-primary': '#00CC7E',
      'theme-color-primary-hovered': '#96D103',
      'empty-comment-placeholder-image-url':
        window.location.protocol +
        '//edu-image.nosdn.127.net/ec5b48b6-3b63-48f5-b522-d00d33050449.png?imageView&thumbnail=100y100&quality=100',
    });
    i.on({
      post: function (e) {
        if (e && 'login-set-bind-urs-phone' === e.key);
        else {
          var t = o.__onloadHandler(function () {}, !1, e.req, e.res);
          if (!t) e.error = new Error(e.res.message);
        }
      },
    });
  },
  'a542ca25f068f41ad74799af47ad699d',
  '5147903096318e5db3d048c483fc6b12',
  '6f978248a305597fe5d620d05b19130e',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '8f34a99b20d362b3542aebd517390fc1',
);
