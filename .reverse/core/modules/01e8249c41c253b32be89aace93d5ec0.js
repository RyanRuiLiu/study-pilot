EDU(
  '01e8249c41c253b32be89aace93d5ec0',
  '<div class="um-phone-bind-wrap custom-phone-bind-wrap-wap f-pr">\n<div class="bind-header">\n<div class="bind-title">绑定手机号</div>\n<div class="bind-tip" r-hide={!ursSwitch}>\n<div>{#if bindTxt}\n{bindTxt}\n{#else}\n应《中华人民共和国网络安全法》要求，为了更好保障您的账号安全，请绑定您的手机号\n{/if}</div>\n</div>\n<hr>\n</div>\n<ux-login-set-urs ursCustomConfig={ursCustomConfig} on-bindResult={this.onBind($event)}/>\n{#if needIgnore}\n<div class="ignore-bind f-pa" on-click={this.ignoreBind()}><span class="f-ib">跳 过</span></div>\n{/if}\n</div>',
);
