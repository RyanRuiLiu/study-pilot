EDU(
  '1b284280ad407af1a8993da91f6d7952',
  function (e, t) {
    window.eduEditor_options = {
      showLoadingFn: function () {
        e.show();
      },
      hideLoadingFn: function () {
        e.hide();
      },
      showCmds: [
        'cleardoc',
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'insertorderedlist',
        'insertunorderedlist',
        'image',
        'link',
        'insertcode',
        'fontsize',
        'fontcolor',
        'math',
      ],
      coreOptions: { autoHeightEnabled: !0 },
    };
    return t;
  },
  '5476798e6efaeff80dde5af9b41f8609',
);
