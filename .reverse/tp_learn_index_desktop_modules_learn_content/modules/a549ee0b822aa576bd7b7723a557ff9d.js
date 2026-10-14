EDU(
  'a549ee0b822aa576bd7b7723a557ff9d',
  function (e, t, n, i, o, a, s, r) {
    Component = e.$extends({
      name: 'um-recommend-modal',
      data: { list: [], recommendOpt: {}, topic: [], logOpt: null },
      config: function () {
        this.supr();
        t.extend(this.data, { list: [], recommendOpt: {}, topic: [] });
      },
      init: function () {
        this.supr();
        this.getRecommend();
      },
      getRecommend: function () {
        r._$getRecommend(this.data.recommendOpt, this._recommendLoad._$bind(this));
      },
      _recommendLoad: function (e) {
        n._$forEach(
          e,
          function (t, n) {
            if (t.type == a.RECOMMENDATION_TYPE.TOPIC) {
              this.data.topic.push(t);
              e.splice(n, 1);
            }
          }._$bind(this),
        );
        this.data.list = e;
        this.data.topic = o._$formatRecommendCard(this.data.topic);
        this.$update();
        if (this.data.topic.length || this.data.list.length) this._initModal();
      },
      _initModal: function () {
        var e = this.data;
        if (this._modalUI) {
          this._modalUI.destroy();
          this._modalUI = null;
        }
        var t = this.data.topic && !!this.data.topic.length;
        this._modalUI = new i({
          data: {
            class: t ? 'um-recommend-modal um-recommend-modal-topic' : 'um-recommend-modal',
            title: t ? '' : '推荐课程',
            contentTemplate: s,
            okButton: '',
            cancelButton: '',
            list: this.data.list,
            recommendOpt: this.data.recommendOpt,
            topic: this.data.topic,
            logOpt: this.data.logOpt,
            maskClickHide: !0,
          },
          goToContent: function () {
            this._addLog(this.data.topic[0]);
            window.open(this.data.topic[0].link);
          },
          _addLog: function (e) {
            var t = this.data.logOpt;
            if (t && t.eventId) {
              var i = {
                user_id: !!window.webUser && window.webUser.id,
                data_cate: t.data_cate,
                data_action: t.data_action,
                data_label: t.data_label,
              };
              i = n._$merge(i, JSON.parse(e.logData));
              DATracker.track(t.eventId, i);
            } else console.log('请传入正确的打点事件名称');
          },
        })
          .$on(
            'close',
            function () {
              this.$emit('close');
              this.destroy();
            }._$bind(this),
          )
          .$on(
            'cancel',
            function () {
              this.$emit('cancel');
              this.destroy();
            }._$bind(this),
          );
        if (this.$root != this) this._modalUI.$inject(this.$root);
      },
      destroy: function () {
        this.supr();
        if (this._modalUI) {
          this._modalUI.destroy();
          this._modalUI = null;
        }
      },
    });
    return Component;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  'd414623f7407e577cd6c05efff08e96f',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '93828627ddb358ed890cb65967a0c1de',
  '1dd142e7e2a6aba9b1774b6eb5e86fa7',
  '39253eba71912d1492d6af7035e30738',
  'ebe210c8c771158d609dfded929fb0ed',
);
