EDU(
  '25fbb912c004f2caca2d7f90579d7371',
  function (e, t, n, i, o, a) {
    var r = { DEFAULT_STAR_SIZE: 20 };
    e = o.mixinExtendsWithTheming(e);
    return e.$extendsWithTheming({
      name: 'ux-rating-star',
      css: i + '\n' + a,
      template: n
        .replace(/icon-rating-favorite/g, "{favoriteIconClass || 'ux-icon-custom-rating-favorite'}")
        .replace(
          /icon-rating-unfavorite/g,
          "{unfavoriteIconClass || 'ux-icon-custom-rating-unfavorite'}",
        ),
      config: function () {
        t.extend(this.data, { size: r.DEFAULT_STAR_SIZE, editMode: 1, step: 1 });
        this.supr();
      },
    });
  },
  '1b1f9fa333068845fc244b9be7f9bac8',
  '217dcfc103efb36d2f192eecc4548797',
  'e91a6e493c8e5b96512e57e037f54b1b',
  '72fd9f9511852d3bff7a3afb10364043',
  'a542ca25f068f41ad74799af47ad699d',
  'f7250cf459795d6420007be35ce0137c',
);
