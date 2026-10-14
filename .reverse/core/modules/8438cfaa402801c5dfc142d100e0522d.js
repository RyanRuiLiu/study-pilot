EDU(
  '8438cfaa402801c5dfc142d100e0522d',
  '<div class="ux-phone-bind-wrap f-pr">\n\n    <div class="bind-tip">\n        {#if bindTxt}\n            {bindTxt}\n        {#else}\n            应《中华人民共和国网络安全法》要求，为了更好保障您的账号安全，请绑定您的手机号\n        {/if}\n    </div>\n\n    <ux-login-set-urs ursCustomConfig={ursCustomConfig} on-bindResult={this.onBind($event)}/>\n\n{#if needIgnore}\n\t<div class="ignore-bind f-pa" on-click={this.ignoreBind()}>跳 过</div>\n{/if}\n</div>',
);
