EDU(
  '219bba80fd1e900dadcd3a275e06c374',
  function (e, t, n) {
    var i = window;
    var o = {};
    n._$canUseFileUploadByBlobs = (function () {
      var e = !!i.XMLHttpRequest && !!i.Blob && !!Blob.prototype.hasOwnProperty('slice');
      return function () {
        return e;
      };
    })();
    n._$getFileSize = function (e) {
      if (!e.files) return '';
      if (!e.files[0]) return '';
      else return e.files[0].size || '';
    };
    n._$getFileSizeByFile = function (e) {
      if (!e) return '';
      else return e.size || 0;
    };
    n._$getFileLastModifiedTime = function (e) {
      if (!e.files) return '';
      var t = e.files[0];
      if (!t) return '';
      if (t.lastModified) return t.lastModified;
      else if (t.lastModifiedDate) return t.lastModifiedDate.getTime();
      return '';
    };
    n._$getFileLastModifiedTimeByfile = function (e) {
      if (!e) return '';
      if (e.lastModified) return e.lastModified;
      else if (e.lastModifiedDate) return e.lastModifiedDate.getTime();
      return '';
    };
    n._$getFinalUploadType = function (e) {
      if (e == t.UPLOAD_FILE_TYPE_ATTACH_BIG) return t.UPLOAD_FILE_TYPE_ATTACH;
      else return e;
    };
    return n;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '66c2ed70c8e5c5a6817eb8911f02fa45',
);
