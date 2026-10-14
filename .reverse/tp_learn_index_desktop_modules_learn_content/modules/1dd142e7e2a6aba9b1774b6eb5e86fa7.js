EDU(
  '1dd142e7e2a6aba9b1774b6eb5e86fa7',
  '<div class="um-recommend-modal_cnt f-pr">\n{#if topic && topic.length}\n<div class="um-recommend-modal_cnt_img" on-click={this.goToContent()}>\n<img src={topic[0].imgUrl} />\n</div>\n{#else}\n{#if list && list.length}\n<um-recommend-list list={list} class={\'um-recommend-modal_cnt_list\'}\nisCardBig={true} logOpt={logOpt} outVendor={outVendor}></um-recommend-list>\n{/if}\n{/if}\n</div>',
);
