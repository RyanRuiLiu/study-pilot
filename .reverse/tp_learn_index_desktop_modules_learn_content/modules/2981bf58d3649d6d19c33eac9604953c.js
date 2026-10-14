EDU(
  '2981bf58d3649d6d19c33eac9604953c',
  '<div class="test-richText {$$fullscreen?\'fullscreen\':\'\'} {slideOut?\'slide-out\':\'\'} {$$ShowInfoModal?\'info-modal\':posClass}" style="top:{$$top}">\n    {#if $$ShowInfoModal}\n    <div class="test-richText-info">\n        <span class="close" on-click="{this.close()}"></span>\n        {#inc analyse}\n    </div>\n    {#else}\n    <div class="test-richText-modal">\n        <span class="close" on-click="{this.close()}"></span>\n        <p class="title">{title}</p>\n        <p class="desc">{description}</p>\n        {#if analyse}\n        <a class="btn" href="javascript:;" on-click="{this.toInfo()}">看详解</a>\n        {/if}\n    </div>\n    {/if}\n</div>\n',
);
