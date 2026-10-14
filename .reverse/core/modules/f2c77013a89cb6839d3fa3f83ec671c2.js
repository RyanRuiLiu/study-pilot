EDU(
  'f2c77013a89cb6839d3fa3f83ec671c2',
  function (e, t, n) {
    var i = window,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v');
    var r = t
      .extend({
        name: 'azBox',
        template: e,
        data: { letter: ['cur'], letterList: [], tab: 0 },
        config: function () {
          this.supr();
        },
        init: function () {
          this.supr();
        },
        setLetter: function (e) {
          this.data.letter = [];
          this.data.letter[e] = 'cur';
          this.data.tab = e;
          this.$update();
        },
        selectSchool: function (e, t) {
          this.$emit('selectSchool', { sender: this, value: t, e: e });
        },
        hideBoard: function () {
          this.$emit('hideBoard');
        },
      })
      .filter({})
      .directive({});
    return r;
  },
  '14d1ab0212f333c3d9101f2296047ead',
  '6f1453d31194f86271694dd0542354fe',
);
