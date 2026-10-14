EDU(
  '3776e06a0984c2f84c0ab9e3df7d246e',
  '<div class="um-modal ux-mobile-modal {class}" r-animation="on:enter;wait:20;class: um-modal-fadeIn, 3;on:leave;class: um-modal-fadeOut, 2">\n<div class="um-modal_dialog" ref="modalDialog">\n{#if title}\n<h3 class="um-modal_title">{title}</h3>\n{/if}\n{#if content}\n<div class="um-modal_bd f-cb">\n{#inc content}\n</div>\n{/if}\n{#if okButton||cancelButton}\n<div class="um-modal_ft">\n{#if cancelButton}\n<a class="um-modal-btn cancel-btn" on-click={this.close(false)} >{cancelButton === true ? \'取消\' : cancelButton}</a>\n{/if}\n{#if okButton}\n<a class="um-modal-btn ok-btn" on-click={this.close(true)}>{okButton === true ? \'确定\' : okButton}</a>\n{/if}\n</div>\n{/if}\n</div>\n</div>',
);
