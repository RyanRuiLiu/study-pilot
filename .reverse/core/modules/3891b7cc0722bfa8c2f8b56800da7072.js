EDU(
  '3891b7cc0722bfa8c2f8b56800da7072',
  '<div class="m-notify m-notify-{position} {class}" r-hide={!visible}>\n    {#list messages as message}\n    <div class="u-message u-message-{message.state}" r-animation="on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;">\n        <a class="message_close" on-click={this.close(message)}><i class="u-icon u-icon-close"></i></a>\n        <i class="message_icon u-icon u-icon-{message.state}-circle" r-hide={!message.state}></i>\n        {message.text}\n    </div>\n    {/list}\n</div>',
);
