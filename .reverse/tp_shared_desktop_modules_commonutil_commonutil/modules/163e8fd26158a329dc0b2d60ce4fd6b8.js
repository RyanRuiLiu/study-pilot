EDU(
  '163e8fd26158a329dc0b2d60ce4fd6b8',
  function (e, t, i, n) {
    n.FRONT_TYPE = 4;
    n._$getCategory = function (t, i) {
      e._$request({
        url: '/web/j/mocCourseCategoryBean.getCategByType.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getCourseList = function (t, i) {
      e._$request({
        url: '/web/j/courseBean.getCoursePanelListByFrontCategory.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getSpecial = function (t, i) {
      e._$request({
        url: '/web/j/courseBean.getSpecificByCategoryId.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getExtentionImgs = function (e, i) {
      t._$postDWR({
        key: 'categoryCache_getExtentionImgs',
        url: 'CommonBean.obtain',
        param: ['moocExtentionImageList'],
        onload: i,
      });
    };
    n._$getMocTermStatisticListByParms = function (t, i) {
      e._$request({
        url: '/web/j/courseBean.getMocTermStatisticListByParms.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    n._$getRecommend = function (t, i) {
      t.targetTypes = JSON.stringify(t.targetTypes);
      e._$request({
        url: '/web/j/recommendRPCBean.getRecommend.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
