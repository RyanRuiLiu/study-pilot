EDU(
  'eb4c437862349ed7168c42b949e94781',
  '<div class="ux-check-group {class}">\n    <ux-validation value={source} rules={rules} ref="validation">\n        {#list source as item}\n        <ux-check pos={item_index} textClick={textClick} contentTemplate={item.contentTemplate} name={item.name} checked={item.checked} readonly={readonly || item.readonly} disabled={disabled || item.disabled} block={block} on-check={this.doCheck($event)} on-text={this.doText($event)}/>\n            {/list}\n    </ux-validation>\n</div>\n',
);
