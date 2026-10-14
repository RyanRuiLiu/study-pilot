EDU(
  '0e0f05eeaf0ae55e126d55648838e274',
  function (e, t, n, i, o, a, r) {
    var s = window;
    var c = {};
    r._$fileUploadByBlobs = function (t) {
      var n = t.file;
      if (n) {
        if (!t.key) t.key = e._$randNumberString();
        c[t.key] = c[t.key] || {};
        c[t.key].options = t;
        if (c[t.key].data && void 0 != c[t.key].data.initOffset) {
          r.__uploadBlob(t.key);
          return t.key;
        }
        var s = {
          fileName: encodeURIComponent(t.fileName),
          fileSize: n.size,
          fileGmtModifiedTime: o._$getFileLastModifiedTime(n),
          eduUploaderToken: t.eduUploaderToken,
          _t: new Date().getTime(),
        };
        a._$request(i.GET_UPLOAD_PROGRESS_URL, {
          type: 'json',
          method: 'GET',
          query: s,
          mode: t.mode,
          cookie: !1,
          onload: function (t, o) {
            if (0 != o.code)
              t.onerror && t.onerror({ errCode: i['ERROR_CODE_GET_CONTEXT_FAIL'], errMsg: o.code });
            else {
              var a = o.result;
              if (!e._$isObject(a)) {
                a = {};
                a.context = '';
                a.offset = 0;
              }
              if (!c[t.key]) return;
              if (a.offset >= n.size - 1) {
                delete c[t.key];
                !!t.onload && t.onload();
                return;
              }
              a.initOffset = a.offset;
              c[t.key].data = a;
              r.__uploadBlob(t.key);
            }
          }._$bind(this, t),
          onerror: function (e) {
            t.onerror &&
              t.onerror({ errCode: i['ERROR_CODE_GET_CONTEXT_FAIL'], errMsg: '获取进度失败！' });
          }._$bind(this),
        });
        return t.key;
      }
    };
    r.__blobSlice = function (e, t, n) {
      var i = Math.min(t + n, e.size);
      return e.slice(t, i);
    };
    r.__uploadBlob = function (e) {
      var t = c[e];
      if (t) {
        var n = t.options;
        t.blob = r.__blobSlice(n.file, t.data.offset, i.BLOBSIZE);
        t.blobUploadStartTime = new Date().getTime();
        var o = t.data.offset + t.blob.size >= n.file.size;
        n.form.action =
          n.ip +
          '/' +
          n.bucket +
          '/' +
          n.nosKey +
          '?offset=' +
          t.data.offset +
          '&complete=' +
          o +
          (t.data.context ? '&context=' + t.data.context : '') +
          '&version=1.0';
        var s = function (e, t) {
          var i = {
            timeStamp: new Date().getTime(),
            loaded: e.data.offset + t.loaded,
            total: n.file.size,
            initOffset: e.data.initOffset,
          };
          n.onuploading(i);
        };
        var d = function (t, o) {
          if (o.errMsg)
            n.onerror({ errCode: i['ERROR_CODE_NOS_UPLOAD_BLOB_ERROR'], errMsg: o.errMsg });
          else if (!o.offset)
            n.onerror({
              errCode: i['ERROR_CODE_NOS_UPLOAD_BLOB_NO_OFFSET_ERROR'],
              errMsg: 'no offset return',
            });
          else if (o.offset >= n.file.size) {
            n.onuploadBlob({
              startTime: t.blobUploadStartTime,
              endTime: new Date().getTime(),
              startOffset: t.data.offset,
              endOffset: o.offset,
            });
            t.data.offset = 0;
            t.data.context = '';
            r.__saveUploadProgress(
              t,
              function (e, t) {
                e.onload(t);
              }._$bind(this, n, o),
            );
            delete c[e];
          } else {
            n.onuploadBlob({
              startTime: t.blobUploadStartTime,
              endTime: new Date().getTime(),
              startOffset: t.data.offset,
              endOffset: o.offset,
            });
            t.data.offset = o.offset;
            t.data.context = o.context;
            r.__saveUploadProgress(t, function () {
              r.__uploadBlob(e);
            });
          }
        };
        var l = function (e) {
          n.onerror({
            errCode: i['ERROR_CODE_NOS_UPLOAD_BLOB_NETWORK_ERROR'],
            errMsg: 'nos network error',
          });
        };
        var u = {
          type: 'json',
          mode: t.options.mode,
          method: 'POST',
          timeout: 18e5,
          cookie: !1,
          headers: { 'Content-Type': 'multipart/form-data', 'x-nos-token': n.xNosToken },
          data: t.blob,
          onuploading: s._$bind(this, t),
          onload: d._$bind(this, t),
          onerror: l._$bind(this),
        };
        c[e].reqId = a._$request(n.form.action, u);
      }
    };
    r.__saveUploadProgress = function (e, t) {
      var n = e.options;
      var r = {
        fileName: encodeURIComponent(n.fileName),
        fileSize: n.file.size,
        context: e.data.context,
        offset: e.data.offset,
        fileGmtModifiedTime: o._$getFileLastModifiedTime(n.file),
        eduUploaderToken: n.eduUploaderToken,
        _t: new Date().getTime(),
      };
      a._$request(i.SAVE_UPLOAD_PROGRESS_URL, {
        type: 'json',
        method: 'GET',
        query: r,
        mode: n.mode,
        cookie: !1,
        onload: function (e, t, o) {
          if (0 != o.code)
            n.onerror && n.onerror({ errCode: i['ERROR_CODE_SAVE_CONTEXT_FAIL'], errMsg: o.code });
          else t && t();
        }._$bind(this, e, t),
        onerror: function (e) {
          n.onerror &&
            n.onerror({ errCode: i['ERROR_CODE_SAVE_CONTEXT_FAIL'], errMsg: '保存进度失败！' });
        }._$bind(this),
      });
    };
    r._$abortFileUploadByBlobs = function (e) {
      if (c[e]) {
        a._$abort(c[e].reqId);
        c[e] = null;
      }
    };
    return r;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '66c2ed70c8e5c5a6817eb8911f02fa45',
  '219bba80fd1e900dadcd3a275e06c374',
  '8a864b627c302d7d1c56bd928b515d1b',
);
