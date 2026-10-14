EDU(
  '10a1f1e79a5d88e1cd29a90020e12e8c',
  "<div class=\"ux-tabs-underline {class}\" r-class={{'z-dis': disabled}} r-hide={!visible}>\n    <ul class=\"ux-tabs-underline_hd\">\n        {#list tabs as item}\n        <li r-class={{'z-sel': item.id == selected.id, 'z-dis': item.disabled}} on-click={this.select(item)}>{#if @(titleTemplate)}{#inc @(titleTemplate)}{#else}{item.title}{/if}</li>\n        {/list}\n    </ul>\n</div>\n",
);
