EDU(
  'd8745320d13f612d7fe4aedb56fa8954',
  '<div class="ux-module-live-live-chat-emoji">\n    <div class="ux-module-live-live-chat-emoji_wrap">\n        <div class="ux-module-live-live-chat-emoji_panel">\n            <ul>\n                {#list emojiList as emoji}\n                <span id="pic-emoji-{emoji|getEmojiKey}" on-click={this.onEmojiClick(emoji)}>\n                    <img src="{emoji|getEmojiPicUrl}">\n                </span>\n                {/list}\n            </ul>\n        </div>\n    </div>\n</div>\n',
);
