EDU(
  '249fe9ec722114ab0423aaa83727b4c9',
  '<div class="ux-hover-hoverlist">\n    <div\n        class="u-hovertip f-pa {listClass} {mode}"\n        on-mouseover={this.mouseenter()}\n        on-mouseout={this.mouseleave()}\n        style="visibility: visible;top:{top}px; left:{left}px;"\n        ref="tip"\n        r-animation={fade}>\n        <div>{#inc this.$body}</div>\n        {#if showArrow}\n        <span class="arr f-pa {direction} u-arrow" style="left:{arrLeft||0}px"></span>\n        {/if}\n    </div>\n</div>\n',
);
