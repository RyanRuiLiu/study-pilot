EDU(
  '95bdce8be29cd255c76be8ea0c005f0b',
  '<div class="mooc-login-set-wrapper">\n<div class="mooc-login-set" ref="moocLoginSet">\n{#if type == \'login\'}\n<ux-login-set-panel-pro on-tabchange={this.onTabChange($event)}></ux-login-set-panel-pro>\n{#elseif type == \'register\'}\n<ux-regist-wrap-pro on-tabchange={this.onTabChange($event)}></ux-regist-wrap-pro>\n{#elseif type === \'scanCode\'}\n<ux-login-set-scan-code\non-changeStatus={this.onTabChange($event)}\nreturnUrl={returnUrl}>\n</ux-login-set-scan-code>\n{/if}\n</div>\n</div>',
);
