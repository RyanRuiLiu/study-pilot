EDU(
  'c3d8b9ca858a4c969aa91fbe6e8bca0c',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l = t
      .extend({
        name: 'editorUI',
        template: e,
        data: { rules: [] },
        config: function () {
          this.__imageConfig = { setImageWH: !1 };
          this.cmd = 'insertimage';
          if (this.data.isFilled)
            this.data.rules.push({ type: 'isFilled', message: this.data.fillText || '请输入内容' });
          if (this.data.isLength && this.data.maxLength)
            this.data.rules.push({
              type: 'isLength',
              message: '内容字数限制在' + this.data.maxLength + '个字以内！',
              max: +this.data.maxLength,
            });
        },
        setContent: function (e) {
          this.__richUI._$setContent(e);
        },
        setContentWhenReady: function (e) {
          var t = this;
        },
        init: function () {
          c._$initUploadConfig();
          this.__richUI = n._$$EduEditor._$allocate({
            parent: this.$refs.editor,
            content: this.data.value,
            height: this.data.height || 200,
            focus: this.data.autofocus,
            imageSuffix: '?imageView&thumbnail=520x520&quality=100',
          });
          this.__imgUploaderUI = o._$$UploadUI._$allocate({
            parent: this.$refs.upload,
            type: i.UPLOAD_FILE_TYPE_IMAGE,
            txt: '',
            verifyFile: this.verifyFile._$bind(this),
            onFinishUpload: function (e) {
              var t = 'https://' + e.bucket + '.nosdn.127.net/' + [e.nosKey].join('/');
              t += '?imageView&thumbnail=520x520&quality=100';
              this.uploadComplete(t);
            }._$bind(this),
          });
          var e = this;
        },
        verifyFile: function (e, t) {
          if (!e) {
            a.error('文件类型错误');
            return !1;
          }
          var n = e.slice(e.lastIndexOf('.') + 1);
          var o = /jpg|png|jpeg|bmp|gif/i;
          if (n) {
            if (o && !o.test(n)) {
              a.warning('请选择图片文件！');
              return !1;
            }
          } else {
            a.error('文件类型错误');
            return !1;
          }
          var c = r._$getFileSize(t);
          if (!c) return !0;
          var d = i.UPLOAD_SIZE_MAX_IMAGE;
          var l = '图片文件不能大于' + s._$formatFileSize(i.UPLOAD_SIZE_MAX_IMAGE);
          if (d && c > d) {
            a.warning(l);
            return !1;
          }
          return !0;
        },
        uploadComplete: function (e) {
          this.__url = e;
          var t = this.__url + '?imageInfo';
          if (t.indexOf(i.NOS_FORM_UPLOAD_URL) != -1 && this.__imageConfig.setImageWH)
            _j._$request(t, {
              type: 'json',
              method: 'get',
              mode: 0,
              headers: { 'x-nos-entity-type': 'json' },
              onload: function (e) {}._$bind(this),
              onerror: function () {}._$bind(this),
            });
          else;
        },
        focus: function () {
          this.__richUI._$focus();
        },
        getContent: function () {
          return this.__richUI._$getContent();
        },
        destroy: function () {
          this.__richUI.__destroy();
          this.supr();
        },
      })
      .filter({})
      .directive({});
    return l;
  },
  '9afc236b811ddef7bca22167f5b821e7',
  '6f1453d31194f86271694dd0542354fe',
  '4680ef5be2c55c96de681d2752e800c2',
  '66c2ed70c8e5c5a6817eb8911f02fa45',
  'ad54fcaeb73e46ff02912887837d1314',
  '268c3257e756ea058b7f5849ce71559d',
  '219bba80fd1e900dadcd3a275e06c374',
  'b7fc133486c3e69fac5e1cd5bca47c40',
  'c9576e19d209e5d7c5a8c831964d5adf',
);
