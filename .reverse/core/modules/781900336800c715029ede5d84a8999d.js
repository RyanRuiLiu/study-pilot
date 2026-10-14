EDU(
  '781900336800c715029ede5d84a8999d',
  function (e, t, n) {
    var i = window;
    var o = e
      .$extends({
        config: function () {
          this.supr();
          t.extend(this.data, { visible: !1, activeStep: 1 });
        },
        init: function () {
          this.supr();
          String.prototype.replace = window.moocTempReplace;
          String.prototype.match = window.moocTempMatch;
          if (window.reactComponentLoadBootstrap)
            if (window.renderReactComponent && window.renderReactComponent['CampusLogin']) {
              window.renderReactComponent.ReactDOM.unmountComponentAtNode(
                this.$refs.campusLoginContainer,
              );
              var e = window.renderReactComponent['CampusLogin'];
              window.renderReactComponent.render(
                e.component,
                e.initialState,
                this.$refs.campusLoginContainer,
              );
            } else
              window.reactComponentLoadBootstrap.init(
                { name: 'CampusLogin', container: this.$refs.campusLoginContainer },
                { onSuccess: this.onSuccess._$bind(this), onCancel: this.onCancel._$bind(this) },
              );
        },
        onSuccess: function (e) {
          this.data.activeStep = 2;
          this.$update();
          this.$emit('verifySuccess', { data: e });
        },
        onCancel: function (e) {
          this.$emit('handleCancel');
        },
        destroy: function () {
          this.supr();
        },
      })
      .filter({});
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
