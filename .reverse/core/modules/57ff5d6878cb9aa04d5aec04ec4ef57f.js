EDU(
  '57ff5d6878cb9aa04d5aec04ec4ef57f',
  '<div class="um-phone-bind-wrap f-pr">\n\n<div class="bind-tip">\n\t{#if bindTxt}\n\t\t{bindTxt}\n\t{#else}\n\t\t应《中华人民共和国网络安全法》要求，为了更好保障您的账号安全，请绑定您的手机号\n\t{/if}\n</div>\n\n<ux-login-set-urs ursCustomConfig={ursCustomConfig} on-bindResult={this.onBind($event)}/>\n\n{#if needIgnore}\n\t<div class="ignore-bind f-pa" on-click={this.ignoreBind()}><span class="f-ib">跳 过</span></div>\n{/if}\n</div>\n',
);
