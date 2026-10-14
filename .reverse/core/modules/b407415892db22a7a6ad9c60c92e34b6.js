EDU(
  'b407415892db22a7a6ad9c60c92e34b6',
  function (e, t, n, i, o, a, r) {
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release <= '3.0')
      EDU(
        '8193524c0fae3ca4a962f6a48398a742',
        function (e, i) {
          var o;
          var a = function () {
            if (!o)
              i._$flash({
                hidden: !0,
                src: e._$get('storage.swf'),
                params: { AllowScriptAccess: 'sameDomain' },
                onready: function (e) {
                  if (!e) console.log('flash for localStorage unavailable');
                  else {
                    o = e;
                    o.initStorage('nej-storage');
                  }
                  t._$dispatchEvent(document, 'storageready');
                },
              });
          };
          n.__getItemInStorage = function (e) {
            if (o) return o.getItem(e);
          };
          n.__setItemToStorage = function (e, t) {
            if (o) o.setItem(e, t);
          };
          n.__removeItemFromStorage = function (e) {
            if (o) o.removeItem(e);
          };
          n.__clearStorage = function () {
            if (o) o.clear();
          };
          n.__initStorage = function () {
            a();
          };
          n.__isStorageReady = function () {
            return !!o;
          };
        },
        '238c7c1492c17e4d4bc463420d450c00',
        'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
      );
    return n;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '44f2661ffdf490d3c91ca1f98646a165',
);
