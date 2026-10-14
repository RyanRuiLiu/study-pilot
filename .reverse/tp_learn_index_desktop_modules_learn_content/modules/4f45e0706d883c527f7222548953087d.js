EDU(
  '4f45e0706d883c527f7222548953087d',
  '<div class="ban-user-modal">\n<div class="ban-user-modal_title">{$$title}</div>\n<div class="ban-user-modal_username">{username}</div>\n<div class="ban-user-modal_buttons">\n{#if $$showMail}\n<div class="ban-user-modal_buttons_email" on-click={this.$$mail()}>\n<i class="u-icon-email"></i>\n<span>{isEn?\'Send Email\':\'发邮件\'}</span>\n</div>\n{/if}\n<div class="ban-user-modal_buttons_left-btn"><ux-button on-click={this.$$changeBanStatus(true)} value={$$fullSiteBanBtnText}></ux-button></div>\n<div class="ban-user-modal_buttons_right-btn"><ux-button on-click={this.$$changeBanStatus(false)} value={$$courseDiscussBanBtnText}></ux-button></div>\n</div>\n</div>',
);
