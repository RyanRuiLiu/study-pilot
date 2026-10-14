EDU(
  '4ccef5b7cea7a30d6665502843c779ec',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l = {};
    r._$init = (function () {
      var e = !1;
      return function () {
        if (!e) {
          e = !0;
          var i = (function () {
            var e = function (e, t, n) {
              a.__setItemToStorage(t, JSON.stringify(e));
              delete n[t];
            };
            return function () {
              t._$loop(l, e);
            };
          })();
          n._$addEvent(document, 'storageready', i);
          a.__initStorage();
        }
      };
    })();
    r._$setDataInStorage = function (e, t) {
      r._$init();
      var n = JSON.stringify(t);
      try {
        a.__setItemToStorage(e, n);
      } catch (i) {
        console.error(i.message);
        console.error(i);
      }
      if (n != a.__getItemInStorage(e)) l[e] = t;
    };
    r._$getDataInStorage = function (e) {
      r._$init();
      var t = JSON.parse(a.__getItemInStorage(e) || 'null');
      return null == t ? l[e] : t;
    };
    r._$getDataInStorageWithDefault = function (e, t) {
      var n = r._$getDataInStorage(e);
      if (null == n) {
        n = t;
        r._$setDataInStorage(e, n);
      }
      return n;
    };
    r._$delDataInStorage = function (e) {
      r._$init();
      delete l[e];
      a.__removeItemFromStorage(e);
    };
    r._$clearDataInStorage = (function () {
      var e = function (e, t, n) {
        delete n[t];
      };
      return function () {
        r._$init();
        t._$loop(l, e);
        a.__clearStorage();
      };
    })();
    i._$$CustomEvent._$allocate({
      element: document,
      event: 'storageready',
      oneventadd: function () {
        if (a.__isStorageReady()) n._$dispatchEvent(document, 'storageready');
      },
    });
    if (!0) e.copy(e.P('nej.j'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '4a1eebd4a6f73a95ccf8ecf0a547fa18',
  'b407415892db22a7a6ad9c60c92e34b6',
);
