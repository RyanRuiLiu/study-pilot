EDU(
  '7f08ac1c542b8db57d3789fb54c2f8ae',
  '<div class="f-f0 live-subscription">\n<div class="live-subscription__box no-live-intro">\n<div class="live-subscription__box__status">\n<div class="live-subscription__box__status__title">{isComing? \'直播即将开始\' : \'直播未开始\'}</div>\n<div class="live-subscription__box__status__start-time">将于{liveInfo.liveStartTime | formatDate : \'yyyy-MM-dd HH:mm\'}开播</div>\n{#if !isComing && showSubscribe}\n<ux-button on-click={this.mobileSubscribe()} value={buttonText} class={buttonClass}></ux-button>\n{/if}\n</div>\n</div>\n</div>',
);
