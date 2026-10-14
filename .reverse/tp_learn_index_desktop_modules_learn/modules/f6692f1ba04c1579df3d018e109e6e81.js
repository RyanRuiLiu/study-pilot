EDU(
  'f6692f1ba04c1579df3d018e109e6e81',
  '<div class="real-name-modal">\n<ux-validation-container ref="validation">\n<p class="tips">请添加真实姓名和常用邮箱，测验通过后，证书将在6小时内发送到您的邮箱</p>\n<p>真实姓名：<ux-input value={userInfo.realName} rules={va.nameRules}></ux-input>\n</p>\n<p>常用邮箱：<ux-input value={userInfo.email} rules={va.emailRules}></ux-input>\n</p>\n</ux-validation-container>\n<ux-button on-click={this.save()} class=\'ok-btn f-fr\' value={"确定"}></ux-button>\n</div>',
);
