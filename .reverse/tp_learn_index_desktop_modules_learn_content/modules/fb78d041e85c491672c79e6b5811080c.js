EDU(
  'fb78d041e85c491672c79e6b5811080c',
  '\n<div class="um-live-live-interactive-player" r-hide={!isShow} ref=root>\n    {#if isVideo && supportBrowserWindShare && isScreenSharingChromeExtensionInstalled}\n    <div class="um-live-live-interactive-player_screen_sharing">\n        {#if amISharingScreen}\n        <span class="um-live-live-interactive-player_screen_sharing_button end" \n            on-click={this.stopScreenSharing()}>结束共享</span>\n        {/if}\n        <span class="um-live-live-interactive-player_screen_sharing_button start" \n            on-click={this.startScreenSharing()}>{ amISharingScreen ? \'切换共享\' : \'共享屏幕\' }</span>\n    </div>\n    {/if}\n    <div class="um-live-live-interactive-player_root" ref=root>\n    </div>\n</div>\n',
);
