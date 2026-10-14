EDU(
  '11f6f17562b378193e24e3e7fd9cddbd',
  function (e, t, n, i, o, a) {
    var r = window;
    var s = {};
    a._$canUseFileUploadByBlobs = (function () {
      var e = !!r.XMLHttpRequest && !!r.Blob && !!Blob.prototype.hasOwnProperty('slice');
      return function () {
        return e;
      };
    })();
    a._$fileUploadByBlobs = function (t) {
      var n = t.file;
      if (n) {
        if (!t.key) t.key = e._$randNumberString();
        s[t.key] = s[t.key] || {};
        s[t.key].options = t;
        var r = {
          fileName: encodeURIComponent(t.fileName),
          fileSize: n.size,
          fileGmtModifiedTime: a._$getFileLastModifiedTime(n),
          eduUploaderToken: t.eduUploaderToken,
          _t: new Date().getTime(),
        };
        o._$request(i.GET_UPLOAD_PROGRESS_URL, {
          type: 'json',
          method: 'GET',
          query: r,
          mode: t.mode,
          cookie: !1,
          onload: function (t, i) {
            if (0 != i.code) t.onerror && t.onerror(i);
            else {
              var o = i.result;
              if (!e._$isObject(o)) {
                o = {};
                o.context = '';
                o.offset = 0;
              }
              if (!s[t.key]) return;
              if (o.offset >= n.size - 1) {
                delete s[t.key];
                !!t.onload && t.onload();
                return;
              }
              o.initOffset = o.offset;
              s[t.key].data = o;
              a.__uploadBlob(t.key);
            }
          }._$bind(this, t),
        });
        return t.key;
      }
    };
    a.__blobSlice = function (e, t, n) {
      var i = Math.min(t + n, e.size);
      return e.slice(t, i);
    };
    a.__uploadBlob = function (e) {
      var t = s[e];
      if (t) {
        var n = t.options,
          r = n.nosKey,
          c = n.bucket,
          d = n.xNosToken;
        t.blob = a.__blobSlice(n.file, t.data.offset, i.BLOBSIZE);
        var l = t.data.offset + t.blob.size >= n.file.size;
        n.form.action =
          n.ip +
          '/' +
          c +
          '/' +
          r +
          '?offset=' +
          t.data.offset +
          '&complete=' +
          l +
          (t.data.context ? '&context=' + t.data.context : '') +
          '&version=1.0';
        var u = function (e, t) {
          var i = {
            timeStamp: new Date().getTime(),
            loaded: e.data.offset + t.loaded,
            total: n.file.size,
            initOffset: e.data.initOffset,
          };
          n.onuploading(i);
        };
        var _ = function (t, i) {
          if (i.errMsg) n.onerror(i);
          else if (t.data.offset + t.blob.size >= n.file.size) {
            delete s[e];
            t.data.offset = 0;
            t.data.context = '';
            a.__saveUploadProgress(
              t,
              function (e, t) {
                e.onload(t);
              }._$bind(this, n, i),
            );
          } else {
            t.data.offset = t.data.offset + t.blob.size;
            t.data.context = i.context;
            a.__saveUploadProgress(t, function () {
              a.__uploadBlob(e);
            });
          }
        };
        var f = function (e) {
          n.onerror(e);
        };
        var h = {
          type: 'json',
          mode: t.options.mode,
          method: 'POST',
          timeout: 18e5,
          cookie: !1,
          headers: { 'Content-Type': 'multipart/form-data', 'x-nos-token': d },
          data: t.blob,
          onuploading: u._$bind(this, t),
          onload: _._$bind(this, t),
          onerror: f._$bind(this),
        };
        s[e].reqId = o._$request(n.form.action, h);
      }
    };
    a.__saveUploadProgress = function (e, t) {
      var n = e.options;
      var r = {
        fileName: encodeURIComponent(n.fileName),
        fileSize: n.file.size,
        context: e.data.context,
        offset: e.data.offset,
        fileGmtModifiedTime: a._$getFileLastModifiedTime(n.file),
        eduUploaderToken: n.eduUploaderToken,
        _t: new Date().getTime(),
      };
      o._$request(i.SAVE_UPLOAD_PROGRESS_URL, {
        type: 'json',
        method: 'GET',
        query: r,
        mode: n.mode,
        cookie: !1,
        onload: function (e, t, i) {
          if (0 != i.code) n.onerror && n.onerror(i);
          else t && t();
        }._$bind(this, e, t),
      });
    };
    a._$abortFileUploadByBlobs = function (e) {
      if (s[e]) {
        o._$abort(s[e].reqId);
        s[e] = null;
      }
    };
    a._$getFileSize = function (e) {
      if (!e.files) return '';
      if (!e.files[0]) return '';
      else return e.files[0].size || '';
    };
    a._$getFileLastModifiedTime = function (e) {
      if (!e.files) return '';
      var t = e.files[0];
      if (!t) return '';
      if (t.lastModified) return t.lastModified;
      else if (t.lastModifiedDate) return t.lastModifiedDate.getTime();
      else return '';
    };
    return a;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '5c7056e4308772bfe37d20fd87012cce',
  '8a864b627c302d7d1c56bd928b515d1b',
);
