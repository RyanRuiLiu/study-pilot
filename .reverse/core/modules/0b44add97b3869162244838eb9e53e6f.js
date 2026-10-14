EDU(
  '0b44add97b3869162244838eb9e53e6f',
  '<div class="ux-notify ux-notify-{position} {class}" r-hide={!visible}>\n    {#list messages as message}\n    <div class="ux-message ux-message-{message.state} {message.state|theme}" r-animation="on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;">\n        <a class="ux-message_close" on-click={this.close(message)}><i class="ux-icon ux-icon-close"></i></a>\n        <div class="ux-message_content">\n        \t<i class="ux-message_icon ux-icon-{message.state}-circle" r-hide={!message.state}></i>\n        \t<div class="ux-message_text">{message.text}</div>\n        </div>\n    </div>\n    {/list}\n</div>\n',
);
