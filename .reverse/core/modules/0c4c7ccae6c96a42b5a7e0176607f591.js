EDU(
  '0c4c7ccae6c96a42b5a7e0176607f591',
  "<label class=\"ux-check {class}\" r-class={{\n    'z-part': checked === null,\n    'ux-check-dis': disabled,\n    'ux-check-block': block}} r-hide={!visible} title={name}>\n    <div class=\"check_box\" on-click={this.check()} r-class={{\n        'th-bk-main': !!checked,\n        'ux-check_unchecked': !checked,\n        'th-bk-readonly-gh': readonly,\n        'th-bk-disable-gh': disabled}}>\n        <i class=\"ux-icon ux-icon-check\" r-hide={!checked}></i>\n    </div>\n    {#if contentTemplate}\n        {#inc @(contentTemplate)}\n    {#else}\n        <span on-click={this.clickText()} r-class={{\n        'ux-check-text-dis': disabled}}>{name}</span>\n    {/if}\n</label>\n",
);
