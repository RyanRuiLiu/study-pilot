EDU(
  'a542ca25f068f41ad74799af47ad699d',
  function (e, t, n) {
    n.noop = function () {};
    n.mixinExtendsWithTheming = function (e) {
      e.$extendsWithTheming = function (e) {
        if (e.css)
          e.css = e.css
            .replace(
              new RegExp(t.DEFAULT_THEME.PRIMARY, 'gi'),
              n.getComponentSetting('theme-color-primary'),
            )
            .replace(
              new RegExp(t.DEFAULT_THEME.HIGHLIGHT, 'gi'),
              n.getComponentSetting('theme-color-highlight'),
            )
            .replace(
              new RegExp(t.DEFAULT_THEME.PRIMARY_HOVERED, 'gi'),
              n.getComponentSetting('theme-color-primary-hovered'),
            )
            .replace(
              new RegExp(t.DEFAULT_THEME.HIGHLIGHT_HOVERED, 'gi'),
              n.getComponentSetting('theme-color-highlight-hovered'),
            );
        var i = this.$extends(e);
        if (!i.$extendsWithTheming) n.mixinExtendsWithTheming(i);
        return i;
      };
      return e;
    };
    n.getComponentSetting = function (n) {
      return e.get(t.SETTING_KEY)[n];
    };
    n.batchComponentSetting = function (n) {
      var i = {};
      i[t.SETTING_KEY] = n;
      e.batch(i);
    };
    n.normalizeHTMLEntities = function (e) {
      var t = document.createElement('div');
      t.innerHTML = e;
      return t.innerText;
    };
  },
  '8f34a99b20d362b3542aebd517390fc1',
  '2014b8348a8b1ce5cb92aa8db6bf1609',
);
