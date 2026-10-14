EDU(
  'c9576e19d209e5d7c5a8c831964d5adf',
  function (e, t) {
    t._$initUploadConfig = function () {
      window.uploaderDefaultConfig = {
        initUploadUrl: e._$getUrlWithCsrfKey('/uploaderAccess/getUploaderVideoToken'),
      };
    };
    return t;
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
);
