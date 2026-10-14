EDU(
  'ab2661363d54c21b6789d9aca895fc72',
  '<div class="ux-commonempty {class}" style="padding:{padding}px 0;">\n    {#if emptyIcon}\n        <div class="ux-icon-blank-state ux-commonempty_self"></div>\n    {/if}\n        \n    {#if this.$body}\n        {#inc this.$body}\n    {#elseif txt}\n    <p class="ux-commonempty_txt" r-html={txt}></p>\n    {/if}\n</div>\n',
);
