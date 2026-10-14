EDU(
  '24f8154ce482a05ab133345b291e357f',
  function (e, t) {
    var n = 'en' === window.currentLanguage;
    var i = window,
      o = NEJ.P,
      a = o('edu.u'),
      r = o('nej.p'),
      s = o('nej.u'),
      c = o('nej.j'),
      d = {};
    a._$fileUploadByBlobs = (function () {
      function e(e, t, n) {
        var i = Math.min(t + n, e.size);
        return e.slice(t, i);
      }
      function t(n) {
        var o = d[n];
        if (o) {
          var a = o.options,
            r = a.token,
            s = a.bucket;
          o.blob = e(a.file, o.dto.offset, o.dto.partSize);
          var l = o.dto.offset + o.blob.size >= a.file.size;
          a.form.action =
            i.uploadHost +
            '/file/multipartUpload.htm?_upload_mth_=sync_parse&partSize=' +
            (l ? o.blob.size : o.dto.partSize) +
            '&uploadId=' +
            o.dto.uploadId +
            '&nextPartNum=' +
            o.dto.nextPartNum +
            '&isLastPart=' +
            (l ? 'true' : 'false') +
            '&key=' +
            o.dto.key +
            '&token=' +
            encodeURIComponent(r) +
            '&bucket=' +
            encodeURIComponent(s);
          var u = function (e, t) {
            var n = {
              timeStamp: t.timeStamp,
              loaded: e.dto.offset + t.loaded,
              total: a.file.size,
              initOffset: e.dto.initOffset,
            };
            a.onuploading(n);
          };
          var _ = function (e, i) {
            if (e.dto.offset + e.blob.size >= a.file.size || !i.retSuc) {
              delete d[n];
              a.onload(i);
            } else {
              e.dto.offset = e.dto.offset + e.blob.size;
              e.dto.nextPartNum = i.nextPartNum;
              t(n);
            }
          };
          var f = function (e) {
            a.onerror(e);
          };
          var h = {
            type: 'json',
            mode: 0,
            method: 'POST',
            timeout: 18e5,
            cookie: !0,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: o.blob,
            onuploading: u._$bind(this, o),
            onload: _._$bind(this, o),
            onerror: f._$bind(this),
          };
          d[n].reqId = c._$request(a.form.action, h);
        }
      }
      var n = 5242880;
      return function (e) {
        var o = e.file;
        if (o) {
          var a = s._$randNumberString();
          d[a] = { options: e };
          c._$request(i.uploadHost + '/file/initMultipartUpload.htm', {
            type: 'json',
            method: 'POST',
            data: {
              token: encodeURIComponent(d[a].options.token),
              fileName: encodeURIComponent(o.name),
              fileSize: o.size,
              bucket: encodeURIComponent(d[a].options.bucket),
            },
            mode: 0,
            cookie: !0,
            onload: function (i) {
              if (void 0 !== d[a])
                if (!(i.offset >= o.size - 1) && i.retSuc) {
                  i.partSize = i.partSize || n;
                  i.initOffset = i.offset;
                  d[a].dto = i;
                  t(a);
                } else {
                  delete d[a];
                  var r = {
                    retSuc: i.retSuc,
                    nosKey: i.key,
                    name: o.name,
                    errorCode: i.errorCode,
                    retMsg: i.retMsg,
                  };
                  !!e.onload && e.onload(r);
                }
            }._$bind(this),
          });
          return a;
        }
      };
    })();
    a._$abortFileUploadByBlobs = function (e) {
      if (d[e]) c._$abort(d[e].reqId);
    };
    a._$canUseFileUploadByBlobs = (function () {
      var e = !!i.XMLHttpRequest && !!i.Blob && !!Blob.prototype.hasOwnProperty('slice');
      return function () {
        return e;
      };
    })();
    a._$formatFileName = function (e) {
      var n = t;
      var i = e.slice(0, e.lastIndexOf('.')),
        o = e.slice(e.lastIndexOf('.')),
        a = '';
      if (n._$getCharsL(i) > 44) a = n._$sliceCnAndEns(i, 44) + '···' + o;
      return a ? a : e;
    };
    a._$uploadErrorHandle = function (t, i) {
      switch (t) {
        case a.CONST.UPLOAD_ERROR_LIMITED:
          a.showToastTips({
            content: e.isCh() ? '文件过大，上传失败' : 'File is too large, upload failed.',
            type: 2,
          });
          if (i) i();
          break;
        case a.CONST.UPLOAD_ERROR_AUTHFAILED:
          a._$$CommonDialog._$showDialog({
            message: n ? 'Not logged in or have no permissions' : '您没有登录或者没有权限',
          });
          break;
        default:
          a._$$CommonDialog._$showDialog({
            message: n ? 'File upload failed, please try again' : '文件上传失败，请重试',
          });
      }
    };
    a._$returnFileType = (function () {
      var e = {};
      e[a.CONST.UPLOAD_TOKEN_TYPE_VIDEO] = { support: ['mp4'], max: '800M' };
      e[a.CONST.UPLOAD_TOKEN_TYPE_PDF] = { support: ['pdf'], max: '5M' };
      return function (t) {
        return e[t];
      };
    })();
    a._$verifyFileNameByType = function (t, n, i) {
      if (!n) return !1;
      t = t || a.CONST.UPLOAD_TOKEN_TYPE_DEFAULT;
      if (!i && !t) return !0;
      if (!i && t) i = a._$returnFileType(t) || {};
      var o = i.support,
        r = i.suggest,
        s = i.max;
      if (!o && !r) return !0;
      if (o) var c = new RegExp('(' + o.join('|') + ')$', 'i');
      if (r) var d = new RegExp('(' + r.join('|') + ')$', 'i');
      var l =
        (r ? '建议' + r.join('、') + '格式，' : '') +
        (o ? '支持' + o.join('、') + '格式' + (s ? '，' : '') : '') +
        (s ? '文件最大为' + s : '') +
        '。';
      if (e.isEn())
        l =
          (r ? 'Suggest ' + r.join(' ') + ', ' : '') +
          (o ? ' Support ' + o.join(' ') + (s ? ', ' : '') : '') +
          (s ? 'File size cannot exceed ' + s : '') +
          '.';
      var u = { regSupport: c, regSuggest: d, message: l };
      var _ = n.slice(n.lastIndexOf('.') + 1);
      if (_ && u)
        if (!((u.regSuggest && u.regSuggest.test(_)) || (u.regSupport && u.regSupport.test(_)))) {
          var f = e.isEn()
            ? 'The selected file format is not supported, please choose again.'
            : '不支持所选择的文件格式，请重新选择。';
          a._$$CommonDialog._$showDialog({
            message: f + (u.message || ''),
            customStyle: 'm-fileNameDialog',
          });
          return !1;
        }
      return !0;
    };
    a._$formatPhotoData = function (e) {
      var t = {};
      if (e) {
        t.gids = [];
        t.urls = [];
        var n = e.photoGarbageIds.split(',');
        var i,
          o,
          a = 0;
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          if (s && s.indexOf('userdef1url') >= 0 && s.split(':')[1] != -1) {
            t.gids.push(s.split(':')[1]);
            t.urls.push(e.userDef1Url);
            a++;
          } else if (s && s.indexOf('userdef2url') >= 0 && s.split(':')[1] != -1) {
            t.gids.push(s.split(':')[1]);
            t.urls.push(e.userDef2Url);
            a++;
          } else if (s && s.indexOf('userdef3url') >= 0 && s.split(':')[1] != -1) {
            t.gids.push(s.split(':')[1]);
            t.urls.push(e.userDef3Url);
            a++;
          } else if (s && s.indexOf('ourl') >= 0 && s.split(':')[1] != -1) {
            i = s.split(':')[1];
            o = e.ourl;
          }
        }
        if (e.ourl && e.ourl.indexOf('.gif') > 0) {
          t.gids = [];
          t.urls = [];
          for (var c = 0; c < a; c++) {
            t.gids.push(i);
            t.urls.push(o);
          }
        }
      }
      return t;
    };
    a._$formatEditorUrlsGids = function (e) {
      var t = [];
      if (e)
        for (var n = 0; n < e.length; n++) {
          var i = {};
          i.gid = e[n].split('@')[0];
          i.url = e[n].split('@')[1];
          t.push(i);
        }
      return t;
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'f051aeae7bb889518ead30ef6e491df3',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  'fe86216ed59e3103a56c42c850d389f0',
  '8a864b627c302d7d1c56bd928b515d1b',
);
