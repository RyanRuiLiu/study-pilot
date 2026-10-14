EDU(
  '5cede3f4ad611a7f7e0ec461c6d21d51',
  '<div class="ux-phone-bind-wrap custom-phone-bind-wrap f-f0 f-pr">\n<div class="bind-header">\n<div class="bind-title">绑定手机号</div>\n<div class="bind-tip">\n<div>{#if bindTxt}\n{bindTxt}\n{#else}\n应《中华人民共和国网络安全法》要求，为了更好保障您的账号安全，请绑定您的手机号\n{/if}</div>\n</div>\n<hr>\n</div>\n<ux-login-set-urs ursCustomConfig={ursCustomConfig} on-bindResult={this.onBind($event)}/>\n{#if needIgnore}\n<div class="ignore-bind f-pa" on-click={this.ignoreBind()}>暂不绑定</div>\n{/if}\n</div>',
);
